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
 *
 * DÜZELTME: Listede anlam TAŞIYAN kelimeler vardı ve atıldıkları için farklı
 * sorular aynı parmak izine düşüyordu:
 *   - "su"  → FEN konusu ("su döngüsü", "suyun kaldırma kuvveti");
 *             atılınca "su döngüsü nasıl olur" = "döngüsü nasıl olur".
 *   - "bir" → aynı zamanda bir SAYIDIR ("bir basamaklı sayı").
 *   - "cok" → matematikte niceliği belirler ("en çok" ≠ "en az").
 *   - "o"   → zaten tek harflik olduğu için ayrıca elenirdi; listede
 *             durması yanıltıcıydı.
 * Bir dolgu kelimesini listeden çıkarmanın maliyeti yalnız "önbellek isabeti
 * kaçırmak"tır; listede bırakmanın maliyeti ise YANLIŞ CEVAP vermektir.
 */
const DOLGU = new Set([
  "ve", "ile", "icin", "de", "da", "ki", "ya",
  "mi", "mu", "acaba", "lutfen", "bana", "bize", "biraz", "peki",
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
  // DÜZELTME: Eskiden tek karakterli HER belirteç atılıyordu. "8. sınıf"
  // sadeleştirilince "8 sinif" olur, "8" tek karakter diye düşer ve soru
  // "7. sınıf" ile AYNI parmak izine ("sinif") çıkardı; öğrenci 7. sınıf
  // sorusuna 8. sınıf cevabını alırdı. Sayı içeren belirteçler artık uzunluk
  // ve dolgu denetiminden muaftır — sayı her zaman anlam taşır.
  const kelimeler = sade
    .split(" ")
    .filter((k) =>
      k.length > 0 && (/[0-9]/.test(k) || (k.length > 1 && !DOLGU.has(k))),
    );
  if (kelimeler.length === 0) return null;
  // Çok uzun sorular tekil olma eğilimindedir; önbelleğe uygun değildir.
  if (kelimeler.length > 25) return null;
  const anahtar = Array.from(new Set(kelimeler)).sort().join(" ");
  return anahtar.length >= 3 && anahtar.length <= 380 ? anahtar : null;
}

/**
 * Sohbetin ortasında sorulan, önceki mesaja yaslanan sorular. Bunlar tek
 * başına anlaşılmadığı için önbellekte ARANMAZ ve önbelleğe YAZILMAZ.
 */
const BAGLAM_ONEKLERI = [
  "peki", "ya bu", "ya su", "ya o", "bunu", "bunlari", "bunlar", "sunu",
  "onu", "bu konuyu", "ayni sekilde", "devam et", "daha fazla",
  "baska ornek", "ornek ver", "tekrar anlat", "anlamadim", "neden oyle",
  "nasil yani", "biraz daha",
];

/**
 * Soru TEK BAŞINA anlaşılıyor mu? Yalnız "evet" ise önbellek devreye girer.
 *
 * DÜZELTME: bu karar eskiden sohbet rotasında `history.length <= 2 ||
 * uzunluk >= 12` şeklinde, yani `||` ile veriliyordu. `||` iki koşulu da
 * işlevsiz kılıyordu: 12 karakterden uzun her soru — sohbetin 8. adımında
 * bile — "bağımsız" sayılıyor, "Peki bunu bir örnekle açıklar mısın?" gibi
 * tamamen bağlama bağlı bir cümle hem önbellekten yanlış cevap alıyor hem de
 * o yanlış eşleşme site geneline yazılıyordu. Doğrusu `&&`: soru ancak
 * sohbetin BAŞINDA ise VE kendi başına yetecek kadar uzunsa bağımsızdır.
 *
 * @param gecmisUzunlugu Sohbet geçmişindeki mesaj sayısı (cihaz önbelleğinde
 *   geçmiş bilinmediği için 0 geçilir; oradaki tek ölçüt uzunluk ve öneklerdir).
 */
export function bagimsizSoruMu(soru: string, gecmisUzunlugu = 0): boolean {
  const s = (soru ?? "").trim();
  if (s.length < 12) return false;
  if (gecmisUzunlugu > 2) return false;
  const sade = sadelestir(s);
  for (const onek of BAGLAM_ONEKLERI) {
    if (sade === onek || sade.startsWith(`${onek} `)) return false;
  }
  return true;
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
