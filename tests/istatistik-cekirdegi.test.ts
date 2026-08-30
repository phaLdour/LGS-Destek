import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_GOAL,
  buildEmptyWeek,
  computeStats,
  emptyStats,
  type QuizRow,
  type SessionRow,
} from "@/lib/tracking-core";
import { trBugunBaslangici, trGunBasiOnce } from "@/lib/zaman";

/**
 * İstatistik çekirdeği testleri (`@/lib/tracking-core`).
 *
 * DETERMİNİZM: modül gün sınırlarını `new Date()` ile hesaplar, ama sınır
 * her zaman TÜRKİYE günüdür (UTC+3 sabit). Bu yüzden testler sabit tarih
 * yazmaz; girdileri `@/lib/zaman` yardımcılarıyla "bugüne göre" kurar.
 * Böylece sonuç sistem saat diliminden bağımsızdır.
 *
 * REGRESYON: cevapsız açılıp bırakılan deneme "çözülen test" sayılıyordu.
 * Deneme sınavında süre dolunca sonuç otomatik kaydedilir; öğrenci hiçbir
 * soru işaretlemediyse `correct = wrong = 0` olan bir satır düşer. Sayaç
 * eskiden `quizRows.length` idi ve bu satırları da sayıyordu.
 */

/** TR gününün başlangıcından `dakika` sonrası — ISO metin olarak. */
function gunIcinde(gunOnce: number, dakika = 1): string {
  return new Date(trGunBasiOnce(gunOnce).getTime() + dakika * 60_000).toISOString();
}

function oturum(gunOnce: number, saniye: number): SessionRow {
  return { duration_seconds: saniye, started_at: gunIcinde(gunOnce) };
}

function testKaydi(dogru: number, yanlis: number, gunOnce = 0): QuizRow {
  return { correct_count: dogru, wrong_count: yanlis, created_at: gunIcinde(gunOnce) };
}

const GUN_ETIKETLERI = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

// ───────────────── Boş durum ─────────────────

test("günlük hedef sabiti 30 dakikadır", () => {
  assert.equal(DEFAULT_GOAL, 30);
});

test("boş hafta 7 gün üretir ve son gün bugündür", () => {
  const hafta = buildEmptyWeek();
  assert.equal(hafta.length, 7);
  assert.equal(hafta.filter((g) => g.isToday).length, 1);
  assert.equal(hafta[6].isToday, true, "hafta eskiden yeniye sıralanmalı");
  for (const g of hafta) {
    assert.equal(g.minutes, 0);
    assert.ok(GUN_ETIKETLERI.includes(g.label), `bilinmeyen gün etiketi: ${g.label}`);
  }
});

test("emptyStats her sayacı sıfırlar ve oturum açılmamış sayar", () => {
  const s = emptyStats(false);
  assert.equal(s.configured, false);
  assert.equal(s.signedIn, false);
  assert.equal(s.totalMinutes, 0);
  assert.equal(s.todayMinutes, 0);
  assert.equal(s.completedTopics, 0);
  assert.equal(s.streakDays, 0);
  assert.equal(s.quizzesSolved, 0);
  assert.equal(s.questionsAnswered, 0);
  assert.equal(s.accuracyPct, 0);
  assert.equal(s.questionsToday, 0);
  assert.equal(s.weekly.length, 7);
  assert.equal(emptyStats(true).configured, true);
});

test("veri yokken computeStats sıfırlarla döner ama oturum açık işaretlenir", () => {
  const s = computeStats([], 0, []);
  assert.equal(s.configured, true);
  assert.equal(s.signedIn, true);
  assert.equal(s.totalMinutes, 0);
  assert.equal(s.quizzesSolved, 0);
  assert.equal(s.accuracyPct, 0);
  assert.equal(s.streakDays, 0);
  assert.equal(s.weekly.length, 7);
});

// ───────────────── "Çözülen test" sayacı (regresyon) ─────────────────

