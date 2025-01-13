'use server'

import { getSupabaseServer } from '@/supabase/server'
import { redirect } from 'next/navigation'

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/'

    console.log('url-geturl', url)
    // Make sure to include `https://` when not localhost.
    url = url.startsWith('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.endsWith('/') ? url : `${url}/`
    return url
}

export const logIn = async () => {
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

export const logOut = async () => {
    const supabase = await getSupabaseServer()
    await supabase.auth.signOut()
}
