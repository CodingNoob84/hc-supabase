import StartPlay from '@/components/botgame/start-play'
import { botQuery } from '@/queries/queries'
import { getSupabaseServer } from '@/supabase/server'
import { QueryClient } from '@tanstack/react-query'

export default async function BotGamePage() {
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: botQuery.key,
        queryFn: () => botQuery.func({ supabase }),
        staleTime: 0,
    })
    return (
        <div className="max-w-md mx-auto p-2">
            <StartPlay />
        </div>
    )
}
