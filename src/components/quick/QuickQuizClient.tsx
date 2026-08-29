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
import type { PoolQuestion, QuickScope } from "@/lib/quickQuiz-types";
import {
  filterAndShuffle,
  hydrateFromSupabase,
  markSolved,
  resetSolvedFor,
} from "@/lib/quickQuiz-client";
import {
  getWrongIds,
  hydrateWrongFromSupabase,
  markCorrect as markWrongCorrect,
  saveWrong,
} from "@/lib/wrongAnswers";
import { saveQuizResult } from "@/lib/tracking";
import { baykusaSoyle } from "@/lib/baykus";

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
  initialPool,
  title,
  subtitle,
  backHref,
  wrongMode = false,
  wrongFilter = "all",
}: {
  scope: QuickScope;
  /** Server'dan gelen kapsamdaki tüm sorular (çözülmüş olsun olmasın). */
  initialPool: PoolQuestion[];
  title: string;
  subtitle: string;
  backHref: string;
  /** true ise: yalnız yanlış cevap havuzundaki soruları getirir; markSolved çağırmaz. */
  wrongMode?: boolean;
  /** wrongMode true iken hangi yanlışları çek:
   *  - "all"   : tüm geçmiş
   *  - "today" : sadece bugün yapılanlar
   *  - "due"   : vadesi gelmiş (spaced repetition) */
  wrongFilter?: "all" | "today" | "due";
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [pool, setPool] = useState<PoolQuestion[]>([]);
  const [index, setIndex] = useState(0); // havuzdaki konum
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<Record[]>([]);
  const [startMs, setStartMs] = useState(0);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const saved = useRef(false);

  // Mount: önce Supabase'ten çekip yerel ile birleştir, sonra havuzu kur.
  useEffect(() => {
    async function setup() {
      // Sırasıyla bekle: önce uzak veri yerelle birleşsin, sonra filtre uygula.
      await Promise.all([
        hydrateFromSupabase(),
        wrongMode ? hydrateWrongFromSupabase() : Promise.resolve(),
      ]);
      let p: PoolQuestion[];
      if (wrongMode) {
        const ids = getWrongIds(wrongFilter);
        p = initialPool.filter((q) => ids.has(q.id));
        for (let i = p.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [p[i], p[j]] = [p[j], p[i]];
        }
      } else {
        p = filterAndShuffle(initialPool);
      }
      setPool(p);
      setStartMs(Date.now());
      if (p.length === 0) {
        setPhase(initialPool.length === 0 || wrongMode ? "done" : "exhausted");
      } else {
        setPhase("active");
      }
    }
    void setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = pool[index];
  const correctCount = useMemo(() => history.filter((h) => h.correct).length, [history]);
  const wrongCount = history.length - correctCount;
  // LGS net formülü: Net = D − (Y/3). 3 yanlış 1 doğruyu götürür.
  const net = Math.max(0, correctCount - wrongCount / 3);
  const durationSec = (Date.now() - startMs) / 1000;

  function confirm() {
    if (selected === null || !current) return;
    const ok = selected === current.question.correctIndex;
    const yeniGecmis = [...history, { pool: current, selected, correct: ok }];
    setHistory(yeniGecmis);
    if (!wrongMode) markSolved(current.id);
    if (ok) {
      markWrongCorrect(current.id);
    } else {
      saveWrong(current.id);
    }
    setSelected(null);
    baykusaTepki(ok, yeniGecmis);

    if (index + 1 >= pool.length) {
      // Havuz bitti → exhausted moduna geç (Yeniden başlat seçeneği).
      // DİKKAT: az önceki setHistory henüz uygulanmadığı için güncel diziyi
      // AÇIKÇA geçiyoruz; yoksa son cevaplanan soru istatistiğe hiç yazılmaz.
      finishSession(true, yeniGecmis);
    } else {
      setIndex((i) => i + 1);
    }
  }

  function finishSession(
    exhausted = false,
    /** Güncel geçmiş — state henüz güncellenmemiş olabileceği için dışarıdan
     *  verilebilir (havuz tükendiğinde son cevabı kaybetmemek için). */
    gecmis: typeof history = history,
  ) {
    if (saved.current) return;
    saved.current = true;
    const dur = (Date.now() - startMs) / 1000;
    const total = gecmis.length;
    // Tek soru bile cevaplanmadıysa istatistiğe boş kayıt yazma —
    // "çözülen test" yalnız gerçekten çözülenleri saymalı.
    if (total === 0) {
      setPhase(exhausted ? "exhausted" : "done");
      return;
    }
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
      correct: gecmis.filter((h) => h.correct).length,
      wrong: gecmis.filter((h) => !h.correct).length,
      total,
      durationSeconds: dur,
    });
    setPhase(exhausted ? "exhausted" : "done");
  }

  function handleEnd() {
    finishSession(false);
  }

  function handleReset() {
    resetSolvedFor(initialPool.map((p) => p.id));
    setHistory([]);
    setIndex(0);
    setSelected(null);
    saved.current = false;
    setStartMs(Date.now());
    const p = filterAndShuffle(initialPool);
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
      if (wrongMode) {
        return (
          <div className="rounded-2xl border border-rehberim-border bg-white p-8 text-center shadow-card">
            <Sparkles className="mx-auto mb-3 h-10 w-10 text-rehberim-accent" />
            <h3 className="text-lg font-extrabold text-rehberim-navy">
              Hata listen boş! 🎉
            </h3>
            <p className="mt-1 text-sm text-rehberim-navy/55">
              Henüz yanlış cevabın yok. Hızlı Sorular&apos;a giderek soru
              çözmeye başla; yanlış yaptıkların burada birikecek.
            </p>
            <a
              href={backHref}
              className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-rehberim-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-rehberim-accent-dark"
            >
              Hızlı Sorular&apos;a git
            </a>
          </div>
        );
      }
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
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-green-600">{correctCount}</p>
              <p className="text-xs font-semibold text-green-700">Doğru</p>
            </div>
            <div className="rounded-2xl bg-red-50 p-4 text-center">
              <p className="text-2xl font-extrabold text-red-500">{wrongCount}</p>
              <p className="text-xs font-semibold text-red-600">Yanlış</p>
            </div>
            <div className="rounded-2xl bg-rehberim-accent/10 p-4 text-center">
              <p className="text-2xl font-extrabold text-rehberim-accent">
                {net.toFixed(2)}
              </p>
              <p className="text-xs font-semibold text-rehberim-accent">
                Net (LGS)
              </p>
            </div>
            <div className="rounded-2xl bg-rehberim-muted p-4 text-center">
              <p className="flex items-center justify-center gap-1 text-2xl font-extrabold text-rehberim-navy">
                <Clock className="h-5 w-5" />
                {fmtTime(durationSec)}
              </p>
              <p className="text-xs font-semibold text-rehberim-navy/55">Süre</p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-rehberim-navy/50">
            LGS net formülü: <span className="font-semibold">Doğru − (Yanlış ÷ 3)</span>
          </p>
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
          {/* wrongMode'da sayaç, GÖSTERİLEN listenin uzunluğundan okunur
              (pool.length). Böylece "N soru" ile ekrandaki kayıtlar tek
              kaynaktan gelir; dashboard'daki hayalet sayaç tekrarlanmaz. */}
          {wrongMode
            ? `${index + 1} / ${pool.length}`
            : `Çözülen: ${history.length}`}
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

/**
 * Baykuşun soru sonrası tepkisi. Her soruda konuşmaz — sadece art arda
 * doğrularda kutlar, üst üste iki yanlıştan sonra bir kez cesaret verir.
 * Amaç: öğrencinin ona alışması, ama rahatsız olmaması.
 */
function baykusaTepki(
  dogruMu: boolean,
  gecmis: { correct: boolean }[],
): void {
  let seri = 0;
  for (let i = gecmis.length - 1; i >= 0; i--) {
    if (gecmis[i].correct !== dogruMu) break;
    seri++;
  }

  if (dogruMu) {
    if (seri === 3) baykusaSoyle({ ruhHali: "mutlu", mesaj: "3 doğru üst üste! 🎉" });
    else if (seri === 5) baykusaSoyle({ ruhHali: "mutlu", mesaj: "5'te 5 — bugün formundasın." });
    else if (seri > 0 && seri % 10 === 0)
      baykusaSoyle({ ruhHali: "mutlu", mesaj: `${seri} doğru! Bunu bir yere yazalım.` });
    else if (seri === 1) baykusaSoyle({ ruhHali: "mutlu" });
    return;
  }

  if (seri === 2)
    baykusaSoyle({
      ruhHali: "dusunuyor",
      mesaj: "İki yanlış oldu — acele etme, soruyu bir daha oku.",
    });
  else if (seri === 1) baykusaSoyle({ ruhHali: "sasirmis" });
}
