import { UserGameLayout } from '@/components/usersgame/user-gamelayout'
import { getMatchData } from '@/queries/matches'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'

export default async function UserMatchPage({
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
    return (
        <div>
            <UserGameLayout matchId={matchid} />
        </div>
    )
}
