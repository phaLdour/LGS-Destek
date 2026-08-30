import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Yanlış cevaplanan soruları takip eder.
 *
 * Veri stratejisi: localStorage öncelikli (offline) + Supabase senkron
 * (cihazlar arası). İlk mount'ta hydrateWrongFromSupabase() çağrılır.
 *
 * Soru kimliği: `subject/topic#index` (PoolQuestion.id ile aynı).
 */

const STORAGE_KEY = "rehberim:wrong-answers";
/**
 * "Ustalaşıldı" mezar taşları: {id: ustalasmaZamani(ms)}.
 *
 * NEDEN GEREKLİ (diriltme hatası): kayıt ustalaşınca hem yerelden hem
 * Supabase'ten siliniyordu. Ama silme yalnız O CİHAZDA gerçekleşiyordu ve
 * `hydrateWrongFromSupabase()` iki yönlü birleştirme yapıyordu:
 *
 *   - A cihazında ustalaşıp silindi → B cihazının localStorage'ında kayıt
 *     duruyor → B'nin hydrate'i "uzakta yok, yerelde var" deyip kaydı
 *     Supabase'e GERİ YAZIYORDU. Soru listeye geri geliyordu.
 *   - Çevrimdışıyken/oturum düşmüşken `deleteWrongFromSupabase` sessizce
 *     başarısız oluyor, bir sonraki hydrate satırı yerele geri taşıyordu.
 *
 * Mezar taşı, "bu kayıt bilerek silindi" bilgisini saklar; silme tarihinden
 * ESKİ uzak kayıtlar diriltilmez. Soru gerçekten tekrar yanlış yapılırsa
 * (saveWrong) mezar taşı kalkar ve kayıt normal şekilde geri döner.
 */
const MEZAR_KEY = "rehberim:wrong-mastered";
/** Mezar taşları sonsuza kadar durmasın; 180 gün sonra temizlenir. */
const MEZAR_OMRU_MS = 180 * 24 * 60 * 60 * 1000;
let hydrated = false;

export type WrongRecord = {
  /** Toplam kaç kez yanlış yapıldı */
  wrongCount: number;
  /** Üst üste kaç doğru cevap geldi (2 olunca havuzdan çıkar) */
  correctStreak: number;
  /** Son yanlış cevap tarihi (epoch ms) */
  lastWrongAt: number;
  /**
   * Bu kelimenin/sorunun bir sonraki gösterim "vadesi" (epoch ms).
   * now() >= nextDueAt ise vadesi gelmiş.
   * - Yeni hata: now + 1 gün
   * - 1 doğru cevap: now + 3 gün
   * - 2 doğru cevap üst üste: kayıt silinir (ustalaşmış)
   * Eski kayıtlarda yoksa: lastWrongAt + 1 gün varsayılır (geriye uyum).
   */
  nextDueAt?: number;
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_MS = 3 * ONE_DAY_MS;
// Ustalaşma eşiği tek yerde tanımlıdır: istemci ve sunucu sayacı ayrışmasın.
import { USTALASMA_ESIGI } from "@/lib/hataSayaci";

export type Store = Record<string, WrongRecord>;

function read(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Store;
  } catch {
    return {};
  }
}

function write(store: Store) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // kota dolu vb.
  }
}

// ── Mezar taşları (silinmiş/ustalaşılmış kayıtlar) ───────────────────

type Mezarlik = Record<string, number>;

/** Mezar taşlarını okur; süresi dolanları ayıklar. */
function mezarlikOku(): Mezarlik {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(MEZAR_KEY);
    if (!raw) return {};
    const ham = JSON.parse(raw) as Mezarlik;
    const sinir = Date.now() - MEZAR_OMRU_MS;
    const temiz: Mezarlik = {};
    for (const [id, ts] of Object.entries(ham)) {
      if (typeof ts === "number" && ts >= sinir) temiz[id] = ts;
    }
    return temiz;
  } catch {
    return {};
  }
}

