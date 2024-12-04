import { TeamCard } from '@/components/dashboard/team-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Dashboard() {
    return (
        <div className="container flex flex-col gap-4 mx-auto px-4 py-8">
            <TeamCard />
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/botgame">Play with Bot</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/usersgame">Play with Friends</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/matchhistory">My Match History</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto">
                <Link href="/dashboard/review">Give us Review</Link>
            </Button>
            {/* <ChatPresence user={user} /> */}
        </div>
    )
}
