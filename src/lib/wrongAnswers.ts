import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Yanlış cevaplanan soruları takip eder.
 *
 * Veri stratejisi: localStorage öncelikli (offline) + Supabase senkron
 * (cihazlar arası). İlk mount'ta hydrateWrongFromSupabase() çağrılır.
 *
 * Soru kimliği: `subject/topic#index` (PoolQuestion.id ile aynı).
 */

const STORAGE_KEY = "rehberim:wrong-answers";
let hydrated = false;

export type WrongRecord = {
  /** Toplam kaç kez yanlış yapıldı */
  wrongCount: number;
  /** Üst üste kaç doğru cevap geldi (2 olunca havuzdan çıkar) */
  correctStreak: number;
  /** Son yanlış cevap tarihi (epoch ms) */
  lastWrongAt: number;
  /**
   * Bu kelimenin/sorunun bir sonraki gösterim "vadesi" (epoch ms).
   * now() >= nextDueAt ise vadesi gelmiş.
   * - Yeni hata: now + 1 gün
   * - 1 doğru cevap: now + 3 gün
   * - 2 doğru cevap üst üste: kayıt silinir (ustalaşmış)
   * Eski kayıtlarda yoksa: lastWrongAt + 1 gün varsayılır (geriye uyum).
   */
  nextDueAt?: number;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_MS = 3 * ONE_DAY_MS;

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
  const now = Date.now();
  const next: WrongRecord = {
    wrongCount: (rec?.wrongCount ?? 0) + 1,
    correctStreak: 0,
    lastWrongAt: now,
    nextDueAt: now + ONE_DAY_MS,
  };
  s[id] = next;
  write(s);
  void pushWrongToSupabase(id, next);
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
    void deleteWrongFromSupabase(id);
  } else {
    // 1. doğru cevap: 3 gün ileri it
    const next: WrongRecord = {
      ...rec,
      correctStreak: nextStreak,
      nextDueAt: Date.now() + THREE_DAYS_MS,
    };
    s[id] = next;
    void pushWrongToSupabase(id, next);
  }
  write(s);
}

export type WrongFilter = "all" | "today" | "due";

/** Yerel günün başlangıcı (00:00) — bugün filtresi için. */
function todayStartMs(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Bir kaydın "vadesi gelmiş" sayılması için zaman damgası.
 *  Eski kayıtlarda nextDueAt yoksa lastWrongAt + 1 gün varsayılır. */
function dueTs(rec: WrongRecord): number {
  return rec.nextDueAt ?? rec.lastWrongAt + ONE_DAY_MS;
}

/**
 * Havuzdaki yanlış soru ID'lerinin kümesi.
 * - "all": tüm havuz (eski davranış)
 * - "today": bugün yapılmış (lastWrongAt >= bugün 00:00)
 * - "due": vadesi gelmiş (nextDueAt <= şimdi)
 */
export function getWrongIds(filter: WrongFilter = "all"): Set<string> {
  const s = read();
  if (filter === "all") return new Set(Object.keys(s));
  const out = new Set<string>();
  if (filter === "today") {
    const start = todayStartMs();
    for (const [id, rec] of Object.entries(s)) {
      if (rec.lastWrongAt >= start) out.add(id);
    }
    return out;
  }
  // "due"
  const now = Date.now();
  for (const [id, rec] of Object.entries(s)) {
    if (dueTs(rec) <= now) out.add(id);
  }
  return out;
}

/** Havuzdaki yanlış soru sayısı (filtreli veya tümü). */
export function getWrongCount(filter: WrongFilter = "all"): number {
  if (filter === "all") return Object.keys(read()).length;
  return getWrongIds(filter).size;
}

/** Tüm havuzu temizle (debug/profil için). */
export function clearWrongPool() {
  write({});
}

// ── Supabase senkron (arka plan, fire & forget) ──────────────────────

async function pushWrongToSupabase(id: string, rec: WrongRecord) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("wrong_answers").upsert(
      {
        user_id: user.id,
        question_key: id,
        wrong_count: rec.wrongCount,
        correct_streak: rec.correctStreak,
        last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
        next_due_at: rec.nextDueAt
          ? new Date(rec.nextDueAt).toISOString()
          : null,
      },
      { onConflict: "user_id,question_key" },
    );
  } catch {
    // sessiz
  }
}

async function deleteWrongFromSupabase(id: string) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("wrong_answers")
      .delete()
      .eq("user_id", user.id)
      .eq("question_key", id);
  } catch {
    // sessiz
  }
}

/**
 * Mount'ta çağrılır: uzaktaki kayıtları yerelle birleştirir.
 * Çatışma çözümü: hangi kayıt daha yeni (lastWrongAt) ise o kazanır.
 */
export async function hydrateWrongFromSupabase(): Promise<void> {
  if (hydrated) return;
  hydrated = true;
  if (!isSupabaseConfigured() || typeof window === "undefined") return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("wrong_answers")
      .select(
        "question_key, wrong_count, correct_streak, last_wrong_at, next_due_at",
      );
    const local = read();
    const merged: Store = { ...local };
    for (const row of (data ?? []) as {
      question_key: string;
      wrong_count: number;
      correct_streak: number;
      last_wrong_at: string;
      next_due_at: string | null;
    }[]) {
      const remoteTs = new Date(row.last_wrong_at).getTime();
      const localRec = local[row.question_key];
      if (!localRec || localRec.lastWrongAt <= remoteTs) {
        merged[row.question_key] = {
          wrongCount: row.wrong_count,
          correctStreak: row.correct_streak,
          lastWrongAt: remoteTs,
          nextDueAt: row.next_due_at
            ? new Date(row.next_due_at).getTime()
            : remoteTs + ONE_DAY_MS,
        };
      }
    }
    write(merged);
    // yerelde olup uzakta olmayanları push et
    const remoteKeys = new Set(
      (data ?? []).map((r: { question_key: string }) => r.question_key),
    );
    const missing = Object.entries(local).filter(([k]) => !remoteKeys.has(k));
    if (missing.length > 0) {
      await supabase.from("wrong_answers").upsert(
        missing.map(([k, rec]) => ({
          user_id: user.id,
          question_key: k,
          wrong_count: rec.wrongCount,
          correct_streak: rec.correctStreak,
          last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
          next_due_at: rec.nextDueAt
            ? new Date(rec.nextDueAt).toISOString()
            : null,
        })),
        { onConflict: "user_id,question_key" },
      );
    }
  } catch {
    // sessiz
  }
}
