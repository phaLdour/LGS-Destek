import { AppShell } from "@/components/layout/AppShell";
import { BadgeShowcase } from "@/components/badges/BadgeShowcase";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Rozetlerim — Rehberim",
  description: "Kazandığın LGS çalışma rozetleri ve başarımların.",
};

export default async function RozetlerimPage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-rehberim-navy">
          Rozetlerim
        </h1>
        <p className="text-sm text-rehberim-navy/55">
          LGS yolculuğunda kazandığın başarımlar — çalıştıkça yenileri açılır.
        </p>
      </div>
      <BadgeShowcase />
    </AppShell>
  );
}
