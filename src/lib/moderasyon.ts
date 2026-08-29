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
 * Yöntem: "gizleme" (obfuscation) toleranslı KELİME eşleme. Kullanıcı
 * araya nokta koyarak, harfleri tekrarlayarak veya rakamla değiştirerek
 * (a→4, e→3, i→1, o→0, s→5) yazsa da yakalanır.
 *
 * ── DÜZELTME: kelime sınırı ────────────────────────────────────────────
 * Eski sürüm bütün kökleri, BOŞLUKLARI SİLİNMİŞ metin içinde ALT DİZE
 * olarak arıyordu. Bu, meşru metinleri engelliyordu:
 *     "sikke"   (tarih terimi) → tekrar sadeleştirmesiyle "sike"
 *     "asalak"  (Fen terimi)   → içinde "salak"
 *     "kayarak", "sayarak"     → içinde "yarak"
 *     "eksikim"                → içinde "sikim"
 *     "makamına", "adamına"    → içinde "amina"
 *     "mal ve hizmet" (Sosyal) → tam kelime "mal"
 *     "0oC" (sıcaklık), "öç"   → tam kelime "oc"
 * Artık eşleme KELİME düzeyinde ve ÖN EK (kök + Türkçe ek) mantığıyla
 * yapılır. `\b` Türkçe harflerde güvenilmez olduğu için düzenli ifadeye
 * hiç güvenilmez: metin önce Türkçe'den ASCII'ye indirgenip kendi
 * ayırıcımızla kelimelere bölünür — sınır kontrolü böylece bize aittir.
 */