test("REGRESYON: cevapsız bırakılan deneme kaydı 'çözülen test' sayılmaz", () => {
  // Süre dolunca otomatik düşen boş kayıt: total_questions dolu ama 0 doğru / 0 yanlış.
  const s = computeStats([], 0, [testKaydi(0, 0), testKaydi(0, 0)]);
  assert.equal(s.quizzesSolved, 0, "hiç soru işaretlenmemiş deneme sayaca girmemeli");
  assert.equal(s.questionsAnswered, 0);
  assert.equal(s.accuracyPct, 0);
  assert.equal(s.questionsToday, 0);
});

test("REGRESYON: boş kayıtlar gerçek testlerin arasındayken de sayaca girmez", () => {
  const s = computeStats([], 0, [
    testKaydi(0, 0), // açılıp bırakılan deneme
    testKaydi(8, 2), // gerçekten çözülen test
    testKaydi(0, 0), // açılıp bırakılan deneme
    testKaydi(5, 5), // gerçekten çözülen test
  ]);
  assert.equal(s.quizzesSolved, 2);
  assert.equal(s.questionsAnswered, 20);
});

test("tek soru bile cevaplanmışsa test çözülmüş sayılır", () => {
  assert.equal(computeStats([], 0, [testKaydi(1, 0)]).quizzesSolved, 1);
  assert.equal(computeStats([], 0, [testKaydi(0, 1)]).quizzesSolved, 1);
});

test("hepsi yanlış cevaplanan test de çözülmüş sayılır (başarı %0 olur)", () => {
  const s = computeStats([], 0, [testKaydi(0, 10)]);
  assert.equal(s.quizzesSolved, 1);
  assert.equal(s.questionsAnswered, 10);
  assert.equal(s.accuracyPct, 0);
});

// ───────────────── Soru ve başarı sayaçları ─────────────────

test("cevaplanan soru sayısı doğru ve yanlışların toplamıdır", () => {
  const s = computeStats([], 0, [testKaydi(7, 3), testKaydi(4, 6)]);
  assert.equal(s.questionsAnswered, 20);
});

test("başarı yüzdesi en yakın tam sayıya yuvarlanır", () => {
  assert.equal(computeStats([], 0, [testKaydi(2, 1)]).accuracyPct, 67); // 66.67
  assert.equal(computeStats([], 0, [testKaydi(1, 2)]).accuracyPct, 33); // 33.33
  assert.equal(computeStats([], 0, [testKaydi(10, 0)]).accuracyPct, 100);
});

test("bugünkü soru sayısı yalnız bugünün kayıtlarını toplar", () => {
  const s = computeStats([], 0, [
    testKaydi(6, 4, 0), // bugün → 10 soru
    testKaydi(5, 5, 1), // dün → sayılmaz
    testKaydi(3, 0, 3), // 3 gün önce → sayılmaz
  ]);
  assert.equal(s.questionsToday, 10);
  assert.equal(s.questionsAnswered, 23, "toplam sayaç tüm günleri kapsamalı");
});

test("gün sınırı Türkiye saatidir: TR gecesi 00:30'daki çalışma bugüne yazılır", () => {
  // TR 00:30 = UTC 21:30 (bir önceki UTC günü). Gün sınırı UTC'ye göre
  // kurulsaydı bu kayıt "dün" sayılırdı.
  const trGeceyarisi = trBugunBaslangici().getTime();
  const trSaat0030 = new Date(trGeceyarisi + 30 * 60_000).toISOString();
  const s = computeStats([], 0, [
    { correct_count: 4, wrong_count: 1, created_at: trSaat0030 },
  ]);
  assert.equal(s.questionsToday, 5);
});

test("TR gece yarısından bir milisaniye önceki kayıt bugüne yazılmaz", () => {
  const oncekiGun = new Date(trBugunBaslangici().getTime() - 1).toISOString();
  const s = computeStats([], 0, [
    { correct_count: 9, wrong_count: 1, created_at: oncekiGun },
  ]);
  assert.equal(s.questionsToday, 0);
  assert.equal(s.questionsAnswered, 10);
  assert.equal(s.quizzesSolved, 1);
});

