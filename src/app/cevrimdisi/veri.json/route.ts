import { cevrimdisiPaketiUret } from "@/lib/cevrimdisiVeri";

/**
 * GET /cevrimdisi/veri.json — çevrimdışı ders paketi.
 *
 * `force-static`: derleme sırasında bir kez üretilir, sonra CDN'den
 * düz dosya gibi servis edilir. Sunucu her istekte yeniden hesaplamaz;
 * öğrencinin telefonu da service worker'a düşen tek bir dosya görür.
 *
 * İçinde kişisel hiçbir şey yok (bkz. lib/cevrimdisiVeri.ts) — bu yüzden
 * önbelleğe alınması güvenli.
 */
export const dynamic = "force-static";

export function GET() {
  const paket = cevrimdisiPaketiUret();
  return new Response(JSON.stringify(paket), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Sürüm değişince service worker yeniden indirir; aradaki sürede
      // tarayıcının kendi önbelleği de işe yarasın.
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
