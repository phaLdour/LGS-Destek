import Link from "next/link";
import { ArrowRight, Archive } from "lucide-react";
import { konuCikmisOzet } from "@/lib/konuCikmisSorular";

/**
 * Konu sayfasındaki "Bu konuda LGS'de çıkmış sorular" kartı.
 *
 * Soruların KENDİSİ burada listelenmez — bir konuda 65 soruya kadar
 * birikebiliyor (Türkçe/Paragrafta Anlam) ve konu sayfası okunamaz hâle
 * gelirdi. Kart yalnız sayıyı ve yılları gösterir, çözüm ayrı sayfada.
 *
 * Hiç soru çıkmamışsa kart GİZLENMEZ: "9 yılda bu konudan soru çıkmamış"
 * bilgisi öğrenci için değerlidir — hangi konu ne sıklıkta çıkıyor
 * görmesini sağlar. (Şu an yalnız İngilizce "Natural Forces" böyle.)
 */
export function KonuCikmisSorularKarti({
  subjectSlug,
  topicId,
}: {
  subjectSlug: string;
  topicId: string;
}) {
  const ozet = konuCikmisOzet(subjectSlug, topicId);

  if (ozet.toplam === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-rehberim-border bg-rehberim-muted/40 p-5">
        <p className="text-sm font-semibold text-rehberim-navy">
          Bu konudan 9 yılda hiç soru çıkmamış.
        </p>
        <p className="mt-1 text-sm leading-snug text-rehberim-navy/60">
          2018&#8209;2026 arasındaki LGS sınavlarında bu konudan soru
          sorulmamış. Yine de müfredatta olduğu için çıkabilir — ama
          çalışma sıranı belirlerken bunu bilmen işine yarar.
        </p>
      </div>
    );
  }

  const yilAraligi =
    ozet.yillar.length === 1
      ? `${ozet.yillar[0]}`
      : `${ozet.yillar[ozet.yillar.length - 1]}–${ozet.yillar[0]}`;

  return (
    <Link
      href={`/ders/${subjectSlug}/${topicId}/cikmis-sorular`}
      className="group flex items-center gap-4 rounded-2xl border border-rehberim-border bg-rehberim-surface p-5 shadow-card transition hover:border-rehberim-accent hover:shadow-soft"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-rehberim-accent text-rehberim-on-accent">
        <Archive className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold leading-tight text-rehberim-navy">
          Bu konuda çıkmış sorular ({ozet.toplam})
        </span>
        <span className="mt-1 block text-sm leading-snug text-rehberim-navy/60">
          {yilAraligi} LGS sınavlarından {ozet.toplam} gerçek soru ·{" "}
          {ozet.turSayisi === 1 ? "tek tur" : `${ozet.turSayisi} tur`} hâlinde
          test
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-rehberim-navy/40 transition group-hover:translate-x-0.5 group-hover:text-rehberim-accent-deep"
        strokeWidth={2.4}
      />
    </Link>
  );
}
