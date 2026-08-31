"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, X } from "lucide-react";
import {
  bekleyenTekrarlar,
  tekrariBirak,
} from "@/lib/konuTekrarDeposu";
import { gecikmeMetni } from "@/lib/konuTekrar";
import type { TekrarKaydi } from "@/lib/konuTekrar";

type Kayit = TekrarKaydi & { sonYuzde: number | null };

/**
 * "Tekrar zamanı" kartı.
 *
 * NEDEN DASHBOARD'DA: aralıklı tekrarın tek işe yarar yeri, öğrencinin
 * her gün baktığı ekran. Ayrı bir sayfaya konsaydı kimse açmazdı.
 *
 * NEDEN HİÇ KAYIT YOKKA GÖRÜNMÜYOR: yeni öğrencinin ekranını boş bir
 * kartla doldurmak, siteyi kalabalık gösterip asıl işi (bugünün planı)
 * gölgeliyor. Kart ancak gerçekten tekrar edilecek bir şey olunca çıkar.
 *
 * EN FAZLA 3 KONU: liste uzayınca "yapılacaklar" hissi veriyor ve
 * öğrenci hepsini birden erteliyor. Üçü bitince kalanlar zaten gelir.
 */
const GOSTERILEN = 3;

export function TekrarZamaniKarti({
  konuAdlari,
}: {
  /** `${dersSlug}/${konuId}` → konu adı. Sunucudan gelir; istemci
      ağır `@/content` modülünü paketine çekmesin diye. */
  konuAdlari: Record<string, string>;
}) {
  const [kayitlar, setKayitlar] = useState<Kayit[] | null>(null);

  useEffect(() => {
    let iptal = false;
    void bekleyenTekrarlar().then((k) => {
      if (!iptal) setKayitlar(k);
    });
    return () => {
      iptal = true;
    };
  }, []);

  async function birak(k: Kayit) {
    // Önce ekrandan kaldır: öğrenci dokunduğunda anında karşılık görsün.
    setKayitlar((o) =>
      (o ?? []).filter(
        (x) => !(x.dersSlug === k.dersSlug && x.konuId === k.konuId),
      ),
    );
    await tekrariBirak(k.dersSlug, k.konuId);
  }

  if (!kayitlar || kayitlar.length === 0) return null;

  const gosterilecek = kayitlar.slice(0, GOSTERILEN);
  const kalan = kayitlar.length - gosterilecek.length;

  return (
    <section className="ring-hairline mt-4 rounded-3xl border border-rehberim-border bg-rehberim-surface p-5 shadow-card">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rehberim-muted">
          <History
            className="h-5 w-5 text-rehberim-accent-dark"
            strokeWidth={2.2}
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-extrabold text-rehberim-navy">
            Tekrar zamanı
          </h2>
          <p className="text-xs leading-snug text-rehberim-navy/55">
            Bu konuları bir süre önce çalışmıştın — unutmadan tazele
          </p>
        </div>
      </div>

      <ul className="mt-3.5 space-y-2">
        {gosterilecek.map((k) => {
          const ad =
            konuAdlari[`${k.dersSlug}/${k.konuId}`] ?? k.konuId;
          const gecikme = gecikmeMetni(k.vade);
          return (
            <li
              key={`${k.dersSlug}/${k.konuId}`}
              className="flex items-center gap-2 rounded-2xl border border-rehberim-border bg-rehberim-muted p-1 pl-3"
            >
              <Link
                href={`/ders/${k.dersSlug}/${k.konuId}`}
                className="min-w-0 flex-1 py-2"
              >
                <span className="block truncate text-sm font-bold text-rehberim-navy">
                  {ad}
                </span>
                <span className="block text-xs text-rehberim-navy/55">
                  {gecikme}
                  {k.sonYuzde !== null && ` · geçen sefer %${k.sonYuzde}`}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => birak(k)}
                aria-label={`${ad} konusunu tekrar listesinden çıkar`}
                title="Tekrar listesinden çıkar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-rehberim-navy/40 transition hover:bg-rehberim-surface hover:text-rehberim-navy"
              >
                <X className="h-4 w-4" strokeWidth={2.6} />
              </button>
            </li>
          );
        })}
      </ul>

      {kalan > 0 && (
        <p className="mt-2.5 text-xs text-rehberim-navy/55">
          Ve {kalan} konu daha — bunları bitirince görünecekler.
        </p>
      )}
    </section>
  );
}
