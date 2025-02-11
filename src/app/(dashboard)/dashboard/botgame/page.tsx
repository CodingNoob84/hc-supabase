import { BotList } from '@/components/botgame/bot-list'
import { Button } from '@/components/ui/button'
import { botQuery } from '@/queries/queries'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'
import Link from 'next/link'

export default async function BotGamePage() {
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: botQuery.key,
        queryFn: () => botQuery.func({ supabase }),
        staleTime: 0,
    })
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 py-2">
            <div className="flex flex-start">
                <Button variant={'outline'} asChild>
                    <Link href="/dashboard">Back</Link>
                </Button>
            </div>
            <BotList />
            {/* <StartPlay /> */}
        </div>
    )
}
