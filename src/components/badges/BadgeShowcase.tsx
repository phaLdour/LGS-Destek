import { Lock } from "lucide-react";
import { getAllSubjects } from "@/content";
import { BADGES, evaluateBadges, type Badge } from "@/lib/badges";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
// Gün sınırı her yerde Türkiye günü olmalı (bkz. lib/zaman.ts).
import { trGunAnahtari, trGunGeri, trPencereBaslangici } from "@/lib/zaman";

const GROUP_LABELS: Record<Badge["group"], string> = {
  baslangic: "Başlangıç",
  seri: "Seri",
  soru: "Soru",
  ders: "Ders Ustaları",
  sinav: "Sınav",
  odak: "Odak",
  rekabet: "Rekabet",
};

const GROUP_ORDER: Badge["group"][] = [
  "baslangic",
  "seri",
  "soru",
  "ders",
  "sinav",
  "odak",
  "rekabet",
];

/**
 * Gün anahtarı TÜRKİYE gününe göre üretilir.
 *
 * Eskiden `d.getFullYear()/getMonth()/getDate()` yani ÇALIŞTIĞI MAKİNENİN
 * yerel günü kullanılıyordu. Bu bir server component; Vercel sunucuları UTC
 * çalışır, dolayısıyla "gün" Türkiye'den 3 saat geriden başlıyordu: TR saatiyle
 * 29 Ağustos 02:00'de çalışan öğrencinin oturumu UTC'de hâlâ 28 Ağustos'a
 * yazılıyor, serisi yanlış güne düşüp kopabiliyordu. Artık tracking-core ile
 * aynı yardımcı kullanılıyor.
 */
const dayKey = trGunAnahtari;

