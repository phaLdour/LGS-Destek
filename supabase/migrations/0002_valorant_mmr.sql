-- ════════════════════════════════════════════════════════════════════
-- FAZ 4 — Valorant tarzı MMR + rütbe sistemi
-- ════════════════════════════════════════════════════════════════════
-- Bu migrasyon mevcut rekabet şemasını (Faz 1-3) yükseltir. Idempotenttir:
-- Supabase SQL editöründe tekrar tekrar çalıştırılabilir.
--
-- Getirdikleri:
--   • Gizli MMR (Elo) — eşleştirme ve RR kazanımı bunun üzerinden.
--   • 15 rütbe (5 lig × 3 kademe) — tier 0..14.
--   • RR (0-100) kademe puanı; MMR ile rütbe arasındaki farka göre kazanç/kayıp.
--   • Yerleştirme maçları (yeni: 5, sezon geçişi: 3) — bitene kadar rütbe gizli.
--   • Gerçek düşüş + düşme koruması (shield: terfi sonrası 1 maç tampon; düşünce 70 RR).
--   • Sezon sonu YUMUŞAK sıfırlama — MMR ortalamaya %25 sıkışır, yeniden yerleştirme.
--   • Beraberlik artık finalize'ı çökertmiyor (challenge_next null bug'ı giderildi).
--   • Arkadaş düellosu (is_friendly) rütbeyi/MMR'ı etkilemez.
--
-- Ölçek: implied_mmr(tier,rr) = 650 + tier*100 + rr. Yeni oyuncu MMR = 1000
-- → ~Yükselme 3 civarı yerleşir.
-- ════════════════════════════════════════════════════════════════════

-- ──────────────────────────────────────────────────────────────
-- 0) Yardımcı fonksiyonlar (önce oluştur; ALTER back-fill bunları kullanır)
-- ──────────────────────────────────────────────────────────────

-- Rütbe → gizli MMR karşılığı (eşik hesapları için)
create or replace function public.comp_implied_mmr(p_tier int, p_rr int)
returns numeric language sql immutable as $$
  select 650::numeric + (p_tier::numeric * 100) + p_rr::numeric
$$;

-- MMR → görünen rütbe (tier 0..14, rr 0..99). Placement bitişinde seed için.
create or replace function public.comp_rank_from_mmr(
  p_mmr numeric, out o_tier int, out o_rr int
) language plpgsql immutable as $$
declare
  v_raw numeric;
begin
  v_raw := p_mmr - 650;
  o_tier := floor(v_raw / 100.0)::int;
  if o_tier < 0 then o_tier := 0; end if;
  if o_tier > 14 then o_tier := 14; end if;
  o_rr := round(v_raw - (o_tier * 100))::int;
  if o_rr < 0 then o_rr := 0; end if;
  if o_tier < 14 and o_rr > 99 then o_rr := 99; end if;
end;
$$;

-- RR değişimi: sonuç + (MMR - rütbe) farkı + kararlılık + galibiyet serisi.
-- p_gap = yeni MMR - mevcut rütbenin implied MMR'ı (pozitif = hak edilenden düşük rütbe).
create or replace function public.comp_rr_delta(
  p_result text, p_gap numeric, p_margin numeric, p_streak_after int
) returns int language plpgsql immutable as $$
declare
  v int; v_gap int; v_perf int; v_streak int;
begin
  if p_result = 'win' then
    v_gap := greatest(-15, least(20, round(p_gap / 10.0)::int));
    v_perf := round(coalesce(p_margin, 0) * 8)::int;
    v_streak := case
      when p_streak_after >= 7 then 10
      when p_streak_after >= 5 then 6
      when p_streak_after >= 3 then 3
      else 0
    end;
    v := 18 + v_gap + v_perf + v_streak;
    return greatest(8, least(60, v));
  elsif p_result = 'loss' then
    v_gap := greatest(-12, least(12, round(p_gap / 10.0)::int));
    v_perf := round((1 - coalesce(p_margin, 0)) * 4)::int;  -- yakın kaybet → az kayıp
    v := -20 + v_gap + v_perf;
    return greatest(-40, least(-6, v));
  else -- draw: MMR'a doğru küçük itme
    return greatest(-8, least(8, round(p_gap / 20.0)::int));
  end if;
