import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { LandingPage } from "@/components/marketing/LandingPage";

export const metadata = {
  title: "Rehberim — Ücretsiz LGS Çalışma Platformu",
  description:
    "LGS müfredatının tamamı, 2018-2026 çıkmış sorular, 2.500'ü aşkın alıştırma sorusu, yapay zekâ yardımcı ve 1v1 düello. Ücretsiz.",
};

/**
 * Kök sayfa: giriş yapmış kullanıcı panele gider, yapmamış olan
 * tanıtım sayfasını görür (önceden doğrudan /login'e atılıyordu —
 * paylaşılabilir bir açılış sayfası yoktu).
 */
export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return <LandingPage />;
}
