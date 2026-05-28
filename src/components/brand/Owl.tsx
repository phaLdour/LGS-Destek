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
      <path d="M55 52 L52 18 L84 44 Z" fill="#16244C" />
      <path d="M145 52 L148 18 L116 44 Z" fill="#16244C" />
      {/* gövde */}
      <path
        d="M100 34
           C58 34 40 64 40 104
           C40 150 66 178 100 178
           C134 178 160 150 160 104
           C160 64 142 34 100 34 Z"
        fill="#16244C"
      />
      {/* kanatlar (hafif ton farkı) */}
      <path
        d="M44 96 C40 120 46 150 64 166 C58 140 58 116 62 98 Z"
        fill="#243A6E"
      />
      <path
        d="M156 96 C160 120 154 150 136 166 C142 140 142 116 138 98 Z"
        fill="#243A6E"
      />
      {/* yüz diski */}
      <ellipse cx="100" cy="86" rx="50" ry="42" fill="#1C2C5C" />
      {/* gözler */}
      <circle cx="78" cy="84" r="22" fill="#FFFFFF" />
      <circle cx="122" cy="84" r="22" fill="#FFFFFF" />
      <circle cx="78" cy="84" r="11" fill="#16244C" />
      <circle cx="122" cy="84" r="11" fill="#16244C" />
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
