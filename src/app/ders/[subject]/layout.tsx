import { StudySessionProvider } from "@/components/study/StudySessionProvider";
import { SessionBar } from "@/components/study/SessionBar";
import { SessionSummary } from "@/components/study/SessionSummary";
import { getTopicNameMap } from "@/content";

export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hafif konu-adı haritası server'da üretilir; client provider ağır
  // @/content modülünü bundle'a çekmeden konu adlarını çözer.
  const topicNames = getTopicNameMap();
  return (
    <StudySessionProvider topicNames={topicNames}>
      {children}
      <SessionBar />
      <SessionSummary />
    </StudySessionProvider>
  );
}
