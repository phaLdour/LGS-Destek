/**
 * Çevrimdışı kütüphane verisi.
 *
 * NEDEN VAR: öğrencilerin çoğu telefonla ve sınırlı internetle çalışıyor.
 * Otobüste, servis kuyruğunda, internetin çektiği çekmediği bir yerde
 * site tamamen susuyordu — elinde telefon var ama çalışamıyor.
 *
 * NEDEN SAYFA DEĞİL VERİ: `public/sw.js` sayfaları (HTML) bilerek
 * önbelleğe almıyor; sayfalarda öğrenciye özel şeyler var ve saklanan bir
 * sayfa başka bir öğrencinin eline geçebilir. Bunun yerine yalnız
 * DERS İÇERİĞİ saklanır: makale, kartlar, test, ipuçları, konu haritası.
 * Bunların hiçbiri kişisel değil — 49 konunun tamamı herkes için aynı.
 *
 * BOYUT: ham JSON ~620 KB, ağdan gzip'li ~150 KB. Tek seferde hepsini
 * indirmek, "hangi konuyu indireyim" diye seçtirmekten hem basit hem de
 * öğrenci için daha faydalı — plan değişir, başka konuya geçer.
 *
 * VİDEO DAHİL DEĞİL: MP4'ler yüzlerce MB. Çevrimdışı paket metin
 * ağırlıklı kalır; öğrencinin veri paketini yakmayız.
 */

import { getAllSubjects } from "@/content";
import type {
  CevrimdisiDers,
  CevrimdisiKonu,
  CevrimdisiPaket,
} from "./cevrimdisiYollar";

// Adresler ve tipler içerik import'u OLMAYAN dosyada durur (sebebi orada
// yazılı); buradan yeniden dışa veriyoruz ki çağıranlar tek yerden alsın.
export type { CevrimdisiDers, CevrimdisiKonu, CevrimdisiPaket };
export {
  CEVRIMDISI_CACHE,
  CEVRIMDISI_VERI_YOLU,
  CEVRIMDISI_YOLU,
} from "./cevrimdisiYollar";

/**
 * Basit, kararlı bir özet (hash). Aynı içerik → aynı sürüm.
 * Kriptografik değil; amacı yalnız "değişti mi?" sorusuna cevap vermek.
 */
function ozetle(metin: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < metin.length; i++) {
    const c = metin.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 + c, 0x85ebca6b) >>> 0;
  }
  return (h1.toString(36) + h2.toString(36)).slice(0, 12);
}

/** Çevrimdışı paketi kurar. Sunucuda, derleme sırasında bir kez çalışır. */
export function cevrimdisiPaketiUret(): CevrimdisiPaket {
  const dersler: CevrimdisiDers[] = getAllSubjects().map((ders) => ({
    slug: ders.slug,
    ad: ders.name,
    konular: ders.topics.map((k) => {
      const konu: CevrimdisiKonu = {
        id: k.id,
        ad: k.name,
        ozet: k.summary,
      };
      // Boş alanları hiç koymuyoruz: paket küçük kalsın, çevrimdışı
      // sayfa da "bu bölüm yok" ayrımını kolayca yapabilsin.
      if (k.article) konu.makale = k.article;
      if (k.cards?.length) konu.kartlar = k.cards;
      if (k.quiz?.length) konu.test = k.quiz;
      if (k.tips?.length) konu.ipuclari = k.tips;
      if (k.mindMap?.branches?.length) konu.harita = k.mindMap;
      return konu;
    }),
  }));

  const konuSayisi = dersler.reduce((t, d) => t + d.konular.length, 0);

  return {
    surum: ozetle(JSON.stringify(dersler)),
    // Derleme anı: öğrenciye "içerik ne zamanki" diye gösterilir.
    uretim: new Date().toISOString(),
    konuSayisi,
    dersler,
  };
}

