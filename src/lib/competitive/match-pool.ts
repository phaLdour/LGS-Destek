import "server-only";

import { collectAllQuestions } from "@/lib/quickQuiz";
import type { QuickScope } from "@/lib/quickQuiz-types";

/**
 * Rekabet maçı için 10 stable soru id'si hazırlar (subject/topic#index
 * formatında). Fisher-Yates ile karıştırıp ilk 10'u alır.
 *
 * `subjectFilter` null/undefined → karma-all (tüm dersler);
 * dolu → karma-subject (yalnız o ders).
 *
 * Geçerli soru sayısı 10'dan azsa null döner — route 422 vermeli.
 */
export function pickQuestionIds(subjectFilter: string | null): string[] | null {
  const scope: QuickScope = subjectFilter
    ? { kind: "karma-subject", subject: subjectFilter }
    : { kind: "karma-all" };
  const all = collectAllQuestions(scope);
  if (all.length < 10) return null;

  // Fisher-Yates karıştırma
  const arr = all.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 10).map((q) => q.id);
}

/**
 * Verilen subject slug ders listesinde var mı? Boş/null kabul edilir
 * (karma-all). Route validasyonu için.
 */
export function isValidSubjectFilter(slug: string | null): boolean {
  if (!slug) return true;
  // Subject slugları içerik index'inden bilinir, ama burada da hızlı sabit liste
  // kullanırız (içerik modülü import edip slug çekmek aynı kapı, ama bu daha hafif).
  const valid = new Set([
    "turkce",
    "matematik",
    "fen-bilimleri",
    "inkilap",
    "din",
    "ingilizce",
  ]);
  return valid.has(slug);
}
