"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/content/types";

/**
 * Çevrimdışı test.
 *
 * NEDEN AYRI BİR BİLEŞEN: normal `Quiz`, cevapları sunucuya kaydeden
 * `useStudySession` bağlamına bağlı. Çevrimdışıyken sunucu yok; o
 * bileşeni buraya koymak sayfayı komple çökertirdi. Burada kayıt yok,
 * sadece çöz-gör.
 *
 * Öğrenci bunu bilmeli — sonuç ekranında açıkça yazıyor: bu test
 * istatistiklere işlenmez.
 */
export function CevrimdisiTest({ sorular }: { sorular: QuizQuestion[] }) {
  const [sira, setSira] = useState(0);
  const [secili, setSecili] = useState<number | null>(null);
  const [cevaplar, setCevaplar] = useState<number[]>([]);
  const [bitti, setBitti] = useState(false);

  const soru = sorular[sira];
  const dogruSayisi = cevaplar.filter(
    (c, i) => c === sorular[i]?.correctIndex,
  ).length;

  function isaretle(i: number) {
    if (secili !== null) return; // aynı soruda fikir değiştirme yok
    setSecili(i);
  }

  function ilerle() {
    if (secili === null) return;
    const yeni = [...cevaplar, secili];
    setCevaplar(yeni);
    setSecili(null);
    if (sira + 1 >= sorular.length) setBitti(true);
    else setSira(sira + 1);
  }

  function bastanBasla() {
    setSira(0);
    setSecili(null);
    setCevaplar([]);
    setBitti(false);
  }

  if (bitti) {
    const yuzde = Math.round((dogruSayisi / sorular.length) * 100);
    return (
      <div className="rounded-2xl border border-rehberim-border bg-rehberim-surface p-5 text-center">
        <p className="text-sm font-bold text-rehberim-navy/60">Test bitti</p>
        <p className="mt-1 text-3xl font-extrabold text-rehberim-navy">
          {dogruSayisi} / {sorular.length}
        </p>
        <p className="mt-1 text-sm text-rehberim-navy/60">%{yuzde} doğru</p>

        <div className="mt-4 space-y-2 text-left">
          {sorular.map((s, i) => {
            const verilen = cevaplar[i];
            const dogru = verilen === s.correctIndex;
            return (
              <div
                key={i}
                className="rounded-xl border border-rehberim-border bg-rehberim-muted p-3"
              >
                <div className="flex items-start gap-2">
                  {dogru ? (
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      strokeWidth={3}
                    />
                  ) : (
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                      strokeWidth={3}
                    />
                  )}
                  <p className="text-sm font-semibold text-rehberim-navy">
                    {s.question}
                  </p>
                </div>
                {!dogru && (
                  <p className="mt-1.5 pl-6 text-sm text-rehberim-navy/70">
                    Doğrusu:{" "}
                    <span className="font-bold text-rehberim-navy">
                      {s.options[s.correctIndex]}
                    </span>
                  </p>
                )}
                {s.explanation && (
                  <p className="mt-1 pl-6 text-xs leading-snug text-rehberim-navy/60">
                    {s.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-snug text-rehberim-navy/60">
          Çevrimdışı çözülen testler istatistiklerine ve “Hatalarım”a
          işlenmez. İnternete bağlandığında konunun kendi testini çözersen
          ilerlemene sayılır.
        </p>

        <button
          type="button"
          onClick={bastanBasla}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.4} />
          Baştan çöz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-rehberim-border bg-rehberim-surface p-5">
      <div className="flex items-center justify-between text-xs font-bold text-rehberim-navy/60">
        <span>
          Soru {sira + 1} / {sorular.length}
        </span>
        <span>Çevrimdışı</span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-rehberim-muted"
        role="progressbar"
        aria-valuenow={sira + 1}
        aria-valuemin={1}
        aria-valuemax={sorular.length}
      >
        <div
          className="h-full rounded-full bg-rehberim-accent transition-all"
          style={{ width: `${((sira + 1) / sorular.length) * 100}%` }}
        />
      </div>

      <p className="mt-4 text-base font-semibold leading-snug text-rehberim-navy">
        {soru.question}
      </p>

      <div className="mt-3 space-y-2">
        {soru.options.map((secenek, i) => {
          const secildi = secili === i;
          const dogruSik = i === soru.correctIndex;
          const gosterilsin = secili !== null;
          let sinif =
            "border-rehberim-border bg-rehberim-muted text-rehberim-navy";
          if (gosterilsin && dogruSik) {
            sinif = "border-emerald-500 bg-emerald-50 text-emerald-900";
          } else if (gosterilsin && secildi) {
            sinif = "border-rose-500 bg-rose-50 text-rose-900";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => isaretle(i)}
              disabled={gosterilsin}
              className={`flex w-full items-start gap-2.5 rounded-xl border-2 px-3.5 py-2.5 text-left text-sm font-medium transition ${sinif} ${
                gosterilsin ? "" : "hover:border-rehberim-accent active:scale-[0.99]"
              }`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-current text-[11px] font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="leading-snug">{secenek}</span>
            </button>
          );
        })}
      </div>

      {secili !== null && soru.explanation && (
        <p className="mt-3 rounded-xl border border-rehberim-border bg-rehberim-muted p-3 text-sm leading-snug text-rehberim-navy/80">
          {soru.explanation}
        </p>
      )}

      <button
        type="button"
        onClick={ilerle}
        disabled={secili === null}
        className="mt-4 w-full rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white transition enabled:hover:bg-rehberim-navy-light enabled:active:scale-95 disabled:opacity-40"
      >
        {sira + 1 >= sorular.length ? "Testi bitir" : "Sonraki soru"}
      </button>
    </div>
  );
}
