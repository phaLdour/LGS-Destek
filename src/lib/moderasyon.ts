/**
 * İçerik denetimi — küfür, hakaret ve yasa dışı içerik süzgeci.
 *
 * SİTE KURALI (kalıcı): Küfür, hakaret ve yasa dışı hiçbir şey sitede
 * bulunmaz, yazılmaz, cevaplanmaz; takma adlar da bu kurala tabidir.
 *
 * Bu süzgeç ÜÇ yerde birden çalışır:
 *   1. Baykuş'a yazılan sorular (cevaplanmaz, AI'ya hiç gitmez)
 *   2. Rekabet takma adları (istemcide + SQL tarafında ayrıca)
 *   3. Geri bildirim metinleri
 *
 * Yöntem: "gizleme" (obfuscation) toleranslı kök eşleme. Kullanıcı
 * araya nokta koyarak, harfleri tekrarlayarak veya rakamla değiştirerek
 * (a→4, e→3, i→1, o→0, s→5) yazsa da yakalanır.
 */

/** Rakam/simge ile harf değiştirme ve Türkçe karakter sadeleştirme. */
function sadelestir(metin: string): string {
  return metin
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[4@]/g, "a")
    .replace(/[3€]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/5\$/g, "s")
    .replace(/\$/g, "s")
    .replace(/7/g, "t")
    .replace(/9/g, "g")
    .replace(/[^a-z]/g, "");
}

/** Harf sadeleştirmesi yapar ama kelime sınırlarını korur. */
function sadeBosluklu(metin: string): string {
  return metin
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[4@]/g, "a")
    .replace(/[3€]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/\$/g, "s")
    .replace(/7/g, "t")
    .replace(/9/g, "g")
    .replace(/[^a-z]+/g, " ")
    .trim();
}

/** Ardışık tekrar eden harfleri teke indirir: "aaamk" → "amk". */
function tekrarSil(metin: string): string {
  return metin.replace(/(.)\1+/g, "$1");
}

/**
 * Yasaklı kökler. Kök eşleşmesi yapılır (ek almış hâlleri de yakalanır).
 * Liste bilinçli olarak "kök" düzeyindedir; çekimli/ekli biçimler için
 * ayrı satır gerekmez.
 */
const KOKLER: string[] = [
  // küfür / müstehcen
  "amk", "aq", "amcik", "amina", "aminakoy", "sike", "siker", "sikim", "sikik",
  "siktir", "sikeyim", "sikiyim", "yarrak", "yarak", "tasak", "gotveren",
  "gotlek", "pezevenk", "orospu", "kahpe", "kaltak", "surtuk", "fahise",
  "piclik", "picik", "oruspu", "amina", "koyim", "koyayim", "godumun",
  "mal gibi", "yavsak", "ibne", "gavat", "kavat", "pust", "hayasiz",
  // hakaret
  "gerizekali", "geri zekali", "aptal", "salak", "ahmak", "embesil", "moron",
  "beyinsiz", "denyo", "dangalak", "hayvan herif", "serefsiz", "namussuz",
  "alcak herif", "it oglu", "kopek oglu", "esek oglu", "pislik herif",
  "sarsak", "budala", "avanak", "hodri", "gerzek", "manyak herif",
  // ayrımcılık / nefret
  "nefret ediyorum hepsinden", "asagi irk", "soykirim yapilsin",
  // yasa dışı
  "uyusturucu nasil", "esrar nasil", "eroin", "kokain", "bonzai icmek",
  "bomba nasil yapilir", "molotof", "silah nasil alinir", "korsan film",
  "kacak bahis", "bahis sitesi", "kumar oyna", "hile programi",
  "sinav sorulari sizdi", "sinav sorulari calindi", "kopya cekme yontemi",
];

/** Tek başına anlamlı olduğu için TAM kelime aranan kısa kökler. */
const TAM_KELIME: string[] = ["mal", "oc", "got", "kic", "bok", "pic", "gic"];

const KOK_SADE = KOKLER.map((k) => tekrarSil(sadelestir(k))).filter(Boolean);

export type DenetimSonucu = {
  uygun: boolean;
  /** Yakalanan sebep (günlüğe yazmak için; kullanıcıya gösterilmez). */
  sebep?: string;
};

/**
 * Metni denetler. `uygun: false` ise metin hiçbir yerde kullanılmamalı.
 * Yanlış pozitifi azaltmak için: uzun kökler alt dize, kısa ve gündelik
 * anlamı olan kökler tam kelime olarak aranır.
 */
export function denetle(metin: string): DenetimSonucu {
  if (!metin) return { uygun: true };
  const sade = tekrarSil(sadelestir(metin));
  if (!sade) return { uygun: true };

  for (const kok of KOK_SADE) {
    if (kok.length >= 4 && sade.includes(kok)) {
      return { uygun: false, sebep: kok };
    }
  }

  // Kısa kökler (amk, aq gibi): kelime sınırıyla ya da mesajın tamamı
  // o kökten ibaretse yakalanır — "a.m.k" ve "aaamk ya" ikisi de girer.
  const bosluklu = tekrarSil(sadeBosluklu(metin).replace(/ +/g, " ")).replace(/ +/g, " ");
  for (const kok of KOK_SADE) {
    if (kok.length >= 4) continue;
    if (sade === kok) return { uygun: false, sebep: kok };
    const kalip = new RegExp(`(^| )${kok}( |$)`);
    if (kalip.test(bosluklu)) return { uygun: false, sebep: kok };
  }

  // Kısa kökler: harf sadeleştirmesi yapılmış ama boşlukları korunmuş metinde
  // tam kelime olarak aranır ("mal" → "malzeme" yanlış pozitifini önler).
  const kelimeler = metin
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLocaleLowerCase("tr")
    .split(/[^a-zçğıöşü0-9]+/)
    .map((w) => tekrarSil(sadelestir(w)))
    .filter(Boolean);
  for (const w of kelimeler) {
    if (TAM_KELIME.includes(w)) return { uygun: false, sebep: w };
    if (KOK_SADE.includes(w)) return { uygun: false, sebep: w };
  }

  return { uygun: true };
}

/** Kısa yardımcı: metin uygunsuz mu? */
export function uygunsuzMu(metin: string): boolean {
  return !denetle(metin).uygun;
}

/** Kullanıcıya gösterilecek kibar ret metni (baykuş ağzından). */
export const RET_METNI =
  "Bu şekilde konuşmana yardımcı olamam. Burası ders çalışma alanı — kırıcı sözler kullanmadan sorunu tekrar yazarsan seve seve yardım ederim. 🦉";

/** Takma ad reddi için kısa metin. */
export const TAKMA_AD_RET =
  "Bu takma adı kullanamazsın. Kırıcı, kaba veya uygunsuz sözler içermeyen bir ad seç.";
