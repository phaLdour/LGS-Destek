import type { SubjectContent, Topic } from "./types";
import { FEN_BILIMLERI } from "./fen-bilimleri";
import { TURKCE } from "./turkce";
import { INKILAP } from "./inkilap";
import { MATEMATIK } from "./matematik";
import { DIN } from "./din";
import { INGILIZCE } from "./ingilizce";

const CONTENT: Record<string, SubjectContent> = {
  [FEN_BILIMLERI.slug]: FEN_BILIMLERI,
  [TURKCE.slug]: TURKCE,
  [INKILAP.slug]: INKILAP,
  [MATEMATIK.slug]: MATEMATIK,
  [DIN.slug]: DIN,
  [INGILIZCE.slug]: INGILIZCE,
};

/** İçeriği olan ders varsa döner, yoksa null (ders sayfası "yakında" gösterir). */
export function getSubjectContent(slug: string): SubjectContent | null {
  return CONTENT[slug] ?? null;
}

/** İçerikli tüm derslerin listesi (Hızlı Sorular karma havuzu için). */
export function getAllSubjects(): SubjectContent[] {
  return Object.values(CONTENT);
}

export function getTopic(slug: string, topicId: string): Topic | null {
  const subject = getSubjectContent(slug);
  return subject?.topics.find((t) => t.id === topicId) ?? null;
}

/** İçeriği olan tüm konuların listesi (AI'ın "Konuyu çöz" yönlendirmesi için). */
export function getTopicCatalog(): {
  route: string;
  subjectName: string;
  topicName: string;
}[] {
  const out: { route: string; subjectName: string; topicName: string }[] = [];
  for (const subject of Object.values(CONTENT)) {
    for (const t of subject.topics) {
      out.push({
        route: `/ders/${subject.slug}/${t.id}`,
        subjectName: subject.name,
        topicName: t.name,
      });
    }
  }
  return out;
}

export type { SubjectContent, Topic };
