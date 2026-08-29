/**
 * Öğrenen önbelleğin sunucu tarafı (Supabase erişimi).
 *
 * Okuma herkese açıktır (misafir öğrenci de baykuşa soru sorabiliyor);
 * yazma YALNIZ sunucudan, servis rolü (service role) anahtarıyla yapılır.
 *
 * GÜVENLİK DÜZELTMESİ: `ai_onbellek_yaz` eskiden `authenticated` rolüne
 * açıktı. Yani giriş yapmış herhangi bir öğrenci, tarayıcı konsolundan
 * `supabase.rpc("ai_onbellek_yaz", ...)` çağırıp UYDURMA bir cevabı
 * önbelleğe koyabiliyordu; o cevap site genelinde herkese "baykuşun
 * cevabı" olarak servis ediliyordu. Artık RPC anon/authenticated'dan
 * revoke edilmiştir (bkz. supabase/schema.sql → FAZ 13) ve buradan,
 * yalnız sunucuda bulunan SUPABASE_SERVICE_ROLE_KEY ile çağrılır.
 *
 * Supabase yapılandırılmamışsa (yerel geliştirme) sessizce devre dışı
 * kalır — baykuş yine çalışır, sadece öğrenme kapalı olur.
 */

import { createClient as createServisClient } from "@supabase/supabase-js";
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

/**
 * Yazma için servis rolü istemcisi. Bu anahtar YALNIZ sunucuda bulunur
 * (NEXT_PUBLIC_ öneki yoktur), tarayıcıya asla sızmaz. Yoksa öğrenme
 * kapalıdır — okuma etkilenmez.
 */
function servisIstemcisi() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) return null;
  return createServisClient(url, anahtar, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Yönlendirme alanları site İÇİ yol olmalı. Önbellekten dönen `navigate`
 * doğrudan istemcide yönlendirmeye kullanıldığı için, dış bağlantı
 * (açık yönlendirme / oltalama) yazılmasına izin verilmez.
 */
function guvenliYol(yol: string | null): string | null {
  if (!yol) return null;
  return /^\/[A-Za-z0-9\-._~/%?&=#]*$/.test(yol) && !yol.startsWith("//")
    ? yol
    : null;
}

/** AI cevabını önbelleğe yaz (başarısızlık sessizdir). */
export async function onbellegeYaz(
  parmakIzi: string,
  soruOrnek: string,
  kayit: OnbellekKaydi,
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  // Yazma artık kullanıcı oturumuyla değil, servis rolüyle yapılır.
  const supabase = servisIstemcisi();
  if (!supabase) return false;
  // Sunucu tarafında da doğrula: SQL'deki denetim son sözü söyler, bu
  // katman gereksiz gidiş-dönüşü engeller.
  if (!kayit.cevap || kayit.cevap.trim().length < 25) return false;
  try {
    const { data, error } = await supabase.rpc("ai_onbellek_yaz", {
      p_parmak_izi: parmakIzi,
      p_soru_ornek: soruOrnek.slice(0, 500),
      p_cevap: kayit.cevap,
      p_navigate: guvenliYol(kayit.navigate),
      p_topic_route: guvenliYol(kayit.topicRoute),
    });
    return !error && data === true;
  } catch {
    return false;
  }
}
