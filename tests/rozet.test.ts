/**
 * `src/lib/badges.ts` — rozet tanımları ve değerlendirici.
 *
 * İKİ AYRI KURAL TEST EDİLİR:
 *
 *  1. `evaluateBadges` ANLIK bir fotoğraftır: o andaki metriklere göre hak
 *     edilen rozetleri döner. Eşikleri buradan kilitliyoruz.
 *  2. ROZETLER GERİ ALINMAZ. Kalıcılık `evaluateBadges` içinde değil,
 *     çağıranda (src/components/badges/BadgeShowcase.tsx) çözülür:
 *     `user_badges` tablosu kalıcı kayıttır ve ekranda gösterilen küme
 *     `kalıcı kayıtlar ∪ şu an hak edilenler` birleşimidir — küme yalnız
 *     büyür. Eskiden doğrudan `evaluateBadges` sonucu gösteriliyordu; seri
 *     kırılınca "Haftalık Seri" sönüyor, 60 günlük pencerenin dışına düşen
 *     çalışma yüzünden "Çalışkan Baykuş" kayboluyordu. Aşağıda hem anlık
 *     fotoğrafın rozeti düşürdüğü, hem birleşim kuralının onu koruduğu
 *     doğrulanır.
 *
 * Saat dilimi: bu dosyada tarih hesabı yoktur, `evaluateBadges` saf sayısal
 * bir fonksiyondur — sonuç hiçbir saat diliminden etkilenmez.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { BADGES, evaluateBadges, type BadgeEvalInput } from "@/lib/badges";
import { getAllSubjects } from "@/content";

/** Hiçbir rozeti hak etmeyen taban giriş. */
function bosGiris(): BadgeEvalInput {
  return {
    totalMinutes: 0,
    completedTopics: 0,
    streakDays: 0,
    questionsAnswered: 0,
    maxDailyMinutes: 0,
    hasPerfectQuiz: false,
    bestExamNet: 0,
    sozlukSoruSayisi: 0,
    topicsDonePerSubject: {},
    totalTopicsPerSubject: {},
    odakToplamSn: 0,
    odakEnUzunSn: 0,
    pomodoroToplamSn: 0,
    compMatches: 0,
    compWins: 0,
    compBestStreak: 0,
    compBestTier: 0,
    compTrophies: 0,
    compSeasonWins: 0,
  };
}

function giris(uzerineYaz: Partial<BadgeEvalInput>): BadgeEvalInput {
  return { ...bosGiris(), ...uzerineYaz };
}

/**
 * Ekranda gösterilen küme — BadgeShowcase'teki kalıcılık kuralının modeli.
 * (bkz. BadgeShowcase.tsx: `new Set([...ownedKeys, ...suAnKazanilan])`)
 */
function gorunenRozetler(
  kaliciKayitlar: Iterable<string>,
  suAnKazanilan: Set<string>,
): Set<string> {
  return new Set<string>([...kaliciKayitlar, ...suAnKazanilan]);
}

describe("rozet: tanımların bütünlüğü", () => {
  test("rozet anahtarları benzersizdir", () => {
    const anahtarlar = BADGES.map((b) => b.key);
    assert.equal(new Set(anahtarlar).size, anahtarlar.length);
  });

  test("her rozetin emoji, ad, açıklama ve grubu doludur", () => {
    for (const b of BADGES) {
      assert.ok(b.key.length > 0, `boş anahtar: ${JSON.stringify(b)}`);
      assert.ok(b.emoji.length > 0, `${b.key}: emoji yok`);
      assert.ok(b.name.length > 0, `${b.key}: ad yok`);
      assert.ok(b.description.length > 0, `${b.key}: açıklama yok`);
      assert.ok(b.group.length > 0, `${b.key}: grup yok`);
    }
  });

  test("evaluateBadges tanımsız bir rozet anahtarı üretmez", () => {
    const tanimli = new Set(BADGES.map((b) => b.key));
    const kazanilan = evaluateBadges(enIyiGiris());
    for (const k of kazanilan) {
      assert.ok(tanimli.has(k), `BADGES'te tanımı olmayan rozet: ${k}`);
    }
  });

  test("her tanımlı rozet gerçekten kazanılabilir (ulaşılamaz rozet yok)", () => {
    const kazanilan = evaluateBadges(enIyiGiris());
    const kazanilamayan = BADGES.filter((b) => !kazanilan.has(b.key)).map(
      (b) => b.key,
    );
    assert.deepEqual(kazanilamayan, []);
    assert.equal(kazanilan.size, BADGES.length);
  });
});

