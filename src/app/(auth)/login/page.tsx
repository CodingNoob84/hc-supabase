'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Hand } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { logInWithEmail, logInWithGoogle } from '../_actions'

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [generalError, setGeneralError] = useState('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true)
        try {
            // TODO: Implement login logic here
            console.log('Login with:', data)
            const result = await logInWithEmail(data)
            if (result?.result == 'success') {
                setLoading(false)
                router.push('/')
            } else if (result?.result == 'error') {
                setLoading(false)
                setGeneralError(result.message)
            }
        } catch (error) {
            console.log('error', error)
            setGeneralError('Failed to log in. Please try again.')
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="flex flex-row items-center space-x-2 mb-4">
                        <Hand className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-center text-blue-700">
                            Hand Cricket
                        </h1>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-green-600">
                        Welcome Back, Champ!
                    </h2>
                    <p className="text-muted-foreground text-center">
                        Ready to bat and bowl with some digits?
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {generalError && (
                            <p className="text-red-500 text-sm">
                                {generalError}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Log In'}
                        </Button>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => logInWithGoogle()}
                    >
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
                <CardFooter className="flex flex-col items-center space-y-2">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to face the ultimate
                        finger-flicking challenge!
                    </p>
                    <p className="text-sm">
                        Don&apos;t have an account?
                        <Link
                            href="/signup"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
