/**
 * İçerik bütünlüğü testleri.
 *
 *  A) src/lib/kelimeTesti.ts — kelime testi havuzu YALNIZ LGS'de sık çıkan
 *     (`lgsSik`) kelimelerden oluşmalı. Sözlüğe yeni kelime eklemek testi
 *     kendiliğinden şişirmemeli.
 *  B) src/lib/temalar.ts — 12 temanın hepsinde gerekli TÜM renk anahtarları
 *     dolu ve geçerli hex olmalı; yeni tema eklerken eksik anahtar kalmasın.
 *  C) src/lib/sinavTarihi.ts — geri sayımın sınır durumları (sınav günü,
 *     sınav geçmiş, yıl dönümü). Bütün tarihler YEREL bileşenlerle kurulur;
 *     böylece test saat diliminden bağımsızdır (Vercel UTC'de çalışır).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { SOZLUK } from "@/content/sozluk-veri";
import {
  kelimeTuruUret,
  kelimeSorusuSayisi,
  testKelimeSayisi,
} from "@/lib/kelimeTesti";
import {
  TEMALAR,
  VARSAYILAN_TEMA_ID,
  temaBul,
  temaTuretilmis,
  temaCssBlogu,
  kanal,
  acTon,
} from "@/lib/temalar";
import { siradakiSinav, tarihMetni } from "@/lib/sinavTarihi";

/* ══════════════════ A) KELİME TESTİ HAVUZU ══════════════════ */

const LGS_SIK = SOZLUK.filter((k) => k.lgsSik === true);
const LGS_SIK_ADLARI = new Set(LGS_SIK.map((k) => k.kelime));

/** Havuzun tamamı: adet çok büyük verilince her kelimeden bir soru gelir. */
const TUM_HAVUZ = kelimeTuruUret(1, 100_000);

test("sözlükte hem lgsSik işaretli hem işaretsiz kelimeler var (filtre anlamlı)", () => {
  assert.ok(SOZLUK.length > 0, "sözlük boş olamaz");
  assert.ok(LGS_SIK.length > 0, "lgsSik işaretli kelime yok");
  assert.ok(
    LGS_SIK.length < SOZLUK.length,
    "sözlüğün tamamı lgsSik ise havuz kısıtı anlamsızlaşır",
  );
});

test("test havuzunun TAMAMI lgsSik işaretli kelimelerden oluşur", () => {
  assert.ok(TUM_HAVUZ.length > 0);
  const havuzAdlari = new Set(TUM_HAVUZ.map((s) => s.kelime));

  const kacaklar = [...havuzAdlari].filter((ad) => !LGS_SIK_ADLARI.has(ad));
  assert.deepEqual(kacaklar, [], "havuza lgsSik olmayan kelime sızmış");

  // Ters yön: soru üretebilen her lgsSik kelime havuzda olmalı.
  assert.equal(
    havuzAdlari.size,
    testKelimeSayisi(),
    "havuz boyutu testKelimeSayisi() ile uyuşmuyor",
  );
  assert.equal(
    testKelimeSayisi(),
    LGS_SIK.length,
    "test kelime sayısı sözlükteki lgsSik sayısıyla aynı olmalı",
  );
});

test("hiçbir turda lgsSik olmayan kelimeden soru gelmez", () => {
  for (let tur = 1; tur <= 40; tur++) {
    for (const soru of kelimeTuruUret(tur, 10)) {
      assert.ok(
        LGS_SIK_ADLARI.has(soru.kelime),
        `tur ${tur}: havuz dışı kelime "${soru.kelime}"`,
      );
    }
  }
});

test("soru sayısı sayaçları tutarlı", () => {
  assert.ok(kelimeSorusuSayisi() >= testKelimeSayisi());
  assert.equal(testKelimeSayisi(), LGS_SIK.length);
});

