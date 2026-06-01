"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertCircle,
  Archive,
  Award,
  BookOpen,
  Calculator,
  FileText,
  Home,
  Languages,
  LogOut,
  Menu,
  User as UserIcon,
  X,
  Zap,
} from "lucide-react";
import { LogoLockup } from "@/components/brand/Logo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { MascotButton } from "@/components/mascot/MascotButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export type ShellUser = {
  name: string;
  email: string;
  avatarUrl: string | null;
};

const NAV = [
  { href: "/dashboard", label: "Anasayfa", icon: Home },
  { href: "/dersler", label: "Dersler", icon: BookOpen },
  { href: "/hizli-sorular", label: "Hızlı Sorular", icon: Zap },
  { href: "/deneme", label: "Deneme Sınavı", icon: FileText },
  { href: "/cikmis-sorular", label: "Çıkmış Sorular", icon: Archive },
  { href: "/hatalarim", label: "Hatalarım", icon: AlertCircle },
  { href: "/sozluk", label: "Türkçe Sözlük", icon: Languages },
  { href: "/puan-hesapla", label: "Puan Hesapla", icon: Calculator },
  { href: "/rozetlerim", label: "Rozetler", icon: Award },
  { href: "/profile", label: "Profil", icon: UserIcon },
];

export function AppShell({
  user,
  children,
}: {
  user: ShellUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleLogout() {
    if (isSupabaseConfigured()) {
      await createClient().auth.signOut();
    }
    router.push("/login");
    router.refresh();
  }

  const isActive = (href: string) => pathname === href.split("#")[0];

  return (
    <div className="min-h-screen bg-rehberim-muted">
      {/* ===== Masaüstü sol panel ===== */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-rehberim-border bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-rehberim-border px-5">
          <Link href="/dashboard">
            <LogoLockup />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive(href)
                  ? "bg-rehberim-navy text-white shadow-soft"
                  : "text-rehberim-navy/70 hover:bg-rehberim-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-rehberim-border p-3">
          <UserCard user={user} />
          <ThemeToggle variant="menu" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rehberim-navy/70 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Çıkış yap
          </button>
        </div>
      </aside>

      {/* ===== Mobil üst bar ===== */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-rehberim-border bg-white px-4 lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Menüyü aç"
          className="rounded-lg p-2 text-rehberim-navy hover:bg-rehberim-muted"
        >
          <Menu className="h-6 w-6" />
        </button>
        <LogoLockup className="scale-90" />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Avatar user={user} size={32} />
        </div>
      </header>

      {/* ===== Mobil drawer ===== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-rehberim-navy-dark/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80%] animate-fade-in flex-col bg-white shadow-soft">
            <div className="flex h-14 items-center justify-between border-b border-rehberim-border px-4">
              <LogoLockup className="scale-90" />
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Menüyü kapat"
                className="rounded-lg p-2 text-rehberim-navy hover:bg-rehberim-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 p-3">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    isActive(href)
                      ? "bg-rehberim-navy text-white"
                      : "text-rehberim-navy/70 hover:bg-rehberim-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-rehberim-border p-3">
              <UserCard user={user} />
              <ThemeToggle variant="menu" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rehberim-navy/70 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                Çıkış yap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== İçerik ===== */}
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-10">
          {children}
        </main>
      </div>

      {/* ===== Mobil alt navigasyon (ilk 4 öğe; gerisi drawer'da) ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-rehberim-border bg-white lg:hidden">
        {NAV.slice(0, 4).map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold transition ${
              isActive(href) ? "text-rehberim-accent" : "text-rehberim-navy/55"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      {/* ===== Maskot AI ===== */}
      <MascotButton />
    </div>
  );
}

function UserCard({ user }: { user: ShellUser }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-rehberim-muted px-3 py-2.5">
      <Avatar user={user} size={36} />
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-rehberim-navy">
          {user.name}
        </p>
        {user.email && (
          <p className="truncate text-xs text-rehberim-navy/50">{user.email}</p>
        )}
      </div>
    </div>
  );
}

export function Avatar({ user, size }: { user: ShellUser; size: number }) {
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.avatarUrl}
        alt={user.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials || "?"}
    </span>
  );
}
