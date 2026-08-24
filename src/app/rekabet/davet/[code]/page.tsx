import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InviteAccepter } from "@/components/competitive/InviteAccepter";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Düello daveti — Rehberim",
};

/**
 * Davet linkinin açıldığı sayfa. Kodun geçerliliği kabul anında
 * sunucuda denetlenir; burada yalnız kabul ekranı gösterilir.
 */
export default async function DavetKabulPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
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
      <InviteAccepter code={code.toUpperCase()} />
    </AppShell>
  );
}
