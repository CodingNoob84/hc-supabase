import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface TeamOwner {
    name: string
    country: string
    avatarUrl?: string
}

interface TeamOwnersCardProps {
    owner1?: TeamOwner
    owner2?: TeamOwner
}

export default function TeamOwnersCard({
    owner1,
    owner2,
}: TeamOwnersCardProps) {
    if (!owner1 && !owner2) {
        return (
            <Card className="w-full max-w-md mx-auto p-4">
                No team owners data available
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4  flex flex-row justify-between items-center">
                {/* Opponent Team: Top and Bottom */}
                <div className="flex flex-col items-start space-y-2">
                    {/* Opponent Team Info */}
                    <div className="flex flex-col">
                        <div className="font-semibold">Ownername 1</div>
                        <div className="text-sm text-gray-600">Team Name 1</div>
                    </div>

                    {/* Opponent Team Score */}
                    <div className="flex flex-row items-center space-x-2">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback>TT</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="font-bold">12-3</div>
                            <div className="text-xs font-light text-gray-600/60">
                                Overs 5.3
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Badges */}
                <div className="flex flex-col items-center space-y-2">
                    <Badge>1st</Badge>
                    <Badge>vs</Badge>
                </div>

                {/* My Team: Top and Bottom */}
                <div className="flex flex-col items-start space-y-2">
                    {/* Opponent Team Info */}
                    <div className="flex flex-col">
                        <div className="font-semibold">Ownername 1</div>
                        <div className="text-sm text-gray-600">Team Name 1</div>
                    </div>

                    {/* Opponent Team Score */}
                    <div className="flex flex-row-reverse items-center space-x-2">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback>TT</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <div className="font-bold">12-3</div>
                            <div className="text-xs font-light text-gray-600/60">
                                Overs 5.3
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface TeamOwner {
    name: string
    country: string
    runs: number
    wickets: number
    overs: string
    avatarUrl?: string
}

// Example usage
export function TeamOwnersCardExample() {
    const owner1 = {
        name: 'Team owner 1',
        country: 'IND',
        runs: 12,
        wickets: 3,
        overs: (24 / 6).toFixed(1),
        avatarUrl: '',
    }

    const owner2 = {
        name: 'Team owner 2',
        country: 'AUS',
        runs: 18,
        wickets: 2,
        overs: (28 / 6).toFixed(1),
        avatarUrl: '',
    }

    return <TeamOwnersCard owner1={owner1} owner2={owner2} />
}
