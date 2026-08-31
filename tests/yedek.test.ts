/**
 * Veri yedeği (`tools/yedek-al.mjs`, `tools/yedek-yukle.mjs`).
 *
 * Supabase'in ücretsiz planında otomatik yedek YOK; bu betikler tek
 * korumamız. Bir yedeğin en tehlikeli bozulma biçimi gürültülü
 * çökmek değil, SESSİZCE eksik almaktır — 1200 satırlık tablodan
 * 1000 satır alıp "tamam" demek gibi. Testlerin çoğu bunu kovalıyor.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  TABLOLAR,
  YEDEKLENMEYENLER,
  tabloyuOku,
  yedekAl,
} from "../tools/yedek-al.mjs";
import { yedegiOku, tabloyuYaz } from "../tools/yedek-yukle.mjs";

/** Supabase istemcisinin yerine geçen, sayfalamayı gerçekten uygulayan sahte. */
function sahteIstemci(veri: Record<string, unknown[]>, hatalar: Record<string, string> = {}) {
  return {
    from(tablo: string) {
      return {
        select() {
          return {
            range(bas: number, son: number) {
              if (hatalar[tablo]) {
                return Promise.resolve({ data: null, error: { message: hatalar[tablo] } });
              }
              const t = veri[tablo] ?? [];
              return Promise.resolve({ data: t.slice(bas, son + 1), error: null });
            },
          };
        },
        upsert(satirlar: unknown[]) {
          if (hatalar[tablo]) {
            return Promise.resolve({ error: { message: hatalar[tablo] } });
          }
          (veri[tablo] ||= []).push(...satirlar);
          return Promise.resolve({ error: null });
        },
      };
    },
  };
}

function gecici(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "yedek-"));
}

test("1000 satırdan büyük tablo SESSİZCE kırpılmaz", async () => {
  // Supabase tek istekte en fazla 1000 satır döner. Sayfalama olmadan
  // büyük tablo hatasız ama eksik yedeklenir — en sinsi bozulma.
  const satirlar = Array.from({ length: 2350 }, (_, i) => ({ id: i }));
  const istemci = sahteIstemci({ study_sessions: satirlar });
  const okunan = await tabloyuOku(istemci, "study_sessions");
  assert.equal(okunan.length, 2350, "büyük tablo kırpıldı");
  assert.equal((okunan[0] as { id: number }).id, 0);
  assert.equal((okunan[2349] as { id: number }).id, 2349, "son satır eksik");
});

test("tam 1000 satırlık tabloda sonsuz döngü olmaz", async () => {
  const istemci = sahteIstemci({
    quiz_results: Array.from({ length: 1000 }, (_, i) => ({ id: i })),
  });
  const okunan = await tabloyuOku(istemci, "quiz_results");
  assert.equal(okunan.length, 1000);
});

test("boş tablo sorun çıkarmaz", async () => {
  const okunan = await tabloyuOku(sahteIstemci({ feedback: [] }), "feedback");
  assert.deepEqual(okunan, []);
});

test("yedek her tablo için dosya ve doğru sayım üretir", async () => {
  const klasor = gecici();
  const veri = {
    study_sessions: [{ id: 1 }, { id: 2 }],
    topic_progress: [{ id: 3 }],
  };
  const ozet = await yedekAl(sahteIstemci(veri), klasor, [
    "study_sessions",
    "topic_progress",
  ]);
  assert.deepEqual(ozet.tablolar, { study_sessions: 2, topic_progress: 1 });
  assert.deepEqual(ozet.hata, {});
  assert.ok(fs.existsSync(path.join(klasor, "study_sessions.json")));
  assert.ok(fs.existsSync(path.join(klasor, "ozet.json")));
  const geri = JSON.parse(
    fs.readFileSync(path.join(klasor, "study_sessions.json"), "utf8"),
  );
  assert.deepEqual(geri, veri.study_sessions);
  fs.rmSync(klasor, { recursive: true, force: true });
});

