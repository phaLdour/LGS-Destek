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
            detail: `Mustafa Kemal 1881'de Selanik'te doğdu. Askerî okullarda okudu; matematik öğretmeni ona "Kemal" adını verdi. İstanbul'da Harp Akademisi'ni bitirdi.`,
          },
          {
            label: `Askerî Başarıları`,
            detail: `Trablusgarp Savaşı'nda (Derne-Tobruk) İtalyanlara karşı savaştı. Çanakkale Savaşı'nda (1915) "Anafartalar Kahramanı" olarak ün kazandı.`,
          },
          {
            label: `Fikir Hayatını Etkileyen Şehirler`,
            detail: `Selanik (çok kültürlü yapı, fikir akımları), Manastır (askerî ortam, milliyetçilik) ve İstanbul (siyasi gelişmeler) Mustafa Kemal'i etkiledi.`,
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
      article: `## Hayatı ve Eğitimi
Mustafa Kemal 1881'de Selanik'te doğdu. Askerî eğitim sürecinde başarılı bir öğrenciydi; matematikteki yeteneği nedeniyle öğretmeni ona "Kemal" adını verdi. Öğrenimini İstanbul'daki Harp Akademisi'nde tamamladı.

## Askerî Başarıları
Mustafa Kemal, Trablusgarp Savaşı'nda Derne ve Tobruk'ta İtalyanlara karşı mücadele etti. Çanakkale Savaşı'nda (1915) gösterdiği başarıyla "Anafartalar Kahramanı" olarak tanındı ve ününü artırdı.

## Fikir Hayatını Etkileyen Ortam
Selanik'in çok kültürlü yapısı ve dönemin fikir akımları, Manastır'ın askerî ortamı ve İstanbul'un siyasi gelişmeleri Mustafa Kemal'in düşünce dünyasını şekillendirdi.`,
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
            detail: `30 Ekim 1918'de Mondros Ateşkesi imzalandı; ardından yurdun çeşitli yerleri işgal edildi. 15 Mayıs 1919'da İzmir'in Yunanlılarca işgali tepkileri büyüttü.`,
          },
          {
            label: `Cemiyetler ve Kuvâ-yı Millîye`,
            detail: `İşgallere karşı yararlı (Müdafaa-i Hukuk) ve zararlı cemiyetler kuruldu. Bölgesel silahlı direniş Kuvâ-yı Millîye ile başladı.`,
          },
          {
            label: `Genelgeler ve Kongreler`,
            detail: `Samsun'a çıkış (19 Mayıs 1919), Amasya Genelgesi (22 Haziran 1919), Erzurum Kongresi (23 Temmuz 1919) ve Sivas Kongresi (4 Eylül 1919).`,
          },
          {
            label: `Misak-ı Millî ve TBMM`,
            detail: `28 Ocak 1920'de Misak-ı Millî kararları alındı; 23 Nisan 1920'de TBMM açıldı.`,
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
      article: `## Mondros ve İşgaller
I. Dünya Savaşı'nın ardından 30 Ekim 1918'de Mondros Ateşkes Antlaşması imzalandı. Bu antlaşmaya dayanılarak yurdun birçok yeri işgal edildi. 15 Mayıs 1919'da İzmir'in Yunanlılar tarafından işgali, milletin tepkisini iyice artırdı.

## Cemiyetler ve Kuvâ-yı Millîye
İşgallere karşı bölgesel direniş için yararlı cemiyetler (Müdafaa-i Hukuk) kuruldu; bazı zararlı cemiyetler de ortaya çıktı. Düzenli ordu kuruluncaya kadar mücadeleyi Kuvâ-yı Millîye adı verilen silahlı halk güçleri yürüttü.

## Genelgeler ve Kongreler
Mustafa Kemal 19 Mayıs 1919'da Samsun'a çıktı. Amasya Genelgesi (22 Haziran 1919) ile "Milletin istiklalini yine milletin azim ve kararı kurtaracaktır" denildi. Erzurum Kongresi (23 Temmuz 1919) bölgesel, Sivas Kongresi (4 Eylül 1919) ise millî nitelikteydi; Sivas'ta manda ve himaye kesinlikle reddedildi.

## Misak-ı Millî ve TBMM
Son Osmanlı Mebusan Meclisi 28 Ocak 1920'de Misak-ı Millî kararlarını kabul etti. İstanbul'un işgali üzerine 23 Nisan 1920'de Ankara'da TBMM açıldı.`,
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
            detail: `Kuvâ-yı Millîye düşmanı durdurmakta yetersiz kalınca düzenli ordu kuruldu.`,
          },
          {
            label: `Cepheler`,
            detail: `Doğu Cephesi (Ermenistan), Güney Cephesi (Fransa - Maraş, Antep, Urfa) ve Batı Cephesi (Yunanistan).`,
          },
          {
            label: `Batı Cephesi Zaferleri`,
            detail: `I. İnönü ve II. İnönü (1921), Sakarya Meydan Muharebesi (1921) ve Büyük Taarruz / Başkomutanlık Meydan Muharebesi (26-30 Ağustos 1922).`,
          },
          {
            label: `Antlaşmalar`,
            detail: `Mudanya Ateşkesi (11 Ekim 1922) ve Lozan Barış Antlaşması (24 Temmuz 1923).`,
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
      article: `## Düzenli Orduya Geçiş
Kuvâ-yı Millîye birlikleri düşmanı durdurmakta yetersiz kalınca düzenli ordu kuruldu ve mücadele bu ordu ile sürdürüldü.

## Cepheler
Doğu Cephesi'nde Ermenistan'a, Güney Cephesi'nde (Maraş, Antep, Urfa) Fransa'ya, Batı Cephesi'nde ise Yunanistan'a karşı savaşıldı.

## Batı Cephesi Zaferleri
I. İnönü ve II. İnönü Muharebeleri (1921) kazanıldı. Sakarya Meydan Muharebesi'nde (1921) "Hattı müdafaa yoktur, sathı müdafaa vardır" anlayışıyla zafer kazanıldı; bu zaferden sonra TBMM, Mustafa Kemal'e "Gazi" unvanı ve "Mareşal" rütbesi verdi. 26-30 Ağustos 1922'deki Büyük Taarruz ile düşman yurttan atıldı.

## Antlaşmalar
Mudanya Ateşkesi (11 Ekim 1922) ile silahlar sustu; Lozan Barış Antlaşması (24 Temmuz 1923) ile Türkiye'nin bağımsızlığı dünyaca tanındı.`,
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
            detail: `Saltanatın kaldırılması (1 Kasım 1922), Cumhuriyet'in ilanı (29 Ekim 1923), Halifeliğin kaldırılması (3 Mart 1924).`,
          },
          {
            label: `Hukuk ve Eğitim`,
            detail: `Tevhid-i Tedrisat / Öğretim Birliği (1924), Türk Medeni Kanunu (1926), Harf İnkılabı (1928).`,
          },
          {
            label: `Toplumsal İnkılaplar`,
            detail: `Şapka Kanunu (1925), Soyadı Kanunu (1934), kadınlara seçme-seçilme hakkı (belediye 1930, milletvekili 1934).`,
          },
          {
            label: `Atatürk İlkeleri`,
            detail: `Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik ve İnkılapçılık.`,
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
      article: `## Siyasi İnkılaplar
Saltanat 1 Kasım 1922'de kaldırıldı. 29 Ekim 1923'te Cumhuriyet ilan edildi ve Mustafa Kemal ilk cumhurbaşkanı oldu. Halifelik ise 3 Mart 1924'te kaldırıldı.

## Hukuk ve Eğitim Alanındaki İnkılaplar
3 Mart 1924'te Tevhid-i Tedrisat Kanunu (Öğretim Birliği) ile eğitim tek çatı altında toplandı. 1926'da Türk Medeni Kanunu kabul edildi. 1928'de Harf İnkılabı ile yeni Türk alfabesine geçildi.

## Toplumsal İnkılaplar
Şapka Kanunu (1925) ve Soyadı Kanunu (1934) çıkarıldı. Kadınlara önce belediye (1930), sonra milletvekili seçme ve seçilme hakkı (1934) verildi.

## Atatürk İlkeleri
Atatürkçülüğün temel ilkeleri şunlardır: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik ve İnkılapçılık.`,
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
            detail: `Terakkiperver Cumhuriyet Fırkası (1924, ilk muhalefet partisi) ve Serbest Cumhuriyet Fırkası (1930, Fethi Okyar).`,
          },
          {
            label: `İsyan ve Olaylar`,
            detail: `Şeyh Sait İsyanı (1925) ve Menemen Olayı (1930), çok partili hayata geçiş çabalarını sekteye uğrattı.`,
          },
          {
            label: `Toplumsal Haklar`,
            detail: `Hukuk önünde eşitlik ve kadın hakları alanında önemli adımlar atıldı.`,
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
      article: `## Çok Partili Hayat Denemeleri
Demokrasiyi geliştirmek amacıyla muhalefet partileri kuruldu. 1924'te kurulan Terakkiperver Cumhuriyet Fırkası Cumhuriyet döneminin ilk muhalefet partisidir. 1930'da Fethi Okyar tarafından Serbest Cumhuriyet Fırkası kuruldu.

## İsyan ve Olaylar
1925'teki Şeyh Sait İsyanı, Terakkiperver Cumhuriyet Fırkası'nın kapatılmasına ve çok partili hayata geçişin ertelenmesine yol açtı. 1930'daki Menemen Olayı da rejim aleyhine bir kalkışma olarak demokratikleşmeyi olumsuz etkiledi.

## Toplumsal Haklar
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
            detail: `Musul Sorunu (1926'da İngiltere lehine çözüldü), nüfus mübadelesi ve dış borçlar gibi konular Lozan sonrasında ele alındı.`,
          },
          {
            label: `Boğazlar ve Güvenlik`,
            detail: `1936 Montrö Boğazlar Sözleşmesi ile Boğazlar üzerinde Türk egemenliği güçlendirildi.`,
          },
          {
            label: `Bölgesel Paktlar`,
            detail: `Balkan Antantı (1934) ve Sadabat Paktı (1937) ile bölgesel güvenlik sağlandı.`,
          },
          {
            label: `Hatay Meselesi`,
            detail: `Hatay 1939'da anavatana katıldı (Atatürk'ün ölümünden sonra).`,
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
      article: `## Lozan'dan Kalan Sorunlar
Lozan'da bazı sorunlar sonraya bırakılmıştı. Musul Sorunu 1926'da İngiltere lehine çözüldü. Ayrıca Yunanistan'la nüfus mübadelesi ve dış borçlar gibi konular bu dönemde ele alındı.

## Boğazlar ve Güvenlik
1936'da imzalanan Montrö Boğazlar Sözleşmesi ile Boğazlar üzerinde Türk egemenliği güçlendirildi; bu, Atatürk dönemi dış politikasının önemli başarılarından biridir.

## Bölgesel Paktlar
Komşularla iyi ilişkiler ve güvenlik için Balkan Antantı (1934) ve doğu sınırını güvence altına alan Sadabat Paktı (1937) imzalandı.

## Hatay Meselesi
Hatay'ın anavatana katılması için yürütülen çalışmalar Atatürk'ün ölümünden sonra, 1939'da sonuçlandı ve Hatay Türkiye'ye katıldı.`,
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
            detail: `Atatürk 10 Kasım 1938'de Dolmabahçe Sarayı'nda vefat etti. Yerine İsmet İnönü cumhurbaşkanı oldu ("Millî Şef").`,
          },
          {
            label: `II. Dünya Savaşı ve Türkiye`,
            detail: `Türkiye savaşın büyük bölümünde tarafsız kaldı; savaşın sonuna doğru (1945) müttefiklerin yanında yer aldı, fiilen savaşa girmedi.`,
          },
          {
            label: `Atatürk'ün Mirası`,
            detail: `İlke ve inkılaplarıyla laik, çağdaş ve bağımsız Türkiye Cumhuriyeti bıraktı. Naaşı Anıtkabir'e taşındı.`,
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
      article: `## Atatürk'ün Ölümü
Mustafa Kemal Atatürk 10 Kasım 1938'de Dolmabahçe Sarayı'nda hayatını kaybetti. Yerine İsmet İnönü cumhurbaşkanı seçildi ve "Millî Şef" olarak anıldı.

## II. Dünya Savaşı ve Türkiye
1939-1945 yılları arasındaki II. Dünya Savaşı boyunca Türkiye, büyük bir basiretle savaşın dışında kalmayı başardı. Savaşın sonuna doğru, 1945'te müttefik devletlerin yanında yer aldı ancak fiilen savaşa girmedi.

## Atatürk'ün Mirası
Atatürk, ilke ve inkılaplarıyla laik, çağdaş ve bağımsız bir Türkiye Cumhuriyeti bıraktı. Naaşı daha sonra Ankara'da Anıtkabir'e taşınmıştır.`,
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
