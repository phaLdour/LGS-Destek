/**
 * Rozet (başarım) tanımları ve değerlendirici.
 * Sunucu tarafında çağrılır: stats + Supabase verileri → kazanılan rozet seti.
 */

export type Badge = {
  key: string;
  emoji: string;
  name: string;
  description: string;
  /** Kategori — sıralama ve grup başlığı için */
  group: "baslangic" | "seri" | "soru" | "ders" | "sinav";
};

export const BADGES: Badge[] = [
  // Başlangıç
  {
    key: "ilk-adim",
    emoji: "🌱",
    name: "İlk Adım",
    description: "İlk konunu bitirdin",
    group: "baslangic",
  },
  {
    key: "yuzbasi",
    emoji: "💯",
    name: "Yüzbaşı",
    description: "100 soru çözdün",
    group: "soru",
  },
  {
    key: "bin-soru",
    emoji: "🎖️",
    name: "Bin Soru",
    description: "1000 soru çözdün",
    group: "soru",
  },
  {
    key: "calıskan-baykus",
    emoji: "🦉",
    name: "Çalışkan Baykuş",
    description: "Toplam 10 saat çalıştın",
    group: "baslangic",
  },
  {
    key: "yuksek-hiz",
    emoji: "⚡",
    name: "Yüksek Hız",
    description: "Bir günde 60 dakika çalıştın",
    group: "baslangic",
  },

  // Seri
  {
    key: "seri-3",
    emoji: "🔥",
    name: "3 Günlük Seri",
    description: "Üst üste 3 gün çalıştın",
    group: "seri",
  },
  {
    key: "seri-7",
    emoji: "🔥🔥",
    name: "Haftalık Seri",
    description: "Üst üste 7 gün çalıştın",
    group: "seri",
  },
  {
    key: "seri-30",
    emoji: "🔥🔥🔥",
    name: "Aylık Seri",
    description: "Üst üste 30 gün çalıştın",
    group: "seri",
  },

  // Ders bazlı (her dersin yarısı biten konu sayısına bakar)
  {
    key: "turkce-ustasi",
    emoji: "📚",
    name: "Türkçe Ustası",
    description: "Türkçe konularının yarısını bitirdin",
    group: "ders",
  },
  {
    key: "matematik-ustasi",
    emoji: "📐",
    name: "Matematik Ustası",
    description: "Matematik konularının yarısını bitirdin",
    group: "ders",
  },
  {
    key: "fen-ustasi",
    emoji: "🔬",
    name: "Fen Ustası",
    description: "Fen Bilimleri konularının yarısını bitirdin",
    group: "ders",
  },
  {
    key: "inkilap-ustasi",
    emoji: "🇹🇷",
    name: "İnkılap Ustası",
    description: "T.C. İnkılap konularının yarısını bitirdin",
    group: "ders",
  },
  {
    key: "din-ustasi",
    emoji: "☪️",
    name: "Din Ustası",
    description: "Din Kültürü konularının yarısını bitirdin",
    group: "ders",
  },
  {
    key: "ingilizce-ustasi",
    emoji: "🌍",
    name: "İngilizce Ustası",
    description: "İngilizce konularının yarısını bitirdin",
    group: "ders",
  },

  // Sınav
  {
    key: "hassas-atis",
    emoji: "🎯",
    name: "Hassas Atış",
    description: "Bir testte %100 doğru yaptın",
    group: "sinav",
  },
  {
    key: "deneme-fatihi",
    emoji: "🏆",
    name: "Deneme Fatihi",
    description: "Bir deneme sınavında 80+ net çıkardın",
    group: "sinav",
  },
];

export type BadgeEvalInput = {
  totalMinutes: number;
  completedTopics: number;
  streakDays: number;
  questionsAnswered: number;
  maxDailyMinutes: number; // son 60 günde bir günde maks
  hasPerfectQuiz: boolean; // total === correct ve total >= 4
  bestExamNet: number; // __deneme_*__ kayıtları arasında en yüksek net
  topicsDonePerSubject: Record<string, number>; // {turkce: 8, ...}
  totalTopicsPerSubject: Record<string, number>; // {turkce: 15, ...}
};

/** Stats + ek metriklere göre kazanılan rozet anahtarları kümesini döner. */
export function evaluateBadges(input: BadgeEvalInput): Set<string> {
  const earned = new Set<string>();

  if (input.completedTopics >= 1) earned.add("ilk-adim");
  if (input.questionsAnswered >= 100) earned.add("yuzbasi");
  if (input.questionsAnswered >= 1000) earned.add("bin-soru");
  if (input.totalMinutes >= 600) earned.add("calıskan-baykus");
  if (input.maxDailyMinutes >= 60) earned.add("yuksek-hiz");

  if (input.streakDays >= 3) earned.add("seri-3");
  if (input.streakDays >= 7) earned.add("seri-7");
  if (input.streakDays >= 30) earned.add("seri-30");

  const dersMap: { slug: string; key: string }[] = [
    { slug: "turkce", key: "turkce-ustasi" },
    { slug: "matematik", key: "matematik-ustasi" },
    { slug: "fen-bilimleri", key: "fen-ustasi" },
    { slug: "inkilap", key: "inkilap-ustasi" },
    { slug: "din", key: "din-ustasi" },
    { slug: "ingilizce", key: "ingilizce-ustasi" },
  ];
  for (const d of dersMap) {
    const done = input.topicsDonePerSubject[d.slug] ?? 0;
    const total = input.totalTopicsPerSubject[d.slug] ?? 0;
    if (total > 0 && done * 2 >= total) earned.add(d.key);
  }

  if (input.hasPerfectQuiz) earned.add("hassas-atis");
  if (input.bestExamNet >= 80) earned.add("deneme-fatihi");

  return earned;
}
