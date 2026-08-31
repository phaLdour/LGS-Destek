/**
 * Odak Modu fotoğrafları (öneri 10).
 *
 * Bu testlerin derdi tek bir soru: öğrencinin tarayıcısı hâlâ üçüncü
 * bir tarafa istek atıyor mu? Fotoğraflar kendi sunucumuza taşındıktan
 * sonra Unsplash'e giden yol yalnız bir GEÇİŞ YEDEĞİ olarak kaldı;
 * ilk tercih olarak geri dönerse gizlilik kazancı sessizce kaybolur.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { temalariOku } from "../tools/odak-fotograflarini-indir.mjs";

const KAYNAK = path.join(
  process.cwd(),
  "src",
  "components",
  "odak",
  "OdakTema.tsx",
);
const metin = fs.readFileSync(KAYNAK, "utf8");

test("indirme aracı bütün temaları bulur", () => {
  const t = temalariOku(metin);
  // Sekiz tema var; biri adresini kaybederse fotoğrafı hiç inmez ve
  // kimse fark etmez.
  assert.equal(t.length, 8, `bulunan tema sayısı: ${t.length}`);
  for (const { id, adres } of t) {
    assert.ok(id.length > 0, "tema kimliği boş");
    assert.ok(
      adres.startsWith("https://images.unsplash.com/"),
      `beklenmedik adres: ${adres}`,
    );
  }
});

test("her temanın kimliği benzersiz (dosya adları çakışmasın)", () => {
  const idler = temalariOku(metin).map((t) => t.id);
  assert.equal(new Set(idler).size, idler.length, "aynı kimlikli tema var");
});

test("İLK TERCİH kendi sunucumuz olmalı", () => {
  // Sıra bozulursa öğrenciler yine Unsplash'e istek atmaya başlar.
  const kendiIndeksi = metin.indexOf("`/odak/${bilgi.id}.webp`");
  const unsplashIndeksi = metin.indexOf("${bilgi.fotograf}?auto=format");
  assert.ok(kendiIndeksi > 0, "kendi sunucumuzdaki yol hiç kullanılmıyor");
  assert.ok(unsplashIndeksi > 0, "Unsplash yedeği kaybolmuş");
  assert.ok(
    kendiIndeksi < unsplashIndeksi,
    "Unsplash yolu kendi sunucumuzdan ÖNCE deneniyor",
  );
});

test("fotoğraf yüklenemezse ekran boş kalmaz", () => {
  // Çizim sahneleri her koşulda altta duruyor; fotoğraf yalnız üstüne
  // biniyor. Bu güvence kaybolursa ağ sorununda Odak Modu bomboş açılır.
  for (const sahne of [
    "<Orman />",
    "<Tapinak />",
    "<Okul />",
    "<Kutuphane />",
    "<Yagmur />",
    "<Gece />",
    "<Somine />",
    "<Sahil />",
  ]) {
    assert.ok(metin.includes(sahne), `çizim sahnesi kayıp: ${sahne}`);
  }
  assert.ok(metin.includes("onError"), "hata yakalama yok");
});

test("fotoğrafçı adları korunuyor (Unsplash lisansı)", () => {
  const kredili = metin.match(/kredi:\s*"[^"]+"/g) ?? [];
  assert.equal(kredili.length, 8, "bazı fotoğrafların kredisi silinmiş");
  for (const k of kredili) {
    assert.ok(k.length > 'kredi: ""'.length, "boş kredi alanı");
  }
});

test("public/odak indirildiyse her tema için dosya var", () => {
  // Klasör yoksa test sessizce geçer: indirme adımı ağı açık bir
  // makinede çalıştırılıyor, bu ortamda henüz yapılmamış olabilir.
  const klasor = path.join(process.cwd(), "public", "odak");
  if (!fs.existsSync(klasor)) return;
  const eksik: string[] = [];
  for (const { id } of temalariOku(metin)) {
    const dosya = path.join(klasor, `${id}.webp`);
    if (!fs.existsSync(dosya)) {
      eksik.push(id);
      continue;
    }
    // Küçücük dosya = bozuk indirme; sitede kırık resim çıkardı.
    assert.ok(
      fs.statSync(dosya).size > 10_000,
      `${id}.webp şüpheli derecede küçük`,
    );
  }
  assert.deepEqual(eksik, [], `indirilmemiş temalar: ${eksik.join(", ")}`);
});
