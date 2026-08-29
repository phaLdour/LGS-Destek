/**
 * ÖĞRENEN ÖNBELLEK — baykuşun AI cevaplarını kalıcı hâle getirmesi.
 *
 * Akış (soru geldiğinde sırayla):
 *   1. KALIP katmanı (cannedAnswers)  → bedava, anında
 *   2. ÖĞRENİLMİŞ önbellek (bu dosya) → bedava, tek veritabanı okuması
 *   3. AI (Gemini)                    → kota harcar
 *      └─ cevap geldikten sonra uygunsa önbelleğe YAZILIR; aynı soru bir
 *         daha geldiğinde 2. adımda karşılanır ve AI'ya hiç gidilmez.
 *
 * Yani önceden düşünemediğimiz soruları kullanıcılar bize öğretir ve
 * zamanla AI kullanımı kendiliğinden azalır.
 *
 * Haftalık bakım (ai_onbellek_bakim): en az kullanılan %25'lik dilim
 * pasife alınır — önbellek şişmez, ölü kayıtlar birikmez.
 */

/** Türkçe sadeleştirme (cannedAnswers ile aynı kural). */
function sadelestir(text: string): string {
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
 * Anlam taşımayan dolgu kelimeleri. DİKKAT: soru tipini belirleyen kelimeler
 * (nedir, nasil, neden, kac, hangi, nerede, kim, ne zaman) BİLEREK burada
 * değildir — "üslü sayılar nedir" ile "üslü sayılar nasıl çözülür" aynı
 * anahtara düşerse yanlış cevap verilir.
 */
const DOLGU = new Set([
  "bir", "bu", "su", "o", "ve", "ile", "icin", "de", "da", "ki", "ya",
  "mi", "mu", "acaba", "lutfen", "bana", "bize", "biraz", "cok", "peki",
  "hocam", "baykus", "merhaba", "selam", "rica", "ederim", "misin",
  "musun", "misiniz", "soyler", "soyle", "anlat", "aciklar", "yani",
]);

/**
 * Soruyu arama anahtarına çevirir: sadeleştirir, dolguyu atar, kelimeleri
 * SIRALAR. Böylece "pomodoro nedir" ile "nedir pomodoro" aynı kutuya düşer.
 * Anahtar üretilemiyorsa (çok kısa/anlamsız) null döner.
 */
export function parmakIzi(soru: string): string | null {
  const sade = sadelestir(soru ?? "");
  if (!sade) return null;
  const kelimeler = sade
    .split(" ")
    .filter((k) => k.length > 1 && !DOLGU.has(k));
  if (kelimeler.length === 0) return null;
  // Çok uzun sorular tekil olma eğilimindedir; önbelleğe uygun değildir.
  if (kelimeler.length > 25) return null;
  const anahtar = Array.from(new Set(kelimeler)).sort().join(" ");
  return anahtar.length >= 3 && anahtar.length <= 380 ? anahtar : null;
}

/**
 * KİŞİYE veya ANA bağlı sorular. Bunların cevabı herkes için aynı olmadığı
 * (ya da yarın değişeceği) için önbelleğe ALINMAZ.
 */
const KISISEL_KALIPLAR = [
  "benim", "bende", "bana ozel", "kac gun kaldi", "kac gun var",
  "kac saat calistim", "netim", "puanim", "ortalamam", "serim",
  "kac soru cozdum", "hangi ligdeyim", "rozetlerim", "hedef okulum",
  "adim ne", "beni taniyor", "bugun ne", "bugun hangi", "simdi saat",
  "su an saat", "yarin", "dun", "bu hafta ne kadar", "istatistiklerim",
  "profilim", "hangi konudayim", "kaldigim yer",
];

/** Cevabın da kişiye özel olup olmadığını gösteren izler. */
const KISISEL_CEVAP_IZLERI = [
  "gun kaldi", "bu hafta", "bugun", "senin netin", "serin",
  "istatistiklerine gore", "kaldigin yer",
];

export type UygunlukSonucu = { uygun: boolean; sebep?: string };

/**
 * Bu soru-cevap çifti önbelleğe alınabilir mi?
 * @param kisiselAd Kullanıcının adı (cevapta geçiyorsa kişiselleşmiştir).
 */
export function onbellegeUygunMu(
  soru: string,
  cevap: string,
  kisiselAd?: string | null,
): UygunlukSonucu {
  const s = sadelestir(soru);
  const c = sadelestir(cevap);

  if (!cevap || cevap.trim().length < 25) return { uygun: false, sebep: "cevap kisa" };
  if (cevap.length > 3500) return { uygun: false, sebep: "cevap uzun" };

  for (const k of KISISEL_KALIPLAR) {
    if (s.includes(k)) return { uygun: false, sebep: `kisisel soru: ${k}` };
  }
  for (const k of KISISEL_CEVAP_IZLERI) {
    if (c.includes(k)) return { uygun: false, sebep: `kisisel cevap: ${k}` };
  }
  if (kisiselAd && kisiselAd.length > 2 && c.includes(sadelestir(kisiselAd))) {
    return { uygun: false, sebep: "cevapta kullanici adi" };
  }
  // Modelin "bilmiyorum / veremiyorum" türü cevapları öğretilmez.
  const kacamak = [
    "yanit veremiyorum", "cevap veremem", "bilmiyorum", "emin degilim",
    "uydurmak istemem", "su an yanit", "yardimci olamam", "tekrar deneyin",
  ];
  for (const k of kacamak) {
    if (c.includes(k)) return { uygun: false, sebep: `kacamak cevap: ${k}` };
  }
  // İçinde tarih/saat geçen cevaplar bayatlar.
  if (/\b20\d\d\s*(yilinda|de|da)?\s*(bugun|su an)/.test(c)) {
    return { uygun: false, sebep: "zamana bagli" };
  }
  return { uygun: true };
}
