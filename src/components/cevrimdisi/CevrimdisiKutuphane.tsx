"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CloudDownload,
  Layers,
  Lightbulb,
  ListChecks,
  Loader2,
  Network,
  RefreshCw,
  Trash2,
  WifiOff,
} from "lucide-react";
import { Article } from "@/components/study/Article";
import { Flashcards } from "@/components/study/Flashcards";
import { LgsTips } from "@/components/study/LgsTips";
import { MindMap } from "@/components/study/MindMap";
import { CevrimdisiTest } from "./CevrimdisiTest";
import {
  guncelMi,
  paketBoyutuKB,
  paketiIndir,
  paketiSil,
  saklananPaket,
} from "@/lib/cevrimdisiIstemci";
import type { CevrimdisiKonu, CevrimdisiPaket } from "@/lib/cevrimdisiYollar";

type Bolum = "makale" | "kartlar" | "test" | "ipuclari" | "harita";

const BOLUM_ADI: Record<Bolum, string> = {
  makale: "Konu anlatımı",
  kartlar: "Kartlar",
  test: "Test",
  ipuclari: "LGS tuzakları",
  harita: "Konu haritası",
};

const BOLUM_IKONU: Record<Bolum, typeof BookOpen> = {
  makale: BookOpen,
  kartlar: Layers,
  test: ListChecks,
  ipuclari: Lightbulb,
  harita: Network,
};

function konununBolumleri(k: CevrimdisiKonu): Bolum[] {
  const b: Bolum[] = [];
  if (k.makale) b.push("makale");
  if (k.kartlar?.length) b.push("kartlar");
  if (k.test?.length) b.push("test");
  if (k.ipuclari?.length) b.push("ipuclari");
  if (k.harita) b.push("harita");
  return b;
}

/**
 * Çevrimdışı kütüphane.
 *
 * Üç hâli var:
 *   1. Paket yok      → indirme daveti
 *   2. Paket var      → ders/konu listesi
 *   3. Konu seçilmiş  → okuma ekranı
 *
 * Sayfa internet OLMADAN da çalışmak zorunda; bu yüzden her ağ işlemi
 * (indirme, sürüm kontrolü) hata verse bile ekran ayakta kalır.
 */
