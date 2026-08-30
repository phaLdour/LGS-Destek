import test from "node:test";
import assert from "node:assert/strict";

import {
  EXAM_DIFFICULTIES,
  EXAM_KINDS,
  buildExamPool,
  getExamConfig,
  type ExamDifficulty,
  type ExamKind,
} from "@/lib/mockExam";
import { collectAllQuestions, collectWeightedQuestions } from "@/lib/quickQuiz";
import type { PoolQuestion } from "@/lib/quickQuiz-types";
import { ADVANCED_QUESTIONS } from "@/content/advanced-questions";
import { getAllSubjects, getSubjectContent } from "@/content";

/**
 * Deneme sınavı havuzu ve Hızlı Sorular havuzu testleri.
 *
 * `buildExamPool` içinde Math.random ile karıştırma vardır; bu yüzden
 * testler "hangi soru geldi" gibi rastgele sonuçları değil, her çalıştırmada
 * geçerli olması gereken YAPISAL değişmezleri doğrular (soru sayısı, ders
 * dağılımı, kimlik tekilliği, doğru cevabın bozulmamış olması).
 */

const TUM_TURLER: ExamKind[] = ["sozel", "sayisal", "tam"];
const TUM_ZORLUKLAR: ExamDifficulty[] = ["kolay", "zor"];

/** Havuzu, ardışık aynı-ders bloklarına ayırır. */
function derseGoreBloklar(havuz: PoolQuestion[]): { slug: string; sorular: PoolQuestion[] }[] {
  const bloklar: { slug: string; sorular: PoolQuestion[] }[] = [];
  for (const q of havuz) {
    const son = bloklar[bloklar.length - 1];
    if (son && son.slug === q.subjectSlug) son.sorular.push(q);
    else bloklar.push({ slug: q.subjectSlug, sorular: [q] });
  }
  return bloklar;
}

// ───────────────── Sınav yapılandırması ─────────────────

test("deneme türleri gerçek LGS süre ve soru sayılarını taşır", () => {
  // Üç tam deneme türü + altı branş denemesi. Branşların kendi ayrıntılı
  // testleri tests/brans-deneme.test.ts içinde; burada yalnız tam
  // denemelerin bozulmadığını doğruluyoruz.
  assert.deepEqual(EXAM_KINDS.slice(0, 3), ["sozel", "sayisal", "tam"]);
  assert.equal(EXAM_KINDS.length, 9, "3 tam deneme + 6 branş");
  assert.deepEqual(EXAM_DIFFICULTIES, ["kolay", "zor"]);

  const sozel = getExamConfig("sozel");
  assert.equal(sozel.durationMinutes, 75);
  assert.equal(sozel.totalQuestions, 50);

  const sayisal = getExamConfig("sayisal");
  assert.equal(sayisal.durationMinutes, 80);
  assert.equal(sayisal.totalQuestions, 40);

  const tam = getExamConfig("tam");
  assert.equal(tam.durationMinutes, 155);
  assert.equal(tam.totalQuestions, 90);
  assert.equal(sozel.durationMinutes + sayisal.durationMinutes, tam.durationMinutes);
});

test("zor deneme süreyi KISALTMAZ — süre gerçek LGS süresine eşit kalır", () => {
  // Regresyon: zor denemede süre %20 kısaltılıyordu; artık zorluk yalnız soru
  // havuzunu değiştirir.
  for (const tur of TUM_TURLER) {
    assert.equal(
      getExamConfig(tur, "zor").durationMinutes,
      getExamConfig(tur, "kolay").durationMinutes,
      `${tur} türünde zor/kolay süresi farklı`,
    );
  }
});

test("zorluk verilmezse varsayılan 'kolay' olur", () => {
  assert.equal(getExamConfig("tam").difficulty, "kolay");
  assert.match(getExamConfig("tam").label, /Kolay/);
  assert.match(getExamConfig("tam", "zor").label, /Zor/);
});

test("ders dağılımının toplamı toplam soru sayısına eşittir", () => {
  for (const tur of TUM_TURLER) {
    const cfg = getExamConfig(tur);
    const toplam = cfg.distribution.reduce((s, d) => s + d.count, 0);
    assert.equal(toplam, cfg.totalQuestions, `${tur} dağılımı toplamı tutmuyor`);
  }
});

