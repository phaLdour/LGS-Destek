/*
 * Rehberim — minimal, güvenli service worker.
 *
 * Yalnız DEĞİŞMEZ varlıkları önbelleğe alır:
 *   1) Çıkmış soru görüntüleri (/cikmis-sorular/.../*.webp) — cache-first
 *   2) Next.js hash'li statik chunk'lar (/_next/static/...) — stale-while-revalidate
 *   3) /offline.html — internet gidince gösterilecek kendi ekranımız
 *   4) /cevrimdisi ve /cevrimdisi/veri.json — çevrimdışı ders kütüphanesi
 *
 * ÖĞRENCİYE AİT SAYFALAR ÖNBELLEĞE ALINMAZ. Bu bilinçli bir tercih:
 * onları saklamak bayat içerik ve oturum karışması riski doğurur
 * (aynı telefonu kullanan kardeş, okul tableti...). İnternet yokken
 * gezinme denemesi başarısız olursa /offline.html gösterilir.
 *
 * TEK İSTİSNA /cevrimdisi'dir ve istisna olmasının sebebi var: o sayfa
 * hiçbir kişisel veri okumaz (bkz. src/app/cevrimdisi/page.tsx), içeriği
 * her öğrenci için birebir aynıdır. Saklanmazsa da zaten amacını
 * yitirirdi — internet yokken açılamayan bir "çevrimdışı sayfa".
 *
 * API ('/api/...') ve auth istekleri hiç ele alınmaz.
 */
const VERSION = "rehberim-v3";
const IMG_CACHE = `${VERSION}-img`;
const STATIC_CACHE = `${VERSION}-static`;
const KABUK_CACHE = `${VERSION}-kabuk`;
const OFFLINE_URL = "/offline.html";

/*
 * Çevrimdışı kütüphane önbelleği. DİKKAT: adı bilerek VERSION içermiyor.
 * Öğrencinin indirdiği 620 KB'lık ders paketi her sürümde silinmemeli —
 * silinseydi her yayında telefon sessizce çevrimdışı yeteneğini
 * kaybederdi. Aşağıdaki `activate` temizliği bu adı korur.
 * src/lib/cevrimdisiIstemci.ts içindeki CEVRIMDISI_CACHE ile aynı olmalı.
 */
const CEVRIMDISI_CACHE = "rehberim-cevrimdisi";
const CEVRIMDISI_YOLU = "/cevrimdisi";
const CEVRIMDISI_VERI_YOLU = "/cevrimdisi/veri.json";

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
          // Çevrimdışı paketi sürüm temizliğinden MUAF: öğrencinin
          // indirdiği ders içeriği yeni yayında silinmemeli.
          .filter((k) => !k.startsWith(VERSION) && k !== CEVRIMDISI_CACHE)
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

  // 3) Çevrimdışı ders paketi: network-first, düşerse saklanan kopya.
  //    Network-first, çünkü internet varken en güncel içerik gelmeli;
  //    cache fallback, çünkü paketin tek varlık sebebi internetsizlik.
  if (url.pathname === CEVRIMDISI_VERI_YOLU) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CEVRIMDISI_CACHE);
        try {
          const res = await fetch(request);
          if (res.ok) cache.put(CEVRIMDISI_VERI_YOLU, res.clone());
          return res;
        } catch (e) {
          const hit = await cache.match(CEVRIMDISI_VERI_YOLU);
          if (hit) return hit;
          throw e;
        }
      })(),
    );
    return;
  }

  // 4) Sayfa gezinmesi.
  if (request.mode === "navigate") {
    // /cevrimdisi TEK İSTİSNA: kişisel veri içermez (bkz. dosya başı),
    // saklanmazsa internet yokken açılamaz ve amacını yitirir.
    if (url.pathname === CEVRIMDISI_YOLU) {
      event.respondWith(
        (async () => {
          const cache = await caches.open(CEVRIMDISI_CACHE);
          try {
            const res = await fetch(request);
            if (res.ok) cache.put(CEVRIMDISI_YOLU, res.clone());
            return res;
          } catch (e) {
            const hit = await cache.match(CEVRIMDISI_YOLU);
            if (hit) return hit;
            throw e;
          }
        })(),
      );
      return;
    }

    // Diğer sayfalar: önbelleğe ALINMAZ, ama internet yoksa kendi
    // çevrimdışı ekranımızı göster (tarayıcının hata sayfası yerine).
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
