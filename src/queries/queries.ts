import { TypedSupabaseClient } from '@/supabase/types'
import { getBot, getUser } from './user-team'

export const userQuery = {
    key: ['user'],
    func: ({ supabase }: { supabase: TypedSupabaseClient }) =>
        getUser({ supabase }),
}

export const botQuery = {
    key: ['bot'],
    func: ({ supabase }: { supabase: TypedSupabaseClient }) =>
        getBot({ supabase }),
}
