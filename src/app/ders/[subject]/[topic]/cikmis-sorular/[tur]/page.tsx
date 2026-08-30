import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PastExamClient } from "@/components/cikmis/PastExamClient";
import { getSubjectContent, getTopic } from "@/content";
import {
  konuCikmisSorulari,
  turSayisi,
  turSorulari,
  turSuresiDk,
} from "@/lib/konuCikmisSorular";
import { getShellUser } from "@/lib/user";

/**
 * Konu bazlı çıkmış soru testi — tek tur.
 *
 * Sorular birden çok yıldan geldiği için `PastExamClient`e her soru KENDİ
 * yılıyla verilir; "Hatalarım" anahtarı böyle doğru oluşur.
 *
 * İstatistiğe GERÇEK ders/konu olarak yazılır (sentetik `__cikmis__`
 * etiketiyle değil): bu bir konu çalışmasıdır, "Bugünün Planı" ve konu
 * istatistikleri bunu görmeli.
 */
export default async function KonuCikmisTurPage({
  params,
}: {
  params: Promise<{ subject: string; topic: string; tur: string }>;
}) {
  const { subject, topic, tur } = await params;
  const turNo = Number(tur);
  if (!Number.isInteger(turNo) || turNo < 1) notFound();

  const subjectContent = getSubjectContent(subject);
  const topicData = getTopic(subject, topic);
  if (!subjectContent || !topicData) notFound();

  const hepsi = konuCikmisSorulari(subject, topic);
  if (turNo > turSayisi(hepsi.length)) notFound();

  const sorular = turSorulari(hepsi, turNo);
  if (sorular.length === 0) notFound();

  const user = await getShellUser();
  const geriHref = `/ders/${subject}/${topic}/cikmis-sorular`;

  return (
    <AppShell user={user}>
      <Link
        href={geriHref}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Turlara dön
      </Link>
      <PastExamClient
        // Karışık yıllı test: bu iki değer yalnız yedek olarak kullanılır,
        // gerçek yıl/bölüm her sorunun kendi içinde taşınır.
        year={sorular[0].year}
        section={sorular[0].section}
        label={`${topicData.name} · ${turNo}. tur`}
        durationMinutes={turSuresiDk(sorular)}
        questions={sorular}
        kayit={{ subjectSlug: subject, topicId: topic }}
        geriDonusHref={geriHref}
        geriDonusMetni="Turlara dön"
      />
    </AppShell>
  );
}
