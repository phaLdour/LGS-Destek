#!/usr/bin/env python3
"""
Rehberim uygulama ikonlarını üretir.

NE ZAMAN ÇALIŞTIRILIR: yalnız marka logosu değişirse. Çıktı PNG'leri
depoya işlenir; derleme sırasında çalışmaz (Pillow bir bağımlılık değil).

    python3 tools/ikon-uret.py

NEDEN VAR:
  1. Logo, lacivert karenin İÇİNDE ortalanmamıştı — 33px sağa, 20px
     yukarı kaymıştı (sol boşluk 153px, sağ boşluk 87px). Telefonun ana
     ekranında bu gözle görülüyordu.
  2. manifest.json aynı dosyayı hem "any" hem "maskable" amaçlı
     gösteriyordu. Android maskable ikonu daire/squircle'a kırpar ve
     YALNIZ ortadaki %80'lik "güvenli bölge"yi korur. Kenardan kenara
     çizilmiş bu ikonda dış %20 kesiliyor, yuvarlak köşeler ve okun ucu
     gidiyordu — logo kırpılmış ve kaymış görünüyordu.

ÇÖZÜM: iki ayrı ikon üretiliyor.
  * icon-192/512.png      → "any": yuvarlak köşeli kare, köşeler saydam,
                            logo tam ortada.
  * icon-maskable-512.png → "maskable": KENARDAN KENARA dolu lacivert
                            kare (saydamlık yok), logo güvenli bölgenin
                            içinde ortada. Android kırpsa da logo bozulmaz.
  * apple-touch-icon.png  → iOS saydamlığı siyaha çevirdiği için opak.
"""

from PIL import Image, ImageDraw

KAYNAK = "public/icon-512.png"
LACIVERT = (22, 36, 76, 255)
BOYUT = 512
# Orijinal ikonun köşe yarıçapı ölçüldü: ~%20
KOSE_YARICAP = int(BOYUT * 0.20)


def logo_kutusu(im):
    """Lacivert zeminden farklı (yani logoya ait) piksellerin sınırları."""
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, -1, -1
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 40:
                continue
            if abs(r - 22) + abs(g - 36) + abs(b - 76) > 90:
                minx = min(minx, x)
                maxx = max(maxx, x)
                miny = min(miny, y)
                maxy = max(maxy, y)
    return minx, miny, maxx, maxy


def yuvarlak_kare(boyut, yaricap, renk):
    im = Image.new("RGBA", (boyut, boyut), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, boyut - 1, boyut - 1], radius=yaricap, fill=renk)
    return im


def main():
    kaynak = Image.open(KAYNAK).convert("RGBA")
    if kaynak.size != (BOYUT, BOYUT):
        kaynak = kaynak.resize((BOYUT, BOYUT), Image.LANCZOS)

    minx, miny, maxx, maxy = logo_kutusu(kaynak)
    gw, gh = maxx - minx + 1, maxy - miny + 1
    print(f"logo kutusu {gw}x{gh}, boşluklar sol={minx} sağ={BOYUT-1-maxx} "
          f"üst={miny} alt={BOYUT-1-maxy}")

    # Logoyu çevresindeki DÜZ lacivert zeminle birlikte kesiyoruz; zemin her
    # yerde birebir aynı renk olduğu için yapıştırma dikişsiz olur ve
    # kenar yumuşatması (anti-aliasing) bozulmaz.
    pay = 8
    kesim = kaynak.crop(
        (max(0, minx - pay), max(0, miny - pay),
         min(BOYUT, maxx + 1 + pay), min(BOYUT, maxy + 1 + pay))
    )
    kw, kh = kesim.size

    def ortala(zemin):
        hedef = zemin.copy()
        hedef.paste(kesim, ((BOYUT - kw) // 2, (BOYUT - kh) // 2))
        return hedef

    # ---- 1) Normal ikon: yuvarlak köşeli, köşeler saydam ----
    normal = ortala(yuvarlak_kare(BOYUT, KOSE_YARICAP, LACIVERT))
    # Köşe saydamlığını geri uygula (yapıştırma kareyi doldurdu)
    maske = yuvarlak_kare(BOYUT, KOSE_YARICAP, (255, 255, 255, 255)).split()[3]
    normal.putalpha(maske)
    normal.save("public/icon-512.png")
    normal.resize((192, 192), Image.LANCZOS).save("public/icon-192.png")
    print("yazıldı: public/icon-512.png, public/icon-192.png")

    # ---- 2) Maskable: kenardan kenara dolu, logo güvenli bölgede ----
    # Güvenli bölge = ortadaki %80 çap. Logo kutusunun köşegeni bu dairenin
    # içinde kalmalı; kalmıyorsa küçültülür.
    maskable = Image.new("RGBA", (BOYUT, BOYUT), LACIVERT)
    guvenli_yaricap = BOYUT * 0.8 / 2
    kosegen = ((gw / 2) ** 2 + (gh / 2) ** 2) ** 0.5
    olcek = min(1.0, guvenli_yaricap / kosegen)
    if olcek < 1.0:
        yeni = (max(1, int(kw * olcek)), max(1, int(kh * olcek)))
        kucuk = kesim.resize(yeni, Image.LANCZOS)
    else:
        kucuk = kesim
    print(f"maskable ölçek {olcek:.3f} (köşegen {kosegen:.0f} / "
          f"güvenli yarıçap {guvenli_yaricap:.0f})")
    mw, mh = kucuk.size
    maskable.paste(kucuk, ((BOYUT - mw) // 2, (BOYUT - mh) // 2))
    maskable.save("public/icon-maskable-512.png")
    print("yazıldı: public/icon-maskable-512.png")

    # ---- 3) apple-touch-icon: iOS saydamlığı SİYAHA çevirir → opak ----
    elma = Image.new("RGBA", (BOYUT, BOYUT), LACIVERT)
    elma.paste(kesim, ((BOYUT - kw) // 2, (BOYUT - kh) // 2))
    elma.convert("RGB").resize((180, 180), Image.LANCZOS).save(
        "public/apple-touch-icon.png"
    )
    print("yazıldı: public/apple-touch-icon.png")


if __name__ == "__main__":
    main()
