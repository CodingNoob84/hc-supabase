import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ReviewedCardSkeleton() {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-3 w-[150px]" />
                    </div>
                </div>
                <div className="flex items-center">
                    <Skeleton className="h-5 w-[120px]" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-[90%] mb-2" />
                <Skeleton className="h-4 w-[95%]" />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Skeleton className="h-10 w-[100px]" />
            </CardFooter>
        </Card>
    )
}
