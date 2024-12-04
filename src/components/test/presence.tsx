'use client'

import useSupabaseBrowser from '@/supabase/client'
import { useEffect, useState } from 'react'

interface User {
    id: string
}

interface PresenceState {
    [id: string]: { user_id: string; online_at: string }[]
}

export default function ChatPresence({ user }: { user: User | null }) {
    const supabase = useSupabaseBrowser()
    const [onlineUsers, setOnlineUsers] = useState<number>(0)

    useEffect(() => {
        if (!user) return

        const channel = supabase.channel('global')

        channel
            .on('presence', { event: 'sync' }, () => {
                const data: PresenceState = channel.presenceState()
                console.log('data', data)

                const userIds: string[] = []

                for (const id in data) {
                    const userPresence = data[id]
                    if (userPresence && userPresence[0]?.user_id) {
                        userIds.push(userPresence[0].user_id)
                    }
                }

                console.log('users', userIds)
                setOnlineUsers([...new Set(userIds)].length)
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({
                        online_at: new Date().toISOString(),
                        user_id: user?.id,
                    })
                }
            })

        return () => {
            channel.unsubscribe()
        }
    }, [user, supabase])

    if (!user) {
        return <div></div>
    }

    return (
        <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm text-gray-400">{onlineUsers} onlines</h1>
        </div>
    )
}