function mezarlikYaz(m: Mezarlik) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MEZAR_KEY, JSON.stringify(m));
  } catch {
    // kota dolu vb.
  }
}

/** Kaydı "bilerek silindi" diye işaretler (ustalaşma anıyla birlikte). */
function mezaraKoy(id: string) {
  const m = mezarlikOku();
  m[id] = Date.now();
  mezarlikYaz(m);
}

/** Soru yeniden yanlış yapıldı → mezar taşı kalkar, kayıt geçerli olur. */
function mezardanCikar(id: string) {
  const m = mezarlikOku();
  if (m[id] === undefined) return;
  delete m[id];
  mezarlikYaz(m);
}

/** Yanlış cevap kaydı; varsa sayacı artırır, doğru serisini sıfırlar. */
export function saveWrong(id: string) {
  const s = read();
  const rec = s[id];
  const now = Date.now();
  const next: WrongRecord = {
    wrongCount: (rec?.wrongCount ?? 0) + 1,
    correctStreak: 0,
    lastWrongAt: now,
    nextDueAt: now + ONE_DAY_MS,
  };
  s[id] = next;
  write(s);
  // Soru yeniden yanlış yapıldı: eski "ustalaşıldı" mezar taşı geçersizdir,
  // yoksa hydrate bu yeni kaydı diriltilmiş sanıp eleyebilirdi.
  mezardanCikar(id);
  void pushWrongToSupabase(id, next);
}

/**
 * Doğru cevap; havuzdaki soru için doğru serisini artırır.
 * 2 üst üste doğru olursa havuzdan çıkar (ustalaşmış).
 */
export function markCorrect(id: string) {
  const s = read();
  const rec = s[id];
  if (!rec) return; // zaten havuzda değil
  const nextStreak = rec.correctStreak + 1;
  if (nextStreak >= USTALASMA_ESIGI) {
    delete s[id];
    // Mezar taşı ÖNCE konur: uzaktaki işaretleme başarısız olsa bile
    // (çevrimdışı, oturum düşmüş) bir sonraki hydrate kaydı geri getiremez.
    mezaraKoy(id);
    void markMasteredInSupabase(id, rec);
  } else {
    // 1. doğru cevap: 3 gün ileri it
    const next: WrongRecord = {
      ...rec,
      correctStreak: nextStreak,
      nextDueAt: Date.now() + THREE_DAYS_MS,
    };
    s[id] = next;
    void pushWrongToSupabase(id, next);
  }
  write(s);
}

export type WrongFilter = "all" | "today" | "due";

import { trBugunBaslangici } from "@/lib/zaman";

/** Türkiye gününün başlangıcı — "bugün" filtresi sitede her yerde TR günüdür. */
function todayStartMs(): number {
  return trBugunBaslangici().getTime();
}

/** Bir kaydın "vadesi gelmiş" sayılması için zaman damgası.
 *  Eski kayıtlarda nextDueAt yoksa lastWrongAt + 1 gün varsayılır. */
function dueTs(rec: WrongRecord): number {
  return rec.nextDueAt ?? rec.lastWrongAt + ONE_DAY_MS;
}

/**
 * Havuzdaki yanlış soru ID'lerinin kümesi.
 * - "all": tüm havuz (eski davranış)
 * - "today": bugün yapılmış (lastWrongAt >= bugün 00:00)
 * - "due": vadesi gelmiş (nextDueAt <= şimdi)
 */
export function getWrongIds(filter: WrongFilter = "all"): Set<string> {
  const s = read();
  const now = Date.now();
  const start = todayStartMs();
  const out = new Set<string>();
  for (const [id, rec] of Object.entries(s)) {
    // Ustalaşmış kayıt hiçbir filtrede gösterilmez: silinmesi gecikmiş olsa
    // bile (çevrimdışı vb.) öğrenciye "hâlâ yanlışın" denmemeli.
    if (rec.correctStreak >= USTALASMA_ESIGI) continue;
    if (filter === "today" && rec.lastWrongAt < start) continue;
    if (filter === "due" && dueTs(rec) > now) continue;
    out.add(id);
  }
  return out;
}

