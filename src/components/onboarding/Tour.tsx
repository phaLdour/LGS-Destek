"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const STORAGE_KEY = "rehberim:onboarding-done";

type Step = {
  emoji: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
};

const STEPS: Step[] = [
  {
    emoji: "👋",
    title: "Rehberim'e hoş geldin!",
    body:
      "LGS müfredatının tamamı burada — 6 ders, ~140 konu, AI Baykuş yardımcı, denemeler ve daha fazlası. Sana kısa bir tur atalım.",
    icon: Sparkles,
  },
  {
    emoji: "📚",
    title: "Derslerin tam içeriği",
    body:
      "Her ders kartına basınca konu listesi açılır. Konuda zihin haritası, makaleler, kartlar, LGS tuzakları ve test bulursun. 'Derse Başla' deyince çalışma süren kaydedilir.",
    icon: CheckCircle2,
  },
  {
    emoji: "⚡",
    title: "Hızlı Sorular ve Hatalarım",
    body:
      "Hızlı Sorular bir oturumda peş peşe soru çözmen için — 10 saniyede bir sıradaki. Yanlış cevapların otomatik 'Hatalarım' havuzuna düşer, dashboard'dan tekrar pekiştirirsin.",
    icon: Zap,
  },
  {
    emoji: "📝",
    title: "Deneme & Çıkmış Sorular",
    body:
      "Sınav günü provası için Deneme Sınavı modunu kullan: gerçek LGS süresi (75 + 80 dk), net hesabı dahil. 2018-2026 çıkmış sorulara da 'Çıkmış Sorular' bölümünden ulaşırsın.",
    icon: FileText,
  },
];

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) setOpen(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  function next() {
    if (idx + 1 >= STEPS.length) {
      dismiss();
      return;
    }
    setIdx((i) => i + 1);
  }

  function prev() {
    if (idx === 0) return;
    setIdx((i) => i - 1);
  }

  if (!open) return null;

  const step = STEPS[idx];
  const Icon = step.icon;
  const isLast = idx === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-rehberim-navy/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-md animate-scale-in rounded-3xl border border-rehberim-border bg-white p-6 shadow-soft">
        <button
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute right-3 top-3 rounded-md p-1.5 text-rehberim-navy/40 hover:bg-rehberim-muted hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rehberim-accent/15 text-2xl">
            {step.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rehberim-accent">
              <Icon className="h-3.5 w-3.5" />
              Adım {idx + 1}/{STEPS.length}
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-rehberim-navy">
              {step.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-rehberim-navy/75">
          {step.body}
        </p>

        {/* Progress dots */}
        <div className="mt-5 flex justify-center gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx
                  ? "w-6 bg-rehberim-accent"
                  : "w-1.5 bg-rehberim-border"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          <button
            onClick={dismiss}
            className="text-xs font-semibold text-rehberim-navy/45 hover:text-rehberim-navy/70"
          >
            Atla
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="flex items-center gap-1 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </button>
            <button
              onClick={next}
              className="flex items-center gap-1 rounded-xl bg-rehberim-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
            >
              {isLast ? (
                <>
                  Hadi başlayalım
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
