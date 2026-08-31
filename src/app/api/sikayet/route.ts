import { NextResponse } from "next/server";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { hizSiniriDene, istekKimligi } from "@/lib/hizSiniri";

export const runtime = "nodejs";

/**
 * POST /api/sikayet — uygunsuz bir takma adı bildirir.
 *
 * NEDEN RPC'YE DOĞRUDAN DEĞİL DE BURADAN: `sikayet_et` öğrenciye açık
 * olmak zorunda (bildiren o). Doğrudan çağrılabilseydi bir öğrenci
 * konsoldan saniyede yüzlerce bildirim atabilirdi. Hız sınırı yalnız
 * sunucuda kurulabilir; bu rota o yüzden var.
 *
 * Sebep listesi SABİT: serbest metin, çocukların birbirine yazacağı
 * yeni bir alan açardı — moderasyon için açtığımız kapı, moderasyon
 * sorunu doğurmamalı.
 */
const SEBEPLER = new Set([
  "kufur",
  "hakaret",
  "uygunsuz",
  "kisisel-bilgi",
  "diger",
]);

export async function POST(request: Request) {
  const kullanici = await getCurrentUser().catch(() => null);
  if (!kullanici) {
    return NextResponse.json({ error: "Giriş yapmalısın." }, { status: 401 });
  }

  // Günde 20 bildirim: gerçek bir öğrenci için fazlasıyla yeterli,
  // toplu şikayet kampanyası için değil.
  const kimlik = istekKimligi(request, kullanici.id);
  const sinir = await hizSiniriDene(`sikayet:${kimlik}`, 20, 86400);
  if (!sinir.izin) {
    return NextResponse.json(
      { error: "Bugünlük bildirim hakkın doldu." },
      { status: 429 },
    );
  }

  let govde: { hedef?: unknown; sebep?: unknown };
  try {
    govde = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const hedef = typeof govde.hedef === "string" ? govde.hedef : "";
  const sebep =
    typeof govde.sebep === "string" && SEBEPLER.has(govde.sebep)
      ? govde.sebep
      : "diger";

  if (!hedef || hedef === kullanici.id) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("sikayet_et", {
      p_hedef: hedef,
      p_sebep: sebep,
    });
    if (error) {
      return NextResponse.json(
        { error: "Bildirim kaydedilemedi." },
        { status: 400 },
      );
    }
    const satir = Array.isArray(data) ? data[0] : null;
    // Kaç kişinin bildirdiğini ÖĞRENCİYE SÖYLEMİYORUZ: sayıyı bilmek,
    // eşiği doldurmak için arkadaş toplamayı oyunlaştırırdı.
    return NextResponse.json({ tamam: true, gizlendi: Boolean(satir?.gizlendi) });
  } catch {
    return NextResponse.json(
      { error: "Bildirim kaydedilemedi." },
      { status: 500 },
    );
  }
}
