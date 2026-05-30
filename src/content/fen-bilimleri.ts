import type { SubjectContent } from "./types";

/**
 * Fen Bilimleri (LGS 8. sınıf) üniteleri.
 * İçerik girilmeyen alanlar konu sayfasında "yakında" görünür.
 */
export const FEN_BILIMLERI: SubjectContent = {
  slug: "fen-bilimleri",
  name: "Fen Bilimleri",
  topics: [
    {
      id: "mevsimler-ve-iklim",
      name: "Mevsimler ve İklim",
      summary: "Mevsimlerin oluşumu, iklim ve hava olayları.",
      youtubeId: "ExVCYz3M5RQ",
      mindMap: {
        center: "Mevsimler ve İklim",
        branches: [
          {
            label: "Mevsimlerin Oluşumu",
            sections: [
              { kind: "tanim", content: "Dünya'nın ekseni 23,5° eğiktir ve Güneş etrafında dolanır; bu, ışınların düşme açısını değiştirir." },
              { kind: "kural", content: "21 Haziran KYK'da yaz, 21 Aralık kış başlar. 21 Mart ve 23 Eylül ekinokslarında gece = gündüz (12-12)." },
              { kind: "ornek", content: "21 Haziran → Yengeç Dönencesi'ne dik, KYK'da en uzun gündüz, yaz. 21 Aralık → Oğlak Dönencesi'ne dik, KYK'da en uzun gece, kış. 21 Mart ve 23 Eylül → Ekvator'a dik, her yerde 12-12 saat (ekinoks)." },
              { kind: "tuzak", content: "Mevsimlerin sebebi Dünya'nın Güneş'e uzaklığı DEĞİL, eksen eğikliğidir." },
            ],
          },
          {
            label: "İklim ve Hava Hareketleri",
            sections: [
              { kind: "tanim", content: "Isınan hava yükselip alçak basınç, soğuyan hava alçalıp yüksek basınç oluşturur. Rüzgar yüksekten alçağa eser." },
              { kind: "ornek", content: "Gökyüzüne yakın yağışlar: yağmur, kar, dolu. Yeryüzüne yakın: çiğ, kırağı, sis." },
              { kind: "ipucu", content: "Alçak basınç alanlarında bulut ve yağış ihtimali yüksektir." },
            ],
          },
          {
            label: "Küresel İklim Değişikliği",
            sections: [
              { kind: "tanim", content: "İklim, geniş bölgelerde 30-40 yıllık hava olaylarının ortalamasıdır (klimatoloji inceler)." },
              { kind: "tuzak", content: "Hava olayı ile iklim aynı değildir; tek bir günün havası iklimi göstermez." },
              { kind: "ornek", content: "Fosil yakıtlar → sera gazı artışı → küresel ısınma → buzul erimesi, deniz seviyesinin yükselmesi." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Mevsimler neden oluşur?",
          back: "Dünya'nın ekseninin 23,5° eğik olması ve Güneş etrafında dolanması nedeniyle; bu, birim yüzeye düşen enerji miktarını ve ışınların düşme açısını değiştirir.",
        },
        {
          front: "21 Haziran'da ne olur?",
          back: "Güneş ışınları Yengeç Dönencesi'ne dik (90°) düşer. Kuzey Yarım Küre'de en uzun gündüz yaşanır ve yaz başlar; Güney Yarım Küre'de kış başlar.",
        },
        {
          front: "21 Aralık'ta ne olur?",
          back: "Güneş ışınları Oğlak Dönencesi'ne dik düşer. Kuzey Yarım Küre'de en uzun gece yaşanır ve kış başlar; Güney Yarım Küre'de yaz başlar.",
        },
        {
          front: "Ekinoks (21 Mart / 23 Eylül) nedir?",
          back: "Güneş ışınları Ekvator'a dik düşer; tüm dünyada gece ve gündüz eşit (12-12 saat) olur. Bahar mevsimlerinin başlangıcıdır.",
        },
        {
          front: "Rüzgar nasıl oluşur?",
          back: "Yüksek basınçtan alçak basınca doğru yatay hava hareketidir. Isınan hava yükselip alçak basıncı, soğuyan hava alçalıp yüksek basıncı oluşturur.",
        },
        {
          front: "Hava olayları ile iklim arasındaki fark nedir?",
          back: "Hava olayları kısa sürelidir (meteoroloji inceler). İklim ise geniş bölgelerde uzun yıllar (30-40 yıl) süren hava olaylarının ortalamasıdır (klimatoloji inceler).",
        },
        {
          front: "Yağış türleri nerede oluşur?",
          back: "Gökyüzüne yakın: yağmur, kar, dolu. Yeryüzüne yakın: çiğ, kırağı, sis.",
        },
      ],
      article: `# Mevsimlerin Oluşumu
Mevsimler, Dünya'nın ekseninin **23,5° eğik** olması ve Güneş etrafında **dolanması** nedeniyle oluşur. Eksen eğikliği, Güneş ışınlarının düşme açısını ve birim yüzeye düşen enerjiyi değiştirir. Işınların dik geldiği yerde sıcaklık artar, gölge boyu kısalır.
[tuzak] Mevsimlerin sebebi Dünya'nın Güneş'e uzaklığı DEĞİLDİR; eksen eğikliğidir.

# Önemli Tarihler
- **21 Haziran:** Işınlar Yengeç Dönencesi'ne dik gelir. Kuzey Yarım Küre'de en uzun gündüz, yaz başlar.
- **21 Aralık:** Işınlar Oğlak Dönencesi'ne dik gelir. Kuzey Yarım Küre'de en uzun gece, kış başlar.
- **21 Mart ve 23 Eylül (Ekinoks):** Işınlar Ekvator'a dik gelir; her yerde gece = gündüz (12-12 saat).
[tuzak] "21 Aralık'ta Kuzey Yarım Küre'de en uzun gündüz" ifadesi yanlıştır; en uzun GECE yaşanır.
[soru] "Hangi tarihte Kuzey Yarım Küre'de gündüz en uzundur?" → 21 Haziran.

# Hava Olayları ve Basınç
Isınan hava yükselir ve **alçak basınç**, soğuyan hava alçalır ve **yüksek basınç** oluşturur. Rüzgar, yüksek basınçtan alçak basınca doğru esen yatay hava hareketidir.
[ipucu] Alçak basınç alanlarında bulut ve yağış ihtimali yüksektir.
[örnek] Gökyüzüne yakın yağışlar: yağmur, kar, dolu. Yeryüzüne yakın: çiğ, kırağı, sis.

# İklim ve İklim Değişikliği
İklim, geniş bir bölgede **30-40 yıl** süren hava olaylarının ortalamasıdır ve **klimatoloji** inceler. Kısa süreli hava olaylarını ise **meteoroloji** inceler.
[tuzak] Hava olayı ile iklim karıştırılmamalı; "bugün yağmurlu, demek iklim yağışlı" yanlıştır.
[örnek] Fosil yakıt kullanımı → sera gazlarının artışı → küresel ısınma → buzulların erimesi ve deniz seviyesinin yükselmesi.`,
      tips: [
        {
          trap: "Mevsimlerin sebebi Dünya'nın Güneş'e uzaklığı sanılır; bu yanlıştır.",
          wrong: "Yaz, Dünya Güneş'e yaklaştığı için olur.",
          correct:
            "Mevsimler eksen eğikliği (23,5°) ve ışınların düşme açısı yüzünden oluşur; uzaklıkla ilgili değildir.",
        },
        {
          trap: "Sorularda 'en uzun gece' ile 'en uzun gündüz' karıştırılır.",
          wrong: "21 Aralık'ta Kuzey Yarım Küre'de en uzun gündüz yaşanır.",
          correct:
            "21 Aralık'ta Kuzey Yarım Küre'de en uzun GECE yaşanır (kış başlangıcı).",
        },
        {
          trap: "Hava olayı ile iklim eş anlamlı sanılır.",
          wrong: "Bugün hava yağışlı, demek ki bu bölgenin iklimi yağışlıdır.",
          correct:
            "İklim 30-40 yıllık ortalamadır; tek bir günün havası iklimi göstermez.",
        },
      ],
      quiz: [
        {
          question: "Mevsimlerin oluşmasının temel nedeni nedir?",
          options: [
            "Dünya'nın Güneş'e uzaklığının değişmesi",
            "Dünya'nın ekseninin eğik olması ve dolanma hareketi",
            "Güneş'in büyüklüğünün değişmesi",
            "Ay'ın Dünya etrafında dönmesi",
          ],
          correctIndex: 1,
          explanation:
            "Eksen eğikliği (23,5°) ve dolanma, ışınların düşme açısını değiştirir.",
        },
        {
          question: "21 Haziran'da Kuzey Yarım Küre'de hangisi yaşanır?",
          options: [
            "En uzun gece ve kış başlangıcı",
            "Gece-gündüz eşitliği",
            "En uzun gündüz ve yaz başlangıcı",
            "Sonbahar başlangıcı",
          ],
          correctIndex: 2,
        },
        {
          question:
            "Güneş ışınlarının Ekvator'a dik düştüğü, gece ve gündüzün eşit olduğu tarihler hangileridir?",
          options: [
            "21 Haziran - 21 Aralık",
            "21 Mart - 23 Eylül",
            "1 Ocak - 1 Temmuz",
            "23 Nisan - 19 Mayıs",
          ],
          correctIndex: 1,
        },
        {
          question: "Rüzgar nasıl oluşur?",
          options: [
            "Alçak basınçtan yüksek basınca hava hareketiyle",
            "Yüksek basınçtan alçak basınca hava hareketiyle",
            "Sadece deniz kenarında",
            "Havanın yalnızca dikey hareketiyle",
          ],
          correctIndex: 1,
        },
        {
          question: "Aşağıdaki yağışlardan hangisi yeryüzüne yakın oluşur?",
          options: ["Yağmur", "Kar", "Dolu", "Çiğ"],
          correctIndex: 3,
        },
        {
          question: "İklimi (uzun süreli ortalamayı) inceleyen bilim dalı hangisidir?",
          options: ["Meteoroloji", "Klimatoloji", "Astronomi", "Jeoloji"],
          correctIndex: 1,
        },
        {
          question: "21 Aralık'ta Güney Yarım Küre'de hangi mevsim başlar?",
          options: ["Kış", "İlkbahar", "Yaz", "Sonbahar"],
          correctIndex: 2,
        },
        {
          question:
            "Aşağıdakilerden hangisi küresel iklim değişikliğinin sonucu DEĞİLDİR?",
          options: [
            "Buzulların erimesi",
            "Deniz seviyesinin yükselmesi",
            "Aşırı hava olaylarının artması",
            "Dünya'nın eksen eğikliğinin azalması",
          ],
          correctIndex: 3,
        },
      ],
      quickQuestions: [
        {
          question: "Mevsimlerin oluşmasının temel nedeni nedir?",
          options: [
            "Dünya'nın Güneş'e uzaklığı",
            "Eksen eğikliği ve dolanma",
            "Ay'ın evreleri",
            "Rüzgarlar",
          ],
          correctIndex: 1,
        },
        {
          question: "Aşağıdaki yağışlardan hangisi yeryüzüne yakın oluşur?",
          options: ["Yağmur", "Kar", "Dolu", "Çiğ"],
          correctIndex: 3,
        },
        {
          question: "Rüzgar nasıl oluşur?",
          options: [
            "Yüksek basınçtan alçak basınca",
            "Alçak basınçtan yüksek basınca",
            "Sadece denizde",
            "Sadece dağda",
          ],
          correctIndex: 0,
        },
      ],
    },
    {
      id: "dna-ve-genetik-kod",
      name: "DNA ve Genetik Kod",
      summary: "DNA, genler, kalıtım ve mutasyonlar.",
      youtubeId: "eS9XWivFxR4",
      mindMap: {
        center: "DNA ve Genetik Kod",
        branches: [
          {
            label: "Kalıtsal Yapıların Hiyerarşisi",
            sections: [
              { kind: "kural", content: "Büyükten küçüğe: Kromozom > DNA > Gen > Nükleotit." },
              { kind: "tanim", content: "Kromozom en karmaşık, nükleotit en küçük yapı birimidir." },
              { kind: "tuzak", content: "Soruda 'DNA' yerine 'DNA'nın tek zinciri' yazılarak şaşırtılır; DNA çift zincirlidir." },
            ],
          },
          {
            label: "Nükleotit Bileşenleri",
            sections: [
              { kind: "tanim", content: "Bir nükleotit fosfat, şeker ve organik bazdan oluşur." },
              { kind: "kural", content: "Organik bazlar Adenin, Timin, Guanin, Sitozin'dir; baza göre 4 çeşit nükleotit vardır." },
              { kind: "ornek", content: "4 çeşit nükleotit: Adenin (A), Timin (T), Guanin (G), Sitozin (S). DNA'da A daima T ile, G daima S ile eşleşir; A=T ve G=S sayıları eşittir." },
            ],
          },
          {
            label: "DNA Eşleşme Kuralları",
            sections: [
              { kind: "formul", content: "Bazlar karşılıklı eşleşir: Adenin – Timin (A–T) ve Guanin – Sitozin (G–C)." },
              { kind: "ornek", content: "Bir zincir A-G-C-T ise karşı zincir T-C-G-A olur." },
              { kind: "soru", content: "'Bir zincirde 30 Adenin varsa karşısında kaç Timin vardır?' → 30." },
            ],
          },
          {
            label: "DNA'nın Kendini Eşlemesi",
            sections: [
              { kind: "tanim", content: "Bölünmeden önce çift zincir açılır, her zincir kendine eş yeni bir zincir oluşturur → iki özdeş DNA." },
            ],
          },
          {
            label: "Hatalar ve Onarım",
            sections: [
              { kind: "tanim", content: "Baz dizilişinde oluşan kalıcı değişikliklere mutasyon denir." },
              { kind: "istisna", content: "Hücre çoğu hatayı onarır; onarılamayan değişiklikler kalıtsal olabilir." },
            ],
          },
          {
            label: "Kalıtım Kavramları",
            sections: [
              { kind: "tanim", content: "Gen, alel, baskın (dominant) ve çekinik (resesif) kavramlarıyla özellikler aktarılır." },
              { kind: "ipucu", content: "Baskın özellik, çekinik özelliği bastırır." },
            ],
          },
          {
            label: "Cinsiyet Belirlenmesi",
            sections: [
              { kind: "kural", content: "İnsanda cinsiyet: XX dişi, XY erkektir." },
              { kind: "tuzak", content: "Cinsiyeti belirleyen kromozom babadan gelir." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Kalıtsal yapıları büyükten küçüğe sırala.",
          back: "Kromozom > DNA > Gen > Nükleotit. Kromozom en karmaşık, nükleotit en küçük yapı birimidir.",
        },
        {
          front: "Kromozom nedir?",
          back: "Hücre çekirdeğinde bulunan, DNA'nın protein kılıfla kaplanmasıyla oluşan yapıdır. Hücre bölünmesi öncesinde kısalıp kalınlaşarak belirginleşir.",
        },
        {
          front: "DNA'nın görevi nedir?",
          back: "Hücrenin yönetici molekülüdür; solunum, beslenme, üreme gibi yaşamsal faaliyetleri kontrol eder. Çift zincirli sarmal yapıdadır.",
        },
        {
          front: "Gen nedir?",
          back: "DNA'nın anlamlı parçalarıdır; göz rengi, kan grubu gibi belirli kalıtsal özelliklerin ortaya çıkmasını sağlar.",
        },
        {
          front: "Nükleotit neyden oluşur?",
          back: "Fosfat, şeker ve organik bazdan (Adenin, Timin, Guanin, Sitozin). İçerdiği organik baza göre adlandırılır.",
        },
        {
          front: "DNA kendini nasıl eşler?",
          back: "Hücre bölünmesinden önce çift zincir açılır ve her zincir kendine uygun yeni bir zincir oluşturur. Böylece kalıtsal bilgi kopyalanır.",
        },
      ],
      article: `# Kalıtsal Yapıların Hiyerarşisi
[kural] Büyükten küçüğe: **Kromozom > DNA > Gen > Nükleotit**.
- **Kromozom:** DNA'nın protein kılıfla sarılmasıyla oluşan, en karmaşık yapı.
- **DNA:** Hücrenin yönetici molekülü; **çift zincirli sarmal** yapıdadır.
- **Gen:** DNA'nın anlamlı parçası (göz rengi, kan grubu gibi özellikleri belirler).
- **Nükleotit:** En küçük yapı birimi.
[tuzak] Soruda "DNA" yerine "DNA'nın tek zinciri" yazılarak şaşırtılır; DNA çift zincirlidir.

# Nükleotit Bileşenleri
Bir nükleotit **fosfat + şeker + organik baz**tan oluşur. Organik bazlar: **Adenin, Timin, Guanin, Sitozin**.
[kural] Organik baza göre 4 çeşit nükleotit vardır; sayı ve diziliş farkı biyolojik çeşitliliği sağlar.

# DNA Eşleşme Kuralları
[formül] Bazlar karşılıklı eşleşir: **Adenin – Timin (A–T)** ve **Guanin – Sitozin (G–C)**.
[örnek] Bir zincir A-G-C-T ise karşı zincir T-C-G-A olur.
[soru] "Bir zincirde 30 Adenin varsa karşısında kaç Timin bulunur?" → **30** (A=T eşleşmesi).

# DNA'nın Kendini Eşlemesi
Hücre bölünmesinden önce çift zincir açılır ve her zincir kendine uygun yeni bir zincir oluşturur; sonuçta birbirinin aynısı **iki DNA** meydana gelir.

# Kalıtım ve Cinsiyet
- **Mutasyon:** Baz dizilişindeki kalıcı değişiklik.
- **Kalıtım:** Gen, alel, baskın (dominant) ve çekinik (resesif) kavramlarıyla aktarılır.
- **Cinsiyet:** İnsanda **XX dişi, XY erkek**tir.
[tuzak] Cinsiyeti belirleyen kromozom **babadan** gelir.`,
      tips: [
        {
          trap: "Sorularda 'DNA' yerine 'DNA'nın tek zinciri' yazılarak dikkatsiz öğrenci şaşırtılır.",
          wrong: "DNA tek zincirden oluşur.",
          correct:
            "DNA çift zincirli (sarmal) yapıdadır; 'tek zincir' ifadesi tuzaktır.",
        },
        {
          trap: "Gen ile DNA aynı şey sanılır.",
          wrong: "Gen, DNA'nın tamamıdır.",
          correct:
            "Gen, DNA'nın anlamlı bir parçasıdır; bir DNA çok sayıda gen içerir.",
        },
        {
          trap: "Nükleotit çeşidi karıştırılır.",
          wrong: "4 çeşit baz olduğu için 2 çeşit nükleotit vardır.",
          correct:
            "Organik baza göre 4 çeşit nükleotit vardır (Adenin, Timin, Guanin, Sitozin).",
        },
      ],
      quiz: [
        {
          question: "Kalıtsal yapıların büyükten küçüğe doğru sıralaması hangisidir?",
          options: [
            "Nükleotit > Gen > DNA > Kromozom",
            "Kromozom > DNA > Gen > Nükleotit",
            "DNA > Kromozom > Gen > Nükleotit",
            "Gen > DNA > Nükleotit > Kromozom",
          ],
          correctIndex: 1,
        },
        {
          question: "DNA'nın yapısıyla ilgili doğru ifade hangisidir?",
          options: [
            "Tek zincirlidir",
            "Çift zincirli sarmal yapıdadır",
            "Yalnızca proteinden oluşur",
            "Sadece sinir hücrelerinde bulunur",
          ],
          correctIndex: 1,
          explanation: "Soru kökünde 'tek zincir' ifadesi sık kullanılan bir tuzaktır.",
        },
        {
          question: "Nükleotidin yapısında aşağıdakilerden hangisi BULUNMAZ?",
          options: ["Fosfat", "Şeker", "Organik baz", "Protein"],
          correctIndex: 3,
        },
        {
          question: "Gen nedir?",
          options: [
            "Hücrenin enerji birimi",
            "DNA'nın anlamlı bir parçası",
            "Kromozomun protein kılıfı",
            "Hücre zarının bir bölümü",
          ],
          correctIndex: 1,
        },
        {
          question: "DNA kendini ne zaman eşler?",
          options: [
            "Hücre bölünmesinden önce",
            "Hücre öldüğünde",
            "Solunum sırasında",
            "Hiçbir zaman",
          ],
          correctIndex: 0,
        },
        {
          question: "Bir DNA zincirinde Adenin (A) karşısına hangi baz gelir?",
          options: ["Guanin", "Sitozin", "Timin", "Adenin"],
          correctIndex: 2,
          explanation: "Eşleşme kuralı: A-T ve G-C.",
        },
        {
          question: "Kromozom hangi yapıların birleşmesiyle oluşur?",
          options: ["DNA + protein", "Su + tuz", "Gen + şeker", "Fosfat + baz"],
          correctIndex: 0,
        },
        {
          question: "Organik baza göre kaç çeşit nükleotit vardır?",
          options: ["2", "3", "4", "6"],
          correctIndex: 2,
        },
      ],
    },
    {
      id: "basinc",
      name: "Basınç",
      summary: "Katı, sıvı ve gaz basıncı; günlük hayatta basınç.",
      youtubeId: "ND2vISQNLUM",
      mindMap: {
        center: "Basınç",
        branches: [
          {
            label: "Katı Basıncı",
            sections: [
              { kind: "formul", content: "P = G / S (Basınç = Ağırlık / Yüzey Alanı)." },
              { kind: "kural", content: "Ağırlık artınca basınç artar (doğru orantı); yüzey alanı artınca basınç azalır (ters orantı)." },
              { kind: "ornek", content: "Basıncı artıran: bıçağın sivri ucu, çivinin sivri ucu, iğne, krampon çivisi, paten bıçağı. Basıncı azaltan: kar ayakkabısı, kayak, tırların çok tekerleği, iş makinesi paletleri, develerin geniş tabanı (çölde), tank paleti." },
              { kind: "ornek", content: "Sayısal: 60 N ağırlık, 0,3 m² yüzeyde → P = 60/0,3 = 200 N/m² (Pa)." },
              { kind: "tuzak", content: "'Yüzey alanı artınca basınç artar' YANLIŞ; ters orantı vardır." },
            ],
          },
          {
            label: "Sıvı Basıncı",
            sections: [
              { kind: "kural", content: "Yalnız derinliğe (h) ve sıvının yoğunluğuna (d) bağlıdır; kabın şekline ve sıvı miktarına bağlı DEĞİLDİR." },
              { kind: "formul", content: "Pascal Prensibi: kapalı kaptaki sıvıya uygulanan basınç, her noktaya aynen iletilir." },
              { kind: "ornek", content: "Günlük örnekler: baraj duvarının altı daha kalın yapılır (alttaki basınç fazla); su deposu yükseğe kurulur (yüksek basınç → uzak ev); denizaltıların derinlik sınırı; itfaiye hortumlarında basınç; hidrolik frenler ve liftler." },
              { kind: "ornek", content: "Yoğunluk etkisi: deniz suyunda (tuzlu) batmadan yüzmek tatlı sudan kolaydır; deniz suyu daha YOĞUN → daha çok basınç ve kaldırma kuvveti." },
              { kind: "tuzak", content: "'Geniş kapta sıvı basıncı daha fazladır' YANLIŞ; kabın şekli basıncı etkilemez." },
            ],
          },
          {
            label: "Gaz (Açık Hava) Basıncı",
            sections: [
              { kind: "tanim", content: "Atmosferdeki havanın ağırlığından kaynaklanan basınçtır." },
              { kind: "kural", content: "Deniz seviyesinden yükseğe çıkıldıkça açık hava basıncı azalır (yükseklik ↑ → basınç ↓)." },
              { kind: "ornek", content: "Günlük örnekler: pipetle içecek içme, vantuzun duvara yapışması, meyve suyu kutusunun büzülmesi, vakumlu paketler, otomobil hava yastıkları, balon şişirme, lastiklerin patlaması, yüksekte kulağın çınlaması." },
              { kind: "ornek", content: "Ölçüm: ilk kez Torricelli (1643) cıvalı barometre ile ölçtü; deniz seviyesinde 1 atm ≈ 76 cm cıva sütunu." },
              { kind: "tuzak", content: "'Yükseğe çıkınca basınç artar' YANLIŞ; basınç azalır (hava sütunu kısalır)." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Katı basıncı neye bağlıdır?",
          back: "Ağırlığa (kuvvet) ve yüzey alanına. P = G / S. Ağırlık artınca basınç artar (doğru orantı); yüzey alanı artınca basınç azalır (ters orantı).",
        },
        {
          front: "Katı basıncını nasıl artırırız/azaltırız?",
          back: "Yüzey alanını küçültmek basıncı artırır (bıçağın keskin ucu, çivinin sivri ucu). Yüzeyi genişletmek azaltır (kar ayakkabısı, iş makinesi paletleri).",
        },
        {
          front: "Sıvı basıncı neye bağlıdır?",
          back: "Sıvının derinliğine (h) ve yoğunluğuna (d); ikisi de artarsa basınç artar. Kabın şekline ve sıvı miktarına bağlı DEĞİLDİR.",
        },
        {
          front: "Pascal Prensibi nedir?",
          back: "Kapalı bir kaptaki sıvıya uygulanan basınç, sıvının her noktasına ve kabın iç yüzeyine aynen iletilir. Hidrolik frenler bu ilkeyle çalışır.",
        },
        {
          front: "Açık hava basıncı yükseklikle nasıl değişir?",
          back: "Deniz seviyesinden yukarı çıkıldıkça açık hava (gaz) basıncı azalır (ters orantı).",
        },
        {
          front: "Açık hava basıncını ölçen deney hangisidir?",
          back: "Torricelli deneyi.",
        },
      ],
      article: `# Katı Basıncı
Katı basıncı, birim yüzeye etki eden dik kuvvettir.
[formül] **P = G / S** (Basınç = Ağırlık / Yüzey Alanı)
[kural] Ağırlık artarsa basınç **artar**; temas yüzeyi artarsa basınç **azalır** (ters orantı).
[örnek] Bıçağın keskin ucu ve çivinin sivri ucu yüzeyi küçülterek basıncı artırır. Kar ayakkabısı ve iş makinesi paletleri yüzeyi büyüterek basıncı azaltır.
[soru] "Aynı ağırlıktaki cisim hangi yüzeyiyle yere daha çok basınç yapar?" → en **dar** yüzeyiyle.

# Sıvı Basıncı
[kural] Sıvı basıncı yalnız **derinliğe (h)** ve **yoğunluğa (d)** bağlıdır; kabın şekline ve sıvı miktarına bağlı **değildir**.
[formül] **Pascal Prensibi:** Kapalı bir kaptaki sıvıya uygulanan basınç, sıvının her noktasına ve kabın iç yüzeyine aynen iletilir.
[örnek] Baraj duvarlarının alt kısmı daha kalın yapılır; hidrolik frenler ve itfaiye merdivenleri bu ilkeyle çalışır.
[tuzak] "Daha geniş kapta sıvı basıncı daha fazladır" yanlıştır; kabın şekli basıncı etkilemez.

# Gaz (Açık Hava) Basıncı
Atmosferdeki havanın ağırlığı, temas ettiği yüzeylere basınç uygular.
[kural] Deniz seviyesinden yükseğe çıkıldıkça açık hava basıncı **azalır**.
[örnek] Pipetle içecek içme, vantuzun duvara yapışması açık hava basıncıyla açıklanır. İlk kez **Torricelli deneyi** ile ölçülmüştür.
[tuzak] "Yükseğe çıkınca açık hava basıncı artar" yanlıştır; azalır.`,
      tips: [
        {
          trap: "Katı basıncında yüzey alanı ile basınç ilişkisi ters kurulur.",
          wrong: "Yüzey alanı arttıkça katı basıncı artar.",
          correct:
            "Yüzey alanı arttıkça katı basıncı AZALIR (ters orantı); P = G / S.",
        },
        {
          trap: "Sıvı basıncının kabın şekline/miktarına bağlı olduğu sanılır.",
          wrong: "Daha geniş ve dolu kapta sıvı basıncı daha fazladır.",
          correct:
            "Sıvı basıncı yalnız derinlik ve yoğunluğa bağlıdır; kabın şekline ve miktarına bağlı değildir.",
        },
        {
          trap: "Yükseklikle açık hava basıncı ilişkisi karıştırılır.",
          wrong: "Yükseğe çıkıldıkça açık hava basıncı artar.",
          correct: "Yükseğe çıkıldıkça açık hava basıncı AZALIR.",
        },
      ],
      quiz: [
        {
          question: "Katı basıncı hangi formülle hesaplanır?",
          options: ["P = S / G", "P = G / S", "P = G × S", "P = G + S"],
          correctIndex: 1,
        },
        {
          question:
            "Bıçağın sivri (keskin) ucunun kesmeyi kolaylaştırması neyle açıklanır?",
          options: [
            "Yüzey alanı küçüldüğü için basınç artar",
            "Ağırlık arttığı için basınç artar",
            "Yüzey alanı büyüdüğü için basınç artar",
            "Basınç azaldığı için keser",
          ],
          correctIndex: 0,
        },
        {
          question: "Sıvı basıncı aşağıdakilerden hangisine bağlı DEĞİLDİR?",
          options: [
            "Sıvının derinliği",
            "Sıvının yoğunluğu",
            "Kabın şekli",
            "Sıvı sütununun yüksekliği",
          ],
          correctIndex: 2,
          explanation:
            "Sıvı basıncı derinlik (sütun yüksekliği) ve yoğunluğa bağlıdır; kabın şekline bağlı değildir.",
        },
        {
          question: "Pascal Prensibi aşağıdaki sistemlerden hangisinde kullanılır?",
          options: ["Hidrolik fren", "Bisiklet zinciri", "Kaldıraç", "Termometre"],
          correctIndex: 0,
        },
        {
          question:
            "Deniz seviyesinden yükseğe çıkıldıkça açık hava basıncı nasıl değişir?",
          options: ["Artar", "Azalır", "Değişmez", "Önce artar sonra sabit kalır"],
          correctIndex: 1,
        },
        {
          question: "Açık hava basıncını ilk kez ölçen deney hangisidir?",
          options: ["Pascal deneyi", "Torricelli deneyi", "Arşimet deneyi", "Newton deneyi"],
          correctIndex: 1,
        },
        {
          question:
            "Kar üzerinde batmamak için geniş tabanlı kar ayakkabısı giyilmesinin nedeni nedir?",
          options: [
            "Yüzey alanını artırıp basıncı azaltmak",
            "Ağırlığı artırmak",
            "Basıncı artırmak",
            "Yüzey alanını azaltmak",
          ],
          correctIndex: 0,
        },
        {
          question:
            "Aynı ağırlıktaki bir cisim hangi durumda yere daha çok basınç uygular?",
          options: [
            "Geniş yüzeyiyle durunca",
            "Dar yüzeyiyle durunca",
            "Yan yatınca",
            "Yüzey alanı basıncı etkilemez",
          ],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "madde-ve-endustri",
      name: "Madde ve Endüstri",
      summary: "Periyodik sistem, kimyasal tepkimeler, asit-baz.",
      youtubeId: "g85NYUICYt8",
      mindMap: {
        center: "Madde ve Endüstri",
        branches: [
          {
            label: "Periyodik Sistem",
            sections: [
              { kind: "tanim", content: "Elementler artan atom numarasına göre dizilir." },
              { kind: "kural", content: "Yatay sıralar periyot, dikey sütunlar gruptur; aynı grup benzer özellik gösterir." },
              { kind: "ornek", content: "Metaller solda/ortada, ametaller sağ üstte, soy gazlar en sağda." },
            ],
          },
          {
            label: "Fiziksel ve Kimyasal Değişim",
            sections: [
              { kind: "kural", content: "Fiziksel: yeni madde yok (buz erimesi). Kimyasal: yeni madde var (yanma, paslanma)." },
              { kind: "tuzak", content: "Buzun erimesi kimyasal sanılır; fizikseldir (yeni madde oluşmaz)." },
            ],
          },
          {
            label: "Kimyasal Tepkimeler",
            sections: [
              { kind: "kural", content: "Atomlar yok olmaz/oluşmaz; girenlerdeki atom sayısı ürünlerdekiyle aynıdır (kütlenin korunumu)." },
              { kind: "soru", content: "'Atom sayıları korunmuş mu?' → her elementin atom sayısı iki tarafta eşit olmalı." },
            ],
          },
          {
            label: "Asitler ve Bazlar",
            sections: [
              { kind: "kural", content: "Asit pH < 7, nötr pH = 7 (saf su), baz pH > 7." },
              { kind: "ornek", content: "Asit örnekleri: limon (sitrik asit), sirke (asetik asit), kola, mide asidi (HCl). Baz örnekleri: sabun, deterjan, çamaşır suyu, sodyum bikarbonat (karbonat)." },
              { kind: "kural", content: "Asit mavi turnusolü kırmızıya, baz kırmızı turnusolü maviye çevirir." },
              { kind: "tuzak", content: "pH büyüdükçe asitlik ARTMAZ; bazlık artar." },
            ],
          },
          {
            label: "Maddenin Isı ile Etkileşimi",
            sections: [
              { kind: "kural", content: "Hâl değişimi sırasında sıcaklık sabit kalır." },
              { kind: "tanim", content: "Erime-donma ve buharlaşma-yoğuşma birbirinin tersidir." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Periyot ve grup nedir?",
          back: "Periyodik tabloda yatay sıralara periyot, dikey sütunlara grup denir.",
        },
        {
          front: "Kâğıdın yanması fiziksel mi kimyasal mı?",
          back: "Kimyasal değişimdir; yeni madde oluşur.",
        },
        {
          front: "Asit, baz ve nötr pH değerleri?",
          back: "Asit pH < 7, nötr pH = 7, baz pH > 7.",
        },
        {
          front: "Kütlenin korunumu nedir?",
          back: "Kimyasal tepkimede giren atom sayısı = çıkan atom sayısı; kütle korunur.",
        },
        {
          front: "Hâl değişiminde sıcaklık ne olur?",
          back: "Hâl değişimi süresince sıcaklık sabit kalır.",
        },
      ],
      article: `# Periyodik Sistem
Elementler **artan atom numarasına** göre dizilir.
[kural] Yatay sıralara **periyot**, dikey sütunlara **grup** denir; aynı gruptaki elementlerin kimyasal özellikleri benzerdir.
[örnek] Metaller solda ve ortada, ametaller sağ üstte, soy gazlar en sağ sütundadır.

# Fiziksel ve Kimyasal Değişim
[kural] **Fiziksel değişim:** yeni madde oluşmaz, yalnız dış görünüş değişir. **Kimyasal değişim:** yeni madde oluşur.
[örnek] Fiziksel: buzun erimesi, şekerin çözünmesi. Kimyasal: kâğıdın yanması, demirin paslanması, sütün ekşimesi.
[tuzak] Buzun erimesi kimyasal sanılır; **fizikseldir** (yeni madde yok).

# Kimyasal Tepkimeler ve Kütlenin Korunumu
[kural] Tepkimede atomlar yok olmaz ya da yeniden oluşmaz; girenlerdeki toplam atom sayısı ürünlerdekiyle **aynıdır** (Kütlenin Korunumu Kanunu).
[soru] "Tepkime denkleminde atom sayıları korunmuş mu?" → her elementin atom sayısı iki tarafta eşit olmalı.

# Asitler ve Bazlar
[kural] Asit **pH < 7**, nötr **pH = 7** (saf su), baz **pH > 7**.
[örnek] Limon ve sirke asit; sabun ve deterjan bazdır. Asitler mavi turnusolü kırmızıya, bazlar kırmızı turnusolü maviye çevirir.
[tuzak] "pH büyüdükçe asitlik artar" yanlıştır; pH büyüdükçe **bazlık** artar.

# Maddenin Isı ile Etkileşimi
Madde ısı alınca erir veya buharlaşır; ısı verince donar veya yoğuşur.
[kural] **Hâl değişimi sırasında sıcaklık sabit kalır** (alınan ısı hâl değiştirmeye harcanır).
[tuzak] "Saf su kaynarken sıcaklığı sürekli artar" yanlıştır; hâl değişiminde sıcaklık sabittir.`,
      tips: [
        {
          trap: "Fiziksel ve kimyasal değişim karıştırılır.",
          wrong: "Buzun erimesi kimyasal değişimdir.",
          correct: "Buzun erimesi fiziksel değişimdir; yeni madde oluşmaz.",
        },
        {
          trap: "pH yorumu ters kurulur.",
          wrong: "pH değeri büyüdükçe asitlik artar.",
          correct: "pH büyüdükçe BAZLIK artar; pH küçüldükçe asitlik artar.",
        },
        {
          trap: "Hâl değişiminde sıcaklığın değiştiği sanılır.",
          wrong: "Saf su kaynarken sıcaklığı sürekli artar.",
          correct: "Saf su kaynarken (hâl değişimi) sıcaklık sabit kalır.",
        },
      ],
      quiz: [
        {
          question: "Periyodik tabloda dikey sütunlara ne denir?",
          options: ["Periyot", "Grup", "Blok", "Sıra"],
          correctIndex: 1,
        },
        {
          question: "Aşağıdakilerden hangisi kimyasal değişimdir?",
          options: [
            "Buzun erimesi",
            "Camın kırılması",
            "Demirin paslanması",
            "Şekerin suda çözünmesi",
          ],
          correctIndex: 2,
        },
        {
          question: "pH değeri 3 olan bir madde için doğru olan hangisidir?",
          options: ["Baziktir", "Nötrdür", "Asidiktir", "Tuzdur"],
          correctIndex: 2,
        },
        {
          question: "Kimyasal tepkimelerde korunan nicelik nedir?",
          options: ["Renk", "Atom sayısı (kütle)", "Hacim", "Sıcaklık"],
          correctIndex: 1,
        },
        {
          question: "Saf suyun pH değeri kaçtır?",
          options: ["0", "7", "10", "14"],
          correctIndex: 1,
        },
        {
          question: "Bazlar turnusol kâğıdını hangi renge çevirir?",
          options: ["Kırmızı", "Mavi", "Sarı", "Yeşil"],
          correctIndex: 1,
        },
        {
          question: "Hâl değişimi sırasında sıcaklık nasıl davranır?",
          options: [
            "Sürekli artar",
            "Sürekli azalır",
            "Sabit kalır",
            "Önce artar sonra azalır",
          ],
          correctIndex: 2,
        },
        {
          question: "Aşağıdakilerden hangisi fiziksel değişimdir?",
          options: [
            "Mumun yanması",
            "Suyun donması",
            "Ekmeğin küflenmesi",
            "Elmanın çürümesi",
          ],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "basit-makineler",
      name: "Basit Makineler",
      summary: "Kaldıraç, makara, eğik düzlem ve çıkrık.",
      youtubeId: "Cb5DCS42glU",
      mindMap: {
        center: "Basit Makineler",
        branches: [
          {
            label: "Kaldıraç",
            sections: [
              { kind: "tanim", content: "Bir destek (dayanak) noktası etrafında dönebilen çubuktur." },
              { kind: "formul", content: "Denge kuralı: Yük × Yük kolu = Kuvvet × Kuvvet kolu" },
              { kind: "ornek", content: "Hesap örneği: 40 N yük, yük kolu 1 m; kuvvet kolu 4 m ise 40·1 = F·4 → F = 10 N." },
              { kind: "ornek", content: "Günlük örnekler: tahterevalli, el arabası, maşa, kerpeten, kürek, makas, cımbız." },
            ],
          },
          {
            label: "Makara",
            sections: [
              { kind: "tanim", content: "Sabit makara yalnız kuvvetin yönünü değiştirir. Hareketli makara kuvvetten kazanç sağlar." },
              { kind: "formul", content: "Hareketli makara: Kuvvet = Yük ÷ 2 (çekilen ip uzunluğu 2 katına çıkar)." },
              { kind: "ornek", content: "Örnekler: bayrak direği makarası (sabit), inşaat vinçlerinde hareketli makara, spor salonu ağırlık makineleri (palanga)." },
              { kind: "tuzak", content: "'Sabit makara kuvvetten kazanç sağlar' çeldiricisi yanlıştır; sabit makara yalnız yön değiştirir." },
            ],
          },
          {
            label: "Eğik Düzlem",
            sections: [
              { kind: "tanim", content: "Yükü bir yüksekliğe çıkarmak için kullanılan eğimli yüzeydir." },
              { kind: "formul", content: "Kuvvet × eğik düzlem uzunluğu = Yük × yükseklik  →  F = (G × h) ÷ ℓ" },
              { kind: "ornek", content: "Hesap örneği: 200 N yükü 1 m yüksekliğe 4 m'lik rampayla çıkaralım: F = (200·1) ÷ 4 = 50 N." },
              { kind: "ornek", content: "Günlük örnekler: rampa, kaydırak, vida, balta ve bıçak (kama), merdiven, dağ yolları." },
              { kind: "ipucu", content: "Rampa uzadıkça (eğim azaldıkça) gereken kuvvet azalır, ama yol uzar." },
            ],
          },
          {
            label: "Genel Kural",
            sections: [
              { kind: "kural", content: "Hiçbir basit makine işten kazanç sağlamaz." },
              { kind: "tuzak", content: "Kuvvetten kazanç sağlanırsa aynı oranda yoldan kaybedilir; 'işten kazanç' tuzaktır." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Basit makineler işten kazanç sağlar mı?",
          back: "Hayır. Kuvvetten kazanç sağlarsa yoldan kaybeder; hiçbir basit makine işten kazanç sağlamaz.",
        },
        {
          front: "Sabit makaranın faydası nedir?",
          back: "Yönden kazanç sağlar (kuvvetten kazandırmaz).",
        },
        {
          front: "Hareketli makara ne sağlar?",
          back: "Kuvvetten kazanç; uygulanan kuvveti yarıya indirir.",
        },
        {
          front: "Eğik düzlem ne işe yarar?",
          back: "Yükü kaldırmak için gereken kuvveti azaltır, ama alınan yol uzar.",
        },
        {
          front: "Kaldıraç örnekleri nelerdir?",
          back: "Tahterevalli, el arabası, maşa, kürek.",
        },
      ],
      article: `# Basit Makineler Nedir?
Basit makineler işimizi kolaylaştıran araçlardır. **Kuvvetten**, **yoldan** veya **yönden** kazanç sağlayabilirler.
[kural] Hiçbir basit makine işten kazanç sağlamaz. Kuvvetten kazanç sağlanırsa aynı oranda yoldan kaybedilir.
[tuzak] "İşten kazanç sağlayan basit makine" ifadesi her zaman yanlıştır; bu klasik bir LGS çeldiricisidir.

# Kaldıraç
Bir destek (dayanak) noktası etrafında dönebilen çubuktur. Tahterevalli, el arabası ve maşa örnektir.
[formül] Denge kuralı: **Yük × Yük kolu = Kuvvet × Kuvvet kolu**
[örnek] 40 N'luk yük, yük koluna 1 m uzaklıkta; kuvvet kolu 4 m ise: 40 × 1 = F × 4 → **F = 10 N**. Yani 40 N'luk yükü yalnız 10 N ile kaldırırız.
[soru] Genelde "sistem dengede ise uygulanan kuvvet kaç N'dur?" diye sorulur. Kol uzunlukları ile kuvvetleri çapraz çarpıp eşitlersin.

# Makara
- **Sabit makara:** Yalnız kuvvetin yönünü değiştirir; kuvvetten kazanç sağlamaz, uygulanan kuvvet yüke eşittir.
- **Hareketli makara:** Kuvvetten kazanç sağlar.
[formül] Hareketli makara: **Kuvvet = Yük ÷ 2** (ancak çekilen ip uzunluğu 2 katına çıkar)
[tuzak] "Sabit makara kuvvetten kazanç sağlar" çeldiricisi yanlıştır.

# Eğik Düzlem
Bir yükü belirli bir yüksekliğe çıkarmak için kullanılan eğimli yüzeydir. Gereken kuvveti azaltır ama alınan yol uzar. Rampa, vida ve kama örnektir.
[formül] **Kuvvet × eğik düzlem uzunluğu = Yük × yükseklik**  →  **F = (G × h) ÷ ℓ**
[örnek] 200 N'luk yükü 1 m yüksekliğe, 4 m uzunluğundaki rampayla çıkaralım: F = (200 × 1) ÷ 4 = **50 N**.
[ipucu] Rampa ne kadar uzunsa (eğim azaldıkça) gereken kuvvet o kadar azalır.

# Çıkrık ve Dişliler
Çıkrık, kuyudan su çekmekte kullanılan bir araçtır. Dişliler ve kasnaklar dönme hareketini iletir; birbirine geçen dişlilerde diş sayısı çok olan dişli daha yavaş ama daha güçlü döner.`,
      tips: [
        {
          trap: "Basit makinelerin işten kazanç sağladığı sanılır.",
          wrong: "Hareketli makara işten kazanç sağlar.",
          correct:
            "Hiçbir basit makine işten kazanç sağlamaz; kuvvetten kazanırsan yoldan kaybedersin.",
        },
        {
          trap: "Sabit makaranın kuvvetten kazanç sağladığı sanılır.",
          wrong: "Sabit makara uygulanan kuvveti azaltır.",
          correct: "Sabit makara yalnız yön değiştirir; kuvvetten kazanç sağlamaz.",
        },
        {
          trap: "Eğik düzlemde yol-kuvvet ilişkisi atlanır.",
          wrong: "Eğik düzlem hem kuvveti hem yolu azaltır.",
          correct: "Eğik düzlem kuvveti azaltır ama alınan YOL uzar.",
        },
      ],
      quiz: [
        {
          question: "Aşağıdakilerden hangisi tüm basit makineler için doğrudur?",
          options: [
            "İşten kazanç sağlarlar",
            "İşten kazanç sağlamazlar",
            "Enerji üretirler",
            "Sürtünmeyi tamamen yok ederler",
          ],
          correctIndex: 1,
        },
        {
          question: "Sabit makaranın sağladığı kazanç türü nedir?",
          options: ["Kuvvetten", "Yönden", "İşten", "Enerjiden"],
          correctIndex: 1,
        },
        {
          question: "Hareketli makara uygulanan kuvveti nasıl etkiler?",
          options: ["İki katına çıkarır", "Yarıya indirir", "Değiştirmez", "Sıfırlar"],
          correctIndex: 1,
        },
        {
          question: "Eğik düzlem kullanılınca ne olur?",
          options: [
            "Kuvvet azalır, yol uzar",
            "Kuvvet artar, yol kısalır",
            "Hem kuvvet hem yol azalır",
            "Hiçbir şey değişmez",
          ],
          correctIndex: 0,
        },
        {
          question: "Aşağıdakilerden hangisi kaldıraca örnektir?",
          options: ["Rampa", "Tahterevalli", "Bayrak direği makarası", "Vida"],
          correctIndex: 1,
        },
        {
          question: "Vida hangi basit makinenin bir uygulamasıdır?",
          options: ["Kaldıraç", "Makara", "Eğik düzlem", "Çıkrık"],
          correctIndex: 2,
        },
        {
          question: "Kuyudan su çekmede kullanılan basit makine hangisidir?",
          options: ["Çıkrık", "Kaldıraç", "Eğik düzlem", "Hareketli makara"],
          correctIndex: 0,
        },
        {
          question: "Bir basit makine kuvvetten kazanç sağlıyorsa neyden kaybeder?",
          options: ["Enerjiden", "Yoldan", "Yönden", "Kütleden"],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "enerji-donusumleri-ve-cevre",
      name: "Enerji Dönüşümleri ve Çevre Bilimi",
      summary: "Besin zinciri, madde döngüleri ve sürdürülebilirlik.",
      youtubeId: "",
      mindMap: {
        center: "Enerji Dönüşümleri ve Çevre Bilimi",
        branches: [
          {
            label: "Besin Zinciri ve Besin Ağı",
            sections: [
              { kind: "tanim", content: "Canlılar arasındaki beslenme ilişkisidir; üreticilerle (yeşil bitkiler) başlar." },
              { kind: "kural", content: "Üretici → 1. tüketici (otçul) → 2. tüketici (etçil) → 3. tüketici. Ok, enerjinin yenenden yiyene aktarıldığı yönü gösterir." },
              { kind: "ornek", content: "Kara zinciri: çimen → çekirge → kurbağa → yılan → atmaca. Su zinciri: alg → planktoz → küçük balık → büyük balık → fok → kutup ayısı." },
              { kind: "ornek", content: "Besin ağı: birden çok besin zincirinin kesişmesi. Bir canlının birden çok beslenme seçeneği olduğu için ağda yer alır." },
              { kind: "tuzak", content: "Okun YİYENDEN YENENE olduğu sanılır; tam tersi — enerji aktarımı yönündedir (yenenden yiyene)." },
            ],
          },
          {
            label: "Fotosentez ve Solunum",
            sections: [
              { kind: "kural", content: "Fotosentez (gündüz, bitkilerde): CO₂ + H₂O + güneş ışığı → besin (glikoz) + O₂. Solunum (her zaman, tüm canlılarda): besin + O₂ → enerji + CO₂ + H₂O." },
              { kind: "ornek", content: "Fotosentez bitkilerde, klorofille, gündüz olur. Solunum bütün canlılarda (bitki dahil) hem gündüz hem gece sürer." },
              { kind: "tuzak", content: "'Solunumda oksijen üretilir' YANLIŞ; oksijen fotosentezde üretilir, solunumda kullanılır ve karbondioksit verilir." },
            ],
          },
          {
            label: "Madde Döngüleri",
            sections: [
              { kind: "tanim", content: "Su, karbon, oksijen ve azot doğada sürekli dönüşerek tekrar kullanılır." },
              { kind: "ornek", content: "Su döngüsü: buharlaşma → yoğuşma (bulut) → yağış → toplanma. Karbon döngüsü: fotosentez ile alınır, solunum/yanma ile geri verilir. Oksijen döngüsü: fotosentezde üretilir, solunumda kullanılır. Azot döngüsü: havadaki azot bakterilerle toprağa bağlanır → bitkiler alır → hayvanlara → ölüm/dışkıyla geri toprağa." },
              { kind: "tuzak", content: "Enerji DÖNGÜ OLUŞTURMAZ; tek yönlü akar (Güneş → üretici → tüketici → ısı kaybı). 'Enerji döngüsü' bir madde döngüsü değildir." },
            ],
          },
          {
            label: "Enerji Piramidi",
            sections: [
              { kind: "kural", content: "Besin zincirinde üst basamaklara çıkıldıkça enerji AZALIR; her basamakta enerjinin yaklaşık %90'ı kaybedilir, %10'u aktarılır." },
              { kind: "ornek", content: "En çok enerji üreticilerde (taban); en az enerji en üst tüketicide. Bu yüzden üst basamaktaki canlı sayısı daha azdır (1 atmaca beslemek için binlerce çekirge gerekir)." },
              { kind: "tuzak", content: "'Enerji yukarı çıktıkça artar' YANLIŞ; azalır. Üreticiler en zengin enerji kaynağıdır." },
            ],
          },
          {
            label: "Sürdürülebilirlik",
            sections: [
              { kind: "tanim", content: "Doğal kaynakların tükenmeden, gelecek nesillere de yetecek şekilde kullanılmasıdır." },
              { kind: "ornek", content: "Geri dönüşüm (kağıt, plastik, cam, metal); yenilenebilir enerji (güneş, rüzgar, hidroelektrik); su tasarrufu; toplu taşıma; ağaçlandırma; organik tarım; LED ampul kullanımı." },
              { kind: "tuzak", content: "Fosil yakıtlar (kömür, petrol, doğalgaz) YENİLENEBİLİR değildir; tükenince yerine yeni oluşması binyıllar alır." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Besin zincirinde ok neyi gösterir?",
          back: "Enerjinin aktarıldığı yönü (yenen canlıdan yiyen canlıya doğru).",
        },
        {
          front: "Fotosentezde ne üretilir?",
          back: "Besin (glikoz) ve oksijen; karbondioksit ve su kullanılır.",
        },
        {
          front: "Enerji piramidinde enerji nasıl değişir?",
          back: "Üst basamaklara çıkıldıkça azalır; en çok enerji üreticilerdedir.",
        },
        {
          front: "Üretici nedir?",
          back: "Kendi besinini üretebilen canlılardır (yeşil bitkiler).",
        },
        {
          front: "Sürdürülebilirlik nedir?",
          back: "Kaynakları tükenmeden, gelecek nesillere bırakacak şekilde kullanmaktır.",
        },
      ],
      article: `# Besin Zinciri ve Besin Ağı
Canlılar arasındaki beslenme ilişkisidir; **üreticilerle** (yeşil bitkiler) başlar, otçul ve etçil tüketicilerle devam eder.
[kural] Besin zincirindeki **ok**, enerjinin aktarıldığı yönü gösterir: **yenen canlıdan yiyen canlıya** doğru.
[tuzak] Okun "yiyenden yenene" doğru olduğu sanılır; tam tersidir.

# Fotosentez ve Solunum
[kural] **Fotosentez:** bitkiler ışık, su ve karbondioksitle besin ve **oksijen üretir**. **Solunum:** besin parçalanır, enerji açığa çıkar, **karbondioksit verilir**.
[tuzak] "Solunumda oksijen üretilir" yanlıştır; oksijen fotosentezde üretilir.

# Madde Döngüleri
Su, karbon, oksijen ve azot gibi maddeler doğada sürekli dönüşerek tekrar kullanılır.
[örnek] Su döngüsünde su buharlaşır, yoğuşur ve yağışla yeryüzüne döner.
[tuzak] Enerji döngü oluşturmaz, tek yönlü akar; "enerji döngüsü" bir madde döngüsü değildir.

# Enerji Piramidi
[kural] Üst basamaklara çıkıldıkça aktarılan enerji **azalır**; çünkü her canlı enerjinin bir kısmını harcar. En fazla enerji **üreticilerdedir**.
[soru] "En çok enerji hangi canlılarda bulunur?" → üreticilerde.

# Sürdürülebilirlik ve Çevre
Doğal kaynakların tükenmeden, gelecek nesillere de yetecek şekilde kullanılmasıdır.
[örnek] Geri dönüşüm, enerji tasarrufu ve doğanın korunması sürdürülebilirliği destekler.`,
      tips: [
        {
          trap: "Besin zincirindeki okun yönü ters yorumlanır.",
          wrong: "Besin zincirinde ok, yiyenden yenene doğrudur.",
          correct:
            "Ok, enerjinin aktarıldığı yönü gösterir: yenen canlıdan yiyen canlıya doğru.",
        },
        {
          trap: "Enerji piramidinde enerjinin yukarı çıktıkça arttığı sanılır.",
          wrong: "En çok enerji en üstteki etçillerdedir.",
          correct:
            "Üst basamaklara çıkıldıkça enerji AZALIR; en çok enerji üreticilerdedir.",
        },
        {
          trap: "Fotosentez ve solunum karıştırılır.",
          wrong: "Solunumda oksijen üretilir.",
          correct: "Oksijen fotosentezde üretilir; solunumda karbondioksit verilir.",
        },
      ],
      quiz: [
        {
          question: "Besin zinciri hangi canlılarla başlar?",
          options: ["Etçiller", "Üreticiler (bitkiler)", "Ayrıştırıcılar", "Otçullar"],
          correctIndex: 1,
        },
        {
          question: "Besin zincirindeki ok neyi gösterir?",
          options: [
            "Avlanma hızını",
            "Enerjinin aktarıldığı yönü",
            "Canlının büyüklüğünü",
            "Yaşam süresini",
          ],
          correctIndex: 1,
        },
        {
          question: "Fotosentez sonucunda açığa çıkan gaz hangisidir?",
          options: ["Karbondioksit", "Azot", "Oksijen", "Hidrojen"],
          correctIndex: 2,
        },
        {
          question: "Enerji piramidinde en çok enerji nerededir?",
          options: ["Üreticilerde", "Otçullarda", "Etçillerde", "En üst basamakta"],
          correctIndex: 0,
        },
        {
          question: "Aşağıdakilerden hangisi bir madde döngüsü DEĞİLDİR?",
          options: ["Su döngüsü", "Karbon döngüsü", "Azot döngüsü", "Enerji döngüsü"],
          correctIndex: 3,
          explanation:
            "Enerji döngü oluşturmaz, tek yönlü akar. Madde döngüleri su, karbon, oksijen ve azottur.",
        },
        {
          question: "Solunum olayında dışarı verilen gaz hangisidir?",
          options: ["Oksijen", "Karbondioksit", "Azot", "Hidrojen"],
          correctIndex: 1,
        },
        {
          question: "Aşağıdakilerden hangisi sürdürülebilirliği destekler?",
          options: [
            "Geri dönüşüm yapmak",
            "Suyu boşa akıtmak",
            "Aşırı tüketim",
            "Ormanları yok etmek",
          ],
          correctIndex: 0,
        },
        {
          question:
            "Üst basamaklara çıkıldıkça besin zincirinde enerji nasıl değişir?",
          options: ["Artar", "Azalır", "Değişmez", "Önce artar sonra azalır"],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "elektrik-yukleri-ve-enerjisi",
      name: "Elektrik Yükleri ve Elektrik Enerjisi",
      summary: "Elektriklenme, elektrik yükleri ve elektrik enerjisi.",
      youtubeId: "",
      mindMap: {
        center: "Elektrik Yükleri ve Elektrik Enerjisi",
        branches: [
          {
            label: "Elektriklenme Çeşitleri",
            sections: [
              { kind: "tanim", content: "Cisimlerin elektrik yükü kazanmasıdır. Üç yolla olur: sürtünme, dokunma, etki." },
              { kind: "kural", content: "Sürtünme → cisimler zıt cins yüklenir. Dokunma → aynı yükle yüklenir. Etki → karşı yüzeyde zıt yük belirir (uzaktan)." },
              { kind: "ornek", content: "Sürtünme: yün kumaşa sürtülen balon, saç tarama, cam çubuğa ipek. Dokunma: yüklü çubuğun nötr küreye değmesi. Etki: yüklü cismi yaklaştırınca elektroskobun yapraklarının açılması." },
              { kind: "tuzak", content: "'Sürtünen iki cisim aynı yükle yüklenir' YANLIŞ; zıt cins yüklenirler. (Birinden diğerine elektron geçer.)" },
            ],
          },
          {
            label: "Elektrik Yükleri",
            sections: [
              { kind: "kural", content: "İki tür yük vardır: pozitif (+) ve negatif (−). Aynı cins yükler birbirini İTER; zıt cins yükler birbirini ÇEKER." },
              { kind: "ornek", content: "(+)(+) → iter • (−)(−) → iter • (+)(−) → çeker. Nötr (yüksüz) cisimde + ve − yük sayısı eşittir." },
              { kind: "tuzak", content: "'Aynı yükler birbirini çeker' YANLIŞ; aynı yükler İTER, zıt yükler ÇEKER." },
            ],
          },
          {
            label: "İletken ve Yalıtkan",
            sections: [
              { kind: "kural", content: "İletkenler elektriği iletir; yalıtkanlar iletmez." },
              { kind: "ornek", content: "İletkenler: bakır, altın, gümüş, demir, alüminyum (METALLER), grafit, tuzlu/asitli sular, insan vücudu (kısmen). Yalıtkanlar: plastik, cam, tahta, kauçuk, lastik, kuru hava, saf su, porselen, kağıt." },
              { kind: "ornek", content: "Günlük örnek: kabloda iç kısım (bakır) iletken, dış kısım (plastik) yalıtkandır. Tornavida sapı plastik (yalıtkan), ucu metaldir." },
              { kind: "tuzak", content: "'Saf su iletkendir' YANLIŞ; saf su YALITKANdır. İletkenliği sağlayan içindeki iyonlardır (tuz, mineral)." },
            ],
          },
          {
            label: "Elektroskop",
            sections: [
              { kind: "tanim", content: "Bir cismin yüklü olup olmadığını ve yükünün cinsini anlamaya yarayan araçtır." },
              { kind: "kural", content: "Yüklü cisim yaklaştırılınca yapraklar AÇILIR (etki ile elektriklenme). Aynı cins yük → daha çok açılır; zıt cins yük → kapanır." },
              { kind: "ornek", content: "Elektroskop negatif yüklüyken yapraklar açıktır. Negatif yüklü cisim yaklaştırılırsa açıklık ARTAR (aynı cins). Pozitif yüklü cisim yaklaştırılırsa yapraklar KAPANIR (zıt cins)." },
            ],
          },
          {
            label: "Elektrik Enerjisinin Dönüşümü",
            sections: [
              { kind: "kural", content: "Elektrik enerjisi ısı, ışık, hareket ve ses enerjisine dönüşebilir (enerjinin korunumu)." },
              { kind: "ornek", content: "Isıya: ütü, soba, fön, su ısıtıcısı, tost makinesi. Işığa: ampul, LED, floresan. Harekete: vantilatör, çamaşır makinesi, blender, matkap, asansör. Sese: hoparlör, zil, kulaklık. Karışık: TV (ışık+ses), buzdolabı (ısı azaltma+ses+hareket)." },
              { kind: "ipucu", content: "Bir cihaz birden çok dönüşüm yapabilir: çamaşır makinesi → ısı (su ısıtma) + hareket (tambur) + ses." },
            ],
          },
        ],
      },
      cards: [
        {
          front: "Aynı ve zıt yükler nasıl etkileşir?",
          back: "Aynı yükler birbirini iter, zıt yükler birbirini çeker.",
        },
        {
          front: "İletken ve yalıtkan örnekleri?",
          back: "İletken: metaller (bakır, demir). Yalıtkan: plastik, cam, tahta.",
        },
        {
          front: "Elektroskop ne işe yarar?",
          back: "Bir cismin yüklü olup olmadığını ve yükünün cinsini belirler.",
        },
        {
          front: "Sürtünmeyle elektriklenmede yükler nasıl olur?",
          back: "İki cisim zıt cinsten yüklerle yüklenir.",
        },
        {
          front: "Elektrik enerjisi nelere dönüşür?",
          back: "Isı, ışık ve hareket enerjisine.",
        },
      ],
      article: `# Elektriklenme Çeşitleri
Cisimlerin elektrik yükü kazanmasına elektriklenme denir. Üç yolla olur: **sürtünme** (yün kumaşa sürtülen balon), **dokunma** (yüklü cisme değme) ve **etki** (yüklü cismi yaklaştırma).
[kural] Sürtünme ile elektriklenmede iki cisim **zıt cins** yüklerle yüklenir.
[tuzak] "Sürtünen iki cisim aynı cins yükle yüklenir" yanlıştır; zıt cins yüklenirler.

# Elektrik Yükleri
İki tür yük vardır: **pozitif (+)** ve **negatif (−)**.
[kural] Aynı cins yükler birbirini **iter**, zıt cins yükler birbirini **çeker**. Nötr cisimde + ve − yük sayısı eşittir.
[tuzak] "Aynı yükler birbirini çeker" yanlıştır; iter.

# İletkenler ve Yalıtkanlar
[kural] **İletken:** elektriği iletir (bakır, demir gibi metaller). **Yalıtkan:** iletmez (plastik, cam, tahta).
[örnek] Kablolarda iç kısım iletken (bakır), dış kısım yalıtkandır (plastik).
[tuzak] "Plastik iyi bir iletkendir" yanlıştır; plastik yalıtkandır.

# Elektroskop
Elektroskop, bir cismin yüklü olup olmadığını ve yükünün cinsini anlamaya yarar.
[örnek] Yüklü bir cisim yaklaştırıldığında elektroskobun yaprakları açılır.

# Elektrik Enerjisinin Dönüşümü
[kural] Elektrik enerjisi başka enerji türlerine dönüşür.
[örnek] Ütü ve sobada **ısıya**, ampulde **ışığa**, çamaşır makinesi ve vantilatörde **hareket** enerjisine dönüşür.`,
      tips: [
        {
          trap: "Aynı/zıt yük etkileşimi ters kurulur.",
          wrong: "Aynı cins yükler birbirini çeker.",
          correct: "Aynı yükler birbirini İTER; zıt yükler birbirini çeker.",
        },
        {
          trap: "İletken-yalıtkan örnekleri karıştırılır.",
          wrong: "Plastik iyi bir iletkendir.",
          correct: "Plastik yalıtkandır; metaller (bakır, demir) iletkendir.",
        },
        {
          trap: "Sürtünmede aynı yük oluştuğu sanılır.",
          wrong: "Sürtünen iki cisim aynı cins yükle yüklenir.",
          correct:
            "Sürtünme ile elektriklenmede cisimler ZIT cins yüklerle yüklenir.",
        },
      ],
      quiz: [
        {
          question: "Aynı cins elektrik yükleri birbirine ne yapar?",
          options: ["Çeker", "İter", "Etkilemez", "Nötrler"],
          correctIndex: 1,
        },
        {
          question: "Aşağıdakilerden hangisi yalıtkandır?",
          options: ["Bakır", "Demir", "Plastik", "Alüminyum"],
          correctIndex: 2,
        },
        {
          question: "Aşağıdakilerden hangisi bir elektriklenme çeşidi DEĞİLDİR?",
          options: ["Sürtünme", "Dokunma", "Etki", "Kaynama"],
          correctIndex: 3,
        },
        {
          question: "Bir cismin yüklü olup olmadığını anlamaya yarayan araç hangisidir?",
          options: ["Termometre", "Elektroskop", "Barometre", "Dinamometre"],
          correctIndex: 1,
        },
        {
          question: "Ampulde elektrik enerjisi asıl olarak hangi enerjiye dönüşür?",
          options: ["Işık", "Ses", "Hareket", "Kimyasal"],
          correctIndex: 0,
        },
        {
          question: "Nötr (yüksüz) bir cisim için doğru olan hangisidir?",
          options: [
            "Sadece pozitif yük içerir",
            "Sadece negatif yük içerir",
            "Pozitif ve negatif yük sayısı eşittir",
            "Hiç yük (atom) içermez",
          ],
          correctIndex: 2,
        },
        {
          question: "Sürtünme ile elektriklenen iki cismin yükleri nasıldır?",
          options: ["Aynı cins", "Zıt cins", "İkisi de nötr", "İkisi de pozitif"],
          correctIndex: 1,
        },
        {
          question:
            "Aşağıdaki araçlardan hangisinde elektrik enerjisi harekete dönüşür?",
          options: ["Ütü", "Ampul", "Vantilatör", "Soba"],
          correctIndex: 2,
        },
      ],
    },
  ],
};
