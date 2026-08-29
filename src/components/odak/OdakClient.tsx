"use client";

/**
 * Odak Modu — ana ekran (revizyon 2).
 *
 * - 4 sekme: Saat / Sayaç / Kronometre / POMODORO (görsel olarak ayrıcalıklı)
 * - Süreler ortada, çok büyük, stencil (kilit ekranı tarzı) fontla
 * - Tema ve ses seçimi köşedeki iki küçük butonun paneline taşındı;
 *   tam ekranda hiçbir seçici görünmez, yalnız süre kalır
 * - Pomodoro başlatınca sekmeler kilitlenir; ilk kullanımda uyarı + çıkış
 *   hakkı vardır, sonraki kullanımlarda çıkış yalnız molada açılır
 */

import { useEffect, useRef, useState } from "react";
import {
  Clock3,
  Expand,
  Hourglass,
  Minimize,
  Music,
  Palette,
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
const POMODORO_USTA_KEY = "rehberim:pomodoro-usta"; // ilk pomodoro tamamlandı mı
const SAYAC_PRESETLER = [15, 25, 40, 60, 90];

/**
 * Büyük süre yazıları: Potra (Rainmeter tarzı kesik font). Potra'da olmayan
 * harfler (Ç, Ş, İ...) yedek stencil fonttan gelir; ikisi de yoksa mono.
 */
const SAAT_FONT = "var(--font-saat), var(--font-saat-yedek), ui-monospace, monospace";

type Sekme = "saat" | "sayac" | "kronometre" | "pomodoro";

function kayitliTema(): string {
  try {
    const t = window.localStorage.getItem(TEMA_KEY);
    if (t && TEMALAR.some((x) => x.id === t)) return t;
  } catch {
    /* yut */
  }
  return VARSAYILAN_TEMA;
}

function pomodoroUstasiMi(): boolean {
  try {
    return window.localStorage.getItem(POMODORO_USTA_KEY) === "1";
  } catch {
    return false;
  }
}

export function OdakClient() {
  const [hazir, setHazir] = useState(false);
  const [sekme, setSekme] = useState<Sekme>("sayac");
  const [tema, setTema] = useState(VARSAYILAN_TEMA);
  const [ozelDk, setOzelDk] = useState("");
  const [panel, setPanel] = useState<"tema" | "ses" | null>(null);
  const [tamEkranda, setTamEkranda] = useState(false);
  const [, setTik] = useState(0);
  const tamEkranRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTema(kayitliTema());
    const d = odakDurumu();
    if (d) setSekme(d.mod);
    setHazir(true);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTik((t) => t + 1), 500);
    const aboneler = [odakAboneOl(() => setTik((t) => t + 1)), sesAboneOl(() => setTik((t) => t + 1))];
    const fs = () => setTamEkranda(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", fs);
    return () => {
      window.clearInterval(id);
      aboneler.forEach((a) => a());
      document.removeEventListener("fullscreenchange", fs);
    };
  }, []);

  // Ekran uyumasın: sayaç akarken wake lock iste.
  // DİKKAT: her istekten önce eski kilit MUTLAKA bırakılır — yoksa duraklat/
  // devam et döngüsünde sentinel'ler birikiyor ve sayaç durdurulduğunda bile
  // ekran uyanık kalıp pili tüketiyordu.
  useEffect(() => {
    let kilit: { release: () => Promise<void> } | null = null;
    let iptal = false;
    const birak = async () => {
      if (!kilit) return;
      const eski = kilit;
      kilit = null;
      try {
        await eski.release();
      } catch {
        /* zaten bırakılmış olabilir */
      }
    };
    const iste = async () => {
      try {
        type WakeNav = Navigator & {
          wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> };
        };
        const wl = (navigator as WakeNav).wakeLock;
        if (!wl) return;
        const d = odakDurumu();
        // Sayaç yok ya da duraklatıldı → kilidi bırak, ekran normale dönsün.
        if (!d || d.duraklatmaMs !== null) {
          await birak();
          return;
        }
        if (kilit) return; // zaten kilitli
        kilit = await wl.request("screen");
        if (iptal) await birak();
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
      void birak();
    };
  }, []);

  const durum = odakDurumu();
  const pomodoroKilidi = durum?.mod === "pomodoro";
  const gosterilen: Sekme = pomodoroKilidi ? "pomodoro" : sekme;

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
    const d = odakDurumu();
    // Pomodoro'da en az 1 tam çalışma turu bittiyse "usta" say — uyarı kalkar
    if (d?.mod === "pomodoro") {
      const faz = pomodoroFazi(aktifGecenSn(d));
      if (faz.calismaSn >= POMODORO_CALISMA_DK * 60) {
        try {
          window.localStorage.setItem(POMODORO_USTA_KEY, "1");
        } catch {
          /* yut */
        }
      }
    }
    const ozet = odakBitir();
    if (ozet) await odakOturumunuKaydet(ozet);
  }

  const SEKMELER: { id: Sekme; ad: string; Ikon: typeof Clock3 }[] = [
    { id: "saat", ad: "Saat", Ikon: Clock3 },
    { id: "sayac", ad: "Sayaç", Ikon: Hourglass },
    { id: "kronometre", ad: "Kronometre", Ikon: Timer },
  ];

  return (
    <section
      ref={tamEkranRef}
      className={`relative isolate overflow-hidden rounded-3xl border border-rehberim-border bg-rehberim-navy shadow-card ${
        tamEkranda ? "" : ""
      }`}
    >
      <TemaSahnesi tema={tema} />

      <div className={`relative z-10 flex flex-col p-4 sm:p-6 ${tamEkranda ? "h-screen" : "min-h-[500px] sm:min-h-[540px]"}`}>
        {/* ===== Üst şerit: sekmeler (tam ekranda gizli) ===== */}
        {!tamEkranda && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex rounded-2xl bg-black/35 p-1 backdrop-blur-md">
              {SEKMELER.map(({ id, ad, Ikon }) => {
                const secili = gosterilen === id;
                return (
                  <button
                    key={id}
                    onClick={() => !pomodoroKilidi && setSekme(id)}
                    disabled={pomodoroKilidi}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition sm:text-sm ${
                      secili
                        ? "bg-white text-rehberim-navy"
                        : pomodoroKilidi
                          ? "cursor-not-allowed text-white/35"
                          : "text-white/85 hover:bg-white/15"
                    }`}
                  >
                    <Ikon className="h-4 w-4" />
                    {ad}
                  </button>
                );
              })}
            </div>
            {/* Pomodoro — bilerek ayrı ve gösterişli: bu sıradan bir sayaç değil */}
            <button
              onClick={() => !pomodoroKilidi && setSekme("pomodoro")}
              className={`group relative flex items-center gap-1.5 overflow-hidden rounded-2xl px-4 py-2.5 text-xs font-extrabold tracking-wide transition sm:text-sm ${
                gosterilen === "pomodoro"
                  ? "bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white shadow-[0_0_22px_rgba(239,68,68,0.55)] ring-2 ring-red-300/60"
                  : "bg-gradient-to-r from-red-700/80 to-orange-600/80 text-white/95 shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              }`}
            >
              <span className="text-base leading-none">🍅</span> POMODORO
              {pomodoroKilidi && <span className="ml-0.5">🔒</span>}
            </button>
          </div>
        )}

        {/* ===== Orta: büyük gösterge ===== */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-4 text-center">
          {hazir && gosterilen === "saat" && <SaatGostergesi tamEkranda={tamEkranda} />}
          {hazir && gosterilen === "sayac" && (
            <SayacGostergesi
              durum={durum?.mod === "sayac" ? durum : null}
              ozelDk={ozelDk}
              setOzelDk={setOzelDk}
              bitir={bitirVeKaydet}
              tamEkranda={tamEkranda}
            />
          )}
          {hazir && gosterilen === "kronometre" && (
            <KronometreGostergesi
              durum={durum?.mod === "kronometre" ? durum : null}
              bitir={bitirVeKaydet}
              tamEkranda={tamEkranda}
            />
          )}
          {hazir && gosterilen === "pomodoro" && (
            <PomodoroGostergesi
              durum={durum?.mod === "pomodoro" ? durum : null}
              bitir={bitirVeKaydet}
              tamEkranda={tamEkranda}
            />
          )}
          {/* Başka modda sayaç çalışıyorsa küçük hatırlatma */}
          {hazir && durum && durum.mod !== gosterilen && (
            <button
              onClick={() => setSekme(durum.mod)}
              className="mt-4 rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/25"
            >
              {durum.mod === "sayac" && "⏳ Sayaç çalışıyor — göster"}
              {durum.mod === "kronometre" && "⏱️ Kronometre çalışıyor — göster"}
              {durum.mod === "pomodoro" && "🍅 Pomodoro çalışıyor — göster"}
            </button>
          )}
        </div>

        {/* ===== Alt şerit: küçük tema/ses/tam ekran butonları (tam ekranda gizli) ===== */}
        {!tamEkranda && (
          <div className="relative flex items-center justify-between">
            <p className="hidden text-[11px] font-medium text-white/45 sm:block">
              {aktifSes() ? `🎧 ${SESLER.find((s) => s.id === aktifSes())?.ad}` : ""}
            </p>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setPanel(panel === "tema" ? null : "tema")}
                title="Tema seç"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold backdrop-blur-md transition ${
                  panel === "tema" ? "bg-white text-rehberim-navy" : "bg-black/35 text-white/85 hover:bg-black/50"
                }`}
              >
                <Palette className="h-4 w-4" /> Tema
              </button>
              <button
                onClick={() => setPanel(panel === "ses" ? null : "ses")}
                title="Ortam sesi"
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold backdrop-blur-md transition ${
                  panel === "ses" ? "bg-white text-rehberim-navy" : "bg-black/35 text-white/85 hover:bg-black/50"
                }`}
              >
                <Music className="h-4 w-4" /> Ses
                {aktifSes() && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </button>
              <button
                onClick={tamEkran}
                title="Tam ekran"
                aria-label="Tam ekran"
                className="rounded-xl bg-black/35 p-2.5 text-white/85 backdrop-blur-md transition hover:bg-black/50"
              >
                <Expand className="h-4 w-4" />
              </button>
            </div>

            {/* Tema paneli */}
            {panel === "tema" && (
              <div className="absolute bottom-full right-0 z-20 mb-2 w-72 rounded-2xl border border-white/15 bg-black/70 p-3 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1.5">
                  {TEMALAR.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        temaSec(t.id);
                        setPanel(null);
                      }}
                      className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-bold transition ${
                        t.id === tema ? "bg-white text-rehberim-navy" : "text-white/85 hover:bg-white/15"
                      }`}
                    >
                      <span className="inline-block h-5 w-5 shrink-0 rounded-md ring-1 ring-white/30" style={{ background: t.onizleme }} />
                      {t.emoji} {t.ad}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-medium text-white/40">Fotoğraflar: Unsplash</p>
              </div>
            )}

            {/* Ses paneli */}
            {panel === "ses" && (
              <div className="absolute bottom-full right-0 z-20 mb-2 w-72 rounded-2xl border border-white/15 bg-black/70 p-3 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-1.5">
                  {SESLER.map((s) => {
                    const secili = s.id === aktifSes();
                    return (
                      <button
                        key={s.id}
                        onClick={() => (secili ? sesiDurdur() : sesiCal(s.id))}
                        title={s.aciklama}
                        className={`rounded-xl px-2.5 py-2 text-left text-xs font-bold transition ${
                          secili ? "bg-rehberim-accent text-white" : "text-white/85 hover:bg-white/15"
                        }`}
                      >
                        {s.emoji} {s.ad}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2.5">
                  {aktifSes() ? (
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
                    className="h-1 flex-1 accent-[#F97316]"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tam ekranda: sağ üstte küçük çıkış butonu */}
        {tamEkranda && (
          <button
            onClick={tamEkran}
            aria-label="Tam ekrandan çık"
            className="absolute right-4 top-4 rounded-xl bg-black/30 p-2.5 text-white/60 backdrop-blur-md transition hover:bg-black/50 hover:text-white"
          >
            <Minimize className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}

/* --------------------------- Büyük süre yazısı --------------------------- */

function BuyukSure({ metin, tamEkranda, kucult }: { metin: string; tamEkranda: boolean; kucult?: boolean }) {
  return (
    <p
      className="leading-none text-white [text-shadow:0_4px_28px_rgba(0,0,0,0.55)]"
      style={{
        fontFamily: SAAT_FONT,
        fontSize: tamEkranda
          ? kucult
            ? "clamp(72px, 16vw, 220px)"
            : "clamp(88px, 20vw, 280px)"
          : kucult
            ? "clamp(56px, 11vw, 108px)"
            : "clamp(68px, 13vw, 132px)",
        letterSpacing: "0.02em",
      }}
    >
      {metin}
    </p>
  );
}

/* ------------------------------ Saat ------------------------------ */

const GUNLER = ["PAZAR", "PAZARTESİ", "SALI", "ÇARŞAMBA", "PERŞEMBE", "CUMA", "CUMARTESİ"];
const AYLAR = ["OCAK", "ŞUBAT", "MART", "NİSAN", "MAYIS", "HAZİRAN", "TEMMUZ", "AĞUSTOS", "EYLÜL", "EKİM", "KASIM", "ARALIK"];

function SaatGostergesi({ tamEkranda }: { tamEkranda: boolean }) {
  const simdi = new Date();
  const iki = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <p
        className="leading-none tracking-widest text-white/75 [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]"
        style={{ fontFamily: SAAT_FONT, fontSize: tamEkranda ? "clamp(20px, 3vw, 40px)" : "clamp(15px, 2.6vw, 24px)" }}
      >
        {GUNLER[simdi.getDay()]}
      </p>
      <BuyukSure metin={`${iki(simdi.getHours())}:${iki(simdi.getMinutes())}`} tamEkranda={tamEkranda} />
      <p
        className="mt-1 leading-none tracking-[0.3em] text-white/55"
        style={{ fontFamily: SAAT_FONT, fontSize: tamEkranda ? "clamp(14px, 2vw, 26px)" : "clamp(12px, 1.8vw, 17px)" }}
      >
        {simdi.getDate()} {AYLAR[simdi.getMonth()]} · {iki(simdi.getSeconds())}
      </p>
    </div>
  );
}

/* --------------------------- Geri sayım --------------------------- */

function SayacGostergesi({
  durum,
  ozelDk,
  setOzelDk,
  bitir,
  tamEkranda,
}: {
  durum: OdakDurum | null;
  ozelDk: string;
  setOzelDk: (v: string) => void;
  bitir: () => Promise<void>;
  tamEkranda: boolean;
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
            // Placeholder etiket yerine geçmez → erişilebilir ad eklendi.
            aria-label="Özel süre (dakika)"
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
  const oran = durum.sureSn > 0 ? 1 - kalan / durum.sureSn : 1;
  const duraklatildi = durum.duraklatmaMs !== null;

  return (
    <div className="flex w-full flex-col items-center">
      {durum.bitti ? (
        <div className="text-center">
          <p className="text-5xl">🎉</p>
          <p className="mt-2 text-2xl font-extrabold text-white">Süre doldu!</p>
          <p className="mt-1 text-sm font-semibold text-white/75">{Math.round(durum.sureSn / 60)} dk çalıştın — helal olsun</p>
          <button
            onClick={() => void bitir()}
            className="mt-5 rounded-2xl bg-white px-7 py-2.5 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
          >
            Tamam
          </button>
        </div>
      ) : (
        <>
          <BuyukSure metin={sureBicimle(kalan)} tamEkranda={tamEkranda} />
          {/* İnce ilerleme çizgisi */}
          <div className="mt-4 h-1 w-56 overflow-hidden rounded-full bg-white/20 sm:w-72">
            <div
              className="h-full rounded-full bg-rehberim-accent transition-[width] duration-500 ease-linear"
              style={{ width: `${oran * 100}%` }}
            />
          </div>
          <div className="mt-5 flex items-center gap-2">
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
        </>
      )}
    </div>
  );
}

/* --------------------------- Kronometre --------------------------- */

function KronometreGostergesi({
  durum,
  bitir,
  tamEkranda,
}: {
  durum: OdakDurum | null;
  bitir: () => Promise<void>;
  tamEkranda: boolean;
}) {
  if (!durum) {
    return (
      <div className="flex flex-col items-center">
        <p className="leading-none text-white/35" style={{ fontFamily: SAAT_FONT, fontSize: "clamp(56px, 11vw, 108px)" }}>
          00:00
        </p>
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
      <BuyukSure metin={sureBicimle(gecen)} tamEkranda={tamEkranda} />
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

/* ------------------------------ Pomodoro ------------------------------ */

function PomodoroGostergesi({
  durum,
  bitir,
  tamEkranda,
}: {
  durum: OdakDurum | null;
  bitir: () => Promise<void>;
  tamEkranda: boolean;
}) {
  const [onay, setOnay] = useState(false);
  const [usta, setUsta] = useState(true); // ilk render'da uyarıyı yanlışlıkla gösterme
  useEffect(() => {
    setUsta(pomodoroUstasiMi());
  }, []);
  useEffect(() => setOnay(false), [durum?.baslangicMs]);

  // ---- Başlamadan önce: teknik tanıtımı + (ilk kez ise) uyarı ----
  if (!durum) {
    return (
      <div className="w-full max-w-lg">
        <p className="text-3xl">🍅</p>
        <h2
          className="mt-1 text-xl font-extrabold tracking-widest text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: SAAT_FONT }}
        >
          POMODORO
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/85">
          {POMODORO_CALISMA_DK} dk çalış · {POMODORO_MOLA_DK} dk mola · 4. turdan sonra{" "}
          {POMODORO_UZUN_MOLA_DK} dk uzun mola. Fazları zil sesiyle haber veririm.
        </p>
        <div className="mx-auto mt-3 max-w-md rounded-2xl bg-black/35 px-4 py-3 text-xs font-semibold text-amber-200/95 backdrop-blur-sm">
          ⚠️ Süre <b>hiç durmaz</b> — duraklatma ve molayı uzatma yok.
          {usta
            ? " Çıkış yalnız molalarda açılır."
            : " İlk kullanımın olduğu için bu seferlik istediğin an çıkabilirsin; sonraki kullanımlarda çıkış yalnız molalarda açılır."}
        </div>
        <button
          onClick={() => odakBaslat("pomodoro")}
          className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_24px_rgba(239,68,68,0.5)] transition hover:shadow-[0_0_34px_rgba(239,68,68,0.7)]"
        >
          <Play className="h-4 w-4" /> Pomodoro&apos;yu başlat
        </button>
      </div>
    );
  }

  // ---- Çalışırken ----
  const faz = pomodoroFazi(aktifGecenSn(durum));
  const calismaFazi = faz.tip === "calisma";
  const cikisAcik = !usta || !calismaFazi; // ilk kullanım: her an; usta: yalnız molada

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-extrabold tracking-widest text-white ${
            calismaFazi
              ? "bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_16px_rgba(239,68,68,0.5)]"
              : "bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_0_16px_rgba(16,185,129,0.5)]"
          }`}
          style={{ fontFamily: SAAT_FONT }}
        >
          {calismaFazi ? `ÇALIŞMA · ${faz.tur}. TUR` : faz.uzunMola ? "UZUN MOLA" : "MOLA"}
        </span>
      </div>

      <BuyukSure metin={sureBicimle(faz.fazKalanSn)} tamEkranda={tamEkranda} kucult />

      {/* Tur noktaları */}
      <div className="mt-2 flex items-center gap-2" aria-label={`${faz.tur}. tur`}>
        {[1, 2, 3, 4].map((t) => (
          <span
            key={t}
            className={`h-2.5 w-2.5 rounded-full transition ${
              t < faz.tur || (t === faz.tur && !calismaFazi)
                ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                : t === faz.tur
                  ? "bg-white ring-2 ring-red-300/60"
                  : "bg-white/30"
            }`}
          />
        ))}
        {faz.set > 1 && <span className="ml-1 text-[10px] font-bold text-white/60">{faz.set}. set</span>}
      </div>

      {/* Faz ilerlemesi */}
      <div className="mt-3 h-1 w-56 overflow-hidden rounded-full bg-white/20 sm:w-72">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-linear ${calismaFazi ? "bg-red-400" : "bg-emerald-400"}`}
          style={{ width: `${(1 - faz.fazKalanSn / faz.fazToplamSn) * 100}%` }}
        />
      </div>

      <p className="mt-2 text-xs font-semibold text-white/65">
        Toplam çalışma: {Math.floor(faz.calismaSn / 60)} dk ·{" "}
        {calismaFazi
          ? `sonra ${faz.tur === 4 ? `${POMODORO_UZUN_MOLA_DK} dk uzun mola` : `${POMODORO_MOLA_DK} dk mola`}`
          : `sonra ${POMODORO_CALISMA_DK} dk çalışma`}
      </p>

      <div className="mt-4 flex min-h-[42px] items-center gap-2">
        {cikisAcik ? (
          !onay ? (
            <button
              onClick={() => setOnay(true)}
              className="flex items-center gap-1.5 rounded-2xl bg-black/35 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-black/50"
            >
              <Square className="h-3.5 w-3.5" /> Bitir
            </button>
          ) : (
            <>
              <span className="text-sm font-semibold text-white/85">Emin misin?</span>
              <button
                onClick={() => void bitir()}
                className="rounded-2xl bg-white px-4 py-2 text-sm font-bold text-rehberim-navy transition hover:brightness-95"
              >
                Evet, bitir
              </button>
              <button
                onClick={() => setOnay(false)}
                className="rounded-2xl bg-black/35 px-4 py-2 text-sm font-bold text-white transition hover:bg-black/50"
              >
                Vazgeç
              </button>
            </>
          )
        ) : (
          <p className="rounded-xl bg-black/30 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-sm">
            🔒 Çalışma fazında çıkış yok — molada açılır
          </p>
        )}
      </div>
      {!usta && durum && (
        <p className="mt-1.5 text-[11px] font-medium text-amber-200/80">
          İlk kullanım: bu seferlik istediğin an çıkabilirsin.
        </p>
      )}
    </div>
  );
}
