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
  if (item.length >= 5) return input.includes(item);
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
      "Mevsimler, Dünya'nın ekseninin 23,5° eğik olması ve Güneş etrafında dolanması nedeniyle oluşur. Bu, Güneş ışınlarının düşme açısını ve birim yüzeye düşen enerjiyi değiştirir.",
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

// ───────────────────────── Ana eşleştirici ─────────────────────────

export function matchCanned(text: string): CannedResult | null {
  const input = normalize(text);
  if (!input) return null;
  const tokens = input.split(" ");

  return (
    tryIntents(input, tokens) ??
    tryNavigation(input, tokens) ??
    tryArithmetic(text) ??
    tryConcepts(input, tokens)
  );
}
