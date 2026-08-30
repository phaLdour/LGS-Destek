/**
 * `src/lib/zaman.ts` — Türkiye günü yardımcıları.
 *
 * Buradaki testler İKİ geçmiş hatanın geri gelmesini engeller:
 *
 *  1. GÜN SINIRI UTC'YE GÖREYDİ. Vercel sunucuları UTC çalışır; TR saatiyle
 *     29 Ağustos 02:00'de çalışan öğrencinin oturumu UTC'de hâlâ 28 Ağustos'a
 *     yazılıyordu. Gece 00:00-03:00 arasında çalışan öğrencinin çalışması bir
 *     ÖNCEKİ güne düşüyor, serisi kopuyordu.
 *  2. 60 GÜNLÜK PENCERE "60 gün önce şu anki saat" idi. En eski gün yarım
 *     kalıyor (o günün erken saatlerindeki çalışma sorgudan düşüyor), sınır da
 *     sunucunun UTC gününe kayıyordu.
 *
 * SAAT DİLİMİ BAĞIMSIZLIĞI: bütün damgalar açık UTC ("...Z") yazılır ve her
 * iddia `herSaatDiliminde` ile UTC'den +14'e kadar uç saat dilimlerinde ayrı
 * ayrı çalıştırılır. Test makinesinin/CI'ın saat dilimi sonucu değiştiremez.
 */
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  trBugunBaslangici,
  trGunAnahtari,
  trGunBasiOnce,
  trGunGeri,
  trHaftaninGunu,
  trPencereBaslangici,
} from "@/lib/zaman";

/** Türkiye tüm yıl UTC+3 (2016'dan beri yaz saati yok). */
const TR_OFSET_MS = 3 * 60 * 60 * 1000;
const GUN_MS = 24 * 60 * 60 * 1000;

/**
 * Uç saat dilimleri: UTC-11'den UTC+14'e. Yardımcılar yalnız `getUTC*`
 * kullandığı için hepsinde AYNI sonucu vermek zorundadır.
 */
const SAAT_DILIMLERI = [
  "UTC",
  "Europe/Istanbul",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Kolkata", // yarım saatlik ofset
  "Pacific/Kiritimati", // UTC+14
  "Pacific/Niue", // UTC-11
];

/** Aynı iddiayı her saat diliminde çalıştırır; sonunda dilimi geri alır. */
function herSaatDiliminde(iddia: (saatDilimi: string) => void): void {
  const eski = process.env.TZ;
  try {
    for (const tz of SAAT_DILIMLERI) {
      process.env.TZ = tz;
      iddia(tz);
    }
  } finally {
    if (eski === undefined) delete process.env.TZ;
    else process.env.TZ = eski;
  }
}

/** Bir anın TR gece yarısına denk gelip gelmediği (saat/dakika/saniye 00). */
function trGeceYarisiMi(d: Date): boolean {
  return (d.getTime() + TR_OFSET_MS) % GUN_MS === 0;
}

