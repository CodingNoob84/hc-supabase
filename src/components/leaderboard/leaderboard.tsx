'use client'
import { getAllUsersMatchStats } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'

export const LeaderBoard = () => {
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
        <div className="flex flex-col gap-2 px-2">
            <div className="flex items-center justify-center text-center text-xl font-bold">
                Top 10 Players
            </div>
            <div className="flex flex-col gap-2 px-2">
                {data?.map((user, i) => (
                    <div
                        key={i}
                        className="flex flex-row justify-between items-center border rounded-md"
                    >
                        <div className="flex flex-row gap-2">
                            <div>{i + 1}</div>
                            <div>{user.display_name}</div>
                        </div>
                        <div>{user.winning_percentage}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
