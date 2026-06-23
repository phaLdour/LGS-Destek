import { leagueOf } from "@/lib/competitive/ranks";
import type { ShellUser } from "@/components/layout/AppShell";
import { Avatar } from "@/components/layout/AppShell";

/**
 * Avatar etrafına ligin renginde ince bir halka çizer.
 * Kullanıcının statüsünü tek bakışta gösterir (rekabet ekranlarında).
 */
export function AvatarFrame({
  user,
  tier,
  size = 48,
}: {
  user: ShellUser;
  tier: number;
  size?: number;
}) {
  const league = leagueOf(tier);
  // Halka kalınlığı: avatar boyutunun ~%6'sı, en az 2 px
  const ringWidth = Math.max(2, Math.round(size * 0.06));
  const innerSize = size - ringWidth * 2;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${league.color.gradientFrom} ${league.color.gradientTo} shadow-card`}
      style={{ width: size, height: size, padding: ringWidth }}
      aria-label={`Avatar — ${league.name} ligi`}
    >
      <span
        className="overflow-hidden rounded-full bg-white"
        style={{ width: innerSize, height: innerSize }}
      >
        <Avatar user={user} size={innerSize} />
      </span>
    </span>
  );
}
