import { NextResponse } from "next/server";
import { generateReply, isGeminiConfigured } from "@/lib/gemini";
import { matchCanned } from "@/lib/cannedAnswers";
import { getUserContext } from "@/lib/userContext";
import { kapsamDenetle } from "@/lib/baykusKapsam";
import { onbellegeUygunMu, parmakIzi } from "@/lib/aiOnbellek";
import { onbellegeYaz, onbellektenAra } from "@/lib/aiOnbellekSunucu";

export const runtime = "nodejs";

type IncomingMessage = { role?: string; text?: string };

/**
 * Baykuş cevap zinciri — üstten alta, her katman bir öncekinden pahalıdır:
 *
 *   0. KAPSAM DENETİMİ  → küfür / kaynak kodu / alakasız soru burada durur
 *   1. KALIP katmanı    → bedava (cannedAnswers)
 *   2. ÖĞRENİLMİŞ önbellek → bedava (daha önce AI'nın verdiği cevap)
 *   3. AI (Gemini)      → kota harcar; cevabı uygunsa önbelleğe öğretilir
 *
 * Böylece aynı soru ikinci kez sorulduğunda AI'ya hiç gidilmez.
 */
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

  const sonSoru = history[history.length - 1].text;

  // 0) Kapsam denetimi: küfür, kaynak kodu ve müfredat dışı sorular AI'ya
  //    hiç gitmeden, sabit ve öngörülebilir bir cevapla reddedilir.
  const kapsam = kapsamDenetle(sonSoru);
  if (!kapsam.uygun) {
    return NextResponse.json({
      reply: kapsam.cevap,
      navigate: null,
      topicRoute: null,
      configured: true,
      source: "kapsam",
    });
  }

  // 1) Kalıp cevap katmanı: uyan varsa Gemini'ye gitmeden (tokensiz) yanıtla.
  const canned = matchCanned(sonSoru);
  if (canned) {
    return NextResponse.json({
      reply: canned.reply,
      navigate: canned.navigate ?? null,
      topicRoute: canned.topicRoute ?? null,
      configured: true,
      source: "canned",
    });
  }

  // 2) Öğrenilmiş önbellek: bu soru daha önce AI'ya sorulmuş ve cevabı
  //    saklanmışsa oradan dön (kota harcanmaz).
  const izi = parmakIzi(sonSoru);
  // Sohbetin ortasındaki "peki ya bu?" gibi bağlama bağlı sorular
  // önbellekten karşılanmamalı; yalnız ilk soru veya bağımsız sorular.
  const bagimsiz = history.length <= 2 || sonSoru.trim().length >= 12;
  if (izi && bagimsiz) {
    const kayit = await onbellektenAra(izi);
    if (kayit) {
      return NextResponse.json({
        reply: kayit.cevap,
        navigate: kayit.navigate,
        topicRoute: kayit.topicRoute,
        configured: true,
        source: "onbellek",
      });
    }
  }

  // 3) Gemini'ye düş (yapılandırılmışsa).
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

    // 4) ÖĞRENME: cevap herkes için geçerliyse önbelleğe yaz. Kişiye özel
    //    ("bu hafta 4 saat çalıştın") ya da zamana bağlı cevaplar yazılmaz.
    if (izi && bagimsiz) {
      const uygunluk = onbellegeUygunMu(sonSoru, result.reply, ctx?.firstName);
      if (uygunluk.uygun) {
        void onbellegeYaz(izi, sonSoru, {
          cevap: result.reply,
          navigate: result.navigate,
          topicRoute: result.topicRoute,
        });
      }
    }

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
