import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Shuffle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickQuizClient } from "@/components/quick/QuickQuizClient";
import { QuickTopicList } from "@/components/quick/QuickTopicList";
import { getSubjectContent } from "@/content";
import { collectAllQuestions } from "@/lib/quickQuiz";
import { getShellUser } from "@/lib/user";

export default async function HizliSorularSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const user = await getShellUser();

  // Tüm derslerden karma
  if (subject === "karma") {
    return (
      <AppShell user={user}>
        <Link
          href="/hizli-sorular"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Ders seçimine dön
        </Link>
        <header className="mb-5 flex items-center gap-4 rounded-3xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent to-amber-500 p-5 text-white shadow-card">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Shuffle className="h-8 w-8" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold">Karma — Tüm Dersler</h1>
            <p className="text-sm text-white/85">Her dersten rastgele sorular</p>
          </div>
        </header>
        <QuickQuizClient
          scope={{ kind: "karma-all" }}
          initialPool={collectAllQuestions({ kind: "karma-all" })}
          title="Karma"
          subtitle="Tüm derslerden rastgele"
          backHref="/hizli-sorular"
        />
      </AppShell>
    );
  }

  const content = getSubjectContent(subject);
  if (!content) notFound();

  return (
    <AppShell user={user}>
      <Link
        href="/hizli-sorular"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Ders seçimine dön
      </Link>
      <header className="mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold text-rehberim-navy">
          {content.name} — Hızlı Sorular
        </h1>
        <p className="text-sm text-rehberim-navy/55">
          Konu seç ya da karışık çöz
        </p>
      </header>
      <QuickTopicList subject={content} />
    </AppShell>
  );
}
