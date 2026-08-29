import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * HAFTALIK ÖNBELLEK BAKIMI — Vercel Cron her pazartesi 04:10'da (TR) çağırır.
 *
 * Ne yapar: Baykuşun AI'dan öğrendiği önbellek kayıtlarından, en az
 * kullanılan %25'lik dilimi pasife alır (kural: kullanıcıların gerçekten
 * sorduğu sorular kalır, bir kez sorulup bir daha sorulmayanlar elenir).
 * 60 gündür pasif duran kayıtlar tamamen silinir.
 *
 * Neden: önbellek sonsuza kadar büyürse hem tablo şişer hem de bayat
 * cevaplar birikir. Bu bakım, sistemin kendi kendini toparlamasını sağlar.
 *
 * Elle yazılmış kayıtlara (kaynak='elle') asla dokunulmaz.
 *
 * Gerekli ortam değişkenleri: CRON_SECRET, SUPABASE_SERVICE_ROLE_KEY
 * (ikisi de günlük hatırlatma cron'u için zaten ekleniyor).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, sebep: "CRON_SECRET tanımlı değil" });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, sebep: "yetkisiz" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const servis = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !servis) {
    return NextResponse.json({
      ok: false,
      sebep: "SUPABASE_SERVICE_ROLE_KEY veya URL eksik",
    });
  }

  const supabase = createClient(url, servis, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.rpc("ai_onbellek_bakim");
  if (error) {
    console.error("Önbellek bakımı hatası:", error);
    return NextResponse.json({ ok: false, sebep: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sonuc: data });
}
