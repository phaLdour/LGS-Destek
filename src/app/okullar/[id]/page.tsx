import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  OkulGorseli,
  okulGokRengi,
} from "@/components/okullar/OkulGorseli";
import {
  OKULLAR,
  OKUL_TURU_ADI,
  guncelYil,
  guncelYuzdelikYili,
  okulBul,
  okulTamAd,
  okulYillari,
  type Okul,
} from "@/content/okullar";
import { getShellUser } from "@/lib/user";

export function generateStaticParams() {
  return OKULLAR.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const okul = okulBul(id);
  if (!okul) return { title: "Okul bulunamadı — Rehberim" };
  return {
    title: `${okulTamAd(okul)} taban puanları — Rehberim`,
    description: `${okulTamAd(okul)} (${okul.il}) yıl yıl LGS taban puanı, yüzdelik dilimi ve kontenjanı.`,
  };
}

const sayi = (v: number | null, basamak = 2) =>
  v == null ? "—" : v.toFixed(basamak).replace(".", ",");

/** Yüzdelik dilim — her zaman iki basamak, ki sütun hizalı okunsun. */
const yuzde = (v: number | null | undefined) =>
  v == null ? "—" : `%${v.toFixed(2).replace(".", ",")}`;

export default async function OkulPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, user] = await Promise.all([params, getShellUser()]);
  const okul = okulBul(id);
  if (!okul) notFound();

  const yillar = okulYillari(okul);
  const guncel = guncelYil(okul);
  const guncelVeri = guncel ? okul.puanlar[guncel] : null;
  // 2026 yüzdelikleri MEB tarafından açıklanmadı; en son açıklanan yılı göster.
  const yuzdelikYili = guncelYuzdelikYili(okul);
  const yuzdelik = yuzdelikYili ? okul.puanlar[yuzdelikYili]?.yuzdelik : null;

  return (
    <AppShell user={user}>
      <Link
        href="/okullar"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-rehberim-navy/60 transition-colors hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Okul tarama
      </Link>

      {/* Başlık — görsel + künye */}
      <header className="ring-hairline overflow-hidden rounded-3xl border border-rehberim-border bg-white shadow-card">
        <div
          className="relative flex h-36 w-full items-center justify-center overflow-hidden sm:h-44"
          style={{ backgroundColor: okulGokRengi(okul.id, okul.tur) }}
        >
          <OkulGorseli
            id={okul.id}
            tur={okul.tur}
            sigdir
            className="h-full w-auto"
          />
        </div>

        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-accent-deep">
            {OKUL_TURU_ADI[okul.tur]}
            {okul.yabanciDil ? ` · ${okul.yabanciDil}` : ""}
            {okul.hazirlik ? " · Hazırlık sınıfı" : ""}
          </p>
          <h1 className="mt-1 text-xl font-extrabold leading-snug tracking-tight text-rehberim-navy sm:text-2xl">
            {okulTamAd(okul)}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-rehberim-navy/60">
            <MapPin className="h-4 w-4 shrink-0 text-rehberim-navy/40" />
            {okul.ilce ? `${okul.ilce} / ` : ""}
            {okul.il}
          </p>

          {/* Güncel yılın özeti */}
          {guncelVeri && (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              <Kutu
                baslik={`${guncel} taban`}
                deger={sayi(guncelVeri.taban)}
              />
              <Kutu
                baslik={
                  yuzdelik != null ? `${yuzdelikYili} yüzdelik` : "Yüzdelik dilim"
                }
                deger={yuzde(yuzdelik)}
              />
              <Kutu
                baslik={`${guncel} kontenjan`}
                deger={guncelVeri.kontenjan != null ? String(guncelVeri.kontenjan) : "—"}
                ikon={<Users className="h-3.5 w-3.5" />}
              />
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={okul.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-rehberim-navy-light"
            >
              Okulun kendi sayfası
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {okul.dogrulandi && (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                <BadgeCheck className="h-4 w-4" />
                Puanlar iki kaynakta doğrulandı
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Yıl yıl tablo */}
      <section className="mt-5">
        <h2 className="mb-1 text-lg font-extrabold text-rehberim-navy">
          Yıl yıl taban puanı
        </h2>
        <p className="mb-3 text-sm text-rehberim-navy/55">
          Doğrulanamayan değerler &ldquo;—&rdquo; olarak bırakıldı; tahmin yazılmadı.
        </p>

        <div className="ring-hairline overflow-x-auto rounded-2xl border border-rehberim-border bg-white shadow-card">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="border-b border-rehberim-border bg-rehberim-muted/70 text-left">
                <Th>Yıl</Th>
                <Th sagda>Taban</Th>
                <Th sagda>Tavan</Th>
                <Th sagda>Yüzdelik</Th>
                <Th sagda>Kontenjan</Th>
              </tr>
            </thead>
            <tbody>
              {yillar.map((y, i) => {
                const p = okul.puanlar[y];
                const oncekiYil = yillar[i + 1];
                const onceki = oncekiYil ? okul.puanlar[oncekiYil]?.taban : null;
                const fark =
                  p.taban != null && onceki != null ? p.taban - onceki : null;
                return (
                  <tr
                    key={y}
                    className="border-b border-rehberim-border/60 last:border-0"
                  >
                    <td className="px-4 py-3 font-extrabold tabular-nums text-rehberim-navy">
                      {y}
                    </td>
                    <td className="px-4 py-3 text-right font-bold tabular-nums text-rehberim-navy">
                      {sayi(p.taban)}
                      {fark != null && (
                        <span
                          className={`ml-2 text-[11px] font-bold tabular-nums ${
                            fark > 0 ? "text-green-600" : fark < 0 ? "text-red-500" : "text-rehberim-navy/40"
                          }`}
                        >
                          {fark > 0 ? "+" : ""}
                          {sayi(fark, 1)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-rehberim-navy/70">
                      {sayi(p.tavan)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-rehberim-navy/70">
                      {yuzde(p.yuzdelik)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-rehberim-navy/70">
                      {p.kontenjan ?? "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {yillar.length < 5 && (
          <p className="mt-2 text-xs text-rehberim-navy/50">
            Bu okulun daha eski yılları için doğrulanabilir kaynak bulunamadı.
            LGS 2018&apos;de başladı; eski yılların verisi her okul için
            yayımlanmıyor.
          </p>
        )}
      </section>

      {/* Açık çelişki notu */}
      {okul.not && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong className="font-extrabold">Kaynaklar arasında fark var:</strong>{" "}
            {okul.not}
          </span>
        </p>
      )}

      {/* Kaynaklar */}
      <Kaynaklar okul={okul} />

      {/* Motivasyon */}
      {guncelVeri?.taban != null && (
        <section className="ring-hairline mt-5 overflow-hidden rounded-2xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent/10 via-white to-amber-50/60 p-5">
          <p className="text-sm font-extrabold tracking-tight text-rehberim-navy">
            Buraya girmek için ne gerekiyor?
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-rehberim-navy/65">
            {guncel} yılında en düşük yerleşen puan{" "}
            <strong className="font-bold text-rehberim-navy">
              {sayi(guncelVeri.taban)}
            </strong>
            {yuzdelik != null && (
              <>
                {" "}({yuzdelikYili} yılında bu, Türkiye genelinde ilk{" "}
                <strong className="font-bold text-rehberim-navy">
                  {yuzde(yuzdelik)}
                </strong>
                {" "}demekti)
              </>
            )}
            . Kendi puanını hesaplamak için deneme çöz, sonra puan hesaplayıcıyı kullan.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <Link
              href="/deneme"
              className="inline-flex items-center gap-1.5 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-rehberim-navy-light"
            >
              Deneme çöz
            </Link>
            <Link
              href="/puan-hesapla"
              className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-4 py-2.5 text-sm font-extrabold text-rehberim-navy transition-colors hover:border-rehberim-navy/25"
            >
              Puanımı hesapla
            </Link>
          </div>
        </section>
      )}
    </AppShell>
  );
}

function Kutu({
  baslik,
  deger,
  ikon,
}: {
  baslik: string;
  deger: string;
  ikon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-rehberim-border bg-rehberim-muted/60 p-3">
      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rehberim-navy/45">
        {ikon}
        {baslik}
      </p>
      <p className="mt-1 text-lg font-extrabold leading-none tabular-nums text-rehberim-navy">
        {deger}
      </p>
    </div>
  );
}

function Th({ children, sagda }: { children: React.ReactNode; sagda?: boolean }) {
  return (
    <th
      className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-rehberim-navy/50 ${
        sagda ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Kaynaklar({ okul }: { okul: Okul }) {
  if (okul.kaynaklar.length === 0) return null;
  return (
    <details className="mt-4 rounded-2xl border border-rehberim-border bg-white px-4 py-3 shadow-card">
      <summary className="cursor-pointer text-xs font-bold text-rehberim-navy/60 transition-colors hover:text-rehberim-navy">
        Bu sayfadaki veriler nereden geldi? ({okul.kaynaklar.length} kaynak)
      </summary>
      <ul className="mt-2.5 space-y-1.5">
        {okul.kaynaklar.map((k) => (
          <li key={k}>
            <a
              href={k}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="break-all text-[11px] text-rehberim-navy/55 underline decoration-rehberim-navy/20 underline-offset-2 transition-colors hover:text-rehberim-accent-deep"
            >
              {k}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
