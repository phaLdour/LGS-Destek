"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { MindMap as MindMapData } from "@/content/types";

export function MindMap({ data }: { data: MindMapData }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
      <div className="grid items-start gap-4 sm:grid-cols-[auto_1fr]">
        {/* merkez */}
        <div className="flex justify-center pt-1 sm:justify-start">
          <div className="rounded-2xl bg-gradient-to-br from-rehberim-navy to-rehberim-navy-dark px-5 py-4 text-center text-base font-extrabold text-white shadow-soft">
            {data.center}
          </div>
        </div>

        {/* dallar */}
        <ul className="space-y-2.5">
          {data.branches.map((b, i) => {
            const expandable = Boolean(b.detail);
            const isOpen = open === i;
            return (
              <li key={b.label} className="flex items-start gap-2.5">
                <span className="mt-5 hidden h-px w-5 shrink-0 bg-rehberim-accent/50 sm:block" />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      expandable && setOpen((o) => (o === i ? null : i))
                    }
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition ${
                      isOpen
                        ? "border-rehberim-accent bg-rehberim-accent/10"
                        : "border-rehberim-border bg-rehberim-muted hover:border-rehberim-accent/40"
                    } ${expandable ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <span className="text-sm font-semibold text-rehberim-navy">
                      {b.label}
                    </span>
                    {expandable && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rehberim-navy text-white">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    )}
                  </button>
                  {expandable && isOpen && (
                    <p className="mt-2 rounded-xl border border-rehberim-border bg-white px-4 py-3 text-sm leading-relaxed text-rehberim-navy/80">
                      {b.detail}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