test("tam deneme = sözel dağılımı + sayısal dağılımı (önce sözel)", () => {
  const tam = getExamConfig("tam");
  const beklenen = [
    ...getExamConfig("sozel").distribution,
    ...getExamConfig("sayisal").distribution,
  ];
  assert.deepEqual(tam.distribution, beklenen);
});

test("sözel dağılımı MEB formatıyla birebir aynıdır", () => {
  assert.deepEqual(
    getExamConfig("sozel").distribution.map((d) => [d.subject, d.count]),
    [
      ["turkce", 20],
      ["inkilap", 10],
      ["din", 10],
      ["ingilizce", 10],
    ],
  );
  assert.deepEqual(
    getExamConfig("sayisal").distribution.map((d) => [d.subject, d.count]),
    [
      ["matematik", 20],
      ["fen-bilimleri", 20],
    ],
  );
});

// ───────────────── Havuz üretimi ─────────────────

test("her tür ve zorluk için havuz tam soru sayısını üretir", () => {
  for (const tur of TUM_TURLER) {
    for (const zorluk of TUM_ZORLUKLAR) {
      const havuz = buildExamPool(tur, zorluk);
      assert.equal(
        havuz.length,
        getExamConfig(tur, zorluk).totalQuestions,
        `${tur}/${zorluk} havuzu eksik soru üretti`,
      );
    }
  }
});

test("havuzda aynı soru iki kez çıkmaz", () => {
  for (const tur of TUM_TURLER) {
    for (const zorluk of TUM_ZORLUKLAR) {
      const havuz = buildExamPool(tur, zorluk);
      const kimlikler = new Set(havuz.map((q) => q.id));
      assert.equal(kimlikler.size, havuz.length, `${tur}/${zorluk} havuzunda tekrar var`);
    }
  }
});

test("havuzdaki ders dağılımı yapılandırmayla birebir uyuşur", () => {
  for (const tur of TUM_TURLER) {
    for (const zorluk of TUM_ZORLUKLAR) {
      const cfg = getExamConfig(tur, zorluk);
      const havuz = buildExamPool(tur, zorluk);
      const sayim = new Map<string, number>();
      for (const q of havuz) sayim.set(q.subjectSlug, (sayim.get(q.subjectSlug) ?? 0) + 1);
      for (const slot of cfg.distribution) {
        assert.equal(
          sayim.get(slot.subject) ?? 0,
          slot.count,
          `${tur}/${zorluk} — ${slot.subject} soru sayısı yanlış`,
        );
      }
      assert.equal(sayim.size, cfg.distribution.length, "beklenmeyen ders havuza girmiş");
    }
  }
});

test("tam denemede önce sözel sonra sayısal bölüm gelir", () => {
  const havuz = buildExamPool("tam", "kolay");
  const sozelDersler = new Set(getExamConfig("sozel").distribution.map((d) => d.subject));
  const ilk50 = havuz.slice(0, 50);
  const son40 = havuz.slice(50);
  assert.ok(
    ilk50.every((q) => sozelDersler.has(q.subjectSlug)),
    "ilk 50 soru sözel bölümden olmalı",
  );
  assert.ok(
    son40.every((q) => !sozelDersler.has(q.subjectSlug)),
    "son 40 soru sayısal bölümden olmalı",
  );
});

test("havuzdaki her soru cevaplanabilir durumdadır (şık ve geçerli doğru indeks)", () => {
  for (const tur of TUM_TURLER) {
    for (const zorluk of TUM_ZORLUKLAR) {
      for (const q of buildExamPool(tur, zorluk)) {
        assert.ok(q.question.options.length >= 2, `${q.id} yeterli şıkka sahip değil`);
        assert.ok(
          Number.isInteger(q.question.correctIndex) &&
            q.question.correctIndex >= 0 &&
            q.question.correctIndex < q.question.options.length,
          `${q.id} doğru cevap indeksi geçersiz`,
        );
        assert.ok(q.subjectName.length > 0 && q.topicName.length > 0, `${q.id} meta eksik`);
      }
    }
  }
});

// ───────────────── Zor deneme: yeni nesil sorular ─────────────────

