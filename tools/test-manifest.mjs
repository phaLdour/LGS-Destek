/**
 * manifest.json ve ikon dosyaları için hızlı doğrulama.
 *
 * Neden: telefonda iki gözle görülür hata çıkmıştı ve ikisi de sessizce
 * geri gelebilecek türden:
 *   1. Açılış (splash) ekranında logonun altında uzun başlık yazıyordu —
 *      `name` alanı marka adı olmalı.
 *   2. Aynı kenardan-kenara ikon hem "any" hem "maskable" gösteriliyordu;
 *      Android maskable ikonu kırpınca logo kesik/kaymış görünüyordu —
 *      maskable AYRI, kenar payı olan bir dosya olmalı.
 *
 * Çalıştır: npm run test:manifest
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(kok, "public/manifest.json"), "utf8"),
);

let gecti = 0;
const kaldi = [];
function kontrol(ad, sart) {
  if (sart) {
    gecti++;
    console.log("  GEÇTİ  " + ad);
  } else {
    kaldi.push(ad);
    console.log("  KALDI  " + ad);
  }
}

console.log("\nmanifest.json");
kontrol(
  'splash ekraninda yalniz marka adi yazar (name = "Rehberim")',
  manifest.name === "Rehberim",
);
kontrol("short_name da marka adi", manifest.short_name === "Rehberim");
kontrol(
  "uzun tanitim metni description alaninda duruyor",
  typeof manifest.description === "string" && manifest.description.length > 40,
);
kontrol("id sabitlenmis (kurulum kopmasin)", typeof manifest.id === "string");
kontrol("standalone modda aciliyor", manifest.display === "standalone");
kontrol(
  "magaza surumu onerisi kapali",
  manifest.prefer_related_applications === false,
);

console.log("\nikonlar");
const ikonlar = manifest.icons ?? [];
const maskable = ikonlar.filter((i) => (i.purpose ?? "").includes("maskable"));
const normal = ikonlar.filter((i) => (i.purpose ?? "any").includes("any"));

kontrol("en az bir maskable ikon var", maskable.length >= 1);
kontrol(
  "maskable ikon, normal ikondan AYRI bir dosya",
  maskable.every((m) => !normal.some((n) => n.src === m.src)),
);
kontrol(
  "512px normal ikon var (splash ekrani icin)",
  normal.some((i) => (i.sizes ?? "").includes("512")),
);
kontrol(
  "192px normal ikon var (ana ekran kisayolu icin)",
  normal.some((i) => (i.sizes ?? "").includes("192")),
);

for (const i of ikonlar) {
  if (!i.src.startsWith("/")) continue;
  kontrol(
    `dosya gercekten var: ${i.src}`,
    fs.existsSync(path.join(kok, "public", i.src.slice(1))),
  );
}

console.log("\ncevrimdisi ekrani");
kontrol(
  "public/offline.html var",
  fs.existsSync(path.join(kok, "public/offline.html")),
);
const offline = fs.readFileSync(path.join(kok, "public/offline.html"), "utf8");
kontrol(
  "cevrimdisi ekrani disaridan dosya cekmiyor (internetsiz de acilmali)",
  !/<script\s+src=|<link[^>]+rel=["']stylesheet/i.test(offline),
);

console.log("\nmarka isareti");
const favicon = fs.readFileSync(path.join(kok, "public/favicon.svg"), "utf8");
kontrol(
  "favicon.svg uretilmis (elle duzenlenmemis)",
  favicon.includes("ikon-uret.py"),
);
// Ok ucu ucgeni govde eksenine SIMETRIK olmali. Eski surumde degildi:
// tepe eksenden 2.8 sapmisti, taban koseleri -14.8 / +9.9 idi.
const ucgen = favicon.match(
  /M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+) Z/,
);
kontrol("ok ucu ucgeni okunabiliyor", ucgen !== null);
if (ucgen) {
  const [tx, ty, ax, ay, bx, by] = ucgen.slice(1).map(Number);
  // Gövde ekseni 45 derece: yon (1,-1)/sqrt2, dik (1,1)/sqrt2
  const k = Math.SQRT1_2;
  const merkez = favicon.match(/<circle cx="([\d.]+)" cy="([\d.]+)" r="[\d.]+" fill="none"/);
  const cx = Number(merkez?.[1] ?? 100);
  const cy = Number(merkez?.[2] ?? 100);
  const sapma = (x, y) => (x - cx) * k + (y - cy) * k;
  kontrol(
    `tepe noktasi eksende (sapma ${sapma(tx, ty).toFixed(2)})`,
    Math.abs(sapma(tx, ty)) < 0.05,
  );
  kontrol(
    `taban koseleri simetrik (${sapma(ax, ay).toFixed(2)} / ${sapma(bx, by).toFixed(2)})`,
    Math.abs(sapma(ax, ay) + sapma(bx, by)) < 0.05,
  );
}

console.log(`\n===== ${gecti} geçti, ${kaldi.length} kaldı =====`);
if (kaldi.length) {
  console.log("Kalanlar:\n  - " + kaldi.join("\n  - "));
  process.exit(1);
}
