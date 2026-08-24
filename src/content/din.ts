import type { SubjectContent } from "./types";

/**
 * Din Kültürü ve Ahlak Bilgisi (LGS 8. sınıf) üniteleri.
 * MEB müfredatına uygun, tarafsız ve bilgilendirici içerik. Videolar sonra eklenecek.
 */
export const DIN: SubjectContent = {
  slug: "din",
  name: "Din Kültürü",
  topics: [
    {
      id: "kader-inanci",
      name: `Kader İnancı`,
      summary: `Kader, kaza, evrendeki yasalar, irade ve tevekkül.`,
      youtubeId: "",
      mindMap: {
        center: `Kader İnancı`,
        branches: [
          {
            label: `Kader ve Kaza`,
            sections: [
              { kind: "tanim", content: `Kader: Allah'ın olacak her şeyi sonsuz ilmiyle önceden bilmesi ve belirlemesi. Kaza: kaderde belirlenenin zamanı gelince gerçekleşmesi.` },
              { kind: "ornek", content: `Kader → bir insanın hayatının belirli bir süreye sahip olması (ölçü). Kaza → o sürenin sonunda vefatın gerçekleşmesi. Kader plan, kaza uygulamadır.` },
            ],
          },
          {
            label: `Evrendeki Yasalar`,
            sections: [
              { kind: "kural", content: `Fiziksel, biyolojik ve toplumsal yasalar Allah'ın koyduğu düzendir.` },
              { kind: "ornek", content: `Fiziksel yasalar: suyun 100°C'de kaynaması, yerçekimi, ısının yüksekten alçağa akması. Biyolojik yasalar: canlıların doğup büyümesi ve ölmesi, fotosentez, kalıtım. Toplumsal yasalar: adaletsizliğin toplumu çökertmesi, çalışmanın refah getirmesi.` },
            ],
          },
          {
            label: `İrade ve Sorumluluk`,
            sections: [
              { kind: "kural", content: `İnsanın seçme özgürlüğü (cüz'i irade) vardır; bu yüzden yaptıklarından sorumludur.` },
              { kind: "ornek", content: `Sınava çalışmak/çalışmamak seçimi insanın iradesindedir; sonuç (başarı/başarısızlık) bu seçimin doğal sonucudur.` },
              { kind: "tuzak", content: `"Her şey kaderdir" deyip sorumluluktan kaçılmaz; insan çabasıyla seçim yapar.` },
            ],
          },
          {
            label: `Tevekkül ve Emek`,
            sections: [
              { kind: "tanim", content: `Tevekkül: gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaktır.` },
              { kind: "ornek", content: `Hadis: "Önce deveni bağla, sonra tevekkül et." Çiftçi tohumu eker, sular, bakım yapar; ürünü Allah'tan bekler. Öğrenci çalışır, sınav öncesi dua eder.` },
              { kind: "tuzak", content: `Tevekkül, çalışmayı bırakıp beklemek DEĞİLDİR; önce çalışmak gerekir.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Kader nedir?`, back: `Allah'ın olacak her şeyi önceden bilmesi ve belirlemesidir.` },
        { front: `Kaza nedir?`, back: `Kaderde belirlenen şeyin zamanı gelince gerçekleşmesidir.` },
        { front: `Cüz'i irade nedir?`, back: `İnsanın seçme özgürlüğüdür; sorumluluğun temelidir.` },
        { front: `Tevekkül nedir?`, back: `Gereken çabayı gösterip sonucu Allah'a bırakmaktır.` },
      ],
      article: `# Kader ve Kaza
[tanım] **Kader:** Allah'ın olacak her şeyi sonsuz ilmiyle önceden bilmesi ve bir ölçüye göre belirlemesidir. **Kaza:** kaderde belirlenen şeyin zamanı gelince gerçekleşmesidir.

# Evrendeki Yasalar
[kural] Evrendeki düzen Allah'ın koyduğu yasalarla işler: **fiziksel**, **biyolojik** ve **toplumsal** yasalar.
[örnek] Suyun 100°C'de kaynaması → fiziksel yasa. Canlıların doğup büyümesi → biyolojik yasa.

# İrade ve Sorumluluk
[kural] İnsana **cüz'i irade** (seçme özgürlüğü) verilmiştir; bu yüzden davranışlarından **sorumludur**.
[tuzak] "Her şey kaderdir, ben ne yapsam değişmez" demek yanlıştır; insan kendi seçimleriyle sorumluluk taşır.

# Tevekkül ve Emek
[tanım] **Tevekkül:** üzerine düşeni yaptıktan, gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaktır.
[tuzak] Tevekkül **tembellik değildir**; önce çalışıp tedbir almak, sonra Allah'a güvenmek gerekir.
[soru] "Sınava çalışmadan 'kaderimde ne varsa o olur' demek" tevekkülün **yanlış** anlaşılmasıdır.`,
      tips: [
        {
          trap: `Kader ile kaza karıştırılır.`,
          wrong: `Bir olayın gerçekleşmesine kader denir.`,
          correct: `Olayın gerçekleşmesi KAZA'dır; kader ise Allah'ın önceden bilip belirlemesidir.`,
        },
        {
          trap: `Tevekkül tembellik sanılır.`,
          wrong: `Tevekkül, çalışmadan sonucu beklemektir.`,
          correct: `Tevekkül, gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaktır.`,
        },
      ],
      quiz: [
        { question: `Allah'ın olacak her şeyi önceden bilmesi ve belirlemesine ne denir?`, options: [`Kaza`, `Kader`, `Tevekkül`, `İrade`], correctIndex: 1 },
        { question: `Kaderde belirlenen bir şeyin zamanı gelince gerçekleşmesine ne denir?`, options: [`Kaza`, `Kader`, `İrade`, `Rızık`], correctIndex: 0 },
        { question: `Suyun 100°C'de kaynaması hangi tür yasaya örnektir?`, options: [`Toplumsal`, `Biyolojik`, `Fiziksel`, `Ahlaki`], correctIndex: 2 },
        { question: `İnsanın seçme özgürlüğüne ne denir?`, options: [`Cüz'i irade`, `Külli irade`, `Tevekkül`, `Kaza`], correctIndex: 0 },
        { question: `Gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaya ne denir?`, options: [`Tevekkül`, `Tembellik`, `Kader`, `Kaza`], correctIndex: 0 },
        { question: `Canlıların doğması, büyümesi ve ölmesi hangi yasaya örnektir?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Kimyasal`], correctIndex: 1 },
        { question: `Tevekkülün doğru anlaşılması aşağıdakilerden hangisidir?`, options: [`Hiç çalışmadan sonucu beklemek`, `Çalışıp sonucu Allah'a bırakmak`, `Sorumluluk almaktan kaçınmak`, `Kaderin varlığını inkâr etmek`], correctIndex: 1 },
        { question: `İnsanın yaptıklarından sorumlu tutulmasının temel sebebi nedir?`, options: [`Seçme özgürlüğünün olması`, `Mal ve mülk sahibi olması`, `Çevresinin etkisinde kalması`, `Şans ve tesadüflerin varlığı`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Allah'ın olacak her şeyi önceden bilmesi ve bir ölçüye göre belirlemesine ne denir?`, options: [`Kaza`, `Kader`, `Tevekkül`, `İrade`], correctIndex: 1 },
        { question: `Kaderde belirlenen şeyin zamanı gelince gerçekleşmesine ne denir?`, options: [`Kaza`, `Kader`, `Tevekkül`, `Sünnetullah`], correctIndex: 0 },
        { question: `Suyun 100°C'de kaynaması hangi yasaya örnektir?`, options: [`Toplumsal`, `Biyolojik`, `Fiziksel`, `Ahlaki`], correctIndex: 2 },
        { question: `Canlıların doğması, büyümesi ve ölmesi hangi yasaya örnektir?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Ekonomik`], correctIndex: 1 },
        { question: `"Adaletsizliğin toplumu çökertmesi" hangi yasaya örnektir?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Hukuki`], correctIndex: 2 },
        { question: `İnsanın seçme özgürlüğüne ne denir?`, options: [`Cüz'i irade`, `Külli irade`, `Tevekkül`, `Kaza`], correctIndex: 0 },
        { question: `Allah'ın iradesine ne denir?`, options: [`Cüz'i irade`, `Külli irade`, `Kader`, `Kaza`], correctIndex: 1 },
        { question: `Gereken çabayı gösterdikten sonra sonucu Allah'a bırakmaya ne denir?`, options: [`Tevekkül`, `Tembellik`, `Kader`, `Kaza`], correctIndex: 0 },
        { question: `"Önce deveni bağla, sonra tevekkül et" sözü hangi kavramı doğru anlatır?`, options: [`Çalışmadan sonucu Allah'a bırakma`, `Çalışıp sonucu Allah'a bırakma`, `Hiç çalışmama`, `Yalnız dua etme`], correctIndex: 1 },
        { question: `"Her şey kaderdir, ben ne yapsam değişmez" düşüncesi neden yanlıştır?`, options: [`İnsanın hiçbir iradesi yoktur`, `İnsan irade sahibi ve sorumludur`, `Allah hiçbir şeyi belirlemez`, `Her şeyi tesadüfler belirler`], correctIndex: 1 },
        { question: `Yer çekimi hangi tür yasaya örnektir?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Manevi`], correctIndex: 0 },
        { question: `Bir bitkinin fotosentez yapması hangi yasaya örnektir?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Kimyasal`], correctIndex: 1 },
        { question: `"Çalışan kazanır" sözü hangi yasaya işaret eder?`, options: [`Fiziksel`, `Biyolojik`, `Toplumsal`, `Doğal`], correctIndex: 2 },
        { question: `Allah'ın evrene koyduğu değişmez düzene Kur'an'da ne ad verilir?`, options: [`Sünnetullah`, `Kader`, `Cüz'i irade`, `Tevekkül`], correctIndex: 0 },
        { question: `Sınava çalışmadan "kaderimde varsa kazanırım" demek hangi yanlışı içerir?`, options: [`Tevekkülün yanlış anlaşılması`, `Kader ile kazanın karıştırılması`, `Doğa yasası ile kural karışıklığı`, `Sabrın anlamının bilinmemesi`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi kaza örneğidir?`, options: [`Allah'ın olacakları bilmesi`, `Bir öğrencinin sınavı kazanması`, `Cüz'i iradenin verilmesi`, `Sünnetullah`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi insanın sorumluluğunun şartlarından DEĞİLDİR?`, options: [`Akıl sahibi olmak`, `İrade sahibi olmak`, `Bilinç sahibi olmak`, `Servet sahibi olmak`], correctIndex: 3 },
        { question: `Tevekkül eden bir öğrencinin sınavdan önce yapması gereken nedir?`, options: [`Hiç çalışmadan sonucu beklemek`, `Çalışıp sonra Allah'a güvenmek`, `Yalnızca şans dilemekle yetinmek`, `Çalışmayı sınav gününe ertelemek`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi fiziksel yasaya ÖRNEK DEĞİLDİR?`, options: [`Yağmurun yağması`, `Suyun donması`, `Bitkinin büyümesi`, `Cisimlerin düşmesi`], correctIndex: 2 },
        { question: `Bir kişi tedbirini alıp "Allah korusun" demesi neye örnektir?`, options: [`Tembellik`, `Tevekkül`, `Kader`, `Şans`], correctIndex: 1 },
        { question: `İnsan dışındaki canlılarda cüz'i irade (seçim hakkı) var mıdır?`, options: [`Vardır`, `Yoktur`, `Bazılarında`, `Bilinmez`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi kader inancının doğru sonucu DEĞİLDİR?`, options: [`Allah'ın her şeyi bilmesi`, `Çalışmayı bırakmak`, `Tevekkül etmek`, `Çabayı sürdürmek`], correctIndex: 1 },
        { question: `Sünnetullah ne anlama gelir?`, options: [`Peygamberin söz ve davranışları`, `Allah'ın evrene koyduğu yasalar`, `İslam dininin beş temel şartı`, `Cuma günü kılınan farz namaz`], correctIndex: 1 },
        { question: `Hangisi insan iradesinin gücünü gösterir?`, options: [`Mevsimlerin düzenli değişmesi`, `Yağmurun mevsiminde yağması`, `Meslek ve eğitim yolunu seçmek`, `Yer çekiminin sürekli etkisi`], correctIndex: 2 },
        { question: `Bir kişi çalışmadan "Allah verir" diyorsa hangi hata vardır?`, options: [`Tevekkül yanlış anlaşılmıştır`, `İrade doğru kullanılmıştır`, `Kader inkâr edilmiştir`, `Hata yoktur`], correctIndex: 0 },
        { question: `Müslüman bir öğrencinin sınava hazırlığı nasıl olmalıdır?`, options: [`Yalnızca dua etmekle yetinmek`, `Hem çalışmak hem dua etmek`, `Yalnızca çalışıp dua etmemek`, `Hiçbir şekilde hazırlanmamak`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi toplumsal yasaya örnektir?`, options: [`Suyun yüz derecede kaynaması`, `Bitkinin ışığa doğru büyümesi`, `Birlik olan toplumun güçlenmesi`, `Cisimlerin yere doğru düşmesi`], correctIndex: 2 },
        { question: `Allah'ın gücünün sınırı var mıdır?`, options: [`Vardır, zamanla azalır`, `Yoktur, gücü sınırsızdır`, `Bazı durumlarda vardır`, `Yaratıklarının gücü kadardır`], correctIndex: 1 },
        { question: `"Çalışan demir paslanmaz" deyimi hangi inançla uyumludur?`, options: [`Tembelliğe teşvik`, `Çaba ve emek`, `Kaderi inkâr`, `Şansa güven`], correctIndex: 1, explanation: `Çaba ve emek (tevekkülle birlikte)` },
        { question: `Kader inancı insanı nasıl etkiler?`, options: [`İnsanı sorumsuz ve tembel yapar`, `Tedbir almaya ve tevekküle yöneltir`, `Geleceği önceden bilmesini sağlar`, `Geleceğe dair umutsuzluğa düşürür`], correctIndex: 1 },
      ],
    },
    {
      id: "zekat-sadaka-hac",
      name: `Zekât, Sadaka ve Hac`,
      summary: `Paylaşma ve yardımlaşma ibadetleri.`,
      youtubeId: "",
      mindMap: {
        center: `Zekât, Sadaka ve Hac`,
        branches: [
          {
            label: `Zekât`,
            sections: [
              { kind: "kural", content: `Nisaba ulaşan Müslümanın malının kırkta birini (1/40 = %2,5) ihtiyaç sahiplerine vermesidir; farzdır.` },
              { kind: "ornek", content: `Zekât verilenler (Tevbe 60'a göre 8 grup): fakirler, miskinler, zekât memurları, kalpleri İslam'a ısındırılacaklar, köleler, borçlular, Allah yolundakiler ve yolda kalmışlar.` },
              { kind: "ornek", content: `Zekât oranları: parada/altında 1/40; topraktan elde edilen ürünlerde 1/10 (öşür); küçükbaş ve büyükbaş hayvanlarda farklı oranlar.` },
              { kind: "tuzak", content: `Zekât her Müslümana değil, yalnız nisaba (belirli zenginliğe) ulaşan kişiye farzdır. Akrabaya öncelik tanınır.` },
            ],
          },
          {
            label: `Sadaka ve İnfak`,
            sections: [
              { kind: "tanim", content: `Sadaka, karşılık beklemeden yapılan gönüllü yardımdır. İnfak, Allah rızası için yapılan her türlü harcamadır.` },
              { kind: "ornek", content: `Sadaka örnekleri: aç doyurmak, ihtiyaç sahibine para vermek, güler yüz göstermek, kötülükten alıkoymak, faydalı bilgi öğretmek, yoldan eziyet kaldırmak. Sadaka-i cariye: insan yaşadıkça (hatta öldükten sonra da) sevap getiren kalıcı sadakalar (cami, çeşme, okul, kitap, ağaç dikme).` },
            ],
          },
          {
            label: `Hac`,
            sections: [
              { kind: "kural", content: `İmkânı olan Müslümanların ömründe bir kez Kâbe'yi (Mekke) ziyaret ederek yaptığı ibadettir; farzdır.` },
              { kind: "ornek", content: `Sıralı uygulamalar: 1) İhrama girme (Mikat). 2) Tavaf (Kâbe çevresinde 7 tur). 3) Sa'y (Safa-Merve arasında 7 gidiş-geliş). 4) Arafat'ta vakfe (Zilhicce 9). 5) Müzdelife'de vakfe. 6) Şeytan taşlama (Mina). 7) Kurban kesme (Kurban Bayramı). 8) Veda tavafı.` },
              { kind: "ornek", content: `Hac şartları: Müslüman olmak, akıllı-buluğ, sağlık, mali güç, yol güvenliği. Ramazan'da değil, Zilhicce ayının belirli günlerinde yapılır.` },
              { kind: "tuzak", content: `Hac umre ile karıştırılır. Umre yılın her zamanı yapılabilir, hac belirli günlerdedir; Arafat'a çıkmayan haccı yapmamış sayılır.` },
            ],
          },
          {
            label: `Kurban`,
            sections: [
              { kind: "tanim", content: `İbadet niyetiyle belirli hayvanların kesilmesi; eti paylaşılarak yardımlaşma sağlanır.` },
              { kind: "ornek", content: `Kesilebilecek hayvanlar: koyun, keçi (1 yaş), sığır, manda (2 yaş), deve (5 yaş). Etin 1/3'ü ev halkına, 1/3'ü akrabaya/komşuya, 1/3'ü fakirlere dağıtılır.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Zekât kimlere farzdır?`, back: `Belirli zenginliğe (nisaba) ulaşan Müslümanlara.` },
        { front: `Zekâtın temel oranı nedir?`, back: `Malın kırkta biri (1/40).` },
        { front: `Sadaka nedir?`, back: `Karşılık beklemeden yapılan gönüllü yardımdır.` },
        { front: `Hac nerede ve ne sıklıkla yapılır?`, back: `Mekke'de (Kâbe); imkânı olana ömürde bir kez farzdır.` },
      ],
      article: `# Zekât
[kural] **Zekât:** belirli bir zenginliğe (nisaba) ulaşan Müslümanın, malının **kırkta birini (1/40)** ihtiyaç sahiplerine vermesidir. **Farz** bir ibadettir.
[tuzak] Zekât **her Müslümana değil**, yalnız nisaba (belirli zenginliğe) ulaşan kişiye farzdır.

# Sadaka ve İnfak
[tanım] **Sadaka:** karşılık beklemeden yapılan gönüllü yardım. **İnfak:** Allah rızası için yapılan her türlü harcama.
[örnek] Bir ihtiyaç sahibine yardım etmek, güler yüz göstermek bile sadaka sayılır.

# Hac
[kural] **Hac:** imkânı (sağlık ve maddi güç) olan Müslümanların ömründe **bir kez** Mekke'deki **Kâbe'yi** ziyaret ederek yaptığı ibadettir; farzdır.
[örnek] Hac uygulamaları: **ihram**, **tavaf**, **sa'y** ve Arafat'ta **vakfe**.

# Kurban ve Ortak Amaç
[tanım] **Kurban:** ibadet niyetiyle belirli hayvanların kesilip etinin paylaşılmasıdır.
[soru] Zekât, sadaka, hac ve kurbanın ortak toplumsal faydası → **yardımlaşma ve paylaşmayı** artırmaktır.`,
      tips: [
        {
          trap: `Zekâtın herkese farz olduğu sanılır.`,
          wrong: `Zekât bütün Müslümanlara farzdır.`,
          correct: `Zekât yalnız nisaba (belirli zenginliğe) ulaşan Müslümana farzdır.`,
        },
        {
          trap: `Hac ve umre karıştırılır.`,
          wrong: `Hac her yıl yapılması gereken bir ibadettir.`,
          correct: `Hac, imkânı olana ömürde bir kez farzdır; belirli zamanda yapılır.`,
        },
      ],
      quiz: [
        { question: `Zekât kimlere farzdır?`, options: [`Bütün Müslümanlara her durumda`, `Nisaba ulaşan varlıklı Müslümana`, `Yalnızca erkek olan Müslümanlara`, `Ergenlik çağına girmemiş çocuklara`], correctIndex: 1 },
        { question: `Zekâtın temel oranı nedir?`, options: [`Kırkta bir`, `Yarısı`, `Dörtte biri`, `Tamamı`], correctIndex: 0 },
        { question: `Karşılık beklemeden yapılan gönüllü yardıma ne denir?`, options: [`Zekât`, `Sadaka`, `Hac`, `Nisap`], correctIndex: 1 },
        { question: `Hac ibadeti nerede yapılır?`, options: [`Medine`, `Mekke`, `Kudüs`, `İstanbul`], correctIndex: 1 },
        { question: `Hac, imkânı olan Müslümana ne sıklıkla farzdır?`, options: [`Her yıl bir kez`, `Ömürde bir kez`, `Her ay bir kez`, `Haftada bir kez`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi hac ibadetinin bir uygulamasıdır?`, options: [`Tavaf`, `Teravih`, `Sahur`, `Nisap`], correctIndex: 0 },
        { question: `Kurban ibadetinin temel amacı nedir?`, options: [`Allah'a yakınlık ve paylaşma`, `Varlığını çevreye göstermek`, `Ticaretten kazanç elde etmek`, `Eğlenmek ve ziyafet vermek`], correctIndex: 0 },
        { question: `Zekât, sadaka ve hac gibi ibadetlerin ortak toplumsal faydası nedir?`, options: [`Paylaşma ve dayanışmayı artırmak`, `Toplumda rekabeti körüklemek`, `Bireyselliği ön plana çıkarmak`, `Gösteriş duygusunu güçlendirmek`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Zekât kimlere farzdır?`, options: [`Bütün Müslümanlara her durumda`, `Nisaba ulaşan zengin Müslümana`, `Yalnızca erkek olan Müslümanlara`, `Ergenlik çağına girmemiş çocuklara`], correctIndex: 1 },
        { question: `Zekâtın temel oranı kaçtır?`, options: [`1/40`, `1/10`, `1/2`, `1/4`], correctIndex: 0 },
        { question: `Toprak ürünlerinden alınan zekâta ne ad verilir?`, options: [`Öşür`, `Cizye`, `Haraç`, `Fitre`], correctIndex: 0 },
        { question: `Karşılık beklemeden yapılan gönüllü yardıma ne denir?`, options: [`Zekât`, `Sadaka`, `Hac`, `Oruç`], correctIndex: 1 },
        { question: `Hac ibadeti nerede yapılır?`, options: [`Medine`, `Mekke`, `Kudüs`, `İstanbul`], correctIndex: 1 },
        { question: `Hac, imkânı olan Müslümana ne sıklıkla farzdır?`, options: [`Her yıl`, `Ömürde bir kez`, `Ayda bir`, `Beş yılda bir`], correctIndex: 1 },
        { question: `Kâbe'nin etrafında 7 kez dönmeye ne denir?`, options: [`Sa'y`, `Tavaf`, `Vakfe`, `İhram`], correctIndex: 1 },
        { question: `Safa ve Merve tepeleri arasındaki gidiş-gelişe ne denir?`, options: [`Tavaf`, `Sa'y`, `Vakfe`, `İhram`], correctIndex: 1 },
        { question: `Arafat'taki bekleyişe ne denir?`, options: [`Tavaf`, `Sa'y`, `Vakfe`, `Hutbe`], correctIndex: 2 },
        { question: `Hac için giyilen özel kıyafetli duruma ne denir?`, options: [`İhram`, `İmama`, `Niyabet`, `Cübbe`], correctIndex: 0 },
        { question: `Zekât verilecek 8 grup Kur'an'ın hangi suresinde belirtilmiştir?`, options: [`Bakara`, `Tevbe`, `Mâide`, `Yâsîn`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi zekât verilen gruplardan DEĞİLDİR?`, options: [`Fakirler`, `Yolda kalmışlar`, `Borçlular`, `Zenginler`], correctIndex: 3 },
        { question: `Hangi durumda hac farz olmaz?`, options: [`Sağlığı yerinde değilse`, `Zengin ise`, `Akıllı ise`, `Yol güvenliği varsa`], correctIndex: 0 },
        { question: `Kurban kesilebilecek hayvanlardan biri DEĞİLDİR?`, options: [`Koyun`, `Sığır`, `Deve`, `Tavuk`], correctIndex: 3 },
        { question: `Kurban etinin paylaşımı genelde nasıldır?`, options: [`Tamamı ev halkına ayrılır`, `1/3 ev, 1/3 akraba, 1/3 fakir`, `Tamamı fakirlere dağıtılır`, `Yarısı satılır, yarısı yenir`], correctIndex: 1 },
        { question: `Allah rızası için yapılan her türlü harcamaya ne denir?`, options: [`Sadaka`, `İnfak`, `Zekât`, `Sa'y`], correctIndex: 1 },
        { question: `Hac hangi Hicri ayda yapılır?`, options: [`Ramazan`, `Şevval`, `Zilhicce`, `Muharrem`], correctIndex: 2 },
        { question: `Şeytan taşlama ibadeti nerede yapılır?`, options: [`Müzdelife`, `Mina`, `Arafat`, `Kâbe`], correctIndex: 1 },
        { question: `Hac'da ihrama girilen sınır yerlere ne denir?`, options: [`Mikat`, `Tavaf`, `Sa'y`, `Niyabet`], correctIndex: 0 },
        { question: `Zekât ne tür mallardan verilir?`, options: [`Tüketilip biten mallardan`, `Nisabı bulan ve yıllanan mal`, `Günlük kullanılan eşyalardan`, `Borçla yeni alınan mallardan`], correctIndex: 1 },
        { question: `Zekât akrabalara verilebilir mi?`, options: [`Hayır`, `Evet`, `Sadece kardeşe`, `Hiçbir yakına verilmez`], correctIndex: 1, explanation: `Evet (anne-baba ve eş hariç)` },
        { question: `Aşağıdakilerden hangisi zekât niyetiyle verilen olamaz?`, options: [`Para`, `Tahıl`, `Altın`, `Borç`], correctIndex: 3 },
        { question: `Umre ile hac arasındaki temel fark nedir?`, options: [`Umre farzdır, hac ise sünnettir`, `Hac belirli zamanda, umre her zaman`, `İkisi de tamamen aynı ibadettir`, `Umre yalnızca Medine'de yapılır`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi sadaka-i cariye (kalıcı sadaka) örneğidir?`, options: [`Cami yaptırmak`, `Tek bir öğle yemeği`, `Bir kez selam`, `Bir defa ziyaret`], correctIndex: 0 },
        { question: `Hac ibadetinin en önemli rüknü nedir?`, options: [`Safa-Merve arasında sa'y`, `Şeytan taşlama görevi`, `Arafat'ta vakfeye durmak`, `Mina'da kurban kesmek`], correctIndex: 2 },
        { question: `Kurban kesmek kimlere vacip olur?`, options: [`Ergenlik çağına girmemiş çocuğa`, `Geçimini zor sağlayan fakire`, `Nisaba ulaşan zengin Müslümana`, `Yalnızca erkek olan Müslümanlara`], correctIndex: 2 },
        { question: `Aşağıdakilerden hangisi sadaka çeşitlerinden DEĞİLDİR?`, options: [`Mal yardımı`, `Güler yüz göstermek`, `İlim öğretmek`, `Şikâyet etmek`], correctIndex: 3 },
        { question: `Zekât oranı malın yüzde kaçıdır?`, options: [`%1 oranında`, `%2,5 oranında`, `%5 oranında`, `%10 oranında`], correctIndex: 1 },
        { question: `Hac'da Arafat'a çıkma günü hangisidir?`, options: [`Zilhicce 1`, `Zilhicce 9`, `Şevval 1`, `Ramazan 27`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi paylaşma-yardımlaşma ibadeti DEĞİLDİR?`, options: [`Fakire zekât vermek`, `Yoksula sadaka vermek`, `Bayramda kurban kesmek`, `Cuma namazı kılmak`], correctIndex: 3 },
      ],
    },
    {
      id: "din-ve-hayat",
      name: `Din ve Hayat`,
      summary: `Dinin birey ve topluma katkısı, temel değerler.`,
      youtubeId: "",
      mindMap: {
        center: `Din ve Hayat`,
        branches: [
          {
            label: `Din, Birey ve Toplum`,
            sections: [
              { kind: "tanim", content: `Din bireye ahlaki değerler kazandırır; toplumda huzur, dayanışma ve düzeni destekler.` },
            ],
          },
          {
            label: `Korunması Amaçlanan Değerler`,
            sections: [
              { kind: "kural", content: `Beş temel amaç: canın, neslin, aklın, malın ve dinin korunması.` },
              { kind: "ornek", content: `Can → cinayetin yasaklanması, sağlığa zarar verenden kaçınma. Nesil → zinanın yasaklanması, ailenin korunması. Akıl → içki ve uyuşturucunun yasaklanması. Mal → hırsızlık ve haksız kazancın yasaklanması. Din → inanç özgürlüğü ve dinin korunması.` },
            ],
          },
          {
            label: `Ahlaki Değerler`,
            sections: [
              { kind: "ornek", content: `Dürüstlük → sözünde durmak, yalan söylememek. Adalet → herkese hakkını vermek. Merhamet → zayıfa, yaşlıya, hayvana şefkat. Yardımlaşma → komşunun, akrabanın, mağdurun yanında olmak. Saygı → büyüklere ve farklı görüşlere. Hoşgörü → kusurları affetmek, kötülüğe iyilikle karşılık vermek. Sabır → zorluklara dayanmak.` },
            ],
          },
          {
            label: `Din ve Temizlik`,
            sections: [
              { kind: "kural", content: `İslam hem maddi (beden, çevre) hem manevi (kalp, niyet) temizliğe önem verir.` },
              { kind: "ornek", content: `Maddi temizlik: abdest ve gusül; el-yüz yıkama, diş bakımı, kıyafet temizliği, çevre temizliği. Manevi temizlik: kıskançlık-kibir-haset gibi kötü huylardan arınma, tövbe, samimi niyet.` },
              { kind: "ipucu", content: `Hadis: "Temizlik imanın yarısıdır."` },
            ],
          },
        ],
      },
      cards: [
        { front: `Dinin korumayı amaçladığı temel değerler nelerdir?`, back: `Can, nesil, akıl, mal ve din.` },
        { front: `İçki ve uyuşturucu hangi değeri korumak için yasaktır?`, back: `Aklın korunması.` },
        { front: `İslam'da temizlik kaç boyutludur?`, back: `Maddi (beden/çevre) ve manevi (kalp/niyet).` },
        { front: `Dinin topluma katkısı nedir?`, back: `Huzur, dayanışma ve ahlaki düzen sağlamaktır.` },
      ],
      article: `# Din, Birey ve Toplum
Din, bireye **ahlaki değerler** kazandırır; toplumda **huzur, dayanışma ve düzen** sağlanmasına katkıda bulunur.

# Dinin Korumayı Amaçladığı Temel Değerler
[kural] Beş temel değer korunmak istenir: **can, nesil, akıl, mal ve din**.
[örnek] İçki ve uyuşturucunun yasak olması → **aklın** korunması; haksız kazancın yasaklanması → **malın** korunması.

# Ahlaki Değerler
[örnek] **Dürüstlük, adalet, merhamet, yardımlaşma, saygı ve hoşgörü** dinin öne çıkardığı değerlerdir.
[ipucu] Bu değerler hem bireyi olgunlaştırır hem toplumsal güveni artırır.

# Din ve Temizlik
[kural] İslam **maddi temizliğe** (beden, giysi, çevre) ve **manevi temizliğe** (kalp, niyet, kötü huylardan arınma) birlikte önem verir.
[soru] "Aklı korumak amacıyla hangisi yasaklanmıştır?" → içki ve uyuşturucu.`,
      tips: [
        {
          trap: `Temizlik yalnız bedensel sanılır.`,
          wrong: `Dinde temizlik sadece beden temizliğidir.`,
          correct: `Temizlik hem maddi (beden/çevre) hem manevi (kalp/niyet) boyutludur.`,
        },
        {
          trap: `Dinin yalnız bireysel olduğu sanılır.`,
          wrong: `Din yalnızca bireyi ilgilendirir, toplumla ilgisi yoktur.`,
          correct: `Din bireye değer kazandırırken topluma da huzur ve dayanışma getirir.`,
        },
      ],
      quiz: [
        { question: `Aklı korumak amacıyla aşağıdakilerden hangisi yasaklanmıştır?`, options: [`İçki ve uyuşturucu kullanmak`, `Düzenli olarak spor yapmak`, `Kitap okuyup bilgi edinmek`, `Helal yoldan kazanç sağlamak`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi dinin korumayı amaçladığı temel değerlerden DEĞİLDİR?`, options: [`Canın ve sağlığın korunması`, `Aklın ve bilincin korunması`, `Malın ve mülkün korunması`, `Haksız kazancın korunması`], correctIndex: 3 },
        { question: `İslam dininde temizlik nasıl ele alınır?`, options: [`Sadece beden temizliği`, `Hem maddi hem manevi`, `Önemsizdir`, `Sadece çevre`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi bir ahlaki değerdir?`, options: [`Dürüstlük`, `Bencillik`, `Yalan`, `Kıskançlık`], correctIndex: 0 },
        { question: `Dinin toplumsal faydalarından biri nedir?`, options: [`Dayanışma ve huzuru artırmak`, `Çatışma ve kavgayı çoğaltmak`, `Bencillik duygusunu beslemek`, `Kuralsız bir düzen kurmak`], correctIndex: 0 },
        { question: `Manevi temizliğe örnek aşağıdakilerden hangisidir?`, options: [`Kötü huylardan arınmak`, `Elleri sabunla yıkamak`, `Odayı süpürüp temizlemek`, `Dişleri düzenli fırçalamak`], correctIndex: 0 },
        { question: `Malın korunması amacıyla aşağıdakilerden hangisi yasaklanmıştır?`, options: [`Hırsızlık ve haksız kazanç`, `Helal yoldan ticaret yapmak`, `Alın teriyle para kazanmak`, `Kazancını tasarruf etmek`], correctIndex: 0 },
        { question: `Din bireye öncelikle ne kazandırır?`, options: [`Ahlaki değerler ve erdem`, `Maddi zenginlik ve servet`, `Toplum içinde şöhret ve ün`, `Başkaları üzerinde güç`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Dinin korumayı amaçladığı temel değerlerden biri DEĞİLDİR?`, options: [`Can`, `Akıl`, `Mal`, `Güç`], correctIndex: 3 },
        { question: `İçki ve uyuşturucunun yasak olması hangi değeri korur?`, options: [`Can`, `Akıl`, `Mal`, `Nesil`], correctIndex: 1 },
        { question: `Hırsızlığın yasak olması hangi değeri korur?`, options: [`Can`, `Akıl`, `Mal`, `Din`], correctIndex: 2 },
        { question: `Cinayetin yasak olması hangi değeri korur?`, options: [`Can`, `Akıl`, `Mal`, `Nesil`], correctIndex: 0 },
        { question: `Zinanın yasak olması hangi değeri korur?`, options: [`Canın korunması`, `Neslin korunması`, `Aklın korunması`, `Malın korunması`], correctIndex: 1 },
        { question: `İnanç özgürlüğünün korunması hangi değere yöneliktir?`, options: [`Can`, `Akıl`, `Mal`, `Din`], correctIndex: 3 },
        { question: `Aşağıdakilerden hangisi ahlaki değer DEĞİLDİR?`, options: [`Dürüstlük`, `Adalet`, `Merhamet`, `Bencillik`], correctIndex: 3 },
        { question: `İslam'da temizlik kaç boyutludur?`, options: [`Yalnızca bedenin temizliği`, `Yalnızca çevrenin temizliği`, `Hem maddi hem manevi temizlik`, `Yalnızca kalbin temizliği`], correctIndex: 2 },
        { question: `"Temizlik imanın yarısıdır" sözü kime aittir?`, options: [`Hz. Ömer`, `Hz. Muhammed`, `Hz. Ebubekir`, `İmam Şafii`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi manevi temizlik örneğidir?`, options: [`Elleri sabunla yıkamak`, `Kötü huylardan arınmak`, `Dişleri düzenli fırçalamak`, `Saçları tarayıp düzeltmek`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi maddi temizlik örneğidir?`, options: [`Tevbe etmek`, `Niyeti samimi tutmak`, `Abdest almak`, `Kıskançlıktan kurtulmak`], correctIndex: 2 },
        { question: `Dinin bireye en temel kazandırdığı şey nedir?`, options: [`Maddi zenginlik ve servet`, `Ahlaki değerler ve erdem`, `Başkaları üzerinde güç`, `Toplum içinde ün ve şöhret`], correctIndex: 1 },
        { question: `Dinin topluma katkısı nedir?`, options: [`Bencilliği güçlendirme`, `Çatışma`, `Huzur ve dayanışma`, `Kuralsızlık`], correctIndex: 2 },
        { question: `"Komşusu açken tok yatan bizden değildir" hadisi hangi değeri vurgular?`, options: [`Bencillik ve cimrilik`, `Dayanışma ve komşuluk`, `Zenginlik ve mal sevgisi`, `Bireysellik ve yalnızlık`], correctIndex: 1 },
        { question: `Hangisi dürüstlüğün karşıtıdır?`, options: [`Doğruluk`, `Samimiyet`, `Yalan`, `Adalet`], correctIndex: 2 },
        { question: `Hangisi adaletin gereğidir?`, options: [`Herkese hakkı olanı vermek`, `Sevdiklerini kayırıp korumak`, `Kişiler arasında ayrım yapmak`, `Güçlünün yanında yer almak`], correctIndex: 0 },
        { question: `Bir kişi sözünü tutmuyorsa hangi değeri yaşamıyor demektir?`, options: [`Adalet`, `Cömertlik`, `Dürüstlük`, `Sabır`], correctIndex: 2 },
        { question: `Aşağıdakilerden hangisi adaletin korunması için gereklidir?`, options: [`Kanunlar`, `Sevgi`, `Bencillik`, `Şiddet`], correctIndex: 0 },
        { question: `Çevre temizliği hangi değere katkı sağlar?`, options: [`Yalnızca bireysel fayda`, `Toplumsal sağlık ve huzur`, `Hiçbir konuda katkı sağlamaz`, `Yalnızca ekonomik kazanç`], correctIndex: 1 },
        { question: `Haksız kazancın yasak olması hangi değeri korur?`, options: [`Can`, `Akıl`, `Mal`, `Nesil`], correctIndex: 2 },
        { question: `Aşağıdakilerden hangisi dini değerlerden DEĞİLDİR?`, options: [`Yardımlaşma`, `Saygı`, `Dürüstlük`, `Gösteriş`], correctIndex: 3 },
        { question: `Hangisi manevi temizliği bozar?`, options: [`Tevbe edip istiğfar etmek`, `Yalan söyleyip riya yapmak`, `Abdest alıp temizlenmek`, `Namaz kılıp dua etmek`], correctIndex: 1 },
        { question: `Hoşgörü ne demektir?`, options: [`Hakaret edip küçük görmek`, `Affetmek ve farklılığa saygı`, `Olan bitene kayıtsız kalmak`, `Her haksızlığa boyun eğmek`], correctIndex: 1 },
        { question: `Dinin verdiği ahlaki değerler hangi dönemde geçerlidir?`, options: [`Yalnız çocukluk`, `Yalnız yetişkinlik`, `Hayatın her aşamasında`, `Yalnız yaşlılık`], correctIndex: 2 },
        { question: `Bir kişinin kalbini kötü duygulardan arındırması neye katkı sağlar?`, options: [`Yalnızca bireysel mutluluğa`, `Bireysel ve toplumsal huzura`, `Yalnızca kişinin görünüşüne`, `Hiç kimseye fayda sağlamaz`], correctIndex: 1 },
        { question: `İslam'da yetimi koruma hangi değeri vurgular?`, options: [`Merhamet`, `Bencillik`, `Hırs`, `Şiddet`], correctIndex: 0 },
        { question: `Sözünde durmak hangi değerle ilgilidir?`, options: [`Cömertlik`, `Sabır`, `Dürüstlük`, `Güç`], correctIndex: 2 },
        { question: `Hangisi dinin yasakladığı bir davranıştır?`, options: [`İnsanlara yardım etmek`, `Herkese adaletli davranmak`, `Yalan söyleyip aldatmak`, `Büyüklere saygı göstermek`], correctIndex: 2 },
        { question: `Bir Müslüman'ın hayatına din nasıl yön verir?`, options: [`Yalnızca ibadetlerin yapılışında`, `Ahlak ve ilişkiler dâhil her alanda`, `Yalnızca özel gün ve gecelerde`, `Hayatın hiçbir alanında etkisizdir`], correctIndex: 1 },
        { question: `Dinin tanımladığı "iyi insan" kimdir?`, options: [`Malı ve serveti çok olan kişi`, `Ahlaklı, dürüst ve faydalı olan`, `Gücü ve mevkisi yüksek olan`, `Herkesçe tanınan ünlü kişi`], correctIndex: 1 },
      ],
    },
    {
      id: "hz-muhammedin-ornekligi",
      name: `Hz. Muhammed'in Örnekliği`,
      summary: `Peygamberimizin örnek ahlakı ve davranışları.`,
      youtubeId: "",
      mindMap: {
        center: `Hz. Muhammed'in Örnekliği`,
        branches: [
          {
            label: `Güvenilirliği`,
            sections: [
              { kind: "tanim", content: `Dürüstlüğü ve güvenilirliğiyle peygamberlikten önce bile "Muhammedü'l-Emin (güvenilir)" olarak tanındı.` },
              { kind: "ornek", content: `Mekkeliler değerli eşyalarını ona emanet ederdi. Hicret sırasında bile (kendisini öldürmek istedikleri hâlde) yanındaki emanetleri yerlerine ulaştırmak için Hz. Ali'yi bırakmıştır. Hilfu'l-Fudul (Erdemliler Antlaşması) gibi adalet ittifaklarına gençken katılmıştır.` },
            ],
          },
          {
            label: `Merhamet ve Hoşgörü`,
            sections: [
              { kind: "ornek", content: `Çocuk → "Küçüklerine merhamet etmeyen bizden değildir." Torunları Hasan-Hüseyin'le oynaması. Yaşlı → büyüklere saygı vurgusu. Hayvan → susuz kediye su veren kadın için hayır dileği; aç deveyi taşımayan sahibine ikaz. Düşman → Mekke fethinde "Bugün size hesap sorulmayacaktır." (genel af).` },
            ],
          },
          {
            label: `İstişare (Danışma)`,
            sections: [
              { kind: "kural", content: `Önemli kararlarda çevresindekilere danışır (istişare eder), onların görüşüne değer verirdi.` },
              { kind: "ornek", content: `Bedir Savaşı'nda mevzi seçiminde Hubâb b. Münzir'in görüşünü kabul etti. Uhud öncesi savunma şekli için sahabelerle istişare etti. Hendek Savaşı'nda Selman-ı Farisi'nin "hendek kazma" fikrini benimsedi.` },
            ],
          },
          {
            label: `Adalet ve Sabır`,
            sections: [
              { kind: "ornek", content: `Adalet → "Sizden öncekiler, zengin hırsızlık yapınca bırakır, zayıf yapınca cezalandırırlardı; bu yüzden helak oldular." Sabır → Tâif'te taşlanmasına rağmen halka beddua etmedi; Mekke'deki ambargo döneminde yıllarca açlığa katlandı; çocuklarının çoğunu kaybetmiş olmasına rağmen sabır gösterdi.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Peygamberimize verilen "güvenilir" anlamındaki unvan?`, back: `Muhammedü'l-Emin.` },
        { front: `İstişare nedir?`, back: `Karar alırken çevreyle danışmak, görüş almaktır.` },
        { front: `Hz. Muhammed'in öne çıkan ahlaki özellikleri?`, back: `Dürüstlük, merhamet, adalet, sabır, hoşgörü.` },
        { front: `Peygamberimiz neden örnek alınır?`, back: `Söz ve davranışlarıyla en güzel ahlakı yaşadığı için.` },
      ],
      article: `# Güvenilirliği
[tanım] Hz. Muhammed, dürüstlüğü ve güvenilirliğiyle peygamberlikten önce bile **"Muhammedü'l-Emin" (güvenilir)** olarak anılırdı.

# Merhamet ve Hoşgörü
[örnek] Çocuklara, yaşlılara ve hayvanlara **şefkat** gösterir; kendisine kötülük edenleri bile **affederdi**.

# İstişare (Danışma)
[kural] Önemli kararlarda çevresindekilere **danışır (istişare eder)**, onların görüşlerine değer verirdi.
[ipucu] Bu davranış, birlikte karar almanın ve saygının önemini gösterir.

# Adalet ve Sabır
[örnek] Herkese **eşit ve adil** davranır; karşılaştığı zorluklara **sabırla** karşılık verirdi.
[soru] "Peygamberimize peygamberlikten önce verilen unvan?" → Muhammedü'l-Emin (güvenilir).`,
      tips: [
        {
          trap: `"Muhammedü'l-Emin" unvanının anlamı karıştırılır.`,
          wrong: `"Muhammedü'l-Emin" zengin anlamına gelir.`,
          correct: `"Muhammedü'l-Emin" güvenilir anlamına gelir.`,
        },
        {
          trap: `İstişare küçümsenir.`,
          wrong: `Peygamberimiz kararlarını kimseye danışmadan alırdı.`,
          correct: `Önemli kararlarda çevresine danışır (istişare ederdi).`,
        },
      ],
      quiz: [
        { question: `Hz. Muhammed'e peygamberlikten önce verilen "güvenilir" anlamındaki unvan nedir?`, options: [`Muhammedü'l-Emin`, `El-Fâtih lakabı`, `Es-Sıddık lakabı`, `El-Faruk lakabı`], correctIndex: 0 },
        { question: `Karar alırken çevreyle danışmaya ne denir?`, options: [`İstişare`, `Tevekkül`, `İnfak`, `Tavaf`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Hz. Muhammed'in ahlaki özelliklerinden biridir?`, options: [`Merhamet`, `Kibir`, `Hırs`, `Bencillik`], correctIndex: 0 },
        { question: `Hz. Muhammed zorluklar karşısında nasıl davranırdı?`, options: [`Sabırla`, `Öfkeyle`, `Kaçarak`, `Umursamazca`], correctIndex: 0 },
        { question: `Peygamberimizin insanlara davranışı nasıldı?`, options: [`Adaletli ve eşit davranırdı`, `Kişilere göre ayrım yapardı`, `Herkese kaba davranırdı`, `İnsanlarla ilgilenmezdi`], correctIndex: 0 },
        { question: `"Muhammedü'l-Emin" ne anlama gelir?`, options: [`Güvenilir olan kişi`, `Zengin olan kişi`, `Çok güçlü olan kişi`, `Cesur olan kişi`], correctIndex: 0 },
        { question: `Hz. Muhammed kendisine kötülük edenlere çoğunlukla nasıl davranmıştır?`, options: [`Affederek`, `İntikam alarak`, `Görmezden gelerek`, `Cezalandırarak`], correctIndex: 0 },
        { question: `Hz. Muhammed'i örnek almamızın temel sebebi nedir?`, options: [`En güzel ahlakı yaşaması`, `Çok zengin bir kişi olması`, `Toplumda güçlü biri olması`, `Herkesçe tanınıyor olması`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Hz. Muhammed'e peygamberlikten önce verilen "güvenilir" anlamındaki unvan?`, options: [`Muhammedü'l-Emin`, `Es-Sıddık lakabı`, `El-Faruk lakabı`, `El-Fâtih lakabı`], correctIndex: 0 },
        { question: `Karar alırken çevreyle danışmaya ne denir?`, options: [`İstişare`, `Tevekkül`, `İnfak`, `Tavaf`], correctIndex: 0 },
        { question: `Hz. Muhammed Bedir Savaşı'nda kimin mevzi seçimi görüşünü kabul etti?`, options: [`Hubâb b. Münzir`, `Hz. Ali`, `Hz. Ömer`, `Bilal-i Habeşî`], correctIndex: 0 },
        { question: `Hendek Savaşı'nda hendek kazma fikrini kim önerdi?`, options: [`Bilâl-i Habeşî`, `Ammâr b. Yâsir`, `Selman-ı Fârisî`, `Zeyd b. Hârise`], correctIndex: 2 },
        { question: `Mekke fethinde Hz. Muhammed kendisine kötülük edenlere ne yaptı?`, options: [`Hepsini tek tek cezalandırdı`, `Genel af ilan edip bağışladı`, `Şehirden çıkmaya zorladı`, `Mahkemede tek tek yargıladı`], correctIndex: 1 },
        { question: `Hz. Muhammed'in gençken katıldığı adalet ittifakı hangisidir?`, options: [`Hilfu'l-Fudul`, `Akabe biatı`, `Veda haccı`, `Hicret`], correctIndex: 0 },
        { question: `"Küçüklerine merhamet etmeyen bizden değildir" sözü kime aittir?`, options: [`Hz. Ali`, `Hz. Muhammed`, `Hz. Ömer`, `Hz. Ebubekir`], correctIndex: 1 },
        { question: `Hz. Muhammed kararlarını alırken çoğunlukla ne yapardı?`, options: [`Tek başına karar alırdı`, `Sahabelere danışırdı`, `Sadece eşine sorardı`, `Hiç düşünmezdi`], correctIndex: 1 },
        { question: `Hz. Muhammed zorluklara karşı nasıl davranırdı?`, options: [`Sabırla`, `Öfkeyle`, `Kaçarak`, `Şikâyet ederek`], correctIndex: 0 },
        { question: `"İnsanlar arasında en adil davran" emri kimden gelir?`, options: [`Allah'tan`, `Hz. Ömer'den`, `Filozoflardan`, `Sahabelerden`], correctIndex: 0 },
        { question: `Hz. Muhammed Tâif'te taşlanınca ne yaptı?`, options: [`Beddua edip lanet okudu`, `Sabretti ve hayır diledi`, `Hemen şikâyette bulundu`, `Sabretmeden Mekke'ye döndü`], correctIndex: 1 },
        { question: `Hz. Muhammed'in eşi ve ilk inanan kadın kimdir?`, options: [`Aişe`, `Hatice`, `Fatıma`, `Ümmü Gülsüm`], correctIndex: 1 },
        { question: `Hz. Muhammed'in torunlarından biri DEĞİLDİR?`, options: [`Hasan`, `Hüseyin`, `Ümmü Külsüm`, `Bilal`], correctIndex: 3 },
        { question: `Müslümanların ilk hicret ettiği yer?`, options: [`Habeşistan ülkesi`, `Yemen bölgesi`, `Mısır toprakları`, `Şam bölgesi`], correctIndex: 0 },
        { question: `Hz. Muhammed'in Mekke'den Medine'ye göç etmesine ne denir?`, options: [`Tevbe`, `Hicret`, `İsra`, `Mirac`], correctIndex: 1 },
        { question: `"Muhammedü'l-Emin" ne anlama gelir?`, options: [`Güvenilir olan kişi`, `Zengin olan kişi`, `Çok güçlü olan kişi`, `Cesur olan kişi`], correctIndex: 0 },
        { question: `Hz. Muhammed çocuklara karşı nasıldı?`, options: [`Sert ve mesafeli davranırdı`, `Şefkatli ve sevgi doluydu`, `Onlarla hiç ilgilenmezdi`, `Uzak durmayı tercih ederdi`], correctIndex: 1 },
        { question: `Hz. Muhammed'in ahlakını öven ayet hangi suredendir?`, options: [`Bakara suresi`, `Kalem suresi`, `Yâsîn suresi`, `İhlâs suresi`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi Hz. Muhammed'in özelliği DEĞİLDİR?`, options: [`Dürüstlük`, `Merhamet`, `Kibir`, `Adalet`], correctIndex: 2 },
        { question: `Hz. Muhammed hayvanlara nasıl davranırdı?`, options: [`Hayvanlarla hiç ilgilenmezdi`, `Şefkat gösterir, eziyeti yasaklardı`, `Onlara kaba ve kıyıcı davranırdı`, `Onları yük olarak görürdü`], correctIndex: 1 },
        { question: `Hz. Muhammed peygamberliğini kaç yaşında aldı?`, options: [`25`, `30`, `40`, `50`], correctIndex: 2 },
        { question: `Hz. Muhammed nerede doğmuştur?`, options: [`Medine`, `Tâif`, `Mekke`, `Necran`], correctIndex: 2 },
        { question: `Hz. Muhammed'in babasının adı?`, options: [`Abdullah`, `Ebu Talib`, `Hamza`, `Abbas`], correctIndex: 0 },
        { question: `Hz. Muhammed'in annesinin adı?`, options: [`Aişe`, `Âmine`, `Hatice`, `Halime`], correctIndex: 1 },
        { question: `Hicret hangi yıl gerçekleşti?`, options: [`610`, `622`, `632`, `570`], correctIndex: 1 },
        { question: `Hz. Muhammed kaç yıl Mekke'de İslam'ı tebliğ etti?`, options: [`10`, `13`, `23`, `5`], correctIndex: 1 },
        { question: `Hz. Muhammed'in vefatından sonra ilk halife kim oldu?`, options: [`Hz. Ömer bin Hattab`, `Hz. Osman bin Affan`, `Hz. Ebubekir es-Sıddık`, `Hz. Ali bin Ebu Talib`], correctIndex: 2 },
        { question: `Hz. Muhammed antlaşmalara nasıl davranırdı?`, options: [`Verdiği sözü mutlaka tutardı`, `Verdiği sözden kolayca dönerdi`, `Antlaşmaları hiç önemsemezdi`, `Karşı tarafa zorla bozdururdu`], correctIndex: 0 },
        { question: `Hz. Muhammed savaş öncesi mevzi seçiminde sahabenin görüşünü tercih etmesi hangi özelliğinin örneğidir?`, options: [`Cesaret ve kararlılığı`, `İstişareye önem vermesi`, `Korku ve çekingenliği`, `Bilgisizlik ve şaşkınlığı`], correctIndex: 1 },
        { question: `Hz. Muhammed'in en kıymetli mirası nedir?`, options: [`Bıraktığı mal ve mülkü`, `Sarayları ve hazineleri`, `Kur'an ve güzel ahlakı`, `Toprakları ve serveti`], correctIndex: 2 },
      ],
    },
    {
      id: "kuran-i-kerim-ve-ozellikleri",
      name: `Kur'an-ı Kerim ve Özellikleri`,
      summary: `Kur'an'ın indirilişi, yapısı ve temel konuları.`,
      youtubeId: "",
      mindMap: {
        center: `Kur'an-ı Kerim`,
        branches: [
          {
            label: `İndirilişi`,
            sections: [
              { kind: "kural", content: `Hz. Muhammed'e Cebrail aracılığıyla yaklaşık 23 yılda indirildi (610-632). İlk emir "Oku"dur (Alak suresi).` },
              { kind: "ornek", content: `İlk vahiy: 610'da Hira Mağarası'nda Alak suresinin ilk 5 ayeti. Mekke'de 13 yıl, Medine'de 10 yıl indi. Mekkî sureler iman/ahlak; Medenî sureler ibadet/hukuk konularını işler.` },
              { kind: "ornek", content: `Toplanışı: Hz. Ebubekir döneminde mushaf hâline getirildi (Yemame Savaşı sonrası); Hz. Osman döneminde çoğaltıldı ve İslam beldelerine gönderildi (resmî nüsha).` },
            ],
          },
          {
            label: `Yapısı`,
            sections: [
              { kind: "tanim", content: `Sure ve ayetlerden oluşur; 114 sure ve yaklaşık 6236 ayet vardır.` },
              { kind: "ornek", content: `İlk sure Fatiha (7 ayet); en uzun sure Bakara (286 ayet); en kısa sure Kevser (3 ayet). Cüz: Kur'an 30 cüze ayrılır. Hizip: her cüz 4 hizibe.` },
            ],
          },
          {
            label: `Özellikleri`,
            sections: [
              { kind: "kural", content: `Son ilahi kitaptır, Arapça indirilmiştir, değiştirilmeden korunmuştur, evrenseldir, her çağa hitap eder.` },
              { kind: "ornek", content: `Diğer ilahi kitaplar (tarihsel iniş sırasıyla): Hz. Musa → Tevrat, Hz. Davud → Zebur, Hz. İsa → İncil, Hz. Muhammed → Kur'an.` },
            ],
          },
          {
            label: `Konuları`,
            sections: [
              { kind: "ornek", content: `İnanç (Allah'a iman, ahiret, meleklere/kitaplara/peygamberlere iman, kader). İbadet (namaz, oruç, zekât, hac). Ahlak (dürüstlük, adalet, merhamet, sabır). Kıssalar (Hz. Yusuf, Hz. Musa, Hz. İbrahim, Hz. İsa kıssaları). Hukuk (aile, miras, ticaret).` },
            ],
          },
        ],
      },
      cards: [
        { front: `Kur'an kime, kim aracılığıyla indirildi?`, back: `Hz. Muhammed'e, Cebrail aracılığıyla.` },
        { front: `Kur'an kaç yılda indirildi?`, back: `Yaklaşık 23 yılda.` },
        { front: `İlk inen emir nedir?`, back: `"Oku" (Alak suresinin ilk ayetleri).` },
        { front: `Kur'an kaç sureden oluşur, ilk suresi nedir?`, back: `114 sure; ilk suresi Fatiha'dır.` },
      ],
      article: `# Kur'an'ın İndirilişi
[kural] Kur'an-ı Kerim, **Hz. Muhammed'e Cebrail (melek) aracılığıyla** yaklaşık **23 yılda** indirilmiştir. İlk inen emir **"Oku"**dur (Alak suresi).

# Yapısı
[tanım] Kur'an **sure** ve **ayetlerden** oluşur. Toplam **114 sure** vardır; ilk suresi **Fatiha**'dır.

# Özellikleri
[kural] Kur'an **son ilahi kitaptır**, **Arapça** indirilmiştir ve indirildiği günden bu yana **değiştirilmeden korunmuştur**.

# Konuları
[örnek] Başlıca konuları: **inanç (iman)**, **ibadet**, **ahlak** ve **kıssalar** (geçmiş toplumların ibret verici olayları).
[soru] "İlk inen emir hangisidir?" → "Oku" (Alak suresi).`,
      tips: [
        {
          trap: `Kur'an'ın iniş süresi karıştırılır.`,
          wrong: `Kur'an bir gecede tamamen indirildi.`,
          correct: `Kur'an yaklaşık 23 yıl boyunca, olaylara/ihtiyaçlara göre parça parça indirilmiştir.`,
        },
        {
          trap: `İlk sure ile ilk inen ayet karıştırılır.`,
          wrong: `Kur'an'ın ilk inen ayetleri Fatiha suresindendir.`,
          correct: `İlk inen ayetler Alak suresindendir ("Oku"); ilk sure (dizilişte) Fatiha'dır.`,
        },
      ],
      quiz: [
        { question: `Kur'an-ı Kerim, Hz. Muhammed'e hangi melek aracılığıyla indirilmiştir?`, options: [`Cebrail`, `Mikail`, `Azrail`, `İsrafil`], correctIndex: 0 },
        { question: `Kur'an yaklaşık kaç yılda indirilmiştir?`, options: [`23 yıl`, `1 gece`, `40 yıl`, `10 yıl`], correctIndex: 0 },
        { question: `Kur'an'ın ilk inen emri nedir?`, options: [`"Oku"`, `"Namaz kıl"`, `"Oruç tut"`, `"İnan"`], correctIndex: 0 },
        { question: `Kur'an kaç sureden oluşur?`, options: [`114 sure`, `104 sure`, `144 sure`, `141 sure`], correctIndex: 0 },
        { question: `Kur'an'ın ilk suresi hangisidir?`, options: [`Fatiha`, `Bakara`, `Alak`, `İhlas`], correctIndex: 0 },
        { question: `Kur'an hangi dilde indirilmiştir?`, options: [`Arapça`, `Türkçe`, `Farsça`, `İbranice`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Kur'an'ın temel konularından biri DEĞİLDİR?`, options: [`İnanç konuları`, `İbadet konuları`, `Ahlak konuları`, `Spor kuralları`], correctIndex: 3 },
        { question: `Kur'an'ın en önemli özelliklerinden biri nedir?`, options: [`Hiç değişmeden korunmuş olması`, `Zamanla sürekli değişmiş olması`, `Tek sayfadan oluşuyor olması`, `Yalnız bir kez okunabilmesi`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Kur'an-ı Kerim hangi melek aracılığıyla indirilmiştir?`, options: [`Cebrail`, `Mikail`, `İsrafil`, `Azrail`], correctIndex: 0 },
        { question: `Kur'an'ın indirilmesi kaç yıl sürmüştür?`, options: [`23`, `13`, `10`, `40`], correctIndex: 0 },
        { question: `Kur'an'ın ilk inen ayetleri hangi sureye aittir?`, options: [`Alak`, `Fatiha`, `Bakara`, `İhlas`], correctIndex: 0 },
        { question: `Alak suresinin ilk inen ayetinin emri nedir?`, options: [`Oku`, `Yaz`, `Namaz kıl`, `Oruç tut`], correctIndex: 0 },
        { question: `Kur'an'ın ilk inen ayetleri hangi ay ve gecede inmiştir?`, options: [`Ramazan, Kadir Gecesi`, `Şaban, Berat Gecesi`, `Recep, Miraç Gecesi`, `Muharrem, Aşure Gecesi`], correctIndex: 0 },
        { question: `Kur'an-ı Kerim'de toplam kaç sure vardır?`, options: [`114`, `113`, `100`, `120`], correctIndex: 0 },
        { question: `Kur'an'ın ilk suresi hangisidir?`, options: [`Fatiha`, `Bakara`, `İhlas`, `Alak`], correctIndex: 0 },
        { question: `Kur'an'ın en uzun suresi hangisidir?`, options: [`Bakara`, `Âl-i İmran`, `Nisa`, `Maide`], correctIndex: 0 },
        { question: `Kur'an'ın en kısa suresi hangisidir?`, options: [`Kevser`, `İhlas`, `Felak`, `Nas`], correctIndex: 0 },
        { question: `Kur'an-ı Kerim kaç cüzden oluşur?`, options: [`30`, `60`, `114`, `40`], correctIndex: 0 },
        { question: `Bakara suresi kaç ayetten oluşur?`, options: [`286`, `200`, `114`, `30`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi ilahi kitaplardan biri DEĞİLDİR?`, options: [`Mesnevi`, `Tevrat`, `Zebur`, `İncil`], correctIndex: 0 },
        { question: `Zebur hangi peygambere indirilmiştir?`, options: [`Hz. Davud`, `Hz. Musa`, `Hz. İsa`, `Hz. Muhammed`], correctIndex: 0 },
        { question: `Tevrat hangi peygambere indirilmiştir?`, options: [`Hz. Musa`, `Hz. Davud`, `Hz. İsa`, `Hz. İbrahim`], correctIndex: 0 },
        { question: `İncil hangi peygambere indirilmiştir?`, options: [`Hz. İsa`, `Hz. Musa`, `Hz. Davud`, `Hz. Muhammed`], correctIndex: 0 },
        { question: `Kur'an-ı Kerim hangi peygambere indirilmiştir?`, options: [`Hz. Muhammed'e`, `Hz. İbrahim'e`, `Hz. Süleyman'a`, `Hz. Musa'ya`], correctIndex: 0 },
        { question: `Kur'an hangi dilde indirilmiştir?`, options: [`Arapça`, `Türkçe`, `Farsça`, `İbranice`], correctIndex: 0 },
        { question: `Kur'an-ı Kerim hangi halife döneminde kitap haline getirilmiştir?`, options: [`Hz. Ebubekir es-Sıddık`, `Hz. Ömer bin Hattab`, `Hz. Osman bin Affan`, `Hz. Ali bin Ebu Talib`], correctIndex: 0 },
        { question: `Kur'an-ı Kerim hangi halife döneminde çoğaltılarak farklı bölgelere gönderilmiştir?`, options: [`Hz. Osman`, `Hz. Ebubekir`, `Hz. Ömer`, `Hz. Ali`], correctIndex: 0 },
        { question: `Mekke döneminde inen surelere ne ad verilir?`, options: [`Mekkî`, `Medenî`, `Mufassal`, `Tavâlî`], correctIndex: 0 },
        { question: `Medine döneminde inen surelere ne ad verilir?`, options: [`Medenî`, `Mekkî`, `Mufassal`, `Tavâlî`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Kur'an'ın temel konularından biri DEĞİLDİR?`, options: [`Spor kuralları`, `İnanç konuları`, `İbadet konuları`, `Ahlak konuları`], correctIndex: 0 },
        { question: `Kur'an'ın günümüze kadar değişmeden gelmesinin temel sebebi nedir?`, options: [`Allah'ın koruması ve hafızlar`, `Tamamen bir tesadüf olması`, `Tek nüsha hâlinde saklanması`, `Yalnızca bir kişide bulunması`], correctIndex: 0 },
        { question: `Kur'an'da geçmiş peygamberlerin ve toplumların hikâyelerine ne denir?`, options: [`Kıssa`, `Hadis`, `Sünnet`, `Mesel`], correctIndex: 0 },
        { question: `Kur'an'ı baştan sona ezberleyen kişiye ne denir?`, options: [`Hafız`, `Müezzin`, `İmam`, `Müftü`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Kur'an okumanın âdâbından biri DEĞİLDİR?`, options: [`Yüksek sesle bağırarak okumak`, `Abdestli olmak`, `Eûzü-besmele ile başlamak`, `Saygılı oturmak`], correctIndex: 0 },
        { question: `Kur'an'a göre insanın yaratılış amacı nedir?`, options: [`Allah'ı tanıyıp kulluk etmek`, `Mal ve servet biriktirmek`, `Sadece eğlenip gezmek`, `Yalnızca çalışıp kazanmak`], correctIndex: 0 },
        { question: `Kur'an okumadan önce söylenen söz hangisidir?`, options: [`Eûzü-besmele çekmek`, `Salavat duası okumak`, `Tekbir sözü söylemek`, `Kelime-i tevhid demek`], correctIndex: 0 },
        { question: `"Besmele" hangi sözün kısaltmasıdır?`, options: [`Bismillahirrahmanirrahim`, `Elhamdülillahi rabbilâlemin`, `Sübhanallahi ve bihamdihi`, `Lâ ilâhe illallah`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Kur'an'ın özelliklerinden biridir?`, options: [`Son ilahi kitap olması`, `Sadece Araplara hitap etmesi`, `Bir kez okunup bırakılması`, `Sadece geçmişi anlatması`], correctIndex: 0 },
      ],
    },
  ],
};
