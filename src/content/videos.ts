import type { TopicVideo } from "./types";
import registry from "./videos.json";

/**
 * Konu videoları kaydı — `videos.json` dosyasının tipli görünümü.
 *
 * Anahtar biçimi: `${subjectSlug}/${topicId}` (ör. "fen-bilimleri/mevsimler").
 * Dosya, video otomasyonu (tools/video-pipeline) tarafından her yeni video
 * yüklendiğinde güncellenir; uygulama kodu sadece okur.
 */
const VIDEOS: Record<string, TopicVideo> = (
  registry as { videos?: Record<string, TopicVideo> }
).videos ?? {};

export function videoKey(subjectSlug: string, topicId: string): string {
  return `${subjectSlug}/${topicId}`;
}

export function getTopicVideo(
  subjectSlug: string,
  topicId: string,
): TopicVideo | undefined {
  const v = VIDEOS[videoKey(subjectSlug, topicId)];
  return v && typeof v.src === "string" && v.src.length > 0 ? v : undefined;
}

/** Kayıtlı tüm videolar (anahtar → video). */
export function getAllVideos(): Record<string, TopicVideo> {
  return VIDEOS;
}
