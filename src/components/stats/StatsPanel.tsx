"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Flame,
  Gauge,
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

export function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [goal, setGoal] = useState(30);

  useEffect(() => {
    Promise.all([getStats(), getDailyGoal()]).then(([s, g]) => {
      setStats(s);
      setGoal(g);
    });
  }, []);

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

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
          icon={<Gauge className="h-5 w-5" />}
          label="Ortalama net"
          value={stats.averageNet.toFixed(2)}
          accent
        />
        <Card
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Çözülen soru"
          value={`${stats.questionsAnswered}`}
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
    <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
      <span
        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${
          accent
            ? "bg-rehberim-accent/15 text-rehberim-accent"
            : "bg-rehberim-navy/5 text-rehberim-navy"
        }`}
      >
        {icon}
      </span>
      <p className="text-xl font-extrabold text-rehberim-navy">{value}</p>
      <p className="text-xs font-semibold text-rehberim-navy/50">{label}</p>
    </div>
  );
}
