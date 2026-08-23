#!/usr/bin/env python3
"""Rehberim konu videosu otomasyonu.

Akış (her konu için):
  içerik → NotebookLM notebook + kaynak → Video Overview (brief ile) → MP4 indir
  → ffmpeg ile sıkıştır + kapak → depoya yükle → src/content/videos.json → commit/push
  → Vercel otomatik yayınlar.

Komutlar:
  status                  Konu/video durumu (site kaydı + NotebookLM taraması)
  brief KEY               Bir konunun kaynak belgesi ve brief'ini göster
  run [--limit N] ...     Uçtan uca üretim (yarım kalanları da toparlar)
  collect                 Yalnızca NotebookLM'de tamamlanmış videoları indirip yayınla
  process MP4 --key KEY   Elle indirilmiş bir MP4'ü sıkıştır/yükle/kaydet
  account                 NotebookLM hesap katmanı ve günlük kota bilgisi

Yapılandırma: tools/video-pipeline/config.env (bkz. config.example.env).
"""

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

HERE = Path(__file__).resolve().parent
REPO_DIR = Path(os.environ.get("REPO_DIR") or HERE.parent.parent).resolve()
WORK_DIR = HERE / ".work"
sys.path.insert(0, str(HERE))

from briefs import build_brief, build_source_document, topic_key  # noqa: E402
from media import human_size, make_poster, probe, transcode_for_web  # noqa: E402
from registry import git_commit_and_push, load_registry, register_video  # noqa: E402
from storage import get_backend  # noqa: E402

log = logging.getLogger("pipeline")

SUBJECT_ORDER = ["fen-bilimleri", "matematik", "turkce", "inkilap", "din", "ingilizce"]


# --------------------------------------------------------------------------- util

def load_env(path: Path | None) -> None:
    from dotenv import load_dotenv

    candidates = [path] if path else [HERE / "config.env", REPO_DIR / ".video-pipeline.env"]
    for p in candidates:
        if p and p.exists():
            load_dotenv(p, override=False)
            log.debug("env yüklendi: %s", p)
            return
    if path:
        raise SystemExit(f"Yapılandırma dosyası yok: {path}")


def export_content(force: bool = False) -> dict[str, Any]:
    """src/content → JSON.

    Öncelik: CONTENT_JSON ortam değişkeni → yanımızdaki content.json (repo/Node
    olmayan makineler, ör. PC ajanı) → `npx tsx export_content.ts` (repo içinde).
    """
    shipped = os.environ.get("CONTENT_JSON")
    if shipped and Path(shipped).exists():
        return json.loads(Path(shipped).read_text(encoding="utf-8"))
    local = HERE / "content.json"
    content_dir = REPO_DIR / "src" / "content"
    if local.exists() and not content_dir.exists():
        return json.loads(local.read_text(encoding="utf-8"))
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    out = WORK_DIR / "content.json"
    if not content_dir.exists():
        raise SystemExit("İçerik bulunamadı: ne CONTENT_JSON ne content.json ne de src/content var.")
    newest = max(p.stat().st_mtime for p in content_dir.glob("*.ts"))
    if not force and out.exists() and out.stat().st_mtime >= newest:
        return json.loads(out.read_text(encoding="utf-8"))
    log.info("İçerik dökülüyor (npx tsx export_content.ts)...")
    npx = "npx.cmd" if os.name == "nt" else "npx"
    r = subprocess.run(
        [npx, "-y", "tsx", str(HERE / "export_content.ts")],
        cwd=REPO_DIR, capture_output=True, text=True,
    )
    if r.returncode != 0:
        raise SystemExit(f"İçerik dökümü başarısız:\n{r.stderr[-1500:]}")
    out.write_text(r.stdout, encoding="utf-8")
    return json.loads(r.stdout)


def iter_topics(content: dict[str, Any]):
    subjects = sorted(
        content["subjects"],
        key=lambda s: SUBJECT_ORDER.index(s["slug"]) if s["slug"] in SUBJECT_ORDER else 99,
    )
    for s in subjects:
        for t in s["topics"]:
            yield s, t


