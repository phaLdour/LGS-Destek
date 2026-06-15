import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rehberim — LGS Çalışma Platformu",
  description:
    "Türkiye LGS müfredatındaki tüm derslere ve konulara çalışabileceğin akıllı çalışma platformu.",
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
  themeColor: "#16244C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// İlk paint'ten önce tema sınıfını uygula (FOUC önleme).
const themeInit = `
(function(){try{
  var k='rehberim:theme';
  var v=localStorage.getItem(k);
  var dark=v==='dark'||(!v && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if(dark) document.documentElement.classList.add('dark');
}catch(e){}})();
`;

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
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
