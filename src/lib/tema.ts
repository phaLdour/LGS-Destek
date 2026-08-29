"use client";

/**
 * Tema uygulayıcı — seçilen temayı belgeye işler ve hatırlar.
 *
 * İki şey yapar:
 *   1. <html data-tema="..."> özniteliğini yazar (renkleri CSS getirir)
 *   2. Koyu ailedeki temalarda <html class="dark"> ekler; sitenin var olan
 *      koyu mod katmanı (globals.css) böylece olduğu gibi çalışmaya devam eder.
 *
 * Depolama cihaz başınadır (localStorage); hesaba bağlı değildir, böylece
 * ortak bilgisayarda başkasının teması sizinkini değiştirmez.
 */

import { TEMALAR, VARSAYILAN_TEMA_ID, temaBul, type Tema } from "@/lib/temalar";

export const TEMA_ANAHTARI = "rehberim:tema";
/** Eski sürümün açık/koyu anahtarı — göç için okunur. */
const ESKI_ANAHTAR = "rehberim:theme";

export function temaOku(): string {
  if (typeof window === "undefined") return VARSAYILAN_TEMA_ID;
  try {
    const kayitli = window.localStorage.getItem(TEMA_ANAHTARI);
    if (kayitli && TEMALAR.some((t) => t.id === kayitli)) return kayitli;
    // Göç: daha önce yalnız "dark"/"light" seçilmişse karşılığını kullan
    const eski = window.localStorage.getItem(ESKI_ANAHTAR);
    if (eski === "dark") return "gece";
    if (eski === "light") return "klasik";
    const sistemKoyu = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return sistemKoyu ? "gece" : VARSAYILAN_TEMA_ID;
  } catch {
    return VARSAYILAN_TEMA_ID;
  }
}

export function temaUygula(id: string, gecisAnimasyonu = false) {
  if (typeof document === "undefined") return;
  const tema = temaBul(id);
  const kok = document.documentElement;

  if (gecisAnimasyonu) {
    kok.classList.add("rb-tema-gecis");
    window.setTimeout(() => kok.classList.remove("rb-tema-gecis"), 320);
  }
  kok.setAttribute("data-tema", tema.id);
  kok.classList.toggle("dark", tema.aile === "koyu");

  // Tarayıcı arayüzü (mobil adres çubuğu) da temayla uyumlu olsun
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", tema.renkler.navy);

  try {
    window.localStorage.setItem(TEMA_ANAHTARI, tema.id);
    // Eski anahtarı da tutarlı bırak (başka bileşenler okuyabilir)
    window.localStorage.setItem(ESKI_ANAHTAR, tema.aile === "koyu" ? "dark" : "light");
  } catch {
    /* gizli sekme — tema yine uygulanır, hatırlanmaz */
  }
  dinleyicilereHaberVer(tema);
}

const dinleyiciler = new Set<(t: Tema) => void>();
function dinleyicilereHaberVer(t: Tema) {
  dinleyiciler.forEach((fn) => {
    try {
      fn(t);
    } catch {
      /* yut */
    }
  });
}
export function temaAboneOl(fn: (t: Tema) => void): () => void {
  dinleyiciler.add(fn);
  return () => dinleyiciler.delete(fn);
}

/**
 * İlk boyamadan ÖNCE <head> içinde çalışacak betik. Tema seçimi kayıtlıysa
 * data-tema/class'ı hemen yazar; böylece yanlış renkle bir kare bile
 * görünmez. (Küçük tutulmalı — kritik yolda.)
 */
export const TEMA_ILK_BETIK = `
(function(){try{
  var T=${JSON.stringify(TEMALAR.map((t) => [t.id, t.aile === "koyu" ? 1 : 0]))};
  var v=localStorage.getItem('${TEMA_ANAHTARI}');
  var b=null;
  for(var i=0;i<T.length;i++){ if(T[i][0]===v){ b=T[i]; break; } }
  if(!b){
    var e=localStorage.getItem('${ESKI_ANAHTAR}');
    var k=e==='dark'||(!e&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);
    b=k?['gece',1]:['${VARSAYILAN_TEMA_ID}',0];
  }
  document.documentElement.setAttribute('data-tema',b[0]);
  if(b[1]) document.documentElement.classList.add('dark');
}catch(e){}})();
`;
