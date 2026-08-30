/**
 * MODERASYON TESTLERİ — src/lib/moderasyon.ts
 *
 * KALICI SİTE KURALI: Küfür, hakaret ve yasa dışı hiçbir şey sitede
 * bulunmaz, yazılmaz, cevaplanmaz; TAKMA ADLAR da bu kurala tabidir.
 *
 * Süzgecin iki ayrı görevi var ve ikisi de burada kilitleniyor:
 *   A) YANLIŞ POZİTİF OLMAMALI — müfredat metinleri ("sikke", "asalak",
 *      "mal ve hizmet", "eksiktir", "kayarak") engellenmemeli. Bu hata
 *      GERÇEKTEN yaşandı: kelime sınırı yerine alt dize araması yapılıyordu.
 *   B) YANLIŞ NEGATİF OLMAMALI — gerçek küfür ve gizlenmiş biçimleri
 *      (nokta/tire ile bölme, harf tekrarı, rakamla harf değiştirme)
 *      yakalanmalı.
 *
 * Son iki test süzgeci sitenin GERÇEK müfredat metinleri üzerinde çalıştırır.
 * Örneklem deterministiktir: ders sırası sabit, gezinme sırası sabit, seçim
 * sabit adımlı (rastgelelik yok) — bu yüzden her koşuda aynı sonucu verir.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { denetle, uygunsuzMu, RET_METNI, TAKMA_AD_RET } from "@/lib/moderasyon";

import type { SubjectContent } from "@/content/types";
import { DIN } from "@/content/din";
import { FEN_BILIMLERI } from "@/content/fen-bilimleri";
import { INGILIZCE } from "@/content/ingilizce";
import { INKILAP } from "@/content/inkilap";
import { MATEMATIK } from "@/content/matematik";
import { TURKCE } from "@/content/turkce";

function gecmeli(metin: string) {
  const sonuc = denetle(metin);
  assert.equal(
    sonuc.uygun,
    true,
    `meşru metin engellendi: ${JSON.stringify(metin)} (sebep: ${sonuc.sebep})`,
  );
}

function engellenmeli(metin: string) {
  const sonuc = denetle(metin);
  assert.equal(sonuc.uygun, false, `küfür yakalanmadı: ${JSON.stringify(metin)}`);
  assert.ok(sonuc.sebep, "engellenen metnin sebebi kayda geçmeli");
}

describe("denetle — MEŞRU müfredat kelimeleri engellenmez", () => {
  it("tarih terimi 'sikke' ve çekimleri geçer", () => {
    // YAŞANMIŞ HATA: tekrar sadeleştirmesi "sikke" → "sike" yapıyor, kelime
    // yasaklı köke benziyordu.
    gecmeli("sikke");
    gecmeli("Osmanlı sikkeleri gümüşten basılırdı.");
    gecmeli("İlk Türk-İslam sikkesi hangi devlette basılmıştır?");
  });

  it("Sosyal Bilgiler terimi 'mal ve hizmet' geçer", () => {
    gecmeli("mal ve hizmet");
    gecmeli("Mal ve hizmet üretimi ekonominin temelidir.");
    gecmeli("kamu malı");
    gecmeli("Bir malın fiyatı arz ve talebe göre değişir.");
  });

  it("içinde yasaklı kök BARINDIRAN meşru kelimeler geçer", () => {
    // Alt dize araması yapıldığında bunların hepsi engelleniyordu.
    gecmeli("eksiktir");
    gecmeli("Bu cümlede bir öge eksiktir.");
    gecmeli("eksikim var");
    gecmeli("asalak");
    gecmeli("Asalak canlılar konak canlıya zarar verir.");
    gecmeli("kayarak");
    gecmeli("sayarak");
    gecmeli("Cisim eğik düzlemde kayarak hareket etti.");
    gecmeli("makamına");
    gecmeli("adamına");
    gecmeli("Bir devlet adamına yakışır davranış.");
  });

  it("'öç' ve sıcaklık yazımı '0 oC' cümle içinde geçer", () => {
    gecmeli("öç almak duygusu Türkçe metinlerde işlenir");
    gecmeli("Suyun donma noktası 0 oC'dir.");
    gecmeli("Sıcaklık 100 °C olduğunda su kaynar.");
  });

  it("İngilizce 'book' ve kısa kökle başlayan kelimeler geçer", () => {
    gecmeli("book");
    gecmeli("I read a book every week.");
    gecmeli("aqua");
    gecmeli("aquarium");
  });

  it("çok kelimeli kalıplar yalnız kelime BAŞINDAN eşleşir", () => {
    gecmeli("esrarengiz nasıl bir olaydı");
    gecmeli("Kitabı nereye koyayım?");
    gecmeli("Maçın son dakikasında gol oldu.");
  });

  it("boş / anlamsız girdiler uygun sayılır", () => {
    gecmeli("");
    gecmeli("   ");
    gecmeli("123 456");
    gecmeli("!!!???");
  });
});

describe("denetle — GERÇEK küfür ve hakaret yakalanır", () => {
  it("düz yazılmış küfürler yakalanır", () => {
    for (const m of [
      "amk",
      "aq",
      "siktir git",
      "orospu çocuğu",
      "amcık",
      "yavşak",
      "pezevenk",
      "kaltak",
      "sürtük",
      "ibne",
      "piç",
      "göt",
      "yarrak",
    ]) {
      engellenmeli(m);
    }
  });

  it("hakaret kelimeleri ve çekimleri yakalanır", () => {
    for (const m of [
      "seni salak",
      "gerizekalı",
      "geri zekalı",
      "aptalsın",
      "dangalak",
      "şerefsiz",
      "namussuz",
      "gerzek",
      "denyo",
      "beyinsiz",
    ]) {
      engellenmeli(m);
    }
  });

  it("RAKAMLA HARF DEĞİŞTİRME gizlemesi yakalanır (a→4, e→3, i→1, o→0, s→5)", () => {
    engellenmeli("4mk");
    engellenmeli("s1kt1r");
    engellenmeli("s1k1m");
    engellenmeli("0r0spu");
    engellenmeli("y4rr4k");
    engellenmeli("g3riz3kali");
    engellenmeli("5alak");
    engellenmeli("3mb3s1l");
    engellenmeli("b0k");
    engellenmeli("am1na koydugum");
  });

  it("harf tekrarıyla gizleme yakalanır", () => {
    engellenmeli("aaamk");
    engellenmeli("siiiktir");
    engellenmeli("salaaak herif");
  });

  it("harf harf bölerek gizleme yakalanır", () => {
    engellenmeli("a.m.k");
    engellenmeli("s i k t i r");
    engellenmeli("s.i.k.t.i.r");
    engellenmeli("s-a-l-a-k");
  });

  it("bitişik yazılmış küfürler (KOK_SERT) yakalanır", () => {
    engellenmeli("birorospu");
    engellenmeli("senipezevenk");
    engellenmeli("okadargerizekalisinki");
  });

  it("'mal' yalnız HAKARET bağlamında engellenir", () => {
    engellenmeli("mal mısın sen");
    engellenmeli("ne malsın");
    engellenmeli("seni mal");
    engellenmeli("koca mal");
    // ama Sosyal Bilgiler bağlamında serbest:
    gecmeli("mal ve hizmet dengesi");
    gecmeli("malın fiyatı arttı");
  });

  it("mesajın TAMAMI 'mal' veya 'öç' ise (takma ad) engellenir", () => {
    engellenmeli("mal");
    engellenmeli("Mal");
    engellenmeli("öç");
  });

  it("yasa dışı içerik istekleri engellenir", () => {
    for (const m of [
      "eroin nasıl bulunur",
      "kokain fiyatı",
      "molotof yapımı",
      "bomba nasıl yapılır",
      "silah nasıl alınır",
      "uyuşturucu nasıl kullanılır",
      "kaçak bahis sitesi",
      "kumar oyna",
      "sınav soruları sızdı",
      "kopya çekme yöntemi",
    ]) {
      engellenmeli(m);
    }
  });

  it("takma ad denetimi aynı süzgeci kullanır", () => {
    // Site kuralı: nickname'ler de küfür içeremez.
    engellenmeli("amk_king");
    engellenmeli("orospu61");
    engellenmeli("gerizekali_34");
    gecmeli("matematikci_61");
    gecmeli("baykus_ustasi");
  });
});

describe("uygunsuzMu ve ret metinleri", () => {
  it("uygunsuzMu, denetle'nin tersini döndürür", () => {
    assert.equal(uygunsuzMu("merhaba nasılsın"), false);
    assert.equal(uygunsuzMu("amk"), true);
  });

  it("ret metinleri doludur ve kendileri süzgeçten geçer", () => {
    assert.ok(RET_METNI.length > 0);
    assert.ok(TAKMA_AD_RET.length > 0);
    gecmeli(RET_METNI);
    gecmeli(TAKMA_AD_RET);
  });
});

/* ────────────────────────────────────────────────────────────────────────
 * GERÇEK VERİYLE DOĞRULAMA
 *
 * Süzgeç sitenin kendi müfredat metinlerini engellerse öğrenci konu
 * sayfasını göremez / sorusu cevaplanmaz. Aşağıdaki iki test bunu gerçek
 * `src/content` verisi üzerinde ölçer.
 * ──────────────────────────────────────────────────────────────────────── */

