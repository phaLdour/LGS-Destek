"use client";

/**
 * "Rehberim'i telefonuna kur" daveti.
 *
 * Kullanıcı tercihi: davet İLK ZİYARETTE gösterilir (beklemeden).
 * Yine de üç emniyet var, çünkü bunlar daveti kullanışsız yapan durumlar:
 *   1. Uygulama zaten kuruluysa hiç gösterilmez.
 *   2. Giriş/kayıt sayfalarında gösterilmez — form doldururken üstüne
 *      çıkan bir şerit kaydı yarıda bıraktırır.
 *   3. Kapatılırsa 30 gün bir daha çıkmaz (profil sayfasındaki kalıcı
 *      düğmeden istediği zaman kurabilir).
 *
 * iOS'ta tarayıcı kurulum penceresi AÇAMAZ; oradaki tek yol "Paylaş →
 * Ana Ekrana Ekle" adımlarını anlatmaktır, o yüzden iOS'a ayrı bir
 * yönerge kartı gösteriyoruz.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Download, Share, SquarePlus, X } from "lucide-react";
import {
  davetReddedildiMi,
  davetiReddet,
  iosMu,
  kuruluMu,
  kurulumAboneOl,
  kurulumHazirMi,
  kurulumuBaslat,
} from "@/lib/kurulum";

/** Davetin çıkmayacağı yollar: kayıt/giriş akışını bölmesin. */
const SESSIZ_YOLLAR = ["/login", "/kayit", "/register", "/auth"];

export function KurulumDaveti() {
  const pathname = usePathname();
  const [, setTik] = useState(0);
  const [iosAcik, setIosAcik] = useState(false);
  // Sunucuda ve ilk paint'te hiçbir şey çizme: kurulum durumu yalnız
  // tarayıcıda bilinir, aksi hâlde hydration uyuşmazlığı olur.
  const [tarayicida, setTarayicida] = useState(false);

  useEffect(() => {
    setTarayicida(true);
    return kurulumAboneOl(() => setTik((t) => t + 1));
  }, []);

  if (!tarayicida) return null;
  if (kuruluMu()) return null;
  if (davetReddedildiMi()) return null;
  if (SESSIZ_YOLLAR.some((y) => pathname === y || pathname.startsWith(`${y}/`))) {
    return null;
  }

  const ios = iosMu();
  // iOS dışında: tarayıcı bize kurulum olayı vermediyse gösterecek bir şey yok.
  if (!ios && !kurulumHazirMi()) return null;

  async function kur() {
    if (ios) {
      setIosAcik(true);
      return;
    }
    const kabul = await kurulumuBaslat();
    // Reddederse şeridi kapat: aynı oturumda ikinci kez sormak rahatsız edici.
    if (!kabul) davetiReddet();
  }

  return (
    <>
      {/* Alt şerit — mobil alt navigasyonun ve mini sayacın üstünde durur */}
      <div
        role="complementary"
        aria-label="Uygulamayı yükleme daveti"
        // Konum: solda Odak mini sayacı, sağda maskot düğmesi duruyor.
        // Şerit ikisinin de ÜSTÜNDE ve ortada durur ki hiçbirini örtmesin.
        className="fixed inset-x-3 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-md rounded-2xl border border-rehberim-border bg-rehberim-surface p-3 shadow-elevated lg:bottom-24 lg:left-1/2 lg:right-auto lg:mx-0 lg:-translate-x-1/2"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rehberim-accent text-rehberim-on-accent">
            <Download className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight text-rehberim-navy">
              Rehberim&apos;i telefonuna kur
            </p>
            <p className="mt-0.5 text-xs leading-snug text-rehberim-navy/70">
              Ana ekranından tek dokunuşla aç, tam ekran çalış.
            </p>
          </div>
          <button
            type="button"
            onClick={kur}
            className="shrink-0 rounded-xl bg-rehberim-navy px-3 py-2 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
          >
            Kur
          </button>
          <button
            type="button"
            onClick={davetiReddet}
            aria-label="Daveti kapat"
            className="-mr-1 shrink-0 rounded-lg p-1.5 text-rehberim-navy/50 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {iosAcik && <IosRehberi kapat={() => setIosAcik(false)} />}
    </>
  );
}

/**
 * iOS'ta kurulum penceresi yoktur; öğrenciye adımları göstermek gerekir.
 * Safari'de "Paylaş" düğmesi altta, Chrome/Edge iOS'ta adres çubuğundadır —
 * ikisinde de menü öğesinin adı "Ana Ekrana Ekle"dir.
 */
function IosRehberi({ kapat }: { kapat: () => void }) {
  useEffect(() => {
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") kapat();
    }
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [kapat]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-rehberim-navy/50 p-4 backdrop-blur-sm sm:items-center"
      onClick={kapat}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ios-kurulum-baslik"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-rehberim-border bg-rehberim-surface p-5 shadow-elevated"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2
            id="ios-kurulum-baslik"
            className="text-lg font-bold leading-tight text-rehberim-navy"
          >
            iPhone&apos;una kurmak için
          </h2>
          <button
            type="button"
            onClick={kapat}
            aria-label="Kapat"
            className="-mr-1 -mt-1 rounded-lg p-1.5 text-rehberim-navy/50 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ol className="space-y-3">
          <Adim numara={1} ikon={<Share className="h-5 w-5" strokeWidth={2.2} />}>
            Alttaki <strong>Paylaş</strong> düğmesine dokun.
          </Adim>
          <Adim
            numara={2}
            ikon={<SquarePlus className="h-5 w-5" strokeWidth={2.2} />}
          >
            Menüyü aşağı kaydır, <strong>Ana Ekrana Ekle</strong>&apos;ye dokun.
          </Adim>
          <Adim numara={3} ikon={<Download className="h-5 w-5" strokeWidth={2.2} />}>
            Sağ üstten <strong>Ekle</strong>&apos;ye dokun. Rehberim ana ekranında.
          </Adim>
        </ol>

        <p className="mt-4 text-xs leading-snug text-rehberim-navy/60">
          Not: iPhone&apos;da bu adımlar yalnız Safari&apos;de çalışır. Başka bir
          tarayıcıdaysan önce sayfayı Safari&apos;de aç.
        </p>

        <button
          type="button"
          onClick={() => {
            davetiReddet();
            kapat();
          }}
          className="mt-4 w-full rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
        >
          Anladım
        </button>
      </div>
    </div>
  );
}

function Adim({
  numara,
  ikon,
  children,
}: {
  numara: number;
  ikon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rehberim-muted text-rehberim-accent-deep">
        {ikon}
      </span>
      <span className="pt-1.5 text-sm leading-snug text-rehberim-navy">
        <span className="font-mono text-xs text-rehberim-navy/50">{numara}.</span>{" "}
        {children}
      </span>
    </li>
  );
}
