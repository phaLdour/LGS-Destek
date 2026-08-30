/**
 * `src/lib/konuCikmisSorular.ts` + `src/content/cikmis-sorular/konu-etiketleri.ts`
 *
 * Konu bazlı çıkmış soru havuzu. Etiketler 810 gerçek LGS sorusuna tek tek
 * bakılarak ELLE verildi (sorular görüntü olduğu için metinden çıkarılamaz),
 * bu yüzden veri bütünlüğünü test kilitliyor:
 *  - her etiket gerçek bir konuya işaret etmeli (yazım hatası = sessizce
 *    kaybolan sorular),
 *  - her anahtar gerçek bir soruya işaret etmeli (yıl/no hatası = hayalet),
 *  - tur bölmesi soru kaybetmemeli ya da çoğaltmamalı.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getAllSubjects } from "@/content";
import { PAST_EXAMS } from "@/content/cikmis-sorular";
import {
  ETIKETLI_SORU_SAYISI,
  KONU_ETIKETLERI,
} from "@/content/cikmis-sorular/konu-etiketleri";
import {
  TUR_BOYU,
  konuCikmisOzet,
  konuCikmisSorulari,
  turSayisi,
  turSorulari,
  turSuresiDk,
} from "@/lib/konuCikmisSorular";

/** İçerik ders slug'ı → çıkmış soru ders slug'ı (tek fark Fen). */
const DERS_ESLEME: Record<string, string> = { "fen-bilimleri": "fen" };

test("her etiket GERÇEK bir konuya işaret ediyor", () => {
  const gecerli = new Set<string>();
  for (const s of getAllSubjects()) {
    for (const t of s.topics) gecerli.add(`${DERS_ESLEME[s.slug] ?? s.slug}:${t.id}`);
  }
  const bozuk: string[] = [];
  for (const [anahtar, konu] of Object.entries(KONU_ETIKETLERI)) {
    const ders = anahtar.split("-")[1];
    if (!gecerli.has(`${ders}:${konu}`)) bozuk.push(`${anahtar} -> ${konu}`);
  }
  assert.deepEqual(bozuk, [], "geçersiz konu id'si olan etiketler");
});

test("her etiket GERÇEK bir soruya işaret ediyor (hayalet anahtar yok)", () => {
  const varOlan = new Set<string>();
  for (const yil of PAST_EXAMS) {
    for (const meta of [yil.sozel, yil.sayisal]) {
      for (const q of meta.questions ?? []) {
        varOlan.add(`${meta.year}-${q.subjectSlug}-${q.no}`);
      }
    }
  }
  const hayalet = Object.keys(KONU_ETIKETLERI).filter((k) => !varOlan.has(k));
  assert.deepEqual(hayalet, [], "karşılığı olmayan etiket anahtarları");
});

test("etiketli soru sayısı sabiti gerçekle uyuşuyor", () => {
  assert.equal(Object.keys(KONU_ETIKETLERI).length, ETIKETLI_SORU_SAYISI);
});

test("bir soru en fazla BİR konuya ait (anahtarlar tekil)", () => {
  // Record zaten tekil anahtar garantisi verir; asıl risk konu bazlı
  // toplamın soru sayısını aşması. Toplam eşleşme = etiket sayısı olmalı.
  let toplam = 0;
  for (const s of getAllSubjects()) {
    for (const t of s.topics) toplam += konuCikmisSorulari(s.slug, t.id).length;
  }
  assert.equal(
    toplam,
    ETIKETLI_SORU_SAYISI,
    "konulara dağılan soru sayısı etiket sayısına eşit olmalı",
  );
});

test("sorular yeniden eskiye sıralı, aynı yılda sınav sırası korunur", () => {
  const sorular = konuCikmisSorulari("turkce", "paragrafta-anlam");
  assert.ok(sorular.length > 10, "bu konuda bol soru olmalı");
  for (let i = 1; i < sorular.length; i++) {
    const o = sorular[i - 1];
    const y = sorular[i];
    assert.ok(
      o.year > y.year || (o.year === y.year && o.no < y.no),
      `sıra bozuk: ${o.year}-${o.no} sonra ${y.year}-${y.no}`,
    );
  }
});

