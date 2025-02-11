import { TypedSupabaseClient } from '@/supabase/types'

export interface UserInfo {
    id: string
    created_at: string
    display_name: string
    email: string
    avatar_url: string
    role: string
    teamname: string
    teamdescription: string
}

export const getUser = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    try {
        // Step 1: Get the authenticated user
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
            return null
        }

        if (!user) {
            return null
        }

        // Step 2: Query the "users" table to fetch user details
        const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

        return userData as UserInfo // Return user data
    } catch (err) {
        console.error('Error fetching user data:', err)
        throw err // Propagate error to be handled by React Query
    }
}

export const getUserById = async ({
    oppUserId,
    supabase,
}: {
    oppUserId: string
    supabase: TypedSupabaseClient
}) => {
    try {
        const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', oppUserId)
            .single()

        return userData as UserInfo // Return user data
    } catch (err) {
        console.error('Error fetching user data:', err)
        throw err // Propagate error to be handled by React Query
    }
}

export interface updateTeamTypes {
    userId: string
    teamname: string
    teamdescription: string
}

export const updateTeam = async (
    { userId, teamname, teamdescription }: updateTeamTypes,
    supabase: TypedSupabaseClient
): Promise<{ success: boolean; message: string }> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({
                teamname: teamname,
                teamdescription: teamdescription,
            })
            .eq('id', userId)

        if (error) {
            throw new Error(error.message)
        }

        console.log('Updated data:', data)
        return { success: true, message: 'Team updated successfully' }
    } catch (err) {
        console.error('Unexpected error:', err)
        return { success: false, message: 'An unexpected error occurred' }
    }
}

export interface BotInfo {
    id: string
    created_at: string
    display_name: string
    avatar_url: string
    teamname: string
    teamdescription: string
    email: string
    moto: string
    level: string
    codename: string
}

export const getAllBots = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase.from('bots').select('*')
    return data as BotInfo[]
}

export const getBot = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase
        .from('bots')
        .select('*')
        .eq('id', '499f299f-6a99-4055-af41-a2ca83f5f3a4')
        .single()
    return data as BotInfo
}

// export const getAllUsers = async ({
//     supabase,
// }: {
//     supabase: TypedSupabaseClient
// }) => {
//     const {
//         data: { user },
//         error: userError,
//     } = await supabase.auth.getUser()

//     if (userError) {
//         throw new Error(`Error fetching user: ${userError.message}`)
//     }

//     if (user) {
//         const { data, error } = await supabase
//             .from('users')
//             .select('*')
//             .neq('id', user.id) // Exclude the current authenticated user

//         if (error) {
//             throw new Error(`Error fetching users: ${error.message}`)
//         }

//         return data
//     }
// }

export type GameMode = 'six_balls' | 'thirty_balls'
export type RequsetStatusType =
    | 'requested'
    | 'none'
    | 'sent'
    | 'received'
    | 'accepted'
    | 'continue'
    | 'play'

export interface UserWithRequest {
    user_id: string
    display_name: string
    avatar_url: string
    email: string
    teamname: string
    presence_status: string | null // `null` if no presence record exists
    last_seen: string | null // `null` if no presence record exists
    req_id: string | null
    matchid: string | null
    req_status: RequsetStatusType
    gamemode: GameMode
}

export const getAllUsersWithRequests = async (
    supabase: TypedSupabaseClient,
    userId: string // The current user's ID
): Promise<UserWithRequest[]> => {
    try {
        // Call the RPC function
        const { data, error } = await supabase.rpc('get_users_with_requests', {
            my_user_id: userId,
        })

        if (error) {
            throw new Error(
                `Error fetching users with requests: ${error.message}`
            )
        }

        if (!data) {
            throw new Error('No data returned from get_users_with_requests')
        }

        // Return the typed data
        return data as UserWithRequest[]
    } catch (err) {
        console.error('Error fetching users with requests:', err)
        throw err
    }
}

export const upsertReqStatus = async (
    supabase: TypedSupabaseClient,
    myid: string,
    friendid: string,
    reqstatus: string,
    gamemode: string
): Promise<{ result: string }> => {
    try {
        console.log('input', myid, friendid, reqstatus)
        const { data, error } = await supabase.rpc('upsertreqstatus', {
            myid,
            friendid,
            reqstatus,
            reqgamemode: gamemode,
        })

        if (error) {
            console.error('Error calling upsertreqstatus:', error.message)
            return { result: 'error' } // Return { result: "error" } if the RPC call fails
        }
        console.log('data', data)
        return { result: 'success' } // Return { result: "success" } if the RPC call succeeds
    } catch (err) {
        console.error('Unexpected error:', err)
        return { result: 'error' } // Return { result: "error" } for unexpected errors
    }
}

interface UserStats {
    display_name: string
    email: string
    avatar_url: string
    matches_played: number
    matches_won: number
    matches_lost: number
}

export async function getUserStats(
    supabase: TypedSupabaseClient,
    userId: string
): Promise<UserStats | null> {
    try {
        // Call the RPC function
        const { data, error } = await supabase.rpc('getuserstats', {
            userid: userId,
        })

        if (error) {
            console.error('Error fetching user stats:', error.message)
            return null
        }

        if (data && data.length > 0) {
            // Return the first row (since it returns one row per user)
            return data[0] as UserStats
        } else {
            console.warn('No stats found for the user')
            return null
        }
    } catch (err) {
        console.error('Unexpected error fetching user stats:', err)
        return null
    }
}

export interface UserMatchStats {
    user_id: string
    display_name: string
    avatar_url: string
    matches_played: number
    matches_won: number
    matches_lost: number
    winning_percentage: number
}

export const getAllUsersMatchStats = async (
    supabase: TypedSupabaseClient,
    top: number,
    minimummatches: number
): Promise<UserMatchStats[] | null> => {
    try {
        const { data, error } = await supabase.rpc(
            'get_all_users_match_stats',
            {
                top,
                minimummatches,
            }
        )

        if (error) {
            console.error('Error fetching match stats:', error.message)
            return null
        }

        return data as UserMatchStats[]
    } catch (error) {
        console.error('Unexpected error fetching match stats:', error)
        return null
    }
}
