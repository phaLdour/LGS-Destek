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
  points               int  not null default 50 check (points >= 0),  -- tier 9'da 100+ birikir
  highest_tier_reached int  not null default 2,
  challenge_next       boolean not null default false,
  win_streak           int  not null default 0,
  best_win_streak      int  not null default 0,  -- en uzun seri (rozetler)
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
  p1_tier_after    int,  p2_tier_after int,   -- maç sonu kademe (terfi tespiti)
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

-- ════════════════════════════════════════════════════════════════════
-- FAZ 2 — Atomik maç hayatı: sezon, cevap, finalize, queue join/tick
-- Tüm yazma yolları security definer fonksiyonlardan; comp_matches ve
-- comp_match_answers'a doğrudan INSERT yok. Bu sayede client kötü niyetli
-- istekle is_correct=true yazamaz.
-- ════════════════════════════════════════════════════════════════════

-- comp_match_answers RLS sertleştir: INSERT yetkisi kaldırılır,
-- yalnız SELECT kalır (kendi satırı aktif maçta + her iki taraf finished'ta).
drop policy if exists "own answer in own active match" on public.comp_match_answers;
drop policy if exists "participants read finished answers" on public.comp_match_answers;
drop policy if exists "answers readable by participants" on public.comp_match_answers;
create policy "answers readable by participants" on public.comp_match_answers
  for select to authenticated
  using (
    exists (
      select 1 from public.comp_matches m
      where m.id = match_id
        and (m.player1_id = auth.uid() or m.player2_id = auth.uid())
        and (m.status = 'finished' or player_id = auth.uid())
    )
  );

-- ──────────────────────────────────────────────────────────────
-- comp_ensure_season_and_rank: TR-saat ile sezon hesabı; yoksa
-- comp_seasons ve comp_ranks insert; mevcut/yeni rütbeyi döner.
-- ──────────────────────────────────────────────────────────────
-- Faz 3 hot-fix: RETURNS TABLE kolonlarına out_ öneki — Postgres'in
-- "v_season_id" referansını RETURN TABLE'daki season_id ile karıştırıp
-- "column reference 'season_id' is ambiguous" atmasını engeller.
drop function if exists public.comp_ensure_season_and_rank(uuid);

create or replace function public.comp_ensure_season_and_rank(
  p_user_id uuid
) returns table(out_season_id int, out_tier int, out_points int)
language plpgsql security definer
as $$
declare
  v_now_tr timestamp;
  v_season_id int;
  v_starts_tr timestamp;
  v_ends_tr timestamp;
  v_label text;
  v_month int;
  v_year int;
begin
  v_now_tr := (now() at time zone 'Europe/Istanbul')::timestamp;
  v_year := extract(year from v_now_tr)::int;
  v_month := extract(month from v_now_tr)::int;
  v_season_id := v_year * 100 + v_month;
  v_starts_tr := date_trunc('month', v_now_tr);
  v_ends_tr := v_starts_tr + interval '1 month';
  v_label := case v_month
    when 1 then 'Ocak'      when 2 then 'Şubat'   when 3 then 'Mart'
    when 4 then 'Nisan'     when 5 then 'Mayıs'   when 6 then 'Haziran'
    when 7 then 'Temmuz'    when 8 then 'Ağustos' when 9 then 'Eylül'
    when 10 then 'Ekim'     when 11 then 'Kasım'  when 12 then 'Aralık'
  end || ' ' || v_year::text;

  insert into public.comp_seasons (id, starts_at, ends_at, label)
  values (
    v_season_id,
    v_starts_tr at time zone 'Europe/Istanbul',
    v_ends_tr at time zone 'Europe/Istanbul',
    v_label
  )
  on conflict (id) do nothing;

  insert into public.comp_ranks (user_id, season_id)
  values (p_user_id, v_season_id)
  on conflict (user_id, season_id) do nothing;

  return query
  select v_season_id, r.tier, r.points
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id = v_season_id;
end;
$$;

grant execute on function public.comp_ensure_season_and_rank(uuid) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- comp_record_answer: tek cevap kaydı (anti-cheat noktası).
-- is_correct'i fonksiyon hesaplar (client bypass edemez).
-- Aktif olmayan / süresi dolan / yetkisiz çağrılar exception.
-- Çift gönderim on conflict do nothing ile yutulur, mevcut
-- is_correct döner (idempotent).
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_record_answer(
  p_match_id uuid,
  p_q_index int,
  p_choice int,
  p_correct_index int
) returns boolean
language plpgsql security definer
as $$
declare
  v_status text;
  v_p1 uuid;
  v_p2 uuid;
  v_deadline timestamptz;
  v_is_correct boolean;
  v_returned boolean;
  v_existing boolean;
begin
  select status, player1_id, player2_id, deadline_at
    into v_status, v_p1, v_p2, v_deadline
    from public.comp_matches
   where id = p_match_id
   for share;

  if v_status is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if auth.uid() <> v_p1 and auth.uid() <> v_p2 then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_status <> 'active' then
    raise exception 'not_active' using errcode = 'P0001';
  end if;
  if v_deadline < now() then
    raise exception 'expired' using errcode = 'P0002';
  end if;
  if p_q_index < 0 or p_q_index > 9 then
    raise exception 'invalid_index' using errcode = '22023';
  end if;

  v_is_correct := (p_choice is not null and p_choice = p_correct_index);

  insert into public.comp_match_answers
    (match_id, player_id, q_index, choice, is_correct, answered_at)
  values
    (p_match_id, auth.uid(), p_q_index, p_choice, v_is_correct, now())
  on conflict (match_id, player_id, q_index) do nothing
  returning is_correct into v_returned;

  -- Çift gönderim ise mevcut satırın is_correct'ini dön (idempotent)
  if v_returned is null then
    select is_correct into v_existing
      from public.comp_match_answers
     where match_id = p_match_id
       and player_id = auth.uid()
       and q_index = p_q_index;
    return v_existing;
  end if;

  return v_returned;
end;
$$;

grant execute on function public.comp_record_answer(uuid, int, int, int) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- comp_finalize_match: maç sonucunu hesaplayıp comp_matches ve
-- comp_ranks güncellemesini tek transaction'da yapar. Idempotent:
-- status='finished' ise hemen döner. Aynı match için paralel
-- çağrı for update ile serileştirilir.
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_finalize_match(
  p_match_id uuid
) returns void
language plpgsql security definer
as $$
declare
  v_m record;
  v_p1_correct int;
  v_p1_blank int;
  v_p1_dur int;
  v_p2_correct int;
  v_p2_blank int;
  v_p2_dur int;
  v_p1_score numeric;
  v_p2_score numeric;
  v_winner uuid;
  v_winner_tier int;
  v_loser_tier int;
  v_winner_score numeric;
  v_loser_score numeric;
  v_ratio numeric;
  v_margin numeric;
  v_base_win int;
  v_base_loss int;
  v_tier_gap int;
  v_winner_delta int;
  v_loser_delta int;
  v_streak_bonus int;
  v_p1_delta int;
  v_p2_delta int;
  -- comp_ranks güncellemesi için
  v_p1_rank record;
  v_p2_rank record;
  v_new_tier int;
  v_new_points int;
  v_new_highest int;
  v_floor_tier int;
  v_p1_after int;
  v_p2_after int;
begin
  select * into v_m from public.comp_matches where id = p_match_id for update;
  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if v_m.status = 'finished' then
    return;
  end if;
  if v_m.status <> 'active' then
    raise exception 'not_active' using errcode = 'P0001';
  end if;

  -- p1 cevap özeti
  select
    coalesce(sum(case when is_correct then 1 else 0 end), 0),
    10 - count(*),
    coalesce(
      greatest(0, extract(epoch from (max(answered_at) - v_m.started_at))::int),
      0
    )
  into v_p1_correct, v_p1_blank, v_p1_dur
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_m.player1_id;

  -- p2 cevap özeti
  select
    coalesce(sum(case when is_correct then 1 else 0 end), 0),
    10 - count(*),
    coalesce(
      greatest(0, extract(epoch from (max(answered_at) - v_m.started_at))::int),
      0
    )
  into v_p2_correct, v_p2_blank, v_p2_dur
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_m.player2_id;

  -- Hiç cevap yoksa süre = maç süresi tamamı (600 sn) — boş soru cezası
  -- formülün boş = 10 olmasıyla zaten uygulanır; süre 0 ise scoring max(60, dur) ile zaten 60'a düşer.
  -- Skor formülü: max(0, (c - b) * 10) / max(60, dur)
  v_p1_score := greatest(0, (v_p1_correct - v_p1_blank) * 10)::numeric
              / greatest(60, v_p1_dur)::numeric;
  v_p2_score := greatest(0, (v_p2_correct - v_p2_blank) * 10)::numeric
              / greatest(60, v_p2_dur)::numeric;

  -- Kazanan belirle
  if v_p1_score > v_p2_score then
    v_winner := v_m.player1_id;
    v_winner_tier := v_m.p1_tier_at_start;
    v_loser_tier := v_m.p2_tier_at_start;
    v_winner_score := v_p1_score;
    v_loser_score := v_p2_score;
  elsif v_p2_score > v_p1_score then
    v_winner := v_m.player2_id;
    v_winner_tier := v_m.p2_tier_at_start;
    v_loser_tier := v_m.p1_tier_at_start;
    v_winner_score := v_p2_score;
    v_loser_score := v_p1_score;
  else
    v_winner := null;  -- beraberlik
  end if;

  if v_winner is null then
    -- Beraberlik: delta 0; ranks update sadece draws ve updated_at
    v_p1_delta := 0;
    v_p2_delta := 0;
  else
    v_ratio := v_winner_score / greatest(v_loser_score, 0.001);
    v_margin := greatest(0::numeric, least(1::numeric, (v_ratio - 1) / 1.5));
    v_base_win := round(10 + v_margin * 40);
    v_base_loss := round(10 + v_margin * 20);
    v_tier_gap := v_winner_tier - v_loser_tier;
    v_winner_delta := greatest(10, least(60, v_base_win - 4 * v_tier_gap));
    v_loser_delta := greatest(-40, least(-10, -(v_base_loss + 4 * v_tier_gap)));

    -- Galibiyet serisi bonusu (kazananın mevcut streak'ine 1 ekleyince ne olacak)
    select win_streak into v_streak_bonus
      from public.comp_ranks
     where user_id = v_winner and season_id = v_m.season_id;
    v_streak_bonus := coalesce(v_streak_bonus, 0) + 1;
    v_streak_bonus := case
      when v_streak_bonus >= 7 then 20
      when v_streak_bonus >= 5 then 10
      when v_streak_bonus >= 3 then 5
      else 0
    end;
    v_winner_delta := v_winner_delta + v_streak_bonus;

    if v_winner = v_m.player1_id then
      v_p1_delta := v_winner_delta;
      v_p2_delta := v_loser_delta;
    else
      v_p1_delta := v_loser_delta;
      v_p2_delta := v_winner_delta;
    end if;
  end if;

  -- Faz 8: arkadaş düellosu ranklı değildir. Sonuç ekranı doğru rakamı
  -- göstersin diye puan farkı burada sıfırlanır; comp_ranks güncellemeleri
  -- de aşağıda atlanır (galibiyet/mağlubiyet sayacı ve seri de artmaz).
  if coalesce(v_m.is_friendly, false) then
    v_p1_delta := 0;
    v_p2_delta := 0;
  end if;

  -- comp_ranks güncellemesi — applyDelta SQL portu
  -- Beraberlikte streak sıfırlanmaz (kullanıcı kararı).
  -- p1
  select * into v_p1_rank from public.comp_ranks
   where user_id = v_m.player1_id and season_id = v_m.season_id
   for update;
  v_new_tier := v_p1_rank.tier;
  v_new_points := v_p1_rank.points + v_p1_delta;
  v_new_highest := v_p1_rank.highest_tier_reached;
  -- Yukarı terfi
  while v_new_points >= 100 and v_new_tier < 9 loop
    v_new_points := v_new_points - 100;
    v_new_tier := v_new_tier + 1;
    if v_new_tier > v_new_highest then
      v_new_highest := v_new_tier;
    end if;
  end loop;
  -- Aşağı regresyon (düşme limiti: highest_tier_reached'ün ligin tabanına kadar)
  v_floor_tier := (v_new_highest / 2) * 2;
  while v_new_points < 0 and v_new_tier > v_floor_tier loop
    v_new_tier := v_new_tier - 1;
    v_new_points := v_new_points + 100;
  end loop;
  if v_new_points < 0 then v_new_points := 0; end if;
  -- Şampiyonlar 1 (tier 9) hariç puan 99 ile tavanla
  if v_new_tier < 9 and v_new_points > 99 then v_new_points := 99; end if;

  update public.comp_ranks set
    tier = v_new_tier,
    points = v_new_points,
    highest_tier_reached = v_new_highest,
    win_streak = case
      when v_winner = v_m.player1_id then v_p1_rank.win_streak + 1
      when v_winner = v_m.player2_id then 0
      else v_p1_rank.win_streak  -- beraberlik: nötr
    end,
    wins = v_p1_rank.wins + (case when v_winner = v_m.player1_id then 1 else 0 end),
    losses = v_p1_rank.losses + (case when v_winner = v_m.player2_id then 1 else 0 end),
    draws = v_p1_rank.draws + (case when v_winner is null then 1 else 0 end),
    -- Faz 6: en uzun seri kalıcı olarak saklanır (win_streak kopunca sıfırlanır)
    best_win_streak = greatest(
      v_p1_rank.best_win_streak,
      case when v_winner = v_m.player1_id then v_p1_rank.win_streak + 1 else 0 end
    ),
    -- Hot-fix: beraberlikte v_winner ve v_margin NULL → NULL and NULL = NULL →
    -- not-null ihlali (maç hiç sonuçlanmıyordu). coalesce ile false'a sabitlendi.
    challenge_next = coalesce(v_winner = v_m.player1_id and v_margin >= 0.7, false),
    updated_at = now()
  where user_id = v_m.player1_id and season_id = v_m.season_id
    and not coalesce(v_m.is_friendly, false);
  -- Faz 8: arkadaş maçında comp_ranks güncellenmediği için v_new_tier
  -- "bugünkü kademe"yi taşır; maç satırına yazılırsa sonuç ekranı sahte
  -- terfi/düşüş kutlaması gösterir. Başlangıç kademesinde sabitle.
  v_p1_after := case when coalesce(v_m.is_friendly, false)
                     then v_m.p1_tier_at_start else v_new_tier end;

  -- p2 — aynı mantık
  select * into v_p2_rank from public.comp_ranks
   where user_id = v_m.player2_id and season_id = v_m.season_id
   for update;
  v_new_tier := v_p2_rank.tier;
  v_new_points := v_p2_rank.points + v_p2_delta;
  v_new_highest := v_p2_rank.highest_tier_reached;
  while v_new_points >= 100 and v_new_tier < 9 loop
    v_new_points := v_new_points - 100;
    v_new_tier := v_new_tier + 1;
    if v_new_tier > v_new_highest then
      v_new_highest := v_new_tier;
    end if;
  end loop;
  v_floor_tier := (v_new_highest / 2) * 2;
  while v_new_points < 0 and v_new_tier > v_floor_tier loop
    v_new_tier := v_new_tier - 1;
    v_new_points := v_new_points + 100;
  end loop;
  if v_new_points < 0 then v_new_points := 0; end if;
  if v_new_tier < 9 and v_new_points > 99 then v_new_points := 99; end if;

  update public.comp_ranks set
    tier = v_new_tier,
    points = v_new_points,
    highest_tier_reached = v_new_highest,
    win_streak = case
      when v_winner = v_m.player2_id then v_p2_rank.win_streak + 1
      when v_winner = v_m.player1_id then 0
      else v_p2_rank.win_streak
    end,
    wins = v_p2_rank.wins + (case when v_winner = v_m.player2_id then 1 else 0 end),
    losses = v_p2_rank.losses + (case when v_winner = v_m.player1_id then 1 else 0 end),
    draws = v_p2_rank.draws + (case when v_winner is null then 1 else 0 end),
    best_win_streak = greatest(
      v_p2_rank.best_win_streak,
      case when v_winner = v_m.player2_id then v_p2_rank.win_streak + 1 else 0 end
    ),
    challenge_next = coalesce(v_winner = v_m.player2_id and v_margin >= 0.7, false),
    updated_at = now()
  where user_id = v_m.player2_id and season_id = v_m.season_id
    and not coalesce(v_m.is_friendly, false);
  v_p2_after := case when coalesce(v_m.is_friendly, false)
                     then v_m.p2_tier_at_start else v_new_tier end;

  -- Maç finished olarak işaretle
  update public.comp_matches set
    status = 'finished',
    p1_tier_after = v_p1_after,
    p2_tier_after = v_p2_after,
    winner_id = v_winner,
    p1_correct = v_p1_correct,
    p1_blank = v_p1_blank,
    p1_duration_s = v_p1_dur,
    p1_score = v_p1_score,
    p1_delta = v_p1_delta,
    p2_correct = v_p2_correct,
    p2_blank = v_p2_blank,
    p2_duration_s = v_p2_dur,
    p2_score = v_p2_score,
    p2_delta = v_p2_delta,
    finished_at = now()
  where id = p_match_id;
end;
$$;

grant execute on function public.comp_finalize_match(uuid) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- comp_join_queue: aktif maç yoksa kuyruğa katıl + match_make tetikle.
-- question_ids parametresini arayan route hazırlar (içerik server-side).
-- Eğer kullanıcı zaten aktif bir maçtaysa o maçın id'sini döner.
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_join_queue(
  p_subject_filter text,
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_active_id uuid;
  v_match_id uuid;
begin
  -- Sezon + rütbeyi garanti et (out_ önekli kolonlar, Faz 3 hot-fix)
  select s.out_season_id, s.out_tier into v_season_id, v_tier
    from public.comp_ensure_season_and_rank(auth.uid()) s;

  -- Aktif maç kontrolü
  select id into v_active_id
    from public.comp_matches
   where (player1_id = auth.uid() or player2_id = auth.uid())
     and status = 'active'
     and deadline_at > now()
   limit 1;
  if v_active_id is not null then
    return v_active_id;
  end if;

  -- Kuyruğa upsert
  insert into public.comp_queue
    (user_id, season_id, tier, subject_filter, expand_at)
  values
    (auth.uid(), v_season_id, v_tier, p_subject_filter, now() + interval '8 seconds')
  on conflict (user_id) do update set
    tier = excluded.tier,
    subject_filter = excluded.subject_filter,
    joined_at = now(),
    expand_at = now() + interval '8 seconds';

  -- match_make çağır (Faz 2'nin 5-param signature'ı; Faz 3'te 6-param ile yeniden tanımlanır)
  v_match_id := public.match_make(
    auth.uid(),
    v_season_id,
    v_tier,
    p_subject_filter,
    p_question_ids
  );
  return v_match_id;
end;
$$;

grant execute on function public.comp_join_queue(text, text[]) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- comp_tick_queue: kullanıcının kuyruk satırını okuyup match_make
-- tekrar tetikler. Race-safe; client 3 sn'de bir polling yapar.
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_tick_queue(
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_subject_filter text;
begin
  select season_id, tier, subject_filter
    into v_season_id, v_tier, v_subject_filter
    from public.comp_queue
   where user_id = auth.uid();
  if v_season_id is null then
    return null;
  end if;

  return public.match_make(
    auth.uid(),
    v_season_id,
    v_tier,
    v_subject_filter,
    p_question_ids
  );
end;
$$;

grant execute on function public.comp_tick_queue(text[]) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- comp_leave_queue: kullanıcının kuyruk satırını siler.
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_leave_queue()
returns void
language plpgsql security definer
as $$
begin
  delete from public.comp_queue where user_id = auth.uid();
end;
$$;

grant execute on function public.comp_leave_queue() to authenticated;

-- ──────────────────────────────────────────────────────────────
-- Realtime publication — UPDATE/INSERT bildirimi için.
-- Idempotent (do bloğu içinde already exists hatasını yutar).
-- ──────────────────────────────────────────────────────────────
do $$
begin
  begin
    alter publication supabase_realtime add table public.comp_matches;
  exception when others then null;
  end;
  begin
    alter publication supabase_realtime add table public.comp_match_answers;
  exception when others then null;
  end;
end $$;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 3 — Eşleşme rampası + stale cleanup + manuel reset
-- ════════════════════════════════════════════════════════════════════
-- Eski match_make (5 parametreli) imzasını sil, 6 parametreli yeniden yarat.
drop function if exists public.match_make(uuid, int, int, text, text[]);

create or replace function public.match_make(
  p_user_id        uuid,
  p_season_id      int,
  p_tier           int,
  p_subject_filter text,
  p_question_ids   text[],
  p_age_seconds    int default 0
) returns uuid
language plpgsql security definer
as $$
declare
  v_opponent uuid;
  v_match_id uuid;
  v_opp_tier int;
  v_now      timestamptz := now();
  v_band     int;
begin
  -- Tier rampı (yaşa göre): kuyrukta uzun bekleyen oyuncular için arama bandını genişlet
  --   <=15s → 0 (sadece aynı tier)
  --   <=45s → 1
  --   <=90s → 2
  --   >90s  → 3
  v_band := case
    when p_age_seconds <= 15 then 0
    when p_age_seconds <= 45 then 1
    when p_age_seconds <= 90 then 2
    else 3
  end;

  -- En yakın tier'dan başla, eşitlikte en eski beklemiş kazansın.
  -- Defansif qualifying (q alias): planner'ın ambiguous yorumlamasını önler.
  select q.user_id, q.tier into v_opponent, v_opp_tier
    from public.comp_queue q
   where q.user_id <> p_user_id
     and q.season_id = p_season_id
     and abs(q.tier - p_tier) <= v_band
     and coalesce(q.subject_filter, '') = coalesce(p_subject_filter, '')
   order by abs(q.tier - p_tier) asc, q.joined_at asc
   for update skip locked
   limit 1;

  if v_opponent is null then
    return null;
  end if;

  insert into public.comp_matches (
    season_id, player1_id, player2_id,
    p1_tier_at_start, p2_tier_at_start,
    question_ids, subject_filter,
    deadline_at
  )
  values (
    p_season_id, p_user_id, v_opponent,
    p_tier, v_opp_tier,
    p_question_ids, p_subject_filter,
    v_now + interval '10 minutes'
  )
  returning id into v_match_id;

  delete from public.comp_queue
   where user_id in (p_user_id, v_opponent);

  return v_match_id;
end;
$$;

grant execute on function public.match_make(uuid, int, int, text, text[], int) to authenticated;

-- comp_join_queue: 5dk+ stale satırları sil, yeni match_make signature'ı ile çağır
create or replace function public.comp_join_queue(
  p_subject_filter text,
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_active_id uuid;
  v_match_id uuid;
begin
  -- Stale temizlik: 5dk+ kuyrukta kalmış (browser kapatılmış, tick durmuş) satırları sil
  delete from public.comp_queue where joined_at < now() - interval '5 minutes';

  -- out_ önekli kolonlar (Faz 3 hot-fix: ambiguous column referansını çözer)
  select s.out_season_id, s.out_tier into v_season_id, v_tier
    from public.comp_ensure_season_and_rank(auth.uid()) s;

  select id into v_active_id
    from public.comp_matches
   where (player1_id = auth.uid() or player2_id = auth.uid())
     and status = 'active'
     and deadline_at > now()
   limit 1;
  if v_active_id is not null then
    return v_active_id;
  end if;

  insert into public.comp_queue
    (user_id, season_id, tier, subject_filter, expand_at)
  values
    (auth.uid(), v_season_id, v_tier, p_subject_filter, now() + interval '15 seconds')
  on conflict (user_id) do update set
    tier = excluded.tier,
    subject_filter = excluded.subject_filter,
    joined_at = now(),
    expand_at = now() + interval '15 seconds';

  v_match_id := public.match_make(
    auth.uid(), v_season_id, v_tier,
    p_subject_filter, p_question_ids,
    0
  );
  return v_match_id;
end;
$$;

grant execute on function public.comp_join_queue(text, text[]) to authenticated;

-- comp_tick_queue: kuyruktaki joined_at'tan yaşı hesapla, match_make'e bant olarak geçir
create or replace function public.comp_tick_queue(
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_subject_filter text;
  v_joined_at timestamptz;
  v_age int;
begin
  select season_id, tier, subject_filter, joined_at
    into v_season_id, v_tier, v_subject_filter, v_joined_at
    from public.comp_queue
   where user_id = auth.uid();
  if v_season_id is null then
    return null;
  end if;

  v_age := greatest(0, extract(epoch from (now() - v_joined_at))::int);

  return public.match_make(
    auth.uid(), v_season_id, v_tier,
    v_subject_filter, p_question_ids, v_age
  );
end;
$$;

grant execute on function public.comp_tick_queue(text[]) to authenticated;

-- comp_queue_reset: kullanıcının kuyruk satırını siler, aktif maç varsa abandoned'a alır.
-- "Baştan başla" butonu için: takılı kalmış kuyruk + arta kalan eski aktif maç temizliği.
-- NOT: bu sürüm FAZ 12'de güvenlik gerekçesiyle değiştirildi (aktif maçtan
-- cezasız kaçış açığı). Dönüş tipi void → uuid olduğu için dosya baştan
-- çalıştırıldığında bu create'in de düşürmeye ihtiyacı var.
drop function if exists public.comp_queue_reset();
create function public.comp_queue_reset()
returns void
language plpgsql security definer
as $$
begin
  delete from public.comp_queue where user_id = auth.uid();

  update public.comp_matches
     set status = 'abandoned', finished_at = now()
   where (player1_id = auth.uid() or player2_id = auth.uid())
     and status = 'active';
end;
$$;

grant execute on function public.comp_queue_reset() to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- comp_opponent_progress: Çağıran kullanıcının rakibinin verdiği cevap
-- sayısını döner. RLS bypass (SECURITY DEFINER) — aktif maçta normalde
-- "answers readable by participants" policy'si rakibin satırlarını
-- saklıyor (anti-cheat: choice/is_correct sızmasın). Bu fonksiyon
-- YALNIZ sayıyı döndürür; hassas bilgi sızmaz.
-- ────────────────────────────────────────────────────────────────────
create or replace function public.comp_opponent_progress(p_match_id uuid)
returns int
language plpgsql security definer
as $$
declare
  v_p1 uuid; v_p2 uuid;
  v_caller uuid := auth.uid();
  v_other uuid;
  v_cnt int;
begin
  select player1_id, player2_id into v_p1, v_p2
    from public.comp_matches
   where id = p_match_id;

  if v_p1 is null then
    return 0;
  end if;
  if v_caller <> v_p1 and v_caller <> v_p2 then
    return 0;
  end if;

  v_other := case when v_caller = v_p1 then v_p2 else v_p1 end;

  select count(*) into v_cnt
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_other;

  return coalesce(v_cnt, 0);
end;
$$;

grant execute on function public.comp_opponent_progress(uuid) to authenticated;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 4 — Hükmen Mağlubiyet (Forfeit)
-- ════════════════════════════════════════════════════════════════════
-- Kullanıcı aktif bir maçtan çıkıp yeni maç aradığında eski maç forfeit
-- edilir: çıkan hükmen mağlup (-30), kalan hükmen galip (+30). forfeited_by
-- kolonu sonuç ekranındaki özel mesajın tek kaynağı.

alter table public.comp_matches
  add column if not exists forfeited_by uuid references auth.users;

-- comp_forfeit_match: çağıran (auth.uid()) maçı terk eder → hükmen mağlup.
-- Sabit ±30 puan. comp_ranks tier traversal'ı comp_finalize_match ile aynı.
-- Idempotent: status<>'active' ise no-op.
create or replace function public.comp_forfeit_match(p_match_id uuid)
returns void
language plpgsql security definer
as $$
declare
  v_m record;
  v_caller uuid := auth.uid();
  v_winner uuid;                 -- kalan (kazanan)
  v_loser  uuid := v_caller;     -- çıkan (kaybeden)
  v_p1_delta int;
  v_p2_delta int;
  v_rank record;
  v_delta int;
  v_new_tier int;
  v_new_points int;
  v_new_highest int;
  v_floor_tier int;
  v_uid uuid;
  v_p1_after int;
  v_p2_after int;
begin
  select * into v_m from public.comp_matches where id = p_match_id for update;
  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if v_caller <> v_m.player1_id and v_caller <> v_m.player2_id then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_m.status <> 'active' then
    return;  -- zaten bitmiş; idempotent
  end if;

  -- Kazanan = rakip
  v_winner := case when v_caller = v_m.player1_id
                   then v_m.player2_id else v_m.player1_id end;

  -- Sabit delta: çıkan -30, kalan +30
  if v_caller = v_m.player1_id then
    v_p1_delta := -30; v_p2_delta := 30;
  else
    v_p1_delta := 30;  v_p2_delta := -30;
  end if;

  -- Faz 8 güvenlik düzeltmesi: ARKADAŞ DÜELLOSU RANKLI DEĞİLDİR.
  -- comp_finalize_match'te bu koruma vardı ama maçın bitmesinin üç yolu
  -- var; terk (forfeit) ve hükmen kazanma yolları korumasızdı. Bu, davet
  -- linkiyle rakip seçilebildiği için iki hesap arasında sınırsız puan
  -- transferine açık bir kapı bırakıyordu (birinden terk et, diğerine +30).
  if coalesce(v_m.is_friendly, false) then
    update public.comp_matches set
      status = 'finished',
      winner_id = v_winner,
      p1_delta = 0,
      p2_delta = 0,
      p1_tier_after = v_m.p1_tier_at_start,
      p2_tier_after = v_m.p2_tier_at_start,
      finished_at = now()
    where id = p_match_id;
    return;
  end if;

  -- Her iki oyuncunun comp_ranks satırını güncelle (tier traversal ortak)
  foreach v_uid in array array[v_m.player1_id, v_m.player2_id] loop
    v_delta := case when v_uid = v_m.player1_id then v_p1_delta else v_p2_delta end;

    select * into v_rank from public.comp_ranks
     where user_id = v_uid and season_id = v_m.season_id
     for update;
    -- Rütbe satırı yoksa atla (teorik; join sırasında garanti edilir)
    if v_rank.user_id is null then
      continue;
    end if;

    v_new_tier := v_rank.tier;
    v_new_points := v_rank.points + v_delta;
    v_new_highest := v_rank.highest_tier_reached;

    while v_new_points >= 100 and v_new_tier < 9 loop
      v_new_points := v_new_points - 100;
      v_new_tier := v_new_tier + 1;
      if v_new_tier > v_new_highest then
        v_new_highest := v_new_tier;
      end if;
    end loop;

    v_floor_tier := (v_new_highest / 2) * 2;
    while v_new_points < 0 and v_new_tier > v_floor_tier loop
      v_new_tier := v_new_tier - 1;
      v_new_points := v_new_points + 100;
    end loop;
    if v_new_points < 0 then v_new_points := 0; end if;
    if v_new_tier < 9 and v_new_points > 99 then v_new_points := 99; end if;

    update public.comp_ranks set
      tier = v_new_tier,
      points = v_new_points,
      highest_tier_reached = v_new_highest,
      win_streak = case when v_uid = v_winner then win_streak + 1 else 0 end,
      best_win_streak = greatest(
        best_win_streak,
        case when v_uid = v_winner then win_streak + 1 else 0 end
      ),
      wins   = wins   + (case when v_uid = v_winner then 1 else 0 end),
      losses = losses + (case when v_uid = v_loser  then 1 else 0 end),
      updated_at = now()
    where user_id = v_uid and season_id = v_m.season_id;

    -- Faz 6: maç sonu kademe (sonuç ekranındaki terfi kutlaması için)
    if v_uid = v_m.player1_id then
      v_p1_after := v_new_tier;
    else
      v_p2_after := v_new_tier;
    end if;
  end loop;

  -- Maçı forfeit olarak kapat
  update public.comp_matches set
    status = 'finished',
    p1_tier_after = v_p1_after,
    p2_tier_after = v_p2_after,
    winner_id = v_winner,
    forfeited_by = v_loser,
    p1_delta = v_p1_delta,
    p2_delta = v_p2_delta,
    finished_at = now()
  where id = p_match_id;
end;
$$;

grant execute on function public.comp_forfeit_match(uuid) to authenticated;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 5 — Rank ödülleri: herkese açık profil, lig nişanı, sezon kupaları,
--         yumuşak sezon reseti, liderlik tablosu
-- ════════════════════════════════════════════════════════════════════
-- Kalıcı ödüller:
--   * Lig nişanı  — tüm zamanlarda ulaşılan en yüksek kademe
--                   (comp_profiles.best_tier, yalnız yukarı gider).
--   * Sezon kupası — sezon kapandığında bitirilen lig/kademe + sıralama
--                   (comp_trophies, sezon başına bir satır, asla silinmez).
-- Herkese açık yüzey: comp_profiles (takma ad, avatar, best_tier) ve
-- comp_trophies tüm giriş yapmış kullanıcılarca okunabilir; yazma
-- yalnız security definer fonksiyonlarla.
-- Sezon geçişi: yumuşak reset — yeni sezonda 2 kademe aşağı (taban Yükselme 2), 50 puan.
-- Sezon kapanışı cron'suz: comp_ensure_season_and_rank her çağrıda
-- süresi dolmuş açık sezonları kapatır (kupa dağıtımı idempotent).

-- 1) Herkese açık rekabet profili ─────────────────────────────────
create table if not exists public.comp_profiles (
  user_id      uuid primary key references auth.users on delete cascade,
  nickname     text,                                  -- kullanıcı seçer (2-20 kr), null = türetilmiş ad
  display_name text not null default 'Öğrenci',       -- metadata'dan türetilir: "Kıvanç Y."
  avatar_url   text,
  best_tier    int  not null default 2 check (best_tier between 0 and 9),
  updated_at   timestamptz not null default now()
);

alter table public.comp_profiles enable row level security;
drop policy if exists "profiles readable" on public.comp_profiles;
create policy "profiles readable" on public.comp_profiles
  for select to authenticated using (true);
-- Yazma politikası YOK: yalnız security definer fonksiyonlar yazar.

-- 2) Sezon kupaları (kalıcı) ─────────────────────────────────────
create table if not exists public.comp_trophies (
  user_id      uuid not null references auth.users on delete cascade,
  season_id    int  not null references public.comp_seasons,
  final_tier   int  not null,
  final_points int  not null,
  rank_position int not null,          -- sezon sıralaması (1 = sezon şampiyonu)
  participants int  not null,          -- o sezon en az 1 maç oynayan oyuncu sayısı
  wins         int  not null default 0,
  losses       int  not null default 0,
  draws        int  not null default 0,
  awarded_at   timestamptz not null default now(),
  primary key (user_id, season_id)
);

alter table public.comp_trophies enable row level security;
drop policy if exists "trophies readable" on public.comp_trophies;
create policy "trophies readable" on public.comp_trophies
  for select to authenticated using (true);

create index if not exists comp_trophies_user_idx
  on public.comp_trophies (user_id, season_id desc);

-- 3) Sezon kapanış damgası ───────────────────────────────────────
alter table public.comp_seasons
  add column if not exists closed_at timestamptz;

-- 4) comp_ranks RLS: herkes okuyabilir (liderlik + herkese açık profil),
--    doğrudan yazma KAPALI (anti-cheat: tüm yazma yolları security definer RPC).
drop policy if exists "own rank write" on public.comp_ranks;
drop policy if exists "own rank read"  on public.comp_ranks;
drop policy if exists "ranks readable" on public.comp_ranks;
create policy "ranks readable" on public.comp_ranks
  for select to authenticated using (true);

-- 5) Görünen ad türetme: "Ad Soyad" → "Ad S." (reşit olmayan kullanıcı
--    gizliliği: soyad ve e-posta asla herkese açık yüzeye çıkmaz).
create or replace function public.comp_derive_display_name(p_meta jsonb)
returns text
language plpgsql immutable
as $$
declare
  v_full  text := trim(coalesce(p_meta->>'full_name', p_meta->>'name', ''));
  v_parts text[];
  v_n     int;
begin
  if v_full = '' then
    return 'Öğrenci';
  end if;
  v_parts := regexp_split_to_array(v_full, '\s+');
  v_n := array_length(v_parts, 1);
  if v_n >= 2 then
    return v_parts[1] || ' ' || left(v_parts[v_n], 1) || '.';
  end if;
  return v_parts[1];
end;
$$;

-- 6) Profil upsert (auth metadata → comp_profiles). best_tier monoton.
create or replace function public.comp_upsert_profile(p_user_id uuid)
returns void
language plpgsql security definer
as $$
declare
  v_meta   jsonb;
  v_name   text;
  v_avatar text;
  v_best   int;
begin
  select raw_user_meta_data into v_meta
    from auth.users where id = p_user_id;
  if not found then
    return;
  end if;
  v_meta   := coalesce(v_meta, '{}'::jsonb);
  v_name   := public.comp_derive_display_name(v_meta);
  v_avatar := coalesce(v_meta->>'avatar_url', v_meta->>'picture');

  select coalesce(max(highest_tier_reached), 2) into v_best
    from public.comp_ranks where user_id = p_user_id;

  insert into public.comp_profiles (user_id, display_name, avatar_url, best_tier)
  values (p_user_id, v_name, v_avatar, v_best)
  on conflict (user_id) do update set
    display_name = excluded.display_name,
    avatar_url   = excluded.avatar_url,
    best_tier    = greatest(public.comp_profiles.best_tier, excluded.best_tier),
    updated_at   = now();
end;
$$;

revoke execute on function public.comp_upsert_profile(uuid) from public, anon, authenticated;

-- 7) Trigger: comp_ranks değişince best_tier'ı yukarı çek (asla aşağı inmez)
create or replace function public.comp_ranks_best_tier_trg()
returns trigger
language plpgsql security definer
as $$
begin
  if not exists (select 1 from public.comp_profiles where user_id = new.user_id) then
    perform public.comp_upsert_profile(new.user_id);
  end if;
  update public.comp_profiles
     set best_tier = new.highest_tier_reached, updated_at = now()
   where user_id = new.user_id
     and best_tier < new.highest_tier_reached;
  return new;
