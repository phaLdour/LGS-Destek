import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Construction } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SUBJECTS } from "@/components/subjects/SubjectGrid";
import { getShellUser } from "@/lib/user";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const data = SUBJECTS.find((s) => s.slug === subject);
  if (!data) notFound();

  const user = await getShellUser();
  const { name, short, Icon, badge, iconClass } = data;

  return (
    <AppShell user={user}>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Derslere dön
      </Link>

      <section className="flex items-center gap-4 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${badge} shadow-sm`}
        >
          <Icon className={`h-10 w-10 ${iconClass}`} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-rehberim-navy">{name}</h1>
          <p className="text-sm text-rehberim-navy/55">{short}</p>
        </div>
      </section>

      <section className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-rehberim-border bg-rehberim-muted px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-rehberim-accent shadow-card">
          <Construction className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-rehberim-navy">
          Konu içerikleri çok yakında!
        </h2>
        <p className="mt-1 max-w-sm text-sm text-rehberim-navy/55">
          {name} dersi için konu anlatımları, testler ve çalışma araçları bir
          sonraki aşamada burada olacak.
        </p>
      </section>
    </AppShell>
  );
}