/** Her eşiği aşan "her şeyi başarmış öğrenci" girdisi. */
function enIyiGiris(): BadgeEvalInput {
  const dersler = getAllSubjects();
  const toplamKonu: Record<string, number> = {};
  const bitenKonu: Record<string, number> = {};
  for (const s of dersler) {
    toplamKonu[s.slug] = s.topics.length;
    bitenKonu[s.slug] = s.topics.length;
  }
  return giris({
    totalMinutes: 100000,
    completedTopics: 100,
    streakDays: 365,
    questionsAnswered: 5000,
    maxDailyMinutes: 300,
    hasPerfectQuiz: true,
    bestExamNet: 90,
    sozlukSoruSayisi: 500,
    topicsDonePerSubject: bitenKonu,
    totalTopicsPerSubject: toplamKonu,
    odakToplamSn: 100 * 3600,
    odakEnUzunSn: 3 * 3600,
    pomodoroToplamSn: 10 * 3600,
    compMatches: 50,
    compWins: 30,
    compBestStreak: 10,
    compBestTier: 12,
    compTrophies: 3,
    compSeasonWins: 2,
  });
}

describe("rozet: seri eşikleri", () => {
  test("2 gün seri hiçbir seri rozeti vermez", () => {
    const k = evaluateBadges(giris({ streakDays: 2 }));
    assert.ok(!k.has("seri-3"));
    assert.ok(!k.has("seri-7"));
    assert.ok(!k.has("seri-30"));
  });

  test("3 / 7 / 30 gün eşikleri tam sınırda açılır", () => {
    assert.ok(evaluateBadges(giris({ streakDays: 3 })).has("seri-3"));
    assert.ok(!evaluateBadges(giris({ streakDays: 6 })).has("seri-7"));
    assert.ok(evaluateBadges(giris({ streakDays: 7 })).has("seri-7"));
    assert.ok(!evaluateBadges(giris({ streakDays: 29 })).has("seri-30"));
    assert.ok(evaluateBadges(giris({ streakDays: 30 })).has("seri-30"));
  });

  test("uzun seri alttaki seri rozetlerini de kapsar", () => {
    const k = evaluateBadges(giris({ streakDays: 40 }));
    assert.deepEqual(
      [...k].sort(),
      ["seri-3", "seri-30", "seri-7"],
    );
  });
});

