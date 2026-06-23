"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Swords, X } from "lucide-react";
import { LeagueBadge } from "./LeagueBadge";
import { rankLabel } from "@/lib/competitive/ranks";
import { subscribeToMatchmaking } from "@/lib/competitive/realtime";

/**
 * Matchmaking ekranı:
 *   - Mount'ta `POST /api/comp/queue/join` ile kuyruğa girer
 *   - Realtime ile `comp_matches` INSERT bildirimi bekler
 *   - 3 sn'de bir `POST /api/comp/queue/tick` polling fallback
 *   - "İptal" → `POST /api/comp/queue/leave` → /rekabet
 *
 * matched sonucunda doğrudan /rekabet/[matchId]'e yönlendirir.
 */
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
  const [statusText, setStatusText] = useState("Rakip aranıyor…");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const matchedRef = useRef(false);
  const subRef = useRef<{ unsubscribe: () => void } | null>(null);

  // Eşleşmeye git (idempotent)
  function goToMatch(matchId: string) {
    if (matchedRef.current) return;
    matchedRef.current = true;
    subRef.current?.unsubscribe();
    router.replace(`/rekabet/${matchId}`);
  }

  // İlk join + dinleyici
  useEffect(() => {
    let cancelled = false;

    // Realtime
    subRef.current = subscribeToMatchmaking({
      userId,
      onMatched: (id) => goToMatch(id),
      onError: () => {
        // sessiz: polling fallback zaten devrede
      },
    });

    // İlk queue join
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
        }
      })
      .catch(() => {
        if (!cancelled) setError("Bağlantı hatası — tekrar dene.");
      });

    return () => {
      cancelled = true;
      subRef.current?.unsubscribe();
    };
    // userId/subjectFilter ekran içinde değişmez (server prop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Polling fallback + zaman sayacı
  useEffect(() => {
    if (matchedRef.current) return;
    const tickId = setInterval(async () => {
      if (matchedRef.current) return;
      try {
        const r = await fetch("/api/comp/queue/tick", { method: "POST" });
        const d = await r.json();
        if (d?.status === "matched" && typeof d.matchId === "string") {
          goToMatch(d.matchId);
        }
      } catch {
        // sessiz
      }
    }, 3000);
    const elapsedId = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => {
      clearInterval(tickId);
      clearInterval(elapsedId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bekleme süresine göre ipucu metni
  useEffect(() => {
    if (elapsed > 15) setStatusText("Hâlâ arıyoruz — komşu liglere bakıyoruz…");
    else if (elapsed > 5)
      setStatusText("Rakip aranıyor — ortalama bekleme 15 sn…");
  }, [elapsed]);

  async function handleCancel() {
    try {
      await fetch("/api/comp/queue/leave", { method: "POST" });
    } catch {
      // sessiz
    }
    router.replace("/rekabet");
  }

  return (
    <div className="ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-rehberim-accent/15 blur-3xl"
      />

      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-rehberim-accent to-amber-500 text-white shadow-card">
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

      {error && (
        <p className="relative mt-4 text-sm text-red-600">{error}</p>
      )}

      <button
        onClick={handleCancel}
        className="relative mt-8 inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-4 py-2 text-sm font-bold text-rehberim-navy/70 transition-all duration-200 ease-smooth hover:bg-rehberim-muted"
      >
        <X className="h-4 w-4" />
        İptal et
      </button>
    </div>
  );
}
