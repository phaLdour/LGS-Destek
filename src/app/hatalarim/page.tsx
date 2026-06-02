import Link from "next/link";
import { ArrowLeft, AlertCircle, Clock, History } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { QuickQuizClient } from "@/components/quick/QuickQuizClient";
import { collectAllQuestions } from "@/lib/quickQuiz";
import { getShellUser } from "@/lib/user";

type Mode = "due" | "bugun" | "tum";

const META: Record<Mode, {
  title: string;
  description: string;
  icon: typeof AlertCircle;
}> = {
  due: {
    title: "Tekrar Zamanı",
    description:
      "Aralıklı tekrar (spaced repetition) ile vadesi gelen sorular. Yanlıştan sonra 1 gün, 1 doğrudan sonra 3 gün ileri itilir; 2 doğru üst üste ustalaşmış sayılır.",
    icon: Clock,
  },
  bugun: {
    title: "Bugünün Hataları",
    description:
      "Bugün yaptığın ve henüz pekiştirmediğin sorular. 2 kez üst üste doğru cevaplarsan listeden çıkar.",
    icon: AlertCircle,
  },
  tum: {
    title: "Tüm Geçmiş",
    description:
      "Ustalaşmadığın bütün sorular (vade gelmiş olsun ya da olmasın). 2 kez üst üste doğru cevaplarsan listeden çıkar.",
    icon: History,
  },
};

export default async function HatalarimPage({
  searchParams,
}: {
  searchParams: Promise<{ gun?: string }>;
}) {
  const { gun } = await searchParams;
  const mode: Mode =
    gun === "bugun" ? "bugun" : gun === "tum" ? "tum" : "due";

  const user = await getShellUser();
  // Server: tüm karma havuzu çek (client wrong ID'lere göre filtreleyecek)
  const fullPool = collectAllQuestions({ kind: "karma-all" });

  const m = META[mode];
  const Icon = m.icon;

  const wrongFilter = mode === "bugun" ? "today" : mode === "tum" ? "all" : "due";

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
          <Icon className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold">{m.title}</h1>
          <p className="text-sm text-white/85">{m.description}</p>
        </div>
      </header>

      {/* Tab geçişi */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {(["due", "bugun", "tum"] as Mode[]).map((t) => {
          const isActive = t === mode;
          const TIcon = META[t].icon;
          const labelShort =
            t === "due" ? "Tekrar Zamanı" : t === "bugun" ? "Bugünün" : "Tüm Geçmiş";
          return (
            <Link
              key={t}
              href={t === "due" ? "/hatalarim" : `/hatalarim?gun=${t}`}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
                isActive
                  ? "border-rehberim-accent bg-rehberim-accent/10 text-rehberim-accent-dark"
                  : "border-rehberim-border bg-white text-rehberim-navy/70 hover:bg-rehberim-muted"
              }`}
            >
              <TIcon className="h-4 w-4" />
              <span>{labelShort}</span>
            </Link>
          );
        })}
      </div>

      <QuickQuizClient
        // key ile remount: tab değişince mount akışı yeniden çalışsın
        key={mode}
        scope={{ kind: "karma-all" }}
        initialPool={fullPool}
        title={m.title}
        subtitle="Yanlış cevap havuzu"
        backHref="/hizli-sorular"
        wrongMode
        wrongFilter={wrongFilter}
      />
    </AppShell>
  );
}
