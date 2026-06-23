import { Crown, Sparkles, Star, Sword, TrendingUp } from "lucide-react";
import { divisionOf, leagueOf, rankLabel } from "@/lib/competitive/ranks";

/** Her lig için marka ailesinden seçilmiş bir lucide ikonu. */
const LEAGUE_ICONS = {
  gelisim: TrendingUp,
  yukselme: Sparkles,
  yildizlar: Star,
  derece: Sword,
  sampiyonlar: Crown,
} as const;

const SIZE_CLASSES = {
  sm: {
    box: "h-9 w-9",
    icon: "h-4 w-4",
    division: "text-[10px]",
  },
  md: {
    box: "h-14 w-14",
    icon: "h-6 w-6",
    division: "text-xs",
  },
  lg: {
    box: "h-20 w-20",
    icon: "h-9 w-9",
    division: "text-sm",
  },
} as const;

/**
 * Lig rozeti — 5 lig × 2 kademe için renkli avatar benzeri ikon.
 * `withLabel` ile yanına "Yıldızlar 2" yazısı eklenir.
 */
export function LeagueBadge({
  tier,
  size = "md",
  withLabel = false,
  className,
}: {
  tier: number;
  size?: keyof typeof SIZE_CLASSES;
  withLabel?: boolean;
  className?: string;
}) {
  const league = leagueOf(tier);
  const Icon = LEAGUE_ICONS[league.slug];
  const sz = SIZE_CLASSES[size];
  const division = divisionOf(tier);

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span
        className={`relative flex ${sz.box} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${league.color.gradientFrom} ${league.color.gradientTo} text-white shadow-card ring-1 ring-white/40`}
        title={rankLabel(tier)}
      >
        <Icon className={sz.icon} strokeWidth={2.4} />
        {/* Kademe işareti — sağ alt köşede küçük rozet */}
        <span
          aria-hidden
          className={`absolute -bottom-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 ${sz.division} font-extrabold ${league.color.text} ring-2 ring-white shadow-card`}
        >
          {division}
        </span>
      </span>
      {withLabel && (
        <span className="flex flex-col leading-tight">
          <span className="text-xs font-semibold uppercase tracking-wider text-rehberim-navy/55">
            Lig
          </span>
          <span className={`text-sm font-extrabold ${league.color.text}`}>
            {rankLabel(tier)}
          </span>
        </span>
      )}
    </span>
  );
}
