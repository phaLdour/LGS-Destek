/**
 * Yanlış cevaplanan soruları takip eder. localStorage tabanlı (offline çalışır).
 * Aşama 7'de Supabase ile senkronizasyon eklenecek.
 *
 * Soru kimliği: `subject/topic#index` (PoolQuestion.id ile aynı).
 */

const STORAGE_KEY = "rehberim:wrong-answers";

export type WrongRecord = {
  /** Toplam kaç kez yanlış yapıldı */
  wrongCount: number;
  /** Üst üste kaç doğru cevap geldi (2 olunca havuzdan çıkar) */
  correctStreak: number;
  /** Son yanlış cevap tarihi (epoch ms) */
  lastWrongAt: number;
};

type Store = Record<string, WrongRecord>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Store;
  } catch {
    return {};
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // kota dolu vb.
  }
}

/** Yanlış cevap kaydı; varsa sayacı artırır, doğru serisini sıfırlar. */
export function saveWrong(id: string) {
  const s = read();
  const rec = s[id];
  s[id] = {
    wrongCount: (rec?.wrongCount ?? 0) + 1,
    correctStreak: 0,
    lastWrongAt: Date.now(),
  };
  write(s);
}

/**
 * Doğru cevap; havuzdaki soru için doğru serisini artırır.
 * 2 üst üste doğru olursa havuzdan çıkar (ustalaşmış).
 */
export function markCorrect(id: string) {
  const s = read();
  const rec = s[id];
  if (!rec) return; // zaten havuzda değil
  const nextStreak = rec.correctStreak + 1;
  if (nextStreak >= 2) {
    delete s[id];
  } else {
    s[id] = { ...rec, correctStreak: nextStreak };
  }
  write(s);
}

/** Havuzdaki yanlış soru ID'lerinin kümesi. */
export function getWrongIds(): Set<string> {
  return new Set(Object.keys(read()));
}

/** Havuzdaki yanlış soru sayısı. */
export function getWrongCount(): number {
  return Object.keys(read()).length;
}

/** Tüm havuzu temizle (debug/profil için). */
export function clearWrongPool() {
  write({});
}
