import { TypedSupabaseClient } from '@/supabase/types'
import { redirect } from 'next/navigation'

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

        console.log('user', user)

        if (userError) {
            redirect('/login')
        }

        if (!user) {
            redirect('/login')
        }

        // Step 2: Query the "users" table to fetch user details
        const { data: userData, error: userTableError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single() // Fetch a single user

        if (userTableError) {
            throw new Error(`Database error: ${userTableError.message}`)
        }

        return userData // Return user data
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

export const getBot = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase.from('bots').select('*').single()
    //console.log('data', data)
    return data
}
