/**
 * Konu tekrar planı — aralıklı tekrar (spaced repetition).
 *
 * NEDEN VAR: sitede yanlış SORULAR için aralıklı tekrar zaten vardı
 * (bkz. lib/wrongAnswers.ts), ama KONULAR için yoktu. Öğrenci bir konuyu
 * "bitirdi" işaretliyor ve o konu bir daha karşısına hiç çıkmıyordu.
 * Ekimde çalışılan Paragrafta Anlam, hazirandaki sınava kadar bir kez
 * bile tekrar edilmiyor — unutma eğrisi tam da burada devreye giriyor.
 *
 * NASIL ÇALIŞIR: her tekrar, bir sonrakinin ne zaman olacağını belirler.
 * İyi hatırlanan konu daha uzağa itilir, unutulan konu yakına çekilir.
 * Aralıklar SM-2'nin sadeleştirilmiş hâli — 8. sınıf öğrencisi için
 * "kolay/orta/zor" düğmesi sormaya gerek yok, TEST SONUCU zaten cevabı
 * veriyor.
 *
 * BU DOSYA SAF: tarih ve puan girer, plan çıkar. Veritabanı, React,
 * tarayıcı yok — bu yüzden aralık matematiği doğrudan test edilebiliyor.
 */

import { siradakiSinav } from "@/lib/sinavTarihi";

export const GUN_MS = 24 * 60 * 60 * 1000;

/**
 * Basamaklar (gün). Öğrenci her başarılı tekrarda bir üst basamağa çıkar.
 *
 * 1 → 3 → 7 → 16 → 35 → 70
 *
 * Neden bu sayılar: ilk günler unutma en hızlı olduğu için sık; sonra
 * seyrekleşiyor. Son basamak 70 gün, çünkü LGS hazırlığı ~9 ay sürüyor;
 * daha uzun bir aralık "bir daha hiç" demekle aynı kapıya çıkardı.
 */
export const BASAMAKLAR = [1, 3, 7, 16, 35, 70] as const;

/** Test sonucuna göre öğrencinin konuyu ne kadar hatırladığı. */
export type Hatirlama = "iyi" | "orta" | "zayif";

/**
 * Yüzdeyi üç kovaya ayırır.
 * 80+ iyi, 50–79 orta, 50 altı zayıf. LGS'de 80 civarı "bu konuyu
 * biliyorum" sayılabilecek eşik; 50 altı ise konuyu yeniden çalışmak
 * gerektiğinin işareti.
 */
export function hatirlamaDuzeyi(dogru: number, toplam: number): Hatirlama {
  if (toplam <= 0) return "orta";
  const yuzde = (dogru / toplam) * 100;
  if (yuzde >= 80) return "iyi";
  if (yuzde >= 50) return "orta";
  return "zayif";
}

/**
 * Yeni basamağı hesaplar.
 *  - iyi   → bir üst basamak
 *  - orta  → aynı basamakta kal (aralık artmaz ama azalmaz da)
 *  - zayıf → başa dön (yarın tekrar)
 *
 * "Orta"da geri almamak bilinçli: öğrenci %60 aldı diye cezalandırılıp
 * her gün aynı konuyu görürse plan bunaltıcı olur ve bırakır.
 */
export function sonrakiBasamak(basamak: number, h: Hatirlama): number {
  if (h === "zayif") return 0;
  if (h === "orta") return Math.min(basamak, BASAMAKLAR.length - 1);
  return Math.min(basamak + 1, BASAMAKLAR.length - 1);
}

/** Bir basamağın gün cinsinden aralığı. */
export function basamakAraligi(basamak: number): number {
  const i = Math.max(0, Math.min(basamak, BASAMAKLAR.length - 1));
  return BASAMAKLAR[i];
}

export type TekrarPlani = {
  /** Kaçıncı basamakta (0 tabanlı). */
  basamak: number;
  /** Bir sonraki tekrarın zamanı (epoch ms). */
  vade: number;
  /**
   * Sınav tarihi yüzünden kısaltıldı mı? Öğrenciye "sınavdan sonrası
   * için tekrar planlamıyoruz" demek yerine, planı sınavın içine
   * sığdırıyoruz.
   */
  sinavaSigdirildi: boolean;
};

/**
 * Bir tekrar sonrası yeni planı üretir.
 *
 * SINAV SINIRI: vade LGS'den sonraya düşerse öğrenciye faydası yok.
 * Böyle bir durumda vade, kalan süreyi ikiye bölen bir noktaya çekilir —
 * "hiç tekrar etme" ile "sınavdan sonra tekrar et" arasındaki tek makul
 * seçenek bu. Sınava 2 günden az kaldıysa artık plan yapılmaz.
 */
export function planla(
  basamak: number,
  h: Hatirlama,
  simdi: Date = new Date(),
): TekrarPlani {
  const yeni = sonrakiBasamak(basamak, h);
  const gun = basamakAraligi(yeni);
  let vade = simdi.getTime() + gun * GUN_MS;

  const sinav = siradakiSinav(simdi).tarih.getTime();
  let sigdirildi = false;
  if (vade > sinav) {
    const kalanMs = sinav - simdi.getTime();
    if (kalanMs > 2 * GUN_MS) {
      vade = simdi.getTime() + Math.floor(kalanMs / 2);
      sigdirildi = true;
    } else {
      // Sınav kapıda: yarın tekrar et, gerisi zaten yok.
      vade = simdi.getTime() + GUN_MS;
      sigdirildi = true;
    }
  }

  return { basamak: yeni, vade, sinavaSigdirildi: sigdirildi };
}

/** İlk kez çalışılan konu için plan (test yapılmadıysa da geçerli). */
export function ilkPlan(simdi: Date = new Date()): TekrarPlani {
  return planla(-1, "iyi", simdi); // -1 + 1 = 0. basamak → 1 gün
}

export type TekrarKaydi = {
  dersSlug: string;
  konuId: string;
  basamak: number;
  vade: number;
  sonTekrar: number;
};

/** Vadesi gelmiş kayıtlar, en gecikmiş olan başta. */
export function vadesiGelenler(
  kayitlar: TekrarKaydi[],
  simdi: Date = new Date(),
): TekrarKaydi[] {
  const t = simdi.getTime();
  return kayitlar
    .filter((k) => k.vade <= t)
    .sort((a, b) => a.vade - b.vade);
}

/**
 * Öğrenciye gösterilecek gecikme metni.
 * "3 gün gecikti" bilgisi, listedeki sırayı anlamlı kılıyor.
 */
export function gecikmeMetni(vade: number, simdi: Date = new Date()): string {
  const fark = simdi.getTime() - vade;
  if (fark < 0) return "";
  const gun = Math.floor(fark / GUN_MS);
  if (gun <= 0) return "bugün";
  if (gun === 1) return "1 gün gecikti";
  return `${gun} gün gecikti`;
}
