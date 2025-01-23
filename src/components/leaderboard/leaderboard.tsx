'use client'
import { capitalizeEachWord, getInitials } from '@/lib/utils'
import { getAllUsersMatchStats } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { Trophy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const LeaderBoard = () => {
    // const [selectedPlayer, setSelectedPlayer] = useState(null)
    const supabase = getSupabaseBrowserClient()
    const { data, isLoading } = useQuery({
        queryKey: ['top10'],
        queryFn: () => getAllUsersMatchStats(supabase, 10, 5),
    })
    console.log('data', data)
    if (isLoading) {
        return <div>Loading</div>
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-center mb-4">
                Top10 Players
            </h1>
            <p className="flex flex-row-reverse italic text-sm text-primary/50  px-2">
                * players must have played a minimum of five matches
            </p>
            <div className="mx-auto bg-white/10 rounded-lg overflow-hidden shadow-xl">
                {data &&
                    data.map((player, index) => (
                        <div
                            key={player.user_id}
                            className={`flex items-center p-4 border-b border-white/20 cursor-pointer hover:bg-white/20 transition-colors ${
                                index < 3 ? 'relative overflow-hidden' : ''
                            }`}
                            // onClick={() => setSelectedPlayer(player)}
                        >
                            {index < 3 && (
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-700 opacity-20" />
                            )}
                            <div className="w-8 font-bold">{index + 1}</div>
                            <Avatar>
                                <AvatarImage
                                    src={player.avatar_url || ''}
                                    alt={player.display_name || 'Name'}
                                ></AvatarImage>
                                <AvatarFallback>
                                    {getInitials(player.display_name || '')}
                                </AvatarFallback>
                            </Avatar>

                            <div className="ml-2 flex-grow">
                                <h2 className="font-semibold">
                                    {capitalizeEachWord(player.display_name)}
                                </h2>
                                <div className="w-full bg-white/30 h-2 rounded-full mt-1">
                                    <div
                                        className="bg-green-500 h-full rounded-full"
                                        style={{
                                            width: `${player.winning_percentage}%`,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-24 text-right">
                                <div className="font-semibold">
                                    {player.winning_percentage}%
                                </div>
                            </div>
                            {index < 3 && (
                                <Trophy className="w-6 h-6 ml-4 text-yellow-400" />
                            )}
                        </div>
                    ))}
            </div>
            {/* {selectedPlayer && <PlayerDetails player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />} */}
        </div>
    )
}
