import { divisionOf, leagueOf, rankLabel } from "@/lib/competitive/ranks";
import { LeagueCrest } from "./LeagueCrest";

const SIZE = {
  sm: { crest: 30, division: "text-[10px] h-4 min-w-[16px]" },
  md: { crest: 46, division: "text-xs h-5 min-w-[20px]" },
  lg: { crest: 66, division: "text-sm h-6 min-w-[24px]" },
} as const;

/**
 * Lig rozeti — kademe numarasıyla birlikte lig arması.
 *
 * Faz 7: Daha önce lucide ikonlu yuvarlak bir rozetti; lig nişanı (arma)
 * ile iki ayrı görsel dil oluşuyordu. Artık ikisi de aynı kalkan armasını
 * kullanır — tek fark, buranın sağ alt köşesindeki kademe (1/2) işareti.
 * Props değişmedi, bu yüzden tüm çağrı yerleri olduğu gibi çalışır.
 */
export function LeagueBadge({
  tier,
  size = "md",
  withLabel = false,
  className,
}: {
  tier: number;
  size?: keyof typeof SIZE;
  withLabel?: boolean;
  className?: string;
}) {
  const league = leagueOf(tier);
  const sz = SIZE[size];
  const division = divisionOf(tier);

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="relative inline-flex shrink-0" title={rankLabel(tier)}>
        <LeagueCrest tier={tier} size={sz.crest} decorative />
        <span
          aria-hidden
          className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-white px-1 ${sz.division} font-extrabold ${league.color.text} shadow-card ring-2 ring-white`}
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
