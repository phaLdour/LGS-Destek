import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type TopicStatus = "in_progress" | "done";

export type SessionInput = {
  subjectSlug: string;
  durationSeconds: number;
  studiedTopics: string[];
  correctCount?: number;
  wrongCount?: number;
  startedAt: string; // ISO
};

export type Stats = {
  configured: boolean;
  signedIn: boolean;
  totalMinutes: number;
  todayMinutes: number;
  completedTopics: number;
  streakDays: number;
  /** Son 7 gün (eskiden yeniye), her biri {label, minutes} */
  weekly: { label: string; minutes: number; isToday: boolean }[];
};

const DEFAULT_GOAL = 30;
const DAY_LABELS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

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
  const base: Stats = {
    configured: isSupabaseConfigured(),
    signedIn: false,
    totalMinutes: 0,
    todayMinutes: 0,
    completedTopics: 0,
    streakDays: 0,
    weekly: buildEmptyWeek(),
  };

  const ctx = await getClientAndUser();
  if (!ctx) return base;
  base.signedIn = true;

  // Son 60 günün oturumları (streak + haftalık için yeterli)
  const since = new Date();
  since.setDate(since.getDate() - 60);

  const [{ data: sessions }, { count: doneCount }] = await Promise.all([
    ctx.supabase
      .from("study_sessions")
      .select("duration_seconds, started_at")
      .gte("started_at", since.toISOString()),
    ctx.supabase
      .from("topic_progress")
      .select("topic_id", { count: "exact", head: true })
      .eq("status", "done"),
  ]);

  const rows = (sessions ?? []) as {
    duration_seconds: number;
    started_at: string;
  }[];

  base.completedTopics = doneCount ?? 0;

  // Günlük dakika toplamları
  const perDay = new Map<string, number>();
  let totalSeconds = 0;
  for (const r of rows) {
    totalSeconds += r.duration_seconds;
    const d = new Date(r.started_at);
    perDay.set(dayKey(d), (perDay.get(dayKey(d)) ?? 0) + r.duration_seconds);
  }
  base.totalMinutes = Math.round(totalSeconds / 60);

  const today = new Date();
  base.todayMinutes = Math.round((perDay.get(dayKey(today)) ?? 0) / 60);

  // Haftalık (son 7 gün, eskiden yeniye)
  base.weekly = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    base.weekly.push({
      label: DAY_LABELS[d.getDay()],
      minutes: Math.round((perDay.get(dayKey(d)) ?? 0) / 60),
      isToday: i === 0,
    });
  }

  // Seri (streak): bugün veya dünden başlayıp geriye doğru kesintisiz gün
  base.streakDays = computeStreak(perDay);

  return base;
}

function computeStreak(perDay: Map<string, number>): number {
  const cursor = new Date();
  // Bugün çalışılmadıysa dünden başlat (seri kopmasın diye)
  if ((perDay.get(dayKey(cursor)) ?? 0) === 0) {
    cursor.setDate(cursor.getDate() - 1);
    if ((perDay.get(dayKey(cursor)) ?? 0) === 0) return 0;
  }
  let streak = 0;
  while ((perDay.get(dayKey(cursor)) ?? 0) > 0) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function buildEmptyWeek() {
  const out: { label: string; minutes: number; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ label: DAY_LABELS[d.getDay()], minutes: 0, isToday: i === 0 });
  }
  return out;
}
