import { Button } from '@/components/ui/button'
import { Users } from '@/components/usersgame/users'
import Link from 'next/link'

export default function UsersGamePage() {
    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 py-2">
            <div className="flex flex-start">
                <Button variant={'outline'} asChild>
                    <Link href="/dashboard">Back</Link>
                </Button>
            </div>
            {/* <UnderDevelopment /> */}
            <div className="px-2">
                <Users />
                {/* <FriendsList /> */}
            </div>
        </div>
    )
}
