import { getSupabaseServer } from '@/supabase/server'

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const supabase = await getSupabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    console.log('user', user)

    // if (user) {
    //     redirect('/')
    // }
    return <>{children}</>
}
