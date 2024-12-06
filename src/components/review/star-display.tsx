import { Star } from 'lucide-react'

interface StarDisplayProps {
    rating: number
}

export function StarDisplay({ rating }: StarDisplayProps) {
    return (
        <div
            className="flex items-center"
            aria-label={`Rating: ${rating} out of 5 stars`}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-5 h-5 ${
                        star <= rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : star - 0.5 <= rating
                            ? 'text-yellow-400 fill-yellow-400 half-star'
                            : 'text-gray-300'
                    }`}
                    style={
                        star - 0.5 <= rating && star > rating
                            ? {
                                  clipPath: 'inset(0 50% 0 0)',
                              }
                            : {}
                    }
                />
            ))}
            <span className="ml-2 text-sm font-medium">
                {rating.toFixed(1)}
            </span>
        </div>
    )
}
