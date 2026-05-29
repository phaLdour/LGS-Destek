export type Flashcard = {
  front: string;
  back: string;
};

export type MindMapBranch = {
  label: string;
  /** Eski basit özet (geriye dönük). sections verilmezse bu gösterilir. */
  detail?: string;
  /** Yeni: dala basınca çıkan kategorili alt kartlar (Formül, Örnek, Tuzak...). */
  sections?: MindMapSection[];
};

/** Konu haritası alt kartı türleri (her birinin rengi/ikonu farklıdır). */
export type MindMapSectionKind =
  | "tanim"
  | "kural"
  | "formul"
  | "ornek"
  | "tuzak"
  | "istisna"
  | "ipucu"
  | "soru";

export type MindMapSection = {
  kind: MindMapSectionKind;
  /** İsteğe bağlı kısa başlık (yoksa türün varsayılan adı kullanılır). */
  title?: string;
  content: string;
};

export type MindMap = {
  center: string;
  branches: MindMapBranch[];
};

export type LgsTip = {
  /** Tuzak / kural açıklaması */
  trap: string;
  /** LGS'de yanıltmak için kullanılan yanlış/yanıltıcı ifade */
  wrong: string;
  /** Doğrusu */
  correct: string;
};

export type QuizQuestion = {
  question: string;
  /** 4 şık (A, B, C, D sırasıyla) */
  options: string[];
  /** Doğru şıkkın indeksi (0-3) */
  correctIndex: number;
  /** İncelemede gösterilen kısa açıklama */
  explanation?: string;
};

export type Topic = {
  id: string;
  name: string;
  /** Kısa tanıtım metni (konu listesinde görünür) */
  summary: string;
  /** YouTube video kimliği (ör. "dQw4w9WgXcQ"). Boşsa video bölümü gizlenir. */
  youtubeId?: string;
  /** Konu (zihin) haritası: merkez + dallar. Boşsa o bölüm gizlenir. */
  mindMap?: MindMap;
  /** Çalışma kartları (flashcard). Boşsa o bölüm gizlenir. */
  cards?: Flashcard[];
  /** Uzun makale içeriği (paragraflar \n\n ile ayrılır; satır "## " ile başlarsa başlık). */
  article?: string;
  /** LGS tuzak ipuçları (yanlış vs doğru). Boşsa o bölüm gizlenir. */
  tips?: LgsTip[];
  /** 8 soruluk LGS testi. Boşsa o bölüm gizlenir. */
  quiz?: QuizQuestion[];
};

export type SubjectContent = {
  slug: string;
  name: string;
  topics: Topic[];
};
