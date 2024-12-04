import { Button } from '@/components/ui/button'
import { getSupabaseServer } from '@/supabase/server'
import Link from 'next/link'

export default async function Header() {
    const supabase = await getSupabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gray-900"
                        >
                            Hand Cricket
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <Button asChild>
                                <Link href="/dashboard">Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
