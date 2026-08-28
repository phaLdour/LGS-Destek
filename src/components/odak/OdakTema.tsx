/**
 * Odak Modu — tema sahneleri.
 *
 * 8 tam ekran, canlı arka plan. Tümü CSS + inline SVG ile çizilir:
 * resim dosyası yok (site ağırlaşmaz, telif derdi yok), animasyonlar yalnız
 * transform/opacity kullanır ve prefers-reduced-motion'a saygı duyar.
 * Zerre konumları rastgele DEĞİL, indeksten türetilir — böylece sunucu ve
 * tarayıcı aynı HTML'i üretir (hydration uyuşmazlığı olmaz).
 */

import type React from "react";

export type OdakTemasi = {
  id: string;
  ad: string;
  emoji: string;
  /** Tema seçicideki küçük kutunun arka planı */
  onizleme: string;
};

export const TEMALAR: OdakTemasi[] = [
  { id: "orman", ad: "Orman", emoji: "🌲", onizleme: "linear-gradient(180deg,#0c2b1a,#1d5233)" },
  { id: "tapinak", ad: "Tapınak", emoji: "⛩️", onizleme: "linear-gradient(180deg,#2a1a3e,#c96f4a)" },
  { id: "okul", ad: "Sınıf", emoji: "🏫", onizleme: "linear-gradient(180deg,#1c3c31,#15302a)" },
  { id: "kutuphane", ad: "Kütüphane", emoji: "📚", onizleme: "linear-gradient(180deg,#2e1d12,#4a2f1b)" },
  { id: "yagmur", ad: "Yağmurlu Cam", emoji: "🌧️", onizleme: "linear-gradient(180deg,#232b3a,#3a4a63)" },
  { id: "gece", ad: "Gece Gökyüzü", emoji: "🌙", onizleme: "linear-gradient(180deg,#070b1d,#1b2a52)" },
  { id: "somine", ad: "Şömine", emoji: "🔥", onizleme: "linear-gradient(180deg,#1c0f08,#4a2410)" },
  { id: "sahil", ad: "Gün Batımı Sahili", emoji: "🌅", onizleme: "linear-gradient(180deg,#35507a,#f7b267)" },
];

export const VARSAYILAN_TEMA = "orman";

