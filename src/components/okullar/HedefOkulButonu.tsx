"use client";

import { useEffect, useState } from "react";
import { Target, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Okul sayfasındaki "Hedefim yap" butonu.
 * Tercih user_metadata.hedef_okul_id'de tutulur — şema değişikliği yok,
 * cihazlar arasında kendiliğinden senkron.
 */
export function HedefOkulButonu({ okulId }: { okulId: string }) {
  const [durum, setDurum] = useState<"yukleniyor" | "hedef" | "degil" | "misafir">(
    "yukleniyor",
  );
  const [kaydediyor, setKaydediyor] = useState(false);

  useEffect(() => {
    let iptal = false;
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (iptal) return;
        if (!data.user) return setDurum("misafir");
        const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
        setDurum(meta.hedef_okul_id === okulId ? "hedef" : "degil");
      })
      .catch(() => !iptal && setDurum("misafir"));
    return () => {
      iptal = true;
    };
  }, [okulId]);

  async function degistir() {
    if (kaydediyor || durum === "yukleniyor" || durum === "misafir") return;
    setKaydediyor(true);
    const yeni = durum === "hedef" ? null : okulId;
    const { error } = await createClient().auth.updateUser({
      data: { hedef_okul_id: yeni },
    });
    if (!error) setDurum(yeni ? "hedef" : "degil");
    setKaydediyor(false);
  }

  if (durum === "misafir" || durum === "yukleniyor") return null;

  return durum === "hedef" ? (
    <button
      type="button"
      onClick={degistir}
      disabled={kaydediyor}
      className="inline-flex items-center gap-1.5 rounded-xl border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-extrabold text-green-700 transition hover:border-green-400 disabled:opacity-60"
    >
      <Target className="h-4 w-4" />
      Hedefin bu okul
      <X className="h-3.5 w-3.5 opacity-60" />
    </button>
  ) : (
    <button
      type="button"
      onClick={degistir}
      disabled={kaydediyor}
      className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-4 py-2.5 text-sm font-extrabold text-rehberim-accent-deep transition hover:border-rehberim-accent/70 hover:bg-rehberim-accent/15 disabled:opacity-60"
    >
      <Target className="h-4 w-4" />
      Hedefim yap
    </button>
  );
}
