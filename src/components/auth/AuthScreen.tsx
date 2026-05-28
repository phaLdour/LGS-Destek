import { Suspense } from "react";
import { GraduationCap, Sparkles, Target } from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { OwlPointing, OwlSvg } from "@/components/brand/Owl";
import { AuthForm } from "./AuthForm";

export function AuthScreen({ mode }: { mode: "login" | "register" }) {
  const title = mode === "register" ? "Aramıza katıl" : "Tekrar hoş geldin";
  const subtitle =
    mode === "register"
      ? "Birkaç saniyede hesabını oluştur ve LGS yolculuğuna başla."
      : "Hesabına giriş yap, kaldığın yerden devam et.";

  return (
    <main className="flex min-h-screen bg-rehberim-muted">
      {/* ===== Marka paneli — sadece geniş ekran ===== */}
      <aside className="relative hidden w-[46%] max-w-[640px] flex-col overflow-hidden bg-gradient-to-br from-rehberim-navy via-rehberim-navy to-rehberim-navy-dark p-12 text-white lg:flex">
        {/* dekoratif ışıklar */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rehberim-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-rehberim-accent/10 blur-3xl" />
        {/* ince ızgara dokusu */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* üst: marka */}
        <div className="relative flex items-center gap-3">
          <span className="text-2xl font-black tracking-tight">
            Rehber<span className="text-rehberim-accent">im</span>
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            LGS Hazırlık
          </span>
        </div>

        {/* orta: başlık + karşılayan baykuş */}
        <div className="relative flex flex-1 flex-col justify-center">
          <h2 className="max-w-sm text-balance text-[2.1rem] font-extrabold leading-[1.15] tracking-tight">
            LGS&apos;ye giden yolda{" "}
            <span className="text-rehberim-accent-light">yanındayız</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
            Tüm dersler, sana yol gösteren akıllı Rehber Baykuş ve kişisel
            çalışma alanın tek bir yerde.
          </p>

          {/* sağa bakıp kanadını forma uzatan baykuş */}
          <OwlPointing className="pointer-events-none mt-2 h-64 w-auto translate-x-6 animate-float self-end drop-shadow-[0_18px_36px_rgba(0,0,0,0.4)]" />
        </div>

        {/* alt: özellikler */}
        <ul className="relative grid gap-2.5">
          <Feature
            icon={<Target className="h-4 w-4" />}
            text="LGS müfredatındaki tüm dersler"
          />
          <Feature
            icon={<Sparkles className="h-4 w-4" />}
            text="Yol gösteren akıllı Rehber Baykuş"
          />
          <Feature
            icon={<GraduationCap className="h-4 w-4" />}
            text="Kişisel profil ve çalışma alanı"
          />
        </ul>
      </aside>

      {/* ===== Form alanı ===== */}
      <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-3 lg:items-start">
            <div className="lg:hidden">
              <OwlSvg className="h-20 w-20 drop-shadow-sm" />
            </div>
            <div className="lg:hidden">
              <LogoLockup />
            </div>
            <div className="mt-2 text-center lg:mt-0 lg:text-left">
              <h1 className="text-[1.7rem] font-extrabold tracking-tight text-rehberim-navy">
                {title}
              </h1>
              <p className="mt-1.5 text-[15px] text-rehberim-navy/55">
                {subtitle}
              </p>
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
    <li className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rehberim-accent/20 text-rehberim-accent-light">
        {icon}
      </span>
      {text}
    </li>
  );
}
