import type { PoolQuestion } from "./quickQuiz-types";
import { collectAllQuestions } from "./quickQuiz";

/**
 * Deneme sınavı türleri ve LGS gerçek formatına uygun konfigürasyonları.
 * MEB LGS formatı:
 *  - Sözel: 75 dk / 50 soru (Türkçe 20 + T.C. İnkılap 10 + Din Kültürü 10 + İngilizce 10)
 *  - Sayısal: 80 dk / 40 soru (Matematik 20 + Fen Bilimleri 20)
 *  - Toplam: 90 soru / 155 dk
 */

export type ExamKind = "sozel" | "sayisal" | "tam";

export type ExamConfig = {
  kind: ExamKind;
  label: string;
  /** Toplam süre (dakika) */
  durationMinutes: number;
  /** Ders bazlı soru kotası */
  distribution: { subject: string; subjectName: string; count: number }[];
  /** Toplam soru sayısı */
  totalQuestions: number;
};

const SOZEL: ExamConfig = {
  kind: "sozel",
  label: "Sözel Bölüm",
  durationMinutes: 75,
  distribution: [
    { subject: "turkce", subjectName: "Türkçe", count: 20 },
    { subject: "inkilap", subjectName: "T.C. İnkılap Tarihi", count: 10 },
    { subject: "din", subjectName: "Din Kültürü", count: 10 },
    { subject: "ingilizce", subjectName: "İngilizce", count: 10 },
  ],
  totalQuestions: 50,
};

const SAYISAL: ExamConfig = {
  kind: "sayisal",
  label: "Sayısal Bölüm",
  durationMinutes: 80,
  distribution: [
    { subject: "matematik", subjectName: "Matematik", count: 20 },
    { subject: "fen-bilimleri", subjectName: "Fen Bilimleri", count: 20 },
  ],
  totalQuestions: 40,
};

const TAM: ExamConfig = {
  kind: "tam",
  label: "Tam Deneme (Sözel + Sayısal)",
  durationMinutes: 155, // sözel 75 + sayısal 80
  distribution: [...SOZEL.distribution, ...SAYISAL.distribution],
  totalQuestions: 90,
};

export const EXAM_CONFIGS: Record<ExamKind, ExamConfig> = {
  sozel: SOZEL,
  sayisal: SAYISAL,
  tam: TAM,
};

export function getExamConfig(kind: ExamKind): ExamConfig {
  return EXAM_CONFIGS[kind];
}

/** Fisher-Yates karıştırma (saf fonksiyon değil; gelen dizinin kopyasını döner). */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Server-side: deneme için soru havuzu çeker.
 * Her ders için karma-subject havuzundan rastgele N soru alır.
 * Soru yetmezse mevcut kadarını döner (uyarı UI tarafından gösterilir).
 *
 * Sözel + Sayısal'da bölümler arası sıralı çıkar (önce sözel, sonra sayısal).
 */
export function buildExamPool(kind: ExamKind): PoolQuestion[] {
  const cfg = getExamConfig(kind);
  const out: PoolQuestion[] = [];
  for (const slot of cfg.distribution) {
    const all = collectAllQuestions({
      kind: "karma-subject",
      subject: slot.subject,
    });
    const picked = shuffle(all).slice(0, slot.count);
    out.push(...picked);
  }
  return out;
}
