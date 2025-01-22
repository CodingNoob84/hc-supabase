import { ListMatches } from '@/components/matchhistory/list-matches'
import { Button } from '@/components/ui/button'
import { userQuery } from '@/queries/queries'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'
import Link from 'next/link'

export default async function MatchHistoryPage() {
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    const user = await queryClient.ensureQueryData({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 py-2">
            <div className="flex flex-start">
                <Button variant={'outline'} asChild>
                    <Link href="/dashboard">Back</Link>
                </Button>
            </div>
            {/* <UnderDevelopment /> */}
            {user && <ListMatches userId={user?.id} />}
        </div>
    )
}
