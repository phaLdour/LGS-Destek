import type { SubjectContent } from "./types";

/**
 * T.C. İnkılap Tarihi ve Atatürkçülük (LGS 8. sınıf) üniteleri.
 * Videolar sonradan eklenecek; boş olanlar "yakında" görünür.
 * Tüm metin değerleri ' ve " içerdiği için backtick (`) ile yazılır.
 */
export const INKILAP: SubjectContent = {
  slug: "inkilap",
  name: "T.C. İnkılap Tarihi",
  topics: [
    {
      id: "bir-kahraman-doguyor",
      name: `Bir Kahraman Doğuyor`,
      summary: `Mustafa Kemal'in hayatı, eğitimi ve askerî başarıları.`,
      youtubeId: "",
      mindMap: {
        center: `Bir Kahraman Doğuyor`,
        branches: [
          {
            label: `Hayatı ve Eğitimi`,
            sections: [
              { kind: "kural", content: `1881'de Selanik'te doğdu. Babası Ali Rıza Efendi, annesi Zübeyde Hanım.` },
              { kind: "ornek", content: `Eğitim sırası: Mahalle Mektebi → Şemsi Efendi Mektebi → Selanik Askerî Rüştiyesi (matematik öğretmeni "Kemal" adını burada verdi) → Manastır Askerî İdadisi → İstanbul Harbiye → Harp Akademisi (1905).` },
            ],
          },
          {
            label: `Askerî Başarıları`,
            sections: [
              { kind: "ornek", content: `1911-12 Trablusgarp (Derne, Tobruk) → İtalyanlara karşı. 1915 Çanakkale (Anafartalar) → "Anafartalar Kahramanı". 1916 Doğu Cephesi'nde Bitlis-Muş'u geri alma.` },
              { kind: "ornek", content: `Ünlü Çanakkale emri: "Ben size taarruzu emretmiyorum, ölmeyi emrediyorum."` },
              { kind: "tuzak", content: `Çanakkale'de Mareşal DEĞİLDİ; "Mareşal" rütbesi ve "Gazi" unvanı Sakarya (1921) sonrası verildi.` },
            ],
          },
          {
            label: `Fikir Hayatını Etkileyen Şehirler`,
            sections: [
              { kind: "ornek", content: `Selanik → çok kültürlü yapı, batılı fikir akımları (Tanzimat, Meşrutiyet). Manastır → askerî disiplin, milliyetçilik (öğretmeni Ömer Naci'nin etkisi). İstanbul → siyasi gelişmeler, Jön Türkler, Meşrutiyet hareketi.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `Mustafa Kemal ne zaman ve nerede doğdu?`,
          back: `1881'de Selanik'te doğdu.`,
        },
        {
          front: `"Kemal" adını ona kim verdi?`,
          back: `Matematik öğretmeni verdi.`,
        },
        {
          front: `"Anafartalar Kahramanı" unvanını nerede kazandı?`,
          back: `Çanakkale Savaşı'nda (1915).`,
        },
        {
          front: `Trablusgarp Savaşı kime karşı yapıldı?`,
          back: `İtalyanlara karşı (Derne ve Tobruk'ta).`,
        },
      ],
      article: `# Hayatı ve Eğitimi
Mustafa Kemal **1881'de Selanik'te** doğdu. Matematikteki yeteneği nedeniyle öğretmeni ona **"Kemal"** adını verdi. Öğrenimini **İstanbul'daki Harp Akademisi'nde** tamamladı.
[tuzak] "Kemal" adını babası değil, **matematik öğretmeni** verdi.

# Askerî Başarıları
[kural] **Trablusgarp Savaşı** (Derne-Tobruk) → İtalyanlara karşı. **Çanakkale Savaşı (1915)** → "Anafartalar Kahramanı" unvanı.
[tuzak] Çanakkale'de henüz "Mareşal" değildi; **"Gazi" unvanı ve "Mareşal" rütbesi Sakarya Zaferi (1921) sonrası** verildi.
[soru] "Anafartalar Kahramanı unvanını hangi savaşta kazandı?" → Çanakkale.

# Fikir Hayatını Etkileyen Ortam
[örnek] **Selanik** (çok kültürlü yapı, fikir akımları), **Manastır** (askerî ortam, milliyetçilik) ve **İstanbul** (siyasi gelişmeler) Mustafa Kemal'i etkiledi.`,
      tips: [
        {
          trap: `Çanakkale'deki rütbesi/unvanı abartılır.`,
          wrong: `Mustafa Kemal Çanakkale Savaşı'nda "Mareşal"di.`,
          correct: `Çanakkale'de subaydı ve "Anafartalar Kahramanı" unvanını kazandı. "Mareşal" rütbesi Sakarya Zaferi'nden (1921) sonra verildi.`,
        },
        {
          trap: `"Kemal" adını kimin verdiği karıştırılır.`,
          wrong: `"Kemal" adını babası verdi.`,
          correct: `"Kemal" adını matematik öğretmeni verdi.`,
        },
      ],
      quiz: [
        {
          question: `Mustafa Kemal hangi yıl ve nerede doğmuştur?`,
          options: [`1881 - Selanik`, `1880 - İstanbul`, `1881 - Manastır`, `1923 - Ankara`],
          correctIndex: 0,
        },
        {
          question: `Mustafa Kemal'e "Kemal" adını kim vermiştir?`,
          options: [`Babası`, `Matematik öğretmeni`, `Annesi`, `Komutanı`],
          correctIndex: 1,
        },
        {
          question: `Mustafa Kemal "Anafartalar Kahramanı" unvanını hangi savaşta kazanmıştır?`,
          options: [`Trablusgarp`, `Çanakkale`, `Sakarya`, `Balkan`],
          correctIndex: 1,
        },
        {
          question: `Mustafa Kemal'in İtalyanlara karşı savaştığı cephe hangisidir?`,
          options: [`Trablusgarp`, `Kafkas`, `Filistin`, `Galiçya`],
          correctIndex: 0,
        },
        {
          question: `Mustafa Kemal'in çocukluğunun geçtiği, çok kültürlü şehir hangisidir?`,
          options: [`Selanik`, `Ankara`, `Erzurum`, `Konya`],
          correctIndex: 0,
        },
        {
          question: `Çanakkale Savaşı hangi yılda yaşanmıştır?`,
          options: [`1911`, `1915`, `1919`, `1923`],
          correctIndex: 1,
        },
        {
          question: `"Ben size taarruzu emretmiyorum, ölmeyi emrediyorum!" sözü hangi savaşta söylenmiştir?`,
          options: [`Çanakkale`, `Sakarya`, `İnönü`, `Dumlupınar`],
          correctIndex: 0,
        },
        {
          question: `Mustafa Kemal askerî öğrenimini (Harp Akademisi) nerede tamamlamıştır?`,
          options: [`Selanik`, `İstanbul`, `Manastır`, `Sofya`],
          correctIndex: 1,
        },
      ],
      quickQuestions: [
        { question: `Mustafa Kemal hangi yılda doğmuştur?`, options: [`1881`, `1880`, `1882`, `1885`], correctIndex: 0 },
        { question: `Mustafa Kemal nerede doğmuştur?`, options: [`Selanik`, `İstanbul`, `Manastır`, `Sofya`], correctIndex: 0 },
        { question: `Mustafa Kemal'in babasının adı nedir?`, options: [`Ali Rıza Efendi`, `Hüseyin Efendi`, `Abdullah Efendi`, `Mehmet Ali Bey`], correctIndex: 0 },
        { question: `Mustafa Kemal'in annesinin adı nedir?`, options: [`Zübeyde Hanım`, `Hatice Hanım`, `Makbule Hanım`, `Ayşe Hanım`], correctIndex: 0 },
        { question: `Mustafa Kemal'in eğitim aldığı askerî liseler hangisindedir?`, options: [`Manastır Askerî İdadisi`, `Selanik Hukuk Mektebi`, `İstanbul Tıbbiye Mektebi`, `Galatasaray Sultanisi`], correctIndex: 0 },
        { question: `Mustafa Kemal'e "Kemal" ismini hangi öğretmeni vermiştir?`, options: [`Matematik öğretmeni Mustafa Bey`, `Manastır'daki tarih öğretmeni`, `Selanik'teki Fransızca öğretmeni`, `Harbiye'deki edebiyat öğretmeni`], correctIndex: 0 },
        { question: `Mustafa Kemal askerî öğrenimini hangi şehirlerde sırasıyla tamamlamıştır?`, options: [`Selanik → Manastır → İstanbul`, `Manastır → Selanik → İstanbul`, `İstanbul → Selanik → Manastır`, `Selanik → İstanbul → Manastır`], correctIndex: 0 },
        { question: `Mustafa Kemal Harp Akademisini hangi yıl bitirmiştir?`, options: [`1905`, `1900`, `1910`, `1915`], correctIndex: 0 },
        { question: `Mustafa Kemal Harp Akademisi sonrası ilk görev yeri neresidir?`, options: [`Şam`, `İstanbul`, `Selanik`, `İzmir`], correctIndex: 0 },
        { question: `Mustafa Kemal Şam'da hangi cemiyeti kurmuştur?`, options: [`Vatan ve Hürriyet Cemiyeti`, `İttihat ve Terakki Cemiyeti`, `Müdafaa-i Hukuk Cemiyeti`, `Teşkilât-ı Mahsusa örgütü`], correctIndex: 0 },
        { question: `Mustafa Kemal'in katıldığı ilk savaş hangisidir?`, options: [`Trablusgarp Savaşı`, `Balkan Savaşı`, `Çanakkale`, `I. Dünya Savaşı`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı hangi ülkeye karşı yapılmıştır?`, options: [`İtalya`, `İngiltere`, `Fransa`, `Almanya`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı'nda Mustafa Kemal hangi şehirlerde başarı kazanmıştır?`, options: [`Tobruk ve Derne`, `Selanik ve Manastır`, `Şam ve Beyrut`, `İstanbul ve Edirne`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı sonunda imzalanan antlaşma hangisidir?`, options: [`Uşi Antlaşması`, `Atina Antlaşması`, `Londra Antlaşması`, `Bükreş Antlaşması`], correctIndex: 0 },
        { question: `Mustafa Kemal'i dünyaca tanıtan savaş hangisidir?`, options: [`Çanakkale Savaşı`, `Trablusgarp Savaşı`, `Sakarya Savaşı`, `Balkan Savaşları`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nda Mustafa Kemal'in söylediği meşhur emir nedir?`, options: [`"Ben size taarruzu emretmiyorum, ölmeyi emrediyorum."`, `"Hattı müdafaa yoktur, sathı müdafaa vardır."`, `"Ordular, ilk hedefiniz Akdeniz'dir, ileri!"`, `"Türk milleti çalışkandır, Türk milleti zekidir."`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nın yapıldığı tarih hangisidir?`, options: [`1915`, `1914`, `1916`, `1918`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nın dünya tarihindeki en önemli sonuçlarından biri nedir?`, options: [`Rusya'ya yardım ulaşamamış, Bolşevik İhtilali'ne zemin hazırlanmıştır`, `Osmanlı Devleti yenilerek Mondros Ateşkesi'ni imzalamak zorunda kalmıştır`, `Balkan Savaşları sona ermiş, Edirne geri alınmıştır`, `İtalya Trablusgarp'ı işgal etmiş, Uşi Antlaşması imzalanmıştır`], correctIndex: 0 },
        { question: `Mustafa Kemal Çanakkale'de hangi rütbededir?`, options: [`Yarbay`, `Teğmen`, `General`, `Mareşal`], correctIndex: 0, explanation: `Yarbay (sonradan Albay)` },
        { question: `Çanakkale'de Anafartalar Grup Komutanlığı ne zaman verilmiştir?`, options: [`1915`, `1910`, `1918`, `1923`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Bingazi-Derne mücadelesi hangi savaştır?`, options: [`Trablusgarp`, `Çanakkale`, `Balkan`, `I. Dünya`], correctIndex: 0 },
        { question: `Mustafa Kemal'in askerî yeteneğini gösteren bir özelliği hangisidir?`, options: [`İleri görüşlülük ve liderlik`, `Güçlü hitabet ve şiir sevgisi`, `Yabancı dil öğrenmedeki başarısı`, `Spora ve dansa olan ilgisi`], correctIndex: 0 },
        { question: `Mustafa Kemal'in okuduğu kitaplar hangi alanlardadır?`, options: [`Tarih, edebiyat, askerlik, felsefe`, `Yalnızca askerlik ve harp tarihi`, `Sadece dinî ilimler ve fıkıh`, `Tıp, eczacılık ve mühendislik`], correctIndex: 0 },
        { question: `Mustafa Kemal'in I. Dünya Savaşı'nda hizmet ettiği cepheler hangileridir?`, options: [`Çanakkale, Kafkas, Suriye-Filistin`, `Kanal, Irak ve Hicaz-Yemen cepheleri`, `Galiçya, Makedonya ve Romanya cepheleri`, `Irak, Kanal ve Makedonya cepheleri`], correctIndex: 0 },
        { question: `Mustafa Kemal Suriye-Filistin Cephesi'nde hangi orduyu komuta etmiştir?`, options: [`Yıldırım Orduları Grubu`, `16. Kolordu Komutanlığı`, `19. Tümen Komutanlığı`, `2. Ordu Komutanlığı`], correctIndex: 0 },
        { question: `Mondros Ateşkes Antlaşması hangi tarihte imzalanmıştır?`, options: [`30 Ekim 1918`, `30 Ekim 1919`, `30 Ekim 1920`, `30 Ekim 1923`], correctIndex: 0 },
        { question: `Mondros Antlaşması hangi devletle imzalanmıştır?`, options: [`İtilaf Devletleri`, `Sadece İngiltere`, `Sadece Almanya`, `Rusya`], correctIndex: 0, explanation: `İtilaf Devletleri (İngiltere, Fransa, İtalya)` },
        { question: `Mondros Antlaşmasının en tehlikeli maddesi hangisidir?`, options: [`7. madde`, `1. madde`, `2. madde`, `5. madde`], correctIndex: 0, explanation: `7. madde (İtilaf Devletleri istedikleri yeri işgal edebilecek)` },
        { question: `Mondros Antlaşmasından sonra Mustafa Kemal'in görevi nedir?`, options: [`9. Ordu Müfettişliği`, `Başkomutanlık`, `Genelkurmay başkanlığı`, `Padişahlık`], correctIndex: 0, explanation: `9. Ordu Müfettişliği (Samsun'a görevlendirildi)` },
        { question: `Mustafa Kemal Samsun'a hangi tarihte çıkmıştır?`, options: [`19 Mayıs 1919`, `19 Mayıs 1918`, `23 Nisan 1920`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a hangi gemiyle gelmiştir?`, options: [`Bandırma Vapuru`, `Tarık Bin Ziyad`, `Yavuz`, `Sultan Selim`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a çıktığında resmi görevi neydi?`, options: [`9. Ordu Müfettişi`, `Harbiye Nazır Vekili`, `Samsun Mutasarrıfı`, `İstanbul Muhafızı`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a çıkışını sonradan hangi olayın başlangıcı olarak değerlendirmiştir?`, options: [`Türk Kurtuluş Savaşı`, `Padişahlık`, `Siyasi parti kurma`, `Diplomatik geziler`], correctIndex: 0 },
        { question: `Samsun'a çıkmadan önce Mondros'tan kurtarılması istenen yerler nerelerdir?`, options: [`Milli sınırlar içindeki Türk toprakları`, `Yalnızca İstanbul ve Boğazlar bölgesi`, `Yalnızca Doğu Anadolu vilayetleri`, `Yalnızca Rumeli'deki Osmanlı toprakları`], correctIndex: 0 },
        { question: `Mustafa Kemal'in liderlik özelliklerinden hangisi öne çıkar?`, options: [`Cesaret, kararlılık, ileri görüşlülük`, `Yabancı devletlerin desteği ve şans`, `Sadece askerî rütbesinin yüksekliği`, `Ailesinin siyasi nüfuzu ve serveti`], correctIndex: 0 },
        { question: `Mustafa Kemal'in askerî başarıları nedeniyle aldığı ilk önemli unvan nedir?`, options: [`Anafartalar Kahramanı`, `Mareşal ve Gazi unvanı`, `Millî Mücadele Lideri`, `Başkomutanlık sıfatı`], correctIndex: 0 },
        { question: `Mustafa Kemal'in tarihteki ilk emri hangi savaşta verilmiştir?`, options: [`Çanakkale Savaşı`, `Balkan Savaşı`, `Trablusgarp`, `Sakarya`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Trablusgarp'a hangi yöntemle ulaştığı bilinir?`, options: [`Sivil kıyafetle Mısır üzerinden`, `Resmî üniformasıyla ve gemiyle`, `Bulgaristan üzerinden kara yoluyla`, `Padişahın özel izniyle doğrudan`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Selanik'te etkilendiği akımlar hangileridir?`, options: [`Milliyetçilik ve Aydınlanma fikirleri`, `Mutlakiyetçilik ve saltanat düşüncesi`, `Osmanlıcılık ve İslamcılık akımları`, `Sosyalizm ve sınıf mücadelesi`], correctIndex: 0 },
        { question: `Mustafa Kemal'in matematik öğretmenliği hangi okulda olmuştur?`, options: [`Hiç olmamıştır; öğrenciydi`, `Galatasaray Lisesi`, `Mektebi Sultani`, `İstanbul Üniversitesi`], correctIndex: 0 },
        { question: `Vatan ve Hürriyet Cemiyeti'nin amacı neydi?`, options: [`Meşrutiyet ve özgürlük mücadelesi vermek`, `Balkanlarda göçmenlere yardım toplamak`, `Osmanlı ordusunu Batı tarzında eğitmek`, `Ülkede ticaret ve tarımı geliştirmek`], correctIndex: 0 },
        { question: `Vatan ve Hürriyet Cemiyeti hangi cemiyetle birleşmiştir?`, options: [`İttihat ve Terakki Cemiyeti`, `Hilâl-i Ahmer Cemiyeti`, `Teşkilât-ı Mahsusa örgütü`, `Osmanlı Ahrar Fırkası`], correctIndex: 0 },
        { question: `İttihat ve Terakki'nin Mustafa Kemal'le ilişkisi nasıldı?`, options: [`Üye olmuş, sonra görüş ayrılığıyla uzaklaşmıştır`, `Cemiyete hiç katılmamış, hep karşısında olmuştur`, `Cemiyetin genel başkanlığını yürütmüştür`, `Ömrü boyunca cemiyetin etkin üyesi kalmıştır`], correctIndex: 0 },
        { question: `Mustafa Kemal'in eğitim sevdası en çok hangi alana yöneliktir?`, options: [`Bütün Türk milletinin eğitilmesi`, `Yalnızca subayların yetiştirilmesi`, `Sadece medrese eğitiminin gelişmesi`, `Yalnızca güzel sanatların öğretimi`], correctIndex: 0 },
        { question: `Mustafa Kemal'in büyük amacı hangisidir?`, options: [`Tam bağımsız ve modern bir Türk devleti kurmak`, `Saltanat ve hilafet düzenini güçlendirerek korumak`, `Osmanlı İmparatorluğu'nu yeniden büyütmek`, `Avrupa devletlerinin mandasına girmek`], correctIndex: 0 },
        { question: `Mustafa Kemal'in çocuk yaşta ailesini kaybetmesi onu nasıl etkilemiştir?`, options: [`Kendi kararlarını alıp güçlenmesini sağlamıştır`, `Onu eğitim hayatından tamamen uzaklaştırmıştır`, `Askerlik mesleğini seçmesini engellemiştir`, `Yaşamı boyunca hiçbir etkisi olmamıştır`], correctIndex: 0 },
        { question: `Mustafa Kemal'in okulda en başarılı olduğu ders hangisidir?`, options: [`Matematik`, `Kimya`, `Hüsn-i hat`, `Resim`], correctIndex: 0 },
        { question: `"Anafartalar Kahramanı" unvanı ne ifade eder?`, options: [`Çanakkale Savaşı'nda gösterdiği büyük başarı`, `Trablusgarp'ta İtalyanlara karşı verdiği direniş`, `Sakarya Meydan Muharebesi'ndeki zaferi`, `Suriye Cephesi'nde ordu komutanlığı`], correctIndex: 0 },
        { question: `Mustafa Kemal'in çocukken vatan sevgisi gelişiminde rol oynayan ortam hangisidir?`, options: [`Selanik'in çok uluslu ve gergin ortamı`, `Erzurum'un sınır boylarındaki askerî ortamı`, `İzmir'in ticaret hayatı ve liman kültürü`, `İstanbul'un saray ve devlet çevresi`], correctIndex: 0 },
        { question: `Mustafa Kemal Milli Mücadele'yi başlatmadan önce hangi şehirde önemli toplantı yapmıştır?`, options: [`Amasya`, `Sivas`, `Erzurum`, `Ankara`], correctIndex: 0 },
      ],
    },
    {
      id: "milli-uyanis",
      name: `Millî Uyanış: Bağımsızlık Yolunda`,
      summary: `Mondros, işgaller, genelgeler, kongreler ve TBMM'nin açılışı.`,
      youtubeId: "",
      mindMap: {
        center: `Millî Uyanış`,
        branches: [
          {
            label: `Mondros ve İşgaller`,
            sections: [
              { kind: "kural", content: `30 Ekim 1918 Mondros Ateşkesi imzalandı. 15 Mayıs 1919 İzmir'in işgali tepkileri büyüttü.` },
              { kind: "ornek", content: `İşgal edilen yerler: İngilizler Musul, Antep, Maraş, Urfa, İstanbul; Fransızlar Adana, Hatay; İtalyanlar Antalya, Konya; Yunanlar İzmir, Batı Anadolu.` },
              { kind: "tuzak", content: `Mondros bir BARIŞ antlaşması değil, ATEŞKEStir; ana sorunu 7. madde (gerekirse stratejik yerlerin işgali).` },
            ],
          },
          {
            label: `Cemiyetler ve Kuvâ-yı Millîye`,
            sections: [
              { kind: "tanim", content: `Yararlı (Müdafaa-i Hukuk) ve zararlı cemiyetler kuruldu. Bölgesel silahlı direniş Kuvâ-yı Millîye ile başladı.` },
              { kind: "ornek", content: `Yararlı cemiyetler: Doğu Anadolu Müdafaa-i Hukuk, Trakya-Paşaeli Müdafaa-i Hukuk, İzmir Müdafaa-i Hukuk, Kilikyalılar Cemiyeti.` },
              { kind: "ornek", content: `Zararlı cemiyetler: Sevr Rumları, Pontus, Taşnak, Mavri Mira (azınlık); Sulh ve Selâmet, Hürriyet ve İtilaf, Teali İslam (millî mücadeleye karşı).` },
            ],
          },
          {
            label: `Genelgeler ve Kongreler`,
            sections: [
              { kind: "kural", content: `Sıralama: Samsun'a çıkış (19 Mayıs 1919) → Amasya Genelgesi (22 Haziran 1919) → Erzurum Kongresi (23 Temmuz) → Sivas Kongresi (4 Eylül 1919).` },
              { kind: "ornek", content: `Amasya Genelgesi → "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır" (amaç ilk kez). Erzurum Kongresi → bölgesel; "Manda ve himaye kabul olunamaz" (ilk kez söylendi). Sivas Kongresi → millî nitelik; manda KESİN reddedildi, cemiyetler birleştirildi.` },
              { kind: "tuzak", content: `Manda-himayenin KESİN reddi Sivas'tadır; ilk söylenmesi Erzurum'da olmuştur (karıştırılır).` },
            ],
          },
          {
            label: `Misak-ı Millî ve TBMM`,
            sections: [
              { kind: "kural", content: `28 Ocak 1920 Misak-ı Millî kabul edildi (son Osmanlı Mebusan Meclisi). 16 Mart 1920 İstanbul işgal edildi → meclis dağıldı. 23 Nisan 1920 Ankara'da TBMM açıldı.` },
              { kind: "ornek", content: `Misak-ı Millî kararları: 30 Ekim 1918 sınırları, manda-himaye reddi, azınlık haklarında eşitlik, kapitülasyonların kaldırılması, Boğazlar güvenliği.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `Mondros Ateşkesi ne zaman imzalandı?`,
          back: `30 Ekim 1918.`,
        },
        {
          front: `Mustafa Kemal Samsun'a ne zaman çıktı?`,
          back: `19 Mayıs 1919.`,
        },
        {
          front: `Manda ve himaye kesin olarak nerede reddedildi?`,
          back: `Sivas Kongresi'nde (4 Eylül 1919).`,
        },
        {
          front: `TBMM ne zaman açıldı?`,
          back: `23 Nisan 1920.`,
        },
      ],
      article: `# Mondros ve İşgaller
[kural] **30 Ekim 1918** Mondros Ateşkes Antlaşması imzalandı → yurdun birçok yeri işgal edildi. **15 Mayıs 1919** İzmir'in Yunanlılarca işgali tepkileri iyice artırdı.

# Cemiyetler ve Kuvâ-yı Millîye
İşgallere karşı **yararlı cemiyetler** (Müdafaa-i Hukuk) kuruldu; bazı zararlı cemiyetler de ortaya çıktı. Düzenli ordu kuruluncaya kadar mücadeleyi **Kuvâ-yı Millîye** (silahlı halk güçleri) yürüttü.

# Genelgeler ve Kongreler
[kural] **Samsun'a çıkış (19 Mayıs 1919)** → **Amasya Genelgesi (22 Haziran 1919)** → **Erzurum Kongresi (23 Temmuz)** → **Sivas Kongresi (4 Eylül 1919)**.
[örnek] Amasya Genelgesi: "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır."
[tuzak] Kurtuluş Savaşı'nın amacı **ilk kez Amasya'da** belirtildi; manda-himaye **kesin olarak Sivas'ta** reddedildi (Erzurum'da değil).

# Misak-ı Millî ve TBMM
[kural] **28 Ocak 1920** son Osmanlı Mebusan Meclisi Misak-ı Millî'yi kabul etti. İstanbul'un işgali üzerine **23 Nisan 1920**'de Ankara'da TBMM açıldı.
[soru] "Ulusal sınırları belirleyen karar?" → Misak-ı Millî.`,
      tips: [
        {
          trap: `Kurtuluş Savaşı'nın amacının ilk kez nerede belirtildiği karıştırılır.`,
          wrong: `Savaşın gerekçe, amaç ve yöntemi ilk kez Erzurum Kongresi'nde açıklandı.`,
          correct: `İlk kez Amasya Genelgesi'nde (22 Haziran 1919) belirtildi: "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır."`,
        },
        {
          trap: `Manda ve himayenin reddedildiği yer karıştırılır.`,
          wrong: `Manda ve himaye kesin olarak Erzurum Kongresi'nde reddedildi.`,
          correct: `Manda ve himaye kesin olarak Sivas Kongresi'nde (4 Eylül 1919) reddedildi.`,
        },
      ],
      quiz: [
        {
          question: `Mondros Ateşkes Antlaşması hangi tarihte imzalanmıştır?`,
          options: [`30 Ekim 1918`, `19 Mayıs 1919`, `23 Nisan 1920`, `24 Temmuz 1923`],
          correctIndex: 0,
        },
        {
          question: `Mustafa Kemal Samsun'a hangi tarihte çıkmıştır?`,
          options: [`19 Mayıs 1919`, `23 Nisan 1920`, `29 Ekim 1923`, `30 Ağustos 1922`],
          correctIndex: 0,
        },
        {
          question: `"Milletin istiklalini yine milletin azim ve kararı kurtaracaktır." sözü hangi belgede yer alır?`,
          options: [`Amasya Genelgesi`, `Erzurum Kongresi`, `Misak-ı Millî`, `Lozan Antlaşması`],
          correctIndex: 0,
        },
        {
          question: `Manda ve himaye fikri kesin olarak hangi kongrede reddedilmiştir?`,
          options: [`Erzurum`, `Sivas`, `Balıkesir`, `Alaşehir`],
          correctIndex: 1,
        },
        {
          question: `TBMM hangi tarihte açılmıştır?`,
          options: [`23 Nisan 1920`, `29 Ekim 1923`, `19 Mayıs 1919`, `1 Kasım 1922`],
          correctIndex: 0,
        },
        {
          question: `İzmir'in Yunanlılar tarafından işgali hangi tarihte gerçekleşmiştir?`,
          options: [`15 Mayıs 1919`, `30 Ekim 1918`, `23 Temmuz 1919`, `28 Ocak 1920`],
          correctIndex: 0,
        },
        {
          question: `Ulusal sınırların belirlendiği, son Osmanlı Mebusan Meclisi'nde kabul edilen kararlar hangisidir?`,
          options: [`Misak-ı Millî`, `Amasya Genelgesi`, `Sevr`, `Mudanya`],
          correctIndex: 0,
        },
        {
          question: `Yalnızca Doğu illerini ilgilendiren, bölgesel nitelikli kongre hangisidir?`,
          options: [`Erzurum Kongresi`, `Sivas Kongresi`, `Amasya Görüşmeleri`, `Balıkesir Kongresi`],
          correctIndex: 0,
        },
      ],
      quickQuestions: [
        { question: `Mustafa Kemal Samsun'a ne zaman çıkmıştır?`, options: [`19 Mayıs 1919`, `19 Mayıs 1918`, `19 Mayıs 1920`, `19 Mayıs 1923`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a hangi gemiyle gelmiştir?`, options: [`Bandırma Vapuru`, `Hamidiye`, `Tarık Bin Ziyad`, `Sultan Selim`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a hangi resmi sıfatla gelmiştir?`, options: [`9. Ordu Müfettişi`, `Erkân-ı Harbiye Reisi`, `Harbiye Nazır Vekili`, `Samsun Mutasarrıfı`], correctIndex: 0 },
        { question: `Havza Genelgesi hangi tarihte yayımlanmıştır?`, options: [`28 Mayıs 1919`, `19 Mayıs 1919`, `22 Haziran 1919`, `21 Ekim 1919`], correctIndex: 0 },
        { question: `Havza Genelgesinin amacı nedir?`, options: [`İşgallere karşı mitingler düzenlenmesini istemek`, `Düzenli bir ordunun kısa sürede kurulmasını istemek`, `Yeni vergiler koyarak orduyu finanse etmek`, `Temsil Heyeti'ni seçerek göreve başlatmak`], correctIndex: 0 },
        { question: `Amasya Genelgesi hangi tarihte yayımlanmıştır?`, options: [`22 Haziran 1919`, `19 Mayıs 1919`, `4 Eylül 1919`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Amasya Genelgesinin en önemli maddesi nedir?`, options: [`"Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir."`, `"Millî sınırlar içinde vatan bir bütündür, bölünemez."`, `"Manda ve himaye kesinlikle kabul edilemez."`, `"Hâkimiyet kayıtsız şartsız milletindir."`], correctIndex: 0 },
        { question: `Amasya Genelgesinde "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır" ifadesi neyi belirtir?`, options: [`Milli egemenlik fikrinin doğuşunu`, `Padişah egemenliğinin güçlendiğini`, `Dış devletlerden yardım beklendiğini`, `Ordunun siyasete hâkim olduğunu`], correctIndex: 0 },
        { question: `Amasya Genelgesinde hangi kongrenin toplanacağı bildirilmiştir?`, options: [`Sivas Kongresi`, `Lozan Kongresi`, `Erzurum Kongresi`, `İzmir Kongresi`], correctIndex: 0 },
        { question: `Mustafa Kemal askerlikten ne zaman istifa etmiştir?`, options: [`8-9 Temmuz 1919 Erzurum'da`, `19 Mayıs 1919 Samsun'da`, `4 Eylül 1919 Sivas'ta`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Erzurum Kongresi hangi tarihte toplanmıştır?`, options: [`23 Temmuz - 7 Ağustos 1919`, `22 Haziran - 8 Temmuz 1919`, `4 Eylül - 11 Eylül 1919`, `12 Ocak - 28 Ocak 1920`], correctIndex: 0 },
        { question: `Erzurum Kongresinin özelliği nedir?`, options: [`Bölgesel toplanmış fakat ulusal kararlar almıştır`, `İstanbul Hükümeti'nce toplanan resmî bir kongredir`, `Bölgesel toplanmış, bölgesel kararlar almıştır`, `Ulusal toplanmış, bölgesel kararlar almıştır`], correctIndex: 0 },
        { question: `"Manda ve himaye kabul olunamaz" kararı ilk olarak nerede alınmıştır?`, options: [`Erzurum Kongresi`, `Sivas Kongresi`, `Amasya Genelgesi`, `Misak-ı Milli`], correctIndex: 0 },
        { question: `Sivas Kongresi hangi tarihte toplanmıştır?`, options: [`4 - 11 Eylül 1919`, `23 Temmuz - 7 Ağustos 1919`, `22 Haziran 1919`, `19 Mayıs 1919`], correctIndex: 0 },
        { question: `Sivas Kongresinin özelliği nedir?`, options: [`Ulusal nitelikli ilk kongre`, `Bölgesel`, `İstanbul hükümeti tarafından düzenlenmiştir`, `İtilaf Devletleri tarafından`], correctIndex: 0 },
        { question: `Sivas Kongresinde tüm cemiyetler hangi adla birleştirilmiştir?`, options: [`Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti`, `Şark Vilayetleri Müdafaa-i Hukuk Cemiyeti`, `İzmir Müdafaa-i Hukuk-ı Osmaniye Cemiyeti`, `Trakya Paşaeli Müdafaa-i Hukuk Cemiyeti`], correctIndex: 0 },
        { question: `Sivas Kongresinden sonra çıkan gazete hangisidir?`, options: [`İrade-i Milliye`, `Hâkimiyet-i Milliye`, `Tasvir-i Efkâr`, `Tanin`], correctIndex: 0 },
        { question: `Amasya Görüşmeleri kimler arasında yapılmıştır?`, options: [`Temsil Heyeti ile İstanbul Hükümeti temsilcileri`, `Kuvâ-yı Milliye ile Osmanlı Mebusan Meclisi üyeleri`, `TBMM ile İtilaf Devletleri temsilcileri`, `Padişah Vahdettin ile Yunan delegeleri`], correctIndex: 0 },
        { question: `Amasya Görüşmelerinde İstanbul hükümeti hangisini kabul etmiştir?`, options: [`Temsil Heyeti'ni resmen tanımıştır`, `Mondros Ateşkesi'ni reddetmiştir`, `Sevr Antlaşması'nı onaylamıştır`, `Lozan'a gitmeyi kabul etmiştir`], correctIndex: 0 },
        { question: `Son Osmanlı Mebusan Meclisi ne zaman açılmıştır?`, options: [`12 Ocak 1920`, `4 Eylül 1919`, `23 Nisan 1920`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Misak-ı Milli kararları hangi mecliste alınmıştır?`, options: [`Son Osmanlı Mebusan Meclisi`, `Türkiye Büyük Millet Meclisi`, `Sivas Kongresi delegeleri`, `Erzurum Kongresi heyeti`], correctIndex: 0, explanation: `Son Osmanlı Mebusan Meclisi (28 Ocak 1920)` },
        { question: `Misak-ı Milli kaç maddedir?`, options: [`6 madde`, `5 madde`, `7 madde`, `10 madde`], correctIndex: 0 },
        { question: `Misak-ı Milli'nin en önemli amacı nedir?`, options: [`Vatanın bütünlüğünü ve tam bağımsızlığı belirlemek`, `Saltanat ve halifelik makamlarının korunmasını sağlamak`, `Yeni vergilerle devlet gelirlerini artırmak`, `Ülkeye yabancı sermaye ve yatırım çekmek`], correctIndex: 0 },
        { question: `İstanbul'un resmi olarak işgali ne zamandır?`, options: [`16 Mart 1920`, `13 Kasım 1918`, `28 Ekim 1918`, `30 Ekim 1918`], correctIndex: 0 },
        { question: `İstanbul'un işgalinden sonra Meclis-i Mebusan ne oldu?`, options: [`Kapatıldı, bazı üyeleri Malta'ya sürüldü`, `Padişah tarafından yeniden seçime götürüldü`, `Ankara'ya taşınarak toplanmaya devam etti`, `Açık kaldı ve çalışmalarını sürdürdü`], correctIndex: 0 },
        { question: `TBMM ne zaman açılmıştır?`, options: [`23 Nisan 1920`, `23 Nisan 1919`, `19 Mayıs 1919`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `TBMM'nin açılış yeri neresidir?`, options: [`Ankara`, `İstanbul`, `Sivas`, `Erzurum`], correctIndex: 0 },
        { question: `TBMM'nin ilk başkanı kimdir?`, options: [`Mustafa Kemal Paşa`, `Kâzım Karabekir Paşa`, `İsmet Paşa (İnönü)`, `Fevzi Çakmak Paşa`], correctIndex: 0 },
        { question: `TBMM'nin özelliklerinden biri nedir?`, options: [`Güçler birliği ilkesini benimsedi`, `Saltanat makamına bağlı olarak çalıştı`, `Güçler ayrılığı ilkesini benimsedi`, `Yasama yetkisini padişaha bıraktı`], correctIndex: 0, explanation: `Güçler birliği (kuvvetler birliği) ilkesini benimsedi` },
        { question: `TBMM'ye karşı çıkan ayaklanmalar genelde kimler tarafından başlatılmıştır?`, options: [`İstanbul Hükümeti'ne bağlı ve dış destekli gruplar`, `Yalnızca düzenli ordu birliklerindeki bazı subaylar`, `Kuvâ-yı Milliye komutanlarının tamamı`, `Bütün Anadolu halkının ortak hareketi`], correctIndex: 0 },
        { question: `Sevr Antlaşması hangi tarihte imzalanmıştır?`, options: [`10 Ağustos 1920`, `30 Ekim 1918`, `24 Temmuz 1923`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Sevr Antlaşmasını TBMM tanıdı mı?`, options: [`Hayır`, `Evet`, `Sadece bir maddesini`, `Sadece bir kısmını`], correctIndex: 0 },
        { question: `Sevr Antlaşmasına göre İstanbul ne olacaktı?`, options: [`Boğazlar uluslararası bir komisyonca yönetilecek`, `Hiçbir şarta bağlı olmadan Osmanlı'da kalacaktı`, `Boğazlarla birlikte Yunanistan'a verilecekti`, `Bağımsız bir devlet hâline getirilecekti`], correctIndex: 0 },
        { question: `Kuvâ-yı Milliye nedir?`, options: [`Düzenli ordu kurulana kadar bölgesel direniş örgütleri`, `İstanbul Hükümeti'ne bağlı olarak kurulan ordu birlikleri`, `İtilaf Devletleri'nin kurduğu asayiş birlikleri`, `Yunan ordusuna bağlı gönüllü müfrezeler`], correctIndex: 0 },
        { question: `Kuvâ-yı Milliye'nin yerini hangi ordu almıştır?`, options: [`Düzenli Türk Ordusu`, `Yeniçeri Ocağı`, `Osmanlı Hassa Ordusu`, `İttihatçı ordu`], correctIndex: 0, explanation: `Düzenli Türk Ordusu (TBMM ordusu)` },
        { question: `Hıyanet-i Vataniye Kanunu hangi amaçla çıkarılmıştır?`, options: [`TBMM'ye karşı çıkan ayaklanmaları bastırmak için`, `Savaş giderleri için yeni vergiler toplamak için`, `Cumhuriyet yönetimine geçişi hazırlamak için`, `Düzenli ordunun kurulmasını sağlamak için`], correctIndex: 0 },
        { question: `İstiklal Mahkemeleri hangi amaçla kurulmuştur?`, options: [`Asayişi sağlamak, isyancıları yargılamak`, `Anayasa hazırlamak ve yasaları denetlemek`, `Ekonomiyi düzenleyip vergileri toplamak`, `Eğitim işlerini yürütmek ve okul açmak`], correctIndex: 0 },
        { question: `1921 Anayasası (Teşkilat-ı Esasiye) en önemli maddesi nedir?`, options: [`"Egemenlik kayıtsız şartsız milletindir"`, `"Yasama yetkisi Heyet-i Vükela'nındır"`, `"Saltanat hakkı padişaha aittir"`, `"Halifelik makamı kaldırılmıştır"`], correctIndex: 0 },
        { question: `1921 Anayasası hangi tarihte kabul edilmiştir?`, options: [`20 Ocak 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `3 Mart 1924`], correctIndex: 0 },
        { question: `Milli mücadeleyi destekleyen ilk gazete hangisidir?`, options: [`İrade-i Milliye`, `Hâkimiyet-i Milliye`, `Tasvir`, `Tanin`], correctIndex: 0 },
        { question: `Ankara'da yayımlanan ulusal mücadele gazetesi hangisidir?`, options: [`Hâkimiyet-i Milliye`, `Tercüman-ı Hakikat`, `Ceride-i Resmiye`, `İrade-i Milliye`], correctIndex: 0 },
        { question: `İlk düzenli ordumuzun komutanı kimdir?`, options: [`İsmet Paşa`, `Mustafa Kemal Paşa`, `Fevzi Çakmak`, `Kazım Karabekir`], correctIndex: 0 },
        { question: `Erzurum Kongresinde Temsil Heyeti hangi göreve sahipti?`, options: [`Doğu Anadolu'yu temsil etmek`, `Yalnızca Erzurum ilini temsil etmek`, `İstanbul Hükümeti'ni temsil etmek`, `Bütün vatanı temsil etmek`], correctIndex: 0 },
        { question: `Sivas Kongresinden sonra Temsil Heyetinin görev alanı nasıl genişlemiştir?`, options: [`Bütün vatanın temsilcisi olmuştur`, `Yalnızca Doğu Anadolu'yu temsil etmiştir`, `Görev alanı Sivas iliyle sınırlanmıştır`, `Yetkileri tamamen kaldırılmıştır`], correctIndex: 0 },
        { question: `Düzce ve Hendek ayaklanmaları kime karşıdır?`, options: [`TBMM ve Mustafa Kemal'e karşı`, `İtilaf Devletlerine karşı`, `Yunanlara karşı`, `Rusya'ya karşı`], correctIndex: 0 },
        { question: `Pontus Rum çetelerine karşı verilen mücadelenin amacı nedir?`, options: [`Karadeniz'de Rum devleti kurulmasını engellemek`, `Doğu Anadolu'da Ermeni ilerleyişini geri püskürtmek`, `Güney Cephesi'nde Fransız işgalini bitirmek`, `Ege'de Yunan işgalini geri püskürtmek`], correctIndex: 0 },
        { question: `1921 Anayasasında yargı yetkisi kime aittir?`, options: [`TBMM'ye`, `Padişaha`, `Sadrazama`, `Halifeye`], correctIndex: 0, explanation: `TBMM'ye (güçler birliği)` },
        { question: `TBMM'nin açılış konuşmasını kim yapmıştır?`, options: [`Mustafa Kemal Paşa`, `Sadrazam Damat Ferit`, `Halife Abdülmecid`, `Padişah Vahdettin`], correctIndex: 0 },
        { question: `Misak-ı Milli'de "Halkın çoğunluğunun hür iradesiyle" tanınan sınır kavramı nedir?`, options: [`Türk vatanının sınırları`, `Padişahın toprakları`, `İslam topraklarının tamamı`, `Bütün Asya`], correctIndex: 0 },
        { question: `Milli mücadelenin amacı tek cümleyle nedir?`, options: [`Tam bağımsızlığı ve milli egemenliği sağlamak`, `Saltanatı ve halifeliği güçlendirerek korumak`, `Amerikan mandasını kabul ederek yönetilmek`, `Balkanlar'da yeni bir imparatorluk kurmak`], correctIndex: 0 },
      ],
    },
    {
      id: "milli-bir-destan",
      name: `Millî Bir Destan: Ya İstiklal Ya Ölüm!`,
      summary: `Düzenli ordu, cepheler, savaşlar ve Lozan'a giden yol.`,
      youtubeId: "",
      mindMap: {
        center: `Millî Bir Destan`,
        branches: [
          {
            label: `Düzenli Orduya Geçiş`,
            sections: [
              { kind: "tanim", content: `Kuvâ-yı Millîye düşmanı durdurmakta yetersiz kalınca düzenli ordu kuruldu.` },
              { kind: "tuzak", content: `Kuvâ-yı Millîye'nin tek dağılma sebebi yetersizlik değil; merkezî otorite kuramaması ve düzensiz davranışları da etkilidir.` },
            ],
          },
          {
            label: `Cepheler`,
            sections: [
              { kind: "kural", content: `Doğu → Ermenistan, Güney → Fransa, Batı → Yunanistan.` },
              { kind: "ornek", content: `Doğu Cephesi → Kâzım Karabekir komutasında; Gümrü Antlaşması (3 Aralık 1920) ile ilk siyasi başarı. Güney Cephesi → Antep "Gazi", Maraş "Kahraman", Urfa "Şanlı" unvanları aldı. Batı Cephesi → İsmet (İnönü) Paşa komutasında.` },
            ],
          },
          {
            label: `Batı Cephesi Zaferleri`,
            sections: [
              { kind: "kural", content: `Sıralama: I. İnönü (Ocak 1921) → II. İnönü (Mart-Nisan 1921) → Eskişehir-Kütahya (Temmuz 1921, GERİLEME) → Sakarya (Ağustos-Eylül 1921) → Büyük Taarruz/Başkomutanlık (26-30 Ağustos 1922).` },
              { kind: "ornek", content: `Anayasanın kabulü → I. İnönü sonrası (20 Ocak 1921). Londra Konferansı, İstiklal Marşı (12 Mart 1921), Moskova Antlaşması → I. İnönü siyasi sonuçları. Sakarya sözü: "Hattı müdafaa yoktur, sathı müdafaa vardır."` },
              { kind: "tuzak", content: `"Gazi/Mareşal" unvanı Sakarya (1921) sonrası verildi (Büyük Taarruz değil). 30 Ağustos = Başkomutanlık Meydan Muharebesi (I. İnönü değil).` },
            ],
          },
          {
            label: `Antlaşmalar`,
            sections: [
              { kind: "kural", content: `Mudanya Ateşkesi (11 Ekim 1922) silahları susturdu. Lozan Barış Antlaşması (24 Temmuz 1923) bağımsızlığı dünyaya kabul ettirdi.` },
              { kind: "ornek", content: `Lozan'da çözülenler: sınırlar (büyük ölçüde Misak-ı Millî), azınlık hakları, savaş tazminatı (yok), kapitülasyonların kaldırılması, dış borçlar (Düyun-u Umumiye). Çözülemeyenler: Musul, Boğazlar, Hatay (sonra çözüldü).` },
              { kind: "tuzak", content: `Mudanya'da Boğazlar ve Trakya askersiz tahliye edildi; barış antlaşması DEĞİL ateşkestir.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `30 Ağustos hangi zaferin günüdür?`,
          back: `Başkomutanlık Meydan Muharebesi (Büyük Taarruz, 1922) - Zafer Bayramı.`,
        },
        {
          front: `Mustafa Kemal'e "Gazi" ve "Mareşal" unvanı ne zaman verildi?`,
          back: `Sakarya Meydan Muharebesi'nden (1921) sonra.`,
        },
        {
          front: `Kurtuluş Savaşı'nı bitiren barış antlaşması?`,
          back: `Lozan Barış Antlaşması (24 Temmuz 1923).`,
        },
        {
          front: `"Hattı müdafaa yoktur, sathı müdafaa vardır." hangi savaşta söylendi?`,
          back: `Sakarya Meydan Muharebesi.`,
        },
      ],
      article: `# Düzenli Orduya Geçiş
Kuvâ-yı Millîye düşmanı durdurmakta yetersiz kalınca **düzenli ordu** kuruldu ve mücadele bu ordu ile sürdürüldü.

# Cepheler
[kural] **Doğu** → Ermenistan, **Güney** (Maraş, Antep, Urfa) → Fransa, **Batı** → Yunanistan.

# Batı Cephesi Zaferleri
[kural] I. İnönü ve II. İnönü (1921) → **Sakarya (1921)** → **Büyük Taarruz / Başkomutanlık (26-30 Ağustos 1922)**.
[örnek] Sakarya'da Mustafa Kemal: "Hattı müdafaa yoktur, sathı müdafaa vardır."
[tuzak] **"Gazi" unvanı ve "Mareşal" rütbesi Sakarya (1921) sonrası** verildi (Büyük Taarruz değil). **30 Ağustos** = Başkomutanlık (Büyük Taarruz), I. İnönü değil.

# Antlaşmalar
[kural] **Mudanya Ateşkesi (11 Ekim 1922)** silahları susturdu; **Lozan Barış Antlaşması (24 Temmuz 1923)** ile bağımsızlık dünyaca tanındı.`,
      tips: [
        {
          trap: `"Gazi" ve "Mareşal" unvanının verildiği zaman karıştırılır.`,
          wrong: `Mustafa Kemal'e "Gazi" ve "Mareşal" unvanı Büyük Taarruz'dan sonra verildi.`,
          correct: `Bu unvanlar Sakarya Meydan Muharebesi'nden (1921) sonra verildi.`,
        },
        {
          trap: `30 Ağustos'un hangi savaş olduğu karıştırılır.`,
          wrong: `30 Ağustos Zafer Bayramı, I. İnönü'nün kazanıldığı gündür.`,
          correct: `30 Ağustos, Başkomutanlık Meydan Muharebesi'nin (Büyük Taarruz, 1922) kazanıldığı gündür.`,
        },
      ],
      quiz: [
        {
          question: `30 Ağustos Zafer Bayramı hangi muharebenin kazanıldığı gündür?`,
          options: [`Sakarya`, `Başkomutanlık (Dumlupınar)`, `I. İnönü`, `II. İnönü`],
          correctIndex: 1,
        },
        {
          question: `Mustafa Kemal'e "Mareşal" rütbesi ve "Gazi" unvanı hangi savaştan sonra verilmiştir?`,
          options: [`Çanakkale`, `Sakarya`, `I. İnönü`, `Büyük Taarruz`],
          correctIndex: 1,
        },
        {
          question: `"Hattı müdafaa yoktur, sathı müdafaa vardır." sözü hangi savaşta söylenmiştir?`,
          options: [`Sakarya`, `Çanakkale`, `Dumlupınar`, `İnönü`],
          correctIndex: 0,
        },
        {
          question: `Kurtuluş Savaşı'nı sona erdiren barış antlaşması hangisidir?`,
          options: [`Mudanya`, `Lozan`, `Sevr`, `Mondros`],
          correctIndex: 1,
        },
        {
          question: `Lozan Barış Antlaşması hangi tarihte imzalanmıştır?`,
          options: [`24 Temmuz 1923`, `29 Ekim 1923`, `11 Ekim 1922`, `23 Nisan 1920`],
          correctIndex: 0,
        },
        {
          question: `Doğu Cephesi'nde hangi devletle savaşılmıştır?`,
          options: [`Ermenistan`, `Yunanistan`, `İngiltere`, `İtalya`],
          correctIndex: 0,
        },
        {
          question: `Güney Cephesi'nde (Maraş, Antep, Urfa) hangi devletle mücadele edilmiştir?`,
          options: [`Fransa`, `Yunanistan`, `Rusya`, `İtalya`],
          correctIndex: 0,
        },
        {
          question: `Büyük Taarruz hangi yılda yapılmıştır?`,
          options: [`1920`, `1921`, `1922`, `1923`],
          correctIndex: 2,
        },
      ],
      quickQuestions: [
        { question: `I. İnönü Savaşı hangi tarihte yapılmıştır?`, options: [`6-10 Ocak 1921`, `23 Nisan 1920`, `26 Ağustos 1922`, `30 Ağustos 1922`], correctIndex: 0 },
        { question: `I. İnönü Savaşı'nın komutanı kimdir?`, options: [`İsmet Paşa`, `Mustafa Kemal Paşa`, `Fevzi Çakmak`, `Kazım Karabekir`], correctIndex: 0 },
        { question: `I. İnönü Savaşı kime karşı yapılmıştır?`, options: [`Yunanistan`, `İngiltere`, `Fransa`, `İtalya`], correctIndex: 0 },
        { question: `I. İnönü Savaşı sonucunda hangi anayasa yapılmıştır?`, options: [`1921 Anayasası`, `1924 Anayasası`, `1961 Anayasası`, `1982 Anayasası`], correctIndex: 0, explanation: `1921 Anayasası (Teşkilat-ı Esasiye)` },
        { question: `I. İnönü Zaferi'nin dış politikadaki önemli sonucu nedir?`, options: [`Londra Konferansına davet edilmemiz`, `Lozan Barış Antlaşması'nın imzalanması`, `Mudanya Ateşkesi'nin imzalanması`, `Sevr Antlaşması'nın imzalanması`], correctIndex: 0 },
        { question: `Moskova Antlaşması hangi devletle imzalanmıştır?`, options: [`Sovyet Rusya`, `Yunanistan`, `Almanya`, `İtalya`], correctIndex: 0 },
        { question: `Moskova Antlaşması hangi tarihte imzalanmıştır?`, options: [`16 Mart 1921`, `10 Ağustos 1920`, `24 Temmuz 1923`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `İstiklal Marşı ne zaman kabul edilmiştir?`, options: [`12 Mart 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `10 Kasım 1938`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın sözleri kime aittir?`, options: [`Mehmet Akif Ersoy`, `Mehmet Emin Yurdakul`, `Yahya Kemal Beyatlı`, `Ziya Gökalp`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın bestesi kime aittir?`, options: [`Osman Zeki Üngör`, `Cemal Reşit Rey`, `Adnan Saygun`, `Sezai Karakoç`], correctIndex: 0 },
        { question: `II. İnönü Savaşı hangi tarihte yapılmıştır?`, options: [`23 Mart - 1 Nisan 1921`, `6 Ocak 1921`, `23 Ağustos - 13 Eylül 1921`, `26 Ağustos 1922`], correctIndex: 0 },
        { question: `II. İnönü Zaferi sonrası "Siz orada yalnız düşmanı değil, milletin makus talihini de yendiniz." sözünü kim söylemiştir?`, options: [`Mustafa Kemal`, `Padişah`, `İsmet Paşa`, `Fevzi Çakmak`], correctIndex: 0, explanation: `Mustafa Kemal (İsmet Paşa'ya)` },
        { question: `Eskişehir-Kütahya Savaşları'ndan sonra ordu nereye çekilmiştir?`, options: [`Sakarya nehrinin doğusuna`, `Konya ovasının güneyine`, `Kızılırmak'ın doğusuna`, `Eskişehir'in batısına`], correctIndex: 0 },
        { question: `Tekalif-i Milliye Emirleri hangi savaş öncesi yayımlanmıştır?`, options: [`Sakarya Meydan Muharebesi öncesi`, `Kütahya-Eskişehir Savaşları öncesi`, `Büyük Taarruz'un başlaması öncesi`, `Birinci İnönü Savaşı öncesi`], correctIndex: 0 },
        { question: `Tekalif-i Milliye Emirlerinin amacı nedir?`, options: [`Orduyu donatmak için milletten yardım toplamak`, `Ordunun bir bölümünün terhis edilmesini sağlamak`, `Halktan düzenli vergi alınmasını sağlamak`, `Yabancı devletlerden borç para istemek`], correctIndex: 0 },
        { question: `Mustafa Kemal'e Başkomutanlık yetkisi ne zaman verilmiştir?`, options: [`5 Ağustos 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `30 Ağustos 1922`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi hangi tarihte yapılmıştır?`, options: [`23 Ağustos - 13 Eylül 1921`, `6-10 Ocak 1921`, `26 Ağustos - 9 Eylül 1922`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi sonunda Mustafa Kemal'e hangi unvan verilmiştir?`, options: [`Mareşallik ve Gazi unvanı`, `Anafartalar Kahramanı unvanı`, `Halifelik ve saltanat makamı`, `Başkomutanlık yetkisi`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi sırasında Mustafa Kemal'in meşhur sözü nedir?`, options: [`"Hattı müdafaa yoktur, sathı müdafaa vardır."`, `"Ordular, ilk hedefiniz Akdeniz'dir, ileri!"`, `"Egemenlik kayıtsız şartsız milletindir."`, `"Yurtta sulh, cihanda sulh."`], correctIndex: 0 },
        { question: `Kars Antlaşması hangi devletlerle imzalanmıştır?`, options: [`Sovyet Kafkas Cumhuriyetleri`, `Yunanistan ile İtilaf Devletleri`, `İngiltere ve Fransa Hükümetleri`, `Almanya ve Avusturya-Macaristan`], correctIndex: 0, explanation: `Sovyet etkisindeki Kafkas Cumhuriyetleri (Azerbaycan, Ermenistan, Gürcistan)` },
        { question: `Ankara Antlaşması hangi devletle imzalanmıştır?`, options: [`Fransa`, `İngiltere`, `İtalya`, `Yunanistan`], correctIndex: 0, explanation: `Fransa (20 Ekim 1921)` },
        { question: `Ankara Antlaşması'nın önemi nedir?`, options: [`Güney Cephesi kapanmış, güney sınırımız çizilmiştir`, `Doğu Cephesi kapanmış, Ermenistan sınırı çizilmiştir`, `Batı Cephesi'ndeki Yunan işgali sona ermiştir`, `Boğazlar üzerindeki denetim TBMM'ye geçmiştir`], correctIndex: 0 },
        { question: `Büyük Taarruz hangi tarihte başlamıştır?`, options: [`26 Ağustos 1922`, `30 Ağustos 1922`, `9 Eylül 1922`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Başkomutanlık Meydan Muharebesi hangi tarihte kazanılmıştır?`, options: [`30 Ağustos 1922`, `26 Ağustos 1922`, `9 Eylül 1922`, `13 Eylül 1921`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Büyük Taarruz öncesi söylediği meşhur emir nedir?`, options: [`"Ordular ilk hedefiniz Akdeniz'dir, ileri!"`, `"Hattı müdafaa yoktur, sathı müdafaa vardır."`, `"Hâkimiyet kayıtsız şartsız milletindir."`, `"Yurtta sulh, cihanda sulh olmalıdır."`], correctIndex: 0 },
        { question: `İzmir'in işgalden kurtuluş tarihi hangisidir?`, options: [`9 Eylül 1922`, `30 Ağustos 1922`, `26 Ağustos 1922`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mudanya Ateşkesi hangi tarihte imzalanmıştır?`, options: [`11 Ekim 1922`, `24 Temmuz 1923`, `30 Ekim 1918`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mudanya Ateşkesinin önemi nedir?`, options: [`Doğu Trakya savaşsız geri alınmıştır`, `Cumhuriyet resmen ilan edilmiştir`, `Saltanat makamı tamamen kaldırılmıştır`, `Lozan Antlaşması imzalanmıştır`], correctIndex: 0 },
        { question: `Saltanat hangi tarihte kaldırılmıştır?`, options: [`1 Kasım 1922`, `3 Mart 1924`, `29 Ekim 1923`, `9 Kasım 1922`], correctIndex: 0 },
        { question: `Saltanatın kaldırılmasının nedeni nedir?`, options: [`Lozan'a iki heyet çağrılmasını engellemek`, `Halifelik makamını daha da güçlendirmek`, `Yeni vergi düzenlemeleri yapabilmek`, `Eğitimde birliği hemen sağlamak`], correctIndex: 0, explanation: `Lozan'a iki heyet (İstanbul + Ankara) çağrılmasını engellemek` },
        { question: `Lozan Konferansı hangi tarihte başlamıştır?`, options: [`20 Kasım 1922`, `24 Temmuz 1923`, `29 Ekim 1923`, `11 Ekim 1922`], correctIndex: 0 },
        { question: `Lozan Barış Antlaşması hangi tarihte imzalanmıştır?`, options: [`24 Temmuz 1923`, `20 Kasım 1922`, `29 Ekim 1923`, `30 Ağustos 1922`], correctIndex: 0 },
        { question: `Lozan'da Türk heyetinin başkanı kimdir?`, options: [`İsmet İnönü`, `Mustafa Kemal`, `Fevzi Çakmak`, `Rauf Orbay`], correctIndex: 0 },
        { question: `Lozan Antlaşması'nda çözüme bağlanamayıp sonraya bırakılan konu hangisidir?`, options: [`Boğazlar, Hatay ve dış borçlar`, `Kapitülasyonlar ve azınlık hakları`, `Suriye sınırı ve Kıbrıs'ın durumu`, `Ege adalarının statüsü ve kara sınırı`], correctIndex: 0 },
        { question: `I. Dünya Savaşı sonrası imzalanan Sevr'le Lozan farkı nedir?`, options: [`Lozan bağımsızlığı tanımış, Sevr ağır şartlar içeriyordu`, `Sevr, Türkiye'ye Lozan'dan daha elverişli şartlar sunmuştur`, `İkisi de aynı hükümleri içeren antlaşmalardır`, `Lozan'da Türkiye yenilgiyi kabul etmiştir`], correctIndex: 0 },
        { question: `I. İnönü Zaferi'nin dış politikadaki önemli sonucu hangisidir?`, options: [`Londra Konferansı'na çağrılmamız`, `Cumhuriyet yönetiminin ilan edilmesi`, `Saltanat makamının kaldırılması`, `Sevr Antlaşması'nın imzalanması`], correctIndex: 0, explanation: `Londra Konferansı'na çağrılmamız (TBMM tanınmaya başlandı)` },
        { question: `Sakarya Zaferi sonrası dış politikadaki sonucu hangisidir?`, options: [`Kars ve Ankara Antlaşmaları`, `Cumhuriyet ilanı`, `Saltanatın kaldırılması`, `Mudanya Ateşkesi`], correctIndex: 0 },
        { question: `Doğu Cephesi'nde Ermenilere karşı kim mücadele etmiştir?`, options: [`Kâzım Karabekir Paşa`, `İsmet Paşa`, `Mustafa Kemal Paşa`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `Gümrü Antlaşması hangi devletle imzalanmıştır?`, options: [`Ermenistan`, `Yunanistan`, `Sovyet Rusya`, `İngiltere`], correctIndex: 0 },
        { question: `Gümrü Antlaşması'nın TBMM açısından önemi nedir?`, options: [`İlk siyasi ve askeri başarısıdır`, `Saltanatın kaldırılışının gerekçesidir`, `Cumhuriyet'in ilanının başlangıcıdır`, `Lozan görüşmelerinin başlangıcıdır`], correctIndex: 0, explanation: `İlk siyasi ve askeri başarısıdır (Doğu Cephesi kapandı)` },
        { question: `Güney Cephesi'nde Fransızlara karşı direnişi kimler yürütmüştür?`, options: [`Kuvâ-yı Milliye birlikleri ve yöre halkı`, `Kâzım Karabekir ve Doğu ordusu`, `Ali Fuat Cebesoy ve Batı Cephesi`, `Rauf Orbay ve Karadeniz halkı`], correctIndex: 0, explanation: `Kara Fatma ve yerli kuvvetler (Kuvâ-yı Milliye)` },
        { question: `Maraş, Antep, Urfa savunmalarına TBMM ne ad vermiştir?`, options: [`Şanlı, Kahraman ve Gazi unvanlarını vermiştir`, `Bu illeri özel yönetim bölgesi ilan etmiştir`, `Bu illere savaş tazminatı ödemesi yapmıştır`, `Bu illeri geçici olarak il dışında bırakmıştır`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın güftesi yarışması hangi yıllarda yapılmıştır?`, options: [`1920-1921`, `1918-1919`, `1922-1923`, `1923-1924`], correctIndex: 0, explanation: `1920-1921 (TBMM 12 Mart 1921'de kabul etti)` },
        { question: `Tekalif-i Milliye Emirleri toplam kaç maddedir?`, options: [`10`, `5`, `15`, `20`], correctIndex: 0 },
        { question: `Mudanya Ateşkesinin imzalanmasında etkili devletler kimlerdir?`, options: [`Türkiye, İngiltere, Fransa, İtalya ve Yunanistan`, `Türkiye, Almanya, Avusturya, Bulgaristan ve Rusya`, `Türkiye, ABD, Sovyet Rusya, Japonya ve Yunanistan`, `Türkiye, İngiltere, Almanya, Rusya ve Bulgaristan`], correctIndex: 0 },
        { question: `Sakarya Savaşı'nın stratejik önemi nedir?`, options: [`Türk ordusunun savunmadan taarruza geçtiği dönüm noktası`, `Batı Cephesi'nde düzenli ordunun ilk kez kurulduğu andır`, `Yunan ordusunun İzmir'e çıkışını başlatan olaydır`, `Mondros Ateşkesi'nin imzalanmasını sağlayan zaferdir`], correctIndex: 0 },
        { question: `Türk milletinin "Milli Mücadele Ruhu" nasıl ifade edilir?`, options: [`Birlik, fedakârlık, vatan sevgisi ve kararlılık`, `Bireysel çıkar, rekabet ve kişisel kazanç arayışı`, `Yabancı devletlerin desteğine duyulan güvendir`, `Yalnızca askerî sınıfın gösterdiği bir dayanışma`], correctIndex: 0 },
        { question: `Düzenli ordunun kurulması neden zorunlu olmuştur?`, options: [`Kuvâ-yı Milliye dağınık ve disiplinsiz kalmaya başlamıştı`, `İtilaf Devletleri düzenli ordu kurulmasını istemişti`, `Osmanlı ordusu Mondros'a rağmen görevini sürdürüyordu`, `TBMM'nin bütçesi Kuvâ-yı Milliye'ye yetmeye başlamıştı`], correctIndex: 0 },
        { question: `Lozan'ın 24 Temmuz 1923'te imzalanması Türkiye için ne anlama gelir?`, options: [`Tam bağımsız yeni Türkiye'nin uluslararası tapusudur`, `Sevr'in bazı maddelerinin yeniden yürürlüğe girmesidir`, `Mondros Ateşkesi'nin şartlarının hafifletilmesidir`, `Osmanlı borçlarının tamamının silinmesi anlamına gelir`], correctIndex: 0 },
        { question: `Misak-ı Milli'nin Lozan'da kazanılmasını sağlayan zafer hangisidir?`, options: [`Büyük Taarruz ve Başkomutanlık Meydan Muharebesi`, `Birinci ve İkinci İnönü Muharebeleri Zaferleri`, `Çanakkale Kara ve Deniz Muharebeleri Zaferi`, `Sakarya Meydan Muharebesi ve Kars Antlaşması`], correctIndex: 0 },
      ],
    },
    {
      id: "ataturkculuk-ve-cagdaslasan-turkiye",
      name: `Atatürkçülük ve Çağdaşlaşan Türkiye`,
      summary: `İnkılaplar ve Atatürk ilkeleri.`,
      youtubeId: "",
      mindMap: {
        center: `Çağdaşlaşan Türkiye`,
        branches: [
          {
            label: `Siyasi İnkılaplar`,
            sections: [
              { kind: "kural", content: `Saltanatın kaldırılması (1 Kasım 1922) → Cumhuriyet'in ilanı (29 Ekim 1923) → Halifeliğin kaldırılması (3 Mart 1924).` },
              { kind: "ornek", content: `1 Kasım 1922 → saltanat ve hilafet ayrıldı, saltanat kaldırıldı (son padişah Vahdettin yurt dışına gitti). 29 Ekim 1923 → "Yaşasın Cumhuriyet"; Mustafa Kemal ilk cumhurbaşkanı. 3 Mart 1924 → halifelik kaldırıldı, Şer'iye ve Evkaf Vekâleti, Tevhid-i Tedrisat aynı gün.` },
              { kind: "tuzak", content: `Cumhuriyet 29 Ekim 1923; halifelik AYNI gün değil, 3 Mart 1924'te kaldırıldı.` },
            ],
          },
          {
            label: `Hukuk ve Eğitim`,
            sections: [
              { kind: "kural", content: `Tevhid-i Tedrisat (3 Mart 1924), Türk Medeni Kanunu (1926), Harf İnkılabı (1 Kasım 1928), Üniversite reformu (1933).` },
              { kind: "ornek", content: `Tevhid-i Tedrisat → bütün okullar Millî Eğitim Bakanlığı'na bağlandı, medreseler kapatıldı. Medeni Kanun → İsviçre'den alındı; kadına miras/şahitlik/boşanma eşitliği, tek eşlilik, resmî nikâh. Harf İnkılabı → Arap alfabesi yerine Latin tabanlı Türk alfabesi (29 harf).` },
            ],
          },
          {
            label: `Toplumsal İnkılaplar`,
            sections: [
              { kind: "kural", content: `Şapka Kanunu (1925), Tekke-Zaviye kapatılması (1925), takvim-saat-ölçü (1925-1931), Soyadı Kanunu (1934), kadınlara siyasi haklar (1930 belediye, 1934 milletvekili).` },
              { kind: "ornek", content: `Şapka (25 Kasım 1925) → fes yerine. Takvim → Hicri yerine Miladi (1925). Saat → alaturka yerine uluslararası 24 saat. Ölçü/ağırlık → metre/kilo (1931). Soyadı (1934) → "Atatürk" soyadı TBMM kararıyla M. Kemal'e verildi.` },
              { kind: "tuzak", content: `Kadınlara milletvekili seçme-seçilme hakkı 1926 Medeni Kanun'la DEĞİL, 1934'te verildi.` },
            ],
          },
          {
            label: `Atatürk İlkeleri`,
            sections: [
              { kind: "kural", content: `Altı ilke: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık.` },
              { kind: "ornek", content: `Cumhuriyetçilik → Cumhuriyet'in ilanı, TBMM. Milliyetçilik → Türk Tarih Kurumu, Türk Dil Kurumu. Halkçılık → hukuk önünde eşitlik, kadına seçme-seçilme hakkı. Devletçilik → Sümerbank, Etibank, demiryolları, fabrikalar. Laiklik → halifeliğin kaldırılması, Tevhid-i Tedrisat, Medeni Kanun. İnkılapçılık → Harf İnkılabı, takvim/ölçü değişiklikleri.` },
              { kind: "tuzak", content: `İlkeler arasında "demokrasi", "krallık", "sosyalizm" gibi seçenekler çeldiricidir; ilkeler bu altısıdır.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `Cumhuriyet ne zaman ilan edildi?`,
          back: `29 Ekim 1923.`,
        },
        {
          front: `Halifelik ne zaman kaldırıldı?`,
          back: `3 Mart 1924.`,
        },
        {
          front: `Atatürk'ün 6 ilkesi nedir?`,
          back: `Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık.`,
        },
        {
          front: `Harf İnkılabı hangi yıl yapıldı?`,
          back: `1928 (yeni Türk alfabesi).`,
        },
      ],
      article: `# Siyasi İnkılaplar
[kural] **Saltanatın kaldırılması (1 Kasım 1922)** → **Cumhuriyet'in ilanı (29 Ekim 1923)** → **Halifeliğin kaldırılması (3 Mart 1924)**.
[tuzak] Cumhuriyet 29 Ekim 1923'te ilan edildi; halifelik **aynı gün değil, 3 Mart 1924'te** kaldırıldı.

# Hukuk ve Eğitim Alanındaki İnkılaplar
[kural] **Tevhid-i Tedrisat / Öğretim Birliği (1924)**, **Türk Medeni Kanunu (1926)**, **Harf İnkılabı (1928)**.

# Toplumsal İnkılaplar
[kural] **Şapka Kanunu (1925)**, **Soyadı Kanunu (1934)**; kadınlara belediye (1930), milletvekili **seçme-seçilme hakkı (1934)**.
[tuzak] Kadınlara milletvekili hakkı 1926 Medeni Kanun'la değil, **1934'te** verildi.

# Atatürk İlkeleri
[kural] Altı ilke: **Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık**.
[soru] "Aşağıdakilerden hangisi Atatürk ilkesi değildir?" → bu altısı dışındaki seçenek.`,
      tips: [
        {
          trap: `Cumhuriyet'in ilanı ile halifeliğin kaldırılması aynı tarih sanılır.`,
          wrong: `Halifelik, Cumhuriyet'in ilan edildiği gün (29 Ekim 1923) kaldırıldı.`,
          correct: `Cumhuriyet 29 Ekim 1923'te ilan edildi; halifelik ise 3 Mart 1924'te kaldırıldı.`,
        },
        {
          trap: `Medeni Kanun ile kadınların siyasi hakları karıştırılır.`,
          wrong: `Kadınlara milletvekili seçme-seçilme hakkı 1926 Medeni Kanun ile verildi.`,
          correct: `Medeni Kanun 1926'da kabul edildi; kadınlara milletvekili seçme-seçilme hakkı 1934'te verildi.`,
        },
        {
          trap: `Kabotaj Kanunu (1926) çoğu zaman "devletçilik" ya da "bağımsızlık" ile eşleştirilir.`,
          wrong: `Kabotaj Kanunu devletçilik ilkesinin kanıtıdır; devlet denizcilik şirketi kurmuştur.`,
          correct: `Kabotaj Kanunu **milliyetçilik** ilkesiyle ilgilidir: Türk karasularında yük ve yolcu taşıma hakkı yalnızca Türk gemilerine verilmiştir; ekonomik bağımsızlık değil, milli egemenliğin denizlerdeki yansımasıdır.`,
        },
        {
          trap: `Aşar (öşür) vergisinin kaldırılması (1925) sıkça "devletçilik" ile eşleştirilir.`,
          wrong: `Aşar vergisinin kaldırılması devletçilik ilkesinin sonucudur.`,
          correct: `Aşar vergisinin kaldırılması **halkçılık** ilkesiyle ilgilidir: ürünün onda birini alan bu ağır vergi köylüyü ezerken kaldırılmasıyla halk arasında eşit ve adil bir vergi düzenine geçilmiştir.`,
        },
      ],
      quiz: [
        {
          question: `Cumhuriyet hangi tarihte ilan edilmiştir?`,
          options: [`29 Ekim 1923`, `23 Nisan 1920`, `1 Kasım 1922`, `3 Mart 1924`],
          correctIndex: 0,
        },
        {
          question: `Saltanat hangi tarihte kaldırılmıştır?`,
          options: [`1 Kasım 1922`, `29 Ekim 1923`, `3 Mart 1924`, `1928`],
          correctIndex: 0,
        },
        {
          question: `Eğitim kurumlarını tek çatı altında toplayan kanun hangisidir?`,
          options: [`Tevhid-i Tedrisat (Öğretim Birliği)`, `Soyadı Kanunu`, `Şapka Kanunu`, `Medeni Kanun`],
          correctIndex: 0,
        },
        {
          question: `Harf İnkılabı (yeni Türk alfabesi) hangi yıl yapılmıştır?`,
          options: [`1924`, `1926`, `1928`, `1934`],
          correctIndex: 2,
        },
        {
          question: `Türk Medeni Kanunu hangi yıl kabul edilmiştir?`,
          options: [`1926`, `1923`, `1928`, `1930`],
          correctIndex: 0,
        },
        {
          question: `Aşağıdakilerden hangisi Atatürk ilkelerinden biri DEĞİLDİR?`,
          options: [`Laiklik`, `Halkçılık`, `Krallık`, `Devletçilik`],
          correctIndex: 2,
        },
        {
          question: `Kadınlara milletvekili seçme ve seçilme hakkı hangi yıl verilmiştir?`,
          options: [`1930`, `1934`, `1926`, `1923`],
          correctIndex: 1,
        },
        {
          question: `Halifelik hangi tarihte kaldırılmıştır?`,
          options: [`3 Mart 1924`, `29 Ekim 1923`, `1 Kasım 1922`, `1928`],
          correctIndex: 0,
        },
      ],
      quickQuestions: [
        { question: `Atatürk'ün 6 ilkesi hangileridir?`, options: [`Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık`, `Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, Barışçılık`, `Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, Akılcılık`, `Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, Çağdaşlaşma`], correctIndex: 0 },
        { question: `Cumhuriyetçilik ilkesi neyi ifade eder?`, options: [`Egemenliğin millete ait olduğu yönetim biçimi`, `Egemenliğin hanedana ait olduğu yönetim biçimi`, `Egemenliğin din adamlarına ait olduğu yönetim`, `Egemenliğin tek bir kişiye ait olduğu yönetim`], correctIndex: 0 },
        { question: `Cumhuriyet hangi tarihte ilan edilmiştir?`, options: [`29 Ekim 1923`, `23 Nisan 1920`, `3 Mart 1924`, `9 Eylül 1922`], correctIndex: 0 },
        { question: `Cumhuriyetin ilk Cumhurbaşkanı kimdir?`, options: [`Mustafa Kemal Atatürk`, `Mustafa İsmet İnönü`, `Mahmut Celal Bayar`, `Mareşal Fevzi Çakmak`], correctIndex: 0 },
        { question: `Cumhuriyetin ilk Başbakanı kimdir?`, options: [`İsmet İnönü`, `Atatürk`, `Celal Bayar`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `Milliyetçilik ilkesi neye dayanır?`, options: [`Türk milletinin birliği, dili ve kültürel kimliği`, `Irk üstünlüğüne dayanan bir ayrımcılık anlayışıdır`, `Din farkına dayanan bir topluluk anlayışıdır`, `Sınıf farkına dayanan bir toplum anlayışıdır`], correctIndex: 0 },
        { question: `Halkçılık ilkesi neyi ifade eder?`, options: [`Halkın eşitliği, sınıf ayrımının olmaması`, `Halkın hanedan yönetimine bağlı olması`, `Toplumda sınıf farklarının korunması`, `Yönetimin tek bir zümreye bırakılması`], correctIndex: 0 },
        { question: `Devletçilik ilkesi neyi ifade eder?`, options: [`Devletin ekonomide aktif rol oynaması`, `Ekonominin tümüyle özel sektöre bırakılması`, `Ekonominin yabancı şirketlere bırakılması`, `Ekonomik kararların halifeye bırakılması`], correctIndex: 0 },
        { question: `Laiklik ilkesi neyi ifade eder?`, options: [`Din ile devlet işlerinin ayrılması`, `Din kurallarına göre devlet yönetimi`, `Dini inançların yasaklanmış olması`, `Halifeliğin devlet başında kalması`], correctIndex: 0 },
        { question: `İnkılapçılık ilkesi neyi ifade eder?`, options: [`Sürekli yenilik ve çağdaşlaşma`, `Eski kurumlara geri dönme çabası`, `Değişime kapalı bir düzen kurma`, `Gelenekleri olduğu gibi koruma`], correctIndex: 0 },
        { question: `Atatürk'ün ilkelerini bütünleyen ilkeler hangileridir?`, options: [`Milli egemenlik, yurtta sulh, akılcılık ve bilimsellik`, `Milli egemenlik, laiklik, halkçılık ve devletçilik`, `Cumhuriyetçilik, milliyetçilik, halkçılık ve laiklik`, `İnkılapçılık, devletçilik, ümmetçilik ve saltanatçılık`], correctIndex: 0 },
        { question: `Halifelik ne zaman kaldırılmıştır?`, options: [`3 Mart 1924`, `1 Kasım 1922`, `29 Ekim 1923`, `9 Eylül 1922`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılmasıyla birlikte hangi kurumlar da kaldırılmıştır?`, options: [`Şer'iye ve Evkaf Vekaleti, Erkân-ı Harbiye Vekaleti`, `Sadaret Makamı ve Meclis-i Mebusan Başkanlık Divanı`, `Divan-ı Hümayun ve Şûrâ-yı Devlet Başkanlığı`, `Düyûn-ı Umûmiye ve Kapitülasyonlar İdaresi`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat Kanunu (Öğretim Birliği) ne zaman çıkarılmıştır?`, options: [`3 Mart 1924`, `29 Ekim 1923`, `1 Kasım 1922`, `1925`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat Kanunu neyi sağlamıştır?`, options: [`Tüm okulların Milli Eğitim Bakanlığına bağlanması`, `Yabancı okulların eğitimden tamamen çıkarılması`, `Medreselerin üniversite düzeyine yükseltilmesi`, `Her ilde ayrı bir eğitim programı uygulanması`], correctIndex: 0 },
        { question: `1924 Anayasası ne zaman kabul edilmiştir?`, options: [`20 Nisan 1924`, `23 Nisan 1920`, `29 Ekim 1923`, `3 Mart 1924`], correctIndex: 0 },
        { question: `Şapka Kanunu ne zaman çıkarılmıştır?`, options: [`25 Kasım 1925`, `3 Mart 1924`, `29 Ekim 1923`, `1928`], correctIndex: 0 },
        { question: `Şapka Kanununun amacı nedir?`, options: [`Kıyafetin modernleştirilmesi`, `Kışlık giyim üretimini artırmak`, `Kumaş ithalatını azaltmak`, `Askerî üniformayı değiştirmek`], correctIndex: 0 },
        { question: `Tekke ve zaviyeler ne zaman kapatılmıştır?`, options: [`30 Kasım 1925`, `25 Kasım 1925`, `3 Mart 1924`, `1928`], correctIndex: 0 },
        { question: `Miladi takvim (uluslararası takvim) ne zaman kabul edilmiştir?`, options: [`26 Aralık 1925`, `1 Kasım 1928`, `17 Şubat 1926`, `25 Kasım 1925`], correctIndex: 0 },
        { question: `Türk Medeni Kanunu ne zaman kabul edilmiştir?`, options: [`17 Şubat 1926`, `20 Nisan 1924`, `3 Mart 1924`, `30 Kasım 1925`], correctIndex: 0 },
        { question: `Türk Medeni Kanunu hangi ülkenin medeni kanunundan alınmıştır?`, options: [`İsviçre`, `Almanya`, `Fransa`, `İtalya`], correctIndex: 0 },
        { question: `Medeni Kanun ile kadınlara hangi haklar verilmiştir?`, options: [`Miras, boşanma, şahitlik, tek eşlilik gibi haklar`, `Milletvekili seçme ve seçilme hakkının tanınması`, `Belediye seçimlerinde oy kullanma hakkı`, `Muhtar seçimlerine katılabilme hakkı`], correctIndex: 0 },
        { question: `Latin (yeni Türk) harfleri ne zaman kabul edilmiştir?`, options: [`1 Kasım 1928`, `24 Temmuz 1923`, `17 Şubat 1926`, `5 Aralık 1934`], correctIndex: 0 },
        { question: `Millet Mektepleri ne amaçla açılmıştır?`, options: [`Halka yeni harflerle okuma-yazma öğretmek`, `Köylere ziraat teknikleri öğretmek amacıyla`, `Öğretmen yetiştiren okullar açmak amacıyla`, `Yükseköğretimi yaygınlaştırmak amacıyla`], correctIndex: 0 },
        { question: `Türk Tarih Kurumu ne zaman kurulmuştur?`, options: [`1931`, `1932`, `1923`, `1928`], correctIndex: 0 },
        { question: `Türk Dil Kurumu ne zaman kurulmuştur?`, options: [`1932`, `1931`, `1923`, `1928`], correctIndex: 0 },
        { question: `Türk kadını seçme-seçilme hakkını ne zaman kazanmıştır?`, options: [`5 Aralık 1934`, `20 Nisan 1924`, `17 Şubat 1926`, `10 Nisan 1928`], correctIndex: 0, explanation: `5 Aralık 1934 (genel seçimlerde)` },
        { question: `Türk kadınına yerel seçimlerde seçme-seçilme hakkı ne zaman tanındı?`, options: [`1930`, `1923`, `1934`, `1924`], correctIndex: 0 },
        { question: `Soyadı Kanunu ne zaman çıkarılmıştır?`, options: [`21 Haziran 1934`, `14 Haziran 1934`, `26 Kasım 1934`, `5 Aralık 1934`], correctIndex: 0 },
        { question: `"Atatürk" soyadı Mustafa Kemal'e ne zaman ve nasıl verilmiştir?`, options: [`24 Kasım 1934 TBMM kararıyla`, `24 Kasım 1928 TBMM kararıyla`, `21 Haziran 1934 kanunuyla`, `29 Ekim 1923 TBMM kararıyla`], correctIndex: 0 },
        { question: `Kadın-erkek eşitliği için yapılan en önemli inkılaplardan biri hangisidir?`, options: [`Medeni Kanun ve seçme-seçilme hakkı`, `Tekke ve zaviyelerin kapatılması`, `Şapka ve kılık-kıyafet düzenlemesi`, `Soyadı Kanunu'nun kabul edilmesi`], correctIndex: 0 },
        { question: `Ölçü ve tartı sistemi (kilo, metre vb.) ne zaman kabul edilmiştir?`, options: [`1931`, `1928`, `1923`, `1934`], correctIndex: 0 },
        { question: `Hafta tatili Cumadan Pazara hangi yıl kaymıştır?`, options: [`1935`, `1923`, `1924`, `1928`], correctIndex: 0 },
        { question: `İzmir İktisat Kongresi hangi tarihte toplanmıştır?`, options: [`17 Şubat - 4 Mart 1923`, `23 Temmuz - 7 Ağustos 1919`, `4 Eylül - 11 Eylül 1919`, `23 Nisan - 1 Mayıs 1920`], correctIndex: 0 },
        { question: `İzmir İktisat Kongresinin amacı nedir?`, options: [`Milli ekonomi politikalarını belirlemek`, `Yeni anayasanın esaslarını hazırlamak`, `Lozan görüşmelerine heyet seçmek`, `Eğitim programını yeniden düzenlemek`], correctIndex: 0 },
        { question: `Aşar (öşür) vergisi ne zaman kaldırılmıştır?`, options: [`1925`, `1923`, `1928`, `1934`], correctIndex: 0 },
        { question: `İlk demir yolu inşası Cumhuriyet döneminde hangi proje ile başlamıştır?`, options: [`Ankara-Sivas ve Samsun-Sivas demir yolu hatları`, `İzmir-Aydın ve İzmir-Kasaba hatlarının yapımı`, `Bağdat ve Hicaz demir yolu hatlarının yapımı`, `Rumeli hatlarının yabancı şirketlerce yapımı`], correctIndex: 0 },
        { question: `Etibank ne zaman kurulmuştur?`, options: [`1935`, `1923`, `1924`, `1938`], correctIndex: 0 },
        { question: `Sümerbank ne zaman kurulmuştur?`, options: [`1933`, `1923`, `1934`, `1938`], correctIndex: 0 },
        { question: `1. Beş Yıllık Sanayi Planı hangi yıllarda uygulanmıştır?`, options: [`1934-1939`, `1923-1928`, `1929-1933`, `1939-1944`], correctIndex: 0 },
        { question: `Devletçilik ilkesinin uygulanmasında etkili olan kriz hangisidir?`, options: [`1929 Dünya Ekonomik Krizi`, `1920 Sevr Antlaşması süreci`, `1914 Birinci Dünya Savaşı`, `1922 Mudanya Ateşkes süreci`], correctIndex: 0 },
        { question: `İnkılapların ortak amacı nedir?`, options: [`Türk milletini çağdaş medeniyet seviyesine çıkarmak`, `Osmanlı kurumlarını olduğu gibi sürdürebilmek`, `Devlet yönetimini hanedana geri kazandırmak`, `Ülke yönetimini yabancı devletlerin denetimine bırakmak`], correctIndex: 0 },
        { question: `Çağdaşlaşma için temel atılan adımlardan biri hangisidir?`, options: [`Eğitim, hukuk, kültür ve ekonomide modernleşme`, `Yalnızca askerî alanda yenilikler yapılması`, `Geleneksel kurumların aynen korunması`, `Yabancı devletlerin denetimine girilmesi`], correctIndex: 0 },
        { question: `İnkılapların başarısı için temel koşul nedir?`, options: [`Halkın benimsemesi ve sürekliliği`, `Yabancı devletlerin onay vermesi`, `Sadece kanunla zorunlu kılınması`, `Yalnızca şehirlerde uygulanması`], correctIndex: 0 },
        { question: `Laikliğin temel anayasal kanıtı hangi yıl Anayasaya eklenmiştir?`, options: [`1937`, `1924`, `1923`, `1928`], correctIndex: 0 },
        { question: `1924 Anayasasından "Devletin dini İslam'dır" ifadesi ne zaman çıkarılmıştır?`, options: [`1928`, `1937`, `1934`, `1924`], correctIndex: 0 },
        { question: `Anayasaya "Türkiye Cumhuriyeti laiktir" ibaresi ne zaman eklenmiştir?`, options: [`1937`, `1928`, `1924`, `1934`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılması ile laiklik ilkesi arasında nasıl bir bağ vardır?`, options: [`Laikliğin temeli olmuştur`, `Laikliği geciktiren bir adımdır`, `Laiklikle ilgisi bulunmamaktadır`, `Laikliğin tam karşıtı olmuştur`], correctIndex: 0, explanation: `Laikliğin temeli olmuştur (din-devlet ayrımı için gereklidir)` },
        { question: `Eğitim inkılaplarının ortak amacı nedir?`, options: [`Birlikli, çağdaş ve bilimsel eğitim oluşturmak`, `Yalnızca din eğitimini yaygınlaştırmak`, `Eğitimi yalnızca askerî alanla sınırlamak`, `Her okulun ayrı program uygulamasını sağlamak`], correctIndex: 0 },
      ],
    },
    {
      id: "demokratiklesme-cabalari",
      name: `Demokratikleşme Çabaları`,
      summary: `Çok partili hayat denemeleri ve karşılaşılan zorluklar.`,
      youtubeId: "",
      mindMap: {
        center: `Demokratikleşme Çabaları`,
        branches: [
          {
            label: `Çok Partili Hayat Denemeleri`,
            sections: [
              { kind: "kural", content: `Terakkiperver Cumhuriyet Fırkası (1924, ilk muhalefet partisi) ve Serbest Cumhuriyet Fırkası (1930, Fethi Okyar).` },
              { kind: "ornek", content: `Terakkiperver C.F. (17 Kasım 1924) → kurucular: Kâzım Karabekir, Rauf Orbay, Ali Fuat Cebesoy. Şeyh Sait İsyanı (1925) sonrası Takrir-i Sükûn Kanunu ile kapatıldı. Serbest C.F. (12 Ağustos 1930) → Atatürk'ün isteğiyle Fethi Okyar kurdu; gerici kalkışmalara zemin oluşturduğu görülünce kendisi feshetti.` },
              { kind: "tuzak", content: `İlk muhalefet partisi Serbest C.F. DEĞİL, Terakkiperver C.F.'dir (1924).` },
            ],
          },
          {
            label: `İsyan ve Olaylar`,
            sections: [
              { kind: "kural", content: `Şeyh Sait İsyanı (1925) ve Menemen Olayı (23 Aralık 1930) çok partili hayata geçişi sekteye uğrattı.` },
              { kind: "ornek", content: `Şeyh Sait İsyanı (13 Şubat 1925, Diyarbakır-Bingöl) → Takrir-i Sükûn Kanunu çıkarıldı, Terakkiperver C.F. kapatıldı, halifelik yanlıları cezalandırıldı. Menemen Olayı → Asteğmen Kubilay'ın katledilmesi; Serbest C.F.'nin kapatılmasından sonra rejim aleyhine kalkışma.` },
            ],
          },
          {
            label: `Toplumsal Haklar`,
            sections: [
              { kind: "tanim", content: `Hukuk önünde eşitlik ve kadın hakları alanında önemli adımlar atıldı.` },
              { kind: "ornek", content: `Kadın haklarında: Medeni Kanun (1926) ile aile/miras eşitliği; 1930 belediye, 1933 muhtar, 1934 milletvekili seçme-seçilme hakkı. 1935'te 18 kadın milletvekili meclise girdi (dünyada ilk sıralarda).` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `İlk muhalefet partisi hangisidir?`,
          back: `Terakkiperver Cumhuriyet Fırkası (1924).`,
        },
        {
          front: `Serbest Cumhuriyet Fırkası'nı kim kurdu?`,
          back: `Fethi Okyar (1930).`,
        },
        {
          front: `Şeyh Sait İsyanı hangi yıl çıktı?`,
          back: `1925.`,
        },
        {
          front: `Menemen Olayı hangi yıl gerçekleşti?`,
          back: `1930.`,
        },
      ],
      article: `# Çok Partili Hayat Denemeleri
[kural] **Terakkiperver Cumhuriyet Fırkası (1924)** Cumhuriyet döneminin **ilk muhalefet partisidir**. **Serbest Cumhuriyet Fırkası (1930)** Fethi Okyar tarafından kuruldu.
[tuzak] İlk muhalefet partisi Serbest Cumhuriyet Fırkası değil, **Terakkiperver Cumhuriyet Fırkası**'dır.

# İsyan ve Olaylar
[kural] **Şeyh Sait İsyanı (1925)** Terakkiperver C.F.'nin kapatılmasına; **Menemen Olayı (1930)** rejim aleyhine kalkışmaya örnektir. İkisi de çok partili hayata geçişi sekteye uğrattı.
[soru] "Hangi olay Terakkiperver C.F.'nin kapatılmasına yol açtı?" → Şeyh Sait İsyanı.

# Toplumsal Haklar
Bu dönemde hukuk önünde eşitlik ve kadın haklarıyla ilgili önemli adımlar atıldı; toplumun çağdaşlaşması hedeflendi.`,
      tips: [
        {
          trap: `İlk muhalefet partisi karıştırılır.`,
          wrong: `İlk muhalefet partisi Serbest Cumhuriyet Fırkası'dır.`,
          correct: `İlk muhalefet partisi Terakkiperver Cumhuriyet Fırkası'dır (1924). Serbest Cumhuriyet Fırkası 1930'da kurulmuştur.`,
        },
        {
          trap: `Şeyh Sait İsyanı'nın sonucu yanlış bilinir.`,
          wrong: `Şeyh Sait İsyanı'ndan sonra hemen çok partili hayata geçildi.`,
          correct: `İsyan, Terakkiperver Cumhuriyet Fırkası'nın kapatılmasına ve çok partili hayatın ertelenmesine yol açtı.`,
        },
      ],
      quiz: [
        {
          question: `Cumhuriyet döneminin ilk muhalefet partisi hangisidir?`,
          options: [
            `Terakkiperver Cumhuriyet Fırkası`,
            `Serbest Cumhuriyet Fırkası`,
            `Cumhuriyet Halk Fırkası`,
            `Demokrat Parti`,
          ],
          correctIndex: 0,
        },
        {
          question: `Serbest Cumhuriyet Fırkası'nı 1930'da kim kurmuştur?`,
          options: [`Fethi Okyar`, `Kazım Karabekir`, `İsmet İnönü`, `Celal Bayar`],
          correctIndex: 0,
        },
        {
          question: `1925'te çıkan, çok partili hayatı sekteye uğratan isyan hangisidir?`,
          options: [`Şeyh Sait İsyanı`, `Menemen Olayı`, `31 Mart Olayı`, `Kuleli Olayı`],
          correctIndex: 0,
        },
        {
          question: `Menemen Olayı hangi yıl gerçekleşmiştir?`,
          options: [`1925`, `1930`, `1924`, `1938`],
          correctIndex: 1,
        },
        {
          question: `Terakkiperver Cumhuriyet Fırkası hangi yıl kurulmuştur?`,
          options: [`1923`, `1924`, `1930`, `1934`],
          correctIndex: 1,
        },
        {
          question: `Serbest Cumhuriyet Fırkası hangi yıl kurulmuştur?`,
          options: [`1924`, `1930`, `1925`, `1938`],
          correctIndex: 1,
        },
        {
          question: `Çok partili hayata geçiş denemelerinin temel amacı nedir?`,
          options: [
            `Demokrasiyi geliştirmek`,
            `Saltanatı geri getirmek`,
            `Tek parti kurmak`,
            `Halifeliği güçlendirmek`,
          ],
          correctIndex: 0,
        },
        {
          question: `Terakkiperver Cumhuriyet Fırkası hangi olaydan sonra kapatılmıştır?`,
          options: [`Menemen Olayı`, `Şeyh Sait İsyanı`, `Lozan`, `Hatay'ın katılması`],
          correctIndex: 1,
        },
      ],
      quickQuestions: [
        { question: `Cumhuriyetimizin ilk siyasi partisi hangisidir?`, options: [`Cumhuriyet Halk Fırkası`, `Serbest Cumhuriyet Fırkası`, `Halk İştirakiyun Fırkası`, `Ahali Cumhuriyet Fırkası`], correctIndex: 0 },
        { question: `Cumhuriyet Halk Fırkası ne zaman kurulmuştur?`, options: [`9 Eylül 1923`, `29 Ekim 1923`, `3 Mart 1924`, `1930`], correctIndex: 0 },
        { question: `Cumhuriyet Halk Fırkasının kurucusu kimdir?`, options: [`Mustafa Kemal Atatürk`, `Mustafa İsmet İnönü`, `Kâzım Karabekir Paşa`, `Ali Fethi Okyar`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkası ne zaman kurulmuştur?`, options: [`17 Kasım 1924`, `9 Eylül 1923`, `17 Kasım 1930`, `3 Mart 1924`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkasının kurucuları kimlerdir?`, options: [`Kâzım Karabekir, Rauf Orbay, Ali Fuat Cebesoy`, `Ali Fethi Okyar, Ahmet Ağaoğlu, Nuri Conker`, `İsmet İnönü, Fevzi Çakmak, Celal Bayar`, `Recep Peker, Şükrü Kaya, Mahmut Esat Bozkurt`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkası ne zaman kapatılmıştır?`, options: [`Şeyh Sait İsyanı sonrası 1925`, `Menemen Olayı sonrası 1930`, `İzmir suikasti sonrası 1926`, `Ekonomik kriz sonrası 1929`], correctIndex: 0 },
        { question: `Şeyh Sait İsyanı ne zaman çıkmıştır?`, options: [`1925`, `1923`, `1930`, `1924`], correctIndex: 0 },
        { question: `Şeyh Sait İsyanı'nın bastırılması için hangi kanun çıkarılmıştır?`, options: [`Takrir-i Sükûn Kanunu`, `Hıyanet-i Vataniye`, `Soyadı Kanunu`, `Şapka Kanunu`], correctIndex: 0 },
        { question: `Takrir-i Sükûn Kanunu hangi yıllar arasında yürürlükte kalmıştır?`, options: [`1925-1929`, `1923-1930`, `1928-1934`, `1934-1938`], correctIndex: 0 },
        { question: `Atatürk'e suikast girişimi hangi yıl ve nerede olmuştur?`, options: [`1926 İzmir`, `1925 Ankara`, `1930 İstanbul`, `1934 Bursa`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkası ne zaman kurulmuştur?`, options: [`12 Ağustos 1930`, `17 Kasım 1930`, `23 Aralık 1930`, `3 Nisan 1930`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kurucusu kimdir?`, options: [`Fethi Okyar`, `Atatürk`, `İsmet İnönü`, `Celal Bayar`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kuruluş amacı nedir?`, options: [`Çok partili siyasi hayata geçişi denemek`, `Meclisteki muhalefeti tamamen kaldırmak`, `Halifelik makamını yeniden kurmayı sağlamak`, `Ekonomik krizi tek başına çözmeyi sağlamak`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkası ne zaman kapanmıştır?`, options: [`17 Kasım 1930`, `12 Ağustos 1930`, `23 Aralık 1930`, `3 Nisan 1930`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kapanma nedeni nedir?`, options: [`Partiye rejim karşıtı çevrelerin sızması`, `Belediye seçimlerinde hiç oy alamaması`, `Kurucusunun yurt dışına görevle gitmesi`, `Meclis çoğunluğunu ele geçirmiş olması`], correctIndex: 0 },
        { question: `Menemen Olayı ne zaman olmuştur?`, options: [`23 Aralık 1930`, `13 Şubat 1925`, `16 Haziran 1926`, `17 Kasım 1930`], correctIndex: 0 },
        { question: `Menemen Olayında öldürülen subay kimdir?`, options: [`Kubilay`, `İsmet İnönü`, `Fevzi Çakmak`, `Kâzım Karabekir`], correctIndex: 0 },
        { question: `Menemen Olayının önemi nedir?`, options: [`Laiklik karşıtı tepkinin sürdüğünü göstermiştir`, `Saltanatın yeniden kurulmasını sağlamıştır`, `Halifelik makamının geri getirilmesine yol açmıştır`, `Çok partili hayatın başlamasını sağlamıştır`], correctIndex: 0 },
        { question: `1924 Anayasasında "Devletin dini İslam'dır" ifadesi ne zaman çıkarılmıştır?`, options: [`10 Nisan 1928`, `5 Şubat 1937`, `3 Mart 1924`, `20 Nisan 1924`], correctIndex: 0 },
        { question: `Çok partili hayata geçiş çabalarının başarısız olmasının nedeni nedir?`, options: [`Cumhuriyet karşıtlarının partileri istismar etmesi`, `Halkın çok partili hayatı hiç istememesi`, `Meclisin yeni parti kurulmasını yasaklaması`, `Yeni partilerin ekonomik bir program hazırlamamış olması`], correctIndex: 0 },
        { question: `Demokrasinin temel ilkesi nedir?`, options: [`Egemenliğin kayıtsız şartsız millete ait olması`, `Yönetimin hanedan ailesine bırakılmış olması`, `Kararların tek bir kişi tarafından alınması`, `Egemenliğin din adamlarında bulunuyor olması`], correctIndex: 0 },
        { question: `Çok partili demokrasiye geçişin başarılı olduğu yıl hangisidir?`, options: [`1946`, `1923`, `1930`, `1938`], correctIndex: 0, explanation: `1946 (gerçek anlamda, Atatürk dönemi sonrası)` },
        { question: `Atatürk döneminde TBMM seçimleri hangi yöntemle yapılmıştır?`, options: [`İki dereceli seçim`, `Halk oylaması`, `Hiç seçim yapılmadı`, `Padişah atamasıyla`], correctIndex: 0 },
        { question: `Tekke ve zaviyelerin kapatılması hangi ilkeyle bağlantılıdır?`, options: [`Laiklik`, `Devletçilik`, `Halkçılık`, `Milliyetçilik`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılması ile başlayan dönüşüm hangi ilkeyle ilgilidir?`, options: [`Laiklik ve cumhuriyetçilik`, `Devletçilik ve milliyetçilik`, `Halkçılık ve devletçilik`, `Milliyetçilik ve halkçılık`], correctIndex: 0 },
        { question: `İstiklal Mahkemeleri hangi olaylarda görev yapmıştır?`, options: [`Hıyanet-i Vataniye, Şeyh Sait İsyanı ve suikast davası`, `Lozan görüşmeleri ve Mudanya Ateşkesi süreçleri`, `Kurtuluş Savaşı sonrası nüfus mübadelesi anlaşmazlıkları`, `İzmir İktisat Kongresi kararlarının uygulanması`], correctIndex: 0 },
        { question: `Atatürk'ün çok partili demokrasiyi sınadığı iki parti hangileridir?`, options: [`Terakkiperver Cumhuriyet ve Serbest Cumhuriyet Fırkaları`, `İttihat ve Terakki ile Hürriyet ve İtilaf Fırkaları`, `Cumhuriyet Halk Fırkası ve Demokrat Parti`, `Terakkiperver Cumhuriyet Fırkası ve Ahali Cumhuriyet Fırkası`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasında çok ilgi gösteren bölge neresidir?`, options: [`İzmir ve Ege`, `Doğu Anadolu`, `Karadeniz`, `Trakya`], correctIndex: 0 },
        { question: `Demokratik hayatın temel kurumu hangisidir?`, options: [`TBMM`, `Padişah Sarayı`, `Halifelik`, `Sadrazamlık`], correctIndex: 0, explanation: `TBMM (Türkiye Büyük Millet Meclisi)` },
        { question: `Atatürk'ün "Demokrasi" hakkındaki düşüncesi nedir?`, options: [`Cumhuriyet, demokrasinin en mükemmel halidir`, `Demokrasi yalnızca seçimlerden ibaret bir usuldür`, `Yönetim biçimi olarak monarşi tercih edilmelidir`, `Halkın yönetime katılması gerekli değildir`], correctIndex: 0 },
        { question: `1924 Anayasasının özelliği nedir?`, options: [`Temel hak ve özgürlükleri güvence altına almıştır`, `Yalnızca askerlerin haklarını ayrıntılı düzenlemiştir`, `Padişahın yetkilerini yeniden tanımlamıştır`, `Devlet yönetimini halifeye bırakmıştır`], correctIndex: 0 },
        { question: `Milli egemenlik ilkesini açıkça ortaya koyan inkılap hangisidir?`, options: [`Cumhuriyetin ilanı`, `Halifeliğin kaldırılması`, `Soyadı Kanunu`, `Şapka Kanunu`], correctIndex: 0 },
        { question: `Yurttaşlık kavramının pekiştirilmesi için yapılan inkılap hangisidir?`, options: [`Soyadı Kanunu`, `Halifelik`, `Saltanat`, `Hilal-i Ahmer`], correctIndex: 0 },
        { question: `Atatürk döneminde demokrasiyi engelleyen olaylar hangileridir?`, options: [`Şeyh Sait İsyanı, suikast girişimi, Menemen Olayı`, `Lozan Antlaşması, Mudanya Ateşkesi, Kars Antlaşması`, `Saltanatın kaldırılması ve Cumhuriyet'in ilanı`, `İzmir İktisat Kongresi ve Teşvik-i Sanayi Kanunu`], correctIndex: 0 },
        { question: `Demokratikleşmeye katkı sağlayan en önemli kanun nedir?`, options: [`1924 Anayasası`, `Hıyanet-i Vataniye`, `Takrir-i Sükûn`, `Aşar`], correctIndex: 0 },
        { question: `Atatürk dönemi tek partili dönem hangi partidir?`, options: [`Cumhuriyet Halk Fırkası`, `Serbest Cumhuriyet Fırkası`, `Halk İştirakiyun Fırkası`, `Ahali Cumhuriyet Fırkası`], correctIndex: 0 },
        { question: `TBMM'nin laiklik yolundaki adımı hangisidir?`, options: [`Halifeliğin ve şer'iye vekaletinin kaldırılması`, `Aşar vergisinin kaldırılıp yeni vergilerin konması`, `Yeni Türk harflerinin kabulü ve yaygınlaştırılması`, `Soyadı Kanunu ile lakapların kaldırılması`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat'ın demokrasiye katkısı nedir?`, options: [`Eşit eğitim fırsatı sağlamak`, `Yalnızca meslek okulları açmak`, `Eğitimi din adamlarına bırakmak`, `Okulları ayrı programlara ayırmak`], correctIndex: 0 },
        { question: `Türkiye'de kadına seçme-seçilme hakkının verilmesi hangi demokratik adımdır?`, options: [`Demokrasinin tüm vatandaşları kapsaması`, `Seçme hakkının yalnızca şehirlere tanınması`, `Seçme hakkının yalnızca köylülere tanınması`, `Seçme hakkının belli bir zümreyle sınırlanması`], correctIndex: 0 },
        { question: `Atatürk'ün "Sonsuza dek yaşatacağımız" dediği ilke hangisidir?`, options: [`Cumhuriyet`, `Halifelik`, `Saltanat`, `Hilafet`], correctIndex: 0 },
        { question: `Cumhuriyet rejiminin korunmasını sağlayan kurumlar hangileridir?`, options: [`TBMM, bağımsız yargı ve Cumhurbaşkanlığı`, `Sadaret, Şeyhülislamlık ve Divan-ı Hümayun`, `Meclis-i Ayan, Meclis-i Mebusan ve Saray`, `Şûrâ-yı Devlet, Meşihat ve Sadaret Makamı`], correctIndex: 0 },
        { question: `Atatürk döneminde basın özgürlüğüne yönelik kanun hangisidir?`, options: [`Takrir-i Sükûn döneminde sınırlandırılmıştır`, `Teşvik-i Sanayi Kanunu ile genişletilmiştir`, `Tevhid-i Tedrisat Kanunu ile düzenlenmiştir`, `Medeni Kanun ile güvence altına alınmıştır`], correctIndex: 0 },
        { question: `Atatürk'e suikast girişimine kim destek vermiştir?`, options: [`İttihatçı bazı isimler ve rejim karşıtları`, `Kuvâ-yı Milliye komutanlarının tümü ve subaylar`, `Yabancı devletlerin resmi temsilcileri`, `Cumhuriyet Halk Fırkası yöneticileri`], correctIndex: 0 },
        { question: `Demokrasinin gelişmesi için yapılması gereken nedir?`, options: [`Vatandaşlık bilinci, hukuk, eğitim, özgür basın`, `Yalnızca ekonomik kalkınmanın hızlandırılması`, `Sadece güçlü bir ordunun sürekli bulundurulması`, `Yönetim yetkisinin tek bir zümreye bırakılması`], correctIndex: 0 },
        { question: `Çok partili hayata geçiş denemelerinin Atatürk dönemindeki sonuçları nedir?`, options: [`Denemeler koşullar nedeniyle yarıda kalmıştır`, `Çok partili düzen kalıcı olarak yerleşmiştir`, `Muhalefet partileri seçimleri kazanmıştır`, `Hiçbir zaman böyle bir deneme yapılmamıştır`], correctIndex: 0 },
        { question: `Atatürk'ün demokrasi konusundaki düşüncelerini gösteren sözü nedir?`, options: [`"Cumhuriyet, fikren, ilmen, fennen, bedenen kuvvetli ve yüksek seciyeli muhafızlar ister."`, `"Hayatta en hakiki mürşit ilimdir, fendir; ilim ve fennin dışında yol gösterici aramak gaflettir."`, `"Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur." (Gençliğe Hitabe)`, `"Sanatsız kalan bir milletin hayat damarlarından biri kopmuş demektir." sözüdür`], correctIndex: 0 },
        { question: `Atatürk'ün "Egemenlik milletindir" sözü hangi belgede yer almıştır?`, options: [`Amasya Genelgesi ve 1921 Anayasası`, `Sevr Antlaşması ve Mondros Ateşkesi`, `Lozan Antlaşması ve Mudanya Ateşkesi`, `Kanun-i Esasi ve Islahat Fermanı`], correctIndex: 0 },
        { question: `Köy Enstitüleri hangi yıllar arasında açılmıştır?`, options: [`1940`, `1923`, `1930`, `1925`], correctIndex: 0, explanation: `1940 (Atatürk sonrası, İnönü dönemi)` },
        { question: `Halkevleri ne zaman açılmıştır?`, options: [`1932`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Halkevlerinin amacı nedir?`, options: [`Halka kültür, sanat ve eğitim hizmeti vermek`, `Köylere öğretmen yetiştirip köyü kalkındırmak`, `Yeni harflerle halka okuma yazma öğretmek`, `Çiftçiye tarım kredisi vererek üretimi artırmak`], correctIndex: 0 },
      ],
    },
    {
      id: "ataturk-donemi-dis-politika",
      name: `Atatürk Dönemi Dış Politikası`,
      summary: `Lozan'dan kalan sorunlar, Boğazlar, paktlar ve Hatay.`,
      youtubeId: "",
      mindMap: {
        center: `Dış Politika`,
        branches: [
          {
            label: `Lozan'dan Kalan Sorunlar`,
            sections: [
              { kind: "kural", content: `Musul, nüfus mübadelesi, dış borçlar (Düyun-u Umumiye), yabancı okullar Lozan sonrasında çözüldü.` },
              { kind: "ornek", content: `Musul (1926 Ankara Antlaşması) → İngiltere lehine; petrol gelirinin %10'u 25 yıl Türkiye'ye. Nüfus mübadelesi (1923, Yunanistan ile) → İstanbul Rumları ve Batı Trakya Türkleri hariç. Dış borçlar 1928 ve 1933'te taksitlendirilerek düzenli ödenmeye başlandı.` },
              { kind: "tuzak", content: `Musul Türkiye lehine değil, İngiltere lehine çözüldü; Türkiye bu nedenle "kaybedilen toprak" ifadesini kullanır.` },
            ],
          },
          {
            label: `Boğazlar ve Güvenlik`,
            sections: [
              { kind: "kural", content: `1936 Montrö Boğazlar Sözleşmesi ile Boğazlar üzerinde Türk egemenliği güçlendirildi.` },
              { kind: "ornek", content: `Lozan'da Boğazlar Komisyonu (uluslararası, başkanı Türk) kurulmuştu, asker geçişi sınırlıydı. Montrö (20 Temmuz 1936) → komisyon kaldırıldı, Boğazlar Türk komutası altına girdi, gerekirse asker konuşlandırılabilir oldu.` },
              { kind: "tuzak", content: `Boğazlar üzerinde TAM egemenlik Lozan'da DEĞİL, 1936 Montrö ile sağlandı.` },
            ],
          },
          {
            label: `Bölgesel Paktlar`,
            sections: [
              { kind: "kural", content: `Balkan Antantı (9 Şubat 1934) ve doğu sınırı için Sadabat Paktı (8 Temmuz 1937).` },
              { kind: "ornek", content: `Balkan Antantı → Türkiye, Yunanistan, Yugoslavya, Romanya (İtalya tehdidine karşı). Sadabat Paktı → Türkiye, İran, Irak, Afganistan (doğu sınırının güvenliği).` },
            ],
          },
          {
            label: `Hatay Meselesi`,
            sections: [
              { kind: "kural", content: `Hatay 29 Haziran 1939'da anavatana katıldı (Atatürk'ün ölümünden sonra).` },
              { kind: "ornek", content: `Süreç: 1936 Fransa'dan Hatay talebi → 1937 özerk Hatay → 1938 bağımsız Hatay Devleti (cumhurbaşkanı Tayfur Sökmen) → 29 Haziran 1939 Türkiye'ye katılım.` },
              { kind: "tuzak", content: `Hatay 1936'da değil, 1939'da katıldı; Atatürk hastalığına rağmen meseleyle bizzat ilgilendi.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `Boğazlar üzerinde egemenliği güçlendiren sözleşme?`,
          back: `Montrö Boğazlar Sözleşmesi (1936).`,
        },
        {
          front: `Hatay ne zaman anavatana katıldı?`,
          back: `1939.`,
        },
        {
          front: `Atatürk dönemi dış politikasının ilkesi?`,
          back: `"Yurtta barış, dünyada barış."`,
        },
        {
          front: `Lozan sonrası İngiltere ile çözülen sorun?`,
          back: `Musul Sorunu (1926, İngiltere lehine).`,
        },
      ],
      article: `# Lozan'dan Kalan Sorunlar
[kural] **Musul Sorunu 1926'da İngiltere lehine** çözüldü. Ayrıca Yunanistan'la **nüfus mübadelesi** ve **dış borçlar** bu dönemde ele alındı.

# Boğazlar ve Güvenlik
[kural] **Montrö Boğazlar Sözleşmesi (1936)** ile Boğazlar üzerinde Türk egemenliği güçlendirildi.
[tuzak] Boğazlar üzerindeki tam egemenlik Lozan'da değil, **1936 Montrö** ile sağlandı.

# Bölgesel Paktlar
[kural] **Balkan Antantı (1934)** ve doğu sınırı güvenliği için **Sadabat Paktı (1937)** imzalandı.
[ipucu] Dönemin ilkesi: **"Yurtta barış, dünyada barış."**

# Hatay Meselesi
[kural] Hatay **1939'da** (Atatürk'ün ölümünden sonra) anavatana katıldı.
[tuzak] Hatay 1936'da değil, **1939'da** katıldı.`,
      tips: [
        {
          trap: `Hatay'ın katılma tarihi karıştırılır.`,
          wrong: `Hatay 1936'da Türkiye'ye katıldı.`,
          correct: `Hatay 1939'da anavatana katıldı (Atatürk'ün ölümünden sonra).`,
        },
        {
          trap: `Boğazlar üzerindeki egemenliğin ne zaman sağlandığı karıştırılır.`,
          wrong: `Boğazlar üzerinde tam Türk egemenliği Lozan'da sağlandı.`,
          correct: `Boğazlar üzerinde tam egemenlik 1936 Montrö Sözleşmesi ile sağlandı.`,
        },
      ],
      quiz: [
        {
          question: `Boğazlar üzerinde Türk egemenliğini güçlendiren 1936 antlaşması hangisidir?`,
          options: [`Montrö Boğazlar Sözleşmesi`, `Lozan`, `Sevr`, `Sadabat Paktı`],
          correctIndex: 0,
        },
        {
          question: `Hatay hangi yıl anavatana katılmıştır?`,
          options: [`1936`, `1939`, `1923`, `1938`],
          correctIndex: 1,
        },
        {
          question: `Lozan'dan sonra İngiltere ile yaşanan ve 1926'da çözülen sorun hangisidir?`,
          options: [`Musul Sorunu`, `Hatay`, `Boğazlar`, `Kıbrıs`],
          correctIndex: 0,
        },
        {
          question: `Balkan devletleriyle 1934'te imzalanan dayanışma antlaşması hangisidir?`,
          options: [`Balkan Antantı`, `Sadabat Paktı`, `Montrö`, `Lozan`],
          correctIndex: 0,
        },
        {
          question: `1937'de doğu sınırının güvenliği için imzalanan pakt hangisidir?`,
          options: [`Sadabat Paktı`, `Balkan Antantı`, `Montrö`, `NATO`],
          correctIndex: 0,
        },
        {
          question: `Atatürk dönemi dış politikasının temel ilkesi hangisidir?`,
          options: [
            `Yurtta barış, dünyada barış`,
            `Yayılmacılık`,
            `Sömürgecilik`,
            `Hiçbir devletle antlaşma yapmamak`,
          ],
          correctIndex: 0,
        },
        {
          question: `Lozan'da çözülemeyip sonradan halledilen sorunlardan biri hangisidir?`,
          options: [`Musul ve Boğazlar`, `Saltanat`, `Halifelik`, `Harf inkılabı`],
          correctIndex: 0,
        },
        {
          question: `Hatay'ın anavatana katılması ne zaman tamamlanmıştır?`,
          options: [
            `Atatürk'ün ölümünden sonra (1939)`,
            `1923'te`,
            `1930'da`,
            `Cumhuriyet ilanından önce`,
          ],
          correctIndex: 0,
        },
      ],
      quickQuestions: [
        { question: `Atatürk'ün dış politikadaki temel ilkesi nedir?`, options: [`"Yurtta sulh, cihanda sulh"`, `"Vatan sevgisi imandandır"`, `"Hâkimiyet milletindir"`, `"Egemenlik milletindir"`], correctIndex: 0 },
        { question: `Türkiye Milletler Cemiyetine ne zaman üye olmuştur?`, options: [`1932`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Türkiye'nin Milletler Cemiyetine üyeliği hangi anlama gelmiştir?`, options: [`Uluslararası alanda saygın bir devlet sayılması`, `Boğazlar üzerindeki denetimin komisyona bırakılması`, `Kapitülasyonların yeniden yürürlüğe girmesi`, `Askerî ittifaklara katılma zorunluluğu doğması`], correctIndex: 0 },
        { question: `Türkiye'nin Sovyet Rusya ile ilk antlaşması hangisidir?`, options: [`Moskova Antlaşması`, `Kars Antlaşması`, `Gümrü Antlaşması`, `Ankara Antlaşması`], correctIndex: 0 },
        { question: `Saadabat Paktı kimler arasında imzalanmıştır?`, options: [`Türkiye, İran, Irak ve Afganistan`, `Türkiye, Yunanistan, Yugoslavya, Romanya`, `Türkiye, İran, Yunanistan ve Bulgaristan`, `Türkiye, Irak, Suriye ve Yugoslavya`], correctIndex: 0 },
        { question: `Saadabat Paktı ne zaman imzalanmıştır?`, options: [`8 Temmuz 1937`, `9 Şubat 1934`, `20 Temmuz 1936`, `24 Temmuz 1923`], correctIndex: 0 },
        { question: `Saadabat Paktının amacı nedir?`, options: [`Doğu komşularıyla barış ve güvenliği sağlamak`, `Balkanlarda ortak bir savunma cephesi oluşturmak`, `Boğazlar üzerindeki Türk egemenliğini pekiştirmek`, `Batılı devletlerle ortak askerî ittifak kurmak`], correctIndex: 0 },
        { question: `Balkan Antantı ne zaman imzalanmıştır?`, options: [`9 Şubat 1934`, `8 Temmuz 1937`, `20 Temmuz 1936`, `2 Eylül 1938`], correctIndex: 0 },
        { question: `Balkan Antantı kimler arasında imzalanmıştır?`, options: [`Türkiye, Yunanistan, Yugoslavya, Romanya`, `Türkiye, İran, Irak, Afganistan ve Suriye`, `Türkiye, Bulgaristan, Arnavutluk ve Romanya`, `Yunanistan, Yugoslavya, İtalya ve Bulgaristan`], correctIndex: 0 },
        { question: `Balkan Antantının amacı nedir?`, options: [`Balkanlarda barışı ve sınır güvenliğini korumak`, `Doğu sınırında ortak bir güvenlik sistemi kurmak`, `Boğazlarda uluslararası komisyon oluşturmak`, `Üye ülkeler arasında gümrük birliği kurmak`], correctIndex: 0 },
        { question: `Montrö Boğazlar Sözleşmesi ne zaman imzalanmıştır?`, options: [`20 Temmuz 1936`, `24 Temmuz 1923`, `9 Şubat 1934`, `8 Temmuz 1937`], correctIndex: 0 },
        { question: `Montrö Sözleşmesinin önemi nedir?`, options: [`Boğazlar üzerindeki Türk egemenliği tam olarak sağlandı`, `Boğazlar Komisyonu üye sayısı artırılarak sürdürüldü`, `Boğazlardan geçiş tamamen ve süresiz olarak yasaklandı`, `Boğazların yönetimi bütünüyle Milletler Cemiyeti'ne geçti`], correctIndex: 0 },
        { question: `Lozan'da çözülemeyen hangi mesele Montrö ile çözülmüştür?`, options: [`Boğazlar Komisyonu ve geçiş rejimi meselesi`, `Musul'un hangi devlete kalacağı meselesi`, `Etabli Rumlar ve nüfus mübadelesi meselesi`, `Yabancı okulların denetimi ve statüsü meselesi`], correctIndex: 0 },
        { question: `Hatay sorunu hangi tarafla yaşanmıştır?`, options: [`Fransa`, `İngiltere`, `İtalya`, `Almanya`], correctIndex: 0 },
        { question: `Hatay Devleti ne zaman kurulmuştur?`, options: [`2 Eylül 1938`, `29 Haziran 1939`, `20 Temmuz 1936`, `9 Şubat 1934`], correctIndex: 0 },
        { question: `Hatay anavatana ne zaman katılmıştır?`, options: [`29 Haziran 1939`, `2 Eylül 1938`, `24 Temmuz 1923`, `8 Temmuz 1937`], correctIndex: 0, explanation: `29 Haziran 1939 (Atatürk öldükten sonra)` },
        { question: `Atatürk'ün dış politikasının özellikleri nelerdir?`, options: [`Gerçekçilik, barışçılık ve tam bağımsızlık`, `Yayılmacılık, ittifaklara bağımlılık ve gizlilik`, `Maceracılık, silahlanma yarışı ve tarafsızlık`, `Dinî birlik, hanedan bağları ve saltanat esası`], correctIndex: 0 },
        { question: `Türkiye'nin Yunanistan ile ilişkilerinin düzelmesi hangi olayla başlamıştır?`, options: [`Venizelos'un Ankara'yı ziyaret etmesi`, `Etabli sorununun Lozan'da çözülmesi`, `Montrö Sözleşmesi'nin yürürlüğe girmesi`, `Yunan ordusunun İzmir'den çıkarılması`], correctIndex: 0 },
        { question: `Türkiye-Yunanistan arasındaki ahali mübadelesi hangi antlaşmada karara bağlanmıştır?`, options: [`Lozan Antlaşması`, `Mudanya Ateşkesi`, `Ankara Antlaşması`, `Moskova Antlaşması`], correctIndex: 0 },
        { question: `Lozan Antlaşması'ndan sonra Türkiye ile Yunanistan arasında en büyük sorun neydi?`, options: [`Etabli Rumlar (yerleşikler) sorunu`, `Batı Trakya sınırının çizilmesi`, `Yunan savaş tazminatının ödenmesi`, `Ege adalarının paylaşılması sorunu`], correctIndex: 0 },
        { question: `Atatürk dönemi dış borç ödemesi nasıl yapılmıştır?`, options: [`Düzenli taksitlerle ve zamanında ödenmiştir`, `Yabancı şirketlere imtiyaz verilerek ödenmiştir`, `Tamamı Milletler Cemiyeti tarafından silinmiştir`, `Toprak bırakılarak borçlar kapatılmıştır`], correctIndex: 0 },
        { question: `Türkiye'nin Almanya ile ekonomik ilişkilerini sınırlandırmasının nedeni nedir?`, options: [`Ekonomik bağımsızlığı koruma kaygısı`, `Almanya'nın Boğazlar üzerindeki talepleri`, `Milletler Cemiyeti'nin koyduğu ambargo`, `Almanya ile sınır anlaşmazlığı yaşanması`], correctIndex: 0 },
        { question: `İkili antlaşmalarla kazanılan dış politika başarıları nelerdir?`, options: [`Misak-ı Milli'nin büyük ölçüde tamamlanması`, `Kapitülasyonların yeniden yürürlüğe konulması`, `Osmanlı dış borçlarının tamamen silinmesi`, `Manda ve himaye yönetiminin kabul edilmesi`], correctIndex: 0 },
        { question: `İtalya'nın Habeşistan'a saldırması hangi paktı doğurmuştur?`, options: [`Saadabat Paktı'nın imzalanmasını hızlandırmıştır`, `Balkan Antantı'nın dağılmasına yol açmıştır`, `Montrö Sözleşmesi'nin feshine yol açmıştır`, `Türkiye'nin Milletler Cemiyeti'nden çıkmasına yol açtı`], correctIndex: 0 },
        { question: `Türkiye'nin Akdeniz politikasında dikkat ettiği unsur nedir?`, options: [`İtalya'nın Akdeniz'de yayılma tehlikesi`, `Yunanistan'ın Ege'de donanma kurma çabası`, `Sovyetler'in Boğazlar üzerindeki talepleri`, `İngiltere'nin Musul bölgesindeki istekleri`], correctIndex: 0 },
        { question: `Hatay'ın bağımsız devlet olarak kuruluşu hangi politikanın sonucudur?`, options: [`Kararlı diplomasi ve müzakere politikası`, `Doğrudan askerî işgal ve savaş politikası`, `Milletler Cemiyeti'ne üyelik politikası`, `Fransa'ya toprak bırakma politikası`], correctIndex: 0 },
        { question: `Atatürk'ün dış politikadaki vazgeçilmez koşulu nedir?`, options: [`Tam bağımsızlık`, `Yabancı yardım`, `Padişah onayı`, `Halife onayı`], correctIndex: 0 },
        { question: `Atatürk'ün "Yurtta sulh, cihanda sulh" sözünü ilk kez söylediği tarih?`, options: [`20 Nisan 1931`, `29 Ekim 1923`, `1934`, `1938`], correctIndex: 0 },
        { question: `Mübadele neyi ifade eder?`, options: [`Türkiye ve Yunanistan arasında karşılıklı nüfus değişimi`, `İki devlet arasında karşılıklı toprak değişimi yapılması`, `Yabancı şirketlerin devlet tarafından satın alınması`, `Savaş esirlerinin karşılıklı olarak serbest bırakılması`], correctIndex: 0 },
        { question: `Mübadelenin dışında tutulan Rumlar hangileridir?`, options: [`İstanbul Rumları`, `Anadolu Rumları`, `Batı Trakya Türkleri`, `Hiçbiri`], correctIndex: 0 },
        { question: `Mübadelenin dışında tutulan Türkler hangileridir?`, options: [`Batı Trakya Türkleri`, `İstanbul Rumları`, `Hep mübadele edildi`, `Hiçbiri`], correctIndex: 0 },
        { question: `Türkiye-İngiltere arasında Lozan'da çözülemeyen sorun hangisidir?`, options: [`Musul Meselesi`, `Hatay Meselesi`, `Kıbrıs Meselesi`, `Adalar Meselesi`], correctIndex: 0 },
        { question: `Musul Meselesi hangi yıl ve nasıl çözülmüştür?`, options: [`1926 Ankara Antlaşması`, `1923 Lozan Antlaşması`, `1921 Moskova Antlaşması`, `1921 Gümrü Antlaşması`], correctIndex: 0, explanation: `1926 Ankara Antlaşması (Musul Irak'a bırakıldı)` },
        { question: `Türkiye'nin Sovyet Rusya ile ilişkileri ne zaman bozulmaya başlamıştır?`, options: [`II. Dünya Savaşı'nın yaklaştığı yıllarda`, `Lozan Antlaşması'nın hemen ardından`, `Kurtuluş Savaşı'nın ilk yıllarında`, `Montrö Sözleşmesi'nin imzalandığı yıllarda`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikası kaç ana ilkeye dayanır?`, options: [`Barış, bağımsızlık, eşitlik ve akılcılık`, `Yayılmacılık, ittifak ve gizli diplomasi`, `Saltanat, halifelik, ümmetçilik ve manda`, `Silahlanma, tarafsızlık ve maceracılık`], correctIndex: 0 },
        { question: `1929 Dünya Ekonomik Krizinin Türkiye dış politikasına etkisi nedir?`, options: [`Devletçilik ilkesinin uygulanmasını zorunlu kılmıştır`, `Lozan Antlaşması'nın feshedilmesine yol açmıştır`, `Yabancı sermayeye tam serbestlik getirilmesini sağladı`, `Dış borçların tamamen silinmesini sağlamıştır`], correctIndex: 0 },
        { question: `Atatürk dönemi sonrası en önemli dış politika başarısı nedir?`, options: [`Hatay'ın anavatana katılmasının sağlanması`, `Musul'un Türkiye sınırlarına dâhil edilmesi`, `Batı Trakya'nın Türkiye'ye geri verilmesi`, `Ege adalarının Türkiye'ye devredilmesi`], correctIndex: 0 },
        { question: `Atatürk'ün dış politika ilkelerinden biri olan "akılcılık" ne anlama gelir?`, options: [`Duygulara değil gerçeklere dayalı karar almak`, `Kararları geleneklere göre almayı esas almak`, `Dış politikayı din kurallarına göre belirlemek`, `Güçlü devletlerin isteklerine göre hareket etmek`], correctIndex: 0 },
        { question: `Türkiye'nin Lozan'da imzaladığı en önemli dış politika kararı nedir?`, options: [`Tam bağımsız Türkiye'nin dünyaca tanınması`, `Boğazların Türk egemenliğine bırakılması kararı`, `Musul'un Türkiye'ye bırakılması kararı`, `Hatay'ın Türkiye sınırına dâhil edilmesi`], correctIndex: 0 },
        { question: `Atatürk'ün 1933'te söylediği "Bütün insan camiası bir vücut, milletler ise onun uzuvlarıdır" sözü hangi anlama gelir?`, options: [`Dünya barışının önemine vurgu yapılması`, `Askerî güce öncelik verilmesi gerektiği`, `Milletlerin birbirinden kopuk olduğu`, `Devletlerin sömürgeler edinmesi gerektiği`], correctIndex: 0 },
        { question: `Türkiye-Yugoslavya ilişkilerinde hangi pakt önemlidir?`, options: [`Balkan Antantı`, `Saadabat Paktı`, `Montrö Sözleşmesi`, `Ankara Antlaşması`], correctIndex: 0 },
        { question: `Saadabat Paktı sonrası Türkiye dış politikasında hangi kazanç sağlanmıştır?`, options: [`Doğu sınırlarının güvenliği`, `Batı sınırlarının güvenliği`, `Akdeniz hâkimiyeti`, `Karadeniz hâkimiyeti`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikasında en çok hangi devletlerle iyi ilişki kurulmuştur?`, options: [`SSCB, İngiltere ve Balkan ülkeleri`, `Almanya, İtalya ve Japonya devletleri`, `İtalya, Avusturya ve Macaristan`, `Fransa, Suriye ve Irak devletleri`], correctIndex: 0 },
        { question: `Türkiye'nin Akdeniz'de İtalya'ya karşı tedbir alması neyle ilişkilidir?`, options: [`İtalya'nın yayılmacı ve saldırgan tutumu`, `Yunanistan'ın Ege'deki adalar politikası`, `İngiltere'nin Kıbrıs üzerindeki egemenliği`, `Sovyetler'in Boğazlar üzerindeki istekleri`], correctIndex: 0 },
        { question: `Atatürk dönemi sonunda imzalanan Montrö Türkiye için neyi sağladı?`, options: [`Boğazlar üzerinde tam egemenlik hakkı`, `Ege adaları üzerinde tam egemenlik hakkı`, `Musul petrolleri üzerinde pay hakkı`, `Batı Trakya üzerinde denetim hakkı`], correctIndex: 0 },
        { question: `Atatürk'ün Hatay sorununda gösterdiği özellik nedir?`, options: [`Kararlılık ve diplomatik ustalık`, `Sorunun çözümünü Fransa'ya bırakması`, `Askerî çözümü tek yol olarak görmesi`, `Milletler Cemiyeti kararını beklemesi`], correctIndex: 0 },
        { question: `Türkiye Milletler Cemiyetine hangi yıl üye olmuştur?`, options: [`1932`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikasının en önemli sözü nedir?`, options: [`"Yurtta sulh, cihanda sulh"`, `"Egemenlik milletindir"`, `"Vatan sevgisi"`, `"Hattı müdafaa..."`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra Türkiye'nin dış politikası nasıl olmuştur?`, options: [`II. Dünya Savaşı'nda tarafsızlık politikası`, `Almanya'nın yanında savaşa girme politikası`, `Sovyetler'le askerî ittifak kurma politikası`, `Milletler Cemiyeti'nden ayrılma politikası`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politika başarılarının arkasındaki temel faktör nedir?`, options: [`Bağımsızlık, ekonomik ve askerî güç ile diplomasi`, `Yabancı devletlerin desteği ve mali yardımları`, `Ordunun büyütülmesi ve silahlanma yarışına girmesi`, `Sömürge edinme ve toprak genişletme çabası`], correctIndex: 0 },
      ],
    },
    {
      id: "ataturkun-olumu-ve-sonrasi",
      name: `Atatürk'ün Ölümü ve Sonrası`,
      summary: `Atatürk'ün vefatı, İnönü dönemi ve Atatürk'ün mirası.`,
      youtubeId: "",
      mindMap: {
        center: `Atatürk'ün Ölümü ve Sonrası`,
        branches: [
          {
            label: `Atatürk'ün Ölümü`,
            sections: [
              { kind: "kural", content: `10 Kasım 1938 saat 09:05'te Dolmabahçe Sarayı'nda vefat etti. Yerine İsmet İnönü ("Millî Şef") cumhurbaşkanı oldu.` },
              { kind: "ornek", content: `Hastalık: siroz. Cenaze töreni 19 Kasım 1938. Geçici kabir: Etnografya Müzesi. 10 Kasım 1953'te Anıtkabir'e nakledildi.` },
              { kind: "tuzak", content: `Atatürk'ten sonra cumhurbaşkanı Celal Bayar DEĞİL, İsmet İnönü oldu (Celal Bayar 1950'de).` },
            ],
          },
          {
            label: `II. Dünya Savaşı ve Türkiye`,
            sections: [
              { kind: "kural", content: `1939-1945 savaşı süresince Türkiye tarafsız kaldı; 23 Şubat 1945'te müttefikler yanında yer aldı ama fiilen savaşmadı.` },
              { kind: "ornek", content: `Türk diplomasisi: 1939 İngiltere-Fransa ile ittifak, 1941 Almanya ile saldırmazlık paktı (dengeli tutum). 1945'te BM'ye kurucu üye olarak katılmak için Almanya-Japonya'ya savaş ilan etti (fiilen savaşmadan).` },
            ],
          },
          {
            label: `Atatürk'ün Mirası`,
            sections: [
              { kind: "tanim", content: `Laik, çağdaş ve bağımsız Türkiye Cumhuriyeti. Naaşı 10 Kasım 1953'te Anıtkabir'e taşındı.` },
              { kind: "ornek", content: `Kalıcı kurumlar: TBMM, Cumhuriyet, 1924 Anayasası, Türk Tarih ve Dil Kurumları, modern hukuk düzeni, kadın hakları. "Egemenlik kayıtsız şartsız milletindir." ilkesi.` },
            ],
          },
        ],
      },
      cards: [
        {
          front: `Atatürk ne zaman vefat etti?`,
          back: `10 Kasım 1938, Dolmabahçe Sarayı'nda.`,
        },
        {
          front: `Atatürk'ten sonra cumhurbaşkanı kim oldu?`,
          back: `İsmet İnönü ("Millî Şef").`,
        },
        {
          front: `Türkiye II. Dünya Savaşı'nda ne yaptı?`,
          back: `Büyük bölümünde tarafsız kaldı; 1945'te müttefikler safında yer aldı (fiilen savaşmadı).`,
        },
        {
          front: `Atatürk'ün naaşı nereye taşındı?`,
          back: `Anıtkabir'e.`,
        },
      ],
      article: `# Atatürk'ün Ölümü
[kural] Atatürk **10 Kasım 1938**'de **Dolmabahçe Sarayı'nda** vefat etti. Yerine **İsmet İnönü** cumhurbaşkanı oldu ("Millî Şef").
[tuzak] Atatürk'ten sonra cumhurbaşkanı **Celal Bayar değil, İsmet İnönü**'dür (Celal Bayar 1950'de).

# II. Dünya Savaşı ve Türkiye
[kural] **1939-1945** arası süren savaşta Türkiye büyük bölümde **tarafsız** kaldı; 1945'te müttefikler safında yer aldı ama **fiilen savaşmadı**.
[tuzak] Türkiye savaşa baştan Almanya yanında girmedi; çoğunlukla tarafsız kaldı.

# Atatürk'ün Mirası
Atatürk; ilke ve inkılaplarıyla **laik, çağdaş ve bağımsız** bir Türkiye Cumhuriyeti bıraktı. Naaşı Ankara'da **Anıtkabir'e** taşınmıştır.`,
      tips: [
        {
          trap: `Atatürk'ten sonraki cumhurbaşkanı karıştırılır.`,
          wrong: `Atatürk'ten sonra cumhurbaşkanı Celal Bayar oldu.`,
          correct: `Atatürk'ten sonra İsmet İnönü cumhurbaşkanı oldu. Celal Bayar 1950'de cumhurbaşkanı olmuştur.`,
        },
        {
          trap: `Türkiye'nin II. Dünya Savaşı'ndaki tutumu yanlış bilinir.`,
          wrong: `Türkiye II. Dünya Savaşı'na başından itibaren Almanya'nın yanında girdi.`,
          correct: `Türkiye savaşın büyük bölümünde tarafsız kaldı; 1945'te müttefikler safında yer aldı ama fiilen savaşmadı.`,
        },
      ],
      quiz: [
        {
          question: `Atatürk hangi tarihte vefat etmiştir?`,
          options: [`10 Kasım 1938`, `29 Ekim 1938`, `19 Mayıs 1938`, `10 Kasım 1923`],
          correctIndex: 0,
        },
        {
          question: `Atatürk nerede vefat etmiştir?`,
          options: [`Dolmabahçe Sarayı`, `Çankaya Köşkü`, `Anıtkabir`, `Topkapı Sarayı`],
          correctIndex: 0,
        },
        {
          question: `Atatürk'ten sonra cumhurbaşkanı kim olmuştur?`,
          options: [`İsmet İnönü`, `Celal Bayar`, `Fevzi Çakmak`, `Kazım Karabekir`],
          correctIndex: 0,
        },
        {
          question: `II. Dünya Savaşı boyunca Türkiye'nin temel politikası ne olmuştur?`,
          options: [`Tarafsız kalmak`, `Almanya yanında savaşmak`, `İşgale uğramak`, `Sömürge olmak`],
          correctIndex: 0,
        },
        {
          question: `İsmet İnönü'ye verilen unvan hangisidir?`,
          options: [`Millî Şef`, `Başkomutan`, `Halife`, `Padişah`],
          correctIndex: 0,
        },
        {
          question: `Atatürk'ün naaşı hangi anıt mezara taşınmıştır?`,
          options: [`Anıtkabir`, `Dolmabahçe`, `Süleymaniye`, `Topkapı`],
          correctIndex: 0,
        },
        {
          question: `II. Dünya Savaşı hangi yıllar arasında yaşanmıştır?`,
          options: [`1939-1945`, `1914-1918`, `1923-1938`, `1950-1955`],
          correctIndex: 0,
        },
        {
          question: `Atatürk'ün en önemli mirası aşağıdakilerden hangisidir?`,
          options: [
            `Laik ve çağdaş Türkiye Cumhuriyeti`,
            `Saltanat`,
            `Mutlak monarşi`,
            `Halifelik`,
          ],
          correctIndex: 0,
        },
      ],
      quickQuestions: [
        { question: `Atatürk hangi tarihte vefat etmiştir?`, options: [`10 Kasım 1938`, `10 Kasım 1937`, `10 Kasım 1939`, `19 Mayıs 1938`], correctIndex: 0 },
        { question: `Atatürk vefatında saat kaçtı?`, options: [`9'u 5 geçe`, `10'u 5 geçe`, `12'yi 5 geçe`, `8'i 5 geçe`], correctIndex: 0 },
        { question: `Atatürk nerede vefat etmiştir?`, options: [`Dolmabahçe Sarayı (İstanbul)`, `Beylerbeyi Sarayı (İstanbul)`, `Topkapı Sarayı (İstanbul)`, `Çankaya Köşkü (Ankara)`], correctIndex: 0 },
        { question: `Atatürk'ün ardından Cumhurbaşkanı kim seçilmiştir?`, options: [`İsmet İnönü`, `Celal Bayar`, `Adnan Menderes`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `İsmet İnönü Cumhurbaşkanı seçildiğinde TBMM ne yaptı?`, options: [`Oybirliği ile seçti`, `Tartışmayla seçti`, `Halkoylaması yaptı`, `Seçim yapılmadı`], correctIndex: 0 },
        { question: `Atatürk'ün cenazesi ilk olarak nereye defnedilmiştir?`, options: [`Ankara Etnografya Müzesi (geçici)`, `Anıtkabir (doğrudan defnedilmiştir)`, `İstanbul Dolmabahçe Sarayı'na`, `Ankara Çankaya Köşkü bahçesine`], correctIndex: 0 },
        { question: `Atatürk'ün naaşı Anıtkabir'e ne zaman nakledilmiştir?`, options: [`10 Kasım 1953`, `10 Kasım 1938`, `1949`, `1960`], correctIndex: 0 },
        { question: `Anıtkabir nerede yer alır?`, options: [`Ankara'da Rasattepe'de`, `Ankara'da Çankaya'da`, `İstanbul'da Sarayburnu'nda`, `Ankara'da Ulus semtinde`], correctIndex: 0 },
        { question: `Atatürk vefat ettiğinde başta hangi dünya olayı vardı?`, options: [`II. Dünya Savaşı'nın yaklaşması`, `I. Dünya Savaşı'nın sürüyor olması`, `1929 Ekonomik Krizi'nin başlaması`, `Milletler Cemiyeti'nin kurulması`], correctIndex: 0 },
        { question: `İsmet İnönü dönemi (1938-1950) hangi dönemdir?`, options: [`Milli Şef Dönemi`, `Demokrat Parti dönemi`, `Adalet Partisi`, `Cumhuriyet ilanı`], correctIndex: 0 },
        { question: `İsmet İnönü dönemi II. Dünya Savaşı'nda Türkiye nasıl bir politika izlemiştir?`, options: [`Aktif tarafsızlık`, `Almanya yanında savaşa katıldı`, `İngiltere yanında`, `SSCB yanında`], correctIndex: 0, explanation: `Aktif tarafsızlık (savaşa girmemek)` },
        { question: `Türkiye II. Dünya Savaşı'na ne zaman ve hangi tarafta katılmıştır?`, options: [`23 Şubat 1945'te Müttefikler safında simgesel olarak`, `1 Eylül 1939'da Almanya'nın safında fiilen savaşarak`, `22 Haziran 1941'de Sovyetler safında fiilen savaşarak`, `Savaşa hiç katılmayıp sonuna kadar tarafsız kalarak`], correctIndex: 0 },
        { question: `Türkiye'nin II. Dünya Savaşı'na geç katılma nedeni nedir?`, options: [`Savaş sonrası BM'ye kurucu üye olabilmek`, `Almanya'dan silah ve kredi alabilmek için`, `Sovyetler Birliği'nden toprak isteyebilmek`, `Milletler Cemiyeti'ne üye olabilmek için`], correctIndex: 0 },
        { question: `Birleşmiş Milletler (BM) ne zaman kurulmuştur ve Türkiye kurucu üye midir?`, options: [`1945'te kurulmuştur, Türkiye kurucu üyedir`, `1920'de kurulmuştur, Türkiye kurucu üyedir`, `1945'te kurulmuştur, Türkiye 1950'de üye oldu`, `1932'de kurulmuş, Türkiye kurucu üye değildir`], correctIndex: 0 },
        { question: `Köy Enstitüleri hangi yıl ve kimin döneminde açılmıştır?`, options: [`1940, İsmet İnönü dönemi`, `1923, Atatürk dönemi`, `1950, Adnan Menderes dönemi`, `1960`], correctIndex: 0 },
        { question: `Köy Enstitülerinin amacı nedir?`, options: [`Köylere öğretmen yetiştirip kalkındırma`, `Sadece üniversiteye öğrenci hazırlama`, `Sadece askerî eğitim`, `Sadece sanat`], correctIndex: 0 },
        { question: `Köy Enstitülerinin temel amacı neydi?`, options: [`Köylere öğretmen yetiştirmek ve kalkındırmak`, `Şehirlerde sanayi işçisi ve usta yetiştirmek`, `Üniversiteye öğrenci hazırlayan liseler açmak`, `Halka yeni harflerle okuma yazma öğretmek`], correctIndex: 0 },
        { question: `Türkiye'de çok partili hayata gerçek anlamda geçiş ne zaman olmuştur?`, options: [`1946`, `1923`, `1934`, `1980`], correctIndex: 0, explanation: `1946 (Demokrat Parti kurulması ve seçimler)` },
        { question: `Demokrat Parti hangi yıl kurulmuştur?`, options: [`7 Ocak 1946`, `14 Mayıs 1950`, `27 Mayıs 1960`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Demokrat Parti kimler tarafından kurulmuştur?`, options: [`Celal Bayar, Adnan Menderes, Refik Koraltan, Fuad Köprülü`, `Kâzım Karabekir, Rauf Orbay, Ali Fuat Cebesoy, Refet Bele`, `Ali Fethi Okyar, Ahmet Ağaoğlu ve Nuri Conker Bey`, `Mustafa Kemal Atatürk, İsmet İnönü ve Fevzi Çakmak`], correctIndex: 0 },
        { question: `Demokrat Parti hangi tarihte iktidara gelmiştir?`, options: [`14 Mayıs 1950 seçimleriyle`, `7 Ocak 1946 kuruluşuyla`, `21 Temmuz 1946 seçimleriyle`, `27 Mayıs 1960 darbesiyle`], correctIndex: 0 },
        { question: `1950 seçimlerinden sonra Cumhurbaşkanı kim olmuştur?`, options: [`Celal Bayar`, `İsmet İnönü`, `Adnan Menderes`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `1950 seçimlerinden sonra Başbakan kim olmuştur?`, options: [`Adnan Menderes`, `Celal Bayar`, `İsmet İnönü`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `II. Dünya Savaşı'nın bitiminden sonra Türkiye hangi uluslararası kuruluşa kurucu üye oldu?`, options: [`Birleşmiş Milletler`, `Milletler Cemiyeti`, `Sevr`, `İtilaf Devletleri`], correctIndex: 0 },
        { question: `Hatay'ın anavatana katılması hangi cumhurbaşkanı döneminde tamamlanmıştır?`, options: [`İsmet İnönü`, `Mustafa Kemal Atatürk`, `Celal Bayar`, `Adnan Menderes`], correctIndex: 0 },
        { question: `Atatürk'ün vefatından sonra Türkiye'nin II. Dünya Savaşı'ndaki tutumu nasıl olmuştur?`, options: [`Aktif tarafsızlık`, `Almanya yanında savaşa girme`, `İngiltere yanında savaşa girme`, `Bağımsızlığı kaybetme`], correctIndex: 0, explanation: `Aktif tarafsızlık (savaşa girmeme)` },
        { question: `Atatürk dönemi sonrasında onun kurduğu cumhuriyet rejimi nasıl korunmuştur?`, options: [`Anayasa, TBMM ve eğitim kurumlarıyla`, `Padişah egemenliğine dönülerek`, `Halifelik geri getirilerek`, `Saltanat geri getirilerek`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra Türk milletinin ortak amacı ne olmuştur?`, options: [`Atatürk ilkelerini yaşatarak çağdaşlaşmak`, `Saltanat ve halifelik düzenine yeniden dönülmesi`, `Yabancı bir devletin mandası altına girilmesi`, `Tek parti yönetiminin kalıcı hâle getirilmesi`], correctIndex: 0 },
        { question: `Atatürk'ün "En büyük eserim" dediği şey nedir?`, options: [`Türkiye Cumhuriyeti`, `Lozan`, `Çanakkale Zaferi`, `Halifelik`], correctIndex: 0 },
        { question: `Atatürk'ün mirası hangi temel kavramlar üzerine kurulmuştur?`, options: [`Cumhuriyet, laiklik, millî egemenlik, çağdaşlık`, `Saltanat, halifelik, ümmetçilik ve gelenekçilik`, `Meşrutiyet, hanedan, ayrıcalık ve kapitülasyon`, `Manda, himaye, imtiyaz ve yabancı sermaye düzeni`], correctIndex: 0 },
        { question: `Atatürk'ün vasiyetinde mirası kimlere bırakmıştır?`, options: [`Türk Tarih Kurumu ve Türk Dil Kurumu`, `Türk Hava Kurumu ve Kızılay Derneği`, `Ankara Üniversitesi ile Halkevlerine`, `Türkiye İş Bankası ve Ziraat Bankası`], correctIndex: 0, explanation: `Türk Tarih Kurumu ve Türk Dil Kurumu (bilim ve eğitim)` },
        { question: `Atatürk'ün sevdiği kız kardeşi kimdir?`, options: [`Makbule Atadan`, `Zübeyde Hanım`, `Fatma Hanım`, `Ayşe Hanım`], correctIndex: 0 },
        { question: `Atatürk'ün manevi kızlarından hangisi pilot olmuştur?`, options: [`Sabiha Gökçen`, `Afet İnan`, `Ülkü Adatepe`, `Zehra Atatürk`], correctIndex: 0 },
        { question: `Atatürk'ün manevi kızı, tarih ve sosyoloji çalışan kim?`, options: [`Afet İnan`, `Sabiha Gökçen`, `Ülkü Adatepe`, `Makbule Atadan`], correctIndex: 0 },
        { question: `10 Kasım Atatürk'ü Anma Günü neyi simgeler?`, options: [`Atatürk'ün vefat ettiği anma günü`, `Cumhuriyet'in ilan edildiği gündür`, `Atatürk'ün Samsun'a çıktığı gündür`, `TBMM'nin açıldığı yıl dönümüdür`], correctIndex: 0 },
        { question: `Anıtkabir'in mimarları kimlerdir?`, options: [`Emin Onat ve Ahmet Orhan Arda`, `Mimar Kemaleddin ve Vedat Tek`, `Sedad Hakkı Eldem ve Bruno Taut`, `Clemens Holzmeister ve Ernst Egli`], correctIndex: 0 },
        { question: `Anıtkabir hangi tarihte ziyarete açılmıştır?`, options: [`1953`, `1938`, `1960`, `1923`], correctIndex: 0 },
        { question: `Atatürk'ün hayalini kurduğu hedef nedir?`, options: [`Türk milletini çağdaş uygarlık düzeyinin üstüne çıkarmak`, `Osmanlı Devleti'ni eski geniş sınırlarına yeniden ulaştırmak`, `Halifeliği güçlendirip İslam birliğini gerçekleştirmek`, `Batılı devletlerin desteğiyle sanayiyi kurdurmak`], correctIndex: 0 },
        { question: `Atatürk'ün gençlere seslendiği, Nutuk'un sonunda yer alan ünlü metnin adı nedir?`, options: [`Gençliğe Hitabe`, `Saltanat Beyannamesi`, `Halifelik Bildirisi`, `Sevr metni`], correctIndex: 0, explanation: `Gençliğe Hitabe (20 Ekim 1927)` },
        { question: `"Ne mutlu Türküm diyene!" sözü kime aittir?`, options: [`Mustafa Kemal Atatürk`, `Mehmet Akif Ersoy`, `Mehmet Emin Yurdakul`, `Halide Edip Adıvar`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra TBMM'nin aldığı önemli karar hangisidir?`, options: [`Hatay'ın anavatana katılması`, `Saltanatın yeniden kurulması`, `Halifeliğin geri getirilmesi`, `Montrö Sözleşmesi'nin kabulü`], correctIndex: 0 },
        { question: `Atatürk'ün sevdiği müzik türü nedir?`, options: [`Türk halk müziği ve Türk sanat müziği`, `Yalnızca yabancı dilde söylenen şarkılar`, `Sadece askerî bando ve marş müzikleri`, `Sadece dinî içerikli tasavvuf müziği`], correctIndex: 0 },
        { question: `Atatürk'ün okuduğu eserlerin temel ortak özelliği nedir?`, options: [`Tarih, edebiyat, felsefe ve askerlik üzerine`, `Yalnızca dinî ve tasavvufi konular üzerine`, `Yalnızca matematik ve fen bilimleri üzerine`, `Yalnızca coğrafya ve seyahat kitapları üzerine`], correctIndex: 0 },
        { question: `Atatürk'ün "Egemenlik kayıtsız şartsız milletindir" sözü hangi belgede kalıcılaştırılmıştır?`, options: [`1921 Anayasası ve sonraki anayasalar`, `1876 Kanun-i Esasi ve 1909 değişikliği`, `1920 tarihli Misak-ı Millî kararları`, `1923 Lozan Barış Antlaşması'nın metni`], correctIndex: 0 },
        { question: `"Beni görmek demek mutlaka yüzümü görmek değildir. Benim fikirlerimi, benim duygularımı anlıyorsanız ve hissediyorsanız bu kafidir." sözü kime aittir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü Paşa`, `Kâzım Karabekir Paşa`, `Fevzi Çakmak Paşa`], correctIndex: 0 },
        { question: `Atatürk'ün dünyaca tanınan özelliği nedir?`, options: [`Asker, devlet adamı ve reformcu lider`, `Yalnızca başarılı bir cephe komutanı`, `Yalnızca ünlü bir bilim insanı ve yazar`, `Yalnızca dinî önder ve halife kimliği`], correctIndex: 0 },
        { question: `Atatürk'ün vefatından sonra Türk milletinin tutumu nasıl olmuştur?`, options: [`Derin bir yas ve mirasını yaşatma kararlılığı`, `Yönetime karşı yaygın ayaklanma ve kargaşa`, `Saltanata dönüş için halk hareketi başlaması`, `Devlet işlerine karşı ilgisizlik ve kayıtsızlık`], correctIndex: 0 },
        { question: `19 Mayıs hangi günün adıdır?`, options: [`Atatürk'ü Anma, Gençlik ve Spor Bayramı`, `Ulusal Egemenlik ve Çocuk Bayramı Günü`, `Zafer Bayramı ve Türk Ordu Günü`, `Cumhuriyet Bayramı ve Anma Günü`], correctIndex: 0 },
        { question: `23 Nisan hangi bayramdır?`, options: [`Ulusal Egemenlik ve Çocuk Bayramı`, `Atatürk'ü Anma ve Gençlik Bayramı`, `Zafer Bayramı ve Türk Ordu Bayramı`, `Cumhuriyet Bayramı ve Anma Günü`], correctIndex: 0 },
        { question: `30 Ağustos hangi bayramdır?`, options: [`Zafer Bayramı`, `Çocuk Bayramı`, `Ordu Bayramı`, `Spor Bayramı`], correctIndex: 0, explanation: `Zafer Bayramı (Başkomutanlık Meydan Muharebesi 1922)` },
        { question: `29 Ekim hangi bayramdır?`, options: [`Cumhuriyet Bayramı`, `Egemenlik Bayramı`, `Demokrasi Bayramı`, `Kurtuluş Bayramı`], correctIndex: 0 },
      ],
    },
  ],
};
