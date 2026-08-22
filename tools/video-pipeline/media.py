"""ffmpeg yardımcıları: süre okuma, web için sıkıştırma, kapak görseli."""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path


class MediaError(RuntimeError):
    pass


def _require(tool: str) -> str:
    path = shutil.which(tool)
    if not path:
        raise MediaError(f"{tool} bulunamadı (PATH). ffmpeg kurulu olmalı.")
    return path


def probe(path: Path) -> dict:
    """Süre (sn), genişlik, yükseklik, toplam bit hızı ve boyut (bayt)."""
    ffprobe = _require("ffprobe")
    out = subprocess.run(
        [
            ffprobe, "-v", "error", "-print_format", "json",
            "-show_format", "-show_streams", str(path),
        ],
        capture_output=True, text=True, check=True,
    ).stdout
    data = json.loads(out)
    video = next((s for s in data.get("streams", []) if s.get("codec_type") == "video"), {})
    fmt = data.get("format", {})
    return {
        "duration": float(fmt.get("duration") or video.get("duration") or 0.0),
        "width": int(video.get("width") or 0),
        "height": int(video.get("height") or 0),
        "bitrate": int(fmt.get("bit_rate") or 0),
        "size": int(fmt.get("size") or path.stat().st_size),
        "vcodec": video.get("codec_name"),
    }


def transcode_for_web(
    src: Path,
    dst: Path,
    *,
    max_height: int = 720,
    crf: int = 26,
    preset: str = "slow",
    audio_bitrate: str = "96k",
) -> dict:
    """MP4 (H.264 High + AAC, faststart) olarak web'e uygun şekilde sıkıştırır.

    NotebookLM videoları büyük ölçüde yazı/şema ağırlıklı olduğundan CRF 26 ile
    okunaklılık korunurken dosya boyutu ciddi düşer. `max_height` üstü
    çözünürlükler küçültülür (en-boy oranı korunur, çift piksel garanti).
    """
    ffmpeg = _require("ffmpeg")
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_suffix(".tmp.mp4")
    vf = f"scale=-2:'min({max_height},ih)':flags=lanczos,format=yuv420p"
    cmd = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-nostdin",
        "-i", str(src),
        "-map", "0:v:0", "-map", "0:a:0?",
        "-vf", vf,
        "-c:v", "libx264", "-preset", preset, "-crf", str(crf),
        "-profile:v", "high", "-level", "4.0",
        "-g", "120", "-keyint_min", "60", "-sc_threshold", "0",
        "-x264-params", "aq-mode=3:ref=4:bframes=3",
        "-c:a", "aac", "-b:a", audio_bitrate, "-ac", "2", "-ar", "44100",
        "-movflags", "+faststart",
        "-metadata", "title=Rehberim konu videosu",
        str(tmp),
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        tmp.unlink(missing_ok=True)
        raise MediaError(f"ffmpeg sıkıştırma hatası: {e.stderr[-800:]}") from e
    tmp.replace(dst)
    return probe(dst)


def make_poster(src: Path, dst: Path, *, at_seconds: float | None = None, width: int = 1280) -> Path:
    """Videodan kapak görseli (WebP). `at_seconds` verilmezse sürenin %6'sı (≥2 sn) alınır."""
    ffmpeg = _require("ffmpeg")
    info = probe(src)
    dur = info["duration"] or 0
    t = at_seconds if at_seconds is not None else max(2.0, min(dur * 0.06, 20.0))
    if dur and t >= dur:
        t = max(0.0, dur / 2)
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-nostdin",
        "-ss", f"{t:.2f}", "-i", str(src), "-frames:v", "1",
        "-vf", f"scale={width}:-2:flags=lanczos",
        "-c:v", "libwebp", "-quality", "82", "-compression_level", "6",
        str(dst),
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        raise MediaError(f"ffmpeg kapak hatası: {e.stderr[-500:]}") from e
    return dst


def human_size(n: int) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return f"{n:.1f} {unit}" if unit != "B" else f"{n} B"
        n /= 1024  # type: ignore[assignment]
    return f"{n:.1f} GB"
