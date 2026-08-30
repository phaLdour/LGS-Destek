/**
 * Rekabetçi mod — lig/kademe (tier) ve puan mantığı testleri.
 * Kaynak: src/lib/competitive/ranks.ts
 *
 * Kurallar (kodun kendi dokümantasyonundan):
 *  - Kademe 0-9; her kademe 0-99 puan tutar.
 *  - 100 puana ulaşan bir üst kademeye terfi eder (puan 100 düşülür).
 *  - Şampiyonlar 1 (kademe 9) tavandır; orada puan birikmeye devam eder.
 *  - Puan 0'ın altına düşerse bir alt kademeye inilir, ama "düşme limiti"
 *    vardır: çıkılan ligin tabanının altına düşülemez; taban kademede puan
 *    0'ın altına inemez.
 *
 * Testler tamamen saf fonksiyon üzerinde; zaman/ortam bağımlılığı yok.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  LEAGUES,
  LEAGUE_COUNT,
  TIERS_PER_LEAGUE,
  POINTS_PER_TIER,
  MAX_TIER,
  DEFAULT_NEW_USER_TIER,
  leagueOf,
  divisionOf,
  rankLabel,
  leagueFloor,
  applyDelta,
  seasonReset,
} from "@/lib/competitive/ranks";

type Durum = { tier: number; points: number; highestTierReached: number };

/* ═══════════════ A) Katalog bütünlüğü ═══════════════ */

test("lig kataloğu 0-9 kademesini boşluksuz kaplar", () => {
  assert.equal(LEAGUE_COUNT, 5);
  assert.equal(TIERS_PER_LEAGUE, 2);
  assert.equal(POINTS_PER_TIER, 100);
  assert.equal(MAX_TIER, 9);
  assert.equal(LEAGUES.length, LEAGUE_COUNT);

  let beklenenTaban = 0;
  for (const lig of LEAGUES) {
    assert.equal(lig.floor, beklenenTaban, `${lig.slug} tabanı kaymış`);
    assert.equal(lig.ceiling, lig.floor + TIERS_PER_LEAGUE - 1);
    assert.ok(lig.name.length > 0);
    // Renk anahtarlarının hiçbiri boş bırakılmamalı (yeni lig eklenirse yakalar)
    for (const [ad, deger] of Object.entries(lig.color)) {
      assert.equal(typeof deger, "string", `${lig.slug}.${ad}`);
      assert.ok(deger.length > 0, `${lig.slug}.${ad} boş`);
    }
    beklenenTaban += TIERS_PER_LEAGUE;
  }
  assert.equal(beklenenTaban - 1, MAX_TIER, "son lig MAX_TIER'a ulaşmalı");

  const slugKumesi = new Set(LEAGUES.map((l) => l.slug));
  assert.equal(slugKumesi.size, LEAGUES.length, "slug tekrarı var");
});

test("yeni kullanıcı kademesi geçerli aralıkta", () => {
  assert.ok(DEFAULT_NEW_USER_TIER >= 0 && DEFAULT_NEW_USER_TIER <= MAX_TIER);
  assert.equal(rankLabel(DEFAULT_NEW_USER_TIER), "Yükselme 2");
});

test("leagueOf / divisionOf / rankLabel her kademede doğru", () => {
  const beklenen = [
    "Gelişim 2",
    "Gelişim 1",
    "Yükselme 2",
    "Yükselme 1",
    "Yıldızlar 2",
    "Yıldızlar 1",
    "Derece 2",
    "Derece 1",
    "Şampiyonlar 2",
    "Şampiyonlar 1",
  ];
  for (let tier = 0; tier <= MAX_TIER; tier++) {
    assert.equal(rankLabel(tier), beklenen[tier], `kademe ${tier}`);
    const lig = leagueOf(tier);
    assert.ok(tier >= lig.floor && tier <= lig.ceiling);
    assert.equal(divisionOf(tier), tier % 2 === 0 ? 2 : 1);
    assert.equal(leagueFloor(tier), lig.floor);
    // Bir lige çıkıldıktan sonraki düşme tabanı hep çift sayıdır.
    assert.equal(leagueFloor(tier) % 2, 0);
  }
});

test("aralık dışı kademelerde leagueOf uçlara kenetlenir", () => {
  assert.equal(leagueOf(-3).slug, "gelisim");
  assert.equal(leagueOf(0).slug, "gelisim");
  assert.equal(leagueOf(MAX_TIER).slug, "sampiyonlar");
  assert.equal(leagueOf(99).slug, "sampiyonlar");
  assert.equal(leagueFloor(-3), 0);
  assert.equal(leagueFloor(99), 8);
});

/* ═══════════════ B) Terfi (100 puan sınırı) ═══════════════ */

