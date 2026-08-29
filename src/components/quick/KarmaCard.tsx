import Link from "next/link";
import { Shuffle } from "lucide-react";

/**
 * Karma sekmesi — diğer ders kartlarından görsel olarak ayrı, gradient + ⚡ ikon.
 */
export function KarmaCard({
  href,
  label = "Karma",
  hint,
}: {
  href: string;
  label?: string;
  hint: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-rehberim-accent/40 bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark p-4 text-rehberim-on-accent shadow-card transition hover:scale-[1.02] hover:shadow-soft"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
        <Shuffle className="h-8 w-8" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-extrabold">{label}</p>
        <p className="text-sm text-rehberim-navy/75">{hint}</p>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
        ⚡ özel
      </span>
    </Link>
  );
}
