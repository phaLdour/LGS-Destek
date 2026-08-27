import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { KelimeTestiClient } from "@/components/sozluk/KelimeTestiClient";
import { kelimeSorusuSayisi, kelimeTuruUret } from "@/lib/kelimeTesti";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Kelime Testi — Rehberim",
  description:
    "Sözlükteki kelimelerden üretilen LGS tarzı sözcükte anlam soruları: cümlede hangi anlamda, gerçek mi mecaz mı?",
};

/**
 * Kelime testi — sorular SUNUCUDA üretilir; 300 KB'lik sözlük verisi
 * client'a inmez, yalnız o turun 10 sorusu gider.
 */
export default async function KelimeTestiPage({
  searchParams,
}: {
  searchParams: Promise<{ tur?: string }>;
}) {
  const [{ tur: turParam }, user] = await Promise.all([
    searchParams,
    getShellUser(),
  ]);
  const n = Number(turParam);
  const tur = Number.isInteger(n) && n >= 1 && n <= 999_999 ? n : 1;
  const sorular = kelimeTuruUret(tur, 10);

  return (
    <AppShell user={user}>
      <Link
        href="/sozluk"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-rehberim-navy/60 transition-colors hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Türkçe Sözlük
      </Link>

      <header className="relative mb-5 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <BookOpenCheck className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Kelime Testi</h1>
            <p className="mt-1 text-pretty text-sm text-white/85">
              LGS&apos;nin &ldquo;sözcükte anlam&rdquo; soruları: cümlede hangi
              anlamda kullanılmış, gerçek mi mecaz mı? Sorular sözlükten
              üretilir — her tur farklıdır.
            </p>
          </div>
        </div>
      </header>

      <KelimeTestiClient
        sorular={sorular}
        tur={tur}
        toplamSoru={kelimeSorusuSayisi()}
      />
    </AppShell>
  );
}
