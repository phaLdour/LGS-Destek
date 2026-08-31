#!/usr/bin/env node
/**
 * ŞEMA GÖÇ DEFTERİ (öneri 7)
 *
 * SORUN: `supabase/schema.sql` tek parça, 4000 satır ve elle
 * uygulanıyor. Üç şey sessizce ters gidebiliyordu:
 *
 *   A) Bir faz üretime hiç uygulanmadı → özellik sessizce çalışmıyor.
 *      (Bu oturumda tam olarak bunun bir akrabası yaşandı.)
 *   B) Uygulanmış bir faz sonradan düzenlendi ve yeniden uygulanmadı →
 *      üretimdeki sürüm dosyadakinden farklı, kimsenin haberi yok.
 *   C) "Üretimde şu an ne var?" sorusunun cevabı hiçbir yerde yazmıyor.
 *
 * ÇÖZÜM: her FAZ bloğunun sonuna bir satır konur —
 *
 *     select public.sema_faz_kaydet('<faz>', '<parmak izi>');
 *
 * Blok üretimde çalıştığında kendini deftere yazar. Parmak izi bloğun
 * içeriğinden hesaplanır (kayıt satırı hariç), böylece blok değişince
 * parmak izi de değişir.
 *
 * NEDEN NUMARALI GÖÇ DOSYALARINA BÖLMEDİK: mevcut akış "dosyanın
 * tamamını SQL Editor'e yapıştır" ve çalışıyor; şema her yerinde
 * idempotent. Onlarca dosyaya bölmek, teknik olmayan bir sahip için
 * yeni bir hata kaynağı olurdu. Defter, bölmenin faydasını (ne
 * uygulandı?) bölmenin maliyeti olmadan veriyor.
 *
 * KULLANIM:
 *   node tools/sema-fazlari.mjs liste     — fazları ve parmak izlerini yaz
 *   node tools/sema-fazlari.mjs damgala   — eksik/eskimiş kayıt satırlarını düzelt
 *   node tools/sema-fazlari.mjs kontrol   — damgalar güncel mi? (CI/prebuild)
 *   node tools/sema-fazlari.mjs cikar <faz>  — yalnız o fazın SQL'ini bas
 *   node tools/sema-fazlari.mjs denetim   — üretimde ne var? sorgusunu bas
 */
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEMA = path.join(KOK, "supabase", "schema.sql");

const KAYIT_ONEKI = "select public.sema_faz_kaydet(";
/** Damga dipnotunun yorum satirlari. Parmak izine GİRMEZ; girseydi
 *  damga eklemek parmak izini degistirir, damga hemen eskimis olurdu. */
const DIPNOT_ONEKI = "-- @gecis";
const BASLIK = /^-- FAZ .+$/;
/** Başlığın üstündeki süsleme çizgisi de bloğa dahildir. */
const CIZGI = /^-- ═+$/;

/** Bloğun kimliği: başlık satırının kendisi (hepsi benzersiz). */
function kimlik(baslik) {
  return baslik.replace(/^--\s*/, "").trim();
}

function parmakIzi(govde) {
  // Kayıt satırı hariç tutulur, yoksa parmak izi kendine bağlı olurdu.
  const temiz = govde
    .split("\n")
    .filter((s) => !s.startsWith(KAYIT_ONEKI) && !s.startsWith(DIPNOT_ONEKI))
    .join("\n")
    .trim();
  return crypto.createHash("sha256").update(temiz).digest("hex").slice(0, 16);
}

/**
 * @typedef {object} Blok
 * @property {string} id      Blok kimliği (başlık satırı ya da "TEMEL")
 * @property {number} bas     Başlangıç satırı (0 tabanlı)
 * @property {number} son     Bitiş satırı (hariç)
 * @property {string} govde   Bloğun ham SQL'i
 * @property {string} parmak  İçeriğin parmak izi (damga satırları hariç)
 */

/**
 * Dosyayı bloklara ayırır. İlk blok "TEMEL" (fazlardan önceki her şey).
 * @param {string} metin
 * @returns {Blok[]}
 */
export function bloklariAyir(metin) {
  const satirlar = metin.split("\n");
  const baslangiclar = [];
  for (let i = 0; i < satirlar.length; i++) {
    if (BASLIK.test(satirlar[i])) {
      // Üstündeki çizgi(ler) bloğa dahil olsun — kesip yapıştırınca
      // başlık görsel olarak bütün kalsın.
      let bas = i;
      if (bas > 0 && CIZGI.test(satirlar[bas - 1])) bas--;
      baslangiclar.push({ bas, basSatir: i });
    }
  }

  const bloklar = [];
  if (baslangiclar.length === 0 || baslangiclar[0].bas > 0) {
    const son = baslangiclar.length ? baslangiclar[0].bas : satirlar.length;
    bloklar.push({
      id: "TEMEL",
      bas: 0,
      son,
      govde: satirlar.slice(0, son).join("\n"),
    });
  }
  for (let i = 0; i < baslangiclar.length; i++) {
    const bas = baslangiclar[i].bas;
    const son =
      i + 1 < baslangiclar.length ? baslangiclar[i + 1].bas : satirlar.length;
    bloklar.push({
      id: kimlik(satirlar[baslangiclar[i].basSatir]),
      bas,
      son,
      govde: satirlar.slice(bas, son).join("\n"),
    });
  }
  for (const b of bloklar) b.parmak = parmakIzi(b.govde);
  return bloklar;
}

