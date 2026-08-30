import test from "node:test";
import assert from "node:assert/strict";

import type { PoolQuestion } from "@/lib/quickQuiz-types";

/**
 * Hızlı Sorular istemci kaydı testleri (`@/lib/quickQuiz-client`).
 *
 * Bu modül `window` ve `localStorage` ister; ayrıca yapılandırılmışsa
 * Supabase'e yazmaya çalışır. Bu yüzden:
 *   • globaller import'tan ÖNCE sahtelenir,
 *   • Supabase ortam değişkenleri silinir (ağ isteği olmaz),
 *   • modül `await import(...)` ile testin içinde yüklenir.
 *
 * REGRESYON: "son cevap özete girmiyordu" — cevap işaretlendiği anda kalıcı
 * kayda yazılmalı; bayat bir kopya üzerinden çalışılırsa son soru kaybolur.
 * Aşağıdaki testler her `markSolved` çağrısının ANINDA okunabilir olduğunu
 * ve havuzun son sorusunun da kaydedildiğini doğrular.
 */

delete process.env.NEXT_PUBLIC_SUPABASE_URL;
delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const DEPO_ANAHTARI = "rehberim:quick-solved";

/** Belleğe yazan sahte localStorage. */
const depo = new Map<string, string>();
let yazmaHatasi = false;

const sahteLocalStorage = {
  getItem: (k: string): string | null => (depo.has(k) ? depo.get(k)! : null),
  setItem: (k: string, v: string): void => {
    if (yazmaHatasi) throw new Error("QuotaExceededError");
    depo.set(k, String(v));
  },
  removeItem: (k: string): void => {
    depo.delete(k);
  },
  clear: (): void => depo.clear(),
  key: (i: number): string | null => [...depo.keys()][i] ?? null,
  get length(): number {
    return depo.size;
  },
};

(globalThis as unknown as { window: unknown }).window = globalThis;
(globalThis as unknown as { localStorage: unknown }).localStorage = sahteLocalStorage;

/** Test başına temiz durum. */
function sifirla() {
  depo.clear();
  yazmaHatasi = false;
}

/** n soruluk sahte havuz. */
function havuzUret(n: number, dersSlug = "turkce"): PoolQuestion[] {
  return Array.from({ length: n }, (_, i) => ({
    id: `${dersSlug}/konu#${i}`,
    subjectSlug: dersSlug,
    subjectName: "Türkçe",
    topicId: "konu",
    topicName: "Konu",
    question: {
      question: `Soru ${i}`,
      options: ["a", "b", "c", "d"],
      correctIndex: i % 4,
    },
  }));
}

type Modul = typeof import("@/lib/quickQuiz-client");

async function modulYukle(): Promise<Modul> {
  return await import("@/lib/quickQuiz-client");
}

// ───────────────── Temel davranış ─────────────────

test("hiç soru çözülmemişken havuzun tamamı döner", async () => {
  sifirla();
  const { filterAndShuffle } = await modulYukle();
  const havuz = havuzUret(10);
  const kalan = filterAndShuffle(havuz);
  assert.equal(kalan.length, 10);
  assert.deepEqual(
    kalan.map((q) => q.id).sort(),
    havuz.map((q) => q.id).sort(),
  );
});

test("çözülen soru havuzdan hemen düşer (bayat kopya okunmaz)", async () => {
  sifirla();
  const { filterAndShuffle, markSolved } = await modulYukle();
  const havuz = havuzUret(5);

  markSolved("turkce/konu#2");
  // Aynı tik içinde okunuyor: yazma anında kalıcı olmalı.
  const kalan = filterAndShuffle(havuz);
  assert.equal(kalan.length, 4);
  assert.ok(!kalan.some((q) => q.id === "turkce/konu#2"));
});

test("REGRESYON: havuzun SON sorusu da kaydedilir, hiçbir cevap kaybolmaz", async () => {
  sifirla();
  const { filterAndShuffle, markSolved } = await modulYukle();
  const havuz = havuzUret(6);

  // Öğrenci soruları sırayla cevaplar; sonuncusu dâhil hepsi işaretlenir.
  for (const q of havuz) {
    markSolved(q.id);
    // Her adımdan sonra kalan sayısı bir azalmalı — son adım da dâhil.
    const kalanSayisi = filterAndShuffle(havuz).length;
    assert.equal(
      kalanSayisi,
      havuz.length - (havuz.indexOf(q) + 1),
      `${q.id} işaretlendikten sonra kayıt güncellenmedi`,
    );
  }
  assert.equal(filterAndShuffle(havuz).length, 0, "son cevap kayda girmemiş");

  const kayitli = JSON.parse(depo.get(DEPO_ANAHTARI)!) as string[];
  assert.deepEqual(kayitli.sort(), havuz.map((q) => q.id).sort());
});

