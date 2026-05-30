import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickSubjectGrid } from "@/components/quick/QuickSubjectGrid";
import { getShellUser } from "@/lib/user";

export default async function HizliSorularPage() {
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

      <header className="mb-5 flex items-center gap-4 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rehberim-accent to-amber-500 text-white shadow-soft">
          <Zap className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold text-rehberim-navy">Hızlı Sorular</h1>
          <p className="text-sm text-rehberim-navy/55">
            10 saniyede bir soru — konularını hızlıca pekiştir
          </p>
        </div>
      </header>

      <QuickSubjectGrid />
    </AppShell>
  );
}
