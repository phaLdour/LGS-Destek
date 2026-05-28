"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OwlSvg } from "@/components/brand/Owl";
import { ChatPanel, type ChatMessage } from "./ChatPanel";

const GREETING: ChatMessage = {
  role: "model",
  text: "Merhaba! Ben Rehber Baykuş 🦉 Rehberim platformunda sana yardımcı olurum. İstersen bir dersi açayım — örneğin \"matematiğe gir\" ya da \"profilime git\" yazman yeterli.",
};

export function MascotButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
        { role: "model", text: data.reply ?? "Bir sorun oluştu." },
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
        />
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Rehber Baykuş'u aç"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light shadow-soft ring-2 ring-white transition hover:scale-105 active:scale-95"
      >
        <OwlSvg className="h-9 w-9 transition group-hover:rotate-[-6deg]" />
        {!open && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-rehberim-accent" />
        )}
      </button>
    </div>
  );
}
