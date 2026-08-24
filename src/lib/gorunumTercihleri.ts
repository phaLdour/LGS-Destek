/**
 * Sunucuya gitmeyen, cihaz başına görünüm tercihleri.
 * Tek yerde tutulur ki bir bileşen kapatıp diğeri açamasın.
 */
export const TERCIH_ANAHTARLARI = {
  geriSayimKapali: "rehberim:geri-sayim-kapali",
} as const;

export function tercihOku(anahtar: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(anahtar) === "1";
  } catch {
    return false;
  }
}

export function tercihYaz(anahtar: string, deger: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (deger) window.localStorage.setItem(anahtar, "1");
    else window.localStorage.removeItem(anahtar);
  } catch {
    /* gizli mod / depolama kapalı — sessizce yoksay */
  }
}
