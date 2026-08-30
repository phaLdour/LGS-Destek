/**
 * `src/lib/bugununPlani.ts` — "Bugünün planı" motoru.
 *
 * ENGELLENEN GEÇMİŞ HATALAR:
 *
 *  1. HİÇ YANLIŞI OLMAYAN ÖĞRENCİYE "TEKRAR ET" ÖNERİLİYORDU. Eskiden yalnız
 *     `toplam >= EN_AZ_SORU` şartı vardı; hepsini doğru yapmış öğrenciye bile
 *     "En çok burada zorlanıyorsun — 12 sorunun %0'ını yanlış yaptın"
 *     deniyordu. Yanlışı olmayan konu bir zayıflık değildir.
 *  2. Bu düzeltmeden sonra `onerilen` boş kalabildiği için kart bomboş
 *     görünebiliyordu → hiç aday yoksa makul bir YEDEK öneri dönmeli.
 *  3. HAYALET SAYAÇ: bekleyen hata sayısı /hatalarim listesiyle aynı kuraldan
 *     geçmeli (çıkmış soru yanlışları ve ustalaşmış kayıtlar sayılmaz).
 *
 * SAAT DİLİMİ: `planiHesapla` saf sayısal bir fonksiyondur. `getBugununPlani`
 * içindeki tek tarih hesabı sorgu penceresidir ve `trPencereBaslangici(180)`
 * üzerinden TR gün başına sabitlenir (bkz. tests/zaman.test.ts). Testlerdeki
 * damgalar `Date.now()`'a görelidir; yerel saat dilimi sonucu değiştirmez.
 */
