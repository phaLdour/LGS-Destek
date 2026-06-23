import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import {
  isValidSubjectFilter,
  pickQuestionIds,
} from "@/lib/competitive/match-pool";

/**
 * POST /api/comp/queue/join
 *   body: { subjectFilter?: string | null }
 *   → 200 { status: "matched", matchId } | { status: "queued" }
 *   → 401 unauthorized
 *   → 422 invalid_subject | insufficient_pool
 *
 * Sezon + rütbe garantisi, aktif maç kontrolü, kuyruğa upsert ve ilk
 * match_make denemesi PL/pgSQL `comp_join_queue` içinde tek transaction.
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

  const questionIds = pickQuestionIds(subjectFilter);
  if (!questionIds) {
    return NextResponse.json(
      { error: "insufficient_pool" },
      { status: 422 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("comp_join_queue", {
    p_subject_filter: subjectFilter,
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
  return NextResponse.json({ status: "queued" });
}