/** Havuzdaki yanlış soru sayısı (filtreli veya tümü). */
export function getWrongCount(filter: WrongFilter = "all"): number {
  return getWrongIds(filter).size;
}

/** Tüm havuzu temizle (debug/profil için). Mezar taşları da sıfırlanır. */
export function clearWrongPool() {
  write({});
  mezarlikYaz({});
}

// ── Supabase senkron (arka plan, fire & forget) ──────────────────────

async function pushWrongToSupabase(id: string, rec: WrongRecord) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("wrong_answers").upsert(
      {
        user_id: user.id,
        question_key: id,
        wrong_count: rec.wrongCount,
        correct_streak: rec.correctStreak,
        last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
        next_due_at: rec.nextDueAt
          ? new Date(rec.nextDueAt).toISOString()
          : null,
      },
      { onConflict: "user_id,question_key" },
    );
  } catch {
    // sessiz
  }
}

/**
 * Ustalaşan soruyu uzakta İŞARETLER (silmez) — sunucu tarafı mezar taşı.
 *
 * Eskiden satır Supabase'ten SİLİNİYORDU. Silmek, cihazlar arası senkronda
 * diriltmeyi kaçınılmaz kılıyordu: B cihazının localStorage'ında kayıt hâlâ
 * duruyorsa hydrate "uzakta yok, yerelde var" deyip satırı geri yazıyordu.
 * "Yok" ile "bilerek kaldırıldı" ayırt edilemiyordu.
 *
 * Artık satır `correct_streak = 2` ile KALIR. Bu, tüm cihazların görebildiği
 * kalıcı bir "ustalaşıldı" işaretidir: hiçbir cihaz onu listeye geri
 * getiremez (bkz. `birlestir` → DİRİLTME ENGELİ 2) ve sayaçlar bu satırı
 * saymaz (bkz. lib/hataSayaci.ts). Soru gerçekten yeniden yanlış yapılırsa
 * `saveWrong` streak'i 0'a çeker ve kayıt normal şekilde geri döner.
 */
async function markMasteredInSupabase(id: string, rec: WrongRecord) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("wrong_answers").upsert(
      {
        user_id: user.id,
        question_key: id,
        wrong_count: rec.wrongCount,
        correct_streak: USTALASMA_ESIGI,
        last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
        next_due_at: null,
      },
      { onConflict: "user_id,question_key" },
    );
  } catch {
    // sessiz
  }
}

/** Supabase'ten gelen ham satır. */
export type UzakHataSatiri = {
  question_key: string;
  wrong_count: number;
  correct_streak: number;
  last_wrong_at: string;
  next_due_at: string | null;
};

/**
 * Birleştirme kararı — SAF fonksiyon (I/O yok), bu yüzden test edilebilir.
 *
 * Üç diriltme engeli burada uygulanır; ayrıntılı gerekçe için MEZAR_KEY
 * yorumuna bakın.
 */