def find_topic(content: dict[str, Any], key: str):
    for s, t in iter_topics(content):
        if topic_key(s["slug"], t["id"]) == key:
            return s, t
    raise SystemExit(f"Konu bulunamadı: {key}")


def select_candidates(content: dict[str, Any], registry: dict[str, Any], *,
                      subject: str | None, only: list[str], include_youtube: bool) -> list[tuple[dict, dict]]:
    have = registry.get("videos", {})
    out = []
    for s, t in iter_topics(content):
        key = topic_key(s["slug"], t["id"])
        if only and key not in only:
            continue
        if subject and s["slug"] != subject:
            continue
        if key in have and have[key].get("src"):
            continue
        if (t.get("video") or {}).get("src"):  # content.json içinde gömülü kayıt (ajan modu)
            continue
        if t.get("youtubeId") and not include_youtube and not only:
            continue
        out.append((s, t))
    return out


# ------------------------------------------------------------------ yayınlama

def publish_file(mp4: Path, key: str, *, artifact_id: str | None, backend, dry_run: bool = False) -> dict[str, Any]:
    """Sıkıştır + kapak + yükle. Sonuç: {src, poster, duration, size}."""
    subject, topic = key.split("/", 1)
    suffix = (artifact_id or "")[:8] or time.strftime("%Y%m%d%H%M")
    out_dir = WORK_DIR / "out" / subject
    out_mp4 = out_dir / f"{topic}-{suffix}.mp4"
    out_webp = out_dir / f"{topic}-{suffix}.webp"

    before = probe(mp4)
    log.info("[%s] kaynak: %dx%d, %s, %s", key, before["width"], before["height"],
             f"{before['duration']:.0f} sn", human_size(before["size"]))
    max_h = int(os.environ.get("VIDEO_HEIGHT", "720"))
    crf = int(os.environ.get("VIDEO_CRF", "26"))
    max_mb = float(os.environ.get("MAX_FILE_MB", "48"))  # Supabase ücretsiz plan: 50 MB
    info = transcode_for_web(mp4, out_mp4, max_height=max_h, crf=crf)
    # Boyut sınırını aşarsa kademeli olarak daha sıkı sıkıştır.
    for attempt_crf, attempt_h in ((crf + 3, max_h), (crf + 5, min(max_h, 540)), (crf + 8, 480)):
        if info["size"] <= max_mb * 1024 * 1024:
            break
        log.info("[%s] %s > %.0f MB → yeniden sıkıştırılıyor (crf %d, %dp)", key,
                 human_size(info["size"]), max_mb, attempt_crf, attempt_h)
        info = transcode_for_web(mp4, out_mp4, max_height=attempt_h, crf=attempt_crf)
    poster_path = make_poster(out_mp4, out_webp)
    out_webp = poster_path
    log.info("[%s] sıkıştırıldı: %dx%d, %s → %s (%.0f%%)", key, info["width"], info["height"],
             human_size(before["size"]), human_size(info["size"]),
             100.0 * info["size"] / max(1, before["size"]))

    if dry_run:
        return {"src": str(out_mp4), "poster": str(out_webp), "duration": info["duration"], "size": info["size"]}

    storage_key_mp4 = f"{subject}/{topic}-{suffix}.mp4"
    storage_key_webp = f"{subject}/{topic}-{suffix}{out_webp.suffix}"
    src_url = backend.upload(out_mp4, storage_key_mp4, "video/mp4")
    poster_url = backend.upload(out_webp, storage_key_webp, "image/webp" if out_webp.suffix == ".webp" else "image/jpeg")
    log.info("[%s] yüklendi: %s", key, src_url)
    return {"src": src_url, "poster": poster_url, "duration": info["duration"], "size": info["size"]}


def commit_message(key: str, content: dict[str, Any]) -> str:
    s, t = find_topic(content, key)
    return f"Video: {s['name']} · {t['name']} (NotebookLM)\n\nKonu: {key}"


