import Link from "next/link";
import {
  AbcIcon,
  AtaturkProfileIcon,
  AtomIcon,
  HelloBubbleIcon,
  MosqueIcon,
  PiIcon,
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
    Icon: PiIcon,
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
    Icon: AtaturkProfileIcon,
    badge: "from-[#1C2C5C] to-[#243A6E]",
    iconClass: "text-white",
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
          className="group ring-hairline relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-rehberim-border bg-white p-4 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-[3px] hover:border-rehberim-accent/40 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-rehberim-accent sm:p-5"
        >
          {/* Hover'da sağ üstte sönen accent ışıltı — premium "kart canlanıyor" hissi */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-rehberim-accent/0 blur-2xl transition-all duration-500 ease-smooth group-hover:bg-rehberim-accent/15"
          />
          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${badge} shadow-card transition-transform duration-300 ease-snap group-hover:scale-[1.06] group-hover:-rotate-[3deg]`}
          >
            <Icon className={`h-7 w-7 ${iconClass}`} />
          </span>
          <span className="relative">
            <span className="block text-[15px] font-bold tracking-tight text-rehberim-navy sm:text-base">
              {name}
            </span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-rehberim-navy/55">
              {short}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
