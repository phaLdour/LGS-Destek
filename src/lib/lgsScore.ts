/**
 * LGS puan hesaplama yardımcıları.
 *
 * MEB resmi formülü: Net → standart puan (10×(net−ort)/ss+50) → ağırlıklı SP
 * (×ders katsayısı) → TASP → 100-500 ölçeğine yerleştirme. Bu formül yıl yıl
 * değişen ülke ortalama ve standart sapma verilerine bağlıdır.
 *
 * Burada iki tahmin yöntemi sunulur:
 *
 * 1) "Hızlı tahmin" (basit): Ağırlıklı net oranı.
 *    100 + (Σ(ders_net × katsayı) / 270) × 400
 *    Tam doğru → 500, tüm boş → 100. Mükemmel hesap için iyi.
 *
 * 2) "Resmi tahmin" (yaklaşık MEB formülü): Son yılların yaklaşık ortalama ve
 *    standart sapma değerleriyle standart puan hesaplar. Gerçek MEB sonucuna
 *    daha yakın çıkar ama o yılın istatistiklerine bağlıdır.
 */

export type SubjectKey =
  | "turkce"
  | "matematik"
  | "fen"
  | "inkilap"
  | "din"
  | "ingilizce";

export type SubjectInfo = {
  key: SubjectKey;
  name: string;
  shortName: string;
  questionCount: number;
  coefficient: number; // ders ağırlık katsayısı (Türkçe/Mat/Fen=4, İnk/Din/İng=1)
  /** Son yılların yaklaşık ülke geneli net ortalaması */
  avgNet: number;
  /** Son yılların yaklaşık net standart sapması */
  stdNet: number;
  section: "sozel" | "sayisal";
};

export const SUBJECTS: SubjectInfo[] = [
  {
    key: "turkce",
    name: "Türkçe",
    shortName: "Türkçe",
    questionCount: 20,
    coefficient: 4,
    avgNet: 11.5,
    stdNet: 4.5,
    section: "sozel",
  },
  {
    key: "inkilap",
    name: "T.C. İnkılap Tarihi ve Atatürkçülük",
    shortName: "İnkılap",
    questionCount: 10,
    coefficient: 1,
    avgNet: 4.5,
    stdNet: 2.5,
    section: "sozel",
  },
  {
    key: "din",
    name: "Din Kültürü ve Ahlak Bilgisi",
    shortName: "Din Kültürü",
    questionCount: 10,
    coefficient: 1,
    avgNet: 6.0,
    stdNet: 2.5,
    section: "sozel",
  },
  {
    key: "ingilizce",
    name: "Yabancı Dil (İngilizce)",
    shortName: "İngilizce",
    questionCount: 10,
    coefficient: 1,
    avgNet: 3.5,
    stdNet: 3.0,
    section: "sozel",
  },
  {
    key: "matematik",
    name: "Matematik",
    shortName: "Matematik",
    questionCount: 20,
    coefficient: 4,
    avgNet: 4.5,
    stdNet: 5.0,
    section: "sayisal",
  },
  {
    key: "fen",
    name: "Fen Bilimleri",
    shortName: "Fen Bilimleri",
    questionCount: 20,
    coefficient: 4,
    avgNet: 9.0,
    stdNet: 4.5,
    section: "sayisal",
  },
];

export type SubjectInput = {
  correct: number;
  wrong: number;
  blank: number;
};

export type SubjectResult = {
  info: SubjectInfo;
  input: SubjectInput;
  net: number;
  /** Standart puan: 10*(net-ort)/ss+50 */
  standardScore: number;
  weightedStandardScore: number;
  weightedNet: number;
};

export type ScoreResult = {
  subjects: SubjectResult[];
  /** Toplam ham net */
  totalNet: number;
  /** Toplam ağırlıklı net (basit yöntem için) */
  totalWeightedNet: number;
  /** Maks ağırlıklı net (270) */
  maxWeightedNet: number;
  /** Hızlı tahmin: 100 + (TWN/270)*400 */
  estimatedScoreSimple: number;
  /** Toplam ağırlıklı standart puan (resmi yöntem için) */
  tasp: number;
  /** Resmi tahmin: TASP'i 100-500 aralığına yerleştir */
  estimatedScoreFormal: number;
  /** Sözel net toplamı */
  sozelNet: number;
  /** Sayısal net toplamı */
  sayisalNet: number;
};

