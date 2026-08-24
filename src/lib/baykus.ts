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
