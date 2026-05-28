"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, type ShellUser } from "@/components/layout/AppShell";

export function ProfileEditor({
  initial,
  configured,
}: {
  initial: ShellUser;
  configured: boolean;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial.name);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatarUrl);
  const [savingName, setSavingName] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const current: ShellUser = { name, email: initial.email, avatarUrl };

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !configured) return;
    if (!file.type.startsWith("image/")) {
      setMsg({ type: "err", text: "Lütfen bir görsel dosyası seç." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ type: "err", text: "Dosya en fazla 5 MB olmalı." });
      return;
    }

    setUploading(true);
    setMsg(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("no-user");

      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/avatar.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "0" });
      if (upErr) throw upErr;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);
      const busted = `${publicUrl}?t=${Date.now()}`;

      const { error: updErr } = await supabase.auth.updateUser({
        data: { avatar_url: busted },
      });
      if (updErr) throw updErr;

      setAvatarUrl(busted);
      setMsg({ type: "ok", text: "Profil fotoğrafın güncellendi." });
      router.refresh();
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      setMsg({
        type: "err",
        text: `Yükleme başarısız: ${detail}. (İpucu: Supabase'de 'avatars' bucket'ı ve yükleme policy'si gerekli.)`,
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setSavingName(true);
    setMsg(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name },
      });
      if (error) throw error;
      setMsg({ type: "ok", text: "Adın güncellendi." });
      router.refresh();
    } catch {
      setMsg({ type: "err", text: "Kaydedilemedi. Tekrar dene." });
    } finally {
      setSavingName(false);
    }
  }

  return (
    <div className="space-y-6">
      {!configured && (
        <div className="rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-4 py-3 text-sm text-rehberim-navy">
          Profil kaydetme için giriş sistemi (Supabase) henüz yapılandırılmadı.
          Bu ekran şu an önizleme amaçlıdır.
        </div>
      )}

      {/* Avatar */}
      <section className="flex flex-col items-center gap-4 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card sm:flex-row sm:items-center sm:gap-6">
        <div className="relative">
          <Avatar user={current} size={96} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={!configured || uploading}
            aria-label="Fotoğraf yükle"
            className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-rehberim-accent text-white shadow-soft ring-2 ring-white transition hover:bg-rehberim-accent-dark disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatar}
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-lg font-extrabold text-rehberim-navy">{name}</p>
          {initial.email && (
            <p className="text-sm text-rehberim-navy/55">{initial.email}</p>
          )}
          <p className="mt-1 text-xs text-rehberim-navy/45">
            JPG veya PNG, en fazla 5 MB.
          </p>
        </div>
      </section>

      {/* Bilgiler */}
      <form
        onSubmit={handleSaveName}
        className="space-y-4 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card"
      >
        <h2 className="text-base font-bold text-rehberim-navy">
          Hesap bilgileri
        </h2>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-rehberim-navy">
            Ad Soyad
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-rehberim-navy">
            E-posta
          </label>
          <input
            value={initial.email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-rehberim-border bg-rehberim-muted px-4 py-3 text-sm text-rehberim-navy/60"
          />
        </div>

        {msg && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              msg.type === "ok"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {msg.text}
          </p>
        )}

        <button
          type="submit"
          disabled={!configured || savingName}
          className="flex items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingName && <Loader2 className="h-4 w-4 animate-spin" />}
          Değişiklikleri kaydet
        </button>
      </form>
    </div>
  );
}
