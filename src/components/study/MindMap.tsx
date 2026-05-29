"use client";

import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Sigma,
  Sparkles,
} from "lucide-react";
import type {
  MindMap as MindMapData,
  MindMapSectionKind,
} from "@/content/types";

const KIND_STYLE: Record<
  MindMapSectionKind,
  { label: string; chip: string; panel: string; icon: typeof BookOpen }
> = {
  tanim: {
    label: "Tanım",
    chip: "border-rehberim-border bg-white text-rehberim-navy",
    panel: "border-rehberim-border bg-white text-rehberim-navy/80",
    icon: BookOpen,
  },
  kural: {
    label: "Kural",
    chip: "border-indigo-200 bg-indigo-50 text-indigo-700",
    panel: "border-indigo-200 bg-indigo-50/60 text-indigo-900",
    icon: ListChecks,
  },
  formul: {
    label: "Formül",
    chip: "border-blue-200 bg-blue-50 text-blue-700",
    panel: "border-blue-200 bg-blue-50/60 text-blue-900",
    icon: Sigma,
  },
  ornek: {
    label: "Örnek",
    chip: "border-green-200 bg-green-50 text-green-700",
    panel: "border-green-200 bg-green-50/60 text-green-900",
    icon: Sparkles,
  },
  tuzak: {
    label: "Tuzak",
    chip: "border-red-200 bg-red-50 text-red-600",
    panel: "border-red-200 bg-red-50/60 text-red-900",
    icon: AlertTriangle,
  },
  istisna: {
    label: "İstisna",
    chip: "border-amber-200 bg-amber-50 text-amber-700",
    panel: "border-amber-200 bg-amber-50/60 text-amber-900",
    icon: AlertCircle,
  },
  ipucu: {
    label: "İpucu",
    chip: "border-rehberim-accent/30 bg-rehberim-accent/10 text-rehberim-accent-dark",
    panel: "border-rehberim-accent/30 bg-rehberim-accent/5 text-rehberim-navy/80",
    icon: Lightbulb,
  },
  soru: {
    label: "Soru Tarzı",
    chip: "border-purple-200 bg-purple-50 text-purple-700",
    panel: "border-purple-200 bg-purple-50/60 text-purple-900",
    icon: HelpCircle,
  },
};

export function MindMap({ data }: { data: MindMapData }) {
  const [openBranch, setOpenBranch] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

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
            const hasSections = Boolean(b.sections?.length);
            const expandable = hasSections || Boolean(b.detail);
            const isOpen = openBranch === i;
            return (
              <li key={b.label} className="flex items-start gap-2.5">
                <span className="mt-5 hidden h-px w-5 shrink-0 bg-rehberim-accent/50 sm:block" />
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenSection(null);
                      setOpenBranch((o) => (o === i ? null : i));
                    }}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left transition ${
                      isOpen
                        ? "border-rehberim-accent bg-rehberim-accent/10"
                        : "border-rehberim-border bg-rehberim-muted hover:border-rehberim-accent/40"
                    } ${expandable ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <span className="text-sm font-bold text-rehberim-navy">
                      {b.label}
                    </span>
                    {expandable && (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rehberim-navy text-white">
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
                        />
                      </span>
                    )}
                  </button>

                  {isOpen && hasSections && (
                    <div className="mt-2 space-y-2">
                      {/* kategori çipleri */}
                      <div className="flex flex-wrap gap-2">
                        {b.sections!.map((s, j) => {
                          const st = KIND_STYLE[s.kind];
                          const Icon = st.icon;
                          const key = `${i}-${j}`;
                          const active = openSection === key;
                          return (
                            <button
                              key={key}
                              onClick={() =>
                                setOpenSection((o) => (o === key ? null : key))
                              }
                              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition ${st.chip} ${
                                active ? "ring-2 ring-rehberim-accent/30" : ""
                              }`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {s.title || st.label}
                            </button>
                          );
                        })}
                      </div>
                      {/* açık kategori içeriği */}
                      {b.sections!.map((s, j) => {
                        const key = `${i}-${j}`;
                        if (openSection !== key) return null;
                        const st = KIND_STYLE[s.kind];
                        return (
                          <p
                            key={key}
                            className={`whitespace-pre-wrap rounded-xl border px-4 py-3 text-sm leading-relaxed ${st.panel}`}
                          >
                            {s.content}
                          </p>
                        );
                      })}
                    </div>
                  )}

                  {isOpen && !hasSections && b.detail && (
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
