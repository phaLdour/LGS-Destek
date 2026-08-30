/**
 * `src/lib/wrongAnswers.ts` + `src/lib/hataSayaci.ts`
 *
 * ENGELLENEN GEÇMİŞ HATALAR:
 *
 *  1. DİRİLTME. Ustalaşılan (üst üste 2 doğru) soru siliniyor, ama silme
 *     yalnız O CİHAZDA gerçekleşiyordu. Başka cihazın bayat localStorage'ı
 *     bir sonraki senkronda "uzakta yok, yerelde var" deyip kaydı Supabase'e
 *     geri yazıyor, soru yanlışlar listesine geri geliyordu. Çevrimdışıyken
 *     düşen silme istekleri de aynı sonucu veriyordu.
 *     → `birlestir` çapraz-cihaz senaryolarıyla test edilir: ustalaşan kayıt
 *       geri gelmemeli, ama öğrenci soruyu GERÇEKTEN yeniden yanlış yaparsa
 *       geri gelmeli.
 *  2. HAYALET SAYAÇ. Dashboard sayacı `wrong_answers` tablosundaki TÜM
 *     satırları sayıyordu; /hatalarim listesi ise yalnız hızlı soru havuzunda
 *     karşılığı olanları gösteriyordu. Çıkmış soru yanlışları (`cikmis/...`)
 *     ve ustalaşmış kayıtlar sayaçta durup listede görünmüyordu.
 *     → Sayaç ile listelenen kümenin AYNI kuraldan geçtiği doğrulanır.
 *
 * SAAT DİLİMİ: "bugün" filtresi `trBugunBaslangici()` üzerinden TR gün başını
 * kullanır; ilgili test uç saat dilimlerinde tekrarlanır. Diğer testler mutlak
 * epoch damgalarıyla çalışır, yerel saat dilimine hiç bakmaz.
 */
import { test, describe, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  USTALASMA_ESIGI,
  bekleyenHataSay,
  gosterilebilirHata,
  vadeZamani,
  type HataSatiri,
} from "@/lib/hataSayaci";
import { trBugunBaslangici } from "@/lib/zaman";
import type { Store, UzakHataSatiri } from "@/lib/wrongAnswers";

const GUN_MS = 24 * 60 * 60 * 1000;
const HAVUZ_ID = "turkce/fiilimsi#3";
const CIKMIS_ID = "cikmis/2026-sozel/turkce#3";

// ── Tarayıcı sahtesi ────────────────────────────────────────────────────
// wrongAnswers.ts modül düzeyinde localStorage'a dokunmasa da `read/write`
// `typeof window` kontrolü yapar; global'ler İTHALATTAN ÖNCE kurulmalıdır.

class SahteYerelDepo {
  private veri = new Map<string, string>();
  get length(): number {
    return this.veri.size;
  }
  clear(): void {
    this.veri.clear();
  }
  getItem(anahtar: string): string | null {
    return this.veri.get(anahtar) ?? null;
  }
  key(indeks: number): string | null {
    return [...this.veri.keys()][indeks] ?? null;
  }
  removeItem(anahtar: string): void {
    this.veri.delete(anahtar);
  }
  setItem(anahtar: string, deger: string): void {
    this.veri.set(anahtar, String(deger));
  }
}

const depo = new SahteYerelDepo();
const genel = globalThis as unknown as Record<string, unknown>;
genel.window = { localStorage: depo };
genel.localStorage = depo;

// Supabase yapılandırmasını kapat: hiçbir test ağ isteğine çıkmasın.
delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const HAVUZ_ANAHTARI = "rehberim:wrong-answers";
const MEZAR_ANAHTARI = "rehberim:wrong-mastered";

type YanlisModulu = typeof import("@/lib/wrongAnswers");
let Y!: YanlisModulu;

before(async () => {
  Y = await import("@/lib/wrongAnswers");
});

