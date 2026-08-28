"use client";

/**
 * Odak Modu — ana ekran.
 *
 * Üç sayaç (saat / geri sayım / kronometre) + ayrı Pomodoro bölümü.
 * Sayaç durumu src/lib/odak.ts singleton'ında yaşar: öğrenci başka sayfaya
 * geçse de sayaç ve ses devam eder (MiniOdak her sayfada görünür).
 * Tamamı tarayıcıda çalışır — AI yok, sunucu maliyeti yok.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Clock3,
  Expand,
  Hourglass,
  Pause,
  Play,
  Square,
  Timer,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  aktifGecenSn,
  odakAboneOl,
  odakBaslat,
  odakBitir,
  odakDevamEt,
  odakDuraklat,
  odakDurumu,
  odakOturumunuKaydet,
  pomodoroFazi,
  sayacKalanSn,
  sureBicimle,
  POMODORO_CALISMA_DK,
  POMODORO_MOLA_DK,
  POMODORO_UZUN_MOLA_DK,
  type OdakDurum,
} from "@/lib/odak";
import {
  aktifSes,
  sesAboneOl,
  sesiCal,
  sesiDurdur,
  sesSeviyesi,
  sesSeviyesiAyarla,
  SESLER,
} from "@/lib/odakSes";
import { TEMALAR, TemaSahnesi, VARSAYILAN_TEMA } from "@/components/odak/OdakTema";

const TEMA_KEY = "rehberim:odak-tema";
const SAYAC_PRESETLER = [15, 25, 40, 60, 90];

type Sekme = "saat" | "sayac" | "kronometre";

function kayitliTema(): string {
  try {
    const t = window.localStorage.getItem(TEMA_KEY);
    if (t && TEMALAR.some((x) => x.id === t)) return t;
  } catch {
    /* yut */
  }
  return VARSAYILAN_TEMA;
}

