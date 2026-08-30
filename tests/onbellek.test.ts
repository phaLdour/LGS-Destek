/**
 * ÖNBELLEK TESTLERİ — src/lib/aiOnbellek.ts + src/lib/baykusYerelOnbellek.ts
 *
 * Buradaki testlerin çoğu GERÇEKTEN YAŞANMIŞ hataların geri gelmesini
 * engellemek içindir; her birinin başında hangi hatayı kilitlediği yazar.
 *
 * Determinizm notu: hiçbir test saat dilimine, rastgeleliğe veya ağa bağlı
 * değildir. Zamana bağlı tek yer cihaz önbelleğinin ömür denetimidir; orada
 * da zaman damgası testin kendisi tarafından yazılır (Date.now() farkı
 * kullanılır, mutlak takvim değeri değil).
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { bagimsizSoruMu, onbellegeUygunMu, parmakIzi } from "@/lib/aiOnbellek";

/** Testlerde sık kullanılan, önbelleğe uygun uzunlukta örnek cevap. */
const GECERLI_CEVAP =
  "Üslü sayılar, bir sayının kendisiyle tekrarlı çarpımını kısa yoldan gösterir.";

describe("parmakIzi — soruyu önbellek anahtarına çevirme", () => {
  it("SAYILAR ELENMEZ: '7. sınıf' ile '8. sınıf' sorusu ayrı anahtarlara düşer", () => {
    // YAŞANMIŞ HATA: tek karakterli her belirteç atılıyordu; "7 sinif" ve
    // "8 sinif" aynı "sinif" anahtarına düşüyor, 7. sınıf sorusuna 8. sınıf
    // cevabı dönüyordu.
    const yedi = parmakIzi("7. sınıf konuları neler");
    const sekiz = parmakIzi("8. sınıf konuları neler");
    assert.ok(yedi, "7. sınıf sorusu anahtar üretmeli");
    assert.ok(sekiz, "8. sınıf sorusu anahtar üretmeli");
    assert.notEqual(yedi, sekiz);
  });

  it("tek haneli sayı anahtarda korunur", () => {
    assert.match(parmakIzi("8. sınıf konuları neler") ?? "", /(^| )8( |$)/);
    assert.match(parmakIzi("7. sınıf konuları neler") ?? "", /(^| )7( |$)/);
  });

  it("çok haneli sayılar da farklılaştırır: '2023 LGS' ile '2024 LGS' ayrışır", () => {
    assert.notEqual(parmakIzi("2023 LGS sayısal bölüm"), parmakIzi("2024 LGS sayısal bölüm"));
  });

  it("DOLGU LİSTESİ: 'suyun kaldırma kuvveti' ile 'kaldırma kuvveti' ayrı anahtarlara düşer", () => {
    // YAŞANMIŞ HATA: DOLGU listesinde "su" vardı; atılınca iki farklı Fen
    // sorusu aynı anahtara düşüyordu.
    const suyla = parmakIzi("suyun kaldırma kuvveti");
    const susuz = parmakIzi("kaldırma kuvveti");
    assert.ok(suyla);
    assert.ok(susuz);
    assert.notEqual(suyla, susuz);
  });

  it("'su döngüsü nasıl olur' sorusundaki 'su' anahtarda kalır", () => {
    assert.notEqual(parmakIzi("su döngüsü nasıl olur"), parmakIzi("döngüsü nasıl olur"));
  });

  it("'bir' sayı olarak anlam taşır: 'bir basamaklı sayı' ≠ 'basamaklı sayı'", () => {
    assert.notEqual(parmakIzi("bir basamaklı sayı"), parmakIzi("basamaklı sayı"));
  });

  it("'çok' niceliği belirler: 'en çok hangisi' ≠ 'en az hangisi'", () => {
    assert.notEqual(parmakIzi("en çok hangisi"), parmakIzi("en az hangisi"));
  });

  it("SORU TİPİ KORUNUR: 'nedir' ile 'nasıl çözülür' aynı anahtara düşmez", () => {
    assert.notEqual(parmakIzi("üslü sayılar nedir"), parmakIzi("üslü sayılar nasıl çözülür"));
  });

  it("kelime sırası önemsizdir: 'pomodoro nedir' = 'nedir pomodoro'", () => {
    assert.equal(parmakIzi("pomodoro nedir"), parmakIzi("nedir pomodoro"));
  });

  it("büyük/küçük harf ve noktalama farkı anahtarı değiştirmez", () => {
    assert.equal(parmakIzi("Üslü Sayılar Nedir?"), parmakIzi("üslü sayılar nedir"));
    assert.equal(parmakIzi("ÜSLÜ SAYILAR NEDİR!!!"), parmakIzi("üslü sayılar nedir"));
  });

  it("gerçek dolgu kelimeleri (lütfen, hocam, baykuş) elenir", () => {
    assert.equal(parmakIzi("hocam lütfen üslü sayılar anlat"), parmakIzi("üslü sayılar"));
  });

  it("tekrar eden kelimeler tekilleştirilir", () => {
    assert.equal(parmakIzi("konu konu konu tekrar"), parmakIzi("konu tekrar"));
  });

  it("anlamsız/çok kısa girdilerde null döner", () => {
    assert.equal(parmakIzi(""), null);
    assert.equal(parmakIzi("   "), null);
    assert.equal(parmakIzi("...!!!"), null);
    assert.equal(parmakIzi("ab"), null, "3 karakterden kısa anahtar kabul edilmez");
    assert.equal(parmakIzi("ve ile için"), null, "yalnız dolgu kelimesi kalan soru");
    assert.equal(parmakIzi("o"), null);
  });

  it("çok uzun sorular (25 kelimeden fazla) önbelleklenmez", () => {
    const uzun = Array.from({ length: 30 }, (_, i) => `kelime${i}`).join(" ");
    assert.equal(parmakIzi(uzun), null);
  });

  it("anahtar 380 karakteri aşarsa önbelleklenmez", () => {
    // 24 kelime (sayı sınırının altında) ama toplam anahtar uzunluğu çok fazla.
    const uzun = Array.from({ length: 24 }, (_, i) => `uzunkelimeornegi${i}`).join(" ");
    assert.equal(parmakIzi(uzun), null);
  });

  it("null/undefined benzeri girdide çökmez", () => {
    assert.equal(parmakIzi(undefined as unknown as string), null);
    assert.equal(parmakIzi(null as unknown as string), null);
  });
});

