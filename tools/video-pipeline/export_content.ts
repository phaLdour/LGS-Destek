/**
 * İçerik dökümü: src/content altındaki ders/konu verisini JSON olarak yazar.
 *
 * Video otomasyonu (pipeline.py) bu çıktıyı okuyarak her konu için NotebookLM
 * kaynak belgesini ve yönlendirme brief'ini üretir.
 *
 *   npx -y tsx tools/video-pipeline/export_content.ts > /tmp/content.json
 */
import { getAllSubjects } from "../../src/content";

const subjects = getAllSubjects().map((s) => ({
  slug: s.slug,
  name: s.name,
  topics: s.topics.map((t) => ({
    id: t.id,
    name: t.name,
    summary: t.summary,
    youtubeId: t.youtubeId || null,
    video: t.video ?? null,
    mindMap: t.mindMap ?? null,
    cards: t.cards ?? [],
    article: t.article ?? "",
    tips: t.tips ?? [],
    quiz: t.quiz ?? [],
  })),
}));

process.stdout.write(JSON.stringify({ exportedAt: new Date().toISOString(), subjects }, null, 2));
