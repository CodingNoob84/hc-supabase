'use client'

import {
    GameMode,
    RequsetStatusType,
    UserWithRequest,
} from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserReqCard } from './user-req-card'
import { UpdateUserPresence } from './users-presence'

export interface FriendWithCountdown extends UserWithRequest {
    countdown?: number
}

export interface UserRequestTable {
    id: string
    senderid: string
    receiverid: string
    status_req: RequsetStatusType
    gamemode: GameMode
    matchid: string
}

export default function FriendsList({
    myId,
    initialUsers,
}: {
    myId: string
    initialUsers: FriendWithCountdown[]
}) {
    const [friends, setFriends] = useState(initialUsers)
    const supabase = getSupabaseBrowserClient()
    const router = useRouter()

    useEffect(() => {
        const subscription = supabase
            .channel('user_request_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'userrequest' },
                (payload) => {
                    console.log('Realtime payload:', payload)

                    switch (payload.eventType) {
                        case 'INSERT':
                            handleInsertEvent(payload.new! as UserRequestTable)
                            break
                        case 'UPDATE':
                            handleUpdateEvent(payload.new! as UserRequestTable)
                            break

                        default:
                    }
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    const handleInsertEvent = (newRecord: UserRequestTable) => {
        if (!newRecord) return

        let reqStatus: RequsetStatusType

        if (newRecord.status_req === 'requested') {
            if (newRecord.senderid === myId) {
                reqStatus = 'sent'
            } else if (newRecord.receiverid === myId) {
                reqStatus = 'received'
            }
        }

        setFriends((prevFriends) =>
            prevFriends.map((friend) =>
                friend.user_id === newRecord.senderid ||
                friend.user_id === newRecord.receiverid
                    ? {
                          ...friend,
                          req_id: newRecord.id,
                          req_status: reqStatus,
                          gamemode: newRecord.gamemode,
                      }
                    : friend
            )
        )
    }

    const handleUpdateEvent = (updatedRecord: UserRequestTable) => {
        if (!updatedRecord || !updatedRecord.id) {
            console.warn('Invalid updated record:', updatedRecord)
            return
        }

        // Check if navigation is required
        let shouldNavigate = false
        let matchIdToNavigate: string | null = null
        let reqStatus: RequsetStatusType
        setFriends((prevFriends) =>
            prevFriends.map((friend) => {
                if (friend.req_id === updatedRecord.id) {
                    if (updatedRecord.status_req === 'requested') {
                        if (updatedRecord.senderid === myId) {
                            reqStatus = 'sent'
                        } else if (updatedRecord.receiverid === myId) {
                            reqStatus = 'received'
                        }
                        return {
                            ...friend,
                            req_status: reqStatus,
                            gamemode: updatedRecord.gamemode,
                        }
                    } else if (updatedRecord.status_req === 'accepted') {
                        if (updatedRecord.senderid === myId) {
                            reqStatus = 'continue'
                        } else if (updatedRecord.receiverid === myId) {
                            reqStatus = 'accepted'
                        }
                        return {
                            ...friend,
                            req_status: reqStatus,
                            gamemode: updatedRecord.gamemode,
                        }
                    } else if (updatedRecord.status_req === 'play') {
                        if (updatedRecord.matchid) {
                            shouldNavigate = true
                            matchIdToNavigate = updatedRecord.matchid
                        } else {
                            console.error(
                                'Match ID is missing in updated record:',
                                updatedRecord
                            )
                        }
                    } else {
                        return {
                            ...friend,
                            req_status: updatedRecord.status_req,
                            gamemode: updatedRecord.gamemode,
                        }
                    }
                }
                return friend
            })
        )

        // Perform navigation if necessary
        if (shouldNavigate && matchIdToNavigate) {
            navigateToMatch(matchIdToNavigate)
        }
    }

    const navigateToMatch = (matchId: string) => {
        // Use a `setTimeout` or defer this logic to the next render cycle
        setTimeout(() => {
            router.push(`/dashboard/usersgame/${matchId}`)
        }, 0)
    }
    const sortedFriends = [...friends].sort((a, b) => {
        const aPriority =
            (a.presence_status === 'online' ? 2 : 0) +
            (a.req_status != 'none' ? 1 : 0)
        const bPriority =
            (b.presence_status === 'online' ? 2 : 0) +
            (b.req_status != 'none' ? 1 : 0)

        // Sort by combined priority (higher priority first)
        return bPriority - aPriority
    })

    //console.log('friends', sortedFriends)

    return (
        <>
            <UpdateUserPresence myId={myId} setFriends={setFriends} />
            <div className="w-full max-w-md mx-auto space-y-4">
                <h2 className="text-2xl font-bold mb-4">Friends List</h2>
                {sortedFriends.map((_user) => (
                    <UserReqCard key={_user.user_id} myId={myId} user={_user} />
                ))}
            </div>
        </>
    )
}
