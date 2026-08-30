/**
 * Hız sınırı — sunucu tarafı yardımcı.
 *
 * NEDEN VAR: 16 API adresinin hiçbirinde sınır yoktu. Meraklı bir öğrenci
 * (ya da bir bot) baykuşa saniyede yüz soru sordurursa günlük Gemini
 * kotası bir öğleden önce biter ve site HERKES için sessizleşir.
 *
 * NEDEN VERİTABANINDA: Vercel isteği her seferinde başka bir sunucu
 * örneğine yollayabilir. Bellekteki bir sayaç örnekler arasında
 * paylaşılmaz; günlük tavan da hiç kurulamaz (örnek her uyandığında
 * sayaç sıfırlanır). Sayaç Supabase'te, tek doğruluk kaynağı orada.
 *
 * SIRALAMA ÖNEMLİ: sınır kontrolü, pahalı işten (Gemini çağrısı) ÖNCE
 * yapılır. Sonra yapmak sınırı anlamsız kılardı.
 */

import { createClient } from "@supabase/supabase-js";

export type SinirSonucu = {
  /** Bu istek geçsin mi? */
  izin: boolean;
  /** Bu istekten sonra pencerede kalan hak. */
  kalan: number;
  /** Pencerenin bitiş anı (istemciye "ne zaman tekrar dene" demek için). */
  sifirlanma: Date | null;
  /**
   * Sınır kontrolü yapılabildi mi? Supabase yapılandırılmamışsa ya da
   * sorgu düşerse `false` olur ve istek GEÇİRİLİR — sınır altyapısı
   * çöktü diye öğrenciyi siteden etmeyiz.
   */
  olculdu: boolean;
};

const GECER: SinirSonucu = {
  izin: true,
  kalan: 0,
  sifirlanma: null,
  olculdu: false,
};

function servisIstemcisi() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) return null;
  return createClient(url, anahtar, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Bir isteği sayar ve sınırın altında mı söyler.
 *
 * @param anahtar Neyi sınırlıyoruz — "chat:<userId>" gibi.
 * @param limit   Pencere içinde izin verilen istek sayısı.
 * @param pencereSn Pencere boyu saniye (60 = dakikalık, 86400 = günlük).
 */
export async function hizSiniriDene(
  anahtar: string,
  limit: number,
  pencereSn: number,
): Promise<SinirSonucu> {
  const supabase = servisIstemcisi();
  if (!supabase) return GECER;
  try {
    const { data, error } = await supabase.rpc("hiz_siniri_dene", {
      p_anahtar: anahtar,
      p_limit: limit,
      p_pencere_sn: pencereSn,
    });
    if (error || !Array.isArray(data) || data.length === 0) return GECER;
    const satir = data[0] as {
      izin: boolean;
      kalan: number;
      sifirlanma: string;
    };
    return {
      izin: satir.izin !== false,
      kalan: Number(satir.kalan) || 0,
      sifirlanma: satir.sifirlanma ? new Date(satir.sifirlanma) : null,
      olculdu: true,
    };
  } catch {
    // Sınır altyapısı çöktüyse istek geçer — bkz. `olculdu` açıklaması.
    return GECER;
  }
}

/**
 * Birden çok sınırı sırayla dener; ilk reddedende durur.
 *
 * Tipik kullanım iki katmanlıdır: dakikalık sınır ani seli keser, günlük
 * sınır kotayı korur. Reddeden sınır döner ki mesaj doğru olsun
 * ("bir dakika bekle" ile "bugünlük hakkın doldu" farklı şeyler).
 */
export async function hizSinirlariDene(
  sinirlar: { anahtar: string; limit: number; pencereSn: number; ad: string }[],
): Promise<{ sonuc: SinirSonucu; asilan: string | null }> {
  for (const s of sinirlar) {
    const sonuc = await hizSiniriDene(s.anahtar, s.limit, s.pencereSn);
    if (!sonuc.izin) return { sonuc, asilan: s.ad };
  }
  return { sonuc: GECER, asilan: null };
}

/**
 * İstek sahibinin kimliği. Giriş yapmışsa kullanıcı id'si, yapmamışsa
 * IP. IP başlıkları taklit edilebilir — bu yüzden IP sınırı yalnız
 * kaba bir emniyettir, asıl koruma giriş yapmış kullanıcıdadır.
 */
export function istekKimligi(request: Request, userId: string | null): string {
  if (userId) return `u:${userId}`;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "bilinmeyen";
  return `ip:${ip.slice(0, 45)}`;
}

/** 429 yanıtı — ne zaman tekrar denenebileceğini de söyler. */
export function cokHizliYaniti(
  sonuc: SinirSonucu,
  mesaj: string,
): Response {
  const saniye = sonuc.sifirlanma
    ? Math.max(1, Math.ceil((sonuc.sifirlanma.getTime() - Date.now()) / 1000))
    : 60;
  return new Response(JSON.stringify({ error: mesaj, tekrarSaniye: saniye }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(saniye),
    },
  });
}
