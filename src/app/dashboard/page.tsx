import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { OwlSvg } from "@/components/brand/Owl";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { SubjectGrid } from "@/components/subjects/SubjectGrid";
import { getShellUser } from "@/lib/user";

export default async function DashboardPage() {
  const user = await getShellUser();
  const firstName = user.name.split(" ")[0];

  return (
    <AppShell user={user}>
      {/* Karşılama */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark p-6 text-white shadow-soft sm:p-8">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-rehberim-accent/15 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-rehberim-accent-light">
              Hoş geldin
            </p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              Merhaba, {firstName}! 👋
            </h1>
            <p className="mt-2 max-w-md text-sm text-white/70">
              LGS yolculuğunda neye çalışmak istersin? Aşağıdan bir ders seç ya
              da sağ alttaki Rehber Baykuş&apos;a sor.
            </p>
          </div>
          <OwlSvg className="hidden h-28 w-28 animate-float sm:block" />
        </div>
      </section>

      {/* İpucu şeridi */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 px-4 py-3 text-sm text-rehberim-navy">
        <Sparkles className="h-5 w-5 shrink-0 text-rehberim-accent" />
        <span>
          <strong>İpucu:</strong> Rehber Baykuş&apos;a &quot;profilime git&quot;
          ya da &quot;Türkçe&apos;ye gir&quot; yazarak hızlıca gezinebilirsin.
        </span>
      </div>

      {/* İstatistikler */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-rehberim-navy">
            Çalışma takibin
          </h2>
          <p className="text-sm text-rehberim-navy/55">
            İlerlemeni ve çalışma alışkanlığını takip et
          </p>
        </div>
        <StatsPanel />
      </section>

      {/* Dersler */}
      <section id="dersler" className="mt-8 scroll-mt-20">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-rehberim-navy">
              Dersler
            </h2>
            <p className="text-sm text-rehberim-navy/55">
              LGS müfredatındaki tüm dersler
            </p>
          </div>
        </div>
        <SubjectGrid />
      </section>
    </AppShell>
  );
}
