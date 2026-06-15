"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Flame,
  ListChecks,
  Loader2,
  Target,
  Timer,
} from "lucide-react";
import { getDailyGoal, getStats, type Stats } from "@/lib/tracking";
import { WeeklyChart } from "./WeeklyChart";
import { DailyGoalCard } from "./DailyGoalCard";

function fmtMin(min: number): string {
  if (min < 60) return `${min} dk`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} sa ${m} dk` : `${h} sa`;
}

export function StatsPanel({
  initialStats,
  initialGoal,
}: {
  /** Server'dan gelen hazır istatistik — verildiğinde client fetch yapılmaz. */
  initialStats?: Stats;
  initialGoal?: number;
}) {
  const [stats, setStats] = useState<Stats | null>(initialStats ?? null);
  const [goal, setGoal] = useState(initialGoal ?? 30);

  useEffect(() => {
    // Server zaten veriyi sağladıysa ikinci kez çekme (waterfall yok).
    if (initialStats) return;
    Promise.all([getStats(), getDailyGoal()]).then(([s, g]) => {
      setStats(s);
      setGoal(g);
    });
  }, [initialStats]);

  if (!stats) {
    return (
      <div className="flex items-center justify-center rounded-2xl border border-rehberim-border bg-white py-10 text-rehberim-navy/40 shadow-card">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!stats.signedIn) {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-white p-6 text-center shadow-card">
        <p className="text-sm text-rehberim-navy/60">
          Çalışma istatistiklerin burada görünecek.{" "}
          <Link
            href="/login"
            className="font-semibold text-rehberim-accent hover:underline"
          >
            Giriş yap
          </Link>{" "}
          ve çalışmaya başla!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card
          icon={<Clock className="h-5 w-5" />}
          label="Bugün"
          value={fmtMin(stats.todayMinutes)}
        />
        <Card
          icon={<Flame className="h-5 w-5" />}
          label="Seri"
          value={`${stats.streakDays} gün`}
          accent
        />
        <Card
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Biten konu"
          value={`${stats.completedTopics}`}
        />
        <Card
          icon={<Timer className="h-5 w-5" />}
          label="Toplam"
          value={fmtMin(stats.totalMinutes)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Card
          icon={<ListChecks className="h-5 w-5" />}
          label="Çözülen test"
          value={`${stats.quizzesSolved}`}
        />
        <Card
          icon={<Target className="h-5 w-5" />}
          label="Doğru oranı"
          value={`%${stats.accuracyPct}`}
          accent
        />
        <Card
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Günlük Soru"
          value={`${stats.questionsToday}`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyChart data={stats.weekly} />
        <DailyGoalCard todayMinutes={stats.todayMinutes} goal={goal} />
      </div>
    </div>
  );
}

function Card({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="ring-hairline group relative overflow-hidden rounded-2xl border border-rehberim-border bg-white p-4 shadow-card transition-shadow duration-300 ease-smooth hover:shadow-soft">
      {/* hafif accent köşe — sadece accent kartlarda */}
      {accent && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-rehberim-accent/10 blur-2xl"
        />
      )}
      <span
        className={`relative mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl ring-1 transition-transform duration-300 ease-smooth group-hover:scale-[1.04] ${
          accent
            ? "bg-rehberim-accent/12 text-rehberim-accent ring-rehberim-accent/15"
            : "bg-rehberim-navy/5 text-rehberim-navy ring-rehberim-navy/5"
        }`}
      >
        {icon}
      </span>
      <p className="relative text-[1.4rem] font-extrabold leading-none tracking-tight tabular-nums text-rehberim-navy">
        {value}
      </p>
      <p className="relative mt-1 text-[11.5px] font-semibold uppercase tracking-wider text-rehberim-navy/50">
        {label}
      </p>
    </div>
  );
}