export function CevrimdisiKutuphane() {
  const [paket, setPaket] = useState<CevrimdisiPaket | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [indiriliyor, setIndiriliyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [tazeMi, setTazeMi] = useState<boolean | null>(null);
  const [cevrimici, setCevrimici] = useState(true);
  const [acikDers, setAcikDers] = useState<string | null>(null);
  const [acikKonu, setAcikKonu] = useState<{
    ders: string;
    konu: CevrimdisiKonu;
  } | null>(null);
  const [bolum, setBolum] = useState<Bolum>("makale");

  useEffect(() => {
    // navigator.onLine yalnız "kablo takılı mı" der, gerçek erişimi
    // garanti etmez — yine de öğrenciye doğru mesajı seçmek için yeterli.
    const guncelle = () => setCevrimici(navigator.onLine);
    guncelle();
    window.addEventListener("online", guncelle);
    window.addEventListener("offline", guncelle);
    return () => {
      window.removeEventListener("online", guncelle);
      window.removeEventListener("offline", guncelle);
    };
  }, []);

  useEffect(() => {
    let iptal = false;
    (async () => {
      const p = await saklananPaket();
      if (iptal) return;
      setPaket(p);
      setYukleniyor(false);
      if (p) {
        const t = await guncelMi(p);
        if (!iptal) setTazeMi(t);
      }
    })();
    return () => {
      iptal = true;
    };
  }, []);

  const indir = useCallback(async () => {
    setIndiriliyor(true);
    setHata(null);
    try {
      const p = await paketiIndir();
      setPaket(p);
      setTazeMi(true);
    } catch (e) {
      setHata(
        e instanceof Error && e.message
          ? e.message
          : "İndirme başarısız oldu. İnternet bağlantını kontrol et.",
      );
    } finally {
      setIndiriliyor(false);
    }
  }, []);

  const sil = useCallback(async () => {
    await paketiSil();
    setPaket(null);
    setTazeMi(null);
    setAcikDers(null);
    setAcikKonu(null);
  }, []);

  // ── Yükleniyor ───────────────────────────────────────────────────
  if (yukleniyor) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2
          className="h-6 w-6 animate-spin text-rehberim-navy/40"
          aria-label="Yükleniyor"
        />
      </div>
    );
  }

  // ── Konu okuma ekranı ────────────────────────────────────────────
  if (acikKonu) {
    const k = acikKonu.konu;
    const bolumler = konununBolumleri(k);
    const secili = bolumler.includes(bolum) ? bolum : bolumler[0];

    return (
      <div>
        <button
          type="button"
          onClick={() => setAcikKonu(null)}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-rehberim-navy/70 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          Konu listesi
        </button>

        <h2 className="mt-3 text-xl font-extrabold leading-tight text-rehberim-navy">
          {k.ad}
        </h2>
        <p className="mt-1 text-sm leading-snug text-rehberim-navy/60">
          {k.ozet}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {bolumler.map((b) => {
            const Ikon = BOLUM_IKONU[b];
            const aktif = b === secili;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setBolum(b)}
                aria-pressed={aktif}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-bold transition ${
                  aktif
                    ? "border-rehberim-navy bg-rehberim-navy text-white"
                    : "border-rehberim-border bg-rehberim-surface text-rehberim-navy hover:bg-rehberim-muted"
                }`}
              >
                <Ikon className="h-4 w-4" strokeWidth={2.4} />
                {BOLUM_ADI[b]}
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          {secili === "makale" && k.makale && <Article text={k.makale} />}
          {secili === "kartlar" && k.kartlar && <Flashcards cards={k.kartlar} />}
          {secili === "test" && k.test && <CevrimdisiTest sorular={k.test} />}
          {secili === "ipuclari" && k.ipuclari && <LgsTips tips={k.ipuclari} />}
          {secili === "harita" && k.harita && <MindMap data={k.harita} />}
        </div>
      </div>
    );
  }

  // ── Paket yok: indirme daveti ────────────────────────────────────
  if (!paket) {
    return (
      <div className="rounded-2xl border border-rehberim-border bg-rehberim-surface p-6 text-center">
        <CloudDownload
          className="mx-auto h-10 w-10 text-rehberim-accent-dark"
          strokeWidth={2}
        />
        <h2 className="mt-3 text-lg font-extrabold text-rehberim-navy">
          Dersleri telefonuna indir
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-snug text-rehberim-navy/70">
          Tüm derslerin konu anlatımları, kartları, testleri ve LGS
          tuzakları telefonuna kaydedilir. Sonra internet olmadan da
          çalışabilirsin — serviste, otobüste, çekmeyen yerde.
        </p>
        <p className="mt-2 text-xs text-rehberim-navy/50">
          Yaklaşık 70 KB indirilir — bir fotoğraf kadar. Videolar dahil
          değildir.
        </p>

        {hata && (
          <p className="mx-auto mt-3 max-w-sm rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm font-semibold text-rose-900">
            {hata}
          </p>
        )}

        <button
          type="button"
          onClick={indir}
          disabled={indiriliyor}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rehberim-navy px-5 py-3 text-sm font-bold text-white transition enabled:hover:bg-rehberim-navy-light enabled:active:scale-95 disabled:opacity-50"
        >
          {indiriliyor ? (
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
          ) : (
            <CloudDownload className="h-4 w-4" strokeWidth={2.4} />
          )}
          {indiriliyor ? "İndiriliyor…" : "İndir"}
        </button>

        {!cevrimici && (
          <p className="mt-3 text-sm font-semibold text-rehberim-navy/70">
            Şu an internet yok. Bağlanınca buraya dönüp indirebilirsin.
          </p>
        )}
      </div>
    );
  }

  // ── Paket var: ders ve konu listesi ──────────────────────────────
  return (
    <div>
      <div className="rounded-2xl border border-rehberim-border bg-rehberim-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-1.5 text-sm font-extrabold text-rehberim-navy">
              <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />
              {paket.konuSayisi} konu telefonunda
            </p>
            <p className="mt-0.5 text-xs text-rehberim-navy/60">
              Yaklaşık {paketBoyutuKB(paket)} KB
              {tazeMi === false && " · yeni içerik var"}
              {!cevrimici && " · internet yok"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={indir}
              disabled={indiriliyor}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold transition disabled:opacity-50 ${
                tazeMi === false
                  ? "bg-rehberim-accent text-rehberim-on-accent hover:brightness-95"
                  : "border border-rehberim-border bg-rehberim-surface text-rehberim-navy hover:bg-rehberim-muted"
              }`}
            >
              {indiriliyor ? (
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
              ) : (
                <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
              )}
              Güncelle
            </button>
            <button
              type="button"
              onClick={sil}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-rehberim-surface px-3 py-2 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.4} />
              Sil
            </button>
          </div>
        </div>
        {hata && (
          <p className="mt-3 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm font-semibold text-rose-900">
            {hata}
          </p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {paket.dersler.map((d) => {
          const acik = acikDers === d.slug;
          return (
            <div
              key={d.slug}
              className="overflow-hidden rounded-2xl border border-rehberim-border bg-rehberim-surface"
            >
              <button
                type="button"
                onClick={() => setAcikDers(acik ? null : d.slug)}
                aria-expanded={acik}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-rehberim-muted"
              >
                <span className="font-extrabold text-rehberim-navy">{d.ad}</span>
                <span className="text-sm font-bold text-rehberim-navy/50">
                  {d.konular.length} konu
                </span>
              </button>
              {acik && (
                <ul className="border-t border-rehberim-border">
                  {d.konular.map((k) => (
                    <li key={k.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setAcikKonu({ ders: d.slug, konu: k });
                          setBolum(konununBolumleri(k)[0] ?? "makale");
                        }}
                        className="flex w-full flex-col items-start gap-0.5 border-b border-rehberim-border px-4 py-3 text-left transition last:border-b-0 hover:bg-rehberim-muted"
                      >
                        <span className="text-sm font-bold text-rehberim-navy">
                          {k.ad}
                        </span>
                        <span className="text-xs leading-snug text-rehberim-navy/60">
                          {konununBolumleri(k)
                            .map((b) => BOLUM_ADI[b])
                            .join(" · ")}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {cevrimici ? (
        <Link
          href="/dersler"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-rehberim-navy/70 transition hover:text-rehberim-navy"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.4} />
          Normal derslere dön
        </Link>
      ) : (
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60">
          <WifiOff className="h-4 w-4" strokeWidth={2.4} />
          İnternet gelince tüm site yeniden açılır.
        </p>
      )}
    </div>
  );
}
