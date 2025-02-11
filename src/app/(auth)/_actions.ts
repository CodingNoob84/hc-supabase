'use server'

import { getSupabaseServer } from '@/supabase/server'
import { redirect } from 'next/navigation'
import { LoginFormValues } from './login/page'
import { SignUpFormValues } from './signup/page'

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'https://localhost:3000/'

    console.log('url-geturl', url)
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
}

export const logInWithGoogle = async () => {
    const supabase = await getSupabaseServer()
    console.log('url-login', getURL())
    const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${getURL()}auth/callback`,
        },
    })
    console.log('data', data)
    if (data && data.url) {
        return redirect(data.url)
    }
}

export const signUpwithEmail = async (signupdata: SignUpFormValues) => {
    const supabase = await getSupabaseServer()
    try {
        // 🔹 Create a new user with email & password
        const { data, error } = await supabase.auth.signUp({
            email: signupdata.email,
            password: signupdata.password,
            options: {
                data: { full_name: signupdata.name }, // Store the user's name
            },
        })

        if (error) throw error

        console.log('✅ Signup successful:', data)

        return {
            result: 'success',
            message: 'User has been registered',
            data: data,
        }
    } catch (error) {
        console.error('❌ Signup error:', error)
        if (error == 'AuthApiError: User already registered')
            return {
                result: 'error',
                message: 'User already registered',
                data: null,
            }
    }
}

export const logInWithEmail = async (logindata: LoginFormValues) => {
    const supabase = await getSupabaseServer()
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: logindata.email,
            password: logindata.password,
        })

        if (error) throw error

        console.log('✅ Login successful:', data)
        return { result: 'success', message: 'login successful', data: data }
    } catch (error) {
        console.error('❌ Login error:', error)
        if (error == 'AuthApiError: Invalid login credentials')
            return {
                result: 'error',
                message: 'Invalid login credentials',
                data: null,
            }
    }
}

export const logOut = async () => {
    const supabase = await getSupabaseServer()
    await supabase.auth.signOut()
}
