import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingProps {
    rating: number
    onRatingChange: (rating: number) => void
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
    const [hover, setHover] = useState(0)

    const handleMouseMove = (
        e: React.MouseEvent<SVGSVGElement>,
        star: number
    ) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - left) / width
        setHover(star - 0.5 + (percent > 0.5 ? 0.5 : 0))
    }

    const handleClick = (star: number, e: React.MouseEvent<SVGSVGElement>) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const percent = (e.clientX - left) / width
        onRatingChange(star - 0.5 + (percent > 0.5 ? 0.5 : 0))
    }

    return (
        <div
            className="flex items-center"
            role="group"
            aria-label="Rate your experience"
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                        star <= (hover || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : star - 0.5 <= (hover || rating)
                            ? 'text-yellow-400 fill-yellow-400 half-star'
                            : 'text-gray-300'
                    }`}
                    onClick={(e) => handleClick(star, e)}
                    onMouseMove={(e) => handleMouseMove(e, star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={
                        star - 0.5 <= (hover || rating) &&
                        star > (hover || rating)
                            ? {
                                  clipPath: 'inset(0 50% 0 0)',
                              }
                            : {}
                    }
                />
            ))}
        </div>
    )
}
