import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Link as LinkIcon,
  Lock,
  Swords,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AvatarWithCrest } from "@/components/competitive/AvatarWithCrest";
import { LeagueBadge } from "@/components/competitive/LeagueBadge";
import { LeagueCrest } from "@/components/competitive/LeagueCrest";
import { RankCard } from "@/components/competitive/RankCard";
import { SeasonSummary } from "@/components/competitive/SeasonSummary";
import { SeasonResetCountdown } from "@/components/competitive/SeasonResetCountdown";
import {
  getCompetitiveOverview,
  getPublicProfile,
  getTrophies,
  getUnseenTrophy,
} from "@/lib/competitive/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";
import { LEAGUES, leagueOf, rankLabel } from "@/lib/competitive/ranks";

/** match-pool.ts'teki isValidSubjectFilter whitelist'i ile birebir aynı. */
const DUELLO_DERSLERI = [
  { slug: "turkce", name: "Türkçe" },
  { slug: "matematik", name: "Matematik" },
  { slug: "fen-bilimleri", name: "Fen Bilimleri" },
  { slug: "inkilap", name: "İnkılap" },
  { slug: "din", name: "Din Kültürü" },
  { slug: "ingilizce", name: "İngilizce" },
] as const;

export const metadata = {
  title: "Rekabet — Rehberim",
  description:
    "Diğer öğrencilerle 1v1 düello yap, lig sisteminde yüksel, sezon sonu sıralamaya bak.",
};

