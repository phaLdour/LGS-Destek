import test from "node:test";
import assert from "node:assert/strict";

import {
  SUBJECTS,
  calcNet,
  calculateScore,
  type SubjectInput,
  type SubjectKey,
} from "@/lib/lgsScore";

/**
 * LGS puan hesabı testleri.
 *
 * Hesap tamamen saftır (saat, rastgelelik, ağ yok) → testler deterministiktir.
 */

/** Kayan nokta karşılaştırması (400/270 gibi bölmeler tam sayı vermez). */
function yakin(gercek: number, beklenen: number, tolerans = 1e-9) {
  assert.ok(
    Math.abs(gercek - beklenen) <= tolerans,
    `beklenen ≈ ${beklenen}, gelen ${gercek}`,
  );
}

/** Her derse aynı kalıbı uygulayan girdi üretici. */
function tumDersler(
  uret: (soruSayisi: number) => SubjectInput,
): Record<SubjectKey, SubjectInput> {
  const out = {} as Record<SubjectKey, SubjectInput>;
  for (const s of SUBJECTS) out[s.key] = uret(s.questionCount);
  return out;
}

const HEPSI_DOGRU = tumDersler((n) => ({ correct: n, wrong: 0, blank: 0 }));
const HEPSI_BOS = tumDersler((n) => ({ correct: 0, wrong: 0, blank: n }));
const HEPSI_YANLIS = tumDersler((n) => ({ correct: 0, wrong: n, blank: 0 }));

// ─────────────────────────── Ders tablosu ───────────────────────────

test("LGS ders tablosu 90 soruluk gerçek sınav formatına uyar", () => {
  const toplamSoru = SUBJECTS.reduce((s, d) => s + d.questionCount, 0);
  assert.equal(toplamSoru, 90);

  const sozel = SUBJECTS.filter((d) => d.section === "sozel");
  const sayisal = SUBJECTS.filter((d) => d.section === "sayisal");
  assert.equal(
    sozel.reduce((s, d) => s + d.questionCount, 0),
    50,
    "sözel bölüm 50 soru olmalı",
  );
  assert.equal(
    sayisal.reduce((s, d) => s + d.questionCount, 0),
    40,
    "sayısal bölüm 40 soru olmalı",
  );
});

test("ders katsayıları Türkçe/Matematik/Fen = 4, diğerleri = 1", () => {
  const katsayi = Object.fromEntries(
    SUBJECTS.map((d) => [d.key, d.coefficient]),
  );
  assert.equal(katsayi.turkce, 4);
  assert.equal(katsayi.matematik, 4);
  assert.equal(katsayi.fen, 4);
  assert.equal(katsayi.inkilap, 1);
  assert.equal(katsayi.din, 1);
  assert.equal(katsayi.ingilizce, 1);
});

test("maksimum ağırlıklı net 270'tir (100-500 ölçeğinin paydası)", () => {
  assert.equal(calculateScore({}).maxWeightedNet, 270);
});

// ─────────────────────────── Net formülü ───────────────────────────

test("net formülü: 3 yanlış 1 doğruyu götürür", () => {
  yakin(calcNet(10, 3), 9);
  yakin(calcNet(20, 6), 18);
  yakin(calcNet(12, 6), 10);
});

test("net negatif olamaz: yanlış doğrudan çoksa net 0'a sabitlenir", () => {
  assert.equal(calcNet(0, 9), 0);
  assert.equal(calcNet(2, 12), 0);
  assert.equal(calcNet(1, 30), 0);
  assert.ok(calcNet(0, 90) >= 0, "net hiçbir girdide negatife düşmemeli");
});

test("boş bırakılan sorular neti düşürmez", () => {
  // 10 doğru + 0 yanlış + 10 boş → net 10 (boş cezasız)
  const sonuc = calculateScore({ turkce: { correct: 10, wrong: 0, blank: 10 } });
  const turkce = sonuc.subjects.find((s) => s.info.key === "turkce")!;
  yakin(turkce.net, 10);
  yakin(sonuc.totalNet, 10);
});

test("tek ders girdisi: 12 doğru 6 yanlış Türkçe → net 10, sözel/sayısal ayrımı doğru", () => {
  const sonuc = calculateScore({ turkce: { correct: 12, wrong: 6, blank: 2 } });
  yakin(sonuc.totalNet, 10);
  yakin(sonuc.sozelNet, 10);
  yakin(sonuc.sayisalNet, 0);
  yakin(sonuc.totalWeightedNet, 40); // 10 net × katsayı 4
  yakin(sonuc.estimatedScoreSimple, 100 + (40 / 270) * 400);
});

