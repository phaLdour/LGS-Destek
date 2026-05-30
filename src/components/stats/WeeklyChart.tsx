type Day = { label: string; minutes: number; isToday: boolean };

export function WeeklyChart({ data }: { data: Day[] }) {
  // Üst sınır: en uzun günü baz alır; her gün en az 1 dk çalışılsa bile
  // küçük farkların gözükmesi için minimum max 10 dk kabul edilir.
  const max = Math.max(10, ...data.map((d) => d.minutes));

  return (
    <div className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <h3 className="mb-4 text-sm font-bold text-rehberim-navy">
        Son 7 gün (dakika)
      </h3>
      <div className="flex h-36 items-end justify-between gap-2">
        {data.map((d, i) => {
          // Yükseklik orantılıdır: 7 dk olan gün, 3 dk olandan görsel
          // olarak daha yüksek olur. Çalışılan günler en az 4% yüksekliğinde
          // görünür (küçük turuncu bir çizgi); hiç çalışılmayan günler 2%
          // ince bir çizgi olarak kalır.
          const ratio = max > 0 ? (d.minutes / max) * 100 : 0;
          const h =
            d.minutes > 0 ? Math.max(4, Math.round(ratio)) : 2;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-rehberim-navy/50">
                {d.minutes > 0 ? d.minutes : ""}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-lg bg-gradient-to-t from-rehberim-accent-dark to-rehberim-accent transition-all ${
                    d.isToday
                      ? "ring-2 ring-rehberim-accent ring-offset-1"
                      : ""
                  }`}
                  style={{ height: `${h}%` }}
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
