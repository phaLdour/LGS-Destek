"use client";

import { useState } from "react";
import { Trophy, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { rankLabel } from "@/lib/competitive/ranks";
import { MEDAL_STYLE, medalFor, type Trophy as TrophyType } from "@/lib/competitive/rewards";
import { LeagueCrest } from "./LeagueCrest";

/**
 * Sezon kapanış özeti — kapanan sezonun kupası ilk kez gösterildiğinde
 * çıkan kutlama bandı. "Anladım" deyince comp_mark_trophy_seen ile
 * damgalanır ve bir daha çıkmaz.
 */
export function SeasonSummary({ trophy }: { trophy: TrophyType }) {
  const [dismissed, setDismissed] = useState(false);
  const [saving, setSaving] = useState(false);
  if (dismissed) return null;

  const medal = medalFor(trophy.position);
  const medalStyle = medal ? MEDAL_STYLE[medal] : null;

  async function dismiss() {
    setDismissed(true); // iyimser: kullanıcı beklemesin
    setSaving(true);
    try {
      await createClient().rpc("comp_mark_trophy_seen", {
        p_season_id: trophy.seasonId,
      });
    } catch {
      // sessiz — bir dahaki açılışta tekrar çıkabilir, veri kaybı yok
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="ring-hairline relative mt-5 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-soft">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-rehberim-accent/25 blur-3xl"
      />
      <button
        onClick={dismiss}
        disabled={saving}
        aria-label="Kapat"
        className="absolute right-3 top-3 rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="animate-scale-in shrink-0">
          <LeagueCrest tier={trophy.finalTier} size={64} decorative />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
            {trophy.seasonLabel} sezonu kapandı
          </p>
          <h2 className="text-xl font-extrabold tracking-tight">
            {trophy.participants} oyuncu arasında {trophy.position}. bitirdin
          </h2>
          <p className="mt-0.5 text-sm text-white/85">
            {rankLabel(trophy.finalTier)} · {trophy.finalPoints} puan ·{" "}
            {trophy.wins}G {trophy.losses}M
            {trophy.draws > 0 ? ` ${trophy.draws}B` : ""}
            {" — kupan rafına eklendi."}
          </p>
          {medalStyle && (
            <span
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${medalStyle.chip}`}
            >
              <Trophy className="h-3 w-3" />
              {medalStyle.label}
            </span>
          )}
        </div>

        <button
          onClick={dismiss}
          disabled={saving}
          className="shrink-0 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-extrabold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25 disabled:opacity-60"
        >
          Anladım
        </button>
      </div>
    </section>
  );
}
