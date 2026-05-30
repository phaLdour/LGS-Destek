import type { PoolQuestion } from "./quickQuiz-types";

/**
 * Client-only Hızlı Sorular yardımcıları.
 * @content modülünü import ETMEZ → client bundle'a ders içerikleri sızmaz.
 */

const STORAGE_KEY = "rehberim:quick-solved";

function readSolved(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeSolved(set: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // kota dolu vb.
  }
}

export function markSolved(id: string) {
  const s = readSolved();
  s.add(id);
  writeSolved(s);
}

/** Verilen ID kümesini "çözüldü" işaretlerinden kaldırır (Yeniden başlat). */
export function resetSolvedFor(ids: string[]) {
  const all = readSolved();
  for (const id of ids) all.delete(id);
  writeSolved(all);
}

/** Pool'dan çözülmüşleri çıkarır ve Fisher-Yates ile karıştırır. */
export function filterAndShuffle(pool: PoolQuestion[]): PoolQuestion[] {
  const solved = readSolved();
  const remaining = pool.filter((p) => !solved.has(p.id));
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }
  return remaining;
}
