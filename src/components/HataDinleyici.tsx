"use client";

import { useEffect } from "react";
import { hataDinleyicileriniBagla } from "@/lib/hataBildir";

/**
 * Yakalanmamış hataları ve reddedilen sözleri (unhandled rejection)
 * dinleyip bildirir. Görsel çıktısı yoktur.
 *
 * React'in kendi hata sınırları (error.tsx / global-error.tsx) yalnız
 * render sırasında çöken şeyleri yakalar. Bir olay işleyicisinde ya da
 * `await` edilmemiş bir sözde çıkan hata onlara HİÇ ulaşmaz — bu bileşen
 * o boşluğu kapatıyor.
 */
export function HataDinleyici() {
  useEffect(() => {
    hataDinleyicileriniBagla();
  }, []);
  return null;
}
