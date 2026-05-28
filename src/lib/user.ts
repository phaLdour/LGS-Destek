import { getCurrentUser } from "@/lib/supabase/server";
import type { ShellUser } from "@/components/layout/AppShell";

/** Oturumdaki kullanıcıyı arayüz için normalize eder. Oturum yoksa misafir. */
export async function getShellUser(): Promise<ShellUser> {
  const user = await getCurrentUser();
  if (!user) {
    return { name: "Misafir", email: "", avatarUrl: null };
  }
  const meta = (user.user_metadata ?? {}) as Record<string, string>;
  return {
    name:
      meta.full_name ||
      meta.name ||
      user.email?.split("@")[0] ||
      "Öğrenci",
    email: user.email ?? "",
    avatarUrl: meta.avatar_url || meta.picture || null,
  };
}
