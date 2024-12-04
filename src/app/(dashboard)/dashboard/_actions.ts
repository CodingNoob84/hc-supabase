import { getSupabaseServer } from '@/supabase/server'

export const getCurrentUser = async () => {
    const supabase = await getSupabaseServer()

    // Get the authenticated user
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (user) {
        // Query the users table and fetch a single user
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single() // Ensure the result is a single object

        if (error) {
            console.error('Error fetching user details:', error.message)
            return null
        }

        return data // Return the user data as an object
    } else {
        console.error('No authenticated user found:', userError?.message)
        return null
    }
}
