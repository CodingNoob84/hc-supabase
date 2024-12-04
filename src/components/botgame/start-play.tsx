'use client'

import { Timer, Trophy, Users } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { getInitials } from '@/lib/utils'
import {
    matchInit,
    matchInitReturnType,
    matchInitTypes,
} from '@/queries/matches'
import { botQuery, userQuery } from '@/queries/queries'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Skeleton } from '../ui/skeleton'

interface User {
    id: string
}

export default function StartPlay() {
    const router = useRouter()
    const supabase = getSupabaseBrowserClient()

    const queryClient = useQueryClient()

    const user: User | undefined = queryClient.getQueryData(userQuery.key)

    // const { data: user } = useQuery({
    //     queryKey: userQuery.key,
    //     queryFn: () => userQuery.func({ supabase }),
    // })
    const { data: bot, isLoading } = useQuery({
        queryKey: botQuery.key,
        queryFn: () => botQuery.func({ supabase }),
    })

    const matchInitMutation = useMutation({
        mutationFn: (data: matchInitTypes) => matchInit(data, supabase),
        onSuccess: (result: matchInitReturnType) => {
            console.log('Mutation successful, data:', result)
            router.push(`/dashboard/botgame/${result.match_id}`)
        },
    })

    const [matchType, setMatchType] = useState('one')
    const [timerEnabled, setTimerEnabled] = useState(false)

    const handleInitPlay = () => {
        if (user && bot) {
            const data: matchInitTypes = {
                my_id: user.id,
                opp_id: bot.id,
                type: 'bot',
                max_overs: matchType == 'one' ? 1 : 5,
                max_wickets: matchType == 'one' ? 2 : 5,
                is_timer: timerEnabled,
            }
            console.log('onsubmit', data)
            matchInitMutation.mutate(data)
        }
    }

    if (isLoading) {
        return (
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Skeleton className="h-14 w-14 rounded-full" />
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="w-full h-5" />

                        <div className="flex items-center text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            <Skeleton className="w-full h-4" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-3 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="w-full h-9" />
                            <Skeleton className="w-full h-9" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Timer className="h-4 w-4" />
                                <Label htmlFor="timer">Enable Timer</Label>
                            </div>
                            <Skeleton className="h-4 w-6" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="w-full h-9" />
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-14 w-14">
                    <AvatarImage
                        src={bot?.avatar_url ?? ''}
                        alt={bot?.display_name ?? ''}
                    />
                    <AvatarFallback>
                        {getInitials(bot?.display_name ?? '')}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold">{bot?.display_name}</h3>
                    <div className="flex items-center text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        <span>{bot?.teamname}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
                <div>{`"${bot?.teamdescription}"`}</div>
                <div className="space-y-3 py-2">
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant={
                                matchType === 'one' ? 'default' : 'outline'
                            }
                            onClick={() => setMatchType('one')}
                        >
                            <Trophy className="mr-2 h-4 w-4" />
                            One Over
                        </Button>
                        <Button
                            variant={
                                matchType === 'five' ? 'default' : 'outline'
                            }
                            onClick={() => setMatchType('five')}
                        >
                            <Trophy className="mr-2 h-4 w-4" />
                            Five Over
                        </Button>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Timer className="h-4 w-4" />
                            <Label htmlFor="timer">Enable Timer</Label>
                        </div>
                        <Switch
                            id="timer"
                            checked={timerEnabled}
                            onCheckedChange={setTimerEnabled}
                        />
                    </div>
                    {timerEnabled && (
                        <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                            You will have 15 seconds to play each ball. Make it
                            count!
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleInitPlay}
                    className="w-full"
                    disabled={matchInitMutation.isPending}
                >
                    {matchInitMutation.isPending ? 'Loading..' : 'Play Now'}
                </Button>
            </CardFooter>
        </Card>
    )
}
