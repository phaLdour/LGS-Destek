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
          back: "Güneş ışınları Ekvator'a dik düşer; tüm dünyada gece ve gündüz eşit (12-12 saat) olur. Kuzey yarım kürede 21 Mart ilkbahar, 23 Eylül ise sonbahar başlangıcıdır.",
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
        { question: `Mevsimlerin oluşmasının temel nedeni nedir?`, options: [`Eksen eğikliği ve Dünya'nın Güneş çevresinde dolanması`, `Dünya'nın Güneş'e uzaklığı`, `Ay'ın evreleri`, `Rüzgarlar`], correctIndex: 0 },
        { question: `Dünya'nın dönme ekseni kaç derece eğiktir?`, options: [`23° 27' (yaklaşık 23,5°)`, `45°`, `90°`, `0°`], correctIndex: 0 },
        { question: `Kuzey yarım kürede yaz mevsimi hangi ayda başlar?`, options: [`21 Haziran`, `21 Mart`, `23 Eylül`, `21 Aralık`], correctIndex: 0 },
        { question: `Kuzey yarım kürede kış mevsimi hangi ayda başlar?`, options: [`21 Aralık`, `21 Haziran`, `21 Mart`, `23 Eylül`], correctIndex: 0 },
        { question: `Kuzey yarım kürede ilkbahar hangi tarihte başlar?`, options: [`21 Mart`, `21 Haziran`, `23 Eylül`, `21 Aralık`], correctIndex: 0 },
        { question: `Kuzey yarım kürede sonbahar hangi tarihte başlar?`, options: [`23 Eylül`, `21 Mart`, `21 Haziran`, `21 Aralık`], correctIndex: 0 },
        { question: `Ekvator çizgisi üzerinde mevsim değişikliği neden çok az hissedilir?`, options: [`Güneş ışınları sürekli dike yakın gelir`, `Sürekli eğik gelir`, `Hiç ışın almaz`, `Yağışlı bölgedir`], correctIndex: 0 },
        { question: `Yaz mevsiminde gündüzler daha uzundur çünkü:`, options: [`Güneş ışınları daha dik gelir ve gündüz süresi artar`, `Dünya Güneş'e yakındır`, `Ay tam aydır`, `Rüzgar daha az eser`], correctIndex: 0 },
        { question: `Kuzey yarım kürede yaz yaşanırken Güney yarım kürede hangi mevsim yaşanır?`, options: [`Kış`, `Yaz`, `Sonbahar`, `İlkbahar`], correctIndex: 0 },
        { question: `21 Haziran'da Güneş ışınları hangi paralel üzerinde dik açıyla düşer?`, options: [`Yengeç Dönencesi (23° 27' K)`, `Ekvator`, `Oğlak Dönencesi`, `Kuzey Kutbu`], correctIndex: 0 },
        { question: `21 Aralık'ta Güneş ışınları hangi paralel üzerinde dik açıyla düşer?`, options: [`Oğlak Dönencesi (23° 27' G)`, `Ekvator`, `Yengeç Dönencesi`, `Güney Kutbu`], correctIndex: 0 },
        { question: `21 Mart ve 23 Eylül'de Güneş ışınları hangi paralel üzerine dik düşer?`, options: [`Ekvator`, `Yengeç Dönencesi`, `Oğlak Dönencesi`, `Kuzey Kutbu`], correctIndex: 0 },
        { question: `Hava durumu ile iklim arasındaki temel fark nedir?`, options: [`Hava durumu kısa süreli, iklim uzun yıllar ortalamasıdır`, `Aynı şeydir`, `Her ikisi de aynı süreyi belirtir`, `İklim daha kısa sürelidir`], correctIndex: 0 },
        { question: `Bir bölgenin uzun yıllar ortalama hava koşullarına ne denir?`, options: [`İklim`, `Hava durumu`, `Mevsim`, `Yağış`], correctIndex: 0 },
        { question: `Bir bölgenin günlük ve kısa süreli hava koşullarına ne denir?`, options: [`Hava durumu`, `İklim`, `Mevsim`, `Yağış`], correctIndex: 0 },
        { question: `Yağmur, kar, dolu gibi havanın suyla ilgili olaylarına ne denir?`, options: [`Yağış`, `Sıcaklık`, `Rüzgar`, `Nem`], correctIndex: 0 },
        { question: `Su buharının soğuyarak küçük damlacıklar halinde havada asılı kalmasına ne denir?`, options: [`Bulut`, `Sis`, `Çiğ`, `Kırağı`], correctIndex: 0 },
        { question: `Yer seviyesinde oluşan, görüş mesafesini azaltan bulut türüne ne denir?`, options: [`Sis`, `Cumulus`, `Stratus`, `Sirrus`], correctIndex: 0 },
        { question: `Yer yüzeyindeki cisimler üzerinde su buharının sıvı damlacıklar şeklinde toplanmasına ne denir?`, options: [`Çiğ`, `Kırağı`, `Yağmur`, `Sis`], correctIndex: 0 },
        { question: `Yer yüzeyindeki cisimler üzerinde su buharının buz kristali olarak toplanmasına ne denir?`, options: [`Kırağı`, `Çiğ`, `Kar`, `Buz`], correctIndex: 0 },
        { question: `Bulutlardan iri tane şeklinde inen donmuş yağış türü hangisidir?`, options: [`Dolu`, `Yağmur`, `Kar`, `Çiğ`], correctIndex: 0 },
        { question: `Bulutlardan altıgen yapılı kar tanesi şeklinde inen yağış türü hangisidir?`, options: [`Kar`, `Yağmur`, `Dolu`, `Çiğ`], correctIndex: 0 },
        { question: `Aşağıdaki yağışlardan hangisi yere yakın oluşur?`, options: [`Çiğ ve kırağı`, `Kar`, `Dolu`, `Yağmur`], correctIndex: 0 },
        { question: `Yağmur, kar, dolu nerede oluşur?`, options: [`Bulutlardan`, `Yer yüzeyinde`, `Toprakta`, `Sularda`], correctIndex: 0 },
        { question: `Rüzgâr nasıl oluşur?`, options: [`Yüksek basınç alanından alçak basınç alanına hava akımıyla`, `Alçak basınçtan yüksek basınca`, `Sadece denizde`, `Sadece dağda`], correctIndex: 0 },
        { question: `Sıcak hava nasıl bir basınca sahiptir?`, options: [`Alçak basınç`, `Yüksek basınç`, `Sabit basınç`, `Sıfır basınç`], correctIndex: 0 },
        { question: `Soğuk hava nasıl bir basınca sahiptir?`, options: [`Yüksek basınç`, `Alçak basınç`, `Sabit basınç`, `Sıfır basınç`], correctIndex: 0 },
        { question: `Hava olaylarını inceleyen bilim dalına ne ad verilir?`, options: [`Meteoroloji`, `Klimatoloji`, `Coğrafya`, `Astronomi`], correctIndex: 0 },
        { question: `İklim üzerinde araştırma yapan bilim dalı hangisidir?`, options: [`Klimatoloji`, `Meteoroloji`, `Coğrafya`, `Astronomi`], correctIndex: 0 },
        { question: `Atmosferdeki sıcaklık ölçüm aleti hangisidir?`, options: [`Termometre`, `Barometre`, `Higrometre`, `Anemometre`], correctIndex: 0 },
        { question: `Hava basıncını ölçen alet hangisidir?`, options: [`Barometre`, `Termometre`, `Higrometre`, `Anemometre`], correctIndex: 0 },
        { question: `Havadaki nem oranını ölçen alet hangisidir?`, options: [`Higrometre`, `Barometre`, `Termometre`, `Anemometre`], correctIndex: 0 },
        { question: `Rüzgâr hızını ölçen alet hangisidir?`, options: [`Anemometre`, `Higrometre`, `Termometre`, `Barometre`], correctIndex: 0 },
        { question: `Yağış miktarını ölçen alet hangisidir?`, options: [`Plüviyometre`, `Anemometre`, `Higrometre`, `Termometre`], correctIndex: 0 },
        { question: `Rüzgâr yönünü gösteren araç hangisidir?`, options: [`Rüzgâr gülü`, `Termometre`, `Higrometre`, `Plüviyometre`], correctIndex: 0 },
        { question: `Aşağıdaki olaylardan hangisi mevsimlerin oluşumuna doğrudan etki etmez?`, options: [`Ay'ın evreleri`, `Dünya'nın eksen eğikliği`, `Dünya'nın Güneş çevresinde dolanması`, `Güneş ışınlarının geliş açısı`], correctIndex: 0 },
        { question: `Yengeç Dönencesi hangi enleme karşılık gelir?`, options: [`23° 27' Kuzey`, `23° 27' Güney`, `0° (Ekvator)`, `66° 33' Kuzey`], correctIndex: 0 },
        { question: `Oğlak Dönencesi hangi enleme karşılık gelir?`, options: [`23° 27' Güney`, `23° 27' Kuzey`, `0° (Ekvator)`, `66° 33' Güney`], correctIndex: 0 },
        { question: `Kuzey yarım kürede en uzun gece hangi tarihte yaşanır?`, options: [`21 Aralık`, `21 Haziran`, `21 Mart`, `23 Eylül`], correctIndex: 0 },
        { question: `Kuzey yarım kürede en uzun gündüz hangi tarihte yaşanır?`, options: [`21 Haziran`, `21 Aralık`, `21 Mart`, `23 Eylül`], correctIndex: 0 },
        { question: `Ekinoks (gece-gündüz eşitliği) hangi tarihlerde yaşanır?`, options: [`21 Mart ve 23 Eylül`, `21 Haziran ve 21 Aralık`, `Sadece 21 Haziran`, `Sadece 21 Aralık`], correctIndex: 0 },
        { question: `Solstis (yaz/kış gündönümü) hangi tarihlerdir?`, options: [`21 Haziran ve 21 Aralık`, `21 Mart ve 23 Eylül`, `Sadece 21 Haziran`, `Sadece 23 Eylül`], correctIndex: 0 },
        { question: `Bulutlarda su buharının yoğunlaşmasıyla oluşan yağış nedir?`, options: [`Yağmur`, `Çiğ`, `Kırağı`, `Sis`], correctIndex: 0 },
        { question: `İklim olaylarının yaşandığı atmosfer katmanı hangisidir?`, options: [`Troposfer`, `Stratosfer`, `Mezosfer`, `Termosfer`], correctIndex: 0 },
        { question: `Dünya'nın eksen eğikliği olmasaydı ne olurdu?`, options: [`Mevsim değişiklikleri yaşanmazdı`, `Daha çok mevsim olurdu`, `Daha çok yağış olurdu`, `Daha kısa günler olurdu`], correctIndex: 0 },
        { question: `Dünya'nın kendi ekseni etrafında dönmesi neyi oluşturur?`, options: [`Gece ve gündüzü`, `Mevsimleri`, `İklimi`, `Yağışları`], correctIndex: 0 },
        { question: `Dünya'nın Güneş çevresindeki dolanımı kaç gün sürer?`, options: [`365 gün 6 saat`, `30 gün`, `24 saat`, `7 gün`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi yağış değildir?`, options: [`Rüzgâr`, `Yağmur`, `Kar`, `Dolu`], correctIndex: 0 },
        { question: `Aynı bölgede uzun yıllar boyu görülen ortalama yağış, sıcaklık değerleri hangi kavramla anlatılır?`, options: [`İklim`, `Hava durumu`, `Yağış`, `Mevsim`], correctIndex: 0 },
        { question: `Türkiye'de görülen iklim türlerinden biri hangisidir?`, options: [`Akdeniz iklimi`, `Tropikal iklim`, `Tundra iklimi`, `Ekvatoral iklim`], correctIndex: 0 },
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
              { kind: "ornek", content: "4 çeşit nükleotit: Adenin (A), Timin (T), Guanin (G), Sitozin (C ya da S). DNA'da A daima T ile, G daima C ile eşleşir; A=T ve G=C sayıları eşittir." },
              { kind: "tuzak", content: "Sitozin için Türkçe kaynaklar 'S' (Sitozin), uluslararası kaynaklar 'C' (Cytosine) kısaltmasını kullanır. Soru hangisini yazarsa yazsın ikisi de aynı bazı belirtir." },
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
      quickQuestions: [
        { question: `Kalıtsal bilgiyi taşıyan molekül hangisidir?`, options: [`DNA`, `RNA`, `Protein`, `Karbonhidrat`], correctIndex: 0 },
        { question: `DNA'nın açılımı hangisidir?`, options: [`Deoksiribonükleik asit`, `Diribonükleik asit`, `Doğal nükleik asit`, `Demir nükleik asit`], correctIndex: 0 },
        { question: `DNA hücrenin neresinde bulunur?`, options: [`Çekirdek`, `Sitoplazma`, `Hücre zarı`, `Hücre dışı`], correctIndex: 0 },
        { question: `DNA'nın yapı taşı nedir?`, options: [`Nükleotit`, `Amino asit`, `Glikoz`, `Yağ asidi`], correctIndex: 0 },
        { question: `Bir nükleotit hangi üç birimden oluşur?`, options: [`Şeker (deoksiriboz) + Fosfat + Organik baz`, `Şeker + Protein + Yağ`, `Aminoasit + Glikoz + Su`, `Fosfat + Protein + Yağ`], correctIndex: 0 },
        { question: `DNA'da kaç çeşit organik baz vardır?`, options: [`4`, `2`, `3`, `6`], correctIndex: 0 },
        { question: `DNA'nın organik bazları hangileridir?`, options: [`Adenin, Guanin, Sitozin, Timin`, `A, U, C, G`, `A, T, X, Y`, `A, B, C, D`], correctIndex: 0 },
        { question: `DNA'da Adenin (A) hangi bazla eşleşir?`, options: [`Timin (T)`, `Guanin (G)`, `Sitozin (C)`, `Urasil (U)`], correctIndex: 0 },
        { question: `DNA'da Guanin (G) hangi bazla eşleşir?`, options: [`Sitozin (C)`, `Timin (T)`, `Adenin (A)`, `Urasil (U)`], correctIndex: 0 },
        { question: `DNA kaç iplikten (zincirden) oluşur?`, options: [`İki iplik (çift sarmal)`, `Tek iplik`, `Üç iplik`, `Dört iplik`], correctIndex: 0 },
        { question: `DNA molekülünün şekli nasıldır?`, options: [`Çift sarmal (helezon)`, `Düz çizgi`, `Halka`, `Kare`], correctIndex: 0 },
        { question: `Bir DNA ipliğinde Adenin sayısı 100 ise diğer iplikte kaç Timin olur?`, options: [`100 (A-T eşleşmesi)`, `50`, `200`, `Bilinemez`], correctIndex: 0 },
        { question: `Bir DNA ipliğinde Guanin sayısı 60 ise diğer iplikte kaç Sitozin olur?`, options: [`60 (G-C eşleşmesi)`, `30`, `120`, `Bilinemez`], correctIndex: 0 },
        { question: `DNA'nın yapı taşı olan nükleotitler birbirine nasıl bağlanır?`, options: [`Şeker-fosfat omurgası ile`, `Sadece bazlar arası`, `Sadece şekerler arası`, `Sadece fosfatlar arası`], correctIndex: 0 },
        { question: `DNA çift sarmalında iki iplik birbirine nasıl bağlanır?`, options: [`Bazlar arasındaki bağlarla`, `Şekerler arasında`, `Fosfatlar arasında`, `Bağlı değildir`], correctIndex: 0 },
        { question: `Genleri taşıyan ve hücre bölünürken kısalıp kalınlaşan yapıya ne denir?`, options: [`Kromozom`, `Nükleotit`, `Gen`, `Ribozom`], correctIndex: 0 },
        { question: `Bir karakterin oluşmasını sağlayan DNA parçasına ne denir?`, options: [`Gen`, `Kromozom`, `Nükleotit`, `Ribozom`], correctIndex: 0 },
        { question: `İnsan vücut hücrelerinde kaç kromozom vardır?`, options: [`46 (23 çift)`, `23`, `48`, `44`], correctIndex: 0 },
        { question: `İnsan üreme hücrelerinde (yumurta/sperm) kaç kromozom vardır?`, options: [`23 (n)`, `46`, `48`, `92`], correctIndex: 0 },
        { question: `Erkek bireyin cinsiyet kromozomları nelerdir?`, options: [`XY`, `XX`, `YY`, `XYY`], correctIndex: 0 },
        { question: `Kadın bireyin cinsiyet kromozomları nelerdir?`, options: [`XX`, `XY`, `YY`, `XXY`], correctIndex: 0 },
        { question: `Bebeğin cinsiyetini belirleyen ebeveyn hangisidir?`, options: [`Baba (X veya Y verir)`, `Anne`, `İkisi birlikte eşit`, `Hiçbiri`], correctIndex: 0 },
        { question: `Bir insanın vücut hücresindeki kromozom sayısı (46) ile üreme hücresindeki (23) arasındaki ilişki nedir?`, options: [`Üreme hücresinde yarısı bulunur`, `İki katı bulunur`, `Aynı sayıdadır`, `Üç katı bulunur`], correctIndex: 0 },
        { question: `Üreme hücrelerinin kromozom sayısının yarı olmasının sebebi nedir?`, options: [`Döllenmeyle yeniden 46 olması`, `Hücre küçük olduğu için`, `Tesadüf`, `Bilinmiyor`], correctIndex: 0 },
        { question: `Aynı genin farklı şekillerine ne denir?`, options: [`Alel`, `Genom`, `Kromozom`, `Nükleotit`], correctIndex: 0 },
        { question: `Tek alelle bile özelliği gösteren karaktere ne denir?`, options: [`Baskın (dominant)`, `Çekinik (resesif)`, `Mutant`, `Modifikasyon`], correctIndex: 0 },
        { question: `Saf döl olarak iki çekinik gen birleştiğinde ortaya çıkan karaktere ne denir?`, options: [`Çekinik (resesif)`, `Baskın`, `Mutant`, `Modifikasyon`], correctIndex: 0 },
        { question: `Aynı genleri taşıyan birey için kullanılan terim hangisidir?`, options: [`Homozigot (saf döl)`, `Heterozigot`, `Mutant`, `Modifikasyon`], correctIndex: 0 },
        { question: `Farklı alelleri taşıyan birey için kullanılan terim hangisidir?`, options: [`Heterozigot (melez)`, `Homozigot`, `Mutant`, `Modifikasyon`], correctIndex: 0 },
        { question: `Bireyin görünen özelliklerine (fiziksel) ne denir?`, options: [`Fenotip`, `Genotip`, `Karyotip`, `Mutant`], correctIndex: 0 },
        { question: `Bireyin gen yapısına ne denir?`, options: [`Genotip`, `Fenotip`, `Karyotip`, `Mutant`], correctIndex: 0 },
        { question: `Anne ve babadan gelen kalıtsal özelliklerin bireye geçmesine ne denir?`, options: [`Kalıtım`, `Modifikasyon`, `Mutasyon`, `Adaptasyon`], correctIndex: 0 },
        { question: `Kalıtım yasalarını ilk ortaya koyan bilim insanı kimdir?`, options: [`Gregor Mendel`, `Charles Darwin`, `Louis Pasteur`, `Albert Einstein`], correctIndex: 0 },
        { question: `Mendel deneylerini hangi bitkide yapmıştır?`, options: [`Bezelye`, `Mısır`, `Buğday`, `Domates`], correctIndex: 0 },
        { question: `DNA'da gerçekleşen kalıcı değişikliklere ne denir?`, options: [`Mutasyon`, `Modifikasyon`, `Adaptasyon`, `Kalıtım`], correctIndex: 0 },
        { question: `Çevre etkisiyle oluşan, kalıtsal olmayan değişikliklere ne denir?`, options: [`Modifikasyon`, `Mutasyon`, `Adaptasyon`, `Kalıtım`], correctIndex: 0 },
        { question: `Canlının çevreye uyum sağlamasına ne denir?`, options: [`Adaptasyon`, `Modifikasyon`, `Mutasyon`, `Kalıtım`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi mutasyon nedeni değildir?`, options: [`Sağlıklı beslenme`, `Radyasyon`, `Bazı kimyasallar`, `Mor ötesi ışınlar`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi modifikasyona örnektir?`, options: [`Sıcakta bronzlaşma`, `Renk körlüğü`, `Down sendromu`, `Orak hücreli anemi`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi kalıtsal hastalık değildir?`, options: [`Soğuk algınlığı`, `Renk körlüğü`, `Hemofili`, `Orak hücreli anemi`], correctIndex: 0 },
        { question: `Renk körlüğü ve hemofili hangi tür hastalıklardandır?`, options: [`Kalıtsal hastalık`, `Bulaşıcı hastalık`, `Çevresel hastalık`, `Beslenme bozukluğu`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi biyoteknoloji uygulamasıdır?`, options: [`GDO (genetiği değiştirilmiş organizma)`, `Buz çözme`, `Resim çizme`, `Buharlaşma`], correctIndex: 0 },
        { question: `İnsan genomunu çözmeye yönelik büyük proje hangisidir?`, options: [`İnsan Genom Projesi`, `Apollo Projesi`, `Manhattan Projesi`, `Sirius Projesi`], correctIndex: 0 },
        { question: `DNA'nın ilk modellenmesi hangi bilim insanlarına atfedilir?`, options: [`Watson ve Crick`, `Mendel ve Darwin`, `Pasteur ve Koch`, `Edison ve Tesla`], correctIndex: 0 },
        { question: `Genler hangi büyük yapı içinde bulunur?`, options: [`Kromozom (DNA üzerinde)`, `Sitoplazma`, `Hücre zarı`, `Ribozom`], correctIndex: 0 },
        { question: `Saf döl baskın × saf döl çekinik çaprazlamasında (F1) yavruların fenotipi nasıl olur?`, options: [`Hepsi baskın görünümlü (heterozigot)`, `Hepsi çekinik`, `3 baskın : 1 çekinik`, `Yarı yarıya`], correctIndex: 0 },
        { question: `Heterozigot bir bireyin gametleri nasıldır?`, options: [`İki farklı tip alel taşır (Aa → A ve a)`, `Aynı alel`, `Hiç alel taşımaz`, `Üç farklı alel taşır`], correctIndex: 0 },
        { question: `DNA'da kaç çeşit organik baz bulunur?`, options: [`4 (A, T, G, C)`, `2`, `3`, `5`], correctIndex: 0 },
        { question: `İnsanda göz rengi, saç rengi gibi kalıtsal özellikleri belirleyen yapı nedir?`, options: [`Genler`, `Hormonlar`, `Vitaminler`, `Mineraller`], correctIndex: 0 },
        { question: `Aynı yumurta ikizlerinin genetik bilgisi nasıldır?`, options: [`Tamamen aynıdır`, `Tamamen farklıdır`, `Yarı aynıdır`, `Hiç benzemez`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Basınç nedir?`, options: [`Birim yüzeye dik olarak uygulanan kuvvet`, `Toplam ağırlık`, `Hız`, `İvme`], correctIndex: 0 },
        { question: `Katı basıncının formülü nedir?`, options: [`P = F / A`, `P = F · A`, `P = A / F`, `P = m · g`], correctIndex: 0 },
        { question: `Basıncın SI birimi nedir?`, options: [`Paskal (Pa)`, `Newton (N)`, `Joule (J)`, `Watt (W)`], correctIndex: 0 },
        { question: `1 Pa kaç N/m²'dir?`, options: [`1 N/m²`, `10 N/m²`, `100 N/m²`, `1000 N/m²`], correctIndex: 0 },
        { question: `Katı bir cismin yere uyguladığı basınç neye bağlıdır?`, options: [`Ağırlığa (F) ve yüzey alanına (A)`, `Sadece ağırlığa`, `Sadece hacme`, `Sadece sıcaklığa`], correctIndex: 0 },
        { question: `Bir katının yüzey alanı küçültülürse basınç nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Bir katının ağırlığı artırılırsa (alan sabit) basınç nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Kar üzerinde batmamak için geniş tabanlı kayak kullanılır. Bunun fizik açıklaması nedir?`, options: [`Yüzey alanı artırılarak basınç azaltılır`, `Yüzey alanı azaltılarak basınç artırılır`, `Ağırlık artırılır`, `Sürtünme azalır`], correctIndex: 0 },
        { question: `Çivinin sivri ucu sıkıştırırken basıncı nasıl etkiler?`, options: [`Küçük yüzeyde büyük basınç oluşur`, `Yüzey alanı genişlediği için basınç azalır`, `Basınç değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Bıçağın keskin olması neyle açıklanır?`, options: [`Küçük temas alanı → yüksek basınç`, `Geniş temas alanı`, `Düşük ağırlık`, `Sürtünme`], correctIndex: 0 },
        { question: `Sıvıların yaptığı basınca ne denir?`, options: [`Sıvı basıncı`, `Hava basıncı`, `Açık hava basıncı`, `Atmosfer basıncı`], correctIndex: 0 },
        { question: `Sıvı basıncı formülü nedir?`, options: [`P = h · d · g`, `P = F / A`, `P = m · g`, `P = V · d`], correctIndex: 0 },
        { question: `Sıvı basıncı hangi büyüklüklere bağlıdır?`, options: [`Sıvı yüksekliği, sıvı yoğunluğu, yer çekimi`, `Kabın şekli`, `Sıvının rengi`, `Sıcaklık`], correctIndex: 0 },
        { question: `Sıvı basıncı kabın şekline bağlı mıdır?`, options: [`Hayır`, `Evet`, `Bazen`, `Sadece silindirde`], correctIndex: 0 },
        { question: `Suyun derinliği arttıkça basınç nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Aynı derinlikte farklı yoğunluktaki sıvılardan hangisi daha fazla basınç yapar?`, options: [`Yoğunluğu büyük olan`, `Yoğunluğu küçük olan`, `Eşit basınç yapar`, `Hiçbiri`], correctIndex: 0 },
        { question: `Sıvının ağırlığı sıvı basıncına etki eder mi?`, options: [`Hayır (ağırlık değil; yükseklik, yoğunluk ve g önemli)`, `Evet, doğrudan`, `Evet, ters orantılı`, `Sadece okyanusta`], correctIndex: 0 },
        { question: `Dünya'nın etrafını saran hava tabakasına ne denir?`, options: [`Atmosfer`, `Litosfer`, `Hidrosfer`, `Biyosfer`], correctIndex: 0 },
        { question: `Atmosferin yeryüzüne yaptığı basınca ne denir?`, options: [`Açık hava basıncı (atmosfer basıncı)`, `Sıvı basıncı`, `Katı basıncı`, `Kapalı kap basıncı`], correctIndex: 0 },
        { question: `Açık hava basıncını ilk ölçen bilim insanı kimdir?`, options: [`Torricelli`, `Galileo`, `Newton`, `Pascal`], correctIndex: 0 },
        { question: `Deniz seviyesindeki açık hava basıncı kaç cm-Hg'dir?`, options: [`76 cm-Hg`, `100 cm-Hg`, `50 cm-Hg`, `10 cm-Hg`], correctIndex: 0 },
        { question: `Yükseğe çıkıldıkça açık hava basıncı nasıl değişir?`, options: [`Azalır`, `Artar`, `Değişmez`, `Önce artar sonra azalır`], correctIndex: 0 },
        { question: `Yükseklere çıkıldıkça atmosfer basıncı azaldığı için neden zorlanılır?`, options: [`Solunum güçleşir`, `Solunum kolaylaşır`, `Sıcaklık artar`, `Yağış artar`], correctIndex: 0 },
        { question: `Hava basıncını ölçen alet hangisidir?`, options: [`Barometre`, `Termometre`, `Higrometre`, `Manometre`], correctIndex: 0 },
        { question: `Kapalı kaptaki gaz basıncını ölçen alet hangisidir?`, options: [`Manometre`, `Barometre`, `Termometre`, `Higrometre`], correctIndex: 0 },
        { question: `Gaz basıncı gaz moleküllerinin neyiyle ilişkilidir?`, options: [`Hareketleri (çarpışmaları)`, `Renkleri`, `Boyutları`, `Yoğunlukları yalnız`], correctIndex: 0 },
        { question: `Sabit hacimli gazın sıcaklığı artarsa basıncı nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Sabit sıcaklıkta gazın hacmi azaltılırsa basıncı nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Sıvı ve gaz basıncının uygulamada kullanıldığı bir alet hangisidir?`, options: [`Hidrolik fren`, `Bisiklet zinciri`, `Çekiç`, `Manivela`], correctIndex: 0 },
        { question: `Pascal Prensibi neyle ilgilidir?`, options: [`Kapalı kaptaki sıvıya uygulanan basıncın her noktaya aynen iletilmesi`, `Sıvının kaynaması`, `Donmaları`, `Çözünmeleri`], correctIndex: 0 },
        { question: `Hidrolik sistemler hangi sıvının basıncını kullanır?`, options: [`Sıvı (genelde yağ)`, `Hava`, `Su buharı`, `Cıva`], correctIndex: 0 },
        { question: `Vantuz hangi basınç farkıyla yapışır?`, options: [`İç basınç dış basınçtan azdır, dış basınç tutturur`, `Eşit basınç`, `İç basınç fazladır`, `Sürtünmeyle`], correctIndex: 0 },
        { question: `Bir cisim sıvıda yüzüyorsa yoğunluğu nasıldır?`, options: [`Sıvının yoğunluğundan küçük`, `Sıvının yoğunluğundan büyük`, `Eşit`, `Sıfır`], correctIndex: 0 },
        { question: `Bir cisim sıvıda batmıyorsa cisme uygulanan kaldırma kuvveti ağırlığına eşittir. Bu hangi prensiptir?`, options: [`Arşimet`, `Pascal`, `Newton`, `Boyle`], correctIndex: 0 },
        { question: `Suya konan bir cismin batıp yüzmesini belirleyen büyüklük hangisidir?`, options: [`Yoğunluk`, `Sıcaklık`, `Renk`, `Şekil`], correctIndex: 0 },
        { question: `Sıvı basıncının kabın şekline bağlı olmaması ile ilgili olarak aşağıdakilerden hangisi doğrudur?`, options: [`Aynı derinlikte basınç eşittir`, `Kap genişledikçe basınç artar`, `Kap daraldıkça basınç azalır`, `Şekil basıncı belirler`], correctIndex: 0 },
        { question: `Dalgıçlar derine indikçe basınç arttığından özel kıyafet giyerler. Neden?`, options: [`Derinde sıvı basıncı çok yüksektir`, `Sıvı basıncı sıfırdır`, `Hava basıncı sıfırdır`, `Kaldırma kuvveti yoktur`], correctIndex: 0 },
        { question: `Deniz dibindeki balıkları su altında ezilmemek için ne yardımcı olur?`, options: [`Vücut yapıları yüksek basınca dayanıklıdır`, `Çok yağlıdır`, `Çok hafiftirler`, `Hızlı yüzerler`], correctIndex: 0 },
        { question: `Aynı kuvvet, küçük yüzeye uygulandığında nasıl bir basınç oluşur?`, options: [`Büyük basınç`, `Küçük basınç`, `Sıfır basınç`, `Sabit basınç`], correctIndex: 0 },
        { question: `Aynı kuvvet büyük yüzeye uygulandığında nasıl bir basınç oluşur?`, options: [`Küçük basınç`, `Büyük basınç`, `Sıfır basınç`, `Değişmez`], correctIndex: 0 },
        { question: `Tankların geniş paletli olması neden basıncı azaltır?`, options: [`Yüzey alanını artırır`, `Ağırlığı azaltır`, `Hızı artırır`, `Sürtünmeyi azaltır`], correctIndex: 0 },
        { question: `Demir köprünün ayakları neden geniş yapılır?`, options: [`Zemine yapılan basıncı azaltmak için`, `Görünüş için`, `Hızı azaltmak için`, `Yer çekimi için`], correctIndex: 0 },
        { question: `Aynı kütleli iki cisim yüzeye uygularsa basınçları neye bağlı olarak değişir?`, options: [`Temas yüzey alanına`, `Renge`, `Şeffaflığa`, `Sıcaklığa`], correctIndex: 0 },
        { question: `Sıvı basıncı kabın şekline bağlı olmadığını gösteren prensibe ne denir?`, options: [`Sıvıların hidrostatik özelliği`, `Pascal Prensibi`, `Arşimet Prensibi`, `Boyle Yasası`], correctIndex: 0 },
        { question: `Su deposu yüksek yere konursa şehirde su basıncı nasıl olur?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Aynı sıvı içinde aynı derinlikteki noktaların basıncı nasıldır?`, options: [`Eşittir`, `Farklıdır`, `Sıfırdır`, `Pozitif sonsuzdur`], correctIndex: 0 },
        { question: `Atmosfer basıncı yüksekken hava genelde nasıldır?`, options: [`Açık`, `Kapalı/yağışlı`, `Karlı`, `Tipik`], correctIndex: 0 },
        { question: `Atmosfer basıncı düşükken hava genelde nasıldır?`, options: [`Kapalı/yağışlı`, `Açık`, `Soğuk`, `Sıcak`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi basıncın günlük yaşamdaki uygulamasıdır?`, options: [`Pipet ile içecek içme`, `Kitap okuma`, `Yürüme`, `Konuşma`], correctIndex: 0 },
        { question: `Pipetle içecek içerken hangi prensipten yararlanılır?`, options: [`Açık hava basıncı emer`, `Yer çekimi iter`, `Sürtünme iter`, `Mıknatıs çeker`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Periyodik cetvelin yatay sıralarına ne denir?`, options: [`Periyot`, `Grup`, `Blok`, `Aile`], correctIndex: 0 },
        { question: `Periyodik cetvelin dikey sütunlarına ne denir?`, options: [`Grup`, `Periyot`, `Blok`, `Aile`], correctIndex: 0 },
        { question: `Periyodik cetvelde aynı grupta yer alan elementler için ne söylenebilir?`, options: [`Benzer kimyasal özellik gösterir`, `Aynı atom numarasına sahip`, `Aynı kütleye sahip`, `Aynı renge sahip`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi metaldir?`, options: [`Demir (Fe)`, `Oksijen (O)`, `Klor (Cl)`, `Helyum (He)`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi ametaldir?`, options: [`Klor`, `Demir`, `Bakır`, `Altın`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi soygazdır?`, options: [`Helyum (He)`, `Demir`, `Bakır`, `Klor`], correctIndex: 0 },
        { question: `Periyodik cetvelin 1. grubu hangi metaller ailesidir?`, options: [`Alkali metaller`, `Halojenler`, `Soygazlar`, `Toprak alkali metaller`], correctIndex: 0 },
        { question: `Periyodik cetvelin 17. grubu hangi ailedir?`, options: [`Halojenler`, `Soygazlar`, `Alkali metaller`, `Toprak alkali metaller`], correctIndex: 0 },
        { question: `Periyodik cetvelin 18. grubu hangi ailedir?`, options: [`Soygazlar`, `Halojenler`, `Alkali metaller`, `Toprak alkali metaller`], correctIndex: 0 },
        { question: `Soygazların kimyasal aktiflikleri nasıldır?`, options: [`Çok düşüktür (kararlıdır)`, `Çok yüksektir`, `Orta düzeydedir`, `Soygazlar bileşik yapar`], correctIndex: 0 },
        { question: `Periyodik cetvelde aşağıdakilerden hangisi metallerin özelliği değildir?`, options: [`Kırılgan olmaları`, `Isı ve elektriği iletmesi`, `Parlak olması`, `Tel ve levha hâline gelebilmesi`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi ametallerin özelliğidir?`, options: [`Isı ve elektriği iyi iletmez`, `Parlaktır`, `Tel ve levha olur`, `Yüksek yoğunluktadır`], correctIndex: 0 },
        { question: `Suyun kimyasal formülü nedir?`, options: [`H₂O`, `CO₂`, `H₂SO₄`, `NaCl`], correctIndex: 0 },
        { question: `Karbon dioksitin formülü nedir?`, options: [`CO₂`, `CO`, `H₂CO₃`, `Na₂CO₃`], correctIndex: 0 },
        { question: `Tuz (sofra tuzu) kimyasal olarak nedir?`, options: [`NaCl`, `KCl`, `CaCO₃`, `MgSO₄`], correctIndex: 0 },
        { question: `Asitlerin pH değeri kaçtır?`, options: [`7'den küçük`, `7'den büyük`, `Tam 7`, `Tam 14`], correctIndex: 0 },
        { question: `Bazların pH değeri kaçtır?`, options: [`7'den büyük`, `7'den küçük`, `Tam 7`, `Tam 0`], correctIndex: 0 },
        { question: `Saf suyun pH değeri kaçtır?`, options: [`7`, `1`, `14`, `0`], correctIndex: 0 },
        { question: `Turnusol kâğıdını kırmızıya boyayan madde hangi türdendir?`, options: [`Asit`, `Baz`, `Tuz`, `Nötr`], correctIndex: 0 },
        { question: `Turnusol kâğıdını maviye boyayan madde hangi türdendir?`, options: [`Baz`, `Asit`, `Tuz`, `Nötr`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi günlük yaşamda kullanılan bir asittir?`, options: [`Sirke (asetik asit)`, `Karbonat`, `Sabun`, `Çamaşır sodası`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi günlük yaşamda kullanılan bir bazdır?`, options: [`Sabun`, `Sirke`, `Limon suyu`, `Mide asidi`], correctIndex: 0 },
        { question: `Asit ile baz tepkimesinden ne oluşur?`, options: [`Tuz ve su`, `Sadece tuz`, `Sadece su`, `Hidrojen gazı`], correctIndex: 0 },
        { question: `Asit yağmurlarının ana nedeni nedir?`, options: [`Hava kirliliği (SO₂, NOx)`, `Yer çekimi`, `Buharlaşma`, `Fotosentez`], correctIndex: 0 },
        { question: `Mide asidi hangi asittir?`, options: [`Hidroklorik asit (HCl)`, `Sülfürik asit`, `Asetik asit`, `Karbonik asit`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi fiziksel değişimdir?`, options: [`Suyun donması`, `Kağıdın yanması`, `Mumun yanması`, `Demirin paslanması`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi kimyasal değişimdir?`, options: [`Demirin paslanması`, `Suyun donması`, `Buzun erimesi`, `Şekerin suda çözünmesi`], correctIndex: 0 },
        { question: `Mumun yanması hangi tür değişimdir?`, options: [`Kimyasal`, `Fiziksel`, `Mekanik`, `Termik`], correctIndex: 0 },
        { question: `Mumun erimesi hangi tür değişimdir?`, options: [`Fiziksel`, `Kimyasal`, `Mekanik`, `Termik`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi karışım değildir?`, options: [`Su (H₂O)`, `Hava`, `Tuzlu su`, `Çay`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi homojen karışımdır?`, options: [`Tuzlu su`, `Ayran`, `Süt`, `Çamurlu su`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi heterojen karışımdır?`, options: [`Ayran`, `Şekerli su`, `Tuzlu su`, `Hava`], correctIndex: 0 },
        { question: `Su + tuz karışımından tuzu ayırmak için hangi yöntem kullanılır?`, options: [`Buharlaştırma`, `Mıknatıs`, `Süzme`, `Yüzdürme`], correctIndex: 0 },
        { question: `Demir tozu + kum karışımından demir nasıl ayrılır?`, options: [`Mıknatıs`, `Süzme`, `Buharlaştırma`, `Damıtma`], correctIndex: 0 },
        { question: `Su + kum karışımı nasıl ayrılır?`, options: [`Süzme`, `Mıknatıs`, `Damıtma`, `Buharlaştırma`], correctIndex: 0 },
        { question: `Su + alkol karışımı nasıl ayrılır?`, options: [`Damıtma (kaynama noktası farkı)`, `Mıknatıs`, `Süzme`, `Eleme`], correctIndex: 0 },
        { question: `Elementlerin en küçük yapı taşı nedir?`, options: [`Atom`, `Molekül`, `Hücre`, `İyon`], correctIndex: 0 },
        { question: `Aynı cins atomlardan oluşan saf maddelere ne denir?`, options: [`Element`, `Bileşik`, `Karışım`, `Çözelti`], correctIndex: 0 },
        { question: `Farklı atomların belirli oranlarda birleşmesiyle oluşan saf maddelere ne denir?`, options: [`Bileşik`, `Element`, `Karışım`, `Çözelti`], correctIndex: 0 },
        { question: `Endüstride kullanılan en yaygın metal hangisidir?`, options: [`Demir`, `Altın`, `Gümüş`, `Platin`], correctIndex: 0 },
        { question: `Geri dönüşüm sembolü hangi şekildedir?`, options: [`Üç ok ile oluşan üçgen`, `Düz çizgi`, `Dolu daire`, `Boş kare`], correctIndex: 0 },
        { question: `Geri dönüşümün çevreye en önemli faydası nedir?`, options: [`Doğal kaynakları korur ve enerji tasarrufu sağlar`, `Hava sıcaklığını yükseltir`, `Pas oluşturur`, `Yağışı artırır`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi geri dönüştürülebilir bir maddedir?`, options: [`Kâğıt`, `Yiyecek atığı`, `Cam kırığı (kesik)`, `Pil`], correctIndex: 0 },
        { question: `Plastik atıkların geri dönüşüm sembolünde rakam ne anlama gelir?`, options: [`Plastik türü`, `Yaşı`, `Ağırlığı`, `Üretici`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi tehlikeli atıktır?`, options: [`Pil`, `Kâğıt`, `Cam`, `Plastik şişe`], correctIndex: 0 },
        { question: `Petrolden elde edilen sentetik bir madde hangisidir?`, options: [`Plastik`, `Cam`, `Pamuk`, `Yün`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi temizlik maddelerinde sıkça bulunur?`, options: [`Bazlar`, `Asitler`, `Tuzlar`, `Soygazlar`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi maddelerin kimyasal değişimine örnek değildir?`, options: [`Suyun donması`, `Yumurtanın haşlanması`, `Sütün kesilmesi`, `Elmanın çürümesi`], correctIndex: 0 },
        { question: `Maddenin yanma olayında oluşan gaz hangisidir?`, options: [`Karbondioksit`, `Oksijen`, `Hidrojen`, `Azot`], correctIndex: 0 },
        { question: `Yangın söndürmek için kullanılan gaz hangisidir?`, options: [`Karbondioksit (CO₂)`, `Oksijen`, `Hidrojen`, `Helyum`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Basit makine nedir?`, options: [`İşi kolaylaştıran araç`, `Karmaşık makineler`, `Elektrikli aletler`, `Bilgisayarlar`], correctIndex: 0 },
        { question: `Basit makineler aşağıdaki hangisinden kazanç sağlamaz?`, options: [`İşten`, `Kuvvetten`, `Yoldan`, `Yönden`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi basit makine değildir?`, options: [`Otomobil`, `Kaldıraç`, `Makara`, `Eğik düzlem`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi basit makinedir?`, options: [`Kaldıraç`, `Otomobil`, `Bilgisayar`, `Cep telefonu`], correctIndex: 0 },
        { question: `Kaldıraç türlerinden hangisinde destek noktası ortadadır?`, options: [`1. tür`, `2. tür`, `3. tür`, `4. tür`], correctIndex: 0 },
        { question: `Kaldıraç türlerinden hangisinde yük ortadadır?`, options: [`2. tür`, `1. tür`, `3. tür`, `4. tür`], correctIndex: 0 },
        { question: `Kaldıraç türlerinden hangisinde kuvvet ortadadır?`, options: [`3. tür`, `1. tür`, `2. tür`, `4. tür`], correctIndex: 0 },
        { question: `Tahterevalli hangi tür kaldıraçtır?`, options: [`1. tür`, `2. tür`, `3. tür`, `Kaldıraç değil`], correctIndex: 0 },
        { question: `El arabası hangi tür kaldıraçtır?`, options: [`2. tür`, `1. tür`, `3. tür`, `Kaldıraç değil`], correctIndex: 0 },
        { question: `Saç pensesi hangi tür kaldıraçtır?`, options: [`3. tür`, `1. tür`, `2. tür`, `Kaldıraç değil`], correctIndex: 0 },
        { question: `Aşağıdaki kaldıraçlardan hangisi kuvvetten kazanç sağlar?`, options: [`2. tür (yük ortada)`, `3. tür (kuvvet ortada)`, `Kuvvetten kaybeden hiçbir tür yoktur`, `Sadece 1. tür`], correctIndex: 0 },
        { question: `Aşağıdaki kaldıraçlardan hangisi kuvvetten kayıp ama yoldan kazanç sağlar?`, options: [`3. tür (kuvvet ortada)`, `1. tür`, `2. tür`, `Hiçbiri`], correctIndex: 0 },
        { question: `Sabit makara aşağıdakilerden hangisini sağlar?`, options: [`Kuvvetin yönünü değiştirir`, `Kuvvetten kazanç sağlar`, `Yoldan kazanç sağlar`, `İşten kazanç sağlar`], correctIndex: 0 },
        { question: `Hareketli makara aşağıdakilerden hangisini sağlar?`, options: [`Kuvvetten kazanç (yarıya iner)`, `Yoldan kazanç`, `Hızdan kazanç`, `İşten kazanç`], correctIndex: 0 },
        { question: `Bir hareketli makarada uygulanan kuvvet yükün kaçta kaçıdır?`, options: [`1/2`, `2`, `1/4`, `4`], correctIndex: 0 },
        { question: `Hareketli makarada yolun yükle ilişkisi nasıldır?`, options: [`İpin çekilen yolu, yükün yolunun iki katıdır`, `Eşittir`, `Yarısıdır`, `Üç katıdır`], correctIndex: 0 },
        { question: `Palanga (birleşik makara) sistemi neyi sağlar?`, options: [`Hem kuvvetten hem yön değişiminden kazanç`, `Sadece yön değişimi`, `Sadece kuvvetten kazanç`, `Hiçbir kazanç sağlamaz`], correctIndex: 0 },
        { question: `Eğik düzlem bir basit makinedir; aşağıdakilerden hangisini sağlar?`, options: [`Kuvvetten kazanç (yoldan kayıp)`, `Yoldan kazanç`, `Yön değişimi yalnız`, `İşten kazanç`], correctIndex: 0 },
        { question: `Eğik düzlemde yük yere doğru "düşmek" yerine eğik yüzey boyunca itilir. Nedeni?`, options: [`Daha az kuvvet uygulamak için yol uzar`, `Kuvvet artar`, `Hız artar`, `Sürtünme azalır`], correctIndex: 0 },
        { question: `Aynı yüksekliği farklı uzunluktaki iki eğik düzlemden çıkarken hangisi daha az kuvvetle çıkar?`, options: [`Daha uzun olan`, `Daha kısa olan`, `Eşit`, `Hiçbiri`], correctIndex: 0 },
        { question: `Eğik düzlemin eğim açısı azalırsa uygulanan kuvvet nasıl değişir?`, options: [`Azalır`, `Artar`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Vida (cıvata) hangi basit makinenin uyarlamasıdır?`, options: [`Eğik düzlem (helezon şeklinde sarılmış)`, `Kaldıraç`, `Makara`, `Çark`], correctIndex: 0 },
        { question: `Kama hangi basit makinenin uyarlamasıdır?`, options: [`Eğik düzlem (iki adet karşılıklı)`, `Kaldıraç`, `Makara`, `Çark`], correctIndex: 0 },
        { question: `Balta, bıçak ve testere hangi basit makineye dayanır?`, options: [`Kama (eğik düzlem)`, `Kaldıraç`, `Makara`, `Çark`], correctIndex: 0 },
        { question: `Çıkrık hangi basit makinedir?`, options: [`Çark / dingilin birleşimi`, `Kaldıraç`, `Makara`, `Eğik düzlem`], correctIndex: 0 },
        { question: `Bisiklet pedalı + dişlisi hangi basit makineye dayanır?`, options: [`Çark-dingil (volan-mil)`, `Eğik düzlem`, `Makara`, `Kama`], correctIndex: 0 },
        { question: `Kuvvetin uygulandığı yer ile yükün arasındaki uzaklığın azalması ile uygulanan kuvvet nasıl olur?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Kaldıraçta yük kolu uzarsa uygulanan kuvvet nasıl olur?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Kaldıraçta kuvvet kolu uzarsa uygulanan kuvvet nasıl olur?`, options: [`Azalır`, `Artar`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Sabit ve hareketli makaranın birlikte kullanıldığı sistemin adı nedir?`, options: [`Palanga`, `Çıkrık`, `Çark`, `Vidalı sistem`], correctIndex: 0 },
        { question: `İki hareketli makaralı bir palangada kuvvet kazancı kaç olur?`, options: [`4 (hareketli sayısı × 2)`, `2`, `8`, `1`], correctIndex: 0 },
        { question: `Maket bıçağının ucundaki "açıklığın" küçük olmasının nedeni nedir?`, options: [`Eğim daha az olur → daha az kuvvetle kesim`, `Daha hızlı keser`, `Sürtünme artar`, `Daha ağır olur`], correctIndex: 0 },
        { question: `Aşağıdaki olaylardan hangisi basit makine kullanımı içermez?`, options: [`Yürüme`, `El arabasıyla yük taşıma`, `Bayrak çekme (sabit makara)`, `Tahterevalli`], correctIndex: 0 },
        { question: `Kuyudan kovayla su çekmek için kullanılan basit makine hangisidir?`, options: [`Çıkrık`, `Kaldıraç`, `Eğik düzlem`, `Hareketli makara`], correctIndex: 0 },
        { question: `Bir cisme uygulanan kuvvetin yarısı kadar uygulayıp aynı işi yapmak için hangi basit makine kullanılır?`, options: [`Hareketli makara`, `Sabit makara`, `1. tür kaldıraç (denge)`, `3. tür kaldıraç`], correctIndex: 0 },
        { question: `Basit makinelerde işten kazanç olmaması neyle ilgilidir?`, options: [`Enerjinin korunumu`, `Yer çekimi`, `Sürtünme`, `Hız`], correctIndex: 0 },
        { question: `Basit makine kullanırken kuvvetten kazanç olduğunda yol nasıl olur?`, options: [`Artar (yoldan kayıp)`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Basit makineler ne kadar verimliyse o kadar az hangi kuvvete maruz kalır?`, options: [`Sürtünme`, `Yer çekimi`, `Rüzgâr`, `Bağlantı kuvvetleri`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi makara çeşididir?`, options: [`Sabit ve hareketli makara`, `Sıvı ve katı makara`, `Sıcak ve soğuk makara`, `Açık ve kapalı makara`], correctIndex: 0 },
        { question: `Eğer hareketli makara ile sabit makara birlikte kullanılıyorsa avantajı nedir?`, options: [`Hem yön değişir hem kuvvetten kazanç olur`, `Sadece kuvvetten kazanç`, `Sadece yön değişir`, `Hiçbir avantaj yoktur`], correctIndex: 0 },
        { question: `Eğik düzlemde uygulanan kuvvetin minimum olması için eğim ne olmalı?`, options: [`Mümkün olduğunca küçük olmalı (yol uzun)`, `Mümkün olduğunca büyük olmalı`, `Eğim önemli değil`, `Eğim 90° olmalı`], correctIndex: 0 },
        { question: `Bir 1. tür kaldıraçta destek tam ortadaysa, eşit yükle denge için kuvvet ne olmalıdır?`, options: [`Yük kadar`, `Yükün yarısı`, `Yükün iki katı`, `Sıfır`], correctIndex: 0 },
        { question: `Çekiçle çivi çakarken kullanılan çekiç başı + tutamağı hangi basit makineye benzer?`, options: [`Kaldıraç`, `Eğik düzlem`, `Makara`, `Vida`], correctIndex: 0 },
        { question: `Düz yola dik vurulmuş bir çivinin çıkarılmasında en uygun basit makine hangisidir?`, options: [`Kaldıraç (kerpeten, çekiç tırnağı)`, `Eğik düzlem`, `Makara`, `Vida`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi 3. tür kaldıraca örnektir?`, options: [`Olta, balık tutma kolu, süpürge`, `Tahterevalli`, `El arabası`, `Limonata sıkacağı`], correctIndex: 0 },
        { question: `Fındık kıracağı hangi tür kaldıraçtır?`, options: [`2. tür (yük ortada)`, `1. tür`, `3. tür`, `Kaldıraç değil`], correctIndex: 0 },
        { question: `Limonata sıkacağı hangi tür kaldıraçtır?`, options: [`2. tür (yük ortada)`, `1. tür`, `3. tür`, `Kaldıraç değil`], correctIndex: 0 },
        { question: `Bir eğik düzlemin yüksekliği h, uzunluğu L ise, F·L = W·h ifadesi neyi gösterir?`, options: [`İş eşitliği (enerjinin korunumu)`, `Yer değişimi`, `Hız eşitliği`, `Sürtünme eşitliği`], correctIndex: 0 },
        { question: `Bisikletin viteslerinde dişli oranı ne işe yarar?`, options: [`Pedal kuvvetiyle yol arasında dengeyi ayarlar`, `Hızı sıfırlar`, `Sürtünmeyi artırır`, `Yer çekimini değiştirir`], correctIndex: 0 },
        { question: `Bayrak direğinde sabit makara kullanılır. Bunun faydası nedir?`, options: [`Bayrağı yukarı çekmek için aşağı doğru kuvvet uygulanır (yön değişir)`, `Kuvvetten kazanç sağlar`, `Yoldan kazanç sağlar`, `Hiç faydası yoktur`], correctIndex: 0 },
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
              { kind: "ornek", content: "Kara zinciri: çimen → çekirge → kurbağa → yılan → atmaca. Su zinciri: fitoplankton → küçük balık → büyük balık → fok → kutup ayısı." },
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
      quickQuestions: [
        { question: `Enerji nedir?`, options: [`İş yapabilme yeteneği`, `Kuvvetin uygulanma noktası`, `Bir maddenin kütlesi`, `Bir maddenin yoğunluğu`], correctIndex: 0 },
        { question: `Hareket eden bir cismin sahip olduğu enerji türü nedir?`, options: [`Kinetik enerji`, `Potansiyel enerji`, `Isı enerjisi`, `Ses enerjisi`], correctIndex: 0 },
        { question: `Yerden belirli bir yükseklikte bulunan cismin enerjisi nedir?`, options: [`Çekim potansiyel enerjisi`, `Kinetik enerji`, `Esneklik potansiyel enerjisi`, `Isı enerjisi`], correctIndex: 0 },
        { question: `Yay veya esnek bir cisimde depolanan enerji nedir?`, options: [`Esneklik potansiyel enerjisi`, `Çekim potansiyel enerjisi`, `Kinetik enerji`, `Isı enerjisi`], correctIndex: 0 },
        { question: `Mekanik enerji neyin toplamıdır?`, options: [`Kinetik + Potansiyel enerji`, `Sadece kinetik`, `Sadece potansiyel`, `Isı + Ses`], correctIndex: 0 },
        { question: `Kinetik enerji hangilerine bağlıdır?`, options: [`Kütle (m) ve hız (v)`, `Sadece kütleye`, `Sadece hıza`, `Yüksekliğe`], correctIndex: 0 },
        { question: `Çekim potansiyel enerjisi hangilerine bağlıdır?`, options: [`Kütle, yer çekimi, yükseklik`, `Sadece kütleye`, `Sadece yüksekliğe`, `Sadece hıza`], correctIndex: 0 },
        { question: `Enerji yoktan var edilemez, vardan yok edilemez. Bu hangi yasadır?`, options: [`Enerjinin korunumu yasası`, `Newton'un 1. yasası`, `Pascal yasası`, `Arşimet yasası`], correctIndex: 0 },
        { question: `Bir cismin yüksekten serbest bırakıldığında potansiyel enerjisi nereye dönüşür?`, options: [`Kinetik enerjiye`, `Isı enerjisine sadece`, `Elektrik enerjisine`, `Kimyasal enerjiye`], correctIndex: 0 },
        { question: `Hidroelektrik santralde su düşerken hangi enerji dönüşümü olur?`, options: [`Potansiyel → Kinetik → Elektrik`, `Elektrik → Kinetik`, `Isı → Elektrik`, `Ses → Elektrik`], correctIndex: 0 },
        { question: `Pillerde hangi enerji türü depolanır?`, options: [`Kimyasal enerji`, `Mekanik enerji`, `Nükleer enerji`, `Ses enerjisi`], correctIndex: 0 },
        { question: `Güneş panellerinde hangi dönüşüm gerçekleşir?`, options: [`Güneş (ışık) → Elektrik`, `Elektrik → Işık`, `Kinetik → Elektrik`, `Isı → Elektrik`], correctIndex: 0 },
        { question: `Rüzgâr türbinlerinde hangi dönüşüm gerçekleşir?`, options: [`Kinetik (rüzgâr) → Elektrik`, `Elektrik → Kinetik`, `Isı → Elektrik`, `Kimyasal → Elektrik`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi yenilenebilir enerji kaynağıdır?`, options: [`Güneş enerjisi`, `Kömür`, `Doğal gaz`, `Petrol`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi yenilenemez enerji kaynağıdır?`, options: [`Petrol`, `Güneş`, `Rüzgâr`, `Su`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi temiz (çevre dostu) bir enerji kaynağıdır?`, options: [`Rüzgâr`, `Kömür`, `Doğal gaz`, `Petrol`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi sera gazı etkisi yapar?`, options: [`Karbondioksit (CO₂)`, `Oksijen`, `Hidrojen`, `Azot`], correctIndex: 0 },
        { question: `Sera etkisinin sonucu nedir?`, options: [`Küresel ısınma`, `Buz çağı`, `Sıvı kayıplar`, `Toprak erozyonu`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi küresel ısınmayı azaltmak için yapılabilir?`, options: [`Toplu taşıma ve bisiklet kullanmak`, `Daha çok fosil yakıt kullanmak`, `Ormanları yok etmek`, `Israflı tüketim`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi karbon ayak izini büyüten bir davranıştır?`, options: [`Sürekli kişisel araç kullanma`, `Geri dönüşüm`, `Su tasarrufu`, `Toplu taşıma kullanma`], correctIndex: 0 },
        { question: `Küresel ısınmanın etkilerinden biri nedir?`, options: [`Buzulların erimesi`, `Su buharlaşmaması`, `Atmosferin yok olması`, `Gravitasyonun değişmesi`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi hava kirliliğine neden olur?`, options: [`Fosil yakıt yanması`, `Fotosentez`, `Yağmur`, `Rüzgâr`], correctIndex: 0 },
        { question: `Asit yağmurlarının nedeni hangisidir?`, options: [`SO₂ ve NOx gazlarının havayla tepkimesi`, `Su buharı`, `Helyum gazı`, `Karbon`], correctIndex: 0 },
        { question: `Çevre dostu olmak için en uygun davranış hangisidir?`, options: [`Geri dönüşüm yapmak`, `Pet şişeleri atmak`, `Aşırı tüketim`, `Su israfı`], correctIndex: 0 },
        { question: `Enerji tasarrufu için aşağıdakilerden hangisi yapılmalıdır?`, options: [`Tasarruflu (LED) ampul kullanmak`, `Tüm ışıkları sürekli açık tutmak`, `Aşırı klima kullanmak`, `Sürekli ütü kullanmak`], correctIndex: 0 },
        { question: `Aşağıdaki canlılardan hangisi ekosistemde üretici (otrotrof) sayılır?`, options: [`Yeşil bitkiler`, `Aslan`, `Kartal`, `İnsan`], correctIndex: 0 },
        { question: `Ekosistemdeki tüketicilerin enerji kaynağı nedir?`, options: [`Bitkiler ya da diğer hayvanlar`, `Toprak`, `Su`, `Güneş ışığı doğrudan`], correctIndex: 0 },
        { question: `Ölü canlıları ve atıkları parçalayan canlılara ne denir?`, options: [`Ayrıştırıcılar`, `Üreticiler`, `Tüketiciler`, `Otçullar`], correctIndex: 0 },
        { question: `Bir besin zincirinin ilk halkası daima nedir?`, options: [`Üretici (bitki)`, `Otçul`, `Etçil`, `Ayrıştırıcı`], correctIndex: 0 },
        { question: `Besin zincirinde üst basamaklara çıkıldıkça enerji nasıl değişir?`, options: [`Azalır`, `Artar`, `Değişmez`, `Önce artar sonra azalır`], correctIndex: 0 },
        { question: `Fotosentezde hangi gaz alınır?`, options: [`Karbondioksit (CO₂)`, `Oksijen`, `Azot`, `Hidrojen`], correctIndex: 0 },
        { question: `Fotosentezde hangi gaz salınır?`, options: [`Oksijen (O₂)`, `Karbondioksit`, `Azot`, `Hidrojen`], correctIndex: 0 },
        { question: `Fotosentez için neye ihtiyaç vardır?`, options: [`Güneş ışığı, su, CO₂ ve klorofil`, `Sadece su`, `Sadece güneş`, `Sadece CO₂`], correctIndex: 0 },
        { question: `Bitkilerde fotosentez nerede yapılır?`, options: [`Kloroplastlarda`, `Mitokondride`, `Çekirdekte`, `Ribozomda`], correctIndex: 0 },
        { question: `Su döngüsünde su buharlaşır, bulut oluşturur, yağış olur. Bu döngüye ne denir?`, options: [`Su döngüsü`, `Karbon döngüsü`, `Azot döngüsü`, `Oksijen döngüsü`], correctIndex: 0 },
        { question: `Karbon döngüsünde fotosentez ve solunum hangi gazları yer değiştirir?`, options: [`CO₂ ve O₂`, `H₂ ve O₂`, `N₂ ve O₂`, `CO ve O₂`], correctIndex: 0 },
        { question: `Solunum sırasında hangi gaz dışarı verilir?`, options: [`Karbondioksit`, `Oksijen`, `Azot`, `Hidrojen`], correctIndex: 0 },
        { question: `Aşağıdaki enerji türlerinden hangisi yenilenebilir DEĞİLDİR?`, options: [`Doğal gaz`, `Güneş`, `Rüzgâr`, `Jeotermal`], correctIndex: 0 },
        { question: `Yer altındaki sıcak sudan elde edilen enerji türü hangisidir?`, options: [`Jeotermal`, `Hidroelektrik`, `Rüzgâr`, `Güneş`], correctIndex: 0 },
        { question: `Biyokütle enerjisi nasıl elde edilir?`, options: [`Bitki ve hayvansal atıklardan`, `Petrolden`, `Kömürden`, `Uranyumdan`], correctIndex: 0 },
        { question: `Çevre kirliliğini azaltmak için en etkili davranış nedir?`, options: [`Bireysel ve toplu sorumluluk almak (3R: Azalt, Tekrar kullan, Geri dönüştür)`, `Daha çok atık üretmek`, `Sadece konuşmak`, `Hiçbir şey yapmamak`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi sera gazı değildir?`, options: [`Oksijen`, `Karbondioksit`, `Metan`, `Su buharı`], correctIndex: 0 },
        { question: `Termik santral hangi yakıttan elektrik üretir?`, options: [`Fosil yakıt (kömür, doğal gaz, petrol)`, `Rüzgâr`, `Güneş`, `Su`], correctIndex: 0 },
        { question: `Nükleer santralde hangi enerji türünden elektrik üretilir?`, options: [`Nükleer enerji`, `Güneş enerjisi`, `Rüzgâr enerjisi`, `Hidroelektrik`], correctIndex: 0 },
        { question: `Yüksekten serbest bırakılan bir cisim yere düşerken hangi enerji artar?`, options: [`Kinetik enerji`, `Potansiyel enerji`, `Isı enerjisi`, `Esneklik enerjisi`], correctIndex: 0 },
        { question: `Bir top yere çarptığında bir kısım enerji ne olur?`, options: [`Isı, ses ve şekil değişikliğine dönüşür`, `Tamamen kaybolur`, `Sıfır olur`, `Doğrudan elektrik enerjisi olur`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi enerji dönüşümüne örnektir?`, options: [`Pil → Ampul (kimyasal → ışık ve ısı)`, `Sadece pil`, `Sadece ampul`, `Sadece bağlantı`], correctIndex: 0 },
        { question: `Bir bitki güneş ışığıyla fotosentez yapar; bu hangi enerji dönüşümüdür?`, options: [`Işık → Kimyasal enerji`, `Kimyasal → Işık`, `Isı → Kimyasal`, `Mekanik → Isı`], correctIndex: 0 },
        { question: `Çevre sorunlarının önüne geçmek için hangisi etkili değildir?`, options: [`Sürekli araba kullanmak`, `Bisiklet ve toplu taşıma kullanmak`, `Geri dönüştürmek`, `Enerji tasarrufu yapmak`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi enerji tasarrufuna katkı sağlar?`, options: [`Cihazları fişten çekmek`, `Sürekli açık bırakmak`, `Eski cihaz kullanmak`, `Sürekli ısıtmak`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Maddenin elektrik yükü nedir?`, options: [`Atomdaki proton-elektron sayısının dengesinin bozulması durumu`, `Maddenin ağırlığı`, `Maddenin hacmi`, `Maddenin yoğunluğu`], correctIndex: 0 },
        { question: `Elektronun yükü nasıldır?`, options: [`Negatif (-)`, `Pozitif (+)`, `Nötr (0)`, `Değişken`], correctIndex: 0 },
        { question: `Protonun yükü nasıldır?`, options: [`Pozitif (+)`, `Negatif (-)`, `Nötr (0)`, `Değişken`], correctIndex: 0 },
        { question: `Nötronun yükü nasıldır?`, options: [`Yüksüz (nötr)`, `Pozitif`, `Negatif`, `Değişken`], correctIndex: 0 },
        { question: `Aynı yüke sahip cisimler arasında nasıl bir kuvvet oluşur?`, options: [`İtici`, `Çekici`, `Yok`, `Değişken`], correctIndex: 0 },
        { question: `Farklı yüke sahip cisimler arasında nasıl bir kuvvet oluşur?`, options: [`Çekici`, `İtici`, `Yok`, `Değişken`], correctIndex: 0 },
        { question: `Elektriklenme nedir?`, options: [`Cisimlerin elektron alıp vermesiyle yüklenmesi`, `Cisimlerin ısınması`, `Cisimlerin renk değiştirmesi`, `Cisimlerin manyetik olması`], correctIndex: 0 },
        { question: `Sürtünmeyle elektriklenmede iki cisim arasında ne aktarılır?`, options: [`Elektron`, `Proton`, `Nötron`, `Atom`], correctIndex: 0 },
        { question: `Sürtünmeyle elektriklenmede elektron alan cisim nasıl yüklenir?`, options: [`Negatif (-)`, `Pozitif (+)`, `Nötr`, `Değişken`], correctIndex: 0 },
        { question: `Sürtünmeyle elektriklenmede elektron veren cisim nasıl yüklenir?`, options: [`Pozitif (+)`, `Negatif (-)`, `Nötr`, `Değişken`], correctIndex: 0 },
        { question: `Yüklü cismin yüksüz cisme dokunmasıyla yüklenmeye ne denir?`, options: [`Dokunmayla elektriklenme`, `Sürtünmeyle elektriklenme`, `Etkiyle elektriklenme`, `Topraklama`], correctIndex: 0 },
        { question: `Yüklü bir cismin yaklaştırılmasıyla yüksüz cismin yüklenmesine ne denir?`, options: [`Etkiyle (indüksiyonla) elektriklenme`, `Sürtünmeyle`, `Dokunmayla`, `Topraklama`], correctIndex: 0 },
        { question: `Yüklü cisimleri tespit etmede kullanılan alet hangisidir?`, options: [`Elektroskop`, `Termometre`, `Barometre`, `Manometre`], correctIndex: 0 },
        { question: `Elektroskobun yaprakları açıldıysa cisim nasıldır?`, options: [`Yüklüdür`, `Yüksüzdür`, `Soğuktur`, `Sıvıdır`], correctIndex: 0 },
        { question: `Topraklama nedir?`, options: [`Yüklü cismin yükünün toprağa aktarılarak nötrlenmesi`, `Cismin ısınması`, `Cismin soğuması`, `Cismin manyetik olması`], correctIndex: 0 },
        { question: `Yıldırım hangi olayın sonucudur?`, options: [`Bulutlardaki elektrik yüklerinin boşalımı`, `Yer çekimi`, `Sürtünme yok`, `Mıknatıs`], correctIndex: 0 },
        { question: `Paratoner ne işe yarar?`, options: [`Yıldırımı yüksek noktadan toprağa güvenli iletir`, `Yağmuru engeller`, `Rüzgâr azaltır`, `Gök gürültüsü engeller`], correctIndex: 0 },
        { question: `Elektrik akımı nedir?`, options: [`Yüklü parçacıkların düzenli hareketi`, `Hava akımı`, `Su akımı`, `Isı akımı`], correctIndex: 0 },
        { question: `Elektrik akımının birimi nedir?`, options: [`Amper (A)`, `Volt (V)`, `Ohm (Ω)`, `Watt (W)`], correctIndex: 0 },
        { question: `Akım şiddetini ölçen alet hangisidir?`, options: [`Ampermetre`, `Voltmetre`, `Ohmmetre`, `Termometre`], correctIndex: 0 },
        { question: `Gerilim (potansiyel fark) birimi nedir?`, options: [`Volt (V)`, `Amper (A)`, `Ohm (Ω)`, `Watt (W)`], correctIndex: 0 },
        { question: `Gerilimi ölçen alet hangisidir?`, options: [`Voltmetre`, `Ampermetre`, `Ohmmetre`, `Termometre`], correctIndex: 0 },
        { question: `Direnç birimi nedir?`, options: [`Ohm (Ω)`, `Volt (V)`, `Amper (A)`, `Watt (W)`], correctIndex: 0 },
        { question: `Direnci ölçen alet hangisidir?`, options: [`Ohmmetre`, `Voltmetre`, `Ampermetre`, `Termometre`], correctIndex: 0 },
        { question: `Bir devrede akım, gerilim ve direnç arasındaki ilişki nasıldır?`, options: [`Gerilim artarsa akım artar; direnç artarsa akım azalır`, `Hepsi birbirinden bağımsızdır`, `Gerilim arttıkça akım azalır`, `Direnç arttıkça akım artar`], correctIndex: 0 },
        { question: `Bir devrede gerilim sabit tutulup direnç artırılırsa akım nasıl değişir?`, options: [`Azalır`, `Artar`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Bir devrede direnç sabit tutulup gerilim artırılırsa akım nasıl değişir?`, options: [`Artar`, `Azalır`, `Değişmez`, `Sıfır olur`], correctIndex: 0 },
        { question: `Bir devrede direnç artırılırsa akım için ne söylenebilir?`, options: [`Akım azalır`, `Akım artar`, `Akım değişmez`, `Akım sonsuza gider`], correctIndex: 0 },
        { question: `İki ampul seri bağlandığında devreden geçen akım nasıldır?`, options: [`Her ampulden eşit akım geçer`, `Akım farklıdır`, `Akım yoktur`, `Bilinmez`], correctIndex: 0 },
        { question: `Seri bağlı ampullerin birinin teli koparsa ne olur?`, options: [`Tüm devre çalışmaz, ışıklar söner`, `Diğerleri yanar`, `Bir tane yanmaya devam eder`, `Hiçbir şey olmaz`], correctIndex: 0 },
        { question: `Paralel bağlı ampullerin birinin teli koparsa ne olur?`, options: [`Diğerleri yanmaya devam eder`, `Hepsi söner`, `Hiçbiri yanmaz`, `Sadece bir tane söner ve diğerleri parlar`], correctIndex: 0 },
        { question: `Evlerimizdeki ampuller nasıl bağlanır?`, options: [`Paralel`, `Seri`, `Karışık`, `Yıldız`], correctIndex: 0 },
        { question: `Aşağıdaki maddelerden hangisi elektriği iletir?`, options: [`Bakır`, `Cam`, `Plastik`, `Lastik`], correctIndex: 0 },
        { question: `Aşağıdaki maddelerden hangisi elektriği iletmez (yalıtkan)?`, options: [`Plastik`, `Bakır`, `Demir`, `Altın`], correctIndex: 0 },
        { question: `Üreteçler (piller, aküler) hangi enerji dönüşümünü gerçekleştirir?`, options: [`Kimyasal → Elektrik`, `Elektrik → Kimyasal`, `Mekanik → Elektrik`, `Isı → Elektrik`], correctIndex: 0 },
        { question: `Pilleri seri bağladığımızda toplam gerilim nasıl olur?`, options: [`Pil gerilimlerinin toplamı`, `Pil gerilimlerinin çarpımı`, `Bir pilin gerilimi`, `Sıfır`], correctIndex: 0 },
        { question: `Pilleri paralel bağladığımızda toplam gerilim nasıl olur?`, options: [`Bir pilin gerilimi kadar`, `Pillerin toplamı`, `Sıfır`, `İki katı`], correctIndex: 0 },
        { question: `Akım birimi Amper kimin adından gelir?`, options: [`André-Marie Ampère`, `Thomas Edison`, `Nikola Tesla`, `Alessandro Volta`], correctIndex: 0 },
        { question: `Gerilim birimi Volt kimin adından gelir?`, options: [`Alessandro Volta`, `Thomas Edison`, `Nikola Tesla`, `André-Marie Ampère`], correctIndex: 0 },
        { question: `Ütüde elektrik enerjisi hangi enerjiye dönüşür?`, options: [`Isı enerjisine`, `Ses enerjisine`, `Mekanik enerjiye`, `Işık enerjisine`], correctIndex: 0 },
        { question: `Ampulde elektrik enerjisi hangi enerjilere dönüşür?`, options: [`Işık ve ısı enerjisine`, `Sadece ışık`, `Sadece ısı`, `Mekanik enerji`], correctIndex: 0 },
        { question: `Vantilatörde elektrik enerjisi hangi enerjiye dönüşür?`, options: [`Mekanik (hareket) enerjisine`, `Isı`, `Işık`, `Kimyasal`], correctIndex: 0 },
        { question: `Hoparlörde elektrik enerjisi hangi enerjiye dönüşür?`, options: [`Ses enerjisine`, `Işık`, `Isı`, `Mekanik (sadece)`], correctIndex: 0 },
        { question: `Sigorta ne işe yarar?`, options: [`Aşırı akımda devreyi açar, yangını önler`, `Akım artırır`, `Gerilim artırır`, `Direnç ekler`], correctIndex: 0 },
        { question: `Elektrik tehlikelerinden korunmak için aşağıdakilerden hangisi yapılmamalıdır?`, options: [`Islak elle prize dokunmak`, `Sigorta kullanmak`, `Yalıtkan eldiven giymek`, `Kabloları kontrol etmek`], correctIndex: 0 },
        { question: `Bir devrede elektronlar hangi yönde hareket eder?`, options: [`Negatif (-)'ten pozitife (+)'ya`, `Pozitiften negatife`, `Hep sağa`, `Hep sola`], correctIndex: 0 },
        { question: `Devrede akım yönü hangi yönde kabul edilir?`, options: [`Pozitiften negatife (geleneksel)`, `Negatiften pozitife`, `Aşağı`, `Yukarı`], correctIndex: 0 },
        { question: `Elektrik akımı çok yüksek olursa hangi tehlike doğar?`, options: [`Yangın`, `Soğuma`, `Manyetik alan yok olur`, `Hiçbir tehlike yok`], correctIndex: 0 },
        { question: `Bir devrenin direnci sıfır olursa ne olur?`, options: [`Kısa devre olur`, `Akım sıfır olur`, `Gerilim sıfır olur`, `Ampul yanar`], correctIndex: 0 },
        { question: `Elektrikli aletlerde enerji tasarrufu için ne yapılır?`, options: [`Tasarruflu (LED) ampul ve A++ aletler kullanılır`, `Sürekli açık tutulur`, `Eski ampuller kullanılır`, `Sürekli ütü yapılır`], correctIndex: 0 },
      ],
    },
  ],
};
