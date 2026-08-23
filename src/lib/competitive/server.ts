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
import {
  seasonLabelFromId,
  type LeaderboardRow,
  type PublicProfile,
  type Trophy,
} from "./rewards";
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
  const RANK_COLS =
    "tier, points, highest_tier_reached, wins, losses, draws, win_streak, challenge_next";
  let { data } = await supabase
    .from("comp_ranks")
    .select(RANK_COLS)
    .eq("user_id", user.id)
    .eq("season_id", season.id)
    .maybeSingle();

  // Faz 5: sezon satırı yoksa SQL tarafında oluştur (önceki sezondan
  // yumuşak reset + süresi dolmuş sezonların kapanışı/kupa dağıtımı).
  // Böylece lobi, kuyruğa girmeden önce de doğru ligi gösterir.
  if (!data) {
    const { error } = await supabase.rpc("comp_ensure_season_and_rank", {
      p_user_id: user.id,
    });
    if (!error) {
      ({ data } = await supabase
        .from("comp_ranks")
        .select(RANK_COLS)
        .eq("user_id", user.id)
        .eq("season_id", season.id)
        .maybeSingle());
    }
  }

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

// ════════════════════════════════════════════════════════════════════
// FAZ 5 — Kalıcı ödüller: herkese açık profil, kupalar, liderlik
// ════════════════════════════════════════════════════════════════════

type ProfileRow = {
  user_id: string;
  nickname: string | null;
  display_name: string;
  avatar_url: string | null;
  best_tier: number;
};

function toPublicProfile(r: ProfileRow): PublicProfile {
  return {
    userId: r.user_id,
    name: r.nickname ?? r.display_name ?? "Öğrenci",
    nickname: r.nickname,
    displayName: r.display_name ?? "Öğrenci",
    avatarUrl: r.avatar_url,
    bestTier: r.best_tier,
  };
}

/** Herkese açık rekabet profili (comp_profiles). Satır yoksa null. */
export async function getPublicProfile(
  userId: string,
): Promise<PublicProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_profiles")
    .select("user_id, nickname, display_name, avatar_url, best_tier")
    .eq("user_id", userId)
    .maybeSingle();
  return data ? toPublicProfile(data as ProfileRow) : null;
}

/** Birden çok kullanıcının profili (maç ekranı: rakip kimliği). */
export async function getPublicProfiles(
  userIds: string[],
): Promise<Map<string, PublicProfile>> {
  const map = new Map<string, PublicProfile>();
  if (!isSupabaseConfigured() || userIds.length === 0) return map;
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_profiles")
    .select("user_id, nickname, display_name, avatar_url, best_tier")
    .in("user_id", userIds);
  for (const r of (data ?? []) as ProfileRow[]) {
    map.set(r.user_id, toPublicProfile(r));
  }
  return map;
}

/** Kullanıcının sezon kupaları — en yeni sezon önce. */
export async function getTrophies(userId: string): Promise<Trophy[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_trophies")
    .select(
      "season_id, final_tier, final_points, rank_position, participants, wins, losses, draws, comp_seasons(label)",
    )
    .eq("user_id", userId)
    .order("season_id", { ascending: false });

  type Row = {
    season_id: number;
    final_tier: number;
    final_points: number;
    rank_position: number;
    participants: number;
    wins: number;
    losses: number;
    draws: number;
    comp_seasons: { label: string } | { label: string }[] | null;
  };

  return ((data ?? []) as unknown as Row[]).map((r) => {
    const s = Array.isArray(r.comp_seasons) ? r.comp_seasons[0] : r.comp_seasons;
    return {
      seasonId: r.season_id,
      seasonLabel: s?.label ?? seasonLabelFromId(r.season_id),
      finalTier: r.final_tier,
      finalPoints: r.final_points,
      position: r.rank_position,
      participants: r.participants,
      wins: r.wins,
      losses: r.losses,
      draws: r.draws,
    };
  });
}

export type SeasonSummary = { id: number; label: string; closed: boolean };

/** Tüm sezonlar (en yeni önce). Liderlik sezon seçici için. */
export async function getSeasons(): Promise<SeasonSummary[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_seasons")
    .select("id, label, closed_at")
    .order("id", { ascending: false });
  return ((data ?? []) as { id: number; label: string; closed_at: string | null }[]).map(
    (s) => ({ id: s.id, label: s.label, closed: !!s.closed_at }),
  );
}

/**
 * Liderlik tablosu — `comp_leaderboard` RPC. Yalnız ≥1 maç oynayanlar;
 * ilk `limit` satır + çağıranın kendi satırı (sıralama dışındaysa da).
 */
export async function getLeaderboard(
  seasonId: number | null,
  limit = 50,
): Promise<LeaderboardRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.rpc("comp_leaderboard", {
    p_season_id: seasonId,
    p_limit: limit,
  });
  type Row = {
    rank_position: number;
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    best_tier: number;
    tier: number;
    points: number;
    wins: number;
    losses: number;
    draws: number;
    win_streak: number;
    is_me: boolean;
  };
  return ((data ?? []) as Row[]).map((r) => ({
    position: r.rank_position,
    userId: r.user_id,
    name: r.display_name,
    avatarUrl: r.avatar_url,
    bestTier: r.best_tier,
    tier: r.tier,
    points: r.points,
    wins: r.wins,
    losses: r.losses,
    draws: r.draws,
    winStreak: r.win_streak,
    isMe: r.is_me,
  }));
}

/** Belirli kullanıcının belirli sezondaki rütbesi (Faz 5: herkes okuyabilir). */
export async function getSeasonRank(
  userId: string,
  seasonId: number,
): Promise<RankRow | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_ranks")
    .select(
      "tier, points, highest_tier_reached, wins, losses, draws, win_streak, challenge_next",
    )
    .eq("user_id", userId)
    .eq("season_id", seasonId)
    .maybeSingle();
  if (!data) return null;
  return {
    tier: data.tier,
    points: data.points,
    highestTierReached: data.highest_tier_reached,
    wins: data.wins,
    losses: data.losses,
    draws: data.draws,
    winStreak: data.win_streak,
    challengeNext: data.challenge_next,
  };
}

export type AllTimeRecord = {
  wins: number;
  losses: number;
  draws: number;
  seasons: number;
};

/** Tüm sezonların toplamı (herkese açık profil özeti). */
export async function getAllTimeRecord(userId: string): Promise<AllTimeRecord> {
  const empty: AllTimeRecord = { wins: 0, losses: 0, draws: 0, seasons: 0 };
  if (!isSupabaseConfigured()) return empty;
  const supabase = await createClient();
  const { data } = await supabase
    .from("comp_ranks")
    .select("wins, losses, draws")
    .eq("user_id", userId);
  const rows = (data ?? []) as { wins: number; losses: number; draws: number }[];
  return rows.reduce<AllTimeRecord>(
    (acc, r) => ({
      wins: acc.wins + r.wins,
      losses: acc.losses + r.losses,
      draws: acc.draws + r.draws,
      seasons: acc.seasons + 1,
    }),
    empty,
  );
}