/** İndeksten deterministik 0-1 arası değer (hydration güvenli "rastgelelik"). */
function d(i: number, tuz: number): number {
  const x = Math.sin(i * 127.1 + tuz * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Zerreler({
  adet,
  tuz,
  sinif,
  stil,
}: {
  adet: number;
  tuz: number;
  sinif: string;
  stil: (i: number, r: (tuz2: number) => number) => React.CSSProperties;
}) {
  return (
    <>
      {Array.from({ length: adet }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute ${sinif}`}
          style={stil(i, (t) => d(i, tuz + t))}
        />
      ))}
    </>
  );
}

/* ------------------------------ Sahneler ------------------------------ */

function Orman() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#081f12 0%,#0c2b1a 40%,#16402a 78%,#1d5233 100%)" }}
    >
      {/* Ay ışığı */}
      <div
        className="absolute -top-16 left-1/4 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle,rgba(190,255,214,0.16),transparent 65%)" }}
      />
      {/* Arka tepe */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ height: "55%" }} aria-hidden>
        <path d="M0 40 L0 22 Q18 12 34 20 Q52 28 68 16 Q84 6 100 18 L100 40 Z" fill="#0a2416" opacity="0.9" />
      </svg>
      {/* Orta sıra çamlar */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 100 34" preserveAspectRatio="none" style={{ height: "46%" }} aria-hidden>
        {Array.from({ length: 11 }, (_, i) => {
          const x = i * 9.6 + d(i, 1) * 4;
          const h = 14 + d(i, 2) * 10;
          return (
            <path
              key={i}
              d={`M${x} 34 L${x} ${34 - h * 0.25} L${x - 3.2} ${34 - h * 0.2} L${x + 0.4} ${34 - h * 0.55} L${x - 2.4} ${34 - h * 0.5} L${x + 0.6} ${34 - h * 0.8} L${x - 1.6} ${34 - h * 0.76} L${x + 1} ${34 - h} L${x + 3.6} ${34 - h * 0.76} L${x + 1.4} ${34 - h * 0.8} L${x + 4.4} ${34 - h * 0.5} L${x + 1.6} ${34 - h * 0.55} L${x + 5.2} ${34 - h * 0.2} L${x + 2} ${34 - h * 0.25} L${x + 2} 34 Z`}
              fill="#0d2f1c"
            />
          );
        })}
      </svg>
      {/* Ön sıra çamlar (hafif salınır) */}
      <svg
        className="rb-odak-agac absolute bottom-0 w-full"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        style={{ height: "36%", ["--rb-sure" as string]: "9s" }}
        aria-hidden
      >
        {Array.from({ length: 7 }, (_, i) => {
          const x = i * 15.5 + d(i, 3) * 6 - 2;
          const h = 16 + d(i, 4) * 12;
          return (
            <path
              key={i}
              d={`M${x} 30 L${x} ${30 - h * 0.22} L${x - 4.4} ${30 - h * 0.16} L${x + 0.4} ${30 - h * 0.52} L${x - 3.2} ${30 - h * 0.46} L${x + 0.8} ${30 - h * 0.78} L${x - 2} ${30 - h * 0.72} L${x + 1.4} ${30 - h} L${x + 4.8} ${30 - h * 0.72} L${x + 2} ${30 - h * 0.78} L${x + 6} ${30 - h * 0.46} L${x + 2.4} ${30 - h * 0.52} L${x + 7.2} ${30 - h * 0.16} L${x + 2.8} ${30 - h * 0.22} L${x + 2.8} 30 Z`}
              fill="#061a0f"
            />
          );
        })}
      </svg>
      {/* Ateş böcekleri */}
      <Zerreler
        adet={14}
        tuz={7}
        sinif="rb-odak-atesbocegi rounded-full"
        stil={(i, r) => ({
          left: `${4 + r(1) * 92}%`,
          top: `${30 + r(2) * 55}%`,
          width: 3 + r(3) * 3,
          height: 3 + r(3) * 3,
          background: "#d8f76f",
          boxShadow: "0 0 8px 2px rgba(216,247,111,0.55)",
          ["--rb-sure" as string]: `${2.8 + r(4) * 3.4}s`,
          ["--rb-gecikme" as string]: `${r(5) * 4}s`,
        })}
      />
    </div>
  );
}

function Tapinak() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#241636 0%,#4c2a52 34%,#93455a 62%,#d97b52 86%,#f2a65a 100%)" }}
    >
      {/* Batan güneş */}
      <div
        className="absolute left-1/2 h-40 w-40 -translate-x-1/2 rounded-full"
        style={{ bottom: "26%", background: "radial-gradient(circle,#ffd9a0 0%,#f7a765 55%,transparent 72%)", opacity: 0.9 }}
      />
      {/* Bulutlar */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rb-odak-bulut absolute rounded-full"
          style={{
            left: `${10 + i * 28}%`,
            top: `${10 + d(i, 11) * 18}%`,
            width: `${22 + d(i, 12) * 16}%`,
            height: 26 + d(i, 13) * 18,
            background: "rgba(255,190,160,0.16)",
            filter: "blur(10px)",
            ["--rb-sure" as string]: `${46 + i * 18}s`,
          }}
        />
      ))}
      {/* Dağlar */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 100 36" preserveAspectRatio="none" style={{ height: "48%" }} aria-hidden>
        <path d="M0 36 L0 24 Q14 10 30 20 Q40 26 52 18 Q70 6 84 18 Q92 24 100 21 L100 36 Z" fill="#301b42" opacity="0.85" />
        <path d="M0 36 L0 30 Q20 20 38 27 Q58 34 74 25 Q88 18 100 27 L100 36 Z" fill="#241332" />
      </svg>
      {/* Tapınak silüeti */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" viewBox="0 0 60 46" style={{ height: "42%" }} aria-hidden>
        <g fill="#160b20">
          {/* kaide + merdiven */}
          <rect x="10" y="42" width="40" height="4" />
          <rect x="14" y="39" width="32" height="3" />
          {/* alt kat */}
          <rect x="18" y="28" width="24" height="11" />
          <path d="M12 28 Q30 20 48 28 L44 25 Q30 19 16 25 Z" />
          <path d="M12 28 L16 24 L44 24 L48 28 Q30 22 12 28 Z" />
          {/* üst kat */}
          <rect x="23" y="17" width="14" height="9" />
          <path d="M17 17 Q30 10 43 17 L39 14 Q30 9 21 14 Z" />
          {/* tepe */}
          <path d="M27 10 L30 4 L33 10 Q30 8 27 10 Z" />
          <rect x="29.4" y="2" width="1.2" height="4" />
        </g>
      </svg>
      {/* Uçan kuş silüetleri */}
      <svg className="absolute" style={{ left: "14%", top: "22%", width: 60 }} viewBox="0 0 60 16" aria-hidden>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${6 + i * 20} ${8 + d(i, 21) * 4} q3 -3 6 0 q3 -3 6 0`}
            stroke="#1d1030"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

function Okul() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#243024" }}>
      {/* Ahşap çerçeve */}
      <div className="absolute inset-0 rounded-[inherit] border-[10px]" style={{ borderColor: "#7a4f2a" }} />
      {/* Yazı tahtası */}
      <div
        className="absolute inset-[10px]"
        style={{ background: "radial-gradient(ellipse at 40% 35%,#26443a 0%,#1c352d 55%,#152a24 100%)" }}
      />
      {/* Tebeşir karalamaları */}
      <svg className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)]" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g stroke="rgba(240,246,235,0.34)" fill="none" strokeWidth="0.45" strokeLinecap="round">
          {/* üçgen + hipotenüs */}
          <path d="M8 26 L8 14 L24 26 Z" />
          <path d="M9.5 24 L11 24 L11 25.5" strokeWidth="0.35" />
          {/* daire ve pi */}
          <circle cx="84" cy="14" r="6" strokeDasharray="1.6 1.1" />
          {/* kesir çizgisi */}
          <path d="M74 44 h10" />
          {/* grafik ekseni */}
          <path d="M12 52 v-12 M12 52 h16" />
          <path d="M13 50 q6 -8 14 -9" strokeDasharray="1.2 1" />
        </g>
        <g fill="rgba(240,246,235,0.4)" style={{ fontFamily: "var(--font-sans)" }}>
          <text x="32" y="16" fontSize="4.6" transform="rotate(-2 32 16)">a² + b² = c²</text>
          <text x="60" y="30" fontSize="4" transform="rotate(1.5 60 30)">Net = D − Y/3</text>
          <text x="30" y="42" fontSize="3.6" transform="rotate(-1 30 42)">√144 = 12</text>
          <text x="80" y="16.2" fontSize="3.4" textAnchor="middle">π</text>
          <text x="74" y="42" fontSize="3.4">x + 3</text>
          <text x="76" y="48.6" fontSize="3.4">&nbsp;&nbsp;2</text>
          <text x="14" y="10" fontSize="4.2" transform="rotate(-1.2 14 10)">LGS 💪</text>
        </g>
      </svg>
      {/* Tebeşir tozu */}
      <Zerreler
        adet={10}
        tuz={31}
        sinif="rb-odak-tozzerre rounded-full"
        stil={(i, r) => ({
          left: `${8 + r(1) * 84}%`,
          bottom: `${6 + r(2) * 30}%`,
          width: 2 + r(3) * 2,
          height: 2 + r(3) * 2,
          background: "rgba(240,246,235,0.5)",
          ["--rb-sure" as string]: `${8 + r(4) * 8}s`,
          ["--rb-gecikme" as string]: `${r(5) * 9}s`,
          ["--rb-sapma" as string]: `${(r(6) - 0.5) * 40}px`,
        })}
      />
      {/* Tahta silgisi ve tebeşir */}
      <div className="absolute bottom-[12px] left-[14%] h-2.5 w-10 rounded-sm" style={{ background: "#5b3b20" }} />
      <div className="absolute bottom-[13px] left-[32%] h-1.5 w-6 rounded-full" style={{ background: "#e8ecdf" }} />
      <div className="absolute bottom-[13px] left-[38%] h-1.5 w-5 rounded-full -rotate-3" style={{ background: "#f2d98c" }} />
    </div>
  );
}

function Kutuphane() {
  const raflar = [0, 1, 2, 3];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#241609 0%,#33200f 55%,#20130a 100%)" }}
    >
      {/* Kitap rafları */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {raflar.map((r) => {
          const rafY = 6 + r * 14;
          let x = 3;
          const kitaplar: React.ReactNode[] = [];
          const renkler = ["#6e3b22", "#57452a", "#7a5230", "#4a2e1c", "#84603a", "#5d3a26", "#6b4a2e"];
          for (let i = 0; x < 95; i++) {
            const w = 1.6 + d(i + r * 40, 41) * 1.9;
            const h = 8 + d(i + r * 40, 42) * 3.4;
            const egik = d(i + r * 40, 43) > 0.92;
            kitaplar.push(
              <rect
                key={i}
                x={x}
                y={rafY + (12 - h)}
                width={w}
                height={h}
                rx={0.3}
                fill={renkler[Math.floor(d(i + r * 40, 44) * renkler.length)]}
                transform={egik ? `rotate(-8 ${x} ${rafY + 12})` : undefined}
                opacity={0.55 + d(i + r * 40, 45) * 0.35}
              />,
            );
            x += w + 0.5 + (egik ? 1.2 : 0);
          }
          return (
            <g key={r}>
              {kitaplar}
              <rect x="0" y={rafY + 12} width="100" height="1.6" fill="#170d06" />
            </g>
          );
        })}
      </svg>
      {/* Lamba ışığı huzmesi */}
      <div
        className="absolute -top-10 right-[12%] h-[70%] w-[38%]"
        style={{ background: "radial-gradient(ellipse at 70% 0%,rgba(255,196,110,0.3),transparent 62%)" }}
      />
      {/* Işıkta yüzen toz */}
      <Zerreler
        adet={12}
        tuz={51}
        sinif="rb-odak-tozzerre rounded-full"
        stil={(i, r) => ({
          right: `${8 + r(1) * 30}%`,
          bottom: `${20 + r(2) * 40}%`,
          width: 2 + r(3) * 2,
          height: 2 + r(3) * 2,
          background: "rgba(255,214,150,0.55)",
          ["--rb-sure" as string]: `${9 + r(4) * 9}s`,
          ["--rb-gecikme" as string]: `${r(5) * 10}s`,
          ["--rb-sapma" as string]: `${(r(6) - 0.5) * 30}px`,
        })}
      />
      {/* Alt masa hattı + fincan silüeti */}
      <div className="absolute bottom-0 h-[9%] w-full" style={{ background: "#150c05" }} />
      <div className="absolute bottom-[7%] left-[18%] h-4 w-6 rounded-b-xl rounded-t-sm" style={{ background: "#3a2413" }} />
    </div>
  );
}

function Yagmur() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#1d2432 0%,#2a3547 55%,#39485f 100%)" }}
    >
      {/* Bulanık şehir ışıkları (bokeh) */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="rb-odak-kor absolute rounded-full"
          style={{
            left: `${4 + d(i, 61) * 90}%`,
            top: `${35 + d(i, 62) * 45}%`,
            width: 14 + d(i, 63) * 26,
            height: 14 + d(i, 63) * 26,
            background: ["#f2b25c", "#7fd1d8", "#e88b8b", "#f2d98c"][Math.floor(d(i, 64) * 4)],
            opacity: 0.35,
            filter: "blur(7px)",
            ["--rb-sure" as string]: `${3 + d(i, 65) * 5}s`,
            ["--rb-gecikme" as string]: `${d(i, 66) * 4}s`,
          }}
        />
      ))}
      {/* Cam parlaması */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,0.05) 42%,transparent 55%,rgba(255,255,255,0.04) 70%,transparent 82%)" }}
      />
      {/* Yağmur çizgileri */}
      <Zerreler
        adet={26}
        tuz={71}
        sinif="rb-odak-damla"
        stil={(i, r) => ({
          left: `${r(1) * 100}%`,
          top: 0,
          width: 1.5,
          height: `${9 + r(2) * 10}vh`,
          borderRadius: 2,
          background: "linear-gradient(180deg,transparent,rgba(205,225,255,0.5) 55%,rgba(225,240,255,0.75))",
          ["--rb-sure" as string]: `${1 + r(3) * 1.1}s`,
          ["--rb-gecikme" as string]: `${r(4) * 2.2}s`,
        })}
      />
      {/* Camda asılı damlacıklar */}
      <Zerreler
        adet={16}
        tuz={81}
        sinif="rounded-full"
        stil={(i, r) => ({
          left: `${r(1) * 97}%`,
          top: `${r(2) * 92}%`,
          width: 3 + r(3) * 4,
          height: 4 + r(3) * 5,
          background: "radial-gradient(circle at 35% 30%,rgba(235,245,255,0.65),rgba(160,190,225,0.25))",
          opacity: 0.7,
        })}
      />
    </div>
  );
}

