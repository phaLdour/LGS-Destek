import type { PastExamMeta, PastExamYear, ExamSection } from "./types";

/**
 * 2018-2025 LGS sınavları arşivi.
 *
 * Her yıl iki bölüm: Sözel (75 dk / 50 soru) ve Sayısal (80 dk / 40 soru).
 * PDF'ler `public/cikmis-sorular/{yil}-{bolum}.pdf` altında durur.
 * Dosya yoksa indirme butonu pasif görünür.
 *
 * İnteraktif çözüm için `questions` alanı dolu olmalı; aşamalı olarak
 * (önce 2025 pilot) eklenir.
 *
 * Kaynak: MEB ÖDSGM — odsgm.meb.gov.tr
 */

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
    source: "MEB ÖDSGM (odsgm.meb.gov.tr)",
    // questions: ayrı dosyalarda tanımlanır; aşağıdaki try/catch ile yüklenir
  };
}

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

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
