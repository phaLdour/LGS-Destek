import type { SubjectContent, Topic, TopicVideo } from "./types";
import { FEN_BILIMLERI } from "./fen-bilimleri";
import { TURKCE } from "./turkce";
import { INKILAP } from "./inkilap";
import { MATEMATIK } from "./matematik";
import { DIN } from "./din";
import { INGILIZCE } from "./ingilizce";
import { getAllVideos, getTopicVideo } from "./videos";
import { shuffleQuestionList } from "@/lib/shuffleOptions";

/**
 * Yerleşik konu videolarını (videos.json) konu nesnelerine birleştirir.
 * Video kaydı varsa `topic.video` dolar; yoksa eski `youtubeId` geri
 * dönüş olarak kalır. Modül yüklenirken bir kez çalışır.
 */
function attachVideos(subject: SubjectContent): SubjectContent {
  return {
    ...subject,
    topics: subject.topics.map((t) => {
      const video = getTopicVideo(subject.slug, t.id);
      return video ? { ...t, video } : t;
    }),
  };
}

/**
 * Şıkları sabit sırayla karıştırır (bkz. lib/shuffleOptions).
 *
 * Havuz yazılırken doğru cevap neredeyse hep ilk şıkka konmuştu; bu
 * dönüşüm olmadan öğrenci soruyu okumadan A işaretleyerek ~%90 alabiliyor.
 * Modül yüklenirken bir kez çalışır, sonuç önbelleklenir.
 */
function shuffleOptions(subject: SubjectContent): SubjectContent {
  return {
    ...subject,
    topics: subject.topics.map((t) => ({
      ...t,
      quiz: shuffleQuestionList(t.quiz),
      quickQuestions: shuffleQuestionList(t.quickQuestions),
    })),
  };
}

const CONTENT: Record<string, SubjectContent> = Object.fromEntries(
  [FEN_BILIMLERI, TURKCE, INKILAP, MATEMATIK, DIN, INGILIZCE].map((s) => [
    s.slug,
    shuffleOptions(attachVideos(s)),
  ]),
);

/** Konunun videosu var mı (yerleşik video veya eski YouTube kaydı)? */
export function topicHasVideo(topic: Topic): boolean {
  return Boolean(topic.video?.src) || Boolean(topic.youtubeId);
}

/** İçeriği olan ders varsa döner, yoksa null (ders sayfası "yakında" gösterir). */
export function getSubjectContent(slug: string): SubjectContent | null {
  return CONTENT[slug] ?? null;
}

/** İçerikli tüm derslerin listesi (Hızlı Sorular karma havuzu için). */
export function getAllSubjects(): SubjectContent[] {
  return Object.values(CONTENT);
}

export function getTopic(slug: string, topicId: string): Topic | null {
  const subject = getSubjectContent(slug);
  return subject?.topics.find((t) => t.id === topicId) ?? null;
}

/**
 * Hafif konu-adı haritası: `${subjectSlug}/${topicId}` → konu adı.
 * Client bileşenlerin (StudySessionProvider) ağır `@/content` modülünü
 * bundle'a çekmeden konu adlarını çözebilmesi için server tarafında
 * üretilip prop olarak verilir. Sadece kısa string'lerden oluşur.
 */
export function getTopicNameMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const subject of Object.values(CONTENT)) {
    for (const t of subject.topics) {
      map[`${subject.slug}/${t.id}`] = t.name;
    }
  }
  return map;
}

/** İçeriği olan tüm konuların listesi (AI'ın "Konuyu çöz" yönlendirmesi için). */
export function getTopicCatalog(): {
  route: string;
  subjectName: string;
  topicName: string;
}[] {
  const out: { route: string; subjectName: string; topicName: string }[] = [];
  for (const subject of Object.values(CONTENT)) {
    for (const t of subject.topics) {
      out.push({
        route: `/ders/${subject.slug}/${t.id}`,
        subjectName: subject.name,
        topicName: t.name,
      });
    }
  }
  return out;
}

export type { SubjectContent, Topic, TopicVideo };

/**
 * Kaç konuda video var, toplam kaç konu var?
 *
 * Tanıtım sayfası bu sayıyı ekranda yazıyor. Elle yazılırsa her yeni video
 * yüklendiğinde metni güncellemek gerekir (ve unutulursa yalan söyler);
 * bunun yerine videos.json'dan sayılıyor. Video otomasyonu dosyayı her
 * güncellediğinde site kendiliğinden doğru sayıyı gösterir.
 */
export function getVideoCoverage(): {
  videolu: number;
  toplam: number;
  tamam: boolean;
} {
  const videolar = getAllVideos();
  let toplam = 0;
  let videolu = 0;
  for (const subject of Object.values(CONTENT)) {
    for (const t of subject.topics) {
      toplam += 1;
      const v = videolar[`${subject.slug}/${t.id}`];
      if (v?.src || t.youtubeId) videolu += 1;
    }
  }
  return { videolu, toplam, tamam: toplam > 0 && videolu >= toplam };
}
