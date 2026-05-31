"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  getWrongCount,
  hydrateWrongFromSupabase,
} from "@/lib/wrongAnswers";

export function WrongPracticeCard() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Önce yerelden hızlı göster, sonra Supabase hidrasyonu sonrası güncelle.
    setCount(getWrongCount());
    void hydrateWrongFromSupabase().then(() => {
      setCount(getWrongCount());
    });
  }, []);

  // Hiç hata yoksa kartı gösterme (gereksiz gürültü)
  if (count === null || count === 0) return null;

  return (
    <Link
      href="/hatalarim"
      className="group mt-4 flex items-center gap-4 overflow-hidden rounded-2xl border border-red-300/60 bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-card transition hover:scale-[1.01] hover:shadow-soft"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
        <AlertCircle className="h-8 w-8" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-extrabold">Hatalarımı Çöz</p>
        <p className="text-sm text-white/85">
          {count} soruluk yanlış cevap havuzun var — pekiştirmenin tam zamanı
        </p>
      </div>
      <span className="hidden rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wider sm:block">
        {count} soru
      </span>
    </Link>
  );
}