end;
$$;

-- RR uygula → terfi/düşüş/shield/tavan mantığı (tek yerde, iki oyuncu için ortak).
create or replace function public.comp_progress_rank(
  p_tier int, p_rr int, p_highest int, p_shield boolean, p_rr_delta int,
  out o_tier int, out o_rr int, out o_highest int, out o_shield boolean, out o_promoted boolean
) language plpgsql immutable as $$
begin
  o_tier := p_tier;
  o_rr := p_rr + p_rr_delta;
  o_highest := p_highest;
  o_shield := p_shield;
  o_promoted := false;

  -- Terfi (100+ RR → üst kademe). Şampiyonlar 1'de (tier 14) taşma birikir.
  while o_rr >= 100 and o_tier < 14 loop
    o_rr := o_rr - 100;
    o_tier := o_tier + 1;
    o_promoted := true;
    o_shield := true;  -- terfi sonrası düşme koruması ver
    if o_tier > o_highest then o_highest := o_tier; end if;
  end loop;

  -- Düşüş (RR < 0)
  if o_rr < 0 then
    if o_tier = 0 then
      o_rr := 0;                       -- mutlak taban (Gelişim 3, 0 RR)
    elsif o_shield then
      o_rr := 0; o_shield := false;    -- koruma: bu sefer düşme, shield harca
    else
      o_tier := o_tier - 1;            -- gerçek düşüş
      o_rr := 70;                      -- alt kademede 70 RR'den başla
    end if;
  end if;

  -- Tavan: tier 14 dışında 99 ile sınırla
  if o_tier < 14 and o_rr > 99 then o_rr := 99; end if;
  if o_rr < 0 then o_rr := 0; end if;
end;
$$;

-- ──────────────────────────────────────────────────────────────
-- 1) comp_ranks: kolonlar + 15-tier constraint + eski veriyi map et
--    (Tek seferlik; kolon yoksa çalışır → idempotent.)
-- ──────────────────────────────────────────────────────────────
do $$
begin
  if not exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'comp_ranks' and column_name = 'mmr'
  ) then
    -- Eski check'leri kaldır (tier 0..14 ve puan taşması için)
    alter table public.comp_ranks drop constraint if exists comp_ranks_tier_check;
    alter table public.comp_ranks drop constraint if exists comp_ranks_points_check;

    alter table public.comp_ranks add column mmr numeric;
    alter table public.comp_ranks add column placement_left int not null default 5;
    alter table public.comp_ranks add column placed boolean not null default false;
    alter table public.comp_ranks add column demotion_shield boolean not null default false;
    alter table public.comp_ranks add column last_promoted_at timestamptz;

    -- Eski 10-tier (5 lig × 2) veriyi 15-tier'a taşı; ligi ve yüksek/alçak
    -- kademeyi koru: yeni = (eski/2)*3 + (eski tek ise 2 değilse 0)
    update public.comp_ranks r set
      tier = (r.tier / 2) * 3 + case when r.tier % 2 = 1 then 2 else 0 end,
      highest_tier_reached = greatest(
        (r.tier / 2) * 3 + case when r.tier % 2 = 1 then 2 else 0 end,
        (r.highest_tier_reached / 2) * 3 + case when r.highest_tier_reached % 2 = 1 then 2 else 0 end
      ),
      mmr = public.comp_implied_mmr(
        (r.tier / 2) * 3 + case when r.tier % 2 = 1 then 2 else 0 end, r.points
      ),
      placed = true,          -- mevcut oyuncular yerleştirmeyi tekrar yapmasın
      placement_left = 0;

    update public.comp_ranks set mmr = 1000 where mmr is null;
    alter table public.comp_ranks alter column mmr set default 1000;
    alter table public.comp_ranks alter column mmr set not null;

    alter table public.comp_ranks add constraint comp_ranks_tier_check check (tier between 0 and 14);
    alter table public.comp_ranks add constraint comp_ranks_points_check check (points >= 0);
  end if;
