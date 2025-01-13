'use client'
import { getMatchData, MatchData } from '@/queries/matches'
import { UserInfo } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useState } from 'react'
import { ScoreCard } from '../botgame/score-card'
import { Loader } from '../common/loader'
import { ShowTossCard } from './show-toss'
import { UserRunSelectionBlock } from './user-run-selection'

export const UserGameLayout = ({ matchId }: { matchId: string }) => {
    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()
    const [showToss, setShowToss] = useState(true)
    const user: UserInfo | undefined = queryClient.getQueryData(['user'])
    const { data, isLoading } = useQuery<MatchData | null>({
        queryKey: ['match', matchId],
        queryFn: async () => await getMatchData(matchId, supabase),
    })
    console.log('data', data)
    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Loader />
    }

    if (!data) {
        return <Loader />
    }
    return (
        <div className="flex flex-col gap-4 p-2">
            <ScoreCard data={data} />
            {showToss ? (
                <ShowTossCard
                    myId={user.id}
                    tossWinner={data.toss_winner}
                    tossChoice={data.toss_choice}
                    setShowToss={setShowToss}
                />
            ) : (
                <UserRunSelectionBlock data={data} myId={user.id} />
            )}
        </div>
    )
}
