import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/supabase/server";
import { hizSiniriDene, istekKimligi } from "@/lib/hizSiniri";

export const runtime = "nodejs";

/**
 * POST /api/hata — tarayıcıda çıkan bir hatayı kaydeder.
 *
 * Kayıt SERVİS ROLÜYLE yazılır: `hata_kaydet` fonksiyonu istemciye kapalı,
 * çünkü açık olsaydı biri tabloyu çöple doldurabilirdi.
 *
 * Hız sınırı burada da var ve gereklidir: bir hata döngüsü saniyede
 * yüzlerce bildirim üretebilir. İstemci tarafında da tavan var (oturum
 * başına 5), ama ona güvenilmez — kod tarayıcıda, değiştirilebilir.
 *
 * Cevap HER ZAMAN 204'tür (sınır aşılsa bile): bildirim başarısız diye
 * istemcide yeni bir hata doğurmanın anlamı yok.
 */
export async function POST(request: Request) {
  const sessiz = new NextResponse(null, { status: 204 });

  let govde: {
    yol?: unknown;
    mesaj?: unknown;
    yigin?: unknown;
    tarayici?: unknown;
  };
  try {
    govde = await request.json();
  } catch {
    return sessiz;
  }

  const mesaj = typeof govde.mesaj === "string" ? govde.mesaj.trim() : "";
  if (!mesaj) return sessiz;

  const kullanici = await getCurrentUser().catch(() => null);
  const kimlik = istekKimligi(request, kullanici?.id ?? null);

  // Saatte 30 bildirim: gerçek bir hata için fazlasıyla yeterli, döngü
  // için değil.
  const sinir = await hizSiniriDene(`hata:${kimlik}`, 30, 3600);
  if (!sinir.izin) return sessiz;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) return sessiz;

  try {
    const supabase = createClient(url, anahtar, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    await supabase.rpc("hata_kaydet", {
      p_user_id: kullanici?.id ?? null,
      p_yol: typeof govde.yol === "string" ? govde.yol : "?",
      p_mesaj: mesaj,
      p_yigin: typeof govde.yigin === "string" ? govde.yigin : null,
      p_tarayici: typeof govde.tarayici === "string" ? govde.tarayici : null,
      // Hangi sürümde çıktığını bilmek, "düzelttik mi?" sorusunun cevabı.
      p_surum: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? "yerel",
    });
  } catch {
    /* kaydedemedik — istemciye yansıtmanın faydası yok */
  }

  return sessiz;
}
