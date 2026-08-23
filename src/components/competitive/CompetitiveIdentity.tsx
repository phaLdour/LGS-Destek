import Link from "next/link";
import { ExternalLink, History, Swords, Trophy } from "lucide-react";
import type { ShellUser } from "@/components/layout/AppShell";
import { leagueOf, rankLabel } from "@/lib/competitive/ranks";
import { getPublicProfile, getTrophies } from "@/lib/competitive/server";
import { AvatarWithCrest } from "./AvatarWithCrest";
import { LeagueCrest } from "./LeagueCrest";
import { NicknameEditor } from "./NicknameEditor";
import { TrophyShelf } from "./TrophyShelf";

/**
 * Profil sayfası "Rekabet kimliğin" bölümü (server component):
 * lig nişanı + takma ad düzenleyici + kupa rafı + herkese açık profil linki.
 */
export async function CompetitiveIdentity({
  userId,
  shellUser,
  configured,
}: {
  userId: string;
  shellUser: ShellUser;
  configured: boolean;
}) {
  const [profile, trophies] = await Promise.all([
    getPublicProfile(userId),
    getTrophies(userId),
  ]);

  // Türetilmiş ad (takma ad boşken görünen): profil yoksa addan üret
  const derivedName =
    profile?.displayName ?? deriveDisplayName(shellUser.name);

  return (
    <section
      id="rekabet"
      className="scroll-mt-24 space-y-5 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-rehberim-navy">
            Rekabet kimliğin
          </h2>
          <p className="text-sm text-rehberim-navy/55">
            Liderlik tablosunda ve maçlarda diğer öğrencilerin gördüğü ad,
            arma ve kupalar.
          </p>
        </div>
        {profile && (
          <div className="flex flex-wrap gap-2">
          <Link
            href="/rekabet/gecmis"
            className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:shadow-card"
          >
            <History className="h-3.5 w-3.5" />
            Maç geçmişi
          </Link>
          <Link
            href={`/rekabet/oyuncu/${userId}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/40 hover:shadow-card"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Herkese açık profilini gör
          </Link>
          </div>
        )}
      </div>

      {/* Nişan */}
      {profile ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl bg-rehberim-muted/60 p-4 sm:flex-row">
          <AvatarWithCrest user={shellUser} bestTier={profile.bestTier} size={72} />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-navy/55">
              Lig nişanı · kalıcı
            </p>
            <p className={`text-lg font-extrabold tracking-tight ${leagueOf(profile.bestTier).color.text}`}>
              {leagueOf(profile.bestTier).name} ligi
            </p>
            <p className="text-xs text-rehberim-navy/55">
              Tüm zamanlarda ulaştığın en yüksek kademe:{" "}
              <strong className="text-rehberim-navy/75">{rankLabel(profile.bestTier)}</strong>.
              Sezon reseti ile düşmez; bir üst lige çıkınca arma yükselir.
            </p>
          </div>
          <LeagueCrest tier={profile.bestTier} size={56} className="hidden sm:block" />
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted/50 p-4 text-sm text-rehberim-navy/60">
          <Swords className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-navy/40" />
          <p>
            Henüz rekabet profilin yok. İlk maçını oynadığında lig nişanın
            oluşur ve profilinde görünür.{" "}
            <Link href="/rekabet/eslesme" className="font-bold text-rehberim-accent hover:underline">
              Maç ara →
            </Link>
          </p>
        </div>
      )}

      {/* Takma ad */}
      <NicknameEditor
        initialNickname={profile?.nickname ?? null}
        derivedName={derivedName}
        configured={configured}
      />

      {/* Kupa rafı */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-rehberim-navy/65">
          <Trophy className="h-4 w-4 text-rehberim-accent" />
          Kupa rafı
          <span className="rounded-full bg-rehberim-muted px-2 py-0.5 text-[10px] text-rehberim-navy/55">
            {trophies.length}
          </span>
        </h3>
        <TrophyShelf trophies={trophies} compact />
      </div>
    </section>
  );
}

/** SQL'deki comp_derive_display_name ile aynı kural (önizleme için). */
function deriveDisplayName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Öğrenci";
  if (parts.length >= 2) return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  return parts[0];
}
