"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Clock,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  type QuickScope,
  type PoolQuestion,
  collectAllQuestions,
  getQuickPool,
  markSolved,
  resetScope,
} from "@/lib/quickQuiz";
import { saveQuizResult } from "@/lib/tracking";

const LETTERS = ["A", "B", "C", "D"];

function fmtTime(seconds: number): string {
  const s = Math.round(seconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type Phase = "loading" | "active" | "done" | "exhausted";

type Record = {
  pool: PoolQuestion; // soru meta
  selected: number; // seçim
  correct: boolean;
};

export function QuickQuizClient({
  scope,
  title,
  subtitle,
  backHref,
}: {
  scope: QuickScope;
  title: string;
  subtitle: string;
  backHref: string;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [pool, setPool] = useState<PoolQuestion[]>([]);
  const [index, setIndex] = useState(0); // havuzdaki konum
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<Record[]>([]);
  const [startMs, setStartMs] = useState(0);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const saved = useRef(false);

  // Mount: havuzu kur
  useEffect(() => {
    const p = getQuickPool(scope);
    setPool(p);
    setStartMs(Date.now());
    if (p.length === 0) {
      const total = collectAllQuestions(scope).length;
      setPhase(total === 0 ? "done" : "exhausted");
    } else {
      setPhase("active");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = pool[index];
  const correctCount = useMemo(() => history.filter((h) => h.correct).length, [history]);
  const wrongCount = history.length - correctCount;
  const durationSec = (Date.now() - startMs) / 1000;

  function confirm() {
    if (selected === null || !current) return;
    const ok = selected === current.question.correctIndex;
    setHistory((h) => [...h, { pool: current, selected, correct: ok }]);
    markSolved(current.id);
    setSelected(null);

    if (index + 1 >= pool.length) {
      // havuz bitti → exhausted moduna geç (Yeniden başlat seçeneği)
      finishSession(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function finishSession(exhausted = false) {
    if (saved.current) return;
    saved.current = true;
    const dur = (Date.now() - startMs) / 1000;
    const total = history.length + (exhausted ? 0 : 0); // history zaten son cevabı içerir
    void saveQuizResult({
      subjectSlug:
        scope.kind === "karma-all"
          ? "__karma__"
          : scope.kind === "karma-subject"
            ? scope.subject
            : scope.subject,
      topicId:
        scope.kind === "topic"
          ? scope.topic
          : scope.kind === "karma-subject"
            ? "__karma__"
            : "__karma__",
      correct: history.filter((h) => h.correct).length,
      wrong: history.filter((h) => !h.correct).length,
      total,
      durationSeconds: dur,
    });
    setPhase(exhausted ? "exhausted" : "done");
  }

  function handleEnd() {
    finishSession(false);
  }

  function handleReset() {
    resetScope(scope);
    setHistory([]);
    setIndex(0);
    setSelected(null);
    saved.current = false;
    setStartMs(Date.now());
    const p = getQuickPool(scope);
    setPool(p);
    setPhase(p.length === 0 ? "done" : "active");
  }

  // ─── Görünümler ────────────────────────────────────────

  if (phase === "loading") {
    return <p className="text-rehberim-navy/55">Yükleniyor…</p>;
  }

  // Cevap inceleme görünümü
  if (reviewIndex !== null) {
    const r = history[reviewIndex];
    const q = r.pool.question;
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <button
          onClick={() => setReviewIndex(null)}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Rapora dön
        </button>
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
          {r.pool.subjectName} · {r.pool.topicName}
        </p>
        <p className="mb-4 font-semibold text-rehberim-navy">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isUserWrong = i === r.selected && !r.correct;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : isUserWrong
                      ? "border-red-300 bg-red-50"
                      : "border-rehberim-border bg-white"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isCorrect
                      ? "bg-green-500 text-white"
                      : isUserWrong
                        ? "bg-red-500 text-white"
                        : "bg-rehberim-muted text-rehberim-navy/60"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1 text-sm text-rehberim-navy">{opt}</span>
                {isCorrect && <Check className="h-5 w-5 text-green-600" />}
                {isUserWrong && <X className="h-5 w-5 text-red-500" />}
              </div>
            );
          })}
        </div>
        {q.explanation && (
          <p className="mt-3 rounded-xl bg-rehberim-muted px-4 py-3 text-sm leading-relaxed text-rehberim-navy/80">
            <span className="font-bold text-rehberim-navy">Açıklama: </span>
            {q.explanation}
          </p>
        )}
      </div>
    );
  }

  // Bitti / havuz tükendi → özet
  if (phase === "done" || phase === "exhausted") {
    if (phase === "exhausted" && history.length === 0) {
      // Havuzdaki tüm soruları daha önce çözmüş
      return (
        <div className="rounded-2xl border border-rehberim-border bg-white p-6 text-center shadow-card">
          <Sparkles className="mx-auto mb-3 h-10 w-10 text-rehberim-accent" />
          <h3 className="text-lg font-extrabold text-rehberim-navy">
            Tüm soruları çözmüşsün! 🎉
          </h3>
          <p className="mt-1 text-sm text-rehberim-navy/55">
            Pekiştirmek için baştan başlatabilirsin.
          </p>
          <button
            onClick={handleReset}
            className="mx-auto mt-4 flex items-center gap-2 rounded-xl bg-rehberim-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-rehberim-accent-dark"
          >
            <RotateCcw className="h-5 w-5" />
            Yeniden başlat
          </button>
        </div>
      );
    }

    if (phase === "done" && history.length === 0) {
      // Hiç soru yok
      return (
        <div className="rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted p-8 text-center text-sm text-rehberim-navy/55">
          Bu havuzda henüz soru bulunmuyor. Yakında eklenecek.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="animate-scale-in rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
          <h3 className="text-center text-lg font-extrabold text-rehberim-navy">
            {phase === "exhausted" ? "Havuz bitti 🎉" : "Test bitti"}
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-green-600">{correctCount}</p>
              <p className="text-xs font-semibold text-green-700">Doğru</p>
            </div>
            <div className="rounded-2xl bg-red-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-red-500">{wrongCount}</p>
              <p className="text-xs font-semibold text-red-600">Yanlış</p>
            </div>
            <div className="rounded-2xl bg-rehberim-muted p-4 text-center">
              <p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-rehberim-navy">
                <Clock className="h-5 w-5" />
                {fmtTime(durationSec)}
              </p>
              <p className="text-xs font-semibold text-rehberim-navy/55">Süre</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
          <h4 className="mb-3 flex items-center gap-2 font-extrabold text-rehberim-navy">
            <ClipboardList className="h-5 w-5" />
            Detaylı rapor
          </h4>
          <ul className="space-y-2">
            {history.map((r, i) => (
              <li key={i}>
                <button
                  onClick={() => setReviewIndex(i)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-left transition hover:border-rehberim-accent/40"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-rehberim-navy">
                      {i + 1}. {r.pool.subjectName} · {r.pool.topicName}
                    </span>
                  </span>
                  {r.correct ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4" />
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-red-500">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                        <X className="h-4 w-4" />
                      </span>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {phase === "exhausted" && (
            <button
              onClick={handleReset}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rehberim-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-rehberim-accent-dark"
            >
              <RotateCcw className="h-5 w-5" />
              Havuzu sıfırla
            </button>
          )}
          <a
            href={backHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
          >
            Geri dön
          </a>
        </div>
      </div>
    );
  }

  // ─── Active (soru çözme) ────────────────────────────
  if (!current) return null;
  const q = current.question;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-accent">
          {current.subjectName} · {current.topicName}
        </p>
        <span className="rounded-full bg-rehberim-muted px-2.5 py-1 text-xs font-semibold text-rehberim-navy/60">
          Çözülen: {history.length}
        </span>
      </div>

      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <p className="mb-4 font-semibold text-rehberim-navy">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  isSel
                    ? "border-rehberim-accent bg-rehberim-accent/10"
                    : "border-rehberim-border bg-white hover:border-rehberim-accent/40"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isSel
                      ? "bg-rehberim-accent text-white"
                      : "bg-rehberim-muted text-rehberim-navy/60"
                  }`}
                >
                  {LETTERS[i]}
                </span>
                <span className="flex-1 text-sm text-rehberim-navy">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <button
            onClick={handleEnd}
            disabled={history.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-2.5 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ClipboardList className="h-4 w-4" />
            Testi Bitir
          </button>
          <button
            onClick={confirm}
            disabled={selected === null}
            className="flex items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check className="h-5 w-5" />
            İşaretle ve Sıradaki
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-rehberim-navy/45">
        Tıkladığın her soru havuzdan çıkar; bir sonraki girişinde tekrar gelmez.
      </p>
    </div>
  );
}
