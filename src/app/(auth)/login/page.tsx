import { Button } from '@/components/ui/button'
import { getSupabaseServer } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { logIn } from '../_actions'

export default async function LoginPage() {
    const supabase = await getSupabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    console.log('user', user)

    if (user) {
        redirect('/')
    }

    return (
        <form action={logIn}>
            <div>Logo</div>
            <Button>Login with Google</Button>
        </form>
    )
}