test("her soru kendi yılını ve bölümünü taşır", () => {
  // Karışık yıllı testte 'Hatalarım' anahtarı buna dayanıyor.
  for (const q of konuCikmisSorulari("matematik", "ucgenler")) {
    assert.ok(q.year >= 2018 && q.year <= 2026, `geçersiz yıl: ${q.year}`);
    assert.equal(q.section, "sayisal");
  }
  for (const q of konuCikmisSorulari("turkce", "sozcukte-anlam")) {
    assert.equal(q.section, "sozel");
  }
});

test("tur bölmesi soru kaybetmiyor ve çoğaltmıyor", () => {
  for (const s of getAllSubjects()) {
    for (const t of s.topics) {
      const hepsi = konuCikmisSorulari(s.slug, t.id);
      const turler = turSayisi(hepsi.length);
      const toplanan: string[] = [];
      for (let tur = 1; tur <= turler; tur++) {
        const parca = turSorulari(hepsi, tur);
        assert.ok(parca.length > 0, `${t.id} ${tur}. tur boş`);
        assert.ok(parca.length <= TUR_BOYU, `${t.id} ${tur}. tur çok uzun`);
        toplanan.push(...parca.map((q) => `${q.year}-${q.subjectSlug}-${q.no}`));
      }
      assert.equal(toplanan.length, hepsi.length, `${t.id}: soru kaybı/fazlası`);
      assert.equal(new Set(toplanan).size, hepsi.length, `${t.id}: tekrar eden soru`);
    }
  }
});

test("aralık dışı tur boş döner (kırılmaz)", () => {
  const hepsi = konuCikmisSorulari("din", "kader-inanci");
  assert.deepEqual(turSorulari(hepsi, 0), []);
  assert.deepEqual(turSorulari(hepsi, -1), []);
  assert.deepEqual(turSorulari(hepsi, 999), []);
});

test("tur süresi gerçek LGS temposunda", () => {
  // Sözel 75dk/50soru = 1.5 dk; Sayısal 80dk/40soru = 2 dk.
  const sozel = turSorulari(konuCikmisSorulari("turkce", "paragrafta-anlam"), 1);
  assert.equal(sozel.length, TUR_BOYU);
  assert.equal(turSuresiDk(sozel), 15);

  const sayisal = turSorulari(konuCikmisSorulari("matematik", "karekoklu-ifadeler"), 1);
  assert.equal(sayisal.length, TUR_BOYU);
  assert.equal(turSuresiDk(sayisal), 20);

  assert.equal(turSuresiDk([]), 0, "boş turda süre 0");
});

test("özet: yıllar yeniden eskiye ve gerçek", () => {
  const o = konuCikmisOzet("fen-bilimleri", "basinc");
  assert.ok(o.toplam > 0);
  assert.equal(o.turSayisi, turSayisi(o.toplam));
  for (let i = 1; i < o.yillar.length; i++) {
    assert.ok(o.yillar[i - 1] > o.yillar[i], "yıllar yeniden eskiye olmalı");
  }
});

test("hiç sorusu olmayan konu kırılmadan boş döner", () => {
  // İngilizce "Natural Forces" 9 yılda hiç çıkmamış — kart bunu yazıyor.
  const o = konuCikmisOzet("ingilizce", "natural-forces");
  assert.equal(o.toplam, 0);
  assert.equal(o.turSayisi, 0);
  assert.deepEqual(o.yillar, []);
  assert.deepEqual(konuCikmisSorulari("ingilizce", "natural-forces"), []);
});

test("olmayan ders/konu için boş döner", () => {
  assert.deepEqual(konuCikmisSorulari("yok-boyle-ders", "yok"), []);
  assert.deepEqual(konuCikmisSorulari("turkce", "yok-boyle-konu"), []);
});

test("her soru görüntüsünün yolu ve cevabı geçerli", () => {
  for (const s of getAllSubjects()) {
    for (const t of s.topics) {
      for (const q of konuCikmisSorulari(s.slug, t.id)) {
        assert.match(q.image, /^\/cikmis-sorular\/\d{4}\/(sozel|sayisal)\/.+\.webp$/);
        assert.ok(
          q.correctIndex >= 0 && q.correctIndex <= 3,
          `geçersiz cevap: ${q.image}`,
        );
      }
    }
  }
});
