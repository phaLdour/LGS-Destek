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
 * "Hepsi", "Hiçbiri", "Yukarıdakilerin tümü" gibi toplayıcı şıklar sınav
 * geleneğinde en sonda durur. Karıştırma bunları araya atarsa hem tuhaf
 * okunur hem de öğrencinin sınav alışkanlığını bozar.
 *
 * DAVRANIŞ: bu şıklar BULUNDUKLARI YERDE sabitlenir — sona TAŞINMAZLAR.
 * İçerikte hep sonda yazıldıkları için sonuç aynı; ama bir gün ortada bir
 * çıpa yazılırsa orada kalır. (Yorum eskiden "her zaman en sonda durur"
 * diyordu; kodun yaptığı bu değil.)
 */
const CIPA = /^\s*(hepsi|tümü|tumu|hiçbiri|hicbiri|hiçbirinde|yukarıdakilerin)/i;

/**
 * Tek bir sorunun şıklarını karıştırıp `correctIndex`i yeni konuma taşır.
 * Şık sayısı 2'den azsa soru olduğu gibi döner.
 */
export function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  const n = q.options?.length ?? 0;
  if (n < 2) return q;

  const next = rng(hashSeed(q.question));
  // Çıpalı şıklar kendi konumlarında kalır; yalnız geri kalanlar karışır.
  const cipaliIndeksler = q.options
    .map((o, i) => (CIPA.test(o) ? i : -1))
    .filter((i) => i >= 0);
  const serbest = q.options
    .map((_, i) => i)
    .filter((i) => !cipaliIndeksler.includes(i));

  if (serbest.length < 2) return q;

  const karisik = serbest.slice();
  for (let i = karisik.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [karisik[i], karisik[j]] = [karisik[j], karisik[i]];
  }

  let k = 0;
  const order = q.options.map((_, i) =>
    cipaliIndeksler.includes(i) ? i : karisik[k++],
  );

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
