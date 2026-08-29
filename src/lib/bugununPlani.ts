/**
 * "Bugünün planı" motoru.
 *
 * Konu önerisi YANLIŞ SAYISINA değil, YANLIŞ ORANINA göre yapılır — ama
 * ham oran tek başına yalan söyler: bir konudan 1 soru çözüp yanlış yapan
 * öğrencinin oranı %100'dür, oysa belki sadece şanssızdı.
 *
 * Çözüm: 40 soruluk bir GÜVEN KOTASI. Kotayı sert bir eşik olarak
 * uygulamıyoruz ("40 soru çözmediysen bu konu hiç önerilmez"), çünkü konu
 * başına ortalama ~44 soru var; sert eşik planın haftalarca hiçbir şey
 * önerememesi demek olurdu. Bunun yerine oranı kotaya doğru "çekiyoruz"
 * (shrinkage):
 *
 *     düzeltilmiş oran = (yanlış + 40 × genel_ortalama) / (toplam + 40)
 *
 * Böylece:
 *   - 1/1 yanlış  → %100 değil, genel ortalamanın az üstü (neredeyse etkisiz)
 *   - 20/40 yanlış → gerçek orana yaklaşır
 *   - 60/120 yanlış → pratikte gerçek oranın kendisi
 *
 * Aynı fikrin sert versiyonu sitede zaten var: SubjectHeatmap ve
 * userContext'teki MIN_RELIABLE = 8.
 */
import { getAllSubjects } from "@/content";
import {
  createClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
// Bekleyen hata sayacı /hatalarim listesiyle aynı kuraldan geçer.
import { bekleyenHataSay, type HataSatiri } from "@/lib/hataSayaci";
import { collectAllQuestions } from "@/lib/quickQuiz";
// Sorgu pencerelerinin sınırı TR gün başıdır (bkz. lib/zaman.ts).
import { trPencereBaslangici } from "@/lib/zaman";

/** Bir konudaki oranın "tam güvenilir" sayılması için gereken soru sayısı. */
export const GUVEN_KOTASI = 40;

/**
 * Hiç verisi olmayan bir öğrenci için varsayılan yanlış oranı beklentisi.
 * Kullanıcının kendi genel ortalaması oluşana kadar çıpa görevi görür.
 */
const BASLANGIC_BEKLENTISI = 0.3;

/** Bir konunun "zayıf" olarak önerilebilmesi için en az bu kadar soru. */
const EN_AZ_SORU = 3;

export type PlanKonusu = {
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  /** Gerçek (ham) yanlış oranı, 0-100. */
  hamOran: number;
  /** Kotaya göre düzeltilmiş yanlış oranı, 0-100. Sıralama buna göre. */
  duzeltilmisOran: number;
  /** Çözülen toplam soru. */
  toplam: number;
  /** Güven kotasının ne kadarı dolu, 0-100. */
  guven: number;
  href: string;
};

export type KaldiginYer = {
  subjectSlug: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  href: string;
  /** Son dokunuşun üzerinden geçen gün (0 = bugün). */
  gunOnce: number;
};

export type BugununPlani = {
  /** Hiç aktivite yok — plan yerine "ilk adım" gösterilir. */
  yeniKullanici: boolean;
  /** Vadesi gelmiş yanlış soru sayısı (varsa plan bununla başlar). */
  bekleyenHata: number;
  /** Üstte önerilecek konu (yoksa null). */
  onerilen: PlanKonusu | null;
  /** Onerilenden sonraki alternatifler. */
  alternatifler: PlanKonusu[];
  /** Hiç dokunulmamış konulardan bir öneri (zayıf konu yoksa devreye girer). */
  yeniKonu: { subjectSlug: string; subjectName: string; topicId: string; topicName: string; href: string } | null;
  /** Yarım kalan konu; yeni kullanıcıda null. */
  kaldiginYer: KaldiginYer | null;
  /** Genel yanlış oranı, 0-100 (çıpa olarak kullanılan değer). */
  genelYanlisOrani: number;
  /** Toplam çözülen soru — güven mesajı için. */
  toplamSoru: number;
};

const BOS_PLAN: BugununPlani = {
  yeniKullanici: true,
  bekleyenHata: 0,
  onerilen: null,
  alternatifler: [],
  yeniKonu: null,
  kaldiginYer: null,
  genelYanlisOrani: 0,
  toplamSoru: 0,
};

function gunFarki(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86_400_000));
}

