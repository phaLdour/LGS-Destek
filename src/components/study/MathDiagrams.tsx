import type { ReactNode } from "react";

/**
 * Matematik konuları için inline SVG görselleri (server-side, etkileşimsiz).
 * Renkler callout paletiyle uyumludur. Etiketler Türkçe ve sınav odaklıdır.
 */

const NAVY = "#1e293b";
const SLATE = "#64748b";
const GRID = "#e2e8f0";
const BLUE = "#3b82f6";
const GREEN = "#22c55e";
const RED = "#ef4444";
const AMBER = "#f59e0b";
const PURPLE = "#a855f7";
const ORANGE = "#f97316";

function Figure({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card">
      <figcaption className="mb-2 text-sm font-bold text-rehberim-navy">
        {title}
      </figcaption>
      <div className="flex justify-center">{children}</div>
      {caption && (
        <p className="mt-2 text-xs leading-relaxed text-rehberim-navy/60">
          {caption}
        </p>
      )}
    </figure>
  );
}

// ───────────── Cebirsel: (a+b)² kare modeli ─────────────
function IdentitySquare() {
  const x0 = 46;
  const y0 = 16;
  const a = 84;
  const b = 48;
  return (
    <Figure
      title="Özdeşlik şeması: (a + b)²"
      caption="Kenarı (a+b) olan karenin alanı dört parçaya ayrılır: a² + ab + ab + b². Buradan (a+b)² = a² + 2ab + b² çıkar."
    >
      <svg viewBox="0 0 200 170" className="h-auto w-full max-w-[300px]">
        {/* bölgeler */}
        <rect x={x0} y={y0} width={a} height={a} fill="#dbeafe" stroke={NAVY} />
        <rect x={x0 + a} y={y0} width={b} height={a} fill="#dcfce7" stroke={NAVY} />
        <rect x={x0} y={y0 + a} width={a} height={b} fill="#dcfce7" stroke={NAVY} />
        <rect x={x0 + a} y={y0 + a} width={b} height={b} fill="#fef3c7" stroke={NAVY} />
        {/* etiketler */}
        <text x={x0 + a / 2} y={y0 + a / 2 + 5} textAnchor="middle" fontSize="18" fontWeight="bold" fill={BLUE}>a²</text>
        <text x={x0 + a + b / 2} y={y0 + a / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill={GREEN}>ab</text>
        <text x={x0 + a / 2} y={y0 + a + b / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill={GREEN}>ab</text>
        <text x={x0 + a + b / 2} y={y0 + a + b / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill={AMBER}>b²</text>
        {/* kenar uzunlukları */}
        <text x={x0 + a / 2} y={y0 + a + b + 16} textAnchor="middle" fontSize="12" fill={NAVY}>a</text>
        <text x={x0 + a + b / 2} y={y0 + a + b + 16} textAnchor="middle" fontSize="12" fill={NAVY}>b</text>
        <text x={x0 - 12} y={y0 + a / 2 + 4} textAnchor="middle" fontSize="12" fill={NAVY}>a</text>
        <text x={x0 - 12} y={y0 + a + b / 2 + 4} textAnchor="middle" fontSize="12" fill={NAVY}>b</text>
      </svg>
    </Figure>
  );
}

// ───────────── Doğrusal: koordinat sistemi + doğru ─────────────
function mapX(x: number) {
  return 120 + x * 18;
}
function mapY(y: number) {
  return 110 - y * 18;
}

function Axes({ children }: { children?: ReactNode }) {
  const ticks = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
  return (
    <>
      {/* ızgara */}
      {ticks.concat(0).map((t) => (
        <g key={`g${t}`}>
          <line x1={mapX(t)} y1={mapY(-5.5)} x2={mapX(t)} y2={mapY(5.5)} stroke={GRID} />
          <line x1={mapX(-5.5)} y1={mapY(t)} x2={mapX(5.5)} y2={mapY(t)} stroke={GRID} />
        </g>
      ))}
      {/* eksenler */}
      <line x1={mapX(-5.5)} y1={mapY(0)} x2={mapX(5.7)} y2={mapY(0)} stroke={SLATE} strokeWidth="1.5" />
      <line x1={mapX(0)} y1={mapY(-5.5)} x2={mapX(0)} y2={mapY(5.7)} stroke={SLATE} strokeWidth="1.5" />
      <polygon points={`${mapX(5.7)},${mapY(0)} ${mapX(5.4)},${mapY(0.35)} ${mapX(5.4)},${mapY(-0.35)}`} fill={SLATE} />
      <polygon points={`${mapX(0)},${mapY(5.7)} ${mapX(0.35)},${mapY(5.4)} ${mapX(-0.35)},${mapY(5.4)}`} fill={SLATE} />
      <text x={mapX(5.7)} y={mapY(0) + 14} textAnchor="middle" fontSize="11" fill={NAVY}>x</text>
      <text x={mapX(0) - 12} y={mapY(5.6)} textAnchor="middle" fontSize="11" fill={NAVY}>y</text>
      <text x={mapX(0) - 8} y={mapY(0) + 13} textAnchor="middle" fontSize="9" fill={SLATE}>0</text>
      {children}
    </>
  );
}

function CoordinateLine() {
  // y = x + 1
  return (
    <Figure
      title="Koordinat sistemi ve doğru grafiği"
      caption="Her nokta (x, y) ile gösterilir; x apsis, y ordinattır. Örnek doğru: y = x + 1. Doğrusal bir denklemin grafiği her zaman bir doğrudur."
    >
      <svg viewBox="0 0 240 220" className="h-auto w-full max-w-[320px]">
        <Axes>
          <line x1={mapX(-5)} y1={mapY(-4)} x2={mapX(4)} y2={mapY(5)} stroke={ORANGE} strokeWidth="2.5" />
          {[
            [0, 1],
            [2, 3],
          ].map(([x, y]) => (
            <g key={`p${x}`}>
              <circle cx={mapX(x)} cy={mapY(y)} r="3.5" fill={ORANGE} />
              <text x={mapX(x) + 6} y={mapY(y) - 5} fontSize="9" fill={NAVY}>
                ({x},{y})
              </text>
            </g>
          ))}
          <text x={mapX(3.4)} y={mapY(5)} fontSize="10" fontWeight="bold" fill={ORANGE}>y=x+1</text>
        </Axes>
      </svg>
    </Figure>
  );
}

// ───────────── Çizgi (veri) grafiği ─────────────
function LineChart() {
  const data = [
    { l: "Pzt", v: 20 },
    { l: "Sal", v: 35 },
    { l: "Çar", v: 30 },
    { l: "Per", v: 50 },
    { l: "Cum", v: 45 },
  ];
  const x0 = 36;
  const y0 = 20;
  const w = 200;
  const h = 110;
  const max = 60;
  const step = w / (data.length - 1);
  const px = (i: number) => x0 + i * step;
  const py = (v: number) => y0 + h - (v / max) * h;
  const points = data.map((d, i) => `${px(i)},${py(d.v)}`).join(" ");
  return (
    <Figure
      title="Çizgi grafiği"
      caption="Çizgi grafiği, bir değerin zaman içindeki değişimini gösterir. Örnek: günlere göre sıcaklık (°C). Soruda en çok artış/azalış olan aralık sorulabilir."
    >
      <svg viewBox="0 0 250 165" className="h-auto w-full max-w-[330px]">
        {/* eksenler */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + h} stroke={SLATE} strokeWidth="1.5" />
        <line x1={x0} y1={y0 + h} x2={x0 + w} y2={y0 + h} stroke={SLATE} strokeWidth="1.5" />
        {[0, 20, 40, 60].map((g) => (
          <g key={g}>
            <line x1={x0} y1={py(g)} x2={x0 + w} y2={py(g)} stroke={GRID} />
            <text x={x0 - 6} y={py(g) + 3} textAnchor="end" fontSize="8" fill={SLATE}>{g}</text>
          </g>
        ))}
        <polyline points={points} fill="none" stroke={ORANGE} strokeWidth="2.5" />
        {data.map((d, i) => (
          <g key={d.l}>
            <circle cx={px(i)} cy={py(d.v)} r="3" fill={ORANGE} />
            <text x={px(i)} y={y0 + h + 13} textAnchor="middle" fontSize="9" fill={NAVY}>{d.l}</text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

// ───────────── Dönüşüm Geometrisi ─────────────
function miniGrid(): ReactNode {
  const lines = [];
  for (let i = 0; i <= 6; i++) {
    lines.push(<line key={`v${i}`} x1={10 + i * 14} y1={10} x2={10 + i * 14} y2={94} stroke={GRID} />);
    lines.push(<line key={`h${i}`} x1={10} y1={10 + i * 14} x2={94} y2={10 + i * 14} stroke={GRID} />);
  }
  return <>{lines}</>;
}

function Transformations() {
  // orijinal üçgen köşeleri (grid birimi 14px, başlangıç 10,10; y aşağı)
  const tri = (pts: [number, number][], fill: string, stroke: string) => (
    <polygon
      points={pts.map(([x, y]) => `${10 + x * 14},${10 + y * 14}`).join(" ")}
      fill={fill}
      fillOpacity="0.5"
      stroke={stroke}
      strokeWidth="1.5"
    />
  );
  const orig: [number, number][] = [
    [1, 5],
    [2, 2],
    [3, 5],
  ];
  const Panel = ({
    label,
    transformed,
  }: {
    label: string;
    transformed: [number, number][];
  }) => (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 104 104" className="h-auto w-full max-w-[150px]">
        {miniGrid()}
        {tri(orig, "#cbd5e1", SLATE)}
        {tri(transformed, "#fed7aa", ORANGE)}
      </svg>
      <span className="mt-1 text-xs font-bold text-rehberim-navy">{label}</span>
    </div>
  );
  return (
    <Figure
      title="Öteleme · Yansıma · Döndürme"
      caption="Gri üçgen orijinal, turuncu üçgen dönüşüm sonucudur. Üç dönüşümde de şeklin boyutu değişmez; şekiller eş kalır."
    >
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        <Panel
          label="Öteleme (sağa)"
          transformed={[
            [4, 5],
            [5, 2],
            [6, 5],
          ]}
        />
        <Panel
          label="Yansıma (dikey eksen)"
          transformed={[
            [5, 5],
            [4, 2],
            [3, 5],
          ]}
        />
        <Panel
          label="Döndürme (90°)"
          transformed={[
            [1, 1],
            [4, 2],
            [1, 3],
          ]}
        />
      </div>
    </Figure>
  );
}

// ───────────── Üçgenler ─────────────
function TriangleAngles() {
  return (
    <Figure
      title="Üçgende iç açılar"
      caption="Bir üçgenin iç açıları toplamı her zaman 180°'dir: 50° + 60° + 70° = 180°."
    >
      <svg viewBox="0 0 200 150" className="h-auto w-full max-w-[280px]">
        <polygon points="30,120 175,120 70,30" fill="#dbeafe" stroke={NAVY} strokeWidth="2" />
        <text x="48" y="113" fontSize="12" fontWeight="bold" fill={RED}>50°</text>
        <text x="150" y="113" fontSize="12" fontWeight="bold" fill={RED}>60°</text>
        <text x="68" y="50" fontSize="12" fontWeight="bold" fill={RED}>70°</text>
        <text x="92" y="138" fontSize="10" fill={SLATE}>taban</text>
      </svg>
    </Figure>
  );
}

function RightTriangle() {
  return (
    <Figure
      title="Dik üçgen ve Pisagor (3-4-5)"
      caption="Dik üçgende a² + b² = c². Dik kenarlar 3 ve 4 ise hipotenüs √(9+16)=√25=5'tir. Köşedeki küçük kare dik açıyı gösterir."
    >
      <svg viewBox="0 0 200 160" className="h-auto w-full max-w-[260px]">
        <polygon points="40,130 160,130 40,40" fill="#dcfce7" stroke={NAVY} strokeWidth="2" />
        {/* dik açı işareti */}
        <rect x="40" y="118" width="12" height="12" fill="none" stroke={NAVY} strokeWidth="1.5" />
        <text x="20" y="90" fontSize="13" fontWeight="bold" fill={GREEN}>3</text>
        <text x="95" y="146" fontSize="13" fontWeight="bold" fill={GREEN}>4</text>
        <text x="108" y="80" fontSize="13" fontWeight="bold" fill={ORANGE}>5</text>
        <text x="112" y="95" fontSize="9" fill={SLATE}>(hipotenüs)</text>
      </svg>
    </Figure>
  );
}

// ───────────── Geometrik Cisimler ─────────────
function Prism() {
  return (
    <Figure
      title="Dikdörtgenler prizması"
      caption="Hacim = taban alanı × yükseklik = a · b · c. Örnek: 2 · 3 · 4 = 24 cm³."
    >
      <svg viewBox="0 0 200 150" className="h-auto w-full max-w-[260px]">
        <polygon points="30,50 130,50 130,120 30,120" fill="#dbeafe" stroke={NAVY} strokeWidth="1.8" />
        <polygon points="30,50 60,25 160,25 130,50" fill="#bfdbfe" stroke={NAVY} strokeWidth="1.8" />
        <polygon points="130,50 160,25 160,95 130,120" fill="#93c5fd" stroke={NAVY} strokeWidth="1.8" />
        <text x="78" y="138" fontSize="12" fontWeight="bold" fill={NAVY}>a</text>
        <text x="150" y="78" fontSize="12" fontWeight="bold" fill={NAVY}>c</text>
        <text x="100" y="42" fontSize="12" fontWeight="bold" fill={NAVY}>b</text>
      </svg>
    </Figure>
  );
}

function Cube() {
  return (
    <Figure
      title="Küp"
      caption="Tüm ayrıtları eşittir. Hacim = a³, yüzey sayısı 6'dır. Örnek: a=3 ise hacim 27 cm³."
    >
      <svg viewBox="0 0 160 150" className="h-auto w-full max-w-[200px]">
        <polygon points="30,55 100,55 100,125 30,125" fill="#dcfce7" stroke={NAVY} strokeWidth="1.8" />
        <polygon points="30,55 60,30 130,30 100,55" fill="#bbf7d0" stroke={NAVY} strokeWidth="1.8" />
        <polygon points="100,55 130,30 130,100 100,125" fill="#86efac" stroke={NAVY} strokeWidth="1.8" />
        <text x="62" y="143" fontSize="12" fontWeight="bold" fill={NAVY}>a</text>
        <text x="118" y="82" fontSize="12" fontWeight="bold" fill={NAVY}>a</text>
        <text x="95" y="47" fontSize="12" fontWeight="bold" fill={NAVY}>a</text>
      </svg>
    </Figure>
  );
}

function Cylinder() {
  return (
    <Figure
      title="Dik silindir"
      caption="Hacim = π·r²·h, yüzey alanı = 2πr² + 2πrh. r yarıçap, h yüksekliktir. Örnek (π=3): r=5, h=10 → 3·25·10 = 750 cm³."
    >
      <svg viewBox="0 0 160 170" className="h-auto w-full max-w-[200px]">
        <ellipse cx="80" cy="35" rx="45" ry="16" fill="#fed7aa" stroke={NAVY} strokeWidth="1.8" />
        <line x1="35" y1="35" x2="35" y2="130" stroke={NAVY} strokeWidth="1.8" />
        <line x1="125" y1="35" x2="125" y2="130" stroke={NAVY} strokeWidth="1.8" />
        <path d="M35 130 A45 16 0 0 0 125 130" fill="none" stroke={NAVY} strokeWidth="1.8" />
        <path d="M35 130 A45 16 0 0 1 125 130" fill="none" stroke={NAVY} strokeWidth="1.8" strokeDasharray="3 3" opacity="0.5" />
        {/* yarıçap */}
        <line x1="80" y1="35" x2="125" y2="35" stroke={RED} strokeWidth="1.8" />
        <circle cx="80" cy="35" r="2.5" fill={RED} />
        <text x="98" y="29" fontSize="11" fontWeight="bold" fill={RED}>r</text>
        {/* yükseklik */}
        <line x1="140" y1="35" x2="140" y2="130" stroke={BLUE} strokeWidth="1.5" />
        <text x="145" y="86" fontSize="11" fontWeight="bold" fill={BLUE}>h</text>
      </svg>
    </Figure>
  );
}

// ───────────── Veri Analizi ─────────────
function BarChart() {
  const data = [
    { l: "A", v: 4 },
    { l: "B", v: 6 },
    { l: "C", v: 3 },
    { l: "D", v: 8 },
  ];
  const x0 = 34;
  const y0 = 14;
  const h = 110;
  const max = 8;
  const bw = 28;
  const gap = 16;
  return (
    <Figure
      title="Sütun grafiği"
      caption="Kategorileri karşılaştırmak için kullanılır. Çubuğun yüksekliği değeri gösterir."
    >
      <svg viewBox="0 0 220 155" className="h-auto w-full max-w-[300px]">
        <line x1={x0} y1={y0} x2={x0} y2={y0 + h} stroke={SLATE} strokeWidth="1.5" />
        <line x1={x0} y1={y0 + h} x2={200} y2={y0 + h} stroke={SLATE} strokeWidth="1.5" />
        {[0, 2, 4, 6, 8].map((g) => (
          <g key={g}>
            <line x1={x0} y1={y0 + h - (g / max) * h} x2={200} y2={y0 + h - (g / max) * h} stroke={GRID} />
            <text x={x0 - 6} y={y0 + h - (g / max) * h + 3} textAnchor="end" fontSize="8" fill={SLATE}>{g}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const bx = x0 + 14 + i * (bw + gap);
          const bh = (d.v / max) * h;
          return (
            <g key={d.l}>
              <rect x={bx} y={y0 + h - bh} width={bw} height={bh} fill={BLUE} rx="2" />
              <text x={bx + bw / 2} y={y0 + h + 13} textAnchor="middle" fontSize="10" fill={NAVY}>{d.l}</text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const [x1, y1] = polar(cx, cy, r, end);
  const [x2, y2] = polar(cx, cy, r, start);
  const large = end - start > 180 ? 1 : 0;
  return `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${large} 0 ${x2} ${y2} Z`;
}

function PieChart() {
  const slices = [
    { l: "%50", deg: 180, color: BLUE },
    { l: "%30", deg: 108, color: GREEN },
    { l: "%20", deg: 72, color: AMBER },
  ];
  const cx = 70;
  const cy = 75;
  const r = 55;
  let acc = 0;
  return (
    <Figure
      title="Daire grafiği"
      caption="Bir bütünün parçalara (yüzde) dağılımını gösterir. Tüm dilimlerin toplamı %100'dür."
    >
      <svg viewBox="0 0 200 160" className="h-auto w-full max-w-[280px]">
        {slices.map((s, i) => {
          const start = acc;
          const end = acc + s.deg;
          acc = end;
          const [lx, ly] = polar(cx, cy, r * 0.6, (start + end) / 2);
          return (
            <g key={i}>
              <path d={arc(cx, cy, r, start, end)} fill={s.color} stroke="#fff" strokeWidth="2" />
              <text x={lx} y={ly + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{s.l}</text>
            </g>
          );
        })}
        {/* açıklama */}
        {slices.map((s, i) => (
          <g key={`k${i}`}>
            <rect x={150} y={45 + i * 22} width="12" height="12" fill={s.color} rx="2" />
            <text x={168} y={55 + i * 22} fontSize="10" fill={NAVY}>{s.l}</text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

// ───────────── Fen: Basit Makineler ─────────────
function Lever() {
  return (
    <Figure
      title="Kaldıraç"
      caption="Denge kuralı: Yük × yük kolu = Kuvvet × kuvvet kolu. Destek noktasına olan uzaklıklar (kollar) avantajı belirler."
    >
      <svg viewBox="0 0 230 150" className="h-auto w-full max-w-[300px]">
        <line x1="20" y1="85" x2="210" y2="85" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
        <polygon points="115,85 103,118 127,118" fill={SLATE} />
        <text x="115" y="132" textAnchor="middle" fontSize="10" fill={NAVY}>destek</text>
        <rect x="28" y="58" width="28" height="24" fill={BLUE} rx="2" />
        <text x="42" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill={BLUE}>Yük</text>
        <line x1="185" y1="48" x2="185" y2="80" stroke={ORANGE} strokeWidth="2.5" />
        <polygon points="185,84 181,76 189,76" fill={ORANGE} />
        <text x="185" y="42" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ORANGE}>Kuvvet</text>
      </svg>
    </Figure>
  );
}

function InclinedPlane() {
  return (
    <Figure
      title="Eğik düzlem"
      caption="Gereken kuvvet azalır ama yol uzar. F = (G × h) ÷ ℓ. Rampa uzadıkça (eğim azaldıkça) kuvvet azalır."
    >
      <svg viewBox="0 0 230 150" className="h-auto w-full max-w-[300px]">
        <polygon points="25,120 195,120 25,40" fill="#dbeafe" stroke={NAVY} strokeWidth="2" />
        <rect x="60" y="78" width="22" height="22" fill={BLUE} rx="2" transform="rotate(-25 71 89)" />
        <line x1="120" y1="40" x2="120" y2="120" stroke={GREEN} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="128" y="85" fontSize="11" fontWeight="bold" fill={GREEN}>h</text>
        <text x="95" y="92" fontSize="11" fontWeight="bold" fill={ORANGE}>ℓ</text>
        <line x1="92" y1="70" x2="70" y2="80" stroke={ORANGE} strokeWidth="2.5" />
        <polygon points="66,82 75,80 73,73" fill={ORANGE} />
        <text x="100" y="135" textAnchor="middle" fontSize="9" fill={SLATE}>taban (yol)</text>
      </svg>
    </Figure>
  );
}

function Pulleys() {
  return (
    <Figure
      title="Makaralar"
      caption="Sabit makara yalnız kuvvetin yönünü değiştirir (Kuvvet = Yük). Hareketli makara kuvvetten kazanç sağlar (Kuvvet = Yük ÷ 2)."
    >
      <div className="grid w-full grid-cols-2 gap-3">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 110 130" className="h-auto w-full max-w-[140px]">
            <line x1="20" y1="18" x2="90" y2="18" stroke={NAVY} strokeWidth="3" />
            <circle cx="55" cy="40" r="18" fill="#fed7aa" stroke={NAVY} strokeWidth="2" />
            <circle cx="55" cy="40" r="3" fill={NAVY} />
            <line x1="37" y1="40" x2="37" y2="95" stroke={SLATE} strokeWidth="2" />
            <rect x="27" y="95" width="20" height="18" fill={BLUE} rx="2" />
            <line x1="73" y1="40" x2="73" y2="80" stroke={ORANGE} strokeWidth="2" />
            <polygon points="73,84 69,76 77,76" fill={ORANGE} />
          </svg>
          <span className="mt-1 text-xs font-bold text-rehberim-navy">Sabit makara</span>
        </div>
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 110 130" className="h-auto w-full max-w-[140px]">
            <line x1="20" y1="18" x2="90" y2="18" stroke={NAVY} strokeWidth="3" />
            <line x1="38" y1="18" x2="45" y2="70" stroke={SLATE} strokeWidth="2" />
            <line x1="72" y1="18" x2="65" y2="70" stroke={ORANGE} strokeWidth="2" />
            <polygon points="72,16 68,24 76,24" fill={ORANGE} />
            <circle cx="55" cy="80" r="18" fill="#fed7aa" stroke={NAVY} strokeWidth="2" />
            <circle cx="55" cy="80" r="3" fill={NAVY} />
            <rect x="45" y="98" width="20" height="18" fill={BLUE} rx="2" />
          </svg>
          <span className="mt-1 text-xs font-bold text-rehberim-navy">Hareketli makara</span>
        </div>
      </div>
    </Figure>
  );
}

// ───────────── Fen: Mevsimler ve İklim ─────────────
function SeasonsOrbit() {
  return (
    <Figure
      title="Eksen eğikliği ve Güneş"
      caption="Dünya'nın ekseni 23,5° eğiktir ve Güneş etrafında dolanır. Eğiklik, ışınların düşme açısını değiştirerek mevsimleri oluşturur (uzaklık değil!)."
    >
      <svg viewBox="0 0 240 150" className="h-auto w-full max-w-[320px]">
        <circle cx="45" cy="75" r="28" fill="#fde68a" stroke={AMBER} strokeWidth="2" />
        <text x="45" y="79" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Güneş</text>
        {[60, 75, 90].map((y, i) => (
          <g key={i}>
            <line x1="75" y1={y} x2="160" y2={y} stroke={AMBER} strokeWidth="1.5" />
            <polygon points={`164,${y} 156,${y - 4} 156,${y + 4}`} fill={AMBER} />
          </g>
        ))}
        <circle cx="190" cy="75" r="30" fill="#bfdbfe" stroke={NAVY} strokeWidth="2" />
        {/* eğik eksen */}
        <line x1="178" y1="40" x2="202" y2="110" stroke={RED} strokeWidth="2.5" />
        <text x="205" y="42" fontSize="10" fontWeight="bold" fill={RED}>23,5°</text>
        <line x1="160" y1="75" x2="220" y2="75" stroke={SLATE} strokeWidth="1" strokeDasharray="2 2" />
        <text x="190" y="120" textAnchor="middle" fontSize="9" fill={SLATE}>Dünya</text>
      </svg>
    </Figure>
  );
}

function SunRays() {
  const ray = (x: number, y2: number, slant: number) => (
    <g>
      <line x1={x + slant} y1="20" x2={x} y2={y2} stroke={AMBER} strokeWidth="2" />
      <polygon points={`${x},${y2} ${x - 4},${y2 - 7} ${x + 4},${y2 - 7}`} fill={AMBER} />
    </g>
  );
  return (
    <Figure
      title="Işınların düşme açısı"
      caption="Dik gelen ışınlar dar alana düşer, enerji yoğundur (yaz). Eğik gelen ışınlar geniş alana yayılır, enerji azalır (kış)."
    >
      <svg viewBox="0 0 240 140" className="h-auto w-full max-w-[320px]">
        <line x1="10" y1="110" x2="230" y2="110" stroke={NAVY} strokeWidth="2" />
        {/* dik */}
        {[40, 55, 70].map((x) => ray(x, 108, 0))}
        <rect x="36" y="108" width="38" height="5" fill={ORANGE} />
        <text x="55" y="128" textAnchor="middle" fontSize="9" fill={NAVY}>Dik (Yaz)</text>
        {/* eğik */}
        {[150, 170, 190].map((x) => ray(x, 108, 30))}
        <rect x="140" y="108" width="70" height="5" fill="#fdba74" />
        <text x="175" y="128" textAnchor="middle" fontSize="9" fill={NAVY}>Eğik (Kış)</text>
      </svg>
    </Figure>
  );
}

// ───────────── Fen: DNA ─────────────
function DnaHierarchy() {
  const items = [
    { l: "Kromozom", c: "#1e293b" },
    { l: "DNA", c: "#334155" },
    { l: "Gen", c: "#475569" },
    { l: "Nükleotit", c: "#64748b" },
  ];
  return (
    <Figure
      title="Kalıtsal yapıların hiyerarşisi"
      caption="Büyükten küçüğe: Kromozom > DNA > Gen > Nükleotit. Kromozom en karmaşık, nükleotit en küçük yapı birimidir."
    >
      <svg viewBox="0 0 240 90" className="h-auto w-full max-w-[320px]">
        {items.map((it, i) => {
          const x = 6 + i * 58;
          return (
            <g key={it.l}>
              <rect x={x} y="28" width="48" height="34" rx="6" fill={it.c} />
              <text x={x + 24} y="49" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">{it.l}</text>
              {i < items.length - 1 && (
                <text x={x + 52} y="49" textAnchor="middle" fontSize="14" fill={SLATE}>›</text>
              )}
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

function DnaPairing() {
  const rungs = [
    { y: 30, left: "A", right: "T", c: BLUE },
    { y: 55, left: "T", right: "A", c: BLUE },
    { y: 80, left: "G", right: "C", c: GREEN },
    { y: 105, left: "C", right: "G", c: GREEN },
  ];
  return (
    <Figure
      title="DNA eşleşme kuralı (A–T, G–C)"
      caption="DNA çift zincirlidir. Bazlar karşılıklı eşleşir: Adenin–Timin (A–T) ve Guanin–Sitozin (G–C)."
    >
      <svg viewBox="0 0 200 140" className="h-auto w-full max-w-[240px]">
        <line x1="55" y1="18" x2="55" y2="120" stroke={SLATE} strokeWidth="3" />
        <line x1="145" y1="18" x2="145" y2="120" stroke={SLATE} strokeWidth="3" />
        {rungs.map((r) => (
          <g key={r.y}>
            <line x1="58" y1={r.y} x2="142" y2={r.y} stroke={r.c} strokeWidth="2" />
            <circle cx="74" cy={r.y} r="11" fill={r.c} />
            <text x="74" y={r.y + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{r.left}</text>
            <circle cx="126" cy={r.y} r="11" fill={r.c} opacity="0.7" />
            <text x="126" y={r.y + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{r.right}</text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}

// ───────────── Fen: Elektrik ─────────────
function Charges() {
  return (
    <Figure
      title="Elektrik yükleri"
      caption="Aynı cins yükler birbirini iter, zıt cins yükler birbirini çeker."
    >
      <svg viewBox="0 0 240 120" className="h-auto w-full max-w-[320px]">
        {/* iter */}
        <circle cx="40" cy="45" r="16" fill={RED} />
        <text x="40" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">+</text>
        <circle cx="100" cy="45" r="16" fill={RED} />
        <text x="100" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">+</text>
        <line x1="58" y1="45" x2="44" y2="45" stroke={NAVY} strokeWidth="2" />
        <polygon points="40,45 48,41 48,49" fill={NAVY} />
        <line x1="82" y1="45" x2="96" y2="45" stroke={NAVY} strokeWidth="2" />
        <polygon points="100,45 92,41 92,49" fill={NAVY} />
        <text x="70" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill={NAVY}>İter</text>
        {/* çeker */}
        <circle cx="160" cy="45" r="16" fill={RED} />
        <text x="160" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">+</text>
        <circle cx="220" cy="45" r="16" fill={BLUE} />
        <text x="220" y="51" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">−</text>
        <line x1="178" y1="45" x2="192" y2="45" stroke={NAVY} strokeWidth="2" />
        <polygon points="196,45 188,41 188,49" fill={NAVY} />
        <line x1="202" y1="45" x2="188" y2="45" stroke={NAVY} strokeWidth="2" />
        <text x="190" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill={NAVY}>Çeker</text>
      </svg>
    </Figure>
  );
}

function Circuit() {
  return (
    <Figure
      title="Basit elektrik devresi"
      caption="Pilden gelen elektrik enerjisi kapalı devrede ampulde ışık (ve ısı) enerjisine dönüşür."
    >
      <svg viewBox="0 0 200 130" className="h-auto w-full max-w-[260px]">
        <rect x="30" y="25" width="140" height="80" rx="6" fill="none" stroke={NAVY} strokeWidth="2.5" />
        {/* pil */}
        <line x1="85" y1="105" x2="85" y2="118" stroke={NAVY} strokeWidth="2" />
        <rect x="78" y="100" width="2" height="14" fill={NAVY} />
        <line x1="115" y1="105" x2="115" y2="113" stroke={NAVY} strokeWidth="4" />
        <text x="100" y="100" textAnchor="middle" fontSize="9" fill={SLATE}>pil</text>
        {/* ampul */}
        <circle cx="100" cy="25" r="14" fill="#fef9c3" stroke={AMBER} strokeWidth="2" />
        <line x1="93" y1="19" x2="107" y2="31" stroke={AMBER} strokeWidth="1.5" />
        <line x1="107" y1="19" x2="93" y2="31" stroke={AMBER} strokeWidth="1.5" />
        <text x="100" y="10" textAnchor="middle" fontSize="9" fill={SLATE}>ampul</text>
      </svg>
    </Figure>
  );
}

// ───────────── Dağıtıcı ─────────────
const DIAGRAMS: Record<string, Record<string, ReactNode>> = {
  matematik: {
    "cebirsel-ifadeler": <IdentitySquare />,
    "dogrusal-denklemler": (
      <>
        <CoordinateLine />
        <LineChart />
      </>
    ),
    "donusum-geometrisi": <Transformations />,
    ucgenler: (
      <>
        <TriangleAngles />
        <RightTriangle />
      </>
    ),
    "geometrik-cisimler": (
      <>
        <Prism />
        <Cube />
        <Cylinder />
      </>
    ),
    "veri-analizi": (
      <>
        <BarChart />
        <LineChart />
        <PieChart />
      </>
    ),
  },
  "fen-bilimleri": {
    "basit-makineler": (
      <>
        <Lever />
        <InclinedPlane />
        <Pulleys />
      </>
    ),
    "mevsimler-ve-iklim": (
      <>
        <SeasonsOrbit />
        <SunRays />
      </>
    ),
    "dna-ve-genetik-kod": (
      <>
        <DnaHierarchy />
        <DnaPairing />
      </>
    ),
    "elektrik-yukleri-ve-enerjisi": (
      <>
        <Charges />
        <Circuit />
      </>
    ),
  },
};

export function hasTopicDiagrams(subject: string, topic: string): boolean {
  return Boolean(DIAGRAMS[subject]?.[topic]);
}

export function TopicDiagrams({
  subject,
  topic,
}: {
  subject: string;
  topic: string;
}) {
  const figures = DIAGRAMS[subject]?.[topic];
  if (!figures) return null;
  return <div className="grid gap-4 sm:grid-cols-2">{figures}</div>;
}

