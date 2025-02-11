'use client'

import { BotInfo, getAllBots } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { BotCard, BotCardSkeleton } from './bot-card'

const shuffleArray = (array: BotInfo[]) => {
    return array
        .map((bot) => ({ bot, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ bot }) => bot)
}

export const BotList = () => {
    const supabase = getSupabaseBrowserClient()
    const { data: allbots, isLoading } = useQuery<BotInfo[]>({
        queryKey: ['allbots'],
        queryFn: () => getAllBots({ supabase }),
    })

    const shuffledBots = useMemo(
        () => (allbots ? shuffleArray(allbots) : []),
        [allbots]
    )

    if (isLoading) {
        return (
            <>
                {[...Array(3)].map((_, index) => (
                    <BotCardSkeleton key={index} />
                ))}
            </>
        )
    }

    return (
        <>
            {shuffledBots?.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
            ))}
        </>
    )
}
