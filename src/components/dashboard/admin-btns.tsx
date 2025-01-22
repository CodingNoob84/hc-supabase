import { userQuery } from '@/queries/queries'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { DividerWithText } from '../common/divider'
import { Button } from '../ui/button'

export const AdminBtns = () => {
    const supabase = getSupabaseBrowserClient()
    const { data } = useQuery({
        queryKey: userQuery.key,
        queryFn: () => userQuery.func({ supabase }),
    })
    console.log('dashboard', data)
    if (data && data.role == 'admin') {
        return (
            <>
                <DividerWithText text="Admin" />
                <Button className="w-full max-w-md mx-auto">
                    <Link href="/dashboard/allreviews">All reviews</Link>
                </Button>
            </>
        )
    }
    return null
}
