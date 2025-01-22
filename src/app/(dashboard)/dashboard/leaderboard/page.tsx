import { LeaderBoard } from '@/components/leaderboard/leaderboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LeaderBoardPage() {
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 py-2">
            <div className="flex flex-start">
                <Button variant={'outline'} asChild>
                    <Link href="/dashboard">Back</Link>
                </Button>
            </div>

            <LeaderBoard />
        </div>
    )
}
