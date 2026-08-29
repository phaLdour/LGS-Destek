/**
 * CİHAZ ÖNBELLEĞİ — baykuşa aynı soruyu bir daha soran öğrenci için.
 *
 * Sunucudaki öğrenen önbelleğin (ai_onbellek) bir adım öncesi: cevap bu
 * cihazda daha önce alınmışsa ağa hiç çıkılmaz. Üç kazanç: anında cevap,
 * çevrimdışıyken bile çalışma, sunucuya gereksiz istek gitmemesi.
 *
 * Gizlilik: veriler yalnız bu tarayıcıda durur ve çıkış yapıldığında
 * (baykusOnbellekleriniTemizle) silinir.
 */

import { onbellegeUygunMu, parmakIzi } from "@/lib/aiOnbellek";

const ANAHTAR = "rehberim:baykus-yanit-onbellek";
const ENFAZLA = 60;
/** 7 gün — site güncellenince eski cevap takılıp kalmasın. */
const OMUR_MS = 7 * 24 * 60 * 60 * 1000;

export type YerelYanit = {
  reply: string;
  navigate: string | null;
  topicRoute: string | null;
};

type Kayit = YerelYanit & { t: number };

function tabloOku(): Record<string, Kayit> {
  if (typeof window === "undefined") return {};
  try {
    const ham = window.sessionStorage.getItem(ANAHTAR);
    return ham ? (JSON.parse(ham) as Record<string, Kayit>) : {};
  } catch {
    return {};
  }
}

function tabloYaz(t: Record<string, Kayit>) {
  try {
    window.sessionStorage.setItem(ANAHTAR, JSON.stringify(t));
  } catch {
    /* depolama kapalı — önbellek olmadan da çalışır */
  }
}

export function yerelYanitAra(soru: string): YerelYanit | null {
  const iz = parmakIzi(soru);
  if (!iz) return null;
  const tablo = tabloOku();
  const k = tablo[iz];
  if (!k) return null;
  if (Date.now() - k.t > OMUR_MS) return null;
  return { reply: k.reply, navigate: k.navigate, topicRoute: k.topicRoute };
}

export function yerelYanitYaz(soru: string, yanit: YerelYanit) {
  const iz = parmakIzi(soru);
  if (!iz || !yanit.reply) return;
  // Sunucu önbelleğiyle AYNI kural: kişiye özel ("bu hafta 4 saat çalıştın")
  // ve zamana bağlı ("sınava 288 gün kaldı") cevaplar saklanmaz — yoksa
  // geri sayım cihazda donar.
  if (!onbellegeUygunMu(soru, yanit.reply).uygun) return;
  const tablo = tabloOku();
  tablo[iz] = { ...yanit, t: Date.now() };
  // En eskiden başlayarak buda
  const anahtarlar = Object.keys(tablo);
  if (anahtarlar.length > ENFAZLA) {
    anahtarlar
      .sort((a, b) => tablo[a].t - tablo[b].t)
      .slice(0, anahtarlar.length - ENFAZLA)
      .forEach((a) => delete tablo[a]);
  }
  tabloYaz(tablo);
}

export function yerelOnbellegiTemizle() {
  try {
    window.sessionStorage.removeItem(ANAHTAR);
  } catch {
    /* yut */
  }
}
