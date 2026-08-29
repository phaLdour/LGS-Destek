import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * POST /api/comp/queue/reset
 *   body: yok
 *   → 200 { ok: true, activeMatchId: string | null }
 *   → 401 unauthorized
 *
 * Kullanıcının kuyruk satırını siler ve süresi dolmuş maçlarını normal
 * kurallarla kapatır. "Baştan başla" butonu için: takılı kalmış kuyruk
 * temizliği.
 *
 * FAZ 12: eskiden DEVAM EDEN maçı da cezasız 'abandoned' yapıyordu —
 * kaybetmekte olan oyuncu için bedava kaçış kapısıydı. Artık aktif maça
 * dokunulmuyor; varsa id'si döndürülüyor ki istemci lobiye değil maça
 * yönlendirsin (eski davranış iki sayfa arasında döngü üretiyordu).
 * Maçtan çıkmanın tek yolu /forfeit (hükmen mağlubiyet).
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
  const { data, error } = await supabase.rpc("comp_queue_reset");
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({
    ok: true,
    activeMatchId: typeof data === "string" ? data : null,
  });
}
