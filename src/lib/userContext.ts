/**
 * AI Baykuş ve Hızlı Sorular akıllı havuz için kompakt kullanıcı bağlamı.
 * Server-side; Supabase'ten okur. Giriş yapmamış / yapılandırılmamış
 * kullanıcı için null döner.
 */
import { getAllSubjects } from "@/content";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export type WeakTopic = {
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  pct: number;
  total: number;
};

export type UserContext = {
  firstName: string | null;
  thisWeekMinutes: number;
  /** Son 7 gün içinde cevaplanan toplam soru sayısı (haftalık özet için). */
  thisWeekQuestions: number;
  streakDays: number;
  weakTopics: WeakTopic[]; // en zayıf 2 konu (pct artan, en az 4 soru çözülmüş)
  /** Bugün için bekleyen ("due") hata sayısı — wrong_answers next_due_at <= now */
  dueWrongCount: number;
};

// Gün sınırı Türkiye günü — tracking-core ile aynı gerekçe.
import { trGunAnahtari, trGunGeri } from "@/lib/zaman";
const dayKey = trGunAnahtari;

/**
 * Kullanıcı bağlamını döndürür. Yapılandırma / giriş yoksa null.
 * Maliyetli olabilir (3 paralel query); endpoint'lerde tek seferlik kullanın.
 */
export async function getUserContext(): Promise<UserContext | null> {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const fullName =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    (user.email ? user.email.split("@")[0] : null);
  const firstName = fullName ? fullName.split(" ")[0] : null;

  // Son 7 günün başlangıcı
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  // Streak için son 60 gün
  const streakStart = new Date();
  streakStart.setDate(streakStart.getDate() - 60);

  // Quiz sonuçları için 180 günlük pencere (zayıf konu analizi + haftalık
  // soru sayısı için fazlasıyla yeterli; sorgu yükünü sabit tutar).
  const quizSince = new Date();
  quizSince.setDate(quizSince.getDate() - 180);

  const [sessionsRes, quizzesRes, wrongRes] = await Promise.all([
    supabase
      .from("study_sessions")
      .select("duration_seconds, started_at")
      .gte("started_at", streakStart.toISOString()),
    supabase
      .from("quiz_results")
      .select("subject_slug, topic_id, correct_count, wrong_count, created_at")
      .gte("created_at", quizSince.toISOString()),
    supabase.from("wrong_answers").select("next_due_at, last_wrong_at"),
  ]);

  const sessions = (sessionsRes.data ?? []) as {
    duration_seconds: number;
    started_at: string;
  }[];
  const quizzes = (quizzesRes.data ?? []) as {
    subject_slug: string;
    topic_id: string;
    correct_count: number;
    wrong_count: number;
    created_at: string;
  }[];
  const wrongs = (wrongRes.data ?? []) as {
    next_due_at: string | null;
    last_wrong_at: string;
  }[];

  // Bu hafta dakika
  const perDay = new Map<string, number>();
  let weekSeconds = 0;
  for (const s of sessions) {
    const ts = new Date(s.started_at);
    perDay.set(dayKey(ts), (perDay.get(dayKey(ts)) ?? 0) + s.duration_seconds);
    if (ts >= weekStart) weekSeconds += s.duration_seconds;
  }
  const thisWeekMinutes = Math.round(weekSeconds / 60);

  // Bu hafta cevaplanan soru sayısı (correct + wrong)
  let thisWeekQuestions = 0;
  for (const q of quizzes) {
    if (new Date(q.created_at) >= weekStart) {
      thisWeekQuestions += q.correct_count + q.wrong_count;
    }
  }

  // Streak (bugünden veya dünden geriye doğru) — TR günleri
  let streakDays = 0;
  let cursor = new Date();
  if ((perDay.get(dayKey(cursor)) ?? 0) === 0) {
    cursor = trGunGeri(cursor, 1);
  }
  while ((perDay.get(dayKey(cursor)) ?? 0) > 0) {
    streakDays += 1;
    cursor = trGunGeri(cursor, 1);
  }

  // Zayıf konular: subject/topic agregatı doğru oranı < 75 ve total >= 4
  const agg = new Map<string, { correct: number; total: number }>();
  for (const q of quizzes) {
    if (q.subject_slug.startsWith("__") || q.topic_id.startsWith("__")) continue;
    const k = `${q.subject_slug}/${q.topic_id}`;
    const cur = agg.get(k) ?? { correct: 0, total: 0 };
    cur.correct += q.correct_count;
    cur.total += q.correct_count + q.wrong_count;
    agg.set(k, cur);
  }

  const allSubjects = getAllSubjects();
  const subjectNameMap = new Map<string, string>(
    allSubjects.map((s) => [s.slug, s.name]),
  );
  const topicNameMap = new Map<string, string>();
  for (const s of allSubjects) {
    for (const t of s.topics) {
      topicNameMap.set(`${s.slug}/${t.id}`, t.name);
    }
  }

  // SubjectHeatmap ile aynı eşik: en az 8 soru çözülmüş konularda
  // performans değerlendirilir (1-2 soruda %0 yanıltıcı olur).
  const MIN_RELIABLE = 8;
  const weakTopics: WeakTopic[] = [];
  for (const [k, v] of agg.entries()) {
    if (v.total < MIN_RELIABLE) continue;
    const pct = Math.round((v.correct / v.total) * 100);
    if (pct >= 75) continue;
    const [subjectSlug, topicId] = k.split("/");
    weakTopics.push({
      subjectSlug,
      subjectName: subjectNameMap.get(subjectSlug) ?? subjectSlug,
      topicId,
      topicName: topicNameMap.get(k) ?? topicId,
      pct,
      total: v.total,
    });
  }
  weakTopics.sort((a, b) => a.pct - b.pct);
  const topWeak = weakTopics.slice(0, 2);

  // Vadesi gelmiş hata sayısı
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  let dueWrongCount = 0;
  for (const w of wrongs) {
    const due = w.next_due_at
      ? new Date(w.next_due_at).getTime()
      : new Date(w.last_wrong_at).getTime() + ONE_DAY;
    if (due <= now) dueWrongCount += 1;
  }

  return {
    firstName,
    thisWeekMinutes,
    thisWeekQuestions,
    streakDays,
    weakTopics: topWeak,
    dueWrongCount,
  };
}

