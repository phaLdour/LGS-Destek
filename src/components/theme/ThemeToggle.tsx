"use client";

/**
 * Tema düğmesi + TEMA SEÇİCİ.
 *
 * Tek tık: açık ↔ koyu aile arasında geçiş (eski davranış korunur).
 * Palet düğmesi: 12 temanın tamamının göründüğü seçici paneli açar
 * (satranç sitelerindeki tahta/taş teması seçicisi gibi).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Moon, Palette, Sun, X } from "lucide-react";
import { TEMALAR, temaBul, type Tema } from "@/lib/temalar";
import { temaAboneOl, temaOku, temaUygula } from "@/lib/tema";

function karsitTema(t: Tema): string {
  // Aynı "ruhtaki" karşı aileye geç: klasik ↔ gece, pembe ↔ mor, ...
  const es: Record<string, string> = {
    klasik: "gece", gece: "klasik",
    pembe: "mor", mor: "pembe",
    lavanta: "mor",
    nane: "orman", orman: "nane",
    deniz: "okyanus", okyanus: "deniz",
    kagit: "gunbatimi", gunbatimi: "kagit",
    komur: "klasik",
  };
  return es[t.id] ?? (t.aile === "koyu" ? "klasik" : "gece");
}

export function ThemeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "menu";
}) {
  const [temaId, setTemaId] = useState<string | null>(null);
  const [panelAcik, setPanelAcik] = useState(false);
  /** Paneli açan düğme — kapanışta odak buraya geri döner (klavye kuralı). */
  const tetikleyiciRef = useRef<HTMLButtonElement>(null);

  // Kimliği sabit: panelin odak/kaydırma etkisi her boyamada yeniden kurulmasın.
  const paneliKapat = useCallback(() => {
    setPanelAcik(false);
    // Odak, paneli açan düğmeye geri döner; klavye kullanıcısı listenin
    // başına savrulmaz.
    tetikleyiciRef.current?.focus();
  }, []);

  useEffect(() => {
    const mevcut = temaOku();
    setTemaId(mevcut);
    // İlk betik zaten uyguladı; yine de tutarlılık için bir kez uygula.
    temaUygula(mevcut);
    return temaAboneOl((t) => setTemaId(t.id));
  }, []);

  if (temaId === null) {
    return (
      <div
        className={
          variant === "menu"
            ? "h-10 w-full rounded-xl bg-rehberim-muted"
            : "h-9 w-9 rounded-lg bg-rehberim-muted"
        }
        aria-hidden="true"
      />
    );
  }

  const tema = temaBul(temaId);
  const koyuMu = tema.aile === "koyu";
  const Icon = koyuMu ? Sun : Moon;
  const etiket = koyuMu ? "Açık tema" : "Koyu tema";

  const gecisYap = () => temaUygula(karsitTema(tema), true);

  return (
    <>
      {variant === "menu" ? (
        <div className="flex w-full items-center gap-1">
          <button
            onClick={gecisYap}
            className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rehberim-navy/70 transition hover:bg-rehberim-muted"
          >
            <Icon className="h-5 w-5" />
            {etiket}
          </button>
          <button
            ref={tetikleyiciRef}
            onClick={() => setPanelAcik(true)}
            aria-label="Tema seç"
            aria-haspopup="dialog"
            aria-expanded={panelAcik}
            title="Tema seç"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-rehberim-navy/70 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <Palette className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={gecisYap}
            aria-label={etiket}
            title={etiket}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-rehberim-navy/70 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <Icon className="h-5 w-5" />
          </button>
          <button
            ref={tetikleyiciRef}
            onClick={() => setPanelAcik(true)}
            aria-label="Tema seç"
            aria-haspopup="dialog"
            aria-expanded={panelAcik}
            title="Tema seç"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-rehberim-navy/70 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <Palette className="h-5 w-5" />
          </button>
        </div>
      )}

      {panelAcik && (
        <TemaSecici
          secili={tema.id}
          kapat={paneliKapat}
          sec={(id) => temaUygula(id, true)}
        />
      )}
    </>
  );
}

/**
 * Tam ekran tema seçici — her tema kendi renkleriyle önizlenir.
 *
 * PORTAL ŞART: bu bileşen mobil üst barın (backdrop-blur'lu <header>) ve
 * mobil çekmecenin içinde çağrılıyor. `backdrop-filter` uygulanmış bir ata,
 * altındaki `position: fixed` çocuklar için "içine hapseden kutu" olur —
 * panel 56px'lik başlığın içine sıkışıyor ve kendi backdrop-blur'ü de sayfayı
 * değil yalnız o kutuyu bulanıklaştırıyordu. document.body'ye taşıyarak
 * hem tam ekran kaplar hem arkası gerçekten bulanıklaşır.
 *
 * KLAVYE (erişilebilirlik): Escape kapatır, açılınca odak panele girer,
 * Tab odağı panelin içinde döndürür (focus trap), kapanınca odak paneli
 * açan düğmeye geri döner.
 */
