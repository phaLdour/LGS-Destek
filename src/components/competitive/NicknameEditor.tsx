"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Takma ad düzenleyici — herkese açık rekabet adı.
 *
 * `comp_set_nickname` RPC: 2-20 karakter, harf/rakam/boşluk/._-
 * Boş bırakılırsa türetilmiş ada ("Ad S.") geri döner. Soyad ve
 * e-posta hiçbir zaman diğer öğrencilere gösterilmez.
 */
export function NicknameEditor({
  initialNickname,
  derivedName,
  configured,
}: {
  initialNickname: string | null;
  derivedName: string;
  configured: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialNickname ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured || saving) return;
    setSaving(true);
    setMsg(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("comp_set_nickname", {
        p_nickname: value,
      });
      if (error) {
        const m = error.message ?? "";
        if (m.includes("nickname_length")) {
          setMsg({ type: "err", text: "Takma ad 2 ile 20 karakter arasında olmalı." });
        } else if (m.includes("nickname_taken")) {
          setMsg({
            type: "err",
            text: "Bu takma ad başka bir öğrenci tarafından alınmış. Başka bir ad dene.",
          });
        } else if (m.includes("nickname_chars")) {
          setMsg({
            type: "err",
            text: "Sadece harf, rakam, boşluk ve . _ - kullanabilirsin.",
          });
        } else {
          setMsg({ type: "err", text: "Kaydedilemedi. Tekrar dene." });
        }
        return;
      }
      const saved = (data as string | null) ?? null;
      setValue(saved ?? "");
      setMsg({
        type: "ok",
        text: saved
          ? `Takma adın kaydedildi: ${saved}`
          : `Takma ad kaldırıldı; "${derivedName}" olarak görüneceksin.`,
      });
      router.refresh();
    } catch {
      setMsg({ type: "err", text: "Bağlantı hatası. Tekrar dene." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="block text-sm font-semibold text-rehberim-navy">
        Takma ad
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Pencil className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rehberim-navy/35" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={derivedName}
            maxLength={20}
            disabled={!configured || saving}
            className="w-full rounded-xl border border-rehberim-border bg-white py-2.5 pl-9 pr-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent focus:ring-2 focus:ring-rehberim-accent/30 disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={!configured || saving}
          className="inline-flex items-center gap-2 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-rehberim-navy-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Kaydet
        </button>
      </div>
      <p className="text-xs text-rehberim-navy/50">
        Liderlik tablosunda ve maçlarda diğer öğrenciler seni bu adla görür.
        Boş bırakırsan <strong className="text-rehberim-navy/70">{derivedName}</strong>{" "}
        görünür; soyadın ve e-postan hiçbir zaman gösterilmez.
      </p>
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
    </form>
  );
}
