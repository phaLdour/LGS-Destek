import type { QuizQuestion } from "@/content/types";
import { getAllSubjects, getSubjectContent } from "@/content";

/**
 * Hızlı Sorular havuzu yönetimi.
 * Soru kimliği: `${subjectSlug}/${topicId}#${index}`. Diziyi yalnız SONA EKLEME
 * yaparak değiştirdiğimiz sürece index stabil kalır.
 */

const STORAGE_KEY = "rehberim:quick-solved";

export type QuickScope =
  | { kind: "topic"; subject: string; topic: string }
  | { kind: "karma-subject"; subject: string }
  | { kind: "karma-all" };

export type PoolQuestion = {
  /** Kalıcı kimlik */
  id: string;
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  question: QuizQuestion;
};

// ─── Storage yardımcıları ─────────────────────────────────────────

function readSolved(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function writeSolved(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // yoksay (kota dolmuş olabilir)
  }
}

export function markSolved(id: string) {
  const s = readSolved();
  s.add(id);
  writeSolved(s);
}

/** Kapsamdaki tüm çözüldü işaretlerini temizler (Yeniden başlat). */
export function resetScope(scope: QuickScope) {
  const all = readSolved();
  const items = collectAllQuestions(scope);
  for (const it of items) all.delete(it.id);
  writeSolved(all);
}

// ─── Havuz toplama ────────────────────────────────────────────────

/** Kapsamdaki tüm soruları (çözülmüş olsun olmasın) döner. */
export function collectAllQuestions(scope: QuickScope): PoolQuestion[] {
  if (scope.kind === "topic") {
    const subj = getSubjectContent(scope.subject);
    if (!subj) return [];
    const topic = subj.topics.find((t) => t.id === scope.topic);
    if (!topic?.quickQuestions?.length) return [];
    return topic.quickQuestions.map((q, i) => ({
      id: `${subj.slug}/${topic.id}#${i}`,
      subjectSlug: subj.slug,
      subjectName: subj.name,
      topicId: topic.id,
      topicName: topic.name,
      question: q,
    }));
  }
  if (scope.kind === "karma-subject") {
    const subj = getSubjectContent(scope.subject);
    if (!subj) return [];
    const out: PoolQuestion[] = [];
    for (const t of subj.topics) {
      if (!t.quickQuestions?.length) continue;
      t.quickQuestions.forEach((q, i) =>
        out.push({
          id: `${subj.slug}/${t.id}#${i}`,
          subjectSlug: subj.slug,
          subjectName: subj.name,
          topicId: t.id,
          topicName: t.name,
          question: q,
        }),
      );
    }
    return out;
  }
  // karma-all
  const out: PoolQuestion[] = [];
  for (const subj of getAllSubjects()) {
    for (const t of subj.topics) {
      if (!t.quickQuestions?.length) continue;
      t.quickQuestions.forEach((q, i) =>
        out.push({
          id: `${subj.slug}/${t.id}#${i}`,
          subjectSlug: subj.slug,
          subjectName: subj.name,
          topicId: t.id,
          topicName: t.name,
          question: q,
        }),
      );
    }
  }
  return out;
}

/** Çözülmüşleri çıkararak, karıştırılmış havuzu döner. */
export function getQuickPool(scope: QuickScope): PoolQuestion[] {
  const all = collectAllQuestions(scope);
  const solved = readSolved();
  const remaining = all.filter((p) => !solved.has(p.id));
  // Fisher-Yates karıştırma
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }
  return remaining;
}

/** Kapsamdaki toplam soru sayısı ve çözülen sayısı. */
export function getPoolStats(scope: QuickScope): { total: number; solved: number } {
  const all = collectAllQuestions(scope);
  const solvedSet = readSolved();
  const solved = all.filter((p) => solvedSet.has(p.id)).length;
  return { total: all.length, solved };
}