describe("zaman: TR gün sınırı (gece 00:00-03:00 hatası)", () => {
  test("TR saatiyle 02:00'de çalışan öğrenci O GÜNE yazılır, bir öncekine değil", () => {
    // 2026-08-28T23:00:00Z = Türkiye'de 29 Ağustos 02:00.
    const gece = new Date("2026-08-28T23:00:00Z");

    herSaatDiliminde((tz) => {
      // Anahtar `getUTCMonth()` (0 tabanlı) kullanır: Ağustos = 7.
      assert.equal(trGunAnahtari(gece), "2026-7-29", `saat dilimi: ${tz}`);
    });

    // Eski (hatalı) davranışın kanıtı: ham UTC günü hâlâ 28'dir.
    assert.equal(gece.getUTCDate(), 28);
  });

  test("gün sınırının iki yanı: 20:59:59.999Z hâlâ dün, 21:00:00.000Z artık bugün", () => {
    const sonAn = new Date("2026-08-28T20:59:59.999Z"); // TR 28 Ağustos 23:59:59.999
    const ilkAn = new Date("2026-08-28T21:00:00.000Z"); // TR 29 Ağustos 00:00:00.000

    herSaatDiliminde((tz) => {
      assert.equal(trGunAnahtari(sonAn), "2026-7-28", `saat dilimi: ${tz}`);
      assert.equal(trGunAnahtari(ilkAn), "2026-7-29", `saat dilimi: ${tz}`);
    });
  });

  test("TR gününün son milisaniyesi hâlâ aynı gündür", () => {
    const gunSonu = new Date("2026-08-29T20:59:59.999Z"); // TR 29 Ağustos 23:59:59.999
    herSaatDiliminde((tz) => {
      assert.equal(trGunAnahtari(gunSonu), "2026-7-29", `saat dilimi: ${tz}`);
    });
  });

  test("gün anahtarı ay ve yıl sınırında da TR gününü verir", () => {
    // TR 1 Ocak 2027 01:00 → UTC'de hâlâ 31 Aralık 2026 22:00.
    const yilbasi = new Date("2026-12-31T22:00:00Z");
    // TR 1 Eylül 2026 00:30 → UTC'de 31 Ağustos 21:30.
    const ayBasi = new Date("2026-08-31T21:30:00Z");

    herSaatDiliminde((tz) => {
      assert.equal(trGunAnahtari(yilbasi), "2027-0-1", `saat dilimi: ${tz}`);
      assert.equal(trGunAnahtari(ayBasi), "2026-8-1", `saat dilimi: ${tz}`);
    });
    assert.equal(yilbasi.getUTCFullYear(), 2026); // eski hatalı sonuç
  });

  test("haftanın günü de TR gününe göredir (gece yarısından sonra bir sonraki gün)", () => {
    const gece = new Date("2026-08-28T23:00:00Z"); // TR: Cumartesi 29 Ağustos
    herSaatDiliminde((tz) => {
      assert.equal(trHaftaninGunu(gece), 6, `saat dilimi: ${tz}`); // 6 = Cumartesi
    });
    assert.equal(gece.getUTCDay(), 5); // eski hatalı sonuç: Cuma
  });
});

describe("zaman: trBugunBaslangici", () => {
  const TR_29_AGUSTOS_BASI = new Date("2026-08-28T21:00:00.000Z");

  test("TR 29 Ağustos içindeki her an aynı gün başını verir", () => {
    const anlar = [
      new Date("2026-08-28T21:00:00.000Z"), // TR 00:00
      new Date("2026-08-28T23:00:00.000Z"), // TR 02:00 (kritik saat)
      new Date("2026-08-29T09:00:00.000Z"), // TR 12:00
      new Date("2026-08-29T20:59:59.999Z"), // TR 23:59:59.999
    ];

    herSaatDiliminde((tz) => {
      for (const an of anlar) {
        assert.equal(
          trBugunBaslangici(an).getTime(),
          TR_29_AGUSTOS_BASI.getTime(),
          `saat dilimi: ${tz}, an: ${an.toISOString()}`,
        );
      }
    });
  });

  test("sonuç her zaman tam TR gece yarısıdır (48 saatlik tarama)", () => {
    herSaatDiliminde((tz) => {
      const baslangic = Date.parse("2026-08-28T00:00:00Z");
      for (let saat = 0; saat < 48; saat += 1) {
        const an = new Date(baslangic + saat * 60 * 60 * 1000);
        const gunBasi = trBugunBaslangici(an);
        assert.ok(
          trGeceYarisiMi(gunBasi),
          `TR gece yarısı değil (${tz}, ${an.toISOString()} → ${gunBasi.toISOString()})`,
        );
        // Gün başı verilen andan sonra olamaz ve 24 saatten geride kalamaz.
        assert.ok(gunBasi.getTime() <= an.getTime());
        assert.ok(an.getTime() - gunBasi.getTime() < GUN_MS);
      }
    });
  });

  test("gün başı ile gün anahtarı aynı günü işaret eder", () => {
    herSaatDiliminde((tz) => {
      const an = new Date("2026-08-28T23:30:00Z"); // TR 29 Ağustos 02:30
      assert.equal(
        trGunAnahtari(trBugunBaslangici(an)),
        trGunAnahtari(an),
        `saat dilimi: ${tz}`,
      );
    });
  });
});

