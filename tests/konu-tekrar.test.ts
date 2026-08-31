/**
 * Konu tekrar planı (`src/lib/konuTekrar.ts`).
 *
 * Aralık matematiği bu özelliğin tamamı: yanlışsa öğrenci ya boğulur
 * (her gün aynı konu) ya da konuyu bir daha hiç görmez. Bu yüzden
 * basamak geçişleri ve sınav sınırı ayrı ayrı sınanıyor.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  BASAMAKLAR,
  GUN_MS,
  basamakAraligi,
  gecikmeMetni,
  hatirlamaDuzeyi,
  ilkPlan,
  planla,
  sonrakiBasamak,
  vadesiGelenler,
} from "@/lib/konuTekrar";

// Sınavdan uzak bir tarih: sınav sınırı devreye girmesin.
const EYLUL = new Date(2026, 8, 1, 12, 0, 0);

test("test yüzdesi doğru kovaya düşer", () => {
  assert.equal(hatirlamaDuzeyi(8, 8), "iyi");
  assert.equal(hatirlamaDuzeyi(8, 10), "iyi"); // %80 sınırda: iyi
  assert.equal(hatirlamaDuzeyi(7, 10), "orta"); // %70
  assert.equal(hatirlamaDuzeyi(5, 10), "orta"); // %50 sınırda: orta
  assert.equal(hatirlamaDuzeyi(4, 10), "zayif"); // %40
  assert.equal(hatirlamaDuzeyi(0, 10), "zayif");
});

test("soru yoksa kırılmaz", () => {
  assert.equal(hatirlamaDuzeyi(0, 0), "orta");
});

test("iyi cevap bir üst basamağa taşır, tavanı aşmaz", () => {
  assert.equal(sonrakiBasamak(0, "iyi"), 1);
  assert.equal(sonrakiBasamak(3, "iyi"), 4);
  const son = BASAMAKLAR.length - 1;
  assert.equal(sonrakiBasamak(son, "iyi"), son, "tavan aşıldı");
});

test("orta cevap basamağı korur (öğrenciyi cezalandırmaz)", () => {
  assert.equal(sonrakiBasamak(0, "orta"), 0);
  assert.equal(sonrakiBasamak(4, "orta"), 4);
});

test("zayıf cevap başa döndürür", () => {
  assert.equal(sonrakiBasamak(5, "zayif"), 0);
  assert.equal(basamakAraligi(sonrakiBasamak(5, "zayif")), 1, "yarın tekrar");
});

test("aralıklar giderek açılır — sıkıştırılmış tekrar yok", () => {
  for (let i = 1; i < BASAMAKLAR.length; i++) {
    assert.ok(
      BASAMAKLAR[i] > BASAMAKLAR[i - 1],
      `basamak ${i} öncekinden büyük değil`,
    );
  }
  assert.equal(BASAMAKLAR[0], 1, "ilk tekrar ertesi gün olmalı");
});

test("ilk plan yarına kurulur", () => {
  const p = ilkPlan(EYLUL);
  assert.equal(p.basamak, 0);
  const gun = Math.round((p.vade - EYLUL.getTime()) / GUN_MS);
  assert.equal(gun, 1);
  assert.equal(p.sinavaSigdirildi, false);
});

test("art arda iyi sonuç aralığı büyütür", () => {
  let basamak = 0;
  const gunler: number[] = [];
  for (let i = 0; i < 5; i++) {
    const p = planla(basamak, "iyi", EYLUL);
    gunler.push(Math.round((p.vade - EYLUL.getTime()) / GUN_MS));
    basamak = p.basamak;
  }
  assert.deepEqual(gunler, [3, 7, 16, 35, 70]);
});

test("zayıf sonuç uzun aralığı bir günе çeker", () => {
  const p = planla(5, "zayif", EYLUL);
  assert.equal(p.basamak, 0);
  assert.equal(Math.round((p.vade - EYLUL.getTime()) / GUN_MS), 1);
});

test("vade sınavdan sonraya DÜŞMEZ", () => {
  // Sınava ~20 gün kala 70 günlük aralık istensin.
  const { siradakiSinav } = require("@/lib/sinavTarihi") as typeof import("@/lib/sinavTarihi");
  const sinav = siradakiSinav(EYLUL).tarih;
  const yirmiGunOnce = new Date(sinav.getTime() - 20 * GUN_MS);
  const p = planla(5, "iyi", yirmiGunOnce);
  assert.ok(p.vade <= sinav.getTime(), "vade sınavdan sonra");
  assert.equal(p.sinavaSigdirildi, true);
  // Kalan sürenin yarısına çekilmeli: ~10 gün
  const gun = Math.round((p.vade - yirmiGunOnce.getTime()) / GUN_MS);
  assert.ok(gun >= 9 && gun <= 11, `beklenmedik vade: ${gun} gün`);
});

test("sınav kapıdayken plan yarına kurulur", () => {
  const { siradakiSinav } = require("@/lib/sinavTarihi") as typeof import("@/lib/sinavTarihi");
  const sinav = siradakiSinav(EYLUL).tarih;
  const birGunOnce = new Date(sinav.getTime() - 1 * GUN_MS);
  const p = planla(4, "iyi", birGunOnce);
  assert.equal(Math.round((p.vade - birGunOnce.getTime()) / GUN_MS), 1);
  assert.equal(p.sinavaSigdirildi, true);
});

test("vadesi gelenler en gecikmişten başlar", () => {
  const simdi = new Date(2026, 8, 10, 12, 0, 0);
  const t = simdi.getTime();
  const kayitlar = [
    { dersSlug: "a", konuId: "1", basamak: 0, vade: t - 1 * GUN_MS, sonTekrar: 0 },
    { dersSlug: "a", konuId: "2", basamak: 0, vade: t - 5 * GUN_MS, sonTekrar: 0 },
    { dersSlug: "a", konuId: "3", basamak: 0, vade: t + 2 * GUN_MS, sonTekrar: 0 },
  ];
  const g = vadesiGelenler(kayitlar, simdi);
  assert.deepEqual(
    g.map((k) => k.konuId),
    ["2", "1"],
    "gecikmiş olan başta değil ya da vadesi gelmeyen listeye girdi",
  );
});

test("gecikme metni anlaşılır", () => {
  const simdi = new Date(2026, 8, 10, 12, 0, 0);
  assert.equal(gecikmeMetni(simdi.getTime(), simdi), "bugün");
  assert.equal(gecikmeMetni(simdi.getTime() - GUN_MS, simdi), "1 gün gecikti");
  assert.equal(gecikmeMetni(simdi.getTime() - 4 * GUN_MS, simdi), "4 gün gecikti");
  assert.equal(gecikmeMetni(simdi.getTime() + GUN_MS, simdi), "", "vadesi gelmemişe metin");
});
