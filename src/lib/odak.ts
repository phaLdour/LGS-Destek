/**
 * Odak Modu — sayaç motoru (modül singleton'ı).
 *
 * Sayaç durumu React dışında, localStorage + duvar saati (Date.now) üzerinde
 * tutulur. Böylece:
 *  - Sayfa geçişlerinde (AppShell her sayfada yeniden kurulur) sayaç şaşmaz,
 *  - Sekme yenilense bile süre kaldığı yerden doğru hesaplanır,
 *  - Pomodoro duvar saatiyle aktığı için "duraklatıp molayı uzatma" hilesi
 *    yapılamaz (tasarım gereği pomodoro'da duraklatma yoktur).
 *
 * Süreler hiçbir yerde "sayaç azalt" ile tutulmaz; her okuma anında
 * başlangıç zamanından türetilir. AI yok, sunucu yok — tamamı tarayıcıda.
 */

export type OdakMod = "sayac" | "kronometre" | "pomodoro";

export type OdakDurum = {
  mod: OdakMod;
  /** Başlangıç anı (ms, duvar saati) */
  baslangicMs: number;
  /** sayac modu: hedef süre (saniye) */
  sureSn: number;
  /** sayac/kronometre: duraklatıldıysa duraklatma anı, değilse null */
  duraklatmaMs: number | null;
  /** Önceki duraklatmalardan önce birikmiş aktif süre (saniye) */
  birikmisSn: number;
  /** sayac modu: süre doldu, zil çalındı (tek sefer işaretlenir) */
  bitti: boolean;
};

const KEY = "rehberim:odak";

/* ---------- Pomodoro düzeni: klasik 25/5, 4. turdan sonra 15 dk ---------- */

export const POMODORO_CALISMA_DK = 25;
export const POMODORO_MOLA_DK = 5;
export const POMODORO_UZUN_MOLA_DK = 15;

/** Tek set: 4 × (25 çalışma + mola), son mola 15 dk. Dakika cinsinden. */
const POMODORO_FAZLAR: { tip: "calisma" | "mola"; dk: number }[] = [
  { tip: "calisma", dk: 25 },
  { tip: "mola", dk: 5 },
  { tip: "calisma", dk: 25 },
  { tip: "mola", dk: 5 },
  { tip: "calisma", dk: 25 },
  { tip: "mola", dk: 5 },
  { tip: "calisma", dk: 25 },
  { tip: "mola", dk: 15 },
];
const POMODORO_SET_SN = POMODORO_FAZLAR.reduce((a, f) => a + f.dk * 60, 0);

export type PomodoroFaz = {
  tip: "calisma" | "mola";
  /** Kaçıncı çalışma turu (1-4) — molada, biten turun numarası */
  tur: number;
  uzunMola: boolean;
  fazKalanSn: number;
  fazToplamSn: number;
  /** Başlangıçtan beri fiilen çalışılan (mola hariç) saniye */
  calismaSn: number;
  /** Kaçıncı set (1'den başlar) */
  set: number;
};

/** Geçen toplam saniyeden pomodoro fazını türetir. */
export function pomodoroFazi(gecenSn: number): PomodoroFaz {
  const set = Math.floor(gecenSn / POMODORO_SET_SN);
  let kalan = gecenSn - set * POMODORO_SET_SN;
  let calismaSn = set * 4 * 25 * 60;
  let tur = 0;
  for (const faz of POMODORO_FAZLAR) {
    const fazSn = faz.dk * 60;
    if (faz.tip === "calisma") tur++;
    if (kalan < fazSn) {
      if (faz.tip === "calisma") calismaSn += kalan;
      return {
        tip: faz.tip,
        tur,
        uzunMola: faz.tip === "mola" && faz.dk === POMODORO_UZUN_MOLA_DK,
        fazKalanSn: fazSn - kalan,
        fazToplamSn: fazSn,
        calismaSn: Math.floor(calismaSn),
        set: set + 1,
      };
    }
    if (faz.tip === "calisma") calismaSn += fazSn;
    kalan -= fazSn;
  }
  // Teorik olarak ulaşılmaz (set matematiği yukarıda halleder)
  return {
    tip: "calisma",
    tur: 1,
    uzunMola: false,
    fazKalanSn: 25 * 60,
    fazToplamSn: 25 * 60,
    calismaSn: Math.floor(calismaSn),
    set: set + 1,
  };
}

/* ------------------------------ Durum ------------------------------ */

let onbellek: OdakDurum | null | undefined; // undefined = henüz okunmadı

