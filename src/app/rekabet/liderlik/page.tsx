import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Flame, Lock, Swords, Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AvatarWithCrest } from "@/components/competitive/AvatarWithCrest";
import { LeagueBadge } from "@/components/competitive/LeagueBadge";
import { SeasonResetCountdown } from "@/components/competitive/SeasonResetCountdown";
import { rankLabel } from "@/lib/competitive/ranks";
import {
  MEDAL_STYLE,
  medalFor,
  seasonLabelFromId,
  type LeaderboardRow,
} from "@/lib/competitive/rewards";
import { seasonForDate } from "@/lib/competitive/seasons";
import { getLeaderboard, getSeasons } from "@/lib/competitive/server";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Liderlik — Rekabet",
  description: "Sezon sıralaması: lig, puan ve galibiyetlere göre ilk 50.",
};

const TOP_N = 50;

export default async function LiderlikPage({
  searchParams,
}: {
  searchParams: Promise<{ sezon?: string }>;
}) {
  if (!isSupabaseConfigured()) redirect("/rekabet");
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/rekabet/liderlik");

  const { sezon } = await searchParams;
  const current = seasonForDate(new Date());
  const requested = sezon ? Number.parseInt(sezon, 10) : current.id;
  const seasonId =
    Number.isInteger(requested) && requested >= 202001 && requested <= 209912
      ? requested
      : current.id;

  const [shellUser, seasonsDb, rows] = await Promise.all([
    getShellUser(),
    getSeasons(),
    getLeaderboard(seasonId, TOP_N),
  ]);

  // Sezon listesi: DB'dekiler + (henüz satırı yoksa) yürürlükteki sezon
  const seasons = seasonsDb.some((s) => s.id === current.id)
    ? seasonsDb
    : [{ id: current.id, label: current.label, closed: false }, ...seasonsDb];
  const selected = seasons.find((s) => s.id === seasonId) ?? {
    id: seasonId,
    label: seasonLabelFromId(seasonId),
    closed: seasonId < current.id,
  };
  const isCurrent = seasonId === current.id;

  const me = rows.find((r) => r.isMe) ?? null;
  const top = rows.filter((r) => r.position <= TOP_N);
  const meOutsideTop = me !== null && me.position > TOP_N;

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
          <Trophy className="h-8 w-8" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h1 className="text-xl font-extrabold tracking-tight">
            Liderlik — {selected.label}
          </h1>
          <p className="text-pretty text-sm text-white/85">
            Lig, puan ve galibiyete göre sıralama. Yalnız bu sezon en az bir
            maç oynayanlar listelenir; ilk 3 sezon sonunda altın, gümüş ve
            bronz kupa alır.
          </p>
        </div>
      </header>

      {/* Sezon seçici + geri sayım */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Sezon" className="flex flex-wrap gap-2">
          {seasons.map((s) => {
            const active = s.id === seasonId;
            return (
              <Link
                key={s.id}
                href={s.id === current.id ? "/rekabet/liderlik" : `/rekabet/liderlik?sezon=${s.id}`}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ease-smooth ${
                  active
                    ? "bg-rehberim-navy text-white shadow-soft"
                    : "border border-rehberim-border bg-white text-rehberim-navy/70 hover:border-rehberim-accent/40 hover:text-rehberim-navy"
                }`}
              >
                {s.closed && <Lock className="h-3 w-3 opacity-70" />}
                {s.label}
              </Link>
            );
          })}
        </nav>
        {isCurrent && <SeasonResetCountdown />}
      </div>

      {/* Tablo */}
      <section className="ring-hairline overflow-hidden rounded-3xl border border-rehberim-border bg-white shadow-card">
        {top.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Swords className="h-8 w-8 text-rehberim-navy/30" />
            <p className="text-sm text-rehberim-navy/60">
              {isCurrent
                ? "Bu sezon henüz kimse maç oynamadı. İlk sen ol!"
                : "Bu sezonda oynanmış maç yok."}
            </p>
            {isCurrent && (
              <Link
                href="/rekabet/eslesme"
                className="rounded-xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark px-4 py-2 text-sm font-extrabold text-rehberim-on-accent shadow-card"
              >
                Maç ara
              </Link>
            )}
          </div>
        ) : (
          <ol className="divide-y divide-rehberim-border">
            {top.map((r) => (
              <LeaderboardItem key={r.userId} row={r} />
            ))}
            {meOutsideTop && me && (
              <>
                <li className="px-5 py-2 text-center text-xs font-bold tracking-[0.3em] text-rehberim-navy/35">
                  ···
                </li>
                <LeaderboardItem row={me} />
              </>
            )}
          </ol>
        )}
      </section>

      {/* Kendi durumun */}
      {!me && top.length > 0 && isCurrent && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/5 p-4 text-sm text-rehberim-navy/70">
          <p>
            <span className="font-bold text-rehberim-navy">Henüz sıralamada değilsin.</span>{" "}
            Bu sezon ilk maçını oyna, anında listeye gir.
          </p>
          <Link
            href="/rekabet/eslesme"
            className="rounded-xl bg-rehberim-navy px-4 py-2 text-xs font-bold text-white shadow-soft"
          >
            Maç ara
          </Link>
        </div>
      )}
      <p className="mt-4 text-xs text-rehberim-navy/45">
        Sıralama: lig kademesi → puan → galibiyet. Avatarın köşesindeki arma,
        oyuncunun tüm zamanlarda ulaştığı en yüksek ligi gösterir (kalıcı).
      </p>
    </AppShell>
  );
}

function LeaderboardItem({ row }: { row: LeaderboardRow }) {
  const medal = medalFor(row.position);
  const medalStyle = medal ? MEDAL_STYLE[medal] : null;

  return (
    <li
      className={`flex items-center gap-3 px-4 py-3 sm:px-5 ${
        row.isMe ? "bg-rehberim-accent/[0.07]" : ""
      }`}
    >
      {/* Sıra */}
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold tabular-nums ${
          medalStyle
            ? `${medalStyle.chip} shadow-card`
            : "bg-rehberim-muted text-rehberim-navy/70"
        }`}
        title={medalStyle?.label}
      >
        {row.position}
      </span>

      {/* Oyuncu */}
      <Link
        href={`/rekabet/oyuncu/${row.userId}`}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl transition hover:opacity-90"
      >
        <AvatarWithCrest
          user={{ name: row.name, email: "", avatarUrl: row.avatarUrl }}
          bestTier={row.bestTier}
          size={40}
        />
        <span className="min-w-0">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-sm font-extrabold text-rehberim-navy">
              {row.name}
            </span>
            {row.isMe && (
              <span className="rounded-full bg-rehberim-accent/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rehberim-accent-deep">
                Sen
              </span>
            )}
            {row.winStreak >= 3 && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 ring-1 ring-orange-200"
                title={`${row.winStreak} maçlık galibiyet serisi`}
              >
                <Flame className="h-3 w-3" />
                {row.winStreak}
              </span>
            )}
          </span>
          <span className="block truncate text-xs text-rehberim-navy/55">
            {rankLabel(row.tier)} · {row.points} puan
          </span>
        </span>
      </Link>

      {/* Lig rozeti + G/M */}
      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden text-right text-xs leading-tight sm:block">
          <p className="font-extrabold tabular-nums text-rehberim-navy">
            {row.wins}G {row.losses}M
            {row.draws > 0 && (
              <span className="font-semibold text-rehberim-navy/50"> {row.draws}B</span>
            )}
          </p>
          <p className="text-rehberim-navy/50">
            {row.wins + row.losses + row.draws} maç
          </p>
        </div>
        <LeagueBadge tier={row.tier} size="sm" />
      </div>
    </li>
  );
}