/** Türkçe harfleri ASCII'ye indirger (rakamlara dokunmaz). */
function turkceSadelestir(metin: string): string {
  return metin
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

/** Rakam/simge ile harf gizlemeyi açar ve harf dışını atar. */
function gizlemeAc(kelime: string): string {
  return kelime
    .replace(/[4@]/g, "a")
    .replace(/[3€]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t")
    .replace(/9/g, "g")
    .replace(/[^a-z]/g, "");
}

/** Ardışık tekrar eden harfleri teke indirir: "aaamk" → "amk". */
function tekrarSil(metin: string): string {
  return metin.replace(/(.)\1+/g, "$1");
}

/**
 * KELİME SINIRI: metni kendi ayırıcımızla böler. Harf ve rakam dışındaki
 * her şey (nokta, tire, emoji, Türkçe tırnak) sınırdır. `\b` kullanılmaz —
 * Unicode'da Türkçe harfleri "kelime dışı" sayabildiği için "öç" gibi
 * sözcüklerde yanlış sonuç verir.
 */
function kelimelereBol(metin: string): string[] {
  return turkceSadelestir(metin)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/** Boşlukları koruyan, gizlemesi açılmış metin (çok kelimeli kalıplar için). */
function bosluklaSadelestir(metin: string): string {
  return kelimelereBol(metin).map(gizlemeAc).filter(Boolean).join(" ");
}

/**
 * Tek kelimelik yasaklı kökler. Eşleme ÖN EK'tir: kelime kökle BAŞLIYORSA
 * yakalanır ("salak" → "salaksın" ✓, "asalak" ✗). Türkçe sondan eklemeli
 * olduğu için ön ek eşlemesi çekimli biçimleri de kapsar.
 */
const KOK_TEK: string[] = [
  // küfür / müstehcen
  "amcik", "amina", "aminakoy", "sike", "siker", "sikim", "sikik",
  // "yarrağım" gibi ünsüz yumuşamalı biçimler için k→g varyantları da var.
  "siktir", "sikeyim", "sikiyim", "yarrak", "yarrag", "yarak", "yarag",
  "tasak", "gotveren",
  "gotlek", "pezevenk", "orospu", "kahpe", "kaltak", "surtuk", "fahise",
  "piclik", "picik", "oruspu", "koyim", "godumun",
  "yavsak", "ibne", "gavat", "kavat", "pust", "hayasiz",
  // hakaret
  "gerizekali", "aptal", "salak", "ahmak", "embesil", "moron",
  "beyinsiz", "denyo", "dangalak", "serefsiz", "namussuz",
  "sarsak", "budala", "avanak", "gerzek",
  // yasa dışı
  "eroin", "kokain", "molotof",
];

/**
 * Çok kelimeli kalıplar. Boşluk korunan metinde, KELİME BAŞINDAN eşleşir.
 * ("esrarengiz nasıl" → "esrar nasil" kalıbına takılmaz.)
 */
const KOK_IFADE: string[] = [
  "geri zekali", "hayvan herif", "alcak herif", "it oglu", "kopek oglu",
  "esek oglu", "pislik herif", "manyak herif",
  "nefret ediyorum hepsinden", "asagi irk", "soykirim yapilsin",
  "uyusturucu nasil", "esrar nasil", "bonzai icmek",
  "bomba nasil yapilir", "silah nasil alinir", "korsan film",
  "kacak bahis", "bahis sitesi", "kumar oyna", "hile programi",
  "sinav sorulari sizdi", "sinav sorulari calindi", "kopya cekme yontemi",
  // "koyayım" tek başına meşrudur ("Kitabı nereye koyayım?"); yalnız
  // hedef gösteren kalıplarla küfür olur.
  "amina koy", "agzina koy", "anani koy", "avradini",
];

/**
 * Kelimenin İÇİNDE geçse bile küfür olan, normal bir Türkçe sözcüğün
 * parçası OLAMAYAN kökler. ("seninamk", "birorospu" gibi bitişik yazımlar
 * bu sayede yakalanmaya devam eder.) Buraya yalnız hiçbir masum kelimeye
 * gömülemeyecek kökler eklenir.
 */
const KOK_SERT: string[] = [
  // NOT: "siktir" bilerek YOKTUR — "eksiktir" (sınav sorularında çok geçen
  // bir kelime) içinde geçiyor. Kelime başı eşlemesi (KOK_TEK) zaten
  // "siktir git" gibi kullanımları yakalıyor.
  "orospu", "oruspu", "pezevenk", "gotveren", "yarrak", "amcik",
  "sikeyim", "sikiyim", "fahise", "kaltak", "surtuk", "gerizekali", "yavsak",
];

/** 3 harf ve altı kökler: yalnız TAM kelime olarak aranır ("aqua" ✗). */
const KOK_KISA: string[] = ["amk", "aq"];

/**
 * Tek başına anlamlı olduğu için TAM kelime aranan kısa kökler.
 * DÜZELTME: "mal" ve "oc" listeden çıkarıldı —
 *   "mal ve hizmet" / "kamu malı" (Sosyal Bilgiler) ve
 *   "öç almak" / "0 oC" (Türkçe ve Fen) meşrudur.
 * Bu ikisi aşağıda bağlamıyla birlikte denetlenir.
 */
const TAM_KELIME: string[] = ["got", "kic", "bok", "pic", "gic"];

/**
 * "mal" ancak hakaret bağlamında yasaktır. Boşluklu metinde aranır.
 * "mal ve hizmet", "kamu malı", "malın fiyatı" serbest kalır.
 */
const MAL_HAKARET = [
  /(^| )mal (misin|misiniz|misin sen|gibi|herif|kafa|kafali|mi)( |$)/,
  /(^| )(seni|sen|ne|koca|resmen|tam) mal( |$)/,
  /(^| )ne malsin( |$)/,
  /(^| )mals(in|iniz)( |$)/,
];

/**
 * Tekrar sadeleştirmesi ("kk" → "k") sonrası bir köke benzeyen ama meşru
 * olan kelimeler. Bu ön eklerle başlayan kelimede tekrar-silme adımı
 * atlanır: "sikke" → "sike" olup yanlışlıkla engellenmez.
 */
const ISTISNA_ONEK: string[] = [
  "sikke", // tarih terimi (madenî para); "kk" → "k" olunca "sike" oluyordu
  "book",  // İngilizce dersi; "oo" → "o" olunca "bok" oluyordu
];

/**
 * Sıcaklık yazımı: "0oC", "0 °C", "100 ºF". Böyle bir ifade geçen metin
 * "oc" (öç/oç) sanılmamalıdır.
 */
const SICAKLIK = /\d\s*[°ºᵒo]\s*[ckf](\W|$)/;

export type DenetimSonucu = {
  uygun: boolean;
  /** Yakalanan sebep (günlüğe yazmak için; kullanıcıya gösterilmez). */
  sebep?: string;
};

/**
 * "a.m.k", "s i k t i r" gibi harf harf bölerek gizlemeyi yakalamak için
 * ARDIŞIK TEK HARFLİK kelimeleri birleştirir. Normal bir cümlede tek
 * harflik kelime dizisi olmadığı için yanlış pozitif doğurmaz — eski
 * sürümdeki "bütün boşlukları sil" yaklaşımının aksine.
 */
function tekHarfleriBirlestir(kelimeler: string[]): string[] {
  const ek: string[] = [];
  let yigin = "";
  for (const k of kelimeler) {
    if (k.length === 1) {
      yigin += k;
    } else {
      if (yigin.length > 1) ek.push(yigin);
      yigin = "";
    }
  }
  if (yigin.length > 1) ek.push(yigin);
  return ek;
}

/**
 * Metni denetler. `uygun: false` ise metin hiçbir yerde kullanılmamalı.
 */
export function denetle(metin: string): DenetimSonucu {
  if (!metin) return { uygun: true };

  const hamKelimeler = kelimelereBol(metin);
  if (hamKelimeler.length === 0) return { uygun: true };

  // Boşluğu korunan metin — çok kelimeli kalıplar ve bağlam denetimi için.
  const bosluklu = bosluklaSadelestir(metin);

  // Kalıp aramalarında kelime sınırını garanti etmek için metin boşlukla
  // paketlenir; böylece " esrar nasil" aranır, "esrarengiz nasil" takılmaz.
  const paketli = ` ${bosluklu} `;

  // 1) Çok kelimeli kalıplar (kelime BAŞINDAN eşleşir, sonuna ek alabilir).
  for (const ifade of KOK_IFADE) {
    if (paketli.includes(` ${ifade}`)) return { uygun: false, sebep: ifade };
  }

  // 2) "mal" — yalnız hakaret bağlamında ("mal ve hizmet" serbest).
  for (const kalip of MAL_HAKARET) {
    if (kalip.test(paketli)) return { uygun: false, sebep: "mal" };
  }

  // 3) Yalnız mesajın TAMAMI o kelimeden ibaretse küfür sayılanlar
  //    ("öç", "mal" tek başına bir takma ad/mesajsa hakarettir; cümle
  //    içinde geçtiğinde meşrudur). Sıcaklık yazımı ("0oC") muaftır.
  const tamMesaj = tekrarSil(hamKelimeler.map(gizlemeAc).join(""));
  if (tamMesaj === "oc" && !SICAKLIK.test(turkceSadelestir(metin))) {
    return { uygun: false, sebep: "oc" };
  }
  if (tamMesaj === "mal") return { uygun: false, sebep: "mal" };

  // 4) Kelime kelime kök eşlemesi.
  const adaylar = [...hamKelimeler, ...tekHarfleriBirlestir(hamKelimeler)];
  for (const ham of adaylar) {
    const harf = gizlemeAc(ham);
    if (!harf) continue;
    // İstisna kelimelerde tekrar-silme adımı atlanır (sikke → sike olmasın).
    const istisna = ISTISNA_ONEK.some((x) => harf.startsWith(x));
    const bicimler = istisna ? [harf] : [harf, tekrarSil(harf)];

    for (const b of bicimler) {
      if (KOK_KISA.includes(b)) return { uygun: false, sebep: b };
      if (TAM_KELIME.includes(b)) return { uygun: false, sebep: b };
      for (const kok of KOK_TEK) {
        if (b.startsWith(kok)) return { uygun: false, sebep: kok };
      }
      for (const kok of KOK_SERT) {
        if (b.includes(kok)) return { uygun: false, sebep: kok };
      }
    }
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