function Gece() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#04060f 0%,#0a1128 55%,#16224a 100%)" }}
    >
      {/* Yıldızlar */}
      <Zerreler
        adet={42}
        tuz={91}
        sinif="rb-odak-yildiz rounded-full"
        stil={(i, r) => ({
          left: `${r(1) * 100}%`,
          top: `${r(2) * 72}%`,
          width: 1.5 + r(3) * 2.2,
          height: 1.5 + r(3) * 2.2,
          background: "#e8efff",
          boxShadow: r(3) > 0.6 ? "0 0 6px 1px rgba(220,232,255,0.8)" : undefined,
          ["--rb-sure" as string]: `${2.2 + r(4) * 4}s`,
          ["--rb-gecikme" as string]: `${r(5) * 5}s`,
        })}
      />
      {/* Kayan yıldız */}
      <span
        className="rb-odak-meteor absolute"
        style={{
          left: "72%",
          top: "14%",
          width: 90,
          height: 2,
          borderRadius: 2,
          background: "linear-gradient(90deg,rgba(255,255,255,0.95),transparent)",
          ["--rb-gecikme" as string]: "6s",
        }}
        aria-hidden
      />
      {/* Hilal ay */}
      <svg className="absolute right-[14%] top-[12%]" width="72" height="72" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <radialGradient id="rb-ay-glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="rgba(250,240,200,0.35)" />
            <stop offset="100%" stopColor="rgba(250,240,200,0)" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#rb-ay-glow)" />
        <path d="M24 6 A11.5 11.5 0 1 0 24 34 A9 9 0 1 1 24 6 Z" fill="#f4ecc8" />
      </svg>
      {/* Tepeler */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 100 22" preserveAspectRatio="none" style={{ height: "26%" }} aria-hidden>
        <path d="M0 22 L0 14 Q16 6 34 12 Q52 18 68 10 Q84 3 100 12 L100 22 Z" fill="#03050c" />
      </svg>
      {/* Tepede tek ağaç ve pencere ışığı olan küçük ev */}
      <svg className="absolute bottom-[13%] left-[16%]" width="60" height="42" viewBox="0 0 30 21" aria-hidden>
        <rect x="12" y="12" width="10" height="7" fill="#0a0d18" />
        <path d="M11 12 L17 7 L23 12 Z" fill="#0a0d18" />
        <rect x="18.5" y="14" width="2.2" height="2.6" fill="#f2c14e" className="rb-odak-kor" style={{ ["--rb-sure" as string]: "4s" }} />
      </svg>
    </div>
  );
}

