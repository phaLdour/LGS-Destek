import { AlertTriangle, Check, X } from "lucide-react";
import type { LgsTip } from "@/content/types";

export function LgsTips({ tips }: { tips: LgsTip[] }) {
  return (
    <div className="space-y-3">
      {tips.map((tip, i) => (
        <div
          key={i}
          className="rounded-2xl border border-rehberim-border bg-white p-4 shadow-card"
        >
          <p className="mb-3 flex items-start gap-2 text-sm font-semibold text-rehberim-navy">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            {tip.trap}
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <p className="text-sm text-red-700">
                <span className="font-bold">Yanıltıcı:</span> {tip.wrong}
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <p className="text-sm text-green-800">
                <span className="font-bold">Doğru:</span> {tip.correct}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