describe("bagimsizSoruMu — soru tek başına anlaşılıyor mu", () => {
  it("VE (&&) KURALI: sohbetin ortasındaki uzun soru bağımsız SAYILMAZ", () => {
    // YAŞANMIŞ HATA: koşullar `||` ile birleştirilmişti; 12 karakterden uzun
    // her soru, sohbetin 8. adımında bile "bağımsız" sayılıyordu.
    assert.equal(bagimsizSoruMu("Üslü sayılar nedir?", 0), true);
    assert.equal(bagimsizSoruMu("Üslü sayılar nedir?", 2), true);
    assert.equal(bagimsizSoruMu("Üslü sayılar nedir?", 3), false);
    assert.equal(bagimsizSoruMu("Üslü sayılar nedir?", 8), false);
  });

  it("bağlama yaslanan sorular reddedilir", () => {
    assert.equal(bagimsizSoruMu("Peki bunu bir örnekle açıklar mısın?"), false);
    assert.equal(bagimsizSoruMu("Ya bu konuyu tekrar anlatır mısın?"), false);
    assert.equal(bagimsizSoruMu("Bunu biraz daha açar mısın?"), false);
    assert.equal(bagimsizSoruMu("Örnek ver bana lütfen"), false);
    assert.equal(bagimsizSoruMu("Anlamadım tekrar eder misin"), false);
  });

  it("bağlam öneki yalnız BAŞTA geçtiğinde sayılır", () => {
    // "peki" cümlenin ortasında geçiyorsa soru yine de bağımsızdır.
    assert.equal(bagimsizSoruMu("Üslü sayılar peki nasıl çarpılır?"), true);
  });

  it("12 karakterden kısa sorular bağımsız sayılmaz", () => {
    assert.equal(bagimsizSoruMu("kısa"), false);
    assert.equal(bagimsizSoruMu("Peki"), false);
    assert.equal(bagimsizSoruMu("ebob nedir?"), false, "11 karakter");
  });

  it("geçmiş uzunluğu verilmezse 0 varsayılır (cihaz önbelleği)", () => {
    assert.equal(bagimsizSoruMu("Üslü sayılar nedir?"), true);
  });
});

