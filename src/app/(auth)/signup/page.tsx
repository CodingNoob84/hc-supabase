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
import { signUpwithEmail } from '../_actions'

const signUpSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: 'Name must be at least 3 characters long' })
            .regex(
                /^[A-Za-z\s]+$/,
                'Name can only contain alphabets and spaces'
            ),
        email: z
            .string()
            .email({ message: 'Please enter a valid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const [loading, setLoading] = useState(false)
    const [generalError, setGeneralError] = useState('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormValues) => {
        setGeneralError('')
        setLoading(true)
        try {
            console.log('Sign up with:', data)
            const result = await signUpwithEmail(data)
            console.log(result?.result)
            if (result?.result == 'success') {
                setLoading(false)
                router.push('/login')
            } else if (result?.result == 'error') {
                setGeneralError(result.message)
                setLoading(false)
                setTimeout(() => {
                    setGeneralError('')
                }, 5000)
            }
            //router.push('/login')
        } catch (error) {
            console.log('error', error)
            setGeneralError('Failed to sign up. Please try again.')
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
                        Join the Game!
                    </h2>
                    <p className="text-muted-foreground text-center">
                        Create your account and start playing
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
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
                                placeholder="Create a password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        {generalError && (
                            <p className="text-red-500 text-center text-sm">
                                {generalError}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Sign Up'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-2">
                    <p className="text-xs text-gray-500">
                        By signing up, you agree to face the ultimate
                        finger-flicking challenge!
                    </p>
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
