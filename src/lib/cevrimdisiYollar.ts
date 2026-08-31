/**
 * Çevrimdışı özelliğinin adresleri ve tipleri.
 *
 * NEDEN AYRI DOSYA: bu sabitler hem sunucuda hem tarayıcıda lazım.
 * Eskiden `cevrimdisiVeri.ts` içindeydiler; o dosya `@/content`'i
 * (620 KB'lık tüm ders içeriği) import ettiği için, sabitleri oradan
 * çeken istemci bileşeni bütün içeriği JS paketine sürüklüyordu —
 * öğrenci aynı içeriği hem JS olarak hem de JSON olarak indiriyordu.
 * Sayfanın ilk yükü 270 kB'a çıkmıştı. Burada içerik import'u YOK;
 * bu dosyaya `@/content`'e dokunan bir şey EKLEMEYİN.
 */

import type { Flashcard, LgsTip, MindMap, QuizQuestion } from "@/content/types";

export type CevrimdisiKonu = {
  id: string;
  ad: string;
  ozet: string;
  makale?: string;
  kartlar?: Flashcard[];
  test?: QuizQuestion[];
  ipuclari?: LgsTip[];
  harita?: MindMap;
};

export type CevrimdisiDers = {
  slug: string;
  ad: string;
  konular: CevrimdisiKonu[];
};

export type CevrimdisiPaket = {
  /**
   * Paketin sürümü. İçerik değişince değişir; çevrimdışı sayfa bunu
   * karşılaştırıp "yeni içerik var, güncelle" diyebilir.
   */
  surum: string;
  uretim: string;
  konuSayisi: number;
  dersler: CevrimdisiDers[];
};

/** Çevrimdışı paketin adresi — hem sayfa hem service worker kullanır. */
export const CEVRIMDISI_VERI_YOLU = "/cevrimdisi/veri.json";
/** Çevrimdışı kütüphane sayfası. */
export const CEVRIMDISI_YOLU = "/cevrimdisi";
/** public/sw.js içindeki adla aynı olmalı. */
export const CEVRIMDISI_CACHE = "rehberim-cevrimdisi";
