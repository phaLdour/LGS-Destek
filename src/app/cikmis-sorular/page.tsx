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

      <header className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
          <Archive className="h-8 w-8" />
        </span>
        <div className="relative">
          <h1 className="text-xl font-extrabold tracking-tight">Çıkmış Sorular</h1>
          <p className="text-pretty text-sm text-white/85">
            MEB ÖDSGM resmi LGS sınavları (2018-2026) — PDF indir veya interaktif çöz, kağıt
            üzerinde çöz.
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {PAST_EXAMS.map((y) => (
          <Link
            key={y.year}
            href={`/cikmis-sorular/${y.year}`}
            className="group ring-hairline relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-rehberim-border bg-white p-5 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-accent/40 hover:shadow-soft"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-rehberim-accent/0 blur-2xl transition-all duration-500 ease-smooth group-hover:bg-rehberim-accent/15"
            />
            <div className="relative">
              <p className="text-2xl font-extrabold tracking-tight tabular-nums text-rehberim-navy">
                {y.year} LGS
              </p>
              <p className="mt-1 text-xs font-medium text-rehberim-navy/55">
                Sözel + Sayısal · 90 soru
              </p>
            </div>
            <ChevronRight className="relative h-6 w-6 text-rehberim-navy/40 transition-all duration-300 ease-smooth group-hover:translate-x-1 group-hover:text-rehberim-accent" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-rehberim-navy/45">
        Kaynak: MEB Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü
      </p>
    </AppShell>
  );
}
