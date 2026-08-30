"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import { hataBildir } from "@/lib/hataBildir";

/**
 * Bir sayfa çöktüğünde görünen ekran.
 *
 * Next.js bu bileşeni yalnız istemci tarafındaki bir hata sayfayı
 * kırdığında gösterir. İki işi var: öğrenciye ne olduğunu kibarca
 * söylemek ve hatayı bize BİLDİRMEK — eskiden ikincisi yoktu, öğrenci
 * boş ekran görüyor, bizim haberimiz olmuyordu.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    hataBildir(error, error.digest ? `digest:${error.digest}` : "sayfa");
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-extrabold text-rehberim-navy">
        Bir şeyler ters gitti
      </h1>
      <p className="mt-2 text-sm leading-snug text-rehberim-navy/60">
        Bu sayfa açılırken bir hata oluştu. Sorun bize bildirildi; sen
        yeniden deneyebilir ya da anasayfaya dönebilirsin.
      </p>

      <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rehberim-navy-light active:scale-95"
        >
          <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
          Yeniden dene
        </button>
        <Link
          href="/dashboard"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rehberim-border bg-rehberim-surface px-4 py-2.5 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
        >
          <Home className="h-4 w-4" strokeWidth={2.4} />
          Anasayfa
        </Link>
      </div>
    </div>
  );
}
