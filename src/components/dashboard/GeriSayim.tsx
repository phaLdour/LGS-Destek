"use client";

import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import {
  TERCIH_ANAHTARLARI,
  tercihOku,
  tercihYaz,
} from "@/lib/gorunumTercihleri";

const ANAHTAR = TERCIH_ANAHTARLARI.geriSayimKapali;

type Props = {
  /** Sınav tarihi ISO — sunucuda hesaplanıp geçilir. */
  hedefIso: string;
  yil: number;
  tarihMetni: string;
  /** MEB açıkladı mı? false ise "tahmini" yazılır. */
  resmi: boolean;
};

function kalan(hedef: number) {
  const fark = hedef - Date.now();
  if (fark <= 0) return null;
  const gun = Math.floor(fark / 86_400_000);
  const saat = Math.floor((fark % 86_400_000) / 3_600_000);
  const dakika = Math.floor((fark % 3_600_000) / 60_000);
  return { gun, saat, dakika };
}

/**
 * Sınava kalan süre şeridi. Ayarlardan (profil) kapatılabilir; tercih
 * localStorage'ta tutulur, sunucuya gitmez.
 *
 * Sunucu ve istemcinin farklı saniyeleri görmesi hydration uyuşmazlığı
 * yaratacağı için ilk render'da hiçbir şey basmayıp mount'tan sonra
 * gösteriyoruz.
 */
export function GeriSayim({ hedefIso, yil, tarihMetni, resmi }: Props) {
  const [hazir, setHazir] = useState(false);
  const [kapali, setKapali] = useState(false);
  const [sure, setSure] = useState<ReturnType<typeof kalan>>(null);

  useEffect(() => {
    setKapali(tercihOku(ANAHTAR));
    const hedef = new Date(hedefIso).getTime();
    setSure(kalan(hedef));
    setHazir(true);
    const t = setInterval(() => setSure(kalan(hedef)), 30_000);
    return () => clearInterval(t);
  }, [hedefIso]);

  if (!hazir || kapali || !sure) return null;

  function kapat() {
    tercihYaz(ANAHTAR, true);
    setKapali(true);
  }

  return (
    <div className="relative mt-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-rehberim-navy/10 bg-white px-4 py-3 shadow-card">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rehberim-navy/5 text-rehberim-navy ring-1 ring-rehberim-navy/10">
        <CalendarDays className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-navy/50">
          LGS {yil}
          {!resmi && " · tahmini"}
        </p>
        <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-rehberim-navy">
          <span className="text-2xl font-extrabold leading-none tabular-nums tracking-tight">
            {sure.gun}
          </span>
          <span className="text-sm font-bold">gün</span>
          <span className="text-sm font-semibold tabular-nums text-rehberim-navy/60">
            {sure.saat} sa {sure.dakika} dk
          </span>
        </p>
      </div>

      <p className="hidden shrink-0 text-right text-xs font-semibold text-rehberim-navy/55 sm:block">
        {tarihMetni}
        <br />
        <span className="text-rehberim-navy/40">
          {resmi ? "MEB takvimi" : "MEB henüz açıklamadı"}
        </span>
      </p>

      <button
        type="button"
        onClick={kapat}
        aria-label="Geri sayımı gizle"
        title="Gizle — profil sayfasından geri açabilirsin"
        className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rehberim-navy/35 transition-colors hover:bg-rehberim-navy/5 hover:text-rehberim-navy/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rehberim-accent"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
