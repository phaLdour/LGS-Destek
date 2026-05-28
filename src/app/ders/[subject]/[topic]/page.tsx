import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Layers, Network, Video } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/study/Article";
import { Flashcards } from "@/components/study/Flashcards";
import { MindMap } from "@/components/study/MindMap";
import { TopicStudyController } from "@/components/study/TopicStudyController";
import { YouTubeEmbed } from "@/components/study/YouTubeEmbed";
import { getSubjectContent, getTopic } from "@/content";
import { getShellUser } from "@/lib/user";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;
  const subjectContent = getSubjectContent(subject);
  const topicData = getTopic(subject, topic);
  if (!subjectContent || !topicData) notFound();

  const user = await getShellUser();
  const hasVideo = Boolean(topicData.youtubeId);
  const hasMindMap = Boolean(topicData.mindMap?.branches.length);
  const hasCards = (topicData.cards?.length ?? 0) > 0;
  const hasArticle = Boolean(topicData.article && topicData.article.trim());

  return (
    <AppShell user={user}>
      <Link
        href={`/ders/${subject}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        {subjectContent.name} konularına dön
      </Link>

      <header className="flex flex-col gap-4 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-accent">
            {subjectContent.name}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-rehberim-navy">
            {topicData.name}
          </h1>
          <p className="mt-1 text-sm text-rehberim-navy/55">
            {topicData.summary}
          </p>
        </div>
        <TopicStudyController subjectSlug={subject} topicId={topic} />
      </header>

      {/* Konu haritası */}
      {hasMindMap && (
        <Section icon={<Network className="h-5 w-5" />} title="Konu haritası">
          <MindMap data={topicData.mindMap!} />
        </Section>
      )}

      {/* Video */}
      <Section icon={<Video className="h-5 w-5" />} title="Videolu özet">
        {hasVideo ? (
          <YouTubeEmbed id={topicData.youtubeId!} title={topicData.name} />
        ) : (
          <Placeholder text="Bu konu için video özeti yakında eklenecek." />
        )}
      </Section>

      {/* Çalışma kartları */}
      <Section icon={<Layers className="h-5 w-5" />} title="Çalışma kartları">
        {hasCards ? (
          <Flashcards cards={topicData.cards!} />
        ) : (
          <Placeholder text="Çalışma kartları yakında eklenecek." />
        )}
      </Section>

      {/* Makale */}
      <Section icon={<FileText className="h-5 w-5" />} title="Konu anlatımı">
        {hasArticle ? (
          <Article text={topicData.article!} />
        ) : (
          <Placeholder text="Konu anlatımı makalesi yakında eklenecek." />
        )}
      </Section>
    </AppShell>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-rehberim-navy">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rehberim-navy text-white">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted px-6 py-12 text-center text-sm text-rehberim-navy/50">
      {text}
    </div>
  );
}
