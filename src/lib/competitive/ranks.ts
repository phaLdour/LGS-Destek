/**
 * Rekabetçi mod — lig (tier) yardımcıları.
 *
 * Lig kademesi (0-9): tek tam sayıyla tüm karşılaştırma/aritmetiği yapar.
 *   0-1 = Gelişim 2/1
 *   2-3 = Yükselme 2/1
 *   4-5 = Yıldızlar 2/1
 *   6-7 = Derece 2/1
 *   8-9 = Şampiyonlar 2/1
 *
 * Her kademe 0-99 puan arası tutulur. 100'e ulaşan kullanıcı bir üst
 * kademeye terfi eder (Şampiyonlar 1 hariç — orada puanlar artmaya devam
 * edebilir, leaderboard'da overflow olarak gösterilir).
 */

export const LEAGUE_COUNT = 5;
export const TIERS_PER_LEAGUE = 2;
export const POINTS_PER_TIER = 100;
export const MAX_TIER = LEAGUE_COUNT * TIERS_PER_LEAGUE - 1; // 9
export const DEFAULT_NEW_USER_TIER = 2; // Yükselme 2

export type League = {
  slug: "gelisim" | "yukselme" | "yildizlar" | "derece" | "sampiyonlar";
  name: string;
  /** Lige denk gelen tier aralığı [floor, ceiling] (alt-üst kademe) */
  floor: number;
  ceiling: number;
  /** Markaya uygun renk paleti. Birebir Tailwind token kullanılır. */
  color: {
    /** Rozet üst yüzeyi için gradient kök sınıfı */
    gradientFrom: string;
    gradientTo: string;
    /** Hover/ring/zayıf vurgu için yüzey rengi */
    soft: string;
    /** Yazı / ikon rengi */
    text: string;
  };
};

export const LEAGUES: League[] = [
  {
    slug: "gelisim",
    name: "Gelişim",
    floor: 0,
    ceiling: 1,
    color: {
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-600",
      soft: "bg-emerald-50",
      text: "text-emerald-700",
    },
  },
  {
    slug: "yukselme",
    name: "Yükselme",
    floor: 2,
    ceiling: 3,
    // Markanın accent turuncusu — "yükselme" hissi kuvvetli.
    color: {
      gradientFrom: "from-rehberim-accent",
      gradientTo: "to-amber-600",
      soft: "bg-amber-50",
      text: "text-amber-700",
    },
  },
  {
    slug: "yildizlar",
    name: "Yıldızlar",
    floor: 4,
    ceiling: 5,
    color: {
      gradientFrom: "from-violet-500",
      gradientTo: "to-purple-600",
      soft: "bg-violet-50",
      text: "text-violet-700",
    },
  },
  {
    slug: "derece",
    name: "Derece",
    floor: 6,
    ceiling: 7,
    color: {
      gradientFrom: "from-red-500",
      gradientTo: "to-rose-600",
      soft: "bg-red-50",
      text: "text-red-700",
    },
  },
  {
    slug: "sampiyonlar",
    name: "Şampiyonlar",
    floor: 8,
    ceiling: 9,
    color: {
      gradientFrom: "from-amber-300",
      gradientTo: "to-yellow-500",
      soft: "bg-amber-50",
      text: "text-amber-800",
    },
  },
];

/** Verilen tier'ın ait olduğu ligi döner. */
export function leagueOf(tier: number): League {
  const t = clamp(tier, 0, MAX_TIER);
  return LEAGUES.find((l) => t >= l.floor && t <= l.ceiling) ?? LEAGUES[0];
}

/** Lig içindeki kademe: tier çift sayıysa "2" (alt), tekse "1" (üst). */
export function divisionOf(tier: number): 1 | 2 {
  return (tier % 2 === 0 ? 2 : 1) as 1 | 2;
}

/** "Yıldızlar 1", "Gelişim 2" gibi insan-okur isim. */
export function rankLabel(tier: number): string {
  return `${leagueOf(tier).name} ${divisionOf(tier)}`;
}

/** Bir ligin "tabanı" — düşme limiti hesabında kullanılır. */
export function leagueFloor(tier: number): number {
  return leagueOf(tier).floor;
}

/**
 * Maç sonu tier + puan güncellemesi.
 *
 * Kurallar:
 * - `points + delta` 0..99 aralığında kalırsa: tier aynı, puan değişir.
 * - >= 100 ise: tier++ (max MAX_TIER), puan 0'dan başlar veya
 *   Şampiyonlar 1'de (tier=9) puan birikmeye devam eder.
 * - < 0 ise: tier-- (en az `highest_tier_reached - 1`); puan 99'dan başlar.
 *   "Düşme limiti": Bir lige çıktıktan sonra o ligin altına düşemez
 *   (`tier_new = max(tier_new, leagueFloor(highest_tier_reached))`).
 *
 * @returns yeni tier + puan + güncellenmiş highest_tier_reached.
 */
export function applyDelta(
  current: { tier: number; points: number; highestTierReached: number },
  delta: number,
): { tier: number; points: number; highestTierReached: number } {
  let tier = current.tier;
  let points = current.points + delta;
  let highest = current.highestTierReached;

  // Yukarı doğru terfi
  while (points >= POINTS_PER_TIER && tier < MAX_TIER) {
    points -= POINTS_PER_TIER;
    tier += 1;
    if (tier > highest) highest = tier;
  }
  // Şampiyonlar 1 tavanı: puan birikmeye devam eder (overflow leaderboard'a)
  if (tier === MAX_TIER && points >= POINTS_PER_TIER) {
    // Birikir; clamp etmiyoruz, leaderboard'a yansır.
  }

  // Aşağı doğru regresyon — düşme limiti uygulanır
  const floorTier = leagueFloor(highest);
  while (points < 0 && tier > floorTier) {
    tier -= 1;
    points += POINTS_PER_TIER;
  }
  // Lig zemininde puan negatif kalmasın
  if (points < 0) points = 0;

  // Şampiyonlar 1'de puan üst sınır YOK; diğer tüm tier'larda 99 ile clamp
  if (tier < MAX_TIER && points > POINTS_PER_TIER - 1) {
    points = POINTS_PER_TIER - 1;
  }

  return { tier, points, highestTierReached: highest };
}

/**
 * Sezon reset (yumuşak — kullanıcı kararı):
 * Yeni sezonda tier 2 kademe iner, puan 50'ye sıfırlanır,
 * highest_tier_reached yeni tier'a eşitlenir (bir sonraki sezon
 * için temiz başlangıç).
 */
export function seasonReset(prevTier: number): {
  tier: number;
  points: number;
  highestTierReached: number;
} {
  const tier = clamp(prevTier - 2, 0, MAX_TIER);
  return {
    tier,
    points: 50,
    highestTierReached: tier,
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}
