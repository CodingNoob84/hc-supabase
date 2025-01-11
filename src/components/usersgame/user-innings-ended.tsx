'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { MatchData, switchUserInnings, TeamInfo } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RefreshCw, Star, Users } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { convertBallsToOvers } from '../botgame/score-card'

const getBattingTeam = (
    battingId: string,
    teamOne: TeamInfo,
    teamTwo: TeamInfo
) => {
    if (teamOne.id === battingId) {
        return teamOne
    } else if (teamTwo.id === battingId) {
        return teamTwo
    }
    return null // Return null if no matching team is found
}

export default function UserInningsEndedCard({
    setCommentaryResult,
}: {
    setCommentaryResult: (result: string) => void
}) {
    const queryClient = useQueryClient()
    const params: { matchid: string } = useParams()
    const supabase = getSupabaseBrowserClient()
    const matchdata: MatchData | undefined = queryClient.getQueryData([
        'match',
        params.matchid,
    ])
    //console.log('type', matchdata?.type)

    useEffect(() => {
        const subscription = supabase
            .channel('user_request_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'usereachball',
                    filter: `matchid=eq.${params.matchid}`,
                },
                (payload) => {
                    console.log('payload', payload)
                    if (payload.eventType === 'INSERT') {
                        setCommentaryResult('')
                        queryClient.invalidateQueries({
                            queryKey: ['match', params.matchid],
                        })
                    }
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, queryClient])

    const switchInningsMutation = useMutation({
        mutationFn: () => switchUserInnings(params.matchid, supabase),
        onSuccess: (data) => {
            console.log('success', data)
            queryClient.invalidateQueries({
                queryKey: ['match', params.matchid],
            })
        },
    })

    const handleSwitchInnings = () => {
        console.log('swicth')
        setCommentaryResult('')
        switchInningsMutation.mutate()
    }

    if (!matchdata) {
        return <div>Loading...</div>
    }

    const battingTeam: TeamInfo | null = getBattingTeam(
        matchdata?.batting_id,
        matchdata?.my_team,
        matchdata?.opp_team
    )

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="space-y-4">
                <div className="mt-4 text-xl font-bold flex justify-center items-center">
                    Innings Ended
                </div>
                <div className="grid grid-cols-3 gap-2 items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl">
                    <div className="col-span-2 space-y-1">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-md font-semibold text-indigo-800 dark:text-indigo-200 truncate">
                                {battingTeam?.teamname}
                            </h2>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            <span className="truncate">
                                {battingTeam?.display_name}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                            {battingTeam?.runs}/{battingTeam?.wickets}
                        </div>
                        <div className="text-sm font-normal text-indigo-700 dark:text-indigo-300">
                            ({convertBallsToOvers(battingTeam?.balls ?? 0)}{' '}
                            overs)
                        </div>
                    </div>
                </div>

                <div className="bg-primary/10 p-2 rounded-lg">
                    {matchdata.batting_id == matchdata.my_team.id ? (
                        <p className="text-center text-md">
                            You need to defend{' '}
                            <span className="font-bold text-primary">
                                {(battingTeam?.runs ?? 0) + 1} runs
                            </span>{' '}
                            to win in{' '}
                            <span className="font-bold text-primary">
                                {matchdata.max_overs * 6} balls
                            </span>
                        </p>
                    ) : (
                        <p className="text-center text-md">
                            You need to chase{' '}
                            <span className="font-bold text-primary">
                                {(battingTeam?.runs ?? 0) + 1} runs
                            </span>{' '}
                            to win in{' '}
                            <span className="font-bold text-primary">
                                {matchdata.max_overs * 6} balls
                            </span>
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSwitchInnings} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restart 2nd Innings
                </Button>
            </CardFooter>
        </Card>
    )
}
