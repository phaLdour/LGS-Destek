import test from "node:test";
import assert from "node:assert/strict";

import type { QuizQuestion } from "@/content/types";
import {
  shuffleQuestionList,
  shuffleQuestionOptions,
} from "@/lib/shuffleOptions";
import { TURKCE } from "@/content/turkce";
import { getSubjectContent } from "@/content";

/**
 * Şık karıştırma testleri.
 *
 * KRİTİK REGRESYON: karıştırma doğru cevabın indeksini bozabiliyordu — şıklar
 * yer değiştiriyor ama `correctIndex` eski konumu gösteriyordu, yani öğrenci
 * doğru şıkkı işaretlediğinde "yanlış" sayılıyordu. Buradaki testlerin çoğu
 * tek bir değişmezi korur: KARIŞTIRMADAN SONRA `options[correctIndex]` HÂLÂ
 * ESKİ DOĞRU CEVABIN METNİDİR.
 *
 * Karıştırma soru metninden türetilen sabit tohumla yapıldığı için tamamen
 * deterministiktir; testlerde rastgelelik yoktur.
 */

function soru(
  metin: string,
  secenekler: string[],
  dogruIndeks: number,
): QuizQuestion {
  return { question: metin, options: secenekler, correctIndex: dogruIndeks };
}

/** Bir sorunun doğru cevabının METNİ. */
function dogruMetin(q: QuizQuestion): string {
  return q.options[q.correctIndex];
}

// ───────────────── Temel değişmez: doğru cevap kaybolmaz ─────────────────

test("karıştırma sonrası doğru cevabın METNİ değişmez (indeks doğru taşınır)", () => {
  const q = soru("Ankara hangi yılda başkent olmuştur?", ["1923", "1920", "1921", "1922"], 0);
  const k = shuffleQuestionOptions(q);
  assert.equal(dogruMetin(k), "1923");
});

test("doğru cevap her şık konumunda başlasa da metni korunur", () => {
  const secenekler = ["alfa", "beta", "gama", "delta"];
  for (let i = 0; i < secenekler.length; i++) {
    const q = soru(`Deneme sorusu numara ${i} — hangisi doğrudur?`, [...secenekler], i);
    const k = shuffleQuestionOptions(q);
    assert.equal(
      dogruMetin(k),
      secenekler[i],
      `doğru cevap ${i}. şıktayken karıştırma indeksi bozdu`,
    );
    assert.ok(
      k.correctIndex >= 0 && k.correctIndex < k.options.length,
      "correctIndex şık aralığının dışına çıktı",
    );
  }
});

test("şıklar ne kaybolur ne çoğalır (sadece sıra değişir)", () => {
  const q = soru("Aşağıdakilerden hangisi bir ilgeçtir?", ["gibi", "ve", "ama", "çünkü"], 0);
  const k = shuffleQuestionOptions(q);
  assert.equal(k.options.length, q.options.length);
  assert.deepEqual([...k.options].sort(), [...q.options].sort());
});

test("aynı soru her çağrıda AYNI sırayla karışır (deterministik/tohumlu)", () => {
  const q = soru("Işığın boşluktaki hızı yaklaşık kaçtır?", ["300.000 km/s", "150.000 km/s", "3.000 km/s", "30.000 km/s"], 0);
  const a = shuffleQuestionOptions(q);
  const b = shuffleQuestionOptions(q);
  const c = shuffleQuestionOptions({ ...q, options: [...q.options] });
  assert.deepEqual(a.options, b.options);
  assert.deepEqual(a.options, c.options);
  assert.equal(a.correctIndex, b.correctIndex);
  assert.equal(a.correctIndex, c.correctIndex);
});

test("karıştırma orijinal soru nesnesini değiştirmez (mutasyon yok)", () => {
  const secenekler = ["bir", "iki", "üç", "dört"];
  const q = soru("Mutasyon denetimi için örnek soru metni.", secenekler, 0);
  const oncekiSiralama = [...q.options];
  shuffleQuestionOptions(q);
  assert.deepEqual(q.options, oncekiSiralama);
  assert.equal(q.correctIndex, 0);
  assert.equal(q.options, secenekler, "aynı dizi referansı korunmalı");
});

test("açıklama gibi diğer alanlar karıştırmadan sonra da korunur", () => {
  const q: QuizQuestion = {
    question: "Kalbin görevi aşağıdakilerden hangisidir?",
    options: ["Kanı pompalamak", "Besin sindirmek", "Oksijen üretmek", "Kemik yapmak"],
    correctIndex: 0,
    explanation: "Kalp kası kanı damarlara pompalar.",
  };
  const k = shuffleQuestionOptions(q);
  assert.equal(k.question, q.question);
  assert.equal(k.explanation, q.explanation);
});

// ───────────────── Sınır durumları ─────────────────

test("2'den az şıkkı olan soru olduğu gibi döner", () => {
  const tek = soru("Tek şıklı bozuk soru", ["yalnız bu"], 0);
  assert.equal(shuffleQuestionOptions(tek), tek);
  const bos: QuizQuestion = { question: "Şıksız soru", options: [], correctIndex: 0 };
  assert.equal(shuffleQuestionOptions(bos), bos);
});

test("correctIndex şık aralığının dışındaysa soruya hiç dokunulmaz", () => {
  const q = soru("Bozuk veri denetimi için soru metni", ["a", "b", "c", "d"], 9);
  assert.equal(shuffleQuestionOptions(q), q, "bozuk soru aynı nesne olarak dönmeli");
});

test("iki şıklı soruda da doğru cevap metni korunur", () => {
  const q = soru("Dünya Güneş'in etrafında döner. Doğru mu?", ["Doğru", "Yanlış"], 0);
  const k = shuffleQuestionOptions(q);
  assert.equal(dogruMetin(k), "Doğru");
  assert.deepEqual([...k.options].sort(), ["Doğru", "Yanlış"]);
});

