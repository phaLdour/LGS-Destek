/**
 * Odak Modu — sayaç motoru testleri (src/lib/odak.ts).
 *
 * Buradaki testlerin çoğu GERÇEKTEN YAŞANMIŞ hataların geri gelmesini
 * engellemek için var:
 *  1) Açık unutulan sayaç "40 saatlik oturum" yazıyordu → 6 saatlik üst sınır.
 *  2) Yeni sayaç başlatılınca önceki oturum kayıtsız siliniyordu.
 *  3) Geri sayım saniye sayarak ilerliyordu; telefon uyuyunca duruyordu
 *     → bütün süre hesapları DUVAR SAATİNDEN (Date.now) yapılmalı.
 *
 * Kurallar:
 *  - odak.ts window/localStorage ister; bu yüzden sahteler modül YÜKLENMEDEN
 *    ÖNCE kurulur, modül `await import(...)` ile dinamik yüklenir.
 *  - Zamana bağlı her şey sahte zaman damgasıyla sürülür; sistem saatine ve
 *    saat dilimine bağlı tek bir satır yoktur (Vercel UTC'de çalışır).
 */
import test, { beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import Module from "node:module";
import path from "node:path";
import type { OdakDurum } from "@/lib/odak";

/* ─────────────── 1. Sahte tarayıcı ortamı (import'tan ÖNCE) ─────────────── */

class SahteDepo {
  private veri = new Map<string, string>();
  get length(): number {
    return this.veri.size;
  }
  getItem(anahtar: string): string | null {
    const v = this.veri.get(anahtar);
    return v === undefined ? null : v;
  }
  setItem(anahtar: string, deger: string): void {
    this.veri.set(anahtar, String(deger));
  }
  removeItem(anahtar: string): void {
    this.veri.delete(anahtar);
  }
  clear(): void {
    this.veri.clear();
  }
  key(i: number): string | null {
    return Array.from(this.veri.keys())[i] ?? null;
  }
}

const depo = new SahteDepo();
const olayDinleyicileri = new Map<string, Array<(olay: unknown) => void>>();

const sahtePencere = {
  localStorage: depo,
  addEventListener(tip: string, fn: (olay: unknown) => void): void {
    const liste = olayDinleyicileri.get(tip) ?? [];
    liste.push(fn);
    olayDinleyicileri.set(tip, liste);
  },
  removeEventListener(tip: string, fn: (olay: unknown) => void): void {
    const liste = olayDinleyicileri.get(tip) ?? [];
    olayDinleyicileri.set(
      tip,
      liste.filter((f) => f !== fn),
    );
  },
};

const kure = globalThis as unknown as {
  window?: unknown;
  localStorage?: unknown;
};
kure.window = sahtePencere;
kure.localStorage = depo;

/* ────────── 2. Sahte tracking: kayıt gerçekten yapıldı mı görelim ────────── */

/**
 * `odakOturumunuKaydet` çalışma süresini `@/lib/tracking` üzerinden yazar.
 * Testte Supabase'e gidilmesin ama "kaydedildi mi?" sorusuna kesin cevap
 * alalım diye modül önbelleğine sahte bir sürüm konur. (src/ altında hiçbir
 * dosya değiştirilmez; yalnız test süreci için modül tohumlanır.)
 */
type KayitCagrisi = {
  subjectSlug: string;
  durationSeconds: number;
  startedAt: string;
};

const kayitlar: KayitCagrisi[] = [];
const TRACKING_YOLU = path.resolve(__dirname, "../src/lib/tracking.ts");

function trackingSahtele(): void {
  const sahteModul = new Module(TRACKING_YOLU, undefined);
  sahteModul.filename = TRACKING_YOLU;
  sahteModul.loaded = true;
  sahteModul.exports = {
    __esModule: true,
    saveSession: async (girdi: KayitCagrisi): Promise<boolean> => {
      kayitlar.push({
        subjectSlug: girdi.subjectSlug,
        durationSeconds: girdi.durationSeconds,
        startedAt: girdi.startedAt,
      });
      return true;
    },
  };
  require.cache[TRACKING_YOLU] = sahteModul;
}
trackingSahtele();

/* ───────────────────────── 3. Yardımcılar ───────────────────────── */

type OdakModulu = typeof import("@/lib/odak");
let modulOnbellegi: OdakModulu | null = null;

async function odakYukle(): Promise<OdakModulu> {
  if (!modulOnbellegi) modulOnbellegi = await import("@/lib/odak");
  return modulOnbellegi;
}

/** odak.ts'in kullandığı depo anahtarı (modül dışına açılmıyor, sabitlendi). */
const ANAHTAR = "rehberim:odak";

/** Sabit, saat diliminden bağımsız bir "şimdi": 2026-03-01T12:00:00Z */
const T0 = Date.UTC(2026, 2, 1, 12, 0, 0);

const gercekNow = Date.now;
/** Duvar saatini sabitler — testler asla gerçek saate bakmaz. */
function saatiKur(ms: number): void {
  Date.now = () => ms;
}
function saatiSerbestBirak(): void {
  Date.now = gercekNow;
}

function durumYaz(d: OdakDurum): void {
  depo.setItem(ANAHTAR, JSON.stringify(d));
}
function hamDurum(): OdakDurum | null {
  const ham = depo.getItem(ANAHTAR);
  return ham ? (JSON.parse(ham) as OdakDurum) : null;
}

/** Verilen anda başlamış, hâlâ akan bir oturum kurar. */
function calisanOturum(
  mod: OdakDurum["mod"],
  baslangicMs: number,
  sureSn = 0,
): void {
  durumYaz({
    mod,
    baslangicMs,
    sureSn,
    duraklatmaMs: null,
    birikmisSn: 0,
    bitti: false,
  });
}

/** Bu ISO damgası yalnız "boru hattı boşaldı mı" işareti için kullanılır. */
const ISARET_ISO = "1970-01-01T00:00:00.000Z";

/**
 * `odakBaslat`, önceki oturumu YÜZEN (fire-and-forget) bir sözle kaydeder.
 * Aynı dinamik import boru hattından bir "işaret" kaydı geçirip onu beklemek,
 * daha önce başlatılmış kayıtların da tamamlandığını garanti eder — böylece
 * "kaç kayıt oluştu?" ölçümü zamanlamaya değil sıraya bağlı olur.
 */
async function kayitlarOturssun(): Promise<void> {
  const odak = await odakYukle();
  await odak.odakOturumunuKaydet({
    mod: "kronometre",
    calismaSn: 60,
    basladiIso: ISARET_ISO,
  });
  for (let i = 0; i < 5; i++) await new Promise((c) => setImmediate(c));
  const i = kayitlar.findIndex((k) => k.startedAt === ISARET_ISO);
  if (i >= 0) kayitlar.splice(i, 1);
}

beforeEach(async () => {
  depo.clear();
  saatiSerbestBirak();
  // Önceki testten sarkan yüzen kayıt varsa burada oturur, sonra sıfırlanır.
  await kayitlarOturssun();
  kayitlar.length = 0;
});

after(() => {
  saatiSerbestBirak();
});

/* ═══════════════ A) 6 SAATLİK ÜST SINIR (40 saat hatası) ═══════════════ */

test("üst sınır sabiti 6 saattir", async () => {
  const { EN_UZUN_OTURUM_SN } = await odakYukle();
  assert.equal(EN_UZUN_OTURUM_SN, 6 * 3600);
});

test("40 saat açık unutulan kronometre kaydedilmez (üst sınır)", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 40 * 3600 * 1000);

  const ozet = odak.odakBitir();

  assert.ok(ozet, "özet dönmeli");
  assert.equal(ozet.mod, "kronometre");
  assert.equal(ozet.calismaSn, 0, "40 saatlik oturum istatistiğe yazılmamalı");
  assert.equal(hamDurum(), null, "durum temizlenmeli");
});

