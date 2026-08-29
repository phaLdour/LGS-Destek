import Link from "next/link";
import {
  ArrowRight,
  Compass,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { GUVEN_KOTASI, type BugununPlani as Plan, type PlanKonusu } from "@/lib/bugununPlani";
// Başlıktaki tarih de Türkiye gününü göstermeli (bkz. lib/zaman.ts).
import { trBugunBaslangici, trHaftaninGunu } from "@/lib/zaman";

const AYLAR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
const GUNLER = [
  "Pazar", "Pazartesi", "Salı", "Çarşamba",
  "Perşembe", "Cuma", "Cumartesi",
];

/**
 * Dashboard'un ana kartı: bugün ne çalışılacağı.
 *
 * Öneri, konudaki YANLIŞ ORANINA göre yapılır; oran 40 soruluk güven
 * kotasına göre düzeltilir (bkz. lib/bugununPlani.ts). Kart, hem düzeltilmiş
 * oranı hem de kotanın ne kadarının dolduğunu gösterir — öğrenci "%100
 * yanlış" gibi yanıltıcı bir sayıyla karşılaşmaz.
 */
export function BugununPlani({ plan }: { plan: Plan }) {
  // Bu bir server component; Vercel sunucusu UTC çalışır. `new Date()`in
  // yerel gününü yazmak, TR saatiyle 00:00-03:00 arasında karta BİR ÖNCEKİ
  // günü yazdırıyordu ("Bugünün planı — dün"). TR gün başını UTC alanlardan
  // okuyunca tarih nerede çalışırsa çalışsın Türkiye günüdür.
  const simdi = new Date();
  const trGunBasi = trBugunBaslangici(simdi);
  const trTakvim = new Date(trGunBasi.getTime() + 3 * 60 * 60 * 1000);
  const tarih = `${GUNLER[trHaftaninGunu(simdi)]}, ${trTakvim.getUTCDate()} ${AYLAR[trTakvim.getUTCMonth()]}`;

  return (
    <section className="ring-hairline relative mt-4 overflow-hidden rounded-3xl border border-rehberim-border bg-white shadow-card">
      {/* üst şerit — kartı "günün görevi" olarak işaretler */}
      <div className="h-1 w-full bg-gradient-to-r from-rehberim-accent via-rehberim-accent-light to-rehberim-accent" />

      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rehberim-accent/15 text-rehberim-accent-deep ring-1 ring-rehberim-accent/20">
              <Target className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-rehberim-navy">
                Bugünün planı
              </h2>
              <p className="text-xs text-rehberim-navy/55">{tarih}</p>
            </div>
          </div>
        </div>

        {plan.yeniKullanici ? (
          <IlkAdim plan={plan} />
        ) : (
          <div className="space-y-3">
            {plan.bekleyenHata > 0 && (
              <Adim
                sira={1}
                ikon={<RotateCcw className="h-4 w-4" />}
                baslik={`${plan.bekleyenHata} soru tekrar zamanında`}
                aciklama="Önce eski hatalarını kapat — aralıklı tekrar en çok burada işe yarar."
                href="/hatalarim"
                cta="Tekrara başla"
              />
            )}

            {plan.onerilen ? (
              <OdakKonu
                sira={plan.bekleyenHata > 0 ? 2 : 1}
                konu={plan.onerilen}
                genelOran={plan.genelYanlisOrani}
              />
            ) : plan.yeniKonu ? (
              <Adim
                sira={plan.bekleyenHata > 0 ? 2 : 1}
                ikon={<Compass className="h-4 w-4" />}
                baslik={plan.yeniKonu.topicName}
                aciklama={`${plan.yeniKonu.subjectName} · Henüz başlamadığın bir konu. Birkaç soru çöz, plan seni tanımaya başlasın.`}
                href={plan.yeniKonu.href}
                cta="Konuya git"
              />
            ) : null}

            {plan.alternatifler.length > 0 && (
              <div className="pt-1">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-navy/40">
                  Vaktin kalırsa
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.alternatifler.map((k) => (
                    <Link
                      key={`${k.subjectSlug}/${k.topicId}`}
                      href={k.href}
                      className="group inline-flex items-center gap-2 rounded-xl border border-rehberim-border bg-rehberim-muted px-3 py-2 text-xs font-bold text-rehberim-navy transition-colors hover:border-rehberim-accent/40 hover:bg-rehberim-accent/10"
                    >
                      <span className="truncate max-w-[13rem]">{k.topicName}</span>
                      <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums text-rehberim-navy/60 ring-1 ring-rehberim-border">
                        %{k.duzeltilmisOran}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** Odak konu — düzeltilmiş yanlış oranı + güven kotası birlikte gösterilir. */
function OdakKonu({
  sira,
  konu,
  genelOran,
}: {
  sira: number;
  konu: PlanKonusu;
  genelOran: number;
}) {
  const kotaKalan = Math.max(0, GUVEN_KOTASI - konu.toplam);
  const guvenilir = konu.toplam >= GUVEN_KOTASI;

  return (
    <Link
      href={konu.href}
      className="group relative block overflow-hidden rounded-2xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent/10 via-white to-amber-50/60 p-4 transition-all duration-300 ease-smooth hover:-translate-y-[2px] hover:border-rehberim-accent/50 hover:shadow-soft sm:p-5"
    >
      <div className="flex items-start gap-3">
        <SiraRozeti sira={sira} vurgulu />

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rehberim-accent-deep">
            {konu.subjectName}
          </p>
          <p className="mt-0.5 text-lg font-extrabold leading-snug tracking-tight text-rehberim-navy">
            {konu.topicName}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-rehberim-navy/65">
            En çok burada zorlanıyorsun — {konu.toplam} sorunun{" "}
            <strong className="font-bold text-rehberim-navy">
              %{konu.hamOran}
            </strong>
            ’ini yanlış yaptın (genel ortalaman %{genelOran}).
          </p>

          {/* Güven kotası — oranın ne kadar güvenilir olduğunu şeffafça söyler */}
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-semibold">
              <span className="text-rehberim-navy/50">
                {guvenilir
                  ? "Bu oran güvenilir"
                  : `${kotaKalan} soru daha çözersen bu oran kesinleşir`}
              </span>
              <span className="tabular-nums text-rehberim-navy/45">
                {Math.min(konu.toplam, GUVEN_KOTASI)}/{GUVEN_KOTASI}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-rehberim-navy/10">
              <div
                className="h-full rounded-full bg-rehberim-accent transition-all duration-500 ease-smooth"
                style={{ width: `${Math.max(4, konu.guven)}%` }}
              />
            </div>
          </div>
        </div>

        <OranHalkasi oran={konu.duzeltilmisOran} />
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-rehberim-accent-deep">
        Bu konuya git
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snap group-hover:translate-x-1" />
      </p>
    </Link>
  );
}

/** Düzeltilmiş yanlış oranını gösteren küçük halka. */
function OranHalkasi({ oran }: { oran: number }) {
  const derece = Math.round((Math.min(100, Math.max(0, oran)) / 100) * 360);
  return (
    <div className="hidden shrink-0 sm:block">
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(#B45309 ${derece}deg, rgba(22,36,76,0.08) ${derece}deg)`,
        }}
        aria-hidden
      >
        <div className="flex h-[3.1rem] w-[3.1rem] flex-col items-center justify-center rounded-full bg-white">
          <span className="text-base font-extrabold leading-none tabular-nums text-rehberim-navy">
            %{oran}
          </span>
          <span className="mt-0.5 text-[8.5px] font-bold uppercase tracking-wider text-rehberim-navy/45">
            yanlış
          </span>
        </div>
      </div>
      <p className="sr-only">Düzeltilmiş yanlış oranı yüzde {oran}</p>
    </div>
  );
}

function Adim({
  sira,
  ikon,
  baslik,
  aciklama,
  href,
  cta,
}: {
  sira: number;
  ikon: React.ReactNode;
  baslik: string;
  aciklama: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-2xl border border-rehberim-border bg-rehberim-muted/70 p-4 transition-all duration-300 ease-smooth hover:-translate-y-[1px] hover:border-rehberim-navy/20 hover:bg-white hover:shadow-card"
    >
      <SiraRozeti sira={sira} />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[15px] font-extrabold tracking-tight text-rehberim-navy">
          <span className="text-rehberim-navy/45">{ikon}</span>
          {baslik}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-rehberim-navy/60">
          {aciklama}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold text-rehberim-accent-deep">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-snap group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}

function SiraRozeti({ sira, vurgulu }: { sira: number; vurgulu?: boolean }) {
  return (
    <span
      className={
        vurgulu
          ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rehberim-accent text-sm font-extrabold text-rehberim-navy shadow-sm"
          : "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-rehberim-navy/60 ring-1 ring-rehberim-border"
      }
      aria-hidden
    >
      {sira}
    </span>
  );
}

/** Hiç verisi olmayan öğrenci — plan yerine tek net bir ilk adım. */
function IlkAdim({ plan }: { plan: Plan }) {
  const hedef = plan.yeniKonu;
  return (
    <div className="rounded-2xl border border-rehberim-accent/30 bg-gradient-to-br from-rehberim-accent/10 via-white to-amber-50/60 p-5">
      <p className="flex items-center gap-2 text-[15px] font-extrabold tracking-tight text-rehberim-navy">
        <Sparkles className="h-4 w-4 text-rehberim-accent-deep" />
        Hadi başlayalım
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-rehberim-navy/65">
        Birkaç soru çöz — plan, hangi konuda zorlandığını öğrenip her sabah
        sana ne çalışman gerektiğini söylemeye başlasın.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/hizli-sorular"
          className="inline-flex items-center gap-1.5 rounded-xl bg-rehberim-navy px-4 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-rehberim-navy-light"
        >
          Hızlı sorularla başla
          <ArrowRight className="h-4 w-4" />
        </Link>
        {hedef && (
          <Link
            href={hedef.href}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rehberim-border bg-white px-4 py-2.5 text-sm font-extrabold text-rehberim-navy transition-colors hover:border-rehberim-navy/25"
          >
            {hedef.subjectName}: {hedef.topicName}
          </Link>
        )}
      </div>
    </div>
  );
}
