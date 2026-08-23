import { getSubjectContent } from "@/content";
import { ADVANCED_QUESTIONS } from "@/content/advanced-questions";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";
import type { PoolQuestion } from "./quickQuiz-types";
import { collectAllQuestions } from "./quickQuiz";

/**
 * Deneme sınavı türleri ve LGS gerçek formatına uygun konfigürasyonları.
 * MEB LGS formatı:
 *  - Sözel: 75 dk / 50 soru (Türkçe 20 + T.C. İnkılap 10 + Din Kültürü 10 + İngilizce 10)
 *  - Sayısal: 80 dk / 40 soru (Matematik 20 + Fen Bilimleri 20)
 *  - Toplam: 90 soru / 155 dk
 *
 * Zorluk:
 *  - "kolay": Hızlı Sorular havuzundan rastgele
 *  - "zor": Önce yeni nesil zor sorulardan (paragraf, çoklu işlem, yorum);
 *           yetmezse aynı dersin kolay sorularıyla tamamlanır. Zorda süre
 *           gerçek LGS süresinin %20 azı (zaman baskısı).
 */

export type ExamKind = "sozel" | "sayisal" | "tam";
export type ExamDifficulty = "kolay" | "zor";

export type ExamConfig = {
  kind: ExamKind;
  difficulty: ExamDifficulty;
  label: string;
  durationMinutes: number;
  distribution: { subject: string; subjectName: string; count: number }[];
  totalQuestions: number;
};

const SOZEL_DIST = [
  { subject: "turkce", subjectName: "Türkçe", count: 20 },
  { subject: "inkilap", subjectName: "T.C. İnkılap Tarihi", count: 10 },
  { subject: "din", subjectName: "Din Kültürü", count: 10 },
  { subject: "ingilizce", subjectName: "İngilizce", count: 10 },
];

const SAYISAL_DIST = [
  { subject: "matematik", subjectName: "Matematik", count: 20 },
  { subject: "fen-bilimleri", subjectName: "Fen Bilimleri", count: 20 },
];

const BASE_DURATIONS: Record<ExamKind, number> = {
  sozel: 75,
  sayisal: 80,
  tam: 155,
};

const KIND_LABELS: Record<ExamKind, string> = {
  sozel: "Sözel Bölüm",
  sayisal: "Sayısal Bölüm",
  tam: "Tam Deneme (Sözel + Sayısal)",
};

const KIND_TOTALS: Record<ExamKind, number> = {
  sozel: 50,
  sayisal: 40,
  tam: 90,
};

function distFor(kind: ExamKind) {
  if (kind === "sozel") return SOZEL_DIST;
  if (kind === "sayisal") return SAYISAL_DIST;
  return [...SOZEL_DIST, ...SAYISAL_DIST];
}

export function getExamConfig(
  kind: ExamKind,
  difficulty: ExamDifficulty = "kolay",
): ExamConfig {
  // Süre her zaman gerçek LGS süresine eşittir; zorluk yalnız soru havuzunu
  // değiştirir (zor → yeni nesil sorular).
  const minutes = BASE_DURATIONS[kind];
  const label =
    difficulty === "zor"
      ? `${KIND_LABELS[kind]} — Zor`
      : `${KIND_LABELS[kind]} — Kolay`;
  return {
    kind,
    difficulty,
    label,
    durationMinutes: minutes,
    distribution: distFor(kind),
    totalQuestions: KIND_TOTALS[kind],
  };
}

export const EXAM_KINDS: ExamKind[] = ["sozel", "sayisal", "tam"];
export const EXAM_DIFFICULTIES: ExamDifficulty[] = ["kolay", "zor"];

/** Fisher-Yates karıştırma. */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Bir dersin tüm zor sorularını PoolQuestion formatına çevirip döner. */
function collectAdvancedForSubject(subjectSlug: string): PoolQuestion[] {
  const subj = getSubjectContent(subjectSlug);
  if (!subj) return [];
  const out: PoolQuestion[] = [];
  for (const t of subj.topics) {
    const advanced = ADVANCED_QUESTIONS[`${subjectSlug}/${t.id}`];
    if (!advanced?.length) continue;
    advanced.forEach((q, i) =>
      out.push({
        // Zor soruların id'si "subject/topic#adv{index}" → kolaylardan ayrılır
        id: `${subjectSlug}/${t.id}#adv${i}`,
        subjectSlug,
        subjectName: subj.name,
        topicId: t.id,
        topicName: t.name,
        // Zor havuz da aynı şık-sırası eğiliminden etkileniyor (90 sorunun
        // 85'i A). Kolay havuz @/content içinde karıştırılıyor; bu havuz
        // oradan geçmediği için burada karıştırılır.
        question: shuffleQuestionOptions(q),
      }),
    );
  }
  return out;
}

/**
 * Server-side: deneme için soru havuzu çeker.
 * Kolay: karma-subject havuzundan.
 * Zor: önce ADVANCED_QUESTIONS havuzundan, yetmezse kolay havuzdan tamamlanır.
 *
 * Sözel + Sayısal'da bölümler arası sıralı çıkar (önce sözel, sonra sayısal).
 */
export function buildExamPool(
  kind: ExamKind,
  difficulty: ExamDifficulty = "kolay",
): PoolQuestion[] {
  const cfg = getExamConfig(kind, difficulty);
  const out: PoolQuestion[] = [];

  for (const slot of cfg.distribution) {
    const easyAll = collectAllQuestions({
      kind: "karma-subject",
      subject: slot.subject,
    });

    if (difficulty === "kolay") {
      const picked = shuffle(easyAll).slice(0, slot.count);
      out.push(...picked);
      continue;
    }

    // Zor: önce advanced'leri kullan
    const advanced = shuffle(collectAdvancedForSubject(slot.subject));
    const need = slot.count;
    const useAdvanced = advanced.slice(0, need);
    const remaining = need - useAdvanced.length;
    const easyFiller = remaining > 0 ? shuffle(easyAll).slice(0, remaining) : [];
    out.push(...useAdvanced, ...easyFiller);
  }

  return out;
}
