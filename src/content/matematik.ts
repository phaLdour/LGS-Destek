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
              { kind: "ornek", content: `432 → 4+3+2 = 9 olduğu için hem 3'e hem 9'a bölünür.` },
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
          {
            label: `Karekök ve Tam Kareler`,
            sections: [
              { kind: "tanim", content: `√a (a ≥ 0): karesi a olan pozitif sayı. √16 = 4.` },
              { kind: "ornek", content: `Tam kareler: 1, 4, 9, 16, 25, 36, 49, 64...` },
            ],
          },
          {
            label: `Çarpma ve Bölme`,
            sections: [
              { kind: "formul", content: `√a · √b = √(a·b)   ve   √a ÷ √b = √(a÷b)` },
              { kind: "ornek", content: `√2 · √8 = √16 = 4.` },
            ],
          },
          {
            label: `Kök Dışına Alma`,
            sections: [
              { kind: "formul", content: `Kök içindeki tam kare çarpan dışarı çıkar: √12 = √(4·3) = 2√3.` },
              { kind: "ornek", content: `2√3 = √(4·3) = √12 (tersi).` },
            ],
          },
          {
            label: `Toplama ve Çıkarma`,
            sections: [
              { kind: "kural", content: `Yalnız kök içleri AYNI olanlar toplanır: 2√3 + 5√3 = 7√3.` },
              { kind: "tuzak", content: `√(9+16) ≠ √9 + √16. Doğrusu √25 = 5; karekök toplamaya dağılmaz.` },
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
              { kind: "ornek", content: `4, 6, 8, 10 → 28 ÷ 4 = 7.` },
            ],
          },
          {
            label: `Ortanca (Medyan)`,
            sections: [
              { kind: "kural", content: `Veriler SIRALANIR, ortadaki değerdir. Veri sayısı çiftse ortadaki ikisinin ortalaması alınır.` },
              { kind: "ornek", content: `10, 20, 30, 40 → (20+30) ÷ 2 = 25.` },
              { kind: "tuzak", content: `Sıralamadan medyan alınmaz: 5,1,3 → sıralı (1,3,5) → ortanca 3.` },
            ],
          },
          {
            label: `Tepe Değer (Mod)`,
            sections: [
              { kind: "tanim", content: `En çok tekrar eden değerdir.` },
              { kind: "ornek", content: `3, 7, 7, 2, 9 → mod 7.` },
            ],
          },
          {
            label: `Açıklık ve Grafikler`,
            sections: [
              { kind: "formul", content: `Açıklık = en büyük veri − en küçük veri.` },
              { kind: "ipucu", content: `Bütünün parçalara (yüzde) dağılımı için daire grafiği uygundur.` },
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
              { kind: "kural", content: `Sonuç daima 0 ile 1 arasındadır.` },
              { kind: "ornek", content: `Hilesiz zarda 3 gelme: 1 ÷ 6 = 1/6.` },
            ],
          },
          {
            label: `Kesin ve İmkânsız Olay`,
            sections: [
              { kind: "kural", content: `Kesin olayın olasılığı 1, imkânsız olayın olasılığı 0'dır.` },
              { kind: "tuzak", content: `Olasılık 1'den büyük olamaz; '1,5 olasılık' yoktur.` },
            ],
          },
          {
            label: `Örnekler`,
            sections: [
              { kind: "ornek", content: `Zarda çift (2,4,6): 3 ÷ 6 = 1/2. Torbada 3 kırmızı/5 top → 3/5.` },
              { kind: "soru", content: `'1–10 arasından seçilen sayı asal mı?' → 4/10 = 2/5.` },
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
              { kind: "ornek", content: `(x+3)² = x² + 6x + 9.` },
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
              { kind: "kural", content: `Bilinmeyen yalnız bırakılır; taraf değiştiren terimin işareti değişir.` },
              { kind: "ornek", content: `2x+3=11 → 2x=8 → x=4.` },
              { kind: "tuzak", content: `x+5=2 → x=7 YANLIŞ; doğrusu x = 2−5 = −3.` },
            ],
          },
          {
            label: `Koordinat Sistemi`,
            sections: [
              { kind: "tanim", content: `Nokta (x, y) ile gösterilir; x apsis, y ordinattır.` },
              { kind: "ornek", content: `(0, 5) noktası y ekseni üzerindedir.` },
            ],
          },
          {
            label: `Doğrunun Eğimi`,
            sections: [
              { kind: "formul", content: `Eğim = y'deki değişim ÷ x'teki değişim (dikey ÷ yatay).` },
              { kind: "tuzak", content: `Eğim = x ÷ y değildir; doğrusu y ÷ x'tir.` },
            ],
          },
          {
            label: `Doğru Grafiği`,
            sections: [
              { kind: "tanim", content: `Doğrusal bir denklemin grafiği koordinat düzleminde bir doğrudur.` },
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
              { kind: "tanim", content: `< küçüktür, > büyüktür, ≤ küçük eşit, ≥ büyük eşittir.` },
              { kind: "ornek", content: `"x > 3" → x, 3'ten büyüktür.` },
            ],
          },
          {
            label: `Eşitsizlik Çözme`,
            sections: [
              { kind: "kural", content: `Denklem gibi çözülür; negatif sayıyla çarpılıp bölününce YÖN DEĞİŞİR.` },
              { kind: "ornek", content: `−2x ≤ 6 → x ≥ −3 (yön döndü).` },
              { kind: "tuzak", content: `−2x < 6 → x < −3 YANLIŞ; yön değişir, doğrusu x > −3.` },
            ],
          },
          {
            label: `Sayı Doğrusunda Gösterim`,
            sections: [
              { kind: "kural", content: `≤ ve ≥ → içi DOLU nokta (sınır dahil); < ve > → içi BOŞ nokta (sınır hariç).` },
              { kind: "tuzak", content: `x ≤ 5'te 5 dahildir; içi DOLU nokta gösterilir.` },
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
              { kind: "ornek", content: `3-4-5 ve 6-8-10 dik üçgenleri.` },
              { kind: "tuzak", content: `Hipotenüs en uzun kenardır ve dik açının karşısındadır.` },
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
            ],
          },
          {
            label: `Yansıma (Simetri)`,
            sections: [
              { kind: "tanim", content: `Bir doğruya (eksene) göre ters görüntü oluşturmaktır; aynadaki görüntü gibidir.` },
              { kind: "tuzak", content: `Aynadaki görüntü öteleme DEĞİL, yansımadır.` },
            ],
          },
          {
            label: `Döndürme`,
            sections: [
              { kind: "tanim", content: `Bir nokta etrafında belirli bir açıyla çevirmektir.` },
            ],
          },
          {
            label: `Önemli Not`,
            sections: [
              { kind: "kural", content: `Üç dönüşümde de şekil EŞ kalır; boyut ve biçim değişmez.` },
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
              { kind: "formul", content: `Hacim = taban alanı × yükseklik. Küpün hacmi = a³.` },
              { kind: "ornek", content: `Ayrıtları 2, 3, 4 cm: 2·3·4 = 24 cm³.` },
              { kind: "tuzak", content: `Taban ÇEVRESİ değil, taban ALANI kullanılır.` },
            ],
          },
          {
            label: `Dik Silindir`,
            sections: [
              { kind: "formul", content: `Hacim = π·r²·h. Yüzey alanı = 2πr² + 2πrh.` },
              { kind: "ornek", content: `r=5, h=10, π=3 → 3·25·10 = 750 cm³.` },
              { kind: "tuzak", content: `Hacim 2πrh DEĞİLDİR; 2πrh yan yüzey alanıdır.` },
            ],
          },
          {
            label: `Piramit ve Koni`,
            sections: [
              { kind: "tanim", content: `Bir tepe noktasına sahip geometrik cisimlerdir.` },
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
    },
  ],
};
