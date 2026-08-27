/**
 * Küresel yükleme ekranı.
 *
 * Bu dosyanın varlığı sayfa geçişini anında yapar: menüye basıldığında
 * sunucu cevabı beklenmez, veri gelene dek bu ekran görünür.
 *
 * Tasarım notları:
 * - Renkler yalnız tema değişkenlerinden (--rb-*) gelir; açık/koyu temada
 *   zemin gövdeyle birebir aynıdır, "renk tonu geçişi" görünmez.
 * - dvh + fixed konumlama ile her cihazda gerçekten ekran ortası.
 * - Baykuşun göz kırptığı sade bir marka sahnesi; ekstra kütüphane yok.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: "var(--rb-bg)", minHeight: "100dvh" }}
      role="status"
      aria-label="Sayfa yükleniyor"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Baykuş gözleri — yavaşça kırpar */}
        <svg
          viewBox="0 0 96 48"
          className="h-12 w-24"
          aria-hidden
          focusable="false"
        >
          <g className="motion-safe:animate-blink-slow" style={{ transformOrigin: "48px 24px" }}>
            {/* Sclera: her temada yüzey rengi + ince kenarlık — açık temada
                zemine karışmaz, koyu temada kendiliğinden koyulaşır. */}
            <circle cx="28" cy="24" r="20" fill="var(--rb-surface)" stroke="var(--rb-border)" strokeWidth="1.5" />
            <circle cx="68" cy="24" r="20" fill="var(--rb-surface)" stroke="var(--rb-border)" strokeWidth="1.5" />
            <circle cx="28" cy="24" r="12" fill="#F59E0B" opacity="0.22" />
            <circle cx="68" cy="24" r="12" fill="#F59E0B" opacity="0.22" />
            <circle cx="28" cy="24" r="9" fill="var(--rb-text)" />
            <circle cx="68" cy="24" r="9" fill="var(--rb-text)" />
            <circle cx="31.5" cy="20.5" r="3" fill="var(--rb-surface)" />
            <circle cx="71.5" cy="20.5" r="3" fill="var(--rb-surface)" />
          </g>
        </svg>

        {/* Üç nokta — baykuş düşünüyor */}
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 animate-bounce rounded-full bg-rehberim-accent [animation-delay:0ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-rehberim-accent [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-rehberim-accent [animation-delay:300ms]" />
        </div>

        <p
          className="text-sm font-bold tracking-wide"
          style={{ color: "var(--rb-text-soft)" }}
        >
          Yükleniyor…
        </p>
      </div>
    </div>
  );
}
