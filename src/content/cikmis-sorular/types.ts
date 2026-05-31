export type ExamSection = "sozel" | "sayisal";

export type PastExamMeta = {
  /** Sınav yılı (2018-2025) */
  year: number;
  /** Sözel veya Sayısal */
  section: ExamSection;
  /** Sınav adı (UI gösterimi için) */
  label: string;
  /** Toplam soru sayısı (sözel 50, sayısal 40) */
  totalQuestions: number;
  /** Süre (dakika) — sözel 75, sayısal 80 */
  durationMinutes: number;
  /** PDF dosya yolu (public/ altından). Yoksa indirme butonu disabled. */
  pdfPath?: string;
  /** Kaynak (atıf) — MEB ÖDSGM linki */
  source?: string;
};

export type PastExamYear = {
  year: number;
  sozel: PastExamMeta;
  sayisal: PastExamMeta;
};
