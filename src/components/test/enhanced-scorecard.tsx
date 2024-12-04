'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BoltIcon as Bat } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TeamInfo {
    id: string
    runs: number
    balls: number
    wickets: number
    teamname: string
    avatar_url: string
    display_name: string
}

export interface ScoreCard {
    type: 'bot' | 'user'
    result: string | null
    my_team: TeamInfo
    is_timer: boolean
    match_id: string
    opp_team: TeamInfo
    max_overs: number
    created_at: string
    max_wickets: number
}

interface TeamCardProps {
    team: TeamInfo
    isReverse?: boolean
    maxOvers: number
    maxWickets: number
}

const TeamCard = ({ team, isReverse, maxOvers, maxWickets }: TeamCardProps) => {
    const runRate =
        team.balls > 0 ? (team.runs / (team.balls / 6)).toFixed(2) : '0.00'
    const oversPlayed = Math.floor(team.balls / 6) + (team.balls % 6) / 10

    return (
        <div
            className={`flex flex-col ${
                isReverse ? 'items-end' : 'items-start'
            } space-y-2`}
        >
            <div
                className={`flex items-center space-x-2 ${
                    isReverse ? 'flex-row-reverse space-x-reverse' : ''
                }`}
            >
                <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage
                        src={team.avatar_url}
                        alt={team.display_name}
                    />
                    <AvatarFallback>
                        {team.display_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div
                    className={`text-sm ${
                        isReverse ? 'text-right' : 'text-left'
                    }`}
                >
                    <div className="font-semibold">{team.display_name}</div>
                    <div className="text-muted-foreground">{team.teamname}</div>
                </div>
            </div>
            <div
                className={`flex flex-col ${
                    isReverse ? 'items-end' : 'items-start'
                } space-y-1`}
            >
                <div className="text-2xl font-bold">
                    {team.runs}/{team.wickets}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({oversPlayed}/{maxOvers})
                    </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Bat size={16} />
                    <span>RR: {runRate}</span>
                </div>
            </div>
            <div className="w-full space-y-1">
                <Progress
                    value={(team.balls / (maxOvers * 6)) * 100}
                    className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                        Overs: {oversPlayed}/{maxOvers}
                    </span>
                    <span>
                        Wickets: {team.wickets}/{maxWickets}
                    </span>
                </div>
            </div>
        </div>
    )
}

export const EnhancedScoreCard = ({ data }: { data: ScoreCard }) => {
    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        if (data.is_timer) {
            const timer = setInterval(() => {
                setElapsedTime((prev) => prev + 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [data.is_timer])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                        {data.result || '1st Innings'}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex justify-between items-center space-x-4">
                    <TeamCard
                        team={data.opp_team}
                        maxOvers={data.max_overs}
                        maxWickets={data.max_wickets}
                    />
                    <div className="flex flex-col items-center space-y-2">
                        {!data.is_timer && (
                            <Badge
                                variant="destructive"
                                className="text-xs font-normal"
                            >
                                {formatTime(elapsedTime)}
                            </Badge>
                        )}
                        <Badge
                            variant="secondary"
                            className="text-lg px-3 py-1"
                        >
                            VS
                        </Badge>
                    </div>
                    <TeamCard
                        team={data.my_team}
                        isReverse
                        maxOvers={data.max_overs}
                        maxWickets={data.max_wickets}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