test("kolay denemede yeni nesil (#adv) soru bulunmaz", () => {
  for (const tur of TUM_TURLER) {
    const havuz = buildExamPool(tur, "kolay");
    assert.ok(
      havuz.every((q) => !q.id.includes("#adv")),
      `${tur} kolay havuzuna zor soru sızmış`,
    );
  }
});

test("zor denemede yeni nesil sorular öncelikli kullanılır", () => {
  const havuz = buildExamPool("tam", "zor");
  const advSayisi = havuz.filter((q) => q.id.includes("#adv")).length;
  assert.ok(advSayisi > 0, "zor denemede hiç yeni nesil soru yok");

  // Her ders bloğunda önce advanced, sonra kolay dolgu gelir.
  for (const blok of derseGoreBloklar(havuz)) {
    let kolayGoruldu = false;
    for (const q of blok.sorular) {
      const adv = q.id.includes("#adv");
      if (!adv) kolayGoruldu = true;
      else
        assert.ok(
          !kolayGoruldu,
          `${blok.slug} bloğunda kolay sorudan sonra zor soru geldi (${q.id})`,
        );
    }
  }
});

test("zor havuzdaki yeni nesil soruların doğru cevabı karıştırmadan sonra da doğrudur", () => {
  // Zor havuz @/content karıştırmasından geçmez; karıştırma mockExam içinde
  // yapılır. Karıştırma doğru cevabın indeksini bozarsa öğrenci doğru şıkkı
  // işaretlediği hâlde yanlış sayılır — bu test tam olarak onu engeller.
  const havuz = buildExamPool("tam", "zor");
  const advSorular = havuz.filter((q) => q.id.includes("#adv"));
  assert.ok(advSorular.length > 0, "karşılaştırılacak yeni nesil soru bulunamadı");

  for (const q of advSorular) {
    const kesme = q.id.indexOf("#adv");
    const anahtar = q.id.slice(0, kesme);
    const sira = Number(q.id.slice(kesme + "#adv".length));
    const ham = ADVANCED_QUESTIONS[anahtar]?.[sira];
    assert.ok(ham, `${q.id} için ham zor soru bulunamadı`);
    assert.equal(q.question.question, ham!.question, `${q.id} soru metni değişmiş`);
    assert.equal(
      q.question.options[q.question.correctIndex],
      ham!.options[ham!.correctIndex],
      `${q.id} doğru cevabı karıştırma sırasında bozulmuş`,
    );
    assert.deepEqual([...q.question.options].sort(), [...ham!.options].sort());
  }
});

// ───────────────── Hızlı Sorular havuzu (kapsam) ─────────────────

test("konu kapsamı: kimlikler 'ders/konu#sıra' biçimindedir ve meta doğrudur", () => {
  const turkce = getSubjectContent("turkce")!;
  const konu = turkce.topics.find((t) => t.quickQuestions?.length)!;
  const havuz = collectAllQuestions({ kind: "topic", subject: "turkce", topic: konu.id });

  assert.ok(havuz.length > 0);
  for (const q of havuz) {
    assert.match(q.id, new RegExp(`^turkce/${konu.id}#\\d+$`));
    assert.equal(q.subjectSlug, "turkce");
    assert.equal(q.subjectName, turkce.name);
    assert.equal(q.topicId, konu.id);
    assert.equal(q.topicName, konu.name);
  }
});

test("bilinmeyen ders veya konu için boş havuz döner (çökme yok)", () => {
  assert.deepEqual(collectAllQuestions({ kind: "karma-subject", subject: "olmayan-ders" }), []);
  assert.deepEqual(
    collectAllQuestions({ kind: "topic", subject: "olmayan-ders", topic: "yok" }),
    [],
  );
  assert.deepEqual(collectAllQuestions({ kind: "topic", subject: "turkce", topic: "yok" }), []);
});

test("havuz toplama deterministiktir: iki çağrı aynı kimlik dizisini verir", () => {
  const a = collectAllQuestions({ kind: "karma-subject", subject: "matematik" });
  const b = collectAllQuestions({ kind: "karma-subject", subject: "matematik" });
  assert.deepEqual(
    a.map((q) => q.id),
    b.map((q) => q.id),
  );
});

