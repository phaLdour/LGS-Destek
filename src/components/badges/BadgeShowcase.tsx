import { Lock } from "lucide-react";
import { getAllSubjects } from "@/content";
import { BADGES, evaluateBadges, type Badge } from "@/lib/badges";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

const GROUP_LABELS: Record<Badge["group"], string> = {
  baslangic: "Başlangıç",
  seri: "Seri",
  soru: "Soru",
  ders: "Ders Ustaları",
  sinav: "Sınav",
};

const GROUP_ORDER: Badge["group"][] = [
  "baslangic",
  "seri",
  "soru",
  "ders",
  "sinav",
];

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export async function BadgeShowcase() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();

  // Paralel veri
  const since = new Date();
  since.setDate(since.getDate() - 60);

  const [sessions, topicProgress, quizzes, existingBadges] = await Promise.all([
    supabase
      .from("study_sessions")
      .select("duration_seconds, started_at")
      .gte("started_at", since.toISOString()),
    supabase
      .from("topic_progress")
      .select("subject_slug, status")
      .eq("status", "done"),
    supabase
      .from("quiz_results")
      .select("subject_slug, correct_count, wrong_count, total_questions"),
    supabase.from("user_badges").select("badge_key"),
  ]);

  const sessionRows = (sessions.data ?? []) as {
    duration_seconds: number;
    started_at: string;
  }[];
  const topicRows = (topicProgress.data ?? []) as {
    subject_slug: string;
    status: string;
  }[];
  const quizRows = (quizzes.data ?? []) as {
    subject_slug: string;
    correct_count: number;
    wrong_count: number;
    total_questions: number;
  }[];
  const ownedKeys = new Set(
    ((existingBadges.data ?? []) as { badge_key: string }[]).map(
      (r) => r.badge_key,
    ),
  );

  // Metrikler
  const totalSeconds = sessionRows.reduce(
    (a, r) => a + r.duration_seconds,
    0,
  );
  const perDay = new Map<string, number>();
  for (const r of sessionRows) {
    const d = new Date(r.started_at);
    perDay.set(dayKey(d), (perDay.get(dayKey(d)) ?? 0) + r.duration_seconds);
  }
  const maxDailyMinutes = Math.round(
    Math.max(0, ...Array.from(perDay.values())) / 60,
  );

  // Streak (today'den başla, kesintiye uğrayana kadar say)
  let streakDays = 0;
  const cursor = new Date();
  if ((perDay.get(dayKey(cursor)) ?? 0) === 0) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while ((perDay.get(dayKey(cursor)) ?? 0) > 0) {
    streakDays += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Konu sayıları
  const topicsDonePerSubject: Record<string, number> = {};
  for (const r of topicRows) {
    topicsDonePerSubject[r.subject_slug] =
      (topicsDonePerSubject[r.subject_slug] ?? 0) + 1;
  }
  const totalTopicsPerSubject: Record<string, number> = {};
  for (const s of getAllSubjects()) {
    totalTopicsPerSubject[s.slug] = s.topics.length;
  }
  const completedTopics = topicRows.length;

  // Soru/sınav metrikleri
  let questionsAnswered = 0;
  let hasPerfectQuiz = false;
  let bestExamNet = 0;
  for (const q of quizRows) {
    questionsAnswered += q.correct_count + q.wrong_count;
    if (q.total_questions >= 4 && q.correct_count === q.total_questions) {
      hasPerfectQuiz = true;
    }
    if (q.subject_slug.startsWith("__deneme_")) {
      const net = Math.max(0, q.correct_count - q.wrong_count / 3);
      if (net > bestExamNet) bestExamNet = net;
    }
  }

  const earned = evaluateBadges({
    totalMinutes: Math.round(totalSeconds / 60),
    completedTopics,
    streakDays,
    questionsAnswered,
    maxDailyMinutes,
    hasPerfectQuiz,
    bestExamNet,
    topicsDonePerSubject,
    totalTopicsPerSubject,
  });

  // Yeni kazanılanları kaydet (zaten sahip olunmayanlar)
  const toInsert = Array.from(earned).filter((k) => !ownedKeys.has(k));
  if (toInsert.length > 0) {
    await supabase.from("user_badges").upsert(
      toInsert.map((k) => ({ user_id: user.id, badge_key: k })),
      { onConflict: "user_id,badge_key" },
    );
  }

  const earnedCount = earned.size;
  const totalCount = BADGES.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
        <div>
          <p className="text-sm font-semibold text-rehberim-navy/55">
            Kazandığın rozetler
          </p>
          <p className="text-2xl font-extrabold text-rehberim-navy">
            {earnedCount} / {totalCount}
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rehberim-accent/15 text-2xl">
          🏅
        </div>
      </div>

      {GROUP_ORDER.map((g) => {
        const items = BADGES.filter((b) => b.group === g);
        if (items.length === 0) return null;
        return (
          <div
            key={g}
            className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card"
          >
            <h4 className="mb-3 text-sm font-extrabold text-rehberim-navy">
              {GROUP_LABELS[g]}
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {items.map((b) => {
                const has = earned.has(b.key);
                return (
                  <div
                    key={b.key}
                    title={b.description}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition ${
                      has
                        ? "border-rehberim-accent/40 bg-rehberim-accent/5"
                        : "border-rehberim-border bg-rehberim-muted/40 opacity-60"
                    }`}
                  >
                    <span className="text-2xl">{has ? b.emoji : "🔒"}</span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold text-rehberim-navy">
                        {b.name}
                      </p>
                      <p className="line-clamp-2 text-[10px] leading-tight text-rehberim-navy/55">
                        {b.description}
                      </p>
                    </div>
                    {!has && (
                      <Lock className="ml-auto h-3.5 w-3.5 shrink-0 text-rehberim-navy/30" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
