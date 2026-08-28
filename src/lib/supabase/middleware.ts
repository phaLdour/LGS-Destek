import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options: CookieOptions };

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/ders",
  "/hizli-sorular",
  "/rekabet",
  // Aşağıdakiler girişsiz açıldığında boş/anlamsız görünüyordu ve
  // kullanıcı bunu bir hata sanıyordu; doğrudan girişe yönlendirilirler.
  // (Veri sızıntısı yoktu — RLS zaten boş döndürüyordu.)
  "/geri-bildirim",
  "/dersler",
  "/hatalarim",
  "/rozetlerim",
  "/deneme",
];
const AUTH_PAGES = ["/login", "/register"];

function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Session çerezini tazeler ve korumalı rotalara erişimi denetler. */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Yapılandırma yoksa: gerçek auth yok, arayüz yine de gezilebilsin (mock).
  if (!isConfigured()) {
    return response;
  }

  // ── ÖN-GETİRME (prefetch) istekleri kimlik denetimine girmez ──────
  // app/loading.tsx eklendiğinden beri Next.js, ekrandaki HER menü
  // bağlantısı için arka planda bir ön-getirme isteği atıyor (sayfa
  // başına ~15 istek). Bunların her biri Supabase Auth'a gidince
  // ücretsiz katmanın hız sınırı doluyor ve GERÇEK gezinmeler 20+
  // saniye bekletiliyordu. Ön-getirme yalnız yükleme iskeletini getirir,
  // korunan veri içermez — kimlik denetimi gerçek gezinmede yapılır.
  if (
    request.headers.get("next-router-prefetch") !== null ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose")?.includes("prefetch")
  ) {
    return response;
  }

  // ── Halka açık sayfalar da Auth'a gitmez ──────────────────────────
  // Tanıtım, okul tarama, sözlük, gizlilik... girişsiz gezilebilir;
  // her görüntülemede Auth sunucusuna gitmek yalnız kota yakıyordu.
  // (Oturum çerezi tazeleme korumalı sayfalarda zaten yapılıyor.)
  const { pathname: yol } = request.nextUrl;
  const denetimGerekli =
    PROTECTED_PREFIXES.some((p) => yol.startsWith(p)) ||
    AUTH_PAGES.some((p) => yol.startsWith(p)) ||
    yol.startsWith("/api/");
  if (!denetimGerekli) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
