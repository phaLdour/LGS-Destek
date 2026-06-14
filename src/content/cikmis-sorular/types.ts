export type ExamSection = "sozel" | "sayisal";

/**
 * İnteraktif çözüm için tek bir çıkmış soru.
 * Soru metni/şekli görüntü olarak saklanır (kitapçıktan kesilmiş); böylece
 * grafikler/geometri birebir korunur ve hiçbir metin uydurulmaz.
 * Doğru cevap, kitapçığın resmî cevap anahtarından alınır.
 */
export type PastQuestion = {
  /** Ders gösterim adı (örn. "Türkçe") */
  subject: string;
  /** Ders slug'ı (turkce, matematik, fen, inkilap, din, ingilizce) */
  subjectSlug: string;
  /** Bu derste sorunun sıra numarası (1..N) */
  no: number;
  /** Kitapçıktan kesilmiş soru görüntüsü (public/ altından yol) */
  image: string;
  /** Doğru şıkkın indeksi (0=A, 1=B, 2=C, 3=D) */
  correctIndex: number;
};

export type PastExamMeta = {
  /** Sınav yılı (2018-2026) */
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
  /** İnteraktif çözüm soruları (görüntü tabanlı). Boşsa interaktif kapalı. */
  questions?: PastQuestion[];
  /** Kaynak (atıf) — MEB ÖDSGM linki */
  source?: string;
};

export type PastExamYear = {
  year: number;
  sozel: PastExamMeta;
  sayisal: PastExamMeta;
};
