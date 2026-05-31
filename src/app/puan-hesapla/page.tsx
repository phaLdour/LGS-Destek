import { AppShell } from "@/components/layout/AppShell";
import { PuanHesaplayici } from "@/components/puan/PuanHesaplayici";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "LGS Puan Hesapla — Rehberim",
  description:
    "Her dersten doğru, yanlış ve boş sayını gir; tahmini LGS puanını anında gör.",
};

export default async function PuanHesaplaPage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <PuanHesaplayici />
    </AppShell>
  );
}
