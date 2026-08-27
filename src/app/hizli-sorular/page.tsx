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

      <header className="ring-hairline relative mb-5 flex items-center gap-4 overflow-hidden rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-rehberim-accent/10 blur-3xl"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rehberim-accent to-amber-500 text-rehberim-navy ring-1 ring-rehberim-accent/40 shadow-card">
          <Zap className="h-8 w-8" />
        </span>
        <div className="relative">
          <h1 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
            Hızlı Sorular
          </h1>
          <p className="text-sm text-rehberim-navy/55">
            Kendi hızında art arda soru — konularını hızlıca pekiştir
          </p>
        </div>
      </header>

      <QuickSubjectGrid />
    </AppShell>
  );
}
