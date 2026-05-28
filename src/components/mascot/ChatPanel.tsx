"use client";

import { useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
import { OwlSvg } from "@/components/brand/Owl";

export type ChatMessage = { role: "user" | "model"; text: string };

export function ChatPanel({
  messages,
  loading,
  input,
  setInput,
  onSend,
  onClose,
}: {
  messages: ChatMessage[];
  loading: boolean;
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex h-[32rem] max-h-[75vh] w-[22rem] max-w-[calc(100vw-2rem)] animate-scale-in flex-col overflow-hidden rounded-2xl border border-rehberim-border bg-white shadow-soft">
      {/* başlık */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-rehberim-navy to-rehberim-navy-light px-4 py-3 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <OwlSvg className="h-7 w-7" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Rehber Baykuş</p>
          <p className="text-[11px] text-white/70">Platform yardımcın</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="rounded-lg p-1.5 transition hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* mesajlar */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-rehberim-muted p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm ${
                m.role === "user"
                  ? "rounded-br-md bg-rehberim-navy text-white"
                  : "rounded-bl-md border border-rehberim-border bg-white text-rehberim-navy"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl rounded-bl-md border border-rehberim-border bg-white px-4 py-3">
              <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* giriş */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center gap-2 border-t border-rehberim-border bg-white p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Bir şey sor ya da nereye gitmek istediğini yaz…"
          className="flex-1 rounded-xl border border-rehberim-border bg-rehberim-muted px-3.5 py-2.5 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Gönder"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rehberim-accent text-white transition hover:bg-rehberim-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-rehberim-navy/40"
      style={{ animationDelay: delay }}
    />
  );
}
