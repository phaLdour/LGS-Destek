"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";
import { uygunsuzMu } from "@/lib/moderasyon";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const TURLER = [
  { key: "soru-hatasi", label: "Soruda hata var" },
  { key: "calismiyor", label: "Bir şey çalışmıyor" },
  { key: "oneri", label: "Önerim var" },
  { key: "diger", label: "Diğer" },
] as const;

/**
 * Geri bildirim formu. Kayıt Supabase'e gider ve yalnız gönderen
 * kendi kayıtlarını okuyabilir (RLS). Hangi sayfadan gönderildiği de
 * saklanır — "şu soruda hata var" gibi bildirimleri bulmayı kolaylaştırır.
 */
export function FeedbackForm({ fromPath }: { fromPath?: string }) {
  const [tur, setTur] = useState<string>("soru-hatasi");
  const [mesaj, setMesaj] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [gonderildi, setGonderildi] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    const temiz = mesaj.trim();
    if (temiz.length < 5) {
      setHata("Biraz daha ayrıntı yazar mısın? En az birkaç kelime.");
      return;
    }
    if (!isSupabaseConfigured()) {
      setHata("Şu an geri bildirim alınamıyor. Birazdan tekrar dene.");
      return;
    }
    // SİTE KURALI: küfür/hakaret içeren metin gönderilemez.
    if (uygunsuzMu(temiz)) {
      setHata(
        "Mesajında kırıcı ya da uygunsuz sözler var. Sorunu kibarca anlatırsan hemen ilgilenirim.",
      );
      return;
    }
    setGonderiliyor(true);
    setHata(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setHata("Geri bildirim göndermek için giriş yapman gerekiyor.");
        return;
      }
      const { error } = await supabase.from("feedback").insert({
        user_id: user.id,
        kind: tur,
        message: temiz,
        page_path: fromPath ?? null,
      });
      if (error) {
        setHata("Gönderilemedi. Birazdan tekrar dener misin?");
        return;
      }
      setGonderildi(true);
      setMesaj("");
    } catch {
      setHata("Bağlantı kurulamadı. İnternetini kontrol et.");
    } finally {
      setGonderiliyor(false);
    }
  };

  if (gonderildi) {
    return (
      <div
        role="status"
        className="ring-hairline mx-auto max-w-xl rounded-3xl border border-rehberim-border bg-white p-8 text-center shadow-card"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-xl font-extrabold tracking-tight text-rehberim-navy">
          Ulaştı, teşekkürler
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-rehberim-navy/70">
          Yazdığın okunacak. Özellikle soru hataları hızlıca düzeltiliyor.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setGonderildi(false)}
            className="rounded-xl border border-rehberim-border bg-white px-4 py-2.5 text-sm font-extrabold text-rehberim-navy transition hover:border-rehberim-accent/40"
          >
            Bir tane daha gönder
          </button>
          <Link
            href="/dashboard"
            className="rounded-xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark px-4 py-2.5 text-sm font-extrabold text-rehberim-on-accent shadow-card transition hover:-translate-y-px hover:shadow-soft"
          >
            Çalışmaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={gonder}
      className="ring-hairline mx-auto max-w-xl rounded-3xl border border-rehberim-border bg-white p-6 shadow-card sm:p-8"
    >
      <h1 className="text-xl font-extrabold tracking-tight text-rehberim-navy">
        Bir şey mi ters gitti?
      </h1>
      <p className="mt-1.5 text-pretty text-sm text-rehberim-navy/70">
        Yanlış bir soru, çalışmayan bir düğme, eksik bir konu — ne görürsen
        yaz. Hangi ders ve konuda olduğunu da eklersen çok daha hızlı buluruz.
      </p>

      <fieldset className="mt-6">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-rehberim-navy/65">
          Ne hakkında?
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {TURLER.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTur(t.key)}
              aria-pressed={tur === t.key}
              className={
                tur === t.key
                  ? "rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-3 py-2 text-xs font-bold text-rehberim-navy"
                  : "rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy/75 transition hover:border-rehberim-accent/40"
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label
        htmlFor="geri-bildirim-mesaj"
        className="mt-6 block text-xs font-extrabold uppercase tracking-wider text-rehberim-navy/65"
      >
        Anlat
      </label>
      <textarea
        id="geri-bildirim-mesaj"
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
        rows={5}
        maxLength={2000}
        placeholder="Örnek: Matematik → Üslü İfadeler konusunda bir soruda iki şık da doğru görünüyor."
        className="mt-2 w-full resize-y rounded-xl border border-rehberim-border bg-rehberim-muted/40 px-3.5 py-3 text-sm text-rehberim-navy outline-none transition focus:border-rehberim-accent/50 focus:bg-white focus:ring-4 focus:ring-rehberim-accent/15"
      />

      <button
        type="submit"
        disabled={gonderiliyor}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rehberim-accent to-rehberim-accent-dark px-5 py-3 text-sm font-extrabold text-rehberim-on-accent shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft disabled:opacity-60"
      >
        {gonderiliyor ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {gonderiliyor ? "Gönderiliyor…" : "Gönder"}
      </button>

      {hata && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {hata}
        </p>
      )}
    </form>
  );
}
