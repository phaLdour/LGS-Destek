"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import {
  AlertTriangle,
  Check,
  Gauge,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { TopicVideo } from "@/content/types";

/* ------------------------------------------------------------------ */
/*  Yardımcılar                                                        */
/* ------------------------------------------------------------------ */

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;
const SKIP_SECONDS = 10;
/** Bu orana ulaşınca video "izlendi" sayılır. */
const WATCHED_RATIO = 0.9;
/** İlerleme kaydı için asgari konum (sn). Bunun altı "baştan" kabul edilir. */
const RESUME_MIN = 8;

type Saved = { t: number; d: number; watched: boolean; at: number };

function storageKeyFor(id: string) {
  return `rehberim:video:${id}`;
}

function loadSaved(id: string): Saved | null {
  try {
    const raw = localStorage.getItem(storageKeyFor(id));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function persist(id: string, s: Saved) {
  try {
    localStorage.setItem(storageKeyFor(id), JSON.stringify(s));
  } catch {
    // yoksay (gizli mod / kota)
  }
}

export function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const s = Math.floor(sec);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(r).padStart(2, "0")}`;
}

/* iOS Safari, container fullscreen'i desteklemez; video elementinin kendi
   tam ekranını kullanır. */
type IOSVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitSupportsFullscreen?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Bileşen                                                            */
/* ------------------------------------------------------------------ */

export function VideoPlayer({
  video,
  title,
  id,
}: {
  video: TopicVideo;
  /** Erişilebilirlik ve tam ekran başlığı için konu adı. */
  title: string;
  /** Kalınan yeri hatırlamak için benzersiz kimlik (ör. "fen-bilimleri/mevsimler"). */
  id: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPersist = useRef(0);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(video.duration ?? 0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState<number>(1);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);
  const [hoverPos, setHoverPos] = useState<number | null>(null);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [watched, setWatched] = useState(false);
  const [pipSupported, setPipSupported] = useState(false);

  /* ---- ilk yük: kaldığın yer / izlendi ---- */
  useEffect(() => {
    const saved = loadSaved(id);
    if (saved) {
      setWatched(Boolean(saved.watched));
      const d = saved.d || video.duration || 0;
      if (saved.t >= RESUME_MIN && (!d || saved.t < d * 0.96)) {
        setResumeAt(saved.t);
      }
    }
    setPipSupported(
      typeof document !== "undefined" &&
        "pictureInPictureEnabled" in document &&
        Boolean(document.pictureInPictureEnabled),
    );
  }, [id, video.duration]);

  /* ---- kontrol otomatik gizleme ---- */
  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!speedOpen && !scrubbing) setControlsVisible(false);
    }, 2600);
  }, [speedOpen, scrubbing]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (playing) scheduleHide();
  }, [playing, scheduleHide]);

  useEffect(() => {
    if (playing) scheduleHide();
    else {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setControlsVisible(true);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [playing, scheduleHide]);

  /* ---- tam ekran durumu ---- */
  useEffect(() => {
    function onFs() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  /* ---- ilerleme kaydı ---- */
  const persistProgress = useCallback(
    (t: number, d: number, force = false) => {
      const now = Date.now();
      if (!force && now - lastPersist.current < 4000) return;
      lastPersist.current = now;
      const isWatched = watched || (d > 0 && t / d >= WATCHED_RATIO);
      if (isWatched && !watched) setWatched(true);
      persist(id, { t, d, watched: isWatched, at: now });
    },
    [id, watched],
  );

  /* ---- oynatma kontrolleri ---- */
  const play = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    setError(false);
    try {
      if (resumeAt != null && v.currentTime < 1) {
        v.currentTime = resumeAt;
      }
      await v.play();
    } catch {
      // Tarayıcı engelledi (autoplay politikası) — kullanıcı tekrar dokunur.
      setPlaying(false);
    }
  }, [resumeAt]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) void play();
    else v.pause();
  }, [play]);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration || 0;
    const next = Math.min(Math.max(0, v.currentTime + delta), d || Infinity);
    v.currentTime = next;
    setCurrent(next);
  }, []);

  const seekTo = useCallback((t: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    setCurrent(t);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const changeVolume = useCallback((val: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = val;
    v.muted = val === 0;
    setVolume(val);
    setMuted(v.muted);
  }, []);

  const changeSpeed = useCallback((s: number) => {
    const v = videoRef.current;
    if (v) v.playbackRate = s;
    setSpeed(s);
    setSpeedOpen(false);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const wrap = wrapRef.current;
    const v = videoRef.current as IOSVideo | null;
    if (!wrap || !v) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (wrap.requestFullscreen) {
        await wrap.requestFullscreen();
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    } catch {
      // yoksay
    }
  }, []);

  const togglePip = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch {
      // yoksay
    }
  }, []);

  /* ---- klavye ---- */
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const tag = (e.target as HTMLElement).tagName;
    // Odak bir düğme/kaydırıcıdaysa Enter ve boşluk o öğeye ait kalsın.
    if (tag === "INPUT") return;
    if (tag === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;
    switch (e.key) {
      case " ":
      case "k":
      case "K":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowRight":
        e.preventDefault();
        seekBy(5);
        break;
      case "ArrowLeft":
        e.preventDefault();
        seekBy(-5);
        break;
      case "l":
      case "L":
        seekBy(SKIP_SECONDS);
        break;
      case "j":
      case "J":
        seekBy(-SKIP_SECONDS);
        break;
      case "m":
      case "M":
        toggleMute();
        break;
      case "f":
      case "F":
        void toggleFullscreen();
        break;
      default:
        return;
    }
    showControls();
  }

  /* ---- ilerleme çubuğu (fare/dokunma) ---- */
  const ratioFromEvent = useCallback((clientX: number) => {
    const bar = barRef.current;
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  function onBarPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (!duration) return;
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setScrubbing(true);
    const r = ratioFromEvent(e.clientX);
    setCurrent(r * duration);
    setHoverPos(r);
  }

  function onBarPointerMove(e: PointerEvent<HTMLDivElement>) {
    const r = ratioFromEvent(e.clientX);
    setHoverPos(r);
    if (scrubbing && duration) setCurrent(r * duration);
  }

  function onBarPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (!scrubbing) return;
    const r = ratioFromEvent(e.clientX);
    setScrubbing(false);
    if (duration) {
      seekTo(r * duration);
      persistProgress(r * duration, duration, true);
    }
    showControls();
  }

  /* ---- video olayları ---- */
  function onTimeUpdate() {
    const v = videoRef.current;
    if (!v || scrubbing) return;
    setCurrent(v.currentTime);
    if (v.duration && Number.isFinite(v.duration)) {
      persistProgress(v.currentTime, v.duration);
    }
  }

  function onProgress() {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    let end = 0;
    for (let i = 0; i < v.buffered.length; i++) {
      if (v.buffered.start(i) <= v.currentTime + 0.5 && v.buffered.end(i) > end) {
        end = v.buffered.end(i);
      }
    }
    setBuffered(end / v.duration);
  }

  function onLoadedMetadata() {
    const v = videoRef.current;
    if (!v) return;
    if (Number.isFinite(v.duration)) setDuration(v.duration);
    v.playbackRate = speed;
  }

  function onEnded() {
    setPlaying(false);
    setControlsVisible(true);
    const v = videoRef.current;
    if (v && v.duration) {
      persist(id, { t: 0, d: v.duration, watched: true, at: Date.now() });
      setWatched(true);
      setResumeAt(null);
    }
  }

  const progressRatio = duration ? Math.min(1, current / duration) : 0;
  const remaining = duration ? Math.max(0, duration - current) : 0;

  const hoverTime = useMemo(
    () => (hoverPos != null && duration ? hoverPos * duration : null),
    [hoverPos, duration],
  );

  const speedLabel = speed === 1 ? "1x" : `${speed}x`;

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="region"
      aria-label={`${title} konu videosu`}
      onKeyDown={onKeyDown}
      onPointerMove={showControls}
      onPointerLeave={() => playing && scheduleHide()}
      className={`group relative w-full select-none overflow-hidden rounded-2xl border border-rehberim-border bg-black shadow-card outline-none focus-visible:ring-4 focus-visible:ring-rehberim-accent/30 ${
        fullscreen ? "flex h-full items-center justify-center" : "aspect-video"
      } ${playing && !controlsVisible ? "cursor-none" : ""}`}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        preload="metadata"
        playsInline
        controlsList="nodownload"
        title={title}
        onClick={() => {
          if (!started) return;
          if (controlsVisible || !playing) togglePlay();
          else showControls();
        }}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
          setResumeAt(null);
        }}
        onPause={() => {
          setPlaying(false);
          const v = videoRef.current;
          if (v && v.duration) persistProgress(v.currentTime, v.duration, true);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onTimeUpdate={onTimeUpdate}
        onProgress={onProgress}
        onLoadedMetadata={onLoadedMetadata}
        onDurationChange={onLoadedMetadata}
        onVolumeChange={() => {
          const v = videoRef.current;
          if (!v) return;
          setMuted(v.muted);
          setVolume(v.volume);
        }}
        onEnded={onEnded}
        onError={() => {
          setError(true);
          setWaiting(false);
          setPlaying(false);
        }}
        className={`h-full w-full bg-black ${fullscreen ? "max-h-full object-contain" : "object-cover"}`}
      >
        {video.captions && (
          <track kind="subtitles" src={video.captions} srcLang="tr" label="Türkçe" />
        )}
      </video>

      {/* Başlangıç kapağı: büyük oynat düğmesi */}
      {!started && !error && (
        <button
          type="button"
          onClick={() => void play()}
          aria-label="Videoyu oynat"
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition hover:from-black/70"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rehberim-accent text-white shadow-elevated ring-8 ring-white/15 transition-transform duration-300 ease-snap group-hover:scale-105">
            <Play className="ml-1 h-9 w-9" fill="currentColor" />
          </span>
          <span className="mt-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {resumeAt != null
              ? `${formatTime(resumeAt)} · kaldığın yerden devam et`
              : duration
                ? `Konu videosu · ${formatTime(duration)}`
                : "Konu videosu"}
          </span>
          {watched && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-soft">
              <Check className="h-3.5 w-3.5" /> İzlendi
            </span>
          )}
        </button>
      )}

      {/* Yükleniyor */}
      {started && waiting && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-white/90 drop-shadow" />
        </div>
      )}

      {/* Hata */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-6 text-center text-white">
          <AlertTriangle className="h-10 w-10 text-rehberim-accent" />
          <p className="mt-3 text-sm font-semibold">Video yüklenemedi.</p>
          <p className="mt-1 text-xs text-white/70">
            İnternet bağlantını kontrol edip tekrar dene.
          </p>
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              setError(false);
              if (v) {
                v.load();
                void play();
              }
            }}
            className="mt-4 rounded-xl bg-rehberim-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-rehberim-accent-dark"
          >
            Tekrar dene
          </button>
        </div>
      )}

      {/* Kontroller */}
      {started && !error && (
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-2 pt-10 text-white transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* İlerleme çubuğu */}
          <div
            ref={barRef}
            role="slider"
            aria-label="Video konumu"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${formatTime(current)} / ${formatTime(duration)}`}
            onPointerDown={onBarPointerDown}
            onPointerMove={onBarPointerMove}
            onPointerUp={onBarPointerUp}
            onPointerCancel={() => setScrubbing(false)}
            onPointerLeave={() => !scrubbing && setHoverPos(null)}
            className="relative h-5 w-full cursor-pointer touch-none"
          >
            {hoverTime != null && (
              <span
                className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums"
                style={{ left: `${(hoverPos ?? 0) * 100}%` }}
              >
                {formatTime(hoverTime)}
              </span>
            )}
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-all group-hover:h-2">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/35"
                style={{ width: `${buffered * 100}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-rehberim-accent"
                style={{ width: `${progressRatio * 100}%` }}
              />
            </div>
            <div
              className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rehberim-accent shadow-soft ring-2 ring-white/80 transition-transform ${
                scrubbing ? "scale-125" : "scale-0 group-hover:scale-100"
              }`}
              style={{ left: `${progressRatio * 100}%` }}
            />
          </div>

          {/* Düğme satırı */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ControlButton
              label={playing ? "Duraklat" : "Oynat"}
              onClick={togglePlay}
            >
              {playing ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
              )}
            </ControlButton>
            <ControlButton
              label={`${SKIP_SECONDS} saniye geri`}
              onClick={() => seekBy(-SKIP_SECONDS)}
            >
              <span className="relative">
                <RotateCcw className="h-5 w-5" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-extrabold">
                  {SKIP_SECONDS}
                </span>
              </span>
            </ControlButton>
            <ControlButton
              label={`${SKIP_SECONDS} saniye ileri`}
              onClick={() => seekBy(SKIP_SECONDS)}
            >
              <span className="relative">
                <RotateCw className="h-5 w-5" />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-extrabold">
                  {SKIP_SECONDS}
                </span>
              </span>
            </ControlButton>

            {/* Ses */}
            <div className="flex items-center gap-1">
              <ControlButton
                label={muted ? "Sesi aç" : "Sesi kapat"}
                onClick={toggleMute}
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </ControlButton>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
                aria-label="Ses düzeyi"
                className="hidden h-1 w-20 cursor-pointer accent-rehberim-accent sm:block"
              />
            </div>

            <span className="ml-1 whitespace-nowrap text-xs font-semibold tabular-nums text-white/90 sm:text-sm">
              {formatTime(current)}
              <span className="text-white/50"> / {formatTime(duration)}</span>
            </span>

            <span className="hidden text-xs text-white/50 md:inline">
              · kalan {formatTime(remaining)}
            </span>

            <div className="flex-1" />

            {/* Hız */}
            <div className="relative">
              <ControlButton
                label={`Oynatma hızı: ${speedLabel}`}
                onClick={() => setSpeedOpen((o) => !o)}
                wide
              >
                <Gauge className="h-5 w-5" />
                <span className="text-xs font-bold tabular-nums">{speedLabel}</span>
              </ControlButton>
              {speedOpen && (
                <ul
                  role="menu"
                  className="absolute bottom-full right-0 mb-2 w-28 overflow-hidden rounded-xl border border-white/10 bg-black/90 py-1 shadow-elevated backdrop-blur"
                >
                  {SPEEDS.map((s) => (
                    <li key={s} role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={speed === s}
                        onClick={() => changeSpeed(s)}
                        className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-sm transition hover:bg-white/10 ${
                          speed === s ? "font-bold text-rehberim-accent-light" : "text-white/90"
                        }`}
                      >
                        {s === 1 ? "Normal" : `${s}x`}
                        {speed === s && <Check className="h-4 w-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {pipSupported && (
              <ControlButton label="Küçük pencerede izle" onClick={() => void togglePip()}>
                <PictureInPicture2 className="h-5 w-5" />
              </ControlButton>
            )}

            <ControlButton
              label={fullscreen ? "Tam ekrandan çık" : "Tam ekran"}
              onClick={() => void toggleFullscreen()}
            >
              {fullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </ControlButton>
          </div>
        </div>
      )}

      {/* İzlendi rozeti (oynatma sırasında sağ üst) */}
      {started && watched && !error && (
        <span
          className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-soft transition-opacity ${
            controlsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Check className="h-3.5 w-3.5" /> İzlendi
        </span>
      )}
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  wide = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 items-center justify-center gap-1 rounded-lg text-white/95 transition hover:bg-white/15 active:scale-95 ${
        wide ? "px-2" : "w-9"
      }`}
    >
      {children}
    </button>
  );
}