function Somine() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 100%,#3d1d0b 0%,#241108 45%,#140a05 100%)" }}
    >
      {/* Duvar taş dokusu (çok hafif) */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.1]" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {Array.from({ length: 24 }, (_, i) => (
          <rect
            key={i}
            x={(i % 6) * 17 + (Math.floor(i / 6) % 2 ? 8 : 0) - 4}
            y={Math.floor(i / 6) * 9 + 2}
            width={15}
            height={7}
            rx={1.6}
            fill="none"
            stroke="#7a4a28"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      {/* Ocak kemeri — seçici çubukların üstünde kalsın diye yukarı alındı */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "24%",
          width: "40%",
          maxWidth: 360,
          height: "36%",
          background: "#0c0603",
          borderRadius: "48% 48% 6% 6% / 62% 62% 4% 4%",
          boxShadow: "0 0 0 10px #241207, 0 0 60px rgba(255,120,30,0.3) inset",
        }}
      />
      {/* Alev yalımları */}
      {[
        { w: 34, h: 64, x: -26, renk: "#ff6b1a", sure: "0.9s", gecikme: "0s" },
        { w: 42, h: 86, x: 0, renk: "#ffa62b", sure: "0.8s", gecikme: "0.25s" },
        { w: 30, h: 56, x: 26, renk: "#ff8c2b", sure: "1.05s", gecikme: "0.45s" },
        { w: 20, h: 40, x: 2, renk: "#ffd166", sure: "0.7s", gecikme: "0.1s" },
      ].map((a, i) => (
        <div
          key={i}
          className="rb-odak-alev absolute bottom-[27%] left-1/2"
          style={{
            width: a.w,
            height: a.h,
            marginLeft: a.x - a.w / 2,
            background: `radial-gradient(ellipse at 50% 92%,${a.renk} 0%,${a.renk}cc 45%,transparent 72%)`,
            borderRadius: "50% 50% 46% 46% / 68% 68% 32% 32%",
            filter: "blur(3px)",
            animationDuration: a.sure,
            animationDelay: a.gecikme,
          }}
        />
      ))}
      {/* Odunlar */}
      <div className="absolute bottom-[25%] left-1/2 h-3.5 w-40 -translate-x-1/2 rotate-[4deg] rounded-full" style={{ background: "#3a1e0d" }} />
      <div className="absolute bottom-[27.5%] left-1/2 h-3.5 w-32 -translate-x-1/2 -rotate-[7deg] rounded-full" style={{ background: "#2c1609" }} />
      {/* Yükselen korlar */}
      <Zerreler
        adet={10}
        tuz={101}
        sinif="rb-odak-kivilcim rounded-full"
        stil={(i, r) => ({
          left: `${44 + r(1) * 12}%`,
          bottom: "34%",
          width: 2.5 + r(2) * 2.5,
          height: 2.5 + r(2) * 2.5,
          background: r(3) > 0.5 ? "#ffb347" : "#ff7b2b",
          boxShadow: "0 0 6px 1px rgba(255,140,50,0.7)",
          ["--rb-sure" as string]: `${3.4 + r(4) * 3.2}s`,
          ["--rb-gecikme" as string]: `${r(5) * 5}s`,
          ["--rb-sapma" as string]: `${(r(6) - 0.5) * 70}px`,
        })}
      />
      {/* Oda parıltısı */}
      <div
        className="rb-odak-kor absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 96%,rgba(255,140,40,0.2),transparent 55%)",
          ["--rb-sure" as string]: "2.8s",
        }}
      />
    </div>
  );
}

