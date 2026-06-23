"use client";

import { useEffect, useState } from "react";

/**
 * Sayıyı 0'dan hedef değere requestAnimationFrame ile easeOut interpolate
 * ederek animasyonlu gösterir. Pozitifte yeşil, negatifte kırmızı, sıfırda
 * gri. `prefers-reduced-motion` etkinse anlık gösterir.
 */
export function DeltaAnimator({
  to,
  durationMs = 1200,
  className,
}: {
  to: number;
  durationMs?: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);

  const color =
    to > 0
      ? "text-emerald-600"
      : to < 0
        ? "text-red-600"
        : "text-rehberim-navy/55";
  const sign = to > 0 ? "+" : "";
  return (
    <span className={`tabular-nums font-extrabold ${color} ${className ?? ""}`}>
      {sign}
      {value}
    </span>
  );
}
