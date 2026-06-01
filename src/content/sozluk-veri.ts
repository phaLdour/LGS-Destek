/**
 * LGS düzeyi Türkçe sözlük: çok anlamlı kelimeler, gerçek/mecaz ayrımı ve
 * her anlam için örnek cümle. Alfabetik sıralı; sayfa başına 10 kelime.
 *
 * Kaynak: TDK Güncel Türkçe Sözlük tabanlı; tanımlar ve örnekler LGS
 * seviyesine sadeleştirildi.
 *
 * Anlam türü:
 *  - "gerçek": kelimenin temel/asıl anlamı
 *  - "mecaz": gerçek anlamından ödünç alınmış, benzetme yoluyla oluşmuş anlam
 *  - "terim":  belirli bir alanın özel anlamı (matematik, tıp, dil bilgisi vb.)
 */

export type AnlamTuru = "gerçek" | "mecaz" | "terim";

export type Anlam = {
  tur: AnlamTuru;
  tanim: string;
  ornek: string;
};

export type Kelime = {
  kelime: string;
  tur?: string; // isim, sıfat, fiil, zarf vb.
  anlamlar: Anlam[];
};

export const SOZLUK: Kelime[] = [
  {
    kelime: "acı",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bazı maddelerin dilde bıraktığı yakıcı duyu; tatlı karşıtı.", ornek: "Çocuk acı biberi ısırınca ağlamaya başladı." },
      { tur: "mecaz", tanim: "Tasa, üzüntü, dert.", ornek: "Babasının ölümünün acısını uzun süre unutamadı." },
      { tur: "mecaz", tanim: "Keskin ve rahatsız edici (ses, soğuk).", ornek: "Sokakta acı bir fren sesi duyuldu." },
    ],
  },
  {
    kelime: "açık",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kapalı olmayan, görünür durumda olan.", ornek: "Kapı açık kalmış, içeriye soğuk giriyor." },
      { tur: "gerçek", tanim: "Engelsiz, serbest (yol, alan).", ornek: "Tüneldeki bakım bitti, yol açıldı." },
      { tur: "mecaz", tanim: "Anlaşılır, kolay kavranır.", ornek: "Öğretmenin açıklamaları açık ve anlaşılırdı." },
      { tur: "mecaz", tanim: "Gizli olmayan, dürüst.", ornek: "Bana her şeyi açık açık söyleyebilirsin." },
    ],
  },
  {
    kelime: "ad",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir varlığı diğerlerinden ayırt etmeye yarayan sözcük; isim.", ornek: "Yeni doğan kızının adını Defne koydular." },
      { tur: "mecaz", tanim: "Ün, şöhret, tanınmışlık.", ornek: "Bu işin altından kalkarsan adın duyulur." },
      { tur: "terim", tanim: "Dil bilgisinde varlıkları karşılayan sözcük türü.", ornek: "\"Kitap\" bir addır." },
    ],
  },
  {
    kelime: "ağır",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Tartıda çok kütle çeken, hafif olmayan.", ornek: "Bavul o kadar ağırdı ki tek başıma kaldıramadım." },
      { tur: "mecaz", tanim: "Önemi, sorumluluğu büyük olan.", ornek: "Bu kararın altına imza atmak ağır bir sorumluluktur." },
      { tur: "mecaz", tanim: "Sindirimi güç (yemek).", ornek: "Akşam yediğim yağlı yemek midemi ağırlaştırdı." },
      { tur: "mecaz", tanim: "Yavaş, telaşsız.", ornek: "Trafikte arabalar ağır ağır ilerliyordu." },
    ],
  },
  {
    kelime: "ahlak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir toplumda iyilik-kötülük, doğru-yanlış ölçütlerine göre uygulanan davranış kuralları.", ornek: "İyi bir ahlaka sahip olmak insan için en değerli kazanımdır." },
    ],
  },
  {
    kelime: "akıl",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Düşünme, anlama, karar verme yetisi.", ornek: "İnsan ile hayvanı ayıran en önemli özellik akıldır." },
      { tur: "mecaz", tanim: "Öğüt, görüş; çare.", ornek: "Sıkıştığım her zaman dedeme akıl danışırım." },
      { tur: "mecaz", tanim: "Hafıza, hatıra.", ornek: "Adı bir türlü aklıma gelmiyor." },
    ],
  },
  {
    kelime: "akmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvı bir maddenin bir yerden başka bir yere doğru hareket etmesi.", ornek: "Yağmurdan sonra sokakta sular akıyordu." },
      { tur: "mecaz", tanim: "Zaman geçmek, ilerlemek.", ornek: "Saatler nasıl akıp gitti, fark etmedik." },
      { tur: "mecaz", tanim: "İnsanlar veya araçlar belirli bir yöne sürekli gitmek.", ornek: "Maç bitince taraftarlar stadyumdan dışarı akıyordu." },
    ],
  },
  {
    kelime: "alan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Düz, geniş yer; meydan.", ornek: "Okulun arkasındaki alanda futbol oynadık." },
      { tur: "terim", tanim: "Geometride bir yüzeyin kapladığı yer; metrekare cinsinden ölçülür.", ornek: "Bir karenin alanı bir kenarının karesidir." },
      { tur: "mecaz", tanim: "Bir kişinin uzman olduğu konu veya iş kolu.", ornek: "Onun alanı dil bilgisidir." },
    ],
  },
  {
    kelime: "alev",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yanan bir maddeden çıkan parlak, sıcak gaz.", ornek: "Sobadaki odunların alevi yüzünü ısıttı." },
      { tur: "mecaz", tanim: "Çok yoğun, sıcak duygu (öfke, sevgi).", ornek: "Bu haberi duyunca içine bir alev düştü." },
    ],
  },
  {
    kelime: "almak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi eline geçirmek, tutmak.", ornek: "Masadan kitabı alıp çantasına koydu." },
      { tur: "gerçek", tanim: "Satın almak.", ornek: "Bakkaldan ekmek aldı." },
      { tur: "mecaz", tanim: "Bir duyguyu hissetmek, kavramak.", ornek: "Söylediklerinden kötü bir koku aldım." },
      { tur: "mecaz", tanim: "İçine çekmek (nefes, hava).", ornek: "Derin bir nefes alıp dışarı verdi." },
    ],
  },
  {
    kelime: "altın",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Sarı renkli, değerli bir maden; süs ve para olarak kullanılır.", ornek: "Düğünde geline altın takıldı." },
      { tur: "mecaz", tanim: "Çok değerli, paha biçilemeyen.", ornek: "Annemin sözleri benim için altın değerindeydi." },
    ],
  },
  {
    kelime: "ana",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çocuğu olmuş kadın; anne.", ornek: "Anam bana her sabah kahvaltı hazırlardı." },
      { tur: "mecaz", tanim: "En önemli, temel, esas olan.", ornek: "Konunun ana fikrini kavramak gerekir." },
      { tur: "mecaz", tanim: "Bir şeyin başlangıcı veya kaynağı olan.", ornek: "Sağlıklı yaşamın ana kuralı düzenli beslenmedir." },
    ],
  },
  {
    kelime: "anlam",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sözcüğün, ifadenin taşıdığı kavram; mana.", ornek: "Bu cümlenin anlamı bana çok karmaşık geldi." },
      { tur: "mecaz", tanim: "Önem, değer.", ornek: "Hayatımız onun ziyaretiyle yeniden anlam kazandı." },
    ],
  },
  {
    kelime: "anlatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir konuyu söz veya yazıyla başkasına aktarmak.", ornek: "Dedem bize savaşı çok ayrıntılı anlattı." },
      { tur: "mecaz", tanim: "Açıklamak, sebebini belirtmek.", ornek: "Bu sözle ne anlatmak istediğini anlamadım." },
    ],
  },
  {
    kelime: "arka",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin ön yüzünün karşıt tarafı.", ornek: "Defterin arkasına notlarımı yazdım." },
      { tur: "mecaz", tanim: "Destekçi, yardım eden kimse (deyim: arkası olmak).", ornek: "İşte arkası olduğu için kolayca yükseliyor." },
    ],
  },
  {
    kelime: "asker",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir devletin silahlı kuvvetlerinde görev yapan kişi.", ornek: "Asker, vatanı korumakla görevlidir." },
      { tur: "mecaz", tanim: "Disiplinli, sözünü tutan kimse.", ornek: "Asker gibi çocuktur, ne dersem yapar." },
    ],
  },
  {
    kelime: "ateş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir maddenin yanması sonucu çıkan ışık ve ısı.", ornek: "Soğukta kamp ateşinin etrafına oturduk." },
      { tur: "gerçek", tanim: "Vücut sıcaklığının normalin üstüne çıkması.", ornek: "Çocuğun ateşi 38 dereceye çıktı." },
      { tur: "mecaz", tanim: "Şiddetli istek, tutku veya öfke.", ornek: "Yarışı kazanma ateşi onu durdurmadı." },
    ],
  },
  {
    kelime: "atmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bir yere doğru fırlatmak.", ornek: "Topu sepete attı." },
      { tur: "mecaz", tanim: "Birinden uzaklaştırmak, çıkarmak.", ornek: "Eski telefonunu çekmeceden atmadı." },
      { tur: "mecaz", tanim: "Doğru olmayan, abartılı söz söylemek.", ornek: "İnanma, atıyor olabilir." },
    ],
  },
  {
    kelime: "av",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yenmek veya kullanılmak amacıyla yakalanan yabani hayvan.", ornek: "Avcılar ormanda bir tavşan avladı." },
      { tur: "mecaz", tanim: "Kandırılan, tuzağa düşürülen kimse (deyim: av olmak).", ornek: "Saf adam dolandırıcıların avı oldu." },
    ],
  },
  {
    kelime: "ayak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bacağın bilekten aşağıdaki bölümü; üzerinde yürünür.", ornek: "Yeni ayakkabılar ayağımı vurdu." },
      { tur: "gerçek", tanim: "Mobilyalarda yere değen destek bölümü.", ornek: "Sandalyenin ayağı kırıldı." },
      { tur: "mecaz", tanim: "Bir işin aşaması (deyim: ayak basmak).", ornek: "Liseye yeni ayak bastı." },
    ],
  },
  {
    kelime: "aydın",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Işıklı, parlak, aydınlatılmış.", ornek: "Aydın bir odada ders çalışmak gözleri yormaz." },
      { tur: "mecaz", tanim: "Bilgili, okumuş, kültürlü kişi.", ornek: "Bir toplumun gelişmesinde aydınların rolü büyüktür." },
      { tur: "mecaz", tanim: "Açık, anlaşılır.", ornek: "Olay henüz aydınlığa kavuşmadı." },
    ],
  },
  {
    kelime: "ayna",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Cisimlerin görüntüsünü yansıtan parlak yüzeyli nesne.", ornek: "Aynaya bakıp saçlarını taradı." },
      { tur: "mecaz", tanim: "Bir şeyi yansıtan, gösteren olgu.", ornek: "Davranışlar insanın kişiliğinin aynasıdır." },
    ],
  },
  {
    kelime: "baba",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çocuğu olmuş erkek; ata.", ornek: "Babam akşam eve geç gelir." },
      { tur: "mecaz", tanim: "Saygı ile anılan, deneyimli, yaşlı erkek.", ornek: "Bu işin babası odur, sorabilirsin." },
      { tur: "mecaz", tanim: "Bir şeyin ortaya çıkmasına öncülük eden kişi.", ornek: "Modern Türkiye'nin babası Atatürk'tür." },
    ],
  },
  {
    kelime: "bahar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yılın ılıman ve çiçekli mevsimi (Mart-Mayıs).", ornek: "Baharda ağaçlar yeniden çiçek açtı." },
      { tur: "mecaz", tanim: "Bir şeyin en güzel, en parlak dönemi.", ornek: "Gençlik insan hayatının baharıdır." },
    ],
  },
  {
    kelime: "bahçe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sebze, meyve, çiçek yetiştirilen veya gezilen, ev önündeki düz alan.", ornek: "Bahçedeki domatesleri topladık." },
    ],
  },
  {
    kelime: "başarı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İstenilen bir sonuca ulaşma, bir işi yapabilme durumu.", ornek: "Sınavda büyük bir başarı elde etti." },
    ],
  },
  {
    kelime: "başlangıç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin ilk anı veya yeri; başladığı nokta.", ornek: "Yolun başlangıcında büyük bir tabela vardı." },
    ],
  },
  {
    kelime: "baş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsan ve hayvanlarda gövdenin üst bölümü.", ornek: "Çocuk başını yastığa koyup uyudu." },
      { tur: "mecaz", tanim: "Bir topluluğu yöneten kişi.", ornek: "Köyün başı, herkesi meydanda topladı." },
      { tur: "mecaz", tanim: "Bir şeyin başlangıç bölümü.", ornek: "Cümlenin başına büyük harf yazılır." },
      { tur: "mecaz", tanim: "Sayma birimi (hayvanlarda).", ornek: "Çiftlikte yirmi baş büyükbaş hayvan vardı." },
    ],
  },
  {
    kelime: "bağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi tutturmaya yarayan ip, kuşak, halka.", ornek: "Ayakkabısının bağı çözülmüştü." },
      { tur: "gerçek", tanim: "Üzüm yetiştirilen tarla.", ornek: "Dedem köydeki bağdan üzüm topladı." },
      { tur: "mecaz", tanim: "İnsanlar veya olaylar arasındaki ilişki.", ornek: "İki arkadaş arasında güçlü bir bağ vardı." },
    ],
  },
  {
    kelime: "beden",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsanın veya hayvanın vücudu.", ornek: "Spor yapmak bedeni güçlendirir." },
      { tur: "terim", tanim: "Giysi numarası, ölçü.", ornek: "Bu gömleğin beni small bedendir." },
    ],
  },
  {
    kelime: "belge",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bilgiyi, hakkı veya olayı kanıtlayan yazılı kayıt.", ornek: "Kayıt için kimlik belgeni getirmen gerekiyor." },
    ],
  },
  {
    kelime: "beyaz",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kar rengi; ışığın bütün renklerini yansıtan en açık ton.", ornek: "Damatın beyaz gömleği parlıyordu." },
      { tur: "mecaz", tanim: "Temiz, suçsuz (deyim: yüzü beyaz olmak).", ornek: "Sözünü tutarak yüzünü beyaz tuttu." },
    ],
  },
  {
    kelime: "bilim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Evrenin veya olayların bir bölümünü konu olarak seçen, deney ve gözleme dayanan bilgi düzeni.", ornek: "Bilim insanları aşı geliştirmek için yıllarca çalıştı." },
      { tur: "mecaz", tanim: "Düzenli, sistemli bilgi.", ornek: "Mutfak işi de zamanla bir bilim hâlini alır." },
    ],
  },
  {
    kelime: "bin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Dokuz yüz doksan dokuzdan sonra gelen sayı; 1000.", ornek: "Bu kitabın bin sayfası var." },
      { tur: "mecaz", tanim: "Pek çok (sayıyı abartılı kullanarak).", ornek: "Sana bin kez söyledim, dinlemiyorsun." },
    ],
  },
  {
    kelime: "bulmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Aranan, kaybolmuş veya gizli bir şeye ulaşmak.", ornek: "Kaybolan anahtarı çantamın içinde buldum." },
      { tur: "mecaz", tanim: "Düşünerek bir sonuca varmak.", ornek: "Soruyu uzun uğraştan sonra buldu." },
      { tur: "mecaz", tanim: "Bir niteliği vermek (deyim: doğru bulmak).", ornek: "Söylediğini doğru buldum." },
    ],
  },
  {
    kelime: "bulut",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Atmosferdeki su damlacıklarının veya buz parçacıklarının oluşturduğu kütle.", ornek: "Bulutlar güneşi kapadı, yağmur geliyor." },
      { tur: "mecaz", tanim: "Üzüntü, sıkıntı (deyim: yüzü bulutlu).", ornek: "Sınav sonucunu görünce yüzü bulutlandı." },
    ],
  },
  {
    kelime: "burun",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüzte solunum ve koklamaya yarayan organ.", ornek: "Soğuk havada burnumun ucu kızardı." },
      { tur: "gerçek", tanim: "Bir cismin ileri doğru çıkıntılı ucu.", ornek: "Geminin burnu kayalara çarptı." },
      { tur: "terim", tanim: "Coğrafyada denize doğru uzanan kara parçası.", ornek: "Türkiye'nin en kuzey noktası İnceburun'dur." },
      { tur: "mecaz", tanim: "Kibirli olmak, kibirlilik (deyimlerde).", ornek: "Para kazandıktan sonra burnu havalarda dolaşıyor." },
    ],
  },
  {
    kelime: "büyük",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyutları, hacmi sıradan olandan fazla olan.", ornek: "Büyük bir kavun aldık, hepimize yetti." },
      { tur: "mecaz", tanim: "Önemli, değerli.", ornek: "Atatürk, Türk milleti için büyük bir liderdir." },
      { tur: "mecaz", tanim: "Yaşça ileri olan.", ornek: "Büyüklerinin sözünü dinleyen çocuk pişman olmaz." },
    ],
  },
  {
    kelime: "bütün",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Parçalanmamış, eksiksiz; tam.", ornek: "Bardağı bütün hâlde bana uzattı." },
      { tur: "mecaz", tanim: "Hepsi, tamamı.", ornek: "Bütün öğrenciler bahçeye toplandı." },
    ],
  },
  {
    kelime: "cam",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Saydam, kırılgan, sertleşmiş bir madde.", ornek: "Bardak yere düşünce cam paramparça oldu." },
      { tur: "gerçek", tanim: "Pencere camı.", ornek: "Yağmur damlaları camlara vuruyordu." },
      { tur: "mecaz", tanim: "Çok kırılgan, hassas (insan veya kalp için).", ornek: "Onun kalbi cam gibidir, dikkat etmek gerekir." },
    ],
  },
  {
    kelime: "can",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsan ve hayvanı yaşatan güç; ruh.", ornek: "Doktorlar onun canını kurtardı." },
      { tur: "mecaz", tanim: "Sevilen, değer verilen kimse.", ornek: "Annesi onun en yakın canıdır." },
      { tur: "mecaz", tanim: "İstek, arzu (canı … istemek).", ornek: "Canım dondurma yemek istedi." },
    ],
  },
  {
    kelime: "cesaret",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Zor veya tehlikeli bir durumda korkmadan davranabilme; yüreklilik.", ornek: "Doğruyu söylemek için cesaret gerekir." },
    ],
  },
  {
    kelime: "çabuk",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Hızlı; zaman almadan, acele.", ornek: "Çabuk ol, otobüs gelmek üzere." },
      { tur: "mecaz", tanim: "Kolayca etkilenebilen (huy).", ornek: "Çok çabuk kızan bir çocuktur." },
    ],
  },
  {
    kelime: "çağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Tarihte belirli özelliklerle ayrılan zaman dilimi.", ornek: "Orta Çağ, savaşlarla dolu bir dönemdir." },
      { tur: "mecaz", tanim: "Bir insanın yaşam dönemi.", ornek: "Henüz oyun çağında bir çocuk." },
    ],
  },
  {
    kelime: "çare",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sıkıntıdan kurtulma yolu; çözüm.", ornek: "Bu hastalığa kesin bir çare bulundu." },
    ],
  },
  {
    kelime: "çekmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi kendine doğru hareket ettirmek.", ornek: "Halatı bütün gücüyle kendine doğru çekti." },
      { tur: "mecaz", tanim: "İlgi uyandırmak, kendine yöneltmek.", ornek: "Vitrindeki kırmızı elbise herkesin dikkatini çekti." },
      { tur: "mecaz", tanim: "Bir sıkıntı veya acıya katlanmak.", ornek: "Bu yaşına kadar çok çile çekti." },
      { tur: "gerçek", tanim: "Fotoğrafını veya filmini almak.", ornek: "Manzaranın fotoğrafını çekmek istiyordu." },
    ],
  },
  {
    kelime: "çevre",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yerin çepeçevre etrafı, etrafındaki alan.", ornek: "Evin çevresinde uzun ağaçlar vardı." },
      { tur: "gerçek", tanim: "Canlıların yaşadığı doğal ortam.", ornek: "Çevreyi korumak insanlığın görevidir." },
      { tur: "mecaz", tanim: "Bir kişinin tanıdığı, görüştüğü kimseler.", ornek: "Genç adamın çevresi çok geniştir." },
    ],
  },
  {
    kelime: "çiçek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bitkilerin renkli ve genellikle kokulu, üreme görevi olan kısmı.", ornek: "Anneme bir buket çiçek aldım." },
      { tur: "mecaz", tanim: "Çok güzel, sevimli kişi (özellikle çocuk).", ornek: "Komşunun küçük kızı tam bir çiçek." },
    ],
  },
  {
    kelime: "çizgi",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İki nokta arasındaki ince uzantı; satır.", ornek: "Defterin sayfasındaki çizgiler düzenli yazmayı kolaylaştırır." },
      { tur: "mecaz", tanim: "Belirli bir sınır, ölçü.", ornek: "Konuşurken belirli bir çizgiyi aşmamak gerekir." },
    ],
  },
  {
    kelime: "çocuk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Henüz büyümemiş insan; küçük yaştaki kişi.", ornek: "Parkta birçok çocuk oyun oynuyordu." },
      { tur: "mecaz", tanim: "Davranışları saf ve toy olan kişi.", ornek: "Bu yaşına gelmiş, hâlâ çocuk gibi davranıyor." },
    ],
  },
  {
    kelime: "dağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çevresine göre yüksek, geniş ve sarp kara kütlesi.", ornek: "Karşıdaki dağın tepesinde kar vardı." },
      { tur: "mecaz", tanim: "Çok büyük, yığınlaşmış (mecaz: dağ gibi).", ornek: "Önümde dağ gibi ödevler birikti." },
    ],
  },
  {
    kelime: "dakika",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Saatin altmışta biri; 60 saniyelik zaman dilimi.", ornek: "Otobüs beş dakikaya kalkıyor." },
      { tur: "mecaz", tanim: "Çok kısa bir süre, an.", ornek: "Bir dakika bekle, hemen geliyorum." },
    ],
  },
  {
    kelime: "deniz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yer yuvarlağı üzerindeki tuzlu su kütlelerinin her biri.", ornek: "Yaz tatilinde her gün denize girdik." },
      { tur: "mecaz", tanim: "Geniş alan kaplayan herhangi bir şey.", ornek: "Stadyumda taraftar denizi vardı." },
    ],
  },
  {
    kelime: "derin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüzeyden tabanına kadar uzaklığı fazla olan.", ornek: "Bu göl çok derindir, dikkat etmelisin." },
      { tur: "mecaz", tanim: "Etkili, yoğun (uyku, üzüntü, anlam).", ornek: "Onu kaybetmek herkeste derin bir üzüntü bıraktı." },
      { tur: "mecaz", tanim: "Anlamlı, kapsamlı (düşünce, bakış).", ornek: "Yazarın derin bir bakış açısı vardır." },
    ],
  },
  {
    kelime: "ders",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Okulda belirli bir konunun öğretildiği zaman dilimi.", ornek: "Bugün ilk ders matematikti." },
      { tur: "mecaz", tanim: "Olaylardan çıkarılan öğüt, alınması gereken pay.", ornek: "Yaşananlardan herkes kendine bir ders çıkarmalı." },
      { tur: "mecaz", tanim: "Birinin hatalı davranışına karşı verilen sert tepki.", ornek: "Bu hata ona iyi bir ders olacak." },
    ],
  },
  {
    kelime: "dert",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzüntü veren durum, sıkıntı, kaygı.", ornek: "İnsanın derdini paylaşacak bir dostu olmalı." },
      { tur: "mecaz", tanim: "Sağlık sorunu, hastalık.", ornek: "Bel ağrısı uzun süredir benim derdim." },
    ],
  },
  {
    kelime: "destek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi tutan, yıkılmasını önleyen dayanak.", ornek: "Direk çatıya destek olmalı." },
      { tur: "mecaz", tanim: "Yardım, sahip çıkma.", ornek: "Ailesi her zaman ona destek oldu." },
    ],
  },
  {
    kelime: "devlet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Belirli bir toprakta yaşayan halkın oluşturduğu siyasi örgüt.", ornek: "Türkiye Cumhuriyeti laik bir devlettir." },
      { tur: "mecaz", tanim: "Bolluk, refah; büyük servet (eski).", ornek: "Eski devirlerde devlet kuşu derlerdi." },
    ],
  },
  {
    kelime: "dikkat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şey üzerinde duyguları ve düşünceleri yoğunlaştırma; özen.", ornek: "Sınavda her soruyu dikkatle okumalıyız." },
    ],
  },
  {
    kelime: "dil",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağız boşluğundaki tat alma ve konuşma organı.", ornek: "Sıcak çorbayı içerken dilim yandı." },
      { tur: "gerçek", tanim: "Bir milletin konuştuğu söz sistemi.", ornek: "Türkçe, dünyada konuşulan zengin dillerden biridir." },
      { tur: "mecaz", tanim: "Konuşma biçimi, üslup.", ornek: "Yazarın dili çok akıcı ve etkileyiciydi." },
      { tur: "terim", tanim: "Coğrafyada denize doğru uzanmış ince kara parçası.", ornek: "Karaburun gibi uzun bir dil deniz içine sokulur." },
    ],
  },
  {
    kelime: "doğa",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Canlı ve cansız varlıkların hepsini içine alan ortam; tabiat.", ornek: "Doğa yürüyüşü hem dinlendirici hem öğreticidir." },
      { tur: "mecaz", tanim: "Bir kişinin huyu, mizacı.", ornek: "Yardımseverlik onun doğasında var." },
    ],
  },
  {
    kelime: "doğru",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yöne, sağa veya sola sapmadan giden.", ornek: "Tabelayı görmek için doğru yürümeye devam et." },
      { tur: "mecaz", tanim: "Gerçeğe ve kurala uygun olan.", ornek: "Sınavda en az 30 doğru yapmaya çalıştı." },
      { tur: "mecaz", tanim: "Yalan söylemeyen, dürüst (kişi).", ornek: "Doğru sözlü insanlara herkes güven duyar." },
    ],
  },
  {
    kelime: "dolu",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Boş olmayan, içi kaplı olan.", ornek: "Bardak su ile ağzına kadar doluydu." },
      { tur: "gerçek", tanim: "Bulutlardan düşen donmuş yağmur taneleri.", ornek: "Şiddetli dolu yağışı sebzelere zarar verdi." },
      { tur: "mecaz", tanim: "Çok hareketli veya yoğun (gün, program).", ornek: "Bugünüm çok dolu, görüşemeyiz." },
    ],
  },
  {
    kelime: "dudak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağzın etli, dış kenarını oluşturan iki kıvrım.", ornek: "Soğuktan dudakları çatlamıştı." },
    ],
  },
  {
    kelime: "duvar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yapıyı çevirip ayıran, taş, tuğla veya betondan yapılmış dik bölme.", ornek: "Odamın duvarına bir tablo astım." },
      { tur: "mecaz", tanim: "Aşılmaz engel.", ornek: "İki ülke arasında siyasi bir duvar var." },
    ],
  },
  {
    kelime: "duygu",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir olay veya durumun insanda uyandırdığı izlenim; his.", ornek: "Sevgi, en güzel insani duygulardandır." },
    ],
  },
  {
    kelime: "düşmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yerden aşağıya yönelmek, yere inmek.", ornek: "Elindeki tabak yere düşüp kırıldı." },
      { tur: "mecaz", tanim: "Değer veya konumca aşağı inmek.", ornek: "Şirketin hisseleri haftada %5 düştü." },
      { tur: "mecaz", tanim: "Bir duruma uğramak (akla düşmek, gözden düşmek).", ornek: "Aklıma ablamı aramak düştü." },
    ],
  },
  {
    kelime: "düz",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Engebesiz, eğri olmayan, pürüzsüz.", ornek: "Düz bir yolda yürümek dağ yolundan kolaydır." },
      { tur: "mecaz", tanim: "Süslü olmayan, sade.", ornek: "Düğüne düz bir elbiseyle gitti." },
      { tur: "mecaz", tanim: "Karmaşık olmayan, açık (anlam, ifade).", ornek: "Yazısı çok düz ve anlaşılırdı." },
    ],
  },
  {
    kelime: "eğitim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimseye yeni bilgi ve beceriler kazandırma süreci.", ornek: "İyi bir eğitim insanın ufkunu açar." },
    ],
  },
  {
    kelime: "eğri",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Doğru olmayan, yana yatık.", ornek: "Tablo duvarda eğri asılı duruyordu." },
      { tur: "mecaz", tanim: "Yanlış, kurallara uymayan.", ornek: "Eğri işlere bulaşma, sonu kötü olur." },
    ],
  },
  {
    kelime: "ekonomi",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir toplumun üretim, tüketim ve gelir dengesine ilişkin etkinliklerinin bütünü.", ornek: "Ülkenin ekonomisi son yıllarda gelişiyor." },
      { tur: "mecaz", tanim: "Tutum, tasarruf, idare.", ornek: "Suyu boşa harcamamak en güzel ekonomidir." },
    ],
  },
  {
    kelime: "ekran",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzerinde görüntü oluşan; televizyon, telefon, bilgisayar yüzeyi.", ornek: "Telefonun ekranı çatladı." },
    ],
  },
  {
    kelime: "el",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kolun bilekten parmak uçlarına kadar olan bölümü.", ornek: "Yıkadıktan sonra ellerini havluyla kuruladı." },
      { tur: "mecaz", tanim: "Yabancı, kişi (deyimlerde 'eller ne der').", ornek: "Eller ne der diye düşünmekten vazgeç." },
      { tur: "mecaz", tanim: "Sahip olma, kontrol etme.", ornek: "İşin sonu artık bizim elimizde." },
      { tur: "gerçek", tanim: "Sıra, kez (kâğıt oyunlarında).", ornek: "Birinci eli biz aldık." },
    ],
  },
  {
    kelime: "emek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapmak için harcanan beden veya kafa gücü.", ornek: "Bu evi yıllarca alın teriyle, emekle yaptık." },
    ],
  },
  {
    kelime: "eser",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin sanat veya bilim yoluyla ortaya koyduğu ürün.", ornek: "Mimar Sinan'ın en ünlü eseri Selimiye Camii'dir." },
      { tur: "mecaz", tanim: "İz, belirti.", ornek: "Yaranın artık hiçbir eseri kalmamış." },
    ],
  },
  {
    kelime: "eski",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzerinden uzun zaman geçmiş, yenilenmemiş.", ornek: "Eski bir ayakkabıyı atmak istemiyordu." },
      { tur: "mecaz", tanim: "Önceki, daha önce var olan.", ornek: "Eski sınıf öğretmeniyle yolda karşılaştı." },
      { tur: "mecaz", tanim: "Deneyimli, kıdemli.", ornek: "Bu işin eski kurtlarındandır." },
    ],
  },
  {
    kelime: "etki",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin veya nesnenin başka bir kimse veya nesne üzerinde bıraktığı iz.", ornek: "Annenin sözleri çocuğun üzerinde derin bir etki bıraktı." },
    ],
  },
  {
    kelime: "ev",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İçinde insanların yaşadığı yapı, mesken.", ornek: "Yeni evimiz bahçeli ve aydınlık." },
      { tur: "mecaz", tanim: "Aile, yuva.", ornek: "Evinin direği olan baba, sorumluluğu üstlenir." },
    ],
  },
  {
    kelime: "fakir",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yoksul, geçim sıkıntısı çeken kimse.", ornek: "Fakir aileye yardım eli uzatmak insani bir görevdir." },
      { tur: "mecaz", tanim: "Bir konuda yetersiz, eksik (zengin karşıtı).", ornek: "Bu romanın betimlemeleri çok fakir kalmış." },
    ],
  },
  {
    kelime: "fark",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir nesnenin başka bir nesneden ayırt edici özelliği.", ornek: "İki elbise arasındaki tek fark renktir." },
      { tur: "terim", tanim: "Matematikte çıkarma işleminin sonucu.", ornek: "12 ile 5'in farkı 7'dir." },
      { tur: "mecaz", tanim: "Üstünlük, ayrı tutulma.", ornek: "Onun derslerinde bir farkı vardır." },
    ],
  },
  {
    kelime: "fayda",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yarar, çıkar, kazanç.", ornek: "Düzenli uykunun sağlığa faydası büyüktür." },
    ],
  },
  {
    kelime: "fikir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Düşünce, görüş, kanaat.", ornek: "Bu konuda senin fikrin nedir?" },
    ],
  },
  {
    kelime: "fırlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Hızla bir yere doğru atılmak veya uçmak.", ornek: "Top duvara çarptı ve yukarıya fırladı." },
      { tur: "mecaz", tanim: "Ani biçimde çok artmak (fiyat, ısı).", ornek: "Son haftada akaryakıt fiyatları fırladı." },
    ],
  },
  {
    kelime: "gayret",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi başarmak için harcanan çaba.", ornek: "Yıl boyu gayretinin sonucunu aldı." },
    ],
  },
  {
    kelime: "gece",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Güneş battıktan sonraki karanlık bölüm.", ornek: "Gece geç saatlere kadar ders çalıştı." },
      { tur: "mecaz", tanim: "Bir kişinin yaşadığı karanlık, zor dönem.", ornek: "Hayatımın o günleri uzun bir geceydi." },
    ],
  },
  {
    kelime: "geçmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yerden başka yere gitmek.", ornek: "Karşı kaldırıma dikkatlice geçti." },
      { tur: "mecaz", tanim: "Zaman aşmak, akıp gitmek.", ornek: "Geçen yıl çok hızlı geçti." },
      { tur: "mecaz", tanim: "Daha üstün olmak, aşmak.", ornek: "Onun başarısı herkesinkini geçti." },
      { tur: "mecaz", tanim: "Sınavı, kursu başarmak.", ornek: "Matematik dersinden geçer not aldı." },
    ],
  },
  {
    kelime: "gemi",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Su yüzeyinde insan veya yük taşımaya yarayan büyük araç.", ornek: "Gemi limana yanaştığında herkes inmeye hazırlandı." },
    ],
  },
  {
    kelime: "geniş",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Eni, alanı büyük olan.", ornek: "Geniş bir caddede yürüyorduk." },
      { tur: "mecaz", tanim: "Hoşgörülü, kapsayıcı (yürek, görüş).", ornek: "Onun geniş bir yüreği vardı." },
      { tur: "mecaz", tanim: "Ayrıntılı, kapsamlı (bilgi, açıklama).", ornek: "Konu hakkında geniş bilgi verdi." },
    ],
  },
  {
    kelime: "gerçek",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Var olan, hayali olmayan; sahici.", ornek: "Anlattıkları gerçek bir olaya dayanıyor." },
      { tur: "mecaz", tanim: "Doğru, hakikat.", ornek: "Sonunda gerçek ortaya çıktı." },
    ],
  },
  {
    kelime: "göl",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çevresi karayla kaplı, durgun su birikintisi.", ornek: "Van Gölü, Türkiye'nin en büyük gölüdür." },
      { tur: "mecaz", tanim: "Geniş bir su veya sıvı birikintisi.", ornek: "Şiddetli yağmurdan sonra cadde göle döndü." },
    ],
  },
  {
    kelime: "gönül",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Duygu ve sevgilerin barındığı, kalp olarak da düşünülen iç dünya.", ornek: "Onun gönlü çok temiz bir insan." },
      { tur: "mecaz", tanim: "İstek, arzu (gönlü olmak).", ornek: "Buraya gelmeye gönlü yoktu." },
    ],
  },
  {
    kelime: "görev",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin yapmakla yükümlü olduğu iş.", ornek: "Vatanı korumak askerin en kutsal görevidir." },
      { tur: "terim", tanim: "Bir organın yaptığı iş (biyoloji).", ornek: "Kalbin görevi kanı vücutta dolaştırmaktır." },
    ],
  },
  {
    kelime: "görmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Göz aracılığıyla algılamak.", ornek: "Uzaktan gemiyi denizde gördü." },
      { tur: "mecaz", tanim: "Anlamak, kavramak.", ornek: "Davranışından ne demek istediğini gördüm." },
      { tur: "mecaz", tanim: "Yaşamak, deneyimlemek.", ornek: "Bu yaşına kadar çok zorluk gördü." },
      { tur: "mecaz", tanim: "Bir hizmeti almak veya yapmak.", ornek: "Tedavisini İstanbul'da gördü." },
    ],
  },
  {
    kelime: "göz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Görmeyi sağlayan organ.", ornek: "Soğuk havada gözlerim sulanır." },
      { tur: "mecaz", tanim: "Bakış, ilgi.", ornek: "Yeni öğretmen herkesin gözünü üzerine çekti." },
      { tur: "gerçek", tanim: "Bir dolap veya çekmecenin bölmesi.", ornek: "Kalemleri masanın üst gözüne koydu." },
      { tur: "gerçek", tanim: "Kaynak, pınar başı.", ornek: "Dağın eteğindeki suyun gözünden su içtik." },
    ],
  },
  {
    kelime: "güçlü",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kuvveti yüksek olan.", ornek: "Güçlü bir vuruşla topu kaleye gönderdi." },
      { tur: "mecaz", tanim: "Etkili, sağlam (inanç, kanıt).", ornek: "İddialarını güçlü kanıtlarla destekledi." },
      { tur: "mecaz", tanim: "Kapsamlı, ileri (ekonomi, ordu).", ornek: "Türkiye, bölgede güçlü bir konumdadır." },
    ],
  },
  {
    kelime: "güzel",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Görünüşü, biçimi hoşa giden.", ornek: "Bahçedeki güller çok güzeldi." },
      { tur: "mecaz", tanim: "İyi, hoş; uygun, beğenilen.", ornek: "Güzel bir haber aldık." },
    ],
  },
  {
    kelime: "haber",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir olay, bilgi veya gelişmeyi anlatan ileti.", ornek: "Sınav sonuçlarının haberi okula geldi." },
      { tur: "mecaz", tanim: "Belirti, iz.", ornek: "Hava sıcakken karın haberi bile yok." },
    ],
  },
  {
    kelime: "hafif",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Tartıda az kütle çeken; ağır olmayan.", ornek: "Bu çanta hafif olduğu için sırtımda hissetmiyorum." },
      { tur: "mecaz", tanim: "Önemsiz, küçük (yara, hata).", ornek: "Kaza sonucu hafif bir sıyrıkla kurtuldu." },
      { tur: "mecaz", tanim: "Sindirimi kolay.", ornek: "Akşamları daha hafif yemek yiyorum." },
    ],
  },
  {
    kelime: "hak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kişiye yasa veya gelenekçe tanınan yetki.", ornek: "Her vatandaşın oy verme hakkı vardır." },
      { tur: "mecaz", tanim: "Adalet, doğruluk.", ornek: "Sonunda hak yerini buldu." },
      { tur: "mecaz", tanim: "Pay, görev olarak verilen şey.", ornek: "Bu işteki hakkı sana ait." },
    ],
  },
  {
    kelime: "hayal",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Zihinde canlandırılan, gerçek olmayan görüntü.", ornek: "Çocukluk hayallerimi unutmadım." },
      { tur: "mecaz", tanim: "Umut, beklenti.", ornek: "Sınavı kazanmak benim en büyük hayalim." },
    ],
  },
  {
    kelime: "hayat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Canlılığın sürdüğü zaman; yaşam.", ornek: "Hayat boyu öğrenmek gerekir." },
      { tur: "mecaz", tanim: "Geçim, yaşam koşulları.", ornek: "Köy hayatı şehir hayatından sakindir." },
    ],
  },
  {
    kelime: "heyecan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sevinç, üzüntü, korku gibi nedenlerle ortaya çıkan ani ve güçlü duygu.", ornek: "Sınav öncesi heyecanını yenmesi gerekiyor." },
    ],
  },
  {
    kelime: "hızlı",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Çabuk, kısa zamanda; yavaş karşıtı.", ornek: "Hızlı tren saatte üç yüz kilometre yapar." },
    ],
  },
  {
    kelime: "iç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin yüzeyinin altı, ortası.", ornek: "Cevizin içi çok lezzetliydi." },
      { tur: "mecaz", tanim: "Yürek, gönül; insanın duygu dünyası.", ornek: "İçim sıkıldı, dışarı çıkmak istiyorum." },
      { tur: "gerçek", tanim: "Bir mekanın kapalı bölümü.", ornek: "Yağmur başlayınca evin içine geçtik." },
    ],
  },
  {
    kelime: "ihtiyar",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşı ilerlemiş kimse; yaşlı.", ornek: "İhtiyar adam pazara kadar yürüdü." },
      { tur: "mecaz", tanim: "Eskimiş, çok yıllanmış.", ornek: "Köyün ihtiyar çınar ağacının altında otururduk." },
    ],
  },
  {
    kelime: "ileri",
    tur: "zarf / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin yüzünün baktığı yöne doğru.", ornek: "İki adım ileri çıktı." },
      { tur: "mecaz", tanim: "Gelişmiş, çağdaş.", ornek: "Bu konuda Türkiye, dünya ölçeğinde ileri bir noktadadır." },
      { tur: "mecaz", tanim: "Sonraki, gelecekteki (zaman).", ornek: "İleride pişman olmayasın." },
    ],
  },
  {
    kelime: "ilgi",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeye veya kimseye duyulan dikkat ve istek.", ornek: "Bilime ilgisi çok küçük yaşta başladı." },
      { tur: "mecaz", tanim: "İki şey arasındaki bağ.", ornek: "Söylediğinin bu konuyla ilgisi yok." },
    ],
  },
  {
    kelime: "ince",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Eni az olan, kalın karşıtı.", ornek: "Bu ip çok ince, kopabilir." },
      { tur: "mecaz", tanim: "Nazik, kibar (kişi, davranış).", ornek: "Çok ince bir insandır, kimseyi kırmaz." },
      { tur: "mecaz", tanim: "Ayrıntılı, dikkat isteyen.", ornek: "Bu iş, ince bir hesap gerektirir." },
    ],
  },
  {
    kelime: "ışık",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Cisimleri görmemizi sağlayan yayılım.", ornek: "Güneş ışığı odayı aydınlattı." },
      { tur: "mecaz", tanim: "Umut, yol gösterici (gelecek için).", ornek: "Eğitim, geleceğin ışığıdır." },
      { tur: "gerçek", tanim: "Lamba, yapay aydınlatma.", ornek: "Odaya gelince ışığı yaktı." },
    ],
  },
  {
    kelime: "iz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir varlığın geçtiği yerde bıraktığı şekil veya işaret.", ornek: "Karda ayak izlerini takip ettik." },
      { tur: "mecaz", tanim: "Bir olayın geride bıraktığı etki, hatıra.", ornek: "Yaşadıkları onda derin izler bıraktı." },
    ],
  },
  {
    kelime: "izlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bakarak takip etmek (film, maç).", ornek: "Akşam tüm aile birlikte filmi izledi." },
      { tur: "gerçek", tanim: "Bir iz veya yol takip etmek.", ornek: "Avcı, ayı izini kar üzerinde izledi." },
      { tur: "mecaz", tanim: "Belirli bir yol veya yöntem benimsemek.", ornek: "Hükümet, ekonomide yeni bir politika izliyor." },
    ],
  },
  {
    kelime: "kabuk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bazı meyve, sebze veya hayvanların dış örtüsü.", ornek: "Cevizin kabuğunu kıracağız." },
      { tur: "mecaz", tanim: "Bir kimsenin dış görünüşü veya sınırlı dünyası (deyim: kabuğuna çekilmek).", ornek: "Üzüntüsünden kabuğuna çekildi." },
    ],
  },
  {
    kelime: "kafa",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Baş, vücudun en üst bölümü.", ornek: "Kafasını yastığa koyup uyudu." },
      { tur: "mecaz", tanim: "Akıl, anlayış.", ornek: "Bu işi yapacak kafa bende yok." },
      { tur: "mecaz", tanim: "Görüş, düşünce biçimi.", ornek: "İkimiz de aynı kafadayız." },
    ],
  },
  {
    kelime: "kahraman",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Cesareti ve fedakârlığıyla tanınan kimse; yiğit.", ornek: "Çanakkale, kahraman askerlerimizin kutsal toprağıdır." },
      { tur: "mecaz", tanim: "Bir öykü veya romanın başkişisi.", ornek: "Bu romanın kahramanı bir öğretmen." },
    ],
  },
  {
    kelime: "kalın",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Eni veya çapı fazla olan; ince karşıtı.", ornek: "Kalın bir mantoyla sokağa çıktı." },
      { tur: "mecaz", tanim: "Yoğun, koyu (kafa, kabuk).", ornek: "Kafası kalın çocuk, kuralı bir türlü kavrayamadı." },
      { tur: "mecaz", tanim: "Pes, tok (ses).", ornek: "Babasının kalın bir sesi vardı." },
    ],
  },
  {
    kelime: "kalp",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Göğüs boşluğunda, kanı vücutta dolaştıran kaslı organ; yürek.", ornek: "Doktor kalbini dinledi." },
      { tur: "mecaz", tanim: "Duygu ve sevgilerin barındığı düşünülen iç dünya.", ornek: "Kalbim bu güzel haberle doldu." },
    ],
  },
  {
    kelime: "kanat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kuşların, böceklerin uçmasına yarayan organ.", ornek: "Kuşun kırık kanadını sardı." },
      { tur: "mecaz", tanim: "Koruyuculuk, himaye (deyim: kanat germek).", ornek: "Yetimleri kanadının altına aldı." },
      { tur: "gerçek", tanim: "Kapı veya pencerenin açılır parçası.", ornek: "Dolabın bir kanadı bozuldu." },
    ],
  },
  {
    kelime: "kapı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir mekana giriş ve çıkışa yarayan bölüm.", ornek: "Soğuk havada kapıyı sıkıca kapatın." },
      { tur: "mecaz", tanim: "Fırsat, olanak.", ornek: "Bu sınav onun için yeni bir kapı açacak." },
      { tur: "mecaz", tanim: "İş yeri, devlet dairesi (deyim).", ornek: "Hükümet kapısında çok yıl çalıştı." },
    ],
  },
  {
    kelime: "kara",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Siyah renk, en koyu renk.", ornek: "Kara bulutlar gökyüzünü kapladı." },
      { tur: "gerçek", tanim: "Toprak parçası, deniz karşıtı.", ornek: "Vapur kıyıya yaklaşıp karaya çıktı." },
      { tur: "mecaz", tanim: "Uğursuz, kötü, üzücü.", ornek: "O kara gün hâlâ unutulmadı." },
    ],
  },
  {
    kelime: "kaynak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Suyun çıktığı yer; pınar.", ornek: "Dağın eteğindeki kaynaktan içtikleri su buz gibiydi." },
      { tur: "mecaz", tanim: "Bir şeyin çıkış noktası, doğduğu yer.", ornek: "Türk dilinin kaynakları çok eskidir." },
      { tur: "terim", tanim: "Bilgi alınan eser, doküman.", ornek: "Ödevini hazırlarken üç kitabı kaynak gösterdi." },
    ],
  },
  {
    kelime: "kelime",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Anlamı olan ses veya seslerin birleşmesi; sözcük.", ornek: "Türkçede en çok kullanılan kelimeleri öğrendi." },
    ],
  },
  {
    kelime: "kesmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Keskin bir araçla parçalara ayırmak.", ornek: "Ekmeği bıçakla dilim dilim kesti." },
      { tur: "mecaz", tanim: "Bir sürekliliği sona erdirmek (yardımı, ilişkiyi).", ornek: "İki aile arasındaki bağı kestiler." },
      { tur: "mecaz", tanim: "Aniden durdurmak (sesi, konuşmayı).", ornek: "Yan odadan gelen müziğin sesini kesti." },
    ],
  },
  {
    kelime: "kırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir nesneyi parçalara ayırmak, bütünlüğünü bozmak.", ornek: "Top vurunca pencereyi kırdı." },
      { tur: "mecaz", tanim: "Bir kişiyi üzmek, gücendirmek.", ornek: "Sert sözlerinle onu çok kırdın." },
      { tur: "mecaz", tanim: "Bir engeli aşmak (rekor, korku).", ornek: "Yüzücü, dünya rekorunu kırdı." },
    ],
  },
  {
    kelime: "korumak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir varlığı tehlike veya zarardan uzak tutmak.", ornek: "Çevreyi korumak hepimizin görevidir." },
      { tur: "mecaz", tanim: "Sırrını veya değerini saklı tutmak.", ornek: "Verdiği sözü her zaman korur." },
    ],
  },
  {
    kelime: "kural",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir konuda uyulması gereken ilke, yasa.", ornek: "Trafik kurallarına uymak yaşamı korur." },
    ],
  },
  {
    kelime: "kuyu",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Su, petrol vb. çıkarmak için kazılan derin çukur.", ornek: "Köyde su almak için derin bir kuyu kazıldı." },
      { tur: "mecaz", tanim: "Çıkışı zor durum (deyim: kuyuya düşmek).", ornek: "Bu işe girince kuyuya düştüğünü anladı." },
    ],
  },
  {
    kelime: "küçük",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyutları büyüğüne göre az olan.", ornek: "Bahçedeki küçük köpek herkesi sevindirdi." },
      { tur: "mecaz", tanim: "Önemsiz, basit.", ornek: "Bu, üzerinde durulacak küçük bir mesele." },
      { tur: "mecaz", tanim: "Yaşça genç olan.", ornek: "Küçük kardeşi henüz dört yaşında." },
    ],
  },
  {
    kelime: "lider",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir topluluğu yöneten, ona yön veren kimse; önder.", ornek: "Atatürk, halkın gözünde büyük bir liderdir." },
    ],
  },
  {
    kelime: "liman",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Gemilerin yanaşıp yük indirip bindirdiği, sığınak görevi de gören kıyı yapısı.", ornek: "İzmir Limanı ülkemizin en işlek limanlarındandır." },
      { tur: "mecaz", tanim: "Sığınak, güvenli yer.", ornek: "Onun evi benim her zaman limanım oldu." },
    ],
  },
  {
    kelime: "mavi",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Açık havada gökyüzünün rengi; üç ana renkten biri.", ornek: "Bu sabah gökyüzü çok maviydi." },
      { tur: "mecaz", tanim: "Hüzünlü, durgun ruh hali (mavi düşler).", ornek: "Şarkıdaki mavi melankoli içime işledi." },
    ],
  },
  {
    kelime: "mektup",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimseden başkasına yazılı olarak gönderilen ileti.", ornek: "Askerdeki dayıma mektup yazdım." },
    ],
  },
  {
    kelime: "merdiven",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kattan başka bir kata çıkmaya yarayan basamaklı yapı.", ornek: "Asansör bozuk, merdivenleri yürüdük." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için kullanılan basamak (deyim).", ornek: "Bu işi başarısının merdiveni yaptı." },
    ],
  },
  {
    kelime: "mevsim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yılın belirli iklim özelliklerine sahip dört bölümünden her biri.", ornek: "En sevdiğim mevsim sonbahardır." },
      { tur: "mecaz", tanim: "Bir şeye uygun zaman dilimi.", ornek: "Şimdi karpuz mevsimi." },
    ],
  },
  {
    kelime: "millet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Aynı topraklarda yaşayan, dil ve kültürü ortak olan insan topluluğu.", ornek: "Türk milleti tarih boyunca cesaretiyle tanınmıştır." },
      { tur: "mecaz", tanim: "Tür, çeşit (halk dilinde).", ornek: "Bu milletten meyve seversin, çiğdem dahil." },
    ],
  },
  {
    kelime: "nehir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çevresine göre büyük, sürekli akan su; ırmak.", ornek: "Kızılırmak Türkiye'nin en uzun nehridir." },
    ],
  },
  {
    kelime: "nokta",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çok küçük, biçimsiz işaret; benek.", ornek: "Beyaz gömleğine kara bir nokta düşmüş." },
      { tur: "terim", tanim: "Yazıda cümle sonuna konan noktalama işareti.", ornek: "Cümlelerin sonuna nokta koymayı unutma." },
      { tur: "mecaz", tanim: "Belirli bir yer, konum.", ornek: "Bu noktada artık devam edemem." },
    ],
  },
  {
    kelime: "oda",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Evin veya yapının bir bölümü.", ornek: "Çalışma odası kitaplarla doluydu." },
      { tur: "terim", tanim: "Belirli meslek mensuplarının bağlı olduğu kurum.", ornek: "Babam Mühendisler Odası'na kayıtlıdır." },
    ],
  },
  {
    kelime: "ocak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yemek pişirmeye yarayan, ateş yakılan yer.", ornek: "Annem ocakta çorba kaynatıyor." },
      { tur: "mecaz", tanim: "Aile yuvası, ev.", ornek: "Her gencin amacı bir ocak kurmaktır." },
      { tur: "terim", tanim: "Yılın ilk ayı.", ornek: "Ocak ayında okullar yarıyıl tatiline girer." },
    ],
  },
  {
    kelime: "okumak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yazılı bir şeyi gözden geçirip anlamak.", ornek: "Her gün en az bir saat kitap okur." },
      { tur: "gerçek", tanim: "Bir okula devam etmek, öğrenim görmek.", ornek: "Ablam üniversitede tıp okuyor." },
      { tur: "mecaz", tanim: "Anlamak, kavramak (yüzünden okumak).", ornek: "Yüzünden mutlu olduğunu kolayca okuyabilirdiniz." },
    ],
  },
  {
    kelime: "olmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Var olmak, gerçekleşmek.", ornek: "Toplantı saat 14:00'te olacak." },
      { tur: "gerçek", tanim: "Bir nitelik kazanmak.", ornek: "Hava karanlık olunca eve döndük." },
      { tur: "mecaz", tanim: "Olgunlaşmak, yetişmek (meyve).", ornek: "Bahçedeki kayısılar oldu, toplayabiliriz." },
    ],
  },
  {
    kelime: "omuz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kolun gövde ile birleştiği yer.", ornek: "Çantayı omzuna asarak okula yürüdü." },
      { tur: "mecaz", tanim: "Destek, yardım, dayanak.", ornek: "Zor günlerinde ona her zaman omuz verdik." },
    ],
  },
  {
    kelime: "onur",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsanın kendine duyduğu saygı; şeref, haysiyet.", ornek: "Onur kırıcı sözler kullanmayalım." },
      { tur: "mecaz", tanim: "Övünç verici durum.", ornek: "Birinci olmak okulumuz için bir onur kaynağıdır." },
    ],
  },
  {
    kelime: "orta",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin iki ucundan eşit uzaklıkta olan yer.", ornek: "Sandalyeyi salonun ortasına çekti." },
      { tur: "mecaz", tanim: "Vasat, ne çok iyi ne çok kötü.", ornek: "Sınavda orta düzeyde bir not aldı." },
      { tur: "mecaz", tanim: "İçinde bulunulan zaman dilimi (deyim).", ornek: "Olay başlayınca ortalık karıştı." },
    ],
  },
  {
    kelime: "oyun",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Eğlenmek amacıyla yapılan etkinlik.", ornek: "Çocuklar parkta oyun oynuyor." },
      { tur: "gerçek", tanim: "Tiyatro eseri.", ornek: "Akşam beş perdelik bir oyuna gittik." },
      { tur: "mecaz", tanim: "Hile, dolap.", ornek: "Bu işte bir oyun olduğunu hissediyorum." },
    ],
  },
  {
    kelime: "öğretmen",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Okulda öğrencilere ders veren kimse.", ornek: "Öğretmenim bana okumayı sevdirdi." },
      { tur: "mecaz", tanim: "Bir kişiye yol gösteren, ders veren kimse veya olay.", ornek: "Hayat en güzel öğretmendir." },
    ],
  },
  {
    kelime: "örnek",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şey hakkında fikir veren, açıklayan numune.", ornek: "Öğretmen tahtaya bir örnek soru çözdü." },
      { tur: "mecaz", tanim: "Davranışlarıyla başkalarına yol gösteren kişi.", ornek: "Babası ona her zaman örnek olmuştur." },
    ],
  },
  {
    kelime: "özgür",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Hiçbir baskı altında olmayan; bağımsız, hür.", ornek: "Tarih boyunca milletler özgür yaşamak için savaşmıştır." },
    ],
  },
  {
    kelime: "paket",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sarılıp bağlanarak hazırlanmış küçük çıkın veya kutu.", ornek: "Posta kutusunda bir paket bekliyordu." },
      { tur: "mecaz", tanim: "Bir arada sunulan hizmetler ya da içerikler bütünü.", ornek: "Tatil paketi otel ve uçak bileti içeriyor." },
    ],
  },
  {
    kelime: "parça",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bütünden ayrılmış küçük bölüm.", ornek: "Pastadan bir parça daha aldı." },
      { tur: "mecaz", tanim: "Bir şeyin az miktarı.", ornek: "Bir parça anlayış göster lütfen." },
    ],
  },
  {
    kelime: "perde",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Pencereye asılan, içeriyi dışarıdan ayıran kumaş örtü.", ornek: "Akşam olunca perdeleri çektik." },
      { tur: "terim", tanim: "Tiyatroda bir oyunun her bölümü.", ornek: "Oyun üç perdede sahnelendi." },
      { tur: "mecaz", tanim: "Bir şeyi gizleyen örtü (deyim: gözüne perde inmek).", ornek: "Sevgi gözüne perde indirmişti." },
    ],
  },
  {
    kelime: "rahat",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıkıntısız, dinlendirici, huzurlu.", ornek: "Bu sandalye çok rahat." },
      { tur: "mecaz", tanim: "Kolaylıkla, zorlanmadan.", ornek: "Soruyu rahat çözdü." },
    ],
  },
  {
    kelime: "sabır",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Acı, zorluk veya beklemeye katlanma; tahammül.", ornek: "Bu işin sonu sabırla gelir." },
    ],
  },
  {
    kelime: "sağ",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun kalp tarafının karşıt yönü.", ornek: "Sağ elimle yazıyorum." },
      { tur: "mecaz", tanim: "Hayatta olan, ölmemiş.", ornek: "Deprem sonrasında sağ kurtulanlar hastaneye götürüldü." },
      { tur: "mecaz", tanim: "Sağlıklı, bütün.", ornek: "Çok şükür hâlâ sağ ve sağlıklıyım." },
    ],
  },
  {
    kelime: "sağlık",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun her bakımdan iyi olma durumu; sıhhat.", ornek: "Sağlık her şeyin başıdır." },
    ],
  },
  {
    kelime: "saklamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bulunamayacak yere koymak; gizlemek.", ornek: "Hediyeyi dolaba sakladı." },
      { tur: "mecaz", tanim: "Bir sırrı veya gerçeği başkasından gizlemek.", ornek: "Bunu uzun süre senden sakladı." },
    ],
  },
  {
    kelime: "savaş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Devletler veya topluluklar arasındaki silahlı çatışma.", ornek: "Tarih kitabı I. Dünya Savaşı'nı anlatıyordu." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için gösterilen büyük mücadele.", ornek: "Sınava hazırlık benim için sessiz bir savaş." },
    ],
  },
  {
    kelime: "ses",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Havayı titreten ve kulağa ulaşan dalga; işitilen titreşim.", ornek: "Dışarıdan gelen ses beni uyandırdı." },
      { tur: "mecaz", tanim: "Görüş, talep, fikir.", ornek: "Toplumun sesi yetkililere duyurulmalı." },
      { tur: "terim", tanim: "Dil bilgisinde harfin söylenişi.", ornek: "Türkçedeki sesler temelde sekiz ünlü ve yirmi bir ünsüzdür." },
    ],
  },
  {
    kelime: "sıcak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıcaklığı yüksek olan; soğuk karşıtı.", ornek: "Yaz günleri çok sıcak geçiyor." },
      { tur: "mecaz", tanim: "Samimi, içten (insan, ortam).", ornek: "Bizi çok sıcak karşıladılar." },
      { tur: "mecaz", tanim: "Taze, yeni (haber).", ornek: "Sıcak haberler için ekranı takip edin." },
    ],
  },
  {
    kelime: "son",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin biten, en sonraki noktası.", ornek: "Kitabı sonuna kadar okudu." },
      { tur: "mecaz", tanim: "En yeni, en güncel olan.", ornek: "Son haberlere göre yağmur sürecek." },
      { tur: "mecaz", tanim: "Bir olayın akıbeti, varılan nokta.", ornek: "Bu işin sonunun ne olacağını bilmiyorum." },
    ],
  },
  {
    kelime: "söz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir düşünceyi ifade eden cümle veya sözcükler.", ornek: "Söylediği sözler kimseyi kırmadı." },
      { tur: "mecaz", tanim: "Verilen vaat, garanti.", ornek: "Bana yarın geleceğine söz verdi." },
      { tur: "mecaz", tanim: "Konuşma sırası veya hakkı.", ornek: "Sıra sana geldi, söz senin." },
    ],
  },
  {
    kelime: "su",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Renksiz, kokusuz, içilen sıvı (H₂O).", ornek: "Bir bardak su isteyebilir miyim?" },
      { tur: "mecaz", tanim: "Gözyaşı veya ter (deyimlerde 'gözleri su dolmak').", ornek: "Mutluluktan gözleri suyla doldu." },
      { tur: "mecaz", tanim: "Akıcılık, akış (yazı, konuşma için).", ornek: "Yazılarının suyu çok güzel." },
    ],
  },
  {
    kelime: "sürmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yumuşak bir maddeyi yayarak uygulamak.", ornek: "Ekmeğe tereyağı sürdü." },
      { tur: "gerçek", tanim: "Bir aracı kullanarak yürütmek.", ornek: "Babam arabasını dikkatle sürüyor." },
      { tur: "mecaz", tanim: "Devam etmek (zaman, durum).", ornek: "Konferans iki saat sürdü." },
    ],
  },
  {
    kelime: "şehir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Nüfusu büyük, ekonomik ve toplumsal yönlerden gelişmiş yerleşim merkezi; kent.", ornek: "İstanbul, Türkiye'nin en büyük şehridir." },
    ],
  },
  {
    kelime: "şişmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Hacmi büyümek, kabarık duruma gelmek.", ornek: "Hamur mayalandıkça şişti." },
      { tur: "mecaz", tanim: "Çok yemekten dolayı rahatsız olmak.", ornek: "Akşam yemekten sonra midem şişti." },
      { tur: "mecaz", tanim: "Övünmek, böbürlenmek.", ornek: "Birinciliği duyunca şişti." },
    ],
  },
  {
    kelime: "şiir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Duyguların ölçülü, uyaklı veya serbest biçimde dile getirildiği yazı türü.", ornek: "Yunus Emre'nin şiirleri gönüllere hitap eder." },
      { tur: "mecaz", tanim: "Çok güzel, etkileyici, akıcı şey.", ornek: "Manzaranın güzelliği âdeta bir şiirdi." },
    ],
  },
  {
    kelime: "takım",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Aynı amaca yönelmiş kimselerden oluşan topluluk.", ornek: "Sınıfımız futbol takımı kurdu." },
      { tur: "gerçek", tanim: "Birlikte kullanılan aletler topluluğu.", ornek: "Babam tamir takımını çıkardı." },
    ],
  },
  {
    kelime: "tarih",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Geçmişte olmuş olayların incelendiği bilim dalı.", ornek: "Tarihte ders almak için geçmişi iyi bilmek gerekir." },
      { tur: "gerçek", tanim: "Belirli bir gün, ay ve yılı bildiren not.", ornek: "Doğum tarihini yanlış yazmışsın." },
      { tur: "mecaz", tanim: "Bir kişinin geçmişi.", ornek: "Onun da uzun bir tarihi vardır." },
    ],
  },
  {
    kelime: "taş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kaya parçası, sert mineral kütle.", ornek: "Dereden topladıkları taşları oyun için kullandılar." },
      { tur: "mecaz", tanim: "Çok sert, duygusuz (kalp).", ornek: "Kalbi taş gibiydi, kimseye acımıyordu." },
      { tur: "terim", tanim: "Satranç, dama gibi oyunlarda figür.", ornek: "Satrançta atımı yanlış yere oynayıp taşımı kaptırdım." },
      { tur: "mecaz", tanim: "Bir kişiye dolaylı söz, sataşma.", ornek: "Söylediği o sözlerle bana taş atıyordu." },
    ],
  },
  {
    kelime: "tehlike",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Zarar veya yıkım gelebilecek durum.", ornek: "Karayolu kar yağışıyla tehlike altındaydı." },
    ],
  },
  {
    kelime: "temel",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yapının yere oturduğu, üzerine inşa edildiği bölüm.", ornek: "Evin temeli sağlam atıldı." },
      { tur: "mecaz", tanim: "Esas, en önemli olan.", ornek: "Eğitim, bir ülkenin temel taşıdır." },
    ],
  },
  {
    kelime: "ters",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yön olarak karşıt, zıt.", ornek: "Çorabını ters giymiş, dikiş yeri dışarıda." },
      { tur: "mecaz", tanim: "Aksilik, beklenmedik kötü durum.", ornek: "Bugün her şey ters gidiyor." },
      { tur: "mecaz", tanim: "Soğuk, sert (insan davranışı).", ornek: "Onunla ne kadar ters konuştun!" },
    ],
  },
  {
    kelime: "top",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yuvarlak biçimli, oyunlarda kullanılan nesne.", ornek: "Top sahaya hızla geldi." },
      { tur: "gerçek", tanim: "Mermi atan ağır silah.", ornek: "Eski toplar müzede sergileniyor." },
      { tur: "mecaz", tanim: "Çok miktar, yığın (deyim: top yekun).", ornek: "Top yekun on kişi geldi." },
    ],
  },
  {
    kelime: "toplum",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Aynı toprakta birlikte yaşayan, ortak değerleri olan insanlar bütünü.", ornek: "Sağlıklı bir toplum sağlam ailelerden oluşur." },
    ],
  },
  {
    kelime: "tutmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Elle kavramak, bırakmamak.", ornek: "Bardağı sıkıca tut, düşmesin." },
      { tur: "mecaz", tanim: "Beğenilmek, ilgi görmek.", ornek: "Yeni şarkısı bir hafta içinde tuttu." },
      { tur: "mecaz", tanim: "Bir görevi üstlenmek.", ornek: "Bu sene sınıf başkanlığını tutmaya karar verdi." },
      { tur: "mecaz", tanim: "Olabilmek, gerçekleşmek (tahmin tutmak).", ornek: "Hava tahmini bu sefer de tutmadı." },
    ],
  },
  {
    kelime: "tuz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yemeklere tat veren beyaz, kristal madde (NaCl).", ornek: "Yemeğin tuzunu biraz daha artırayım." },
      { tur: "mecaz", tanim: "Bir şeyin tadı, lezzeti veya değeri (deyim: tuzu biber olmak).", ornek: "Konuşmanın tuzu biberi onun esprileriydi." },
    ],
  },
  {
    kelime: "uçak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsan ve yük taşıyan, motorla çalışan, kanatlı hava taşıtı.", ornek: "İstanbul-Ankara arası uçakla bir saat sürüyor." },
    ],
  },
  {
    kelime: "uçmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Havada kanat veya araçla hareket etmek.", ornek: "Kuşlar göç için güneye uçtu." },
      { tur: "mecaz", tanim: "Çok sevinmek, mutlu olmak.", ornek: "Sınavı kazanınca sevinçten uçtu." },
      { tur: "mecaz", tanim: "Çok çabuk tükenmek (para, zaman).", ornek: "Maaşının yarısı bir haftada uçtu." },
    ],
  },
  {
    kelime: "umut",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İyi bir sonucu bekleme; ümit.", ornek: "Umut, insanı yaşatan en güçlü duygudur." },
    ],
  },
  {
    kelime: "unutmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bilgiyi veya durumu akıldan çıkarmak; hatırlayamamak.", ornek: "Anahtarımı evde unuttum." },
      { tur: "mecaz", tanim: "Bir kimseyi ihmal etmek.", ornek: "Eski arkadaşlarını hiç unutmadı." },
    ],
  },
  {
    kelime: "usta",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sanat veya zanaatta yetkin kimse.", ornek: "Çiçek bahçesini ünlü bir usta yapmış." },
      { tur: "mecaz", tanim: "Bir konuda çok bilgili, ileri.", ornek: "Bu işin ustasıdır, ona güvenebilirsin." },
    ],
  },
  {
    kelime: "uzun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyu fazla olan; kısa karşıtı.", ornek: "Sınıfın en uzun öğrencisi oydu." },
      { tur: "mecaz", tanim: "Süresi fazla olan (zaman, yolculuk).", ornek: "Çok uzun bir yolculuktan sonra eve vardık." },
    ],
  },
  {
    kelime: "varlık",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Var olan her şey, mevcut olma durumu.", ornek: "Yeryüzünde sayısız canlı varlık vardır." },
      { tur: "mecaz", tanim: "Mal, mülk, zenginlik.", ornek: "Atalarımdan kalan tek varlığım bu ev." },
    ],
  },
  {
    kelime: "vatan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir milletin yurt edindiği toprak parçası; yurt.", ornek: "Vatanını sevmek her vatandaşın görevidir." },
    ],
  },
  {
    kelime: "vermek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi birine ulaştırmak, sunmak.", ornek: "Çocuğa kalemi verdim." },
      { tur: "mecaz", tanim: "Karar veya öğüt sunmak.", ornek: "Bu konuda bana iyi bir öğüt verdi." },
      { tur: "mecaz", tanim: "Bir niteliği kazandırmak.", ornek: "Yağmur ovaya yeniden hayat verdi." },
    ],
  },
  {
    kelime: "vücut",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsanın veya hayvanın beden bütünü.", ornek: "Vücudunu zinde tutmak için spor yapıyor." },
    ],
  },
  {
    kelime: "yağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bitki veya hayvanlardan elde edilen sıvı/katı madde.", ornek: "Salataya bir kaşık zeytinyağı koydu." },
      { tur: "mecaz", tanim: "Aşırı methiye, dalkavukluk (deyim: yağ çekmek).", ornek: "Patrona yağ çekerek terfi aldı." },
    ],
  },
  {
    kelime: "yakmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Ateşle tutuşturmak; yanmasını sağlamak.", ornek: "Kibritle mumu yaktı." },
      { tur: "mecaz", tanim: "Birini zor durumda bırakmak.", ornek: "O söz beni amcamın yanında yaktı." },
      { tur: "mecaz", tanim: "Çok üzmek, içine işlemek.", ornek: "Bu haber yüreğimi yaktı." },
    ],
  },
  {
    kelime: "yan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin sağ veya sol bölgesi.", ornek: "Otururken yan tarafımda boş bir koltuk vardı." },
      { tur: "mecaz", tanim: "Bir konunun ek özelliği veya boyutu.", ornek: "Olayın bir de bizim bilmediğimiz yanı var." },
      { tur: "mecaz", tanim: "Taraf, görüş.", ornek: "Tartışmada babamın yanında yer aldı." },
    ],
  },
  {
    kelime: "yaprak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bitkilerin yeşil, fotosentez yapan yassı bölümü.", ornek: "Sonbaharda yapraklar sararıp döküldü." },
      { tur: "mecaz", tanim: "Kitap veya defterin bir sayfası.", ornek: "Defterin son yaprağına yazdı." },
    ],
  },
  {
    kelime: "yardım",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimseye veya bir gruba destek olma; eli uzatma.", ornek: "Depremzedelere yardım kampanyası başlatıldı." },
    ],
  },
  {
    kelime: "yer",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin veya bir şeyin bulunduğu konum.", ornek: "Çantamın yerini değiştirdim." },
      { tur: "gerçek", tanim: "Yer küresinin yüzeyi; toprak.", ornek: "Topu yere koydu." },
      { tur: "mecaz", tanim: "Bir kimsenin rütbe veya görevi.", ornek: "Sınıfta birinci yerimi kimseye kaptırmadım." },
    ],
  },
  {
    kelime: "yıkmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yapıyı parçalayarak çökertmek.", ornek: "Eski binayı yıkıp yenisini yaptılar." },
      { tur: "mecaz", tanim: "Çok üzmek, çökertmek (manen).", ornek: "Babasının ölümü onu yıktı." },
      { tur: "mecaz", tanim: "Bir düzeni sona erdirmek.", ornek: "İhanetler imparatorluğu yıktı." },
    ],
  },
  {
    kelime: "yıldız",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Geceleyin gökyüzünde parıldayan, kendi ışığını yayan gök cismi.", ornek: "Yaz akşamı gökyüzünde sayısız yıldız vardı." },
      { tur: "mecaz", tanim: "Sanat veya spor alanında çok beğenilen, ünlü kişi.", ornek: "Yeni filmin yıldızı çok genç bir oyuncuydu." },
      { tur: "mecaz", tanim: "Şans, talih (deyim: yıldızı parlamak).", ornek: "Son aylarda işinde yıldızı parladı." },
    ],
  },
  {
    kelime: "yorgun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bedenen veya zihnen tükenmiş; bitkin.", ornek: "Uzun yoldan yorgun döndüm." },
      { tur: "mecaz", tanim: "Kullanıla kullanıla işlevini yitirmiş (eşya, makine).", ornek: "Bu yorgun motorun değişmesi gerekiyor." },
    ],
  },
  {
    kelime: "yol",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yerden başka yere ulaşmak için kullanılan açıklık.", ornek: "Köy yolu kar yüzünden kapandı." },
      { tur: "mecaz", tanim: "Yöntem, çare, biçim.", ornek: "Bu sorunu çözmenin başka bir yolu var." },
      { tur: "mecaz", tanim: "Yaşam biçimi veya inanç.", ornek: "Atatürk'ün yolundan gitmek hepimizin görevidir." },
    ],
  },
  {
    kelime: "yüksek",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yerden uzaklığı çok olan.", ornek: "Yüksek bir kulenin tepesinden şehre baktı." },
      { tur: "mecaz", tanim: "Sayı veya değer olarak büyük (fiyat, sıcaklık).", ornek: "Bu mevsimde fiyatlar çok yüksek." },
      { tur: "mecaz", tanim: "İleri düzeyde, üst seviye (eğitim).", ornek: "Yüksek eğitim almak için yurt dışına çıktı." },
    ],
  },
  {
    kelime: "zafer",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir savaşı veya çabayı kazanma; üstünlük.", ornek: "30 Ağustos Zafer Bayramı'mızdır." },
      { tur: "mecaz", tanim: "Önemli bir başarı.", ornek: "Sınavı geçmek onun için büyük bir zaferdi." },
    ],
  },
  {
    kelime: "zaman",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Olayların oluştuğu, sürdüğü ve birbirini takip ettiği akış.", ornek: "Zaman, herkes için aynı hızda akar." },
      { tur: "mecaz", tanim: "Uygun an, fırsat.", ornek: "Şimdi konuşmanın zamanı değil." },
      { tur: "terim", tanim: "Dil bilgisinde fiilin oluş anı (geçmiş, şimdiki, gelecek).", ornek: "Eylemin zamanını doğru kullan." },
    ],
  },
  {
    kelime: "zor",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yapılması güç, çetin.", ornek: "Bu soruyu çözmek çok zordur." },
      { tur: "mecaz", tanim: "Sıkıntı, güçlük.", ornek: "Hayatın zorları onu pes ettirmedi." },
      { tur: "mecaz", tanim: "Baskı, mecburiyet (deyim: zorla).", ornek: "Onu hiçbir şeyi zorla yaptıramazsın." },
    ],
  },
];

/** Sayfa başına kelime sayısı. */
export const PAGE_SIZE = 1;

export function getTotalPages(): number {
  return Math.ceil(SOZLUK.length / PAGE_SIZE);
}

export function getPage(pageIndex: number): Kelime[] {
  const start = (pageIndex - 1) * PAGE_SIZE;
  return SOZLUK.slice(start, start + PAGE_SIZE);
}
