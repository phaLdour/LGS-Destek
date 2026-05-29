import type { SubjectContent, Topic } from "./types";
import { FEN_BILIMLERI } from "./fen-bilimleri";
import { TURKCE } from "./turkce";

const CONTENT: Record<string, SubjectContent> = {
  [FEN_BILIMLERI.slug]: FEN_BILIMLERI,
  [TURKCE.slug]: TURKCE,
};

/** İçeriği olan ders varsa döner, yoksa null (ders sayfası "yakında" gösterir). */
export function getSubjectContent(slug: string): SubjectContent | null {
  return CONTENT[slug] ?? null;
}

export function getTopic(slug: string, topicId: string): Topic | null {
  const subject = getSubjectContent(slug);
  return subject?.topics.find((t) => t.id === topicId) ?? null;
}

export type { SubjectContent, Topic };
