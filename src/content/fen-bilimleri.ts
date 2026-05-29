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
    },
    {
      id: "madde-ve-endustri",
      name: "Madde ve Endüstri",
      summary: "Periyodik sistem, kimyasal tepkimeler, asit-baz.",
      youtubeId: "",
      cards: [],
      article: "",
    },
    {
      id: "basit-makineler",
      name: "Basit Makineler",
      summary: "Kaldıraç, makara, eğik düzlem ve çıkrık.",
      youtubeId: "",
      cards: [],
      article: "",
    },
    {
      id: "enerji-donusumleri-ve-cevre",
      name: "Enerji Dönüşümleri ve Çevre Bilimi",
      summary: "Besin zinciri, madde döngüleri ve sürdürülebilirlik.",
      youtubeId: "",
      cards: [],
      article: "",
    },
    {
      id: "elektrik-yukleri-ve-enerjisi",
      name: "Elektrik Yükleri ve Elektrik Enerjisi",
      summary: "Elektriklenme, elektrik yükleri ve elektrik enerjisi.",
      youtubeId: "",
      cards: [],
      article: "",
    },
  ],
};
