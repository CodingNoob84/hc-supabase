'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
    getReviewByUserId,
    updateReview,
    UpdateReviewTypes,
} from '@/queries/reviews'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ReviewedCardSkeleton } from './review-skeleton'
import { ReviewedCard } from './reviewed-card'
import { StarRating } from './star-rating'

interface ReviewCardProps {
    userId: string
    userImage: string | null
    userName: string | null
    userEmail: string | null
}

export default function ReviewCard({
    userId,
    userImage,
    userName,
    userEmail,
}: ReviewCardProps) {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['userreview', userId],
        queryFn: () => getReviewByUserId({ userId, supabase }),
        enabled: !!userId,
    })

    useEffect(() => {
        if (data) {
            setRating(data.rating ?? 0)
            setReview(data.description ?? '')
        }
    }, [data])

    const handleReviewMutation = useMutation({
        mutationFn: (data: UpdateReviewTypes) =>
            updateReview({ data, supabase }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userreview', userId] })
            setIsEditing(false)
        },
        onError: (error) => {
            console.error('Error submitting review', error)
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleReviewMutation.mutate({ userId, rating, description: review })
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setRating(data?.rating ?? 0)
        setReview(data?.description ?? '')
    }

    if (isLoading) {
        return <ReviewedCardSkeleton />
    }

    if (data && !isEditing) {
        return (
            <ReviewedCard
                userImage={userImage}
                userName={userName}
                userEmail={userEmail}
                rating={data.rating ?? 0}
                review={data.description ?? ''}
                onEdit={handleEdit}
            />
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {data ? 'Edit Your Review' : 'Leave a Review'}
                </CardTitle>
                <CardDescription>We appreciate your feedback!</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={userImage ?? ''}
                                alt={userName || 'User'}
                            />
                            <AvatarFallback>
                                {userName
                                    ? userName.charAt(0).toUpperCase()
                                    : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <p className="font-medium">
                                {userName || 'Anonymous User'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {userEmail || 'No email provided'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Your Rating
                        </label>
                        <StarRating
                            rating={rating}
                            onRatingChange={setRating}
                        />
                        <p className="mt-1 text-sm text-muted-foreground">
                            Current rating: {rating.toFixed(1)}
                        </p>
                    </div>
                    <Textarea
                        id="review"
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="min-h-[100px]"
                    />
                </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                {data && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={handleReviewMutation.isPending}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={handleReviewMutation.isPending}
                >
                    {data ? 'Update Review' : 'Submit Review'}
                </Button>
            </CardFooter>
        </Card>
    )
}
