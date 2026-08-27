/**
 * Web Push abonelik yardımcıları (istemci).
 *
 * Akış: kullanıcı anahtarı açar → tarayıcı bildirim izni ister →
 * service worker üzerinden push aboneliği alınır → abonelik Supabase'e
 * yazılır (RLS: herkes yalnız kendi satırını). Cron her akşam bu
 * aboneliklere bildirim gönderir.
 */
import { createClient } from "@/lib/supabase/client";

export type PushDurumu =
  | "destekleniyor"
  | "desteklenmiyor"
  | "izin-reddedildi";

/** Bu tarayıcı/cihaz push destekliyor mu? */
export function pushDurumu(): PushDurumu {
  if (
    typeof window === "undefined" ||
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("Notification" in window)
  ) {
    return "desteklenmiyor";
  }
  if (Notification.permission === "denied") return "izin-reddedildi";
  return "destekleniyor";
}

/** VAPID public key'i push API'sinin istediği biçime çevirir. */
function base64ToUint8(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Mevcut aboneliği döndürür (yoksa null). */
export async function mevcutAbonelik(): Promise<PushSubscription | null> {
  if (pushDurumu() !== "destekleniyor") return null;
  const reg = await navigator.serviceWorker.ready;
  return reg.pushManager.getSubscription();
}

/**
 * Bildirim izni ister, abonelik oluşturur ve sunucuya kaydeder.
 * Başarısızlıkta kullanıcıya gösterilecek Türkçe bir hata döndürür.
 */
export async function abonelikAc(): Promise<{ ok: boolean; hata?: string }> {
  const anahtar = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!anahtar) {
    return { ok: false, hata: "Push henüz yapılandırılmadı (VAPID anahtarı eksik)." };
  }
  if (pushDurumu() === "desteklenmiyor") {
    return {
      ok: false,
      hata:
        "Bu tarayıcı push desteklemiyor. iPhone'da: siteyi Safari'de açıp 'Ana Ekrana Ekle' yaptıktan sonra uygulamadan tekrar dene.",
    };
  }

  const izin = await Notification.requestPermission();
  if (izin !== "granted") {
    return { ok: false, hata: "Bildirim izni verilmedi. Tarayıcı ayarlarından izin verebilirsin." };
  }

  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8(anahtar).buffer as ArrayBuffer,
    });
  }

  const json = sub.toJSON();
  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    return { ok: false, hata: "Abonelik oluşturulamadı, lütfen tekrar dene." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, hata: "Önce giriş yapmalısın." };

  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      endpoint: json.endpoint,
      user_id: user.id,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
    { onConflict: "endpoint" },
  );
  if (error) return { ok: false, hata: "Kaydedilemedi: " + error.message };
  return { ok: true };
}

/** Aboneliği hem tarayıcıdan hem sunucudan kaldırır. */
export async function abonelikKapat(): Promise<void> {
  const sub = await mevcutAbonelik();
  if (!sub) return;
  const endpoint = sub.endpoint;
  try {
    await sub.unsubscribe();
  } catch {
    /* tarayıcı kaldıramadıysa da sunucu kaydını sil */
  }
  try {
    const supabase = createClient();
    await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
  } catch {
    /* çevrimdışı — cron 410 alınca kendisi temizler */
  }
}
