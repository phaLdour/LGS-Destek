"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Swords } from "lucide-react";

/** Kabul denemesinin sunucudan dönebileceği hatalar ve kullanıcıya karşılığı. */
const HATA_METNI: Record<string, string> = {
  not_found: "Bu davet bulunamadı. Link yanlış kopyalanmış olabilir.",
  expired: "Davetin süresi dolmuş. Arkadaşından yeni bir link iste.",
  consumed: "Bu davet zaten kullanılmış. Arkadaşından yeni bir link iste.",
  self: "Kendi davetini kabul edemezsin — linki bir arkadaşına gönder.",
  busy: "İkinizden birinin devam eden bir maçı var. Önce onu bitirin.",
  insufficient_pool: "Bu ders için yeterli soru bulunamadı.",
  unauthorized: "Önce giriş yapman gerekiyor.",
};

export function InviteAccepter({ code }: { code: string }) {
  const router = useRouter();
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  const kabulEt = async () => {
    setYukleniyor(true);
    setHata(null);
    try {
      const res = await fetch("/api/comp/invite/accept", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(
          HATA_METNI[data.error as string] ??
            "Maç açılamadı. Birazdan tekrar dene.",
        );
        return;
      }
      router.push(`/rekabet/${data.matchId}`);
    } catch {
      setHata("Bağlantı kurulamadı. İnternetini kontrol et.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="ring-hairline mx-auto max-w-md rounded-3xl border border-rehberim-border bg-white p-6 text-center shadow-card sm:p-8">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rehberim-accent/12 text-rehberim-accent ring-1 ring-rehberim-accent/15">
        <Swords className="h-8 w-8" />
      </span>
      <h1 className="mt-5 text-xl font-extrabold tracking-tight text-rehberim-navy">
        Düelloya davet edildin
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-pretty text-sm text-rehberim-navy/60">
        10 soru, iki kişi, en hızlı net kazanır. Bu bir arkadaş maçı — lig
        puanınızı, serinizi ve rütbenizi etkilemez.
      </p>
      <p className="mt-3 font-mono text-xs tracking-widest text-rehberim-navy/40">
        {code}
      </p>

      <button
        type="button"
        onClick={kabulEt}
        disabled={yukleniyor}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-5 py-3 text-sm font-extrabold text-rehberim-navy shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft disabled:opacity-60"
      >
        {yukleniyor ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Swords className="h-4 w-4" />
        )}
        {yukleniyor ? "Maç açılıyor…" : "Meydan okumayı kabul et"}
      </button>

      {hata && (
        <div className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <p>{hata}</p>
          <Link
            href="/rekabet"
            className="mt-1.5 inline-block font-bold underline"
          >
            Rekabet lobisine dön
          </Link>
        </div>
      )}
    </div>
  );
}
