import Link from "next/link";
import { SUBJECTS } from "@/components/subjects/SubjectGrid";
import { KarmaCard } from "./KarmaCard";

/**
 * Hızlı Sorular için ders seçimi: 6 ders + ayırt edici Karma sekmesi.
 */
export function QuickSubjectGrid() {
  return (
    <div className="space-y-4">
      <KarmaCard
        href="/hizli-sorular/karma"
        hint="Tüm derslerden rastgele sorular — geniş pekiştirme"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECTS.map((s) => {
          const Icon = s.Icon;
          return (
            <Link
              key={s.slug}
              href={`/hizli-sorular/${s.slug}`}
              className="flex items-center gap-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card transition hover:border-rehberim-accent/40 hover:shadow-soft"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.badge} shadow-sm`}
              >
                <Icon className={`h-8 w-8 ${s.iconClass}`} />
              </span>
              <div className="min-w-0">
                <p className="font-bold text-rehberim-navy">{s.name}</p>
                <p className="truncate text-xs text-rehberim-navy/55">{s.short}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