/** Yanlış sayısı boş ise 0 say; max ile sınırla. */
function clamp(n: number, max: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}

/** Tek ders için net = D − Y/3 (negatif olamaz). */
export function calcNet(d: number, y: number): number {
  return Math.max(0, d - y / 3);
}

/**
 * Ana hesaplama. Her ders için doğru/yanlış/boş input alır.
 * Eksik inputları 0 sayar; tutarsız değerleri (D+Y+B > soru sayısı) sınırlar.
 */
export function calculateScore(
  inputs: Partial<Record<SubjectKey, SubjectInput>>,
): ScoreResult {
  const subjects: SubjectResult[] = SUBJECTS.map((info) => {
    const raw = inputs[info.key] ?? { correct: 0, wrong: 0, blank: 0 };
    const correct = clamp(Math.floor(raw.correct), info.questionCount);
    const wrongMax = Math.max(0, info.questionCount - correct);
    const wrong = clamp(Math.floor(raw.wrong), wrongMax);
    const blankMax = Math.max(0, info.questionCount - correct - wrong);
    const blank = clamp(Math.floor(raw.blank), blankMax);

    const net = calcNet(correct, wrong);
    // Standart puan: ortalama=50, ss=10 ölçeğine çekilir
    const ss = info.stdNet > 0 ? info.stdNet : 1;
    const standardScore = 10 * ((net - info.avgNet) / ss) + 50;
    const weightedStandardScore = standardScore * info.coefficient;
    const weightedNet = net * info.coefficient;

    return {
      info,
      input: { correct, wrong, blank },
      net,
      standardScore,
      weightedStandardScore,
      weightedNet,
    };
  });

  const totalNet = subjects.reduce((s, r) => s + r.net, 0);
  const totalWeightedNet = subjects.reduce((s, r) => s + r.weightedNet, 0);
  const maxWeightedNet = SUBJECTS.reduce(
    (s, info) => s + info.questionCount * info.coefficient,
    0,
  ); // = 270

  // Hızlı tahmin: ağırlıklı net oranı 100-500'e mapping
  const estimatedScoreSimple =
    100 + (totalWeightedNet / maxWeightedNet) * 400;

  // Resmi tahmin: TASP → 100-500
  // Tüm doğru durumunda TASP üst sınır, tüm yanlış durumunda alt sınır.
  // Bu sınırları analitik olarak hesaplayalım:
  const tasp = subjects.reduce((s, r) => s + r.weightedStandardScore, 0);

  // Üst sınır: her ders maks net (= soru sayısı)
  const maxTASP = SUBJECTS.reduce((s, info) => {
    const sp = 10 * ((info.questionCount - info.avgNet) / info.stdNet) + 50;
    return s + sp * info.coefficient;
  }, 0);

  // Alt sınır: tüm boş (net=0)
  const minTASP = SUBJECTS.reduce((s, info) => {
    const sp = 10 * ((0 - info.avgNet) / info.stdNet) + 50;
    return s + sp * info.coefficient;
  }, 0);

  const denom = maxTASP - minTASP;
  const rawFormal = denom > 0 ? ((tasp - minTASP) / denom) * 400 + 100 : 100;
  const estimatedScoreFormal = Math.max(100, Math.min(500, rawFormal));

  const sozelNet = subjects
    .filter((s) => s.info.section === "sozel")
    .reduce((s, r) => s + r.net, 0);
  const sayisalNet = subjects
    .filter((s) => s.info.section === "sayisal")
    .reduce((s, r) => s + r.net, 0);

  return {
    subjects,
    totalNet,
    totalWeightedNet,
    maxWeightedNet,
    estimatedScoreSimple,
    tasp,
    estimatedScoreFormal,
    sozelNet,
    sayisalNet,
  };
}
