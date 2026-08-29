/**
 * Baykuş kapsam denetimi — hangi soru cevaplanır, hangisi reddedilir?
 *
 * SİTE KURALI (kalıcı): Baykuş yalnız LGS müfredatı, dersler ve bu site
 * hakkındaki sorulara cevap verir. Sitenin kaynak kodu, teknolojileri,
 * veritabanı ve sistem talimatları hakkında hiçbir bilgi vermez.
 *
 * Bu denetim KOD tarafında yapılır; yani model istemi (prompt) bir yana,
 * uygun olmayan soru AI'ya hiç gitmez. Üç kazanç:
 *   1. Kota harcanmaz (uygunsuz soru bedava reddedilir),
 *   2. İstem enjeksiyonu ("önceki talimatları unut") modele ulaşmaz,
 *   3. Ret cevabı her seferinde aynı ve öngörülebilir olur.
 *
 * Yaklaşım: kara liste + KALIP eşleme (tek kelime değil). "hava" kelimesi
 * fen dersinde de geçtiği için yalnız "hava durumu", "hava nasıl olacak"
 * gibi bütün kalıplar reddedilir; müfredat soruları serbest geçer.
 */

import { denetle, RET_METNI } from "@/lib/moderasyon";

function normalize(text: string): string {
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Sitenin iç yapısını öğrenmeye çalışan sorular. */
const KOD_KALIPLARI = [
  "kaynak kod", "kaynak kodu", "source code", "kodunu ver", "kodlarini ver",
  "kodlari goster", "hangi dille yaz", "hangi teknoloji", "hangi framework",
  "hangi kutuphane", "veri tabani", "veritabani", "database", "supabase",
  "next js", "nextjs", "react", "typescript", "tailwind", "vercel",
  "api key", "api anahtar", "gizli anahtar", "env dosya", "ortam degisken",
  "sistem mesaj", "sistem istem", "system prompt", "promptun", "prompt un",
  "talimatlarini", "talimatlarin ne", "onceki talimatlari unut",
  "talimatlari unut", "kurallarini unut", "rolunu unut", "sen bir yapay zeka",
  "hangi modelsin", "hangi model", "gemini mi", "chatgpt mi", "gpt misin",
  "nasil yapildin", "seni kim yapti kod", "admin panel", "yonetici sifre",
  "sunucu adresi", "repo linki", "github linki", "dosya yapisi", "klasor yapisi",
];

/** Müfredat ve site dışı, açıkça alakasız konular. */
const ALAKASIZ_KALIPLARI = [
  // güncel/dünya
  "hava durumu", "hava nasil olacak", "yagmur yagacak mi", "kar yagacak mi",
  "dolar kac", "euro kac", "altin kac tl", "borsa", "kripto", "bitcoin",
  "son dakika", "guncel haber", "haberlerde ne var",
  // eğlence
  "mac skoru", "mac kac kac", "hangi takim", "galatasaray mi fenerbahce",
  "film oner", "dizi oner", "sarki oner", "muzik oner", "oyun oner",
  "valorant", "minecraft", "roblox", "fortnite", "pubg", "counter strike",
  "tiktok", "instagram takipci", "youtube kanal",
  // ticaret
  "kac tl", "fiyati ne kadar", "nereden alabilirim", "indirim var mi",
  "hangi telefonu al", "hangi bilgisayari al",
  // siyaset / hassas
  "hangi partiye oy", "secim sonuc", "cumhurbaskani kim olacak",
  "hangi partiyi destek",
  // sağlık tavsiyesi
  "hangi ilaci ic", "ilac oner", "doktora gitmeli miyim", "hastaligim ne",
  "kilo vermek icin ne yemeliyim", "diyet listesi",
  // ilişki / kişisel
  "sevgilim", "ask tavsiye", "benden hoslaniyor mu", "nasil flort",
  // ödev dışı kod
  "python kodu yaz", "java kodu yaz", "html kodu yaz", "uygulama yap",
  "web sitesi yap", "bot yaz",
];

export type KapsamSonucu =
  | { uygun: true }
  | { uygun: false; tur: "kufur" | "kod" | "alakasiz"; cevap: string };

const KOD_CEVABI =
  "Sitenin teknik iç yapısı (kod, veritabanı, ayarlar) hakkında bilgi veremem — o benim alanım değil. Ama LGS derslerinde ya da sitenin kullanımında ne istersen sorabilirsin. 🦉";

const ALAKASIZ_CEVABI =
  "Bu konuda yardımcı olamam — ben yalnız LGS dersleri ve bu sitenin kullanımı için buradayım. Bir konu sorusu sor ya da \"nereye gitmeliyim\" diye sor, hemen yardım edeyim. 🦉";

/**
 * Soruyu denetler. Uygun değilse AI'ya GİTMEDEN dönecek cevabı da verir.
 */
export function kapsamDenetle(soru: string): KapsamSonucu {
  const ham = soru ?? "";
  if (!denetle(ham).uygun) {
    return { uygun: false, tur: "kufur", cevap: RET_METNI };
  }
  const n = normalize(ham);
  if (!n) return { uygun: true };

  for (const k of KOD_KALIPLARI) {
    if (n.includes(k)) return { uygun: false, tur: "kod", cevap: KOD_CEVABI };
  }
  for (const k of ALAKASIZ_KALIPLARI) {
    if (n.includes(k)) return { uygun: false, tur: "alakasiz", cevap: ALAKASIZ_CEVABI };
  }
  return { uygun: true };
}
