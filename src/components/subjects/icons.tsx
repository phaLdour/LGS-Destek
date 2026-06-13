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

/** Matematik → Pi (π) sembolü */
export function PiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* yatay üst çubuk (pi'nin tepesi) */}
      <rect x="8" y="14" width="32" height="5.5" rx="1.8" fill="currentColor" />
      {/* sol ayak */}
      <rect x="13" y="19.5" width="6" height="20" rx="1.5" fill="currentColor" />
      {/* sağ ayak (hafifçe sağa eğimli his vermek için biraz daha geniş bırakıyoruz) */}
      <rect x="29" y="19.5" width="6" height="20" rx="1.5" fill="currentColor" />
      {/* alt zemin vurgusu (dengeli oturma) */}
      <rect x="10" y="38" width="28" height="2.5" rx="1.2" fill="currentColor" opacity="0.45" />
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

/** T.C. İnkılap Tarihi → Atatürk imzası (basit kaligrafik silüet) */
export function AtaturkSignatureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* K büyük harf — soldan dik gövde + iki açı */}
        <path d="M7 16 L7 34" />
        <path d="M7 25 L15 17" />
        <path d="M7 25 L15 34" />
        {/* "Atatürk" soyadı akıcı el yazısı — birleşik kıvrımlı path */}
        <path
          d="M17 30
             C 19 22, 22 22, 24 28
             S 28 34, 30 28
             C 32 24, 34 23, 36 26
             S 41 28, 43 24"
        />
        {/* Alt yatay imza çizgisi (klasik kaligrafik altçizgi) */}
        <path d="M10 38 L42 38" strokeWidth="2" opacity="0.55" />
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
