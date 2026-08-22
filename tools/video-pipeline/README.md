# Rehberim — Konu Videosu Otomasyonu

Her konu için NotebookLM'de **Video Overview** üretir, MP4'ü indirir, web için
sıkıştırır, depoya yükler ve siteye (`src/content/videos.json`) işler. Push
sonrası Vercel otomatik yayınlar; konu sayfasındaki yerleşik oynatıcı
(`VideoPlayer`) videoyu gösterir.

```
içerik (src/content) ──► kaynak belge + brief ──► NotebookLM Video Overview
      ──► MP4 indir ──► ffmpeg (720p H.264 + kapak WebP) ──► depo (R2/Supabase)
      ──► videos.json ──► git commit/push ──► Vercel
```

## Gereksinimler

- Python 3.10+ · `pip install -r tools/video-pipeline/requirements.txt`
- `ffmpeg` / `ffprobe` (PATH'te)
- Node + `npx` (içerik dökümü `tsx` ile yapılır; ayrıca kurulum gerekmez)
- NotebookLM oturumu: bir kez `notebooklm login` (ekranlı bir bilgisayarda)
  → `storage_state.json`. Cowork/bulut oturumunda bu dosya `NOTEBOOKLM_STORAGE`
  ile gösterilir. Kullanıcının PC'sinde dosya:
  `Desktop\Rehberim\nlm-home\profiles\default\storage_state.json`
- Depo anahtarları: `tools/video-pipeline/config.env` (şablon: `config.example.env`).
  Kullanıcının PC'sinde: `Desktop\Rehberim\config.env`.

## Komutlar

```bash
cd <repo>
python3 tools/video-pipeline/pipeline.py status            # site + YouTube durumu
python3 tools/video-pipeline/pipeline.py status --nlm      # + NotebookLM taraması
python3 tools/video-pipeline/pipeline.py account           # hesap katmanı / günlük kota
python3 tools/video-pipeline/pipeline.py brief fen-bilimleri/basinc   # kaynak + brief önizleme

python3 tools/video-pipeline/pipeline.py run --limit 3     # 3 yeni video üret + yayınla
python3 tools/video-pipeline/pipeline.py run --subject matematik
python3 tools/video-pipeline/pipeline.py run --only fen-bilimleri/basinc
python3 tools/video-pipeline/pipeline.py collect           # NotebookLM'de hazır olanları yayınla
python3 tools/video-pipeline/pipeline.py process video.mp4 --key turkce/fiilimsiler
```

`run` yarım kalan işleri de toparlar: `Rehberim | ders/konu` başlıklı
notebook'ları tarar, tamamlanmış videoyu indirir, süreni bekler, yoksa yeni
üretim başlatır. Günlük kota dolunca (`QuotaExceeded`) durur; ertesi gün
tekrar `run` yeter. Notebook'lar silinmez (inceleme için NotebookLM'de kalır).

## Stil / format

`VIDEO_STYLE` (classic, whiteboard, kawaii, anime, watercolor, retro-print,
heritage, paper-craft, auto, custom) ve `VIDEO_FORMAT` (explainer | brief)
`config.env` içinde. Önceki videolarla aynı görünüm için stil sabit tutulur.
Brief metni `briefs.py › build_brief` içinde (hedef kitle, yapı, kurallar,
derse özel notlar). Kaynak belge `build_source_document` (makale + harita +
kartlar + tuzaklar + sorular).

## Depo seçenekleri

| Arka uç | Ortam değişkenleri | Not |
|---|---|---|
| `s3` (Cloudflare R2, Bunny, AWS) | `S3_ENDPOINT S3_BUCKET S3_ACCESS_KEY_ID S3_SECRET_ACCESS_KEY S3_REGION PUBLIC_BASE_URL [S3_PREFIX]` | R2: 10 GB + sınırsız trafik ücretsiz; önerilen |
| `supabase` | `SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY [SUPABASE_BUCKET]` | Ücretsiz plan: 1 GB depo, 5 GB/ay trafik |
| `local` | — | `public/videos/` altına kopyalar (yalnızca deneme) |

Yüklenen dosya adı `ders/konu-<artifactid8>.mp4` → her yeni üretim yeni URL
alır; bu yüzden `Cache-Control: immutable` güvenlidir.

## Cowork oturumunda çalışma düzeni (bulut + PC ajanı)

Cowork bulut ortamının ağı kısıtlıdır: NotebookLM, Google, Supabase ve
Cloudflare'e **erişemez** (yalnızca paket depoları ve GitHub API açık). Bu
yüzden üretim kullanıcının PC'sinde, dosya tabanlı bir ajanla yapılır:

```
Desktop\Rehberim\
  config.env                 NotebookLM yolu + depo anahtarları (PC'de kalır)
  nlm-home\                  notebooklm-py profili (storage_state.json, çerezler yerinde döner)
  nlm-venv\                  Python ortamı (NotebookLM-Giris.bat kurar)
  ajan\Ajan-Baslat.bat       ajanı başlatır (pencere açık kalır)
  ajan\agent.py              komut kuyruğu: komutlar\*.json → sonuclar\<id>\
  ajan\pipeline\             bu klasörün kopyası + content.json (Node gerekmez)
```

Cowork tarafında akış:

1. `npx -y tsx tools/video-pipeline/export_content.ts > content.json` → PC'ye
   `ajan\pipeline\content.json` olarak yaz (kayıtlı videolar da içinde; ajan
   bunları atlar). Pipeline kodu değiştiyse `ajan\pipeline\*.py` dosyalarını da güncelle.
2. `ajan\komutlar\<id>.json` yaz: `{"id": "<id>", "argv": ["run", "--limit", "3"]}`
   (ajan `--env` ve `--results-dir` ekler). Diğer komutlar: `account`, `videos`,
   `collect`, `adopt --notebook … --key …`, `process …`, `ping`, `stop`.
3. `ajan\heartbeat.json` (ajan açık mı?) ve `ajan\sonuclar\<id>\durum.json`
   (`running|done|failed`, `log_tail`, `results`) dosyalarını oku.
4. `sonuclar\<id>\<ders>__<konu>.json` → `src/content/videos.json`'a işle
   (`registry.register_video`), commit + push → Vercel yayınlar.

Push yetkisi yoksa commit'ler yerelde kalır; yetki gelince `git push origin main`.
