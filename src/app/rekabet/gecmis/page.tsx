import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  History,
  Minus,
  Swords,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AvatarWithCrest } from "@/components/competitive/AvatarWithCrest";
import { rankLabel } from "@/lib/competitive/ranks";
import { getMatchHistory, type MatchHistoryRow } from "@/lib/competitive/server";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Maç geçmişi — Rekabet",
  description: "Oynadığın 1v1 düellolar, sonuçları ve puan değişimleri.",
};

const OUTCOME = {
  win: { label: "Galibiyet", chip: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
  loss: { label: "Mağlubiyet", chip: "bg-red-100 text-red-700 ring-red-200" },
  draw: { label: "Berabere", chip: "bg-rehberim-muted text-rehberim-navy/70 ring-rehberim-border" },
} as const;

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function GecmisPage() {
  if (!isSupabaseConfigured()) redirect("/rekabet");
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/rekabet/gecmis");

  const [shellUser, matches] = await Promise.all([
    getShellUser(),
    getMatchHistory(user.id, 30),
  ]);

  const wins = matches.filter((m) => m.outcome === "win").length;
  const losses = matches.filter((m) => m.outcome === "loss").length;
  const draws = matches.filter((m) => m.outcome === "draw").length;
  const netDelta = matches.reduce((a, m) => a + m.delta, 0);

  return (
    <AppShell user={shellUser}>
      <Link
        href="/rekabet"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Rekabet lobisine dön
      </Link>

      <header className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
          <History className="h-8 w-8" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h1 className="text-xl font-extrabold tracking-tight">Maç geçmişin</h1>
          <p className="text-pretty text-sm text-white/85">
            Son {matches.length} maç. Bir maça tıkla, soruları ve rakibinin
            cevaplarını tekrar incele.
          </p>
        </div>
      </header>

      {matches.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Summary label="Galibiyet" value={wins} tone="text-emerald-600" />
          <Summary label="Mağlubiyet" value={losses} tone="text-red-600" />
          <Summary label="Berabere" value={draws} tone="text-rehberim-navy/70" />
          <Summary
            label="Net puan"
            value={netDelta > 0 ? `+${netDelta}` : `${netDelta}`}
            tone={netDelta >= 0 ? "text-emerald-600" : "text-red-600"}
          />
        </div>
      )}

      {matches.length === 0 ? (
        <div className="ring-hairline flex flex-col items-center gap-3 rounded-3xl border border-rehberim-border bg-white p-10 text-center shadow-card">
          <Swords className="h-8 w-8 text-rehberim-navy/30" />
          <p className="text-sm text-rehberim-navy/60">
            Henüz tamamlanmış maçın yok. İlk düellonu oyna, buraya eklensin.
          </p>
          <Link
            href="/rekabet/eslesme"
            className="rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-4 py-2 text-sm font-extrabold text-rehberim-navy shadow-card"
          >
            Maç ara
          </Link>
        </div>
      ) : (
        <ol className="ring-hairline divide-y divide-rehberim-border overflow-hidden rounded-3xl border border-rehberim-border bg-white shadow-card">
          {matches.map((m) => (
            <HistoryItem key={m.matchId} m={m} />
          ))}
        </ol>
      )}
    </AppShell>
  );
}

function Summary({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: string;
}) {
  return (
    <div className="ring-hairline rounded-2xl border border-rehberim-border bg-white px-4 py-3 text-center shadow-card">
      <p className={`text-xl font-extrabold tabular-nums ${tone}`}>{value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-rehberim-navy/50">
        {label}
      </p>
    </div>
  );
}

function HistoryItem({ m }: { m: MatchHistoryRow }) {
  const o = OUTCOME[m.outcome];
  const name = m.opponent?.name ?? "Rakip";

  return (
    <li>
      <Link
        href={`/rekabet/${m.matchId}/sonuc`}
        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-rehberim-muted/50 sm:px-5"
      >
        <AvatarWithCrest
          user={{ name, email: "", avatarUrl: m.opponent?.avatarUrl ?? null }}
          bestTier={m.opponent?.bestTier ?? null}
          size={40}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="truncate text-sm font-extrabold text-rehberim-navy">
              {name}
            </span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${o.chip}`}
            >
              {o.label}
            </span>
            {m.isFriendly && (
              <span className="rounded-full bg-rehberim-accent/12 px-1.5 py-0.5 text-[10px] font-bold text-rehberim-accent-deep ring-1 ring-rehberim-accent/20">
                arkadaş maçı
              </span>
            )}
            {m.isForfeit && (
              <span className="rounded-full bg-rehberim-muted px-1.5 py-0.5 text-[10px] font-bold text-rehberim-navy/60 ring-1 ring-rehberim-border">
                {m.iForfeited ? "terk ettin" : "rakip terk etti"}
              </span>
            )}
            {m.tierChange === "up" && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                <TrendingUp className="h-3 w-3" />
                {m.myTierAfter !== null ? rankLabel(m.myTierAfter) : "terfi"}
              </span>
            )}
            {m.tierChange === "down" && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600 ring-1 ring-red-200">
                <TrendingDown className="h-3 w-3" />
                {m.myTierAfter !== null ? rankLabel(m.myTierAfter) : "düşüş"}
              </span>
            )}
          </div>
          <p className="truncate text-xs text-rehberim-navy/55">
            {formatDate(m.finishedAt)}
            {!m.isForfeit && ` · ${m.myCorrect}-${m.opponentCorrect} doğru`}
            {m.subjectFilter ? ` · ${m.subjectFilter}` : ""}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`inline-flex items-center gap-0.5 text-sm font-extrabold tabular-nums ${
              m.delta > 0
                ? "text-emerald-600"
                : m.delta < 0
                  ? "text-red-600"
                  : "text-rehberim-navy/45"
            }`}
          >
            {m.isFriendly ? (
              <span className="text-rehberim-navy/45">puan yok</span>
            ) : m.delta === 0 ? (
              <Minus className="h-3.5 w-3.5" />
            ) : m.delta > 0 ? (
              `+${m.delta}`
            ) : (
              m.delta
            )}
          </span>
          <ChevronRight className="h-4 w-4 text-rehberim-navy/30" />
        </div>
      </Link>
    </li>
  );
}
