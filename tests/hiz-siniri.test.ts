/**
 * `src/lib/hizSiniri.ts` + `src/lib/hataBildir.ts`
 *
 * Bu iki modülün asıl işi veritabanında (SQL tarafı yerel PostgreSQL'de
 * ayrıca sınandı: 40 eş zamanlı istekte tam olarak limit kadarı geçiyor).
 * Buradaki testler ÇEVRE davranışına odaklı:
 *
 *  - Supabase yapılandırılmamışken istek GEÇMELİ. Sınır altyapısı yok diye
 *    öğrenciyi siteden edemeyiz; "kapalıysa reddet" en kötü seçenek olurdu.
 *  - Kimlik üretimi doğru olmalı: giriş yapmışta kullanıcı id'si, misafirde
 *    IP. Yanlış kimlik = herkes tek sayaca düşer, biri diğerini kilitler.
 *  - Hata bildirimi kendi kendini boğmamalı (tekrar + tavan).
 */
import test, { before } from "node:test";
import assert from "node:assert/strict";

// Modül yüklenmeden önce ortam temiz olmalı: Supabase yapılandırılmamış
// hâli sınıyoruz. (Üst düzey `await` bu kurulumda desteklenmiyor, o yüzden
// modül `before` içinde yükleniyor.)
delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;

type HizModulu = typeof import("@/lib/hizSiniri");
let H!: HizModulu;

before(async () => {
  H = await import("@/lib/hizSiniri");
});

function istek(basliklar: Record<string, string> = {}): Request {
  return new Request("https://ornek.test/api/chat", {
    method: "POST",
    headers: basliklar,
  });
}

test("Supabase yapılandırılmamışken istek GEÇER (sınır kapıyı kilitlemez)", async () => {
  const s = await H.hizSiniriDene("chat:dk:u:abc", 1, 60);
  assert.equal(s.izin, true, "altyapı yokken istek geçmeli");
  assert.equal(s.olculdu, false, "ölçülemediği açıkça belli olmalı");
});

test("çoklu sınırda da aynı: ölçülemiyorsa geçer", async () => {
  const { sonuc, asilan } = await H.hizSinirlariDene([
    { ad: "dakika", anahtar: "a", limit: 1, pencereSn: 60 },
    { ad: "gun", anahtar: "b", limit: 1, pencereSn: 86400 },
  ]);
  assert.equal(sonuc.izin, true);
  assert.equal(asilan, null);
});

test("giriş yapmış kullanıcı kendi kimliğiyle sayılır", () => {
  const k = H.istekKimligi(istek(), "abc-123");
  assert.equal(k, "u:abc-123");
});

test("misafir IP ile sayılır, ilk IP alınır", () => {
  const k = H.istekKimligi(
    istek({ "x-forwarded-for": "1.2.3.4, 10.0.0.1, 10.0.0.2" }),
    null,
  );
  assert.equal(k, "ip:1.2.3.4");
});

test("x-real-ip yedek olarak kullanılır", () => {
  assert.equal(H.istekKimligi(istek({ "x-real-ip": "9.9.9.9" }), null), "ip:9.9.9.9");
});

test("hiç IP başlığı yoksa kırılmaz", () => {
  assert.equal(H.istekKimligi(istek(), null), "ip:bilinmeyen");
});

test("çok uzun IP başlığı kısaltılır (anahtar şişmesin)", () => {
  const k = H.istekKimligi(istek({ "x-forwarded-for": "a".repeat(500) }), null);
  assert.ok(k.length <= 48, `anahtar çok uzun: ${k.length}`);
});

test("giriş yapmış kullanıcı IP başlığından ETKİLENMEZ", () => {
  // Aksi hâlde öğrenci IP'sini değiştirerek sınırı sıfırlayabilirdi.
  const k = H.istekKimligi(istek({ "x-forwarded-for": "1.2.3.4" }), "abc-123");
  assert.equal(k, "u:abc-123");
});

test("429 yanıtı ne zaman tekrar denenebileceğini söyler", async () => {
  const sifirlanma = new Date(Date.now() + 42_000);
  const yanit = H.cokHizliYaniti(
    { izin: false, kalan: 0, sifirlanma, olculdu: true },
    "Biraz yavaş",
  );
  assert.equal(yanit.status, 429);
  const retry = Number(yanit.headers.get("Retry-After"));
  assert.ok(retry >= 41 && retry <= 43, `Retry-After beklenmedik: ${retry}`);
  const govde = (await yanit.json()) as { error: string; tekrarSaniye: number };
  assert.equal(govde.error, "Biraz yavaş");
  assert.ok(govde.tekrarSaniye >= 41);
});

