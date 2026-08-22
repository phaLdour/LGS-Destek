"""NotebookLM sarmalayıcısı (notebooklm-py üzerinden).

Her konu için ayrı bir notebook açılır ("Rehberim | ders/konu" başlığı),
kaynak olarak konu ders notu eklenir, Video Overview üretilir ve MP4 indirilir.
Notebook'lar silinmez: başlık taranarak yarım kalan işler toparlanır ve
kullanıcı dilerse NotebookLM arayüzünden videoyu inceleyebilir.
"""

from __future__ import annotations

import asyncio
import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

from notebooklm import NotebookLMClient
from notebooklm.exceptions import RateLimitError, WaitTimeoutError
from notebooklm.rpc.types import VideoFormat, VideoStyle

from briefs import notebook_title, parse_notebook_title

log = logging.getLogger("pipeline.nlm")

STYLE_MAP: dict[str, VideoStyle] = {
    "auto": VideoStyle.AUTO_SELECT,
    "classic": VideoStyle.CLASSIC,
    "whiteboard": VideoStyle.WHITEBOARD,
    "kawaii": VideoStyle.KAWAII,
    "anime": VideoStyle.ANIME,
    "watercolor": VideoStyle.WATERCOLOR,
    "retro-print": VideoStyle.RETRO_PRINT,
    "retro_print": VideoStyle.RETRO_PRINT,
    "heritage": VideoStyle.HERITAGE,
    "paper-craft": VideoStyle.PAPER_CRAFT,
    "paper_craft": VideoStyle.PAPER_CRAFT,
    "custom": VideoStyle.CUSTOM,
}
FORMAT_MAP: dict[str, VideoFormat] = {
    "explainer": VideoFormat.EXPLAINER,
    "brief": VideoFormat.BRIEF,
}

# Tier → günlük Video Overview kotası (notebooklm-py docs/quota-limits.md, Tem 2026).
TIER_VIDEO_QUOTA = {1: 3, 4: 6, 2: 20, 3: 100, 6: 200}
TIER_NAMES = {1: "Ücretsiz", 4: "Plus", 2: "Pro (Google AI Pro)", 3: "Ultra", 6: "Ultra 30TB"}


@dataclass
class VideoSettings:
    style: VideoStyle
    video_format: VideoFormat
    language: str = "tr"
    style_prompt: str | None = None
    generation_timeout: float = 2700.0  # 45 dk
    source_timeout: float = 240.0

    @classmethod
    def from_env(cls) -> "VideoSettings":
        style_key = os.environ.get("VIDEO_STYLE", "classic").strip().lower()
        fmt_key = os.environ.get("VIDEO_FORMAT", "explainer").strip().lower()
        if style_key not in STYLE_MAP:
            raise ValueError(f"VIDEO_STYLE geçersiz: {style_key} (seçenekler: {', '.join(STYLE_MAP)})")
        if fmt_key not in FORMAT_MAP:
            raise ValueError(f"VIDEO_FORMAT geçersiz: {fmt_key} (explainer|brief)")
        return cls(
            style=STYLE_MAP[style_key],
            video_format=FORMAT_MAP[fmt_key],
            language=os.environ.get("VIDEO_LANGUAGE", "tr").strip() or "tr",
            style_prompt=os.environ.get("VIDEO_STYLE_PROMPT") or None,
            generation_timeout=float(os.environ.get("VIDEO_GENERATION_TIMEOUT", "2700")),
        )


@dataclass
class NotebookState:
    key: str
    notebook_id: str
    title: str
    video_artifact_id: str | None = None
    video_status: str | None = None  # completed | in_progress | pending | failed | None
    duration_seconds: float | None = None


class QuotaExceeded(RuntimeError):
    """Günlük Video Overview kotası doldu — bugün yeni üretim başlatılamaz."""


def storage_path_from_env() -> Path:
    p = os.environ.get("NOTEBOOKLM_STORAGE")
    if p:
        return Path(p).expanduser()
    home = os.environ.get("NOTEBOOKLM_HOME")
    if home:
        return Path(home).expanduser() / "profiles" / "default" / "storage_state.json"
    return Path.home() / ".notebooklm" / "profiles" / "default" / "storage_state.json"