test("bir tablo alınamazsa özet bunu SAKLAMAZ", async () => {
  // Sessizce eksik yedek en kötü sonuç: sahibi yedeği var sanır.
  const klasor = gecici();
  const ozet = await yedekAl(
    sahteIstemci({ study_sessions: [{ id: 1 }] }, { topic_progress: "izin yok" }),
    klasor,
    ["study_sessions", "topic_progress"],
  );
  assert.equal(ozet.tablolar.study_sessions, 1);
  assert.ok(ozet.hata.topic_progress, "hata özete yazılmadı");
  assert.ok(!("topic_progress" in ozet.tablolar), "başarısız tablo sayıma girdi");
  fs.rmSync(klasor, { recursive: true, force: true });
});

test("yabancı anahtar sırası doğru (yükleme bu sırayla yapılır)", () => {
  const s = (t: string) => TABLOLAR.indexOf(t);
  assert.ok(s("comp_seasons") < s("comp_ranks"), "comp_ranks sezondan önce");
  assert.ok(s("comp_seasons") < s("comp_trophies"), "comp_trophies sezondan önce");
  assert.ok(s("comp_matches") < s("comp_invites"), "comp_invites maçtan önce");
  assert.ok(
    s("comp_matches") < s("comp_match_answers"),
    "comp_match_answers maçtan önce",
  );
});

test("geçici tablolar yedeğe girmez", () => {
  for (const t of YEDEKLENMEYENLER) {
    assert.ok(!TABLOLAR.includes(t), `${t} yedeklenmemeli`);
  }
  // Sayaçlar ve kuyruk bir saat sonra anlamsız; yedeği şişirmesinler.
  assert.ok(YEDEKLENMEYENLER.includes("hiz_sayaci"));
  assert.ok(YEDEKLENMEYENLER.includes("comp_queue"));
});

test("öğrencinin çalışması mutlaka yedekleniyor", () => {
  // Kaybı en çok acıtan veri bu. Biri listeden düşerse test yakalasın.
  for (const t of [
    "study_sessions",
    "topic_progress",
    "quiz_results",
    "wrong_answers",
    "konu_tekrar",
    "user_badges",
  ]) {
    assert.ok(TABLOLAR.includes(t), `${t} yedek listesinde yok`);
  }
});

test("yedek → geri yükleme turu satırları aynen geri getirir", async () => {
  const klasor = gecici();
  const kaynak = {
    study_sessions: Array.from({ length: 1500 }, (_, i) => ({
      id: i,
      user_id: "u1",
      duration_seconds: i,
    })),
    topic_progress: [{ user_id: "u1", topic_id: "carpanlar", status: "done" }],
  };
  const tablolar = ["study_sessions", "topic_progress"];
  await yedekAl(sahteIstemci(kaynak), klasor, tablolar);

  // Boş bir "veritabanına" yükle
  const hedefVeri: Record<string, unknown[]> = {
    study_sessions: [],
    topic_progress: [],
  };
  const hedef = sahteIstemci(hedefVeri);
  for (const { tablo, satirlar } of yedegiOku(klasor, tablolar)) {
    await tabloyuYaz(hedef, tablo, satirlar as unknown[]);
  }

  assert.equal(hedefVeri.study_sessions.length, 1500, "satır sayısı tutmadı");
  assert.deepEqual(hedefVeri.study_sessions, kaynak.study_sessions);
  assert.deepEqual(hedefVeri.topic_progress, kaynak.topic_progress);
  fs.rmSync(klasor, { recursive: true, force: true });
});

test("eksik dosya yükleme sırasında çökertmez", () => {
  const klasor = gecici();
  fs.writeFileSync(path.join(klasor, "ozet.json"), "{}");
  const okunan = yedegiOku(klasor, ["study_sessions"]);
  assert.equal(okunan[0].satirlar, null, "olmayan dosya null dönmeli");
  fs.rmSync(klasor, { recursive: true, force: true });
});
