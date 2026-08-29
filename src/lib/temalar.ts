/**
 * TEMA KATALOĞU — "hyperpersonalization": öğrenci sitenin rengini kendi
 * sevdiği dünyaya göre seçer (satranç sitelerindeki taş/tahta teması gibi).
 *
 * Tek kaynak burasıdır. globals.css'teki tema blokları bu dosyadan
 * `node tools/tema-css-uret.mjs` ile ÜRETİLİR; elle düzenlenmez.
 *
 * SİTE KURALI (kalıcı): Yazı, arkasındaki renge göre okunaklı olmak
 * zorundadır. Her tema `tools/tema-kontrast.mjs` ile WCAG kontrast
 * ölçümünden geçer; geçemeyen tema siteye giremez (derleme öncesi
 * `npm run tema-kontrol` çalıştırılır).
 */

export type TemaAilesi = "acik" | "koyu";

export type Tema = {
  id: string;
  ad: string;
  emoji: string;
  /** Açık aile mi koyu aile mi — koyu temalarda html.dark sınıfı eklenir. */
  aile: TemaAilesi;
  /** Seçici kutusunda gösterilecek kısa tanıtım. */
  aciklama: string;
  renkler: {
    bg: string;
    surface: string;
    surface2: string;
    border: string;
    text: string;
    /** Yumuşak (ikincil) yazı rengi — %55-78 opaklık yerine düz renk. */
    textSoft: string;
    navy: string;
    navyDark: string;
    navyLight: string;
    accent: string;
    accentDark: string;
    accentDeep: string;
    accentLight: string;
    scrollbar: string;
    scrollbarHover: string;
    /** Vurgu rengiyle DOLU zeminin üstündeki yazı rengi. */
    onAccent: string;
  };
};

