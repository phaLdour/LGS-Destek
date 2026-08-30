/**
 * "Bu konuda LGS'de çıkmış sorular" — konu bazlı çıkmış soru havuzu.
 *
 * Çıkmış soru verisi (src/content/cikmis-sorular) yıl+bölüm ekseninde
 * saklanır; konu bilgisi orada YOKTUR ve sorular kitapçıktan kesilmiş
 * görüntü olduğu için metinden çıkarılamaz. Konu eşlemesi ayrı bir
 * katmanda tutulur: src/content/cikmis-sorular/konu-etiketleri.ts
 *
 * Bu modül o iki katmanı birleştirir ve konu sayfası ile konu testinin
 * ihtiyacı olan tek soru kaynağıdır.
 */

import { PAST_EXAMS } from "@/content/cikmis-sorular";
import { KONU_ETIKETLERI } from "@/content/cikmis-sorular/konu-etiketleri";
import type { ExamSection, PastQuestion } from "@/content/cikmis-sorular/types";

/** Çıkmış soru + hangi sınavdan geldiği. Karışık yıllı testler için gerekli. */
export type KonuCikmisSoru = PastQuestion & {
  year: number;
  section: ExamSection;
};

/** Konu testi bu boyutta turlara bölünür. */
export const TUR_BOYU = 10;

/**
 * İçerik ders slug'ı → çıkmış soru verisindeki ders slug'ı.
 * Tek fark Fen: içerikte "fen-bilimleri", çıkmış soruda "fen".
 */
const DERS_ESLEME: Record<string, string> = {
  "fen-bilimleri": "fen",
};

function cikmisDersSlug(icerikDersSlug: string): string {
  return DERS_ESLEME[icerikDersSlug] ?? icerikDersSlug;
}

/** Etiket anahtarı — konu-etiketleri.ts ile aynı biçim. */
function anahtar(year: number, dersSlug: string, no: number): string {
  return `${year}-${dersSlug}-${no}`;
}

/**
 * Tüm çıkmış soruları yıl bilgisiyle birlikte tek listede toplar.
 * Modül ömrü boyunca bir kez hesaplanır (810 soru).
 */
let tumSorularOnbellek: KonuCikmisSoru[] | null = null;

function tumSorular(): KonuCikmisSoru[] {
  if (tumSorularOnbellek) return tumSorularOnbellek;
  const liste: KonuCikmisSoru[] = [];
  for (const yil of PAST_EXAMS) {
    for (const meta of [yil.sozel, yil.sayisal]) {
      for (const q of meta.questions ?? []) {
        liste.push({ ...q, year: meta.year, section: meta.section });
      }
    }
  }
  tumSorularOnbellek = liste;
  return liste;
}

/**
 * Bir konunun çıkmış soruları — YENİDEN ESKİYE sıralı.
 * Aynı yıl içinde sınavdaki soru sırası korunur.
 */
export function konuCikmisSorulari(
  icerikDersSlug: string,
  konuId: string,
): KonuCikmisSoru[] {
  const ders = cikmisDersSlug(icerikDersSlug);
  return tumSorular()
    .filter(
      (q) =>
        q.subjectSlug === ders &&
        KONU_ETIKETLERI[anahtar(q.year, ders, q.no)] === konuId,
    )
    .sort((a, b) => (b.year !== a.year ? b.year - a.year : a.no - b.no));
}

/** Konu sayfasındaki düğmede gösterilen sayı. */
export function konuCikmisSoruSayisi(
  icerikDersSlug: string,
  konuId: string,
): number {
  return konuCikmisSorulari(icerikDersSlug, konuId).length;
}

/** Kaç tura bölünür (10'arlık turlar; son tur eksik olabilir). */
export function turSayisi(soruAdedi: number): number {
  return Math.ceil(soruAdedi / TUR_BOYU);
}

/** `tur` 1 tabanlıdır. Aralık dışında boş dizi döner. */
export function turSorulari(
  hepsi: KonuCikmisSoru[],
  tur: number,
): KonuCikmisSoru[] {
  if (tur < 1) return [];
  return hepsi.slice((tur - 1) * TUR_BOYU, tur * TUR_BOYU);
}

/**
 * Bir turun süresi. Gerçek LGS temposu: sözel bölümde soru başına 1.5 dk
 * (75 dk / 50 soru), sayısal bölümde 2 dk (80 dk / 40 soru). Konu testi
 * karışık yıllardan gelse de aynı dersin soruları olduğu için bölüm
 * sabittir; yine de listedeki ilk sorudan okuyoruz.
 */
export function turSuresiDk(sorular: KonuCikmisSoru[]): number {
  if (sorular.length === 0) return 0;
  const dkPerSoru = sorular[0].section === "sayisal" ? 2 : 1.5;
  return Math.max(1, Math.round(sorular.length * dkPerSoru));
}

/** Konuda hiç çıkmış soru olmayan dersler/konular için özet bilgi. */
export type KonuCikmisOzet = {
  toplam: number;
  turSayisi: number;
  /** Soruların geldiği yıllar, yeniden eskiye. */
  yillar: number[];
};

export function konuCikmisOzet(
  icerikDersSlug: string,
  konuId: string,
): KonuCikmisOzet {
  const sorular = konuCikmisSorulari(icerikDersSlug, konuId);
  const yillar = [...new Set(sorular.map((q) => q.year))].sort((a, b) => b - a);
  return { toplam: sorular.length, turSayisi: turSayisi(sorular.length), yillar };
}
