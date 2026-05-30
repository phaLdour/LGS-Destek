import { getAllSubjects, getSubjectContent } from "@/content";
import type { PoolQuestion, QuickScope } from "./quickQuiz-types";

export type { PoolQuestion, QuickScope } from "./quickQuiz-types";

/**
 * Server-side: kapsamdaki tüm soruları (çözülmüş olsun olmasın) toplar.
 * Sayfa server component'inde çağrılır; sonuç prop olarak client'a verilir.
 * Bu sayede client bundle'a ders içerikleri sızmaz.
 */
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