end $$;

-- Varsayılan tier'ı 2 yerine 3 (Yükselme 3) yap (yeni satırlar ensure ile seed edilir ama güvenli varsayılan)
alter table public.comp_ranks alter column tier set default 3;
alter table public.comp_ranks alter column points set default 50;
alter table public.comp_ranks alter column highest_tier_reached set default 3;

-- ──────────────────────────────────────────────────────────────
-- 2) comp_queue: MMR ile eşleştirme
-- ──────────────────────────────────────────────────────────────
alter table public.comp_queue add column if not exists mmr numeric;
create index if not exists comp_queue_mmr_idx
  on public.comp_queue (season_id, subject_filter, mmr);

-- ──────────────────────────────────────────────────────────────
-- 3) match_make — MMR yakınlığına göre eşleştir (bant yaşla genişler)
-- ──────────────────────────────────────────────────────────────
drop function if exists public.match_make(uuid, int, int, text, text[]);
drop function if exists public.match_make(uuid, int, int, text, text[], int);

create or replace function public.match_make(
  p_user_id        uuid,
  p_season_id      int,
  p_tier           int,
  p_mmr            numeric,
  p_subject_filter text,
  p_question_ids   text[],
  p_age_seconds    int default 0
) returns uuid
language plpgsql security definer
as $$
declare
  v_opponent uuid;
  v_opp_tier int;
  v_match_id uuid;
  v_now      timestamptz := now();
  v_band     numeric;
begin
  -- MMR arama bandı (yaşa göre genişler)
  v_band := case
    when p_age_seconds <= 15 then 100
    when p_age_seconds <= 45 then 200
    when p_age_seconds <= 90 then 350
    else 600
  end;

  select q.user_id, q.tier
    into v_opponent, v_opp_tier
    from public.comp_queue q
   where q.user_id <> p_user_id
     and q.season_id = p_season_id
     and coalesce(q.subject_filter, '') = coalesce(p_subject_filter, '')
     and abs(coalesce(q.mmr, 1000) - p_mmr) <= v_band
   order by abs(coalesce(q.mmr, 1000) - p_mmr) asc, q.joined_at asc
   for update skip locked
   limit 1;

  if v_opponent is null then
    return null;
  end if;

  insert into public.comp_matches (
    season_id, player1_id, player2_id,
    p1_tier_at_start, p2_tier_at_start,
    question_ids, subject_filter, deadline_at
  )
  values (
    p_season_id, p_user_id, v_opponent,
    p_tier, v_opp_tier,
    p_question_ids, p_subject_filter, v_now + interval '10 minutes'
  )
  returning id into v_match_id;

  delete from public.comp_queue where user_id in (p_user_id, v_opponent);
  return v_match_id;
end;
$$;

grant execute on function public.match_make(uuid, int, int, numeric, text, text[], int) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- 4) comp_ensure_season_and_rank — sezon + rütbe; YENİ sezonda yumuşak reset
-- ──────────────────────────────────────────────────────────────
drop function if exists public.comp_ensure_season_and_rank(uuid);

