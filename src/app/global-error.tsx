"use client";

import { useEffect } from "react";
import { hataBildir } from "@/lib/hataBildir";

/**
 * Kök layout'un kendisi çöktüğünde görünen ekran — son çare.
 *
 * Burada AppShell, tema değişkenleri ve Tailwind sınıfları GÜVENİLMEZ
 * (layout çökmüş olabilir), o yüzden stiller satır içi yazılır ve
 * kendi <html>/<body> etiketlerimizi çiziyoruz. Next.js bu bileşen için
 * bunu şart koşar.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    hataBildir(error, error.digest ? `kok:${error.digest}` : "kok");
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f4f6fb",
          color: "#16244c",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 380, textAlign: "center" }}>
          <h1 style={{ fontSize: 22, margin: "0 0 10px" }}>
            Rehberim açılamadı
          </h1>
          <p style={{ margin: "0 0 20px", color: "#5b678a", lineHeight: 1.6 }}>
            Beklenmedik bir hata oldu ve bize bildirildi. Yeniden denemek
            çoğu zaman yeterli oluyor.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              width: "100%",
              minHeight: 44,
              border: 0,
              borderRadius: 12,
              background: "#16244c",
              color: "#fff",
              font: "inherit",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Yeniden dene
          </button>
        </div>
      </body>
    </html>
  );
}
