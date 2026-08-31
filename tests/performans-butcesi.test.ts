/**
 * Performans bütçesi (`tools/performans-butcesi.mjs`).
 *
 * Bütçenin işi derleme sonrası çalışıp aşımda derlemeyi durdurmak.
 * Buradaki testler ÖLÇÜMÜN kendisine bakıyor: yanlış ölçen bir bütçe,
 * ya boş yere alarm verir (kimse ciddiye almaz) ya da gerçek şişmeyi
 * kaçırır (var olma sebebi buydu).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { rotaAgirliklari } from "../tools/performans-butcesi.mjs";

/** Sahte bir `.next` çıktısı kurar. */
function sahteBuild(
  sayfalar: Record<string, string[]>,
  parcaBoyutlari: Record<string, number>,
): string {
  const kok = fs.mkdtempSync(path.join(os.tmpdir(), "butce-"));
  fs.mkdirSync(path.join(kok, "static", "chunks"), { recursive: true });
  for (const [ad, bayt] of Object.entries(parcaBoyutlari)) {
    // Sıkıştırılamayan içerik: gzip boyutu ham boyuta yakın kalsın ki
    // test beklentileri öngörülebilir olsun.
    const rastgele = Buffer.alloc(bayt);
    for (let i = 0; i < bayt; i++) rastgele[i] = (i * 2654435761) % 256;
    fs.writeFileSync(path.join(kok, ad), rastgele);
  }
  fs.writeFileSync(
    path.join(kok, "app-build-manifest.json"),
    JSON.stringify({ pages: sayfalar }),
  );
  return kok;
}

test("aynı parça iki kez sayılmaz (tarayıcı bir kez indirir)", () => {
  const kok = sahteBuild(
    { "/a/page": ["static/chunks/x.js", "static/chunks/x.js", "static/chunks/y.js"] },
    { "static/chunks/x.js": 100_000, "static/chunks/y.js": 100_000 },
  );
  const a = rotaAgirliklari(kok);
  const tek = zlib.gzipSync(fs.readFileSync(path.join(kok, "static/chunks/x.js")), {
    level: 9,
  }).length;
  const beklenen = Math.round((tek * 2) / 1024);
  assert.equal(a["/a"], beklenen, "tekrarlanan parça iki kez sayıldı");
  fs.rmSync(kok, { recursive: true, force: true });
});

test("API rotaları ölçülmez (tarayıcıya JS göndermezler)", () => {
  // Ölçülselerdi bütçe dosyası ~100 kB'lık anlamsız satırlarla dolardı
  // ve gerçek sayfalar arasında kaybolurdu.
  const kok = sahteBuild(
    {
      "/api/chat/route": ["static/chunks/x.js"],
      "/api/chat/page": ["static/chunks/x.js"],
      "/dashboard/page": ["static/chunks/x.js"],
    },
    { "static/chunks/x.js": 50_000 },
  );
  const a = rotaAgirliklari(kok);
  assert.ok("/dashboard" in a, "gerçek sayfa ölçülmedi");
  assert.ok(!("/api/chat" in a), "API rotası ölçüme girdi");
  fs.rmSync(kok, { recursive: true, force: true });
});

test("layout/loading/error ayrı rota sayılmaz", () => {
  const kok = sahteBuild(
    {
      "/layout": ["static/chunks/x.js"],
      "/loading": ["static/chunks/x.js"],
      "/error": ["static/chunks/x.js"],
      "/page": ["static/chunks/x.js"],
    },
    { "static/chunks/x.js": 50_000 },
  );
  const a = rotaAgirliklari(kok);
  assert.deepEqual(Object.keys(a), ["/"], `beklenmedik rotalar: ${Object.keys(a)}`);
  fs.rmSync(kok, { recursive: true, force: true });
});

test("JS olmayan varlıklar sayılmaz", () => {
  const kok = sahteBuild(
    { "/a/page": ["static/chunks/x.js", "static/css/a.css"] },
    { "static/chunks/x.js": 50_000 },
  );
  const a = rotaAgirliklari(kok);
  const tek = zlib.gzipSync(fs.readFileSync(path.join(kok, "static/chunks/x.js")), {
    level: 9,
  }).length;
  assert.equal(a["/a"], Math.round(tek / 1024));
  fs.rmSync(kok, { recursive: true, force: true });
});

test("ölçüm GZİP'li — ham boyut değil", () => {
  // Ham boyutla ölçseydik sayılar 3-4 kat büyük çıkar, tavan anlamını
  // yitirirdi. Tarayıcıya giden gerçek bayt gzip'lidir.
  const kok = sahteBuild(
    { "/a/page": ["static/chunks/x.js"] },
    { "static/chunks/x.js": 400_000 },
  );
  const ham = fs.statSync(path.join(kok, "static/chunks/x.js")).size;
  const a = rotaAgirliklari(kok);
  assert.ok(
    a["/a"] < Math.round(ham / 1024),
    "ölçüm sıkıştırılmamış görünüyor",
  );
  fs.rmSync(kok, { recursive: true, force: true });
});

test("derleme çıktısı yoksa açık bir hata verir", () => {
  const bos = fs.mkdtempSync(path.join(os.tmpdir(), "butce-bos-"));
  assert.throws(() => rotaAgirliklari(bos), /npm run build/);
  fs.rmSync(bos, { recursive: true, force: true });
});

test("kaydedilmiş bütçe dosyası gerçek ve makul", () => {
  const dosya = path.join(process.cwd(), "performans-butcesi.json");
  assert.ok(fs.existsSync(dosya), "performans-butcesi.json yok");
  const b = JSON.parse(fs.readFileSync(dosya, "utf8"));
  assert.ok(b.tavanKB > 0 && b.tavanKB < 1000, `tuhaf tavan: ${b.tavanKB}`);
  const rotalar = Object.entries(b.rotalar) as [string, number][];
  assert.ok(rotalar.length > 20, `çok az rota kayıtlı: ${rotalar.length}`);
  for (const [rota, kb] of rotalar) {
    assert.ok(!rota.startsWith("/api/"), `API rotası kaydedilmiş: ${rota}`);
    assert.ok(
      kb > 0 && kb <= b.tavanKB,
      `${rota} kayıtlı değeri tavanı aşıyor: ${kb} kB`,
    );
  }
});
