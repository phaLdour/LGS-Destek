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

/** T.C. İnkılap Tarihi → kalpaklı Atatürk profili silüeti (sağa bakan) */
export function AtaturkProfileIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/*
        Sağa bakan profil silüeti.
        Kalpak (kürk başlık) + alın → kaş → burun → dudak → çene hattı +
        boyun ve yaka. Tek dolu path; küçük boyutta net okunur.
      */}
      <path
        fill="currentColor"
        d="M14 12
           C 13 11, 13 9.5, 14.5 9
           L 32 9
           C 34 9, 35 10.5, 35 12.5
           L 35 17
           C 36.5 19, 37.5 21.5, 37.5 24
           C 37.5 27, 36.5 29, 34.5 30.5
           C 33 31.6, 31.5 32, 31.5 33.5
           L 31.5 40
           L 19 40
           L 19 34
           C 19 32.5, 18 31.8, 16.8 31
           C 14 29, 12 25.8, 12 21.5
           C 12 17.5, 12.8 14, 14 12
           Z"
      />
      {/* burun-dudak girinti vurgusu (yüz hattını belirginleştirir) */}
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
        d="M35.5 23 q 1.5 1.5 -0.5 3 M33 28 q -1.5 0.8 -3 0.4"
      />
      {/* kalpak alt kenarı (başlık ile alnı ayıran çizgi) */}
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
        d="M14.5 15.5 L34 15.5"
      />
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
