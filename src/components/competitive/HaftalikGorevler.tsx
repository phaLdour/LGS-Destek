"use client";

import { useCallback, useEffect, useState } from "react";
import { CalendarCheck, Check, Gift, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { baykusaSoyle } from "@/lib/baykus";

type Gorev = {
  gorev: string;
  ilerleme: number;
  hedef: number;
  odul: number;
  alindi: boolean;
};

const GOREV_ADI: Record<string, { ad: string; aciklama: string }> = {
  "uc-mac": { ad: "3 maç bitir", aciklama: "Bu hafta 3 ranklı düello tamamla" },
  "yuz-soru": { ad: "100 soru çöz", aciklama: "Sitede toplam 100 soru cevapla" },
  "bes-gun": { ad: "5 gün çalış", aciklama: "Haftanın 5 farklı gününde çalış" },
};

/**
 * Haftalık görevler kartı (rekabet lobisi).
 * İlerleme ve ödül doğrulaması tamamen sunucuda (comp_weekly_progress /
 * comp_claim_weekly). SQL henüz kurulmamışsa kart kendini sessizce gizler.
 */
export function HaftalikGorevler() {
  const [gorevler, setGorevler] = useState<Gorev[] | null>(null);
  const [gizli, setGizli] = useState(false);
  const [talep, setTalep] = useState<string | null>(null);

  const yukle = useCallback(async () => {
    const { data, error } = await createClient().rpc("comp_weekly_progress");
    if (error) {
      setGizli(true); // fonksiyon yok (kurulum sona bırakıldı) → kart görünmez
      return;
    }
    setGorevler((data ?? []) as Gorev[]);
  }, []);

  useEffect(() => {
    void yukle();
  }, [yukle]);

  async function odulAl(gorev: string, odul: number) {
    if (talep) return;
    setTalep(gorev);
    try {
      const { data, error } = await createClient().rpc("comp_claim_weekly", {
        p_gorev: gorev,
      });
      const sonuc = data as { ok?: boolean } | null;
      if (!error && sonuc?.ok) {
        baykusaSoyle({
          ruhHali: "mutlu",
          mesaj: `Görev tamam! +${odul} lig puanı 🏆`,
        });
      }
      await yukle();
    } finally {
      setTalep(null);
    }
  }

  if (gizli || gorevler === null || gorevler.length === 0) return null;

  return (
    <section className="ring-hairline mt-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rehberim-accent/15 text-rehberim-accent-deep ring-1 ring-rehberim-accent/20">
          <CalendarCheck className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-extrabold tracking-tight text-rehberim-navy">
            Haftalık görevler
          </h2>
          <p className="text-xs text-rehberim-navy/55">
            Pazartesi sıfırlanır · ödüller lig puanı olarak eklenir
          </p>
        </div>
      </div>

      <ul className="grid gap-2 sm:grid-cols-3">
        {gorevler.map((g) => {
          const meta = GOREV_ADI[g.gorev] ?? { ad: g.gorev, aciklama: "" };
          const tamam = g.ilerleme >= g.hedef;
          const yuzde = Math.min(100, Math.round((g.ilerleme / g.hedef) * 100));
          return (
            <li
              key={g.gorev}
              className={`rounded-xl border p-3 ${
                g.alindi
                  ? "border-green-200 bg-green-50"
                  : "border-rehberim-border bg-rehberim-muted/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[13px] font-extrabold text-rehberim-navy">
                  {meta.ad}
                </p>
                <span className="shrink-0 rounded-md bg-rehberim-accent/15 px-1.5 py-0.5 text-[10px] font-extrabold text-rehberim-accent-deep">
                  +{g.odul}p
                </span>
              </div>
              <p className="mt-0.5 text-[11px] leading-snug text-rehberim-navy/55">
                {meta.aciklama}
              </p>

              {g.alindi ? (
                <p className="mt-2 flex items-center gap-1 text-xs font-extrabold text-green-700">
                  <Check className="h-3.5 w-3.5" />
                  Ödül alındı
                </p>
              ) : tamam ? (
                <button
                  type="button"
                  onClick={() => odulAl(g.gorev, g.odul)}
                  disabled={talep !== null}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-rehberim-navy px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-rehberim-navy-light disabled:opacity-50"
                >
                  {talep === g.gorev ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Gift className="h-3.5 w-3.5" />
                  )}
                  Ödülü al
                </button>
              ) : (
                <div className="mt-2">
                  <div className="mb-1 flex justify-between text-[10px] font-bold tabular-nums text-rehberim-navy/50">
                    <span>
                      {g.ilerleme}/{g.hedef}
                    </span>
                    <span>%{yuzde}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-rehberim-navy/10">
                    <div
                      className="h-full rounded-full bg-rehberim-accent transition-all duration-500 ease-smooth"
                      style={{ width: `${Math.max(3, yuzde)}%` }}
                    />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
