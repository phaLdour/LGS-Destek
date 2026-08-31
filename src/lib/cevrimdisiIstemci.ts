"use client";

/**
 * Çevrimdışı paketin tarayıcı tarafı.
 *
 * Paket, tarayıcının Cache API'sinde tutulur (localStorage değil):
 *   - localStorage'ın sınırı ~5 MB ve senkron; 620 KB'lık JSON'u
 *     ayrıştırmak ana iş parçacığını kilitler.
 *   - Cache API zaten service worker'ın kullandığı yer; böylece internet
 *     yokken SW aynı kaydı sayfaya sunabiliyor. Tek kopya, tek doğruluk.
 *
 * İki şey saklanır:
 *   1. `/cevrimdisi/veri.json`  — ders içeriği
 *   2. `/cevrimdisi`            — sayfanın kendi HTML'i
 * İkincisi olmadan öğrenci çevrimdışıyken sayfayı hiç açamaz.
 */

import {
  CEVRIMDISI_CACHE,
  CEVRIMDISI_VERI_YOLU,
  CEVRIMDISI_YOLU,
  type CevrimdisiPaket,
} from "./cevrimdisiYollar";

// Önbellek adı `cevrimdisiYollar.ts` içinde; sw.js ile aynı olmalı.
export { CEVRIMDISI_CACHE } from "./cevrimdisiYollar";

export type IndirmeDurumu =
  | { hal: "yok" }
  | { hal: "var"; paket: CevrimdisiPaket; guncelMi: boolean | null };

function cacheVarMi(): boolean {
  return typeof caches !== "undefined";
}

/** Saklanan paketi okur. Yoksa null. */
export async function saklananPaket(): Promise<CevrimdisiPaket | null> {
  if (!cacheVarMi()) return null;
  try {
    const c = await caches.open(CEVRIMDISI_CACHE);
    const yanit = await c.match(CEVRIMDISI_VERI_YOLU);
    if (!yanit) return null;
    return (await yanit.json()) as CevrimdisiPaket;
  } catch {
    // Bozuk kayıt: yokmuş gibi davran, indirme yeniden yazar.
    return null;
  }
}

/**
 * Paketi (ve sayfanın HTML'ini) indirip saklar.
 * Hata durumunda throw eder — düğme kullanıcıya haber verebilsin.
 */
export async function paketiIndir(): Promise<CevrimdisiPaket> {
  if (!cacheVarMi()) {
    throw new Error("Bu tarayıcı çevrimdışı saklamayı desteklemiyor.");
  }
  const c = await caches.open(CEVRIMDISI_CACHE);

  // 1) Veri. `cache: "reload"` ile tarayıcının kendi bayat kopyasını değil,
  //    sunucudaki güncel sürümü alırız.
  const veriYaniti = await fetch(CEVRIMDISI_VERI_YOLU, { cache: "reload" });
  if (!veriYaniti.ok) {
    throw new Error(`İçerik indirilemedi (${veriYaniti.status}).`);
  }
  // Gövde bir kez okunabilir: önce klonu sakla, sonra aslını ayrıştır.
  await c.put(CEVRIMDISI_VERI_YOLU, veriYaniti.clone());
  const paket = (await veriYaniti.json()) as CevrimdisiPaket;

  // 2) Sayfanın HTML'i. Öğrenci buraya uygulama içinden geldiyse tarayıcı
  //    hiç HTML istemiş olmayabilir (Next yumuşak geçiş yapar); o zaman
  //    internet gidince sayfa hiç açılmaz. Bu yüzden açıkça çekiyoruz.
  try {
    const sayfa = await fetch(CEVRIMDISI_YOLU, { cache: "reload" });
    if (sayfa.ok) await c.put(CEVRIMDISI_YOLU, sayfa.clone());
  } catch {
    // Sayfa saklanamadıysa içerik yine de duruyor; öğrenciyi
    // uyarmaya değmez, bir dahaki güncellemede düzelir.
  }

  return paket;
}

/** Saklanan paketi siler (öğrenci yer açmak isterse). */
export async function paketiSil(): Promise<void> {
  if (!cacheVarMi()) return;
  await caches.delete(CEVRIMDISI_CACHE);
}

/**
 * Sunucudaki sürüm saklanandan farklı mı?
 * İnternet yoksa `null` döner — "bilmiyoruz" ile "eski" farklı şeyler,
 * öğrenciye çevrimdışıyken boş yere "güncelle" dememeliyiz.
 */
export async function guncelMi(saklanan: CevrimdisiPaket): Promise<boolean | null> {
  try {
    const yanit = await fetch(CEVRIMDISI_VERI_YOLU, { cache: "no-store" });
    if (!yanit.ok) return null;
    const uzak = (await yanit.json()) as CevrimdisiPaket;
    return uzak.surum === saklanan.surum;
  } catch {
    return null;
  }
}

/** Kaba bir boyut tahmini (öğrenciye "ne kadar yer kaplıyor" demek için). */
export function paketBoyutuKB(paket: CevrimdisiPaket): number {
  return Math.round(JSON.stringify(paket).length / 1024);
}
