/**
 * Odak Modu — ortam sesi motoru.
 *
 * Bütün sesler tarayıcıda Web Audio ile anlık sentezlenir: ses dosyası yok,
 * indirme yok, telif yok, site ağırlaşmaz — ve hiçbir ses "loop" olmadığı
 * için (olaylar rastgele zamanlanır) kulak döngüyü fark etmez.
 *
 * Modül singleton'ı: AudioContext sayfa geçişlerinde yaşamaya devam eder,
 * yani öğrenci sayacı açıp başka bölüme geçse de ses kesilmez.
 */

export type OdakSesi = {
  id: string;
  ad: string;
  emoji: string;
  aciklama: string;
};

export const SESLER: OdakSesi[] = [
  { id: "yagmur", ad: "Yağmur", emoji: "🌧️", aciklama: "Cama vuran sakin yağmur" },
  { id: "selale", ad: "Şelale", emoji: "💦", aciklama: "Kesintisiz su uğultusu" },
  { id: "dalga", ad: "Deniz", emoji: "🌊", aciklama: "Kıyıya vuran dalgalar" },
  { id: "kus", ad: "Kuş Sesleri", emoji: "🐦", aciklama: "Sabah ormanı cıvıltısı" },
  { id: "somine", ad: "Şömine", emoji: "🔥", aciklama: "Çıtırdayan odun ateşi" },
  { id: "kutuphane", ad: "Kütüphane", emoji: "📚", aciklama: "Saat tıkırtısı, sayfa hışırtısı" },
  { id: "sinav", ad: "Sınav Ortamı", emoji: "✏️", aciklama: "Kalem cızırtısı, sayfa sesi — sınav provası" },
  { id: "beyaz", ad: "Beyaz Gürültü", emoji: "🌫️", aciklama: "Dikkat dağıtıcıları örten düz fon" },
];

const SEVIYE_KEY = "rehberim:odak-ses-seviye";

/* --------------------------- Motor durumu --------------------------- */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let aktif: string | null = null;
let temizleyici: (() => void) | null = null;
let seviyeDeger: number | null = null;

const dinleyiciler = new Set<() => void>();

function haberVer() {
  dinleyiciler.forEach((fn) => {
    try {
      fn();
    } catch {
      /* yut */
    }
  });
}

export function sesAboneOl(fn: () => void): () => void {
  dinleyiciler.add(fn);
  return () => dinleyiciler.delete(fn);
}

export function aktifSes(): string | null {
  return aktif;
}

export function sesSeviyesi(): number {
  if (seviyeDeger !== null) return seviyeDeger;
  try {
    const ham = window.localStorage.getItem(SEVIYE_KEY);
    const v = ham === null ? NaN : Number(ham);
    seviyeDeger = Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.6;
  } catch {
    seviyeDeger = 0.6;
  }
  return seviyeDeger;
}

export function sesSeviyesiAyarla(v: number) {
  seviyeDeger = Math.min(1, Math.max(0, v));
  try {
    window.localStorage.setItem(SEVIYE_KEY, String(seviyeDeger));
  } catch {
    /* yut */
  }
  if (ctx && master) {
    master.gain.setTargetAtTime(seviyeDeger, ctx.currentTime, 0.05);
  }
  haberVer();
}

function motoruHazirla(): { ctx: AudioContext; master: GainNode } | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    type PencereAC = Window & { webkitAudioContext?: typeof AudioContext };
    const AC = window.AudioContext ?? (window as PencereAC).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = sesSeviyesi();
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return { ctx, master: master! };
}

/** Aktif ortam sesini durdurur (0.4 sn yumuşak iniş). */
export function sesiDurdur() {
  if (temizleyici) {
    temizleyici();
    temizleyici = null;
  }
  aktif = null;
  haberVer();
}

/**
 * Ortam sesini başlatır (öncekini kapatır). Kullanıcı jesti içinden
 * çağrılmalıdır (tarayıcı otomatik çalmayı engeller).
 */
