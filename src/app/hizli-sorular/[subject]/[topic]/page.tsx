import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Shuffle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickQuizClient } from "@/components/quick/QuickQuizClient";
import { getSubjectContent, getTopic } from "@/content";
import { collectAllQuestions, collectWeightedQuestions } from "@/lib/quickQuiz";
import { getShellUser } from "@/lib/user";
import { getWeakTopicKeys } from "@/lib/userContext";

export default async function HizliSorularQuizPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;
  const user = await getShellUser();
  const subjectContent = getSubjectContent(subject);
  if (!subjectContent) notFound();

  // Dersin karması — bu dersteki zayıf konulardan ağırlık verilir
  if (topic === "karma") {
    const weakAll = await getWeakTopicKeys();
    // Sadece bu derse ait zayıfları al
    const weakForSubject = new Set(
      [...weakAll].filter((k) => k.startsWith(`${subject}/`)),
    );
    const smart = weakForSubject.size > 0;
    return (
      <AppShell user={user}>
        <Link
          href={`/hizli-sorular/${subject}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          {subjectContent.name} konularına dön
        </Link>
        <header className="mb-5 flex items-center gap-4 rounded-3xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent to-amber-500 p-5 text-white shadow-card">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Shuffle className="h-8 w-8" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold">
              Karma — {subjectContent.name}
            </h1>
            <p className="text-sm text-white/85">
              {smart
                ? "Zayıf konularından daha çok soru gelir"
                : "Bu derste tüm konulardan karışık"}
            </p>
          </div>
        </header>
        <QuickQuizClient
          scope={{ kind: "karma-subject", subject }}
          initialPool={collectWeightedQuestions(
            { kind: "karma-subject", subject },
            weakForSubject,
          )}
          title={`Karma — ${subjectContent.name}`}
          subtitle={
            smart ? "Akıllı havuz (zayıf konulara ağırlık)" : "Tüm konulardan karışık"
          }
          backHref={`/hizli-sorular/${subject}`}
        />
      </AppShell>
    );
  }

  const topicData = getTopic(subject, topic);
  if (!topicData) notFound();

  return (
    <AppShell user={user}>
      <Link
        href={`/hizli-sorular/${subject}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        {subjectContent.name} konularına dön
      </Link>
      <header className="mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-accent">
          {subjectContent.name}
        </p>
        <h1 className="mt-1 text-xl font-extrabold text-rehberim-navy">
          {topicData.name} — Hızlı Sorular
        </h1>
        <p className="text-sm text-rehberim-navy/55">{topicData.summary}</p>
      </header>
      <QuickQuizClient
        scope={{ kind: "topic", subject, topic }}
        initialPool={collectAllQuestions({ kind: "topic", subject, topic })}
        title={topicData.name}
        subtitle={subjectContent.name}
        backHref={`/hizli-sorular/${subject}`}
      />
    </AppShell>
  );
}
