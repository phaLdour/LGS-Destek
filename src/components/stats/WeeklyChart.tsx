type Day = { label: string; minutes: number; isToday: boolean };

export function WeeklyChart({ data }: { data: Day[] }) {
  const max = Math.max(30, ...data.map((d) => d.minutes));

  return (
    <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <h3 className="mb-4 text-sm font-bold text-rehberim-navy">
        Son 7 gün (dakika)
      </h3>
      <div className="flex h-36 items-end justify-between gap-2">
        {data.map((d, i) => {
          const h = Math.round((d.minutes / max) * 100);
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-rehberim-navy/50">
                {d.minutes > 0 ? d.minutes : ""}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-lg transition-all ${
                    d.isToday
                      ? "bg-gradient-to-t from-rehberim-accent-dark to-rehberim-accent"
                      : "bg-gradient-to-t from-rehberim-navy to-rehberim-navy-light"
                  }`}
                  style={{ height: `${Math.max(d.minutes > 0 ? 6 : 2, h)}%` }}
                />
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  d.isToday ? "text-rehberim-accent" : "text-rehberim-navy/50"
                }`}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
