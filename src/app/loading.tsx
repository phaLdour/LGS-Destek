import { OwlSvg } from "@/components/brand/Owl";

/**
 * Küresel yükleme ekranı.
 *
 * Bu dosyanın varlığı sayfa geçişini anında yapar: menüye basıldığında
 * sunucu cevabı beklenmez, veri gelene dek bu ekran görünür.
 *
 * Sahne: baykuş ortada minicik ve saydam belirir, yumuşak bir yayla
 * büyüyerek oturur (fade-in + scale); ardından iki farklı tempolu
 * salınımın birleşimiyle havada süzülür — yörünge her turda biraz
 * farklı göründüğü için mekanik değil, canlı hissettirir. Altındaki
 * gölge, yükselişle birlikte küçülüp soluklaşır.
 *
 * Animasyon sınıfları globals.css'te (rb-owl-*): yalnız transform/opacity
 * kullanırlar, telefonda da akıcıdır; prefers-reduced-motion'da uçuş
 * kapanır. Renkler tema değişkenlerinden gelir — iki temada da zemin
 * gövdeyle birebir aynıdır.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{ backgroundColor: "var(--rb-bg)", minHeight: "100dvh" }}
      role="status"
      aria-label="Sayfa yükleniyor"
    >
      <div className="flex flex-col items-center">
        {/* Uçuş sahnesi: giriş → salınım (dış) → süzülme (iç) */}
        <div className="rb-owl-enter">
          <div className="rb-owl-sway">
            <div className="rb-owl-bob">
              <OwlSvg
                className="h-24 w-24 drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)]"
                decorative
              />
            </div>
          </div>
        </div>

        {/* Yer gölgesi — baykuşla aynı salınımı izler, yükselince küçülür */}
        <div aria-hidden className="rb-owl-sway-x mt-3">
          <div
            className="rb-owl-shadow h-2.5 w-16 rounded-full"
            style={{ backgroundColor: "var(--rb-text)", opacity: 0.28, filter: "blur(4px)" }}
          />
        </div>

        <div className="rb-fade-up mt-7 flex flex-col items-center gap-3">
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
    </div>
  );
}