/**
 * Konu bazlı oranları düzeltip sıralar. Saf fonksiyon — test edilebilir.
 */
export function planiHesapla(
  satirlar: { subject_slug: string; topic_id: string; correct_count: number; wrong_count: number }[],
): {
  siralanmis: { key: string; hamOran: number; duzeltilmisOran: number; toplam: number; guven: number }[];
  genelYanlisOrani: number;
  toplamSoru: number;
} {
  const agg = new Map<string, { yanlis: number; toplam: number }>();
  let genelYanlis = 0;
  let genelToplam = 0;

  for (const r of satirlar) {
    // "__deneme" gibi sanal kayıtlar konu istatistiğine girmez.
    if (r.subject_slug.startsWith("__") || r.topic_id.startsWith("__")) continue;
    const toplam = r.correct_count + r.wrong_count;
    if (toplam <= 0) continue;
    const k = `${r.subject_slug}/${r.topic_id}`;
    const cur = agg.get(k) ?? { yanlis: 0, toplam: 0 };
    cur.yanlis += r.wrong_count;
    cur.toplam += toplam;
    agg.set(k, cur);
    genelYanlis += r.wrong_count;
    genelToplam += toplam;
  }

  // Genel ortalama da az veriyle gürültülü; onu da başlangıç beklentisine
  // doğru çekiyoruz (aynı kota, aynı mantık).
  const genelOran =
    (genelYanlis + GUVEN_KOTASI * BASLANGIC_BEKLENTISI) /
    (genelToplam + GUVEN_KOTASI);

  const siralanmis = [...agg.entries()]
    // "TEKRAR ET" ÖNERİSİ İÇİN YANLIŞ ŞART.
    //
    // Eskiden yalnız `v.toplam >= EN_AZ_SORU` bakılıyordu; yanlış sayısına
    // hiç bakılmıyordu. Sonuç: hepsini doğru yapmış öğrenciye bile
    // "En çok burada zorlanıyorsun — 12 sorunun %0'ını yanlış yaptın"
    // deniyordu. Hiç yanlışı olmayan konu bir zayıflık değildir; plandan
    // düşer ve kart aşağıdaki "yeni konu" önerisine geçer.
    .filter(([, v]) => v.toplam >= EN_AZ_SORU && v.yanlis > 0)
    .map(([key, v]) => {
      const duzeltilmis =
        (v.yanlis + GUVEN_KOTASI * genelOran) / (v.toplam + GUVEN_KOTASI);
      return {
        key,
        hamOran: Math.round((v.yanlis / v.toplam) * 100),
        duzeltilmisOran: Math.round(duzeltilmis * 100),
        toplam: v.toplam,
        guven: Math.min(100, Math.round((v.toplam / GUVEN_KOTASI) * 100)),
      };
    })
    // En yüksek düzeltilmiş yanlış oranı önce; eşitlikte çok soru çözülen
    // önce (daha güvenilir sinyal).
    .sort(
      (a, b) =>
        b.duzeltilmisOran - a.duzeltilmisOran || b.toplam - a.toplam,
    );

  return {
    siralanmis,
    genelYanlisOrani: Math.round(genelOran * 100),
    toplamSoru: genelToplam,
  };
}

/**
 * Dashboard'un üst bölümü için tek seferde tüm veriyi çeker.
 * Giriş / yapılandırma yoksa "yeni kullanıcı" planı döner.
 */
