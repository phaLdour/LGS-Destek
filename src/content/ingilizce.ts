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
        { question: `"Would you like to come to the cinema?" is used to...?`, options: [`make an invitation`, `apologize to a guest`, `thank your teacher`, `order food politely`], correctIndex: 0 },
        { question: `Which is a polite way to ACCEPT an invitation?`, options: [`I'd love to.`, `Sorry, I can't.`, `No way.`, `I don't care.`], correctIndex: 0 },
        { question: `"honest" Türkçesi nedir?`, options: [`dürüst`, `tembel`, `cömert`, `bencil`], correctIndex: 0 },
        { question: `Which word means "güvenilir"?`, options: [`reliable`, `lazy`, `rude`, `selfish`], correctIndex: 0 },
        { question: `Which word means "cömert"?`, options: [`generous`, `jealous`, `shy`, `angry`], correctIndex: 0 },
        { question: `How do you politely REFUSE an invitation?`, options: [`Sorry, I can't.`, `Yes, please.`, `Here you are.`, `You're welcome.`], correctIndex: 0 },
        { question: `"supportive" anlamı nedir?`, options: [`destekleyici`, `güvenilmeyen`, `umursamayan`, `hoşgörüsüz`], correctIndex: 0 },
        { question: `"Do you want to study together?" – "____, I have other plans."`, options: [`Sorry, I can't`, `Yes, I'd love to`, `Sure, let's go`, `Of course, I can`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"honest" Türkçesi nedir?`, options: [`dürüst`, `tembel`, `cömert`, `bencil`], correctIndex: 0 },
        { question: `"reliable" Türkçesi nedir?`, options: [`güvenilir`, `dikkatsiz`, `sorumsuz`, `sabırsız`], correctIndex: 0 },
        { question: `"generous" Türkçesi nedir?`, options: [`cömert`, `kıskanç`, `utangaç`, `kızgın`], correctIndex: 0 },
        { question: `"supportive" Türkçesi nedir?`, options: [`destekleyici`, `güvenilmeyen`, `umursamayan`, `hoşgörüsüz`], correctIndex: 0 },
        { question: `"selfish" Türkçesi nedir?`, options: [`bencil`, `cömert`, `dürüst`, `tembel`], correctIndex: 0 },
        { question: `"jealous" Türkçesi nedir?`, options: [`kıskanç`, `mutlu`, `üzgün`, `kızgın`], correctIndex: 0 },
        { question: `"shy" Türkçesi nedir?`, options: [`utangaç`, `cesur`, `kızgın`, `mutlu`], correctIndex: 0 },
        { question: `"brave" Türkçesi nedir?`, options: [`cesur`, `korkak`, `tembel`, `bencil`], correctIndex: 0 },
        { question: `"funny" Türkçesi nedir?`, options: [`komik`, `üzgün`, `kızgın`, `ciddi`], correctIndex: 0 },
        { question: `"polite" Türkçesi nedir?`, options: [`kibar`, `kaba`, `yalancı`, `bencil`], correctIndex: 0 },
        { question: `"rude" Türkçesi nedir?`, options: [`kaba`, `kibar`, `nazik`, `dürüst`], correctIndex: 0 },
        { question: `"lazy" Türkçesi nedir?`, options: [`tembel`, `çalışkan`, `cesur`, `dürüst`], correctIndex: 0 },
        { question: `"hardworking" Türkçesi nedir?`, options: [`çalışkan`, `tembel`, `kızgın`, `kıskanç`], correctIndex: 0 },
        { question: `"Would you like to come to my party?" hangi amaçla söylenir?`, options: [`Davet etmek`, `Özür dilemek`, `Teşekkür etmek`, `Sipariş vermek`], correctIndex: 0 },
        { question: `"How about going to the cinema?" hangi anlama gelir?`, options: [`Sinemaya gitmeye ne dersin?`, `Sinemaya gittin mi?`, `Sinemada ne yapıyorsun?`, `Sinema açık mı?`], correctIndex: 0 },
        { question: `"I'd love to" ne anlama gelir?`, options: [`Çok isterim`, `Reddetmek`, `Bilmiyorum`, `Belki`], correctIndex: 0 },
        { question: `"I'd love to, but..." ne anlama gelir?`, options: [`Kibarca reddetme`, `Kesin kabul etme`, `Soru sorma yolu`, `Teşekkür etme`], correctIndex: 0 },
        { question: `"Sorry, I can't" nasıl bir cevaptır?`, options: [`Kibarca reddetme`, `Sevinerek kabul`, `Nazikçe davet`, `Soru sorma`], correctIndex: 0 },
        { question: `"Sure, why not?" nasıl bir cevaptır?`, options: [`Kabul`, `Reddetme`, `Soru`, `Şüphe`], correctIndex: 0 },
        { question: `"Why don't we go shopping?" hangi amaçla söylenir?`, options: [`Öneri yapmak`, `Soru sormak`, `Şikayet etmek`, `Yardım istemek`], correctIndex: 0 },
        { question: `"What about a coffee?" hangi amaçla söylenir?`, options: [`Öneri yapmak`, `Sipariş vermek`, `Şikayet`, `Selamlaşma`], correctIndex: 0 },
        { question: `Bir arkadaşa "Do you want to come with us?" diye sorulduğunda kabul cevabı?`, options: [`Yes, I'd love to.`, `No, I'm busy now.`, `Maybe next time.`, `Sorry, I can't.`], correctIndex: 0 },
        { question: `"He is a true friend." cümlesindeki "true" ne anlama gelir?`, options: [`gerçek`, `yalancı`, `kaba`, `mutlu`], correctIndex: 0 },
        { question: `"My best friend is very ___. He always helps me." boşluğa hangisi gelir?`, options: [`helpful`, `selfish`, `rude`, `mean`], correctIndex: 0 },
        { question: `"I trust her because she is ___" boşluğa hangisi gelir?`, options: [`honest`, `dishonest`, `lazy`, `rude`], correctIndex: 0 },
        { question: `"Friendship" Türkçesi nedir?`, options: [`arkadaşlık`, `akrabalık`, `komşuluk`, `öğretmenlik`], correctIndex: 0 },
        { question: `"close friend" ne anlama gelir?`, options: [`yakın arkadaş`, `uzak arkadaş`, `eski arkadaş`, `yeni arkadaş`], correctIndex: 0 },
        { question: `"He always tells the truth, he is ___" boşluğa?`, options: [`honest`, `lazy`, `rude`, `selfish`], correctIndex: 0 },
        { question: `Pasta partisine davet için en uygun ifade hangisidir?`, options: [`Would you like to come to my birthday party?`, `Why are you eating cake in the kitchen?`, `What is your favourite birthday present?`, `How old is your sister this year?`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi olumlu kişilik sıfatıdır?`, options: [`kind`, `selfish`, `rude`, `lazy`], correctIndex: 0 },
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
        { question: `"usually" anlamı nedir?`, options: [`genellikle`, `hiçbir zaman`, `çok nadiren`, `hemen şimdi`], correctIndex: 0 },
        { question: `"They ___ homework after school."`, options: [`does`, `do`, `doing`, `is`], correctIndex: 1 },
      ],
      quickQuestions: [
        { question: `"always" Türkçesi nedir?`, options: [`her zaman`, `hiçbir zaman`, `ara sıra`, `çok nadiren`], correctIndex: 0 },
        { question: `"never" Türkçesi nedir?`, options: [`asla / hiç`, `her zaman`, `bazen`, `genellikle`], correctIndex: 0 },
        { question: `"usually" Türkçesi nedir?`, options: [`genellikle`, `hiçbir zaman`, `çok nadiren`, `hemen şimdi`], correctIndex: 0 },
        { question: `"sometimes" Türkçesi nedir?`, options: [`bazen`, `her zaman`, `asla`, `nadiren`], correctIndex: 0 },
        { question: `"rarely" Türkçesi nedir?`, options: [`nadiren`, `her zaman`, `genellikle`, `bazen`], correctIndex: 0 },
        { question: `"often" Türkçesi nedir?`, options: [`sıklıkla`, `asla`, `nadiren`, `bazen`], correctIndex: 0 },
        { question: `Simple Present Tense ne için kullanılır?`, options: [`Alışkanlıklar ve rutinler`, `Şu an devam eden eylemler`, `Geçmişte biten olaylar`, `Gelecekteki planlar`], correctIndex: 0 },
        { question: `"He ___ TV every evening." boşluğa hangisi gelir?`, options: [`watches`, `watch`, `watching`, `watched`], correctIndex: 0 },
        { question: `"She ___ to school every day." boşluğa hangisi gelir?`, options: [`goes`, `go`, `going`, `gone`], correctIndex: 0 },
        { question: `"They ___ homework after school." boşluğa hangisi gelir?`, options: [`do`, `does`, `doing`, `is`], correctIndex: 0 },
        { question: `"I ___ football on Sundays." boşluğa hangisi gelir?`, options: [`play`, `plays`, `playing`, `played`], correctIndex: 0 },
        { question: `"He ___ get up early." (olumsuz) boşluğa?`, options: [`doesn't`, `don't`, `isn't`, `aren't`], correctIndex: 0 },
        { question: `"They ___ like coffee." (olumsuz) boşluğa?`, options: [`don't`, `doesn't`, `isn't`, `aren't`], correctIndex: 0 },
        { question: `"___ she like music?" (soru) boşluğa?`, options: [`Does`, `Have`, `Were`, `Are`], correctIndex: 0 },
        { question: `"___ they live in Ankara?" (soru) boşluğa?`, options: [`Do`, `Does`, `Is`, `Are`], correctIndex: 0 },
        { question: `"My brother ___ school by bus." boşluğa?`, options: [`goes to`, `go to`, `going to`, `gone to`], correctIndex: 0 },
        { question: `"How often" sorusuna ne ile cevap verilir?`, options: [`Sıklık zarfları`, `Tarih ifadeleri`, `Yer zarfları`, `Sayı sözcükleri`], correctIndex: 0, explanation: `Sıklık zarfları (always, usually, sometimes...)` },
        { question: `"What time do you get up?" sorusu neyi sorar?`, options: [`Kalkış saatini`, `Yaşadığı yeri`, `Konuşan kişiyi`, `Sevilen yemeği`], correctIndex: 0 },
        { question: `"hobby" Türkçesi nedir?`, options: [`hobi`, `ev`, `okul`, `iş`], correctIndex: 0 },
        { question: `"free time" Türkçesi nedir?`, options: [`boş zaman`, `iş zamanı`, `ders zamanı`, `gece`], correctIndex: 0 },
        { question: `"weekend" Türkçesi nedir?`, options: [`hafta sonu`, `hafta içi`, `yarın`, `ay`], correctIndex: 0 },
        { question: `"weekday" Türkçesi nedir?`, options: [`hafta içi`, `hafta sonu`, `bayram`, `gece`], correctIndex: 0 },
        { question: `Hangisi bir sport (spor) ismidir?`, options: [`football`, `cooking`, `reading`, `painting`], correctIndex: 0 },
        { question: `Hangisi bir activity (etkinlik) ismidir?`, options: [`watching TV`, `tomato soup`, `school desk`, `big kitchen`], correctIndex: 0 },
        { question: `"I ___ love coffee." cümlesinde "love" için hangi yardımcı fiil ile soru/olumsuz yapılır?`, options: [`do/does`, `am/is/are`, `have/has`, `will`], correctIndex: 0 },
        { question: `"Tom usually ___ to bed at 11 pm." boşluğa?`, options: [`goes`, `go`, `going`, `gone`], correctIndex: 0 },
        { question: `"My parents ___ TV every night." boşluğa?`, options: [`watch`, `watches`, `watching`, `watched`], correctIndex: 0 },
        { question: `"He ___ his teeth twice a day." boşluğa?`, options: [`brushes`, `brush`, `brushing`, `brushed`], correctIndex: 0 },
        { question: `"every Sunday" hangi zamanı belirtir?`, options: [`Simple Present`, `Present Continuous`, `Past Simple`, `Future`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi yanlıştır?`, options: [`She do her homework.`, `She does her homework.`, `She is doing her homework.`, `She did her homework.`], correctIndex: 0 },
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
        { question: `Which is a NEGATIVE imperative?`, options: [`Don't touch the oven.`, `Not touch the hot oven.`, `You touch the oven now.`, `Touching the hot oven.`], correctIndex: 0 },
        { question: `Which quantifier goes with uncountable "water"?`, options: [`many`, `a few`, `a little`, `number of`], correctIndex: 2 },
        { question: `"Add ___ salt to the soup." (biraz, olumlu)`, options: [`some`, `any`, `many`, `few`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"boil" Türkçesi nedir?`, options: [`kaynatmak`, `doğramak`, `kızartmak`, `dökmek`], correctIndex: 0 },
        { question: `"chop" Türkçesi nedir?`, options: [`doğramak`, `kaynatmak`, `pişirmek`, `dökmek`], correctIndex: 0 },
        { question: `"fry" Türkçesi nedir?`, options: [`kızartmak`, `kaynatmak`, `dondurmak`, `eritmek`], correctIndex: 0 },
        { question: `"bake" Türkçesi nedir?`, options: [`fırında pişirmek`, `suda kaynatmak`, `yağda kızartmak`, `buzda dondurmak`], correctIndex: 0 },
        { question: `"slice" Türkçesi nedir?`, options: [`dilimlemek`, `karıştırmak`, `pişirmek`, `dökmek`], correctIndex: 0 },
        { question: `"mix" Türkçesi nedir?`, options: [`karıştırmak`, `doğramak`, `pişirmek`, `dilimlemek`], correctIndex: 0 },
        { question: `"add" Türkçesi nedir?`, options: [`eklemek`, `çıkarmak`, `kesmek`, `pişirmek`], correctIndex: 0 },
        { question: `"pour" Türkçesi nedir?`, options: [`dökmek`, `karıştırmak`, `pişirmek`, `dilimlemek`], correctIndex: 0 },
        { question: `"recipe" Türkçesi nedir?`, options: [`tarif`, `mutfak`, `tabak`, `tencere`], correctIndex: 0 },
        { question: `"ingredient" Türkçesi nedir?`, options: [`malzeme`, `tabak`, `tencere`, `tarif`], correctIndex: 0 },
        { question: `Sayılabilen (countable) isimle "many" kullanılır mı?`, options: [`Evet`, `Hayır`, `Bazen`, `Sadece some ile`], correctIndex: 0 },
        { question: `Sayılamayan (uncountable) isimle hangisi kullanılır?`, options: [`much`, `many`, `a few`, `number of`], correctIndex: 0 },
        { question: `"How many" sayılabilen mi sayılamayan mı?`, options: [`Sayılabilen`, `Sayılamayan`, `İkisi de`, `Hiçbiri`], correctIndex: 0 },
        { question: `"How much" sayılabilen mi sayılamayan mı?`, options: [`Sayılamayan`, `Sayılabilen`, `İkisi de`, `Hiçbiri`], correctIndex: 0 },
        { question: `"There is ___ water in the bottle." boşluğa (biraz)?`, options: [`some`, `any`, `many`, `few`], correctIndex: 0 },
        { question: `"Is there ___ sugar?" boşluğa (soru)?`, options: [`any`, `some`, `much`, `many`], correctIndex: 0 },
        { question: `"I don't have ___ milk." boşluğa (olumsuz)?`, options: [`any`, `some`, `many`, `a few`], correctIndex: 0 },
        { question: `"There are ___ apples." boşluğa (birkaç)?`, options: [`a few`, `a little`, `much`, `any`], correctIndex: 0 },
        { question: `"a little" hangi isimle kullanılır?`, options: [`Sayılamayan`, `Sayılabilen`, `Çoğul`, `Tek isim`], correctIndex: 0, explanation: `Sayılamayan (water, sugar)` },
        { question: `"a few" hangi isimle kullanılır?`, options: [`Sayılabilen çoğul`, `Sayılamayan isim`, `Tekil isimler`, `Sıfat ve zarflar`], correctIndex: 0, explanation: `Sayılabilen çoğul (apples, books)` },
        { question: `Imperative (emir cümlesi) örneği?`, options: [`Wash your hands!`, `He washes hands.`, `Washing hands.`, `Did wash hands?`], correctIndex: 0 },
        { question: `"Don't touch the oven!" hangi yapıda?`, options: [`Negatif emir`, `Soru`, `Olumsuz Simple Present`, `Geçmiş`], correctIndex: 0 },
        { question: `"First, ___ the onions." (önce soğanları doğra)`, options: [`chop`, `boil`, `fry`, `bake`], correctIndex: 0 },
        { question: `"Then ___ them in the pan." (sonra tavada kızart)`, options: [`fry`, `chop`, `pour`, `slice`], correctIndex: 0 },
        { question: `"vegetable" Türkçesi nedir?`, options: [`sebze`, `meyve`, `et`, `süt`], correctIndex: 0 },
        { question: `"fruit" Türkçesi nedir?`, options: [`meyve`, `sebze`, `et`, `tatlı`], correctIndex: 0 },
        { question: `"meal" Türkçesi nedir?`, options: [`yemek`, `tabak`, `çatal`, `mutfak`], correctIndex: 0 },
        { question: `"breakfast" Türkçesi nedir?`, options: [`kahvaltı`, `öğle yemeği`, `akşam yemeği`, `atıştırmalık`], correctIndex: 0 },
        { question: `"dinner" Türkçesi nedir?`, options: [`akşam yemeği`, `kahvaltı`, `öğle yemeği`, `çay`], correctIndex: 0 },
        { question: `Aşağıdakilerden hangisi cooking method (pişirme yöntemi)dir?`, options: [`boil`, `apple`, `bread`, `spoon`], correctIndex: 0 },
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
        { question: `"She ___ on the phone now."`, options: [`am talking`, `is talking`, `are talking`, `was talking`], correctIndex: 1 },
        { question: `"Can I speak to Ali?" is used...?`, options: [`on the phone`, `on a menu`, `on a map`, `on a ticket`], correctIndex: 0 },
        { question: `"Hold on, please." means?`, options: [`Bekleyin lütfen`, `Telefonu kapatın`, `Yarın beni arayın`, `Şimdi konuşun`], correctIndex: 0 },
        { question: `Which is correct present continuous?`, options: [`I am reading.`, `I reading now.`, `I reads books.`, `I am read it.`], correctIndex: 0 },
        { question: `"hang up" means?`, options: [`telefonu kapatmak`, `telefonla aramak`, `mesaj göndermek`, `hatta beklemek`], correctIndex: 0 },
        { question: `"What ___ you doing?"`, options: [`was`, `are`, `has`, `did`], correctIndex: 1 },
        { question: `"I'll call you back." means?`, options: [`Seni sonra arayacağım`, `Seni şimdi arıyorum`, `Sana teşekkür ederim`, `Şimdi hoşça kal diyorum`], correctIndex: 0 },
        { question: `"They ___ playing football right now."`, options: [`was`, `are`, `has`, `did`], correctIndex: 1 },
      ],
      quickQuestions: [
        { question: `"Hello, this is Ali." telefonda nasıl bir ifadedir?`, options: [`Kendini tanıtma`, `Vedalaşma sözü`, `Bilgi sorma`, `Sipariş verme`], correctIndex: 0 },
        { question: `"Can I speak to Ali?" ne anlama gelir?`, options: [`Ali ile konuşabilir miyim?`, `Ali'yi tanıyor musunuz?`, `Ali şu anda nerede oturuyor?`, `Ali buraya ne zaman geldi?`], correctIndex: 0 },
        { question: `"Hold on, please." ne anlama gelir?`, options: [`Bekleyin lütfen`, `Telefonu kapatın`, `Şimdi konuşun`, `Yarın beni arayın`], correctIndex: 0 },
        { question: `"hang up" ne anlama gelir?`, options: [`Telefonu kapatmak`, `Telefonla aramak`, `Mesaj göndermek`, `Hatta beklemek`], correctIndex: 0 },
        { question: `"call back" ne anlama gelir?`, options: [`Geri aramak`, `Cevap vermemek`, `Kapatmak`, `Bağlanmak`], correctIndex: 0 },
        { question: `"I'll call you back." ne anlama gelir?`, options: [`Seni sonra arayacağım`, `Seni şimdi arıyorum`, `Sana teşekkür ederim`, `Şimdi hoşça kal diyorum`], correctIndex: 0 },
        { question: `"answer the phone" ne anlama gelir?`, options: [`Telefonu açmak`, `Telefonu kapatmak`, `Telefonla aramak`, `Mesaj göndermek`], correctIndex: 0 },
        { question: `"leave a message" ne anlama gelir?`, options: [`Mesaj bırakmak`, `Mesaj okumak`, `Telefon etmek`, `Kapatmak`], correctIndex: 0 },
        { question: `Present Continuous Tense'in kullanım amacı nedir?`, options: [`Şu anda olan eylem`, `Her gün yapılan iş`, `Geçmişte biten olay`, `Gelecekteki plan`], correctIndex: 0 },
        { question: `"I am reading a book now." cümlesi hangi tense'dir?`, options: [`Present Continuous`, `Simple Present Tense`, `Simple Past Tense`, `Simple Future Tense`], correctIndex: 0 },
        { question: `Present Continuous yapısı nasıldır?`, options: [`am/is/are + fiil-ing`, `do/does + yalın fiil`, `did + yalın fiil`, `will + yalın fiil`], correctIndex: 0 },
        { question: `"He ___ playing football right now." boşluğa?`, options: [`is`, `are`, `am`, `was`], correctIndex: 0 },
        { question: `"They ___ playing football right now." boşluğa?`, options: [`are`, `is`, `am`, `was`], correctIndex: 0 },
        { question: `"I ___ studying now." boşluğa?`, options: [`am`, `is`, `are`, `was`], correctIndex: 0 },
        { question: `"What ___ you doing?" boşluğa?`, options: [`are`, `was`, `has`, `did`], correctIndex: 0 },
        { question: `"She ___ TV at the moment." boşluğa?`, options: [`is watching`, `am watching`, `are watching`, `was watching`], correctIndex: 0 },
        { question: `Present Continuous için anahtar zarflar hangileridir?`, options: [`now, at the moment, right now`, `always, usually, every day`, `yesterday, last week, ago`, `tomorrow, next week, soon`], correctIndex: 0 },
        { question: `"He is sleeping." cümlesinde "sleeping" hangi -ing fiilidir?`, options: [`sleep + ing`, `sleep + ed`, `sleep + s`, `sleep`], correctIndex: 0 },
        { question: `"run" fiilinin -ing hâli nedir?`, options: [`running`, `runing`, `runs`, `runned`], correctIndex: 0 },
        { question: `"swim" fiilinin -ing hâli nedir?`, options: [`swimming`, `swiming`, `swimed`, `swimmed`], correctIndex: 0 },
        { question: `"write" fiilinin -ing hâli nedir?`, options: [`writing`, `writeing`, `writed`, `writes`], correctIndex: 0 },
        { question: `Telefon görüşmesinde "Who's calling?" ne anlama gelir?`, options: [`Kim arıyor?`, `Nasılsın?`, `Nerelisin?`, `Sen kimsin?`], correctIndex: 0 },
        { question: `"Wrong number" ne anlama gelir?`, options: [`Yanlış numara`, `Doğru numara`, `Açık numara`, `Yeni numara`], correctIndex: 0 },
        { question: `"phone call" ne anlama gelir?`, options: [`Telefon görüşmesi`, `Telefon faturası`, `Telefon kılıfı`, `Telefon defteri`], correctIndex: 0 },
        { question: `"text message" ne anlama gelir?`, options: [`Mesaj`, `Konuşma`, `Sesli mesaj`, `Video`], correctIndex: 0 },
        { question: `"voicemail" ne anlama gelir?`, options: [`Sesli mesaj`, `Yazılı mesaj`, `Video mesaj`, `E-posta`], correctIndex: 0 },
        { question: `"app" hangi sözcüğün kısaltmasıdır?`, options: [`application`, `apple`, `apprentice`, `applaud`], correctIndex: 0 },
        { question: `"smartphone" Türkçesi nedir?`, options: [`akıllı telefon`, `eski telefon`, `tablet`, `bilgisayar`], correctIndex: 0 },
        { question: `"missed call" ne anlama gelir?`, options: [`Cevapsız arama`, `Gelen arama`, `Giden arama`, `Hatalı arama`], correctIndex: 0 },
        { question: `"He is talking on the phone." cümlesi hangi tense'dedir?`, options: [`Present Continuous`, `Simple Present Tense`, `Simple Past Tense`, `Simple Future Tense`], correctIndex: 0 },
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
        { question: `"I like the internet ___ it is useful."`, options: [`because`, `so that`, `but also`, `or else`], correctIndex: 0 },
        { question: `"browse" anlamı nedir?`, options: [`gezinmek`, `kapatmak`, `yazmak`, `silmek`], correctIndex: 0 },
        { question: `"It was raining, ___ I stayed home."`, options: [`because`, `so`, `but`, `and`], correctIndex: 1 },
        { question: `"upload" means?`, options: [`yüklemek`, `indirmek`, `aramak`, `silmek`], correctIndex: 0 },
        { question: `A safe internet tip is...?`, options: [`Use a strong password.`, `Share your password.`, `Click every link.`, `Give your address.`], correctIndex: 0 },
        { question: `"online" Türkçesi nedir?`, options: [`çevrim içi`, `çevrim dışı`, `bozuk`, `kapalı`], correctIndex: 0 },
        { question: `"because" shows...?`, options: [`sebep`, `sonuç`, `zaman`, `yer`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"download" Türkçesi nedir?`, options: [`indirmek`, `yüklemek`, `silmek`, `aramak`], correctIndex: 0 },
        { question: `"upload" Türkçesi nedir?`, options: [`yüklemek`, `indirmek`, `silmek`, `aramak`], correctIndex: 0 },
        { question: `"browse" Türkçesi nedir?`, options: [`gezinmek`, `kapatmak`, `yazmak`, `silmek`], correctIndex: 0 },
        { question: `"online" Türkçesi nedir?`, options: [`çevrim içi`, `çevrim dışı`, `bozuk`, `kapalı`], correctIndex: 0 },
        { question: `"offline" Türkçesi nedir?`, options: [`çevrim dışı`, `çevrim içi`, `açık`, `meşgul`], correctIndex: 0 },
        { question: `"website" Türkçesi nedir?`, options: [`web sitesi`, `arama motoru`, `gizli şifre`, `kısa mesaj`], correctIndex: 0 },
        { question: `"password" Türkçesi nedir?`, options: [`şifre`, `kullanıcı adı`, `e-posta`, `mesaj`], correctIndex: 0 },
        { question: `"username" Türkçesi nedir?`, options: [`kullanıcı adı`, `gizli şifre`, `e-posta adresi`, `kısa mesaj`], correctIndex: 0 },
        { question: `"social media" Türkçesi nedir?`, options: [`sosyal medya`, `sesli arama`, `kısa mesaj`, `e-posta`], correctIndex: 0 },
        { question: `"search engine" Türkçesi nedir?`, options: [`arama motoru`, `tarayıcı`, `web sayfası`, `dosya`], correctIndex: 0 },
        { question: `"browser" Türkçesi nedir?`, options: [`tarayıcı`, `şifre`, `e-posta`, `arama motoru`], correctIndex: 0 },
        { question: `"because" hangi anlam ilişkisini kurar?`, options: [`Sebep`, `Sonuç`, `Zaman`, `Yer`], correctIndex: 0 },
        { question: `"so" hangi anlam ilişkisini kurar?`, options: [`Sonuç`, `Sebep`, `Karşıtlık`, `Yer`], correctIndex: 0 },
        { question: `"but" hangi anlam ilişkisini kurar?`, options: [`Karşıtlık ilgisi`, `Sebep bildirme`, `Sonuç bildirme`, `Zaman bildirme`], correctIndex: 0 },
        { question: `"and" hangi anlam ilişkisini kurar?`, options: [`Ekleme`, `Sebep`, `Karşıtlık`, `Sonuç`], correctIndex: 0 },
        { question: `"I like the internet ___ it is useful." boşluğa?`, options: [`because`, `so that`, `but also`, `or else`], correctIndex: 0 },
        { question: `"It was raining, ___ I stayed home." boşluğa?`, options: [`so`, `because`, `but`, `and`], correctIndex: 0 },
        { question: `"I like coffee ___ I don't like tea." boşluğa?`, options: [`but`, `so`, `because`, `and`], correctIndex: 0 },
        { question: `"I like apples ___ oranges." boşluğa?`, options: [`and`, `so`, `because`, `but`], correctIndex: 0 },
        { question: `Güvenli internet kullanımı için aşağıdakilerden hangisi yapılmalıdır?`, options: [`Güçlü şifre kullan`, `Şifreni paylaş`, `Her linki tıkla`, `Adresini ver`], correctIndex: 0 },
        { question: `İnterneti kullanırken yapılmaması gereken hangisidir?`, options: [`Kişisel bilgileri paylaşmak`, `Güçlü şifre kullanmak`, `Antivirüs kullanmak`, `Şüpheli linkleri tıklamamak`], correctIndex: 0 },
        { question: `"share" Türkçesi nedir?`, options: [`paylaşmak`, `silmek`, `kapatmak`, `aramak`], correctIndex: 0 },
        { question: `"chat" Türkçesi nedir?`, options: [`sohbet etmek`, `aramak`, `oyun oynamak`, `e-posta`], correctIndex: 0 },
        { question: `"video call" Türkçesi nedir?`, options: [`görüntülü arama`, `sesli görüşme`, `e-posta adresi`, `yazılı sohbet`], correctIndex: 0 },
        { question: `"e-mail" Türkçesi nedir?`, options: [`e-posta`, `telefon`, `sohbet`, `internet`], correctIndex: 0 },
        { question: `"link" Türkçesi nedir?`, options: [`bağlantı`, `internet`, `tarayıcı`, `parola`], correctIndex: 0 },
        { question: `"app" hangi sözcüğün kısaltmasıdır?`, options: [`application`, `apple`, `apprentice`, `applaud`], correctIndex: 0 },
        { question: `"connect" Türkçesi nedir?`, options: [`bağlanmak`, `ayrılmak`, `silmek`, `kapatmak`], correctIndex: 0 },
        { question: `"disconnect" Türkçesi nedir?`, options: [`bağlantıyı kesmek`, `internete bağlanmak`, `telefonla aramak`, `sohbet etmek`], correctIndex: 0 },
        { question: `"Wi-Fi" ne tür bağlantıdır?`, options: [`Kablosuz internet`, `Kablolu internet`, `Telefon`, `Radyo`], correctIndex: 0 },
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
        { question: `"should" is followed by...?`, options: [`base verb`, `to + verb`, `verb + ing`, `verb + ed`], correctIndex: 0 },
        { question: `"scared" means?`, options: [`korkmuş`, `mutlu`, `yorgun`, `aç`], correctIndex: 0 },
        { question: `Advice NOT to do something:`, options: [`You shouldn't smoke.`, `You should smoke.`, `You smoke.`, `Smoking you.`], correctIndex: 0 },
        { question: `"excited" anlamı nedir?`, options: [`heyecanlı`, `üzgün`, `kızgın`, `sıkılmış`], correctIndex: 0 },
        { question: `Which sentence is correct?`, options: [`You should rest.`, `You should to rest.`, `You should resting.`, `You shoulds rest.`], correctIndex: 0 },
        { question: `"nervous" means?`, options: [`gergin`, `cesur`, `güçlü`, `hızlı`], correctIndex: 0 },
        { question: `Before a dangerous adventure you ___ tell your family.`, options: [`should`, `shouldn't`, `never`, `don't`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"should" hangi anlama gelir?`, options: [`-meli/-malı`, `Zorunluluk`, `Gelecek`, `Geçmiş`], correctIndex: 0 },
        { question: `"should" sonra hangi fiil hâli gelir?`, options: [`Base verb`, `to + verb`, `verb + ing`, `verb + ed`], correctIndex: 0 },
        { question: `"shouldn't" ne anlama gelir?`, options: [`Yapmamalısın`, `Yapmalısın`, `Yapacaksın`, `Yaptın`], correctIndex: 0 },
        { question: `"You should drink water." cümlesinin Türkçesi nedir?`, options: [`Su içmelisin`, `Su içmemelisin`, `Su içtin mi?`, `Su içeceksin`], correctIndex: 0 },
        { question: `"You shouldn't smoke." cümlesinin Türkçesi nedir?`, options: [`Sigara içmemelisin`, `Sigara içmelisin`, `Sigara içtin mi?`, `Sigara iç`], correctIndex: 0 },
        { question: `"Should I go?" hangi yapıdır?`, options: [`Soru cümlesi`, `Olumlu cümle`, `Emir`, `Geçmiş`], correctIndex: 0, explanation: `Soru cümlesi (tavsiye istemek)` },
        { question: `Hangi cümle doğrudur?`, options: [`You should rest.`, `You should to rest.`, `You should resting.`, `You shoulds rest.`], correctIndex: 0 },
        { question: `"scared" Türkçesi nedir?`, options: [`korkmuş`, `mutlu`, `yorgun`, `aç`], correctIndex: 0 },
        { question: `"excited" Türkçesi nedir?`, options: [`heyecanlı`, `üzgün`, `kızgın`, `sıkılmış`], correctIndex: 0 },
        { question: `"nervous" Türkçesi nedir?`, options: [`gergin`, `cesur`, `güçlü`, `hızlı`], correctIndex: 0 },
        { question: `"thrilled" Türkçesi nedir?`, options: [`çok heyecanlı`, `çok üzgün`, `çok sıkılmış`, `biraz bezgin`], correctIndex: 0 },
        { question: `"brave" Türkçesi nedir?`, options: [`cesur`, `korkak`, `kızgın`, `mutlu`], correctIndex: 0 },
        { question: `"adventure" Türkçesi nedir?`, options: [`macera`, `oyun`, `şarkı`, `kitap`], correctIndex: 0 },
        { question: `"dangerous" Türkçesi nedir?`, options: [`tehlikeli`, `eğlenceli`, `heyecanlı`, `zahmetli`], correctIndex: 0 },
        { question: `"safe" Türkçesi nedir?`, options: [`güvenli`, `tehlikeli`, `kolay`, `zor`], correctIndex: 0 },
        { question: `"exciting" Türkçesi nedir?`, options: [`heyecan verici`, `çok sıkıcı`, `üzüntü verici`, `can sıkıcı`], correctIndex: 0 },
        { question: `Aşağıdaki maceralardan hangisi extreme sport (ekstrem spor)?`, options: [`bungee jumping`, `playing chess`, `reading a book`, `cooking dinner`], correctIndex: 0 },
        { question: `"rafting" hangi macera türüdür?`, options: [`Su sporu`, `Kara sporu`, `Hava sporu`, `Oyun`], correctIndex: 0 },
        { question: `"hiking" Türkçesi nedir?`, options: [`yürüyüş yapma`, `koşmak`, `yüzmek`, `bisiklete binmek`], correctIndex: 0 },
        { question: `"camping" Türkçesi nedir?`, options: [`kamp yapma`, `yüzme yapma`, `kitap okuma`, `yemek yapma`], correctIndex: 0 },
        { question: `"scuba diving" Türkçesi nedir?`, options: [`tüplü dalış`, `yüzmek`, `koşmak`, `tırmanmak`], correctIndex: 0 },
        { question: `"rock climbing" Türkçesi nedir?`, options: [`kaya tırmanışı`, `yüzme yarışması`, `kayak yapma`, `koşu yarışı`], correctIndex: 0 },
        { question: `"skydiving" Türkçesi nedir?`, options: [`paraşütle atlama`, `denizde yüzme`, `parkta koşma`, `kayaya tırmanma`], correctIndex: 0 },
        { question: `"You ___ be careful when climbing." boşluğa (tavsiye)?`, options: [`should`, `shouldn't`, `don't`, `aren't`], correctIndex: 0 },
        { question: `"You ___ swim alone in the sea." (olumsuz tavsiye)`, options: [`shouldn't`, `should be`, `does not`, `had better`], correctIndex: 0 },
        { question: `Tehlikeli macera öncesi yapılması gereken?`, options: [`Aileye haber vermek`, `Yalnız gitmek`, `Hiç bilmemek`, `Telefonu kapatmak`], correctIndex: 0 },
        { question: `"helmet" Türkçesi nedir?`, options: [`kask`, `şapka`, `bot`, `eldiven`], correctIndex: 0 },
        { question: `"life jacket" Türkçesi nedir?`, options: [`can yeleği`, `kışlık mont`, `spor şortu`, `sırt çantası`], correctIndex: 0 },
        { question: `"first aid kit" Türkçesi nedir?`, options: [`ilk yardım çantası`, `okul sırt çantası`, `spor malzemesi`, `para cüzdanı`], correctIndex: 0 },
        { question: `"safety rules" Türkçesi nedir?`, options: [`güvenlik kuralları`, `trafik yasakları`, `oyun kuralları`, `yazılı talimatlar`], correctIndex: 0 },
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
        { question: `"souvenir" means?`, options: [`hatıra eşyası`, `uçak bileti`, `şehir haritası`, `otel odası`], correctIndex: 0 },
        { question: `Which question is correct?`, options: [`Did you see the museum?`, `Did you saw the museum?`, `Do you saw it?`, `You saw?`], correctIndex: 0 },
        { question: `Past form of "see"?`, options: [`seed`, `saw`, `seen`, `sawed`], correctIndex: 1 },
        { question: `"tour guide" means?`, options: [`tur rehberi`, `genç yolcu`, `uçak bileti`, `el çantası`], correctIndex: 0 },
        { question: `"They ___ a lot of photos." (past, take)`, options: [`take`, `took`, `takes`, `taken`], correctIndex: 1 },
      ],
      quickQuestions: [
        { question: `Simple Past Tense'in kullanım amacı nedir?`, options: [`Geçmişte olmuş bitmiş eylemler`, `Şu anda devam eden eylemler`, `Her gün yapılan alışkanlıklar`, `Gelecekteki planlar`], correctIndex: 0 },
        { question: `Düzenli (regular) fiillerin past hâli nasıl yapılır?`, options: [`-ed eklenir`, `-ing eklenir`, `-s eklenir`, `Değişmez`], correctIndex: 0 },
        { question: `"visit" fiilinin past hâli?`, options: [`visited`, `visit`, `visits`, `visiting`], correctIndex: 0 },
        { question: `"play" fiilinin past hâli?`, options: [`played`, `play`, `plays`, `playing`], correctIndex: 0 },
        { question: `"go" fiilinin past hâli?`, options: [`went`, `goed`, `goes`, `gone`], correctIndex: 0 },
        { question: `"see" fiilinin past hâli?`, options: [`saw`, `seed`, `seen`, `sawed`], correctIndex: 0 },
        { question: `"take" fiilinin past hâli?`, options: [`took`, `take`, `takes`, `taken`], correctIndex: 0 },
        { question: `"buy" fiilinin past hâli?`, options: [`bought`, `buyed`, `buys`, `buying`], correctIndex: 0 },
        { question: `"eat" fiilinin past hâli?`, options: [`ate`, `eat`, `eaten`, `eated`], correctIndex: 0 },
        { question: `"have" fiilinin past hâli?`, options: [`had`, `have`, `has`, `having`], correctIndex: 0 },
        { question: `"I ___ Istanbul last year." boşluğa?`, options: [`visited`, `visit`, `visits`, `visiting`], correctIndex: 0 },
        { question: `"We ___ a lot of photos yesterday." boşluğa (take)?`, options: [`took`, `take`, `takes`, `taken`], correctIndex: 0 },
        { question: `"She ___ to the museum." boşluğa (go, past)?`, options: [`went`, `goes`, `going`, `gone`], correctIndex: 0 },
        { question: `Past Simple olumsuz nasıl yapılır?`, options: [`didn't + base verb`, `wasn't + base verb`, `doesn't + base verb`, `not + base verb`], correctIndex: 0 },
        { question: `"I didn't go." cümlesi doğru mu?`, options: [`Evet`, `Hayır, didn't went olmalı`, `Hayır, don't go olmalı`, `Hayır, no go olmalı`], correctIndex: 0 },
        { question: `Past Simple soru nasıl yapılır?`, options: [`Did + özne + base verb?`, `Do + özne + verb?`, `Was + özne + verb?`, `Were + özne + verb?`], correctIndex: 0 },
        { question: `"Did you see the museum?" doğru mu?`, options: [`Evet`, `Hayır, did saw olmalı`, `Hayır, do saw olmalı`, `Hayır, were olmalı`], correctIndex: 0 },
        { question: `"souvenir" Türkçesi nedir?`, options: [`hatıra eşyası`, `uçak bileti`, `şehir haritası`, `otel odası`], correctIndex: 0 },
        { question: `"tour guide" Türkçesi nedir?`, options: [`tur rehberi`, `genç yolcu`, `uçak bileti`, `el çantası`], correctIndex: 0 },
        { question: `"tourist" Türkçesi nedir?`, options: [`turist`, `rehber`, `şoför`, `garson`], correctIndex: 0 },
        { question: `"luggage" Türkçesi nedir?`, options: [`bavul`, `çanta`, `cüzdan`, `kutusu`], correctIndex: 0 },
        { question: `"passport" Türkçesi nedir?`, options: [`pasaport`, `uçak bileti`, `vize belgesi`, `kimlik kartı`], correctIndex: 0 },
        { question: `"flight" Türkçesi nedir?`, options: [`uçuş`, `tren yolculuğu`, `gemi`, `otobüs`], correctIndex: 0 },
        { question: `"airport" Türkçesi nedir?`, options: [`havalimanı`, `tren istasyonu`, `otobüs durağı`, `liman`], correctIndex: 0 },
        { question: `"hotel" Türkçesi nedir?`, options: [`otel`, `hastane`, `okul`, `tiyatro`], correctIndex: 0 },
        { question: `"museum" Türkçesi nedir?`, options: [`müze`, `tiyatro`, `sinema`, `park`], correctIndex: 0 },
        { question: `"last year" hangi tense ile kullanılır?`, options: [`Simple Past`, `Present Continuous`, `Simple Present`, `Future`], correctIndex: 0 },
        { question: `"yesterday" hangi tense ile kullanılır?`, options: [`Simple Past`, `Present Continuous`, `Simple Present`, `Future`], correctIndex: 0 },
        { question: `"ago" sözcüğü hangi tense ile kullanılır?`, options: [`Simple Past`, `Future`, `Present Perfect`, `Simple Present`], correctIndex: 0 },
        { question: `"two days ago" ne anlama gelir?`, options: [`iki gün önce`, `iki gün sonra`, `iki gün boyunca`, `iki güne kadar`], correctIndex: 0 },
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
        { question: `"have to" means?`, options: [`zorunda olmak`, `izin istemek`, `yapmak istemek`, `yapabilmek`], correctIndex: 0 },
        { question: `"make the bed" means?`, options: [`yatağı toplamak`, `yemek yapmak`, `bulaşık yıkamak`, `çöp atmak`], correctIndex: 0 },
        { question: `"I ___ have to work today." (zorunda değilim)`, options: [`don't`, `doesn't`, `not`, `am not`], correctIndex: 0 },
        { question: `"He ___ to do his homework."`, options: [`have`, `has`, `having`, `haves`], correctIndex: 1 },
        { question: `"take out the rubbish" means?`, options: [`çöpü çıkarmak`, `yerleri süpürmek`, `sofra kurmak`, `bulaşık yıkamak`], correctIndex: 0 },
        { question: `"___ you have to wear a uniform?"`, options: [`Do`, `Does`, `Are`, `Is`], correctIndex: 0 },
        { question: `"set the table" means?`, options: [`sofrayı kurmak`, `masayı kırmak`, `yemek pişirmek`, `temizlemek`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"have to" ne anlama gelir?`, options: [`Zorunda olmak`, `İzin istemek`, `Yapmak istemek`, `Yapabilmek`], correctIndex: 0 },
        { question: `"has to" hangi öznelerle kullanılır?`, options: [`He, she, it`, `I, you, we, they`, `Sadece I`, `Sadece you`], correctIndex: 0 },
        { question: `"He ___ do his homework." boşluğa?`, options: [`has to`, `have to`, `having to`, `haves to`], correctIndex: 0 },
        { question: `"They ___ wake up early." boşluğa?`, options: [`have to`, `has to`, `having to`, `haves to`], correctIndex: 0 },
        { question: `"don't have to" ne anlama gelir?`, options: [`Zorunda değilim`, `Bunu yapmalıyım`, `Yapmak isterim`, `Yapmayı severim`], correctIndex: 0 },
        { question: `"I ___ have to work today." (zorunda değilim) boşluğa?`, options: [`don't`, `doesn't`, `not`, `am not`], correctIndex: 0 },
        { question: `"She ___ have to cook." (zorunda değil) boşluğa?`, options: [`doesn't`, `don't`, `haven't`, `aren't`], correctIndex: 0 },
        { question: `"Do you ___ to clean your room?" boşluğa?`, options: [`have`, `has`, `having`, `haves`], correctIndex: 0 },
        { question: `"Does he ___ to study?" boşluğa?`, options: [`have`, `has`, `having`, `haves`], correctIndex: 0 },
        { question: `"make the bed" Türkçesi nedir?`, options: [`yatağı toplamak`, `yemek yapmak`, `bulaşık yıkamak`, `çöp atmak`], correctIndex: 0 },
        { question: `"do the dishes" Türkçesi nedir?`, options: [`bulaşık yıkamak`, `yemek yapmak`, `çamaşır yıkamak`, `süpürmek`], correctIndex: 0 },
        { question: `"do the laundry" Türkçesi nedir?`, options: [`çamaşır yıkamak`, `bulaşık yıkamak`, `yer süpürmek`, `çöp atmak`], correctIndex: 0 },
        { question: `"sweep the floor" Türkçesi nedir?`, options: [`yeri süpürmek`, `yeri silmek`, `tozunu almak`, `çöpü atmak`], correctIndex: 0 },
        { question: `"mop the floor" Türkçesi nedir?`, options: [`yeri silmek`, `yeri süpürmek`, `tozunu almak`, `çöpü atmak`], correctIndex: 0 },
        { question: `"take out the rubbish" Türkçesi nedir?`, options: [`Çöpü çıkarmak`, `Yerleri süpürmek`, `Sofra kurmak`, `Bulaşık yıkamak`], correctIndex: 0 },
        { question: `"set the table" Türkçesi nedir?`, options: [`sofrayı kurmak`, `masayı kırmak`, `yemek pişirmek`, `temizlemek`], correctIndex: 0 },
        { question: `"clear the table" Türkçesi nedir?`, options: [`sofrayı toplamak`, `sofrayı kurmak`, `masayı silmek`, `bulaşık yıkamak`], correctIndex: 0 },
        { question: `"vacuum the carpet" Türkçesi nedir?`, options: [`halıyı süpürmek`, `halıyı yıkamak`, `halıyı silkelemek`, `halıyı katlamak`], correctIndex: 0 },
        { question: `"iron the clothes" Türkçesi nedir?`, options: [`Çamaşır ütülemek`, `Çamaşır yıkamak`, `Çamaşır asmak`, `Çamaşır toplamak`], correctIndex: 0 },
        { question: `"hang the clothes" Türkçesi nedir?`, options: [`çamaşır asmak`, `çamaşır yıkamak`, `çamaşır ütülemek`, `çamaşır katlamak`], correctIndex: 0 },
        { question: `"chore" Türkçesi nedir?`, options: [`ev işi`, `oyun`, `ders`, `tatil`], correctIndex: 0 },
        { question: `"housework" Türkçesi nedir?`, options: [`ev işi`, `ev ödevi`, `okul`, `tamir`], correctIndex: 0 },
        { question: `"help" Türkçesi nedir?`, options: [`yardım etmek`, `engellemek`, `çalışmak`, `oynamak`], correctIndex: 0 },
        { question: `"share" (paylaşmak) burada hangi anlama gelir?`, options: [`İşi paylaşmak`, `Şarkı söylemek`, `Yardım istemek`, `Konuşmak`], correctIndex: 0 },
        { question: `"You ___ wash your hands." (zorunluluk)?`, options: [`have to`, `has to`, `having to`, `would`], correctIndex: 0 },
        { question: `"At school, students ___ wear uniforms." boşluğa?`, options: [`have to`, `has to`, `having to`, `does`], correctIndex: 0 },
        { question: `Üçüncü tekil şahıs için "have to" nasıl olur?`, options: [`has to`, `have to`, `had to`, `having to`], correctIndex: 0, explanation: `has to (he/she/it has to)` },
        { question: `"I ___ to school by bus." cümlesinde "go" fiilini past hâle koyalım: ___?`, options: [`went`, `goed`, `goes`, `going`], correctIndex: 0 },
        { question: `Aşağıdaki ev işi (chore) ifadelerinden hangisi temizlik ile ilgilidir?`, options: [`vacuum the carpet`, `play video games`, `read a comic book`, `watch a TV series`], correctIndex: 0 },
        { question: `Aşağıdaki ifadelerden hangisi bir ev işidir?`, options: [`Make the bed`, `Watch TV`, `Read a book`, `Play games`], correctIndex: 0 },
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
        { question: `"Light bulbs ___ invented in the 19th century."`, options: [`was`, `were`, `are`, `have`], correctIndex: 1 },
        { question: `In a passive sentence, "by" shows...?`, options: [`the doer`, `the time`, `the place`, `the price`], correctIndex: 0 },
        { question: `"experiment" means?`, options: [`deney`, `sonuç`, `kitap`, `okul`], correctIndex: 0 },
        { question: `"Penicillin was ___ by Fleming."`, options: [`discovered`, `discover`, `discovers`, `discovering`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `Past Passive (geçmiş edilgen) genel yapısı nedir?`, options: [`was/were + V3`, `am/is/are + V1`, `did + V`, `have/has + V3`], correctIndex: 0 },
        { question: `Past Passive (geçmiş edilgen) yapısı nedir?`, options: [`was/were + V3`, `am/is/are + V3`, `did + V1`, `do/does + V`], correctIndex: 0 },
        { question: `"by" sözcüğü passive cümlede neyi gösterir?`, options: [`Yapan`, `Zaman`, `Yer`, `Fiyat`], correctIndex: 0 },
        { question: `"The book was written by Orhan Pamuk." cümlesi hangi yapıdır?`, options: [`Past Passive`, `Past Active`, `Present Passive`, `Present Active`], correctIndex: 0 },
        { question: `"The car ___ made in Germany." (was/were)?`, options: [`was`, `were`, `is`, `did`], correctIndex: 0 },
        { question: `"The houses ___ built in 1990." (was/were)?`, options: [`were`, `was`, `are`, `have`], correctIndex: 0 },
        { question: `"The telephone ___ invented by Bell." (was/were)?`, options: [`was`, `were`, `is`, `did`], correctIndex: 0 },
        { question: `"Light bulbs ___ invented in the 19th century." (was/were)?`, options: [`were`, `was`, `has`, `have`], correctIndex: 0 },
        { question: `"Penicillin was ___ by Fleming." boşluğa (discover)?`, options: [`discovered`, `discover`, `discovers`, `discovering`], correctIndex: 0 },
        { question: `"America was ___ by Columbus." boşluğa (discover)?`, options: [`discovered`, `discover`, `discovers`, `discovering`], correctIndex: 0 },
        { question: `"invent" Türkçesi nedir?`, options: [`icat etmek`, `keşfetmek`, `bulmak`, `çalmak`], correctIndex: 0 },
        { question: `"discover" Türkçesi nedir?`, options: [`keşfetmek`, `icat etmek`, `yıkmak`, `ölçmek`], correctIndex: 0 },
        { question: `"invention" Türkçesi nedir?`, options: [`icat`, `keşif`, `araştırma`, `deney`], correctIndex: 0 },
        { question: `"discovery" Türkçesi nedir?`, options: [`keşif`, `icat`, `deney`, `okul`], correctIndex: 0 },
        { question: `"inventor" Türkçesi nedir?`, options: [`mucit`, `icat`, `bilim`, `deney`], correctIndex: 0 },
        { question: `"scientist" Türkçesi nedir?`, options: [`bilim insanı`, `makine ustası`, `diş hekimi`, `okul müdürü`], correctIndex: 0 },
        { question: `"experiment" Türkçesi nedir?`, options: [`deney`, `sonuç`, `kitap`, `okul`], correctIndex: 0 },
        { question: `"research" Türkçesi nedir?`, options: [`araştırma`, `tartışma`, `alıştırma`, `planlama`], correctIndex: 0 },
        { question: `"laboratory (lab)" Türkçesi nedir?`, options: [`laboratuvar`, `sınıf`, `kütüphane`, `bahçe`], correctIndex: 0 },
        { question: `"telescope" Türkçesi nedir?`, options: [`teleskop`, `mikroskop`, `telefon`, `televizyon`], correctIndex: 0 },
        { question: `"microscope" Türkçesi nedir?`, options: [`mikroskop`, `teleskop`, `telefon`, `pusula`], correctIndex: 0 },
        { question: `Newton'un keşfettiği önemli prensip nedir?`, options: [`Yer çekimi`, `Elektrik`, `Buharlı motor`, `Penisilin`], correctIndex: 0 },
        { question: `Edison'un icadı en bilinen hangisidir?`, options: [`Ampul`, `Telefon`, `Otomobil`, `Uçak`], correctIndex: 0 },
        { question: `Alexander Graham Bell'in icadı nedir?`, options: [`Telefon`, `Ampul`, `Penisilin`, `Telgraf`], correctIndex: 0 },
        { question: `Wright Kardeşlerin icadı nedir?`, options: [`Uçak`, `Otomobil`, `Telefon`, `Ampul`], correctIndex: 0 },
        { question: `Active "Edison invented the light bulb." pasife dönüştürülürse?`, options: [`The light bulb was invented by Edison.`, `The light bulb invented Edison.`, `Edison was inventing the light bulb.`, `Edison invent the light bulb.`], correctIndex: 0 },
        { question: `"The pyramids ___ built in Egypt." (was/were)?`, options: [`were`, `was`, `did`, `have`], correctIndex: 0 },
        { question: `Passive cümlede yapanı belirtmek istemiyorsak "by" cümleden çıkarılır mı?`, options: [`Evet, gerekirse çıkarılır`, `Hayır, asla`, `Sadece bazı durumlarda`, `By zorunludur`], correctIndex: 0 },
        { question: `Aşağıdaki cümlelerden hangisi passive'dir?`, options: [`The book was written in 1990.`, `He wrote the book in 1990.`, `She is writing a book now.`, `They write books every year.`], correctIndex: 0 },
        { question: `"radioactivity" kim tarafından keşfedildi?`, options: [`Marie Curie`, `Thomas Edison`, `Alexander Bell`, `Isaac Newton`], correctIndex: 0 },
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
        { question: `"might" shows...?`, options: [`olasılık`, `kesinlik`, `geçmiş`, `emir`], correctIndex: 0 },
        { question: `"If it is sunny, we ___ go to the beach."`, options: [`will`, `did`, `were`, `would have`], correctIndex: 0 },
        { question: `"drought" means?`, options: [`kuraklık`, `sel`, `fırtına`, `deprem`], correctIndex: 0 },
        { question: `Which future sentence is correct?`, options: [`It will snow.`, `It will to snow.`, `It will snowing.`, `It wills snow.`], correctIndex: 0 },
        { question: `"storm" means?`, options: [`fırtına`, `deprem`, `kuraklık`, `çığ`], correctIndex: 0 },
      ],
      quickQuestions: [
        { question: `"earthquake" Türkçesi nedir?`, options: [`deprem`, `sel`, `kuraklık`, `fırtına`], correctIndex: 0 },
        { question: `"flood" Türkçesi nedir?`, options: [`sel`, `deprem`, `çığ`, `kuraklık`], correctIndex: 0 },
        { question: `"drought" Türkçesi nedir?`, options: [`kuraklık`, `sel`, `fırtına`, `deprem`], correctIndex: 0 },
        { question: `"storm" Türkçesi nedir?`, options: [`fırtına`, `deprem`, `kuraklık`, `çığ`], correctIndex: 0 },
        { question: `"hurricane" Türkçesi nedir?`, options: [`kasırga`, `sel`, `çığ`, `deprem`], correctIndex: 0 },
        { question: `"tornado" Türkçesi nedir?`, options: [`hortum`, `sel`, `çığ`, `deprem`], correctIndex: 0 },
        { question: `"avalanche" Türkçesi nedir?`, options: [`çığ`, `sel`, `kasırga`, `deprem`], correctIndex: 0 },
        { question: `"volcano" Türkçesi nedir?`, options: [`yanardağ`, `deprem`, `çığ`, `kuraklık`], correctIndex: 0 },
        { question: `"wildfire" Türkçesi nedir?`, options: [`orman yangını`, `sel baskını`, `çığ düşmesi`, `kum fırtınası`], correctIndex: 0 },
        { question: `"tsunami" Türkçesi nedir?`, options: [`tsunami`, `sel`, `çığ`, `fırtına`], correctIndex: 0 },
        { question: `Future Simple (gelecek zaman) yapısı nedir?`, options: [`will + base verb`, `am/is/are + V-ing`, `do/does + V`, `V + ed`], correctIndex: 0 },
        { question: `"will" sonra hangi fiil hâli gelir?`, options: [`Base verb`, `to + verb`, `verb + ing`, `verb + ed`], correctIndex: 0 },
        { question: `"It ___ rain tomorrow." (gelecek)?`, options: [`will`, `did`, `was`, `does`], correctIndex: 0 },
        { question: `"I ___ help you." (gelecek)?`, options: [`will`, `did`, `was`, `does`], correctIndex: 0 },
        { question: `Hangi cümle doğrudur?`, options: [`It will snow.`, `It will to snow.`, `It will snowing.`, `It wills snow.`], correctIndex: 0 },
        { question: `"may" hangi anlama gelir?`, options: [`-ebilir`, `Kesinlikle yapacak`, `Zorunlu`, `Yasak`], correctIndex: 0 },
        { question: `"might" hangi anlama gelir?`, options: [`Düşük ihtimal`, `Kesin bilgi`, `Geçmiş zaman`, `Emir cümlesi`], correctIndex: 0 },
        { question: `"It may rain." cümlesinin Türkçesi nedir?`, options: [`Yağmur yağabilir`, `Yağmur yağacak`, `Yağmur yağmaz`, `Yağmur yağdı`], correctIndex: 0 },
        { question: `"If it rains, we ___ stay home." boşluğa?`, options: [`will`, `would`, `did`, `do`], correctIndex: 0 },
        { question: `"If it is sunny, we ___ go to the beach." boşluğa?`, options: [`will`, `did`, `were`, `would have`], correctIndex: 0 },
        { question: `Birinci tip koşul cümlesi (Type 1) yapısı nedir?`, options: [`If + present, will + base`, `If + past, would + base`, `If + V-ing, will + base`, `If + will, present`], correctIndex: 0 },
        { question: `"climate change" Türkçesi nedir?`, options: [`iklim değişikliği`, `günlük hava durumu`, `mevsim geçişleri`, `sıcaklık farkı`], correctIndex: 0 },
        { question: `"global warming" Türkçesi nedir?`, options: [`küresel ısınma`, `küresel barış`, `küresel ekonomi`, `küresel haber`], correctIndex: 0 },
        { question: `"natural disaster" Türkçesi nedir?`, options: [`doğal afet`, `doğal kaynak`, `doğal güzellik`, `doğal hayat`], correctIndex: 0 },
        { question: `"pollution" Türkçesi nedir?`, options: [`kirlilik`, `temizlik`, `sağlık`, `gürültü`], correctIndex: 0 },
        { question: `"recycle" Türkçesi nedir?`, options: [`geri dönüştürmek`, `çöpleri yakmak`, `sokağı temizlemek`, `elleri yıkamak`], correctIndex: 0 },
        { question: `"environment" Türkçesi nedir?`, options: [`çevre`, `ev`, `okul`, `şehir`], correctIndex: 0 },
        { question: `"save energy" Türkçesi nedir?`, options: [`enerji tasarrufu yapmak`, `boşuna enerji harcamak`, `elektrik enerjisi üretmek`, `enerji şirketi kurmak`], correctIndex: 0 },
        { question: `"Earthquakes ___ buildings." (cümleye uygun fiil)?`, options: [`destroy`, `protect`, `build`, `paint`], correctIndex: 0 },
        { question: `"It will be windy tomorrow." cümlesi hangi tense'dir?`, options: [`Future Simple`, `Present Simple`, `Past Simple`, `Present Continuous`], correctIndex: 0 },
      ],
    },
  ],
};
