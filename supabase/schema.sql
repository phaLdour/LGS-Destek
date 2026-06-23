-- Rehberim — Çalışma takibi şeması
-- Supabase paneli → SQL Editor → New query → bu dosyanın tamamını yapıştır → Run

-- Çalışma oturumları
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  subject_slug text not null,
  duration_seconds int not null default 0,
  studied_topics text[] not null default '{}',
  correct_count int not null default 0,
  wrong_count int not null default 0,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

alter table public.study_sessions enable row level security;

drop policy if exists "own sessions" on public.study_sessions;
create policy "own sessions" on public.study_sessions
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists study_sessions_user_started_idx
  on public.study_sessions (user_id, started_at desc);

-- Konu ilerlemesi
create table if not exists public.topic_progress (
  user_id uuid not null references auth.users on delete cascade,
  subject_slug text not null,
  topic_id text not null,
  status text not null check (status in ('in_progress', 'done')),
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_slug, topic_id)
);

alter table public.topic_progress enable row level security;

drop policy if exists "own progress" on public.topic_progress;
create policy "own progress" on public.topic_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Test (LGS İpucu) sonuçları
create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  subject_slug text not null,
  topic_id text not null,
  correct_count int not null default 0,
  wrong_count int not null default 0,
  total_questions int not null default 0,
  duration_seconds int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

drop policy if exists "own quiz" on public.quiz_results;
create policy "own quiz" on public.quiz_results
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists quiz_results_user_idx
  on public.quiz_results (user_id, created_at desc);

-- Hızlı Sorular: çözülen soruların cihazlar arası senkronu
-- localStorage'da da tutulur (offline) ama burası kaynak doğru kabul edilir
create table if not exists public.quick_solved (
  user_id uuid not null references auth.users on delete cascade,
  question_key text not null,           -- "subject/topic#index" formatında
  solved_at timestamptz not null default now(),
  primary key (user_id, question_key)
);

alter table public.quick_solved enable row level security;

drop policy if exists "own quick solved" on public.quick_solved;
create policy "own quick solved" on public.quick_solved
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists quick_solved_user_idx
  on public.quick_solved (user_id, solved_at desc);

-- Yanlış cevap havuzu: cihazlar arası senkron + spaced repetition için meta
create table if not exists public.wrong_answers (
  user_id uuid not null references auth.users on delete cascade,
  question_key text not null,           -- "subject/topic#index"
  wrong_count int not null default 1,
  correct_streak int not null default 0,
  last_wrong_at timestamptz not null default now(),
  next_due_at timestamptz,              -- spaced repetition vade tarihi (null → lastWrongAt + 1g)
  primary key (user_id, question_key)
);
-- Eski deploy'lar için tablo varsa kolon ekle (idempotent)
alter table public.wrong_answers add column if not exists next_due_at timestamptz;

alter table public.wrong_answers enable row level security;

drop policy if exists "own wrongs" on public.wrong_answers;
create policy "own wrongs" on public.wrong_answers
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists wrong_answers_user_idx
  on public.wrong_answers (user_id, last_wrong_at desc);

-- Rozet / başarım sahipliği
create table if not exists public.user_badges (
  user_id uuid not null references auth.users on delete cascade,
  badge_key text not null,                       -- ör. "ilk-adim", "seri-7"
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_key)
);

alter table public.user_badges enable row level security;

drop policy if exists "own badges" on public.user_badges;
create policy "own badges" on public.user_badges
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists user_badges_user_idx
  on public.user_badges (user_id, earned_at desc);

-- ════════════════════════════════════════════════════════════════════
-- REKABETÇİ MOD — 1v1 düello, lig sistemi, sezonluk reset
-- ════════════════════════════════════════════════════════════════════
-- Lig kademesi (tier 0-9):
--   0-1 = Gelişim 2/1
--   2-3 = Yükselme 2/1
--   4-5 = Yıldızlar 2/1
--   6-7 = Derece 2/1
--   8-9 = Şampiyonlar 2/1
-- Her kademe 100 puan kapasiteli.

-- 1) Sezonlar — her ayın 1'inde yeni satır (id = YYYYMM)
create table if not exists public.comp_seasons (
  id         int primary key,                 -- 202607 = Tem 2026
  starts_at  timestamptz not null,
  ends_at    timestamptz not null,
  label      text not null
);

