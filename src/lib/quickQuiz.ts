import { getAllSubjects, getSubjectContent } from "@/content";
import type { PoolQuestion, QuickScope } from "./quickQuiz-types";

export type { PoolQuestion, QuickScope } from "./quickQuiz-types";

/**
 * ── Kopya soru filtresi ─────────────────────────────────────────────
 * İçerikte 28 soru hem konu testinde (LGS İpucu) hem hızlı soru
 * havuzunda birebir aynıydı; 1 soru da iki farklı konunun havuzunda.
 * Öğrenci aynı soruyu iki ayrı yerde görüyordu, deneme sınavı havuzu
 * da ikisini birden içerebiliyordu.
 *
 * Temizlik içerikte değil BURADA yapılır, çünkü soru kimlikleri
 * ("ders/konu#index") dizideki sıraya bağlıdır: içerikten satır silmek
 * sonraki tüm indexleri kaydırır ve öğrencilerin çözülmüş/yanlış
 * kayıtları başka sorulara işaret ederdi. Filtre, kimlikler atandıktan
 * SONRA uygulanır — kalan soruların kimliği hiç değişmez.
 */
function imza(q: { question: string; options: string[]; correctIndex: number }): string {
  return JSON.stringify([
    q.question.trim(),
    [...q.options].sort(),
    q.options[q.correctIndex],
  ]);
}

/** Konu testlerindeki (quiz) tüm soruların imzaları — modül yüklenirken bir kez. */
const quizImzalari: Set<string> = (() => {
  const set = new Set<string>();
  for (const s of getAllSubjects()) {
    for (const t of s.topics) {
      for (const q of t.quiz ?? []) set.add(imza(q));
    }
  }
  return set;
})();

/**
 * Havuzdan kopyaları ayıklar: konu testinde birebir bulunan sorular ve
 * bu koleksiyon içinde daha önce görülmüş sorular düşer. Kimlikler
 * korunur (filtre id atamasından sonra çalışır).
 */
function kopyalariAyikla(pool: PoolQuestion[]): PoolQuestion[] {
  const gorulen = new Set<string>();
  return pool.filter((p) => {
    const k = imza(p.question);
    if (quizImzalari.has(k)) return false;
    if (gorulen.has(k)) return false;
    gorulen.add(k);
    return true;
  });
}

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
    return kopyalariAyikla(
      topic.quickQuestions.map((q, i) => ({
        id: `${subj.slug}/${topic.id}#${i}`,
        subjectSlug: subj.slug,
        subjectName: subj.name,
        topicId: topic.id,
        topicName: topic.name,
        question: q,
      })),
    );
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
    return kopyalariAyikla(out);
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
  return kopyalariAyikla(out);
}

/**
 * Akıllı havuz: zayıf konuların soruları 2x kopyalanır → karıştırma
 * sonrası ağırlıkları artar. Boş weakTopics ile davranış collectAllQuestions
 * ile aynıdır.
 *
 * weakTopics: "subjectSlug/topicId" formatlı set.
 */
export function collectWeightedQuestions(
  scope: QuickScope,
  weakTopics: Set<string>,
): PoolQuestion[] {
  const base = collectAllQuestions(scope);
  if (weakTopics.size === 0) return base;
  const extra: PoolQuestion[] = [];
  for (const q of base) {
    if (weakTopics.has(`${q.subjectSlug}/${q.topicId}`)) {
      extra.push(q);
    }
  }
  return [...base, ...extra];
}
