/**
 * Baykuş olay yolu.
 *
 * Maskot AppShell içinde tek bir yerde duruyor; sayfalar ona prop
 * geçemez. Bu yüzden herhangi bir bileşen (test bitişi, rozet kazanma,
 * seri kırılması...) tek satırla baykuşa seslenebilsin diye küçük bir
 * window event köprüsü kullanıyoruz.
 *
 *   baykusaSoyle({ ruhHali: "mutlu", mesaj: "3 doğru üst üste! 🎉" });
 */
import type { BaykusRuhHali } from "@/components/brand/Owl";

export const BAYKUS_OLAYI = "rehberim:baykus";

export type BaykusMesaji = {
  ruhHali: BaykusRuhHali;
  /** Konuşma balonunda gösterilecek kısa metin (yoksa sadece ifade değişir). */
  mesaj?: string;
  /** Balonun ekranda kalma süresi (ms). Varsayılan 5000. */
  sure?: number;
};

export function baykusaSoyle(mesaj: BaykusMesaji): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<BaykusMesaji>(BAYKUS_OLAYI, { detail: mesaj }));
}

export function baykusuDinle(
  geriCagri: (mesaj: BaykusMesaji) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const el = (e: Event) => geriCagri((e as CustomEvent<BaykusMesaji>).detail);
  window.addEventListener(BAYKUS_OLAYI, el);
  return () => window.removeEventListener(BAYKUS_OLAYI, el);
}

/**
 * Sayfaya göre, öğrenciyi rahatsız etmeyecek tek cümlelik ipucu.
 * Her ipucu oturum başına en fazla bir kez gösterilir.
 */
export function sayfaIpucu(yol: string): { anahtar: string; metin: string } | null {
  if (yol === "/dashboard")
    return {
      anahtar: "dashboard",
      metin: "Bugünün planına bak — sana en çok orada yardımım dokunur.",
    };
  if (yol.startsWith("/hatalarim"))
    return {
      anahtar: "hatalarim",
      metin: "Yanlışlarını 2 kez üst üste doğru yaparsan listeden çıkarırım.",
    };
  if (yol.startsWith("/deneme"))
    return {
      anahtar: "deneme",
      metin: "Deneme sırasında süreyi bölme; bitince neti birlikte bakarız.",
    };
  if (yol.startsWith("/sozluk"))
    return {
      anahtar: "sozluk",
      metin: "Bilmediğin kelimeyi bana da sorabilirsin, örnek cümle kurarım.",
    };
  if (yol.startsWith("/rekabet"))
    return {
      anahtar: "rekabet",
      metin: "Düelloda süre baskısı var — hızdan çok doğruluk kazandırır.",
    };
  if (yol.startsWith("/ders/"))
    return {
      anahtar: "ders",
      metin: "Takıldığın yeri seçip bana sor, adım adım anlatayım.",
    };
  return null;
}

/**
 * Baykuşun oturuma bağlı önbellekleri (kişisel selam + sohbet geçmişi).
 * ÇIKIŞTA ve hesap değişiminde temizlenmek zorundadır: aynı tarayıcıda
 * başka bir hesapla girildiğinde önceki kullanıcının sohbeti veya adı
 * görünmemeli.
 */
export function baykusOnbellekleriniTemizle(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem("rehberim:greeting");
    sessionStorage.removeItem("rehberim:baykus-sohbet");
    sessionStorage.removeItem("rehberim:baykus-sahip");
  } catch {
    /* depolama yoksa temizlenecek şey de yok */
  }
}

/**
 * Önbelleklerin bu kullanıcıya ait olduğunu doğrular; başka bir hesabın
 * kalıntısıysa siler. Girişten sonraki ilk render'da çağrılır.
 */
export function baykusSahibiniDogrula(userId: string | null): boolean {
  if (typeof window === "undefined") return false;
  try {
    const sahip = sessionStorage.getItem("rehberim:baykus-sahip");
    const yeni = userId ?? "misafir";
    const temizlendi = sahip !== null && sahip !== yeni;
    if (temizlendi) baykusOnbellekleriniTemizle();
    sessionStorage.setItem("rehberim:baykus-sahip", yeni);
    return temizlendi;
  } catch {
    return false;
  }
}
