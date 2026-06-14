import type { PastExamMeta, PastExamYear, ExamSection, PastQuestion } from "./types";
import { SOZEL_2018, SAYISAL_2018 } from "./2018";
import { SOZEL_2019, SAYISAL_2019 } from "./2019";
import { SOZEL_2020, SAYISAL_2020 } from "./2020";
import { SOZEL_2021, SAYISAL_2021 } from "./2021";
import { SOZEL_2022, SAYISAL_2022 } from "./2022";
import { SOZEL_2023, SAYISAL_2023 } from "./2023";
import { SOZEL_2024, SAYISAL_2024 } from "./2024";
import { SOZEL_2025, SAYISAL_2025 } from "./2025";
import { SOZEL_2026, SAYISAL_2026 } from "./2026";

/**
 * 2018-2026 LGS sınavları arşivi.
 *
 * Her yıl iki bölüm: Sözel (75 dk / 50 soru) ve Sayısal (80 dk / 40 soru).
 * PDF'ler `public/cikmis-sorular/{yil}-{bolum}.pdf` altında durur.
 * Dosya yoksa indirme butonu pasif görünür.
 *
 * 9 yılın hepsi interaktif çözüme açık — sorular kitapçıktan kesilmiş
 * PNG görüntüler, doğru cevaplar resmî A KİTAPÇIĞI cevap anahtarından.
 *
 * Kaynak: MEB ÖDSGM — odsgm.meb.gov.tr
 */

const QUESTIONS_BY_YEAR: Record<number, { sozel: PastQuestion[]; sayisal: PastQuestion[] }> = {
  2018: { sozel: SOZEL_2018, sayisal: SAYISAL_2018 },
  2019: { sozel: SOZEL_2019, sayisal: SAYISAL_2019 },
  2020: { sozel: SOZEL_2020, sayisal: SAYISAL_2020 },
  2021: { sozel: SOZEL_2021, sayisal: SAYISAL_2021 },
  2022: { sozel: SOZEL_2022, sayisal: SAYISAL_2022 },
  2023: { sozel: SOZEL_2023, sayisal: SAYISAL_2023 },
  2024: { sozel: SOZEL_2024, sayisal: SAYISAL_2024 },
  2025: { sozel: SOZEL_2025, sayisal: SAYISAL_2025 },
  2026: { sozel: SOZEL_2026, sayisal: SAYISAL_2026 },
};

/** Yıl+bölüm için interaktif soru havuzu (varsa). */
function questionsFor(
  year: number,
  section: ExamSection,
): PastQuestion[] | undefined {
  const y = QUESTIONS_BY_YEAR[year];
  if (!y) return undefined;
  return section === "sozel" ? y.sozel : y.sayisal;
}

function mk(
  year: number,
  section: ExamSection,
): PastExamMeta {
  const total = section === "sozel" ? 50 : 40;
  const minutes = section === "sozel" ? 75 : 80;
  const sectionLabel = section === "sozel" ? "Sözel Bölüm" : "Sayısal Bölüm";
  return {
    year,
    section,
    label: `${year} LGS ${sectionLabel}`,
    totalQuestions: total,
    durationMinutes: minutes,
    pdfPath: `/cikmis-sorular/${year}-${section}.pdf`,
    questions: questionsFor(year, section),
    source: "MEB ÖDSGM (odsgm.meb.gov.tr)",
  };
}

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

export const PAST_EXAMS: PastExamYear[] = YEARS.map((y) => ({
  year: y,
  sozel: mk(y, "sozel"),
  sayisal: mk(y, "sayisal"),
}));

export function getPastExamYear(year: number): PastExamYear | null {
  return PAST_EXAMS.find((y) => y.year === year) ?? null;
}

export function getPastExam(
  year: number,
  section: ExamSection,
): PastExamMeta | null {
  const y = getPastExamYear(year);
  if (!y) return null;
  return section === "sozel" ? y.sozel : y.sayisal;
}

export const PAST_EXAM_YEARS = YEARS;
