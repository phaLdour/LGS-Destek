/**
 * globals.css içindeki tema bloklarını src/lib/temalar.ts'ten ÜRETİR.
 * Elle düzenlenmez: palet değişince `node tools/tema-css-uret.mjs` çalıştır.
 *
 * Neden CSS'e yazıyoruz (JS ile uygulamak yerine)? Sayfa ilk boyandığı anda
 * doğru renkler yerinde olsun diye — tema yalnız `data-tema` özniteliğiyle
 * seçilir, renk hesabı tarayıcıya kalmaz, göz kırpması (FOUC) olmaz.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";

const kok = process.cwd();
const cikti = execSync(
  `npx tsx -e "const m=require('${kok}/src/lib/temalar');console.log(JSON.stringify(m.TEMALAR.map(t=>m.temaCssBlogu(t))))"`,
  { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
).trim();
const bloklar = JSON.parse(cikti.slice(cikti.indexOf("[")));

const BAS = "/* === TEMA BLOKLARI BAŞLANGIÇ (üretilmiştir, elle düzenleme) === */";
const SON = "/* === TEMA BLOKLARI BİTİŞ === */";
const govde = [BAS, ...bloklar, SON].join("\n\n");

const yol = `${kok}/src/app/globals.css`;
let css = fs.readFileSync(yol, "utf8");
if (css.includes(BAS)) {
  css = css.replace(
    new RegExp(`${BAS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${SON.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    govde,
  );
} else {
  css += `\n\n${govde}\n`;
}
fs.writeFileSync(yol, css);
console.log(`${bloklar.length} tema bloğu globals.css'e yazıldı.`);
