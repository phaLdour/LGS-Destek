"use client";

import { Play } from "lucide-react";
import { useStudySession } from "./StudySessionProvider";

export function StartLessonButton({ subjectSlug }: { subjectSlug: string }) {
  const { active, start } = useStudySession();

  if (active) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 px-4 py-3 text-sm font-semibold text-rehberim-navy">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rehberim-accent opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rehberim-accent" />
        </span>
        Çalışma sürüyor — bitirmek için alttaki “Dersi Bitir”e bas.
      </div>
    );
  }

  return (
    <button
      onClick={() => start(subjectSlug)}
      className="flex items-center justify-center gap-2 rounded-2xl bg-rehberim-accent px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-rehberim-accent-dark"
    >
      <Play className="h-5 w-5 fill-current" />
      Derse Başla
    </button>
  );
}
