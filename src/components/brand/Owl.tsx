"use client";

import { useState } from "react";

type Props = {
  className?: string;
  /** Set false to always render the inline SVG instead of trying /mascot.png */
  preferPng?: boolean;
  title?: string;
};

/** Markaya uygun (lacivert + turuncu) baykuş maskot — geometrik SVG.
 *
 * Rafine sürüm: pürüzsüz Bezier eğrileri, gövdede çift tonlu derinlik
 * gradyanı, iris+pupil+çift catchlight ile zenginleştirilmiş gözler,
 * yumuşatılmış kulak püskülleri ve incelikle yontulmuş gaga.
 * Aynı palet, aynı silüet — sadece daha "rendered" hissi.
 */
/**
 * Baykuşun ruh hali. Yalnızca gözleri (ve "mutlu"da yanak allığını)
 * değiştirir — silüet, renk ve oranlar her modda aynı kalır ki maskot
 * her yerde aynı karakter olarak tanınsın.
 */
export type BaykusRuhHali =
  | "normal"
  | "mutlu"
  | "dusunuyor"
  | "sasirmis"
  | "uykulu";

export function OwlSvg({
  className,
  title = "Rehberim baykuş maskotu",
  decorative = false,
  ruhHali = "normal",
  canli = false,
}: {
  className?: string;
  title?: string;
  /**
   * Yanında zaten aynı şeyi anlatan bir metin varsa (tanıtım sayfasının
   * kahraman bölümü gibi) maskot salt dekoratiftir; ekran okuyucunun
   * gereksiz yere "Rehberim baykuş maskotu" demesini engeller.
   */
  decorative?: boolean;
  /** Gözlerin ifadesi. */
  ruhHali?: BaykusRuhHali;
  /** true → arada bir göz kırpar (prefers-reduced-motion'a saygılıdır). */
  canli?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative || undefined}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{title}</title>}
      <defs>
        {/* Gövde derinliği: üstte canlı navy, altta hafif daha açık */}
        <linearGradient id="owl-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--rb-marka-navy-acik, #1B2A5A)" />
          <stop offset="60%" stopColor="var(--rb-marka-navy, #16244C)" />
          <stop offset="100%" stopColor="var(--rb-marka-navy-koyu, #13204A)" />
        </linearGradient>
        {/* Kanat tonu */}
        <linearGradient id="owl-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--rb-marka-navy-acik, #2A4380)" />
          <stop offset="100%" stopColor="var(--rb-marka-navy, #1F3060)" />
        </linearGradient>
        {/* Gaga küçük dolgu — düz turuncu yerine 2 tonlu */}
        <linearGradient id="owl-beak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--rb-accent-light-ch, 251 191 36))" />
          <stop offset="100%" stopColor="rgb(var(--rb-accent-ch, 245 158 11))" />
        </linearGradient>
      </defs>

      {/* kulak püskülleri — yumuşatılmış üçgenler */}
      <path
        d="M52 50 Q52 30 56 18 Q72 30 84 44 Q72 48 52 50 Z"
        fill="var(--rb-marka-navy, #16244C)"
        data-rb="navy"
      />
      <path
        d="M148 50 Q148 30 144 18 Q128 30 116 44 Q128 48 148 50 Z"
        fill="var(--rb-marka-navy, #16244C)"
        data-rb="navy"
      />

      {/* gövde — daha akışkan kontur */}
      <path
        d="M100 34
           C56 34 40 66 40 104
           C40 152 68 178 100 178
           C132 178 160 152 160 104
           C160 66 144 34 100 34 Z"
        fill="url(#owl-body)"
        data-rb="navy"
      />
      {/* gövdeye üst aydınlık (subtle highlight) */}
      <path
        d="M62 50 Q100 30 138 50 Q120 42 100 42 Q80 42 62 50 Z"
        fill="#ffffff"
        opacity="0.06"
      />

      {/* kanatlar (yan plumage) */}
      <path
        d="M44 98 C40 122 46 152 64 168 C58 142 58 118 62 100 Z"
        fill="url(#owl-wing)"
        data-rb="navy-mid"
      />
      <path
        d="M156 98 C160 122 154 152 136 168 C142 142 142 118 138 100 Z"
        fill="url(#owl-wing)"
        data-rb="navy-mid"
      />

      {/* yüz diski — hafif oval, içeride gölge ile derinlik */}
      <ellipse cx="100" cy="86" rx="50" ry="42" fill="color-mix(in srgb, var(--rb-marka-navy, #16244C) 70%, var(--rb-marka-navy-acik, #243A6E))" data-rb="navy-deep" />
      <ellipse
        cx="100"
        cy="78"
        rx="46"
        ry="32"
        fill="#ffffff"
        opacity="0.04"
      />

      {/* gözler — ruh haline göre değişen tek blok */}
      <Gozler ruhHali={ruhHali} canli={canli} />

      {/* gaga — yontulmuş baklava */}
      <path
        d="M100 96 Q95 102 91 108 Q96 114 100 118 Q104 114 109 108 Q105 102 100 96 Z"
        fill="url(#owl-beak)"
      />
      {/* gaga gölge çizgisi */}
      <path
        d="M100 108 L100 117"
        stroke="rgb(var(--rb-accent-deep-ch, 180 83 9))"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* karın şeritleri — incelmiş, daha ince yuvarlatma */}
      <rect x="84.5" y="120" width="8" height="40" rx="4" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
      <rect x="107.5" y="120" width="8" height="40" rx="4" fill="rgb(var(--rb-accent-ch, 245 158 11))" />

      {/* ayaklar */}
      <rect x="80" y="174" width="9" height="14" rx="3" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
      <rect x="111" y="174" width="9" height="14" rx="3" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
    </svg>
  );
}

