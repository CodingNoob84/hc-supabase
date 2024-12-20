import { TypedSupabaseClient } from '@/supabase/types'

export interface matchInitTypes {
    my_id: string
    opp_id: string
    max_overs: number | undefined
    max_wickets: number | undefined
    is_timer: boolean | undefined
    type: string
}

export interface matchInitReturnType {
    message: string
    success: boolean
    match_id: string
}

export const matchInit = async (
    data: matchInitTypes,
    supabase: TypedSupabaseClient
) => {
    const result = await supabase.rpc('matchinit', {
        user_one: data.my_id,
        opponent_id: data.opp_id,
        max_overs: data.max_overs,
        max_wickets: data.max_wickets,
        is_timer: data.is_timer,
        type: data.type,
    })
    return result.data as unknown as matchInitReturnType
}

export interface TeamInfo {
    id: string
    runs: number
    balls: number
    wickets: number
    teamname: string
    avatar_url: string
    display_name: string
}

export interface MatchData {
    type: string // Indicates the type of match ('bot' or 'user')
    result: string | null // The match result (null if no result)
    innings: number // Current innings (1 or 2)
    my_team: TeamInfo // Information about the user's team
    is_timer: boolean // Whether the timer is active
    match_id: string // Unique match ID
    opp_team: TeamInfo // Information about the opponent's team
    max_overs: number // Max overs allowed in the match
    batting_id: string // ID of the team currently batting
    created_at: string // Timestamp of match creation (ISO format)
    max_wickets: number // Max wickets allowed in the match
    toss_choice: string // Toss decision (bat or bowl)
    toss_winner: string // ID of the toss winner
    is_innings_over: boolean
    is_completed: boolean
    updated_at: string
    current_ball: string
    winner: string
    result_by: string
}

export const getMatchData = async (
    matchId: string,
    supabase: TypedSupabaseClient
): Promise<MatchData | null> => {
    const { data, error } = await supabase.rpc('getmatchdata', {
        match_id: matchId,
    })

    if (error) {
        console.error('Error fetching match data:', error)
        return null
    }
    return (data as unknown as MatchData) || null
}

export interface TossReturnTypes {
    match_id: string
    toss_winner: string // UUID of the toss winner (can be user ID or bot ID)
    toss_choice: 'bat' | 'bowl' // Choice of the toss winner
    innings: number // Current innings (likely starts at 1)
    success: boolean // Success flag
    message: string // Optional message for further context
}

export const generateToss = async (
    matchId: string,
    supabase: TypedSupabaseClient
): Promise<TossReturnTypes | null> => {
    const result = await supabase.rpc('autogenerate_toss', {
        match_id: matchId,
    })
    console.log('result', result)
    return result.data as TossReturnTypes | null
}

export interface HandleScoreArgs {
    matchId: string
    battingId: string
    runs: number
    wickets: number
}

export interface HandleScoreReturnTypes {
    sucess: boolean
    message: string
    matchId: string
    battingId: string
    runs: number
    wickets: number
    is_innings_over: boolean
    is_completed: boolean
    resultby: string
    winner: string
}

// export const handleScore = async (
//     data: HandleScoreArgs,
//     supabase: TypedSupabaseClient
// ): Promise<HandleScoreReturnTypes | null> => {
//     const result = await supabase.rpc('handle_score', {
//         match_id: data.matchId,
//         batting_id: data.battingId,
//         runs: data.runs,
//         wickets: data.wickets,
//     })
//     console.log('handlescore', result)
//     return result.data as HandleScoreReturnTypes | null
// }

export interface switchInningsReturnTypes {
    success: boolean
    message: string
    new_batting_id: string
    innings: number
}

export const switchInnings = async (
    matchId: string,
    supabase: TypedSupabaseClient
): Promise<switchInningsReturnTypes | null> => {
    const result = await supabase.rpc('switchinnings', {
        p_matchid: matchId,
    })
    console.log('result', result)
    return result.data as switchInningsReturnTypes | null
}

export interface handleScoreTypes {
    matchId: string
    userId: string
    ball: number
    Number: number
}

export interface handleScoreReturnTypes {
    ball: number
    result: string | null
    message: string
    success: true
    match_id: string
    my_number: number | null
    batting_id: string
    opp_number: number | null
}

export const handleScore = async (
    data: handleScoreTypes,
    supabase: TypedSupabaseClient
): Promise<handleScoreReturnTypes | null> => {
    const result = await supabase.rpc('handlescore', {
        p_matchid: data.matchId,
        p_userid: data.userId,
        p_ball: data.ball,
        p_number: data.Number,
    })

    return result.data as handleScoreReturnTypes | null
}
