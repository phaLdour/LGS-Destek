import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/match/[id]/forfeit
 *   body: yok
 *   → 200 { ok: true }
 *   → 401 unauthorized | 403 forbidden | 404 not_found
 *
 * Çağıran kullanıcı maçı terk eder → hükmen mağlup (-30), rakip hükmen
 * galip (+30). PL/pgSQL `comp_forfeit_match` idempotent: maç zaten
 * bitmişse no-op.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.rpc("comp_forfeit_match", {
    p_match_id: id,
  });
  if (error) {
    const code = (error as { code?: string }).code;
    if (code === "02000") {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    if (code === "42501") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