export function sesiCal(id: string) {
  const motor = motoruHazirla();
  if (!motor) return;
  sesiDurdur();
  const kur = SES_KURUCULAR[id];
  if (!kur) return;

  // Ses başına yumuşak giriş/çıkış sarmalayıcısı
  const cikis = motor.ctx.createGain();
  cikis.gain.setValueAtTime(0, motor.ctx.currentTime);
  cikis.gain.linearRampToValueAtTime(1, motor.ctx.currentTime + 0.6);
  cikis.connect(motor.master);

  const durdur = kur(motor.ctx, cikis);
  temizleyici = () => {
    const t = motor.ctx.currentTime;
    cikis.gain.cancelScheduledValues(t);
    cikis.gain.setValueAtTime(cikis.gain.value, t);
    cikis.gain.linearRampToValueAtTime(0, t + 0.4);
    window.setTimeout(() => {
      durdur();
      cikis.disconnect();
    }, 450);
  };
  aktif = id;
  haberVer();
}

/* --------------------------- Ortak yapı taşları --------------------------- */

type Kurucu = (ctx: AudioContext, out: GainNode) => () => void;

const gurultuOnbellek = new Map<string, AudioBuffer>();

/** 4 sn'lik üretilmiş gürültü tamponu (beyaz / pembe / kahverengi). */
function gurultuTamponu(ctx: AudioContext, tip: "beyaz" | "pembe" | "kahve"): AudioBuffer {
  const k = `${tip}:${ctx.sampleRate}`;
  const hazir = gurultuOnbellek.get(k);
  if (hazir) return hazir;
  const n = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  if (tip === "beyaz") {
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  } else if (tip === "pembe") {
    // Voss-McCartney yaklaşıklaması
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  } else {
    let son = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      son = (son + 0.02 * w) / 1.02;
      d[i] = son * 3.5;
    }
  }
  gurultuOnbellek.set(k, buf);
  return buf;
}

/** Döngülü gürültü kaynağı: kaynak + kendi kazancı. */
function gurultuKaynagi(
  ctx: AudioContext,
  tip: "beyaz" | "pembe" | "kahve",
): { src: AudioBufferSourceNode; kazanc: GainNode } {
  const src = ctx.createBufferSource();
  src.buffer = gurultuTamponu(ctx, tip);
  src.loop = true;
  const kazanc = ctx.createGain();
  src.connect(kazanc);
  src.start();
  return { src, kazanc };
}

function filtre(ctx: AudioContext, tip: BiquadFilterType, frekans: number, q = 0.7): BiquadFilterNode {
  const f = ctx.createBiquadFilter();
  f.type = tip;
  f.frequency.value = frekans;
  f.Q.value = q;
  return f;
}

function rastgele(min: number, maks: number): number {
  return min + Math.random() * (maks - min);
}

/**
 * Rastgele aralıklarla olay zamanlayan yardımcı.
 * setTimeout kimliklerini toplar; temizleyicide hepsi iptal edilir.
 */
function olayDongusu(
  aralikMinMs: number,
  aralikMaksMs: number,
  olay: () => void,
): () => void {
  let durdu = false;
  let zamanlayici = 0;
  const kur = () => {
    zamanlayici = window.setTimeout(() => {
      if (durdu) return;
      try {
        olay();
      } catch {
        /* tek olayın hatası döngüyü kırmasın */
      }
      kur();
    }, rastgele(aralikMinMs, aralikMaksMs));
  };
  kur();
  return () => {
    durdu = true;
    window.clearTimeout(zamanlayici);
  };
}

/** Kısa gürültü patlaması (sayfa hışırtısı, çıtırtı, cızırtı için temel). */
function gurultuPatlamasi(
  ctx: AudioContext,
  out: AudioNode,
  ayar: {
    tip?: "beyaz" | "pembe" | "kahve";
    filtreTip?: BiquadFilterType;
    frekans: number;
    q?: number;
    sureSn: number;
    tepe: number;
    atakSn?: number;
    pan?: number;
  },
) {
  const src = ctx.createBufferSource();
  src.buffer = gurultuTamponu(ctx, ayar.tip ?? "beyaz");
  // Tampon içinde rastgele bir yerden başla ki her patlama farklı olsun
  const f = filtre(ctx, ayar.filtreTip ?? "bandpass", ayar.frekans, ayar.q ?? 1.2);
  const g = ctx.createGain();
  const t = ctx.currentTime;
  const atak = ayar.atakSn ?? 0.01;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(ayar.tepe, t + atak);
  g.gain.exponentialRampToValueAtTime(0.0001, t + ayar.sureSn);
  let son: AudioNode = g;
  if (ayar.pan !== undefined && typeof ctx.createStereoPanner === "function") {
    const p = ctx.createStereoPanner();
    p.pan.value = ayar.pan;
    g.connect(p);
    son = p;
  }
  src.connect(f);
  f.connect(g);
  son.connect(out);
  src.start(t, Math.random() * 2, ayar.sureSn + 0.1);
  src.onended = () => {
    src.disconnect();
    f.disconnect();
    g.disconnect();
  };
}

