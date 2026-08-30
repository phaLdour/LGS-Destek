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
 *           yetmezse aynı dersin kolay sorularıyla tamamlanır.
 *
 * SÜRE her iki zorlukta da GERÇEK LGS SÜRESİDİR. (Bu yorum eskiden "zorda
 * süre %20 az" diyordu; kod öyle yapmıyor ve yapmamalı — deneme sınavının
 * amacı gerçek sınav koşulunu birebir taklit etmek. tests/deneme-havuzu
 * içindeki "zor deneme süreyi KISALTMAZ" testi bunu kilitler.)
 */

/**
 * Deneme türleri.
 *
 * "brans-*": tek derslik deneme. Gerçek LGS'deki ders başına soru sayısı ve
 * temposuyla birebir aynı — Türkçe/Matematik/Fen 20 soru, İnkılap/Din/
 * İngilizce 10 soru. Amaç bir dersi tek başına, sınav koşulunda ölçmek.
 */
export type BransKind =
  | "brans-turkce"
  | "brans-matematik"
  | "brans-fen"
  | "brans-inkilap"
  | "brans-din"
  | "brans-ingilizce";

export type ExamKind = "sozel" | "sayisal" | "tam" | BransKind;
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

/**
 * Branş denemesi tanımları.
 *
 * SÜRE gerçek LGS temposundan HESAPLANIR, uydurulmaz:
 *   sözel bölüm  75 dk / 50 soru = soru başına 1.5 dk
 *   sayısal bölüm 80 dk / 40 soru = soru başına 2 dk
 * Böylece branş denemesindeki tempo tam denemedekiyle aynı olur ve
 * öğrencinin net tahmini yanıltıcı çıkmaz.
 */
export const SOZEL_DK_PER_SORU = 75 / 50; // 1.5
export const SAYISAL_DK_PER_SORU = 80 / 40; // 2

export type BransTanim = {
  kind: BransKind;
  subject: string;
  subjectName: string;
  count: number;
  bolum: "sozel" | "sayisal";
};

export const BRANSLAR: BransTanim[] = [
  { kind: "brans-turkce",    subject: "turkce",        subjectName: "Türkçe",              count: 20, bolum: "sozel" },
  { kind: "brans-matematik", subject: "matematik",     subjectName: "Matematik",           count: 20, bolum: "sayisal" },
  { kind: "brans-fen",       subject: "fen-bilimleri", subjectName: "Fen Bilimleri",       count: 20, bolum: "sayisal" },
  { kind: "brans-inkilap",   subject: "inkilap",       subjectName: "T.C. İnkılap Tarihi", count: 10, bolum: "sozel" },
  { kind: "brans-din",       subject: "din",           subjectName: "Din Kültürü",         count: 10, bolum: "sozel" },
  { kind: "brans-ingilizce", subject: "ingilizce",     subjectName: "İngilizce",           count: 10, bolum: "sozel" },
];

export function bransTanim(kind: ExamKind): BransTanim | null {
  return BRANSLAR.find((b) => b.kind === kind) ?? null;
}

/** Gerçek LGS temposunda süre. Yukarı yuvarlanır ki hiç 0 çıkmasın. */
export function bransSuresiDk(b: BransTanim): number {
  const dk = b.bolum === "sayisal" ? SAYISAL_DK_PER_SORU : SOZEL_DK_PER_SORU;
  return Math.round(b.count * dk);
}

const BASE_DURATIONS: Record<"sozel" | "sayisal" | "tam", number> = {
  sozel: 75,
  sayisal: 80,
  tam: 155,
};

const KIND_LABELS: Record<"sozel" | "sayisal" | "tam", string> = {
  sozel: "Sözel Bölüm",
  sayisal: "Sayısal Bölüm",
  tam: "Tam Deneme (Sözel + Sayısal)",
};

const KIND_TOTALS: Record<"sozel" | "sayisal" | "tam", number> = {
  sozel: 50,
  sayisal: 40,
  tam: 90,
};

function distFor(kind: ExamKind) {
  const brans = bransTanim(kind);
  if (brans) {
    return [
      {
        subject: brans.subject,
        subjectName: brans.subjectName,
        count: brans.count,
      },
    ];
  }
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
  const brans = bransTanim(kind);
  const temelAd = brans
    ? `${brans.subjectName} Branş Denemesi`
    : KIND_LABELS[kind as "sozel" | "sayisal" | "tam"];
  const minutes = brans
    ? bransSuresiDk(brans)
    : BASE_DURATIONS[kind as "sozel" | "sayisal" | "tam"];
  const label =
    difficulty === "zor" ? `${temelAd} — Zor` : `${temelAd} — Kolay`;
  return {
    kind,
    difficulty,
    label,
    durationMinutes: minutes,
    distribution: distFor(kind),
    totalQuestions: brans
      ? brans.count
      : KIND_TOTALS[kind as "sozel" | "sayisal" | "tam"],
  };
}

export const EXAM_KINDS: ExamKind[] = [
  "sozel",
  "sayisal",
  "tam",
  ...BRANSLAR.map((b) => b.kind),
];
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
