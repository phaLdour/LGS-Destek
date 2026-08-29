/**
 * Bekleyen ("tekrar zamanı gelmiş") yanlış soru sayacı — TEK KAYNAK.
 *
 * SORUN (hayalet sayaç): Dashboard'daki "N soru tekrar zamanında" rozeti
 * `wrong_answers` tablosundaki TÜM satırları sayıyordu; /hatalarim sayfası
 * ise listeyi `collectAllQuestions({kind:"karma-all"})` havuzuyla kesiştirip
 * gösteriyordu. İki taraf farklı şey sayınca sayı ile liste tutmuyordu:
 *
 *   1. Çıkmış sorulardaki yanlışlar `cikmis/2026-sozel/turkce#3` gibi bir
 *      kimlikle yazılır; bu kimlik hızlı soru havuzunda HİÇ yoktur, yani
 *      listede asla görünmez ama sayaçta dururdu.
 *   2. İçerikten kaldırılan / kopya olduğu için ayıklanan sorular da aynı
 *      şekilde sayaçta kalıyordu.
 *   3. Ustalaşmış (üst üste 2 doğru) kayıtların silinmesi çevrimdışıyken
 *      başarısız olabiliyor; satır tabloda kalıp sayacı şişiriyordu.
 *
 * ÇÖZÜM: sayaç da, liste de aynı kuraldan geçer — kayıt ancak öğrenciye
 * GERÇEKTEN gösterilebiliyorsa sayılır.
 */

const BIR_GUN_MS = 24 * 60 * 60 * 1000;

/** Ustalaşmış sayılmak için gereken üst üste doğru sayısı (wrongAnswers.ts ile aynı). */
export const USTALASMA_ESIGI = 2;

export type HataSatiri = {
  question_key: string;
  correct_streak?: number | null;
  next_due_at?: string | null;
  last_wrong_at: string;
};

/**
 * Bir kaydın vade zamanı (epoch ms).
 * Eski kayıtlarda `next_due_at` yoksa `last_wrong_at + 1 gün` varsayılır —
 * client'taki `dueTs()` ile birebir aynı kural.
 */
export function vadeZamani(satir: HataSatiri): number {
  if (satir.next_due_at) return new Date(satir.next_due_at).getTime();
  return new Date(satir.last_wrong_at).getTime() + BIR_GUN_MS;
}

/**
 * Kayıt öğrenciye gösterilebilir mi?
 * - Ustalaşmışsa (correct_streak >= 2) gösterilmez; silinmesi gecikmiş olabilir.
 * - Sorusu artık gösterilebilir havuzda değilse gösterilmez.
 *   `gosterilebilirIdler` verilmezse bu kontrol atlanır.
 */
export function gosterilebilirHata(
  satir: HataSatiri,
  gosterilebilirIdler?: ReadonlySet<string>,
): boolean {
  if ((satir.correct_streak ?? 0) >= USTALASMA_ESIGI) return false;
  if (gosterilebilirIdler && !gosterilebilirIdler.has(satir.question_key)) {
    return false;
  }
  return true;
}

/**
 * Vadesi gelmiş ve gerçekten gösterilebilir hata sayısı.
 * /hatalarim listesinin uzunluğuyla aynı sonucu verir.
 */
export function bekleyenHataSay(
  satirlar: HataSatiri[],
  gosterilebilirIdler?: ReadonlySet<string>,
  simdi: number = Date.now(),
): number {
  let adet = 0;
  for (const s of satirlar) {
    if (!gosterilebilirHata(s, gosterilebilirIdler)) continue;
    if (vadeZamani(s) <= simdi) adet += 1;
  }
  return adet;
}
