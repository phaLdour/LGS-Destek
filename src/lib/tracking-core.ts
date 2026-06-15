/**
 * Saf (Supabase'siz) istatistik hesaplama çekirdeği.
 *
 * Hem client (`tracking.ts`) hem server (`tracking-server.ts`) tarafı bu
 * fonksiyonları kullanır; böylece mantık tek yerde tutulur ve hesap
 * verisi nereden çekilirse çekilsin aynı sonucu üretir.
 */

export type Stats = {
  configured: boolean;
  signedIn: boolean;
  totalMinutes: number;
  todayMinutes: number;
  completedTopics: number;
  streakDays: number;
  /** Son 7 gün (eskiden yeniye), her biri {label, minutes} */
  weekly: { label: string; minutes: number; isToday: boolean }[];
  quizzesSolved: number;
  questionsAnswered: number;
  accuracyPct: number;
  /** Bugün (yerel saat 00:00'dan beri) cevaplanan toplam soru sayısı */
  questionsToday: number;
};

export type SessionRow = { duration_seconds: number; started_at: string };
export type QuizRow = {
  correct_count: number;
  wrong_count: number;
  created_at: string;
};

export const DEFAULT_GOAL = 30;
const DAY_LABELS = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function buildEmptyWeek() {
  const out: { label: string; minutes: number; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({ label: DAY_LABELS[d.getDay()], minutes: 0, isToday: i === 0 });
  }
  return out;
}

export function emptyStats(configured: boolean): Stats {
  return {
    configured,
    signedIn: false,
    totalMinutes: 0,
    todayMinutes: 0,
    completedTopics: 0,
    streakDays: 0,
    weekly: buildEmptyWeek(),
    quizzesSolved: 0,
    questionsAnswered: 0,
    accuracyPct: 0,
    questionsToday: 0,
  };
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

/**
 * Ham satırlardan tüm istatistikleri tek geçişte hesaplar.
 * `configured` ve `signedIn` çağıran tarafça true verilir.
 */
export function computeStats(
  sessions: SessionRow[],
  doneCount: number,
  quizRows: QuizRow[],
): Stats {
  const stats = emptyStats(true);
  stats.signedIn = true;

  // Quiz toplamları (tek geçiş)
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();

  let totalCorrect = 0;
  let totalWrong = 0;
  let questionsToday = 0;
  for (const r of quizRows) {
    totalCorrect += r.correct_count;
    totalWrong += r.wrong_count;
    if (new Date(r.created_at).getTime() >= todayStartMs) {
      questionsToday += r.correct_count + r.wrong_count;
    }
  }
  stats.quizzesSolved = quizRows.length;
  stats.questionsAnswered = totalCorrect + totalWrong;
  stats.accuracyPct = stats.questionsAnswered
    ? Math.round((totalCorrect / stats.questionsAnswered) * 100)
    : 0;
  stats.questionsToday = questionsToday;

  stats.completedTopics = doneCount;

  // Günlük dakika toplamları (tek geçiş)
  const perDay = new Map<string, number>();
  let totalSeconds = 0;
  for (const r of sessions) {
    totalSeconds += r.duration_seconds;
    const k = dayKey(new Date(r.started_at));
    perDay.set(k, (perDay.get(k) ?? 0) + r.duration_seconds);
  }
  stats.totalMinutes = Math.round(totalSeconds / 60);

  const today = new Date();
  stats.todayMinutes = Math.round((perDay.get(dayKey(today)) ?? 0) / 60);

  // Haftalık (son 7 gün, eskiden yeniye)
  stats.weekly = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    stats.weekly.push({
      label: DAY_LABELS[d.getDay()],
      minutes: Math.round((perDay.get(dayKey(d)) ?? 0) / 60),
      isToday: i === 0,
    });
  }

  stats.streakDays = computeStreak(perDay);
  return stats;
}
