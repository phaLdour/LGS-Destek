import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/queue/reset
 *   body: yok
 *   → 200 { ok: true }
 *   → 401 unauthorized
 *
 * Kullanıcının kuyruk satırını siler ve arta kalmış aktif maçı varsa
 * abandoned'a çeker. "Baştan başla" butonu için: takılı kalmış kuyruk
 * + UI'da görünmeyen ama veritabanında duran active maç temizliği.
 */
export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "supabase_not_configured" },
      { status: 503 },
    );
  }
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("comp_queue_reset");
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
