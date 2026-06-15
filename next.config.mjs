/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Büyük ikon paketinin yalnız kullanılan ikonlarını bundle'a al
  // (lucide-react'in tamamı yerine import bazında ağaç budama).
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // İmaj optimizasyonu: modern formatlar önce denenir. Çıkmış soru
  // görüntüleri zaten WebP olarak ön-optimize edilmiştir (unoptimized
  // flag ile doğrudan servis edilir); bu ayar gelecekteki <Image>
  // kullanımları için modern format pazarlığını açar.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Üretim derlemesinde kaynak haritalarını kapat (daha küçük çıktı,
  // daha hızlı build) — hata ayıklama dev modda zaten açık.
  productionBrowserSourceMaps: false,
};

export default nextConfig;
