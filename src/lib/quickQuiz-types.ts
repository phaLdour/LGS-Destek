import type { QuizQuestion } from "@/content/types";

/** Hızlı Sorular kapsam tanımı (client + server'da ortak tip). */
export type QuickScope =
  | { kind: "topic"; subject: string; topic: string }
  | { kind: "karma-subject"; subject: string }
  | { kind: "karma-all" };

/** Pool'daki tek bir soru girdisi. Kimliği sona ekleme yaparken stabil. */
export type PoolQuestion = {
  id: string;
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  question: QuizQuestion;
};
