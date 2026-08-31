#!/usr/bin/env node
/**
 * ODAK MODU FOTOĞRAFLARINI KENDİ SUNUCUMUZA AL (öneri 10)
 *
 * NEDEN: 8 tema fotoğrafı Unsplash CDN'inden çekiliyordu. Üç sorun:
 *
 *   1. GİZLİLİK — her öğrencinin tarayıcısı unsplash.com'a istek atıyor;
 *      IP adresi ve hangi sayfadan geldiği üçüncü bir tarafa gidiyor.
 *      Kullanıcıları çocuk olan bir site için en ağır gerekçe bu.
 *   2. DAYANIKSIZLIK — fotoğraf silinir, adres değişir ya da hotlink
 *      engellenirse Odak Modu'nun görüntüsü bizden habersiz bozulur.
 *   3. ÇEVRİMDIŞI — dışarıdan çekilen resim çevrimdışı hiç gelmez.
 *
 * LİSANS: Unsplash lisansı indirmeye ve kullanmaya izin verir; fotoğrafçı
 * adları `src/components/odak/OdakTema.tsx` içinde `kredi` alanında
 * korunuyor.
 *
 * NEDEN AYRI BİR BETİK: bu depo, çıkışı kısıtlı bir ortamda geliştiriliyor
 * ve oradan images.unsplash.com'a erişilemiyor. İndirme, ağı açık olan
 * makinede bir kez çalıştırılır; sonuç `public/odak/` altına yazılır ve
 * depoya girer. Ondan sonra site hiç Unsplash'e dokunmaz.
 *
 * KULLANIM:  node tools/odak-fotograflarini-indir.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HEDEF = path.join(KOK, "public", "odak");
const KAYNAK = path.join(KOK, "src", "components", "odak", "OdakTema.tsx");

/**
 * Genişlik 1600: tam ekran arka plan ama üstünde karartma katmanı ve
 * bulanık zerreler var; 1920 ile farkı görünmüyor, dosya ise belirgin
 * küçülüyor. Öğrencilerin çoğu telefonda ve mobil veride.
 */
const GENISLIK = 1600;
const KALITE = 72;

/** OdakTema.tsx içindeki tema kimliği + Unsplash adresi çiftlerini okur. */
export function temalariOku(kaynakMetni) {
  const cikti = [];
  const desen =
    /\{\s*id:\s*"([^"]+)"[^}]*?fotograf:\s*"(https:\/\/images\.unsplash\.com\/[^"]+)"/g;
  let e;
  while ((e = desen.exec(kaynakMetni)) !== null) {
    cikti.push({ id: e[1], adres: e[2] });
  }
  return cikti;
}

function indirmeAdresi(temelAdres) {
  // fm=webp: dönüşümü CDN yapıyor, burada resim kütüphanesi gerekmiyor.
  return `${temelAdres}?auto=format&fit=crop&w=${GENISLIK}&q=${KALITE}&fm=webp`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
    if (!fs.existsSync(KAYNAK)) {
      console.error(`Bulunamadı: ${KAYNAK}`);
      process.exit(1);
    }
    const temalar = temalariOku(fs.readFileSync(KAYNAK, "utf8"));
    if (temalar.length === 0) {
      console.log(
        "OdakTema.tsx içinde Unsplash adresi kalmamış — fotoğraflar zaten bizde.",
      );
      process.exit(0);
    }

    fs.mkdirSync(HEDEF, { recursive: true });
    console.log(`${temalar.length} fotoğraf indirilecek → public/odak/\n`);

    let hata = 0;
    for (const { id, adres } of temalar) {
      const dosya = path.join(HEDEF, `${id}.webp`);
      try {
        const y = await fetch(indirmeAdresi(adres));
        if (!y.ok) throw new Error(`HTTP ${y.status}`);
        const buf = Buffer.from(await y.arrayBuffer());
        // Boş ya da minik dosya = bozuk indirme. Sessizce kabul edersek
        // sitede kırık resim çıkar ve sebebini kimse bulamaz.
        if (buf.length < 10_000) {
          throw new Error(`şüpheli boyut: ${buf.length} bayt`);
        }
        fs.writeFileSync(dosya, buf);
        console.log(`  ${String(Math.round(buf.length / 1024)).padStart(5)} KB  ${id}.webp`);
      } catch (e) {
        hata++;
        console.error(`  HATA        ${id}: ${e.message ?? e}`);
      }
    }

    if (hata) {
      console.error(`\n${hata} fotoğraf indirilemedi. Tekrar dene.`);
      process.exit(1);
    }
    console.log(`\nTamam. Şimdi bunları depoya ekle:
  git add public/odak
  git commit -m "Odak fotograflari kendi sunucumuzda"
  git push`);
  })();
}
