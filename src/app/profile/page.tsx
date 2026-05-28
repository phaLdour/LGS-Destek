import { AppShell } from "@/components/layout/AppShell";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export default async function ProfilePage() {
  const user = await getShellUser();
  const configured = isSupabaseConfigured();

  return (
    <AppShell user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-rehberim-navy">Profil</h1>
        <p className="text-sm text-rehberim-navy/55">
          Fotoğrafını ve bilgilerini özelleştir.
        </p>
      </div>
      <ProfileEditor initial={user} configured={configured} />
    </AppShell>
  );
}
