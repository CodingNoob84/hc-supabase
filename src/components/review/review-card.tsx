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
import { useState } from 'react'
import { StarRating } from './star-rating'

interface ReviewCardProps {
    userImage: string | null
    userName: string | null
    userEmail: string | null
}

export default function ReviewCard({
    userImage,
    userName,
    userEmail,
}: ReviewCardProps) {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ userName, userEmail, rating, review })
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
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
                            <p className="text-sm text-gray-500">
                                {userEmail || 'No email provided'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Rating
                        </label>
                        <StarRating
                            rating={rating}
                            onRatingChange={setRating}
                        />
                    </div>
                    <Textarea
                        placeholder="Write your review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="min-h-[100px]"
                    />
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                    Submit Review
                </Button>
            </CardFooter>
        </Card>
    )
}
