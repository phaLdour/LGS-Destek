import type { MetadataRoute } from "next";
import { OKULLAR } from "@/content/okullar";
import { getAllSubjects } from "@/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://lgs-destek.vercel.app";

/**
 * Arama motorları için site haritası. Giriş gerektiren sayfalar
 * (dashboard, hatalarım, rekabet...) bilerek dışarıda: arama motoru
 * onları zaten göremez, listelemek gürültü olur.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const sabitler: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/okullar`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/sozluk`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/puan-hesapla`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE}/gizlilik`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const okullar: MetadataRoute.Sitemap = OKULLAR.map((o) => ({
    url: `${SITE}/okullar/${o.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const dersler: MetadataRoute.Sitemap = getAllSubjects().map((s) => ({
    url: `${SITE}/ders/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...sabitler, ...okullar, ...dersler];
}
