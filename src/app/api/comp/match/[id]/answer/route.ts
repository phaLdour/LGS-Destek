import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import {
  getCorrectIndex,
  getMatchQuestion,
} from "@/lib/competitive/match-questions";

/**
 * POST /api/comp/match/[id]/answer
 *   body: { qIndex: number, choice: number | null }
 *   → 200 { ok, isCorrect: null, nextQuestion?, autoFinalized? }
 *   → 401 unauthorized
 *   → 404 not_found
 *   → 409 match_finished | expired | out_of_order
 *   → 422 invalid_payload
 *
 * KRİTİK ANTI-CHEAT:
 *   - `isCorrect` her zaman `null` döner (sessiz cevap akışı).
 *   - `correctIndex` server'da `getCorrectIndex` ile alınır ve `comp_record_answer`
 *     parametresine geçirilir; client'a asla yansımaz.
 *   - q sırası `select max(q_index)` ile zorlanır; out_of_order 409.
 *   - Süre dolmuşsa otomatik finalize tetiklenir.
 *
 * Sıradaki soru aynı response'ta batch döner (ek round-trip yok).
 */
export async function POST(
  request: Request,
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
  let body: { qIndex?: unknown; choice?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 422 });
  }
  const qIndex = typeof body.qIndex === "number" ? body.qIndex : NaN;
  const choice =
    body.choice === null
      ? null
      : typeof body.choice === "number"
        ? body.choice
        : NaN;
  if (
    !Number.isFinite(qIndex) ||
    qIndex < 0 ||
    qIndex > 9 ||
    (choice !== null && (!Number.isFinite(choice) || choice < 0 || choice > 3))
  ) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 422 });
  }

  const supabase = await createClient();

  // Maç ve question_ids'i çek (RLS katılımcı olmayanı engeller)
  const { data: match } = await supabase
    .from("comp_matches")
    .select("id, question_ids, status, deadline_at, player1_id, player2_id")
    .eq("id", id)
    .maybeSingle();
  if (!match) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (match.status !== "active") {
    return NextResponse.json({ error: "match_finished" }, { status: 409 });
  }
  if (new Date(match.deadline_at).getTime() < Date.now()) {
    // Auto-finalize tetikle
    await supabase.rpc("comp_finalize_match", { p_match_id: id });
    return NextResponse.json({ error: "expired" }, { status: 409 });
  }

  // Sıra kontrolü: bir önceki q kaydedilmiş olmalı
  const { data: lastRow } = await supabase
    .from("comp_match_answers")
    .select("q_index")
    .eq("match_id", id)
    .eq("player_id", user.id)
    .order("q_index", { ascending: false })
    .limit(1)
    .maybeSingle();
  const expected = (lastRow?.q_index ?? -1) + 1;
  if (qIndex !== expected) {
    return NextResponse.json({ error: "out_of_order" }, { status: 409 });
  }

  // Sunucu correctIndex'i belirler (anti-cheat)
  const correctIndex = getCorrectIndex(match.question_ids, qIndex);
  if (correctIndex < 0) {
    return NextResponse.json({ error: "question_unavailable" }, { status: 500 });
  }

  const { error: rpcError } = await supabase.rpc("comp_record_answer", {
    p_match_id: id,
    p_q_index: qIndex,
    p_choice: choice,
    p_correct_index: correctIndex,
  });
  if (rpcError) {
    // Function-içi raise → kodlu döner; mapping
    const code = (rpcError as { code?: string }).code;
    if (code === "42501") {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    if (code === "P0001") {
      return NextResponse.json({ error: "match_finished" }, { status: 409 });
    }
    if (code === "P0002") {
      return NextResponse.json({ error: "expired" }, { status: 409 });
    }
    return NextResponse.json(
      { error: "rpc_failed", detail: rpcError.message },
      { status: 500 },
    );
  }

  // Sıradaki soruyu hazırla (batch)
  let nextQuestion = null;
  if (qIndex + 1 < match.question_ids.length) {
    nextQuestion = getMatchQuestion(match.question_ids, qIndex + 1);
  }

  // Her iki taraf da 10 cevap verdi mi? Auto-finalize.
  // Rakibin sayısını SECURITY DEFINER RPC ile al (aktif maç RLS'i count'u 0 yapar).
  let autoFinalized = false;
  if (qIndex + 1 >= match.question_ids.length) {
    const { data: oppCount } = await supabase.rpc("comp_opponent_progress", {
      p_match_id: id,
    });
    if (typeof oppCount === "number" && oppCount >= match.question_ids.length) {
      await supabase.rpc("comp_finalize_match", { p_match_id: id });
      autoFinalized = true;
    }
  }

  return NextResponse.json({
    ok: true,
    // SESSİZ FEEDBACK: client'a doğru/yanlış sızdırılmaz
    isCorrect: null,
    nextQuestion,
    autoFinalized,
  });
}
