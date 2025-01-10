import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export const Waiting = ({ handelReject }: { handelReject: () => void }) => {
    const [countdown, setCountdown] = useState(10) // Start countdown from 10 seconds

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)

            // Cleanup the timer when component unmounts or countdown reaches 0
            return () => clearInterval(timer)
        } else {
            handelReject()
            console.log('Countdown reached 0') // Log when countdown reaches 0
        }
    }, [countdown]) // Effect depends on `countdown`

    return (
        <>
            <Button
                variant="ghost"
                className="flex-1 rounded-none py-2 border-l bg-blue-100 hover:bg-blue-200"
                disabled
                aria-label="Waiting for response"
            >
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                {countdown > 0 ? `Waiting... ${countdown}s` : 'Timeout'}
            </Button>
        </>
    )
}
