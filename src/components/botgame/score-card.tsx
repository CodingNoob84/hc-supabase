import { MatchData } from '@/queries/matches'
import { AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { TeamInfo } from './game-layout'

interface TeamCardProps {
    team: TeamInfo
    isReverse?: boolean
    isBatting: boolean
}

export const convertBallsToOvers = (balls: number) => {
    const overs = Math.floor(balls / 6) // Calculate complete overs
    const remainingBalls = balls % 6 // Calculate remaining balls

    return `${overs}.${remainingBalls}`
}

export const BottomContent = () => {
    return <div className="flex flex-row justify-between text-xs">content</div>
}

const TeamCard = ({ team, isReverse, isBatting }: TeamCardProps) => (
    <div
        className={`flex flex-col items-start space-y-2 ${
            isReverse ? 'items-end' : ''
        }`}
    >
        {/* Team Info */}
        <div
            className={`flex flex-col ${
                isReverse ? 'items-end' : 'items-start'
            } `}
        >
            <div className="font-semibold text-sm">{team.display_name}</div>
            <div
                className={`text-sm text-gray-600 flex flex-row gap-1 ${
                    isReverse ? 'flex-row-reverse' : ''
                }`}
            >
                {team.teamname}
                {isBatting ? (
                    <Image
                        src="/images/cricket-bat.png"
                        alt="Bat"
                        width="20"
                        height="10"
                    />
                ) : (
                    <Image
                        src="/images/cricket-ball.png"
                        alt="Bat"
                        width="20"
                        height="10"
                    />
                )}
            </div>
        </div>

        {/* Team Score */}
        <div
            className={`flex flex-row ${
                isReverse ? 'flex-row-reverse' : ''
            } items-center space-x-2`}
        >
            <Avatar className="w-12 h-12 border-2 border-primary">
                <AvatarImage src={team.avatar_url} alt={team.display_name} />
                <AvatarFallback>{team.display_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col px-2">
                <div className="font-bold">
                    {team.runs}/{team.wickets}
                </div>
                <div className="text-xs font-light text-gray-600/60">
                    Overs {convertBallsToOvers(team.balls)}
                </div>
            </div>
            <div></div>
        </div>
    </div>
)

export const ScoreCard = ({ data }: { data: MatchData }) => {
    //console.log('data', data)
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex flex-row justify-between text-xs">
                    <Badge variant="outline" className="text-xs">
                        MaxOvers: {data.max_overs}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {data.innings == 1 ? '1st' : '2nd'} innings
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        MaxWickets: {data.max_wickets}
                    </Badge>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <TeamCard
                        team={data.opp_team}
                        isBatting={data.batting_id === data.opp_team.id}
                    />
                    <div className="flex flex-col items-center space-y-2">
                        {data.is_timer && (
                            <Badge
                                variant="destructive"
                                className="text-xs font-normal"
                            >
                                00.00
                            </Badge>
                        )}

                        <Badge>vs</Badge>
                    </div>
                    <TeamCard
                        team={data.my_team}
                        isReverse
                        isBatting={data.batting_id === data.my_team.id}
                    />
                </div>
                <BottomContent />
            </CardContent>
        </Card>
    )
}
