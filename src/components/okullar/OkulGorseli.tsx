import type { OkulTuru } from "@/content/okullar";

/**
 * Okul görseli.
 *
 * Neden fotoğraf değil: yüzlerce okulun gerçek fotoğrafı telifli. Okulların kendi
 * sitelerinden ya da haber sitelerinden fotoğraf çekip yayımlamak, izin
 * alınmadığı sürece telif ihlalidir. Bu yüzden her okula, kimliğinden
 * türetilen ve tamamen bize ait olan sade bir illüstrasyon üretiliyor.
 *
 * Görsel iki şeyden oluşur:
 *  - okul TÜRÜNE göre değişen bir simge (fen → damacana/atom, imam hatip →
 *    kubbe, meslek → dişli, sosyal bilimler → kitap),
 *  - okul KİMLİĞİNDEN türetilen sabit bir varyasyon (renk tonu, pencere
 *    sayısı, ağaç konumu) — aynı okul her zaman aynı görseli alır.
 */

/** FNV-1a — okul id'sinden kararlı bir sayı üretir. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Palet = { gok: string; bina: string; binaKoyu: string; cati: string; vurgu: string };

const PALETLER: Record<OkulTuru, Palet[]> = {
  fen: [
    { gok: "#DCE7F5", bina: "#243A6E", binaKoyu: "#16244C", cati: "#0E1838", vurgu: "#38BDF8" },
    { gok: "#D7E9EF", bina: "#1E4356", binaKoyu: "#14303E", cati: "#0D2130", vurgu: "#22D3EE" },
  ],
  anadolu: [
    { gok: "#F3E7D3", bina: "#2A4380", binaKoyu: "#1B2A5A", cati: "#0E1838", vurgu: "#F59E0B" },
    { gok: "#EFE3DA", bina: "#3A3560", binaKoyu: "#262046", cati: "#161233", vurgu: "#FBBF24" },
  ],
  "sosyal-bilimler": [
    { gok: "#E7E2F5", bina: "#3B3070", binaKoyu: "#281F52", cati: "#171038", vurgu: "#A78BFA" },
  ],
  "imam-hatip": [
    { gok: "#DDEDE4", bina: "#1E4A3D", binaKoyu: "#143529", cati: "#0C231B", vurgu: "#34D399" },
  ],
  meslek: [
    { gok: "#E8E8EC", bina: "#3A3F52", binaKoyu: "#272B3A", cati: "#171A25", vurgu: "#94A3B8" },
  ],
  proje: [
    { gok: "#F5E4E4", bina: "#5A2A3A", binaKoyu: "#3E1B28", cati: "#280F19", vurgu: "#FB7185" },
  ],
};

/** Okulun gökyüzü rengi — geniş alanlarda arka plan olarak kullanılır. */
export function okulGokRengi(id: string, tur: OkulTuru): string {
  const paletler = PALETLER[tur] ?? PALETLER.anadolu;
  return paletler[hash(id) % paletler.length].gok;
}