class ResultSink:
    """Yayınlanan videonun nereye kaydedileceği.

    - results_dir verilmişse: <results_dir>/<ders__konu>.json yazılır (PC ajanı modu;
      videos.json güncellemesi ve push daha sonra repo tarafında yapılır).
    - verilmemişse: videos.json güncellenir ve commit atılır (push en sonda).
    """

    def __init__(self, content: dict[str, Any], results_dir: Path | None, *, push: bool):
        self.content = content
        self.results_dir = results_dir
        self.push = push
        self.recorded: list[str] = []

    def record(self, key: str, info: dict[str, Any], source_ref: str | None) -> None:
        entry = {
            "key": key,
            "src": info["src"],
            "poster": info.get("poster"),
            "duration": info.get("duration"),
            "size": info.get("size"),
            "sourceRef": source_ref,
            "recordedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        }
        if self.results_dir is not None:
            self.results_dir.mkdir(parents=True, exist_ok=True)
            out = self.results_dir / f"{key.replace('/', '__')}.json"
            out.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")
            log.info("[%s] sonuç yazıldı: %s", key, out)
        else:
            register_video(REPO_DIR, key, src=info["src"], poster=info.get("poster"),
                           duration=info.get("duration"), source_ref=source_ref)
            git_commit_and_push(REPO_DIR, commit_message(key, self.content), push=False)
        self.recorded.append(key)

    def finish(self) -> None:
        if self.results_dir is None and self.recorded and self.push:
            if not git_commit_and_push(REPO_DIR, "Video kayıtları", push=True):
                log.error("Push yapılamadı; commit'ler yerelde duruyor (git push origin main ile gönder).")


# ------------------------------------------------------------------------ run

async def cmd_run(args: argparse.Namespace) -> int:
    from nlm import NotebookLM, QuotaExceeded, VideoSettings, storage_path_from_env

    content = export_content()
    registry = load_registry(REPO_DIR)
    settings = VideoSettings.from_env()
    only = [k for k in (args.only or [])]
    candidates = select_candidates(content, registry, subject=args.subject, only=only,
                                   include_youtube=args.include_youtube)
    if not candidates:
        log.info("Videosu eksik konu yok. 🎉")
        return 0
    log.info("Videosu eksik %d konu var.", len(candidates))

    backend = None if args.dry_run else get_backend(REPO_DIR)
    if backend:
        log.info("Depo: %s", backend.describe())
    sink = ResultSink(content, Path(args.results_dir) if args.results_dir else None, push=not args.no_push)

    collected = 0
    started = 0
    failures: list[str] = []
    quota_hit = False

    async with NotebookLM(storage_path_from_env()) as nlm:
        acct = await nlm.account_summary()
        log.info("NotebookLM hesabı: %s (günlük video kotası: %s)", acct["tier_name"],
                 acct["video_quota_per_day"] or "?")
        await nlm.ensure_language(settings.language)
        existing = await nlm.scan_notebooks()

        sem = asyncio.Semaphore(max(1, args.parallel))
        new_budget = {"left": args.limit if args.limit is not None else 10_000}
        lock = asyncio.Lock()

        async def finalize(state, key: str) -> None:
            nonlocal collected
            dl_dir = WORK_DIR / "downloads"
            dl_dir.mkdir(parents=True, exist_ok=True)
            dest = dl_dir / f"{key.replace('/', '__')}-{(state.video_artifact_id or 'x')[:8]}.mp4"
            if not dest.exists() or dest.stat().st_size < 1000:
                log.info("[%s] indiriliyor...", key)
                await nlm.download_video(state, dest)
            info = await asyncio.to_thread(
                publish_file, dest, key, artifact_id=state.video_artifact_id,
                backend=backend, dry_run=args.dry_run,
            )
            if args.dry_run:
                log.info("[%s] (dry-run) kayıt yapılmadı: %s", key, info)
                return
            async with lock:
                sink.record(key, info, f"notebooklm:{state.notebook_id}/{state.video_artifact_id}")
            collected += 1

        async def handle(subject: dict, topic: dict) -> None:
            nonlocal started, quota_hit
            key = topic_key(subject["slug"], topic["id"])
            state = existing.get(key)
            try:
                if state and state.video_status == "completed":
                    log.info("[%s] NotebookLM'de hazır video bulundu → yayınlanıyor", key)
                    await finalize(state, key)
                    return
                if state and state.video_status in ("in_progress", "pending"):
                    log.info("[%s] üretim sürüyor → bekleniyor", key)
                    ok = await nlm.wait_video(state, settings, on_status=lambda s: log.info("[%s] durum: %s", key, s))
                    if ok:
                        await finalize(state, key)
                    else:
                        failures.append(f"{key}: üretim tamamlanmadı ({state.video_status})")
                    return
                if args.collect_only:
                    return
                if quota_hit:
                    return
                async with lock:
                    if new_budget["left"] <= 0:
                        return
                    new_budget["left"] -= 1
                async with sem:
                    if quota_hit:
                        return
                    source_title = f"{subject['name']} – {topic['name']} ders notu"
                    source_text = build_source_document(subject, topic)
                    brief = build_brief(subject, topic)
                    if args.dry_run:
                        log.info("[%s] (dry-run) üretim başlatılacaktı: %d karakter kaynak, %d karakter brief",
                                 key, len(source_text), len(brief))
                        return
                    if state is None or state.video_status == "failed":
                        state = await nlm.create_notebook_with_source(
                            key, source_title, source_text, source_timeout=settings.source_timeout)
                        existing[key] = state
                    try:
                        await nlm.start_video(state, brief, settings)
                    except QuotaExceeded as e:
                        quota_hit = True
                        log.warning("Günlük kota doldu — bugün yeni üretim yok. (%s)", e)
                        return
                    started += 1
                    ok = await nlm.wait_video(state, settings, on_status=lambda s: log.info("[%s] durum: %s", key, s))
                    if ok:
                        await finalize(state, key)
                    else:
                        failures.append(f"{key}: üretim başarısız/zaman aşımı ({state.video_status})")
            except Exception as e:  # noqa: BLE001
                log.exception("[%s] hata: %s", key, e)
                failures.append(f"{key}: {e}")

        await asyncio.gather(*(handle(s, t) for s, t in candidates))

    if not args.dry_run:
        sink.finish()

    log.info("Özet: %d video yayınlandı, %d yeni üretim başlatıldı, %d sorun.", collected, started, len(failures))
    for f in failures:
        log.info("  ✗ %s", f)
    if quota_hit:
        log.info("Günlük NotebookLM kotası doldu; kalanlar için yarın tekrar 'run' çalıştır.")
    return 0 if not failures else 1


# --------------------------------------------------------------------- status

async def cmd_status(args: argparse.Namespace) -> int:
    content = export_content(force=args.refresh)
    registry = load_registry(REPO_DIR)
    have = registry.get("videos", {})
    nlm_states = {}
    if args.nlm:
        from nlm import NotebookLM, storage_path_from_env
        async with NotebookLM(storage_path_from_env()) as nlm:
            nlm_states = await nlm.scan_notebooks()

    rows = []
    for s, t in iter_topics(content):
        key = topic_key(s["slug"], t["id"])
        site = "✔ site" if key in have else ("▶ youtube" if t.get("youtubeId") else "—")
        nb = nlm_states.get(key)
        nbs = f"{nb.video_status or 'video yok'}" if nb else ""
        rows.append((key, t["name"], site, nbs))
    w = max(len(r[0]) for r in rows)
    for key, name, site, nbs in rows:
        print(f"{key:<{w}}  {site:<10} {nbs:<12} {name}")
    total = len(rows)
    on_site = sum(1 for r in rows if r[2].startswith("✔"))
    yt = sum(1 for r in rows if r[2].startswith("▶"))
    print(f"\nToplam {total} konu · sitede video {on_site} · YouTube {yt} · eksik {total - on_site - yt}")
    return 0


def cmd_brief(args: argparse.Namespace) -> int:
    content = export_content()
    s, t = find_topic(content, args.key)
    src = build_source_document(s, t)
    brief = build_brief(s, t)
    print("=" * 30, "KAYNAK BELGE", f"({len(src)} karakter)", "=" * 30)
    print(src)
    print("=" * 30, "BRIEF", f"({len(brief)} karakter)", "=" * 30)
    print(brief)
    return 0


def cmd_process(args: argparse.Namespace) -> int:
    content = export_content()
    find_topic(content, args.key)  # doğrulama
    backend = None if args.dry_run else get_backend(REPO_DIR)
    info = publish_file(Path(args.mp4), args.key, artifact_id=args.ref, backend=backend, dry_run=args.dry_run)
    print(json.dumps(info, ensure_ascii=False, indent=2))
    if args.dry_run:
        return 0
    sink = ResultSink(content, Path(args.results_dir) if args.results_dir else None, push=not args.no_push)
    sink.record(args.key, info, args.ref)
    sink.finish()
    return 0


async def cmd_account(args: argparse.Namespace) -> int:
    from nlm import NotebookLM, storage_path_from_env
    async with NotebookLM(storage_path_from_env()) as nlm:
        acct = await nlm.account_summary()
        print(json.dumps(acct, ensure_ascii=False, indent=2))
        states = await nlm.scan_notebooks()
        print(f"Rehberim notebook sayısı: {len(states)}")
        for k, st in sorted(states.items()):
            print(f"  {k:<40} {st.video_status or 'video yok'}")
    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps({
            "account": acct,
            "notebooks": {k: {"notebook_id": st.notebook_id, "artifact_id": st.video_artifact_id,
                              "status": st.video_status, "duration": st.duration_seconds}
                          for k, st in states.items()},
        }, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0


# ---------------------------------------------------------------- videos / adopt

async def cmd_videos(args: argparse.Namespace) -> int:
    """Hesaptaki tüm video artefaktlarını listeler (eski YouTube videolarını bulmak için)."""
    from nlm import NotebookLM, storage_path_from_env
    async with NotebookLM(storage_path_from_env()) as nlm:
        vids = await nlm.list_all_videos()
    if args.out:
        Path(args.out).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out).write_text(json.dumps(vids, ensure_ascii=False, indent=2), encoding="utf-8")
    if args.json:
        print(json.dumps(vids, ensure_ascii=False, indent=2))
        return 0
    for v in vids:
        dur = f"{v['duration']:.0f} sn" if v.get("duration") else ""
        print(f"{v['notebook_id']}  {v['artifact_id'][:8]}  {v['status']:<11} {dur:>7}  {v['notebook_title']!s:<40} {v['artifact_title'] or ''}")
    print(f"\nToplam {len(vids)} video artefaktı")
    return 0


async def cmd_adopt(args: argparse.Namespace) -> int:
    """Var olan bir notebook videosunu (örn. eski Fen videoları) indirip siteye yayınlar."""
    from nlm import NotebookLM, storage_path_from_env
    content = export_content()
    find_topic(content, args.key)
    backend = None if args.dry_run else get_backend(REPO_DIR)
    dl_dir = WORK_DIR / "downloads"
    dest = dl_dir / f"{args.key.replace('/', '__')}-{(args.artifact or args.notebook)[:8]}.mp4"
    async with NotebookLM(storage_path_from_env()) as nlm:
        if not dest.exists() or dest.stat().st_size < 1000:
            log.info("[%s] indiriliyor (notebook %s)...", args.key, args.notebook)
            await nlm.download_artifact(args.notebook, args.artifact, dest)
    ref = f"notebooklm:{args.notebook}/{args.artifact or 'latest'}"
    info = publish_file(dest, args.key, artifact_id=args.artifact or args.notebook, backend=backend, dry_run=args.dry_run)
    print(json.dumps(info, ensure_ascii=False, indent=2))
    if args.dry_run:
        return 0
    sink = ResultSink(content, Path(args.results_dir) if args.results_dir else None, push=not args.no_push)
    sink.record(args.key, info, ref)
    sink.finish()
    return 0


# ----------------------------------------------------------------------- main

def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Rehberim konu videosu otomasyonu")
    ap.add_argument("--env", type=Path, help="config.env yolu")
    ap.add_argument("-v", "--verbose", action="store_true")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("status", help="Konu/video durumu")
    p.add_argument("--nlm", action="store_true", help="NotebookLM notebook'larını da tara")
    p.add_argument("--refresh", action="store_true", help="İçerik dökümünü yenile")

    p = sub.add_parser("brief", help="Kaynak belge ve brief'i göster")
    p.add_argument("key")

    p = sub.add_parser("run", help="Uçtan uca üretim")
    p.add_argument("--limit", type=int, default=None, help="En fazla bu kadar yeni üretim başlat")
    p.add_argument("--parallel", type=int, default=int(os.environ.get("VIDEO_PARALLEL", "3")))
    p.add_argument("--subject", help="Sadece bu ders (slug)")
    p.add_argument("--only", nargs="*", help="Sadece bu konu anahtarları (ders/konu)")
    p.add_argument("--include-youtube", action="store_true", help="YouTube videosu olan konuları da üret")
    p.add_argument("--collect-only", action="store_true", help="Yeni üretim başlatma, hazır olanları yayınla")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--no-push", action="store_true")
    p.add_argument("--results-dir", default=None, help="videos.json yerine sonuç JSON'larını buraya yaz (ajan modu)")

    p = sub.add_parser("collect", help="Hazır videoları indirip yayınla (yeni üretim yok)")
    p.add_argument("--subject")
    p.add_argument("--only", nargs="*")
    p.add_argument("--include-youtube", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--no-push", action="store_true")
    p.add_argument("--results-dir", default=None)

    p = sub.add_parser("process", help="Elle indirilmiş MP4'ü yayınla")
    p.add_argument("mp4")
    p.add_argument("--key", required=True)
    p.add_argument("--ref", default=None, help="Kaynak referansı (ör. notebooklm:...)")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--no-push", action="store_true")
    p.add_argument("--results-dir", default=None)

    p = sub.add_parser("account", help="NotebookLM hesap/kota bilgisi")
    p.add_argument("--out", default=None, help="JSON çıktı dosyası")

    p = sub.add_parser("videos", help="Hesaptaki tüm video artefaktlarını listele")
    p.add_argument("--json", action="store_true")
    p.add_argument("--out", default=None, help="JSON çıktı dosyası")

    p = sub.add_parser("adopt", help="Var olan bir notebook videosunu siteye yayınla")
    p.add_argument("--notebook", required=True, help="Notebook kimliği")
    p.add_argument("--artifact", default=None, help="Video artefakt kimliği (yoksa en yenisi)")
    p.add_argument("--key", required=True, help="Konu anahtarı (ders/konu)")
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--no-push", action="store_true")
    p.add_argument("--results-dir", default=None)

    args = ap.parse_args(argv)
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(message)s", datefmt="%H:%M:%S",
    )
    logging.getLogger("httpx").setLevel(logging.WARNING)
    load_env(args.env)

    if args.cmd == "status":
        return asyncio.run(cmd_status(args))
    if args.cmd == "brief":
        return cmd_brief(args)
    if args.cmd == "run":
        return asyncio.run(cmd_run(args))
    if args.cmd == "collect":
        args.limit = 0
        args.parallel = 3
        args.collect_only = True
        return asyncio.run(cmd_run(args))
    if args.cmd == "process":
        return cmd_process(args)
    if args.cmd == "account":
        return asyncio.run(cmd_account(args))
    if args.cmd == "videos":
        return asyncio.run(cmd_videos(args))
    if args.cmd == "adopt":
        return asyncio.run(cmd_adopt(args))
    return 2


if __name__ == "__main__":
    sys.exit(main())
