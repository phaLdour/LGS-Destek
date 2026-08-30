#!/usr/bin/env python3
"""
Rehberim marka işaretini ve tüm uygulama ikonlarını TEK KAYNAKTAN üretir.

    python3 tools/ikon-uret.py

Üretilenler:
    public/favicon.svg            — vektör kaynak (site ikonu)
    public/icon-192.png           — "any" ikon, yuvarlak köşe, köşeler saydam
    public/icon-512.png           — aynısı, büyük
    public/icon-maskable-512.png  — "maskable": kenardan kenara dolu
    public/apple-touch-icon.png   — iOS, opak

NE ZAMAN ÇALIŞTIRILIR: yalnız marka işaretinin geometrisi değişirse.
Çıktılar depoya işlenir; derlemede çalışmaz (Pillow bir bağımlılık değil).

────────────────────────────────────────────────────────────────────────
NEDEN YENİDEN YAZILDI — ölçülen iki hata

1. HEDEF HALKASI ORTADA DEĞİLDİ.
   Eski favicon.svg halkayı cx=106'ya koyuyordu; tuval merkezi 100.
   Yani işaret 6 birim (200'lük tuvalde %3) sağa kaymıştı. Telefonun
   ana ekranında gözle görülüyordu.

2. OK UCU ÇARPIKTI.
   Eski üçgen `M143 42 L164 38 L160 60 Z` idi. Gövde ekseni 45°
   (0.707, -0.707). Bu üçgenin gövde eksenine göre ölçümü:
       tepe (164,38) : eksenden sapma -2.8   (0 olmalı)
       taban köşeleri: -14.8 ve +9.9         (±w, eşit olmalı)
       taban orta noktası: eksenden -2.5     (0 olmalı)
   Yani ok ne simetrikti ne de gövdeyle hizalıydı; üstelik yuvarlak
   uçlu gövde üçgenin altından taşıp ucunda ince bir çıkıntı bırakıyordu.

Artık geometrinin tamamı aşağıdaki sayılardan hesaplanıyor: gövde ve ok
ucu aynı eksende, üçgen o eksene tam simetrik, gövdenin yuvarlak ucu
üçgenin içinde tamamen gizli. İşaret ayrıca optik olarak ortalanıyor
(aşağıdaki ORTALA açıklamasına bakın).
"""

import math
from PIL import Image, ImageDraw

# ── Geometri (200x200 birimlik tasarım tuvali) ────────────────────────
TUVAL = 200.0
KOSE_YARICAP = 44.0          # yuvarlak karenin köşe yarıçapı
MERKEZ = (100.0, 100.0)

# İşaretin tuvaldeki büyüklüğü. 1.12'de mürekkep kutusu tuvalin ~%54'ünü
# kaplar (eski ikonun oranı) ve merkezden en uzak nokta 76.7 olur —
# maskable güvenli bölgesi 80 olduğu için Android kırpmasında da güvende.
ISARET_OLCEK = 1.12

HALKA_YARICAP = 40.0 * ISARET_OLCEK      # hedef halkasının orta çizgisi
HALKA_KALINLIK = 12.0 * ISARET_OLCEK
GOZ_YARICAP = 15.0 * ISARET_OLCEK        # ortadaki amber daire

OK_ACI = -45.0               # sağ-üst yönü
GOVDE_KALINLIK = 12.0 * ISARET_OLCEK
OK_UCU_BOY = 72.0 * ISARET_OLCEK         # merkezden okun ucuna
OK_TABAN_BOY = 46.0 * ISARET_OLCEK       # merkezden üçgenin tabanına
# Ok ucu oranı: uzunluk / taban genişliği ≈ 1.3. Eskiden taban uzunluktan
# genişti, ok küt görünüyordu.
OK_YARI_GENISLIK = 10.0 * ISARET_OLCEK   # üçgen tabanının yarısı
GOVDE_BOY = 46.0 * ISARET_OLCEK          # gövde burada biter; üstünü üçgen örter

LACIVERT = (22, 36, 76)
BEYAZ = (255, 255, 255)
AMBER = (245, 158, 11)

# Süperörnekleme: 4 kat büyük çizip küçültmek kenarları yumuşatır.
KAT = 4


def _yon():
    a = math.radians(OK_ACI)
    d = (math.cos(a), math.sin(a))          # gövde ekseni
    n = (-d[1], d[0])                        # eksene dik
    return d, n


def _nokta(uzunluk, sapma=0.0):
    """Merkezden `uzunluk` kadar eksende, `sapma` kadar dike gitmiş nokta."""
    d, n = _yon()
    return (
        MERKEZ[0] + d[0] * uzunluk + n[0] * sapma,
        MERKEZ[1] + d[1] * uzunluk + n[1] * sapma,
    )


