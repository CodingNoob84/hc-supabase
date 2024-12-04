import { Button } from '@/components/ui/button'
import { getSupabaseServer } from '@/supabase/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function Hero() {
    const supabase = await getSupabaseServer()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Play Hand Cricket Online
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                        Experience the thrill of hand cricket in a digital
                        format. Challenge your friends or play against AI in
                        this exciting game of strategy and luck.
                    </p>
                    <div className="mt-10">
                        <Button size="lg" asChild>
                            <Link href={`${user ? '/dashboard' : '/login'}`}>
                                Start Playing Now
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:w-1/2 relative">
                    <div className="relative w-[400px] h-[400px] mx-auto">
                        <Image
                            src="/images/hero-image.png"
                            alt="Hand Cricket Illustration"
                            width={400}
                            height={400}
                            priority
                            className="rounded-lg shadow-lg"
                        />
                        {/* Add a blur overlay for the edges */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-transparent to-gray-100 filter blur-3xl pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