test("6 saat sınırının hemen altı/üstü doğru ayrılır", async () => {
  const odak = await odakYukle();

  // 5sa 59dk 59sn → kaydedilir
  saatiKur(T0);
  calisanOturum("kronometre", T0 - (6 * 3600 - 1) * 1000);
  assert.equal(odak.odakBitir()?.calismaSn, 6 * 3600 - 1);

  // Tam 6 saat → hâlâ kaydedilir (sınır dahil)
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 6 * 3600 * 1000);
  assert.equal(odak.odakBitir()?.calismaSn, 6 * 3600);

  // 6 saat + 1 sn → atılır
  saatiKur(T0);
  calisanOturum("kronometre", T0 - (6 * 3600 + 1) * 1000);
  assert.equal(odak.odakBitir()?.calismaSn, 0);
});

test("terkEdilmisMi 6 saatlik sınırı duvar saatiyle uygular", async () => {
  const odak = await odakYukle();
  const d: OdakDurum = {
    mod: "kronometre",
    baslangicMs: T0,
    sureSn: 0,
    duraklatmaMs: null,
    birikmisSn: 0,
    bitti: false,
  };
  assert.equal(odak.terkEdilmisMi(d, T0 + 5 * 3600 * 1000), false);
  assert.equal(odak.terkEdilmisMi(d, T0 + 6 * 3600 * 1000), false, "sınır dahil");
  assert.equal(odak.terkEdilmisMi(d, T0 + (6 * 3600 + 1) * 1000), true);
  assert.equal(odak.terkEdilmisMi(d, T0 + 40 * 3600 * 1000), true);
});

