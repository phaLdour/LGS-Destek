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
            sections: [
              { kind: "tanim", title: `Tanımlar`, content: `Gerçek: sözcüğün ilk akla gelen, sözlükteki anlamı. Mecaz: başka bir kavramı anlatmak için kullanılan anlam. Terim: bir bilim, sanat veya meslek dalına özgü anlam.` },
              { kind: "ornek", title: `Gerçek Anlam`, content: `"Soğuk su içtim." "Tatlı pasta yedik." "Acı biber çok yakıyor." "Yol uzun." (Sözcükler ilk akla gelen anlamlarıyla.)` },
              { kind: "ornek", title: `Mecaz Anlam`, content: `"Bana çok soğuk davrandı." "Tatlı bir insandı." "Acı bir haber." "İşin yolu uzun." (Sözcükler başka kavramları anlatıyor.)` },
              { kind: "ornek", title: `Terim Anlam`, content: `Müzikte "nota", "akor"; matematikte "kök", "tam sayı"; biyolojide "hücre", "doku"; tıpta "tansiyon", "nabız"; sporda "korner", "ofsayt".` },
              { kind: "tuzak", title: `Mecaz mı Terim mi?`, content: `Aynı sözcük cümleye göre değişir: "soğuk hava" (gerçek), "soğuk davranış" (mecaz), "soğuk savaş" (terim — siyaset).` },
            ],
          },
          {
            label: `Deyim ve Atasözü`,
            sections: [
              { kind: "tanim", title: `Tanımlar`, content: `Deyim: en az iki sözcükten oluşan, kalıplaşmış, çoğu mecaz söz öbeği. Atasözü: toplumun deneyiminden doğan, öğüt veya genel yargı bildiren kalıp söz.` },
              { kind: "ornek", title: `Deyim Örnekleri`, content: `göz atmak, etekleri zil çalmak, ağzı kulaklarına varmak, burnu havada, iğneyle kuyu kazmak, pabucu dama atılmak, ayağını denk almak.` },
              { kind: "ornek", title: `Atasözü Örnekleri`, content: `"Damlaya damlaya göl olur.", "Sakla samanı, gelir zamanı.", "Bir elin nesi var, iki elin sesi var.", "Ağaç yaşken eğilir.", "Son pişmanlık fayda etmez."` },
              { kind: "tuzak", title: `Karıştırma`, content: `Atasözü ÖĞÜT/YARGI bildirir; deyim bildirmez. "İğneyle kuyu kazmak" deyimdir, atasözü değildir.` },
            ],
          },
          {
            label: `Eş, Zıt ve Eş Sesli`,
            sections: [
              { kind: "tanim", title: `Tanımlar`, content: `Eş anlam: aynı anlamı taşıyan farklı sözcükler. Zıt anlam: birbirinin karşıtı. Eş sesli (sesteş): yazılışı/okunuşu aynı, anlamı farklı.` },
              { kind: "ornek", title: `Eş Anlam`, content: `konuk-misafir, kıymet-değer, sınav-imtihan, kelime-sözcük, neden-sebep, vatan-yurt, sevinç-mutluluk, savaş-harp, akıllı-zeki.` },
              { kind: "ornek", title: `Zıt Anlam`, content: `yaz-kış, gece-gündüz, aç-tok, açık-kapalı, iyi-kötü, sıcak-soğuk, dolu-boş, uzun-kısa, akıllı-aptal, dost-düşman.` },
              { kind: "ornek", title: `Eş Sesli (Sesteş)`, content: `"yüz" (surat / 100 / yüzme eylemi), "kaz" (kuş / kazı yapmak), "yaz" (mevsim / yazmak), "el" (organ / yabancı), "kır" (kırsal / kırmak), "saz" (kamış / müzik aleti).` },
            ],
          },
          {
            label: `Somut ve Soyut`,
            sections: [
              { kind: "tanim", title: `Tanım`, content: `Somut: beş duyuyla algılanabilen varlık. Soyut: yalnızca akılla kavranan kavram.` },
              { kind: "ornek", title: `Somut Örnekler`, content: `taş, su, ağaç, kalem, masa, ev, kuş, deniz, kitap, ses (ses duyulduğu için somut).` },
              { kind: "ornek", title: `Soyut Örnekler`, content: `sevgi, özgürlük, korku, mutluluk, akıl, cesaret, dostluk, vicdan, umut, hayal, adalet.` },
            ],
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
      article: `# Gerçek, Mecaz ve Terim Anlam
Bir sözcüğün sözlükteki ilk akla gelen anlamı **gerçek anlam**dır. Sözcük başka bir kavramı anlatmak için kullanılırsa **mecaz anlam** kazanır. Bir bilim/sanat/meslek dalına özgü anlam ise **terim anlam**dır.
[örnek] "Bana çok **soğuk** davrandı" → mecaz. Müzikte "**nota**", matematikte "**kök**" → terim.
[tuzak] Mecaz ile terim karıştırılır; terim anlam yalnız bir bilim/sanat dalına özgüdür.

# Deyimler ve Atasözleri
[kural] **Deyim:** en az iki sözcükten oluşan, kalıplaşmış, çoğu **mecaz** söz öbeğidir. **Atasözü:** öğüt veya genel yargı bildirir.
[örnek] Deyim: "göz atmak", "etekleri zil çalmak". Atasözü: "Damlaya damlaya göl olur".
[tuzak] "İğneyle kuyu kazmak" bir **deyimdir**, atasözü değildir.

# Eş, Zıt ve Eş Sesli Anlam
[kural] **Eş anlam:** aynı anlam (konuk-misafir). **Zıt anlam:** karşıt (iyi-kötü). **Eş sesli (sesteş):** yazılışı aynı, anlamı farklı.
[örnek] "yüz" → surat / 100 / yüzme eylemi (eş sesli).

# Somut ve Soyut Anlam
[kural] **Somut:** beş duyuyla algılanan varlık (taş, su, ağaç). **Soyut:** akılla kavranan kavram (sevgi, özgürlük, korku).
[soru] "Aşağıdakilerden hangisi soyut anlamlıdır?" sorularında algılanamayan kavramı ara.`,
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
            label: `Anlam İlişkileri`,
            sections: [
              { kind: "ornek", title: `Neden-Sonuç`, content: `Sebep gerçekleşmiştir ("-dığı için, -dan dolayı"). Örnek: "Yağmur yağdığı için maç ertelendi." "Çok çalıştığından sınavı kazandı."` },
              { kind: "ornek", title: `Amaç-Sonuç`, content: `İş bir amaçla yapılır ("için, diye, üzere"). Örnek: "Görüşmek için aradı." "Sınavı geçmek için çalıştı."` },
              { kind: "ornek", title: `Koşul (Şart)`, content: `Bir durum başka bir şarta bağlıdır ("-sa/-se, ise, -ınca"). Örnek: "Erken kalkarsan yetişirsin." "Çalışırsan başarırsın."` },
              { kind: "tuzak", title: `Tuzak: Neden vs Amaç`, content: `Neden-sonuçta iş GERÇEKLEŞMİŞTİR; amaç-sonuçta iş bir AMACA YÖNELİKTİR (henüz olmayabilir). "Yağdı için" (gerçekleşti) ≠ "yağsın diye" (amaç).` },
            ],
          },
          {
            label: `Öznel ve Nesnel`,
            sections: [
              { kind: "tanim", title: `Tanım`, content: `Öznel: kişiden kişiye değişen, kanıtlanamayan yorum. Nesnel: kanıtlanabilen, herkes için aynı olan bilgi.` },
              { kind: "ornek", title: `Öznel Örnekler`, content: `"Bu film çok sıkıcıydı." "En güzel şehir İstanbul'dur." "Bu yemek harika." (Hepsi kişisel yorum.)` },
              { kind: "ornek", title: `Nesnel Örnekler`, content: `"Film iki saat sürdü." "Türkiye'nin başkenti Ankara'dır." "Kitap 200 sayfadır." (Hepsi kanıtlanabilir.)` },
              { kind: "tuzak", title: `Tuzak`, content: `Sayı/ölçü/tarih içeren cümle nesneldir. "Film 2 saat sürer" → nesnel; "Film sıkıcı" → öznel.` },
            ],
          },
          {
            label: `Karşılaştırma, Abartma, Olasılık`,
            sections: [
              { kind: "ornek", title: `Karşılaştırma`, content: `"daha, en, göre, kadar" gibi sözcükler. Örnek: "Ali, Veli'den daha uzun." "Sınıfın en çalışkanı." "Bu kitap, ötekine göre kalın."` },
              { kind: "ornek", title: `Abartma`, content: `Olduğundan çok farklı gösterme. Örnek: "Seni görmeyeli bir asır oldu." "Gülmekten öldüm." "Dağ kadar yorgunum."` },
              { kind: "ornek", title: `Olasılık`, content: `"belki, galiba, sanırım, muhtemelen". Örnek: "Belki yarın yağmur yağar." "Galiba uyumuş." "Sanırım haklısın."` },
              { kind: "ornek", title: `Eş Anlamlı / Yakın`, content: `İki cümle aynı anlama gelebilir: "Sınava çalıştı ama kazanamadı" ≈ "Çalışmasına rağmen sınavı kazanamadı".` },
            ],
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
      article: `# Anlam İlişkileri
[kural] **Neden-sonuç:** işin gerçekleşmiş bir sebebi vardır. **Amaç-sonuç:** iş bir amaç için yapılır. **Koşul (şart):** bir durum başka şarta bağlanır.
[örnek] "Yağmur **yağdığı için** maç ertelendi" → neden-sonuç. "**Görüşmek için** aradı" → amaç-sonuç. "Erken **kalkarsan** yetişirsin" → koşul.
[tuzak] Neden-sonuç ile amaç-sonuç karıştırılır; amaçta iş henüz gerçekleşmemiştir.

# Öznel ve Nesnel Anlam
[kural] **Öznel:** kişiden kişiye değişen, kanıtlanamayan yorum. **Nesnel:** kanıtlanabilen, herkes için aynı bilgi.
[örnek] "Bu film çok sıkıcıydı" → öznel. "Film iki saat sürdü" → nesnel.
[tuzak] "Film 2 saat sürer" cümlesi nesneldir (kanıtlanabilir); öznel sanılmamalı.

# Karşılaştırma, Abartma ve Olasılık
[kural] **Karşılaştırma:** "daha, en, göre". **Abartma:** olduğundan çok farklı gösterme. **Olasılık:** "belki, galiba".
[örnek] "Ali, Veli'den **daha** uzun" → karşılaştırma. "Seni görmeyeli **bir asır** oldu" → abartma. "**Belki** yağmur yağar" → olasılık.
[soru] Cümlede "daha/en/göre" varsa karşılaştırma; "belki/galiba" varsa olasılık aranır.`,
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
            sections: [
              { kind: "tanim", title: `Konu`, content: `Paragrafta hakkında konuşulan şeydir; geneldir ve "Ne anlatılıyor?" sorusuna yanıt verir.` },
              { kind: "tanim", title: `Ana Düşünce`, content: `Yazarın okuyucuya iletmek istediği asıl mesajdır; "Yazar ne demek istiyor?" sorusuna yanıttır.` },
              { kind: "tuzak", title: `Tuzak`, content: `Konu ile ana düşünce aynı şey değildir. Konu (örn. "kitap okumak") geneldir; ana düşünce (örn. "Kitap okumak insanı zenginleştirir.") mesajdır.` },
            ],
          },
          {
            label: `Yardımcı Düşünce`,
            sections: [
              { kind: "tanim", title: `Tanım`, content: `Ana düşünceyi destekleyen, açıklayan veya örnekleyen yan fikirlerdir.` },
              { kind: "ipucu", title: `İpucu`, content: `"Paragraftan hangisi çıkarılamaz?" sorusunda bahsedilen yardımcı düşünceleri ararsın.` },
            ],
          },
          {
            label: `Anlatım Biçimleri`,
            sections: [
              { kind: "ornek", title: `Açıklama`, content: `Bilgi verme, öğretme amacı. "Su, hidrojen ve oksijenden oluşan bir bileşiktir."` },
              { kind: "ornek", title: `Tartışma`, content: `Bir görüşü çürütüp başka görüşü savunma. "Bazıları kitap bittiğini söylüyor; oysa..."` },
              { kind: "ornek", title: `Betimleme`, content: `Bir varlığı/sahneyi okurun gözünde canlandırma. "Uzun, ince parmaklı yaşlı adam pencereden bakıyordu."` },
              { kind: "ornek", title: `Öyküleme`, content: `Olayı yer-zaman-kişi belirterek anlatma. "Geçen yaz Kapadokya'ya gittik; orada balona bindik."` },
            ],
          },
          {
            label: `Paragrafın Yapısı`,
            sections: [
              { kind: "kural", title: `Bölümler`, content: `Giriş (konuya giriş), Gelişme (açıklama/örnek/kanıt), Sonuç (toparlama/yargı).` },
              { kind: "tuzak", title: `Giriş Cümlesi`, content: `Giriş cümlesi BAĞIMSIZdır; "bu, o, bundan dolayı, ayrıca, oysa, çünkü" gibi ifadelerle başlamaz.` },
              { kind: "soru", title: `Çıkarılacak Cümle`, content: `Anlam akışını bozan, konu dışı veya tekrar olan cümle paragraftan çıkarılır.` },
            ],
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
      article: `# Konu ve Ana Düşünce
[kural] **Konu:** paragrafta hakkında konuşulan şey (genel), "Ne anlatılıyor?" sorusuna yanıttır. **Ana düşünce:** yazarın iletmek istediği asıl mesaj.
[tuzak] Konu ile ana düşünce karıştırılır; konu geneldir, ana düşünce verilmek istenen mesajdır.

# Yardımcı Düşünceler
Ana düşünceyi destekleyen, açıklayan ve güçlendiren yan fikirlerdir.

# Anlatım Biçimleri
[kural] Dört temel biçim: **açıklama** (bilgi verme), **tartışma** (görüş çürütüp savunma), **betimleme** (gözde canlandırma), **öyküleme** (olayı yer-zaman-kişiyle anlatma).
[örnek] "Anlatıcı olayı yer, zaman ve kişi belirterek anlatıyorsa" → öyküleme.

# Paragrafın Yapısı
Paragraf **giriş, gelişme, sonuç** bölümlerinden oluşur.
[tuzak] **Giriş cümlesi bağımsızdır:** "bu, o, bundan dolayı, ayrıca" gibi ifadelerle başlamaz.
[soru] "Paragraftan çıkarılması gereken cümle hangisidir?" → anlam akışını bozan, konu dışı cümle.`,
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
            label: `İsim-Fiil`,
            sections: [
              { kind: "kural", title: `Ekler`, content: `-ma / -me, -ış / -iş, -mak / -mek. Fiili isimleştirir.` },
              { kind: "ornek", title: `-mak / -mek`, content: `okumak, yüzmek, gelmek, gitmek. "Yüzmeyi severim."` },
              { kind: "ornek", title: `-ma / -me`, content: `okuma, gülme, bakma, yazma. "Onun bakması çok hoştu."` },
              { kind: "ornek", title: `-ış / -iş`, content: `gülüş, bakış, atış, geliş. "Onun gülüşü çok güzeldi."` },
              { kind: "tuzak", title: `-ma Tuzak`, content: `-ma eki hem isim-fiil hem OLUMSUZLUK eki olabilir. "Okuma kitabı" (isim-fiil) ≠ "Gelme!" (olumsuzluk). Anlama bak.` },
            ],
          },
          {
            label: `Sıfat-Fiil`,
            sections: [
              { kind: "kural", title: `Ekler`, content: `-an / -en, -dik, -ecek, -miş, -r, -ası, -maz. Kendinden sonraki ismi niteler.` },
              { kind: "ornek", title: `-an / -en`, content: `akan su, gülen yüz, gelen misafir, bakan adam.` },
              { kind: "ornek", title: `-ecek / -acak`, content: `okunacak kitap, yapılacak iş, görülecek yer.` },
              { kind: "ornek", title: `-miş / -dik`, content: `pişmiş aş, geçmiş zaman, tanıdık biri, bildik konu.` },
              { kind: "ornek", title: `-r / -maz`, content: `keser (alet), çalar saat, tükenmez (kalem), görünmez kaza.` },
            ],
          },
          {
            label: `Zarf-Fiil`,
            sections: [
              { kind: "kural", title: `Ekler`, content: `-ip, -arak / -erek, -ınca / -ince, -ken, -dıkça, -madan, -alı, -ar...-mez. Eylemin durumunu/zamanını bildirir.` },
              { kind: "ornek", title: `-arak / -erek`, content: `gülerek, koşarak, dinleyerek. "Konuşarak yürüdü."` },
              { kind: "ornek", title: `-ınca / -ince`, content: `gidince, gelince, görünce. "Eve gidince aradı."` },
              { kind: "ornek", title: `-madan`, content: `bakmadan, görmeden, demeden. "Sormadan girme."` },
              { kind: "ornek", title: `-ken`, content: `okurken, koşarken, küçükken. "Gelirken seni gördüm."` },
            ],
          },
          {
            label: `Önemli Not`,
            sections: [
              { kind: "tuzak", title: `Yüklem Olamaz`, content: `Fiilimsi çekimli fiil değildir; cümlede yüklem olamaz. "Koştu" fiilimsi DEĞİL, çekimli fiildir; "koşan, koşmak, koşarak" fiilimsidir.` },
              { kind: "kural", title: `Görevleri`, content: `İsim-fiil → isim görevi; Sıfat-fiil → sıfat görevi (ismi niteler); Zarf-fiil → zarf görevi.` },
            ],
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
      article: `# Fiilimsi Nedir?
Fiilden türeyen ama **çekimli fiil olmayan**; cümlede isim, sıfat veya zarf görevinde kullanılan sözcüklerdir.
[kural] Üç türü vardır: **isim-fiil**, **sıfat-fiil**, **zarf-fiil**. Fiilimsi yüklem olamaz, yan cümlecik kurar.

# İsim-Fiil
Ekler: **-ma/-me, -ış/-iş, -mak/-mek**. Fiili isimleştirir.
[örnek] "**Yüzmeyi** severim.", "**Gülüşü** çok güzel."
[tuzak] -ma eki hem isim-fiil hem **olumsuzluk** eki olabilir; "Okuma kitabı" (isim-fiil) ≠ "gelme" (olumsuzluk). Anlama bak.

# Sıfat-Fiil
Ekler: **-an, -dik, -ecek, -miş, -r, -ası, -maz**. Kendinden sonraki ismi niteler.
[örnek] "**akan** su", "**okunacak** kitap", "**pişmiş** aş".

# Zarf-Fiil
Ekler: **-ip, -arak, -ınca, -ken, -dıkça, -madan**. Eylemin durumunu/zamanını bildirir.
[örnek] "**Konuşarak** yürüdü.", "Eve **gidince** aradı."
[soru] "Cümledeki fiilimsinin türü nedir?" → eke bak: -arak/-ince → zarf-fiil, -an/-ecek → sıfat-fiil, -mak/-ma → isim-fiil.`,
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
            label: `Yüklem ve Özne (Temel)`,
            sections: [
              { kind: "tanim", title: `Yüklem`, content: `Cümlede işi/oluşu/durumu bildiren ögedir; genelde cümlenin sonunda bulunur.` },
              { kind: "tanim", title: `Özne`, content: `İşi yapan/olan ögedir; yükleme "Kim?" / "Ne?" sorularıyla bulunur.` },
              { kind: "ornek", title: `Örnek Çözüm`, content: `"Ahmet bahçede topu tekmeledi." → Yüklem: tekmeledi (ne yaptı?). Özne: Ahmet (kim tekmeledi?).` },
            ],
          },
          {
            label: `Nesne`,
            sections: [
              { kind: "kural", title: `Soru`, content: `Yükleme "neyi / kimi?" → belirtili nesne; "ne?" → belirtisiz nesne sorulur.` },
              { kind: "ornek", title: `Belirtili Nesne`, content: `"Kitabı okudu." (kitabı), "Onu sevdim." (onu). -i hâli (-ı, -u, -ü) takısı vardır.` },
              { kind: "ornek", title: `Belirtisiz Nesne`, content: `"Kitap okudu.", "Su içti." (kitap, su). Çıplak hâlde, takısızdır.` },
            ],
          },
          {
            label: `Dolaylı Tümleç ve Zarf Tümleci`,
            sections: [
              { kind: "kural", title: `Dolaylı Tümleç`, content: `"-e, -de, -den" yer-yön ekleri. Sorular: Nereye / nerede / nereden / kime / kimde / kimden?` },
              { kind: "ornek", title: `Dolaylı T. Örnekleri`, content: `"Okula gitti.", "Evde bekliyor.", "Ankara'dan geldi.", "Ona söyledim."` },
              { kind: "kural", title: `Zarf Tümleci`, content: `Eylemin durumunu, zamanını, nedenini, ölçüsünü bildirir. Sorular: Nasıl / ne zaman / niçin / ne kadar?` },
              { kind: "ornek", title: `Zarf T. Örnekleri`, content: `"Dün geldi." (zaman), "Hızlıca koştu." (nasıl), "Çok yedi." (ölçü), "Üşüdüğü için kazak giydi." (niçin).` },
              { kind: "tuzak", title: `Karıştırma`, content: `"Okula gitti" → "okula" DOLAYLI tümleçtir (yer-yön, -e hâli); zarf tümleci değildir.` },
            ],
          },
          {
            label: `Bulma Yöntemi`,
            sections: [
              { kind: "ipucu", title: `Sıra`, content: `1) Önce yüklem bulunur. 2) Yükleme "kim?" sorulur → özne. 3) "neyi/kimi?" → nesne. 4) "nereye?" → dolaylı. 5) "nasıl/ne zaman?" → zarf.` },
            ],
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
      article: `# Temel Ögeler: Yüklem ve Özne
[kural] **Yüklem:** işi/oluşu/durumu bildiren ögedir (genelde sonda). **Özne:** işi yapan/olan ögedir; yükleme "Kim?" ya da "Ne?" sorulur.
[örnek] "Ahmet topu tekmeledi." → yüklem: tekmeledi, özne: Ahmet.

# Nesne
Öznenin yaptığı işten etkilenen ögedir.
[kural] "**neyi/kimi?**" → belirtili nesne (Kitabı okudu). "**ne?**" → belirtisiz nesne (Kitap okudu).

# Dolaylı Tümleç ve Zarf Tümleci
[kural] **Dolaylı tümleç:** "-e, -de, -den" ekleriyle "Nereye/nerede/nereden?" sorularına yanıt verir. **Zarf tümleci:** "Nasıl/ne zaman/niçin?" sorularına yanıt verir.
[tuzak] "Okula gitti" → "okula" **dolaylı tümleçtir** (yer-yön), zarf tümleci sanılmamalı.

# Ögeleri Bulma
[ipucu] Önce **yüklem** bulunur; sonra yükleme "Kim?", "Neyi?", "Nereye?", "Nasıl?" soruları sorularak diğer ögeler bulunur.`,
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
            label: `Etken - Edilgen (Özne)`,
            sections: [
              { kind: "tanim", title: `Etken`, content: `İşi yapan (gerçek özne) bellidir.` },
              { kind: "tanim", title: `Edilgen`, content: `İşi yapan belli değildir; fiil -l veya -n eki alır; cümlede sözde özne bulunur.` },
              { kind: "ornek", title: `Etken Örnekleri`, content: `"Ali bahçeyi suladı.", "Annem yemeği pişirdi.", "Çocuk camı kırdı." (Özne belli.)` },
              { kind: "ornek", title: `Edilgen Örnekleri`, content: `"Bahçe sulandı.", "Yemek pişirildi.", "Cam kırıldı." (İşi yapan belli değil; "bahçe/yemek/cam" sözde öznedir.)` },
            ],
          },
          {
            label: `Geçişli - Geçişsiz (Nesne)`,
            sections: [
              { kind: "kural", title: `Test`, content: `Yükleme "neyi / kimi?" sorulabiliyorsa geçişli; soruya yanıt yoksa geçişsizdir.` },
              { kind: "ornek", title: `Geçişli Örnekleri`, content: `"Kitabı okudu." (neyi okudu?), "Onu sevdim.", "Çocuğu uyandırdı."` },
              { kind: "ornek", title: `Geçişsiz Örnekleri`, content: `"Çocuk uyudu.", "Yağmur yağdı.", "Ali güldü." (Yükleme "neyi?" sorulamaz.)` },
            ],
          },
          {
            label: `Önemli Not`,
            sections: [
              { kind: "tuzak", title: `İsim Cümlesi`, content: `Çatı yalnız FİİL cümlelerinde aranır. "O çok çalışkandır" isim cümlesidir; çatı aranmaz.` },
              { kind: "ipucu", title: `Sözde Özne`, content: `Edilgen cümledeki özne, gerçek özne değil sözde öznedir. "Cam kırıldı" → camı kırılan bir şey vardır ama cümlede belli değil.` },
            ],
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
      article: `# Fiilde Çatı Nedir?
Yüklemin özne ve nesneyle kurduğu ilişkidir.
[tuzak] Çatı **yalnız fiil cümlelerinde** aranır; "O çok çalışkandır" isim cümlesidir, çatı aranmaz.

# Özne-Yüklem İlişkisi (Etken - Edilgen)
[kural] **Etken:** işi yapan (gerçek özne) bellidir. **Edilgen:** işi yapan belli değildir; fiil **-l / -n** eki alır, cümlede **sözde özne** bulunur.
[örnek] "Ali bahçeyi suladı" → etken. "Bahçe sulandı" → edilgen.
[tuzak] "Cam kırıldı" cümlesinde "cam" **sözde öznedir** (gerçek özne değil).

# Nesne-Yüklem İlişkisi (Geçişli - Geçişsiz)
[kural] **Geçişli:** nesne alabilir, yükleme "neyi?" sorulabilir. **Geçişsiz:** nesne almaz.
[örnek] "Kitabı okudu" → geçişli. "Çocuk uyudu" → geçişsiz.
[soru] "Aşağıdaki cümlenin çatısı nedir?" → önce fiil cümlesi mi bak, sonra özne (etken/edilgen) ve nesne (geçişli/geçişsiz) ilişkisine bak.`,
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
            label: `Büyük Harf`,
            sections: [
              { kind: "kural", title: `Genel Kural`, content: `Cümle başı, özel adlar (kişi, yer, kurum, eser, gün/ay özel), başlıklardaki kelimeler büyük harfle başlar.` },
              { kind: "ornek", title: `Örnekler`, content: `Ali Veli, İstanbul, Türkiye, TBMM, Cumhuriyet Bayramı, Kurtuluş Savaşı. Gün/ay özel tarihle yazılırsa büyük (23 Nisan), genel anlamda küçük (cumartesi).` },
            ],
          },
          {
            label: `"de / da"`,
            sections: [
              { kind: "kural", title: `Kural`, content: `"ve, dahi" anlamı veren bağlaç "de/da" AYRI; bulunma eki "-de/-da" BİTİŞİK yazılır.` },
              { kind: "ornek", title: `Bağlaç (Ayrı)`, content: `"Ali de geldi.", "Sen de gel.", "Onlar da bilmiyor.", "Ben de istiyorum."` },
              { kind: "ornek", title: `Ek (Bitişik)`, content: `"evde", "çantada", "okulda", "kafamda", "İstanbul'da" (özel ad → kesme ile).` },
              { kind: "ipucu", title: `Çıkarma Testi`, content: `Bağlaç olan "de/da"yı cümleden çıkar; cümle hâlâ anlamlı ise AYRI, anlamsız oluyorsa BİTİŞİK.` },
            ],
          },
          {
            label: `"ki"`,
            sections: [
              { kind: "kural", title: `Kural`, content: `Bağlaç "ki" AYRI; aitlik/ilgi eki "-ki" BİTİŞİK yazılır.` },
              { kind: "ornek", title: `Bağlaç ki (Ayrı)`, content: `"Duydum ki taşınmışsın.", "Sanırım ki haklısın.", "Öyle yoruldu ki uyuyakaldı."` },
              { kind: "ornek", title: `Aitlik -ki (Bitişik)`, content: `"benimki", "seninki", "akşamki", "evdeki", "yarınki".` },
            ],
          },
          {
            label: `"mi" Soru Eki`,
            sections: [
              { kind: "kural", title: `Kural`, content: `Soru eki "mi" her zaman AYRI yazılır; ünlü uyumuna göre mi/mı/mu/mü olur.` },
              { kind: "ornek", title: `Örnekler`, content: `"Geldin mi?", "Okudun mu?", "Gördün mü?", "Soracak mısın?"` },
              { kind: "tuzak", title: `Tuzak`, content: `"Geldinmi" YANLIŞTIR; doğrusu "Geldin mi?". Bitişik yazılmaz.` },
            ],
          },
          {
            label: `Özel Ada Gelen Ekler`,
            sections: [
              { kind: "kural", title: `Kural`, content: `Özel adlara gelen ÇEKİM ekleri kesme işaretiyle ayrılır; YAPIM ekleri ayrılmaz.` },
              { kind: "ornek", title: `Çekim (Kesme ile)`, content: `Ali'ye, İstanbul'da, Atatürk'ün, Türkiye'nin, 1923'te.` },
              { kind: "tuzak", title: `Yapım (Ayrılmaz)`, content: `"Türk'çe" YANLIŞ → Türkçe; "Antalya'lı" YANLIŞ → Antalyalı; "İstanbul'lu" YANLIŞ → İstanbullu; "Türk'leşmek" YANLIŞ → Türkleşmek.` },
            ],
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
      article: `# "de / da" Bağlacı ve Eki
[kural] "ve, dahi" anlamı veren bağlaç **"de/da" AYRI**; bulunma durumu eki **"-de/-da" BİTİŞİK** yazılır.
[örnek] "Ben **de** geldim" (bağlaç, ayrı). "Kalemim çantam**da**" (ek, bitişik).
[ipucu] Bağlaç olan "de/da" cümleden çıkarıldığında cümle anlamlı kalır; ek çıkarılamaz.

# "ki" Bağlacı ve Eki
[kural] Bağlaç **"ki" AYRI** (Duydum **ki** taşınmışsınız); aitlik/ilgi eki **"-ki" BİTİŞİK** (benim**ki**, akşam**ki**).

# "mi" Soru Eki
[kural] Soru eki **"mi" her zaman AYRI** yazılır ve ünlü uyumuna girer: "Geldin **mi**?", "Okudun **mu**?"
[tuzak] "Geldinmi" yanlıştır; doğrusu "Geldin mi?"

# Özel Adlara Gelen Ekler
[kural] Özel adlara gelen **çekim ekleri** kesme işaretiyle ayrılır: "Ankara'**da**", "Ali'**nin**".
[tuzak] **Yapım ekleri** kesme ile **ayrılmaz**: "Türk'çe" değil **"Türkçe"**; "Avrupa'lı" değil **"Avrupalı"**.`,
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
            label: `Nokta · Virgül · Noktalı Virgül`,
            sections: [
              { kind: "kural", title: `Nokta (.)`, content: `Tamamlanmış cümlelerin sonunda. Kısaltmalarda (Dr., Prof.). Sayılarda (3.500). Sıra sayılarında (3. sınıf).` },
              { kind: "kural", title: `Virgül (,)`, content: `Eş görevli sözcükleri/sıralı cümleleri ayırır. Hitap sonrası. Uzun özneden sonra. Bağlaçtan önce.` },
              { kind: "ornek", title: `Virgül Örnekleri`, content: `"Ali, Veli ve Ayşe geldi." "Sevgili dostum, mektubun ulaştı." "Çocuk, sabahtan beri çalışıyordu."` },
              { kind: "kural", title: `Noktalı Virgül (;)`, content: `Virgülle ayrılmış öbekleri birbirinden ayırır; sebep-sonuç bildiren sıralı cümleleri ayırır.` },
              { kind: "ornek", title: `Noktalı Virgül Örneği`, content: `"İlk sınıfta Ayşe, Mehmet; ikinci sınıfta ise Ali, Veli vardı."` },
            ],
          },
          {
            label: `İki Nokta · Üç Nokta`,
            sections: [
              { kind: "kural", title: `İki Nokta (:)`, content: `Açıklama, örnek veya alıntı yapılacağı zaman; tanımdan önce kullanılır.` },
              { kind: "ornek", title: `İki Nokta Örneği`, content: `"Şu illeri gezdim: Ankara, İzmir, Bursa." "Atatürk şöyle der: 'Yurtta barış, dünyada barış.'"` },
              { kind: "kural", title: `Üç Nokta (...)`, content: `Tamamlanmamış, sürdürülen veya kesilmiş ifadelerde kullanılır.` },
              { kind: "ornek", title: `Üç Nokta Örneği`, content: `"Onu görünce..." "Ah, bir bilseniz..."` },
            ],
          },
          {
            label: `Soru · Ünlem · Tırnak`,
            sections: [
              { kind: "kural", title: `Soru (?)`, content: `Soru bildiren cümle ve sözcüklerin sonunda. Örnek: "Nasılsın?", "Geldin mi?"` },
              { kind: "kural", title: `Ünlem (!)`, content: `Seslenme, heyecan, şaşırma, emir cümlelerinde. Örnek: "Aman!", "Çık dışarı!", "Vay canına!"` },
              { kind: "kural", title: `Tırnak ("")`, content: `Alıntı yapılan sözleri ve özel vurguyu gösterir. Örnek: Atatürk: "Ne mutlu Türküm diyene."` },
            ],
          },
          {
            label: `Kesme İşareti (')`,
            sections: [
              { kind: "kural", title: `Kural`, content: `Özel adlara gelen ÇEKİM eklerini ayırır.` },
              { kind: "ornek", title: `Doğru Kullanım`, content: `Ali'ye, İstanbul'da, Atatürk'ün, Türkiye'nin, 1923'te, TBMM'nin, 19 Mayıs 1919'da.` },
              { kind: "tuzak", title: `Yapım Eki Tuzağı`, content: `Yapım ekleri AYRILMAZ: "Türk'çe" → Türkçe; "Antalya'lı" → Antalyalı; "İstanbul'lu" → İstanbullu; "gözlük'çü" → gözlükçü.` },
              { kind: "ipucu", title: `İpucu`, content: `Kurum adlarının kısaltmalarına gelen ekler de kesme ile ayrılır: TBMM'ye, MEB'in.` },
            ],
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
      article: `# Nokta, Virgül ve Noktalı Virgül
[kural] **Nokta** tamamlanmış cümle sonunda. **Virgül** eş görevli sözcükleri/sıralı cümleleri ayırır. **Noktalı virgül (;)** virgülle ayrılmış öbekleri birbirinden ayırır.
[örnek] "Ali, Veli ve Ayşe geldi."

# İki Nokta ve Üç Nokta
[kural] **İki nokta (:)** açıklama, örnek veya alıntı öncesi kullanılır. **Üç nokta (...)** tamamlanmamış veya sürdürülen ifadeleri gösterir.

# Soru, Ünlem ve Tırnak
[kural] **Soru (?)** soru cümlesinin sonunda; **ünlem (!)** seslenme/heyecan/şaşırmada; **tırnak ("")** alıntı ve vurguda kullanılır.

# Kesme İşareti
[kural] Özel adlara gelen **çekim eklerini** ayırır: "Atatürk'**ün**", "İstanbul'**a**".
[tuzak] **Yapım eklerini ayırmaz:** "Türk'çe" değil **"Türkçe"**; "Antalya'lı" değil **"Antalyalı"**. (LGS'nin en sık tuzağı!)`,
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
            label: `Gereksiz Sözcük`,
            sections: [
              { kind: "tanim", title: `Tanım`, content: `Anlamı zaten başka bir sözcükte olan kelimenin gereksiz tekrarıdır.` },
              { kind: "ornek", title: `Eş Anlamlı Tekrar`, content: `"En sonunda nihayet bitti." → "en sonunda" ve "nihayet" aynı. "Güzel bir armağan hediye etti." → armağan = hediye.` },
              { kind: "ornek", title: `Yakın Anlam Yığını`, content: `"Yaklaşık 30 civarında öğrenci." → yaklaşık ≈ civarında. "Sırf bu sebepten dolayı." → sırf + bu sebepten + dolayı.` },
            ],
          },
          {
            label: `Yanlış Sözcük`,
            sections: [
              { kind: "tanim", title: `Tanım`, content: `Yakın anlamlı sözcüklerin yanlış yerde kullanımıdır; doğru kelime başka bir anlamdadır.` },
              { kind: "ornek", title: `Sık Karıştırılanlar`, content: `azımsamak (az bulmak) / küçümsemek (değersiz görmek). • çekimser (oy kullanmayan) / çekingen (utangaç). • neden olmak (olumsuz sebep) / yol açmak.` },
            ],
          },
          {
            label: `Özne-Yüklem Uyumsuzluğu`,
            sections: [
              { kind: "kural", title: `Kural`, content: `Tekil-çoğul ve olumlu-olumsuz anlam yüklemle uyumlu olmalı; iyelik ekleri özneye uymalı.` },
              { kind: "ornek", title: `Tekil/Çoğul`, content: `"Öğrenciler ödevini yaptı." → doğrusu "ödevlerini yaptı".` },
              { kind: "ornek", title: `Olumlu/Olumsuz Çelişki`, content: `"Ne yazık ki sınavı kazandı." → olumsuz duygu + olumlu sonuç çelişir.` },
            ],
          },
          {
            label: `Mantık / Çelişki`,
            sections: [
              { kind: "tuzak", title: `Çelişen İfadeler`, content: `"Kesinlikle belki gelirim." → kesinlik + olasılık bir arada. "Mutlaka belki çalışırım."` },
              { kind: "ornek", title: `Sıralama Hatası`, content: `"Önce kaza yaptı, sonra arabaya bindi." → mantıksal sıra ters.` },
            ],
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
      article: `# Gereksiz Sözcük Kullanımı
Anlamı zaten başka bir sözcükte bulunan kelimenin tekrar edilmesidir.
[örnek] "Sınıfa **yaklaşık** 30 **civarında** öğrenci geldi." → "yaklaşık" ve "civarında" aynı anlamda; biri gereksizdir.
[tuzak] "**En sonunda nihayet** bitti", "güzel bir armağan **hediye** etti" gibi eş anlamlı tekrarlar bozukluktur.

# Sözcüğün Yanlış Anlamda Kullanımı
Yakın anlamlı sözcüklerin birbirinin yerine yanlış kullanılmasıdır.
[örnek] "azımsamak" (az bulmak) ile "küçümsemek" (değersiz görmek) karıştırılır.

# Özne-Yüklem Uyumsuzluğu
[kural] Öznenin tekil-çoğul ve olumlu-olumsuz durumu yüklemle uyumlu olmalıdır.
[örnek] "Öğrenciler ödev**ini** yaptı" → doğrusu "ödev**lerini** yaptı".
[tuzak] "**Ne yazık ki** sınavı kazandı" → olumsuz duygu (ne yazık ki) ile olumlu sonuç (kazandı) çelişir.

# Mantık ve Sıralama Hataları
[tuzak] Çelişen ifadeler bozukluk oluşturur: "**Kesinlikle belki** gelirim" (kesinlik + olasılık bir arada).
[soru] "Aşağıdaki cümlelerin hangisinde anlatım bozukluğu vardır?" → gereksiz tekrar, yanlış sözcük, uyumsuzluk veya çelişki ara.`,
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
