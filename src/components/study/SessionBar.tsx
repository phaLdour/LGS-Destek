"use client";

import { Square } from "lucide-react";
import { useStudySession } from "./StudySessionProvider";

export function SessionBar() {
  const { active, end } = useStudySession();
  if (!active) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-40 -translate-x-1/2 lg:bottom-6">
      <div className="flex items-center gap-3 rounded-full border border-rehberim-border bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rehberim-accent opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rehberim-accent" />
        </span>
        <span className="text-sm font-semibold text-rehberim-navy">
          Çalışma sürüyor
        </span>
        <button
          onClick={() => end()}
          className="flex items-center gap-1.5 rounded-full bg-rehberim-navy px-3.5 py-1.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
        >
          <Square className="h-3.5 w-3.5 fill-current" />
          Dersi Bitir
        </button>
      </div>
    </div>
  );
}
