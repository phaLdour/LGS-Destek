import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/match/[id]/finalize
 *   body: yok
 *   → 200 { ok: true, status: "finished" }
 *   → 401 unauthorized
 *
 * Idempotent: PL/pgSQL `comp_finalize_match` status='finished' ise
 * sessiz return eder. Client timer 0'a düştüğünde tetikler;
 * answer route'u da gerektiğinde aynı RPC'yi çağırır.
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
  const { error } = await supabase.rpc("comp_finalize_guvenli", {
    p_match_id: id,
  });
  if (error) {
    const code = (error as { code?: string }).code;
    if (code === "02000") {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, status: "finished" });
}
