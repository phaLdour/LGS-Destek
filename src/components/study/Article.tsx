import {
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  ListChecks,
  Sigma,
  Sparkles,
} from "lucide-react";

/**
 * Zengin konu anlatımı gösterimi. Desteklenen söz dizimi:
 *   # Ana başlık
 *   ## Yan başlık
 *   - Madde
 *   [formül] ... / [örnek] ... / [tuzak] ... / [ipucu] ... / [soru] ... / [istisna] ... / [kural] ...
 *   **kalın**
 * Boş satır paragrafları ayırır.
 */

const CALLOUTS: Record<
  string,
  { label: string; box: string; icon: typeof Sigma; iconColor: string }
> = {
  formul: { label: "Formül", box: "border-blue-200 bg-blue-50", icon: Sigma, iconColor: "text-blue-600" },
  ornek: { label: "Örnek", box: "border-green-200 bg-green-50", icon: Sparkles, iconColor: "text-green-600" },
  tuzak: { label: "Tuzak", box: "border-red-200 bg-red-50", icon: AlertTriangle, iconColor: "text-red-500" },
  ipucu: { label: "İpucu", box: "border-amber-200 bg-amber-50", icon: Lightbulb, iconColor: "text-amber-500" },
  soru: { label: "Soru Tarzı", box: "border-purple-200 bg-purple-50", icon: HelpCircle, iconColor: "text-purple-600" },
  istisna: { label: "İstisna", box: "border-amber-200 bg-amber-50", icon: AlertCircle, iconColor: "text-amber-600" },
  kural: { label: "Kural", box: "border-indigo-200 bg-indigo-50", icon: ListChecks, iconColor: "text-indigo-600" },
  tanim: { label: "Tanım", box: "border-rehberim-border bg-rehberim-muted", icon: ListChecks, iconColor: "text-rehberim-navy" },
};

const CALLOUT_ALIASES: Record<string, string> = {
  formül: "formul",
  formul: "formul",
  örnek: "ornek",
  ornek: "ornek",
  tuzak: "tuzak",
  ipucu: "ipucu",
  ipuçu: "ipucu",
  soru: "soru",
  istisna: "istisna",
  kural: "kural",
  tanım: "tanim",
  tanim: "tanim",
};

function renderInline(text: string, keyPrefix: string) {
  // **kalın** parçalarını ayır
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-bold text-rehberim-navy">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{p}</span>;
  });
}

type Block =
  | { type: "h1" | "h2" | "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; kind: string; text: string };

function parse(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }
    const callout = line.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (line.startsWith("# ")) {
      flushAll();
      blocks.push({ type: "h1", text: line.slice(2) });
    } else if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
    } else if (callout) {
      flushAll();
      const key = CALLOUT_ALIASES[callout[1].toLowerCase().trim()];
      if (key) blocks.push({ type: "callout", kind: key, text: callout[2] });
      else para.push(line);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushAll();
  return blocks;
}

export function Article({ text }: { text: string }) {
  const blocks = parse(text);

  return (
    <article className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "h1") {
          return (
            <h3
              key={i}
              className="mt-2 border-l-4 border-rehberim-accent pl-3 text-xl font-extrabold text-rehberim-navy"
            >
              {renderInline(b.text, `h1-${i}`)}
            </h3>
          );
        }
        if (b.type === "h2") {
          return (
            <h4 key={i} className="text-base font-bold text-rehberim-accent-dark">
              {renderInline(b.text, `h2-${i}`)}
            </h4>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2 text-rehberim-navy/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rehberim-accent" />
                  <span className="leading-relaxed">{renderInline(it, `ul-${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "callout") {
          const c = CALLOUTS[b.kind];
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`flex gap-3 rounded-xl border px-4 py-3 ${c.box}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.iconColor}`} />
              <p className="text-sm leading-relaxed text-rehberim-navy/85">
                <span className="font-bold text-rehberim-navy">{c.label}: </span>
                {renderInline(b.text, `co-${i}`)}
              </p>
            </div>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-rehberim-navy/80">
            {renderInline(b.text, `p-${i}`)}
          </p>
        );
      })}
    </article>
  );
}
