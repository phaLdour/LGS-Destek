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

/**
 * Sitede yerleşik oynatılan konu videosu (NotebookLM ile üretilip depoya
 * yüklenen MP4). Kayıtlar `src/content/videos.json` dosyasında tutulur ve
 * video otomasyonu (tools/video-pipeline) tarafından yazılır.
 */
export type TopicVideo = {
  /** MP4 (H.264 + AAC) adresi — tarayıcıda doğrudan oynatılır. */
  src: string;
  /** Kapak görseli (WebP/JPG). Yoksa oynatıcı ilk kareyi gösterir. */
  poster?: string;
  /** Süre (saniye). Oynatıcı yüklenmeden önce gösterilir. */
  duration?: number;
  /** Üretim tarihi (ISO 8601). */
  createdAt?: string;
  /** İsteğe bağlı altyazı dosyası (WebVTT). */
  captions?: string;
  /** Üretim kaynağı (ör. NotebookLM notebook kimliği) — sadece kayıt amaçlı. */
  sourceRef?: string;
};

export type Topic = {
  id: string;
  name: string;
  /** Kısa tanıtım metni (konu listesinde görünür) */
  summary: string;
  /**
   * Eski düzen: YouTube video kimliği. Yalnızca `video` yoksa kullanılır
   * (geriye dönük uyumluluk). Yeni videolar `video` alanıyla gelir.
   */
  youtubeId?: string;
  /** Yerleşik oynatıcıda gösterilen konu videosu (videos.json'dan birleştirilir). */
  video?: TopicVideo;
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
  /** Hızlı Sorular havuzu (uzun, pekiştirme amaçlı; LGS testinden ayrı). */
  quickQuestions?: QuizQuestion[];
};

export type SubjectContent = {
  slug: string;
  name: string;
  topics: Topic[];
};