test("aynı soru iki kez işaretlenirse depoda tek kayıt kalır", async () => {
  sifirla();
  const { markSolved } = await modulYukle();
  markSolved("turkce/konu#1");
  markSolved("turkce/konu#1");
  const kayitli = JSON.parse(depo.get(DEPO_ANAHTARI)!) as string[];
  assert.deepEqual(kayitli, ["turkce/konu#1"]);
});

test("filterAndShuffle girdiyi bozmaz ve tam bir permütasyon döndürür", async () => {
  sifirla();
  const { filterAndShuffle } = await modulYukle();
  const havuz = havuzUret(20);
  const oncekiSira = havuz.map((q) => q.id);

  // Karıştırma Math.random kullanır → testi deterministik yapmak için
  // tekrarlanabilir bir üreteçle değiştiriyoruz.
  const gercekRandom = Math.random;
  let tohum = 12345;
  Math.random = () => {
    tohum = (tohum * 1664525 + 1013904223) >>> 0;
    return tohum / 4294967296;
  };
  try {
    const kalan = filterAndShuffle(havuz);
    assert.equal(kalan.length, havuz.length);
    assert.deepEqual(kalan.map((q) => q.id).sort(), [...oncekiSira].sort());
    // Nesneler kopyalanmaz, aynı referanslar taşınır (soru verisi bozulmaz).
    for (const q of kalan) assert.ok(havuz.includes(q));
  } finally {
    Math.random = gercekRandom;
  }

  assert.deepEqual(havuz.map((q) => q.id), oncekiSira, "girdi havuzu değiştirilmemeli");
});

// ───────────────── Yeniden başlatma ─────────────────

test("resetSolvedFor yalnız verilen kimlikleri 'çözüldü' listesinden çıkarır", async () => {
  sifirla();
  const { filterAndShuffle, markSolved, resetSolvedFor } = await modulYukle();
  const turkce = havuzUret(3, "turkce");
  const matematik = havuzUret(3, "matematik");

  for (const q of [...turkce, ...matematik]) markSolved(q.id);
  assert.equal(filterAndShuffle([...turkce, ...matematik]).length, 0);

  resetSolvedFor(turkce.map((q) => q.id));
  assert.equal(filterAndShuffle(turkce).length, 3, "Türkçe havuzu sıfırlanmalı");
  assert.equal(filterAndShuffle(matematik).length, 0, "Matematik kayıtları korunmalı");
});

test("hiç kaydı olmayan kimlikler için resetSolvedFor sessizce çalışır", async () => {
  sifirla();
  const { resetSolvedFor, filterAndShuffle } = await modulYukle();
  resetSolvedFor(["hic/olmayan#0"]);
  assert.equal(filterAndShuffle(havuzUret(2)).length, 2);
});

// ───────────────── Bozuk / kısıtlı depolama ─────────────────

test("depodaki kayıt bozuksa çökmez, havuzun tamamı döner", async () => {
  sifirla();
  const { filterAndShuffle } = await modulYukle();
  depo.set(DEPO_ANAHTARI, "{bozuk-json");
  const havuz = havuzUret(4);
  assert.equal(filterAndShuffle(havuz).length, 4);
});

test("depoya yazılamıyorsa (kota dolu) markSolved hata fırlatmaz", async () => {
  sifirla();
  const { markSolved, filterAndShuffle } = await modulYukle();
  yazmaHatasi = true;
  assert.doesNotThrow(() => markSolved("turkce/konu#0"));
  yazmaHatasi = false;
  // Yazılamadığı için soru havuzda kalır — sınav akışı yine de sürer.
  assert.equal(filterAndShuffle(havuzUret(2)).length, 2);
});

test("boş havuz güvenle işlenir", async () => {
  sifirla();
  const { filterAndShuffle } = await modulYukle();
  assert.deepEqual(filterAndShuffle([]), []);
});
