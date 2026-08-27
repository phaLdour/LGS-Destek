type IconProps = { className?: string };

/** Türkçe → ABC */
export function AbcIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="currentColor"
        letterSpacing="0.5"
      >
        ABC
      </text>
      <rect x="9" y="37" width="30" height="3.5" rx="1.75" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/** Matematik → Pi (π) — kıvrak, kuyruklu tipografik glif */
export function PiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* üst yatay çubuk — iki uçtan hafif taşar */}
        <path d="M8 15 H40" />
        {/* sol ayak — ucu hafif sola kıvrık (serif hissi) */}
        <path d="M17 15 V31 Q17 37 11 37" />
        {/* sağ ayak — ucu belirgin sağa kuyruklu (π'nin ikonik kuyruğu) */}
        <path d="M31 15 V32 Q31 38 37 35" />
      </g>
    </svg>
  );
}

/** Fen Bilimleri → atom */
export function AtomIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="24" cy="24" r="3.5" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <ellipse cx="24" cy="24" rx="16" ry="6.5" />
        <ellipse cx="24" cy="24" rx="16" ry="6.5" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="16" ry="6.5" transform="rotate(120 24 24)" />
      </g>
    </svg>
  );
}

/**
 * T.C. İnkılap Tarihi → Türk bayrağı motifi (ay-yıldız).
 *
 * Fotoğraf değil, çizim. Oranlar resmî bayrak ölçülerinden alındı
 * (bayrak 30x20 birim: dış daire r=5, iç daire r=4 ve 1,25 birim sağa
 * kaydırılmış, yıldızın çevrel yarıçapı 1,875, merkezi x=14,9375) ve
 * 48x48 kutuya 2,4 katsayısıyla ölçeklendi.
 *
 * Hilal, evenodd dolgu kuralıyla dış daireden iç dairenin çıkarılmasıyla
 * elde edilir. Şekiller currentColor (beyaz) ile boyanır; kırmızı zemin
 * ders kartındaki rozet gradyanından gelir. Tek renk olduğu için küçük
 * boyutta da net okunur.
 */
export function TurkBayragiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Motif kendi içinde sola yaslı; kutuya ortalamak için kaydırılır. */}
      <g transform="translate(2.25 0)">
        {/* Hilal: dış daire eksi sağa kaydırılmış iç daire */}
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 24 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 Z
             M13.4 24 a9.6 9.6 0 1 0 19.2 0 a9.6 9.6 0 1 0 -19.2 0 Z"
        />
        {/* Beş köşeli yıldız — bir ucu hilale dönük */}
        <path
          fill="currentColor"
          d="M 27.35 24.00 L 30.46 22.99 L 30.46 19.72 L 32.38 22.37 L 35.49 21.35 L 33.57 24.00 L 35.49 26.65 L 32.38 25.63 L 30.46 28.28 L 30.46 25.01 Z"
        />
      </g>
    </svg>
  );
}

/** Din Kültürü → cami */
export function MosqueIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* minareler */}
      <rect x="8" y="18" width="3.5" height="22" fill="currentColor" />
      <rect x="36.5" y="18" width="3.5" height="22" fill="currentColor" />
      <path d="M9.75 14 l2.4 4 H7.35 z" fill="currentColor" />
      <path d="M38.25 14 l2.4 4 H35.85 z" fill="currentColor" />
      {/* ana kubbe + gövde */}
      <path
        d="M15 40 V26 C15 19 33 19 33 26 V40 Z"
        fill="currentColor"
      />
      <path d="M24 9 C19 14 19 18 24 21 C29 18 29 14 24 9 Z" fill="currentColor" />
      {/* kapı */}
      <path d="M21 40 V32 C21 28 27 28 27 32 V40 Z" fill="#fff" opacity="0.85" />
    </svg>
  );
}

/** İngilizce → konuşma balonu "Hello" */
export function HelloBubbleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M9 11 h30 a4 4 0 0 1 4 4 v15 a4 4 0 0 1 -4 4 H22 l-8 6 v-6 H9 a4 4 0 0 1 -4 -4 V15 a4 4 0 0 1 4 -4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <text
        x="24"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontWeight="800"
        fontSize="11"
        fill="currentColor"
      >
        Hello
      </text>
    </svg>
  );
}
