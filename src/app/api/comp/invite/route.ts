import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { isValidSubjectFilter } from "@/lib/competitive/match-pool";

/**
 * POST /api/comp/invite
 *   body: { subjectFilter?: string | null }
 *   → 200 { code }            davet kodu üretildi (30 dk geçerli)
 *   → 401 unauthorized · 422 invalid_subject
 *
 * GET /api/comp/invite?code=XXXXXX
 *   → 200 { matchId: string | null, expiresAt: string }
 *     Davet eden sayfası, arkadaşının kabul edip etmediğini bununla yoklar.
 *   → 404 not_found (kod bu kullanıcıya ait değil)
 *
 * GET /api/comp/invite         (kod parametresiz)
 *   → 200 { code: string | null, expiresAt: string | null }
 *     Sayfa yenilenince açık daveti geri kurar. Bu olmadan kullanıcı
 *     kodunu kaybedip yenisini üretiyor, arkadaşının elindeki link
 *     sessizce ölüyordu.
 *
 * DELETE /api/comp/invite
 *   → 200 { ok: true }  açık daveti gerçekten iptal eder
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "supabase_not_configured" },
      { status: 503 },
    );
  }
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { subjectFilter?: string | null } = {};
  try {
    body = await request.json();
  } catch {
    // boş body kabul
  }
  const subjectFilter = body.subjectFilter ?? null;
  if (!isValidSubjectFilter(subjectFilter)) {
    return NextResponse.json({ error: "invalid_subject" }, { status: 422 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("comp_create_invite", {
    p_subject_filter: subjectFilter,
  });
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ code: data as string });
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "supabase_not_configured" },
      { status: 503 },
    );
  }
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const code = new URL(request.url).searchParams.get("code");
  const supabase = await createClient();

  if (!code) {
    const { data, error } = await supabase.rpc("comp_my_invite");
    if (error) {
      return NextResponse.json(
        { error: "rpc_failed", detail: error.message },
        { status: 500 },
      );
    }
    const mine = Array.isArray(data) ? data[0] : data;
    return NextResponse.json({
      code: mine?.out_code ?? null,
      expiresAt: mine?.out_expires_at ?? null,
    });
  }

  const { data, error } = await supabase.rpc("comp_invite_status", {
    p_code: code,
  });
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  const row = Array.isArray(data) ? data[0] : null;
  if (!row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({
    matchId: row.out_match_id ?? null,
    expiresAt: row.out_expires_at,
  });
}

export async function DELETE() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "supabase_not_configured" },
      { status: 503 },
    );
  }
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("comp_cancel_invite");
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
