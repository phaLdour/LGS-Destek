"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  Search,
  Sparkles,
} from "lucide-react";
import type { Anlam, Kelime } from "@/content/sozluk-veri";

type Direction = "next" | "prev";

const ANLAM_BADGE: Record<
  Anlam["tur"],
  { label: string; bg: string; text: string }
> = {
  gerçek: {
    label: "Gerçek",
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  mecaz: {
    label: "Mecaz",
    bg: "bg-rehberim-accent/20",
    text: "text-rehberim-accent-deep",
  },
  terim: {
    label: "Terim",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

type SozlukClientProps = {
  pageSize: number;
};

// useSearchParams() bir Suspense boundary gerektirir (Next.js CSR bailout).
// Dışa açılan bileşen içeriği Suspense ile sarar.
export function SozlukClient(props: SozlukClientProps) {
  return (
    <Suspense fallback={null}>
      <SozlukYukleyici {...props} />
    </Suspense>
  );
}

/**
 * 599 kelimelik veri (~300 KB) eskiden sayfayla birlikte iniyordu; telefonda
 * ilk açılışı belirgin yavaşlatıyordu. Artık sayfa iskeleti anında gelir,
 * veri ayrı bir parça (chunk) olarak boyadan SONRA yüklenir. Kullanıcı
 * farkı yalnızca çok yavaş bağlantıda, kısa bir iskelet olarak görür.
 */
function SozlukYukleyici({ pageSize }: SozlukClientProps) {
  const [kelimeler, setKelimeler] = useState<Kelime[] | null>(null);
  useEffect(() => {
    let iptal = false;
    import("@/content/sozluk-veri").then((m) => {
      if (!iptal) setKelimeler(m.SOZLUK);
    });
    return () => {
      iptal = true;
    };
  }, []);

  if (!kelimeler) {
    return (
      <div className="space-y-5">
        <div className="ring-hairline h-32 animate-pulse rounded-3xl border border-rehberim-border bg-white shadow-card" />
        <div className="ring-hairline h-72 animate-pulse rounded-2xl border border-rehberim-border bg-white shadow-card" />
      </div>
    );
  }
  return <SozlukClientInner kelimeler={kelimeler} pageSize={pageSize} />;
}

/** Türk alfabesi — harf çubuğunun sırası. */
const TURK_ALFABESI = [
  "A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L",
  "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z",
];

function SozlukClientInner({
  kelimeler,
  pageSize,
}: {
  kelimeler: Kelime[];
  pageSize: number;
}) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [flipDir, setFlipDir] = useState<Direction | null>(null);
  const [jumpInput, setJumpInput] = useState("");
  const [notFound, setNotFound] = useState(false);

  // AI Baykuş veya başka bir kaynaktan ?ara=X ile gelirse arama kutusunu doldur
  useEffect(() => {
    const ara = searchParams.get("ara");
    if (ara && ara.trim()) {
      setQuery(ara.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Arama yazılınca SOZLUK içinde uygun kelimenin sayfasına otomatik atla.
  // Önce tam eşleşme, sonra prefix, sonra includes denenir.
  useEffect(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) {
      setNotFound(false);
      return;
    }
    const lower = (s: string) => s.toLocaleLowerCase("tr");
    let idx = kelimeler.findIndex((k) => lower(k.kelime) === q);
    if (idx < 0) {
      idx = kelimeler.findIndex((k) => lower(k.kelime).startsWith(q));
    }
    if (idx < 0) {
      idx = kelimeler.findIndex((k) => lower(k.kelime).includes(q));
    }
    if (idx >= 0) {
      setNotFound(false);
      setPage(idx + 1);
    } else {
      setNotFound(true);
    }
  }, [kelimeler, query]);

  const totalPages = Math.max(1, Math.ceil(kelimeler.length / pageSize));

  /**
   * Harf çubuğu: her harfin ilk kelimesinin sayfası. 599 kelimede
   * "Sonraki sayfa" ile gezmek imkânsız; öğrenci harfe basıp oraya atlar.
   */
  const harfIndeksi = useMemo(() => {
    const bulunan = new Map<string, number>();
    kelimeler.forEach((k, i) => {
      const h = k.kelime.charAt(0).toLocaleUpperCase("tr");
      if (!bulunan.has(h)) bulunan.set(h, Math.floor(i / pageSize) + 1);
    });
    return TURK_ALFABESI.map((h) => ({ harf: h, sayfa: bulunan.get(h) ?? null }));
  }, [kelimeler, pageSize]);

  /** O an açık kelimenin baş harfi — çubukta işaretlenir. */
  const aktifHarf =
    kelimeler[(page - 1) * pageSize]?.kelime.charAt(0).toLocaleUpperCase("tr") ??
    null;

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return kelimeler.slice(start, start + pageSize);
  }, [kelimeler, page, pageSize]);

  function go(direction: Direction) {
    if (direction === "next" && page >= totalPages) return;
    if (direction === "prev" && page <= 1) return;
    // Kullanıcı kelimeler arası dolaşıyorsa arama kutusunu temizle
    if (query) {
      setQuery("");
      setNotFound(false);
    }
    setFlipDir(direction);
    setTimeout(() => {
      setPage((p) => p + (direction === "next" ? 1 : -1));
      setTimeout(() => setFlipDir(null), 320);
    }, 280);
  }

  function jumpToPage(target: number) {
    const clamped = Math.max(1, Math.min(totalPages, Math.floor(target)));
    if (clamped === page) return;
    if (query) {
      setQuery("");
      setNotFound(false);
    }
    const direction: Direction = clamped > page ? "next" : "prev";
    setFlipDir(direction);
    setTimeout(() => {
      setPage(clamped);
      setTimeout(() => setFlipDir(null), 320);
    }, 280);
  }

  function handleJumpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(jumpInput);
    if (Number.isFinite(n) && n >= 1) {
      jumpToPage(n);
      setJumpInput("");
    }
  }

  return (
    <div className="space-y-5">
      {/* Başlık */}
      <header className="relative overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <Languages className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Türkçe Sözlük</h1>
            <p className="mt-1 text-pretty text-sm text-white/85">
              Çok anlamlı kelimeler, <strong>gerçek</strong> /{" "}
              <strong>mecaz</strong> ayrımı ve her anlam için örnek cümle.
            </p>
            <p className="mt-1 text-xs tabular-nums text-white/70">
              {kelimeler.length} kelime · her sayfada bir kelime · toplam{" "}
              {Math.ceil(kelimeler.length / pageSize)} sayfa
            </p>
            <a
              href="/sozluk/test"
              className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-rehberim-accent px-4 py-2 text-sm font-extrabold text-rehberim-navy transition hover:bg-rehberim-accent-light"
            >
              Kelime Testi&apos;ne başla →
            </a>
          </div>
        </div>
      </header>

      {/* Arama + sayfa atlama */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rehberim-navy/45" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kelime ara (örn. açık, gözü, taş)…"
            className="w-full rounded-xl border border-rehberim-border bg-white py-2.5 pl-9 pr-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
          />
        </div>
        <form
          onSubmit={handleJumpSubmit}
          className="flex items-center gap-2"
        >
          <label className="text-xs font-bold text-rehberim-navy/70">
            Sayfa atla:
          </label>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            placeholder={`1–${totalPages}`}
            className="w-20 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-center text-sm font-bold text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-rehberim-navy px-3 py-2 text-xs font-bold text-white transition hover:bg-rehberim-navy-dark"
          >
            Git
          </button>
        </form>
      </div>

      {/* Harf çubuğu — 599 kelimede en hızlı gezinme yolu */}
      <nav
        aria-label="Harfe göre atla"
        className="ring-hairline flex flex-wrap gap-1 rounded-2xl border border-rehberim-border bg-white p-2 shadow-card"
      >
        {harfIndeksi.map(({ harf, sayfa }) => {
          const aktif = harf === aktifHarf;
          return (
            <button
              key={harf}
              type="button"
              onClick={() => sayfa !== null && jumpToPage(sayfa)}
              disabled={sayfa === null || flipDir !== null}
              aria-current={aktif ? "true" : undefined}
              title={
                sayfa === null
                  ? `${harf} harfiyle başlayan kelime yok`
                  : `${harf} harfine atla`
              }
              className={`h-8 min-w-[1.9rem] rounded-lg px-1.5 text-xs font-extrabold transition ${
                aktif
                  ? "bg-rehberim-navy text-white"
                  : sayfa === null
                    ? "cursor-not-allowed text-rehberim-navy/20"
                    : "text-rehberim-navy/70 hover:bg-rehberim-accent/15 hover:text-rehberim-navy"
              } disabled:opacity-100`}
            >
              {harf}
            </button>
          );
        })}
      </nav>

      {/* Arama eşleşmedi uyarısı (mevcut sayfa yine görünür) */}
      {notFound && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>
            “{query.trim()}” sözlükte bulunamadı. Farklı bir kelime
            deneyebilirsin.
          </span>
        </div>
      )}

      {/* Kitap sahnesi */}
      <div className="book-scene">
        <div
          className={`book-page rounded-2xl border border-rehberim-border bg-white p-4 shadow-card sm:p-6 ${
            flipDir === "next"
              ? "book-flip-next"
              : flipDir === "prev"
                ? "book-flip-prev"
                : ""
          }`}
        >
          {/* Sayfa içeriği */}
          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="mb-3 h-10 w-10 text-rehberim-navy/30" />
              <p className="text-sm font-bold text-rehberim-navy">
                Sözlükte henüz kelime yok.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between border-b border-rehberim-border pb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-rehberim-navy/55">
                  Sayfa {page} / {totalPages}
                </p>
                <p className="text-xs font-semibold text-rehberim-navy/55">
                  {currentItems.length} kelime
                </p>
              </div>
              <div className="space-y-4">
                {currentItems.map((k, i) => (
                  <article
                    key={`${k.kelime}-${i}`}
                    className="border-b border-rehberim-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <header className="mb-2 flex flex-wrap items-baseline gap-2">
                      <h2 className="text-lg font-extrabold text-rehberim-navy">
                        {k.kelime}
                      </h2>
                      {k.tur && (
                        <span className="text-xs font-semibold italic text-rehberim-navy/55">
                          {k.tur}
                        </span>
                      )}
                    </header>
                    <ol className="space-y-2">
                      {k.anlamlar.map((a, j) => {
                        const badge = ANLAM_BADGE[a.tur];
                        return (
                          <li
                            key={j}
                            className="flex gap-2 rounded-lg bg-rehberim-muted/50 px-3 py-2"
                          >
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rehberim-navy text-[11px] font-bold text-white">
                              {j + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-full ${badge.bg} px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${badge.text}`}
                                >
                                  {badge.label}
                                </span>
                                <p className="text-sm font-semibold text-rehberim-navy">
                                  {a.tanim}
                                </p>
                              </div>
                              <p className="mt-1 text-xs italic text-rehberim-navy/65">
                                Örnek: “{a.ornek}”
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sayfa kontrolleri */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => go("prev")}
          disabled={page <= 1 || flipDir !== null}
          className="flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-4 py-2.5 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Önceki Sayfa
        </button>

        {/* Sayfa numaraları (mini) */}
        <div className="hidden gap-1 sm:flex">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => {
              // Aktif sayfa civarındakileri ve uçları göster
              if (p === 1 || p === totalPages) return true;
              return Math.abs(p - page) <= 1;
            })
            .map((p, idx, arr) => {
              const prev = arr[idx - 1];
              const showEllipsis = prev !== undefined && p - prev > 1;
              return (
                <span key={p} className="flex items-center gap-1">
                  {showEllipsis && (
                    <span className="px-1 text-rehberim-navy/40">…</span>
                  )}
                  <button
                    onClick={() => jumpToPage(p)}
                    disabled={flipDir !== null}
                    className={`h-9 min-w-[2.25rem] rounded-lg px-2 text-xs font-bold transition ${
                      p === page
                        ? "bg-rehberim-accent text-rehberim-navy"
                        : "bg-rehberim-muted text-rehberim-navy hover:bg-rehberim-border"
                    } disabled:opacity-40`}
                  >
                    {p}
                  </button>
                </span>
              );
            })}
        </div>

        <button
          onClick={() => go("next")}
          disabled={page >= totalPages || flipDir !== null}
          className="flex items-center gap-1.5 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sonraki Sayfa
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
