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
