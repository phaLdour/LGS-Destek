"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Link as LinkIcon, Loader2, RotateCcw } from "lucide-react";

const DERSLER = [
  { slug: null, name: "Karma (tüm dersler)" },
  { slug: "turkce", name: "Türkçe" },
  { slug: "matematik", name: "Matematik" },
  { slug: "fen-bilimleri", name: "Fen Bilimleri" },
  { slug: "inkilap", name: "İnkılap" },
  { slug: "din", name: "Din Kültürü" },
  { slug: "ingilizce", name: "İngilizce" },
] as const;

/**
 * Arkadaş düellosu daveti üretir.
 *
 * Akış: ders seç → link üret → linki paylaş → arkadaş açınca maç kurulur.
 * Bu ekran 3 saniyede bir davetin durumunu yoklar; kabul edildiği anda
 * iki taraf da maça girer. Davet 30 dakika geçerlidir.
 */
export function InviteCreator() {
  const router = useRouter();
  const [ders, setDers] = useState<string | null>(null);
  const [kod, setKod] = useState<string | null>(null);
  const [uretiliyor, setUretiliyor] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [hata, setHata] = useState<string | null>(null);
  const [kalanSn, setKalanSn] = useState<number | null>(null);
  const yonlendiRef = useRef(false);

  const link = kod
    ? `${typeof window === "undefined" ? "" : window.location.origin}/rekabet/davet/${kod}`
    : null;

  // Sayfa yenilendiyse açık daveti geri kur (yoksa kullanıcı kodunu
  // kaybedip yenisini üretiyor, arkadaşının elindeki link ölüyordu).
  useEffect(() => {
    let iptal = false;
    (async () => {
      try {
        const res = await fetch("/api/comp/invite");
        if (!res.ok) return;
        const data = await res.json();
        if (!iptal && data.code) setKod(data.code as string);
      } catch {
        // sessiz geç — kullanıcı yeni davet üretebilir
      }
    })();
    return () => {
      iptal = true;
    };
  }, []);

  const uret = useCallback(async () => {
    setUretiliyor(true);
    setHata(null);
    setKopyalandi(false);
    try {
      const res = await fetch("/api/comp/invite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ subjectFilter: ders }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata("Davet oluşturulamadı. Birazdan tekrar dene.");
        return;
      }
      setKod(data.code as string);
    } catch {
      setHata("Bağlantı kurulamadı. İnternetini kontrol et.");
    } finally {
      setUretiliyor(false);
    }
  }, [ders]);

  // Kabul edildi mi? 3 sn'de bir yokla.
  useEffect(() => {
    if (!kod) return;
    let iptal = false;
    const yokla = async () => {
      try {
        const res = await fetch(`/api/comp/invite?code=${kod}`);
        if (!res.ok) return;
        const data = await res.json();
        if (iptal) return;
        if (data.matchId && !yonlendiRef.current) {
          yonlendiRef.current = true;
          router.push(`/rekabet/${data.matchId}`);
          return;
        }
        if (data.expiresAt) {
          const kalan = Math.max(
            0,
            Math.round((new Date(data.expiresAt).getTime() - Date.now()) / 1000),
          );
          setKalanSn(kalan);
          // Süre dolduysa yoklamayı durdur — açık kalan bir sekme aksi
          // halde saatlerce boşuna istek atardı.
          if (kalan === 0) clearInterval(t);
        }
      } catch {
        // sessiz geç — bir sonraki yoklamada tekrar denenir
      }
    };
    const t = setInterval(yokla, 3000);
    void yokla();
    return () => {
      iptal = true;
      clearInterval(t);
    };
  }, [kod, router]);

  const kopyala = async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 2000);
    } catch {
      setHata("Kopyalanamadı — linki elle seçip kopyalayabilirsin.");
    }
  };

  const dakika = kalanSn === null ? null : Math.ceil(kalanSn / 60);
  const suresiDoldu = kalanSn === 0;

  return (
    <div className="ring-hairline mx-auto max-w-xl rounded-3xl border border-rehberim-border bg-white p-6 shadow-card sm:p-8">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rehberim-accent/12 text-rehberim-accent ring-1 ring-rehberim-accent/15">
        <LinkIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-xl font-extrabold tracking-tight text-rehberim-navy">
        Arkadaşına meydan oku
      </h1>
      <p className="mt-1.5 text-pretty text-sm text-rehberim-navy/60">
        Bir link paylaş, arkadaşın açsın, 10 soruluk düellonuz başlasın. Arkadaş
        maçı ligini etkilemez — puanın, serin ve rütben olduğu gibi kalır.
      </p>

      {!kod && (
        <>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-wider text-rehberim-navy/55">
            Sorular hangi dersten gelsin?
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {DERSLER.map((d) => {
              const secili = d.slug === ders;
              return (
                <button
                  key={d.slug ?? "karma"}
                  type="button"
                  onClick={() => setDers(d.slug)}
                  aria-pressed={secili}
                  className={
                    secili
                      ? "rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-3 py-2 text-xs font-bold text-rehberim-accent-deep"
                      : "rounded-xl border border-rehberim-border bg-white px-3 py-2 text-xs font-bold text-rehberim-navy/75 transition hover:border-rehberim-accent/40 hover:text-rehberim-navy"
                  }
                >
                  {d.name}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={uret}
            disabled={uretiliyor}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-rehberim-accent to-amber-500 px-5 py-3 text-sm font-extrabold text-rehberim-navy shadow-card transition-all duration-200 ease-smooth hover:-translate-y-px hover:shadow-soft disabled:opacity-60"
          >
            {uretiliyor ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
            {uretiliyor ? "Hazırlanıyor…" : "Davet linki oluştur"}
          </button>
        </>
      )}

      {kod && (
        <>
          <div className="mt-6 rounded-2xl border border-rehberim-border bg-rehberim-muted/50 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-rehberim-navy/55">
              Bu linki arkadaşına gönder
            </p>
            <p className="mt-2 break-all font-mono text-sm text-rehberim-navy">
              {link}
            </p>
            <button
              type="button"
              onClick={kopyala}
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-rehberim-border bg-white px-4 py-2 text-xs font-extrabold text-rehberim-navy transition hover:border-rehberim-accent/40"
            >
              {kopyalandi ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {kopyalandi ? "Kopyalandı" : "Linki kopyala"}
            </button>
          </div>

          {suresiDoldu ? (
            <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
              Bu linkin süresi doldu. Aşağıdan yeni bir tane oluştur.
            </p>
          ) : (
            <div className="mt-4 flex items-center gap-2.5 text-sm text-rehberim-navy/70">
              <Loader2 className="h-4 w-4 animate-spin text-rehberim-accent" />
              <p>
                Arkadaşın bekleniyor… Kabul ettiği anda ikiniz de maça
                gireceksiniz.
                {dakika !== null && dakika > 0 && (
                  <span className="text-rehberim-navy/55">
                    {" "}
                    Link {dakika} dakika daha geçerli.
                  </span>
                )}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={async () => {
              // Sunucudaki daveti de iptal et; yoksa paylaşılmış eski link
              // 30 dakika daha canlı kalıp sahibinin haberi olmadığı bir
              // maç açardı.
              try {
                await fetch("/api/comp/invite", { method: "DELETE" });
              } catch {
                // iptal edilemese de ekranı temizle
              }
              setKod(null);
              setKalanSn(null);
            }}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-rehberim-navy/50 transition hover:text-rehberim-navy"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Başka bir ders seç
          </button>
        </>
      )}

      {hata && (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {hata}
        </p>
      )}
    </div>
  );
}
