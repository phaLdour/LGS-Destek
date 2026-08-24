/**
 * LGS sınav tarihi ve geri sayım yardımcıları.
 *
 * MEB tarihi genellikle bir önceki yılın sonbaharında açıklar. Açıklanan
 * tarihler RESMI listede tutulur; henüz açıklanmamış yıllar için haziranın
 * ikinci pazarı tahmin edilir ve arayüzde "tahmini" olarak işaretlenir.
 * Böylece site hiçbir zaman uydurma bir tarihi kesinmiş gibi göstermez.
 *
 * Yeni tarih açıklandığında yapılacak tek şey: RESMI listesine bir satır.
 */

/** MEB tarafından açıklanmış sınav tarihleri (yıl → yerel tarih). */
const RESMI: Record<number, { ay: number; gun: number }> = {
  // ay: 0 = Ocak
  2024: { ay: 5, gun: 2 },  // 2 Haziran 2024
  2025: { ay: 5, gun: 15 }, // 15 Haziran 2025
  2026: { ay: 5, gun: 13 }, // 13 Haziran 2026 (MEB güncellemesi)
};

/** Sınav saati — oturum başlangıcı (yerel). */
const SINAV_SAATI = { saat: 9, dakika: 30 };

/** Haziranın ikinci pazarı — tarih açıklanmadıysa kullanılan tahmin. */
function haziraninIkinciPazari(yil: number): { ay: number; gun: number } {
  const ilk = new Date(yil, 5, 1);
  // 0 = Pazar
  const ilkPazar = 1 + ((7 - ilk.getDay()) % 7);
  return { ay: 5, gun: ilkPazar + 7 };
}

export type SinavBilgisi = {
  yil: number;
  tarih: Date;
  /** false → MEB henüz açıklamadı, gösterirken "tahmini" denmeli. */
  resmi: boolean;
  /** Sınava kalan tam gün (bugün sınav günüyse 0). */
  kalanGun: number;
  /** Sınav geçtiyse true (o zaman bir sonraki yıla geçilir). */
  gecti: boolean;
};

/**
 * Bugünden sonraki ilk LGS'yi döndürür.
 * @param simdi test edilebilirlik için enjekte edilebilir.
 */
export function siradakiSinav(simdi: Date = new Date()): SinavBilgisi {
  const yilAdayi = simdi.getFullYear();
  for (let yil = yilAdayi; yil <= yilAdayi + 2; yil++) {
    const resmi = RESMI[yil];
    const { ay, gun } = resmi ?? haziraninIkinciPazari(yil);
    const tarih = new Date(yil, ay, gun, SINAV_SAATI.saat, SINAV_SAATI.dakika);
    if (tarih.getTime() >= simdi.getTime()) {
      return {
        yil,
        tarih,
        resmi: Boolean(resmi),
        kalanGun: kalanGunHesapla(simdi, tarih),
        gecti: false,
      };
    }
  }
  // Buraya normalde hiç düşülmez.
  const tahmin = haziraninIkinciPazari(yilAdayi + 1);
  const tarih = new Date(yilAdayi + 1, tahmin.ay, tahmin.gun, SINAV_SAATI.saat, SINAV_SAATI.dakika);
  return {
    yil: yilAdayi + 1,
    tarih,
    resmi: false,
    kalanGun: kalanGunHesapla(simdi, tarih),
    gecti: false,
  };
}

/** İki tarih arasındaki tam gün farkı — saat dilimi kaymasına dayanıklı. */
function kalanGunHesapla(simdi: Date, hedef: Date): number {
  const a = new Date(simdi.getFullYear(), simdi.getMonth(), simdi.getDate());
  const b = new Date(hedef.getFullYear(), hedef.getMonth(), hedef.getDate());
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86_400_000));
}

const AYLAR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function tarihMetni(d: Date): string {
  return `${d.getDate()} ${AYLAR[d.getMonth()]} ${d.getFullYear()}`;
}
