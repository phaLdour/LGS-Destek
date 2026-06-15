import { AppShell } from "@/components/layout/AppShell";
import { SubjectGrid } from "@/components/subjects/SubjectGrid";
import { SubjectHeatmap } from "@/components/stats/SubjectHeatmap";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Dersler — Rehberim",
  description:
    "LGS müfredatındaki tüm dersler ve konu konu performans haritan.",
};

export default async function DerslerPage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <header className="ring-hairline mb-6 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
          Dersler
        </h1>
        <p className="mt-1 text-pretty text-sm text-rehberim-navy/55">
          LGS müfredatındaki tüm dersler ve konularındaki performansın.
        </p>
      </header>

      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-rehberim-navy">
            Müfredat
          </h2>
          <p className="text-sm text-rehberim-navy/55">
            Bir derse girip konularına başla
          </p>
        </div>
        <SubjectGrid />
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-rehberim-navy">
            Konu performansın
          </h2>
          <p className="text-sm text-rehberim-navy/55">
            Hangi konularda güçlüsün, hangilerine odaklanmalısın
          </p>
        </div>
        <SubjectHeatmap />
      </section>
    </AppShell>
  );
}
