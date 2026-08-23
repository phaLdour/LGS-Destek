import { Trophy as TrophyIcon } from "lucide-react";
import { rankLabel } from "@/lib/competitive/ranks";
import { MEDAL_STYLE, medalFor, type Trophy } from "@/lib/competitive/rewards";
import { LeagueCrest } from "./LeagueCrest";

/**
 * Kupa rafı — sezon sonu kupaları (kalıcı). Her kupa: sezon adı,
 * bitirilen lig/kademe arması, sıralama ve G/M özeti. İlk 3 için
 * altın/gümüş/bronz çerçeve.
 */
export function TrophyShelf({
  trophies,
  compact = false,
  emptyHint = "Henüz kupan yok. Sezon kapanınca (her ayın 1'i) o sezonki ligin ve sıralaman kalıcı kupa olarak buraya eklenir.",
}: {
  trophies: Trophy[];
  compact?: boolean;
  emptyHint?: string;
}) {
  if (trophies.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted/50 p-4 text-sm text-rehberim-navy/60">
        <TrophyIcon className="mt-0.5 h-4 w-4 shrink-0 text-rehberim-navy/40" />
        <p>{emptyHint}</p>
      </div>
    );
  }

  return (
    <ul
      className={`grid gap-3 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}
    >
      {trophies.map((t) => (
        <li key={t.seasonId}>
          <TrophyCard trophy={t} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

export function TrophyCard({
  trophy,
  compact = false,
}: {
  trophy: Trophy;
  compact?: boolean;
}) {
  const medal = medalFor(trophy.position);
  const medalStyle = medal ? MEDAL_STYLE[medal] : null;

  return (
    <div
      className={`ring-hairline relative flex h-full items-center gap-3 overflow-hidden rounded-2xl border border-rehberim-border bg-white p-3 shadow-card ${
        medalStyle ? medalStyle.ring : ""
      }`}
      title={`${trophy.seasonLabel} sezonu · ${rankLabel(trophy.finalTier)} · ${trophy.participants} oyuncu arasında ${trophy.position}.`}
    >
      <LeagueCrest
        tier={trophy.finalTier}
        size={compact ? 36 : 44}
        title={`${trophy.seasonLabel}: ${rankLabel(trophy.finalTier)}`}
      />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-rehberim-navy/55">
          {trophy.seasonLabel}
        </p>
        <p className="truncate text-sm font-extrabold text-rehberim-navy">
          {rankLabel(trophy.finalTier)}
          <span className="font-semibold text-rehberim-navy/50">
            {" "}
            · {trophy.finalPoints}p
          </span>
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold tabular-nums ${
              medalStyle
                ? medalStyle.chip
                : "bg-rehberim-muted text-rehberim-navy/70"
            }`}
          >
            <TrophyIcon className="h-3 w-3" />#{trophy.position}
            {medalStyle && !compact && (
              <span className="hidden sm:inline"> · {medalStyle.label}</span>
            )}
          </span>
          {!compact && (
            <span className="text-[11px] tabular-nums text-rehberim-navy/50">
              {trophy.wins}G {trophy.losses}M · {trophy.participants} oyuncu
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
