"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Home,
  Swords,
  TrendingDown,
  Trophy,
  X,
} from "lucide-react";
import { DeltaAnimator } from "./DeltaAnimator";
import { LeagueBadge } from "./LeagueBadge";
import { LeagueCrest } from "./LeagueCrest";
import { leagueOf, rankLabel } from "@/lib/competitive/ranks";
import { crestTitle } from "@/lib/competitive/rewards";

const LETTERS = ["A", "B", "C", "D"];

/**
 * Kayıtlı şık indeksini yalnızca hâlâ anlamlıysa döner.
 *
 * Şıklar artık yüklenirken sabit bir sırayla karıştırılıyor (bkz.
 * lib/shuffleOptions). Karıştırma öncesinde oynanmış maçların
 * `choice` indeksleri eski sıraya göre kaydedildiği için yeni sırada
 * başka bir şıkka denk gelir. Doğruluk bilgisi (`isCorrect`) ayrı
 * saklandığından tutarsızlığı yakalayabiliyoruz: kayıt "doğru" diyorsa
 * ama indeks doğru şıkka denk gelmiyorsa (veya tersi), işaret
 * gösterilmez. Skor ve sonuç zaten `isCorrect`ten okunuyor.
 */
function gecerliSecim(
  cevap: AnswerRow | undefined,
  correctIndex: number,
): number | null {
  if (!cevap || cevap.choice === null) return null;
  if (cevap.isCorrect === null) return cevap.choice;
  if ((cevap.choice === correctIndex) !== cevap.isCorrect) return null;
  return cevap.choice;
}

type ReplayQuestion = {
  questionId: string;
  qIndex: number;
  question: string;
  options: string[];
  subjectName: string;
  topicName: string;
  correctIndex: number;
  explanation?: string;
};

type AnswerRow = {
  qIndex: number;
  choice: number | null;
  isCorrect: boolean | null;
};

type SideSummary = {
  correct: number;
  blank: number;
  durationSeconds: number;
  score: number;
  delta: number;
  tierAtStart: number;
};

/**
 * Maç sonu ekranı: kazandın/kaybettin/berabere rozeti, ELO delta
 * animasyonu, skor kıyaslama, 4-kart özet, ve replay grid (tıklayınca
 * Quiz review pattern'i).
 */