end;
$$;

drop trigger if exists comp_ranks_best_tier on public.comp_ranks;
create trigger comp_ranks_best_tier
  after insert or update of highest_tier_reached on public.comp_ranks
  for each row execute function public.comp_ranks_best_tier_trg();

-- 8) Kullanıcının kendi profilini senkronlaması (ad/avatar değişince client çağırır)
create or replace function public.comp_sync_profile()
returns void
language plpgsql security definer
as $$
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  perform public.comp_upsert_profile(auth.uid());
end;
$$;

grant execute on function public.comp_sync_profile() to authenticated;

-- 9) Takma ad: 2-20 karakter, harf/rakam/boşluk/._- ; boş → türetilmiş ada dön
create or replace function public.comp_set_nickname(p_nickname text)
returns text
language plpgsql security definer
as $$
declare
  v_nick text;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  v_nick := nullif(regexp_replace(trim(coalesce(p_nickname, '')), '\s+', ' ', 'g'), '');
  if v_nick is not null then
    if char_length(v_nick) < 2 or char_length(v_nick) > 20 then
      raise exception 'nickname_length' using errcode = '22023';
    end if;
    if v_nick !~ '^[A-Za-z0-9ÇĞİÖŞÜçğıöşü._ -]+$' then
      raise exception 'nickname_chars' using errcode = '22023';
    end if;
  end if;
  perform public.comp_upsert_profile(auth.uid());
  update public.comp_profiles
     set nickname = v_nick, updated_at = now()
   where user_id = auth.uid();
  return v_nick;
