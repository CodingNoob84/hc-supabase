'use client'
import AnnouncementCard from '@/components/common/announcements'
import Notifications from '@/components/common/notifications'
import { AdminBtns } from '@/components/dashboard/admin-btns'
import { UserStatsCard } from '@/components/dashboard/user-stats-card'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
    return (
        <div className="container flex flex-col gap-4 mx-auto px-4 py-8">
            <Notifications />
            <AnnouncementCard />
            <UserStatsCard />
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/botgame">Play with Bot</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link
                    href="/dashboard/usersgame"
                    className="flex items-center justify-center"
                >
                    <span className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        Play with Friends
                    </span>
                </Link>
            </Button>
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/matchhistory">My Match History</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto" asChild>
                <Link href="/dashboard/leaderboard">LeaderBoard</Link>
            </Button>
            <Button className="w-full max-w-md mx-auto">
                <Link href="/dashboard/review">Give us Review</Link>
            </Button>
            <AdminBtns />
        </div>
    )
}
