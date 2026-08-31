/**
 * sw.js'i sahte bir service worker ortamında çalıştırıp davranışını sınar.
 * Tarayıcı gerekmez; kodun kendisi yüklenir.
 */
import fs from 'fs';
import vm from 'vm';

function sahteOrtamKur({ agVar }) {
  const depolar = new Map();
  const olaylar = {};
  const caches = {
    async open(ad) {
      if (!depolar.has(ad)) depolar.set(ad, new Map());
      const d = depolar.get(ad);
      return {
        async addAll(urls) { for (const u of urls) d.set(u, { cevap: `icerik:${u}` }); },
        async match(req) { const k = typeof req === 'string' ? req : req.url; return d.get(k) ?? d.get(new URL(k, 'https://x').pathname) ?? undefined; },
        async put(req, res) { d.set(typeof req === 'string' ? req : req.url, res); },
      };
    },
    async keys() { return [...depolar.keys()]; },
    async delete(k) { return depolar.delete(k); },
  };

  const self = {
    location: { origin: 'https://x' },
    addEventListener: (t, f) => { (olaylar[t] ||= []).push(f); },
    skipWaiting: () => { self.__skipWaitingCagrildi = true; },
    clients: { claim: async () => {}, matchAll: async () => [], openWindow: async () => {} },
    registration: { showNotification: async () => {} },
    __skipWaitingCagrildi: false,
  };

  const ctx = {
    self, caches, clients: self.clients, console,
    URL, Response: class { constructor(b, o = {}) { this.body = b; this.status = o.status ?? 200; this.ok = this.status < 400; this.headers = o.headers ?? {}; } },
    fetch: async () => { if (!agVar) throw new Error('ag yok'); return { ok: true, body: 'agdan', clone() { return this; } }; },
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8'), ctx);
  return { self, olaylar, ctx, depolar };
}

function tetikle(olaylar, tip, olay) {
  const f = (olaylar[tip] || []);
  for (const fn of f) fn(olay);
}

let gecti = 0, kaldi = 0;
function kontrol(ad, sart) {
  if (sart) { console.log('  GECTI ', ad); gecti++; }
  else { console.log('  KALDI ', ad); kaldi++; }
}

console.log('\n1) Kurulumda skipWaiting cagrilmiyor + offline.html onbellege aliniyor');
{
  const { self, olaylar, depolar } = sahteOrtamKur({ agVar: true });
  let bekle;
  tetikle(olaylar, 'install', { waitUntil: (p) => { bekle = p; } });
  await bekle;
  kontrol('skipWaiting install sirasinda CAGRILMADI', self.__skipWaitingCagrildi === false);
  const kabuk = [...depolar.entries()].find(([k]) => k.includes('kabuk'));
  kontrol('offline.html onbellekte', !!kabuk && kabuk[1].has('/offline.html'));
}

console.log('\n2) SKIP_WAITING mesaji gelince yeni surume geciliyor');
{
  const { self, olaylar } = sahteOrtamKur({ agVar: true });
  tetikle(olaylar, 'message', { data: { type: 'SKIP_WAITING' } });
  kontrol('skipWaiting mesajla cagrildi', self.__skipWaitingCagrildi === true);
  const t2 = sahteOrtamKur({ agVar: true });
  tetikle(t2.olaylar, 'message', { data: { type: 'BASKA' } });
  kontrol('alakasiz mesaj skipWaiting cagirmadi', t2.self.__skipWaitingCagrildi === false);
}

console.log('\n3) Internet yokken gezinme -> offline.html');
{
  const { olaylar } = sahteOrtamKur({ agVar: false });
  let bekle;
  tetikle(olaylar, 'install', { waitUntil: (p) => { bekle = p; } });
  await bekle;
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'navigate', url: 'https://x/dashboard' },
    respondWith: (p) => { cevapSozu = p; },
  });
  const cevap = await cevapSozu;
  kontrol('offline.html donduruldu', cevap && cevap.cevap === 'icerik:/offline.html');
}

console.log('\n4) Internet varken gezinme -> agdan gelir (onbellege ALINMAZ)');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: true });
  let bekle;
  tetikle(olaylar, 'install', { waitUntil: (p) => { bekle = p; } });
  await bekle;
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'navigate', url: 'https://x/sozluk' },
    respondWith: (p) => { cevapSozu = p; },
  });
  const cevap = await cevapSozu;
  kontrol('cevap agdan geldi', cevap && cevap.body === 'agdan');
  const hicbirDepodaSayfaYok = [...depolar.values()].every((d) => !d.has('https://x/sozluk'));
  kontrol('sayfa onbellege ALINMADI (bayat icerik riski yok)', hicbirDepodaSayfaYok);
}

console.log('\n5) API istekleri hic ele alinmiyor');
{
  const { olaylar } = sahteOrtamKur({ agVar: false });
  let cagrildi = false;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'cors', url: 'https://x/api/comp/queue/join' },
    respondWith: () => { cagrildi = true; },
  });
  kontrol('API istegine dokunulmadi', cagrildi === false);
}

