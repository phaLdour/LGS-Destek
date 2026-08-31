"use client";

/**
 * Konu tekrar planının Supabase tarafı.
 *
 * Aralık matematiği `lib/konuTekrar.ts` içinde ve saf; burası yalnız
 * okuma/yazma yapar. Ayrım bilinçli: matematik testlerle korunuyor,
 * bu dosya ise ağ hatalarına dayanıklı olmakla yükümlü.
 *
 * HER ŞEY SESSİZ BAŞARISIZ OLUR. Tekrar planı öğrencinin çalışmasını
 * DESTEKLEYEN bir şey; kayıt tutulamadı diye test sonucunu kaybetmek ya
 * da ekrana hata basmak fayda değil zarar getirir.
 */

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  hatirlamaDuzeyi,
  planla,
  vadesiGelenler,
  type TekrarKaydi,
} from "@/lib/konuTekrar";

type Satir = {
  subject_slug: string;
  topic_id: string;
  basamak: number;
  vade: string;
  son_tekrar: string;
  son_yuzde: number | null;
};

async function istemciVeKullanici() {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    return { supabase, user };
  } catch {
    return null;
  }
}

function satirdanKayit(s: Satir): TekrarKaydi & { sonYuzde: number | null } {
  return {
    dersSlug: s.subject_slug,
    konuId: s.topic_id,
    basamak: s.basamak,
    vade: new Date(s.vade).getTime(),
    sonTekrar: new Date(s.son_tekrar).getTime(),
    sonYuzde: s.son_yuzde,
  };
}

/** Öğrencinin tüm tekrar kayıtları. */
export async function tekrarKayitlari(): Promise<
  (TekrarKaydi & { sonYuzde: number | null })[]
> {
  const ctx = await istemciVeKullanici();
  if (!ctx) return [];
  const { data, error } = await ctx.supabase
    .from("konu_tekrar")
    .select("subject_slug, topic_id, basamak, vade, son_tekrar, son_yuzde");
  if (error || !data) return [];
  return (data as Satir[]).map(satirdanKayit);
}

/** Vadesi gelmiş konular, en gecikmiş başta. */
export async function bekleyenTekrarlar(
  simdi: Date = new Date(),
): Promise<(TekrarKaydi & { sonYuzde: number | null })[]> {
  const hepsi = await tekrarKayitlari();
  return vadesiGelenler(hepsi, simdi) as (TekrarKaydi & {
    sonYuzde: number | null;
  })[];
}

/**
 * Bir test sonucundan sonra konunun tekrar planını günceller.
 *
 * Kayıt yoksa sıfırdan kurulur; varsa mevcut basamaktan devam edilir.
 * Bu yüzden önce okuyup sonra yazıyoruz — `upsert` tek başına basamağı
 * bilemezdi.
 */
export async function tekrariPlanla(
  dersSlug: string,
  konuId: string,
  dogru: number,
  toplam: number,
  simdi: Date = new Date(),
): Promise<boolean> {
  const ctx = await istemciVeKullanici();
  if (!ctx) return false;
  try {
    const { data } = await ctx.supabase
      .from("konu_tekrar")
      .select("basamak")
      .eq("subject_slug", dersSlug)
      .eq("topic_id", konuId)
      .maybeSingle();

    // Kayıt yoksa -1'den başlıyoruz: planla(-1, "iyi") → 0. basamak.
    const mevcut = typeof data?.basamak === "number" ? data.basamak : -1;
    const plan = planla(mevcut, hatirlamaDuzeyi(dogru, toplam), simdi);

    const { error } = await ctx.supabase.from("konu_tekrar").upsert(
      {
        user_id: ctx.user.id,
        subject_slug: dersSlug,
        topic_id: konuId,
        basamak: plan.basamak,
        vade: new Date(plan.vade).toISOString(),
        son_tekrar: simdi.toISOString(),
        son_yuzde:
          toplam > 0 ? Math.round((dogru / toplam) * 100) : null,
      },
      { onConflict: "user_id,subject_slug,topic_id" },
    );
    return !error;
  } catch {
    return false;
  }
}

/** Konuyu tekrar listesinden çıkarır (öğrenci "artık gerek yok" derse). */
export async function tekrariBirak(
  dersSlug: string,
  konuId: string,
): Promise<boolean> {
  const ctx = await istemciVeKullanici();
  if (!ctx) return false;
  try {
    const { error } = await ctx.supabase
      .from("konu_tekrar")
      .delete()
      .eq("subject_slug", dersSlug)
      .eq("topic_id", konuId);
    return !error;
  } catch {
    return false;
  }
}
