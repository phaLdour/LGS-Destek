import type { PastQuestion } from "./types";

/**
 * 2019 LGS interaktif soru verisi.
 *
 * Soru içerikleri kitapçıktan kesilmiş GÖRÜNTÜLERDİR
 * (public/cikmis-sorular/2019/<bolum>/<ders>-<no>.webp) — şekiller/grafikler
 * birebir korunur, hiçbir metin uydurulmaz.
 *
 * Doğru cevaplar, kitapçığın RESMÎ "A KİTAPÇIĞI CEVAP ANAHTARI"ndan
 * birebir alınmıştır (A=0, B=1, C=2, D=3).
 */

const L: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };

type SubjectSpec = {
  slug: string;
  name: string;
  /** Resmî cevap anahtarı, harf dizisi (soru 1..N sırasıyla) */
  key: string;
};

// ── SÖZEL — A Kitapçığı cevap anahtarı ──────────────────────────────
const SOZEL: SubjectSpec[] = [
  { slug: "turkce", name: "Türkçe", key: "ADBCDBAADBADCBBDCADC" },
  { slug: "inkilap", name: "T.C. İnkılap Tarihi", key: "ACADBDBCAD" },
  { slug: "din", name: "Din Kültürü", key: "DBACBADCAC" },
  { slug: "ingilizce", name: "İngilizce", key: "DBCBADBADC" },
];

// ── SAYISAL — A Kitapçığı cevap anahtarı ────────────────────────────
const SAYISAL: SubjectSpec[] = [
  { slug: "matematik", name: "Matematik", key: "BCCDACBDADBCCBACBABD" },
  { slug: "fen", name: "Fen Bilimleri", key: "CDACCBDACADABCDCDABB" },
];

function build(specs: SubjectSpec[], bolum: "sozel" | "sayisal"): PastQuestion[] {
  const out: PastQuestion[] = [];
  for (const s of specs) {
    const letters = s.key.split("");
    letters.forEach((ch, i) => {
      out.push({
        subject: s.name,
        subjectSlug: s.slug,
        no: i + 1,
        image: `/cikmis-sorular/2019/${bolum}/${s.slug}-${i + 1}.webp`,
        correctIndex: L[ch],
      });
    });
  }
  return out;
}

export const SOZEL_2019: PastQuestion[] = build(SOZEL, "sozel");
export const SAYISAL_2019: PastQuestion[] = build(SAYISAL, "sayisal");
