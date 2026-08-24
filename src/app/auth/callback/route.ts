import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safeNext";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Doğrulanmadan kullanılırsa açık yönlendirme olur (bkz. lib/safeNext).
  const next = safeNext(searchParams.get("next"));

  if (code && isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
