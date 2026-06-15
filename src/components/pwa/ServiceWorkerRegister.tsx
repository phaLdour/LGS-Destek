"use client";

import { useEffect } from "react";

/**
 * Service worker'ı (yalnız üretimde) kaydeder. SW yalnız değişmez
 * varlıkları (soru görüntüleri + hash'li statikler) önbelleğe alır;
 * dinamik içerik/oturum etkilenmez. Görsel çıktısı yoktur.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // sessizce yoksay — SW kritik değil, yalnız hızlandırma
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