import { test, describe, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import Module from "node:module";
import { getAllSubjects } from "@/content";
import { collectAllQuestions } from "@/lib/quickQuiz";

const GUN_MS = 24 * 60 * 60 * 1000;

// ── Sahte Supabase (sunucu) ─────────────────────────────────────────────
// `getBugununPlani` gerçek Supabase + `next/headers` ister. Modül önbelleğine
// girmeden ÖNCE `@/lib/supabase/server` isteğini sahtesiyle karşılıyoruz;
// böylece motorun tamamı (sayaç, kaldığın yer, yedek öneri) ağa çıkmadan
// uçtan uca çalıştırılabiliyor.

type SahteVeri = Record<string, unknown[]>;
let veri: SahteVeri = {};

interface SahteZincir {
  select(): SahteZincir;
  gte(): SahteZincir;
  eq(): SahteZincir;
  order(): SahteZincir;
  limit(adet: number): SahteZincir;
  then(coz: (sonuc: { data: unknown[] }) => unknown): unknown;
}

function sahteZincir(tablo: string): SahteZincir {
  let satirlar = [...(veri[tablo] ?? [])];
  const zincir: SahteZincir = {
    select: () => zincir,
    gte: () => zincir,
    eq: () => zincir,
    order: () => zincir,
    limit: (adet: number) => {
      satirlar = satirlar.slice(0, adet);
      return zincir;
    },
    then: (coz) => coz({ data: satirlar }),
  };
  return zincir;
}

const sahteSunucuModulu = {
  isSupabaseConfigured: () => true,
  getCurrentUser: async () => ({ id: "ogrenci-1" }),
  createClient: async () => ({ from: (tablo: string) => sahteZincir(tablo) }),
};

const ModulYukleyici = Module as unknown as {
  _load: (istek: string, ana: unknown, kokMu: boolean) => unknown;
};
const asilYukle = ModulYukleyici._load;
ModulYukleyici._load = function (istek: string, ana: unknown, kokMu: boolean) {
  if (istek === "@/lib/supabase/server") return sahteSunucuModulu;
  return asilYukle.call(this, istek, ana, kokMu);
};

type PlanModulu = typeof import("@/lib/bugununPlani");
let P!: PlanModulu;

before(async () => {
  P = await import("@/lib/bugununPlani");
});

beforeEach(() => {
  veri = {};
});

// ── Gerçek içerikten örnek konular ──────────────────────────────────────
const DERSLER = getAllSubjects();
const DERS = DERSLER[0];
const KONU_A = DERS.topics[0];
const KONU_B = DERS.topics[1];

type QuizSatiri = {
  subject_slug: string;
  topic_id: string;
  correct_count: number;
  wrong_count: number;
};

function quiz(
  konu: { subject: string; topic: string },
  dogru: number,
  yanlis: number,
): QuizSatiri {
  return {
    subject_slug: konu.subject,
    topic_id: konu.topic,
    correct_count: dogru,
    wrong_count: yanlis,
  };
}

const A = { subject: DERS.slug, topic: KONU_A.id };
const B = { subject: DERS.slug, topic: KONU_B.id };

describe("plan: planiHesapla — yanlışsız konu tekrar adayı değildir", () => {
  test("hepsini doğru yapılmış konu öneri listesine girmez", () => {
    const { siralanmis, toplamSoru } = P.planiHesapla([quiz(A, 12, 0)]);
    assert.deepEqual(siralanmis, [], "yanlışı olmayan konu zayıflık değildir");
    assert.equal(toplamSoru, 12, "soru yine de toplam sayıya girer");
  });

  test("tek bir yanlış bile konuyu aday yapar", () => {
    const { siralanmis } = P.planiHesapla([quiz(A, 11, 1)]);
    assert.equal(siralanmis.length, 1);
    assert.equal(siralanmis[0].key, `${DERS.slug}/${KONU_A.id}`);
    assert.equal(siralanmis[0].hamOran, Math.round((1 / 12) * 100));
    assert.equal(siralanmis[0].toplam, 12);
  });

  test("yanlışsız konular elenirken yanlışı olanlar kalır", () => {
    const { siralanmis } = P.planiHesapla([quiz(A, 20, 0), quiz(B, 15, 5)]);
    assert.deepEqual(
      siralanmis.map((s) => s.key),
      [`${DERS.slug}/${KONU_B.id}`],
    );
  });

  test("en az 3 soru şartı: 2 soruluk konu aday olmaz", () => {
    assert.deepEqual(P.planiHesapla([quiz(A, 1, 1)]).siralanmis, []);
    assert.equal(P.planiHesapla([quiz(A, 2, 1)]).siralanmis.length, 1);
  });

  test("hiç soru çözülmemiş satır (toplam 0) atlanır", () => {
    const { siralanmis, toplamSoru } = P.planiHesapla([quiz(A, 0, 0)]);
    assert.deepEqual(siralanmis, []);
    assert.equal(toplamSoru, 0);
  });

  test("sanal kayıtlar (__deneme_, __sozluk__) istatistiğe girmez", () => {
    const { siralanmis, toplamSoru } = P.planiHesapla([
      { subject_slug: "__deneme_1__", topic_id: "x", correct_count: 50, wrong_count: 30 },
      { subject_slug: "__sozluk__", topic_id: "x", correct_count: 40, wrong_count: 20 },
      { subject_slug: DERS.slug, topic_id: "__odak__", correct_count: 5, wrong_count: 5 },
      quiz(A, 8, 2),
    ]);
    assert.deepEqual(
      siralanmis.map((s) => s.key),
      [`${DERS.slug}/${KONU_A.id}`],
    );
    assert.equal(toplamSoru, 10, "yalnız gerçek konu soruları sayılır");
  });

  test("aynı konunun birden çok kaydı toplanır", () => {
    const { siralanmis } = P.planiHesapla([quiz(A, 5, 5), quiz(A, 10, 0)]);
    assert.equal(siralanmis.length, 1);
    assert.equal(siralanmis[0].toplam, 20);
    assert.equal(siralanmis[0].hamOran, 25);
  });
});

describe("plan: planiHesapla — güven kotası (shrinkage)", () => {
  test("az veriyle %100 yanlış, çok veriyle %60 yanlışı geçemez", () => {
    // 4 soruda 4 yanlış (ham %100) şanssızlık olabilir; 60 soruda 36 yanlış
    // (ham %60) gerçek bir zayıflıktır ve önce önerilmelidir.
    const { siralanmis } = P.planiHesapla([quiz(A, 0, 4), quiz(B, 24, 36)]);
    assert.equal(siralanmis[0].key, `${DERS.slug}/${KONU_B.id}`);
    assert.equal(siralanmis[0].hamOran, 60);
    assert.equal(siralanmis[1].hamOran, 100);
    assert.ok(
      siralanmis[0].duzeltilmisOran > siralanmis[1].duzeltilmisOran,
      "düzeltilmiş oran çok veriyi öne almalı",
    );
  });

  test("düzeltilmiş oran ham orandan daha ölçülüdür", () => {
    const { siralanmis } = P.planiHesapla([quiz(A, 0, 4)]);
    assert.equal(siralanmis[0].hamOran, 100);
    assert.ok(
      siralanmis[0].duzeltilmisOran < 100,
      "1/1 tipi kayıtlar %100 zayıflık sayılmamalı",
    );
  });

  test("eşit düzeltilmiş oranda çok soru çözülen konu önce gelir", () => {
    // 5/10 ve 6/12 aynı orana yuvarlanır → daha güvenilir sinyal öne geçer.
    const { siralanmis } = P.planiHesapla([quiz(A, 5, 5), quiz(B, 6, 6)]);
    assert.equal(siralanmis[0].duzeltilmisOran, siralanmis[1].duzeltilmisOran);
    assert.equal(siralanmis[0].key, `${DERS.slug}/${KONU_B.id}`);
    assert.equal(siralanmis[0].toplam, 12);
  });

  test("güven yüzdesi kotaya (40 soru) göre hesaplanır", () => {
    assert.equal(P.planiHesapla([quiz(A, 15, 5)]).siralanmis[0].guven, 50);
    assert.equal(P.planiHesapla([quiz(A, 30, 10)]).siralanmis[0].guven, 100);
    assert.equal(
      P.planiHesapla([quiz(A, 70, 10)]).siralanmis[0].guven,
      100,
      "güven %100'ü aşmaz",
    );
    assert.equal(P.GUVEN_KOTASI, 40);
  });

  test("hiç veri yoksa genel oran başlangıç beklentisidir", () => {
    const { siralanmis, genelYanlisOrani, toplamSoru } = P.planiHesapla([]);
    assert.deepEqual(siralanmis, []);
    assert.equal(genelYanlisOrani, 30);
    assert.equal(toplamSoru, 0);
  });
});

describe("plan: getBugununPlani — yanlışsız öğrenci ve yedek öneri", () => {
  test("hiç yanlışı olmayan öğrenciye 'tekrar et' önerilmez", async () => {
    veri.quiz_results = [quiz(A, 12, 0), quiz(B, 20, 0)];

    const plan = await P.getBugununPlani();

    assert.equal(plan.onerilen, null, "yanlışsız konu tekrar adayı olmamalı");
    assert.deepEqual(plan.alternatifler, []);
    assert.equal(plan.yeniKullanici, false);
    assert.equal(plan.toplamSoru, 32);
    assert.ok(plan.yeniKonu, "kart boş kalmamalı: yedek öneri dönmeli");
  });

  test("yedek öneri, henüz dokunulmamış bir konudur", async () => {
    veri.quiz_results = [quiz(A, 12, 0)];

    const plan = await P.getBugununPlani();

    assert.ok(plan.yeniKonu);
    assert.notEqual(
      `${plan.yeniKonu.subjectSlug}/${plan.yeniKonu.topicId}`,
      `${DERS.slug}/${KONU_A.id}`,
      "dokunulmuş konu 'yeni konu' diye önerilmez",
    );
    assert.ok(plan.yeniKonu.topicName.length > 0);
    assert.equal(
      plan.yeniKonu.href,
      `/ders/${plan.yeniKonu.subjectSlug}/${plan.yeniKonu.topicId}`,
    );
  });

  test("her konuya dokunulmuş ve yanlışı yoksa EN AZ pratik yapılan konu önerilir", async () => {
    // Yedek önerinin ikinci katmanı: dokunulmamış konu kalmadıysa, bitmemiş
    // ve en az soru çözülmüş konu önerilir — "tekrar et" değil.
    const azCalisilan = DERSLER[1].topics[0];
    const satirlar: QuizSatiri[] = [];
    for (const s of DERSLER) {
      for (const t of s.topics) {
        const azMi = s.slug === DERSLER[1].slug && t.id === azCalisilan.id;
        satirlar.push(
          quiz({ subject: s.slug, topic: t.id }, azMi ? 1 : 10, 0),
        );
      }
    }
    veri.quiz_results = satirlar;

    const plan = await P.getBugununPlani();

    assert.equal(plan.onerilen, null);
    assert.ok(plan.yeniKonu, "hiç aday yokken bile bir öneri dönmeli");
    assert.equal(plan.yeniKonu.subjectSlug, DERSLER[1].slug);
    assert.equal(plan.yeniKonu.topicId, azCalisilan.id);
  });

  test("bitmiş konular yedek öneriye aday değildir", async () => {
    const azCalisilan = DERSLER[1].topics[0];
    const ikinciAz = DERSLER[1].topics[1];
    const satirlar: QuizSatiri[] = [];
    for (const s of DERSLER) {
      for (const t of s.topics) {
        let adet = 10;
        if (s.slug === DERSLER[1].slug && t.id === azCalisilan.id) adet = 1;
        if (s.slug === DERSLER[1].slug && t.id === ikinciAz.id) adet = 2;
        satirlar.push(quiz({ subject: s.slug, topic: t.id }, adet, 0));
      }
    }
    veri.quiz_results = satirlar;
    // En az çalışılan konu BİTMİŞ: sıradaki en az çalışılan önerilmeli.
    veri.topic_progress = [
      {
        subject_slug: DERSLER[1].slug,
        topic_id: azCalisilan.id,
        status: "done",
        updated_at: new Date(Date.now() - GUN_MS).toISOString(),
      },
    ];

    const plan = await P.getBugununPlani();

    assert.ok(plan.yeniKonu);
    assert.equal(plan.yeniKonu.topicId, ikinciAz.id);
  });
});

describe("plan: getBugununPlani — zayıf konu önerisi", () => {
  test("en zayıf konu önerilir, alternatifler en fazla iki tanedir", async () => {
    const konular = DERS.topics.slice(0, 4);
    assert.ok(konular.length >= 4, "test için en az 4 konu gerekiyor");
    veri.quiz_results = [
      quiz({ subject: DERS.slug, topic: konular[0].id }, 24, 36), // %60
      quiz({ subject: DERS.slug, topic: konular[1].id }, 30, 20), // %40
      quiz({ subject: DERS.slug, topic: konular[2].id }, 40, 10), // %20
      quiz({ subject: DERS.slug, topic: konular[3].id }, 45, 5), // %10
    ];

    const plan = await P.getBugununPlani();

    assert.ok(plan.onerilen);
    assert.equal(plan.onerilen.topicId, konular[0].id);
    assert.equal(plan.onerilen.hamOran, 60);
    assert.equal(plan.onerilen.topicName, konular[0].name);
    assert.equal(plan.onerilen.subjectName, DERS.name);
    assert.equal(plan.onerilen.href, `/ders/${DERS.slug}/${konular[0].id}`);
    assert.equal(plan.alternatifler.length, 2, "en fazla iki alternatif");
    assert.deepEqual(
      plan.alternatifler.map((k) => k.topicId),
      [konular[1].id, konular[2].id],
    );
  });

  test("içerikten kaldırılmış konu plana girmez", async () => {
    veri.quiz_results = [
      { subject_slug: DERS.slug, topic_id: "artik-olmayan-konu", correct_count: 2, wrong_count: 18 },
    ];

    const plan = await P.getBugununPlani();

    assert.equal(plan.onerilen, null, "adı bulunamayan konu önerilemez");
    assert.deepEqual(plan.alternatifler, []);
  });
});

describe("plan: getBugununPlani — bekleyen hata sayacı", () => {
  test("sayaç yalnız listede gösterilebilen, vadesi gelmiş kayıtları sayar", async () => {
    const havuz = collectAllQuestions({ kind: "karma-all" });
    const havuzId1 = havuz[0].id;
    const havuzId2 = havuz[1].id;
    const gecmis = new Date(Date.now() - GUN_MS).toISOString();
    const gelecek = new Date(Date.now() + GUN_MS).toISOString();

    veri.wrong_answers = [
      // Havuzda + vadesi gelmiş → SAYILIR
      { question_key: havuzId1, correct_streak: 0, next_due_at: gecmis, last_wrong_at: gecmis },
      // Havuzda ama vadesi gelmemiş → sayılmaz
      { question_key: havuzId2, correct_streak: 0, next_due_at: gelecek, last_wrong_at: gecmis },
      // Çıkmış soru yanlışı: /hatalarim listesinde asla görünmez → sayılmaz
      {
        question_key: "cikmis/2026-sozel/turkce#3",
        correct_streak: 0,
        next_due_at: gecmis,
        last_wrong_at: gecmis,
      },
      // İçerikten kaldırılmış soru → sayılmaz
      {
        question_key: `${DERS.slug}/artik-olmayan-konu#9`,
        correct_streak: 0,
        next_due_at: gecmis,
        last_wrong_at: gecmis,
      },
      // Ustalaşmış (silinmesi gecikmiş) kayıt → sayılmaz
      {
        question_key: havuz[2].id,
        correct_streak: 2,
        next_due_at: gecmis,
        last_wrong_at: gecmis,
      },
    ];

    const plan = await P.getBugununPlani();
    assert.equal(plan.bekleyenHata, 1);
  });

  test("next_due_at olmayan eski kayıt son yanlıştan 1 gün sonra vadelenir", async () => {
    const havuz = collectAllQuestions({ kind: "karma-all" });
    veri.wrong_answers = [
      {
        question_key: havuz[0].id,
        correct_streak: 0,
        next_due_at: null,
        last_wrong_at: new Date(Date.now() - 3 * GUN_MS).toISOString(),
      },
      {
        question_key: havuz[1].id,
        correct_streak: 0,
        next_due_at: null,
        last_wrong_at: new Date(Date.now() - 60 * 1000).toISOString(),
      },
    ];

    const plan = await P.getBugununPlani();
    assert.equal(plan.bekleyenHata, 1, "yeni yapılan yanlışın vadesi gelmedi");
  });
});

describe("plan: getBugununPlani — yeni kullanıcı ve kaldığın yer", () => {
  test("hiç verisi olmayan öğrenciye boş kart gösterilmez", async () => {
    const plan = await P.getBugununPlani();

    assert.equal(plan.yeniKullanici, true);
    assert.equal(plan.kaldiginYer, null, "yeni kullanıcıda 'kaldığın yer' olmaz");
    assert.equal(plan.onerilen, null);
    assert.equal(plan.bekleyenHata, 0);
    assert.ok(plan.yeniKonu, "yeni kullanıcıya ilk adım önerilir");
    assert.equal(plan.yeniKonu.subjectSlug, DERSLER[0].slug);
    assert.equal(plan.yeniKonu.topicId, DERSLER[0].topics[0].id);
  });

  test("yarım kalan (in_progress) konu 'kaldığın yer' olur", async () => {
    veri.quiz_results = [quiz(A, 10, 2)];
    veri.topic_progress = [
      {
        subject_slug: DERS.slug,
        topic_id: KONU_B.id,
        status: "in_progress",
        updated_at: new Date(Date.now() - 2 * GUN_MS).toISOString(),
      },
    ];

    const plan = await P.getBugununPlani();

    assert.ok(plan.kaldiginYer);
    assert.equal(plan.kaldiginYer.topicId, KONU_B.id);
    assert.equal(plan.kaldiginYer.topicName, KONU_B.name);
    assert.equal(plan.kaldiginYer.gunOnce, 2);
  });

  test("yarım kalan konu yoksa son ders oturumuna bakılır, __odak__ atlanır", async () => {
    veri.quiz_results = [quiz(A, 10, 2)];
    veri.study_sessions = [
      {
        subject_slug: "__odak__",
        studied_topics: [],
        started_at: new Date(Date.now() - 60 * 1000).toISOString(),
      },
      {
        subject_slug: DERS.slug,
        studied_topics: [KONU_B.id],
        started_at: new Date(Date.now() - GUN_MS).toISOString(),
      },
    ];

    const plan = await P.getBugununPlani();

    assert.ok(plan.kaldiginYer);
    assert.equal(plan.kaldiginYer.subjectSlug, DERS.slug);
    assert.equal(plan.kaldiginYer.topicId, KONU_B.id);
    assert.equal(plan.kaldiginYer.gunOnce, 1);
  });

  test("içerikten kaldırılmış konu 'kaldığın yer' olarak gösterilmez", async () => {
    veri.quiz_results = [quiz(A, 10, 2)];
    veri.topic_progress = [
      {
        subject_slug: DERS.slug,
        topic_id: "artik-olmayan-konu",
        status: "in_progress",
        updated_at: new Date(Date.now() - GUN_MS).toISOString(),
      },
    ];

    const plan = await P.getBugununPlani();
    assert.equal(plan.kaldiginYer, null);
  });
});
