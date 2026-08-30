/**
 * Test koşucusu — testleri kendisi bulup çalıştırır.
 *
 * NEDEN VAR: `package.json` eskiden şunu çağırıyordu:
 *     tsx --test "tests/**​/*.test.ts"
 * Bu, joker (glob) desenini Node'un genişletmesine güveniyor. Node 22'de
 * çalışır, Node 20'de ÇALIŞMAZ — desen düz bir dosya adı sanılır:
 *     Could not find '/home/runner/.../tests/**​/*.test.ts'
 * Yerelde Node 22 olduğu için testler geçiyor, GitHub Actions Node 20
 * kullandığı için derleme kırılıyordu. Artık dosyaları burada
 * buluyoruz; koşucu Node sürümünden bağımsız.
 */

import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { dirname } from "node:path";

const kok = dirname(dirname(fileURLToPath(import.meta.url)));
const testKoku = join(kok, "tests");

/** tests/ altındaki tüm *.test.ts dosyaları (alt klasörler dahil). */
function testleriBul(dizin) {
  const bulunan = [];
  for (const ad of readdirSync(dizin).sort()) {
    const tam = join(dizin, ad);
    if (statSync(tam).isDirectory()) {
      bulunan.push(...testleriBul(tam));
    } else if (ad.endsWith(".test.ts") || ad.endsWith(".test.mts")) {
      bulunan.push(tam);
    }
  }
  return bulunan;
}

let dosyalar;
try {
  dosyalar = testleriBul(testKoku);
} catch {
  console.error("tests/ klasörü bulunamadı.");
  process.exit(1);
}

if (dosyalar.length === 0) {
  console.error("tests/ içinde hiç test dosyası yok — bu beklenmiyor.");
  process.exit(1);
}

console.log(`${dosyalar.length} test dosyası bulundu:`);
for (const d of dosyalar) console.log("  · " + relative(kok, d));
console.log("");

// tsx'i doğrudan çağır: `npx` ağa çıkmaya çalışabilir, CI'da gereksiz risk.
const tsx = join(kok, "node_modules", ".bin", process.platform === "win32" ? "tsx.cmd" : "tsx");
const sonuc = spawnSync(tsx, ["--test", ...dosyalar], {
  stdio: "inherit",
  cwd: kok,
});

process.exit(sonuc.status ?? 1);