test("verilmeyen dersler 0 doğru/0 yanlış sayılır", () => {
  const sonuc = calculateScore({ matematik: { correct: 5, wrong: 0, blank: 15 } });
  assert.equal(sonuc.subjects.length, SUBJECTS.length);
  for (const d of sonuc.subjects) {
    if (d.info.key === "matematik") continue;
    assert.deepEqual(d.input, { correct: 0, wrong: 0, blank: 0 });
    assert.equal(d.net, 0);
  }
  yakin(sonuc.totalNet, 5);
});

// ─────────────────────────── Sınır durumları ───────────────────────────

test("sıfır net (her şey boş) → hem hızlı hem resmi tahmin 100 puan", () => {
  const sonuc = calculateScore(HEPSI_BOS);
  yakin(sonuc.totalNet, 0);
  yakin(sonuc.totalWeightedNet, 0);
  yakin(sonuc.estimatedScoreSimple, 100);
  yakin(sonuc.estimatedScoreFormal, 100, 1e-9);
});

test("tam net (90 doğru) → hem hızlı hem resmi tahmin 500 puan", () => {
  const sonuc = calculateScore(HEPSI_DOGRU);
  yakin(sonuc.totalNet, 90);
  yakin(sonuc.totalWeightedNet, 270);
  yakin(sonuc.estimatedScoreSimple, 500);
  yakin(sonuc.estimatedScoreFormal, 500, 1e-9);
});

test("her soru yanlış → net 0'a sabitlenir, puan taban (100) olur, eksiye düşmez", () => {
  const sonuc = calculateScore(HEPSI_YANLIS);
  yakin(sonuc.totalNet, 0);
  for (const d of sonuc.subjects) assert.ok(d.net >= 0, `${d.info.key} neti negatif`);
  yakin(sonuc.estimatedScoreSimple, 100);
  yakin(sonuc.estimatedScoreFormal, 100, 1e-9);
});

test("puan hiçbir girdide 100-500 aralığının dışına çıkmaz", () => {
  const senaryolar: Partial<Record<SubjectKey, SubjectInput>>[] = [
    {},
    HEPSI_BOS,
    HEPSI_DOGRU,
    HEPSI_YANLIS,
    tumDersler((n) => ({ correct: Math.floor(n / 2), wrong: Math.ceil(n / 2), blank: 0 })),
    tumDersler((n) => ({ correct: n - 1, wrong: 1, blank: 0 })),
    // Bilinçli olarak tutarsız/taşkın girdi
    tumDersler((n) => ({ correct: n * 5, wrong: n * 5, blank: n * 5 })),
    tumDersler(() => ({ correct: -10, wrong: -10, blank: -10 })),
  ];
  for (const g of senaryolar) {
    const s = calculateScore(g);
    assert.ok(
      s.estimatedScoreSimple >= 100 && s.estimatedScoreSimple <= 500,
      `hızlı tahmin aralık dışı: ${s.estimatedScoreSimple}`,
    );
    assert.ok(
      s.estimatedScoreFormal >= 100 && s.estimatedScoreFormal <= 500,
      `resmi tahmin aralık dışı: ${s.estimatedScoreFormal}`,
    );
  }
});

// ─────────────────────────── Girdi temizliği ───────────────────────────

test("doğru sayısı soru sayısını aşarsa soru sayısına kırpılır", () => {
  const sonuc = calculateScore({ matematik: { correct: 25, wrong: 10, blank: 5 } });
  const mat = sonuc.subjects.find((s) => s.info.key === "matematik")!;
  // 25 doğru → 20'ye kırpılır, geriye yanlış/boş için yer kalmaz
  assert.deepEqual(mat.input, { correct: 20, wrong: 0, blank: 0 });
  yakin(mat.net, 20);
});

test("doğru + yanlış toplamı soru sayısını aşamaz (yanlış kırpılır)", () => {
  const sonuc = calculateScore({ fen: { correct: 15, wrong: 12, blank: 0 } });
  const fen = sonuc.subjects.find((s) => s.info.key === "fen")!;
  assert.deepEqual(fen.input, { correct: 15, wrong: 5, blank: 0 });
  yakin(fen.net, 15 - 5 / 3);
});

test("boş sayısı kalan soru sayısına kırpılır", () => {
  const sonuc = calculateScore({ din: { correct: 4, wrong: 3, blank: 9 } });
  const din = sonuc.subjects.find((s) => s.info.key === "din")!;
  assert.deepEqual(din.input, { correct: 4, wrong: 3, blank: 3 });
});

