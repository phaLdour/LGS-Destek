import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { pickQuestionIds } from "@/lib/competitive/match-pool";

/**
 * POST /api/comp/queue/tick
 *   body: yok
 *   → 200 { status: "matched", matchId } | { status: "waiting" }
 *   → 401 unauthorized
 *
 * Race-safe: client 3 sn'de bir poll edebilir, RPC SKIP LOCKED ile
 * çoklu çağrı zarar vermez. Kuyrukta olmayan kullanıcıya null döner.
 */
export async function POST() {
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

  // subject_filter'ı kuyruktan oku (kullanıcının ilk join'unda yazdı)
  const { data: queueRow } = await supabase
    .from("comp_queue")
    .select("subject_filter")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!queueRow) {
    // Kuyrukta değilse tick gereksiz
    return NextResponse.json({ status: "waiting" });
  }

  const questionIds = pickQuestionIds(queueRow.subject_filter ?? null);
  if (!questionIds) {
    // Beklenmeyen — kuyruğa girerken kontrol edildi
    return NextResponse.json({ status: "waiting" });
  }

  const { data, error } = await supabase.rpc("comp_tick_queue", {
    p_question_ids: questionIds,
  });
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  if (data) {
    return NextResponse.json({ status: "matched", matchId: data as string });
  }
  return NextResponse.json({ status: "waiting" });
}