describe("zaman: trGunGeri ve trGunBasiOnce", () => {
  test("trGunGeri tam 24 saat geri gider", () => {
    const an = new Date("2026-08-28T23:00:00Z");
    herSaatDiliminde((tz) => {
      assert.equal(
        trGunGeri(an, 1).getTime(),
        an.getTime() - GUN_MS,
        `saat dilimi: ${tz}`,
      );
      assert.equal(trGunGeri(an, 0).getTime(), an.getTime());
      assert.equal(trGunGeri(an, 7).getTime(), an.getTime() - 7 * GUN_MS);
    });
  });

  test("trGunBasiOnce N gün önceki TR gün başını verir", () => {
    const an = new Date("2026-08-28T23:00:00Z"); // TR 29 Ağustos 02:00
    herSaatDiliminde((tz) => {
      assert.equal(
        trGunBasiOnce(0, an).toISOString(),
        "2026-08-28T21:00:00.000Z",
        `saat dilimi: ${tz}`,
      );
      assert.equal(
        trGunBasiOnce(1, an).toISOString(),
        "2026-08-27T21:00:00.000Z",
      );
      // 29 Ağustos - 29 gün = 31 Temmuz (TR gün başı).
      assert.equal(
        trGunBasiOnce(29, an).toISOString(),
        "2026-07-30T21:00:00.000Z",
      );
      assert.ok(trGeceYarisiMi(trGunBasiOnce(29, an)));
    });
  });
});

describe("zaman: istatistik penceresi (yarım gün hatası)", () => {
  // TR 29 Ağustos 02:00 — pencerenin "şu anki saate" kaymadığını gösterir.
  const simdi = new Date("2026-08-28T23:00:00Z");

  test("60 günlük pencere tam TR gün başında başlar, 'şu anki saatte' değil", () => {
    herSaatDiliminde((tz) => {
      const baslangic = trPencereBaslangici(60, simdi);
      assert.ok(
        trGeceYarisiMi(baslangic),
        `pencere TR gece yarısında başlamıyor (${tz})`,
      );
      // Bugün (29 Ağustos) dahil 60 tam TR günü → 1 Temmuz 00:00 TR.
      assert.equal(baslangic.toISOString(), "2026-06-30T21:00:00.000Z");
    });
  });

  test("eski hatalı hesap (setDate(-60)) ile aynı sonucu VERMEZ", () => {
    // Eski kod: `const d = new Date(); d.setDate(d.getDate() - 60)`
    // → "60 gün önce şu anki saat"; en eski günü yarım bırakıyordu.
    const eskiHatali = new Date(simdi.getTime() - 60 * GUN_MS);
    const yeni = trPencereBaslangici(60, simdi);

    assert.notEqual(yeni.getTime(), eskiHatali.getTime());
    assert.ok(!trGeceYarisiMi(eskiHatali), "eski hesap gün ortasında başlıyordu");
    // Yeni pencere, en eski günün TAMAMINI kapsar: o günün 00:05'i içeride.
    const enEskiGunErkenSaat = new Date(yeni.getTime() + 5 * 60 * 1000);
    assert.ok(enEskiGunErkenSaat.getTime() >= yeni.getTime());
  });

  test("pencere tam olarak istenen sayıda TR gününü kapsar (bugün dahil)", () => {
    herSaatDiliminde((tz) => {
      for (const gunSayisi of [7, 30, 60, 180]) {
        const baslangic = trPencereBaslangici(gunSayisi, simdi);
        // Gün anahtarlarını sayarak doğrula.
        const anahtarlar = new Set<string>();
        for (
          let t = baslangic.getTime();
          t <= simdi.getTime();
          t += 60 * 60 * 1000
        ) {
          anahtarlar.add(trGunAnahtari(new Date(t)));
        }
        assert.equal(
          anahtarlar.size,
          gunSayisi,
          `${gunSayisi} günlük pencere ${anahtarlar.size} gün kapsıyor (${tz})`,
        );
      }
    });
  });

  test("pencere başlangıcı günün saatine bağlı değildir", () => {
    // Aynı TR gününün iki farklı saati aynı pencereyi vermeli.
    const gece = new Date("2026-08-28T23:00:00Z"); // TR 02:00
    const aksam = new Date("2026-08-29T20:00:00Z"); // TR 23:00
    herSaatDiliminde((tz) => {
      assert.equal(
        trPencereBaslangici(60, gece).getTime(),
        trPencereBaslangici(60, aksam).getTime(),
        `saat dilimi: ${tz}`,
      );
    });
  });

  test("1 ve 0 günlük pencere bugünün TR gün başıdır", () => {
    herSaatDiliminde((tz) => {
      const bugun = trBugunBaslangici(simdi).getTime();
      assert.equal(trPencereBaslangici(1, simdi).getTime(), bugun, tz);
      assert.equal(trPencereBaslangici(0, simdi).getTime(), bugun, tz);
      // Negatif değer ileriye kaymaz (Math.max(0, ...)).
      assert.equal(trPencereBaslangici(-5, simdi).getTime(), bugun, tz);
    });
  });
});
