"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, MapPin, School, Search } from "lucide-react";
import {
  OKUL_TURU_ADI,
  REFERANS_YIL,
  okulTamAd,
  type Okul,
  type OkulTuru,
} from "@/content/okullar";
import { OkulGorseli } from "./OkulGorseli";

const TURLER: { deger: OkulTuru | "hepsi"; ad: string }[] = [
  { deger: "hepsi", ad: "Tümü" },
  { deger: "fen", ad: "Fen" },
  { deger: "anadolu", ad: "Anadolu" },
  { deger: "imam-hatip", ad: "İmam Hatip" },
  { deger: "meslek", ad: "Meslek" },
];

/** Yüzdelik dilimi tutarlı biçimde yazar: 0.1 → "0,10". */
function yuzde(v: number): string {
  return v.toFixed(2).replace(".", ",");
}

/** Türkçe arama için: büyük/küçük ve aksan farkını yok sayar. */
function sadelestir(s: string): string {
  return s
    .toLocaleLowerCase("tr")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
}

export function OkulListesi({ okullar }: { okullar: Okul[] }) {
  const [sorgu, setSorgu] = useState("");
  const [tur, setTur] = useState<OkulTuru | "hepsi">("hepsi");
  const [il, setIl] = useState("hepsi");

  const iller = useMemo(
    () => [...new Set(okullar.map((o) => o.il))].sort((a, b) => a.localeCompare(b, "tr")),
    [okullar],
  );

  const sonuclar = useMemo(() => {
    const q = sadelestir(sorgu.trim());
    return okullar.filter((o) => {
      if (tur !== "hepsi" && o.tur !== tur) return false;
      if (il !== "hepsi" && o.il !== il) return false;
      if (!q) return true;
      return sadelestir(`${o.ad} ${o.program ?? ""} ${o.il} ${o.ilce ?? ""}`).includes(q);
    });
  }, [okullar, sorgu, tur, il]);

  return (
    <div className="space-y-4">
      {/* Arama + filtreler */}
      <div className="ring-hairline space-y-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rehberim-navy/45" />
          <input
            type="text"
            value={sorgu}
            onChange={(e) => setSorgu(e.target.value)}
            placeholder="Okul veya şehir ara (örn. Kabataş, İzmir)…"
            className="w-full rounded-xl border border-rehberim-border bg-white py-2.5 pl-9 pr-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rehberim-navy/45">
            <Filter className="h-3.5 w-3.5" />
            Tür
          </span>
          {TURLER.map((t) => (
            <button
              key={t.deger}
              type="button"
              onClick={() => setTur(t.deger)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                tur === t.deger
                  ? "bg-rehberim-navy text-white"
                  : "bg-rehberim-muted text-rehberim-navy/70 hover:bg-rehberim-border"
              }`}
            >
              {t.ad}
            </button>
          ))}

          <label className="ml-auto flex items-center gap-2">
            <span className="sr-only">Şehir</span>
            <MapPin className="h-3.5 w-3.5 text-rehberim-navy/45" />
            <select
              value={il}
              onChange={(e) => setIl(e.target.value)}
              className="rounded-lg border border-rehberim-border bg-white px-2 py-1.5 text-xs font-bold text-rehberim-navy outline-none focus:border-rehberim-accent"
            >
              <option value="hepsi">Tüm şehirler</option>
              {iller.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-xs tabular-nums text-rehberim-navy/50">
          {sonuclar.length} okul listeleniyor
        </p>
      </div>

      {sonuclar.length === 0 ? (
        <div className="rounded-2xl border border-rehberim-border bg-white p-8 text-center">
          <School className="mx-auto h-8 w-8 text-rehberim-navy/25" />
          <p className="mt-3 text-sm font-bold text-rehberim-navy">
            Bu filtreyle okul bulunamadı
          </p>
          <p className="mt-1 text-xs text-rehberim-navy/55">
            Aramayı sadeleştirmeyi ya da şehir filtresini kaldırmayı dene.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {sonuclar.map((o, sira) => (
            <OkulKarti key={o.id} okul={o} sira={okullar.indexOf(o) + 1} gecikme={sira} />
          ))}
        </ul>
      )}
    </div>
  );
}

function OkulKarti({
  okul,
  sira,
}: {
  okul: Okul;
  sira: number;
  gecikme: number;
}) {
  // Liste tek bir yıl üzerinden karşılaştırılır; sıralama da ona göre.
  const veri = okul.puanlar[REFERANS_YIL] ?? null;

  return (
    <li>
      <Link
        href={`/okullar/${okul.id}`}
        className="group ring-hairline flex h-full overflow-hidden rounded-2xl border border-rehberim-border bg-white shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-navy/20 hover:shadow-soft"
      >
        <div className="relative w-24 shrink-0 overflow-hidden sm:w-28">
          <OkulGorseli
            id={okul.id}
            tur={okul.tur}
            className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.06]"
          />
          <span className="absolute left-1.5 top-1.5 rounded-md bg-rehberim-navy/85 px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums text-white backdrop-blur-sm">
            #{sira}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3.5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rehberim-navy/45">
              {OKUL_TURU_ADI[okul.tur]}
              {okul.yabanciDil ? ` · ${okul.yabanciDil}` : ""}
            </p>
            <p className="mt-0.5 line-clamp-2 text-[13.5px] font-extrabold leading-snug tracking-tight text-rehberim-navy">
              {okulTamAd(okul)}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-rehberim-navy/55">
              {okul.ilce ? `${okul.ilce} / ` : ""}
              {okul.il}
            </p>
          </div>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-rehberim-navy/40">
                {REFERANS_YIL} taban
              </p>
              <p className="text-lg font-extrabold leading-none tabular-nums text-rehberim-navy">
                {veri?.taban != null ? veri.taban.toFixed(2).replace(".", ",") : "—"}
              </p>
              {veri?.yuzdelik != null && (
                <p className="mt-0.5 text-[11px] font-semibold tabular-nums text-rehberim-navy/55">
                  %{yuzde(veri.yuzdelik)} dilim
                </p>
              )}
            </div>
            <ArrowRight className="mb-0.5 h-4 w-4 shrink-0 text-rehberim-navy/30 transition-transform duration-300 ease-snap group-hover:translate-x-1 group-hover:text-rehberim-accent-deep" />
          </div>
        </div>
      </Link>
    </li>
  );
}
