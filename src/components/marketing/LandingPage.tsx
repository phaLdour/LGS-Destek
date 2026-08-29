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
import { getAllSubjects, getVideoCoverage } from "@/content";
import { SOZLUK } from "@/content/sozluk-veri";
import { OKULLAR } from "@/content/okullar";

/**
 * Giriş yapmamış ziyaretçinin gördüğü tanıtım sayfası.
 *
 * Buradaki her sayı içerikten doğrulanmıştır: 6 ders, 49 konu,
 * 2.500'ü aşkın soru, 2018-2026 arası 9 yılın çıkmış soruları.
 * Abartılı iddia yok — bir öğrenci girdiğinde vaat edilen neyse onu bulur.
 */

/**
 * Video cümlesi elle yazılmaz: videos.json'dan sayılır. Videolar
 * yüklendikçe metin kendiliğinden doğru kalır, "22 video" yazıp
 * 40'a çıkınca yalan söylemez.
 */
function videoCumlesi(): string {
  const { videolu, toplam, tamam } = getVideoCoverage();
  if (videolu === 0) return "";
  if (tamam) return " Her konuda kısa bir anlatım videosu var.";
  return ` ${videolu} konuda ayrıca kısa bir anlatım videosu var (${toplam} konudan).`;
}

/**
 * Tanıtım sayıları İÇERİKTEN türetilir — içerik büyüdükçe sayfa
 * kendiliğinden doğruyu söyler, elle güncelleme unutulmaz.
 * (Aşağı yuvarlanır: "2.612 soru" yerine "2.600+" gibi.)
 */
function sayilariHesapla() {
  const dersler = getAllSubjects();
  const konu = dersler.reduce((a, s) => a + s.topics.length, 0);
  const soru = dersler.reduce(
    (a, s) =>
      a +
      s.topics.reduce(
        (b, t) => b + (t.quiz?.length ?? 0) + (t.quickQuestions?.length ?? 0),
        0,
      ),
    0,
  );
  const soruYuvarlak = Math.floor(soru / 100) * 100;
  return [
    { sayi: String(konu), alt: `konu · ${dersler.length} ders` },
    { sayi: `${soruYuvarlak.toLocaleString("tr-TR")}+`, alt: "alıştırma sorusu" },
    { sayi: String(SOZLUK.length), alt: "kelimelik sözlük" },
    { sayi: String(OKULLAR.length), alt: "lisenin taban puanı" },
  ] as const;
}
const SAYILAR = sayilariHesapla();

const OZELLIKLER = [
  {
    icon: BookOpen,
    baslik: "6 ders, 49 konu",
    metin:
      "49 konunun hepsinde konu haritası, anlatım, çalışma kartları, LGS tuzakları ve test." +
      videoCumlesi(),
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
      "Takıldığın yeri sorabileceğin yapay zekâ yardımcısı. Yalnız LGS konularında konuşur, seni doğru sayfaya götürür.",
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

      {/* Hero — rakamlar kahramanın içinde (tasarım tuvalinde seçilen düzen:
          ziyaretçi kaydırmadan ölçeği görsün diye sayılar yukarı taşındı) */}
      <section className="mx-auto max-w-5xl px-5 pb-6 pt-8 sm:pt-14">
        <div className="ring-hairline relative overflow-hidden rounded-3xl bg-gradient-to-br from-rehberim-navy-dark via-rehberim-navy to-rehberim-navy-light p-7 text-white shadow-elevated sm:p-11">
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-rehberim-accent/16 blur-3xl"
          />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start">
            <div className="min-w-0 flex-1">
              <h1 className="text-balance text-3xl font-extrabold leading-[1.06] tracking-tight sm:text-[2.85rem]">
                LGS&apos;nin tamamı,{" "}
                <span className="text-rehberim-accent-light">tek yerde</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-relaxed text-white/78">
                Konu anlatımından çıkmış sorulara, yapay zekâ yardımcıdan 1v1
                düelloya kadar. Ücret yok, reklam yok.
              </p>

              <dl className="mt-6 grid max-w-md grid-cols-2 gap-2.5">
                {SAYILAR.map((x) => (
                  <div
                    key={x.alt}
                    className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3.5"
                  >
                    <dt className="text-[1.35rem] font-extrabold leading-none tracking-tight">
                      {x.sayi}
                    </dt>
                    <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/65">
                      {x.alt}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark px-6 py-3 text-sm font-extrabold text-rehberim-on-accent shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
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
            <OwlSvg
              decorative
              className="mx-auto h-44 w-44 shrink-0 animate-float drop-shadow-[0_18px_36px_rgba(0,0,0,0.4)] sm:mt-2 sm:h-52 sm:w-52"
            />
          </div>
        </div>
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
            className="rounded-xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark px-6 py-3 text-sm font-extrabold text-rehberim-on-accent shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
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
