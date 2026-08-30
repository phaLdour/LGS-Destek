"use client";

/**
 * Profil sayfasındaki kalıcı "Uygulamayı yükle" bölümü.
 *
 * Alt şerit (KurulumDaveti) kapatılınca 30 gün geri gelmiyor; öğrencinin
 * fikri değişirse kuracak bir yer kalmalı. Burası o yer.
 *
 * Üç durum gösterir:
 *   - Zaten kuruluysa: onay mesajı.
 *   - Kurulum olayı hazırsa: "Yükle" düğmesi.
 *   - iOS ise (kurulum olayı hiç gelmez): elle ekleme adımları.
 * Hiçbiri geçerli değilse (ör. desteklemeyen tarayıcı) bölüm hiç çizilmez —
 * çalışmayacak bir düğme göstermek, hiç göstermemekten kötüdür.
 */

import { useEffect, useState } from "react";
import { Check, Download, Smartphone } from "lucide-react";
import {
  iosMu,
  kuruluMu,
  kurulumAboneOl,
  kurulumHazirMi,
  kurulumuBaslat,
} from "@/lib/kurulum";

export function KurulumDugmesi() {
  const [, setTik] = useState(0);
  const [tarayicida, setTarayicida] = useState(false);

  useEffect(() => {
    setTarayicida(true);
    return kurulumAboneOl(() => setTik((t) => t + 1));
  }, []);

  if (!tarayicida) return null;

  const kurulu = kuruluMu();
  const hazir = kurulumHazirMi();
  const ios = iosMu();
  if (!kurulu && !hazir && !ios) return null;

  return (
    <section className="ring-hairline rounded-2xl border border-rehberim-border bg-rehberim-surface p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-rehberim-accent-deep" strokeWidth={2.2} />
        <h2 className="text-base font-bold text-rehberim-navy">Uygulama</h2>
      </div>

      {kurulu ? (
        <p className="flex items-start gap-2 text-sm leading-snug text-rehberim-navy/75">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-accent-deep"
            strokeWidth={2.6}
          />
          Rehberim bu cihaza kurulu. Ana ekranından açtığın için tam ekran
          çalışıyorsun.
        </p>
      ) : hazir ? (
        <>
          <p className="text-sm leading-snug text-rehberim-navy/75">
            Rehberim&apos;i cihazına kurabilirsin: ana ekranına kendi ikonuyla
            gelir, tarayıcı çubuğu olmadan tam ekran açılır.
          </p>
          <button
            type="button"
            onClick={() => void kurulumuBaslat()}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
          >
            <Download className="h-4 w-4" strokeWidth={2.4} />
            Uygulamayı yükle
          </button>
        </>
      ) : (
        <div className="text-sm leading-snug text-rehberim-navy/75">
          <p>iPhone veya iPad&apos;e eklemek için Safari&apos;de:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              Alttaki <strong className="text-rehberim-navy">Paylaş</strong>{" "}
              düğmesine dokun.
            </li>
            <li>
              <strong className="text-rehberim-navy">Ana Ekrana Ekle</strong>&apos;yi
              seç.
            </li>
            <li>
              Sağ üstten <strong className="text-rehberim-navy">Ekle</strong>&apos;ye
              dokun.
            </li>
          </ol>
        </div>
      )}
    </section>
  );
}