end;
$$;

grant execute on function public.comp_set_nickname(text) to authenticated;

-- 10) Sezon kapanışı: kupaları dağıt (idempotent, yalnız süresi dolmuş sezon)
create or replace function public.comp_close_season(p_season_id int)
returns int
language plpgsql security definer
as $$
declare
  v_count int := 0;
begin
  if not exists (
    select 1 from public.comp_seasons s
     where s.id = p_season_id
       and s.closed_at is null
       and s.ends_at <= now()
  ) then
    return 0;
  end if;

  with ranked as (
    select r.user_id, r.tier, r.points, r.wins, r.losses, r.draws,
           row_number() over (
             order by r.tier desc, r.points desc, r.wins desc, r.updated_at asc
           )::int as pos,
           count(*) over ()::int as total
      from public.comp_ranks r
     where r.season_id = p_season_id
       and (r.wins + r.losses + r.draws) > 0
  )
  insert into public.comp_trophies
    (user_id, season_id, final_tier, final_points, rank_position, participants, wins, losses, draws)
  select user_id, p_season_id, tier, points, pos, total, wins, losses, draws
    from ranked
  on conflict (user_id, season_id) do nothing;
  get diagnostics v_count = row_count;

  update public.comp_seasons set closed_at = now() where id = p_season_id;
  return v_count;
end;
$$;

revoke execute on function public.comp_close_season(int) from public, anon, authenticated;

-- Süresi dolmuş tüm açık sezonları kapat (cron yerine lazy tetik)
create or replace function public.comp_close_open_seasons()
returns int
language plpgsql security definer
as $$
declare
  v_s record;
  v_total int := 0;
begin
  for v_s in
    select id from public.comp_seasons
     where closed_at is null and ends_at <= now()
     order by id
  loop
    v_total := v_total + public.comp_close_season(v_s.id);
  end loop;
  return v_total;
end;
$$;

revoke execute on function public.comp_close_open_seasons() from public, anon, authenticated;

-- 11) comp_ensure_season_and_rank — Faz 5: sezon kapanışı + yumuşak reset + profil senkronu
create or replace function public.comp_ensure_season_and_rank(
  p_user_id uuid
) returns table(out_season_id int, out_tier int, out_points int)
language plpgsql security definer
as $$
declare
  v_now_tr timestamp;
  v_season_id int;
  v_starts_tr timestamp;
  v_ends_tr timestamp;
  v_label text;
  v_month int;
  v_year int;
begin
  v_now_tr := (now() at time zone 'Europe/Istanbul')::timestamp;
  v_year := extract(year from v_now_tr)::int;
  v_month := extract(month from v_now_tr)::int;
  v_season_id := v_year * 100 + v_month;
  v_starts_tr := date_trunc('month', v_now_tr);
  v_ends_tr := v_starts_tr + interval '1 month';
  v_label := case v_month
    when 1 then 'Ocak'      when 2 then 'Şubat'   when 3 then 'Mart'
    when 4 then 'Nisan'     when 5 then 'Mayıs'   when 6 then 'Haziran'
    when 7 then 'Temmuz'    when 8 then 'Ağustos' when 9 then 'Eylül'
    when 10 then 'Ekim'     when 11 then 'Kasım'  when 12 then 'Aralık'
  end || ' ' || v_year::text;

  insert into public.comp_seasons (id, starts_at, ends_at, label)
  values (
    v_season_id,
    v_starts_tr at time zone 'Europe/Istanbul',
    v_ends_tr at time zone 'Europe/Istanbul',
    v_label
  )
  on conflict (id) do nothing;

  -- Faz 5: süresi dolmuş sezonları kapat (kupa dağıtımı)
  perform public.comp_close_open_seasons();

  -- Faz 5: yumuşak reset — en son sezon satırından 2 kademe aşağı, 50 puan.
  -- Taban: yeni kullanıcı varsayılanı (tier 2 = Yükselme 2); kimse sezona
  -- yeni başlayanların altından başlamaz.
  insert into public.comp_ranks (user_id, season_id, tier, points, highest_tier_reached)
  select p_user_id, v_season_id,
         greatest(2, r.tier - 2), 50, greatest(2, r.tier - 2)
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id < v_season_id
   order by r.season_id desc
   limit 1
  on conflict (user_id, season_id) do nothing;

  -- Önceki sezon yoksa varsayılan (Yükselme 2 / 50)
  insert into public.comp_ranks (user_id, season_id)
  values (p_user_id, v_season_id)
  on conflict (user_id, season_id) do nothing;

  -- Faz 5: herkese açık profil (ad/avatar) tazele
  perform public.comp_upsert_profile(p_user_id);

  return query
  select v_season_id, r.tier, r.points
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id = v_season_id;
end;
$$;

grant execute on function public.comp_ensure_season_and_rank(uuid) to authenticated;

-- 12) Liderlik tablosu: sezon sıralaması (yalnız ≥1 maç oynayanlar).
--     İlk p_limit satır + çağıranın kendi satırı (sıralama dışındaysa da).
create or replace function public.comp_leaderboard(
  p_season_id int default null,
  p_limit int default 50
) returns table (
  rank_position int,
  user_id      uuid,
  display_name text,
  avatar_url   text,
  best_tier    int,
  tier         int,
  points       int,
  wins         int,
  losses       int,
  draws        int,
  win_streak   int,
  is_me        boolean
)
language sql stable security definer
as $$
  with season as (
    select coalesce(
      p_season_id,
      extract(year  from (now() at time zone 'Europe/Istanbul'))::int * 100
      + extract(month from (now() at time zone 'Europe/Istanbul'))::int
    ) as id
  ),
  ranked as (
    select r.user_id, r.tier, r.points, r.wins, r.losses, r.draws, r.win_streak,
           row_number() over (
             order by r.tier desc, r.points desc, r.wins desc, r.updated_at asc
           )::int as pos
      from public.comp_ranks r, season
     where r.season_id = season.id
       and (r.wins + r.losses + r.draws) > 0
  )
  select x.pos,
         x.user_id,
         coalesce(p.nickname, p.display_name, 'Öğrenci'),
         p.avatar_url,
         coalesce(p.best_tier, x.tier),
         x.tier, x.points, x.wins, x.losses, x.draws, x.win_streak,
         (x.user_id = auth.uid())
    from ranked x
    left join public.comp_profiles p on p.user_id = x.user_id
   where auth.uid() is not null
     and (x.pos <= least(greatest(coalesce(p_limit, 50), 1), 200)
          or x.user_id = auth.uid())
   order by x.pos;
$$;

grant execute on function public.comp_leaderboard(int, int) to authenticated;

-- 13) Backfill: mevcut oyuncular için profil satırı + kapanmış sezon kupaları
select public.comp_upsert_profile(u.user_id)
  from (select distinct user_id from public.comp_ranks) u;
select public.comp_close_open_seasons();


-- ════════════════════════════════════════════════════════════════════
-- FAZ 5 HOT-FIX — Şampiyonlar tavanı, süresi dolan maçlar, takma ad tekilliği
-- ════════════════════════════════════════════════════════════════════
-- 1) KRİTİK: comp_ranks.points CHECK (0..99), Şampiyonlar 1'de (tier 9)
--    puanın birikmesine izin veren kural ile çelişiyordu. Tier 9'daki bir
--    oyuncu 100+ puana ulaştığında comp_finalize_match / comp_forfeit_match
--    "violates check constraint comp_ranks_points_check" ile patlıyor, maç
--    hiç sonuçlanmıyordu. Kısıt yalnız "negatif olamaz"a indirildi.
-- 2) Süresi dolmuş ama kimsenin açmadığı maçlar sonsuza dek 'active'
--    kalıyordu (iki taraf da puan almıyordu). Lazy sweeper eklendi.
-- 3) Takma ad tekilliği: iki öğrenci aynı takma adı alıp birbirini
--    taklit edebiliyordu. Büyük/küçük harf duyarsız benzersiz indeks.

-- ── 0) Faz 6 kolonları: en uzun seri + maç sonu kademe ──────────────
-- best_win_streak: comp_ranks.win_streak "şu anki" seriyi tutar, kopunca
-- sıfırlanır. Rozetler için "en uzun seri" kalıcı olarak ayrı tutulur.
-- p1/p2_tier_after: maç sonundaki kademe. Sonuç ekranı, maçın kendisinde
-- terfi olup olmadığını sonradan bakıldığında da doğru gösterebilsin diye
-- maç satırına yazılır (comp_ranks.tier o an değişmiş olabilir).
alter table public.comp_ranks
  add column if not exists best_win_streak int not null default 0;
alter table public.comp_matches
  add column if not exists p1_tier_after int,
  add column if not exists p2_tier_after int;

-- ── 1) Puan tavanı kısıtı ───────────────────────────────────────────
alter table public.comp_ranks drop constraint if exists comp_ranks_points_check;
alter table public.comp_ranks
  add constraint comp_ranks_points_check check (points >= 0);

-- ── 2) Süresi dolan maçları sonuçlandır (lazy sweeper) ──────────────
-- Kullanıcının süresi geçmiş 'active' maçlarını comp_finalize_match ile
-- kapatır. comp_finalize_match idempotent; puanlar normal kurallarla işler.
create or replace function public.comp_finalize_expired_for_user(p_user_id uuid)
returns int
language plpgsql security definer
as $$
declare
  v_m record;
  v_n int := 0;
begin
  for v_m in
    select id from public.comp_matches
     where (player1_id = p_user_id or player2_id = p_user_id)
       and status = 'active'
       and deadline_at <= now()
     order by started_at
     limit 20
  loop
    begin
      perform public.comp_finalize_match(v_m.id);
      v_n := v_n + 1;
    exception when others then
      -- Tek bir bozuk maç, kuyruğa girmeyi engellemesin
      null;
    end;
  end loop;
  return v_n;
end;
$$;

revoke execute on function public.comp_finalize_expired_for_user(uuid) from public, anon, authenticated;

-- ── 3) Takma ad benzersizliği (büyük/küçük harf duyarsız) ───────────
create unique index if not exists comp_profiles_nickname_key
  on public.comp_profiles (lower(nickname))
  where nickname is not null;

-- comp_set_nickname: benzersizlik hatasını anlamlı koda çevir + boşluk kırpma
create or replace function public.comp_set_nickname(p_nickname text)
returns text
language plpgsql security definer
as $$
declare
  v_nick text;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  v_nick := nullif(regexp_replace(trim(coalesce(p_nickname, '')), '\s+', ' ', 'g'), '');
  if v_nick is not null then
    if char_length(v_nick) < 2 or char_length(v_nick) > 20 then
      raise exception 'nickname_length' using errcode = '22023';
    end if;
    if v_nick !~ '^[A-Za-z0-9ÇĞİÖŞÜçğıöşü._ -]+$' then
      raise exception 'nickname_chars' using errcode = '22023';
    end if;
    if exists (
      select 1 from public.comp_profiles
       where lower(nickname) = lower(v_nick) and user_id <> auth.uid()
    ) then
      raise exception 'nickname_taken' using errcode = '23505';
    end if;
  end if;
  perform public.comp_upsert_profile(auth.uid());
  update public.comp_profiles
     set nickname = v_nick, updated_at = now()
   where user_id = auth.uid();
  return v_nick;
exception when unique_violation then
  raise exception 'nickname_taken' using errcode = '23505';
end;
$$;

grant execute on function public.comp_set_nickname(text) to authenticated;

-- ── 4) comp_ensure_season_and_rank: sweeper'ı bağla ─────────────────
-- Kullanıcı kuyruğa girerken (veya lobiyi açarken) kendi süresi geçmiş
-- maçları sessizce sonuçlansın.
create or replace function public.comp_ensure_season_and_rank(
  p_user_id uuid
) returns table(out_season_id int, out_tier int, out_points int)
language plpgsql security definer
as $$
declare
  v_now_tr timestamp;
  v_season_id int;
  v_starts_tr timestamp;
  v_ends_tr timestamp;
  v_label text;
  v_month int;
  v_year int;
