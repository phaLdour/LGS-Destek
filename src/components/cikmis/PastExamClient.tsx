"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Play,
  X,
} from "lucide-react";
import type { PastQuestion } from "@/content/cikmis-sorular/types";
import { markCorrect as markWrongCorrect, saveWrong } from "@/lib/wrongAnswers";
import { saveQuizResult } from "@/lib/tracking";

const LETTERS = ["A", "B", "C", "D"];

type Phase = "intro" | "active" | "result" | "review";

function fmtClock(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/**
 * Karışık yıllı testler için soru kendi yılını taşıyabilir. Konu bazlı
 * çıkmış soru testinde (bkz. /ders/[subject]/[topic]/cikmis-sorular)
 * sorular 9 farklı sınavdan gelir; "Hatalarım" anahtarının doğru olması
 * için her sorunun kendi yılı gerekir.
 */
export type PastExamSoru = PastQuestion & {
  year?: number;
  section?: "sozel" | "sayisal";
};

export function PastExamClient({
  year,
  section,
  label,
  durationMinutes,
  questions,
  kayit,
  geriDonusHref,
  geriDonusMetni,
}: {
  year: number;
  section: "sozel" | "sayisal";
  label: string;
  durationMinutes: number;
  questions: PastExamSoru[];
  /**
   * İstatistiğe hangi ders/konu olarak yazılsın. Verilmezse sınav bazlı
   * sentetik etiket kullanılır (yıl sayfalarındaki davranış).
   * Konu testinde GERÇEK ders/konu geçilir; böylece çözülen sorular
   * "Bugünün Planı" ve konu istatistiklerine doğru şekilde işler.
   */
  kayit?: { subjectSlug: string; topicId: string };
  geriDonusHref?: string;
  geriDonusMetni?: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );
  const [remaining, setRemaining] = useState(durationMinutes * 60);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const startMsRef = useRef(0);
  const savedRef = useRef(false);

  // Ders sekmeleri (sözel: 4, sayısal: 2)
  const subjectGroups = useMemo(() => {
    const map = new Map<string, { name: string; indices: number[] }>();
    questions.forEach((q, i) => {
      const cur = map.get(q.subjectSlug);
      if (cur) cur.indices.push(i);
      else map.set(q.subjectSlug, { name: q.subject, indices: [i] });
    });
    return Array.from(map.entries()).map(([slug, v]) => ({ slug, ...v }));
  }, [questions]);

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

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted p-8 text-center text-sm text-rehberim-navy/60">
        Bu sınav için interaktif soru bulunmuyor.
      </div>
    );
  }

  function pick(i: number) {
    setAnswers((arr) => {
      const next = [...arr];
      next[current] = i;
      return next;
    });
  }

  function goTo(i: number) {
    if (i < 0 || i >= questions.length) return;
    setCurrent(i);
  }

  // Soru kimliği — Hatalarım havuzuyla uyumlu (cikmis/2026-sozel/turkce#3 gibi).
  // Karışık yıllı testte her soru kendi yılını taşır; aksi hâlde konu
  // testinde çözülen 2019 sorusu 2026 anahtarıyla kaydedilir ve öğrenci
  // yanlışlarında yanlış soruyu görürdü.
  function qKey(q: PastExamSoru): string {
    return `cikmis/${q.year ?? year}-${q.section ?? section}/${q.subjectSlug}#${q.no}`;
  }

  function finishExam() {
    if (savedRef.current) return;
    savedRef.current = true;
    const dur = (Date.now() - startMsRef.current) / 1000;
    questions.forEach((q, i) => {
      const sel = answers[i];
      if (sel === null) return;
      const ok = sel === q.correctIndex;
      if (ok) markWrongCorrect(qKey(q));
      else saveWrong(qKey(q));
    });
    const correct = questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const answered = answers.filter((a) => a !== null).length;
    const wrong = answered - correct;
    // Hiç soru işaretlenmediyse istatistiğe kayıt DÜŞMEZ — süre dolunca
    // kendiliğinden biten, açılıp bırakılmış sınav "çözülen test" sayılmasın.
    if (answered > 0) {
      void saveQuizResult({
        subjectSlug: kayit?.subjectSlug ?? `__cikmis_${year}_${section}__`,
        topicId: kayit?.topicId ?? `cikmis-${year}-${section}`,
        correct,
        wrong,
        total: questions.length,
        durationSeconds: dur,
      });
    }
    setPhase("result");
  }

  // ─── INTRO ───────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
        <h1 className="text-2xl font-extrabold text-rehberim-navy">{label}</h1>
        <p className="mt-1 text-sm text-rehberim-navy/55">
          {questions.length} soru · {durationMinutes} dakika · gerçek MEB
          soruları
        </p>
        <div className="mt-4 space-y-2">
          {subjectGroups.map((g) => (
            <div
              key={g.slug}
              className="flex items-center justify-between rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-4 py-2.5 text-sm"
            >
              <span className="font-semibold text-rehberim-navy">{g.name}</span>
              <span className="font-bold text-rehberim-navy/70">
                {g.indices.length} soru
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-rehberim-accent/30 bg-rehberim-accent/10 p-3 text-xs text-rehberim-navy/70">
          Sorular kitapçıktan birebir görüntü olarak gösterilir. Şıkkı seç,
          süren dolunca veya bitirince net hesabın ve detaylı rapor görünür.
          Yanlışların &quot;Hatalarım&quot; havuzuna eklenir.
        </div>
        <button
          onClick={() => {
            startMsRef.current = Date.now();
            setPhase("active");
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-5 py-4 text-base font-bold text-white transition hover:bg-rehberim-navy-dark"
        >
          <Play className="h-5 w-5" />
          Çözmeye Başla
        </button>
      </div>
    );
  }

  // ─── ACTIVE ──────────────────────────────────────────
  if (phase === "active") {
    const q = questions[current];
    const sel = answers[current];
    const answeredCount = answers.filter((a) => a !== null).length;
    const lowTime = remaining <= 5 * 60;
    const activeGroup = subjectGroups.find((g) => g.slug === q.subjectSlug);
    const idxInSubject = activeGroup
      ? activeGroup.indices.indexOf(current) + 1
      : current + 1;
    const totalInSubject = activeGroup
      ? activeGroup.indices.length
      : questions.length;

    function jumpToSubject(slug: string) {
      const g = subjectGroups.find((x) => x.slug === slug);
      if (!g) return;
      const target = g.indices.find((i) => answers[i] === null) ?? g.indices[0];
      goTo(target);
    }

    return (
      <div className="space-y-4">
        {/* süre + sayaç */}
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
              Toplam {answeredCount} / {questions.length} cevaplı
            </p>
            <p className="text-sm font-bold text-rehberim-navy">
              {q.subject} — Soru {idxInSubject} / {totalInSubject}
            </p>
          </div>
        </div>

        {/* soru kartı */}
        <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card sm:p-5">
          {/* ders sekmeleri */}
          <div className="-mx-1 mb-4 flex items-center justify-end gap-1.5 overflow-x-auto px-1 pb-2">
            {subjectGroups.map((g) => {
              const isActive = g.slug === q.subjectSlug;
              const ans = g.indices.filter((i) => answers[i] !== null).length;
              return (
                <button
                  key={g.slug}
                  onClick={() => jumpToSubject(g.slug)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition ${
                    isActive
                      ? "bg-rehberim-navy text-white shadow-soft"
                      : "bg-rehberim-muted text-rehberim-navy/70 hover:bg-rehberim-border"
                  }`}
                >
                  {g.name}
                  <span
                    className={`ml-1.5 ${isActive ? "text-white/70" : "text-rehberim-navy/45"}`}
                  >
                    {ans}/{g.indices.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* soru görüntüsü — viewport'a sığsın diye yükseklik sınırlı */}
          <div className="flex justify-center overflow-hidden rounded-xl border border-rehberim-border bg-white p-1">
            <Image
              src={q.image}
              alt={`${q.subject} ${q.no}. soru`}
              width={560}
              height={760}
              className="h-auto w-auto max-h-[52vh] max-w-full object-contain"
              unoptimized
              priority
            />
          </div>

          {/* şık butonları */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {LETTERS.map((letter, i) => {
              const isSel = sel === i;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  className={`flex items-center justify-center rounded-xl border py-2.5 text-base font-extrabold transition ${
                    isSel
                      ? "border-rehberim-accent bg-rehberim-accent text-white"
                      : "border-rehberim-border bg-white text-rehberim-navy hover:border-rehberim-accent/50"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* gezinme */}
          <div className="mt-3 flex items-center justify-between gap-2">
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
              disabled={current === questions.length - 1}
              className="flex items-center gap-1 rounded-xl bg-rehberim-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Sonraki
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* aktif dersin soru ızgarası */}
        <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-rehberim-navy/55">
            {q.subject} Soruları
          </p>
          {/* Dokunma hedefi: 10 sabit sütunda kutucuklar telefonda ~27px kalıyor,
              yanlış soruya basılıyordu. Sütunlar en az 44px (WCAG 2.5.5). */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-1.5">
            {(activeGroup?.indices ?? []).map((gi, localIdx) => {
              const isActive = gi === current;
              const answered = answers[gi] !== null;
              return (
                <button
                  key={gi}
                  onClick={() => goTo(gi)}
                  // h-9 (36px) yerine h-11 (44px): mobil dokunma hedefi
                  className={`flex h-11 items-center justify-center rounded-md text-xs font-bold transition ${
                    isActive
                      ? "bg-rehberim-navy text-white"
                      : answered
                        ? "bg-rehberim-accent/20 text-rehberim-navy hover:bg-rehberim-accent/30"
                        : "bg-rehberim-muted text-rehberim-navy/55 hover:bg-rehberim-border"
                  }`}
                >
                  {localIdx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* bitir */}
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
              Emin misin? Bitirdiğinde değişiklik yapamazsın.
            </p>
            <p className="mt-1 text-xs text-red-600">
              {answers.filter((a) => a === null).length} soru boş.
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

  // ─── REVIEW (tek soru) ───────────────────────────────
  if (phase === "review" && reviewIndex !== null) {
    const q = questions[reviewIndex];
    const sel = answers[reviewIndex];
    const ok = sel === q.correctIndex;
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card sm:p-5">
        <button
          onClick={() => {
            setReviewIndex(null);
            setPhase("result");
          }}
          className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Sonuca dön
        </button>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
          {q.subject} · {q.no}. soru
        </p>
        <div className="flex justify-center overflow-hidden rounded-xl border border-rehberim-border bg-white p-1">
          <Image
            src={q.image}
            alt={`${q.subject} ${q.no}. soru`}
            width={560}
            height={760}
            className="h-auto w-auto max-h-[60vh] max-w-full object-contain"
            unoptimized
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {LETTERS.map((letter, i) => {
            const isCorrect = i === q.correctIndex;
            const isUserWrong = i === sel && !ok;
            return (
              <div
                key={i}
                className={`flex items-center justify-center gap-1 rounded-xl border py-3 text-base font-extrabold ${
                  isCorrect
                    ? "border-green-400 bg-green-50 text-green-700"
                    : isUserWrong
                      ? "border-red-400 bg-red-50 text-red-600"
                      : "border-rehberim-border bg-white text-rehberim-navy/50"
                }`}
              >
                {letter}
                {isCorrect && <Check className="h-4 w-4" />}
                {isUserWrong && <X className="h-4 w-4" />}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center text-sm font-semibold">
          {sel === null ? (
            <span className="text-rehberim-navy/55">Bu soruyu boş bıraktın.</span>
          ) : ok ? (
            <span className="text-green-600">Doğru! 🎉</span>
          ) : (
            <span className="text-red-500">
              Yanlış — doğru cevap {LETTERS[q.correctIndex]}.
            </span>
          )}
        </p>
      </div>
    );
  }

  // ─── RESULT ──────────────────────────────────────────
  const bySubject = new Map<
    string,
    { name: string; correct: number; wrong: number; blank: number }
  >();
  questions.forEach((q, i) => {
    const sel = answers[i];
    const cur = bySubject.get(q.subjectSlug) ?? {
      name: q.subject,
      correct: 0,
      wrong: 0,
      blank: 0,
    };
    if (sel === null) cur.blank += 1;
    else if (sel === q.correctIndex) cur.correct += 1;
    else cur.wrong += 1;
    bySubject.set(q.subjectSlug, cur);
  });
  const totalCorrect = [...bySubject.values()].reduce((a, s) => a + s.correct, 0);
  const totalWrong = [...bySubject.values()].reduce((a, s) => a + s.wrong, 0);
  const totalBlank = [...bySubject.values()].reduce((a, s) => a + s.blank, 0);
  const net = Math.max(0, totalCorrect - totalWrong / 3);

  return (
    <div className="space-y-4">
      <div className="animate-scale-in rounded-2xl border border-rehberim-border bg-white p-6 shadow-card">
        <h1 className="text-center text-xl font-extrabold text-rehberim-navy">
          {label} — Sonuç
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
              {net.toFixed(2)}
            </p>
            <p className="text-xs font-semibold text-rehberim-accent">Net</p>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-rehberim-navy/50">
          LGS net formülü: <span className="font-semibold">Doğru − (Yanlış ÷ 3)</span>
        </p>
      </div>

      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h4 className="mb-3 font-extrabold text-rehberim-navy">Ders bazlı</h4>
        <div className="space-y-2">
          {[...bySubject.values()].map((s) => {
            const sNet = Math.max(0, s.correct - s.wrong / 3);
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
                    Net {sNet.toFixed(2)}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* detaylı rapor — soru ızgarası */}
      <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h4 className="mb-3 flex items-center gap-2 font-extrabold text-rehberim-navy">
          <ClipboardList className="h-5 w-5" />
          Detaylı rapor
        </h4>
        {/* Rapor ızgarası da aynı dokunma hedefi kuralına uyar (en az 44px). */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(44px,1fr))] gap-1.5">
          {questions.map((q, i) => {
            const sel = answers[i];
            const status =
              sel === null
                ? "blank"
                : sel === q.correctIndex
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
                // h-9 (36px) yerine h-11 (44px): mobil dokunma hedefi
                className={`flex h-11 items-center justify-center rounded-md text-xs font-bold transition ${cls}`}
                title={`${q.subject} ${q.no}. soru`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-rehberim-navy/55">
          Bir soruya tıklayıp çözümünü incele.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          href={geriDonusHref ?? `/cikmis-sorular/${year}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
        >
          {geriDonusMetni ?? `${year} sınavına dön`}
        </Link>
        <Link
          href="/cikmis-sorular"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
        >
          Tüm yıllar
        </Link>
      </div>
    </div>
  );
}
