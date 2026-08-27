import { TrendingUp } from "lucide-react";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

/**
 * Deneme gelişim grafiği — öğrencinin son denemelerindeki NET eğilimi.
 *
 * Veri: quiz_results'taki `__deneme_*__` kayıtları (tür + tarih + doğru/yanlış).
 * Net = Doğru − Yanlış/3 (LGS kuralı). Tahmini PUAN bilerek çizilmiyor:
 * kayıtlarda ders dağılımı yok, katsayısız puan tahmini yanıltıcı olurdu.
 *
 * Görsel dil WeeklyChart ile aynı ailede: kart, navy metin, accent vurgu.
 * SVG tamamen oransal — dark modda da tema değişkenleriyle uyumlu
 * (çizgi/nokta renkleri Tailwind sınıfı yerine currentColor + accent hex,
 * yazılar text-rehberim-navy ailesinden, global dark override'lar işler).
 */

/** Grafik altındaki tek harfli tür işareti. */
const TUR_KISA: Record<string, string> = {
  sozel: "S",
  sayisal: "Y", // "saYısal" — S ile karışmasın
  tam: "T",
};

type Nokta = {
  net: number;
  toplam: number;
  tur: string;
  tarih: Date;
};

export async function DenemeGelisimi() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();

  const { data } = await supabase
    .from("quiz_results")
    .select("subject_slug, correct_count, wrong_count, total_questions, created_at")
    .like("subject_slug", "\\_\\_deneme\\_%")
    .order("created_at", { ascending: true })
    .limit(60);

  const noktalar: Nokta[] = (data ?? [])
    .map((r) => {
      const tur = r.subject_slug.replace(/^__deneme_/, "").replace(/__$/, "");
      return {
        net: Math.max(0, r.correct_count - r.wrong_count / 3),
        toplam: r.total_questions,
        tur,
        tarih: new Date(r.created_at),
      };
    })
    .slice(-12); // son 12 deneme

  // Tek deneme bir eğilim değildir; grafik 2+ denemede anlam kazanır.
  if (noktalar.length < 2) return null;

  const W = 560;
  const H = 150;
  const PAD = { sol: 34, sag: 12, ust: 12, alt: 24 };
  const maxNet = Math.max(20, ...noktalar.map((n) => n.toplam * 1)); // eksen: deneme büyüklüğü
  const x = (i: number) =>
    PAD.sol + (i * (W - PAD.sol - PAD.sag)) / Math.max(1, noktalar.length - 1);
  const y = (net: number) =>
    PAD.ust + (1 - net / maxNet) * (H - PAD.ust - PAD.alt);

  const yol = noktalar
    .map((n, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(n.net).toFixed(1)}`)
    .join(" ");
  const son = noktalar[noktalar.length - 1];
  const ilk = noktalar[0];
  const fark = son.net - ilk.net;

  return (
    <section className="ring-hairline mt-6 rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="mb-1 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-rehberim-navy">
          <TrendingUp className="h-4 w-4 text-rehberim-accent" />
          Deneme gelişimin
        </h3>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold tabular-nums ${
            fark >= 0
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {fark >= 0 ? "+" : ""}
          {fark.toFixed(1)} net
        </span>
      </div>
      <p className="mb-3 text-xs text-rehberim-navy/55">
        Son {noktalar.length} denemendeki net eğilimin (Net = D − Y/3)
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Deneme netleri: ilk ${ilk.net.toFixed(1)}, son ${son.net.toFixed(1)}`}
      >
        {/* yatay kılavuzlar: 0, yarı, tam */}
        {[0, 0.5, 1].map((t) => {
          const gy = PAD.ust + (1 - t) * (H - PAD.ust - PAD.alt);
          return (
            <g key={t}>
              <line
                x1={PAD.sol}
                x2={W - PAD.sag}
                y1={gy}
                y2={gy}
                stroke="currentColor"
                className="text-rehberim-navy/10"
                strokeWidth="1"
              />
              <text
                x={PAD.sol - 6}
                y={gy + 3.5}
                textAnchor="end"
                fontSize="10"
                fontWeight="600"
                fill="currentColor"
                className="text-rehberim-navy/45"
              >
                {Math.round(t * maxNet)}
              </text>
            </g>
          );
        })}

        {/* çizgi */}
        <path
          d={yol}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* noktalar + tür etiketi */}
        {noktalar.map((n, i) => (
          <g key={i}>
            <circle
              cx={x(i)}
              cy={y(n.net)}
              r={i === noktalar.length - 1 ? 5 : 3.5}
              fill="#F59E0B"
              stroke="currentColor"
              className="text-white"
              strokeWidth="1.5"
            />
            <text
              x={x(i)}
              y={H - 8}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="currentColor"
              className="text-rehberim-navy/40"
            >
              {TUR_KISA[n.tur] ?? "?"}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-2 text-[11px] text-rehberim-navy/45">
        S: Sözel · Y: Sayısal · T: Tam deneme — büyük nokta son denemen.
      </p>
    </section>
  );
}