alter table public.comp_seasons enable row level security;
drop policy if exists "seasons readable" on public.comp_seasons;
create policy "seasons readable" on public.comp_seasons
  for select to authenticated using (true);

-- 2) Kullanıcı rütbesi (sezon başına bir satır)
create table if not exists public.comp_ranks (
  user_id              uuid not null references auth.users on delete cascade,
  season_id            int  not null references public.comp_seasons,
  tier                 int  not null default 2 check (tier between 0 and 9),
  points               int  not null default 50 check (points between 0 and 99),
  highest_tier_reached int  not null default 2,
  challenge_next       boolean not null default false,
  win_streak           int  not null default 0,
  wins                 int  not null default 0,
  losses               int  not null default 0,
  draws                int  not null default 0,
  updated_at           timestamptz not null default now(),
  primary key (user_id, season_id)
);

alter table public.comp_ranks enable row level security;
drop policy if exists "own rank read" on public.comp_ranks;
create policy "own rank read" on public.comp_ranks
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "own rank write" on public.comp_ranks;
create policy "own rank write" on public.comp_ranks
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Liderlik tablosu için sezon + tier + puan dizini
create index if not exists comp_ranks_leaderboard_idx
  on public.comp_ranks (season_id, tier desc, points desc, wins desc);

-- 3) Matchmaking kuyruğu (atomik eşleştirme için)
create table if not exists public.comp_queue (
  user_id        uuid primary key references auth.users on delete cascade,
  season_id      int  not null,
  tier           int  not null,
  subject_filter text,                          -- null = karma-all
  joined_at      timestamptz not null default now(),
  expand_at      timestamptz not null,          -- 8s sonrası ±1 tier
  invite_code    text                           -- arkadaş düellosu kodu
);

alter table public.comp_queue enable row level security;
drop policy if exists "own queue row" on public.comp_queue;
create policy "own queue row" on public.comp_queue
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists comp_queue_match_idx
  on public.comp_queue (season_id, tier, subject_filter, joined_at);

-- 4) Maçlar — iki oyunculu, RLS iki taraf da okuyabilir
create table if not exists public.comp_matches (
  id               uuid primary key default gen_random_uuid(),
  season_id        int  not null,
  player1_id       uuid not null references auth.users on delete cascade,
  player2_id       uuid not null references auth.users on delete cascade,
  p1_tier_at_start int  not null,
  p2_tier_at_start int  not null,
  question_ids     text[] not null,             -- 10 stable id (subject/topic#idx)
  subject_filter   text,                         -- null = karma
  is_friendly      boolean not null default false, -- arkadaş düellosu = ranklı değil
  started_at       timestamptz not null default now(),
  deadline_at      timestamptz not null,         -- canonical 10dk
  status           text not null
                   check (status in ('active','finished','abandoned'))
                   default 'active',
  -- Sonuç alanları (finish-time):
  p1_correct       int, p1_blank int, p1_duration_s int,
  p1_score         numeric, p1_delta int,
  p2_correct       int, p2_blank int, p2_duration_s int,
  p2_score         numeric, p2_delta int,
  p1_reaction      text, p2_reaction text,
  winner_id        uuid,
  finished_at      timestamptz
);

alter table public.comp_matches enable row level security;
-- İki oyunculu yeni pattern: katılımcı okuyabilir.
drop policy if exists "match participants read" on public.comp_matches;
create policy "match participants read" on public.comp_matches
  for select to authenticated
  using (auth.uid() = player1_id or auth.uid() = player2_id);
-- Yazma yetkisi YOK: yalnız service-role (API route) ekler/günceller.

create index if not exists comp_matches_p1_idx
  on public.comp_matches (player1_id, finished_at desc);
create index if not exists comp_matches_p2_idx
  on public.comp_matches (player2_id, finished_at desc);

-- 5) Her oyuncunun her sorudaki cevabı (anti-cheat + replay)
create table if not exists public.comp_match_answers (
  match_id    uuid not null references public.comp_matches on delete cascade,
  player_id   uuid not null,
  q_index     int  not null check (q_index between 0 and 9),
  choice      int,                              -- 0..3, null = blank
  is_correct  boolean,
  answered_at timestamptz not null default now(),
  primary key (match_id, player_id, q_index)
);

