import { NextResponse } from "next/server";
import { generateReply, isGeminiConfigured } from "@/lib/gemini";
import { matchCanned } from "@/lib/cannedAnswers";
import { getUserContext } from "@/lib/userContext";

export const runtime = "nodejs";

type IncomingMessage = { role?: string; text?: string };

export async function POST(request: Request) {
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

  // 1) Kalıp cevap katmanı: uyan varsa Gemini'ye gitmeden (tokensiz) yanıtla.
  const canned = matchCanned(history[history.length - 1].text);
  if (canned) {
    return NextResponse.json({
      reply: canned.reply,
      navigate: canned.navigate ?? null,
      topicRoute: canned.topicRoute ?? null,
      configured: true,
      source: "canned",
    });
  }

  // 2) Kalıp yoksa Gemini'ye düş (yapılandırılmışsa).
  if (!isGeminiConfigured()) {
    return NextResponse.json(
      {
        reply:
          "Bunu tam olarak yanıtlayamadım. (AI henüz bağlı değil — kurulum için GEMINI_API_KEY ekleyin.)",
        navigate: null,
        topicRoute: null,
        configured: false,
      },
      { status: 200 },
    );
  }

  try {
    // Gemini'ye kullanıcı bağlamını ilet (giriş varsa) — kişiselleşmiş cevaplar
    const ctx = await getUserContext().catch(() => null);
    const result = await generateReply(history, ctx);
    return NextResponse.json({ ...result, configured: true, source: "ai" });
  } catch (err) {
    console.error("Gemini hatası:", err);
    return NextResponse.json(
      {
        reply: "Şu an yanıt veremiyorum. Lütfen biraz sonra tekrar deneyin.",
        navigate: null,
        topicRoute: null,
        configured: true,
      },
      { status: 200 },
    );
  }
}
