import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { DEFAULT_GOAL } from "@/lib/tracking-core";

export const runtime = "nodejs";
/** Vercel Hobby'de fonksiyon süresi sınırlı; 250 e-postalık tur yeterli. */
export const maxDuration = 60;

/**
 * Günlük hatırlatma e-postası — Vercel Cron her akşam 19:30'da (TR) çağırır.
 *
 * Akış:
 *  1. Bildirimi açmış kullanıcılar bulunur (user_metadata.email_reminder).
 *  2. Her biri için BUGÜNKÜ (TR günü) çalışma dakikası hesaplanır.
 *  3. Günlük hedefini tamamlamamış olanlara Brevo üzerinden nazik bir
 *     hatırlatma gönderilir. Hedefini bitirenler rahatsız edilmez.
 *
 * Maliyet: Vercel Cron (Hobby planda günde 1 tetikleme) ve Brevo'nun
 * ücretsiz katmanı (300 e-posta/gün) — ikisi de sıfır TL.
 *
 * Gerekli ortam değişkenleri (Vercel > Settings > Environment Variables):
 *  - CRON_SECRET                 rastgele uzun bir dize; Vercel cron isteğine
 *                                kendiliğinden Authorization olarak ekler
 *  - SUPABASE_SERVICE_ROLE_KEY   kullanıcı listesi + RLS ötesi okuma için
 *  - BREVO_API_KEY               brevo.com > SMTP & API > API Keys
 *  - REMINDER_FROM_EMAIL         Brevo'da doğrulanmış gönderen adres
 *
 * Değişkenlerden biri yoksa rota hata fırlatmaz; ne eksikse söyleyip çıkar.
 */

const GUNLUK_LIMIT = 250; // Brevo ücretsiz katman 300/gün; pay bırakıyoruz

type Aday = {
  id: string;
  email: string;
  ad: string;
  hedefDk: number;
};

export async function GET(request: Request) {
  // ── Yetki: yalnız Vercel Cron (veya CRON_SECRET bilen) çağırabilir ──
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, sebep: "CRON_SECRET tanımlı değil" });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, sebep: "yetkisiz" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const brevoKey = process.env.BREVO_API_KEY;
  const gonderen = process.env.REMINDER_FROM_EMAIL;
  const eksikler = [
    !url && "NEXT_PUBLIC_SUPABASE_URL",
    !serviceKey && "SUPABASE_SERVICE_ROLE_KEY",
    !brevoKey && "BREVO_API_KEY",
    !gonderen && "REMINDER_FROM_EMAIL",
  ].filter(Boolean);
  if (eksikler.length > 0) {
    return NextResponse.json({ ok: false, sebep: `eksik env: ${eksikler.join(", ")}` });
  }

  const admin = createClient(url!, serviceKey!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // ── 1) Bildirimi açık kullanıcılar ─────────────────────────────────
  const adaylar: Aday[] = [];
  for (let sayfa = 1; sayfa <= 10; sayfa++) {
    const { data, error } = await admin.auth.admin.listUsers({
      page: sayfa,
      perPage: 1000,
    });
    if (error) {
      return NextResponse.json({ ok: false, sebep: `listUsers: ${error.message}` });
    }
    for (const u of data.users) {
      const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
      if (meta.email_reminder !== true || !u.email) continue;
      const hedef = Number(meta.daily_goal_minutes);
      adaylar.push({
        id: u.id,
        email: u.email,
        ad:
          (typeof meta.full_name === "string" && meta.full_name.split(" ")[0]) ||
          (typeof meta.name === "string" && meta.name.split(" ")[0]) ||
          u.email.split("@")[0],
        hedefDk: Number.isFinite(hedef) && hedef > 0 ? hedef : DEFAULT_GOAL,
      });
    }
    if (data.users.length < 1000) break;
  }
  if (adaylar.length === 0) {
    return NextResponse.json({ ok: true, aday: 0, gonderilen: 0 });
  }

  // ── 2) Bugünkü (Türkiye günü, UTC+3) çalışma dakikaları ────────────
  const simdi = new Date();
  const trSimdi = new Date(simdi.getTime() + 3 * 3600_000);
  const trGunBasi = new Date(Date.UTC(
    trSimdi.getUTCFullYear(), trSimdi.getUTCMonth(), trSimdi.getUTCDate(),
  ));
  // TR gece yarısı = UTC'de bir önceki gün 21:00
  const gunBasiUtc = new Date(trGunBasi.getTime() - 3 * 3600_000);

  const { data: oturumlar, error: oturumHata } = await admin
    .from("study_sessions")
    .select("user_id, duration_seconds")
    .gte("started_at", gunBasiUtc.toISOString())
    .in("user_id", adaylar.map((a) => a.id));
  if (oturumHata) {
    return NextResponse.json({ ok: false, sebep: `sessions: ${oturumHata.message}` });
  }

  const bugunDk = new Map<string, number>();
  for (const o of oturumlar ?? []) {
    bugunDk.set(o.user_id, (bugunDk.get(o.user_id) ?? 0) + o.duration_seconds / 60);
  }

  // ── 3) Hedefini tamamlamamışlara e-posta ───────────────────────────
  const alicilar = adaylar
    .filter((a) => (bugunDk.get(a.id) ?? 0) < a.hedefDk)
    .slice(0, GUNLUK_LIMIT);

  let gonderilen = 0;
  const hatalar: string[] = [];
  for (const a of alicilar) {
    const dk = Math.round(bugunDk.get(a.id) ?? 0);
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoKey!,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Rehber Baykuş", email: gonderen },
          to: [{ email: a.email, name: a.ad }],
          subject:
            dk > 0
              ? `${a.ad}, bugün ${dk} dakika çalıştın — az kaldı! 🦉`
              : `${a.ad}, baykuş seni bekliyor 🦉`,
          htmlContent: epostaHtml(a.ad, dk, a.hedefDk),
        }),
      });
      if (res.ok) {
        gonderilen++;
      } else {
        hatalar.push(`${a.email}: HTTP ${res.status}`);
      }
    } catch (e) {
      hatalar.push(`${a.email}: ${e instanceof Error ? e.message : "ağ hatası"}`);
    }
  }

  return NextResponse.json({
    ok: true,
    aday: adaylar.length,
    hedefiTamamlamayan: alicilar.length,
    gonderilen,
    ...(hatalar.length > 0 ? { hatalar: hatalar.slice(0, 5) } : {}),
  });
}