function TemaSecici({
  secili,
  sec,
  kapat,
}: {
  secili: string;
  sec: (id: string) => void;
  kapat: () => void;
}) {
  const kutuRef = useRef<HTMLDivElement>(null);
  const [bagli, setBagli] = useState(false);

  // Portal yalnız istemcide kurulur (SSR'de document yok).
  useEffect(() => setBagli(true), []);

  useEffect(() => {
    const kutu = kutuRef.current;
    if (!kutu) return;

    // Odaklanabilir öğeler — panel her açıldığında yeniden hesaplanır.
    const odaklanabilirler = () =>
      Array.from(
        kutu.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((e) => !e.hasAttribute("disabled") && e.offsetParent !== null);

    // Açılınca odak panele girsin (seçili tema varsa onun üstüne).
    const ilk =
      kutu.querySelector<HTMLElement>('[aria-pressed="true"]') ??
      odaklanabilirler()[0];
    ilk?.focus();

    const tus = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        kapat();
        return;
      }
      if (e.key !== "Tab") return;
      const liste = odaklanabilirler();
      if (liste.length === 0) return;
      const ilkOge = liste[0];
      const sonOge = liste[liste.length - 1];
      const etkin = document.activeElement as HTMLElement | null;
      // Odak paneli terk edemez: uçlarda başa/sona sarar.
      if (e.shiftKey && (etkin === ilkOge || !kutu.contains(etkin))) {
        e.preventDefault();
        sonOge.focus();
      } else if (!e.shiftKey && (etkin === sonOge || !kutu.contains(etkin))) {
        e.preventDefault();
        ilkOge.focus();
      }
    };

    document.addEventListener("keydown", tus, true);
    // Panel açıkken arka plan kaymasın.
    const eskiTasma = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tus, true);
      document.body.style.overflow = eskiTasma;
    };
  }, [kapat, bagli]);

  const gruplar: { baslik: string; aile: "acik" | "koyu" }[] = [
    { baslik: "Açık temalar", aile: "acik" },
    { baslik: "Koyu temalar", aile: "koyu" },
  ];

  if (!bagli) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-rehberim-navy-dark/60 p-3 backdrop-blur-md sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) kapat();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Tema seç"
    >
      <div
        ref={kutuRef}
        className="max-h-[86vh] w-full max-w-2xl animate-scale-in overflow-y-auto rounded-3xl border border-rehberim-border bg-rehberim-surface p-5 text-rehberim-navy shadow-elevated sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-rehberim-navy">Tema seç</h2>
            <p className="mt-0.5 text-sm text-rehberim-navy/60">
              Sevdiğin renklerle çalış — seçimin bu cihazda hatırlanır.
            </p>
          </div>
          <button
            onClick={kapat}
            aria-label="Kapat"
            className="rounded-lg p-2 text-rehberim-navy/60 transition hover:bg-rehberim-muted hover:text-rehberim-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {gruplar.map((g) => (
          <section key={g.aile} className="mb-5 last:mb-0">
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-rehberim-navy/45">
              {g.baslik}
            </h3>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {TEMALAR.filter((t) => t.aile === g.aile).map((t) => (
                <TemaKarti
                  key={t.id}
                  tema={t}
                  seciliMi={t.id === secili}
                  sec={() => sec(t.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>,
    document.body,
  );
}

/** Tek tema kartı: temanın kendi renkleriyle küçük bir sayfa önizlemesi. */
function TemaKarti({
  tema,
  seciliMi,
  sec,
}: {
  tema: Tema;
  seciliMi: boolean;
  sec: () => void;
}) {
  const r = tema.renkler;
  return (
    <button
      onClick={sec}
      aria-pressed={seciliMi}
      className={`group overflow-hidden rounded-2xl border-2 text-left transition ${
        seciliMi
          ? "border-rehberim-accent shadow-ring-accent"
          : "border-rehberim-border hover:border-rehberim-navy/30"
      }`}
    >
      {/* Önizleme: küçük bir sayfa maketi, temanın gerçek renkleriyle */}
      <span className="block p-2.5" style={{ background: r.bg }}>
        <span
          className="mb-1.5 flex items-center gap-1.5 rounded-lg px-2 py-1.5"
          style={{ background: r.navy }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: r.accent }}
          />
          <span
            className="inline-block h-1.5 w-10 rounded-full"
            style={{ background: "rgba(255,255,255,0.75)" }}
          />
        </span>
        <span
          className="block rounded-lg p-2"
          style={{ background: r.surface, border: `1px solid ${r.border}` }}
        >
          <span
            className="mb-1 block h-1.5 w-3/4 rounded-full"
            style={{ background: r.text }}
          />
          <span
            className="mb-1.5 block h-1.5 w-1/2 rounded-full"
            style={{ background: r.textSoft }}
          />
          <span
            className="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold"
            style={{ background: r.accent, color: r.onAccent }}
          >
            Aa
          </span>
        </span>
      </span>
      <span className="flex items-center gap-1.5 bg-rehberim-surface px-2.5 py-2">
        <span aria-hidden>{tema.emoji}</span>
        <span className="truncate text-xs font-bold text-rehberim-navy">
          {tema.ad}
        </span>
        {seciliMi && (
          <Check className="ml-auto h-4 w-4 shrink-0 text-rehberim-accent-deep" />
        )}
      </span>
    </button>
  );
}
