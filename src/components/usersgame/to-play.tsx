import { PlayCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export const ToPlay = ({ handlePlay }: { handlePlay: () => void }) => {
    const [countdown, setCountdown] = useState(10) // Start countdown from 10 seconds

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)

            // Cleanup the timer when component unmounts or countdown reaches 0
            return () => clearInterval(timer)
        } else {
        }
    }, [countdown]) // Effect depends on `countdown`
    return (
        <Button
            variant="ghost"
            className="flex-1 rounded-none py-2 border-l bg-green-100 hover:bg-green-200"
            onClick={handlePlay}
            aria-label="Play Game"
        >
            <PlayCircle className="w-5 h-5 mr-2 text-blue-500" />
            Click to play... {countdown}s
        </Button>
    )
}