console.log('\n6) POST istekleri hic ele alinmiyor');
{
  const { olaylar } = sahteOrtamKur({ agVar: false });
  let cagrildi = false;
  tetikle(olaylar, 'fetch', {
    request: { method: 'POST', mode: 'navigate', url: 'https://x/login' },
    respondWith: () => { cagrildi = true; },
  });
  kontrol('POST istegine dokunulmadi', cagrildi === false);
}

console.log('\n7) Cevrimdisi ders paketi: agdan gelir ve SAKLANIR');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: true });
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'cors', url: 'https://x/cevrimdisi/veri.json' },
    respondWith: (p) => { cevapSozu = p; },
  });
  const cevap = await cevapSozu;
  kontrol('veri agdan geldi', cevap && cevap.body === 'agdan');
  const paketDepo = depolar.get('rehberim-cevrimdisi');
  kontrol('veri onbellege alindi', !!paketDepo && paketDepo.has('/cevrimdisi/veri.json'));
}

console.log('\n8) Internet yokken ders paketi saklanan kopyadan gelir');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: false });
  // Once ogrenci internet varken indirmis gibi davran.
  depolar.set('rehberim-cevrimdisi', new Map([['/cevrimdisi/veri.json', { body: 'saklanan-paket' }]]));
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'cors', url: 'https://x/cevrimdisi/veri.json' },
    respondWith: (p) => { cevapSozu = p; },
  });
  const cevap = await cevapSozu;
  kontrol('saklanan paket donduruldu', cevap && cevap.body === 'saklanan-paket');
}

console.log('\n9) Internet yokken /cevrimdisi sayfasi ACILIR (offline.html degil)');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: false });
  let bekle;
  tetikle(olaylar, 'install', { waitUntil: (p) => { bekle = p; } });
  await bekle;
  depolar.set('rehberim-cevrimdisi', new Map([['/cevrimdisi', { body: 'cevrimdisi-sayfasi' }]]));
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'navigate', url: 'https://x/cevrimdisi' },
    respondWith: (p) => { cevapSozu = p; },
  });
  const cevap = await cevapSozu;
  kontrol('cevrimdisi sayfasi saklanan kopyadan geldi', cevap && cevap.body === 'cevrimdisi-sayfasi');
}

console.log('\n10) Ogrenciye ait sayfalar HALA saklanmiyor (sadece /cevrimdisi istisna)');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: true });
  for (const yol of ['/dashboard', '/profile', '/hatalarim', '/cevrimdisi-baska']) {
    let cevapSozu;
    tetikle(olaylar, 'fetch', {
      request: { method: 'GET', mode: 'navigate', url: `https://x${yol}` },
      respondWith: (p) => { cevapSozu = p; },
    });
    await cevapSozu;
  }
  const hicSaklanmadi = [...depolar.values()].every((d) =>
    !d.has('https://x/dashboard') && !d.has('/dashboard') &&
    !d.has('https://x/profile') && !d.has('/profile') &&
    !d.has('https://x/hatalarim') && !d.has('/hatalarim') &&
    !d.has('https://x/cevrimdisi-baska') && !d.has('/cevrimdisi-baska'),
  );
  kontrol('kisisel sayfalar onbellege ALINMADI', hicSaklanmadi);
}

console.log('\n11) Yeni surum yayinlaninca indirilen ders paketi SILINMEZ');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: true });
  // Ogrencinin indirdigi paket + eski bir surum onbellegi
  depolar.set('rehberim-cevrimdisi', new Map([['/cevrimdisi/veri.json', { body: 'paket' }]]));
  depolar.set('rehberim-v1-img', new Map([['/eski.webp', { body: 'x' }]]));
  let bekle;
  tetikle(olaylar, 'activate', { waitUntil: (p) => { bekle = p; } });
  await bekle;
  kontrol('ders paketi korundu', depolar.has('rehberim-cevrimdisi'));
  kontrol('eski surum onbellegi temizlendi', !depolar.has('rehberim-v1-img'));
}

console.log('\n12) Odak tema fotograflari onbellege aliniyor (artik kendi sunucumuzda)');
{
  const { olaylar, depolar } = sahteOrtamKur({ agVar: true });
  let cevapSozu;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'no-cors', url: 'https://x/odak/orman.webp' },
    respondWith: (p) => { cevapSozu = p; },
  });
  await cevapSozu;
  const img = [...depolar.entries()].find(([k]) => k.includes('img'));
  kontrol('odak fotografi onbellege alindi', !!img && img[1].has('https://x/odak/orman.webp'));
}

console.log('\n13) Resim olmayan /odak yolu onbellege ALINMAZ');
{
  const { olaylar } = sahteOrtamKur({ agVar: true });
  let cagrildi = false;
  tetikle(olaylar, 'fetch', {
    request: { method: 'GET', mode: 'no-cors', url: 'https://x/odak/veri.json' },
    respondWith: () => { cagrildi = true; },
  });
  kontrol('json dosyasina dokunulmadi', cagrildi === false);
}

console.log(`\n===== ${gecti} gecti, ${kaldi} kaldi =====`);
process.exit(kaldi === 0 ? 0 : 1);
