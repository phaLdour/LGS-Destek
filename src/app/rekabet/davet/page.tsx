import Link from "next/link";
import { ArrowLeft, Link as LinkIcon, Swords } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Arkadaşına meydan oku — Rekabet",
};

/**
 * Arkadaş düellosu henüz açılmadı (şema hazır: comp_invites). Bu sayfa
 * lobideki linkin sessizce lobiye geri dönmesini engeller ve durumu
 * dürüstçe söyler.
 */
export default async function DavetPage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <Link
        href="/rekabet"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Rekabet lobisine dön
      </Link>

      <div className="ring-hairline mx-auto max-w-xl rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rehberim-accent/12 text-rehberim-accent ring-1 ring-rehberim-accent/15">
          <LinkIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-rehberim-navy">
          Arkadaşına meydan oku — yakında
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-rehberim-navy/60">
          Bir link paylaşıp arkadaşınla özel (ranksız) düello yapabileceksin.
          Şimdilik lig maçlarıyla tırmanmaya devam et.
        </p>
        <Link
          href="/rekabet/eslesme"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-5 py-3 text-sm font-extrabold text-white shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft"
        >
          <Swords className="h-4 w-4" />
          Lig maçı ara
        </Link>
      </div>
    </AppShell>
  );
}
