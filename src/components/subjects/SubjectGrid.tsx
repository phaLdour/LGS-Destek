import Link from "next/link";
import {
  AbcIcon,
  AtomIcon,
  HelloBubbleIcon,
  MathSquareIcon,
  MosqueIcon,
  TrFlagIcon,
} from "./icons";

type Subject = {
  slug: string;
  name: string;
  short: string;
  Icon: (props: { className?: string }) => React.ReactNode;
  /** ikon rozeti gradyanı */
  badge: string;
  /** ikon rengi */
  iconClass: string;
};

export const SUBJECTS: Subject[] = [
  {
    slug: "turkce",
    name: "Türkçe",
    short: "Dil bilgisi, paragraf, sözcükte anlam",
    Icon: AbcIcon,
    badge: "from-[#1C2C5C] to-[#243A6E]",
    iconClass: "text-white",
  },
  {
    slug: "matematik",
    name: "Matematik",
    short: "Sayılar, cebir, geometri",
    Icon: MathSquareIcon,
    badge: "from-[#F59E0B] to-[#D97706]",
    iconClass: "text-white",
  },
  {
    slug: "fen-bilimleri",
    name: "Fen Bilimleri",
    short: "Fizik, kimya, biyoloji",
    Icon: AtomIcon,
    badge: "from-[#0E8A6B] to-[#0B6E55]",
    iconClass: "text-white",
  },
  {
    slug: "inkilap",
    name: "T.C. İnkılap Tarihi",
    short: "Atatürkçülük ve yakın tarih",
    Icon: TrFlagIcon,
    badge: "from-[#F4F6FB] to-[#E2E6F0]",
    iconClass: "text-rehberim-navy",
  },
  {
    slug: "din",
    name: "Din Kültürü",
    short: "Din kültürü ve ahlak bilgisi",
    Icon: MosqueIcon,
    badge: "from-[#1C2C5C] to-[#243A6E]",
    iconClass: "text-white",
  },
  {
    slug: "ingilizce",
    name: "İngilizce",
    short: "Kelime, dil bilgisi, okuma",
    Icon: HelloBubbleIcon,
    badge: "from-[#3056B7] to-[#1C2C5C]",
    iconClass: "text-white",
  },
];

export function SubjectGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {SUBJECTS.map(({ slug, name, short, Icon, badge, iconClass }) => (
        <Link
          key={slug}
          href={`/ders/${slug}`}
          className="group flex flex-col gap-3 rounded-2xl border border-rehberim-border bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-rehberim-accent/40 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rehberim-accent sm:p-5"
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${badge} shadow-sm transition-transform group-hover:scale-105`}
          >
            <Icon className={`h-7 w-7 ${iconClass}`} />
          </span>
          <span>
            <span className="block text-sm font-bold text-rehberim-navy sm:text-base">
              {name}
            </span>
            <span className="mt-0.5 block text-xs text-rehberim-navy/55">
              {short}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