alter table public.comp_match_answers enable row level security;
drop policy if exists "own answer in own active match" on public.comp_match_answers;
create policy "own answer in own active match" on public.comp_match_answers
  for all to authenticated
  using (
    auth.uid() = player_id
    and exists (
      select 1 from public.comp_matches m
      where m.id = match_id
        and m.status = 'active'
        and (m.player1_id = auth.uid() or m.player2_id = auth.uid())
    )
  )
  with check (auth.uid() = player_id);
-- Katılımcılar maç bittikten sonra da kendi/rakip cevaplarını görebilsin (replay):
drop policy if exists "participants read finished answers" on public.comp_match_answers;
create policy "participants read finished answers" on public.comp_match_answers
  for select to authenticated
  using (
    exists (
      select 1 from public.comp_matches m
      where m.id = match_id
        and (m.player1_id = auth.uid() or m.player2_id = auth.uid())
    )
  );

-- 6) Arkadaş daveti (link)
create table if not exists public.comp_invites (
  code              text primary key,           -- 6 karakter
  inviter_id        uuid not null references auth.users on delete cascade,
  subject_filter    text,
  created_at        timestamptz not null default now(),
  expires_at        timestamptz not null,       -- created + 30dk
  consumed_match_id uuid references public.comp_matches
);

alter table public.comp_invites enable row level security;
drop policy if exists "own invite write" on public.comp_invites;
create policy "own invite write" on public.comp_invites
  for all to authenticated
  using (auth.uid() = inviter_id)
  with check (auth.uid() = inviter_id);
-- Daveti tıklayan her kullanıcı kodu çözebilsin:
drop policy if exists "invite readable by code" on public.comp_invites;
create policy "invite readable by code" on public.comp_invites
  for select to authenticated using (true);

-- ════════════════════════════════════════════════════════════════════
-- match_make() — atomik eşleştirme (Faz 2'de kullanılır)
-- ════════════════════════════════════════════════════════════════════
-- Çağıran kullanıcı için kuyruktaki uygun rakibi bulur, maçı oluşturur,
-- ikisini de kuyruktan siler. Bulunamazsa null döner. FOR UPDATE SKIP
-- LOCKED ile race-safe.
--
-- NOT: Bu fonksiyon question_ids array'ini server-side seçmez (içerik
-- modülleri SQL'den erişilemez); onun yerine API route, fonksiyondan
-- gelen "boş slot"u doldurur. Faz 2'de tamamlanacak. Şu an iskelet.

create or replace function public.match_make(
  p_user_id        uuid,
  p_season_id      int,
  p_tier           int,
  p_subject_filter text,
  p_question_ids   text[]
) returns uuid                                    -- match_id veya null
language plpgsql security definer
as $$
declare
  v_opponent uuid;
  v_match_id uuid;
  v_now      timestamptz := now();
begin
  -- 1) Aynı tier + aynı subject_filter'da en eski rakibi kilitle
  select user_id into v_opponent
    from public.comp_queue
   where user_id <> p_user_id
     and season_id = p_season_id
     and tier = p_tier
     and coalesce(subject_filter, '') = coalesce(p_subject_filter, '')
   order by joined_at asc
   for update skip locked
   limit 1;

  -- 2) Yoksa ±1 tier'da expand_at süresi geçmiş rakibi ara
  if v_opponent is null then
    select user_id into v_opponent
      from public.comp_queue
     where user_id <> p_user_id
       and season_id = p_season_id
       and abs(tier - p_tier) <= 1
       and coalesce(subject_filter, '') = coalesce(p_subject_filter, '')
       and expand_at <= v_now
     order by joined_at asc
     for update skip locked
     limit 1;
  end if;

  if v_opponent is null then
    return null;
  end if;

  -- 3) Maç satırı oluştur (server-side belirlenen 10 soruyla)
  insert into public.comp_matches (
    season_id, player1_id, player2_id,
    p1_tier_at_start, p2_tier_at_start,
    question_ids, subject_filter,
    deadline_at
  )
  values (
    p_season_id, p_user_id, v_opponent,
    p_tier,
    (select tier from public.comp_queue where user_id = v_opponent),
    p_question_ids, p_subject_filter,
    v_now + interval '10 minutes'
  )
  returning id into v_match_id;

  -- 4) İki oyuncuyu da kuyruktan sil
  delete from public.comp_queue
   where user_id in (p_user_id, v_opponent);

  return v_match_id;
end;
$$;

grant execute on function public.match_make(uuid, int, int, text, text[]) to authenticated;