/**
 * Baykuşun gözleri. Ruh hali yalnızca burada ele alınır; gövde kodu
 * tek bir yerde kalır, her mod için SVG kopyalanmaz.
 *
 * Konumlar: sol göz merkezi (78, 84), sağ göz merkezi (122, 84), yarıçap 22.
 */
function Gozler({
  ruhHali,
  canli,
}: {
  ruhHali: BaykusRuhHali;
  canli: boolean;
}) {
  // "mutlu" ve "uykulu" gözü zaten kapatıyor; üstüne kırpma koymak titrek durur.
  const kirpsin = canli && ruhHali !== "mutlu" && ruhHali !== "uykulu";

  if (ruhHali === "mutlu") {
    return (
      <g>
        {/* ters U kavisler — gülen göz */}
        <path
          d="M62 90 Q78 70 94 90"
          fill="none"
          stroke="#FBFCFF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M106 90 Q122 70 138 90"
          fill="none"
          stroke="#FBFCFF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* yanak allığı — sadece bu modda */}
        <ellipse cx="62" cy="103" rx="9" ry="5" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.35" />
        <ellipse cx="138" cy="103" rx="9" ry="5" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.35" />
      </g>
    );
  }

  if (ruhHali === "uykulu") {
    return (
      <g>
        <circle cx="78" cy="84" r="22" fill="#FBFCFF" />
        <circle cx="122" cy="84" r="22" fill="#FBFCFF" />
        {/* yarı kapalı göz kapakları */}
        <path
          d="M56 84 A22 22 0 0 1 100 84 Z"
          fill="url(#owl-body)"
          transform="translate(0,0)"
        />
        <path d="M100 84 A22 22 0 0 1 144 84 Z" fill="url(#owl-body)" />
        <circle cx="78" cy="90" r="8" fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
        <circle cx="122" cy="90" r="8" fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
      </g>
    );
  }

  // normal / dusunuyor / sasirmis — aynı yapı, farklı pupil
  const pupilR = ruhHali === "sasirmis" ? 13.5 : 11;
  // "dusunuyor" yukarı-sağa bakar
  const dx = ruhHali === "dusunuyor" ? 4 : 0;
  const dy = ruhHali === "dusunuyor" ? -4 : 0;

  return (
    <g
      className={kirpsin ? "motion-safe:animate-blink-slow" : undefined}
      style={kirpsin ? { transformOrigin: "100px 84px" } : undefined}
    >
      {/* sclera */}
      <circle cx="78" cy="84" r="22" fill="#FBFCFF" />
      <circle cx="122" cy="84" r="22" fill="#FBFCFF" />
      {/* iris ışıltısı — turuncu halka (markanın aksenti) */}
      <circle cx="78" cy="84" r="14" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.18" />
      <circle cx="122" cy="84" r="14" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.18" />
      {/* pupil */}
      <circle cx={78 + dx} cy={84 + dy} r={pupilR} fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
      <circle cx={122 + dx} cy={84 + dy} r={pupilR} fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
      {/* ana catchlight (büyük) */}
      <circle cx={82 + dx} cy={80 + dy} r="3.6" fill="#FFFFFF" />
      <circle cx={126 + dx} cy={80 + dy} r="3.6" fill="#FFFFFF" />
      {/* ikincil catchlight (küçük) — canlılık katar */}
      <circle cx={74 + dx} cy={88 + dy} r="1.4" fill="#FFFFFF" opacity="0.7" />
      <circle cx={118 + dx} cy={88 + dy} r="1.4" fill="#FFFFFF" opacity="0.7" />
    </g>
  );
}

