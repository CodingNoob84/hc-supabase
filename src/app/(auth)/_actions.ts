'use server'

import { getSupabaseServer } from '@/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const logIn = async () => {
    const origin = (await headers()).get('origin')
    //console.log("origin", origin);
    const supabase = await getSupabaseServer()
    const { data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })
    //console.log("data", data);
    if (data && data.url) {
        return redirect(data.url)
    }
}

export const logOut = async () => {
    const supabase = await getSupabaseServer()
    await supabase.auth.signOut()
}
