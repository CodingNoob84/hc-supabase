'use client'
import { getAllMatchesByUserId } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { MatchCard, MatchcardSkeleton } from './match-card'

export const ListMatches = ({ userId }: { userId: string }) => {
    const supabase = getSupabaseBrowserClient()
    const { data: allMatches, isLoading } = useQuery({
        queryKey: ['allMatches', userId],
        queryFn: () => getAllMatchesByUserId(userId, supabase),
        enabled: !!userId, // Only fetch when `userdata?.id` is available
    })
    console.log('allMatches', allMatches)

    if (isLoading) {
        return <MatchcardSkeleton />
    }
    if (allMatches && allMatches.length === 0) {
        return (
            <div className="flex items-center justify-center">No Records </div>
        )
    }
    return (
        <div className="flex flex-col gap-2">
            {allMatches?.map((matchdata, i) => (
                <MatchCard key={i} matchData={matchdata} />
            ))}
        </div>
    )
}
