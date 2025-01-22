import { DisplayReviewCard } from '@/components/review/display-review'
import { getAllReviews } from '@/queries/reviews'
import { getSupabaseServer } from '@/supabase/server'

export default async function AllReviewsPage() {
    const supabase = await getSupabaseServer()
    const allReviews = await getAllReviews({ supabase })
    console.log('allreviews', allReviews)
    return (
        <div className="flex flex-col gap-2">
            {allReviews?.map((review, i) => (
                <DisplayReviewCard key={i} userreview={review} />
            ))}
        </div>
    )
}
