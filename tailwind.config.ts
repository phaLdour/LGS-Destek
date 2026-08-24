import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rehberim: {
          navy: "#16244C",
          "navy-dark": "#0E1838",
          "navy-light": "#243A6E",
          accent: "#F59E0B",
          "accent-dark": "#D97706",
          "accent-deep": "#B45309",
          "accent-light": "#FBBF24",
          surface: "#FFFFFF",
          muted: "#F4F6FB",
          border: "#E2E6F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Çok katmanlı, premium gölge sistemi — sert tek katmanı katmanlı
        // hassas tonlara çevirir; kart kenarlarına 1px subpiksel keskinlik
        // veren ince inset highlight içerir.
        card: "0 1px 2px rgba(22, 36, 76, 0.04), 0 2px 8px -2px rgba(22, 36, 76, 0.06), 0 8px 24px -16px rgba(22, 36, 76, 0.08)",
        soft: "0 1px 2px rgba(22, 36, 76, 0.06), 0 4px 12px -4px rgba(22, 36, 76, 0.10), 0 16px 40px -20px rgba(22, 36, 76, 0.18)",
        elevated:
          "0 1px 2px rgba(22, 36, 76, 0.06), 0 8px 20px -8px rgba(22, 36, 76, 0.14), 0 24px 56px -28px rgba(22, 36, 76, 0.24)",
        "ring-accent": "0 0 0 4px rgba(245, 158, 11, 0.18)",
        "ring-navy": "0 0 0 4px rgba(22, 36, 76, 0.10)",
        "inner-hairline":
          "inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(22, 36, 76, 0.04)",
      },
      transitionTimingFunction: {
        // Premium yumuşak yay eğrisi — Tailwind'in default ease-out'undan
        // hafif daha "settled" hissi verir.
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        snap: "cubic-bezier(0.34, 1.16, 0.64, 1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "blink-slow": {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "96%": { transform: "scaleY(0.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scale-in 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
        float: "float 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blink-slow": "blink-slow 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
