import { StudySessionProvider } from "@/components/study/StudySessionProvider";
import { SessionBar } from "@/components/study/SessionBar";
import { SessionSummary } from "@/components/study/SessionSummary";

export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudySessionProvider>
      {children}
      <SessionBar />
      <SessionSummary />
    </StudySessionProvider>
  );
}
