/**
 * PWA kurulum durumu — tek kaynak.
 *
 * "Uygulamayı yükle" davetini hem alt şerit (KurulumDaveti) hem de profil
 * sayfasındaki kalıcı düğme (KurulumDugmesi) gösteriyor. İkisinin de aynı
 * tarayıcı olayına (`beforeinstallprompt`) ihtiyacı var ve o olay sayfa
 * ömrü boyunca YALNIZ BİR KEZ tetiklenir — iki bileşen ayrı ayrı dinlerse
 * biri olayı kaçırır. Bu yüzden olay burada, modül düzeyinde bir kez
 * yakalanır ve abone olan herkese dağıtılır.
 */

/** Tarayıcının verdiği kurulum olayı (henüz standart tiplerde yok). */
type KurulumOlayi = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const RET_ANAHTARI = "rehberim:kurulum-reddedildi";
/** Öğrenci daveti kapatırsa bu kadar gün bir daha gösterilmez. */
const RET_GUN = 30;

let bekleyenOlay: KurulumOlayi | null = null;
let kuruldu = false;
const aboneler = new Set<() => void>();

function duyur() {
  aboneler.forEach((f) => f());
}

/** Uygulama zaten kurulu mu (ana ekrandan/uygulamadan açıldı mı)? */
export function kuruluMu(): boolean {
  if (typeof window === "undefined") return false;
  if (kuruldu) return true;
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
    if (window.matchMedia("(display-mode: minimal-ui)").matches) return true;
    // iOS Safari standart olmayan bayrağı kullanır
    if ((window.navigator as { standalone?: boolean }).standalone) return true;
  } catch {
    /* matchMedia yoksa yükleme durumunu bilemeyiz — kurulu değil say */
  }
  return false;
}

/** iOS'ta mıyız? iOS'ta `beforeinstallprompt` YOKTUR; elle rehber gerekir. */
export function iosMu(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  // iPadOS 13+ kendini Mac gibi tanıtır; dokunmatik varlığıyla ayırt edilir.
  const ipadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || ipadOS;
}

/** Tarayıcı bize kurulum sunabiliyor mu (Android/masaüstü Chrome, Edge)? */
export function kurulumHazirMi(): boolean {
  return bekleyenOlay !== null;
}

/** Öğrenci daveti yakın zamanda kapattı mı? */
export function davetReddedildiMi(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const ham = window.localStorage.getItem(RET_ANAHTARI);
    if (!ham) return false;
    const ms = Number(ham);
    if (!Number.isFinite(ms)) return false;
    return Date.now() - ms < RET_GUN * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function davetiReddet(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RET_ANAHTARI, String(Date.now()));
  } catch {
    /* gizli mod — bu oturumda gizlemek yeter */
  }
  duyur();
}

/**
 * Kurulumu başlat. Tarayıcının kendi kurulum penceresini açar.
 * Dönüş: kullanıcı kabul ettiyse true.
 */
export async function kurulumuBaslat(): Promise<boolean> {
  const olay = bekleyenOlay;
  if (!olay) return false;
  // Olay tek kullanımlıktır: prompt() çağrıldıktan sonra tekrar kullanılamaz.
  bekleyenOlay = null;
  duyur();
  try {
    await olay.prompt();
    const { outcome } = await olay.userChoice;
    if (outcome === "accepted") {
      kuruldu = true;
      duyur();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function kurulumAboneOl(f: () => void): () => void {
  aboneler.add(f);
  return () => {
    aboneler.delete(f);
  };
}

/** Tarayıcı olaylarını modül düzeyinde bir kez bağla. */
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Varsayılan mini çubuğu bastır; daveti biz kendi tasarımımızla veririz.
    e.preventDefault();
    bekleyenOlay = e as KurulumOlayi;
    duyur();
  });
  window.addEventListener("appinstalled", () => {
    kuruldu = true;
    bekleyenOlay = null;
    duyur();
  });
}
