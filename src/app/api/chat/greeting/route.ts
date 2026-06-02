import { NextResponse } from "next/server";
import { buildGreeting, getUserContext } from "@/lib/userContext";

export const runtime = "nodejs";

/**
 * AI Baykuş açılış selamı — kullanıcı stats'ına göre kişiselleşir.
 * Giriş yoksa veya Supabase yapılandırılmamışsa jenerik selam döner.
 */
export async function GET() {
  const ctx = await getUserContext();
  const reply = buildGreeting(ctx);
  return NextResponse.json({ reply, hasContext: ctx !== null });
}
