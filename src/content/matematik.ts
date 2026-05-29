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
            detail: `Asal sayı yalnız 1'e ve kendisine bölünür (2, 3, 5, 7, 11...). En küçük asal sayı 2'dir. Bir sayı asal çarpanlarının çarpımı olarak yazılabilir: 60 = 2² · 3 · 5.`,
          },
          {
            label: `Bölünebilme Kuralları`,
            detail: `2: son rakam çift. 3: rakamlar toplamı 3'ün katı. 5: son rakam 0 veya 5. 9: rakamlar toplamı 9'un katı. 10: son rakam 0.`,
          },
          {
            label: `EBOB (En Büyük Ortak Bölen)`,
            detail: `İki sayının ortak bölenlerinin en büyüğüdür. Ortak asal çarpanların en küçük üslüleri çarpılarak bulunur.`,
          },
          {
            label: `EKOK (En Küçük Ortak Kat)`,
            detail: `İki sayının ortak katlarının en küçüğüdür. Tüm asal çarpanların en büyük üslüleri çarpılarak bulunur.`,
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
      article: `## Asal Sayılar ve Asal Çarpanlara Ayırma
Asal sayı, yalnızca 1'e ve kendisine bölünebilen, 1'den büyük doğal sayıdır (2, 3, 5, 7, 11, 13...). En küçük asal sayı 2'dir ve 2, tek çift asal sayıdır. Her sayı, asal çarpanlarının çarpımı biçiminde yazılabilir: 60 = 2² · 3 · 5.

## Bölünebilme Kuralları
2: son rakam çift. 3: rakamlar toplamı 3'ün katı. 5: son rakam 0 veya 5. 9: rakamlar toplamı 9'un katı. 10: son rakam 0.

## EBOB ve EKOK
EBOB (en büyük ortak bölen), sayıların ortak bölenlerinin en büyüğüdür; ortak asal çarpanların en küçük üslüleri çarpılarak bulunur. EKOK (en küçük ortak kat), sayıların ortak katlarının en küçüğüdür; tüm asal çarpanların en büyük üslüleri çarpılarak bulunur. Her zaman EBOB ≤ sayılar ≤ EKOK olur.`,
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
    },
    {
      id: "karekoklu-ifadeler",
      name: `Kareköklü İfadeler`,
      summary: `Karekök, tam kareler ve işlemler.`,
      youtubeId: "",
      mindMap: {
        center: `Kareköklü İfadeler`,
        branches: [
          { label: `Karekök ve Tam Kareler`, detail: `√a ifadesinde a ≥ 0 olmalıdır. Tam kareler: 1, 4, 9, 16, 25, 36... √16 = 4.` },
          { label: `Çarpma ve Bölme`, detail: `√a · √b = √(a·b); √a / √b = √(a/b).` },
          { label: `Kök İçine/Dışına Alma`, detail: `√12 = √(4·3) = 2√3. Tersi: 2√3 = √12.` },
          { label: `Toplama ve Çıkarma`, detail: `Yalnız kök içleri aynı olan ifadeler toplanır/çıkarılır: 2√3 + 5√3 = 7√3.` },
        ],
      },
      cards: [
        { front: `√16 kaçtır?`, back: `4 (çünkü 4²=16).` },
        { front: `√a · √b kaçtır?`, back: `√(a·b).` },
        { front: `√12'nin en sade hâli?`, back: `2√3 (12=4·3).` },
        { front: `2√3 + 5√3 kaçtır?`, back: `7√3 (kök içleri aynıysa katsayılar toplanır).` },
        { front: `√(a+b) = √a + √b doğru mu?`, back: `Hayır! Karekök toplama üzerine dağılmaz.` },
      ],
      article: `## Karekök ve Tam Kareler
Bir sayının karekökü, karesi o sayıya eşit olan pozitif sayıdır: √16 = 4. Karekök içindeki sayı negatif olamaz (a ≥ 0). Tam kare sayılar: 1, 4, 9, 16, 25, 36, 49, 64...

## Çarpma, Bölme ve Sadeleştirme
√a · √b = √(a·b) ve √a / √b = √(a/b) kurallarıyla işlem yapılır. Kök içindeki sayı tam kare çarpan içeriyorsa kök dışına alınır: √12 = √(4·3) = 2√3.

## Toplama ve Çıkarma
Kareköklü ifadelerde yalnızca kök içleri aynı olan terimler toplanıp çıkarılabilir: 2√3 + 5√3 = 7√3. Kök içleri farklıysa işlem yapılamaz.`,
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
    },
    {
      id: "veri-analizi",
      name: `Veri Analizi`,
      summary: `Ortalama, ortanca, mod, açıklık ve grafikler.`,
      youtubeId: "",
      mindMap: {
        center: `Veri Analizi`,
        branches: [
          { label: `Aritmetik Ortalama`, detail: `Verilerin toplamının veri sayısına bölünmesidir.` },
          { label: `Ortanca (Medyan)`, detail: `Veriler sıralanır; ortadaki değerdir. Veri sayısı çiftse ortadaki iki değerin ortalaması alınır.` },
          { label: `Tepe Değer (Mod)`, detail: `Bir veri grubunda en çok tekrar eden değerdir.` },
          { label: `Açıklık ve Grafikler`, detail: `Açıklık = en büyük veri − en küçük veri. Daire, sütun ve çizgi grafikleri verileri görselleştirir.` },
        ],
      },
      cards: [
        { front: `Aritmetik ortalama nasıl bulunur?`, back: `Verilerin toplamı / veri sayısı.` },
        { front: `Mod (tepe değer) nedir?`, back: `En çok tekrar eden veridir.` },
        { front: `Ortanca (medyan) nasıl bulunur?`, back: `Veriler sıralanır; ortadaki değerdir.` },
        { front: `Açıklık nedir?`, back: `En büyük veri − en küçük veri.` },
        { front: `Bir bütünün parçalara dağılımı hangi grafikle gösterilir?`, back: `Daire grafiği.` },
      ],
      article: `## Aritmetik Ortalama
Verilerin toplamının veri sayısına bölünmesiyle bulunur. Örnek: 4, 6, 8, 10 için ortalama = (4+6+8+10)/4 = 28/4 = 7.

## Ortanca (Medyan) ve Tepe Değer (Mod)
Ortanca, veriler küçükten büyüğe sıralandığında ortadaki değerdir; veri sayısı çiftse ortadaki iki değerin ortalaması alınır. Mod ise en çok tekrar eden veridir.

## Açıklık ve Grafikler
Açıklık, en büyük veri ile en küçük veri arasındaki farktır. Veriler; daire, sütun ve çizgi grafikleriyle görselleştirilir. Bir bütünün parçalara (yüzdelere) dağılımı için daire grafiği uygundur.`,
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
    },
    {
      id: "olasilik",
      name: `Olasılık`,
      summary: `Basit olayların olma olasılığı.`,
      youtubeId: "",
      mindMap: {
        center: `Olasılık`,
        branches: [
          { label: `Olasılık Tanımı`, detail: `Bir olayın olma olasılığı = istenen çıktı sayısı / tüm olası çıktı sayısı. Sonuç daima 0 ile 1 arasındadır.` },
          { label: `Kesin ve İmkânsız Olay`, detail: `Kesin olayın olasılığı 1, imkânsız olayın olasılığı 0'dır.` },
          { label: `Örnekler`, detail: `Zar atma, para atma, torbadan top çekme gibi deneylerde olasılık hesaplanır.` },
        ],
      },
      cards: [
        { front: `Olasılık nasıl hesaplanır?`, back: `İstenen çıktı sayısı / tüm olası çıktı sayısı.` },
        { front: `Olasılık hangi aralıktadır?`, back: `0 ile 1 arasında.` },
        { front: `Kesin olayın olasılığı?`, back: `1.` },
        { front: `İmkânsız olayın olasılığı?`, back: `0.` },
        { front: `Hilesiz zarda 3 gelme olasılığı?`, back: `1/6.` },
      ],
      article: `## Olasılık Tanımı
Bir olayın olma olasılığı, istenen çıktı sayısının tüm olası çıktı sayısına bölünmesiyle bulunur. Olasılık değeri her zaman 0 ile 1 arasındadır.

## Kesin ve İmkânsız Olay
Gerçekleşmesi kesin olan olayın olasılığı 1, gerçekleşmesi imkânsız olan olayın olasılığı 0'dır.

## Örnekler
Hilesiz bir zarda 3 gelme olasılığı 1/6'dır (6 eşit olası sonuçtan biri). Hilesiz bir parada tura gelme olasılığı 1/2'dir.`,
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
    },
    {
      id: "cebirsel-ifadeler",
      name: `Cebirsel İfadeler ve Özdeşlikler`,
      summary: `Özdeşlikler ve çarpanlara ayırma.`,
      youtubeId: "",
      mindMap: {
        center: `Cebirsel İfadeler`,
        branches: [
          { label: `Cebirsel İfadeler`, detail: `Değişken (harf) içeren ifadelerdir. 3x+5 ifadesinde 3 katsayı, x değişken, 5 sabit terimdir. Benzer terimler toplanabilir.` },
          { label: `Özdeşlikler`, detail: `(a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; a²−b² = (a−b)(a+b).` },
          { label: `Çarpanlara Ayırma`, detail: `Ortak çarpan parantezine alma ve özdeşliklerden yararlanarak ifadeyi çarpımlara ayırma.` },
        ],
      },
      cards: [
        { front: `(a+b)² açılımı nedir?`, back: `a² + 2ab + b².` },
        { front: `(a−b)² açılımı nedir?`, back: `a² − 2ab + b².` },
        { front: `a²−b² çarpanlarına nasıl ayrılır?`, back: `(a−b)(a+b).` },
        { front: `Benzer terim nedir?`, back: `Değişkeni ve derecesi aynı olan terimlerdir: 3x ve 2x benzerdir.` },
        { front: `4x+8 ifadesinin ortak çarpanı?`, back: `4(x+2).` },
      ],
      article: `## Cebirsel İfadeler
İçinde değişken (harf) bulunan ifadelere cebirsel ifade denir. 3x + 5 ifadesinde 3 katsayı, x değişken, 5 ise sabit terimdir. Yalnızca benzer terimler (değişkeni ve derecesi aynı olanlar) toplanıp çıkarılabilir: 3x + 2x = 5x.

## Özdeşlikler
Her değer için doğru olan eşitliklere özdeşlik denir: (a+b)² = a²+2ab+b²; (a−b)² = a²−2ab+b²; a²−b² = (a−b)(a+b).

## Çarpanlara Ayırma
Bir ifadeyi çarpımlar biçiminde yazmaya çarpanlara ayırma denir. Ortak çarpan parantezine alınır (4x+8 = 4(x+2)) veya özdeşlikler kullanılır (x²−25 = (x−5)(x+5)).`,
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
    },
    {
      id: "dogrusal-denklemler",
      name: `Doğrusal Denklemler`,
      summary: `Denklem çözme, koordinat sistemi ve eğim.`,
      youtubeId: "",
      mindMap: {
        center: `Doğrusal Denklemler`,
        branches: [
          { label: `Birinci Dereceden Denklemler`, detail: `ax+b=c biçimindedir; bilinmeyen yalnız bırakılarak çözülür. Taraf değiştiren terimin işareti değişir. 2x+3=11 → x=4.` },
          { label: `Koordinat Sistemi`, detail: `Nokta (x, y) ile gösterilir; x apsis, y ordinattır.` },
          { label: `Doğrunun Eğimi`, detail: `Eğim = y'deki değişim / x'teki değişim (dikey değişim / yatay değişim).` },
          { label: `Doğru Grafiği`, detail: `Doğrusal bir denklemin grafiği bir doğrudur.` },
        ],
      },
      cards: [
        { front: `2x+3=11 ise x kaçtır?`, back: `x=4 (2x=8).` },
        { front: `Denklem çözerken taraf değiştiren terim?`, back: `İşareti değişir.` },
        { front: `(x, y) noktasında x neyi gösterir?`, back: `Apsisi (yatay konum).` },
        { front: `Doğrunun eğimi nasıl bulunur?`, back: `y'deki değişim / x'teki değişim.` },
        { front: `Doğrusal denklemin grafiği nedir?`, back: `Bir doğrudur.` },
      ],
      article: `## Birinci Dereceden Bir Bilinmeyenli Denklemler
Bilinmeyeni (x) yalnız bırakarak denklem çözülür. Bir terim eşitliğin diğer tarafına geçerken işareti değişir: 2x + 3 = 11 → 2x = 11 − 3 = 8 → x = 4.

## Koordinat Sistemi
Düzlemdeki her nokta (x, y) sıralı ikilisiyle gösterilir. x değerine apsis, y değerine ordinat denir.

## Doğrunun Eğimi
Bir doğrunun eğimi, y'deki (dikey) değişimin x'teki (yatay) değişime oranıdır. Doğrusal bir denklemin grafiği koordinat düzleminde bir doğru oluşturur.`,
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
    },
    {
      id: "esitsizlikler",
      name: `Eşitsizlikler`,
      summary: `Birinci dereceden bir bilinmeyenli eşitsizlikler.`,
      youtubeId: "",
      mindMap: {
        center: `Eşitsizlikler`,
        branches: [
          { label: `Eşitsizlik Sembolleri`, detail: `< (küçüktür), > (büyüktür), ≤ (küçük eşit), ≥ (büyük eşit). "x > 3" → x, 3'ten büyüktür.` },
          { label: `Eşitsizlik Çözme`, detail: `Denklem gibi çözülür; ANCAK negatif sayıyla çarpılıp bölününce eşitsizliğin yönü değişir.` },
          { label: `Sayı Doğrusunda Gösterim`, detail: `≤ ve ≥ için içi DOLU nokta (sınır dahil), < ve > için içi BOŞ nokta (sınır hariç) kullanılır.` },
        ],
      },
      cards: [
        { front: `Eşitsizlik sembolleri nelerdir?`, back: `<, >, ≤, ≥.` },
        { front: `Negatif sayıyla bölünce ne olur?`, back: `Eşitsizliğin yönü değişir.` },
        { front: `x ≤ 5 sayı doğrusunda nasıl gösterilir?`, back: `5 dahil; içi dolu nokta.` },
        { front: `x > 0 olan sayılar nelerdir?`, back: `Pozitif sayılar.` },
        { front: `2x > 10 çözümü?`, back: `x > 5.` },
      ],
      article: `## Eşitsizlik Sembolleri
Eşitsizlikler <, >, ≤, ≥ sembolleriyle gösterilir. "x > 3" ifadesi, x'in 3'ten büyük olduğunu belirtir.

## Eşitsizlik Çözme
Eşitsizlikler tıpkı denklemler gibi çözülür. Ancak çok önemli bir kural vardır: eşitsizliğin her iki tarafı negatif bir sayıyla çarpılır veya bölünürse eşitsizliğin yönü değişir.

## Sayı Doğrusunda Gösterim
Çözüm kümesi sayı doğrusunda gösterilir. Sınır değer dahilse (≤, ≥) içi dolu nokta, dahil değilse (<, >) içi boş nokta kullanılır.`,
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
    },
    {
      id: "ucgenler",
      name: `Üçgenler`,
      summary: `Açılar, kenar bağıntıları ve Pisagor.`,
      youtubeId: "",
      mindMap: {
        center: `Üçgenler`,
        branches: [
          { label: `Açı Özellikleri`, detail: `Bir üçgenin iç açıları toplamı 180°'dir. Bir dış açı, kendisine komşu olmayan iki iç açının toplamına eşittir.` },
          { label: `Kenar-Açı İlişkisi`, detail: `En büyük açının karşısında en uzun kenar, en küçük açının karşısında en kısa kenar bulunur.` },
          { label: `Üçgen Eşitsizliği`, detail: `Bir kenar, diğer iki kenarın farkından büyük, toplamından küçüktür.` },
          { label: `Dik Üçgen ve Pisagor`, detail: `Dik üçgende a² + b² = c²; c, dik açının karşısındaki en uzun kenar olan hipotenüstür.` },
        ],
      },
      cards: [
        { front: `Üçgenin iç açıları toplamı kaçtır?`, back: `180°.` },
        { front: `Pisagor bağıntısı nedir?`, back: `Dik üçgende a²+b²=c² (c hipotenüs).` },
        { front: `3 ve 4 dik kenarlı dik üçgenin hipotenüsü?`, back: `5 (√(9+16)=√25).` },
        { front: `Üçgen eşitsizliği nedir?`, back: `Bir kenar, diğer ikisinin farkından büyük, toplamından küçüktür.` },
        { front: `Eşkenar üçgenin her açısı kaç derecedir?`, back: `60°.` },
      ],
      article: `## Açı Özellikleri
Bir üçgenin iç açıları toplamı her zaman 180°'dir. Bir dış açı ise kendisine komşu olmayan iki iç açının toplamına eşittir.

## Kenar-Açı İlişkisi ve Üçgen Eşitsizliği
Bir üçgende en büyük açının karşısında en uzun kenar bulunur. Üçgen eşitsizliğine göre bir kenarın uzunluğu, diğer iki kenarın farkından büyük ve toplamından küçük olmalıdır.

## Dik Üçgen ve Pisagor Bağıntısı
Dik üçgende dik kenarların kareleri toplamı, hipotenüsün karesine eşittir: a² + b² = c². Hipotenüs, dik açının karşısındaki en uzun kenardır. Örnek: dik kenarları 3 ve 4 olan üçgende hipotenüs √(9+16) = √25 = 5'tir.`,
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
    },
    {
      id: "donusum-geometrisi",
      name: `Dönüşüm Geometrisi`,
      summary: `Öteleme, yansıma ve döndürme.`,
      youtubeId: "",
      mindMap: {
        center: `Dönüşüm Geometrisi`,
        branches: [
          { label: `Öteleme`, detail: `Şeklin biçimini ve boyutunu değiştirmeden belirli bir yönde kaydırılmasıdır.` },
          { label: `Yansıma (Simetri)`, detail: `Bir doğruya (eksene) göre ters görüntü oluşturmadır; aynadaki görüntü gibidir.` },
          { label: `Döndürme`, detail: `Bir nokta etrafında belirli bir açıyla çevirmedir.` },
          { label: `Önemli Not`, detail: `Öteleme, yansıma ve döndürmede şeklin boyutu ve biçimi değişmez; şekiller eş kalır.` },
        ],
      },
      cards: [
        { front: `Öteleme nedir?`, back: `Şekli biçim/boyut değiştirmeden bir yönde kaydırmaktır.` },
        { front: `Yansıma nedir?`, back: `Bir doğruya (eksene) göre simetrik görüntü oluşturmaktır.` },
        { front: `Döndürme nedir?`, back: `Bir nokta etrafında belirli açıyla çevirmektir.` },
        { front: `Dönüşümlerde boyut değişir mi?`, back: `Hayır; şekil eş kalır (boyut ve biçim aynı).` },
        { front: `Aynadaki görüntü hangi dönüşümdür?`, back: `Yansıma.` },
      ],
      article: `## Öteleme, Yansıma ve Döndürme
Öteleme, bir şekli biçimini ve boyutunu değiştirmeden belirli bir yönde kaydırmaktır. Yansıma, bir doğruya (eksene) göre şeklin ters görüntüsünü oluşturmaktır; aynadaki görüntü buna örnektir. Döndürme ise bir nokta etrafında belirli bir açıyla çevirmektir.

## Önemli Özellik
Öteleme, yansıma ve döndürme dönüşümlerinde şeklin boyutu ve biçimi değişmez; yalnızca konumu veya yönü değişir. Bu yüzden oluşan yeni şekil ilk şekille eştir.`,
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
    },
    {
      id: "geometrik-cisimler",
      name: `Geometrik Cisimler`,
      summary: `Dik prizma ve dik silindir; hacim ve yüzey alanı.`,
      youtubeId: "",
      mindMap: {
        center: `Geometrik Cisimler`,
        branches: [
          { label: `Dik Prizmalar`, detail: `Hacim = taban alanı × yükseklik. Dikdörtgenler prizmasının hacmi a·b·c, küpün hacmi a³'tür.` },
          { label: `Dik Silindir`, detail: `Hacim = π·r²·h. Yüzey alanı = 2πr² + 2πrh.` },
          { label: `Piramit ve Koni`, detail: `Piramit ve koni de geometrik cisimlerdendir; bir tepe noktaları vardır.` },
        ],
      },
      cards: [
        { front: `Dik prizmanın hacmi nasıl bulunur?`, back: `Taban alanı × yükseklik.` },
        { front: `Silindirin hacmi nedir?`, back: `π·r²·h.` },
        { front: `Silindirin yüzey alanı nedir?`, back: `2πr² + 2πrh.` },
        { front: `Küpün hacmi nedir?`, back: `a³ (a: ayrıt uzunluğu).` },
        { front: `Küpün kaç yüzü vardır?`, back: `6.` },
      ],
      article: `## Dik Prizmalar
Bir dik prizmanın hacmi, taban alanı ile yüksekliğin çarpımına eşittir. Dikdörtgenler prizmasının hacmi a·b·c, küpün hacmi ise a³'tür (a: ayrıt uzunluğu).

## Dik Silindir
Taban yarıçapı r, yüksekliği h olan dik silindirin hacmi π·r²·h, yüzey alanı ise 2πr² + 2πrh'dir.

## Piramit ve Koni
Piramit ve koni de bir tepe noktasına sahip geometrik cisimlerdir.`,
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
    },
  ],
};
