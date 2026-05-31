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
        "Dijital ortamlardaki sık uyaranlar zihinsel yorgunluğa yol açabilir",
        "Modern toplumlarda zaman gerçekten kısalmıştır",
        "Beyin her durumda aynı verimlilikte çalışır",
        "Dijital ortamların hiçbir yararı yoktur",
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
      options: ["III", "I", "II", "IV"],
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
        "A rampasında daha az kuvvet uygulanır",
        "Her ikisinde de eşit kuvvet uygulanır",
        "B rampasında daha çok iş yapılır",
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
        "Yere uygulanan basıncı azaltarak yolun bozulmasını önlemek",
        "Yakıt tüketimini artırmak",
        "Kamyonun toplam kütlesini azaltmak",
        "Sürtünmeyi tamamen ortadan kaldırmak",
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
        "Liderlik ve karakter özellikleri çocukluk ve gençlik döneminde şekillenir",
        "Askerî eğitim her zaman dünya görüşünü değiştirir",
        "Sorgulayıcı insanlar yöneticiliği reddeder",
        "Yalnız savaş tecrübesi karakter oluşturur",
      ],
      correctIndex: 0,
    },
    {
      question:
        "Mustafa Kemal'in Çanakkale Cephesi'ndeki başarısı, ona neden önemli bir kahramanlık kazandırmıştır?",
      options: [
        "Düşmanın İstanbul'a ulaşmasını engelleyerek İtilaf Devletleri planlarını bozması",
        "Padişaha karşı geldiği için",
        "Çanakkale'yi siyasi olarak başkent yapması",
        "Tüm cepheleri tek başına yönetmesi",
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
        "Kader Allah'ın ezeli ilmiyle her şeyi takdir etmesi, kaza ise bu takdirin zamanı gelince gerçekleşmesidir",
        "Kader ve kaza aynı anlama gelir, fark yoktur",
        "Kader insanın iradesi, kaza Allah'ın isteğidir",
        "Kader sadece kötü olaylar için kullanılır",
      ],
      correctIndex: 0,
    },
    {
      question:
        "İnsanın irade ve sorumluluğu, kader inancıyla ilgili olarak nasıl değerlendirilir?",
      options: [
        "İnsan, kendisine verilen iradeyle seçim yapar; yaptıklarından sorumludur",
        "İnsanın hiçbir seçim hakkı yoktur",
        "İnsan tüm fiillerinde mecburdur",
        "İrade yalnız meleklerde vardır",
      ],
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
        "Congratulations! That sounds wonderful.",
        "I love your new haircut.",
        "Let's celebrate this great news.",
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
};

/** Verilen ders/konu için zor (yeni nesil) soruları döner; yoksa boş dizi. */
export function getAdvancedQuestions(
  subjectSlug: string,
  topicId: string,
): QuizQuestion[] {
  return ADVANCED_QUESTIONS[`${subjectSlug}/${topicId}`] ?? [];
}
