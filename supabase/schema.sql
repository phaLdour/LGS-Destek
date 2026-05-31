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
  primary key (user_id, question_key)
);

alter table public.wrong_answers enable row level security;

drop policy if exists "own wrongs" on public.wrong_answers;
create policy "own wrongs" on public.wrong_answers
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists wrong_answers_user_idx
  on public.wrong_answers (user_id, last_wrong_at desc);