create or replace function public.comp_ensure_season_and_rank(
  p_user_id uuid
) returns table(out_season_id int, out_tier int, out_points int, out_mmr numeric, out_placed boolean)
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
  v_exists boolean;
  v_prev_mmr numeric;
  v_new_mmr numeric;
  v_place int;
  v_seed_tier int;
  v_seed_rr int;
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

  select true into v_exists
    from public.comp_ranks
   where user_id = p_user_id and season_id = v_season_id;

  if v_exists is null then
    -- Bu sezon rütbesi yok → önceki sezondan yumuşak reset ya da yeni oyuncu
    select mmr into v_prev_mmr
      from public.comp_ranks
     where user_id = p_user_id and season_id < v_season_id
     order by season_id desc
     limit 1;

    if v_prev_mmr is not null then
      v_new_mmr := round(1000 + (v_prev_mmr - 1000) * 0.75);  -- ortalamaya %25 sıkış
      v_place := 3;                                            -- sezon geçişi: 3 yerleştirme
    else
      v_new_mmr := 1000;                                       -- yeni oyuncu
      v_place := 5;
    end if;

    select o_tier, o_rr into v_seed_tier, v_seed_rr
      from public.comp_rank_from_mmr(v_new_mmr);

    insert into public.comp_ranks
      (user_id, season_id, tier, points, mmr, highest_tier_reached, placement_left, placed)
    values
      (p_user_id, v_season_id, v_seed_tier, v_seed_rr, v_new_mmr, v_seed_tier, v_place, false)
    on conflict (user_id, season_id) do nothing;
  end if;

  return query
  select v_season_id, r.tier, r.points, r.mmr, r.placed
    from public.comp_ranks r
   where r.user_id = p_user_id and r.season_id = v_season_id;
end;
$$;

grant execute on function public.comp_ensure_season_and_rank(uuid) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- 5) comp_join_queue — MMR'ı kuyruğa yaz, yeni match_make imzası
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
  v_mmr numeric;
  v_placed boolean;
  v_active_id uuid;
  v_match_id uuid;
begin
  delete from public.comp_queue where joined_at < now() - interval '5 minutes';

  select s.out_season_id, s.out_tier, s.out_mmr, s.out_placed
    into v_season_id, v_tier, v_mmr, v_placed
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
    (user_id, season_id, tier, mmr, subject_filter, expand_at)
  values
    (auth.uid(), v_season_id, v_tier, v_mmr, p_subject_filter, now() + interval '15 seconds')
  on conflict (user_id) do update set
    tier = excluded.tier,
    mmr = excluded.mmr,
    subject_filter = excluded.subject_filter,
    joined_at = now(),
    expand_at = now() + interval '15 seconds';

  v_match_id := public.match_make(
    auth.uid(), v_season_id, v_tier, v_mmr, p_subject_filter, p_question_ids, 0
  );
  return v_match_id;
end;
$$;

grant execute on function public.comp_join_queue(text, text[]) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- 6) comp_tick_queue — yaşı hesapla, MMR ile match_make
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_tick_queue(
  p_question_ids text[]
) returns uuid
language plpgsql security definer
as $$
declare
  v_season_id int;
  v_tier int;
  v_mmr numeric;
  v_subject_filter text;
  v_joined_at timestamptz;
  v_age int;
begin
  select season_id, tier, mmr, subject_filter, joined_at
    into v_season_id, v_tier, v_mmr, v_subject_filter, v_joined_at
    from public.comp_queue
   where user_id = auth.uid();
  if v_season_id is null then
    return null;
  end if;

  v_age := greatest(0, extract(epoch from (now() - v_joined_at))::int);

  return public.match_make(
    auth.uid(), v_season_id, v_tier, coalesce(v_mmr, 1000),
    v_subject_filter, p_question_ids, v_age
  );
end;
$$;