/**
 * Baykuş "karşılama" duruşu: sağa doğru bakar ve sağdaki kanadını
 * (kendi sol kanadı) yana/aşağıya, forma doğru uzatır.
 * Rafine sürüm: gradyanlı gövde, iris+çift catchlight, yontulmuş gaga.
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
      <defs>
        <linearGradient id="owl2-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--rb-marka-navy-acik, #1B2A5A)" />
          <stop offset="60%" stopColor="var(--rb-marka-navy, #16244C)" />
          <stop offset="100%" stopColor="var(--rb-marka-navy-koyu, #13204A)" />
        </linearGradient>
        <linearGradient id="owl2-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--rb-marka-navy-acik, #2A4380)" />
          <stop offset="100%" stopColor="var(--rb-marka-navy, #1F3060)" />
        </linearGradient>
        <linearGradient id="owl2-beak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--rb-accent-light-ch, 251 191 36))" />
          <stop offset="100%" stopColor="rgb(var(--rb-accent-ch, 245 158 11))" />
        </linearGradient>
      </defs>

      {/* kulak püskülleri (yumuşatılmış, hafif sağa dönük) */}
      <path
        d="M55 52 Q55 32 58 18 Q74 32 88 46 Q72 50 55 52 Z"
        fill="var(--rb-marka-navy, #16244C)"
        data-rb="navy"
      />
      <path
        d="M151 52 Q151 32 148 18 Q132 32 118 44 Q134 50 151 52 Z"
        fill="var(--rb-marka-navy, #16244C)"
        data-rb="navy"
      />

      {/* uzanan sağ kanat — forma doğru */}
      <path
        d="M150 96
           C182 90 210 104 226 134
           C214 134 196 136 170 132
           C158 128 150 114 150 96 Z"
        fill="url(#owl2-wing)"
        data-rb="navy-mid"
      />
      {/* kanat ucu turuncu vurgu (yumuşatılmış) */}
      <path
        d="M204 122 C214 126 220 132 224 140 C216 138 209 136 202 132 Z"
        fill="rgb(var(--rb-accent-ch, 245 158 11))"
        opacity="0.95"
      />

      {/* gövde */}
      <path
        d="M104 36
           C60 36 44 68 44 106
           C44 154 72 180 104 180
           C136 180 164 154 164 106
           C164 68 148 36 104 36 Z"
        fill="url(#owl2-body)"
        data-rb="navy"
      />
      {/* highlight */}
      <path
        d="M66 52 Q104 32 142 52 Q124 44 104 44 Q84 44 66 52 Z"
        fill="#ffffff"
        opacity="0.06"
      />
      {/* sol kanat (toplu) */}
      <path
        d="M48 98 C44 122 50 152 68 168 C62 142 62 118 66 100 Z"
        fill="url(#owl2-wing)"
        data-rb="navy-mid"
      />

      {/* yüz diski */}
      <ellipse cx="104" cy="88" rx="50" ry="42" fill="color-mix(in srgb, var(--rb-marka-navy, #16244C) 70%, var(--rb-marka-navy-acik, #243A6E))" data-rb="navy-deep" />
      <ellipse cx="104" cy="80" rx="46" ry="32" fill="#ffffff" opacity="0.04" />

      {/* gözler — sağa bakıyor (sclera) */}
      <circle cx="82" cy="86" r="22" fill="#FBFCFF" />
      <circle cx="126" cy="86" r="22" fill="#FBFCFF" />
      {/* iris ışıltısı */}
      <circle cx="89" cy="86" r="14" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.18" />
      <circle cx="133" cy="86" r="14" fill="rgb(var(--rb-accent-ch, 245 158 11))" opacity="0.18" />
      {/* pupil */}
      <circle cx="89" cy="86" r="11" fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
      <circle cx="133" cy="86" r="11" fill="var(--rb-marka-navy, #16244C)" data-rb="navy" />
      {/* ana catchlight */}
      <circle cx="93" cy="82" r="3.6" fill="#FFFFFF" />
      <circle cx="137" cy="82" r="3.6" fill="#FFFFFF" />
      {/* ikincil catchlight */}
      <circle cx="85" cy="90" r="1.4" fill="#FFFFFF" opacity="0.7" />
      <circle cx="129" cy="90" r="1.4" fill="#FFFFFF" opacity="0.7" />

      {/* gaga — yontulmuş */}
      <path
        d="M104 98 Q99 104 95 110 Q100 116 104 120 Q108 116 113 110 Q109 104 104 98 Z"
        fill="url(#owl2-beak)"
      />
      <path
        d="M104 110 L104 119"
        stroke="rgb(var(--rb-accent-deep-ch, 180 83 9))"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* karın şeritleri */}
      <rect x="88.5" y="122" width="8" height="40" rx="4" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
      <rect x="111.5" y="122" width="8" height="40" rx="4" fill="rgb(var(--rb-accent-ch, 245 158 11))" />

      {/* ayaklar */}
      <rect x="84" y="176" width="9" height="14" rx="3" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
      <rect x="115" y="176" width="9" height="14" rx="3" fill="rgb(var(--rb-accent-ch, 245 158 11))" />
    </svg>
  );
}

/** PNG varsa (/public/mascot.png) onu, yoksa SVG'yi gösterir. */
/**
 * Varsayılan olarak yerleşik SVG maskotu çizer.
 *
 * `preferPng` yalnızca public/mascot.png gerçekten varsa açılmalıdır:
 * img hatası sunucudan gelen HTML yüklenirken, React hidrasyonundan ÖNCE
 * tetiklenir; o an onError bağlı olmadığı için SVG yedeği devreye giremez
 * ve kullanıcı kırık görsel simgesi görür (Logo bileşeninde aynı hata
 * canlıda her sayfada görünüyordu).
 */
export function Owl({ className, preferPng = false, title }: Props) {
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
