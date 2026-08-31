import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Flame, Pencil, Swords, Trophy, UserX } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { BildirDugmesi } from "@/components/moderasyon/BildirDugmesi";
import { AvatarWithCrest } from "@/components/competitive/AvatarWithCrest";
import { LeagueBadge } from "@/components/competitive/LeagueBadge";
import { LeagueCrest } from "@/components/competitive/LeagueCrest";
import { TrophyShelf } from "@/components/competitive/TrophyShelf";
import {
  leagueOf,
  MAX_TIER,
  POINTS_PER_TIER,
  rankLabel,
} from "@/lib/competitive/ranks";
import { crestTitle, isUuid } from "@/lib/competitive/rewards";
import { seasonForDate } from "@/lib/competitive/seasons";
import {
  getAllTimeRecord,
  getPublicProfile,
  getSeasonRank,
  getTrophies,
} from "@/lib/competitive/server";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Oyuncu profili — Rekabet",
};

/**
 * Herkese açık oyuncu profili: lig nişanı, bu sezonki rütbe, tüm
 * zamanlar özeti ve kupa rafı. Ad olarak yalnız takma ad / "Ad S."
 * gösterilir — soyad ve e-posta asla.
 */
export default async function OyuncuPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  if (!isSupabaseConfigured()) redirect("/rekabet");
  const viewer = await getCurrentUser();
  const { userId } = await params;
  if (!viewer) redirect(`/login?next=/rekabet/oyuncu/${userId}`);
  if (!isUuid(userId)) redirect("/rekabet/liderlik");

  const season = seasonForDate(new Date());
  const [shellUser, profile, trophies, seasonRank, allTime] = await Promise.all([
    getShellUser(),
    getPublicProfile(userId),
    getTrophies(userId),
    getSeasonRank(userId, season.id),
    getAllTimeRecord(userId),
  ]);

  const isMe = viewer.id === userId;

  if (!profile) {
    return (
      <AppShell user={shellUser}>
        <BackLink />
        <div className="ring-hairline flex flex-col items-center gap-3 rounded-3xl border border-rehberim-border bg-white p-10 text-center shadow-card">
          <UserX className="h-8 w-8 text-rehberim-navy/30" />
          <p className="text-sm text-rehberim-navy/60">
            {isMe
              ? "Henüz rekabet profilin yok — ilk maçını oynadığında oluşur."
              : "Bu oyuncunun henüz rekabet profili yok."}
          </p>
          <Link
            href={isMe ? "/rekabet/eslesme" : "/rekabet/liderlik"}
            className="rounded-xl bg-rehberim-navy px-4 py-2 text-sm font-bold text-white shadow-soft"
          >
            {isMe ? "Maç ara" : "Liderlik tablosu"}
          </Link>
        </div>
      </AppShell>
    );
  }

  const league = leagueOf(profile.bestTier);
  const totalMatches = allTime.wins + allTime.losses + allTime.draws;
  const winRate = totalMatches > 0 ? Math.round((allTime.wins / totalMatches) * 100) : 0;
  const seasonMatches = seasonRank
    ? seasonRank.wins + seasonRank.losses + seasonRank.draws
    : 0;

  return (
    <AppShell user={shellUser}>
      <BackLink />

      {/* Kimlik kartı */}
      <header className="ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-white p-6 shadow-card">
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full ${league.color.soft} blur-3xl opacity-80`}
        />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <AvatarWithCrest
            user={{ name: profile.name, email: "", avatarUrl: profile.avatarUrl }}
            bestTier={profile.bestTier}
            size={96}
          />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h1 className="truncate text-2xl font-extrabold tracking-tight text-rehberim-navy">
              {profile.name}
            </h1>
            <p className={`mt-1 text-sm font-bold ${league.color.text}`}>
              {league.name} ligi nişanı
              <span className="font-semibold text-rehberim-navy/50">
                {" "}
                · en yüksek {rankLabel(profile.bestTier)}
              </span>
            </p>
            <p className="mt-2 text-xs text-rehberim-navy/55">
              {trophies.length} kupa · {totalMatches} maç · %{winRate} kazanma
              {allTime.seasons > 0 && ` · ${allTime.seasons} sezon`}
            </p>
            {/* Uygunsuz takma adı bildirme (FAZ 17). Yalnız BAŞKASININ
                profilinde ve ad zaten gizlenmemişse görünür — gizlenmiş
                bir adı tekrar bildirmenin anlamı yok. */}
            {!isMe && profile.nickname && !profile.takmaAdGizli && (
              <div className="mt-3 flex justify-center sm:justify-start">
                <BildirDugmesi
                  hedefKullaniciId={userId}
                  hedefAd={profile.name}
                />
              </div>
            )}

            {isMe && (
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-rehberim-muted px-2.5 py-1 text-[11px] font-bold text-rehberim-navy/60 ring-1 ring-rehberim-border">
                  Bu, diğer öğrencilerin gördüğü profilin
                </span>
                <Link
                  href="/profile#rekabet"
                  className="inline-flex items-center gap-1 rounded-full bg-rehberim-navy px-2.5 py-1 text-[11px] font-bold text-white"
                >
                  <Pencil className="h-3 w-3" />
                  Takma adı düzenle
                </Link>
                <Link
                  href="/rekabet/gecmis"
                  className="inline-flex items-center gap-1 rounded-full border border-rehberim-border bg-white px-2.5 py-1 text-[11px] font-bold text-rehberim-navy/70"
                >
                  Maç geçmişin
                </Link>
              </div>
            )}
          </div>
          <div className="hidden shrink-0 sm:block" title={crestTitle(profile.bestTier)}>
            <LeagueCrest tier={profile.bestTier} size={72} />
          </div>
        </div>
      </header>

      {/* Bu sezon + tüm zamanlar */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <section className="ring-hairline rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-navy/55">
            Bu sezon · {season.label}
          </h2>
          {seasonRank ? (
            <div className="mt-3 flex items-center gap-4">
              <LeagueBadge tier={seasonRank.tier} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-lg font-extrabold tracking-tight text-rehberim-navy">
                  {rankLabel(seasonRank.tier)}
                </p>
                <p className="text-xs text-rehberim-navy/55">
                  {seasonRank.tier >= MAX_TIER
                    ? `${seasonRank.points} puan`
                    : `${seasonRank.points}/${POINTS_PER_TIER} puan`}{" "}
                  · {seasonRank.wins}G{" "}
                  {seasonRank.losses}M
                  {seasonRank.draws > 0 && ` ${seasonRank.draws}B`} · {seasonMatches} maç
                </p>
                {seasonRank.winStreak >= 3 && (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-600 ring-1 ring-orange-200">
                    <Flame className="h-3 w-3" />
                    {seasonRank.winStreak} maçlık seri
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="mt-3 flex items-center gap-2 text-sm text-rehberim-navy/55">
              <Swords className="h-4 w-4 text-rehberim-navy/35" />
              Bu sezon henüz maç oynamadı.
            </p>
          )}
        </section>

        <section className="ring-hairline rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-navy/55">
            Tüm zamanlar
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat label="Galibiyet" value={allTime.wins} tone="text-emerald-600" />
            <Stat label="Mağlubiyet" value={allTime.losses} tone="text-red-600" />
            <Stat label="Kazanma %" value={`%${winRate}`} tone="text-rehberim-accent-deep" />
          </div>
        </section>
      </div>

      {/* Kupa rafı */}
      <section className="mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-rehberim-navy">
            <Trophy className="h-5 w-5 text-rehberim-accent" />
            Kupa rafı
          </h2>
          <Link
            href="/rekabet/liderlik"
            className="text-xs font-bold text-rehberim-navy/60 hover:text-rehberim-navy"
          >
            Liderlik tablosu →
          </Link>
        </div>
        <TrophyShelf
          trophies={trophies}
          emptyHint={
            isMe
              ? "Henüz kupan yok. Sezon kapanınca (her ayın 1'i) o sezonki ligin ve sıralaman kalıcı kupa olarak buraya eklenir."
              : "Bu oyuncunun henüz kupası yok."
          }
        />
      </section>
    </AppShell>
  );
}

function BackLink() {
  return (
    <Link
      href="/rekabet/liderlik"
      className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
    >
      <ArrowLeft className="h-4 w-4" />
      Liderlik tablosu
    </Link>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl bg-rehberim-muted/70 px-3 py-3 text-center">
      <p className={`text-lg font-extrabold tabular-nums ${tone}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-rehberim-navy/50">
        {label}
      </p>
    </div>
  );
}
