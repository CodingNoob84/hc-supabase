import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { StarDisplay } from './star-display'

interface ReviewedCardProps {
    userImage: string | null
    userName: string | null
    userEmail: string | null
    rating: number
    review: string
    onEdit: () => void
}

export function ReviewedCard({
    userImage,
    userName,
    userEmail,
    rating,
    review,
    onEdit,
}: ReviewedCardProps) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage
                            src={userImage ?? ''}
                            alt={userName || 'User'}
                        />
                        <AvatarFallback>
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-xl">
                            {userName || 'Anonymous User'}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            {userEmail || 'No email provided'}
                        </p>
                    </div>
                </div>
                <StarDisplay rating={rating} />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {review}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline" onClick={onEdit} className="w-full">
                    Edit Review
                </Button>
            </CardFooter>
        </Card>
    )
}
