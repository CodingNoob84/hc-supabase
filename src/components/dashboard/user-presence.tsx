'use client'

export const UserPresence = () => {
    // const supabase = getSupabaseBrowserClient()
    // const { data: user } = useQuery({
    //     queryKey: userQuery.key,
    //     queryFn: () => userQuery.func({ supabase }),
    // })

    // const userPresenceChannnel = supabase.channel('user_presence_channel')

    // userPresenceChannnel
    //     // .on('presence', { event: 'sync' }, () => {
    //     //     const newState = roomOne.presenceState()
    //     //     console.log('sync', newState)
    //     // })

    //     .subscribe(async (status) => {
    //         if (status !== 'SUBSCRIBED') {
    //             return
    //         }
    //         if (user) {
    //             const userStatus = {
    //                 userid: user.id,
    //                 last_seen: new Date().toISOString(),
    //             }
    //             const presenceTrackStatus = await userPresenceChannnel.track(
    //                 userStatus
    //             )
    //             console.log(presenceTrackStatus)
    //         }
    //     })

    return null
}
