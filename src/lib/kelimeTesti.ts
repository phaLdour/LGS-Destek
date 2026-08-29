/**
 * Kelime testi soru üretici.
 *
 * LGS'de en sık çıkan çok anlamlı kelimelerden (sözlükte lgsSik olarak
 * işaretli 115 kelime), "sözcükte anlam" sorularına birebir benzeyen
 * sorular türetir — elle soru yazmak yok.
 *
 * İki soru tipi:
 *  A) "Cümlede hangi anlamda?" — çok anlamlı bir kelimenin bir örnek
 *     cümlesi verilir; şıklar o kelimenin KENDİ tanımlarıdır. (LGS'nin
 *     tam sorduğu biçim.)
 *  B) "Gerçek mi, mecaz mı?" — bir örnek cümledeki kullanımın anlam
 *     türü sorulur.
 *
 * Şıklar deterministik karıştırılır (soru metni tohumdur) — aynı soru
 * her öğrencide aynı sırayla görünür, cevap pozisyon ezberi oluşmaz
 * çünkü tohum sorudan türetilir.
 */
import { SOZLUK, type Kelime } from "@/content/sozluk-veri";

/**
 * TESTİN KELİME HAVUZU — sözlüğün TAMAMI değil, yalnız LGS'de "sözcükte
 * anlam" ve "cümlede anlam" sorularında en sık karşılaşılan kelimeler
 * (sozluk-veri.ts içinde lgsSik: true ile işaretli olanlar).
 *
 * Neden: sözlük bir başvuru kaynağı olarak geniş kalmalı, ama test
 * öğrencinin sınavda gerçekten karşılaşacağı kelimelere odaklanmalı.
 * Sözlüğe yeni kelime eklemek testi kendiliğinden şişirmez.
 */
const TEST_HAVUZU: Kelime[] = SOZLUK.filter((k) => k.lgsSik);

export type KelimeSorusu = {
  /** "kelime#anlamIndex#tip" — çözüldü/yanlış takibi için kararlı kimlik */
  id: string;
  soru: string;
  /** Vurgulanan örnek cümle */
  cumle: string;
  kelime: string;
  secenekler: string[];
  dogruIndex: number;
};

// ── Deterministik karıştırma (shuffleOptions ile aynı aile) ──────────
function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number): () => number {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function karistir<T>(dizi: T[], seed: string): T[] {
  const next = rng(hashSeed(seed));
  const kopya = [...dizi];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

/** Tip A: cümlede hangi anlamda? (yalnız 3+ farklı tanımlı kelimeler) */
function tipA(k: Kelime): KelimeSorusu[] {
  if (k.anlamlar.length < 3) return [];
  return k.anlamlar.map((a, i) => {
    const secenekHavuzu = k.anlamlar.map((x) => x.tanim);
    const secenekler = karistir(secenekHavuzu, `${k.kelime}#${i}#A`).slice(0, 4);
    // doğru tanım karıştırma sonrası ilk 4'e girmediyse ekle
    if (!secenekler.includes(a.tanim)) secenekler[3] = a.tanim;
    const sirali = karistir(secenekler, `${k.kelime}#${i}#A2`);
    return {
      id: `${k.kelime}#${i}#A`,
      soru: `"${k.kelime}" sözcüğü aşağıdaki cümlede hangi anlamda kullanılmıştır?`,
      cumle: a.ornek,
      kelime: k.kelime,
      secenekler: sirali,
      dogruIndex: sirali.indexOf(a.tanim),
    };
  });
}

/** Tip B: gerçek mi mecaz mı? (mecaz veya terim anlamı olan kelimeler) */
function tipB(k: Kelime): KelimeSorusu[] {
  const turler = new Set(k.anlamlar.map((a) => a.tur));
  if (turler.size < 2) return []; // tek türlü kelimede soru anlamsız
  return k.anlamlar
    .filter((a) => a.tur !== "terim") // terim ayrımı LGS'de az sorulur
    .map((a, i) => {
      const secenekler = ["Gerçek anlam", "Mecaz anlam"];
      return {
        id: `${k.kelime}#${i}#B`,
        soru: `"${k.kelime}" sözcüğü aşağıdaki cümlede gerçek anlamıyla mı, mecaz anlamıyla mı kullanılmıştır?`,
        cumle: a.ornek,
        kelime: k.kelime,
        secenekler,
        dogruIndex: a.tur === "gerçek" ? 0 : 1,
      };
    });
}

/** Tüm üretilebilir soruların sayısı (tanıtım metinleri için). */
export function kelimeSorusuSayisi(): number {
  let n = 0;
  for (const k of TEST_HAVUZU) n += tipA(k).length + tipB(k).length;
  return n;
}

/** Testin kaç kelimeden soru ürettiği (tanıtım metinleri için). */
export function testKelimeSayisi(): number {
  return TEST_HAVUZU.length;
}

/**
 * Bir tur için soru seti üretir.
 * @param tur    tur numarası — her turda farklı sorular gelsin diye tohuma girer
 * @param adet   turdaki soru sayısı
 */
export function kelimeTuruUret(tur: number, adet = 10): KelimeSorusu[] {
  const hepsi: KelimeSorusu[] = [];
  for (const k of TEST_HAVUZU) {
    hepsi.push(...tipA(k), ...tipB(k));
  }
  // Tur numarası tohuma girer: her "Yeni tur" farklı bir kesit getirir,
  // ama aynı tur numarası her zaman aynı seti verir (paylaşılabilir).
  const sirali = karistir(hepsi, `kelime-turu-${tur}`);
  const secilen: KelimeSorusu[] = [];
  const gorulenKelime = new Set<string>();
  for (const s of sirali) {
    if (gorulenKelime.has(s.kelime)) continue; // bir turda kelime tekrarı olmasın
    gorulenKelime.add(s.kelime);
    secilen.push(s);
    if (secilen.length >= adet) break;
  }
  return secilen;
}