test("pomodoro 40 saat açık kalırsa da kaydedilmez", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("pomodoro", T0 - 40 * 3600 * 1000);
  assert.equal(odak.odakBitir()?.calismaSn, 0);
});

/* ═══════ B) YENİ SAYAÇ ÖNCEKİ OTURUMU KAYITSIZ SİLMEMELİ ═══════ */

test("yeni sayaç başlatmak çalışan kronometreyi ÖNCE kaydeder", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  const oncekiBaslangic = T0 - 47 * 60 * 1000; // 47 dakikalık kronometre
  calisanOturum("kronometre", oncekiBaslangic);

  odak.odakBaslat("sayac", 25 * 60);
  await kayitlarOturssun();

  assert.equal(kayitlar.length, 1, "önceki oturum kaydedilmeliydi");
  assert.equal(kayitlar[0].subjectSlug, "__odak__");
  assert.equal(kayitlar[0].durationSeconds, 47 * 60);
  assert.equal(kayitlar[0].startedAt, new Date(oncekiBaslangic).toISOString());

  // Yeni oturum tertemiz başlamalı — eskisinden hiçbir şey sızmamalı.
  const yeni = hamDurum();
  assert.ok(yeni);
  assert.equal(yeni.mod, "sayac");
  assert.equal(yeni.baslangicMs, T0);
  assert.equal(yeni.sureSn, 25 * 60);
  assert.equal(yeni.birikmisSn, 0);
  assert.equal(yeni.duraklatmaMs, null);
  assert.equal(yeni.bitti, false);
});

test("önceki pomodoro oturumu kendi slug'ıyla ve yalnız çalışma süresiyle kaydedilir", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  // 30 dk pomodoro = 25 dk çalışma + 5 dk mola → yalnız 25 dk sayılmalı
  calisanOturum("pomodoro", T0 - 30 * 60 * 1000);

  odak.odakBaslat("kronometre");
  await kayitlarOturssun();

  assert.equal(kayitlar.length, 1);
  assert.equal(kayitlar[0].subjectSlug, "__odak_pomodoro__");
  assert.equal(kayitlar[0].durationSeconds, 25 * 60);
});

test("1 dakikadan kısa önceki oturum kaydedilmez ama yine de temizlenir", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 40 * 1000);

  odak.odakBaslat("sayac", 300);
  await kayitlarOturssun();

  assert.equal(kayitlar.length, 0, "40 saniye istatistiğe girmez");
  assert.equal(hamDurum()?.mod, "sayac");
});

