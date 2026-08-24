/**
 * LGS düzeyi Türkçe sözlük: çok anlamlı kelimeler, gerçek/mecaz ayrımı ve
 * her anlam için örnek cümle. Türkçe alfabetik sıralı.
 *
 * Kaynak: TDK Güncel Türkçe Sözlük tabanlı; tanımlar ve örnekler LGS
 * seviyesine sadeleştirildi. Şu an 599 kelime.
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
    kelime: "abartmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi olduğundan daha büyük veya daha çok göstermek.", ornek: "Yakaladığı balığın büyüklüğünü abartarak anlatınca kimse ona inanmadı." },
      { tur: "mecaz", tanim: "Bir durumu gereğinden fazla önemsemek, büyütmek.", ornek: "Küçük bir tartışmayı abartıp günlerce birbirleriyle küs kaldılar." },
    ],
  },
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
    kelime: "acımak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun bir yerinde ağrı duymak.", ornek: "Uzun yürüyüşten sonra ayakları saatlerce acıdığı için gece boyunca uyuyamadı." },
      { tur: "mecaz", tanim: "Bir kimsenin üzüntüsünü paylaşarak üzülmek, merhamet etmek.", ornek: "Sokakta üşüyen yavru kediye acıyıp onu hemen evine götürdü." },
      { tur: "mecaz", tanim: "Bir şeyi harcamaya kıyamamak, esirgemek.", ornek: "Parasına acıdığı için yıllardır kendine yeni bir kazak almadı." },
    ],
  },
  {
    kelime: "aç",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yemek yemesi gereken, karnı doymamış olan.", ornek: "Akşama kadar aç kalan çocuk sofraya büyük bir iştahla oturdu." },
      { tur: "mecaz", tanim: "Bir şeye karşı büyük istek duyan, doymak bilmeyen.", ornek: "Bilgiye aç öğrenciler akşam olmasına rağmen kütüphaneden çıkmak istemedi." },
      { tur: "gerçek", tanim: "Yiyecek bulamayan, açlık çeken.", ornek: "Başlatılan yardım kampanyası kentteki aç insanlara umut oldu." },
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
    kelime: "açmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kapalı olan bir şeyi kapalı olmaktan kurtarmak.", ornek: "Sabah uyanınca perdeleri açtı ve odaya güneş doldu." },
      { tur: "gerçek", tanim: "Bitkinin tomurcuğu çözülüp çiçek durumuna gelmek.", ornek: "Balkondaki güller ilkbahar gelince birer birer açtı ve etraf renklendi." },
      { tur: "mecaz", tanim: "Bir kimsenin sıkıntısını gidermek, ferahlatmak.", ornek: "Deniz kenarında yaptığımız o uzun yürüyüş hepimizin içini açtı." },
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
    kelime: "adım",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yürümek için ayakların birbiri ardına ileri atılması.", ornek: "Yaşlı adam bastonuna dayanarak yavaş adımlarla sokağın sonuna yürüdü." },
      { tur: "gerçek", tanim: "Yürürken iki ayak arasında oluşan uzaklık.", ornek: "Okulun kapısı buradan yaklaşık yirmi adım ötede duruyordu." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için yapılan iş, girişilen aşama.", ornek: "Bu çalışma temiz bir çevre için atılmış çok önemli bir adımdır." },
    ],
  },
  {
    kelime: "ağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İp veya tel örülerek yapılan, balık avlamaya yarayan araç.", ornek: "Balıkçılar sabaha karşı ağlarını denize atıp güneşin doğmasını beklediler." },
      { tur: "terim", tanim: "Birbirine bağlanan bilgisayarların oluşturduğu iletişim sistemi.", ornek: "Okuldaki bütün bilgisayarlar aynı ağa bağlı olduğu için dosyaları paylaşabiliyoruz." },
      { tur: "mecaz", tanim: "Bir bölgeye yayılmış yollar, hatlar veya ilişkiler bütünü.", ornek: "Şehrin metro ağı her yıl yeni hatlarla biraz daha genişliyor." },
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
    kelime: "ağız",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüzde bulunan, yemek yemeye ve konuşmaya yarayan boşluk.", ornek: "Doktor çocuğun ağzını açmasını isteyip boğazını dikkatle inceledi." },
      { tur: "gerçek", tanim: "Bir şeyin açık olan giriş bölümü.", ornek: "Mağaranın ağzı çok dar olduğu için içeri güçlükle girebildik." },
      { tur: "terim", tanim: "Bir bölgede konuşulan, yazı diline geçmemiş konuşma biçimi.", ornek: "Dedemin Karadeniz ağzıyla anlattığı fıkralara bütün akrabalar güldü." },
      { tur: "mecaz", tanim: "Bir kimsenin konuşma tarzı, söyleyiş biçimi.", ornek: "Babasının ağzıyla konuşan küçük çocuk hepimizi güldürdü." },
    ],
  },
  {
    kelime: "ağlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzüntü veya sevinç sebebiyle gözyaşı dökmek.", ornek: "Kaybettiği köpeğini komşunun bahçesinde bulunca sevinçten uzun uzun ağladı." },
      { tur: "mecaz", tanim: "Sürekli yakınmak, sızlanıp durmak.", ornek: "Her gün işlerinin çokluğundan ağlıyor ama kimseden yardım da istemiyor." },
    ],
  },
  {
    kelime: "ağrı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun herhangi bir yerinde duyulan acı.", ornek: "Gece boyunca süren diş ağrısı yüzünden sabaha kadar hiç uyuyamadı." },
      { tur: "mecaz", tanim: "İnsanın içinde duyduğu sıkıntı, dert.", ornek: "Bu konuyu her açtığımızda eski bir ağrı yeniden canlanıyor." },
    ],
  },
  {
    kelime: "ahlak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir toplumda iyilik-kötülük, doğru-yanlış ölçütlerine göre uygulanan davranış kuralları.", ornek: "İyi bir ahlaka sahip olmak insan için en değerli kazanımdır." },
      { tur: "gerçek", tanim: "Bir kimsenin huyları, karakter özellikleri.", ornek: "Yeni arkadaş çevresi Emre'nin ahlakını olumlu yönde değiştirdi." },
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
    kelime: "alçak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yerden yüksekliği az olan.", ornek: "Alçak duvarın üzerinden atlayarak bahçeye kolayca girdi ve topunu aldı." },
      { tur: "gerçek", tanim: "Sesi az duyulan, kısık olan.", ornek: "Ders sırasında alçak sesle konuştukları için öğretmen onları duymadı." },
      { tur: "mecaz", tanim: "Onursuzca davranan, aşağılık kimse.", ornek: "Yaşlı kadını kandırıp bütün parasını alan bu alçak sonunda yakalandı." },
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
    kelime: "alt",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin yere bakan yanı, aşağıda kalan bölümü.", ornek: "Kalemi masanın altına düşürünce eğilip uzun süre aradı." },
      { tur: "gerçek", tanim: "Bir yapıda aşağıda bulunan kat veya bölüm.", ornek: "Alt komşumuz her akşam bahçesini sular ve çiçeklerini budar." },
      { tur: "mecaz", tanim: "Derece veya sıralama bakımından daha aşağıda olan.", ornek: "Takımımız alt sıralara düşünce taraftarlar büyük üzüntü yaşadı." },
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
    kelime: "anahtar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kilidi açıp kapamaya yarayan metal araç.", ornek: "Kapının anahtarını evde unutunca saatlerce merdivende beklemek zorunda kaldı." },
      { tur: "mecaz", tanim: "Bir sorunu çözmeye yarayan yol veya bilgi.", ornek: "Bu sorunun anahtarı düzenli çalışmaktan ve sabırlı olmaktan geçiyor." },
      { tur: "terim", tanim: "Müzikte notaların yerini ve adını belirleyen işaret.", ornek: "Müzik öğretmeni tahtaya önce sol anahtarını çizdi, sonra notaları yazdı." },
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
    kelime: "ara",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İki şey arasında kalan uzaklık veya boşluk.", ornek: "Sıraların arası o kadar dardı ki çantamla zorlukla geçtim." },
      { tur: "gerçek", tanim: "Bir işin ortasında verilen dinlenme süresi.", ornek: "Öğretmen dersin ortasında beş dakikalık kısa bir ara verdi." },
      { tur: "mecaz", tanim: "Kişiler arasındaki ilişki, geçim durumu.", ornek: "Kardeşiyle arası açıldığı için bayramda bile birbirlerini aramadılar." },
    ],
  },
  {
    kelime: "araç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsan veya yük taşımaya yarayan taşıt.", ornek: "Yolda bozulan araç bütün trafiği uzun süre aksattı." },
      { tur: "gerçek", tanim: "Bir işi yaparken yararlanılan nesne, gereç.", ornek: "Bilgisayar artık öğrenciler için vazgeçilmez bir çalışma aracı oldu." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için kullanılan kişi veya yol.", ornek: "Dostluğu kendi çıkarına araç yapması hepimizi derinden kırdı." },
    ],
  },
  {
    kelime: "aramak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Birini veya bir şeyi bulmaya çalışmak.", ornek: "Kaybettiği gözlüğünü bütün odada uzun süre aradı ama bir türlü bulamadı." },
      { tur: "gerçek", tanim: "Telefonla birine ulaşmaya çalışmak.", ornek: "Annesi akşam olunca merak edip onu telefonla aradı." },
      { tur: "mecaz", tanim: "Bir şeyin yokluğunu duyup özlemek.", ornek: "Taşındıktan sonra eski mahallesinin o sıcak komşuluğunu hep aradı." },
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
    kelime: "aslan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kedigillerden, güçlü ve yırtıcı bir hayvan.", ornek: "Belgeselde aslanların sürü hâlinde nasıl avlandığını ilgiyle izledik." },
      { tur: "mecaz", tanim: "Yürekli, güçlü ve korkusuz kimse.", ornek: "Yangında çocukları kurtaran itfaiyeciye mahallede aslan gibi adam dediler." },
      { tur: "mecaz", tanim: "Sağlıklı ve gürbüz olan.", ornek: "Komşumuzun geçen hafta doğan oğlu aslan gibi bir bebek olmuş." },
    ],
  },
  {
    kelime: "asmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi yukarıya, bir yere tutturarak sarkıtmak.", ornek: "Yıkadığı çamaşırları balkondaki ipe tek tek asıp güneşin altında bıraktı." },
      { tur: "mecaz", tanim: "Gitmesi gereken yere gitmemek, katılmamak.", ornek: "Dersi asıp arkadaşlarıyla parka gitmesi büyük bir hataydı." },
      { tur: "mecaz", tanim: "Yüzünü somurtkan bir duruma sokmak.", ornek: "İstediği oyuncağı alamayınca bütün gün suratını asıp odasından hiç çıkmadı." },
    ],
  },
  {
    kelime: "aşağı",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin alt bölümü, alçakta olan yer.", ornek: "Merdivenlerden aşağı inerken tırabzana sıkıca tutundu ve adımlarını dikkatle attı." },
      { tur: "gerçek", tanim: "Belirtilen ölçüden veya değerden az olan.", ornek: "Sıcaklık gece boyunca sıfırın aşağısına indi ve yollar buzlandı." },
      { tur: "mecaz", tanim: "Değersiz, niteliği düşük sayılan.", ornek: "İnsanları aşağı görmek hiç kimseye saygınlık ya da değer kazandırmaz." },
    ],
  },
  {
    kelime: "aşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir engelin üstünden geçerek öte yana ulaşmak.", ornek: "Dağcılar karlı tepeyi güçlükle aşıp kampa akşam saatlerinde ulaştı." },
      { tur: "mecaz", tanim: "Bir güçlüğün üstesinden gelmek, yenmek.", ornek: "Karşısına çıkan bütün zorlukları sabırla aşıp hedefine sonunda ulaştı." },
      { tur: "mecaz", tanim: "Bir ölçüyü veya sınırı geçmek.", ornek: "Hazırladığı sunum kendisine verilen süreyi on dakika aştı." },
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
    kelime: "atlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıçrayarak bir yerden başka bir yere geçmek.", ornek: "Çocuk küçük dereyi koşarak atladı ve karşı kıyıya geçti." },
      { tur: "mecaz", tanim: "Bir şeyi gözden kaçırmak, fark etmemek.", ornek: "Aceleyle okurken sorudaki önemli bir ayrıntıyı atladığı için yanlış yapmış." },
      { tur: "mecaz", tanim: "Aradaki bölümü geçip ileriye gitmek.", ornek: "Kitabın sıkıcı bulduğu bölümlerini atlayarak sonuna kadar okudu." },
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
    kelime: "atmosfer",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Yer küreyi saran gaz katmanı, hava yuvarı.", ornek: "Uzaya gönderilen roket birkaç dakika içinde atmosferi geride bıraktı." },
      { tur: "mecaz", tanim: "Bir yerde egemen olan hava, ortam.", ornek: "Sınıfın neşeli atmosferi bütün öğrencileri sınav öncesinde rahatlattı." },
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
    kelime: "avuç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Elin iç yüzü, parmakların iç tarafındaki boşluk.", ornek: "Terleyen avuçlarını pantolonuna sildikten sonra kürsüye çıkıp konuşmaya başladı." },
      { tur: "gerçek", tanim: "Elin içinin alabileceği miktar.", ornek: "Kuşlara bir avuç yem attıktan sonra kenara çekilip onları izledi." },
      { tur: "mecaz", tanim: "Sayıca çok az olan.", ornek: "Toplantıya bir avuç insan katıldığı için koca salon bomboş kaldı." },
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
    kelime: "aydınlık",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Işığın bulunduğu durum, ışıklı olma hâli.", ornek: "Perdeleri açınca odaya sabahın tatlı aydınlığı yavaş yavaş yayıldı." },
      { tur: "gerçek", tanim: "Işık alan, iyi ışıklandırılmış olan.", ornek: "Aydınlık bir odada ders çalışmak gözleri çok daha az yoruyor." },
      { tur: "mecaz", tanim: "Umut verici, iyi ve olumlu olan.", ornek: "Öğretmenimiz mezuniyet töreninde hepimize aydınlık bir gelecek diledi." },
    ],
  },
  {
    kelime: "ayırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bütünü parçalara bölmek veya birbirinden uzaklaştırmak.", ornek: "Çamaşırları renklerine göre ayırdıktan sonra hepsini makineye tek tek yerleştirdi." },
      { tur: "gerçek", tanim: "Bir şeyi belli bir amaç için saklamak, tutmak.", ornek: "Ders çalışmaya her gün en az iki saat ayırıyor." },
      { tur: "mecaz", tanim: "Kişiler arasında fark gözetmek, birini üstün tutmak.", ornek: "Öğretmenimiz hiçbir öğrencisini ayırmadan hepsine aynı sevgiyle davranırdı." },
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
    kelime: "ayrılmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bulunduğu yerden uzaklaşmak, oradan gitmek.", ornek: "Toplantı bitmeden salondan sessizce ayrılıp doğruca evine döndü ve dinlendi." },
      { tur: "gerçek", tanim: "Bir bütün parçalara bölünmek.", ornek: "Yol ileride ikiye ayrılıyor, sağdaki patika köye çıkıyor." },
      { tur: "mecaz", tanim: "Başka türlü olmak, benzememek.", ornek: "Bu iki görüş yalnızca bir noktada birbirinden ayrılıyor." },
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
    kelime: "bağ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi tutturmaya yarayan ip, kuşak, halka.", ornek: "Ayakkabısının bağı çözülmüştü." },
      { tur: "gerçek", tanim: "Üzüm yetiştirilen tarla.", ornek: "Dedem köydeki bağdan üzüm topladı." },
      { tur: "mecaz", tanim: "İnsanlar veya olaylar arasındaki ilişki.", ornek: "İki arkadaş arasında güçlü bir bağ vardı." },
    ],
  },
  {
    kelime: "bağırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüksek ve güçlü sesle söylemek, seslenmek.", ornek: "Uzaktaki arkadaşına sesini duyurmak için var gücüyle bağırdı." },
      { tur: "mecaz", tanim: "Öfkeyle azarlamak, çıkışmak.", ornek: "Küçük bir hata yaptı diye çırağına bağıran ustayı herkes kınadı." },
    ],
  },
  {
    kelime: "bağlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İp benzeri bir şeyle tutturmak, düğümlemek.", ornek: "Ayakkabısının bağcıklarını sıkıca bağladıktan sonra parktaki koşusuna rahatça başladı." },
      { tur: "mecaz", tanim: "Bir sözü veya yazıyı sonuca ulaştırmak, bitirmek.", ornek: "Uzun konuşmasını çok sevdiği güzel bir şiirle bağladı." },
      { tur: "mecaz", tanim: "Bir yerden ayrılamaz duruma getirmek, engellemek.", ornek: "Gece yağan kar yolları kapatıp bütün köylüleri eve bağladı." },
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
    kelime: "bakmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Görmek için gözleri bir şeye çevirmek.", ornek: "Pencereden dışarı bakıp yağmurun dinmesini uzun süre sabırla bekledi." },
      { tur: "gerçek", tanim: "Bir kimsenin veya şeyin bakımını üstlenmek.", ornek: "Hasta anneannesine her gün büyük bir özenle o bakıyor." },
      { tur: "mecaz", tanim: "Bir konuyu belli bir açıdan değerlendirmek.", ornek: "Olaylara herkes kendi penceresinden baktığı için tartışma uzayıp gitti." },
    ],
  },
  {
    kelime: "basamak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Merdivende ayak basılan bölümlerden her biri.", ornek: "Merdivenin son basamağında ayağı takılınca neredeyse yere düşecekti." },
      { tur: "terim", tanim: "Bir sayıda rakamların bulunduğu yerlerden her biri.", ornek: "Öğretmen bu sayının onlar basamağındaki rakamı tahtaya yazmamızı istedi." },
      { tur: "mecaz", tanim: "Bir amaca ulaşırken geçilen aşamalardan her biri.", ornek: "Bu sınav, hayalindeki mesleğe giden yolda yalnızca ilk basamaktı." },
    ],
  },
  {
    kelime: "baskı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yazının veya kitabın basılması işi ve basılan miktar.", ornek: "Sevilen romanın üçüncü baskısı kitapçılarda bir ayda tükendi." },
      { tur: "gerçek", tanim: "Kumaş veya kâğıt üzerine desen basma işi.", ornek: "Çiçek baskılı perdeler küçük odaya bambaşka bir neşe kattı." },
      { tur: "mecaz", tanim: "Bir kimseyi istemediği bir şeye zorlama.", ornek: "Aile baskısı yüzünden hiç sevmediği bir bölümü seçmek zorunda kaldı." },
    ],
  },
  {
    kelime: "basmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Ayağını bir yerin üstüne koymak.", ornek: "Islak zemine basınca ayağı kaydı ve elindekiler yere döküldü." },
      { tur: "gerçek", tanim: "Yazı veya resmi makineyle kâğıda geçirmek.", ornek: "Matbaa yeni çıkan kitapları yalnızca iki günde bastı." },
      { tur: "mecaz", tanim: "Karanlık, sis gibi şeyler her yanı kaplamak.", ornek: "Akşam karanlığı basınca ormanda yürümek bizim için iyice zorlaştı." },
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
      { tur: "gerçek", tanim: "Bir işin, bir dönemin veya bir yapıtın ilk bölümü; ilk adım.", ornek: "Romanın başlangıcı çok sürükleyiciydi, kitabı iki günde bitirdim." },
    ],
  },
  {
    kelime: "batmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvının içine gömülerek gözden kaybolmak.", ornek: "Delinen küçük sandal birkaç dakika içinde suya battı." },
      { tur: "gerçek", tanim: "Güneş veya ay ufkun altına inmek.", ornek: "Güneş denizin ardında yavaş yavaş batarken gökyüzü kızıla döndü." },
      { tur: "mecaz", tanim: "İşleri bozulup varını yitirmek, iflas etmek.", ornek: "Mahallenin küçük dükkânı borçlar yüzünden bir yılda battı." },
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
    kelime: "beklemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimse veya olay gerçekleşinceye kadar bir yerde kalmak.", ornek: "Otobüs durağında yarım saat boyunca arkadaşını sabırla bekledi." },
      { tur: "gerçek", tanim: "Bir şeyin olmasını ummak, ondan istemek.", ornek: "Herkes ondan bu yarışmayı kolayca kazanmasını bekliyordu ama olmadı." },
      { tur: "mecaz", tanim: "Bir işin yapılması sonraya kalmak, ertelenmek.", ornek: "Bu iş yarına kadar bekleyebilir, şimdi biraz dinlenelim." },
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
    kelime: "berrak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İçi görünecek kadar duru ve temiz olan.", ornek: "Gölün berrak suyunda dipteki taşlar bile açıkça görünüyordu." },
      { tur: "mecaz", tanim: "Açık, kolay anlaşılır olan.", ornek: "Konuyu öyle berrak anlattı ki sınıftaki herkes hemen kavradı." },
    ],
  },
  {
    kelime: "beslemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yiyecek vererek yaşamasını sağlamak.", ornek: "Her sabah balkona gelen kuşları ekmek kırıntılarıyla besliyor." },
      { tur: "gerçek", tanim: "Bir şeye gerekli olanı sürekli sağlamak.", ornek: "Dağlardan inen kar suları bu küçük dereyi yaz boyunca besliyor." },
      { tur: "mecaz", tanim: "İçinde bir duygu veya düşünce taşımak.", ornek: "Öğretmenine karşı yıllardır derin bir sevgi ve saygı besliyor." },
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
    kelime: "beyin",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kafatasının içinde bulunan, sinir sistemini yöneten organ.", ornek: "Doktorlar hastanın beynini ayrıntılı biçimde görüntüleyip sonucu ailesine anlattı." },
      { tur: "mecaz", tanim: "Bir işi aklıyla yönlendiren kimse.", ornek: "Bu projenin beyni, sınıfın en sessiz öğrencisi çıktı." },
      { tur: "mecaz", tanim: "Bir kuruluşun yönetim merkezi.", ornek: "Fabrikanın beyni sayılan bu bölümde bütün kararlar alınıyor." },
    ],
  },
  {
    kelime: "bırakmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Elde tutulan şeyi tutmaz olmak, bir yere koymak.", ornek: "Çantasını kapının yanına bırakıp doğruca mutfağa koştu ve su içti." },
      { tur: "gerçek", tanim: "Bir işi veya alışkanlığı sürdürmez olmak, vazgeçmek.", ornek: "Sigarayı bıraktığından beri çok daha rahat nefes alıyor." },
      { tur: "mecaz", tanim: "Bir işi sonraya ertelemek.", ornek: "Ödevini son güne bırakınca bütün gece uyumadan çalışmak zorunda kaldı." },
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
    kelime: "bilmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir konuda bilgisi olmak, öğrenmiş bulunmak.", ornek: "Bu yolun nereye çıktığını aramızda yalnızca o biliyordu." },
      { tur: "gerçek", tanim: "Bir işi yapabilecek durumda olmak.", ornek: "Beş yaşındaki kardeşim şaşırtıcı biçimde çok güzel yüzme biliyor." },
      { tur: "mecaz", tanim: "Bir kimseyi bir şey saymak, öyle kabul etmek.", ornek: "Yıllardır komşumuz olan o teyzeyi kendi anneannem bilirim." },
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
    kelime: "bitmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sona ermek, tükenmek.", ornek: "Ders bitince öğrenciler sevinçle bahçeye doğru koşarak çıktı." },
      { tur: "gerçek", tanim: "Bitki topraktan çıkıp yetişmek.", ornek: "Bahar yağmurlarından sonra tarlada yepyeni otlar bitti, her yer yeşerdi." },
      { tur: "mecaz", tanim: "Gücü kalmamak, çok yorulmak.", ornek: "Bütün gün ayakta çalışınca akşama doğru bitmiş gibi görünüyordu." },
    ],
  },
  {
    kelime: "boğaz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Boynun ön bölümü, yutak.", ornek: "Soğuk havada dışarı çıkınca boğazı akşama doğru ağrımaya başladı." },
      { tur: "terim", tanim: "İki karayı ayıran, iki denizi birleştiren dar su yolu.", ornek: "Gemiler boğazdan geçerken güvertedeki yolcular durmadan fotoğraf çekiyordu." },
      { tur: "terim", tanim: "Dağlar arasındaki dar geçit.", ornek: "Yol dar bir boğazdan geçtiği için sürücü hızını iyice düşürdü." },
    ],
  },
  {
    kelime: "boş",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İçinde bir şey bulunmayan.", ornek: "Boş bardağını doldurmak için sessizce mutfağa gidip geri döndü." },
      { tur: "gerçek", tanim: "Kimsenin oturmadığı, kullanılmayan.", ornek: "Otobüste boş yer kalmadığı için bütün yolculuğu ayakta yaptık." },
      { tur: "mecaz", tanim: "Yararsız, anlamsız olan.", ornek: "Boş sözlerle vakit kaybetmek yerine hemen işe başlayalım." },
    ],
  },
  {
    kelime: "boşluk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İki şey arasındaki açıklık, boş kalan yer.", ornek: "Kitaplığın üst rafındaki boşluğa yeni aldığı kitapları yerleştirdi." },
      { tur: "terim", tanim: "Gök cisimlerinin arasında kalan uzay.", ornek: "Uydu, uzay boşluğunda sessizce dünyanın çevresinde yıllardır dönüp duruyor." },
      { tur: "mecaz", tanim: "İnsanın içinde duyduğu eksiklik ve yalnızlık duygusu.", ornek: "Dedesini kaybedince içinde kapanmayan büyük bir boşluk hissetti." },
    ],
  },
  {
    kelime: "boya",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi renklendirmek için sürülen madde.", ornek: "Odanın duvarları için açık mavi bir boya seçip işe başladılar." },
      { tur: "gerçek", tanim: "Bir şeyin sürülen maddeden aldığı renk.", ornek: "Yağmurlar yüzünden bahçe kapısının boyası yer yer dökülmüştü." },
      { tur: "mecaz", tanim: "Aldatıcı görünüş, gösteriş.", ornek: "Onun bütün nazik sözleri boyaymış, gerçek düşüncesini sonradan öğrendik." },
    ],
  },
  {
    kelime: "bozmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi kullanılamaz duruma getirmek.", ornek: "Kardeşim yeni oyuncak arabayı merakla kurcalayınca bir günde bozdu." },
      { tur: "gerçek", tanim: "Büyük parayı daha küçük para birimlerine çevirmek.", ornek: "Bakkal, elindeki büyük parayı bozarak üstünü eksiksiz verdi." },
      { tur: "mecaz", tanim: "Bir kimsenin keyfini, neşesini kaçırmak.", ornek: "Gelen kötü haber hepimizin neşesini bir anda bozdu." },
    ],
  },
  {
    kelime: "bozuk",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İşlemez duruma gelmiş, arızalı.", ornek: "Bozuk saat yüzünden her sabah okula geç kalıyoruz." },
      { tur: "gerçek", tanim: "Büyük değerli paranın karşılığı olan, küçük değerli (para).", ornek: "Cebinde otobüse binmeye yetecek kadar bozuk para vardı." },
      { tur: "mecaz", tanim: "Keyfi kaçmış, üzgün ve isteksiz.", ornek: "Sınav sonucunu duyduğundan beri morali oldukça bozuk görünüyor." },
    ],
  },
  {
    kelime: "bölmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bütünü parçalara ayırmak.", ornek: "Pastayı sekiz eşit parçaya bölüp masadaki herkese dağıttık." },
      { tur: "terim", tanim: "Bir sayının başka bir sayı içinde kaç kez bulunduğunu hesaplamak.", ornek: "Öğretmen kırk sayısını beşe bölmemizi ve sonucu yazmamızı istedi." },
      { tur: "mecaz", tanim: "Bir topluluğun birliğini bozmak, aralarını açmak.", ornek: "Küçük dedikodular kısa sürede koca sınıfı ikiye böldü." },
    ],
  },
  {
    kelime: "bulanık",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İçindeki maddeler yüzünden duru olmayan.", ornek: "Yağmurdan sonra derenin suyu iyice bulanık akmaya başladı." },
      { tur: "gerçek", tanim: "Seçilemeyen, net görünmeyen.", ornek: "Sisli havada karşı kıyı bulanık bir gölge gibi duruyordu." },
      { tur: "mecaz", tanim: "Karışık, belirsiz olan.", ornek: "O günle ilgili anıları yıllar geçtikçe iyice bulanık bir hâl aldı." },
    ],
  },
  {
    kelime: "bulaşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir madde değme yoluyla başka bir şeye geçmek.", ornek: "Duvardaki yaş boya paltosunun koluna bulaşınca çok üzüldü." },
      { tur: "gerçek", tanim: "Hastalık birinden başkasına geçmek.", ornek: "Grip bütün sınıfa yalnızca bir haftada bulaştı ve dersler aksadı." },
      { tur: "mecaz", tanim: "Kötü veya zararlı bir işe karışmak.", ornek: "Yanlış arkadaşlar yüzünden hiç istemediği işlere bulaşıp başını derde soktu." },
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
    kelime: "buz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Donarak katı duruma gelmiş su.", ornek: "Göletin üstünü kaplayan buz akşama kadar hiç erimedi." },
      { tur: "mecaz", tanim: "Çok soğuk olan.", ornek: "Elleri buz gibiydi, hemen eldivenlerini giymesini ve içeri girmesini söyledim." },
      { tur: "mecaz", tanim: "Duygusuz, sevecen olmayan.", ornek: "Bizi buz gibi bir yüzle karşılayınca hepimiz çok şaşırdık." },
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
    kelime: "büyük",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyutları, hacmi sıradan olandan fazla olan.", ornek: "Büyük bir kavun aldık, hepimize yetti." },
      { tur: "mecaz", tanim: "Önemli, değerli.", ornek: "Atatürk, Türk milleti için büyük bir liderdir." },
      { tur: "mecaz", tanim: "Yaşça ileri olan.", ornek: "Büyüklerinin sözünü dinleyen çocuk pişman olmaz." },
    ],
  },
  {
    kelime: "büyümek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyutça artmak, gelişmek.", ornek: "Geçen yıl diktiğimiz fidan kısa sürede epeyce büyüdü." },
      { tur: "gerçek", tanim: "Yaşça ilerlemek, yetişkin duruma gelmek.", ornek: "Çocuklar büyüyünce eski oyuncaklarını komşunun küçük kızına hediye ettiler." },
      { tur: "mecaz", tanim: "Bir sorun önem kazanıp içinden çıkılmaz duruma gelmek.", ornek: "Zamanında çözülmeyen o küçük mesele günler geçtikçe giderek büyüdü." },
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
    kelime: "canlı",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşayan, yaşamı olan.", ornek: "Fen dersinde bahçedeki canlı varlıkları örneklerle tek tek inceledik." },
      { tur: "mecaz", tanim: "Hareketli, neşeli, yaşam dolu.", ornek: "Sınıfın en canlı öğrencisi teneffüste hiç durmadan koşuyordu." },
      { tur: "terim", tanim: "Olayla aynı anda yapılan yayın.", ornek: "Törenin tamamını televizyondan canlı yayın olarak baştan sona izledik." },
    ],
  },
  {
    kelime: "cansız",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşamayan, hayatı olmayan.", ornek: "Fen dersinde canlı ve cansız varlıkları örneklerle ayırt ettik." },
      { tur: "mecaz", tanim: "Neşesiz, güçsüz, etkisiz.", ornek: "Takım ikinci yarıda çok cansız oynayınca maçı kolayca kaybetti." },
    ],
  },
  {
    kelime: "cehennem",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dinî inanışa göre günahkârların ceza gördüğü yer.", ornek: "Masalda cennet ve cehennem, iyilikle kötülüğün karşılığı olarak anlatılıyordu." },
      { tur: "mecaz", tanim: "Çok sıcak veya çekilmez, sıkıntılı yer.", ornek: "Klima bozulunca sınıf öğle saatlerinde tam bir cehenneme döndü." },
    ],
  },
  {
    kelime: "cennet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dinî inanışa göre iyilik yapanların ödüllendirildiği yer.", ornek: "Dedem, iyilik yapanların cennete gideceğini bize her zaman anlatırdı." },
      { tur: "mecaz", tanim: "Çok güzel, huzur veren yer.", ornek: "Yeşillikler içindeki bu köy bize küçük bir cennet gibi geldi." },
    ],
  },
  {
    kelime: "cephe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yapının ön yüzü.", ornek: "Okulun ön cephesi yaz tatilinde açık sarı renge boyandı." },
      { tur: "terim", tanim: "Savaşta orduların karşı karşıya geldiği bölge.", ornek: "Romanda askerlerin cephede yaşadığı zorluklar ayrıntılı biçimde anlatılıyordu." },
      { tur: "mecaz", tanim: "Bir konuda tutulan taraf, karşıt tutum.", ornek: "Yeni karara karşı bütün veliler hep birlikte cephe aldı." },
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
    kelime: "cesur",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Korkusuz, yürekli.", ornek: "Cesur çocuk, mahsur kalan kediyi kurtarmak için ağaca tırmandı." },
      { tur: "mecaz", tanim: "Alışılmışın dışına çıkmaktan çekinmeyen.", ornek: "Yazar, son romanında oldukça cesur bir anlatım biçimi denemiş." },
    ],
  },
  {
    kelime: "cılız",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Zayıf, güçsüz, yeterince gelişmemiş.", ornek: "Saksıdaki cılız fidan yeterli ışık almadığı için hiç büyümedi." },
      { tur: "mecaz", tanim: "Etkisi az olan, güçsüz çıkan ses veya ışık.", ornek: "Karanlık koridoru cılız bir ampul zar zor aydınlatıyordu." },
    ],
  },
  {
    kelime: "cıva",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvı durumda bulunan, gümüş renkli bir maden.", ornek: "Kırılan eski termometrenin cıvasına sakın çıplak elle dokunmayın." },
      { tur: "mecaz", tanim: "Bir yerde duramayacak kadar hareketli olan.", ornek: "Küçük kardeşim cıva gibi, bir dakika bile yerinde oturmuyor." },
    ],
  },
  {
    kelime: "ciddi",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Şakacı olmayan, ağırbaşlı.", ornek: "Müdürümüz her zaman ciddi bir tavırla konuşur, pek gülmez." },
      { tur: "mecaz", tanim: "Önemli, kaygı verecek kadar ağır.", ornek: "Dedemin hastalığı ciddi olduğu için hemen hastaneye yatırıldı." },
      { tur: "gerçek", tanim: "Gereğince ve özenle yapılan.", ornek: "Sınava hazırlanmak için ciddi bir çalışma programı hazırladık." },
    ],
  },
  {
    kelime: "cimri",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Parasını harcamaktan kaçınan, eli sıkı.", ornek: "Bu kadar cimri davranırsa arkadaşlarıyla hiçbir yere gidemeyecek." },
      { tur: "mecaz", tanim: "Elindekini başkasından esirgeyen.", ornek: "Bilgisinde cimri davranmayan öğretmen her sorumuzu sabırla yanıtladı." },
    ],
  },
  {
    kelime: "coşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Dalgalanmak, kabarıp taşmak.", ornek: "Fırtına çıkınca deniz coştu, tekneler hemen limana geri döndü." },
      { tur: "mecaz", tanim: "Duyguları taşacak kadar heyecanlanmak.", ornek: "Takım gol atınca tribündeki seyirciler bir anda coştu." },
    ],
  },
  {
    kelime: "cömert",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Parasını ve malını esirgemeden veren, eli açık.", ornek: "Cömert komşumuz bahçesindeki meyveleri her yıl bize de dağıtır." },
      { tur: "mecaz", tanim: "Bol bol veren, verimli.", ornek: "Bu cömert topraklar her mevsim bereketli bir ürün veriyor." },
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
    kelime: "çalışmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapmak için emek harcamak.", ornek: "Babam sabahtan akşama kadar fabrikada büyük bir özenle çalışıyor." },
      { tur: "gerçek", tanim: "Öğrenmek için ders üzerinde uğraşmak.", ornek: "Sınavdan önce her gün iki saat matematik çalıştım." },
      { tur: "mecaz", tanim: "Bir aygıt işlemek, görevini yerine getirmek.", ornek: "Eski buzdolabımız artık düzgün çalışmıyor, sürekli garip sesler çıkarıyor." },
    ],
  },
  {
    kelime: "çalmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Başkasının malını izinsiz almak.", ornek: "Hırsız, dükkândan çaldığı eşyalarla kaçarken güvenlik görevlisine yakalandı." },
      { tur: "gerçek", tanim: "Bir müzik aletiyle ezgi seslendirmek.", ornek: "Kardeşim törende bütün okula gitar çalarak güzel bir türkü söyledi." },
      { tur: "mecaz", tanim: "Bir renk başka bir renge yakın olmak.", ornek: "Duvarlar yeşile çalan açık bir tonla baştan aşağı boyandı." },
    ],
  },
  {
    kelime: "çare",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sıkıntıdan kurtulma yolu; çözüm.", ornek: "Bu hastalığa kesin bir çare bulundu." },
      { tur: "gerçek", tanim: "Tedavi yolu; deva.", ornek: "Öksürüğüme en iyi çare, annemin hazırladığı ıhlamurlu bal şurubu oldu." },
    ],
  },
  {
    kelime: "çatı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yapıları örten, en üstteki bölüm.", ornek: "Fırtınada evin çatısındaki kiremitler tek tek yere düştü." },
      { tur: "mecaz", tanim: "Aynı yer, kurum ya da aile birliği.", ornek: "Üç kuşak aynı çatı altında uzun yıllar mutlu biçimde yaşadı." },
      { tur: "terim", tanim: "Fiilin özne ve nesneyle ilgisini gösteren dil bilgisi özelliği.", ornek: "Öğretmen tahtada fiilin çatı özelliklerini örneklerle tek tek açıkladı." },
    ],
  },
  {
    kelime: "çatlak",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yarılmış, üzerinde ince yarık bulunan.", ornek: "Kuraklıktan çatlak hâle gelen toprak, yağmuru günlerdir sabırsızlıkla bekliyordu." },
      { tur: "gerçek", tanim: "Yarık, ince aralık.", ornek: "Duvardaki çatlak zamanla büyüyünce ustayı çağırmak zorunda kaldık." },
      { tur: "mecaz", tanim: "Bir ilişkide ortaya çıkan bozulma belirtisi.", ornek: "Aralarındaki küçük tartışma dostluklarında derin bir çatlak oluşturdu." },
    ],
  },
  {
    kelime: "çekirdek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Meyvelerin içindeki tohum.", ornek: "Karpuzun çekirdeklerini ayıklayıp dilimleri küçük tabaklara özenle paylaştırdık." },
      { tur: "terim", tanim: "Hücrenin ya da atomun ortasındaki temel bölüm.", ornek: "Fen dersinde hücrenin çekirdeğini mikroskopla inceleme fırsatı bulduk." },
      { tur: "mecaz", tanim: "Bir şeyin özünü oluşturan temel bölüm.", ornek: "Kulübün çekirdeğini, ilk günden beri çalışan birkaç öğrenci oluşturuyor." },
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
    kelime: "çember",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Merkeze eşit uzaklıktaki noktaların oluşturduğu kapalı eğri.", ornek: "Matematik dersinde pergelle defterime düzgün bir çember çizdim." },
      { tur: "gerçek", tanim: "Bir şeyin çevresini saran demir halka.", ornek: "Fıçının çevresindeki demir çember paslandığı için yenisiyle hemen değiştirildi." },
      { tur: "mecaz", tanim: "Kuşatma, sıkışıp kalınan durum.", ornek: "Sorular karşısında bunalan aday, dar bir çembere girdiğini hissetti." },
    ],
  },
  {
    kelime: "çene",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağzın alt ve üst bölümünü oluşturan kemik.", ornek: "Topla oynarken düştüğü için çenesi birkaç gün boyunca ağrıdı." },
      { tur: "mecaz", tanim: "Konuşma, konuşkanlık.", ornek: "Çenesi hiç durmayan arkadaşım bütün yolculuk boyunca anılarını anlattı." },
    ],
  },
  {
    kelime: "çevirmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi döndürmek, yönünü değiştirmek.", ornek: "Anahtarı kilitte iki kez çevirince kapı sonunda açıldı." },
      { tur: "terim", tanim: "Bir dildeki metni başka bir dile aktarmak.", ornek: "Şiiri İngilizceden Türkçeye çeviren yazar, kitabı okurlarla buluşturdu." },
      { tur: "mecaz", tanim: "Etrafını kuşatmak, sarmak.", ornek: "Bahçeyi çeviren yüksek çit, sokaktan içerisini görmemizi tamamen engelliyordu." },
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
    kelime: "çığ",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dağ yamacından hızla kayan büyük kar kütlesi.", ornek: "Çığ düşen yolu ekipler ancak akşama doğru trafiğe açabildi." },
      { tur: "mecaz", tanim: "Hızla büyüyüp yayılan olay ya da durum.", ornek: "Küçük bir söylenti okulda kısa sürede çığ gibi büyüdü." },
    ],
  },
  {
    kelime: "çıkmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İçeriden dışarıya gitmek.", ornek: "Zil çalınca bütün öğrenciler sırayla sınıftan bahçeye çıktı." },
      { tur: "gerçek", tanim: "Yukarıya doğru yükselmek, tırmanmak.", ornek: "Asansör bozulunca dördüncü kata merdivenlerden yürüyerek çıkmak zorunda kaldık." },
      { tur: "mecaz", tanim: "Yayımlanmak, satışa sunulmak.", ornek: "Çok sevdiğim yazarın yeni kitabı önümüzdeki hafta çıkacakmış." },
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
    kelime: "çiğ",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Pişmemiş veya yeterince pişmemiş.", ornek: "Tavuk içeriden çiğ kaldığı için birkaç dakika daha pişirdik." },
      { tur: "mecaz", tanim: "Gözü rahatsız eden, göze batan (renk).", ornek: "Odanın duvarındaki çiğ renk gözümüzü fena hâlde rahatsız etti." },
      { tur: "mecaz", tanim: "Görgüsüz, kaba davranan.", ornek: "Misafirlere karşı çiğ davranışları yüzünden herkes ona bir hayli kırıldı." },
    ],
  },
  {
    kelime: "çirkin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Güzel olmayan, göze hoş görünmeyen.", ornek: "Bahçedeki çirkin duvarı öğrenciler renkli resimlerle kısa sürede güzelleştirdi." },
      { tur: "mecaz", tanim: "Hoş olmayan, yakışık almayan (davranış veya söz).", ornek: "Arkadaşının arkasından konuşması gerçekten çok çirkin bir davranıştı." },
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
    kelime: "çizmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kalemle çizgi ya da şekil yapmak.", ornek: "Defterine cetvelle düzgün bir üçgen çizdi ve içini boyadı." },
      { tur: "gerçek", tanim: "Yazılmış bir şeyi silmek, geçersiz saymak.", ornek: "Öğretmen listede yanlış yazılan adı kalemle çizip yeniden yazdı." },
      { tur: "mecaz", tanim: "Sözle betimlemek, canlandırmak.", ornek: "Yazar, romanında köy yaşamının çok gerçekçi bir tablosunu çiziyor." },
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
    kelime: "çorak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Verimli olmayan, ürün vermeyen (toprak).", ornek: "Köyün doğusundaki çorak topraklarda yıllardır hiçbir ürün yetişmiyor." },
      { tur: "mecaz", tanim: "Yeni ve güzel şeylerin ortaya çıkmadığı, kısır.", ornek: "Sanat açısından çorak geçen yıllardan sonra şehir yeniden canlandı." },
    ],
  },
  {
    kelime: "çukur",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Çevresine göre alçakta kalan yer, oyuk.", ornek: "Yoldaki çukurlar yağmurdan sonra suyla ağzına kadar dolmuştu." },
      { tur: "gerçek", tanim: "Çökük, içeriye doğru girmiş.", ornek: "Uzun hastalıktan sonra yüzü solmuş, gözleri iyice çukur görünüyordu." },
      { tur: "mecaz", tanim: "İçinden çıkılması güç, kötü durum.", ornek: "Borçlar yüzünden düştüğü çukurdan kurtulması tam üç yılını aldı." },
    ],
  },
  {
    kelime: "çürük",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bozulmuş, çürümüş.", ornek: "Sepetteki çürük elmaları ayıklayıp diğerlerini buzdolabına özenle yerleştirdik." },
      { tur: "gerçek", tanim: "Sağlam olmayan, dayanıksız.", ornek: "Çürük merdivenden çıkarken basamaklardan biri ayağımızın altında kırıldı." },
      { tur: "mecaz", tanim: "Dayanağı olmayan, inandırıcılıktan uzak.", ornek: "Geç kalma nedeni olarak söylediği çürük bahaneye kimse inanmadı." },
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
    kelime: "dal",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağacın gövdesinden ayrılan kollardan her biri.", ornek: "Kuşlar, bahçedeki kiraz ağacının dallarına küçük bir yuva yapmış." },
      { tur: "mecaz", tanim: "Bilim, sanat ya da iş alanı, kol.", ornek: "Ablam üniversitede tarih dalında yüksek lisans yapmaya karar verdi." },
    ],
  },
  {
    kelime: "damar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kanın vücutta dolaştığı ince boru.", ornek: "Doktor iğneyi yapmadan önce kolumdaki damarı dikkatle aradı." },
      { tur: "terim", tanim: "Yer katmanları arasındaki maden ya da taş tabakası.", ornek: "Madenciler kayanın içinde ince bir kömür damarı buldu." },
      { tur: "mecaz", tanim: "Kişinin belirgin huyu, mizacı.", ornek: "Onun inatçı damarı tutunca kimse fikrini kolay kolay değiştiremiyor." },
    ],
  },
  {
    kelime: "damga",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin üzerine basılan işaret, mühür.", ornek: "Görevli memur, verdiğimiz dilekçenin altına kurumun damgasını özenle bastı." },
      { tur: "mecaz", tanim: "Silinmeyen iz, kalıcı etki.", ornek: "Bu buluş, çağa damgasını vuran en önemli gelişmelerden biriydi." },
      { tur: "mecaz", tanim: "Kişiye yakıştırılan olumsuz nitelik.", ornek: "Bir kez yalan söyleyen çocuğa yalancı damgası haksızca vuruldu." },
    ],
  },
  {
    kelime: "damla",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yuvarlak biçimde düşen küçük sıvı parçası.", ornek: "Camdaki yağmur damlaları yavaş yavaş aşağıya doğru süzülüyordu." },
      { tur: "mecaz", tanim: "Çok az miktar.", ornek: "Anlattıklarında bir damla gerçeklik bile yoktu, hepsini sonradan uydurmuştu." },
    ],
  },
  {
    kelime: "dar",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Genişliği az olan.", ornek: "Köyün dar sokaklarından arabayla geçmek epeyce zor oluyordu." },
      { tur: "mecaz", tanim: "Yeterli olmayan, kısıtlı.", ornek: "Ödevi bu kadar dar bir sürede bitirmemiz mümkün değil." },
      { tur: "mecaz", tanim: "Anlayışı ve hoşgörüsü sınırlı olan.", ornek: "Dar görüşlü davrananlar yeni fikirleri kolay kolay kabul etmez." },
    ],
  },
  {
    kelime: "darbe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vuruş, çarpma.", ornek: "Kaza sırasında aldığı darbe yüzünden kolu birkaç hafta alçıda kaldı." },
      { tur: "mecaz", tanim: "Sarsıcı ve kötü etki bırakan olay.", ornek: "Sevdiği takımın küme düşmesi onun için büyük bir darbe oldu." },
    ],
  },
  {
    kelime: "dayanmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere yaslanmak.", ornek: "Yürüyüşten yorulunca bahçedeki duvara dayanıp birkaç dakika soluklandık." },
      { tur: "gerçek", tanim: "Zorluğa katlanmak, karşı koymak.", ornek: "Bu soğuğa ince bir montla dayanmak gerçekten çok güç olacak." },
      { tur: "mecaz", tanim: "Bir yere ulaşmak, gelip çatmak.", ornek: "Misafirler haber vermeden kapıya dayanınca hepimiz birden şaşırıp kaldık." },
    ],
  },
  {
    kelime: "değer",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin önemi, kıymeti.", ornek: "Dedemin saatinin bizim için maddi değil manevi bir değeri var." },
      { tur: "terim", tanim: "Bir değişkenin aldığı sayısal karşılık.", ornek: "Denklemde x yerine üç yazınca ifadenin değeri on oldu." },
      { tur: "mecaz", tanim: "Üstün nitelikleriyle önem taşıyan kişi.", ornek: "Ünlü yazar, ülkemizin yetiştirdiği en önemli değerlerden biri sayılıyor." },
    ],
  },
  {
    kelime: "demir",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Dayanıklı, gri renkli bir maden.", ornek: "İnşaatta kullanılacak demir çubuklar kamyonla sabah erkenden şantiyeye taşındı." },
      { tur: "mecaz", tanim: "Çok güçlü, sarsılmaz.", ornek: "Demir gibi bir iradesi olduğu için hedefinden asla vazgeçmedi." },
      { tur: "terim", tanim: "Gemiyi bir yerde tutmak için suya bırakılan çengel.", ornek: "Gemi limana yaklaşınca kaptan demir atma emrini hemen verdi." },
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
    kelime: "derece",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıcaklık ölçmeye yarayan alet, termometre.", ornek: "Annem ateşimi ölçmek için dereceyi koltuğumun altına dikkatle yerleştirdi." },
      { tur: "terim", tanim: "Sıcaklık ya da açı ölçü birimi.", ornek: "Hava bugün sıfırın altında beş dereceye kadar düştü." },
      { tur: "mecaz", tanim: "Bir işte ulaşılan basamak, aşama.", ornek: "Yarışmada birinciliği alarak okulumuza büyük bir derece kazandırdı." },
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
    kelime: "diken",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bazı bitkilerin sivri ve batıcı uzantısı.", ornek: "Gülü koparırken parmağıma batan diken canımı epeyce yaktı." },
      { tur: "mecaz", tanim: "Rahatsızlık veren, huzursuz eden durum.", ornek: "Sonucu beklerken diken üstünde oturmuş, saatlerce yerinde duramamıştı." },
    ],
  },
  {
    kelime: "dikkat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şey üzerinde duyguları ve düşünceleri yoğunlaştırma; özen.", ornek: "Sınavda her soruyu dikkatle okumalıyız." },
      { tur: "gerçek", tanim: "\"Dikkat ediniz!\" anlamında kullanılan bir uyarma sözü (ünlem).", ornek: "Dikkat, merdivenler yeni yıkandı; tutamağa tutunarak yavaşça aşağı inin!" },
      { tur: "mecaz", tanim: "İlgi, özen.", ornek: "Öğretmenimiz sınıftaki her öğrencisine ayrı bir dikkat gösteriyor." },
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
    kelime: "dinlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Duymak için kulak vermek.", ornek: "Öğrenciler öğretmenin anlattığı masalı büyük bir merakla dinledi." },
      { tur: "mecaz", tanim: "Söz tutmak, verilen öğüde uymak.", ornek: "Annesinin öğüdünü dinlediği için sınavda hiç heyecanlanmadan soruları çözdü." },
      { tur: "terim", tanim: "Kulakla veya dinleme aletiyle hastayı muayene etmek.", ornek: "Doktor, göğsümü dinledikten sonra ilaç yazmaya karar verdi." },
    ],
  },
  {
    kelime: "dip",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin en alt bölümü.", ornek: "Denizin dibinden topladığımız renkli taşları büyük bir kavanoza doldurduk." },
      { tur: "mecaz", tanim: "En geride, en sonda bulunan yer.", ornek: "Takımımız puan tablosunun dibinden zorlu maçlar kazanarak yavaşça kurtuldu." },
    ],
  },
  {
    kelime: "diri",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşayan, canlı.", ornek: "Ağdan çıkardığımız balıkların bir kısmı kovanın içinde hâlâ diriydi." },
      { tur: "gerçek", tanim: "Gevşememiş, sıkı ve taze.", ornek: "Manavdan aldığımız diri sebzeler birkaç gün boyunca tazeliğini korudu." },
      { tur: "mecaz", tanim: "Canlılığını yitirmemiş, güçlü.", ornek: "Dedemin çocukluk anıları belleğinde bugün bile capcanlı ve diri duruyor." },
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
    kelime: "dokunmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Değmek, elini sürmek.", ornek: "Sergideki tabloya dokunmak yasak olduğu için uzaktan bakmakla yetindik." },
      { tur: "gerçek", tanim: "Sağlığı bozmak, zarar vermek.", ornek: "Akşam yediğim ağır yemek gece bana fena hâlde dokundu." },
      { tur: "mecaz", tanim: "Duygulandırmak, üzmek.", ornek: "Arkadaşımın söylediği o kırıcı sözler bana gerçekten çok dokundu." },
    ],
  },
  {
    kelime: "dolmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İçi bir şeyle kaplanmak, boş kalmamak.", ornek: "Yağmur yağınca bahçedeki kova kısa sürede suyla doldu." },
      { tur: "gerçek", tanim: "Belirlenen süre tamamlanmak, bitmek.", ornek: "Kütüphaneden aldığım kitabın iade süresi bu akşam doluyor." },
      { tur: "mecaz", tanim: "Öfke ya da üzüntü birikmek.", ornek: "Haksızlıkları görünce içi doldu, sonunda düşüncelerini herkese açıkça söyledi." },
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
    kelime: "doruk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dağın en yüksek noktası, zirve.", ornek: "Dağcılar uzun bir tırmanıştan sonra doruğa sabaha karşı ulaştı." },
      { tur: "mecaz", tanim: "Bir şeyin en üst, en ileri noktası.", ornek: "Sanatçı, kariyerinin doruğundayken sahneye veda etme kararı aldı." },
    ],
  },
  {
    kelime: "dökmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvı ya da taneli bir şeyi bir yere akıtmak.", ornek: "Bardaktaki suyu yanlışlıkla masanın üzerine dökünce hemen bir bezle sildim." },
      { tur: "gerçek", tanim: "Üzerindekileri bırakmak, atmak.", ornek: "Sonbahar gelince ağaçlar yapraklarını döküp kışa hazırlanmaya yavaşça başlar." },
      { tur: "mecaz", tanim: "İçinde biriken duyguları anlatmak.", ornek: "Uzun zamandır sakladığı derdini sonunda arkadaşına içini dökerek anlattı." },
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
    kelime: "durgun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Hareketsiz, dalgasız.", ornek: "Sabah saatlerinde göl ayna gibi durgun ve sessizdi." },
      { tur: "mecaz", tanim: "Neşesiz, sessiz, isteksiz.", ornek: "Bugün nedense çok durgunsun, seni üzen bir şey mi oldu?" },
      { tur: "mecaz", tanim: "Sönük, hareketsiz, canlılığını yitirmiş olan.", ornek: "Kış aylarında sahildeki esnafın işleri oldukça durgun geçiyor." },
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
      { tur: "gerçek", tanim: "Duyularla algılama; his.", ornek: "Uzun süre kar topu oynayınca parmaklarımdaki duygu tamamen kayboldu." },
    ],
  },
  {
    kelime: "düğüm",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İpin bağlanmasıyla oluşan sıkı bağ.", ornek: "Ayakkabımın bağcığında oluşan sıkı düğümü çözmek epeyce zamanımı aldı." },
      { tur: "mecaz", tanim: "Çözülmesi güç sorun.", ornek: "Aramızdaki bu düğümü ancak karşılıklı ve içten konuşarak çözebiliriz." },
      { tur: "terim", tanim: "Olayların karıştığı, merakın arttığı bölüm.", ornek: "Öyküdeki düğüm, kahramanın gerçeği öğrendiği bölümde çözülmeye başladı." },
    ],
  },
  {
    kelime: "dünya",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzerinde yaşadığımız gezegen.", ornek: "Dünya, Güneş çevresindeki turunu tam bir yılda tamamlıyor." },
      { tur: "mecaz", tanim: "İnsanlar, herkes.", ornek: "Bu davranışını duyarsa dünya âlem sana güler diye korktu." },
      { tur: "mecaz", tanim: "Kişinin duygu ve düşünce evreni.", ornek: "Kitap okurken kendi iç dünyasında bambaşka yollara doğru yol alıyordu." },
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
    kelime: "düşünce",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Akıldan geçen görüş, fikir.", ornek: "Toplantıda herkes bu konudaki düşüncesini sırayla ve açıkça dile getirdi." },
      { tur: "mecaz", tanim: "Kaygı, tasa.", ornek: "Sınav sonuçları açıklanacak diye günlerdir büyük bir düşünce içindeydi." },
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
    kelime: "eğilmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yana doğru bükülmek, eğik duruma gelmek.", ornek: "Yere düşen silgiyi almak için masanın altına doğru eğildi." },
      { tur: "mecaz", tanim: "Bir konuyla yakından ilgilenmek, onun üzerinde çalışmak.", ornek: "Öğretmenimiz sınıfın devamsızlık sorunu üzerine ciddi biçimde eğildi." },
      { tur: "mecaz", tanim: "Baskı karşısında boyun eğmek, direnmekten vazgeçmek.", ornek: "Haksızlıklar karşısında hiçbir zaman eğilmedi, doğru bildiğini sonuna kadar savundu." },
    ],
  },
  {
    kelime: "eğitim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimseye yeni bilgi ve beceriler kazandırma süreci.", ornek: "İyi bir eğitim insanın ufkunu açar." },
      { tur: "terim", tanim: "Eğitim bilimi (bir bilim dalı olarak).", ornek: "Eğitim alanında yapılan yeni araştırmalar, sınıf içi yöntemleri baştan değiştirdi." },
    ],
  },
  {
    kelime: "eğlenmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Hoşça vakit geçirmek, neşelenmek.", ornek: "Doğum günü partisinde arkadaşlarıyla akşama kadar doyasıya eğlendiler." },
      { tur: "mecaz", tanim: "Biriyle alay etmek, onu şakaya almak.", ornek: "Yeni gelen öğrenciyle eğlenmeleri hepimizin canını fena hâlde sıktı." },
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
    kelime: "ekmek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Tahıl unundan yapılan hamurun fırında pişirilmesiyle elde edilen besin.", ornek: "Kahvaltıda sıcak ekmek ile peynir yemeyi çok severim." },
      { tur: "mecaz", tanim: "Geçim, kazanç, yaşamak için gereken gelir.", ornek: "Babam yıllarca bu küçük atölyede ekmeğini alın teriyle kazandı." },
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
      { tur: "terim", tanim: "Sinema alanında, sinema perdesi.", ornek: "Sinemada en ön sıraya oturunca ekran gözümüze çok büyük göründü." },
    ],
  },
  {
    kelime: "ekşi",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Limon veya sirke tadında olan.", ornek: "Bahçeden kopardığımız erikler o kadar ekşiydi ki hiçbirini yiyemedik." },
      { tur: "mecaz", tanim: "Somurtkan, asık, sevimsiz.", ornek: "Sabahtan beri ekşi bir yüzle oturuyor, kimseyle konuşmuyor." },
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
    kelime: "elektrik",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Yüklü parçacıkların hareketinden doğan enerji türü.", ornek: "Fırtına yüzünden mahallenin elektriği akşama kadar kesik kaldı." },
      { tur: "gerçek", tanim: "Bu enerjiyle sağlanan aydınlatma, ışık.", ornek: "Odaya girer girmez elektriği yaktı ve perdeleri sıkıca kapattı." },
      { tur: "mecaz", tanim: "İki kişi arasındaki karşılıklı ilgi ve uyum.", ornek: "İkisi arasında ilk günden beri güçlü bir elektrik vardı." },
    ],
  },
  {
    kelime: "elemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi elekten geçirerek incesini kabasından ayırmak.", ornek: "Annem keki yapmadan önce unu iki kez güzelce eledi." },
      { tur: "mecaz", tanim: "Bir topluluk içinden seçme yaparak ayıklamak.", ornek: "Jüri ilk turda yarışmacıların yarısını eleyerek finale on kişi bıraktı." },
    ],
  },
  {
    kelime: "emek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapmak için harcanan beden veya kafa gücü.", ornek: "Bu evi yıllarca alın teriyle, emekle yaptık." },
      { tur: "gerçek", tanim: "Uzun ve yorucu, özenli çalışma.", ornek: "Bu el işi masa örtüsü tam altı ayımı aldı, büyük emek istedi." },
      { tur: "terim", tanim: "Toplum biliminde, insanın belli bir amaca ulaşmak için giriştiği, hem çevresini hem kendisini değiştiren çalışma süreci.", ornek: "Sanayi devriminden sonra emek, kentlerin yapısını baştan aşağı değiştirdi." },
    ],
  },
  {
    kelime: "emeklemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bebek, elleri ve dizleri üzerinde ilerlemek.", ornek: "Küçük kardeşim henüz yürüyemiyor, evin içinde mutlulukla emekliyor." },
      { tur: "mecaz", tanim: "Bir işte yeni olmak, çok yavaş ilerlemek.", ornek: "Kasabamızda internet altyapısı hâlâ emekliyor, bağlantı sürekli kesiliyor." },
    ],
  },
  {
    kelime: "emmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sıvıyı dudaklarla çekerek içine almak.", ornek: "Kuzu, annesinin yanından ayrılmadan sütünü uzun uzun emiyordu." },
      { tur: "gerçek", tanim: "Bir madde, sıvıyı gözeneklerine çekmek.", ornek: "Kuru toprak yağan yağmuru kısa sürede emip içine çekti." },
      { tur: "mecaz", tanim: "Birinin emeğini veya malını sömürmek.", ornek: "Aracılar, üreticinin alın terini yıllardır hiç acımadan emip duruyor." },
    ],
  },
  {
    kelime: "engin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Ucu bucağı görünmeyecek kadar geniş olan.", ornek: "Tepeden bakınca engin denizin mavisi gözlerimizi tamamen doldurdu." },
      { tur: "mecaz", tanim: "Çok kapsamlı, sınırsız, derin.", ornek: "Dedemin engin bilgisi sayesinde her sorumuzun cevabını kolayca bulurduk." },
    ],
  },
  {
    kelime: "erimek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Katı bir madde ısı etkisiyle sıvı duruma gelmek.", ornek: "Güneşin altında unuttuğum çikolata birkaç dakika içinde eridi." },
      { tur: "mecaz", tanim: "Azalarak tükenmek, yavaş yavaş bitmek.", ornek: "Biriktirdiğimiz para tatil masrafları yüzünden bir haftada eridi." },
      { tur: "mecaz", tanim: "Üzüntü veya hastalıktan zayıflamak.", ornek: "Uzun süren hastalıktan sonra komşumuz iyice eriyip zayıfladı." },
    ],
  },
  {
    kelime: "eritmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Katı bir maddeyi ısıtarak sıvı duruma getirmek.", ornek: "Tereyağını küçük bir tavada erittikten sonra hamura yavaşça ekledik." },
      { tur: "mecaz", tanim: "Bir şeyi harcayarak bitirmek, tüketmek.", ornek: "Aylardır biriktirdiği bütün harçlığını tek bir günde alışverişte eritmiş." },
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
    kelime: "esir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Savaşta düşmanın eline geçen kimse, tutsak.", ornek: "Savaş bitince esir düşen askerler törenle ülkelerine geri gönderildi." },
      { tur: "mecaz", tanim: "Bir şeye ya da kimseye aşırı bağımlı olan.", ornek: "Telefonunun esiri olmuş, eski arkadaşlarıyla artık hiç görüşmüyor." },
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
    kelime: "eskimek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kullanılmaktan yıpranmak, yeniliğini yitirmek.", ornek: "Kışın giydiğim botlar iki yıl içinde iyice eskidi." },
      { tur: "mecaz", tanim: "Bir işte uzun yıllar çalışıp yıpranmak, yaşlanmak.", ornek: "Bu meslekte eskimiş bir usta olduğu her hareketinden belliydi." },
      { tur: "mecaz", tanim: "Etkisini ve geçerliliğini yitirmek.", ornek: "Bu tartışma çoktan eskidi, artık yeni konulara geçmeliyiz." },
    ],
  },
  {
    kelime: "esmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Rüzgâr, hava akımı hâlinde hareket etmek.", ornek: "Akşam serinliğinde denizden hafif bir meltem esiyor, yapraklar kımıldıyordu." },
      { tur: "mecaz", tanim: "Birdenbire akla gelmek, canı istemek.", ornek: "Aklına esti, gece yarısı bavulunu toplayıp yola çıktı." },
    ],
  },
  {
    kelime: "esnek",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kolayca eğilip bükülen, sonra eski biçimine dönen.", ornek: "Bu lastik top çok esnek olduğu için hiç kırılmıyor." },
      { tur: "mecaz", tanim: "Katı olmayan, duruma göre değişebilen.", ornek: "Müdürümüz esnek bir yönetici, herkesin mazeretini dikkatle dinliyor." },
    ],
  },
  {
    kelime: "esnemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yorgunluk veya uykusuzluk yüzünden ağız istemsizce açılmak.", ornek: "Ders boyunca esneyip durdu, herhâlde gece geç yatmıştı." },
      { tur: "gerçek", tanim: "Gerilerek uzamak, biçim değiştirmek.", ornek: "Çamaşır ipi ıslak halıların ağırlığıyla ortasından epeyce esnedi." },
      { tur: "mecaz", tanim: "Katılığını yitirmek, gevşemek.", ornek: "Kurallar sınav haftasında biraz esnedi, herkes rahat bir nefes aldı." },
    ],
  },
  {
    kelime: "eşik",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kapı boşluğunun alt yanındaki alçak basamak.", ornek: "Misafirler eşikte ayakkabılarını çıkarıp gülümseyerek içeri girdi." },
      { tur: "mecaz", tanim: "Bir şeyin başlangıcı, sınırı.", ornek: "Liseye başlarken hayatımızın yeni bir eşiğinde olduğumuzu hissettik." },
      { tur: "terim", tanim: "Bir etkinin duyulmaya başladığı en düşük değer.", ornek: "Bu sesin şiddeti insan kulağının işitme eşiğinin çok altındadır." },
    ],
  },
  {
    kelime: "etek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Belden aşağısını örten kadın giysisi.", ornek: "Bayramda annesinin diktiği çiçekli eteği büyük bir sevinçle giydi." },
      { tur: "gerçek", tanim: "Bir giysinin belden aşağıda kalan bölümü.", ornek: "Yağmurda koşarken paltosunun eteği baştan aşağı çamura bulanmıştı." },
      { tur: "mecaz", tanim: "Dağ veya tepenin alt bölümü.", ornek: "Köyümüz karlı dağın eteğinde kurulmuş küçük bir yerleşim yeri." },
    ],
  },
  {
    kelime: "etki",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin veya nesnenin başka bir kimse veya nesne üzerinde bıraktığı iz.", ornek: "Annenin sözleri çocuğun üzerinde derin bir etki bıraktı." },
      { tur: "gerçek", tanim: "Bir etken veya bir sebebin sonucu.", ornek: "İlacın etkisi yarım saatte başladı, baş ağrım tamamen geçti." },
      { tur: "mecaz", tanim: "Bir kimse üzerinde bırakılan izlenim.", ornek: "Yeni öğretmenimiz ilk dersinde hepimizde çok olumlu bir etki bıraktı." },
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
    kelime: "ezber",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir metni okumadan söyleyebilecek biçimde akılda tutma.", ornek: "Şiiri ezberden okuyunca öğretmen onu sınıfın önünde tebrik etti." },
      { tur: "mecaz", tanim: "Alışılmış, kalıplaşmış düşünce ve davranış biçimi.", ornek: "Yeni antrenör takımın yıllardır süren ezberini tek maçta bozdu." },
    ],
  },
  {
    kelime: "ezik",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Basınç altında kalarak biçimi bozulmuş olan.", ornek: "Çantanın dibinde kalan şeftaliler ezik olduğu için hiç yenmedi." },
      { tur: "gerçek", tanim: "Bir yerin ezilmesiyle oluşan iz, bere.", ornek: "Merdivenden düştüğünde dizinde kalan ezik günlerce geçmedi." },
      { tur: "mecaz", tanim: "Kendine güveni olmayan, çekingen.", ornek: "Sürekli eleştirilen çocuk zamanla ezik bir kişiliğe bürünüyor." },
    ],
  },
  {
    kelime: "ezmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bastırarak biçimini bozmak.", ornek: "Patatesleri haşladıktan sonra çatalla iyice ezip püre yaptık." },
      { tur: "gerçek", tanim: "Taşıt, üzerinden geçerek zarar vermek.", ornek: "Sürücü, yola fırlayan kediyi ezmemek için son anda fren yaptı." },
      { tur: "mecaz", tanim: "Baskı altına alarak güçsüz duruma düşürmek.", ornek: "Güçlü takım rakibini ilk yarıda ezip sahadan farklı ayrıldı." },
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
    kelime: "fırça",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Boya sürmeye veya temizlemeye yarayan, kıllı araç.", ornek: "Ressam ince fırçasıyla tablonun ayrıntılarını büyük bir sabırla tamamladı." },
      { tur: "mecaz", tanim: "Sert azarlama, paylama.", ornek: "Ödevini yapmadığı için öğretmeninden güzel bir fırça yedi." },
    ],
  },
  {
    kelime: "fırın",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İçinde yiyecek pişirilen, ısıtılabilen kapalı bölme.", ornek: "Annem keki fırına verdi, mutfağa güzel bir koku yayıldı." },
      { tur: "gerçek", tanim: "Ekmek yapılıp satılan iş yeri.", ornek: "Her sabah köşedeki fırından sıcacık ekmek alıp eve dönerim." },
      { tur: "mecaz", tanim: "Dayanılmayacak kadar sıcak olan yer.", ornek: "Klima bozulunca sınıf öğle saatlerinde tam bir fırına dönmüştü." },
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
    kelime: "fırlatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi elle hızla ve uzağa atmak.", ornek: "Çocuk topu var gücüyle fırlattı, top bahçe duvarını aştı." },
      { tur: "terim", tanim: "Bir aracı motor gücüyle uzaya göndermek.", ornek: "Bilim insanları yeni haberleşme uydusunu bu sabah uzaya fırlattı." },
      { tur: "mecaz", tanim: "Bir sözü öfkeyle ve sertçe söylemek.", ornek: "Kırıcı sözlerini yüzüme fırlatıp kapıyı çarparak odadan çıktı." },
    ],
  },
  {
    kelime: "fırtına",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Genellikle yağmur getiren, çok güçlü esen rüzgâr.", ornek: "Gece çıkan fırtına sahildeki tekneleri birbirine çarpıp hasar verdi." },
      { tur: "mecaz", tanim: "İnsanın içindeki yoğun sıkıntı ve heyecan.", ornek: "Dışarıdan sakin görünse de içinde büyük bir fırtına kopuyordu." },
      { tur: "mecaz", tanim: "Kısa sürede yayılan karışıklık, hareketlilik.", ornek: "Beklenmedik karar, kamuoyunda günlerce süren bir fırtına yarattı." },
    ],
  },
  {
    kelime: "fısıldamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Çok alçak sesle, kulağa yakın konuşmak.", ornek: "Kütüphanede sessizliği bozmamak için sorusunu kulağıma fısıldayarak sordu." },
      { tur: "mecaz", tanim: "Hafif ve sürekli bir ses çıkarmak.", ornek: "Akşam rüzgârı bahçedeki yaprakların arasından geçerken usulca fısıldıyordu." },
      { tur: "mecaz", tanim: "Bir haberi gizlice birilerine ulaştırmak.", ornek: "Toplantıdaki kararı birilerine fısıldamış, haber akşama kadar duyulmuş." },
    ],
  },
  {
    kelime: "fışkırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvı, bir yerden basınçla ve hızla dışarı çıkmak.", ornek: "Patlayan borudan fışkıran su bütün sokağı kısa sürede kapladı." },
      { tur: "gerçek", tanim: "Bitki, topraktan sürgün vererek çıkmak.", ornek: "İlkbaharda yeşil filizler toprağın her yanından fışkırmaya başladı." },
      { tur: "mecaz", tanim: "Bir duygu birdenbire ve güçlü biçimde ortaya çıkmak.", ornek: "Gol atınca gözlerinden sevinç fışkırıyor, sahanın ortasında durmadan zıplıyordu." },
    ],
  },
  {
    kelime: "fidan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yeni yetişmekte olan, ince gövdeli genç ağaç.", ornek: "Okul bahçesine diktiğimiz fidanları her hafta sırayla suluyoruz." },
      { tur: "mecaz", tanim: "Boylu boslu, ince ve genç kimse.", ornek: "Yıllar sonra gördüğüm yeğenim fidan gibi bir delikanlı olmuş." },
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
    kelime: "fren",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hareket hâlindeki taşıtı yavaşlatan veya durduran düzenek.", ornek: "Bisikletin freni tutmayınca yokuş aşağı kontrolünü zor sağladı." },
      { tur: "mecaz", tanim: "Bir şeyi durduran veya engelleyen güç.", ornek: "Ailem gereksiz harcamalarıma bu ay kesin bir fren koydu." },
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
    kelime: "geçirmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bir yerden başka bir yere aktarmak.", ornek: "Çaydanlıktaki sıcak suyu dikkatlice büyük bir tencereye geçirdi." },
      { tur: "gerçek", tanim: "Zamanı bir yerde veya bir işle harcamak.", ornek: "Yaz tatilini dedemlerin köyünde çok keyifli biçimde geçirdik." },
      { tur: "mecaz", tanim: "Bir hastalığı veya olayı yaşayıp atlatmak.", ornek: "Kışın ağır bir grip geçirdiği için haftalarca okula gelemedi." },
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
    kelime: "gelmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere ulaşmak, varmak.", ornek: "Kuzenim yaz tatilinde bize İzmir'den gece otobüsüyle geldi." },
      { tur: "gerçek", tanim: "Sıra veya zaman bakımından erişmek.", ornek: "Sıra bana gelince heyecandan sorumu sormayı tamamen unuttum." },
      { tur: "mecaz", tanim: "Öyle görünmek, öyle sanılmak.", ornek: "Bu soru ilk bakışta bana çok kolay geldi ama çözerken epeyce zorlandım." },
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
    kelime: "genç",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşı ilerlememiş, gençlik çağında olan.", ornek: "Genç öğretmen sınıfa girer girmez herkesin ilgisini üzerine çekti." },
      { tur: "gerçek", tanim: "Gençlik çağında bulunan kimse.", ornek: "Parkta toplanan gençler mahalle için fidan dikme kampanyası başlattı." },
      { tur: "mecaz", tanim: "Yaşına göre dinç ve canlı olan.", ornek: "Dedem yetmiş yaşında ama hâlâ hepimizden daha genç." },
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
    kelime: "gerilemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Geriye doğru gitmek, geri çekilmek.", ornek: "Havlayan köpeği görünce korkarak birkaç adım gerileyip duvara yaslandı." },
      { tur: "mecaz", tanim: "Eski durumundan kötüye gitmek, azalmak.", ornek: "Antrenmanları aksatınca takımın başarısı ikinci yarıda hızla geriledi." },
    ],
  },
  {
    kelime: "gerilim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin gergin olma durumu.", ornek: "İpin gerilimi azalınca çamaşırlar ortadan aşağı doğru sarktı." },
      { tur: "terim", tanim: "Bir iletkenin uçları arasındaki potansiyel farkı, voltaj.", ornek: "Prizdeki gerilim aniden düşünce buzdolabı kendiliğinden çalışmayı durdurdu." },
      { tur: "mecaz", tanim: "Kişiler arasındaki tedirgin ve sıkıntılı hava.", ornek: "Toplantıdaki gerilim, herkesin sesini yükseltmesiyle son anda iyice arttı." },
    ],
  },
  {
    kelime: "germek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi iki ucundan çekerek gergin duruma getirmek.", ornek: "Çamaşır asmak için iki ağaç arasına uzun bir ip gerdik." },
      { tur: "mecaz", tanim: "Birini sinirlendirmek, huzursuz etmek.", ornek: "Sürekli sorduğu anlamsız sorularla bütün sınıfı fena hâlde gerdi." },
    ],
  },
  {
    kelime: "gevşek",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıkı olmayan, gereğinden fazla boşluğu bulunan.", ornek: "Bisikletin zinciri gevşek olduğu için yolda birkaç kez çıktı." },
      { tur: "mecaz", tanim: "Ağır davranan, isteksiz ve dikkatsiz olan.", ornek: "Bu kadar gevşek çalışırsan projeyi zamanında asla bitiremezsin." },
    ],
  },
  {
    kelime: "girmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Dışarıdan içeriye geçmek.", ornek: "Zili duyunca kapıyı yavaşça açıp sessizce sınıfa girdi." },
      { tur: "gerçek", tanim: "Bir topluluğa veya kuruma katılmak.", ornek: "Kardeşim bu yıl okulun voleybol takımına seçmelerle girdi." },
      { tur: "mecaz", tanim: "Yeni bir duruma veya döneme başlamak.", ornek: "Ülke ekonomisi yeni yılla birlikte zor bir döneme girdi." },
    ],
  },
  {
    kelime: "gitmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere doğru yola çıkmak, yönelmek.", ornek: "Her sabah erkenden kalkıp çantamı alıyor, yürüyerek okula gidiyorum." },
      { tur: "gerçek", tanim: "Bir yol, belli bir yere ulaşmak.", ornek: "Ormanın içinden geçen bu dar patika doğrudan göle gidiyor." },
      { tur: "mecaz", tanim: "Tükenmek, harcanıp bitmek.", ornek: "Bir haftada bütün harçlığım gitti, elimde hiç para kalmadı." },
    ],
  },
  {
    kelime: "gizlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi başkalarının bulamayacağı bir yere koymak.", ornek: "Kardeşine alacağı sürpriz hediyeyi dolabın en üst rafına gizledi." },
      { tur: "mecaz", tanim: "Bir duyguyu veya durumu belli etmemek.", ornek: "Sınavdan düşük aldığını ailesinden günlerce büyük bir özenle gizledi." },
    ],
  },
  {
    kelime: "gizli",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Başkalarından saklanan, açıklanmayan.", ornek: "Arkadaşımın bana anlattığı gizli konuyu bugüne kadar kimseye söylemedim." },
      { tur: "gerçek", tanim: "Görünmeyen, saklı olan.", ornek: "Kitabın kapağının arasında gizli küçük bir not bulduk." },
      { tur: "mecaz", tanim: "Açıkça belli olmayan, sezilen.", ornek: "Sözlerinde gizli bir kırgınlık vardı ama hiç dile getirmedi." },
    ],
  },
  {
    kelime: "göçmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yerden başka bir yere yerleşmek üzere gitmek.", ornek: "Ailesi iş bulmak için yıllar önce büyük şehre göçmüş." },
      { tur: "gerçek", tanim: "Yıkılmak, çökmek.", ornek: "Depremde eski taş duvar bir anda göçüp yerle bir oldu." },
      { tur: "mecaz", tanim: "Ölmek, hayatını yitirmek.", ornek: "Dedem doksan yaşında, bütün sevdiklerinin arasında sessizce göçüp gitti." },
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
    kelime: "gölge",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Saydam olmayan bir cismin ışığı engellemesiyle arkasında oluşan karanlık alan.", ornek: "Öğle sıcağında hepimiz büyük çınarın gölgesine koşarak sığındık." },
      { tur: "mecaz", tanim: "Koruma, destek, kanat altına alma.", ornek: "Yıllarca ağabeyinin gölgesinde büyüdü, hiçbir zorlukla tek başına karşılaşmadı." },
      { tur: "mecaz", tanim: "Bir şeyin çok zayıflamış, etkisiz kalmış hâli.", ornek: "Hastalıktan sonra eski neşeli hâlinin yalnızca gölgesi kalmıştı." },
    ],
  },
  {
    kelime: "gömmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi toprağın altına koyup üstünü örtmek.", ornek: "Çocuklar buldukları kutuyu bahçenin köşesine hazine gibi gömdüler." },
      { tur: "gerçek", tanim: "Ölüyü toprağa koymak, defnetmek.", ornek: "Köylüler yaşlı adamı tepedeki küçük mezarlığa dualarla gömdüler." },
      { tur: "mecaz", tanim: "Bir duyguyu içinde saklayıp kimseye söylememek.", ornek: "Bütün kırgınlıklarını içine gömdü, yıllarca kimseye tek söz etmedi." },
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
    kelime: "görüş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Görme yeteneği veya görülebilen uzaklık.", ornek: "Sabahki yoğun sis yüzünden yoldaki görüş iyice azalmıştı." },
      { tur: "gerçek", tanim: "Birini belirli bir günde ziyaret etme, görüşme.", ornek: "Yatılı okuldaki kuzenimizi görüş gününde ailece ziyaret ettik." },
      { tur: "mecaz", tanim: "Bir konudaki kişisel düşünce, bakış açısı.", ornek: "Toplantıda herkes kitap fuarı hakkındaki görüşünü açıkça anlattı." },
    ],
  },
  {
    kelime: "göstermek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin görülmesini sağlamak.", ornek: "Rehber, müzedeki en değerli eseri bize uzaktan gösterdi." },
      { tur: "mecaz", tanim: "Bir şeyi kanıtlamak, ortaya koymak.", ornek: "Aldığın bu güzel sonuç düzenli çalıştığını açıkça gösteriyor." },
      { tur: "mecaz", tanim: "Olduğundan başka türlü görünmek.", ornek: "Annem kırk yaşında ama gören herkese göre yaşını göstermiyor." },
    ],
  },
  {
    kelime: "götürmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi alıp başka bir yere ulaştırmak.", ornek: "Komşumuza sıcak çorbayı tencereyle götürdüm, çok memnun oldu." },
      { tur: "gerçek", tanim: "Birine eşlik ederek onu bir yere ulaştırmak.", ornek: "Babam hafta sonu küçük kardeşimi kontrol için doktora götürecek." },
      { tur: "mecaz", tanim: "Bir sonuca veya duruma ulaştırmak.", ornek: "Bu dikkatsizlik bizi hiç istemediğimiz bir sonuca götürebilir." },
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
    kelime: "güç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapabilme yeteneği, kuvvet.", ornek: "Kapağı açacak gücü kendinde bulamayınca ağabeyinden yardım istedi." },
      { tur: "terim", tanim: "Bir cismin birim zamanda yaptığı iş miktarı.", ornek: "Bir motorun gücü, fizik dersinde vat adlı birimle hesaplanır." },
      { tur: "mecaz", tanim: "Bir kişi veya kurumun etkinliği, sözünün geçerliliği.", ornek: "Basının toplum üzerindeki gücü her geçen gün biraz daha artıyor." },
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
    kelime: "gülmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sevinç belirtisi olarak yüz hareketiyle ses çıkarmak.", ornek: "Kardeşimin akşam anlattığı fıkraya hepimiz gözyaşları içinde güldük." },
      { tur: "mecaz", tanim: "Biriyle alay etmek, onu küçümsemek.", ornek: "Yanlış cevap verince arkadaşlarının gülmesi onu çok üzdü." },
      { tur: "mecaz", tanim: "Talih yardım etmek, işler yolunda gitmek.", ornek: "Yıllarca uğraştı, sonunda talih yüzüne güldü ve kazandı." },
    ],
  },
  {
    kelime: "gün",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dünya'nın kendi çevresinde bir kez dönmesiyle geçen süre.", ornek: "Bir hafta yedi günden oluşur, bunu ilkokulda öğrenmiştik." },
      { tur: "gerçek", tanim: "Güneşin doğuşundan batışına kadar geçen süre, gündüz.", ornek: "Gün ağarırken çobanlar sürüyü otlağa doğru sürmeye başladı." },
      { tur: "mecaz", tanim: "Belli bir zaman dilimi, dönem.", ornek: "O zor günler geride kaldı, artık çok daha rahatız." },
    ],
  },
  {
    kelime: "gürültü",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hoşa gitmeyen, düzensiz ve yüksek ses.", ornek: "İnşaattan gelen gürültü yüzünden bütün gece gözümüzü kırpmadık." },
      { tur: "mecaz", tanim: "Kavga, tartışma, karışıklık.", ornek: "Maç sonunda çıkan gürültü ancak polisin gelmesiyle yatıştırıldı." },
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
    kelime: "hafıza",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Öğrenilenleri ve yaşananları akılda tutma gücü, bellek.", ornek: "Öğretmenimiz güçlü hafızası sayesinde bütün öğrencilerin adını hatırlıyor." },
      { tur: "terim", tanim: "Bilgisayarda ve elektronik aygıtlarda bilgilerin saklandığı bölüm.", ornek: "Telefonun hafızası dolunca yeni fotoğraf çekmek mümkün olmadı." },
      { tur: "mecaz", tanim: "Bir toplumun geçmişine ait ortak birikimi, ortak bellek.", ornek: "Bir milletin hafızası, yazdığı ve okuduğu kitaplarda saklı kalır." },
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
    kelime: "hain",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Güvenilen bir kişiye ya da ülkeye ihanet eden kimse.", ornek: "Ordudan bilgi sızdıran hain, mahkemede yaptıklarının hesabını verdi." },
      { tur: "mecaz", tanim: "İnsana büyük zarar veren, acımasız olan.", ornek: "Hain bir hastalık dedemi çok kısa sürede yatağa düşürdü." },
      { tur: "mecaz", tanim: "Kötülük düşünen, sinsi olan.", ornek: "Masaldaki hain vezir, padişahı tahttan indirmek için gizli planlar kuruyordu." },
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
    kelime: "hâkim",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "terim", tanim: "Mahkemede davaları inceleyip karara bağlayan görevli, yargıç.", ornek: "Hâkim, duruşmanın sonunda verdiği kararı yüksek sesle okudu." },
      { tur: "gerçek", tanim: "Bir yeri yukarıdan gören, üstten bakan.", ornek: "Tepedeki kale, bütün vadiye hâkim bir noktaya kurulmuş." },
      { tur: "mecaz", tanim: "Bir konuyu çok iyi bilen, konuya egemen olan.", ornek: "Öğretmen konusuna hâkim olduğu için soruları rahatça yanıtladı." },
    ],
  },
  {
    kelime: "halka",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Daire biçiminde, ortası boş olan nesne.", ornek: "Perdeyi asmak için demir halkaları çubuğa tek tek geçirdik." },
      { tur: "gerçek", tanim: "Zinciri oluşturan parçaların her biri.", ornek: "Zincirin kopan halkasını usta birkaç dakika içinde yerine taktı." },
      { tur: "mecaz", tanim: "Bir bütünü oluşturan aşamalardan her biri.", ornek: "Bu buluş, uzun bir araştırma zincirinin son halkası oldu." },
    ],
  },
  {
    kelime: "hamle",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İleriye doğru birden yapılan atılış, atak.", ornek: "Kaleci son anda yaptığı hamleyle topu kornere çelmeyi başardı." },
      { tur: "terim", tanim: "Satranç, dama gibi oyunlarda taşı bir kez oynatma.", ornek: "Rakibinin son hamlesi, oyunun bütün dengesini bir anda değiştirdi." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için yapılan büyük girişim, atılım.", ornek: "Ülke, eğitimde büyük bir hamle yaparak okul sayısını artırdı." },
    ],
  },
  {
    kelime: "hamur",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Un, su ve mayanın yoğrulmasıyla elde edilen karışım.", ornek: "Annem hamuru yoğurduktan sonra üzerini temiz bir bezle örttü." },
      { tur: "gerçek", tanim: "İyi pişmemiş, içi yapış yapış kalmış olan.", ornek: "Fırından erken çıkardığımız için ekmeğin ortası hamur kalmıştı." },
      { tur: "mecaz", tanim: "Bir kimsenin yaratılışı, kişilik yapısı.", ornek: "Her insanın hamuru başkadır; kimi çabucak öfkelenir, kimi hiç kızmaz." },
    ],
  },
  {
    kelime: "harcamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Parayı bir şey için vermek, elden çıkarmak.", ornek: "Biriktirdiği bütün parayı yeni bir bisiklet almak için harcadı." },
      { tur: "gerçek", tanim: "Bir şeyi belli bir amaç için kullanıp tüketmek.", ornek: "Bu ödevi hazırlamak için tam üç günümü harcadım ama değdi." },
      { tur: "mecaz", tanim: "Bir kimseyi gözden çıkarmak, boşa kullanıp yıpratmak.", ornek: "Takım, yetenekli genç oyuncuyu daha ilk maçta harcamış oldu." },
    ],
  },
  {
    kelime: "hareket",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir varlığın bulunduğu yeri değiştirmesi, kımıldaması.", ornek: "Yerdeki yaprakların hareketinden rüzgârın hangi yönden estiğini anladık." },
      { tur: "gerçek", tanim: "Bir kimsenin tutumu, davranışı.", ornek: "Küçük kardeşine karşı yaptığı bu hareket hepimizi çok üzdü." },
      { tur: "gerçek", tanim: "Bir taşıtın yola çıkması, kalkması.", ornek: "Otobüsümüzün terminalden hareket etmesine sadece on dakika kalmıştı." },
      { tur: "mecaz", tanim: "Bir alanda görülen canlanma, kıpırdanma.", ornek: "Bayram öncesinde çarşıda büyük bir hareket başladı, bütün dükkânlar dolup taştı." },
    ],
  },
  {
    kelime: "hassas",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "En küçük etkiyi bile algılayabilen, duyarlı.", ornek: "Bu hassas terazi, bir gramın onda birini bile ölçebiliyor." },
      { tur: "mecaz", tanim: "Çabuk duygulanan, ince duygulu olan.", ornek: "Kardeşim çok hassas olduğu için o filmde gözyaşlarını tutamadı." },
      { tur: "mecaz", tanim: "Özen ve dikkat isteyen, nazik olan.", ornek: "Bu hassas konuyu konuşurken kelimelerimizi dikkatle seçmemiz gerektiğini biliyorduk." },
    ],
  },
  {
    kelime: "hasta",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sağlığı bozulmuş olan, iyi durumda olmayan kimse.", ornek: "Hasta olan çocuk bütün gün yatağından hiç kalkamadı." },
      { tur: "mecaz", tanim: "Bir şeye aşırı derecede düşkün olan.", ornek: "Kuzenim tam bir kitap hastası, harçlığını kitapçıda bitiriyor." },
      { tur: "mecaz", tanim: "Bozulmuş, düzgün çalışmayan.", ornek: "Arabanın motoru hasta, uzun yola çıkmadan mutlaka bir baktıralım." },
    ],
  },
  {
    kelime: "hat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Çizgi.", ornek: "Öğretmen tahtadaki iki nokta arasına düz bir hat çizdi." },
      { tur: "gerçek", tanim: "Telefon, elektrik gibi hizmetlerin ulaştığı bağlantı yolu.", ornek: "Fırtına yüzünden telefon hattı iki gün boyunca kesik kaldı." },
      { tur: "terim", tanim: "Güzel yazı yazma sanatı.", ornek: "Camideki yazıları ünlü bir hat ustası büyük özenle yazmış." },
      { tur: "mecaz", tanim: "Bir konuda izlenen yol, tutum, çizgi.", ornek: "Yönetim, tartışmalar boyunca yumuşak bir hat izlemeyi tercih etti." },
    ],
  },
  {
    kelime: "hatır",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin gönlü, duyguları.", ornek: "Söylediği sert sözlerle arkadaşının hatırını kırdığını sonradan anladı." },
      { tur: "gerçek", tanim: "Akıl, düşünce; hatırlama gücü.", ornek: "Karşımdaki adamın adı bir türlü hatırıma gelmedi, çok sıkıldım." },
      { tur: "mecaz", tanim: "Saygı ve nezaket gösterilmeye değer olma durumu, itibar.", ornek: "Dedemin hatırı için o uzun yolculuğu seve seve göze aldık." },
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
    kelime: "hazır",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapmaya uygun duruma gelmiş olan.", ornek: "Bütün eşyalar toplandı, ailece yola çıkmaya artık hazırız." },
      { tur: "gerçek", tanim: "Önceden yapılmış, kullanıma sunulmuş olan.", ornek: "Annem bugün çok yorgun olduğu için hazır çorba ısıttı." },
      { tur: "mecaz", tanim: "Fırsat elverdiği için, madem ki.", ornek: "Hazır buraya kadar gelmişken dedemi de ziyaret edip gidelim." },
    ],
  },
  {
    kelime: "hazine",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Altın, mücevher gibi değerli şeylerin saklandığı yer ya da birikim.", ornek: "Dalgıçlar batık gemide yüzyıllardır bekleyen bir hazine buldular." },
      { tur: "terim", tanim: "Devletin para ve mal varlığını yöneten kurum.", ornek: "Toplanan vergilerin tamamı devlet hazinesine aktarıldıktan sonra harcanıyormuş." },
      { tur: "mecaz", tanim: "Çok değerli, çok yararlı olan kişi ya da şey.", ornek: "Sabırlı bir öğretmen, bir okul için gerçek bir hazinedir." },
    ],
  },
  {
    kelime: "hazmetmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yenen yiyecekleri midede sindirmek.", ornek: "Akşam yediğimiz ağır yemeği hazmetmek epeyce zamanımızı aldı." },
      { tur: "mecaz", tanim: "Hoşa gitmeyen bir durumu kabullenip içine sindirmek.", ornek: "Takımımız sahasında aldığı bu ağır yenilgiyi bir türlü hazmedemedi." },
      { tur: "mecaz", tanim: "Öğrenilen bilgiyi iyice anlayıp özümsemek.", ornek: "Konuyu hazmetmeden yeni soru çözmeye geçmen sana zarar verir." },
    ],
  },
  {
    kelime: "hedef",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Nişan alınıp vurulmak istenen nokta.", ornek: "Okçu, yayını gerdi ve hedefin tam ortasını vurmayı başardı." },
      { tur: "mecaz", tanim: "Ulaşılmak istenen amaç, gaye.", ornek: "Bu yıl hedefim, istediğim liseyi kazanıp ailemi mutlu etmek." },
      { tur: "mecaz", tanim: "Eleştirinin ya da saldırının yöneldiği kişi.", ornek: "Takımın kaptanı, yenilgiden sonra taraftarların hedefi hâline geldi." },
    ],
  },
  {
    kelime: "hesap",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Sayılarla yapılan işlem, aritmetik.", ornek: "Bakkal aldığımız ürünlerin hesabını kâğıt üzerinde hızlıca yaptı." },
      { tur: "gerçek", tanim: "Bankada bir kişi adına açılan para kaydı.", ornek: "Babam maaşını her ay aynı bankadaki hesabına yatırıyormuş." },
      { tur: "mecaz", tanim: "Önceden yapılan plan, tasarı.", ornek: "Bütün hesaplarımız, hava yağmurlu olunca bir anda alt üst oldu." },
    ],
  },
  {
    kelime: "heyecan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sevinç, üzüntü, korku gibi nedenlerle ortaya çıkan ani ve güçlü duygu.", ornek: "Sınav öncesi heyecanını yenmesi gerekiyor." },
      { tur: "terim", tanim: "Felsefede, coşku.", ornek: "Kalabalığın hep bir ağızdan söylediği marştaki heyecan hepimize geçti." },
    ],
  },
  {
    kelime: "hız",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Bir cismin birim zamanda aldığı yol.", ornek: "Aracın hızı şehir içinde saatte elli kilometreyi geçmemeliydi." },
      { tur: "gerçek", tanim: "Çabukluk, sürat.", ornek: "Yağmur başlayınca adımlarımızın hızını artırıp eve doğru koştuk." },
      { tur: "mecaz", tanim: "Bir işin ilerleme temposu, gelişme derecesi.", ornek: "Teknolojinin gelişme hızına ayak uydurmak her geçen yıl zorlaşıyor." },
    ],
  },
  {
    kelime: "hızlı",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Çabuk, kısa zamanda; yavaş karşıtı.", ornek: "Hızlı tren saatte üç yüz kilometre yapar." },
      { tur: "gerçek", tanim: "Güç kullanarak (zarf).", ornek: "Kapıyı hızlı kapatınca duvardaki fotoğraf çerçevesi yere düştü." },
      { tur: "mecaz", tanim: "Çok hareketli olan.", ornek: "Kuzenim çok hızlı biri; her akşam başka bir arkadaş grubuyla buluşuyor." },
    ],
  },
  {
    kelime: "hikâye",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Yaşanmış ya da yaşanabilir olayları anlatan kısa yazı türü, öykü.", ornek: "Ömer Seyfettin'in yazdığı hikâyeleri bir solukta okuyup bitirdim." },
      { tur: "gerçek", tanim: "Bir olayın anlatılması ya da olayın kendisi.", ornek: "Dedem, gençliğinde yaşadığı o unutulmaz hikâyeyi bize tekrar anlattı." },
      { tur: "mecaz", tanim: "Asılsız söz, uydurma.", ornek: "Geç kalmasının sebebi olarak anlattığı şey baştan sona hikâyeydi." },
    ],
  },
  {
    kelime: "hisse",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bütünden ayrılan pay, bölüm.", ornek: "Mirastan her kardeşe eşit bir hisse düştüğü toplantıda söylendi." },
      { tur: "terim", tanim: "Bir şirketin sermayesinin bölündüğü paylardan her biri.", ornek: "Amcam biriktirdiği parayla o şirketin hisselerinden birkaç tane aldı." },
      { tur: "mecaz", tanim: "Bir olaydan çıkarılan ders, ibret.", ornek: "Bu üzücü olaydan hepimiz kendimize göre bir hisse çıkarmalıyız." },
    ],
  },
  {
    kelime: "huy",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kimsenin yaratılışından gelen davranış özelliği, mizaç.", ornek: "Kardeşimin sakin huyu bütün akrabalarımız tarafından çok beğeniliyor." },
      { tur: "gerçek", tanim: "Sonradan kazanılmış alışkanlık.", ornek: "Tırnak yeme huyundan kurtulmak için aylarca uğraşmak zorunda kaldı." },
      { tur: "mecaz", tanim: "Bir aracın ya da nesnenin alışılmış çalışma özelliği.", ornek: "Bu eski arabanın huyunu ancak yıllar sonra tam olarak öğrenebildim." },
    ],
  },
  {
    kelime: "huzur",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İç rahatlığı, gönül dinginliği.", ornek: "Kitap okurken bulduğu huzuru başka hiçbir işte bulamıyordu." },
      { tur: "gerçek", tanim: "Bir büyüğün ya da yetkilinin yanı, önü.", ornek: "Sanık, hâkimin huzuruna çıkarak olayı baştan sona anlattı." },
      { tur: "mecaz", tanim: "Bir yerin sakin ve güvenli ortamı.", ornek: "Köyün huzuru, ana yola yapılan o büyük fabrikayla birlikte bozuldu." },
    ],
  },
  {
    kelime: "hücre",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Canlıların en küçük yapı ve görev birimi.", ornek: "Fen dersinde mikroskopla soğan zarındaki hücreleri tek tek inceledik." },
      { tur: "gerçek", tanim: "Cezaevinde ya da manastırda bulunan küçük, tek kişilik oda.", ornek: "Mahkûm, cezasının bir bölümünü dar bir hücrede geçirdi." },
      { tur: "mecaz", tanim: "Bir topluluğun ya da örgütün en küçük birimi.", ornek: "Aile, toplumun temel hücresi sayıldığı için çok önemsenir." },
    ],
  },
  {
    kelime: "hücum",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Saldırı, birinin üzerine atılma.", ornek: "Düşman ordusu şafak vakti ansızın büyük bir hücuma geçti." },
      { tur: "terim", tanim: "Takım oyunlarında rakip kaleye yönelme, atak.", ornek: "Takımımız ikinci yarıda hücuma ağırlık verip iki gol attı." },
      { tur: "mecaz", tanim: "Bir yere toplu hâlde ve hızla üşüşme.", ornek: "İndirimler başlayınca müşteriler mağazanın raflarına adeta hücum etti." },
    ],
  },
  {
    kelime: "hüküm",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Mahkemenin bir dava sonunda verdiği karar, yargı.", ornek: "Mahkeme, aylarca süren duruşmaların ardından hükmünü sonunda açıkladı." },
      { tur: "gerçek", tanim: "Bir konuda varılan sonuç, verilen değerlendirme.", ornek: "Bir insan hakkında onu tanımadan hüküm vermek çok yanlıştır." },
      { tur: "mecaz", tanim: "Etkisini sürdürme, egemen olma.", ornek: "Bu dağlık bölgede kış, nisan ayına kadar hükmünü sürdürür." },
    ],
  },
  {
    kelime: "ılık",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Ne sıcak ne soğuk olan, az sıcak.", ornek: "Çayı ılık olduğu için bir dikişte içip bardağı bıraktı." },
      { tur: "gerçek", tanim: "Havası ne sıcak ne soğuk olan.", ornek: "Bahar akşamlarında ılık bir rüzgâr bütün sahili boydan boya dolaşıyordu." },
      { tur: "mecaz", tanim: "Ne çok istekli ne tamamen soğuk olan, ölçülü.", ornek: "Önerimize ılık bir karşılık verdiler ama kesin bir söz vermediler." },
    ],
  },
  {
    kelime: "ısı",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Bir cismin sıcaklığını yükselten enerji türü.", ornek: "Sobadan yayılan ısı kısa sürede bütün odayı sarıp ısıttı." },
      { tur: "gerçek", tanim: "Bir ortamın sıcaklığı.", ornek: "Odanın ısısı düşünce üzerimize kalın bir battaniye almak zorunda kaldık." },
      { tur: "mecaz", tanim: "İnsanlar arasındaki yakınlık, içtenlik, sıcak ilgi.", ornek: "Bu evin ısısı, sobadan değil, içindeki insanlardan geliyordu." },
    ],
  },
  {
    kelime: "ısınmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıcaklığı artmak, sıcak duruma gelmek.", ornek: "Güneş yükselince deniz suyu öğleye doğru iyice ısınmıştı." },
      { tur: "terim", tanim: "Spor öncesinde vücudu harekete hazır duruma getirmek.", ornek: "Futbolcular maçtan yarım saat önce sahada ısınmaya başladılar." },
      { tur: "mecaz", tanim: "Bir kimseye ya da bir işe yakınlık duymaya başlamak.", ornek: "Yeni öğretmenimize daha ilk haftadan sonra hepimiz iyice ısındık." },
    ],
  },
  {
    kelime: "ısırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Dişlerle bir şeyi sıkmak ya da koparmak.", ornek: "Elmayı ısırdığı anda dişinin ağrıdığını fark edip durdu." },
      { tur: "gerçek", tanim: "Böcek ya da hayvan, dişleyerek acıtmak.", ornek: "Bahçedeki sivrisinekler bütün gece kollarımızı ısırıp uykumuzu kaçırdı." },
      { tur: "mecaz", tanim: "Soğuk, keskin bir biçimde etkilemek, acı vermek.", ornek: "Sabahın ayazı yüzümüzü ısırırken okulun yolunu yürüyerek tuttuk." },
    ],
  },
  {
    kelime: "ıskalamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Nişan alınan hedefi vuramamak.", ornek: "Oyuncu ceza sahasının içinden vurduğu topla kaleyi ıskaladı." },
      { tur: "mecaz", tanim: "Eldeki fırsatı kaçırmak, değerlendirememek.", ornek: "Bu güzel fırsatı ıskaladığı için günlerce kendine kızıp durdu." },
      { tur: "mecaz", tanim: "Bir şeyi fark edememek, gözden kaçırmak.", ornek: "Sorunun asıl istediği bilgiyi ıskalayınca yanlış seçeneği işaretlemiş." },
    ],
  },
  {
    kelime: "ıslık",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dudakları büzerek çıkarılan ince ve keskin ses.", ornek: "Köpeğini çağırmak için parmaklarıyla uzun bir ıslık çaldı." },
      { tur: "gerçek", tanim: "Beğenme ya da beğenmeme belirtisi olarak çalınan ses.", ornek: "Seyirciler oyunun sonunda hakemi ıslıklarla protesto etmeye başladı." },
      { tur: "mecaz", tanim: "Rüzgârın ya da hızlı geçen bir şeyin çıkardığı ince ses.", ornek: "Fırtına gece boyunca pencerelerin önünde ıslık çalıp durdu." },
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
    kelime: "iç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin yüzeyinin altı, ortası.", ornek: "Cevizin içi çok lezzetliydi." },
      { tur: "mecaz", tanim: "Yürek, gönül; insanın duygu dünyası.", ornek: "İçim sıkıldı, dışarı çıkmak istiyorum." },
      { tur: "gerçek", tanim: "Bir mekanın kapalı bölümü.", ornek: "Yağmur başlayınca evin içine geçtik." },
    ],
  },
  {
    kelime: "ifade",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir düşünceyi söz ya da yazıyla anlatma, anlatım.", ornek: "Duygularını ifade ederken uygun kelimeyi bulmakta epeyce zorlandığı belliydi." },
      { tur: "gerçek", tanim: "Yüzün aldığı anlam, yüz görünüşü.", ornek: "Notunu öğrendiğinde yüzündeki mutlu ifade bir anda değişiverdi." },
      { tur: "terim", tanim: "Matematikte sayı, harf ve işlem işaretleriyle oluşturulan gösterim.", ornek: "Öğretmen tahtadaki cebirsel ifadeyi adım adım sadeleştirmemizi istedi." },
      { tur: "mecaz", tanim: "Bir şeyin taşıdığı anlam ve değer.", ornek: "Bu küçük hediye, benim için maddi değerinden çok daha fazlasını ifade ediyor." },
    ],
  },
  {
    kelime: "iğne",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dikiş dikmeye yarayan, ucu sivri ince araç.", ornek: "Düğmeyi dikmek için iğneye ipliği geçirmeye epeyce uğraştım." },
      { tur: "terim", tanim: "Vücuda şırıngayla ilaç verme işi, enjeksiyon.", ornek: "Hemşire iğneyi o kadar yavaş yaptı ki hiç canım yanmadı." },
      { tur: "mecaz", tanim: "Karşısındakini kıran, dokunaklı söz.", ornek: "Sohbet sırasında söylediği iğneler arkadaşını fena hâlde üzdü." },
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
    kelime: "iklim",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Bir yerde uzun yıllar boyunca görülen ortalama hava durumu.", ornek: "Akdeniz iklimi, yazları sıcak ve kurak geçmesiyle bilinir." },
      { tur: "mecaz", tanim: "Bir ortamın genel havası, atmosferi.", ornek: "Toplantıya hâkim olan gergin iklim karar almayı iyice zorlaştırdı." },
    ],
  },
  {
    kelime: "ilaç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hastalıkları iyileştirmek için kullanılan madde.", ornek: "Doktorun yazdığı ilacı günde iki kez içmesi gerekiyormuş." },
      { tur: "gerçek", tanim: "Zararlı böcek ve otları yok etmek için kullanılan madde.", ornek: "Çiftçi, tarladaki zararlı otlara karşı ilaç kullanmak zorunda kaldı." },
      { tur: "mecaz", tanim: "Bir sıkıntıyı gideren şey, çare.", ornek: "Bu güzel haber, günlerdir süren üzüntümüze ilaç gibi geldi." },
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
    kelime: "ilerlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bulunduğu yerden öne doğru gitmek.", ornek: "Kalabalık, cadde boyunca yavaş yavaş meydana doğru ilerledi." },
      { tur: "mecaz", tanim: "Gelişmek, daha iyi bir duruma gelmek.", ornek: "Düzenli çalışınca matematikte kısa sürede epeyce ilerlediğini fark etti." },
      { tur: "mecaz", tanim: "Zaman geçmek, sonuna doğru yaklaşmak.", ornek: "Gece iyice ilerlediği hâlde misafirler hâlâ kalkmayı düşünmüyordu." },
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
    kelime: "imza",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yazının altına kişinin kendi adına attığı özel işaret.", ornek: "Babam veli toplantısı kâğıdını okuyup altına imzasını attı." },
      { tur: "mecaz", tanim: "Bir sanatçının eserinde görülen kendine özgü üslubu.", ornek: "Bu resimdeki renk kullanımı ustanın imzasını açıkça taşıyordu." },
      { tur: "mecaz", tanim: "Tanınmış, adı bilinen kişi.", ornek: "Derginin bu sayısında edebiyat dünyasının tanınmış imzaları yer alıyor." },
    ],
  },
  {
    kelime: "inat",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir konuda direnme, ayak direme.", ornek: "Yağmura rağmen dışarı çıkmakta inat etti, sonunda hasta oldu." },
      { tur: "gerçek", tanim: "Düşüncesinden kolay kolay vazgeçmeyen kimse.", ornek: "İnat çocuk, dediğinden akşama kadar bir türlü vazgeçmedi." },
      { tur: "mecaz", tanim: "Bir durumun bıkkınlık verecek biçimde sürüp gitmesi.", ornek: "Yağmurun inadı yüzünden piknik planımız üçüncü kez ertelendi." },
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
    kelime: "inmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüksek bir yerden aşağıya doğru gelmek.", ornek: "Merdivenlerden inerken elindeki bardağı düşürmemeye çok dikkat etti." },
      { tur: "gerçek", tanim: "Bir taşıttan dışarı çıkmak.", ornek: "Otobüsten indiğimizde bizi karşılamaya gelen dedemi hemen gördük." },
      { tur: "mecaz", tanim: "Azalmak, düşmek.", ornek: "Hava düzelince sebze fiyatları beklenmedik biçimde indi." },
    ],
  },
  {
    kelime: "ip",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Liflerin bükülmesiyle elde edilen uzun, ince bağ.", ornek: "Kutuyu sağlam bir iple bağlayıp kargoya teslim ettik." },
      { tur: "gerçek", tanim: "Çamaşır asmak için gerilen ip ya da tel.", ornek: "Annem yıkadığı çarşafları bahçedeki ipe tek tek astı." },
      { tur: "mecaz", tanim: "Bir işi yönetme, elinde tutma gücü.", ornek: "Toplantının iplerini baştan sona müdür yardımcısı elinde tuttu." },
    ],
  },
  {
    kelime: "isim",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir varlığı tanıtmaya yarayan söz, ad.", ornek: "Yeni doğan kardeşime dedemin ismini vermeye karar verdiler." },
      { tur: "terim", tanim: "Dil bilgisinde varlıkları karşılayan sözcük türü.", ornek: "Öğretmen, cümledeki isimlerin altını renkli kalemle çizmemizi istedi." },
      { tur: "mecaz", tanim: "Ün, şöhret, tanınmışlık.", ornek: "Genç yazar, ilk romanıyla edebiyat dünyasında kısa sürede isim yaptı." },
    ],
  },
  {
    kelime: "iskelet",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Vücuttaki kemiklerin oluşturduğu yapı.", ornek: "Fen dersinde insan iskeletini maket üzerinde tek tek inceledik." },
      { tur: "gerçek", tanim: "Bir yapıyı ayakta tutan taşıyıcı çatı.", ornek: "Binanın demir iskeleti tamamlanınca duvar örmeye başlayacaklarını söylediler." },
      { tur: "mecaz", tanim: "Bir eserin ya da planın ana çatısı.", ornek: "Yazar, romanın iskeletini kurduktan sonra ayrıntılar üzerinde çalışmış." },
    ],
  },
  {
    kelime: "iş",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sonuç elde etmek için yapılan çalışma, emek.", ornek: "Bahçedeki bu işi bitirmek neredeyse bütün günümüzü aldı." },
      { tur: "gerçek", tanim: "Geçim sağlamak için yapılan görev, meslek.", ornek: "Babam yeni işine başlayalı henüz iki hafta bile olmadı." },
      { tur: "mecaz", tanim: "Sorun, mesele, karışık durum.", ornek: "İş, kimsenin beklemediği kadar büyüyünce araya büyükler girmek zorunda kaldı." },
    ],
  },
  {
    kelime: "işaret",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir anlam yüklenen şekil ya da im.", ornek: "Yol kenarındaki işaret, virajın çok tehlikeli olduğunu gösteriyordu." },
      { tur: "gerçek", tanim: "El, göz ya da başla yapılan anlatım hareketi.", ornek: "Konuşmadan, yalnızca eliyle işaret ederek dışarı çıkmamızı istedi." },
      { tur: "mecaz", tanim: "Bir şeyin olacağını gösteren belirti.", ornek: "Gökyüzündeki kara bulutlar, yağmurun yaklaştığının açık bir işaretiydi." },
    ],
  },
  {
    kelime: "işlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İğne ve iplikle süsleme yapmak, nakış yapmak.", ornek: "Babaannem yastık kılıfının kenarına küçük kırmızı çiçekler işledi." },
      { tur: "gerçek", tanim: "Makine ya da organ çalışmak, görevini yapmak.", ornek: "Eski saat, pili değiştirildikten sonra yeniden düzgün işlemeye başladı." },
      { tur: "mecaz", tanim: "Bir konuyu ayrıntılı biçimde ele alıp anlatmak.", ornek: "Yazar, bu romanında dostluk konusunu çok başarılı biçimde işlemiş." },
    ],
  },
  {
    kelime: "iştah",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yemek yeme isteği.", ornek: "Hastalıktan sonra iştahı iyice açıldı, tabağını tertemiz bitirdi." },
      { tur: "mecaz", tanim: "Bir şeyi elde etmeye duyulan güçlü istek, heves.", ornek: "Kazandığı ödül, onun çalışma iştahını daha da artırmış görünüyordu." },
    ],
  },
  {
    kelime: "itmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi ileri doğru götürmek için güç uygulamak.", ornek: "Arabası bozulunca hep birlikte iterek yol kenarına çektik." },
      { tur: "mecaz", tanim: "Bir kimseyi istemediği bir duruma sürüklemek.", ornek: "Yanlış arkadaşlıklar onu hiç istemediği bir hayata doğru itti." },
      { tur: "mecaz", tanim: "Kendinden uzaklaştırmak, soğutmak.", ornek: "Sert ve alaycı tavırları, kendisine yaklaşan herkesi ondan itiyordu." },
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
    kelime: "izin",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işin yapılabilmesi için verilen onay.", ornek: "Öğretmeninden izin almadan sınıfın dışına adım atmak bile istemedi." },
      { tur: "gerçek", tanim: "Çalışanlara verilen dinlenme süresi.", ornek: "Babam yıllık iznini kullanmak için ağustos ayını seçmiş." },
      { tur: "mecaz", tanim: "Koşulların elverişli olması durumu.", ornek: "Hava izin verirse yarın sabah erkenden yürüyüşe çıkacağız." },
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
    kelime: "jest",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "El, kol ve yüzle yapılan anlatım hareketi.", ornek: "Konuşurken yaptığı jestler anlattığı olayı daha canlı hâle getirdi." },
      { tur: "mecaz", tanim: "İnce, hoş, gönül alıcı davranış.", ornek: "Arkadaşına doğum gününde yaptığı bu jest herkesin hoşuna gitti." },
    ],
  },
  {
    kelime: "jeton",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bazı makinelerde para yerine kullanılan madenî parça.", ornek: "Eski telefonlarda konuşmak için önce kutuya jeton atmak gerekirdi." },
      { tur: "mecaz", tanim: "Bir durumu geç de olsa anlama, kavrama.", ornek: "Şakayı ancak herkes gülünce anladı, jetonu epeyce geç düştü." },
    ],
  },
  {
    kelime: "kaba",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüzeyi pürüzlü, düzgün olmayan.", ornek: "Duvarın kaba yüzeyini zımparalayarak boya için hazır hâle getirdik." },
      { tur: "gerçek", tanim: "Özensiz yapılan, ince işçilik istemeyen.", ornek: "Marangoz önce kaba işleri bitirdi, ince ayrıntıları sonraya bıraktı." },
      { tur: "mecaz", tanim: "Görgü kurallarına uymayan, nezaketsiz.", ornek: "Kaba sözleriyle sofradaki bütün misafirleri bir anda üzdü." },
    ],
  },
  {
    kelime: "kabarmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Şişip hacmi büyümek.", ornek: "Maya çalışınca hamur tencerenin içinde iki katına kadar kabardı." },
      { tur: "gerçek", tanim: "Su yükselip taşacak duruma gelmek.", ornek: "Günlerce süren sağanaktan sonra dere kabardı ve köprüye kadar yükseldi." },
      { tur: "mecaz", tanim: "Gururlanmak, böbürlenmek.", ornek: "Aldığı övgülerle kabarıp arkadaşlarına karşı hava atmaya başladı." },
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
    kelime: "kaçmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bulunduğu yerden hızla uzaklaşmak.", ornek: "Hırsız, polisi görünce arka sokaklara doğru hızla kaçtı." },
      { tur: "gerçek", tanim: "İstenmeyen bir şeyden uzak durmak.", ornek: "Kalabalıktan kaçtığı için tenha bir sahil kasabasına yerleşti." },
      { tur: "mecaz", tanim: "Bir renk başka bir renge benzer duruma gelmek.", ornek: "Aldığımız perdenin rengi maviden çok yeşile kaçtığı için beğenilmedi." },
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
    kelime: "kalabalık",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir arada bulunan çok sayıda insan, insan topluluğu.", ornek: "Meydandaki kalabalık, konser başlayınca hep birlikte alkışlamaya başladı." },
      { tur: "gerçek", tanim: "Sayısı çok olan.", ornek: "Kalabalık bir aileyiz, bayramlarda evimize otuz kişi zor sığıyor." },
      { tur: "mecaz", tanim: "Gereksiz olan, karışıklık yaratan şeyler yığını.", ornek: "Masanın üstündeki kalabalığı topladım, artık rahatça ders çalışabiliyorum." },
    ],
  },
  {
    kelime: "kalem",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yazı yazmaya ve çizmeye yarayan araç.", ornek: "Sınav için yanına iki kurşun kalem ve bir silgi aldı." },
      { tur: "mecaz", tanim: "Yazar, yazma gücü olan kimse.", ornek: "Bu köşeyi ülkenin en güçlü kalemlerinden biri yazıyor." },
      { tur: "terim", tanim: "Bir hesabın ya da bütçenin bölümlerinden her biri.", ornek: "Bütçedeki en büyük kalem yine eğitim harcamalarına ayrılmış." },
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
    kelime: "kalıp",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir nesneye istenen biçimi vermek için kullanılan araç.", ornek: "Pastacı, hamuru yıldız biçimli kalıba döküp fırına verdi." },
      { tur: "gerçek", tanim: "Bir kimsenin dıştan görünüşü, boyu bosu.", ornek: "İri kalıbıyla kapıda durunca içerideki herkes bir anda sustu." },
      { tur: "mecaz", tanim: "Değişmeyen, alışılmış düşünce ve davranış biçimi.", ornek: "Eski kalıpları bir kenara bırakıp soruna yepyeni bir çözüm bulduk." },
    ],
  },
  {
    kelime: "kalkmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bulunduğu yerden doğrulup ayağa dikilmek.", ornek: "Öğretmen sınıfa girince bütün öğrenciler saygıyla ayağa kalktı." },
      { tur: "gerçek", tanim: "Taşıt yola çıkmak, hareket etmek.", ornek: "Ankara treni tam sekizde kalktı, biz son anda yetiştik." },
      { tur: "mecaz", tanim: "Ortadan kaldırılmak, yürürlükten çıkmak.", ornek: "Bu eski yasa kalktı, yerine daha adil bir düzenleme geldi." },
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
    kelime: "kanal",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Suyun akması için açılan yapay su yolu.", ornek: "Tarlaları sulamak için köyün kenarına uzun bir kanal kazdılar." },
      { tur: "terim", tanim: "Radyo ve televizyon yayınlarının verildiği frekans bandı.", ornek: "Maçı hangi kanalın yayımlayacağını öğrenmek için gazeteye baktık." },
      { tur: "mecaz", tanim: "Bir işin ya da haberin izlediği yol.", ornek: "Başvurunuzu resmî kanallardan yaparsanız işlemler çok daha hızlı ilerler." },
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
    kelime: "kapalı",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Açık olmayan, kapatılmış olan.", ornek: "Dükkânın kapısı kapalı olduğu için ekmeği başka fırından aldık." },
      { tur: "gerçek", tanim: "Bulutlarla örtülü olan, güneşsiz.", ornek: "Hava sabahtan beri kapalı, güneş bir kez bile yüzünü göstermedi." },
      { tur: "mecaz", tanim: "Kolayca anlaşılmayan, üstü örtülü anlatılan.", ornek: "Şairin kapalı anlatımı yüzünden şiiri ilk okuyuşta anlayamadık." },
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
    kelime: "kaplamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yüzeyi baştan başa örtmek.", ornek: "Salonun zeminini ceviz renginde parkeyle kaplamak iki gün sürdü." },
      { tur: "gerçek", tanim: "Bir alanı bütünüyle doldurmak, üzerine yayılmak.", ornek: "Sabah kalktığımızda kar bütün bahçeyi ve çatıları kaplamıştı." },
      { tur: "mecaz", tanim: "Bir duygu insanın içini bütünüyle sarmak.", ornek: "Haberi duyunca içimi tarif edilmez bir sevinç kapladı." },
    ],
  },
  {
    kelime: "kapmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi çabucak alıp götürmek.", ornek: "Çocuk masadaki çikolatayı kapıp hızla odasına doğru koşmaya başladı." },
      { tur: "mecaz", tanim: "Bir bilgiyi ya da beceriyi çok çabuk öğrenmek.", ornek: "Yeni şarkının sözlerini iki dinlemede kapmış, ezbere söylüyor." },
      { tur: "mecaz", tanim: "Bir hastalığa yakalanmak.", ornek: "Soğuk havada ince giyinince kısa sürede nezle kaptı." },
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
    kelime: "karanlık",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Işığın olmayışı, ışıksızlık.", ornek: "Elektrikler kesilince bütün ev bir anda koyu bir karanlığa gömüldü." },
      { tur: "mecaz", tanim: "Üzücü, umut vermeyen, kötü.", ornek: "Geleceği karanlık gösteren bu haberler bütün aileyi derinden endişelendirdi." },
      { tur: "mecaz", tanim: "Anlaşılmayan, bilinmeyen, şüpheli.", ornek: "Olayın karanlık kalan yönlerini savcılık ayrıntılı biçimde araştırıyor." },
    ],
  },
  {
    kelime: "karışmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İki veya daha çok şey bir araya gelip birbirinin içine girmek.", ornek: "Boyalar paletin üstünde karışınca ortaya bambaşka bir renk çıktı." },
      { tur: "gerçek", tanim: "Düzeni bozulmak, dağınık duruma gelmek.", ornek: "Rüzgâr esince masadaki bütün kâğıtlar karıştı, sırasını yeniden yaptık." },
      { tur: "mecaz", tanim: "Bir işe gereksiz yere el atmak, müdahale etmek.", ornek: "Başkasının işine karışmadan önce kendi sorumluluklarını yerine getirmelisin." },
    ],
  },
  {
    kelime: "karşılamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Gelen bir kimseyi belli bir yerde beklemek, onu karşılayıcı olarak çıkmak.", ornek: "Dedemi otogarda karşılamak için sabah erkenden yola çıktık." },
      { tur: "mecaz", tanim: "Bir gereksinimi gidermek, yetmek.", ornek: "Bu maaş ailenin bütün masraflarını karşılamaya maalesef yetmiyor." },
      { tur: "mecaz", tanim: "Bir olayı belli bir tepkiyle almak.", ornek: "Öğrenciler yeni kararı alkışlarla karşılayıp öğretmenlerine teşekkür etti." },
    ],
  },
  {
    kelime: "kat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yapının aynı düzeydeki bölümlerinden her biri.", ornek: "Apartmanın en üst katında oturduğumuz için manzaramız çok güzel." },
      { tur: "gerçek", tanim: "Üst üste gelen tabakalardan her biri.", ornek: "Duvara iki kat astar çektikten sonra boyayı sürmeye başladık." },
      { tur: "terim", tanim: "Bir niceliğin belli bir sayıyla çarpılarak kaç defa alındığını gösteren söz, misil.", ornek: "Bu kutunun ağırlığı ötekinin tam üç katı olarak ölçüldü." },
      { tur: "mecaz", tanim: "Bir kurumdaki yetki basamaklarından her biri.", ornek: "Sorunu çözmek için üst katlara başvurmaktan başka bir çare kalmamıştı." },
    ],
  },
  {
    kelime: "katı",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "terim", tanim: "Belirli bir biçimi ve hacmi olan madde durumu.", ornek: "Fen dersinde suyun katı, sıvı ve gaz hâllerini deneyle gördük." },
      { tur: "gerçek", tanim: "Sert, kolayca bükülmeyen ya da ezilmeyen.", ornek: "Bayatlayan ekmek o kadar katıydı ki bıçak zor kesti." },
      { tur: "mecaz", tanim: "Hoşgörüsüz, acımasız.", ornek: "Katı bir yöneticiydi, kimsenin en küçük hatasını bağışlamazdı." },
    ],
  },
  {
    kelime: "kavga",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Karşılıklı dövüşme.", ornek: "Maç sonunda çıkan kavgayı hakemler ve polisler güçlükle ayırabildi." },
      { tur: "gerçek", tanim: "Sözle çekişme, tartışma.", ornek: "İki kardeş oyuncak yüzünden yine uzun bir kavgaya tutuştu." },
      { tur: "mecaz", tanim: "Bir amaca ulaşmak için verilen zorlu uğraş.", ornek: "Babam yıllarca ailesi için zorlu bir ekmek kavgası verdi." },
    ],
  },
  {
    kelime: "kavramak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Elle sıkıca tutmak.", ornek: "Düşmemek için merdivenin demir korkuluğunu iki eliyle sıkıca kavradı." },
      { tur: "gerçek", tanim: "Çevresini sarmak, içine almak.", ornek: "Alevler kısa sürede bütün ahşap evi çepeçevre kavramıştı." },
      { tur: "mecaz", tanim: "Bir konuyu iyice anlamak.", ornek: "Konuyu kavradıktan sonra bütün soruları hiç zorlanmadan çözdü." },
    ],
  },
  {
    kelime: "kavuşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Özlenen birine yeniden ulaşmak, birlikte olmak.", ornek: "Yıllar sonra memleketine dönüp ailesine kavuştuğunda gözleri doldu." },
      { tur: "gerçek", tanim: "İki şey bir noktada birleşmek.", ornek: "Bu iki dere köyün alt tarafında kavuşup tek bir ırmak olur." },
      { tur: "mecaz", tanim: "İstenen bir duruma ya da şeye erişmek.", ornek: "Uzun bir tedaviden sonra sağlığına kavuşup işine geri döndü." },
    ],
  },
  {
    kelime: "kaymak",
    tur: "fiil / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Düz, ıslak veya kaygan bir yüzey üzerinde sürtünerek kolayca yer değiştirmek.", ornek: "Buz tutan kaldırımda kayıp düşmemek için çok yavaş yürüdük." },
      { tur: "gerçek", tanim: "Sütün üzerinde toplanan yağlı tabaka.", ornek: "Sabah kahvaltısında bal ile kaymağı ekmeğin üzerine sürdük." },
      { tur: "mecaz", tanim: "Konudan uzaklaşıp başka bir yöne geçmek.", ornek: "Söz bir anda kaydı, sınavı bırakıp tatil planlarını konuşmaya başladık." },
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
    kelime: "kazanmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Çalışarak para ya da mal elde etmek.", ornek: "Yaz boyunca çalışıp bisiklet almaya yetecek kadar para kazandı." },
      { tur: "gerçek", tanim: "Bir yarışmada veya sınavda başarılı olmak.", ornek: "Uzun süre çalıştı ve istediği liseyi sonunda kazandı." },
      { tur: "mecaz", tanim: "Bir değeri ya da özelliği elde etmek.", ornek: "Bu davranışıyla sınıftaki bütün arkadaşlarının güvenini kısa sürede kazandı." },
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
    kelime: "kenar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin bittiği yer, çevre çizgisi.", ornek: "Bardağı masanın kenarına koyma, birazdan yere düşüp kırılabilir." },
      { tur: "terim", tanim: "Bir çokgeni oluşturan doğru parçalarından her biri.", ornek: "Karenin dört kenarının uzunluğu birbirine eşit olduğu için hesap kolaylaştı." },
      { tur: "mecaz", tanim: "Merkezden uzak, gözden ırak olan yer.", ornek: "Şehrin kenarındaki mahallede küçük ama çok sıcak bir ev tuttular." },
    ],
  },
  {
    kelime: "keskin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İyi kesen, kesici yanı ince olan.", ornek: "Keskin bıçakla doğradığı domatesler tabakta ince ince dizildi." },
      { tur: "mecaz", tanim: "Etkisi güçlü ve rahatsız edici olan, sert.", ornek: "Mutfaktan gelen keskin sirke kokusu bütün eve yayıldı." },
      { tur: "mecaz", tanim: "İyi gören, iyi ayırt eden.", ornek: "Keskin gözleriyle uzaktaki tabelayı hepimizden çok daha önce okudu." },
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
    kelime: "kılavuz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yol gösteren kimse, rehber.", ornek: "Dağa tırmanırken bize deneyimli bir kılavuz eşlik etti." },
      { tur: "gerçek", tanim: "Bir aracın kullanımını anlatan kitapçık.", ornek: "Yeni yazıcıyı kurmadan önce kullanım kılavuzunu baştan sona okudum." },
      { tur: "mecaz", tanim: "İnsana yön veren düşünce ya da ilke.", ornek: "Dedemin verdiği öğütler hayatım boyunca bana kılavuz olmayı sürdürdü." },
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
    kelime: "kısa",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Boyu az olan, uzun karşıtı.", ornek: "Kısa bir ipti, iki sandalyeyi bağlamaya bile yetmedi." },
      { tur: "gerçek", tanim: "Az zaman süren.", ornek: "Kısa bir aradan sonra öğretmen derse kaldığı yerden devam etti." },
      { tur: "mecaz", tanim: "Az sözle anlatılan, özlü.", ornek: "Sunumu kısa tuttu ama anlatmak istediği her şeyi eksiksiz aktardı." },
    ],
  },
  {
    kelime: "kıvılcım",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yanan bir maddeden sıçrayan küçük ateş parçası.", ornek: "Sobadan sıçrayan kıvılcım halının üzerinde küçük bir delik açtı." },
      { tur: "mecaz", tanim: "Büyük bir olayı başlatan küçük etken.", ornek: "Küçük bir tartışma, iki mahalle arasındaki büyük kavganın kıvılcımı oldu." },
      { tur: "mecaz", tanim: "Bir duygunun ya da düşüncenin ilk belirtisi.", ornek: "Gözlerindeki o küçük umut kıvılcımı bütün ekibe yeniden güç verdi." },
    ],
  },
  {
    kelime: "kilit",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kapı ve çekmeceleri kapalı tutmaya yarayan düzenek.", ornek: "Kapının kilidi bozulunca hemen çilingir çağırıp yenisini taktırmak zorunda kaldık." },
      { tur: "mecaz", tanim: "Bir işin sonucunu belirleyen en önemli nokta.", ornek: "Bu sorunun kilit noktası, tarafların birbirini gerçekten dinlemesidir." },
      { tur: "mecaz", tanim: "Bir işin ilerlemesini ya da çözülmesini engelleyen, kolay aşılamayan durum.", ornek: "Olayın kilidi, kaybolan mektubun sandıkta bulunmasıyla birlikte sonunda açıldı." },
    ],
  },
  {
    kelime: "koku",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Burunla alınan duyu.", ornek: "Fırından gelen taze ekmek kokusu bütün sokağı sardı." },
      { tur: "gerçek", tanim: "Güzel kokması için sürülen sıvı, parfüm.", ornek: "Annem özel günlerde en sevdiği kokuyu sürmeyi hiç ihmal etmez." },
      { tur: "mecaz", tanim: "Belirti, iz, sezinti.", ornek: "Anlattıklarında bir yalan kokusu vardı, kimse ona inanmadı." },
    ],
  },
  {
    kelime: "kol",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsan vücudunda omuzdan parmak uçlarına kadar uzanan bölüm.", ornek: "Kolunu kırınca iki ay boyunca alçıyla dolaşmak zorunda kaldı." },
      { tur: "gerçek", tanim: "Giysinin kolu saran bölümü.", ornek: "Gömleğin kollarını dirseğine kadar sıvayıp bulaşıkları yıkamaya başladı." },
      { tur: "mecaz", tanim: "Bir kuruluşun bölümü, şubesi.", ornek: "Derneğin gençlik kolu, hafta sonu için büyük bir kitap kampanyası düzenledi." },
    ],
  },
  {
    kelime: "koltuk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Arkalıklı ve kolçaklı, yumuşak oturma eşyası.", ornek: "Dedem akşamları pencere kenarındaki koltukta gazete okumayı çok severdi." },
      { tur: "gerçek", tanim: "Kolun gövdeyle birleştiği çukur bölge.", ornek: "Çantasını koltuğunun altına sıkıştırıp koşa koşa otobüse son anda yetişti." },
      { tur: "mecaz", tanim: "Görev, makam, mevki.", ornek: "Koltuk sevdasına kapılanlar çoğu zaman doğruları söylemekten kaçınır." },
    ],
  },
  {
    kelime: "kopmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir bütünden ayrılmak, ikiye bölünmek.", ornek: "Salıncağın eski ipi kopunca çocuk çimenlerin üstüne yumuşak bir şekilde düştü." },
      { tur: "gerçek", tanim: "Şiddetli bir doğa olayı birdenbire başlamak.", ornek: "Akşama doğru şiddetli bir fırtına koptu, ağaçlar devrildi." },
      { tur: "mecaz", tanim: "Bir kimseyle ya da yerle ilişkisi kesilmek.", ornek: "Başka şehre taşındıktan sonra eski arkadaşlarından yavaş yavaş tamamen koptu." },
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
    kelime: "koşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Adımlarını hızlandırarak hızlı biçimde ilerlemek.", ornek: "Otobüsü kaçırmamak için durağa kadar var gücüyle koştu." },
      { tur: "mecaz", tanim: "Bir yere ya da birine hemen yetişmek, yardıma gitmek.", ornek: "Komşusunun bağırdığını duyar duymaz hiç düşünmeden onun yardımına koştu." },
      { tur: "mecaz", tanim: "Bir şeyi şart olarak ileri sürmek, eklemek.", ornek: "Ödünç verdiği kitabı bir hafta içinde geri istemeyi şart koştu." },
    ],
  },
  {
    kelime: "kök",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bitkilerin toprak altında kalan, besin alan bölümü.", ornek: "Fidanın köklerini zedelemeden çukura yerleştirip üstünü toprakla örttük." },
      { tur: "terim", tanim: "Bir kelimenin anlamlı en küçük parçası.", ornek: "Kitapçı kelimesinin kökü kitap, geri kalanı yapım ekidir." },
      { tur: "mecaz", tanim: "Bir şeyin temeli, çıkış noktası.", ornek: "Sorunun köküne inmeden bulunan çözümler hiçbir zaman kalıcı olmuyor." },
    ],
  },
  {
    kelime: "köprü",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir engelin iki yakasını birleştiren geçit yapısı.", ornek: "Nehrin üzerine yapılan yeni köprü iki köyü birbirine bağladı." },
      { tur: "terim", tanim: "Sırtüstü yatarken el ve ayaklarla gövdeyi yukarı kaldırma hareketi.", ornek: "Beden dersinde köprü hareketini yaparken beline dikkat etmesi söylendi." },
      { tur: "mecaz", tanim: "İki şey arasında bağlantı kuran unsur.", ornek: "Öğretmenler, geçmişle gelecek arasında sağlam bir köprü kurar." },
    ],
  },
  {
    kelime: "kör",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Görme engeli olan, göremeyen.", ornek: "Kör olan komşumuz, sesleri duyarak sokakta kolayca yolunu buluyor." },
      { tur: "gerçek", tanim: "Kesme özelliğini yitirmiş, kesmez.", ornek: "Kör makasla kâğıt kesmeye çalışınca kenarlar hep yırtık çıktı." },
      { tur: "mecaz", tanim: "Gerçekleri görmek istemeyen, anlayışsız.", ornek: "Kör bir inatla direniyor, kimsenin haklı uyarılarını dinlemek istemiyordu." },
    ],
  },
  {
    kelime: "köşe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Birbirini kesen iki çizginin ya da yüzeyin oluşturduğu yer.", ornek: "Masanın köşesine çarpınca dizinde büyük bir morluk oluştu." },
      { tur: "gerçek", tanim: "İki yolun birleştiği yer, dönemeç.", ornek: "Sokağın köşesindeki bakkaldan bir ekmekle bir kutu süt aldık." },
      { tur: "mecaz", tanim: "Gazete ve dergilerde bir yazara ayrılan sürekli bölüm.", ornek: "Yazar, bu haftaki köşesinde okuma alışkanlığından uzun uzun söz etti." },
    ],
  },
  {
    kelime: "kucaklamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kollarını dolayarak birini sarmak.", ornek: "Uzun yoldan gelen ablasını kapıda görünce koşup sımsıkı kucakladı." },
      { tur: "gerçek", tanim: "Bir şeyi kollarıyla taşımak için almak.", ornek: "Yerdeki odunları kucaklayıp sobanın yanına birer birer özenle yığdı." },
      { tur: "mecaz", tanim: "Herkesi ya da her şeyi içine almak, benimsemek.", ornek: "Bu proje şehirdeki bütün gençleri kucaklamayı ve onlara ulaşmayı amaçlıyor." },
    ],
  },
  {
    kelime: "kural",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir konuda uyulması gereken ilke, yasa.", ornek: "Trafik kurallarına uymak yaşamı korur." },
      { tur: "gerçek", tanim: "Bir sanata, bir bilime veya bir düşünce sistemine temel olan, yön veren ilke; kaide, usul.", ornek: "Bu şiir, aruz ölçüsünün kurallarına titizlikle uyularak yazılmış." },
    ],
  },
  {
    kelime: "kurmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Parçaları birleştirerek bir şeyi oluşturmak.", ornek: "Kamp yerine varınca çadırı yarım saatte kurup eşyaları içine taşıdık." },
      { tur: "gerçek", tanim: "Bir kuruluş ya da düzen oluşturmak.", ornek: "Dedem bu fabrikayı yıllar önce iki ortağıyla birlikte kurmuş." },
      { tur: "mecaz", tanim: "Zihninde tasarlamak, düşünüp planlamak.", ornek: "Bütün gün tatil için hayaller kurup gideceği yerleri not etti." },
    ],
  },
  {
    kelime: "kurtulmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Tehlikeli bir durumdan sağ olarak çıkmak.", ornek: "Denizde akıntıya kapılan çocuk, cankurtaran sayesinde boğulmaktan kurtuldu." },
      { tur: "mecaz", tanim: "Sıkıntı veren bir durumdan uzaklaşmak.", ornek: "Erken kalkma alışkanlığı sayesinde sabah telaşından tamamen kurtuldu." },
      { tur: "mecaz", tanim: "İstenmeyen bir şeyi üzerinden atmak.", ornek: "Dolaptaki eski eşyalardan kurtulunca odası çok daha ferah göründü." },
    ],
  },
  {
    kelime: "kuru",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Suyu ya da nemi olmayan.", ornek: "Yağmur yağmadığı için topraklar kuru, bahçedeki çiçekler solmuş." },
      { tur: "gerçek", tanim: "Suyu çekilerek saklanabilir duruma getirilmiş.", ornek: "Kışın kuru fasulye pişirmek için yazdan hazırlık yaparız." },
      { tur: "mecaz", tanim: "İçten olmayan, sevgisiz ve ilgisiz.", ornek: "Sorulara kuru cevaplar verince kimse onunla sohbet etmek istemedi." },
    ],
  },
  {
    kelime: "kuşak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bele sarılan uzun ve enli kumaş.", ornek: "Yörük kıyafetinin beline renkli bir kuşak sarıp oyuna katıldı." },
      { tur: "gerçek", tanim: "Yaklaşık aynı yıllarda doğmuş kişiler topluluğu, nesil.", ornek: "Dedemin kuşağı bizden çok daha zor şartlarda büyümüş." },
      { tur: "terim", tanim: "Yeryüzünde benzer iklim özellikleri gösteren geniş bölge.", ornek: "Ülkemiz ılıman kuşakta yer aldığı için dört mevsimi de yaşar." },
      { tur: "mecaz", tanim: "Bir yeri kemer gibi çevreleyen şerit biçimindeki alan.", ornek: "Şehri çevreleyen yeşil kuşak, havayı temizlemek amacıyla yıllar önce oluşturulmuş." },
    ],
  },
  {
    kelime: "kuşatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yeri çepeçevre sarıp dışarıyla bağlantısını kesmek.", ornek: "Ordu, kaleyi günlerce kuşatıp içeriye yiyecek girmesini engelledi." },
      { tur: "gerçek", tanim: "Bir şeyin çevresini sarmak, etrafını çevirmek.", ornek: "Bahçeyi kuşatan yüksek çitler sokaktan içerinin görünmesini engelliyor." },
      { tur: "mecaz", tanim: "Bir duygu ya da düşünce insanı sarmak.", ornek: "Sınav yaklaştıkça hepimizi tarifsiz bir heyecan kuşatmaya başladı." },
    ],
  },
  {
    kelime: "kuvvet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapabilme gücü, dayanıklılık.", ornek: "Ağır çuvalı kaldırmaya kuvveti yetmeyince kardeşinden yardım etmesini istedi." },
      { tur: "terim", tanim: "Bir cismin durumunu ya da hareketini değiştiren etki.", ornek: "Fen dersinde cisme uygulanan kuvvetin yönünü okla gösterdik." },
      { tur: "mecaz", tanim: "Bir şeyin etkileme ve inandırma gücü.", ornek: "Sözlerinin kuvveti sayesinde bütün dinleyicileri kolayca ikna etti." },
    ],
  },
  {
    kelime: "kuyruk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hayvanların gövdesinin arka ucundaki uzantı.", ornek: "Köpek bizi kapıda görünce sevinçle kuyruğunu sallamaya başladı." },
      { tur: "gerçek", tanim: "Bir şeyin arka bölümü.", ornek: "Uçağın kuyruk kısmındaki koltuklar boş kaldığı için oraya geçtik." },
      { tur: "mecaz", tanim: "Sıra bekleyen insanların oluşturduğu dizi.", ornek: "Bilet almak için gişenin önünde uzun bir kuyruk oluşmuştu." },
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
    kelime: "laf",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Söz, konuşma.", ornek: "Toplantıda söylediği o kısa laf herkesin aklında kaldı." },
      { tur: "mecaz", tanim: "Boş, yararsız söz.", ornek: "Laf değil iş istiyoruz, konuşmakla bu sorun çözülmez." },
      { tur: "mecaz", tanim: "Dedikodu, arkadan söylenen söz.", ornek: "Mahallede çıkan lafları ciddiye almadan işine bakmayı sürdürdü." },
    ],
  },
  {
    kelime: "leke",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yüzeye bulaşıp iz bırakan kir.", ornek: "Gömleğine damlayan zeytinyağı lekesi kaç kez yıkansa da çıkmadı." },
      { tur: "gerçek", tanim: "Bir yüzeyde oluşan renk değişikliği.", ornek: "Duvardaki nem lekeleri yeniden boya yapılınca tamamen gözden kayboldu." },
      { tur: "mecaz", tanim: "Bir kimsenin onurunu zedeleyen kötü durum ya da ün.", ornek: "Yıllarca dürüst çalıştı, adına en küçük bir leke sürdürmedi." },
    ],
  },
  {
    kelime: "lezzet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağızla alınan tat duygusu.", ornek: "Annemin yaptığı mercimek çorbasının lezzeti hiçbir yerde yok." },
      { tur: "mecaz", tanim: "Hoşa giden durum, alınan zevk.", ornek: "Kitap okumanın lezzetini bir kez tadan kişi bu alışkanlıktan kolay vazgeçmez." },
    ],
  },
  {
    kelime: "lider",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir topluluğu yöneten, ona yön veren kimse; önder.", ornek: "Atatürk, halkın gözünde büyük bir liderdir." },
      { tur: "gerçek", tanim: "Bir partinin veya bir kuruluşun en üst düzeyde yönetimiyle görevli kimse; reis.", ornek: "Partinin lideri, kongrede yeni programı üyelere tek tek anlattı." },
      { tur: "terim", tanim: "Sporda, bir yarışmada başta bulunan takım veya yarışmacı.", ornek: "Ligin lideri, kalan üç maçı da kazanırsa şampiyonluğu garantiliyor." },
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
    kelime: "lokma",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir defada ağza alınıp yutulan yiyecek parçası.", ornek: "Pastadan aldığı ilk lokmadan sonra gözleri sevinçle parladı." },
      { tur: "gerçek", tanim: "Kızartılıp şerbete atılan küçük hamur tatlısı.", ornek: "Hayır için sokakta dağıtılan sıcak lokmalardan biz de aldık." },
      { tur: "mecaz", tanim: "Geçim için gereken yiyecek, rızık.", ornek: "Babası ailesinin lokmasını çıkarmak için gece gündüz çalışıyordu." },
    ],
  },
  {
    kelime: "lokomotif",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vagonları çeken, kendi gücüyle hareket eden makine.", ornek: "İstasyona giren lokomotif uzun bir düdük sesiyle vagonları durdurdu." },
      { tur: "mecaz", tanim: "Bir topluluğu ya da alanı ileriye taşıyan öncü güç.", ornek: "Turizm, son yıllarda bu şehrin ekonomisinin en güçlü lokomotifi hâline geldi." },
    ],
  },
  {
    kelime: "lüks",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Gösterişli ve pahalı olan.", ornek: "Şehrin merkezindeki lüks otelde bir gece konaklamak çok pahalıydı." },
      { tur: "gerçek", tanim: "Gereksiz olan aşırı harcama.", ornek: "Bu bütçeyle her hafta dışarıda yemek yemek bize lüks gelir." },
      { tur: "mecaz", tanim: "Ulaşılması güç, kolay kolay elde edilemeyen şey.", ornek: "Sınav döneminde uzun uzun uyumak bizim için gerçek bir lükstü." },
    ],
  },
  {
    kelime: "maden",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yer kabuğunun bazı bölümlerinde bulunan, işlenerek kullanılan değerli madde.", ornek: "Bu dağın eteklerinden yıllardır kömür, bakır gibi madenler çıkarılıyor." },
      { tur: "gerçek", tanim: "Bu maddelerin çıkarıldığı yer, ocak.", ornek: "Babası her sabah erkenden madene inip akşam yorgun argın dönerdi." },
      { tur: "mecaz", tanim: "Çok değerli, benzeri kolay bulunmayan kişi veya şey.", ornek: "Yıllardır bize destek olan bu öğretmen okulumuz için gerçek bir madendi." },
    ],
  },
  {
    kelime: "masa",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Üzerinde yemek yenen, iş görülen, ayaklı düz mobilya.", ornek: "Ödevini bitirmek için masasının başına oturdu ve defterlerini önüne dizdi." },
      { tur: "gerçek", tanim: "Bir kuruluşta belli bir işi yürüten bölüm.", ornek: "Dilekçesini vermek için önce ilgili masaya başvurması gerektiğini söylediler." },
      { tur: "mecaz", tanim: "Bir konunun görüşülüp karara bağlandığı toplantı ortamı.", ornek: "İki ülkenin temsilcileri anlaşmak için yeniden masaya oturmaya karar verdi." },
    ],
  },
  {
    kelime: "masal",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Olağanüstü olayları ve kahramanları anlatan sözlü halk anlatısı.", ornek: "Anneannem her akşam bize devlerin ve perilerin geçtiği masallar anlatırdı." },
      { tur: "mecaz", tanim: "İnandırıcı olmayan, uydurma söz.", ornek: "Ödevini neden yapmadığını sorunca yine inanılmaz bir masal uydurdu." },
    ],
  },
  {
    kelime: "maske",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yüzü gizlemek veya korumak için takılan örtü.", ornek: "Kostüm partisine kedi maskesi takarak geldi ve kimse onu tanımadı." },
      { tur: "mecaz", tanim: "Gerçek kişiliği gizleyen aldatıcı davranış veya görünüş.", ornek: "Yıllarca sürdürdüğü o kibar maskesi küçük bir tartışmada yere düştü." },
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
    kelime: "merhem",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Deriye sürülen, yumuşak kıvamlı ilaç.", ornek: "Doktor yanan eline günde iki kez merhem sürmesini söyledi." },
      { tur: "mecaz", tanim: "Bir acıyı, sıkıntıyı hafifleten şey.", ornek: "Komşuların gösterdiği ilgi, evini kaybeden ailenin yarasına merhem oldu." },
    ],
  },
  {
    kelime: "merkez",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir dairenin veya bir alanın tam ortası.", ornek: "Öğretmen tahtaya çizdiği çemberin merkezini kırmızı kalemle işaretledi." },
      { tur: "gerçek", tanim: "Bir işin veya yönetimin yürütüldüğü asıl yer.", ornek: "Şirketin merkezi İstanbul'da, şubeleri ise birçok Anadolu kentinde bulunuyor." },
      { tur: "mecaz", tanim: "İlginin ve olayların üzerinde toplandığı nokta.", ornek: "Sınıfın en neşeli öğrencisi olduğu için hep ilginin merkezindeydi." },
    ],
  },
  {
    kelime: "mesafe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İki nokta arasındaki uzaklık, ara.", ornek: "Evimizle okul arasındaki mesafeyi yürüyerek yirmi dakikada rahatça alıyorum." },
      { tur: "mecaz", tanim: "Kişiler arasındaki soğukluk, resmî ve uzak tutum.", ornek: "Küçük tartışmadan sonra arkadaşına karşı belirgin bir mesafe koydu." },
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
    kelime: "meydan",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Şehirde toplanmaya elverişli, açık ve geniş alan.", ornek: "Bayram sabahı köy meydanında herkes bir araya gelip bayramlaştı." },
      { tur: "mecaz", tanim: "Fırsat, uygun ortam, imkân.", ornek: "Dedikoduya meydan vermemek için olanları herkesin önünde açıkça anlattı." },
    ],
  },
  {
    kelime: "mikrop",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hastalığa yol açan, gözle görülmeyen çok küçük canlı.", ornek: "Yemekten önce ellerini yıkarsan mikropların çoğundan kolayca kurtulmuş olursun." },
      { tur: "mecaz", tanim: "Kötü huylu, çevresine zarar veren kimse.", ornek: "Filmdeki mikrop, kasabaya geldiği günden beri herkesin huzurunu kaçırıyordu." },
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
    kelime: "mimar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yapıları tasarlayan ve yapımını yöneten kimse.", ornek: "Yeni kütüphanenin projesini genç bir mimar aylarca çalışarak hazırladı." },
      { tur: "mecaz", tanim: "Bir işi düzenleyen, kuran, başaran kimse.", ornek: "Takımın bu yılki başarısının mimarı sabırlı ve çalışkan antrenörüydü." },
    ],
  },
  {
    kelime: "mutfak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yemek pişirilen ve hazırlanan oda.", ornek: "Annem mutfakta çorba pişirirken ben de salata için domates doğradım." },
      { tur: "gerçek", tanim: "Bir ülkeye veya bölgeye özgü yemeklerin tümü.", ornek: "Türk mutfağı zeytinyağlılarıyla ve çorbalarıyla dünyada büyük ilgi görüyor." },
      { tur: "mecaz", tanim: "Bir işin hazırlıklarının yapıldığı, görünmeyen bölüm.", ornek: "Gazetenin mutfağında haberler yayımlanmadan önce günlerce titizlikle hazırlanıyor." },
    ],
  },
  {
    kelime: "nabız",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kalbin atışının damarlarda duyulan vuruşu.", ornek: "Hemşire bileğimi tutup nabzımı saydıktan sonra ateşimi de ölçtü." },
      { tur: "mecaz", tanim: "Bir kimsenin veya topluluğun içinde bulunduğu eğilim, durum.", ornek: "Başkan halkın nabzını ölçmek için mahalleleri tek tek gezdi." },
    ],
  },
  {
    kelime: "nazik",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Başkalarına karşı saygılı ve incelikli davranan.", ornek: "Otobüste yaşlı kadına yerini veren nazik çocuk hepimizi gülümsetti." },
      { tur: "mecaz", tanim: "Dikkat ve özen isteyen, kolayca bozulabilecek olan.", ornek: "Bu nazik konuyu ailesine anlatırken kelimelerini özenle seçmeye çalıştı." },
    ],
  },
  {
    kelime: "nefes",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ciğerlere alınıp verilen hava, soluk.", ornek: "Doktor derin bir nefes almamı isteyip sırtımı dikkatle dinledi." },
      { tur: "gerçek", tanim: "Bir kerede alınıp verilen hava miktarı.", ornek: "Yüzücü suya dalmadan önce büyük bir nefes alıp bekledi." },
      { tur: "mecaz", tanim: "Kısa süreli rahatlama, soluklanma fırsatı.", ornek: "Sınavlar bitince öğrenciler tatilde biraz nefes alma imkânı buldu." },
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
    kelime: "nöbet",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işin sıra ile yapılması, sıra.", ornek: "Sınıfın tahtasını silme nöbeti bu hafta yine bize düştü." },
      { tur: "gerçek", tanim: "Sırası gelince tutulan bekleme ve koruma görevi.", ornek: "Asker gece boyunca kapıda nöbet tuttu ve sabah dinlenmeye gitti." },
      { tur: "mecaz", tanim: "Öksürük, gülme, ağlama gibi bir durumun birdenbire gelip kısa sürelerle şiddetle etkili olması.", ornek: "Arkadaşının şakasına öyle güldü ki uzun bir gülme nöbetine tutuldu." },
    ],
  },
  {
    kelime: "numara",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin sırasını gösteren sayı.", ornek: "Otobüs biletindeki koltuk numarasını görünce hemen pencere kenarına oturdu." },
      { tur: "gerçek", tanim: "Ayakkabı, giysi gibi şeylerin ölçüsü.", ornek: "Ayağı büyüdüğü için bu yıl bir numara büyük ayakkabı aldık." },
      { tur: "mecaz", tanim: "Yapmacık davranış, hile, oyun.", ornek: "Okula gitmemek için hasta numarası yapınca annesi durumu hemen anladı." },
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
    kelime: "oda",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Evin veya yapının bir bölümü.", ornek: "Çalışma odası kitaplarla doluydu." },
      { tur: "terim", tanim: "Belirli meslek mensuplarının bağlı olduğu kurum.", ornek: "Babam Mühendisler Odası'na kayıtlıdır." },
    ],
  },
  {
    kelime: "odak",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Işınların bir mercekten geçtikten sonra toplandığı nokta.", ornek: "Mercekten geçen güneş ışınları odakta toplanınca kâğıt yanmaya başladı." },
      { tur: "mecaz", tanim: "Bir işin veya ilginin üzerinde toplandığı merkez.", ornek: "Toplantının odağında okulun yeni spor salonu projesi vardı." },
    ],
  },
  {
    kelime: "odun",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yakmak için kullanılan, kesilmiş ağaç parçası.", ornek: "Dedem sobaya birkaç odun attı ve oda kısa sürede ısındı." },
      { tur: "mecaz", tanim: "Kaba, anlayışsız, görgüsüz kimse.", ornek: "Kırıcı davranışlarını sürdürürse çevresinde odun diye anılmaktan kurtulamaz." },
    ],
  },
  {
    kelime: "okşamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sevgiyle elini bir şeyin üzerinde yumuşakça gezdirmek.", ornek: "Küçük kız kucağındaki kedinin tüylerini uzun uzun sevgiyle okşadı." },
      { tur: "mecaz", tanim: "Hoşa gitmek, insanda güzel bir duygu uyandırmak.", ornek: "Sahneden yükselen o güzel ezgi bütün dinleyicilerin kulaklarını okşadı." },
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
    kelime: "olay",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ortaya çıkan, meydana gelen durum.", ornek: "Dün akşam mahallede yaşanan olayı komşular sabaha kadar konuştu." },
      { tur: "mecaz", tanim: "Herkesin dikkatini çeken önemli iş, başarı.", ornek: "Genç yazarın ilk romanı edebiyat dünyasında büyük bir olay oldu." },
    ],
  },
  {
    kelime: "olgun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Yenecek duruma gelmiş, iyice yetişmiş.", ornek: "Ağaçtan kopardığımız olgun şeftaliler ağzımızda dağılacak kadar yumuşak ve tatlıydı." },
      { tur: "mecaz", tanim: "Davranışları dengeli, hoşgörülü ve deneyimli olan.", ornek: "Tartışma büyümeden olgun davranıp arkadaşından özür dilemeyi bildi." },
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
    kelime: "omurga",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Sırtta boyundan kuyruk sokumuna kadar uzanan kemik dizisi.", ornek: "Doktor, düzgün oturmazsak omurgamızın zamanla eğrilebileceğini örneklerle anlattı." },
      { tur: "terim", tanim: "Geminin altında baştan kıça doğru uzanan ana bölüm.", ornek: "Tersanede yapımı biten geminin omurgası törenle denize indirildi." },
      { tur: "mecaz", tanim: "Bir şeyi ayakta tutan temel yapı.", ornek: "Aile sevgisi, bu romanın omurgasını oluşturan en önemli konudur." },
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
    kelime: "onarmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bozulmuş veya yıkılmış bir şeyi yeniden düzeltmek.", ornek: "Ustalar depremde hasar gören okulun çatısını iki haftada onardı." },
      { tur: "mecaz", tanim: "Bozulan bir durumu veya ilişkiyi düzeltmek.", ornek: "Yıllar sonra buluşup kırılan arkadaşlıklarını sabırla onarmayı başardılar." },
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
    kelime: "ordu",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir devletin silahlı kuvvetlerinin tümü.", ornek: "Bir ülkenin ordusu, sınırlarını korumakla görevli askerlerden oluşur." },
      { tur: "mecaz", tanim: "Aynı işi yapan çok kalabalık topluluk.", ornek: "Sabahın erken saatinde bir işçi ordusu fabrikaya doğru yürüyordu." },
    ],
  },
  {
    kelime: "orman",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ağaçlarla ve bitkilerle kaplı geniş alan.", ornek: "Hafta sonu ormanda yürüyüş yaptık ve kuş seslerini dinledik." },
      { tur: "mecaz", tanim: "Çok sık ve karışık biçimde bir arada bulunan şeyler.", ornek: "Şehrin göbeğindeki bu beton ormanında tek bir ağaç bile kalmamış." },
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
    kelime: "oturmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun belden yukarısı dik duracak biçimde bir yere yerleşmek.", ornek: "Sınıfa girince en ön sıraya oturup defterini çantasından çıkardı." },
      { tur: "gerçek", tanim: "Bir yerde sürekli olarak yaşamak, ikamet etmek.", ornek: "Halam yıllardır deniz kenarındaki bu apartmanın üçüncü katında oturuyor." },
      { tur: "mecaz", tanim: "Uygun düşmek, yakışmak.", ornek: "Yeni ceket üzerine o kadar güzel oturdu ki herkes beğendi." },
    ],
  },
  {
    kelime: "oynamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Eğlenmek veya vakit geçirmek için bir oyunla uğraşmak.", ornek: "Çocuklar bahçede saklambaç oynarken hava yavaş yavaş kararmaya başladı." },
      { tur: "gerçek", tanim: "Yerinden çıkacak gibi gevşemek, kımıldamak.", ornek: "Kapının kolu oynadığı için ustayı çağırıp sıkıca vidalattık." },
      { tur: "mecaz", tanim: "Bir şeyin üzerinde izinsiz değişiklik yapmak, kurcalamak.", ornek: "Bilgisayarın ayarlarıyla oynayınca program bir daha hiç açılmadı." },
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
    kelime: "ödemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir borcu veya bir şeyin karşılığını vermek.", ornek: "Market alışverişinin parasını kasada nakit olarak ödeyip fişini aldı." },
      { tur: "mecaz", tanim: "Yapılan bir yanlışın sonucuna katlanmak.", ornek: "Dersleri ihmal etmenin bedelini sınav sonuçları açıklanınca ağır ödedi." },
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
    kelime: "ölçmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir niceliği, birim kabul edilen bir büyüklükle karşılaştırmak.", ornek: "Terzi elbiseyi dikmeden önce kolun uzunluğunu metreyle dikkatle ölçtü." },
      { tur: "mecaz", tanim: "Bir kişinin veya durumun değerini anlamaya çalışmak.", ornek: "Yeni gelen öğrencinin bilgisini ölçmek için kısa bir sınav yaptı." },
      { tur: "mecaz", tanim: "Söz ve davranışları dikkatle tartmak.", ornek: "Kırıcı olmamak için konuşurken her kelimesini ölçüp biçerek söylüyordu." },
    ],
  },
  {
    kelime: "ölçü",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir niceliğin, birimle karşılaştırılarak bulunan değeri.", ornek: "Odanın ölçülerini aldıktan sonra halının uyup uymayacağını kolayca hesapladık." },
      { tur: "terim", tanim: "Şiirde dizelerin uzunluk bakımından bağlı olduğu düzen, vezin.", ornek: "Şiirin her dizesi on bir heceden oluştuğu için ölçüsü bellidir." },
      { tur: "mecaz", tanim: "Davranışlarda aşırıya kaçmama, denge.", ornek: "Şakalarında ölçüyü kaçırdığı için arkadaşlarını farkında olmadan kırdı." },
    ],
  },
  {
    kelime: "ölmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yaşamı sona ermek, hayatı bitmek.", ornek: "Komşumuzun yıllardır beslediği o yaşlı köpek geçen hafta öldü." },
      { tur: "gerçek", tanim: "Bitki kuruyup canlılığını yitirmek.", ornek: "Tatile giderken sulamayı unutunca balkondaki bütün çiçekler ölmüştü." },
      { tur: "mecaz", tanim: "Bir şeyi çok istemek, aşırı sevmek.", ornek: "Annemin yaz akşamlarında yaptığı o soğuk limonataya adeta ölürüm." },
    ],
  },
  {
    kelime: "örmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İpliği veya yünü şişle, tığla ilmekleyerek giysi yapmak.", ornek: "Babaannem kış gelmeden bana kalın yünden sıcacık bir kazak ördü." },
      { tur: "gerçek", tanim: "Taş, tuğla gibi şeyleri üst üste koyarak duvar yapmak.", ornek: "Ustalar bahçenin çevresine iki günde taştan yüksek bir duvar ördü." },
      { tur: "mecaz", tanim: "Birbirine bağlayarak oluşturmak, kurmak.", ornek: "Yazar, gerçek olaylarla hayalleri ustaca örerek bu romanı yazmış." },
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
    kelime: "örtmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin üstünü kapatmak.", ornek: "Uyuyan kardeşinin üzerine ince bir battaniye örtüp odadan sessizce çıktı." },
      { tur: "gerçek", tanim: "Kapıyı veya pencereyi kapamak.", ornek: "İçeri soğuk girmesin diye mutfak kapısını yavaşça örttü." },
      { tur: "mecaz", tanim: "Gizlemek, saklamak, belli etmemek.", ornek: "Yaptığı hatayı örtmeye çalışırken daha büyük bir yanlışa düştü." },
    ],
  },
  {
    kelime: "ötmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kuş ve bazı hayvanlar kendine özgü sesler çıkarmak.", ornek: "Sabah güneş doğarken bahçedeki kuşlar hep birlikte ötmeye başladı." },
      { tur: "mecaz", tanim: "Boş yere, gereksiz biçimde çok konuşmak.", ornek: "Toplantı boyunca konuyla hiç ilgisi olmayan şeyler anlatarak durmadan öttü." },
    ],
  },
  {
    kelime: "özgür",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Hiçbir baskı altında olmayan; bağımsız, hür.", ornek: "Tarih boyunca milletler özgür yaşamak için savaşmıştır." },
      { tur: "gerçek", tanim: "Kendi istediği gibi hareket etme, davranma, karar verme gücü olan.", ornek: "Hangi liseye gideceği konusunda tamamen özgürdü, ailesi hiç karışmadı." },
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
    kelime: "pamuk",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Tohumlarının çevresinde beyaz lifler bulunan tarım bitkisi.", ornek: "Çukurova'da yetişen pamuk sonbaharda tarlalardan tek tek toplanıyor." },
      { tur: "gerçek", tanim: "Bu bitkiden elde edilen, dokumada kullanılan beyaz lif.", ornek: "Yaz için aldığımız bu ince gömlek tamamen pamuktan dokunmuş." },
      { tur: "mecaz", tanim: "Çok yumuşak ve beyaz olan.", ornek: "Bebeğin pamuk elleri avucumun içinde küçücük ve sımsıcak duruyordu." },
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
    kelime: "parlak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Işığı yansıtan, ışıldayan.", ornek: "Yeni cilalanan masanın parlak yüzeyinde yüzümüzü bile net görebiliyorduk." },
      { tur: "mecaz", tanim: "Çok başarılı, göz alıcı.", ornek: "Öğrencinin bu yılki parlak başarısı bütün okulda günlerce konuşuldu." },
      { tur: "mecaz", tanim: "Umut verici, aydınlık.", ornek: "Çalışkan ve meraklı bu çocuğu parlak bir gelecek bekliyor." },
    ],
  },
  {
    kelime: "parlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Işık saçmak, ışıldamak.", ornek: "Gece gökyüzünde parlayan yıldızları sırt üstü yatarak saatlerce seyrettik." },
      { tur: "mecaz", tanim: "Birdenbire öfkelenmek, sinirlenip bağırmak.", ornek: "Küçük bir eleştiri karşısında parladı ve kapıyı çarparak odadan çıktı." },
      { tur: "mecaz", tanim: "Kısa sürede ün ve başarı kazanmak.", ornek: "Genç oyuncu bu dizideki başarılı rolüyle kısa sürede parladı." },
    ],
  },
  {
    kelime: "parmak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Elin ve ayağın ucundaki oynak bölümlerden her biri.", ornek: "Soğuktan parmakları o kadar üşümüştü ki kalemi zor tutuyordu." },
      { tur: "mecaz", tanim: "Bir işteki gizli etki, karışma.", ornek: "Bu karışıklığın çıkmasında onun da parmağı olduğunu sonradan öğrendik." },
    ],
  },
  {
    kelime: "pas",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Demir gibi metallerin üzerinde nemden oluşan kırmızımsı tabaka.", ornek: "Bahçede unutulan bisikletin zinciri yağmurlardan sonra iyice pas tutmuş." },
      { tur: "terim", tanim: "Bazı oyunlarda topu takım arkadaşına aktarma.", ornek: "Kaleci topu kaptı ve savunmadaki arkadaşına hızlı bir pas verdi." },
      { tur: "mecaz", tanim: "Zamanla oluşan kırgınlık, gönül kiri.", ornek: "Uzun bir sohbet, iki arkadaşın gönlündeki pası tamamen silip attı." },
    ],
  },
  {
    kelime: "paslanmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Metal, nemin etkisiyle pas tutmak.", ornek: "Yağmurda kalan bahçe kapısının menteşeleri kısa sürede paslandı." },
      { tur: "mecaz", tanim: "Kullanılmadığı için körelmek, eski becerisini yitirmek.", ornek: "Yıllardır hiç konuşmadığı için öğrendiği yabancı dil iyice paslanmıştı." },
    ],
  },
  {
    kelime: "patlamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İçindeki basınçla ses çıkararak birden parçalanmak.", ornek: "Çocuğun elindeki balon iğneye değince büyük bir sesle patladı." },
      { tur: "mecaz", tanim: "Birdenbire ortaya çıkmak, ansızın başlamak.", ornek: "Maç bitmeden tribünlerde beklenmedik bir tartışma patlayınca herkes şaşırdı." },
      { tur: "mecaz", tanim: "Öfkesini birden dışa vurmak.", ornek: "Bunca haksızlığa daha fazla dayanamayıp toplantının tam ortasında patladı." },
    ],
  },
  {
    kelime: "pay",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bölüşülen bir şeyden herkese düşen bölüm, hisse.", ornek: "Bahçeden topladığımız bütün cevizleri kardeşimle eşit paylara ayırdık." },
      { tur: "terim", tanim: "Kesirde çizginin üstünde bulunan sayı.", ornek: "Öğretmen kesrin payını ve paydasını tahtada tek tek gösterdi." },
      { tur: "mecaz", tanim: "Bir olaydaki sorumluluk veya katkı.", ornek: "Bu güzel başarıda emek veren herkesin büyük bir payı var." },
    ],
  },
  {
    kelime: "paylaşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bölüşerek aralarında dağıtmak.", ornek: "Beslenme çantasındaki sandviçi sıra arkadaşıyla ikiye bölerek paylaştı." },
      { tur: "mecaz", tanim: "Bir duyguyu birlikte yaşamak, ortak olmak.", ornek: "Dedesini kaybeden arkadaşımızın üzüntüsünü sınıfça ve içtenlikle paylaştık." },
    ],
  },
  {
    kelime: "pekişmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıkılaşmak, sertleşip sağlamlaşmak.", ornek: "Dökülen beton birkaç gün içinde iyice pekişip taş gibi sertleşti." },
      { tur: "mecaz", tanim: "Daha güçlü ve sağlam duruma gelmek.", ornek: "Birlikte çıktıkları bu uzun yolculuktan sonra dostlukları iyice pekişti." },
    ],
  },
  {
    kelime: "pencere",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Işık ve hava girmesi için duvarda bırakılan açıklık.", ornek: "Odanın penceresini açar açmaz içeriye bahar kokusu ve serinlik doldu." },
      { tur: "mecaz", tanim: "Yeni şeyler görmeyi, öğrenmeyi sağlayan yol.", ornek: "Kitaplar, çocukların hayal dünyasına açılan en güzel penceredir." },
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
    kelime: "pınar",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yerden kaynayarak çıkan su, kaynak.", ornek: "Dağ yolunda bulduğumuz pınarın suyu buz gibi ve berraktı." },
      { tur: "mecaz", tanim: "Bir şeyin bol bol çıktığı kaynak.", ornek: "Anneannem hepimiz için hiç tükenmeyen bir sevgi pınarı gibiydi." },
    ],
  },
  {
    kelime: "pişirmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yiyeceği ateşte veya fırında yenecek duruma getirmek.", ornek: "Misafirler gelmeden önce mutfakta güzel bir mercimek çorbası pişirdi." },
      { tur: "mecaz", tanim: "Bir işi iyice hazırlayıp olgunlaştırmak.", ornek: "Sunumu sınıfın önünde anlatmadan önce evde günlerce pişirdi." },
    ],
  },
  {
    kelime: "pişmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yiyecek, ateşin etkisiyle yenecek duruma gelmek.", ornek: "Fırındaki börek yarım saatte pişti ve kokusu bütün eve yayıldı." },
      { tur: "mecaz", tanim: "Deneyim kazanmak, bir işte ustalaşmak.", ornek: "Yıllarca aynı atölyede çalışa çalışa bu işte iyice pişti." },
      { tur: "mecaz", tanim: "Sıcaktan çok bunalmak.", ornek: "Klimasız otobüsle yolculuk yaparken öğle sıcağında resmen pişmiştik." },
    ],
  },
  {
    kelime: "pusula",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İbresi kuzeyi göstererek yön bulmaya yarayan araç.", ornek: "Kampta yolumuzu bulmak için haritayla birlikte pusulayı da kullandık." },
      { tur: "mecaz", tanim: "Yol gösteren, doğruyu bulmayı sağlayan şey.", ornek: "Öğretmeninin öğütleri onun için hayatı boyunca bir pusula oldu." },
    ],
  },
  {
    kelime: "pürüz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yüzeydeki küçük engebe, düzgün olmayan bölüm.", ornek: "Marangoz tahtanın üzerindeki pürüzleri zımparayla tek tek giderdi." },
      { tur: "mecaz", tanim: "Bir işin yürümesini zorlaştıran sorun, aksaklık.", ornek: "Projede çıkan küçük pürüzleri konuşarak kısa sürede çözdüler." },
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
    kelime: "rehber",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir topluluğa yol gösteren, gezdirip bilgi veren kimse.", ornek: "Müzeyi gezerken rehber, her tablonun hikâyesini bize tek tek anlattı." },
      { tur: "gerçek", tanim: "Bir konuda bilgi veren, yol gösteren kitap.", ornek: "Sınava hazırlanırken aldığı deneme rehberi konuları anlamasında ona çok yardımcı oldu." },
      { tur: "mecaz", tanim: "Kendisine bakılarak doğru yol öğrenilen kimse veya şey.", ornek: "Öğretmeni onun için yalnızca bir eğitmen değil, hayat boyu rehber oldu." },
    ],
  },
  {
    kelime: "renk",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Cisimlerin ışığı yansıtmasıyla gözde oluşan görüntü, boya çeşidi.", ornek: "Duvarları boyamak için açık mavi bir renk seçtiler ve oda aydınlandı." },
      { tur: "mecaz", tanim: "Çeşitlilik, canlılık, hareketlilik.", ornek: "Onun anlattığı fıkralar sıkıcı geçen toplantıya birden renk kattı." },
      { tur: "mecaz", tanim: "Kişinin düşüncesi, eğilimi, tutumu.", ornek: "Tartışmalarda hiç konuşmadığı için siyasi rengini kimse tam olarak bilmiyordu." },
    ],
  },
  {
    kelime: "renkli",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Birden çok rengi olan, siyah beyaz olmayan.", ornek: "Duvara astığı renkli fotoğraflar odanın havasını tamamen değiştirmişti." },
      { tur: "mecaz", tanim: "İlgi çekici, canlı, tekdüze olmayan.", ornek: "Anneannem çok renkli bir insandı, her anısını gülerek dinlerdik." },
      { tur: "mecaz", tanim: "Değişik ve çeşitli olaylarla dolu olan.", ornek: "Yazar, gençliğinde geçirdiği renkli günleri son kitabında ayrıntılı biçimde anlatıyor." },
    ],
  },
  {
    kelime: "rol",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Oyuncunun bir oyunda canlandırdığı kişilik.", ornek: "Okul müsameresinde ona yaşlı bir bilge adamın rolü verilmişti." },
      { tur: "mecaz", tanim: "Bir olayda bir kimsenin veya şeyin payı, etkisi.", ornek: "Takımın şampiyon olmasında kalecinin kurtarışlarının çok büyük bir rolü vardı." },
      { tur: "mecaz", tanim: "Gerçek duyguyu gizleyerek yapılan yapmacık davranış.", ornek: "Hiç üzülmemişti aslında, bütün o ağlamalar baştan sona roldü." },
    ],
  },
  {
    kelime: "rota",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Bir geminin veya uçağın izlediği yol.", ornek: "Kaptan, fırtınayı görünce geminin rotasını kuzeye doğru hemen değiştirdi." },
      { tur: "mecaz", tanim: "İzlenen yön, gidiş yolu, amaç.", ornek: "Üniversite sınavından sonra hayatının rotasını tamamen değiştirmeye karar verdi." },
    ],
  },
  {
    kelime: "ruh",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İnsanı canlı kılan, bedenden ayrı düşünülen manevi varlık.", ornek: "Pek çok düşünür, insanın bedeni ölse de ruhunun ölümsüz olduğuna inanmıştır." },
      { tur: "mecaz", tanim: "Bir şeyin en önemli yanı, özü.", ornek: "Yardımlaşma, bu mahallede yıllardır sürdürülen komşuluk geleneğinin ruhunu oluşturuyor." },
      { tur: "mecaz", tanim: "Canlılık, coşku, güç.", ornek: "Yeni gelen antrenör yorgun takıma yeniden ruh ve heyecan kazandırdı." },
    ],
  },
  {
    kelime: "rüya",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Uyku sırasında zihinde canlanan görüntüler, düş.", ornek: "Gece gördüğü rüyayı sabah kahvaltıda hepimize ayrıntılarıyla anlatmaya çalıştı." },
      { tur: "mecaz", tanim: "Gerçekleşmesi çok istenen amaç, hayal.", ornek: "Kendi tasarladığı evde oturmak yıllardır peşinden koştuğu bir rüyaydı." },
      { tur: "mecaz", tanim: "Çok güzel olan, gerçek dışı görünen durum.", ornek: "Deniz kenarındaki o küçük kasabada geçirdiğimiz hafta rüya gibiydi." },
    ],
  },
  {
    kelime: "rüzgâr",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Havanın yer değiştirmesiyle oluşan esinti.", ornek: "Sabaha karşı çıkan kuvvetli rüzgâr bahçedeki bütün sandalyeleri devirmişti." },
      { tur: "mecaz", tanim: "Bir yerde etkili olan akım, eğilim, hava.", ornek: "Okulda esen değişim rüzgârı öğrencilerin derse bakışını olumlu yönde etkiledi." },
    ],
  },
  {
    kelime: "sabır",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Acı, zorluk veya beklemeye katlanma; tahammül.", ornek: "Bu işin sonu sabırla gelir." },
      { tur: "gerçek", tanim: "Olacak veya gelecek bir şeyi telaş göstermeden bekleme.", ornek: "Sınav sonuçları açıklanana kadar hepimiz büyük bir sabırla bekledik." },
    ],
  },
  {
    kelime: "saf",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Başka madde karışmamış, katışıksız, arı.", ornek: "Kuyumcu, yüzüğün saf altından yapıldığını söyleyince babam almaya karar verdi." },
      { tur: "mecaz", tanim: "Kolayca kanan, herkese inanan.", ornek: "O kadar saf ki söylenen her şaka için gerçekten üzülüyor." },
      { tur: "gerçek", tanim: "Yan yana dizilmiş insan sırası, dizi.", ornek: "Öğrenciler bayrak töreni için bahçede düzgün saflar hâlinde sıralandı." },
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
    kelime: "sağır",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "İşitme duyusunu yitirmiş olan.", ornek: "Sağır olan komşumuzla işaret dilini öğrenerek rahatça anlaşmaya başladık." },
      { tur: "mecaz", tanim: "Söylenenlere aldırmayan, kulak asmayan.", ornek: "Uyarılarımıza sağır kalan sürücü hız yapınca kazaya neden oldu." },
      { tur: "mecaz", tanim: "Üzerinde pencere ve kapı bulunmayan, ses geçirmeyen.", ornek: "Apartmanın arkasındaki sağır duvarı çocuklar renkli boyalarla resim yaparak süsledi." },
    ],
  },
  {
    kelime: "sağlam",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Dayanıklı, kolay kolay bozulmayan veya kırılmayan.", ornek: "Dedemin yıllar önce yaptığı ahşap masa hâlâ sağlam duruyor." },
      { tur: "gerçek", tanim: "Hasta veya sakat olmayan, sağlıklı.", ornek: "Kazadan sonra çocuğun kolunun sağlam olduğunu duyunca hepimiz rahatladık." },
      { tur: "mecaz", tanim: "Güvenilir, doğruluğundan kuşku duyulmayan.", ornek: "Haberi vermeden önce bilginin sağlam bir kaynaktan geldiğini iyice araştırdı." },
    ],
  },
  {
    kelime: "sağlık",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun her bakımdan iyi olma durumu; sıhhat.", ornek: "Sağlık her şeyin başıdır." },
      { tur: "gerçek", tanim: "Sağ, canlı, diri olma durumu.", ornek: "Depremden sonra bütün akrabalarının sağlığını öğrenince derin bir nefes aldı." },
    ],
  },
  {
    kelime: "sahne",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Tiyatro veya konserde oyunun sunulduğu yüksek yer.", ornek: "Perde açılınca sahnede küçük bir köy evinin dekoru göründü." },
      { tur: "terim", tanim: "Bir oyunun veya filmin bölümlerinden her biri.", ornek: "Filmin en heyecanlı sahnesinde elektrikler kesilince salonda büyük gürültü koptu." },
      { tur: "mecaz", tanim: "Bir olayın geçtiği yer, ortam.", ornek: "Bu meydan, yıllar önce tarihin en önemli olaylarına sahne olmuş." },
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
    kelime: "saldırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Zarar vermek amacıyla birinin üzerine hızla gitmek.", ornek: "Bahçeye giren yabancıyı gören köpek havlayarak ona doğru saldırdı." },
      { tur: "mecaz", tanim: "Sert sözlerle eleştirmek, suçlamak.", ornek: "Konuşmasında rakiplerine ağır sözlerle saldırınca salondakilerin çoğu rahatsız oldu." },
      { tur: "mecaz", tanim: "Bir işe veya yiyeceğe büyük bir istekle girişmek.", ornek: "Antrenmandan dönen çocuklar sofraya oturur oturmaz yemeklere saldırdı." },
    ],
  },
  {
    kelime: "sallamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi ileri geri veya sağa sola hareket ettirmek.", ornek: "Otobüs kalkarken çocuk camdan bize elini sallayarak veda etti." },
      { tur: "gerçek", tanim: "Bir organını oynatarak bir anlam bildirmek.", ornek: "Sorumu anlamış gibi başını salladı ama aslında hiçbir şey anlamamıştı." },
      { tur: "mecaz", tanim: "Bir işi savsaklamak, ona gereken önemi vermemek.", ornek: "Ödevini haftalardır salladığı için öğretmen onu sınıfın önünde uyardı." },
    ],
  },
  {
    kelime: "sancı",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücudun iç organlarında duyulan, gelip geçen şiddetli ağrı.", ornek: "Gece boyunca süren mide sancısı yüzünden sabaha kadar hiç uyuyamadı." },
      { tur: "mecaz", tanim: "Sıkıntı ve üzüntü veren zor durum.", ornek: "Yeni sisteme geçiş sırasında yaşanan sancılar birkaç ay sonra azaldı." },
    ],
  },
  {
    kelime: "sarılmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kollarını dolayarak birini kucaklamak.", ornek: "Uzun bir aradan sonra gördüğü kardeşine koşup sıkıca sarıldı." },
      { tur: "gerçek", tanim: "Bir şeyin çevresini dolanmak, kuşatmak.", ornek: "Bahçedeki sarmaşık yıllar içinde bütün duvara sarılıp yeşil bir örtü oluşturdu." },
      { tur: "mecaz", tanim: "Bir işe büyük bir istekle başlamak, dört elle tutunmak.", ornek: "Sınava az kaldığını anlayınca kitaplarına sarıldı ve temposunu artırdı." },
    ],
  },
  {
    kelime: "sarmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin çevresini başka bir nesneyle dolayarak örtmek.", ornek: "Kırılmasın diye bardakları gazete kâğıdına sardıktan sonra kutuya yerleştirdi." },
      { tur: "gerçek", tanim: "Bir yeri her yandan kuşatmak, çevresini almak.", ornek: "Akşam saatlerinde yoğun bir sis bütün vadiyi sarmaya başladı." },
      { tur: "mecaz", tanim: "Bir duygu bir kimseyi tümüyle etkisi altına almak.", ornek: "Mektubu okurken içini tarif edemediği büyük bir özlem sardı." },
    ],
  },
  {
    kelime: "satmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir malı belli bir bedel karşılığında başkasına vermek.", ornek: "Bahçesinde yetiştirdiği domatesleri her cumartesi pazarda satarak geçimini sağlıyor." },
      { tur: "mecaz", tanim: "Çıkarı için birine ihanet etmek, onu yarı yolda bırakmak.", ornek: "Zor günlerde arkadaşlarını satan kimse gerçek dostluğu asla anlayamaz." },
      { tur: "mecaz", tanim: "Bilmediği bir konuda bilgiçlik göstermek, gösteriş yapmak.", ornek: "Toplantıda sürekli hava satması yüzünden kimse onunla çalışmak istemedi." },
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
    kelime: "sayfa",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir kâğıt yaprağının iki yüzünden her biri.", ornek: "Kitabın son sayfasını okuyunca hikâyenin bittiğine gerçekten çok üzüldü." },
      { tur: "gerçek", tanim: "İnternette bilgilerin sunulduğu bölüm.", ornek: "Okulun internet sayfasında sınav tarihleri sabah saatlerinde yayımlanmıştı." },
      { tur: "mecaz", tanim: "Bir hayatın veya dönemin belli bir bölümü.", ornek: "Taşındıktan sonra geçmişi kapatıp hayatında yepyeni bir sayfa açtı." },
    ],
  },
  {
    kelime: "sert",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kolayca çizilmeyen, esnemeyen, katı olan.", ornek: "Ceviz ağacının sert odunundan yapılan mobilyalar uzun yıllar dayanıyor." },
      { tur: "mecaz", tanim: "Kırıcı, hoşgörüsüz, öfkeli davranan.", ornek: "Sert bir sesle konuşunca sınıftaki bütün öğrenciler bir anda sustu." },
      { tur: "mecaz", tanim: "Etkisi güçlü olan, keskin.", ornek: "Akşama doğru esen sert rüzgâr sahildeki bütün şemsiyeleri savurdu." },
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
    kelime: "seviye",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yüzeyin veya sıvının yüksekliği, düzey.", ornek: "Yağmurların ardından baraj gölünün su seviyesi belirgin biçimde yükseldi." },
      { tur: "mecaz", tanim: "Bir kimsenin bilgi ve kültür bakımından bulunduğu derece.", ornek: "Yabancı dil seviyesini yükseltmek için her akşam düzenli olarak çalışıyor." },
      { tur: "mecaz", tanim: "Davranış ve konuşmadaki incelik, ölçü.", ornek: "Tartışmanın seviyesini koruyan öğrenciler birbirlerini sonuna kadar sabırla dinledi." },
    ],
  },
  {
    kelime: "sevmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Birine karşı sevgi ve bağlılık duymak.", ornek: "Ailesini çok sevdiği için her tatilde memleketine gitmeyi ihmal etmez." },
      { tur: "gerçek", tanim: "Elini gezdirerek okşamak.", ornek: "Kucağına aldığı kediyi uzun uzun sevdikten sonra bahçeye bıraktı." },
      { tur: "mecaz", tanim: "Bir şeye alışkın olmak, ona ihtiyaç duymak.", ornek: "Bu bitki gölgeyi sever, doğrudan güneş alan yerde çabuk kurur." },
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
    kelime: "sıçramak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bulunduğu yerden hızla zıplamak.", ornek: "Kapı birden çarpınca korkudan yerinden sıçradı ve elindeki bardağı düşürdü." },
      { tur: "gerçek", tanim: "Sıvı damlaları çevreye dağılmak.", ornek: "Kaynayan çorbadan sıçrayan damlalar temiz gömleğinin her yerini lekeledi." },
      { tur: "mecaz", tanim: "Kısa sürede hızla artmak veya ilerlemek.", ornek: "Kış gelince sebze fiyatları birkaç hafta içinde iki katına sıçradı." },
    ],
  },
  {
    kelime: "sıfır",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "terim", tanim: "Matematikte hiçliği gösteren, tek başına değeri olmayan sayı.", ornek: "Öğretmen tahtaya sıfırın sayı doğrusundaki yerini büyük bir daireyle gösterdi." },
      { tur: "mecaz", tanim: "Hiç kullanılmamış, yepyeni.", ornek: "Amcam yıllardır biriktirdiği parayla kendine sıfır bir araba aldı." },
      { tur: "mecaz", tanim: "Hiçbir değeri, etkisi veya başarısı bulunmayan.", ornek: "Antrenmanlara gelmeyince takım içindeki etkisi neredeyse sıfıra indi." },
    ],
  },
  {
    kelime: "sığınmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Tehlikeden korunmak için güvenli bir yere girmek.", ornek: "Sağanak başlayınca hepimiz karşıdaki dükkânın saçağı altına hemen sığındık." },
      { tur: "mecaz", tanim: "Birinden yardım ve koruma istemek, ona güvenmek.", ornek: "Zorlandığı her konuda ablasına sığınır, ondan akıl almayı severdi." },
      { tur: "mecaz", tanim: "Bir gerçeği örtmek için bahane olarak kullanmak.", ornek: "Hatasını kabul etmek yerine hastalık bahanesine sığınıp özür dilemekten kaçındı." },
    ],
  },
  {
    kelime: "sıkı",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Gevşek olmayan, iyice sıkıştırılmış veya bağlanmış.", ornek: "Çadırın iplerini sıkı bağlamayınca gece çıkan rüzgârda çadır devrildi." },
      { tur: "mecaz", tanim: "Kurallara çok bağlı, ödün vermeyen.", ornek: "Sıkı bir çalışma programı hazırladı ve ondan hiç taviz vermedi." },
      { tur: "mecaz", tanim: "Parasını harcamaktan kaçınan, cimri.", ornek: "Eli çok sıkı olduğu için yıllardır kendine yeni ayakkabı almamış." },
    ],
  },
  {
    kelime: "sınır",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İki ülkeyi veya araziyi birbirinden ayıran çizgi.", ornek: "Kamyonlar iki ülke arasındaki sınırda saatlerce sıra bekledikten sonra geçti." },
      { tur: "mecaz", tanim: "Bir şeyin ulaşabileceği son nokta, uç.", ornek: "Sabrının sınırına gelmişti, bir söz daha söylense bağıracak gibiydi." },
      { tur: "mecaz", tanim: "Uyulması gereken ölçü, kural.", ornek: "Şakalarında sınırı aşınca arkadaşları ona artık gülmemeye başladı." },
    ],
  },
  {
    kelime: "sıra",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Okullarda öğrencilerin oturduğu, üzerinde yazı yazılan mobilya.", ornek: "Yeni gelen öğrenci pencere kenarındaki boş sıraya sessizce oturdu." },
      { tur: "gerçek", tanim: "Bir şeyin art arda dizilmesiyle oluşan düzen.", ornek: "Kantinde uzun bir sıra oluştuğu için teneffüste hiçbir şey alamadık." },
      { tur: "mecaz", tanim: "Bir işin yapılması için uygun olan zaman.", ornek: "Şimdi tatili konuşmanın sırası değil, önce sınavı düşünmeliyiz." },
    ],
  },
  {
    kelime: "sızmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Sıvı küçük bir delikten azar azar geçmek.", ornek: "Çatıdaki çatlaktan sızan yağmur suyu tavanda sarı bir leke bıraktı." },
      { tur: "mecaz", tanim: "Gizli kalması gereken bir bilgi duyulmak, yayılmak.", ornek: "Sürpriz partinin haberi bir şekilde sızınca bütün heyecan boşa gitti." },
      { tur: "mecaz", tanim: "Fark ettirmeden bir yere veya duruma girmek.", ornek: "Konuşmasının arasına sızan alaycı ifadeler dinleyicilerin dikkatinden kaçmadı." },
    ],
  },
  {
    kelime: "silmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yüzeydeki tozu veya lekeyi bezle temizlemek.", ornek: "Annem misafirler gelmeden önce evdeki bütün camları tek tek sildi." },
      { tur: "gerçek", tanim: "Yazılmış veya çizilmiş bir şeyi ortadan kaldırmak.", ornek: "Tahtaya yazdığı yanlış cevabı silip doğrusunu dikkatlice yeniden yazdı." },
      { tur: "mecaz", tanim: "Bir kimseyi veya anıyı belleğinden, hayatından çıkarmak.", ornek: "O tatsız olayı belleğinden silmek için yıllarca uğraştı ama başaramadı." },
    ],
  },
  {
    kelime: "sindirmek",
    tur: "fiil",
    anlamlar: [
      { tur: "terim", tanim: "Yiyecekleri vücudun kullanabileceği biçime getirmek.", ornek: "Mide, aldığımız besinleri sindirerek vücudun enerji kazanmasına yardımcı olur." },
      { tur: "mecaz", tanim: "Bir bilgiyi iyice anlayıp özümsemek.", ornek: "Konuyu ezberlemek yerine sindirerek öğrenince sorularda hiç zorlanmadığını fark etti." },
      { tur: "mecaz", tanim: "Korkutarak baskı altına almak, susturmak.", ornek: "Masaldaki dev, bağırıp çağırarak bütün köylüleri sindirmiş ama küçük çoban ona boyun eğmemiş." },
    ],
  },
  {
    kelime: "sivri",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Ucu gittikçe incelerek batıcı duruma gelen.", ornek: "Kalemin sivri ucu defterin kâğıdını çizince yazısı okunmaz hâle geldi." },
      { tur: "mecaz", tanim: "Herkesin düşüncesinden ayrılan, aykırı.", ornek: "Toplantıda ortaya attığı sivri fikirler günlerce konuşulup uzun uzun tartışıldı." },
      { tur: "mecaz", tanim: "İğneleyici, kırıcı.", ornek: "Sivri diliyle şaka yaptığını sanıyordu ama çevresindekileri sürekli üzüyordu." },
    ],
  },
  {
    kelime: "soğuk",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Isısı düşük olan, üşüten.", ornek: "Kar yağınca sular buz gibi soğuk olduğu için ellerimiz dondu." },
      { tur: "mecaz", tanim: "Sevgisiz, ilgisiz, samimi olmayan.", ornek: "Kapıda bizi soğuk bir gülümsemeyle karşılayınca içeri girmekten vazgeçtik." },
      { tur: "mecaz", tanim: "Yersiz, tatsız, hoşa gitmeyen.", ornek: "Yaptığı soğuk şakaya kimse gülmeyince ortamda garip bir sessizlik oldu." },
    ],
  },
  {
    kelime: "sokmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin bir yerin içine girmesini sağlamak.", ornek: "Anahtarı kilide soktu ama kapı bir türlü açılmak bilmedi." },
      { tur: "gerçek", tanim: "Böcek veya yılan iğnesini, dişini batırmak.", ornek: "Bahçede oynarken onu bir arı sokunca kolu kısa sürede şişti." },
      { tur: "mecaz", tanim: "Kötü veya zor bir duruma düşürmek.", ornek: "Düşünmeden verdiği o söz hepimizi hiç beklemediğimiz bir derde soktu." },
    ],
  },
  {
    kelime: "solmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bitki suyunu yitirerek canlılığını kaybetmek.", ornek: "Tatilde sulanmayan çiçekler biz döndüğümüzde tamamen solmuş ve sararmıştı." },
      { tur: "gerçek", tanim: "Rengi açılmak, matlaşmak.", ornek: "Yıllarca güneşte kalan perdelerin rengi solduğu için yenilerini almaya karar verdik." },
      { tur: "mecaz", tanim: "Neşesi, canlılığı kaybolmak.", ornek: "Kötü haberi duyunca yüzü soldu ve uzun süre hiç konuşmadı." },
    ],
  },
  {
    kelime: "soluk",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Ciğerlere alınıp verilen hava, nefes.", ornek: "Merdivenleri koşarak çıkınca soluğu kesildi ve bir süre dinlenmek zorunda kaldı." },
      { tur: "mecaz", tanim: "Kısa dinlenme anı, rahatlama.", ornek: "Sınavlar bitince ailece kısa bir tatile çıkıp biraz soluk aldık." },
      { tur: "gerçek", tanim: "Rengi açılmış, parlaklığını yitirmiş.", ornek: "Duvardaki soluk fotoğraf, dedemin gençlik yıllarından kalma tek hatıraydı." },
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
    kelime: "sömürmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yiyeceği hızlı hızlı yiyip bitirmek.", ornek: "Okuldan aç gelince tabaktaki bütün böreği birkaç dakikada sömürdü." },
      { tur: "mecaz", tanim: "Bir kimsenin emeğinden haksız biçimde yararlanmak.", ornek: "Çalışanlarının emeğini sömüren işletmeler uzun vadede güvenilirliğini tamamen kaybeder." },
    ],
  },
  {
    kelime: "söndürmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Yanan veya ışık veren bir şeyi yanmaz duruma getirmek.", ornek: "Kamp ateşini söndürmeden çadıra girmenin çok tehlikeli olduğunu bize anlattı." },
      { tur: "gerçek", tanim: "İçindeki havayı boşaltarak inik duruma getirmek.", ornek: "Parti bitince balonları teker teker söndürüp özenle kutulara yerleştirdik." },
      { tur: "mecaz", tanim: "Bir duyguyu, isteği yok etmek.", ornek: "Sürekli yapılan olumsuz eleştiriler çocuğun okuma hevesini tamamen söndürdü." },
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
    kelime: "susmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Konuşmayı kesmek, sesini çıkarmaz olmak.", ornek: "Öğretmen sınıfa girince herkes bir anda susup yerine oturdu." },
      { tur: "mecaz", tanim: "Ses çıkarmaz duruma gelmek, dinmek.", ornek: "Gece boyunca uğuldayan rüzgâr sabaha karşı birden susuverdi." },
      { tur: "mecaz", tanim: "Haksızlık karşısında tepki göstermemek.", ornek: "Yanlış olduğunu bildiği hâlde susması yıllarca içini rahatsız etti." },
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
    kelime: "sürüklemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi yerde çekerek götürmek.", ornek: "Ağır çuvalı kaldıramayınca depoya kadar yerde sürükleyerek götürmek zorunda kaldı." },
      { tur: "mecaz", tanim: "İstenmeyen kötü bir duruma götürmek.", ornek: "Aceleyle verilen kararlar şirketi kısa sürede büyük bir zarara sürükledi." },
      { tur: "mecaz", tanim: "Etkileyerek peşinden götürmek.", ornek: "Romanın akıcı dili okuyucuyu sayfalar boyunca kendi peşinden sürüklüyor." },
    ],
  },
  {
    kelime: "süslemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi güzel göstermek için üzerine eklemeler yapmak.", ornek: "Sınıfı yılbaşı için rengârenk kâğıtlarla süsleyince ortam çok neşeli oldu." },
      { tur: "mecaz", tanim: "Anlatımı abartılı ve gösterişli sözlerle zenginleştirmek.", ornek: "Anlattığı olayı süsleye süsleye uzatınca dinleyenler bir süre sonra sıkıldı." },
    ],
  },
  {
    kelime: "süzmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir sıvıyı süzgeçten geçirerek içindekilerden ayırmak.", ornek: "Çayı bardağa koymadan önce süzgeçle süzüp tortusunu dikkatlice ayırdı." },
      { tur: "mecaz", tanim: "Birini tepeden tırnağa dikkatle inceleyerek bakmak.", ornek: "Kapıyı açan adam bizi baştan aşağı süzdükten sonra içeri aldı." },
    ],
  },
  {
    kelime: "şafak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Güneş doğmadan önce ufukta beliren aydınlık ve kızıllık.", ornek: "Balıkçılar şafak sökerken teknelerini hazırlayıp açık denize doğru yola çıktı." },
      { tur: "mecaz", tanim: "Yeni bir başlangıç, umut veren dönem.", ornek: "Uzun yıllar süren zorluklardan sonra ülkede yeni bir şafak doğdu." },
    ],
  },
  {
    kelime: "şaka",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Güldürmek amacıyla söylenen söz veya yapılan davranış.", ornek: "Arkadaşına yaptığı şakaya bütün sınıf uzun süre gülmekten kırıldı." },
      { tur: "mecaz", tanim: "Önemsenmeyecek kadar kolay ve hafif olan durum.", ornek: "Bu tırmanış şakaya benzemez, hazırlıksız çıkanlar yolda çok zorlanır." },
    ],
  },
  {
    kelime: "şaşırmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Beklenmedik bir durum karşısında ne yapacağını bilememek.", ornek: "Kapıyı açınca karşısında yıllardır görmediği dostunu görüp bir an şaşırdı." },
      { tur: "gerçek", tanim: "Doğrusunu bulamamak, yanılmak.", ornek: "Karanlıkta yolu şaşırınca köye ulaşmaları neredeyse iki saat sürdü." },
      { tur: "mecaz", tanim: "Doğru davranıştan uzaklaşmak, yanlış yola sapmak.", ornek: "Kötü arkadaşlar yüzünden yolunu şaşıran genç sonunda hatasını fark etti." },
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
    kelime: "şeker",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Yiyecekleri tatlandırmak için kullanılan beyaz renkli madde.", ornek: "Çayına iki kaşık şeker attıktan sonra uzun uzun karıştırdı." },
      { tur: "terim", tanim: "Kandaki glikoz oranının yükselmesiyle ortaya çıkan hastalık.", ornek: "Doktor, şeker hastalarının beslenmesine çok dikkat etmesi gerektiğini söyledi." },
      { tur: "mecaz", tanim: "Sevimli, tatlı, cana yakın kimse.", ornek: "Komşumuzun küçük kızı gerçekten bir şeker, herkesle hemen arkadaş oluyor." },
    ],
  },
  {
    kelime: "şekil",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir nesnenin dıştan görünüşü, biçim.", ornek: "Bulutların şekli değiştikçe çocuklar gökyüzünde hayvan figürleri bulmaya çalışıyordu." },
      { tur: "terim", tanim: "Bir konuyu açıklamak için çizilen çizim, geometrik biçim.", ornek: "Öğretmen tahtaya çizdiği şekil üzerinden üçgenin açılarını tek tek anlattı." },
      { tur: "mecaz", tanim: "Bir işin yapılış yolu, yöntem, tarz.", ornek: "Sorunu bu şekilde çözemeyeceğimizi anlayınca yepyeni bir yol denemeye karar verdik." },
    ],
  },
  {
    kelime: "şeytan",
    tur: "isim / sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Dinî inanışta insanı kötülüğe yöneltmeye çalışan varlık.", ornek: "Masalda şeytan, kahramanı kandırmak için kılıktan kılığa girip karşısına çıkıyordu." },
      { tur: "mecaz", tanim: "Çok kurnaz, açıkgöz kimse.", ornek: "O kadar şeytan ki bir bakışta ne düşündüğümüzü hemen anlıyor." },
      { tur: "mecaz", tanim: "Çok yaramaz, hareketli çocuk.", ornek: "Küçük kardeşim tam bir şeytan, bir dakika bile yerinde duramıyor." },
    ],
  },
  {
    kelime: "şık",
    tur: "sıfat / isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Giyimi kuşamı düzgün, zarif, gösterişli.", ornek: "Düğüne çok şık bir takım elbiseyle geldiği için herkes ona baktı." },
      { tur: "mecaz", tanim: "Yakışık alan, hoş karşılanan, uygun.", ornek: "Misafir varken sofradan izinsiz kalkması hiç de şık olmadı." },
      { tur: "gerçek", tanim: "Bir sorudaki seçeneklerden her biri.", ornek: "Soruyu çözerken yanlış şıkları eleyince doğru cevabı kolayca buldu." },
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
    kelime: "şişirmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "İçine hava veya gaz doldurarak genişletmek.", ornek: "Doğum günü için aldığımız balonları bir saatte zar zor şişirdik." },
      { tur: "mecaz", tanim: "Bir şeyi olduğundan büyük göstermek, abartmak.", ornek: "Küçük bir tartışmayı şişirip mahalledeki herkese farklı biçimde anlatmışlar." },
      { tur: "mecaz", tanim: "Bir işi özensiz ve gelişigüzel yapmak.", ornek: "Ödevini son gece şişirdiği için öğretmen durumu hemen fark etti." },
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
    kelime: "taban",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Ayağın yere basan alt yüzü.", ornek: "Uzun yürüyüşten sonra ayaklarının tabanı acıdığı için bir süre dinlenmek zorunda kaldı." },
      { tur: "gerçek", tanim: "Bir şeyin altta kalan, onu taşıyan bölümü.", ornek: "Bardağın tabanı çatladığı için masaya yavaş yavaş su sızdı." },
      { tur: "terim", tanim: "Geometride bir şeklin üzerine oturduğu kenar veya yüzey.", ornek: "Öğretmen üçgenin taban uzunluğunu tahtaya çizerek tek tek gösterdi." },
      { tur: "mecaz", tanim: "Bir düşüncenin veya topluluğun dayandığı destek kesimi.", ornek: "Kulübün geniş bir taraftar tabanı olduğu maçta açıkça görüldü." },
    ],
  },
  {
    kelime: "takılmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere tutturulmak, asılmak.", ornek: "Duvara takılan tablo salonun havasını baştan aşağı değiştirdi." },
      { tur: "gerçek", tanim: "Bir yere ilişip kalmak, ilerleyememek.", ornek: "Eteği kapının koluna takılınca az kalsın yere düşüyordu." },
      { tur: "mecaz", tanim: "Şaka yollu sataşmak, latife etmek.", ornek: "Arkadaşları yeni saç kesimi yüzünden bütün gün ona takıldı." },
      { tur: "mecaz", tanim: "Önemsiz bir ayrıntı üzerinde gereğinden çok durmak.", ornek: "Küçük bir yazım hatasına takılıp metnin tamamını görmezden geldi." },
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
    kelime: "tartmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin ağırlığını ölçmek.", ornek: "Manav aldığımız domatesleri terazide tartıp poşete özenle yerleştirdi." },
      { tur: "mecaz", tanim: "Bir konuyu iyice düşünüp değerlendirmek.", ornek: "Teklifi kabul etmeden önce bütün olasılıkları uzun uzun tarttı." },
      { tur: "mecaz", tanim: "Söyleyeceklerini ölçüp biçmek, dikkatli konuşmak.", ornek: "Kırıcı olmamak için sözlerini tartarak konuşan sakin bir insandı." },
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
    kelime: "taşımak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi bir yerden başka bir yere götürmek.", ornek: "İşçiler tuğlaları el arabasıyla inşaatın arka bahçesine taşıdı." },
      { tur: "gerçek", tanim: "Üstünde veya içinde bulundurmak.", ornek: "Çantasında her zaman küçük bir defter ile kalem taşırdı." },
      { tur: "mecaz", tanim: "Bir niteliği veya sorumluluğu üzerinde bulundurmak.", ornek: "Ailesinin bütün yükünü genç yaşta omuzlarında taşımak zorunda kaldı." },
    ],
  },
  {
    kelime: "tat",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dilin aldığı tatlı, acı, ekşi gibi duyu.", ornek: "Çorbanın tadına baktı ve biraz tuz eklemeye karar verdi." },
      { tur: "gerçek", tanim: "Bir yiyeceğin ağızda bıraktığı lezzet.", ornek: "Annemin yaptığı elmalı kekin tadı damağımda günlerce kaldı." },
      { tur: "mecaz", tanim: "Bir şeyden alınan zevk, hoşa giden durum.", ornek: "Kar yağınca tatil günlerinin tadı bizim için bambaşka oluyordu." },
    ],
  },
  {
    kelime: "tatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yiyeceğin tadına bakmak.", ornek: "Aşçı sosu kaşıkla tadıp içine biraz daha baharat attı." },
      { tur: "mecaz", tanim: "Bir duyguyu veya durumu yaşayarak öğrenmek.", ornek: "İlk kez kendi kazandığı parayla alışveriş yapmanın mutluluğunu tattı." },
      { tur: "mecaz", tanim: "Kötü bir sonucu yaşamak, sonucuna katlanmak.", ornek: "Kurallara uymayan sürücü dikkatsizliğinin sonucunu ağır biçimde tattı." },
    ],
  },
  {
    kelime: "taze",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bozulmamış, yeni toplanmış veya yeni yapılmış.", ornek: "Fırından yeni çıkan taze ekmeğin kokusu bütün sokağa yayıldı." },
      { tur: "mecaz", tanim: "Yeni, üzerinden çok zaman geçmemiş.", ornek: "Kazanın anısı hâlâ taze olduğu için o yoldan geçmek istemiyordu." },
      { tur: "mecaz", tanim: "Dinç, canlı, yorgunluğu geçmiş.", ornek: "Kısa bir uykudan sonra kendini çok taze hissederek derse girdi." },
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
    kelime: "temiz",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Kirli olmayan, pak.", ornek: "Camları silince oda çok daha temiz ve aydınlık göründü." },
      { tur: "mecaz", tanim: "Dürüst, kötülük düşünmeyen.", ornek: "Temiz bir insan olduğu için kimse onun sözünden şüphe etmedi." },
      { tur: "mecaz", tanim: "Özenli, düzgün, kusursuz yapılmış.", ornek: "Defterindeki temiz yazı öğretmenin dikkatini daha ilk günden çekti." },
    ],
  },
  {
    kelime: "tepe",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin en üst bölümü.", ornek: "Ağacın tepesindeki elmaları toplamak için merdiven getirmek zorunda kaldık." },
      { tur: "gerçek", tanim: "Çevresine göre yüksek olan yer, küçük dağ.", ornek: "Köyün karşısındaki tepeye çıkınca bütün ovayı yukarıdan rahatça görebiliyorduk." },
      { tur: "mecaz", tanim: "Bir alanda ulaşılabilecek en yüksek nokta.", ornek: "Yıllarca sabırla çalışarak mesleğinin tepesine çıkmayı sonunda başardı." },
    ],
  },
  {
    kelime: "terlemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Vücuttan ter çıkmak.", ornek: "Sıcak havada topa koşturan çocuklar kısa sürede terleyip yoruldu." },
      { tur: "gerçek", tanim: "Bir yüzeyde nem toplanıp su damlacıkları oluşmak.", ornek: "Soğuk havada odanın camları terleyince dışarısı hiç görünmüyordu." },
      { tur: "mecaz", tanim: "Zor bir durumda bunalmak, sıkıntı çekmek.", ornek: "Zor sorunun cevabını bulana kadar sınavda epeyce terledi." },
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
    kelime: "tırmanmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Tutuna tutuna yukarı doğru çıkmak.", ornek: "Kedi bahçedeki dut ağacına hızla tırmanıp dalların arasında kayboldu." },
      { tur: "mecaz", tanim: "Sayı veya derece bakımından yükselmek, artmak.", ornek: "Yaz aylarında şehirdeki sıcaklık kırk dereceye kadar tırmandı." },
      { tur: "mecaz", tanim: "Bir gerginlik giderek şiddetlenmek.", ornek: "Küçük bir anlaşmazlıkla başlayan tartışma kısa sürede tırmandı." },
    ],
  },
  {
    kelime: "titremek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Soğuk veya korku yüzünden vücut hızlı hızlı sarsılmak.", ornek: "Yağmurda ıslanan çocuk soğuktan titreyerek eve doğru koştu." },
      { tur: "gerçek", tanim: "Hafifçe sallanmak, sarsılmak.", ornek: "Kamyon geçerken evin bütün camları birkaç saniye hafifçe titredi." },
      { tur: "mecaz", tanim: "Bir şeyi çok korumak, üzerine düşmek.", ornek: "Dedem bahçesindeki küçük fidanların üstüne adeta titriyor, hiçbirine dokundurmuyordu." },
    ],
  },
  {
    kelime: "tok",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Karnı doymuş olan, aç karşıtı.", ornek: "Kahvaltıyı geç yaptığı için öğlene kadar tok kaldı." },
      { tur: "gerçek", tanim: "Gür ve kalın çıkan (ses).", ornek: "Sunucunun tok sesi salonun en arkasından bile rahatça duyuluyordu." },
      { tur: "mecaz", tanim: "Gözü doymuş, aç gözlü olmayan.", ornek: "Tok gözlü bir insandı, kimsenin malında asla gözü yoktu." },
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
    kelime: "tuzak",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Hayvanları yakalamak için kurulan düzenek.", ornek: "Avcılar ormanda kurdukları tuzağı sabah erkenden kontrol etmeye gitti." },
      { tur: "mecaz", tanim: "Birini aldatmak için hazırlanan oyun, hile.", ornek: "Dolandırıcıların kurduğu tuzağa düşmemek için telefonda hiçbir bilgi vermedi." },
      { tur: "mecaz", tanim: "Dikkat edilmezse yanılmaya yol açan durum.", ornek: "Sınavdaki soru kolay görünüyordu ama içinde küçük bir tuzak vardı." },
    ],
  },
  {
    kelime: "ucuz",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Fiyatı düşük olan, pahalı karşıtı.", ornek: "Pazarın son saatinde sebzeler her zamankinden daha ucuz satılıyordu." },
      { tur: "mecaz", tanim: "Kolayca elde edilen, emek istemeyen.", ornek: "Ucuz bir başarı peşinde koşmadığı için gece gündüz çalıştı." },
      { tur: "mecaz", tanim: "Değeri az görülen, önemsenmeyen.", ornek: "Verdiği ucuz sözlere artık kimse eskisi gibi inanmıyordu." },
    ],
  },
  {
    kelime: "uç",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin sivrilerek biten bölümü.", ornek: "Kalemin ucu kırılınca çantasından kalemtıraşını çıkarıp yeniden açtı." },
      { tur: "gerçek", tanim: "Bir şeyin son bulduğu yer, kenar.", ornek: "Halının ucu kıvrıldığı için içeri girenler sürekli oraya takılıyordu." },
      { tur: "mecaz", tanim: "Bir düşüncenin aşırı, son noktası.", ornek: "Tartışmada iki taraf da uçlara kayınca ortak karar çıkmadı." },
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
    kelime: "uğraşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir işi yapmak için çaba harcamak.", ornek: "Bozulan bisikletiyle bütün akşam uğraştı ama yine de tamir edemedi." },
      { tur: "gerçek", tanim: "Bir şeyle sürekli ilgilenmek, meşgul olmak.", ornek: "Emekli olduktan sonra bahçesindeki çiçeklerle sabahtan akşama kadar uğraşıyordu." },
      { tur: "mecaz", tanim: "Birine sataşmak, rahat vermemek.", ornek: "Teneffüste küçük sınıflarla uğraştığı için müdür yardımcısına şikâyet edildi." },
    ],
  },
  {
    kelime: "ulaşmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere varmak, erişmek.", ornek: "Otobüs kar yüzünden şehre ancak akşam saatlerinde ulaşabildi." },
      { tur: "gerçek", tanim: "Uzanarak bir şeye erişmek.", ornek: "Raftaki kitaba ulaşmak için sandalyenin üstüne çıkmak zorunda kaldı." },
      { tur: "mecaz", tanim: "İstenilen amaca veya sonuca erişmek.", ornek: "Yıllarca çalışarak hedefine ulaşan sporcu madalyayı gururla boynuna taktı." },
    ],
  },
  {
    kelime: "umut",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "İyi bir sonucu bekleme; ümit.", ornek: "Umut, insanı yaşatan en güçlü duygudur." },
      { tur: "gerçek", tanim: "Bu duyguyu veren kimse veya şey; ümit.", ornek: "Genç kaleci, takımın kupadaki son umuduydu ve harika kurtarışlar yaptı." },
      { tur: "gerçek", tanim: "Olması beklenilen veya olacağı düşünülen şey.", ornek: "Bütün umudumuz, gönderdiğimiz mektubun bayramdan önce eline ulaşmasıydı." },
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
    kelime: "uyanmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Uykudan kalkmak, uykusu sona ermek.", ornek: "Sabah erkenden uyanıp kahvaltı hazırlamak onun günlük alışkanlığıydı." },
      { tur: "mecaz", tanim: "Bir durumun farkına varmak, gerçeği anlamak.", ornek: "Yıllar sonra kendisine oynanan oyuna uyandığında artık çok geçti." },
      { tur: "mecaz", tanim: "Canlanmak, yeniden harekete geçmek.", ornek: "İlkbaharda uyanan doğa bütün bahçeyi rengârenk çiçeklerle doldurdu." },
    ],
  },
  {
    kelime: "uymak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeye uygun düşmek, yakışmak.", ornek: "Mavi ceket üstündeki sarı gömleğe hiç uymadığı için başka bir gömlek giydi." },
      { tur: "gerçek", tanim: "Kurallara veya söylenene bağlı kalmak.", ornek: "Trafik kurallarına uyan sürücüler kazaların önüne geçilmesini sağlar." },
      { tur: "mecaz", tanim: "Başkasının etkisiyle davranmak, sözünü dinlemek.", ornek: "Arkadaşlarının sözüne uyup dersi asması ona pahalıya mal oldu." },
    ],
  },
  {
    kelime: "uzak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Arasında çok mesafe bulunan, yakın karşıtı.", ornek: "Yeni taşındıkları ev okula uzak olduğu için servise biniyorlar." },
      { tur: "mecaz", tanim: "İlgisi ve bilgisi olmayan, ilgisiz.", ornek: "Gerçeklerden uzak bir hayat kurmuş, kimsenin sözünü dinlemiyordu." },
      { tur: "mecaz", tanim: "Gerçekleşme ihtimali az olan.", ornek: "Bu yağmurda maçın oynanması bize çok uzak bir ihtimal görünüyordu." },
    ],
  },
  {
    kelime: "uzatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi daha uzun duruma getirmek.", ornek: "Pantolonun paçalarını uzatmak için onu terziye götürmek gerekti." },
      { tur: "gerçek", tanim: "Bir şeyi vermek için ileri doğru tutmak.", ornek: "Öğretmen kitabı öne uzatıp öğrencisinden yüksek sesle okumasını istedi." },
      { tur: "mecaz", tanim: "Bir işi veya konuşmayı gereğinden fazla sürdürmek.", ornek: "Konuyu boşuna uzatmayalım, karar zaten çoktan verilmiş durumda." },
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
    kelime: "üflemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Dudakları büzerek soluğu bir şeye doğru hızla vermek.", ornek: "Doğum günü pastasının mumlarını tek nefeste üfleyip söndürdü." },
      { tur: "gerçek", tanim: "Sıcak bir şeyi soğutmak için üzerine hava vermek.", ornek: "Çorbayı kaşıkla üfleyerek soğuttu, sonra yavaş yavaş içmeye başladı." },
      { tur: "mecaz", tanim: "Gizlice bir şey söylemek, fısıldayarak bildirmek.", ornek: "Sınavda arkadaşına cevabı üflerken öğretmen tarafından hemen fark edildi." },
    ],
  },
  {
    kelime: "ülke",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir devletin sınırları içindeki toprakların tamamı.", ornek: "Yaz tatilinde komşu ülkeye giderek çok farklı bir kültür tanıdılar." },
      { tur: "gerçek", tanim: "Bir özelliğiyle öne çıkarılarak düşünülen bölge.", ornek: "Sıcak ülkelerde yetişen bu meyveyi hayatında ilk kez tatmıştı." },
      { tur: "mecaz", tanim: "Bir duygu veya düşüncenin kapladığı alan.", ornek: "Kitap okurken kendini hayal ülkesinde dolaşıyormuş gibi hissediyordu." },
    ],
  },
  {
    kelime: "ürün",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Topraktan elde edilen mahsul.", ornek: "Bu yıl yağmurlar bol olunca tarladaki ürün beklenenden fazla oldu." },
      { tur: "gerçek", tanim: "Üretilerek satışa sunulan mal.", ornek: "Marketteki yeni ürünler raflara sabah erkenden özenle yerleştirildi." },
      { tur: "mecaz", tanim: "Bir çaba veya emeğin sonunda ortaya çıkan şey.", ornek: "Bu başarı uzun yıllar süren sabırlı bir çalışmanın ürünüdür." },
    ],
  },
  {
    kelime: "üst",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyin yukarı gelen bölümü, üzeri.", ornek: "Masanın üstünde duran defteri alıp çantasına dikkatle yerleştirdi." },
      { tur: "gerçek", tanim: "Giysi, kıyafet.", ornek: "Yağmurda ıslanınca üstünü değiştirmek için hemen eve gitti." },
      { tur: "mecaz", tanim: "Bir görevde daha yüksek konumda bulunan kimse.", ornek: "Kararı vermeden önce üstlerinden yazılı bir izin almak gerekiyordu." },
    ],
  },
  {
    kelime: "üzmek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi çekerek koparmak.", ornek: "Çocuk iki ucundan asılarak uçurtmanın ipini yanlışlıkla üzdü." },
      { tur: "mecaz", tanim: "Sıkıntı vererek kederlendirmek, tasalandırmak.", ornek: "Düşünmeden söylediği o kırıcı sözler arkadaşını günlerce üzdü." },
      { tur: "mecaz", tanim: "Yıpratmak, güç durumda bırakmak.", ornek: "Aylardır süren bu koşuşturma hepimizi iyice üzdü, kimsede iş yapacak güç kalmadı." },
    ],
  },
  {
    kelime: "vahşi",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Evcilleştirilmemiş, yabani olan (hayvan).", ornek: "Belgeselde vahşi hayvanların doğadaki yaşamı ayrıntılı biçimde anlatılıyordu." },
      { tur: "gerçek", tanim: "İnsan eli değmemiş, doğal durumda kalmış.", ornek: "Ormanın vahşi güzelliği fotoğrafçıları yıllardır bu bölgeye çekiyor." },
      { tur: "mecaz", tanim: "Acımasız, kaba ve sert davranan.", ornek: "Hayvanlara vahşi davranan insanları görünce çok üzülüyorum." },
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
    kelime: "varmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir yere ulaşmak, erişmek.", ornek: "Trene yetişemeyince eve gece yarısına doğru ancak varabildi." },
      { tur: "mecaz", tanim: "Bir şeyi anlamak, kavramak.", ornek: "Sorunun aslında çok kolay olduğunun ancak sonradan farkına vardı." },
      { tur: "mecaz", tanim: "Bir sonuca veya karara ulaşmak.", ornek: "Uzun tartışmaların ardından sınıfça ortak bir karara vardık." },
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
    kelime: "vurgu",
    tur: "isim",
    anlamlar: [
      { tur: "terim", tanim: "Bir hecenin ötekilerden daha baskılı söylenmesi.", ornek: "Öğretmen kelimenin son hecesindeki vurguyu tahtada işaretleyerek gösterdi." },
      { tur: "mecaz", tanim: "Bir konuyu önemle belirtme, öne çıkarma.", ornek: "Konuşmasında çevre kirliliğine yaptığı vurgu herkesin dikkatini çekti." },
    ],
  },
  {
    kelime: "vurmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeye hızla çarpmak, darbe indirmek.", ornek: "Çivi çakarken çekici yanlışlıkla parmağına vurdu ve canı çok yandı." },
      { tur: "gerçek", tanim: "Işık veya ses bir yere düşmek, yansımak.", ornek: "Sabah güneşi camdan vurunca oda birden ısınıp aydınlandı." },
      { tur: "mecaz", tanim: "Zarar vermek, kötü etkilemek.", ornek: "Gece inen don bahçedeki bütün kayısı ağaçlarını vurdu." },
    ],
  },
  {
    kelime: "vurulmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Silahla yaralanmak veya öldürülmek.", ornek: "Filmdeki kahraman kolundan vurulunca arkadaşları onu hemen oradan kurtardı." },
      { tur: "mecaz", tanim: "Birine veya bir şeye çok tutulmak, âşık olmak.", ornek: "Şehre ilk geldiğinde bu sakin sokaklara resmen vurulmuştu." },
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
    kelime: "yakalamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kaçan veya hareket eden bir şeyi tutmak.", ornek: "Kaleci topu havada yakalayınca tribünler ayağa kalkıp uzun uzun alkışladı." },
      { tur: "gerçek", tanim: "Suçlu bir kimseyi ele geçirmek.", ornek: "Polis, kaçmaya çalışan hırsızı dar sokağın sonunda yakaladı." },
      { tur: "mecaz", tanim: "Bir fırsatı kaçırmadan değerlendirmek.", ornek: "Maçın son dakikasında yakaladığı fırsatı gole çevirmeyi başardı." },
    ],
  },
  {
    kelime: "yakın",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Az bir uzaklıkta bulunan, uzak karşıtı.", ornek: "Evimiz okula yakın olduğu için sabahları yürüyerek gidiyoruz." },
      { tur: "gerçek", tanim: "Az bir zaman sonra gerçekleşecek olan.", ornek: "Sınavlar yakın olduğu için hafta sonu tekrar yapmaya başladı." },
      { tur: "mecaz", tanim: "Aralarında sıkı bir ilişki bulunan, samimi.", ornek: "İlkokuldan beri en yakın arkadaşıyla bütün sırlarını paylaşıyordu." },
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
      { tur: "gerçek", tanim: "Bir ülkeye veya birine bağış ya da ödünç olarak verilen para ve ihtiyaç maddeleri; destek.", ornek: "Köye gelen yardımların arasında battaniye, un ve ilaç vardı." },
      { tur: "gerçek", tanim: "Etki.", ornek: "Rüzgârın yardımıyla ıslak çamaşırlar öğlene kadar kupkuru oldu." },
    ],
  },
  {
    kelime: "yaşamak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Canlı olarak var olmak, hayatta olmak.", ornek: "Kaplumbağaların bazı türleri yüz yıldan uzun süre yaşayabiliyormuş." },
      { tur: "gerçek", tanim: "Bir yerde oturmak, hayatını sürdürmek.", ornek: "Ailesi yıllardır aynı köyde huzur içinde yaşıyordu." },
      { tur: "mecaz", tanim: "Bir olayı veya duyguyu geçirmek, deneyimlemek.", ornek: "Kupayı kaldırdıkları gün hayatlarının en büyük sevincini yaşadılar." },
    ],
  },
  {
    kelime: "yatmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Uzanmak, uyumak için yatağa girmek.", ornek: "Akşam yemeğinden sonra erkenden yatıp sabaha kadar deliksiz uyudu." },
      { tur: "gerçek", tanim: "Tedavi için hastanede kalmak.", ornek: "Ameliyattan sonra hastanede üç gün yatmak zorunda kaldı." },
      { tur: "mecaz", tanim: "Kullanılmadan, işe yaramadan öylece durmak.", ornek: "Depoda yıllardır yatan eşyaları sonunda ihtiyaç sahiplerine dağıttılar." },
    ],
  },
  {
    kelime: "yavaş",
    tur: "sıfat / zarf",
    anlamlar: [
      { tur: "gerçek", tanim: "Hızlı olmayan, ağır giden.", ornek: "Yaşlı adam yavaş adımlarla parkın içinden geçip gitti." },
      { tur: "gerçek", tanim: "Alçak sesle, hafif olarak.", ornek: "Bebek uyanmasın diye herkes yavaş konuşmaya özen gösteriyordu." },
      { tur: "mecaz", tanim: "Sakin, yumuşak huylu.", ornek: "Yavaş tabiatlı bir insandı, hiçbir tartışmada sesini yükseltmezdi." },
    ],
  },
  {
    kelime: "yaymak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir şeyi geniş bir alana sermek, dağıtmak.", ornek: "Halıları yıkadıktan sonra kurusun diye bahçeye özenle yaydılar." },
      { tur: "gerçek", tanim: "İnce bir tabaka durumunda sürmek.", ornek: "Ekmeğin üstüne reçeli bıçakla ince ve eşit biçimde yaydı." },
      { tur: "mecaz", tanim: "Bir haberi veya bilgiyi herkese duyurmak.", ornek: "Asılsız haberi bütün mahalleye yayan kişinin kim olduğunu sonunda herkes öğrendi." },
    ],
  },
  {
    kelime: "yemek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Bir besini ağızda çiğneyip yutmak.", ornek: "Akşam yemeğinde çorbasını yiyip odasına ders çalışmaya gitti." },
      { tur: "mecaz", tanim: "Parayı veya malı gereksiz yere harcayıp tüketmek.", ornek: "Babasından kalan mirası birkaç yıl içinde yiyip bitirdi." },
      { tur: "mecaz", tanim: "Kötü bir duruma uğramak, maruz kalmak.", ornek: "Kural dışı hareket eden oyuncu maçın başında sarı kart yedi." },
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
    kelime: "yıpranmak",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Kullanıla kullanıla eskimek.", ornek: "Yıllarca giyilen montun kolları iyice yıpranmış ve rengi solmuştu." },
      { tur: "mecaz", tanim: "Yorularak gücünü ve sağlığını yitirmek.", ornek: "Uzun süren hastalık sürecinde annesi hem bedenen hem ruhen yıprandı." },
      { tur: "mecaz", tanim: "Saygınlığı zarar görmek.", ornek: "Sürekli verdiği sözleri tutmayınca arkadaşları arasında iyice yıprandı." },
    ],
  },
  {
    kelime: "yoğun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Koyu, sık, içindeki madde miktarı çok olan.", ornek: "Yoğun sisten dolayı yolun ilerisi bir süre hiç görünmüyordu." },
      { tur: "mecaz", tanim: "Bir işle çok meşgul olan, boş vakti bulunmayan.", ornek: "Bu hafta programı çok yoğun olduğu için buluşamayacağını söyledi." },
      { tur: "mecaz", tanim: "Şiddeti veya derecesi çok olan.", ornek: "Maçın son dakikalarında taraftarların yoğun ilgisi oyuncuları iyice heyecanlandırdı." },
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
    kelime: "yorgun",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Bedenen veya zihnen tükenmiş; bitkin.", ornek: "Uzun yoldan yorgun döndüm." },
      { tur: "mecaz", tanim: "Kullanıla kullanıla işlevini yitirmiş (eşya, makine).", ornek: "Bu yorgun motorun değişmesi gerekiyor." },
    ],
  },
  {
    kelime: "yumuşak",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Dokunulduğunda sert olmayan, kolayca biçim alan.", ornek: "Yeni aldığımız yastık çok yumuşak olduğu için hemen uyudum." },
      { tur: "mecaz", tanim: "Hoşgörülü, kırıcı olmayan.", ornek: "Yumuşak bir dille uyarınca çocuk hatasını anlayıp özür diledi." },
      { tur: "mecaz", tanim: "Hafif ve tatlı olan (ses, ışık, hava).", ornek: "İlkbaharın yumuşak havası bahçede oturmayı çok keyifli hâle getirdi." },
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
    kelime: "yürek",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Kalp.", ornek: "Koşudan sonra yüreğinin hızla çarptığını göğsünde açıkça hissediyordu." },
      { tur: "mecaz", tanim: "Cesaret, yiğitlik.", ornek: "Yangına giren itfaiyecinin yüreğine bütün mahalle hayran kalmıştı." },
      { tur: "mecaz", tanim: "Acıma ve sevgi duygularının kaynağı.", ornek: "Sokakta titreyen yavru köpeği görünce yüreği bir anda burkuldu." },
    ],
  },
  {
    kelime: "yürümek",
    tur: "fiil",
    anlamlar: [
      { tur: "gerçek", tanim: "Adım atarak ilerlemek.", ornek: "Her sabah sahil boyunca yarım saat yürümeyi alışkanlık hâline getirdi." },
      { tur: "mecaz", tanim: "Bir iş ilerlemek, gelişmek.", ornek: "Hazırlıklar planlandığı gibi yürüyünce tören istenen saatte başlayabildi." },
      { tur: "mecaz", tanim: "Saldırmak amacıyla üzerine doğru ilerlemek.", ornek: "Kalabalık öfkeyle kapıya doğru yürüyünce görevliler hemen araya girdi." },
    ],
  },
  {
    kelime: "yüz",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Başta göz, burun ve ağzın bulunduğu ön bölüm.", ornek: "Sabah kalkınca yüzünü soğuk suyla yıkamayı hiç ihmal etmezdi." },
      { tur: "gerçek", tanim: "Bir şeyin dışa bakan düz bölümü, yüzey.", ornek: "Küpün her yüzüne farklı bir sayı özenle yazılmıştı." },
      { tur: "mecaz", tanim: "Utanma duygusu, sıkılma.", ornek: "Sözünü tutamadığı için arkadaşının gözüne bakacak yüzü kalmamıştı." },
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
    kelime: "zayıf",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Eti ve yağı az olan, ince.", ornek: "Hastalıktan sonra iyice zayıf kalan çocuk yavaş yavaş toparlandı." },
      { tur: "mecaz", tanim: "Gücü ve etkisi az olan.", ornek: "Zayıf bir rüzgâr bile o eski çatıyı sallamaya yetiyordu." },
      { tur: "mecaz", tanim: "Yetersiz, başarısız.", ornek: "Matematikte zayıf olduğunu fark edince kendine ek çalışma programı hazırladı." },
    ],
  },
  {
    kelime: "zehir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Canlıya girdiğinde zarar veren veya öldüren madde.", ornek: "Yılanın zehri için hastaneye hemen özel bir ilaç getirildi." },
      { tur: "mecaz", tanim: "Çok acı veya keskin olan.", ornek: "Bardaktaki kahve zehir gibi acıydı, içemeden masaya geri bıraktı." },
      { tur: "mecaz", tanim: "Huzuru bozan, acı veren şey.", ornek: "Sürekli yapılan tartışmalar evin huzurunu adeta zehir etti." },
    ],
  },
  {
    kelime: "zengin",
    tur: "sıfat",
    anlamlar: [
      { tur: "gerçek", tanim: "Parası ve malı çok olan, yoksul karşıtı.", ornek: "Zengin olmasına rağmen sade bir hayat sürmeyi tercih ediyordu." },
      { tur: "mecaz", tanim: "Bol ve çok çeşitli olan.", ornek: "Kütüphanenin zengin kitap koleksiyonu öğrencilerin bütün ihtiyacını karşılıyordu." },
      { tur: "mecaz", tanim: "Verimli, bereketli.", ornek: "Bölgenin zengin toprakları her yıl bol ürün alınmasını sağlıyor." },
    ],
  },
  {
    kelime: "zincir",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Birbirine geçmiş halkalardan oluşan metal bağ.", ornek: "Bisikletini bahçedeki direğe kalın bir zincirle bağlayıp markete girdi." },
      { tur: "mecaz", tanim: "Birbirini izleyen olaylar dizisi.", ornek: "Küçük bir hata uzun bir olaylar zincirini başlatmış oldu." },
      { tur: "mecaz", tanim: "Özgürlüğü engelleyen şey, tutsaklık.", ornek: "Yıllarca süren korkularının zincirini sonunda cesaretle kırmayı başardı." },
    ],
  },
  {
    kelime: "zirve",
    tur: "isim",
    anlamlar: [
      { tur: "gerçek", tanim: "Dağın en yüksek noktası, doruk.", ornek: "Dağcılar sabaha karşı yola çıkıp zirveye öğleden sonra ulaştı." },
      { tur: "mecaz", tanim: "Bir alanda ulaşılabilecek en üst düzey.", ornek: "Sanatçı kariyerinin zirvesindeyken sahneye veda etmeye karar verdi." },
      { tur: "terim", tanim: "Devlet veya kurum yöneticilerinin katıldığı üst düzey toplantı.", ornek: "İklim değişikliğinin konuşulduğu zirve üç gün boyunca sürdü." },
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
