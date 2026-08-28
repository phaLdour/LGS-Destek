import { Timer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { OdakClient } from "@/components/odak/OdakClient";
import { getShellUser } from "@/lib/user";

export const metadata = {
  title: "Odak Modu — Rehberim",
  description:
    "Sayaç, kronometre ve Pomodoro ile odaklan; orman, şömine, sınav ortamı gibi tema ve seslerle çalış.",
};

export default async function OdakPage() {
  const user = await getShellUser();

  return (
    <AppShell user={user}>
      <header className="relative mb-5 overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card sm:p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <Timer className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight">Odak Modu</h1>
            <p className="mt-1 text-pretty text-sm text-white/85">
              Temanı ve sesini seç, sayacı kur, çalışmaya dal. Başka sayfaya
              geçsen bile sayaç köşede seninle gelir; çalıştığın dakikalar
              istatistiklerine ve rozetlerine işlenir.
            </p>
          </div>
        </div>
      </header>
      <OdakClient />
    </AppShell>
  );
}
