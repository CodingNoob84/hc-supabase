import { TypedSupabaseClient } from '@/supabase/types'

export const getAllReviews = async ({
    supabase,
}: {
    supabase: TypedSupabaseClient
}) => {
    const { data } = await supabase.from('reviews').select(`
            *,
            users (
                display_name,
                avatar_url,
                email
            )
        `)
    return data
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