export function MatchResult({
  matchOutcome,
  me,
  opponent,
  myAnswers,
  opponentAnswers,
  questions,
  isForfeit = false,
  iForfeited = false,
  opponentName = "Rakip",
  opponentId = null,
  opponentBestTier = null,
  myBestTier = null,
  myTierAfter = null,
  isFriendly = false,
}: {
  matchOutcome: "win" | "loss" | "draw";
  me: SideSummary;
  opponent: SideSummary;
  myAnswers: AnswerRow[];
  opponentAnswers: AnswerRow[];
  questions: ReplayQuestion[];
  isForfeit?: boolean;
  iForfeited?: boolean;
  /** Faz 5: rakibin herkese açık adı / profili / lig nişanı */
  opponentName?: string;
  opponentId?: string | null;
  opponentBestTier?: number | null;
  myBestTier?: number | null;
  /** Arkadaş düellosu: lig puanı, seri ve rütbe etkilenmez. */
  isFriendly?: boolean;
  /** Faz 6: maç sonundaki kademem — terfi/düşüş kutlaması için */
  myTierAfter?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const titleMap = {
    win: { text: "Kazandın!", icon: Trophy, color: "from-emerald-500 to-emerald-600" },
    loss: { text: "Bu sefer olmadı", icon: X, color: "from-rose-500 to-red-600" },
    draw: { text: "Berabere", icon: Swords, color: "from-amber-400 to-amber-500" },
  } as const;
  const Title = titleMap[matchOutcome];
  const TitleIcon = Title.icon;

  // Net hesabı (LGS): correct - wrong/3
  const myWrong = 10 - me.correct - me.blank;
  const oppWrong = 10 - opponent.correct - opponent.blank;
  const myNet = Math.max(0, me.correct - myWrong / 3);
  const oppNet = Math.max(0, opponent.correct - oppWrong / 3);

  // Faz 6: bu maçta kademe değişti mi?
  const promoted =
    myTierAfter !== null &&
    myTierAfter !== undefined &&
    myTierAfter > me.tierAtStart;
  const demoted =
    myTierAfter !== null &&
    myTierAfter !== undefined &&
    myTierAfter < me.tierAtStart;
  const newLeague =
    promoted || demoted ? leagueOf(myTierAfter as number) : null;
  const leagueChanged =
    newLeague !== null && newLeague.slug !== leagueOf(me.tierAtStart).slug;

  return (
    <div className="space-y-5">
      {/* Faz 6: terfi kutlaması — lig sisteminin ödül anı */}
      {promoted && newLeague && (
        <div
          className={`ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br ${newLeague.color.gradientFrom} ${newLeague.color.gradientTo} p-5 text-white shadow-soft`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/25 blur-3xl"
          />
          <div className="relative flex items-center gap-4">
            <span className="animate-scale-in">
              <LeagueCrest
                tier={myTierAfter as number}
                size={64}
                title={`${rankLabel(myTierAfter as number)} kademesi`}
              />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
                {leagueChanged ? "Yeni lig" : "Terfi"}
              </p>
              <p className="text-2xl font-extrabold tracking-tight">
                {rankLabel(myTierAfter as number)}
              </p>
              <p className="text-sm text-white/85">
                {leagueChanged
                  ? `${newLeague.name} ligine yükseldin! Nişanın da güncellendi.`
                  : "Bir üst kademeye çıktın — böyle devam!"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Kademe düşüşü — sessiz kalmasın ama kutlama değil */}
      {demoted && myTierAfter !== null && (
        <div className="flex items-start gap-3 rounded-2xl border border-rehberim-border bg-rehberim-muted/50 p-4 text-sm text-rehberim-navy/70">
          <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-rehberim-navy/40" />
          <p>
            <span className="font-extrabold text-rehberim-navy">
              {rankLabel(myTierAfter)} kademesine düştün.
            </span>{" "}
            Çıktığın ligin altına düşmezsin — bir sonraki maçta geri
            tırmanabilirsin.
          </p>
        </div>
      )}

      {/* Forfeit (hükmen) bilgi kutusu — arkadaş maçında puan işlemez,
          bu yüzden "−30 puan kaybettin" metni orada gösterilmez. */}
      {isForfeit && isFriendly && (
        <div className="flex items-start gap-3 rounded-2xl border border-rehberim-border bg-rehberim-muted/50 p-4 text-sm text-rehberim-navy/75">
          <X className="mt-0.5 h-5 w-5 shrink-0 text-rehberim-navy/40" />
          <p>
            <span className="font-extrabold">
              {iForfeited
                ? "Bu arkadaş maçından ayrıldın."
                : "Rakibin arkadaş maçından ayrıldı."}
            </span>{" "}
            Arkadaş maçı olduğu için lig puanı işlemedi.
          </p>
        </div>
      )}
      {isForfeit &&
        !isFriendly &&
        (iForfeited ? (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <X className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <span className="font-extrabold">Bu maçtan ayrıldın.</span> Hükmen
              mağlup sayıldın ve <strong>−30 puan</strong> kaybettin. Bir dahaki
              sefere maçı tamamlamayı dene!
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <Trophy className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <span className="font-extrabold">Rakibin maçı terk etti.</span>{" "}
              Hükmen kazandın ve <strong>+30 puan</strong> kazandın!
            </p>
          </div>
        ))}

      {/* Sonuç başlığı + delta */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${Title.color} p-6 text-white shadow-soft`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-white/15 blur-3xl"
        />
        <div className="relative flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
            <TitleIcon className="h-9 w-9" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {Title.text}
            </h1>
            {isFriendly ? (
              <p className="text-sm text-white/85">
                Arkadaş maçı — lig puanın, serin ve rütben değişmedi.
              </p>
            ) : (
              <p className="text-sm text-white/85">
                Lig puanın:{" "}
                <DeltaAnimator to={me.delta} className="text-2xl text-white" />
                <span className="ml-1 text-white/70">puan</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Skor kıyaslama 2 sütun */}
      <div className="ring-hairline grid grid-cols-2 gap-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
        <SideCard
          title="Sen"
          tier={me.tierAtStart}
          bestTier={myBestTier}
          score={me.score}
          correct={me.correct}
          blank={me.blank}
          duration={me.durationSeconds}
          net={myNet}
          highlight={matchOutcome === "win"}
        />
        <SideCard
          title={opponentName}
          href={opponentId ? `/rekabet/oyuncu/${opponentId}` : undefined}
          tier={opponent.tierAtStart}
          bestTier={opponentBestTier}
          score={opponent.score}
          correct={opponent.correct}
          blank={opponent.blank}
          duration={opponent.durationSeconds}
          net={oppNet}
          highlight={matchOutcome === "loss"}
        />
      </div>

      {/* Replay grid */}
      <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-rehberim-navy/65">
          Cevap incelemesi
        </h3>
        <p className="mt-1 text-xs text-rehberim-navy/55">
          Soruya tıkla, senin ve rakibin cevabını + doğru yanıtı gör.
        </p>
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {Array.from({ length: 10 }, (_, i) => {
            const mine = myAnswers.find((a) => a.qIndex === i);
            const c = mine?.isCorrect;
            const bg =
              c === true
                ? "bg-emerald-100 text-emerald-700 ring-emerald-300"
                : c === false
                  ? "bg-red-100 text-red-700 ring-red-300"
                  : "bg-rehberim-muted text-rehberim-navy/50 ring-rehberim-border";
            return (
              <button
                key={i}
                onClick={() => setOpenIndex(i)}
                className={`flex h-12 items-center justify-center rounded-xl text-sm font-extrabold tabular-nums ring-1 transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-card ${bg} ${
                  openIndex === i ? "ring-2 ring-rehberim-accent" : ""
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {openIndex !== null && (
          <ReplayCard
            question={questions[openIndex]}
            myChoice={gecerliSecim(
              myAnswers.find((a) => a.qIndex === openIndex),
              questions[openIndex].correctIndex,
            )}
            oppChoice={gecerliSecim(
              opponentAnswers.find((a) => a.qIndex === openIndex),
              questions[openIndex].correctIndex,
            )}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </div>

      {/* Butonlar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/rekabet/eslesme"
          className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-4 py-3 text-sm font-extrabold text-rehberim-navy shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
        >
          <Swords className="h-4 w-4" />
          Yeni maç
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/rekabet"
          className="flex items-center justify-center gap-2 rounded-2xl border border-rehberim-border bg-white px-4 py-3 text-sm font-extrabold text-rehberim-navy shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:bg-rehberim-muted"
        >
          <Home className="h-4 w-4" />
          Lobiye dön
        </Link>
      </div>
    </div>
  );
}

function SideCard({
  title,
  href,
  tier,
  bestTier,
  score,
  correct,
  blank,
  duration,
  net,
  highlight,
}: {
  title: string;
  /** Varsa başlık herkese açık profile link olur */
  href?: string;
  tier: number;
  /** Lig nişanı (tüm zamanlar); null = gösterme */
  bestTier?: number | null;
  score: number;
  correct: number;
  blank: number;
  duration: number;
  net: number;
  highlight?: boolean;
}) {
  const wrong = 10 - correct - blank;
  const heading = (
    <span className="flex min-w-0 items-center gap-1.5">
      <span className="truncate text-sm font-extrabold tracking-tight text-rehberim-navy">
        {title}
      </span>
      {bestTier !== null && bestTier !== undefined && (
        <LeagueCrest tier={bestTier} size={16} title={crestTitle(bestTier)} />
      )}
    </span>
  );
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight
          ? "border-emerald-300 bg-emerald-50"
          : "border-rehberim-border bg-rehberim-muted/40"
      }`}
    >
      <div className="flex items-center gap-2">
        <LeagueBadge tier={tier} size="sm" />
        {href ? (
          <Link href={href} className="rb-tip min-w-0 hover:underline" data-tip="Oyuncu profili">
            {heading}
          </Link>
        ) : (
          heading
        )}
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-rehberim-navy/55">
        Skor
      </p>
      <p className="text-2xl font-extrabold tabular-nums text-rehberim-navy">
        {score.toFixed(3)}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[11px] font-semibold">
        <Pill label="D" value={correct} color="bg-emerald-100 text-emerald-700" />
        <Pill label="Y" value={wrong} color="bg-red-100 text-red-700" />
        <Pill label="B" value={blank} color="bg-rehberim-muted text-rehberim-navy/60" />
        <Pill
          label="Net"
          value={net.toFixed(1)}
          color="bg-rehberim-accent/15 text-rehberim-accent-deep"
        />
      </div>
      <p className="mt-2 text-[11px] text-rehberim-navy/55 tabular-nums">
        Süre: {Math.floor(duration / 60)}:
        {(duration % 60).toString().padStart(2, "0")}
      </p>
    </div>
  );
}

function Pill({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className={`rounded-lg px-1.5 py-1 ${color}`}>
      <p className="tabular-nums text-sm font-extrabold leading-tight">
        {value}
      </p>
      <p className="text-[9px] uppercase tracking-wider opacity-75">{label}</p>
    </div>
  );
}

function ReplayCard({
  question,
  myChoice,
  oppChoice,
  onClose,
}: {
  question: ReplayQuestion;
  myChoice: number | null;
  oppChoice: number | null;
  onClose: () => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-rehberim-border bg-rehberim-muted/40 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-accent">
            Soru {question.qIndex + 1} · {question.subjectName} · {question.topicName}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="rounded-md p-1 text-rehberim-navy/40 hover:bg-rehberim-muted hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mb-3 whitespace-pre-line text-sm leading-relaxed text-rehberim-navy">
        {question.question}
      </p>
      <div className="grid gap-2">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const isMine = i === myChoice;
          const isOpp = i === oppChoice;
          const cls = isCorrect
            ? "border-emerald-300 bg-emerald-50"
            : isMine
              ? "border-red-300 bg-red-50"
              : "border-rehberim-border bg-white";
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border p-3 ${cls}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold ${
                  isCorrect
                    ? "bg-emerald-500 text-white"
                    : isMine
                      ? "bg-red-500 text-white"
                      : "bg-rehberim-muted text-rehberim-navy/70"
                }`}
              >
                {isCorrect ? <Check className="h-3.5 w-3.5" /> : LETTERS[i]}
              </span>
              <span className="flex-1 text-sm text-rehberim-navy">{opt}</span>
              <span className="flex flex-col items-end gap-0.5 text-[10px] font-bold uppercase tracking-wider">
                {isMine && (
                  <span className="rounded bg-red-500/15 px-1.5 py-0.5 text-red-700">
                    Senin
                  </span>
                )}
                {isOpp && (
                  <span className="rounded bg-rehberim-navy/10 px-1.5 py-0.5 text-rehberim-navy/70">
                    Rakip
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      {question.explanation && (
        <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-rehberim-border">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rehberim-accent">
            Açıklama
          </p>
          <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-rehberim-navy/85">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
