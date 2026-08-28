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
  group: "baslangic" | "seri" | "soru" | "ders" | "sinav" | "odak" | "rekabet";
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
    key: "kelime-avcisi",
    emoji: "📖",
    name: "Kelime Avcısı",
    description: "Kelime testinde 100 soru çözdün",
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

  // Odak Modu (sayaç + pomodoro)
  {
    key: "ilk-odak",
    emoji: "🎯",
    name: "İlk Odak",
    description: "Odak Modu'nda ilk oturumunu tamamladın (10+ dk)",
    group: "odak",
  },
  {
    key: "derin-odak",
    emoji: "🧘",
    name: "Derin Odak",
    description: "Tek oturuşta 50 dakika kesintisiz çalıştın",
    group: "odak",
  },
  {
    key: "pomodoro-cirak",
    emoji: "🍅",
    name: "Pomodoro Çırağı",
    description: "İlk pomodoro turunu tamamladın (25 dk)",
    group: "odak",
  },
  {
    key: "odak-ustasi",
    emoji: "⏳",
    name: "Odak Ustası",
    description: "Odak Modu'nda toplam 10 saat çalıştın",
    group: "odak",
  },

  // Rekabet (1v1 düello) — Faz 6
  {
    key: "ilk-duello",
    emoji: "🗡️",
    name: "İlk Düello",
    description: "İlk 1v1 maçını oynadın",
    group: "rekabet",
  },
  {
    key: "ilk-zafer",
    emoji: "⚔️",
    name: "İlk Zafer",
    description: "İlk maçını kazandın",
    group: "rekabet",
  },
  {
    key: "duellocu",
    emoji: "🛡️",
    name: "Düellocu",
    description: "Toplam 10 maç oynadın",
    group: "rekabet",
  },
  {
    key: "yenilmez",
    emoji: "🔥",
    name: "Yenilmez",
    description: "5 maçlık galibiyet serisi yakaladın",
    group: "rekabet",
  },
  {
    key: "yildiz-ligi",
    emoji: "⭐",
    name: "Yıldızlara Çıkış",
    description: "Yıldızlar ligine yükseldin",
    group: "rekabet",
  },
  {
    key: "sampiyon-ligi",
    emoji: "👑",
    name: "Şampiyonlar Ligi",
    description: "Şampiyonlar ligine yükseldin",
    group: "rekabet",
  },
  {
    key: "kupa-sahibi",
    emoji: "🏅",
    name: "Kupa Sahibi",
    description: "İlk sezon kupanı kazandın",
    group: "rekabet",
  },
  {
    key: "sezon-sampiyonu",
    emoji: "🥇",
    name: "Sezon Şampiyonu",
    description: "Bir sezonu birinci sırada bitirdin",
    group: "rekabet",
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
  sozlukSoruSayisi: number; // __sozluk__ kayıtlarındaki toplam soru
  topicsDonePerSubject: Record<string, number>; // {turkce: 8, ...}
  totalTopicsPerSubject: Record<string, number>; // {turkce: 15, ...}
  // Odak Modu — study_sessions'ta __odak__ / __odak_pomodoro__ kayıtları
  odakToplamSn: number; // tüm odak oturumlarının toplamı
  odakEnUzunSn: number; // en uzun tek odak oturumu
  pomodoroToplamSn: number; // yalnız __odak_pomodoro__ toplamı
  // Rekabet (tüm sezonların toplamı) — Faz 6
  compMatches: number;
  compWins: number;
  compBestStreak: number; // en uzun galibiyet serisi (comp_ranks.best_win_streak)
  compBestTier: number; // tüm zamanların en yüksek kademesi (lig nişanı)
  compTrophies: number; // sezon kupası sayısı
  compSeasonWins: number; // 1. bitirilen sezon sayısı
};

/** Stats + ek metriklere göre kazanılan rozet anahtarları kümesini döner. */
export function evaluateBadges(input: BadgeEvalInput): Set<string> {
  const earned = new Set<string>();

  if (input.completedTopics >= 1) earned.add("ilk-adim");
  if (input.questionsAnswered >= 100) earned.add("yuzbasi");
  if (input.questionsAnswered >= 1000) earned.add("bin-soru");
  if (input.sozlukSoruSayisi >= 100) earned.add("kelime-avcisi");
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

  // Odak Modu
  if (input.odakEnUzunSn >= 10 * 60) earned.add("ilk-odak");
  if (input.odakEnUzunSn >= 50 * 60) earned.add("derin-odak");
  if (input.pomodoroToplamSn >= 25 * 60) earned.add("pomodoro-cirak");
  if (input.odakToplamSn >= 10 * 3600) earned.add("odak-ustasi");

  // Rekabet — lig eşikleri ranks.ts ile aynı: 4 = Yıldızlar 2, 8 = Şampiyonlar 2
  if (input.compMatches >= 1) earned.add("ilk-duello");
  if (input.compWins >= 1) earned.add("ilk-zafer");
  if (input.compMatches >= 10) earned.add("duellocu");
  if (input.compBestStreak >= 5) earned.add("yenilmez");
  if (input.compBestTier >= 4) earned.add("yildiz-ligi");
  if (input.compBestTier >= 8) earned.add("sampiyon-ligi");
  if (input.compTrophies >= 1) earned.add("kupa-sahibi");
  if (input.compSeasonWins >= 1) earned.add("sezon-sampiyonu");

  return earned;
}