describe("rozet: soru, süre ve sınav eşikleri", () => {
  test("100 ve 1000 soru eşikleri", () => {
    assert.ok(!evaluateBadges(giris({ questionsAnswered: 99 })).has("yuzbasi"));
    assert.ok(evaluateBadges(giris({ questionsAnswered: 100 })).has("yuzbasi"));
    assert.ok(
      !evaluateBadges(giris({ questionsAnswered: 999 })).has("bin-soru"),
    );
    const bin = evaluateBadges(giris({ questionsAnswered: 1000 }));
    assert.ok(bin.has("bin-soru"));
    assert.ok(bin.has("yuzbasi"), "1000 soru çözen 100'ü de geçmiştir");
  });

  test("kelime avcısı yalnız sözlük sorularını sayar", () => {
    // Genel soru sayısı yüksek ama sözlük sorusu yoksa rozet gelmez.
    assert.ok(
      !evaluateBadges(giris({ questionsAnswered: 5000 })).has("kelime-avcisi"),
    );
    assert.ok(
      evaluateBadges(giris({ sozlukSoruSayisi: 100 })).has("kelime-avcisi"),
    );
    assert.ok(
      !evaluateBadges(giris({ sozlukSoruSayisi: 99 })).has("kelime-avcisi"),
    );
  });

  test("çalışkan baykuş 10 saat (600 dk), yüksek hız bir günde 60 dk", () => {
    assert.ok(
      !evaluateBadges(giris({ totalMinutes: 599 })).has("calıskan-baykus"),
    );
    assert.ok(
      evaluateBadges(giris({ totalMinutes: 600 })).has("calıskan-baykus"),
    );
    assert.ok(
      !evaluateBadges(giris({ maxDailyMinutes: 59 })).has("yuksek-hiz"),
    );
    assert.ok(evaluateBadges(giris({ maxDailyMinutes: 60 })).has("yuksek-hiz"));
  });

  test("ilk adım ilk biten konuyla gelir", () => {
    assert.ok(!evaluateBadges(giris({ completedTopics: 0 })).has("ilk-adim"));
    assert.ok(evaluateBadges(giris({ completedTopics: 1 })).has("ilk-adim"));
  });

  test("hassas atış ve deneme fatihi (80 net)", () => {
    assert.ok(evaluateBadges(giris({ hasPerfectQuiz: true })).has("hassas-atis"));
    assert.ok(!evaluateBadges(giris({ bestExamNet: 79.9 })).has("deneme-fatihi"));
    assert.ok(evaluateBadges(giris({ bestExamNet: 80 })).has("deneme-fatihi"));
  });
});

describe("rozet: ders ustaları", () => {
  test("konu sayısı bilinmiyorsa (total = 0) rozet verilmez", () => {
    // 0 * 2 >= 0 tuzağı: içerik yüklenemediğinde herkese rozet dağıtılmamalı.
    const k = evaluateBadges(
      giris({
        topicsDonePerSubject: { turkce: 5 },
        totalTopicsPerSubject: {},
      }),
    );
    assert.ok(!k.has("turkce-ustasi"));
  });

  test("konuların tam yarısı bitince açılır, altında açılmaz", () => {
    const yarimAltinda = evaluateBadges(
      giris({
        topicsDonePerSubject: { turkce: 7 },
        totalTopicsPerSubject: { turkce: 15 },
      }),
    );
    assert.ok(!yarimAltinda.has("turkce-ustasi"), "7/15 yeterli değil");

    const yarimUstunde = evaluateBadges(
      giris({
        topicsDonePerSubject: { turkce: 8 },
        totalTopicsPerSubject: { turkce: 15 },
      }),
    );
    assert.ok(yarimUstunde.has("turkce-ustasi"), "8/15 yeterli");

    const tamYari = evaluateBadges(
      giris({
        topicsDonePerSubject: { matematik: 5 },
        totalTopicsPerSubject: { matematik: 10 },
      }),
    );
    assert.ok(tamYari.has("matematik-ustasi"), "5/10 tam yarıdır");
  });

  test("rozetlerdeki ders slug'ları gerçek içerikle eşleşir", () => {
    // Bu test, içerikte bir ders slug'ı değişirse (ör. "fen-bilimleri" →
    // "fen") ders ustası rozetlerinin sessizce ölü kalmasını engeller.
    const dersler = getAllSubjects();
    const biten: Record<string, number> = {};
    const toplam: Record<string, number> = {};
    for (const s of dersler) {
      toplam[s.slug] = s.topics.length;
      biten[s.slug] = Math.ceil(s.topics.length / 2);
    }
    const kazanilan = evaluateBadges(
      giris({ topicsDonePerSubject: biten, totalTopicsPerSubject: toplam }),
    );
    const dersRozetleri = BADGES.filter((b) => b.group === "ders").map(
      (b) => b.key,
    );
    assert.equal(dersRozetleri.length, dersler.length);
    for (const anahtar of dersRozetleri) {
      assert.ok(
        kazanilan.has(anahtar),
        `${anahtar}: içerikteki ders slug'ı ile eşleşmiyor olabilir`,
      );
    }
  });
});

