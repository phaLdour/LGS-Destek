import { createClient, getCurrentUser } from "@/lib/supabase/server";
import type { ShellUser } from "@/components/layout/AppShell";

/**
 * Oturumdaki kullanıcıyı arayüz için normalize eder. Oturum yoksa misafir.
 * Faz 5: lig nişanı için comp_profiles.best_tier de okunur (tek, hafif sorgu).
 */
export async function getShellUser(): Promise<ShellUser> {
  const user = await getCurrentUser();
  if (!user) {
    return { name: "Misafir", email: "", avatarUrl: null, bestTier: null };
  }
  const meta = (user.user_metadata ?? {}) as Record<string, string>;

  let bestTier: number | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("comp_profiles")
      .select("best_tier")
      .eq("user_id", user.id)
      .maybeSingle();
    bestTier = typeof data?.best_tier === "number" ? data.best_tier : null;
  } catch {
    bestTier = null; // profil satırı yoksa / şema henüz yoksa sessizce nişansız
  }

  return {
    name:
      meta.full_name ||
      meta.name ||
      user.email?.split("@")[0] ||
      "Öğrenci",
    email: user.email ?? "",
    avatarUrl: meta.avatar_url || meta.picture || null,
    bestTier,
  };
}