class NotebookLM:
    """Tek bir event loop içinde kullanılacak yardımcı (async)."""

    def __init__(self, storage: Path):
        if not storage.exists():
            raise FileNotFoundError(
                f"NotebookLM oturum dosyası yok: {storage}\n"
                "Bir kez 'notebooklm login' çalıştırıp storage_state.json dosyasını bu yola koy."
            )
        self.storage = storage
        self._client_cm = None
        self.client: NotebookLMClient | None = None

    async def __aenter__(self) -> "NotebookLM":
        self._client_cm = NotebookLMClient.from_storage(str(self.storage), keepalive=600)
        self.client = await self._client_cm.__aenter__()
        return self

    async def __aexit__(self, *exc: Any) -> None:
        if self._client_cm is not None:
            await self._client_cm.__aexit__(*exc)

    # ----------------------------------------------------------------- hesap

    async def account_summary(self) -> dict[str, Any]:
        assert self.client
        limits = await self.client.settings.get_account_limits()
        tier = getattr(limits, "tier", None)
        lang = None
        try:
            lang = await self.client.settings.get_output_language()
        except Exception as e:  # noqa: BLE001
            log.debug("Dil okunamadı: %s", e)
        return {
            "tier": tier,
            "tier_name": TIER_NAMES.get(tier or -1, f"bilinmiyor ({tier})"),
            "video_quota_per_day": TIER_VIDEO_QUOTA.get(tier or -1),
            "notebook_limit": getattr(limits, "notebook_limit", None),
            "output_language": lang,
        }

    async def ensure_language(self, language: str) -> None:
        assert self.client
        try:
            current = await self.client.settings.get_output_language()
            if (current or "").lower() != language.lower():
                await self.client.settings.set_output_language(language)
                log.info("NotebookLM çıktı dili %s → %s", current, language)
        except Exception as e:  # noqa: BLE001
            log.warning("Çıktı dili ayarlanamadı (devam ediliyor): %s", e)

    # -------------------------------------------------------------- tarama

    async def scan_notebooks(self) -> dict[str, NotebookState]:
        """'Rehberim | ders/konu' başlıklı notebook'ları ve video durumlarını bulur."""
        assert self.client
        out: dict[str, NotebookState] = {}
        notebooks = await self.client.notebooks.list()
        for nb in notebooks:
            key = parse_notebook_title(nb.title or "")
            if not key:
                continue
            state = NotebookState(key=key, notebook_id=nb.id, title=nb.title or "")
            try:
                videos = await self.client.artifacts.list_video(nb.id)
            except Exception as e:  # noqa: BLE001
                log.warning("Artifact listesi alınamadı (%s): %s", key, e)
                videos = []
            # En yeni videoyu seç (tamamlanmış olan öncelikli).
            chosen = None
            for art in videos:
                if chosen is None or (art.is_completed and not chosen.is_completed):
                    chosen = art
            if chosen is not None:
                state.video_artifact_id = chosen.id
                state.video_status = chosen.status_str
                state.duration_seconds = getattr(chosen, "duration_seconds", None)
            # Aynı anahtarla birden çok notebook varsa videolu olanı tut.
            prev = out.get(key)
            if prev is None or (state.video_status == "completed" and prev.video_status != "completed"):
                out[key] = state
        return out

    # -------------------------------------------------------------- üretim

    async def create_notebook_with_source(self, key: str, source_title: str, source_text: str,
                                          *, source_timeout: float) -> NotebookState:
        assert self.client
        title = notebook_title(*key.split("/", 1))
        nb = await self.client.notebooks.create(title)
        log.info("[%s] notebook oluşturuldu: %s", key, nb.id)
        src = await self.client.sources.add_text(
            nb.id, source_title, source_text, wait=True, wait_timeout=source_timeout,
        )
        log.info("[%s] kaynak eklendi: %s (%s)", key, src.id, src.status)
        return NotebookState(key=key, notebook_id=nb.id, title=title)

    async def start_video(self, state: NotebookState, brief: str, settings: VideoSettings) -> str:
        """Video üretimini başlatır; task/artifact kimliğini döndürür."""
        assert self.client
        try:
            status = await self.client.artifacts.generate_video(
                state.notebook_id,
                language=settings.language,
                instructions=brief,
                video_format=settings.video_format,
                video_style=settings.style,
                style_prompt=settings.style_prompt if settings.style == VideoStyle.CUSTOM else None,
            )
        except RateLimitError as e:
            raise QuotaExceeded(str(e)) from e
        if status.is_failed:
            msg = f"{status.error_code or ''} {status.error or ''}".strip()
            if "USER_DISPLAYABLE" in (status.error_code or "") or "limit" in msg.lower() or "kota" in msg.lower():
                raise QuotaExceeded(msg or "Video üretimi reddedildi (kota?)")
            raise RuntimeError(f"Video üretimi başlatılamadı: {msg}")
        state.video_artifact_id = status.task_id
        state.video_status = status.status
        log.info("[%s] video üretimi başladı: %s", state.key, status.task_id)
        return status.task_id

    async def wait_video(self, state: NotebookState, settings: VideoSettings,
                         on_status: Callable[[str], None] | None = None) -> bool:
        assert self.client and state.video_artifact_id
        last = {"s": None}

        def _cb(st: Any) -> None:
            s = getattr(st, "status", None)
            if s != last["s"]:
                last["s"] = s
                if on_status:
                    on_status(str(s))

        try:
            final = await self.client.artifacts.wait_for_completion(
                state.notebook_id, state.video_artifact_id,
                timeout=settings.generation_timeout, max_interval=20.0,
                on_status_change=_cb,
            )
        except WaitTimeoutError:
            state.video_status = "in_progress"
            return False
        state.video_status = final.status
        if final.is_failed:
            log.error("[%s] video üretimi başarısız: %s %s", state.key, final.error_code, final.error)
            return False
        return final.is_complete

    async def download_video(self, state: NotebookState, dest: Path) -> Path:
        assert self.client and state.video_artifact_id
        dest.parent.mkdir(parents=True, exist_ok=True)
        path = await self.client.artifacts.download_video(
            state.notebook_id, str(dest), artifact_id=state.video_artifact_id,
        )
        return Path(path)

    async def delete_notebook(self, notebook_id: str) -> None:
        assert self.client
        await self.client.notebooks.delete(notebook_id)


async def with_retries(coro_factory: Callable[[], Any], *, attempts: int = 3, delay: float = 5.0) -> Any:
    last: Exception | None = None
    for i in range(attempts):
        try:
            return await coro_factory()
        except (RateLimitError, QuotaExceeded):
            raise
        except Exception as e:  # noqa: BLE001
            last = e
            log.warning("Deneme %d/%d başarısız: %s", i + 1, attempts, e)
            await asyncio.sleep(delay * (i + 1))
    assert last
    raise last
