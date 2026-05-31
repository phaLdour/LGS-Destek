"use client";

import { useState } from "react";

type Props = {
  className?: string;
  /** Set false to always render the inline SVG instead of trying /mascot.png */
  preferPng?: boolean;
  title?: string;
};

/** Markaya uygun (lacivert + turuncu) baykuş maskot — geometrik SVG. */
export function OwlSvg({
  className,
  title = "Rehberim baykuş maskotu",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* kulak püskülleri */}
      <path d="M55 52 L52 18 L84 44 Z" fill="#16244C" data-rb="navy" />
      <path d="M145 52 L148 18 L116 44 Z" fill="#16244C" data-rb="navy" />
      {/* gövde */}
      <path
        d="M100 34
           C58 34 40 64 40 104
           C40 150 66 178 100 178
           C134 178 160 150 160 104
           C160 64 142 34 100 34 Z"
        fill="#16244C"
        data-rb="navy"
      />
      {/* kanatlar (hafif ton farkı) */}
      <path
        d="M44 96 C40 120 46 150 64 166 C58 140 58 116 62 98 Z"
        fill="#243A6E"
        data-rb="navy-mid"
      />
      <path
        d="M156 96 C160 120 154 150 136 166 C142 140 142 116 138 98 Z"
        fill="#243A6E"
        data-rb="navy-mid"
      />
      {/* yüz diski */}
      <ellipse cx="100" cy="86" rx="50" ry="42" fill="#1C2C5C" data-rb="navy-deep" />
      {/* gözler */}
      <circle cx="78" cy="84" r="22" fill="#FFFFFF" />
      <circle cx="122" cy="84" r="22" fill="#FFFFFF" />
      <circle cx="78" cy="84" r="11" fill="#16244C" data-rb="navy" />
      <circle cx="122" cy="84" r="11" fill="#16244C" data-rb="navy" />
      <circle cx="82" cy="80" r="3.5" fill="#FFFFFF" />
      <circle cx="126" cy="80" r="3.5" fill="#FFFFFF" />
      {/* gaga */}
      <path d="M100 96 L91 108 L100 118 L109 108 Z" fill="#F59E0B" />
      {/* karın şeritleri */}
      <rect x="84" y="120" width="9" height="40" rx="4.5" fill="#F59E0B" />
      <rect x="107" y="120" width="9" height="40" rx="4.5" fill="#F59E0B" />
      {/* ayaklar */}
      <rect x="80" y="174" width="9" height="14" rx="3" fill="#F59E0B" />
      <rect x="111" y="174" width="9" height="14" rx="3" fill="#F59E0B" />
    </svg>
  );
}

/**
 * Baykuş "karşılama" duruşu: sağa doğru bakar ve sağdaki kanadını
 * (kendi sol kanadı) yana/aşağıya, forma doğru uzatır.
 */
export function OwlPointing({
  className,
  title = "Rehberim baykuş maskotu",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 232 206"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* kulak püskülleri (hafif sağa dönük) */}
      <path d="M58 54 L52 18 L88 46 Z" fill="#16244C" data-rb="navy" />
      <path d="M148 54 L154 20 L120 44 Z" fill="#16244C" data-rb="navy" />

      {/* uzanan sağ kanat (bize göre sağ) — forma doğru */}
      <path
        d="M150 96
           C182 90 210 104 226 134
           C214 134 196 136 170 132
           C158 128 150 114 150 96 Z"
        fill="#243A6E"
        data-rb="navy-mid"
      />
      {/* kanat ucu turuncu vurgu */}
      <path
        d="M205 122 C214 126 220 132 224 140 C216 138 209 136 202 132 Z"
        fill="#F59E0B"
      />

      {/* gövde */}
      <path
        d="M104 36
           C62 36 44 66 44 106
           C44 152 70 180 104 180
           C138 180 164 152 164 106
           C164 66 146 36 104 36 Z"
        fill="#16244C"
        data-rb="navy"
      />
      {/* sol kanat (toplu) */}
      <path
        d="M48 98 C44 122 50 152 68 168 C62 142 62 118 66 100 Z"
        fill="#243A6E"
        data-rb="navy-mid"
      />

      {/* yüz diski */}
      <ellipse cx="104" cy="88" rx="50" ry="42" fill="#1C2C5C" data-rb="navy-deep" />

      {/* gözler — sağa bakıyor */}
      <circle cx="82" cy="86" r="22" fill="#FFFFFF" />
      <circle cx="126" cy="86" r="22" fill="#FFFFFF" />
      <circle cx="89" cy="86" r="11" fill="#16244C" data-rb="navy" />
      <circle cx="133" cy="86" r="11" fill="#16244C" data-rb="navy" />
      <circle cx="93" cy="82" r="3.5" fill="#FFFFFF" />
      <circle cx="137" cy="82" r="3.5" fill="#FFFFFF" />

      {/* gaga */}
      <path d="M104 98 L95 110 L104 120 L113 110 Z" fill="#F59E0B" />

      {/* karın şeritleri */}
      <rect x="88" y="122" width="9" height="40" rx="4.5" fill="#F59E0B" />
      <rect x="111" y="122" width="9" height="40" rx="4.5" fill="#F59E0B" />

      {/* ayaklar */}
      <rect x="84" y="176" width="9" height="14" rx="3" fill="#F59E0B" />
      <rect x="115" y="176" width="9" height="14" rx="3" fill="#F59E0B" />
    </svg>
  );
}

/** PNG varsa (/public/mascot.png) onu, yoksa SVG'yi gösterir. */
export function Owl({ className, preferPng = true, title }: Props) {
  const [pngFailed, setPngFailed] = useState(false);

  if (preferPng && !pngFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/mascot.png"
        alt={title ?? "Rehberim baykuş maskotu"}
        className={className}
        onError={() => setPngFailed(true)}
      />
    );
  }
  return <OwlSvg className={className} title={title} />;
}
