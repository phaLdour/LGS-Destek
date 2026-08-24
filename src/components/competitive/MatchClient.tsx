"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Loader2, Users, WifiOff } from "lucide-react";
import { LeagueBadge } from "./LeagueBadge";
import { LeagueCrest } from "./LeagueCrest";
import { rankLabel } from "@/lib/competitive/ranks";
import { crestTitle } from "@/lib/competitive/rewards";
import { subscribeToMatch } from "@/lib/competitive/realtime";

const LETTERS = ["A", "B", "C", "D"];

type MatchInfo = {
  id: string;
  questionCount: number;
  deadlineAt: string; // ISO
  startedAt: string;
  /** Arkadaş düellosu: puan işlemez, hükmen kazanma teklifi gösterilmez. */
  isFriendly?: boolean;
};

type MatchQuestionView = {
  questionId: string;
  qIndex: number;
  question: string;
  options: string[];
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
};

type Phase = "playing" | "waiting-opponent" | "finalizing";

function fmtClock(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * Aktif maç UI. Plan dosyasındaki spec:
 *   - Server-canonical timer (deadline_at), client görsel sayaç
 *   - Sessiz feedback (doğru/yanlış maç sırasında gösterilmez)
 *   - Rakip ilerleme barı: Realtime postgres_changes + polling fallback
 *   - "İşaretle ve Sıradaki" → POST /answer → nextQuestion batch
 *   - Süre dolunca veya 10. cevap sonrası otomatik finalize
 */
export function MatchClient({
  match,
  initialQuestion,
  myUserId,
  myTier,
  opponentTier,
  opponentName = "Rakip",
  opponentBestTier = null,
  myAnsweredCountInitial,
  opponentAnsweredCountInitial,
}: {
  match: MatchInfo;
  initialQuestion: MatchQuestionView;
  myUserId: string;
  myTier: number;
  opponentTier: number;
  /** Rakibin herkese açık adı (takma ad / "Ad S.") */
  opponentName?: string;
  /** Rakibin lig nişanı (tüm zamanlar en yüksek kademe); null = nişansız */
  opponentBestTier?: number | null;
  myAnsweredCountInitial: number;
  opponentAnsweredCountInitial: number;
}) {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState<MatchQuestionView | null>(
    initialQuestion,
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [myAnswered, setMyAnswered] = useState(myAnsweredCountInitial);
  const [opponentAnswered, setOpponentAnswered] = useState(
    opponentAnsweredCountInitial,
  );
  const [phase, setPhase] = useState<Phase>(
    myAnsweredCountInitial >= match.questionCount
      ? "waiting-opponent"
      : "playing",
  );
  const [remaining, setRemaining] = useState(() => {
    const ms = new Date(match.deadlineAt).getTime() - Date.now();
    return Math.max(0, Math.floor(ms / 1000));
  });
  const [error, setError] = useState<string | null>(null);
  // Faz 7: rakip kaç saniyedir sessiz (server hesaplıyor); 90+ ise buton çıkar
  const [opponentIdle, setOpponentIdle] = useState<number | null>(null);
  const [claiming, setClaiming] = useState(false);
  const finalizingRef = useRef(false);
  const subRef = useRef<{ unsubscribe: () => void } | null>(null);
  // Realtime postgres_changes RLS'e tabi; aktif maçta rakibin INSERT'i client'a
  // düşmüyor (anti-cheat policy). Polling'i her zaman aktif tut.
  const [usePolling, setUsePolling] = useState(true);

  // Timer (1000ms)
  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(
        0,
        Math.floor((new Date(match.deadlineAt).getTime() - Date.now()) / 1000),
      );
      setRemaining(left);
    }, 1000);
    return () => clearInterval(id);
  }, [match.deadlineAt]);

  const triggerFinalize = useCallback(async () => {
    if (finalizingRef.current) return;
    finalizingRef.current = true;
    setPhase("finalizing");
    try {
      await fetch(`/api/comp/match/${match.id}/finalize`, { method: "POST" });
    } catch {
      // sessiz: sonuç sayfası yine açılır, status hala active ise yönlendirme
    }
    router.replace(`/rekabet/${match.id}/sonuc`);
  }, [match.id, router]);

  // Süre dolunca otomatik finalize
  useEffect(() => {
    if (remaining > 0) return;
    triggerFinalize();
  }, [remaining, triggerFinalize]);

  // Realtime subscription
  useEffect(() => {
    subRef.current = subscribeToMatch(match.id, myUserId, {
      onOpponentAnswer: () => {
        setOpponentAnswered((c) => Math.min(match.questionCount, c + 1));
      },
      onFinished: () => triggerFinalize(),
      onError: () => setUsePolling(true),
    });
    return () => {
      subRef.current?.unsubscribe();
    };
  }, [match.id, myUserId, match.questionCount, triggerFinalize]);

  // Polling fallback
  useEffect(() => {
    if (!usePolling) return;
    const id = setInterval(async () => {
      try {
        const r = await fetch(`/api/comp/match/${match.id}`);
        const d = await r.json();
        if (d?.match?.status === "finished") {
          triggerFinalize();
          return;
        }
        if (typeof d?.opponentAnsweredCount === "number") {
          setOpponentAnswered(d.opponentAnsweredCount);
        }
        setOpponentIdle(
          typeof d?.opponentIdleSeconds === "number"
            ? d.opponentIdleSeconds
            : null,
        );
      } catch {
        // sessiz
      }
    }, 3000);
    return () => clearInterval(id);
  }, [usePolling, match.id, triggerFinalize]);

  // Faz 7: rakip koptuysa hükmen galibiyeti talep et
  async function handleClaimAbandoned() {
    if (claiming) return;
    setClaiming(true);
    setError(null);
    try {
      const r = await fetch(`/api/comp/match/${match.id}/claim-abandoned`, {
        method: "POST",
      });
      const d = await r.json();
      if (d?.claimed) {
        triggerFinalize();
        return;
      }
      setError("Rakibin yeniden bağlandı — maç devam ediyor.");
      setOpponentIdle(0);
    } catch {
      setError("Bağlantı hatası — tekrar dene.");
    } finally {
      setClaiming(false);
    }
  }

  async function handleConfirm() {
    if (sending || selected === null || !currentQ) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/comp/match/${match.id}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qIndex: currentQ.qIndex, choice: selected }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.error === "expired" || data?.error === "match_finished") {
          triggerFinalize();
          return;
        }
        setError(
          data?.error === "out_of_order"
            ? "Bir senkron sorunu oluştu — yeniliyoruz."
            : "Cevap gönderilemedi.",
        );
        setSending(false);
        return;
      }
      setMyAnswered((c) => c + 1);
      setSelected(null);
      if (data.autoFinalized) {
        triggerFinalize();
        return;
      }
      if (data.nextQuestion) {
        setCurrentQ(data.nextQuestion as MatchQuestionView);
      } else {
        // Kendi 10'umu bitirdim, rakip bekleniyor
        setCurrentQ(null);
        setPhase("waiting-opponent");
      }
    } catch {
      setError("Bağlantı hatası — tekrar dene.");
    }
    setSending(false);
  }

  const lowTime = remaining <= 60;

  return (
    <div className="space-y-4">
      {/* Üst panel — timer + ilerleme */}
      <div className="ring-hairline flex items-center justify-between gap-4 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
        <div className="flex items-center gap-3">
          <LeagueBadge tier={myTier} size="sm" />
          <div className="leading-tight">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-rehberim-navy/55">
              Sen
            </p>
            <p className="tabular-nums text-sm font-extrabold text-rehberim-navy">
              {myAnswered}/{match.questionCount}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 rounded-xl px-3 py-2 font-extrabold tabular-nums shadow-card ring-1 transition-colors duration-300 ${
            lowTime
              ? "bg-red-50 text-red-600 ring-red-200"
              : "bg-rehberim-muted text-rehberim-navy ring-rehberim-border"
          }`}
        >
          <Clock className={`h-5 w-5 ${lowTime ? "animate-pulse" : ""}`} />
          <span className="text-lg">{fmtClock(remaining)}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-0 text-right leading-tight">
            <p className="flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-rehberim-navy/55">
              {opponentBestTier !== null && opponentBestTier !== undefined && (
                <LeagueCrest
                  tier={opponentBestTier}
                  size={14}
                  title={crestTitle(opponentBestTier)}
                />
              )}
              <span className="max-w-[9rem] truncate">{opponentName}</span>
            </p>
            <p className="tabular-nums text-sm font-extrabold text-rehberim-navy">
              {opponentAnswered}/{match.questionCount}
            </p>
          </div>
          <LeagueBadge tier={opponentTier} size="sm" />
        </div>
      </div>

      {/* Opponent progress bar */}
      <div className="rounded-xl border border-rehberim-border bg-white p-3 shadow-card">
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-rehberim-navy/55">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            Rakibin ilerlemesi
          </span>
          <span className="tabular-nums">
            {opponentAnswered}/{match.questionCount}
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: match.questionCount }, (_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors duration-500 ${
                i < opponentAnswered
                  ? "bg-gradient-to-r from-rehberim-accent to-amber-500"
                  : "bg-rehberim-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Faz 7: rakip bağlantısı koptu mu? */}
      {/* Arkadaş maçında puan işlemediği için hükmen kazanma teklifi
          gösterilmez (sunucu tarafı da bu talebi reddeder). */}
      {phase === "playing" &&
        !match.isFriendly &&
        opponentIdle !== null &&
        opponentIdle >= 90 && (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <WifiOff className="h-5 w-5 shrink-0 text-amber-600" />
            <p className="min-w-0 flex-1">
              <span className="font-extrabold">Rakibin {Math.floor(opponentIdle / 60)} dk+ sessiz.</span>{" "}
              Bağlantısı kopmuş olabilir. Beklemek istemiyorsan maçı hükmen
              kazanabilirsin (+30 puan).
            </p>
            <button
              onClick={handleClaimAbandoned}
              disabled={claiming}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-4 py-2 text-sm font-extrabold text-white shadow-card transition hover:bg-amber-800 disabled:opacity-60"
            >
              {claiming && <Loader2 className="h-4 w-4 animate-spin" />}
              Hükmen kazan
            </button>
          </div>
        )}

      {match.isFriendly && (
        <p className="rounded-2xl border border-rehberim-border bg-rehberim-muted/50 px-4 py-2.5 text-sm text-rehberim-navy/70">
          <span className="font-extrabold text-rehberim-navy">Arkadaş maçı</span>{" "}
          — lig puanını, serini ve rütbeni etkilemez.
        </p>
      )}

      {/* Soru kartı */}
      {phase === "playing" && currentQ && (
        <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="rounded-full bg-rehberim-accent/12 px-2.5 py-1 font-bold uppercase tracking-wider text-rehberim-accent-deep">
              Soru {currentQ.qIndex + 1}/{match.questionCount}
            </span>
            <span className="text-rehberim-navy/55">
              {currentQ.subjectName} · {currentQ.topicName}
            </span>
          </div>

          <p className="mb-4 whitespace-pre-line text-[15px] leading-relaxed text-rehberim-navy">
            {currentQ.question}
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {currentQ.options.map((opt, i) => {
              const isSel = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  disabled={sending}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200 ease-smooth ${
                    isSel
                      ? "border-rehberim-accent bg-rehberim-accent/10 shadow-card"
                      : "border-rehberim-border bg-white hover:-translate-y-px hover:border-rehberim-accent/40"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${
                      isSel
                        ? "bg-rehberim-accent text-white"
                        : "bg-rehberim-muted text-rehberim-navy/70"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-sm text-rehberim-navy">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleConfirm}
            disabled={selected === null || sending}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-4 py-3 text-sm font-extrabold text-rehberim-navy shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-card"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            İşaretle ve Sıradaki
          </button>
        </div>
      )}

      {phase === "waiting-opponent" && (
        <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-8 text-center shadow-card">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-rehberim-accent" />
          <h2 className="mt-4 text-lg font-extrabold tracking-tight text-rehberim-navy">
            Cevapların tamam!
          </h2>
          <p className="mt-2 text-sm text-rehberim-navy/55">
            Rakibin {opponentAnswered}/{match.questionCount} cevap verdi.
            {opponentAnswered >= match.questionCount
              ? " Sonuç hesaplanıyor…"
              : " Bitince sonuç ekranı otomatik açılır."}
          </p>
          {/* Stuck kalma garantisi: rakip de bitirdiyse ya da kullanıcı
              beklemekten vazgeçtiyse manuel finalize tetiklenebilir. */}
          <button
            onClick={() => triggerFinalize()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-2 text-sm font-bold text-rehberim-navy/70 transition-all duration-200 ease-smooth hover:bg-rehberim-muted"
          >
            <Check className="h-4 w-4" />
            Sonucu şimdi gör
          </button>
        </div>
      )}

      {phase === "finalizing" && (
        <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-8 text-center shadow-card">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-rehberim-accent" />
          <h2 className="mt-4 text-lg font-extrabold tracking-tight text-rehberim-navy">
            Maç bitiyor…
          </h2>
        </div>
      )}
    </div>
  );
}
