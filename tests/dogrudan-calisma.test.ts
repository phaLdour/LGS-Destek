/**
 * "Doğrudan mı çalıştırıldı?" kontrolü (`tools/dogrudan-calisma.mjs`).
 *
 * GERÇEK BİR HATADAN DOĞDU. Araç betikleri şu kalıbı kullanıyordu:
 *
 *     if (import.meta.url === `file://${process.argv[1]}`)
 *
 * Linux'ta çalışıyor, WINDOWS'TA ÇALIŞMIYOR — ve çalışmadığında hata
 * vermiyor, çıkış kodu 0 ile sessizce bitiyor. Sahibi `YEDEK-AL.bat`
 * dosyasını çalıştırdı, "YEDEK TAMAM" yazısını gördü, klasör bomboştu.
 *
 * Buradaki testler o sessizliği kalıcıya bağlıyor: geliştirme Linux'ta
 * yapıldığı için bu hata bir daha çıkarsa YİNE fark edilmezdi.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  dogrudanMiCalisiyor,
  win32YolaUrl,
} from "../tools/dogrudan-calisma.mjs";

test("Windows yolu tanınır (asıl hatanın kendisi)", () => {
  // Windows'ta argv[1] ters eğik çizgili ve sürücü harfli gelir.
  const argv1 = "C:\\Users\\PC1\\Desktop\\LGS-Destek\\tools\\yedek-al.mjs";
  const metaUrl = "file:///C:/Users/PC1/Desktop/LGS-Destek/tools/yedek-al.mjs";
  // Linux'ta pathToFileURL Windows gibi davranmaz (ters eğik çizgi
  // burada ayraç değil), o yüzden win32 karşılığı enjekte ediliyor.
  assert.equal(
    dogrudanMiCalisiyor(metaUrl, argv1, win32YolaUrl),
    true,
    "Windows'ta betik kendini çalıştırılmış saymıyor — sessiz başarısızlık geri geldi",
  );
});

test("eski kalıp Windows'ta neden başarısızdı (belge niteliğinde)", () => {
  const argv1 = "C:\\Users\\PC1\\tools\\x.mjs";
  const metaUrl = "file:///C:/Users/PC1/tools/x.mjs";
  // Eski kod tam olarak bunu yapıyordu:
  assert.notEqual(
    metaUrl,
    `file://${argv1}`,
    "eski kalıp beklenmedik şekilde tutuyor — testin varsayımı yanlış",
  );
  // Yenisi doğru sonucu veriyor:
  assert.equal(dogrudanMiCalisiyor(metaUrl, argv1, win32YolaUrl), true);
});

test("Linux yolu tanınır", () => {
  const argv1 = "/home/kivanc/LGS-Destek/tools/yedek-al.mjs";
  const metaUrl = "file:///home/kivanc/LGS-Destek/tools/yedek-al.mjs";
  assert.equal(dogrudanMiCalisiyor(metaUrl, argv1), true);
});

test("içe aktarıldığında çalışmaz (test dosyaları betiği import ediyor)", () => {
  // Testler bu modülleri import ediyor; komut satırı bölümü o sırada
  // ÇALIŞMAMALI, yoksa her test koşusunda gerçek yedek almaya kalkardı.
  const metaUrl = "file:///home/kivanc/LGS-Destek/tools/yedek-al.mjs";
  const argv1 = "/home/kivanc/LGS-Destek/node_modules/.bin/tsx";
  assert.equal(dogrudanMiCalisiyor(metaUrl, argv1), false);
});

test("boşluk ve Türkçe karakter içeren yol", () => {
  // "Masaüstü" ya da "Belgelerim" gibi klasörler Windows'ta çok yaygın.
  const argv1 = "C:\\Users\\PC1\\Masaüstü\\LGS Destek\\tools\\yedek-al.mjs";
  const metaUrl =
    "file:///C:/Users/PC1/Masa%C3%BCst%C3%BC/LGS%20Destek/tools/yedek-al.mjs";
  assert.equal(
    dogrudanMiCalisiyor(metaUrl, argv1, win32YolaUrl),
    true,
    "boşluklu ya da Türkçe karakterli yolda betik çalışmıyor",
  );
});

test("argv[1] yoksa kırılmaz", () => {
  assert.equal(dogrudanMiCalisiyor("file:///x.mjs", undefined), false);
  assert.equal(dogrudanMiCalisiyor("file:///x.mjs", ""), false);
});

test("başka bir dosya çalıştırıldıysa false", () => {
  assert.equal(
    dogrudanMiCalisiyor("file:///a/tools/yedek-al.mjs", "/a/tools/baska.mjs"),
    false,
  );
});

test("HİÇBİR araç betiği eski kalıbı kullanmıyor", () => {
  // Yeni bir betik yazılırken kopyala-yapıştırla geri gelmesi çok kolay.
  const fs = require("node:fs") as typeof import("node:fs");
  const path = require("node:path") as typeof import("node:path");
  const dizin = path.join(process.cwd(), "tools");
  const suclu: string[] = [];
  for (const ad of fs.readdirSync(dizin)) {
    if (!ad.endsWith(".mjs")) continue;
    const metin = fs.readFileSync(path.join(dizin, ad), "utf8");
    // Kendi belgelendirmesi hariç, çalışan kod olarak geçmemeli.
    if (ad === "dogrudan-calisma.mjs") continue;
    if (metin.includes("`file://${process.argv[1]}`")) suclu.push(ad);
  }
  assert.deepEqual(suclu, [], `eski kalıba dönmüş betikler: ${suclu.join(", ")}`);
});
