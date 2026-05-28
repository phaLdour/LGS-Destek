import { NextResponse } from "next/server";
import { generateReply, isGeminiConfigured } from "@/lib/gemini";

export const runtime = "nodejs";

type IncomingMessage = { role?: string; text?: string };

export async function POST(request: Request) {
  if (!isGeminiConfigured()) {
    return NextResponse.json(
      {
        reply:
          "AI henüz bağlı değil. Kurulum için GEMINI_API_KEY anahtarını ekleyin.",
        navigate: null,
        configured: false,
      },
      { status: 200 },
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const history = raw
    .filter(
      (m): m is { role: "user" | "model"; text: string } =>
        (m.role === "user" || m.role === "model") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0,
    )
    .slice(-12)
    .map((m) => ({ role: m.role, text: m.text.slice(0, 2000) }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "Geçerli bir mesaj gönderin." },
      { status: 400 },
    );
  }

  try {
    const result = await generateReply(history);
    return NextResponse.json({ ...result, configured: true });
  } catch (err) {
    console.error("Gemini hatası:", err);
    return NextResponse.json(
      {
        reply:
          "Şu an yanıt veremiyorum. Lütfen biraz sonra tekrar deneyin.",
        navigate: null,
        configured: true,
      },
      { status: 200 },
    );
  }
}
