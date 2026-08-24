import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";

export const metadata = {
  title: "Gizlilik ve Kullanım — Rehberim",
  description:
    "Rehberim hangi bilgileri neden saklıyor, kimlerle paylaşıyor ve nasıl silinir.",
};

function Bolum({
  baslik,
  children,
}: {
  baslik: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-extrabold tracking-tight text-rehberim-navy">
        {baslik}
      </h2>
      <div className="mt-2 space-y-3 text-[15px] leading-relaxed text-rehberim-navy/80">
        {children}
      </div>
    </section>
  );
}

/**
 * Gizlilik ve kullanım metni.
 *
 * Kullanıcıların çoğu 14 yaşında olacağı için dil sade tutuldu: hangi
 * bilgi neden saklanıyor, kimlerle paylaşılıyor, nasıl silinir.
 */
export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-rehberim-muted/40">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
        <Link href="/">
          <LogoLockup />
        </Link>
        <Link
          href="/login"
          className="text-sm font-extrabold text-rehberim-navy/70 hover:text-rehberim-navy"
        >
          Giriş yap
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-5 pb-16">
        <div className="ring-hairline rounded-3xl border border-rehberim-border bg-white p-6 shadow-card sm:p-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-rehberim-navy sm:text-3xl">
            Gizlilik ve kullanım
          </h1>
          <p className="mt-2 text-sm text-rehberim-navy/65">
            Son güncelleme: 24 Ağustos 2026
          </p>

          <p className="mt-6 text-[15px] leading-relaxed text-rehberim-navy/80">
            Rehberim, LGS&apos;ye hazırlanan öğrenciler için ücretsiz bir
            çalışma platformudur. Bu sayfa hangi bilgileri neden sakladığımızı
            sade bir dille anlatır. Reklam göstermiyoruz ve kimsenin bilgisini
            satmıyoruz.
          </p>

          <Bolum baslik="Hangi bilgiler saklanıyor?">
            <p>
              <b>Hesap bilgilerin:</b> e-posta adresin, adın ve varsa profil
              fotoğrafın. Google ile giriş yaparsan bu bilgiler Google
              hesabından gelir. Şifreni biz görmüyoruz; giriş işlemleri Supabase
              adlı altyapı sağlayıcısı üzerinden yürür.
            </p>
            <p>
              <b>Çalışma verilerin:</b> hangi konuda ne kadar süre çalıştığın,
              çözdüğün testler ve sonuçları, yanlış yaptığın sorular, günlük
              hedefin ve serin. Bunlar ilerlemeni gösterebilmek ve yanlışlarını
              sana tekrar sorabilmek için tutulur.
            </p>
            <p>
              <b>Rekabet verilerin:</b> maç sonuçların, lig kademen, puanın ve
              seçtiğin takma adın. Takma adın ve lig nişanın maç yaptığın diğer
              öğrencilere ve liderlik tablosunda görünür — gerçek adın veya
              e-postan görünmez.
            </p>
            <p>
              <b>Geri bildirimlerin:</b> geri bildirim formundan gönderdiğin
              metin ve hangi sayfadan gönderdiğin.
            </p>
          </Bolum>

          <Bolum baslik="Rehber Baykuş'a yazdıkların">
            <p>
              Yapay zekâ yardımcıya yazdığın mesajlar, cevabın üretilmesi için
              Google&apos;ın Gemini servisine gönderilir. Sohbetlerini hesabında
              saklamıyoruz.
            </p>
            <p>
              Cevabı sana göre uyarlayabilmesi için mesajınla birlikte şunlar da
              gönderilir: <b>adın</b>, bu haftaki toplam çalışma süren, çalışma
              serin, zorlandığın konu başlıkların ve tekrar zamanı gelmiş yanlış
              soru sayın. E-posta adresin, şifren ve rekabet takma adın
              gönderilmez.
            </p>
            <p>
              Baykuş&apos;a kimlik numarası, adres, telefon gibi kişisel
              bilgiler yazma — buna hiçbir zaman ihtiyaç duymaz.
            </p>
          </Bolum>

          <Bolum baslik="Tarayıcında saklananlar">
            <p>
              Site hızlı çalışsın ve internetin kesildiğinde ilerlemen
              kaybolmasın diye bazı bilgiler cihazının tarayıcısında da tutulur:
              yanlış yaptığın soruların listesi, çözdüğün hızlı sorular, tema
              tercihin ve tanıtım turunu görüp görmediğin. Bunlar cihazından
              çıkmaz; tarayıcı verilerini temizlersen silinirler.
            </p>
          </Bolum>

          <Bolum baslik="Kimlerle paylaşılıyor?">
            <p>
              Bilgilerini kimseye satmıyoruz ve reklam amacıyla paylaşmıyoruz.
              Platformun çalışabilmesi için üç hizmet sağlayıcı kullanılıyor:
              veritabanı ve giriş için <b>Supabase</b>, sitenin yayını için{" "}
              <b>Vercel</b>, yapay zekâ yardımcı için <b>Google Gemini</b>.
            </p>
          </Bolum>

          <Bolum baslik="Verilerini silmek">
            <p>
              Hesabının ve tüm çalışma verilerinin silinmesini istersen aşağıdaki
              adrese yazman yeterli. Talebini aldıktan sonra hesabına bağlı
              kayıtlar silinir.
            </p>
          </Bolum>

          <Bolum baslik="Yaş ve veli onayı">
            <p>
              Platform 8. sınıf öğrencilerine yöneliktir; kullanıcıların çoğu 18
              yaşından küçüktür. 18 yaşından küçüksen bu siteyi velinin bilgisi
              ve onayıyla kullanmalısın. Velin, çocuğunun verilerinin silinmesini
              her zaman isteyebilir.
            </p>
          </Bolum>

          <Bolum baslik="Kullanım kuralları">
            <p>
              Sitedeki ders içerikleri ve sorular kişisel çalışma içindir.
              Rekabet modunda başka bir öğrenciyi rahatsız edecek takma adlar
              kullanılamaz; böyle bir durumda takma ad sıfırlanabilir.
            </p>
            <p>
              Çıkmış sorular MEB ÖDSGM tarafından yayımlanan resmî sınav
              kitapçıklarından alınmıştır ve kaynağıyla birlikte gösterilir.
            </p>
          </Bolum>

          <Bolum baslik="İletişim">
            <p>
              Soru, silme talebi veya bir hata bildirimi için:{" "}
              <a
                href="mailto:alikivancpekesen@gmail.com"
                className="font-bold text-rehberim-navy underline decoration-rehberim-accent decoration-2 underline-offset-2"
              >
                alikivancpekesen@gmail.com
              </a>
              . Giriş yaptıysan{" "}
              <Link
                href="/geri-bildirim"
                className="font-bold text-rehberim-navy underline decoration-rehberim-accent decoration-2 underline-offset-2"
              >
                geri bildirim formunu
              </Link>{" "}
              da kullanabilirsin.
            </p>
          </Bolum>
        </div>

        <p className="mt-6 text-center text-sm text-rehberim-navy/50">
          <Link href="/" className="font-semibold hover:underline">
            Anasayfaya dön
          </Link>
        </p>
      </article>
    </main>
  );
}
