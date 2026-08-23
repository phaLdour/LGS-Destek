import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * GET /api/comp/active-match
 *   → 200 { matchId: string | null }
 *   → 401 unauthorized
 *
 * Kullanıcının devam eden (active + süresi dolmamış) bir maçı var mı?
 * MatchmakingScreen mount'ta çağırır: varsa forfeit onayı sorar.
 */
export async function GET() {
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
  const { data } = await supabase
    .from("comp_matches")
    .select("id")
    .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
    .eq("status", "active")
    .gt("deadline_at", new Date().toISOString())
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ matchId: data?.id ?? null });
}
