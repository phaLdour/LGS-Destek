import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

type CookieToSet = { name: string; value: string; options: CookieOptions };

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Sunucu bileşenleri / route handler'lar için Supabase istemcisi. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Sunucu bileşeninden çağrıldığında set engellenebilir; middleware yeniler.
          }
        },
      },
    },
  );
}

/**
 * Geçerli kullanıcıyı döndürür; yapılandırma yoksa null.
 *
 * React `cache()` ile sarılı: tek bir istek/render boyunca kaç kez
 * çağrılırsa çağrılsın Supabase auth sunucusuna YALNIZ BİR ağ isteği
 * yapılır. (getShellUser + SubjectHeatmap + BadgeShowcase aynı render'da
 * çağırdığında 3 yerine 1 round-trip.)
 */
export const getCurrentUser = cache(async () => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
