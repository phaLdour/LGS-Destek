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

// ───────────── Dağıtıcı ─────────────
export const DIAGRAM_TOPICS = [
  "cebirsel-ifadeler",
  "dogrusal-denklemler",
  "donusum-geometrisi",
  "ucgenler",
  "geometrik-cisimler",
  "veri-analizi",
];

export function TopicDiagrams({ topic }: { topic: string }) {
  let figures: ReactNode = null;
  if (topic === "cebirsel-ifadeler") figures = <IdentitySquare />;
  else if (topic === "dogrusal-denklemler")
    figures = (
      <>
        <CoordinateLine />
        <LineChart />
      </>
    );
  else if (topic === "donusum-geometrisi") figures = <Transformations />;
  else if (topic === "ucgenler")
    figures = (
      <>
        <TriangleAngles />
        <RightTriangle />
      </>
    );
  else if (topic === "geometrik-cisimler")
    figures = (
      <>
        <Prism />
        <Cube />
        <Cylinder />
      </>
    );
  else if (topic === "veri-analizi")
    figures = (
      <>
        <BarChart />
        <LineChart />
        <PieChart />
      </>
    );

  if (!figures) return null;
  return <div className="grid gap-4 sm:grid-cols-2">{figures}</div>;
}
