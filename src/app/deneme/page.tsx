import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, Calculator, FileText } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { EXAM_CONFIGS } from "@/lib/mockExam";
import { getShellUser } from "@/lib/user";

const META = [
  {
    kind: "sozel" as const,
    icon: BookOpenCheck,
    tint: "from-blue-500 to-indigo-600",
    description:
      "Türkçe, T.C. İnkılap Tarihi, Din Kültürü ve İngilizce. Gerçek LGS sözel bölümünün aynısı.",
  },
  {
    kind: "sayisal" as const,
    icon: Calculator,
    tint: "from-emerald-500 to-teal-600",
    description:
      "Matematik ve Fen Bilimleri. Gerçek LGS sayısal bölümünün aynısı.",
  },
  {
    kind: "tam" as const,
    icon: FileText,
    tint: "from-rehberim-accent to-amber-600",
    description:
      "Sözel + sayısal arka arkaya, 155 dakika. Sınav günü provası.",
  },
];

export default async function DenemePage() {
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

      <header className="mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold text-rehberim-navy">
          Deneme Sınavı
        </h1>
        <p className="mt-1 text-sm text-rehberim-navy/55">
          Gerçek LGS formatında dene: süreyle, gezilebilir soru paneliyle ve
          net hesabıyla.
        </p>
      </header>

      <div className="space-y-3">
        {META.map((m) => {
          const cfg = EXAM_CONFIGS[m.kind];
          const Icon = m.icon;
          return (
            <Link
              key={m.kind}
              href={`/deneme/${m.kind}`}
              className={`group flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-border bg-gradient-to-br ${m.tint} p-5 text-white shadow-card transition hover:scale-[1.005] hover:shadow-soft`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Icon className="h-8 w-8" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold">{cfg.label}</p>
                <p className="text-sm text-white/85">{m.description}</p>
                <p className="mt-1 text-xs font-bold text-white/95">
                  {cfg.totalQuestions} soru · {cfg.durationMinutes} dakika
                </p>
              </div>
              <ArrowRight className="hidden h-6 w-6 transition group-hover:translate-x-1 sm:block" />
            </Link>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 p-4 text-sm text-rehberim-navy">
        <p className="font-bold">İpuçları</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-rehberim-navy/70">
          <li>Süre dolunca sınav otomatik biter; cevapsız sorular boş sayılır.</li>
          <li>Soru numarası panelinden istediğine atlayabilir, geri dönüp değiştirebilirsin.</li>
          <li>Bitirdiğinde net hesabı, ders dağılımı ve detaylı rapor görünür.</li>
          <li>Yanlış cevapların otomatik &quot;Hatalarım&quot; havuzuna düşer.</li>
        </ul>
      </div>
    </AppShell>
  );
}
