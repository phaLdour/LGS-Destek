export type Flashcard = {
  front: string;
  back: string;
};

export type MindMap = {
  center: string;
  branches: string[];
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
};

export type SubjectContent = {
  slug: string;
  name: string;
  topics: Topic[];
};