function kayitSatiri(b) {
  const id = b.id.replace(/'/g, "''");
  return `${KAYIT_ONEKI}'${id}', '${b.parmak}');`;
}

/** Bloğun mevcut kayıt satırı (varsa). */
function mevcutKayit(govde) {
  return govde.split("\n").find((s) => s.startsWith(KAYIT_ONEKI)) ?? null;
}

function oku() {
  return fs.readFileSync(SEMA, "utf8");
}

// ── komutlar ────────────────────────────────────────────────────────

function liste() {
  const bloklar = bloklariAyir(oku());
  for (const b of bloklar) {
    const k = mevcutKayit(b.govde);
    const durum = !k ? "DAMGASIZ" : k.includes(b.parmak) ? "güncel" : "ESKİMİŞ";
    const satir = b.son - b.bas;
    console.log(
      `${b.parmak}  ${String(satir).padStart(5)} satır  ${durum.padEnd(9)} ${b.id}`,
    );
  }
  console.log(`\n${bloklar.length} blok.`);
}

function damgala() {
  const metin = oku();
  const bloklar = bloklariAyir(metin);
  const satirlar = metin.split("\n");
  let degisen = 0;

  // Sondan başa: satır indeksleri kaymasın.
  for (let i = bloklar.length - 1; i >= 0; i--) {
    const b = bloklar[i];
    const yeni = kayitSatiri(b);
    const dilim = satirlar.slice(b.bas, b.son);
    const idx = dilim.findIndex((s) => s.startsWith(KAYIT_ONEKI));

    if (idx >= 0) {
      if (dilim[idx] === yeni) continue;
      satirlar[b.bas + idx] = yeni;
    } else {
      // Bloğun sonundaki boş satırların önüne ekle.
      let son = b.son;
      while (son > b.bas && satirlar[son - 1].trim() === "") son--;
      satirlar.splice(
        son,
        0,
        "",
        `${DIPNOT_ONEKI} Bu blok uygulandığında kendini göç defterine yazar.`,
        `${DIPNOT_ONEKI} Elle düzenlemeyin: node tools/sema-fazlari.mjs damgala`,
        yeni,
      );
    }
    degisen++;
  }

  if (degisen) fs.writeFileSync(SEMA, satirlar.join("\n"), "utf8");
  console.log(
    degisen ? `${degisen} blok damgalandı.` : "Tüm damgalar zaten güncel.",
  );
}

function kontrol() {
  const bloklar = bloklariAyir(oku());
  const sorunlar = [];
  for (const b of bloklar) {
    const k = mevcutKayit(b.govde);
    if (!k) sorunlar.push(`DAMGASIZ  ${b.id}`);
    else if (!k.includes(b.parmak))
      sorunlar.push(`ESKİMİŞ   ${b.id} (blok değişti, damga güncellenmedi)`);
  }
  if (sorunlar.length) {
    console.error("Şema göç damgaları güncel değil:\n");
    for (const s of sorunlar) console.error("  " + s);
    console.error("\nDüzeltmek için: node tools/sema-fazlari.mjs damgala");
    process.exit(1);
  }
  console.log(`Şema damgaları güncel (${bloklar.length} blok).`);
}

function cikar(hedef) {
  const bloklar = bloklariAyir(oku());
  const bulunan = bloklar.filter((b) =>
    b.id.toLowerCase().includes(String(hedef).toLowerCase()),
  );
  if (bulunan.length === 0) {
    console.error(`Faz bulunamadı: ${hedef}`);
    console.error("Mevcut fazlar:");
    for (const b of bloklar) console.error("  " + b.id);
    process.exit(1);
  }
  if (bulunan.length > 1) {
    console.error(`"${hedef}" birden çok faza uyuyor:`);
    for (const b of bulunan) console.error("  " + b.id);
    process.exit(1);
  }
  process.stdout.write(bulunan[0].govde);
}

function denetim() {
  const bloklar = bloklariAyir(oku());
  const satirlar = bloklar
    .map((b) => `    ('${b.id.replace(/'/g, "''")}', '${b.parmak}')`)
    .join(",\n");
  console.log(`-- Üretimdeki şema, dosyadaki şemayla aynı mı?
-- Supabase SQL Editor'e yapıştırıp çalıştır.
with dosyadaki(faz, parmak) as (
  values
${satirlar}
)
select
  d.faz,
  case
    when u.faz is null            then 'UYGULANMADI'
    when u.parmak_izi <> d.parmak then 'ESKİ SÜRÜM'
    else 'güncel'
  end as durum,
  u.uygulanma
from dosyadaki d
left join public.sema_gecisleri u on u.faz = d.faz
order by case
  when u.faz is null then 0
  when u.parmak_izi <> d.parmak then 1
  else 2
end, d.faz;`);
}

const komut = process.argv[2] ?? "liste";
const komutlar = { liste, damgala, kontrol, cikar, denetim };
if (!komutlar[komut]) {
  console.error(`Bilinmeyen komut: ${komut}`);
  console.error("Kullanım: liste | damgala | kontrol | cikar <faz> | denetim");
  process.exit(1);
}
komutlar[komut](process.argv[3]);
