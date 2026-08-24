import type { QuizQuestion } from "./types";

/**
 * Zor (yeni nesil) deneme sınavı için ek soru havuzu.
 *
 * Anahtar: "{subject_slug}/{topic_id}"
 * Değer: QuizQuestion[]
 *
 * Yeni nesil → paragraf okuma, çoklu işlem, grafik/tablo yorumlama, hayatın
 * içinden senaryo. Mevcut Hızlı Sorular havuzundan farklı, daha analitik.
 *
 * Boş bırakılan konularda zor deneme, o konuya ait kolay sorulardan
 * rastgele seçer (UI'de uyarı gösterilir).
 *
 * KURAL: her zor soru tek doğru cevaplı, MEB tarzına uygun, kesinlikle
 * doğrulanmış bilgiyle yazılır.
 */
export const ADVANCED_QUESTIONS: Record<string, QuizQuestion[]> = {
  // ─── Türkçe ──────────────────────────────────────────────────────
  "turkce/paragrafta-anlam": [
    {
      question:
        "\"Modern toplumlarda zamanın hızla geçtiği hissi yaygındır. Bu durum, gerçek bir zaman kıtlığından çok, sürekli uyaran içeren dijital ortamların dikkati parçalamasından kaynaklanır. Beyin, her ekran değişiminde küçük bir karar verir; bu kararlar tek tek önemsiz görünse de biriktiğinde zihinsel yorgunluğa yol açar.\"\n\nBu paragraftan aşağıdaki yargılardan hangisine ULAŞILABİLİR?",
      options: [
        "Dijital ortamlardaki uyaranlar zihinsel yorgunluğa yol açabilir",
        "Modern toplumlarda kişilerin boş zamanı geçmişe göre azalmıştır",
        "Beyin, uyaran sayısı arttıkça karar verme hızını da artırmaktadır",
        "Dikkat dağınıklığı yalnız ekran kullanan kişilerde görülmektedir",
      ],
      correctIndex: 0,
    },
    {
      question:
        "\"Okumayı sevdirmek için çocuğun seviyesine, ilgisine ve hayal dünyasına uygun kitaplar seçmeli; ona okumayı bir görev gibi dayatmak yerine onu metnin içinde bir kahraman hâline getirmeliyiz.\"\n\nBu cümleden çıkarılabilecek YARDIMCI düşünce aşağıdakilerden hangisidir?",
      options: [
        "Çocuğa uygun kitap seçimi, okuma alışkanlığını destekler",
        "Her çocuk klasik eserleri okumak zorundadır",
        "Çocuklara okuma katı bir görev olarak verilmelidir",
        "Okuma alışkanlığı yalnız okulda kazanılır",
      ],
      correctIndex: 0,
    },
    {
      question:
        "\"(I) Sağlıklı beslenme yalnız ne yediğimizle değil, nasıl yediğimizle de ilgilidir. (II) Yemek yerken acele etmek, sindirimi olumsuz etkiler. (III) Lezzetli yemekler hazırlamak ayrı bir sanattır. (IV) Yemeği iyi çiğnemek hem doyma hissini hem de besinlerin emilimini olumlu etkiler.\"\n\nBu paragrafta numaralanmış cümlelerin hangisi anlatımın akışını bozmaktadır?",
      options: [
        "Üçüncü cümle (III)",
        "Birinci cümle (I)",
        "İkinci cümle (II)",
        "Dördüncü cümle (IV)",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Matematik ───────────────────────────────────────────────────
  "matematik/olasilik": [
    {
      question:
        "Bir torbada 4 kırmızı, 6 mavi ve 10 yeşil bilye vardır. Torbadan rastgele çekilen bir bilyenin yeşil olma olasılığı kaçtır?",
      options: ["1/2", "1/4", "2/5", "3/10"],
      correctIndex: 0,
    },
    {
      question:
        "Bir zar atıldığında üst yüzde çift sayı veya 5 gelme olasılığı kaçtır?",
      options: ["2/3", "1/2", "5/6", "1/3"],
      correctIndex: 0,
    },
    {
      question:
        "Bir çekilişte 1'den 50'ye kadar numaralı kartlardan biri seçilecek. Seçilen kartın hem 3 hem de 5'in katı olma olasılığı kaçtır?",
      options: ["3/50", "1/15", "1/10", "1/25"],
      correctIndex: 0,
    },
  ],

  "matematik/cebirsel-ifadeler": [
    {
      question:
        "(x + 3)(x − 3) ifadesi aşağıdakilerden hangisine eşittir?",
      options: ["x² − 9", "x² + 9", "x² − 6x + 9", "x² + 6x − 9"],
      correctIndex: 0,
    },
    {
      question:
        "a² + 2ab + b² = 49 ve a + b > 0 olduğuna göre, a + b kaçtır?",
      options: ["7", "5", "9", "12"],
      correctIndex: 0,
    },
    {
      question:
        "Bir dikdörtgenin uzun kenarı (x + 4) cm, kısa kenarı (x − 2) cm'dir. Dikdörtgenin alanını veren cebirsel ifade aşağıdakilerden hangisidir?",
      options: ["x² + 2x − 8", "x² − 2x + 8", "x² + 6x + 8", "x² − 8"],
      correctIndex: 0,
    },
  ],

  // ─── Fen Bilimleri ───────────────────────────────────────────────
  "fen-bilimleri/basit-makineler": [
    {
      question:
        "Bir el arabasıyla 600 N'luk kum yığını taşınmaktadır. Tekerlek ile elin tutuş noktası arasındaki uzaklık 1,5 m; tekerlek ile kumun ağırlık merkezi arasındaki uzaklık 0,5 m'dir. Buna göre el arabasının sapından uygulanması gereken en az kuvvet kaç N'dur?",
      options: ["200", "300", "400", "150"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki günlük araçların kaldıraç türleri eşleştirilmiştir. Hangi eşleşme YANLIŞTIR?",
      options: [
        "Süpürge → yük ortada",
        "Tahterevalli → destek ortada",
        "El arabası → yük ortada",
        "Cımbız → kuvvet ortada",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Bir öğrenci aynı yükü iki farklı rampadan yukarı çıkarıyor: A rampası 2 m uzunluğunda, B rampası 4 m uzunluğunda; her ikisi de aynı yüksekliğe çıkarıyor. Buna göre aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "B rampasında daha az kuvvet uygulanır, ancak yapılan iş eşittir",
        "A rampasında daha az kuvvet uygulanır, çünkü yolu daha kısadır",
        "İki rampada da eşit kuvvet uygulanır, işten kazanç sağlanmaz",
        "B rampasında hem daha az kuvvet uygulanır hem de daha az iş yapılır",
      ],
      correctIndex: 0,
    },
  ],

  "fen-bilimleri/basinc": [
    {
      question:
        "Sıvı basıncı; sıvının derinliği, yoğunluğu ve yer çekimi ivmesi ile doğru orantılıdır. Aşağıdaki durumlardan hangisi bir kabın tabanındaki sıvı basıncını ARTIRMAZ?",
      options: [
        "Kabın taban alanını büyütmek",
        "Sıvının yoğunluğunu artırmak",
        "Sıvının seviyesini yükseltmek",
        "Daha derin bir kaba aktarmak",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Bir kamyonun lastik sayısı, üzerine yüklenen ağırlıkla birlikte artırılmaktadır. Bu uygulamanın temel amacı aşağıdakilerden hangisidir?",
      options: [
        "Yere uygulanan basıncı azaltarak yolun bozulmasını engellemek",
        "Lastiklerin yere uyguladığı toplam kuvveti tümüyle yok etmek",
        "Yükün ağırlığını azaltarak araca binen kütleyi hafifletmek",
        "Temas yüzeyini küçülterek yere uygulanan basıncı artırmak",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Açık hava basıncı yüksekten alçağa inildikçe ARTAR. Bu durumla ilgili aşağıdakilerden hangisi GÖZLENİR?",
      options: [
        "Dağın zirvesinde kapanan plastik şişe deniz seviyesine getirildiğinde büzüşür",
        "Dağın zirvesinde kapanan plastik şişe deniz seviyesine getirildiğinde şişer",
        "Su, dağın zirvesinde daha yüksek sıcaklıkta kaynar",
        "Aynı miktar gaz dağda daha az hacim kaplar",
      ],
      correctIndex: 0,
    },
  ],

  // ─── T.C. İnkılap Tarihi ─────────────────────────────────────────
  "inkilap/bir-kahraman-doguyor": [
    {
      question:
        "Mustafa Kemal'in askerî eğitimi sırasında aldığı kararlı, sorgulayıcı ve milletinin geleceğini düşünen tutumu; ilerleyen yıllarda yapacaklarının temelini oluşturur. Bu bilgi aşağıdakilerden hangisini doğrudan destekler?",
      options: [
        "Liderlik özellikleri gençlik dönemindeki tutumlarla şekillenmiştir",
        "Askerî eğitim, kişinin dünya görüşünü her durumda tümüyle değiştirir",
        "Sorgulayıcı kişilikler yöneticilik görevlerinden uzak durmaktadır",
        "Karakter, yalnızca savaş meydanında kazanılan tecrübeyle oluşur",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Mustafa Kemal'in Çanakkale Cephesi'ndeki başarısı, ona neden önemli bir kahramanlık kazandırmıştır?",
      options: [
        "İtilaf Devletleri'nin İstanbul'a ulaşma planını boşa çıkarması",
        "İstanbul Hükûmeti'ne karşı ilk direniş hareketini başlatmış olması",
        "Doğu Cephesi'nde Rus ilerleyişini tek başına durdurmuş olması",
        "Savaş boyunca bütün cephelerin komutasını üstlenmiş olması",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Din Kültürü ────────────────────────────────────────────────
  "din/kader-inanci": [
    {
      question:
        "İslam inancında kader ve kaza kavramları arasındaki ilişkiyi en doğru biçimde açıklayan ifade hangisidir?",
      options: [
        "Kader Allah'ın ezelde takdir etmesi, kaza bu takdirin gerçekleşmesidir",
        "Kaza Allah'ın ezelde takdir etmesi, kader bu takdirin uygulanmasıdır",
        "Kader insanın kendi seçimi, kaza Allah'ın bu seçime izin vermesidir",
        "Kader yalnızca iyi olaylar, kaza ise yalnızca kötü olaylar için kullanılır",
      ],
      correctIndex: 0,
    },
    {
      question:
        "İnsanın irade ve sorumluluğu, kader inancıyla ilgili olarak nasıl değerlendirilir?",
      options: [
        "İnsan, verilen iradeyle seçim yapar ve yaptıklarından sorumludur",
        "İnsan iradesiyle seçim yapar, ancak yaptıklarından sorumlu tutulmaz",
        "İnsanın seçim hakkı yoktur; bütün davranışları önceden zorunludur",
        "İrade yalnız meleklere verilmiştir; insan yalnızca kaderini yaşar",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Sözcükte anlam (LGS 2024 tarzı çoklu kullanım) ──────
  "turkce/sozcukte-anlam": [
    {
      question:
        "\"Bırakmak\" sözcüğü aşağıdaki cümlelerde farklı anlamlarda kullanılmıştır:\n• Tamirci, benim arabamı tamir etmeyi bırakıp yeni gelen müşteriyle ilgilendi.\n• Evindeki tadilat bitene kadar antika eşyalarını komşusuna bıraktı.\n• Kalfasının artık işinin ehli olduğuna karar veren usta, elindeki işi ona bıraktı.\n\nBu cümlelerde \"bırakmak\" sözcüğü aşağıdaki anlamlardan hangisiyle KULLANILMAMIŞTIR?",
      options: [
        "Bir işi başka bir zamana ertelemek",
        "Bakılmak, korunmak için vermek",
        "Bir iş için birini görevlendirmek",
        "Yapmakta olduğu işi durdurup başka şeye yönelmek",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde \"ağır\" sözcüğü \"sorumluluğu büyük olan\" anlamında kullanılmıştır?",
      options: [
        "Bu görevin altından kalkmak ağır bir iştir.",
        "Bavulu ağır olduğu için iki kişi taşıdık.",
        "Yağlı yemekler insana ağır gelir.",
        "Arabalar trafikte ağır ağır ilerliyordu.",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde altı çizili sözcük mecaz anlamıyla KULLANILMAMIŞTIR?",
      options: [
        "Soğuk havada burnumun ucu kızardı.",
        "Para kazanınca burnu havalarda dolaşıyor.",
        "Sözleriyle bana sert bir taş attı.",
        "Yaşananlar yüreğimde derin yara açtı.",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Cümlede anlam (anlam ilişkileri) ────────────────────
  "turkce/cumlede-anlam": [
    {
      question:
        "\"Dersine düzenli çalışmazsa sınavda başarılı olamaz.\" cümlesinde anlam ilişkisi aşağıdakilerden hangisidir?",
      options: ["Koşul – sonuç", "Neden – sonuç", "Amaç – sonuç", "Karşılaştırma"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde \"varsayım\" anlamı vardır?",
      options: [
        "Tut ki seçimi kaybettin, sonra ne yapacaksın?",
        "Akşam eve geç gelirsen ailen merak eder.",
        "Bu sınavı kazanmak için ders çalışıyorum.",
        "Yağmur yağdığı için piknik iptal edildi.",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki numaralanmış cümleleri anlamca doğru biçimde birleştiren bağlaç hangisidir?\n\nI. Bir milletin geleceği gençlere bağlıdır.\nII. Gençlerin iyi yetiştirilmesi devletin görevidir.",
      options: ["bu yüzden", "ne var ki", "oysa", "ama"],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Fiilimsiler ─────────────────────────────────────────
  "turkce/fiilimsiler": [
    {
      question:
        "Aşağıdaki cümlelerin hangisinde sıfat-fiil (ortaç) KULLANILMIŞTIR?",
      options: [
        "Yıkanan çamaşırları balkona astım.",
        "Yağmur yağarken eve döndük.",
        "Akşam pikniğe gitmek istiyorum.",
        "Çocuk koşarak parka gitti.",
      ],
      correctIndex: 0,
    },
    {
      question:
        "\"Eve gelince yorgunluktan uyuyakaldım.\" cümlesindeki zarf-fiil eki aşağıdakilerden hangisidir?",
      options: ["-ince", "-ip", "-arak", "-madan"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Üslü ifadeler (bilimsel gösterim — LGS tarzı) ────
  "matematik/uslu-ifadeler": [
    {
      question:
        "Bir yıllık 21·10⁸ ton karbon emisyonu, 60 yıllık süreçte engelleniyor. Buna göre bir yılda engellenen miktar TON cinsinden bilimsel gösterimle hangisidir?",
      options: ["3,5·10⁷", "3,5·10¹⁰", "21·10⁷", "2,1·10¹⁰"],
      correctIndex: 0,
    },
    {
      question:
        "(2³ · 2⁵) ÷ 2⁴ işleminin sonucu kaçtır?",
      options: ["16", "8", "32", "64"],
      correctIndex: 0,
    },
    {
      question:
        "10⁻² sayısı aşağıdakilerden hangisine eşittir?",
      options: ["0,01", "0,1", "100", "-100"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Karekök ──────────────────────────────────────────
  "matematik/karekoklu-ifadeler": [
    {
      question:
        "√363 − √75 − √27 işleminin sonucu aşağıdakilerden hangisidir?",
      options: ["2√3", "3√3", "4√3", "5√3"],
      correctIndex: 0,
    },
    {
      question:
        "√50 + √32 işleminin en sade hâli aşağıdakilerden hangisidir?",
      options: ["9√2", "7√2", "11√2", "5√2 + 4√2"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Üçgenler ─────────────────────────────────────────
  "matematik/ucgenler": [
    {
      question:
        "Bir dik üçgende dik kenarlar 6 cm ve 8 cm ise hipotenüs kaç cm'dir?",
      options: ["10", "12", "14", "9"],
      correctIndex: 0,
    },
    {
      question:
        "Bir üçgenin iki iç açısı 50° ve 60° ise üçüncü iç açısı kaç derecedir?",
      options: ["70°", "60°", "80°", "90°"],
      correctIndex: 0,
    },
  ],

  // ─── Fen: DNA ve Genetik ─────────────────────────────────────────
  "fen-bilimleri/dna-ve-genetik-kod": [
    {
      question:
        "Bir DNA molekülünde adenin (A) sayısı 120 ise timin (T) sayısı kaçtır?",
      options: ["120", "60", "240", "100"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdakilerden hangisi modifikasyona (kalıtsal olmayan değişime) örnektir?",
      options: [
        "Aynı tohumdan farklı topraklarda farklı boyda bitki yetişmesi",
        "Çocuğun göz renginin anne ya da babasınınkine benzer olması",
        "Kan grubunun anne ve babadan gelen genlerle belirlenmesi",
        "Parmak izi deseninin doğuştan gelip ömür boyu değişmemesi",
      ],
      correctIndex: 0,
    },
    {
      question:
        "DNA, RNA ve protein arasındaki ilişkiyi en doğru gösteren ifade hangisidir?",
      options: [
        "DNA, RNA aracılığıyla proteinin üretilmesini yönetir",
        "RNA, DNA'yı yapar",
        "Protein, DNA'yı yapar",
        "DNA proteinleri doğrudan yapar, RNA'ya gerek yoktur",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Fen: Madde ve Endüstri ──────────────────────────────────────
  "fen-bilimleri/madde-ve-endustri": [
    {
      question:
        "Bir tepkimede mevcut tüm tepkenler kullanılarak yalnız ürün/ürünler oluşuyorsa bu tepkime aşağıdakilerden hangisidir?",
      options: [
        "Yeni özellikte maddelerin oluştuğu kimyasal değişim",
        "Maddenin yalnız dış görünümünün değiştiği fiziksel olay",
        "Tanecikler arası uzaklığın değiştiği hâl değişimi",
        "Kütle sabitken hacmin değiştiği yoğunluk değişimi",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdakilerden hangisi fiziksel değişime örnektir?",
      options: [
        "Suyun buz hâline geçmesi",
        "Demirin paslanması",
        "Odunun yanması",
        "Mumun yanarak tükenmesi",
      ],
      correctIndex: 0,
    },
  ],

  // ─── İnkılap: Milli Uyanış ────────────────────────────────────────
  "inkilap/milli-uyanis": [
    {
      question:
        "Mondros Ateşkes Anlaşması'nın 7. maddesi (\"Müttefikler, güvenliklerini tehdit edebilecek herhangi bir stratejik noktayı işgal edebilir.\") aşağıdakilerden hangisine OLANAK SAĞLAMIŞTIR?",
      options: [
        "İtilaf Devletleri'nin Anadolu'yu fiilen işgaline",
        "Osmanlı ordusunun silahlarıyla birlikte korunmasına",
        "Anadolu'da ulusal cemiyetlerin yasaklanmasına",
        "Boğazlar'ın Osmanlı yönetiminde bırakılmasına",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Erzurum Kongresi'nde alınan \"Vatan bir bütündür, parçalanamaz.\" kararı aşağıdaki ilkelerden hangisini ifade eder?",
      options: [
        "Milli birlik ve bağımsızlık ilkesi",
        "Cumhuriyet yönetiminin ilan edilmesi",
        "Saltanat makamının kaldırılması",
        "Manda ve himayenin kabul edilmesi",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Din: Zekat, Sadaka, Hac ─────────────────────────────────────
  "din/zekat-sadaka-hac": [
    {
      question:
        "Zekât ile sadaka arasındaki en temel fark nedir?",
      options: [
        "Zekât belirli şartları taşıyanlara farz, sadaka ise gönüllüdür",
        "Zekât her Müslümana farz, sadaka ise yalnızca zenginlere farzdır",
        "Zekât yalnız Ramazan ayında, sadaka ise yıl boyunca verilir",
        "Zekât gönüllü bir yardım, sadaka ise malın kırkta biridir",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Hac ibadetinin İslam toplumuna kazandırdığı en önemli özellik aşağıdakilerden hangisidir?",
      options: [
        "Farklı milletlerden Müslümanları eşit koşullarda bir araya getirmesi",
        "Yalnızca belirli bir milletin katılabildiği bir ibadet olması",
        "Zenginlerin üstünlüğünü görünür kılan bir tören niteliği taşıması",
        "Toplumdan uzaklaşarak yalnız başına yapılan bir ibadet olması",
      ],
      correctIndex: 0,
    },
  ],

  // ─── İngilizce: Teen Life ────────────────────────────────────────
  "ingilizce/teen-life": [
    {
      question:
        "Read the dialogue and choose the best response.\n— Ali: How often do you go to the cinema?\n— Mark: ___",
      options: [
        "About twice a month, usually on weekends.",
        "It takes about twenty minutes by bus.",
        "For about two hours every Sunday afternoon.",
        "I have been going there since last year.",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Choose the option that best COMPLETES the sentence:\n\"Teenagers should ___ enough sleep to stay healthy and focused at school.\"",
      options: ["get", "leave", "miss", "throw"],
      correctIndex: 0,
    },
  ],

  // ─── İngilizce ──────────────────────────────────────────────────
  "ingilizce/friendship": [
    {
      question:
        "Read the dialogue and choose the best response.\n\n— Mia: I had a bad day at school today. I lost my notebook.\n— Eric: ___",
      options: [
        "I'm sorry to hear that. Let me help you look for it.",
        "That's great news! You must be really proud of it.",
        "Never mind, you can buy a new school bag tomorrow.",
        "I'm so glad you found it. Where exactly was it hiding?",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Choose the option that best COMPLETES the sentence:\n\"A real friend is someone who ___ you in difficult times.\"",
      options: ["supports", "ignores", "leaves", "blames"],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Cümlenin ögeleri (paragraftan öge bulma) ───────────
  "turkce/cumlenin-ogeleri": [
    {
      question:
        "\"Küçük çocuk, bahçedeki yaşlı kediyi sevdi.\" cümlesinde altı çizili \"yaşlı kediyi\" ifadesi cümlenin hangi ögesidir?",
      options: ["Belirtili nesne", "Özne", "Dolaylı tümleç", "Zarf tümleci"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisi tek başına anlamlı bir öge içermez (öznesiz cümledir)?",
      options: [
        "Bahçeye girildi.",
        "Çocuk kapıyı açtı.",
        "Yağmur sabaha kadar yağdı.",
        "Annem bana bir kalem aldı.",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Doğrusal denklemler (gerçek hayat) ──────────────
  "matematik/dogrusal-denklemler": [
    {
      question:
        "Bir taksinin açılış ücreti 25 TL, kilometre başına ücreti 6 TL'dir. x kilometre yapılan bir yolculuğun toplam ücretini veren denklem aşağıdakilerden hangisidir?",
      options: ["y = 25 + 6x", "y = 6 + 25x", "y = 25 − 6x", "y = 31x"],
      correctIndex: 0,
    },
    {
      question:
        "y = 2x − 1 doğrusunun y eksenini kestiği nokta hangisidir?",
      options: ["(0, −1)", "(0, 1)", "(−1, 0)", "(1, 0)"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Dönüşüm geometrisi (yansıma/öteleme) ────────────
  "matematik/donusum-geometrisi": [
    {
      question:
        "Bir noktanın x eksenine göre simetriği alındığında, koordinatları nasıl değişir?",
      options: [
        "(x, y) → (x, −y)",
        "(x, y) → (−x, y)",
        "(x, y) → (−x, −y)",
        "(x, y) → (y, x)",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Bir cismin 3 birim sağa, 2 birim yukarı ötelenmesi sonucunda (4, 1) noktasının yeni konumu hangisi olur?",
      options: ["(7, 3)", "(1, −1)", "(3, 2)", "(4, 3)"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Veri analizi (grafik okuma) ─────────────────────
  "matematik/veri-analizi": [
    {
      question:
        "Bir sınıftaki 30 öğrencinin matematik notlarının aritmetik ortalaması 70'tir. 5 yeni öğrenci sınıfa katıldığında ortalama 72 oluyor. Yeni öğrencilerin notlarının toplamı kaçtır?",
      options: ["420", "350", "360", "400"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki sayı dizisinin medyanı kaçtır?\n\n4, 8, 6, 12, 10",
      options: ["8", "10", "6", "12"],
      correctIndex: 0,
    },
  ],

  // ─── Fen: Elektrik yükleri (devre yorumla) ──────────────────────
  "fen-bilimleri/elektrik-yukleri-ve-enerjisi": [
    {
      question:
        "İki cisim sürtüldüğünde, elektronların hareketi açısından aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "Elektron alan cisim eksi (−), kaybeden cisim artı (+) yüklenir",
        "Her iki cisim de aynı yükü kazanır",
        "Elektron alan cisim artı (+), kaybeden cisim eksi (−) yüklenir",
        "Yükler değişmez, yalnız ısı oluşur",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Bir devrede ampuller paralel bağlandığında, bir ampul söndüğünde diğerleri ne olur?",
      options: [
        "Diğer ampuller aynı parlaklıkta yanmaya devam eder",
        "Devre açık kalacağı için diğer ampuller de söner",
        "Diğer ampullerin üzerine düşen gerilim artar, parlarlar",
        "Diğer ampuller yanar ancak parlaklıkları belirgin azalır",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Fen: Enerji Dönüşümleri ve Çevre Bilimi ────────────────────
  "fen-bilimleri/enerji-donusumleri-ve-cevre": [
    {
      question:
        "Bir besin zincirinde enerji aktarımı için aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "Üreticilerden tüketicilere aktarılır, her basamakta azalır",
        "Tüketicilerden üreticilere aktarılır ve her basamakta azalır",
        "Üreticilerden tüketicilere aktarılır ve her basamakta artar",
        "Bütün basamaklarda aktarılan enerji miktarı sabit kalır",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdakilerden hangisi karbon döngüsünde solunum yoluyla atmosfere karbondioksit verir?",
      options: [
        "Bitkiler de dahil olmak üzere yaşayan bütün canlılar",
        "Yalnızca hayvanlar; bitkiler yalnız fotosentez yapar",
        "Yalnızca tüketiciler ve ayrıştırıcı canlı türleri",
        "Yalnızca gündüz saatlerinde solunum yapan bitkiler",
      ],
      correctIndex: 0,
    },
  ],

  // ─── İnkılap: Milli bir destan (kongre kararları) ──────────────
  "inkilap/milli-bir-destan": [
    {
      question:
        "Sivas Kongresi'nde alınan \"Manda ve himaye kabul edilemez.\" kararı aşağıdaki ilkelerden hangisini doğrudan ifade eder?",
      options: [
        "Tam bağımsızlık",
        "Saltanatın kaldırılması",
        "Cumhuriyetin ilanı",
        "Halifeliğin kaldırılması",
      ],
      correctIndex: 0,
    },
    {
      question:
        "TBMM'nin 23 Nisan 1920'de açılması Türk milleti için aşağıdakilerden hangisi açısından bir dönüm noktasıdır?",
      options: [
        "Milli egemenliğe dayalı yeni bir devletin temelinin atılması",
        "Saltanat makamının yetkilerinin yeniden güçlendirilmesi",
        "İtilaf Devletleri ile kalıcı bir barış antlaşması imzalanması",
        "Halifelik makamının kaldırılıp yetkilerinin devredilmesi",
      ],
      correctIndex: 0,
    },
  ],

  // ─── İnkılap: Atatürkçülük ve çağdaşlaşan Türkiye ───────────────
  "inkilap/ataturkculuk-ve-cagdaslasan-turkiye": [
    {
      question:
        "1928'de yapılan Harf İnkılabı'nın temel amacı aşağıdakilerden hangisidir?",
      options: [
        "Halkın okuma-yazma oranını artırmak ve çağdaş eğitime geçmek",
        "Yazı dilini yalnızca aydın kesimin kullanımına açık tutmak",
        "Yabancı dille eğitimi bütün okullarda zorunlu duruma getirmek",
        "Eski yazıyla basılmış eserlerin çoğaltılmasını kolaylaştırmak",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Atatürk'ün \"Hayatta en hakiki mürşit ilimdir.\" sözü hangi ilkeyi ön plana çıkarır?",
      options: [
        "Akla ve bilime dayalı bilimsellik anlayışı",
        "Milliyetçilik ve halkçılık anlayışı",
        "Gelenekçi ve değişmez kural anlayışı",
        "Devletçilik ve planlı kalkınma anlayışı",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Din: Din ve hayat ──────────────────────────────────────────
  "din/din-ve-hayat": [
    {
      question:
        "İslam dininin temel amacı aşağıdakilerden hangisidir?",
      options: [
        "İnsanın dünya ve ahiret mutluluğunu birlikte sağlamak",
        "İnsanın yalnızca ahiret hayatını kazanmasını sağlamak",
        "Toplumun yalnızca ekonomik düzenini kurallara bağlamak",
        "Bireyin yalnızca ibadet hayatını düzenli hâle getirmek",
      ],
      correctIndex: 0,
    },
    {
      question:
        "\"Komşusu açken tok yatan bizden değildir.\" hadisi İslam'da hangi değeri ön plana çıkarır?",
      options: [
        "Yardımlaşma ve toplumsal dayanışma",
        "Tutumlu olma ve israftan kaçınma",
        "Sabır gösterme ve zorluklara katlanma",
        "Adaletli davranma ve hakka saygı",
      ],
      correctIndex: 0,
    },
  ],

  // ─── İngilizce: In the kitchen ──────────────────────────────────
  "ingilizce/in-the-kitchen": [
    {
      question:
        "Choose the option that best COMPLETES the recipe instruction:\n\"First, ___ the onions into small pieces.\"",
      options: ["chop", "drink", "boil", "sleep"],
      correctIndex: 0,
    },
    {
      question:
        "Read the dialogue and choose the best response.\n— Anna: How much sugar do we need for the cake?\n— Tom: ___",
      options: [
        "Two cups, please.",
        "Yes, I love cakes.",
        "The cake is delicious.",
        "I don't have a kitchen.",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Anlatım bozuklukları (2024 LGS tarzı) ──────────────
  "turkce/anlatim-bozukluklari": [
    {
      question:
        "Aşağıdaki cümlelerin hangisinde bir anlatım bozukluğu vardır?",
      options: [
        "Eve giderken yolda hem yağmur yağıyor hem de güneş açıyordu, çok şaşırdım.",
        "Sınıfta hemen hemen yaklaşık otuz öğrenci vardı.",
        "Bu kitabı yarın size geri vereceğim.",
        "Annem akşam yemeğine misafir bekliyor.",
      ],
      correctIndex: 1,
    },
    {
      question:
        "\"Toplantıya katılan herkes tek tek görüşlerini söyledi ve aldıkları kararı oybirliğiyle onayladılar.\" cümlesindeki anlatım bozukluğunun nedeni aşağıdakilerden hangisidir?",
      options: [
        "Özne ile yüklemde tekil-çoğul uyumsuzluğu olması",
        "Anlamca çelişen sözlerin bir arada kullanılması",
        "Ortak kullanılamayan nesnenin eksik bırakılması",
        "Tamlayan eki eksikliğinden doğan tamlama yanlışı",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde \"anlam belirsizliği\" söz konusudur?",
      options: [
        "Onun annesini sokakta gördüm.",
        "Babam bize yeni bir bisiklet aldı.",
        "Bahçedeki çiçekler güzel açtı.",
        "Yarın okula erken gideceğim.",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Fiilde çatı ────────────────────────────────────────
  "turkce/fiilde-cati": [
    {
      question:
        "Aşağıdaki cümlelerin hangisinde yüklem \"edilgen çatılı\" bir fiildir?",
      options: [
        "Bahçedeki ağaçlar dün budandı.",
        "Çocuklar parkta oyun oynadı.",
        "Annem akşam yemeği hazırlıyor.",
        "Yağmur sabaha kadar yağdı.",
      ],
      correctIndex: 0,
    },
    {
      question:
        "\"Sınıf temizlendi.\" cümlesinde fiilin çatısı için aşağıdakilerden hangisi DOĞRUDUR?",
      options: [
        "Öznesine göre edilgen, nesnesine göre geçişsizdir; sözde öznesi vardır",
        "Öznesine göre etken, nesnesine göre geçişlidir; gerçek özne alır",
        "Öznesine göre dönüşlü, nesnesine göre geçişsizdir; gerçek özne alır",
        "Öznesine göre işteş, nesnesine göre geçişlidir; sözde özne alır",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Türkçe: Yazım kuralları ─────────────────────────────────────
  "turkce/yazim-kurallari": [
    {
      question:
        "Aşağıdaki cümlelerin hangisinde bir yazım yanlışı vardır?",
      options: [
        "Akşamleyin Atatürk'ün doğum gününü kutlayacağız.",
        "Bu kitabı 2025'te yayımladılar.",
        "Pazartesi günü İstanbul'a gideceğim.",
        "Türkiye'nin Doğu'sunda kar yağıyor.",
      ],
      correctIndex: 3,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde \"de/da\" bağlacının yazımı YANLIŞTIR?",
      options: [
        "Ali de gelecekmiş bu akşam.",
        "Sen de aynı şeyi düşünüyor musun?",
        "Çocuklar parkta oynuyorlar.",
        "Aslı'da yarın gelmek istiyor.",
      ],
      correctIndex: 3,
    },
    {
      question:
        "Aşağıdaki sözcüklerden hangisi büyük harfle YANLIŞ yazılmıştır?",
      options: [
        "Van Gölü çevresindeki iller",
        "Anadolu Üniversitesi öğrencisi",
        "29 Ekim Cumhuriyet Bayramı töreninde",
        "İstanbul boğazı üzerindeki yeni köprü",
      ],
      correctIndex: 3,
    },
  ],

  // ─── Türkçe: Noktalama işaretleri ────────────────────────────────
  "turkce/noktalama-isaretleri": [
    {
      question:
        "\"Yarın okula erken gel ders saat 9'da başlayacak.\" cümlesinde hangi noktalama işareti eksiktir?",
      options: ["Virgül (,)", "Noktalı virgül (;)", "İki nokta (:)", "Üç nokta (…)"],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde virgülün kullanımı YANLIŞTIR?",
      options: [
        "Bahçeden gül, lale, papatya ve menekşe topladım.",
        "Ali, yarın okula gelmeyecek.",
        "Hızlı, koşan, çocuk düştü.",
        "Bu konuyu, biraz daha açar mısın?",
      ],
      correctIndex: 2,
    },
    {
      question:
        "Aşağıdaki cümlelerin hangisinde \"iki nokta (:)\" işareti doğru kullanılmıştır?",
      options: [
        "Annem bana şunu söyledi: \\\"Akşam erken eve dön.\\\"",
        "Sınıfın en çalışkan öğrencisi: Ayşe olarak seçildi.",
        "Yarın sabah erken kalkıp: okula gitmem gerekiyor.",
        "Sepette şu meyveler vardı elma: armut ve kiraz.",
      ],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Çarpanlar ve katlar ──────────────────────────────
  "matematik/carpanlar-ve-katlar": [
    {
      question:
        "120 sayısının asal çarpanları aşağıdakilerden hangisidir?",
      options: ["2, 3, 5", "2, 5, 7", "3, 5, 7", "2, 3, 7"],
      correctIndex: 0,
    },
    {
      question:
        "İki sayının EBOB'u 12, EKOK'u 72'dir. Sayılardan biri 24 ise diğeri kaçtır?",
      options: ["36", "30", "48", "24"],
      correctIndex: 0,
    },
    {
      question:
        "Bir manav, biri 24 elma ve diğeri 36 portakal olan iki sandığı eşit sayıda meyve içeren paketlere bölmek istiyor. Hiç meyve artmayacak şekilde her pakette en çok kaç meyve olmalıdır (her pakette aynı meyveden olmalı)?",
      options: ["12", "6", "18", "24"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Eşitsizlikler ────────────────────────────────────
  "matematik/esitsizlikler": [
    {
      question:
        "2x − 3 < 7 eşitsizliğini sağlayan en büyük tam sayı x değeri kaçtır?",
      options: ["4", "5", "3", "6"],
      correctIndex: 0,
    },
    {
      question:
        "Bir öğrenci, 100 TL ile defter ve kalem almak istiyor. Bir defter 15 TL, bir kalem 5 TL. 4 defter aldığına göre en fazla kaç kalem alabilir?",
      options: ["8", "7", "9", "10"],
      correctIndex: 0,
    },
    {
      question:
        "−4 < 2x − 6 ≤ 8 eşitsizliğini sağlayan x tam sayıları kaç tanedir?",
      options: ["6", "5", "7", "4"],
      correctIndex: 0,
    },
  ],

  // ─── Matematik: Geometrik cisimler ──────────────────────────────
  "matematik/geometrik-cisimler": [
    {
      question:
        "Taban yarıçapı 3 cm, yüksekliği 10 cm olan bir dik silindirin hacmi kaç π cm³'tür?",
      options: ["90π", "60π", "30π", "100π"],
      correctIndex: 0,
    },
    {
      question:
        "Bir dik prizmanın taban alanı 24 cm², yüksekliği 8 cm olduğuna göre hacmi kaç cm³'tür?",
      options: [
        "192 cm³",
        "4608 cm³",
        "96 cm³",
        "64 cm³",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Bir küpün hacmi 64 cm³ ise yüzey alanı kaç cm²'dir?",
      options: ["96", "64", "48", "128"],
      correctIndex: 0,
    },
  ],

  // ─── Fen Bilimleri: Mevsimler ve iklim ───────────────────────────
  "fen-bilimleri/mevsimler-ve-iklim": [
    {
      question:
        "Aşağıdakilerden hangisi Dünya'nın eksen eğikliğinin SONUCUDUR?",
      options: [
        "Mevsimlerin oluşması",
        "Gece ve gündüzün oluşması",
        "Ay'ın evrelerinin oluşması",
        "Gelgit olayının oluşması",
      ],
      correctIndex: 0,
    },
    {
      question:
        "21 Aralık tarihinde Kuzey Yarım Küre'de yaşanan durum aşağıdakilerden hangisidir?",
      options: [
        "Kış mevsimi başlar, en uzun gece yaşanır",
        "Yaz mevsimi başlar, en uzun gündüz yaşanır",
        "Gece ve gündüz eşittir",
        "İlkbahar mevsimi başlar",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Aşağıdakilerden hangisi \"iklim\" ile \"hava durumu\" arasındaki temel farkı en doğru ifade eder?",
      options: [
        "İklim uzun yıllar ortalamasını, hava durumu anlık durumu verir",
        "İklim anlık atmosfer olaylarını, hava durumu ortalamayı anlatır",
        "İklim yalnız sıcaklığı, hava durumu yalnız yağışı değerlendirir",
        "İklim yalnız kıyıları, hava durumu yalnız iç kesimleri anlatır",
      ],
      correctIndex: 0,
    },
  ],

  // ─── T.C. İnkılap Tarihi ───────────────────────────────────
  "inkilap/demokratiklesme-cabalari": [
    {
      question:
        "13 Şubat 1925'te başlayan Şeyh Sait İsyanı'nın ardından hükümet olağanüstü yetkiler kullanmış, kısa süre sonra dönemin muhalefet partisi Terakkiperver Cumhuriyet Fırkası kapatılmıştır.\n\nBu bilgilerden hareketle aşağıdaki yargılardan hangisine ulaşılabilir?",
      options: [
        "Ülkedeki bütün siyasi partiler aynı yıl tek bir çatı altında birleştirilmiştir.",
        "Muhalefet partisinin kurucuları kendi kararlarıyla siyasetten çekilmeyi seçmiştir.",
        "Çok partili hayata geçiş denemesi iç güvenlik gerekçesiyle kesintiye uğramıştır.",
        "Siyasi partilerin kapatılmasında ekonomik gerekçelerin belirleyici olduğu görülmüştür.",
      ],
      correctIndex: 2,
      explanation:
        "İsyanın ardından çıkarılan Takrir-i Sükûn Kanunu ile muhalefet partisinin kapatılması, çok partili hayat denemesinin iç güvenlik sorunları yüzünden ertelendiğini gösterir.",
    },
    {
      question:
        "Bir öğrenci, Terakkiperver Cumhuriyet Fırkası ile Serbest Cumhuriyet Fırkası'nı karşılaştıran bir çalışma hazırlamıştır.\n\nBu çalışmada yer alan aşağıdaki bilgilerden hangisi doğrudur?",
      options: [
        "İlk kurulan muhalefet partisi Terakkiperver Cumhuriyet Fırkası'dır.",
        "Her iki parti de kurucuları tarafından kendi istekleriyle feshedilmiştir.",
        "Serbest Cumhuriyet Fırkası, Şeyh Sait İsyanı'nın ardından kapatılmıştır.",
        "Her iki parti de Menemen Olayı'nın ardından siyasi hayattan çekilmiştir.",
      ],
      correctIndex: 0,
      explanation:
        "İlk muhalefet partisi 1924'te kurulan Terakkiperver Cumhuriyet Fırkası'dır; Serbest Cumhuriyet Fırkası ise 1930'da kurulmuştur.",
    },
    {
      question:
        "\"Türk kadını siyasal haklarını bir defada değil, aşamalı olarak elde etmiş; en son ülke yönetiminde ulusal düzeyde temsil edilme imkânına kavuşmuştur.\"\n\nBu yargıyı doğrudan destekleyen gelişme aşağıdakilerden hangisidir?",
      options: [
        "1926'da Medeni Kanun'un kabul edilmesi",
        "1930'da belediye seçimlerine katılma hakkının tanınması",
        "1933'te muhtarlık seçimlerinde hak tanınması",
        "1934'te milletvekili seçme ve seçilme hakkının tanınması",
      ],
      correctIndex: 3,
      explanation:
        "Belediye ve muhtarlık haklarından sonra 1934'te tanınan milletvekili seçme-seçilme hakkı, kadınların ulusal düzeyde temsilini sağlayan son aşamadır.",
    },
  ],
  "inkilap/ataturk-donemi-dis-politika": [
    {
      question:
        "Lozan Antlaşması'yla Boğazlar, başkanı Türk olan uluslararası bir komisyonun denetimine bırakılmış ve Boğazların iki yakası askerden arındırılmıştı. 1936 Montrö Boğazlar Sözleşmesi ile komisyon kaldırılmış, Türkiye Boğazlarda asker bulundurma hakkını yeniden kazanmıştır.\n\nBu değişim aşağıdakilerden hangisinin göstergesidir?",
      options: [
        "Boğazlardan geçişin tamamen serbest bırakıldığının",
        "Boğazlar üzerindeki Türk egemenliğinin tam hâle geldiğinin",
        "Boğazlar sorununun Lozan'da kesin biçimde çözülmüş olduğunun",
        "Türkiye'nin bölgesel güvenlik anlaşmalarından uzaklaştığının",
      ],
      correctIndex: 1,
      explanation:
        "Komisyonun kaldırılıp Boğazların Türk komutasına girmesi, Lozan'da eksik kalan egemenliğin Montrö ile tamamlandığını gösterir.",
    },
    {
      question:
        "Türkiye 1934'te Yunanistan, Yugoslavya ve Romanya ile Balkan Antantı'nı; 1937'de İran, Irak ve Afganistan ile Sadabat Paktı'nı imzalamıştır.\n\nBu iki gelişmenin ortak amacı aşağıdakilerden hangisidir?",
      options: [
        "Sınırların güvenliğini bölgesel iş birlikleriyle sağlamak",
        "Lozan'dan kalan dış borç sorununu çözüme kavuşturmak",
        "Boğazlar için yeni bir uluslararası komisyon kurmak",
        "Musul üzerindeki anlaşmazlığı sona erdirmek",
      ],
      correctIndex: 0,
      explanation:
        "Balkan Antantı batı, Sadabat Paktı ise doğu sınırının güvenliğini hedefleyen bölgesel iş birliği anlaşmalarıdır.",
    },
    {
      question:
        "Lozan'dan kalan Musul sorunu 1926 Ankara Antlaşması ile İngiltere lehine sonuçlanmış; Hatay meselesi ise 1936'da başlayan görüşmelerin ardından aşamalı bir süreç sonunda 1939'da Hatay'ın Türkiye'ye katılmasıyla çözülmüştür.\n\nBu iki durumun karşılaştırılmasından aşağıdakilerden hangisi çıkarılabilir?",
      options: [
        "Her iki sorun da aynı antlaşma ile çözüme kavuşturulmuştur.",
        "Türkiye, sınır sorunlarının tamamını kendi lehine sonuçlandırmıştır.",
        "Sorunların çözümünde askerî yöntemler belirleyici olmuştur.",
        "Dış politikadaki girişimler her sorunda aynı sonucu vermemiştir.",
      ],
      correctIndex: 3,
      explanation:
        "Musul İngiltere lehine sonuçlanırken Hatay Türkiye lehine çözülmüştür; bu da diplomatik girişimlerin sonuçlarının her zaman aynı olmadığını gösterir.",
    },
  ],
  "inkilap/ataturkun-olumu-ve-sonrasi": [
    {
      question:
        "Atatürk 10 Kasım 1938'de Dolmabahçe Sarayı'nda vefat etmiş, kısa süre içinde TBMM toplanarak İsmet İnönü'yü cumhurbaşkanı seçmiş ve devlet yönetiminde bir boşluk oluşmamıştır.\n\nBu durum aşağıdakilerden hangisinin göstergesidir?",
      options: [
        "Cumhuriyet rejiminin kurumsallaşmış bir yapıya kavuştuğunun",
        "Cumhurbaşkanlığı yetkilerinin Başbakanlığa devredildiğinin",
        "Cumhurbaşkanının doğrudan halk tarafından seçildiğinin",
        "Yeni cumhurbaşkanının belirlenmesi için erken seçime gidildiğinin",
      ],
      correctIndex: 0,
      explanation:
        "Devlet başkanının vefatı sonrasında yönetimin meclis eliyle kesintisiz sürmesi, cumhuriyet kurumlarının yerleşmiş olduğunu gösterir.",
    },
    {
      question:
        "II. Dünya Savaşı yıllarında Türkiye, 1939'da İngiltere ve Fransa ile ittifak antlaşması imzalamış; 1941'de ise Almanya ile saldırmazlık paktı yapmıştır.\n\nBu iki gelişme birlikte değerlendirildiğinde Türkiye'nin izlediği politika için aşağıdakilerden hangisi söylenebilir?",
      options: [
        "Savaşa bir an önce girmek için müttefiklerden destek arandığı",
        "Almanya'nın yanında savaşa katılmanın hedeflendiği",
        "Savaşın dışında kalmak için dengeli bir tutum izlendiği",
        "Bölgesel güvenlik anlaşmalarından tümüyle vazgeçildiği",
      ],
      correctIndex: 2,
      explanation:
        "Karşıt bloklarla aynı anda anlaşma yapılması, Türkiye'nin savaş dışında kalmayı amaçlayan dengeli bir diplomasi izlediğini gösterir.",
    },
    {
      question:
        "Türkiye, savaşın sonuna yaklaşıldığı 23 Şubat 1945'te Almanya ve Japonya'ya savaş ilan etmiş; ancak cephede fiilen çarpışmamıştır.\n\nBu kararın temel amacı aşağıdakilerden hangisidir?",
      options: [
        "Savaşta kaybedilen toprakları askerî yolla geri almak",
        "Birleşmiş Milletler'e kurucu üye sıfatıyla katılabilmek",
        "Montrö ile kazanılan Boğazlar denetimini genişletmek",
        "Hatay'ın anavatana katılmasını güvence altına almak",
      ],
      correctIndex: 1,
      explanation:
        "Türkiye fiilen savaşmadan yapılan bu savaş ilanıyla Birleşmiş Milletler'e kurucu üye olarak katılma şartını yerine getirmiştir.",
    },
  ],

  // ─── Din Kültürü ───────────────────────────────────────────
  "din/hz-muhammedin-ornekligi": [
    {
      question:
        "Hz. Muhammed (s.a.v.) bir hadisinde, kendilerinden önceki toplumların, içlerinden itibarlı biri suç işlediğinde onu serbest bıraktıklarını, güçsüz biri aynı suçu işlediğinde ise cezalandırdıklarını ve bu yüzden helak olduklarını bildirmiştir. Bir okulda da nöbetçi öğretmen, aynı kuralı çiğneyen iki öğrenciden yakından tanıdığı olanı uyarmakla yetinip diğerine ceza yazmıştır.\n\nBu davranış, hadisin vurguladığı hangi ilkeye aykırıdır?",
      options: [
        "İstişare",
        "Sabır",
        "Adalet",
        "Hoşgörü",
      ],
      correctIndex: 2,
      explanation:
        "Hadis, kişilerin konumuna göre farklı ölçü kullanmayı eleştirerek herkese eşit davranmayı, yani adaleti emreder. Öğretmenin tanıdığını kayırması bu ilkeyi zedeler.",
    },
    {
      question:
        "Bir öğrenci sunumunda şu üç olayı arka arkaya anlatır: Bedir Savaşı'nda ordunun konuşlanacağı yer için Hubâb b. Münzir'in önerisi kabul edilmiş, Uhud öncesinde savunma biçimi sahabelerle konuşularak kararlaştırılmış, Hendek Savaşı'nda ise Selman-ı Farisi'nin hendek kazma fikri benimsenmiştir.\n\nBu üç örneğin ortak olarak öne çıkardığı davranış aşağıdakilerden hangisidir?",
      options: [
        "Karar verirken çevresindekilere danışmak ve görüşlerine değer vermek",
        "Askerî konularda yalnızca tecrübeli komutanların söz sahibi olması",
        "Zor günlerde şikâyet etmeden sabretmenin gerekli olması",
        "Verilen sözü her durumda eksiksiz yerine getirmek",
      ],
      correctIndex: 0,
      explanation:
        "Üç olayda da Peygamberimiz karar verirken çevresindekilere danışmış ve uygun bulduğu önerileri -kendi görüşünden farklı olsa bile- benimsemiştir. Bu tutum istişarenin (danışmanın) örneğidir.",
    },
    {
      question:
        "Peygamberimizin, susamış bir köpeğe su veren kişinin bu davranışı sebebiyle bağışlandığını bildirmesi ve aç bırakıldığı hâlde çalıştırılan bir deveyi gördüğünde sahibini uyarması aktarılır.\n\nBuna göre, apartmanının bahçesine sokak hayvanları için su kabı koyan ve arkadaşları 'boşuna uğraşıyorsun' dediğinde bundan vazgeçmeyen bir öğrencinin tutumu, Peygamberimizin örnekliğinin hangi yönüyle bağdaşır?",
      options: [
        "Zorluklar karşısında sabretmesi",
        "Kendisine bırakılan emanetleri koruması",
        "Önemli kararlarda çevresine danışması",
        "Bütün canlılara merhametle davranması",
      ],
      correctIndex: 3,
      explanation:
        "Her iki rivayet de merhametin insanlarla sınırlı olmadığını, hayvanları da kapsadığını gösterir. Öğrencinin davranışı bu merhamet anlayışının günlük hayattaki karşılığıdır.",
    },
  ],
  "din/kuran-i-kerim-ve-ozellikleri": [
    {
      question:
        "Kur'an-ı Kerim, bir defada değil, yaklaşık 23 yıl boyunca yaşanan olaylara ve insanların ihtiyaçlarına göre bölüm bölüm indirilmiştir.\n\nBu iniş biçiminin sağladığı en temel yarar aşağıdakilerden hangisidir?",
      options: [
        "Kur'an'ın tamamının yalnız Mekke döneminde tamamlanmasını sağlaması",
        "Mesajın olaylarla birlikte adım adım uygulanmasını kolaylaştırması",
        "Ayetlerin ezberlenmesini ve yazıya geçirilmesini gereksiz kılması",
        "Kur'an'ın yalnızca indiği dönemin sorunlarına seslenmesini sağlaması",
      ],
      correctIndex: 1,
      explanation:
        "Parça parça iniş, ayetlerin olaylarla ilişkilendirilerek anlaşılmasını ve hayata geçirilmesini kolaylaştırmıştır. Kur'an ayrıca her çağa hitap eden evrensel bir kitaptır.",
    },
    {
      question:
        "Bir öğrenci Kur'an-ı Kerim'den seçtiği ayetleri şöyle gruplandırmıştır:\n\nI. Allah'ın birliğini ve ahiret gününü haber veren ayetler\nII. Namazın ve orucun nasıl yerine getirileceğini bildiren ayetler\nIII. Miras paylaşımının nasıl yapılacağını düzenleyen ayetler\n\nBu gruplar sırasıyla Kur'an'ın hangi ana konularıyla ilgilidir?",
      options: [
        "İnanç - İbadet - Muamelat",
        "İbadet - İnanç - Ahlak",
        "Kıssalar - İnanç - İbadet",
        "Ahlak - Muamelat - İnanç",
      ],
      correctIndex: 0,
      explanation:
        "Allah'a ve ahirete iman inanç; namaz ve oruç ibadet; miras gibi insanlar arası hukuki düzenlemeler ise muamelat konusuna girer.",
    },
    {
      question:
        "Yemame Savaşı'nda Kur'an'ı ezberlemiş çok sayıda kişinin şehit olması üzerine Hz. Ebubekir döneminde ayetler bir araya getirilerek mushaf hâline getirilmiş, Hz. Osman döneminde ise çoğaltılarak İslam beldelerine gönderilmiştir.\n\nBu iki çalışmayı yönlendiren ortak amaç aşağıdakilerden hangisidir?",
      options: [
        "Kur'an'ı Arapça dışındaki dillere çevirerek yaygınlaştırmak",
        "Sureleri iniş sırasına göre yeniden sıralayıp düzenlemek",
        "Kur'an'ın eksiksiz ve aynı biçimde korunmasını sağlamak",
        "Kur'an'ın sure ve ayet sayısını yeniden belirleyip azaltmak",
      ],
      correctIndex: 2,
      explanation:
        "Her iki çalışma da metnin kaybolmasını ve farklılaşmasını önlemeye yöneliktir; bu sayede Kur'an değiştirilmeden günümüze ulaşmıştır.",
    },
  ],

  // ─── İngilizce ─────────────────────────────────────────────
  "ingilizce/on-the-phone": [
    {
      question:
        "Ayşe: Hello. Can I speak to Mr. Yılmaz, please?\nSecretary: ----\nAyşe: OK. Then I'll call back after lunch.\n\nWhich sentence completes the conversation best?",
      options: [
        "Sure, I'm putting you through to him now.",
        "I'm sorry, he is at a meeting until lunchtime.",
        "Hold on a second, he is coming to the phone.",
        "Of course. Who's calling, please?",
      ],
      correctIndex: 1,
      explanation:
        "Ayşe'nin \"öğle yemeğinden sonra ararım\" demesi, Mr. Yılmaz'ın öğlene kadar müsait olmadığını gösterir. Diğer seçenekler onun hemen telefona gelebileceği anlamına gelir.",
    },
    {
      question:
        "Read the notice on Mr. Kaya's office door:\n\nI am in a meeting between 10:00 and 12:00.\nPlease leave a message with my secretary or call after 12:00.\n\nElif calls the office at 10:30. What will the secretary probably say?",
      options: [
        "He is in a meeting now. Would you like to leave a message?",
        "Hold on, please. I'm putting you through to him now.",
        "He isn't working today. He will be here tomorrow.",
        "He is having lunch. Please call him before 12:00.",
      ],
      correctIndex: 0,
      explanation:
        "Saat 10:30, notta yazan toplantı saatleri (10:00-12:00) arasındadır; bu yüzden sekreter mesaj bırakmayı önerir.",
    },
    {
      question:
        "Ali: Hello. Can I speak to Selin, please?\nWoman: There is nobody called Selin here. I'm afraid you have the wrong number.\nAli: ----",
      options: [
        "Thanks, I'll hold on then.",
        "Great, can you give her a message?",
        "Oh, sorry. I'll check the number again.",
        "OK, I'm calling her from her house.",
      ],
      correctIndex: 2,
      explanation:
        "\"Wrong number\" yanlış numara demektir; bu durumda özür dileyip numarayı kontrol etmek uygun cevaptır.",
    },
  ],
  "ingilizce/the-internet": [
    {
      question:
        "Look at the survey results of Class 8-A:\n\nWHAT DO YOU USE THE INTERNET FOR?\n\nUsing social media ....... 12 students\nPlaying online games ..... 9 students\nDoing research ........... 6 students\nShopping online .......... 3 students\n\nWhich sentence is TRUE according to the survey?",
      options: [
        "More students do research than play online games.",
        "Students play online games more than they do research.",
        "Shopping online is more popular than social media.",
        "The same number of students do research and shop online.",
      ],
      correctIndex: 1,
      explanation:
        "Tabloya göre oyun oynayan 9 öğrenci, araştırma yapan 6 öğrenciden fazladır. Sosyal medya en popüler etkinliktir ve alışveriş yapan 3 öğrenci araştırma yapanlarla eşit değildir.",
    },
    {
      question:
        "I never share my password with anyone ---- doing this is not safe. Last week my cousin gave hers to a friend, ---- someone logged into her account.\n\nWhich words complete the text correctly?",
      options: [
        "because / so",
        "so / because",
        "because / because",
        "so / so",
      ],
      correctIndex: 0,
      explanation:
        "İlk boşlukta sebep bildirildiği için \"because\", ikinci boşlukta sonuç bildirildiği için \"so\" gelir.",
    },
    {
      question:
        "Read the computer lab rules:\n\n- Log in with your own username.\n- Never share your password.\n- Do not upload personal photos.\n- Log off when you finish.\n\nWhich student is following ALL the rules?",
      options: [
        "Ege logs in with his own username but forgets to log off.",
        "Deniz uploads her holiday photos with her own username.",
        "Arda logs off at the end but shares his password with Ece.",
        "Zeynep logs in with her own username and logs off at the end.",
      ],
      correctIndex: 3,
      explanation:
        "Diğer öğrencilerin her biri kurallardan birini çiğniyor: çıkış yapmamak, kişisel fotoğraf yüklemek ve şifresini paylaşmak. Sadece Zeynep dört kurala da uyuyor.",
    },
  ],
  "ingilizce/adventures": [
    {
      question:
        "Tomorrow I'm going camping for the first time. I'm excited but a bit nervous, too. It will be very cold at night and there aren't any shops near the campsite.\n\nWhich advice is the MOST suitable for this person?",
      options: [
        "You should take a light tent because the weather will be hot.",
        "You shouldn't worry; you can buy your food at the campsite.",
        "You should take warm clothes and enough food.",
        "You shouldn't take many clothes; your bag will be heavy.",
      ],
      correctIndex: 2,
      explanation:
        "Metne göre geceleri çok soğuk olacak ve kamp alanının yakınında hiç market yok; bu yüzden kalın kıyafet ve yeterli yiyecek götürmek tek uygun tavsiyedir.",
    },
    {
      question:
        "Kaan: How was your first rafting trip?\nBoran: Amazing! At the beginning I was really ---- because the river was very fast and I couldn't swim well. But after five minutes I loved it.",
      options: [
        "bored",
        "brave",
        "excited",
        "scared",
      ],
      correctIndex: 3,
      explanation:
        "Nehrin çok hızlı olması ve iyi yüzememesi korku sebebidir; \"scared\" korkmuş demektir.",
    },
    {
      question:
        "Sude: I want to try paragliding next summer, but I'm afraid of heights.\nEfe: ----\nSude: That's a good idea. I'll do that first.",
      options: [
        "Then you should take a short flight with an instructor.",
        "Then you shouldn't be interested in adventure sports.",
        "You should go up to the mountain and jump alone.",
        "You shouldn't listen to the instructor during the flight.",
      ],
      correctIndex: 0,
      explanation:
        "Sude tavsiyeyi beğenip \"önce onu yapacağım\" diyor; eğitmenle kısa bir uçuş yapmak mantıklı ve güvenli bir öneridir.",
    },
  ],
  "ingilizce/tourism": [
    {
      question:
        "Read Melis's postcard:\n\nHi Ela! We arrived in Cappadocia on Monday. On the first day we visited the underground city and took hundreds of photos. Yesterday we went on a balloon tour and it was wonderful. I bought a small pottery cup for you. See you soon!\n\nWhich question CANNOT be answered from the postcard?",
      options: [
        "When did Melis arrive in Cappadocia?",
        "How much did she pay for the cup?",
        "What did she buy for Ela?",
        "What did she do yesterday?",
      ],
      correctIndex: 1,
      explanation:
        "Kartpostalda fincanın fiyatından hiç söz edilmiyor; diğer soruların cevapları metinde var.",
    },
    {
      question:
        "Tour guide: Welcome back to the bus! ---- the museum?\nTourist: Yes, we did. It was much bigger than we expected.",
      options: [
        "Did you enjoyed",
        "Do you enjoy",
        "Did you enjoy",
        "Have you enjoyed",
      ],
      correctIndex: 2,
      explanation:
        "Cevap \"Yes, we did\" olduğu için soru Simple Past ile kurulmalıdır ve \"did\"den sonra fiil yalın kalır: Did you enjoy.",
    },
    {
      question:
        "Read the advertisement:\n\nSUNSHINE TOURS - 3 DAYS IN ANTALYA\n* Hotel and breakfast are included.\n* A guide will be with you all day.\n* Free time for shopping in the old bazaar.\n\nWhich words describe what this tour offers?",
      options: [
        "accommodation, a tour guide, souvenir shopping",
        "camping, a journey by ship, a language course",
        "accommodation, wildlife photography, an avalanche",
        "a tour guide, a passport office, a science museum",
      ],
      correctIndex: 0,
      explanation:
        "İlanda otel (accommodation), rehber (tour guide) ve çarşıda alışveriş (souvenir shopping) yer alıyor.",
    },
  ],
  "ingilizce/chores": [
    {
      question:
        "Look at the chore chart of the Demir family:\n\nAli - take out the rubbish (every day)\nAyla - do the dishes (Mon, Wed, Fri)\nMum - cook dinner (every day)\nDad - sweep the floor (Saturday)\n\nWhich sentence is TRUE?",
      options: [
        "Ayla has to do the dishes every day.",
        "Ali doesn't have to take out the rubbish on Sundays.",
        "Dad has to sweep the floor once a week.",
        "Mum doesn't have to cook at the weekend.",
      ],
      correctIndex: 2,
      explanation:
        "Baba yeri sadece cumartesi süpürüyor, yani haftada bir kez. Ali her gün çöpü çıkarıyor, anne her gün yemek yapıyor.",
    },
    {
      question:
        "Zehra: Can you come to the cinema this evening?\nUmut: I'm not sure. I ---- help my brother with his project tonight.\nZehra: What about tomorrow? It's Sunday.\nUmut: Tomorrow is perfect. I ---- get up early at weekends.",
      options: [
        "have to / don't have to",
        "don't have to / have to",
        "has to / doesn't have to",
        "have to / has to",
      ],
      correctIndex: 0,
      explanation:
        "İlk boşlukta zorunluluk (have to), ikinci boşlukta zorunluluk olmaması (don't have to) anlatılır; özne \"I\" olduğu için \"has to\" kullanılmaz.",
    },
    {
      question:
        "Kerem: In our house everybody has a job. My sister makes the beds and I set the table before dinner. My father does the dishes because my mother cooks the meals.\n\nWhich chore does Kerem have to do?",
      options: [
        "He has to make the beds.",
        "He has to cook the meals.",
        "He has to do the dishes.",
        "He has to set the table.",
      ],
      correctIndex: 3,
      explanation:
        "Kerem \"I set the table\" diyor; yatakları kardeşi topluyor, bulaşığı babası yıkıyor, yemeği annesi yapıyor.",
    },
  ],
  "ingilizce/science": [
    {
      question:
        "Read the text:\n\nAlexander Graham Bell was a famous inventor. The first telephone was invented by him in his workshop in 1876. After this invention, people could talk to each other over very long distances.\n\nWhich sentence is TRUE according to the text?",
      options: [
        "The telephone was invented by Bell in 1876.",
        "The first telephone was invented in a university lab.",
        "Bell invented the telephone with a group of scientists.",
        "People could talk over long distances before 1876.",
      ],
      correctIndex: 0,
      explanation:
        "Metne göre ilk telefon 1876'da Bell tarafından kendi atölyesinde icat edilmiştir; \"by\" işi yapanı gösterir.",
    },
    {
      question:
        "Teacher: Look at these photographs from the history of science. The first light bulbs ---- in the 19th century, and penicillin ---- by Fleming in 1928.",
      options: [
        "was invented / was discovered",
        "were invented / were discovered",
        "was invented / were discovered",
        "were invented / was discovered",
      ],
      correctIndex: 3,
      explanation:
        "\"Light bulbs\" çoğul olduğu için \"were\", \"penicillin\" tekil olduğu için \"was\" kullanılır.",
    },
    {
      question:
        "Read the notice on the laboratory door:\n\nSCIENCE CLUB - FRIDAY, 15:30\nThis week we will do an experiment with water and electricity.\nWear your lab coat and safety glasses.\nDo not touch the equipment before the teacher arrives.\n\nWhich student is behaving correctly?",
      options: [
        "Ece arrives on Friday and starts the experiment before the teacher.",
        "Baran comes on Friday afternoon with his lab coat and safety glasses.",
        "Tuna wears his lab coat but leaves his safety glasses at home.",
        "Nil puts on her lab coat and touches the equipment early.",
      ],
      correctIndex: 1,
      explanation:
        "Duyuruya göre kulüp cuma 15:30'da; önlük ve koruyucu gözlük zorunlu. Sadece Baran hem gün/saate hem de kıyafet kuralına uyuyor.",
    },
  ],
  "ingilizce/natural-forces": [
    {
      question:
        "Look at the sign at the ski centre:\n\nAVALANCHE WARNING - LEVEL 4\nThe upper slope is closed today.\n\nGuide: If you ski above this point, ----",
      options: [
        "you might get to the top faster.",
        "you will be in danger.",
        "you will find the lower slope.",
        "you might see the guide there.",
      ],
      correctIndex: 1,
      explanation:
        "Çığ uyarısı ve kapalı pist açıkça tehlikeyi gösterir. Seçeneklerin hepsi dilbilgisel olarak doğrudur; ayırt edici olan anlamdır: yasak bölgede kayak yapmak tehlikeye yol açar.",
    },
    {
      question:
        "Look at tomorrow's weather forecast:\n\nRain ........... 95%\nStrong wind .... 20%\n\nWhich sentence describes the forecast best?",
      options: [
        "It will be windy and it might rain.",
        "It might rain and it might be windy.",
        "It will rain and it might be windy.",
        "It will rain and it will be windy.",
      ],
      correctIndex: 2,
      explanation:
        "Yağmur ihtimali %95 olduğu için kesine yakın tahmin \"will\" ile, rüzgâr ihtimali %20 gibi düşük olduğu için \"might\" ile verilir.",
    },
    {
      question:
        "Read the earthquake safety poster:\n\n* If you are inside, do not run to the stairs.\n* Get under a strong table and hold on.\n* If you are outside, stay away from buildings and trees.\n\nWhich sentence is correct according to the poster?",
      options: [
        "If an earthquake starts, you should use the lift quickly.",
        "If you are in the street, you should stand near tall buildings.",
        "If you are at home, you should run down the stairs.",
        "If you are inside, you should get under a strong table.",
      ],
      correctIndex: 3,
      explanation:
        "Poster içerideyken merdivene koşmamayı, sağlam bir masanın altına girmeyi söylüyor.",
    },
  ],
};

/** Verilen ders/konu için zor (yeni nesil) soruları döner; yoksa boş dizi. */
export function getAdvancedQuestions(
  subjectSlug: string,
  topicId: string,
): QuizQuestion[] {
  return ADVANCED_QUESTIONS[`${subjectSlug}/${topicId}`] ?? [];
}
