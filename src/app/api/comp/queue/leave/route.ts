import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/queue/leave
 *   body: yok
 *   → 200 { ok: true }
 *   → 401 unauthorized
 *
 * Kullanıcının kuyruk satırını siler. RLS zaten own-row pattern,
 * RPC gereksiz; doğrudan delete.
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
  const { error } = await supabase
    .from("comp_queue")
    .delete()
    .eq("user_id", user.id);
  if (error) {
    return NextResponse.json(
      { error: "delete_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
