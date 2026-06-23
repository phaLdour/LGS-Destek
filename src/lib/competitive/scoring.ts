/**
 * Rekabetçi mod — saf skor + puan değişimi (delta) çekirdeği.
 *
 * Bu modül HİÇBİR I/O yapmaz; verilen sayılardan deterministik bir sonuç
 * üretir. Hem server (API route) hem mock test bunu kullanır.
 */

import { leagueOf, leagueFloor, MAX_TIER } from "./ranks";

/** Bir oyuncunun maçtaki performansı. */
export type Side = {
  /** 0..10 — server'da doğrulanmış doğru cevap sayısı. */
  correct: number;
  /** 0..10 — cevaplanmamış (boş) soru sayısı. */
  blank: number;
  /** Maç boyunca toplam süre (saniye, server-zaman). */
  durationSeconds: number;
  /** Maç başındaki tier (0-9). */
  tierAtStart: number;
};

/**
 * Kullanıcının istediği formül:
 *   doğruluk_yüzdesi = (doğru − boş) × 10
 *   skor             = max(0, doğruluk_yüzdesi) / max(60, süre_saniye)
 *
 * - `max(0, ...)` negatif doğruluk (boş > doğru) sıfırlanır.
 * - `max(60, ...)` patolojik küçük süre (0 sn'lik anormal kayıt) etkisini
 *   azaltır; gerçek 10 dk = 600 sn olduğundan büyük çoğunlukta sınır
 *   etkisiz, kaba anomalileri önler.
 *
 * Örnek (kullanıcının verdiği):
 *   70/300 ≈ 0.2333  →  kazanır
 *   70/400 ≈ 0.1750  →  kaybeder
 */
export function score(
  correct: number,
  blank: number,
  durationSeconds: number,
): number {
  const accuracyPercent = (correct - blank) * 10;
  return Math.max(0, accuracyPercent) / Math.max(60, durationSeconds);
}

export type DeltaResult = {
  /** Kazananın alacağı puan (pozitif tam sayı, 10..60). */
  winnerDelta: number;
  /** Kaybedenin kaybedeceği puan (negatif tam sayı, -40..-10). */
  loserDelta: number;
  /** Maç "ezici üstünlük" sayıldı mı? (kullanıcı: ratio ≥ ~2x'e karşılık) */
  decisive: boolean;
  /** Skorlardan hesaplanan margin (0=yakın, 1=ezici). */
  margin: number;
};

/**
 * Maç sonu puan değişimini hesaplar.
 *
 * Kullanıcının kuralları:
 *   - Yakın maç → ±10 minimum.
 *   - Ezici → kazanan +30..50, kaybeden −20..30.
 *   - Üst lig rakibine karşı: kaybedersen az kayıp, kazanırsan çok kazanım.
 *
 * Formül:
 *   ratio  = winner.score / max(loser.score, eps)
 *   margin = clamp((ratio - 1) / 1.5, 0, 1)
 *   baseWin  = 10 + margin * 40   (10..50)
 *   baseLoss = 10 + margin * 20   (10..30)
 *   tierGap  = winner.tier − loser.tier (alt lig kazandıysa negatif → bonus)
 *   winnerDelta = clamp(baseWin  − 4 * tierGap, 10, 60)
 *   loserDelta  = clamp(-(baseLoss + 4 * tierGap), -40, -10)
 *
 * Galibiyet serisi bonusu burada hesaplanmaz — çağıran tarafça
 * (`winStreakBonus`) `winnerDelta`'ya eklenir.
 */
export function deltas(winner: Side, loser: Side): DeltaResult {
  const wScore = score(winner.correct, winner.blank, winner.durationSeconds);
  const lScore = score(loser.correct, loser.blank, loser.durationSeconds);

  // Tüm skorlar 0 ise (her ikisi de tam yanlış + boş) draw'a yakın
  const ratio = wScore / Math.max(lScore, 1e-3);
  const margin = Math.max(0, Math.min(1, (ratio - 1) / 1.5));

  const baseWin = Math.round(10 + margin * 40);
  const baseLoss = Math.round(10 + margin * 20);

  const tierGap = winner.tierAtStart - loser.tierAtStart;

  const winnerDelta = clamp(baseWin - 4 * tierGap, 10, 60);
  const loserDelta = clamp(-(baseLoss + 4 * tierGap), -40, -10);

  return {
    winnerDelta,
    loserDelta,
    decisive: margin >= 0.7,
    margin,
  };
}

/**
 * Galibiyet serisi bonusu (kullanıcının istediği özellik).
 *  3 maç üst üste → +5
 *  5 maç üst üste → +10
 *  7+ maç üst üste → +20
 * Bir kayıp seriyi sıfırlar.
 */
export function winStreakBonus(streak: number): number {
  if (streak >= 7) return 20;
  if (streak >= 5) return 10;
  if (streak >= 3) return 5;
  return 0;
}

/**
 * Tek bir maçtan iki oyuncunun skorlarını + delta + kazananı tek seferde
 * hesaplar. API route'un finalize aşamasında çağırılır.
 *
 * Beraberlik (skorlar eşit ya da iki taraf da 0) durumunda her iki tarafa
 * 0 delta verilir; winnerId null döner.
 */
export type MatchOutcome = {
  p1Score: number;
  p2Score: number;
  p1Delta: number;
  p2Delta: number;
  winnerId: 1 | 2 | null;
  decisive: boolean;
  margin: number;
};

export function computeOutcome(p1: Side, p2: Side): MatchOutcome {
  const s1 = score(p1.correct, p1.blank, p1.durationSeconds);
  const s2 = score(p2.correct, p2.blank, p2.durationSeconds);

  // Beraberlik
  if (s1 === s2) {
    return {
      p1Score: s1,
      p2Score: s2,
      p1Delta: 0,
      p2Delta: 0,
      winnerId: null,
      decisive: false,
      margin: 0,
    };
  }

  const winnerIsP1 = s1 > s2;
  const winner = winnerIsP1 ? p1 : p2;
  const loser = winnerIsP1 ? p2 : p1;
  const d = deltas(winner, loser);

  return {
    p1Score: s1,
    p2Score: s2,
    p1Delta: winnerIsP1 ? d.winnerDelta : d.loserDelta,
    p2Delta: winnerIsP1 ? d.loserDelta : d.winnerDelta,
    winnerId: winnerIsP1 ? 1 : 2,
    decisive: d.decisive,
    margin: d.margin,
  };
}

/** Helper — diğer modüllerle paylaşmak için (ranks.ts'de de var). */
function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

// Re-export for callers
export { leagueOf, leagueFloor, MAX_TIER };
