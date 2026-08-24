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
        { question: `Mustafa Kemal'in babasının adı nedir?`, options: [`Ali Rıza Efendi`, `Hasan Bey`, `Ahmet Efendi`, `Mehmet Bey`], correctIndex: 0 },
        { question: `Mustafa Kemal'in annesinin adı nedir?`, options: [`Zübeyde Hanım`, `Hatice Hanım`, `Makbule Hanım`, `Ayşe Hanım`], correctIndex: 0 },
        { question: `Mustafa Kemal'in eğitim aldığı askerî liseler hangisindedir?`, options: [`Manastır Askerî İdadisi`, `Selanik Hukuk`, `İstanbul Tıp`, `Galatasaray`], correctIndex: 0 },
        { question: `Mustafa Kemal'e "Kemal" ismini hangi öğretmeni vermiştir?`, options: [`Matematik öğretmeni Mustafa Bey`, `Tarih öğretmeni`, `Türkçe öğretmeni`, `Resim öğretmeni`], correctIndex: 0 },
        { question: `Mustafa Kemal askerî öğrenimini hangi şehirlerde sırasıyla tamamlamıştır?`, options: [`Selanik (rüştiye) → Manastır (idadi) → İstanbul (Harbiye, Harp Akademisi)`, `Sadece İstanbul`, `Sadece Selanik`, `Sadece Manastır`], correctIndex: 0 },
        { question: `Mustafa Kemal Harp Akademisini hangi yıl bitirmiştir?`, options: [`1905`, `1900`, `1910`, `1915`], correctIndex: 0 },
        { question: `Mustafa Kemal Harp Akademisi sonrası ilk görev yeri neresidir?`, options: [`Şam`, `İstanbul`, `Selanik`, `İzmir`], correctIndex: 0 },
        { question: `Mustafa Kemal Şam'da hangi cemiyeti kurmuştur?`, options: [`Vatan ve Hürriyet Cemiyeti`, `İttihat ve Terakki`, `Müdafaa-i Hukuk`, `Kuvâ-yı Milliye`], correctIndex: 0 },
        { question: `Mustafa Kemal'in katıldığı ilk savaş hangisidir?`, options: [`Trablusgarp Savaşı`, `Balkan Savaşı`, `Çanakkale`, `I. Dünya Savaşı`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı hangi ülkeye karşı yapılmıştır?`, options: [`İtalya`, `İngiltere`, `Fransa`, `Almanya`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı'nda Mustafa Kemal hangi şehirlerde başarı kazanmıştır?`, options: [`Tobruk ve Derne`, `Selanik ve Manastır`, `Şam ve Beyrut`, `İstanbul ve Edirne`], correctIndex: 0 },
        { question: `Trablusgarp Savaşı sonunda imzalanan antlaşma hangisidir?`, options: [`Uşi Antlaşması`, `Lozan`, `Sevr`, `Mondros`], correctIndex: 0 },
        { question: `Mustafa Kemal'i dünyaca tanıtan savaş hangisidir?`, options: [`Çanakkale Savaşı`, `Trablusgarp`, `İnönü`, `Sakarya`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nda Mustafa Kemal'in söylediği meşhur emir nedir?`, options: [`"Ben size taarruzu emretmiyorum, ölmeyi emrediyorum."`, `"Vatan sevgisi imandandır."`, `"Yurtta sulh, cihanda sulh."`, `"Hâkimiyet kayıtsız şartsız milletindir."`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nın yapıldığı tarih hangisidir?`, options: [`1915`, `1914`, `1916`, `1918`], correctIndex: 0 },
        { question: `Çanakkale Savaşı'nın dünya tarihindeki en önemli sonuçlarından biri nedir?`, options: [`Rusya'ya yardım gidememiş, savaş uzamış ve Bolşevik İhtilali'ne ortam hazırlanmıştır`, `Trablusgarp Savaşı durdurulmuştur`, `Balkan Savaşları başlamıştır`, `Sevr Antlaşması iptal edilmiştir`], correctIndex: 0 },
        { question: `Mustafa Kemal Çanakkale'de hangi rütbededir?`, options: [`Yarbay`, `Teğmen`, `General`, `Mareşal`], correctIndex: 0, explanation: `Yarbay (sonradan Albay)` },
        { question: `Çanakkale'de Anafartalar Grup Komutanlığı ne zaman verilmiştir?`, options: [`1915`, `1910`, `1918`, `1923`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Bingazi-Derne mücadelesi hangi savaştır?`, options: [`Trablusgarp`, `Çanakkale`, `Balkan`, `I. Dünya`], correctIndex: 0 },
        { question: `Mustafa Kemal'in askerî yeteneğini gösteren bir özelliği hangisidir?`, options: [`İleri görüşlülük ve liderlik`, `Sadece güzel konuşma`, `Sadece sportmenlik`, `Sadece müzik yeteneği`], correctIndex: 0 },
        { question: `Mustafa Kemal'in okuduğu kitaplar hangi alanlardadır?`, options: [`Tarih, edebiyat, askerlik, felsefe`, `Sadece tarih`, `Sadece edebiyat`, `Sadece felsefe`], correctIndex: 0 },
        { question: `Mustafa Kemal'in I. Dünya Savaşı'nda hizmet ettiği cepheler hangileridir?`, options: [`Çanakkale, Kafkas, Suriye-Filistin`, `Sadece Çanakkale`, `Sadece Suriye`, `Sadece Yemen`], correctIndex: 0 },
        { question: `Mustafa Kemal Suriye-Filistin Cephesi'nde hangi orduyu komuta etmiştir?`, options: [`Yıldırım Orduları Grubu`, `1. Ordu`, `Akdeniz Ordusu`, `Boğazlar Ordusu`], correctIndex: 0 },
        { question: `Mondros Ateşkes Antlaşması hangi tarihte imzalanmıştır?`, options: [`30 Ekim 1918`, `30 Ekim 1919`, `30 Ekim 1920`, `30 Ekim 1923`], correctIndex: 0 },
        { question: `Mondros Antlaşması hangi devletle imzalanmıştır?`, options: [`İtilaf Devletleri`, `Sadece İngiltere`, `Sadece Almanya`, `Rusya`], correctIndex: 0, explanation: `İtilaf Devletleri (İngiltere, Fransa, İtalya)` },
        { question: `Mondros Antlaşmasının en tehlikeli maddesi hangisidir?`, options: [`7. madde`, `1. madde`, `2. madde`, `5. madde`], correctIndex: 0, explanation: `7. madde (İtilaf Devletleri istedikleri yeri işgal edebilecek)` },
        { question: `Mondros Antlaşmasından sonra Mustafa Kemal'in görevi nedir?`, options: [`9. Ordu Müfettişliği`, `Başkomutanlık`, `Genelkurmay başkanlığı`, `Padişahlık`], correctIndex: 0, explanation: `9. Ordu Müfettişliği (Samsun'a görevlendirildi)` },
        { question: `Mustafa Kemal Samsun'a hangi tarihte çıkmıştır?`, options: [`19 Mayıs 1919`, `19 Mayıs 1918`, `23 Nisan 1920`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a hangi gemiyle gelmiştir?`, options: [`Bandırma Vapuru`, `Tarık Bin Ziyad`, `Yavuz`, `Sultan Selim`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a çıktığında resmi görevi neydi?`, options: [`9. Ordu Müfettişi`, `Padişah`, `Sadrazam`, `Vali`], correctIndex: 0 },
        { question: `Mustafa Kemal Samsun'a çıkışını sonradan hangi olayın başlangıcı olarak değerlendirmiştir?`, options: [`Türk Kurtuluş Savaşı`, `Padişahlık`, `Siyasi parti kurma`, `Diplomatik geziler`], correctIndex: 0 },
        { question: `Samsun'a çıkmadan önce Mondros'tan kurtarılması istenen yerler nerelerdir?`, options: [`Türk vatanı, milli sınırlar içindeki topraklar`, `Sadece İstanbul`, `Sadece Anadolu`, `Sadece Rumeli`], correctIndex: 0 },
        { question: `Mustafa Kemal'in liderlik özelliklerinden hangisi öne çıkar?`, options: [`Cesaret, kararlılık, ileri görüşlülük`, `Sadece askerlik`, `Sadece siyasetçilik`, `Sadece konuşmacılık`], correctIndex: 0 },
        { question: `Mustafa Kemal'in askerî başarıları nedeniyle aldığı ilk önemli unvan nedir?`, options: [`Anafartalar Kahramanı`, `Mareşal`, `Gazi`, `Atatürk`], correctIndex: 0 },
        { question: `Mustafa Kemal'in tarihteki ilk emri hangi savaşta verilmiştir?`, options: [`Çanakkale Savaşı`, `Balkan Savaşı`, `Trablusgarp`, `Sakarya`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Trablusgarp'a hangi yöntemle ulaştığı bilinir?`, options: [`Sivil kıyafetle Mısır üzerinden`, `Resmî olarak gemiyle`, `Uçakla`, `Trenle`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Selanik'te etkilendiği akımlar hangileridir?`, options: [`Milliyetçilik, Aydınlanma fikirleri`, `Sadece dinci akımlar`, `Sadece sosyalist akımlar`, `Hiçbir akım`], correctIndex: 0 },
        { question: `Mustafa Kemal'in matematik öğretmenliği hangi okulda olmuştur?`, options: [`Hiç olmamıştır; öğrenciydi`, `Galatasaray Lisesi`, `Mektebi Sultani`, `İstanbul Üniversitesi`], correctIndex: 0 },
        { question: `Vatan ve Hürriyet Cemiyeti'nin amacı neydi?`, options: [`Osmanlı'da meşrutiyet ve özgürlük mücadelesi`, `Para toplamak`, `Tarım yapmak`, `Sanat`], correctIndex: 0 },
        { question: `Vatan ve Hürriyet Cemiyeti hangi cemiyetle birleşmiştir?`, options: [`İttihat ve Terakki Cemiyeti`, `Müdafaa-i Hukuk`, `Hilal-i Ahmer`, `Kuvâ-yı Milliye`], correctIndex: 0 },
        { question: `İttihat ve Terakki'nin Mustafa Kemal'le ilişkisi nasıldı?`, options: [`Önce üye oldu, sonra siyasi farklarla uzaklaştı`, `Hiç üye olmadı`, `Genel başkandı`, `Sürekli üye kaldı`], correctIndex: 0 },
        { question: `Mustafa Kemal'in eğitim sevdası en çok hangi alana yöneliktir?`, options: [`Türk milletinin eğitimi`, `Sadece din eğitimi`, `Sadece sanat`, `Sadece spor`], correctIndex: 0 },
        { question: `Mustafa Kemal'in büyük amacı hangisidir?`, options: [`Tam bağımsız ve modern bir Türk devleti kurmak`, `Sadece askerî kariyer`, `Sadece zenginleşmek`, `Sadece seyahat etmek`], correctIndex: 0 },
        { question: `Mustafa Kemal'in çocuk yaşta ailesini kaybetmesi onu nasıl etkilemiştir?`, options: [`Kendi kararlarını alıp güçlü olmaya yöneltmiştir`, `Pasifleştirmiştir`, `Hasta etmiştir`, `Hiç etkilememiştir`], correctIndex: 0 },
        { question: `Mustafa Kemal'in en sevdiği derslerden biri hangisidir?`, options: [`Matematik`, `Resim`, `Müzik`, `Spor`], correctIndex: 0 },
        { question: `"Anafartalar Kahramanı" unvanı ne ifade eder?`, options: [`Çanakkale Savaşı'nda gösterdiği büyük başarı`, `Trablusgarp başarısı`, `Sakarya zaferi`, `Cumhuriyet ilanı`], correctIndex: 0 },
        { question: `Mustafa Kemal'in çocukken vatan sevgisi gelişiminde rol oynayan ortam hangisidir?`, options: [`Selanik'in kozmopolit, çok kültürlü ortamı ve Balkan gerilimleri`, `İstanbul`, `İzmir`, `Erzurum`], correctIndex: 0 },
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
        { question: `Mustafa Kemal Samsun'a hangi resmi sıfatla gelmiştir?`, options: [`9. Ordu Müfettişi`, `Padişah`, `Sadrazam`, `Vali`], correctIndex: 0 },
        { question: `Havza Genelgesi hangi tarihte yayımlanmıştır?`, options: [`28 Mayıs 1919`, `19 Mayıs 1919`, `22 Haziran 1919`, `21 Ekim 1919`], correctIndex: 0 },
        { question: `Havza Genelgesinin amacı nedir?`, options: [`Mitingler ve protestolarla işgallere tepki gösterilmesini istemek`, `Yeni vergi koymak`, `Ordu kurmak`, `Cumhuriyet ilan etmek`], correctIndex: 0 },
        { question: `Amasya Genelgesi hangi tarihte yayımlanmıştır?`, options: [`22 Haziran 1919`, `19 Mayıs 1919`, `4 Eylül 1919`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Amasya Genelgesinin en önemli maddesi nedir?`, options: [`"Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir."`, `"Padişah kararlıdır."`, `"Ordumuz güçlüdür."`, `"Avrupa bizi destekler."`], correctIndex: 0 },
        { question: `Amasya Genelgesinde "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır" ifadesi neyi belirtir?`, options: [`Milli egemenlik fikrinin doğuşunu`, `Padişah egemenliğini`, `Yabancı yardımını`, `Ordunun bağımsızlığını`], correctIndex: 0 },
        { question: `Amasya Genelgesinde hangi kongrenin toplanacağı bildirilmiştir?`, options: [`Sivas Kongresi`, `Lozan Kongresi`, `Erzurum Kongresi`, `İzmir Kongresi`], correctIndex: 0 },
        { question: `Mustafa Kemal askerlikten ne zaman istifa etmiştir?`, options: [`8-9 Temmuz 1919 Erzurum'da`, `19 Mayıs 1919 Samsun'da`, `4 Eylül 1919 Sivas'ta`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Erzurum Kongresi hangi tarihte toplanmıştır?`, options: [`23 Temmuz - 7 Ağustos 1919`, `4 - 11 Eylül 1919`, `22 Haziran 1919`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Erzurum Kongresinin özelliği nedir?`, options: [`Bölgesel toplanmış fakat ulusal kararlar almıştır`, `Sadece ulusaldır`, `Sadece bölgesel sınırlarda kalmıştır`, `Resmî hükümet kongresidir`], correctIndex: 0 },
        { question: `"Manda ve himaye kabul olunamaz" kararı ilk olarak nerede alınmıştır?`, options: [`Erzurum Kongresi`, `Sivas Kongresi`, `Amasya Genelgesi`, `Misak-ı Milli`], correctIndex: 0 },
        { question: `Sivas Kongresi hangi tarihte toplanmıştır?`, options: [`4 - 11 Eylül 1919`, `23 Temmuz - 7 Ağustos 1919`, `22 Haziran 1919`, `19 Mayıs 1919`], correctIndex: 0 },
        { question: `Sivas Kongresinin özelliği nedir?`, options: [`Ulusal nitelikli ilk kongre`, `Bölgesel`, `İstanbul hükümeti tarafından düzenlenmiştir`, `İtilaf Devletleri tarafından`], correctIndex: 0 },
        { question: `Sivas Kongresinde tüm cemiyetler hangi adla birleştirilmiştir?`, options: [`Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti`, `Kuvâ-yı Milliye`, `İttihat ve Terakki`, `Vatan Cemiyeti`], correctIndex: 0 },
        { question: `Sivas Kongresinden sonra çıkan gazete hangisidir?`, options: [`İrade-i Milliye`, `Hâkimiyet-i Milliye`, `Tasvir-i Efkâr`, `Tanin`], correctIndex: 0 },
        { question: `Amasya Görüşmeleri kimler arasında yapılmıştır?`, options: [`Temsil Heyeti (M. Kemal) ve İstanbul Hükümeti (Salih Paşa)`, `Sadece padişah`, `Sadece İtilaf Devletleri`, `Yunan ve Türk delegeleri`], correctIndex: 0 },
        { question: `Amasya Görüşmelerinde İstanbul hükümeti hangisini kabul etmiştir?`, options: [`Temsil Heyetini ve Misak-ı Milli'yi tanımıştır`, `Sevr'i`, `Mondros'u`, `Lozan'ı`], correctIndex: 0 },
        { question: `Son Osmanlı Mebusan Meclisi ne zaman açılmıştır?`, options: [`12 Ocak 1920`, `4 Eylül 1919`, `23 Nisan 1920`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Misak-ı Milli kararları hangi mecliste alınmıştır?`, options: [`Son Osmanlı Mebusan Meclisi`, `TBMM`, `Sivas Kongresi`, `Lozan`], correctIndex: 0, explanation: `Son Osmanlı Mebusan Meclisi (28 Ocak 1920)` },
        { question: `Misak-ı Milli kaç maddedir?`, options: [`6 madde`, `5 madde`, `7 madde`, `10 madde`], correctIndex: 0 },
        { question: `Misak-ı Milli'nin en önemli amacı nedir?`, options: [`Türk vatanının bölünmez bütünlüğünü ve tam bağımsızlığını belirlemek`, `Padişahlığı korumak`, `Yeni vergi koymak`, `Yabancı yatırım çekmek`], correctIndex: 0 },
        { question: `İstanbul'un resmi olarak işgali ne zamandır?`, options: [`16 Mart 1920`, `13 Kasım 1918`, `28 Ekim 1918`, `30 Ekim 1918`], correctIndex: 0 },
        { question: `İstanbul'un işgalinden sonra Meclis-i Mebusan ne oldu?`, options: [`Kapatıldı, bazı üyeler tutuklandı`, `Açılış konuştu`, `Cumhuriyet ilan etti`, `Saltanatı kaldırdı`], correctIndex: 0 },
        { question: `TBMM ne zaman açılmıştır?`, options: [`23 Nisan 1920`, `23 Nisan 1919`, `19 Mayıs 1919`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `TBMM'nin açılış yeri neresidir?`, options: [`Ankara`, `İstanbul`, `Sivas`, `Erzurum`], correctIndex: 0 },
        { question: `TBMM'nin ilk başkanı kimdir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü`, `Fevzi Çakmak`, `Kazım Karabekir`], correctIndex: 0 },
        { question: `TBMM'nin özelliklerinden biri nedir?`, options: [`Güçler birliği ilkesini benimsedi`, `Güçler ayrılığı`, `Padişahlığı korudu`, `Saltanatı sürdürdü`], correctIndex: 0, explanation: `Güçler birliği (kuvvetler birliği) ilkesini benimsedi` },
        { question: `TBMM'ye karşı çıkan ayaklanmalar genelde kimler tarafından başlatılmıştır?`, options: [`İstanbul hükümetine bağlı bazı gruplar ve dış destekli iç isyancılar`, `Tüm Anadolu halkı`, `Sadece askerler`, `Sadece kadınlar`], correctIndex: 0 },
        { question: `Sevr Antlaşması hangi tarihte imzalanmıştır?`, options: [`10 Ağustos 1920`, `30 Ekim 1918`, `24 Temmuz 1923`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Sevr Antlaşmasını TBMM tanıdı mı?`, options: [`Hayır`, `Evet`, `Sadece bir maddesini`, `Sadece bir kısmını`], correctIndex: 0 },
        { question: `Sevr Antlaşmasına göre İstanbul ne olacaktı?`, options: [`Boğazlar uluslararası bir komisyonca yönetilecek`, `Türkiye'nin başkenti`, `Yunanistan'a verilecek`, `Bağımsız bir devlet olacak`], correctIndex: 0 },
        { question: `Kuvâ-yı Milliye nedir?`, options: [`Düzenli ordu kurulana kadar bölgesel direniş örgütleri`, `Padişah ordusu`, `Yunan ordusu`, `İngiliz birlikleri`], correctIndex: 0 },
        { question: `Kuvâ-yı Milliye'nin yerini hangi ordu almıştır?`, options: [`Düzenli Türk Ordusu`, `Yeniçeri Ocağı`, `Osmanlı Hassa Ordusu`, `İttihatçı ordu`], correctIndex: 0, explanation: `Düzenli Türk Ordusu (TBMM ordusu)` },
        { question: `Hıyanet-i Vataniye Kanunu hangi amaçla çıkarılmıştır?`, options: [`TBMM'ye karşı çıkan ayaklanmaları bastırmak için`, `Vergi toplamak için`, `Yeni ordu kurmak için`, `Cumhuriyet ilan etmek için`], correctIndex: 0 },
        { question: `İstiklal Mahkemeleri hangi amaçla kurulmuştur?`, options: [`Asayişi sağlamak, isyancıları yargılamak`, `Anayasa yapmak`, `Ekonomi düzenlemek`, `Eğitim vermek`], correctIndex: 0 },
        { question: `1921 Anayasası (Teşkilat-ı Esasiye) en önemli maddesi nedir?`, options: [`"Egemenlik kayıtsız şartsız milletindir"`, `Padişahın hakkı`, `Halifelik kaldırıldı`, `Cumhuriyet ilan edildi`], correctIndex: 0 },
        { question: `1921 Anayasası hangi tarihte kabul edilmiştir?`, options: [`20 Ocak 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `3 Mart 1924`], correctIndex: 0 },
        { question: `Milli mücadeleyi destekleyen ilk gazete hangisidir?`, options: [`İrade-i Milliye`, `Hâkimiyet-i Milliye`, `Tasvir`, `Tanin`], correctIndex: 0 },
        { question: `Ankara'da yayımlanan ulusal mücadele gazetesi hangisidir?`, options: [`Hâkimiyet-i Milliye`, `İrade-i Milliye`, `Cumhuriyet`, `Akşam`], correctIndex: 0 },
        { question: `İlk düzenli ordumuzun komutanı kimdir?`, options: [`İsmet Paşa`, `Mustafa Kemal Paşa`, `Fevzi Çakmak`, `Kazım Karabekir`], correctIndex: 0 },
        { question: `Erzurum Kongresinde Temsil Heyeti hangi göreve sahipti?`, options: [`Doğu Anadolu'yu temsil etmek; Mustafa Kemal başkan`, `Sadece İstanbul hükümetini`, `Sadece yabancı devletleri`, `Sadece eğitimi`], correctIndex: 0 },
        { question: `Sivas Kongresinden sonra Temsil Heyetinin görev alanı nasıl genişlemiştir?`, options: [`Bütün vatanın temsilcisi olmuştur`, `Daralmıştır`, `Sadece Sivas'a inmiştir`, `Tamamen kaldırılmıştır`], correctIndex: 0 },
        { question: `Düzce ve Hendek ayaklanmaları kime karşıdır?`, options: [`TBMM ve Mustafa Kemal'e karşı`, `İtilaf Devletlerine karşı`, `Yunanlara karşı`, `Rusya'ya karşı`], correctIndex: 0 },
        { question: `Pontus Rum çetelerine karşı verilen mücadelenin amacı nedir?`, options: [`Karadeniz bölgesinde Rum devleti kurulmasını engellemek`, `Doğu Anadolu'da kalmak`, `İstanbul'a yardım`, `Avrupa'ya gitmek`], correctIndex: 0 },
        { question: `1921 Anayasasında yargı yetkisi kime aittir?`, options: [`TBMM'ye`, `Padişaha`, `Sadrazama`, `Halifeye`], correctIndex: 0, explanation: `TBMM'ye (güçler birliği)` },
        { question: `TBMM'nin açılış konuşmasını kim yapmıştır?`, options: [`Mustafa Kemal Paşa`, `Padişah`, `İsmet Paşa`, `Halife`], correctIndex: 0 },
        { question: `Misak-ı Milli'de "Halkın çoğunluğunun hür iradesiyle" tanınan sınır kavramı nedir?`, options: [`Türk vatanının sınırları`, `Padişahın toprakları`, `İslam topraklarının tamamı`, `Bütün Asya`], correctIndex: 0 },
        { question: `Milli mücadelenin amacı tek cümleyle nedir?`, options: [`Türk milletini tam bağımsızlığa kavuşturmak ve milli egemenliği sağlamak`, `Padişahı korumak`, `Yeni bir imparatorluk kurmak`, `Avrupa'ya katılmak`], correctIndex: 0 },
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
        { question: `I. İnönü Zaferi'nin dış politikadaki önemli sonucu nedir?`, options: [`Londra Konferansına davet edilmemiz`, `Sevr Antlaşması`, `Lozan'ın imzalanması`, `Cumhuriyet ilanı`], correctIndex: 0 },
        { question: `Moskova Antlaşması hangi devletle imzalanmıştır?`, options: [`Sovyet Rusya`, `Yunanistan`, `Almanya`, `İtalya`], correctIndex: 0 },
        { question: `Moskova Antlaşması hangi tarihte imzalanmıştır?`, options: [`16 Mart 1921`, `10 Ağustos 1920`, `24 Temmuz 1923`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `İstiklal Marşı ne zaman kabul edilmiştir?`, options: [`12 Mart 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `10 Kasım 1938`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın sözleri kime aittir?`, options: [`Mehmet Akif Ersoy`, `Yahya Kemal`, `Namık Kemal`, `Ziya Gökalp`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın bestesi kime aittir?`, options: [`Osman Zeki Üngör`, `Cemal Reşit Rey`, `Adnan Saygun`, `Sezai Karakoç`], correctIndex: 0 },
        { question: `II. İnönü Savaşı hangi tarihte yapılmıştır?`, options: [`23 Mart - 1 Nisan 1921`, `6 Ocak 1921`, `23 Ağustos - 13 Eylül 1921`, `26 Ağustos 1922`], correctIndex: 0 },
        { question: `II. İnönü Zaferi sonrası "Siz orada yalnız düşmanı değil, milletin makus talihini de yendiniz." sözünü kim söylemiştir?`, options: [`Mustafa Kemal`, `Padişah`, `İsmet Paşa`, `Fevzi Çakmak`], correctIndex: 0, explanation: `Mustafa Kemal (İsmet Paşa'ya)` },
        { question: `Eskişehir-Kütahya Savaşları'ndan sonra ordu nereye çekilmiştir?`, options: [`Sakarya nehrinin doğusuna`, `İstanbul`, `Erzurum`, `Sivas`], correctIndex: 0 },
        { question: `Tekalif-i Milliye Emirleri hangi savaş öncesi yayımlanmıştır?`, options: [`Sakarya Meydan Muharebesi öncesi`, `Büyük Taarruz öncesi`, `İnönü Savaşları öncesi`, `Dumlupınar öncesi`], correctIndex: 0 },
        { question: `Tekalif-i Milliye Emirlerinin amacı nedir?`, options: [`Orduyu donatmak için milletten yardım toplamak`, `Vergi artırmak`, `Yabancı yardım çağırmak`, `Cumhuriyet ilan etmek`], correctIndex: 0 },
        { question: `Mustafa Kemal'e Başkomutanlık yetkisi ne zaman verilmiştir?`, options: [`5 Ağustos 1921`, `23 Nisan 1920`, `29 Ekim 1923`, `30 Ağustos 1922`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi hangi tarihte yapılmıştır?`, options: [`23 Ağustos - 13 Eylül 1921`, `6-10 Ocak 1921`, `26 Ağustos - 9 Eylül 1922`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi sonunda Mustafa Kemal'e hangi unvan verilmiştir?`, options: [`Mareşallik ve Gazi unvanı`, `Padişahlık`, `Halifelik`, `Sadrazamlık`], correctIndex: 0 },
        { question: `Sakarya Meydan Muharebesi sırasında Mustafa Kemal'in meşhur sözü nedir?`, options: [`"Hattı müdafaa yoktur, sathı müdafaa vardır. O satıh bütün vatandır."`, `"Vatan sevgisi imandandır."`, `"Hâkimiyet kayıtsız şartsız milletindir."`, `"Yurtta sulh, cihanda sulh."`], correctIndex: 0 },
        { question: `Kars Antlaşması hangi devletlerle imzalanmıştır?`, options: [`Sovyet etkisindeki Kafkas Cumhuriyetleri`, `Yunanistan`, `İngiltere`, `Almanya`], correctIndex: 0, explanation: `Sovyet etkisindeki Kafkas Cumhuriyetleri (Azerbaycan, Ermenistan, Gürcistan)` },
        { question: `Ankara Antlaşması hangi devletle imzalanmıştır?`, options: [`Fransa`, `İngiltere`, `İtalya`, `Yunanistan`], correctIndex: 0, explanation: `Fransa (20 Ekim 1921)` },
        { question: `Ankara Antlaşması'nın önemi nedir?`, options: [`Güney Cephesi kapanmış, Hatay dışında bugünkü güney sınırımız çizilmiştir`, `Doğu Cephesi kapanmıştır`, `Lozan imzalanmıştır`, `Sevr imzalanmıştır`], correctIndex: 0 },
        { question: `Büyük Taarruz hangi tarihte başlamıştır?`, options: [`26 Ağustos 1922`, `30 Ağustos 1922`, `9 Eylül 1922`, `23 Nisan 1920`], correctIndex: 0 },
        { question: `Başkomutanlık Meydan Muharebesi hangi tarihte kazanılmıştır?`, options: [`30 Ağustos 1922`, `26 Ağustos 1922`, `9 Eylül 1922`, `13 Eylül 1921`], correctIndex: 0 },
        { question: `Mustafa Kemal'in Büyük Taarruz öncesi söylediği meşhur emir nedir?`, options: [`"Ordular ilk hedefiniz Akdeniz'dir, ileri!"`, `"Hattı müdafaa yoktur..."`, `"Yurtta sulh..."`, `"Hâkimiyet milletindir..."`], correctIndex: 0 },
        { question: `İzmir'in işgalden kurtuluş tarihi hangisidir?`, options: [`9 Eylül 1922`, `30 Ağustos 1922`, `26 Ağustos 1922`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mudanya Ateşkesi hangi tarihte imzalanmıştır?`, options: [`11 Ekim 1922`, `24 Temmuz 1923`, `30 Ekim 1918`, `29 Ekim 1923`], correctIndex: 0 },
        { question: `Mudanya Ateşkesinin önemi nedir?`, options: [`Doğu Trakya savaşsız geri alınmıştır`, `Cumhuriyet ilan edilmiştir`, `Lozan imzalanmıştır`, `Saltanat kaldırılmıştır`], correctIndex: 0 },
        { question: `Saltanat hangi tarihte kaldırılmıştır?`, options: [`1 Kasım 1922`, `3 Mart 1924`, `29 Ekim 1923`, `9 Kasım 1922`], correctIndex: 0 },
        { question: `Saltanatın kaldırılmasının nedeni nedir?`, options: [`Lozan'a iki heyet çağrılmasını engellemek`, `Halifeliği kurmak`, `Yeni vergi koymak`, `Eğitim`], correctIndex: 0, explanation: `Lozan'a iki heyet (İstanbul + Ankara) çağrılmasını engellemek` },
        { question: `Lozan Konferansı hangi tarihte başlamıştır?`, options: [`20 Kasım 1922`, `24 Temmuz 1923`, `29 Ekim 1923`, `11 Ekim 1922`], correctIndex: 0 },
        { question: `Lozan Barış Antlaşması hangi tarihte imzalanmıştır?`, options: [`24 Temmuz 1923`, `20 Kasım 1922`, `29 Ekim 1923`, `30 Ağustos 1922`], correctIndex: 0 },
        { question: `Lozan'da Türk heyetinin başkanı kimdir?`, options: [`İsmet İnönü`, `Mustafa Kemal`, `Fevzi Çakmak`, `Rauf Orbay`], correctIndex: 0 },
        { question: `Lozan Antlaşması'nda çözüme bağlanamayıp sonraya bırakılan konu hangisidir?`, options: [`Boğazlar, Hatay ve dış borçlar`, `Cumhuriyet`, `Halifelik`, `Eğitim`], correctIndex: 0 },
        { question: `I. Dünya Savaşı sonrası imzalanan Sevr'le Lozan farkı nedir?`, options: [`Lozan tam bağımsız Türkiye'yi tanımıştır, Sevr ise ağır şartlar içeriyordu`, `İkisi de aynıdır`, `Sevr daha iyiydi`, `Lozan'da Türkiye yenilmiştir`], correctIndex: 0 },
        { question: `I. İnönü Zaferi'nin dış politikadaki önemli sonucu hangisidir?`, options: [`Londra Konferansı'na çağrılmamız`, `Cumhuriyet ilanı`, `Saltanatın kaldırılması`, `Sevr'in imzası`], correctIndex: 0, explanation: `Londra Konferansı'na çağrılmamız (TBMM tanınmaya başlandı)` },
        { question: `Sakarya Zaferi sonrası dış politikadaki sonucu hangisidir?`, options: [`Kars ve Ankara Antlaşmaları`, `Cumhuriyet ilanı`, `Saltanatın kaldırılması`, `Mudanya Ateşkesi`], correctIndex: 0 },
        { question: `Doğu Cephesi'nde Ermenilere karşı kim mücadele etmiştir?`, options: [`Kâzım Karabekir Paşa`, `İsmet Paşa`, `Mustafa Kemal Paşa`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `Gümrü Antlaşması hangi devletle imzalanmıştır?`, options: [`Ermenistan`, `Yunanistan`, `Sovyet Rusya`, `İngiltere`], correctIndex: 0 },
        { question: `Gümrü Antlaşması'nın TBMM açısından önemi nedir?`, options: [`İlk siyasi ve askeri başarısıdır`, `Cumhuriyet ilanıdır`, `Saltanat kaldırılışıdır`, `Lozan'ın başlangıcıdır`], correctIndex: 0, explanation: `İlk siyasi ve askeri başarısıdır (Doğu Cephesi kapandı)` },
        { question: `Çukurova bölgesinde Fransızlara karşı verilen direnişlerin lideri kim olarak öne çıkar?`, options: [`Kara Fatma ve yerli kuvvetler`, `Mustafa Kemal şahsen`, `İsmet Paşa`, `Padişah`], correctIndex: 0, explanation: `Kara Fatma ve yerli kuvvetler (Kuvâ-yı Milliye)` },
        { question: `Maraş, Antep, Urfa savunmalarına TBMM ne ad vermiştir?`, options: [`"Şanlıurfa, Kahramanmaraş, Gaziantep" gibi onurlandırma`, `İl statüsünden çıkarma`, `Yabancı bölge`, `Tarihsel bölge`], correctIndex: 0 },
        { question: `İstiklal Marşı'nın güftesi yarışması hangi yıllarda yapılmıştır?`, options: [`1920-1921`, `1923`, `1924`, `1938`], correctIndex: 0, explanation: `1920-1921 (TBMM 12 Mart 1921'de kabul etti)` },
        { question: `Tekalif-i Milliye Emirleri toplam kaç maddedir?`, options: [`10`, `5`, `15`, `20`], correctIndex: 0 },
        { question: `Mudanya Ateşkesinin imzalanmasında etkili devletler kimlerdir?`, options: [`Türkiye + İngiltere, Fransa, İtalya + Yunanistan`, `Sadece Yunanistan`, `Sadece İtalya`, `Sadece Almanya`], correctIndex: 0 },
        { question: `Sakarya Savaşı'nın stratejik önemi nedir?`, options: [`Türk ordusunun savunmadan taarruza geçtiği dönüm noktasıdır`, `Cumhuriyet ilanıdır`, `Saltanatın kaldırılışıdır`, `Lozan başlangıcıdır`], correctIndex: 0 },
        { question: `Türk milletinin "Milli Mücadele Ruhu" nasıl ifade edilir?`, options: [`Birlik, fedakârlık, vatan sevgisi ve kararlılık`, `Kaybetme korkusu`, `Sadece askerî güç`, `Sadece ekonomik güç`], correctIndex: 0 },
        { question: `Düzenli ordunun kurulması neden zorunlu olmuştur?`, options: [`Kuvâ-yı Milliye yetersiz, dağınık ve disiplinsiz kalmaya başlamıştı`, `Para tasarrufu`, `Yabancı baskı`, `Padişah emri`], correctIndex: 0 },
        { question: `Lozan'ın 24 Temmuz 1923'te imzalanması Türkiye için ne anlama gelir?`, options: [`Tam bağımsız ve uluslararası alanda tanınan yeni Türkiye'nin tapusu`, `Sevr'in yenilenmesi`, `Mondros'un yenilenmesi`, `Yenilgi`], correctIndex: 0 },
        { question: `Misak-ı Milli'nin Lozan'da kazanılmasını sağlayan zafer hangisidir?`, options: [`Büyük Taarruz ve Başkomutanlık Meydan Muharebesi`, `Mondros`, `Sevr`, `1921 Anayasası`], correctIndex: 0 },
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
        { question: `Atatürk'ün 6 ilkesi hangileridir?`, options: [`Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık`, `Demokrasi, Eşitlik, Özgürlük, Hak, Kanun, Düzen`, `Bilim, Sanat, Kültür, Eğitim, Çalışma, Üretim`, `Tarım, Sanayi, Ticaret, Eğitim, Sağlık, Spor`], correctIndex: 0 },
        { question: `Cumhuriyetçilik ilkesi neyi ifade eder?`, options: [`Egemenliğin millete ait olduğu yönetim biçimi`, `Padişahın yönetimi`, `Halifenin yönetimi`, `Yabancı yönetimi`], correctIndex: 0 },
        { question: `Cumhuriyet hangi tarihte ilan edilmiştir?`, options: [`29 Ekim 1923`, `23 Nisan 1920`, `3 Mart 1924`, `9 Eylül 1922`], correctIndex: 0 },
        { question: `Cumhuriyetin ilk Cumhurbaşkanı kimdir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü`, `Celal Bayar`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `Cumhuriyetin ilk Başbakanı kimdir?`, options: [`İsmet İnönü`, `Atatürk`, `Celal Bayar`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `Milliyetçilik ilkesi neye dayanır?`, options: [`Türk milletinin birliği, dili ve kültürel kimliği`, `Irk ayrımcılığı`, `Din ayrımcılığı`, `Sınıf ayrımcılığı`], correctIndex: 0 },
        { question: `Halkçılık ilkesi neyi ifade eder?`, options: [`Halkın eşitliği, sınıf ayrımının olmaması`, `Padişahın gücü`, `Halifenin gücü`, `Tek partili sistem`], correctIndex: 0 },
        { question: `Devletçilik ilkesi neyi ifade eder?`, options: [`Devletin ekonomide aktif rol oynaması`, `Padişah ekonomisi`, `Tamamen serbest piyasa`, `Yabancı yatırım`], correctIndex: 0 },
        { question: `Laiklik ilkesi neyi ifade eder?`, options: [`Din ile devlet işlerinin ayrılması`, `Dinin yasak olması`, `Halifenin sürekliliği`, `Dini yönetim`], correctIndex: 0 },
        { question: `İnkılapçılık ilkesi neyi ifade eder?`, options: [`Sürekli yenilik ve çağdaşlaşma`, `Eski düzene dönüş`, `Padişahlık`, `Halifelik`], correctIndex: 0 },
        { question: `Atatürk'ün ilkelerini bütünleyen ilkeler hangileridir?`, options: [`Milli egemenlik, milli birlik ve beraberlik, yurtta sulh-cihanda sulh, akılcılık ve bilimsellik`, `Sadece bilim`, `Sadece sanat`, `Sadece spor`], correctIndex: 0 },
        { question: `Halifelik ne zaman kaldırılmıştır?`, options: [`3 Mart 1924`, `1 Kasım 1922`, `29 Ekim 1923`, `9 Eylül 1922`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılmasıyla birlikte hangi kurumlar da kaldırılmıştır?`, options: [`Şer'iye ve Evkaf Vekaleti, Erkân-ı Harbiye Vekaleti`, `TBMM`, `Cumhuriyet`, `Başbakanlık`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat Kanunu (Öğretim Birliği) ne zaman çıkarılmıştır?`, options: [`3 Mart 1924`, `29 Ekim 1923`, `1 Kasım 1922`, `1925`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat Kanunu neyi sağlamıştır?`, options: [`Tüm okulların Milli Eğitim Bakanlığına bağlanması`, `Padişah okulu açılması`, `Yabancı okulların artması`, `Yeni vergi`], correctIndex: 0 },
        { question: `1924 Anayasası ne zaman kabul edilmiştir?`, options: [`20 Nisan 1924`, `23 Nisan 1920`, `29 Ekim 1923`, `3 Mart 1924`], correctIndex: 0 },
        { question: `Şapka Kanunu ne zaman çıkarılmıştır?`, options: [`25 Kasım 1925`, `3 Mart 1924`, `29 Ekim 1923`, `1928`], correctIndex: 0 },
        { question: `Şapka Kanununun amacı nedir?`, options: [`Kıyafetin modernleştirilmesi`, `Para tasarrufu`, `Sıcaklık`, `Yeni vergi`], correctIndex: 0 },
        { question: `Tekke ve zaviyeler ne zaman kapatılmıştır?`, options: [`30 Kasım 1925`, `25 Kasım 1925`, `3 Mart 1924`, `1928`], correctIndex: 0 },
        { question: `Miladi takvim (uluslararası takvim) ne zaman kabul edilmiştir?`, options: [`26 Aralık 1925`, `1928`, `1934`, `1923`], correctIndex: 0 },
        { question: `Türk Medeni Kanunu ne zaman kabul edilmiştir?`, options: [`17 Şubat 1926`, `1924`, `1923`, `1934`], correctIndex: 0 },
        { question: `Türk Medeni Kanunu hangi ülkenin medeni kanunundan alınmıştır?`, options: [`İsviçre`, `Almanya`, `Fransa`, `İtalya`], correctIndex: 0 },
        { question: `Medeni Kanun ile kadınlara hangi haklar verilmiştir?`, options: [`Miras, boşanma, şahitlik, tek eşlilik gibi haklar`, `Seçme-seçilme`, `Eğitim`, `Çalışma`], correctIndex: 0 },
        { question: `Latin (yeni Türk) harfleri ne zaman kabul edilmiştir?`, options: [`1 Kasım 1928`, `1923`, `1934`, `1925`], correctIndex: 0 },
        { question: `Millet Mektepleri ne amaçla açılmıştır?`, options: [`Halka yeni harflerle okuma-yazma öğretmek`, `Üniversite eğitimi`, `Sanat öğretimi`, `Müzik eğitimi`], correctIndex: 0 },
        { question: `Türk Tarih Kurumu ne zaman kurulmuştur?`, options: [`1931`, `1932`, `1923`, `1928`], correctIndex: 0 },
        { question: `Türk Dil Kurumu ne zaman kurulmuştur?`, options: [`1932`, `1931`, `1923`, `1928`], correctIndex: 0 },
        { question: `Türk kadını seçme-seçilme hakkını ne zaman kazanmıştır?`, options: [`5 Aralık 1934`, `1923`, `1930`, `1924`], correctIndex: 0, explanation: `5 Aralık 1934 (genel seçimlerde)` },
        { question: `Türk kadınına yerel seçimlerde seçme-seçilme hakkı ne zaman tanındı?`, options: [`1930`, `1923`, `1934`, `1924`], correctIndex: 0 },
        { question: `Soyadı Kanunu ne zaman çıkarılmıştır?`, options: [`21 Haziran 1934`, `1923`, `1928`, `1924`], correctIndex: 0 },
        { question: `"Atatürk" soyadı Mustafa Kemal'e ne zaman ve nasıl verilmiştir?`, options: [`24 Kasım 1934 TBMM kararıyla`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Kadın-erkek eşitliği için yapılan en önemli inkılaplardan biri hangisidir?`, options: [`Medeni Kanun ve seçme-seçilme hakkı`, `Halifelik`, `Saltanat`, `Tekke ve zaviyeler`], correctIndex: 0 },
        { question: `Ölçü ve tartı sistemi (kilo, metre vb.) ne zaman kabul edilmiştir?`, options: [`1931`, `1928`, `1923`, `1934`], correctIndex: 0 },
        { question: `Hafta tatili Cumadan Pazara hangi yıl kaymıştır?`, options: [`1935`, `1923`, `1924`, `1928`], correctIndex: 0 },
        { question: `İzmir İktisat Kongresi hangi tarihte toplanmıştır?`, options: [`17 Şubat - 4 Mart 1923`, `1924`, `1925`, `1928`], correctIndex: 0 },
        { question: `İzmir İktisat Kongresinin amacı nedir?`, options: [`Milli ekonomi politikalarını belirlemek`, `Saltanat`, `Cumhuriyet`, `Halifelik`], correctIndex: 0 },
        { question: `Aşar (öşür) vergisi ne zaman kaldırılmıştır?`, options: [`1925`, `1923`, `1928`, `1934`], correctIndex: 0 },
        { question: `İlk demir yolu inşası Cumhuriyet döneminde hangi proje ile başlamıştır?`, options: [`Ankara-Sivas, Samsun-Sivas hatları gibi yeni demiryolları`, `Sadece İstanbul`, `Sadece İzmir`, `Sadece Konya`], correctIndex: 0 },
        { question: `Etibank ne zaman kurulmuştur?`, options: [`1935`, `1923`, `1924`, `1938`], correctIndex: 0 },
        { question: `Sümerbank ne zaman kurulmuştur?`, options: [`1933`, `1923`, `1934`, `1938`], correctIndex: 0 },
        { question: `1. Beş Yıllık Sanayi Planı hangi yıllarda uygulanmıştır?`, options: [`1934-1939`, `1923-1928`, `1929-1933`, `1939-1944`], correctIndex: 0 },
        { question: `Devletçilik ilkesinin uygulanmasında etkili olan kriz hangisidir?`, options: [`1929 Dünya Ekonomik Krizi`, `Lozan Konferansı`, `Sevr Antlaşması`, `Mondros`], correctIndex: 0 },
        { question: `İnkılapların ortak amacı nedir?`, options: [`Türk milletini çağdaş medeniyet seviyesine çıkarmak`, `Padişahlığı sürdürmek`, `Halifeliği yaşatmak`, `Yabancı egemenliği`], correctIndex: 0 },
        { question: `Çağdaşlaşma için temel atılan adımlardan biri hangisidir?`, options: [`Eğitim, hukuk, kültür ve ekonomide modernleşme`, `Geleneksel hayatın korunması`, `Eski düzenin sürdürülmesi`, `Yabancı yönetim`], correctIndex: 0 },
        { question: `İnkılapların başarısı için temel koşul nedir?`, options: [`Halkın benimsemesi ve sürekliliği`, `Yabancı yardım`, `Padişah desteği`, `Halife desteği`], correctIndex: 0 },
        { question: `Laikliğin temel anayasal kanıtı hangi yıl Anayasaya eklenmiştir?`, options: [`1937`, `1924`, `1923`, `1928`], correctIndex: 0 },
        { question: `1924 Anayasasından "Devletin dini İslam'dır" ifadesi ne zaman çıkarılmıştır?`, options: [`1928`, `1937`, `1934`, `1924`], correctIndex: 0 },
        { question: `Anayasaya "Türkiye Cumhuriyeti laiktir" ibaresi ne zaman eklenmiştir?`, options: [`1937`, `1928`, `1924`, `1934`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılması ile laiklik ilkesi arasında nasıl bir bağ vardır?`, options: [`Laikliğin temeli olmuştur`, `Hiç ilgisi yoktur`, `Tam zıttıdır`, `Bağımsızdır`], correctIndex: 0, explanation: `Laikliğin temeli olmuştur (din-devlet ayrımı için gereklidir)` },
        { question: `Eğitim inkılaplarının ortak amacı nedir?`, options: [`Birlikli, çağdaş ve bilimsel eğitim oluşturmak`, `Sadece dini eğitim`, `Sadece askerî eğitim`, `Sadece tarım eğitimi`], correctIndex: 0 },
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
        { question: `Cumhuriyetimizin ilk siyasi partisi hangisidir?`, options: [`Cumhuriyet Halk Fırkası`, `Demokrat Parti`, `Adalet Partisi`, `Halk Partisi`], correctIndex: 0 },
        { question: `Cumhuriyet Halk Fırkası ne zaman kurulmuştur?`, options: [`9 Eylül 1923`, `29 Ekim 1923`, `3 Mart 1924`, `1930`], correctIndex: 0 },
        { question: `Cumhuriyet Halk Fırkasının kurucusu kimdir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü`, `Celal Bayar`, `Fethi Okyar`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkası ne zaman kurulmuştur?`, options: [`17 Kasım 1924`, `1923`, `1930`, `1934`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkasının kurucuları kimlerdir?`, options: [`Kâzım Karabekir, Rauf Orbay, Refet Bele, Adnan Adıvar, Ali Fuat Cebesoy`, `Atatürk ve İsmet`, `Celal Bayar ve Atatürk`, `Fethi Okyar tek başına`], correctIndex: 0 },
        { question: `Terakkiperver Cumhuriyet Fırkası ne zaman kapatılmıştır?`, options: [`Şeyh Sait İsyanı sonrası 1925`, `1934`, `1930`, `1938`], correctIndex: 0 },
        { question: `Şeyh Sait İsyanı ne zaman çıkmıştır?`, options: [`1925`, `1923`, `1930`, `1924`], correctIndex: 0 },
        { question: `Şeyh Sait İsyanı'nın bastırılması için hangi kanun çıkarılmıştır?`, options: [`Takrir-i Sükûn Kanunu`, `Hıyanet-i Vataniye`, `Soyadı Kanunu`, `Şapka Kanunu`], correctIndex: 0 },
        { question: `Takrir-i Sükûn Kanunu hangi yıllar arasında yürürlükte kalmıştır?`, options: [`1925-1929`, `1923-1930`, `1928-1934`, `1934-1938`], correctIndex: 0 },
        { question: `Atatürk'e suikast girişimi hangi yıl ve nerede olmuştur?`, options: [`1926 İzmir`, `1925 Ankara`, `1930 İstanbul`, `1934 Bursa`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkası ne zaman kurulmuştur?`, options: [`12 Ağustos 1930`, `1923`, `1934`, `1925`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kurucusu kimdir?`, options: [`Fethi Okyar`, `Atatürk`, `İsmet İnönü`, `Celal Bayar`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kuruluş amacı nedir?`, options: [`Çok partili demokratik hayata geçmek için kontrollü bir muhalefet oluşturmak`, `Halifeliği geri getirmek`, `Padişahlık`, `Yabancı yatırım`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkası ne zaman kapanmıştır?`, options: [`17 Kasım 1930`, `1934`, `1923`, `1938`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasının kapanma nedeni nedir?`, options: [`Partiye rejim karşıtı çevrelerin sızması`, `Para sıkıntısı`, `Yabancı baskı`, `Padişah emri`], correctIndex: 0 },
        { question: `Menemen Olayı ne zaman olmuştur?`, options: [`23 Aralık 1930`, `1925`, `1923`, `1934`], correctIndex: 0 },
        { question: `Menemen Olayında öldürülen subay kimdir?`, options: [`Kubilay`, `İsmet İnönü`, `Fevzi Çakmak`, `Kâzım Karabekir`], correctIndex: 0 },
        { question: `Menemen Olayının önemi nedir?`, options: [`Laiklik karşıtı bir tepkiyi gösterdi; rejim sertleşti`, `Halifelik geri geldi`, `Padişahlık geri geldi`, `Cumhuriyet kuruldu`], correctIndex: 0 },
        { question: `1924 Anayasasında "Devletin dini İslam'dır" ifadesi ne zaman çıkarılmıştır?`, options: [`10 Nisan 1928`, `1924`, `1937`, `1934`], correctIndex: 0 },
        { question: `Çok partili hayata geçiş çabalarının başarısız olmasının nedeni nedir?`, options: [`Cumhuriyet karşıtı çevrelerin partileri istismar etmesi`, `Para yetersizliği`, `Yabancı baskı`, `Halkın istemesi`], correctIndex: 0 },
        { question: `Demokrasinin temel ilkesi nedir?`, options: [`Egemenliğin kayıtsız şartsız millete ait olması`, `Padişah egemenliği`, `Halife egemenliği`, `Tek kişi yönetimi`], correctIndex: 0 },
        { question: `Çok partili demokrasiye geçişin başarılı olduğu yıl hangisidir?`, options: [`1946`, `1923`, `1930`, `1938`], correctIndex: 0, explanation: `1946 (gerçek anlamda, Atatürk dönemi sonrası)` },
        { question: `Atatürk döneminde TBMM seçimleri hangi yöntemle yapılmıştır?`, options: [`İki dereceli seçim`, `Halk oylaması`, `Hiç seçim yapılmadı`, `Padişah atamasıyla`], correctIndex: 0 },
        { question: `Tekke ve zaviyelerin kapatılması hangi ilkeyle bağlantılıdır?`, options: [`Laiklik`, `Devletçilik`, `Halkçılık`, `Milliyetçilik`], correctIndex: 0 },
        { question: `Halifeliğin kaldırılması ile başlayan dönüşüm hangi ilkeyle ilgilidir?`, options: [`Laiklik ve cumhuriyetçilik`, `Sadece milliyetçilik`, `Sadece devletçilik`, `Sadece halkçılık`], correctIndex: 0 },
        { question: `İstiklal Mahkemeleri hangi olaylarda görev yapmıştır?`, options: [`Hıyanet-i Vataniye, Şeyh Sait İsyanı, Atatürk'e suikast davası`, `Sadece Hıyanet-i Vataniye`, `Sadece Şeyh Sait`, `Hiçbiri`], correctIndex: 0 },
        { question: `Atatürk'ün çok partili demokrasiyi sınadığı iki parti hangileridir?`, options: [`Terakkiperver Cumhuriyet Fırkası ve Serbest Cumhuriyet Fırkası`, `CHF ve DP`, `CHF ve AP`, `DP ve AP`], correctIndex: 0 },
        { question: `Serbest Cumhuriyet Fırkasında çok ilgi gösteren bölge neresidir?`, options: [`İzmir ve Ege`, `Doğu Anadolu`, `Karadeniz`, `Trakya`], correctIndex: 0 },
        { question: `Demokratik hayatın temel kurumu hangisidir?`, options: [`TBMM`, `Padişah Sarayı`, `Halifelik`, `Sadrazamlık`], correctIndex: 0, explanation: `TBMM (Türkiye Büyük Millet Meclisi)` },
        { question: `Atatürk'ün "Demokrasi" hakkındaki düşüncesi nedir?`, options: [`Cumhuriyet, demokrasinin en mükemmel halidir`, `Demokrasi gereksizdir`, `Padişahlık daha iyidir`, `Tek parti iyidir`], correctIndex: 0 },
        { question: `1924 Anayasasının özelliği nedir?`, options: [`Türk vatandaşının temel hak ve özgürlüklerini güvence altına almıştır`, `Sadece askerî haklar`, `Sadece padişah hakları`, `Sadece halife hakları`], correctIndex: 0 },
        { question: `Milli egemenlik ilkesini açıkça ortaya koyan inkılap hangisidir?`, options: [`Cumhuriyetin ilanı`, `Halifeliğin kaldırılması`, `Soyadı Kanunu`, `Şapka Kanunu`], correctIndex: 0 },
        { question: `Yurttaşlık kavramının pekiştirilmesi için yapılan inkılap hangisidir?`, options: [`Soyadı Kanunu`, `Halifelik`, `Saltanat`, `Hilal-i Ahmer`], correctIndex: 0 },
        { question: `Atatürk döneminde demokrasiyi engelleyen olaylar hangileridir?`, options: [`Şeyh Sait İsyanı, suikast girişimi, Menemen Olayı`, `Lozan`, `Cumhuriyet ilanı`, `Sevr`], correctIndex: 0 },
        { question: `Demokratikleşmeye katkı sağlayan en önemli kanun nedir?`, options: [`1924 Anayasası`, `Hıyanet-i Vataniye`, `Takrir-i Sükûn`, `Aşar`], correctIndex: 0 },
        { question: `Atatürk dönemi tek partili dönem hangi partidir?`, options: [`Cumhuriyet Halk Fırkası`, `Demokrat Parti`, `Halk Partisi`, `Adalet Partisi`], correctIndex: 0 },
        { question: `TBMM'nin laiklik yolundaki adımı hangisidir?`, options: [`Halifeliğin ve şer'iye vekaletinin kaldırılması`, `Şapka kanunu`, `Soyadı kanunu`, `Yeni Türk harfleri`], correctIndex: 0 },
        { question: `Tevhid-i Tedrisat'ın demokrasiye katkısı nedir?`, options: [`Eşit eğitim fırsatı sağlamak`, `Sadece okul açmak`, `Sadece din eğitimi`, `Sadece askerî eğitim`], correctIndex: 0 },
        { question: `Türkiye'de kadına seçme-seçilme hakkının verilmesi hangi demokratik adımdır?`, options: [`Demokrasinin tüm vatandaşları kapsaması`, `Sadece şehirleri kapsaması`, `Sadece köylüleri kapsaması`, `Sadece askerleri`], correctIndex: 0 },
        { question: `Atatürk'ün "Sonsuza dek yaşatacağımız" dediği ilke hangisidir?`, options: [`Cumhuriyet`, `Halifelik`, `Saltanat`, `Hilafet`], correctIndex: 0 },
        { question: `Cumhuriyet rejiminin korunmasını sağlayan kurumlar hangileridir?`, options: [`TBMM, Anayasa Mahkemesi, Cumhurbaşkanlığı`, `Halifelik`, `Sadrazamlık`, `Padişahlık`], correctIndex: 0 },
        { question: `Atatürk döneminde basın özgürlüğüne yönelik kanun hangisidir?`, options: [`Takrir-i Sükûn döneminde sınırlandırılmıştır`, `Tamamen serbest`, `Halife kararı`, `Padişah kararı`], correctIndex: 0 },
        { question: `Atatürk'e suikast girişimine kim destek vermiştir?`, options: [`İttihatçı bazı isimler ve rejim karşıtları`, `Halk`, `Yabancılar`, `Padişah`], correctIndex: 0 },
        { question: `Demokrasinin gelişmesi için yapılması gereken nedir?`, options: [`Vatandaşlık bilinci, hukuk, eğitim, özgür basın`, `Sadece zenginlik`, `Sadece askerî güç`, `Sadece dini güç`], correctIndex: 0 },
        { question: `Çok partili hayata geçiş denemelerinin Atatürk dönemindeki sonuçları nedir?`, options: [`Toplum henüz hazır değildi, sertlik gerekli oldu`, `Tam başarıyla geçti`, `Hiç denenmedi`, `Yabancı baskı vardı`], correctIndex: 0 },
        { question: `Atatürk'ün demokrasi konusundaki düşüncelerini gösteren sözü nedir?`, options: [`"Cumhuriyet, fikren, ilmen, fennen, bedenen kuvvetli ve yüksek seciyeli muhafızlar ister."`, `"Vatan sevgisi"`, `"Hâkimiyet milletindir"`, `"Yurtta sulh"`], correctIndex: 0 },
        { question: `Atatürk'ün "Egemenlik milletindir" sözü hangi belgede yer almıştır?`, options: [`Amasya Genelgesi ve 1921 Anayasası`, `Lozan`, `Sevr`, `Mondros`], correctIndex: 0 },
        { question: `Köy Enstitüleri hangi yıllar arasında açılmıştır?`, options: [`1940`, `1923`, `1930`, `1925`], correctIndex: 0, explanation: `1940 (Atatürk sonrası, İnönü dönemi)` },
        { question: `Halkevleri ne zaman açılmıştır?`, options: [`1932`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Halkevlerinin amacı nedir?`, options: [`Halka kültür, sanat, eğitim hizmeti vermek`, `Sadece spor`, `Sadece müzik`, `Sadece eğlence`], correctIndex: 0 },
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
        { question: `Türkiye'nin Milletler Cemiyetine üyeliği hangi anlama gelmiştir?`, options: [`Uluslararası alanda saygın bir devlet olarak kabul edilmesi`, `Yenilgi`, `Bağımsızlık kaybı`, `Padişahlık`], correctIndex: 0 },
        { question: `Türkiye'nin Sovyet Rusya ile ilk antlaşması hangisidir?`, options: [`Moskova Antlaşması`, `Lozan`, `Sevr`, `Mondros`], correctIndex: 0 },
        { question: `Saadabat Paktı kimler arasında imzalanmıştır?`, options: [`Türkiye, İran, Irak, Afganistan`, `Sadece Türkiye`, `Türkiye-Yunanistan`, `Türkiye-İtalya`], correctIndex: 0 },
        { question: `Saadabat Paktı ne zaman imzalanmıştır?`, options: [`8 Temmuz 1937`, `1928`, `1934`, `1923`], correctIndex: 0 },
        { question: `Saadabat Paktının amacı nedir?`, options: [`Doğu komşularıyla barışçıl ilişkiler ve sınırların güvenliği`, `Savaş ilanı`, `Yeni vergi`, `Ticaret yasağı`], correctIndex: 0 },
        { question: `Balkan Antantı ne zaman imzalanmıştır?`, options: [`9 Şubat 1934`, `1937`, `1923`, `1938`], correctIndex: 0 },
        { question: `Balkan Antantı kimler arasında imzalanmıştır?`, options: [`Türkiye, Yunanistan, Yugoslavya, Romanya`, `Sadece Türkiye`, `Türkiye-Bulgaristan`, `Türkiye-İtalya`], correctIndex: 0 },
        { question: `Balkan Antantının amacı nedir?`, options: [`Balkanlarda barışı ve sınır güvenliğini korumak`, `Savaş ilanı`, `Yeni vergi`, `Sömürgecilik`], correctIndex: 0 },
        { question: `Montrö Boğazlar Sözleşmesi ne zaman imzalanmıştır?`, options: [`20 Temmuz 1936`, `1923`, `1934`, `1938`], correctIndex: 0 },
        { question: `Montrö Sözleşmesinin önemi nedir?`, options: [`Boğazlar üzerinde Türkiye'nin tam egemenliği sağlandı`, `Boğazlar Rusya'ya verildi`, `Boğazlar İngiltere'ye verildi`, `Boğazlar kapatıldı`], correctIndex: 0 },
        { question: `Lozan'da çözülemeyen hangi mesele Montrö ile çözülmüştür?`, options: [`Boğazlar Komisyonu kaldırılarak Türkiye'nin egemenliğine bırakıldı`, `Hatay`, `Dış borçlar`, `Halifelik`], correctIndex: 0 },
        { question: `Hatay sorunu hangi tarafla yaşanmıştır?`, options: [`Fransa`, `İngiltere`, `İtalya`, `Almanya`], correctIndex: 0 },
        { question: `Hatay Devleti ne zaman kurulmuştur?`, options: [`2 Eylül 1938`, `1923`, `1939`, `1936`], correctIndex: 0 },
        { question: `Hatay anavatana ne zaman katılmıştır?`, options: [`29 Haziran 1939`, `1923`, `1938`, `1934`], correctIndex: 0, explanation: `29 Haziran 1939 (Atatürk öldükten sonra)` },
        { question: `Atatürk'ün dış politikasının özellikleri nelerdir?`, options: [`Gerçekçilik, barışçılık, tam bağımsızlık, hukuk üstünlüğü`, `Savaşçılık`, `Sömürgecilik`, `Yabancı egemenliği`], correctIndex: 0 },
        { question: `Türkiye'nin Yunanistan ile ilişkilerinin düzelmesi hangi olayla başlamıştır?`, options: [`Venizelos'un Ankara ziyareti`, `Lozan`, `Sevr`, `Mondros`], correctIndex: 0 },
        { question: `Türkiye-Yunanistan arasındaki ahali mübadelesi hangi antlaşmada karara bağlanmıştır?`, options: [`Lozan Antlaşması`, `Mondros`, `Sevr`, `Saadabat`], correctIndex: 0 },
        { question: `Lozan Antlaşması'ndan sonra Türkiye ile Yunanistan arasında en büyük sorun neydi?`, options: [`Etabli Rumlar meselesi`, `Hatay`, `Boğazlar`, `Doğu Trakya`], correctIndex: 0 },
        { question: `Atatürk dönemi dış borç ödemesi nasıl yapılmıştır?`, options: [`Düzenli ve zamanında, ekonomik bağımsızlığı destekleyerek`, `Hiç ödenmedi`, `Yabancılara satılarak`, `Toprak vererek`], correctIndex: 0 },
        { question: `Türkiye'nin Almanya ile ekonomik ilişkilerini sınırlandırmasının nedeni nedir?`, options: [`Bağımsızlığı koruma kaygısı`, `Para sıkıntısı`, `Yabancı baskı`, `Padişah emri`], correctIndex: 0 },
        { question: `İkili antlaşmalarla kazanılan dış politika başarıları nelerdir?`, options: [`Misak-ı Milli'nin büyük bölümünün tamamlanması`, `Sevr'in yenilenmesi`, `Mondros'un yenilenmesi`, `Cumhuriyet ilanı`], correctIndex: 0 },
        { question: `İtalya'nın Habeşistan'a saldırması hangi paktı doğurmuştur?`, options: [`Balkan Antantı ve Saadabat Paktı'nın temel motivlerinden biri`, `Lozan`, `Sevr`, `Mondros`], correctIndex: 0 },
        { question: `Türkiye'nin Akdeniz politikasında dikkat ettiği unsur nedir?`, options: [`İtalya'nın Akdeniz'de yayılmasına karşı tedbir`, `Yunan saldırısı`, `Rus baskısı`, `İngiliz baskısı`], correctIndex: 0 },
        { question: `Hatay'ın bağımsız devlet olarak kuruluşu hangi politikanın sonucudur?`, options: [`Diplomatik baskı ve müzakere`, `Savaş`, `İhanet`, `Yabancı baskı`], correctIndex: 0 },
        { question: `Atatürk'ün dış politikadaki vazgeçilmez koşulu nedir?`, options: [`Tam bağımsızlık`, `Yabancı yardım`, `Padişah onayı`, `Halife onayı`], correctIndex: 0 },
        { question: `Atatürk'ün "Yurtta sulh, cihanda sulh" sözünü ilk kez söylediği tarih?`, options: [`20 Nisan 1931`, `29 Ekim 1923`, `1934`, `1938`], correctIndex: 0 },
        { question: `Mübadele neyi ifade eder?`, options: [`Lozan sonrası Türkiye'deki Rumlar ile Yunanistan'daki Türklerin karşılıklı yer değiştirmesi`, `Toprak satışı`, `Para alışverişi`, `Mal alımı`], correctIndex: 0 },
        { question: `Mübadelenin dışında tutulan Rumlar hangileridir?`, options: [`İstanbul Rumları`, `Anadolu Rumları`, `Batı Trakya Türkleri`, `Hiçbiri`], correctIndex: 0 },
        { question: `Mübadelenin dışında tutulan Türkler hangileridir?`, options: [`Batı Trakya Türkleri`, `İstanbul Rumları`, `Hep mübadele edildi`, `Hiçbiri`], correctIndex: 0 },
        { question: `Türkiye-İngiltere arasında Lozan'da çözülemeyen sorun hangisidir?`, options: [`Musul Meselesi`, `Hatay`, `Boğazlar`, `Doğu Trakya`], correctIndex: 0 },
        { question: `Musul Meselesi hangi yıl ve nasıl çözülmüştür?`, options: [`1926 Ankara Antlaşması`, `1923 Lozan`, `1934`, `1938`], correctIndex: 0, explanation: `1926 Ankara Antlaşması (Musul Irak'a bırakıldı)` },
        { question: `Türkiye'nin Sovyet Rusya ile ilişkileri ne zaman bozulmaya başlamıştır?`, options: [`II. Dünya Savaşı yaklaşırken`, `1923 hemen sonra`, `1928`, `1925`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikası kaç ana ilkeye dayanır?`, options: [`Barış, bağımsızlık, eşitlik, akılcılık`, `Sadece bağımsızlık`, `Sadece barış`, `Sadece dostluk`], correctIndex: 0 },
        { question: `1929 Dünya Ekonomik Krizinin Türkiye dış politikasına etkisi nedir?`, options: [`Devletçilik ilkesinin uygulanmasını gerekli kılmıştır`, `Lozan'ı bozdu`, `Cumhuriyet'i kaldırdı`, `Halifeliği geri getirdi`], correctIndex: 0 },
        { question: `Atatürk dönemi sonrası en önemli dış politika başarısı nedir?`, options: [`Hatay'ın anavatana katılması`, `Sevr`, `Mondros`, `Padişahlık`], correctIndex: 0 },
        { question: `Atatürk'ün dış politika ilkelerinden biri olan "akılcılık" ne anlama gelir?`, options: [`Duyguya değil, çıkar ve gerçekliğe dayalı karar`, `Sadece duygu`, `Sadece din`, `Sadece askerlik`], correctIndex: 0 },
        { question: `Türkiye'nin Lozan'da imzaladığı en önemli dış politika kararı nedir?`, options: [`Tam bağımsız Türkiye'nin tanınması`, `Sevr'in yenilenmesi`, `Mondros'un yenilenmesi`, `Yenilgi`], correctIndex: 0 },
        { question: `Atatürk'ün 1933'te söylediği "Bütün insan camiası bir vücut, milletler ise onun uzuvlarıdır" sözü hangi anlama gelir?`, options: [`Dünya barışına vurgu`, `Savaş ilanı`, `Sömürgecilik`, `Padişahlık`], correctIndex: 0 },
        { question: `Türkiye-Yugoslavya ilişkilerinde hangi pakt önemlidir?`, options: [`Balkan Antantı`, `Saadabat`, `Montrö`, `Lozan`], correctIndex: 0 },
        { question: `Saadabat Paktı sonrası Türkiye dış politikasında hangi kazanç sağlanmıştır?`, options: [`Doğu sınırlarının güvenliği`, `Batı sınırlarının güvenliği`, `Akdeniz hâkimiyeti`, `Karadeniz hâkimiyeti`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikasında en çok hangi devletlerle iyi ilişki kurulmuştur?`, options: [`SSCB, İngiltere, Yunanistan, Balkan ülkeleri`, `Sadece Almanya`, `Sadece Japonya`, `Sadece İtalya`], correctIndex: 0 },
        { question: `Türkiye'nin Akdeniz'de İtalya'ya karşı tedbir alması neyle ilişkilidir?`, options: [`İtalya'nın saldırgan politikası`, `Yunan baskısı`, `Rus baskısı`, `Padişah emri`], correctIndex: 0 },
        { question: `Atatürk dönemi sonunda imzalanan Montrö Türkiye için neyi sağladı?`, options: [`Boğazlar üzerinde tam egemenlik`, `Toprak kaybı`, `Para kaybı`, `Yenilgi`], correctIndex: 0 },
        { question: `Atatürk'ün Hatay sorununda gösterdiği özellik nedir?`, options: [`Kararlılık ve dış politika ustalığı`, `Tereddüt`, `Pasiflik`, `Vazgeçme`], correctIndex: 0 },
        { question: `Türkiye Milletler Cemiyetine hangi yıl üye olmuştur?`, options: [`1932`, `1923`, `1928`, `1938`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politikasının en önemli sözü nedir?`, options: [`"Yurtta sulh, cihanda sulh"`, `"Egemenlik milletindir"`, `"Vatan sevgisi"`, `"Hattı müdafaa..."`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra Türkiye'nin dış politikası nasıl olmuştur?`, options: [`II. Dünya Savaşı sürecinde tarafsızlık politikası`, `Saldırgan`, `Yenilgici`, `Yabancı egemenliği kabul`], correctIndex: 0 },
        { question: `Atatürk dönemi dış politika başarılarının arkasındaki temel faktör nedir?`, options: [`Bağımsızlık, ekonomik güç, askerî güç, diplomasi`, `Sadece askerlik`, `Sadece para`, `Sadece dostluk`], correctIndex: 0 },
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
        { question: `Atatürk nerede vefat etmiştir?`, options: [`Dolmabahçe Sarayı (İstanbul)`, `Çankaya Köşkü (Ankara)`, `Beylerbeyi Sarayı`, `Yıldız Sarayı`], correctIndex: 0 },
        { question: `Atatürk'ün ardından Cumhurbaşkanı kim seçilmiştir?`, options: [`İsmet İnönü`, `Celal Bayar`, `Adnan Menderes`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `İsmet İnönü Cumhurbaşkanı seçildiğinde TBMM ne yaptı?`, options: [`Oybirliği ile seçti`, `Tartışmayla seçti`, `Halkoylaması yaptı`, `Seçim yapılmadı`], correctIndex: 0 },
        { question: `Atatürk'ün cenazesi ilk olarak nereye defnedilmiştir?`, options: [`Etnografya Müzesi — geçici defin`, `Anıtkabir doğrudan`, `Dolmabahçe`, `Çankaya`], correctIndex: 0 },
        { question: `Atatürk'ün naaşı Anıtkabir'e ne zaman nakledilmiştir?`, options: [`10 Kasım 1953`, `10 Kasım 1938`, `1949`, `1960`], correctIndex: 0 },
        { question: `Anıtkabir nerede yer alır?`, options: [`Ankara - Rasattepe`, `İstanbul`, `İzmir`, `Samsun`], correctIndex: 0 },
        { question: `Atatürk vefat ettiğinde başta hangi dünya olayı vardı?`, options: [`II. Dünya Savaşı'nın yaklaşması`, `Lozan`, `Cumhuriyet ilanı`, `Sevr`], correctIndex: 0 },
        { question: `İsmet İnönü dönemi (1938-1950) hangi dönemdir?`, options: [`Milli Şef Dönemi`, `Demokrat Parti dönemi`, `Adalet Partisi`, `Cumhuriyet ilanı`], correctIndex: 0 },
        { question: `İsmet İnönü dönemi II. Dünya Savaşı'nda Türkiye nasıl bir politika izlemiştir?`, options: [`Aktif tarafsızlık`, `Almanya yanında savaşa katıldı`, `İngiltere yanında`, `SSCB yanında`], correctIndex: 0, explanation: `Aktif tarafsızlık (savaşa girmemek)` },
        { question: `Türkiye II. Dünya Savaşı'na ne zaman ve hangi tarafta katılmıştır?`, options: [`23 Şubat 1945 - Müttefikler yanında simgesel olarak`, `1939 Almanya yanında`, `1942 Sovyetler yanında`, `Hiç girmedi`], correctIndex: 0 },
        { question: `Türkiye'nin II. Dünya Savaşı'na geç katılma nedeni nedir?`, options: [`Savaş sonrası BM'ye kurucu üye olabilmek`, `Para sıkıntısı`, `Yenilgi korkusu`, `Padişah emri`], correctIndex: 0 },
        { question: `Birleşmiş Milletler (BM) ne zaman kurulmuştur ve Türkiye kurucu üye midir?`, options: [`1945, evet Türkiye kurucu üyedir`, `1923, hayır`, `1950, hayır`, `1938, evet`], correctIndex: 0 },
        { question: `Köy Enstitüleri hangi yıl ve kimin döneminde açılmıştır?`, options: [`1940, İsmet İnönü dönemi`, `1923, Atatürk dönemi`, `1950, Adnan Menderes dönemi`, `1960`], correctIndex: 0 },
        { question: `Köy Enstitülerinin amacı nedir?`, options: [`Köylere öğretmen yetiştirip kalkındırma`, `Sadece üniversiteye öğrenci hazırlama`, `Sadece askerî eğitim`, `Sadece sanat`], correctIndex: 0 },
        { question: `Köy Enstitülerinin temel amacı neydi?`, options: [`Köylere öğretmen yetiştirmek ve kalkındırmak`, `Sadece üniversite hazırlığı`, `Sadece askerî eğitim`, `Sadece sanat eğitimi`], correctIndex: 0 },
        { question: `Türkiye'de çok partili hayata gerçek anlamda geçiş ne zaman olmuştur?`, options: [`1946`, `1923`, `1934`, `1980`], correctIndex: 0, explanation: `1946 (Demokrat Parti kurulması ve seçimler)` },
        { question: `Demokrat Parti hangi yıl kurulmuştur?`, options: [`7 Ocak 1946`, `1923`, `1950`, `1960`], correctIndex: 0 },
        { question: `Demokrat Parti kimler tarafından kurulmuştur?`, options: [`Celal Bayar, Adnan Menderes, Refik Koraltan, Fuad Köprülü`, `Sadece İsmet İnönü`, `Sadece Atatürk`, `Sadece Fevzi Çakmak`], correctIndex: 0 },
        { question: `Demokrat Parti hangi tarihte iktidara gelmiştir?`, options: [`14 Mayıs 1950 seçimleri`, `1946`, `1960`, `1923`], correctIndex: 0 },
        { question: `1950 seçimlerinden sonra Cumhurbaşkanı kim olmuştur?`, options: [`Celal Bayar`, `İsmet İnönü`, `Adnan Menderes`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `1950 seçimlerinden sonra Başbakan kim olmuştur?`, options: [`Adnan Menderes`, `Celal Bayar`, `İsmet İnönü`, `Fevzi Çakmak`], correctIndex: 0 },
        { question: `II. Dünya Savaşı'nın bitiminden sonra Türkiye hangi uluslararası kuruluşa kurucu üye oldu?`, options: [`Birleşmiş Milletler`, `Milletler Cemiyeti`, `Sevr`, `İtilaf Devletleri`], correctIndex: 0 },
        { question: `Hatay'ın anavatana katılması hangi cumhurbaşkanı döneminde tamamlanmıştır?`, options: [`İsmet İnönü`, `Mustafa Kemal Atatürk`, `Celal Bayar`, `Adnan Menderes`], correctIndex: 0 },
        { question: `Atatürk'ün vefatından sonra Türkiye'nin II. Dünya Savaşı'ndaki tutumu nasıl olmuştur?`, options: [`Aktif tarafsızlık`, `Almanya yanında savaşa girme`, `İngiltere yanında savaşa girme`, `Bağımsızlığı kaybetme`], correctIndex: 0, explanation: `Aktif tarafsızlık (savaşa girmeme)` },
        { question: `Atatürk dönemi sonrasında onun kurduğu cumhuriyet rejimi nasıl korunmuştur?`, options: [`Anayasa, TBMM ve eğitim kurumlarıyla`, `Padişah egemenliğine dönülerek`, `Halifelik geri getirilerek`, `Saltanat geri getirilerek`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra Türk milletinin ortak amacı ne olmuştur?`, options: [`Atatürk ilkelerini yaşatmak ve çağdaşlaşmayı sürdürmek`, `Padişahlığa geri dönmek`, `Halifeliği geri kurmak`, `Saltanatı yeniden kurmak`], correctIndex: 0 },
        { question: `Atatürk'ün "En büyük eserim" dediği şey nedir?`, options: [`Türkiye Cumhuriyeti`, `Lozan`, `Çanakkale Zaferi`, `Halifelik`], correctIndex: 0 },
        { question: `Atatürk'ün mirası hangi temel kavramlar üzerine kurulmuştur?`, options: [`Cumhuriyet, laiklik, milli egemenlik, çağdaşlık`, `Padişahlık`, `Halifelik`, `Saltanat`], correctIndex: 0 },
        { question: `Atatürk'ün vasiyetinde mirası kimlere bırakmıştır?`, options: [`Türk Tarih Kurumu ve Türk Dil Kurumu`, `Kendi ailesine`, `Yabancılara`, `Padişaha`], correctIndex: 0, explanation: `Türk Tarih Kurumu ve Türk Dil Kurumu (bilim ve eğitim)` },
        { question: `Atatürk'ün sevdiği kız kardeşi kimdir?`, options: [`Makbule Atadan`, `Zübeyde Hanım`, `Fatma Hanım`, `Ayşe Hanım`], correctIndex: 0 },
        { question: `Atatürk'ün manevi kızlarından hangisi pilot olmuştur?`, options: [`Sabiha Gökçen`, `Afet İnan`, `Ülkü Adatepe`, `Zehra Atatürk`], correctIndex: 0 },
        { question: `Atatürk'ün manevi kızı, tarih ve sosyoloji çalışan kim?`, options: [`Afet İnan`, `Sabiha Gökçen`, `Ülkü Adatepe`, `Makbule Atadan`], correctIndex: 0 },
        { question: `10 Kasım Atatürk'ü Anma Günü neyi simgeler?`, options: [`Atatürk'ün vefat tarihinde anma günü`, `Cumhuriyet ilanı`, `Lozan`, `Mondros`], correctIndex: 0 },
        { question: `Anıtkabir'in mimarları kimlerdir?`, options: [`Emin Onat ve Ahmet Orhan Arda`, `Mimar Sinan`, `Mimar Kemaleddin`, `Mimar Vedat`], correctIndex: 0 },
        { question: `Anıtkabir hangi tarihte ziyarete açılmıştır?`, options: [`1953`, `1938`, `1960`, `1923`], correctIndex: 0 },
        { question: `Atatürk'ün hayalini kurduğu hedef nedir?`, options: [`Türk milletini çağdaş medeniyet seviyesinin üzerine çıkarmak`, `Padişah olmak`, `Halife olmak`, `Yabancı yardımı almak`], correctIndex: 0 },
        { question: `Atatürk'ün gençlere seslendiği, Nutuk'un sonunda yer alan ünlü metnin adı nedir?`, options: [`Gençliğe Hitabe`, `Saltanat Beyannamesi`, `Halifelik Bildirisi`, `Sevr metni`], correctIndex: 0, explanation: `Gençliğe Hitabe (20 Ekim 1927)` },
        { question: `"Ne mutlu Türküm diyene!" sözü kime aittir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü`, `Celal Bayar`, `Fethi Okyar`], correctIndex: 0 },
        { question: `Atatürk'ün ölümünden sonra TBMM'nin aldığı önemli karar hangisidir?`, options: [`Hatay'ın anavatana katılması`, `Halifelik`, `Saltanat`, `Sevr`], correctIndex: 0 },
        { question: `Atatürk'ün sevdiği müzik türü nedir?`, options: [`Türk halk müziği ve Türk sanat müziği`, `Sadece pop müzik`, `Sadece rock`, `Sadece klasik Batı`], correctIndex: 0 },
        { question: `Atatürk'ün okuduğu eserlerin temel ortak özelliği nedir?`, options: [`Tarih, edebiyat, felsefe ve askerlik üzerine`, `Sadece dini eserler`, `Sadece spor`, `Sadece sanat`], correctIndex: 0 },
        { question: `Atatürk'ün "Egemenlik kayıtsız şartsız milletindir" sözü hangi belgede kalıcılaştırılmıştır?`, options: [`1921 ve sonraki tüm anayasalar`, `Sadece Sevr`, `Sadece Mondros`, `Sadece Lozan`], correctIndex: 0 },
        { question: `"Beni görmek demek mutlaka yüzümü görmek değildir. Benim fikirlerimi, benim duygularımı anlıyorsanız ve hissediyorsanız bu kafidir." sözü kime aittir?`, options: [`Mustafa Kemal Atatürk`, `İsmet İnönü`, `Celal Bayar`, `Fethi Okyar`], correctIndex: 0 },
        { question: `Atatürk'ün dünyaca tanınan özelliği nedir?`, options: [`Asker-devlet adamı ve reformcu lider`, `Sadece asker`, `Sadece edebiyatçı`, `Sadece bilim insanı`], correctIndex: 0 },
        { question: `Atatürk'ün vefatından sonra Türk milletinin tutumu nasıl olmuştur?`, options: [`Derin bir yas ve onun mirasını yaşatma kararlılığı`, `Sevinç`, `İlgisizlik`, `Karışıklık`], correctIndex: 0 },
        { question: `19 Mayıs hangi günün adıdır?`, options: [`Atatürk'ü Anma, Gençlik ve Spor Bayramı`, `Cumhuriyet Bayramı`, `Zafer Bayramı`, `Egemenlik Bayramı`], correctIndex: 0 },
        { question: `23 Nisan hangi bayramdır?`, options: [`Ulusal Egemenlik ve Çocuk Bayramı`, `Cumhuriyet`, `Zafer`, `19 Mayıs`], correctIndex: 0 },
        { question: `30 Ağustos hangi bayramdır?`, options: [`Zafer Bayramı`, `Cumhuriyet`, `19 Mayıs`, `23 Nisan`], correctIndex: 0, explanation: `Zafer Bayramı (Başkomutanlık Meydan Muharebesi 1922)` },
        { question: `29 Ekim hangi bayramdır?`, options: [`Cumhuriyet Bayramı`, `Zafer`, `19 Mayıs`, `23 Nisan`], correctIndex: 0 },
      ],
    },
  ],
};
