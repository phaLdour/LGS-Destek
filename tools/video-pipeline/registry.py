"""videos.json kaydı ve git işlemleri (commit + push)."""

from __future__ import annotations

import json
import logging
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

log = logging.getLogger("pipeline.registry")

REGISTRY_REL = Path("src/content/videos.json")


def registry_path(repo_dir: Path) -> Path:
    return repo_dir / REGISTRY_REL


def load_registry(repo_dir: Path) -> dict[str, Any]:
    p = registry_path(repo_dir)
    if not p.exists():
        return {"videos": {}}
    data = json.loads(p.read_text(encoding="utf-8"))
    data.setdefault("videos", {})
    return data


def save_registry(repo_dir: Path, data: dict[str, Any]) -> None:
    p = registry_path(repo_dir)
    data["videos"] = dict(sorted(data.get("videos", {}).items()))
    comment = data.pop("$comment", None) or (
        "Konu videoları kaydı. Anahtar: '<ders-slug>/<konu-id>'. Bu dosya "
        "tools/video-pipeline tarafından otomatik yazılır; elle düzenlersen JSON geçerliliğini koru."
    )
    ordered = {"$comment": comment, "videos": data["videos"]}
    tmp = p.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(p)


def register_video(repo_dir: Path, key: str, *, src: str, poster: str | None,
                   duration: float | None, source_ref: str | None) -> None:
    data = load_registry(repo_dir)
    entry: dict[str, Any] = {"src": src}
    if poster:
        entry["poster"] = poster
    if duration:
        entry["duration"] = round(float(duration))
    entry["createdAt"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    if source_ref:
        entry["sourceRef"] = source_ref
    data["videos"][key] = entry
    save_registry(repo_dir, data)
    log.info("videos.json güncellendi: %s → %s", key, src)


def _git(repo_dir: Path, *args: str, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(["git", *args], cwd=repo_dir, capture_output=True, text=True, check=check)


def git_commit_and_push(repo_dir: Path, message: str, *, push: bool = True,
                        branch: str | None = None, extra_paths: list[str] | None = None) -> bool:
    """videos.json (ve isteğe bağlı ek yollar) için commit atar; push başarısızsa False döner."""
    paths = [str(REGISTRY_REL)] + list(extra_paths or [])
    _git(repo_dir, "add", "--", *paths)
    status = _git(repo_dir, "status", "--porcelain", "--", *paths).stdout.strip()
    if not status:
        log.info("Commit edilecek değişiklik yok.")
        return True
    _git(repo_dir, "-c", "commit.gpgsign=false", "commit", "-q", "-m", message)
    log.info("Commit: %s", message.splitlines()[0])
    if not push:
        return True
    target = branch or _git(repo_dir, "rev-parse", "--abbrev-ref", "HEAD").stdout.strip()
    r = _git(repo_dir, "push", "origin", f"HEAD:{target}", check=False)
    if r.returncode != 0:
        log.error("git push başarısız:\n%s", (r.stderr or r.stdout)[-800:])
        return False
    log.info("Push tamam → origin/%s", target)
    return True