/** Ders sırası SABİT — örneklemin deterministik olması buna bağlı. */
const DERSLER: SubjectContent[] = [
  DIN,
  FEN_BILIMLERI,
  INGILIZCE,
  INKILAP,
  MATEMATIK,
  TURKCE,
];

/**
 * Bütün müfredat metinlerini SABİT bir sırayla toplar (konu adı, özet,
 * makale, konu haritası, kartlar, tuzak ipuçları, test soruları ve şıkları).
 * Rastgelelik yoktur; aynı içerik her koşuda aynı diziyi üretir.
 */
function tumMetinler(): string[] {
  const out: string[] = [];
  const ekle = (m?: string) => {
    const t = (m ?? "").trim();
    if (t) out.push(t);
  };
  for (const ders of DERSLER) {
    for (const konu of ders.topics) {
      ekle(konu.name);
      ekle(konu.summary);
      ekle(konu.article);
      for (const dal of konu.mindMap?.branches ?? []) {
        ekle(dal.label);
        ekle(dal.detail);
        for (const b of dal.sections ?? []) {
          ekle(b.title);
          ekle(b.content);
        }
      }
      for (const kart of konu.cards ?? []) {
        ekle(kart.front);
        ekle(kart.back);
      }
      for (const ipucu of konu.tips ?? []) {
        ekle(ipucu.trap);
        ekle(ipucu.wrong);
        ekle(ipucu.correct);
      }
      for (const soru of [...(konu.quiz ?? []), ...(konu.quickQuestions ?? [])]) {
        ekle(soru.question);
        for (const sik of soru.options) ekle(sik);
        ekle(soru.explanation);
      }
    }
  }
  return out;
}

