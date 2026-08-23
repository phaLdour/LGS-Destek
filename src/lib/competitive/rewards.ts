/**
 * Rekabetçi mod — kalıcı ödüller (Faz 5).
 *
 *   * Lig nişanı  — `comp_profiles.best_tier`: tüm zamanlarda ulaşılan en
 *                   yüksek kademe. Sezon reseti ile DÜŞMEZ; yalnız yukarı
 *                   gider. Avatarın yanında arma (LeagueCrest) olarak görünür.
 *   * Sezon kupası — `comp_trophies`: sezon kapandığında bitirilen
 *                   lig/kademe + sıralama. Profildeki "kupa rafı".
 *
 * Bu modül yalnız tip + saf yardımcı içerir (client/server ortak).
 */

import { leagueOf, rankLabel } from "./ranks";

export type PublicProfile = {
  userId: string;
  /** Herkese açık ad: takma ad varsa o, yoksa "Ad S." */
  name: string;
  nickname: string | null;
  displayName: string;
  avatarUrl: string | null;
  /** Tüm zamanların en yüksek kademesi (0-9) */
  bestTier: number;
};

export type Trophy = {
  seasonId: number;
  seasonLabel: string;
  finalTier: number;
  finalPoints: number;
  position: number;
  participants: number;
  wins: number;
  losses: number;
  draws: number;
};

export type LeaderboardRow = {
  position: number;
  userId: string;
  name: string;
  avatarUrl: string | null;
  bestTier: number;
  tier: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  isMe: boolean;
};

/** Madalya kademesi — ilk 3 için özel çerçeve. */
export type Medal = "gold" | "silver" | "bronze" | null;

export function medalFor(position: number): Medal {
  if (position === 1) return "gold";
  if (position === 2) return "silver";
  if (position === 3) return "bronze";
  return null;
}

export const MEDAL_STYLE: Record<
  Exclude<Medal, null>,
  { label: string; ring: string; chip: string }
> = {
  gold: {
    label: "Sezon Şampiyonu",
    ring: "ring-2 ring-amber-400",
    chip: "bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950",
  },
  silver: {
    label: "Sezon İkincisi",
    ring: "ring-2 ring-slate-300",
    chip: "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800",
  },
  bronze: {
    label: "Sezon Üçüncüsü",
    ring: "ring-2 ring-orange-300",
    chip: "bg-gradient-to-br from-orange-300 to-amber-700 text-white",
  },
};

/** "Yıldızlar ligi nişanı" gibi erişilebilirlik/tooltip metni. */
export function crestTitle(bestTier: number): string {
  return `${leagueOf(bestTier).name} ligi nişanı — en yüksek: ${rankLabel(bestTier)}`;
}

/** 202608 → "Ağustos 2026" (DB label yoksa yedek). */
export function seasonLabelFromId(id: number): string {
  const year = Math.floor(id / 100);
  const month = id % 100;
  const names = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return `${names[month - 1] ?? month} ${year}`;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(s: string): boolean {
  return UUID_RE.test(s);
}