test("üretilen her soru kendi içinde tutarlı", () => {
  for (const s of TUM_HAVUZ) {
    assert.ok(s.id.startsWith(`${s.kelime}#`), `kimlik biçimi bozuk: ${s.id}`);
    assert.ok(/#(A|B)$/.test(s.id), `kimlik tipi eksik: ${s.id}`);
    assert.ok(s.soru.includes(s.kelime), `soru metni kelimeyi anmıyor: ${s.id}`);
    assert.ok(s.cumle.trim().length > 0, `örnek cümle boş: ${s.id}`);
    assert.ok(s.secenekler.length >= 2, `şık sayısı yetersiz: ${s.id}`);
    assert.ok(s.secenekler.length <= 4, `şık sayısı fazla: ${s.id}`);
    assert.equal(
      new Set(s.secenekler).size,
      s.secenekler.length,
      `aynı şık iki kez var: ${s.id}`,
    );
    assert.ok(
      s.dogruIndex >= 0 && s.dogruIndex < s.secenekler.length,
      `doğru şık indeksi aralık dışı: ${s.id}`,
    );
    assert.ok(
      s.secenekler.every((x) => x.trim().length > 0),
      `boş şık var: ${s.id}`,
    );
  }
});

test("bir turda kelime tekrarı olmaz ve istenen adet gelir", () => {
  const tur = kelimeTuruUret(7, 10);
  assert.equal(tur.length, 10);
  assert.equal(new Set(tur.map((s) => s.kelime)).size, 10);
  assert.equal(new Set(tur.map((s) => s.id)).size, 10);
});

test("aynı tur numarası her zaman aynı soruları verir (deterministik)", () => {
  assert.deepEqual(kelimeTuruUret(3, 10), kelimeTuruUret(3, 10));
  assert.deepEqual(kelimeTuruUret(12, 5), kelimeTuruUret(12, 5));
  // Farklı tur farklı kesit getirmeli
  const a = kelimeTuruUret(1, 10).map((s) => s.id);
  const b = kelimeTuruUret(2, 10).map((s) => s.id);
  assert.notDeepEqual(a, b);
});

test("gerçek/mecaz sorularının şıkları sabit ve doğru", () => {
  const bTipi = TUM_HAVUZ.filter((s) => s.id.endsWith("#B"));
  assert.ok(bTipi.length > 0, "hiç gerçek/mecaz sorusu üretilmemiş");
  for (const s of bTipi) {
    assert.deepEqual(s.secenekler, ["Gerçek anlam", "Mecaz anlam"], s.id);
    assert.ok(s.dogruIndex === 0 || s.dogruIndex === 1, s.id);
  }
});

/* ══════════════════ B) TEMA KATALOĞU ══════════════════ */

/**
 * Bir temanın taşımak ZORUNDA olduğu renk anahtarları.
 * Yeni tema eklenirken biri unutulursa test burada patlar; fazladan anahtar
 * da kabul edilmez (globals.css üreticisi yalnız bunları tanır).
 */
const GEREKLI_RENK_ANAHTARLARI = [
  "bg",
  "surface",
  "surface2",
  "border",
  "text",
  "textSoft",
  "navy",
  "navyDark",
  "navyLight",
  "accent",
  "accentDark",
  "accentDeep",
  "accentLight",
  "scrollbar",
  "scrollbarHover",
  "onAccent",
] as const;

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

test("katalogda 12 tema var, kimlikleri benzersiz, iki aile de dolu", () => {
  assert.equal(TEMALAR.length, 12);
  assert.equal(new Set(TEMALAR.map((t) => t.id)).size, TEMALAR.length);
  assert.ok(TEMALAR.some((t) => t.aile === "acik"));
  assert.ok(TEMALAR.some((t) => t.aile === "koyu"));
});

test("her temanın tanıtım alanları dolu", () => {
  for (const t of TEMALAR) {
    assert.ok(/^[a-z0-9-]+$/.test(t.id), `kimlik biçimi: ${t.id}`);
    assert.ok(t.ad.trim().length > 0, `${t.id}: ad boş`);
    assert.ok(t.emoji.trim().length > 0, `${t.id}: emoji boş`);
    assert.ok(t.aciklama.trim().length > 0, `${t.id}: açıklama boş`);
    assert.ok(
      t.aile === "acik" || t.aile === "koyu",
      `${t.id}: aile geçersiz (${t.aile})`,
    );
  }
});

test("12 temanın hepsinde gerekli TÜM renk anahtarları dolu ve geçerli hex", () => {
  for (const t of TEMALAR) {
    const anahtarlar = Object.keys(t.renkler);

    const eksik = GEREKLI_RENK_ANAHTARLARI.filter((a) => !anahtarlar.includes(a));
    assert.deepEqual(eksik, [], `${t.id}: eksik renk anahtarı`);

    const fazla = anahtarlar.filter(
      (a) => !(GEREKLI_RENK_ANAHTARLARI as readonly string[]).includes(a),
    );
    assert.deepEqual(fazla, [], `${t.id}: tanınmayan renk anahtarı`);

    for (const a of GEREKLI_RENK_ANAHTARLARI) {
      const deger = t.renkler[a];
      assert.equal(typeof deger, "string", `${t.id}.${a}: metin değil`);
      assert.ok(deger.trim().length > 0, `${t.id}.${a}: boş`);
      assert.ok(HEX.test(deger), `${t.id}.${a}: geçersiz hex "${deger}"`);
    }
  }
});

test("türetilmiş renkler her temada geçerli hex üretir", () => {
  for (const t of TEMALAR) {
    const d = temaTuretilmis(t);
    for (const [ad, deger] of Object.entries(d)) {
      assert.ok(HEX.test(deger), `${t.id}.${ad}: geçersiz hex "${deger}"`);
    }
  }
});

test("üretilen CSS bloğu her temada eksiksiz", () => {
  const degiskenSayilari = new Set<number>();
  for (const t of TEMALAR) {
    const css = temaCssBlogu(t);
    assert.ok(
      css.includes(`html[data-tema="${t.id}"]`),
      `${t.id}: seçici yok`,
    );
    assert.ok(
      !/undefined|NaN/.test(css),
      `${t.id}: CSS'te undefined/NaN var (eksik renk anahtarı?)`,
    );
    const degiskenler = css.match(/--rb-[a-z0-9-]+:/g) ?? [];
    // Hiçbir değişkenin değeri boş kalmamalı
    assert.ok(
      !/--rb-[a-z0-9-]+:\s*;/.test(css),
      `${t.id}: değeri boş CSS değişkeni var`,
    );
    assert.equal(
      css.includes("color-scheme: dark"),
      t.aile === "koyu",
      `${t.id}: color-scheme ailesiyle uyuşmuyor`,
    );
    degiskenSayilari.add(degiskenler.length);
  }
  assert.equal(
    degiskenSayilari.size,
    1,
    "temalar farklı sayıda CSS değişkeni üretiyor (biri eksik olabilir)",
  );
});

test("temaBul bilinmeyen/boş kimlikte varsayılana düşer", () => {
  assert.ok(
    TEMALAR.some((t) => t.id === VARSAYILAN_TEMA_ID),
    "varsayılan tema katalogda yok",
  );
  assert.equal(temaBul(null).id, VARSAYILAN_TEMA_ID);
  assert.equal(temaBul(undefined).id, VARSAYILAN_TEMA_ID);
  assert.equal(temaBul("").id, VARSAYILAN_TEMA_ID);
  assert.equal(temaBul("olmayan-tema").id, VARSAYILAN_TEMA_ID);
  for (const t of TEMALAR) assert.equal(temaBul(t.id).id, t.id);
});

test("kanal() ve acTon() renk dönüşümleri doğru", () => {
  assert.equal(kanal("#16244c"), "22 36 76");
  assert.equal(kanal("#000000"), "0 0 0");
  assert.equal(kanal("#ffffff"), "255 255 255");
  assert.equal(kanal("#fff"), "255 255 255", "3 haneli kısa yazım");

  assert.equal(acTon("#123456", 0), "#123456", "oran 0 → renk aynı");
  assert.equal(acTon("#000000", 1), "#ffffff", "oran 1 → bembeyaz");
  assert.equal(acTon("#000000", 0.5), "#808080");

  // Her temanın her rengi kanal biçimine 0-255 aralığında çevrilmeli
  for (const t of TEMALAR) {
    for (const a of GEREKLI_RENK_ANAHTARLARI) {
      const parcalar = kanal(t.renkler[a]).split(" ").map(Number);
      assert.equal(parcalar.length, 3, `${t.id}.${a}`);
      for (const p of parcalar) {
        assert.ok(
          Number.isInteger(p) && p >= 0 && p <= 255,
          `${t.id}.${a}: kanal değeri geçersiz (${p})`,
        );
      }
    }
  }
});

/* ══════════════════ C) SINAV GERİ SAYIMI ══════════════════ */

/** Yerel bileşenlerle kurulmuş tarih — saat diliminden bağımsız. */
function yerel(
  yil: number,
  ay0: number,
  gun: number,
  saat = 0,
  dakika = 0,
): Date {
  return new Date(yil, ay0, gun, saat, dakika, 0, 0);
}

test("açıklanmış (resmî) tarih kullanılır", () => {
  const s = siradakiSinav(yerel(2026, 0, 1));
  assert.equal(s.yil, 2026);
  assert.equal(s.resmi, true, "2026 tarihi MEB listesinde");
  assert.equal(s.tarih.getFullYear(), 2026);
  assert.equal(s.tarih.getMonth(), 5);
  assert.equal(s.tarih.getDate(), 13);
  assert.equal(s.tarih.getHours(), 9);
  assert.equal(s.tarih.getMinutes(), 30);
  assert.equal(s.kalanGun, 163);
  assert.equal(s.gecti, false);

  const eski = siradakiSinav(yerel(2024, 0, 1));
  assert.equal(eski.yil, 2024);
  assert.equal(eski.resmi, true);
  assert.equal(eski.tarih.getDate(), 2);
  assert.equal(eski.tarih.getMonth(), 5);
});

test("sınav günü: sabah 0 gün kalır, saat gelince hâlâ o yıl gösterilir", () => {
  const sabah = siradakiSinav(yerel(2026, 5, 13, 8, 0));
  assert.equal(sabah.yil, 2026);
  assert.equal(sabah.kalanGun, 0, "sınav günü geri sayım 0 olmalı");
  assert.equal(sabah.gecti, false);

  // Tam sınav saati (09:30) — henüz "geçmiş" sayılmaz
  const tam = siradakiSinav(yerel(2026, 5, 13, 9, 30));
  assert.equal(tam.yil, 2026);
  assert.equal(tam.kalanGun, 0);

  // Gece yarısı ve gün sonu da aynı gün sayılır
  assert.equal(siradakiSinav(yerel(2026, 5, 13, 0, 1)).kalanGun, 0);
});

test("sınavdan bir gün önce 1 gün kalır (gecenin hangi saati olursa olsun)", () => {
  assert.equal(siradakiSinav(yerel(2026, 5, 12, 0, 5)).kalanGun, 1);
  assert.equal(siradakiSinav(yerel(2026, 5, 12, 23, 59)).kalanGun, 1);
  assert.equal(siradakiSinav(yerel(2026, 5, 11, 23, 59)).kalanGun, 2);
});

test("sınav geçince bir sonraki yıla geçilir ve tahmini olarak işaretlenir", () => {
  // 13 Haziran 2026 10:00 — sınav başlamış
  const s = siradakiSinav(yerel(2026, 5, 13, 10, 0));
  assert.equal(s.yil, 2027);
  assert.equal(s.resmi, false, "2027 henüz açıklanmadı → tahmini");
  assert.equal(s.kalanGun, 365);

  // 2025 sınavı (15 Haziran 2025) geçmişken 2026'ya geçilmeli
  const t = siradakiSinav(yerel(2025, 5, 16));
  assert.equal(t.yil, 2026);
  assert.equal(t.resmi, true);
});

test("yıl dönümünde geri sayım kopmaz", () => {
  const s = siradakiSinav(yerel(2026, 11, 31, 23, 59));
  assert.equal(s.yil, 2027);
  assert.equal(s.kalanGun, 164);

  const y = siradakiSinav(yerel(2027, 0, 1, 0, 1));
  assert.equal(y.yil, 2027);
  assert.equal(y.kalanGun, 163);
});

test("tahmini tarih haziranın ikinci pazarıdır", () => {
  for (const yil of [2027, 2028, 2029, 2030]) {
    const s = siradakiSinav(yerel(yil, 0, 15));
    assert.equal(s.yil, yil);
    assert.equal(s.resmi, false, `${yil} listede olmamalı`);
    assert.equal(s.tarih.getMonth(), 5, `${yil}: haziran değil`);
    assert.equal(s.tarih.getDay(), 0, `${yil}: pazar değil`);
    assert.ok(
      s.tarih.getDate() >= 8 && s.tarih.getDate() <= 14,
      `${yil}: ayın ikinci pazarı değil (${s.tarih.getDate()})`,
    );
  }
});

test("geri sayım her gün tam olarak 1 azalır (saat dilimi/DST kaymasına dayanıklı)", () => {
  // 2026 sınavından 360 gün öncesinden başlanır (bir önceki sınavın
  // geçtiği tarihten sonrası) ve günlük ilerlenir; her adımda tam 1 gün.
  let onceki = -1;
  for (let g = 360; g >= 0; g--) {
    const gun = yerel(2026, 5, 13 - g, 8, 0); // sabah 08:00 — DST saatlerinden uzak
    const s = siradakiSinav(gun);
    assert.ok(s.kalanGun >= 0, "geri sayım negatif olamaz");
    if (onceki >= 0) {
      assert.equal(
        s.kalanGun,
        onceki - 1,
        `${gun.toDateString()} gününde geri sayım 1'den farklı değişti`,
      );
    }
    onceki = s.kalanGun;
  }
  assert.equal(onceki, 0, "son gün sınav günü olmalı");
});

test("gün başında ve gün sonunda aynı gün sayısı görünür", () => {
  // Aynı takvim gününün farklı saatleri aynı "kalan gün"ü vermeli —
  // yoksa gece çalışan öğrencinin geri sayımı bir gün kayar.
  for (const gunFarki of [1, 7, 30, 100]) {
    const g = 13 - gunFarki;
    const gece = siradakiSinav(yerel(2026, 5, g, 0, 0)).kalanGun;
    const oglen = siradakiSinav(yerel(2026, 5, g, 12, 0)).kalanGun;
    const aksam = siradakiSinav(yerel(2026, 5, g, 23, 59)).kalanGun;
    assert.equal(gece, gunFarki);
    assert.equal(oglen, gunFarki);
    assert.equal(aksam, gunFarki);
  }
});

test("tarihMetni Türkçe ay adıyla yazar", () => {
  assert.equal(tarihMetni(yerel(2026, 5, 13)), "13 Haziran 2026");
  assert.equal(tarihMetni(yerel(2025, 0, 1)), "1 Ocak 2025");
  assert.equal(tarihMetni(yerel(2024, 11, 31)), "31 Aralık 2024");
});