export const TEMALAR: Tema[] = [
  /* ─────────────────────────── AÇIK AİLE ─────────────────────────── */
  {
    id: "klasik",
    ad: "Klasik",
    emoji: "🔵",
    aile: "acik",
    aciklama: "Rehberim'in kendi laciverti — sakin ve tanıdık.",
    renkler: {
      bg: "#f4f6fb", surface: "#ffffff", surface2: "#f4f6fb", border: "#d7dbe4",
      text: "#16244c", textSoft: "#5b678a",
      navy: "#16244c", navyDark: "#0e1838", navyLight: "#243a6e",
      accent: "#f59e0b", accentDark: "#f6ac2d", accentDeep: "#a15c07", accentLight: "#fbbf24",
      scrollbar: "#c7cee0", scrollbarHover: "#aab4d0", onAccent: "#16244c",
    },
  },
  {
    id: "pembe",
    ad: "Şeker Pembe",
    emoji: "🌸",
    aile: "acik",
    aciklama: "Pembe ve mor tonları; neşeli ama gözü yormayan.",
    renkler: {
      bg: "#fdf2f8", surface: "#ffffff", surface2: "#fce7f3", border: "#f3cfe4",
      text: "#4a1035", textSoft: "#7d3a63",
      navy: "#6d2350", navyDark: "#4e1739", navyLight: "#8e3a6e",
      accent: "#ec4899", accentDark: "#ef62a7", accentDeep: "#9d174d", accentLight: "#f9a8d4",
      scrollbar: "#efc3dd", scrollbarHover: "#e39ec8", onAccent: "#3f0b29",
    },
  },
  {
    id: "lavanta",
    ad: "Lavanta",
    emoji: "💜",
    aile: "acik",
    aciklama: "Yumuşak mor; uzun çalışmalarda dinlendirici.",
    renkler: {
      bg: "#f5f3ff", surface: "#ffffff", surface2: "#ede9fe", border: "#dcd5fb",
      text: "#2e1065", textSoft: "#5b4499",
      navy: "#4c1d95", navyDark: "#341068", navyLight: "#6d28d9",
      accent: "#8457ea", accentDark: "#6f49c5", accentDeep: "#5b21b6", accentLight: "#c4b5fd",
      scrollbar: "#d3c8f7", scrollbarHover: "#b9a7f0", onAccent: "#ffffff",
    },
  },
  {
    id: "nane",
    ad: "Nane",
    emoji: "🌿",
    aile: "acik",
    aciklama: "Ferah yeşil; sabah çalışmalarına iyi gelir.",
    renkler: {
      bg: "#f0fdf4", surface: "#ffffff", surface2: "#dcfce7", border: "#b2e4c3",
      text: "#0f3626", textSoft: "#3d6b55",
      navy: "#14532d", navyDark: "#0a3a1e", navyLight: "#166534",
      accent: "#10b981", accentDark: "#31c393", accentDeep: "#047857", accentLight: "#6ee7b7",
      scrollbar: "#b6e6c8", scrollbarHover: "#8fd4ab", onAccent: "#04291b",
    },
  },
  {
    id: "deniz",
    ad: "Deniz Kabuğu",
    emoji: "🐚",
    aile: "acik",
    aciklama: "Açık turkuaz; sahil sabahı gibi berrak.",
    renkler: {
      bg: "#ecfeff", surface: "#ffffff", surface2: "#cffafe", border: "#a1dde6",
      text: "#0a3742", textSoft: "#356c7a",
      navy: "#0e4c5b", navyDark: "#083440", navyLight: "#146277",
      accent: "#06b6d4", accentDark: "#29c0da", accentDeep: "#0e7490", accentLight: "#67e8f9",
      scrollbar: "#a8e4ee", scrollbarHover: "#7fd3e2", onAccent: "#032c36",
    },
  },
  {
    id: "kagit",
    ad: "Kâğıt",
    emoji: "📜",
    aile: "acik",
    aciklama: "Defter sayfası sıcaklığında sepya; ekran parlaması az.",
    renkler: {
      bg: "#f6f1e7", surface: "#fffdf8", surface2: "#f1e9da", border: "#e0d5bf",
      text: "#3b2e1e", textSoft: "#6d5a41",
      navy: "#4a3722", navyDark: "#33240f", navyLight: "#6b5334",
      accent: "#c97b2c", accentDark: "#d18d4a", accentDeep: "#8a4f15", accentLight: "#e3a95f",
      scrollbar: "#dcceb4", scrollbarHover: "#c6b394", onAccent: "#2a1d0d",
    },
  },

  /* ─────────────────────────── KOYU AİLE ─────────────────────────── */
  {
    id: "gece",
    ad: "Gece Lacivert",
    emoji: "🌙",
    aile: "koyu",
    aciklama: "Rehberim'in koyu modu — gece çalışmaları için.",
    renkler: {
      bg: "#0b1228", surface: "#16244c", surface2: "#1f3060", border: "#2a3b66",
      text: "#f1f4ff", textSoft: "#b8c2e0",
      navy: "#16244c", navyDark: "#080e22", navyLight: "#243a6e",
      accent: "#f59e0b", accentDark: "#f6ac2d", accentDeep: "#fbbf24", accentLight: "#fdd464",
      scrollbar: "#2a3b66", scrollbarHover: "#3a4d80", onAccent: "#0e1838",
    },
  },
  {
    id: "mor",
    ad: "Gece Moru",
    emoji: "🔮",
    aile: "koyu",
    aciklama: "Mor ve fuşya; koyu ama canlı.",
    renkler: {
      bg: "#17091f", surface: "#2a1038", surface2: "#3a1a4c", border: "#4c2464",
      text: "#f8ecff", textSoft: "#cbaede",
      navy: "#2a1038", navyDark: "#12061a", navyLight: "#46205c",
      accent: "#e879f9", accentDark: "#eb8cfa", accentDeep: "#f0abfc", accentLight: "#f5d0fe",
      scrollbar: "#4c2464", scrollbarHover: "#6a3489", onAccent: "#2a0b33",
    },
  },
  {
    id: "orman",
    ad: "Orman",
    emoji: "🌲",
    aile: "koyu",
    aciklama: "Koyu yeşil; derin odak için sessiz bir dünya.",
    renkler: {
      bg: "#071a12", surface: "#0f2c1f", surface2: "#17402d", border: "#205038",
      text: "#e9fbf1", textSoft: "#a6cbb6",
      navy: "#0f2c1f", navyDark: "#04120b", navyLight: "#1a4630",
      accent: "#34d399", accentDark: "#50d9a7", accentDeep: "#6ee7b7", accentLight: "#a7f3d0",
      scrollbar: "#205038", scrollbarHover: "#2d6b4b", onAccent: "#052015",
    },
  },
  {
    id: "okyanus",
    ad: "Okyanus",
    emoji: "🌊",
    aile: "koyu",
    aciklama: "Derin su mavisi; serin ve odaklı.",
    renkler: {
      bg: "#04212b", surface: "#0a3341", surface2: "#114757", border: "#1a5c6e",
      text: "#e8fbff", textSoft: "#9fcbd8",
      navy: "#0a3341", navyDark: "#02151c", navyLight: "#125166",
      accent: "#22d3ee", accentDark: "#41d9f0", accentDeep: "#67e8f9", accentLight: "#a5f3fc",
      scrollbar: "#1a5c6e", scrollbarHover: "#267a90", onAccent: "#052730",
    },
  },
  {
    id: "gunbatimi",
    ad: "Gün Batımı",
    emoji: "🌅",
    aile: "koyu",
    aciklama: "Koyu bordo ve mercan; akşam çalışmalarına sıcak bir zemin.",
    renkler: {
      bg: "#1c0b10", surface: "#2e1218", surface2: "#431a22", border: "#5a252e",
      text: "#ffeee9", textSoft: "#d7ada4",
      navy: "#2e1218", navyDark: "#150508", navyLight: "#4a1d26",
      accent: "#fb7185", accentDark: "#fc8596", accentDeep: "#fda4af", accentLight: "#fecdd3",
      scrollbar: "#5a252e", scrollbarHover: "#7a3540", onAccent: "#2a0a10",
    },
  },
  {
    id: "komur",
    ad: "Kömür",
    emoji: "⬛",
    aile: "koyu",
    aciklama: "Nötr koyu gri; OLED ekranlarda pil dostu.",
    renkler: {
      bg: "#0a0a0b", surface: "#16181d", surface2: "#1f2229", border: "#373a42",
      text: "#f3f5f8", textSoft: "#b0b6c0",
      navy: "#16181d", navyDark: "#050506", navyLight: "#24272f",
      accent: "#fb923c", accentDark: "#fca157", accentDeep: "#fdba74", accentLight: "#fed7aa",
      scrollbar: "#2c3038", scrollbarHover: "#3e434d", onAccent: "#17120c",
    },
  },
];

