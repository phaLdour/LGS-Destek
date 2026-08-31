"use client";

import { useState } from "react";
import { Check, Flag, Loader2, X } from "lucide-react";

/**
 * "Bildir" düğmesi — uygunsuz takma adlar için.
 *
 * NEDEN VAR: otomatik süzgeç (lib/moderasyon.ts) takma ad yazılırken
 * çalışıyor ama hiçbir süzgeç her şeyi yakalayamaz. Süzgeç kaçırdığında
 * bugüne kadar öğrencinin yapabileceği hiçbir şey yoktu.
 *
 * SEBEP LİSTESİ SABİT: serbest metin kutusu, çocukların birbirine
 * yazacağı yeni bir alan açardı. Moderasyon için açtığımız kapı yeni
 * bir moderasyon sorunu doğurmamalı.
 *
 * SONUÇ GİZLİ: kaç kişinin bildirdiğini söylemiyoruz. Sayıyı göstermek,
 * "eşiği dolduralım" diye arkadaş toplamayı oyunlaştırırdı.
 */

const SEBEPLER = [
  { id: "kufur", ad: "Küfür var" },
  { id: "hakaret", ad: "Hakaret / birini hedef alıyor" },
  { id: "uygunsuz", ad: "Uygunsuz içerik" },
  { id: "kisisel-bilgi", ad: "Kişisel bilgi (isim, telefon, adres)" },
  { id: "diger", ad: "Başka bir sebep" },
] as const;

export function BildirDugmesi({
  hedefKullaniciId,
  hedefAd,
}: {
  hedefKullaniciId: string;
  hedefAd: string;
}) {
  const [acik, setAcik] = useState(false);
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  async function bildir(sebep: string) {
    setGonderiliyor(true);
    setHata(null);
    try {
      const y = await fetch("/api/sikayet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hedef: hedefKullaniciId, sebep }),
      });
      if (!y.ok) {
        const g = (await y.json().catch(() => ({}))) as { error?: string };
        setHata(g.error ?? "Bildirim gönderilemedi.");
        return;
      }
      setBitti(true);
    } catch {
      setHata("Bildirim gönderilemedi. İnternetini kontrol et.");
    } finally {
      setGonderiliyor(false);
    }
  }

  if (bitti) {
    return (
      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
        Bildirildi, teşekkürler
      </p>
    );
  }

  if (!acik) {
    return (
      <button
        type="button"
        onClick={() => setAcik(true)}
        className="inline-flex items-center gap-1 text-xs font-bold text-rehberim-navy/45 transition hover:text-rehberim-navy"
        aria-label={`${hedefAd} adlı oyuncunun takma adını bildir`}
      >
        <Flag className="h-3.5 w-3.5" strokeWidth={2.4} />
        Bildir
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-2xl border border-rehberim-border bg-rehberim-surface p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-rehberim-navy">
          Bu ad neden uygunsuz?
        </p>
        <button
          type="button"
          onClick={() => setAcik(false)}
          aria-label="Kapat"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-rehberim-navy/40 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" strokeWidth={2.6} />
        </button>
      </div>

      <div className="mt-2 space-y-1.5">
        {SEBEPLER.map((s) => (
          <button
            key={s.id}
            type="button"
            disabled={gonderiliyor}
            onClick={() => bildir(s.id)}
            className="flex w-full items-center gap-2 rounded-xl border border-rehberim-border bg-rehberim-muted px-3 py-2 text-left text-sm font-semibold text-rehberim-navy transition enabled:hover:bg-rehberim-surface disabled:opacity-50"
          >
            {gonderiliyor ? (
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
            ) : (
              <Flag className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
            )}
            {s.ad}
          </button>
        ))}
      </div>

      {hata && (
        <p className="mt-2 rounded-xl border border-rose-300 bg-rose-50 p-2 text-xs font-semibold text-rose-900">
          {hata}
        </p>
      )}

      <p className="mt-2 text-[11px] leading-snug text-rehberim-navy/50">
        Bildirimin gizlidir; karşı taraf kimin bildirdiğini görmez.
        Şaka amaçlı bildirim yapma — gerçek bildirimlerin işe yaramasını
        zorlaştırır.
      </p>
    </div>
  );
}
