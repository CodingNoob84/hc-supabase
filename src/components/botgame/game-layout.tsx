'use client'
import { getMatchData, MatchData } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '../common/loader'
import { TossCard } from './coin-toss'
import { RunSelectionBlock } from './run-selection'
import { ScoreCard as ScoreCardComponent } from './score-card' // Renaming for clarity

export interface TeamInfo {
    id: string
    runs: number
    balls: number
    wickets: number
    teamname: string
    avatar_url: string
    display_name: string
}

export interface ScoreCardType {
    type: 'bot' | 'user'
    result: string | null
    my_team: TeamInfo
    is_timer: boolean
    match_id: string
    opp_team: TeamInfo
    max_overs: number
    created_at: string
    max_wickets: number
    toss_winner: string
    toss_choice: string
    innings: number
    batting_id: string
}

export const GameLayout = ({ matchId }: { matchId: string }) => {
    const supabase = getSupabaseBrowserClient()

    // Fetch match data with react-query
    const { data, isLoading } = useQuery<MatchData | null>({
        queryKey: ['match', matchId],
        queryFn: async () => await getMatchData(matchId, supabase),
    })

    // Conditional rendering while waiting for data
    if (isLoading) {
        return <Loader />
    }

    if (!data) {
        return <div>Error loading match data.</div>
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <ScoreCardComponent data={data} />
            {data.toss_choice !== 'bat' && data.toss_choice !== 'bowl' ? (
                <TossCard matchId={data.match_id} myuserId={data.my_team.id} />
            ) : (
                <>
                    <RunSelectionBlock
                        type={data.type}
                        matchId={data.match_id}
                        myuserId={data.my_team.id}
                        battingId={data.batting_id}
                        totalballs={
                            data.batting_id == data.my_team.id
                                ? data.my_team.balls
                                : data.opp_team.balls
                        }
                    />
                </>
            )}
        </div>
    )
}
