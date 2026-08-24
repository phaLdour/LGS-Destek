"use client";

import { Suspense, useState } from "react";
import { safeNext } from "@/lib/safeNext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { GoogleButton } from "./GoogleButton";

type Mode = "login" | "register";

// useSearchParams() bir Suspense boundary gerektirir (Next.js CSR bailout).
export function AuthForm({ mode }: { mode: Mode }) {
  return (
    <Suspense fallback={null}>
      <AuthFormInner mode={mode} />
    </Suspense>
  );
}

function AuthFormInner({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setError(null);
    setInfo(null);
    setLoading(true);

    const supabase = createClient();

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(cevirHata(error.message));
        setLoading(false);
        return;
      }
      setInfo(
        "Kayıt başarılı! E-postanı kontrol edip hesabını doğrula, sonra giriş yap.",
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(cevirHata(error.message));
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="w-full">
      {!configured && (
        <div className="mb-5 rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-4 py-3 text-sm text-rehberim-navy">
          Giriş sistemi henüz yapılandırılmadı. Kurulum talimatındaki Supabase
          anahtarları eklendiğinde aktif olacak. Arayüzü gezmek için aşağıya
          tıklayıp <Link href={next} className="font-semibold underline">demo olarak devam edebilirsin</Link>.
        </div>
      )}

      <GoogleButton next={next} />

      <div className="my-5 flex items-center gap-3 text-xs text-rehberim-navy/40">
        <span className="h-px flex-1 bg-rehberim-border" />
        veya e-posta ile
        <span className="h-px flex-1 bg-rehberim-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <Field
            label="Ad Soyad"
            type="text"
            value={name}
            onChange={setName}
            placeholder="Adın"
            autoComplete="name"
          />
        )}
        <Field
          label="E-posta"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="ornek@eposta.com"
          autoComplete="email"
          required
        />
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-rehberim-navy">
            Şifre
          </label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              required
              minLength={6}
              className="w-full rounded-xl border border-rehberim-border bg-white px-4 py-3 pr-11 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-rehberim-navy/40 hover:text-rehberim-navy"
              aria-label={showPw ? "Şifreyi gizle" : "Şifreyi göster"}
            >
              {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !configured}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "register" ? "Hesap oluştur" : "Giriş yap"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-rehberim-navy/60">
        {mode === "register" ? (
          <>
            Zaten hesabın var mı?{" "}
            <Link href="/login" className="font-semibold text-rehberim-accent hover:underline">
              Giriş yap
            </Link>
          </>
        ) : (
          <>
            Hesabın yok mu?{" "}
            <Link href="/register" className="font-semibold text-rehberim-accent hover:underline">
              Kayıt ol
            </Link>
          </>
        )}
      </p>

      {/* Verisi işlenen kullanıcıların çoğu metni hiç görmüyordu: girişli
          kullanıcı kök sayfaya bir daha uğramadığı için tanıtım sayfasının
          alt bilgisi ona ulaşmıyor. Bağlantı buraya da kondu. */}
      <p className="mt-3 text-center text-xs text-rehberim-navy/60">
        Devam ederek{" "}
        <Link
          href="/gizlilik"
          className="font-semibold text-rehberim-navy underline decoration-rehberim-accent decoration-2 underline-offset-2"
        >
          Gizlilik ve Kullanım
        </Link>{" "}
        metnini okuduğunu kabul etmiş olursun.
      </p>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-rehberim-navy">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
      />
    </div>
  );
}

function cevirHata(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "E-posta veya şifre hatalı.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (m.includes("password")) return "Şifre en az 6 karakter olmalı.";
  if (m.includes("email")) return "Geçerli bir e-posta adresi gir.";
  return "Bir hata oluştu. Lütfen tekrar dene.";
}