test("terk edilmiş önceki oturum yeni sayaç açılınca da kaydedilmez", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 40 * 3600 * 1000);

  odak.odakBaslat("sayac", 1500);
  await kayitlarOturssun();

  assert.equal(kayitlar.length, 0);
  assert.equal(hamDurum()?.mod, "sayac");
});

test("boş depoda başlatmak kayıt üretmez", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("kronometre");
  await kayitlarOturssun();
  assert.equal(kayitlar.length, 0);
});

test("odakOturumunuKaydet 60 saniyenin altını reddeder", async () => {
  const odak = await odakYukle();
  const sonuc = await odak.odakOturumunuKaydet({
    mod: "kronometre",
    calismaSn: 59,
    basladiIso: new Date(T0).toISOString(),
  });
  assert.equal(sonuc, false);
  assert.equal(kayitlar.length, 0);

  assert.equal(
    await odak.odakOturumunuKaydet({
      mod: "pomodoro",
      calismaSn: 60,
      basladiIso: new Date(T0).toISOString(),
    }),
    true,
  );
  assert.equal(kayitlar.length, 1);
  assert.equal(kayitlar[0].subjectSlug, "__odak_pomodoro__");
});

/* ═══════ C) SÜRE DUVAR SAATİNDEN HESAPLANIR (uyuyan telefon) ═══════ */

test("kalan süre saniye saymaz, duvar saatinden türetilir", async () => {
  const odak = await odakYukle();
  const d: OdakDurum = {
    mod: "sayac",
    baslangicMs: T0,
    sureSn: 25 * 60,
    duraklatmaMs: null,
    birikmisSn: 0,
    bitti: false,
  };

  // Hiç "tik" olmadan, yalnız zaman damgası ilerleyerek:
  assert.equal(odak.sayacKalanSn(d, T0), 1500);
  assert.equal(odak.sayacKalanSn(d, T0 + 1000), 1499);
  assert.equal(odak.sayacKalanSn(d, T0 + 600_000), 900);
  // Telefon 20 dakika uyudu, tek bir kare çizilmedi: süre yine de akmalı.
  assert.equal(odak.sayacKalanSn(d, T0 + 1_200_000), 300);
  assert.equal(odak.sayacKalanSn(d, T0 + 1_500_000), 0);
  // 0'ın altına inmez.
  assert.equal(odak.sayacKalanSn(d, T0 + 9_999_999), 0);
  // Saat geri alınırsa negatif geçmiş süre üretilmez.
  assert.equal(odak.aktifGecenSn(d, T0 - 60_000), 0);
});

test("aktifGecenSn geçen gerçek süreyi verir (kronometre)", async () => {
  const odak = await odakYukle();
  const d: OdakDurum = {
    mod: "kronometre",
    baslangicMs: T0,
    sureSn: 0,
    duraklatmaMs: null,
    birikmisSn: 0,
    bitti: false,
  };
  assert.equal(odak.aktifGecenSn(d, T0), 0);
  assert.equal(odak.aktifGecenSn(d, T0 + 3_600_000), 3600);
  assert.equal(odak.aktifGecenSn(d, T0 + 7_500), 7.5);
});

test("duraklatılmış oturumda duvar saati ilerlese de süre donar", async () => {
  const odak = await odakYukle();
  const d: OdakDurum = {
    mod: "kronometre",
    baslangicMs: T0,
    sureSn: 0,
    duraklatmaMs: T0 + 300_000,
    birikmisSn: 300,
    bitti: false,
  };
  assert.equal(odak.aktifGecenSn(d, T0 + 300_000), 300);
  assert.equal(odak.aktifGecenSn(d, T0 + 10 * 3600 * 1000), 300);
  assert.equal(odak.terkEdilmisMi(d, T0 + 40 * 3600 * 1000), false);
});