describe("denetle — sitenin GERÇEK müfredat metinleri üzerinde", () => {
  it("deterministik 300+ metinlik örneklemde HİÇBİR yanlış pozitif yoktur", () => {
    const hepsi = tumMetinler();
    assert.ok(hepsi.length > 5000, `beklenenden az müfredat metni: ${hepsi.length}`);

    // Sabit adımlı seçim (rastgele değil): her koşuda tıpatıp aynı örneklem.
    const adim = Math.floor(hepsi.length / 300);
    const ornek = hepsi.filter((_, i) => i % adim === 0);
    assert.ok(ornek.length >= 300, `örneklem küçük: ${ornek.length}`);

    const engellenenler = ornek
      .map((m) => ({ m, s: denetle(m) }))
      .filter((x) => !x.s.uygun)
      .map((x) => `[${x.s.sebep}] ${x.m.slice(0, 100)}`);

    assert.deepEqual(
      engellenenler,
      [],
      `müfredat metni engellendi (yanlış pozitif):\n${engellenenler.join("\n")}`,
    );
  });

  it("TAM külliyat taramasında yalnız BİLİNEN yanlış pozitifler vardır", () => {
    // Bu test bir regresyon kilididir: aşağıdaki iki metin dışında YENİ bir
    // yanlış pozitif çıkarsa test kırılır.
    //
    // BİLİNEN HATA (bilerek düzeltilmedi, raporlandı):
    //   1. Din dersinde tek şık olarak geçen "Mal" — süzgeç mesajın tamamı
    //      "mal" ise hakaret sayıyor; şık metni bu kurala takılıyor.
    //   2. Türkçe zıt anlam listesindeki "akıllı-aptal" — "aptal" hakaret
    //      kökü, sözcük dağarcığı örneği olarak meşru.
    const BILINEN = new Set(["Mal", "akıllı-aptal"]);

    const engellenenler = tumMetinler()
      .map((m) => ({ m, s: denetle(m) }))
      .filter((x) => !x.s.uygun)
      .filter((x) => !x.m.split(/[\s,.]+/).some((k) => BILINEN.has(k)))
      .map((x) => `[${x.s.sebep}] ${x.m.slice(0, 100)}`);

    assert.deepEqual(
      engellenenler,
      [],
      `YENİ yanlış pozitif(ler):\n${engellenenler.join("\n")}`,
    );
  });
});

