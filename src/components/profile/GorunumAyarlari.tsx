"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Eye } from "lucide-react";
import {
  TERCIH_ANAHTARLARI,
  tercihOku,
  tercihYaz,
} from "@/lib/gorunumTercihleri";

/**
 * Görünüm tercihleri. Şu an tek ayar var: sınav geri sayımı.
 * Tercih cihazda tutulur (localStorage) — hesap gerektirmez.
 */
export function GorunumAyarlari() {
  const [hazir, setHazir] = useState(false);
  const [geriSayim, setGeriSayim] = useState(true);

  useEffect(() => {
    setGeriSayim(!tercihOku(TERCIH_ANAHTARLARI.geriSayimKapali));
    setHazir(true);
  }, []);

  function degistir(acik: boolean) {
    setGeriSayim(acik);
    tercihYaz(TERCIH_ANAHTARLARI.geriSayimKapali, !acik);
  }

  return (
    <section className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rehberim-navy/5 text-rehberim-navy ring-1 ring-rehberim-navy/10">
          <Eye className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-extrabold tracking-tight text-rehberim-navy">
            Görünüm
          </h2>
          <p className="text-xs text-rehberim-navy/55">
            Bu tercihler yalnızca bu cihazda geçerlidir.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-xl border border-rehberim-border bg-rehberim-muted/60 p-4">
        <div className="flex min-w-0 items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-navy/45" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-rehberim-navy">
              Sınava kalan süre
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-rehberim-navy/60">
              Ana sayfada LGS geri sayımını göster. Baskı hissettiriyorsa
              kapatabilirsin.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={geriSayim}
          aria-label="Sınava kalan süreyi göster"
          disabled={!hazir}
          onClick={() => degistir(!geriSayim)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rehberim-accent disabled:opacity-50 ${
            geriSayim ? "bg-rehberim-accent" : "bg-rehberim-navy/20"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-snap ${
              geriSayim ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </section>
  );
}
