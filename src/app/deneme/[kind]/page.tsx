import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ExamClient } from "@/components/exam/ExamClient";
import { buildExamPool, getExamConfig, type ExamKind } from "@/lib/mockExam";
import { getShellUser } from "@/lib/user";

const VALID: ExamKind[] = ["sozel", "sayisal", "tam"];

export default async function DenemeKindPage({
  params,
}: {
  params: Promise<{ kind: string }>;
}) {
  const { kind } = await params;
  if (!VALID.includes(kind as ExamKind)) notFound();

  const user = await getShellUser();
  const cfg = getExamConfig(kind as ExamKind);
  const pool = buildExamPool(kind as ExamKind);

  return (
    <AppShell user={user}>
      <Link
        href="/deneme"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Deneme seçimine dön
      </Link>
      <ExamClient config={cfg} pool={pool} />
    </AppShell>
  );
}
