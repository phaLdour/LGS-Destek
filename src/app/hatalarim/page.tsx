import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickQuizClient } from "@/components/quick/QuickQuizClient";
import { collectAllQuestions } from "@/lib/quickQuiz";
import { getShellUser } from "@/lib/user";

export default async function HatalarimPage() {
  const user = await getShellUser();
  // Server: tüm karma havuzu çek (client wrong ID'lere göre filtreleyecek)
  const fullPool = collectAllQuestions({ kind: "karma-all" });

  return (
    <AppShell user={user}>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Anasayfaya dön
      </Link>

      <header className="mb-5 flex items-center gap-4 rounded-3xl border border-red-200 bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <AlertCircle className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold">Hatalarım</h1>
          <p className="text-sm text-white/85">
            Yanlış cevapladığın soruları tekrar çöz. 2 kez üst üste
            doğru cevaplarsan listeden çıkar.
          </p>
        </div>
      </header>

      <QuickQuizClient
        scope={{ kind: "karma-all" }}
        initialPool={fullPool}
        title="Hatalarım"
        subtitle="Yanlış cevap havuzu"
        backHref="/hizli-sorular"
        wrongMode
      />
    </AppShell>
  );
}
