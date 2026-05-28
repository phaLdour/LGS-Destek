"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSubjectContent } from "@/content";
import { saveSession } from "@/lib/tracking";

const STORAGE_KEY = "rehberim:study-session";

type SessionState = {
  subjectSlug: string;
  startedAt: string;
  studiedTopics: string[];
  correct: number;
  wrong: number;
};

export type SessionSummary = {
  subjectSlug: string;
  durationSeconds: number;
  studiedTopicNames: string[];
  correct: number;
  wrong: number;
  saving: boolean;
  saved: boolean;
};

type Ctx = {
  active: boolean;
  subjectSlug: string | null;
  start: (subjectSlug: string) => void;
  end: () => void;
  markTopic: (topicId: string) => void;
  recordAnswer: (correct: boolean) => void;
  summary: SessionSummary | null;
  closeSummary: () => void;
};

const StudySessionContext = createContext<Ctx | null>(null);

export function useStudySession(): Ctx {
  const ctx = useContext(StudySessionContext);
  if (!ctx)
    throw new Error("useStudySession StudySessionProvider içinde kullanılmalı");
  return ctx;
}

export function StudySessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // localStorage'dan yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw) as SessionState);
    } catch {
      // yoksay
    }
    setHydrated(true);
  }, []);

  // değişince kaydet
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // yoksay
    }
  }, [session, hydrated]);

  const start = (subjectSlug: string) => {
    setSession({
      subjectSlug,
      startedAt: new Date().toISOString(),
      studiedTopics: [],
      correct: 0,
      wrong: 0,
    });
  };

  const markTopic = (topicId: string) => {
    setSession((s) =>
      s && !s.studiedTopics.includes(topicId)
        ? { ...s, studiedTopics: [...s.studiedTopics, topicId] }
        : s,
    );
  };

  const recordAnswer = (correct: boolean) => {
    setSession((s) =>
      s
        ? {
            ...s,
            correct: s.correct + (correct ? 1 : 0),
            wrong: s.wrong + (correct ? 0 : 1),
          }
        : s,
    );
  };

  const end = async () => {
    if (!session) return;
    const durationSeconds = Math.max(
      0,
      (Date.now() - new Date(session.startedAt).getTime()) / 1000,
    );
    const content = getSubjectContent(session.subjectSlug);
    const studiedTopicNames = session.studiedTopics.map(
      (id) => content?.topics.find((t) => t.id === id)?.name ?? id,
    );

    setSummary({
      subjectSlug: session.subjectSlug,
      durationSeconds,
      studiedTopicNames,
      correct: session.correct,
      wrong: session.wrong,
      saving: true,
      saved: false,
    });
    const current = session;
    setSession(null);

    const ok = await saveSession({
      subjectSlug: current.subjectSlug,
      durationSeconds,
      studiedTopics: current.studiedTopics,
      correctCount: current.correct,
      wrongCount: current.wrong,
      startedAt: current.startedAt,
    });
    setSummary((prev) => (prev ? { ...prev, saving: false, saved: ok } : prev));
  };

  const closeSummary = () => setSummary(null);

  return (
    <StudySessionContext.Provider
      value={{
        active: Boolean(session),
        subjectSlug: session?.subjectSlug ?? null,
        start,
        end,
        markTopic,
        recordAnswer,
        summary,
        closeSummary,
      }}
    >
      {children}
    </StudySessionContext.Provider>
  );
}
