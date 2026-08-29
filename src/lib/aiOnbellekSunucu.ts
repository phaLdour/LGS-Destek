/**
 * Öğrenen önbelleğin sunucu tarafı (Supabase erişimi).
 *
 * Okuma herkese açıktır (misafir öğrenci de baykuşa soru sorabiliyor);
 * yazma yalnız giriş yapmış kullanıcı adına, SQL tarafında saatlik
 * sınırlı `ai_onbellek_yaz` fonksiyonuyla yapılır.
 *
 * Supabase yapılandırılmamışsa (yerel geliştirme) sessizce devre dışı
 * kalır — baykuş yine çalışır, sadece öğrenme kapalı olur.
 */

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type OnbellekKaydi = {
  cevap: string;
  navigate: string | null;
  topicRoute: string | null;
};

/** Parmak izine göre önbellekte ara; bulursa kullanım sayacı da artar. */
export async function onbellektenAra(
  parmakIzi: string,
): Promise<OnbellekKaydi | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("ai_onbellek_ara", {
      p_parmak_izi: parmakIzi,
    });
    if (error || !Array.isArray(data) || data.length === 0) return null;
    const satir = data[0] as {
      cevap: string;
      navigate: string | null;
      topic_route: string | null;
    };
    if (!satir?.cevap) return null;
    return {
      cevap: satir.cevap,
      navigate: satir.navigate ?? null,
      topicRoute: satir.topic_route ?? null,
    };
  } catch {
    return null; // önbellek asla cevabı engellemez
  }
}

/** AI cevabını önbelleğe yaz (başarısızlık sessizdir). */
export async function onbellegeYaz(
  parmakIzi: string,
  soruOrnek: string,
  kayit: OnbellekKaydi,
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("ai_onbellek_yaz", {
      p_parmak_izi: parmakIzi,
      p_soru_ornek: soruOrnek.slice(0, 500),
      p_cevap: kayit.cevap,
      p_navigate: kayit.navigate,
      p_topic_route: kayit.topicRoute,
    });
    return !error && data === true;
  } catch {
    return false;
  }
}
