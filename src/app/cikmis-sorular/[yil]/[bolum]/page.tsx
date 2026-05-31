import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileWarning, Play } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { getPastExam } from "@/content/cikmis-sorular";
import type { ExamSection } from "@/content/cikmis-sorular/types";
import { getShellUser } from "@/lib/user";

const VALID: ExamSection[] = ["sozel", "sayisal"];

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ yil: string; bolum: string }>;
}) {
  const { yil, bolum } = await params;
  const year = Number(yil);
  if (!Number.isFinite(year)) notFound();
  if (!VALID.includes(bolum as ExamSection)) notFound();

  const meta = getPastExam(year, bolum as ExamSection);
  if (!meta) notFound();

  // PDF dosyasının fiziksel varlığını kontrol et
  const pdfExists = meta.pdfPath
    ? existsSync(path.join(process.cwd(), "public", meta.pdfPath.replace(/^\//, "")))
    : false;

  const interactiveReady = Boolean(meta.questions && meta.questions.length > 0);

  const user = await getShellUser();

  return (
    <AppShell user={user}>
      <Link
        href={`/cikmis-sorular/${year}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        {year} bölüm seçimine dön
      </Link>

      <header className="mb-5 rounded-3xl border border-rehberim-border bg-white p-5 shadow-card">
        <h1 className="text-xl font-extrabold text-rehberim-navy">
          {meta.label}
        </h1>
        <p className="mt-1 text-sm text-rehberim-navy/55">
          {meta.totalQuestions} soru · {meta.durationMinutes} dakika
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* PDF indir */}
        {pdfExists ? (
          <a
            href={meta.pdfPath}
            download
            className="group flex items-center gap-4 rounded-2xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card transition hover:scale-[1.01] hover:shadow-soft"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Download className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-extrabold">PDF olarak indir</p>
              <p className="text-sm text-white/85">
                Orijinal MEB sınav kitapçığı
              </p>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted/50 p-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rehberim-border text-rehberim-navy/40">
              <FileWarning className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-extrabold text-rehberim-navy/70">
                PDF hazırlanıyor
              </p>
              <p className="text-sm text-rehberim-navy/55">
                Bu yılın sınav kitapçığı çok yakında eklenecek
              </p>
            </div>
          </div>
        )}

        {/* İnteraktif çöz */}
        {interactiveReady ? (
          <Link
            href={`/cikmis-sorular/${year}/${bolum}/coz`}
            className="group flex items-center gap-4 rounded-2xl border border-rehberim-accent/40 bg-gradient-to-br from-rehberim-accent to-amber-500 p-5 text-white shadow-card transition hover:scale-[1.01] hover:shadow-soft"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Play className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-extrabold">İnteraktif çöz</p>
              <p className="text-sm text-white/85">
                Süreli, gezilebilir, net hesaplı
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted/50 p-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rehberim-border text-rehberim-navy/40">
              <Play className="h-8 w-8" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-extrabold text-rehberim-navy/70">
                İnteraktif yakında
              </p>
              <p className="text-sm text-rehberim-navy/55">
                Soruları uygulamada tek tek çözmek için bekle
              </p>
            </div>
          </div>
        )}
      </div>

      {meta.source && (
        <p className="mt-6 text-center text-xs text-rehberim-navy/45">
          Kaynak: {meta.source}
        </p>
      )}
    </AppShell>
  );
}
