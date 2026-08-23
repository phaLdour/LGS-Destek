#!/usr/bin/env python3
"""Rehberim PC ajanı — dosya tabanlı komut kuyruğu.

Claude (Cowork) bulut oturumundan NotebookLM/Supabase'e doğrudan erişemediği
için video üretimi kullanıcının bilgisayarında çalışır. Bu ajan:

  komutlar/*.json   → sırayla işler (pipeline.py'ye argüman olarak verir)
  sonuclar/<id>/    → durum.json + log.txt + (varsa) sonuç JSON'ları
  heartbeat.json    → her 20 sn'de güncellenir (ajan açık mı?)

Komut dosyası biçimi:
  {"id": "20260822-0030-run", "argv": ["run", "--limit", "3"]}
  {"id": "...", "argv": ["account"]}      {"id": "...", "argv": ["videos"]}
  {"id": "...", "argv": ["ping"]}         {"id": "...", "argv": ["stop"]}

Başlatma: Ajan-Baslat.bat (pencereyi açık bırak; küçültebilirsin).
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
PIPELINE = HERE / "pipeline" / "pipeline.py"
CMD_DIR = HERE / "komutlar"
DONE_DIR = CMD_DIR / "islendi"
RES_DIR = HERE / "sonuclar"
HEARTBEAT = HERE / "heartbeat.json"
CONFIG_ENV = Path(os.environ.get("REHBERIM_CONFIG") or HERE.parent / "config.env")
CONTENT_JSON = HERE / "pipeline" / "content.json"
POLL_SECONDS = 10

RESULT_CMDS = {"run", "collect", "process", "adopt"}
OUT_CMDS = {"account", "videos"}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    tmp.replace(path)


def heartbeat(state: str, current: str | None = None) -> None:
    write_json(HEARTBEAT, {
        "at": now_iso(), "state": state, "current": current,
        "pid": os.getpid(), "python": sys.executable,
        "config": str(CONFIG_ENV), "config_exists": CONFIG_ENV.exists(),
    })


def run_command(cmd_path: Path) -> None:
    try:
        spec = json.loads(cmd_path.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        bad = DONE_DIR / (cmd_path.name + ".bozuk")
        DONE_DIR.mkdir(parents=True, exist_ok=True)
        cmd_path.replace(bad)
        print(f"[ajan] bozuk komut dosyası {cmd_path.name}: {e}")
        return

    cmd_id = str(spec.get("id") or cmd_path.stem)
    argv = list(spec.get("argv") or [])
    out_dir = RES_DIR / cmd_id
    out_dir.mkdir(parents=True, exist_ok=True)
    status_path = out_dir / "durum.json"
    log_path = out_dir / "log.txt"

    if not argv:
        write_json(status_path, {"id": cmd_id, "status": "failed", "error": "argv boş", "finished": now_iso()})
        _archive(cmd_path)
        return

    sub = argv[0]
    if sub == "ping":
        write_json(status_path, {"id": cmd_id, "status": "done", "exit_code": 0,
                                 "started": now_iso(), "finished": now_iso(), "pong": True})
        _archive(cmd_path)
        return
    if sub == "stop":
        write_json(status_path, {"id": cmd_id, "status": "done", "exit_code": 0, "finished": now_iso()})
        _archive(cmd_path)
        heartbeat("stopped")
        print("[ajan] stop komutu alındı, çıkılıyor.")
        sys.exit(0)

    full = [sys.executable, str(PIPELINE), "--env", str(CONFIG_ENV), *argv]
    if sub in RESULT_CMDS and "--results-dir" not in argv:
        full += ["--results-dir", str(out_dir)]
    if sub in OUT_CMDS and "--out" not in argv:
        full += ["--out", str(out_dir / "out.json")]

    env = dict(os.environ)
    env.setdefault("PYTHONUTF8", "1")
    env.setdefault("PYTHONIOENCODING", "utf-8")
    if CONTENT_JSON.exists():
        env.setdefault("CONTENT_JSON", str(CONTENT_JSON))
    nlm_home = HERE.parent / "nlm-home"
    if nlm_home.exists():
        env.setdefault("NOTEBOOKLM_HOME", str(nlm_home))

    started = now_iso()
    write_json(status_path, {"id": cmd_id, "status": "running", "argv": argv, "started": started})
    heartbeat("busy", cmd_id)
    print(f"[ajan] {cmd_id}: {' '.join(argv)}")
    with open(log_path, "w", encoding="utf-8") as log:
        log.write(f"$ {' '.join(full)}\n\n")
        log.flush()
        proc = subprocess.Popen(full, stdout=log, stderr=subprocess.STDOUT, env=env, cwd=str(HERE))
        while True:
            try:
                code = proc.wait(timeout=20)
                break
            except subprocess.TimeoutExpired:
                heartbeat("busy", cmd_id)
    results = sorted(p.name for p in out_dir.glob("*.json") if p.name not in ("durum.json",))
    tail = ""
    try:
        tail = log_path.read_text(encoding="utf-8", errors="replace")[-4000:]
    except Exception:  # noqa: BLE001
        pass
    write_json(status_path, {
        "id": cmd_id, "status": "done" if code == 0 else "failed", "exit_code": code,
        "argv": argv, "started": started, "finished": now_iso(), "results": results, "log_tail": tail,
    })
    print(f"[ajan] {cmd_id}: bitti (kod {code})")
    _archive(cmd_path)
    heartbeat("idle")


def _archive(cmd_path: Path) -> None:
    DONE_DIR.mkdir(parents=True, exist_ok=True)
    target = DONE_DIR / cmd_path.name
    if target.exists():
        target = DONE_DIR / f"{cmd_path.stem}-{int(time.time())}{cmd_path.suffix}"
    try:
        cmd_path.replace(target)
    except Exception:  # noqa: BLE001
        shutil.move(str(cmd_path), str(target))


def main() -> int:
    CMD_DIR.mkdir(parents=True, exist_ok=True)
    DONE_DIR.mkdir(parents=True, exist_ok=True)
    RES_DIR.mkdir(parents=True, exist_ok=True)
    print("=" * 60)
    print(" Rehberim ajanı çalışıyor. Bu pencereyi açık bırak (küçültebilirsin).")
    print(f" Komut klasörü : {CMD_DIR}")
    print(f" Yapılandırma  : {CONFIG_ENV} ({'var' if CONFIG_ENV.exists() else 'YOK!'})")
    print(" Kapatmak için pencereyi kapat veya Ctrl+C.")
    print("=" * 60)
    heartbeat("idle")
    last_beat = 0.0
    while True:
        try:
            pending = sorted(p for p in CMD_DIR.glob("*.json") if p.is_file())
            for cmd in pending:
                run_command(cmd)
            if time.time() - last_beat > 20:
                heartbeat("idle")
                last_beat = time.time()
            time.sleep(POLL_SECONDS)
        except KeyboardInterrupt:
            heartbeat("stopped")
            print("\n[ajan] kapatıldı.")
            return 0
        except Exception as e:  # noqa: BLE001
            print(f"[ajan] beklenmeyen hata: {e}")
            time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    sys.exit(main())
