import { Suspense } from "react";
import Link from "next/link";
import { CloudDownload } from "lucide-react";
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

        {/* Çevrimdışı davetinin yeri burası: öğrenci derslere bakarken
            "internet olmasa da çalışayım" fikri en doğal burada gelir.
            Ayrı bir menü maddesi yapılmadı — kaybolur. */}
        <Link
          href="/cevrimdisi"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-rehberim-border bg-rehberim-muted px-4 py-3 transition hover:bg-rehberim-surface"
        >
          <CloudDownload
            className="h-5 w-5 shrink-0 text-rehberim-accent-dark"
            strokeWidth={2.2}
          />
          <span className="min-w-0">
            <span className="block text-sm font-bold text-rehberim-navy">
              İnternetsiz çalış
            </span>
            <span className="block text-xs leading-snug text-rehberim-navy/60">
              Dersleri telefonuna indir, bağlantı olmasa da aç
            </span>
          </span>
        </Link>
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
        {/* Isı haritası Supabase'ten okur; Suspense sayesinde sayfanın
            geri kalanı onu BEKLEMEDEN gelir, harita hazır olunca dolar. */}
        <Suspense fallback={<HeatmapIskeleti />}>
          <SubjectHeatmap />
        </Suspense>
      </section>
    </AppShell>
  );
}

/** Isı haritası yüklenirken gösterilen sessiz iskelet. */
function HeatmapIskeleti() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="ring-hairline animate-pulse rounded-2xl border border-rehberim-border bg-white p-5 shadow-card"
        >
          <div className="mb-4 h-4 w-36 rounded bg-rehberim-muted" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 9 }, (_, j) => (
              <span key={j} className="h-3 w-3 rounded-sm bg-rehberim-muted" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