describe("onbellegeUygunMu — soru/cevap çifti saklanabilir mi", () => {
  it("sıradan bir konu sorusu ve cevabı önbelleğe uygundur", () => {
    assert.deepEqual(onbellegeUygunMu("üslü sayılar nedir", GECERLI_CEVAP), { uygun: true });
  });

  it("çok kısa cevap saklanmaz", () => {
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", "kısa").uygun, false);
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", "").uygun, false);
    // Sınır: 25 karakterin altı reddedilir, üstü kabul edilir.
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", "a".repeat(24)).uygun, false);
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", "a".repeat(26)).uygun, true);
  });

  it("çok uzun cevap saklanmaz", () => {
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", "a".repeat(3600)).uygun, false);
  });

  it("KİŞİYE ÖZEL sorular saklanmaz", () => {
    assert.equal(onbellegeUygunMu("benim netim kaç", GECERLI_CEVAP).uygun, false);
    assert.equal(onbellegeUygunMu("sınava kaç gün kaldı", GECERLI_CEVAP).uygun, false);
    assert.equal(onbellegeUygunMu("hangi ligdeyim acaba", GECERLI_CEVAP).uygun, false);
    assert.equal(onbellegeUygunMu("bugün ne çalışmalıyım", GECERLI_CEVAP).uygun, false);
  });

  it("cevabı kişiye özel olan çiftler saklanmaz", () => {
    const sonuc = onbellegeUygunMu(
      "lgs ne zaman",
      "Sınava 288 gün kaldı, bu tempoyla devam edersen çok iyi olacak.",
    );
    assert.equal(sonuc.uygun, false);
    assert.match(sonuc.sebep ?? "", /kisisel cevap/);
  });

  it("cevapta kullanıcının adı geçiyorsa saklanmaz", () => {
    const cevap = "Harika gidiyorsun Ayşe, üslü sayılar tekrarlı çarpımdır.";
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", cevap, "Ayşe").uygun, false);
  });

  it("2 harften kısa ad yok sayılır (yanlış eşleşme olmasın)", () => {
    const cevap = "Harika gidiyorsun Ayşe, üslü sayılar tekrarlı çarpımdır.";
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", cevap, "Ay").uygun, true);
    assert.equal(onbellegeUygunMu("üslü sayılar nedir", GECERLI_CEVAP, null).uygun, true);
  });

  it("modelin kaçamak cevapları öğrenilmez", () => {
    const kacamaklar = [
      "Şu an yanıt veremiyorum, lütfen tekrar deneyin sonra.",
      "Bu konuda bilmiyorum, uydurmak istemem açıkçası dostum.",
      "Maalesef yardımcı olamam, başka bir soru sorabilirsin.",
    ];
    for (const c of kacamaklar) {
      assert.equal(onbellegeUygunMu("üslü sayılar nedir", c).uygun, false, c);
    }
  });

  it("zamana bağlı (bayatlayan) cevaplar saklanmaz", () => {
    const sonuc = onbellegeUygunMu(
      "üslü sayılar nedir",
      "2026 bugün itibarıyla bu konuyu çalışman gerekiyor, sonra tekrar bak.",
    );
    assert.equal(sonuc.uygun, false);
  });
});

/* ────────────────────────────────────────────────────────────────────────
 * CİHAZ ÖNBELLEĞİ (baykusYerelOnbellek.ts)
 *
 * Bu modül `window.sessionStorage` istiyor. Node'da böyle bir global yok;
 * bu yüzden globaller ÖNCE sahtelenir, modül SONRA `await import(...)` ile
 * yüklenir. Statik import kullanılsaydı modül, sahteleme yapılmadan önce
 * çözümlenirdi.
 * ──────────────────────────────────────────────────────────────────────── */

