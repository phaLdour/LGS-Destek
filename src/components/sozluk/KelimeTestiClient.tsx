"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles, X } from "lucide-react";
import type { KelimeSorusu } from "@/lib/kelimeTesti";
import { saveQuizResult } from "@/lib/tracking";
import { baykusaSoyle } from "@/lib/baykus";

/**
 * Kelime testi oyun ekranı.
 * Sorular sunucuda üretilir (sozluk verisi client'a inmez), buraya prop
 * gelir. Tur bitince sonuç quiz_results'a "__sozluk__" sanal dersiyle
 * yazılır: genel soru sayacına ve rozetlere işler ama konu ısı haritasına
 * karışmaz (__ önekli kayıtlar orada zaten elenir).
 */
export function KelimeTestiClient({
  sorular,
  tur,
  toplamSoru,
}: {
  sorular: KelimeSorusu[];
  tur: number;
  toplamSoru: number;
}) {
  const [index, setIndex] = useState(0);
  const [secili, setSecili] = useState<number | null>(null);
  const [cevaplar, setCevaplar] = useState<boolean[]>([]);
  const [bitti, setBitti] = useState(false);
  const baslangic = useMemo(() => Date.now(), []);

  const soru = sorular[index];
  const dogru = cevaplar.filter(Boolean).length;

  function onayla() {
    if (secili === null || !soru) return;
    const ok = secili === soru.dogruIndex;
    const yeni = [...cevaplar, ok];
    setCevaplar(yeni);

    if (index + 1 >= sorular.length) {
      setBitti(true);
      const d = yeni.filter(Boolean).length;
      void saveQuizResult({
        subjectSlug: "__sozluk__",
        topicId: "kelime-testi",
        correct: d,
        wrong: yeni.length - d,
        total: yeni.length,
        durationSeconds: (Date.now() - baslangic) / 1000,
      });
      if (d === yeni.length)
        baykusaSoyle({ ruhHali: "mutlu", mesaj: "Hepsi doğru! Kelime ustası oldun 🎉" });
      else if (d >= yeni.length * 0.7)
        baykusaSoyle({ ruhHali: "mutlu", mesaj: `${yeni.length} soruda ${d} doğru — güzel!` });
    } else {
      setIndex((i) => i + 1);
      setSecili(null);
    }
  }

  if (bitti) {
    const yuzde = Math.round((dogru / sorular.length) * 100);
    return (
      <div className="ring-hairline rounded-3xl border border-rehberim-border bg-white p-6 text-center shadow-card">
        <Sparkles className="mx-auto mb-3 h-10 w-10 text-rehberim-accent" />
        <h2 className="text-xl font-extrabold text-rehberim-navy">Tur bitti!</h2>
        <p className="mt-2 text-sm text-rehberim-navy/60">
          {sorular.length} soruda{" "}
          <strong className="text-rehberim-navy">{dogru} doğru</strong> (%{yuzde})
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Link
            href={`/sozluk/test?tur=${tur + 1}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-rehberim-navy px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-rehberim-navy-light"
          >
            <RotateCcw className="h-4 w-4" />
            Yeni tur
          </Link>
          <Link
            href="/sozluk"
            className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-5 py-2.5 text-sm font-extrabold text-rehberim-navy transition hover:border-rehberim-navy/25"
          >
            Sözlüğe dön
          </Link>
        </div>
      </div>
    );
  }
  if (!soru) return null;

  return (
    <div className="space-y-4">
      {/* İlerleme */}
      <div className="flex items-center justify-between text-xs font-bold text-rehberim-navy/55">
        <span className="tabular-nums">
          Soru {index + 1} / {sorular.length} · Tur {tur}
        </span>
        <span className="tabular-nums">
          {dogru} doğru · havuzda {toplamSoru.toLocaleString("tr-TR")} soru
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-rehberim-navy/10">
        <div
          className="h-full rounded-full bg-rehberim-accent transition-all duration-300 ease-smooth"
          style={{ width: `${(index / sorular.length) * 100}%` }}
        />
      </div>

      <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <p className="text-sm font-bold leading-relaxed text-rehberim-navy">{soru.soru}</p>
        <p className="mt-3 rounded-xl border border-rehberim-accent/25 bg-rehberim-accent/5 px-4 py-3 text-[15px] leading-relaxed text-rehberim-navy">
          &ldquo;{soru.cumle}&rdquo;
        </p>

        <div className="mt-4 space-y-2">
          {soru.secenekler.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSecili(i)}
              className={`flex w-full items-start gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition ${
                secili === i
                  ? "border-rehberim-accent bg-rehberim-accent/10 font-bold text-rehberim-navy"
                  : "border-rehberim-border bg-white text-rehberim-navy/80 hover:border-rehberim-navy/25"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                  secili === i
                    ? "bg-rehberim-accent text-rehberim-navy"
                    : "bg-rehberim-muted text-rehberim-navy/50"
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {s}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onayla}
          disabled={secili === null}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-rehberim-navy px-5 py-3 text-sm font-extrabold text-white transition hover:bg-rehberim-navy-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index + 1 >= sorular.length ? "Turu bitir" : "Onayla ve geç"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