/** Marka renkleriyle, tek parça (inline stil) hatırlatma e-postası. */
function epostaHtml(ad: string, bugunDk: number, hedefDk: number): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://lgs-destek.vercel.app";
  const kalan = Math.max(0, hedefDk - bugunDk);
  const mesaj =
    bugunDk > 0
      ? `Bugün <strong>${bugunDk} dakika</strong> çalıştın — hedefin ${hedefDk} dakikaya sadece <strong>${kalan} dakika</strong> kaldı. Kısa bir hızlı soru turu bile yeter.`
      : `Bugün henüz çalışmaya başlamadın. <strong>${hedefDk} dakikalık</strong> hedefin seni bekliyor — birkaç hızlı soruyla başlamak en kolayı.`;
  return `<!doctype html>
<html lang="tr"><body style="margin:0;padding:0;background:#f4f6fb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e6f0">
        <tr><td style="background:#16244c;padding:20px 24px;text-align:center">
          <span style="font-size:34px;line-height:1">🦉</span>
          <p style="margin:8px 0 0;color:#ffffff;font-size:18px;font-weight:800">Rehberim</p>
        </td></tr>
        <tr><td style="padding:24px">
          <p style="margin:0 0 8px;color:#16244c;font-size:17px;font-weight:800">Merhaba ${ad}!</p>
          <p style="margin:0 0 16px;color:#3d4a6b;font-size:14px;line-height:1.6">${mesaj}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto"><tr><td style="border-radius:12px;background:#f59e0b">
            <a href="${site}/dashboard" style="display:inline-block;padding:12px 28px;color:#16244c;font-size:14px;font-weight:800;text-decoration:none">Çalışmaya dön</a>
          </td></tr></table>
          <p style="margin:20px 0 0;color:#9aa3bd;font-size:11px;line-height:1.5;text-align:center">
            Bu e-postayı, Rehberim'de günlük hatırlatmayı açtığın için aldın.<br>
            Kapatmak için: <a href="${site}/profile" style="color:#b45309">Profil &gt; Bildirim ayarları</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