test("bozuk girdiler (negatif, NaN, ondalık) güvenle 0'a/tam sayıya çekilir", () => {
  const sonuc = calculateScore({
    fen: { correct: -3, wrong: Number.NaN, blank: 0 },
    turkce: { correct: 7.9, wrong: 2.4, blank: 0 },
    ingilizce: { correct: Number.POSITIVE_INFINITY, wrong: 0, blank: 0 },
  });
  const fen = sonuc.subjects.find((s) => s.info.key === "fen")!;
  const turkce = sonuc.subjects.find((s) => s.info.key === "turkce")!;
  const ing = sonuc.subjects.find((s) => s.info.key === "ingilizce")!;
  assert.deepEqual(fen.input, { correct: 0, wrong: 0, blank: 0 });
  assert.deepEqual(turkce.input, { correct: 7, wrong: 2, blank: 0 });
  assert.deepEqual(ing.input, { correct: 0, wrong: 0, blank: 0 });
  assert.ok(Number.isFinite(sonuc.estimatedScoreSimple));
  assert.ok(Number.isFinite(sonuc.estimatedScoreFormal));
});

// ─────────────────────────── Standart puan ───────────────────────────

test("standart puan: ülke ortalaması kadar net yapan öğrenci tam 50 alır", () => {
  const fenBilgi = SUBJECTS.find((s) => s.key === "fen")!;
  assert.equal(fenBilgi.avgNet, 9, "test bu ortalamaya göre kurulmuştur");
  // 9 doğru, 0 yanlış → net 9 = ülke ortalaması → SP = 50
  const sonuc = calculateScore({ fen: { correct: 9, wrong: 0, blank: 11 } });
  const fen = sonuc.subjects.find((s) => s.info.key === "fen")!;
  yakin(fen.net, fenBilgi.avgNet);
  yakin(fen.standardScore, 50);
});

test("standart puan bir standart sapma yukarıda tam 60 olur", () => {
  const turkceBilgi = SUBJECTS.find((s) => s.key === "turkce")!;
  // Türkçe: ortalama 11.5, standart sapma 4.5 → 16 net = ortalama + 1 ss
  assert.equal(turkceBilgi.avgNet + turkceBilgi.stdNet, 16);
  const sonuc = calculateScore({ turkce: { correct: 16, wrong: 0, blank: 4 } });
  const turkce = sonuc.subjects.find((s) => s.info.key === "turkce")!;
  yakin(turkce.standardScore, 60);
  yakin(turkce.weightedStandardScore, 60 * turkceBilgi.coefficient);
});

test("ağırlıklı standart puan = standart puan × ders katsayısı", () => {
  const sonuc = calculateScore({ matematik: { correct: 10, wrong: 3, blank: 7 } });
  for (const d of sonuc.subjects) {
    yakin(d.weightedStandardScore, d.standardScore * d.info.coefficient);
    yakin(d.weightedNet, d.net * d.info.coefficient);
  }
  yakin(
    sonuc.tasp,
    sonuc.subjects.reduce((s, d) => s + d.weightedStandardScore, 0),
  );
});

// ─────────────────────────── Tutarlılık ───────────────────────────

test("daha çok doğru daha yüksek puan verir (monotonluk)", () => {
  const puanlar = [0, 5, 10, 15, 20].map(
    (d) => calculateScore({ matematik: { correct: d, wrong: 0, blank: 20 - d } }),
  );
  for (let i = 1; i < puanlar.length; i++) {
    assert.ok(
      puanlar[i].estimatedScoreSimple > puanlar[i - 1].estimatedScoreSimple,
      "hızlı tahmin doğru sayısıyla artmalı",
    );
    assert.ok(
      puanlar[i].estimatedScoreFormal > puanlar[i - 1].estimatedScoreFormal,
      "resmi tahmin doğru sayısıyla artmalı",
    );
  }
});

test("aynı net katsayısı yüksek dersten gelirse puan daha çok artar", () => {
  const matematik = calculateScore({ matematik: { correct: 10, wrong: 0, blank: 10 } });
  const din = calculateScore({ din: { correct: 10, wrong: 0, blank: 0 } });
  yakin(matematik.totalNet, din.totalNet);
  assert.ok(
    matematik.estimatedScoreSimple > din.estimatedScoreSimple,
    "katsayısı 4 olan ders puana daha çok katkı vermeli",
  );
});

test("toplam net = sözel net + sayısal net", () => {
  const sonuc = calculateScore({
    turkce: { correct: 15, wrong: 3, blank: 2 },
    inkilap: { correct: 6, wrong: 3, blank: 1 },
    matematik: { correct: 9, wrong: 6, blank: 5 },
    fen: { correct: 11, wrong: 3, blank: 6 },
  });
  yakin(sonuc.totalNet, sonuc.sozelNet + sonuc.sayisalNet);
});
