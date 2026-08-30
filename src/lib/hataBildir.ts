"use client";

/**
 * Tarayıcıda çıkan hataları sunucuya bildirir.
 *
 * NEDEN VAR: bir öğrencinin ekranında hata çıktığında haberimiz olmuyordu.
 * Çocuk siteyi bırakır, kimseye bir şey söylemez.
 *
 * NEDEN DIŞ SERVİS DEĞİL: ek hesap ve ek ücret istemiyor; kayıtlar
 * Rehberim'in kendi Supabase'inde kalıyor.
 *
 * ÜÇ EMNİYET — bir hata döngüsü siteyi de veritabanını da boğabilir:
 *   1. Aynı mesaj oturum başına bir kez gönderilir.
 *   2. Oturum başına en fazla 5 bildirim.
 *   3. Bildirimin kendisi hata verirse SESSİZCE yutulur (sonsuz döngü yok).
 */

const gonderilen = new Set<string>();
let toplam = 0;
const TAVAN = 5;

function kisalt(s: unknown, n: number): string {
  return typeof s === "string" ? s.slice(0, n) : "";
}

/** Hatayı sunucuya bildirir. Asla throw etmez, asla beklenmez. */
export function hataBildir(hata: unknown, ekBilgi?: string): void {
  if (typeof window === "undefined") return;
  if (toplam >= TAVAN) return;

  const mesaj =
    hata instanceof Error
      ? hata.message
      : typeof hata === "string"
        ? hata
        : "Bilinmeyen hata";
  if (!mesaj.trim()) return;

  // Aynı hatayı tekrar tekrar göndermenin bilgi değeri yok.
  const imza = `${mesaj}|${ekBilgi ?? ""}`;
  if (gonderilen.has(imza)) return;
  gonderilen.add(imza);
  toplam++;

  const govde = {
    yol: window.location.pathname + window.location.search,
    mesaj: ekBilgi ? `${mesaj} [${ekBilgi}]` : mesaj,
    yigin: hata instanceof Error ? kisalt(hata.stack, 4000) : "",
    tarayici: kisalt(navigator.userAgent, 300),
  };

  try {
    // keepalive: sayfa kapanırken bile gitsin.
    void fetch("/api/hata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(govde),
      keepalive: true,
    }).catch(() => {
      /* bildirim başarısızsa sessiz — hata içinde hata üretmeyiz */
    });
  } catch {
    /* fetch bile yoksa yapacak bir şey yok */
  }
}

let baglandi = false;

/**
 * Yakalanmamış hataları ve reddedilen sözleri (promise) dinler.
 * AppShell'de bir kez çağrılır.
 */
export function hataDinleyicileriniBagla(): void {
  if (typeof window === "undefined" || baglandi) return;
  baglandi = true;

  window.addEventListener("error", (e) => {
    // Kaynak yükleme hataları (resim/script) buraya da düşer; onların
    // `error` nesnesi yoktur ve gürültü yaparlar.
    if (!e.error) return;
    hataBildir(e.error, "yakalanmamis");
  });

  window.addEventListener("unhandledrejection", (e) => {
    hataBildir(e.reason, "soz-reddi");
  });
}
