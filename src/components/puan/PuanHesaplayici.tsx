"use client";

import { useMemo, useState } from "react";
import { Calculator, Info, RotateCcw, Sparkles } from "lucide-react";
import {
  SUBJECTS,
  calculateScore,
  type SubjectInput,
  type SubjectKey,
} from "@/lib/lgsScore";

type Inputs = Record<SubjectKey, SubjectInput>;

function emptyInputs(): Inputs {
  return SUBJECTS.reduce((acc, s) => {
    acc[s.key] = { correct: 0, wrong: 0, blank: 0 };
    return acc;
  }, {} as Inputs);
}

function fullCorrectInputs(): Inputs {
  return SUBJECTS.reduce((acc, s) => {
    acc[s.key] = { correct: s.questionCount, wrong: 0, blank: 0 };
    return acc;
  }, {} as Inputs);
}

export function PuanHesaplayici() {
  const [inputs, setInputs] = useState<Inputs>(() => emptyInputs());

  const result = useMemo(() => calculateScore(inputs), [inputs]);

  function update(
    key: SubjectKey,
    field: keyof SubjectInput,
    raw: string,
  ) {
    const value = raw === "" ? 0 : Math.max(0, Math.floor(Number(raw)));
    setInputs((cur) => ({
      ...cur,
      [key]: { ...cur[key], [field]: value },
    }));
  }

  function resetAll() {
    setInputs(emptyInputs());
  }

  function fillFullCorrect() {
    setInputs(fullCorrectInputs());
  }

  // Tahmini LGS puanını yumuşat — iki tahminin ortalamasını ana göstergede sun;
  // her ikisi de detayda ayrıca görünür.
  const finalScore =
    (result.estimatedScoreSimple + result.estimatedScoreFormal) / 2;

  return (
    <div className="space-y-5">
      {/* Başlık */}
      <header className="relative overflow-hidden rounded-3xl border border-rehberim-border bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light p-5 text-white shadow-card">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-rehberim-accent/15 blur-3xl"
        />
        <div className="relative flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <Calculator className="h-7 w-7" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">LGS Puan Hesapla</h1>
            <p className="mt-1 text-pretty text-sm text-white/85">
              Her ders için <strong>Doğru / Yanlış / Boş</strong> sayını gir;
              tahmini LGS puanın anında görünür.
            </p>
          </div>
        </div>
      </header>

      {/* Eylem çubuğu */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-3 py-2 text-sm font-bold text-rehberim-navy transition hover:bg-rehberim-muted"
        >
          <RotateCcw className="h-4 w-4" />
          Tümünü Sıfırla
        </button>
        <button
          onClick={fillFullCorrect}
          className="flex items-center gap-1.5 rounded-xl border border-rehberim-accent/40 bg-rehberim-accent/10 px-3 py-2 text-sm font-bold text-rehberim-accent transition hover:bg-rehberim-accent/20"
        >
          <Sparkles className="h-4 w-4" />
          Hepsi Doğru (500)
        </button>
      </div>

      {/* Ders satırları */}
      <div className="space-y-3">
        {SUBJECTS.map((s) => {
          const r = result.subjects.find((x) => x.info.key === s.key)!;
          const total = r.input.correct + r.input.wrong + r.input.blank;
          const overflow = total > s.questionCount;
          const remaining = s.questionCount - total;
          const sectionColor =
            s.section === "sozel"
              ? "border-blue-200 bg-blue-50/50"
              : "border-emerald-200 bg-emerald-50/50";
          return (
            <div
              key={s.key}
              className={`rounded-2xl border ${sectionColor} p-4 shadow-card transition`}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-rehberim-navy">
                    {s.name}
                  </p>
                  <p className="text-xs text-rehberim-navy/55">
                    {s.questionCount} soru · Katsayı:{" "}
                    <span className="font-bold text-rehberim-navy">
                      {s.coefficient}
                    </span>{" "}
                    ·{" "}
                    <span
                      className={
                        s.section === "sozel"
                          ? "text-blue-700"
                          : "text-emerald-700"
                      }
                    >
                      {s.section === "sozel" ? "Sözel" : "Sayısal"}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-rehberim-navy/55">Net</p>
                  <p className="text-lg font-extrabold text-rehberim-accent">
                    {r.net.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <NumberInput
                  label="Doğru"
                  value={r.input.correct}
                  max={s.questionCount}
                  color="green"
                  onChange={(v) => update(s.key, "correct", v)}
                />
                <NumberInput
                  label="Yanlış"
                  value={r.input.wrong}
                  max={s.questionCount - r.input.correct}
                  color="red"
                  onChange={(v) => update(s.key, "wrong", v)}
                />
                <NumberInput
                  label="Boş"
                  value={r.input.blank}
                  max={s.questionCount - r.input.correct - r.input.wrong}
                  color="gray"
                  onChange={(v) => update(s.key, "blank", v)}
                />
              </div>

              {(overflow || remaining > 0) && (
                <p
                  className={`mt-2 text-xs ${
                    overflow ? "text-red-600" : "text-rehberim-navy/45"
                  }`}
                >
                  {overflow
                    ? `Toplam ${total} → ${s.questionCount}'ı aşıyor; fazlası dikkate alınmaz.`
                    : `Kalan ${remaining} soru boş kabul edildi.`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Sonuç kartı */}
      <section className="overflow-hidden rounded-3xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent/10 via-white to-rehberim-accent/5 p-5 shadow-card">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-rehberim-navy/55">
            Tahmini LGS Puanın
          </p>
          <p className="mt-1 text-5xl font-extrabold text-rehberim-navy">
            {finalScore.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-rehberim-navy/55">
            100 (alt sınır) — 500 (üst sınır)
          </p>
          {/* Yatay puan göstergesi */}
          <div className="mx-auto mt-3 max-w-md">
            <div className="relative h-3 rounded-full bg-rehberim-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-green-500 transition-all"
                style={{
                  width: `${((finalScore - 100) / 400) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-rehberim-navy/45">
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-rehberim-border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Sözel Bölüm
            </p>
            <p className="mt-1 text-2xl font-extrabold text-rehberim-navy">
              {result.sozelNet.toFixed(2)}{" "}
              <span className="text-sm font-semibold text-rehberim-navy/45">
                / 50 net
              </span>
            </p>
            <p className="text-xs text-rehberim-navy/55">
              Türkçe + İnkılap + Din + İngilizce
            </p>
          </div>
          <div className="rounded-2xl border border-rehberim-border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Sayısal Bölüm
            </p>
            <p className="mt-1 text-2xl font-extrabold text-rehberim-navy">
              {result.sayisalNet.toFixed(2)}{" "}
              <span className="text-sm font-semibold text-rehberim-navy/45">
                / 40 net
              </span>
            </p>
            <p className="text-xs text-rehberim-navy/55">Matematik + Fen</p>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-rehberim-border bg-white p-4">
            <p className="text-xs font-semibold text-rehberim-navy/55">
              Hızlı tahmin (ağırlıklı net)
            </p>
            <p className="text-xl font-extrabold text-rehberim-navy">
              {result.estimatedScoreSimple.toFixed(1)}
            </p>
            <p className="text-[10px] text-rehberim-navy/45">
              100 + (Σ(ders net × katsayı) / 270) × 400
            </p>
          </div>
          <div className="rounded-2xl border border-rehberim-border bg-white p-4">
            <p className="text-xs font-semibold text-rehberim-navy/55">
              Standart puan tahmini
            </p>
            <p className="text-xl font-extrabold text-rehberim-navy">
              {result.estimatedScoreFormal.toFixed(1)}
            </p>
            <p className="text-[10px] text-rehberim-navy/45">
              MEB yöntemi (ort/ss yaklaşık)
            </p>
          </div>
        </div>
      </section>

      {/* Detaylı dağılım */}
      <section className="rounded-2xl border border-rehberim-border bg-white p-5 shadow-card">
        <h3 className="mb-3 text-base font-extrabold text-rehberim-navy">
          Ders ders dağılım
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-rehberim-border text-xs uppercase tracking-wider text-rehberim-navy/55">
                <th className="py-2 text-left">Ders</th>
                <th className="py-2 text-right">D</th>
                <th className="py-2 text-right">Y</th>
                <th className="py-2 text-right">B</th>
                <th className="py-2 text-right">Net</th>
                <th className="py-2 text-right">Kat.</th>
                <th className="py-2 text-right">Ağ. Net</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((r) => (
                <tr
                  key={r.info.key}
                  className="border-b border-rehberim-border/60 last:border-0"
                >
                  <td className="py-2 font-semibold text-rehberim-navy">
                    {r.info.shortName}
                  </td>
                  <td className="py-2 text-right text-green-600">
                    {r.input.correct}
                  </td>
                  <td className="py-2 text-right text-red-500">
                    {r.input.wrong}
                  </td>
                  <td className="py-2 text-right text-rehberim-navy/55">
                    {r.input.blank}
                  </td>
                  <td className="py-2 text-right font-bold text-rehberim-accent">
                    {r.net.toFixed(2)}
                  </td>
                  <td className="py-2 text-right text-rehberim-navy/70">
                    ×{r.info.coefficient}
                  </td>
                  <td className="py-2 text-right font-bold text-rehberim-navy">
                    {r.weightedNet.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-rehberim-muted/50 font-extrabold">
                <td className="py-2 text-rehberim-navy">Toplam</td>
                <td className="py-2 text-right text-green-600">
                  {result.subjects.reduce((s, r) => s + r.input.correct, 0)}
                </td>
                <td className="py-2 text-right text-red-500">
                  {result.subjects.reduce((s, r) => s + r.input.wrong, 0)}
                </td>
                <td className="py-2 text-right text-rehberim-navy/55">
                  {result.subjects.reduce((s, r) => s + r.input.blank, 0)}
                </td>
                <td className="py-2 text-right text-rehberim-accent">
                  {result.totalNet.toFixed(2)}
                </td>
                <td className="py-2 text-right text-rehberim-navy/55">—</td>
                <td className="py-2 text-right text-rehberim-navy">
                  {result.totalWeightedNet.toFixed(2)} /{" "}
                  {result.maxWeightedNet}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Formül açıklaması */}
      <section className="rounded-2xl border border-rehberim-accent/30 bg-rehberim-accent/5 p-5 text-sm leading-relaxed text-rehberim-navy/80">
        <p className="mb-2 flex items-center gap-1.5 font-extrabold text-rehberim-navy">
          <Info className="h-4 w-4 text-rehberim-accent" />
          LGS puanı nasıl hesaplanır?
        </p>
        <ol className="ml-5 list-decimal space-y-1.5">
          <li>
            Her ders için net hesaplanır:{" "}
            <strong>Net = Doğru − (Yanlış ÷ 3)</strong>. Boş cevap nete etki
            etmez.
          </li>
          <li>
            Her ders bir <strong>ağırlık katsayısı</strong> ile çarpılır:
            <span className="ml-1 text-rehberim-navy/70">
              Türkçe / Matematik / Fen Bilimleri ×4 — İnkılap / Din /
              İngilizce ×1.
            </span>
          </li>
          <li>
            MEB resmi formülünde net önce <strong>standart puana</strong>{" "}
            çevrilir (10×(net−ortalama)/standart_sapma+50), katsayılarla
            çarpılır ve toplamı (TASP) 100-500 ölçeğine yerleştirilir.
          </li>
          <li>
            <strong>Hızlı tahmin</strong> ağırlıklı net oranını kullanır; tam
            doğru = 500, tüm boş = 100 verir.{" "}
            <strong>Standart puan tahmini</strong> ortalama/standart sapma
            değerlerine bakar — gerçek MEB sonucuna daha yakın çıkar ancak o
            yılın ülke geneli istatistiklerine bağlıdır.
          </li>
        </ol>
        <p className="mt-3 text-xs text-rehberim-navy/55">
          Bu sayfada gösterilen değerler <strong>tahmindir</strong>; resmi
          sonuçlar MEB tarafından, sınav sonrası ülke geneli verileriyle
          hesaplanır.
        </p>
      </section>
    </div>
  );
}

function NumberInput({
  label,
  value,
  max,
  color,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  color: "green" | "red" | "gray";
  onChange: (v: string) => void;
}) {
  const colorMap = {
    green: "border-green-200 bg-white text-green-700 focus:border-green-400 focus:ring-green-200",
    red: "border-red-200 bg-white text-red-600 focus:border-red-400 focus:ring-red-200",
    gray: "border-rehberim-border bg-white text-rehberim-navy/70 focus:border-rehberim-navy focus:ring-rehberim-navy/20",
  };
  return (
    <label className="block">
      <span
        className={`mb-1 block text-[10px] font-bold uppercase tracking-wider ${
          color === "green"
            ? "text-green-700"
            : color === "red"
              ? "text-red-600"
              : "text-rehberim-navy/55"
        }`}
      >
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={Math.max(0, max)}
        value={value === 0 ? "" : value}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-3 py-2.5 text-center text-lg font-extrabold outline-none transition focus:ring-2 ${colorMap[color]}`}
      />
    </label>
  );
}