begin
  v_now_tr := (now() at time zone 'Europe/Istanbul')::timestamp;
  v_year := extract(year from v_now_tr)::int;
  v_month := extract(month from v_now_tr)::int;
  v_season_id := v_year * 100 + v_month;
  v_starts_tr := date_trunc('month', v_now_tr);
  v_ends_tr := v_starts_tr + interval '1 month';
  v_label := case v_month
    when 1 then 'Ocak'      when 2 then 'Şubat'   when 3 then 'Mart'
    when 4 then 'Nisan'     when 5 then 'Mayıs'   when 6 then 'Haziran'
    when 7 then 'Temmuz'    when 8 then 'Ağustos' when 9 then 'Eylül'
    when 10 then 'Ekim'     when 11 then 'Kasım'  when 12 then 'Aralık'
  end || ' ' || v_year::text;

  insert into public.comp_seasons (id, starts_at, ends_at, label)
  values (
    v_season_id,
    v_starts_tr at time zone 'Europe/Istanbul',
    v_ends_tr at time zone 'Europe/Istanbul',
    v_label
  )
  on conflict (id) do nothing;

  -- Hot-fix: kullanıcının süresi geçmiş maçlarını kapat (sezon kapanışından ÖNCE,
  -- ki son maçların puanları o sezonun kupasına yansısın)
  perform public.comp_finalize_expired_for_user(p_user_id);

  -- Faz 5: süresi dolmuş sezonları kapat (kupa dağıtımı)
  perform public.comp_close_open_seasons();

  -- Faz 5: yumuşak reset — en son sezon satırından 2 kademe aşağı, 50 puan.
  -- Taban: yeni kullanıcı varsayılanı (tier 2 = Yükselme 2); kimse sezona
  -- yeni başlayanların altından başlamaz.
  insert into public.comp_ranks (user_id, season_id, tier, points, highest_tier_reached)
  select p_user_id, v_season_id,
         greatest(2, r.tier - 2), 50, greatest(2, r.tier - 2)
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id < v_season_id
   order by r.season_id desc
   limit 1
  on conflict (user_id, season_id) do nothing;

  -- Önceki sezon yoksa varsayılan (Yükselme 2 / 50)
  insert into public.comp_ranks (user_id, season_id)
  values (p_user_id, v_season_id)
  on conflict (user_id, season_id) do nothing;

  -- Faz 5: herkese açık profil (ad/avatar) tazele
  perform public.comp_upsert_profile(p_user_id);

  return query
  select v_season_id, r.tier, r.points
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id = v_season_id;
end;
$$;

grant execute on function public.comp_ensure_season_and_rank(uuid) to authenticated;

-- Faz 6 backfill: mevcut "şu anki seri" değerlerini en uzun seri olarak al
update public.comp_ranks
   set best_win_streak = greatest(best_win_streak, win_streak)
 where best_win_streak < win_streak;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 7 — Sezon özeti, rakip kopma tespiti, soru tekrarı önleme
-- ════════════════════════════════════════════════════════════════════

-- 1) Kupa görüldü damgası: sezon kapanış özeti bir kez gösterilsin
alter table public.comp_trophies
  add column if not exists seen_at timestamptz;

create or replace function public.comp_mark_trophy_seen(p_season_id int)
returns void
language plpgsql security definer
as $$
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  update public.comp_trophies
     set seen_at = now()
   where user_id = auth.uid() and season_id = p_season_id and seen_at is null;
end;
$$;

grant execute on function public.comp_mark_trophy_seen(int) to authenticated;

-- 2) Varlık (presence) damgaları: rakip bağlantısı koptu mu?
-- Maç ekranı zaten 3 sn'de bir /api/comp/match/[id] çağırıyor; o çağrı
-- kendi damgasını günceller. Otomatik hükmen YOK — kalan oyuncuya bir
-- buton gösterilir, kararı o verir (kötü internet yanlış pozitif üretmesin).
alter table public.comp_matches
  add column if not exists p1_seen_at timestamptz,
  add column if not exists p2_seen_at timestamptz;

create or replace function public.comp_touch_presence(p_match_id uuid)
returns void
language plpgsql security definer
as $$
declare
  v_m record;
begin
  select player1_id, player2_id, status into v_m
    from public.comp_matches where id = p_match_id;
  if v_m.status is null or v_m.status <> 'active' then
    return;
  end if;
  if auth.uid() = v_m.player1_id then
    update public.comp_matches set p1_seen_at = now() where id = p_match_id;
  elsif auth.uid() = v_m.player2_id then
    update public.comp_matches set p2_seen_at = now() where id = p_match_id;
  end if;
end;
$$;

grant execute on function public.comp_touch_presence(uuid) to authenticated;

-- comp_claim_abandoned: rakip p_idle_seconds'tir sessizse çağıran hükmen kazanır.
-- Güvenlik: yalnız katılımcı çağırabilir; rakip damgası yoksa maç başlangıcı
-- baz alınır; maç en az 60 sn sürmüş olmalı. Puanlar comp_forfeit_match ile
-- aynı sabit ±30, ama terk eden RAKİP olarak işaretlenir.
create or replace function public.comp_claim_abandoned(p_match_id uuid)
returns boolean
language plpgsql security definer
as $$
declare
  v_m record;
  v_caller uuid := auth.uid();
  v_opponent uuid;
  v_opp_seen timestamptz;
  v_idle int := 90;   -- rakip bu kadar saniyedir sessizse kopmuş sayılır
  v_min_age int := 60; -- maçın en az bu kadar sürmüş olması gerekir
begin
  select * into v_m from public.comp_matches where id = p_match_id for update;
  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;

  -- Faz 8: arkadaş düellosunda puan işlemediği için hükmen galibiyet
  -- talebi de anlamsızdır; istemcide de buton gizlenir.
  if coalesce(v_m.is_friendly, false) then
    return false;
  end if;
  if v_caller <> v_m.player1_id and v_caller <> v_m.player2_id then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_m.status <> 'active' then
    return false;
  end if;
  if v_m.started_at > now() - make_interval(secs => v_min_age) then
    return false;
  end if;

  if v_caller = v_m.player1_id then
    v_opponent := v_m.player2_id;
    v_opp_seen := coalesce(v_m.p2_seen_at, v_m.started_at);
  else
    v_opponent := v_m.player1_id;
    v_opp_seen := coalesce(v_m.p1_seen_at, v_m.started_at);
  end if;

  if v_opp_seen > now() - make_interval(secs => v_idle) then
    return false;  -- rakip hâlâ bağlı
  end if;

  -- Rakip terk etmiş sayılır: comp_forfeit_match'in kural setini rakip
  -- adına uygula (tek doğruluk kaynağı olsun diye aynı fonksiyon).
  perform set_config('request.jwt.claim.sub', v_opponent::text, true);
  perform public.comp_forfeit_match(p_match_id);
  perform set_config('request.jwt.claim.sub', v_caller::text, true);
  return true;
end;
$$;

grant execute on function public.comp_claim_abandoned(uuid) to authenticated;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 8 — Arkadaş düellosu (davet linki)
-- ════════════════════════════════════════════════════════════════════
-- Lobideki "Arkadaşına meydan oku" artık gerçek: davet eden 6 karakterlik
-- bir kod üretir, linki paylaşır, kabul eden tıklayınca maç açılır.
--
-- Arkadaş maçı RANKLI DEĞİLDİR: comp_finalize_match içinde is_friendly
-- kontrolü var — puan değişmez, galibiyet/mağlubiyet sayacı ve seri artmaz.
-- Yine de comp_matches'e yazılır; maç geçmişinde görünür.
--
-- Idempotenttir: SQL editöründe tekrar tekrar çalıştırılabilir.

-- GÜVENLİK DÜZELTMESİ: eski "invite readable by code" politikası
-- `using (true)` diyordu — yani kodu bilmek gerekmiyordu, giriş yapmış
-- herkes TÜM davetleri (kod, davet eden, süre) tablodan okuyabiliyordu.
-- Anon anahtar tarayıcıda açık olduğu için bu, davet gaspına ve rakip
-- seçmeye açık bir kapıydı. Politika kaldırıldı; kabul akışının ihtiyaç
-- duyduğu tek alan aşağıdaki dar kapsamlı fonksiyonla veriliyor.
drop policy if exists "invite readable by code" on public.comp_invites;

-- İmza değişirse `create or replace` hata verir (OUT parametreli ve
-- `returns table` fonksiyonlarda dönüş tipi değiştirilemez); şema
-- dosyasının tekrar çalıştırılabilir kalması için önce düşür.
drop function if exists public.comp_accept_invite(text, text[]);
drop function if exists public.comp_invite_status(text);
drop function if exists public.comp_peek_invite(text);
drop function if exists public.comp_my_invite();

-- Karışması kolay harfler (0/O, 1/I/L) dışlanmış 6 karakterlik kod.
create or replace function public.comp_generate_invite_code()
returns text language plpgsql as $$
declare
  v_alfabe text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  v_kod text;
  v_deneme int := 0;
begin
  loop
    v_kod := '';
    for i in 1..6 loop
      v_kod := v_kod || substr(v_alfabe, 1 + floor(random() * length(v_alfabe))::int, 1);
    end loop;
    exit when not exists (select 1 from public.comp_invites where code = v_kod);
    v_deneme := v_deneme + 1;
    if v_deneme > 20 then
      raise exception 'code_generation_failed' using errcode = 'P0001';
    end if;
  end loop;
  return v_kod;
end;
$$;

revoke execute on function public.comp_generate_invite_code() from public, anon;

-- Davet oluşturur ve kodu döner. Kullanıcının önceki kullanılmamış
-- davetleri temizlenir (aynı anda tek geçerli link).
create or replace function public.comp_create_invite(
  p_subject_filter text
) returns text
language plpgsql security definer
as $$
declare
  v_kod text;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = 'P0001';
  end if;

  -- Süresi dolmuş davetleri genel olarak temizle (tablo şişmesin)
  delete from public.comp_invites
   where expires_at < now() - interval '1 day' and consumed_match_id is null;

  -- Kullanıcının kullanılmamış eski davetlerini iptal et
  delete from public.comp_invites
   where inviter_id = auth.uid() and consumed_match_id is null;

  v_kod := public.comp_generate_invite_code();

  insert into public.comp_invites (code, inviter_id, subject_filter, expires_at)
  values (v_kod, auth.uid(), p_subject_filter, now() + interval '30 minutes');

  return v_kod;
end;
$$;

grant execute on function public.comp_create_invite(text) to authenticated;

-- Daveti kabul eder ve arkadaş maçını açar.
-- Dönen değerler:
--   out_match_id  → maç açıldıysa maçın kimliği
--   out_error     → açılamadıysa sebep ('not_found' | 'expired' | 'consumed'
--                   | 'self' | 'busy'); maç açıldıysa null
create or replace function public.comp_accept_invite(
  p_code text,
  p_question_ids text[],
  out out_match_id uuid,
  out out_error text
)
language plpgsql security definer
as $$
declare
  v_inv record;
  v_season_id int;
  v_davetci_tier int;
  v_kabul_tier int;
  v_aktif uuid;
begin
  out_match_id := null;
  out_error := null;

  if auth.uid() is null then
    out_error := 'unauthorized';
    return;
  end if;

  select * into v_inv from public.comp_invites
   where code = upper(trim(p_code)) for update;

  if v_inv.code is null then
    out_error := 'not_found';
    return;
  end if;
  if v_inv.consumed_match_id is not null then
    out_error := 'consumed';
    return;
  end if;
  if v_inv.expires_at < now() then
    out_error := 'expired';
    return;
  end if;
  if v_inv.inviter_id = auth.uid() then
    out_error := 'self';
    return;
  end if;

  -- İki taraftan biri başka bir maçtaysa açma
  select id into v_aktif from public.comp_matches
   where status = 'active' and deadline_at > now()
     and (player1_id in (auth.uid(), v_inv.inviter_id)
       or player2_id in (auth.uid(), v_inv.inviter_id))
   limit 1;
  if v_aktif is not null then
    out_error := 'busy';
    return;
  end if;

  -- Sezon ve rütbe kayıtlarını iki taraf için de garanti et (rütbe
  -- değişmeyecek ama maç kaydı season_id ve tier alanlarını istiyor).
  select s.out_season_id, s.out_tier into v_season_id, v_kabul_tier
    from public.comp_ensure_season_and_rank(auth.uid()) s;
  select s.out_tier into v_davetci_tier
    from public.comp_ensure_season_and_rank(v_inv.inviter_id) s;

  insert into public.comp_matches (
    season_id, player1_id, player2_id,
    p1_tier_at_start, p2_tier_at_start,
    question_ids, subject_filter, is_friendly, deadline_at
  ) values (
    v_season_id, v_inv.inviter_id, auth.uid(),
    v_davetci_tier, v_kabul_tier,
    p_question_ids, v_inv.subject_filter, true, now() + interval '10 minutes'
  ) returning id into out_match_id;

  update public.comp_invites
     set consumed_match_id = out_match_id
   where code = v_inv.code;

  -- İki taraftan biri sırada rakip arıyorsa kuyruktan çıkar. match_make
  -- eşleşme kurar kurmaz aynısını yapıyor; burada yapılmazsa oyuncu hem
  -- arkadaş maçında hem de kuyrukta kalır ve ikinci bir maça sokulur.
  delete from public.comp_queue
   where user_id in (auth.uid(), v_inv.inviter_id);
end;
$$;

grant execute on function public.comp_accept_invite(text, text[]) to authenticated;

-- Davet edenin "kabul edildi mi?" yoklaması için: kendi kodunun durumu.
create or replace function public.comp_invite_status(p_code text)
returns table (out_match_id uuid, out_expires_at timestamptz)
language sql security definer
as $$
  select consumed_match_id, expires_at
    from public.comp_invites
   where code = upper(trim(p_code)) and inviter_id = auth.uid();
$$;

grant execute on function public.comp_invite_status(text) to authenticated;

-- Kabul ekranının ihtiyaç duyduğu TEK alanı (soruların hangi dersten
-- geleceği) yalnız geçerli bir kod için verir. Tablo artık dışarıya
-- kapalı olduğu için kabul route'u bu fonksiyonu kullanır.
create or replace function public.comp_peek_invite(
  p_code text,
  out out_subject_filter text,
  out out_error text
)
language plpgsql security definer
set search_path = public
as $$
declare
  v_inv record;
begin
  out_subject_filter := null;
  out_error := null;

  if auth.uid() is null then
    out_error := 'unauthorized';
    return;
  end if;

  select * into v_inv from public.comp_invites
   where code = upper(trim(p_code));

  if v_inv.code is null then
    out_error := 'not_found';
    return;
  end if;
  if v_inv.consumed_match_id is not null then
    out_error := 'consumed';
    return;
  end if;
  if v_inv.expires_at < now() then
    out_error := 'expired';
    return;
  end if;
  if v_inv.inviter_id = auth.uid() then
    out_error := 'self';
    return;
  end if;

  out_subject_filter := v_inv.subject_filter;
end;
$$;

revoke execute on function public.comp_peek_invite(text) from public, anon;
grant execute on function public.comp_peek_invite(text) to authenticated;

-- Davet eden sayfayı yenilerse kodunu kaybetmesin: açık davetini döner.
-- Bu olmadan kullanıcı yeni kod üretiyor ve arkadaşının elindeki link
-- sessizce ölüyordu.
create or replace function public.comp_my_invite(
  out out_code text,
  out out_expires_at timestamptz
)
language plpgsql security definer
set search_path = public
as $$
begin
  select code, expires_at into out_code, out_expires_at
    from public.comp_invites
   where inviter_id = auth.uid()
     and consumed_match_id is null
     and expires_at > now()
   order by created_at desc
   limit 1;
end;
$$;

revoke execute on function public.comp_my_invite() from public, anon;
grant execute on function public.comp_my_invite() to authenticated;

-- Davet eden vazgeçerse linki gerçekten iptal etsin (eskiden yalnız
-- ekrandan siliniyordu, link 30 dakika daha canlı kalıyordu).
create or replace function public.comp_cancel_invite()
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  delete from public.comp_invites
   where inviter_id = auth.uid() and consumed_match_id is null;
end;
$$;

revoke execute on function public.comp_cancel_invite() from public, anon;
grant execute on function public.comp_cancel_invite() to authenticated;


-- ════════════════════════════════════════════════════════════════════
-- FAZ 8 — Geri bildirim
-- ════════════════════════════════════════════════════════════════════
-- Öğrenci bir soruda hata görürse ya da bir şey çalışmazsa söyleyebilsin.
-- İlk gerçek kullanıcılardan gelecek en değerli şey bu.
--
-- Gizlilik: kullanıcı yalnızca KENDİ gönderdiklerini okuyabilir; kimse
-- başkasının geri bildirimini göremez. Yönetim tarafı Supabase panelinden
-- (service-role) okunur.

create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  kind       text not null check (kind in ('soru-hatasi','calismiyor','oneri','diger')),
  message    text not null check (char_length(trim(message)) between 5 and 2000),
  page_path  text,
  created_at timestamptz not null default now()
);

