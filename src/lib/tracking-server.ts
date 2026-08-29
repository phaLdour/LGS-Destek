/**
 * İstatistiklerin SERVER tarafı varyantı. Dashboard server component'i
 * bunu çağırır; veriyi ilk HTML'e gömerek client'taki yükleme bekleyişini
 * (spinner + ekstra round-trip) tamamen ortadan kaldırır.
 */
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
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

export type { Stats } from "@/lib/tracking-core";

/** Sunucuda istatistikleri hesaplar; giriş/yapılandırma yoksa boş döner. */
export async function getStatsServer(): Promise<Stats> {
  if (!isSupabaseConfigured()) return emptyStats(false);
  const user = await getCurrentUser();
  if (!user) return emptyStats(true);

  const supabase = await createClient();

  // 60/180 günlük pencerelerin sınırı TR gün başına çekildi: bu kod SUNUCUDA
  // (UTC) çalışır, eski `setDate(getDate() - N)` hesabı hem en eski günü yarım
  // bırakıyor hem de sınırı Türkiye gününden 3 saat kaydırıyordu — client
  // (tracking.ts) ile sunucu farklı sayı üretebiliyordu.
  const since = trPencereBaslangici(60);
  const quizSince = trPencereBaslangici(180);

  const [{ data: sessions }, { count: doneCount }, { data: quizzes }] =
    await Promise.all([
      supabase
        .from("study_sessions")
        .select("duration_seconds, started_at")
        .gte("started_at", since.toISOString()),
      supabase
        .from("topic_progress")
        .select("topic_id", { count: "exact", head: true })
        .eq("status", "done"),
      supabase
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

/** Günlük hedefi (dakika) sunucuda okur; yoksa varsayılan. */
export async function getDailyGoalServer(): Promise<number> {
  if (!isSupabaseConfigured()) return DEFAULT_GOAL;
  const user = await getCurrentUser();
  if (!user) return DEFAULT_GOAL;
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const g = Number(meta?.daily_goal_minutes);
  return Number.isFinite(g) && g > 0 ? g : DEFAULT_GOAL;
}
