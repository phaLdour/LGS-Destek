"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, X } from "lucide-react";

/**
 * Service worker'ı (yalnız üretimde) kaydeder ve yeni sürüm çıktığında
 * öğrenciye "yenile" bildirimi gösterir.
 *
 * NEDEN BİLDİRİM: service worker eskiden install sırasında skipWaiting()
 * çağırıyordu, yani yeni sürüm açık duran sekmenin altından anında devreye
 * giriyordu. Sayfa ise hâlâ eski JS parçalarını istiyor, Vercel o parçaları
 * çoktan silmiş oluyordu — deneme sınavının ortasında beyaz ekran demek.
 * Artık yeni sürüm "bekleyen" durumda kalır; geçiş, öğrencinin dokunuşuyla
 * ve tam sayfa yenilemeyle olur (o an ne yapıyorsa bölünmez).
 */
export function ServiceWorkerRegister() {
  const [bekleyen, setBekleyen] = useState<ServiceWorker | null>(null);
  const [gizlendi, setGizlendi] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let iptal = false;

    const kaydet = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          if (iptal) return;

          // Sayfa açılırken zaten bekleyen bir sürüm olabilir
          // (önceki ziyarette indirilmiş ama geçilmemiş).
          if (reg.waiting && navigator.serviceWorker.controller) {
            setBekleyen(reg.waiting);
          }

          reg.addEventListener("updatefound", () => {
            const yeni = reg.installing;
            if (!yeni) return;
            yeni.addEventListener("statechange", () => {
              // controller yoksa bu İLK kurulum: bildirecek bir "güncelleme"
              // yok, sessizce devreye girsin.
              if (yeni.state === "installed" && navigator.serviceWorker.controller) {
                setBekleyen(yeni);
              }
            });
          });
        })
        .catch(() => {
          // sessizce yoksay — SW kritik değil, yalnız hızlandırma
        });
    };

    // HATA DÜZELTMESİ: eskiden yalnız `window.addEventListener("load", ...)`
    // vardı. React bu efekti sayfa yüklendikten SONRA çalıştırdığı için
    // `load` olayı çoktan geçmiş oluyor ve dinleyici hiç tetiklenmiyordu —
    // yani service worker çoğu ziyarette HİÇ KAYDOLMUYORDU (soru
    // görüntüleri önbelleğe alınmıyor, telefon bildirimleri çalışmıyordu).
    // Artık sayfa zaten yüklendiyse doğrudan kaydediyoruz.
    if (document.readyState === "complete") {
      kaydet();
      return () => {
        iptal = true;
      };
    }
    window.addEventListener("load", kaydet);
    return () => {
      iptal = true;
      window.removeEventListener("load", kaydet);
    };
  }, []);

  const yenile = useCallback(() => {
    if (!bekleyen) return;
    // Yeni SW devralınca sayfayı bir kez yenile.
    const birKez = () => {
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", birKez, {
      once: true,
    });
    bekleyen.postMessage({ type: "SKIP_WAITING" });
  }, [bekleyen]);

  if (!bekleyen || gizlendi) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      // Maskot düğmesi (sağ alt) ve Odak mini sayacı (sol alt) ile
      // çakışmaması için ortada ve onların üstünde durur.
      className="fixed inset-x-3 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-sm rounded-2xl border border-rehberim-border bg-rehberim-surface p-3 shadow-elevated lg:bottom-24 lg:left-1/2 lg:right-auto lg:mx-0 lg:-translate-x-1/2"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rehberim-accent text-rehberim-on-accent">
          <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
        </span>
        <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-rehberim-navy">
          Rehberim&apos;in yeni sürümü hazır.
        </p>
        <button
          type="button"
          onClick={yenile}
          className="shrink-0 rounded-xl bg-rehberim-navy px-3 py-2 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
        >
          Yenile
        </button>
        <button
          type="button"
          onClick={() => setGizlendi(true)}
          aria-label="Şimdilik kapat"
          className="-mr-1 shrink-0 rounded-lg p-1.5 text-rehberim-navy/50 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
