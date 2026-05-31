"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Languages,
  Search,
  Sparkles,
} from "lucide-react";
import {
  findKelimeIndex,
  pageOfIndex,
  type Anlam,
  type Kelime,
} from "@/content/sozluk-veri";

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
    text: "text-rehberim-accent-dark",
  },
  terim: {
    label: "Terim",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

export function SozlukClient({
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
  /** Vurgulanan kelime (yalnız bu ziyarette geçerli). */
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const highlightedRef = useRef<HTMLElement | null>(null);

  // Query param "ara" varsa: ilgili kelime sayfasına git ve vurgula.
  useEffect(() => {
    const ara = searchParams.get("ara");
    if (!ara) return;
    const trimmed = ara.trim();
    if (!trimmed) return;
    const idx = findKelimeIndex(trimmed);
    if (idx >= 0) {
      const targetPage = pageOfIndex(idx);
      setPage(targetPage);
      setHighlighted(
        kelimeler[idx].kelime.toLocaleLowerCase("tr"),
      );
    } else {
      // Tam eşleşme yoksa arama kutusuna yaz → filtreden geçsin.
      setQuery(trimmed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Vurgulanan kelime DOM'a düşünce scroll et
  useEffect(() => {
    if (!highlighted) return;
    const t = setTimeout(() => {
      highlightedRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 400);
    return () => clearTimeout(t);
  }, [highlighted, page]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return kelimeler;
    return kelimeler.filter((k) =>
      k.kelime.toLocaleLowerCase("tr").includes(q),
    );
  }, [kelimeler, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  // Arama değişince sayfa 1'e dön (vurgu da kaldırılır — kullanıcı kendi arıyor)
  useEffect(() => {
    setPage(1);
    if (query.trim()) setHighlighted(null);
  }, [query]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function go(direction: Direction) {
    if (direction === "next" && page >= totalPages) return;
    if (direction === "prev" && page <= 1) return;
    setHighlighted(null); // sayfa değişirse vurgu kaybolur
    setFlipDir(direction);
    setTimeout(() => {
      setPage((p) => p + (direction === "next" ? 1 : -1));
      setTimeout(() => setFlipDir(null), 320);
    }, 280);
  }

  function jumpToPage(target: number) {
    const clamped = Math.max(1, Math.min(totalPages, Math.floor(target)));
    if (clamped === page) return;
    setHighlighted(null);
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
      <header className="rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <Languages className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold">Türkçe Sözlük</h1>
            <p className="mt-1 text-sm text-white/85">
              Çok anlamlı kelimeler, <strong>gerçek</strong> /{" "}
              <strong>mecaz</strong> ayrımı ve her anlam için örnek cümle.
            </p>
            <p className="mt-1 text-xs text-white/70">
              {kelimeler.length} kelime · sayfa başına {pageSize} · toplam{" "}
              {Math.ceil(kelimeler.length / pageSize)} sayfa
            </p>
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
                Aradığın kelime bulunamadı.
              </p>
              <p className="mt-1 text-xs text-rehberim-navy/55">
                Farklı bir kelime dene ya da arama kutusunu temizle.
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
                {currentItems.map((k, i) => {
                  const isHighlighted =
                    highlighted !== null &&
                    k.kelime.toLocaleLowerCase("tr") === highlighted;
                  return (
                    <article
                      key={`${k.kelime}-${i}`}
                      ref={
                        isHighlighted
                          ? (el) => {
                              highlightedRef.current = el;
                            }
                          : undefined
                      }
                      className={`border-b border-rehberim-border/60 pb-3 last:border-0 last:pb-0 ${
                        isHighlighted ? "sozluk-highlight" : ""
                      }`}
                    >
                      <header className="mb-2 flex flex-wrap items-baseline gap-2">
                        <h2
                          className={`text-lg font-extrabold text-rehberim-navy ${
                            isHighlighted ? "sozluk-highlight-title" : ""
                          }`}
                        >
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
                  );
                })}
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
                        ? "bg-rehberim-accent text-white"
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
