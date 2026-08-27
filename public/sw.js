/*
 * Rehberim — minimal, güvenli service worker.
 *
 * Yalnız DEĞİŞMEZ varlıkları önbelleğe alır:
 *   1) Çıkmış soru görüntüleri (/cikmis-sorular/.../*.webp) — cache-first
 *   2) Next.js hash'li statik chunk'lar (/_next/static/...) — stale-while-revalidate
 *
 * HTML, API ('/api/...'), auth ve diğer dinamik istekler ASLA ele
 * alınmaz (network'e dokunulmadan geçer) → bayat içerik / oturum hatası
 * riski yok. Cache sürümü değişince eski cache temizlenir.
 */
const VERSION = "rehberim-v1";
const IMG_CACHE = `${VERSION}-img`;
const STATIC_CACHE = `${VERSION}-static`;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isQuestionImage(url) {
  return (
    url.pathname.startsWith("/cikmis-sorular/") &&
    (url.pathname.endsWith(".webp") || url.pathname.endsWith(".png"))
  );
}

function isNextStatic(url) {
  return url.pathname.startsWith("/_next/static/");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 1) Soru görüntüleri: cache-first (değişmez içerik)
  if (isQuestionImage(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(IMG_CACHE);
        const hit = await cache.match(request);
        if (hit) return hit;
        const res = await fetch(request);
        if (res.ok) cache.put(request, res.clone());
        return res;
      })(),
    );
    return;
  }

  // 2) Hash'li statik chunk'lar: stale-while-revalidate
  if (isNextStatic(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const hit = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || fetchPromise;
      })(),
    );
    return;
  }

  // Diğer her şey: dokunma (network).
});

/* ────────────────────────────────────────────────────────────────
   WEB PUSH — telefon bildirimleri.
   Sunucu (cron) push gönderir; burada bildirim olarak gösterilir.
   Veri JSON'dur: { title, body, url }
   ──────────────────────────────────────────────────────────────── */
self.addEventListener("push", (event) => {
  let veri = { title: "Rehberim", body: "Baykuş seni bekliyor 🦉", url: "/dashboard" };
  try {
    if (event.data) veri = { ...veri, ...event.data.json() };
  } catch {
    /* bozuk veri — varsayılan metinle göster */
  }
  event.waitUntil(
    self.registration.showNotification(veri.title, {
      body: veri.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url: veri.url },
      tag: "rehberim-hatirlatma", // aynı gün ikinci bildirim üstüne yazar
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const hedef = event.notification.data?.url || "/dashboard";
  event.waitUntil(
    (async () => {
      const pencereler = await clients.matchAll({ type: "window", includeUncontrolled: true });
      // Açık bir sekme varsa ona odaklan, yoksa yeni aç
      for (const w of pencereler) {
        if ("focus" in w) {
          await w.focus();
          if ("navigate" in w) await w.navigate(hedef);
          return;
        }
      }
      await clients.openWindow(hedef);
    })(),
  );
});