beforeEach(() => {
  depo.clear();
});

/** Yerel havuzu doğrudan okur (modülün dışa açmadığı iç durumu görmek için). */
function havuzuOku(): Store {
  const ham = depo.getItem(HAVUZ_ANAHTARI);
  return ham ? (JSON.parse(ham) as Store) : {};
}

function mezarligiOku(): Record<string, number> {
  const ham = depo.getItem(MEZAR_ANAHTARI);
  return ham ? (JSON.parse(ham) as Record<string, number>) : {};
}

function havuzuYaz(store: Store): void {
  depo.setItem(HAVUZ_ANAHTARI, JSON.stringify(store));
}

/** Kısa yoldan uzak (Supabase) satırı üretir. */
function uzakSatir(
  ustuneYaz: Partial<UzakHataSatiri> & { last_wrong_at: string },
): UzakHataSatiri {
  return {
    question_key: HAVUZ_ID,
    wrong_count: 1,
    correct_streak: 0,
    next_due_at: null,
    ...ustuneYaz,
  };
}

describe("yanlislar: birlestir — çapraz cihaz diriltme engeli", () => {
  test("başka cihazda ustalaşan soru, bu cihazın bayat kaydıyla dirilmez", () => {
    // A cihazı: soruyu ustalaştı → uzak satır correct_streak = 2 ile KALDI.
    // B cihazı: localStorage'ında eski (bayat) kayıt duruyor.
    const simdi = Date.parse("2026-08-29T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 2,
        correctStreak: 0,
        lastWrongAt: simdi - 5 * GUN_MS,
        nextDueAt: simdi - 4 * GUN_MS,
      },
    };
    const uzak = [
      uzakSatir({
        correct_streak: USTALASMA_ESIGI,
        last_wrong_at: new Date(simdi - 3 * GUN_MS).toISOString(),
      }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);

    assert.equal(sonuc.birlesik[HAVUZ_ID], undefined, "soru dirilmemeli");
    assert.deepEqual(sonuc.yeniMezarlar, [HAVUZ_ID]);
    assert.deepEqual(sonuc.pushEdilecek, [], "bayat kayıt geri yazılmamalı");
  });

  test("bu cihazda ustalaşan soru, uzaktaki bayat satırla geri gelmez", () => {
    // Silme isteği düşmüş olabilir: uzak satır hâlâ correct_streak = 0.
    // Yerel mezar taşı, o satırın bayat olduğunu bilir.
    const ustalasma = Date.parse("2026-08-29T09:00:00Z");
    const uzak = [
      uzakSatir({
        correct_streak: 0,
        last_wrong_at: new Date(ustalasma - 2 * GUN_MS).toISOString(),
      }),
    ];

    const sonuc = Y.birlestir({}, { [HAVUZ_ID]: ustalasma }, uzak);

    assert.equal(sonuc.birlesik[HAVUZ_ID], undefined);
    assert.equal(sonuc.uzaktaUstalasacak.length, 1, "uzakta işaretlenmeli");
    assert.equal(sonuc.uzaktaUstalasacak[0][0], HAVUZ_ID);
    assert.equal(
      sonuc.uzaktaUstalasacak[0][1].correctStreak,
      USTALASMA_ESIGI,
      "satır silinmez, 'ustalaşıldı' diye işaretlenir",
    );
    assert.deepEqual(sonuc.kalkacakMezarlar, [], "mezar taşı yerinde kalmalı");
  });

  test("ustalaşma anıyla AYNI damgalı uzak satır da bayattır", () => {
    // Sınır durumu: remoteTs <= mezarTs → diriltme yok.
    const ustalasma = Date.parse("2026-08-29T09:00:00Z");
    const uzak = [uzakSatir({ last_wrong_at: new Date(ustalasma).toISOString() })];

    const sonuc = Y.birlestir({}, { [HAVUZ_ID]: ustalasma }, uzak);

    assert.equal(sonuc.birlesik[HAVUZ_ID], undefined);
    assert.deepEqual(sonuc.kalkacakMezarlar, []);
  });

  test("öğrenci soruyu GERÇEKTEN yeniden yanlış yaparsa kayıt geri gelir", () => {
    // Mezar taşından SONRA yapılmış yeni bir yanlış → kayıt geçerlidir.
    const ustalasma = Date.parse("2026-08-25T09:00:00Z");
    const yeniYanlis = Date.parse("2026-08-28T20:00:00Z");
    const uzak = [
      uzakSatir({
        wrong_count: 3,
        correct_streak: 0,
        last_wrong_at: new Date(yeniYanlis).toISOString(),
        next_due_at: new Date(yeniYanlis + GUN_MS).toISOString(),
      }),
    ];

    const sonuc = Y.birlestir({}, { [HAVUZ_ID]: ustalasma }, uzak);

    const kayit = sonuc.birlesik[HAVUZ_ID];
    assert.ok(kayit, "yeniden yanlış yapılan soru listeye dönmeli");
    assert.equal(kayit.wrongCount, 3);
    assert.equal(kayit.correctStreak, 0);
    assert.equal(kayit.lastWrongAt, yeniYanlis);
    assert.equal(kayit.nextDueAt, yeniYanlis + GUN_MS);
    assert.deepEqual(sonuc.kalkacakMezarlar, [HAVUZ_ID], "mezar taşı kalkmalı");
    assert.deepEqual(sonuc.uzaktaUstalasacak, []);
  });

  test("ustalaşmış yerel kayıt uzağa push EDİLMEZ", () => {
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 4,
        correctStreak: USTALASMA_ESIGI,
        lastWrongAt: Date.parse("2026-08-20T09:00:00Z"),
      },
    };
    const sonuc = Y.birlestir(yerel, {}, []);
    assert.deepEqual(sonuc.pushEdilecek, []);
  });

  test("mezarlıktaki anahtar uzağa push EDİLMEZ", () => {
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: Date.parse("2026-08-20T09:00:00Z"),
      },
    };
    const sonuc = Y.birlestir(
      yerel,
      { [HAVUZ_ID]: Date.parse("2026-08-21T09:00:00Z") },
      [],
    );
    assert.deepEqual(
      sonuc.pushEdilecek,
      [],
      "bilerek silinmiş kayıt Supabase'e geri yazılmamalı",
    );
  });

  test("uzakta ustalaşmış görünen kayıt, bu cihazda da bir daha push edilmez", () => {
    // ENGEL 2 sonrası anahtar aktif mezarlara eklenir; aynı çağrıdaki push
    // listesi de bunu dikkate almalıdır.
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: Date.parse("2026-08-20T09:00:00Z"),
      },
      "matematik/oran#1": {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: Date.parse("2026-08-26T09:00:00Z"),
      },
    };
    const uzak = [
      uzakSatir({
        correct_streak: USTALASMA_ESIGI,
        last_wrong_at: "2026-08-22T09:00:00.000Z",
      }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);

    assert.deepEqual(sonuc.yeniMezarlar, [HAVUZ_ID]);
    assert.deepEqual(
      sonuc.pushEdilecek.map(([k]) => k),
      ["matematik/oran#1"],
      "yalnız gerçekten yeni olan kayıt push edilir",
    );
  });
});