function Sahil() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#2f4772 0%,#7a5680 34%,#d97b52 52%,#f7b267 62%,#1d3a5f 62.2%,#152c4a 100%)" }}
    >
      {/* Güneş */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{ top: "46%", width: 88, height: 88, background: "radial-gradient(circle,#fff3c4 0%,#ffd166 45%,#ff9e4a 78%,transparent 85%)" }}
      />
      {/* Yakamoz (güneş yansıma şeritleri) */}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="rb-odak-yakamoz absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: `${64 + i * 5.4}%`,
            width: `${18 - i * 2.2}%`,
            height: 5,
            background: "rgba(255,205,110,0.5)",
            filter: "blur(2px)",
            ["--rb-sure" as string]: `${3.6 + d(i, 111) * 3}s`,
            ["--rb-gecikme" as string]: `${d(i, 112) * 2.5}s`,
          }}
        />
      ))}
      {/* Dalga bantları — %200 genişlik, sola kayarak döngü */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-[200%]"
          style={{ top: `${66 + i * 10}%`, left: 0, height: 26, opacity: 0.5 - i * 0.12 }}
        >
          <svg
            className="rb-odak-dalga h-full w-full"
            viewBox="0 0 200 8"
            preserveAspectRatio="none"
            style={{ ["--rb-sure" as string]: `${12 + i * 7}s` }}
            aria-hidden
          >
            <path
              d="M0 4 Q6.25 1 12.5 4 T25 4 T37.5 4 T50 4 T62.5 4 T75 4 T87.5 4 T100 4 T112.5 4 T125 4 T137.5 4 T150 4 T162.5 4 T175 4 T187.5 4 T200 4 L200 8 L0 8 Z"
              fill={i === 0 ? "rgba(210,235,255,0.5)" : "rgba(120,170,220,0.4)"}
            />
          </svg>
        </div>
      ))}
      {/* Martılar */}
      <svg className="absolute" style={{ left: "20%", top: "18%", width: 80 }} viewBox="0 0 80 20" aria-hidden>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${8 + i * 26} ${9 + d(i, 121) * 6} q4 -4 8 0 q4 -4 8 0`}
            stroke="#26200f"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------ Dışa açılan ------------------------------ */

export function TemaSahnesi({ tema }: { tema: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      {tema === "orman" && <Orman />}
      {tema === "tapinak" && <Tapinak />}
      {tema === "okul" && <Okul />}
      {tema === "kutuphane" && <Kutuphane />}
      {tema === "yagmur" && <Yagmur />}
      {tema === "gece" && <Gece />}
      {tema === "somine" && <Somine />}
      {tema === "sahil" && <Sahil />}
      {/* Yazı okunurluğu için ortak, hafif karartma */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 42%,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.12) 45%,rgba(0,0,0,0.3) 100%)" }}
      />
    </div>
  );
}