/* ------------------------------- Sesler ------------------------------- */

const SES_KURUCULAR: Record<string, Kurucu> = {
  /** Yağmur: yıkanmış pembe gürültü + tiz çisenti + cama vuran damlalar */
  yagmur(ctx, out) {
    const govde = gurultuKaynagi(ctx, "pembe");
    const bant = filtre(ctx, "bandpass", 800, 0.5);
    govde.src.disconnect();
    govde.src.connect(bant);
    bant.connect(govde.kazanc);
    govde.kazanc.gain.value = 0.5;
    govde.kazanc.connect(out);

    const cisenti = gurultuKaynagi(ctx, "beyaz");
    const tiz = filtre(ctx, "highpass", 3500, 0.6);
    cisenti.src.disconnect();
    cisenti.src.connect(tiz);
    tiz.connect(cisenti.kazanc);
    cisenti.kazanc.gain.value = 0.05;
    cisenti.kazanc.connect(out);

    // Yağmurun "dalgalanması": şiddet 8-15 sn'de bir hafifçe değişir
    const dalgalanma = olayDongusu(8000, 15000, () => {
      const hedef = rastgele(0.38, 0.6);
      govde.kazanc.gain.setTargetAtTime(hedef, ctx.currentTime, 3);
    });

    // Cama vuran tek damlalar: kısa, tok "tıp" sesleri
    const damlalar = olayDongusu(400, 2600, () => {
      gurultuPatlamasi(ctx, out, {
        frekans: rastgele(1200, 2400),
        q: 6,
        sureSn: rastgele(0.02, 0.05),
        tepe: rastgele(0.04, 0.12),
        pan: rastgele(-0.8, 0.8),
      });
    });

    return () => {
      dalgalanma();
      damlalar();
      govde.src.stop();
      cisenti.src.stop();
    };
  },

  /** Şelale: kalın kahverengi taban + geniş beyaz köpük, çok hafif nefes alır */
  selale(ctx, out) {
    const taban = gurultuKaynagi(ctx, "kahve");
    const tabanF = filtre(ctx, "lowpass", 600, 0.4);
    taban.src.disconnect();
    taban.src.connect(tabanF);
    tabanF.connect(taban.kazanc);
    taban.kazanc.gain.value = 0.55;
    taban.kazanc.connect(out);

    const kopuk = gurultuKaynagi(ctx, "beyaz");
    const kopukF = filtre(ctx, "lowpass", 4500, 0.3);
    kopuk.src.disconnect();
    kopuk.src.connect(kopukF);
    kopukF.connect(kopuk.kazanc);
    kopuk.kazanc.gain.value = 0.16;
    kopuk.kazanc.connect(out);

    // Çok yavaş nefes: 0.08 Hz LFO köpüğü %10 oynatır
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoKazanc = ctx.createGain();
    lfoKazanc.gain.value = 0.015;
    lfo.connect(lfoKazanc);
    lfoKazanc.connect(kopuk.kazanc.gain);
    lfo.start();

    return () => {
      taban.src.stop();
      kopuk.src.stop();
      lfo.stop();
    };
  },

  /** Deniz: uzun süpürme dalgaları — kabarır, kırılır, köpükle çekilir */
  dalga(ctx, out) {
    const fon = gurultuKaynagi(ctx, "pembe");
    const fonF = filtre(ctx, "lowpass", 500, 0.4);
    fon.src.disconnect();
    fon.src.connect(fonF);
    fonF.connect(fon.kazanc);
    fon.kazanc.gain.value = 0.1;
    fon.kazanc.connect(out);

    // Dalga gövdesi: kazancı elle zamanlanan yıkanmış gürültü
    const dalga = gurultuKaynagi(ctx, "pembe");
    const dalgaF = filtre(ctx, "lowpass", 900, 0.5);
    dalga.src.disconnect();
    dalga.src.connect(dalgaF);
    dalgaF.connect(dalga.kazanc);
    dalga.kazanc.gain.value = 0;
    dalga.kazanc.connect(out);

    // Köpük tıslaması: dalga kırıldıktan hemen sonra parlar
    const kopuk = gurultuKaynagi(ctx, "beyaz");
    const kopukF = filtre(ctx, "highpass", 2000, 0.5);
    kopuk.src.disconnect();
    kopuk.src.connect(kopukF);
    kopukF.connect(kopuk.kazanc);
    kopuk.kazanc.gain.value = 0;
    kopuk.kazanc.connect(out);

    let durdu = false;
    let zamanlayici = 0;
    const birDalga = () => {
      if (durdu) return;
      const t = ctx.currentTime;
      const kabarma = rastgele(2.2, 3.5);
      const cekilme = rastgele(3, 5);
      const g = dalga.kazanc.gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(rastgele(0.35, 0.55), t + kabarma);
      g.linearRampToValueAtTime(0.03, t + kabarma + cekilme);
      const k = kopuk.kazanc.gain;
      k.cancelScheduledValues(t);
      k.setValueAtTime(k.value, t);
      k.setValueAtTime(0.0, t + kabarma * 0.7);
      k.linearRampToValueAtTime(rastgele(0.06, 0.12), t + kabarma + 0.4);
      k.linearRampToValueAtTime(0.0, t + kabarma + cekilme);
      zamanlayici = window.setTimeout(
        birDalga,
        (kabarma + cekilme + rastgele(0.5, 2)) * 1000,
      );
    };
    birDalga();

    return () => {
      durdu = true;
      window.clearTimeout(zamanlayici);
      fon.src.stop();
      dalga.src.stop();
      kopuk.src.stop();
    };
  },

  /** Kuş sesleri: hafif meltem + rastgele türlerde cıvıltı demetleri */
  kus(ctx, out) {
    const meltem = gurultuKaynagi(ctx, "kahve");
    const meltemF = filtre(ctx, "lowpass", 350, 0.4);
    meltem.src.disconnect();
    meltem.src.connect(meltemF);
    meltemF.connect(meltem.kazanc);
    meltem.kazanc.gain.value = 0.07;
    meltem.kazanc.connect(out);

    // Tek ıslık: frekansı kayan sinüs + hızlı zarf
    const islik = (
      basT: number,
      f0: number,
      f1: number,
      sureSn: number,
      tepe: number,
      pan: number,
    ) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f0, basT);
      osc.frequency.exponentialRampToValueAtTime(Math.max(200, f1), basT + sureSn);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, basT);
      g.gain.linearRampToValueAtTime(tepe, basT + sureSn * 0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, basT + sureSn);
      let son: AudioNode = g;
      if (typeof ctx.createStereoPanner === "function") {
        const p = ctx.createStereoPanner();
        p.pan.value = pan;
        g.connect(p);
        son = p;
      }
      osc.connect(g);
      son.connect(out);
      osc.start(basT);
      osc.stop(basT + sureSn + 0.05);
      osc.onended = () => {
        osc.disconnect();
        g.disconnect();
      };
    };

    // Cıvıltı demeti: aynı "kuş" 2-6 hece öter
    const demetler = olayDongusu(1200, 5000, () => {
      const t0 = ctx.currentTime + 0.05;
      const pan = rastgele(-0.9, 0.9);
      const taban = rastgele(2200, 4200);
      const hece = Math.floor(rastgele(2, 7));
      const tepe = rastgele(0.05, 0.14);
      let t = t0;
      for (let i = 0; i < hece; i++) {
        const yon = Math.random() < 0.5 ? 1 : -1;
        const f0 = taban * rastgele(0.9, 1.1);
        const f1 = f0 * (1 + yon * rastgele(0.15, 0.5));
        const sure = rastgele(0.05, 0.14);
        islik(t, f0, f1, sure, tepe * rastgele(0.7, 1), pan);
        t += sure + rastgele(0.03, 0.12);
      }
    });

    return () => {
      demetler();
      meltem.src.stop();
    };
  },

  /** Şömine: alev uğultusu (titrer) + rastgele çıtırtı ve poplar */
  somine(ctx, out) {
    const alev = gurultuKaynagi(ctx, "kahve");
    const alevF = filtre(ctx, "lowpass", 400, 0.5);
    alev.src.disconnect();
    alev.src.connect(alevF);
    alevF.connect(alev.kazanc);
    alev.kazanc.gain.value = 0.4;
    alev.kazanc.connect(out);

    // Alev titremesi: 5-9 Hz düzensiz LFO hissi (iki LFO süperpozisyonu)
    const lfo1 = ctx.createOscillator();
    lfo1.frequency.value = 6.3;
    const lfo1G = ctx.createGain();
    lfo1G.gain.value = 0.05;
    lfo1.connect(lfo1G);
    lfo1G.connect(alev.kazanc.gain);
    lfo1.start();
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.value = 1.7;
    const lfo2G = ctx.createGain();
    lfo2G.gain.value = 0.07;
    lfo2.connect(lfo2G);
    lfo2G.connect(alev.kazanc.gain);
    lfo2.start();

    // Çıtırtılar: kısa, tiz, kuru
    const citirti = olayDongusu(120, 900, () => {
      gurultuPatlamasi(ctx, out, {
        frekans: rastgele(2000, 6000),
        q: 2,
        sureSn: rastgele(0.008, 0.03),
        tepe: rastgele(0.03, 0.16),
        atakSn: 0.002,
        pan: rastgele(-0.5, 0.5),
      });
    });

    // Poplar: daha nadir, daha tok
    const poplar = olayDongusu(2000, 9000, () => {
      gurultuPatlamasi(ctx, out, {
        tip: "pembe",
        filtreTip: "bandpass",
        frekans: rastgele(300, 700),
        q: 3,
        sureSn: rastgele(0.05, 0.1),
        tepe: rastgele(0.1, 0.25),
        atakSn: 0.003,
      });
    });

    return () => {
      citirti();
      poplar();
      alev.src.stop();
      lfo1.stop();
      lfo2.stop();
    };
  },

  /** Kütüphane: derin oda tonu + duvar saati + arada sayfa hışırtısı */
  kutuphane(ctx, out) {
    const oda = gurultuKaynagi(ctx, "kahve");
    const odaF = filtre(ctx, "lowpass", 220, 0.4);
    oda.src.disconnect();
    oda.src.connect(odaF);
    odaF.connect(oda.kazanc);
    oda.kazanc.gain.value = 0.16;
    oda.kazanc.connect(out);

    // Duvar saati: saniyede bir yumuşak tık (tik ve tak hafif farklı)
    let tikMi = true;
    const saat = window.setInterval(() => {
      gurultuPatlamasi(ctx, out, {
        frekans: tikMi ? 2100 : 1700,
        q: 9,
        sureSn: 0.025,
        tepe: 0.045,
        atakSn: 0.001,
        pan: 0.35,
      });
      tikMi = !tikMi;
    }, 1000);

    // Sayfa çevirme: 15-45 sn'de bir, iki aşamalı hışırtı
    const sayfalar = olayDongusu(15000, 45000, () => {
      const pan = rastgele(-0.7, 0.7);
      gurultuPatlamasi(ctx, out, {
        frekans: rastgele(1200, 2200),
        q: 0.8,
        sureSn: rastgele(0.15, 0.3),
        tepe: rastgele(0.05, 0.1),
        atakSn: 0.04,
        pan,
      });
      window.setTimeout(() => {
        gurultuPatlamasi(ctx, out, {
          frekans: rastgele(1500, 2600),
          q: 0.8,
          sureSn: rastgele(0.08, 0.15),
          tepe: rastgele(0.03, 0.07),
          atakSn: 0.02,
          pan,
        });
      }, rastgele(180, 350));
    });

    return () => {
      window.clearInterval(saat);
      sayfalar();
      oda.src.stop();
    };
  },

  /**
   * Sınav ortamı: gerçek sınava alışmak için — sessiz salon, birçok
   * öğrencinin kalem cızırtısı, sayfa sesleri, arada öksürük/burun çekme.
   */
  sinav(ctx, out) {
    const salon = gurultuKaynagi(ctx, "kahve");
    const salonF = filtre(ctx, "lowpass", 200, 0.4);
    salon.src.disconnect();
    salon.src.connect(salonF);
    salonF.connect(salon.kazanc);
    salon.kazanc.gain.value = 0.12;
    salon.kazanc.connect(out);

    // Kalem cızırtısı: 2-6 kısa vuruşluk "yazma" demetleri (bir öğrenci yazar)
    const yazmalar = olayDongusu(350, 1600, () => {
      const pan = rastgele(-0.9, 0.9);
      const vurus = Math.floor(rastgele(2, 7));
      const tepe = rastgele(0.02, 0.06);
      let gecikme = 0;
      for (let i = 0; i < vurus; i++) {
        window.setTimeout(() => {
          gurultuPatlamasi(ctx, out, {
            frekans: rastgele(2500, 4500),
            q: 1.5,
            sureSn: rastgele(0.05, 0.16),
            tepe: tepe * rastgele(0.6, 1),
            atakSn: 0.015,
            pan,
          });
        }, gecikme);
        gecikme += rastgele(90, 260);
      }
    });

    // Sayfa çevirme: sınavda sık duyulur
    const sayfalar = olayDongusu(6000, 18000, () => {
      gurultuPatlamasi(ctx, out, {
        frekans: rastgele(1200, 2400),
        q: 0.8,
        sureSn: rastgele(0.15, 0.28),
        tepe: rastgele(0.05, 0.11),
        atakSn: 0.035,
        pan: rastgele(-0.8, 0.8),
      });
    });

    // Öksürük / burun çekme: nadir, uzak
    const oksuruk = olayDongusu(25000, 70000, () => {
      const pan = rastgele(-0.8, 0.8);
      const t = () =>
        gurultuPatlamasi(ctx, out, {
          tip: "pembe",
          filtreTip: "bandpass",
          frekans: rastgele(350, 650),
          q: 1.2,
          sureSn: rastgele(0.12, 0.2),
          tepe: rastgele(0.06, 0.13),
          atakSn: 0.01,
          pan,
        });
      t();
      if (Math.random() < 0.6) window.setTimeout(t, rastgele(220, 400));
    });

    return () => {
      yazmalar();
      sayfalar();
      oksuruk();
      salon.src.stop();
    };
  },

  /** Beyaz gürültü: hafif yuvarlanmış, kulağı yormayan düz fon */
  beyaz(ctx, out) {
    const g = gurultuKaynagi(ctx, "beyaz");
    const f = filtre(ctx, "lowpass", 6000, 0.3);
    g.src.disconnect();
    g.src.connect(f);
    f.connect(g.kazanc);
    g.kazanc.gain.value = 0.22;
    g.kazanc.connect(out);
    return () => g.src.stop();
  },
};

