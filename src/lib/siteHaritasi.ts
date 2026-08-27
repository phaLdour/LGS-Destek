/**
 * Rehber Baykuş'un site bilgisi — TEK KAYNAK.
 *
 * Buradaki her şey öğrencinin ekranda GÖREBİLECEĞİ bilgidir: hangi sayfa
 * ne işe yarar, orada ne yapılabilir. Kaynak kodu, dosya adı, teknoloji,
 * veritabanı gibi hiçbir iç bilgi burada YOKTUR ve olmamalıdır — baykuş
 * bunları bilmez.
 *
 * İki yerde birden kullanılır:
 *  1) cannedAnswers → yönlendirme niyetini token harcamadan yakalar,
 *  2) gemini → sistem istemine site haritası olarak basılır.
 *
 * Yeni bir sayfa/özellik eklendiğinde tek yapılacak: buraya bir satır.
 * Böylece baykuş "sitenin eski hâlinde kalmış" duruma bir daha düşmez.
 */

export type SiteBolumu = {
  rota: string;
  ad: string;
  /** Öğrenci oraya girince ne görür — tek cümle. */
  ozet: string;
  /** Orada neler yapabilir. */
  yapabilecekleri: string[];
  /**
   * Bu bölüme gitmek istendiğini gösteren ifadeler.
   * normalize edilmiş biçimde yazılır (Türkçe karakter yok, küçük harf).
   * 4+ harfli olanlar ekli hâlleri de yakalar (alt dize araması).
   */
  anahtarlar: string[];
  /** Giriş yapmayı gerektirir mi? */
  girisGerekir?: boolean;
  /**
   * true → anahtar tek başına yetmez, ayrıca bir gitme fiili ("git", "aç",
   * "gir"…) aranır. Ders adları için gerekli: "fen sorusu soracağım" cümlesi
   * kullanıcıyı fen dersine ışınlamamalı.
   */
  fiilGerekir?: boolean;
};