describe("rozet: odak modu ve rekabet eşikleri", () => {
  test("odak eşikleri (10 dk / 50 dk / 25 dk pomodoro / 10 saat)", () => {
    assert.ok(!evaluateBadges(giris({ odakEnUzunSn: 599 })).has("ilk-odak"));
    assert.ok(evaluateBadges(giris({ odakEnUzunSn: 600 })).has("ilk-odak"));
    assert.ok(!evaluateBadges(giris({ odakEnUzunSn: 2999 })).has("derin-odak"));
    assert.ok(evaluateBadges(giris({ odakEnUzunSn: 3000 })).has("derin-odak"));
    assert.ok(
      !evaluateBadges(giris({ pomodoroToplamSn: 1499 })).has("pomodoro-cirak"),
    );
    assert.ok(
      evaluateBadges(giris({ pomodoroToplamSn: 1500 })).has("pomodoro-cirak"),
    );
    assert.ok(
      !evaluateBadges(giris({ odakToplamSn: 10 * 3600 - 1 })).has("odak-ustasi"),
    );
    assert.ok(
      evaluateBadges(giris({ odakToplamSn: 10 * 3600 })).has("odak-ustasi"),
    );
  });

  test("toplam odak süresi tek başına 'derin odak' vermez (en uzun oturuma bakar)", () => {
    const k = evaluateBadges(giris({ odakToplamSn: 20 * 3600, odakEnUzunSn: 300 }));
    assert.ok(k.has("odak-ustasi"));
    assert.ok(!k.has("derin-odak"));
    assert.ok(!k.has("ilk-odak"), "5 dakikalık oturum ilk odak sayılmaz");
  });

  test("rekabet eşikleri ve lig kademeleri", () => {
    assert.ok(evaluateBadges(giris({ compMatches: 1 })).has("ilk-duello"));
    assert.ok(!evaluateBadges(giris({ compMatches: 9 })).has("duellocu"));
    assert.ok(evaluateBadges(giris({ compMatches: 10 })).has("duellocu"));
    assert.ok(evaluateBadges(giris({ compWins: 1 })).has("ilk-zafer"));
    assert.ok(!evaluateBadges(giris({ compBestStreak: 4 })).has("yenilmez"));
    assert.ok(evaluateBadges(giris({ compBestStreak: 5 })).has("yenilmez"));

    assert.ok(!evaluateBadges(giris({ compBestTier: 3 })).has("yildiz-ligi"));
    const yildiz = evaluateBadges(giris({ compBestTier: 4 }));
    assert.ok(yildiz.has("yildiz-ligi"));
    assert.ok(!yildiz.has("sampiyon-ligi"));
    const sampiyon = evaluateBadges(giris({ compBestTier: 8 }));
    assert.ok(sampiyon.has("sampiyon-ligi"));
    assert.ok(
      sampiyon.has("yildiz-ligi"),
      "şampiyon kademesine çıkan yıldızlar nişanını da taşır",
    );

    assert.ok(evaluateBadges(giris({ compTrophies: 1 })).has("kupa-sahibi"));
    assert.ok(evaluateBadges(giris({ compSeasonWins: 1 })).has("sezon-sampiyonu"));
  });
});

