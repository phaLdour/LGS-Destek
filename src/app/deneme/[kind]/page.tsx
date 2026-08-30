import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ExamClient } from "@/components/exam/ExamClient";
import {
  EXAM_KINDS,
  buildExamPool,
  getExamConfig,
  type ExamDifficulty,
  type ExamKind,
} from "@/lib/mockExam";
import { getShellUser } from "@/lib/user";

// Tek kaynak: EXAM_KINDS. Eskiden burada elle yazılı bir liste vardı;
// branş denemeleri eklenince güncellenmediği için hepsi 404 veriyordu.
// Elle kopyalanan liste, eklenen türü sessizce dışarıda bırakır.
const VALID_KIND: ExamKind[] = EXAM_KINDS;
const VALID_DIFF: ExamDifficulty[] = ["kolay", "zor"];

export default async function DenemeKindPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ zorluk?: string }>;
}) {
  const { kind } = await params;
  const { zorluk } = await searchParams;
  if (!VALID_KIND.includes(kind as ExamKind)) notFound();
  const difficulty: ExamDifficulty = VALID_DIFF.includes(
    zorluk as ExamDifficulty,
  )
    ? (zorluk as ExamDifficulty)
    : "kolay";

  const user = await getShellUser();
  const cfg = getExamConfig(kind as ExamKind, difficulty);
  const pool = buildExamPool(kind as ExamKind, difficulty);

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