/**
 * Durumu HER ÇAĞRIDA depodan okur.
 *
 * Neden önbelleğe güvenmiyoruz: öğrenci siteyi iki sekmede açtığında her
 * sekmenin kendi modül belleği vardı; A sekmesinde biten sayaç B sekmesinde
 * hâlâ "çalışıyor" görünüyor ve süre İKİ KEZ kaydediliyordu. Ayrıca B'de
 * başlatılan yeni sayaç A'nınkini sessizce eziyordu.
 * localStorage okuması çok ucuz (senkron, mikro saniye); sayaç saniyede bir
 * okunuyor, ölçülebilir bir maliyeti yok.
 */
function oku(): OdakDurum | null {
  if (typeof window === "undefined") return null;
  try {
    const ham = window.localStorage.getItem(KEY);
    onbellek = ham ? (JSON.parse(ham) as OdakDurum) : null;
  } catch {
    onbellek = null;
  }
  return onbellek;
}

function yaz(d: OdakDurum | null) {
  onbellek = d;
  try {
    if (d === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* gizli sekme vb. — sayaç yine bellek üzerinden çalışır */
  }
  dinleyicilereHaberVer();
}

const dinleyiciler = new Set<() => void>();

function dinleyicilereHaberVer() {
  dinleyiciler.forEach((fn) => {
    try {
      fn();
    } catch {
      /* tek dinleyicinin hatası diğerlerini durdurmasın */
    }
  });
}

/** Durum değişikliklerine abone ol (başlat/durdur/duraklat). Temizleyici döner. */
export function odakAboneOl(fn: () => void): () => void {
  dinleyiciler.add(fn);
  baskaSekmeyiDinle();
  return () => dinleyiciler.delete(fn);
}

/** Başka sekmede sayaç değiştiyse bu sekme de haberdar olsun. */
let sekmeDinleyicisiKuruldu = false;
function baskaSekmeyiDinle() {
  if (sekmeDinleyicisiKuruldu || typeof window === "undefined") return;
  sekmeDinleyicisiKuruldu = true;
  window.addEventListener("storage", (e) => {
    if (e.key !== null && e.key !== KEY) return;
    onbellek = undefined;
    dinleyicilereHaberVer();
  });
}

export function odakDurumu(): OdakDurum | null {
  return oku();
}

/* ------------------------------ Komutlar ------------------------------ */

/**
 * Yeni sayaç başlatır. Çalışan bir oturum varsa ÖNCE onu bitirip kaydeder —
 * eskiden 47 dakikalık kronometre, "25 dk sayaç" düğmesine basılınca hiç
 * kaydedilmeden siliniyordu.
 */
export function odakBaslat(mod: OdakMod, sureSn = 0) {
  const onceki = oku();
  if (onceki) {
    const ozet = odakBitir();
    if (ozet) void odakOturumunuKaydet(ozet);
  }
  yaz({
    mod,
    baslangicMs: Date.now(),
    sureSn: mod === "sayac" ? Math.max(60, Math.round(sureSn)) : 0,
    duraklatmaMs: null,
    birikmisSn: 0,
    bitti: false,
  });
}

/** Sayaç/kronometre duraklatılır. Pomodoro'da bilerek yok — süre hep akar. */
export function odakDuraklat() {
  const d = oku();
  if (!d || d.mod === "pomodoro" || d.duraklatmaMs !== null) return;
  yaz({
    ...d,
    birikmisSn: aktifGecenSn(d),
    duraklatmaMs: Date.now(),
  });
}

export function odakDevamEt() {
  const d = oku();
  if (!d || d.duraklatmaMs === null) return;
  yaz({ ...d, baslangicMs: Date.now(), duraklatmaMs: null });
}

/**
 * Geri sayım 0'a ulaştığında BİR KEZ çağrılır (hangi sayfada olursak olalım
 * MiniOdak'ın saat tıkırtısı yakalar): bitti işaretlenir ve çalışma süresi
 * hemen kaydedilmek üzere özet döner — öğrenci "Tamam"a basmadan sekmeyi
 * kapatsa bile dakikaları kaybolmaz. Sonraki odakBitir() yeniden saymaz.
 */
export function sayacTamamla(): OdakOzet | null {
  const d = oku();
  if (!d || d.mod !== "sayac" || d.bitti) return null;
  if (sayacKalanSn(d) > 0) return null;
  // Çoklu sekme koruması: yazmadan hemen önce depoyu bir kez daha oku;
  // başka bir sekme aynı anda "bitti" yazdıysa ikinci kayıt oluşmasın.
  const tazeHam = (() => {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  })();
  if (tazeHam) {
    try {
      const taze = JSON.parse(tazeHam) as OdakDurum;
      if (taze.bitti || taze.baslangicMs !== d.baslangicMs) return null;
    } catch {
      /* bozuk kayıt — devam */
    }
  }
  yaz({ ...d, bitti: true });
  return {
    mod: "sayac",
    calismaSn: d.sureSn,
    basladiIso: new Date(d.baslangicMs).toISOString(),
  };
}

export type OdakOzet = {
  mod: OdakMod;
  /** Kaydedilecek fiilî çalışma süresi (saniye) */
  calismaSn: number;
  basladiIso: string;
};

/**
 * Sayacı bitirir, durumu temizler ve kaydedilecek çalışma süresini döner.
 * Pomodoro'da yalnız çalışma fazları sayılır; molalar çalışma sayılmaz.
 */
export function odakBitir(): OdakOzet | null {
  const d = oku();
  if (!d) return null;
  const gecen = aktifGecenSn(d);
  let calismaSn = gecen;
  if (d.mod === "pomodoro") calismaSn = pomodoroFazi(gecen).calismaSn;
  // bitti=true ise süre sayacTamamla() anında zaten kaydedildi — çift sayma.
  if (d.mod === "sayac") calismaSn = d.bitti ? 0 : Math.min(gecen, d.sureSn);
  // Terk edilmiş oturum (sekme günlerce açık kalmış) istatistiği bozmasın.
  if (calismaSn > EN_UZUN_OTURUM_SN) calismaSn = 0;
  yaz(null);
  return {
    mod: d.mod,
    calismaSn: Math.max(0, Math.floor(calismaSn)),
    basladiIso: new Date(d.baslangicMs).toISOString(),
  };
}

/* ------------------------------ Okumalar ------------------------------ */

/**
 * Bir oturumun kaydedilebilecek en uzun süresi (saniye).
 * Öğrenci sayacı açık bırakıp bilgisayarı kapatırsa ertesi gün "18 saat
 * çalıştım" kaydı oluşuyordu; 6 saat makul bir üst sınır.
 */
export const EN_UZUN_OTURUM_SN = 6 * 3600;

/** Duraklatmalar düşülmüş, fiilen akan süre (saniye). */
export function aktifGecenSn(d: OdakDurum, simdiMs = Date.now()): number {
  if (d.duraklatmaMs !== null) return d.birikmisSn;
  return d.birikmisSn + Math.max(0, (simdiMs - d.baslangicMs) / 1000);
}

/** Terk edilmiş (çok uzun süredir açık) oturum mu? */
export function terkEdilmisMi(d: OdakDurum, simdiMs = Date.now()): boolean {
  return aktifGecenSn(d, simdiMs) > EN_UZUN_OTURUM_SN;
}

/** Sayaç modunda kalan süre (saniye, 0 tabanlı). */
export function sayacKalanSn(d: OdakDurum, simdiMs = Date.now()): number {
  return Math.max(0, d.sureSn - aktifGecenSn(d, simdiMs));
}

/** mm:ss ya da s:dd:ss biçiminde gösterim. */
export function sureBicimle(toplamSn: number): string {
  const sn = Math.max(0, Math.floor(toplamSn));
  const s = Math.floor(sn / 3600);
  const dk = Math.floor((sn % 3600) / 60);
  const kalanSn = sn % 60;
  const iki = (n: number) => String(n).padStart(2, "0");
  return s > 0 ? `${s}:${iki(dk)}:${iki(kalanSn)}` : `${iki(dk)}:${iki(kalanSn)}`;
}

/* --------------------- Çalışma süresini hesaba yazma --------------------- */

/**
 * Biten odak oturumunu study_sessions'a kaydeder (>= 1 dk ise).
 * Slug'lar: serbest sayaç/kronometre "__odak__", pomodoro "__odak_pomodoro__".
 * Mevcut istatistik/seri/rozet sistemi study_sessions'ı okuduğu için odak
 * süreleri kendiliğinden günlük plana, seriye ve rozetlere işler.
 */
export async function odakOturumunuKaydet(ozet: OdakOzet): Promise<boolean> {
  if (ozet.calismaSn < 60) return false;
  try {
    const { saveSession } = await import("@/lib/tracking");
    return await saveSession({
      subjectSlug: ozet.mod === "pomodoro" ? "__odak_pomodoro__" : "__odak__",
      durationSeconds: ozet.calismaSn,
      studiedTopics: [],
      startedAt: ozet.basladiIso,
    });
  } catch {
    return false;
  }
}
