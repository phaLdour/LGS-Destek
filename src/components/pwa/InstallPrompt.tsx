"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

const DISMISS_KEY = "rehberim:install-dismissed";

type BipEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [event, setEvent] = useState<BipEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [dismissed, setDismissed] = useState(true); // ilk render'da gizli

  useEffect(() => {
    // Daha önce kapatıldı mı?
    const d = localStorage.getItem(DISMISS_KEY);
    if (d) {
      setDismissed(true);
      return;
    }

    // Zaten kurulu mu (standalone)?
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) {
      setDismissed(true);
      return;
    }

    // iOS Safari (beforeinstallprompt yok) — manuel talimat göster
    const ua = window.navigator.userAgent;
    const isIos = /iPhone|iPad|iPod/i.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
    if (isIos) {
      setShowIos(true);
      setDismissed(false);
      return;
    }

    // Chrome / Edge — install event'i bekle
    const onBip = (e: Event) => {
      e.preventDefault();
      setEvent(e as BipEvent);
      setDismissed(false);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  async function install() {
    if (!event) return;
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") {
      dismiss();
    }
  }

  if (dismissed) return null;

  if (event) {
    return (
      <div className="relative mt-4 flex items-start gap-3 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 p-4">
        <Download className="mt-0.5 h-5 w-5 shrink-0 text-rehberim-accent" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-rehberim-navy">
            Rehberim&apos;i ana ekrana ekle
          </p>
          <p className="mt-0.5 text-xs text-rehberim-navy/70">
            Tek dokunuşla aç; tarayıcı çubuğu olmadan tam ekran kullan.
          </p>
          <button
            onClick={install}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rehberim-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-rehberim-accent-dark"
          >
            <Download className="h-3.5 w-3.5" />
            Ana Ekrana Ekle
          </button>
        </div>
        <button
          onClick={dismiss}
          aria-label="Kapat"
          className="rounded-md p-1 text-rehberim-navy/40 hover:bg-white/50 hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (showIos) {
    return (
      <div className="relative mt-4 flex items-start gap-3 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 p-4">
        <Share className="mt-0.5 h-5 w-5 shrink-0 text-rehberim-accent" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-rehberim-navy">
            Rehberim&apos;i ana ekrana ekle
          </p>
          <p className="mt-0.5 text-xs text-rehberim-navy/70">
            Safari&apos;de alttaki <strong>Paylaş</strong> butonuna bas →{" "}
            <strong>Ana Ekrana Ekle</strong>&apos;yi seç.
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Kapat"
          className="rounded-md p-1 text-rehberim-navy/40 hover:bg-white/50 hover:text-rehberim-navy"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return null;
}
