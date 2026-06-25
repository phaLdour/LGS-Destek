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
 * İki path:
 *   1. AKTİF MAÇ KONTROLÜ (Faz 2 hot-fix): Kullanıcı kuyrukta yoksa
 *      veya yeni maç oluşturulup kuyruktan çıkarıldıysa, comp_matches'te
 *      onun aktif maçı var mı diye bak. Varsa matched dön. Realtime
 *      publication etkin değilse bu polling fallback'i UI'ı sonsuza
 *      dek "rakip aranıyor"da bırakmaz.
 *   2. Kuyruktaysa RPC `comp_tick_queue` ile race-safe match_make tetikle.
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

  // ► Hot-fix path: aktif maç var mı? (Kullanıcı kuyruktan çıkarıldıysa
  // veya Realtime postgres_changes bildirimi gelmediyse polling burada
  // yakalar.) RLS katılımcıya izin veriyor.
  const { data: activeMatch } = await supabase
    .from("comp_matches")
    .select("id, deadline_at, status")
    .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`)
    .eq("status", "active")
    .gt("deadline_at", new Date().toISOString())
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (activeMatch?.id) {
    return NextResponse.json({
      status: "matched",
      matchId: activeMatch.id as string,
    });
  }

  // subject_filter'ı kuyruktan oku (kullanıcının ilk join'unda yazdı)
  const { data: queueRow } = await supabase
    .from("comp_queue")
    .select("subject_filter")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!queueRow) {
    // Kuyrukta değil + aktif maç da yok → gerçekten bekliyor
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