export const SITE_HARITASI: SiteBolumu[] = [
  {
    rota: "/dashboard",
    ad: "Anasayfa",
    ozet:
      "Günlük çalışma merkezin: bugün neye çalışacağın, kaldığın yer, sınava kalan süre ve ilerleme özetin.",
    yapabilecekleri: [
      "Bugünün planı: en çok zorlandığın konuyu önerir. Öneri yanlış SAYINA değil, yanlış ORANINA bakar ve oranı 40 soruluk bir güven kotasına göre düzeltir; böylece 3 soruda 3 yanlış yapmak konuyu haksız yere en kötü göstermez.",
      "Kaldığın yer: yarım bıraktığın konuya tek dokunuşla dönersin (henüz hiçbir şeye başlamadıysan bu kart görünmez).",
      "Sınava kalan süre: LGS'ye kalan gün/saat. Rahatsız ediyorsa sağdaki çarpıyla kapatılır, Profil > Görünüm'den geri açılır.",
      "Haftalık özet, günlük hedef, çalışma serisi ve haftalık çalışma grafiği.",
      "Derslere ve okul taramaya kısayollar.",
    ],
    anahtarlar: ["anasayfa", "ana sayfa", "dashboard", "panel", "bugunun plani", "gunun plani"],
  },
  {
    rota: "/dersler",
    ad: "Dersler ve konu performansı",
    ozet: "Altı dersin tamamı ve her konudaki başarı yüzdeni gösteren ısı haritası.",
    yapabilecekleri: [
      "Her ders için konu konu doğru yüzdeni renkli karelerden görürsün (yeşil iyi, sarı orta, kırmızı zayıf, gri henüz çözülmedi).",
      "Bir kareye dokununca o konunun sayfasına gidersin.",
      "Bir konuda en az 8 soru çözülmeden yüzde gösterilmez; az veri yanıltıcı olur.",
    ],
    anahtarlar: ["dersler", "tum dersler", "konu performans", "isi haritasi"],
  },
  {
    rota: "/ders/turkce",
    ad: "Türkçe",
    ozet: "Türkçe dersi: sözcükte anlam, paragraf, dil bilgisi, söz sanatları.",
    yapabilecekleri: [],
    anahtarlar: ["turkce"],
    fiilGerekir: true,
  },
  {
    rota: "/ders/matematik",
    ad: "Matematik",
    ozet: "Matematik dersi: sayılar, cebir, geometri, veri analizi.",
    yapabilecekleri: [],
    anahtarlar: ["matemat"],
    fiilGerekir: true,
  },
  {
    rota: "/ders/fen-bilimleri",
    ad: "Fen Bilimleri",
    ozet: "Fen Bilimleri dersi: mevsimler, DNA, basınç, madde, elektrik, enerji.",
    yapabilecekleri: [],
    anahtarlar: ["fen"],
    fiilGerekir: true,
  },
  {
    rota: "/ders/inkilap",
    ad: "T.C. İnkılap Tarihi",
    ozet: "T.C. İnkılap Tarihi ve Atatürkçülük dersi.",
    yapabilecekleri: [],
    anahtarlar: ["inkila", "tarih"],
    fiilGerekir: true,
  },
  {
    rota: "/ders/din",
    ad: "Din Kültürü",
    ozet: "Din Kültürü ve Ahlak Bilgisi dersi.",
    yapabilecekleri: [],
    anahtarlar: ["din kultur", "ahlak bilgisi"],
    fiilGerekir: true,
  },
  {
    rota: "/ders/ingilizce",
    ad: "İngilizce",
    ozet: "İngilizce dersi: kelime, dil bilgisi, okuma.",
    yapabilecekleri: [],
    anahtarlar: ["ingiliz"],
    fiilGerekir: true,
  },
  {
    rota: "/hizli-sorular",
    ad: "Hızlı Sorular",
    ozet: "Tek soruluk hızlı pratik: karma ya da seçtiğin ders/konu.",
    yapabilecekleri: [
      "Karma modda bütün derslerden rastgele soru gelir.",
      "Ders veya konu seçip sadece oradan çalışabilirsin.",
      "Yanlış yaptığın sorular otomatik olarak Hatalarım havuzuna düşer.",
      "Art arda doğru yaptığında seni kutlarım.",
    ],
    anahtarlar: ["hizli soru", "hizli sorular", "pratik"],
  },
  {
    rota: "/deneme",
    ad: "Deneme Sınavı",
    ozet: "Gerçek LGS provası: süreli, net hesaplı deneme.",
    yapabilecekleri: [
      "Sözel bölüm, sayısal bölüm veya tam deneme seçebilirsin.",
      "Kolay ve zor seviye seçeneği var.",
      "Gerçek LGS süresi uygulanır (sözel 75 dk, sayısal 80 dk).",
      "Bitince net hesabın ve tahmini puanın çıkar.",
    ],
    anahtarlar: ["deneme"],
  },
  {
    rota: "/cikmis-sorular",
    ad: "Çıkmış Sorular",
    ozet: "2018-2026 arası MEB'in gerçek LGS sorularının tamamı.",
    yapabilecekleri: [
      "Dokuz yılın soruları resmî cevap anahtarıyla birlikte.",
      "Süreli çözebilir, net hesabını görebilirsin.",
      "PDF olarak da açabilirsin.",
    ],
    anahtarlar: ["cikmis", "gecmis yil sorulari", "eski sorular"],
  },
  {
    rota: "/hatalarim",
    ad: "Hatalarım",
    ozet: "Yanlış yaptığın soruların havuzu ve aralıklı tekrar sistemi.",
    yapabilecekleri: [
      "Tekrar Zamanı: vadesi gelen sorular. Yanlıştan sonra 1 gün, bir doğrudan sonra 3 gün ileri itilir.",
      "Bugünün Hataları: bugün yanlış yapıp henüz pekiştirmediklerin.",
      "Tüm Geçmiş: ustalaşmadığın bütün sorular.",
      "Bir soruyu iki kez üst üste doğru yaparsan listeden çıkar.",
    ],
    anahtarlar: ["hatalarim", "hatali soru", "yanlislarim", "tekrar zamani"],
    girisGerekir: true,
  },
  {
    rota: "/sozluk",
    ad: "Türkçe Sözlük",
    ozet: "599 kelimelik LGS sözlüğü: gerçek, mecaz ve terim anlamlar, her anlam için örnek cümle.",
    yapabilecekleri: [
      "Kelime aratabilir ya da harf çubuğundan (A, B, C…) atlayabilirsin.",
      "Her kelimede anlamlar gerçek / mecaz / terim diye ayrılmıştır — LGS'nin sözcükte anlam soruları tam olarak bunu ölçer.",
      "Bana doğrudan “falanca kelimenin anlamı ne” diye de sorabilirsin, sayfaya gitmene gerek kalmaz.",
    ],
    // "sozlu": Türkçe ekleme sırasında k → ğ yumuşar (sözlük → sözlüğe).
    anahtarlar: ["sozlu", "kelime anlam"],
  },
  {
    rota: "/okullar",
    ad: "Okul Tarama",
    ozet: "Türkiye'nin en yüksek taban puanlı 99 lisesi ve yıl yıl puanları.",
    yapabilecekleri: [
      "Okul veya şehir arayabilir, tür (fen, Anadolu, imam hatip, meslek) ve şehir filtresi uygulayabilirsin.",
      "Bir okula dokununca 2018'den bugüne taban puanı, yüzdelik dilimi ve kontenjanı yıl yıl görünür.",
      "Her okulun kendi resmî sayfasına bağlantı vardır.",
      "Bana doğrudan “falanca lisenin 2023 taban puanı neydi” diye de sorabilirsin.",
    ],
    anahtarlar: ["okul", "lise", "taban puan", "okul tarama", "hangi lise"],
  },
  {
    rota: "/puan-hesapla",
    ad: "Puan Hesapla",
    ozet: "Netlerini girip tahmini LGS puanını görürsün.",
    yapabilecekleri: [
      "Her dersin doğru/yanlış sayısını girersin.",
      "Net = Doğru − (Yanlış ÷ 3) formülüyle netlerin hesaplanır.",
      "Türkçe, Matematik ve Fen ×4; İnkılap, Din ve İngilizce ×1 katsayılıdır.",
    ],
    anahtarlar: ["puan hesap", "net hesap", "lgs puan", "kac puan"],
  },
  {
    rota: "/rekabet",
    ad: "Rekabet",
    ozet: "Başka öğrencilerle 1v1 düello, lig sistemi ve aylık sezon.",
    yapabilecekleri: [
      "Maç ara: liginden rastgele bir rakiple eşleşirsin, 10 soruda en yüksek neti atan kazanır.",
      "Arkadaşına meydan oku: link paylaşıp özel maç yaparsın (bu maçlar puana etki etmez).",
      "Lig nişanı: ulaştığın en yüksek ligin arması kalıcıdır, sezon resetinde düşmez.",
      "Sezon kupası: her ayın 1'inde sezon kapanır, bitirdiğin lig ve sıralaman kupa olur (ilk 3 altın/gümüş/bronz).",
      "Yumuşak reset: yeni sezona bir önceki sezonun iki kademe altından, 50 puanla başlarsın.",
      "Sezon sıralaması (liderlik tablosu) ve maç geçmişin ayrı sayfalarda.",
    ],
    anahtarlar: ["rekabet", "duello", "dello", "1v1", "mac ara", "lig", "yaris"],
    girisGerekir: true,
  },
  {
    rota: "/rekabet/liderlik",
    ad: "Sezon sıralaması",
    ozet: "Bu sezonun liderlik tablosu.",
    yapabilecekleri: [],
    anahtarlar: ["liderlik", "siralama tablosu", "sezon siralamasi"],
    girisGerekir: true,
  },
  {
    rota: "/rekabet/davet",
    ad: "Arkadaşına meydan oku",
    ozet: "Link paylaşarak arkadaşınla özel düello yaparsın (puana etki etmez).",
    yapabilecekleri: [],
    anahtarlar: ["davet", "arkadasimla", "ozel mac", "meydan oku"],
    girisGerekir: true,
  },
  {
    rota: "/rekabet/gecmis",
    ad: "Maç geçmişi",
    ozet: "Oynadığın düelloların listesi ve sonuçları.",
    yapabilecekleri: [],
    anahtarlar: ["mac gecmis", "gecmis maclar"],
    girisGerekir: true,
  },
  {
    rota: "/rozetlerim",
    ad: "Rozetler",
    ozet: "Çalışırken kazandığın başarımlar.",
    yapabilecekleri: [
      "İlk adım, çalışma serisi, soru sayısı gibi hedefleri tamamladıkça rozet açılır.",
    ],
    anahtarlar: ["rozet", "basarim", "madalya"],
    girisGerekir: true,
  },
  {
    rota: "/profile",
    ad: "Profil ve ayarlar",
    ozet: "Bilgilerin, rekabet kimliğin, görünüm ve bildirim tercihlerin.",
    yapabilecekleri: [
      "Adını değiştirebilir, profil fotoğrafı yükleyebilirsin.",
      "Rekabet için takma ad (nickname) belirlersin.",
      "Görünüm: sınava kalan süre geri sayımını açıp kapatırsın.",
      "Bildirimler: günlük hedef hatırlatmasını açıp kapatırsın.",
    ],
    anahtarlar: ["profil", "ayar", "hesabim", "gorunum", "bildirim", "takma ad", "nickname"],
    girisGerekir: true,
  },
  {
    rota: "/geri-bildirim",
    ad: "Geri bildirim",
    ozet: "Hata bildirmek ya da öneri göndermek için form.",
    yapabilecekleri: [],
    anahtarlar: ["geri bildirim", "hata bildir", "oneri", "sikayet", "gorus"],
  },
  {
    rota: "/gizlilik",
    ad: "Gizlilik",
    ozet: "Hangi verilerin tutulduğunu anlatan sayfa.",
    yapabilecekleri: [],
    anahtarlar: ["gizlilik", "kisisel veri", "verilerim"],
  },
];

/** Yönlendirmeye izin verilen rotalar — site haritasından türetilir. */
export const GECERLI_ROTALAR: string[] = [
  ...SITE_HARITASI.map((b) => b.rota),
  "/login",
  "/register",
  "/hatalarim?gun=bugun",
];

/**
 * Gemini sistem istemi için site haritası metni.
 * Kısa tutulur; her bölüm için rota + özet + varsa maddeler.
 */
export function siteHaritasiMetni(): string {
  return SITE_HARITASI.map((b) => {
    const bas = `${b.rota} — ${b.ad}: ${b.ozet}`;
    if (b.yapabilecekleri.length === 0) return bas;
    return `${bas}\n${b.yapabilecekleri.map((y) => `    · ${y}`).join("\n")}`;
  }).join("\n");
}
