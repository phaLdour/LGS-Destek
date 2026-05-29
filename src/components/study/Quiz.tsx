"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Clock,
  PlayCircle,
  RotateCcw,
  Video,
  X,
} from "lucide-react";
import type { QuizQuestion } from "@/content/types";
import { saveQuizResult } from "@/lib/tracking";
import { useStudySession } from "./StudySessionProvider";

const LETTERS = ["A", "B", "C", "D"];

type Phase = "intro" | "question" | "result" | "report" | "review";

function fmtTime(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function Quiz({
  subjectSlug,
  topicId,
  questions,
  hasVideo,
}: {
  subjectSlug: string;
  topicId: string;
  questions: QuizQuestion[];
  hasVideo: boolean;
}) {
  const { recordAnswer } = useStudySession();
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [startMs, setStartMs] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const total = questions.length;
  const correctCount = answers.filter(
    (a, i) => a === questions[i]?.correctIndex,
  ).length;
  const wrongCount = answers.length - correctCount;

  function start() {
    setPhase("question");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setStartMs(Date.now());
  }

  function confirm() {
    if (selected === null) return;
    const nextAnswers = [...answers, selected];
    recordAnswer(selected === questions[current].correctIndex);

    if (current + 1 >= total) {
      const dur = (Date.now() - startMs) / 1000;
      setAnswers(nextAnswers);
      setDurationSeconds(dur);
      setPhase("result");
      const correct = nextAnswers.filter(
        (a, i) => a === questions[i].correctIndex,
      ).length;
      void saveQuizResult({
        subjectSlug,
        topicId,
        correct,
        wrong: total - correct,
        total,
        durationSeconds: dur,
      });
    } else {
      setAnswers(nextAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function goToLesson() {
    const id = hasVideo ? "konu-videosu" : "konu-makale";
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  // INTRO
  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-6 text-center shadow-card">
        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rehberim-navy text-white">
          <ClipboardList className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-extrabold text-rehberim-navy">
          {total} soruluk LGS testi
        </h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-rehberim-navy/55">
          Konuyu pekiştir. Süre arka planda tutulur, test sonunda gösterilir.
        </p>
        <button
          onClick={start}
          className="mx-auto mt-4 flex items-center gap-2 rounded-xl bg-rehberim-accent px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-rehberim-accent-dark"
        >
          <PlayCircle className="h-5 w-5" />
          Teste Başla
        </button>
      </div>
    );
  }

  // RESULT
  if (phase === "result") {
    return (
      <div className="animate-scale-in rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
        <h3 className="text-center text-lg font-extrabold text-rehberim-navy">
          Test bitti! 🎉
        </h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-green-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-green-600">
              {correctCount}
            </p>
            <p className="text-xs font-semibold text-green-700">Doğru</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-4 text-center">
            <p className="text-2xl font-extrabold text-red-500">{wrongCount}</p>
            <p className="text-xs font-semibold text-red-600">Yanlış</p>
          </div>
          <div className="rounded-2xl bg-rehberim-muted p-4 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-rehberim-navy">
              <Clock className="h-5 w-5" />
              {fmtTime(durationSeconds)}
            </p>
            <p className="text-xs font-semibold text-rehberim-navy/55">Süre</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => setPhase("report")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
          >
            <ClipboardList className="h-5 w-5" />
            Detaylı rapor
          </button>
          <button
            onClick={() => setPhase("intro")}
            className="flex items-center justify-center gap-2 rounded-xl border border-rehberim-border px-4 py-3 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
          >
            <RotateCcw className="h-5 w-5" />
            Tekrar çöz
          </button>
        </div>
      </div>
    );
  }

  // REPORT
  if (phase === "report") {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-extrabold text-rehberim-navy">Detaylı rapor</h3>
          <button
            onClick={goToLesson}
            className="flex items-center gap-1.5 rounded-lg bg-rehberim-accent px-3 py-1.5 text-sm font-bold text-white transition hover:bg-rehberim-accent-dark"
          >
            <Video className="h-4 w-4" />
            Konu Anlatımı
          </button>
        </div>
        <ul className="space-y-2">
          {questions.map((q, i) => {
            const ok = answers[i] === q.correctIndex;
            return (
              <li key={i}>
                <button
                  onClick={() => {
                    setReviewIndex(i);
                    setPhase("review");
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-left transition hover:border-rehberim-accent/40"
                >
                  <span className="text-sm font-semibold text-rehberim-navy">
                    {i + 1}. Soru
                  </span>
                  {ok ? (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-green-600">
                      Doğru
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-4 w-4" />
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-red-500">
                      Yanlış
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                        <X className="h-4 w-4" />
                      </span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => setPhase("result")}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Sonuca dön
        </button>
      </div>
    );
  }

  // REVIEW
  if (phase === "review") {
    const q = questions[reviewIndex];
    const userAnswer = answers[reviewIndex];
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <button
          onClick={() => setPhase("report")}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Rapora dön
        </button>
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
          {reviewIndex + 1}. Soru
        </p>
        <p className="mb-4 font-semibold text-rehberim-navy">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isUserWrong = i === userAnswer && userAnswer !== q.correctIndex;
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

  // QUESTION
  const q = questions[current];
  return (
    <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-rehberim-accent">
          Soru {current + 1} / {total}
        </span>
        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-rehberim-muted">
          <div
            className="h-full rounded-full bg-rehberim-accent transition-all"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>

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

      <div className="mt-4 flex justify-end">
        <button
          onClick={confirm}
          disabled={selected === null}
          className="flex items-center gap-2 rounded-xl bg-rehberim-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Check className="h-5 w-5" />
          İşaretle
        </button>
      </div>
    </div>
  );
}