/**
 * Hızlı Sorular akıllı havuzu için zayıf konu kümesi
 * ("subjectSlug/topicId" formatında). Min 4 soru çözülmüş ve <75% doğru.
 */
export async function getWeakTopicKeys(): Promise<Set<string>> {
  const ctx = await getUserContext();
  if (!ctx) return new Set();
  return new Set(
    ctx.weakTopics.map((t) => `${t.subjectSlug}/${t.topicId}`),
  );
}

/**
 * UserContext'ten kullanıcıya gösterilecek kısa karşılama mesajı oluştur.
 * Hiç veri yoksa jenerik selam.
 */
export function buildGreeting(ctx: UserContext | null): string {
  if (!ctx) {
    return "Merhaba! Ben Rehber Baykuş 🦉 Derslerinle ilgili sorularını yanıtlayabilir ya da seni doğru sayfaya götürebilirim. Örneğin \"suyun pH değeri kaç?\" diye sorabilir veya \"matematiğe gir\" diyebilirsin.";
  }
  const name = ctx.firstName ? `, ${ctx.firstName}` : "";

  // En öncelikli durumu seç
  if (ctx.weakTopics.length > 0) {
    const w = ctx.weakTopics[0];
    const due = ctx.dueWrongCount > 0
      ? ` Ayrıca tekrar zamanı gelmiş ${ctx.dueWrongCount} sorun var.`
      : "";
    return `Merhaba${name}! 🦉 ${w.subjectName} dersinde **${w.topicName}** konusunda %${w.pct} doğru oranındasın — birlikte güçlendirelim mi?${due}`;
  }

  if (ctx.dueWrongCount > 0) {
    return `Merhaba${name}! 🦉 Tekrar zamanı gelmiş ${ctx.dueWrongCount} sorun var. Hatalarım sayfasına götüreyim mi?`;
  }

  if (ctx.streakDays >= 3) {
    return `Merhaba${name}! 🔥 ${ctx.streakDays} günlük seri yaptın, tebrikler! Bugün hangi derse odaklanalım?`;
  }

  if (ctx.thisWeekMinutes > 0) {
    const h = Math.floor(ctx.thisWeekMinutes / 60);
    const m = ctx.thisWeekMinutes % 60;
    const t = h > 0 ? `${h}s ${m}dk` : `${m} dk`;
    return `Merhaba${name}! 🦉 Bu hafta toplam ${t} çalıştın. Hangi konuda yardım edebilirim?`;
  }

  return `Merhaba${name}! 🦉 Henüz çalışmaya başlamamışsın. Hangi derste yardıma ihtiyacın var? Türkçe, matematik, fen…`;
}