create index if not exists feedback_created_idx on public.feedback (created_at desc);

-- page_path istemciden geliyor; sınırsız uzunlukta olmamalı.
alter table public.feedback drop constraint if exists feedback_page_path_len;
alter table public.feedback
  add constraint feedback_page_path_len
  check (page_path is null or char_length(page_path) <= 200);

create index if not exists feedback_user_idx
  on public.feedback (user_id, created_at desc);

alter table public.feedback enable row level security;

-- id ve created_at istemciden yazılamasın: aksi halde kullanıcı
-- created_at'i ileri bir tarihe koyup kendi bildirimini triyaj
-- listesinin başına sabitleyebilir.
revoke insert (id, created_at) on public.feedback from authenticated;

drop policy if exists "own feedback insert" on public.feedback;
create policy "own feedback insert" on public.feedback
  for insert to authenticated
  with check (
    auth.uid() = user_id
    -- Basit hız sınırı: saatte en fazla 20 kayıt. Ücretsiz katmanda disk
    -- kotasını tek kullanıcının doldurmasını engeller.
    and (
      select count(*) from public.feedback f
       where f.user_id = auth.uid()
         and f.created_at > now() - interval '1 hour'
    ) < 20
  );

drop policy if exists "own feedback read" on public.feedback;
create policy "own feedback read" on public.feedback
  for select to authenticated
  using (auth.uid() = user_id);

-- ════════════════════════════════════════════════════════════════════
-- FAZ 9 — Telefon (Web Push) bildirim abonelikleri
-- Uygulamayı telefonuna kuranların bildirim iznine karşılık gelen
-- push abonelikleri. Her cihaz ayrı satırdır (bir kullanıcının hem
-- telefonu hem tableti olabilir). endpoint benzersizdir.
-- ════════════════════════════════════════════════════════════════════
create table if not exists public.push_subscriptions (
  endpoint   text primary key,
  user_id    uuid not null references auth.users on delete cascade,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);

alter table public.push_subscriptions enable row level security;

drop policy if exists "own push subs" on public.push_subscriptions;
create policy "own push subs" on public.push_subscriptions
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists push_subscriptions_user_idx
  on public.push_subscriptions (user_id);

-- ════════════════════════════════════════════════════════════════════
-- FAZ 10 — Haftalık görevler (rekabet)
-- Her hafta 3 sabit görev; tamamlayan lig puanı ödülünü BİR kez alır.
-- Hafta sınırı Türkiye saatiyle ISO haftasıdır. İlerleme ve ödül
-- doğrulaması tamamen sunucudadır — istemciden sayı gelmez.
-- ════════════════════════════════════════════════════════════════════
create table if not exists public.comp_weekly_claims (
  user_id    uuid not null references auth.users on delete cascade,
  hafta      text not null,                 -- 'IYYY-IW' (TR)
  gorev      text not null,
  claimed_at timestamptz not null default now(),
  primary key (user_id, hafta, gorev)
);

alter table public.comp_weekly_claims enable row level security;

-- Yalnız kendi talepleri görünür; INSERT politikası bilerek YOK —
-- satırlar yalnız aşağıdaki security definer fonksiyondan yazılır.
drop policy if exists "own weekly claims" on public.comp_weekly_claims;
create policy "own weekly claims" on public.comp_weekly_claims
  for select to authenticated using (auth.uid() = user_id);

-- Bu haftanın (TR) anahtarı
create or replace function public.comp_hafta_anahtari()
returns text language sql stable as $$
  select to_char(now() at time zone 'Europe/Istanbul', 'IYYY-IW');
$$;

-- Görev ilerlemesi: quest / progress / target / reward / claimed
create or replace function public.comp_weekly_progress()
returns table(gorev text, ilerleme int, hedef int, odul int, alindi boolean)
language plpgsql security definer
as $$
declare
  v_uid uuid := auth.uid();
  v_hafta text := public.comp_hafta_anahtari();
  -- TR haftası başlangıcı (Pazartesi 00:00 TR) UTC cinsinden
  v_bas timestamptz := (date_trunc('week', now() at time zone 'Europe/Istanbul'))
                       at time zone 'Europe/Istanbul';
  v_mac int; v_soru int; v_gun int;
begin
  if v_uid is null then
    raise exception 'giris gerekli';
  end if;

  select count(*)::int into v_mac
    from public.comp_matches m
   where m.status = 'finished'
     and m.is_friendly = false
     and m.started_at >= v_bas
     and (m.player1_id = v_uid or m.player2_id = v_uid);

  select coalesce(sum(q.correct_count + q.wrong_count), 0)::int into v_soru
    from public.quiz_results q
   where q.user_id = v_uid and q.created_at >= v_bas;

  select count(distinct (s.started_at at time zone 'Europe/Istanbul')::date)::int
    into v_gun
    from public.study_sessions s
   where s.user_id = v_uid and s.started_at >= v_bas;

  return query
  select g.gorev, g.ilerleme, g.hedef, g.odul,
         exists (
           select 1 from public.comp_weekly_claims c
            where c.user_id = v_uid and c.hafta = v_hafta and c.gorev = g.gorev
         ) as alindi
  from (values
    ('uc-mac',   least(v_mac, 3),    3,   15),
    ('yuz-soru', least(v_soru, 100), 100, 10),
    ('bes-gun',  least(v_gun, 5),    5,   20)
  ) as g(gorev, ilerleme, hedef, odul);
end;
$$;

-- Ödül talebi: ilerleme SUNUCUDA yeniden doğrulanır, çifte talep PK ile
-- engellenir, puan mevcut sezonun rütbesine terfi kurallarıyla işlenir.
create or replace function public.comp_claim_weekly(p_gorev text)
returns json language plpgsql security definer
as $$
declare
  v_uid uuid := auth.uid();
  v_hafta text := public.comp_hafta_anahtari();
  v_satir record;
  v_season int;
  v_rank record;
  v_yeni_tier int; v_yeni_puan int; v_yeni_zirve int;
begin
  if v_uid is null then
    return json_build_object('ok', false, 'sebep', 'giris');
  end if;

  select * into v_satir
    from public.comp_weekly_progress() p
   where p.gorev = p_gorev;
  if v_satir.gorev is null then
    return json_build_object('ok', false, 'sebep', 'gecersiz-gorev');
  end if;
  if v_satir.alindi then
    return json_build_object('ok', false, 'sebep', 'zaten-alindi');
  end if;
  if v_satir.ilerleme < v_satir.hedef then
    return json_build_object('ok', false, 'sebep', 'tamamlanmadi');
  end if;

  -- Çifte talep yarışını PK çözer
  begin
    insert into public.comp_weekly_claims (user_id, hafta, gorev)
    values (v_uid, v_hafta, p_gorev);
  exception when unique_violation then
    return json_build_object('ok', false, 'sebep', 'zaten-alindi');
  end;

  select out_season_id into v_season
    from public.comp_ensure_season_and_rank(v_uid);

  select * into v_rank from public.comp_ranks
   where user_id = v_uid and season_id = v_season
   for update;

  v_yeni_tier := v_rank.tier;
  v_yeni_puan := v_rank.points + v_satir.odul;
  v_yeni_zirve := v_rank.highest_tier_reached;
  -- Maç sonuçlarıyla aynı terfi kuralı
  while v_yeni_puan >= 100 and v_yeni_tier < 9 loop
    v_yeni_puan := v_yeni_puan - 100;
    v_yeni_tier := v_yeni_tier + 1;
    if v_yeni_tier > v_yeni_zirve then v_yeni_zirve := v_yeni_tier; end if;
  end loop;
  if v_yeni_tier < 9 and v_yeni_puan > 99 then v_yeni_puan := 99; end if;

  update public.comp_ranks set
    tier = v_yeni_tier,
    points = v_yeni_puan,
    highest_tier_reached = v_yeni_zirve,
    updated_at = now()
  where user_id = v_uid and season_id = v_season;

  return json_build_object(
    'ok', true, 'odul', v_satir.odul,
    'tier', v_yeni_tier, 'points', v_yeni_puan
  );
end;
$$;

-- ============================================================================
-- FAZ 11 — ÖĞRENEN ÖNBELLEK (baykuşun AI cevaplarını kalıcı hâle getirmesi)
-- ============================================================================
-- Amaç: Kullanıcının sorduğu, bizim önceden kalıp yazmadığımız bir soruya AI
-- bir kez cevap verdikten sonra o cevap önbelleğe alınır; aynı soru bir daha
-- geldiğinde AI'ya gidilmez. Böylece kota kullanımı zamanla düşer.
--
-- Haftalık bakım: az kullanılan (alt %25) önbellek satırları pasife alınır,
-- tablo şişmez ve güncelliğini yitirmiş cevaplar kendiliğinden elenir.
-- ============================================================================

create table if not exists public.ai_onbellek (
  id            bigserial primary key,
  -- Normalize edilmiş + kelimeleri sıralanmış parmak izi (arama anahtarı)
  parmak_izi    text        not null unique,
  -- Kullanıcının yazdığı ilk hâli (yönetim/denetim için)
  soru_ornek    text        not null,
  cevap         text        not null,
  navigate      text,
  topic_route   text,
  kullanim      integer     not null default 1,
  son_kullanim  timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  aktif         boolean     not null default true,
  -- 'ai' → modelden öğrenildi, 'elle' → biz yazdık (asla elenmez)
  kaynak        text        not null default 'ai',
  olusturan     uuid        references auth.users(id) on delete set null
);

create index if not exists ai_onbellek_aktif_idx
  on public.ai_onbellek (aktif, parmak_izi);
create index if not exists ai_onbellek_kullanim_idx
  on public.ai_onbellek (kullanim desc, son_kullanim desc);

alter table public.ai_onbellek enable row level security;

-- Okuma: herkes (misafir öğrenci de baykuşa soru sorabiliyor).
drop policy if exists "onbellek okunur" on public.ai_onbellek;
create policy "onbellek okunur" on public.ai_onbellek
  for select using (aktif);

-- Yazma YOK: yalnız aşağıdaki security definer fonksiyonlarla yazılır.

-- ── Arama + sayaç artırma (tek gidiş) ──────────────────────────────────────
create or replace function public.ai_onbellek_ara(p_parmak_izi text)
returns table (cevap text, navigate text, topic_route text)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.ai_onbellek
     set kullanim = kullanim + 1,
         son_kullanim = now()
   where parmak_izi = p_parmak_izi
     and aktif
  returning ai_onbellek.cevap, ai_onbellek.navigate, ai_onbellek.topic_route;
end;
$$;

