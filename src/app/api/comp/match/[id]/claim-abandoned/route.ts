import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/match/[id]/claim-abandoned
 *   → 200 { claimed: true }  — rakip kopmuş sayıldı, hükmen kazandın
 *   → 200 { claimed: false } — rakip hâlâ bağlı ya da koşullar oluşmadı
 *   → 401 unauthorized | 403 forbidden | 404 not_found
 *
 * Otomatik değil, oyuncu tetikler: rakip 90 sn'dir sessizse ve maç en az
 * 60 sn sürmüşse kalan oyuncu hükmen galibiyeti talep edebilir. Karar
 * kullanıcıda olduğu için kötü internet sessiz bir maç çalmaz.
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
  const { data, error } = await supabase.rpc("comp_claim_abandoned", {
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
  return NextResponse.json({ claimed: data === true });
}
