import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";
import { getAllSubjects } from "@/content";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * Bir konunun performans yüzdesinin "anlamlı" sayılması için gereken
 * en az soru sayısı. Daha azında istatistik gürültülü (1 soruda %0 ya
 * da %100 yanıltıcı olur).
 */
const MIN_RELIABLE = 8;

type RawRow = {
  subject_slug: string;
  topic_id: string;
  correct_count: number;
  wrong_count: number;
};

type TopicStat = {
  id: string;
  name: string;
  total: number;
  correct: number;
  pct: number | null; // null = hiç çözülmedi
};

type SubjectStat = {
  slug: string;
  name: string;
  topics: TopicStat[];
  attemptedTopics: number;
  totalTopics: number;
  averagePct: number | null;
};

function colorFor(pct: number | null): string {
  if (pct === null) return "bg-rehberim-border";
  if (pct < 50) return "bg-red-400";
  if (pct < 75) return "bg-amber-400";
  return "bg-green-500";
}

function badgeColor(pct: number | null): string {
  if (pct === null) return "text-rehberim-navy/40";
  if (pct < 50) return "text-red-500";
  if (pct < 75) return "text-amber-600";
  return "text-green-600";
}

export async function SubjectHeatmap() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();

  // Topic bazlı tüm test sonuçları (karma ve karma-subject kayıtları hariç bırakılır)
  const { data } = await supabase
    .from("quiz_results")
    .select("subject_slug, topic_id, correct_count, wrong_count");

  const rows = (data ?? []) as RawRow[];

  // subject/topic için doğru/toplam agregatı
  const agg = new Map<string, { correct: number; total: number }>();
  for (const r of rows) {
    if (r.subject_slug.startsWith("__") || r.topic_id.startsWith("__")) continue;
    const key = `${r.subject_slug}/${r.topic_id}`;
    const cur = agg.get(key) ?? { correct: 0, total: 0 };
    cur.correct += r.correct_count;
    cur.total += r.correct_count + r.wrong_count;
    agg.set(key, cur);
  }

  const subjects: SubjectStat[] = getAllSubjects().map((s) => {
    const topics: TopicStat[] = s.topics.map((t) => {
      const a = agg.get(`${s.slug}/${t.id}`);
      const total = a?.total ?? 0;
      const correct = a?.correct ?? 0;
      // Yalnız en az MIN_RELIABLE soru çözülmüş konularda yüzde hesabı
      // anlamlı sayılır; aksi hâlde pct null (gri "henüz yetersiz veri").
      return {
        id: t.id,
        name: t.name,
        total,
        correct,
        pct:
          total >= MIN_RELIABLE
            ? Math.round((correct / total) * 100)
            : null,
      };
    });
    const attempted = topics.filter((t) => t.pct !== null);
    const avg =
      attempted.length > 0
        ? Math.round(
            attempted.reduce((acc, t) => acc + (t.pct ?? 0), 0) /
              attempted.length,
          )
        : null;
    return {
      slug: s.slug,
      name: s.name,
      topics,
      attemptedTopics: attempted.length,
      totalTopics: topics.length,
      averagePct: avg,
    };
  });

  const anyAttempt = subjects.some((s) => s.attemptedTopics > 0);
  if (!anyAttempt) {
    return (
      <div className="rounded-2xl border border-dashed border-rehberim-border bg-white p-6 text-center text-sm text-rehberim-navy/55 shadow-card">
        Henüz konu testi çözmedin. Bir derse girip test çözmeye başla;
        burada konu konu performansını göreceksin.
      </div>
    );
  }

  // En zayıf 3 konu (genel) — odak önerisi.
  // Sadece pct anlamlı olanlar (en az MIN_RELIABLE soru) değerlendirilir.
  const weakest = subjects
    .flatMap((s) =>
      s.topics
        .filter((t) => t.pct !== null)
        .map((t) => ({ subjectSlug: s.slug, subjectName: s.name, ...t })),
    )
    .sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0))
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {weakest.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-4 shadow-card">
          <div className="mb-3 flex items-center gap-2 font-extrabold text-red-700">
            <Flame className="h-5 w-5" />
            Önce buraya çalış: en zayıf 3 konu
          </div>
          <div className="space-y-2">
            {weakest.map((t) => (
              <Link
                key={`${t.subjectSlug}/${t.id}`}
                href={`/ders/${t.subjectSlug}/${t.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-white px-4 py-2.5 transition hover:border-red-400"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-rehberim-navy">
                    {t.name}
                  </span>
                  <span className="block text-xs text-rehberim-navy/55">
                    {t.subjectName} · {t.correct}/{t.total} doğru · Konuya git
                  </span>
                </span>
                <span className={`text-lg font-extrabold ${badgeColor(t.pct)}`}>
                  %{t.pct}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {subjects.map((s) => (
          <div
            key={s.slug}
            className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/ders/${s.slug}`}
                  className="flex items-center gap-1 text-sm font-extrabold text-rehberim-navy hover:text-rehberim-accent"
                >
                  {s.name}
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-rehberim-navy/55">
                  {s.attemptedTopics}/{s.totalTopics} konu denenmiş
                </p>
              </div>
              {s.averagePct !== null && (
                <div className="text-right">
                  <p className={`text-lg font-extrabold ${badgeColor(s.averagePct)}`}>
                    %{s.averagePct}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-rehberim-navy/40">
                    Ortalama
                  </p>
                </div>
              )}
            </div>
            {/* Konu nokta grid'i (tıklayınca konunun ders sayfasına gider) */}
            <div className="flex flex-wrap gap-1.5">
              {s.topics.map((t) => {
                let tip: string;
                if (t.pct !== null) {
                  tip = `${t.name} — %${t.pct} (${t.correct}/${t.total})`;
                } else if (t.total === 0) {
                  tip = `${t.name} — henüz çözülmedi`;
                } else {
                  tip = `${t.name} — yetersiz veri (${t.total}/${MIN_RELIABLE} soru, oran için en az ${MIN_RELIABLE} gerekir)`;
                }
                return (
                  <Link
                    key={t.id}
                    href={`/ders/${s.slug}/${t.id}`}
                    title={tip}
                    className={`h-3 w-3 rounded-sm transition hover:scale-125 ${colorFor(t.pct)}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-rehberim-navy/55">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-green-500" />
          ≥ %75
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-amber-400" />
          %50–74
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-red-400" />
          &lt; %50
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-rehberim-border" />
          Henüz çözülmedi
        </span>
      </div>
    </div>
  );
}
