import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { getSupabaseServer } from '@/supabase/server'
import { Hand } from 'lucide-react'
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
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-blue-100">
            <form className="w-full max-w-md" action={logIn}>
                <Card className="w-full shadow-lg">
                    <CardHeader className="space-y-1 flex flex-col items-center">
                        <div className="flex flex-row items-center space-x-2 mb-4">
                            <Hand className="h-8 w-8 text-blue-600" />
                            <h1 className="text-3xl font-bold text-center text-blue-700">
                                Hand Cricket
                            </h1>
                        </div>

                        <h2 className="text-xl font-semibold text-center text-green-600">
                            Welcome, Champ!
                        </h2>
                        <p className="text-muted-foreground text-center">
                            {` Ready to bat and bowl with some digits?`}
                        </p>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <p className="text-center text-sm text-gray-600 max-w-xs">
                            {` Step up to the pitch of numbers! In Hand Cricket,
                            your fingers are the bat and ball. Score big, bowl
                            smart, and become the ultimate digit master. It's
                            not just a game, it's a hand-to-hand statistical
                            showdown!`}
                        </p>
                        <Button variant="outline" className="w-full max-w-xs">
                            <svg
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                ></path>
                            </svg>
                            Sign in with Google
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-xs text-gray-500">
                            {`By signing in, you agree to face the ultimate
                            finger-flicking challenge!`}
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
