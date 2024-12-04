import { getSupabaseServer } from '@/supabase/server'
import { redirect } from 'next/navigation'

export default async function WebLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = await getSupabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
    return <>{children}</>
}
