"use client";

/**
 * MiniOdak — her sayfada görünen küçük sayaç rozeti + odak "kalp atışı".
 *
 * AppShell'e bir kez konur. İki işi var:
 *  1. Görsel: sayaç/pomodoro çalışırken sol altta süre gösterir; tıklayınca
 *     /odak sayfasına götürür. /odak'tayken gizlenir (orada büyüğü var).
 *  2. Motor: saniyelik tıkırtıyla sekme başlığını günceller, geri sayım
 *     bitince zili çalar + süreyi hesaba işler, pomodoro faz geçişlerinde
 *     nazik bir "ding" çalar. Öğrenci hangi sayfada olursa olsun çalışır.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  aktifGecenSn,
  odakAboneOl,
  odakDurumu,
  odakOturumunuKaydet,
  pomodoroFazi,
  sayacKalanSn,
  sayacTamamla,
  sureBicimle,
} from "@/lib/odak";
import { aktifSes, fazZili, sesAboneOl, zilCal, SESLER } from "@/lib/odakSes";

/** Modül düzeyi: sayfa geçişlerinde bileşen yeniden kurulsa da faz hafızası kalır. */
let sonFazAnahtari: string | null = null;
let orijinalBaslik: string | null = null;

function basligiAyarla(metin: string | null) {
  if (typeof document === "undefined") return;
  if (metin === null) {
    if (orijinalBaslik !== null) {
      document.title = orijinalBaslik;
      orijinalBaslik = null;
    }
    return;
  }
  if (orijinalBaslik === null) orijinalBaslik = document.title;
  document.title = metin;
}

export function MiniOdak() {
  const pathname = usePathname();
  const [, setTik] = useState(0);

  useEffect(() => {
    const kalpAtisi = () => {
      const d = odakDurumu();
      if (!d) {
        basligiAyarla(null);
        sonFazAnahtari = null;
        return;
      }
      if (d.mod === "sayac") {
        const kalan = sayacKalanSn(d);
        if (kalan <= 0 && !d.bitti) {
          const ozet = sayacTamamla();
          if (ozet) {
            zilCal();
            void odakOturumunuKaydet(ozet);
          }
        }
        basligiAyarla(d.bitti ? "🎉 Süre doldu! · Rehberim" : `⏳ ${sureBicimle(kalan)} · Rehberim`);
      } else if (d.mod === "kronometre") {
        basligiAyarla(`⏱️ ${sureBicimle(aktifGecenSn(d))} · Rehberim`);
      } else {
        const faz = pomodoroFazi(aktifGecenSn(d));
        const anahtar = `${faz.set}:${faz.tur}:${faz.tip}`;
        if (sonFazAnahtari !== null && sonFazAnahtari !== anahtar) {
          fazZili(faz.tip === "mola");
        }
        sonFazAnahtari = anahtar;
        basligiAyarla(
          `🍅 ${sureBicimle(faz.fazKalanSn)} ${faz.tip === "calisma" ? "Çalışma" : "Mola"} · Rehberim`,
        );
      }
    };
    kalpAtisi();
    const id = window.setInterval(() => {
      kalpAtisi();
      setTik((t) => t + 1);
    }, 1000);
    const aboneler = [odakAboneOl(() => setTik((t) => t + 1)), sesAboneOl(() => setTik((t) => t + 1))];
    return () => {
      window.clearInterval(id);
      aboneler.forEach((a) => a());
    };
  }, []);

  const durum = odakDurumu();
  const ses = aktifSes();
  const odaktayiz = pathname === "/odak" || pathname.startsWith("/odak/");
  if (odaktayiz || (!durum && !ses)) return null;

  let emoji = "🎵";
  let metin = "";
  let altMetin: string | null = null;
  if (durum?.mod === "sayac") {
    const kalan = sayacKalanSn(durum);
    emoji = durum.bitti ? "🎉" : "⏳";
    metin = durum.bitti ? "Süre doldu!" : sureBicimle(kalan);
    if (durum.duraklatmaMs !== null) altMetin = "duraklatıldı";
  } else if (durum?.mod === "kronometre") {
    emoji = "⏱️";
    metin = sureBicimle(aktifGecenSn(durum));
    if (durum.duraklatmaMs !== null) altMetin = "duraklatıldı";
  } else if (durum?.mod === "pomodoro") {
    const faz = pomodoroFazi(aktifGecenSn(durum));
    emoji = "🍅";
    metin = sureBicimle(faz.fazKalanSn);
    altMetin = faz.tip === "calisma" ? `${faz.tur}. tur · çalışma` : "mola";
  } else if (ses) {
    const s = SESLER.find((x) => x.id === ses);
    emoji = s?.emoji ?? "🎵";
    metin = s?.ad ?? "Ses açık";
  }

  return (
    <Link
      href="/odak"
      aria-label="Odak Moduna git"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-2 rounded-2xl border border-white/15 bg-rehberim-navy/95 py-2 pl-2.5 pr-3.5 text-white shadow-elevated backdrop-blur-md transition hover:scale-[1.03] active:scale-95 lg:bottom-6"
    >
      <span className="text-lg leading-none">{emoji}</span>
      <span className="min-w-0">
        <span className="block font-mono text-sm font-bold leading-tight tabular-nums">{metin}</span>
        {(altMetin || (durum && ses)) && (
          <span className="block text-[10px] font-semibold leading-tight text-white/65">
            {[altMetin, durum && ses ? SESLER.find((x) => x.id === ses)?.emoji : null]
              .filter(Boolean)
              .join(" ")}
          </span>
        )}
      </span>
    </Link>
  );
}
