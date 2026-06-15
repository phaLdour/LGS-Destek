"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OwlSvg } from "@/components/brand/Owl";
import { ChatPanel, type ChatMessage } from "./ChatPanel";

const FALLBACK_GREETING: ChatMessage = {
  role: "model",
  text: "Merhaba! Ben Rehber Baykuş 🦉 Derslerinle ilgili sorularını yanıtlayabilir ya da seni doğru sayfaya götürebilirim. Örneğin \"suyun pH değeri kaç?\" diye sorabilir veya \"matematiğe gir\" diyebilirsin.",
};

export function MascotButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([FALLBACK_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [greetingLoaded, setGreetingLoaded] = useState(false);

  // İlk açılışta kullanıcı stats'ına göre kişisel selam çek.
  // Selam bir oturum boyunca sabit olduğundan sessionStorage'da cache'lenir:
  // her sayfa geçişinde /api/chat/greeting (→ 3 ağır Supabase query)
  // tekrar tetiklenmez, oturumda yalnız bir kez çağrılır.
  const GREETING_CACHE_KEY = "rehberim:greeting";
  useEffect(() => {
    if (greetingLoaded) return;

    try {
      const cached = sessionStorage.getItem(GREETING_CACHE_KEY);
      if (cached) {
        setMessages([{ role: "model", text: cached }]);
        setGreetingLoaded(true);
        return;
      }
    } catch {
      // sessionStorage erişilemezse fetch'e düş
    }

    let cancelled = false;
    fetch("/api/chat/greeting")
      .then((r) => r.json())
      .then((data: { reply?: string }) => {
        if (cancelled) return;
        if (data.reply) {
          setMessages([{ role: "model", text: data.reply }]);
          try {
            sessionStorage.setItem(GREETING_CACHE_KEY, data.reply);
          } catch {
            // yoksay
          }
        }
        setGreetingLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setGreetingLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [greetingLoaded]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((_, i) => i !== 0), // açılış selamını gönderme
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: data.reply ?? "Bir sorun oluştu.",
          topicRoute:
            typeof data.topicRoute === "string" ? data.topicRoute : null,
        },
      ]);

      if (data.navigate && typeof data.navigate === "string") {
        setTimeout(() => {
          setOpen(false);
          router.push(data.navigate);
        }, 700);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Bağlantı hatası. Lütfen tekrar dene.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {open && (
        <ChatPanel
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onClose={() => setOpen(false)}
          onOpenTopic={(route) => {
            setOpen(false);
            router.push(route);
          }}
        />
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Rehber Baykuş'u aç"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light shadow-elevated ring-2 ring-white transition-all duration-300 ease-snap hover:scale-[1.06] active:scale-95"
      >
        {/* yumuşak iç ışıltı — premium "canlı" hissi */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/0 to-white/15"
        />
        <OwlSvg className="relative h-9 w-9 transition-transform duration-300 ease-smooth group-hover:rotate-[-6deg]" />
        {!open && (
          <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-rehberim-accent">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-rehberim-accent opacity-60"
            />
          </span>
        )}
      </button>
    </div>
  );
}
