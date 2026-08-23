import { Avatar, type ShellUser } from "@/components/layout/AppShell";
import { leagueOf } from "@/lib/competitive/ranks";
import { crestTitle } from "@/lib/competitive/rewards";
import { LeagueCrest } from "./LeagueCrest";

/**
 * Avatar + lig nişanı: avatarın sağ alt köşesine, tüm zamanların en
 * yüksek ligini gösteren arma iliştirilir. Nişan yoksa (hiç rekabet
 * oynamamış) düz avatar.
 *
 * Halka rengi nişanın ligine göre — "dışarıdan bakınca" kullanıcının
 * rütbesi tek bakışta anlaşılsın.
 */
export function AvatarWithCrest({
  user,
  bestTier,
  size = 48,
  className,
}: {
  user: ShellUser;
  bestTier: number | null | undefined;
  size?: number;
  className?: string;
}) {
  if (bestTier === null || bestTier === undefined) {
    return (
      <span className={`inline-flex shrink-0 ${className ?? ""}`}>
        <Avatar user={user} size={size} />
      </span>
    );
  }

  const league = leagueOf(bestTier);
  const ring = Math.max(2, Math.round(size * 0.05));
  const crest = Math.max(16, Math.round(size * 0.46));

  return (
    <span
      className={`relative inline-flex shrink-0 ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <span
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br ${league.color.gradientFrom} ${league.color.gradientTo}`}
        style={{ width: size, height: size, padding: ring }}
      >
        <span
          className="overflow-hidden rounded-full bg-white"
          style={{ width: size - ring * 2, height: size - ring * 2 }}
        >
          <Avatar user={user} size={size - ring * 2} />
        </span>
      </span>
      <span
        className="absolute -bottom-1 -right-1 leading-none"
        title={crestTitle(bestTier)}
      >
        <LeagueCrest tier={bestTier} size={crest} title={crestTitle(bestTier)} />
      </span>
    </span>
  );
}
