/**
 * Branş denemeleri — `src/lib/mockExam.ts` + `src/lib/cikmisBransDeneme.ts`
 *
 * İki ayrı kaynak var ve ikisinin de soru sayısı/süresi GERÇEK LGS ile
 * birebir aynı olmalı. Sayı ya da süre kayarsa öğrencinin net tahmini
 * yanıltıcı olur — asıl risk bu, o yüzden testler oraya odaklı.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  BRANSLAR,
  EXAM_KINDS,
  SAYISAL_DK_PER_SORU,
  SOZEL_DK_PER_SORU,
  bransSuresiDk,
  bransTanim,
  buildExamPool,
  getExamConfig,
} from "@/lib/mockExam";
import {
  cikmisBransBul,
  cikmisBransListesi,
  cikmisBransSorulari,
} from "@/lib/cikmisBransDeneme";
import { dersinCikmisSorulari } from "@/lib/konuCikmisSorular";

/** Kullanıcının istediği dağılım — gerçek LGS ders başına soru sayısı. */
const BEKLENEN: Record<string, { adet: number; dk: number }> = {
  "brans-turkce": { adet: 20, dk: 30 },
  "brans-matematik": { adet: 20, dk: 40 },
  "brans-fen": { adet: 20, dk: 40 },
  "brans-inkilap": { adet: 10, dk: 15 },
  "brans-din": { adet: 10, dk: 15 },
  "brans-ingilizce": { adet: 10, dk: 15 },
};

test("altı branş var, hepsi doğru ders", () => {
  assert.equal(BRANSLAR.length, 6);
  assert.deepEqual(
    BRANSLAR.map((b) => b.kind).sort(),
    Object.keys(BEKLENEN).sort(),
  );
});

test("soru sayıları gerçek LGS dağılımıyla aynı", () => {
  for (const b of BRANSLAR) {
    assert.equal(b.count, BEKLENEN[b.kind].adet, `${b.subjectName} soru sayısı`);
  }
});

test("süreler gerçek LGS temposundan hesaplanıyor", () => {
  // Sözel 75/50 = 1.5 dk, Sayısal 80/40 = 2 dk
  assert.equal(SOZEL_DK_PER_SORU, 1.5);
  assert.equal(SAYISAL_DK_PER_SORU, 2);
  for (const b of BRANSLAR) {
    assert.equal(bransSuresiDk(b), BEKLENEN[b.kind].dk, `${b.subjectName} süre`);
    const beklenenTempo: number =
      b.bolum === "sayisal" ? SAYISAL_DK_PER_SORU : SOZEL_DK_PER_SORU;
    assert.equal(
      bransSuresiDk(b),
      Math.round(b.count * beklenenTempo),
      `${b.subjectName}: süre tempodan hesaplanmalı, elle yazılmamalı`,
    );
  }
});

test("zor branş denemesi süreyi KISALTMAZ", () => {
  // Tam denemelerdeki kuralla aynı: zorluk yalnız soru havuzunu değiştirir.
  for (const b of BRANSLAR) {
    const kolay = getExamConfig(b.kind, "kolay");
    const zor = getExamConfig(b.kind, "zor");
    assert.equal(zor.durationMinutes, kolay.durationMinutes, b.subjectName);
    assert.equal(zor.totalQuestions, kolay.totalQuestions, b.subjectName);
  }
});

test("branş denemesi YALNIZ o dersin sorularını içerir", () => {
  for (const b of BRANSLAR) {
    for (const zorluk of ["kolay", "zor"] as const) {
      const havuz = buildExamPool(b.kind, zorluk);
      assert.equal(
        havuz.length,
        b.count,
        `${b.subjectName} ${zorluk}: havuz eksik/fazla`,
      );
      const dersler = [...new Set(havuz.map((q) => q.subjectSlug))];
      assert.deepEqual(
        dersler,
        [b.subject],
        `${b.subjectName} ${zorluk}: başka ders karışmış`,
      );
    }
  }
});

test("branş denemesinde aynı soru iki kez çıkmaz", () => {
  for (const b of BRANSLAR) {
    const havuz = buildExamPool(b.kind, "kolay");
    assert.equal(
      new Set(havuz.map((q) => q.id)).size,
      havuz.length,
      `${b.subjectName}: tekrar eden soru`,
    );
  }
});

test("etiket adı dersi ve zorluğu söylüyor", () => {
  const cfg = getExamConfig("brans-matematik", "zor");
  assert.match(cfg.label, /Matematik/);
  assert.match(cfg.label, /Branş/);
  assert.match(cfg.label, /Zor/);
});

