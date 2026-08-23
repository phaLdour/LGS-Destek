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
      {/* kitap — açık sayfalar dolu navy, vurgu kontur ile */}
      <path
        d="M24 70 C48 58 76 58 100 70 L100 152 C76 140 48 140 24 152 Z"
        fill="#16244C"
        data-rb="navy"
      />
      <path
        d="M176 70 C152 58 124 58 100 70 L100 152 C124 140 152 140 176 152 Z"
        fill="#243A6E"
        data-rb="navy-mid"
      />
      {/* sayfa katları için ince çizgiler */}
      <path
        d="M44 80 L88 86 M44 100 L88 100 M44 118 L88 124"
        stroke="#FBBF24"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M112 86 L156 80 M112 100 L156 100 M112 124 L156 118"
        stroke="#FBBF24"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* kitabın orta cildi */}
      <path
        d="M100 70 L100 152"
        stroke="#0E1838"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* hedef — dolu daire halkalı */}
      <circle cx="112" cy="96" r="40" fill="#16244C" data-rb="navy" />
      <circle cx="112" cy="96" r="30" fill="#FFFFFF" />
      <circle cx="112" cy="96" r="22" fill="#F59E0B" />
      <circle cx="112" cy="96" r="10" fill="#16244C" data-rb="navy" />
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
        fill="#F59E0B"
        stroke="#16244C"
        strokeWidth="4"
        strokeLinejoin="round"
        data-rb="navy"
      />
    </svg>
  );
}

/**
 * Varsayılan olarak yerleşik SVG logoyu çizer.
 *
 * `preferPng` yalnızca public/logo.png gerçekten varsa açılmalıdır: img
 * hatası sunucudan gelen HTML yüklenirken, React hidrasyonundan ÖNCE
 * tetiklenir; o an onError bağlı olmadığı için SVG yedeği devreye giremez
 * ve kullanıcı kırık görsel simgesi görür.
 */
export function Logo({ className, preferPng = false, title }: Props) {
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
    <span
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <Logo className="h-9 w-9 shrink-0 transition-transform duration-300 ease-snap group-hover:rotate-[-3deg] group-hover:scale-105" />
      <span className="text-xl font-extrabold tracking-tight text-rehberim-navy">
        Rehber<span className="text-rehberim-accent">im</span>
      </span>
    </span>
  );
}
