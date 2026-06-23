import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MatchmakingScreen } from "@/components/competitive/MatchmakingScreen";
import { getCompetitiveOverview } from "@/lib/competitive/server";
import { getCurrentUser } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Eşleşme — Rekabet",
};

export default async function EslesmePage({
  searchParams,
}: {
  searchParams: Promise<{ ders?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/rekabet/eslesme");

  const [shellUser, overview, params] = await Promise.all([
    getShellUser(),
    getCompetitiveOverview(),
    searchParams,
  ]);

  const subjectFilter = params.ders ?? null;

  return (
    <AppShell user={shellUser}>
      <div className="mx-auto max-w-2xl">
        <MatchmakingScreen
          userId={user.id}
          tier={overview.rank.tier}
          subjectFilter={subjectFilter}
        />
      </div>
    </AppShell>
  );
}