-- ── Yazma (AI cevabından öğrenme) ──────────────────────────────────────────
-- Yalnız giriş yapmış kullanıcı adına çağrılabilir; saatte en fazla 30 yeni
-- kayıt (kötüye kullanım/şişirme koruması). Aynı parmak izi varsa yalnız
-- sayaç artar, cevap değişmez (ilk öğrenilen cevap kalıcıdır).
create or replace function public.ai_onbellek_yaz(
  p_parmak_izi  text,
  p_soru_ornek  text,
  p_cevap       text,
  p_navigate    text default null,
  p_topic_route text default null
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_son_saat integer;
begin
  if v_uid is null then return false; end if;
  if p_parmak_izi is null or length(p_parmak_izi) < 3 or length(p_parmak_izi) > 400 then
    return false;
  end if;
  if p_cevap is null or length(p_cevap) < 15 or length(p_cevap) > 4000 then
    return false;
  end if;

  -- Zaten varsa: sayaç artır, içeriği DEĞİŞTİRME
  update public.ai_onbellek
     set kullanim = kullanim + 1, son_kullanim = now(), aktif = true
   where parmak_izi = p_parmak_izi;
  if found then return true; end if;

  select count(*) into v_son_saat
    from public.ai_onbellek
   where olusturan = v_uid and created_at > now() - interval '1 hour';
  if v_son_saat >= 30 then return false; end if;

  insert into public.ai_onbellek
    (parmak_izi, soru_ornek, cevap, navigate, topic_route, olusturan)
  values
    (p_parmak_izi, left(p_soru_ornek, 500), p_cevap, p_navigate, p_topic_route, v_uid)
  on conflict (parmak_izi) do nothing;
  return true;
end;
$$;

-- ── Haftalık bakım: az kullanılanları ele ──────────────────────────────────
-- Kural: en az 7 gündür duran, kullanıcıların en AZ kullandığı %25'lik dilim
-- pasife alınır. Elle yazılmış kayıtlara (kaynak='elle') dokunulmaz.
-- 60 günden uzun süredir pasif olanlar tamamen silinir.
create or replace function public.ai_onbellek_bakim()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_aday integer;
  v_pasif integer := 0;
  v_silinen integer := 0;
  v_esik integer;
begin
  select count(*) into v_aday
    from public.ai_onbellek
   where aktif and kaynak = 'ai' and created_at < now() - interval '7 days';

  if v_aday >= 8 then
    -- Alt %25'in kullanım eşiği (dahil)
    select kullanim into v_esik
      from public.ai_onbellek
     where aktif and kaynak = 'ai' and created_at < now() - interval '7 days'
     order by kullanim asc, son_kullanim asc
     offset greatest(0, floor(v_aday * 0.25)::int - 1)
     limit 1;

    with elenen as (
      select id from public.ai_onbellek
       where aktif and kaynak = 'ai'
         and created_at < now() - interval '7 days'
       order by kullanim asc, son_kullanim asc
       limit floor(v_aday * 0.25)::int
    )
    update public.ai_onbellek o
       set aktif = false
      from elenen e
     where o.id = e.id;
    get diagnostics v_pasif = row_count;
  end if;

  delete from public.ai_onbellek
   where not aktif and kaynak = 'ai' and son_kullanim < now() - interval '60 days';
  get diagnostics v_silinen = row_count;

  return json_build_object(
    'aday', v_aday, 'pasife_alinan', v_pasif,
    'silinen', v_silinen, 'esik', v_esik
  );
end;
$$;

-- ── Küfür/hakaret süzgeci (takma adlar için sunucu tarafı) ─────────────────
-- SİTE KURALI: takma adlar küfür/hakaret içeremez. İstemci tarafı denetimi
-- atlanabileceği için aynı denetim burada da yapılır.
create or replace function public.uygunsuz_metin(p_metin text)
returns boolean
language plpgsql
immutable
set search_path = public
as $$
declare
  v text;
  k text;
  v_kokler text[] := array[
    'amk','amcik','amina','sike','siker','sikim','sikik','siktir','sikeyim',
    'yarrak','yarak','tasak','gotveren','gotlek','pezevenk','orospu','kahpe',
    'kaltak','surtuk','fahise','piclik','oruspu','koyim','koyayim','yavsak',
    'ibne','gavat','pust','gerizekali','aptal','salak','ahmak','embesil',
    'beyinsiz','denyo','dangalak','serefsiz','namussuz','gerzek','budala',
    'avanak','eroin','kokain','molotof','kumar','bahis'
  ];
begin
  if p_metin is null then return false; end if;
  -- Türkçe sadeleştirme + rakamla gizleme açma (4→a, 3→e, 1→i, 0→o, $→s ...)
  -- İki dizinin uzunluğu birebir eşit olmalıdır (23 karakter).
  v := lower(translate(p_metin,
        'İIÇĞÖŞÜçğıöşü4@3!10$759',
        'iicgosucgiosuaaeiiostsg'));
  v := regexp_replace(v, '[^a-z]', '', 'g');
  -- ardışık tekrarları teke indir (aaamk → amk)
  v := regexp_replace(v, '(.)\1+', '\1', 'g');
  if v = '' then return false; end if;
  foreach k in array v_kokler loop
    if position(k in v) > 0 then return true; end if;
  end loop;
  -- kısa kökler yalnız metnin tamamıysa
  if v in ('mal','got','kic','bok','pic','aq') then return true; end if;
  return false;
end;
$$;

-- ── comp_set_nickname: küfür/hakaret süzgeci (SİTE KURALI) ────────────────
-- Takma adlar uygunsuz söz içeremez. İstemci denetimi atlanabileceği için
-- son söz burada verilir.
create or replace function public.comp_set_nickname(p_nickname text)
returns text
language plpgsql security definer
as $$
declare
  v_nick text;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  v_nick := nullif(regexp_replace(trim(coalesce(p_nickname, '')), '\s+', ' ', 'g'), '');
  if v_nick is not null then
    if char_length(v_nick) < 2 or char_length(v_nick) > 20 then
      raise exception 'nickname_length' using errcode = '22023';
    end if;
    if v_nick !~ '^[A-Za-z0-9ÇĞİÖŞÜçğıöşü._ -]+$' then
      raise exception 'nickname_chars' using errcode = '22023';
    end if;
    if public.uygunsuz_metin(v_nick) then
      raise exception 'nickname_uygunsuz' using errcode = '22023';
    end if;
    if exists (
      select 1 from public.comp_profiles
       where lower(nickname) = lower(v_nick) and user_id <> auth.uid()
    ) then
      raise exception 'nickname_taken' using errcode = '23505';
    end if;
  end if;
  perform public.comp_upsert_profile(auth.uid());
  update public.comp_profiles
     set nickname = v_nick, updated_at = now()
   where user_id = auth.uid();
  return v_nick;
exception when unique_violation then
  raise exception 'nickname_taken' using errcode = '23505';
end;
$$;

grant execute on function public.comp_set_nickname(text) to authenticated;
grant execute on function public.ai_onbellek_ara(text) to anon, authenticated;
grant execute on function public.ai_onbellek_yaz(text, text, text, text, text) to authenticated;
grant execute on function public.uygunsuz_metin(text) to anon, authenticated;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 12 — REKABET GÜVENLİK DÜZELTMELERİ
-- ════════════════════════════════════════════════════════════════════
-- Denetimde bulunan ve yerel Postgres'te kanıtlanan açıklar:
--   1. comp_finalize_match herkese açıktı ve çağıranı doğrulamıyordu →
--      biri, rakibi henüz 2 soru cevaplamışken maçı bitirip onu 0'a
--      düşürebiliyordu.
--   2. comp_queue RLS'i `for all` idi → oyuncu kendi satırına tier 0
--      yazıp acemilerle eşleşebiliyor, bir de fazla puan alıyordu.
--   3. comp_queue_reset aktif maçı cezasız 'abandoned' yapıyordu →
--      kaybeden "Baştan başla"ya basıp kaçabiliyordu (üstelik maç
--      sayfası ile lobi arasında sonsuz yönlendirme döngüsü doğuyordu).
--   4. match_make çağıranı doğrulamıyor ve kendi kuyruk satırını
--      kilitlemiyordu → aynı oyuncu iki maça birden düşebiliyordu.
--   5. comp_join_queue'daki "bayat satır" temizliği kullanıcı filtresiz
--      idi → başkasının 5 dakikadan eski kuyruk satırını siliyor, o
--      oyuncu sonsuza dek "rakip aranıyor"da kalıyordu.
--   6. comp_claim_abandoned yalnız GET yoklamasından beslenen presence'a
--      bakıyordu → soru cevaplayan aktif rakip "terk etmiş" sayılabiliyor;
--      ayrıca set_config ile kimlik taklidi kırılgandı.
--
-- Idempotenttir: SQL editöründe tekrar tekrar çalıştırılabilir.

-- ────────────────────────────────────────────────────────────────────
-- 12.1  comp_queue RLS: yazma hakkı kalktı (tier sahteciliği kapandı)
-- ────────────────────────────────────────────────────────────────────
-- Kuyruğa yazma artık YALNIZ security definer comp_join_queue üzerinden.
-- İstemciye kalan: kendi satırını okumak ve silmek (kuyruktan çıkma).
drop policy if exists "own queue row" on public.comp_queue;
drop policy if exists "own queue row select" on public.comp_queue;
drop policy if exists "own queue row delete" on public.comp_queue;
create policy "own queue row select" on public.comp_queue
  for select to authenticated
  using (auth.uid() = user_id);
create policy "own queue row delete" on public.comp_queue
  for delete to authenticated
  using (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────
-- 12.2  match_make: yalnız dahili çağrı + kendi satırını kilitle
-- ────────────────────────────────────────────────────────────────────
revoke execute on function public.match_make(uuid, int, int, text, text[], int)
  from public, anon, authenticated;

create or replace function public.match_make(
  p_user_id        uuid,
  p_season_id      int,
  p_tier           int,
  p_subject_filter text,
  p_question_ids   text[],
  p_age_seconds    int default 0
) returns uuid
language plpgsql security definer
as $$
declare
  v_opponent uuid;
  v_match_id uuid;
  v_opp_tier int;
  v_now      timestamptz := now();
  v_band     int;
  v_self     uuid;
begin
  -- FAZ 12: önce KENDİ kuyruk satırını kilitle. İki sekmeden aynı anda
  -- tick atan oyuncu, kilitsizken iki ayrı maça birden düşebiliyordu.
  -- Satır yoksa (başka bir istek bizi çoktan eşleştirmiş) sessizce çık.
  select q.user_id into v_self
    from public.comp_queue q
   where q.user_id = p_user_id
   for update;
  if v_self is null then
    return null;
  end if;

  -- Tier rampı (yaşa göre): kuyrukta uzun bekleyen için arama bandını genişlet
  --   <=15s → 0 (sadece aynı tier) · <=45s → 1 · <=90s → 2 · >90s → 3
  v_band := case
    when p_age_seconds <= 15 then 0
    when p_age_seconds <= 45 then 1
    when p_age_seconds <= 90 then 2
    else 3
  end;

  -- FAZ 12: tier'ı çağıranın iddiasından değil, kuyruk satırından
  -- (comp_join_queue'nun comp_ranks'ten yazdığı değerden) okuyoruz.
  select q.tier into p_tier from public.comp_queue q where q.user_id = p_user_id;

  -- En yakın tier'dan başla, eşitlikte en eski beklemiş kazansın.
  -- skip locked: kilitli rakip satırı atlanır → deadlock oluşmaz.
  select q.user_id, q.tier into v_opponent, v_opp_tier
    from public.comp_queue q
   where q.user_id <> p_user_id
     and q.season_id = p_season_id
     and abs(q.tier - p_tier) <= v_band
     and coalesce(q.subject_filter, '') = coalesce(p_subject_filter, '')
   order by abs(q.tier - p_tier) asc, q.joined_at asc
   for update skip locked
   limit 1;

  if v_opponent is null then
    return null;
  end if;

  insert into public.comp_matches (
    season_id, player1_id, player2_id,
    p1_tier_at_start, p2_tier_at_start,
    question_ids, subject_filter,
    deadline_at
  )
  values (
    p_season_id, p_user_id, v_opponent,
    p_tier, v_opp_tier,
    p_question_ids, p_subject_filter,
    v_now + interval '10 minutes'
  )
  returning id into v_match_id;

  delete from public.comp_queue
   where user_id in (p_user_id, v_opponent);

  return v_match_id;
end;
$$;

-- ────────────────────────────────────────────────────────────────────
-- 12.3  comp_join_queue: bayat satır temizliği artık başkasını vurmuyor
-- ────────────────────────────────────────────────────────────────────
create or replace function public.comp_join_queue(
  p_subject_filter text,
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_active_id uuid;
  v_match_id uuid;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  -- FAZ 12: eski hâli `delete from comp_queue where joined_at < now() - 5min`
  -- idi — kullanıcı filtresi YOKTU. Kuyrukta 5 dakikadır sabırla bekleyen
  -- başka bir öğrencinin satırını siliyordu; o öğrencinin tick'i artık
  -- kuyrukta satır bulamadığı için sonsuza dek "rakip aranıyor"da kalıyordu.
  -- Artık yalnız KENDİ bayat satırımız (zaten hemen altında üzerine
  -- yazılacak) ve gerçekten terk edilmiş (30dk+) satırlar temizlenir.
  delete from public.comp_queue
   where joined_at < now() - interval '30 minutes';

  select s.out_season_id, s.out_tier into v_season_id, v_tier
    from public.comp_ensure_season_and_rank(auth.uid()) s;

  select id into v_active_id
    from public.comp_matches
   where (player1_id = auth.uid() or player2_id = auth.uid())
     and status = 'active'
     and deadline_at > now()
   limit 1;
  if v_active_id is not null then
    return v_active_id;
  end if;

  insert into public.comp_queue
    (user_id, season_id, tier, subject_filter, expand_at)
  values
    (auth.uid(), v_season_id, v_tier, p_subject_filter, now() + interval '15 seconds')
  on conflict (user_id) do update set
    season_id = excluded.season_id,
    tier = excluded.tier,
    subject_filter = excluded.subject_filter,
    joined_at = now(),
    expand_at = now() + interval '15 seconds';

  v_match_id := public.match_make(
    auth.uid(), v_season_id, v_tier,
    p_subject_filter, p_question_ids,
    0
  );
  return v_match_id;
end;
$$;

grant execute on function public.comp_join_queue(text, text[]) to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.4  comp_queue_reset: aktif maçtan cezasız kaçış kapandı
-- ────────────────────────────────────────────────────────────────────
-- Eski hâli devam eden maçı 'abandoned' yapıyordu: kaybetmekte olan
-- oyuncu lobiye dönüp "Baştan başla"ya basınca puan kaybetmeden
-- kurtuluyordu. Artık reset yalnız kuyruğu temizler; süresi geçmiş
-- maçları normal kurallarla kapatır; DEVAM EDEN maça dokunmaz.
-- Maçtan çıkmanın tek yolu comp_forfeit_match (hükmen mağlubiyet).
-- Dönüş tipi void → uuid olduğu için önce düşürülmeli.
drop function if exists public.comp_queue_reset();
create function public.comp_queue_reset()
returns uuid
language plpgsql security definer
as $$
declare
  v_active_id uuid;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  delete from public.comp_queue where user_id = auth.uid();

  -- Süresi dolmuş maçları düzgün kapat (puanlar normal kurallarla işler).
  perform public.comp_finalize_expired_for_user(auth.uid());

  -- Hâlâ devam eden bir maç varsa id'sini dön: istemci lobiye değil maça
  -- yönlendirsin (eski davranış iki sayfa arasında döngü üretiyordu).
  select id into v_active_id
    from public.comp_matches
   where (player1_id = auth.uid() or player2_id = auth.uid())
     and status = 'active'
     and deadline_at > now()
   limit 1;

  return v_active_id;
end;
$$;

grant execute on function public.comp_queue_reset() to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.5  comp_record_answer: cevap = canlılık kanıtı
-- ────────────────────────────────────────────────────────────────────
-- Presence damgası yalnız GET yoklamasından geliyordu; sekmesi arka
-- planda olup soru cevaplamaya devam eden oyuncu "terk etmiş"
-- sayılabiliyordu. Cevap yazan oyuncu artık kendi damgasını da tazeler.
create or replace function public.comp_record_answer(
  p_match_id uuid,
  p_q_index int,
  p_choice int,
  p_correct_index int
) returns boolean
language plpgsql security definer
as $$
declare
  v_status text;
  v_p1 uuid;
  v_p2 uuid;
  v_deadline timestamptz;
  v_is_correct boolean;
  v_returned boolean;
  v_existing boolean;
begin
  select status, player1_id, player2_id, deadline_at
    into v_status, v_p1, v_p2, v_deadline
    from public.comp_matches
   where id = p_match_id
   for share;

  if v_status is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if auth.uid() <> v_p1 and auth.uid() <> v_p2 then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_status <> 'active' then
    raise exception 'not_active' using errcode = 'P0001';
  end if;
  if v_deadline < now() then
    raise exception 'expired' using errcode = 'P0002';
  end if;
  if p_q_index < 0 or p_q_index > 9 then
    raise exception 'invalid_index' using errcode = '22023';
  end if;

  v_is_correct := (p_choice is not null and p_choice = p_correct_index);

  insert into public.comp_match_answers
    (match_id, player_id, q_index, choice, is_correct, answered_at)
  values
    (p_match_id, auth.uid(), p_q_index, p_choice, v_is_correct, now())
  on conflict (match_id, player_id, q_index) do nothing
  returning is_correct into v_returned;

  -- FAZ 12: cevap veren oyuncu canlıdır.
  if auth.uid() = v_p1 then
    update public.comp_matches set p1_seen_at = now() where id = p_match_id;
  else
    update public.comp_matches set p2_seen_at = now() where id = p_match_id;
  end if;

  if v_returned is null then
    select is_correct into v_existing
      from public.comp_match_answers
     where match_id = p_match_id
       and player_id = auth.uid()
       and q_index = p_q_index;
    return v_existing;
  end if;

  return v_returned;
end;
$$;

grant execute on function public.comp_record_answer(uuid, int, int, int) to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.6  comp_forfeit_core: terk mantığı tek yerde, kimlik taklidi yok
-- ────────────────────────────────────────────────────────────────────
-- comp_claim_abandoned, rakip adına puan işlemek için
-- `set_config('request.jwt.claim.sub', ...)` ile auth.uid()'i taklit
-- ediyordu. Bu, Supabase'in JWT okuma biçimi değişirse sessizce yanlış
-- oyuncuyu cezalandırabilecek kırılgan bir hileydi. Artık kaybeden
-- açıkça parametre olarak geçiliyor.
create or replace function public.comp_forfeit_core(
  p_match_id uuid,
  p_loser    uuid
) returns void
language plpgsql security definer
as $$
declare
  v_m record;
  v_winner uuid;
  v_loser  uuid := p_loser;
  v_p1_delta int;
  v_p2_delta int;
  v_rank record;
  v_delta int;
  v_new_tier int;
  v_new_points int;
  v_new_highest int;
  v_floor_tier int;
  v_uid uuid;
  v_p1_after int;
  v_p2_after int;
begin
  select * into v_m from public.comp_matches where id = p_match_id for update;
  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if v_loser <> v_m.player1_id and v_loser <> v_m.player2_id then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_m.status <> 'active' then
    return;  -- zaten bitmiş; idempotent
  end if;

  v_winner := case when v_loser = v_m.player1_id
                   then v_m.player2_id else v_m.player1_id end;

  if v_loser = v_m.player1_id then
    v_p1_delta := -30; v_p2_delta := 30;
  else
    v_p1_delta := 30;  v_p2_delta := -30;
  end if;

  -- Arkadaş düellosu ranklı değildir (iki hesap arası puan transferi kapalı).
  if coalesce(v_m.is_friendly, false) then
    update public.comp_matches set
      status = 'finished',
      winner_id = v_winner,
      forfeited_by = v_loser,
      p1_delta = 0,
      p2_delta = 0,
      p1_tier_after = v_m.p1_tier_at_start,
      p2_tier_after = v_m.p2_tier_at_start,
      finished_at = now()
    where id = p_match_id;
    return;
  end if;

  foreach v_uid in array array[v_m.player1_id, v_m.player2_id] loop
    v_delta := case when v_uid = v_m.player1_id then v_p1_delta else v_p2_delta end;

    select * into v_rank from public.comp_ranks
     where user_id = v_uid and season_id = v_m.season_id
     for update;
    if v_rank.user_id is null then
      continue;
    end if;

    v_new_tier := v_rank.tier;
    v_new_points := v_rank.points + v_delta;
    v_new_highest := v_rank.highest_tier_reached;

    while v_new_points >= 100 and v_new_tier < 9 loop
      v_new_points := v_new_points - 100;
      v_new_tier := v_new_tier + 1;
      if v_new_tier > v_new_highest then
        v_new_highest := v_new_tier;
      end if;
    end loop;

    v_floor_tier := (v_new_highest / 2) * 2;
    while v_new_points < 0 and v_new_tier > v_floor_tier loop
      v_new_tier := v_new_tier - 1;
      v_new_points := v_new_points + 100;
    end loop;
    if v_new_points < 0 then v_new_points := 0; end if;
    if v_new_tier < 9 and v_new_points > 99 then v_new_points := 99; end if;

    update public.comp_ranks set
      tier = v_new_tier,
      points = v_new_points,
      highest_tier_reached = v_new_highest,
      win_streak = case when v_uid = v_winner then win_streak + 1 else 0 end,
      best_win_streak = greatest(
        best_win_streak,
        case when v_uid = v_winner then win_streak + 1 else 0 end
      ),
      wins   = wins   + (case when v_uid = v_winner then 1 else 0 end),
      losses = losses + (case when v_uid = v_loser  then 1 else 0 end),
      updated_at = now()
    where user_id = v_uid and season_id = v_m.season_id;

    if v_uid = v_m.player1_id then
      v_p1_after := v_new_tier;
    else
      v_p2_after := v_new_tier;
    end if;
  end loop;

  update public.comp_matches set
    status = 'finished',
    p1_tier_after = v_p1_after,
    p2_tier_after = v_p2_after,
    winner_id = v_winner,
    forfeited_by = v_loser,
    p1_delta = v_p1_delta,
    p2_delta = v_p2_delta,
    finished_at = now()
  where id = p_match_id;
end;
$$;

-- Yalnız dahili çağrı: istemci comp_forfeit_match'i çağırır, o da
-- kaybedeni auth.uid()'ten alır. Aksi hâlde herkes rakibini
-- "terk etti" diye işaretleyebilirdi.
revoke execute on function public.comp_forfeit_core(uuid, uuid)
  from public, anon, authenticated;

-- comp_forfeit_match artık ince bir sarmalayıcı: çağıran kaybeder.
create or replace function public.comp_forfeit_match(p_match_id uuid)
returns void
language plpgsql security definer
as $$
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  perform public.comp_forfeit_core(p_match_id, auth.uid());
end;
$$;

grant execute on function public.comp_forfeit_match(uuid) to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.7  comp_claim_abandoned: cevap veren rakip "terk etmiş" sayılmaz
-- ────────────────────────────────────────────────────────────────────
create or replace function public.comp_claim_abandoned(p_match_id uuid)
returns boolean
language plpgsql security definer
as $$
declare
  v_m record;
  v_caller uuid := auth.uid();
  v_opponent uuid;
  v_opp_seen timestamptz;
  v_opp_answer timestamptz;
  v_idle int := 90;    -- rakip bu kadar saniyedir sessizse kopmuş sayılır
  v_min_age int := 60; -- maçın en az bu kadar sürmüş olması gerekir
begin
  if v_caller is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  select * into v_m from public.comp_matches where id = p_match_id for update;
  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if v_caller <> v_m.player1_id and v_caller <> v_m.player2_id then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  -- Arkadaş düellosunda puan işlemez; hükmen galibiyet talebi anlamsız.
  if coalesce(v_m.is_friendly, false) then
    return false;
  end if;
  if v_m.status <> 'active' then
    return false;
  end if;
  if v_m.started_at > now() - make_interval(secs => v_min_age) then
    return false;
  end if;

  if v_caller = v_m.player1_id then
    v_opponent := v_m.player2_id;
    v_opp_seen := coalesce(v_m.p2_seen_at, v_m.started_at);
  else
    v_opponent := v_m.player1_id;
    v_opp_seen := coalesce(v_m.p1_seen_at, v_m.started_at);
  end if;

  -- FAZ 12: presence damgası yalnız GET yoklamasından besleniyordu.
  -- Sekmesi arka planda olup soru cevaplamayı sürdüren rakip, damgası
  -- eskidiği için haksız yere "terk etti" sayılabiliyordu. Son cevap
  -- zamanı da canlılık kanıtı sayılır.
  select max(answered_at) into v_opp_answer
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_opponent;
  if v_opp_answer is not null and v_opp_answer > v_opp_seen then
    v_opp_seen := v_opp_answer;
  end if;

  if v_opp_seen > now() - make_interval(secs => v_idle) then
    return false;  -- rakip hâlâ bağlı
  end if;

  -- FAZ 12: rakip 10 sorunun hepsini bitirmişse "terk etti" denemez —
  -- sadece sonucu bekliyordur. Bu durumda maçı normal kurallarla kapat.
  if (select count(*) from public.comp_match_answers
       where match_id = p_match_id and player_id = v_opponent) >= 10 then
    perform public.comp_finalize_match(p_match_id);
    return false;
  end if;

  perform public.comp_forfeit_core(p_match_id, v_opponent);
  return true;
end;
$$;

grant execute on function public.comp_claim_abandoned(uuid) to authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.8  comp_finalize_guvenli: maçı erkenden bitirip rakibi 0'a
--       düşürme açığı kapandı
-- ────────────────────────────────────────────────────────────────────
-- Eskiden comp_finalize_match doğrudan authenticated'a açıktı ve
-- çağıranı hiç doğrulamıyordu. Anon anahtar tarayıcıda açık olduğu için
-- giriş yapmış HERKES, herhangi bir maçın id'siyle RPC atıp maçı
-- bitirebiliyordu: 3 soru cevaplamış bir oyuncu, kendisi 4/4 yapıp maçı
-- kapatarak rakibini cevaplayamadığı 7 sorudan 0 alacak şekilde
-- kaybettirebiliyordu.
--
-- Artık istemci yalnız bu sarmalayıcıyı çağırabilir. Sarmalayıcı iki
-- şeyi doğrular:
--   (a) çağıran maçın taraflarından biri,
--   (b) maç gerçekten bitmiş: ya süre dolmuş, ya da İKİ taraf da
--       tüm soruları cevaplamış.
create or replace function public.comp_finalize_guvenli(p_match_id uuid)
returns void
language plpgsql security definer
as $$
declare
  v_m record;
  v_hedef int;
  v_p1_cevap int;
  v_p2_cevap int;
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;

  select id, player1_id, player2_id, status, deadline_at, question_ids
    into v_m
    from public.comp_matches
   where id = p_match_id;

  if v_m.id is null then
    raise exception 'not_found' using errcode = '02000';
  end if;
  if auth.uid() <> v_m.player1_id and auth.uid() <> v_m.player2_id then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  if v_m.status <> 'active' then
    return;  -- idempotent
  end if;

  -- Süre dolduysa herkes kapatabilir.
  if v_m.deadline_at >= now() then
    v_hedef := coalesce(array_length(v_m.question_ids, 1), 10);

    select
      count(*) filter (where player_id = v_m.player1_id),
      count(*) filter (where player_id = v_m.player2_id)
      into v_p1_cevap, v_p2_cevap
      from public.comp_match_answers
     where match_id = p_match_id;

    if v_p1_cevap < v_hedef or v_p2_cevap < v_hedef then
      raise exception 'not_complete' using errcode = 'P0003';
    end if;
  end if;

  perform public.comp_finalize_match(p_match_id);
end;
$$;

grant execute on function public.comp_finalize_guvenli(uuid) to authenticated;

-- Ham fonksiyon artık istemciye kapalı (dahili çağrılar security
-- definer olduğu için etkilenmez).
revoke execute on function public.comp_finalize_match(uuid)
  from public, anon, authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 12.9  comp_ensure_season_and_rank: başkasının uuid'siyle çağrılamaz
-- ────────────────────────────────────────────────────────────────────
-- Fonksiyonun kendisi dahili olarak başka kullanıcılar için de
-- çağrılıyor (arkadaş düellosunda davet edenin rütbesi, sezon kapanışı),
-- bu yüzden parametreyi kaldıramıyoruz. Bunun yerine istemciye yalnız
-- parametresiz sarmalayıcı açılıyor.
create or replace function public.comp_ensure_kendi_rutbem()
returns table(out_season_id int, out_tier int, out_points int)
language plpgsql security definer
as $$
begin
  if auth.uid() is null then
    raise exception 'unauthorized' using errcode = '42501';
  end if;
  return query select * from public.comp_ensure_season_and_rank(auth.uid());
end;
$$;

grant execute on function public.comp_ensure_kendi_rutbem() to authenticated;
revoke execute on function public.comp_ensure_season_and_rank(uuid)
  from public, anon, authenticated;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 13 — ÖNBELLEK VE MODERASYON DÜZELTMELERİ
-- ════════════════════════════════════════════════════════════════════
-- Denetimde bulunan açıklar ve yanlış pozitifler:
--   1. ai_onbellek_yaz `authenticated` rolüne AÇIKTI ve içeriği hiç
--      doğrulamıyordu. Giriş yapmış herhangi bir öğrenci tarayıcı
--      konsolundan RPC'yi çağırıp uydurma bir cevabı önbelleğe koyabilir,
--      o cevap site genelinde HERKESE "baykuşun cevabı" olarak servis
--      edilirdi. Artık yazma yalnız sunucudan (service role) yapılır ve
--      girdi biçimsel olarak doğrulanır.
--   2. ai_onbellek RLS'i okuma için doğruydu ama tabloda insert/update
--      ayrıcalıkları açıkça geri alınmamıştı (yalnız politika yokluğuna
--      güveniliyordu). Şimdi ayrıcalık düzeyinde de kapatıldı.
--   3. ai_onbellek_bakim'ın HİÇBİR grant'i yoktu; PostgreSQL varsayılanı
--      gereği EXECUTE hakkı PUBLIC'teydi — yani anon bir ziyaretçi bile
--      haftalık budamayı tetikleyebiliyordu. Buna karşılık, fonksiyon
--      ayrıcalıkları toptan kısıtlanmış bir kurulumda cron 403 alırdı.
--      İki durumu da kapatmak için: PUBLIC'ten revoke + service_role'a
--      açık grant. (Cron rotası SUPABASE_SERVICE_ROLE_KEY ile çağırıyor:
--      src/app/api/cron/onbellek-bakim/route.ts)
--   4. uygunsuz_metin süzgeci kökleri BOŞLUKSUZ metinde alt dize olarak
--      arıyordu; "sikke" (tarih), "mal ve hizmet" (sosyal bilgiler),
--      "0oC" (sıcaklık), "öç" (Türkçe) gibi meşru metinler engelleniyordu.
--      Artık eşleme kelime sınırında ve ön ek mantığıyla yapılıyor.
--
-- Idempotenttir: SQL editöründe tekrar tekrar çalıştırılabilir.

-- ────────────────────────────────────────────────────────────────────
-- 13.1  uygunsuz_metin: kelime sınırı + bağlam istisnaları
-- ────────────────────────────────────────────────────────────────────
-- src/lib/moderasyon.ts ile aynı kuralları uygular. `\b` Türkçe harflerde
-- güvenilmez olduğu için kullanılmaz: metin önce ASCII'ye indirgenip
-- harf/rakam dışı her karakter sınır sayılarak kelimelere bölünür.
create or replace function public.uygunsuz_metin(p_metin text)
returns boolean
language plpgsql
immutable
set search_path = public
as $$
declare
  v_ham      text;   -- Türkçe→ASCII, rakamlar duruyor, tek boşluklu
  v_bosluk   text;   -- gizlemesi açılmış (4→a, 0→o ...), boşluklar korunmuş
  v_bitisik  text;   -- boşluksuz hâli (a.m.k gibi yazımlar için)
  v_tekil    text;   -- ardışık tekrarları silinmiş boşluksuz hâl
  v_paket    text;
  k          text;
  w          text;
  b          text;
  -- Tek kelimelik kökler: kelime bu kökle BAŞLIYORSA yakalanır.
  v_kok_tek text[] := array[
    'amcik','amina','aminakoy','sike','siker','sikim','sikik','siktir',
    -- 'yarrağım' gibi ünsüz yumuşamalı biçimler için k→g varyantları
    'sikeyim','sikiyim','yarrak','yarrag','yarak','yarag','tasak',
    'gotveren','gotlek',
    'pezevenk','orospu','kahpe','kaltak','surtuk','fahise','piclik',
    'picik','oruspu','koyim','godumun','yavsak','ibne','gavat','kavat',
    'pust','hayasiz','gerizekali','aptal','salak','ahmak','embesil',
    'moron','beyinsiz','denyo','dangalak','serefsiz','namussuz','sarsak',
    'budala','avanak','gerzek','eroin','kokain','molotof'
  ];
  -- Çok kelimeli kalıplar: kelime başından eşleşir.
  v_kok_ifade text[] := array[
    'geri zekali','hayvan herif','alcak herif','it oglu','kopek oglu',
    'esek oglu','pislik herif','manyak herif','asagi irk',
    'uyusturucu nasil','esrar nasil','bomba nasil yapilir',
    'silah nasil alinir','kacak bahis','bahis sitesi','kumar oyna',
    'amina koy','agzina koy','anani koy','avradini'
  ];
  -- Masum bir kelimenin İÇİNE gömülemeyecek kökler (bitişik yazım için).
  -- NOT: 'siktir' bilerek YOKTUR — sınav metinlerinde çok geçen
  -- 'eksiktir' kelimesinin içinde bulunuyor. Kelime başı eşlemesi
  -- (v_kok_tek) 'siktir git' gibi kullanımları zaten yakalıyor.
  v_kok_sert text[] := array[
    'orospu','oruspu','pezevenk','gotveren','yarrak','amcik',
    'sikeyim','sikiyim','fahise','kaltak','surtuk','gerizekali','yavsak'
  ];
  v_tam  text[] := array['got','kic','bok','pic','gic'];
  v_kisa text[] := array['amk','aq'];
  -- Tekrar sadeleştirmesinden sonra köke benzeyen MEŞRU kelimeler.
  -- 'sikke' (tarih terimi) ve 'book' (İngilizce) tekrar sadeleştirmesinde
  -- 'sike' / 'bok' hâline geliyordu.
  v_istisna text[] := array['sikke','book'];
begin
  if p_metin is null then return false; end if;

  v_ham := lower(translate(p_metin, 'İIÇĞÖŞÜçğıöşü', 'iicgosucgiosu'));
  -- KELİME SINIRI: harf/rakam dışı her karakter ayırıcıdır.
  v_ham := btrim(regexp_replace(regexp_replace(v_ham, '[^a-z0-9]+', ' ', 'g'),
                                ' +', ' ', 'g'));
  if v_ham = '' then return false; end if;

  -- Rakamla gizlemeyi aç, harf dışını at.
  v_bosluk := translate(v_ham, '4@3!|10$579', 'aaeiiiosstg');
  v_bosluk := btrim(regexp_replace(regexp_replace(v_bosluk, '[^a-z ]', '', 'g'),
                                   ' +', ' ', 'g'));
  if v_bosluk = '' then return false; end if;
  v_paket   := ' ' || v_bosluk || ' ';
  v_bitisik := replace(v_bosluk, ' ', '');
  v_tekil   := regexp_replace(v_bitisik, '(.)\1+', '\1', 'g');

  -- (a) Çok kelimeli kalıplar
  foreach k in array v_kok_ifade loop
    if position(' ' || k in v_paket) > 0 then return true; end if;
  end loop;

  -- (b) "mal": yalnız hakaret bağlamında ("mal ve hizmet" serbest)
  if v_paket ~ '(^| )mal (misin|misiniz|gibi|herif|kafa|kafali|mi)( |$)'
     or v_paket ~ '(^| )(seni|sen|ne|koca|resmen|tam) mal( |$)'
     or v_paket ~ '(^| )mals(in|iniz)( |$)' then
    return true;
  end if;

  -- (c) Metnin TAMAMI o kelimeden ibaretse ("öç", "mal" tek başına).
  --     Sıcaklık yazımı ("0oC", "0 °C") muaftır.
  if v_tekil = 'oc' and v_ham !~ '[0-9] ?o ?[ckf]( |$)' then return true; end if;
  if v_tekil = 'mal' then return true; end if;

  -- (d) Bitişik/noktalı gizleme: "a.m.k", "s.i.k.t.i.r"
  if v_tekil = any(v_kisa) then return true; end if;
  foreach k in array v_kok_sert loop
    if position(k in v_tekil) > 0 then return true; end if;
  end loop;

  -- (e) Kelime kelime kök eşlemesi (ön ek mantığı)
  foreach w in array string_to_array(v_bosluk, ' ') loop
    if w = '' then continue; end if;
    foreach b in array array[w, regexp_replace(w, '(.)\1+', '\1', 'g')] loop
      -- İstisna kelimede tekrar-silme adımı atlanır (sikke → sike olmasın)
      if b <> w and exists (
        select 1 from unnest(v_istisna) i where w like i || '%'
      ) then continue; end if;
      if b = any(v_kisa) then return true; end if;
      if b = any(v_tam) then return true; end if;
      foreach k in array v_kok_tek loop
        if b like k || '%' then return true; end if;
      end loop;
      foreach k in array v_kok_sert loop
        if position(k in b) > 0 then return true; end if;
      end loop;
    end loop;
  end loop;

  return false;
end;
$$;

grant execute on function public.uygunsuz_metin(text) to anon, authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 13.2  ai_onbellek RLS: okuma açık, YAZMA kapalı
-- ────────────────────────────────────────────────────────────────────
-- Okuma anon + authenticated'a açıktır (misafir öğrenci de baykuşa soru
-- sorabiliyor) ve yalnız aktif satırları verir. Yazma/güncelleme/silme
-- hem politika hem de ayrıcalık düzeyinde kapalıdır: tabloya yalnız
-- security definer fonksiyonlar (owner adına) dokunabilir.
drop policy if exists "onbellek okunur" on public.ai_onbellek;
create policy "onbellek okunur" on public.ai_onbellek
  for select to anon, authenticated
  using (aktif);

revoke insert, update, delete, truncate on public.ai_onbellek
  from anon, authenticated, public;
grant select on public.ai_onbellek to anon, authenticated;
grant all on public.ai_onbellek to service_role;

-- ────────────────────────────────────────────────────────────────────
-- 13.3  ai_onbellek_yaz: yalnız sunucudan + içerik doğrulaması
-- ────────────────────────────────────────────────────────────────────
-- Artık auth.uid() ARAMAZ (servis rolünde oturum yoktur); bunun yerine
--   • EXECUTE hakkı anon/authenticated'dan alınmıştır (aşağıda),
--   • JWT'de bir rol geliyorsa service_role olmak zorundadır,
--   • parmak izi, cevap ve yönlendirme alanları biçimsel olarak
--     doğrulanır (uydurma/zararlı içerik yazımını zorlaştırır).
-- Aynı parmak izi varsa yalnız sayaç artar, cevap DEĞİŞMEZ.
create or replace function public.ai_onbellek_yaz(
  p_parmak_izi  text,
  p_soru_ornek  text,
  p_cevap       text,
  p_navigate    text default null,
  p_topic_route text default null
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_rol      text;
  v_beklenen text;
  v_son_saat integer;
begin
  -- (a) Çağıran: PostgREST üzerinden gelen bir JWT varsa service_role olmalı.
  --     (Doğrudan sunucu bağlantısında claim bulunmaz.)
  begin
    v_rol := nullif(current_setting('request.jwt.claims', true), '')::json ->> 'role';
  exception when others then
    v_rol := null;
  end;
  if v_rol is not null and v_rol <> 'service_role' then
    return false;
  end if;

  -- (b) Parmak izi: küçük harf/rakam + tek boşluk, kelimeleri TEKİL ve
  --     SIRALI olmalı. Yani istemcinin uydurduğu rastgele bir anahtar
  --     değil, parmakIzi() üretiminin birebir çıktısı kabul edilir.
  if p_parmak_izi is null or length(p_parmak_izi) < 3 or length(p_parmak_izi) > 400 then
    return false;
  end if;
  if p_parmak_izi !~ '^[a-z0-9]+( [a-z0-9]+)*$' then
    return false;
  end if;
  select string_agg(t.w, ' ' order by t.w collate "C") into v_beklenen
    from (select distinct unnest(string_to_array(p_parmak_izi, ' ')) as w) t;
  if v_beklenen is distinct from p_parmak_izi then
    return false;
  end if;

  -- (c) Cevap: uzunluk, en az 4 kelime, gömülü betik/etiket yok, küfür yok.
  if p_cevap is null or length(p_cevap) < 25 or length(p_cevap) > 3500 then
    return false;
  end if;
  if coalesce(array_length(regexp_split_to_array(btrim(p_cevap), '\s+'), 1), 0) < 4 then
    return false;
  end if;
  if p_cevap ~* '<\s*/?\s*(script|iframe|style|img|svg|object|embed)' then
    return false;
  end if;
  if public.uygunsuz_metin(p_cevap) then
    return false;
  end if;

  -- (d) Soru örneği boş olamaz.
  if p_soru_ornek is null or length(btrim(p_soru_ornek)) < 3 then
    return false;
  end if;

  -- (e) Yönlendirme alanları SİTE İÇİ yol olmalı — önbellekten dönen
  --     navigate istemcide doğrudan router.push'a verildiği için dış
  --     bağlantı yazılması açık yönlendirme (open redirect) olurdu.
  if p_navigate is not null
     and (p_navigate !~ '^/[A-Za-z0-9._~/%?&=#-]*$' or p_navigate like '//%') then
    return false;
  end if;
  if p_topic_route is not null
     and (p_topic_route !~ '^/[A-Za-z0-9._~/%?&=#-]*$' or p_topic_route like '//%') then
    return false;
  end if;

  -- Zaten varsa: sayaç artır, içeriği DEĞİŞTİRME
  update public.ai_onbellek
     set kullanim = kullanim + 1, son_kullanim = now(), aktif = true
   where parmak_izi = p_parmak_izi;
  if found then return true; end if;

  -- Saatlik yeni kayıt tavanı (eskiden kullanıcı başınaydı; yazma artık
  -- sunucudan geldiği için site geneli tavan uygulanır).
  select count(*) into v_son_saat
    from public.ai_onbellek
   where kaynak = 'ai' and created_at > now() - interval '1 hour';
  if v_son_saat >= 200 then return false; end if;

  insert into public.ai_onbellek
    (parmak_izi, soru_ornek, cevap, navigate, topic_route, olusturan)
  values
    (p_parmak_izi, left(p_soru_ornek, 500), p_cevap, p_navigate, p_topic_route, null)
  on conflict (parmak_izi) do nothing;
  return true;
end;
$$;

-- Yazma artık istemciye TAMAMEN kapalı; yalnız sunucu (service role).
revoke execute on function public.ai_onbellek_yaz(text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.ai_onbellek_yaz(text, text, text, text, text)
  to service_role;

-- Okuma RPC'si eskisi gibi herkese açık kalır.
grant execute on function public.ai_onbellek_ara(text) to anon, authenticated;

-- ────────────────────────────────────────────────────────────────────
-- 13.4  ai_onbellek_bakim: yalnız cron (service role) çağırabilir
-- ────────────────────────────────────────────────────────────────────
-- Fonksiyonun hiç grant'i yoktu; PostgreSQL varsayılanı EXECUTE'u
-- PUBLIC'e verdiği için anon bir ziyaretçi bile budamayı tetikleyebilirdi.
-- Ayrıcalıkların toptan kısıtlandığı kurulumlarda ise cron 403 alırdı.
revoke execute on function public.ai_onbellek_bakim() from public, anon, authenticated;
grant execute on function public.ai_onbellek_bakim() to service_role;

-- ════════════════════════════════════════════════════════════════════
-- FAZ 14 — İSTATİSTİK DÜZELTMELERİ
-- ════════════════════════════════════════════════════════════════════
-- Bu blok yalnız EKLER; yukarıdaki satırların hiçbiri değişmedi.
-- Idempotenttir: tekrar tekrar çalıştırılabilir.

-- ── 1) ROZETLER KALICIDIR ────────────────────────────────────────────
-- Sorun: "own badges" politikası `for all` idi — istemci kendi rozetini
-- SİLEBİLİYOR ve GÜNCELLEYEBİLİYORDU. Uygulama tarafında rozet ayrıca her
-- sayfa yüklemesinde anlık metriklerden yeniden hesaplandığı için, seri
-- kırılınca veya çalışma 60 günlük pencerenin dışına düşünce öğrenci hak
-- ettiği rozeti kaybedebiliyordu.
--
-- Kural: bir rozet KAZANILDIYSA ASLA GERİ ALINMAZ. Satır yalnız eklenir ve
-- okunur; güncelleme/silme istemciye kapalıdır.
drop policy if exists "own badges" on public.user_badges;

drop policy if exists "rozet oku" on public.user_badges;
create policy "rozet oku" on public.user_badges
  for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "rozet ekle" on public.user_badges;
create policy "rozet ekle" on public.user_badges
  for insert to authenticated
  with check (auth.uid() = user_id);

-- update ve delete için politika BİLEREK YOK: RLS altında politikası
-- bulunmayan işlem tümüyle reddedilir. Hesap silinince `on delete cascade`
-- yine çalışır (cascade RLS'e tabi değildir), yani hesap silme akışı bozulmaz.

-- İkinci emniyet: rozetin kimliği ve kazanılma tarihi dondurulur. Bilerek
-- yalnız UPDATE'i kısıtlıyoruz — DELETE'e dokunmuyoruz, çünkü auth.users
-- cascade'i de DELETE'tir ve engellenirse hesap silinemez hâle gelirdi.
create or replace function public.rozet_kalici()
returns trigger
language plpgsql
as $$
begin
  if new.badge_key is distinct from old.badge_key
     or new.earned_at is distinct from old.earned_at
     or new.user_id  is distinct from old.user_id then
    raise exception 'Rozetler kalicidir: kazanilmis rozet degistirilemez (%).', old.badge_key
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists user_badges_kalici on public.user_badges;
create trigger user_badges_kalici
  before update on public.user_badges
  for each row execute function public.rozet_kalici();

-- ── 2) YANLIŞ CEVAP DİRİLTMESİ ENGELLENİR ───────────────────────────
-- Sorun: ustalaşılan (üst üste 2 doğru) soru `wrong_answers`'tan SİLİNİYORDU.
-- Silmek, cihazlar arası senkronda diriltmeyi kaçınılmaz kılıyordu: ikinci
-- cihazın localStorage'ında kayıt hâlâ durduğu için senkron "uzakta yok,
-- yerelde var" deyip satırı geri yazıyordu. "Hiç olmamış" ile "bilerek
-- kaldırılmış" ayırt edilemiyordu.
--
-- Çözüm: satır SİLİNMEZ, `correct_streak = 2` ile kalır — bu, tüm cihazların
-- görebildiği kalıcı bir "ustalaşıldı" mezar taşıdır. Sayaçlar ve listeler
-- bu satırları zaten elemektedir (src/lib/hataSayaci.ts, wrongAnswers.ts).
--
-- Veritabanı garantisi: bir kez ustalaşılan kayıt geri alınamaz. Doğru seri
-- yalnız ARTABİLİR; ancak öğrenci soruyu GERÇEKTEN yeniden yanlış yaparsa
-- (last_wrong_at ilerlerse) sıfırlanabilir.
create or replace function public.yanlis_ustalasma_korumasi()
returns trigger
language plpgsql
as $$
begin
  -- Yeni bir yanlış gerçekten yapıldıysa kayıt baştan başlar: serbest.
  if new.last_wrong_at > old.last_wrong_at then
    return new;
  end if;
  -- Aksi hâlde doğru serisi geri gidemez (bayat senkron paketi ezmesin).
  if new.correct_streak < old.correct_streak then
    new.correct_streak := old.correct_streak;
  end if;
  -- Ustalaşmış kayıt vadeye geri dönmez.
  if new.correct_streak >= 2 then
    new.next_due_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists wrong_answers_ustalasma on public.wrong_answers;
create trigger wrong_answers_ustalasma
  before update on public.wrong_answers
  for each row execute function public.yanlis_ustalasma_korumasi();

-- Bekleyen ("vadesi gelmiş") hata sayacı next_due_at üzerinden filtreler.
create index if not exists wrong_answers_due_idx
  on public.wrong_answers (user_id, next_due_at);

-- ── 3) İSTATİSTİK PENCERELERİ İÇİN İNDEKS ───────────────────────────
-- 60/180 günlük pencereler artık Türkiye gün başına hizalı
-- (bkz. src/lib/zaman.ts → trPencereBaslangici). Sorgular hep
-- (user_id, started_at >= sınır) biçiminde; indeks buna göre.
create index if not exists study_sessions_user_started_idx
  on public.study_sessions (user_id, started_at desc);

-- ════════════════════════════════════════════════════════════════════
-- FAZ 15 — HIZ SINIRI VE HATA İZLEME
-- ════════════════════════════════════════════════════════════════════
-- İki ayrı ihtiyaç, tek blokta:
--
-- 1. HIZ SINIRI. 16 API adresinin hiçbirinde sınır yoktu. Meraklı bir
--    öğrenci (ya da bir bot) baykuşa saniyede yüz soru sordurursa günlük
--    Gemini kotası bir öğleden önce biter ve site HERKES için sessizleşir.
--    Sayaç veritabanında tutulur, çünkü Vercel isteği her seferinde
--    başka bir sunucu örneğine yollayabilir: bellekteki sayaç örnekler
--    arasında paylaşılmaz ve günlük tavan hiç kurulamaz.
--
-- 2. HATA İZLEME. Öğrencinin ekranında bir hata çıktığında haberimiz
--    olmuyordu. Dışarıya bir servise bağlanmak yerine hatalar kendi
--    veritabanımıza yazılıyor: ek hesap yok, ek ücret yok, veri
--    Rehberim'in kendi Supabase'inde kalıyor.
--
-- Idempotenttir: SQL editöründe tekrar tekrar çalıştırılabilir.

-- ────────────────────────────────────────────────────────────────────
-- 15.1  Hız sayacı — sabit pencere (fixed window)
-- ────────────────────────────────────────────────────────────────────
-- Pencere, epoch saniyesinin pencere boyuna bölünmesiyle bulunur; böylece
-- ayrı sunucu örnekleri AYNI pencereyi hesaplar ve sayaç ortaklaşır.
create table if not exists public.hiz_sayaci (
  anahtar          text        not null,
  pencere_baslangic timestamptz not null,
  sayi             int         not null default 0,
  primary key (anahtar, pencere_baslangic)
);

-- Temizlik taraması için: eski pencereleri hızlı bul.
create index if not exists hiz_sayaci_pencere_idx
  on public.hiz_sayaci (pencere_baslangic);

alter table public.hiz_sayaci enable row level security;
-- Politika BİLEREK YOK: tabloya yalnız aşağıdaki security definer
-- fonksiyon dokunur. İstemcinin sayacı okuması ya da sıfırlaması anlamsız
-- ve tehlikelidir (sınırı kendi kaldırır).
revoke all on public.hiz_sayaci from public, anon, authenticated;

/**
 * Bir isteği sayar ve sınırın altında mı söyler.
 *
 * p_anahtar: neyi sınırlıyoruz — "chat:<user_id>" gibi. Çağıran kurar.
 * p_limit:   pencere içinde izin verilen istek sayısı.
 * p_pencere_sn: pencere boyu (60 = dakikalık, 86400 = günlük).
 *
 * Dönüş: izin (bu istek geçsin mi), kalan (bu istekten sonra kalan hak),
 *        sifirlanma (pencerenin bitiş anı — istemciye "ne zaman" demek için).
 *
 * SAYMA HER ZAMAN YAPILIR, reddedilen istek de sayılır: aksi hâlde sınırı
 * aşan bir bot, reddedildikçe sayacı ilerletmeden sonsuza dek deneyebilirdi.
 */
create or replace function public.hiz_siniri_dene(
  p_anahtar text,
  p_limit int,
  p_pencere_sn int
) returns table(izin boolean, kalan int, sifirlanma timestamptz)
language plpgsql security definer
as $$
declare
  v_pencere timestamptz;
  v_sayi int;
begin
  if p_anahtar is null or length(p_anahtar) = 0 then
    raise exception 'anahtar bos' using errcode = '22023';
  end if;
  if p_limit < 1 or p_pencere_sn < 1 then
    raise exception 'gecersiz sinir' using errcode = '22023';
  end if;

  v_pencere := to_timestamp(
    floor(extract(epoch from now()) / p_pencere_sn) * p_pencere_sn
  );

  insert into public.hiz_sayaci (anahtar, pencere_baslangic, sayi)
  values (p_anahtar, v_pencere, 1)
  on conflict (anahtar, pencere_baslangic)
    do update set sayi = public.hiz_sayaci.sayi + 1
  returning sayi into v_sayi;

  return query select
    v_sayi <= p_limit,
    greatest(0, p_limit - v_sayi),
    v_pencere + make_interval(secs => p_pencere_sn);
end;
$$;

-- Yalnız sunucu (service role) çağırabilir. İstemciye açık olsaydı öğrenci
-- kendi sayacını istediği anahtarla şişirip başkasını kilitleyebilirdi.
revoke execute on function public.hiz_siniri_dene(text, int, int)
  from public, anon, authenticated;
grant execute on function public.hiz_siniri_dene(text, int, int) to service_role;

/** Bitmiş pencereleri siler. Haftalık bakım cron'u çağırır. */
create or replace function public.hiz_sayaci_bakim()
returns int
language plpgsql security definer
as $$
declare
  v_silinen int;
begin
  delete from public.hiz_sayaci
   where pencere_baslangic < now() - interval '2 days';
  get diagnostics v_silinen = row_count;
  return v_silinen;
end;
$$;

revoke execute on function public.hiz_sayaci_bakim() from public, anon, authenticated;
grant execute on function public.hiz_sayaci_bakim() to service_role;

-- ────────────────────────────────────────────────────────────────────
-- 15.2  Hata kayıtları
-- ────────────────────────────────────────────────────────────────────
create table if not exists public.hata_kayitlari (
  id         bigserial primary key,
  user_id    uuid references auth.users on delete set null,
  yol        text not null,              -- hatanın çıktığı sayfa
  mesaj      text not null,
  yigin      text,                       -- stack trace (kısaltılmış)
  tarayici   text,                       -- user agent
  surum      text,                       -- dağıtım kimliği (hangi sürümde)
  olusturma  timestamptz not null default now()
);

create index if not exists hata_kayitlari_olusturma_idx
  on public.hata_kayitlari (olusturma desc);

alter table public.hata_kayitlari enable row level security;
-- Politika BİLEREK YOK. Hata kayıtları yığın izi ve sayfa yolu içerir;
-- öğrencinin başkasının hatasını okuması gereksiz. Yazma da doğrudan
-- yapılmaz, aşağıdaki fonksiyon üzerinden olur.
revoke all on public.hata_kayitlari from public, anon, authenticated;

/**
 * Hata kaydeder. Alanlar SUNUCUDA kısaltılır: istemciden gelen veriye
 * güvenilmez, 2 MB'lık bir yığın izi tabloyu şişirebilir.
 */
create or replace function public.hata_kaydet(
  p_user_id uuid,
  p_yol text,
  p_mesaj text,
  p_yigin text,
  p_tarayici text,
  p_surum text
) returns void
language plpgsql security definer
as $$
begin
  if p_mesaj is null or length(trim(p_mesaj)) = 0 then
    return;  -- boş hata kaydetmeye değmez
  end if;
  insert into public.hata_kayitlari
    (user_id, yol, mesaj, yigin, tarayici, surum)
  values (
    p_user_id,
    left(coalesce(p_yol, '?'), 300),
    left(p_mesaj, 500),
    left(coalesce(p_yigin, ''), 4000),
    left(coalesce(p_tarayici, ''), 300),
    left(coalesce(p_surum, ''), 100)
  );
end;
$$;

revoke execute on function public.hata_kaydet(uuid, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.hata_kaydet(uuid, text, text, text, text, text)
  to service_role;

/**
 * Son hataların özeti — aynı mesajı tekrar tekrar listelemek yerine
 * gruplar. "Bu hafta hata var mı?" sorusunun cevabı.
 */
create or replace function public.hata_ozeti(p_gun int default 7)
returns table(mesaj text, adet bigint, son timestamptz, ornek_yol text)
language sql security definer
as $$
  select
    h.mesaj,
    count(*) as adet,
    max(h.olusturma) as son,
    (array_agg(h.yol order by h.olusturma desc))[1] as ornek_yol
  from public.hata_kayitlari h
  where h.olusturma > now() - make_interval(days => greatest(1, p_gun))
  group by h.mesaj
  order by count(*) desc, max(h.olusturma) desc
  limit 50;
$$;

revoke execute on function public.hata_ozeti(int) from public, anon, authenticated;
grant execute on function public.hata_ozeti(int) to service_role;

/** 90 günden eski hata kayıtlarını siler. */
create or replace function public.hata_kayitlari_bakim()
returns int
language plpgsql security definer
as $$
declare
  v_silinen int;
begin
  delete from public.hata_kayitlari where olusturma < now() - interval '90 days';
  get diagnostics v_silinen = row_count;
  return v_silinen;
end;
$$;

revoke execute on function public.hata_kayitlari_bakim() from public, anon, authenticated;
grant execute on function public.hata_kayitlari_bakim() to service_role;
