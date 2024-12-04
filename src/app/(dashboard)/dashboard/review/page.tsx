import ReviewCard from '@/components/review/review-card'
import { userQuery } from '@/queries/queries'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'

export default async function ReviewPage() {
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    const user = await queryClient.ensureQueryData({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })
    if (!user) {
        return null
    }

    return (
        <div className="p-4">
            {user && (
                <ReviewCard
                    userImage={user.avatar_url}
                    userName={user.display_name}
                    userEmail={user.email}
                />
            )}
        </div>
    )
}
