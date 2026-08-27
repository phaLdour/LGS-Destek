"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { OwlSvg, type BaykusRuhHali } from "@/components/brand/Owl";
import {
  baykusSahibiniDogrula,
  baykusuDinle,
  sayfaIpucu,
} from "@/lib/baykus";
import { createClient } from "@/lib/supabase/client";
import { ChatPanel, type ChatMessage } from "./ChatPanel";

const FALLBACK_GREETING: ChatMessage = {
  role: "model",
  text: "Merhaba! Ben Rehber Baykuş 🦉 Derslerinle ilgili sorularını yanıtlayabilir ya da seni doğru sayfaya götürebilirim. Örneğin \"suyun pH değeri kaç?\" diye sorabilir veya \"matematiğe gir\" diyebilirsin.",
};

/** Boştayken ruh haline dönüş süresi. */
const IFADE_SURESI = 5000;
/** Sayfa ipucunun belirmesi için beklenen süre — hemen atılmaz. */
const IPUCU_GECIKMESI = 22_000;

export function MascotButton() {
  const router = useRouter();
  const yol = usePathname();
  const [open, setOpen] = useState(false);
  const [ruhHali, setRuhHali] = useState<BaykusRuhHali>("normal");
  const [balon, setBalon] = useState<string | null>(null);
  const zamanlayici = useRef<ReturnType<typeof setTimeout> | null>(null);
  const CHAT_CACHE_KEY = "rehberim:baykus-sohbet";
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Sayfa geçişlerinde bileşen yeniden kurulur (AppShell her sayfada ayrı
    // render edilir); geçmiş sessionStorage'da tutulmazsa baykuş her
    // yönlendirmede hafızasını kaybeder. Sekme kapanınca temizlenir.
    if (typeof window !== "undefined") {
      try {
        const ham = sessionStorage.getItem(CHAT_CACHE_KEY);
        if (ham) {
          const gecmis = JSON.parse(ham) as ChatMessage[];
          if (Array.isArray(gecmis) && gecmis.length > 0) return gecmis;
        }
      } catch {
        /* bozuk veri — sıfırdan başla */
      }
    }
    return [FALLBACK_GREETING];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [greetingLoaded, setGreetingLoaded] = useState(false);

  // Önbellek sahipliği: hesap değiştiyse eski sohbet/selam silinir.
  useEffect(() => {
    let iptal = false;
    createClient()
      .auth.getUser()
      .then(({ data }) => {
        if (iptal) return;
        // Hesap değiştiyse önbellek silindi; ekrandaki eski sohbet de gitsin.
        if (baykusSahibiniDogrula(data.user?.id ?? null)) {
          setMessages([FALLBACK_GREETING]);
          setGreetingLoaded(false);
        }
      })
      .catch(() => baykusSahibiniDogrula(null));
    return () => {
      iptal = true;
    };
  }, []);

  // Geçmişi kalıcılaştır (son 30 mesaj yeter; balon şişmesin).
  useEffect(() => {
    try {
      sessionStorage.setItem(
        CHAT_CACHE_KEY,
        JSON.stringify(messages.slice(-30)),
      );
    } catch {
      /* depolama yoksa geçmiş sadece bu sayfada yaşar */
    }
  }, [messages, CHAT_CACHE_KEY]);

  /** Balonu göster, süre sonunda ifadeyi normale döndür. */
  const konus = useCallback(
    (metin: string | null, yeniRuh: BaykusRuhHali, sure = IFADE_SURESI) => {
      if (zamanlayici.current) clearTimeout(zamanlayici.current);
      setRuhHali(yeniRuh);
      setBalon(metin);
      zamanlayici.current = setTimeout(() => {
        setBalon(null);
        setRuhHali("normal");
      }, sure);
    },
    [],
  );

  // Uygulamanın herhangi bir yerinden gelen "baykuşa söyle" olayları.
  useEffect(() => {
    return baykusuDinle((m) => {
      if (open) {
        // Sohbet açıkken balon kapatır; sadece ifadeyi değiştir.
        setRuhHali(m.ruhHali);
        return;
      }
      konus(m.mesaj ?? null, m.ruhHali, m.sure ?? IFADE_SURESI);
    });
  }, [konus, open]);

  // Sayfaya özel tek cümlelik ipucu — oturumda bir kez, gecikmeli.
  useEffect(() => {
    if (open) return;
    const ipucu = sayfaIpucu(yol ?? "");
    if (!ipucu) return;
    const depoAnahtari = `rehberim:ipucu:${ipucu.anahtar}`;
    try {
      if (sessionStorage.getItem(depoAnahtari)) return;
    } catch {
      return; // depolama yoksa ipucu hiç gösterilmesin (her geçişte tekrarlamasın)
    }
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(depoAnahtari, "1");
      } catch {
        /* yoksay */
      }
      konus(ipucu.metin, "dusunuyor", 7000);
    }, IPUCU_GECIKMESI);
    return () => clearTimeout(t);
  }, [yol, open, konus]);

  // Bileşen kalkarken bekleyen zamanlayıcıyı temizle.
  useEffect(() => {
    return () => {
      if (zamanlayici.current) clearTimeout(zamanlayici.current);
    };
  }, []);

  // İlk açılışta kullanıcı stats'ına göre kişisel selam çek.
  // Selam bir oturum boyunca sabit olduğundan sessionStorage'da cache'lenir:
  // her sayfa geçişinde /api/chat/greeting (→ 3 ağır Supabase query)
  // tekrar tetiklenmez, oturumda yalnız bir kez çağrılır.
  const GREETING_CACHE_KEY = "rehberim:greeting";
  useEffect(() => {
    if (greetingLoaded) return;
    // Devam eden bir sohbet varsa selamı yeniden yazma — kullanıcının
    // gördüğü cevaplar kaybolmasın.
    if (messages.length > 1) {
      setGreetingLoaded(true);
      return;
    }

    try {
      const cached = sessionStorage.getItem(GREETING_CACHE_KEY);
      if (cached) {
        setMessages([{ role: "model", text: cached }]);
        setGreetingLoaded(true);
        return;
      }
    } catch {
      // sessionStorage erişilemezse fetch'e düş
    }

    let cancelled = false;
    fetch("/api/chat/greeting")
      .then((r) => r.json())
      .then((data: { reply?: string }) => {
        if (cancelled) return;
        if (data.reply) {
          setMessages([{ role: "model", text: data.reply }]);
          try {
            sessionStorage.setItem(GREETING_CACHE_KEY, data.reply);
          } catch {
            // yoksay
          }
        }
        setGreetingLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setGreetingLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // messages.length bilerek bağımlılık dışında: bu etki yalnız İLK selam
    // içindir; sohbet uzadıkça yeniden çalışmamalı.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greetingLoaded]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setRuhHali("dusunuyor");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((_, i) => i !== 0), // açılış selamını gönderme
        }),
      });
      const data = await res.json();
      const yanit: string = data.reply ?? "Bir sorun oluştu.";
      const rota =
        typeof data.navigate === "string" ? (data.navigate as string) : null;
      // "Götürüyorum" gibi KISA onay cümlelerinde otomatik yönlendirme
      // doğru his; ama cevap gerçek bilgi içeriyorsa (sözlük anlamı, taban
      // puanı...) sayfayı anında değiştirmek cevabı okutmadan siler.
      // Uzun cevapta yönlendirme bir butona dönüşür, karar öğrencinin.
      const kisaOnay = rota !== null && yanit.length <= 90;
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: yanit,
          topicRoute:
            typeof data.topicRoute === "string"
              ? data.topicRoute
              : !kisaOnay
                ? rota
                : null,
        },
      ]);

      if (kisaOnay && rota) {
        setTimeout(() => {
          setOpen(false);
          router.push(rota);
        }, 700);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Bağlantı hatası. Lütfen tekrar dene.",
        },
      ]);
    } finally {
      setLoading(false);
      setRuhHali("normal");
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {open && (
        <ChatPanel
          messages={messages}
          loading={loading}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          onClose={() => setOpen(false)}
          onOpenTopic={(route) => {
            setOpen(false);
            router.push(route);
          }}
        />
      )}

      {/* Konuşma balonu — sohbet kapalıyken baykuşun "sesi" */}
      {!open && balon && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="animate-fade-in relative max-w-[15rem] rounded-2xl rounded-br-sm border border-rehberim-border bg-white px-3.5 py-2.5 text-left text-[13px] font-medium leading-snug text-rehberim-navy shadow-elevated transition-transform duration-200 ease-snap hover:-translate-y-[1px] sm:max-w-[17rem]"
        >
          {balon}
          {/* balon kuyruğu — baykuşa doğru */}
          <span
            aria-hidden
            className="absolute -bottom-[7px] right-4 h-3 w-3 rotate-45 border-b border-r border-rehberim-border bg-white"
          />
        </button>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Rehber Baykuş'u kapat" : "Rehber Baykuş'u aç"}
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rehberim-navy to-rehberim-navy-light shadow-elevated ring-2 ring-white transition-all duration-300 ease-snap hover:scale-[1.06] active:scale-95"
      >
        {/* konuşurken dışa yayılan halka — dikkat çeker, yer kaplamaz */}
        {!open && balon && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-rehberim-accent/30"
          />
        )}
        {/* yumuşak iç ışıltı — premium "canlı" hissi */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/0 to-white/15"
        />
        {/* baykuş sürekli hafifçe süzülür + göz kırpar → "yaşıyor" hissi.
            motion-safe: hareket hassasiyeti olan öğrenciler için kapanır. */}
        <span className="relative motion-safe:animate-float">
          <OwlSvg
            className="h-9 w-9 transition-transform duration-300 ease-smooth group-hover:rotate-[-6deg]"
            ruhHali={ruhHali}
            canli
            decorative
          />
        </span>
        {!open && !balon && (
          <span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-rehberim-accent">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-rehberim-accent opacity-60"
            />
          </span>
        )}
      </button>
    </div>
  );
}
