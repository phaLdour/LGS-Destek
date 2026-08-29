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
 * Yaklaşım: kara liste + KALIP eşleme (tek kelime değil). Kalıplar müfredat
 * kelimelerini yakalamayacak kadar DAR tutulur: "hava durumu" bir Sosyal
 * Bilgiler konusudur, o yüzden yalnız güncel hava sorgusu ("bugün hava",
 * "hava durumu nasıl olacak") reddedilir; "hava durumu ile iklim farkı"
 * gibi müfredat soruları serbest geçer. Aynı ilke "kaç TL" (matematik
 * problemi), "hangi model" (soru tipi) ve "borsa" (okul adı) için de
 * geçerlidir — bkz. aşağıdaki liste yorumları.
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

/**
 * Sitenin iç yapısını öğrenmeye çalışan sorular.
 *
 * DÜZELTME — kalıplar daraltıldı. Eskiden meşru LGS soruları reddediliyordu:
 *   - "hangi model"     → "LGS'de hangi model soru çıkıyor?", "Matematikte
 *                         hangi model kullanılır?" reddediliyordu. Artık
 *                         yalnız modelin KİMLİĞİNİ soran kalıplar yakalanır.
 *   - "hangi dille yaz" → "Orhun Yazıtları hangi dille yazılmıştır?" (T.C.
 *                         İnkılap / Türkçe) reddediliyordu; kalıp artık
 *                         siteye/kendisine atıf istiyor.
 *   - "hangi teknoloji" → "Fen'de hangi teknolojiler kullanılır?" meşrudur.
 *   - "hangi kutuphane" → "kütüphane" gündelik bir kelimedir; kaldırıldı,
 *                         "hangi framework" zaten kapsıyor.
 *   - "react"           → İngilizce dersinde geçen bir fiildir; yalnız
 *                         "react js / reactjs" biçimi kaldı.
 */
const KOD_KALIPLARI = [
  "kaynak kod", "kaynak kodu", "source code", "kodunu ver", "kodlarini ver",
  "kodlari goster", "hangi framework", "hangi programlama dili",
  "site hangi dille", "sitenin hangi dille", "hangi dille yazildin",
  "hangi dilde yazildin", "hangi teknolojiyle yapildin",
  "sitede hangi teknoloji", "hangi teknolojileri kullaniyorsun",
  "veri tabani", "veritabani", "database", "supabase",
  "next js", "nextjs", "react js", "reactjs", "typescript", "tailwind", "vercel",
  "api key", "api anahtar", "gizli anahtar", "env dosya", "ortam degisken",
  "sistem mesaj", "sistem istem", "system prompt", "promptun", "prompt un",
  "talimatlarini", "talimatlarin ne", "onceki talimatlari unut",
  "talimatlari unut", "kurallarini unut", "rolunu unut", "sen bir yapay zeka",
  // Modelin kimliğini soranlar — "hangi model" gibi genel kalıp DEĞİL.
  "hangi modelsin", "senin modelin", "modelin ne", "modelin nedir",
  "hangi yapay zeka model", "hangi ai model", "hangi dil modeli",
  "hangi modeli kullan", "kullandigin model", "hangi surumsun",
  "gemini mi", "chatgpt mi", "gpt misin",
  "nasil yapildin", "seni kim yapti kod", "admin panel", "yonetici sifre",
  "sunucu adresi", "repo linki", "github linki", "dosya yapisi", "klasor yapisi",
];

/**
 * Müfredat ve site dışı, açıkça alakasız konular.
 *
 * DÜZELTME — kalıplar daraltıldı. Eskiden reddedilen meşru sorular:
 *   - "kac tl"          → DÜPEDÜZ MATEMATİK: "Bir kalem 5 TL ise 3 kalem
 *                         kaç TL olur?" reddediliyordu. Kalıp kaldırıldı;
 *                         para birimi sorgusu için "dolar kac" yeterli.
 *   - "fiyati ne kadar" → "Bir malın fiyatı ne kadar artarsa..." yüzde
 *                         problemidir; alışveriş niyeti isteyen kalıplarla
 *                         değiştirildi.
 *   - "hava durumu"     → Sosyal Bilgiler/Fen konusudur ("hava durumu ile
 *                         iklim farkı"). Artık zaman/yer belirten güncel
 *                         hava sorguları yakalanır.
 *   - "hangi takim"     → "hangi takımı tutuyorsun" biçimine daraltıldı.
 */
const ALAKASIZ_KALIPLARI = [
  // güncel/dünya  (konu olarak "hava durumu" değil, GÜNCEL hava sorgusu)
  "bugun hava", "yarin hava", "hafta sonu hava", "hava durumu nasil olacak",
  "hava durumu ne olacak", "hava nasil olacak", "hava kac derece olacak",
  "yagmur yagacak mi", "kar yagacak mi",
  "dolar kac", "euro kac", "altin kac tl", "kripto", "bitcoin",
  // "borsa" tek başına OLAMAZ: "Borsa İstanbul Fen Lisesi" gerçek bir okul
  // adıdır ve sitenin okul veritabanında geçer (src/content/okullar.ts).
  "borsa endeks", "borsada para", "borsa yatirim", "hisse senedi", "bist 100",
  // "son dakika" tek başına Türkçe okuma cümlelerinde geçiyor
  // ("maçın son dakikasında"); haber niyeti aranıyor.
  "son dakika haber", "guncel haber", "haberlerde ne var",
  // eğlence
  "mac skoru", "mac kac kac", "hangi takimi tutuyorsun", "hangi takimlisin",
  "galatasaray mi fenerbahce",
  "film oner", "dizi oner", "sarki oner", "muzik oner", "oyun oner",
  "valorant", "minecraft", "roblox", "fortnite", "pubg", "counter strike",
  "tiktok", "instagram takipci", "youtube kanal",
  // ticaret  (alışveriş niyeti belirten kalıplar; salt fiyat/TL geçmesi değil)
  "nereden alabilirim", "nereden satin al", "indirim var mi", "kac paraya alirim",
  "hangi telefonu al", "hangi bilgisayari al", "hangi marka alayim",
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
