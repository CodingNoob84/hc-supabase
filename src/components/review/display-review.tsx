import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StarDisplay } from './star-display'

interface DisplayReviewCardProps {
    id: number
    user_id: string | null
    rating: number | null
    description: string | null
    users: {
        email: string | null
        avatar_url: string | null
        display_name: string | null
    } | null
    updated_at: string | null
}

export function DisplayReviewCard({
    userreview,
}: {
    userreview: DisplayReviewCardProps
}) {
    return (
        <>
            {userreview.users && (
                <Card className="w-full max-w-2xl mx-auto">
                    <CardHeader className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <AvatarImage
                                    src={userreview.users.avatar_url ?? ''}
                                    alt={
                                        userreview.users.display_name || 'User'
                                    }
                                />
                                <AvatarFallback>
                                    {userreview.users.display_name
                                        ? userreview.users.display_name
                                              .charAt(0)
                                              .toUpperCase()
                                        : 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-xl">
                                    {userreview.users.display_name ||
                                        'Anonymous User'}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {userreview.users.email ||
                                        'No email provided'}
                                </p>
                            </div>
                        </div>
                        <StarDisplay rating={userreview.rating || 0} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {userreview.description}
                        </p>
                    </CardContent>
                </Card>
            )}
        </>
    )
}
