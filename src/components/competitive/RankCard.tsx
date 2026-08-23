import { Flame } from "lucide-react";
import { LeagueBadge } from "./LeagueBadge";
import {
  divisionOf,
  leagueOf,
  MAX_TIER,
  POINTS_PER_TIER,
  rankLabel,
} from "@/lib/competitive/ranks";

/**
 * Rank kartı — kullanıcının mevcut lig, kademe ve sezonluk puan
 * ilerlemesini gösterir. Lobi ve profilin "Rekabet" bölümünde
 * kullanılır.
 *
 * - 0-99 puan kademe içi ilerleme barını doldurur.
 * - Galibiyet serisi 3+ ise küçük "alev + sayı" rozeti çıkar.
 * - Hover etkisi yok — bu sadece bilgi kartı.
 */
export function RankCard({
  tier,
  points,
  wins,
  losses,
  winStreak = 0,
  className,
}: {
  tier: number;
  points: number;
  wins: number;
  losses: number;
  winStreak?: number;
  className?: string;
}) {
  const league = leagueOf(tier);
  // Şampiyonlar 1 (tier 9) tavan kademedir: puan 100'ü aşarak birikmeye
  // devam eder, terfi yoktur. Orada "93/100" yerine düz puan gösterilir.
  const isApex = tier >= MAX_TIER;
  const pct = Math.min(100, Math.round((points / POINTS_PER_TIER) * 100));
  const totalMatches = wins + losses;
  const winRate =
    totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  return (
    <div
      className={`ring-hairline relative overflow-hidden rounded-3xl border border-rehberim-border bg-white p-5 shadow-card ${className ?? ""}`}
    >
      {/* Lige uygun yumuşak köşe ışıltısı */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full ${league.color.soft} blur-3xl opacity-60`}
      />

      <div className="relative flex items-start gap-4">
        <LeagueBadge tier={tier} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rehberim-navy/55">
            Mevcut lig
          </p>
          <h2 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
            {rankLabel(tier)}
          </h2>
          <p className="mt-1 text-xs text-rehberim-navy/55">
            Kademe {divisionOf(tier)} ·{" "}
            {isApex ? `${points} puan` : `${points}/${POINTS_PER_TIER} puan`}
          </p>

          {winStreak >= 3 && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-600 ring-1 ring-orange-200">
              <Flame className="h-3 w-3" />
              {winStreak} maçlık seri
            </span>
          )}
        </div>
      </div>

      {/* Kademe ilerlemesi */}
      <div className="relative mt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-rehberim-navy/55">
          <span>{isApex ? "Zirve kademe" : "Kademe ilerleme"}</span>
          <span className="tabular-nums text-rehberim-navy">
            {isApex ? "Tavan yok" : `${pct}%`}
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-rehberim-muted">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${league.color.gradientFrom} ${league.color.gradientTo} transition-all duration-700 ease-smooth`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Maç özeti */}
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        <Stat label="Galibiyet" value={wins} />
        <Stat label="Mağlubiyet" value={losses} />
        <Stat label="Kazanma %" value={`${winRate}%`} highlight />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-3 py-2 text-center ${
        highlight ? "border-rehberim-accent/30 bg-rehberim-accent/5" : ""
      }`}
    >
      <p
        className={`text-base font-extrabold tabular-nums ${
          highlight ? "text-rehberim-accent-dark" : "text-rehberim-navy"
        }`}
      >
        {value}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-rehberim-navy/50">
        {label}
      </p>
    </div>
  );
}
