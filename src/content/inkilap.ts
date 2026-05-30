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
              { kind: "ornek", content: `Musul (1926 Ankara Antlaşması) → İngiltere lehine; petrol gelirinin %10'u 25 yıl Türkiye'ye. Nüfus mübadelesi (1923, Yunanistan ile) → İstanbul Rumları ve Batı Trakya Türkleri hariç. Dış borçlar 1928 ve 1933'te taksitlendirildi; 1954'te tamamen ödendi.` },
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
              { kind: "ornek", content: `Kalıcı kurumlar: TBMM, Cumhuriyet, Türk Tarih ve Dil Kurumları, Anayasa (1924/1961/1982 ile gelişti), modern hukuk düzeni, kadın hakları. "Egemenlik kayıtsız şartsız milletindir." ilkesi.` },
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
    },
  ],
};
