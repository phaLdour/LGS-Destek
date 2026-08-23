import { leagueOf, rankLabel, type League } from "@/lib/competitive/ranks";

/**
 * Lig arması (nişan) — 5 lig için kalkan biçimli SVG amblem.
 *
 * Kullanıcının tüm zamanlarda ulaştığı en yüksek ligi temsil eder
 * (`comp_profiles.best_tier`). Sezon reseti ile düşmez; profilde,
 * liderlik tablosunda ve maç ekranında avatarın yanında görünür.
 *
 * Tamamen inline SVG: Tailwind gradient sınıfları SVG fill'e
 * uygulanamadığı için renkler hex olarak burada tutulur (ranks.ts'deki
 * lig paletiyle aynı aile). Gradient id'leri lig bazlı ve deterministik;
 * aynı sayfada tekrar eden aynı lig arması aynı tanımı paylaşır.
 */
const CREST_COLORS: Record<
  League["slug"],
  { from: string; to: string; edge: string; motif: string; motifEdge?: string }
> = {
  gelisim: { from: "#34D399", to: "#047857", edge: "#065F46", motif: "#FFFFFF" },
  yukselme: { from: "#FBBF24", to: "#D97706", edge: "#B45309", motif: "#FFFFFF" },
  yildizlar: { from: "#A78BFA", to: "#6D28D9", edge: "#5B21B6", motif: "#FFFFFF" },
  derece: { from: "#F87171", to: "#BE123C", edge: "#9F1239", motif: "#FFFFFF" },
  sampiyonlar: {
    from: "#FDE68A",
    to: "#F59E0B",
    edge: "#B45309",
    motif: "#FFFFFF",
    motifEdge: "#92400E",
  },
};

/** Kalkan dış hattı (viewBox 0 0 64 72). */
const SHIELD =
  "M32 3 L57 12 V36 C57 52 46 63 32 69 C18 63 7 52 7 36 V12 Z";
/** İç kenar vurgusu — aynı kalkan, 4px içeride. */
const SHIELD_INNER =
  "M32 8.5 L52 15.5 V36 C52 49 43.5 58.5 32 63.5 C20.5 58.5 12 49 12 36 V15.5 Z";

function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function Motif({ slug, color, edge }: { slug: League["slug"]; color: string; edge?: string }) {
  const stroke = edge ? { stroke: edge, strokeWidth: 1.2, strokeLinejoin: "round" as const } : {};
  switch (slug) {
    case "gelisim":
      // Blok yukarı ok — "gelişim"
      return (
        <polygon
          points="32,18 47,35 39,35 39,53 25,53 25,35 17,35"
          fill={color}
          {...stroke}
        />
      );
    case "yukselme":
      // Üst üste üç yükselen şerit
      return (
        <g
          fill="none"
          stroke={color}
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 52 L32 41 L45 52" opacity={0.55} />
          <path d="M19 40 L32 29 L45 40" opacity={0.8} />
          <path d="M19 28 L32 17 L45 28" />
        </g>
      );
    case "yildizlar":
      return (
        <g fill={color} {...stroke}>
          <polygon points={starPoints(32, 37, 15, 6.2)} />
          <polygon points={starPoints(16.5, 21, 4.4, 1.8)} opacity={0.85} />
          <polygon points={starPoints(47.5, 21, 4.4, 1.8)} opacity={0.85} />
        </g>
      );
    case "derece":
      // Çapraz iki kılıç
      return (
        <g fill={color} {...stroke}>
          <g transform="rotate(45 32 36)">
            <rect x="29.6" y="14" width="4.8" height="38" rx="2.4" />
            <rect x="23.5" y="42" width="17" height="4.2" rx="2.1" />
          </g>
          <g transform="rotate(-45 32 36)">
            <rect x="29.6" y="14" width="4.8" height="38" rx="2.4" />
            <rect x="23.5" y="42" width="17" height="4.2" rx="2.1" />
          </g>
        </g>
      );
    case "sampiyonlar":
      // Taç (üç sivri, mücevherli) + taban bandı
      return (
        <g>
          <g fill={color} {...stroke}>
            <path d="M15 48 L15 26 L24.5 35.5 L32 19 L39.5 35.5 L49 26 L49 48 Z" />
            <rect x="15" y="50" width="34" height="6" rx="1.8" />
          </g>
          <g fill={edge ?? color} opacity={0.9}>
            <circle cx="15" cy="26" r="2.2" />
            <circle cx="32" cy="19" r="2.6" />
            <circle cx="49" cy="26" r="2.2" />
            <circle cx="32" cy="43" r="2.4" />
          </g>
        </g>
      );
  }
}

export function LeagueCrest({
  tier,
  size = 40,
  className,
  title,
  decorative = false,
}: {
  /** Nişanın temsil ettiği kademe (lig bundan türetilir) */
  tier: number;
  /** Piksel genişliği (yükseklik oranla 72/64) */
  size?: number;
  className?: string;
  /** Tooltip / erişilebilirlik metni; verilmezse lig adı */
  title?: string;
  /** true ise ekran okuyucudan gizlenir (yanında zaten metin varsa) */
  decorative?: boolean;
}) {
  const league = leagueOf(tier);
  const c = CREST_COLORS[league.slug];
  const gradId = `crest-g-${league.slug}`;
  const shineId = `crest-s-${league.slug}`;
  const label = title ?? `${league.name} ligi nişanı (${rankLabel(tier)})`;
  const height = Math.round((size * 72) / 64);

  return (
    <svg
      viewBox="0 0 64 72"
      width={size}
      height={height}
      className={`inline-block shrink-0 drop-shadow-sm ${className ?? ""}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
    >
      {!decorative && <title>{label}</title>}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.34} />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity={0.04} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={SHIELD} fill={`url(#${gradId})`} stroke={c.edge} strokeWidth={1.5} strokeLinejoin="round" />
      <path d={SHIELD} fill={`url(#${shineId})`} />
      <path
        d={SHIELD_INNER}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity={0.45}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Motif slug={league.slug} color={c.motif} edge={c.motifEdge} />
    </svg>
  );
}