test("99 puana +1: aynı kademede kalır mı, terfi mi?", () => {
  // 99 → hâlâ aynı kademe
  assert.deepEqual(applyDelta({ tier: 2, points: 98, highestTierReached: 2 }, 1), {
    tier: 2,
    points: 99,
    highestTierReached: 2,
  });
  // 100'e ULAŞINCA terfi; artan puan yeni kademeye taşınır
  assert.deepEqual(applyDelta({ tier: 2, points: 99, highestTierReached: 2 }, 1), {
    tier: 3,
    points: 0,
    highestTierReached: 3,
  });
  assert.deepEqual(applyDelta({ tier: 2, points: 99, highestTierReached: 2 }, 6), {
    tier: 3,
    points: 5,
    highestTierReached: 3,
  });
});

test("tek hamlede birden fazla kademe atlanabilir", () => {
  assert.deepEqual(applyDelta({ tier: 0, points: 0, highestTierReached: 0 }, 250), {
    tier: 2,
    points: 50,
    highestTierReached: 2,
  });
});

test("terfi highestTierReached'i yükseltir, düşüş yükseltmez", () => {
  const terfi = applyDelta({ tier: 4, points: 90, highestTierReached: 4 }, 20);
  assert.deepEqual(terfi, { tier: 5, points: 10, highestTierReached: 5 });

  const dusus = applyDelta({ tier: 5, points: 10, highestTierReached: 5 }, -20);
  assert.equal(dusus.highestTierReached, 5, "en yüksek kademe hafızada kalır");
  assert.equal(dusus.tier, 4);
  assert.equal(dusus.points, 90);
});

test("Şampiyonlar 1 tavanında puan birikir, kademe artmaz", () => {
  const a = applyDelta({ tier: MAX_TIER, points: 50, highestTierReached: MAX_TIER }, 100);
  assert.deepEqual(a, { tier: MAX_TIER, points: 150, highestTierReached: MAX_TIER });

  // Tavana terfi ederken artan puan da korunur (overflow leaderboard'a yansır)
  const b = applyDelta({ tier: 8, points: 0, highestTierReached: 8 }, 250);
  assert.deepEqual(b, { tier: MAX_TIER, points: 150, highestTierReached: MAX_TIER });

  // Tavanın altındaki hiçbir kademede puan 99'u geçemez
  const c = applyDelta({ tier: 8, points: 0, highestTierReached: 9 }, 99);
  assert.ok(c.points <= POINTS_PER_TIER - 1);
});

/* ═══════════════ C) Düşüş, taban kademe koruması, 0 altı ═══════════════ */

test("puan 0'ın altına inince bir alt kademeye düşülür", () => {
  // Yükselme 1 (3) → Yükselme 2 (2): lig tabanı 2, düşüş serbest
  assert.deepEqual(applyDelta({ tier: 3, points: 10, highestTierReached: 3 }, -20), {
    tier: 2,
    points: 90,
    highestTierReached: 3,
  });
});

test("lig tabanında puan 0'ın altına DÜŞEMEZ", () => {
  const s = applyDelta({ tier: 2, points: 5, highestTierReached: 2 }, -50);
  assert.deepEqual(s, { tier: 2, points: 0, highestTierReached: 2 });

  // Sıfır puanda bir kayıp daha: yine 0, yine aynı kademe
  assert.deepEqual(applyDelta(s, -999), { tier: 2, points: 0, highestTierReached: 2 });
});

test("düşme limiti: çıkılan ligin tabanının altına inilemez", () => {
  // Yıldızlar'a çıkmış (highest 4) bir öğrenci Yükselme'ye geri düşemez.
  const s = applyDelta({ tier: 4, points: 0, highestTierReached: 4 }, -1);
  assert.deepEqual(s, { tier: 4, points: 0, highestTierReached: 4 });

  // Yıldızlar 1'den (5) düşüş yalnız Yıldızlar 2'ye (4) kadar gider.
  const t = applyDelta({ tier: 5, points: 0, highestTierReached: 5 }, -500);
  assert.deepEqual(t, { tier: 4, points: 0, highestTierReached: 5 });

  // Şampiyonlar tabanı (8): oradan aşağı yok.
  const u = applyDelta({ tier: 8, points: 0, highestTierReached: 8 }, -300);
  assert.deepEqual(u, { tier: 8, points: 0, highestTierReached: 8 });
});

test("çok kademeli düşüş tabanda durur", () => {
  // Derece 1 (7), 150 puan kaybı: 7 → 6 (Derece tabanı), kalan eksi puan silinir.
  assert.deepEqual(applyDelta({ tier: 7, points: 0, highestTierReached: 7 }, -150), {
    tier: 6,
    points: 0,
    highestTierReached: 7,
  });
});

test("en alt kademede (Gelişim 2) hiçbir kayıp aşağı indiremez", () => {
  assert.deepEqual(applyDelta({ tier: 0, points: 0, highestTierReached: 0 }, -1000), {
    tier: 0,
    points: 0,
    highestTierReached: 0,
  });
});

test("delta 0 durumu bozmaz", () => {
  const s: Durum = { tier: 6, points: 42, highestTierReached: 7 };
  assert.deepEqual(applyDelta(s, 0), s);
});

test("applyDelta girdiyi değiştirmez (saf fonksiyon)", () => {
  const s: Durum = { tier: 3, points: 95, highestTierReached: 3 };
  const kopya: Durum = { ...s };
  applyDelta(s, 50);
  assert.deepEqual(s, kopya);
});

