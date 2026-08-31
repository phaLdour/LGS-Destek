import { pathToFileURL } from "node:url";

/**
 * "Bu dosya doğrudan mı çalıştırıldı, yoksa import mu edildi?"
 *
 * NEDEN AYRI BİR DOSYA — GERÇEK BİR HATA: araç betiklerinde şu kalıp
 * kullanılıyordu:
 *
 *     if (import.meta.url === `file://${process.argv[1]}`)
 *
 * Bu kalıp Linux'ta çalışır, WINDOWS'TA ÇALIŞMAZ. Windows'ta:
 *
 *     import.meta.url   →  file:///C:/Users/.../arac.mjs   (üç eğik çizgi, / ayraç)
 *     process.argv[1]   →  C:\Users\...\arac.mjs           (\ ayraç)
 *
 * Karşılaştırma hiçbir zaman tutmaz; komut satırı bölümü hiç çalışmaz ve
 * betik SESSİZCE, hata vermeden, ÇIKIŞ KODU 0 ile biter. Yani "başarılı"
 * görünür.
 *
 * Bunun sitede somut sonucu şuydu: sahibi `YEDEK-AL.bat` dosyasını
 * çalıştırınca "YEDEK TAMAM" yazısını görüyor ama klasör bomboş kalıyordu.
 * Yedeği olduğunu sanan biri, yedeği olmayan biridir — bu, yedeğin
 * verebileceği en kötü sonuç.
 *
 * `pathToFileURL` platformdan bağımsız olarak doğru URL'i üretir.
 *
 * `yolaUrl` ENJEKTE EDİLEBİLİR olmasının tek sebebi test: geliştirme
 * Linux'ta yapılıyor ve Linux'ta `pathToFileURL("C:\\x")` Windows gibi
 * davranmaz (ters eğik çizgi orada ayraç değildir). Testler win32
 * karşılığını verip karşılaştırma mantığını gerçekten sınayabilsin diye
 * parametre açık bırakıldı — hatanın kendisi Linux'ta görünmez olduğu
 * için bu şart.
 */
export function dogrudanMiCalisiyor(
  metaUrl,
  argv1 = process.argv[1],
  yolaUrl = pathToFileURL,
) {
  if (!argv1) return false;
  try {
    return metaUrl === yolaUrl(argv1).href;
  } catch {
    return false;
  }
}

/** Windows'un `pathToFileURL` davranışı — yalnız testlerde kullanılır. */
export function win32YolaUrl(yol) {
  const surucu = /^[a-zA-Z]:/.test(yol);
  const egik = yol.replace(/\\/g, "/");
  return new URL("file:///" + (surucu ? egik : egik.replace(/^\//, "")));
}
