/**
 * Rekabetçi mod — sezon yardımcıları.
 *
 * Sezon kimliği `YYYYMM` int formatında. Her ayın 1'inde yeni sezon
 * başlar; geçişler lazy yapılır (cron yok). Sezon satırı yoksa ilk
 * istekte oluşturulur.
 *
 * Türkiye saatine (UTC+3) göre ayın başlangıcı hesaplanır — kullanıcı
 * deneyimi yerel saat dilimine sadık kalsın diye.
 */

/** Türkiye saat dilimi UTC ofset (saat). Yaz saati uygulanmadığı için sabit. */
const TR_UTC_OFFSET_HOURS = 3;

export type Season = {
  id: number; // 202607
  startsAt: Date;
  endsAt: Date;
  label: string;
};

/**
 * Verilen tarih için "yürürlükteki" sezonu döner.
 * Tarih verilmezse `new Date()` kullanılır.
 */
export function seasonForDate(d: Date = new Date()): Season {
  const tr = trDate(d);
  const year = tr.getUTCFullYear();
  const month = tr.getUTCMonth() + 1; // 1-12
  const id = year * 100 + month;

  // Sezon başlangıcı: o ayın 1'i 00:00 TR
  const startsTr = Date.UTC(year, month - 1, 1, 0, 0, 0);
  const startsAt = new Date(startsTr - TR_UTC_OFFSET_HOURS * 3600 * 1000);

  // Sezon bitişi: bir sonraki ayın 1'i 00:00 TR
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const endsTr = Date.UTC(nextYear, nextMonth - 1, 1, 0, 0, 0);
  const endsAt = new Date(endsTr - TR_UTC_OFFSET_HOURS * 3600 * 1000);

  return {
    id,
    startsAt,
    endsAt,
    label: `${turkishMonthName(month)} ${year}`,
  };
}

/** Sezon bitimine kalan milisaniye (UI sayacı için). */
export function timeUntilSeasonEnd(d: Date = new Date()): number {
  return seasonForDate(d).endsAt.getTime() - d.getTime();
}

/**
 * Sezon geri sayımı için insan-okur ifade.
 * Örn: "3 gün 4 saat", "5 saat 12 dk", "8 dk".
 */
export function formatTimeUntilSeasonEnd(d: Date = new Date()): string {
  const ms = Math.max(0, timeUntilSeasonEnd(d));
  const totalMin = Math.floor(ms / 60000);
  const days = Math.floor(totalMin / (24 * 60));
  const hours = Math.floor((totalMin % (24 * 60)) / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days} gün ${hours} sa`;
  if (hours > 0) return `${hours} sa ${mins} dk`;
  return `${mins} dk`;
}

/** TR yerel saatine kaydırılmış Date (Date.UTC ile kullanılmak üzere). */
function trDate(d: Date): Date {
  return new Date(d.getTime() + TR_UTC_OFFSET_HOURS * 3600 * 1000);
}

function turkishMonthName(month: number): string {
  const names = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return names[month - 1] ?? `${month}.ay`;
}
