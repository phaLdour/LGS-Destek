import { Info, School } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { OkulListesi } from "@/components/okullar/OkulListesi";
import { OKULLAR, REFERANS_YIL, VERI_TARIHI } from "@/content/okullar";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Okul Tarama — Rehberim",
  description:
    "Türkiye'nin en yüksek taban puanlı liseleri: yıl yıl taban puanı, yüzdelik dilim ve kontenjan.",
};

export default async function OkullarPage() {
  const user = await getShellUser();

  return (
    <AppShell user={user}>
      <header className="relative overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card sm:p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <School className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight">Okul Tarama</h1>
            <p className="mt-1 text-pretty text-sm text-white/85">
              Türkiye&apos;nin en yüksek taban puanlı {OKULLAR.length} lisesi tek
              listede. Bir okula dokun; LGS&apos;nin başladığı günden bugüne taban
              puanını, yüzdelik dilimini ve kontenjanını gör.
            </p>
            <p className="mt-1.5 text-xs tabular-nums text-white/70">
              {REFERANS_YIL} taban puanına göre sıralı · veri {VERI_TARIHI}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-4">
        <OkulListesi okullar={OKULLAR} />
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-2xl border border-rehberim-border bg-rehberim-muted/60 px-4 py-3 text-xs leading-relaxed text-rehberim-navy/60">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-navy/40" />
        <span>
          Puanlar İl Millî Eğitim Müdürlüklerinin yayımladığı yerleştirme
          sonuçlarına dayanır ve her biri en az iki kaynakta karşılaştırılmıştır.
          Doğrulanamayan alanlar &ldquo;—&rdquo; olarak bırakıldı; tahmin
          yazılmadı. Kesin bilgi için her zaman okulun kendi sayfasına ve MEB
          tercih kılavuzuna bak.
        </span>
      </p>
    </AppShell>
  );
}
