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
        { question: `Tevekkülün doğru anlaşılması aşağıdakilerden hangisidir?`, options: [`Hiç çalışmadan beklemek`, `Çalışıp sonucu Allah'a bırakmak`, `Sorumluluğu reddetmek`, `Kaderi inkâr etmek`], correctIndex: 1 },
        { question: `İnsanın yaptıklarından sorumlu tutulmasının temel sebebi nedir?`, options: [`Seçme özgürlüğünün (iradesinin) olması`, `Zengin olması`, `Çevresi`, `Şansı`], correctIndex: 0 },
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
        { question: `Zekât kimlere farzdır?`, options: [`Her Müslümana`, `Belirli zenginliğe (nisaba) ulaşan Müslümana`, `Sadece erkeklere`, `Çocuklara`], correctIndex: 1 },
        { question: `Zekâtın temel oranı nedir?`, options: [`Kırkta bir (1/40)`, `Yarısı`, `Dörtte biri`, `Tamamı`], correctIndex: 0 },
        { question: `Karşılık beklemeden yapılan gönüllü yardıma ne denir?`, options: [`Zekât`, `Sadaka`, `Hac`, `Nisap`], correctIndex: 1 },
        { question: `Hac ibadeti nerede yapılır?`, options: [`Medine`, `Mekke (Kâbe)`, `Kudüs`, `İstanbul`], correctIndex: 1 },
        { question: `Hac, imkânı olan Müslümana ne sıklıkla farzdır?`, options: [`Her yıl`, `Ömürde bir kez`, `Ayda bir`, `Haftada bir`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi hac ibadetinin bir uygulamasıdır?`, options: [`Tavaf`, `Teravih`, `Sahur`, `Nisap`], correctIndex: 0 },
        { question: `Kurban ibadetinin temel amacı nedir?`, options: [`Allah'a yakınlaşmak ve paylaşmak`, `Zenginlik göstermek`, `Ticaret yapmak`, `Eğlenmek`], correctIndex: 0 },
        { question: `Zekât, sadaka ve hac gibi ibadetlerin ortak toplumsal faydası nedir?`, options: [`Yardımlaşma ve paylaşmayı artırmak`, `Rekabeti artırmak`, `Bireyselliği güçlendirmek`, `Gösteriş yapmak`], correctIndex: 0 },
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
        { question: `Aklı korumak amacıyla aşağıdakilerden hangisi yasaklanmıştır?`, options: [`İçki ve uyuşturucu`, `Spor`, `Okumak`, `Çalışmak`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi dinin korumayı amaçladığı temel değerlerden DEĞİLDİR?`, options: [`Can`, `Akıl`, `Mal`, `Haksız kazanç`], correctIndex: 3 },
        { question: `İslam dininde temizlik nasıl ele alınır?`, options: [`Sadece beden temizliği`, `Hem maddi hem manevi`, `Önemsizdir`, `Sadece çevre`], correctIndex: 1 },
        { question: `Aşağıdakilerden hangisi bir ahlaki değerdir?`, options: [`Dürüstlük`, `Bencillik`, `Yalan`, `Kıskançlık`], correctIndex: 0 },
        { question: `Dinin toplumsal faydalarından biri nedir?`, options: [`Dayanışma ve huzur`, `Çatışma`, `Bencillik`, `Kuralsızlık`], correctIndex: 0 },
        { question: `Manevi temizliğe örnek aşağıdakilerden hangisidir?`, options: [`Kötü huylardan arınmak`, `El yıkamak`, `Çevreyi süpürmek`, `Diş fırçalamak`], correctIndex: 0 },
        { question: `Malın korunması amacıyla aşağıdakilerden hangisi yasaklanmıştır?`, options: [`Hırsızlık ve haksız kazanç`, `Ticaret`, `Çalışmak`, `Tasarruf`], correctIndex: 0 },
        { question: `Din bireye öncelikle ne kazandırır?`, options: [`Ahlaki değerler`, `Zenginlik`, `Şöhret`, `Güç`], correctIndex: 0 },
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
        { question: `Hz. Muhammed'e peygamberlikten önce verilen "güvenilir" anlamındaki unvan nedir?`, options: [`Muhammedü'l-Emin`, `El-Fatih`, `Es-Sıddık`, `El-Faruk`], correctIndex: 0 },
        { question: `Karar alırken çevreyle danışmaya ne denir?`, options: [`İstişare`, `Tevekkül`, `İnfak`, `Tavaf`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Hz. Muhammed'in ahlaki özelliklerinden biridir?`, options: [`Merhamet`, `Kibir`, `Hırs`, `Bencillik`], correctIndex: 0 },
        { question: `Hz. Muhammed zorluklar karşısında nasıl davranırdı?`, options: [`Sabırla`, `Öfkeyle`, `Kaçarak`, `Umursamazca`], correctIndex: 0 },
        { question: `Peygamberimizin insanlara davranışı nasıldı?`, options: [`Adaletli ve eşit`, `Ayrımcı`, `Kaba`, `İlgisiz`], correctIndex: 0 },
        { question: `"Muhammedü'l-Emin" ne anlama gelir?`, options: [`Güvenilir`, `Zengin`, `Güçlü`, `Cesur`], correctIndex: 0 },
        { question: `Hz. Muhammed kendisine kötülük edenlere çoğunlukla nasıl davranmıştır?`, options: [`Affederek`, `İntikam alarak`, `Görmezden gelerek`, `Cezalandırarak`], correctIndex: 0 },
        { question: `Hz. Muhammed'i örnek almamızın temel sebebi nedir?`, options: [`En güzel ahlakı yaşaması`, `Zengin olması`, `Güçlü olması`, `Ünlü olması`], correctIndex: 0 },
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
              { kind: "ornek", content: `Diğer ilahi kitaplar (sırasıyla): Hz. Davud → Zebur, Hz. Musa → Tevrat, Hz. İsa → İncil, Hz. Muhammed → Kur'an.` },
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
        { question: `Kur'an kaç sureden oluşur?`, options: [`114`, `99`, `40`, `60`], correctIndex: 0 },
        { question: `Kur'an'ın ilk suresi hangisidir?`, options: [`Fatiha`, `Bakara`, `Alak`, `İhlas`], correctIndex: 0 },
        { question: `Kur'an hangi dilde indirilmiştir?`, options: [`Arapça`, `Türkçe`, `Farsça`, `İbranice`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi Kur'an'ın temel konularından biri DEĞİLDİR?`, options: [`İnanç`, `İbadet`, `Ahlak`, `Spor kuralları`], correctIndex: 3 },
        { question: `Kur'an'ın en önemli özelliklerinden biri nedir?`, options: [`Değiştirilmeden korunmuş olması`, `Sürekli değişmesi`, `Tek sayfa olması`, `Yalnız bir kez okunması`], correctIndex: 0 },
      ],
    },
  ],
};
