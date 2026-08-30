/**
 * Çıkmış sorulardan branş denemesi.
 *
 * Normal branş denemesi (bkz. mockExam.ts) 2.500+ soruluk alıştırma
 * havuzundan üretilir. Bu ise 2018-2026 arasındaki GERÇEK LGS sorularından
 * seçer: en gerçekçi ölçüm, ama havuz sabittir (Türkçe 180, Matematik 180,
 * Fen 180, diğerleri 90 soru), yani birkaç denemeden sonra sorular
 * tekrar etmeye başlar. İkisi bilerek ayrı seçenek olarak duruyor.
 *
 * Soru sayısı ve süre gerçek LGS ile aynı (mockExam.ts'teki BRANSLAR).
 */

import { dersinCikmisSorulari, type KonuCikmisSoru } from "@/lib/konuCikmisSorular";
import { BRANSLAR, bransSuresiDk, type BransTanim } from "@/lib/mockExam";

/** URL'de kullanılan kısa ders anahtarı → branş tanımı. */
export function cikmisBransBul(ders: string): BransTanim | null {
  return BRANSLAR.find((b) => b.kind === `brans-${ders}`) ?? null;
}

/** Çıkmış soru denemesi açılabilen dersler (havuzu yeterli olanlar). */
export function cikmisBransListesi(): {
  tanim: BransTanim;
  /** URL parçası: "turkce", "matematik", ... */
  yol: string;
  havuz: number;
  sureDk: number;
}[] {
  return BRANSLAR.map((tanim) => {
    const havuz = dersinCikmisSorulari(tanim.subject).length;
    return {
      tanim,
      yol: tanim.kind.replace(/^brans-/, ""),
      havuz,
      sureDk: bransSuresiDk(tanim),
    };
  }).filter((x) => x.havuz >= x.tanim.count);
}

/** Fisher-Yates — dizi kopyalanır, girdi bozulmaz. */
function karistir<T>(dizi: T[]): T[] {
  const out = [...dizi];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Denemenin sorularını seçer.
 *
 * Sorular RASTGELE seçilir ama sonra YENİDEN ESKİYE sıralanır: aynı sınavdan
 * gelen sorular yan yana dursun, öğrenci "2026'dan başlayıp geriye gidiyorum"
 * hissini kaybetmesin. Her açılışta farklı bir set gelir.
 */
export function cikmisBransSorulari(tanim: BransTanim): KonuCikmisSoru[] {
  const havuz = dersinCikmisSorulari(tanim.subject);
  if (havuz.length < tanim.count) return [];
  return karistir(havuz)
    .slice(0, tanim.count)
    .sort((a, b) => (b.year !== a.year ? b.year - a.year : a.no - b.no));
}