test("duraklat → (uyku) → devam et: yalnız fiilî süre birikir", async () => {
  const odak = await odakYukle();

  saatiKur(T0);
  odak.odakBaslat("kronometre");

  // 5 dakika çalışıldı, duraklatıldı.
  saatiKur(T0 + 300_000);
  odak.odakDuraklat();
  let d = hamDurum();
  assert.ok(d);
  assert.equal(d.birikmisSn, 300);
  assert.equal(d.duraklatmaMs, T0 + 300_000);

  // Telefon 3 saat uyudu; duraklatmadayken süre işlemez.
  saatiKur(T0 + 3 * 3600 * 1000);
  assert.equal(odak.aktifGecenSn(hamDurum() as OdakDurum), 300);

  // Devam edildi; başlangıç "şimdi"ye çekilir, birikmiş korunur.
  odak.odakDevamEt();
  d = hamDurum();
  assert.ok(d);
  assert.equal(d.duraklatmaMs, null);
  assert.equal(d.birikmisSn, 300);
  assert.equal(d.baslangicMs, T0 + 3 * 3600 * 1000);

  // 2 dakika daha çalışıldı → toplam 7 dakika.
  saatiKur(T0 + 3 * 3600 * 1000 + 120_000);
  const ozet = odak.odakBitir();
  assert.equal(ozet?.calismaSn, 420);
  // basladiIso ilk başlangıcı değil, devam anını gösterir (durumdaki değer).
  assert.equal(
    ozet?.basladiIso,
    new Date(T0 + 3 * 3600 * 1000).toISOString(),
  );
});

test("pomodoro duraklatılamaz — süre hep akar", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("pomodoro");
  const once = JSON.stringify(hamDurum());

  saatiKur(T0 + 600_000);
  odak.odakDuraklat();

  assert.equal(JSON.stringify(hamDurum()), once, "pomodoro durumu değişmemeli");
  assert.equal(odak.aktifGecenSn(hamDurum() as OdakDurum), 600);
});

test("sayac modunda alt sınır 60 saniyedir", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("sayac", 5);
  assert.equal(hamDurum()?.sureSn, 60);

  odak.odakBaslat("sayac", 1500.4);
  assert.equal(hamDurum()?.sureSn, 1500, "saniye tam sayıya yuvarlanır");

  odak.odakBaslat("kronometre", 999);
  assert.equal(hamDurum()?.sureSn, 0, "kronometrede hedef süre yok");
});

/* ═══════════════ D) POMODORO FAZ GEÇİŞLERİ (sınırlarda) ═══════════════ */

test("pomodoroFazi faz geçişlerini sınırda doğru verir", async () => {
  const { pomodoroFazi } = await odakYukle();

  type Beklenen = {
    gecen: number;
    tip: "calisma" | "mola";
    tur: number;
    uzunMola: boolean;
    fazKalanSn: number;
    fazToplamSn: number;
    calismaSn: number;
    set: number;
  };

  // Set düzeni: 4 × (25 dk çalışma + mola), son mola 15 dk → 130 dk = 7800 sn
  const senaryolar: Beklenen[] = [
    // 1. çalışma turu
    { gecen: 0, tip: "calisma", tur: 1, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 0, set: 1 },
    { gecen: 1499, tip: "calisma", tur: 1, uzunMola: false, fazKalanSn: 1, fazToplamSn: 1500, calismaSn: 1499, set: 1 },
    // çalışma → kısa mola (tam sınır)
    { gecen: 1500, tip: "mola", tur: 1, uzunMola: false, fazKalanSn: 300, fazToplamSn: 300, calismaSn: 1500, set: 1 },
    { gecen: 1799, tip: "mola", tur: 1, uzunMola: false, fazKalanSn: 1, fazToplamSn: 300, calismaSn: 1500, set: 1 },
    // mola → 2. çalışma turu
    { gecen: 1800, tip: "calisma", tur: 2, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 1500, set: 1 },
    { gecen: 3300, tip: "mola", tur: 2, uzunMola: false, fazKalanSn: 300, fazToplamSn: 300, calismaSn: 3000, set: 1 },
    { gecen: 3600, tip: "calisma", tur: 3, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 3000, set: 1 },
    { gecen: 5100, tip: "mola", tur: 3, uzunMola: false, fazKalanSn: 300, fazToplamSn: 300, calismaSn: 4500, set: 1 },
    // 4. çalışma turu
    { gecen: 5400, tip: "calisma", tur: 4, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 4500, set: 1 },
    { gecen: 6899, tip: "calisma", tur: 4, uzunMola: false, fazKalanSn: 1, fazToplamSn: 1500, calismaSn: 5999, set: 1 },
    // 4. turdan sonra UZUN MOLA (15 dk)
    { gecen: 6900, tip: "mola", tur: 4, uzunMola: true, fazKalanSn: 900, fazToplamSn: 900, calismaSn: 6000, set: 1 },
    { gecen: 7799, tip: "mola", tur: 4, uzunMola: true, fazKalanSn: 1, fazToplamSn: 900, calismaSn: 6000, set: 1 },
    // set başa döner
    { gecen: 7800, tip: "calisma", tur: 1, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 6000, set: 2 },
    { gecen: 8400, tip: "calisma", tur: 1, uzunMola: false, fazKalanSn: 900, fazToplamSn: 1500, calismaSn: 6600, set: 2 },
    { gecen: 15600, tip: "calisma", tur: 1, uzunMola: false, fazKalanSn: 1500, fazToplamSn: 1500, calismaSn: 12000, set: 3 },
  ];

  for (const b of senaryolar) {
    const f = pomodoroFazi(b.gecen);
    assert.deepEqual(
      {
        gecen: b.gecen,
        tip: f.tip,
        tur: f.tur,
        uzunMola: f.uzunMola,
        fazKalanSn: f.fazKalanSn,
        fazToplamSn: f.fazToplamSn,
        calismaSn: f.calismaSn,
        set: f.set,
      },
      b,
      `gecenSn=${b.gecen}`,
    );
  }
});

