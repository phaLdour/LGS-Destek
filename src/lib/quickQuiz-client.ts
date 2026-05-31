import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { PoolQuestion } from "./quickQuiz-types";

/**
 * Client-only Hızlı Sorular yardımcıları.
 * @content modülünü import ETMEZ → client bundle'a ders içerikleri sızmaz.
 *
 * Veri stratejisi: localStorage öncelikli (hızlı, offline) + Supabase senkron
 * (cihazlar arası). İlk mount'ta hydrateFromSupabase() çağrılır.
 */

const STORAGE_KEY = "rehberim:quick-solved";
let hydrated = false;

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
  // Supabase'e arka planda (fire & forget) — başarısız olursa localStorage hâlâ doğru
  void pushSolvedToSupabase(id);
}

async function pushSolvedToSupabase(id: string) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("quick_solved").upsert(
      { user_id: user.id, question_key: id },
      { onConflict: "user_id,question_key" },
    );
  } catch {
    // sessiz başarısızlık — yerel kayıt esastır
  }
}

/**
 * Mount'ta çağrılır: Supabase'teki çözülmüş kayıtları localStorage ile birleştirir.
 * Tek seferlik (module-level `hydrated` flag).
 */
export async function hydrateFromSupabase(): Promise<void> {
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
      .from("quick_solved")
      .select("question_key");
    const remote = new Set(
      (data ?? []).map((r: { question_key: string }) => r.question_key),
    );
    const local = readSolved();
    // birleşim → yerel
    const merged = new Set([...local, ...remote]);
    writeSolved(merged);
    // yereldeki ama uzakta olmayanları push et (önceki offline çalışmalar)
    const missing = [...local].filter((id) => !remote.has(id));
    if (missing.length > 0) {
      await supabase.from("quick_solved").upsert(
        missing.map((id) => ({ user_id: user.id, question_key: id })),
        { onConflict: "user_id,question_key" },
      );
    }
  } catch {
    // sessiz
  }
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
