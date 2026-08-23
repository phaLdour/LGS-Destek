import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MatchResult } from "@/components/competitive/MatchResult";
import { getMatchReplayQuestion } from "@/lib/competitive/match-questions";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export const metadata = { title: "Maç sonucu — Rekabet" };

export default async function SonucPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  if (!isSupabaseConfigured()) redirect("/rekabet");
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { matchId } = await params;
  const supabase = await createClient();

  const { data: match } = await supabase
    .from("comp_matches")
    .select("*")
    .eq("id", matchId)
    .maybeSingle();

  if (!match) redirect("/rekabet");

  // Henüz bitmemişse aktif maça yönlendir
  if (match.status !== "finished") {
    redirect(`/rekabet/${matchId}`);
  }

  // Cevapları çek (RLS finished'ta her iki tarafı verir)
  const { data: answersData } = await supabase
    .from("comp_match_answers")
    .select("player_id, q_index, choice, is_correct")
    .eq("match_id", matchId);

  const answers = answersData ?? [];
  const isP1 = match.player1_id === user.id;
  const myAnswers = answers
    .filter((a) => a.player_id === user.id)
    .map((a) => ({
      qIndex: a.q_index,
      choice: a.choice,
      isCorrect: a.is_correct,
    }));
  const oppAnswers = answers
    .filter((a) => a.player_id !== user.id)
    .map((a) => ({
      qIndex: a.q_index,
      choice: a.choice,
      isCorrect: a.is_correct,
    }));

  const questions = Array.from({ length: 10 }, (_, i) =>
    getMatchReplayQuestion(match.question_ids as string[], i),
  ).filter((q): q is NonNullable<typeof q> => q !== null);

  const me = {
    correct: isP1 ? (match.p1_correct ?? 0) : (match.p2_correct ?? 0),
    blank: isP1 ? (match.p1_blank ?? 0) : (match.p2_blank ?? 0),
    durationSeconds: isP1
      ? (match.p1_duration_s ?? 0)
      : (match.p2_duration_s ?? 0),
    score: Number(isP1 ? (match.p1_score ?? 0) : (match.p2_score ?? 0)),
    delta: isP1 ? (match.p1_delta ?? 0) : (match.p2_delta ?? 0),
    tierAtStart: isP1
      ? (match.p1_tier_at_start as number)
      : (match.p2_tier_at_start as number),
  };
  const opponent = {
    correct: isP1 ? (match.p2_correct ?? 0) : (match.p1_correct ?? 0),
    blank: isP1 ? (match.p2_blank ?? 0) : (match.p1_blank ?? 0),
    durationSeconds: isP1
      ? (match.p2_duration_s ?? 0)
      : (match.p1_duration_s ?? 0),
    score: Number(isP1 ? (match.p2_score ?? 0) : (match.p1_score ?? 0)),
    delta: isP1 ? (match.p2_delta ?? 0) : (match.p1_delta ?? 0),
    tierAtStart: isP1
      ? (match.p2_tier_at_start as number)
      : (match.p1_tier_at_start as number),
  };

  let outcome: "win" | "loss" | "draw" = "draw";
  if (match.winner_id === user.id) outcome = "win";
  else if (match.winner_id && match.winner_id !== user.id) outcome = "loss";

  // Forfeit bilgisi: sonuç ekranı özel mesajı için
  const isForfeit = !!match.forfeited_by;
  const iForfeited = match.forfeited_by === user.id;

  const shellUser = await getShellUser();

  return (
    <AppShell user={shellUser}>
      <div className="mx-auto max-w-3xl">
        <MatchResult
          matchOutcome={outcome}
          me={me}
          opponent={opponent}
          myAnswers={myAnswers}
          opponentAnswers={oppAnswers}
          questions={questions}
          isForfeit={isForfeit}
          iForfeited={iForfeited}
        />
      </div>
    </AppShell>
  );
}
