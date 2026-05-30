/**
 * Kalıp (canned) cevap katmanı.
 * Amaç: sık sorulan müfredat sorularına ve gezinme/selamlama gibi isteklere
 * Gemini'ye gitmeden (token harcamadan) yanıt vermek. Uyan kalıp yoksa null
 * döner ve sistem Gemini'ye düşer.
 */

export type CannedResult = {
  reply: string;
  navigate?: string | null;
  topicRoute?: string | null;
};

const OFFER = "İstersen bu konuyu daha iyi anlaman için sana yardımcı olabilirim.";

/** Türkçe karakterleri sadeleştir, küçük harfe çevir, noktalama temizle. */
function normalize(text: string): string {
  return text
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
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
 * Eşleşme: çok kelimeli ifade veya uzun (>=5 harf) kelime alt dize aranır
 * (ekli hâlleri de yakalar: "üçgenin", "karekökü"). Kısa kelimeler (ph, gen,
 * dna gibi) yanlış eşleşmeyi önlemek için tam token olarak aranır.
 */
function itemMatches(input: string, tokens: string[], item: string): boolean {
  if (item.includes(" ")) return input.includes(item);
  // 4 ve üstü harfli kelimeler için ekli/çekimli hâlleri yakalamak üzere alt
  // dize araması kullanılır (carpim, alan, egim → carpimi, alanin, egimi).
  // 3 harfli kısa kelimeler için yanlış eşleşmeyi önlemek üzere tam token arar.
  if (item.length >= 4) return input.includes(item);
  return tokens.includes(item);
}

// ───────────────────────── Aritmetik ─────────────────────────

function evalArithmetic(raw: string): number | null {
  const s = raw.replace(/,/g, ".");
  if (!/^[0-9+\-*/().\s]+$/.test(s)) return null;
  let pos = 0;
  const skip = () => {
    while (pos < s.length && s[pos] === " ") pos++;
  };
  const peek = () => s[pos];

  function parseExpr(): number {
    let v = parseTerm();
    skip();
    while (peek() === "+" || peek() === "-") {
      const op = s[pos++];
      const t = parseTerm();
      v = op === "+" ? v + t : v - t;
      skip();
    }
    return v;
  }
  function parseTerm(): number {
    let v = parseFactor();
    skip();
    while (peek() === "*" || peek() === "/") {
      const op = s[pos++];
      const f = parseFactor();
      v = op === "*" ? v * f : v / f;
      skip();
    }
    return v;
  }
  function parseFactor(): number {
    skip();
    if (peek() === "(") {
      pos++;
      const v = parseExpr();
      skip();
      if (peek() === ")") pos++;
      return v;
    }
    if (peek() === "+") {
      pos++;
      return parseFactor();
    }
    if (peek() === "-") {
      pos++;
      return -parseFactor();
    }
    const start = pos;
    while (pos < s.length && /[0-9.]/.test(s[pos])) pos++;
    return parseFloat(s.slice(start, pos));
  }

  try {
    skip();
    if (pos >= s.length) return null;
    const r = parseExpr();
    skip();
    if (pos !== s.length) return null;
    return Number.isFinite(r) ? r : null;
  } catch {
    return null;
  }
}

function tryArithmetic(raw: string): CannedResult | null {
  let s = raw.toLowerCase();
  s = s
    .replace(/artı|arti|topla/g, "+")
    .replace(/eksi|çıkar|cikar/g, "-")
    .replace(/çarpı|carpi|kere|çarpım|carpim/g, "*")
    .replace(/bölü|bolu|bölme|bolme/g, "/")
    .replace(/[xX]/g, "*");
  const expr = s.replace(/[^0-9+\-*/(). ]/g, " ").trim();
  if (!/[0-9]/.test(expr) || !/[+\-*/]/.test(expr)) return null;
  const r = evalArithmetic(expr);
  if (r === null) return null;
  const pretty = Number.isInteger(r)
    ? String(r)
    : String(Math.round(r * 10000) / 10000);
  return { reply: `Bu işlemin sonucu: ${pretty}.` };
}

// ───────────────────────── Gezinme ─────────────────────────

const NAV_VERBS = ["gir", "git", "ac", "gec", "goster", "gotur", "gidelim"];
// Ekli hâlleri de yakalamak için kök (alt dize) eşleşmesi kullanılır.
const NAV_SUBJECTS: { stems: string[]; route: string }[] = [
  { stems: ["matemat"], route: "/ders/matematik" },
  { stems: ["turkc"], route: "/ders/turkce" },
  { stems: ["fen"], route: "/ders/fen-bilimleri" },
  { stems: ["inkila", "tarih"], route: "/ders/inkilap" },
  { stems: ["din "], route: "/ders/din" },
  { stems: ["ingiliz"], route: "/ders/ingilizce" },
];

function tryNavigation(input: string, tokens: string[]): CannedResult | null {
  const hasVerb = NAV_VERBS.some((v) => tokens.includes(v));

  if (input.includes("profil")) {
    return { reply: "Tabii, profil sayfana götürüyorum.", navigate: "/profile" };
  }
  if (input.includes("anasayfa") || input.includes("ana sayfa") || tokens.includes("dashboard")) {
    return { reply: "Tamam, ana sayfaya götürüyorum.", navigate: "/dashboard" };
  }

  if (!hasVerb) return null;
  // "din" kökü kısa olduğu için sonuna boşluk ekleyip kelime sonunu da deneriz.
  const padded = `${input} `;
  for (const subj of NAV_SUBJECTS) {
    if (subj.stems.some((s) => padded.includes(s))) {
      return { reply: "Hemen o derse götürüyorum.", navigate: subj.route };
    }
  }
  return null;
}

// ───────────────────────── Sabit niyetler ─────────────────────────

function tryIntents(input: string, tokens: string[]): CannedResult | null {
  const has = (...items: string[]) =>
    items.some((it) => itemMatches(input, tokens, it));

  if (has("merhaba", "selam", "slm", "gunaydin", "hey") && tokens.length <= 3) {
    return {
      reply:
        "Merhaba! Ben Rehber Baykuş 🦉 Derslerinle ilgili sorularını sorabilir ya da seni bir derse götürebilirim. Sana nasıl yardımcı olabilirim?",
    };
  }
  if (has("tesekkur", "tesekkurler", "sagol", "sag ol", "eyvallah")) {
    return { reply: "Rica ederim! Başka bir sorun olursa buradayım. 🦉" };
  }
  if (has("nasilsin", "naber", "nasil gidiyor")) {
    return {
      reply: "Çok iyiyim, teşekkürler! Sen derslerine odaklan, gerisini bana sor. 🦉",
    };
  }
  if (
    has("kimsin", "adin ne", "sen nesin", "sen kimsin") ||
    input.includes("adin ne")
  ) {
    return {
      reply:
        "Ben Rehber Baykuş, Rehberim platformunun yardım asistanıyım. 8. sınıf dersleriyle ilgili sorularına yardımcı olur, seni doğru sayfaya yönlendiririm.",
    };
  }
  if (
    input.includes("nasil calisilir") ||
    input.includes("nasil kullanilir") ||
    input.includes("nasil calisirim") ||
    (has("derse") && has("basla", "baslarim"))
  ) {
    return {
      reply:
        "Bir derse girip konuyu aç, sonra 'Derse Başla' butonuna bas. Konu sayfasında video, çalışma kartları, konu anlatımı ve LGS İpucu testi bulunur. Çalışman 'Dersi Bitir' deyince özetlenir.",
    };
  }
  return null;
}

// ───────────────────────── Kavram (müfredat) kalıpları ─────────────────────────

type Concept = { all: string[]; answer: string; topicRoute?: string };

const CONCEPTS: Concept[] = [
  // ---------- Fen: Mevsimler ve İklim ----------
  {
    all: ["mevsim"],
    answer:
      "Mevsimler, Dünya'nın ekseninin 23° 27' (yaklaşık 23,5°) eğik olması ve Güneş etrafında dolanması nedeniyle oluşur. Bu, Güneş ışınlarının düşme açısını ve birim yüzeye düşen enerjiyi değiştirir.",
    topicRoute: "/ders/fen-bilimleri/mevsimler-ve-iklim",
  },
  {
    all: ["ekinoks"],
    answer:
      "Ekinoks (21 Mart ve 23 Eylül), Güneş ışınlarının Ekvator'a dik düştüğü ve tüm dünyada gece ile gündüzün eşit (12-12 saat) olduğu tarihlerdir.",
    topicRoute: "/ders/fen-bilimleri/mevsimler-ve-iklim",
  },
  {
    all: ["ruzgar"],
    answer:
      "Rüzgar, yüksek basınç alanından alçak basınç alanına doğru olan yatay hava hareketidir.",
    topicRoute: "/ders/fen-bilimleri/mevsimler-ve-iklim",
  },
  {
    all: ["iklim"],
    answer:
      "İklim, geniş bir bölgede uzun yıllar (30-40 yıl) boyunca görülen hava olaylarının ortalamasıdır. Hava durumundan farkı, uzun süreli olmasıdır.",
    topicRoute: "/ders/fen-bilimleri/mevsimler-ve-iklim",
  },
  // ---------- Fen: DNA ----------
  {
    all: ["dna"],
    answer:
      "DNA, hücrenin yönetici molekülüdür ve çift zincirli sarmal yapıdadır. Kalıtsal bilgiyi taşır; yapı birimi nükleotittir.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["gen"],
    answer:
      "Gen, DNA'nın anlamlı bir parçasıdır; göz rengi, kan grubu gibi kalıtsal özelliklerin ortaya çıkmasını sağlar.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["kromozom"],
    answer:
      "Kromozom, hücre çekirdeğinde bulunan ve DNA'nın protein kılıfla kaplanmasıyla oluşan en karmaşık kalıtsal yapıdır.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["nukleotit"],
    answer:
      "Nükleotit, DNA'nın yapı birimidir ve fosfat, şeker ile organik bazdan (Adenin, Timin, Guanin, Sitozin) oluşur.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  // ---------- Fen: Basınç ----------
  {
    all: ["egik duzlem"],
    answer:
      "Eğik düzlem, bir yükü belli bir yüksekliğe çıkarmak için kullanılan eğimli yüzeydir. Gereken kuvveti azaltır ama alınan yol uzar. Rampa ve vida buna örnektir.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  {
    all: ["pascal"],
    answer:
      "Pascal Prensibi: Kapalı bir kaptaki sıvıya uygulanan basınç, sıvının her noktasına ve kabın iç yüzeyine aynen iletilir. Hidrolik frenler bu ilkeyle çalışır.",
    topicRoute: "/ders/fen-bilimleri/basinc",
  },
  {
    all: ["basinc"],
    answer:
      "Basınç, birim yüzeye etki eden dik kuvvettir. Katılarda P = G / S formülüyle bulunur; sıvı basıncı derinlik ve yoğunluğa, açık hava basıncı ise yüksekliğe bağlıdır.",
    topicRoute: "/ders/fen-bilimleri/basinc",
  },
  {
    all: ["ph"],
    answer:
      "pH, bir maddenin asitlik-bazlık ölçüsüdür. pH 7'den küçükse asidik, 7 ise nötr (saf su), 7'den büyükse baziktir.",
    topicRoute: "/ders/fen-bilimleri/madde-ve-endustri",
  },
  // ---------- Fen: Madde ----------
  {
    all: ["periyodik"],
    answer:
      "Periyodik sistemde elementler artan atom numarasına göre dizilir. Yatay sıralara periyot, dikey sütunlara grup denir.",
    topicRoute: "/ders/fen-bilimleri/madde-ve-endustri",
  },
  {
    all: ["fiziksel", "degisim"],
    answer:
      "Fiziksel değişimde maddenin yalnız dış görünüşü değişir, yeni madde oluşmaz (buzun erimesi). Kimyasal değişimde ise yeni madde oluşur (kâğıdın yanması).",
    topicRoute: "/ders/fen-bilimleri/madde-ve-endustri",
  },
  {
    all: ["asit"],
    answer:
      "Asitlerin pH değeri 7'den küçüktür ve mavi turnusolü kırmızıya çevirir (limon, sirke). Bazların pH'ı 7'den büyüktür ve kırmızı turnusolü maviye çevirir (sabun).",
    topicRoute: "/ders/fen-bilimleri/madde-ve-endustri",
  },
  // ---------- Fen: Basit Makineler ----------
  {
    all: ["kaldirac"],
    answer:
      "Kaldıraç, bir destek noktası etrafında dönebilen çubuktur; yük, destek ve kuvvetin konumuna göre kuvvetten kazanç sağlayabilir. Tahterevalli ve maşa örnektir.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  {
    all: ["makara"],
    answer:
      "Sabit makara yalnız kuvvetin yönünü değiştirir; hareketli makara ise uygulanan kuvveti yarıya indirerek kuvvetten kazanç sağlar.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  {
    all: ["basit makine"],
    answer:
      "Basit makineler iş yaparken kolaylık sağlar; kuvvetten, yoldan veya yönden kazanç verebilir. Ancak hiçbiri işten kazanç sağlamaz.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  // ---------- Fen: Enerji ve Çevre ----------
  {
    all: ["fotosentez"],
    answer:
      "Fotosentez, bitkilerin güneş ışığı, su ve karbondioksit kullanarak besin ve oksijen ürettiği olaydır.",
    topicRoute: "/ders/fen-bilimleri/enerji-donusumleri-ve-cevre",
  },
  {
    all: ["besin zinciri"],
    answer:
      "Besin zinciri, canlılar arasındaki beslenme ilişkisidir. Üreticilerle başlar; ok, enerjinin yenenden yiyene doğru aktarıldığı yönü gösterir.",
    topicRoute: "/ders/fen-bilimleri/enerji-donusumleri-ve-cevre",
  },
  // ---------- Fen: Elektrik ----------
  {
    all: ["iletken"],
    answer:
      "İletkenler elektriği iletir (bakır, demir gibi metaller); yalıtkanlar iletmez (plastik, cam, tahta).",
    topicRoute: "/ders/fen-bilimleri/elektrik-yukleri-ve-enerjisi",
  },
  {
    all: ["elektroskop"],
    answer:
      "Elektroskop, bir cismin yüklü olup olmadığını ve yükünün cinsini anlamaya yarayan araçtır.",
    topicRoute: "/ders/fen-bilimleri/elektrik-yukleri-ve-enerjisi",
  },
  // ---------- Türkçe ----------
  {
    all: ["mecaz"],
    answer:
      "Mecaz anlam, bir sözcüğün gerçek anlamından uzaklaşıp başka bir kavramı anlatmasıdır. Örnek: 'Bana çok soğuk davrandı.'",
    topicRoute: "/ders/turkce/sozcukte-anlam",
  },
  {
    all: ["deyim"],
    answer:
      "Deyim, en az iki sözcükten oluşan, kalıplaşmış ve çoğu mecaz anlam taşıyan söz öbeğidir (örn. 'göz atmak'). Atasözünden farkı, öğüt/yargı bildirmemesidir.",
    topicRoute: "/ders/turkce/sozcukte-anlam",
  },
  {
    all: ["atasozu"],
    answer:
      "Atasözü, toplumun ortak deneyiminden doğan, öğüt veya genel bir yargı bildiren kalıp sözdür (örn. 'Damlaya damlaya göl olur').",
    topicRoute: "/ders/turkce/sozcukte-anlam",
  },
  {
    all: ["es sesli"],
    answer:
      "Eş sesli (sesteş) sözcükler, yazılışı aynı ama anlamı farklı sözcüklerdir. Örnek: 'yüz' (surat / 100 / yüzme eylemi).",
    topicRoute: "/ders/turkce/sozcukte-anlam",
  },
  {
    all: ["oznel"],
    answer:
      "Öznel cümle, kişiden kişiye değişen, kanıtlanamayan kişisel yorumdur. Nesnel cümle ise kanıtlanabilen, herkes için aynı olan bilgidir.",
    topicRoute: "/ders/turkce/cumlede-anlam",
  },
  {
    all: ["fiilimsi"],
    answer:
      "Fiilimsi, fiilden türeyen ama çekimli fiil olmayan sözcüktür; cümlede isim, sıfat veya zarf görevi yapar. Üç türü vardır: isim-fiil, sıfat-fiil, zarf-fiil.",
    topicRoute: "/ders/turkce/fiilimsiler",
  },
  {
    all: ["yuklem"],
    answer:
      "Yüklem, cümlede işi, oluşu veya durumu bildiren ögedir ve genellikle cümlenin sonunda bulunur. Özne ise işi yapan ögedir.",
    topicRoute: "/ders/turkce/cumlenin-ogeleri",
  },
  {
    all: ["edilgen"],
    answer:
      "Edilgen çatıda işi yapan belli değildir ve fiil -l/-n eki alır (örn. 'Cam kırıldı'). Etken çatıda ise özne (işi yapan) bellidir.",
    topicRoute: "/ders/turkce/fiilde-cati",
  },
  {
    all: ["kesme isareti"],
    answer:
      "Kesme işareti, özel adlara gelen çekim eklerini ayırır (Ankara'da, Ali'nin). Ancak yapım eklerini ayırmaz: 'Türkçe', 'Antalyalı'.",
    topicRoute: "/ders/turkce/noktalama-isaretleri",
  },
  {
    all: ["anlatim bozuklugu"],
    answer:
      "Anlatım bozukluğu; gereksiz sözcük, yanlış sözcük seçimi, özne-yüklem uyumsuzluğu veya mantık hatası gibi nedenlerle cümlenin doğru kurulamamasıdır.",
    topicRoute: "/ders/turkce/anlatim-bozukluklari",
  },
  {
    all: ["ana dusunce"],
    answer:
      "Ana düşünce, yazarın paragrafta okuyucuya vermek istediği asıl mesajdır. Konu ise paragrafın 'ne hakkında olduğu'dur.",
    topicRoute: "/ders/turkce/paragrafta-anlam",
  },
  // ---------- İnkılap ----------
  {
    all: ["mondros"],
    answer:
      "Mondros Ateşkes Antlaşması 30 Ekim 1918'de imzalandı. Bu antlaşmaya dayanılarak yurdun birçok yeri işgal edildi.",
    topicRoute: "/ders/inkilap/milli-uyanis",
  },
  {
    all: ["amasya"],
    answer:
      "Amasya Genelgesi (22 Haziran 1919), Kurtuluş Savaşı'nın amacını ilk kez belirtti: 'Milletin istiklalini yine milletin azim ve kararı kurtaracaktır.'",
    topicRoute: "/ders/inkilap/milli-uyanis",
  },
  {
    all: ["misak"],
    answer:
      "Misak-ı Millî (28 Ocak 1920), son Osmanlı Mebusan Meclisi'nde kabul edilen ve ulusal sınırları belirleyen kararlardır.",
    topicRoute: "/ders/inkilap/milli-uyanis",
  },
  {
    all: ["tbmm"],
    answer:
      "TBMM (Türkiye Büyük Millet Meclisi) 23 Nisan 1920'de Ankara'da açıldı.",
    topicRoute: "/ders/inkilap/milli-uyanis",
  },
  {
    all: ["sakarya"],
    answer:
      "Sakarya Meydan Muharebesi (1921) kazanıldıktan sonra TBMM, Mustafa Kemal'e 'Gazi' unvanı ve 'Mareşal' rütbesi verdi. ('Hattı müdafaa yoktur, sathı müdafaa vardır.')",
    topicRoute: "/ders/inkilap/milli-bir-destan",
  },
  {
    all: ["lozan"],
    answer:
      "Lozan Barış Antlaşması 24 Temmuz 1923'te imzalandı ve Türkiye'nin bağımsızlığını dünyaya kabul ettirdi.",
    topicRoute: "/ders/inkilap/milli-bir-destan",
  },
  {
    all: ["cumhuriyet"],
    answer:
      "Cumhuriyet 29 Ekim 1923'te ilan edildi ve Mustafa Kemal ilk cumhurbaşkanı oldu.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["halifelik"],
    answer:
      "Halifelik 3 Mart 1924'te kaldırıldı. (Saltanat ise daha önce, 1 Kasım 1922'de kaldırılmıştı.)",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["harf inkilabi"],
    answer:
      "Harf İnkılabı 1928'de yapıldı; yeni Türk alfabesine geçildi.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["ilkeleri"],
    answer:
      "Atatürk ilkeleri altı tanedir: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik ve İnkılapçılık.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["montro"],
    answer:
      "Montrö Boğazlar Sözleşmesi (1936) ile Boğazlar üzerinde Türk egemenliği güçlendirildi.",
    topicRoute: "/ders/inkilap/ataturk-donemi-dis-politika",
  },
  {
    all: ["hatay"],
    answer:
      "Hatay, 1939'da (Atatürk'ün ölümünden sonra) anavatana katıldı.",
    topicRoute: "/ders/inkilap/ataturk-donemi-dis-politika",
  },
  {
    all: ["ataturk", "olum"],
    answer:
      "Atatürk 10 Kasım 1938'de Dolmabahçe Sarayı'nda vefat etti. Yerine İsmet İnönü cumhurbaşkanı oldu.",
    topicRoute: "/ders/inkilap/ataturkun-olumu-ve-sonrasi",
  },
  // ---------- Matematik ----------
  {
    all: ["ebob"],
    answer:
      "EBOB (en büyük ortak bölen), iki ya da daha fazla sayının ortak bölenlerinin en büyüğüdür; ortak asal çarpanların en küçük üslüleri çarpılarak bulunur.",
    topicRoute: "/ders/matematik/carpanlar-ve-katlar",
  },
  {
    all: ["ekok"],
    answer:
      "EKOK (en küçük ortak kat), sayıların ortak katlarının en küçüğüdür; tüm asal çarpanların en büyük üslüleri çarpılarak bulunur.",
    topicRoute: "/ders/matematik/carpanlar-ve-katlar",
  },
  {
    all: ["asal"],
    answer:
      "Asal sayı, yalnızca 1'e ve kendisine bölünebilen 1'den büyük sayıdır (2, 3, 5, 7, 11...). En küçük asal sayı 2'dir.",
    topicRoute: "/ders/matematik/carpanlar-ve-katlar",
  },
  {
    all: ["uslu"],
    answer:
      "Üslü ifadede aⁿ biçiminde a taban, n üstür. Aynı tabanda çarpmada üsler toplanır, bölmede çıkarılır; sıfırdan farklı sayının 0. kuvveti 1'dir.",
    topicRoute: "/ders/matematik/uslu-ifadeler",
  },
  {
    all: ["karekok"],
    answer:
      "Karekök, karesi verilen sayıya eşit olan pozitif sayıdır: √16 = 4. Tam kareler: 1, 4, 9, 16, 25...",
    topicRoute: "/ders/matematik/karekoklu-ifadeler",
  },
  {
    all: ["pisagor"],
    answer:
      "Pisagor bağıntısı: dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir (a² + b² = c²).",
    topicRoute: "/ders/matematik/ucgenler",
  },
  {
    all: ["ucgen"],
    answer:
      "Bir üçgenin iç açıları toplamı 180°'dir. Dik üçgende Pisagor bağıntısı geçerlidir: a² + b² = c².",
    topicRoute: "/ders/matematik/ucgenler",
  },
  {
    all: ["ozdeslik"],
    answer:
      "Sık kullanılan özdeşlikler: (a+b)² = a²+2ab+b², (a−b)² = a²−2ab+b², a²−b² = (a−b)(a+b).",
    topicRoute: "/ders/matematik/cebirsel-ifadeler",
  },
  {
    all: ["olasilik"],
    answer:
      "Bir olayın olasılığı = istenen çıktı sayısı / tüm olası çıktı sayısıdır ve daima 0 ile 1 arasındadır.",
    topicRoute: "/ders/matematik/olasilik",
  },
  {
    all: ["ortalama"],
    answer:
      "Aritmetik ortalama, verilerin toplamının veri sayısına bölünmesiyle bulunur.",
    topicRoute: "/ders/matematik/veri-analizi",
  },
  {
    all: ["esitsizlik"],
    answer:
      "Eşitsizlikler <, >, ≤, ≥ sembolleriyle gösterilir. Negatif bir sayıyla çarpılıp bölününce eşitsizliğin yönü değişir.",
    topicRoute: "/ders/matematik/esitsizlikler",
  },
  {
    all: ["silindir"],
    answer:
      "Dik silindirin hacmi π·r²·h, yüzey alanı ise 2πr² + 2πrh'dir.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },
  // ---------- Din Kültürü ----------
  {
    all: ["kader"],
    answer:
      "Kader, Allah'ın olacak her şeyi önceden bilmesi ve belirlemesidir. Kaza ise kaderde belirlenenin zamanı gelince gerçekleşmesidir.",
    topicRoute: "/ders/din/kader-inanci",
  },
  {
    all: ["tevekkul"],
    answer:
      "Tevekkül, gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaktır; çalışmayı bırakmak değildir.",
    topicRoute: "/ders/din/kader-inanci",
  },
  {
    all: ["zekat"],
    answer:
      "Zekât, belirli zenginliğe (nisaba) ulaşan Müslümanın malının kırkta birini (1/40) ihtiyaç sahiplerine vermesidir; farzdır.",
    topicRoute: "/ders/din/zekat-sadaka-hac",
  },
  {
    all: ["hac"],
    answer:
      "Hac, imkânı olan Müslümanların ömründe bir kez Mekke'deki Kâbe'yi ziyaret ederek yaptığı ibadettir; farzdır.",
    topicRoute: "/ders/din/zekat-sadaka-hac",
  },
  {
    all: ["kuran"],
    answer:
      "Kur'an-ı Kerim, Hz. Muhammed'e Cebrail aracılığıyla yaklaşık 23 yılda indirilen son ilahi kitaptır. 114 sureden oluşur; ilk suresi Fatiha'dır.",
    topicRoute: "/ders/din/kuran-i-kerim-ve-ozellikleri",
  },
  // ---------- Atatürk ilkeleri ----------
  {
    all: ["cumhuriyetcilik"],
    answer:
      "Cumhuriyetçilik, devlet yönetiminin halkın egemenliğine dayandığı yönetim biçimini benimsemektir. En somut örneği 29 Ekim 1923'te Cumhuriyet'in ilanıdır.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["milliyetcilik"],
    answer:
      "Milliyetçilik, millî bilinci ve millî birliği önemseyen ilkedir. Türk Tarih Kurumu, Türk Dil Kurumu kuruluşları bu ilkenin uygulamalarıdır.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["halkcilik"],
    answer:
      "Halkçılık, halkın eşit haklara sahip olduğunu ve devletin halk için var olduğunu savunan ilkedir. Hukuk önünde eşitlik ve kadına seçme-seçilme hakkı örnektir.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["devletcilik"],
    answer:
      "Devletçilik, ekonominin gelişmesinde devletin etkin rol almasını öngören ilkedir. Sümerbank, Etibank ve demiryolu yatırımları bu ilkenin uygulamalarıdır.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["laiklik"],
    answer:
      "Laiklik, din ile devlet işlerinin ayrı tutulması ilkesidir. Halifeliğin kaldırılması (1924), Tevhid-i Tedrisat ve Medeni Kanun bu ilkenin uygulamalarıdır.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["inkilapcilik"],
    answer:
      "İnkılapçılık, sürekli yenileşmeyi ve çağın gereklerine ayak uydurmayı esas alan ilkedir. Harf İnkılabı (1928), takvim ve ölçü değişiklikleri bu ilkenin uygulamalarıdır.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  // ---------- DNA bazları ----------
  {
    all: ["adenin"],
    answer:
      "Adenin (A), DNA'daki 4 organik bazdan biridir. Karşılıklı eşleşmede daima Timin (T) ile eşleşir (A–T).",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["timin"],
    answer:
      "Timin (T), DNA'daki 4 organik bazdan biridir. Daima Adenin (A) ile eşleşir.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["guanin"],
    answer:
      "Guanin (G), DNA'daki 4 organik bazdan biridir. Daima Sitozin (C) ile eşleşir.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  {
    all: ["sitozin"],
    answer:
      "Sitozin (C), DNA'daki 4 organik bazdan biridir. Daima Guanin (G) ile eşleşir.",
    topicRoute: "/ders/fen-bilimleri/dna-ve-genetik-kod",
  },
  // ---------- Diğer ek tetikler ----------
  {
    all: ["ekinoks"],
    answer:
      "Ekinoks (21 Mart ve 23 Eylül), Güneş ışınlarının Ekvator'a dik düştüğü ve tüm dünyada gece ile gündüzün eşit (12-12 saat) olduğu tarihlerdir.",
    topicRoute: "/ders/fen-bilimleri/mevsimler-ve-iklim",
  },
  {
    all: ["pisagor uclu"],
    answer:
      "Pisagor üçlüleri, a² + b² = c² bağıntısını sağlayan tam sayı üçlüleridir. En çok karşılaşılanlar: 3-4-5, 5-12-13, 6-8-10, 8-15-17 ve 9-12-15.",
    topicRoute: "/ders/matematik/ucgenler",
  },
  // ---------- İnkılap ek tetikler ----------
  {
    all: ["saltanat"],
    answer:
      "Saltanat 1 Kasım 1922'de TBMM tarafından kaldırıldı. Böylece saltanat ve halifelik ayrıldı, son padişah Vahdettin yurt dışına çıktı.",
    topicRoute: "/ders/inkilap/ataturkculuk-ve-cagdaslasan-turkiye",
  },
  {
    all: ["mudanya"],
    answer:
      "Mudanya Ateşkesi 11 Ekim 1922'de imzalandı. Silahlar sustu, Boğazlar ve Doğu Trakya askersiz tahliye edildi. Bir barış antlaşması değil, ateşkestir.",
    topicRoute: "/ders/inkilap/milli-bir-destan",
  },
  {
    all: ["amasya gorusmeleri"],
    answer:
      "Amasya Görüşmeleri (Ekim 1919) ile İstanbul Hükümeti, TBMM'yi resmen tanımış ve Mebusan Meclisi'nin yeniden açılmasını kabul etmiştir.",
    topicRoute: "/ders/inkilap/milli-uyanis",
  },
  {
    all: ["takriri sukun", "takrir-i sukun"],
    answer:
      "Takrir-i Sükûn Kanunu (1925), Şeyh Sait İsyanı sonrasında çıkarıldı. Hükûmete olağanüstü yetkiler verdi ve Terakkiperver Cumhuriyet Fırkası'nın kapatılmasıyla sonuçlandı.",
    topicRoute: "/ders/inkilap/demokratiklesme-cabalari",
  },
  {
    all: ["musul"],
    answer:
      "Musul Sorunu, 1926 Ankara Antlaşması ile İngiltere lehine çözüldü. Türkiye 25 yıl boyunca Musul petrol gelirinin %10'unu almayı kabul etti.",
    topicRoute: "/ders/inkilap/ataturk-donemi-dis-politika",
  },
  {
    all: ["anitkabir"],
    answer:
      "Anıtkabir, Atatürk'ün ebedi istirahatgâhıdır. 10 Kasım 1953'te Atatürk'ün naaşı geçici kabirden (Etnografya Müzesi) buraya nakledildi.",
    topicRoute: "/ders/inkilap/ataturkun-olumu-ve-sonrasi",
  },
  // ---------- Din ek tetikler ----------
  {
    all: ["mutevekkil"],
    answer:
      "Tevekkül, gereken çabayı ve tedbiri aldıktan sonra sonucu Allah'a bırakmaktır. Çalışmadan beklemek değil; 'önce deveni bağla, sonra tevekkül et' anlayışıdır.",
    topicRoute: "/ders/din/kader-inanci",
  },
  {
    all: ["nisap"],
    answer:
      "Nisap, zekâtın farz olması için gereken asgari zenginlik miktarıdır. Nisaba ulaşmayan kişiye zekât farz değildir; nisaba ulaşan Müslüman malının kırkta birini verir.",
    topicRoute: "/ders/din/zekat-sadaka-hac",
  },
  {
    all: ["tavaf"],
    answer:
      "Tavaf, Kâbe'nin etrafında niyet edip yedi kez dönmektir. Haccın temel uygulamalarındandır; başlangıç ve bitiş noktası Hacerü'l-Esved'in karşısıdır.",
    topicRoute: "/ders/din/zekat-sadaka-hac",
  },
  {
    all: ["arafat"],
    answer:
      "Arafat, Mekke yakınlarındaki bir bölgedir. Haccın en önemli rüknüdür: Zilhicce 9'da Arafat'ta vakfeye çıkmayan haccı yapmamış sayılır.",
    topicRoute: "/ders/din/zekat-sadaka-hac",
  },
  {
    all: ["fatiha"],
    answer:
      "Fatiha, Kur'an-ı Kerim'in ilk suresidir ve 7 ayetten oluşur. Namazın her rekâtında okunur; 'Kitabın anası' (Ümmü'l-Kitab) olarak da adlandırılır.",
    topicRoute: "/ders/din/kuran-i-kerim-ve-ozellikleri",
  },
  {
    all: ["alak"],
    answer:
      "Alak suresi, Kur'an-ı Kerim'den ilk inen ayetleri içeren suredir. İlk 5 ayet 'Oku!' emriyle başlar ve okumanın, ilmin önemini vurgular.",
    topicRoute: "/ders/din/kuran-i-kerim-ve-ozellikleri",
  },
  {
    all: ["cebrail"],
    answer:
      "Cebrail (Aleyhisselam), peygamberlere vahiy getirmekle görevli melektir. Kur'an-ı Kerim, Hz. Muhammed'e yaklaşık 23 yıl boyunca Cebrail aracılığıyla indirilmiştir.",
    topicRoute: "/ders/din/kuran-i-kerim-ve-ozellikleri",
  },
  {
    all: ["istisare"],
    answer:
      "İstişare, karar alırken çevreyle danışmak, görüş almaktır. Hz. Muhammed önemli kararlarda sahabeyle istişare ederdi (Bedir'de mevzi, Hendek'te savunma şekli vb.).",
    topicRoute: "/ders/din/hz-muhammedin-ornekligi",
  },
];

function tryConcepts(input: string, tokens: string[]): CannedResult | null {
  for (const c of CONCEPTS) {
    if (c.all.every((item) => itemMatches(input, tokens, item))) {
      const reply = c.topicRoute ? `${c.answer}\n\n${OFFER}` : c.answer;
      return { reply, topicRoute: c.topicRoute ?? null };
    }
  }
  return null;
}

// ───────────────────────── Formüller (matematik + fen) ─────────────────────────
/**
 * Spesifik sayıları ezberletmek yerine GENEL FORMÜLÜ + ÖRNEĞİ + UYGULAMASINI öğretir.
 * Böylece öğrenci "2+3 kaç?" yerine "x+y nedir?" sorduğunda da yararlı cevap alır
 * ve formülü farklı problemlere uygulayabilir.
 *
 * Tüm formüller 8. sınıf MEB 2018 müfredatından alınmıştır; lise düzeyi formül yoktur.
 */
type Formula = {
  all: string[];
  name: string;
  formula: string;
  vars?: string;
  example: string;
  apply?: string;
  topicRoute?: string;
};

const FORMULAS: Formula[] = [
  // ───── Matematik: Üslü ifadeler ─────
  {
    all: ["uslu", "carp"],
    name: "Aynı tabanlı üslü ifadelerin çarpımı",
    formula: "aⁿ · aᵐ = aⁿ⁺ᵐ",
    vars: "a: taban; n, m: üsler",
    example: "2³ · 2⁴ = 2³⁺⁴ = 2⁷ = 128",
    apply: "Aynı taban ise üsleri toplarsın.",
    topicRoute: "/ders/matematik/uslu-ifadeler",
  },
  {
    all: ["uslu", "bol"],
    name: "Aynı tabanlı üslü ifadelerin bölümü",
    formula: "aⁿ ÷ aᵐ = aⁿ⁻ᵐ",
    vars: "a: taban; n, m: üsler",
    example: "5⁷ ÷ 5⁴ = 5⁷⁻⁴ = 5³ = 125",
    apply: "Aynı taban ise üsleri çıkarırsın (büyüğünden küçüğünü).",
    topicRoute: "/ders/matematik/uslu-ifadeler",
  },
  {
    all: ["us", "us"],
    name: "Üssün üssü",
    formula: "(aⁿ)ᵐ = aⁿ·ᵐ",
    vars: "a: taban; n, m: üsler",
    example: "(2³)² = 2³·² = 2⁶ = 64",
    apply: "Üslü bir ifadenin tekrar üssü alınırsa üsleri çarparsın.",
    topicRoute: "/ders/matematik/uslu-ifadeler",
  },
  {
    all: ["negatif", "us"],
    name: "Negatif üs",
    formula: "a⁻ⁿ = 1 ÷ aⁿ  (a ≠ 0)",
    vars: "a: taban; n: pozitif tam sayı",
    example: "2⁻³ = 1 ÷ 2³ = 1 ÷ 8",
    apply: "Negatif üs, sayının tersinin pozitif üsse alınmış hâlidir.",
    topicRoute: "/ders/matematik/uslu-ifadeler",
  },

  // ───── Matematik: Karekök ─────
  {
    all: ["karekok", "carp"],
    name: "Karekök çarpımı",
    formula: "√a · √b = √(a · b)",
    vars: "a, b ≥ 0",
    example: "√2 · √8 = √16 = 4",
    apply: "İki karekökü çarparken içlerini birleştirirsin.",
    topicRoute: "/ders/matematik/karekoklu-ifadeler",
  },
  {
    all: ["karekok", "bol"],
    name: "Karekök bölümü",
    formula: "√a ÷ √b = √(a ÷ b)",
    vars: "a ≥ 0, b > 0",
    example: "√50 ÷ √2 = √25 = 5",
    apply: "İki karekökü bölerken içlerini birleştirirsin.",
    topicRoute: "/ders/matematik/karekoklu-ifadeler",
  },
  {
    all: ["karekok", "kare"],
    name: "Karekökün karesi",
    formula: "(√a)² = a  (a ≥ 0)",
    vars: "a: kök içindeki sayı",
    example: "(√7)² = 7",
    apply: "Karekökün karesini alırsan kök kalkar, içerideki sayı kalır.",
    topicRoute: "/ders/matematik/karekoklu-ifadeler",
  },

  // ───── Matematik: Cebirsel özdeşlikler ─────
  {
    all: ["tam kare", "topla"],
    name: "Tam kare özdeşliği (toplam)",
    formula: "(a + b)² = a² + 2ab + b²",
    vars: "a, b: terimler",
    example: "(x + 3)² = x² + 6x + 9",
    apply: "İki terimin toplamının karesi: birincinin karesi + 2 · birinci · ikinci + ikincinin karesi.",
    topicRoute: "/ders/matematik/cebirsel-ifadeler",
  },
  {
    all: ["tam kare", "fark"],
    name: "Tam kare özdeşliği (fark)",
    formula: "(a − b)² = a² − 2ab + b²",
    vars: "a, b: terimler",
    example: "(x − 5)² = x² − 10x + 25",
    apply: "İki terimin farkının karesi: birincinin karesi − 2 · birinci · ikinci + ikincinin karesi.",
    topicRoute: "/ders/matematik/cebirsel-ifadeler",
  },
  {
    all: ["iki kare fark"],
    name: "İki kare farkı",
    formula: "a² − b² = (a − b)(a + b)",
    vars: "a, b: terimler",
    example: "x² − 25 = (x − 5)(x + 5)",
    apply: "İki karenin farkını çarpanlarına ayırmak için (fark)·(toplam) yazarsın.",
    topicRoute: "/ders/matematik/cebirsel-ifadeler",
  },

  // ───── Matematik: Doğru denklemi & eğim ─────
  {
    all: ["egim"],
    name: "Doğrunun eğimi",
    formula: "m = (y₂ − y₁) ÷ (x₂ − x₁)",
    vars: "(x₁, y₁) ve (x₂, y₂): doğru üzerindeki iki nokta",
    example: "(1, 2) ve (3, 6) noktaları için m = (6 − 2) ÷ (3 − 1) = 4 ÷ 2 = 2",
    apply: "Doğru üzerindeki iki noktayı bilirsen y'lerin farkını x'lerin farkına bölersin.",
    topicRoute: "/ders/matematik/dogrusal-denklemler",
  },
  {
    all: ["dogru denklem"],
    name: "Doğrunun denklemi",
    formula: "y = m · x + n",
    vars: "m: eğim; n: y eksenini kestiği nokta",
    example: "Eğim 2, y eksenini 1'de kesen doğru: y = 2x + 1",
    apply: "Eğim ve y-eksenini kestiği noktayı bilirsen denklemi doğrudan yazarsın.",
    topicRoute: "/ders/matematik/dogrusal-denklemler",
  },

  // ───── Matematik: Üçgen alan & Pisagor ─────
  {
    all: ["ucgen", "alan"],
    name: "Üçgenin alanı",
    formula: "A = (taban · yükseklik) ÷ 2",
    vars: "taban: bir kenar; yükseklik: o kenara inen dik yükseklik",
    example: "Taban 6 cm, yükseklik 4 cm → A = (6 · 4) ÷ 2 = 12 cm²",
    apply: "Bir tabanı ve o tabana ait yüksekliği biliyorsan formülü uygularsın.",
    topicRoute: "/ders/matematik/ucgenler",
  },
  {
    all: ["pisagor"],
    name: "Pisagor Bağıntısı (dik üçgen)",
    formula: "a² + b² = c²",
    vars: "a, b: dik kenarlar; c: hipotenüs",
    example: "Dik kenarlar 3 ve 4 → c² = 9 + 16 = 25 → c = 5",
    apply: "Dik üçgende iki kenarı bilirsen üçüncüyü bu bağıntıyla bulursun.",
    topicRoute: "/ders/matematik/ucgenler",
  },

  // ───── Matematik: Dörtgen / kare / dikdörtgen ─────
  {
    all: ["dikdortgen", "alan"],
    name: "Dikdörtgenin alanı",
    formula: "A = uzun kenar · kısa kenar",
    vars: "a, b: kenarlar",
    example: "5 cm · 3 cm = 15 cm²",
    apply: "İki kenarı çarparsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },
  {
    all: ["kare", "alan"],
    name: "Karenin alanı",
    formula: "A = a · a = a²",
    vars: "a: bir kenar",
    example: "5 · 5 = 25 cm²",
    apply: "Bir kenarın karesini alırsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },

  // ───── Matematik: Hacim ─────
  {
    all: ["kupun", "hacm"],
    name: "Küpün hacmi",
    formula: "V = a³ = a · a · a",
    vars: "a: ayrıt uzunluğu",
    example: "Ayrıt 3 cm → V = 27 cm³",
    apply: "Bir ayrıtın küpünü alırsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },
  // Ünsüz yumuşaması varyantı: "küp" → "kübün, kübü"
  {
    all: ["kubun", "hacm"],
    name: "Küpün hacmi",
    formula: "V = a³ = a · a · a",
    vars: "a: ayrıt uzunluğu",
    example: "Ayrıt 3 cm → V = 27 cm³",
    apply: "Bir ayrıtın küpünü alırsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },
  {
    all: ["prizma", "hacm"],
    name: "Dikdörtgenler prizmasının hacmi",
    formula: "V = a · b · c",
    vars: "a, b, c: üç farklı ayrıt",
    example: "2 · 3 · 4 = 24 cm³",
    apply: "Üç farklı ayrıtı çarparsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },
  {
    all: ["silindir", "hacm"],
    name: "Silindirin hacmi",
    formula: "V = π · r² · h",
    vars: "r: taban yarıçapı; h: yükseklik; π ≈ 3 ya da 22/7",
    example: "r=5, h=10, π=3 → V = 3 · 25 · 10 = 750 cm³",
    apply: "Taban dairesinin alanı π·r² ile yüksekliği çarparsın.",
    topicRoute: "/ders/matematik/geometrik-cisimler",
  },

  // ───── Matematik: Veri analizi ─────
  {
    all: ["aritmetik ortalama"],
    name: "Aritmetik Ortalama",
    formula: "Ort = (x₁ + x₂ + ... + xₙ) ÷ n",
    vars: "xᵢ: veriler; n: veri sayısı",
    example: "4, 6, 8 için Ort = (4+6+8) ÷ 3 = 6",
    apply: "Verileri toplayıp veri sayısına bölersin.",
    topicRoute: "/ders/matematik/veri-analizi",
  },
  {
    all: ["aciklik"],
    name: "Açıklık",
    formula: "Açıklık = en büyük veri − en küçük veri",
    vars: "—",
    example: "2, 5, 9 için: 9 − 2 = 7",
    apply: "Verinin en büyük ve en küçük değerinin farkını alırsın.",
    topicRoute: "/ders/matematik/veri-analizi",
  },

  // ───── Matematik: Olasılık ─────
  {
    all: ["olasilik", "formul"],
    name: "Basit Olasılık",
    formula: "P(A) = istenen sonuç sayısı ÷ tüm olası sonuç sayısı",
    vars: "0 ≤ P(A) ≤ 1",
    example: "Hilesiz zarda çift gelmesi: 3/6 = 1/2",
    apply: "İstenen durum sayısını tüm olası durum sayısına bölersin.",
    topicRoute: "/ders/matematik/olasilik",
  },

  // ───── Fen: Basınç ─────
  {
    all: ["basinc", "formul"],
    name: "Katı basıncı",
    formula: "P = F ÷ A",
    vars: "F: ağırlık (N); A: yüzey alanı (m²); P: basınç (Pa)",
    example: "60 N ağırlık, 0,3 m² yüzeyde → P = 60 ÷ 0,3 = 200 Pa",
    apply: "Yüzeye dik kuvveti, dokunma alanına bölersin.",
    topicRoute: "/ders/fen-bilimleri/basinc",
  },
  {
    all: ["sivi basinci"],
    name: "Sıvı basıncı",
    formula: "P = h · d · g",
    vars: "h: derinlik; d: yoğunluk; g: yer çekimi ivmesi",
    example: "Derinlik artarsa basınç artar; aynı derinlikte tüm noktalar eşit basınca uğrar.",
    apply: "Sıvı derinliği ve yoğunluğunu kullanırsın; kabın şekli basıncı etkilemez.",
    topicRoute: "/ders/fen-bilimleri/basinc",
  },

  // ───── Fen: Basit Makineler ─────
  {
    all: ["egik duzlem", "formul"],
    name: "Eğik düzlem (iş eşitliği)",
    formula: "F · L = G · h",
    vars: "F: uygulanan kuvvet; L: eğik düzlemin uzunluğu; G: yük ağırlığı; h: yükseklik",
    example: "G=100 N, h=2 m, L=10 m → F = (100·2) ÷ 10 = 20 N",
    apply: "Uzun bir eğik düzlem daha az kuvvet ister; ama yol uzar (işten kazanç yok).",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  {
    all: ["kaldirac", "denge"],
    name: "Kaldıraçta denge",
    formula: "F · kuvvet kolu = G · yük kolu",
    vars: "F: uygulanan kuvvet; G: yük ağırlığı",
    example: "Tahterevallide ağır çocuk destek noktasına daha yakın oturursa denge kurulur.",
    apply: "Kuvvet kolu uzun olursa daha küçük kuvvet yeter.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },
  {
    all: ["hareketli makara"],
    name: "Hareketli makara",
    formula: "F = G ÷ 2",
    vars: "F: uygulanan kuvvet; G: yük",
    example: "200 N yükü hareketli makara ile 100 N kuvvet uygulayarak kaldırırsın.",
    apply: "Hareketli makara kuvvetten yarı yarıya kazanç sağlar; ama ipin çekilen yolu iki katıdır.",
    topicRoute: "/ders/fen-bilimleri/basit-makineler",
  },

  // ───── Fen: Elektrik ─────
  {
    all: ["ohm"],
    name: "Ohm Yasası",
    formula: "V = I · R",
    vars: "V: gerilim (Volt); I: akım (Amper); R: direnç (Ohm)",
    example: "I=2 A, R=5 Ω → V = 2 · 5 = 10 V",
    apply: "Gerilim, akım ve direncin çarpımına eşittir; iki büyüklüğü bilirsen üçüncüyü bulursun.",
    topicRoute: "/ders/fen-bilimleri/elektrik-yukleri-ve-enerjisi",
  },
  {
    all: ["seri direnc"],
    name: "Seri bağlı dirençler",
    formula: "R_eş = R₁ + R₂ + R₃ + ...",
    vars: "R_eş: toplam eş değer direnç",
    example: "R₁=2, R₂=3, R₃=5 → R_eş = 10 Ω",
    apply: "Seri bağlamada dirençler toplanır; akım her direnç üzerinden aynı geçer.",
    topicRoute: "/ders/fen-bilimleri/elektrik-yukleri-ve-enerjisi",
  },

  // ───── Temel aritmetik (en sona — spesifik formüller önce gelsin) ─────
  {
    all: ["toplama"],
    name: "Toplama",
    formula: "a + b = c",
    vars: "a, b: toplananlar; c: toplam",
    example: "2 + 3 = 5; 12 + 8 = 20",
    apply: "Sayıları + işaretle birleştirirsin; sonuç toplamlarına eşittir.",
  },
  {
    all: ["cikarma"],
    name: "Çıkarma",
    formula: "a − b = c",
    vars: "a: eksilen; b: çıkan; c: fark",
    example: "7 − 3 = 4; 20 − 12 = 8",
    apply: "Büyük sayıdan küçüğü çıkarırsın; sonuç farktır.",
  },
  {
    all: ["carpma"],
    name: "Çarpma",
    formula: "a · b = c (a × b biçiminde de yazılır)",
    vars: "a, b: çarpanlar; c: çarpım",
    example: "2 · 3 = 6; 7 · 8 = 56",
    apply: "İki sayıyı çarpar, çarpım elde edersin.",
  },
  {
    all: ["bolme"],
    name: "Bölme",
    formula: "a ÷ b = c  (b ≠ 0)",
    vars: "a: bölünen; b: bölen; c: bölüm",
    example: "12 ÷ 4 = 3; 30 ÷ 6 = 5",
    apply: "Bir sayıyı eşit parçalara bölersin; her parçanın değeri bölümdür.",
  },
  // Sözlü/çekimli varyantlar — daha spesifik formüller eşleşmediyse devreye girer
  {
    all: ["topla"],
    name: "Toplama",
    formula: "a + b = c",
    vars: "a, b: toplananlar; c: toplam",
    example: "2 + 3 = 5",
    apply: "Sayıları + işaretiyle birleştirirsin; sonuç toplamdır.",
  },
  {
    all: ["carpi"],
    name: "Çarpma",
    formula: "a · b = c (a × b biçiminde de yazılır)",
    vars: "a, b: çarpanlar; c: çarpım",
    example: "2 · 3 = 6",
    apply: "İki sayıyı çarpar, çarpım elde edersin.",
  },
];

function tryFormulas(input: string, tokens: string[]): CannedResult | null {
  for (const f of FORMULAS) {
    if (f.all.every((item) => itemMatches(input, tokens, item))) {
      const lines = [
        `**${f.name}**`,
        `Formül: ${f.formula}`,
      ];
      if (f.vars) lines.push(`Değişkenler: ${f.vars}`);
      lines.push(`Örnek: ${f.example}`);
      if (f.apply) lines.push(`Nasıl uygularsın: ${f.apply}`);
      const body = lines.join("\n");
      const reply = f.topicRoute ? `${body}\n\n${OFFER}` : body;
      return { reply, topicRoute: f.topicRoute ?? null };
    }
  }
  return null;
}

// ───────────────────────── Ana eşleştirici ─────────────────────────

export function matchCanned(text: string): CannedResult | null {
  const input = normalize(text);
  if (!input) return null;
  const tokens = input.split(" ");

  return (
    tryIntents(input, tokens) ??
    tryNavigation(input, tokens) ??
    tryFormulas(input, tokens) ??
    tryArithmetic(text) ??
    tryConcepts(input, tokens)
  );
}
