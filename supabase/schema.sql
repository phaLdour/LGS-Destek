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
    challenge_next = (v_winner = v_m.player1_id and v_margin >= 0.7),
    updated_at = now()
  where user_id = v_m.player1_id and season_id = v_m.season_id;

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
    challenge_next = (v_winner = v_m.player2_id and v_margin >= 0.7),
    updated_at = now()
  where user_id = v_m.player2_id and season_id = v_m.season_id;

  -- Maç finished olarak işaretle
  update public.comp_matches set
    status = 'finished',
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
create or replace function public.comp_queue_reset()
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
      wins   = wins   + (case when v_uid = v_winner then 1 else 0 end),
      losses = losses + (case when v_uid = v_loser  then 1 else 0 end),
      updated_at = now()
    where user_id = v_uid and season_id = v_m.season_id;
  end loop;

  -- Maçı forfeit olarak kapat
  update public.comp_matches set
    status = 'finished',
    winner_id = v_winner,
    forfeited_by = v_loser,
    p1_delta = v_p1_delta,
    p2_delta = v_p2_delta,
    finished_at = now()
  where id = p_match_id;
end;
$$;

grant execute on function public.comp_forfeit_match(uuid) to authenticated;
