"use client";

import { useEffect, useState } from "react";
import { Bell, Check, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function NotificationSettings({ configured }: { configured: boolean }) {
  const [enabled, setEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!configured) {
      setLoaded(true);
      return;
    }
    (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
        setEnabled(meta.email_reminder === true);
      } finally {
        setLoaded(true);
      }
    })();
  }, [configured]);

  async function toggle() {
    if (!configured || saving) return;
    const next = !enabled;
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { email_reminder: next },
      });
      if (!error) {
        setEnabled(next);
        setSavedAt(Date.now());
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4 rounded-3xl border border-rehberim-border bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rehberim-accent/15 text-rehberim-accent">
          <Bell className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-rehberim-navy">
            Bildirim ayarları
          </h2>
          <p className="text-xs text-rehberim-navy/55">
            Günlük çalışma hatırlatması
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggle}
        disabled={!configured || !loaded || saving}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-4 py-3 text-left transition hover:bg-rehberim-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="min-w-0">
          <p className="text-sm font-bold text-rehberim-navy">
            Günlük hatırlatma e-postası
          </p>
          <p className="text-xs text-rehberim-navy/55">
            Günlük hedefini tamamlamamışsan akşam saatlerinde nazikçe hatırlatırız.
          </p>
        </div>
        {saving ? (
          <Loader2 className="h-5 w-5 shrink-0 animate-spin text-rehberim-navy/40" />
        ) : (
          <span
            className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition ${
              enabled ? "bg-rehberim-accent" : "bg-rehberim-border"
            }`}
          >
            <span
              className={`h-6 w-6 rounded-full bg-white shadow transition ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </span>
        )}
      </button>

      {savedAt && (
        <p className="flex items-center gap-1.5 text-xs text-green-600">
          <Check className="h-4 w-4" />
          Tercihin kaydedildi.
        </p>
      )}

      {!configured && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Bildirim tercihini saklamak için giriş yapmış olman gerekir.
        </p>
      )}

      <p className="rounded-xl bg-rehberim-muted px-3 py-2 text-[11px] text-rehberim-navy/55">
        Not: Gerçek e-posta gönderimi sonraki turda etkinleştirilecek
        (Supabase Edge Function + Resend). Şimdilik yalnız tercih kaydedilir.
      </p>
    </section>
  );
}