export function OdakClient() {
  const [hazir, setHazir] = useState(false); // localStorage sonrası render
  const [sekme, setSekme] = useState<Sekme>("sayac");
  const [tema, setTema] = useState(VARSAYILAN_TEMA);
  const [ozelDk, setOzelDk] = useState("");
  const [, setTik] = useState(0);
  const tamEkranRef = useRef<HTMLDivElement>(null);

  // İlk yükleme: kayıtlı tema + aktif sayaç varsa ilgili sekmeye geç
  useEffect(() => {
    setTema(kayitliTema());
    const d = odakDurumu();
    if (d && d.mod !== "pomodoro") setSekme(d.mod);
    setHazir(true);
  }, []);

  // Yarım saniyede bir yeniden çiz (saat + sayaç göstergeleri için)
  useEffect(() => {
    const id = window.setInterval(() => setTik((t) => t + 1), 500);
    const aboneler = [odakAboneOl(() => setTik((t) => t + 1)), sesAboneOl(() => setTik((t) => t + 1))];
    return () => {
      window.clearInterval(id);
      aboneler.forEach((a) => a());
    };
  }, []);

  // Ekran uyumasın: sayaç akarken wake lock iste
  useEffect(() => {
    let kilit: { release: () => Promise<void> } | null = null;
    let iptal = false;
    const iste = async () => {
      try {
        type WakeNav = Navigator & {
          wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> };
        };
        const wl = (navigator as WakeNav).wakeLock;
        if (!wl) return;
        const d = odakDurumu();
        if (!d || d.duraklatmaMs !== null) return;
        kilit = await wl.request("screen");
        if (iptal) void kilit.release();
      } catch {
        /* desteklenmiyorsa sessizce geç */
      }
    };
    void iste();
    const abone = odakAboneOl(() => void iste());
    const gorunum = () => {
      if (document.visibilityState === "visible") void iste();
    };
    document.addEventListener("visibilitychange", gorunum);
    return () => {
      iptal = true;
      document.removeEventListener("visibilitychange", gorunum);
      abone();
      if (kilit) void kilit.release();
    };
  }, []);

  const durum = odakDurumu();
  const pomodoroAktif = durum?.mod === "pomodoro";
  const serbetAktif = durum !== null && durum.mod !== "pomodoro";

  function temaSec(id: string) {
    setTema(id);
    try {
      window.localStorage.setItem(TEMA_KEY, id);
    } catch {
      /* yut */
    }
  }

  function tamEkran() {
    const el = tamEkranRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  }

  async function bitirVeKaydet() {
    const ozet = odakBitir();
    if (ozet) await odakOturumunuKaydet(ozet);
  }

  return (
    <div className="space-y-5">
      {/* ============ Serbest sayaçlar: saat / geri sayım / kronometre ============ */}
      <section
        ref={tamEkranRef}
        className="relative isolate overflow-hidden rounded-3xl border border-rehberim-border shadow-card"
      >
        <TemaSahnesi tema={tema} />

        <div className="relative z-10 flex min-h-[430px] flex-col p-4 sm:p-6">
          {/* Üst şerit: sekmeler + tam ekran */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex rounded-2xl bg-black/30 p-1 backdrop-blur-sm">
              {(
                [
                  { id: "saat", ad: "Saat", Ikon: Clock3 },
                  { id: "sayac", ad: "Sayaç", Ikon: Hourglass },
                  { id: "kronometre", ad: "Kronometre", Ikon: Timer },
                ] as { id: Sekme; ad: string; Ikon: typeof Clock3 }[]
              ).map(({ id, ad, Ikon }) => {
                const secili = sekme === id;
                return (
                  <button
                    key={id}
                    onClick={() => setSekme(id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition sm:text-sm ${
                      secili ? "bg-white text-rehberim-navy" : "text-white/85 hover:bg-white/15"
                    }`}
                  >
                    <Ikon className="h-4 w-4" />
                    {ad}
                  </button>
                );
              })}
            </div>
            <button
              onClick={tamEkran}
              title="Tam ekran"
              aria-label="Tam ekran"
              className="rounded-xl bg-black/30 p-2.5 text-white/85 backdrop-blur-sm transition hover:bg-black/45"
            >
              <Expand className="h-4 w-4" />
            </button>
          </div>

          {/* Gösterge */}
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            {hazir && sekme === "saat" && <SaatGostergesi />}
            {hazir && sekme === "sayac" && (
              <SayacGostergesi durum={serbetAktif && durum!.mod === "sayac" ? durum : null} ozelDk={ozelDk} setOzelDk={setOzelDk} bitir={bitirVeKaydet} />
            )}
            {hazir && sekme === "kronometre" && (
              <KronometreGostergesi durum={serbetAktif && durum!.mod === "kronometre" ? durum : null} bitir={bitirVeKaydet} />
            )}
            {hazir && serbetAktif && durum!.mod !== sekme && durum!.mod !== "pomodoro" && (
              <button
                onClick={() => setSekme(durum!.mod as Sekme)}
                className="mt-4 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/25"
              >
                {durum!.mod === "sayac" ? "⏳ Sayaç çalışıyor — göster" : "⏱️ Kronometre çalışıyor — göster"}
              </button>
            )}
            {hazir && pomodoroAktif && (
              <p className="mt-4 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                🍅 Pomodoro çalışıyor — aşağıdaki bölümden takip edebilirsin
              </p>
            )}
          </div>

          {/* Tema + ses seçimi */}
          <div className="space-y-3">
            <TemaSecici tema={tema} temaSec={temaSec} />
            <SesSecici />
          </div>
        </div>
      </section>

      {/* ============ Pomodoro — ayrı, kendine has bölüm ============ */}
      <PomodoroKarti durum={pomodoroAktif ? durum : null} bitir={bitirVeKaydet} hazir={hazir} />
    </div>
  );
}

/* ------------------------------ Saat ------------------------------ */

function SaatGostergesi() {
  const simdi = new Date();
  const saat = simdi.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  const saniye = simdi.getSeconds();
  const tarih = simdi.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
  return (
    <div>
      <p className="font-mono text-[64px] font-bold leading-none tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] sm:text-[96px]">
        {saat}
        <span className="ml-2 align-top text-2xl text-white/60 sm:text-3xl">
          {String(saniye).padStart(2, "0")}
        </span>
      </p>
      <p className="mt-3 text-sm font-semibold capitalize text-white/80">{tarih}</p>
    </div>
  );
}

/* --------------------------- Geri sayım --------------------------- */

function SayacGostergesi({
  durum,
  ozelDk,
  setOzelDk,
  bitir,
}: {
  durum: OdakDurum | null;
  ozelDk: string;
  setOzelDk: (v: string) => void;
  bitir: () => Promise<void>;
}) {
  if (!durum) {
    const ozel = Number(ozelDk);
    const ozelGecerli = Number.isFinite(ozel) && ozel >= 1 && ozel <= 300;
    return (
      <div className="w-full max-w-md">
        <p className="text-sm font-semibold text-white/85">Ne kadar çalışacaksın?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {SAYAC_PRESETLER.map((dk) => (
            <button
              key={dk}
              onClick={() => odakBaslat("sayac", dk * 60)}
              className="rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-rehberim-navy"
            >
              {dk} dk
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <input
            inputMode="numeric"
            value={ozelDk}
            onChange={(e) => setOzelDk(e.target.value.replace(/\D/g, "").slice(0, 3))}
            placeholder="Özel süre (dk)"
            className="w-36 rounded-2xl border-0 bg-white/15 px-3 py-2.5 text-center text-sm font-bold text-white placeholder-white/50 backdrop-blur-sm outline-none focus:bg-white/25"
          />
          <button
            onClick={() => ozelGecerli && odakBaslat("sayac", ozel * 60)}
            disabled={!ozelGecerli}
            className="flex items-center gap-1.5 rounded-2xl bg-rehberim-accent px-4 py-2.5 text-sm font-bold text-white transition enabled:hover:brightness-110 disabled:opacity-40"
          >
            <Play className="h-4 w-4" /> Başlat
          </button>
        </div>
      </div>
    );
  }

  const kalan = sayacKalanSn(durum);
  const oran = durum.sureSn > 0 ? kalan / durum.sureSn : 0;
  const duraklatildi = durum.duraklatmaMs !== null;

  return (
    <div className="flex flex-col items-center">
      <Halka oran={oran} renk="#F97316">
        {durum.bitti ? (
          <div className="text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-1 text-lg font-extrabold text-white">Süre doldu!</p>
            <p className="text-xs font-semibold text-white/75">{Math.round(durum.sureSn / 60)} dk çalıştın</p>
          </div>
        ) : (
          <p className="font-mono text-5xl font-bold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.4)] sm:text-6xl">
            {sureBicimle(kalan)}
          </p>
        )}
      </Halka>
      <div className="mt-5 flex items-center gap-2">
        {durum.bitti ? (
          <button
            onClick={() => void bitir()}
            className="rounded-2xl bg-white px-6 py-2.5 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
          >
            Tamam
          </button>
        ) : (
          <>
            <button
              onClick={() => (duraklatildi ? odakDevamEt() : odakDuraklat())}
              className="flex items-center gap-1.5 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
            >
              {duraklatildi ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {duraklatildi ? "Devam" : "Duraklat"}
            </button>
            <button
              onClick={() => void bitir()}
              className="flex items-center gap-1.5 rounded-2xl bg-black/35 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              <Square className="h-3.5 w-3.5" /> Bitir
            </button>
          </>
        )}
      </div>
      {duraklatildi && !durum.bitti && (
        <p className="mt-2 text-xs font-semibold text-white/70">Duraklatıldı</p>
      )}
    </div>
  );
}

/* --------------------------- Kronometre --------------------------- */

function KronometreGostergesi({
  durum,
  bitir,
}: {
  durum: OdakDurum | null;
  bitir: () => Promise<void>;
}) {
  if (!durum) {
    return (
      <div className="text-center">
        <p className="font-mono text-6xl font-bold text-white/40 sm:text-7xl">00:00</p>
        <button
          onClick={() => odakBaslat("kronometre")}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-rehberim-accent px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
        >
          <Play className="h-4 w-4" /> Başlat
        </button>
      </div>
    );
  }
  const gecen = aktifGecenSn(durum);
  const duraklatildi = durum.duraklatmaMs !== null;
  return (
    <div className="flex flex-col items-center">
      <p className="font-mono text-6xl font-bold text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.4)] sm:text-7xl">
        {sureBicimle(gecen)}
      </p>
      <div className="mt-6 flex items-center gap-2">
        <button
          onClick={() => (duraklatildi ? odakDevamEt() : odakDuraklat())}
          className="flex items-center gap-1.5 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
        >
          {duraklatildi ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          {duraklatildi ? "Devam" : "Duraklat"}
        </button>
        <button
          onClick={() => void bitir()}
          className="flex items-center gap-1.5 rounded-2xl bg-black/35 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          <Square className="h-3.5 w-3.5" /> Bitir
        </button>
      </div>
      {duraklatildi && <p className="mt-2 text-xs font-semibold text-white/70">Duraklatıldı</p>}
    </div>
  );
}

/* --------------------------- İlerleme halkası --------------------------- */

function Halka({
  oran,
  renk,
  children,
}: {
  oran: number; // 1 → dolu, 0 → boş
  renk: string;
  children: ReactNode;
}) {
  const r = 118;
  const cevre = 2 * Math.PI * r;
  return (
    <div className="relative h-64 w-64 sm:h-72 sm:w-72">
      <svg viewBox="0 0 260 260" className="h-full w-full -rotate-90">
        <circle cx="130" cy="130" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="9" />
        <circle
          cx="130"
          cy="130"
          r={r}
          fill="none"
          stroke={renk}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={cevre}
          strokeDashoffset={cevre * (1 - Math.min(1, Math.max(0, oran)))}
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* --------------------------- Tema / ses seçiciler --------------------------- */

function TemaSecici({ tema, temaSec }: { tema: string; temaSec: (id: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
      {TEMALAR.map((t) => {
        const secili = t.id === tema;
        return (
          <button
            key={t.id}
            onClick={() => temaSec(t.id)}
            title={t.ad}
            className={`flex shrink-0 items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold backdrop-blur-sm transition ${
              secili ? "bg-white text-rehberim-navy" : "bg-black/30 text-white/85 hover:bg-black/45"
            }`}
          >
            <span
              className="inline-block h-4 w-4 rounded-full ring-1 ring-white/40"
              style={{ background: t.onizleme }}
            />
            {t.emoji} {t.ad}
          </button>
        );
      })}
    </div>
  );
}

function SesSecici() {
  const aktif = aktifSes();
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {SESLER.map((s) => {
          const secili = s.id === aktif;
          return (
            <button
              key={s.id}
              onClick={() => (secili ? sesiDurdur() : sesiCal(s.id))}
              title={s.aciklama}
              className={`shrink-0 rounded-2xl px-3 py-2 text-xs font-bold backdrop-blur-sm transition ${
                secili ? "bg-rehberim-accent text-white" : "bg-black/30 text-white/85 hover:bg-black/45"
              }`}
            >
              {s.emoji} {s.ad}
            </button>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-black/30 px-3 py-2 backdrop-blur-sm">
        {aktif ? (
          <button onClick={sesiDurdur} aria-label="Sesi kapat">
            <Volume2 className="h-4 w-4 text-white/85" />
          </button>
        ) : (
          <VolumeX className="h-4 w-4 text-white/50" />
        )}
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={Math.round(sesSeviyesi() * 100)}
          onChange={(e) => sesSeviyesiAyarla(Number(e.target.value) / 100)}
          aria-label="Ses seviyesi"
          className="h-1 w-20 accent-[#F97316]"
        />
      </div>
    </div>
  );
}

/* ------------------------------ Pomodoro ------------------------------ */

function PomodoroKarti({
  durum,
  bitir,
  hazir,
}: {
  durum: OdakDurum | null;
  bitir: () => Promise<void>;
  hazir: boolean;
}) {
  const [onay, setOnay] = useState(false);
  useEffect(() => setOnay(false), [durum?.baslangicMs]);

  const faz = durum ? pomodoroFazi(aktifGecenSn(durum)) : null;
  const calismaFazi = faz?.tip === "calisma";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-card transition-colors sm:p-6 ${
        durum
          ? calismaFazi
            ? "border-red-300/60 bg-gradient-to-br from-[#7f1d1d] to-[#b91c1c] dark:border-red-900"
            : "border-emerald-300/60 bg-gradient-to-br from-[#065f46] to-[#059669] dark:border-emerald-900"
          : "border-rehberim-border bg-white"
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-10 select-none text-[110px] opacity-10"
      >
        🍅
      </span>

      {!durum && (
        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-2xl dark:bg-red-500/15">
              🍅
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-extrabold text-rehberim-navy">Pomodoro</h2>
              <p className="mt-0.5 text-sm text-rehberim-navy/65">
                {POMODORO_CALISMA_DK} dk çalış, {POMODORO_MOLA_DK} dk dinlen; 4. turdan
                sonra {POMODORO_UZUN_MOLA_DK} dk uzun mola. Süre <b>hiç durmaz</b> — molayı
                uzatmak yok, teknik böyle işliyor. Ben sana fazları zil sesiyle haber veririm.
              </p>
            </div>
          </div>
          {hazir && (
            <button
              onClick={() => odakBaslat("pomodoro")}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <Play className="h-4 w-4" /> Pomodoro&apos;yu başlat
            </button>
          )}
        </div>
      )}

      {durum && faz && (
        <div className="relative text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                Pomodoro · {faz.set > 1 ? `${faz.set}. set · ` : ""}
                {faz.tur}. tur
              </p>
              <h2 className="mt-0.5 text-xl font-extrabold">
                {calismaFazi ? "📖 Çalışma zamanı" : faz.uzunMola ? "🧘 Uzun mola" : "☕ Kısa mola"}
              </h2>
            </div>
            {/* Tur noktaları */}
            <div className="flex items-center gap-1.5" aria-label={`${faz.tur}. tur`}>
              {[1, 2, 3, 4].map((t) => (
                <span
                  key={t}
                  className={`h-2.5 w-2.5 rounded-full ${
                    t < faz.tur || (t === faz.tur && !calismaFazi)
                      ? "bg-white"
                      : t === faz.tur
                        ? "bg-white/90 ring-2 ring-white/40"
                        : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <p className="font-mono text-6xl font-bold leading-none sm:text-7xl">
              {sureBicimle(faz.fazKalanSn)}
            </p>
            <div className="text-right text-xs font-semibold text-white/75">
              <p>Toplam çalışma: {Math.floor(faz.calismaSn / 60)} dk</p>
              <p className="mt-0.5">
                {calismaFazi
                  ? `Sonra: ${faz.tur === 4 ? `${POMODORO_UZUN_MOLA_DK} dk uzun mola` : `${POMODORO_MOLA_DK} dk mola`}`
                  : "Sonra: 25 dk çalışma"}
              </p>
            </div>
          </div>

          {/* Faz ilerleme çubuğu */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-[width] duration-500 ease-linear"
              style={{ width: `${(1 - faz.fazKalanSn / faz.fazToplamSn) * 100}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            {!onay ? (
              <button
                onClick={() => setOnay(true)}
                className="flex items-center gap-1.5 rounded-2xl bg-black/25 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/40"
              >
                <Square className="h-3.5 w-3.5" /> Bitir
              </button>
            ) : (
              <>
                <span className="text-sm font-semibold text-white/85">Bitirmek istediğine emin misin?</span>
                <button
                  onClick={() => void bitir()}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
                >
                  Evet, bitir
                </button>
                <button
                  onClick={() => setOnay(false)}
                  className="rounded-2xl bg-black/25 px-4 py-2 text-sm font-bold text-white transition hover:bg-black/40"
                >
                  Vazgeç
                </button>
              </>
            )}
          </div>
          <p className="mt-2 text-[11px] font-medium text-white/60">
            Yalnız çalışma fazları istatistiklerine işlenir — molalar sayılmaz. 😉
          </p>
        </div>
      )}
    </section>
  );
}
