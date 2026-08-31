import type { Metadata } from "next";
import { CevrimdisiKutuphane } from "@/components/cevrimdisi/CevrimdisiKutuphane";

/**
 * /cevrimdisi — internetsiz çalışma kütüphanesi.
 *
 * BU SAYFA BİLEREK AppShell KULLANMAZ ve öğrenciye ait hiçbir şey
 * okumaz (oturum, isim, ilerleme...). Sebebi: service worker bu sayfanın
 * HTML'ini saklayacak. Kişisel bir şey içerseydi, saklanan kopya başka
 * bir öğrencinin (aynı telefonu kullanan kardeş, okul tableti) eline
 * geçebilirdi. İçeriği herkes için aynı olduğundan saklamak güvenli.
 *
 * `force-static`: derlemede bir kez üretilir, istekte sunucuya iş düşmez.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Çevrimdışı çalışma — Rehberim",
  description:
    "Dersleri telefonuna indir, internet olmadan da çalış.",
};

export default function CevrimdisiPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="mb-5">
        <h1 className="text-2xl font-extrabold leading-tight text-rehberim-navy">
          Çevrimdışı çalışma
        </h1>
        <p className="mt-1 text-sm leading-snug text-rehberim-navy/60">
          İnternet olmasa da derslerine devam et.
        </p>
      </header>
      <CevrimdisiKutuphane />
    </main>
  );
}
