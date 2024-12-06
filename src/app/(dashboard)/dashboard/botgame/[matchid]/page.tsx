import { GameLayout } from '@/components/botgame/game-layout'
import { getMatchData } from '@/queries/matches'
import { getBot } from '@/queries/user-team'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'

export default async function BotMatchPage({
    params,
}: {
    params: Promise<{ matchid: string }>
}) {
    const { matchid } = await params
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['match', matchid],
        queryFn: async () => await getMatchData(matchid, supabase),
    })
    await queryClient.prefetchQuery({
        queryKey: ['bot'],
        queryFn: async () => await getBot({ supabase }),
    })

    return <GameLayout matchId={matchid} />
}
