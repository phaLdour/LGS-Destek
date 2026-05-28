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

/** Matematik → kare şekli + üs (x²) */
export function MathSquareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect
        x="9"
        y="16"
        width="22"
        height="22"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <text
        x="36"
        y="20"
        textAnchor="middle"
        fontFamily="var(--font-sans), sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="currentColor"
      >
        2
      </text>
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

/** T.C. İnkılap Tarihi → Türk bayrağı */
export function TrFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="5" y="11" width="38" height="26" rx="3" fill="#E30A17" />
      <circle cx="21" cy="24" r="8.5" fill="#fff" />
      <circle cx="23.5" cy="24" r="6.8" fill="#E30A17" />
      <path
        d="M31 24 l-5.2 1.7 3.2-4.4 0 5.4 -3.2-4.4 z"
        fill="#fff"
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