/* ------------------------------- Ziller ------------------------------- */

/** Sayaç bitiş zili: iki notalı sıcak çan, iki kez. */
export function zilCal() {
  const motor = motoruHazirla();
  if (!motor) return;
  const { ctx: c, master: m } = motor;
  const nota = (t: number, hz: number, tepe: number, sureSn: number) => {
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = hz;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(tepe, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + sureSn);
    osc.connect(g);
    g.connect(m);
    osc.start(t);
    osc.stop(t + sureSn + 0.05);
    osc.onended = () => {
      osc.disconnect();
      g.disconnect();
    };
  };
  const t0 = c.currentTime + 0.02;
  for (const gecikme of [0, 1.1]) {
    nota(t0 + gecikme, 880, 0.25, 1.4);
    nota(t0 + gecikme, 1318.5, 0.12, 1.1);
    nota(t0 + gecikme + 0.015, 2637, 0.05, 0.5);
  }
}

/** Pomodoro faz geçişi: tek, kısa ve nazik "ding". */
export function fazZili(molaMi: boolean) {
  const motor = motoruHazirla();
  if (!motor) return;
  const { ctx: c, master: m } = motor;
  const osc = c.createOscillator();
  osc.type = "sine";
  osc.frequency.value = molaMi ? 659.3 : 880;
  const g = c.createGain();
  const t = c.currentTime + 0.02;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.2, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
  osc.connect(g);
  g.connect(m);
  osc.start(t);
  osc.stop(t + 1);
  osc.onended = () => {
    osc.disconnect();
    g.disconnect();
  };
}
