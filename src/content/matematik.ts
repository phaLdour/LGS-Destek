import type { SubjectContent } from "./types";

/**
 * Matematik (LGS 8. sınıf) üniteleri.
 * Videolar sonradan eklenecek; boş olanlar "yakında" görünür.
 * Tüm quiz cevapları tek tek hesaplanıp doğrulanmıştır.
 */
export const MATEMATIK: SubjectContent = {
  slug: "matematik",
  name: "Matematik",
  topics: [
    {
      id: "carpanlar-ve-katlar",
      name: `Çarpanlar ve Katlar`,
      summary: `Asal çarpanlar, bölünebilme, EBOB ve EKOK.`,
      youtubeId: "",
      mindMap: {
        center: `Çarpanlar ve Katlar`,
        branches: [
          {
            label: `Asal Sayılar ve Çarpanlara Ayırma`,
            sections: [
              { kind: "tanim", content: `Asal sayı yalnız 1'e ve kendisine bölünür (2, 3, 5, 7, 11...). En küçük asal 2'dir.` },
              { kind: "formul", content: `Asal çarpanlara ayırma: 60 = 2² · 3 · 5.` },
              { kind: "tuzak", content: `1 asal DEĞİLDİR; en küçük asal sayı 2'dir.` },
            ],
          },
          {
            label: `Bölünebilme Kuralları`,
            sections: [
              { kind: "kural", content: `2: son rakam çift • 3: rakam toplamı 3'ün katı • 5: son rakam 0/5 • 9: rakam toplamı 9'un katı • 10: son rakam 0.` },
              { kind: "ornek", content: `2 ile: 248 (son rakam 8, çift). 3 ile: 432 (4+3+2=9). 5 ile: 1235 (5 ile biter). 9 ile: 207 (2+0+7=9). 10 ile: 540 (0 ile biter).` },
              { kind: "tuzak", content: `9'a bölünen sayı her zaman 3'e bölünür; ama 3'e bölünen sayı her zaman 9'a bölünmez (ör. 12).` },
            ],
          },
          {
            label: `EBOB (En Büyük Ortak Bölen)`,
            sections: [
              { kind: "formul", content: `Ortak asal çarpanların EN KÜÇÜK üslüleri çarpılır.` },
              { kind: "ornek", content: `12 = 2²·3, 18 = 2·3² → EBOB = 2·3 = 6.` },
              { kind: "soru", content: `'En uzun eşit parçalara bölme' tarzı sorular EBOB'tur.` },
            ],
          },
          {
            label: `EKOK (En Küçük Ortak Kat)`,
            sections: [
              { kind: "formul", content: `Tüm asal çarpanların EN BÜYÜK üslüleri çarpılır.` },
              { kind: "ornek", content: `4 = 2², 6 = 2·3 → EKOK = 2²·3 = 12.` },
              { kind: "tuzak", content: `Her zaman EBOB ≤ sayılar ≤ EKOK; EBOB, EKOK'tan büyük olamaz.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Asal sayı nedir?`, back: `Yalnız 1'e ve kendisine bölünebilen 1'den büyük sayıdır. En küçüğü 2'dir.` },
        { front: `2 ile bölünebilme kuralı?`, back: `Sayının son rakamı çift (0,2,4,6,8) olmalıdır.` },
        { front: `3 ile bölünebilme kuralı?`, back: `Rakamları toplamı 3'ün katı olmalıdır.` },
        { front: `EBOB nasıl bulunur?`, back: `Ortak asal çarpanların en küçük üslüleri çarpılır.` },
        { front: `EKOK nasıl bulunur?`, back: `Tüm asal çarpanların en büyük üslüleri çarpılır.` },
      ],
      article: `# Asal Sayılar ve Çarpanlara Ayırma
Asal sayı, yalnızca **1'e ve kendisine** bölünebilen 1'den büyük doğal sayıdır (2, 3, 5, 7, 11, 13...).
[kural] En küçük asal sayı **2**'dir ve 2, tek **çift** asal sayıdır.
[formül] Asal çarpanlara ayırma: **60 = 2² · 3 · 5**.
[tuzak] **1 asal değildir.** En küçük asal sayı 2'dir.

# Bölünebilme Kuralları
[kural] **2:** son rakam çift • **3:** rakam toplamı 3'ün katı • **5:** son rakam 0/5 • **9:** rakam toplamı 9'un katı • **10:** son rakam 0.
[örnek] 432 sayısı: 4+3+2 = 9 olduğundan hem 3'e hem 9'a bölünür.

# EBOB (En Büyük Ortak Bölen)
[formül] Ortak asal çarpanların **en küçük** üslüleri çarpılır.
[örnek] 12 = 2²·3 ve 18 = 2·3² → EBOB = 2·3 = **6**.
[soru] "İki ipi eşit ve en uzun parçalara bölme" tarzı sorular EBOB ile çözülür.

# EKOK (En Küçük Ortak Kat)
[formül] Tüm asal çarpanların **en büyük** üslüleri çarpılır.
[örnek] 4 = 2² ve 6 = 2·3 → EKOK = 2²·3 = **12**.
[tuzak] Her zaman **EBOB ≤ sayılar ≤ EKOK**; EBOB, EKOK'tan büyük olamaz.
[soru] "Kaç dakikada bir aynı anda çalarlar / tekrar buluşurlar" tarzı sorular EKOK'tur.`,
      tips: [
        { trap: `1'in asal sayı olduğu sanılır.`, wrong: `1 asal sayıdır.`, correct: `1 asal değildir; en küçük asal sayı 2'dir.` },
        { trap: `EBOB ve EKOK karıştırılır.`, wrong: `İki sayının EBOB'u, EKOK'undan büyüktür.`, correct: `EBOB ortak bölenlerin en büyüğü (küçük), EKOK ortak katların en küçüğüdür (büyük). EBOB ≤ EKOK.` },
      ],
      quiz: [
        { question: `Aşağıdakilerden hangisi asal sayıdır?`, options: [`1`, `9`, `17`, `21`], correctIndex: 2 },
        { question: `12 ile 18 sayılarının EBOB'u kaçtır?`, options: [`3`, `6`, `36`, `2`], correctIndex: 1, explanation: `12=2²·3, 18=2·3². Ortak çarpanların en küçük üsleri: 2·3=6.` },
        { question: `4 ile 6 sayılarının EKOK'u kaçtır?`, options: [`2`, `12`, `24`, `10`], correctIndex: 1, explanation: `4=2², 6=2·3. EKOK=2²·3=12.` },
        { question: `360 sayısının asal çarpanlarına ayrılmış hâli hangisidir?`, options: [`2³·3²·5`, `2²·3·5`, `2³·3·5²`, `2·3²·5`], correctIndex: 0, explanation: `8·9·5=360.` },
        { question: `Aşağıdaki sayılardan hangisi 3 ile tam bölünür?`, options: [`124`, `251`, `432`, `170`], correctIndex: 2, explanation: `4+3+2=9, 9 üçün katıdır.` },
        { question: `En küçük asal sayı kaçtır?`, options: [`0`, `1`, `2`, `3`], correctIndex: 2 },
        { question: `24 sayısının kaç tane pozitif tam böleni vardır?`, options: [`6`, `8`, `4`, `12`], correctIndex: 1, explanation: `Bölenleri: 1,2,3,4,6,8,12,24 → 8 tane.` },
        { question: `EBOB'u 1 olan iki sayıya ne denir?`, options: [`Aralarında asal`, `Asal`, `Tam kare`, `Çift sayı`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Aşağıdakilerden hangisi asal sayıdır?`, options: [`17`, `9`, `15`, `21`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi asal sayıdır?`, options: [`19`, `21`, `25`, `27`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi asal sayı DEĞİLDİR?`, options: [`1`, `2`, `3`, `5`], correctIndex: 0 },
        { question: `En küçük asal sayı kaçtır?`, options: [`2`, `1`, `3`, `0`], correctIndex: 0 },
        { question: `En küçük çift asal sayı kaçtır?`, options: [`2`, `4`, `6`, `0`], correctIndex: 0 },
        { question: `12'nin asal çarpanları hangileridir?`, options: [`2 ve 3`, `2, 3, 4`, `2 ve 6`, `3 ve 4`], correctIndex: 0 },
        { question: `30'un asal çarpanları hangileridir?`, options: [`2, 3, 5`, `2, 6, 5`, `3, 10`, `5, 6`], correctIndex: 0 },
        { question: `36'nın asal çarpanlarına ayrılışı nedir?`, options: [`2²·3²`, `2·3³`, `2³·3`, `6²`], correctIndex: 0 },
        { question: `60'ın asal çarpanlarına ayrılışı nedir?`, options: [`2²·3·5`, `2·3·5`, `2²·3²·5`, `2³·3·5`], correctIndex: 0 },
        { question: `8 ile 12 sayılarının EBOB'u kaçtır?`, options: [`4`, `2`, `8`, `24`], correctIndex: 0 },
        { question: `6 ile 9 sayılarının EKOK'u kaçtır?`, options: [`18`, `36`, `54`, `9`], correctIndex: 0 },
        { question: `12 ile 18'in EBOB'u kaçtır?`, options: [`6`, `2`, `12`, `36`], correctIndex: 0 },
        { question: `12 ile 18'in EKOK'u kaçtır?`, options: [`36`, `6`, `12`, `216`], correctIndex: 0 },
        { question: `15 ile 25'in EBOB'u kaçtır?`, options: [`5`, `15`, `25`, `75`], correctIndex: 0 },
        { question: `15 ile 25'in EKOK'u kaçtır?`, options: [`75`, `5`, `15`, `375`], correctIndex: 0 },
        { question: `24 ile 36'nın EBOB'u kaçtır?`, options: [`12`, `4`, `6`, `72`], correctIndex: 0 },
        { question: `24 ile 36'nın EKOK'u kaçtır?`, options: [`72`, `12`, `24`, `144`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 2 ile tam bölünür?`, options: [`148`, `137`, `255`, `391`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 3 ile tam bölünür?`, options: [`126 (1+2+6=9)`, `134`, `217`, `301`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 4 ile tam bölünür?`, options: [`312 (son iki basamak 12)`, `321`, `425`, `538`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 5 ile bölünebilir?`, options: [`345`, `124`, `233`, `412`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 9 ile tam bölünür?`, options: [`243 (2+4+3=9)`, `234`, `345`, `412`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 10 ile tam bölünür?`, options: [`240`, `245`, `253`, `267`], correctIndex: 0 },
        { question: `Aşağıdaki sayılardan hangisi 6 ile tam bölünür?`, options: [`132 (hem 2 hem 3 ile)`, `123`, `145`, `217`], correctIndex: 0 },
        { question: `120'nin asal çarpanlarına ayrılışında 2 kaç defa çarpan olarak yer alır?`, options: [`3 (2³)`, `2`, `4`, `1`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 12'nin pozitif tam bölenidir?`, options: [`4`, `5`, `7`, `9`], correctIndex: 0 },
        { question: `18 sayısının pozitif tam bölenlerinin sayısı kaçtır?`, options: [`6 (1,2,3,6,9,18)`, `4`, `5`, `8`], correctIndex: 0 },
        { question: `Bir sayının asal çarpan sayısı 2³·3² ise pozitif bölen sayısı kaçtır?`, options: [`12 (4·3)`, `9`, `6`, `8`], correctIndex: 0 },
        { question: `EBOB(a,b) × EKOK(a,b) = ne demektir?`, options: [`a · b`, `a + b`, `a - b`, `a ÷ b`], correctIndex: 0 },
        { question: `Aralarında asal sayıların EBOB'u kaçtır?`, options: [`1`, `0`, `Sayıların büyüğü`, `Sayıların küçüğü`], correctIndex: 0 },
        { question: `7 ve 13 aralarında asal mıdır?`, options: [`Evet (her ikisi de asal)`, `Hayır`, `Bilinmez`, `Sadece 7 asal`], correctIndex: 0 },
        { question: `8 ile 15 aralarında asal mıdır?`, options: [`Evet (EBOB=1)`, `Hayır (EBOB=2)`, `Bilinmez`, `Sadece 8 asal`], correctIndex: 0 },
        { question: `Bir sayı hem 2 hem de 3 ile bölünüyorsa kaça da bölünür?`, options: [`6`, `5`, `12`, `8`], correctIndex: 0 },
        { question: `2'nin katları nelerdir?`, options: [`2, 4, 6, 8, 10, ...`, `1, 2, 3, 4, ...`, `0, 1, 2, 3, ...`, `2, 3, 4, 5, ...`], correctIndex: 0 },
        { question: `12, 18 ve 24'ün EBOB'u kaçtır?`, options: [`6`, `12`, `2`, `3`], correctIndex: 0 },
        { question: `12, 18 ve 24'ün EKOK'u kaçtır?`, options: [`72`, `36`, `144`, `24`], correctIndex: 0 },
        { question: `30 ile 45'in EBOB'u kaçtır?`, options: [`15`, `5`, `3`, `30`], correctIndex: 0 },
        { question: `30 ile 45'in EKOK'u kaçtır?`, options: [`90`, `15`, `135`, `45`], correctIndex: 0 },
        { question: `İki sayının çarpımı 240, EBOB'u 4 ise EKOK'u kaçtır?`, options: [`60 (240÷4)`, `30`, `120`, `48`], correctIndex: 0 },
        { question: `EBOB hangi pratik problemde kullanılır?`, options: [`Kalıntı bırakmadan parçalama (örnek: 12 ve 18 cm² kâğıdı eşit karelere bölme)`, `Toplam zaman bulma`, `Hız bulma`, `Yüzde alma`], correctIndex: 0 },
        { question: `EKOK hangi pratik problemde kullanılır?`, options: [`Periyodik olayların aynı anda olacağı en yakın zamanı bulma`, `Para yetersiz olunca`, `Bölme yapma`, `Negatif sayı`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 11'in çarpanıdır?`, options: [`1 ve 11 (asaldır)`, `2`, `5`, `7`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 100'ün böleni DEĞİLDİR?`, options: [`30`, `25`, `50`, `100`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 24'ün çarpanıdır?`, options: [`8`, `5`, `9`, `7`], correctIndex: 0 },
        { question: `0 sayısı asal mıdır?`, options: [`Hayır (asal değildir)`, `Evet`, `Hem evet hem hayır`, `Bilinmez`], correctIndex: 0 },
        { question: `1 sayısı asal mıdır?`, options: [`Hayır`, `Evet`, `Hem evet hem hayır`, `Bilinmez`], correctIndex: 0 },
        { question: `Bir sayının kendisi ve 1'den başka pozitif böleni yoksa o sayıya ne denir?`, options: [`Asal sayı`, `Tam sayı`, `Doğal sayı`, `Rasyonel sayı`], correctIndex: 0 },
        { question: `1, 2, 4, 5, 10, 20 hangi sayının bölenleridir?`, options: [`20`, `10`, `5`, `40`], correctIndex: 0 },
        { question: `İki çift sayının EBOB'u en az kaçtır?`, options: [`2`, `1`, `4`, `0`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 100'den küçük en büyük asal sayıdır?`, options: [`97`, `99`, `91`, `93`], correctIndex: 0 },
      ],
    },
    {
      id: "uslu-ifadeler",
      name: `Üslü İfadeler`,
      summary: `Üs kuralları, sıfır ve negatif üsler.`,
      youtubeId: "",
      mindMap: {
        center: `Üslü İfadeler`,
        branches: [
          {
            label: `Taban ve Üs`,
            sections: [
              { kind: "tanim", content: "aⁿ ifadesinde a taban, n üstür; a'nın n kez çarpımıdır." },
              { kind: "ornek", content: "2³ = 2 × 2 × 2 = 8." },
            ],
          },
          {
            label: `Çarpma ve Bölme`,
            sections: [
              { kind: "formul", content: "aᵐ · aⁿ = aᵐ⁺ⁿ   ve   aᵐ ÷ aⁿ = aᵐ⁻ⁿ" },
              { kind: "ornek", content: "2³ · 2² = 2⁵ = 32   •   2⁶ ÷ 2² = 2⁴ = 16" },
              { kind: "tuzak", content: "Çarpmada üsler çarpılmaz, TOPLANIR: 2³·2² = 2⁵ (2⁶ değil)." },
            ],
          },
          {
            label: `Sıfır ve Negatif Üs`,
            sections: [
              { kind: "formul", content: "a⁰ = 1 (a ≠ 0)   ve   a⁻ⁿ = 1 ÷ aⁿ" },
              { kind: "ornek", content: "5⁰ = 1   •   3⁻² = 1/9" },
              { kind: "tuzak", content: "a⁰ ifadesi 0 değil, 1'dir." },
            ],
          },
          {
            label: `Üssün Üssü ve Negatif Taban`,
            sections: [
              { kind: "formul", content: "(aᵐ)ⁿ = aᵐ·ⁿ" },
              { kind: "ornek", content: "(2³)² = 2⁶ = 64" },
              { kind: "istisna", content: "Negatif tabanın çift kuvveti pozitif, tek kuvveti negatiftir: (−2)⁴ = 16, (−2)³ = −8." },
            ],
          },
        ],
      },
      cards: [
        { front: `aᵐ · aⁿ kaçtır?`, back: `aᵐ⁺ⁿ (aynı tabanda çarpmada üsler toplanır).` },
        { front: `a⁰ kaçtır?`, back: `1 (a sıfırdan farklıysa).` },
        { front: `a⁻ⁿ neye eşittir?`, back: `1/aⁿ.` },
        { front: `(aᵐ)ⁿ kaçtır?`, back: `aᵐ·ⁿ (üsler çarpılır).` },
        { front: `Negatif tabanın çift kuvveti?`, back: `Pozitiftir: (-2)⁴ = 16.` },
      ],
      article: `# Üslü İfade Nedir?
**aⁿ** ifadesinde **a taban**, **n üs**tür ve a'nın kendisiyle n kez çarpıldığını gösterir.
[örnek] 2³ = 2 × 2 × 2 = 8.

# Üs Kuralları (Çarpma ve Bölme)
[formül] Aynı tabanda çarpma: **aᵐ · aⁿ = aᵐ⁺ⁿ**  •  Bölme: **aᵐ ÷ aⁿ = aᵐ⁻ⁿ**
[örnek] 2³ · 2² = 2⁵ = 32  •  2⁶ ÷ 2² = 2⁴ = 16
[tuzak] Çarpmada üsler çarpılmaz, **toplanır**: 2³·2² = 2⁵ (2⁶ değil!).

# Sıfır ve Negatif Üs
[formül] **a⁰ = 1** (a ≠ 0)  •  **a⁻ⁿ = 1 ÷ aⁿ**
[örnek] 5⁰ = 1  •  3⁻² = 1/3² = 1/9
[tuzak] a⁰ ifadesi 0 değil, **1**'dir.

# Üssün Üssü ve Negatif Taban
[formül] **(aᵐ)ⁿ = aᵐ·ⁿ**
[örnek] (2³)² = 2⁶ = 64
[istisna] Negatif tabanın **çift** kuvveti pozitif, **tek** kuvveti negatiftir: (−2)⁴ = 16 ama (−2)³ = −8.
[soru] LGS'de "2³·2² kaça eşittir?" gibi sorularda kuralı (üsleri topla) doğru uygulaman yeterli.`,
      tips: [
        { trap: `a⁰ ifadesinin 0 olduğu sanılır.`, wrong: `5⁰ = 0.`, correct: `Sıfırdan farklı her sayının sıfırıncı kuvveti 1'dir: 5⁰ = 1.` },
        { trap: `Çarpmada üsler çarpılır sanılır.`, wrong: `2³ · 2² = 2⁶.`, correct: `Aynı tabanda çarpmada üsler TOPLANIR: 2³·2² = 2⁵ = 32.` },
        { trap: `Negatif tabanın çift kuvveti negatif sanılır.`, wrong: `(-2)⁴ = -16.`, correct: `Çift kuvvet sonucu pozitiftir: (-2)⁴ = 16.` },
      ],
      quiz: [
        { question: `2³ kaçtır?`, options: [`6`, `8`, `9`, `5`], correctIndex: 1 },
        { question: `2³ · 2² ifadesi aşağıdakilerden hangisine eşittir?`, options: [`2⁵`, `2⁶`, `4⁵`, `2¹`], correctIndex: 0, explanation: `Üsler toplanır: 3+2=5.` },
        { question: `5⁰ kaçtır?`, options: [`0`, `1`, `5`, `Tanımsız`], correctIndex: 1 },
        { question: `3⁻² ifadesinin değeri kaçtır?`, options: [`9`, `-9`, `1/9`, `-1/9`], correctIndex: 2, explanation: `3⁻²=1/3²=1/9.` },
        { question: `(2³)² kaçtır?`, options: [`32`, `64`, `16`, `512`], correctIndex: 1, explanation: `(2³)²=2⁶=64.` },
        { question: `10⁴ kaçtır?`, options: [`1000`, `10000`, `100000`, `400`], correctIndex: 1 },
        { question: `2⁶ / 2² kaçtır?`, options: [`8`, `16`, `4`, `64`], correctIndex: 1, explanation: `Üsler çıkarılır: 2⁴=16.` },
        { question: `(-2)⁴ kaçtır?`, options: [`-16`, `16`, `-8`, `8`], correctIndex: 1 },
      ],
      quickQuestions: [
        { question: `2² kaçtır?`, options: [`4`, `2`, `8`, `6`], correctIndex: 0 },
        { question: `2³ kaçtır?`, options: [`8`, `6`, `9`, `16`], correctIndex: 0 },
        { question: `2⁴ kaçtır?`, options: [`16`, `8`, `12`, `32`], correctIndex: 0 },
        { question: `2⁵ kaçtır?`, options: [`32`, `16`, `25`, `64`], correctIndex: 0 },
        { question: `2⁶ kaçtır?`, options: [`64`, `32`, `36`, `128`], correctIndex: 0 },
        { question: `2⁷ kaçtır?`, options: [`128`, `64`, `256`, `14`], correctIndex: 0 },
        { question: `2⁸ kaçtır?`, options: [`256`, `128`, `512`, `64`], correctIndex: 0 },
        { question: `2¹⁰ kaçtır?`, options: [`1024`, `100`, `512`, `2048`], correctIndex: 0 },
        { question: `3² kaçtır?`, options: [`9`, `6`, `8`, `27`], correctIndex: 0 },
        { question: `3³ kaçtır?`, options: [`27`, `9`, `18`, `81`], correctIndex: 0 },
        { question: `3⁴ kaçtır?`, options: [`81`, `27`, `12`, `64`], correctIndex: 0 },
        { question: `5² kaçtır?`, options: [`25`, `10`, `15`, `125`], correctIndex: 0 },
        { question: `5³ kaçtır?`, options: [`125`, `25`, `15`, `15`], correctIndex: 0 },
        { question: `7² kaçtır?`, options: [`49`, `14`, `7`, `21`], correctIndex: 0 },
        { question: `10⁴ kaçtır?`, options: [`10.000`, `1000`, `100.000`, `40`], correctIndex: 0 },
        { question: `Herhangi bir sayının 0. üssü kaçtır?`, options: [`1 (sıfır hariç)`, `0`, `Sayının kendisi`, `Tanımsız`], correctIndex: 0 },
        { question: `Herhangi bir sayının 1. üssü nedir?`, options: [`Sayının kendisi`, `1`, `0`, `Sayının karesi`], correctIndex: 0 },
        { question: `(-2)² kaçtır?`, options: [`4`, `-4`, `2`, `-2`], correctIndex: 0 },
        { question: `(-2)³ kaçtır?`, options: [`-8`, `8`, `6`, `-6`], correctIndex: 0 },
        { question: `(-3)² kaçtır?`, options: [`9`, `-9`, `6`, `-6`], correctIndex: 0 },
        { question: `(-3)³ kaçtır?`, options: [`-27`, `27`, `9`, `-9`], correctIndex: 0 },
        { question: `(-1)¹⁰⁰ kaçtır?`, options: [`1 (çift kuvvet)`, `-1`, `100`, `-100`], correctIndex: 0 },
        { question: `(-1)⁹⁹ kaçtır?`, options: [`-1 (tek kuvvet)`, `1`, `99`, `-99`], correctIndex: 0 },
        { question: `Negatif sayının çift kuvveti hangi işaretlidir?`, options: [`Pozitif`, `Negatif`, `Sıfır`, `Tanımsız`], correctIndex: 0 },
        { question: `Negatif sayının tek kuvveti hangi işaretlidir?`, options: [`Negatif`, `Pozitif`, `Sıfır`, `Tanımsız`], correctIndex: 0 },
        { question: `2² · 2³ kaça eşittir?`, options: [`2⁵ = 32`, `2⁶`, `4⁵`, `4⁶`], correctIndex: 0 },
        { question: `3² · 3⁴ kaça eşittir?`, options: [`3⁶ = 729`, `3⁸`, `9⁶`, `6⁶`], correctIndex: 0 },
        { question: `2⁵ ÷ 2² kaça eşittir?`, options: [`2³ = 8`, `2⁷`, `4³`, `2¹⁰`], correctIndex: 0 },
        { question: `5⁷ ÷ 5⁴ kaça eşittir?`, options: [`5³ = 125`, `5¹¹`, `25³`, `5²⁸`], correctIndex: 0 },
        { question: `(2³)² kaça eşittir?`, options: [`2⁶ = 64`, `2⁵`, `2⁹`, `2³²`], correctIndex: 0 },
        { question: `(3²)³ kaça eşittir?`, options: [`3⁶ = 729`, `3⁵`, `3⁸`, `27³`], correctIndex: 0 },
        { question: `(2·3)² kaça eşittir?`, options: [`6² = 36`, `2² + 3²`, `2³·3²`, `12`], correctIndex: 0 },
        { question: `(2/3)² kaça eşittir?`, options: [`4/9`, `2/9`, `4/3`, `4/6`], correctIndex: 0 },
        { question: `2⁻¹ kaça eşittir?`, options: [`1/2`, `-2`, `2`, `-1/2`], correctIndex: 0 },
        { question: `2⁻³ ifadesinin değeri?`, options: [`1/8`, `8`, `-8`, `-1/8`], correctIndex: 0 },
        { question: `3⁻² kaçtır?`, options: [`1/9`, `9`, `-9`, `-1/9`], correctIndex: 0 },
        { question: `(1/2)⁻¹ kaçtır?`, options: [`2`, `1/2`, `-2`, `-1/2`], correctIndex: 0 },
        { question: `(2/3)⁻¹ kaçtır?`, options: [`3/2`, `2/3`, `-3/2`, `1`], correctIndex: 0 },
        { question: `10² kaçtır?`, options: [`100`, `20`, `10`, `1000`], correctIndex: 0 },
        { question: `10³ kaçtır?`, options: [`1000`, `100`, `30`, `10.000`], correctIndex: 0 },
        { question: `10⁶ kaçtır?`, options: [`1.000.000`, `100.000`, `10⁵`, `60`], correctIndex: 0 },
        { question: `3 milyon sayısı 10'un kuvveti olarak nasıl yazılır?`, options: [`3 · 10⁶`, `3 · 10⁵`, `3 · 10⁷`, `3 · 10³`], correctIndex: 0 },
        { question: `Bilimsel gösterimde 4500 sayısı nasıl yazılır?`, options: [`4,5 · 10³`, `45 · 10²`, `0,45 · 10⁴`, `4500 · 10⁰`], correctIndex: 0 },
        { question: `Bilimsel gösterimde 0,0023 sayısı nasıl yazılır?`, options: [`2,3 · 10⁻³`, `23 · 10⁻⁴`, `0,23 · 10⁻²`, `2,3 · 10³`], correctIndex: 0 },
        { question: `2 · 10³ + 3 · 10² kaça eşittir?`, options: [`2300`, `230`, `5000`, `5 · 10⁵`], correctIndex: 0 },
        { question: `(4 · 10²) · (2 · 10³) kaça eşittir?`, options: [`8 · 10⁵`, `8 · 10⁶`, `6 · 10⁵`, `4 · 10⁶`], correctIndex: 0 },
        { question: `8 · 10⁶ ÷ (2 · 10²) kaça eşittir?`, options: [`4 · 10⁴`, `4 · 10⁸`, `6 · 10⁴`, `4 · 10³`], correctIndex: 0 },
        { question: `(-2)⁰ kaçtır?`, options: [`1`, `0`, `-1`, `Tanımsız`], correctIndex: 0 },
        { question: `Herhangi bir sayı 10 ile çarpıldığında üssü nasıl değişir?`, options: [`Üs 1 artar`, `Üs 1 azalır`, `Üs aynı kalır`, `Üs 2 artar`], correctIndex: 0 },
        { question: `2³ + 2² kaç eder?`, options: [`12 (8+4)`, `2⁵`, `2⁶`, `16`], correctIndex: 0 },
      ],
    },
    {
      id: "karekoklu-ifadeler",
      name: `Kareköklü İfadeler`,
      summary: `Karekök, tam kareler ve işlemler.`,
      youtubeId: "",
      mindMap: {
        center: `Kareköklü İfadeler`,
        branches: [
          {
            label: `Karekök ve Tam Kareler`,
            sections: [
              { kind: "tanim", content: `√a (a ≥ 0): karesi a olan pozitif sayı. Kök içi negatif olamaz.` },
              { kind: "ornek", content: `Tam kareler tablosu: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49, 8²=64, 9²=81, 10²=100, 11²=121, 12²=144, 13²=169, 14²=196, 15²=225.` },
              { kind: "ipucu", content: `Bir sayının tam kare olup olmadığını anlamak için: 50, 64, 80 arasından 64=8² tam karedir.` },
            ],
          },
          {
            label: `Çarpma ve Bölme`,
            sections: [
              { kind: "formul", content: `√a · √b = √(a·b)   ve   √a ÷ √b = √(a÷b)` },
              { kind: "ornek", content: `√2 · √8 = √16 = 4 • √3 · √12 = √36 = 6 • √18 ÷ √2 = √9 = 3 • √50 ÷ √2 = √25 = 5.` },
            ],
          },
          {
            label: `Kök Dışına / İçine Alma`,
            sections: [
              { kind: "formul", content: `Kök içindeki tam kare çarpan dışarı çıkar (kökü alınıp katsayı olur).` },
              { kind: "ornek", content: `Dışarı: √12 = √(4·3) = 2√3 • √18 = √(9·2) = 3√2 • √50 = √(25·2) = 5√2 • √72 = √(36·2) = 6√2. İçeri: 3√5 = √(9·5) = √45.` },
            ],
          },
          {
            label: `Toplama ve Çıkarma`,
            sections: [
              { kind: "kural", content: `Yalnız KÖK İÇLERİ AYNI olanlar toplanıp çıkarılır; katsayılar toplanır, kök içi değişmez.` },
              { kind: "ornek", content: `2√3 + 5√3 = 7√3 • 8√5 − 3√5 = 5√5 • √2 + 3√2 = 4√2.` },
              { kind: "ornek", content: `Önce sadeleştir: √8 + √18 = 2√2 + 3√2 = 5√2 (kök içleri farklı görünüyordu, sadeleştince aynı oldu).` },
              { kind: "tuzak", content: `√(9+16) ≠ √9 + √16 (7 değil!). Doğrusu √(9+16) = √25 = 5. Karekök toplamaya dağılmaz.` },
              { kind: "tuzak", content: `2√2 + 3√3 toplanamaz; kök içleri farklı, olduğu gibi kalır.` },
            ],
          },
        ],
      },
      cards: [
        { front: `√16 kaçtır?`, back: `4 (çünkü 4²=16).` },
        { front: `√a · √b kaçtır?`, back: `√(a·b).` },
        { front: `√12'nin en sade hâli?`, back: `2√3 (12=4·3).` },
        { front: `2√3 + 5√3 kaçtır?`, back: `7√3 (kök içleri aynıysa katsayılar toplanır).` },
        { front: `√(a+b) = √a + √b doğru mu?`, back: `Hayır! Karekök toplama üzerine dağılmaz.` },
      ],
      article: `# Karekök ve Tam Kareler
Bir sayının karekökü, karesi o sayıya eşit olan **pozitif** sayıdır: √16 = 4. Kök içi negatif olamaz (a ≥ 0).
[örnek] Tam kareler: 1, 4, 9, 16, 25, 36, 49, 64...

# Çarpma, Bölme ve Sadeleştirme
[formül] **√a · √b = √(a·b)**  •  **√a ÷ √b = √(a÷b)**
[örnek] √2 · √8 = √16 = **4**. Sadeleştirme: √12 = √(4·3) = **2√3**.

# Toplama ve Çıkarma
[kural] Yalnızca **kök içleri aynı** olan terimler toplanıp çıkarılır: 2√3 + 5√3 = **7√3**.
[tuzak] √(9+16) = √9 + √16 = 7 **YANLIŞTIR**. Doğrusu √(9+16) = √25 = **5**; karekök toplama üzerine dağılmaz.
[soru] "2√2 + 3√3 = ?" → kök içleri farklı olduğu için toplanamaz, olduğu gibi kalır.`,
      tips: [
        { trap: `Karekök toplamaya dağıtılır sanılır.`, wrong: `√(9+16) = √9 + √16 = 3+4 = 7.`, correct: `√(9+16) = √25 = 5. Karekök toplama üzerine dağılmaz.` },
        { trap: `Farklı kökler toplanır sanılır.`, wrong: `2√2 + 3√3 = 5√5.`, correct: `Kök içleri farklı olduğundan toplanamaz; 2√2 + 3√3 olduğu gibi kalır.` },
      ],
      quiz: [
        { question: `√81 kaçtır?`, options: [`8`, `9`, `9,5`, `18`], correctIndex: 1 },
        { question: `√144 kaçtır?`, options: [`12`, `14`, `72`, `24`], correctIndex: 0 },
        { question: `√2 · √8 kaçtır?`, options: [`√10`, `4`, `16`, `2√2`], correctIndex: 1, explanation: `√2·√8=√16=4.` },
        { question: `√12 ifadesinin en sade hâli hangisidir?`, options: [`2√3`, `3√2`, `4√3`, `2√6`], correctIndex: 0, explanation: `12=4·3, √4=2.` },
        { question: `3√5 + 2√5 kaçtır?`, options: [`5√10`, `5√5`, `6√5`, `5√25`], correctIndex: 1 },
        { question: `√(9+16) kaçtır?`, options: [`7`, `5`, `25`, `√7`], correctIndex: 1, explanation: `Önce içerisi: 9+16=25, √25=5.` },
        { question: `√0,25 kaçtır?`, options: [`0,5`, `0,05`, `5`, `0,025`], correctIndex: 0, explanation: `0,25=1/4, karekökü 1/2=0,5.` },
        { question: `Aşağıdakilerden hangisi tam kare sayıdır?`, options: [`50`, `64`, `20`, `18`], correctIndex: 1, explanation: `64=8².` },
      ],
      quickQuestions: [
        { question: `√1 kaçtır?`, options: [`1`, `0`, `2`, `Tanımsız`], correctIndex: 0 },
        { question: `√4 kaçtır?`, options: [`2`, `4`, `8`, `16`], correctIndex: 0 },
        { question: `√9 kaçtır?`, options: [`3`, `4.5`, `9`, `81`], correctIndex: 0 },
        { question: `√16 kaçtır?`, options: [`4`, `8`, `16`, `2`], correctIndex: 0 },
        { question: `√25 kaçtır?`, options: [`5`, `5√1`, `25`, `12.5`], correctIndex: 0 },
        { question: `√36 kaçtır?`, options: [`6`, `12`, `36`, `18`], correctIndex: 0 },
        { question: `√49 kaçtır?`, options: [`7`, `14`, `49`, `24.5`], correctIndex: 0 },
        { question: `√64 kaçtır?`, options: [`8`, `16`, `4`, `64`], correctIndex: 0 },
        { question: `√81 kaçtır?`, options: [`9`, `8`, `27`, `81`], correctIndex: 0 },
        { question: `√100 kaçtır?`, options: [`10`, `100`, `50`, `20`], correctIndex: 0 },
        { question: `√121 kaçtır?`, options: [`11`, `10`, `12`, `21`], correctIndex: 0 },
        { question: `√144 kaçtır?`, options: [`12`, `14`, `72`, `24`], correctIndex: 0 },
        { question: `√169 kaçtır?`, options: [`13`, `14`, `12`, `15`], correctIndex: 0 },
        { question: `√196 kaçtır?`, options: [`14`, `15`, `16`, `13`], correctIndex: 0 },
        { question: `√225 kaçtır?`, options: [`15`, `14`, `16`, `25`], correctIndex: 0 },
        { question: `√256 kaçtır?`, options: [`16`, `26`, `4`, `8`], correctIndex: 0 },
        { question: `√400 kaçtır?`, options: [`20`, `40`, `200`, `25`], correctIndex: 0 },
        { question: `√900 kaçtır?`, options: [`30`, `90`, `300`, `9`], correctIndex: 0 },
        { question: `√2 · √8 kaçtır?`, options: [`4 (√16)`, `√10`, `16`, `2√2`], correctIndex: 0 },
        { question: `√3 · √12 kaçtır?`, options: [`6 (√36)`, `√36`, `15`, `4`], correctIndex: 0 },
        { question: `√5 · √20 kaçtır?`, options: [`10 (√100)`, `25`, `√100`, `100`], correctIndex: 0 },
        { question: `√2 · √2 kaçtır?`, options: [`2`, `√4`, `4`, `√2`], correctIndex: 0 },
        { question: `√3 · √3 kaçtır?`, options: [`3`, `√6`, `6`, `9`], correctIndex: 0 },
        { question: `√50/√2 kaçtır?`, options: [`5 (√25)`, `√25`, `25`, `√48`], correctIndex: 0 },
        { question: `√72/√2 kaçtır?`, options: [`6 (√36)`, `√36`, `36`, `√70`], correctIndex: 0 },
        { question: `√8 sayısının en sade hâli nedir?`, options: [`2√2`, `√8`, `4√2`, `8`], correctIndex: 0 },
        { question: `√12 sayısının en sade hâli nedir?`, options: [`2√3`, `3√2`, `4√3`, `2√6`], correctIndex: 0 },
        { question: `√18 sayısının en sade hâli nedir?`, options: [`3√2`, `2√3`, `9√2`, `6√3`], correctIndex: 0 },
        { question: `√20 sayısının en sade hâli nedir?`, options: [`2√5`, `4√5`, `5√2`, `√20`], correctIndex: 0 },
        { question: `√27 sayısının en sade hâli nedir?`, options: [`3√3`, `9√3`, `3√9`, `√27`], correctIndex: 0 },
        { question: `√32 sayısının en sade hâli nedir?`, options: [`4√2`, `2√4`, `8√2`, `√32`], correctIndex: 0 },
        { question: `√48 sayısının en sade hâli nedir?`, options: [`4√3`, `3√4`, `6√2`, `4√4`], correctIndex: 0 },
        { question: `√50 sayısının en sade hâli nedir?`, options: [`5√2`, `2√5`, `10√5`, `25√2`], correctIndex: 0 },
        { question: `√72 sayısının en sade hâli nedir?`, options: [`6√2`, `2√6`, `8√6`, `12√6`], correctIndex: 0 },
        { question: `√98 sayısının en sade hâli nedir?`, options: [`7√2`, `2√7`, `14√7`, `49√2`], correctIndex: 0 },
        { question: `2√3 + 3√3 kaçtır?`, options: [`5√3`, `5√6`, `6√3`, `√3`], correctIndex: 0 },
        { question: `5√7 − 2√7 kaçtır?`, options: [`3√7`, `7√7`, `3√14`, `√7`], correctIndex: 0 },
        { question: `3√5 + 2√5 kaçtır?`, options: [`5√5`, `5√10`, `6√5`, `5√25`], correctIndex: 0 },
        { question: `(2√3) · (3√5) kaçtır?`, options: [`6√15`, `5√15`, `6√8`, `5√8`], correctIndex: 0 },
        { question: `(4√2)² kaçtır?`, options: [`32`, `16`, `8`, `64`], correctIndex: 0 },
        { question: `√(9+16) kaçtır?`, options: [`5`, `7`, `25`, `√25 + 1`], correctIndex: 0 },
        { question: `√(36 - 11) kaçtır?`, options: [`5`, `25`, `4`, `√25`], correctIndex: 0 },
        { question: `√0,25 kaçtır?`, options: [`0,5`, `0,05`, `5`, `0,025`], correctIndex: 0 },
        { question: `√0,01 kaçtır?`, options: [`0,1`, `0,01`, `0,001`, `1`], correctIndex: 0 },
        { question: `√1/4 kaçtır?`, options: [`1/2`, `1/4`, `1/16`, `2`], correctIndex: 0 },
        { question: `√(4/9) kaçtır?`, options: [`2/3`, `4/9`, `4/3`, `2/9`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi tam kare sayıdır?`, options: [`64`, `50`, `20`, `18`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi tam kare DEĞİLDİR?`, options: [`50`, `49`, `64`, `81`], correctIndex: 0 },
        { question: `√3 + √3 kaçtır?`, options: [`2√3`, `√6`, `√9`, `3√2`], correctIndex: 0 },
        { question: `(√7)² kaçtır?`, options: [`7`, `49`, `14`, `√14`], correctIndex: 0 },
      ],
    },
    {
      id: "veri-analizi",
      name: `Veri Analizi`,
      summary: `Ortalama, ortanca, mod, açıklık ve grafikler.`,
      youtubeId: "",
      mindMap: {
        center: `Veri Analizi`,
        branches: [
          {
            label: `Aritmetik Ortalama`,
            sections: [
              { kind: "formul", content: `Ortalama = verilerin toplamı ÷ veri sayısı.` },
              { kind: "ornek", content: `4, 6, 8, 10 → toplam 28 ÷ 4 = 7. Notlar 70, 80, 90, 100 → toplam 340 ÷ 4 = 85. Tek sayı: 6, 8, 10 → 24 ÷ 3 = 8.` },
              { kind: "ipucu", content: `Bir veriyi ortalamaya katmak için: (eski toplam + yeni veri) ÷ (eski sayı + 1).` },
            ],
          },
          {
            label: `Ortanca (Medyan)`,
            sections: [
              { kind: "kural", content: `Veriler küçükten büyüğe SIRALANIR, ortadaki değerdir. Veri sayısı çiftse ortadaki ikisinin ortalaması alınır.` },
              { kind: "ornek", content: `Tek sayıda (5 veri): 3, 7, 8, 12, 15 → ortanca 8. Çift sayıda (4 veri): 10, 20, 30, 40 → (20+30) ÷ 2 = 25. Karışık: 5, 1, 9, 3, 7 → sıralı 1,3,5,7,9 → ortanca 5.` },
              { kind: "tuzak", content: `Sıralamadan medyan alınmaz! Önce mutlaka küçükten büyüğe sırala.` },
            ],
          },
          {
            label: `Tepe Değer (Mod)`,
            sections: [
              { kind: "tanim", content: `En çok tekrar eden değerdir. Hiçbiri tekrar etmiyorsa mod yoktur; birden çok değer aynı sayıda tekrar ederse birden çok mod olabilir.` },
              { kind: "ornek", content: `Tek mod: 3, 7, 7, 2, 9 → mod 7. Çift mod: 1, 2, 2, 3, 3, 4 → mod 2 ve 3. Mod yok: 1, 2, 3, 4, 5 → her veri eşit, mod yok.` },
            ],
          },
          {
            label: `Açıklık`,
            sections: [
              { kind: "formul", content: `Açıklık = en büyük veri − en küçük veri.` },
              { kind: "ornek", content: `2, 5, 9, 15, 22 → 22 − 2 = 20. Notlar 60, 75, 80, 95 → 95 − 60 = 35.` },
            ],
          },
          {
            label: `Grafikler`,
            sections: [
              { kind: "ornek", content: `Daire grafiği: bütünün parçalara (yüzde) dağılımı (ders saatlerinin oranı). Sütun grafiği: kategorileri karşılaştırma (sınıfların kişi sayısı). Çizgi grafiği: zaman içinde değişim (aylara göre sıcaklık).` },
              { kind: "ipucu", content: `Sorularda "yüzde" / "oran" → daire; "karşılaştırma" → sütun; "zaman içinde değişim" → çizgi grafiği uygun.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Aritmetik ortalama nasıl bulunur?`, back: `Verilerin toplamı / veri sayısı.` },
        { front: `Mod (tepe değer) nedir?`, back: `En çok tekrar eden veridir.` },
        { front: `Ortanca (medyan) nasıl bulunur?`, back: `Veriler sıralanır; ortadaki değerdir.` },
        { front: `Açıklık nedir?`, back: `En büyük veri − en küçük veri.` },
        { front: `Bir bütünün parçalara dağılımı hangi grafikle gösterilir?`, back: `Daire grafiği.` },
      ],
      article: `# Aritmetik Ortalama
[formül] **Ortalama = Verilerin toplamı ÷ Veri sayısı**
[örnek] 4, 6, 8, 10 → (4+6+8+10) ÷ 4 = 28 ÷ 4 = **7**.

# Ortanca (Medyan) ve Tepe Değer (Mod)
[kural] **Ortanca:** veriler küçükten büyüğe **sıralanır**, ortadaki değerdir. Veri sayısı **çift** ise ortadaki iki değerin ortalaması alınır.
[örnek] 10, 20, 30, 40 → (20+30) ÷ 2 = **25**. **Mod:** en çok tekrar eden değer (3,7,7,2,9 → 7).
[tuzak] Medyan bulurken sıralamayı unutma: "5, 1, 3" → sıralı (1,3,5) → ortanca **3** (1 değil!).

# Açıklık ve Grafikler
[formül] **Açıklık = En büyük veri − En küçük veri**
[örnek] 2, 5, 9 → 9 − 2 = **7**.
[ipucu] Bir bütünün parçalara (yüzde) dağılımı için **daire grafiği** uygundur.`,
      tips: [
        { trap: `Ortanca bulunurken sıralama unutulur.`, wrong: `5, 1, 3 verisinin ortancası 1'dir.`, correct: `Önce sıralanır (1, 3, 5); ortanca ortadaki değer olan 3'tür.` },
        { trap: `Ortalama ile mod karıştırılır.`, wrong: `En çok tekrar eden değere ortalama denir.`, correct: `En çok tekrar eden değer MOD'dur; ortalama toplam/veri sayısıdır.` },
      ],
      quiz: [
        { question: `4, 6, 8, 10 sayılarının aritmetik ortalaması kaçtır?`, options: [`6`, `7`, `8`, `28`], correctIndex: 1, explanation: `(4+6+8+10)/4=28/4=7.` },
        { question: `3, 7, 7, 2, 9 veri grubunun modu (tepe değeri) kaçtır?`, options: [`7`, `2`, `9`, `5,6`], correctIndex: 0, explanation: `7 iki kez tekrar eder.` },
        { question: `2, 5, 9 verisinin açıklığı kaçtır?`, options: [`7`, `9`, `2`, `5`], correctIndex: 0, explanation: `En büyük − en küçük = 9−2=7.` },
        { question: `1, 3, 5, 7, 9 verisinin ortancası (medyanı) kaçtır?`, options: [`3`, `5`, `7`, `9`], correctIndex: 1 },
        { question: `10, 20, 30, 40 verisinin ortancası kaçtır?`, options: [`25`, `20`, `30`, `35`], correctIndex: 0, explanation: `Çift sayıda veri: (20+30)/2=25.` },
        { question: `Notları 80, 90, 100 olan bir öğrencinin ortalaması kaçtır?`, options: [`80`, `90`, `100`, `270`], correctIndex: 1, explanation: `270/3=90.` },
        { question: `Bir bütünün parçalara (yüzde) dağılımını göstermede en uygun grafik hangisidir?`, options: [`Daire grafiği`, `Çizgi grafiği`, `Sütun grafiği`, `Tablo`], correctIndex: 0 },
        { question: `5, 5, 6, 8, 6, 5 verisinin modu kaçtır?`, options: [`5`, `6`, `8`, `5,83`], correctIndex: 0, explanation: `5 üç kez tekrar eder.` },
      ],
      quickQuestions: [
        { question: `Bir veri grubunun aritmetik ortalaması nasıl hesaplanır?`, options: [`Tüm verilerin toplamı / veri sayısı`, `Verilerin çarpımı`, `Verilerin farkı`, `Verilerin karesi`], correctIndex: 0 },
        { question: `4, 6, 8 sayılarının ortalaması kaçtır?`, options: [`6`, `8`, `4`, `18`], correctIndex: 0 },
        { question: `2, 4, 6, 8, 10 sayılarının ortalaması kaçtır?`, options: [`6`, `5`, `7`, `8`], correctIndex: 0 },
        { question: `Notları 70, 80, 90 olan öğrencinin ortalaması kaçtır?`, options: [`80`, `70`, `90`, `240`], correctIndex: 0 },
        { question: `Notları 60, 70, 80, 90 olan öğrencinin ortalaması kaçtır?`, options: [`75`, `70`, `80`, `300`], correctIndex: 0 },
        { question: `100, 95, 90, 85, 80 sayılarının ortalaması kaçtır?`, options: [`90`, `85`, `92`, `95`], correctIndex: 0 },
        { question: `Bir veri grubunun "açıklığı" nasıl bulunur?`, options: [`En büyük veri − en küçük veri`, `Toplama bölme`, `Çarpma`, `Çıkarma`], correctIndex: 0 },
        { question: `2, 5, 9, 14 verisinin açıklığı kaçtır?`, options: [`12`, `14`, `9`, `2`], correctIndex: 0 },
        { question: `5, 8, 12, 15, 20 verisinin açıklığı kaçtır?`, options: [`15`, `20`, `5`, `10`], correctIndex: 0 },
        { question: `Bir veri grubunun "tepe değeri (modu)" nedir?`, options: [`En çok tekrar eden veri`, `En büyük veri`, `En küçük veri`, `Ortalama`], correctIndex: 0 },
        { question: `2, 3, 5, 3, 7, 3, 9 verisinin modu kaçtır?`, options: [`3`, `7`, `5`, `9`], correctIndex: 0 },
        { question: `Bir veri grubunda hiç tekrar yoksa mod nedir?`, options: [`Mod yoktur`, `0'dır`, `Sıfır`, `Ortalamaya eşit`], correctIndex: 0 },
        { question: `Birden çok değer en sık tekrar ediyorsa moda ne denir?`, options: [`Birden çok modlu`, `Mod yok`, `Tek mod`, `Sıfır mod`], correctIndex: 0 },
        { question: `Bir veri grubunun "ortancası (medyanı)" nasıl bulunur?`, options: [`Veriler sıralandığında ortadaki değer`, `Ortalama`, `Mod`, `Toplam`], correctIndex: 0 },
        { question: `1, 3, 5, 7, 9 verisinin medyanı kaçtır?`, options: [`5`, `3`, `7`, `1`], correctIndex: 0 },
        { question: `2, 4, 6, 8 verisinin medyanı kaçtır?`, options: [`5 ((4+6)/2)`, `4`, `6`, `5,5`], correctIndex: 0 },
        { question: `Çift sayıda veri olduğunda medyan nasıl bulunur?`, options: [`İki ortadaki değerin ortalaması`, `Toplam / 2`, `En büyük / en küçük`, `Sadece en küçük`], correctIndex: 0 },
        { question: `Daire grafiği genelde neyi gösterir?`, options: [`Yüzdesel dağılımı (bir bütünün parçalarını)`, `Hız ve zamanı`, `Sıcaklığı`, `Mesafeyi`], correctIndex: 0 },
        { question: `Sütun grafiği genelde neyi gösterir?`, options: [`Kategorilerin sayısal karşılaştırmasını`, `Yüzdeyi`, `Sürekli değişimi`, `Sıcaklığı`], correctIndex: 0 },
        { question: `Çizgi grafiği genelde neyi gösterir?`, options: [`Zaman içindeki değişimi`, `Sadece toplamı`, `Yüzdeyi`, `Mod`], correctIndex: 0 },
        { question: `Sıklık tablosu neyi gösterir?`, options: [`Her verinin kaç kez tekrar ettiğini`, `Sadece ortalamayı`, `Sadece modu`, `Sadece açıklığı`], correctIndex: 0 },
        { question: `Bir veri grubu: 4, 6, 6, 8, 10. Bu verinin medyanı kaçtır?`, options: [`6`, `8`, `10`, `7`], correctIndex: 0 },
        { question: `Bir veri grubu: 4, 6, 6, 8, 10. Bu verinin modu kaçtır?`, options: [`6`, `4`, `8`, `10`], correctIndex: 0 },
        { question: `Bir veri grubu: 4, 6, 6, 8, 10. Bu verinin ortalaması kaçtır?`, options: [`6,8`, `6`, `7`, `8`], correctIndex: 0 },
        { question: `Bir veri grubu: 4, 6, 6, 8, 10. Bu verinin açıklığı kaçtır?`, options: [`6`, `8`, `10`, `4`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi nicel veridir?`, options: [`Boy (cm)`, `Cinsiyet`, `Göz rengi`, `Şehir`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi nitel veridir?`, options: [`Renk`, `Boy`, `Kilo`, `Sıcaklık`], correctIndex: 0 },
        { question: `Bir sınıfta 30 öğrencinin notları toplamı 2400 ise ortalaması kaçtır?`, options: [`80`, `60`, `70`, `90`], correctIndex: 0 },
        { question: `Bir öğrencinin 4 sınav notunun ortalaması 80. Toplam puanı kaçtır?`, options: [`320`, `240`, `400`, `80`], correctIndex: 0 },
        { question: `Bir öğrencinin 5 sınavda ortalaması 70'tir. 5 notu toplamı kaçtır?`, options: [`350`, `70`, `140`, `400`], correctIndex: 0 },
        { question: `3 sınav notu 60, 70, 80 olan öğrenci 4. sınavda ortalamayı 75 yapmak için kaç almalıdır?`, options: [`90 (toplam 300, 4·75=300; 300-210=90)`, `80`, `85`, `95`], correctIndex: 0 },
        { question: `Aşağıdaki verilerin ortalaması: 12, 16, 20, 24?`, options: [`18`, `16`, `20`, `19`], correctIndex: 0 },
        { question: `Bir verinin minimum ve maksimumu arasındaki fark hangi kavramdır?`, options: [`Açıklık`, `Mod`, `Medyan`, `Ortalama`], correctIndex: 0 },
        { question: `100 sayılık veride bütünün %30'u sütun grafiğinde nasıl gösterilir?`, options: [`30 birim yüksekliğinde bir sütun`, `100 birim`, `70 birim`, `30 birim genişlik`], correctIndex: 0 },
        { question: `Daire grafiğinde %25'lik dilim kaç dereceye karşılık gelir?`, options: [`90° (360°·0,25)`, `25°`, `100°`, `360°`], correctIndex: 0 },
        { question: `Daire grafiğinde %50'lik dilim kaç dereceye karşılık gelir?`, options: [`180°`, `90°`, `120°`, `50°`], correctIndex: 0 },
        { question: `Daire grafiğinde %75'lik dilim kaç dereceye karşılık gelir?`, options: [`270°`, `75°`, `225°`, `360°`], correctIndex: 0 },
        { question: `Daire grafiğinde tüm grafiğin toplamı kaç derecedir?`, options: [`360°`, `180°`, `90°`, `100°`], correctIndex: 0 },
        { question: `Daire grafiğinde 120°'lik dilim yüzde kaça karşılık gelir?`, options: [`%33,33`, `%30`, `%40`, `%50`], correctIndex: 0 },
        { question: `5, 5, 5 verisinin ortalaması kaçtır?`, options: [`5`, `15`, `0`, `1`], correctIndex: 0 },
        { question: `5, 5, 5 verisinin medyanı kaçtır?`, options: [`5`, `15`, `0`, `1`], correctIndex: 0 },
        { question: `5, 5, 5 verisinin modu kaçtır?`, options: [`5`, `15`, `0`, `Bir tane bile yok`], correctIndex: 0 },
        { question: `5, 5, 5 verisinin açıklığı kaçtır?`, options: [`0`, `5`, `15`, `1`], correctIndex: 0 },
        { question: `1, 2, 3, 4, 5, 6 verisinin medyanı kaçtır?`, options: [`3,5 ((3+4)/2)`, `3`, `4`, `4,5`], correctIndex: 0 },
        { question: `5, 10, 15 verisinin ortalaması kaçtır?`, options: [`10`, `15`, `5`, `30`], correctIndex: 0 },
        { question: `5, 10, 15, 20 verisinin ortalaması kaçtır?`, options: [`12,5`, `10`, `15`, `50`], correctIndex: 0 },
        { question: `3, 6, 9 verisinin medyanı kaçtır?`, options: [`6`, `3`, `9`, `18`], correctIndex: 0 },
        { question: `Bir veri grubunda ortalama, mod ve medyan eşit olabilir mi?`, options: [`Evet (örn: 5,5,5,5,5)`, `Hayır`, `Asla`, `Bilinmez`], correctIndex: 0 },
        { question: `Frekans (sıklık) ne demektir?`, options: [`Bir verinin kaç kez gözlemlendiği`, `Ortalama`, `Mod`, `Medyan`], correctIndex: 0 },
        { question: `Aşağıdaki verilerden hangisi 7'lik veri grubunda 7 değerine sahip olamaz?`, options: [`5, 6, 8, 9, 10 → çoğunluk 7'yi geçer`, `Olasıdır`, `7 zorunludur`, `Bilinmez`], correctIndex: 0 },
      ],
    },
    {
      id: "olasilik",
      name: `Olasılık`,
      summary: `Basit olayların olma olasılığı.`,
      youtubeId: "",
      mindMap: {
        center: `Olasılık`,
        branches: [
          {
            label: `Olasılık Tanımı`,
            sections: [
              { kind: "formul", content: `Olasılık = istenen çıktı sayısı ÷ tüm olası çıktı sayısı.` },
              { kind: "kural", content: `Sonuç daima 0 ile 1 arasındadır (0 ≤ olasılık ≤ 1).` },
              { kind: "ornek", content: `Hilesiz zarda 3 gelme = 1/6 (istenen 1, toplam 6). Hilesiz parada yazı gelme = 1/2.` },
            ],
          },
          {
            label: `Kesin ve İmkânsız Olay`,
            sections: [
              { kind: "kural", content: `Kesin olayın olasılığı 1, imkânsız olayın olasılığı 0'dır.` },
              { kind: "ornek", content: `Kesin: bir zar atıldığında 7'den küçük sayı gelmesi = 6/6 = 1. İmkânsız: bir zarda 7 gelmesi = 0/6 = 0.` },
              { kind: "tuzak", content: `Olasılık 1'den büyük olamaz; '1,5 olasılık' diye bir şey YOKTUR.` },
            ],
          },
          {
            label: `Zar Örnekleri`,
            sections: [
              { kind: "ornek", content: `Çift sayı (2,4,6): 3/6 = 1/2. Asal sayı (2,3,5): 3/6 = 1/2. 4'ten büyük (5,6): 2/6 = 1/3. 1 veya 6: 2/6 = 1/3.` },
            ],
          },
          {
            label: `Para ve Torba Örnekleri`,
            sections: [
              { kind: "ornek", content: `Para (yazı/tura): 1/2 her birinin. Torba (3 kırmızı + 2 mavi top, 5 toplam): kırmızı çekme = 3/5; mavi = 2/5. Torba (4 kırmızı + 6 mavi = 10): kırmızı = 4/10 = 2/5.` },
            ],
          },
          {
            label: `Sayı Seçme Örnekleri`,
            sections: [
              { kind: "ornek", content: `1–10 arası tam sayı seçme: asal (2,3,5,7) → 4/10 = 2/5; çift → 5/10 = 1/2; 3'ün katı (3,6,9) → 3/10. Bir harf seçme: TÜRKÇE'den bir harf rastgele → ünlü olasılığı (Ü,E) → 2/6 = 1/3.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Olasılık nasıl hesaplanır?`, back: `İstenen çıktı sayısı / tüm olası çıktı sayısı.` },
        { front: `Olasılık hangi aralıktadır?`, back: `0 ile 1 arasında.` },
        { front: `Kesin olayın olasılığı?`, back: `1.` },
        { front: `İmkânsız olayın olasılığı?`, back: `0.` },
        { front: `Hilesiz zarda 3 gelme olasılığı?`, back: `1/6.` },
      ],
      article: `# Olasılık Tanımı
[formül] **Olasılık = İstenen çıktı sayısı ÷ Tüm olası çıktı sayısı**
[kural] Olasılık değeri **daima 0 ile 1 arasındadır**.
[örnek] Hilesiz zarda 3 gelme olasılığı = 1 ÷ 6 = **1/6**.

# Kesin ve İmkânsız Olay
[kural] **Kesin olayın** olasılığı **1**, **imkânsız olayın** olasılığı **0**'dır.
[tuzak] Olasılık 1'den büyük olamaz; "1,5 olasılık" diye bir şey yoktur.

# Örnekler
[örnek] Zarda çift sayı (2,4,6) gelme: 3 ÷ 6 = **1/2**. Torbada 3 kırmızı + 2 mavi top → kırmızı çekme = **3/5**.
[soru] "1–10 arasından seçilen sayı asal mı?" → asallar 2,3,5,7 → 4/10 = **2/5**.`,
      tips: [
        { trap: `Olasılığın 1'den büyük olabileceği sanılır.`, wrong: `Bir olayın olasılığı 1,5 olabilir.`, correct: `Olasılık daima 0 ile 1 arasındadır; 1'den büyük olamaz.` },
        { trap: `Para atışında olasılık karıştırılır.`, wrong: `Hilesiz parada tura gelme olasılığı 1'dir.`, correct: `Tura gelme olasılığı 1/2'dir (iki eşit sonuçtan biri).` },
      ],
      quiz: [
        { question: `Hilesiz bir zarda 3 gelme olasılığı kaçtır?`, options: [`1/6`, `1/3`, `3/6`, `1/2`], correctIndex: 0 },
        { question: `Hilesiz bir parada yazı gelme olasılığı kaçtır?`, options: [`1`, `1/2`, `1/4`, `0`], correctIndex: 1 },
        { question: `Bir zarda çift sayı (2, 4, 6) gelme olasılığı kaçtır?`, options: [`1/2`, `1/3`, `1/6`, `2/3`], correctIndex: 0, explanation: `3 uygun sonuç / 6 = 1/2.` },
        { question: `İçinde 3 kırmızı, 2 mavi top olan torbadan kırmızı çekme olasılığı kaçtır?`, options: [`3/5`, `2/5`, `3/2`, `1/5`], correctIndex: 0, explanation: `3 kırmızı / 5 top.` },
        { question: `İmkânsız bir olayın olasılığı kaçtır?`, options: [`0`, `1`, `1/2`, `100`], correctIndex: 0 },
        { question: `Kesin bir olayın olasılığı kaçtır?`, options: [`0`, `1`, `1/2`, `10`], correctIndex: 1 },
        { question: `1'den 10'a kadar olan sayılardan rastgele seçilen birinin asal olma olasılığı kaçtır?`, options: [`2/5`, `1/2`, `3/10`, `1/5`], correctIndex: 0, explanation: `Asallar 2,3,5,7 → 4/10 = 2/5.` },
        { question: `Bir olayın olasılığı en fazla kaç olabilir?`, options: [`1`, `6`, `100`, `Sınırsız`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Olasılık nedir?`, options: [`İstenen sonuç sayısı / tüm olası sonuç sayısı`, `İstenen olay sayısı`, `Tüm olay sayısı`, `İstenen olay × tüm olay`], correctIndex: 0 },
        { question: `Olasılık değeri hangi aralıkta olur?`, options: [`0 ile 1 arasında`, `0 ile 100 arasında`, `-1 ile 1 arasında`, `0 ile 10 arasında`], correctIndex: 0 },
        { question: `Kesin olayın olasılığı kaçtır?`, options: [`1`, `0`, `1/2`, `100`], correctIndex: 0 },
        { question: `İmkânsız olayın olasılığı kaçtır?`, options: [`0`, `1`, `1/2`, `-1`], correctIndex: 0 },
        { question: `Hilesiz bir parada yazı gelme olasılığı kaçtır?`, options: [`1/2`, `1/4`, `1`, `0`], correctIndex: 0 },
        { question: `Hilesiz bir parada tura gelme olasılığı kaçtır?`, options: [`1/2`, `1`, `0`, `1/4`], correctIndex: 0 },
        { question: `Hilesiz bir zarda 1 gelme olasılığı kaçtır?`, options: [`1/6`, `1/3`, `1/2`, `1`], correctIndex: 0 },
        { question: `Hilesiz bir zarda 6 gelme olasılığı kaçtır?`, options: [`1/6`, `1/3`, `1/2`, `1`], correctIndex: 0 },
        { question: `Hilesiz bir zarda çift sayı gelme olasılığı?`, options: [`1/2 (2,4,6)`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Hilesiz bir zarda tek sayı gelme olasılığı?`, options: [`1/2 (1,3,5)`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Hilesiz bir zarda 3'ten büyük sayı gelme olasılığı?`, options: [`1/2 (4,5,6)`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Hilesiz bir zarda asal sayı gelme olasılığı?`, options: [`1/2 (2,3,5)`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Hilesiz bir zarda 3'ün katı sayı gelme olasılığı?`, options: [`1/3 (3,6)`, `1/2`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Bir torbada 3 kırmızı 2 mavi top var. Kırmızı çekme olasılığı?`, options: [`3/5`, `2/5`, `3/2`, `1/5`], correctIndex: 0 },
        { question: `Bir torbada 3 kırmızı 2 mavi top var. Mavi çekme olasılığı?`, options: [`2/5`, `3/5`, `2/3`, `1/5`], correctIndex: 0 },
        { question: `5 kırmızı, 5 mavi top var. Kırmızı çekme olasılığı?`, options: [`1/2`, `1/5`, `5/10`, `Hepsi doğru`], correctIndex: 0 },
        { question: `Bir torbada 2 kırmızı, 3 mavi, 5 yeşil top var. Mavi çekme olasılığı?`, options: [`3/10`, `3/5`, `1/3`, `2/3`], correctIndex: 0 },
        { question: `Torbada 4 sarı, 6 mavi top var. Mavi çekme olasılığı?`, options: [`6/10 = 3/5`, `4/10`, `1/2`, `1/3`], correctIndex: 0 },
        { question: `1'den 10'a kadar sayılardan rastgele biri seçilince asal olma olasılığı?`, options: [`2/5 (2,3,5,7 → 4/10)`, `1/2`, `3/10`, `1/5`], correctIndex: 0 },
        { question: `1'den 20'ye kadar sayılardan rastgele biri seçilince 5'in katı olma olasılığı?`, options: [`1/5 (5,10,15,20 → 4/20)`, `1/4`, `2/5`, `1/10`], correctIndex: 0 },
        { question: `1'den 6'ya kadar sayılardan rastgele biri seçilince çift olma olasılığı?`, options: [`1/2 (2,4,6)`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Bir torbada 8 top var. Birini çekme olasılığı?`, options: [`1/8`, `1/4`, `1`, `8`], correctIndex: 0 },
        { question: `Bir madeni parayı 2 kez attığımızda ikisinin de yazı gelmesi olasılığı?`, options: [`1/4 ((1/2)·(1/2))`, `1/2`, `2/4`, `3/4`], correctIndex: 0 },
        { question: `İki paranın da tura gelme olasılığı?`, options: [`1/4`, `1/2`, `2/4`, `3/4`], correctIndex: 0 },
        { question: `Bağımsız iki olayın "ve" olasılığı nasıl hesaplanır?`, options: [`Olasılıklar çarpılır`, `Toplanır`, `Çıkarılır`, `Bölünür`], correctIndex: 0 },
        { question: `Bir zarı 2 kez atınca ikisinde de 6 gelme olasılığı?`, options: [`1/36 ((1/6)·(1/6))`, `2/6`, `2/36`, `1/12`], correctIndex: 0 },
        { question: `Bir tornadan rastgele 1 erkek + 1 kız öğrenci seçme olasılığı (10 erkek, 10 kız varsa)?`, options: [`Karmaşık; tek seçim için 1/2`, `1`, `0`, `1/100`], correctIndex: 0 },
        { question: `Bir olayın olasılığı 1 ise o olay nedir?`, options: [`Kesin olay`, `İmkânsız`, `Karşıt olay`, `Bilinmez`], correctIndex: 0 },
        { question: `Bir olayın olasılığı 0 ise o olay nedir?`, options: [`İmkânsız olay`, `Kesin olay`, `Karşıt olay`, `Bilinmez`], correctIndex: 0 },
        { question: `Bir olayın tersi olan olaya ne denir?`, options: [`Karşıt (tümleyen) olay`, `Eş olay`, `Çakışan olay`, `Bağımsız olay`], correctIndex: 0 },
        { question: `Olasılığı 1/4 olan bir olayın karşıt olayının olasılığı kaçtır?`, options: [`3/4 (1 - 1/4)`, `1/4`, `1/2`, `1`], correctIndex: 0 },
        { question: `Olasılığı 0,3 olan bir olayın tersinin olasılığı kaçtır?`, options: [`0,7`, `0,3`, `0,5`, `1`], correctIndex: 0 },
        { question: `Aşağıdaki olaylardan hangisi kesindir?`, options: [`Güneşin doğudan doğması`, `Zarda 7 gelmesi`, `Pul atınca yazı gelmesi`, `Hepsi`], correctIndex: 0 },
        { question: `Aşağıdaki olaylardan hangisi imkânsızdır?`, options: [`Zarda 7 gelmesi`, `Zarda 6 gelmesi`, `Para tura gelmesi`, `Yağmur yağması`], correctIndex: 0 },
        { question: `Bir torbada 5 top var. Hepsi sarı. Sarı çekme olasılığı?`, options: [`1 (kesin)`, `5/5`, `Hepsi doğru`, `0`], correctIndex: 2 },
        { question: `Bir torbada 5 top var. Hepsi sarı. Mavi çekme olasılığı?`, options: [`0`, `1`, `1/5`, `5/5`], correctIndex: 0 },
        { question: `Olaylardan ya biri ya diğeri (ayrık) olursa "veya" olasılığı nasıl hesaplanır?`, options: [`Olasılıklar toplanır`, `Çarpılır`, `Bölünür`, `Karelenir`], correctIndex: 0 },
        { question: `Bir zarda 1 veya 6 gelme olasılığı?`, options: [`2/6 = 1/3`, `1/36`, `1/6`, `1/2`], correctIndex: 0 },
        { question: `Bir zarda 2 veya 4 veya 6 gelme olasılığı?`, options: [`1/2`, `1/3`, `1/6`, `2/3`], correctIndex: 0 },
        { question: `Bir kartta As gelme olasılığı? (52'lik desteden)`, options: [`4/52 = 1/13`, `1/52`, `4/13`, `1/4`], correctIndex: 0 },
        { question: `Bir torbada 4 sarı, 6 mavi top var. Kırmızı çekme olasılığı?`, options: [`0`, `1`, `4/10`, `6/10`], correctIndex: 0 },
        { question: `2 zar atılınca toplamın 7 olma olasılığı?`, options: [`6/36 = 1/6`, `1/12`, `7/36`, `1/2`], correctIndex: 0 },
        { question: `2 zarın toplamının en fazla kaç olabilir?`, options: [`12 (6+6)`, `7`, `11`, `36`], correctIndex: 0 },
        { question: `2 zarın toplamının en az kaç olabilir?`, options: [`2 (1+1)`, `0`, `1`, `12`], correctIndex: 0 },
        { question: `Bir zarda 3 gelme olasılığı %kaçtır?`, options: [`%16,67 (≈%17)`, `%50`, `%30`, `%10`], correctIndex: 0 },
        { question: `Bir torbadan 1 top çekme olayında çekilen topun rengi olarak kaç farklı sonuç olabilir? (3 farklı renk varsa)`, options: [`3`, `1`, `2`, `4`], correctIndex: 0 },
        { question: `4 sayfalık bir kitabı rastgele bir sayfasından açma olasılığı?`, options: [`1/4`, `1/2`, `4`, `0`], correctIndex: 0 },
        { question: `Olasılık öğretirken kullanılan en yaygın araç hangisidir?`, options: [`Hilesiz zar ve para`, `Sadece kartlar`, `Sadece toplar`, `Sadece sayılar`], correctIndex: 0 },
        { question: `Bir olayın olasılığı 0,5 ise o olayın olma şansı ne anlama gelir?`, options: [`Yarı yarıya (%50)`, `Kesin`, `İmkânsız`, `Çok düşük`], correctIndex: 0 },
        { question: `Bir torbada 10 mavi top var. Mavi çekme olasılığı?`, options: [`1 (kesin)`, `1/10`, `10`, `0`], correctIndex: 0 },
      ],
    },
    {
      id: "cebirsel-ifadeler",
      name: `Cebirsel İfadeler ve Özdeşlikler`,
      summary: `Özdeşlikler ve çarpanlara ayırma.`,
      youtubeId: "",
      mindMap: {
        center: `Cebirsel İfadeler`,
        branches: [
          {
            label: `Cebirsel İfadeler`,
            sections: [
              { kind: "tanim", content: `Değişken (harf) içeren ifade. 3x+5: 3 katsayı, x değişken, 5 sabit terim.` },
              { kind: "kural", content: `Yalnız benzer terimler toplanır: 3x + 2x = 5x.` },
              { kind: "tuzak", content: `3x + 2 = 5x YANLIŞ; 3x ile 2 benzer terim değildir.` },
            ],
          },
          {
            label: `Özdeşlikler`,
            sections: [
              { kind: "formul", content: `(a+b)² = a²+2ab+b² • (a−b)² = a²−2ab+b² • a²−b² = (a−b)(a+b)` },
              { kind: "ornek", content: `(x+3)² = x² + 6x + 9 • (x+5)² = x² + 10x + 25 • (a−4)² = a² − 8a + 16 • x² − 36 = (x−6)(x+6).` },
              { kind: "tuzak", content: `(a+b)² ≠ a²+b²; ortadaki 2ab terimi unutulmaz.` },
            ],
          },
          {
            label: `Çarpanlara Ayırma`,
            sections: [
              { kind: "formul", content: `Ortak çarpan parantezine alma veya özdeşlik kullanma.` },
              { kind: "ornek", content: `4x+8 = 4(x+2) • x²−25 = (x−5)(x+5).` },
            ],
          },
        ],
      },
      cards: [
        { front: `(a+b)² açılımı nedir?`, back: `a² + 2ab + b².` },
        { front: `(a−b)² açılımı nedir?`, back: `a² − 2ab + b².` },
        { front: `a²−b² çarpanlarına nasıl ayrılır?`, back: `(a−b)(a+b).` },
        { front: `Benzer terim nedir?`, back: `Değişkeni ve derecesi aynı olan terimlerdir: 3x ve 2x benzerdir.` },
        { front: `4x+8 ifadesinin ortak çarpanı?`, back: `4(x+2).` },
      ],
      article: `# Cebirsel İfadeler
İçinde **değişken (harf)** bulunan ifadelerdir. **3x + 5** ifadesinde 3 katsayı, x değişken, 5 sabit terimdir.
[kural] Yalnızca **benzer terimler** (değişkeni ve derecesi aynı olanlar) toplanıp çıkarılır: 3x + 2x = 5x.
[tuzak] **3x + 2 = 5x YANLIŞTIR**; 3x ile 2 benzer terim değildir, toplanamaz.

# Özdeşlikler
[formül] **(a+b)² = a²+2ab+b²**  •  **(a−b)² = a²−2ab+b²**  •  **a²−b² = (a−b)(a+b)**
[örnek] (x+3)² = x² + 2·x·3 + 3² = **x²+6x+9**.
[tuzak] **(a+b)² ≠ a²+b².** Ortadaki **2ab** terimi unutulmamalı.

# Çarpanlara Ayırma
Bir ifadeyi çarpımlar biçiminde yazmaktır.
[örnek] Ortak çarpan: 4x+8 = **4(x+2)**. Özdeşlikle (iki kare farkı): x²−25 = **(x−5)(x+5)**.
[soru] "x²−25 çarpanlarına nasıl ayrılır?" → a²−b² kuralıyla (x−5)(x+5).`,
      tips: [
        { trap: `(a+b)² = a²+b² sanılır.`, wrong: `(a+b)² = a² + b².`, correct: `(a+b)² = a² + 2ab + b². Ortadaki 2ab terimi unutulmamalı.` },
        { trap: `Benzer olmayan terimler toplanır.`, wrong: `3x + 2 = 5x.`, correct: `3x ile 2 benzer terim değildir; toplanamaz. Yalnız 3x + 2x = 5x.` },
      ],
      quiz: [
        { question: `(x+3)² ifadesinin açılımı hangisidir?`, options: [`x²+9`, `x²+6x+9`, `x²+3x+9`, `x²+6x+3`], correctIndex: 1, explanation: `2·x·3=6x, 3²=9.` },
        { question: `(a−b)² ifadesinin açılımı hangisidir?`, options: [`a²−b²`, `a²−2ab+b²`, `a²+2ab+b²`, `a²−ab+b²`], correctIndex: 1 },
        { question: `x²−25 ifadesinin çarpanlarına ayrılmış hâli hangisidir?`, options: [`(x−5)(x+5)`, `(x−25)(x+1)`, `(x−5)²`, `(x+5)²`], correctIndex: 0, explanation: `a²−b² = (a−b)(a+b), b=5.` },
        { question: `3x + 5x işleminin sonucu nedir?`, options: [`8x`, `15x`, `8x²`, `35`], correctIndex: 0 },
        { question: `2(x+4) ifadesinin dağıtılmış hâli nedir?`, options: [`2x+4`, `2x+8`, `x+8`, `2x+6`], correctIndex: 1 },
        { question: `4x+8 ifadesinin ortak çarpan parantezine alınmış hâli nedir?`, options: [`4(x+2)`, `2(2x+8)`, `4(x+8)`, `x(4+8)`], correctIndex: 0, explanation: `4·x=4x, 4·2=8.` },
        { question: `(x+2)² ifadesinin açılımında ortadaki terim kaçtır?`, options: [`2x`, `4x`, `4`, `x²`], correctIndex: 1, explanation: `2·x·2=4x.` },
        { question: `a²−b² ifadesi aşağıdakilerden hangisine eşittir?`, options: [`(a−b)²`, `(a−b)(a+b)`, `(a+b)²`, `a²+b²`], correctIndex: 1 },
      ],
      quickQuestions: [
        { question: `Sayı ve harflerden oluşan ifadelere ne denir?`, options: [`Cebirsel ifade`, `Denklem`, `Eşitsizlik`, `Bilinmeyen`], correctIndex: 0 },
        { question: `3x ifadesinde 3 sayısının adı nedir?`, options: [`Katsayı`, `Bilinmeyen`, `Sabit terim`, `Üs`], correctIndex: 0 },
        { question: `3x + 5 ifadesinde 5'in adı nedir?`, options: [`Sabit terim`, `Katsayı`, `Bilinmeyen`, `Üs`], correctIndex: 0 },
        { question: `4x + 7 ifadesinin terim sayısı kaçtır?`, options: [`2`, `1`, `3`, `4`], correctIndex: 0 },
        { question: `5x² + 3x + 2 ifadesi kaç terimden oluşur?`, options: [`3`, `2`, `5`, `6`], correctIndex: 0 },
        { question: `3x + 5x kaçtır?`, options: [`8x`, `15x`, `8x²`, `35`], correctIndex: 0 },
        { question: `7y − 3y kaçtır?`, options: [`4y`, `10y`, `4`, `21y`], correctIndex: 0 },
        { question: `5x + 3 − 2x kaçtır?`, options: [`3x + 3`, `5x + 3`, `3x − 3`, `x + 3`], correctIndex: 0 },
        { question: `2x + 3y + x − y kaçtır?`, options: [`3x + 2y`, `2x + 2y`, `3x + 3y`, `x + 4y`], correctIndex: 0 },
        { question: `Benzer terimler hangileridir?`, options: [`Değişken ve üsleri aynı olan terimler`, `Katsayıları aynı olanlar`, `Sayısı aynı olanlar`, `Hiçbiri`], correctIndex: 0 },
        { question: `3x ve 5y benzer terimler midir?`, options: [`Değildir (farklı değişken)`, `Evet`, `Bazen`, `Aynı şeydir`], correctIndex: 0 },
        { question: `4x² ve 7x² benzer terimler midir?`, options: [`Evet (aynı değişken ve üs)`, `Hayır`, `Bazen`, `Aynı şeydir`], correctIndex: 0 },
        { question: `2(x + 3) işleminin sonucu nedir?`, options: [`2x + 6`, `2x + 3`, `x + 6`, `2x + 5`], correctIndex: 0 },
        { question: `3(2x − 4) işleminin sonucu nedir?`, options: [`6x − 12`, `6x − 4`, `5x − 12`, `6x + 12`], correctIndex: 0 },
        { question: `−2(x + 5) işleminin sonucu nedir?`, options: [`−2x − 10`, `−2x + 10`, `2x − 10`, `2x + 10`], correctIndex: 0 },
        { question: `2(x + 3) + 3(x − 1) işleminin sonucu nedir?`, options: [`5x + 3`, `5x − 3`, `2x + 2`, `5x + 6`], correctIndex: 0 },
        { question: `x · x kaçtır?`, options: [`x²`, `2x`, `x`, `x³`], correctIndex: 0 },
        { question: `x² · x³ kaçtır?`, options: [`x⁵`, `x⁶`, `x¹`, `2x⁵`], correctIndex: 0 },
        { question: `(2x)(3x) kaçtır?`, options: [`6x²`, `5x²`, `6x`, `5x`], correctIndex: 0 },
        { question: `(x + 2)(x + 3) işleminin sonucu nedir?`, options: [`x² + 5x + 6`, `x² + 6x + 5`, `x² + 5x + 5`, `x² + 6`], correctIndex: 0 },
        { question: `(x + 1)(x − 1) işleminin sonucu nedir?`, options: [`x² − 1`, `x² + 1`, `x² − x − 1`, `x² − 2x − 1`], correctIndex: 0 },
        { question: `(x − 3)(x + 3) işleminin sonucu nedir?`, options: [`x² − 9`, `x² + 9`, `x² − 6`, `x² + 6`], correctIndex: 0 },
        { question: `(x + 2)² işleminin sonucu nedir?`, options: [`x² + 4x + 4`, `x² + 4`, `x² + 2x + 4`, `x² − 4x + 4`], correctIndex: 0 },
        { question: `(x − 3)² işleminin sonucu nedir?`, options: [`x² − 6x + 9`, `x² + 6x + 9`, `x² − 9`, `x² − 9x + 6`], correctIndex: 0 },
        { question: `(a + b)² formülü nedir?`, options: [`a² + 2ab + b²`, `a² + b²`, `a² + ab + b²`, `a² − 2ab + b²`], correctIndex: 0 },
        { question: `(a − b)² formülü nedir?`, options: [`a² − 2ab + b²`, `a² − b²`, `a² − ab + b²`, `a² + 2ab + b²`], correctIndex: 0 },
        { question: `a² − b² ifadesi nasıl çarpanlarına ayrılır?`, options: [`(a − b)(a + b)`, `(a − b)²`, `(a + b)²`, `a² + b²`], correctIndex: 0 },
        { question: `x² − 25 ifadesi nasıl çarpanlarına ayrılır?`, options: [`(x − 5)(x + 5)`, `(x − 5)²`, `(x + 5)²`, `(x − 25)(x + 1)`], correctIndex: 0 },
        { question: `x² − 9 ifadesi nasıl çarpanlarına ayrılır?`, options: [`(x − 3)(x + 3)`, `(x − 3)²`, `(x + 9)(x − 1)`, `(x + 3)²`], correctIndex: 0 },
        { question: `x² − 16 ifadesi nasıl çarpanlarına ayrılır?`, options: [`(x − 4)(x + 4)`, `(x − 4)²`, `(x + 4)²`, `(x − 16)(x + 1)`], correctIndex: 0 },
        { question: `4x + 8 ifadesinin ortak çarpanına ayrılması?`, options: [`4(x + 2)`, `2(2x + 8)`, `4(x + 8)`, `x(4 + 8)`], correctIndex: 0 },
        { question: `6x + 9 ifadesinin ortak çarpanına ayrılması?`, options: [`3(2x + 3)`, `2(3x + 9)`, `6(x + 9)`, `x(6 + 9)`], correctIndex: 0 },
        { question: `2x² + 4x ifadesinin ortak çarpanına ayrılması?`, options: [`2x(x + 2)`, `2(x² + 4x)`, `x(2x + 4)`, `4(x² + x)`], correctIndex: 0 },
        { question: `x² + 4x ifadesinin ortak çarpanına ayrılması?`, options: [`x(x + 4)`, `(x + 2)²`, `x² + 4`, `(x + 4)²`], correctIndex: 0 },
        { question: `6x² + 9x ifadesinin ortak çarpanına ayrılması nasıldır?`, options: [`3x(2x + 3)`, `3(2x² + 3x)`, `6x(x + 9)`, `x(6x + 9)`], correctIndex: 0 },
        { question: `8a + 4b ifadesinin ortak çarpanına ayrılması nasıldır?`, options: [`4(2a + b)`, `2(4a + 2b)`, `8(a + b/2)`, `4(a + b)`], correctIndex: 0 },
        { question: `25x² − 16 ifadesi nasıl çarpanlarına ayrılır?`, options: [`(5x − 4)(5x + 4)`, `(5x − 4)²`, `(25x − 16)(x + 1)`, `(5x + 4)²`], correctIndex: 0 },
        { question: `x = 3 için 2x + 5 ifadesinin değeri kaçtır?`, options: [`11 (6+5)`, `8`, `13`, `15`], correctIndex: 0 },
        { question: `x = 2, y = 3 için 3x + 2y ifadesinin değeri kaçtır?`, options: [`12 (6+6)`, `13`, `10`, `15`], correctIndex: 0 },
        { question: `x = 4 için x² − 1 ifadesinin değeri kaçtır?`, options: [`15`, `16`, `17`, `3`], correctIndex: 0 },
        { question: `Cebirsel ifade ile denklem arasındaki fark nedir?`, options: [`Denklemde eşitlik (=) vardır`, `Cebirsel ifade daha uzundur`, `Hiç fark yoktur`, `Cebirsel ifadede sadece sayı vardır`], correctIndex: 0 },
        { question: `(x + 2)² − (x − 2)² ifadesinin sadeleşmiş hâli nedir?`, options: [`8x ([(x+2)+(x−2)][(x+2)−(x−2)] = 2x·4)`, `4x`, `8`, `4x²`], correctIndex: 0 },
        { question: `x² + 6x + 9 ifadesi hangi tam karenin açılımıdır?`, options: [`(x + 3)²`, `(x − 3)²`, `(x + 9)²`, `(x + 6)²`], correctIndex: 0 },
        { question: `x² − 10x + 25 ifadesi hangi tam karenin açılımıdır?`, options: [`(x − 5)²`, `(x + 5)²`, `(x − 25)²`, `(x − 10)²`], correctIndex: 0 },
        { question: `(2x + 1)² ifadesinin açılımı?`, options: [`4x² + 4x + 1`, `2x² + 2x + 1`, `4x² + 2x + 1`, `2x² + 4x + 1`], correctIndex: 0 },
        { question: `(3x − 2)² ifadesinin açılımı?`, options: [`9x² − 12x + 4`, `9x² + 12x + 4`, `9x² − 4`, `9x² − 6x + 4`], correctIndex: 0 },
        { question: `(2a + 3b)² ifadesinin açılımı?`, options: [`4a² + 12ab + 9b²`, `4a² + 6ab + 9b²`, `4a² + 9b²`, `4a² + 12ab + 6b²`], correctIndex: 0 },
        { question: `x² + 10x + 25 ifadesi hangisinin çarpanı olur?`, options: [`(x + 5)²`, `(x − 5)²`, `(x + 25)(x + 1)`, `(x + 10)(x + 1)`], correctIndex: 0 },
        { question: `x² − 4x + 4 ifadesi hangi tam karenin açılımıdır?`, options: [`(x − 2)²`, `(x + 2)²`, `(x − 4)²`, `(x − 2)(x + 2)`], correctIndex: 0 },
        { question: `(x + y)² − 2xy − y² ifadesi hangisine eşittir?`, options: [`x² (=(x²+2xy+y²)−2xy−y²)`, `y²`, `2xy`, `−y²`], correctIndex: 0 },
      ],
    },
    {
      id: "dogrusal-denklemler",
      name: `Doğrusal Denklemler`,
      summary: `Denklem çözme, koordinat sistemi ve eğim.`,
      youtubeId: "",
      mindMap: {
        center: `Doğrusal Denklemler`,
        branches: [
          {
            label: `Birinci Dereceden Denklemler`,
            sections: [
              { kind: "kural", content: `Bilinmeyen (x) yalnız bırakılır; taraf değiştiren terimin işareti değişir.` },
              { kind: "ornek", content: `Basit: 2x+3=11 → 2x=8 → x=4. Çıkarma: x−5=2 → x=7. Çarpan: 3x=18 → x=6. Bölen: x÷2=6 → x=12. Bileşik: 5x−4=16 → 5x=20 → x=4.` },
              { kind: "ornek", content: `Dağıtmalı: 2(x+4)=20 → 2x+8=20 → 2x=12 → x=6. Kesirli: x/3+2=5 → x/3=3 → x=9.` },
              { kind: "tuzak", content: `x+5=2 → x=7 YANLIŞ; taraf değiştirirken işaret değişir, doğrusu x = 2−5 = −3.` },
            ],
          },
          {
            label: `Koordinat Sistemi`,
            sections: [
              { kind: "tanim", content: `Düzlemdeki nokta (x, y) ile gösterilir; x apsis (yatay), y ordinat (dikey).` },
              { kind: "ornek", content: `(3, 2): 1. bölge. (−3, 2): 2. bölge. (−3, −2): 3. bölge. (3, −2): 4. bölge. (0, 5): y ekseni üzerinde. (4, 0): x ekseni üzerinde. (0, 0): orijin.` },
            ],
          },
          {
            label: `Doğrunun Eğimi`,
            sections: [
              { kind: "formul", content: `Eğim = (y2 − y1) ÷ (x2 − x1) = dikey değişim ÷ yatay değişim.` },
              { kind: "ornek", content: `İki nokta: (1,2) ve (3,8) → eğim = (8−2)÷(3−1) = 6/2 = 3. y = 2x+1 doğrusunun eğimi 2'dir.` },
              { kind: "ipucu", content: `Eğim pozitifse doğru sağa yukarı; negatifse sağa aşağı eğimlidir. Eğim 0 ise yatay; tanımsızsa dikey doğrudur.` },
              { kind: "tuzak", content: `Eğim = x ÷ y DEĞİL; doğrusu y ÷ x'tir.` },
            ],
          },
          {
            label: `Doğru Grafiği`,
            sections: [
              { kind: "tanim", content: `Doğrusal (y = ax+b) bir denklemin grafiği bir doğrudur.` },
              { kind: "ipucu", content: `Çizmek için iki nokta yeterli: x=0 → y=b (y kesimi); y=0 → x=−b/a (x kesimi). Bu iki noktayı birleştir.` },
            ],
          },
        ],
      },
      cards: [
        { front: `2x+3=11 ise x kaçtır?`, back: `x=4 (2x=8).` },
        { front: `Denklem çözerken taraf değiştiren terim?`, back: `İşareti değişir.` },
        { front: `(x, y) noktasında x neyi gösterir?`, back: `Apsisi (yatay konum).` },
        { front: `Doğrunun eğimi nasıl bulunur?`, back: `y'deki değişim / x'teki değişim.` },
        { front: `Doğrusal denklemin grafiği nedir?`, back: `Bir doğrudur.` },
      ],
      article: `# Birinci Dereceden Denklemler
Bilinmeyeni (x) **yalnız bırakarak** çözülür.
[kural] Bir terim eşitliğin diğer tarafına geçerken **işareti değişir**.
[örnek] 2x + 3 = 11 → 2x = 11 − 3 = 8 → **x = 4**.
[tuzak] x + 5 = 2 → x = 7 **YANLIŞTIR**. Doğrusu x = 2 − 5 = **−3**.

# Koordinat Sistemi
[kural] Her nokta **(x, y)** ile gösterilir; x **apsis**, y **ordinat**tır.
[örnek] (3, −2) noktasının apsisi 3'tür. (0, 5) noktası **y ekseni** üzerindedir.

# Doğrunun Eğimi
[formül] **Eğim = y'deki değişim ÷ x'teki değişim** (dikey ÷ yatay)
[tuzak] Eğim = x ÷ y **değildir**; doğrusu y ÷ x'tir.
[ipucu] Doğrusal bir denklemin grafiği koordinat düzleminde bir **doğru**dur.`,
      tips: [
        { trap: `Denklemde taraf değiştirirken işaret unutulur.`, wrong: `x + 5 = 2 → x = 7.`, correct: `x + 5 = 2 → x = 2 − 5 = −3. Taraf değiştiren terimin işareti değişir.` },
        { trap: `Eğim formülü ters yazılır.`, wrong: `Eğim = x'teki değişim / y'deki değişim.`, correct: `Eğim = y'deki değişim / x'teki değişim (dikey/yatay).` },
      ],
      quiz: [
        { question: `2x + 3 = 11 denkleminde x kaçtır?`, options: [`4`, `7`, `5`, `8`], correctIndex: 0, explanation: `2x=8, x=4.` },
        { question: `x − 5 = 2 denkleminde x kaçtır?`, options: [`7`, `−3`, `3`, `10`], correctIndex: 0 },
        { question: `3x = 18 ise x kaçtır?`, options: [`6`, `15`, `54`, `3`], correctIndex: 0 },
        { question: `5x − 4 = 16 ise x kaçtır?`, options: [`4`, `2,4`, `20`, `3`], correctIndex: 0, explanation: `5x=20, x=4.` },
        { question: `(3, −2) noktasının apsisi (x) kaçtır?`, options: [`3`, `−2`, `1`, `5`], correctIndex: 0 },
        { question: `(0, 5) noktası koordinat düzleminde nerededir?`, options: [`y ekseni üzerinde`, `x ekseni üzerinde`, `1. bölgede`, `Orijinde`], correctIndex: 0 },
        { question: `Bir doğrunun eğimi nasıl bulunur?`, options: [`y'deki değişim / x'teki değişim`, `x / y`, `x · y`, `x + y`], correctIndex: 0 },
        { question: `x / 2 = 6 ise x kaçtır?`, options: [`12`, `3`, `8`, `4`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Eşitlik içeren ve bilinmeyenli ifadeye ne denir?`, options: [`Denklem`, `Cebirsel ifade`, `Eşitsizlik`, `Polinom`], correctIndex: 0 },
        { question: `x + 3 = 7 ise x kaçtır?`, options: [`4`, `10`, `3`, `7`], correctIndex: 0 },
        { question: `x − 5 = 2 ise x kaçtır?`, options: [`7`, `−3`, `3`, `10`], correctIndex: 0 },
        { question: `x − 4 = 0 ise x kaçtır?`, options: [`4`, `0`, `−4`, `8`], correctIndex: 0 },
        { question: `2x = 10 ise x kaçtır?`, options: [`5`, `2`, `10`, `20`], correctIndex: 0 },
        { question: `3x = 18 ise x kaçtır?`, options: [`6`, `15`, `54`, `3`], correctIndex: 0 },
        { question: `5x = 30 ise x kaçtır?`, options: [`6`, `5`, `25`, `35`], correctIndex: 0 },
        { question: `x / 2 = 6 ise x kaçtır?`, options: [`12`, `3`, `8`, `4`], correctIndex: 0 },
        { question: `x / 3 = 5 ise x kaçtır?`, options: [`15`, `8`, `2`, `5`], correctIndex: 0 },
        { question: `2x + 3 = 11 ise x kaçtır?`, options: [`4 (2x=8)`, `7`, `5`, `8`], correctIndex: 0 },
        { question: `5x − 4 = 16 ise x kaçtır?`, options: [`4 (5x=20)`, `2,4`, `20`, `3`], correctIndex: 0 },
        { question: `3x + 7 = 22 ise x kaçtır?`, options: [`5 (3x=15)`, `7`, `15`, `25`], correctIndex: 0 },
        { question: `4x − 5 = 15 ise x kaçtır?`, options: [`5 (4x=20)`, `4`, `10`, `15`], correctIndex: 0 },
        { question: `2x − 6 = 0 ise x kaçtır?`, options: [`3`, `6`, `0`, `−3`], correctIndex: 0 },
        { question: `3x + 5 = 2x + 9 ise x kaçtır?`, options: [`4`, `5`, `9`, `2`], correctIndex: 0 },
        { question: `5x − 3 = 3x + 7 ise x kaçtır?`, options: [`5 (2x=10)`, `4`, `10`, `7`], correctIndex: 0 },
        { question: `2(x + 3) = 14 ise x kaçtır?`, options: [`4 (2x+6=14)`, `7`, `10`, `5`], correctIndex: 0 },
        { question: `3(x − 2) = 9 ise x kaçtır?`, options: [`5 (x−2=3)`, `3`, `9`, `11`], correctIndex: 0 },
        { question: `4(x + 1) = 20 ise x kaçtır?`, options: [`4 (x+1=5)`, `5`, `1`, `9`], correctIndex: 0 },
        { question: `x/2 + 3 = 7 ise x kaçtır?`, options: [`8 (x/2=4)`, `4`, `10`, `14`], correctIndex: 0 },
        { question: `(x + 3) / 2 = 5 ise x kaçtır?`, options: [`7 (x+3=10)`, `10`, `3`, `13`], correctIndex: 0 },
        { question: `Koordinat düzleminde (x, y) noktasında x'e ne denir?`, options: [`Apsis`, `Ordinat`, `Eksen`, `Orijin`], correctIndex: 0 },
        { question: `Koordinat düzleminde (x, y) noktasında y'ye ne denir?`, options: [`Ordinat`, `Apsis`, `Eksen`, `Orijin`], correctIndex: 0 },
        { question: `(0, 0) noktasının adı nedir?`, options: [`Orijin`, `Apsis`, `Ordinat`, `Eksen`], correctIndex: 0 },
        { question: `(3, 0) noktası nerede bulunur?`, options: [`x ekseni üzerinde`, `y ekseni üzerinde`, `1. bölgede`, `Orijinde`], correctIndex: 0 },
        { question: `(0, 5) noktası nerede bulunur?`, options: [`y ekseni üzerinde`, `x ekseni üzerinde`, `1. bölgede`, `Orijinde`], correctIndex: 0 },
        { question: `(3, 5) noktası hangi bölgededir?`, options: [`I. bölge (her ikisi de +)`, `II. bölge`, `III. bölge`, `IV. bölge`], correctIndex: 0 },
        { question: `(−2, 4) noktası hangi bölgededir?`, options: [`II. bölge (x−, y+)`, `I. bölge`, `III. bölge`, `IV. bölge`], correctIndex: 0 },
        { question: `(−3, −5) noktası hangi bölgededir?`, options: [`III. bölge (her ikisi de −)`, `I. bölge`, `II. bölge`, `IV. bölge`], correctIndex: 0 },
        { question: `(4, −2) noktası hangi bölgededir?`, options: [`IV. bölge (x+, y−)`, `I. bölge`, `II. bölge`, `III. bölge`], correctIndex: 0 },
        { question: `Doğrusal bir denklem genel olarak nasıl ifade edilir?`, options: [`y = mx + n (veya ax + by + c = 0)`, `y = x²`, `y = √x`, `y = 1/x`], correctIndex: 0 },
        { question: `y = 2x + 1 denkleminde eğim (m) kaçtır?`, options: [`2`, `1`, `−2`, `−1`], correctIndex: 0 },
        { question: `y = 3x − 5 denkleminde y-eksenini kestiği nokta (sabit) kaçtır?`, options: [`−5`, `3`, `5`, `0`], correctIndex: 0 },
        { question: `Doğrunun eğimi nasıl hesaplanır?`, options: [`(y₂ − y₁) / (x₂ − x₁)`, `x / y`, `x · y`, `x + y`], correctIndex: 0 },
        { question: `(1, 2) ve (3, 6) noktalarından geçen doğrunun eğimi kaçtır?`, options: [`2 ((6−2)/(3−1) = 4/2)`, `4`, `1/2`, `0`], correctIndex: 0 },
        { question: `(0, 0) ve (2, 4) noktalarından geçen doğrunun eğimi kaçtır?`, options: [`2 (4/2)`, `4`, `1/2`, `0`], correctIndex: 0 },
        { question: `y = 5 doğrusu nasıldır?`, options: [`x eksenine paralel (eğim 0)`, `y eksenine paralel`, `Orijinden geçer`, `Yatık (eğim 1)`], correctIndex: 0 },
        { question: `x = 3 doğrusu nasıldır?`, options: [`y eksenine paralel`, `x eksenine paralel`, `Orijinden geçer`, `Yatık`], correctIndex: 0 },
        { question: `y = x doğrusunun eğimi kaçtır?`, options: [`1`, `0`, `−1`, `2`], correctIndex: 0 },
        { question: `y = −x doğrusunun eğimi kaçtır?`, options: [`−1`, `1`, `0`, `2`], correctIndex: 0 },
        { question: `y = 2x doğrusu hangi noktadan geçer?`, options: [`Orijin (0,0)`, `(1,1)`, `(2,2)`, `(0,2)`], correctIndex: 0 },
        { question: `Doğrusal denklemde y = 2x + 3 ise x = 1 için y kaçtır?`, options: [`5`, `3`, `2`, `1`], correctIndex: 0 },
        { question: `Doğrusal denklemde y = x − 4 ise x = 7 için y kaçtır?`, options: [`3`, `7`, `11`, `−3`], correctIndex: 0 },
        { question: `İki bilinmeyenli denklem sistemi nedir?`, options: [`Birden fazla denklemin ortak çözümünü arama`, `Tek denklem`, `Tek bilinmeyen`, `Eşitsizlik`], correctIndex: 0 },
        { question: `x + y = 5 ve x = 3 ise y kaçtır?`, options: [`2`, `5`, `3`, `8`], correctIndex: 0 },
        { question: `x − y = 1 ve x = 4 ise y kaçtır?`, options: [`3`, `4`, `5`, `1`], correctIndex: 0 },
        { question: `Bir sayının 3 katının 5 fazlası 20 ise sayı kaçtır?`, options: [`5 (3x+5=20)`, `7`, `8`, `15`], correctIndex: 0 },
        { question: `Bir sayının yarısının 4 eksiği 6 ise sayı kaçtır?`, options: [`20 (x/2−4=6)`, `10`, `5`, `2`], correctIndex: 0 },
        { question: `İki ardışık tam sayının toplamı 25 ise küçük sayı kaçtır?`, options: [`12 (x+x+1=25 → 2x=24)`, `13`, `11`, `14`], correctIndex: 0 },
        { question: `Bir kalemin 5 katı 30 TL ise bir kalem kaç TL'dir?`, options: [`6`, `5`, `25`, `35`], correctIndex: 0 },
      ],
    },
    {
      id: "esitsizlikler",
      name: `Eşitsizlikler`,
      summary: `Birinci dereceden bir bilinmeyenli eşitsizlikler.`,
      youtubeId: "",
      mindMap: {
        center: `Eşitsizlikler`,
        branches: [
          {
            label: `Eşitsizlik Sembolleri`,
            sections: [
              { kind: "tanim", content: `< küçüktür, > büyüktür, ≤ küçük veya eşittir, ≥ büyük veya eşittir.` },
              { kind: "ornek", content: `"x > 3" → x, 3'ten büyük. "x ≤ 5" → x, 5 veya daha küçük. "−2 ≤ x < 6" → x, −2'den büyük veya eşit ve 6'dan küçük (çift eşitsizlik).` },
            ],
          },
          {
            label: `Eşitsizlik Çözme`,
            sections: [
              { kind: "kural", content: `Denklem gibi çözülür; ANCAK negatif bir sayıyla çarpılıp bölününce YÖN DEĞİŞİR (< ↔ >, ≤ ↔ ≥).` },
              { kind: "ornek", content: `Basit: x+2 < 5 → x < 3. Çarpan: 2x > 10 → x > 5. Bileşik: 3x−1 ≤ 8 → 3x ≤ 9 → x ≤ 3 (en büyük tam sayı 3).` },
              { kind: "ornek", content: `Yön değişimi: −x > 2 → x < −2. −2x ≤ 6 → x ≥ −3 (her iki tarafı −2'ye böldük, yön döndü).` },
              { kind: "tuzak", content: `−2x < 6 → x < −3 YANLIŞ; yön değişir, doğrusu x > −3.` },
            ],
          },
          {
            label: `Sayı Doğrusunda Gösterim`,
            sections: [
              { kind: "kural", content: `Sınır değer DAHİL (≤, ≥) → içi DOLU nokta. Sınır değer DEĞİL (<, >) → içi BOŞ nokta.` },
              { kind: "ornek", content: `x ≥ 4 → 4'te içi DOLU nokta, sağ yön. x < 7 → 7'de içi BOŞ nokta, sol yön. 2 < x ≤ 5 → 2'de boş, 5'te dolu; ikisi arası taranır.` },
              { kind: "tuzak", content: `x ≤ 5'te 5 DAHİLDİR; içi DOLU nokta ile gösterilir (boş değil).` },
            ],
          },
          {
            label: `Çözüm Kümesi Yorumlama`,
            sections: [
              { kind: "ipucu", content: `Çözüm kümesinde en büyük/küçük tam sayı sorulursa: x < 7 → en büyük tam 6; x ≤ 7 → en büyük tam 7; x > −3 → en küçük tam −2.` },
              { kind: "ornek", content: `x > 0 → pozitif sayılar (0 dahil değil). x ≥ 0 → 0 dahil tüm pozitifler.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Eşitsizlik sembolleri nelerdir?`, back: `<, >, ≤, ≥.` },
        { front: `Negatif sayıyla bölünce ne olur?`, back: `Eşitsizliğin yönü değişir.` },
        { front: `x ≤ 5 sayı doğrusunda nasıl gösterilir?`, back: `5 dahil; içi dolu nokta.` },
        { front: `x > 0 olan sayılar nelerdir?`, back: `Pozitif sayılar.` },
        { front: `2x > 10 çözümü?`, back: `x > 5.` },
      ],
      article: `# Eşitsizlik Sembolleri
[kural] **<** küçüktür, **>** büyüktür, **≤** küçük veya eşit, **≥** büyük veya eşittir.
[örnek] "x > 3" → x, 3'ten büyüktür.

# Eşitsizlik Çözme
Eşitsizlikler tıpkı denklemler gibi çözülür.
[kural] **ÇOK ÖNEMLİ:** Eşitsizlik negatif bir sayıyla çarpılır veya bölünürse **yön değişir**.
[örnek] −2x ≤ 6 → x **≥** −3 (yön döndü).
[tuzak] −2x < 6 → x < −3 **YANLIŞTIR**. Doğrusu x **> −3**.

# Sayı Doğrusunda Gösterim
[kural] Sınır dahilse (**≤, ≥**) içi **dolu** nokta; dahil değilse (**<, >**) içi **boş** nokta kullanılır.
[tuzak] x ≤ 5'te 5 dahildir; içi **dolu** nokta ile gösterilir.
[soru] "3x − 1 ≤ 8 ise en büyük tam sayı?" → 3x ≤ 9 → x ≤ 3 → cevap **3**.`,
      tips: [
        { trap: `Negatifle bölünce yön değişmez sanılır.`, wrong: `−2x < 6 → x < −3.`, correct: `Negatif sayıyla bölününce yön DEĞİŞİR: −2x < 6 → x > −3.` },
        { trap: `Dolu/boş nokta karıştırılır.`, wrong: `x ≤ 5 için sayı doğrusunda 5 içi boş gösterilir.`, correct: `≤ olduğundan 5 dahildir; içi DOLU nokta ile gösterilir.` },
      ],
      quiz: [
        { question: `x + 2 < 5 eşitsizliğinin çözümü hangisidir?`, options: [`x < 3`, `x > 3`, `x < 7`, `x > 7`], correctIndex: 0 },
        { question: `2x > 10 eşitsizliğinin çözümü hangisidir?`, options: [`x > 5`, `x < 5`, `x > 20`, `x > 8`], correctIndex: 0 },
        { question: `−x > 2 eşitsizliğinin çözümü hangisidir?`, options: [`x < −2`, `x > −2`, `x > 2`, `x < 2`], correctIndex: 0, explanation: `Negatifle çarpınca yön değişir.` },
        { question: `x ≥ 4 ifadesi sayı doğrusunda nasıl gösterilir?`, options: [`4 içi dolu, sağ yön`, `4 içi boş, sağ yön`, `4 içi dolu, sol yön`, `4 içi boş, sol yön`], correctIndex: 0 },
        { question: `3x − 1 ≤ 8 ise x'in alabileceği en büyük tam sayı kaçtır?`, options: [`3`, `2`, `4`, `9`], correctIndex: 0, explanation: `3x≤9, x≤3.` },
        { question: `−2x ≤ 6 eşitsizliğinin çözümü hangisidir?`, options: [`x ≥ −3`, `x ≤ −3`, `x ≥ 3`, `x ≤ 3`], correctIndex: 0, explanation: `Negatifle bölününce yön değişir.` },
        { question: `"x, 5'ten küçük veya 5'e eşittir" ifadesi nasıl yazılır?`, options: [`x ≤ 5`, `x < 5`, `x ≥ 5`, `x > 5`], correctIndex: 0 },
        { question: `x > 0 olan x değerleri nasıl sayılardır?`, options: [`Pozitif sayılar`, `Negatif sayılar`, `Sıfır`, `Tam kareler`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Eşitsizlik nedir?`, options: [`İki ifadenin "<, >, ≤, ≥" işaretlerinden biriyle karşılaştırılması`, `Eşitlik`, `Toplam`, `Çarpım`], correctIndex: 0 },
        { question: `">" işaretinin anlamı nedir?`, options: [`Büyüktür`, `Küçüktür`, `Eşittir`, `Büyük eşittir`], correctIndex: 0 },
        { question: `"<" işaretinin anlamı nedir?`, options: [`Küçüktür`, `Büyüktür`, `Eşittir`, `Büyük eşittir`], correctIndex: 0 },
        { question: `"≥" işaretinin anlamı nedir?`, options: [`Büyük eşittir`, `Küçüktür`, `Büyüktür`, `Küçük eşittir`], correctIndex: 0 },
        { question: `"≤" işaretinin anlamı nedir?`, options: [`Küçük eşittir`, `Büyük eşittir`, `Büyüktür`, `Küçüktür`], correctIndex: 0 },
        { question: `x + 3 > 5 eşitsizliğinin çözüm kümesi nedir?`, options: [`x > 2`, `x > 5`, `x < 2`, `x < 5`], correctIndex: 0 },
        { question: `x − 4 < 2 eşitsizliğinin çözüm kümesi nedir?`, options: [`x < 6`, `x > 6`, `x < 2`, `x > 2`], correctIndex: 0 },
        { question: `2x > 10 eşitsizliğinin çözümü nedir?`, options: [`x > 5`, `x < 5`, `x > 20`, `x > 8`], correctIndex: 0 },
        { question: `3x ≤ 15 eşitsizliğinin çözümü nedir?`, options: [`x ≤ 5`, `x ≥ 5`, `x ≤ 18`, `x ≤ 12`], correctIndex: 0 },
        { question: `5x − 3 ≥ 12 eşitsizliğinin çözümü nedir?`, options: [`x ≥ 3 (5x≥15)`, `x ≥ 15`, `x ≤ 3`, `x ≥ 9`], correctIndex: 0 },
        { question: `2x + 3 < 11 eşitsizliğinin çözümü nedir?`, options: [`x < 4 (2x<8)`, `x < 7`, `x < 11`, `x > 4`], correctIndex: 0 },
        { question: `−x > 5 eşitsizliğinin çözümü nedir?`, options: [`x < −5 (negatifle çarpınca yön değişir)`, `x > −5`, `x > 5`, `x < 5`], correctIndex: 0 },
        { question: `−x ≥ 3 eşitsizliğinin çözümü nedir?`, options: [`x ≤ −3 (negatifle çarpma yön değiştirir)`, `x ≥ −3`, `x ≥ 3`, `x ≤ 3`], correctIndex: 0 },
        { question: `−2x > 8 eşitsizliğinin çözümü nedir?`, options: [`x < −4 (negatife bölüm yön değiştirir)`, `x > −4`, `x > 4`, `x < 4`], correctIndex: 0 },
        { question: `−2x ≤ 6 eşitsizliğinin çözümü nedir?`, options: [`x ≥ −3 (negatife bölüm yön değiştirir)`, `x ≤ −3`, `x ≥ 3`, `x ≤ 3`], correctIndex: 0 },
        { question: `−3x < 9 eşitsizliğinin çözümü nedir?`, options: [`x > −3 (negatife bölüm yön değiştirir)`, `x < −3`, `x > 3`, `x < 3`], correctIndex: 0 },
        { question: `Eşitsizlikte yön değiştiren işlem hangisidir?`, options: [`Negatif sayıyla çarpma veya bölme`, `Pozitifle çarpma`, `Toplama`, `Çıkarma`], correctIndex: 0 },
        { question: `Eşitsizliğin her iki tarafına aynı sayı eklenirse yön değişir mi?`, options: [`Değişmez`, `Değişir`, `Bilinmez`, `Bazen değişir`], correctIndex: 0 },
        { question: `Eşitsizliğin her iki tarafı aynı pozitif sayıyla çarpılırsa yön değişir mi?`, options: [`Değişmez`, `Değişir`, `Bilinmez`, `Bazen değişir`], correctIndex: 0 },
        { question: `x ≥ 4 ifadesi sayı doğrusunda nasıl gösterilir?`, options: [`4'te içi dolu nokta, sağ yön ok`, `4'te içi boş nokta, sağ yön`, `4'te içi dolu, sol yön`, `4'te içi boş, sol yön`], correctIndex: 0 },
        { question: `x > 4 ifadesi sayı doğrusunda nasıl gösterilir?`, options: [`4'te içi boş nokta, sağ yön`, `4'te içi dolu nokta, sağ yön`, `4'te içi dolu, sol yön`, `4'te içi boş, sol yön`], correctIndex: 0 },
        { question: `x ≤ −2 ifadesi sayı doğrusunda nasıl gösterilir?`, options: [`−2'de içi dolu nokta, sol yön`, `−2'de içi boş, sol yön`, `−2'de içi dolu, sağ yön`, `−2'de içi boş, sağ yön`], correctIndex: 0 },
        { question: `x < 3 ifadesi sayı doğrusunda nasıl gösterilir?`, options: [`3'te içi boş nokta, sol yön`, `3'te içi dolu, sol yön`, `3'te içi boş, sağ yön`, `3'te içi dolu, sağ yön`], correctIndex: 0 },
        { question: `Tam sayılarda x ≤ 5 ise x'in alabileceği en büyük değer kaçtır?`, options: [`5`, `4`, `6`, `Sınırsız`], correctIndex: 0 },
        { question: `Doğal sayılarda x < 5 ise x'in alabileceği en büyük değer kaçtır?`, options: [`4`, `5`, `6`, `Sınırsız`], correctIndex: 0 },
        { question: `Doğal sayılarda x ≤ 0 ise x'in tek değeri kaçtır?`, options: [`0`, `1`, `−1`, `Boş küme`], correctIndex: 0 },
        { question: `Tam sayılarda x > 2 ve x < 6 ise x kaç farklı değer alabilir?`, options: [`3 (3, 4, 5)`, `4`, `2`, `5`], correctIndex: 0 },
        { question: `Tam sayılarda 0 ≤ x ≤ 3 ise x kaç farklı değer alabilir?`, options: [`4 (0, 1, 2, 3)`, `3`, `5`, `2`], correctIndex: 0 },
        { question: `"x, 7'den büyük" ifadesi nasıl yazılır?`, options: [`x > 7`, `x < 7`, `x ≥ 7`, `x ≤ 7`], correctIndex: 0 },
        { question: `"x, 5'ten küçük veya 5'e eşit" ifadesi nasıl yazılır?`, options: [`x ≤ 5`, `x < 5`, `x ≥ 5`, `x > 5`], correctIndex: 0 },
        { question: `"x, en az 10'dur" ifadesi nasıl yazılır?`, options: [`x ≥ 10`, `x > 10`, `x ≤ 10`, `x < 10`], correctIndex: 0 },
        { question: `"x, en fazla 8'dir" ifadesi nasıl yazılır?`, options: [`x ≤ 8`, `x < 8`, `x ≥ 8`, `x > 8`], correctIndex: 0 },
        { question: `Bir oyuncağın fiyatı en fazla 50 TL ise nasıl yazılır?`, options: [`x ≤ 50`, `x < 50`, `x ≥ 50`, `x > 50`], correctIndex: 0 },
        { question: `Hastanın ateşi 38 °C'den yüksek ise nasıl yazılır?`, options: [`x > 38`, `x ≥ 38`, `x < 38`, `x ≤ 38`], correctIndex: 0 },
        { question: `2x + 1 > 9 eşitsizliğinin çözümü nedir?`, options: [`x > 4`, `x > 5`, `x < 4`, `x ≥ 4`], correctIndex: 0 },
        { question: `4x − 2 ≤ 10 eşitsizliğinin çözümü nedir?`, options: [`x ≤ 3 (4x≤12)`, `x ≥ 3`, `x ≤ 8`, `x ≤ 4`], correctIndex: 0 },
        { question: `3x + 4 > x + 10 eşitsizliğinin çözümü nedir?`, options: [`x > 3 (2x>6)`, `x > 6`, `x < 3`, `x > 10`], correctIndex: 0 },
        { question: `5 − 2x > 1 eşitsizliğinin çözümü nedir?`, options: [`x < 2 (−2x>−4)`, `x > 2`, `x < 4`, `x > 4`], correctIndex: 0 },
        { question: `8 − x ≤ 3 eşitsizliğinin çözümü nedir?`, options: [`x ≥ 5`, `x ≤ 5`, `x ≥ 11`, `x ≤ 11`], correctIndex: 0 },
        { question: `x'in 3 katı 12'den büyükse x ne olabilir?`, options: [`x > 4`, `x > 9`, `x < 4`, `x > 12`], correctIndex: 0 },
        { question: `x sayısının 5 fazlası en az 12'dir ifadesi?`, options: [`x + 5 ≥ 12 → x ≥ 7`, `x + 5 > 12`, `x − 5 ≥ 12`, `x − 5 < 12`], correctIndex: 0 },
        { question: `Bir sayının 2 katı 16'dan azdır ifadesi?`, options: [`2x < 16 → x < 8`, `2x > 16`, `x/2 < 16`, `x + 2 < 16`], correctIndex: 0 },
        { question: `2x − 5 ≥ x + 1 eşitsizliğinin çözümü nedir?`, options: [`x ≥ 6`, `x ≤ 6`, `x ≥ 5`, `x ≥ 4`], correctIndex: 0 },
        { question: `Eşitsizlik mutlaka çözüme sahip midir?`, options: [`Hayır, boş küme olabilir`, `Evet`, `Bilinmez`, `Her zaman tek`], correctIndex: 0 },
        { question: `x > 5 ve x < 3 birlikte sağlanabilir mi?`, options: [`Hayır (boş küme)`, `Evet`, `Sadece tam sayılarda`, `Bilinmez`], correctIndex: 0 },
        { question: `Eşitsizliğin grafiği genelde hangidir?`, options: [`Sayı doğrusunda gösterim`, `Koordinat grafiği`, `Histogram`, `Sütun`], correctIndex: 0 },
        { question: `Sayı doğrusunda −3 < x ≤ 2 nasıl gösterilir?`, options: [`−3 boş ile başlar, 2 dolu ile biter`, `−3 dolu, 2 boş`, `İkisi de dolu`, `İkisi de boş`], correctIndex: 0 },
        { question: `Doğal sayılarda x < 0 koşulunu sağlayan kaç sayı vardır?`, options: [`0 (doğal sayılar negatif değildir)`, `Sonsuz`, `1`, `2`], correctIndex: 0 },
        { question: `x ≤ 5 ve x ≥ 0 (doğal sayı) ise x kaç farklı değer alabilir?`, options: [`6 (0,1,2,3,4,5)`, `5`, `7`, `Sınırsız`], correctIndex: 0 },
        { question: `Bir kafe en fazla 30 kişi alır ifadesi nasıl yazılır?`, options: [`x ≤ 30`, `x ≥ 30`, `x > 30`, `x < 30`], correctIndex: 0 },
      ],
    },
    {
      id: "ucgenler",
      name: `Üçgenler`,
      summary: `Açılar, kenar bağıntıları ve Pisagor.`,
      youtubeId: "",
      mindMap: {
        center: `Üçgenler`,
        branches: [
          {
            label: `Açı Özellikleri`,
            sections: [
              { kind: "kural", content: `İç açılar toplamı 180°. Dış açı = komşu olmayan iki iç açının toplamı.` },
              { kind: "ornek", content: `İki açı 50° ve 60° ise üçüncüsü 180−110 = 70°.` },
              { kind: "tuzak", content: `İç açılar toplamı 360° DEĞİL, 180°'dir.` },
            ],
          },
          {
            label: `Kenar-Açı İlişkisi`,
            sections: [
              { kind: "kural", content: `En büyük açının karşısında en uzun kenar, en küçük açının karşısında en kısa kenar bulunur.` },
            ],
          },
          {
            label: `Üçgen Eşitsizliği`,
            sections: [
              { kind: "formul", content: `|a − b| < üçüncü kenar < a + b` },
              { kind: "ornek", content: `Kenarlar 5 ve 9 → 4 < x < 14.` },
            ],
          },
          {
            label: `Dik Üçgen ve Pisagor`,
            sections: [
              { kind: "formul", content: `a² + b² = c² (c = hipotenüs, en uzun kenar).` },
              { kind: "ornek", content: `Sık karşılaşılan Pisagor üçlüleri: 3-4-5, 5-12-13, 6-8-10, 8-15-17, 9-12-15.` },
              { kind: "ornek", content: `Dik kenarlar 6 ve 8 → hipotenüs √(36+64) = √100 = 10.` },
              { kind: "tuzak", content: `Hipotenüs EN UZUN kenardır ve dik açının KARŞISINDADIR; dik kenarlardan biri değildir.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Üçgenin iç açıları toplamı kaçtır?`, back: `180°.` },
        { front: `Pisagor bağıntısı nedir?`, back: `Dik üçgende a²+b²=c² (c hipotenüs).` },
        { front: `3 ve 4 dik kenarlı dik üçgenin hipotenüsü?`, back: `5 (√(9+16)=√25).` },
        { front: `Üçgen eşitsizliği nedir?`, back: `Bir kenar, diğer ikisinin farkından büyük, toplamından küçüktür.` },
        { front: `Eşkenar üçgenin her açısı kaç derecedir?`, back: `60°.` },
      ],
      article: `# Açı Özellikleri
[kural] Bir üçgenin iç açıları toplamı **180°**'dir. Bir dış açı, komşu olmayan iki iç açının **toplamına** eşittir.
[örnek] İki açısı 50° ve 60° olan üçgenin üçüncü açısı: 180 − 110 = **70°**.
[tuzak] İç açılar toplamı 360° **değildir** (360° dörtgenlerde geçerlidir).

# Kenar-Açı İlişkisi ve Üçgen Eşitsizliği
[kural] En **büyük açının** karşısında en **uzun kenar** bulunur.
[formül] Üçgen eşitsizliği: **|a − b| < üçüncü kenar < a + b**
[örnek] Kenarları 5 ve 9 olan üçgende üçüncü kenar **4 ile 14 arasında** olabilir.

# Dik Üçgen ve Pisagor Bağıntısı
[formül] Dik üçgende **a² + b² = c²** (c = hipotenüs, en uzun kenar).
[örnek] Dik kenarları 3 ve 4 → hipotenüs √(9+16) = √25 = **5**. Ayrıca 6-8-**10**.
[tuzak] Hipotenüs **en uzun** kenardır ve **dik açının karşısındadır**; dik kenarlardan biri değildir.`,
      tips: [
        { trap: `İç açılar toplamı 360° sanılır.`, wrong: `Üçgenin iç açıları toplamı 360°'dir.`, correct: `Üçgenin iç açıları toplamı 180°'dir (360° dörtgenlerde geçerlidir).` },
        { trap: `Pisagor'da hipotenüs karıştırılır.`, wrong: `Pisagor'da dik kenarlardan biri en uzun kenardır.`, correct: `Hipotenüs en uzun kenardır ve dik açının karşısındadır: a²+b²=c².` },
      ],
      quiz: [
        { question: `Bir üçgenin iç açıları toplamı kaç derecedir?`, options: [`90°`, `180°`, `270°`, `360°`], correctIndex: 1 },
        { question: `İki açısı 50° ve 60° olan bir üçgenin üçüncü açısı kaç derecedir?`, options: [`70°`, `80°`, `60°`, `110°`], correctIndex: 0, explanation: `180−(50+60)=70.` },
        { question: `Dik kenarları 3 ve 4 olan dik üçgenin hipotenüsü kaçtır?`, options: [`5`, `7`, `25`, `6`], correctIndex: 0, explanation: `√(3²+4²)=√25=5.` },
        { question: `Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaçtır?`, options: [`10`, `14`, `48`, `100`], correctIndex: 0, explanation: `√(36+64)=√100=10.` },
        { question: `İki kenarı 5 ve 9 olan üçgenin üçüncü kenarı hangi aralıkta olabilir?`, options: [`4 ile 14 arasında`, `5 ile 9 arasında`, `0 ile 14 arasında`, `14'ten büyük`], correctIndex: 0, explanation: `9−5 < x < 9+5.` },
        { question: `Bir üçgende en uzun kenarın karşısında ne bulunur?`, options: [`En büyük açı`, `En küçük açı`, `Dik açı`, `Eşit açı`], correctIndex: 0 },
        { question: `Eşkenar üçgenin her bir iç açısı kaç derecedir?`, options: [`60°`, `90°`, `45°`, `180°`], correctIndex: 0, explanation: `180/3=60.` },
        { question: `Bir üçgenin dış açısı, komşu olmayan iki iç açının nesine eşittir?`, options: [`Toplamına`, `Farkına`, `Çarpımına`, `Yarısına`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Bir üçgenin iç açıları toplamı kaç derecedir?`, options: [`180°`, `90°`, `270°`, `360°`], correctIndex: 0 },
        { question: `Bir üçgenin dış açıları toplamı kaç derecedir?`, options: [`360°`, `180°`, `270°`, `90°`], correctIndex: 0 },
        { question: `Açıları 50°, 60° olan üçgenin üçüncü açısı kaç derecedir?`, options: [`70°`, `80°`, `60°`, `110°`], correctIndex: 0 },
        { question: `Açıları 40°, 70° olan üçgenin üçüncü açısı kaç derecedir?`, options: [`70°`, `80°`, `110°`, `100°`], correctIndex: 0 },
        { question: `Açıları 30°, 90° olan üçgenin üçüncü açısı kaç derecedir?`, options: [`60°`, `30°`, `120°`, `90°`], correctIndex: 0 },
        { question: `Eşkenar üçgenin tüm açıları kaçar derecedir?`, options: [`60°`, `90°`, `45°`, `180°`], correctIndex: 0 },
        { question: `Eşkenar üçgenin tüm kenarları nasıldır?`, options: [`Eşittir`, `Farklıdır`, `İkişer eşittir`, `Bir tanesi farklıdır`], correctIndex: 0 },
        { question: `İkizkenar üçgenin tabanına ait açılar nasıldır?`, options: [`Eşittir`, `Farklıdır`, `Toplam 180°`, `Toplam 90°`], correctIndex: 0 },
        { question: `Bir ikizkenar üçgenin tepe açısı 80° ise taban açıları kaç derecedir?`, options: [`50° (her biri)`, `40°`, `100°`, `80°`], correctIndex: 0 },
        { question: `Bir ikizkenar üçgenin taban açısı 70° ise tepe açısı kaç derecedir?`, options: [`40° (180−70−70)`, `70°`, `110°`, `100°`], correctIndex: 0 },
        { question: `Dik üçgende bir açı kaç derecedir?`, options: [`90°`, `60°`, `45°`, `180°`], correctIndex: 0 },
        { question: `Dik üçgende dik açının karşısındaki kenar adı nedir?`, options: [`Hipotenüs`, `Dik kenar`, `Yükseklik`, `Açıortay`], correctIndex: 0 },
        { question: `Dik üçgenin diğer iki açısının toplamı kaç derecedir?`, options: [`90°`, `180°`, `60°`, `120°`], correctIndex: 0 },
        { question: `Pisagor Teoremi nedir?`, options: [`Dik üçgende a² + b² = c² (c=hipotenüs)`, `a + b = c`, `a · b = c`, `a − b = c`], correctIndex: 0 },
        { question: `Dik kenarları 3 ve 4 olan dik üçgenin hipotenüsü kaçtır?`, options: [`5`, `7`, `25`, `6`], correctIndex: 0 },
        { question: `Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaçtır?`, options: [`10`, `14`, `48`, `100`], correctIndex: 0 },
        { question: `Dik kenarları 5 ve 12 olan dik üçgenin hipotenüsü kaçtır?`, options: [`13`, `17`, `60`, `25`], correctIndex: 0 },
        { question: `Dik kenarları 8 ve 15 olan dik üçgenin hipotenüsü kaçtır?`, options: [`17`, `23`, `120`, `13`], correctIndex: 0 },
        { question: `Hipotenüsü 10, bir dik kenarı 6 olan dik üçgenin diğer dik kenarı kaçtır?`, options: [`8 (√(100−36)=8)`, `4`, `16`, `64`], correctIndex: 0 },
        { question: `Hipotenüsü 13, bir dik kenarı 5 olan dik üçgenin diğer dik kenarı kaçtır?`, options: [`12`, `8`, `18`, `12.5`], correctIndex: 0 },
        { question: `Bir merdiven duvara dayandığında merdivenin tabanı 6 m, duvara değdiği yükseklik 8 m ise merdiven kaç metredir?`, options: [`10 (√(36+64))`, `14`, `48`, `100`], correctIndex: 0 },
        { question: `İki üçgenin "eş" olması ne demektir?`, options: [`Karşılıklı tüm kenarları ve açıları eşittir`, `Sadece bir kenarı eşittir`, `Sadece bir açısı eşittir`, `Boyutları orantılıdır`], correctIndex: 0 },
        { question: `Üçgenin kenar uzunlukları için: |a−b| < c < a+b kuralı neye denir?`, options: [`Üçgen eşitsizliği`, `Pisagor teoremi`, `Açıortay teoremi`, `Yükseklik teoremi`], correctIndex: 0 },
        { question: `İki kenarı 5 ve 9 olan üçgenin üçüncü kenarı hangi aralıkta olabilir?`, options: [`4 ile 14 arasında`, `5 ile 9 arasında`, `0 ile 14 arasında`, `14'ten büyük`], correctIndex: 0 },
        { question: `İki kenarı 3 ve 7 olan üçgenin üçüncü kenarı hangi aralıkta olabilir?`, options: [`4 ile 10 arasında`, `3 ile 7 arasında`, `0 ile 10 arasında`, `10'dan büyük`], correctIndex: 0 },
        { question: `Bir üçgende en büyük açının karşısında ne bulunur?`, options: [`En uzun kenar`, `En kısa kenar`, `Dik açı`, `Eşit kenar`], correctIndex: 0 },
        { question: `Bir üçgende en küçük açının karşısında ne bulunur?`, options: [`En kısa kenar`, `En uzun kenar`, `Dik açı`, `Eşit kenar`], correctIndex: 0 },
        { question: `Bir üçgenin alanı (taban × yükseklik) / kaça eşittir?`, options: [`2`, `3`, `4`, `1`], correctIndex: 0 },
        { question: `Tabanı 6, yüksekliği 4 olan bir üçgenin alanı kaçtır?`, options: [`12 ((6·4)/2)`, `24`, `10`, `48`], correctIndex: 0 },
        { question: `Tabanı 10, yüksekliği 8 olan bir üçgenin alanı kaçtır?`, options: [`40`, `80`, `18`, `20`], correctIndex: 0 },
        { question: `İki üçgenin "benzer" olması için aşağıdakilerden hangisi gereklidir?`, options: [`Karşılıklı açılar eşit, karşılıklı kenarlar orantılı`, `Tüm kenarlar eşit`, `Sadece bir açı eşit`, `Hiçbir koşul`], correctIndex: 0 },
        { question: `Benzer iki üçgenden birinin bir kenarı 4 cm, diğerinin karşılık gelen kenarı 12 cm ise benzerlik oranı kaçtır?`, options: [`1/3 (4:12)`, `4`, `12`, `3`], correctIndex: 0 },
        { question: `Eş iki üçgenin alanları nasıldır?`, options: [`Eşittir`, `Farklıdır`, `Bir kat`, `Çift kat`], correctIndex: 0 },
        { question: `Bir üçgenin tabanı 8 cm, yüksekliği 5 cm ise alanı kaçtır?`, options: [`20 cm² ((8·5)/2)`, `40 cm²`, `13 cm²`, `80 cm²`], correctIndex: 0 },
        { question: `Bir dış açı, komşu olmayan iki iç açının nesine eşittir?`, options: [`Toplamına`, `Farkına`, `Çarpımına`, `Yarısına`], correctIndex: 0 },
        { question: `Bir üçgende iç açılardan biri 90°, diğeri 30° ise üçüncüsü kaç derecedir?`, options: [`60°`, `90°`, `120°`, `30°`], correctIndex: 0 },
        { question: `Bir üçgenin iç açıları 1:2:3 oranındaysa açıları nelerdir?`, options: [`30°, 60°, 90°`, `45°, 90°, 45°`, `60°, 60°, 60°`, `90°, 45°, 45°`], correctIndex: 0 },
        { question: `Eşkenar üçgenin tüm dış açıları kaçar derecedir?`, options: [`120°`, `60°`, `90°`, `180°`], correctIndex: 0 },
        { question: `Bir üçgende kenarlar 3, 4 ve 5 birim ise hangi üçgen türüdür?`, options: [`Dik üçgen (3²+4²=5²)`, `Eşkenar`, `İkizkenar`, `Geniş açılı`], correctIndex: 0 },
        { question: `Benzerlik oranı 1:2 olan iki üçgenin alanları oranı nedir?`, options: [`1:4 (oranın karesi)`, `1:2`, `1:8`, `2:1`], correctIndex: 0 },
        { question: `Bir üçgenin alanı: 3 köşesi (0,0), (4,0), (0,3) olan üçgen?`, options: [`6 ((4·3)/2)`, `12`, `3.5`, `7`], correctIndex: 0 },
        { question: `Üçgenin köşegeni var mıdır?`, options: [`Hayır (sadece kenar)`, `Evet`, `İki tane`, `Üç tane`], correctIndex: 0 },
        { question: `Üçgenin yükseklikleri kaç tanedir?`, options: [`3 (her kenara karşılık)`, `1`, `2`, `4`], correctIndex: 0 },
        { question: `Aşağıdaki kenar üçlülerinden hangisi bir üçgen oluşturamaz?`, options: [`2, 3, 7 (2+3=5 < 7)`, `3, 4, 5`, `5, 6, 9`, `4, 5, 6`], correctIndex: 0 },
        { question: `Bir üçgenin iki kenarı 5 ve 11 ise üçüncü kenar kaç olamaz?`, options: [`16 (5+11=16'ya eşit, küçük olmalı)`, `7`, `10`, `13`], correctIndex: 0 },
        { question: `Tabanı 12, yüksekliği 5 olan bir üçgenin alanı kaç birim karedir?`, options: [`30 ((12·5)/2)`, `60`, `17`, `120`], correctIndex: 0 },
        { question: `Eşkenar üçgenin tüm kenarlarına ait yükseklikler nasıldır?`, options: [`Eşittir`, `Farklıdır`, `Birbiri ile orantılıdır`, `Sıfırdır`], correctIndex: 0 },
        { question: `Üçgenler kenar uzunluklarına göre kaç çeşittir?`, options: [`3 (Eşkenar, ikizkenar, çeşitkenar)`, `2`, `4`, `1`], correctIndex: 0 },
        { question: `Üçgenler açılarına göre kaç çeşittir?`, options: [`3 (Dar açılı, dik, geniş açılı)`, `2`, `4`, `1`], correctIndex: 0 },
        { question: `Bir üçgenin iki kenarı eşitse o üçgen ne tür üçgendir?`, options: [`İkizkenar`, `Eşkenar`, `Dik`, `Geniş açılı`], correctIndex: 0 },
      ],
    },
    {
      id: "donusum-geometrisi",
      name: `Dönüşüm Geometrisi`,
      summary: `Öteleme, yansıma ve döndürme.`,
      youtubeId: "",
      mindMap: {
        center: `Dönüşüm Geometrisi`,
        branches: [
          {
            label: `Öteleme`,
            sections: [
              { kind: "tanim", content: `Şekli biçim/boyut değiştirmeden belirli bir yönde kaydırmaktır.` },
              { kind: "kural", content: `Koordinat kuralı: (x, y) noktası "sağa a, yukarı b" ötelenirse → (x+a, y+b) olur.` },
              { kind: "ornek", content: `(3, 2) noktası "4 birim sağa, 1 birim aşağı" ötelenirse → (3+4, 2−1) = (7, 1). Üçgenin tüm köşeleri aynı şekilde kaydırılır.` },
            ],
          },
          {
            label: `Yansıma (Simetri)`,
            sections: [
              { kind: "tanim", content: `Bir doğruya (eksene) göre ters görüntü oluşturmaktır; aynadaki görüntü gibi.` },
              { kind: "kural", content: `x eksenine göre: (x, y) → (x, −y). y eksenine göre: (x, y) → (−x, y). Orijine göre: (x, y) → (−x, −y).` },
              { kind: "ornek", content: `(3, 4) noktası: x eksenine yansıma → (3, −4); y eksenine yansıma → (−3, 4); orijine → (−3, −4).` },
              { kind: "tuzak", content: `Aynadaki görüntü öteleme DEĞİL, yansımadır.` },
            ],
          },
          {
            label: `Döndürme`,
            sections: [
              { kind: "tanim", content: `Bir nokta etrafında (genelde orijinde) belirli bir açıyla çevirmektir.` },
              { kind: "kural", content: `Orijin etrafında: 90° saat yönünün tersi (x, y) → (−y, x). 180° dönme → (−x, −y). 270° (veya −90°) → (y, −x).` },
              { kind: "ornek", content: `(3, 2) noktası orijin etrafında: 90° dönme → (−2, 3); 180° → (−3, −2); 270° → (2, −3).` },
            ],
          },
          {
            label: `Önemli Not (Eşlik)`,
            sections: [
              { kind: "kural", content: `Üç dönüşümde de şekil EŞ kalır; boyut, biçim, açılar ve kenar uzunlukları değişmez. Sadece konum/yön değişir.` },
              { kind: "tuzak", content: `Büyütme/küçültme bir dönüşüm türü DEĞİLDİR (bunlar benzerlik konusudur).` },
            ],
          },
        ],
      },
      cards: [
        { front: `Öteleme nedir?`, back: `Şekli biçim/boyut değiştirmeden bir yönde kaydırmaktır.` },
        { front: `Yansıma nedir?`, back: `Bir doğruya (eksene) göre simetrik görüntü oluşturmaktır.` },
        { front: `Döndürme nedir?`, back: `Bir nokta etrafında belirli açıyla çevirmektir.` },
        { front: `Dönüşümlerde boyut değişir mi?`, back: `Hayır; şekil eş kalır (boyut ve biçim aynı).` },
        { front: `Aynadaki görüntü hangi dönüşümdür?`, back: `Yansıma.` },
      ],
      article: `# Öteleme, Yansıma ve Döndürme
- **Öteleme:** Şekli biçimini/boyutunu değiştirmeden belirli bir yönde **kaydırma**.
- **Yansıma (Simetri):** Bir **doğruya (eksene)** göre ters görüntü; **aynadaki görüntü** gibi.
- **Döndürme:** Bir **nokta** etrafında belirli bir **açıyla** çevirme.
[tuzak] Aynadaki görüntü öteleme değil, **yansımadır**.

# Önemli Özellik
[kural] Öteleme, yansıma ve döndürmede şeklin **boyutu ve biçimi değişmez**; yalnız konumu veya yönü değişir. Oluşan yeni şekil ilk şekille **eştir**.
[soru] "Dönüşüm sonucu şekil büyür mü?" → Hayır, eş kalır.`,
      tips: [
        { trap: `Dönüşümlerde boyut değişir sanılır.`, wrong: `Öteleme yapılınca şekil büyür.`, correct: `Öteleme, yansıma ve döndürmede şeklin boyutu değişmez; şekil eş kalır.` },
        { trap: `Yansıma ile öteleme karıştırılır.`, wrong: `Aynadaki görüntü ötelemedir.`, correct: `Aynadaki görüntü yansımadır (bir eksene göre simetri).` },
      ],
      quiz: [
        { question: `Bir şeklin biçim ve boyutunu değiştirmeden bir yönde kaydırılmasına ne denir?`, options: [`Öteleme`, `Yansıma`, `Döndürme`, `Büyütme`], correctIndex: 0 },
        { question: `Aynadaki görüntü hangi dönüşüme örnektir?`, options: [`Yansıma`, `Öteleme`, `Döndürme`, `Benzerlik`], correctIndex: 0 },
        { question: `Bir nokta etrafında belirli bir açıyla çevirmeye ne denir?`, options: [`Döndürme`, `Öteleme`, `Yansıma`, `Kaydırma`], correctIndex: 0 },
        { question: `Öteleme, yansıma ve döndürme sonucunda şeklin boyutu nasıl değişir?`, options: [`Değişmez`, `Büyür`, `Küçülür`, `İkiye katlanır`], correctIndex: 0 },
        { question: `Yansımada şekil neye göre simetrik olur?`, options: [`Bir doğruya (eksene)`, `Bir noktaya`, `Hiçbir şeye`, `Kendi alanına`], correctIndex: 0 },
        { question: `Saat yönünde 90° çevrilen bir şekil hangi dönüşüme uğramıştır?`, options: [`Döndürme`, `Öteleme`, `Yansıma`, `Büyütme`], correctIndex: 0 },
        { question: `Bir dönüşüm sonucu oluşan şekil ile ilk şekil birbirine göre nasıldır?`, options: [`Eştir`, `Daha büyüktür`, `Daha küçüktür`, `Benzer ama farklı boyuttadır`], correctIndex: 0 },
        { question: `Bir şekli 5 birim sağa kaydırmak hangi dönüşümdür?`, options: [`Öteleme`, `Yansıma`, `Döndürme`, `Simetri`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Bir şeklin yön değiştirmeden belli bir yöne kaydırılmasına ne denir?`, options: [`Öteleme`, `Yansıma`, `Döndürme`, `Büyütme`], correctIndex: 0 },
        { question: `Bir şekli bir doğruya göre simetrik almaya ne denir?`, options: [`Yansıma`, `Öteleme`, `Döndürme`, `Büyütme`], correctIndex: 0 },
        { question: `Bir noktada belirli bir açıyla çevirmeye ne denir?`, options: [`Döndürme`, `Öteleme`, `Yansıma`, `Büyütme`], correctIndex: 0 },
        { question: `Dönüşüm geometrisinde şeklin boyutu değişir mi?`, options: [`Değişmez`, `Büyür`, `Küçülür`, `Bilinmez`], correctIndex: 0 },
        { question: `Öteleme sonucunda şekil ile orijinal şekil arasındaki ilişki nedir?`, options: [`Eştir`, `Benzer`, `Farklıdır`, `Yarısıdır`], correctIndex: 0 },
        { question: `Yansıma sonucu oluşan şekil ile orijinal şekil nasıldır?`, options: [`Eştir (boyut aynı)`, `Daha büyüktür`, `Daha küçüktür`, `Karışıktır`], correctIndex: 0 },
        { question: `(3, 4) noktası x ekseninde simetriği hangi noktadır?`, options: [`(3, −4)`, `(−3, 4)`, `(−3, −4)`, `(4, 3)`], correctIndex: 0 },
        { question: `(3, 4) noktası y ekseninde simetriği hangi noktadır?`, options: [`(−3, 4)`, `(3, −4)`, `(−3, −4)`, `(4, 3)`], correctIndex: 0 },
        { question: `(3, 4) noktası orijine göre simetriği hangi noktadır?`, options: [`(−3, −4)`, `(−3, 4)`, `(3, −4)`, `(4, 3)`], correctIndex: 0 },
        { question: `(−2, 5) noktası x ekseninde simetriği hangi noktadır?`, options: [`(−2, −5)`, `(2, 5)`, `(2, −5)`, `(5, −2)`], correctIndex: 0 },
        { question: `(−2, 5) noktası y ekseninde simetriği hangi noktadır?`, options: [`(2, 5)`, `(−2, −5)`, `(2, −5)`, `(5, −2)`], correctIndex: 0 },
        { question: `(2, 3) noktası 3 birim sağa, 2 birim yukarı ötelenirse görüntüsü ne olur?`, options: [`(5, 5)`, `(5, 1)`, `(−1, 5)`, `(−1, 1)`], correctIndex: 0 },
        { question: `(0, 0) noktası 5 birim sağa, 3 birim yukarı ötelenirse?`, options: [`(5, 3)`, `(3, 5)`, `(0, 0)`, `(−5, −3)`], correctIndex: 0 },
        { question: `(4, 1) noktası 2 birim sola, 3 birim aşağı ötelenirse?`, options: [`(2, −2)`, `(6, 4)`, `(2, 4)`, `(6, −2)`], correctIndex: 0 },
        { question: `Bir şekil orijin etrafında 90° saat yönünde döndürülürse (x, y) noktası nereye gider?`, options: [`(y, −x)`, `(−y, x)`, `(−x, −y)`, `(x, −y)`], correctIndex: 0 },
        { question: `Bir şekil orijin etrafında 90° saat yönünün tersine döndürülürse (x, y) nereye gider?`, options: [`(−y, x)`, `(y, −x)`, `(−x, −y)`, `(x, y)`], correctIndex: 0 },
        { question: `Bir şekil orijin etrafında 180° döndürülürse (x, y) nereye gider?`, options: [`(−x, −y)`, `(−y, x)`, `(y, −x)`, `(x, y)`], correctIndex: 0 },
        { question: `Bir şekil orijin etrafında 360° döndürülürse?`, options: [`Aynı yerde kalır`, `90° döner`, `180° döner`, `Yer değiştirir`], correctIndex: 0 },
        { question: `Eşkenar üçgenin kaç simetri ekseni vardır?`, options: [`3`, `1`, `0`, `6`], correctIndex: 0 },
        { question: `Karenin kaç simetri ekseni vardır?`, options: [`4`, `2`, `1`, `8`], correctIndex: 0 },
        { question: `Dikdörtgenin kaç simetri ekseni vardır?`, options: [`2`, `4`, `1`, `0`], correctIndex: 0 },
        { question: `İkizkenar üçgenin kaç simetri ekseni vardır?`, options: [`1`, `2`, `3`, `0`], correctIndex: 0 },
        { question: `Çemberin kaç simetri ekseni vardır?`, options: [`Sonsuz`, `1`, `2`, `4`], correctIndex: 0 },
        { question: `Düzgün altıgenin kaç simetri ekseni vardır?`, options: [`6`, `3`, `2`, `4`], correctIndex: 0 },
        { question: `Eşkenar üçgenin dönme simetrisi açısı kaç derecedir?`, options: [`120° (360/3)`, `60°`, `90°`, `180°`], correctIndex: 0 },
        { question: `Karenin dönme simetrisi açısı kaç derecedir?`, options: [`90° (360/4)`, `45°`, `120°`, `180°`], correctIndex: 0 },
        { question: `Düzgün altıgenin dönme simetrisi açısı kaç derecedir?`, options: [`60° (360/6)`, `90°`, `120°`, `180°`], correctIndex: 0 },
        { question: `(1, 2) noktası saat yönünün tersine 90° döndürülürse?`, options: [`(−2, 1)`, `(2, −1)`, `(−1, −2)`, `(1, −2)`], correctIndex: 0 },
        { question: `(3, 4) noktası saat yönünde 90° döndürülürse?`, options: [`(4, −3)`, `(−4, 3)`, `(−3, −4)`, `(3, −4)`], correctIndex: 0 },
        { question: `Bir şekil x = 2 doğrusuna göre yansıtılırsa (5, 3) noktası nereye gider?`, options: [`(−1, 3) (5 → 2-3 = -1)`, `(−5, 3)`, `(3, 5)`, `(5, −3)`], correctIndex: 0 },
        { question: `Bir şekil y = 1 doğrusuna göre yansıtılırsa (2, 4) noktası nereye gider?`, options: [`(2, −2) (4 → 1-3 = -2)`, `(−2, 4)`, `(2, 6)`, `(4, 2)`], correctIndex: 0 },
        { question: `Bir şekli ötelemek için ne kullanılır?`, options: [`Bir öteleme vektörü (yön ve büyüklük)`, `Bir nokta`, `Bir açı`, `Bir doğru`], correctIndex: 0 },
        { question: `Yansıma için ne gerekir?`, options: [`Bir simetri ekseni (doğru)`, `Bir vektör`, `Bir nokta`, `Bir açı`], correctIndex: 0 },
        { question: `Döndürme için ne gerekir?`, options: [`Bir merkez nokta ve dönme açısı`, `Sadece doğru`, `Sadece nokta`, `Sadece açı`], correctIndex: 0 },
        { question: `Öteleme, yansıma ve döndürmeye ortak olarak ne denir?`, options: [`Dönüşüm geometrisi (eşlik koruyan)`, `Büyütme`, `Küçültme`, `Şekilsizleştirme`], correctIndex: 0 },
        { question: `Bir şekil orijinaliyle eş ise alanları nasıldır?`, options: [`Eşittir`, `Farklıdır`, `İki katıdır`, `Yarıdır`], correctIndex: 0 },
        { question: `Bir şekil dönüşüm sonrası kendi kendine eşleşiyorsa ona ne denir?`, options: [`Simetrik şekil`, `Asimetrik`, `Düzlemsel`, `Üç boyutlu`], correctIndex: 0 },
        { question: `Saat yönünün tersi pozitif midir?`, options: [`Evet (matematikte pozitif yön)`, `Hayır`, `Bilinmez`, `Sadece -90 için`], correctIndex: 0 },
        { question: `Bir simetri eksenine göre yansıtılan noktanın simetri eksenine olan uzaklığı nasıldır?`, options: [`Eşittir`, `Farklıdır`, `İki katıdır`, `Yarıdır`], correctIndex: 0 },
        { question: `Aynı şekli üst üste döndürerek kapatmak hangi dönüşüm türündedir?`, options: [`Döndürme simetrisi`, `Öteleme`, `Yansıma`, `Büyütme`], correctIndex: 0 },
        { question: `Bir motifin tekrarlı kullanılmasıyla oluşan sanat türü hangisidir?`, options: [`Tessellation (kakma)`, `Heykel`, `Resim`, `Müzik`], correctIndex: 0 },
        { question: `(2, 0) noktası 4 birim sola ötelenirse görüntüsü ne olur?`, options: [`(−2, 0)`, `(6, 0)`, `(2, −4)`, `(−2, 4)`], correctIndex: 0 },
        { question: `(0, 3) noktası 5 birim aşağı ötelenirse?`, options: [`(0, −2)`, `(0, 8)`, `(−5, 3)`, `(5, 3)`], correctIndex: 0 },
        { question: `Dönüşüm geometrisinde "eşlik" ne demektir?`, options: [`Boyut ve şekil aynı kalır`, `Şekil değişir`, `Boyut değişir`, `Konum değişmez`], correctIndex: 0 },
        { question: `Bir şekli x ekseninde yansıttıktan sonra y ekseninde yansıtırsak sonuç hangi dönüşüme eşdeğerdir?`, options: [`Orijinde 180° döndürme`, `Sadece x yansıma`, `Sadece y yansıma`, `Hiçbir dönüşüm`], correctIndex: 0 },
        { question: `Yarısı 3 birim olan bir karenin merkezi (0,0) ise sağ üst köşesi nedir?`, options: [`(3, 3)`, `(0, 0)`, `(−3, −3)`, `(3, 0)`], correctIndex: 0 },
        { question: `(1, 0) noktasının orijin etrafında 180° döndürülmesi nedir?`, options: [`(−1, 0)`, `(0, 1)`, `(0, −1)`, `(1, 0)`], correctIndex: 0 },
        { question: `(0, 1) noktasının orijin etrafında 90° saat tersi döndürülmesi nedir?`, options: [`(−1, 0)`, `(1, 0)`, `(0, −1)`, `(0, 1)`], correctIndex: 0 },
        { question: `Bir simetri ekseni üzerinde duran nokta yansıtılınca nerede olur?`, options: [`Yerinde kalır`, `Yer değiştirir`, `Yok olur`, `Eksene gider`], correctIndex: 0 },
        { question: `Düzlemde nokta simetri ne demektir?`, options: [`Bir noktaya göre eşit uzaklıktaki simetri (180° dönme)`, `Eksene göre simetri`, `Hiçbir simetri`, `Üçgensel simetri`], correctIndex: 0 },
      ],
    },
    {
      id: "geometrik-cisimler",
      name: `Geometrik Cisimler`,
      summary: `Dik prizma ve dik silindir; hacim ve yüzey alanı.`,
      youtubeId: "",
      mindMap: {
        center: `Geometrik Cisimler`,
        branches: [
          {
            label: `Dik Prizmalar`,
            sections: [
              { kind: "formul", content: `Hacim = taban alanı × yükseklik. Yüzey alanı = 2·(taban alanı) + (taban çevresi · yükseklik).` },
              { kind: "ornek", content: `Dikdörtgenler prizması (a·b·c): 2·3·4 = 24 cm³. Üçgen prizma: taban = üçgen alanı, sonra × yükseklik. Kare prizma: taban = a², hacim = a²·h.` },
              { kind: "ornek", content: `Küp (özel kare prizma): hacim = a³. a=3 cm → 27 cm³. a=5 cm → 125 cm³. Yüzey alanı = 6a²; a=4 → 96 cm². Küpün 6 yüzü, 12 ayrıtı, 8 köşesi vardır.` },
              { kind: "tuzak", content: `Hacimde taban ÇEVRESİ değil, taban ALANI kullanılır. Yüzey alanı hesabında çevre kullanılır.` },
            ],
          },
          {
            label: `Dik Silindir`,
            sections: [
              { kind: "formul", content: `Hacim = π·r²·h. Yan yüzey alanı = 2πr·h. Yüzey alanı (kapalı) = 2πr² + 2πrh.` },
              { kind: "ornek", content: `r=5, h=10, π=3 → hacim = 3·25·10 = 750 cm³; yüzey = 2·3·25 + 2·3·5·10 = 150 + 300 = 450 cm². r=2, h=7, π=3 → hacim = 3·4·7 = 84 cm³.` },
              { kind: "ipucu", content: `Silindirin açınımı: dikdörtgen (yan yüzey, kenarları 2πr ve h) + 2 daire (taban ve üst).` },
              { kind: "tuzak", content: `Hacim 2πrh DEĞİLDİR; 2πrh sadece yan yüzey alanıdır. Hacim = πr²·h.` },
            ],
          },
          {
            label: `Piramit ve Koni`,
            sections: [
              { kind: "tanim", content: `Bir tabanı ve bir TEPE noktası olan geometrik cisimlerdir. Piramidin tabanı çokgendir, koninin tabanı dairedir.` },
              { kind: "ornek", content: `Kare piramit (4 üçgen yüzey + 1 kare taban = 5 yüz), üçgen piramit/tetrahedron (4 üçgen yüzey = 4 yüz). Koni: 1 daire taban + 1 yan yüzey.` },
              { kind: "ipucu", content: `LGS'de piramit/koni hacim formülü genelde sorulmaz; yapısal özellikleri (taban, tepe, ayrıt sayısı) sorulur.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Dik prizmanın hacmi nasıl bulunur?`, back: `Taban alanı × yükseklik.` },
        { front: `Silindirin hacmi nedir?`, back: `π·r²·h.` },
        { front: `Silindirin yüzey alanı nedir?`, back: `2πr² + 2πrh.` },
        { front: `Küpün hacmi nedir?`, back: `a³ (a: ayrıt uzunluğu).` },
        { front: `Küpün kaç yüzü vardır?`, back: `6.` },
      ],
      article: `# Dik Prizmalar
[formül] **Hacim = Taban alanı × Yükseklik**. Küpün hacmi = **a³** (a: ayrıt uzunluğu).
[örnek] Ayrıtları 2, 3, 4 cm olan dikdörtgenler prizması: 2·3·4 = **24 cm³**.
[tuzak] Prizma hacminde **taban çevresi değil, taban ALANI** kullanılır.

# Dik Silindir
[formül] **Hacim = π·r²·h**  •  **Yüzey alanı = 2πr² + 2πrh**
[örnek] r = 5 cm, h = 10 cm, π = 3 → 3·5²·10 = 3·25·10 = **750 cm³**.
[tuzak] Silindirin hacmi 2πrh **değildir**; 2πrh yan yüzey alanıdır.

# Piramit ve Koni
Piramit ve koni de bir **tepe noktasına** sahip geometrik cisimlerdir.`,
      tips: [
        { trap: `Silindirin hacmi ile yan yüzey alanı karıştırılır.`, wrong: `Silindirin hacmi 2πrh'dir.`, correct: `Silindirin hacmi π·r²·h'dir; 2πrh ise yan yüzey alanıdır.` },
        { trap: `Prizmanın hacmi taban çevresiyle hesaplanır sanılır.`, wrong: `Prizmanın hacmi = taban çevresi × yükseklik.`, correct: `Prizmanın hacmi = TABAN ALANI × yükseklik.` },
      ],
      quiz: [
        { question: `Ayrıtları 2 cm, 3 cm ve 4 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?`, options: [`24`, `9`, `18`, `12`], correctIndex: 0, explanation: `2·3·4=24.` },
        { question: `Bir dik prizmanın hacmi nasıl bulunur?`, options: [`Taban alanı × yükseklik`, `Taban çevresi × yükseklik`, `2 × taban alanı`, `Taban alanı + yükseklik`], correctIndex: 0 },
        { question: `Taban yarıçapı r, yüksekliği h olan silindirin hacmi hangisidir?`, options: [`πr²h`, `2πrh`, `πrh`, `2πr²`], correctIndex: 0 },
        { question: `Yarıçapı 5 cm, yüksekliği 10 cm olan silindirin hacmi kaç cm³'tür? (π = 3)`, options: [`750`, `150`, `250`, `1500`], correctIndex: 0, explanation: `3·5²·10 = 3·25·10 = 750.` },
        { question: `Bir ayrıtı 3 cm olan küpün hacmi kaç cm³'tür?`, options: [`27`, `9`, `18`, `6`], correctIndex: 0, explanation: `3³=27.` },
        { question: `Bir küpün kaç yüzü vardır?`, options: [`6`, `4`, `8`, `12`], correctIndex: 0 },
        { question: `Dik silindirin yüzey alanı formülü hangisidir?`, options: [`2πr² + 2πrh`, `πr²h`, `πr²`, `2πrh`], correctIndex: 0 },
        { question: `Bir ayrıtı 2 cm olan küpün hacmi kaç cm³'tür?`, options: [`8`, `6`, `4`, `12`], correctIndex: 0, explanation: `2³=8.` },
      ],
      quickQuestions: [
        { question: `Bir küpün kaç yüzü vardır?`, options: [`6`, `4`, `8`, `12`], correctIndex: 0 },
        { question: `Bir küpün kaç ayrıtı vardır?`, options: [`12`, `8`, `6`, `4`], correctIndex: 0 },
        { question: `Bir küpün kaç köşesi vardır?`, options: [`8`, `6`, `12`, `4`], correctIndex: 0 },
        { question: `Küpün hacim formülü nedir?`, options: [`a³`, `a²`, `a · b · c`, `4a`], correctIndex: 0 },
        { question: `Küpün yüzey alanı formülü nedir?`, options: [`6a²`, `a²`, `4a²`, `a³`], correctIndex: 0 },
        { question: `Ayrıtı 3 cm olan küpün hacmi kaç cm³'tür?`, options: [`27`, `9`, `18`, `6`], correctIndex: 0 },
        { question: `Ayrıtı 4 cm olan küpün hacmi kaç cm³'tür?`, options: [`64`, `16`, `12`, `8`], correctIndex: 0 },
        { question: `Ayrıtı 5 cm olan küpün hacmi kaç cm³'tür?`, options: [`125`, `25`, `15`, `100`], correctIndex: 0 },
        { question: `Ayrıtı 3 cm olan küpün yüzey alanı kaç cm²'dir?`, options: [`54 (6·9)`, `27`, `36`, `9`], correctIndex: 0 },
        { question: `Ayrıtı 5 cm olan küpün yüzey alanı kaç cm²'dir?`, options: [`150 (6·25)`, `125`, `25`, `75`], correctIndex: 0 },
        { question: `Bir dikdörtgenler prizmasının hacim formülü nedir?`, options: [`a · b · c`, `a³`, `a²`, `4a`], correctIndex: 0 },
        { question: `Ayrıtları 2, 3, 4 olan dikdörtgenler prizmasının hacmi kaçtır?`, options: [`24`, `9`, `18`, `12`], correctIndex: 0 },
        { question: `Ayrıtları 5, 6, 10 olan dikdörtgenler prizmasının hacmi kaçtır?`, options: [`300`, `21`, `60`, `30`], correctIndex: 0 },
        { question: `Dikdörtgenler prizmasının yüzey alanı formülü nedir?`, options: [`2(ab + bc + ac)`, `abc`, `6a²`, `a²b`], correctIndex: 0 },
        { question: `Dik prizmaların hacim formülü genel olarak nedir?`, options: [`Taban alanı × yükseklik`, `Taban çevresi × yükseklik`, `2 × taban alanı`, `Taban alanı + yükseklik`], correctIndex: 0 },
        { question: `Üçgen dik prizmanın hacmi nasıl hesaplanır?`, options: [`Üçgen taban alanı × yükseklik`, `Üçgen çevresi × yükseklik`, `Üçgen alanı + yükseklik`, `Yükseklik²`], correctIndex: 0 },
        { question: `Silindirin hacim formülü nedir?`, options: [`π · r² · h`, `2πr · h`, `2πr²`, `π · r · h`], correctIndex: 0 },
        { question: `Silindirin yüzey alanı formülü nedir?`, options: [`2πr² + 2πrh`, `πr²h`, `2πr`, `2πr²`], correctIndex: 0 },
        { question: `Silindirin yan yüzey alanı formülü nedir?`, options: [`2πr · h`, `πr²`, `2πr²`, `πr · h`], correctIndex: 0 },
        { question: `Yarıçapı 5, yüksekliği 10 olan silindirin hacmi (π=3) kaçtır?`, options: [`750 (3·25·10)`, `150`, `250`, `1500`], correctIndex: 0 },
        { question: `Yarıçapı 3, yüksekliği 4 olan silindirin hacmi (π=3) kaçtır?`, options: [`108 (3·9·4)`, `36`, `12`, `60`], correctIndex: 0 },
        { question: `Yarıçapı 7, yüksekliği 10 olan silindirin hacmi (π=22/7) kaçtır?`, options: [`1540 ((22/7)·49·10)`, `220`, `154`, `15400`], correctIndex: 0 },
        { question: `Silindirin tabanları hangi geometrik şekildir?`, options: [`Daire`, `Üçgen`, `Kare`, `Dikdörtgen`], correctIndex: 0 },
        { question: `Silindirin açılımında yan yüzü hangi şekildir?`, options: [`Dikdörtgen`, `Üçgen`, `Kare`, `Daire`], correctIndex: 0 },
        { question: `Konik prizmaların açılımında tabanı hangi şekildir?`, options: [`Üçgen, dörtgen vb. (prizmaya göre)`, `Sadece daire`, `Sadece üçgen`, `Sadece kare`], correctIndex: 0 },
        { question: `Kare prizmasının hacmi a × a × h ise yüzey alanı?`, options: [`2a² + 4ah`, `6a²`, `a³`, `a²h`], correctIndex: 0 },
        { question: `Bir tarafı 5 cm, diğer iki tarafı 3 cm olan kare dik prizmasının hacmi?`, options: [`45 (5·3·3)`, `15`, `30`, `75`], correctIndex: 0 },
        { question: `Bir silindirin yarıçapı iki katına çıkarsa hacmi kaç katına çıkar?`, options: [`4 katına (r² → (2r)² = 4r²)`, `2 katına`, `Aynı kalır`, `8 katına`], correctIndex: 0 },
        { question: `Bir silindirin yüksekliği iki katına çıkarsa hacmi kaç katına çıkar?`, options: [`2 katına`, `4 katına`, `Aynı kalır`, `8 katına`], correctIndex: 0 },
        { question: `Bir küpün ayrıtı iki katına çıkarsa hacmi kaç katına çıkar?`, options: [`8 katına (2³)`, `2 katına`, `4 katına`, `Aynı`], correctIndex: 0 },
        { question: `Bir küpün ayrıtı iki katına çıkarsa yüzey alanı kaç katına çıkar?`, options: [`4 katına (2²)`, `2 katına`, `8 katına`, `Aynı`], correctIndex: 0 },
        { question: `Hacim biriminde 1 m³ kaç dm³'tür?`, options: [`1000`, `100`, `10`, `1`], correctIndex: 0 },
        { question: `1 cm³ kaç mm³'tür?`, options: [`1000`, `100`, `10`, `1`], correctIndex: 0 },
        { question: `1 m³ kaç cm³'tür?`, options: [`1.000.000`, `1000`, `100.000`, `100`], correctIndex: 0 },
        { question: `1 L kaç dm³'tür?`, options: [`1`, `1000`, `10`, `100`], correctIndex: 0 },
        { question: `1 m³ kaç litredir?`, options: [`1000`, `100`, `10`, `1`], correctIndex: 0 },
        { question: `Dikdörtgenler prizmasının ayrıtları 1, 2, 3 ise yüzey alanı?`, options: [`22 (2·(1·2+2·3+1·3) = 2·11)`, `11`, `6`, `12`], correctIndex: 0 },
        { question: `Bir küpün hacmi 64 cm³ ise ayrıtı kaç cm'dir?`, options: [`4 (∛64)`, `8`, `16`, `6`], correctIndex: 0 },
        { question: `Bir küpün hacmi 125 cm³ ise ayrıtı kaç cm'dir?`, options: [`5`, `10`, `15`, `25`], correctIndex: 0 },
        { question: `Bir küpün yüzey alanı 54 cm² ise ayrıtı kaç cm'dir?`, options: [`3 (54/6 = 9 → √9 = 3)`, `6`, `9`, `2`], correctIndex: 0 },
        { question: `Tabanı 4×5 olan bir prizmanın taban alanı kaçtır?`, options: [`20`, `9`, `40`, `12`], correctIndex: 0 },
        { question: `Tabanı 6 cm² olan, yüksekliği 5 cm olan prizmanın hacmi?`, options: [`30 cm³`, `11`, `6`, `5`], correctIndex: 0 },
        { question: `Üçgen prizmanın tabanı dik üçgen olup dik kenarları 3 ve 4 ise taban alanı?`, options: [`6 ((3·4)/2)`, `12`, `7`, `5`], correctIndex: 0 },
        { question: `Yüksekliği 5 olan, taban alanı 6 olan üçgen prizmasının hacmi?`, options: [`30`, `11`, `6`, `5`], correctIndex: 0 },
        { question: `Silindirin taban alanı πr² ile bulunur. r=4 için (π=3) taban alanı?`, options: [`48 (3·16)`, `12`, `24`, `36`], correctIndex: 0 },
        { question: `Bir prizmanın yüksekliği ne demektir?`, options: [`İki taban arasındaki dik uzaklık`, `Bir kenar`, `Taban çevresi`, `Bir köşegen`], correctIndex: 0 },
        { question: `Bir küp aslında ne tür prizmadır?`, options: [`Kare prizma (özel hâli)`, `Üçgen prizma`, `Daire prizması`, `Hiçbiri`], correctIndex: 0 },
        { question: `Silindirin iki tabanı arasında ne vardır?`, options: [`Dikdörtgen şeklinde sarılı bir yan yüzey`, `Üçgen`, `Daire`, `Kare`], correctIndex: 0 },
        { question: `Bir dik silindir tabanına dik mi yatay mı durur?`, options: [`Dik (yan yüz tabanlara dik)`, `Yatay`, `Eğik`, `Bilinmez`], correctIndex: 0 },
        { question: `Bir küpün tüm ayrıtlarının uzunlukları nasıldır?`, options: [`Hepsi eşittir`, `Farklıdır`, `İkişer eşittir`, `Üçer eşittir`], correctIndex: 0 },
      ],
    },
  ],
};
