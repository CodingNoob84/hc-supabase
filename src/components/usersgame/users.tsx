'use client'
import { userQuery } from '@/queries/queries' // Your query for fetching the current user
import { getAllUsersWithRequests } from '@/queries/user-team' // RPC function for fetching all users with requests
import { getSupabaseBrowserClient } from '@/supabase/client' // Supabase client
import { useQuery } from '@tanstack/react-query' // React Query for data fetching
import FriendsList from './users-list'

export const Users = () => {
    const supabase = getSupabaseBrowserClient()

    // Fetch the current user
    const {
        data: user,
        isLoading: isUserLoading,
        error: userError,
    } = useQuery({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })

    const userId = user?.id

    // Fetch all users except the current user with request statuses
    const {
        data: users,
        isLoading: isUsersLoading,
        error: usersError,
    } = useQuery({
        queryKey: ['allusers', userId], // Only fetch when user is available
        queryFn: () => getAllUsersWithRequests(supabase, userId as string),
        enabled: !!userId, // Ensures this query only runs after the user is fetched
    })

    // Loading and error states
    if (isUserLoading || isUsersLoading) {
        return <div>Loading...</div>
    }

    if (userError) {
        return <div>Error fetching user: {userError.message}</div>
    }

    if (usersError) {
        return <div>Error fetching users: {usersError.message}</div>
    }

    console.log(users)

    return users && <FriendsList myId={userId as string} initialUsers={users} />
}
