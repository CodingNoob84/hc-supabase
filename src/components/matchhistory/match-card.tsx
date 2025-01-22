import { getInitials } from '@/lib/utils'
import { MatchDetails } from '@/queries/matches'
import { Bot, User } from 'lucide-react'
import { convertBallsToOvers } from '../botgame/score-card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const MatchCard = ({ matchData }: { matchData: MatchDetails }) => {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="w-full flex flex-row justify-between items-center gap-4">
                    <div className="w-full flex flex-col">
                        <div className="font-bold text-sm">
                            {matchData.user_one?.display_name}
                        </div>
                        <div className="flex flex-row justify-between">
                            <Avatar>
                                <AvatarImage
                                    src={matchData.user_one?.avatar_url || ''}
                                    alt={
                                        matchData.user_one?.display_name ||
                                        'Name'
                                    }
                                ></AvatarImage>
                                <AvatarFallback>
                                    {getInitials(
                                        matchData.user_one?.display_name || ''
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-sm">
                                <div>
                                    {matchData.user_one?.score.totalruns}/
                                    {matchData.user_one?.score.totalwickets}
                                </div>
                                <div className="text-primary text-sm">
                                    {convertBallsToOvers(
                                        matchData.user_one?.score.totalballs ||
                                            0
                                    )}{' '}
                                    overs
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex flex-col flex-start">
                        {matchData.type == 'bot' ? <Bot /> : <User />}
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="flex flex-row-reverse font-bold text-sm">
                            {matchData.user_two?.display_name || ''}
                        </div>
                        <div className="flex flex-row-reverse justify-between">
                            <Avatar>
                                <AvatarImage
                                    src={matchData.user_two?.avatar_url || ''}
                                    alt={
                                        matchData.user_two?.display_name ||
                                        'Name'
                                    }
                                ></AvatarImage>
                                <AvatarFallback>
                                    {getInitials(
                                        matchData.user_two?.display_name || ''
                                    )}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div>
                                    {matchData.user_two?.score.totalruns}/
                                    {matchData.user_two?.score.totalwickets}
                                </div>
                                <div className="text-primary text-sm">
                                    {convertBallsToOvers(
                                        matchData.user_two?.score.totalballs ||
                                            0
                                    )}{' '}
                                    overs
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`w-full text-center p-2 rounded-md ${
                        matchData.result === 'won'
                            ? 'bg-green-300'
                            : matchData.result === 'lost'
                            ? 'bg-red-300'
                            : matchData.result === 'draw'
                            ? 'bg-yellow-200'
                            : 'bg-gray-300'
                    }`}
                >
                    {`You ${matchData.result} ${
                        matchData.result_by === 'Draw'
                            ? ''
                            : matchData.result_by
                    }`}
                </div>
            </CardContent>
        </Card>
    )
}

export const MatchcardSkeleton = () => {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4 flex flex-col gap-4">
                {/* Top Section */}
                <div className="flex flex-row justify-between items-center gap-4">
                    {/* User One Skeleton */}
                    <div className="flex flex-col w-full">
                        <Skeleton className="w-3/4 h-5 mb-2" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="flex flex-col gap-1">
                                <Skeleton className="w-12 h-4" />
                                <Skeleton className="w-16 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Versus Icon */}
                    <Skeleton className="w-8 h-8 rounded-full" />

                    {/* User Two Skeleton */}
                    <div className="flex flex-col w-full items-end">
                        <Skeleton className="w-3/4 h-5 mb-2" />
                        <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col gap-1 items-end">
                                <Skeleton className="w-12 h-4" />
                                <Skeleton className="w-16 h-4" />
                            </div>
                            <Skeleton className="w-10 h-10 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Match Result */}
                <div className="w-full text-center">
                    <Skeleton className="w-2/3 h-5 mx-auto" />
                </div>
            </CardContent>
        </Card>
    )
}
