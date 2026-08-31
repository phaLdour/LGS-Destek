#!/usr/bin/env node
/**
 * VERİ YEDEĞİ (öneri 8)
 *
 * NEDEN VAR: Supabase'in ÜCRETSİZ planında otomatik yedek yoktur —
 * otomatik günlük yedek yalnız Pro ve üstünde. Yani şu an veritabanı
 * silinse ya da bozulsa geri dönüşü yok.
 *
 * NEDEN `supabase db dump` DEĞİL: o komut Docker istiyor. Teknik
 * olmayan bir sahibin yedek almak için Docker Desktop kurması gerçekçi
 * değil — kurulmazsa yedek hiç alınmaz, ki bu en kötü sonuç. Bu betik
 * yalnız `node` ve zaten kurulu olan `@supabase/supabase-js` ile
 * çalışır; yeni bir şey kurmak gerekmez.
 *
 * NEDEN GITHUB'A YÜKLEMİYORUZ: Supabase'in resmî tarifi dökümü depoya
 * işliyor ve dokümanın kendisi bunu herkese açık depolarda yapmamayı
 * söylüyor. `phaLdour/LGS-Destek` herkese açık; öğrenci verisi oraya
 * konulamaz. Yedek yalnız sahibin bilgisayarına iner.
 *
 * KULLANIM:
 *   SUPABASE_SERVICE_ROLE_KEY=... NEXT_PUBLIC_SUPABASE_URL=... \
 *     node tools/yedek-al.mjs [hedef-klasor]
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

/**
 * Yedeklenecek tablolar — SIRA ÖNEMLİ.
 * Yabancı anahtar bağımlılıkları: comp_seasons → comp_ranks/comp_trophies,
 * comp_matches → comp_invites/comp_match_answers. Geri yükleme bu sırayla
 * yapılır; ters sırada yüklemek yabancı anahtar hatası verir.
 *
 * LİSTE ELLE TUTULUYOR (otomatik keşif değil): yeni bir tablo eklendiğinde
 * buraya yazılmasını istiyoruz. Otomatik keşif, yedeklenmemesi gereken
 * geçici tabloları da sürükler ve kimse fark etmez.
 */
export const TABLOLAR = [
  // Öğrencinin çalışması — kaybı en çok acıtan veri
  "study_sessions",
  "topic_progress",
  "quiz_results",
  "quick_solved",
  "wrong_answers",
  "konu_tekrar",
  "user_badges",
  // Rekabet
  "comp_seasons",
  "comp_profiles",
  "comp_ranks",
  "comp_trophies",
  "comp_matches",
  "comp_match_answers",
  "comp_invites",
  "comp_weekly_claims",
  // Diğer
  "push_subscriptions",
  "feedback",
  // Baykuşun öğrendikleri: kişisel değil ama yeniden üretmek Gemini
  // kotası yakar, o yüzden yedekleniyor.
  "ai_onbellek",
];

/**
 * Yedeklenmeyenler ve sebepleri (belge niyetine burada duruyor):
 *  - hiz_sayaci      : dakikalık sayaç, bir saat sonra anlamsız
 *  - comp_queue      : anlık eşleşme kuyruğu, geçici
 *  - hata_kayitlari  : teşhis günlüğü; kaybı özelliği bozmaz
 *  - sema_gecisleri  : şema uygulanınca kendini yeniden yazar
 */
export const YEDEKLENMEYENLER = [
  "hiz_sayaci",
  "comp_queue",
  "hata_kayitlari",
  "sema_gecisleri",
];

const SAYFA = 1000;

/**
 * Bir tablonun tüm satırlarını sayfa sayfa okur.
 * Sayfalama şart: Supabase tek istekte en fazla 1000 satır döndürür,
 * sayfalamadan büyük tablo SESSİZCE kırpılır — yedeğin en tehlikeli
 * bozulma biçimi bu olurdu.
 */
export async function tabloyuOku(istemci, tablo) {
  const hepsi = [];
  for (let bas = 0; ; bas += SAYFA) {
    const { data, error } = await istemci
      .from(tablo)
      .select("*")
      .range(bas, bas + SAYFA - 1);
    if (error) throw new Error(`${tablo}: ${error.message}`);
    if (!data || data.length === 0) break;
    hepsi.push(...data);
    if (data.length < SAYFA) break;
  }
  return hepsi;
}

/**
 * @typedef {object} YedekOzeti
 * @property {string} alinma
 * @property {Record<string, number>} tablolar  Tablo → alınan satır sayısı
 * @property {Record<string, string>} hata      Tablo → hata mesajı
 */

/**
 * Yedeği alır ve özetini döndürür.
 * @returns {Promise<YedekOzeti>}
 */
export async function yedekAl(istemci, hedef, tablolar = TABLOLAR) {
  fs.mkdirSync(hedef, { recursive: true });
  /** @type {YedekOzeti} */
  const ozet = { alinma: new Date().toISOString(), tablolar: {}, hata: {} };

  for (const tablo of tablolar) {
    try {
      const satirlar = await tabloyuOku(istemci, tablo);
      fs.writeFileSync(
        path.join(hedef, `${tablo}.json`),
        JSON.stringify(satirlar, null, 1),
        "utf8",
      );
      ozet.tablolar[tablo] = satirlar.length;
      console.log(`  ${String(satirlar.length).padStart(7)} satır  ${tablo}`);
    } catch (e) {
      ozet.hata[tablo] = String(e.message ?? e);
      console.error(`  HATA            ${tablo}: ${ozet.hata[tablo]}`);
    }
  }

  fs.writeFileSync(
    path.join(hedef, "ozet.json"),
    JSON.stringify(ozet, null, 2),
    "utf8",
  );
  return ozet;
}

// ── komut satırı ────────────────────────────────────────────────────
// Testler bu dosyayı import ediyor; tsx CJS'e çevirdiğinde üst düzey
// `await` desteklenmiyor. Bu yüzden komut satırı bölümü bir async
// fonksiyona sarılı.
if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anahtar = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anahtar) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.",
    );
    process.exit(1);
  }

  const bugun = new Date().toISOString().slice(0, 10);
  const hedef =
    process.argv[2] ?? path.join(process.cwd(), `rehberim-yedek-${bugun}`);

  const istemci = createClient(url, anahtar, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Yedek alınıyor → ${hedef}\n`);
  const ozet = await yedekAl(istemci, hedef);

  const hataSayisi = Object.keys(ozet.hata).length;
  const toplam = Object.values(ozet.tablolar).reduce((a, b) => a + b, 0);
  console.log(`\nToplam ${toplam} satır, ${Object.keys(ozet.tablolar).length} tablo.`);

  if (hataSayisi) {
    console.error(
      `\nDİKKAT: ${hataSayisi} tablo alınamadı. BU YEDEĞE GÜVENME.`,
    );
    process.exit(1);
  }
  console.log("Yedek tamam.");
  })();
}
