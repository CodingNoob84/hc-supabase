'use client'

import { upsertReqStatus } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import {
    AcceptRejectbtn,
    Cancelbtn,
    ContinuePlayingBtn,
    PlayRequestBtn,
    ToPlayBtn,
    WaitingBtn,
} from './req-status-btns'
import { FriendWithCountdown } from './users-list'

export const UserReqCard = ({
    myId,
    user,
}: {
    myId: string
    user: FriendWithCountdown
}) => {
    const supabase = getSupabaseBrowserClient()
    const mutation = useMutation({
        mutationFn: ({
            friendid,
            reqstatus,
            gamemode,
        }: {
            friendid: string
            reqstatus: string
            gamemode: string
        }) => upsertReqStatus(supabase, myId, friendid, reqstatus, gamemode),
        onSuccess: (data) => {
            console.log('Request status updated successfully:', data)
        },
        onError: (error) => {
            console.error('Error updating request status:', error.message)
        },
    })

    const handlePlay = (id: string, gamemode: string) => {
        console.log('Game started!')
        mutation.mutate({
            friendid: id,
            reqstatus: 'play',
            gamemode: gamemode,
        }) // Mark as playing
    }

    const sendPlayRequest = async (id: string, gamemode: string) => {
        mutation.mutate({ friendid: id, reqstatus: 'requested', gamemode })
    }

    const cancelPlayRequest = async (id: string) => {
        mutation.mutate({ friendid: id, reqstatus: 'cancel', gamemode: '' })
    }

    const acceptPlayRequest = async (id: string) => {
        mutation.mutate({ friendid: id, reqstatus: 'accepted', gamemode: '' })
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="flex items-center p-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage
                            src={user.avatar_url || '/placeholder.svg'}
                            alt={user.display_name || 'Anonymous'}
                        />
                        <AvatarFallback>
                            {user.display_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                                {user.display_name}
                            </h3>
                            <Badge
                                className={
                                    user.presence_status === 'online'
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                }
                            >
                                {user.presence_status === 'online'
                                    ? 'Online'
                                    : 'Offline'}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {user.teamname || 'No Team'}
                        </p>
                    </div>
                </div>
                <div className="flex border-t">
                    {user.req_status === 'none' && (
                        <PlayRequestBtn
                            userId={user.user_id}
                            handlePlayRequest={sendPlayRequest}
                        />
                    )}
                    {user.req_status === 'sent' && (
                        <Cancelbtn
                            userId={user.user_id}
                            gamemode={user.gamemode}
                            handleCancel={cancelPlayRequest}
                        />
                    )}
                    {user.req_status === 'received' && (
                        <AcceptRejectbtn
                            userId={user.user_id}
                            gamemode={user.gamemode}
                            handleAccept={acceptPlayRequest}
                            handleReject={cancelPlayRequest}
                        />
                    )}
                    {user.req_status === 'accepted' && (
                        <ToPlayBtn
                            userId={user.user_id}
                            gamemode={user.gamemode}
                            handlePlay={handlePlay}
                        />
                    )}
                    {user.req_status === 'continue' && (
                        <WaitingBtn
                            userId={user.user_id}
                            gamemode={user.gamemode}
                            handleCancel={cancelPlayRequest}
                        />
                    )}
                    {/* {user.req_status === 'play' && <PlayingBtn />} */}
                    {user.req_status === 'play' && user.matchid && (
                        <ContinuePlayingBtn matchId={user.matchid} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