describe("yanlislar: birlestir — çatışma çözümü", () => {
  test("uzak kayıt daha yeniyse yerel güncellenir", () => {
    const eski = Date.parse("2026-08-20T09:00:00Z");
    const yeni = Date.parse("2026-08-27T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: { wrongCount: 1, correctStreak: 0, lastWrongAt: eski },
    };
    const uzak = [
      uzakSatir({ wrong_count: 5, last_wrong_at: new Date(yeni).toISOString() }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);
    assert.equal(sonuc.birlesik[HAVUZ_ID].wrongCount, 5);
    assert.equal(sonuc.birlesik[HAVUZ_ID].lastWrongAt, yeni);
  });

  test("yerel kayıt daha yeniyse korunur", () => {
    const eski = Date.parse("2026-08-20T09:00:00Z");
    const yeni = Date.parse("2026-08-27T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: { wrongCount: 9, correctStreak: 0, lastWrongAt: yeni },
    };
    const uzak = [
      uzakSatir({ wrong_count: 1, last_wrong_at: new Date(eski).toISOString() }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);
    assert.equal(sonuc.birlesik[HAVUZ_ID].wrongCount, 9);
    assert.equal(sonuc.birlesik[HAVUZ_ID].lastWrongAt, yeni);
  });

  test("yerelde daha ileri doğru serisi varsa uzak satır onu geri almaz", () => {
    // Henüz senkronlanmamış doğru cevap geri alınırsa, doğru cevaplanan soru
    // yanlışlar listesinden düşmüyordu.
    const an = Date.parse("2026-08-27T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 2,
        correctStreak: 1,
        lastWrongAt: an,
        nextDueAt: an + 3 * GUN_MS,
      },
    };
    const uzak = [
      uzakSatir({
        wrong_count: 2,
        correct_streak: 0,
        last_wrong_at: new Date(an).toISOString(),
        next_due_at: new Date(an + GUN_MS).toISOString(),
      }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);
    assert.equal(sonuc.birlesik[HAVUZ_ID].correctStreak, 1);
    assert.equal(
      sonuc.birlesik[HAVUZ_ID].nextDueAt,
      an + 3 * GUN_MS,
      "yerel vadesi korunmalı",
    );
  });

  test("uzak satırda next_due_at yoksa vade son yanlıştan 1 gün sonradır", () => {
    const an = Date.parse("2026-08-27T09:00:00Z");
    const sonuc = Y.birlestir({}, {}, [
      uzakSatir({ last_wrong_at: new Date(an).toISOString(), next_due_at: null }),
    ]);
    assert.equal(sonuc.birlesik[HAVUZ_ID].nextDueAt, an + GUN_MS);
  });

  test("yalnız yerelde olan taze kayıt push edilir", () => {
    const yerel: Store = {
      [HAVUZ_ID]: {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: Date.parse("2026-08-27T09:00:00Z"),
      },
    };
    const sonuc = Y.birlestir(yerel, {}, []);
    assert.deepEqual(
      sonuc.pushEdilecek.map(([k]) => k),
      [HAVUZ_ID],
    );
  });

  test("uzakta zaten olan kayıt tekrar push edilmez", () => {
    const an = Date.parse("2026-08-27T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: { wrongCount: 1, correctStreak: 0, lastWrongAt: an },
    };
    const sonuc = Y.birlestir(yerel, {}, [
      uzakSatir({ last_wrong_at: new Date(an).toISOString() }),
    ]);
    assert.deepEqual(sonuc.pushEdilecek, []);
  });

  test("senkronlanmamış YENİ yanlış, uzak 'ustalaşıldı' işaretine rağmen korunur", () => {
    // VERİ KAYBI REGRESYONU. Öğrenci daha önce ustalaştığı soruyu gerçekten
    // yeniden yanlış yaptı (yerel kayıt TAZE, mezar taşı kalktı) ama sunucuya
    // yazma sessizce düştü (çevrimdışı / oturum kopması) — uzak satır hâlâ
    // streak = 2 diyor. Eskiden ENGEL 2 zaman damgasına BAKMADIĞI için taze
    // yerel kayıt hem siliniyor hem yeniden mezara konuyordu; öğrencinin
    // gerçekten yanlış yaptığı soru listeye bir daha hiç dönmüyordu.
    const uzakUstalasma = Date.parse("2026-08-20T09:00:00Z");
    const yeniYanlis = Date.parse("2026-08-28T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: { wrongCount: 3, correctStreak: 0, lastWrongAt: yeniYanlis },
    };
    const uzak = [
      uzakSatir({
        correct_streak: USTALASMA_ESIGI,
        last_wrong_at: new Date(uzakUstalasma).toISOString(),
      }),
    ];

    const sonuc = Y.birlestir(yerel, {}, uzak);
    const kayit = sonuc.birlesik[HAVUZ_ID];
    assert.ok(kayit, "yeni yanlış silinmemeli");
    assert.equal(kayit.correctStreak, 0, "ustalaşma sıfırlanmalı");
    assert.equal(kayit.lastWrongAt, yeniYanlis, "taze damga korunmalı");
    assert.deepEqual(
      sonuc.yeniMezarlar,
      [],
      "gerçek yeni yanlışa mezar taşı konmamalı",
    );
  });

  test("uzak 'ustalaşıldı' işareti, BAYAT yerel kaydı yine de siler", () => {
    // Karşı taraf: yerel kayıt uzak ustalaşmadan ESKİYSE, bu gerçek bir yeni
    // yanlış değil, başka cihazın bayat kopyasıdır — silinmeye devam etmeli.
    const uzakUstalasma = Date.parse("2026-08-28T09:00:00Z");
    const bayatYerel = Date.parse("2026-08-20T09:00:00Z");
    const yerel: Store = {
      [HAVUZ_ID]: { wrongCount: 3, correctStreak: 0, lastWrongAt: bayatYerel },
    };
    const sonuc = Y.birlestir(yerel, {}, [
      uzakSatir({
        correct_streak: USTALASMA_ESIGI,
        last_wrong_at: new Date(uzakUstalasma).toISOString(),
      }),
    ]);
    assert.equal(sonuc.birlesik[HAVUZ_ID], undefined, "bayat kopya dirilmemeli");
    assert.deepEqual(sonuc.yeniMezarlar, [HAVUZ_ID]);
  });
});

describe("yanlislar: yerel havuz akışı (saveWrong / markCorrect)", () => {
  test("yanlış cevap havuza girer, vadesi 1 gün sonradır", () => {
    Y.saveWrong(HAVUZ_ID);

    assert.ok(Y.getWrongIds("all").has(HAVUZ_ID));
    assert.equal(Y.getWrongCount("all"), 1);
    assert.ok(
      !Y.getWrongIds("due").has(HAVUZ_ID),
      "yeni yanlışın vadesi hemen gelmez",
    );
    assert.ok(Y.getWrongIds("today").has(HAVUZ_ID));

    const kayit = havuzuOku()[HAVUZ_ID];
    assert.equal(kayit.wrongCount, 1);
    assert.equal(kayit.correctStreak, 0);
    assert.equal(kayit.nextDueAt, kayit.lastWrongAt + GUN_MS);
  });

  test("aynı soru tekrar yanlış yapılırsa sayaç artar, doğru serisi sıfırlanır", () => {
    Y.saveWrong(HAVUZ_ID);
    Y.markCorrect(HAVUZ_ID);
    assert.equal(havuzuOku()[HAVUZ_ID].correctStreak, 1);

    Y.saveWrong(HAVUZ_ID);
    const kayit = havuzuOku()[HAVUZ_ID];
    assert.equal(kayit.wrongCount, 2);
    assert.equal(kayit.correctStreak, 0);
  });

  test("bir doğru cevap kaydı silmez, vadeyi 3 gün ileri iter", () => {
    Y.saveWrong(HAVUZ_ID);
    Y.markCorrect(HAVUZ_ID);

    const kayit = havuzuOku()[HAVUZ_ID];
    assert.equal(kayit.correctStreak, 1);
    assert.ok(Y.getWrongIds("all").has(HAVUZ_ID), "henüz ustalaşılmadı");
    assert.ok((kayit.nextDueAt ?? 0) - Date.now() > 2 * GUN_MS);
  });

  test("üst üste 2 doğru: kayıt havuzdan çıkar ve mezar taşı konur", () => {
    Y.saveWrong(HAVUZ_ID);
    for (let i = 0; i < USTALASMA_ESIGI; i += 1) Y.markCorrect(HAVUZ_ID);

    assert.equal(havuzuOku()[HAVUZ_ID], undefined);
    assert.equal(Y.getWrongCount("all"), 0);
    assert.ok(
      mezarligiOku()[HAVUZ_ID] !== undefined,
      "'bilerek silindi' bilgisi saklanmalı",
    );
  });

  test("havuzda olmayan soru için markCorrect bir şey yapmaz", () => {
    Y.markCorrect("hic-yanlis-yapilmadi#0");
    assert.deepEqual(havuzuOku(), {});
    assert.deepEqual(mezarligiOku(), {});
  });

  test("ustalaşmış kayıt depoda kalsa bile hiçbir filtrede görünmez", () => {
    // Silme çevrimdışıyken düşmüş olabilir; öğrenciye "hâlâ yanlışın" denmez.
    havuzuYaz({
      [HAVUZ_ID]: {
        wrongCount: 3,
        correctStreak: USTALASMA_ESIGI,
        lastWrongAt: Date.now() - GUN_MS,
        nextDueAt: Date.now() - GUN_MS,
      },
    });
    assert.equal(Y.getWrongCount("all"), 0);
    assert.equal(Y.getWrongCount("due"), 0);
    assert.equal(Y.getWrongCount("today"), 0);
  });

  test("clearWrongPool hem havuzu hem mezarlığı sıfırlar", () => {
    Y.saveWrong(HAVUZ_ID);
    for (let i = 0; i < USTALASMA_ESIGI; i += 1) Y.markCorrect(HAVUZ_ID);
    assert.notDeepEqual(mezarligiOku(), {});

    Y.clearWrongPool();
    assert.deepEqual(havuzuOku(), {});
    assert.deepEqual(mezarligiOku(), {});
  });

  test("'bugün' filtresi TR gün başını kullanır (her saat diliminde aynı)", () => {
    const eskiTz = process.env.TZ;
    try {
      for (const tz of ["UTC", "America/New_York", "Pacific/Kiritimati"]) {
        process.env.TZ = tz;
        depo.clear();
        const trGunBasi = trBugunBaslangici().getTime();
        havuzuYaz({
          "bugun/soru#1": {
            wrongCount: 1,
            correctStreak: 0,
            lastWrongAt: trGunBasi, // TR gece yarısı → bugün
            nextDueAt: trGunBasi + GUN_MS,
          },
          "dun/soru#1": {
            wrongCount: 1,
            correctStreak: 0,
            lastWrongAt: trGunBasi - 1, // TR gece yarısından 1 ms önce → dün
            nextDueAt: trGunBasi,
          },
        });

        const bugunkuler = Y.getWrongIds("today");
        assert.deepEqual([...bugunkuler], ["bugun/soru#1"], `saat dilimi: ${tz}`);
        assert.equal(Y.getWrongCount("all"), 2, `saat dilimi: ${tz}`);
      }
    } finally {
      if (eskiTz === undefined) delete process.env.TZ;
      else process.env.TZ = eskiTz;
    }
  });

  test("'vadesi gelmiş' filtresi nextDueAt'e bakar", () => {
    const simdi = Date.now();
    havuzuYaz({
      "vadesi/geldi#1": {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: simdi - 3 * GUN_MS,
        nextDueAt: simdi - 1000,
      },
      "vadesi/gelmedi#1": {
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: simdi - 1000,
        nextDueAt: simdi + GUN_MS,
      },
      "eski/kayit#1": {
        // nextDueAt yok: lastWrongAt + 1 gün varsayılır → vadesi geçmiş.
        wrongCount: 1,
        correctStreak: 0,
        lastWrongAt: simdi - 5 * GUN_MS,
      },
    });

    assert.deepEqual(
      [...Y.getWrongIds("due")].sort(),
      ["eski/kayit#1", "vadesi/geldi#1"],
    );
  });
});

describe("yanlislar: uçtan uca ustalaşma → senkron", () => {
  test("ustalaşılan soru, bayat uzak satırla senkronda dirilmez", () => {
    Y.saveWrong(HAVUZ_ID);
    const yanlisAni = havuzuOku()[HAVUZ_ID].lastWrongAt;
    for (let i = 0; i < USTALASMA_ESIGI; i += 1) Y.markCorrect(HAVUZ_ID);

    // Başka cihazın (ya da düşmüş silme isteğinin) bıraktığı bayat satır.
    const sonuc = Y.birlestir(havuzuOku(), mezarligiOku(), [
      uzakSatir({
        correct_streak: 0,
        last_wrong_at: new Date(yanlisAni).toISOString(),
      }),
    ]);

    assert.equal(sonuc.birlesik[HAVUZ_ID], undefined, "soru geri gelmemeli");
    assert.equal(sonuc.uzaktaUstalasacak.length, 1);
  });

  test("ustalaştıktan sonra yeniden yanlış yapılırsa mezar taşı kalkar ve kayıt yaşar", () => {
    Y.saveWrong(HAVUZ_ID);
    for (let i = 0; i < USTALASMA_ESIGI; i += 1) Y.markCorrect(HAVUZ_ID);
    assert.ok(mezarligiOku()[HAVUZ_ID] !== undefined);

    // Öğrenci soruyu GERÇEKTEN yeniden yanlış yaptı.
    Y.saveWrong(HAVUZ_ID);
    assert.equal(
      mezarligiOku()[HAVUZ_ID],
      undefined,
      "yeniden yanlış yapılınca mezar taşı kalkmalı",
    );
    assert.ok(Y.getWrongIds("all").has(HAVUZ_ID));

    // Senkron da kaydı silmemeli.
    const sonuc = Y.birlestir(havuzuOku(), mezarligiOku(), []);
    assert.ok(sonuc.birlesik[HAVUZ_ID], "kayıt birleşimde yaşamalı");
    assert.deepEqual(
      sonuc.pushEdilecek.map(([k]) => k),
      [HAVUZ_ID],
      "yeni yanlış uzağa taşınmalı",
    );
  });
});

describe("hataSayaci: sayaç ile liste aynı kuraldan geçer", () => {
  function satir(ustuneYaz: Partial<HataSatiri> & { question_key: string }): HataSatiri {
    return {
      correct_streak: 0,
      next_due_at: null,
      last_wrong_at: "2026-08-20T09:00:00.000Z",
      ...ustuneYaz,
    };
  }

  test("vadeZamani: next_due_at varsa o, yoksa son yanlış + 1 gün", () => {
    assert.equal(
      vadeZamani(
        satir({
          question_key: HAVUZ_ID,
          next_due_at: "2026-08-25T09:00:00.000Z",
        }),
      ),
      Date.parse("2026-08-25T09:00:00.000Z"),
    );
    assert.equal(
      vadeZamani(satir({ question_key: HAVUZ_ID, next_due_at: null })),
      Date.parse("2026-08-20T09:00:00.000Z") + GUN_MS,
    );
  });

  test("ustalaşmış kayıt gösterilemez", () => {
    assert.equal(
      gosterilebilirHata(
        satir({ question_key: HAVUZ_ID, correct_streak: USTALASMA_ESIGI }),
      ),
      false,
    );
    assert.equal(
      gosterilebilirHata(satir({ question_key: HAVUZ_ID, correct_streak: 1 })),
      true,
    );
    assert.equal(
      gosterilebilirHata(satir({ question_key: HAVUZ_ID, correct_streak: null })),
      true,
      "correct_streak yoksa 0 sayılır",
    );
  });

  test("havuzda karşılığı olmayan kayıt (çıkmış soru) gösterilemez", () => {
    const havuz = new Set([HAVUZ_ID]);
    assert.equal(
      gosterilebilirHata(satir({ question_key: CIKMIS_ID }), havuz),
      false,
    );
    assert.equal(
      gosterilebilirHata(satir({ question_key: HAVUZ_ID }), havuz),
      true,
    );
    assert.equal(
      gosterilebilirHata(satir({ question_key: CIKMIS_ID })),
      true,
      "havuz verilmezse bu kontrol atlanır",
    );
  });

  test("sayaç, listede gösterilemeyen kayıtları saymaz (hayalet sayaç)", () => {
    const simdi = Date.parse("2026-08-29T09:00:00Z");
    const gecmis = new Date(simdi - 2 * GUN_MS).toISOString();
    const havuz = new Set([HAVUZ_ID, "matematik/oran#1"]);

    const satirlar: HataSatiri[] = [
      // 1) Havuzda, vadesi gelmiş → SAYILIR
      satir({ question_key: HAVUZ_ID, next_due_at: gecmis }),
      // 2) Havuzda ama vadesi gelmemiş → sayılmaz
      satir({
        question_key: "matematik/oran#1",
        next_due_at: new Date(simdi + GUN_MS).toISOString(),
      }),
      // 3) Çıkmış soru yanlışı: listede asla görünmez → sayılmaz
      satir({ question_key: CIKMIS_ID, next_due_at: gecmis }),
      // 4) İçerikten kaldırılmış soru → sayılmaz
      satir({ question_key: "turkce/kaldirilan-konu#7", next_due_at: gecmis }),
      // 5) Ustalaşmış ama silinmesi gecikmiş kayıt → sayılmaz
      satir({
        question_key: HAVUZ_ID,
        correct_streak: USTALASMA_ESIGI,
        next_due_at: gecmis,
      }),
    ];

    const sayi = bekleyenHataSay(satirlar, havuz, simdi);
    assert.equal(sayi, 1);

    // ASIL KURAL: sayaç ile listelenen küme birebir aynı olmalı.
    const listelenen = satirlar.filter(
      (s) => gosterilebilirHata(s, havuz) && vadeZamani(s) <= simdi,
    );
    assert.equal(sayi, listelenen.length);
  });

  test("havuz verilmezse sayaç yalnız ustalaşmışları eler", () => {
    const simdi = Date.parse("2026-08-29T09:00:00Z");
    const gecmis = new Date(simdi - GUN_MS).toISOString();
    const satirlar: HataSatiri[] = [
      satir({ question_key: HAVUZ_ID, next_due_at: gecmis }),
      satir({ question_key: CIKMIS_ID, next_due_at: gecmis }),
      satir({
        question_key: "x/y#1",
        correct_streak: USTALASMA_ESIGI,
        next_due_at: gecmis,
      }),
    ];
    assert.equal(bekleyenHataSay(satirlar, undefined, simdi), 2);
  });

  test("ustalaşma eşiği istemci ve sunucu sayacında ortaktır", () => {
    assert.equal(USTALASMA_ESIGI, 2);

    // wrongAnswers.ts aynı sabiti kullanır: tam eşik kadar doğru gerekir.
    depo.clear();
    Y.saveWrong(HAVUZ_ID);
    for (let i = 0; i < USTALASMA_ESIGI - 1; i += 1) Y.markCorrect(HAVUZ_ID);
    assert.ok(
      Y.getWrongIds("all").has(HAVUZ_ID),
      "eşiğin altında kayıt havuzda kalır",
    );
    Y.markCorrect(HAVUZ_ID);
    assert.ok(!Y.getWrongIds("all").has(HAVUZ_ID), "eşikte kayıt düşer");
  });
});
