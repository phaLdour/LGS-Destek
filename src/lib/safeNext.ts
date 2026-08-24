/**
 * Giriş sonrası yönlendirme hedefini güvenli hale getirir.
 *
 * `?next=` değeri kullanıcıdan gelir. Doğrulanmazsa açık yönlendirme
 * (open redirect) olur: `?next=@kotu.example/giris` gibi bir değer
 * `https://site.com@kotu.example/giris` üretir — tarayıcı için host
 * artık kotu.example'dır, ama link gerçek alan adıyla başladığı için
 * kullanıcı güvenir. Hedef kitle 8. sınıf öğrencileri olduğu için bu,
 * yüksek başarı oranlı bir kimlik avı zemini demektir.
 *
 * Yalnızca aynı site içindeki mutlak yollara izin verilir.
 */
export function safeNext(value: string | null | undefined): string {
  const VARSAYILAN = "/dashboard";
  if (!value) return VARSAYILAN;
  // Tek "/" ile başlamalı; "//host" ve "/\host" protokolsüz dış adrestir.
  if (!value.startsWith("/")) return VARSAYILAN;
  if (value.startsWith("//") || value.startsWith("/\\")) return VARSAYILAN;
  // Kontrol karakterleri (satır sonu enjeksiyonu dahil) kabul edilmez.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(value)) return VARSAYILAN;
  return value;
}
