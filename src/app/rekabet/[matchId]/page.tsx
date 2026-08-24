import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MatchClient } from "@/components/competitive/MatchClient";
import { getMatchQuestion } from "@/lib/competitive/match-questions";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { DEFAULT_NEW_USER_TIER } from "@/lib/competitive/ranks";
import { isUuid } from "@/lib/competitive/rewards";
import { getPublicProfile } from "@/lib/competitive/server";
import { getShellUser } from "@/lib/user";

export const metadata = { title: "Maç — Rekabet" };

export default async function MatchPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  if (!isSupabaseConfigured()) redirect("/rekabet");
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { matchId } = await params;
  // UUID olmayan yollar (ör. yanlış link) DB'ye gitmeden lobiye dönsün
  if (!isUuid(matchId)) redirect("/rekabet");
  const supabase = await createClient();

  const { data: match } = await supabase
    .from("comp_matches")
    .select(
      "id, player1_id, player2_id, p1_tier_at_start, p2_tier_at_start, question_ids, started_at, deadline_at, status, is_friendly",
    )
    .eq("id", matchId)
    .maybeSingle();

  if (!match) redirect("/rekabet");

  // Maç bittiyse sonuç sayfasına
  if (match.status !== "active") {
    redirect(`/rekabet/${matchId}/sonuc`);
  }
  // Süre dolmuşsa sonuca yönlendir (Realtime/finalize gerçekleşmemiş olabilir)
  if (new Date(match.deadline_at).getTime() < Date.now()) {
    // Finalize tetikle ve sonuç sayfasına geç
    await supabase.rpc("comp_finalize_match", { p_match_id: matchId });
    redirect(`/rekabet/${matchId}/sonuc`);
  }

  // Kullanıcının cevap sayısı
  const { count: myCount } = await supabase
    .from("comp_match_answers")
    .select("q_index", { count: "exact", head: true })
    .eq("match_id", matchId)
    .eq("player_id", user.id);
  const { count: oppCount } = await supabase
    .from("comp_match_answers")
    .select("q_index", { count: "exact", head: true })
    .eq("match_id", matchId)
    .neq("player_id", user.id);

  const myAnswered = myCount ?? 0;
  // Sıradaki soru indeksi = mevcut cevap sayısı
  const nextQIndex = myAnswered < match.question_ids.length ? myAnswered : -1;
  const initialQuestion =
    nextQIndex >= 0 ? getMatchQuestion(match.question_ids, nextQIndex) : null;

  const isP1 = match.player1_id === user.id;
  const myTier = isP1 ? match.p1_tier_at_start : match.p2_tier_at_start;
  const opponentTier = isP1 ? match.p2_tier_at_start : match.p1_tier_at_start;
  const opponentId = isP1 ? match.player2_id : match.player1_id;

  // Faz 5: rakibin herkese açık kimliği (takma ad + lig nişanı)
  const [shellUser, opponentProfile] = await Promise.all([
    getShellUser(),
    getPublicProfile(opponentId),
  ]);

  return (
    <AppShell user={shellUser}>
      <div className="mx-auto max-w-2xl">
        <MatchClient
          match={{
            id: match.id,
            questionCount: match.question_ids.length,
            deadlineAt: match.deadline_at,
            startedAt: match.started_at,
            isFriendly: Boolean(match.is_friendly),
          }}
          initialQuestion={
            initialQuestion ?? {
              questionId: "",
              qIndex: nextQIndex,
              question: "",
              options: [],
              subjectSlug: "",
              subjectName: "",
              topicId: "",
              topicName: "",
            }
          }
          myUserId={user.id}
          myTier={myTier ?? DEFAULT_NEW_USER_TIER}
          opponentTier={opponentTier ?? DEFAULT_NEW_USER_TIER}
          opponentName={opponentProfile?.name ?? "Rakip"}
          opponentBestTier={opponentProfile?.bestTier ?? null}
          myAnsweredCountInitial={myAnswered}
          opponentAnsweredCountInitial={oppCount ?? 0}
        />
      </div>
    </AppShell>
  );
}
