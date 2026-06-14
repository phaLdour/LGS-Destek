import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PastExamClient } from "@/components/cikmis/PastExamClient";
import { getPastExam } from "@/content/cikmis-sorular";
import type { ExamSection } from "@/content/cikmis-sorular/types";
import { getShellUser } from "@/lib/user";

const VALID: ExamSection[] = ["sozel", "sayisal"];

export default async function CozPage({
  params,
}: {
  params: Promise<{ yil: string; bolum: string }>;
}) {
  const { yil, bolum } = await params;
  const year = Number(yil);
  if (!Number.isFinite(year)) notFound();
  if (!VALID.includes(bolum as ExamSection)) notFound();

  const meta = getPastExam(year, bolum as ExamSection);
  if (!meta) notFound();
  // İnteraktif soru yoksa bu sayfa yok
  if (!meta.questions || meta.questions.length === 0) notFound();

  const user = await getShellUser();

  return (
    <AppShell user={user}>
      <Link
        href={`/cikmis-sorular/${year}/${bolum}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Geri dön
      </Link>
      <PastExamClient
        year={year}
        section={bolum as ExamSection}
        label={meta.label}
        durationMinutes={meta.durationMinutes}
        questions={meta.questions}
      />
    </AppShell>
  );
}