export default async function RekabetPage() {
  const [user, overview, authUser] = await Promise.all([
    getShellUser(),
    getCompetitiveOverview(),
    getCurrentUser(),
  ]);

  const { rank, isNewcomer, signedIn, configured } = overview;

  // Faz 5: kalıcı ödüller — lig nişanı + kupa sayısı (yalnız giriş yapmışsa)
  const [profile, trophies, unseenTrophy] = authUser
    ? await Promise.all([
        getPublicProfile(authUser.id),
        getTrophies(authUser.id),
        getUnseenTrophy(authUser.id),
      ])
    : [null, [], null];

  return (
    <AppShell user={user}>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Anasayfaya dön
      </Link>

      {/* Hero header */}
      <header className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
          <Swords className="h-8 w-8" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h1 className="text-xl font-extrabold tracking-tight">Rekabet</h1>
          <p className="text-pretty text-sm text-white/85">
            Rastgele bir öğrenciyle 1v1 düello yap, 10 soruda en hızlı net&apos;i
            atan kazanır. Liginde yüksel, sezon sonu sıralamada yer al.
          </p>
        </div>
      </header>

      {/* Sezon geri sayım */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <SeasonResetCountdown />
        <Link
          href="/rekabet/liderlik"
          className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:shadow-card"
        >
          Sezon sıralaması <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Rank kartı */}
      <RankCard
        tier={rank.tier}
        points={rank.points}
        wins={rank.wins}
        losses={rank.losses}
        winStreak={rank.winStreak}
      />

      {/* Faz 7: sezon kapanış özeti (bir kez) */}
      {unseenTrophy && <SeasonSummary trophy={unseenTrophy} />}

      {/* Faz 5: kalıcı ödüller — lig nişanı + kupa rafı özeti */}
      {signedIn && (
        <section className="ring-hairline mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
          {profile ? (
            <>
              <Link
                href={`/rekabet/oyuncu/${profile.userId}`}
                className="shrink-0"
                title="Herkese açık profilin"
              >
                <AvatarWithCrest user={user} bestTier={profile.bestTier} size={56} />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-navy/55">
                  Lig nişanın · kalıcı
                </p>
                <p className="truncate text-base font-extrabold tracking-tight text-rehberim-navy">
                  {leagueOf(profile.bestTier).name} ligi{" "}
                  <span className="font-semibold text-rehberim-navy/50">
                    · en yüksek {rankLabel(profile.bestTier)}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-rehberim-navy/55">
                  Herkese <strong className="text-rehberim-navy/75">{profile.name}</strong>{" "}
                  olarak görünüyorsun ·{" "}
                  <span className="inline-flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {trophies.length} kupa
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href="/rekabet/gecmis"
                  className="rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:shadow-card"
                >
                  Maç geçmişi
                </Link>
                <Link
                  href="/profile#rekabet"
                  className="rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:shadow-card"
                >
                  Kupa rafı &amp; takma ad
                </Link>
                <Link
                  href="/rekabet/liderlik"
                  className="rounded-xl bg-rehberim-navy px-3 py-2 text-xs font-bold text-white shadow-soft transition-all duration-200 ease-smooth hover:-translate-y-px hover:bg-rehberim-navy-dark"
                >
                  Liderlik
                </Link>
              </div>
            </>
          ) : (
            <>
              <LeagueCrest tier={rank.tier} size={40} className="opacity-50 grayscale" decorative />
              <p className="min-w-0 flex-1 text-sm text-rehberim-navy/65">
                <span className="font-bold text-rehberim-navy">Lig nişanı</span>{" "}
                — ilk maçından sonra profilinde ve liderlik tablosunda
                herkesin göreceği kalıcı arman açılır.
              </p>
            </>
          )}
        </section>
      )}

      {/* Ana CTA — Maç ara */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={signedIn ? "/rekabet/eslesme" : "/login"}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent to-amber-500 p-5 text-white shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-soft"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 ease-smooth group-hover:bg-white/25"
          />
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm transition-transform duration-300 ease-snap group-hover:scale-[1.06]">
            <Swords className="h-6 w-6" />
          </span>
          <div className="relative">
            <p className="text-lg font-extrabold tracking-tight">
              {signedIn ? "Maç ara" : "Giriş yap ve başla"}
            </p>
            <p className="text-sm text-white/85">
              {signedIn
                ? "Liginden bir rakiple eşleş"
                : "Rekabet için giriş gerek"}
            </p>
          </div>
        </Link>

        <Link
          href={signedIn ? "/rekabet/davet" : "/login"}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-border bg-white p-5 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-accent/40 hover:shadow-soft"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rehberim-accent/12 text-rehberim-accent ring-1 ring-rehberim-accent/15">
            <LinkIcon className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-extrabold tracking-tight text-rehberim-navy">
              Arkadaşına meydan oku
            </p>
            <p className="text-pretty text-sm text-rehberim-navy/55">
              Bir link paylaş, özel maç oyna (ranklı değil)
            </p>
          </div>
        </Link>
      </div>

      {/* Faz 1 uyarısı: rekabet sayfaları henüz canlı değil */}
      {!signedIn && configured && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rehberim-border bg-rehberim-muted/40 p-4 text-sm text-rehberim-navy/70">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-navy/40" />
          <p>
            Rekabet modu için giriş yapman gerekiyor.{" "}
            <Link
              href="/login"
              className="font-bold text-rehberim-accent hover:underline"
            >
              Giriş yap
            </Link>{" "}
            veya{" "}
            <Link
              href="/register"
              className="font-bold text-rehberim-accent hover:underline"
            >
              kayıt ol
            </Link>
            .
          </p>
        </div>
      )}

      {isNewcomer && signedIn && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/5 p-4 text-sm text-rehberim-navy/70">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-accent" />
          <p>
            <span className="font-bold text-rehberim-navy">Hoş geldin!</span>{" "}
            Sezon başlangıcında herkes <strong>{rankLabel(rank.tier)}</strong>{" "}
            liginde. İlk maçını oyna ve tırmanmaya başla.
          </p>
        </div>
      )}

      {/* Faz 7: ders seçici — "matematikte iddialıyım" diyen için doğrudan yol */}
      {signedIn && (
        <section className="mt-5 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-rehberim-navy/65">
              Derse özel düello
            </h2>
            <p className="text-xs text-rehberim-navy/50">
              Sorular yalnız seçtiğin dersten gelir
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/rekabet/eslesme"
              className="rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-3 py-2 text-xs font-bold text-rehberim-accent-dark transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-card"
            >
              Karma (tüm dersler)
            </Link>
            {DUELLO_DERSLERI.map((d) => (
              <Link
                key={d.slug}
                href={`/rekabet/eslesme?ders=${d.slug}`}
                className="rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy/75 transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:text-rehberim-navy hover:shadow-card"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Lig vitrini — tüm ligler bir bakışta */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-extrabold tracking-tight text-rehberim-navy">
            Lig sistemi
          </h2>
          <p className="text-sm text-rehberim-navy/55">
            5 lig, her birinde 2 kademe. 100 puana ulaşan bir üst kademeye
            terfi eder. Bir lige çıktıktan sonra altına düşemezsin.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LEAGUES.map((league) => {
            const isCurrent =
              rank.tier >= league.floor && rank.tier <= league.ceiling;
            return (
              <div
                key={league.slug}
                className={`ring-hairline flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 text-center shadow-card transition-all duration-200 ease-smooth ${
                  isCurrent
                    ? "border-rehberim-accent/40 shadow-soft"
                    : "border-rehberim-border"
                }`}
              >
                <LeagueBadge tier={league.floor} size="md" />
                <p className="text-sm font-extrabold tracking-tight text-rehberim-navy">
                  {league.name}
                </p>
                {isCurrent && (
                  <span className="rounded-full bg-rehberim-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rehberim-accent-dark">
                    Şu an buradasın
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Ödüller ve sezon kuralları */}
      <section className="mt-8 rounded-2xl border border-rehberim-border bg-rehberim-muted/40 p-5">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-rehberim-navy/65">
          Ödüller ve sezon
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <LeagueCrest tier={4} size={30} decorative />
            <p className="text-sm leading-relaxed text-rehberim-navy/70">
              <strong className="text-rehberim-navy">Lig nişanı.</strong>{" "}
              Ulaştığın en yüksek ligin arması kalıcıdır; sezon reseti ile
              düşmez, profilinde ve rakiplerine görünür.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-card">
              <Trophy className="h-4 w-4" />
            </span>
            <p className="text-sm leading-relaxed text-rehberim-navy/70">
              <strong className="text-rehberim-navy">Sezon kupası.</strong>{" "}
              Her ayın 1&apos;inde sezon kapanır; bitirdiğin lig ve
              sıralaman kupa olarak rafına eklenir. İlk 3 altın/gümüş/bronz.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-xl bg-rehberim-navy text-white shadow-card">
              <ArrowRight className="h-4 w-4 -rotate-90" />
            </span>
            <p className="text-sm leading-relaxed text-rehberim-navy/70">
              <strong className="text-rehberim-navy">Yumuşak reset.</strong>{" "}
              Yeni sezona bir önceki sezonun 2 kademe altından (en az
              Yükselme 2), 50 puanla başlarsın — nişanın ve kupaların kalır.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
