"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "rehberim:theme";

type Theme = "light" | "dark";

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (t === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function readStored(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "dark" || v === "light" ? v : null;
}

export function ThemeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "menu";
}) {
  // mount edilene kadar bilinmiyor → hidrasyon uyumsuzluğunu önle
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setTheme(stored);
      return;
    }
    // ilk kez: sistem tercihini al
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // theme değişince html.classList ve localStorage güncellenir
  useEffect(() => {
    if (theme === null) return;
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // sessiz
    }
  }, [theme]);

  if (theme === null) {
    // ilk render'da yer tutucu (görsel atlama önler)
    return (
      <div
        className={
          variant === "menu"
            ? "h-10 w-full rounded-xl bg-rehberim-muted"
            : "h-9 w-9 rounded-lg bg-rehberim-muted"
        }
        aria-hidden="true"
      />
    );
  }

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = theme === "dark" ? "Açık tema" : "Koyu tema";
  const Icon = theme === "dark" ? Sun : Moon;

  if (variant === "menu") {
    return (
      <button
        onClick={() => setTheme(next)}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rehberim-navy/70 transition hover:bg-rehberim-muted"
      >
        <Icon className="h-5 w-5" />
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-rehberim-navy/70 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