test("tamamlanan konu sayısı dışarıdan verilen değeri kullanır", () => {
  assert.equal(computeStats([], 17, []).completedTopics, 17);
});

// ───────────────── Süre toplamları ─────────────────

test("toplam süre saniyeden dakikaya yuvarlanır", () => {
  const s = computeStats([oturum(0, 1800), oturum(1, 900), oturum(2, 30)], 0, []);
  // 1800 + 900 + 30 = 2730 sn → 45.5 dk → 46
  assert.equal(s.totalMinutes, 46);
});

test("bugünkü dakika yalnız bugünün oturumlarını toplar", () => {
  const s = computeStats([oturum(0, 600), oturum(0, 300), oturum(1, 3600)], 0, []);
  assert.equal(s.todayMinutes, 15);
});

test("haftalık grafik son 7 günü eskiden yeniye dizer ve dakikayı doğru güne yazar", () => {
  const s = computeStats([oturum(0, 1200), oturum(2, 600), oturum(6, 1800)], 0, []);
  assert.equal(s.weekly.length, 7);
  assert.equal(s.weekly[6].isToday, true);
  assert.equal(s.weekly[6].minutes, 20, "bugün");
  assert.equal(s.weekly[4].minutes, 10, "2 gün önce");
  assert.equal(s.weekly[0].minutes, 30, "6 gün önce");
  assert.equal(s.weekly[5].minutes, 0);
  assert.equal(s.weekly[3].minutes, 0);
});

test("7 günden eski oturumlar haftalık grafiğe girmez ama toplam süreye girer", () => {
  const s = computeStats([oturum(10, 3600)], 0, []);
  assert.equal(s.totalMinutes, 60);
  assert.equal(
    s.weekly.reduce((t, g) => t + g.minutes, 0),
    0,
  );
});

// ───────────────── Çalışma serisi ─────────────────

test("seri: bugün dâhil arka arkaya çalışılan günleri sayar", () => {
  const s = computeStats([oturum(0, 600), oturum(1, 600), oturum(2, 600)], 0, []);
  assert.equal(s.streakDays, 3);
});

test("seri: bugün henüz çalışılmadıysa dünden başlar (seri kopmaz)", () => {
  const s = computeStats([oturum(1, 600), oturum(2, 600)], 0, []);
  assert.equal(s.streakDays, 2);
});

test("seri: ne bugün ne dün çalışıldıysa 0'dır", () => {
  const s = computeStats([oturum(2, 600), oturum(3, 600)], 0, []);
  assert.equal(s.streakDays, 0);
});

test("seri: aradaki boş gün seriyi keser", () => {
  // Bugün ve dün var, evvelsi gün yok → seri 2
  const s = computeStats([oturum(0, 600), oturum(1, 600), oturum(3, 600)], 0, []);
  assert.equal(s.streakDays, 2);
});

test("seri: hiç oturum yoksa 0'dır", () => {
  assert.equal(computeStats([], 0, []).streakDays, 0);
});

test("seri: aynı güne ait birden çok oturum seriyi şişirmez", () => {
  const s = computeStats(
    [oturum(0, 300), oturum(0, 300), oturum(0, 300), oturum(1, 300)],
    0,
    [],
  );
  assert.equal(s.streakDays, 2);
});

test("oturum ve test verileri birbirinin sayaçlarını bozmaz", () => {
  const s = computeStats(
    [oturum(0, 1800), oturum(1, 1800)],
    4,
    [testKaydi(9, 1, 0), testKaydi(0, 0, 0)],
  );
  assert.equal(s.totalMinutes, 60);
  assert.equal(s.todayMinutes, 30);
  assert.equal(s.streakDays, 2);
  assert.equal(s.completedTopics, 4);
  assert.equal(s.quizzesSolved, 1);
  assert.equal(s.questionsAnswered, 10);
  assert.equal(s.questionsToday, 10);
  assert.equal(s.accuracyPct, 90);
});
