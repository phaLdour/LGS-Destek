import Link from "next/link";
import {
  Archive,
  BookOpen,
  Calculator,
  MessageCircleQuestion,
  Repeat,
  Swords,
} from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { OwlSvg } from "@/components/brand/Owl";

/**
 * Giriş yapmamış ziyaretçinin gördüğü tanıtım sayfası.
 *
 * Buradaki her sayı içerikten doğrulanmıştır: 6 ders, 49 konu,
 * 2.500'ü aşkın soru, 2018-2026 arası 9 yılın çıkmış soruları.
 * Abartılı iddia yok — bir öğrenci girdiğinde vaat edilen neyse onu bulur.
 */

const OZELLIKLER = [
  {
    icon: BookOpen,
    baslik: "6 ders, 49 konu",
    metin:
      "49 konunun hepsinde konu haritası, anlatım, çalışma kartları, LGS tuzakları ve test. Matematik, Türkçe ve Fen'de ayrıca 22 konu videosu.",
  },
  {
    icon: Archive,
    baslik: "9 yılın çıkmış soruları",
    metin:
      "2018'den 2026'ya kadar MEB'in gerçek LGS soruları, resmî cevap anahtarıyla. Süreli çöz, net hesabını gör.",
  },
  {
    icon: MessageCircleQuestion,
    baslik: "Rehber Baykuş",
    metin:
      "Takıldığın yeri sorabileceğin yapay zekâ yardımcı. Yalnız LGS konularında konuşur, seni doğru sayfaya götürür.",
  },
  {
    icon: Swords,
    baslik: "1v1 düello",
    metin:
      "Başka bir öğrenciyle 10 soruluk maç. 5 lig, sezon sıralaması, kalıcı lig nişanı. Arkadaşına link atıp özel maç da yapabilirsin.",
  },
  {
    icon: Repeat,
    baslik: "Hatalarım",
    metin:
      "Yanlış yaptığın soru unutulmaz. Aralıklı tekrarla karşına yeniden çıkar; iki kez üst üste doğru yaparsan havuzdan düşer.",
  },
  {
    icon: Calculator,
    baslik: "LGS puan hesaplayıcı",
    metin:
      "Netlerini gir, tahmini LGS puanını gör. Deneme sonrası nerede olduğunu anla.",
  },
] as const;

export function LandingPage() {
  return (
    <main className="min-h-screen bg-rehberim-muted/40">
      {/* Üst bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <LogoLockup />
        <Link
          href="/login"
          className="rounded-xl border border-rehberim-border bg-white px-4 py-2 text-sm font-extrabold text-rehberim-navy transition hover:border-rehberim-accent/40"
        >
          Giriş yap
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pb-4 pt-8 sm:pt-14">
        <div className="ring-hairline relative overflow-hidden rounded-3xl bg-gradient-to-br from-rehberim-navy via-rehberim-navy to-rehberim-navy-light p-7 text-white shadow-elevated sm:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rehberim-accent/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-rehberim-accent-light">
                Ücretsiz LGS çalışma platformu
              </p>
              <h1 className="mt-3 text-balance text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-[2.75rem]">
                LGS&apos;ye giden yolda{" "}
                <span className="text-rehberim-accent-light">yanındayız</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/75">
                Müfredatın tamamı, dokuz yılın çıkmış soruları, iki binden fazla
                alıştırma sorusu ve seni tanıyan bir çalışma takibi. Hepsi tek
                yerde, tamamen ücretsiz.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-6 py-3 text-sm font-extrabold text-white shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
                >
                  Ücretsiz hesap oluştur
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Hesabım var
                </Link>
              </div>
            </div>
            <OwlSvg decorative className="mx-auto h-40 w-40 shrink-0 animate-float drop-shadow-[0_18px_36px_rgba(0,0,0,0.4)] sm:h-48 sm:w-48" />
          </div>
        </div>
      </section>

      {/* Sayılar */}
      <section className="mx-auto max-w-5xl px-5 py-8">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { s: "6", a: "ders" },
            { s: "49", a: "konu" },
            { s: "2.500+", a: "alıştırma sorusu" },
            { s: "9", a: "yıllık çıkmış sınav" },
          ].map((x) => (
            <div
              key={x.a}
              className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-4 text-center shadow-card"
            >
              <dt className="text-2xl font-extrabold tracking-tight text-rehberim-navy">
                {x.s}
              </dt>
              <dd className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-rehberim-navy/60">
                {x.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Özellikler */}
      <section className="mx-auto max-w-5xl px-5 pb-10">
        <h2 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
          Neler var?
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OZELLIKLER.map((o) => (
            <div
              key={o.baslik}
              className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-5 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rehberim-accent/12 text-rehberim-accent ring-1 ring-rehberim-accent/15">
                <o.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3.5 text-base font-extrabold tracking-tight text-rehberim-navy">
                {o.baslik}
              </h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-rehberim-navy/70">
                {o.metin}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Kapanış */}
      <section className="mx-auto max-w-5xl px-5 pb-14">
        <div className="ring-hairline flex flex-col items-center gap-4 rounded-3xl border border-rehberim-border bg-white px-6 py-9 text-center shadow-card">
          <h2 className="text-balance text-xl font-extrabold tracking-tight text-rehberim-navy">
            Hesap açmak 30 saniye sürüyor
          </h2>
          <p className="max-w-md text-pretty text-sm text-rehberim-navy/70">
            Çalışma sürenin, çözdüğün soruların ve hatalarının kaydedilmesi için
            hesap gerekiyor. Ücret yok, reklam yok.
          </p>
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-6 py-3 text-sm font-extrabold text-white shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
          >
            Ücretsiz başla
          </Link>
        </div>
      </section>

      <footer className="border-t border-rehberim-border/70 bg-white/60">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-6 text-sm text-rehberim-navy/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Rehberim — LGS çalışma platformu</p>
          <nav className="flex gap-4">
            <Link href="/gizlilik" className="font-semibold hover:underline">
              Gizlilik ve kullanım
            </Link>
            <Link href="/login" className="font-semibold hover:underline">
              Giriş yap
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