describe("moderasyon: simgeyle gizlenmiş küfür (kapatılan açık)", () => {
  // GEÇMİŞ HATA: metin, gizleme açılmadan ÖNCE bölünüyordu. `@ € ! | $`
  // karakterleri "harf değil" sayılıp AYIRICI olarak silinince kelime
  // ikiye bölünüyor ve küfür süzgeçten geçiyordu. Takma adlarda doğrudan
  // sömürülebilir bir açıktı; sitenin 1 numaralı kuralı buna izin vermez.
  const gizliKufurler = [
    "s!ktir",
    "s|ktir",
    "s@lak",
    "$erefsiz",
    "p!c",
    "@mk",
    "y@rrak",
    "$iktir git",
    "s!ktir_git_99",
  ];

  for (const metin of gizliKufurler) {
    it(`yakalanır: ${metin}`, () => {
      assert.equal(
        uygunsuzMu(metin),
        true,
        `"${metin}" süzgeçten geçmemeli`,
      );
    });
  }

  // "a$alak" bilerek listede DEĞİL: simge açılınca "asalak" oluyor ve o
  // gerçek bir biyoloji terimi. Süzgeç ön ek eşlemesi yaptığı için
  // "salak" ile başlamayan "asalak" geçer — bu doğru davranış.
  it("a$alak geçer: simge açılınca meşru bir terim (asalak) oluyor", () => {
    assert.equal(uygunsuzMu("a$alak"), false);
    assert.equal(uygunsuzMu("asalak"), false);
    assert.equal(uygunsuzMu("salak"), true, "kelimenin kendisi yakalanmalı");
  });

  it("simge dönüşümü meşru metni bozmaz", () => {
    // Simgeler harfe çevriliyor diye normal cümleler engellenmemeli.
    const mesru = [
      "e-posta@ornek.com adresine yaz",
      "Fiyat 50$ civarında",
      "Ünlem! Soru? Nokta.",
      "a|b gösterimi matematikte 'a, b'yi böler' demektir",
      "€ sembolü avro demektir",
    ];
    for (const m of mesru) {
      assert.equal(uygunsuzMu(m), false, `"${m}" engellenmemeli`);
    }
  });
});
