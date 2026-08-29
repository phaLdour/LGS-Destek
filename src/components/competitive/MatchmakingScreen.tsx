"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, RotateCcw, Swords, X } from "lucide-react";
import { LeagueBadge } from "./LeagueBadge";
import { rankLabel } from "@/lib/competitive/ranks";
import { subscribeToMatchmaking } from "@/lib/competitive/realtime";

/**
 * Matchmaking ekranı:
 *   - Mount'ta önce `GET /api/comp/active-match`: devam eden maç varsa
 *     forfeit onayı sorar (yeni maç aramak eskisini hükmen mağlup eder).
 *   - Onay sonrası (ya da aktif maç yoksa) `POST /api/comp/queue/join`.
 *   - Realtime ile `comp_matches` INSERT bildirimi bekler.
 *   - 3 sn'de bir `POST /api/comp/queue/tick` polling fallback.
 *   - "İptal" → `POST /api/comp/queue/leave` → /rekabet.
 *   - 60sn+ sonra "Baştan başla" → reset + yeniden join.
 *
 * matched sonucunda doğrudan /rekabet/[matchId]'e yönlendirir.
 */
type Mode = "checking" | "confirm-forfeit" | "searching";

export function MatchmakingScreen({
  userId,
  tier,
  subjectFilter,
}: {
  userId: string;
  tier: number;
  subjectFilter: string | null;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("checking");
  const [activeMatchId, setActiveMatchId] = useState<string | null>(null);
  const [forfeiting, setForfeiting] = useState(false);
  const [statusText, setStatusText] = useState("Rakip aranıyor…");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastTick, setLastTick] = useState<string>("—");
  const [resetting, setResetting] = useState(false);
  const matchedRef = useRef(false);
  const subRef = useRef<{ unsubscribe: () => void } | null>(null);

  // Eşleşmeye git (idempotent)
  function goToMatch(matchId: string) {
    if (matchedRef.current) return;
    matchedRef.current = true;
    subRef.current?.unsubscribe();
    router.replace(`/rekabet/${matchId}`);
  }

  // Mount'ta aktif maç kontrolü → forfeit onayı ya da direkt arama
  useEffect(() => {
    let cancelled = false;
    fetch("/api/comp/active-match")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.matchId) {
          setActiveMatchId(d.matchId as string);
          setMode("confirm-forfeit");
        } else {
          setMode("searching");
        }
      })
      .catch(() => {
        if (!cancelled) setMode("searching"); // kontrol edemezsek aramaya geç
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // İlk join + Realtime dinleyici (yalnız searching modunda)
  useEffect(() => {
    if (mode !== "searching") return;
    let cancelled = false;

    subRef.current = subscribeToMatchmaking({
      userId,
      onMatched: (id) => goToMatch(id),
      onError: () => {
        // sessiz: polling fallback zaten devrede
      },
    });

    fetch("/api/comp/queue/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectFilter }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.status === "matched" && typeof d.matchId === "string") {
          goToMatch(d.matchId);
        } else if (d?.error) {
          setError(d.detail ? `${d.error}: ${d.detail}` : d.error);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Bağlantı hatası — tekrar dene.");
      });

    return () => {
      cancelled = true;
      subRef.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Polling fallback + zaman sayacı (yalnız searching modunda)
  useEffect(() => {
    if (mode !== "searching") return;
    if (matchedRef.current) return;
    const tickId = setInterval(async () => {
      if (matchedRef.current) return;
      try {
        const r = await fetch("/api/comp/queue/tick", { method: "POST" });
        const d = await r.json();
        setLastTick(d?.status ?? "?");
        if (d?.status === "matched" && typeof d.matchId === "string") {
          goToMatch(d.matchId);
        }
      } catch {
        setLastTick("net-err");
      }
    }, 3000);
    const elapsedId = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      clearInterval(tickId);
      clearInterval(elapsedId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Bekleme süresine göre ipucu metni (schema tier ramp eşikleriyle uyumlu)
  useEffect(() => {
    if (elapsed > 90) setStatusText("Geniş bant — tüm liglerden rakip arıyoruz…");
    else if (elapsed > 45)
      setStatusText("±2 lige genişledik — biraz daha sabır…");
    else if (elapsed > 15) setStatusText("Komşu liglere bakıyoruz…");
    else setStatusText("Rakip aranıyor — ortalama bekleme 15 sn…");
  }, [elapsed]);

  async function handleCancel() {
    try {
      await fetch("/api/comp/queue/leave", { method: "POST" });
    } catch {
      // sessiz
    }
    router.replace("/rekabet");
  }

  async function handleReset() {
    if (resetting) return;
    setResetting(true);
    setError(null);
    try {
      // FAZ 12: sıfırlama artık devam eden maçı silmiyor (kaybedenin
      // bedava kaçışıydı). Aktif maç varsa kullanıcıyı ona geri götür;
      // çıkmak isterse "Maçı terk et" düğmesi var.
      const rr = await fetch("/api/comp/queue/reset", { method: "POST" });
      const rd = await rr.json().catch(() => null);
      if (rd?.activeMatchId && typeof rd.activeMatchId === "string") {
        setActiveMatchId(rd.activeMatchId);
        setError(
          "Devam eden bir maçın var. Ona dön ya da terk et — terk etmek hükmen mağlubiyet sayılır.",
        );
        return;
      }
      setElapsed(0);
      setLastTick("—");
      matchedRef.current = false;
      const r = await fetch("/api/comp/queue/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectFilter }),
      });
      const d = await r.json();
      if (d?.status === "matched" && typeof d.matchId === "string") {
        goToMatch(d.matchId);
      } else if (d?.error) {
        setError(d.detail ? `${d.error}: ${d.detail}` : d.error);
      }
    } catch {
      setError("Sıfırlama başarısız — tekrar dene.");
    } finally {
      setResetting(false);
    }
  }

  // Eski maçı terk et → hükmen mağlup → yeni aramaya geç
  async function handleForfeitAndSearch() {
    if (forfeiting || !activeMatchId) return;
    setForfeiting(true);
    setError(null);
    try {
      const r = await fetch(`/api/comp/match/${activeMatchId}/forfeit`, {
        method: "POST",
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setError(d?.error ? `Terk edilemedi: ${d.error}` : "Terk edilemedi.");
        setForfeiting(false);
        return;
      }
      setActiveMatchId(null);
      setMode("searching");
    } catch {
      setError("Bağlantı hatası — tekrar dene.");
    } finally {
      setForfeiting(false);
    }
  }

  // ── Faz: aktif maç kontrol ediliyor ──
  if (mode === "checking") {
    return (
      <div className="ring-hairline rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-rehberim-accent" />
        <p className="mt-3 text-sm text-rehberim-navy/55">Hazırlanıyor…</p>
      </div>
    );
  }

  // ── Faz: devam eden maç var, forfeit onayı ──
  if (mode === "confirm-forfeit") {
    return (
      <div className="ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-rehberim-navy">
          Devam eden bir maçın var
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-rehberim-navy/60">
          Yeni maç aramak için mevcut maçı terk etmen gerekiyor. Terk edersen{" "}
          <strong className="text-red-600">hükmen mağlup</strong> sayılırsın ve{" "}
          <strong className="text-red-600">−30 puan</strong> kaybedersin.
          Rakibin hükmen kazanır.
        </p>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleForfeitAndSearch}
            disabled={forfeiting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 px-5 py-3 text-sm font-extrabold text-white shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft disabled:opacity-50"
          >
            {forfeiting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Swords className="h-4 w-4" />
            )}
            Terk et ve yeni maç ara
          </button>
          <button
            onClick={() => router.replace("/rekabet")}
            disabled={forfeiting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-white px-5 py-3 text-sm font-bold text-rehberim-navy/70 transition-all duration-200 ease-smooth hover:bg-rehberim-muted disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Vazgeç
          </button>
        </div>
        {activeMatchId && (
          <button
            onClick={() => router.replace(`/rekabet/${activeMatchId}`)}
            disabled={forfeiting}
            className="mt-4 text-xs font-semibold text-rehberim-navy/45 underline-offset-2 hover:text-rehberim-navy/70 hover:underline disabled:opacity-50"
          >
            Maça geri dön
          </button>
        )}
      </div>
    );
  }

  // ── Faz: rakip aranıyor ──
  const searchBand =
    elapsed <= 15 ? "±0" : elapsed <= 45 ? "±1" : elapsed <= 90 ? "±2" : "±3";

  return (
    <div className="ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rehberim-accent/15 blur-3xl"
      />

      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark text-rehberim-on-accent shadow-card">
        <Swords className="h-10 w-10" />
      </div>

      <h1 className="relative mt-6 text-2xl font-extrabold tracking-tight text-rehberim-navy">
        {statusText}
      </h1>
      <p className="relative mt-2 text-sm text-rehberim-navy/55">
        {rankLabel(tier)} ligindesin
        {subjectFilter ? ` · ${subjectFilter} düellosu` : ""}
      </p>

      <div className="relative mt-6 flex items-center justify-center gap-2 text-rehberim-navy/60">
        <Loader2 className="h-5 w-5 animate-spin text-rehberim-accent" />
        <span className="tabular-nums text-sm font-semibold">
          {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-8 flex items-center justify-center gap-4">
        <LeagueBadge tier={tier} size="md" />
        <span className="text-2xl font-extrabold text-rehberim-navy/30">vs</span>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-rehberim-border text-rehberim-navy/30">
          ?
        </span>
      </div>

      {/* Debug paneli — "ne arıyoruz" şeffaflığı */}
      <dl className="relative mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-rehberim-muted/60 px-4 py-3 text-xs">
        <div>
          <dt className="text-rehberim-navy/50">Bant</dt>
          <dd className="font-bold text-rehberim-navy tabular-nums">
            {searchBand} lig
          </dd>
        </div>
        <div>
          <dt className="text-rehberim-navy/50">Filtre</dt>
          <dd className="truncate font-bold text-rehberim-navy">
            {subjectFilter ?? "karma"}
          </dd>
        </div>
        <div>
          <dt className="text-rehberim-navy/50">Son tick</dt>
          <dd className="font-bold text-rehberim-navy">{lastTick}</dd>
        </div>
      </dl>

      {error && (
        <p className="relative mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleCancel}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-4 py-2 text-sm font-bold text-rehberim-navy/70 transition-all duration-200 ease-smooth hover:bg-rehberim-muted"
        >
          <X className="h-4 w-4" />
          İptal et
        </button>
        {elapsed >= 60 && (
          <button
            onClick={handleReset}
            disabled={resetting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-4 py-2 text-sm font-bold text-rehberim-accent transition-all duration-200 ease-smooth hover:bg-rehberim-accent/20 disabled:opacity-50"
          >
            <RotateCcw className={`h-4 w-4 ${resetting ? "animate-spin" : ""}`} />
            {resetting ? "Sıfırlanıyor…" : "Baştan başla"}
          </button>
        )}
      </div>
    </div>
  );
}
