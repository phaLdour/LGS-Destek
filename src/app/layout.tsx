import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { KurulumDaveti } from "@/components/pwa/KurulumDaveti";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { TEMA_ILK_BETIK } from "@/lib/tema";
import { VARSAYILAN_TEMA_ID, temaBul } from "@/lib/temalar";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lgs-destek.vercel.app",
  ),
  title: "Rehberim — LGS Çalışma Platformu",
  description:
    "Türkiye LGS müfredatındaki tüm derslere ve konulara çalışabileceğin akıllı çalışma platformu.",
  // Link paylaşıldığında (WhatsApp, Instagram, Discord...) görünen kart
  openGraph: {
    title: "Rehberim — LGS Çalışma Platformu",
    description:
      "2.500+ soru, 9 yılın çıkmış soruları, 1v1 düello ve akıllı çalışma planı.",
    url: "/",
    siteName: "Rehberim",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rehberim" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehberim — LGS Çalışma Platformu",
    description:
      "2.500+ soru, 9 yılın çıkmış soruları, 1v1 düello ve akıllı çalışma planı.",
    images: ["/og.png"],
  },
  manifest: "/manifest.json",
  applicationName: "Rehberim",
  appleWebApp: {
    capable: true,
    title: "Rehberim",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  // Mobil tarayıcı çubuğu. Sunucudan gelen değer varsayılan temanın yüzey
  // rengidir; öğrencinin seçtiği tema yüklenince src/lib/tema.ts bunu
  // günceller (ve sayfa geçişlerinde geri dönmesini engeller).
  themeColor: temaBul(VARSAYILAN_TEMA_ID).renkler.surface,
  width: "device-width",
  initialScale: 1,
  // maximumScale/userScalable KALDIRILDI: yakınlaştırma kapalıyken görme
  // güçlüğü olan kullanıcı sayfayı büyütemiyordu (WCAG 1.4.4 ihlali).
  // Tarayıcı varsayılanı = kullanıcı serbestçe zoom yapabilir.
  // Telefonda içerik çentik/durum çubuğunun altına uzanabilsin;
  // gerçek koruma aşağıdaki safe-area padding'leriyle sağlanır.
  viewportFit: "cover",
};

// İlk paint'ten önce seçili temayı uygula (FOUC önleme).
// Tek kaynak: src/lib/temalar.ts — betik oradan üretilir.
const themeInit = TEMA_ILK_BETIK;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          // FOUC önleme: head'den önce class uygulanır
          dangerouslySetInnerHTML={{ __html: themeInit }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {/* Kök layout: tanıtım sayfası AppShell kullanmadığı için davet
            burada duruyor — ilk ziyaretçi de görebilsin. */}
        <KurulumDaveti />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
