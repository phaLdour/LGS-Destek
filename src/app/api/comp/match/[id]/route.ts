import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { getMatchQuestion } from "@/lib/competitive/match-questions";

/**
 * GET /api/comp/match/[id]?q=<index>
 *   → 200 { match, question?, myAnsweredCount, opponentAnsweredCount }
 *   → 401 unauthorized
 *   → 404 not_found (RLS: katılımcı değilse)
 *   → 422 invalid_index
 *
 * `question` cevabı içermez (MatchQuestionView tipi tip seviyesinde
 * correctIndex'i dışlar). Maç sırasında client buradan soru çeker.
 */
export async function GET(
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
  const url = new URL(request.url);
  const qParam = url.searchParams.get("q");

  const supabase = await createClient();
  const { data: match } = await supabase
    .from("comp_matches")
    .select(
      "id, season_id, player1_id, player2_id, p1_tier_at_start, p2_tier_at_start, question_ids, subject_filter, is_friendly, started_at, deadline_at, status",
    )
    .eq("id", id)
    .maybeSingle();
  if (!match) {
    // RLS başarısız veya yok
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Cevap sayaçları
  const [{ count: myCount }, { count: oppCount }] = await Promise.all([
    supabase
      .from("comp_match_answers")
      .select("q_index", { count: "exact", head: true })
      .eq("match_id", id)
      .eq("player_id", user.id),
    supabase
      .from("comp_match_answers")
      .select("q_index", { count: "exact", head: true })
      .eq("match_id", id)
      .neq("player_id", user.id),
  ]);

  let question = null;
  if (qParam !== null) {
    const qIndex = Number(qParam);
    if (
      !Number.isFinite(qIndex) ||
      qIndex < 0 ||
      qIndex >= match.question_ids.length
    ) {
      return NextResponse.json({ error: "invalid_index" }, { status: 422 });
    }
    question = getMatchQuestion(match.question_ids, qIndex);
    if (!question) {
      return NextResponse.json(
        { error: "question_unavailable" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    match: {
      id: match.id,
      seasonId: match.season_id,
      player1Id: match.player1_id,
      player2Id: match.player2_id,
      p1TierAtStart: match.p1_tier_at_start,
      p2TierAtStart: match.p2_tier_at_start,
      questionCount: match.question_ids.length,
      subjectFilter: match.subject_filter,
      isFriendly: match.is_friendly,
      startedAt: match.started_at,
      deadlineAt: match.deadline_at,
      status: match.status,
    },
    question,
    myAnsweredCount: myCount ?? 0,
    opponentAnsweredCount: oppCount ?? 0,
  });
}
