import { ChevronRight } from "lucide-react";
import type { MindMap as MindMapData } from "@/content/types";

export function MindMap({ data }: { data: MindMapData }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="grid items-center gap-4 sm:grid-cols-[auto_1fr]">
        {/* merkez */}
        <div className="flex justify-center sm:justify-start">
          <div className="rounded-2xl bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark px-5 py-4 text-center text-base font-extrabold text-white shadow-soft">
            {data.center}
          </div>
        </div>

        {/* dallar */}
        <ul className="space-y-2.5">
          {data.branches.map((b) => (
            <li key={b} className="flex items-center gap-2.5">
              <span className="hidden h-px w-5 bg-rehberim-accent/50 sm:block" />
              <div className="flex flex-1 items-center justify-between gap-3 rounded-xl border border-rehberim-border bg-rehberim-muted px-4 py-2.5">
                <span className="text-sm font-semibold text-rehberim-navy">
                  {b}
                </span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rehberim-navy text-white">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
