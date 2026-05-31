import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpenCheck, Calculator, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { getPastExamYear } from "@/content/cikmis-sorular";
import { getShellUser } from "@/lib/user";

export default async function YearPage({
  params,
}: {
  params: Promise<{ yil: string }>;
}) {
  const { yil } = await params;
  const year = Number(yil);
  if (!Number.isFinite(year)) notFound();
  const data = getPastExamYear(year);
  if (!data) notFound();

  const user = await getShellUser();

  const sections = [
    {
      key: "sozel" as const,
      meta: data.sozel,
      icon: BookOpenCheck,
      tint: "from-blue-500 to-indigo-600",
      detail: "Türkçe 20 · İnkılap 10 · Din 10 · İngilizce 10",
    },
    {
      key: "sayisal" as const,
      meta: data.sayisal,
      icon: Calculator,
      tint: "from-emerald-500 to-teal-600",
      detail: "Matematik 20 · Fen Bilimleri 20",
    },
  ];

  return (
    <AppShell user={user}>
      <Link
        href="/cikmis-sorular"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Yıl seçimine dön
      </Link>

      <header className="mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold text-rehberim-navy">
          {year} LGS Sınavı
        </h1>
        <p className="mt-1 text-sm text-rehberim-navy/55">
          Hangi bölümünü çözmek ya da indirmek istersin?
        </p>
      </header>

      <div className="space-y-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.key}
              href={`/cikmis-sorular/${year}/${s.key}`}
              className={`group flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-border bg-gradient-to-br ${s.tint} p-5 text-white shadow-card transition hover:scale-[1.005] hover:shadow-soft`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Icon className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold">{s.meta.label}</p>
                <p className="text-sm text-white/85">{s.detail}</p>
                <p className="mt-1 text-xs font-bold text-white/95">
                  {s.meta.totalQuestions} soru · {s.meta.durationMinutes} dk
                </p>
              </div>
              <ChevronRight className="hidden h-6 w-6 transition group-hover:translate-x-1 sm:block" />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
