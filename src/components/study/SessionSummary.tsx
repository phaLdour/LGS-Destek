"use client";

import { BookmarkCheck, CheckCircle2, Clock, Loader2, X } from "lucide-react";
import { OwlSvg } from "@/components/brand/Owl";
import { useStudySession } from "./StudySessionProvider";

function formatDuration(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec} sn`;
  if (sec === 0) return `${m} dk`;
  return `${m} dk ${sec} sn`;
}

export function SessionSummary() {
  const { summary, closeSummary } = useStudySession();
  if (!summary) return null;

  const hasAnswers = summary.correct + summary.wrong > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-rehberim-navy-dark/50 backdrop-blur-sm"
        onClick={closeSummary}
      />
      <div className="relative w-full max-w-md animate-scale-in overflow-hidden rounded-3xl bg-white shadow-soft">
        {/* başlık */}
        <div className="relative flex flex-col items-center gap-2 bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark px-6 pb-6 pt-8 text-center text-white">
          <button
            onClick={closeSummary}
            aria-label="Kapat"
            className="absolute right-4 top-4 rounded-lg p-1.5 transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
          <OwlSvg className="h-16 w-16" />
          <h2 className="text-xl font-extrabold">Ders özeti</h2>
          <p className="text-sm text-white/70">Harika iş çıkardın! 🎉</p>
        </div>

        {/* içerik */}
        <div className="space-y-3 p-6">
          <Row
            icon={<Clock className="h-5 w-5" />}
            label="Çalışma süresi"
            value={formatDuration(summary.durationSeconds)}
          />

          <div className="rounded-2xl border border-rehberim-border bg-rehberim-muted p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-bold text-rehberim-navy">
              <BookmarkCheck className="h-5 w-5 text-rehberim-accent" />
              Çalışılan konular
            </p>
            {summary.studiedTopicNames.length > 0 ? (
              <ul className="space-y-1.5">
                {summary.studiedTopicNames.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 text-sm text-rehberim-navy/80"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-rehberim-accent" />
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-rehberim-navy/50">
                Bu oturumda konu açmadın.
              </p>
            )}
          </div>

          {hasAnswers && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-green-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-green-600">
                  {summary.correct}
                </p>
                <p className="text-xs font-semibold text-green-700">Doğru</p>
              </div>
              <div className="rounded-2xl bg-red-50 p-4 text-center">
                <p className="text-2xl font-extrabold text-red-500">
                  {summary.wrong}
                </p>
                <p className="text-xs font-semibold text-red-600">Yanlış</p>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-rehberim-navy/45">
            {summary.saving
              ? "Kaydediliyor…"
              : summary.saved
                ? "İlerlemen kaydedildi."
                : "Çevrimdışı: bu oturum kaydedilmedi (giriş gerekli)."}
          </p>

          <button
            onClick={closeSummary}
            className="w-full rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-rehberim-navy-dark"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-rehberim-border bg-white px-4 py-3">
      <span className="flex items-center gap-2 text-sm font-semibold text-rehberim-navy">
        <span className="text-rehberim-accent">{icon}</span>
        {label}
      </span>
      <span className="text-sm font-extrabold text-rehberim-navy">{value}</span>
    </div>
  );
}
