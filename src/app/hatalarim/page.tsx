import Link from "next/link";
import { ArrowLeft, AlertCircle, History } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickQuizClient } from "@/components/quick/QuickQuizClient";
import { collectAllQuestions } from "@/lib/quickQuiz";
import { getShellUser } from "@/lib/user";

export default async function HatalarimPage({
  searchParams,
}: {
  searchParams: Promise<{ gun?: string }>;
}) {
  const { gun } = await searchParams;
  const mode: "bugun" | "tum" = gun === "bugun" ? "bugun" : "tum";

  const user = await getShellUser();
  // Server: tüm karma havuzu çek (client wrong ID'lere göre filtreleyecek)
  const fullPool = collectAllQuestions({ kind: "karma-all" });

  const isBugun = mode === "bugun";

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
          {isBugun ? (
            <AlertCircle className="h-8 w-8" />
          ) : (
            <History className="h-8 w-8" />
          )}
        </span>
        <div>
          <h1 className="text-xl font-extrabold">
            {isBugun ? "Bugünün Hataları" : "Geçmiş Hatalarım"}
          </h1>
          <p className="text-sm text-white/85">
            {isBugun
              ? "Bugün yaptığın ama henüz pekiştirmediğin sorular. 2 kez üst üste doğru cevaplarsan listeden çıkar."
              : "Ne zaman olursa olsun, hâlâ ustalaşmadığın tüm sorular. 2 kez üst üste doğru cevaplarsan listeden çıkar."}
          </p>
        </div>
      </header>

      {/* Tab geçişi */}
      <div className="mb-4 flex gap-2">
        <Link
          href="/hatalarim?gun=bugun"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
            isBugun
              ? "border-rehberim-accent bg-rehberim-accent/10 text-rehberim-accent-dark"
              : "border-rehberim-border bg-white text-rehberim-navy/70 hover:bg-rehberim-muted"
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          Bugünün Hataları
        </Link>
        <Link
          href="/hatalarim?gun=tum"
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
            !isBugun
              ? "border-rehberim-accent bg-rehberim-accent/10 text-rehberim-accent-dark"
              : "border-rehberim-border bg-white text-rehberim-navy/70 hover:bg-rehberim-muted"
          }`}
        >
          <History className="h-4 w-4" />
          Geçmiş Hatalarım
        </Link>
      </div>

      <QuickQuizClient
        // key ile remount: tab değişince mount akışı yeniden çalışsın
        key={mode}
        scope={{ kind: "karma-all" }}
        initialPool={fullPool}
        title={isBugun ? "Bugünün Hataları" : "Geçmiş Hatalarım"}
        subtitle="Yanlış cevap havuzu"
        backHref="/hizli-sorular"
        wrongMode
        wrongFilter={isBugun ? "today" : "all"}
      />
    </AppShell>
  );
}
