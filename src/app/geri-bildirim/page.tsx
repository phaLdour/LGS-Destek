import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { FeedbackForm } from "@/components/marketing/FeedbackForm";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Geri bildirim — Rehberim",
  description: "Hatalı soru, çalışmayan özellik veya öneri bildir.",
};

export default async function GeriBildirimPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Anasayfaya dön
      </Link>
      <FeedbackForm fromPath={from} />
    </AppShell>
  );
}
