import ReviewCard from '@/components/review/review-card'
import { Button } from '@/components/ui/button'
import { userQuery } from '@/queries/queries'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'
import Link from 'next/link'

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
        <div className="max-w-md mx-auto flex flex-col gap-2 py-2">
            <div className="flex flex-start">
                <Button variant={'outline'} asChild>
                    <Link href="/dashboard">Back</Link>
                </Button>
            </div>
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
