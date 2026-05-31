"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

type MenuState = {
  x: number;
  y: number;
  word: string;
};

/**
 * Global sağ tık menüsü: kullanıcı bir metin seçip (highlight) sağ tıkladığında
 * "Sözlükte aç" seçeneği gösterilir. Seçim yoksa tarayıcının varsayılan
 * context menüsü çalışmaya devam eder.
 *
 * Seçilen kelime tek bir sözcük olmalı; çok kelimeli seçimde ilk anlamlı
 * sözcük alınır. Form alanlarında (input, textarea, contenteditable)
 * çalışmaz — kullanıcı normal düzenleme menüsünü görebilir.
 */
export function LookupContextMenu() {
  const router = useRouter();
  const [menu, setMenu] = useState<MenuState | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      // Form alanı, link veya buton üstünde varsayılan menüyü göster
      if (target?.closest("input, textarea, [contenteditable=true], a, button")) {
        return;
      }
      const sel = window.getSelection?.();
      const raw = sel?.toString().trim() ?? "";
      if (!raw) return;
      // İlk sözcüğü al (basit kelime karakterleri + Türkçe harfler)
      const match = raw.match(/[A-Za-zÇĞİıÖŞÜçğıiöşü]+/);
      const word = match ? match[0] : "";
      if (!word) return;
      e.preventDefault();
      setMenu({
        x: e.clientX,
        y: e.clientY,
        word,
      });
    }
    function onAwayClick(e: MouseEvent) {
      if (!menu) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(null);
    }
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("mousedown", onAwayClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("mousedown", onAwayClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // Sayfa scroll'unda menüyü kapat
  useEffect(() => {
    function onScroll() {
      if (menu) setMenu(null);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menu]);

  if (!menu) return null;

  function openInSozluk() {
    if (!menu) return;
    setMenu(null);
    router.push(`/sozluk?ara=${encodeURIComponent(menu.word.toLocaleLowerCase("tr"))}`);
  }

  // Ekran kenarından taşmayı önle
  const left = Math.min(menu.x, window.innerWidth - 220);
  const top = Math.min(menu.y, window.innerHeight - 60);

  return (
    <div
      ref={menuRef}
      role="menu"
      className="lookup-menu"
      style={{ left, top }}
    >
      <button
        type="button"
        onClick={openInSozluk}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-rehberim-navy transition hover:bg-rehberim-accent/15"
      >
        <BookOpen className="h-4 w-4 text-rehberim-accent" />
        <span className="min-w-0 flex-1 truncate">
          Sözlükte aç:{" "}
          <span className="font-extrabold text-rehberim-accent">
            “{menu.word}”
          </span>
        </span>
      </button>
      <p className="px-3 py-1 text-[10px] text-rehberim-navy/45">
        İpucu: kelimeyi seçip sağ tıklayarak da açabilirsin.
      </p>
    </div>
  );
}