type SahteDepo = {
  veri: Map<string, string>;
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
};

function sahteDepoOlustur(): SahteDepo {
  const veri = new Map<string, string>();
  return {
    veri,
    getItem: (k) => (veri.has(k) ? (veri.get(k) as string) : null),
    setItem: (k, v) => {
      veri.set(k, v);
    },
    removeItem: (k) => {
      veri.delete(k);
    },
  };
}

const DEPO_ANAHTARI = "rehberim:baykus-yanit-onbellek";
const depo = sahteDepoOlustur();

// Modül yüklenmeden ÖNCE globalleri kur.
const kuresel = globalThis as unknown as Record<string, unknown>;
kuresel.window = { sessionStorage: depo };
kuresel.sessionStorage = depo;

type YerelModul = typeof import("@/lib/baykusYerelOnbellek");
let yerelModulOnbellek: YerelModul | null = null;

async function yerelModul(): Promise<YerelModul> {
  if (!yerelModulOnbellek) {
    yerelModulOnbellek = await import("@/lib/baykusYerelOnbellek");
  }
  return yerelModulOnbellek;
}

describe("baykusYerelOnbellek — cihaz (sessionStorage) önbelleği", () => {
  beforeEach(() => {
    depo.veri.clear();
    // Her testte sağlam bir depo bağlı olsun (bozuk depo testinden sonra).
    kuresel.window = { sessionStorage: depo };
  });

  it("yazılan yanıt aynı soruyla geri okunur", async () => {
    const { yerelYanitYaz, yerelYanitAra } = await yerelModul();
    const yanit = {
      reply: GECERLI_CEVAP,
      navigate: null,
      topicRoute: "/ders/matematik/uslu-sayilar",
    };
    yerelYanitYaz("üslü sayılar nedir", yanit);
    assert.deepEqual(yerelYanitAra("üslü sayılar nedir"), yanit);
  });

  it("parmak izi aynı olduğu için farklı yazımla da bulunur", async () => {
    const { yerelYanitYaz, yerelYanitAra } = await yerelModul();
    yerelYanitYaz("üslü sayılar nedir", {
      reply: GECERLI_CEVAP,
      navigate: null,
      topicRoute: null,
    });
    assert.ok(yerelYanitAra("Üslü Sayılar Nedir?"));
  });

  it("SAYI AYRIMI cihazda da geçerli: 7. sınıf cevabı 8. sınıfa dönmez", async () => {
    const { yerelYanitYaz, yerelYanitAra } = await yerelModul();
    yerelYanitYaz("7. sınıf konuları neler", {
      reply: "Yedinci sınıf konularının tam listesi burada sıralanmaktadır.",
      navigate: null,
      topicRoute: null,
    });
    assert.equal(yerelYanitAra("8. sınıf konuları neler"), null);
  });

  it("bağlama bağlı soru ne yazılır ne aranır", async () => {
    const { yerelYanitYaz, yerelYanitAra } = await yerelModul();
    yerelYanitYaz("Peki bunu bir örnekle açıklar mısın?", {
      reply: GECERLI_CEVAP,
      navigate: null,
      topicRoute: null,
    });
    assert.equal(depo.veri.size, 0, "bağlama bağlı soru depoya yazılmamalı");
    assert.equal(yerelYanitAra("Peki bunu bir örnekle açıklar mısın?"), null);
  });

  it("kişiye özel / zamana bağlı cevap cihazda saklanmaz", async () => {
    const { yerelYanitYaz } = await yerelModul();
    yerelYanitYaz("lgs sınavına ne kadar var", {
      reply: "Sınava 288 gün kaldı, bu tempoyla devam edersen çok iyi olacak.",
      navigate: null,
      topicRoute: null,
    });
    assert.equal(depo.veri.size, 0);
  });

  it("boş cevap yazılmaz", async () => {
    const { yerelYanitYaz } = await yerelModul();
    yerelYanitYaz("üslü sayılar nedir", { reply: "", navigate: null, topicRoute: null });
    assert.equal(depo.veri.size, 0);
  });

  it("ömrü dolmuş kayıt (7 günden eski) döndürülmez", async () => {
    const { parmakIzi: iz } = await import("@/lib/aiOnbellek");
    const { yerelYanitAra } = await yerelModul();
    const anahtar = iz("üslü sayılar nedir");
    assert.ok(anahtar);
    const sekizGunOnce = Date.now() - 8 * 24 * 60 * 60 * 1000;
    depo.veri.set(
      DEPO_ANAHTARI,
      JSON.stringify({
        [anahtar]: {
          reply: GECERLI_CEVAP,
          navigate: null,
          topicRoute: null,
          t: sekizGunOnce,
        },
      }),
    );
    assert.equal(yerelYanitAra("üslü sayılar nedir"), null);
  });

  it("ömrü dolmamış kayıt (6 gün önce) hâlâ döndürülür", async () => {
    const { parmakIzi: iz } = await import("@/lib/aiOnbellek");
    const { yerelYanitAra } = await yerelModul();
    const anahtar = iz("üslü sayılar nedir");
    assert.ok(anahtar);
    depo.veri.set(
      DEPO_ANAHTARI,
      JSON.stringify({
        [anahtar]: {
          reply: GECERLI_CEVAP,
          navigate: null,
          topicRoute: null,
          t: Date.now() - 6 * 24 * 60 * 60 * 1000,
        },
      }),
    );
    assert.equal(yerelYanitAra("üslü sayılar nedir")?.reply, GECERLI_CEVAP);
  });

  it("kayıt sayısı 60'ı aşmaz (en eskiden budanır)", async () => {
    const { yerelYanitYaz, yerelYanitAra } = await yerelModul();
    for (let i = 0; i < 70; i++) {
      yerelYanitYaz(`konu ${i} hakkında detaylı bilgi ver`, {
        reply: "Bu konunun özeti burada yeterince uzun biçimde anlatılmaktadır.",
        navigate: null,
        topicRoute: null,
      });
    }
    const tablo = JSON.parse(depo.veri.get(DEPO_ANAHTARI) as string) as Record<string, unknown>;
    assert.ok(Object.keys(tablo).length <= 60, "en fazla 60 kayıt tutulmalı");
    assert.ok(yerelYanitAra("konu 69 hakkında detaylı bilgi ver"), "en yeni kayıt korunmalı");
  });

  it("yerelOnbellegiTemizle depoyu siler", async () => {
    const { yerelYanitYaz, yerelYanitAra, yerelOnbellegiTemizle } = await yerelModul();
    yerelYanitYaz("üslü sayılar nedir", {
      reply: GECERLI_CEVAP,
      navigate: null,
      topicRoute: null,
    });
    assert.ok(yerelYanitAra("üslü sayılar nedir"));
    yerelOnbellegiTemizle();
    assert.equal(depo.veri.size, 0);
    assert.equal(yerelYanitAra("üslü sayılar nedir"), null);
  });

  it("bozuk JSON depoyu çökertmez", async () => {
    const { yerelYanitAra } = await yerelModul();
    depo.veri.set(DEPO_ANAHTARI, "{bozuk-json");
    assert.equal(yerelYanitAra("üslü sayılar nedir"), null);
  });

  it("depolama kapalıysa (setItem hata fırlatıyorsa) çökmez", async () => {
    const { yerelYanitYaz } = await yerelModul();
    kuresel.window = {
      sessionStorage: {
        getItem: () => null,
        setItem: () => {
          throw new Error("QuotaExceededError");
        },
        removeItem: () => {
          throw new Error("QuotaExceededError");
        },
      },
    };
    assert.doesNotThrow(() => {
      yerelYanitYaz("üslü sayılar nedir", {
        reply: GECERLI_CEVAP,
        navigate: null,
        topicRoute: null,
      });
    });
  });
});
