import type { SubjectContent } from "./types";

/**
 * İngilizce (LGS 8. sınıf) üniteleri.
 * Tema kelimeleri + temel dil bilgisi/kalıplar. Videolar sonra eklenecek.
 */
export const INGILIZCE: SubjectContent = {
  slug: "ingilizce",
  name: "İngilizce",
  topics: [
    {
      id: "friendship",
      name: `Friendship`,
      summary: `Davet etme, kabul/ret ve arkadaşlık sıfatları.`,
      youtubeId: "",
      mindMap: {
        center: `Friendship`,
        branches: [
          {
            label: `Davet ve Cevap`,
            sections: [
              { kind: "kural", content: `Davet: "Would you like to...?" / "Do you want to...?" Kabul: "I'd love to." Ret: "Sorry, I can't."` },
            ],
          },
          {
            label: `Arkadaş Sıfatları`,
            sections: [
              { kind: "tanim", content: `honest (dürüst), reliable (güvenilir), generous (cömert), supportive (destekleyici).` },
            ],
          },
          {
            label: `Örnek ve Tuzak`,
            sections: [
              { kind: "ornek", content: `"Would you like to come to my party?" – "I'd love to, thanks!"` },
              { kind: "tuzak", content: `Reddederken kaba "No" yerine kibarca "Sorry, I can't, I'm busy." denir.` },
            ],
          },
        ],
      },
      cards: [
        { front: `Davet kalıbı?`, back: `"Would you like to...?" / "Do you want to...?"` },
        { front: `"honest" Türkçesi?`, back: `dürüst.` },
        { front: `"reliable" Türkçesi?`, back: `güvenilir.` },
        { front: `Daveti kibarca reddetme?`, back: `"Sorry, I can't."` },
      ],
      article: `# Inviting (Davet Etme)
[kural] Davet: **"Would you like to...?"** veya **"Do you want to...?"** Kabul: **"I'd love to."** Kibar ret: **"Sorry, I can't."**
[örnek] "Would you like to come to the cinema?" – "I'd love to!" / "Sorry, I can't, I'm busy."

# Friendship Adjectives (Arkadaş Sıfatları)
[tanım] **honest** (dürüst), **reliable / trustworthy** (güvenilir), **generous** (cömert), **supportive** (destekleyici), **funny** (komik).

# İpucu
[tuzak] Daveti reddederken sadece "No" demek kabadır; **"Sorry, I can't..."** ile kibarca bir sebep eklenir.`,
      tips: [
        { trap: `Davet ve teklif kalıbı karıştırılır.`, wrong: `Daveti "Are you like to...?" diye yaparız.`, correct: `Doğrusu "Would you like to...?" kalıbıdır.` },
        { trap: `Reddetme kaba yapılır.`, wrong: `Reddederken sadece "No." denir.`, correct: `Kibarca "Sorry, I can't." ve bir sebep eklenir.` },
      ],
      quiz: [
        { question: `"Would you like to come to the cinema?" is used to...?`, options: [`make an invitation`, `apologize`, `thank someone`, `order food`], correctIndex: 0 },
        { question: `Which is a polite way to ACCEPT an invitation?`, options: [`I'd love to.`, `Sorry, I can't.`, `No way.`, `I don't care.`], correctIndex: 0 },
        { question: `"honest" Türkçesi nedir?`, options: [`dürüst`, `tembel`, `cömert`, `bencil`], correctIndex: 0 },
        { question: `Which word means "güvenilir"?`, options: [`reliable`, `lazy`, `rude`, `selfish`], correctIndex: 0 },
        { question: `Which word means "cömert"?`, options: [`generous`, `jealous`, `shy`, `angry`], correctIndex: 0 },
        { question: `How do you politely REFUSE an invitation?`, options: [`Sorry, I can't.`, `Yes, please.`, `Here you are.`, `You're welcome.`], correctIndex: 0 },
        { question: `"supportive" anlamı nedir?`, options: [`destekleyici`, `yalancı`, `korkak`, `kaba`], correctIndex: 0 },
        { question: `"Do you want to study together?" – "____, I have other plans."`, options: [`Sorry, I can't`, `I'd love to`, `Yes, sure`, `Of course`], correctIndex: 0 },
      ],
    },
    {
      id: "teen-life",
      name: `Teen Life`,
      summary: `Geniş zaman ve sıklık zarfları.`,
      youtubeId: "",
      mindMap: {
        center: `Teen Life`,
        branches: [
          {
            label: `Simple Present (Geniş Zaman)`,
            sections: [
              { kind: "kural", content: `Alışkanlık ve rutinler için. He/She/It ile fiile -s eklenir: "She plays."` },
              { kind: "tuzak", content: `3. tekil şahısta -s unutulur: "He go" yanlış → "He goes".` },
            ],
          },
          {
            label: `Sıklık Zarfları`,
            sections: [
              { kind: "kural", content: `always > usually > often > sometimes > never. Genelde fiilden önce gelir.` },
              { kind: "ornek", content: `"I usually get up at 7." "She never drinks coffee."` },
            ],
          },
        ],
      },
      cards: [
        { front: `Geniş zaman ne için kullanılır?`, back: `Alışkanlık ve rutinler için.` },
        { front: `He/She/It ile fiile ne eklenir?`, back: `-s (She plays, He goes).` },
        { front: `"always" ve "never" Türkçesi?`, back: `her zaman / asla.` },
        { front: `Sıklık zarfı cümlede nereye gelir?`, back: `Genelde özneden sonra, fiilden önce.` },
      ],
      article: `# Simple Present (Geniş Zaman)
[kural] Alışkanlık, rutin ve genel doğrular için kullanılır. **He/She/It** öznelerinde fiile **-s** eklenir: "She **plays** tennis."
[tuzak] 3. tekil şahısta -s **unutulmamalı:** "He **go**" yanlış → "He **goes**".

# Frequency Adverbs (Sıklık Zarfları)
[kural] **always** (her zaman) > **usually** (genellikle) > **often** (sık sık) > **sometimes** (bazen) > **never** (asla).
[örnek] "I **usually** get up at 7." "She **never** drinks coffee."
[soru] "She ___ goes to school." cümlesinde sıklık zarfı **özne ile fiil arasına** gelir.`,
      tips: [
        { trap: `3. tekilde -s unutulur.`, wrong: `"He play football."`, correct: `"He plays football." (He/She/It → fiil + s)` },
        { trap: `Sıklık zarfının yeri karıştırılır.`, wrong: `"I play sometimes games."`, correct: `"I sometimes play games." (zarf fiilden önce)` },
      ],
      quiz: [
        { question: `"She ___ to school every day."`, options: [`go`, `goes`, `going`, `gone`], correctIndex: 1 },
        { question: `"her zaman" için sıklık zarfı hangisidir?`, options: [`never`, `always`, `sometimes`, `rarely`], correctIndex: 1 },
        { question: `Simple present is used for...?`, options: [`habits/routines`, `actions happening now`, `past events`, `future plans`], correctIndex: 0 },
        { question: `Which sentence is correct?`, options: [`I sometimes play games.`, `I play sometimes games.`, `Sometimes plays I games.`, `I games play sometimes.`], correctIndex: 0 },
        { question: `"never" Türkçesi nedir?`, options: [`asla / hiç`, `her zaman`, `bazen`, `genellikle`], correctIndex: 0 },
        { question: `Which is correct?`, options: [`He watches TV.`, `He watch TV.`, `He watching TV.`, `He watch TVs.`], correctIndex: 0 },
        { question: `"usually" anlamı nedir?`, options: [`genellikle`, `asla`, `nadiren`, `şimdi`], correctIndex: 0 },
        { question: `"They ___ homework after school."`, options: [`does`, `do`, `doing`, `is`], correctIndex: 1 },
      ],
    },
    {
      id: "in-the-kitchen",
      name: `In the Kitchen`,
      summary: `Emir kipi ve miktar belirteçleri (quantifiers).`,
      youtubeId: "",
      mindMap: {
        center: `In the Kitchen`,
        branches: [
          {
            label: `Imperatives (Emir Kipi)`,
            sections: [
              { kind: "kural", content: `Tarif/talimat için yalın fiil: "Boil the water.", olumsuz: "Don't add sugar."` },
            ],
          },
          {
            label: `Quantifiers (Miktar)`,
            sections: [
              { kind: "kural", content: `a few/many → sayılabilir; a little/much → sayılamaz; some → olumlu; any → olumsuz ve sorularda.` },
              { kind: "tuzak", content: `"I don't have any eggs." (olumsuzda any). "Add some salt." (olumluda some).` },
            ],
          },
          {
            label: `Mutfak Fiilleri`,
            sections: [
              { kind: "tanim", content: `chop (doğramak), boil (kaynatmak), fry (kızartmak), pour (dökmek), slice (dilimlemek).` },
            ],
          },
        ],
      },
      cards: [
        { front: `Tarif talimatı hangi kiple verilir?`, back: `Emir kipi (yalın fiil): "Cut the onions."` },
        { front: `"some" ve "any" farkı?`, back: `some → olumlu; any → olumsuz/soru.` },
        { front: `Sayılamayan için "az": ?`, back: `a little (a little water).` },
        { front: `"boil" anlamı?`, back: `kaynatmak.` },
      ],
      article: `# Imperatives (Emir Kipi)
[kural] Tarif ve talimatlar **yalın fiille** verilir: "**Boil** the water.", "**Cut** the tomatoes." Olumsuz: "**Don't** add sugar."

# Quantifiers (Miktar Belirteçleri)
[kural] Sayılabilirler: **a few, many**. Sayılamazlar: **a little, much**. **some** → olumlu cümlede; **any** → olumsuz ve sorularda.
[örnek] "There are **a few** apples." "I don't have **any** milk." "Add **some** salt."
[tuzak] Olumsuz cümlede **some değil any:** "I don't have **any** eggs."

# Kitchen Verbs (Mutfak Fiilleri)
[tanım] **chop** (doğramak), **boil** (kaynatmak), **fry** (kızartmak), **pour** (dökmek), **slice** (dilimlemek).`,
      tips: [
        { trap: `some/any karıştırılır.`, wrong: `"I don't have some money."`, correct: `Olumsuzda "any": "I don't have any money."` },
        { trap: `Sayılabilir/sayılamaz miktarı karışır.`, wrong: `"a few water"`, correct: `Su sayılamaz: "a little water". "a few" sayılabilirlerle kullanılır.` },
      ],
      quiz: [
        { question: `Which one is an imperative sentence?`, options: [`Cut the tomatoes.`, `She cuts tomatoes.`, `Cutting tomatoes.`, `I cut tomatoes.`], correctIndex: 0 },
        { question: `"boil" means?`, options: [`kaynatmak`, `doğramak`, `kızartmak`, `dökmek`], correctIndex: 0 },
        { question: `"I don't have ___ milk."`, options: [`some`, `any`, `a few`, `many`], correctIndex: 1 },
        { question: `"There are ___ apples on the table."`, options: [`much`, `a little`, `a few`, `any more`], correctIndex: 2 },
        { question: `"chop" anlamı nedir?`, options: [`doğramak`, `kaynatmak`, `pişirmek`, `dökmek`], correctIndex: 0 },
        { question: `Which is a NEGATIVE imperative?`, options: [`Don't touch the oven.`, `Not touch oven.`, `You touch oven.`, `Touching oven.`], correctIndex: 0 },
        { question: `Which quantifier goes with uncountable "water"?`, options: [`many`, `a few`, `a little`, `number of`], correctIndex: 2 },
        { question: `"Add ___ salt to the soup." (biraz, olumlu)`, options: [`some`, `any`, `many`, `few`], correctIndex: 0 },
      ],
    },
    {
      id: "on-the-phone",
      name: `On the Phone`,
      summary: `Şimdiki zaman ve telefon kalıpları.`,
      youtubeId: "",
      mindMap: {
        center: `On the Phone`,
        branches: [
          {
            label: `Present Continuous (Şimdiki Zaman)`,
            sections: [
              { kind: "kural", content: `Şu an olan eylem: am/is/are + V-ing. "I am studying now."` },
              { kind: "tuzak", content: `be fiili ve -ing gerekir: "I studying" yanlış → "I am studying".` },
            ],
          },
          {
            label: `Telefon Kalıpları`,
            sections: [
              { kind: "kural", content: `"Can I speak to ...?", "Hold on, please.", "Who's calling?", "I'll call back."` },
              { kind: "ornek", content: `"What are you doing?" – "I'm watching a film."` },
            ],
          },
        ],
      },
      cards: [
        { front: `Present continuous yapısı?`, back: `am/is/are + V-ing (I am reading).` },
        { front: `"Hold on, please." anlamı?`, back: `Bekleyin lütfen.` },
        { front: `"hang up" anlamı?`, back: `telefonu kapatmak.` },
        { front: `Telefonda "Ali ile konuşabilir miyim?"`, back: `"Can I speak to Ali?"` },
      ],
      article: `# Present Continuous (Şimdiki Zaman)
[kural] Şu anda gerçekleşen eylem için: **am / is / are + fiil-ing**. "I **am studying** now."
[tuzak] **be** fiili ve **-ing** gereklidir: "I studying" yanlış → "I **am** study**ing**."

# Phone Language (Telefon Kalıpları)
[kural] **"Can I speak to ...?"** (... ile konuşabilir miyim?), **"Hold on, please."** (bekleyin), **"Who's calling?"** (kim arıyor?), **"I'll call back."** (sonra ararım).
[örnek] "What **are** you **doing**?" – "I**'m watching** a film."`,
      tips: [
        { trap: `be fiili unutulur.`, wrong: `"She talking on the phone."`, correct: `"She is talking on the phone." (am/is/are gerekli)` },
        { trap: `Geniş zaman ile şimdiki zaman karışır.`, wrong: `"Look! He plays now."`, correct: `Şu an için present continuous: "Look! He is playing now."` },
      ],
      quiz: [
        { question: `"She ___ on the phone now."`, options: [`talks`, `is talking`, `talk`, `talked`], correctIndex: 1 },
        { question: `"Can I speak to Ali?" is used...?`, options: [`on the phone`, `on a menu`, `on a map`, `on a ticket`], correctIndex: 0 },
        { question: `"Hold on, please." means?`, options: [`Bekleyin lütfen`, `Kapatın`, `Arayın`, `Konuşun`], correctIndex: 0 },
        { question: `Which is correct present continuous?`, options: [`I am reading.`, `I reading.`, `I reads.`, `I am read.`], correctIndex: 0 },
        { question: `"hang up" means?`, options: [`telefonu kapatmak`, `aramak`, `mesaj atmak`, `beklemek`], correctIndex: 0 },
        { question: `"What ___ you doing?"`, options: [`is`, `are`, `am`, `do`], correctIndex: 1 },
        { question: `"I'll call you back." means?`, options: [`Seni sonra arayacağım`, `Seni görüyorum`, `Hoşça kal`, `Teşekkürler`], correctIndex: 0 },
        { question: `"They ___ playing football right now."`, options: [`is`, `are`, `am`, `be`], correctIndex: 1 },
      ],
    },
    {
      id: "the-internet",
      name: `The Internet`,
      summary: `İnternet kelimeleri ve sebep-sonuç (because/so).`,
      youtubeId: "",
      mindMap: {
        center: `The Internet`,
        branches: [
          {
            label: `İnternet Kelimeleri`,
            sections: [
              { kind: "tanim", content: `download (indirmek), upload (yüklemek), browse (gezinmek), online (çevrim içi), password (şifre).` },
            ],
          },
          {
            label: `Sebep-Sonuç (because / so)`,
            sections: [
              { kind: "kural", content: `because → sebep (çünkü); so → sonuç (bu yüzden).` },
              { kind: "ornek", content: `"I use it because it is useful." "It was late, so I logged off."` },
            ],
          },
        ],
      },
      cards: [
        { front: `"download" / "upload" anlamı?`, back: `indirmek / yüklemek.` },
        { front: `"because" ve "so" farkı?`, back: `because → sebep; so → sonuç.` },
        { front: `"browse" anlamı?`, back: `(internette) gezinmek.` },
        { front: `Güvenli internet ipucu?`, back: `Güçlü şifre kullan (strong password).` },
      ],
      article: `# Internet Vocabulary (Kelimeler)
[tanım] **download** (indirmek), **upload** (yüklemek), **browse** (gezinmek), **online** (çevrim içi), **password** (şifre), **log in / log off** (giriş/çıkış).

# Cause and Effect (Sebep-Sonuç)
[kural] **because** → sebep (çünkü). **so** → sonuç (bu yüzden).
[örnek] "I like the internet **because** it is useful." "It was late, **so** I logged off."
[tuzak] **because** sebep, **so** sonuç bildirir; ikisi karıştırılmamalı.

# Güvenlik
[ipucu] Güvenli kalmak için **strong password** kullan, kişisel bilgini paylaşma.`,
      tips: [
        { trap: `because / so karıştırılır.`, wrong: `"It was raining because I stayed home."`, correct: `Sonuç için "so": "It was raining, so I stayed home."` },
        { trap: `download / upload karışır.`, wrong: `"download = yüklemek"`, correct: `download = indirmek; upload = yüklemek.` },
      ],
      quiz: [
        { question: `"download" means?`, options: [`indirmek`, `yüklemek`, `silmek`, `açmak`], correctIndex: 0 },
        { question: `"I like the internet ___ it is useful."`, options: [`because`, `so`, `but`, `or`], correctIndex: 0 },
        { question: `"browse" anlamı nedir?`, options: [`(internette) gezinmek`, `kapatmak`, `yazmak`, `silmek`], correctIndex: 0 },
        { question: `"It was raining, ___ I stayed home."`, options: [`because`, `so`, `but`, `and`], correctIndex: 1 },
        { question: `"upload" means?`, options: [`yüklemek`, `indirmek`, `aramak`, `silmek`], correctIndex: 0 },
        { question: `A safe internet tip is...?`, options: [`Use a strong password.`, `Share your password.`, `Click every link.`, `Give your address.`], correctIndex: 0 },
        { question: `"online" Türkçesi nedir?`, options: [`çevrim içi`, `çevrim dışı`, `bozuk`, `kapalı`], correctIndex: 0 },
        { question: `"because" shows...?`, options: [`sebep (reason)`, `sonuç`, `zaman`, `yer`], correctIndex: 0 },
      ],
    },
    {
      id: "adventures",
      name: `Adventures`,
      summary: `Tavsiye (should/shouldn't) ve duygu kelimeleri.`,
      youtubeId: "",
      mindMap: {
        center: `Adventures`,
        branches: [
          {
            label: `Tavsiye (should / shouldn't)`,
            sections: [
              { kind: "kural", content: `should (-meli) tavsiye; shouldn't (-memeli). Sonrasında yalın fiil gelir.` },
              { kind: "tuzak", content: `should'dan sonra "to" gelmez: "You should to go" yanlış → "You should go".` },
            ],
          },
          {
            label: `Duygu Kelimeleri`,
            sections: [
              { kind: "tanim", content: `excited (heyecanlı), scared (korkmuş), nervous (gergin), bored (sıkılmış).` },
              { kind: "ornek", content: `"You shouldn't climb alone." "We should take water."` },
            ],
          },
        ],
      },
      cards: [
        { front: `"should" ne için kullanılır?`, back: `Tavsiye (-meli/-malı). "You should rest."` },
        { front: `should'dan sonra fiil nasıl gelir?`, back: `Yalın hâlde (to almadan): "should go".` },
        { front: `"scared" / "excited" anlamı?`, back: `korkmuş / heyecanlı.` },
        { front: `Olumsuz tavsiye?`, back: `shouldn't: "You shouldn't smoke."` },
      ],
      article: `# Giving Advice (Tavsiye Verme)
[kural] **should** (-meli) tavsiye; **shouldn't** (-memeli) olumsuz tavsiye. Sonrasında **yalın fiil** gelir.
[örnek] "You **should** rest." "You **shouldn't** climb alone."
[tuzak] should'dan sonra **"to" gelmez:** "You should **to** go" yanlış → "You should **go**."

# Feelings (Duygular)
[tanım] **excited** (heyecanlı), **scared** (korkmuş), **nervous** (gergin), **bored** (sıkılmış), **brave** (cesur).`,
      tips: [
        { trap: `should + to hatası.`, wrong: `"You should to drink water."`, correct: `"You should drink water." (to yok)` },
        { trap: `Duygu kelimeleri karışır.`, wrong: `"scared = heyecanlı"`, correct: `scared = korkmuş; excited = heyecanlı.` },
      ],
      quiz: [
        { question: `"You ___ drink water when you hike." (tavsiye)`, options: [`should`, `shouldn't`, `don't`, `didn't`], correctIndex: 0 },
        { question: `"should" is followed by...?`, options: [`base verb (go)`, `to + verb`, `verb + ing`, `verb + ed`], correctIndex: 0 },
        { question: `"scared" means?`, options: [`korkmuş`, `mutlu`, `yorgun`, `aç`], correctIndex: 0 },
        { question: `Advice NOT to do something:`, options: [`You shouldn't smoke.`, `You should smoke.`, `You smoke.`, `Smoking you.`], correctIndex: 0 },
        { question: `"excited" anlamı nedir?`, options: [`heyecanlı`, `üzgün`, `kızgın`, `sıkılmış`], correctIndex: 0 },
        { question: `Which sentence is correct?`, options: [`You should rest.`, `You should to rest.`, `You should resting.`, `You shoulds rest.`], correctIndex: 0 },
        { question: `"nervous" means?`, options: [`gergin`, `cesur`, `güçlü`, `hızlı`], correctIndex: 0 },
        { question: `Before a dangerous adventure you ___ tell your family.`, options: [`should`, `shouldn't`, `never`, `don't`], correctIndex: 0 },
      ],
    },
    {
      id: "tourism",
      name: `Tourism`,
      summary: `Geçmiş zaman (Simple Past) ve turizm kelimeleri.`,
      youtubeId: "",
      mindMap: {
        center: `Tourism`,
        branches: [
          {
            label: `Simple Past (Geçmiş Zaman)`,
            sections: [
              { kind: "kural", content: `Bitmiş eylem: düzenli fiil + -ed (visited). Düzensizler değişir: go→went, see→saw.` },
              { kind: "tuzak", content: `"did" varken fiil yalın kalır: "Did you went?" yanlış → "Did you go?"` },
            ],
          },
          {
            label: `Olumsuz / Soru`,
            sections: [
              { kind: "kural", content: `Olumsuz/soruda "did/didn't": "Did you visit?", "I didn't go."` },
            ],
          },
          {
            label: `Turizm Kelimeleri`,
            sections: [
              { kind: "tanim", content: `sightseeing (gezme), souvenir (hatıra eşyası), tour guide (tur rehberi), journey (yolculuk).` },
            ],
          },
        ],
      },
      cards: [
        { front: `Düzenli fiil geçmiş hâli?`, back: `Fiil + -ed (visit → visited).` },
        { front: `go ve see geçmişi?`, back: `went / saw.` },
        { front: `Geçmiş olumsuz?`, back: `didn't + yalın fiil (I didn't go).` },
        { front: `"souvenir" anlamı?`, back: `hatıra eşyası.` },
      ],
      article: `# Simple Past (Geçmiş Zaman)
[kural] Geçmişte bitmiş eylemler için: düzenli fiillere **-ed** (visit → **visited**). Düzensiz fiiller değişir: **go → went**, **see → saw**, **take → took**.
[örnek] "I **visited** Istanbul last year." "They **took** a lot of photos."

# Negative & Question (Olumsuz / Soru)
[kural] Olumsuz ve soruda **did/didn't** kullanılır ve fiil **yalın** kalır: "**Did** you **go**?", "I **didn't go**."
[tuzak] "Did you **went**?" yanlış → "Did you **go**?"

# Tourism Vocabulary
[tanım] **sightseeing** (gezi), **souvenir** (hatıra eşyası), **tour guide** (tur rehberi), **accommodation** (konaklama), **journey** (yolculuk).`,
      tips: [
        { trap: `did ile fiil çekimlenir.`, wrong: `"Did you saw the museum?"`, correct: `"Did you see the museum?" (did + yalın fiil)` },
        { trap: `Düzensiz fiiller -ed alır sanılır.`, wrong: `"goed", "seed"`, correct: `Doğrusu: went, saw (düzensiz fiiller).` },
      ],
      quiz: [
        { question: `What is the past form of "go"?`, options: [`goed`, `went`, `gone`, `going`], correctIndex: 1 },
        { question: `"I ___ Istanbul last year."`, options: [`visit`, `visited`, `visits`, `visiting`], correctIndex: 1 },
        { question: `Which is a correct NEGATIVE past sentence?`, options: [`I didn't go.`, `I don't went.`, `I not go.`, `I no went.`], correctIndex: 0 },
        { question: `"souvenir" means?`, options: [`hatıra eşyası`, `bilet`, `harita`, `otel`], correctIndex: 0 },
        { question: `Which question is correct?`, options: [`Did you see the museum?`, `Did you saw the museum?`, `Do you saw it?`, `You saw?`], correctIndex: 0 },
        { question: `Past form of "see"?`, options: [`seed`, `saw`, `seen`, `sawed`], correctIndex: 1 },
        { question: `"tour guide" means?`, options: [`tur rehberi`, `yolcu`, `bilet`, `çanta`], correctIndex: 0 },
        { question: `"They ___ a lot of photos." (past, take)`, options: [`take`, `took`, `takes`, `taken`], correctIndex: 1 },
      ],
    },
    {
      id: "chores",
      name: `Chores`,
      summary: `Zorunluluk (have to / has to) ve ev işleri.`,
      youtubeId: "",
      mindMap: {
        center: `Chores`,
        branches: [
          {
            label: `Zorunluluk (have to / has to)`,
            sections: [
              { kind: "kural", content: `have to / has to: zorunda olmak. He/She/It → has to. "She has to wash the dishes."` },
              { kind: "tuzak", content: `3. tekil: "He have to" yanlış → "He has to".` },
            ],
          },
          {
            label: `Olumsuz / Soru`,
            sections: [
              { kind: "kural", content: `don't/doesn't have to (zorunda değil). "Do you have to...?"` },
            ],
          },
          {
            label: `Ev İşleri`,
            sections: [
              { kind: "tanim", content: `do the dishes (bulaşık), make the bed (yatağı topla), take out the rubbish (çöp), set the table (sofra).` },
            ],
          },
        ],
      },
      cards: [
        { front: `"have to" anlamı?`, back: `zorunda olmak.` },
        { front: `He/She/It için hangisi?`, back: `has to.` },
        { front: `"make the bed" anlamı?`, back: `yatağı toplamak.` },
        { front: `Zorunlu değil nasıl denir?`, back: `don't/doesn't have to.` },
      ],
      article: `# Obligation (Zorunluluk)
[kural] **have to / has to** = zorunda olmak. **He/She/It → has to**: "She **has to** clean her room."
[tuzak] 3. tekilde "He **have** to" yanlış → "He **has to**."

# Negative & Question
[kural] Olumsuz: **don't / doesn't have to** (zorunda değil). Soru: **"Do/Does ... have to...?"**
[örnek] "I **don't have to** work today." "**Does** she **have to** study?"

# Household Chores (Ev İşleri)
[tanım] **do the dishes** (bulaşık yıkamak), **make the bed** (yatağı toplamak), **take out the rubbish** (çöpü çıkarmak), **set the table** (sofrayı kurmak), **sweep the floor** (yeri süpürmek).`,
      tips: [
        { trap: `has to / have to karışır.`, wrong: `"He have to study."`, correct: `"He has to study." (He/She/It → has to)` },
        { trap: `Olumsuzda yapı karışır.`, wrong: `"He hasn't to go."`, correct: `"He doesn't have to go."` },
      ],
      quiz: [
        { question: `"She ___ clean her room."`, options: [`have to`, `has to`, `having to`, `to has`], correctIndex: 1 },
        { question: `"have to" means?`, options: [`zorunda olmak`, `istemek`, `sevmek`, `yapabilmek`], correctIndex: 0 },
        { question: `"make the bed" means?`, options: [`yatağı toplamak`, `yemek yapmak`, `bulaşık yıkamak`, `çöp atmak`], correctIndex: 0 },
        { question: `"I ___ have to work today." (zorunda değilim)`, options: [`don't`, `doesn't`, `not`, `am not`], correctIndex: 0 },
        { question: `"He ___ to do his homework."`, options: [`have`, `has`, `having`, `haves`], correctIndex: 1 },
        { question: `"take out the rubbish" means?`, options: [`çöpü çıkarmak`, `yerleri süpürmek`, `sofra kurmak`, `bulaşık yıkamak`], correctIndex: 0 },
        { question: `"___ you have to wear a uniform?"`, options: [`Do`, `Does`, `Are`, `Is`], correctIndex: 0 },
        { question: `"set the table" means?`, options: [`sofrayı kurmak`, `masayı kırmak`, `yemek pişirmek`, `temizlemek`], correctIndex: 0 },
      ],
    },
    {
      id: "science",
      name: `Science`,
      summary: `İcatlar, edilgen geçmiş (was/were + V3).`,
      youtubeId: "",
      mindMap: {
        center: `Science`,
        branches: [
          {
            label: `Bilim Kelimeleri`,
            sections: [
              { kind: "tanim", content: `invention (icat), inventor (mucit), experiment (deney), discover (keşfetmek), scientist (bilim insanı).` },
            ],
          },
          {
            label: `Edilgen Geçmiş (Passive)`,
            sections: [
              { kind: "kural", content: `was/were + fiilin 3. hâli (V3). "The phone was invented by Bell."` },
              { kind: "tuzak", content: `"by" yapanı (özneyi) gösterir: "...invented by Edison."` },
            ],
          },
        ],
      },
      cards: [
        { front: `"invention" / "inventor"?`, back: `icat / mucit.` },
        { front: `Edilgen geçmiş yapısı?`, back: `was/were + V3 (was invented).` },
        { front: `Edilgende "by" neyi gösterir?`, back: `İşi yapanı (özneyi).` },
        { front: `"discover" anlamı?`, back: `keşfetmek.` },
      ],
      article: `# Science Vocabulary
[tanım] **invention** (icat), **inventor** (mucit), **experiment** (deney), **discover** (keşfetmek), **scientist** (bilim insanı).

# Passive Past (Edilgen Geçmiş)
[kural] Bir şeyin yapıldığını söylemek için: **was / were + fiilin 3. hâli (V3)**. "The phone **was invented** by Bell."
[örnek] "Penicillin **was discovered** by Fleming." "Light bulbs **were invented** in the 19th century."
[tuzak] Çoğul/tekil uyumu: tek nesne → **was**, çoğul → **were**. "by" işi **yapanı** gösterir.`,
      tips: [
        { trap: `was/were uyumu karışır.`, wrong: `"Bulbs was invented..."`, correct: `Çoğulda "were": "Bulbs were invented..."` },
        { trap: `Edilgende V3 yerine yalın fiil.`, wrong: `"It was invent by..."`, correct: `"It was invented by..." (V3 gerekli)` },
      ],
      quiz: [
        { question: `"invention" means?`, options: [`icat`, `mucit`, `deney`, `keşif`], correctIndex: 0 },
        { question: `"The telephone ___ invented by Bell."`, options: [`was`, `is`, `were`, `did`], correctIndex: 0 },
        { question: `"inventor" means?`, options: [`mucit`, `icat`, `bilim`, `deney`], correctIndex: 0 },
        { question: `"discover" means?`, options: [`keşfetmek`, `icat etmek`, `yıkmak`, `ölçmek`], correctIndex: 0 },
        { question: `"Light bulbs ___ invented in the 19th century."`, options: [`was`, `were`, `is`, `are`], correctIndex: 1 },
        { question: `In a passive sentence, "by" shows...?`, options: [`the doer (yapan)`, `the time`, `the place`, `the price`], correctIndex: 0 },
        { question: `"experiment" means?`, options: [`deney`, `sonuç`, `kitap`, `okul`], correctIndex: 0 },
        { question: `"Penicillin was ___ by Fleming."`, options: [`discovered`, `discover`, `discovers`, `discovering`], correctIndex: 0 },
      ],
    },
    {
      id: "natural-forces",
      name: `Natural Forces`,
      summary: `Doğa olayları, gelecek tahmini (will/might) ve koşul.`,
      youtubeId: "",
      mindMap: {
        center: `Natural Forces`,
        branches: [
          {
            label: `Doğa Olayları`,
            sections: [
              { kind: "tanim", content: `earthquake (deprem), flood (sel), storm (fırtına), drought (kuraklık), avalanche (çığ).` },
            ],
          },
          {
            label: `Gelecek Tahmini (will / might)`,
            sections: [
              { kind: "kural", content: `will → kesin tahmin; might → olasılık. Sonrasında yalın fiil gelir.` },
              { kind: "tuzak", content: `will'den sonra "to" gelmez: "It will to rain" yanlış → "It will rain".` },
            ],
          },
          {
            label: `Koşul (If)`,
            sections: [
              { kind: "kural", content: `If + present, ... will... : "If it rains, we will stay home."` },
            ],
          },
        ],
      },
      cards: [
        { front: `"earthquake" / "flood"?`, back: `deprem / sel.` },
        { front: `will ve might farkı?`, back: `will → kesin tahmin; might → olasılık.` },
        { front: `Koşul cümlesi yapısı?`, back: `If + present, ... will + yalın fiil.` },
        { front: `"drought" anlamı?`, back: `kuraklık.` },
      ],
      article: `# Natural Disasters (Doğa Olayları)
[tanım] **earthquake** (deprem), **flood** (sel), **storm** (fırtına), **drought** (kuraklık), **avalanche** (çığ), **wildfire** (orman yangını).

# Predictions (Gelecek Tahmini)
[kural] **will** → daha kesin tahmin; **might** → olasılık (belki). Sonrasında **yalın fiil** gelir.
[örnek] "It **will** rain tomorrow." "It **might** snow tonight."
[tuzak] will'den sonra "to" gelmez: "It will **to** rain" yanlış → "It **will rain**."

# Conditional (Koşul - If)
[kural] **If + geniş zaman, ... will + yalın fiil:** "**If** it **rains**, we **will stay** home."`,
      tips: [
        { trap: `will + to hatası.`, wrong: `"It will to snow."`, correct: `"It will snow." (to yok)` },
        { trap: `will / might farkı atlanır.`, wrong: `might = kesinlik`, correct: `might = olasılık (belki); will = daha kesin tahmin.` },
      ],
      quiz: [
        { question: `"earthquake" means?`, options: [`deprem`, `sel`, `fırtına`, `yangın`], correctIndex: 0 },
        { question: `"It ___ rain tomorrow." (kesin tahmin)`, options: [`will`, `did`, `was`, `does`], correctIndex: 0 },
        { question: `"flood" means?`, options: [`sel`, `deprem`, `çığ`, `kuraklık`], correctIndex: 0 },
        { question: `"might" shows...?`, options: [`olasılık (ihtimal)`, `kesinlik`, `geçmiş`, `emir`], correctIndex: 0 },
        { question: `"If it is sunny, we ___ go to the beach."`, options: [`will`, `did`, `were`, `would have`], correctIndex: 0 },
        { question: `"drought" means?`, options: [`kuraklık`, `sel`, `fırtına`, `deprem`], correctIndex: 0 },
        { question: `Which future sentence is correct?`, options: [`It will snow.`, `It will to snow.`, `It will snowing.`, `It wills snow.`], correctIndex: 0 },
        { question: `"storm" means?`, options: [`fırtına`, `deprem`, `kuraklık`, `çığ`], correctIndex: 0 },
      ],
    },
  ],
};