export function birlestir(
  yerel: Store,
  mezarlik: Record<string, number>,
  uzak: UzakHataSatiri[],
): {
  birlesik: Store;
  /** Uzakta "ustalaşıldı" diye işaretlenecek kayıtlar (silinmez). */
  uzaktaUstalasacak: [string, WrongRecord][];
  /** Yerelde olup uzakta olmayan, push edilecek kayıtlar. */
  pushEdilecek: [string, WrongRecord][];
  /** Artık gereksiz kalan (soru yeniden yanlış yapılmış) mezar taşları. */
  kalkacakMezarlar: string[];
  /** Uzakta ustalaşmış görünen, bu cihazda da mezara konacak kayıtlar. */
  yeniMezarlar: string[];
} {
  const birlesik: Store = { ...yerel };
  const uzaktaUstalasacak: [string, WrongRecord][] = [];
  const kalkacakMezarlar: string[] = [];
  const yeniMezarlar: string[] = [];
  const aktifMezarlar = new Set(Object.keys(mezarlik));

  for (const row of uzak) {
    const remoteTs = new Date(row.last_wrong_at).getTime();

    // DİRİLTME ENGELİ 1 — yerel mezar taşı.
    // Kayıt bu cihazda ustalaşıldığı için kaldırılmışsa ve uzaktaki satır
    // ustalaşmadan ESKİYSE, o satır bayattır: geri alınmaz ve uzakta da
    // "ustalaşıldı" diye işaretlenir (işaretleme isteği daha önce düşmüş
    // olabilir). Ustalaşmadan SONRA yeni bir yanlış yapılmışsa
    // (remoteTs > mezarTs) kayıt gerçekten geçerlidir; mezar taşı kalkar.
    const mezarTs = mezarlik[row.question_key];
    if (mezarTs !== undefined) {
      if (remoteTs <= mezarTs) {
        delete birlesik[row.question_key];
        if (row.correct_streak < USTALASMA_ESIGI) {
          uzaktaUstalasacak.push([
            row.question_key,
            {
              wrongCount: row.wrong_count,
              correctStreak: USTALASMA_ESIGI,
              lastWrongAt: remoteTs,
            },
          ]);
        }
        continue;
      }
      kalkacakMezarlar.push(row.question_key);
      aktifMezarlar.delete(row.question_key);
    }

    // DİRİLTME ENGELİ 2 — uzak (sunucu) mezar taşı.
    // correct_streak >= 2, "bu soru ustalaşıldı" demektir; başka bir
    // cihazın bayat localStorage'ı soruyu dirilteMEZ.
    //
    // HATA DÜZELTMESİ — VERİ KAYBI: eskiden bu kural zaman damgasına
    // BAKMADAN uyguluyordu. Senaryo: öğrenci daha önce ustalaştığı soruyu
    // gerçekten yeniden yanlış yapar; `saveWrong` yerel kaydı tazeler ama
    // sunucuya yazma sessizce düşer (çevrimdışı / oturum kopması). Sonraki
    // eşitlemede uzak satır hâlâ "ustalaşıldı" der ve TAZE yerel yanlış
    // hem silinir hem yeniden mezara konurdu — öğrencinin gerçekten
    // yanlış yaptığı soru listeye hiç dönmezdi. Artık kural ENGEL 1 ile
    // simetrik: yerel kayıt uzak satırdan YENİYSE, gerçek bir yeni yanlış
    // sayılır ve korunur.
    if (row.correct_streak >= USTALASMA_ESIGI) {
      const yerelKayit = yerel[row.question_key];
      const yereldeYeniYanlis =
        yerelKayit !== undefined && yerelKayit.lastWrongAt > remoteTs;
      if (!yereldeYeniYanlis) {
        delete birlesik[row.question_key];
        yeniMezarlar.push(row.question_key);
        aktifMezarlar.add(row.question_key);
        continue;
      }
      // Yeni yanlış korunur: mezar taşı konmaz, kayıt havuzda kalır.
      birlesik[row.question_key] = {
        wrongCount: Math.max(yerelKayit.wrongCount, row.wrong_count),
        correctStreak: 0,
        lastWrongAt: yerelKayit.lastWrongAt,
      };
      continue;
    }

    const yerelKayit = yerel[row.question_key];
    if (!yerelKayit || yerelKayit.lastWrongAt <= remoteTs) {
      // Yerel kayıt daha ileri bir doğru serisindeyse onu koru: uzak satır,
      // henüz senkron olmamış doğru cevabı geri almamalı (aksi hâlde doğru
      // cevaplanan soru yanlışlar listesinden düşmüyordu).
      const yereldenIleri =
        yerelKayit !== undefined && yerelKayit.correctStreak > row.correct_streak;
      birlesik[row.question_key] = {
        wrongCount: row.wrong_count,
        correctStreak: yereldenIleri
          ? yerelKayit.correctStreak
          : row.correct_streak,
        lastWrongAt: remoteTs,
        nextDueAt: yereldenIleri
          ? (yerelKayit.nextDueAt ?? yerelKayit.lastWrongAt + ONE_DAY_MS)
          : row.next_due_at
            ? new Date(row.next_due_at).getTime()
            : remoteTs + ONE_DAY_MS,
      };
    }
  }

  // DİRİLTME ENGELİ 3 — mezarlıktakiler ve ustalaşmışlar push EDİLMEZ.
  // Eskiden bu adım, başka bir cihazda ustalaşılıp silinmiş kaydı "uzakta
  // yok" diye Supabase'e geri yazıyor ve soruyu listeye diriltiyordu.
  const uzakAnahtarlar = new Set(uzak.map((r) => r.question_key));
  const pushEdilecek = Object.entries(yerel).filter(
    ([k, rec]) =>
      !uzakAnahtarlar.has(k) &&
      !aktifMezarlar.has(k) &&
      rec.correctStreak < USTALASMA_ESIGI,
  );

  return {
    birlesik,
    uzaktaUstalasacak,
    pushEdilecek,
    kalkacakMezarlar,
    yeniMezarlar,
  };
}

