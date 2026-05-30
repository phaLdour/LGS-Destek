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
      quickQuestions: [
        { question: `"Yüz" sözcüğü hangisinde sayı anlamında kullanılmıştır?`, options: [`Sınıfta yüz öğrenci var.`, `Yüzünü yıka.`, `Havuzda yüz!`, `Yüzü çok güzeldi.`], correctIndex: 0 },
        { question: `"Yüz" sözcüğü hangisinde "yüzmek" eyleminin emri anlamındadır?`, options: [`Havuzda yüz!`, `Yüzü kızardı.`, `Yüz kişi geldi.`, `Yüzü yıka.`], correctIndex: 0 },
        { question: `"Acı" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Acı bir haber aldık.`, `Acı biber yedik.`, `Acı kahve içer.`, `Acı çikolata sevmem.`], correctIndex: 0 },
        { question: `"Soğuk" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Bana çok soğuk davrandı.`, `Soğuk su içtim.`, `Hava soğuk.`, `Soğuk demir.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi soyut anlamlıdır?`, options: [`Sevgi`, `Kalem`, `Masa`, `Taş`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi somut anlamlıdır?`, options: [`Defter`, `Düşünce`, `Korku`, `Mutluluk`], correctIndex: 0 },
        { question: `Eş anlamlı sözcük çifti hangisidir?`, options: [`Misafir - konuk`, `Siyah - beyaz`, `Sıcak - soğuk`, `Açık - kapalı`], correctIndex: 0 },
        { question: `Eş anlamlı sözcük çifti hangisidir?`, options: [`Sene - yıl`, `Gece - gündüz`, `Büyük - küçük`, `İyi - kötü`], correctIndex: 0 },
        { question: `Zıt (karşıt) anlamlı sözcük çifti hangisidir?`, options: [`Uzun - kısa`, `Okul - mektep`, `Hediye - armağan`, `Ad - isim`], correctIndex: 0 },
        { question: `Aşağıdaki sözcüklerden hangisi sesteştir?`, options: [`Yüz`, `Kitap`, `Bilgisayar`, `Pencere`], correctIndex: 0 },
        { question: `"Gül" sözcüğü hangisinde fiil anlamındadır?`, options: [`Sen de bizimle gül!`, `Bahçede gül açtı.`, `Kırmızı gül kokuyor.`, `Gül kokusu güzeldir.`], correctIndex: 0 },
        { question: `"Çay" sözcüğü hangisinde "küçük akarsu" anlamındadır?`, options: [`Çayın kenarında oturduk.`, `Bir bardak çay içtim.`, `Çay demlendi.`, `Çay servisi yapıldı.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi deyimdir?`, options: [`Burnu havada olmak`, `Damlaya damlaya göl olur`, `Sakla samanı gelir zamanı`, `Bir elin nesi var, iki elin sesi var`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi atasözüdür?`, options: [`Damlaya damlaya göl olur`, `Göz atmak`, `Burnu havada olmak`, `Etekleri zil çalmak`], correctIndex: 0 },
        { question: `"Etekleri zil çalmak" deyimi ne anlama gelir?`, options: [`Çok sevinmek`, `Çok korkmak`, `Çok üzülmek`, `Çok kızmak`], correctIndex: 0 },
        { question: `"Pabucu dama atılmak" deyimi ne anlama gelir?`, options: [`Değer kaybetmek`, `Yükselmek`, `Zenginleşmek`, `Acelesi olmak`], correctIndex: 0 },
        { question: `"Damdan düşer gibi" deyimi ne anlama gelir?`, options: [`Beklenmedik bir biçimde söylemek`, `Yere düşmek`, `Yorulmak`, `Susmak`], correctIndex: 0 },
        { question: `"Ağzı kulaklarına varmak" deyimi ne anlama gelir?`, options: [`Çok sevinmek`, `Bağırmak`, `Şaşırmak`, `Konuşmamak`], correctIndex: 0 },
        { question: `"Sakla samanı gelir zamanı" atasözünün anlamı nedir?`, options: [`Gereksiz görünen şeyler ileride işe yarayabilir`, `Saman çok değerlidir`, `Zaman çabuk geçer`, `Saklamak yanlıştır`], correctIndex: 0 },
        { question: `"Bir elin nesi var, iki elin sesi var" atasözü neyi anlatır?`, options: [`Birlik ve dayanışma`, `Çok çalışmak`, `Sessizlik`, `Yalnız yaşamak`], correctIndex: 0 },
        { question: `"Ağaç yaşken eğilir" atasözünün anlamı nedir?`, options: [`Eğitim küçük yaşta verilmelidir`, `Ağaçlar gençken eğilebilir`, `Yaşlılar değişmez`, `Doğa korunmalıdır`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi terim anlamlıdır?`, options: [`Açı (matematik)`, `Açı (köşe)`, `Açık`, `Açmak`], correctIndex: 0 },
        { question: `"Kök" sözcüğü hangisinde terim anlamdadır?`, options: [`Karekök hesaplandı.`, `Ağacın kökü derindi.`, `Sorunun kökü buydu.`, `Kökten değişti.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi yansıma sözcük DEĞİLDİR?`, options: [`Kitap`, `Şırıl`, `Çatır`, `Şangır`], correctIndex: 0 },
        { question: `"Kapı gıcırdadı." cümlesindeki "gıcırdadı" sözcüğü nedir?`, options: [`Yansıma`, `Deyim`, `İkileme`, `Mecaz`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi ikilemedir?`, options: [`Pırıl pırıl`, `Çok güzel`, `Az önce`, `Hiç değil`], correctIndex: 0 },
        { question: `"Yavaş yavaş" hangi söz öbeğidir?`, options: [`İkileme`, `Deyim`, `Atasözü`, `Pekiştirme`], correctIndex: 0 },
        { question: `"Sapasağlam" sözcüğü hangi yolla türetilmiştir?`, options: [`Pekiştirme`, `İkileme`, `Yansıma`, `Türetme`], correctIndex: 0 },
        { question: `"Masmavi" sözcüğündeki "mas-" eki neyi gösterir?`, options: [`Pekiştirme`, `Olumsuzluk`, `Çoğul`, `İlgi`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisinde "kırmak" sözcüğü gerçek anlamdadır?`, options: [`Bardağı kırdı.`, `Onun kalbini kırdı.`, `Rekoru kırdı.`, `Tabuyu kırdı.`], correctIndex: 0 },
        { question: `"Kırmak" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Çocuğun kalbini kırdı.`, `Tahtayı kırdı.`, `Camı kırdı.`, `Tabağı kırdı.`], correctIndex: 0 },
        { question: `"Ağır" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Ağır sözler söyledi.`, `Çanta çok ağırdı.`, `Ağır bir taş.`, `Ağır yük taşıdı.`], correctIndex: 0 },
        { question: `"Yıldız" sözcüğü hangisinde mecaz anlamdadır?`, options: [`O, sınıfın yıldızıdır.`, `Gökyüzünde yıldız var.`, `Yıldızlar parlıyor.`, `Yıldız kayması gördüm.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi çok anlamlı bir sözcüktür?`, options: [`Yüz`, `Telefon`, `Bilgisayar`, `Kalem`], correctIndex: 0 },
        { question: `"Bağ" sözcüğü hangisinde "üzüm bahçesi" anlamındadır?`, options: [`Bağda üzüm topladık.`, `Ayakkabımın bağı çözüldü.`, `Aramızda derin bağ var.`, `Saç bağı taktı.`], correctIndex: 0 },
        { question: `"Çıkmak" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Sınavdan iyi çıktı.`, `Evden çıktı.`, `Yokuş çıktık.`, `Dağa çıktı.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde sözcükler eş seslidir?`, options: [`Bin (sayı) – bin (binmek)`, `Sene – yıl`, `Uzun – kısa`, `Güzel – hoş`], correctIndex: 0 },
        { question: `"Gül - gül" sözcükleri arasındaki ilişki nedir?`, options: [`Sesteş`, `Eş anlamlı`, `Zıt anlamlı`, `Yakın anlamlı`], correctIndex: 0 },
        { question: `"Kara" sözcüğü hangisinde mecaz anlamdadır?`, options: [`Kara haber çabuk yayılır.`, `Kara çamur birikti.`, `Karadeniz'e gittik.`, `Kara kalem çizdim.`], correctIndex: 0 },
        { question: `"Gözden düşmek" deyimi ne anlama gelir?`, options: [`Sevilen biri olmaktan çıkmak`, `Gözünü kapatmak`, `Yere düşmek`, `Üzülmek`], correctIndex: 0 },
        { question: `"Burnu büyümek" deyimi ne anlama gelir?`, options: [`Kibirlenmek`, `Hastalanmak`, `Üzülmek`, `Korkmak`], correctIndex: 0 },
        { question: `"Pireyi deve yapmak" deyimi ne anlama gelir?`, options: [`Küçük şeyi büyütmek`, `Develeri sevmek`, `Yardım etmek`, `Yorulmak`], correctIndex: 0 },
        { question: `"Damlaya damlaya göl olur" atasözünün anlamı nedir?`, options: [`Az birikimle çok şey elde edilir`, `Yağmur göl oluşturur`, `Damla küçüktür`, `Su biriktirilmelidir`], correctIndex: 0 },
        { question: `"Tatlı dil yılanı deliğinden çıkarır" atasözü neyi anlatır?`, options: [`Güzel sözün etkisini`, `Yılan korkusunu`, `Tatlı sevmeyi`, `Mağaraları`], correctIndex: 0 },
        { question: `"Akıllı düşman akılsız dosttan iyidir" atasözünün anlamı nedir?`, options: [`Düşmanın akıllısı bile akılsız dosttan yeğdir`, `Akılsızlar zarar verir`, `Dostluk önemlidir`, `Düşmanlardan korkulmalıdır`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi "yakın anlamlı" sözcük çiftidir?`, options: [`Üzüntü - keder`, `Sıcak - soğuk`, `Ev - okul`, `Kalem - silgi`], correctIndex: 0 },
        { question: `"Geniş" sözcüğünün karşıt anlamlısı hangisidir?`, options: [`Dar`, `Uzun`, `Yüksek`, `Derin`], correctIndex: 0 },
        { question: `"Cömert" sözcüğünün karşıt anlamlısı hangisidir?`, options: [`Cimri`, `Zengin`, `Fakir`, `Yaramaz`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi "ad aktarması" (mecaz-ı mürsel) içerir?`, options: [`Bütün sınıf bunu okudu.`, `Sınıfa girdim.`, `Kitap okudum.`, `Bahçeye çıktım.`], correctIndex: 0 },
        { question: `"Sobayı yaktı." cümlesindeki "soba" sözcüğü hangi anlam ilişkisini kurar?`, options: [`Ad aktarması (içindeki yakacak yandı)`, `Eş anlam`, `Karşıt anlam`, `Sesteşlik`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `"Yarın mutlaka geleceğim." cümlesinde hangi anlam vardır?`, options: [`Kesinlik`, `Olasılık`, `Tahmin`, `Şart`], correctIndex: 0 },
        { question: `"Belki yağmur yağar." cümlesinde hangi anlam vardır?`, options: [`Olasılık`, `Kesinlik`, `Koşul`, `Sebep`], correctIndex: 0 },
        { question: `"Çalışırsan başarırsın." cümlesinde hangi anlam vardır?`, options: [`Koşul (şart)`, `Sebep-sonuç`, `Amaç`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Yağmur yağdığı için maç iptal edildi." cümlesinde hangi anlam vardır?`, options: [`Sebep-sonuç`, `Koşul`, `Amaç`, `Olasılık`], correctIndex: 0 },
        { question: `"Sınavı kazanmak için çok çalıştı." cümlesinde hangi anlam vardır?`, options: [`Amaç-sonuç`, `Sebep-sonuç`, `Koşul`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Senin kadar uzun değilim." cümlesinde hangi anlam vardır?`, options: [`Karşılaştırma`, `Koşul`, `Sebep`, `Amaç`], correctIndex: 0 },
        { question: `"Onun gibi sabırlı biri yoktur." cümlesindeki "gibi" sözcüğü hangi anlam ilgisi kurar?`, options: [`Benzetme`, `Eşitlik`, `Koşul`, `Sebep`], correctIndex: 0 },
        { question: `"Sanırım bugün geç kalacağım." cümlesinde hangi anlam vardır?`, options: [`Tahmin`, `Kesinlik`, `Şart`, `Sebep`], correctIndex: 0 },
        { question: `"Keşke daha çok çalışsaydım." cümlesinde hangi anlam vardır?`, options: [`Pişmanlık`, `Sevinç`, `Koşul`, `Beğeni`], correctIndex: 0 },
        { question: `"Aman dikkat et!" cümlesinde hangi anlam vardır?`, options: [`Uyarı`, `Önerme`, `Beğeni`, `Pişmanlık`], correctIndex: 0 },
        { question: `"Bence bu konuyu tekrar etmelisin." cümlesinde hangi anlam vardır?`, options: [`Öneri`, `Şart`, `Beğeni`, `Pişmanlık`], correctIndex: 0 },
        { question: `"Ne kadar güzel bir manzara!" cümlesinde hangi anlam vardır?`, options: [`Beğeni`, `Eleştiri`, `Uyarı`, `Şart`], correctIndex: 0 },
        { question: `"Bu kitap çok sıkıcıydı." cümlesinde hangi anlam vardır?`, options: [`Yakınma (eleştiri)`, `Beğeni`, `Şart`, `Uyarı`], correctIndex: 0 },
        { question: `"Tüm gün ders çalıştı, sınavı geçti." cümlesinde hangi anlam vardır?`, options: [`Sebep-sonuç`, `Karşılaştırma`, `Koşul`, `Amaç`], correctIndex: 0 },
        { question: `"Sen de gelseydin keşke." cümlesinde hangi duygu hâkimdir?`, options: [`Pişmanlık/özlem`, `Uyarı`, `Beğeni`, `Eleştiri`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi nesneldir?`, options: [`Türkiye'nin başkenti Ankara'dır.`, `Ankara çok güzel bir şehirdir.`, `En sevdiğim şehir Ankara'dır.`, `Ankara'nın havası bunaltıcıdır.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi özneldir?`, options: [`Bu film çok güzeldi.`, `Filmin süresi 120 dakikadır.`, `Film 2020'de çekildi.`, `Filmde 10 oyuncu vardır.`], correctIndex: 0 },
        { question: `"Su 100 °C'de kaynar." cümlesi nasıl bir cümledir?`, options: [`Nesnel`, `Öznel`, `Karşılaştırma`, `Tahmin`], correctIndex: 0 },
        { question: `"Yağmur yağarsa pikniği iptal ederiz." cümlesinde hangi anlam vardır?`, options: [`Koşul`, `Sebep`, `Amaç`, `Tahmin`], correctIndex: 0 },
        { question: `"Eve gitmek için otobüse bindim." cümlesinde hangi anlam vardır?`, options: [`Amaç-sonuç`, `Sebep-sonuç`, `Koşul`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"İçim daralıyor." cümlesinde hangi anlatım vardır?`, options: [`Mecaz`, `Gerçek`, `Soyut`, `Somut`], correctIndex: 0 },
        { question: `"Bütün eşyalarımı topladım." cümlesinde hangi anlatım vardır?`, options: [`Gerçek`, `Mecaz`, `Benzetme`, `Kişileştirme`], correctIndex: 0 },
        { question: `"Aslanım benim!" cümlesinde hangi söz sanatı vardır?`, options: [`Benzetme`, `Karşıtlık`, `Abartma`, `Soru`], correctIndex: 0 },
        { question: `"Dünyaları verseler bu mutluluğu değişmem." cümlesinde hangi söz sanatı vardır?`, options: [`Abartma`, `Benzetme`, `Karşıtlık`, `Kişileştirme`], correctIndex: 0 },
        { question: `"Çiçekler bana selam veriyor." cümlesinde hangi söz sanatı vardır?`, options: [`Kişileştirme`, `Benzetme`, `Abartma`, `Karşıtlık`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi olumludur?`, options: [`Sınava hazırlandım.`, `Sınava hazırlanmadım.`, `Sınava hiç çalışmadım.`, `Sınav iptal edildi.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi olumsuzdur?`, options: [`Hiç kimseyi görmedim.`, `Herkesle konuştum.`, `Sınıfa girdim.`, `Kapıyı açtım.`], correctIndex: 0 },
        { question: `"Hiç böyle bir şey duymadım." cümlesi anlamca nedir?`, options: [`Olumsuz`, `Olumlu`, `Soru`, `Şart`], correctIndex: 0 },
        { question: `"Yağmur yağıyordu, yine de dışarı çıktık." cümlesinde hangi anlam vardır?`, options: [`Beklenmeyen durum (karşıtlık)`, `Sebep`, `Şart`, `Amaç`], correctIndex: 0 },
        { question: `"Çok çalışmasına rağmen sınavda başarısız oldu." cümlesinde hangi anlam vardır?`, options: [`Karşıtlık (beklenenin tersi)`, `Sebep-sonuç`, `Şart`, `Amaç`], correctIndex: 0 },
        { question: `"Sözüm ona benim için geldi." cümlesindeki "sözüm ona" ne anlam katar?`, options: [`İnandırıcı olmama / kuşku`, `Kesinlik`, `Beğeni`, `Pişmanlık`], correctIndex: 0 },
        { question: `"Adeta bir kuş gibi uçtu." cümlesindeki "adeta" sözcüğü ne anlam katar?`, options: [`Benzerlik`, `Kesinlik`, `Olasılık`, `Şart`], correctIndex: 0 },
        { question: `"Henüz işini bitirmedi." cümlesindeki "henüz" sözcüğü ne anlam katar?`, options: [`Şimdiye kadar olmama`, `Şimdi olma`, `Yarın olma`, `Asla olmama`], correctIndex: 0 },
        { question: `"Galiba kapı çalıyor." cümlesinde hangi anlam vardır?`, options: [`Olasılık/tahmin`, `Kesinlik`, `Şart`, `Beğeni`], correctIndex: 0 },
        { question: `"Mutlaka derslerine çalışmalısın." cümlesinde hangi anlam vardır?`, options: [`Gereklilik/kesinlik`, `Olasılık`, `Şart`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Daha güzel bir kitap okumadım." cümlesinde hangi anlam vardır?`, options: [`Üstünlük karşılaştırması`, `Şart`, `Olasılık`, `Pişmanlık`], correctIndex: 0 },
        { question: `"Bu sınavı geçemezsen yaz okuluna kalırsın." cümlesinde hangi anlam vardır?`, options: [`Koşul-sonuç`, `Amaç-sonuç`, `Sebep-sonuç`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Bence en güzel mevsim ilkbahardır." cümlesi nasıl bir cümledir?`, options: [`Öznel`, `Nesnel`, `Şart`, `Sebep`], correctIndex: 0 },
        { question: `"Türkiye'nin yüzölçümü 783.562 km²'dir." cümlesi nasıl bir cümledir?`, options: [`Nesnel`, `Öznel`, `Şart`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Sen gelmedin ki ben de gelmedim." cümlesinde hangi anlam vardır?`, options: [`Sebep`, `Amaç`, `Şart`, `Beğeni`], correctIndex: 0 },
        { question: `"Ders çalışmak için kütüphaneye gitti." cümlesindeki "için" sözcüğü hangi anlam katar?`, options: [`Amaç`, `Sebep`, `Şart`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Hasta olduğum için okula gidemedim." cümlesindeki "için" sözcüğü hangi anlam katar?`, options: [`Sebep`, `Amaç`, `Şart`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Bu kitabı çocuk bile anlayabilir." cümlesinde hangi anlam vardır?`, options: [`Küçümseme / kolaylık vurgusu`, `Beğeni`, `Şart`, `Olasılık`], correctIndex: 0 },
        { question: `"Hava o kadar soğuktu ki kuşlar uçamıyordu." cümlesinde hangi anlam vardır?`, options: [`Abartma`, `Benzetme`, `Karşıtlık`, `Şart`], correctIndex: 0 },
        { question: `"Sözleri yumuşaktı." cümlesindeki "yumuşak" sözcüğü hangi anlamdadır?`, options: [`Mecaz`, `Gerçek`, `Terim`, `Yansıma`], correctIndex: 0 },
        { question: `"Bu yıl yağışlar oldukça azaldı." cümlesi nasıl bir cümledir?`, options: [`Nesnel`, `Öznel`, `Şart`, `Pişmanlık`], correctIndex: 0 },
        { question: `"İnşallah sınavı geçer." cümlesinde hangi anlam vardır?`, options: [`Dilek/temenni`, `Şart`, `Sebep`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Sen de bizimle gelsen iyi olur." cümlesinde hangi anlam vardır?`, options: [`Öneri`, `Emir`, `Şart`, `Sebep`], correctIndex: 0 },
        { question: `"Onun gibi çalışkanı görmedim." cümlesinde hangi anlam vardır?`, options: [`Üstünlük/karşılaştırma`, `Olasılık`, `Şart`, `Pişmanlık`], correctIndex: 0 },
        { question: `"Belki de haklısın." cümlesinde hangi anlam vardır?`, options: [`Olasılık`, `Kesinlik`, `Emir`, `Şart`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Paragrafta yazarın okuyucuya vermek istediği temel mesaja ne denir?`, options: [`Ana düşünce`, `Konu`, `Başlık`, `Anlatım biçimi`], correctIndex: 0 },
        { question: `Paragrafta üzerinde durulan, sözü edilen şeye ne denir?`, options: [`Konu`, `Ana düşünce`, `Yardımcı düşünce`, `Başlık`], correctIndex: 0 },
        { question: `Paragrafın içeriğini en kısa biçimde yansıtan, paragrafa verilen ada ne denir?`, options: [`Başlık`, `Konu`, `Ana düşünce`, `Anlatıcı`], correctIndex: 0 },
        { question: `Bir paragrafın başlığı en çok neyle ilgili olur?`, options: [`Ana düşünceyle`, `Yardımcı düşünceyle`, `Olayla`, `Anlatıcı tipiyle`], correctIndex: 0 },
        { question: `Bilimsel verilerle, kanıtlanabilir bilgilerle yapılan anlatıma ne denir?`, options: [`Açıklayıcı anlatım`, `Öyküleyici anlatım`, `Betimleyici anlatım`, `Tartışmacı anlatım`], correctIndex: 0 },
        { question: `Olayların kişi, yer ve zaman bildirilerek aktarıldığı anlatım türü hangisidir?`, options: [`Öyküleyici anlatım`, `Betimleyici anlatım`, `Açıklayıcı anlatım`, `Tartışmacı anlatım`], correctIndex: 0 },
        { question: `Bir varlığın ya da yerin görsel özelliklerinin sözcüklerle resim gibi anlatılmasına ne denir?`, options: [`Betimleyici anlatım`, `Öyküleyici anlatım`, `Açıklayıcı anlatım`, `Tartışmacı anlatım`], correctIndex: 0 },
        { question: `Bir düşünceyi karşı görüşle çürütüp kendi görüşünü kabul ettirmeye çalışan anlatım türü hangisidir?`, options: [`Tartışmacı anlatım`, `Açıklayıcı anlatım`, `Betimleyici anlatım`, `Öyküleyici anlatım`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi düşünceyi geliştirme yollarından biri DEĞİLDİR?`, options: [`Yansıma`, `Tanımlama`, `Örneklendirme`, `Karşılaştırma`], correctIndex: 0 },
        { question: `Bir kavramı, bir nesneyi bütün özellikleriyle açıklamaya ne denir?`, options: [`Tanımlama`, `Karşılaştırma`, `Örneklendirme`, `Tanık gösterme`], correctIndex: 0 },
        { question: `Bir düşünceyi inandırıcı kılmak için bir uzmanın sözünü aktarmaya ne denir?`, options: [`Tanık gösterme`, `Tanımlama`, `Örneklendirme`, `Karşılaştırma`], correctIndex: 0 },
        { question: `İki varlığı/durumu benzerlik ve farklılıkları yönüyle anlatmaya ne denir?`, options: [`Karşılaştırma`, `Örneklendirme`, `Tanımlama`, `Sayısal verilerden yararlanma`], correctIndex: 0 },
        { question: `Bir düşünceyi somutlaştırmak için ölçü, oran, istatistik vermeye ne denir?`, options: [`Sayısal verilerden yararlanma`, `Örneklendirme`, `Tanık gösterme`, `Karşılaştırma`], correctIndex: 0 },
        { question: `Düşünceyi daha iyi anlatmak için, ona ait somut/uygun bir vaka göstermeye ne denir?`, options: [`Örneklendirme`, `Karşılaştırma`, `Tanımlama`, `Tanık gösterme`], correctIndex: 0 },
        { question: `Paragrafın giriş cümlesi için aşağıdakilerden hangisi söylenebilir?`, options: [`Konuyu tanıtır, ilk fikri verir`, `Konuyu özetler`, `Konuyu kapatır`, `Konuyu derinleştirir`], correctIndex: 0 },
        { question: `Bir paragrafta gelişme bölümünün işlevi nedir?`, options: [`Konuyu örnek ve açıklamalarla derinleştirmek`, `Konuyu kapatmak`, `Sadece soru sormak`, `Başlık atmak`], correctIndex: 0 },
        { question: `Paragrafın sonuç bölümünün işlevi nedir?`, options: [`Konuyu özetleyip bir yargıya bağlamak`, `Konuya yeni örnek katmak`, `Yeni bir konu açmak`, `Karşı fikir öne sürmek`], correctIndex: 0 },
        { question: `Paragrafta anlatım birliği nedir?`, options: [`Tüm cümlelerin tek bir konuyu işlemesi`, `Çok sayıda konu işlenmesi`, `Her cümlenin ayrı bir kişiyi anlatması`, `Tek bir kişinin konuşması`], correctIndex: 0 },
        { question: `Paragrafın akışını bozan cümleyi anlamak için ne yapmalıyız?`, options: [`Konuyla ilgisi olmayan cümleyi bulmalıyız`, `En uzun cümleyi seçmeliyiz`, `İlk cümleyi seçmeliyiz`, `Soru cümlesini seçmeliyiz`], correctIndex: 0 },
        { question: `"Bu paragrafın başına nasıl bir cümle getirilebilir?" sorusu için en uygun cümle hangisidir?`, options: [`Konuya giriş yapan, sonraki cümlelerle bağlantılı bir cümle`, `Konuyu özetleyen son cümle`, `Bağsız bir cümle`, `Soru cümlesi olmalı`], correctIndex: 0 },
        { question: `Paragrafa "böylece", "sonuç olarak" gibi sözlerle başlayan bir cümle hangi bölüme aittir?`, options: [`Sonuç`, `Giriş`, `Gelişme`, `Başlık`], correctIndex: 0 },
        { question: `Paragrafta yer ve zaman bildiren ifadeler hangi anlatım türünü kuvvetlendirir?`, options: [`Öyküleyici`, `Açıklayıcı`, `Tartışmacı`, `Tanımlayıcı`], correctIndex: 0 },
        { question: `"Bence", "kanımca", "sanırım" gibi ifadeler hangi anlatımı gösterir?`, options: [`Öznel anlatım`, `Nesnel anlatım`, `Açıklayıcı anlatım`, `Bilimsel anlatım`], correctIndex: 0 },
        { question: `Bir paragrafın türü "anı" ise hangisini içerir?`, options: [`Yazarın yaşadığı geçmiş olaylar`, `Bilimsel veriler`, `Tartışma`, `Tanım`], correctIndex: 0 },
        { question: `Bir paragrafın türü "deneme" ise temel özelliği nedir?`, options: [`Yazarın bir konuyu kanıtlama kaygısı taşımadan tartışması`, `Bilimsel kanıt sunması`, `Olay anlatması`, `Manzara betimlemesi`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi paragrafın yardımcı düşüncesidir?`, options: [`Ana düşünceyi destekleyen ek fikir`, `Paragrafın konusu`, `Paragrafın başlığı`, `Paragrafın türü`], correctIndex: 0 },
        { question: `Paragrafta "okuyucuya verilmek istenen mesaj" hangisidir?`, options: [`Ana düşünce`, `Konu`, `Anlatıcı`, `Olay`], correctIndex: 0 },
        { question: `Paragrafta düşünce akışını sağlayan, cümleler arası bağı kuran sözcüklere ne denir?`, options: [`Bağlayıcı (geçiş) sözcükler`, `Yansıma sözcükler`, `Pekiştirme sözcükler`, `İkilemeler`], correctIndex: 0 },
        { question: `"Çünkü, fakat, ancak, oysa" gibi sözcükler paragrafta hangi göreve sahiptir?`, options: [`Cümleler arasında anlam bağı kurar`, `Soru sorar`, `Başlık olur`, `Konu açıklar`], correctIndex: 0 },
        { question: `Paragrafın konusu ve ana düşüncesi arasındaki temel fark nedir?`, options: [`Konu sözü edilen şey; ana düşünce verilen mesajdır`, `İkisi de aynıdır`, `Konu cümle, ana düşünce başlıktır`, `Konu son cümle, ana düşünce ilk cümledir`], correctIndex: 0 },
        { question: `Paragrafta "anlatım biçimi" nedir?`, options: [`Konuyu sunma yolu (öyküleyici/betimleyici/açıklayıcı/tartışmacı)`, `Paragrafın türü`, `Paragrafın başlığı`, `Paragrafın sözcük sayısı`], correctIndex: 0 },
        { question: `"Sokakta yağmur şıpır şıpır yağıyordu, ağaçlar yapraklarını sallıyordu." cümlesi hangi anlatım biçimine örnektir?`, options: [`Betimleyici`, `Öyküleyici`, `Açıklayıcı`, `Tartışmacı`], correctIndex: 0 },
        { question: `"Su, kimyasal olarak iki hidrojen ve bir oksijen atomundan oluşur." cümlesi hangi anlatım biçimine örnektir?`, options: [`Açıklayıcı`, `Öyküleyici`, `Betimleyici`, `Tartışmacı`], correctIndex: 0 },
        { question: `"O sabah erken kalktı, kahvaltısını etti ve okula gitti." cümlesi hangi anlatım biçimine örnektir?`, options: [`Öyküleyici`, `Betimleyici`, `Açıklayıcı`, `Tartışmacı`], correctIndex: 0 },
        { question: `"Bazıları sosyal medyanın gençleri olumsuz etkilediğini söylüyor, oysa biz farklı düşünüyoruz." cümlesi hangi anlatımdır?`, options: [`Tartışmacı`, `Öyküleyici`, `Betimleyici`, `Açıklayıcı`], correctIndex: 0 },
        { question: `"Örneğin, Ali Bey her gün spor yaparak sağlığını korumuştur." ifadesi hangi düşünceyi geliştirme yoludur?`, options: [`Örneklendirme`, `Karşılaştırma`, `Tanımlama`, `Tanık gösterme`], correctIndex: 0 },
        { question: `"Atatürk: 'Eğitimdir ki bir milleti ya hür, bağımsız, şanlı, yüksek bir topluluk hâlinde yaşatır.' demiştir." ifadesi hangi düşünceyi geliştirme yoludur?`, options: [`Tanık gösterme`, `Karşılaştırma`, `Örneklendirme`, `Tanımlama`], correctIndex: 0 },
        { question: `"İnsanların %80'i günde en az 1 saat sosyal medya kullanıyor." ifadesi hangi düşünceyi geliştirme yoludur?`, options: [`Sayısal verilerden yararlanma`, `Tanımlama`, `Örneklendirme`, `Tanık gösterme`], correctIndex: 0 },
        { question: `"Edebiyat, duygu ve düşüncelerin sanatlı bir biçimde anlatılmasıdır." ifadesi hangi düşünceyi geliştirme yoludur?`, options: [`Tanımlama`, `Tanık gösterme`, `Sayısal veri`, `Karşılaştırma`], correctIndex: 0 },
        { question: `"Roman uzun, hikâye ise daha kısadır." ifadesi hangi düşünceyi geliştirme yoludur?`, options: [`Karşılaştırma`, `Tanımlama`, `Örneklendirme`, `Tanık gösterme`], correctIndex: 0 },
        { question: `Paragrafta "konunun sınırlandırıldığı" en güçlü ifade hangisinde olur?`, options: [`Başlıkta`, `Konuda`, `Yardımcı düşüncede`, `Anlatım biçiminde`], correctIndex: 0 },
        { question: `Paragrafın akışına uygun, ondan koparılmış bir cümle nasıl yerleştirilir?`, options: [`Cümlelerdeki bağlayıcı ve gönderim ipuçlarına göre`, `İlk sıraya konulur`, `Son sıraya konulur`, `Rastgele yerleştirilir`], correctIndex: 0 },
        { question: `Paragrafta ikiye bölündüğünde "ilk bölümün son cümlesi" genellikle ne işlevdedir?`, options: [`İlk konuyu özetleyip yeni konuya geçişi haber verir`, `Yeni bir başlık atar`, `Soru sorar`, `Tanım yapar`], correctIndex: 0 },
        { question: `"Bu paragraftan hangisi çıkarılamaz?" sorusunda doğru yaklaşım nedir?`, options: [`Paragrafta dolaylı/dolaysız desteklenmeyen yargıyı seçmek`, `En kısa şıkkı seçmek`, `En uzun şıkkı seçmek`, `Soru cümlesi içereni seçmek`], correctIndex: 0 },
        { question: `Paragrafın "anlatıcı tipi" nedir?`, options: [`Olayın kim tarafından anlatıldığı (ben/o/biz)`, `Olayın geçtiği yer`, `Olayın zamanı`, `Anlatım biçimi`], correctIndex: 0 },
        { question: `Paragrafta "I. tekil kişi (ben)" anlatım hangi türde sık görülür?`, options: [`Anı, günlük, otobiyografi`, `Fıkra`, `Eleştiri`, `Bilimsel makale`], correctIndex: 0 },
        { question: `Bir paragrafta "ana düşünce" en sık hangi bölümde verilir?`, options: [`Giriş ya da sonuçta`, `Sadece ortada`, `Sadece başlıkta`, `Sadece son cümlede`], correctIndex: 0 },
        { question: `"Paragrafın konusu nedir?" sorusunun yanıtı nasıl bir ifade olmalıdır?`, options: [`Kısa bir öbek/cümle parçası`, `Uzun bir paragraf`, `Bir soru cümlesi`, `Sadece tek sözcük olmalı`], correctIndex: 0 },
        { question: `Paragraf tamamlama sorularında doğru cevap hangi özelliğe sahiptir?`, options: [`Paragrafın anlam akışıyla uyumlu olur`, `En uzun şık doğrudur`, `En kısa şık doğrudur`, `Soru cümlesi olan şık doğrudur`], correctIndex: 0 },
        { question: `Paragrafta "anlamca çelişen" cümleyi bulmak için ne yapılmalıdır?`, options: [`Diğer cümlelerle ters fikir bildiren cümle aranır`, `İlk cümle seçilir`, `Son cümle seçilir`, `En uzun cümle seçilir`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Aşağıdakilerden hangisi fiilimsi türü DEĞİLDİR?`, options: [`Çekim eki`, `İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`], correctIndex: 0 },
        { question: `İsim-fiil ekleri hangileridir?`, options: [`-mak/-mek, -ma/-me, -ış/-iş`, `-an/-en, -dik/-dık`, `-ince/-erek/-ip`, `-acak/-ecek`], correctIndex: 0 },
        { question: `Sıfat-fiil ekleri hangileridir?`, options: [`-an/-en, -ası/-esi, -mez/-maz, -ar/-er, -dik/-dık, -ecek/-acak, -miş/-mış`, `-mak/-mek, -ma/-me`, `-ince/-erek/-ip`, `-ken, -dıkça`], correctIndex: 0 },
        { question: `Zarf-fiil (bağ-fiil) ekleri hangileridir?`, options: [`-ip, -erek/-arak, -ince/-ınca, -dıkça/-dikçe, -ken, -madan/-meden, -alı/-eli`, `-mak/-mek, -ma/-me, -ış/-iş`, `-an/-en, -dik/-dık`, `-acak/-ecek`], correctIndex: 0 },
        { question: `"Koşmak yorucudur." cümlesinde "koşmak" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Okuma kitabı aldım." ifadesinde "okuma" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Yürüyüş yapmak iyidir." cümlesinde "yürüyüş" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Koşan çocuk yoruldu." cümlesinde "koşan" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Görmediğim yer yok." cümlesinde "görmediğim" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Okunacak kitaplar var." cümlesinde "okunacak" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Yaşanmış olaylardan ders alınmalı." cümlesinde "yaşanmış" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Eve gidince ödevini yaptı." cümlesinde "gidince" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Koşarak kapıyı açtı." cümlesinde "koşarak" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Düşünmeden konuştu." cümlesinde "düşünmeden" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Kapıyı açıp içeri girdi." cümlesinde "açıp" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Yağmur yağdıkça su birikti." cümlesinde "yağdıkça" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi fiilimsi içerir?`, options: [`Çalışırken müzik dinlerim.`, `Ben çalışıyorum.`, `Müzik güzeldir.`, `Bugün yorgunum.`], correctIndex: 0 },
        { question: `"Çalışkan öğrenci başarılı olur." cümlesinde fiilimsi var mıdır?`, options: [`Yoktur`, `Vardır (çalışkan)`, `Vardır (olur)`, `Vardır (öğrenci)`], correctIndex: 0 },
        { question: `Fiilimsiler aşağıdaki seçeneklerin hangisini yapmazlar?`, options: [`Cümlede yüklem (çekimli fiil) olamazlar`, `İsim, sıfat ya da zarf görevinde olabilirler`, `Yan cümlecik kurabilirler`, `Cümleyi birleşik yapabilirler`], correctIndex: 0 },
        { question: `Bir cümlede fiilimsi varsa o cümle genellikle ne tür bir cümledir?`, options: [`Birleşik cümle`, `Basit cümle`, `Sıralı cümle`, `Bağlı cümle`], correctIndex: 0 },
        { question: `"Geleceğim gün belli değil." cümlesinde "geleceğim" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `Zarf-fiil`, `İsim-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Konuşmaktan zevk alıyor." cümlesinde "konuşmaktan" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Bilgisayar kullanma kursuna gittim." cümlesinde fiilimsi hangisidir?`, options: [`kullanma`, `gittim`, `kursuna`, `bilgisayar`], correctIndex: 0 },
        { question: `"Sevinçten ağlayan kız çiçek tuttu." cümlesinde fiilimsi hangisidir?`, options: [`ağlayan`, `tuttu`, `sevinçten`, `çiçek`], correctIndex: 0 },
        { question: `"Yağmur başlayalı uyumadım." cümlesinde "başlayalı" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Onu görmeyeli yıllar oldu." cümlesinde "görmeyeli" hangi fiilimsidir?`, options: [`Zarf-fiil`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Çocukların oynayışına bayıldım." cümlesinde "oynayışına" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Tanıdık biri çıktı." cümlesinde "tanıdık" hangi fiilimsidir?`, options: [`Sıfat-fiil`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Akmaz bir su gördüm." cümlesinde "akmaz" hangi fiilimsidir?`, options: [`Sıfat-fiil (mez/maz)`, `Zarf-fiil`, `İsim-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Yıkılası bir köşk gördüm." cümlesinde "yıkılası" hangi fiilimsidir?`, options: [`Sıfat-fiil (ası/esi)`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Çalışırken telefonu çaldı." cümlesinde "çalışırken" hangi fiilimsidir?`, options: [`Zarf-fiil (-ken)`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi fiilimsi içermez?`, options: [`Bu kitabı çok beğendim.`, `Okuyacağım kitap raftadır.`, `Yağmur yağınca sokak ıslandı.`, `Gülümseyen çocuk koştu.`], correctIndex: 0 },
        { question: `"Çiçek satıcısı kapıda durdu." cümlesinde "satıcı" sözcüğü fiilimsi midir?`, options: [`Hayır, -cı eki kalıcı isim yapar`, `Evet, isim-fiildir`, `Evet, sıfat-fiildir`, `Evet, zarf-fiildir`], correctIndex: 0 },
        { question: `"-ma/-me" eki her yerde isim-fiil midir?`, options: [`Hayır; olumsuzluk eki "-ma/-me" ile karıştırılmamalıdır`, `Evet, her zaman isim-fiildir`, `Evet, her zaman sıfat-fiildir`, `Hayır, her zaman zarf-fiildir`], correctIndex: 0 },
        { question: `"Gelme!" cümlesinde "gel-me" ekinin görevi nedir?`, options: [`Olumsuzluk eki (fiilimsi değil)`, `İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`], correctIndex: 0 },
        { question: `"Yürüyüş alanı yeniden yapıldı." cümlesinde fiilimsi hangisidir?`, options: [`yürüyüş`, `alanı`, `yeniden`, `yapıldı`], correctIndex: 0 },
        { question: `"Düşünüp karar verdi." cümlesinde "düşünüp" hangi fiilimsidir?`, options: [`Zarf-fiil (-ip)`, `İsim-fiil`, `Sıfat-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `"Yorgun argın eve dönmüştü." cümlesinde fiilimsi var mıdır?`, options: [`Yoktur`, `Vardır (yorgun)`, `Vardır (dönmüştü)`, `Vardır (eve)`], correctIndex: 0 },
        { question: `"Söylemiş olduğun sözleri unutmadım." cümlesinde "söylemiş" hangi fiilimsidir?`, options: [`Sıfat-fiil (-miş)`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde isim-fiil vardır?`, options: [`Yüzmek sağlığa faydalıdır.`, `Yüzen çocuk yoruldu.`, `Yüzerek karşıya geçti.`, `Yüzüyorum.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde sıfat-fiil vardır?`, options: [`Susuz kalan bitki soldu.`, `Suyumuzu içtik.`, `Bu çok güzel bir gün.`, `Susuyorduk.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde zarf-fiil vardır?`, options: [`Eve giderken markete uğradım.`, `Eve gittim.`, `Evimiz çok güzel.`, `Ev küçüktü.`], correctIndex: 0 },
        { question: `"Bilmediğim bir konuyu öğrendim." cümlesinde kaç fiilimsi vardır?`, options: [`1`, `2`, `3`, `0`], correctIndex: 0 },
        { question: `"Okuyup öğrendiklerimi yazıyorum." cümlesinde kaç fiilimsi vardır?`, options: [`2 (okuyup, öğrendiklerimi)`, `1`, `3`, `0`], correctIndex: 0 },
        { question: `Fiilimsi bulunduran cümle birleşik cümledir; çünkü ne içerir?`, options: [`Yan cümlecik`, `Birden çok yüklem`, `Birden çok özne`, `Birden çok bağlaç`], correctIndex: 0 },
        { question: `"Doğan güneş geceyi sona erdirir." cümlesinde "doğan" hangi fiilimsidir?`, options: [`Sıfat-fiil (-an)`, `İsim-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `Aşağıdaki sıfat-fiil eklerinden hangisi gelecek zaman bildirir?`, options: [`-acak/-ecek`, `-an/-en`, `-mış/-miş`, `-ar/-er`], correctIndex: 0 },
        { question: `"Sandalyede oturmakta olan adam babamdı." cümlesinde fiilimsi hangisidir?`, options: [`oturmakta (olan)`, `babamdı`, `sandalyede`, `adam`], correctIndex: 0 },
        { question: `"Susmayı bilmiyorsun." cümlesinde "susmayı" hangi fiilimsidir?`, options: [`İsim-fiil`, `Sıfat-fiil`, `Zarf-fiil`, `Çekimli fiil`], correctIndex: 0 },
        { question: `Bir cümlede iki fiilimsi olabilir mi?`, options: [`Evet, olabilir`, `Hayır, asla olmaz`, `Sadece soru cümlelerinde olur`, `Sadece olumsuz cümlelerde olur`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Cümlenin temel ögeleri hangileridir?`, options: [`Yüklem ve özne`, `Nesne ve yüklem`, `Zarf ve nesne`, `Özne ve nesne`], correctIndex: 0 },
        { question: `Cümlenin yardımcı ögeleri hangileridir?`, options: [`Nesne, dolaylı tümleç, zarf tümleci`, `Özne ve yüklem`, `Sadece nesne`, `Sadece dolaylı tümleç`], correctIndex: 0 },
        { question: `Yüklem nedir?`, options: [`Cümlede iş, oluş, hareket veya yargı bildiren çekimli sözcüktür`, `Cümlede işi yapan ögedir`, `Cümlede işten etkilenen ögedir`, `Cümlenin yer anlamı bildiren ögesidir`], correctIndex: 0 },
        { question: `Özne, yükleme hangi soru sorularak bulunur?`, options: [`Kim/Ne`, `Kimi/Neyi`, `Nereye/Nereden`, `Nasıl/Niçin`], correctIndex: 0 },
        { question: `Belirtili nesne, yükleme hangi soru sorularak bulunur?`, options: [`Kimi/Neyi`, `Kim/Ne`, `Nereye`, `Nasıl`], correctIndex: 0 },
        { question: `Belirtisiz nesne, yükleme hangi soru sorularak bulunur?`, options: [`Ne`, `Kimi`, `Neyi`, `Nereye`], correctIndex: 0 },
        { question: `Dolaylı tümleç, yükleme hangi sorular sorularak bulunur?`, options: [`-e/-de/-den hâl ekleri (Nereye, Nerede, Nereden, Kime, Kimde, Kimden)`, `Kimi/Neyi`, `Nasıl/Niçin`, `Kim/Ne`], correctIndex: 0 },
        { question: `Zarf tümleci, yükleme hangi sorularla bulunur?`, options: [`Nasıl, Ne zaman, Niçin, Ne kadar`, `Kim/Ne`, `Kimi/Neyi`, `Nerede`], correctIndex: 0 },
        { question: `"Ali okula gitti." cümlesinde özne nedir?`, options: [`Ali`, `okula`, `gitti`, `okul`], correctIndex: 0 },
        { question: `"Ali okula gitti." cümlesinde yüklem nedir?`, options: [`gitti`, `Ali`, `okula`, `okula gitti`], correctIndex: 0 },
        { question: `"Ali okula gitti." cümlesinde "okula" sözcüğünün görevi nedir?`, options: [`Dolaylı tümleç`, `Nesne`, `Zarf tümleci`, `Özne`], correctIndex: 0 },
        { question: `"Çocuk kitabı okudu." cümlesinde "kitabı" sözcüğünün görevi nedir?`, options: [`Belirtili nesne`, `Belirtisiz nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Çocuk kitap okudu." cümlesinde "kitap" sözcüğünün görevi nedir?`, options: [`Belirtisiz nesne`, `Belirtili nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Dün eve geç geldim." cümlesinde "dün" sözcüğünün görevi nedir?`, options: [`Zarf tümleci (zaman)`, `Dolaylı tümleç`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Dün eve geç geldim." cümlesinde "eve" sözcüğünün görevi nedir?`, options: [`Dolaylı tümleç`, `Zarf tümleci`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Dün eve geç geldim." cümlesinde "geç" sözcüğünün görevi nedir?`, options: [`Zarf tümleci (durum)`, `Dolaylı tümleç`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Yağmur yağıyor." cümlesinde özne nedir?`, options: [`Yağmur`, `yağıyor`, `(gizli)`, `Bilinmiyor`], correctIndex: 0 },
        { question: `"Çalışıyorum." cümlesinde özne nedir?`, options: [`Gizli özne (ben)`, `Çalışıyorum`, `Yoktur`, `Çalış`], correctIndex: 0 },
        { question: `Cümlede özne açıkça belirtilmemişse, yüklemden anlaşılan özneye ne denir?`, options: [`Gizli özne`, `Sözde özne`, `Belirtili özne`, `Yapma özne`], correctIndex: 0 },
        { question: `Edilgen çatılı fiillerde işi yapan belli değildir, görünüşte özne olan ögeye ne denir?`, options: [`Sözde özne`, `Gizli özne`, `Gerçek özne`, `Belirtili özne`], correctIndex: 0 },
        { question: `"Cam kırıldı." cümlesinde "cam" hangi öznedir?`, options: [`Sözde özne`, `Gerçek özne`, `Gizli özne`, `Belirtisiz özne`], correctIndex: 0 },
        { question: `"Ali camı kırdı." cümlesinde "Ali" hangi öznedir?`, options: [`Gerçek özne`, `Sözde özne`, `Gizli özne`, `Belirtisiz özne`], correctIndex: 0 },
        { question: `Yüklemi fiil olan cümleye ne denir?`, options: [`Fiil cümlesi`, `İsim cümlesi`, `Kurallı cümle`, `Devrik cümle`], correctIndex: 0 },
        { question: `Yüklemi isim soylu sözcük (+i.dir) olan cümleye ne denir?`, options: [`İsim cümlesi`, `Fiil cümlesi`, `Kurallı cümle`, `Devrik cümle`], correctIndex: 0 },
        { question: `"Bu ev güzeldir." cümlesi yüklemine göre nedir?`, options: [`İsim cümlesi`, `Fiil cümlesi`, `Soru cümlesi`, `Olumsuz cümle`], correctIndex: 0 },
        { question: `"Çocuklar oyun oynuyor." cümlesi yüklemine göre nedir?`, options: [`Fiil cümlesi`, `İsim cümlesi`, `Devrik cümle`, `Eksiltili cümle`], correctIndex: 0 },
        { question: `Yüklemi sonda olan cümleye ne denir?`, options: [`Kurallı cümle`, `Devrik cümle`, `Eksiltili cümle`, `Bağlı cümle`], correctIndex: 0 },
        { question: `Yüklemi sonda olmayan cümleye ne denir?`, options: [`Devrik cümle`, `Kurallı cümle`, `Bağlı cümle`, `Sıralı cümle`], correctIndex: 0 },
        { question: `"Geldi kuşlar bahçeye." cümlesi yapısına göre nasıl bir cümledir?`, options: [`Devrik cümle`, `Kurallı cümle`, `Soru cümlesi`, `Olumsuz cümle`], correctIndex: 0 },
        { question: `"Bahçeye kuşlar geldi." cümlesi nedir?`, options: [`Kurallı cümle`, `Devrik cümle`, `Eksiltili cümle`, `Soru cümlesi`], correctIndex: 0 },
        { question: `Yüklemi söylenmeyen ama anlaşılan cümleye ne denir?`, options: [`Eksiltili cümle`, `Devrik cümle`, `Sıralı cümle`, `Kurallı cümle`], correctIndex: 0 },
        { question: `"Sınıfta tek bir çocuk..." cümlesi nasıl bir cümledir?`, options: [`Eksiltili cümle`, `Devrik cümle`, `Soru cümlesi`, `Olumlu cümle`], correctIndex: 0 },
        { question: `"Onu çok seviyorum." cümlesinde "onu" hangi ögedir?`, options: [`Belirtili nesne`, `Belirtisiz nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Annem yemek pişiriyor." cümlesinde "yemek" hangi ögedir?`, options: [`Belirtisiz nesne`, `Belirtili nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Akşam parkta yürüdüm." cümlesinde "parkta" hangi ögedir?`, options: [`Dolaylı tümleç`, `Zarf tümleci`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Akşam parkta yürüdüm." cümlesinde "akşam" hangi ögedir?`, options: [`Zarf tümleci (zaman)`, `Dolaylı tümleç`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Annesine güzel bir hediye aldı." cümlesinde "annesine" hangi ögedir?`, options: [`Dolaylı tümleç`, `Zarf tümleci`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Annesine güzel bir hediye aldı." cümlesinde "güzel bir hediye" hangi ögedir?`, options: [`Belirtisiz nesne`, `Belirtili nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Bahçeden çiçek topladı." cümlesinde "bahçeden" hangi ögedir?`, options: [`Dolaylı tümleç`, `Zarf tümleci`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Hızla koştu." cümlesinde "hızla" hangi ögedir?`, options: [`Zarf tümleci`, `Dolaylı tümleç`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `"Sınıfa giren öğrenci kitabını çıkardı." cümlesinde özne nedir?`, options: [`Sınıfa giren öğrenci`, `Sınıfa giren`, `Öğrenci`, `Kitabını`], correctIndex: 0 },
        { question: `Cümlede özne ve yüklem dışındaki ögelere ne ad verilir?`, options: [`Yardımcı ögeler`, `Temel ögeler`, `Bağlı ögeler`, `Sözde ögeler`], correctIndex: 0 },
        { question: `Bir cümlede mutlaka bulunması gereken öge hangisidir?`, options: [`Yüklem`, `Nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Akşamleyin telefonla konuşur." cümlesinde "telefonla" hangi ögedir?`, options: [`Edat tümleci (zarf tümleci)`, `Dolaylı tümleç`, `Nesne`, `Özne`], correctIndex: 0 },
        { question: `Cümle ögeleri bulunurken hangi öge önce bulunmalıdır?`, options: [`Yüklem`, `Özne`, `Nesne`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Çocuklara hikâye anlattım." cümlesinde "çocuklara" hangi ögedir?`, options: [`Dolaylı tümleç`, `Belirtili nesne`, `Belirtisiz nesne`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Yemeği pişirdim." cümlesinde "yemeği" hangi nesnedir?`, options: [`Belirtili nesne`, `Belirtisiz nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `"Yemek pişirdim." cümlesinde "yemek" hangi nesnedir?`, options: [`Belirtisiz nesne`, `Belirtili nesne`, `Dolaylı tümleç`, `Zarf tümleci`], correctIndex: 0 },
        { question: `Bir cümlenin tek bir yargı, tek bir yüklem etrafında oluşmasına ne denir?`, options: [`Basit cümle`, `Birleşik cümle`, `Bağlı cümle`, `Sıralı cümle`], correctIndex: 0 },
        { question: `İçinde fiilimsi bulunan cümle hangi tür cümledir?`, options: [`Birleşik cümle`, `Basit cümle`, `Sıralı cümle`, `Bağlı cümle`], correctIndex: 0 },
        { question: `"Bugün yorgunum, çünkü çok çalıştım." cümlesi yapısına göre nedir?`, options: [`Bağlı cümle`, `Basit cümle`, `Birleşik cümle`, `Eksiltili cümle`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Fiilde çatı kaç açıdan incelenir?`, options: [`İki (özne ve nesne)`, `Bir`, `Üç`, `Dört`], correctIndex: 0 },
        { question: `Özne-yüklem ilişkisine göre fiil türleri nelerdir?`, options: [`Etken, edilgen, dönüşlü, işteş`, `Geçişli, geçişsiz`, `Olumlu, olumsuz`, `Basit, türemiş, birleşik`], correctIndex: 0 },
        { question: `Nesne-yüklem ilişkisine göre fiil türleri nelerdir?`, options: [`Geçişli, geçişsiz`, `Etken, edilgen`, `Dönüşlü, işteş`, `Olumlu, olumsuz`], correctIndex: 0 },
        { question: `Yüklemin bildirdiği işi yapan, gerçek özne olan cümlelere ne denir?`, options: [`Etken çatılı cümle`, `Edilgen çatılı cümle`, `Dönüşlü çatılı cümle`, `İşteş çatılı cümle`], correctIndex: 0 },
        { question: `Yüklemin bildirdiği iş, kim tarafından yapıldığı belli olmayan; öznesi sözde özne olan cümlelere ne denir?`, options: [`Edilgen çatılı cümle`, `Etken çatılı cümle`, `Dönüşlü çatılı cümle`, `İşteş çatılı cümle`], correctIndex: 0 },
        { question: `Edilgen çatılı fiil oluştururken hangi ekler eklenir?`, options: [`-l, -n`, `-ş`, `-ar/-er`, `-i, -t`], correctIndex: 0 },
        { question: `"Cam kırıldı." cümlesi çatısı bakımından nedir?`, options: [`Edilgen`, `Etken`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `"Ali camı kırdı." cümlesi çatısı bakımından nedir?`, options: [`Etken`, `Edilgen`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `İşin özne tarafından yapılıp kendine döndüğü çatıya ne denir?`, options: [`Dönüşlü`, `Edilgen`, `Etken`, `İşteş`], correctIndex: 0 },
        { question: `Dönüşlü fiil eki hangileridir?`, options: [`-n, -l`, `-ar/-er`, `-i, -t`, `-mak/-mek`], correctIndex: 0 },
        { question: `"Çocuk yıkandı." (kendi kendini yıkadı) cümlesi çatısı bakımından nedir?`, options: [`Dönüşlü`, `Edilgen`, `Etken`, `İşteş`], correctIndex: 0 },
        { question: `İşin birden çok özne tarafından karşılıklı veya birlikte yapıldığı çatıya ne denir?`, options: [`İşteş`, `Dönüşlü`, `Edilgen`, `Etken`], correctIndex: 0 },
        { question: `İşteş çatı eki hangisidir?`, options: [`-ş`, `-l`, `-n`, `-t`], correctIndex: 0 },
        { question: `"Mektuplaştılar." cümlesi çatısı bakımından nedir?`, options: [`İşteş`, `Dönüşlü`, `Edilgen`, `Etken`], correctIndex: 0 },
        { question: `"Çocuklar sokakta koşuştu." cümlesi çatısı bakımından nedir?`, options: [`İşteş`, `Dönüşlü`, `Edilgen`, `Etken`], correctIndex: 0 },
        { question: `Nesne alabilen fiile ne denir?`, options: [`Geçişli`, `Geçişsiz`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `Nesne alamayan fiile ne denir?`, options: [`Geçişsiz`, `Geçişli`, `Edilgen`, `Etken`], correctIndex: 0 },
        { question: `Aşağıdaki fiillerden hangisi geçişlidir?`, options: [`okumak`, `gülmek`, `koşmak`, `uyumak`], correctIndex: 0 },
        { question: `Aşağıdaki fiillerden hangisi geçişsizdir?`, options: [`uyumak`, `okumak`, `yazmak`, `görmek`], correctIndex: 0 },
        { question: `"Kitabı okudum." cümlesindeki "okumak" fiili nesne-yüklem ilişkisine göre nedir?`, options: [`Geçişli`, `Geçişsiz`, `Edilgen`, `Dönüşlü`], correctIndex: 0 },
        { question: `"Bahçede koştu." cümlesindeki "koşmak" fiili nesne-yüklem ilişkisine göre nedir?`, options: [`Geçişsiz`, `Geçişli`, `Edilgen`, `Dönüşlü`], correctIndex: 0 },
        { question: `Geçişli fiilden geçişsiz fiil yapan ek hangisidir?`, options: [`-l/-n (edilgenlik eki)`, `-t`, `-ar/-er`, `-mak/-mek`], correctIndex: 0 },
        { question: `Geçişsiz bir fiili "geçişli" yapan ek hangisidir?`, options: [`-t, -tır, -dır (oldurganlık eki)`, `-l, -n`, `-mak`, `-an, -en`], correctIndex: 0 },
        { question: `"Uyumak" fiili "uyutmak" yapılarak hangi çatı kazanılır?`, options: [`Oldurgan (geçişli)`, `Etkligen`, `İşteş`, `Dönüşlü`], correctIndex: 0 },
        { question: `Geçişli bir fiilin geçişliliğini artıran ekle elde edilen çatıya ne denir?`, options: [`Ettirgen`, `Oldurgan`, `Edilgen`, `İşteş`], correctIndex: 0 },
        { question: `"Yazmak → yazdırmak" değişimi hangi çatıyı verir?`, options: [`Ettirgen`, `Oldurgan`, `Edilgen`, `Dönüşlü`], correctIndex: 0 },
        { question: `"Görüşmek" fiilinin çatısı nedir?`, options: [`İşteş`, `Edilgen`, `Etken`, `Dönüşlü`], correctIndex: 0 },
        { question: `"Yorulmak" fiilinin çatısı nedir?`, options: [`Dönüşlü`, `Edilgen`, `Etken`, `İşteş`], correctIndex: 0 },
        { question: `"Kapı açıldı." cümlesinde işi yapan belli değildir; çatı nedir?`, options: [`Edilgen`, `Etken`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `"Ali kapıyı açtı." cümlesinde gerçek özne vardır; çatı nedir?`, options: [`Etken`, `Edilgen`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `Etken çatılı cümlede özne ne tür özne olur?`, options: [`Gerçek özne`, `Sözde özne`, `Gizli özne`, `Yok`], correctIndex: 0 },
        { question: `Edilgen çatılı cümlede özne ne tür özne olur?`, options: [`Sözde özne`, `Gerçek özne`, `Gizli özne`, `Yok`], correctIndex: 0 },
        { question: `"Kapılar boyandı." cümlesinde "kapılar" hangi öznedir?`, options: [`Sözde özne`, `Gerçek özne`, `Gizli özne`, `Belirtili özne`], correctIndex: 0 },
        { question: `Aşağıdaki fiillerden hangisi işteş çatılıdır?`, options: [`Tartışmak`, `Yazmak`, `Okumak`, `Uyumak`], correctIndex: 0 },
        { question: `Aşağıdaki fiillerden hangisi dönüşlüdür?`, options: [`Taranmak (kendini taradı)`, `Yıkmak`, `Yazmak`, `Görmek`], correctIndex: 0 },
        { question: `"Kapı çocuk tarafından açıldı." cümlesi çatısı bakımından nedir?`, options: [`Edilgen (eylemi yapan belli; ama özne sözdedir)`, `Etken`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi etken çatılıdır?`, options: [`Ali topu attı.`, `Top atıldı.`, `Cam kırıldı.`, `Yemek pişirildi.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi edilgen çatılıdır?`, options: [`Yemek pişirildi.`, `Annem yemek pişirdi.`, `Topu atan kim?`, `Ali topu attı.`], correctIndex: 0 },
        { question: `Geçişli bir fiil edilgen yapıldığında nesne ne olur?`, options: [`Özne (sözde özne) hâline gelir`, `Aynen nesne kalır`, `Yok olur`, `Zarfa dönüşür`], correctIndex: 0 },
        { question: `Edilgen çatılı bir cümlenin yüklemi geçişli mi geçişsiz mi olur?`, options: [`Geçişsiz olur`, `Mutlaka geçişli olur`, `Hiçbiri olmaz`, `Değişmez`], correctIndex: 0 },
        { question: `"Düşünmek" fiili özne-yüklem ilişkisine göre hangi çatıdadır?`, options: [`Dönüşlü olabilir (kendine yöneliktir)`, `İşteş`, `Edilgen`, `Etken (sadece)`], correctIndex: 0 },
        { question: `"Çocuk üzüldü." cümlesi çatısı bakımından nedir?`, options: [`Dönüşlü`, `Edilgen`, `Etken (yalın)`, `İşteş`], correctIndex: 0 },
        { question: `"Birbirimize bakıştık." cümlesi çatısı bakımından nedir?`, options: [`İşteş`, `Dönüşlü`, `Etken`, `Edilgen`], correctIndex: 0 },
        { question: `"Birbirine kenetlendi." cümlesinde "kenetlenmek" hangi çatıdadır?`, options: [`İşteş`, `Dönüşlü`, `Edilgen`, `Etken`], correctIndex: 0 },
        { question: `Edilgenlik eki "-n" hangi durumlarda kullanılır?`, options: [`Ünlü ile biten fiillerden sonra (örn: yazıldı yerine yazıldı/okundu)`, `Sadece ünsüzlerden sonra`, `Sadece çift heceli fiillerde`, `Sadece geniş zamanda`], correctIndex: 0 },
        { question: `"Okul açıldı." cümlesinin çatısı nedir?`, options: [`Edilgen`, `Etken`, `Dönüşlü`, `İşteş`], correctIndex: 0 },
        { question: `"Çocuk başını taradı." cümlesinin çatısı nedir?`, options: [`Etken (geçişli)`, `Dönüşlü`, `Edilgen`, `İşteş`], correctIndex: 0 },
        { question: `"Çocuk tarandı." cümlesinin çatısı nedir?`, options: [`Dönüşlü`, `Edilgen`, `Etken`, `İşteş`], correctIndex: 0 },
        { question: `"Konuşmak" → "konuşturmak" değişimi hangi çatıyı verir?`, options: [`Ettirgen (oldurgan)`, `Edilgen`, `İşteş`, `Dönüşlü`], correctIndex: 0 },
        { question: `"Kırılmak" fiilinin etken hâli nedir?`, options: [`Kırmak`, `Kırıklamak`, `Kırılıvermek`, `Kırılmıyor`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Aşağıdaki sözcüklerden hangisinin yazımı doğrudur?`, options: [`hiçbir`, `hiç bir`, `hiçbirşey`, `hıçbir`], correctIndex: 0 },
        { question: `Aşağıdaki sözcüklerden hangisinin yazımı doğrudur?`, options: [`bir şey`, `birşey`, `bışey`, `birşeyy`], correctIndex: 0 },
        { question: `Aşağıdaki sözcüklerden hangisinin yazımı doğrudur?`, options: [`herhangi bir`, `her hangi bir`, `herhangibir`, `herhangi-bir`], correctIndex: 0 },
        { question: `Aşağıdaki sözcüklerden hangisinin yazımı doğrudur?`, options: [`pek çok`, `pekçok`, `pek-çok`, `pakçok`], correctIndex: 0 },
        { question: `"-de/-da" eki için aşağıdakilerden hangisi doğrudur?`, options: [`Bulunma hâl eki ise bitişik, bağlaç ise ayrı yazılır`, `Her zaman bitişik yazılır`, `Her zaman ayrı yazılır`, `Hiç yazılmaz`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde "de/da" bağlacı yanlış yazılmıştır?`, options: [`Bende geleyim.`, `Ben de geleyim.`, `Sınıfta sessizlik vardı.`, `Sen de gel.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde "de" bulunma ekidir?`, options: [`Sınıfta otur.`, `Sınıf-ta otur.`, `Ben de geldim.`, `Sen de gel.`], correctIndex: 0 },
        { question: `Bağlaç olan "de" cümleden çıkarılırsa anlam ne olur?`, options: [`Anlam bozulmaz`, `Anlam değişir`, `Cümle düşer`, `Yüklem bozulur`], correctIndex: 0 },
        { question: `Bulunma eki "-de" cümleden çıkarılırsa ne olur?`, options: [`Anlam bozulur`, `Anlam değişmez`, `Cümle pekişir`, `Yüklem değişir`], correctIndex: 0 },
        { question: `"-ki" eki için aşağıdakilerden hangisi doğrudur?`, options: [`Bağlaç olan "ki" ayrı, ek olan "ki" bitişik yazılır`, `Her zaman bitişik yazılır`, `Her zaman ayrı yazılır`, `Hiç yazılmaz`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde "ki" yazımı doğrudur?`, options: [`Akşamki haberi izledin mi?`, `Akşam ki haberi izledin mi?`, `Akşamki-haberi izledin mi?`, `Akşamkı haberi izledin mi?`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde "ki" bağlaç olarak ayrı yazılır?`, options: [`Duydum ki taşınmışsınız.`, `Akşamki film güzeldi.`, `Onunki daha hızlı.`, `Benimki yeni.`], correctIndex: 0 },
        { question: `"Hâlbuki, oysaki, sanki, mademki" sözcüklerinde "ki" nasıl yazılır?`, options: [`Bitişik (kalıplaşmıştır)`, `Ayrı`, `Tireli`, `Büyük harfle`], correctIndex: 0 },
        { question: `Soru eki "mi"nin yazımı için aşağıdakilerden hangisi doğrudur?`, options: [`Kendinden önceki sözcükten ayrı yazılır`, `Bitişik yazılır`, `Tireyle yazılır`, `Hiç yazılmaz`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde "mi" doğru yazılmıştır?`, options: [`Geldin mi?`, `Geldinmi?`, `Geldi-nmi?`, `Geldinmı?`], correctIndex: 0 },
        { question: `Büyük harfle başlayan özel adlara getirilen ekler nasıl ayrılır?`, options: [`Kesme işaretiyle (Ali'nin)`, `Tireyle (Ali-nin)`, `Bitişik (Alinin)`, `Boşlukla (Ali nin)`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde kesme işareti doğru kullanılmıştır?`, options: [`Ankara'dan geldim.`, `Ankaradan geldim.`, `Ankara dan geldim.`, `Ankara-dan geldim.`], correctIndex: 0 },
        { question: `Kurum-kuruluş adlarına gelen ekler nasıl yazılır?`, options: [`Bitişik, kesme kullanılmaz (TBMM'ye ama Türkiye Cumhuriyeti'ne gibi durumlar dışında)`, `Her zaman kesmeyle ayrılır`, `Her zaman tireyle ayrılır`, `Her zaman boşlukla ayrılır`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde kesme işareti yanlış kullanılmıştır?`, options: [`Türkçe'yi seviyorum.`, `Ali'nin defteri.`, `İstanbul'a gittim.`, `Atatürk'ün ilkeleri.`], correctIndex: 0 },
        { question: `Sayı adları nasıl yazılır?`, options: [`Her sözcük ayrı yazılır (yüz on beş)`, `Bitişik yazılır (yüzonbeş)`, `Tireyle yazılır (yüz-on-beş)`, `Karışık yazılır`], correctIndex: 0 },
        { question: `Tarih yazımında ay adı yazıyla yazıldıysa rakamla biten kısım nasıl yazılır?`, options: [`29 Ekim 1923`, `29/Ekim/1923`, `29-Ekim-1923`, `29 ekim 1923`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinin yazımı doğrudur?`, options: [`pekiştirme (sapasağlam, masmavi)`, `sapa-sağlam`, `mas mavi`, `sap sağlam`], correctIndex: 0 },
        { question: `"Aşağıdakilerden hangisi" gibi bir soru cümlesinde özel ad geçtiğinde nasıl yazılır?`, options: [`Büyük harfle (Türkiye, Atatürk)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Cins isimleri (genel adlar) nasıl yazılır?`, options: [`Küçük harfle`, `Büyük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Kişi adlarının önündeki unvanlar nasıl yazılır?`, options: [`Büyük harfle (Doktor Ahmet, Albay Mehmet)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `"Türk" sözcüğü ulus adı olarak nasıl yazılır?`, options: [`Büyük harfle`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Gezegen, yıldız ve takımyıldız adları nasıl yazılır?`, options: [`Büyük harfle (Mars, Dünya, Güneş)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Dil ve millet adları nasıl yazılır?`, options: [`Büyük harfle (Türkçe, İngilizce, Türk, Alman)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Gün ve ay adları cümle içinde nasıl yazılır?`, options: [`Büyük harfle (Pazartesi, Ocak)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Yön adları başka bir isimle birlikte özel ad oluşturursa nasıl yazılır?`, options: [`Büyük harfle (Doğu Anadolu, Batı Karadeniz)`, `Küçük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Sadece yön bildiriyorsa nasıl yazılır?`, options: [`Küçük harfle (rüzgâr doğudan esiyor)`, `Büyük harfle`, `Tırnak içinde`, `Tireyle`], correctIndex: 0 },
        { question: `Kitap, dergi, gazete adlarının her sözcüğü nasıl yazılır?`, options: [`Büyük harfle başlar`, `Küçük harfle başlar`, `Tırnak içinde olmalı`, `Tireyle bağlı olmalı`], correctIndex: 0 },
        { question: `"Çalıkuşu" romanı, "Cumhuriyet" gazetesi yazımları nasıl olmalıdır?`, options: [`Büyük harfle başlayan özel ad`, `Küçük harfle yazılır`, `Sadece tırnak içinde`, `Sadece tireyle`], correctIndex: 0 },
        { question: `"Hâl, kâr, hâkim" gibi sözcüklerde "â" şapkalı harf neyi gösterir?`, options: [`İnce okunuş ve uzun ses`, `Vurgu`, `Yumuşatma`, `Kalın okuyuş`], correctIndex: 0 },
        { question: `Aşağıdaki sözcüklerden hangisinin yazımı yanlıştır?`, options: [`bilmemki`, `bilmem ki`, `bilmiyorum`, `bilmedim`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi yanlış yazımdır?`, options: [`hıçbirşey`, `hiçbir şey`, `hiçbiri`, `hiç`], correctIndex: 0 },
        { question: `"İle" sözcüğü ek olarak yazıldığında ne olur?`, options: [`-(y)le/-(y)la biçimine girer (Ali'yle = Ali ile)`, `Bitişik "ile" yazılır`, `Hiç değişmez`, `Tireyle yazılır`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi doğru yazımdır?`, options: [`Ali ile geldim. / Ali'yle geldim.`, `Aliıle geldim.`, `Aliyle geldim (kesmesiz).`, `Ali-ile geldim.`], correctIndex: 0 },
        { question: `Kısaltmalara getirilen ekler nasıl yazılır?`, options: [`Kesme işaretiyle (TBMM'ye)`, `Bitişik (TBMMye)`, `Tireyle (TBMM-ye)`, `Boşlukla (TBMM ye)`], correctIndex: 0 },
        { question: `Yabancı kökenli sözcüklerin Türkçe yazımı için ne yapılmalı?`, options: [`Türkçenin ses ve yazım kurallarına uydurulur`, `Aslına sadık yazılır`, `Tırnak içinde yazılır`, `Tireyle ayrılır`], correctIndex: 0 },
        { question: `"E-posta" sözcüğü nasıl yazılır?`, options: [`Tireli (e-posta)`, `Bitişik (eposta)`, `Ayrı (e posta)`, `Büyük harfle`], correctIndex: 0 },
        { question: `Sayıların yazımında özel kullanım: "5'inci sınıf" mı, "5 inci sınıf" mı doğru?`, options: [`5'inci sınıf (sıra ek kesmeyle ayrılır)`, `5 inci sınıf`, `5inci sınıf`, `5.inci sınıf`], correctIndex: 0 },
        { question: `"Yirmi birinci yüzyıl" mı "yirmi-birinci yüzyıl" mı doğru?`, options: [`Yirmi birinci yüzyıl (ayrı)`, `Yirmi-birinci`, `Yirmibirinci`, `Yirmibıri`], correctIndex: 0 },
        { question: `Yer adlarına gelen ek nasıl yazılır?`, options: [`Kesme işareti ile (Ankara'da)`, `Bitişik (Ankarada)`, `Tireyle (Ankara-da)`, `Boşlukla`], correctIndex: 0 },
        { question: `"Kuzeydoğu, güneybatı" gibi yön adları nasıl yazılır?`, options: [`Bitişik`, `Ayrı`, `Tireli`, `Büyük harfle`], correctIndex: 0 },
        { question: `İkilemelerde "-de" eki ne yapılır?`, options: [`Bağlaçsa ayrı yazılır`, `Bitişik`, `Tireyle`, `Atılır`], correctIndex: 0 },
        { question: `"İkişer ikişer" ifadesi nasıl yazılır?`, options: [`Ayrı (her ikileme ayrı)`, `Bitişik`, `Tireyle`, `Tek sözcük`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde kesme işareti gereksizdir?`, options: [`Türkçe'mi seviyorum.`, `Ali'ye yardım ettim.`, `İstanbul'da yaşıyorum.`, `Atatürk'e saygı duyarız.`], correctIndex: 0 },
        { question: `"Doğum tarihinizi yazınız." cümlesinde sayı yazılırken nasıl yazılır?`, options: [`05.06.2010 ya da 5 Haziran 2010`, `05-Haziran-2010`, `5/Haziran/2010`, `5.Haziran/2010`], correctIndex: 0 },
        { question: `"Bay/Bayan" kısaltmaları kişi adıyla nasıl yazılır?`, options: [`Büyük harfle ve adın önünde (Bay Ahmet)`, `Küçük harfle`, `Tırnak içinde`, `Bitişik`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Tamamlanmış cümlenin sonuna hangi noktalama işareti konur?`, options: [`Nokta (.)`, `Virgül (,)`, `Üç nokta (…)`, `İki nokta (:)`], correctIndex: 0 },
        { question: `Soru cümlelerinin sonuna hangi noktalama işareti konur?`, options: [`Soru işareti (?)`, `Nokta (.)`, `Ünlem (!)`, `Virgül (,)`], correctIndex: 0 },
        { question: `Sevinç, korku, heyecan bildiren cümlelerin sonuna hangi işaret konur?`, options: [`Ünlem işareti (!)`, `Soru işareti (?)`, `Nokta (.)`, `Virgül (,)`], correctIndex: 0 },
        { question: `Cümle içinde art arda gelen eş görevli sözcüklerin arasına ne konur?`, options: [`Virgül (,)`, `Nokta (.)`, `Ünlem (!)`, `Soru işareti (?)`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde virgül doğru kullanılmıştır?`, options: [`Ali, Veli ve Ayşe geldi.`, `Ali, Veli, ve Ayşe geldi.`, `Ali Veli ve Ayşe geldi.`, `Ali Veli, ve Ayşe geldi.`], correctIndex: 0 },
        { question: `"Ali, gel!" cümlesinde virgülün görevi nedir?`, options: [`Hitap sözünden sonra konur`, `Eş görevli sözcükleri ayırır`, `Soru sözcüğünden önce gelir`, `Cümleyi tamamlar`], correctIndex: 0 },
        { question: `Uzun cümlelerde özneyi vurgulamak için ne kullanılır?`, options: [`Özneden sonra virgül`, `Soru işareti`, `İki nokta`, `Tırnak`], correctIndex: 0 },
        { question: `Açıklama getirilecek cümleden sonra hangi işaret konur?`, options: [`İki nokta (:)`, `Üç nokta (…)`, `Noktalı virgül (;)`, `Soru işareti (?)`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde iki nokta doğru kullanılmıştır?`, options: [`Şu işleri yapacağım: ödev, çalışma, spor.`, `Şu işleri yapacağım. ödev, çalışma, spor.`, `Şu işleri yapacağım; ödev: çalışma; spor`, `Şu işleri yapacağım, ödev, çalışma, spor.`], correctIndex: 0 },
        { question: `Virgülle ayrılan grupları daha büyük bir ayrımla bölmek için ne kullanılır?`, options: [`Noktalı virgül (;)`, `İki nokta (:)`, `Üç nokta (…)`, `Tırnak`], correctIndex: 0 },
        { question: `"Gözlerinden yaşlar akıyordu…" cümlesindeki üç nokta hangi anlamı verir?`, options: [`Söz tamamlanmamış, devamı okuyucuya bırakılmış`, `Cümle bitmiş`, `Soru sorulmuş`, `Heyecan vurgulanmış`], correctIndex: 0 },
        { question: `Tırnak işareti hangi durumda kullanılır?`, options: [`Başkasından aktarılan sözleri belirtmek için`, `Cümleyi bitirmek için`, `Soru sormak için`, `Ünlem belirtmek için`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde tırnak doğru kullanılmıştır?`, options: [`Ahmet "Yarın geleceğim." dedi.`, `Ahmet 'Yarın geleceğim. dedi.`, `Ahmet Yarın geleceğim. dedi.`, `Ahmet, "Yarın geleceğim," dedi.`], correctIndex: 0 },
        { question: `Yay ayraç ( ) hangi durumda kullanılır?`, options: [`Cümlenin yapısını bozmayan açıklama eklemek için`, `Konuşma aktarmak için`, `Soru sormak için`, `Cümleyi bitirmek için`], correctIndex: 0 },
        { question: `Kesme işaretinin görevi nedir?`, options: [`Özel adlara getirilen ekleri ayırmak`, `Cümleyi bitirmek`, `Soru sormak`, `Heyecan vurgulamak`], correctIndex: 0 },
        { question: `Kısa çizgi (-) hangi durumda kullanılır?`, options: [`Satır sonu hece bölmek ve eklerle birlikte (Türk-İslam)`, `Soru sormak`, `Konuşma aktarmak`, `Vurgu yapmak`], correctIndex: 0 },
        { question: `Uzun çizgi (—) hangi durumda kullanılır?`, options: [`Konuşma çizgisi (diyalog başlangıcı)`, `Soru sormak`, `Vurgu yapmak`, `Hece bölmek`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde nokta yanlış kullanılmıştır?`, options: [`Yarın 5 Mayıs.2025.`, `Yarın 5 Mayıs 2025.`, `Yarın 05.05.2025.`, `Yarın bayram.`], correctIndex: 0 },
        { question: `Sıra sayılarında nokta nereye konur?`, options: [`Sayıdan sonra (1., 2., 3.)`, `Sayıdan önce (.1, .2)`, `Hiç kullanılmaz`, `Sayının ortasına`], correctIndex: 0 },
        { question: `"Ankara'ya 14 Şubat 2025'te gideceğim." cümlesinde noktalama doğru mu?`, options: [`Doğrudur`, `Yanlış, kesme yok`, `Yanlış, nokta eksik`, `Yanlış, virgül lazım`], correctIndex: 0 },
        { question: `"O, bana inanılmaz haberler verdi." cümlesinde virgül neden konmuştur?`, options: [`Özneyi vurgulamak için`, `Eş görevli sözcükler için`, `Hitap için`, `Karşılık için`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde virgül yanlış kullanılmıştır?`, options: [`Yağmur, yağıyordu uzun süredir.`, `Yağmur uzun süredir yağıyordu.`, `Sonbahar geldiğinde, yapraklar dökülür.`, `Ali, Veli ve Ayşe.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinin sonuna ünlem konmalıdır?`, options: [`Dikkat et!`, `Yarın hava soğuk.`, `Ne yapıyorsun?`, `Bugün okula gittim.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinin sonuna soru işareti konmalıdır?`, options: [`Sen ne yaptın?`, `Sen yarın gel.`, `Hava güzeldi.`, `Ali geldi.`], correctIndex: 0 },
        { question: `"Acaba bugün ders olacak mı?" cümlesindeki soru işareti hangi sözcüğe bağlıdır?`, options: [`Mı (soru eki)`, `Acaba`, `Bugün`, `Ders`], correctIndex: 0 },
        { question: `Soru anlamı taşıyan ama biçimce soru cümlesi olmayan cümlelerin sonuna ne konur?`, options: [`Soru işareti`, `Nokta`, `Ünlem`, `Virgül`], correctIndex: 0 },
        { question: `"Geç kaldım çünkü trafik vardı." cümlesinde noktalama doğru mu?`, options: [`Doğru (çünkü öncesi tercihen virgül de olabilir)`, `Yanlış, soru olmalı`, `Yanlış, ünlem olmalı`, `Yanlış, üç nokta olmalı`], correctIndex: 0 },
        { question: `Tırnak içine alınmış sözcükteki noktalama nereye konur?`, options: [`Tırnağın içine (eğer aktarılan söz bir cümleyse)`, `Her zaman dışına`, `Hiç konmaz`, `Hem içine hem dışına`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde noktalı virgül doğru kullanılmıştır?`, options: [`Ali kitap aldı, defter aldı; Veli silgi aldı, kalem aldı.`, `Ali; kitap, defter aldı.`, `Ali kitap, defter aldı; Veli silgi, kalem aldı.`, `Ali, kitap; defter aldı.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde tire (kısa çizgi) doğru kullanılmıştır?`, options: [`Türk-İslam sentezi`, `Türk - İslam sentezi`, `Türk : İslam sentezi`, `Türk; İslam sentezi`], correctIndex: 0 },
        { question: `Aşağıdaki seçeneklerden hangisinde "ki"den önce virgül konur?`, options: [`Cümlenin yapısı gerektiriyorsa kullanılabilir`, `Hiçbir zaman`, `Her zaman`, `Sadece soru cümlesinde`], correctIndex: 0 },
        { question: `"Ali, dedi: 'Hadi gidelim.'" cümlesinde noktalama doğru mu?`, options: [`Doğru`, `Yanlış, iki nokta yok`, `Yanlış, tırnak yok`, `Yanlış, hiç noktalama yok`], correctIndex: 0 },
        { question: `Diyaloglarda her konuşmacı için satır başında ne kullanılır?`, options: [`Uzun çizgi (—)`, `Kısa çizgi (-)`, `İki nokta`, `Soru işareti`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde üç nokta doğru kullanılmıştır?`, options: [`Karanlık bir gecede yapayalnız…`, `Karanlık bir gecede yapayalnız.`, `Karanlık bir gecede yapayalnız!`, `Karanlık bir gecede yapayalnız,`], correctIndex: 0 },
        { question: `Eğer bir cümle hem soru hem ünlem anlamı taşıyorsa ne yapılır?`, options: [`Soru işaretinden sonra ünlem konur (?!) veya yalnız uygunsa`, `Sadece soru işareti`, `Sadece ünlem`, `Üç nokta`], correctIndex: 0 },
        { question: `Adres yazımında yer adları arasına ne konur?`, options: [`Virgül (Çankaya, Ankara)`, `Nokta`, `İki nokta`, `Tırnak`], correctIndex: 0 },
        { question: `Tarih yazımında gün-ay-yıl arasına ne konur?`, options: [`Nokta (29.10.1923) veya boşluk (29 Ekim 1923)`, `Virgül`, `Tire`, `Soru işareti`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde virgül gereksizdir?`, options: [`Bugün, çok güzel bir gündü.`, `Bugün çok güzel bir gündü.`, `Bugün, çok güzel bir gündü; özledim böyle havaları.`, `Bugün güzel bir gündü.`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisinde virgül eksiktir?`, options: [`Ali Veli Ayşe geldi.`, `Ali, Veli, Ayşe geldi.`, `Ali, Veli ve Ayşe geldi.`, `Ali geldi.`], correctIndex: 0 },
        { question: `"Sevgili dostum" hitabından sonra hangi işaret konur?`, options: [`Virgül`, `Nokta`, `İki nokta`, `Soru işareti`], correctIndex: 0 },
        { question: `Sayısal tablolarda sayıların binliği ayırmak için ne kullanılır?`, options: [`Nokta (1.000.000)`, `Virgül (1,000,000) — Türkçede virgül ondalıktır`, `Kesme`, `Tire`], correctIndex: 0 },
        { question: `Ondalık sayılarda hangi işaret kullanılır?`, options: [`Virgül (3,14)`, `Nokta (3.14)`, `Tire`, `İki nokta`], correctIndex: 0 },
        { question: `Soru zarfı içeren ama cevap beklenmeyen cümleye ne denir ve nasıl noktalanır?`, options: [`Sözde soru; sonuna nokta veya ünlem konur`, `Soru cümlesi; soru işareti`, `Ünlem; sadece ünlem`, `Bilinmez`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde tırnak yanlış yere konmuştur?`, options: [`Ali "yarın" tatil dedi.`, `Ali "yarın tatil" dedi.`, `Ali, "Yarın tatil." dedi.`, `"Yarın tatil," dedi Ali.`], correctIndex: 0 },
        { question: `"H.Ü." gibi kısaltmalarda nokta nereye konur?`, options: [`Her büyük harften sonra (H.Ü.)`, `Sadece sona`, `Sadece başa`, `Hiç kullanılmaz`], correctIndex: 0 },
        { question: `"TBMM, TRT" gibi kısaltmalarda nokta neden yoktur?`, options: [`Kurum/kuruluşların büyük harflerle baş harflerinden yapılan kısaltmalarında nokta kullanılmaz`, `Unutulmuştur`, `Yanlış yazılmıştır`, `Türkçe kuralı değildir`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde iki nokta gereksizdir?`, options: [`Bunlar geldi: Ali, Veli.`, `Bunlar geldi Ali ve Veli.`, `Bunlar: Ali, Veli.`, `Bunlar şunlardır: Ali, Veli.`], correctIndex: 0 },
        { question: `"Sayın okuyucular," ifadesinden sonra hangi işaret konur?`, options: [`Virgül`, `Nokta`, `İki nokta`, `Tırnak`], correctIndex: 0 },
        { question: `"Yağmur yağıyor, çocuklar oynayamıyor." cümlesinde virgül hangi göreve sahiptir?`, options: [`İki cümleyi (yargıyı) birbirinden ayırır`, `Eş görevli ögeleri ayırır`, `Hitap belirler`, `Vurgu yapar`], correctIndex: 0 },
        { question: `"Kim, ne, nerede, ne zaman, nasıl" gibi sözcükler cümle başında ünlem değil soru oluştururlarsa hangi işaret kullanılır?`, options: [`Soru işareti`, `Ünlem`, `Nokta`, `İki nokta`], correctIndex: 0 },
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
      quickQuestions: [
        { question: `Anlatım bozukluklarının temel nedeni nedir?`, options: [`Dil bilgisi ve anlam kurallarına uymamak`, `Çok sözcük kullanmak`, `Soru sormak`, `Tırnak işareti kullanmak`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde gereksiz sözcük kullanımı vardır?`, options: [`Bana geri iade etti.`, `Bana iade etti.`, `Onu çağırdı.`, `Yarın geleceğim.`], correctIndex: 0 },
        { question: `"Aşağıya inmek" ifadesindeki anlatım bozukluğunun nedeni nedir?`, options: [`Anlamca çelişen/gereksiz sözcük (inmek zaten aşağıya doğrudur)`, `Tamlama hatası`, `Yüklem hatası`, `Noktalama hatası`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde gereksiz yardımcı eylem kullanılmıştır?`, options: [`Sevinçten zıplama yaptı.`, `Sevinçten zıpladı.`, `Çok güzel bir kitap aldım.`, `Bugün yorgunum.`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde özne-yüklem uyumsuzluğu vardır?`, options: [`Sınıftaki tüm öğrenciler sınava girdim.`, `Sınıftaki tüm öğrenciler sınava girdi.`, `Ali ders çalıştı.`, `Yağmur yağıyor.`], correctIndex: 0 },
        { question: `"Hayvanlar ve çocuklar parkta oynuyordu." cümlesinde nasıl bir bozukluk vardır?`, options: [`Özne-yüklem uyumsuzluğu (insan dışı + insan özne)`, `Tamlama hatası`, `Çatı uyumsuzluğu`, `Anlamca çelişme`], correctIndex: 0 },
        { question: `"Sen ve ben okula gideceğiz." cümlesinde yüklem hangi kişiye göre çekimlenir?`, options: [`Biz (1. çoğul)`, `Sen (2. tekil)`, `Ben (1. tekil)`, `O (3. tekil)`], correctIndex: 0 },
        { question: `"Sen ve o gidecek." cümlesi yüklem uyumu açısından doğru mudur?`, options: [`Yanlış; "siz" gibi 2. çoğul olmalı: gideceksiniz`, `Doğrudur`, `Yanlış; ben olmalı`, `Yanlış; biz olmalı`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde özne eksikliği vardır?`, options: [`Sınıfa girdi ve dersi anlattı, sonra çıkardı.`, `Öğretmen sınıfa girdi, dersi anlattı.`, `Ali okula gitti.`, `Yağmur yağıyor.`], correctIndex: 0 },
        { question: `"Hem dürüst hem de yalancıydı." cümlesinde nasıl bir bozukluk vardır?`, options: [`Anlamca çelişme`, `Tamlama hatası`, `Özne-yüklem uyumsuzluğu`, `Gereksiz sözcük`], correctIndex: 0 },
        { question: `"Tahminen 100 kişi vardı kesinlikle." cümlesinde nasıl bir bozukluk vardır?`, options: [`Anlamca çelişme (tahminen-kesinlikle birlikte)`, `Tamlama hatası`, `Özne uyumsuzluğu`, `Yüklem hatası`], correctIndex: 0 },
        { question: `"Onun kitabını ve defteri kayboldu." cümlesindeki bozukluğun nedeni nedir?`, options: [`Tamlama yanlışlığı (her ikisi de "onun" tamlayanını almalı)`, `Özne-yüklem`, `Anlamca çelişki`, `Gereksiz sözcük`], correctIndex: 0 },
        { question: `"Lütfen sessiz ve dikkatli olun." doğru mu?`, options: [`Doğru`, `Yanlış, gereksiz sözcük`, `Yanlış, tamlama hatası`, `Yanlış, çelişki var`], correctIndex: 0 },
        { question: `"Bu film izlenir ve seyredilir." cümlesinde nasıl bir bozukluk vardır?`, options: [`Eş anlamlı (anlamca aynı) sözcüklerin gereksiz kullanımı`, `Çelişki`, `Özne uyumsuzluğu`, `Tamlama hatası`], correctIndex: 0 },
        { question: `"Çocuklar ve büyükler birlik içinde idi." cümlesinde özne uyumu açısından durum nedir?`, options: [`Doğrudur (insan özne + insan)`, `Yanlıştır (çoğul olmalı)`, `Çelişki var`, `Gereksiz sözcük`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerin hangisinde mantık bozukluğu (anlamca çelişki) vardır?`, options: [`Belki, kesinlikle yarın gelirim.`, `Belki yarın gelirim.`, `Kesinlikle yarın gelirim.`, `Mutlaka yarın gelirim.`], correctIndex: 0 },
        { question: `"Genelde her zaman ders çalışırım." cümlesindeki bozukluğun nedeni nedir?`, options: [`Anlamca çelişki / gereksiz sözcük`, `Tamlama hatası`, `Özne uyumsuzluğu`, `Noktalama`], correctIndex: 0 },
        { question: `"Kelimeleri sözlükten araştırdı." cümlesinde bozukluk var mı?`, options: [`Yanlış, "araştırdı" yerine "buldu/aradı" denmeli; anlamca çelişki`, `Yok, doğrudur`, `Tamlama hatası vardır`, `Özne hatası vardır`], correctIndex: 0 },
        { question: `"Bütün herkes geldi." cümlesinde hangi bozukluk vardır?`, options: [`Anlamca aynı sözcüklerin yanyana kullanımı`, `Çelişki`, `Yüklem hatası`, `Noktalama`], correctIndex: 0 },
        { question: `"Yaklaşık olarak 3 metre kadardı." cümlesinde nasıl bir bozukluk vardır?`, options: [`Yaklaşık olarak ve kadar gereksiz`, `Çelişki`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `"Telefonum çalınınca telefonumun çaldığını anladım." cümlesinde bozukluk var mı?`, options: [`Çalınmak ve çaldığını sözcükleri anlam karışıklığı yaratır`, `Yok`, `Tamlama hatası`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Onun saçları ve gözleri kahverengiydi." cümlesinde yüklem uyumu nasıldır?`, options: [`Doğru (cansız nesneler tekilde de çoğulda da uyumlu)`, `Yanlış, özne çoğul`, `Yanlış, gereksiz`, `Çelişki var`], correctIndex: 0 },
        { question: `"Türkçe dili öğretmenim çok iyidir." cümlesinde bozukluk var mı?`, options: [`Var; "Türkçe" zaten dil adıdır, "dili" gereksiz`, `Yok`, `Çelişki var`, `Tamlama hatası`], correctIndex: 0 },
        { question: `"Bana hiç soru sorma sakın." cümlesinde nasıl bir bozukluk vardır?`, options: [`Anlamı pekiştirici sözcüklerin birden çok kullanımı (yanlış değil ama gereksiz)`, `Çelişki`, `Yüklem`, `Tamlama`], correctIndex: 0 },
        { question: `"Yarın akşam yedide yolculuğa çıkarken hava yağmurluydu." cümlesinde nasıl bir bozukluk vardır?`, options: [`Zaman uyumsuzluğu (yarın - yağmurluydu)`, `Çelişki yok`, `Tamlama hatası`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Ona söylediğim şeyleri unuttum söylemeyi." cümlesinde nasıl bir bozukluk vardır?`, options: [`Sıralama/anlam karışıklığı (söylenen şeyi unutmak vs. söylemeyi unutmak)`, `Tamlama hatası`, `Çelişki yok`, `Yüklem`], correctIndex: 0 },
        { question: `"İçeri girip kapıyı kapattı ve dışarı çıktı." cümlesinde nasıl bir bozukluk vardır?`, options: [`Mantık çelişkisi (içeri girip dışarı çıkıldı)`, `Yok`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `"Hayatım boyu bu kadar mutlu olmadım." cümlesi anlamca doğru mu?`, options: [`Doğru ("hayatım boyunca" daha yaygın)`, `Yanlış, çelişki var`, `Yanlış, tamlama hatası`, `Yanlış, özne uyumsuz`], correctIndex: 0 },
        { question: `"Saat yedi-yedi buçuk gibi geldi." doğru mudur?`, options: [`Doğru (yaklaşıklık ifadesi)`, `Yanlış, tire yanlış`, `Yanlış, çelişki`, `Yanlış, özne yok`], correctIndex: 0 },
        { question: `"Annem ve baba pazara gittiler." cümlesinde bozukluk var mı?`, options: [`Var; "babam" olmalı (tamlayan eki eksik) ve yüklem uyumu sorgulanır`, `Yok`, `Çelişki`, `Yüklem hatası yok`], correctIndex: 0 },
        { question: `"Kapıyı vurduktan sonra ses gelmedi." cümlesinde mantık doğrudur. Aşağıdaki hangisi mantık hatalıdır?`, options: [`Kapıyı kırarak içeri girip sessizce uyandı.`, `Kapıyı çaldı, açan olmadı.`, `Kapıyı çaldıktan sonra bekledi.`, `Kapıyı çaldı ve içeri girdi.`], correctIndex: 0 },
        { question: `"Bahçeye birkaç çiçek diktim ve hepsi de büyüdü." cümlesinde "hepsi de" ifadesi gereksiz midir?`, options: [`Hayır; "hepsi" yeterli, "de" bağlacı bağlam gereği kullanılabilir`, `Evet, gereksiz`, `Çelişki`, `Tamlama hatası`], correctIndex: 0 },
        { question: `"Belge orijinal aslına uygundur." cümlesinde nasıl bir bozukluk vardır?`, options: [`"Orijinal" ve "aslına uygun" eş anlamlı; gereksiz`, `Çelişki`, `Tamlama`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Ona hediye olarak armağan verdim." cümlesinde nasıl bir bozukluk vardır?`, options: [`Eş anlamlı sözcükler bir arada (hediye-armağan)`, `Çelişki`, `Tamlama`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Üzerime giyeceğim elbiseyi seçtim." cümlesinde nasıl bir bozukluk vardır?`, options: [`"Giymek" zaten "üzerine" olur; gereksiz`, `Çelişki`, `Tamlama`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Ağzıyla konuştu." cümlesinde nasıl bir bozukluk vardır?`, options: [`"Konuşmak" zaten ağızla olur; gereksiz`, `Çelişki`, `Tamlama`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Çabuk ve hızlı koştu." cümlesinde nasıl bir bozukluk vardır?`, options: [`Anlamca aynı sözcüklerin gereksiz kullanımı`, `Çelişki`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `"Hem çalışıyor hem de para kazanıyor." cümlesinde bozukluk var mı?`, options: [`Yok, doğrudur`, `Çelişki var`, `Tamlama hatası`, `Gereksiz sözcük`], correctIndex: 0 },
        { question: `"Yanıma birkaç tane arkadaşlar geldi." cümlesinde nasıl bir bozukluk vardır?`, options: [`"Birkaç" sayı sıfatından sonra isim tekil olmalı`, `Çelişki`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi anlatım bozukluğu içermez?`, options: [`Yarın okula gideceğim.`, `Tam bir tam yıl bekledim.`, `Geri iade etti.`, `Bütün herkes geldi.`], correctIndex: 0 },
        { question: `"Burada başka birisi yok." cümlesinde bozukluk var mı?`, options: [`Yok ("başka biri" daha doğru olmakla birlikte yaygın)`, `Çelişki var`, `Tamlama hatası`, `Yüklem hatası`], correctIndex: 0 },
        { question: `"Çocuk ders çalışmıyor ve bu yüzden başarısız oluyor." cümlesinde sebep-sonuç ifadesi doğru kurulmuş mu?`, options: [`Doğru`, `Çelişki`, `Tamlama hatası`, `Yüklem hatası`], correctIndex: 0 },
        { question: `"Ona söyledim de duymadı bile." cümlesinde nasıl bir bozukluk vardır?`, options: [`Yok; doğrudur`, `Çelişki`, `Tamlama`, `Özne uyumsuzluğu`], correctIndex: 0 },
        { question: `"Sınıfımızdaki tüm öğrenciler okula geç kalan, ödev yapmayan ve sınıfta gürültü çıkaran kişilerdir." cümlesinde mantık hatası var mı?`, options: [`Var; "tüm" ile genelleme çelişkili olabilir`, `Yok`, `Tamlama`, `Yüklem hatası`], correctIndex: 0 },
        { question: `"Onun ödevlerini ben de yaptım." cümlesinde "de" bağlacı yerinde mi?`, options: [`Yerinde (ben de = "ben dahi" anlamı verir)`, `Yanlış, bitişik olmalı`, `Çelişki`, `Gereksiz`], correctIndex: 0 },
        { question: `"Sokağa çıkıp dolaştık ama yine eve geri döndük." cümlesinde nasıl bir bozukluk vardır?`, options: [`Gereksiz sözcük ("geri" dönmek anlam karışıklığı yaratır)`, `Çelişki`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `Anlatım bozukluklarını bulmak için en sağlam yol nedir?`, options: [`Cümleyi anlam ve dil bilgisi açısından parça parça incelemek`, `Sesli okumak`, `Hızlı okumak`, `Sözcükleri saymak`], correctIndex: 0 },
        { question: `"Pencereden dışarı baktım." cümlesinde bozukluk var mı?`, options: [`Yok ("dışarı" pekiştirici olarak yaygın)`, `Çelişki`, `Tamlama`, `Yüklem`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi anlatımca en doğru ve sade olanıdır?`, options: [`Bana yardım et.`, `Lütfen bana yardım etmen için yardım et.`, `Bana bir yardım yardımı et.`, `Bana yardım için yardımcı olarak yardım et.`], correctIndex: 0 },
      ],
    },
  ],
};
