import type { SubjectContent } from "./types";

/**
 * Türkçe (LGS 8. sınıf) konuları.
 * Videolar (youtubeId) sonradan eklenecek; boş olanlar "yakında" görünür.
 * Tüm metin değerleri, içlerinde ' ve " geçtiği için backtick (`) ile yazılır.
 */
export const TURKCE: SubjectContent = {
  slug: "turkce",
  name: "Türkçe",
  topics: [
    {
      id: "sozcukte-anlam",
      name: `Sözcükte Anlam`,
      summary: `Gerçek, mecaz, terim anlam; deyim, atasözü ve eş/zıt anlam.`,
      youtubeId: "",
      mindMap: {
        center: `Sözcükte Anlam`,
        branches: [
          {
            label: `Gerçek, Mecaz ve Terim Anlam`,
            detail: `Gerçek anlam sözcüğün ilk akla gelen anlamıdır. Mecaz anlam başka bir kavramı anlatmak için kullanılır. Terim anlam bir bilim, sanat veya meslek dalına özgüdür (örn. müzikte "nota").`,
          },
          {
            label: `Deyim ve Atasözü`,
            detail: `Deyimler kalıplaşmış, çoğu mecaz anlamlı söz öbekleridir (etekleri zil çalmak). Atasözleri ise öğüt veya genel yargı bildiren kalıp sözlerdir (Damlaya damlaya göl olur).`,
          },
          {
            label: `Eş, Zıt ve Eş Sesli Anlam`,
            detail: `Eş anlam: aynı anlam (konuk-misafir). Zıt anlam: karşıt (iyi-kötü). Eş sesli (sesteş): yazılışı aynı, anlamı farklı (yüz: surat / 100 / yüzmek).`,
          },
          {
            label: `Somut ve Soyut Anlam`,
            detail: `Somut: beş duyuyla algılanabilen (taş, su). Soyut: algılanamayan, akılla kavranan kavram (sevgi, özgürlük).`,
          },
        ],
      },
      cards: [
        {
          front: `Gerçek, mecaz ve terim anlam nedir?`,
          back: `Gerçek: ilk akla gelen anlam. Mecaz: başka kavramı anlatma. Terim: bir bilim/sanat dalına özgü anlam.`,
        },
        {
          front: `Deyim ile atasözü farkı nedir?`,
          back: `Deyim kalıplaşmış söz öbeğidir (çoğu mecaz). Atasözü öğüt veya genel yargı bildirir.`,
        },
        {
          front: `Eş sesli (sesteş) sözcük nedir?`,
          back: `Yazılışı ve okunuşu aynı, anlamı farklı sözcüktür. Örnek: "yüz" (surat / sayı / yüzmek).`,
        },
        {
          front: `Somut ve soyut sözcük örneği?`,
          back: `Somut: kalem, taş (algılanır). Soyut: sevgi, korku (kavram).`,
        },
      ],
      article: `## Gerçek, Mecaz ve Terim Anlam
Bir sözcüğün ilk akla gelen, sözlükteki temel anlamına gerçek anlam denir. Sözcük, gerçek anlamından uzaklaşıp başka bir kavramı anlatmak için kullanılırsa mecaz anlam kazanır (örnek: "Bana çok soğuk davrandı"). Bir bilim, sanat veya meslek dalına özgü anlama ise terim anlam denir (örnek: müzikte "nota", matematikte "kök").

## Deyimler ve Atasözleri
Deyimler en az iki sözcükten oluşan, kalıplaşmış ve çoğu mecaz anlam taşıyan söz öbekleridir (etekleri zil çalmak, göz atmak). Atasözleri ise toplumun ortak deneyiminden doğan, öğüt veya genel bir yargı bildiren kalıp sözlerdir (Damlaya damlaya göl olur).

## Eş, Zıt ve Eş Sesli Anlam
Eş anlamlı sözcükler aynı anlamı taşır (konuk-misafir). Zıt anlamlı sözcükler birbirinin karşıtıdır (iyi-kötü). Eş sesli (sesteş) sözcükler yazılışı aynı, anlamı farklı olan sözcüklerdir (yüz: surat / 100 / yüzme eylemi).

## Somut ve Soyut Anlam
Beş duyu organımızdan biriyle algılayabildiğimiz varlıkları karşılayan sözcükler somuttur (taş, su, ağaç). Algılanamayan, yalnızca akılla kavranan kavramları karşılayanlar ise soyuttur (sevgi, özgürlük, korku).`,
      tips: [
        {
          trap: `Mecaz anlam ile terim anlam karıştırılır.`,
          wrong: `"Acı haber" ifadesinde "acı" terim anlamdadır.`,
          correct: `"Acı haber"de "acı" mecaz anlamdadır. Terim anlam bir bilim/sanat dalına özgüdür (örn. müzikte "nota").`,
        },
        {
          trap: `Deyim ile atasözü karıştırılır.`,
          wrong: `"İğneyle kuyu kazmak" bir atasözüdür.`,
          correct: `Bu bir deyimdir. Atasözleri öğüt/yargı bildirir (örn. "Sakla samanı, gelir zamanı").`,
        },
      ],
      quiz: [
        {
          question: `"Soğuk" sözcüğü hangi cümlede mecaz anlamda kullanılmıştır?`,
          options: [
            `Soğuk bir bardak su içtim.`,
            `Bugün hava çok soğuk.`,
            `Bana çok soğuk davrandı.`,
            `Buzdolabı yiyecekleri soğuk tutar.`,
          ],
          correctIndex: 2,
        },
        {
          question: `Aşağıdakilerden hangisi atasözüdür?`,
          options: [
            `Ayağını yorganına göre uzat`,
            `Etekleri zil çalmak`,
            `Burnu havada olmak`,
            `Göz atmak`,
          ],
          correctIndex: 0,
          explanation: `Diğerleri deyimdir; atasözü öğüt/yargı bildirir.`,
        },
        {
          question: `"Yüz" sözcüğü hangi cümlede sayı anlamındadır?`,
          options: [
            `Yüzü çok güzeldi.`,
            `Havuzda biraz yüz.`,
            `Sınıfta yüz öğrenci var.`,
            `Yüzünü güzelce yıkadı.`,
          ],
          correctIndex: 2,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde altı çizili sözcük terim anlamlıdır?`,
          options: [
            `Ağacın kökü çürümüş.`,
            `Matematikte karekök kavramını öğrendik.`,
            `Saçının kökü beyazlamış.`,
            `Sorunun kökünü buldum.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdakilerden hangisi soyut anlamlı bir sözcüktür?`,
          options: [`Kalem`, `Sevgi`, `Masa`, `Taş`],
          correctIndex: 1,
        },
        {
          question: `"El" sözcüğü hangi cümlede "yabancı, başkası" anlamındadır?`,
          options: [
            `Elini sabunla yıkadı.`,
            `El âlem ne der diye düşünme.`,
            `Düşünce elini kesti.`,
            `Bardağı eliyle tuttu.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdakilerden hangisi eş anlamlı sözcük çiftidir?`,
          options: [
            `Siyah - beyaz`,
            `Misafir - konuk`,
            `Sıcak - soğuk`,
            `Açık - kapalı`,
          ],
          correctIndex: 1,
        },
        {
          question: `"Tatlı" sözcüğü hangi cümlede mecaz anlamda kullanılmıştır?`,
          options: [
            `Bayramda tatlı yedik.`,
            `Çok tatlı bir insandı.`,
            `Reçel oldukça tatlıydı.`,
            `Tatlı yemeyi severim.`,
          ],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "cumlede-anlam",
      name: `Cümlede Anlam`,
      summary: `Neden-sonuç, amaç, koşul; öznel-nesnel, karşılaştırma, olasılık.`,
      youtubeId: "",
      mindMap: {
        center: `Cümlede Anlam`,
        branches: [
          {
            label: `Neden-Sonuç, Amaç-Sonuç, Koşul`,
            detail: `Neden-sonuç: gerçekleşmiş sebep ("-dığı için"). Amaç-sonuç: bir amaçla yapma ("için, diye"). Koşul-şart: bir şarta bağlama ("-sa/-se, ise, -ınca").`,
          },
          {
            label: `Öznel ve Nesnel Anlam`,
            detail: `Öznel: kişiden kişiye değişen, kanıtlanamayan yorum. Nesnel: kanıtlanabilen, herkes için aynı olan bilgi.`,
          },
          {
            label: `Karşılaştırma, Abartma, Olasılık`,
            detail: `Karşılaştırma: "daha, en, göre". Abartma: olduğundan büyük/küçük gösterme. Olasılık: "belki, galiba, sanırım".`,
          },
        ],
      },
      cards: [
        {
          front: `Öznel ve nesnel cümle nedir?`,
          back: `Öznel: kanıtlanamayan, kişisel yorum. Nesnel: kanıtlanabilen, herkes için aynı bilgi.`,
        },
        {
          front: `Neden-sonuç ile amaç-sonuç farkı?`,
          back: `Neden-sonuçta gerçekleşmiş sebep vardır. Amaç-sonuçta bir amaçla yapma söz konusudur ("için, diye").`,
        },
        {
          front: `Koşul (şart) anlamı hangi eklerle olur?`,
          back: `"-sa/-se, ise, -ınca" gibi ifadelerle: "Erken kalkarsan yetişirsin."`,
        },
        {
          front: `Olasılık bildiren sözcükler?`,
          back: `Belki, galiba, sanırım, muhtemelen.`,
        },
      ],
      article: `## Anlam İlişkileri
Neden-sonuç ilişkisinde bir işin gerçekleşmiş bir sebebi vardır: "Yağmur yağdığı için maç ertelendi." Amaç-sonuç ilişkisinde iş, bir amaca ulaşmak için yapılır: "Görüşmek için aradı." Koşul (şart) ilişkisinde bir durum başka bir şarta bağlanır: "Erken kalkarsan otobüsü yakalarsın."

## Öznel ve Nesnel Anlam
Öznel cümleler kişiden kişiye değişen, kanıtlanamayan kişisel yorumlardır: "Bu film çok sıkıcıydı." Nesnel cümleler ise kanıtlanabilen, herkes için aynı olan bilgilerdir: "Film iki saat sürdü."

## Karşılaştırma, Abartma ve Olasılık
Karşılaştırma cümlelerinde iki varlık/durum kıyaslanır ("daha, en, göre"): "Ali, Veli'den daha uzun." Abartmada bir durum olduğundan çok farklı gösterilir: "Seni görmeyeli bir asır oldu." Olasılık cümlelerinde kesinlik yoktur ("belki, galiba"): "Belki bu akşam yağmur yağar."`,
      tips: [
        {
          trap: `Öznel ve nesnel ayrımı yanlış yapılır.`,
          wrong: `"Bu film 2 saat sürüyor" öznel bir yargıdır.`,
          correct: `Bu nesneldir (kanıtlanabilir). Öznel olan "Bu film çok sıkıcı" gibi yorum içerir.`,
        },
        {
          trap: `Neden-sonuç ile amaç-sonuç karıştırılır.`,
          wrong: `"Sınavı geçmek için çalıştı" neden-sonuç cümlesidir.`,
          correct: `Bu amaç-sonuçtur ("için" amaç bildirir). Neden-sonuçta gerçekleşmiş bir sebep bulunur.`,
        },
      ],
      quiz: [
        {
          question: `Aşağıdakilerden hangisi öznel bir yargıdır?`,
          options: [
            `Kitap 200 sayfadır.`,
            `Bu roman çok etkileyiciydi.`,
            `Film saat sekizde başladı.`,
            `Sınıfta 30 öğrenci var.`,
          ],
          correctIndex: 1,
        },
        {
          question: `"Yağmur yağdığı için maç ertelendi." cümlesinde hangi anlam ilişkisi vardır?`,
          options: [`Amaç-sonuç`, `Neden-sonuç`, `Koşul`, `Karşılaştırma`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde koşul (şart) anlamı vardır?`,
          options: [
            `Erken kalkarsan otobüsü yakalarsın.`,
            `Üşüdüğü için kazak giydi.`,
            `Sınıfın en çalışkanı odur.`,
            `Belki yarın gelir.`,
          ],
          correctIndex: 0,
        },
        {
          question: `Aşağıdakilerden hangisinde amaç-sonuç ilişkisi vardır?`,
          options: [
            `Hastalandığı için gelemedi.`,
            `Seninle görüşmek için aradı.`,
            `Bugün hava çok güzel.`,
            `Çok yorgun görünüyordu.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde karşılaştırma vardır?`,
          options: [
            `Ali, Veli'den daha uzun.`,
            `Dışarıda yağmur yağıyor.`,
            `Belki bu akşam gelir.`,
            `Kapıyı yavaşça kapattı.`,
          ],
          correctIndex: 0,
        },
        {
          question: `Aşağıdakilerden hangisi nesnel bir cümledir?`,
          options: [
            `Türkiye'nin başkenti Ankara'dır.`,
            `En güzel şehir İstanbul'dur.`,
            `Bu yemek çok lezzetliydi.`,
            `Kış mevsimi çok sıkıcıdır.`,
          ],
          correctIndex: 0,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde abartma vardır?`,
          options: [
            `Seni görmeyeli neredeyse bir asır oldu.`,
            `Dün seni okulda gördüm.`,
            `Saat üçte buluştuk.`,
            `Kitabı iki günde okudum.`,
          ],
          correctIndex: 0,
        },
        {
          question: `"Belki bu akşam yağmur yağar." cümlesinde hangi anlam vardır?`,
          options: [`Kesinlik`, `Olasılık`, `Koşul`, `Karşılaştırma`],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "paragrafta-anlam",
      name: `Paragrafta Anlam`,
      summary: `Konu, ana düşünce, yardımcı düşünce ve anlatım biçimleri.`,
      youtubeId: "",
      mindMap: {
        center: `Paragrafta Anlam`,
        branches: [
          {
            label: `Konu ve Ana Düşünce`,
            detail: `Konu: paragrafta hakkında konuşulan şey (genel). Ana düşünce: yazarın okura vermek istediği asıl mesaj.`,
          },
          {
            label: `Yardımcı Düşünce`,
            detail: `Ana düşünceyi destekleyen, açıklayan yan fikirlerdir.`,
          },
          {
            label: `Anlatım Biçimleri`,
            detail: `Açıklama, tartışma, betimleme ve öyküleme dört temel anlatım biçimidir.`,
          },
          {
            label: `Paragrafın Yapısı`,
            detail: `Giriş, gelişme ve sonuç bölümlerinden oluşur. Giriş cümlesi kendinden önceki bir cümleye bağlanmaz; bağlaç veya işaret zamiriyle başlamaz.`,
          },
        ],
      },
      cards: [
        {
          front: `Konu ile ana düşünce farkı nedir?`,
          back: `Konu "ne hakkında" olduğudur (genel). Ana düşünce yazarın vermek istediği asıl mesajdır.`,
        },
        {
          front: `Dört temel anlatım biçimi nedir?`,
          back: `Açıklama, tartışma, betimleme, öyküleme.`,
        },
        {
          front: `Betimleme nedir?`,
          back: `Bir varlığı/sahneyi okurun gözünde canlandıran anlatım biçimidir.`,
        },
        {
          front: `Giriş cümlesinin özelliği?`,
          back: `Bağımsızdır; kendinden önceki cümleye bağlanmaz, bağlaç/işaret zamiriyle başlamaz.`,
        },
      ],
      article: `## Konu ve Ana Düşünce
Paragrafta üzerinde durulan, hakkında konuşulan şeye konu denir; konu geneldir ve "Ne anlatılıyor?" sorusuna yanıt verir. Ana düşünce ise yazarın okuyucuya iletmek istediği asıl mesajdır.

## Yardımcı Düşünceler
Ana düşünceyi destekleyen, onu açıklayan ve güçlendiren yan fikirlere yardımcı düşünce denir.

## Anlatım Biçimleri
Dört temel anlatım biçimi vardır: Açıklama (bilgi verme), tartışma (bir görüşü çürütüp başka görüşü savunma), betimleme (gözde canlandırma) ve öyküleme (olayı yer, zaman, kişi belirterek anlatma).

## Paragrafın Yapısı
Paragraf giriş, gelişme ve sonuç bölümlerinden oluşur. Giriş cümlesi bağımsızdır; kendinden önceki bir cümleye bağlanmaz, bu yüzden "bu, o, bundan dolayı, ayrıca" gibi ifadelerle başlamaz. Anlam akışını bozan, konu dışı cümle paragraftan çıkarılması gereken cümledir.`,
      tips: [
        {
          trap: `Konu ile ana düşünce karıştırılır.`,
          wrong: `Paragrafın konusu ile ana düşüncesi aynı şeydir.`,
          correct: `Konu "ne hakkında" olduğudur (genel); ana düşünce verilmek istenen asıl mesajdır.`,
        },
        {
          trap: `Giriş cümlesi seçiminde yanılma.`,
          wrong: `Giriş cümlesi "bundan dolayı", "o" gibi ifadelerle başlayabilir.`,
          correct: `Giriş cümlesi bağımsızdır; bağlaç veya işaret zamiriyle başlamaz.`,
        },
      ],
      quiz: [
        {
          question: `Paragrafta yazarın okura vermek istediği asıl mesaja ne denir?`,
          options: [`Konu`, `Ana düşünce`, `Başlık`, `Yardımcı düşünce`],
          correctIndex: 1,
        },
        {
          question: `Olayların yer, zaman ve kişi belirtilerek anlatıldığı anlatım biçimi hangisidir?`,
          options: [`Betimleme`, `Öyküleme`, `Tartışma`, `Açıklama`],
          correctIndex: 1,
        },
        {
          question: `Bir paragrafın giriş cümlesi için aşağıdakilerden hangisi doğrudur?`,
          options: [
            `"Bundan dolayı" ifadesiyle başlayabilir.`,
            `Kendinden önceki cümleye bağlanmaz, bağımsızdır.`,
            `"O, bu" gibi zamirlerle başlamalıdır.`,
            `Mutlaka bir soru cümlesidir.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Bir varlığı okurun gözünde canlandıran anlatım biçimi hangisidir?`,
          options: [`Betimleme`, `Açıklama`, `Tartışma`, `Öyküleme`],
          correctIndex: 0,
        },
        {
          question: `Paragrafın "ne hakkında olduğunu" belirten unsur hangisidir?`,
          options: [`Ana düşünce`, `Konu`, `Yardımcı düşünce`, `Sonuç`],
          correctIndex: 1,
        },
        {
          question: `Paragraftan çıkarılması gereken cümle bulunurken nelere dikkat edilir?`,
          options: [
            `Cümlenin uzunluğuna`,
            `Anlam akışını bozan, konu dışı cümleye`,
            `Yalnızca ilk cümleye`,
            `Soru işareti olan cümleye`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdakilerden hangisi dört temel anlatım biçiminden biri DEĞİLDİR?`,
          options: [`Betimleme`, `Öyküleme`, `Tartışma`, `Karşılaştırma`],
          correctIndex: 3,
        },
        {
          question: `Ana düşünceyi destekleyen, güçlendiren fikirlere ne denir?`,
          options: [`Konu`, `Yardımcı düşünce`, `Başlık`, `Olay`],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "fiilimsiler",
      name: `Fiilimsiler`,
      summary: `İsim-fiil, sıfat-fiil ve zarf-fiil.`,
      youtubeId: "",
      mindMap: {
        center: `Fiilimsiler`,
        branches: [
          {
            label: `İsim-Fiil (-ma, -ış, -mak)`,
            detail: `Fiile -ma/-me, -ış/-iş, -mak/-mek ekleri gelerek fiili isimleştirir. Örnek: koşmak, gülüş, bakma.`,
          },
          {
            label: `Sıfat-Fiil (-an, -dik, -ecek, -miş, -r, -ası, -maz)`,
            detail: `Fiili sıfatlaştırır; kendinden sonraki ismi niteler. Örnek: akan su, okunacak kitap, pişmiş aş.`,
          },
          {
            label: `Zarf-Fiil (-ip, -arak, -ınca, -ken, -dıkça, -madan)`,
            detail: `Fiili zarflaştırır; eylemin durumunu/zamanını bildirir. Örnek: gülerek, eve gidince, koşa koşa.`,
          },
          {
            label: `Önemli Not`,
            detail: `Fiilimsiler fiilden türer ama çekimli fiil değildir; cümlede yüklem olamaz, yan cümlecik kurar.`,
          },
        ],
      },
      cards: [
        {
          front: `İsim-fiil ekleri nelerdir?`,
          back: `-ma/-me, -ış/-iş, -mak/-mek. Örnek: yüzmek, gülüş, bakma.`,
        },
        {
          front: `Sıfat-fiil ne yapar?`,
          back: `Fiili sıfatlaştırır ve kendinden sonraki ismi niteler. Örnek: "akan su".`,
        },
        {
          front: `Zarf-fiil ne yapar?`,
          back: `Fiili zarflaştırır; eylemin nasıl/ne zaman yapıldığını bildirir. Örnek: "konuşarak".`,
        },
        {
          front: `Fiilimsi yüklem olabilir mi?`,
          back: `Olamaz. Fiilimsi çekimli fiil değildir; cümlede isim, sıfat veya zarf görevi yapar.`,
        },
      ],
      article: `## Fiilimsi Nedir?
Fiilden türeyen ama çekimli fiil olmayan; cümlede isim, sıfat veya zarf görevinde kullanılan sözcüklere fiilimsi denir. Fiilimsiler yüklem olamaz, yan cümlecik kurar.

## İsim-Fiil
Fiile -ma/-me, -ış/-iş, -mak/-mek ekleri getirilerek oluşur ve fiili isimleştirir: "Yüzmeyi severim.", "Gülüşü çok güzel." Dikkat: -ma eki hem isim-fiil hem de olumsuzluk eki olabilir; anlamına bakılır.

## Sıfat-Fiil
Fiile -an/-en, -dik, -ecek, -miş, -r, -ası, -maz ekleri getirilerek oluşur ve kendinden sonra gelen ismi niteler: "akan su", "okunacak kitap", "pişmiş aş".

## Zarf-Fiil
Fiile -ip, -arak, -ınca, -ken, -dıkça, -madan gibi ekler getirilerek oluşur ve eylemin durumunu, zamanını bildirir: "Konuşarak yürüdü.", "Eve gidince aradı."`,
      tips: [
        {
          trap: `İsim-fiil eki -ma ile olumsuzluk eki -ma karıştırılır.`,
          wrong: `"Okuma kitabı getirdi." cümlesinde "okuma" olumsuzluk ekidir.`,
          correct: `Buradaki -ma isim-fiil ekidir. Olumsuzluk eki fiili olumsuz yapar (gelme = gelmedi).`,
        },
        {
          trap: `Çekimli fiil ile fiilimsi karıştırılır.`,
          wrong: `"Koştu" bir fiilimsidir.`,
          correct: `"Koştu" çekimli fiildir (yüklem olur). Fiilimsi "koşan, koşmak, koşarak" gibi olur.`,
        },
      ],
      quiz: [
        {
          question: `Aşağıdaki cümlelerin hangisinde isim-fiil vardır?`,
          options: [
            `Yüzmeyi çok severim.`,
            `Koşan çocuk düştü.`,
            `Gülerek içeri girdi.`,
            `Eve gelince beni aradı.`,
          ],
          correctIndex: 0,
        },
        {
          question: `"Akan sular durdu." cümlesindeki fiilimsinin türü nedir?`,
          options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Fiilimsi yoktur`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde zarf-fiil vardır?`,
          options: [
            `Okumak güzeldir.`,
            `Konuşarak yürüdü.`,
            `Gelen gideni aratır.`,
            `Bakış açısı önemlidir.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde fiilimsi YOKTUR?`,
          options: [
            `Çocuk mışıl mışıl uyudu.`,
            `Gülen yüz herkesi mutlu eder.`,
            `Sabah yürüyüş yaptık.`,
            `Eve gidip hemen uyudu.`,
          ],
          correctIndex: 0,
        },
        {
          question: `"Sınavı kazanmak için çok çalıştı." cümlesindeki fiilimsinin türü nedir?`,
          options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Fiilimsi yoktur`],
          correctIndex: 0,
        },
        {
          question: `Aşağıdakilerden hangisi sıfat-fiil ekidir?`,
          options: [`-arak`, `-ınca`, `-ecek`, `-ip`],
          correctIndex: 2,
        },
        {
          question: `"Eve gidince ödevini yaptı." cümlesinde fiilimsi hangisidir?`,
          options: [`gidince`, `eve`, `ödevini`, `yaptı`],
          correctIndex: 0,
        },
        {
          question: `Fiilimsilerle ilgili aşağıdakilerden hangisi doğrudur?`,
          options: [
            `Cümlede çekimli fiil (yüklem) olurlar.`,
            `Fiilden türer; isim, sıfat veya zarf görevi yaparlar.`,
            `Sadece isimlerden türerler.`,
            `Cümlenin öznesi olamazlar.`,
          ],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "cumlenin-ogeleri",
      name: `Cümlenin Ögeleri`,
      summary: `Yüklem, özne, nesne, dolaylı tümleç ve zarf tümleci.`,
      youtubeId: "",
      mindMap: {
        center: `Cümlenin Ögeleri`,
        branches: [
          {
            label: `Temel Ögeler: Yüklem ve Özne`,
            detail: `Yüklem: işi/oluşu bildiren ögedir (genelde sonda). Özne: işi yapan/olan ögedir ("Kim?", "Ne?").`,
          },
          {
            label: `Nesne (Belirtili / Belirtisiz)`,
            detail: `Yüklemdeki işten etkilenen ögedir. "Neyi/kimi?" sorusu belirtili nesneyi, "ne?" sorusu belirtisiz nesneyi buldurur.`,
          },
          {
            label: `Dolaylı Tümleç ve Zarf Tümleci`,
            detail: `Dolaylı tümleç: "-e, -de, -den" yer-yön ("Nereye/nerede/nereden?"). Zarf tümleci: "Nasıl/ne zaman/niçin?" sorularına yanıt verir.`,
          },
          {
            label: `Bulma Yöntemi`,
            detail: `Önce yüklem bulunur; sonra yükleme sorular sorularak diğer ögeler bulunur.`,
          },
        ],
      },
      cards: [
        {
          front: `Cümlenin temel ögeleri nelerdir?`,
          back: `Yüklem ve özne. (Nesne, dolaylı tümleç, zarf tümleci yardımcı ögelerdir.)`,
        },
        {
          front: `Belirtili nesne nasıl bulunur?`,
          back: `Yükleme "neyi/kimi?" sorusu sorularak bulunur. Örnek: "Onu sevdim."`,
        },
        {
          front: `Dolaylı tümleç hangi soruların yanıtıdır?`,
          back: `"Nereye, nerede, nereden?" (yer-yön). Örnek: "Okula gitti."`,
        },
        {
          front: `Ögeler bulunurken ilk ne yapılır?`,
          back: `Önce yüklem bulunur, sonra yükleme sorular sorulur.`,
        },
      ],
      article: `## Temel Ögeler
Yüklem, cümlede işi, oluşu veya durumu bildiren ögedir ve genellikle cümlenin sonunda bulunur. Özne ise işi yapan veya olan ögedir; yükleme "Kim?" ya da "Ne?" sorusu sorularak bulunur.

## Nesne
Öznenin yaptığı işten etkilenen ögedir. Belirtili nesne "neyi/kimi?" (Kitabı okudu), belirtisiz nesne "ne?" (Kitap okudu) sorusuyla bulunur.

## Dolaylı Tümleç ve Zarf Tümleci
Dolaylı tümleç yükleme "-e, -de, -den" ekleriyle bağlanır; "Nereye, nerede, nereden?" sorularına yanıt verir (Okula gitti). Zarf tümleci ise eylemin nasıl, ne zaman, niçin yapıldığını bildirir (Dün geldi, hızlıca koştu).

## Ögeleri Bulma
Cümlenin ögelerini bulurken önce yüklem belirlenir. Daha sonra yükleme "Kim?", "Neyi?", "Nereye?", "Nasıl?" gibi sorular sorularak diğer ögeler bulunur.`,
      tips: [
        {
          trap: `Özne ile nesne karıştırılır.`,
          wrong: `"Kitabı okudu." cümlesinde "kitabı" öznedir.`,
          correct: `"Kitabı" belirtili nesnedir ("neyi okudu?"). Özne gizli "o" öznesidir.`,
        },
        {
          trap: `Dolaylı tümleç ile zarf tümleci karıştırılır.`,
          wrong: `"Okula gitti." cümlesinde "okula" zarf tümlecidir.`,
          correct: `"Okula" dolaylı tümleçtir (yer-yön, "-e" hâli). Zarf tümleci "nasıl/ne zaman" sorusuna yanıttır.`,
        },
      ],
      quiz: [
        {
          question: `"Ahmet bahçede topu tekmeledi." cümlesinde yüklem hangisidir?`,
          options: [`Ahmet`, `bahçede`, `topu`, `tekmeledi`],
          correctIndex: 3,
        },
        {
          question: `"Ahmet bahçede topu tekmeledi." cümlesinde özne hangisidir?`,
          options: [`Ahmet`, `bahçede`, `topu`, `tekmeledi`],
          correctIndex: 0,
        },
        {
          question: `"Kitabı masaya koydum." cümlesinde "masaya" sözcüğü hangi ögedir?`,
          options: [`Nesne`, `Özne`, `Dolaylı tümleç`, `Zarf tümleci`],
          correctIndex: 2,
        },
        {
          question: `"Dün akşam erkenden yattı." cümlesinde "dün akşam" hangi ögedir?`,
          options: [`Zarf tümleci`, `Nesne`, `Özne`, `Dolaylı tümleç`],
          correctIndex: 0,
        },
        {
          question: `Bir cümlenin ögeleri bulunurken ilk olarak ne yapılır?`,
          options: [
            `Özne bulunur`,
            `Yüklem bulunur`,
            `Nesne bulunur`,
            `Zarf tümleci bulunur`,
          ],
          correctIndex: 1,
        },
        {
          question: `"Öğretmen öğrencilere ödev verdi." cümlesinde "öğrencilere" hangi ögedir?`,
          options: [`Nesne`, `Dolaylı tümleç`, `Zarf tümleci`, `Özne`],
          correctIndex: 1,
        },
        {
          question: `"Onu çok sevdim." cümlesinde "onu" hangi ögedir?`,
          options: [`Özne`, `Belirtili nesne`, `Dolaylı tümleç`, `Zarf tümleci`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdakilerden hangisi cümlenin temel ögelerindendir?`,
          options: [`Nesne`, `Dolaylı tümleç`, `Yüklem`, `Zarf tümleci`],
          correctIndex: 2,
        },
      ],
    },
    {
      id: "fiilde-cati",
      name: `Fiilde Çatı`,
      summary: `Etken-edilgen, geçişli-geçişsiz fiiller.`,
      youtubeId: "",
      mindMap: {
        center: `Fiilde Çatı`,
        branches: [
          {
            label: `Özne-Yüklem İlişkisi (Etken-Edilgen)`,
            detail: `Etken: öznesi belli (gerçek özne). Edilgen: işi yapan belli değil, fiil "-l/-n" eki alır; sözde özne bulunur (Cam kırıldı).`,
          },
          {
            label: `Nesne-Yüklem İlişkisi (Geçişli-Geçişsiz)`,
            detail: `Geçişli: nesne alabilir ("neyi?" sorusuna yanıt verir). Geçişsiz: nesne almaz.`,
          },
          {
            label: `Önemli Not`,
            detail: `Çatı yalnızca fiil cümlelerinde aranır; yüklemi isim olan (isim) cümlelerinde çatı aranmaz.`,
          },
        ],
      },
      cards: [
        {
          front: `Etken ve edilgen fiil nedir?`,
          back: `Etken: öznesi belli. Edilgen: işi yapan belli değil, fiil -l/-n eki alır (yapıldı, kırıldı).`,
        },
        {
          front: `Geçişli ve geçişsiz fiil nedir?`,
          back: `Geçişli nesne alabilir ("neyi?"). Geçişsiz nesne almaz.`,
        },
        {
          front: `Çatı hangi cümlelerde aranır?`,
          back: `Yalnızca fiil cümlelerinde. İsim cümlelerinde çatı aranmaz.`,
        },
        {
          front: `Sözde özne nedir?`,
          back: `Edilgen cümlede, işi yapan belli olmadığından özne gibi görünen ögedir (Camlar silindi).`,
        },
      ],
      article: `## Fiilde Çatı Nedir?
Yüklemin özne ve nesneyle kurduğu ilişkiye çatı denir. Çatı yalnızca yüklemi çekimli fiil olan cümlelerde aranır; isim cümlelerinde çatı aranmaz.

## Özne-Yüklem İlişkisi (Etken-Edilgen)
Etken çatılı cümlede işi yapan (gerçek özne) bellidir: "Ali bahçeyi suladı." Edilgen çatılı cümlede ise işi yapan belli değildir; fiil "-l" veya "-n" eki alır ve cümlede sözde özne bulunur: "Bahçe sulandı."

## Nesne-Yüklem İlişkisi (Geçişli-Geçişsiz)
Geçişli fiiller nesne alabilir; yükleme "neyi?" sorusu sorulabilir: "Kitabı okudu." Geçişsiz fiiller nesne almaz: "Çocuk uyudu."`,
      tips: [
        {
          trap: `İsim cümlesinde çatı aranır sanılır.`,
          wrong: `"O çok çalışkandır." cümlesinin çatısı edilgendir.`,
          correct: `Bu bir isim cümlesidir; çatı yalnızca fiil cümlelerinde aranır.`,
        },
        {
          trap: `Edilgen cümlede gerçek özne olduğu sanılır.`,
          wrong: `"Cam kırıldı." cümlesinde "cam" gerçek öznedir.`,
          correct: `Edilgen cümlede işi yapan belli değildir; "cam" sözde öznedir.`,
        },
      ],
      quiz: [
        {
          question: `"Camlar temizlendi." cümlesinin çatısı nedir?`,
          options: [`Etken`, `Edilgen`, `Geçişli`, `Dönüşlü`],
          correctIndex: 1,
        },
        {
          question: `"Annem yemeği pişirdi." cümlesi nesne-yüklem ilişkisine göre nasıldır?`,
          options: [`Geçişli`, `Geçişsiz`, `Edilgen`, `Dönüşlü`],
          correctIndex: 0,
        },
        {
          question: `Aşağıdakilerden hangisi edilgen çatılı bir fiildir?`,
          options: [`yazdı`, `yazıldı`, `yazacak`, `yazar`],
          correctIndex: 1,
        },
        {
          question: `"Çocuk uyudu." cümlesi geçişlilik bakımından nasıldır?`,
          options: [`Geçişli`, `Geçişsiz`, `Edilgen`, `Ettirgen`],
          correctIndex: 1,
        },
        {
          question: `Fiilde çatı hangi tür cümlelerde aranır?`,
          options: [
            `İsim cümlelerinde`,
            `Fiil cümlelerinde`,
            `Soru cümlelerinde`,
            `Ünlem cümlelerinde`,
          ],
          correctIndex: 1,
        },
        {
          question: `"Kapı rüzgârdan açıldı." cümlesinin öznesi nasıldır?`,
          options: [`Gerçek özne`, `Sözde özne`, `Gizli özne`, `Ortak özne`],
          correctIndex: 1,
          explanation: `Edilgen cümlede işi yapan belli değildir; "kapı" sözde öznedir.`,
        },
        {
          question: `Aşağıdakilerden hangisi etken çatılı bir cümledir?`,
          options: [
            `Bahçe sulandı.`,
            `Çiçekler koparıldı.`,
            `Ali bahçeyi suladı.`,
            `Ders işlendi.`,
          ],
          correctIndex: 2,
        },
        {
          question: `Aşağıdaki fiillerden hangisi geçişlidir?`,
          options: [`gülmek`, `okumak`, `koşmak`, `uyumak`],
          correctIndex: 1,
          explanation: `"Okumak" nesne alır ("neyi okumak?"), bu yüzden geçişlidir.`,
        },
      ],
    },
    {
      id: "yazim-kurallari",
      name: `Yazım Kuralları`,
      summary: `Büyük harf, de/da, ki, mi ve özel ad ekleri.`,
      youtubeId: "",
      mindMap: {
        center: `Yazım Kuralları`,
        branches: [
          {
            label: `Büyük Harflerin Kullanımı`,
            detail: `Cümle başı, özel adlar ve başlıklardaki kelimeler büyük harfle başlar.`,
          },
          {
            label: `"de/da" Bağlacı ve Eki`,
            detail: `"Ve, da" anlamı veren bağlaç "de/da" AYRI yazılır. Bulunma durum eki "-de/-da" ise bitişik yazılır (evde).`,
          },
          {
            label: `"ki" Bağlacı ve Eki`,
            detail: `Bağlaç "ki" ayrı yazılır (Duydum ki...). İlgi/aitlik eki "-ki" bitişik yazılır (benimki, akşamki).`,
          },
          {
            label: `"mi" Soru Eki`,
            detail: `Soru eki "mi" her zaman AYRI yazılır; kendinden önceki eke ses uyumu sağlar (Geldin mi?).`,
          },
        ],
      },
      cards: [
        {
          front: `Bağlaç "de/da" nasıl yazılır?`,
          back: `Ayrı yazılır ("ve" anlamı verir): "Ben de geldim." Bulunma eki "-de" bitişiktir: "evde".`,
        },
        {
          front: `Soru eki "mi" nasıl yazılır?`,
          back: `Her zaman ayrı yazılır: "Geldin mi?"`,
        },
        {
          front: `Bağlaç "ki" ile ek "-ki" farkı?`,
          back: `Bağlaç "ki" ayrı (Duydum ki...); aitlik eki "-ki" bitişik (benimki).`,
        },
        {
          front: `Özel ada gelen yapım eki kesme ile ayrılır mı?`,
          back: `Hayır. Özel adlara gelen yapım ekleri ayrılmaz: "Türkçe", "Avrupalı".`,
        },
      ],
      article: `## "de/da" Bağlacı ve Eki
"Ve, dahi, da" anlamı veren bağlaç "de/da" ayrı yazılır: "Ben de geldim." Bulunma durumu eki "-de/-da" ise bitişik yazılır: "Kalemim çantamda." Bağlaç olan "de/da" cümleden çıkarıldığında cümle anlamlı kalır.

## "ki" Bağlacı ve Eki
Bağlaç olan "ki" ayrı yazılır: "Duydum ki taşınmışsınız." İlgi/aitlik eki olan "-ki" ise bitişik yazılır: "benimki", "akşamki".

## "mi" Soru Eki
Soru eki "mi" her zaman ayrı yazılır ve kendinden önceki sözcüğe ses uyumu sağlar: "Geldin mi?", "Okudun mu?"

## Özel Adlara Gelen Ekler
Özel adlara gelen çekim ekleri kesme işaretiyle ayrılır: "Ankara'da", "Ali'nin". Ancak yapım ekleri kesme işaretiyle ayrılmaz: "Türkçe", "Avrupalı", "İstanbullu".`,
      tips: [
        {
          trap: `Bağlaç "de/da" ile bulunma eki "-de" karıştırılır.`,
          wrong: `"Ben de geldim." cümlesinde "de" bitişik yazılır.`,
          correct: `"Ve" anlamındaki bağlaç "de/da" AYRI yazılır: "Ben de geldim."`,
        },
        {
          trap: `Soru eki "mi" bitişik yazılır sanılır.`,
          wrong: `"Geldin mi" sorusunda "mi" bitişik yazılır.`,
          correct: `Soru eki "mi" her zaman AYRI yazılır: "Geldin mi?"`,
        },
        {
          trap: `Özel ada gelen yapım eki kesme ile ayrılır sanılır.`,
          wrong: `"Türkçe" sözcüğü "Türk'çe" diye yazılır.`,
          correct: `Özel adlara gelen yapım ekleri kesme işaretiyle ayrılmaz: "Türkçe".`,
        },
      ],
      quiz: [
        {
          question: `Aşağıdaki cümlelerin hangisinde "de/da" yazımı yanlıştır?`,
          options: [
            `Sen de mi geldin?`,
            `Evde kimse yoktu.`,
            `Ali'de geldi.`,
            `Okulda ders vardı.`,
          ],
          correctIndex: 2,
          explanation: `Buradaki "de" bağlaçtır, ayrı yazılmalı: "Ali de geldi."`,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?`,
          options: [
            `Kitabı okudun mu?`,
            `Bugün hava çok güzel.`,
            `Türk'çe dersini çok sevdim.`,
            `Ankara'ya birlikte gittik.`,
          ],
          correctIndex: 2,
          explanation: `Yapım eki ayrılmaz: "Türkçe".`,
        },
        {
          question: `"ki" hangi cümlede bağlaç olduğu için ayrı yazılmalıdır?`,
          options: [
            `Benimki kayboldu.`,
            `Duydum ki gelmişsin.`,
            `Akşamki film güzeldi.`,
            `Onunki daha büyük.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Soru eki "mi" ile ilgili doğru kullanım hangisidir?`,
          options: [`Gelecekmisin?`, `Gelecek misin?`, `Gelecek mi sin?`, `Gele cekmisin?`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki sözcüklerden hangisi doğru yazılmıştır?`,
          options: [`yalnış`, `yanlız`, `yalnız`, `yannız`],
          correctIndex: 2,
        },
        {
          question: `Aşağıdakilerin hangisinde "-de" bulunma eki (bitişik) doğru kullanılmıştır?`,
          options: [`Ben de geldim.`, `Kalemim çantamda.`, `Sen de gel.`, `O da biliyor.`],
          correctIndex: 1,
          explanation: `"-da" bulunma ekidir, bitişik yazılır; diğerleri "ve" anlamlı bağlaçtır, ayrı.`,
        },
        {
          question: `Aşağıdakilerden hangisi doğru yazımdır?`,
          options: [`birşey`, `bir şey`, `birşey`, `bi şey`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde "ki" yazımı yanlıştır?`,
          options: [
            `Duydum ki taşınmışsınız.`,
            `Benim ki daha güzel.`,
            `Akşamki yemek güzeldi.`,
            `Öyle yoruldu ki uyuyakaldı.`,
          ],
          correctIndex: 1,
          explanation: `Aitlik eki bitişik yazılır: "Benimki".`,
        },
      ],
    },
    {
      id: "noktalama-isaretleri",
      name: `Noktalama İşaretleri`,
      summary: `Nokta, virgül, kesme işareti ve diğer işaretler.`,
      youtubeId: "",
      mindMap: {
        center: `Noktalama İşaretleri`,
        branches: [
          {
            label: `Nokta, Virgül, Noktalı Virgül`,
            detail: `Nokta cümle sonunda kullanılır. Virgül eş görevli ögeleri/sıralı cümleleri ayırır. Noktalı virgül (;) virgülle ayrılmış grupları birbirinden ayırır.`,
          },
          {
            label: `İki Nokta ve Üç Nokta`,
            detail: `İki nokta (:) açıklama, örnek veya alıntı öncesi kullanılır. Üç nokta (...) tamamlanmamış/sürdürülen ifadelerde kullanılır.`,
          },
          {
            label: `Soru, Ünlem, Tırnak`,
            detail: `Soru işareti (?) soru cümlesinde; ünlem (!) seslenme/heyecanda; tırnak ("") alıntı ve özel vurguda kullanılır.`,
          },
          {
            label: `Kesme İşareti (')`,
            detail: `Özel adlara gelen ÇEKİM eklerini ayırır (Ali'ye, İstanbul'da). Yapım eklerini ayırmaz (Türkçe, Antalyalı).`,
          },
        ],
      },
      cards: [
        {
          front: `Kesme işareti ne zaman kullanılır?`,
          back: `Özel adlara gelen çekim eklerini ayırmak için: "Ankara'da". Yapım eklerini ayırmaz: "Antalyalı".`,
        },
        {
          front: `Noktalı virgül (;) ne işe yarar?`,
          back: `Virgülle ayrılmış öbekleri/grupları birbirinden ayırır.`,
        },
        {
          front: `İki nokta (:) nerede kullanılır?`,
          back: `Açıklama, örnek veya alıntı yapılacağı zaman.`,
        },
        {
          front: `Üç nokta (...) ne için kullanılır?`,
          back: `Tamamlanmamış veya sürdürülen ifadeleri göstermek için.`,
        },
      ],
      article: `## Nokta, Virgül ve Noktalı Virgül
Nokta tamamlanmış cümlelerin sonunda kullanılır. Virgül, eş görevli sözcükleri ve sıralı cümleleri ayırır: "Ali, Veli ve Ayşe geldi." Noktalı virgül (;) ise virgülle ayrılmış öbekleri birbirinden ayırır.

## İki Nokta ve Üç Nokta
İki nokta (:) bir açıklama yapılacağı, örnek verileceği ya da alıntı aktarılacağı zaman kullanılır. Üç nokta (...) tamamlanmamış veya sürdürülen ifadeleri belirtir.

## Soru, Ünlem ve Tırnak
Soru işareti (?) soru bildiren cümlelerin sonuna konur. Ünlem (!) seslenme, heyecan ve şaşırma bildirir. Tırnak işareti ("") alıntıları ve özel olarak vurgulanan sözleri gösterir.

## Kesme İşareti
Kesme işareti, özel adlara gelen çekim eklerini ayırmak için kullanılır: "Atatürk'ün", "İstanbul'a". Ancak özel adlara gelen yapım ekleri kesme işaretiyle ayrılmaz: "Türkçe", "Antalyalı".`,
      tips: [
        {
          trap: `Kesme işaretinin yapım ekinden sonra konacağı sanılır.`,
          wrong: `"Türkiyeli" sözcüğü "Türkiye'li" diye yazılır.`,
          correct: `Yapım eki kesme ile ayrılmaz: "Türkiyeli". Çekim eki ayrılır: "Türkiye'de".`,
        },
        {
          trap: `Virgülle ayrılmış öbekleri ayırmak için yine virgül sanılır.`,
          wrong: `Virgülle ayrılmış grupları ayırmak için virgül kullanılır.`,
          correct: `Virgülle ayrılmış öbekler birbirinden noktalı virgül (;) ile ayrılır.`,
        },
      ],
      quiz: [
        {
          question: `Kesme işareti aşağıdakilerin hangisinde doğru kullanılmıştır?`,
          options: [
            `Ankara'da yaşıyorum.`,
            `Türk'çe öğreniyorum.`,
            `Kitap'ı okudum.`,
            `Eve gel'di.`,
          ],
          correctIndex: 0,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde kesme işareti yanlış kullanılmıştır?`,
          options: [
            `Atatürk'ün ilkeleri.`,
            `İstanbul'a gittik.`,
            `Ali'nin kalemi.`,
            `Gözlük'çü dükkânı açtı.`,
          ],
          correctIndex: 3,
          explanation: `Yapım eki "-çü" kesme ile ayrılmaz: "gözlükçü".`,
        },
        {
          question: `Açıklama yapılacağı veya örnek verileceği zaman kullanılan işaret hangisidir?`,
          options: [`Virgül`, `İki nokta (:)`, `Soru işareti`, `Tırnak`],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerden hangisinin sonuna soru işareti gelmelidir?`,
          options: [
            `Bugün hava çok güzel`,
            `Eve ne zaman geleceksin`,
            `Lütfen kapıyı kapat`,
            `Ne güzel bir gün`,
          ],
          correctIndex: 1,
        },
        {
          question: `Virgülün temel görevi aşağıdakilerden hangisidir?`,
          options: [
            `Cümleyi bitirmek`,
            `Eş görevli sözcükleri/ögeleri ayırmak`,
            `Soru sormak`,
            `Alıntı yapmak`,
          ],
          correctIndex: 1,
        },
        {
          question: `Tamamlanmamış veya sürdürülen ifadelerde kullanılan işaret hangisidir?`,
          options: [`Üç nokta (...)`, `Nokta`, `Virgül`, `İki nokta`],
          correctIndex: 0,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde noktalama doğru kullanılmıştır?`,
          options: [
            `Ali, Veli ve Ayşe geldi.`,
            `Ali Veli, ve Ayşe geldi.`,
            `Ali Veli ve, Ayşe geldi.`,
            `Ali, Veli, ve, Ayşe geldi.`,
          ],
          correctIndex: 0,
        },
        {
          question: `Özel ada gelen aşağıdaki eklerden hangisi kesme işaretiyle ayrılır?`,
          options: [
            `-li (Antalyalı)`,
            `-de (Antalya'da)`,
            `-ci (yapım eki)`,
            `-lik (yapım eki)`,
          ],
          correctIndex: 1,
        },
      ],
    },
    {
      id: "anlatim-bozukluklari",
      name: `Anlatım Bozuklukları`,
      summary: `Gereksiz sözcük, yanlış anlam, uyumsuzluk ve mantık hataları.`,
      youtubeId: "",
      mindMap: {
        center: `Anlatım Bozuklukları`,
        branches: [
          {
            label: `Gereksiz Sözcük Kullanımı`,
            detail: `Anlamı zaten bir başka sözcükte bulunan kelimenin gereksiz tekrarı. Örnek: "yaklaşık 10 civarında" (yaklaşık ve civarında aynı anlamda).`,
          },
          {
            label: `Sözcüğün Yanlış Anlamda Kullanımı`,
            detail: `Yakın anlamlı sözcüklerin yanlış yerde kullanımı. Örnek: "azımsamak" ile "küçümsemek" karışması.`,
          },
          {
            label: `Özne-Yüklem Uyumsuzluğu`,
            detail: `Tekil-çoğul veya olumlu-olumsuz uyum hataları. Örnek: "Öğrenciler ödevini yaptı" yerine "ödevlerini".`,
          },
          {
            label: `Mantık ve Sıralama Hataları`,
            detail: `Birbiriyle çelişen ya da yanlış sıralanmış ifadeler. Örnek: "Kesinlikle belki gelirim."`,
          },
        ],
      },
      cards: [
        {
          front: `Gereksiz sözcük kullanımı nedir?`,
          back: `Anlamı zaten var olan bir sözcüğün gereksiz tekrarıdır: "en sonunda nihayet".`,
        },
        {
          front: `Mantık (çelişki) hatası örneği?`,
          back: `"Kesinlikle belki gelirim." (kesinlik ve olasılık bir arada).`,
        },
        {
          front: `Özne-yüklem uyumsuzluğu örneği?`,
          back: `"Ne yazık ki sınavı kazandı." (olumsuz duygu + olumlu sonuç çelişkisi).`,
        },
        {
          front: `Anlatım bozukluğu nasıl giderilir?`,
          back: `Gereksiz/yanlış sözcük çıkarılır, uyum ve mantık sağlanır.`,
        },
      ],
      article: `## Gereksiz Sözcük Kullanımı
Bir cümlede anlamı zaten başka bir sözcükte bulunan kelimenin tekrar edilmesi anlatım bozukluğuna yol açar: "Sınıfa yaklaşık 30 civarında öğrenci geldi." Burada "yaklaşık" ve "civarında" aynı anlamı taşıdığı için biri gereksizdir.

## Sözcüğün Yanlış Anlamda Kullanımı
Yakın anlamlı sözcüklerin birbirinin yerine yanlış kullanılması bozukluğa neden olur (örnek: "azımsamak" ve "küçümsemek").

## Özne-Yüklem Uyumsuzluğu
Öznenin tekil-çoğul olması ya da olumlu-olumsuz anlam, yüklemle uyumlu olmalıdır. "Ne yazık ki sınavı kazandı." cümlesinde olumsuz duygu bildiren ifadeyle olumlu sonuç çelişir.

## Mantık ve Sıralama Hataları
Birbiriyle çelişen ifadeler kullanmak mantık hatasına yol açar: "Kesinlikle belki gelirim." Burada kesinlik ve olasılık bir arada kullanıldığı için cümle çelişkilidir.`,
      tips: [
        {
          trap: `Gereksiz sözcük fark edilmez.`,
          wrong: `"Yaklaşık 10 civarında kişi geldi." doğru bir cümledir.`,
          correct: `"Yaklaşık" ve "civarında" aynı anlamı verir; biri gereksizdir.`,
        },
        {
          trap: `Çelişen ifadeler gözden kaçar.`,
          wrong: `"Kesinlikle belki gelirim." doğru bir cümledir.`,
          correct: `"Kesinlikle" ve "belki" çelişir; cümlede mantık hatası vardır.`,
        },
      ],
      quiz: [
        {
          question: `Aşağıdaki cümlelerin hangisinde gereksiz sözcük kullanımından kaynaklı anlatım bozukluğu vardır?`,
          options: [
            `Yaklaşık on dakika bekledik.`,
            `Sınıfa yaklaşık 30 civarında öğrenci geldi.`,
            `Toplantı saat üçte başladı.`,
            `Kitabı dün okudum.`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde anlatım bozukluğu (çelişki) vardır?`,
          options: [
            `Bütün öğrenciler sınava girdi.`,
            `Hiçbir öğrenci derse geç kalmadı.`,
            `Sen ve ben sinemaya gittik.`,
            `Ne yazık ki sınavı kazandı.`,
          ],
          correctIndex: 3,
        },
        {
          question: `"Bu olay beni çok sevindirdi ve mutlu etti." cümlesindeki bozukluğun nedeni nedir?`,
          options: [
            `Özne eksikliği`,
            `Gereksiz sözcük (eş anlamlı tekrar)`,
            `Yüklem yanlışlığı`,
            `Noktalama hatası`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde özne-yüklem (iyelik) uyumsuzluğu vardır?`,
          options: [
            `Çocuklar parkta oynadılar.`,
            `Biz erkenden geldik.`,
            `Öğrenciler ödevini yaptı.`,
            `Sen çok çalıştın.`,
          ],
          correctIndex: 2,
          explanation: `Çoğul özneyle uyum için "ödevlerini yaptı" olmalıdır.`,
        },
        {
          question: `Aşağıdaki cümlelerin hangisi anlatım bakımından doğrudur?`,
          options: [
            `Yaklaşık 5 civarı insan vardı.`,
            `Onu gördüm ve elini sıktım.`,
            `Hiç kimseler gelmedi.`,
            `En sonunda nihayet bitti.`,
          ],
          correctIndex: 1,
        },
        {
          question: `"En sonunda nihayet eve vardık." cümlesindeki bozukluğun nedeni nedir?`,
          options: [
            `Yüklem eksikliği`,
            `Gereksiz sözcük kullanımı (eş anlamlı)`,
            `Özne eksikliği`,
            `Tamlama yanlışı`,
          ],
          correctIndex: 1,
        },
        {
          question: `Aşağıdaki cümlelerin hangisinde mantık (çelişki) hatası vardır?`,
          options: [
            `Kesinlikle belki gelirim.`,
            `Yarın mutlaka gelirim.`,
            `Belki yarın gelirim.`,
            `Yarın gelmeyeceğim.`,
          ],
          correctIndex: 0,
        },
        {
          question: `"Öğretmenimiz bize güzel açıklamalar açıkladı." cümlesindeki bozukluğun nedeni nedir?`,
          options: [
            `Özne-yüklem uyumsuzluğu`,
            `Aynı kökten sözcüklerin gereksiz kullanımı`,
            `Tamlama hatası`,
            `Noktalama hatası`,
          ],
          correctIndex: 1,
        },
      ],
    },
  ],
};