export async function getBugununPlani(): Promise<BugununPlani> {
  if (!isSupabaseConfigured()) return BOS_PLAN;
  const user = await getCurrentUser();
  if (!user) return BOS_PLAN;
  const supabase = await createClient();

  // Pencere sınırı TR gün başı: bu kod sunucuda (UTC) çalışır, eski
  // `setDate(getDate() - 180)` hesabı en eski günü yarım bırakıyordu.
  const since = trPencereBaslangici(180);

  const [quizRes, progressRes, wrongRes, sessionRes] = await Promise.all([
    supabase
      .from("quiz_results")
      .select("subject_slug, topic_id, correct_count, wrong_count")
      .gte("created_at", since.toISOString()),
    supabase
      .from("topic_progress")
      .select("subject_slug, topic_id, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50),
    // question_key + correct_streak de çekilir: sayaç yalnız /hatalarim'da
    // GERÇEKTEN gösterilebilen kayıtları saymalı (bkz. lib/hataSayaci.ts).
    supabase
      .from("wrong_answers")
      .select("question_key, correct_streak, next_due_at, last_wrong_at"),
    supabase
      .from("study_sessions")
      .select("subject_slug, studied_topics, started_at")
      .order("started_at", { ascending: false })
      // Son 5 kayıt: en yenileri Odak Modu oturumu (__odak__) olabilir;
      // "kaldığın yer" için konusu olan ilk gerçek ders oturumu aranır.
      .limit(5),
  ]);

  const quizzes = (quizRes.data ?? []) as {
    subject_slug: string;
    topic_id: string;
    correct_count: number;
    wrong_count: number;
  }[];
  const progress = (progressRes.data ?? []) as {
    subject_slug: string;
    topic_id: string;
    status: string;
    updated_at: string;
  }[];
  const wrongs = (wrongRes.data ?? []) as HataSatiri[];
  const sessions = (sessionRes.data ?? []) as {
    subject_slug: string;
    studied_topics: string[];
    started_at: string;
  }[];

  // ── İsim haritaları ────────────────────────────────────────────────
  const dersler = getAllSubjects();
  const dersAdi = new Map(dersler.map((s) => [s.slug, s.name]));
  const konuAdi = new Map<string, string>();
  for (const s of dersler) {
    for (const t of s.topics) konuAdi.set(`${s.slug}/${t.id}`, t.name);
  }

  const href = (subjectSlug: string, topicId: string) =>
    `/ders/${subjectSlug}/${topicId}`;

  const kutuya = (
    row: { key: string; hamOran: number; duzeltilmisOran: number; toplam: number; guven: number },
  ): PlanKonusu | null => {
    const [subjectSlug, topicId] = row.key.split("/");
    const ad = konuAdi.get(row.key);
    // İçerikten kaldırılmış konu — plana koyma.
    if (!ad) return null;
    return {
      subjectSlug,
      subjectName: dersAdi.get(subjectSlug) ?? subjectSlug,
      topicId,
      topicName: ad,
      hamOran: row.hamOran,
      duzeltilmisOran: row.duzeltilmisOran,
      toplam: row.toplam,
      guven: row.guven,
      href: href(subjectSlug, topicId),
    };
  };

  const { siralanmis, genelYanlisOrani, toplamSoru } = planiHesapla(quizzes);
  const adaylar = siralanmis.map(kutuya).filter((x): x is PlanKonusu => x !== null);

  // ── Bekleyen hata sayısı ───────────────────────────────────────────
  // HAYALET SAYAÇ DÜZELTMESİ: eskiden `wrong_answers` tablosundaki her satır
  // sayılıyordu, oysa /hatalarim listesi yalnız hızlı soru havuzunda karşılığı
  // olan kayıtları gösterir. Çıkmış soru yanlışları (cikmis/... kimlikli),
  // içerikten kaldırılmış sorular ve silinmesi gecikmiş "ustalaşmış" kayıtlar
  // sayaçta durup listede görünmüyordu. Artık ikisi de aynı kuraldan geçer.
  const gosterilebilirIdler = new Set(
    collectAllQuestions({ kind: "karma-all" }).map((q) => q.id),
  );
  const bekleyenHata = bekleyenHataSay(wrongs, gosterilebilirIdler);

  // ── Kaldığın yer ───────────────────────────────────────────────────
  // Öncelik: yarım kalan (in_progress) konu → yoksa son çalışma oturumu.
  let kaldiginYer: KaldiginYer | null = null;
  const yarimKalan = progress.find((p) => p.status === "in_progress");
  if (yarimKalan) {
    const k = `${yarimKalan.subject_slug}/${yarimKalan.topic_id}`;
    const ad = konuAdi.get(k);
    if (ad) {
      kaldiginYer = {
        subjectSlug: yarimKalan.subject_slug,
        subjectName: dersAdi.get(yarimKalan.subject_slug) ?? yarimKalan.subject_slug,
        topicId: yarimKalan.topic_id,
        topicName: ad,
        href: href(yarimKalan.subject_slug, yarimKalan.topic_id),
        gunOnce: gunFarki(yarimKalan.updated_at),
      };
    }
  }
  if (!kaldiginYer && sessions.length > 0) {
    for (const s of sessions) {
      if (s.subject_slug.startsWith("__")) continue; // odak/deneme gibi özel kayıtlar
      const topicId = s.studied_topics?.[0];
      if (!topicId) continue;
      const k = `${s.subject_slug}/${topicId}`;
      const ad = konuAdi.get(k);
      if (!ad) continue;
      kaldiginYer = {
        subjectSlug: s.subject_slug,
        subjectName: dersAdi.get(s.subject_slug) ?? s.subject_slug,
        topicId,
        topicName: ad,
        href: href(s.subject_slug, topicId),
        gunOnce: gunFarki(s.started_at),
      };
      break;
    }
  }

  // ── Hiç dokunulmamış ilk konu ──────────────────────────────────────
  const dokunulan = new Set<string>([
    ...quizzes.map((q) => `${q.subject_slug}/${q.topic_id}`),
    ...progress.map((p) => `${p.subject_slug}/${p.topic_id}`),
  ]);
  let yeniKonu: BugununPlani["yeniKonu"] = null;
  for (const s of dersler) {
    for (const t of s.topics) {
      const k = `${s.slug}/${t.id}`;
      if (dokunulan.has(k)) continue;
      yeniKonu = {
        subjectSlug: s.slug,
        subjectName: s.name,
        topicId: t.id,
        topicName: t.name,
        href: href(s.slug, t.id),
      };
      break;
    }
    if (yeniKonu) break;
  }

  // YEDEK ÖNERİ: hiç yanlışı olmayan öğrencide artık `onerilen` boş kalabilir
  // (yukarıdaki "yanlış şart" düzeltmesi). Eğer her konuya dokunulmuşsa
  // `yeniKonu` da boş kalır ve kart bomboş görünürdü. Bu durumda EN AZ soru
  // çözülmüş ve HENÜZ BİTİRİLMEMİŞ konuyu öneriyoruz — "tekrar et" değil,
  // dürüstçe "burada pratiğin az".
  if (!yeniKonu) {
    const bitenler = new Set(
      progress.filter((p) => p.status === "done").map((p) => `${p.subject_slug}/${p.topic_id}`),
    );
    const cozulen = new Map<string, number>();
    for (const q of quizzes) {
      const k = `${q.subject_slug}/${q.topic_id}`;
      cozulen.set(k, (cozulen.get(k) ?? 0) + q.correct_count + q.wrong_count);
    }
    let enAz = Number.POSITIVE_INFINITY;
    for (const s of dersler) {
      for (const t of s.topics) {
        const k = `${s.slug}/${t.id}`;
        if (bitenler.has(k)) continue;
        const adet = cozulen.get(k) ?? 0;
        if (adet >= enAz) continue;
        enAz = adet;
        yeniKonu = {
          subjectSlug: s.slug,
          subjectName: s.name,
          topicId: t.id,
          topicName: t.name,
          href: href(s.slug, t.id),
        };
      }
    }
  }

  const yeniKullanici =
    toplamSoru === 0 && progress.length === 0 && sessions.length === 0;

  return {
    yeniKullanici,
    bekleyenHata,
    onerilen: adaylar[0] ?? null,
    alternatifler: adaylar.slice(1, 3),
    yeniKonu,
    kaldiginYer: yeniKullanici ? null : kaldiginYer,
    genelYanlisOrani,
    toplamSoru,
  };
}
