/*
 * Rehberim — minimal, güvenli service worker.
 *
 * Yalnız DEĞİŞMEZ varlıkları önbelleğe alır:
 *   1) Çıkmış soru görüntüleri (/cikmis-sorular/.../*.webp) — cache-first
 *   2) Next.js hash'li statik chunk'lar (/_next/static/...) — stale-while-revalidate
 *   3) /offline.html — internet gidince gösterilecek kendi ekranımız
 *
 * SAYFA (HTML) ÖNBELLEĞE ALINMAZ. Bu bilinçli bir tercih: sayfaları
 * saklamak bayat içerik ve oturum karışması riski doğurur. İnternet
 * yokken gezinme denemesi başarısız olursa tarayıcının dinozor ekranı
 * yerine /offline.html gösterilir — o kadar.
 *
 * API ('/api/...') ve auth istekleri hiç ele alınmaz.
 */
const VERSION = "rehberim-v2";
const IMG_CACHE = `${VERSION}-img`;
const STATIC_CACHE = `${VERSION}-static`;
const KABUK_CACHE = `${VERSION}-kabuk`;
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  // Çevrimdışı ekranını ve ikonlarını şimdiden sakla: internet gittiğinde
  // indirilecek bir şey kalmamalı.
  event.waitUntil(
    (async () => {
      const cache = await caches.open(KABUK_CACHE);
      await cache.addAll([OFFLINE_URL, "/favicon.svg"]);
    })(),
  );
  // NOT: skipWaiting() burada BİLEREK çağrılmıyor.
  // Eskiden çağrılıyordu; yeni sürüm yayına çıkınca açık duran sekmenin
  // service worker'ı anında değişiyor, sayfa ise hâlâ eski JS parçalarını
  // istiyordu — Vercel o parçaları silmiş olduğu için sınav ortasında
  // "ChunkLoadError" alınabiliyordu. Artık yeni sürüm beklemeye geçer,
  // öğrenciye "yeni sürüm var" bildirimi gösterilir ve geçiş onun
  // dokunuşuyla (aşağıdaki SKIP_WAITING mesajı) yapılır.
});

// Sayfa "hazırım, geç" derse yeni sürüme geç.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
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

  // 3) Sayfa gezinmesi: önbelleğe ALINMAZ, ama internet yoksa kendi
  //    çevrimdışı ekranımızı göster (tarayıcının hata sayfası yerine).
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(KABUK_CACHE);
          const yedek = await cache.match(OFFLINE_URL);
          return (
            yedek ||
            new Response("İnternet bağlantısı yok.", {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
          );
        }
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
