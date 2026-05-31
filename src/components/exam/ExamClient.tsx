"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Flag,
  Play,
  X,
} from "lucide-react";
import type { PoolQuestion } from "@/lib/quickQuiz-types";
import type { ExamConfig } from "@/lib/mockExam";
import { markSolved } from "@/lib/quickQuiz-client";
import { markCorrect as markWrongCorrect, saveWrong } from "@/lib/wrongAnswers";
import { saveQuizResult } from "@/lib/tracking";

const LETTERS = ["A", "B", "C", "D"];

type Phase = "intro" | "active" | "result" | "review";

function fmtClock(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  }
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function ExamClient({
  config,
  pool,
}: {
  config: ExamConfig;
  pool: PoolQuestion[];
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    pool.map(() => null),
  );
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [remaining, setRemaining] = useState(config.durationMinutes * 60);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const startMsRef = useRef(0);
  const savedRef = useRef(false);

  // Geri sayım — yalnız active fazda
  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          finishExam();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Pool boşsa intro'da uyarı
  if (pool.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted p-8 text-center text-sm text-rehberim-navy/60">
        Bu deneme türü için yeterli soru yok. Lütfen sonra tekrar dene.
      </div>
    );
  }

  function startExam() {
    startMsRef.current = Date.now();
    setPhase("active");
  }

  function pickOption(i: number) {
    setAnswers((arr) => {
      const next = [...arr];
      next[current] = i;
      return next;
    });
  }

  function toggleFlag() {
    setFlagged((s) => {
      const next = new Set(s);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
  }

  function goTo(idx: number) {
    if (idx < 0 || idx >= pool.length) return;
    setCurrent(idx);
  }

  function finishExam() {
    if (savedRef.current) return;
    savedRef.current = true;
    const dur = (Date.now() - startMsRef.current) / 1000;
    // Yanlışları "Hatalarım" havuzuna düşür, doğruları wrong havuzdan çıkar.
    // (Boş bırakılanlar etkilenmez.)
    pool.forEach((q, i) => {
      const sel = answers[i];
      if (sel === null) return;
      const ok = sel === q.question.correctIndex;
      markSolved(q.id);
      if (ok) markWrongCorrect(q.id);
      else saveWrong(q.id);
    });
    const correct = pool.reduce(
      (acc, q, i) => acc + (answers[i] === q.question.correctIndex ? 1 : 0),
      0,
    );
    const answered = answers.filter((a) => a !== null).length;
    const wrong = answered - correct;
    void saveQuizResult({
      subjectSlug: `__deneme_${config.kind}__`,
      topicId: `deneme-${Date.now()}`,
      correct,
      wrong,
      total: pool.length,
      durationSeconds: dur,
    });
    setPhase("result");
  }

  // ────────────────────────────────────────
  // INTRO
  // ────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
        <h1 className="text-2xl font-extrabold text-rehberim-navy">
          {config.label}
        </h1>
        <p className="mt-1 text-sm text-rehberim-navy/55">
          {config.totalQuestions} soru · {config.durationMinutes} dakika
        </p>
        <div className="mt-4 space-y-2">
          {config.distribution.map((d) => (
            <div
              key={d.subject}
              className="flex items-center justify-between rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-4 py-2.5 text-sm"
            >
              <span className="font-semibold text-rehberim-navy">
                {d.subjectName}
              </span>
              <span className="font-bold text-rehberim-navy/70">
                {d.count} soru
              </span>
            </div>
          ))}
        </div>
        {pool.length < config.totalQuestions && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span>
              İçeriğimizde toplam {pool.length}/{config.totalQuestions} soru
              hazır. Eksik konular doldukça deneme tam dağılımla çalışır.
            </span>
          </div>
        )}
        <button
          onClick={startExam}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-5 py-4 text-base font-bold text-white transition hover:bg-rehberim-navy-dark"
        >
          <Play className="h-5 w-5" />
          Denemeye Başla
        </button>
        <p className="mt-3 text-center text-xs text-rehberim-navy/45">
          Başla&apos;ya bastıktan sonra geri sayım başlar.
        </p>
      </div>
    );
  }

  // ────────────────────────────────────────
  // ACTIVE
  // ────────────────────────────────────────
  if (phase === "active") {
    const q = pool[current];
    const sel = answers[current];
    const answeredCount = answers.filter((a) => a !== null).length;
    const lowTime = remaining <= 5 * 60; // son 5 dakika

    return (
      <div className="space-y-4">
        {/* Üst panel: süre + ilerleme */}
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 shadow-card ${
            lowTime ? "border-red-300" : "border-rehberim-border"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock
              className={`h-5 w-5 ${lowTime ? "text-red-500" : "text-rehberim-navy/60"}`}
            />
            <span
              className={`text-xl font-extrabold tabular-nums ${
                lowTime ? "text-red-600" : "text-rehberim-navy"
              }`}
            >
              {fmtClock(remaining)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-navy/50">
              {q.subjectName}
            </p>
            <p className="text-sm font-bold text-rehberim-navy">
              Soru {current + 1} / {pool.length}
              <span className="ml-2 text-xs font-medium text-rehberim-navy/55">
                ({answeredCount} cevaplı)
              </span>
            </p>
          </div>
        </div>

        {/* Soru kartı */}
        <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
            {q.topicName}
          </p>
          <p className="mb-4 font-semibold text-rehberim-navy">
            {q.question.question}
          </p>
          <div className="space-y-2">
            {q.question.options.map((opt, i) => {
              const isSel = sel === i;
              return (
                <button
                  key={i}
                  onClick={() => pickOption(i)}
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={toggleFlag}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                flagged.has(current)
                  ? "border-amber-300 bg-amber-50 text-amber-700"
                  : "border-rehberim-border bg-white text-rehberim-navy/70 hover:bg-rehberim-muted"
              }`}
            >
              <Flag className="h-4 w-4" />
              {flagged.has(current) ? "İşaret kaldır" : "Sonra dön"}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="flex items-center gap-1 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </button>
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === pool.length - 1}
                className="flex items-center gap-1 rounded-xl bg-rehberim-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sonraki
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Soru numarası grid */}
        <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-rehberim-navy/55">
            Sorular
          </p>
          <div className="grid grid-cols-10 gap-1.5">
            {pool.map((_, i) => {
              const isActive = i === current;
              const answered = answers[i] !== null;
              const isFlagged = flagged.has(i);
              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative flex h-9 items-center justify-center rounded-md text-xs font-bold transition ${
                    isActive
                      ? "bg-rehberim-navy text-white"
                      : answered
                        ? "bg-rehberim-accent/20 text-rehberim-navy hover:bg-rehberim-accent/30"
                        : "bg-rehberim-muted text-rehberim-navy/55 hover:bg-rehberim-border"
                  }`}
                >
                  {i + 1}
                  {isFlagged && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-rehberim-navy/55">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-rehberim-navy" /> Aktif
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-rehberim-accent/30" />
              Cevaplandı
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm bg-rehberim-muted" /> Boş
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> İşaretli
            </span>
          </div>
        </div>

        {/* Bitir */}
        {!confirmFinish ? (
          <button
            onClick={() => setConfirmFinish(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <ClipboardList className="h-5 w-5" />
            Sınavı Bitir
          </button>
        ) : (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-700">
              Emin misin? Sınavı bitirdiğinde değişiklik yapamazsın.
            </p>
            <p className="mt-1 text-xs text-red-600">
              Cevapsız sorular boş sayılır. ({answers.filter((a) => a === null).length} boş)
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setConfirmFinish(false)}
                className="flex-1 rounded-xl border border-red-300 bg-white px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
              >
                Vazgeç
              </button>
              <button
                onClick={finishExam}
                className="flex-1 rounded-xl bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Evet, Bitir
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────
  // REVIEW (tek soru detay)
  // ────────────────────────────────────────
  if (phase === "review" && reviewIndex !== null) {
    const q = pool[reviewIndex];
    const sel = answers[reviewIndex];
    const ok = sel === q.question.correctIndex;
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <button
          onClick={() => {
            setReviewIndex(null);
            setPhase("result");
          }}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Sonuca dön
        </button>
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
          Soru {reviewIndex + 1} · {q.subjectName} · {q.topicName}
        </p>
        <p className="mb-4 font-semibold text-rehberim-navy">{q.question.question}</p>
        <div className="space-y-2">
          {q.question.options.map((opt, i) => {
            const isCorrect = i === q.question.correctIndex;
            const isUserWrong = i === sel && !ok;
            const isUserBlank = sel === null;
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
        {sel === null && (
          <p className="mt-3 rounded-xl bg-rehberim-muted px-4 py-3 text-sm text-rehberim-navy/70">
            Bu soruyu boş bıraktın.
          </p>
        )}
        {q.question.explanation && (
          <p className="mt-3 rounded-xl bg-rehberim-muted px-4 py-3 text-sm leading-relaxed text-rehberim-navy/80">
            <span className="font-bold text-rehberim-navy">Açıklama: </span>
            {q.question.explanation}
          </p>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────
  // RESULT
  // ────────────────────────────────────────
  // Ders bazlı dağılım
  const bySubject = new Map<
    string,
    { name: string; correct: number; wrong: number; blank: number; total: number }
  >();
  pool.forEach((q, i) => {
    const sel = answers[i];
    const slug = q.subjectSlug;
    const cur = bySubject.get(slug) ?? {
      name: q.subjectName,
      correct: 0,
      wrong: 0,
      blank: 0,
      total: 0,
    };
    cur.total += 1;
    if (sel === null) cur.blank += 1;
    else if (sel === q.question.correctIndex) cur.correct += 1;
    else cur.wrong += 1;
    bySubject.set(slug, cur);
  });

  const totalCorrect = Array.from(bySubject.values()).reduce(
    (a, s) => a + s.correct,
    0,
  );
  const totalWrong = Array.from(bySubject.values()).reduce(
    (a, s) => a + s.wrong,
    0,
  );
  const totalBlank = Array.from(bySubject.values()).reduce(
    (a, s) => a + s.blank,
    0,
  );
  const totalNet = Math.max(0, totalCorrect - totalWrong / 3);

  return (
    <div className="space-y-4">
      <div className="animate-scale-in rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
        <h1 className="text-center text-xl font-extrabold text-rehberim-navy">
          {config.label} — Sonuç
        </h1>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-green-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-green-600">{totalCorrect}</p>
            <p className="text-xs font-semibold text-green-700">Doğru</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-red-500">{totalWrong}</p>
            <p className="text-xs font-semibold text-red-600">Yanlış</p>
          </div>
          <div className="rounded-2xl bg-rehberim-muted p-4 text-center">
            <p className="text-2xl font-extrabold text-rehberim-navy/60">
              {totalBlank}
            </p>
            <p className="text-xs font-semibold text-rehberim-navy/55">Boş</p>
          </div>
          <div className="rounded-2xl bg-rehberim-accent/15 p-4 text-center">
            <p className="text-2xl font-extrabold text-rehberim-accent">
              {totalNet.toFixed(2)}
            </p>
            <p className="text-xs font-semibold text-rehberim-accent">
              Net (LGS)
            </p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-rehberim-navy/50">
          LGS net formülü: <span className="font-semibold">Doğru − (Yanlış ÷ 3)</span>
        </p>
      </div>

      {/* Ders bazlı dağılım */}
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h4 className="mb-3 font-extrabold text-rehberim-navy">
          Ders bazlı net
        </h4>
        <div className="space-y-2">
          {Array.from(bySubject.values()).map((s) => {
            const net = Math.max(0, s.correct - s.wrong / 3);
            return (
              <div
                key={s.name}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-4 py-2.5 text-sm"
              >
                <span className="font-semibold text-rehberim-navy">{s.name}</span>
                <span className="flex items-center gap-3 text-xs text-rehberim-navy/70">
                  <span className="text-green-600">D:{s.correct}</span>
                  <span className="text-red-500">Y:{s.wrong}</span>
                  <span className="text-rehberim-navy/55">B:{s.blank}</span>
                  <span className="font-extrabold text-rehberim-accent">
                    Net {net.toFixed(2)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detaylı rapor (her soru için durum) */}
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h4 className="mb-3 flex items-center gap-2 font-extrabold text-rehberim-navy">
          <ClipboardList className="h-5 w-5" />
          Detaylı rapor
        </h4>
        <div className="grid grid-cols-10 gap-1.5">
          {pool.map((q, i) => {
            const sel = answers[i];
            const status =
              sel === null
                ? "blank"
                : sel === q.question.correctIndex
                  ? "correct"
                  : "wrong";
            const cls =
              status === "correct"
                ? "bg-green-500 text-white hover:bg-green-600"
                : status === "wrong"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-rehberim-muted text-rehberim-navy/55 hover:bg-rehberim-border";
            return (
              <button
                key={i}
                onClick={() => {
                  setReviewIndex(i);
                  setPhase("review");
                }}
                className={`flex h-9 items-center justify-center rounded-md text-xs font-bold transition ${cls}`}
                title={`Soru ${i + 1} — ${
                  status === "correct" ? "doğru" : status === "wrong" ? "yanlış" : "boş"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-rehberim-navy/55">
          Bir sayıya tıklayarak o sorunun detayını incele.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href="/deneme"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
        >
          <ArrowRight className="h-5 w-5" />
          Başka Deneme Çöz
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
