import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { SubjectContent } from "@/content/types";
import { KarmaCard } from "./KarmaCard";

/**
 * Dersin konu seçimi: üstte ders bazlı Karma sekmesi, altında konular.
 */
export function QuickTopicList({ subject }: { subject: SubjectContent }) {
  return (
    <div className="space-y-4">
      <KarmaCard
        href={`/hizli-sorular/${subject.slug}/karma`}
        hint={`${subject.name} dersinden karışık sorular`}
      />
      <ul className="space-y-2">
        {subject.topics.map((t) => {
          const count = t.quickQuestions?.length ?? 0;
          return (
            <li key={t.id}>
              <Link
                href={`/hizli-sorular/${subject.slug}/${t.id}`}
                className="flex items-center gap-3 rounded-2xl border border-rehberim-border bg-white p-3 shadow-card transition hover:border-rehberim-accent/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-rehberim-navy">{t.name}</p>
                  <p className="text-xs text-rehberim-navy/55">
                    {count > 0 ? `${count} soru havuzu` : "Soru havuzu yakında eklenecek"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-rehberim-navy/30" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