grant execute on function public.comp_tick_queue(text[]) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- 7) comp_finalize_match — MMR (Elo) + MMR-tabanlı RR + placement +
--    gerçek düşüş/shield + beraberlik-güvenli + friendly-skip
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_finalize_match(
  p_match_id uuid
) returns void
language plpgsql security definer
as $$
declare
  v_m record;
  v_p1_correct int; v_p1_blank int; v_p1_dur int;
  v_p2_correct int; v_p2_blank int; v_p2_dur int;
  v_p1_score numeric; v_p2_score numeric;
  v_winner uuid;
  v_margin numeric := 0;
  v_res1 text; v_res2 text;
  v_p1 record; v_p2 record;
  -- Elo
  v_exp1 numeric; v_exp2 numeric;
  v_act1 numeric; v_act2 numeric;
  v_k1 int; v_k2 int;
  v_mmr1_delta int; v_mmr2_delta int;
  v_new_mmr1 numeric; v_new_mmr2 numeric;
  -- rütbe adımı
  v_streak1_after int; v_streak2_after int;
  v_rr1_delta int; v_rr2_delta int;
  v_gap1 numeric; v_gap2 numeric;
  v_tier1 int; v_rr1 int; v_high1 int; v_shield1 boolean; v_promo1 boolean;
  v_tier2 int; v_rr2 int; v_high2 int; v_shield2 boolean; v_promo2 boolean;
  v_left1 int; v_left2 int; v_placed1 boolean; v_placed2 boolean;
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

  -- Cevap özetleri (skor formülü değişmedi)
  select coalesce(sum(case when is_correct then 1 else 0 end), 0), 10 - count(*),
         coalesce(greatest(0, extract(epoch from (max(answered_at) - v_m.started_at))::int), 0)
    into v_p1_correct, v_p1_blank, v_p1_dur
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_m.player1_id;

  select coalesce(sum(case when is_correct then 1 else 0 end), 0), 10 - count(*),
         coalesce(greatest(0, extract(epoch from (max(answered_at) - v_m.started_at))::int), 0)
    into v_p2_correct, v_p2_blank, v_p2_dur
    from public.comp_match_answers
   where match_id = p_match_id and player_id = v_m.player2_id;

  v_p1_score := greatest(0, (v_p1_correct - v_p1_blank) * 10)::numeric / greatest(60, v_p1_dur)::numeric;
  v_p2_score := greatest(0, (v_p2_correct - v_p2_blank) * 10)::numeric / greatest(60, v_p2_dur)::numeric;

  -- Kazanan + kararlılık (margin)
  if v_p1_score > v_p2_score then
    v_winner := v_m.player1_id; v_res1 := 'win'; v_res2 := 'loss';
  elsif v_p2_score > v_p1_score then
    v_winner := v_m.player2_id; v_res1 := 'loss'; v_res2 := 'win';
  else
    v_winner := null; v_res1 := 'draw'; v_res2 := 'draw';
  end if;

  if v_winner is not null then
    v_margin := least(1.0, greatest(0.0,
      ((greatest(v_p1_score, v_p2_score) / greatest(least(v_p1_score, v_p2_score), 0.001)) - 1) / 1.5));
  end if;

  -- ARKADAŞ DÜELLOSU: rütbe/MMR etkilenmez, sadece maç sonucu yazılır
  if v_m.is_friendly then
    update public.comp_matches set
      status = 'finished', winner_id = v_winner,
      p1_correct = v_p1_correct, p1_blank = v_p1_blank, p1_duration_s = v_p1_dur,
      p1_score = v_p1_score, p1_delta = 0,
      p2_correct = v_p2_correct, p2_blank = v_p2_blank, p2_duration_s = v_p2_dur,
      p2_score = v_p2_score, p2_delta = 0,
      finished_at = now()
    where id = p_match_id;
    return;
  end if;

  -- Rütbe satırlarını kilitle
  select * into v_p1 from public.comp_ranks
   where user_id = v_m.player1_id and season_id = v_m.season_id for update;
  select * into v_p2 from public.comp_ranks
   where user_id = v_m.player2_id and season_id = v_m.season_id for update;

  -- Emniyet: satır yoksa varsayılan placement satırı oluştur
  if v_p1.user_id is null then
    insert into public.comp_ranks (user_id, season_id) values (v_m.player1_id, v_m.season_id)
      on conflict do nothing;
    select * into v_p1 from public.comp_ranks
     where user_id = v_m.player1_id and season_id = v_m.season_id for update;
  end if;
  if v_p2.user_id is null then
    insert into public.comp_ranks (user_id, season_id) values (v_m.player2_id, v_m.season_id)
      on conflict do nothing;
    select * into v_p2 from public.comp_ranks
     where user_id = v_m.player2_id and season_id = v_m.season_id for update;
  end if;

  -- Elo (maç öncesi MMR'larla beklenti)
  v_exp1 := 1.0 / (1 + power(10, (v_p2.mmr - v_p1.mmr) / 400.0));
  v_exp2 := 1.0 / (1 + power(10, (v_p1.mmr - v_p2.mmr) / 400.0));
  v_act1 := case v_res1 when 'win' then 1.0 when 'draw' then 0.5 else 0.0 end;
  v_act2 := case v_res2 when 'win' then 1.0 when 'draw' then 0.5 else 0.0 end;
  v_k1 := case when v_p1.placement_left > 0 then 60 else 32 end;
  v_k2 := case when v_p2.placement_left > 0 then 60 else 32 end;
  v_mmr1_delta := greatest(-v_k1, least(v_k1, round(v_k1 * (v_act1 - v_exp1))::int));
  v_mmr2_delta := greatest(-v_k2, least(v_k2, round(v_k2 * (v_act2 - v_exp2))::int));
  v_new_mmr1 := greatest(100, v_p1.mmr + v_mmr1_delta);
  v_new_mmr2 := greatest(100, v_p2.mmr + v_mmr2_delta);

  v_streak1_after := case when v_res1 = 'win' then v_p1.win_streak + 1 else 0 end;
  v_streak2_after := case when v_res2 = 'win' then v_p2.win_streak + 1 else 0 end;

  -- P1: placement mı, yerleşik mi?
  if v_p1.placement_left > 0 then
    v_left1 := v_p1.placement_left - 1;
    v_placed1 := (v_left1 = 0);
    select o_tier, o_rr into v_tier1, v_rr1 from public.comp_rank_from_mmr(v_new_mmr1);
    v_high1 := greatest(v_p1.highest_tier_reached, v_tier1);
    v_shield1 := v_p1.demotion_shield; v_promo1 := false; v_rr1_delta := 0;
  else
    v_left1 := 0; v_placed1 := true;
    v_gap1 := v_new_mmr1 - public.comp_implied_mmr(v_p1.tier, v_p1.points);
    v_rr1_delta := public.comp_rr_delta(v_res1, v_gap1, v_margin, v_streak1_after);
    select o_tier, o_rr, o_highest, o_shield, o_promoted
      into v_tier1, v_rr1, v_high1, v_shield1, v_promo1
      from public.comp_progress_rank(v_p1.tier, v_p1.points, v_p1.highest_tier_reached,
                                     v_p1.demotion_shield, v_rr1_delta);
  end if;

  -- P2
  if v_p2.placement_left > 0 then
    v_left2 := v_p2.placement_left - 1;
    v_placed2 := (v_left2 = 0);
    select o_tier, o_rr into v_tier2, v_rr2 from public.comp_rank_from_mmr(v_new_mmr2);
    v_high2 := greatest(v_p2.highest_tier_reached, v_tier2);
    v_shield2 := v_p2.demotion_shield; v_promo2 := false; v_rr2_delta := 0;
  else
    v_left2 := 0; v_placed2 := true;
    v_gap2 := v_new_mmr2 - public.comp_implied_mmr(v_p2.tier, v_p2.points);
    v_rr2_delta := public.comp_rr_delta(v_res2, v_gap2, v_margin, v_streak2_after);
    select o_tier, o_rr, o_highest, o_shield, o_promoted
      into v_tier2, v_rr2, v_high2, v_shield2, v_promo2
      from public.comp_progress_rank(v_p2.tier, v_p2.points, v_p2.highest_tier_reached,
                                     v_p2.demotion_shield, v_rr2_delta);
  end if;

  -- comp_ranks güncelle — P1
  update public.comp_ranks set
    mmr = v_new_mmr1, tier = v_tier1, points = v_rr1, highest_tier_reached = v_high1,
    demotion_shield = v_shield1, placement_left = v_left1, placed = v_placed1,
    win_streak = case when v_res1 = 'win' then v_p1.win_streak + 1
                      when v_res1 = 'loss' then 0 else v_p1.win_streak end,
    wins = v_p1.wins + (case when v_res1 = 'win' then 1 else 0 end),
    losses = v_p1.losses + (case when v_res1 = 'loss' then 1 else 0 end),
    draws = v_p1.draws + (case when v_res1 = 'draw' then 1 else 0 end),
    challenge_next = coalesce(v_res1 = 'win' and v_margin >= 0.7, false),
    last_promoted_at = case when v_promo1 then now() else v_p1.last_promoted_at end,
    updated_at = now()
  where user_id = v_m.player1_id and season_id = v_m.season_id;

  -- comp_ranks güncelle — P2
  update public.comp_ranks set
    mmr = v_new_mmr2, tier = v_tier2, points = v_rr2, highest_tier_reached = v_high2,
    demotion_shield = v_shield2, placement_left = v_left2, placed = v_placed2,
    win_streak = case when v_res2 = 'win' then v_p2.win_streak + 1
                      when v_res2 = 'loss' then 0 else v_p2.win_streak end,
    wins = v_p2.wins + (case when v_res2 = 'win' then 1 else 0 end),
    losses = v_p2.losses + (case when v_res2 = 'loss' then 1 else 0 end),
    draws = v_p2.draws + (case when v_res2 = 'draw' then 1 else 0 end),
    challenge_next = coalesce(v_res2 = 'win' and v_margin >= 0.7, false),
    last_promoted_at = case when v_promo2 then now() else v_p2.last_promoted_at end,
    updated_at = now()
  where user_id = v_m.player2_id and season_id = v_m.season_id;

  -- Maçı finished işaretle (p1_delta/p2_delta = RR değişimi; placement'ta 0)
  update public.comp_matches set
    status = 'finished', winner_id = v_winner,
    p1_correct = v_p1_correct, p1_blank = v_p1_blank, p1_duration_s = v_p1_dur,
    p1_score = v_p1_score, p1_delta = v_rr1_delta,
    p2_correct = v_p2_correct, p2_blank = v_p2_blank, p2_duration_s = v_p2_dur,
    p2_score = v_p2_score, p2_delta = v_rr2_delta,
    finished_at = now()
  where id = p_match_id;
end;
$$;

grant execute on function public.comp_finalize_match(uuid) to authenticated;

-- ──────────────────────────────────────────────────────────────
-- 8) comp_leaderboard — sezon sıralaması (RLS bypass; sadece herkese açık
--    sıralama alanları + görünen ad/avatar döner). Radiant-tarzı liderlik.
-- ──────────────────────────────────────────────────────────────
create or replace function public.comp_leaderboard(p_limit int default 100)
returns table(
  rank_no bigint,
  user_id uuid,
  display_name text,
  avatar_url text,
  tier int,
  points int,
  wins int,
  losses int,
  draws int,
  win_streak int,
  is_me boolean
)
language sql security definer
as $$
  with cur as (
    select (extract(year from (now() at time zone 'Europe/Istanbul'))::int) * 100
         + (extract(month from (now() at time zone 'Europe/Istanbul'))::int) as sid
  )
  select
    row_number() over (order by r.tier desc, r.points desc, r.wins desc, r.mmr desc) as rank_no,
    r.user_id,
    coalesce(
      u.raw_user_meta_data->>'full_name',
      u.raw_user_meta_data->>'name',
      split_part(u.email, '@', 1),
      'Öğrenci'
    ) as display_name,
    coalesce(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture') as avatar_url,
    r.tier, r.points, r.wins, r.losses, r.draws, r.win_streak,
    (r.user_id = auth.uid()) as is_me
  from public.comp_ranks r
  join cur on r.season_id = cur.sid
  left join auth.users u on u.id = r.user_id
  where r.placed = true
  order by r.tier desc, r.points desc, r.wins desc, r.mmr desc
  limit greatest(1, least(500, p_limit));
$$;

grant execute on function public.comp_leaderboard(int) to authenticated;
