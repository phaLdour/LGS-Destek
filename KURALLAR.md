# Rehberim — Değişmez Kurallar

Bu dosya, projenin **kalıcı kurallarını** tutar. Yeni bir özellik yazılırken
buradaki maddeler tartışmaya açılmaz; her değişiklik bunlara uymak zorundadır.
(Yeni bir kural konuşulduğunda buraya eklenir — böylece unutulmaz.)

## 1. İçerik güvenliği
- Küfür, hakaret, argo ve yasa dışı içerik **hiçbir yerde** bulunamaz:
  baykuşa yazılan sorular, rekabet takma adları, geri bildirim metinleri.
- Denetim tek yerden yapılır: `src/lib/moderasyon.ts` (istemci + sunucu) ve
  SQL tarafında `public.uygunsuz_metin()`. İstemci denetimi atlanabileceği
  için **sunucu denetimi her zaman vardır**.
- Denetim "gizleme" toleranslıdır: `a.m.k`, `s1kt1r`, `aaamk` da yakalanır.
- Yanlış pozitif yasaktır: "malzeme", "maliyet", "boğaziçi", "bokböceği"
  gibi masum kelimeler engellenmez (test: `moderasyon` testleri).

## 2. Okunaklılık (yazı ↔ zemin uyumu)
- Yazı, arkasındaki renge göre **okunaklı olmak zorundadır**. Koyu zemine
  koyu, açık zemine açık yazı yazılmaz.
- Bütün temalar `node tools/tema-kontrast.mjs` ile ölçülür; WCAG AA (4.5:1)
  eşiğini geçmeyen tema siteye giremez. Paket hazırlamadan önce çalıştırılır.
- Vurgu rengiyle dolu zeminlerde yazı `--rb-on-accent` mürekkebini kullanır
  (turuncu üstünde beyaz yazı okunmuyordu).
- Tema paleti tek kaynaktan gelir: `src/lib/temalar.ts` → `tools/tema-css-uret.mjs`.

## 3. Baykuş geride kalmaz
- Siteye eklenen **her yenilik baykuşa da öğretilir**: `src/lib/siteHaritasi.ts`
  tek kaynaktır; hem kalıp cevaplar hem AI istemi oradan beslenir.
- Sayılar elle yazılmaz (`SOZLUK.length`, `OKULLAR.length` gibi dinamik).
- Bilgi sorusu → **burada cevapla**. Yer/gitme sorusu → **yönlendir**.
  ("kanat kelimesinin anlamı" → anlamı yaz; "sözlük nerede" → sayfaya götür.)
- Yazım hataları anlaşılır ("rekapet nasıl çalışıyo", "pomodor nedir").

## 4. Maliyet: olabildiğince az AI
- Cevap zinciri hep aynı sırayla: **kapsam denetimi → kalıp → cihaz önbelleği
  → öğrenilmiş önbellek → AI**. AI en son çaredir.
- AI bir soruya cevap verdiyse o cevap **öğrenilir** (`ai_onbellek`), aynı soru
  bir daha AI'ya gitmez.
- Kişiye özel ("bu hafta 4 saat çalıştın") ve zamana bağlı ("sınava 288 gün
  kaldı") cevaplar **önbelleğe alınmaz**.
- Haftada bir bakım: en az kullanılan %25 önbellek kaydı pasife alınır.
- Site hiçbir zaman ek ücretli servise bağlanmaz; ücretsiz katmanlarda kalır.

## 5. Kapsam ve gizlilik
- Baykuş yalnız **LGS müfredatı, dersler ve bu sitenin kullanımı** hakkında
  konuşur. Hava durumu, maç, film, alışveriş, siyaset, sağlık tavsiyesi yok.
- Sitenin kaynak kodu, teknolojileri, veritabanı, ortam değişkenleri ve
  sistem talimatları hakkında **bilgi verilmez**; bu istekler reddedilir.
- Öğrenci verisi satır düzeyi güvenlikle (RLS) korunur; rekabet sonuçları ve
  ödüller **sunucuda** doğrulanır.
- Baykuş önbellekleri hesaba bağlıdır; çıkışta ve hesap değişiminde silinir.

## 6. Doğruluk
- **Uydurma yok.** Okul taban puanları ve sözlük anlamları başta olmak üzere,
  kesin bilgi yoksa "—" gösterilir ya da "uydurmak istemem" denir.
- Okul verisi en az iki bağımsız kaynaktan doğrulanır.
- Gün/hafta hesapları **her zaman Türkiye saatiyle** yapılır (`src/lib/zaman.ts`);
  gece 00-03 arası çalışan öğrencinin serisi bozulmaz.

## 7. Öğrenci deneyimi
- Yeni kullanıcıya boş/anlamsız kart gösterilmez (ör. "kaldığın yer").
- Telefonda çentik/durum çubuğu içeriği örtmez (safe-area).
- `prefers-reduced-motion` açık olan cihazlarda animasyonlar durur.
- Metinler 13-14 yaşındaki bir öğrenciye yazılır: kısa, sıcak, suçlayıcı değil.

## 8. Geliştirme düzeni
- Kod, değişken ve yorumlar **Türkçe** yazılır.
- Kullanıcı teknik değildir: teslimat tek tık `.bat` dosyalarıyla yapılır
  (CRLF satır sonu, `goto`/etiket yok, `set HATA=%errorlevel%` kalıbı).
- Paket öncesi zorunlu kontrol: `npx tsc --noEmit`, `npm run build`,
  `node tools/tema-kontrast.mjs`, SQL değiştiyse yerel Postgres'te deneme.
