import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Flame,
  ListChecks,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { getUserContext } from "@/lib/userContext";

/**
 * Haftalık özet kartı — son 7 günün kompakt özetini sunar.
 * Hiç veri yoksa kart gizlenir (yeni kullanıcıya gürültü olmasın).
 * Dashboard'da StatsPanel'in hemen üstünde gösterilir.
 */
export async function WeeklyDigestCard() {
  const ctx = await getUserContext();
  if (!ctx) return null;

  const { thisWeekMinutes, thisWeekQuestions, streakDays, weakTopics } = ctx;
  // Hiçbir aktivite yoksa gizle
  if (thisWeekMinutes === 0 && thisWeekQuestions === 0 && streakDays === 0) {
    return null;
  }

  const hours = Math.floor(thisWeekMinutes / 60);
  const mins = thisWeekMinutes % 60;
  const durText =
    hours > 0 ? `${hours} sa ${mins} dk` : `${mins} dk`;

  // Pazar günü mü? Hafta bitti, motive edici tonla göster
  const today = new Date().getDay(); // 0 = Pazar
  const isSunday = today === 0;

  const focus = weakTopics[0];

  return (
    <section className="ring-hairline relative mt-4 overflow-hidden rounded-2xl border border-rehberim-accent/25 bg-gradient-to-br from-rehberim-accent/10 via-white to-amber-50 p-5 shadow-card">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rehberim-accent/15 blur-3xl"
      />
      <div className="relative mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rehberim-accent/15 text-rehberim-accent ring-1 ring-rehberim-accent/15">
            <Calendar className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold tracking-tight text-rehberim-navy">
              {isSunday ? "Bu haftanın özeti 🦉" : "Bu hafta"}
            </p>
            <p className="text-xs text-rehberim-navy/55">
              Son 7 günün performansı
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat
          icon={<Timer className="h-4 w-4" />}
          label="Süre"
          value={durText}
        />
        <Stat
          icon={<ListChecks className="h-4 w-4" />}
          label="Soru"
          value={`${thisWeekQuestions}`}
        />
        <Stat
          icon={<Flame className="h-4 w-4" />}
          label="Seri"
          value={`${streakDays} gün`}
        />
      </div>

      {focus && (
        <Link
          href={`/ders/${focus.subjectSlug}/${focus.topicId}`}
          className="mt-3 flex items-center gap-2 rounded-xl border border-rehberim-border bg-white px-3 py-2.5 text-sm transition hover:border-rehberim-accent/50 hover:bg-rehberim-muted"
        >
          <Target className="h-4 w-4 shrink-0 text-red-500" />
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-rehberim-navy">
              Odak önerisi: {focus.topicName}
            </span>
            <span className="block text-xs text-rehberim-navy/55">
              {focus.subjectName} · %{focus.pct} doğru — birlikte güçlendirelim
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-rehberim-navy/40" />
        </Link>
      )}

      {!focus && thisWeekQuestions > 0 && (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-sm font-semibold text-green-700">
          <Sparkles className="h-4 w-4" />
          Henüz belirgin bir zayıf konun yok — tempoyu sürdür!
        </p>
      )}
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="ring-hairline relative rounded-xl border border-rehberim-border bg-white p-3 text-center shadow-card">
      <span className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-rehberim-accent/10 text-rehberim-accent ring-1 ring-rehberim-accent/12">
        {icon}
      </span>
      <p className="text-base font-extrabold tracking-tight tabular-nums text-rehberim-navy">
        {value}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-rehberim-navy/50">
        {label}
      </p>
    </div>
  );
}