export const VARSAYILAN_TEMA_ID = "klasik";

export function temaBul(id: string | null | undefined): Tema {
  return TEMALAR.find((t) => t.id === id) ?? TEMALAR[0];
}

/** "#16244c" → "22 36 76" (Tailwind kanal biçimi). */
export function kanal(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16,
  );
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Bir temanın CSS değişken bloğunu üretir (globals.css için). */
export function temaCssBlogu(t: Tema): string {
  const r = t.renkler;
  return [
    `html[data-tema="${t.id}"] {`,
    `  --rb-bg: ${r.bg};`,
    `  --rb-surface: ${r.surface};`,
    `  --rb-surface-2: ${r.surface2};`,
    `  --rb-border: ${r.border};`,
    `  --rb-text: ${r.text};`,
    `  --rb-text-soft: ${r.textSoft};`,
    `  --rb-scrollbar: ${r.scrollbar};`,
    `  --rb-scrollbar-hover: ${r.scrollbarHover};`,
    `  --rb-on-accent: ${r.onAccent};`,
    `  --rb-navy-ch: ${kanal(r.navy)};`,
    `  --rb-navy-dark-ch: ${kanal(r.navyDark)};`,
    `  --rb-navy-light-ch: ${kanal(r.navyLight)};`,
    `  --rb-accent-ch: ${kanal(r.accent)};`,
    `  --rb-accent-dark-ch: ${kanal(r.accentDark)};`,
    `  --rb-accent-deep-ch: ${kanal(r.accentDeep)};`,
    `  --rb-accent-light-ch: ${kanal(r.accentLight)};`,
    `  --rb-surface-ch: ${kanal(r.surface)};`,
    `  --rb-muted-ch: ${kanal(r.surface2)};`,
    `  --rb-border-ch: ${kanal(r.border)};`,
    `  color-scheme: ${t.aile === "koyu" ? "dark" : "light"};`,
    `}`,
    // Açık ailede kart zemini saf beyaz değilse (ör. Kâğıt teması), Tailwind'in
    // bg-white kartları da temanın kâğıt tonuna uysun — yoksa krem sayfada
    // bembeyaz kartlar yamalı görünüyor.
    ...(t.aile === "acik" && r.surface.toLowerCase() !== "#ffffff"
      ? [
          "",
          `html[data-tema="${t.id}"] .bg-white {`,
          `  background-color: ${r.surface};`,
          `}`,
        ]
      : []),
  ].join("\n");
}
