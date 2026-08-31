import Link from "next/link";
import { School, Zap } from "lucide-react";
import { OnboardingTour } from "@/components/onboarding/Tour";
import { AppShell } from "@/components/layout/AppShell";
import { OwlSvg } from "@/components/brand/Owl";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import { BugununPlani } from "@/components/dashboard/BugununPlani";
import { HedefOkulKarti } from "@/components/dashboard/HedefOkulKarti";
import { GeriSayim } from "@/components/dashboard/GeriSayim";
import { KaldiginYerCard } from "@/components/dashboard/KaldiginYerCard";
import { TekrarZamaniKarti } from "@/components/dashboard/TekrarZamaniKarti";
import { StatsPanel } from "@/components/stats/StatsPanel";
import { WeeklyDigestCard } from "@/components/stats/WeeklyDigestCard";
import { SubjectGrid } from "@/components/subjects/SubjectGrid";
import { getTopicNameMap } from "@/content";
import { getBugununPlani } from "@/lib/bugununPlani";
import { siradakiSinav, tarihMetni } from "@/lib/sinavTarihi";
import { getShellUser } from "@/lib/user";
import { getStatsServer, getDailyGoalServer } from "@/lib/tracking-server";

export default async function DashboardPage() {
  const [user, stats, goal, plan] = await Promise.all([
    getShellUser(),
    getStatsServer(),
    getDailyGoalServer(),
    getBugununPlani(),
  ]);
  const firstName = user.name.split(" ")[0];
  const sinav = siradakiSinav();

  return (
    <AppShell user={user}>
      {/* İlk girişte 4 adımlık karşılama (localStorage ile bir kez gösterilir) */}
      <OnboardingTour />

      {/* Karşılama — kompakt; asıl ağırlık "Bugünün planı" kartında */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rehberim-navy via-rehberim-navy to-rehberim-navy-dark p-5 text-white shadow-soft sm:p-6">
        {/* dekoratif accent ışıklar */}
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-rehberim-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-rehberim-accent/10 blur-3xl" />
        {/* ince grid dokusu — minimal, sadece markaya kurumsallık katar */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-accent-light backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-rehberim-accent-light" />
              Hoş geldin
            </p>
            <h1 className="mt-2.5 text-[1.6rem] font-extrabold leading-tight tracking-tight sm:text-[1.85rem]">
              Merhaba, {firstName}! 👋
            </h1>
            <p className="mt-1.5 max-w-md text-pretty text-[14px] leading-relaxed text-white/70">
              Bugün ne çalışacağını aşağıda hazırladım — istersen menüden
              kendi dersini de seçebilirsin.
            </p>
          </div>
          <OwlSvg className="hidden h-24 w-24 animate-float drop-shadow-[0_14px_28px_rgba(0,0,0,0.35)] sm:block" />
        </div>
      </section>

      {/* Sınava kalan süre — profil > ayarlardan kapatılabilir */}
      <GeriSayim
        hedefIso={sinav.tarih.toISOString()}
        yil={sinav.yil}
        tarihMetni={tarihMetni(sinav.tarih)}
        resmi={sinav.resmi}
      />

      {/* Günün ana görevi */}
      <BugununPlani plan={plan} />

      {/* Kaldığın yer — yeni kullanıcıda hiç görünmez */}
      <KaldiginYerCard veri={plan.kaldiginYer} />

      {/* Vadesi gelen konu tekrarları — tekrar edilecek şey yoksa görünmez.
          Konu adları sunucudan prop olarak geçiyor: istemci bileşeni
          620 KB'lık @/content modülünü paketine çekmesin. */}
      <TekrarZamaniKarti konuAdlari={getTopicNameMap()} />

      {/* Hedef okul — okul taramadan hedef seçilmişse görünür */}
      <HedefOkulKarti />

      {/* PWA install daveti (yalnız uygun cihazlarda + kapatılmamışsa görünür) */}
      <InstallPrompt />

      {/* Hızlı Sorular girişi */}
      <Link
        href="/hizli-sorular"
        className="group relative mt-4 flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark p-5 text-rehberim-on-accent shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-soft"
      >
        {/* yumuşak iç ışıltı (hover'da güçlenir) */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 ease-smooth group-hover:bg-white/25"
        />
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 ease-snap group-hover:scale-[1.05] group-hover:-rotate-6">
          <Zap className="h-8 w-8" />
        </span>
        <div className="relative min-w-0 flex-1">
          <p className="text-lg font-extrabold tracking-tight">Hızlı Sorular</p>
          <p className="text-sm text-rehberim-navy/75">
            Kendi hızında art arda soru — konularını hızlıca pekiştir
          </p>
        </div>
        <span className="relative hidden rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm sm:block">
          Karma + ders ders
        </span>
      </Link>

      {/* Hedef belirleme — okul tarama girişi */}
      <Link
        href="/okullar"
        className="group ring-hairline mt-3 flex items-center gap-3 rounded-2xl border border-rehberim-border bg-white px-4 py-3 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[1px] hover:border-rehberim-navy/20 hover:shadow-soft"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rehberim-navy/5 text-rehberim-navy ring-1 ring-rehberim-navy/10 transition-transform duration-300 ease-snap group-hover:scale-[1.05]">
          <School className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold tracking-tight text-rehberim-navy">
            Hedefin hangi okul?
          </span>
          <span className="block truncate text-xs text-rehberim-navy/55">
            Türkiye&apos;nin en yüksek puanlı liselerinin yıl yıl taban puanları
          </span>
        </span>
        <span className="shrink-0 text-xs font-extrabold text-rehberim-accent-deep transition-transform duration-300 ease-snap group-hover:translate-x-1">
          →
        </span>
      </Link>

      {/* Haftalık özet (veri yoksa gizli) */}
      <WeeklyDigestCard />

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
        <StatsPanel initialStats={stats} initialGoal={goal} />
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
          <Link
            href="/dersler"
            className="text-xs font-bold text-rehberim-accent hover:underline"
          >
            Tümü ve konu performansı →
          </Link>
        </div>
        <SubjectGrid />
      </section>
    </AppShell>
  );
}
