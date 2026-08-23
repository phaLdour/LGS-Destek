#!/usr/bin/env python3
"""PC ajanının ürettiği sonuç JSON'larını videos.json'a işler ve commit atar.

Kullanım (repo kökünde):
  python3 tools/video-pipeline/ingest_results.py <sonuc-dizini-veya-dosya> [...] [--push]

Sonuç dosyası biçimi (pipeline.py ResultSink):
  {"key": "fen-bilimleri/basinc", "src": "https://.../basinc-abcd1234.mp4",
   "poster": "https://.../basinc-abcd1234.webp", "duration": 412.3, "sourceRef": "notebooklm:..."}
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO_DIR = HERE.parent.parent
sys.path.insert(0, str(HERE))

from registry import git_commit_and_push, load_registry, register_video  # noqa: E402


def iter_result_files(paths: list[str]):
    for p in paths:
        path = Path(p)
        if path.is_dir():
            yield from sorted(q for q in path.rglob("*.json") if q.name not in ("durum.json", "out.json"))
        elif path.is_file():
            yield path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("paths", nargs="+")
    ap.add_argument("--push", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    existing = load_registry(REPO_DIR).get("videos", {})
    added: list[str] = []
    names: list[str] = []
    for f in iter_result_files(args.paths):
        try:
            data = json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            print(f"atlandı (okunamadı): {f} — {e}")
            continue
        key = data.get("key")
        src = data.get("src")
        if not key or not src or not str(src).startswith("http"):
            print(f"atlandı (eksik key/src): {f}")
            continue
        if existing.get(key, {}).get("src") == src:
            print(f"zaten kayıtlı: {key}")
            continue
        print(f"{'(dry-run) ' if args.dry_run else ''}kaydediliyor: {key} → {src}")
        if not args.dry_run:
            register_video(REPO_DIR, key, src=src, poster=data.get("poster"),
                           duration=data.get("duration"), source_ref=data.get("sourceRef"))
        added.append(key)
        names.append(key)

    if not added:
        print("Yeni kayıt yok.")
        return 0
    if args.dry_run:
        return 0
    title = f"Video: {len(added)} konu yayına alındı" if len(added) > 1 else f"Video: {added[0]} yayına alındı"
    body = "\n".join(f"- {k}" for k in added)
    ok = git_commit_and_push(REPO_DIR, f"{title}\n\n{body}", push=args.push)
    print("commit tamam" + (" + push" if args.push and ok else "") + ("" if ok else " (push başarısız)"))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