describe("rozet: kalıcılık (rozet geri alınmaz)", () => {
  test("anlık değerlendirme, seri kırılınca rozeti kümeden düşürür", () => {
    // `evaluateBadges` bir FOTOĞRAFTIR; kalıcılık onun işi değildir.
    const seriliyken = evaluateBadges(giris({ streakDays: 10 }));
    assert.ok(seriliyken.has("seri-7"));

    const seriKirildi = evaluateBadges(giris({ streakDays: 0 }));
    assert.ok(!seriKirildi.has("seri-7"));
    assert.ok(!seriKirildi.has("seri-3"));
  });

  test("kalıcı kayıtla birleşince seri rozeti korunur", () => {
    const kalici = new Set<string>();

    // 1. gün: 7 günlük seri → rozet kazanıldı ve kalıcı olarak yazıldı.
    const gun1 = evaluateBadges(giris({ streakDays: 7 }));
    for (const k of gun1) kalici.add(k);
    assert.ok(gorunenRozetler(kalici, gun1).has("seri-7"));

    // 2. gün: öğrenci bir gün çalışmadı, seri sıfırlandı.
    const gun2 = evaluateBadges(giris({ streakDays: 0 }));
    const gorunen = gorunenRozetler(kalici, gun2);
    assert.ok(
      gorunen.has("seri-7"),
      "seri kırıldı diye daha önce hak edilmiş rozet sönmemeli",
    );
  });

  test("60 günlük pencerenin dışına düşen çalışma da rozeti düşürmez", () => {
    // "Çalışkan Baykuş" 60 günlük pencereden hesaplanır; eski oturumlar
    // pencereden çıkınca anlık metrik düşer ama rozet kalıcıdır.
    const oncekiHesap = evaluateBadges(giris({ totalMinutes: 700 }));
    assert.ok(oncekiHesap.has("calıskan-baykus"));

    const kalici = new Set<string>(oncekiHesap);
    const yeniHesap = evaluateBadges(giris({ totalMinutes: 120 }));
    assert.ok(!yeniHesap.has("calıskan-baykus"), "anlık metrik düştü");
    assert.ok(gorunenRozetler(kalici, yeniHesap).has("calıskan-baykus"));
  });

  test("gösterilen küme yalnızca büyür (hiçbir adımda küçülmez)", () => {
    const adimlar: Partial<BadgeEvalInput>[] = [
      { completedTopics: 1 },
      { completedTopics: 1, streakDays: 7, questionsAnswered: 150 },
      { completedTopics: 1, streakDays: 0, questionsAnswered: 150 }, // seri koptu
      { completedTopics: 0, streakDays: 0, questionsAnswered: 0 }, // veri kayboldu
    ];

    const kalici = new Set<string>();
    let oncekiBoyut = 0;
    for (const adim of adimlar) {
      const suAn = evaluateBadges(giris(adim));
      const gorunen = gorunenRozetler(kalici, suAn);
      assert.ok(
        gorunen.size >= oncekiBoyut,
        `rozet sayısı küçüldü: ${oncekiBoyut} → ${gorunen.size}`,
      );
      oncekiBoyut = gorunen.size;
      for (const k of suAn) kalici.add(k);
    }
    assert.ok(gorunenRozetler(kalici, new Set<string>()).has("seri-7"));
    assert.ok(gorunenRozetler(kalici, new Set<string>()).has("yuzbasi"));
    assert.ok(gorunenRozetler(kalici, new Set<string>()).has("ilk-adim"));
  });

  test("sayaç yalnız HÂLÂ TANIMLI rozetleri sayar (toplamı aşamaz)", () => {
    // Tablodan kaldırılmamış eski bir anahtar "31 / 30" gibi imkânsız bir
    // sayı üretmemeli (BadgeShowcase'teki earnedCount kuralı).
    const kalici = ["ilk-adim", "artik-olmayan-eski-rozet"];
    const gorunen = gorunenRozetler(kalici, evaluateBadges(bosGiris()));
    const sayilan = BADGES.filter((b) => gorunen.has(b.key)).length;
    assert.equal(sayilan, 1);
    assert.ok(sayilan <= BADGES.length);
  });
});
