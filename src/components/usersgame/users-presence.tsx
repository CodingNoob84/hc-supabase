import { getSupabaseBrowserClient } from '@/supabase/client'
import { useEffect } from 'react'
import { FriendWithCountdown } from './users-list'

export const UpdateUserPresence = ({
    myId,
    setFriends,
}: {
    myId: string
    setFriends: React.Dispatch<React.SetStateAction<FriendWithCountdown[]>>
}) => {
    const supabase = getSupabaseBrowserClient()
    useEffect(() => {
        const userPresenceChannel = supabase.channel('user_presence', {
            config: {
                presence: {
                    key: 'users',
                },
            },
        })

        // Sync presence state
        const syncPresenceState = () => {
            const presenceState = userPresenceChannel.presenceState()
            const onlineUserIds = new Set<string>()
            console.log('presences -state', presenceState)
            // Extract user IDs from the presence state
            for (const id in presenceState) {
                const presences = presenceState[id] as Array<{
                    userid: string
                    presence_ref: string
                }>

                presences.forEach((presence) => {
                    onlineUserIds.add(presence.userid)
                })
            }

            // Update friends' presence status
            setFriends((prevFriends) =>
                prevFriends.map((friend) =>
                    onlineUserIds.has(friend.user_id)
                        ? { ...friend, presence_status: 'online' }
                        : { ...friend, presence_status: 'offline' }
                )
            )
        }

        userPresenceChannel
            .on('presence', { event: 'sync' }, syncPresenceState)
            .on('presence', { event: 'join' }, ({ key, newPresences }) => {
                console.log('User joined:', key, newPresences)
                syncPresenceState()
            })
            .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
                console.log('User left:', key, leftPresences)
                syncPresenceState()
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Presence channel subscribed')
                }

                if (myId) {
                    const userStatus = {
                        userid: myId,
                        last_seen: new Date().toISOString(),
                    }
                    await userPresenceChannel.track(userStatus)
                }
            })

        // Cleanup: Unsubscribe from the channel
        return () => {
            userPresenceChannel.unsubscribe()
        }
    }, [myId])
    return null
}
