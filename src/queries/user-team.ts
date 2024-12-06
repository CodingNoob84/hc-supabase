import { TypedSupabaseClient } from '@/supabase/types'
import { redirect } from 'next/navigation'

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
            redirect('/login')
        }

        if (!user) {
            redirect('/login')
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
}

export const getBot = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase.from('bots').select('*').single()
    return data as BotInfo
}

export const getReviewByUserId = async ({
    userId,
    supabase,
}: {
    userId: string
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', userId)
        .single()
    return data
}

export interface UpdateReviewTypes {
    userId: string
    rating: number
    description: string
}

export const updateReview = async ({
    data,
    supabase,
}: {
    data: UpdateReviewTypes
    supabase: TypedSupabaseClient
}) => {
    try {
        // First, check if a review already exists for the user
        const { data: existingReview, error: fetchError } = await supabase
            .from('reviews') // Assuming your table is called 'reviews'
            .select('*')
            .eq('user_id', data.userId)

        if (fetchError) throw fetchError

        console.log('existingReview', existingReview)

        if (existingReview.length > 0) {
            // If a review already exists, update it with the new data
            const { error: updateError } = await supabase
                .from('reviews')
                .update({
                    rating: data.rating,
                    description: data.description,
                    updated_at: new Date().toISOString(), // Update timestamp for update
                })
                .eq('user_id', data.userId)

            if (updateError) throw updateError

            return { success: true, message: 'Review updated successfully' }
        } else {
            // If no review exists, insert a new one
            const { data: insertdata, error: insertError } = await supabase
                .from('reviews')
                .insert([
                    {
                        user_id: data.userId,
                        rating: data.rating,
                        description: data.description,
                        created_at: new Date().toISOString(), // Set creation timestamp
                    },
                ])
            console.log('datainsert', insertdata)
            if (insertError) throw insertError

            return { success: true, message: 'Review added successfully' }
        }
    } catch (error) {
        console.error('Error updating review:', error)
        return {
            success: false,
            message: 'An error occurred while updating the review',
        }
    }
}
