/**
 * Çevrimdışı ders paketi (`src/lib/cevrimdisiVeri.ts`).
 *
 * Buradaki testlerin derdi tek bir soru: internet gidince öğrencinin
 * elinde gerçekten çalışılabilir bir şey kalıyor mu? Paket boşsa ya da
 * yanlışlıkla kişisel/ağır bir şey taşıyorsa özellik amacını yitirir.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { cevrimdisiPaketiUret } from "@/lib/cevrimdisiVeri";
import { getAllSubjects } from "@/content";

const paket = cevrimdisiPaketiUret();

test("paket bütün dersleri ve konuları taşır", () => {
  const dersler = getAllSubjects();
  assert.equal(paket.dersler.length, dersler.length);
  const beklenen = dersler.reduce((t, d) => t + d.topics.length, 0);
  assert.equal(paket.konuSayisi, beklenen);
  assert.ok(paket.konuSayisi >= 40, `konu sayısı beklenmedik: ${paket.konuSayisi}`);
});

test("her konunun en az bir çalışılabilir bölümü var", () => {
  // Bölümsüz bir konu çevrimdışı listede görünür ama açılınca boş
  // çıkardı — öğrenci için "bozuk" demektir.
  const bos: string[] = [];
  for (const d of paket.dersler) {
    for (const k of d.konular) {
      const doluMu =
        Boolean(k.makale) ||
        Boolean(k.kartlar?.length) ||
        Boolean(k.test?.length) ||
        Boolean(k.ipuclari?.length) ||
        Boolean(k.harita);
      if (!doluMu) bos.push(`${d.slug}/${k.id}`);
    }
  }
  assert.deepEqual(bos, [], `içeriksiz konular: ${bos.join(", ")}`);
});

test("konu adı ve özeti her zaman dolu", () => {
  for (const d of paket.dersler) {
    for (const k of d.konular) {
      assert.ok(k.ad.trim().length > 0, `${d.slug}/${k.id}: ad boş`);
      assert.ok(k.ozet.trim().length > 0, `${d.slug}/${k.id}: özet boş`);
    }
  }
});

test("VİDEO paketin içine SIZMAZ (veri paketi yanmasın)", () => {
  // MP4'ler yüzlerce MB; kazara eklenirse öğrencinin kotası biter.
  const metin = JSON.stringify(paket);
  assert.ok(!metin.includes(".mp4"), "pakette video adresi var");
  assert.ok(!metin.includes("youtubeId"), "pakette YouTube kimliği var");
  for (const d of paket.dersler) {
    for (const k of d.konular) {
      assert.ok(!("video" in k), `${d.slug}/${k.id}: video alanı var`);
    }
  }
});

test("paket makul boyutta kalır (telefonda indirilebilir olmalı)", () => {
  const kb = JSON.stringify(paket).length / 1024;
  // Şu an ~620 KB. 2 MB'ı aşarsa mobil veriyle indirmek zorlaşır ve
  // "tek tuşla hepsini indir" tasarımı gözden geçirilmeli.
  assert.ok(kb < 2048, `paket çok büyüdü: ${Math.round(kb)} KB`);
  assert.ok(kb > 100, `paket şüpheli derecede küçük: ${Math.round(kb)} KB`);
});

test("sürüm aynı içerik için aynı, değişince başka", () => {
  // Sürüm, "güncelleme var mı" sorusunun tek cevabı; kararsız olursa
  // öğrenciye her açılışta boş yere "güncelle" denir.
  const ikinci = cevrimdisiPaketiUret();
  assert.equal(paket.surum, ikinci.surum, "aynı içerik farklı sürüm üretti");
  assert.ok(paket.surum.length > 0);
});

test("test soruları dört şıklı ve doğru cevabı geçerli", () => {
  for (const d of paket.dersler) {
    for (const k of d.konular) {
      for (const [i, s] of (k.test ?? []).entries()) {
        assert.ok(
          s.options.length >= 2,
          `${d.slug}/${k.id} #${i}: şık sayısı ${s.options.length}`,
        );
        assert.ok(
          s.correctIndex >= 0 && s.correctIndex < s.options.length,
          `${d.slug}/${k.id} #${i}: doğru şık aralık dışı`,
        );
      }
    }
  }
});

test("paket yalnız içerik taşır — kişisel alan yok", () => {
  // Sayfa ve veri service worker tarafından SAKLANIYOR. İçine bir gün
  // kullanıcı alanı eklenirse, saklanan kopya aynı telefonu kullanan
  // başkasının eline geçebilir. Bu test o günü yakalamak için var.
  const yasakli = ["user_id", "userId", "email", "e-posta", "auth", "token"];
  const metin = JSON.stringify(paket.dersler);
  for (const kelime of yasakli) {
    assert.ok(
      !metin.includes(`"${kelime}"`),
      `pakette kişisel görünen alan: ${kelime}`,
    );
  }
});