export async function BadgeShowcase() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();

  // Paralel veri
  // 60 GÜNLÜK PENCERE DÜZELTMESİ: eskiden `since.setDate(getDate() - 60)` ile
  // "60 gün önce şu anki saat" alınıyordu. Bu hem en eski günü YARIM
  // bırakıyordu (o günün erken saatleri sorguya girmiyor → "bir günde en çok
  // dakika" ve seri eksik çıkıyor) hem de sınırı sunucunun UTC gününe
  // kaydırıyordu. Artık bugün DAHİL 60 tam TÜRKİYE günü çekiliyor.
  const since = trPencereBaslangici(60);

  const [
    sessions,
    topicProgress,
    quizzes,
    existingBadges,
    compRanks,
    compTrophies,
    compProfile,
  ] = await Promise.all([
    supabase
      .from("study_sessions")
      .select("duration_seconds, started_at, subject_slug")
      .gte("started_at", since.toISOString()),
    supabase
      .from("topic_progress")
      .select("subject_slug, status")
      .eq("status", "done"),
    supabase
      .from("quiz_results")
      .select("subject_slug, correct_count, wrong_count, total_questions"),
    supabase.from("user_badges").select("badge_key"),
    // Rekabet rozetleri (Faz 6) — tüm sezonların toplamı
    supabase
      .from("comp_ranks")
      .select("wins, losses, draws, win_streak, best_win_streak")
      .eq("user_id", user.id),
    supabase.from("comp_trophies").select("rank_position").eq("user_id", user.id),
    supabase
      .from("comp_profiles")
      .select("best_tier")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const sessionRows = (sessions.data ?? []) as {
    duration_seconds: number;
    started_at: string;
    subject_slug: string;
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

  // Odak Modu metrikleri (__odak__ = serbest sayaç, __odak_pomodoro__ = pomodoro)
  let odakToplamSn = 0;
  let odakEnUzunSn = 0;
  let pomodoroToplamSn = 0;
  for (const r of sessionRows) {
    if (!r.subject_slug?.startsWith("__odak")) continue;
    odakToplamSn += r.duration_seconds;
    if (r.duration_seconds > odakEnUzunSn) odakEnUzunSn = r.duration_seconds;
    if (r.subject_slug === "__odak_pomodoro__") pomodoroToplamSn += r.duration_seconds;
  }

  // Streak (bugünden başla, kesintiye uğrayana kadar say).
  // `cursor.setDate(...)` YEREL gün aritmetiğiydi; TR gün anahtarıyla
  // tutarsız kalıyordu. Artık geri sayım da TR günü üzerinden yapılır.
  let streakDays = 0;
  let cursor = new Date();
  if ((perDay.get(dayKey(cursor)) ?? 0) === 0) {
    cursor = trGunGeri(cursor, 1);
  }
  while ((perDay.get(dayKey(cursor)) ?? 0) > 0) {
    streakDays += 1;
    cursor = trGunGeri(cursor, 1);
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
  let sozlukSoruSayisi = 0;
  for (const q of quizRows) {
    questionsAnswered += q.correct_count + q.wrong_count;
    if (q.subject_slug === "__sozluk__") {
      sozlukSoruSayisi += q.correct_count + q.wrong_count;
    }
    if (q.total_questions >= 4 && q.correct_count === q.total_questions) {
      hasPerfectQuiz = true;
    }
    if (q.subject_slug.startsWith("__deneme_")) {
      const net = Math.max(0, q.correct_count - q.wrong_count / 3);
      if (net > bestExamNet) bestExamNet = net;
    }
  }

  // Rekabet metrikleri
  const rankRows = (compRanks.data ?? []) as {
    wins: number;
    losses: number;
    draws: number;
    win_streak: number;
    best_win_streak: number;
  }[];
  const trophyRows = (compTrophies.data ?? []) as { rank_position: number }[];
  const compWins = rankRows.reduce((a, r) => a + r.wins, 0);
  const compMatches = rankRows.reduce(
    (a, r) => a + r.wins + r.losses + r.draws,
    0,
  );
  const compBestStreak = rankRows.reduce(
    (a, r) => Math.max(a, r.best_win_streak ?? 0, r.win_streak ?? 0),
    0,
  );
  const compBestTier =
    typeof compProfile.data?.best_tier === "number"
      ? compProfile.data.best_tier
      : 0;

  const suAnKazanilan = evaluateBadges({
    totalMinutes: Math.round(totalSeconds / 60),
    completedTopics,
    streakDays,
    questionsAnswered,
    maxDailyMinutes,
    hasPerfectQuiz,
    bestExamNet,
    sozlukSoruSayisi,
    topicsDonePerSubject,
    totalTopicsPerSubject,
    odakToplamSn,
    odakEnUzunSn,
    pomodoroToplamSn,
    compMatches,
    compWins,
    compBestStreak,
    compBestTier,
    compTrophies: trophyRows.length,
    compSeasonWins: trophyRows.filter((t) => t.rank_position === 1).length,
  });

  // Yeni kazanılanları KALICI olarak kaydet (zaten sahip olunmayanlar)
  const toInsert = Array.from(suAnKazanilan).filter((k) => !ownedKeys.has(k));
  if (toInsert.length > 0) {
    await supabase.from("user_badges").upsert(
      toInsert.map((k) => ({ user_id: user.id, badge_key: k })),
      { onConflict: "user_id,badge_key" },
    );
    // Aynı istekte gösterilebilsin diye yerel kümeye de ekle.
    for (const k of toInsert) ownedKeys.add(k);
  }

  /**
   * ROZETLER GERİ ALINMAZ.
   *
   * Eskiden ekranda doğrudan `evaluateBadges(...)` sonucu gösteriliyordu.
   * O sonuç ANLIK metriklerden yeniden hesaplandığı için rozet geri
   * alınabiliyordu: seri kırılınca "Haftalık Seri" sönüyor, 60 günlük
   * pencerenin dışına düşen çalışma yüzünden "Çalışkan Baykuş" kayboluyor,
   * içerikten konu çıkarılınca "Ders Ustası" geri gidiyordu. Öğrenci hak
   * ettiği rozeti kaybediyordu.
   *
   * Doğrusu: `user_badges` tablosu KALICI kayıttır. Gösterilen küme, kalıcı
   * kayıtlar ile şu an hak edilenlerin BİRLEŞİMİDİR — küme yalnızca büyür.
   */
  const earned = new Set<string>([...ownedKeys, ...suAnKazanilan]);

  // Sayaç yalnız HÂLÂ TANIMLI rozetleri sayar: tabloda tanımdan kaldırılmış
  // eski bir anahtar kalmışsa "31 / 30" gibi imkânsız bir sayı çıkmasın.
  const totalCount = BADGES.length;
  const earnedCount = BADGES.filter((b) => earned.has(b.key)).length;

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
