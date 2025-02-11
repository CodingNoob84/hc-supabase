import { X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type Player = {
    id: number
    name: string
    avatar: string
    winPercentage: number
    matchesPlayed: number
    matchesWon: number
    matchesLost: number
}

type PlayerDetailsProps = {
    player: Player
    onClose: () => void
}

export function PlayerDetails({ player, onClose }: PlayerDetailsProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{player.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-center mb-6">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={player.avatar || ''}
                            alt={player.name || 'Anonymous'}
                        />
                        <AvatarFallback>
                            {player.name?.charAt(0) || 'A'}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="text-green-600">
                            {player.winPercentage}% win rate
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="font-semibold">Matches Played</div>
                        <div className="text-2xl">{player.matchesPlayed}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Matches Won</div>
                        <div className="text-2xl text-green-600">
                            {player.matchesWon}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold">Matches Lost</div>
                        <div className="text-2xl text-red-600">
                            {player.matchesLost}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
