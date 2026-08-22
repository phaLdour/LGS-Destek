"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Circle, Loader2, Video } from "lucide-react";
import type { Topic } from "@/content/types";
import {
  getTopicProgress,
  setTopicStatus,
  type TopicStatus,
} from "@/lib/tracking";

export function TopicList({
  subjectSlug,
  topics,
}: {
  subjectSlug: string;
  topics: Topic[];
}) {
  const [progress, setProgress] = useState<Record<string, TopicStatus>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getTopicProgress(subjectSlug).then((p) => {
      if (alive) {
        setProgress(p);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [subjectSlug]);

  const doneCount = topics.filter((t) => progress[t.id] === "done").length;
  const pct = topics.length ? Math.round((doneCount / topics.length) * 100) : 0;

  async function toggleDone(topicId: string) {
    const next: TopicStatus = progress[topicId] === "done" ? "in_progress" : "done";
    setBusy(topicId);
    setProgress((p) => ({ ...p, [topicId]: next }));
    await setTopicStatus(subjectSlug, topicId, next);
    setBusy(null);
  }

  return (
    <div className="space-y-4">
      {/* ilerleme */}
      <div className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-bold text-rehberim-navy">İlerleme</span>
          <span className="font-semibold text-rehberim-navy/60">
            {doneCount}/{topics.length} konu · %{pct}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-rehberim-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rehberim-accent to-rehberim-accent-light transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* konular */}
      <ul className="space-y-2">
        {topics.map((t) => {
          const status = progress[t.id];
          return (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-2xl border border-rehberim-border bg-white p-3 shadow-card transition hover:border-rehberim-accent/40"
            >
              <button
                onClick={() => toggleDone(t.id)}
                disabled={loading || busy === t.id}
                aria-label={status === "done" ? "Bitti olarak işaretli" : "Bitti olarak işaretle"}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition ${
                  status === "done"
                    ? "border-rehberim-accent bg-rehberim-accent text-white"
                    : "border-rehberim-border bg-white text-rehberim-navy/30 hover:text-rehberim-navy/60"
                }`}
              >
                {busy === t.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "done" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>

              <Link href={`/ders/${subjectSlug}/${t.id}`} className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-sm font-bold text-rehberim-navy">
                  <span className="truncate">{t.name}</span>
                  {(t.video?.src || t.youtubeId) && (
                    <span
                      title="Konu videosu var"
                      aria-label="Konu videosu var"
                      className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-rehberim-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rehberim-accent-dark"
                    >
                      <Video className="h-3 w-3" />
                      Video
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-rehberim-navy/55">
                  {t.summary}
                </p>
              </Link>

              <Link
                href={`/ders/${subjectSlug}/${t.id}`}
                aria-label={`${t.name} konusunu aç`}
                className="text-rehberim-navy/30 transition hover:text-rehberim-navy"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