/**
 * Mount'ta çağrılır: uzaktaki kayıtları yerelle birleştirir.
 * Çatışma çözümü: hangi kayıt daha yeni (lastWrongAt) ise o kazanır —
 * ama bilerek silinmiş kayıtlar asla dirilmez (bkz. `birlestir`).
 */
export async function hydrateWrongFromSupabase(): Promise<void> {
  if (hydrated) return;
  hydrated = true;
  if (!isSupabaseConfigured() || typeof window === "undefined") return;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("wrong_answers")
      .select(
        "question_key, wrong_count, correct_streak, last_wrong_at, next_due_at",
      );

    const {
      birlesik,
      uzaktaUstalasacak,
      pushEdilecek,
      kalkacakMezarlar,
      yeniMezarlar,
    } = birlestir(read(), mezarlikOku(), (data ?? []) as UzakHataSatiri[]);

    write(birlesik);
    for (const k of kalkacakMezarlar) mezardanCikar(k);
    // Uzakta ustalaşmış görünen kayıtlar bu cihazda da mezara konur; böylece
    // bu cihaz onları bir daha push etmeye çalışmaz.
    for (const k of yeniMezarlar) mezaraKoy(k);

    if (pushEdilecek.length > 0) {
      await supabase.from("wrong_answers").upsert(
        pushEdilecek.map(([k, rec]) => ({
          user_id: user.id,
          question_key: k,
          wrong_count: rec.wrongCount,
          correct_streak: rec.correctStreak,
          last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
          next_due_at: rec.nextDueAt
            ? new Date(rec.nextDueAt).toISOString()
            : null,
        })),
        { onConflict: "user_id,question_key" },
      );
    }

    // Bayat uzak satırları "ustalaşıldı" diye işaretle (silmek yerine):
    // işaret kalıcıdır ve tüm cihazlarda diriltmeyi engeller.
    if (uzaktaUstalasacak.length > 0) {
      await supabase.from("wrong_answers").upsert(
        uzaktaUstalasacak.map(([k, rec]) => ({
          user_id: user.id,
          question_key: k,
          wrong_count: rec.wrongCount,
          correct_streak: USTALASMA_ESIGI,
          last_wrong_at: new Date(rec.lastWrongAt).toISOString(),
          next_due_at: null,
        })),
        { onConflict: "user_id,question_key" },
      );
    }
  } catch {
    // sessiz
  }
}
