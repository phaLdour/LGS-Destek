import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  FileText,
  Flame,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DenemeGelisimi } from "@/components/deneme/DenemeGelisimi";
import { cikmisBransListesi } from "@/lib/cikmisBransDeneme";
import { BRANSLAR, getExamConfig } from "@/lib/mockExam";
import { getShellUser } from "@/lib/user";

const META = [
  {
    kind: "sozel" as const,
    icon: BookOpenCheck,
    tint: "from-blue-500 to-indigo-600",
    description:
      "Türkçe, T.C. İnkılap Tarihi, Din Kültürü ve İngilizce. Gerçek LGS sözel bölümünün aynısı.",
  },
  {
    kind: "sayisal" as const,
    icon: Calculator,
    tint: "from-emerald-500 to-teal-600",
    description:
      "Matematik ve Fen Bilimleri. Gerçek LGS sayısal bölümünün aynısı.",
  },
  {
    kind: "tam" as const,
    icon: FileText,
    tint: "from-rehberim-accent to-amber-600",
    description:
      "Sözel + sayısal arka arkaya. Sınav günü provası.",
  },
];

export default async function DenemePage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <Link
        href="/dashboard"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Anasayfaya dön
      </Link>

      <header className="ring-hairline mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
          Deneme Sınavı
        </h1>
        <p className="mt-1 text-pretty text-sm text-rehberim-navy/55">
          Tam denemeler gerçek LGS formatında. Tek bir derse yüklenmek
          istersen aşağıdaki <strong>branş denemeleri</strong> var.
        </p>
      </header>

      <div className="space-y-4">
        {META.map((m) => {
          const easy = getExamConfig(m.kind, "kolay");
          const hard = getExamConfig(m.kind, "zor");
          const Icon = m.icon;
          return (
            <div
              key={m.kind}
              className="ring-hairline overflow-hidden rounded-2xl border border-rehberim-border bg-white shadow-card transition-shadow duration-300 ease-smooth hover:shadow-soft"
            >
              <div
                className={`relative flex items-center gap-4 overflow-hidden bg-gradient-to-br ${m.tint} p-5 text-white`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-3xl"
                />
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/25 backdrop-blur-sm">
                  <Icon className="h-8 w-8" />
                </span>
                <div className="relative min-w-0 flex-1">
                  <p className="text-lg font-extrabold tracking-tight">
                    {easy.kind === "sozel"
                      ? "Sözel Bölüm"
                      : easy.kind === "sayisal"
                        ? "Sayısal Bölüm"
                        : "Tam Deneme"}
                  </p>
                  <p className="text-pretty text-sm text-white/85">
                    {m.description}
                  </p>
                  <p className="mt-1 text-xs font-bold tabular-nums text-white/95">
                    {easy.totalQuestions} soru
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
                <Link
                  href={`/deneme/${m.kind}?zorluk=kolay`}
                  className="group flex items-center gap-3 rounded-xl border border-rehberim-border bg-rehberim-muted/40 p-4 transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-rehberim-accent/50 hover:bg-rehberim-muted"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700 ring-1 ring-green-200">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold tracking-tight text-rehberim-navy">
                      Kolay
                    </p>
                    <p className="text-xs text-rehberim-navy/55">
                      Hızlı Sorular havuzu · {easy.durationMinutes} dk
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/deneme/${m.kind}?zorluk=zor`}
                  className="group flex items-center gap-3 rounded-xl border border-rehberim-border bg-rehberim-muted/40 p-4 transition-all duration-200 ease-smooth hover:-translate-y-px hover:border-red-400/60 hover:bg-rehberim-muted"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 ring-1 ring-red-200">
                    <Flame className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold tracking-tight text-rehberim-navy">
                      Zor
                    </p>
                    <p className="text-xs text-rehberim-navy/55">
                      Yeni nesil sorular · {hard.durationMinutes} dk
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Branş denemeleri — tek ders, gerçek LGS soru sayısı ve temposu ── */}
      <section className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-rehberim-accent-deep" />
          <h2 className="text-lg font-extrabold tracking-tight text-rehberim-navy">
            Branş denemesi
          </h2>
        </div>
        <p className="mb-3 max-w-prose text-sm text-rehberim-navy/55">
          Tek ders, gerçek LGS&apos;deki soru sayısı ve temposuyla. Türkçe,
          Matematik ve Fen 20&apos;şer soru; İnkılap, Din ve İngilizce
          10&apos;ar.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {BRANSLAR.map((b) => {
            const kolay = getExamConfig(b.kind, "kolay");
            return (
              <div
                key={b.kind}
                className="ring-hairline rounded-2xl border border-rehberim-border bg-white p-4 shadow-card"
              >
                <p className="text-sm font-extrabold text-rehberim-navy">
                  {b.subjectName}
                </p>
                <p className="mt-0.5 text-xs tabular-nums text-rehberim-navy/55">
                  {b.count} soru · {kolay.durationMinutes} dakika
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/deneme/${b.kind}?zorluk=kolay`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-3 py-2 text-xs font-bold text-rehberim-navy transition hover:border-rehberim-accent/50 hover:bg-rehberim-muted"
                  >
                    <Sparkles className="h-4 w-4 text-green-700" />
                    Kolay
                  </Link>
                  <Link
                    href={`/deneme/${b.kind}?zorluk=zor`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-3 py-2 text-xs font-bold text-rehberim-navy transition hover:border-red-400/60 hover:bg-rehberim-muted"
                  >
                    <Flame className="h-4 w-4 text-red-600" />
                    Zor
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Çıkmış sorulardan branş denemesi — gerçek LGS soruları ── */}
      <section className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <Archive className="h-5 w-5 text-rehberim-accent-deep" />
          <h2 className="text-lg font-extrabold tracking-tight text-rehberim-navy">
            Çıkmış sorulardan branş denemesi
          </h2>
        </div>
        <p className="mb-3 max-w-prose text-sm text-rehberim-navy/55">
          Aynı soru sayısı ve süre, ama sorular 2018&#8209;2026 arasındaki{" "}
          <strong className="text-rehberim-navy">gerçek LGS sınavlarından</strong>{" "}
          rastgele seçilir. Her açılışta farklı bir set gelir; havuz sabit
          olduğu için çok denersen sorular tekrar edebilir.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {cikmisBransListesi().map((c) => (
            <Link
              key={c.yol}
              href={`/deneme/cikmis/${c.yol}`}
              className="ring-hairline flex items-center gap-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card transition hover:border-rehberim-accent hover:shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rehberim-accent text-rehberim-on-accent">
                <Archive className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold text-rehberim-navy">
                  {c.tanim.subjectName}
                </span>
                <span className="mt-0.5 block text-xs tabular-nums text-rehberim-navy/55">
                  {c.tanim.count} soru · {c.sureDk} dakika ·{" "}
                  {c.havuz} soruluk havuzdan
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/10 p-4 text-sm text-rehberim-navy">
        <p className="font-bold">İpuçları</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-rehberim-navy/70">
          <li>Süre dolunca sınav otomatik biter; cevapsız sorular boş sayılır.</li>
          <li>
            Sağ üstten <strong>ders ders</strong> hızlıca geçebilir, soru
            numarası panelinden istediğine atlayabilirsin.
          </li>
          <li>Bitirdiğinde net hesabı, ders dağılımı ve detaylı rapor görünür.</li>
          <li>
            Zor modda <em>yeni nesil</em> (paragraf, çoklu işlem, yorum)
            sorular ağırlıkta; süre aynı (gerçek LGS süresi), zorluk yalnız
            soru tarafından gelir. Eksik kalan dersler için kolay havuzdan
            tamamlanır.
          </li>
          <li>Yanlış cevapların otomatik &quot;Hatalarım&quot; havuzuna düşer.</li>
        </ul>
      </div>

      {/* Net eğilimi — 2+ denemesi olana görünür; sayfayı bekletmez */}
      <Suspense fallback={null}>
        <DenemeGelisimi />
      </Suspense>
    </AppShell>
  );
}
