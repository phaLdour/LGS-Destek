"use client";

import { useState } from "react";

type Props = {
  className?: string;
  preferPng?: boolean;
  title?: string;
};

/** Açık kitap + hedef + ok logosu (lacivert / turuncu). */
export function LogoSvg({
  className,
  title = "Rehberim logosu",
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
      {/* kitap */}
      <path
        d="M24 70 C48 58 76 58 100 70 C124 58 152 58 176 70 L176 152 C152 140 124 140 100 152 C76 140 48 140 24 152 Z"
        fill="none"
        stroke="#16244C"
        strokeWidth="11"
        strokeLinejoin="round"
        data-rb="navy"
      />
      <path
        d="M100 70 L100 152"
        stroke="#16244C"
        strokeWidth="9"
        strokeLinecap="round"
        data-rb="navy"
      />
      {/* hedef */}
      <circle cx="112" cy="96" r="40" fill="none" stroke="#16244C" strokeWidth="11" data-rb="navy" />
      <circle cx="112" cy="96" r="16" fill="#F59E0B" />
      {/* ok */}
      <path
        d="M112 96 L168 40"
        stroke="#16244C"
        strokeWidth="11"
        strokeLinecap="round"
        data-rb="navy"
      />
      <path
        d="M150 36 L172 32 L168 54 Z"
        fill="#16244C"
        stroke="#16244C"
        strokeWidth="4"
        strokeLinejoin="round"
        data-rb="navy"
      />
    </svg>
  );
}

/** PNG varsa (/public/logo.png) onu, yoksa SVG'yi gösterir. */
export function Logo({ className, preferPng = true, title }: Props) {
  const [pngFailed, setPngFailed] = useState(false);

  if (preferPng && !pngFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo.png"
        alt={title ?? "Rehberim logosu"}
        className={className}
        onError={() => setPngFailed(true)}
      />
    );
  }
  return <LogoSvg className={className} title={title} />;
}

/** Yatay logo + yazı kilidi. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Logo className="h-9 w-9 shrink-0" />
      <span className="text-xl font-extrabold tracking-tight text-rehberim-navy">
        Rehber<span className="text-rehberim-accent">im</span>
      </span>
    </span>
  );
}
