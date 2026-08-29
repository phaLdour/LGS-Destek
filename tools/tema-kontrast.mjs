/**
 * TEMA KONTRAST DENETİMİ (SİTE KURALI)
 *
 * "Yazılar, arkalarındaki renkle uyumlu ve okunaklı olacak."
 * Bu betik her temayı WCAG 2.1 kontrast oranıyla ölçer; kural ihlâli
 * varsa sıfırdan farklı kodla çıkar (derleme/paket öncesi çalıştırılır).
 *
 * Eşikler:
 *   metin/zemin            ≥ 4.5  (AA, normal boy yazı)
 *   yumuşak metin/kart     ≥ 4.5
 *   beyaz/koyu marka rengi ≥ 4.5  (bg-rehberim-navy üstündeki beyaz yazı)
 *   vurgu üstü mürekkep    ≥ 4.5  (bg-rehberim-accent üstündeki yazı)
 *   derin vurgu/kart       ≥ 4.5  (kart üstündeki turuncu/pembe yazı)
 *   kenarlık/kart          ≥ 1.4  (kart sınırı görünür olsun)
 *
 * Çalıştırma:  node tools/tema-kontrast.mjs
 */
import { execSync } from "node:child_process";

const cikti = execSync(
  `npx tsx -e "console.log(JSON.stringify(require('${process.cwd()}/src/lib/temalar').TEMALAR))"`,
  { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
).trim();
const TEMALAR = JSON.parse(cikti.slice(cikti.indexOf("[")));

function rgb(hex) {
  const h = hex.replace("#", "");
  const t = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(t, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function luminans(hex) {
  const [r, g, b] = rgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function oran(a, b) {
  const l1 = luminans(a);
  const l2 = luminans(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const KONTROLLER = [
  { ad: "metin / sayfa zemini", on: (r) => r.text, arka: (r) => r.bg, esik: 4.5 },
  { ad: "metin / kart", on: (r) => r.text, arka: (r) => r.surface, esik: 4.5 },
  { ad: "metin / ikincil zemin", on: (r) => r.text, arka: (r) => r.surface2, esik: 4.5 },
  { ad: "yumuşak metin / kart", on: (r) => r.textSoft, arka: (r) => r.surface, esik: 4.5 },
  { ad: "yumuşak metin / sayfa", on: (r) => r.textSoft, arka: (r) => r.bg, esik: 4.5 },
  { ad: "beyaz / marka zemini", on: () => "#ffffff", arka: (r) => r.navy, esik: 4.5 },
  { ad: "beyaz / koyu marka", on: () => "#ffffff", arka: (r) => r.navyDark, esik: 4.5 },
  { ad: "beyaz / açık marka", on: () => "#ffffff", arka: (r) => r.navyLight, esik: 4.5 },
  { ad: "mürekkep / vurgu zemini", on: (r) => r.onAccent, arka: (r) => r.accent, esik: 4.5 },
  { ad: "mürekkep / koyu vurgu", on: (r) => r.onAccent, arka: (r) => r.accentDark, esik: 4.5 },
  { ad: "derin vurgu / kart", on: (r) => r.accentDeep, arka: (r) => r.surface, esik: 4.5 },
  { ad: "kenarlık / kart", on: (r) => r.border, arka: (r) => r.surface, esik: 1.35 },
];

let hata = 0;
let uyari = 0;
for (const t of TEMALAR) {
  const satirlar = [];
  for (const k of KONTROLLER) {
    const o = oran(k.on(t.renkler), k.arka(t.renkler));
    if (o < k.esik) {
      hata++;
      satirlar.push(`   ✗ ${k.ad}: ${o.toFixed(2)} (gereken ${k.esik})`);
    } else if (o < k.esik * 1.1 && k.esik >= 4.5) {
      uyari++;
      satirlar.push(`   ~ ${k.ad}: ${o.toFixed(2)} (sınırda)`);
    }
  }
  const durum = satirlar.some((s) => s.includes("✗")) ? "HATA" : "tamam";
  console.log(`${t.emoji} ${t.ad.padEnd(16)} [${t.aile}] ${durum}`);
  satirlar.forEach((s) => console.log(s));
}
console.log(`\nSonuç: ${hata} kural ihlâli, ${uyari} sınırda değer, ${TEMALAR.length} tema.`);
process.exit(hata > 0 ? 1 : 0);