// ───────────────── Çıpalı ("Hepsi"/"Hiçbiri") şıklar ─────────────────

test("\"Hepsi\" gibi toplayıcı şıklar yerinden oynamaz", () => {
  const q = soru(
    "Aşağıdakilerden hangisi bir doğal sayıdır?",
    ["12", "45", "7", "Hepsi"],
    0,
  );
  const k = shuffleQuestionOptions(q);
  assert.equal(k.options[3], "Hepsi", "çıpalı şık en sonda kalmalı");
  assert.equal(dogruMetin(k), "12");
});

test("\"Hiçbiri\" doğru cevapken de yerinde kalır ve doğru işaretli kalır", () => {
  const q = soru(
    "Aşağıdakilerden hangisi bir ünlü harftir? (tuzak soru)",
    ["k", "t", "s", "Hiçbiri"],
    3,
  );
  const k = shuffleQuestionOptions(q);
  assert.equal(k.options[3], "Hiçbiri");
  assert.equal(k.correctIndex, 3);
  assert.equal(dogruMetin(k), "Hiçbiri");
});

test("serbest şık sayısı 2'nin altına düşerse karıştırma yapılmaz", () => {
  // 3 şıkkın 2'si çıpalı → geriye tek serbest şık kalır
  const q = soru("Çıpa ağırlıklı soru metni", ["Yalnız I", "Hepsi", "Hiçbiri"], 0);
  assert.equal(shuffleQuestionOptions(q), q);
});

// ───────────────── Liste yardımcısı ─────────────────

test("shuffleQuestionList boş/tanımsız listeyi olduğu gibi döndürür", () => {
  assert.equal(shuffleQuestionList(undefined), undefined);
  const bos: QuizQuestion[] = [];
  assert.equal(shuffleQuestionList(bos), bos);
});

test("shuffleQuestionList listedeki her sorunun doğru cevabını korur", () => {
  const liste = [
    soru("Birinci deneme sorusu metni nedir?", ["A cevabı", "B cevabı", "C cevabı", "D cevabı"], 0),
    soru("İkinci deneme sorusu metni nedir?", ["kırmızı", "mavi", "yeşil", "sarı"], 2),
    soru("Üçüncü deneme sorusu metni nedir?", ["10", "20", "30", "40"], 3),
  ];
  const beklenenMetinler = liste.map(dogruMetin);
  const karisik = shuffleQuestionList(liste)!;
  assert.equal(karisik.length, liste.length);
  karisik.forEach((q, i) => {
    assert.equal(dogruMetin(q), beklenenMetinler[i]);
    assert.deepEqual([...q.options].sort(), [...liste[i].options].sort());
  });
});

// ───────────────── Gerçek içerik üzerinde regresyon ─────────────────

test("gerçek içerik: karıştırma sonrası hiçbir sorunun doğru cevabı kaymaz", () => {
  const ham = TURKCE;
  const karisik = getSubjectContent("turkce")!;
  assert.equal(karisik.topics.length, ham.topics.length, "konu sırası korunmalı");

  let karsilastirilan = 0;
  ham.topics.forEach((hamKonu, ki) => {
    const kKonu = karisik.topics[ki];
    assert.equal(kKonu.id, hamKonu.id, "konu kimlikleri eşleşmeli");

    const ciftler: [QuizQuestion[] | undefined, QuizQuestion[] | undefined][] = [
      [hamKonu.quickQuestions, kKonu.quickQuestions],
      [hamKonu.quiz, kKonu.quiz],
    ];
    for (const [hamListe, kListe] of ciftler) {
      if (!hamListe?.length) continue;
      assert.equal(kListe?.length, hamListe.length);
      hamListe.forEach((hq, qi) => {
        const kq = kListe![qi];
        karsilastirilan++;
        assert.equal(kq.question, hq.question, "soru metni değişmemeli");
        assert.equal(
          dogruMetin(kq),
          dogruMetin(hq),
          `doğru cevap kaydı bozuldu: ${hamKonu.id}#${qi}`,
        );
        assert.deepEqual([...kq.options].sort(), [...hq.options].sort());
      });
    }
  });
  assert.ok(karsilastirilan > 100, "anlamlı bir örneklem karşılaştırılmalı");
});

test("gerçek içerik: doğru cevap artık hep A şıkkında değil (ezber refleksi kırılır)", () => {
  const ham = TURKCE;
  const karisik = getSubjectContent("turkce")!;

  const say = (konular: { quickQuestions?: QuizQuestion[] }[]) => {
    let toplam = 0;
    let aSikki = 0;
    for (const t of konular) {
      for (const q of t.quickQuestions ?? []) {
        toplam++;
        if (q.correctIndex === 0) aSikki++;
      }
    }
    return { toplam, aSikki };
  };

  const hamSayim = say(ham.topics);
  const karisikSayim = say(karisik.topics);
  assert.ok(hamSayim.toplam > 0);
  assert.equal(karisikSayim.toplam, hamSayim.toplam);

  // Ham içerikte doğru cevap ezici çoğunlukla A şıkkındadır (sorunun kaynağı).
  assert.ok(
    hamSayim.aSikki / hamSayim.toplam > 0.8,
    "ham içerik varsayımı değişmiş — test gözden geçirilmeli",
  );
  // Karıştırmadan sonra A şıkkı payı dört şıkka yakın dağılmalıdır.
  const oran = karisikSayim.aSikki / karisikSayim.toplam;
  assert.ok(
    oran < 0.45,
    `karıştırmadan sonra doğru cevapların %${(oran * 100).toFixed(1)}'i hâlâ A şıkkında`,
  );
});
