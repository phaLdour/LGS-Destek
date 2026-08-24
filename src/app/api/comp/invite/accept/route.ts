import { NextResponse } from "next/server";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { pickQuestionIds } from "@/lib/competitive/match-pool";
import { getSeenQuestionIds } from "@/lib/competitive/server";

/**
 * POST /api/comp/invite/accept
 *   body: { code: string }
 *   → 200 { matchId }              arkadaş maçı açıldı
 *   → 409 { error }                not_found | expired | consumed | self | busy
 *   → 401 unauthorized · 422 insufficient_pool
 *
 * Soru listesi burada seçilir (içerik modülleri SQL'den görünmez), maçın
 * kendisi tek transaction içinde `comp_accept_invite` ile açılır.
 */
export async function POST(request: Request) {
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

  let body: { code?: string } = {};
  try {
    body = await request.json();
  } catch {
    // boş body → aşağıda kod eksik hatası
  }
  const code = (body.code ?? "").trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(code)) {
    return NextResponse.json({ error: "not_found" }, { status: 409 });
  }

  const supabase = await createClient();

  // Davetin dersini öğren (soru havuzu ona göre seçilir).
  //
  // Doğrudan tablo okumak yerine dar kapsamlı bir fonksiyon kullanılıyor:
  // comp_invites artık dışarıya kapalı (eski RLS politikası giriş yapan
  // herkese tüm davetleri okutuyordu). Buradaki hata da yutulmuyor —
  // sessizce "karma"ya düşmek, maç satırında yazan dersle gösterilen
  // soruların uyuşmamasına yol açıyordu.
  const { data: peek, error: peekError } = await supabase.rpc(
    "comp_peek_invite",
    { p_code: code },
  );
  if (peekError) {
    return NextResponse.json(
      { error: "rpc_failed", detail: peekError.message },
      { status: 500 },
    );
  }
  const peekRow = Array.isArray(peek) ? peek[0] : peek;
  if (peekRow?.out_error) {
    return NextResponse.json({ error: peekRow.out_error }, { status: 409 });
  }

  const seen = await getSeenQuestionIds(user.id);
  const questionIds = pickQuestionIds(peekRow?.out_subject_filter ?? null, seen);
  if (!questionIds) {
    return NextResponse.json({ error: "insufficient_pool" }, { status: 422 });
  }

  const { data, error } = await supabase.rpc("comp_accept_invite", {
    p_code: code,
    p_question_ids: questionIds,
  });
  if (error) {
    return NextResponse.json(
      { error: "rpc_failed", detail: error.message },
      { status: 500 },
    );
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (row?.out_error) {
    return NextResponse.json({ error: row.out_error }, { status: 409 });
  }
  return NextResponse.json({ matchId: row?.out_match_id });
}
