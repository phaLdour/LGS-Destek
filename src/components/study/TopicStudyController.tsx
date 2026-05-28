"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import {
  getTopicProgress,
  setTopicStatus,
  type TopicStatus,
} from "@/lib/tracking";
import { useStudySession } from "./StudySessionProvider";

export function TopicStudyController({
  subjectSlug,
  topicId,
}: {
  subjectSlug: string;
  topicId: string;
}) {
  const { markTopic } = useStudySession();
  const [status, setStatus] = useState<TopicStatus | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  // Oturum aktifse bu konuyu "çalışıldı" olarak işaretle
  useEffect(() => {
    markTopic(topicId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  useEffect(() => {
    let alive = true;
    getTopicProgress(subjectSlug).then((p) => {
      if (alive) setStatus(p[topicId]);
    });
    return () => {
      alive = false;
    };
  }, [subjectSlug, topicId]);

  const done = status === "done";

  async function toggle() {
    const next: TopicStatus = done ? "in_progress" : "done";
    setBusy(true);
    setStatus(next);
    await setTopicStatus(subjectSlug, topicId, next);
    setBusy(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-soft transition ${
        done
          ? "bg-rehberim-accent text-white hover:bg-rehberim-accent-dark"
          : "bg-rehberim-navy text-white hover:bg-rehberim-navy-dark"
      }`}
    >
      {busy ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Check className="h-5 w-5" />
      )}
      {done ? "Bitirdim ✓" : "Bu konuyu bitirdim"}
    </button>
  );
}
