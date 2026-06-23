import "server-only";

import { getSubjectContent } from "@/content";

/**
 * Rekabet maçında MEVCUT soruyu istemciye yansıtmak için sızdırılmayan
 * görüntü tipi. Doğru cevap (`correctIndex`) ve açıklama (`explanation`)
 * BU TİPTE TUTULMAZ — TypeScript derleme zamanı bunları client'a
 * gönderme yolunu kapatır.
 */
export type MatchQuestionView = {
  /** Stabil id: "subject/topic#index" */
  questionId: string;
  /** 0..9 sırasındaki indeksi (UI başlık için) */
  qIndex: number;
  /** Soru gövdesi */
  question: string;
  /** 4 şık A-D sırasıyla */
  options: string[];
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
};

/**
 * Replay'de (maç bittikten sonra) doğru cevap ve açıklama da gönderilir.
 * Yalnız `/rekabet/[id]/sonuc` server component'inden — comp_matches
 * status='finished' kontrolü yapıldıktan sonra — kullanılmalı.
 */
export type MatchReplayQuestion = MatchQuestionView & {
  correctIndex: number;
  explanation?: string;
};

/**
 * `subject/topic#index` formatındaki stable id'yi parse eder.
 * Hatalı format için null döner.
 */
function parseQuestionId(
  qid: string,
): { subjectSlug: string; topicId: string; index: number } | null {
  // Beklenen: "matematik/ondalik-gosterimler#7"
  const hashAt = qid.lastIndexOf("#");
  if (hashAt < 0) return null;
  const left = qid.slice(0, hashAt);
  const indexStr = qid.slice(hashAt + 1);
  const index = Number(indexStr);
  if (!Number.isFinite(index) || index < 0) return null;
  const slashAt = left.indexOf("/");
  if (slashAt < 0) return null;
  return {
    subjectSlug: left.slice(0, slashAt),
    topicId: left.slice(slashAt + 1),
    index,
  };
}

/**
 * Maç sırasında soru görüntüsü (correctIndex yok).
 * Geçersiz id veya eksik içerik → null.
 */
export function getMatchQuestion(
  questionIds: string[],
  qIndex: number,
): MatchQuestionView | null {
  if (qIndex < 0 || qIndex >= questionIds.length) return null;
  const parsed = parseQuestionId(questionIds[qIndex]);
  if (!parsed) return null;
  const subject = getSubjectContent(parsed.subjectSlug);
  if (!subject) return null;
  const topic = subject.topics.find((t) => t.id === parsed.topicId);
  if (!topic) return null;
  const q = topic.quickQuestions?.[parsed.index];
  if (!q) return null;
  return {
    questionId: questionIds[qIndex],
    qIndex,
    question: q.question,
    options: q.options,
    subjectSlug: subject.slug,
    subjectName: subject.name,
    topicId: topic.id,
    topicName: topic.name,
  };
}

/**
 * Yalnızca server'da kullanılır: anti-cheat için doğru cevap indeksini
 * verir. Hatalı id'de -1 döner (route reddetmeli).
 */
export function getCorrectIndex(
  questionIds: string[],
  qIndex: number,
): number {
  if (qIndex < 0 || qIndex >= questionIds.length) return -1;
  const parsed = parseQuestionId(questionIds[qIndex]);
  if (!parsed) return -1;
  const subject = getSubjectContent(parsed.subjectSlug);
  if (!subject) return -1;
  const topic = subject.topics.find((t) => t.id === parsed.topicId);
  if (!topic) return -1;
  const q = topic.quickQuestions?.[parsed.index];
  if (!q) return -1;
  return q.correctIndex;
}

/**
 * Replay'de tam soru (correctIndex + explanation dahil).
 * Yalnız maç bittikten sonra çağrılmalı — çağrı yerinde
 * comp_matches status='finished' doğrulanmış olmalıdır.
 */
export function getMatchReplayQuestion(
  questionIds: string[],
  qIndex: number,
): MatchReplayQuestion | null {
  const view = getMatchQuestion(questionIds, qIndex);
  if (!view) return null;
  const correctIndex = getCorrectIndex(questionIds, qIndex);
  if (correctIndex < 0) return null;
  const parsed = parseQuestionId(questionIds[qIndex])!;
  const subject = getSubjectContent(parsed.subjectSlug)!;
  const topic = subject.topics.find((t) => t.id === parsed.topicId)!;
  const q = topic.quickQuestions![parsed.index];
  return {
    ...view,
    correctIndex,
    explanation: q.explanation,
  };
}
