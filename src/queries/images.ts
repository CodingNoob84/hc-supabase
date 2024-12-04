import { TypedSupabaseClient } from "@/supabase/types";

export const getImageUrl=(filename:string, supabase:TypedSupabaseClient)=>{
    const { data } = supabase
    .storage
    .from('publicimages')
    .getPublicUrl(`${filename}`)

    return data
  
}