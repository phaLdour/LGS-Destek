import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Archive, CalendarDays } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { getSubjectContent, getTopic } from "@/content";
import {
  TUR_BOYU,
  konuCikmisSorulari,
  turSorulari,
  turSuresiDk,
} from "@/lib/konuCikmisSorular";
import { getShellUser } from "@/lib/user";

/**
 * Bir konunun çıkmış soruları — tur listesi.
 *
 * Neden turlar: bir konuda 65 soruya kadar birikiyor (Türkçe/Paragrafta
 * Anlam). Hepsini tek testte vermek öğrenciyi yorar ve yarıda bıraktırır.
 * 10'arlık turlar hem bitirilebilir uzunlukta, hem de öğrenci nerede
 * kaldığını turdan takip edebiliyor.
 */
export default async function KonuCikmisSorularPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string }>;
}) {
  const { subject, topic } = await params;
  const subjectContent = getSubjectContent(subject);
  const topicData = getTopic(subject, topic);
  if (!subjectContent || !topicData) notFound();

  const sorular = konuCikmisSorulari(subject, topic);
  if (sorular.length === 0) notFound();

  const user = await getShellUser();
  const turAdedi = Math.ceil(sorular.length / TUR_BOYU);
  const yillar = [...new Set(sorular.map((q) => q.year))].sort((a, b) => b - a);

  return (
    <AppShell user={user}>
      <Link
        href={`/ders/${subject}/${topic}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        {topicData.name} konusuna dön
      </Link>

      <header className="rounded-3xl border border-rehberim-border bg-rehberim-surface p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-rehberim-accent-deep">
          {subjectContent.name} · {topicData.name}
        </p>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-rehberim-navy">
          <Archive className="h-6 w-6 text-rehberim-accent-deep" strokeWidth={2.2} />
          LGS&apos;de çıkmış sorular
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-snug text-rehberim-navy/60">
          Bu konudan <strong className="text-rehberim-navy">{sorular.length}</strong>{" "}
          gerçek LGS sorusu var. Sorular MEB kitapçıklarından alınmıştır, doğru
          cevaplar resmî cevap anahtarındandır. Yeniden eskiye sıralı,{" "}
          {TUR_BOYU}&apos;arlık turlar hâlinde.
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-rehberim-navy/50">
          <CalendarDays className="h-4 w-4" />
          {yillar.map((y) => (
            <span
              key={y}
              className="rounded-md bg-rehberim-muted px-1.5 py-0.5 tabular-nums"
            >
              {y}
            </span>
          ))}
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: turAdedi }, (_, i) => i + 1).map((tur) => {
          const turSoru = turSorulari(sorular, tur);
          const dk = turSuresiDk(turSoru);
          const turYillar = [...new Set(turSoru.map((q) => q.year))].sort(
            (a, b) => b - a,
          );
          return (
            <Link
              key={tur}
              href={`/ders/${subject}/${topic}/cikmis-sorular/${tur}`}
              className="group flex items-center gap-4 rounded-2xl border border-rehberim-border bg-rehberim-surface p-4 shadow-card transition hover:border-rehberim-accent hover:shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rehberim-muted font-mono text-base font-bold tabular-nums text-rehberim-accent-deep">
                {tur}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-rehberim-navy">
                  {tur}. tur · {turSoru.length} soru
                </span>
                <span className="mt-0.5 block text-xs text-rehberim-navy/55">
                  {dk} dakika ·{" "}
                  {turYillar.length === 1
                    ? `${turYillar[0]}`
                    : `${turYillar[turYillar.length - 1]}–${turYillar[0]}`}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-rehberim-navy/40 transition group-hover:translate-x-0.5 group-hover:text-rehberim-accent-deep"
                strokeWidth={2.4}
              />
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
