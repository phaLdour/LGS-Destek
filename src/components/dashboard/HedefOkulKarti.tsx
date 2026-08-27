import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { OkulGorseli } from "@/components/okullar/OkulGorseli";
import {
  REFERANS_YIL,
  guncelYuzdelikYili,
  okulBul,
  okulTamAd,
} from "@/content/okullar";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

const sayi = (v: number) => v.toFixed(2).replace(".", ",");

/**
 * Dashboard'daki hedef okul kartı.
 *
 * Öğrenci okul taramadan "Hedefim yap" dediyse görünür: okulun taban
 * puanı + yüzdelik dilimi ve öğrencinin son TAM denemesindeki neti yan
 * yana. Bilerek "şu kadar puanın eksik" DENMİYOR: elimizde ders bazlı
 * net dağılımı yok, katsayısız puan tahmini yanıltıcı olur. Bunun yerine
 * gerçek sayılar yan yana konur, hesap için puan hesaplayıcıya yönlenir.
 */
export async function HedefOkulKarti() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const hedefId = typeof meta.hedef_okul_id === "string" ? meta.hedef_okul_id : null;
  if (!hedefId) return null;
  const okul = okulBul(hedefId);
  if (!okul) return null; // okul listeden kalkmışsa kart sessizce gizlenir

  // Son TAM deneme neti (varsa) — sözel/sayısal kısmî denemeler kıyasa girmez
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_results")
    .select("correct_count, wrong_count, created_at")
    .eq("subject_slug", "__deneme_tam__")
    .order("created_at", { ascending: false })
    .limit(1);
  const sonDeneme = data?.[0]
    ? Math.max(0, data[0].correct_count - data[0].wrong_count / 3)
    : null;

  const taban = okul.puanlar[REFERANS_YIL]?.taban ?? null;
  const yYil = guncelYuzdelikYili(okul);
  const yuzdelik = yYil ? okul.puanlar[yYil]?.yuzdelik : null;

  return (
    <Link
      href={`/okullar/${okul.id}`}
      className="group ring-hairline mt-4 flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-accent/30 bg-white p-4 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-accent/50 hover:shadow-soft"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <OkulGorseli id={okul.id} tur={okul.tur} className="h-full w-full" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-accent-deep">
          <Target className="h-3.5 w-3.5" />
          Hedefin
        </p>
        <p className="truncate text-[15px] font-extrabold tracking-tight text-rehberim-navy">
          {okulTamAd(okul)}
        </p>
        <p className="mt-0.5 text-xs tabular-nums text-rehberim-navy/60">
          {taban != null && (
            <>
              {REFERANS_YIL} taban{" "}
              <strong className="font-bold text-rehberim-navy">{sayi(taban)}</strong>
            </>
          )}
          {yuzdelik != null && <> · ilk %{sayi(yuzdelik)}</>}
          {sonDeneme != null && (
            <>
              {" "}· son tam denemende{" "}
              <strong className="font-bold text-rehberim-navy">
                {sonDeneme.toFixed(1)} net
              </strong>
            </>
          )}
          {sonDeneme == null && <> · tam deneme çözünce netin de burada görünür</>}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 shrink-0 text-rehberim-navy/30 transition-transform duration-300 ease-snap group-hover:translate-x-1 group-hover:text-rehberim-accent-deep" />
    </Link>
  );
}
