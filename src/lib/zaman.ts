/**
 * Türkiye saati yardımcıları.
 *
 * Sorunun kökü: gün hesapları `new Date()`'in YEREL gününü kullanıyordu.
 * Tarayıcıda bu Türkiye günüdür ama Vercel sunucuları UTC çalışır — yani
 * sunucuda "bugün", Türkiye'den 3 saat geriden başlıyordu. Gece 00:00-03:00
 * arasında çalışan öğrencinin serisi yanlış kırılabiliyor, "bugünkü dakika"
 * sunucu ve tarayıcıda farklı çıkabiliyordu. Akşam hatırlatması ise zaten
 * TR gününe göre hesap yapıyordu; iki taraf çelişiyordu.
 *
 * Çözüm: gün sınırıyla ilgili HER hesap bu dosyadan geçer ve nerede
 * çalıştığından bağımsız olarak Türkiye (UTC+3, tüm yıl sabit) gününü
 * kullanır. Türkiye 2016'dan beri yaz saati uygulamadığı için +3 sabittir.
 */

const TR_OFSET_MS = 3 * 60 * 60 * 1000;

/** Verilen anın Türkiye'deki takvim günü — "2026-8-27" gibi kararlı anahtar. */
export function trGunAnahtari(d: Date): string {
  const tr = new Date(d.getTime() + TR_OFSET_MS);
  return `${tr.getUTCFullYear()}-${tr.getUTCMonth()}-${tr.getUTCDate()}`;
}

/** Verilen anın Türkiye günü içindeki haftanın günü (0 = Pazar). */
export function trHaftaninGunu(d: Date): number {
  return new Date(d.getTime() + TR_OFSET_MS).getUTCDay();
}

/** Türkiye'de bugünün başlangıcı (TR gece yarısı) — UTC Date olarak. */
export function trBugunBaslangici(simdi: Date = new Date()): Date {
  const tr = new Date(simdi.getTime() + TR_OFSET_MS);
  const trGunBasi = Date.UTC(tr.getUTCFullYear(), tr.getUTCMonth(), tr.getUTCDate());
  return new Date(trGunBasi - TR_OFSET_MS);
}

/** Verilen andan `gun` gün öncesinin TR gün anahtarı ve haftanın günü. */
export function trGunGeri(simdi: Date, gun: number): Date {
  return new Date(simdi.getTime() - gun * 24 * 60 * 60 * 1000);
}