def ok_ucu_ucgeni():
    """Gövde eksenine TAM simetrik ikizkenar üçgen."""
    tepe = _nokta(OK_UCU_BOY, 0.0)
    sol = _nokta(OK_TABAN_BOY, +OK_YARI_GENISLIK)
    sag = _nokta(OK_TABAN_BOY, -OK_YARI_GENISLIK)
    return [tepe, sol, sag]


def govde_ucu():
    return _nokta(GOVDE_BOY, 0.0)


def murekkep_kutusu():
    """İşaretin (halka + göz + ok) kapladığı kutu — zemin hariç."""
    r_dis = HALKA_YARICAP + HALKA_KALINLIK / 2
    xs = [MERKEZ[0] - r_dis, MERKEZ[0] + r_dis]
    ys = [MERKEZ[1] - r_dis, MERKEZ[1] + r_dis]
    for p in ok_ucu_ucgeni():
        xs.append(p[0])
        ys.append(p[1])
    return min(xs), min(ys), max(xs), max(ys)


def ortalama_kaydirmasi():
    """
    ORTALA: işaretin mürekkep kutusunu tuvalin tam ortasına getiren
    kaydırma. Halka tek başına ortalanırsa ok sağ üste taştığı için
    silüet sola-aşağı ağır görünür; kutuyu ortalamak ikisini dengeler.
    Ok kısaltıldığı için kaydırma zaten küçüktür (birkaç birim).
    """
    x0, y0, x1, y1 = murekkep_kutusu()
    return (TUVAL / 2 - (x0 + x1) / 2, TUVAL / 2 - (y0 + y1) / 2)


def _isaret_ciz(d: ImageDraw.ImageDraw, olcek: float, kaydir):
    """İşareti verilen ölçekte çizer. `kaydir` = (dx, dy) tasarım birimi."""

    def P(p):
        return ((p[0] + kaydir[0]) * olcek, (p[1] + kaydir[1]) * olcek)

    m = P(MERKEZ)

    # 1) Ok gövdesi — hedefin merkezinden dışa. Üçgen sonra üstünü örter.
    d.line(
        [m, P(govde_ucu())],
        fill=BEYAZ,
        width=max(1, round(GOVDE_KALINLIK * olcek)),
    )
    # Yuvarlak uç: çizginin ucuna daire koyarak elde edilir.
    for uc in (MERKEZ, govde_ucu()):
        c = P(uc)
        r = GOVDE_KALINLIK * olcek / 2
        d.ellipse([c[0] - r, c[1] - r, c[0] + r, c[1] + r], fill=BEYAZ)

    # 2) Hedef halkası
    r_dis = (HALKA_YARICAP + HALKA_KALINLIK / 2) * olcek
    r_ic = (HALKA_YARICAP - HALKA_KALINLIK / 2) * olcek
    d.ellipse([m[0] - r_dis, m[1] - r_dis, m[0] + r_dis, m[1] + r_dis], fill=BEYAZ)
    # İç boşluk: zemin rengiyle oyulur (halkanın içi zemini göstermeli)
    d.ellipse([m[0] - r_ic, m[1] - r_ic, m[0] + r_ic, m[1] + r_ic], fill=LACIVERT)

    # 3) Gövdenin halka içinde kalan parçasını yeniden çiz (halka üstünü kapattı)
    d.line(
        [m, P(_nokta(HALKA_YARICAP + HALKA_KALINLIK / 2))],
        fill=BEYAZ,
        width=max(1, round(GOVDE_KALINLIK * olcek)),
    )

    # 4) Amber göz
    rg = GOZ_YARICAP * olcek
    d.ellipse([m[0] - rg, m[1] - rg, m[0] + rg, m[1] + rg], fill=AMBER)

    # 5) Gövdenin gözün üstünden geçen parçası
    d.line(
        [m, P(govde_ucu())],
        fill=BEYAZ,
        width=max(1, round(GOVDE_KALINLIK * olcek)),
    )
    c = P(govde_ucu())
    r = GOVDE_KALINLIK * olcek / 2
    d.ellipse([c[0] - r, c[1] - r, c[0] + r, c[1] + r], fill=BEYAZ)

    # 6) Ok ucu — en üstte, gövdenin yuvarlak ucunu tamamen örter
    d.polygon([P(p) for p in ok_ucu_ucgeni()], fill=AMBER)


