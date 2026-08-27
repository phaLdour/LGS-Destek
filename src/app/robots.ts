import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lgs-destek.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Kişiye özel ve API sayfaları taranmasın
      disallow: ["/api/", "/dashboard", "/hatalarim", "/rekabet", "/profile", "/rozetlerim"],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
