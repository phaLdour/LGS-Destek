"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import {
  formatTimeUntilSeasonEnd,
  seasonForDate,
} from "@/lib/competitive/seasons";

/**
 * Sezon geri sayım rozeti — mevcut sezonun adı + kalan süreyi gösterir.
 * Dakikada bir güncellenir (sayaç saniye kesinliği gerektirmiyor).
 */
export function SeasonResetCountdown({
  className,
}: {
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // SSR sırasında sabit bir genişlikte iskelet
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-semibold text-rehberim-navy/55 ${className ?? ""}`}
      >
        <CalendarClock className="h-4 w-4" />
        Sezon bilgisi yükleniyor…
      </div>
    );
  }

  const season = seasonForDate(now);
  const remaining = formatTimeUntilSeasonEnd(now);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-semibold text-rehberim-navy/75 shadow-card ${className ?? ""}`}
    >
      <CalendarClock className="h-4 w-4 text-rehberim-accent" />
      <span>
        <span className="text-rehberim-navy">{season.label}</span>
        <span className="text-rehberim-navy/55"> sezonu</span>
        <span className="mx-1 text-rehberim-navy/30">·</span>
        <span className="tabular-nums">{remaining} kaldı</span>
      </span>
    </div>
  );
}