/* ═══════════════ D) Değişmezler — deterministik rastgele yürüyüş ═══════════════ */

/** Sabit tohumlu üretici: test her çalıştırmada AYNI diziyi üretir. */
function tohumluUretici(tohum: number): () => number {
  let a = tohum >>> 0;
  return () => {
    a = (Math.imul(a, 1664525) + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

test("uzun maç dizisinde değişmezler bozulmaz", () => {
  const rast = tohumluUretici(20260830);
  let s: Durum = {
    tier: DEFAULT_NEW_USER_TIER,
    points: 50,
    highestTierReached: DEFAULT_NEW_USER_TIER,
  };

  for (let i = 0; i < 5000; i++) {
    const delta = Math.round(rast() * 160) - 60; // -60 … +100
    const onceki = s;
    s = applyDelta(s, delta);

    assert.ok(Number.isInteger(s.tier), `kademe tam sayı değil (adım ${i})`);
    assert.ok(s.tier >= 0 && s.tier <= MAX_TIER, `kademe aralık dışı (adım ${i})`);
    assert.ok(s.points >= 0, `puan negatif (adım ${i})`);
    if (s.tier < MAX_TIER) {
      assert.ok(
        s.points <= POINTS_PER_TIER - 1,
        `tavan altı kademede puan 99'u aştı (adım ${i})`,
      );
    }
    assert.ok(
      s.highestTierReached >= onceki.highestTierReached,
      `en yüksek kademe geriledi (adım ${i})`,
    );
    assert.ok(s.highestTierReached >= s.tier, `highest < tier (adım ${i})`);
    assert.ok(
      s.tier >= leagueFloor(s.highestTierReached),
      `düşme limiti delindi (adım ${i})`,
    );
  }
});

/* ═══════════════ E) Sezon sıfırlaması ═══════════════ */

test("sezon sıfırlaması 2 kademe indirir, yeni kullanıcı tabanının altına inmez", () => {
  assert.deepEqual(seasonReset(MAX_TIER), {
    tier: 7,
    points: 50,
    highestTierReached: 7,
  });
  assert.deepEqual(seasonReset(4), { tier: 2, points: 50, highestTierReached: 2 });
  // Taban koruması: 3 - 2 = 1 olurdu, ama DEFAULT_NEW_USER_TIER'ın altına inilmez
  assert.deepEqual(seasonReset(3), {
    tier: DEFAULT_NEW_USER_TIER,
    points: 50,
    highestTierReached: DEFAULT_NEW_USER_TIER,
  });
  assert.deepEqual(seasonReset(0), {
    tier: DEFAULT_NEW_USER_TIER,
    points: 50,
    highestTierReached: DEFAULT_NEW_USER_TIER,
  });
});

test("sezon sıfırlaması her kademede geçerli bir durum üretir", () => {
  for (let tier = 0; tier <= MAX_TIER; tier++) {
    const s = seasonReset(tier);
    assert.ok(s.tier >= DEFAULT_NEW_USER_TIER && s.tier <= MAX_TIER, `kademe ${tier}`);
    assert.equal(s.points, 50);
    assert.equal(s.highestTierReached, s.tier, "yeni sezon temiz başlar");
    // Sıfırlama kademeyi yükseltmez; tek istisna yeni kullanıcı tabanıdır
    // (DEFAULT_NEW_USER_TIER altındaki kademeler oraya çekilir).
    assert.ok(
      s.tier <= Math.max(tier, DEFAULT_NEW_USER_TIER),
      `kademe ${tier} sıfırlamada yükseldi`,
    );
  }
});

// GEÇMİŞ HATA: `leagueOf` kademeyi 0-9 aralığına kenetliyordu ama
// `divisionOf` kenetlemiyordu. Veritabanından bozuk/eski bir tier gelirse
// ikisi ayrışıyor ve öğrenciye var olmayan bir rütbe adı gösteriliyordu
// (rankLabel(10) → "Şampiyonlar 2"). Bu isimler doğrudan ekrana basılıyor:
// RankCard, MatchResult, TrophyShelf, LeagueBadge.
test("aralık dışı kademe: üst sınırın üstü en yüksek gerçek rütbeyi gösterir", () => {
  assert.equal(rankLabel(10), rankLabel(MAX_TIER));
  assert.equal(rankLabel(99), rankLabel(MAX_TIER));
  assert.equal(divisionOf(10), divisionOf(MAX_TIER));
});

test("aralık dışı kademe: negatif değer en düşük gerçek rütbeyi gösterir", () => {
  assert.equal(rankLabel(-1), rankLabel(0));
  assert.equal(rankLabel(-50), rankLabel(0));
  assert.equal(divisionOf(-1), divisionOf(0));
});

test("divisionOf her girdide 1 veya 2 döner", () => {
  for (const t of [-99, -1, 0, 3, 9, 10, 1000]) {
    assert.ok([1, 2].includes(divisionOf(t)), `tier ${t} için geçersiz kademe`);
  }
});