test("pomodoroFazi bir set boyunca tutarlıdır (tam tarama)", async () => {
  const { pomodoroFazi, POMODORO_UZUN_MOLA_DK } = await odakYukle();
  const SET = 7800;
  let oncekiCalisma = -1;
  let uzunMolaSaniyesi = 0;

  for (let sn = 0; sn < SET; sn++) {
    const f = pomodoroFazi(sn);
    assert.ok(f.tur >= 1 && f.tur <= 4, `tur aralık dışı: ${sn}`);
    assert.equal(f.set, 1);
    assert.ok(f.fazKalanSn > 0 && f.fazKalanSn <= f.fazToplamSn);
    // Çalışma süresi asla geri gitmez, mola boyunca sabit kalır.
    assert.ok(f.calismaSn >= oncekiCalisma, `calismaSn geri gitti: ${sn}`);
    if (f.tip === "mola") assert.equal(f.calismaSn, f.tur * 1500);
    if (f.uzunMola) {
      uzunMolaSaniyesi++;
      assert.equal(f.tip, "mola");
      assert.equal(f.tur, 4, "uzun mola yalnız 4. turdan sonra");
      assert.equal(f.fazToplamSn, POMODORO_UZUN_MOLA_DK * 60);
    }
    oncekiCalisma = f.calismaSn;
  }
  assert.equal(uzunMolaSaniyesi, 900, "sette tek bir 15 dk uzun mola olmalı");
});

test("pomodoro düzen sabitleri klasik 25/5/15'tir", async () => {
  const m = await odakYukle();
  assert.equal(m.POMODORO_CALISMA_DK, 25);
  assert.equal(m.POMODORO_MOLA_DK, 5);
  assert.equal(m.POMODORO_UZUN_MOLA_DK, 15);
});

test("pomodoro bitirilince molalar çalışma sayılmaz", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("pomodoro", T0 - 1800 * 1000); // 25 çalışma + 5 mola
  assert.equal(odak.odakBitir()?.calismaSn, 1500);

  saatiKur(T0);
  calisanOturum("pomodoro", T0 - 7800 * 1000); // tam bir set
  assert.equal(odak.odakBitir()?.calismaSn, 6000);
});

/* ═══════════════ E) SAYAÇ TAMAMLAMA / ÇİFT KAYIT ═══════════════ */

