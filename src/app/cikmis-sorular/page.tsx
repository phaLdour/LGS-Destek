import Link from "next/link";
import { Archive, ArrowLeft, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PAST_EXAMS } from "@/content/cikmis-sorular";
import { getShellUser } from "@/lib/user";

export default async function CikmisSorularPage() {
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

      <header className="mb-5 flex items-center gap-4 rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
          <Archive className="h-8 w-8" />
        </span>
        <div>
          <h1 className="text-xl font-extrabold">Çıkmış Sorular</h1>
          <p className="text-sm text-white/85">
            MEB ÖDSGM resmi LGS sınavları (2018-2025) — PDF olarak indir, kağıt
            üzerinde çöz.
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {PAST_EXAMS.map((y) => (
          <Link
            key={y.year}
            href={`/cikmis-sorular/${y.year}`}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-rehberim-border bg-white p-5 shadow-card transition hover:border-rehberim-accent/50 hover:shadow-soft"
          >
            <div>
              <p className="text-2xl font-extrabold text-rehberim-navy">
                {y.year} LGS
              </p>
              <p className="mt-1 text-xs text-rehberim-navy/55">
                Sözel + Sayısal · 90 soru
              </p>
            </div>
            <ChevronRight className="h-6 w-6 text-rehberim-navy/40 transition group-hover:translate-x-1 group-hover:text-rehberim-accent" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-rehberim-navy/45">
        Kaynak: MEB Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü
      </p>
    </AppShell>
  );
}