test("branş olmayan türler bozulmadı", () => {
  assert.equal(bransTanim("sozel"), null);
  assert.equal(bransTanim("tam"), null);
  const sozel = getExamConfig("sozel", "kolay");
  assert.equal(sozel.totalQuestions, 50);
  assert.equal(sozel.durationMinutes, 75);
  const tam = getExamConfig("tam", "zor");
  assert.equal(tam.totalQuestions, 90);
  assert.equal(tam.durationMinutes, 155);
});

// ── Çıkmış sorulardan branş denemesi ────────────────────────────────

test("her ders için çıkmış soru havuzu yeterli", () => {
  const liste = cikmisBransListesi();
  assert.equal(liste.length, 6, "altı dersin de havuzu yetmeli");
  for (const c of liste) {
    assert.ok(
      c.havuz >= c.tanim.count,
      `${c.tanim.subjectName}: havuz ${c.havuz} < ${c.tanim.count}`,
    );
    assert.equal(c.sureDk, BEKLENEN[c.tanim.kind].dk);
  }
});

test("çıkmış branş denemesi doğru sayıda, doğru dersten soru veriyor", () => {
  for (const b of BRANSLAR) {
    const sorular = cikmisBransSorulari(b);
    assert.equal(sorular.length, b.count, `${b.subjectName} soru sayısı`);
    const beklenenSlug = b.subject === "fen-bilimleri" ? "fen" : b.subject;
    for (const q of sorular) {
      assert.equal(q.subjectSlug, beklenenSlug, `${b.subjectName}: yabancı soru`);
      assert.ok(q.year >= 2018 && q.year <= 2026, `geçersiz yıl: ${q.year}`);
      assert.ok(q.correctIndex >= 0 && q.correctIndex <= 3);
    }
  }
});

test("çıkmış branş denemesinde aynı soru iki kez çıkmaz", () => {
  for (const b of BRANSLAR) {
    for (let deneme = 0; deneme < 20; deneme++) {
      const s = cikmisBransSorulari(b);
      const anahtarlar = s.map((q) => `${q.year}-${q.subjectSlug}-${q.no}`);
      assert.equal(
        new Set(anahtarlar).size,
        anahtarlar.length,
        `${b.subjectName}: tekrar eden soru`,
      );
    }
  }
});

test("sorular yeniden eskiye sıralı geliyor", () => {
  const s = cikmisBransSorulari(bransTanim("brans-turkce")!);
  for (let i = 1; i < s.length; i++) {
    const o = s[i - 1];
    const y = s[i];
    assert.ok(
      o.year > y.year || (o.year === y.year && o.no < y.no),
      `sıra bozuk: ${o.year}-${o.no} sonra ${y.year}-${y.no}`,
    );
  }
});

test("her açılışta farklı set geliyor (rastgele)", () => {
  const b = bransTanim("brans-matematik")!;
  const imza = () =>
    cikmisBransSorulari(b)
      .map((q) => `${q.year}-${q.no}`)
      .join("|");
  const imzalar = new Set([imza(), imza(), imza(), imza(), imza()]);
  assert.ok(
    imzalar.size > 1,
    "beş açılışın hepsi aynı geldi — rastgelelik çalışmıyor",
  );
});

test("çıkmış havuz ETİKETSİZ soruları da içeriyor", () => {
  // Konu etiketi olmayan 40 soru (grafik/tablo/sözel mantık) burada
  // havuza dahil olmalı: amaç konu çalışmak değil, sınav provası.
  const turkce = dersinCikmisSorulari("turkce");
  assert.equal(turkce.length, 180, "Türkçe'nin 9 yıllık tüm soruları");
  const fen = dersinCikmisSorulari("fen-bilimleri");
  assert.equal(fen.length, 180, "Fen slug eşlemesi çalışmalı");
});

test("olmayan ders için null / boş döner", () => {
  assert.equal(cikmisBransBul("yok-boyle-ders"), null);
  assert.deepEqual(dersinCikmisSorulari("yok-boyle-ders"), []);
});

test("her branş türü /deneme/[kind] rotasınca geçerli sayılır", () => {
  // REGRESYON: rota dosyasında geçerli türler ELLE yazılmıştı
  // (["sozel","sayisal","tam"]) ve branşlar eklenince güncellenmediği için
  // altı branş denemesinin hepsi 404 veriyordu. Artık EXAM_KINDS tek kaynak.
  for (const b of BRANSLAR) {
    assert.ok(
      EXAM_KINDS.includes(b.kind),
      `${b.kind} EXAM_KINDS içinde yok — rota 404 verir`,
    );
  }
  assert.equal(new Set(EXAM_KINDS).size, EXAM_KINDS.length, "tekrar eden tür");
});
