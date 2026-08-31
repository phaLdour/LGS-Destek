/**
 * Şema göç defteri aracı (`tools/sema-fazlari.mjs`).
 *
 * Aracın tek işi doğru cevap vermek: "bu blok değişti mi?". Yanlış
 * cevap iki yönde de kötü — sahte alarm güveni öldürür, kaçırılan
 * değişiklik ise üretimle dosyanın sessizce ayrışmasına yol açar
 * (bu aracın var olma sebebi zaten bu).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { bloklariAyir } from "../tools/sema-fazlari.mjs";

const ORNEK = `-- Baş kısım
create table temel (id int);

-- ════════════════════
-- FAZ 2 — Bir şey
-- ════════════════════
create table a (id int);

-- ════════════════════
-- FAZ 3 — Başka şey
-- ════════════════════
create table b (id int);
`;

test("dosya TEMEL + her faz olarak ayrılır", () => {
  const b = bloklariAyir(ORNEK);
  assert.deepEqual(
    b.map((x) => x.id),
    ["TEMEL", "FAZ 2 — Bir şey", "FAZ 3 — Başka şey"],
  );
});

test("başlığın üstündeki çizgi bloğa dahildir", () => {
  const b = bloklariAyir(ORNEK);
  assert.ok(
    b[1].govde.startsWith("-- ═"),
    "blok süsleme çizgisiyle başlamıyor — kesip yapıştırınca başlık bölünür",
  );
  assert.ok(b[1].govde.includes("create table a"));
  assert.ok(!b[1].govde.includes("create table b"), "sonraki faz sızdı");
});

test("blok değişince parmak izi değişir", () => {
  const a = bloklariAyir(ORNEK);
  const b = bloklariAyir(ORNEK.replace("create table a (id int);", "create table a (id bigint);"));
  assert.notEqual(a[1].parmak, b[1].parmak, "değişiklik fark edilmedi");
  assert.equal(a[0].parmak, b[0].parmak, "dokunulmayan blok değişmiş göründü");
  assert.equal(a[2].parmak, b[2].parmak, "dokunulmayan blok değişmiş göründü");
});

test("damga satırının kendisi parmak izini DEĞİŞTİRMEZ", () => {
  // Bu olmazsa damga eklemek parmak izini değiştirir, damga eklendiği
  // anda eskimiş sayılır ve araç sonsuza kadar kendini kovalar.
  const damgali = ORNEK.replace(
    "create table a (id int);",
    `create table a (id int);

-- @gecis Bu blok uygulandığında kendini göç defterine yazar.
-- @gecis Elle düzenlemeyin: node tools/sema-fazlari.mjs damgala
select public.sema_faz_kaydet('FAZ 2 — Bir şey', 'abc123');`,
  );
  assert.equal(
    bloklariAyir(ORNEK)[1].parmak,
    bloklariAyir(damgali)[1].parmak,
    "damga eklemek parmak izini değiştirdi",
  );
});

test("gerçek şemadaki her bloğun damgası güncel", () => {
  // `npm test` bunu ayrıca komut olarak da çalıştırır; burada olması,
  // hangi bloğun bozuk olduğunu test çıktısında görebilmek için.
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const sema = fs.readFileSync(
    path.join(process.cwd(), "supabase", "schema.sql"),
    "utf8",
  );
  const bloklar = bloklariAyir(sema);
  assert.ok(bloklar.length >= 15, `blok sayısı beklenmedik: ${bloklar.length}`);
  const bozuk: string[] = [];
  for (const b of bloklar) {
    const damga = b.govde
      .split("\n")
      .find((s: string) => s.startsWith("select public.sema_faz_kaydet("));
    if (!damga || !damga.includes(b.parmak)) bozuk.push(b.id);
  }
  assert.deepEqual(bozuk, [], `damgası bozuk bloklar: ${bozuk.join(", ")}`);
});

test("her bloğun kimliği benzersiz (defter anahtarı çakışmasın)", () => {
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const sema = fs.readFileSync(
    path.join(process.cwd(), "supabase", "schema.sql"),
    "utf8",
  );
  const idler = bloklariAyir(sema).map((b: { id: string }) => b.id);
  assert.equal(
    new Set(idler).size,
    idler.length,
    "aynı başlıklı iki blok var — biri diğerinin defter kaydını ezer",
  );
});
