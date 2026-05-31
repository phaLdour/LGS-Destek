/**
 * LGS düzeyi Türkçe sözlük: çok anlamlı kelimeler, gerçek/mecaz ayrımı ve
 * her anlam için örnek cümle. Alfabetik sıralı; sayfa başına 10 kelime.
 *
 * Kaynak: TDK Güncel Türkçe Sözlük tabanlı; tanımlar ve örnekler LGS
 * seviyesine sadeleştirildi. Yeni kelimeler buraya alfabetik sırada eklenir.
 *
 * Anlam türü:
 *  - "gerçek": kelimenin temel/asıl anlamı
 *  - "mecaz": gerçek anlamından ödünç alınmış, benzetme yoluyla oluşmuş anlam
 *  - "terim":  belirli bir alanın özel anlamı (matematik, tıp, dil bilgisi vb.)
 */

export type AnlamTuru = "gerçek" | "mecaz" | "terim";

export type Anlam = {
  tur: AnlamTuru;
  tanim: string;
  ornek: string;
};

export type Kelime = {
  kelime: string;
  tur?: string; // isim, sıfat, fiil, zarf vb.
  anlamlar: Anlam[];
};

export const SOZLUK: Kelime[] = [
  {
    kelime: "acı",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bazı maddelerin dilde bıraktığı yakıcı duyu; tatlı karşıtı.",
        ornek: "Çocuk acı biberi ısırınca ağlamaya başladı.",
      },
      {
        tur: "mecaz",
        tanim: "Tasa, üzüntü, dert.",
        ornek: "Babasının ölümünün acısını uzun süre unutamadı.",
      },
      {
        tur: "mecaz",
        tanim: "Keskin ve rahatsız edici (ses, soğuk).",
        ornek: "Sokakta acı bir fren sesi duyuldu.",
      },
    ],
  },
  {
    kelime: "açık",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Kapalı olmayan, görünür durumda olan.",
        ornek: "Kapı açık kalmış, içeriye soğuk giriyor.",
      },
      {
        tur: "gerçek",
        tanim: "Engelsiz, serbest (yol, alan).",
        ornek: "Tüneldeki bakım bitti, yol açıldı.",
      },
      {
        tur: "mecaz",
        tanim: "Anlaşılır, kolay kavranır.",
        ornek: "Öğretmenin açıklamaları açık ve anlaşılırdı.",
      },
      {
        tur: "mecaz",
        tanim: "Gizli olmayan, dürüst.",
        ornek: "Bana her şeyi açık açık söyleyebilirsin.",
      },
    ],
  },
  {
    kelime: "ağır",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Tartıda çok kütle çeken, hafif olmayan.",
        ornek: "Bavul o kadar ağırdı ki tek başıma kaldıramadım.",
      },
      {
        tur: "mecaz",
        tanim: "Önemi, sorumluluğu büyük olan.",
        ornek: "Bu kararın altına imza atmak ağır bir sorumluluktur.",
      },
      {
        tur: "mecaz",
        tanim: "Sindirimi güç (yemek).",
        ornek: "Akşam yediğim yağlı yemek midemi ağırlaştırdı.",
      },
      {
        tur: "mecaz",
        tanim: "Yavaş, telaşsız.",
        ornek: "Trafikte arabalar ağır ağır ilerliyordu.",
      },
    ],
  },
  {
    kelime: "almak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyi eline geçirmek, tutmak.",
        ornek: "Masadan kitabı alıp çantasına koydu.",
      },
      {
        tur: "gerçek",
        tanim: "Satın almak.",
        ornek: "Bakkaldan ekmek aldı.",
      },
      {
        tur: "mecaz",
        tanim: "Bir duyguyu hissetmek, kavramak.",
        ornek: "Söylediklerinden kötü bir koku aldım.",
      },
      {
        tur: "mecaz",
        tanim: "İçine çekmek (nefes, hava).",
        ornek: "Derin bir nefes alıp dışarı verdi.",
      },
    ],
  },
  {
    kelime: "aydın",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Işıklı, parlak, aydınlatılmış.",
        ornek: "Aydın bir odada ders çalışmak gözleri yormaz.",
      },
      {
        tur: "mecaz",
        tanim: "Bilgili, okumuş, kültürlü kişi.",
        ornek: "Bir toplumun gelişmesinde aydınların rolü büyüktür.",
      },
      {
        tur: "mecaz",
        tanim: "Açık, anlaşılır.",
        ornek: "Olay henüz aydınlığa kavuşmadı.",
      },
    ],
  },
  {
    kelime: "baş",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "İnsan ve hayvanlarda gövdenin üst bölümü.",
        ornek: "Çocuk başını yastığa koyup uyudu.",
      },
      {
        tur: "mecaz",
        tanim: "Bir topluluğu yöneten kişi.",
        ornek: "Köyün başı, herkesi meydanda topladı.",
      },
      {
        tur: "mecaz",
        tanim: "Bir şeyin başlangıç bölümü.",
        ornek: "Cümlenin başına büyük harf yazılır.",
      },
      {
        tur: "mecaz",
        tanim: "Sayma birimi (hayvanlarda).",
        ornek: "Çiftlikte yirmi baş büyükbaş hayvan vardı.",
      },
    ],
  },
  {
    kelime: "bağ",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyi tutturmaya yarayan ip, kuşak, halka.",
        ornek: "Ayakkabısının bağı çözülmüştü.",
      },
      {
        tur: "gerçek",
        tanim: "Üzüm yetiştirilen tarla.",
        ornek: "Dedem köydeki bağdan üzüm topladı.",
      },
      {
        tur: "mecaz",
        tanim: "İnsanlar veya olaylar arasındaki ilişki.",
        ornek: "İki arkadaş arasında güçlü bir bağ vardı.",
      },
    ],
  },
  {
    kelime: "burun",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Yüzte solunum ve koklamaya yarayan organ.",
        ornek: "Soğuk havada burnumun ucu kızardı.",
      },
      {
        tur: "gerçek",
        tanim: "Bir cismin ileri doğru çıkıntılı ucu.",
        ornek: "Geminin burnu kayalara çarptı.",
      },
      {
        tur: "terim",
        tanim: "Coğrafyada denize doğru uzanan kara parçası.",
        ornek: "Türkiye'nin en kuzey noktası İnceburun'dur.",
      },
      {
        tur: "mecaz",
        tanim: "Kibirli olmak, kibirlilik (deyimlerde).",
        ornek: "Para kazandıktan sonra burnu havalarda dolaşıyor.",
      },
    ],
  },
  {
    kelime: "büyük",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Boyutları, hacmi sıradan olandan fazla olan.",
        ornek: "Büyük bir kavun aldık, hepimize yetti.",
      },
      {
        tur: "mecaz",
        tanim: "Önemli, değerli.",
        ornek: "Atatürk, Türk milleti için büyük bir liderdir.",
      },
      {
        tur: "mecaz",
        tanim: "Yaşça ileri olan.",
        ornek: "Büyüklerinin sözünü dinleyen çocuk pişman olmaz.",
      },
    ],
  },
  {
    kelime: "cam",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Saydam, kırılgan, sertleşmiş bir madde.",
        ornek: "Bardak yere düşünce cam paramparça oldu.",
      },
      {
        tur: "gerçek",
        tanim: "Pencere camı.",
        ornek: "Yağmur damlaları camlara vuruyordu.",
      },
      {
        tur: "mecaz",
        tanim: "Çok kırılgan, hassas (insan veya kalp için).",
        ornek: "Onun kalbi cam gibidir, dikkat etmek gerekir.",
      },
    ],
  },

  {
    kelime: "çekmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyi kendine doğru hareket ettirmek.",
        ornek: "Halatı bütün gücüyle kendine doğru çekti.",
      },
      {
        tur: "mecaz",
        tanim: "İlgi uyandırmak, kendine yöneltmek.",
        ornek: "Vitrindeki kırmızı elbise herkesin dikkatini çekti.",
      },
      {
        tur: "mecaz",
        tanim: "Bir sıkıntı veya acıya katlanmak.",
        ornek: "Bu yaşına kadar çok çile çekti.",
      },
      {
        tur: "gerçek",
        tanim: "Fotoğrafını veya filmini almak.",
        ornek: "Manzaranın fotoğrafını çekmek istiyordu.",
      },
    ],
  },
  {
    kelime: "ders",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Okulda belirli bir konunun öğretildiği zaman dilimi.",
        ornek: "Bugün ilk ders matematikti.",
      },
      {
        tur: "mecaz",
        tanim: "Olaylardan çıkarılan öğüt, alınması gereken pay.",
        ornek: "Yaşananlardan herkes kendine bir ders çıkarmalı.",
      },
      {
        tur: "mecaz",
        tanim: "Birinin hatalı davranışına karşı verilen sert tepki.",
        ornek: "Bu hata ona iyi bir ders olacak.",
      },
    ],
  },
  {
    kelime: "dil",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Ağız boşluğundaki tat alma ve konuşma organı.",
        ornek: "Sıcak çorbayı içerken dilim yandı.",
      },
      {
        tur: "gerçek",
        tanim: "Bir milletin konuştuğu söz sistemi.",
        ornek: "Türkçe, dünyada konuşulan zengin dillerden biridir.",
      },
      {
        tur: "mecaz",
        tanim: "Konuşma biçimi, üslup.",
        ornek: "Yazarın dili çok akıcı ve etkileyiciydi.",
      },
      {
        tur: "terim",
        tanim: "Coğrafyada denize doğru uzanmış ince kara parçası.",
        ornek: "Karaburun gibi uzun bir dil deniz içine sokulur.",
      },
    ],
  },
  {
    kelime: "doğru",
    tur: "sıfat / zarf",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir yöne, sağa veya sola sapmadan giden.",
        ornek: "Tabelayı görmek için doğru yürümeye devam et.",
      },
      {
        tur: "mecaz",
        tanim: "Gerçeğe ve kurala uygun olan.",
        ornek: "Sınavda en az 30 doğru yapmaya çalıştı.",
      },
      {
        tur: "mecaz",
        tanim: "Yalan söylemeyen, dürüst (kişi).",
        ornek: "Doğru sözlü insanlara herkes güven duyar.",
      },
    ],
  },
  {
    kelime: "dolu",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Boş olmayan, içi kaplı olan.",
        ornek: "Bardak su ile ağzına kadar doluydu.",
      },
      {
        tur: "gerçek",
        tanim: "Bulutlardan düşen donmuş yağmur taneleri.",
        ornek: "Şiddetli dolu yağışı sebzelere zarar verdi.",
      },
      {
        tur: "mecaz",
        tanim: "Çok hareketli veya yoğun (gün, program).",
        ornek: "Bugünüm çok dolu, görüşemeyiz.",
      },
    ],
  },

  {
    kelime: "düşmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir yerden aşağıya yönelmek, yere inmek.",
        ornek: "Elindeki tabak yere düşüp kırıldı.",
      },
      {
        tur: "mecaz",
        tanim: "Değer veya konumca aşağı inmek.",
        ornek: "Şirketin hisseleri haftada %5 düştü.",
      },
      {
        tur: "mecaz",
        tanim: "Bir duruma uğramak (akla düşmek, gözden düşmek).",
        ornek: "Aklıma ablamı aramak düştü.",
      },
    ],
  },
  {
    kelime: "düz",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Engebesiz, eğri olmayan, pürüzsüz.",
        ornek: "Düz bir yolda yürümek dağ yolundan kolaydır.",
      },
      {
        tur: "mecaz",
        tanim: "Süslü olmayan, sade.",
        ornek: "Düğüne düz bir elbiseyle gitti.",
      },
      {
        tur: "mecaz",
        tanim: "Karmaşık olmayan, açık (anlam, ifade).",
        ornek: "Yazısı çok düz ve anlaşılırdı.",
      },
    ],
  },
  {
    kelime: "eğri",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Doğru olmayan, yana yatık.",
        ornek: "Tablo duvarda eğri asılı duruyordu.",
      },
      {
        tur: "mecaz",
        tanim: "Yanlış, kurallara uymayan.",
        ornek: "Eğri işlere bulaşma, sonu kötü olur.",
      },
    ],
  },
  {
    kelime: "el",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Kolun bilekten parmak uçlarına kadar olan bölümü.",
        ornek: "Yıkadıktan sonra ellerini havluyla kuruladı.",
      },
      {
        tur: "mecaz",
        tanim: "Yabancı, kişi (deyimlerde 'eller ne der').",
        ornek: "Eller ne der diye düşünmekten vazgeç.",
      },
      {
        tur: "mecaz",
        tanim: "Sahip olma, kontrol etme.",
        ornek: "İşin sonu artık bizim elimizde.",
      },
      {
        tur: "gerçek",
        tanim: "Sıra, kez (kâğıt oyunlarında).",
        ornek: "Birinci eli biz aldık.",
      },
    ],
  },
  {
    kelime: "eski",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Üzerinden uzun zaman geçmiş, yenilenmemiş.",
        ornek: "Eski bir ayakkabıyı atmak istemiyordu.",
      },
      {
        tur: "mecaz",
        tanim: "Önceki, daha önce var olan.",
        ornek: "Eski sınıf öğretmeniyle yolda karşılaştı.",
      },
      {
        tur: "mecaz",
        tanim: "Deneyimli, kıdemli.",
        ornek: "Bu işin eski kurtlarındandır.",
      },
    ],
  },

  {
    kelime: "fırlamak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Hızla bir yere doğru atılmak veya uçmak.",
        ornek: "Top duvara çarptı ve yukarıya fırladı.",
      },
      {
        tur: "mecaz",
        tanim: "Ani biçimde çok artmak (fiyat, ısı).",
        ornek: "Son haftada akaryakıt fiyatları fırladı.",
      },
    ],
  },
  {
    kelime: "geçmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir yerden başka yere gitmek.",
        ornek: "Karşı kaldırıma dikkatlice geçti.",
      },
      {
        tur: "mecaz",
        tanim: "Zaman aşmak, akıp gitmek.",
        ornek: "Geçen yıl çok hızlı geçti.",
      },
      {
        tur: "mecaz",
        tanim: "Daha üstün olmak, aşmak.",
        ornek: "Onun başarısı herkesinkini geçti.",
      },
      {
        tur: "mecaz",
        tanim: "Sınavı, kursu başarmak.",
        ornek: "Matematik dersinden geçer not aldı.",
      },
    ],
  },
  {
    kelime: "göl",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Çevresi karayla kaplı, durgun su birikintisi.",
        ornek: "Van Gölü, Türkiye'nin en büyük gölüdür.",
      },
      {
        tur: "mecaz",
        tanim: "Geniş bir su veya sıvı birikintisi.",
        ornek: "Şiddetli yağmurdan sonra cadde göle döndü.",
      },
    ],
  },
  {
    kelime: "görmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Göz aracılığıyla algılamak.",
        ornek: "Uzaktan gemiyi denizde gördü.",
      },
      {
        tur: "mecaz",
        tanim: "Anlamak, kavramak.",
        ornek: "Davranışından ne demek istediğini gördüm.",
      },
      {
        tur: "mecaz",
        tanim: "Yaşamak, deneyimlemek.",
        ornek: "Bu yaşına kadar çok zorluk gördü.",
      },
      {
        tur: "mecaz",
        tanim: "Bir hizmeti almak veya yapmak.",
        ornek: "Tedavisini İstanbul'da gördü.",
      },
    ],
  },
  {
    kelime: "güçlü",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Kuvveti yüksek olan.",
        ornek: "Güçlü bir vuruşla topu kaleye gönderdi.",
      },
      {
        tur: "mecaz",
        tanim: "Etkili, sağlam (inanç, kanıt).",
        ornek: "İddialarını güçlü kanıtlarla destekledi.",
      },
      {
        tur: "mecaz",
        tanim: "Kapsamlı, ileri (ekonomi, ordu).",
        ornek: "Türkiye, bölgede güçlü bir konumdadır.",
      },
    ],
  },
  {
    kelime: "hafif",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Tartıda az kütle çeken; ağır olmayan.",
        ornek: "Bu çanta hafif olduğu için sırtımda hissetmiyorum.",
      },
      {
        tur: "mecaz",
        tanim: "Önemsiz, küçük (yara, hata).",
        ornek: "Kaza sonucu hafif bir sıyrıkla kurtuldu.",
      },
      {
        tur: "mecaz",
        tanim: "Sindirimi kolay.",
        ornek: "Akşamları daha hafif yemek yiyorum.",
      },
    ],
  },
  {
    kelime: "iç",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyin yüzeyinin altı, ortası.",
        ornek: "Cevizin içi çok lezzetliydi.",
      },
      {
        tur: "mecaz",
        tanim: "Yürek, gönül; insanın duygu dünyası.",
        ornek: "İçim sıkıldı, dışarı çıkmak istiyorum.",
      },
      {
        tur: "gerçek",
        tanim: "Bir mekanın kapalı bölümü.",
        ornek: "Yağmur başlayınca evin içine geçtik.",
      },
    ],
  },
  {
    kelime: "ince",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Eni az olan, kalın karşıtı.",
        ornek: "Bu ip çok ince, kopabilir.",
      },
      {
        tur: "mecaz",
        tanim: "Nazik, kibar (kişi, davranış).",
        ornek: "Çok ince bir insandır, kimseyi kırmaz.",
      },
      {
        tur: "mecaz",
        tanim: "Ayrıntılı, dikkat isteyen.",
        ornek: "Bu iş, ince bir hesap gerektirir.",
      },
    ],
  },
  {
    kelime: "ışık",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Cisimleri görmemizi sağlayan yayılım.",
        ornek: "Güneş ışığı odayı aydınlattı.",
      },
      {
        tur: "mecaz",
        tanim: "Umut, yol gösterici (gelecek için).",
        ornek: "Eğitim, geleceğin ışığıdır.",
      },
      {
        tur: "gerçek",
        tanim: "Lamba, yapay aydınlatma.",
        ornek: "Odaya gelince ışığı yaktı.",
      },
    ],
  },
  {
    kelime: "izlemek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bakarak takip etmek (film, maç).",
        ornek: "Akşam tüm aile birlikte filmi izledi.",
      },
      {
        tur: "gerçek",
        tanim: "Bir iz veya yol takip etmek.",
        ornek: "Avcı, ayı izini kar üzerinde izledi.",
      },
      {
        tur: "mecaz",
        tanim: "Belirli bir yol veya yöntem benimsemek.",
        ornek: "Hükümet, ekonomide yeni bir politika izliyor.",
      },
    ],
  },

  {
    kelime: "kalın",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Eni veya çapı fazla olan; ince karşıtı.",
        ornek: "Kalın bir mantoyla sokağa çıktı.",
      },
      {
        tur: "mecaz",
        tanim: "Yoğun, koyu (kafa, kabuk).",
        ornek: "Kafası kalın çocuk, kuralı bir türlü kavrayamadı.",
      },
      {
        tur: "mecaz",
        tanim: "Pes, tok (ses).",
        ornek: "Babasının kalın bir sesi vardı.",
      },
    ],
  },
  {
    kelime: "kara",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Siyah renk, en koyu renk.",
        ornek: "Kara bulutlar gökyüzünü kapladı.",
      },
      {
        tur: "gerçek",
        tanim: "Toprak parçası, deniz karşıtı.",
        ornek: "Vapur kıyıya yaklaşıp karaya çıktı.",
      },
      {
        tur: "mecaz",
        tanim: "Uğursuz, kötü, üzücü.",
        ornek: "O kara gün hâlâ unutulmadı.",
      },
    ],
  },
  {
    kelime: "kesmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Keskin bir araçla parçalara ayırmak.",
        ornek: "Ekmeği bıçakla dilim dilim kesti.",
      },
      {
        tur: "mecaz",
        tanim: "Bir sürekliliği sona erdirmek (yardımı, ilişkiyi).",
        ornek: "İki aile arasındaki bağı kestiler.",
      },
      {
        tur: "mecaz",
        tanim: "Aniden durdurmak (sesi, konuşmayı).",
        ornek: "Yan odadan gelen müziğin sesini kesti.",
      },
    ],
  },
  {
    kelime: "kırmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir nesneyi parçalara ayırmak, bütünlüğünü bozmak.",
        ornek: "Top vurunca pencereyi kırdı.",
      },
      {
        tur: "mecaz",
        tanim: "Bir kişiyi üzmek, gücendirmek.",
        ornek: "Sert sözlerinle onu çok kırdın.",
      },
      {
        tur: "mecaz",
        tanim: "Bir engeli aşmak (rekor, korku).",
        ornek: "Yüzücü, dünya rekorunu kırdı.",
      },
    ],
  },
  {
    kelime: "kuyu",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Su, petrol vb. çıkarmak için kazılan derin çukur.",
        ornek: "Köyde su almak için derin bir kuyu kazıldı.",
      },
      {
        tur: "mecaz",
        tanim: "Çıkışı zor durum (deyim: kuyuya düşmek).",
        ornek: "Bu işe girince kuyuya düştüğünü anladı.",
      },
    ],
  },
  {
    kelime: "küçük",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Boyutları büyüğüne göre az olan.",
        ornek: "Bahçedeki küçük köpek herkesi sevindirdi.",
      },
      {
        tur: "mecaz",
        tanim: "Önemsiz, basit.",
        ornek: "Bu, üzerinde durulacak küçük bir mesele.",
      },
      {
        tur: "mecaz",
        tanim: "Yaşça genç olan.",
        ornek: "Küçük kardeşi henüz dört yaşında.",
      },
    ],
  },
  {
    kelime: "oda",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Evin veya yapının bir bölümü.",
        ornek: "Çalışma odası kitaplarla doluydu.",
      },
      {
        tur: "terim",
        tanim: "Belirli meslek mensuplarının bağlı olduğu kurum.",
        ornek: "Babam Mühendisler Odası'na kayıtlıdır.",
      },
    ],
  },
  {
    kelime: "okumak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Yazılı bir şeyi gözden geçirip anlamak.",
        ornek: "Her gün en az bir saat kitap okur.",
      },
      {
        tur: "gerçek",
        tanim: "Bir okula devam etmek, öğrenim görmek.",
        ornek: "Ablam üniversitede tıp okuyor.",
      },
      {
        tur: "mecaz",
        tanim: "Anlamak, kavramak (yüzünden okumak).",
        ornek: "Yüzünden mutlu olduğunu kolayca okuyabilirdiniz.",
      },
    ],
  },
  {
    kelime: "olmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Var olmak, gerçekleşmek.",
        ornek: "Toplantı saat 14:00'te olacak.",
      },
      {
        tur: "gerçek",
        tanim: "Bir nitelik kazanmak.",
        ornek: "Hava karanlık olunca eve döndük.",
      },
      {
        tur: "mecaz",
        tanim: "Olgunlaşmak, yetişmek (meyve).",
        ornek: "Bahçedeki kayısılar oldu, toplayabiliriz.",
      },
    ],
  },
  {
    kelime: "oyun",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Eğlenmek amacıyla yapılan etkinlik.",
        ornek: "Çocuklar parkta oyun oynuyor.",
      },
      {
        tur: "gerçek",
        tanim: "Tiyatro eseri.",
        ornek: "Akşam beş perdelik bir oyuna gittik.",
      },
      {
        tur: "mecaz",
        tanim: "Hile, dolap.",
        ornek: "Bu işte bir oyun olduğunu hissediyorum.",
      },
    ],
  },

  {
    kelime: "sağ",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Vücudun kalp tarafının karşıt yönü.",
        ornek: "Sağ elimle yazıyorum.",
      },
      {
        tur: "mecaz",
        tanim: "Hayatta olan, ölmemiş.",
        ornek: "Deprem sonrasında sağ kurtulanlar hastaneye götürüldü.",
      },
      {
        tur: "mecaz",
        tanim: "Sağlıklı, bütün.",
        ornek: "Çok şükür hâlâ sağ ve sağlıklıyım.",
      },
    ],
  },
  {
    kelime: "sıcak",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Sıcaklığı yüksek olan; soğuk karşıtı.",
        ornek: "Yaz günleri çok sıcak geçiyor.",
      },
      {
        tur: "mecaz",
        tanim: "Samimi, içten (insan, ortam).",
        ornek: "Bizi çok sıcak karşıladılar.",
      },
      {
        tur: "mecaz",
        tanim: "Taze, yeni (haber).",
        ornek: "Sıcak haberler için ekranı takip edin.",
      },
    ],
  },
  {
    kelime: "su",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Renksiz, kokusuz, içilen sıvı (H₂O).",
        ornek: "Bir bardak su isteyebilir miyim?",
      },
      {
        tur: "mecaz",
        tanim: "Gözyaşı veya ter (deyimlerde 'gözleri su dolmak').",
        ornek: "Mutluluktan gözleri suyla doldu.",
      },
      {
        tur: "mecaz",
        tanim: "Akıcılık, akış (yazı, konuşma için).",
        ornek: "Yazılarının suyu çok güzel.",
      },
    ],
  },
  {
    kelime: "sürmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Yumuşak bir maddeyi yayarak uygulamak.",
        ornek: "Ekmeğe tereyağı sürdü.",
      },
      {
        tur: "gerçek",
        tanim: "Bir aracı kullanarak yürütmek.",
        ornek: "Babam arabasını dikkatle sürüyor.",
      },
      {
        tur: "mecaz",
        tanim: "Devam etmek (zaman, durum).",
        ornek: "Konferans iki saat sürdü.",
      },
    ],
  },
  {
    kelime: "şişmek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Hacmi büyümek, kabarık duruma gelmek.",
        ornek: "Hamur mayalandıkça şişti.",
      },
      {
        tur: "mecaz",
        tanim: "Çok yemekten dolayı rahatsız olmak.",
        ornek: "Akşam yemekten sonra midem şişti.",
      },
      {
        tur: "mecaz",
        tanim: "Övünmek, böbürlenmek.",
        ornek: "Birinciliği duyunca şişti.",
      },
    ],
  },
  {
    kelime: "taş",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Kaya parçası, sert mineral kütle.",
        ornek: "Dereden topladıkları taşları oyun için kullandılar.",
      },
      {
        tur: "mecaz",
        tanim: "Çok sert, duygusuz (kalp).",
        ornek: "Kalbi taş gibiydi, kimseye acımıyordu.",
      },
      {
        tur: "terim",
        tanim: "Satranç, dama gibi oyunlarda figür.",
        ornek: "Satrançta atımı yanlış yere oynayıp taşımı kaptırdım.",
      },
      {
        tur: "mecaz",
        tanim: "Bir kişiye dolaylı söz, sataşma.",
        ornek: "Söylediği o sözlerle bana taş atıyordu.",
      },
    ],
  },
  {
    kelime: "ters",
    tur: "sıfat / isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Yön olarak karşıt, zıt.",
        ornek: "Çorabını ters giymiş, dikiş yeri dışarıda.",
      },
      {
        tur: "mecaz",
        tanim: "Aksilik, beklenmedik kötü durum.",
        ornek: "Bugün her şey ters gidiyor.",
      },
      {
        tur: "mecaz",
        tanim: "Soğuk, sert (insan davranışı).",
        ornek: "Onunla ne kadar ters konuştun!",
      },
    ],
  },
  {
    kelime: "tutmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Elle kavramak, bırakmamak.",
        ornek: "Bardağı sıkıca tut, düşmesin.",
      },
      {
        tur: "mecaz",
        tanim: "Beğenilmek, ilgi görmek.",
        ornek: "Yeni şarkısı bir hafta içinde tuttu.",
      },
      {
        tur: "mecaz",
        tanim: "Bir görevi üstlenmek.",
        ornek: "Bu sene sınıf başkanlığını tutmaya karar verdi.",
      },
      {
        tur: "mecaz",
        tanim: "Olabilmek, gerçekleşmek (tahmin tutmak).",
        ornek: "Hava tahmini bu sefer de tutmadı.",
      },
    ],
  },
  {
    kelime: "uçmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Havada kanat veya araçla hareket etmek.",
        ornek: "Kuşlar göç için güneye uçtu.",
      },
      {
        tur: "mecaz",
        tanim: "Çok sevinmek, mutlu olmak.",
        ornek: "Sınavı kazanınca sevinçten uçtu.",
      },
      {
        tur: "mecaz",
        tanim: "Çok çabuk tükenmek (para, zaman).",
        ornek: "Maaşının yarısı bir haftada uçtu.",
      },
    ],
  },
  {
    kelime: "uzun",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Boyu fazla olan; kısa karşıtı.",
        ornek: "Sınıfın en uzun öğrencisi oydu.",
      },
      {
        tur: "mecaz",
        tanim: "Süresi fazla olan (zaman, yolculuk).",
        ornek: "Çok uzun bir yolculuktan sonra eve vardık.",
      },
    ],
  },

  {
    kelime: "vermek",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyi birine ulaştırmak, sunmak.",
        ornek: "Çocuğa kalemi verdim.",
      },
      {
        tur: "mecaz",
        tanim: "Karar veya öğüt sunmak.",
        ornek: "Bu konuda bana iyi bir öğüt verdi.",
      },
      {
        tur: "mecaz",
        tanim: "Bir niteliği kazandırmak.",
        ornek: "Yağmur ovaya yeniden hayat verdi.",
      },
    ],
  },
  {
    kelime: "yağ",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bitki veya hayvanlardan elde edilen sıvı/katı madde.",
        ornek: "Salataya bir kaşık zeytinyağı koydu.",
      },
      {
        tur: "mecaz",
        tanim: "Aşırı methiye, dalkavukluk (deyim: yağ çekmek).",
        ornek: "Patrona yağ çekerek terfi aldı.",
      },
    ],
  },
  {
    kelime: "yakmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Ateşle tutuşturmak; yanmasını sağlamak.",
        ornek: "Kibritle mumu yaktı.",
      },
      {
        tur: "mecaz",
        tanim: "Birini zor durumda bırakmak.",
        ornek: "O söz beni amcamın yanında yaktı.",
      },
      {
        tur: "mecaz",
        tanim: "Çok üzmek, içine işlemek.",
        ornek: "Bu haber yüreğimi yaktı.",
      },
    ],
  },
  {
    kelime: "yan",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir şeyin sağ veya sol bölgesi.",
        ornek: "Otururken yan tarafımda boş bir koltuk vardı.",
      },
      {
        tur: "mecaz",
        tanim: "Bir konunun ek özelliği veya boyutu.",
        ornek: "Olayın bir de bizim bilmediğimiz yanı var.",
      },
      {
        tur: "mecaz",
        tanim: "Taraf, görüş.",
        ornek: "Tartışmada babamın yanında yer aldı.",
      },
    ],
  },
  {
    kelime: "yıkmak",
    tur: "fiil",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir yapıyı parçalayarak çökertmek.",
        ornek: "Eski binayı yıkıp yenisini yaptılar.",
      },
      {
        tur: "mecaz",
        tanim: "Çok üzmek, çökertmek (manen).",
        ornek: "Babasının ölümü onu yıktı.",
      },
      {
        tur: "mecaz",
        tanim: "Bir düzeni sona erdirmek.",
        ornek: "İhanetler imparatorluğu yıktı.",
      },
    ],
  },
  {
    kelime: "yol",
    tur: "isim",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Bir yerden başka yere ulaşmak için kullanılan açıklık.",
        ornek: "Köy yolu kar yüzünden kapandı.",
      },
      {
        tur: "mecaz",
        tanim: "Yöntem, çare, biçim.",
        ornek: "Bu sorunu çözmenin başka bir yolu var.",
      },
      {
        tur: "mecaz",
        tanim: "Yaşam biçimi veya inanç.",
        ornek: "Atatürk'ün yolundan gitmek hepimizin görevidir.",
      },
    ],
  },
  {
    kelime: "yüksek",
    tur: "sıfat",
    anlamlar: [
      {
        tur: "gerçek",
        tanim: "Yerden uzaklığı çok olan.",
        ornek: "Yüksek bir kulenin tepesinden şehre baktı.",
      },
      {
        tur: "mecaz",
        tanim: "Sayı veya değer olarak büyük (fiyat, sıcaklık).",
        ornek: "Bu mevsimde fiyatlar çok yüksek.",
      },
      {
        tur: "mecaz",
        tanim: "İleri düzeyde, üst seviye (eğitim).",
        ornek: "Yüksek eğitim almak için yurt dışına çıktı.",
      },
    ],
  },
];

/** Sayfa başına kelime sayısı. */
export const PAGE_SIZE = 10;

export function getTotalPages(): number {
  return Math.ceil(SOZLUK.length / PAGE_SIZE);
}

export function getPage(pageIndex: number): Kelime[] {
  // 1-indexed sayfa numarası
  const start = (pageIndex - 1) * PAGE_SIZE;
  return SOZLUK.slice(start, start + PAGE_SIZE);
}