test("karma-subject yalnız o dersin sorularını, karma-all tüm dersleri içerir", () => {
  const tekDers = collectAllQuestions({ kind: "karma-subject", subject: "fen-bilimleri" });
  assert.ok(tekDers.length > 0);
  assert.ok(tekDers.every((q) => q.subjectSlug === "fen-bilimleri"));

  const hepsi = collectAllQuestions({ kind: "karma-all" });
  const dersler = new Set(hepsi.map((q) => q.subjectSlug));
  for (const s of getAllSubjects()) {
    const dersHavuzu = collectAllQuestions({ kind: "karma-subject", subject: s.slug });
    if (dersHavuzu.length > 0) {
      assert.ok(dersler.has(s.slug), `${s.slug} karma havuzda yok`);
    }
  }
  assert.ok(hepsi.length >= tekDers.length);
});

test("havuzda birebir aynı soru iki kez yer almaz (kopya filtresi)", () => {
  const imza = (q: { question: string; options: string[]; correctIndex: number }) =>
    JSON.stringify([q.question.trim(), [...q.options].sort(), q.options[q.correctIndex]]);

  const hepsi = collectAllQuestions({ kind: "karma-all" });
  const gorulen = new Set<string>();
  for (const q of hepsi) {
    const k = imza(q.question);
    assert.ok(!gorulen.has(k), `havuzda kopya soru var: ${q.id}`);
    gorulen.add(k);
  }
});

test("konu testinde (LGS İpucu) bulunan sorular hızlı soru havuzuna girmez", () => {
  const imza = (q: { question: string; options: string[]; correctIndex: number }) =>
    JSON.stringify([q.question.trim(), [...q.options].sort(), q.options[q.correctIndex]]);

  const quizImzalari = new Set<string>();
  for (const s of getAllSubjects()) {
    for (const t of s.topics) {
      for (const q of t.quiz ?? []) quizImzalari.add(imza(q));
    }
  }
  assert.ok(quizImzalari.size > 0, "konu testi soruları bulunamadı");

  for (const q of collectAllQuestions({ kind: "karma-all" })) {
    assert.ok(!quizImzalari.has(imza(q.question)), `konu testi sorusu havuza sızmış: ${q.id}`);
  }
});

// ───────────────── Ağırlıklı (akıllı) havuz ─────────────────

test("zayıf konu yoksa ağırlıklı havuz normal havuzla aynıdır", () => {
  const kapsam = { kind: "karma-subject", subject: "din" } as const;
  const normal = collectAllQuestions(kapsam);
  const agirlikli = collectWeightedQuestions(kapsam, new Set());
  assert.deepEqual(
    agirlikli.map((q) => q.id),
    normal.map((q) => q.id),
  );
});

test("zayıf konunun soruları havuzda iki kat yer kaplar (çıkma şansı artar)", () => {
  const turkce = getSubjectContent("turkce")!;
  const konu = turkce.topics.find((t) => t.quickQuestions?.length)!;
  const kapsam = { kind: "karma-subject", subject: "turkce" } as const;

  const normal = collectAllQuestions(kapsam);
  const zayifKonuSayisi = normal.filter((q) => q.topicId === konu.id).length;
  assert.ok(zayifKonuSayisi > 0);

  const agirlikli = collectWeightedQuestions(kapsam, new Set([`turkce/${konu.id}`]));
  assert.equal(agirlikli.length, normal.length + zayifKonuSayisi);

  const sayim = agirlikli.filter((q) => q.topicId === konu.id).length;
  assert.equal(sayim, zayifKonuSayisi * 2, "zayıf konu soruları iki kez bulunmalı");

  // Diğer konular etkilenmez
  const digerNormal = normal.filter((q) => q.topicId !== konu.id).length;
  const digerAgirlikli = agirlikli.filter((q) => q.topicId !== konu.id).length;
  assert.equal(digerAgirlikli, digerNormal);
});

test("kapsamda olmayan zayıf konu havuzu büyütmez", () => {
  const kapsam = { kind: "karma-subject", subject: "din" } as const;
  const normal = collectAllQuestions(kapsam);
  const agirlikli = collectWeightedQuestions(kapsam, new Set(["matematik/olmayan-konu"]));
  assert.equal(agirlikli.length, normal.length);
});