test("sayacTamamla yalnız süre bitince ve yalnız bir kez özet döner", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("sayac", 1500);

  // Süre dolmadan çağrı → null
  saatiKur(T0 + 1_499_000);
  assert.equal(odak.sayacTamamla(), null);

  // Süre doldu → özet
  saatiKur(T0 + 1_500_000);
  const ozet = odak.sayacTamamla();
  assert.ok(ozet);
  assert.equal(ozet.mod, "sayac");
  assert.equal(ozet.calismaSn, 1500);
  assert.equal(ozet.basladiIso, new Date(T0).toISOString());
  assert.equal(hamDurum()?.bitti, true);

  // İkinci çağrı → null (çift kayıt yok)
  assert.equal(odak.sayacTamamla(), null);

  // Bitmiş sayacı kapatmak süreyi TEKRAR yazmaz.
  saatiKur(T0 + 1_600_000);
  assert.equal(odak.odakBitir()?.calismaSn, 0);
});

test("kronometre/pomodoro için sayacTamamla çalışmaz", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 10_000_000);
  assert.equal(odak.sayacTamamla(), null);
  calisanOturum("pomodoro", T0 - 10_000_000);
  assert.equal(odak.sayacTamamla(), null);
});

test("erken kapatılan sayaç yalnız fiilen geçen süreyi yazar", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("sayac", 1500);
  saatiKur(T0 + 600_000); // 10 dakika sonra vazgeçildi
  assert.equal(odak.odakBitir()?.calismaSn, 600);
});

/* ═══════════════ F) Depo dayanıklılığı ve abonelik ═══════════════ */

test("bozuk localStorage kaydı çökertmez", async () => {
  const odak = await odakYukle();
  depo.setItem(ANAHTAR, "{bozuk-json");
  assert.equal(odak.odakDurumu(), null);
  assert.equal(odak.odakBitir(), null);
});

test("durum her okumada depodan gelir (sekmeler arası tutarlılık)", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  odak.odakBaslat("kronometre");
  // Başka bir sekme oturumu kapattı:
  depo.removeItem(ANAHTAR);
  assert.equal(odak.odakDurumu(), null, "modül önbelleği depoyu gölgelememeli");
});

test("odakAboneOl değişiklikleri bildirir ve abonelik iptali çalışır", async () => {
  const odak = await odakYukle();
  let sayac = 0;
  const birak = odak.odakAboneOl(() => {
    sayac++;
  });

  saatiKur(T0);
  odak.odakBaslat("kronometre");
  assert.equal(sayac, 1, "başlatma bir bildirim üretir");

  saatiKur(T0 + 120_000);
  odak.odakDuraklat();
  assert.equal(sayac, 2);

  odak.odakBitir();
  assert.equal(sayac, 3);

  birak();
  odak.odakBaslat("sayac", 60);
  assert.equal(sayac, 3, "abonelik iptalinden sonra bildirim gelmemeli");
});

test("çalışan oturum üstüne başlatmak iki kez bildirim üretir (kapat + aç)", async () => {
  const odak = await odakYukle();
  saatiKur(T0);
  calisanOturum("kronometre", T0 - 600_000);

  let sayac = 0;
  const birak = odak.odakAboneOl(() => {
    sayac++;
  });
  odak.odakBaslat("sayac", 1500);
  birak();

  assert.equal(sayac, 2, "önce eski oturum kapanır, sonra yenisi açılır");
});

/* ═══════════════ G) Biçimlendirme ═══════════════ */

test("sureBicimle mm:ss ve s:dd:ss verir", async () => {
  const { sureBicimle } = await odakYukle();
  assert.equal(sureBicimle(0), "00:00");
  assert.equal(sureBicimle(9), "00:09");
  assert.equal(sureBicimle(59.9), "00:59");
  assert.equal(sureBicimle(60), "01:00");
  assert.equal(sureBicimle(1500), "25:00");
  assert.equal(sureBicimle(3599), "59:59");
  assert.equal(sureBicimle(3600), "1:00:00");
  assert.equal(sureBicimle(3661), "1:01:01");
  assert.equal(sureBicimle(6 * 3600), "6:00:00");
  assert.equal(sureBicimle(-5), "00:00", "negatif süre 0 gösterilir");
});
