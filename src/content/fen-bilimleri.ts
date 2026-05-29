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
            detail:
              "Dünya'nın ekseni 23,5° eğiktir ve Güneş etrafında dolanır. Bu yüzden ışınların düşme açısı ve birim yüzeye düşen enerji değişir; mevsimler oluşur. 21 Haziran'da Kuzey Yarım Küre'de yaz, 21 Aralık'ta kış başlar. 21 Mart ve 23 Eylül ekinokslarında gece-gündüz eşittir (12-12).",
          },
          {
            label: "İklim ve Hava Hareketleri",
            detail:
              "Isınan hava yükselip alçak basınç, soğuyan hava alçalıp yüksek basınç oluşturur. Rüzgar yüksek basınçtan alçak basınca doğru eser; alçak basınçta yağış ihtimali yüksektir. Yağışlar gökyüzüne yakın (yağmur, kar, dolu) ve yeryüzüne yakın (çiğ, kırağı, sis) olarak ayrılır.",
          },
          {
            label: "Küresel İklim Değişikliği",
            detail:
              "İklim, geniş bölgelerde 30-40 yıllık hava olaylarının ortalamasıdır. Fosil yakıtların sera gazlarını artırması küresel ısınmaya yol açar; buzullar erir, deniz seviyesi yükselir, sel ve kuraklık gibi aşırı olaylar artar.",
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
      article: `## Mevsimlerin Oluşumu
Mevsimler, Dünya'nın Güneş etrafında dolanması ve dönme ekseninin 23,5° eğik olması nedeniyle oluşur. Eksen eğikliği, birim yüzeye düşen enerji miktarını ve Güneş ışınlarının düşme açısını değiştirir. Işınların dik geldiği bölgelerde sıcaklık artar ve gölge boyu kısalır. Bu yüzden aynı anda iki yarım kürede farklı mevsimler yaşanır.

## Önemli Tarihler
21 Haziran (Yaz Gündönümü): Güneş ışınları Yengeç Dönencesi'ne 90° dik düşer. Kuzey Yarım Küre'de en uzun gündüz yaşanır ve yaz başlar; Yengeç Dönencesi'nde öğle vakti gölge boyu sıfır olur. Güney Yarım Küre'de kış başlar.

21 Aralık (Kış Gündönümü): Güneş ışınları Oğlak Dönencesi'ne dik düşer. Kuzey Yarım Küre'de en uzun gece yaşanır ve kış başlar. Güney Yarım Küre'de yaz başlar.

Ekinokslar (21 Mart ve 23 Eylül): Eksen eğikliğinin etkisi ortadan kalkar; ışınlar Ekvator'a dik düşer. Dünya'nın her yerinde gece ve gündüz süreleri eşittir (12-12 saat). Bahar mevsimlerinin başlangıcıdır.

## Hava Olayları ve Basınç
Sıcaklık farkları yoğunluk değişimine yol açar: ısınan hava yükselerek alçak basınç, soğuyan hava alçalarak yüksek basınç oluşturur. Rüzgar, yüksek basınçtan alçak basınca doğru yatay hava hareketidir. Alçak basınç alanlarında bulut ve yağış ihtimali yüksektir. Hava olaylarını meteoroloji bilim dalı (meteorolog) inceler.

## Yağış Türleri
Havadaki nemin sıcaklık düşüşüyle yoğuşması ya da donmasıyla yağışlar oluşur. Gökyüzüne yakın oluşanlar: yağmur, kar, dolu. Yeryüzüne yakın oluşanlar: çiğ, kırağı, sis.

## İklim ve İklim Değişikliği
İklim, geniş bölgelerde uzun yıllar (30-40 yıl) süren hava olaylarının ortalamasıdır ve klimatoloji (klimatolog) tarafından incelenir. Fosil yakıt kullanımının artması sera gazlarını çoğaltır ve küresel ısınmaya yol açar. Sonuçta buzullar erir, deniz seviyesi yükselir ve sel, kuraklık gibi aşırı hava olayları artar.`,
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
            detail:
              "Büyükten küçüğe: Kromozom > DNA > Gen > Nükleotit. Kromozom en karmaşık, nükleotit en küçük yapı birimidir.",
          },
          {
            label: "Nükleotit Bileşenleri",
            detail:
              "Bir nükleotit fosfat, şeker ve organik bazdan oluşur. Organik bazlar: Adenin, Timin, Guanin, Sitozin. Nükleotit içerdiği baza göre adlandırılır.",
          },
          {
            label: "DNA Eşleşme Kuralları",
            detail:
              "DNA'da bazlar karşılıklı eşleşir: Adenin daima Timin ile, Guanin daima Sitozin ile eşleşir (A-T, G-C).",
          },
          {
            label: "DNA'nın Kendini Eşlemesi",
            detail:
              "Hücre bölünmesinden önce çift zincir açılır ve her zincir kendine uygun yeni bir zincir oluşturur. Sonuçta birbirinin aynısı iki DNA molekülü meydana gelir.",
          },
          {
            label: "Hatalar ve Onarım",
            detail:
              "Eşlenme sırasında baz dizilişinde oluşan kalıcı değişikliklere mutasyon denir. Hücre çoğu hatayı onarabilir; onarılamayan değişiklikler kalıtsal olabilir.",
          },
          {
            label: "Kalıtım Kavramları",
            detail:
              "Gen, alel, baskın (dominant) ve çekinik (resesif) gibi kavramlarla kalıtsal özellikler ana-babadan yavruya aktarılır.",
          },
          {
            label: "Cinsiyet Belirlenmesi",
            detail:
              "İnsanda cinsiyet, cinsiyet kromozomlarıyla belirlenir: XX dişi, XY erkektir. Cinsiyeti belirleyen kromozom babadan gelir.",
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
      article: `## Kalıtsal Yapıların Hiyerarşisi
Kalıtsal yapılar büyükten küçüğe doğru şöyle sıralanır: Kromozom > DNA > Gen > Nükleotit.

Kromozom: Hücrenin çekirdeğinde bulunan, canlılık özelliklerini taşıyan ve DNA'nın protein kılıfla kaplanmasıyla oluşan en karmaşık yapıdır. Hücre bölünmesi öncesinde DNA'nın kısalıp kalınlaşmasıyla belirginleşir ve kalıtsal bilginin nesillere aktarılmasını sağlar.

DNA (Deoksiribonükleik Asit): Hücrenin yönetici molekülüdür; solunum, beslenme, üreme gibi yaşamsal faaliyetleri kontrol eder. Çift zincirli sarmal yapıdadır ve bölünmeden önce kendini eşler.

Gen: DNA'nın anlamlı parçalarıdır; göz rengi, kan grubu gibi belirli kalıtsal özelliklerin ortaya çıkmasını sağlayan görev birimleridir.

Nükleotit: Kalıtsal yapıların en küçük parçası ve DNA'nın yapı birimidir.

## Nükleotit Bileşenleri
Bir nükleotit üç kısımdan oluşur: fosfat, şeker ve organik baz. Organik bazlar Adenin, Timin, Guanin ve Sitozin'dir. Nükleotit, içerdiği organik baza göre adlandırılır. Nükleotitlerin sayı ve diziliş farkları biyolojik çeşitliliği oluşturur.

## DNA'nın Kendini Eşlemesi
Hücre bölünmesinden önce DNA'nın çift zinciri açılır ve her zincir kendine uygun yeni bir zincir oluşturur. Böylece birbirinin aynısı iki DNA molekülü meydana gelir ve kalıtsal bilgi yeni hücrelere eksiksiz aktarılır.`,
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
            detail:
              "P = G / S (Ağırlık / Yüzey Alanı). Ağırlık artınca basınç artar, yüzey alanı artınca azalır. Bıçak ve çivinin sivri ucu basıncı artırır; kar ayakkabısı ve paletler azaltır.",
          },
          {
            label: "Sıvı Basıncı",
            detail:
              "Sıvının derinliği (h) ve yoğunluğuna (d) bağlıdır; kabın şekline ve sıvı miktarına bağlı değildir. Pascal Prensibi: kapalı kaptaki sıvıya uygulanan basınç her noktaya aynen iletilir (hidrolik frenler).",
          },
          {
            label: "Gaz Basıncı",
            detail:
              "Atmosfer havasının ağırlığından kaynaklanır; deniz seviyesinden yükseğe çıkıldıkça azalır. İlk kez Torricelli deneyiyle ölçülmüştür. Pipet ve vantuz örnekleri bununla açıklanır.",
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
      article: `## Katı Basıncı
Katı basıncı, birim yüzeye etki eden dik kuvvettir ve P = G / S (Ağırlık / Yüzey Alanı) ile hesaplanır. Ağırlık arttıkça basınç artar (doğru orantı); temas yüzeyi arttıkça basınç azalır (ters orantı).

Günlük hayat örnekleri: bıçağın keskin ucu, çivinin sivri ucu ve krampon çivileri yüzeyi küçülterek basıncı artırır. Kar ayakkabıları, tırların çok sayıda tekerleği ve iş makinelerinin paletleri ise yüzeyi genişleterek basıncı azaltır.

## Sıvı Basıncı
Sıvı basıncı, sıvının derinliği (h) ve yoğunluğu (d) ile doğru orantılıdır; kabın şekline ve sıvı miktarına bağlı değildir. Bu yüzden su depoları yüksek yerlere kurulur ve baraj duvarlarının alt kısımları daha kalın yapılır.

Pascal Prensibi: Kapalı bir kaptaki sıvıya uygulanan basınç, sıvının her noktasına ve kabın iç yüzeyine aynen iletilir. Hidrolik fren sistemleri ve itfaiye merdivenleri bu ilkeyle çalışır.

## Gaz (Açık Hava) Basıncı
Atmosferdeki havanın ağırlığı, temas ettiği yüzeylere basınç uygular. Deniz seviyesinden yukarı çıkıldıkça açık hava basıncı azalır (ters orantı). Açık hava basıncı ilk kez Torricelli deneyi ile ölçülmüştür.

Günlük hayat örnekleri: pipetle içecek içilmesi, vantuzlu askıların duvara yapışması, meyve suyu kutusunun büzülmesi ve vakumlu poşetler açık hava basıncıyla açıklanır.`,
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
            detail:
              "Elementler artan atom numarasına göre dizilir. Yatay sıralara periyot, dikey sütunlara grup denir. Metaller solda ve ortada, ametaller sağ üstte, soy gazlar en sağda yer alır.",
          },
          {
            label: "Fiziksel ve Kimyasal Değişim",
            detail:
              "Fiziksel değişimde yalnız dış görünüş değişir, yeni madde oluşmaz (buzun erimesi). Kimyasal değişimde yeni madde oluşur (kâğıdın yanması, paslanma).",
          },
          {
            label: "Kimyasal Tepkimeler",
            detail:
              "Tepkimede atomlar yok olmaz, sadece yer değiştirir. Girenlerdeki atom sayısı ürünlerde de aynıdır (kütlenin korunumu).",
          },
          {
            label: "Asitler ve Bazlar",
            detail:
              "Asitlerin pH'ı 7'den küçük, bazların 7'den büyüktür; saf su nötrdür (pH=7). Asitler mavi turnusolü kırmızıya, bazlar kırmızı turnusolü maviye çevirir.",
          },
          {
            label: "Maddenin Isı ile Etkileşimi",
            detail:
              "Hâl değişimi sırasında sıcaklık sabit kalır. Erime-donma ve buharlaşma-yoğuşma birbirinin tersidir.",
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
      article: `## Periyodik Sistem
Elementler artan atom numarasına göre dizilir. Yatay sıralara periyot, dikey sütunlara grup denir. Metaller tablonun solunda ve ortasında; ametaller sağ üstte; soy gazlar en sağ sütunda bulunur. Aynı gruptaki elementlerin kimyasal özellikleri benzerdir.

## Fiziksel ve Kimyasal Değişim
Fiziksel değişimde maddenin sadece dış görünüşü (hâli, şekli) değişir, yeni madde oluşmaz; örnek: buzun erimesi, şekerin suda çözünmesi. Kimyasal değişimde maddenin iç yapısı değişir ve yeni madde oluşur; örnek: kâğıdın yanması, demirin paslanması, sütün ekşimesi.

## Kimyasal Tepkimeler ve Kütlenin Korunumu
Kimyasal tepkimelerde atomlar yok olmaz ya da yeniden oluşmaz; sadece yer değiştirir. Bu yüzden girenlerdeki toplam atom sayısı ürünlerdeki ile aynıdır ve kütle korunur (Kütlenin Korunumu Kanunu).

## Asitler ve Bazlar
Asitlerin pH değeri 7'den küçük, bazların 7'den büyüktür; saf su nötrdür (pH = 7). Asitler mavi turnusolü kırmızıya, bazlar kırmızı turnusolü maviye çevirir. Limon ve sirke asit; sabun ve deterjan baz örneğidir.

## Maddenin Isı ile Etkileşimi
Madde ısı aldığında hâl değiştirebilir (erime, buharlaşma); ısı verdiğinde ters yönde değişir (donma, yoğuşma). Hâl değişimi sırasında alınan/verilen ısı hâl değiştirmeye harcandığı için sıcaklık sabit kalır.`,
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
            detail:
              "Bir destek (dayanak) noktası etrafında dönen çubuktur. Yük, destek ve kuvvetin konumuna göre kuvvetten kazanç sağlayabilir. Örnek: tahterevalli, el arabası, maşa.",
          },
          {
            label: "Makara",
            detail:
              "Sabit makara yalnız yön değiştirir, kuvvetten kazandırmaz. Hareketli makara uygulanan kuvveti yarıya indirerek kuvvetten kazanç sağlar.",
          },
          {
            label: "Eğik Düzlem",
            detail:
              "Yükü yukarı çıkarmak için gereken kuvveti azaltır ama alınan yol uzar. Örnek: rampa, vida, kama (pahalı).",
          },
          {
            label: "Çıkrık ve Dişliler",
            detail:
              "Çıkrık kuyudan su çekmede kullanılır. Dişliler ve kasnaklar dönme hareketini iletir; diş sayısına göre hız ve kuvvet değişir.",
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
      article: `## Basit Makineler Nedir?
Basit makineler, iş yaparken bize kolaylık sağlayan araçlardır. Kuvvetten, yoldan veya yönden kazanç sağlayabilirler. Ancak hiçbir basit makine işten kazanç sağlamaz: kuvvetten kazanç sağlanırsa alınan yol uzar.

## Kaldıraç
Bir destek (dayanak) noktası etrafında dönebilen çubuktur. Yük, destek ve kuvvetin konumuna göre kuvvetten kazanç sağlayabilir. Tahterevalli, el arabası, maşa ve kürek kaldıraca örnektir.

## Makara
Sabit makara yere ya da duvara sabitlenmiştir; yalnızca kuvvetin yönünü değiştirir, kuvvetten kazanç sağlamaz. Hareketli makara yükle birlikte hareket eder ve uygulanan kuvveti yarıya indirerek kuvvetten kazanç sağlar.

## Eğik Düzlem
Bir yükü belli bir yüksekliğe çıkarmak için kullanılan eğimli yüzeydir. Gereken kuvveti azaltır ama alınan yol uzar. Rampalar, vida ve kama (pahalı) eğik düzlem uygulamalarıdır.

## Çıkrık ve Dişliler
Çıkrık, kuyudan su çekmede kullanılan bir araçtır. Dişliler ve kasnaklar ise dönme hareketini bir yerden başka yere iletir; diş sayısına göre hız ve kuvvet değişir.`,
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
            detail:
              "Üreticiden tüketiciye enerji akışıdır. Ok, enerjinin aktarıldığı yönü (yenenden yiyene) gösterir. Üretici → otçul → etçil.",
          },
          {
            label: "Fotosentez ve Solunum",
            detail:
              "Fotosentezde bitkiler ışıkla besin ve oksijen üretir. Solunumda besinden enerji açığa çıkar, karbondioksit verilir.",
          },
          {
            label: "Madde Döngüleri",
            detail:
              "Su, karbon, oksijen ve azot döngüleriyle maddeler doğada sürekli kullanılır.",
          },
          {
            label: "Enerji Piramidi",
            detail:
              "Üst basamaklara çıkıldıkça enerji azalır; en çok enerji üreticilerde bulunur.",
          },
          {
            label: "Sürdürülebilirlik",
            detail:
              "Kaynakların gelecek nesillere kalacak şekilde, tükenmeden kullanılmasıdır; geri dönüşüm ve tasarrufla desteklenir.",
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
      article: `## Besin Zinciri ve Besin Ağı
Canlılar arasındaki beslenme ilişkisine besin zinciri denir. Zincir üreticilerle (yeşil bitkiler) başlar; otçul ve etçil tüketicilerle devam eder. Besin zincirindeki ok, enerjinin aktarıldığı yönü (yenen canlıdan yiyen canlıya doğru) gösterir. Birden çok besin zincirinin birleşmesiyle besin ağı oluşur.

## Fotosentez ve Solunum
Fotosentezde bitkiler güneş ışığı, su ve karbondioksit kullanarak besin ve oksijen üretir. Solunumda ise besinler parçalanarak enerji açığa çıkar ve karbondioksit verilir. Bu iki olay birbirini dengeler.

## Madde Döngüleri
Su, karbon, oksijen ve azot gibi maddeler doğada sürekli dönüşerek tekrar kullanılır. Örneğin su döngüsünde su buharlaşır, yoğuşur ve yağışla yeryüzüne döner.

## Enerji Piramidi
Besin zincirinde üst basamaklara çıkıldıkça aktarılan enerji azalır; çünkü her canlı aldığı enerjinin bir kısmını yaşamsal faaliyetlerinde harcar. En fazla enerji üreticilerde bulunur.

## Sürdürülebilirlik ve Çevre
Doğal kaynakların gelecek nesillere de yetecek şekilde, tükenmeden kullanılmasına sürdürülebilirlik denir. Geri dönüşüm, enerji tasarrufu ve doğanın korunması sürdürülebilirliği destekler.`,
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
            detail:
              "Sürtünme, dokunma ve etki ile elektriklenme. Sürtünme ile elektriklenmede cisimler zıt cins yükle yüklenir.",
          },
          {
            label: "Elektrik Yükleri",
            detail:
              "İki tür yük vardır: pozitif (+) ve negatif (-). Aynı yükler birbirini iter, zıt yükler birbirini çeker.",
          },
          {
            label: "İletken ve Yalıtkan",
            detail:
              "İletkenler elektriği iletir (metaller); yalıtkanlar iletmez (plastik, cam, tahta).",
          },
          {
            label: "Elektroskop",
            detail:
              "Bir cismin yüklü olup olmadığını ve yük cinsini anlamaya yarayan araçtır. Yüklü cisim yaklaşınca yaprakları açılır.",
          },
          {
            label: "Elektrik Enerjisinin Dönüşümü",
            detail:
              "Elektrik enerjisi ısı (ütü), ışık (ampul) ve hareket (motor) enerjisine dönüşebilir.",
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
      article: `## Elektriklenme Çeşitleri
Cisimlerin elektrik yükü kazanmasına elektriklenme denir. Üç yolla olur: sürtünme (örneğin yün kumaşa sürtülen balon), dokunma (yüklü bir cisme değme) ve etki (yüklü cismi yaklaştırma). Sürtünme ile elektriklenmede cisimler zıt cins yüklerle yüklenir.

## Elektrik Yükleri
İki tür elektrik yükü vardır: pozitif (+) ve negatif (-). Aynı cins yükler birbirini iter, zıt cins yükler birbirini çeker. Yüksüz (nötr) bir cisimde pozitif ve negatif yük sayısı eşittir.

## İletkenler ve Yalıtkanlar
Elektriği ileten maddelere iletken (bakır, demir gibi metaller), iletmeyen maddelere yalıtkan (plastik, cam, tahta, kuru hava) denir. Kablolarda iç kısım iletken, dış kısım yalıtkandır.

## Elektroskop
Elektroskop, bir cismin yüklü olup olmadığını ve yükünün cinsini anlamaya yarar. Yüklü bir cisim yaklaştırıldığında elektroskobun yaprakları açılır.

## Elektrik Enerjisinin Dönüşümü
Elektrik enerjisi başka enerji türlerine dönüşebilir: ütü ve sobada ısıya, ampulde ışığa, çamaşır makinesi ve vantilatörde hareket enerjisine dönüşür.`,
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
