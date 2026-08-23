import type { QuizQuestion } from "@/content/types";

/**
 * Soru şıklarını SABİT (deterministik) bir sırayla karıştırır.
 *
 * Neden gerekli: içerik havuzu yazılırken doğru cevap neredeyse her zaman
 * ilk şıkka konmuştu (2.500+ sorunun ~%90'ı A). Bu, soruyu okumadan A
 * işaretleyen öğrenciye ~%90 başarı veriyor; hem çalışma değerini yok
 * ediyor hem de gerçek LGS'de zarar veren bir refleks kazandırıyor.
 *
 * Neden "sabit" karıştırma: sıralama sorunun kendi metninden türetilir,
 * rastgele değildir. Aynı soru her cihazda, her oturumda, her sayfa
 * yenilemesinde aynı sırayla çıkar. Bu şart, çünkü:
 *   • Rekabet maçında iki oyuncu aynı şık sırasını görmeli;
 *   • Sunucudaki doğru cevap kontrolü istemcinin gördüğü sırayla eşleşmeli;
 *   • Maç tekrarında (replay) kayıtlı cevap indeksleri anlamını korumalı.
 *
 * "Hatalarım" kayıtları soru kimliğini tutar, şık indeksini tutmaz; bu
 * yüzden karıştırma geçmiş ilerlemeyi etkilemez.
 */

/** FNV-1a: kısa metinden 32-bit tohum. */
function hashSeed(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32: tohumdan tekrarlanabilir sayı üreteci. */
function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Tek bir sorunun şıklarını karıştırıp `correctIndex`i yeni konuma taşır.
 * Şık sayısı 2'den azsa soru olduğu gibi döner.
 */
export function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  const n = q.options?.length ?? 0;
  if (n < 2) return q;

  const next = rng(hashSeed(q.question));
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const options = order.map((i) => q.options[i]);
  const correctIndex = order.indexOf(q.correctIndex);

  // Beklenmedik veri (correctIndex şık sayısının dışında) → dokunma.
  if (correctIndex < 0) return q;

  return { ...q, options, correctIndex };
}

/** Bir soru dizisinin tamamına uygular. Boş/tanımsız dizide boş döner. */
export function shuffleQuestionList(
  list: QuizQuestion[] | undefined,
): QuizQuestion[] | undefined {
  if (!list?.length) return list;
  return list.map(shuffleQuestionOptions);
}
