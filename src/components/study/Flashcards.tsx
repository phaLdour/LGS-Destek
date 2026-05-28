"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import type { Flashcard } from "@/content/types";

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="group relative block h-56 w-full [perspective:1200px]"
        aria-label="Kartı çevir"
      >
        <div
          className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ön */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-rehberim-border bg-white p-6 text-center shadow-card [backface-visibility:hidden]">
            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
              Soru
            </span>
            <p className="text-lg font-semibold text-rehberim-navy">
              {card.front}
            </p>
            <span className="mt-4 flex items-center gap-1 text-xs text-rehberim-navy/40">
              <RefreshCw className="h-3.5 w-3.5" /> Çevirmek için tıkla
            </span>
          </div>
          {/* arka */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark p-6 text-center text-white shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-rehberim-accent-light">
              Cevap
            </span>
            <p className="text-lg font-semibold">{card.back}</p>
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-rehberim-border bg-white text-rehberim-navy transition hover:bg-rehberim-muted"
          aria-label="Önceki kart"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-rehberim-navy/60">
          {index + 1} / {cards.length}
        </span>
        <button
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-rehberim-border bg-white text-rehberim-navy transition hover:bg-rehberim-muted"
          aria-label="Sonraki kart"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
