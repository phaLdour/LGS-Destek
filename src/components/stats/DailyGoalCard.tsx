"use client";

import { useState } from "react";
import { Check, Pencil, Target } from "lucide-react";
import { setDailyGoal } from "@/lib/tracking";

export function DailyGoalCard({
  todayMinutes,
  goal,
}: {
  todayMinutes: number;
  goal: number;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(goal);
  const [current, setCurrent] = useState(goal);
  const [saving, setSaving] = useState(false);

  const pct = current ? Math.min(100, Math.round((todayMinutes / current) * 100)) : 0;
  const reached = todayMinutes >= current;

  async function save() {
    const v = Math.max(5, Math.min(600, Math.round(value)));
    setSaving(true);
    await setDailyGoal(v);
    setCurrent(v);
    setValue(v);
    setSaving(false);
    setEditing(false);
  }

  return (
    <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-rehberim-navy">
          <Target className="h-4 w-4 text-rehberim-accent" />
          Günlük hedef
        </h3>
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={value}
              min={5}
              max={600}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-16 rounded-lg border border-rehberim-border px-2 py-1 text-sm text-rehberim-navy outline-none focus:border-rehberim-accent"
            />
            <span className="text-xs text-rehberim-navy/50">dk</span>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-rehberim-navy p-1.5 text-white transition hover:bg-rehberim-navy-dark"
              aria-label="Kaydet"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-xs font-semibold text-rehberim-navy/50 transition hover:text-rehberim-navy"
          >
            <Pencil className="h-3.5 w-3.5" />
            Düzenle
          </button>
        )}
      </div>

      <p className="mb-2 text-sm text-rehberim-navy/70">
        Bugün{" "}
        <strong className="text-rehberim-navy">{todayMinutes} dk</strong> /{" "}
        {current} dk
        {reached && <span className="ml-2 text-rehberim-accent">🎯 Tamamlandı!</span>}
      </p>
      <div className="h-3 w-full overflow-hidden rounded-full bg-rehberim-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rehberim-accent to-rehberim-accent-light transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
