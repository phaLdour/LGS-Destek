"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export type MatchSubscription = { unsubscribe: () => void };

/**
 * Aktif maç dinleyicisi:
 *   - rakibin her yeni cevabını `onOpponentAnswer(qIndex)` çağırır
 *   - maç finished'a düşünce `onFinished()` çağırır
 *   - bağlanamazsa `onError()` (client polling fallback'e geçer)
 *
 * Yapılandırma yoksa null döner; çağıran tarafça da kabul edilir.
 */
export function subscribeToMatch(
  matchId: string,
  myUserId: string,
  cbs: {
    onOpponentAnswer?: (qIndex: number) => void;
    onFinished?: () => void;
    onError?: () => void;
  },
): MatchSubscription | null {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient();
  const channel = supabase.channel(`match:${matchId}`);

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "comp_match_answers",
      filter: `match_id=eq.${matchId}`,
    },
    (payload) => {
      const row = payload.new as { player_id?: string; q_index?: number };
      if (!row?.player_id || row.player_id === myUserId) return;
      if (typeof row.q_index === "number") {
        cbs.onOpponentAnswer?.(row.q_index);
      }
    },
  );

  channel.on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "comp_matches",
      filter: `id=eq.${matchId}`,
    },
    (payload) => {
      const row = payload.new as { status?: string };
      if (row?.status === "finished") cbs.onFinished?.();
    },
  );

  channel.subscribe((status) => {
    if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      cbs.onError?.();
    }
  });

  return {
    unsubscribe: () => {
      try {
        channel.unsubscribe();
        supabase.removeChannel(channel);
      } catch {
        // yoksay
      }
    },
  };
}

/**
 * Matchmaking dinleyicisi — `comp_matches` INSERT olayını iki ayrı
 * filtre ile (player1_id=eq.me, player2_id=eq.me) dinler. Supabase
 * Realtime OR filter desteklemediğinden iki listener şart.
 */
export function subscribeToMatchmaking(opts: {
  userId: string;
  onMatched: (matchId: string) => void;
  onError?: () => void;
}): MatchSubscription | null {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient();
  const channel = supabase.channel(`mm:${opts.userId}`);

  const onMatch = (payload: { new: Record<string, unknown> }) => {
    const id = payload?.new?.id;
    if (typeof id === "string") opts.onMatched(id);
  };

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "comp_matches",
      filter: `player1_id=eq.${opts.userId}`,
    },
    onMatch,
  );
  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "comp_matches",
      filter: `player2_id=eq.${opts.userId}`,
    },
    onMatch,
  );

  channel.subscribe((status) => {
    if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      opts.onError?.();
    }
  });

  return {
    unsubscribe: () => {
      try {
        channel.unsubscribe();
        supabase.removeChannel(channel);
      } catch {
        // yoksay
      }
    },
  };
}
