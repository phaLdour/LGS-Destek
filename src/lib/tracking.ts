import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  computeStats,
  emptyStats,
  DEFAULT_GOAL,
  type Stats,
  type QuizRow,
  type SessionRow,
} from "@/lib/tracking-core";
// İstatistik pencerelerinin sınırı da TR gün başıdır (bkz. lib/zaman.ts).
import { trPencereBaslangici } from "@/lib/zaman";
import { tekrariPlanla } from "@/lib/konuTekrarDeposu";

export type { Stats } from "@/lib/tracking-core";

export type TopicStatus = "in_progress" | "done";

export type SessionInput = {
  subjectSlug: string;
  durationSeconds: number;
  studiedTopics: string[];
  correctCount?: number;
  wrongCount?: number;
  startedAt: string; // ISO
};

export type QuizResultInput = {
  subjectSlug: string;
  topicId: string;
  correct: number;
  wrong: number;
  total: number;
  durationSeconds: number;
};

async function getClientAndUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return { supabase, user };
}

export async function getTopicProgress(
  subjectSlug: string,
): Promise<Record<string, TopicStatus>> {
  const ctx = await getClientAndUser();
  if (!ctx) return {};
  const { data } = await ctx.supabase
    .from("topic_progress")
    .select("topic_id, status")
    .eq("subject_slug", subjectSlug);
  const out: Record<string, TopicStatus> = {};
  (data ?? []).forEach((r: { topic_id: string; status: TopicStatus }) => {
    out[r.topic_id] = r.status;
  });
  return out;
}

export async function setTopicStatus(
  subjectSlug: string,
  topicId: string,
  status: TopicStatus,
): Promise<boolean> {
  const ctx = await getClientAndUser();
  if (!ctx) return false;
  const { error } = await ctx.supabase.from("topic_progress").upsert(
    {
      user_id: ctx.user.id,
      subject_slug: subjectSlug,
      topic_id: topicId,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,subject_slug,topic_id" },
  );
  return !error;
}

export async function saveSession(input: SessionInput): Promise<boolean> {
  const ctx = await getClientAndUser();
  if (!ctx) return false;
  const { error } = await ctx.supabase.from("study_sessions").insert({
    user_id: ctx.user.id,
    subject_slug: input.subjectSlug,
    duration_seconds: Math.round(input.durationSeconds),
    studied_topics: input.studiedTopics,
    correct_count: input.correctCount ?? 0,
    wrong_count: input.wrongCount ?? 0,
    started_at: input.startedAt,
    ended_at: new Date().toISOString(),
  });
  return !error;
}

export async function saveQuizResult(input: QuizResultInput): Promise<boolean> {
  const ctx = await getClientAndUser();
  if (!ctx) return false;
  const { error } = await ctx.supabase.from("quiz_results").insert({
    user_id: ctx.user.id,
    subject_slug: input.subjectSlug,
    topic_id: input.topicId,
    correct_count: input.correct,
    wrong_count: input.wrong,
    total_questions: input.total,
    duration_seconds: Math.round(input.durationSeconds),
  });

  // Test sonucu aynı zamanda "bu konuyu ne kadar hatirliyor?" cevabidir;
  // tekrar plani buradan kurulur. BEKLENMEZ ve hatasi yutulur: plan
  // kurulamadi diye test sonucunun kaydedilmemis sayilmasi yanlis olurdu.
  // Sanal dersler (deneme/sozluk kayitlari) tekrar planina girmez --
  // onlarin bir konusu yok.
  if (!input.subjectSlug.startsWith("__")) {
    void tekrariPlanla(
      input.subjectSlug,
      input.topicId,
      input.correct,
      input.total,
    );
  }

  return !error;
}

export async function getDailyGoal(): Promise<number> {
  const ctx = await getClientAndUser();
  if (!ctx) return DEFAULT_GOAL;
  const meta = ctx.user.user_metadata as Record<string, unknown>;
  const g = Number(meta?.daily_goal_minutes);
  return Number.isFinite(g) && g > 0 ? g : DEFAULT_GOAL;
}

export async function setDailyGoal(minutes: number): Promise<boolean> {
  const ctx = await getClientAndUser();
  if (!ctx) return false;
  const { error } = await ctx.supabase.auth.updateUser({
    data: { daily_goal_minutes: minutes },
  });
  return !error;
}

export async function getStats(): Promise<Stats> {
  const ctx = await getClientAndUser();
  if (!ctx) return emptyStats(isSupabaseConfigured());

  // Son 60 TAM Türkiye günü (bugün dahil) — streak + haftalık için yeterli.
  // Eskiden `since.setDate(getDate() - 60)` kullanılıyordu; bu "60 gün önce
  // şu anki saat" demekti, en eski günü yarım bırakıyor ve sınırı sunucunun
  // UTC gününe kaydırıyordu (seri yanlış kopuyordu).
  const since = trPencereBaslangici(60);

  // Quiz sonuçları için 180 günlük pencere: LGS hazırlığı tek akademik yıl
  // içinde olduğundan öğrencinin tüm geçmişini kapsar (gösterilen değerler
  // pratikte değişmez) ama sorgu yükü zamanla büyümez. Sınır yine TR gün başı.
  const quizSince = trPencereBaslangici(180);

  const [{ data: sessions }, { count: doneCount }, { data: quizzes }] =
    await Promise.all([
      ctx.supabase
        .from("study_sessions")
        .select("duration_seconds, started_at")
        .gte("started_at", since.toISOString()),
      ctx.supabase
        .from("topic_progress")
        .select("topic_id", { count: "exact", head: true })
        .eq("status", "done"),
      ctx.supabase
        .from("quiz_results")
        .select("correct_count, wrong_count, created_at")
        .gte("created_at", quizSince.toISOString()),
    ]);

  return computeStats(
    (sessions ?? []) as SessionRow[],
    doneCount ?? 0,
    (quizzes ?? []) as QuizRow[],
  );
}
