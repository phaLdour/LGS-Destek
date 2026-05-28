import { Suspense } from "react";
import { GraduationCap, Sparkles, Target } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { OwlSvg } from "@/components/brand/Owl";
import { AuthForm } from "./AuthForm";

export function AuthScreen({ mode }: { mode: "login" | "register" }) {
  const title = mode === "register" ? "Aramıza katıl" : "Tekrar hoş geldin";
  const subtitle =
    mode === "register"
      ? "Birkaç saniyede hesabını oluştur ve LGS yolculuğuna başla."
      : "Hesabına giriş yap, kaldığın yerden devam et.";

  return (
    <main className="flex min-h-screen bg-rehberim-muted">
      {/* Marka paneli — sadece geniş ekran */}
      <aside className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark p-10 text-white lg:flex">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rehberim-accent/10 blur-2xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-rehberim-accent/10 blur-2xl" />

        <div className="relative flex items-center gap-2.5">
          <span className="text-2xl font-extrabold tracking-tight">
            Rehber<span className="text-rehberim-accent">im</span>
          </span>
        </div>

        <div className="relative flex flex-col items-center gap-6 text-center">
          <OwlSvg className="h-40 w-40 animate-float drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
          <div>
            <h2 className="text-2xl font-bold">LGS&apos;ye giden yolda yanındayız</h2>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Tüm dersler, akıllı rehber baykuşun ve kişisel çalışma alanın tek
              bir yerde.
            </p>
          </div>
        </div>

        <ul className="relative space-y-3 text-sm text-white/85">
          <Feature icon={<Target className="h-4 w-4" />} text="LGS müfredatındaki tüm dersler" />
          <Feature icon={<Sparkles className="h-4 w-4" />} text="Sana yol gösteren akıllı rehber baykuş" />
          <Feature icon={<GraduationCap className="h-4 w-4" />} text="Kişisel profil ve çalışma alanı" />
        </ul>
      </aside>

      {/* Form alanı */}
      <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-4 lg:items-start">
            <div className="lg:hidden">
              <OwlSvg className="h-20 w-20" />
            </div>
            <div className="lg:hidden">
              <LogoLockup />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-extrabold text-rehberim-navy">
                {title}
              </h1>
              <p className="mt-1 text-sm text-rehberim-navy/55">{subtitle}</p>
            </div>
          </div>

          <Suspense fallback={<div className="h-80" />}>
            <AuthForm mode={mode} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rehberim-accent/20 text-rehberim-accent-light">
        {icon}
      </span>
      {text}
    </li>
  );
}
