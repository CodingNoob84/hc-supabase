'use client'

import { getInitials } from '@/lib/utils'
import { userQuery } from '@/queries/queries'
import { getUserStats } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'

import { useQuery } from '@tanstack/react-query'
import { PlayCircle, Trophy, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader } from '../ui/card'
import { CircularProgress } from './circular-progress'

const calculateWinLossRatio = (won: number, total: number) => {
    if (total === 0) return 0
    return (won / total) * 100
}

export const UserStatsCard = () => {
    const supabase = getSupabaseBrowserClient()

    // Fetch the current user
    const { data: userdata, isLoading: isUserLoading } = useQuery({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })
    console.log('userdata', userdata)

    // Fetch user stats based on `userdata`
    const {
        data: userstats,
        isLoading: isStatsLoading,
        isError: isStatsError,
    } = useQuery({
        queryKey: ['userstats', userdata?.id],
        queryFn: () => getUserStats(supabase, userdata?.id as string),
        enabled: !!userdata?.id, // Only fetch when `userdata?.id` is available
    })

    if (isUserLoading || isStatsLoading) {
        return (
            <Card className="w-full max-w-md mx-auto overflow-hidden">
                <CardContent>
                    <p>Loading user stats...</p>
                </CardContent>
            </Card>
        )
    }

    if (isStatsError || !userstats) {
        return (
            <Card className="w-full max-w-md mx-auto overflow-hidden">
                <CardContent>
                    <p>Failed to load user stats. Please try again.</p>
                </CardContent>
            </Card>
        )
    }

    const winLossRatio = calculateWinLossRatio(
        userstats.matches_won ?? 0,
        userstats.matches_played ?? 0
    )

    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden">
            <CardHeader className="flex flex-row justify-between p-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 rounded-full border-4 border-primary shadow-lg">
                        <AvatarImage
                            src={userstats.avatar_url ?? ''}
                            alt={userstats.display_name ?? 'User Avatar'}
                        />
                        <AvatarFallback>
                            {getInitials(userstats.display_name ?? 'User')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">
                            {userstats.display_name ?? 'Unknown User'}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {userstats.email ?? 'No email available'}
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <CircularProgress percentage={winLossRatio} />
                        <span className="text-xs text-muted-foreground mt-1">
                            Win Ratio
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                        <PlayCircle className="h-5 w-5 text-primary mb-1" />
                        <span className="text-lg font-semibold">
                            {userstats.matches_played ?? 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Matches
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-green-100 rounded-lg">
                        <Trophy className="h-5 w-5 text-green-600 mb-1" />
                        <span className="text-lg font-semibold">
                            {userstats.matches_won ?? 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Won
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-red-100 rounded-lg">
                        <X className="h-5 w-5 text-red-600 mb-1" />
                        <span className="text-lg font-semibold">
                            {userstats.matches_lost ?? 0}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Lost
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
