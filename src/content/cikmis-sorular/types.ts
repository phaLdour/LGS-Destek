import type { QuizQuestion } from "@/content/types";

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
  /** İnteraktif çözüm için soru listesi. Boşsa "interaktif yakında". */
  questions?: PastQuestion[];
  /** Kaynak (atıf) — MEB ÖDSGM linki */
  source?: string;
};

export type PastQuestion = QuizQuestion & {
  /** Soru hangi dersten (sözel: turkce/inkilap/din/ingilizce, sayısal: matematik/fen-bilimleri) */
  subject:
    | "turkce"
    | "inkilap"
    | "din"
    | "ingilizce"
    | "matematik"
    | "fen-bilimleri";
  /** Görsel varsa public/ altından yol (ör. "/cikmis-sorular/2025/sozel/q7.png") */
  image?: string;
};

export type PastExamYear = {
  year: number;
  sozel: PastExamMeta;
  sayisal: PastExamMeta;
};