export function OkulGorseli({
  id,
  tur,
  className,
  sigdir = false,
}: {
  id: string;
  tur: OkulTuru;
  className?: string;
  /**
   * true → görsel kırpılmadan sığdırılır (geniş kahraman alanı için).
   * false → alanı doldurur, taşan kısım kırpılır (kart küçük resmi için).
   */
  sigdir?: boolean;
}) {
  const h = hash(id);
  const paletler = PALETLER[tur] ?? PALETLER.anadolu;
  const p = paletler[h % paletler.length];
  // 3 ya da 4 pencere sütunu, ağaç solda ya da sağda
  const sutun = 3 + (h % 2);
  const agacSagda = ((h >> 3) & 1) === 1;
  const bulutX = 24 + ((h >> 5) % 40);

  const pencereler: React.ReactNode[] = [];
  const genislik = 12;
  const bosluk = (160 - sutun * genislik) / (sutun + 1);
  for (let sira = 0; sira < 2; sira++) {
    for (let i = 0; i < sutun; i++) {
      const x = 20 + bosluk + i * (genislik + bosluk);
      pencereler.push(
        <rect
          key={`${sira}-${i}`}
          x={x}
          y={64 + sira * 22}
          width={genislik}
          height={14}
          rx="2"
          fill={p.gok}
          opacity={((h >> (i + sira * 3)) & 1) === 1 ? 0.95 : 0.6}
        />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      role="img"
      aria-label="Okul illüstrasyonu"
      preserveAspectRatio={sigdir ? "xMidYMid meet" : "xMidYMid slice"}
    >
      {/* gökyüzü */}
      <rect x="0" y="0" width="200" height="120" fill={p.gok} />
      {/* bulut */}
      <g fill="#FFFFFF" opacity="0.75">
        <circle cx={bulutX} cy="24" r="9" />
        <circle cx={bulutX + 11} cy="21" r="12" />
        <circle cx={bulutX + 24} cy="25" r="8" />
      </g>

      {/* zemin */}
      <rect x="0" y="104" width="200" height="16" fill={p.binaKoyu} opacity="0.18" />

      {/* ağaç */}
      <g transform={`translate(${agacSagda ? 178 : 14}, 74)`}>
        <rect x="-2" y="16" width="4" height="16" rx="1.5" fill={p.binaKoyu} opacity="0.55" />
        <circle cx="0" cy="10" r="12" fill={p.binaKoyu} opacity="0.28" />
        <circle cx="0" cy="6" r="9" fill={p.binaKoyu} opacity="0.22" />
      </g>

      {/* ana gövde */}
      <rect x="20" y="52" width="160" height="52" fill={p.bina} />
      {/* çatı */}
      <path d="M14 52 L100 26 L186 52 Z" fill={p.cati} />
      {/* kat çizgisi */}
      <rect x="20" y="86" width="160" height="1.5" fill={p.gok} opacity="0.25" />

      {pencereler}

      {/* kapı */}
      <rect x="92" y="86" width="16" height="18" rx="2" fill={p.cati} />
      <circle cx="104" cy="95" r="1.2" fill={p.vurgu} />

      {/* türe özgü simge — çatının üstünde, sade */}
      <TurSimgesi tur={tur} renk={p.vurgu} />
    </svg>
  );
}

/** Çatının tepesindeki tür simgesi. Merkez (100, 20) civarı. */
function TurSimgesi({ tur, renk }: { tur: OkulTuru; renk: string }) {
  if (tur === "fen") {
    // erlenmeyer + baloncuk
    return (
      <g transform="translate(100, 16)">
        <path d="M-4 -8 L-4 -1 L-9 8 L9 8 L4 -1 L4 -8 Z" fill={renk} />
        <rect x="-5.5" y="-10" width="11" height="2.5" rx="1.2" fill={renk} />
        <circle cx="-2" cy="4" r="1.4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="2.5" cy="5.5" r="1" fill="#FFFFFF" opacity="0.8" />
      </g>
    );
  }
  if (tur === "imam-hatip") {
    // kubbe + alem
    return (
      <g transform="translate(100, 16)">
        <path d="M-9 8 A9 9 0 0 1 9 8 Z" fill={renk} />
        <rect x="-10" y="8" width="20" height="2.5" rx="1.2" fill={renk} />
        <rect x="-0.8" y="-6" width="1.6" height="6" rx="0.8" fill={renk} />
        <circle cx="0" cy="-7.5" r="1.8" fill={renk} />
      </g>
    );
  }
  if (tur === "meslek") {
    // dişli
    return (
      <g transform="translate(100, 18)">
        {Array.from({ length: 8 }, (_, i) => (
          <rect
            key={i}
            x="-1.6"
            y="-10"
            width="3.2"
            height="4"
            rx="1"
            fill={renk}
            transform={`rotate(${i * 45})`}
          />
        ))}
        <circle cx="0" cy="0" r="6.5" fill={renk} />
        <circle cx="0" cy="0" r="2.6" fill="#FFFFFF" opacity="0.85" />
      </g>
    );
  }
  if (tur === "sosyal-bilimler") {
    // açık kitap
    return (
      <g transform="translate(100, 18)">
        <path d="M-10 -5 Q-5 -8 0 -5 L0 6 Q-5 3 -10 6 Z" fill={renk} />
        <path d="M10 -5 Q5 -8 0 -5 L0 6 Q5 3 10 6 Z" fill={renk} opacity="0.75" />
      </g>
    );
  }
  if (tur === "proje") {
    // yıldız
    return (
      <g transform="translate(100, 18)">
        <path
          d="M0 -10 L2.9 -3.2 L10 -2.5 L4.7 2.4 L6.2 9.5 L0 6 L-6.2 9.5 L-4.7 2.4 L-10 -2.5 L-2.9 -3.2 Z"
          fill={renk}
        />
      </g>
    );
  }
  // anadolu — sütunlu alınlık
  return (
    <g transform="translate(100, 18)">
      <path d="M-11 -3 L0 -10 L11 -3 Z" fill={renk} />
      <rect x="-9" y="-1.5" width="2.6" height="9" rx="1" fill={renk} />
      <rect x="-1.3" y="-1.5" width="2.6" height="9" rx="1" fill={renk} />
      <rect x="6.4" y="-1.5" width="2.6" height="9" rx="1" fill={renk} />
      <rect x="-11" y="7.5" width="22" height="2.4" rx="1.2" fill={renk} />
    </g>
  );
}
