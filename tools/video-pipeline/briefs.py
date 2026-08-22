"""Konu içeriğinden NotebookLM kaynak belgesi ve video yönlendirme brief'i üretir.

Kaynak belge: konunun makalesi + konu haritası + çalışma kartları + LGS
tuzakları + test soruları (çözümleriyle). NotebookLM yalnızca kaynağa bağlı
kaldığı için belgenin eksiksiz olması video kalitesini doğrudan belirler.

Brief: NotebookLM'in "Customize" alanına giden, iyi bir öğretim videosunun
yapısını ve kurallarını anlatan yönlendirme metni.
"""

from __future__ import annotations

import re
from typing import Any

KIND_LABELS = {
    "tanim": "Tanım",
    "kural": "Kural",
    "formul": "Formül",
    "ornek": "Örnek",
    "tuzak": "Tuzak / Dikkat",
    "istisna": "İstisna",
    "ipucu": "İpucu",
    "soru": "Örnek Soru",
}

LETTERS = "ABCD"

# Dersin doğasına göre brief'e eklenen özel vurgular.
SUBJECT_NOTES: dict[str, str] = {
    "matematik": (
        "Her kural ve formülü mutlaka en az bir sayısal örnekle, işlemleri adım adım "
        "ekranda göstererek uygula. İşlem hatası yapma; sonuçları kaynakla karşılaştır. "
        "Soyut kuralları günlük hayattan somut durumlara bağla."
    ),
    "fen-bilimleri": (
        "Olayların 'neden' olduğunu sebep-sonuç zinciriyle anlat; formüllerde birimleri "
        "söyle; deney düzeneği ve grafik yorumlama varsa ekranda şematik göster."
    ),
    "turkce": (
        "Her kuralı en az iki örnek cümleyle göster; örnek cümleyi ekranda yaz ve "
        "ilgili kısmı vurgula. Sık karıştırılan kavramları yan yana karşılaştır."
    ),
    "inkilap": (
        "Olayları kronolojik sırayla, sebep → olay → sonuç şeklinde anlat; tarihleri ve "
        "kişi adlarını kaynaktaki haliyle doğru söyle ve ekranda yaz. Önem/sonuç "
        "vurgusunu LGS soru mantığıyla ver."
    ),
    "din": (
        "Kavramları sade tanımlarla ve günlük hayattan örneklerle anlat; ayet/hadis "
        "meallerini kaynaktaki haliyle ver, kaynakta olmayan alıntı ekleme."
    ),
    "ingilizce": (
        "Anlatım dili Türkçe, örnekler İngilizce olsun: her yapı ve kelimeyi İngilizce "
        "örnek cümleyle göster, cümlenin Türkçe anlamını söyle. Telaffuzu net ver."
    ),
}


def _clean(text: str) -> str:
    return re.sub(r"[ \t]+", " ", (text or "").strip())


TAG_LABELS = {
    "tanım": "TANIM", "tanim": "TANIM",
    "kural": "KURAL",
    "formül": "FORMÜL", "formul": "FORMÜL",
    "örnek": "ÖRNEK", "ornek": "ÖRNEK",
    "tuzak": "DİKKAT (TUZAK)",
    "istisna": "İSTİSNA",
    "ipucu": "İPUCU",
    "soru": "ÖRNEK SORU",
}


def _strip_inline_markup(text: str) -> str:
    """Makaledeki **kalın** ve satır başı `[etiket]` işaretlerini sadeleştirir."""
    t = text.replace("**", "")

    def _tag(m: re.Match) -> str:
        key = m.group(1).strip().lower()
        return f"{TAG_LABELS.get(key, key.upper())}: "

    t = re.sub(r"^\[([^\]\n]{1,20})\]\s*", _tag, t, flags=re.MULTILINE)
    return t


def topic_key(subject_slug: str, topic_id: str) -> str:
    return f"{subject_slug}/{topic_id}"


def build_source_document(subject: dict[str, Any], topic: dict[str, Any]) -> str:
    """NotebookLM'e 'kopyalanmış metin' kaynağı olarak verilecek ders notu."""
    lines: list[str] = []
    name = topic["name"]
    lines.append(f"# {subject['name']} — {name}")
    lines.append("")
    lines.append(f"Seviye: 8. sınıf (LGS). Ders: {subject['name']}. Konu: {name}.")
    if topic.get("summary"):
        lines.append(f"Özet: {_clean(topic['summary'])}")
    lines.append("")

    article = (topic.get("article") or "").strip()
    if article:
        lines.append("## KONU ANLATIMI")
        lines.append("")
        lines.append(_strip_inline_markup(article))
        lines.append("")

    mind = topic.get("mindMap") or {}
    branches = mind.get("branches") or []
    if branches:
        lines.append("## KONU HARİTASI (ana başlıklar ve kilit noktalar)")
        lines.append("")
        for i, b in enumerate(branches, 1):
            lines.append(f"### {i}. {b.get('label', '')}")
            if b.get("detail"):
                lines.append(_clean(b["detail"]))
            for sec in b.get("sections") or []:
                label = sec.get("title") or KIND_LABELS.get(sec.get("kind", ""), sec.get("kind", ""))
                lines.append(f"- {label}: {_clean(sec.get('content', ''))}")
            lines.append("")

    cards = topic.get("cards") or []
    if cards:
        lines.append("## ÇALIŞMA KARTLARI (soru → cevap)")
        lines.append("")
        for c in cards:
            lines.append(f"- {_clean(c.get('front', ''))} → {_clean(c.get('back', ''))}")
        lines.append("")

    tips = topic.get("tips") or []
    if tips:
        lines.append("## LGS TUZAKLARI VE SIK YAPILAN HATALAR")
        lines.append("")
        for t in tips:
            lines.append(f"- Tuzak: {_clean(t.get('trap', ''))}")
            lines.append(f"  - YANLIŞ: {_clean(t.get('wrong', ''))}")
            lines.append(f"  - DOĞRU: {_clean(t.get('correct', ''))}")
        lines.append("")

    quiz = topic.get("quiz") or []
    if quiz:
        lines.append("## LGS TARZI ÖRNEK SORULAR (çözümleriyle)")
        lines.append("")
        for i, q in enumerate(quiz, 1):
            lines.append(f"Soru {i}: {_clean(q.get('question', ''))}")
            for j, opt in enumerate(q.get("options") or []):
                lines.append(f"  {LETTERS[j]}) {_clean(opt)}")
            ci = q.get("correctIndex", 0)
            letter = LETTERS[ci] if 0 <= ci < 4 else "?"
            exp = _clean(q.get("explanation") or "")
            lines.append(f"  Doğru cevap: {letter}. {exp}".rstrip())
            lines.append("")

    return "\n".join(lines).strip() + "\n"


