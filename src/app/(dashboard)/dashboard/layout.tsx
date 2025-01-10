import Header from '@/components/dashboard/header'
import { UserPresence } from '@/components/dashboard/user-presence'
import { userQuery } from '@/queries/queries'

import { getSupabaseServer } from '@/supabase/server'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = await getSupabaseServer()
    const queryClient = new QueryClient()
    const user = await queryClient.ensureQueryData({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })

    console.log('user', user)

    // if (!user) {
    //     redirect('/login')
    // }
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-screen min-h-screen md:max-w-3xl mx-auto">
                <Header />
                <UserPresence />
                {children}
            </div>
        </HydrationBoundary>
    )
}
