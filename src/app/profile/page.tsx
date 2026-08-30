import { AppShell } from "@/components/layout/AppShell";
import { CompetitiveIdentity } from "@/components/competitive/CompetitiveIdentity";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";
import { GorunumAyarlari } from "@/components/profile/GorunumAyarlari";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { KurulumDugmesi } from "@/components/pwa/KurulumDugmesi";
import { getCurrentUser, isSupabaseConfigured } from "@/lib/supabase/server";
import { getShellUser } from "@/lib/user";

export default async function ProfilePage() {
  const [user, authUser] = await Promise.all([getShellUser(), getCurrentUser()]);
  const configured = isSupabaseConfigured();

  return (
    <AppShell user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-rehberim-navy">Profil</h1>
        <p className="text-sm text-rehberim-navy/55">
          Fotoğrafını, bilgilerini, rekabet kimliğini, görünüm ve bildirim
          tercihlerini yönet.
        </p>
      </div>
      <div className="space-y-6">
        <ProfileEditor initial={user} configured={configured} />
        {authUser && (
          <CompetitiveIdentity
            userId={authUser.id}
            shellUser={user}
            configured={configured}
          />
        )}
        <GorunumAyarlari />
        {/* Alt şerit kapatılınca 30 gün gelmiyor; kurulum yolu burada kalıcı. */}
        <KurulumDugmesi />
        <NotificationSettings configured={configured} />
      </div>
    </AppShell>
  );
}
