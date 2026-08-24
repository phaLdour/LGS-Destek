import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import type { KaldiginYer } from "@/lib/bugununPlani";

/**
 * "Kaldığın yer" kartı.
 *
 * Yeni kullanıcıda HİÇ görünmez — getBugununPlani() yeni kullanıcı için
 * kaldiginYer'i null döndürür. Öğrenci bir konuya başladığı anda kart
 * kendiliğinden belirir.
 */
export function KaldiginYerCard({ veri }: { veri: KaldiginYer | null }) {
  if (!veri) return null;

  const zaman =
    veri.gunOnce === 0
      ? "bugün"
      : veri.gunOnce === 1
        ? "dün"
        : `${veri.gunOnce} gün önce`;

  return (
    <Link
      href={veri.href}
      className="group ring-hairline relative mt-4 flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-navy/10 bg-white p-4 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-navy/20 hover:shadow-soft"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rehberim-navy text-white transition-transform duration-300 ease-snap group-hover:scale-[1.05]">
        <PlayCircle className="h-6 w-6" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-navy/45">
          Kaldığın yer · {zaman}
        </p>
        <p className="mt-0.5 truncate text-[15px] font-extrabold tracking-tight text-rehberim-navy">
          {veri.topicName}
        </p>
        <p className="truncate text-xs text-rehberim-navy/55">
          {veri.subjectName}
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 rounded-xl bg-rehberim-muted px-3 py-2 text-xs font-extrabold text-rehberim-navy transition-colors group-hover:bg-rehberim-accent/15">
        Devam et
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-snap group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