def build_brief(subject: dict[str, Any], topic: dict[str, Any], *, target_minutes: str = "6-9") -> str:
    """NotebookLM Video Overview 'Customize' alanına giden yönlendirme metni."""
    name = topic["name"]
    sname = subject["name"]
    branches = [b.get("label", "") for b in (topic.get("mindMap") or {}).get("branches") or []]
    outline = " → ".join(b for b in branches if b) or name
    traps = [t.get("trap", "") for t in (topic.get("tips") or [])][:3]
    subject_note = SUBJECT_NOTES.get(subject["slug"], "")

    parts = [
        f"HEDEF KİTLE: Türkiye'de LGS'ye hazırlanan 8. sınıf öğrencileri (13-14 yaş). "
        f"Tamamen Türkçe anlat; sade, sıcak ve cesaretlendirici bir öğretmen tonuyla öğrenciye "
        f"'sen' diye hitap et. Konuyu bilmeyen birine sıfırdan öğretiyormuş gibi anlat.",
        f"AMAÇ: '{sname} – {name}' konusunu kaynaktaki bilgilere sadık kalarak eksiksiz öğreten "
        f"bir konu anlatım videosu. Bu bir özet değil, tam bir ders.",
        "YAPI (bu sırayla):\n"
        "1) Açılış: Merak uyandıran kısa bir soru veya günlük hayattan bir örnekle konuya gir; "
        "'bu videoda şunları öğreneceksin' diyerek 3 maddelik hedef ver.\n"
        f"2) Kavramlar adım adım, şu sırayla: {outline}. Her kavram için: tanım → neden böyle? → "
        "somut örnek → ekranda kısa not. Kural ve formülleri ekranda büyük, net yaz; sayısal örnekle uygula.\n"
        "3) 'LGS'de nasıl sorulur?': Kaynaktaki örnek sorulardan en az 2 tanesini adım adım çöz; "
        "doğru şıkkın neden doğru, çeldiricilerin neden yanlış olduğunu açıkla.\n"
        "4) 'Dikkat! Sık yapılan hatalar': Kaynaktaki tuzak maddelerini yanlış-doğru karşılaştırmasıyla ver.\n"
        "5) Kapanış: 4-5 maddelik hızlı özet (ekranda liste) ve motive edici tek cümle.",
        "KURALLAR:\n"
        "- Yalnızca kaynaktaki bilgileri kullan; kaynakta olmayan bilgi, sayı, tarih veya örnek uydurma. "
        "MEB 8. sınıf müfredatı dışına çıkma.\n"
        "- Terim, tarih, formül ve sayıları kaynaktaki haliyle doğru söyle ve yaz; Türkçe karakterleri doğru kullan.\n"
        "- Her sahnede tek fikir; ekran yazıları kısa, büyük ve okunaklı olsun. Önemli kelimeleri vurgula.\n"
        f"- Tempo dengeli olsun; hedef süre {target_minutes} dakika. Gereksiz tekrar yapma ama kritik noktaları bir kez daha hatırlat.\n"
        "- Öğrenciyi aktif tut: ara ara 'sence cevap ne?' diye sor, kısa duraksa, sonra cevapla.",
    ]
    if subject_note:
        parts.append(f"DERSE ÖZEL: {subject_note}")
    if traps:
        parts.append("ÖZELLİKLE VURGULA: " + " | ".join(_clean(t) for t in traps if t))
    return "\n\n".join(parts)


def notebook_title(subject_slug: str, topic_id: str) -> str:
    """Otomasyonun NotebookLM'de oluşturduğu notebook başlığı (taranabilir)."""
    return f"Rehberim | {subject_slug}/{topic_id}"


def parse_notebook_title(title: str) -> str | None:
    """'Rehberim | ders/konu' başlığından anahtarı döndürür; değilse None."""
    m = re.match(r"^Rehberim \| ([a-z0-9-]+/[a-z0-9-]+)\s*$", (title or "").strip())
    return m.group(1) if m else None
