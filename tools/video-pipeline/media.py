"""ffmpeg yardımcıları: süre okuma, web için sıkıştırma, kapak görseli."""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path


class MediaError(RuntimeError):
    pass


_FFMPEG_CACHE: dict[str, str | None] = {}


def _find_ffmpeg() -> str:
    """PATH'teki ffmpeg; yoksa imageio-ffmpeg paketinin getirdiği ikili."""
    if "ffmpeg" in _FFMPEG_CACHE and _FFMPEG_CACHE["ffmpeg"]:
        return _FFMPEG_CACHE["ffmpeg"]  # type: ignore[return-value]
    path = os.environ.get("FFMPEG_BIN") or shutil.which("ffmpeg")
    if not path:
        try:
            import imageio_ffmpeg  # type: ignore

            path = imageio_ffmpeg.get_ffmpeg_exe()
        except Exception:  # noqa: BLE001
            path = None
    if not path:
        raise MediaError("ffmpeg bulunamadı. PATH'e ekle veya 'pip install imageio-ffmpeg'.")
    _FFMPEG_CACHE["ffmpeg"] = path
    return path


def _find_ffprobe() -> str | None:
    if "ffprobe" in _FFMPEG_CACHE:
        return _FFMPEG_CACHE["ffprobe"]
    path = os.environ.get("FFPROBE_BIN") or shutil.which("ffprobe")
    if not path:
        # ffmpeg'in yanında ffprobe varsa onu kullan
        ff = Path(_find_ffmpeg())
        cand = ff.with_name("ffprobe" + ff.suffix)
        path = str(cand) if cand.exists() else None
    _FFMPEG_CACHE["ffprobe"] = path
    return path


def _require(tool: str) -> str:
    if tool == "ffmpeg":
        return _find_ffmpeg()
    if tool == "ffprobe":
        p = _find_ffprobe()
        if not p:
            raise MediaError("ffprobe bulunamadı.")
        return p
    path = shutil.which(tool)
    if not path:
        raise MediaError(f"{tool} bulunamadı (PATH).")
    return path


_DURATION_RE = re.compile(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)")
_VIDEO_RE = re.compile(r"Stream #\d+:\d+.*?Video:\s*([A-Za-z0-9_]+).*?(\d{2,5})x(\d{2,5})")
_BITRATE_RE = re.compile(r"bitrate:\s*(\d+)\s*kb/s")


def _probe_with_ffmpeg(path: Path) -> dict:
    """ffprobe yoksa 'ffmpeg -i' çıktısından süre/çözünürlük okur."""
    ffmpeg = _find_ffmpeg()
    r = subprocess.run([ffmpeg, "-hide_banner", "-i", str(path)], capture_output=True, text=True)
    text = r.stderr or ""
    dur = 0.0
    m = _DURATION_RE.search(text)
    if m:
        dur = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
    w = h = 0
    vcodec = None
    m = _VIDEO_RE.search(text)
    if m:
        vcodec, w, h = m.group(1), int(m.group(2)), int(m.group(3))
    br = 0
    m = _BITRATE_RE.search(text)
    if m:
        br = int(m.group(1)) * 1000
    return {"duration": dur, "width": w, "height": h, "bitrate": br,
            "size": path.stat().st_size, "vcodec": vcodec}


def probe(path: Path) -> dict:
    """Süre (sn), genişlik, yükseklik, toplam bit hızı ve boyut (bayt)."""
    ffprobe = _find_ffprobe()
    if not ffprobe:
        return _probe_with_ffmpeg(path)
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
    base = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-nostdin",
        "-ss", f"{t:.2f}", "-i", str(src), "-frames:v", "1",
        "-vf", f"scale={width}:-2:flags=lanczos",
    ]
    if dst.suffix.lower() == ".webp":
        cmd = base + ["-c:v", "libwebp", "-quality", "82", "-compression_level", "6", str(dst)]
        try:
            subprocess.run(cmd, check=True, capture_output=True, text=True)
            return dst
        except subprocess.CalledProcessError:
            dst = dst.with_suffix(".jpg")  # libwebp yoksa JPEG'e düş
    cmd = base + ["-c:v", "mjpeg", "-q:v", "3", "-pix_fmt", "yuvj420p", str(dst)]
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
