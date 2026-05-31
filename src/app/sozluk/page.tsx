import { AppShell } from "@/components/layout/AppShell";
import { SozlukClient } from "@/components/sozluk/SozlukClient";
import { SOZLUK, PAGE_SIZE } from "@/content/sozluk-veri";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Türkçe Sözlük — Rehberim",
  description:
    "LGS düzeyi çok anlamlı kelimeler, gerçek/mecaz ayrımı ve örnek cümleler.",
};

export default async function SozlukPage() {
  const user = await getShellUser();
  return (
    <AppShell user={user}>
      <SozlukClient kelimeler={SOZLUK} pageSize={PAGE_SIZE} />
    </AppShell>
  );
}
