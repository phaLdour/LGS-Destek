import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PastExamClient } from "@/components/cikmis/PastExamClient";
import { cikmisBransBul, cikmisBransSorulari } from "@/lib/cikmisBransDeneme";
import { bransSuresiDk } from "@/lib/mockExam";
import { getShellUser } from "@/lib/user";

/**
 * Çıkmış sorulardan branş denemesi — tek ders, gerçek LGS soruları.
 *
 * Sorular her açılışta o dersin 9 yıllık havuzundan rastgele seçilir; sayı
 * ve süre gerçek LGS ile aynı. Sorular birden çok yıldan geldiği için her
 * soru KENDİ yılını taşır ("Hatalarım" anahtarı böyle doğru oluşur).
 */
export default async function CikmisBransPage({
  params,
}: {
  params: Promise<{ ders: string }>;
}) {
  const { ders } = await params;
  const tanim = cikmisBransBul(ders);
  if (!tanim) notFound();

  const sorular = cikmisBransSorulari(tanim);
  if (sorular.length === 0) notFound();

  const user = await getShellUser();

  return (
    <AppShell user={user}>
      <Link
        href="/deneme"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rehberim-navy/60 transition hover:text-rehberim-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Deneme seçimine dön
      </Link>
      <PastExamClient
        // Karışık yıllı: bu ikisi yalnız yedek, gerçek yıl her soruda.
        year={sorular[0].year}
        section={sorular[0].section}
        label={`${tanim.subjectName} — Çıkmış Sorulardan Branş Denemesi`}
        durationMinutes={bransSuresiDk(tanim)}
        questions={sorular}
        geriDonusHref="/deneme"
        geriDonusMetni="Deneme seçimine dön"
      />
    </AppShell>
  );
}
