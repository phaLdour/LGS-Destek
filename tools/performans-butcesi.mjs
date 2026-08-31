#!/usr/bin/env node
/**
 * PERFORMANS BÜTÇESİ (öneri 11)
 *
 * NEDEN VAR: bu oturumda gerçek bir örneği yaşandı. Çevrimdışı sayfası
 * ilk hâlinde 270 kB "First Load JS" ile çıktı, çünkü istemci bileşeni
 * yanlışlıkla 620 KB'lık ders içeriğini paketine sürüklüyordu. Sadece
 * derleme çıktısına dikkatle baktığım için fark edildi. Bir dahakine
 * kimse bakmayabilir.
 *
 * Öğrencilerin çoğu telefonda ve mobil veride. Sayfa ağırlığı sessizce
 * büyüdüğünde kimse şikâyet etmez — site yavaşlar, çocuk sıkılır,
 * bırakır. Sayı olmayan şey yönetilemez.
 *
 * NASIL ÖLÇÜYOR: `.next/app-build-manifest.json` her rota için yüklenen
 * JS parçalarını listeler. Parçalar TEKİLLEŞTİRİLİP gzip'li boyutları
 * toplanır — tarayıcıya giden gerçek bayt bu. (Next'in kendi tablosu da
 * aynı mantıkla çalışır; sayılar birkaç kB oynayabilir.)
 *
 * NEDEN postbuild: bütçe ancak derleme çıktısı varken ölçülebilir.
 * `npm run build` bittikten sonra otomatik çalışır ve aşım varsa
 * SIFIRDAN FARKLI kodla çıkar — Vercel dağıtımı durur.
 *
 * KULLANIM:
 *   node tools/performans-butcesi.mjs          — bütçeyi denetle
 *   node tools/performans-butcesi.mjs yaz      — mevcut değerleri kaydet
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEXT = path.join(KOK, ".next");
const BUTCE_DOSYASI = path.join(KOK, "performans-butcesi.json");

/**
 * Varsayılan tavan (kB, gzip'li). Şu an en ağır rotalar ~200 kB.
 * 260, "biraz büyümesine izin var ama iki katına çıkamaz" demek.
 */
const VARSAYILAN_TAVAN_KB = 260;

/** Bir dosyanın gzip'li boyutu (bayt). */
function gzipBoyutu(dosya) {
  return zlib.gzipSync(fs.readFileSync(dosya), { level: 9 }).length;
}

/**
 * Rota → ilk yükte inen benzersiz JS parçalarının gzip toplamı (kB).
 * @returns {Record<string, number>}
 */
export function rotaAgirliklari(nextDizini = NEXT) {
  const manifest = path.join(nextDizini, "app-build-manifest.json");
  if (!fs.existsSync(manifest)) {
    throw new Error(
      "Derleme çıktısı yok. Önce `npm run build` çalıştırılmalı.",
    );
  }
  const { pages } = JSON.parse(fs.readFileSync(manifest, "utf8"));
  const onbellek = new Map();
  /** @type {Record<string, number>} */
  const cikti = {};

  for (const [sayfa, parcalar] of Object.entries(pages)) {
    // Yalnız GERÇEK SAYFALAR ölçülür.
    //  - /api/... route handler'dır, tarayıcıya JS göndermez; listede
    //    görünen ~100 kB paylaşılan sunucu çalışma zamanıdır ve bütçeyi
    //    anlamsız sayılarla doldururdu.
    //  - layout/loading/error kendi başına bir sayfa değildir; ağırlıkları
    //    zaten ait oldukları sayfanın listesinde yer alır.
    if (!sayfa.endsWith("/page")) continue;
    if (sayfa.startsWith("/api/")) continue;

    // Aynı parça birden çok kez listelenebilir; tarayıcı bir kez indirir.
    const benzersiz = [...new Set(parcalar)];
    let toplam = 0;
    for (const p of benzersiz) {
      if (!p.endsWith(".js")) continue;
      if (!onbellek.has(p)) {
        const tam = path.join(nextDizini, p);
        onbellek.set(p, fs.existsSync(tam) ? gzipBoyutu(tam) : 0);
      }
      toplam += onbellek.get(p);
    }
    cikti[rotaAdi(sayfa)] = Math.round(toplam / 1024);
  }
  return cikti;
}

/** "/cevrimdisi/page" → "/cevrimdisi" */
function rotaAdi(sayfa) {
  const r = sayfa.replace(/\/(page|route|layout|loading|error)$/, "");
  return r === "" ? "/" : r;
}

function butceOku() {
  if (!fs.existsSync(BUTCE_DOSYASI)) {
    return { tavanKB: VARSAYILAN_TAVAN_KB, rotalar: {} };
  }
  return JSON.parse(fs.readFileSync(BUTCE_DOSYASI, "utf8"));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const komut = process.argv[2] ?? "denetle";
  const butce = butceOku();
  const agirliklar = rotaAgirliklari();

  if (komut === "yaz") {
    // Ölçülen değerleri kaydeder. Bilinçli bir büyümeden sonra
    // "yeni normal" bu diyebilmek için.
    fs.writeFileSync(
      BUTCE_DOSYASI,
      JSON.stringify(
        { tavanKB: butce.tavanKB ?? VARSAYILAN_TAVAN_KB, rotalar: agirliklar },
        null,
        2,
      ) + "\n",
      "utf8",
    );
    console.log(`${Object.keys(agirliklar).length} rota kaydedildi.`);
    process.exit(0);
  }

  const tavan = butce.tavanKB ?? VARSAYILAN_TAVAN_KB;
  const asanlar = [];
  const buyuyenler = [];

  for (const [rota, kb] of Object.entries(agirliklar)) {
    if (kb > tavan) asanlar.push({ rota, kb });
    const onceki = butce.rotalar?.[rota];
    // %25'ten fazla büyüme, tavanın altında olsa bile şüphelidir:
    // genellikle bir şeyin yanlışlıkla pakete girdiği anlamına gelir.
    if (typeof onceki === "number" && onceki > 20 && kb > onceki * 1.25) {
      buyuyenler.push({ rota, onceki, kb });
    }
  }

  const enAgir = Object.entries(agirliklar)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  console.log(`Performans bütçesi — tavan ${tavan} kB (gzip'li ilk yük)\n`);
  console.log("En ağır 5 rota:");
  for (const [rota, kb] of enAgir) {
    console.log(`  ${String(kb).padStart(4)} kB  ${rota}`);
  }

  if (buyuyenler.length) {
    console.error("\nBEKLENMEDİK BÜYÜME:");
    for (const b of buyuyenler) {
      console.error(
        `  ${b.rota}: ${b.onceki} kB → ${b.kb} kB (%${Math.round((b.kb / b.onceki - 1) * 100)})`,
      );
    }
  }

  if (asanlar.length) {
    console.error("\nBÜTÇE AŞILDI:");
    for (const a of asanlar) {
      console.error(`  ${a.rota}: ${a.kb} kB > ${tavan} kB`);
    }
  }

  if (asanlar.length || buyuyenler.length) {
    console.error(`
Ne yapmalı:
  - Sayfaya yanlışlıkla ağır bir modül girmiş olabilir. En sık sebep:
    bir istemci bileşeninin @/content gibi büyük bir modülden sabit
    çekmesi (bkz. src/lib/cevrimdisiYollar.ts'in var olma sebebi).
  - Büyüme bilinçliyse yeni değerleri kaydet:
      node tools/performans-butcesi.mjs yaz
`);
    process.exit(1);
  }

  console.log("\nBütçe içinde.");
}
