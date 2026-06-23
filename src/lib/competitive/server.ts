/**
 * Rekabetçi mod — server-side veri yardımcıları.
 *
 * Supabase yapılandırılmamış veya kullanıcı giriş yapmamış olsa bile
 * "guest" varsayılan döndürür → arayüz her zaman render edilebilir
 * (mevcut `getStatsServer` örüntüsüne sadık).
 */

import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { DEFAULT_NEW_USER_TIER } from "./ranks";
import { seasonForDate, type Season } from "./seasons";

export type RankRow = {
  tier: number;
  points: number;
  highestTierReached: number;
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  challengeNext: boolean;
};

export type CompetitiveOverview = {
  configured: boolean;
  signedIn: boolean;
  season: Season;
  rank: RankRow;
  /** Henüz hiç maç oynanmamışsa true — UI ona göre boş-durum gösterir. */
  isNewcomer: boolean;
};

const DEFAULT_RANK: RankRow = {
  tier: DEFAULT_NEW_USER_TIER,
  points: 50,
  highestTierReached: DEFAULT_NEW_USER_TIER,
  wins: 0,
  losses: 0,
  draws: 0,
  winStreak: 0,
  challengeNext: false,
};

/**
 * Sezonun rütbe satırını okur; yoksa varsayılan döndürür (lazy migrate
 * insert'ini API route'lar Faz 2'de yapacak).
 */
export async function getCompetitiveOverview(): Promise<CompetitiveOverview> {
  const season = seasonForDate(new Date());

  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      signedIn: false,
      season,
      rank: DEFAULT_RANK,
      isNewcomer: true,
    };
  }

  const user = await getCurrentUser();
  if (!user) {
    return {
      configured: true,
      signedIn: false,
      season,
      rank: DEFAULT_RANK,
      isNewcomer: true,
    };
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_ranks")
    .select(
      "tier, points, highest_tier_reached, wins, losses, draws, win_streak, challenge_next",
    )
    .eq("user_id", user.id)
    .eq("season_id", season.id)
    .maybeSingle();

  if (!data) {
    return {
      configured: true,
      signedIn: true,
      season,
      rank: DEFAULT_RANK,
      isNewcomer: true,
    };
  }

  return {
    configured: true,
    signedIn: true,
    season,
    rank: {
      tier: data.tier,
      points: data.points,
      highestTierReached: data.highest_tier_reached,
      wins: data.wins,
      losses: data.losses,
      draws: data.draws,
      winStreak: data.win_streak,
      challengeNext: data.challenge_next,
    },
    isNewcomer: data.wins + data.losses + data.draws === 0,
  };
}