test("sıfırlanma bilinmiyorsa makul bir varsayılan verilir", async () => {
  const yanit = H.cokHizliYaniti(
    { izin: false, kalan: 0, sifirlanma: null, olculdu: true },
    "dur",
  );
  assert.equal(Number(yanit.headers.get("Retry-After")), 60);
});

test("geçmiş bir sıfırlanma anı negatif süre üretmez", () => {
  const yanit = H.cokHizliYaniti(
    { izin: false, kalan: 0, sifirlanma: new Date(Date.now() - 5000), olculdu: true },
    "dur",
  );
  assert.ok(Number(yanit.headers.get("Retry-After")) >= 1);
});

// ── Hata bildirimi ──────────────────────────────────────────────────
//
// `hataBildir` modül düzeyinde durum tutar (gönderilenler kümesi + oturum
// tavanı). Modülü test başına yeniden yüklemek yerine, tüm yaşam
// döngüsünü TEK bir sırayla sınıyoruz — davranış zaten sıraya bağlı ve
// böylesi gerçek kullanıma daha yakın.

type SahteIstek = { url: string; govde: Record<string, unknown> };

test("hata bildirimi: gönderme, tekrar engeli ve oturum tavanı", async () => {
  const gonderilenler: SahteIstek[] = [];
  let fetchPatlasin = false;

  const g = globalThis as unknown as Record<string, unknown>;
  g.window = {
    location: { pathname: "/deneme", search: "" },
    addEventListener: () => {},
  };
  // navigator Node 22'de salt okunur — defineProperty gerekiyor.
  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: "TestTarayici/1.0" },
    configurable: true,
    writable: true,
  });
  g.fetch = (url: string, opts: { body: string }) => {
    if (fetchPatlasin) throw new Error("ağ yok");
    gonderilenler.push({ url, govde: JSON.parse(opts.body) });
    return Promise.resolve(new Response(null, { status: 204 }));
  };

  const { hataBildir } = await import("@/lib/hataBildir");

  // 1) İlk hata gider; yol ve tarayıcı eklenir.
  hataBildir(new Error("Bir şey patladı"));
  assert.equal(gonderilenler.length, 1);
  assert.equal(gonderilenler[0].url, "/api/hata");
  assert.equal(gonderilenler[0].govde.mesaj, "Bir şey patladı");
  assert.equal(gonderilenler[0].govde.yol, "/deneme");
  assert.equal(gonderilenler[0].govde.tarayici, "TestTarayici/1.0");

  // 2) Aynı hata tekrar gönderilmez.
  hataBildir(new Error("Bir şey patladı"));
  hataBildir(new Error("Bir şey patladı"));
  assert.equal(gonderilenler.length, 1, "tekrar eden hata bir kez gitmeli");

  // 3) Boş mesaj hiç gönderilmez (tavandan da düşmez).
  hataBildir(new Error("   "));
  hataBildir("");
  assert.equal(gonderilenler.length, 1);

  // 4) Yığın izi kısaltılır.
  const uzun = new Error("uzun yığın");
  uzun.stack = "x".repeat(20000);
  hataBildir(uzun);
  assert.equal(gonderilenler.length, 2);
  assert.ok(
    String(gonderilenler[1].govde.yigin).length <= 4000,
    "yığın izi 4000 karaktere kısaltılmalı",
  );

  // 5) Error olmayan değerler de bildirilir.
  hataBildir("düz metin hata");
  assert.equal(gonderilenler.length, 3);
  assert.equal(gonderilenler[2].govde.mesaj, "düz metin hata");

  // 6) fetch patlarsa hataBildir THROW ETMEZ — hata içinde hata olmaz.
  fetchPatlasin = true;
  assert.doesNotThrow(() => hataBildir(new Error("ağ yokken")));
  fetchPatlasin = false;
  assert.equal(gonderilenler.length, 3, "patlayan istek listeye girmedi");

  // 7) Oturum tavanı 5: yukarıda 4 bildirim harcandı (biri patladı ama
  //    sayıldı), beşinci gider, altıncı GİTMEZ. Bir hata döngüsü siteyi
  //    de veritabanını da boğamaz.
  hataBildir(new Error("beşinci"));
  assert.equal(gonderilenler.length, 4);
  hataBildir(new Error("altıncı"));
  hataBildir(new Error("yedinci"));
  assert.equal(gonderilenler.length, 4, "tavandan sonra hiçbir şey gitmemeli");
});