def ikon_uret(boyut: int, yuvarlak: bool, saydam_koseler: bool) -> Image.Image:
    """Tek bir ikon üretir. Süperörnekleme ile kenarlar yumuşatılır."""
    B = boyut * KAT
    olcek = B / TUVAL
    kaydir = ortalama_kaydirmasi()

    im = Image.new("RGBA", (B, B), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if yuvarlak:
        d.rounded_rectangle(
            [0, 0, B - 1, B - 1],
            radius=KOSE_YARICAP * olcek,
            fill=LACIVERT + (255,),
        )
    else:
        d.rectangle([0, 0, B - 1, B - 1], fill=LACIVERT + (255,))

    _isaret_ciz(d, olcek, kaydir)

    if yuvarlak and saydam_koseler:
        maske = Image.new("L", (B, B), 0)
        ImageDraw.Draw(maske).rounded_rectangle(
            [0, 0, B - 1, B - 1], radius=KOSE_YARICAP * olcek, fill=255
        )
        im.putalpha(maske)

    return im.resize((boyut, boyut), Image.LANCZOS)


def svg_uret() -> str:
    """favicon.svg — PNG'lerle AYNI sayılardan üretilir, ayrışamazlar."""
    dx, dy = ortalama_kaydirmasi()

    def P(p):
        return (round(p[0] + dx, 2), round(p[1] + dy, 2))

    m = P(MERKEZ)
    gu = P(govde_ucu())
    t = [P(p) for p in ok_ucu_ucgeni()]
    return f"""<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- tools/ikon-uret.py tarafından üretildi — ELLE DÜZENLEME.
       Geometri o dosyada tanımlıdır; PNG ikonlar da aynı sayılardan çıkar. -->
  <rect width="200" height="200" rx="{KOSE_YARICAP:.0f}" fill="#16244C" />
  <path d="M{m[0]} {m[1]} L{gu[0]} {gu[1]}" stroke="#FFFFFF"
        stroke-width="{GOVDE_KALINLIK:.1f}" stroke-linecap="round" />
  <circle cx="{m[0]}" cy="{m[1]}" r="{HALKA_YARICAP:.1f}" fill="none"
          stroke="#FFFFFF" stroke-width="{HALKA_KALINLIK:.1f}" />
  <circle cx="{m[0]}" cy="{m[1]}" r="{GOZ_YARICAP:.1f}" fill="#F59E0B" />
  <path d="M{m[0]} {m[1]} L{gu[0]} {gu[1]}" stroke="#FFFFFF"
        stroke-width="{GOVDE_KALINLIK:.1f}" stroke-linecap="round" />
  <path d="M{t[0][0]} {t[0][1]} L{t[1][0]} {t[1][1]} L{t[2][0]} {t[2][1]} Z"
        fill="#F59E0B" />
</svg>
"""


def main():
    d, n = _yon()
    ucgen = ok_ucu_ucgeni()

    def eksen(p):
        v = (p[0] - MERKEZ[0], p[1] - MERKEZ[1])
        return v[0] * d[0] + v[1] * d[1]

    def sapma(p):
        v = (p[0] - MERKEZ[0], p[1] - MERKEZ[1])
        return v[0] * n[0] + v[1] * n[1]

    print("ok ucu üçgeni — gövde eksenine göre:")
    for ad, p in zip(("tepe", "taban sol", "taban sağ"), ucgen):
        print(f"  {ad:10s} eksende {eksen(p):6.1f}  sapma {sapma(p):+6.2f}")
    tm = ((ucgen[1][0] + ucgen[2][0]) / 2, (ucgen[1][1] + ucgen[2][1]) / 2)
    print(f"  taban orta noktası sapması: {sapma(tm):+.2f} (0 olmalı)")

    dx, dy = ortalama_kaydirmasi()
    print(f"ortalama kaydırması: ({dx:+.2f}, {dy:+.2f}) tasarım birimi")
    x0, y0, x1, y1 = murekkep_kutusu()
    print(f"mürekkep kutusu: {x1-x0:.1f} x {y1-y0:.1f}")
    en_uzak = max(math.hypot(p[0] + dx - 100, p[1] + dy - 100) for p in ucgen)
    print(f"merkezden en uzak nokta: {en_uzak:.1f} / güvenli bölge 80.0")

    ikon_uret(512, yuvarlak=True, saydam_koseler=True).save("public/icon-512.png")
    ikon_uret(192, yuvarlak=True, saydam_koseler=True).save("public/icon-192.png")
    ikon_uret(512, yuvarlak=False, saydam_koseler=False).save(
        "public/icon-maskable-512.png"
    )
    ikon_uret(180, yuvarlak=True, saydam_koseler=False).convert("RGB").save(
        "public/apple-touch-icon.png"
    )
    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(svg_uret())
    print("yazıldı: icon-512, icon-192, icon-maskable-512, apple-touch-icon, favicon.svg")


if __name__ == "__main__":
    main()
