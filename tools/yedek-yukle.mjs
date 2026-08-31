#!/usr/bin/env node
/**
 * YEDEĞİ GERİ YÜKLEME (öneri 8)
 *
 * Denenmemiş yedek, yedek değildir. Bu betik `tools/yedek-al.mjs` ile
 * alınmış bir klasörü boş bir veritabanına geri yükler.
 *
 * SIRA: şema ÖNCE uygulanmalı (Supabase SQL Editor → schema.sql).
 * Bu betik yalnız SATIRLARI yazar, tablo yaratmaz.
 *
 * TABLO SIRASI: yedek-al.mjs'teki TABLOLAR dizisi yabancı anahtar
 * bağımlılıklarına göre sıralıdır (comp_seasons → comp_ranks gibi).
 * Ters sırada yüklemek yabancı anahtar hatası verir; o yüzden aynı
 * diziyi kullanıyoruz.
 *
 * KULLANIM:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     node tools/yedek-yukle.mjs <yedek-klasoru> --onayla
 *
 * `--onayla` olmadan yalnız ne yapacağını yazar, hiçbir şey yazmaz.
 * Geri yükleme üstüne yazan bir işlem; yanlışlıkla çalıştırılmamalı.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { TABLOLAR } from "./yedek-al.mjs";

const TOPLU = 500;

/** Bir tablonun satırlarını parça parça yazar. */
export async function tabloyuYaz(istemci, tablo, satirlar) {
  if (satirlar.length === 0) return 0;
  let yazilan = 0;
  for (let i = 0; i < satirlar.length; i += TOPLU) {
    const dilim = satirlar.slice(i, i + TOPLU);
    // upsert: yükleme yarıda kalıp tekrar çalıştırılırsa çift kayıt
    // oluşmasın. Felaket ânında betiği iki kez çalıştırmak çok olası.
    const { error } = await istemci.from(tablo).upsert(dilim);
    if (error) throw new Error(`${tablo}: ${error.message}`);
    yazilan += dilim.length;
  }
  return yazilan;
}

export function yedegiOku(klasor, tablolar = TABLOLAR) {
  const cikti = [];
  for (const tablo of tablolar) {
    const dosya = path.join(klasor, `${tablo}.json`);
    if (!fs.existsSync(dosya)) {
      cikti.push({ tablo, satirlar: null });
      continue;
    }
    cikti.push({
      tablo,
      satirlar: JSON.parse(fs.readFileSync(dosya, "utf8")),
    });
  }
  return cikti;
}

// Üst düzey `await` tsx'in CJS çıktısında desteklenmiyor (testler bu
// dosyayı import ediyor); komut satırı bölümü async fonksiyona sarılı.
if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
  const klasor = process.argv[2];
  const onayli = process.argv.includes("--onayla");
  if (!klasor) {
    console.error("Kullanım: node tools/yedek-yukle.mjs <yedek-klasoru> --onayla");
    process.exit(1);
  }
  if (!fs.existsSync(path.join(klasor, "ozet.json"))) {
    console.error(`${klasor} bir yedek klasörü değil (ozet.json yok).`);
    process.exit(1);
  }

  const ozet = JSON.parse(
    fs.readFileSync(path.join(klasor, "ozet.json"), "utf8"),
  );
  console.log(`Yedek tarihi: ${ozet.alinma}\n`);

  const icerik = yedegiOku(klasor);
  for (const { tablo, satirlar } of icerik) {
    console.log(
      satirlar === null
        ? `  (dosya yok)     ${tablo}`
        : `  ${String(satirlar.length).padStart(7)} satır  ${tablo}`,
    );
  }

  if (!onayli) {
    console.log(
      "\nHiçbir şey yazılmadı. Gerçekten yüklemek için sonuna --onayla ekle.",
    );
    console.log("ÖNCE şemanın uygulanmış olduğundan emin ol (schema.sql).");
    process.exit(0);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.",
    );
    process.exit(1);
  }
  const istemci = createClient(url, anahtar, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("\nYükleniyor...\n");
  let toplam = 0;
  for (const { tablo, satirlar } of icerik) {
    if (satirlar === null) continue;
    try {
      const n = await tabloyuYaz(istemci, tablo, satirlar);
      toplam += n;
      console.log(`  ${String(n).padStart(7)} satır  ${tablo}`);
    } catch (e) {
      console.error(`  HATA            ${tablo}: ${e.message ?? e}`);
      console.error(
        "\nYükleme durdu. Sonraki tablolar bu tabloya bağlı olabilir.",
      );
      process.exit(1);
    }
  }
  console.log(`\nToplam ${toplam} satır yüklendi.`);
  })();
}
