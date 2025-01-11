import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'

export const ShowTossCard = ({
    myId,
    tossWinner,
    tossChoice,
    setShowToss,
}: {
    myId: string
    tossWinner: string
    tossChoice: string
    setShowToss: (value: boolean) => void
}) => {
    const [showResult, setShowResult] = useState(false)
    const [countdown, setCountdown] = useState<number | null>(5)

    const message =
        tossWinner === myId
            ? `You won the toss! You elected to ${tossChoice} first.`
            : `Opponent won the toss and elected to ${tossChoice} first.`

    useEffect(() => {
        let resultTimeout: NodeJS.Timeout | null = null
        let countdownInterval: NodeJS.Timeout | null = null

        if (!showResult) {
            resultTimeout = setTimeout(() => {
                setShowResult(true)
            }, 5000) // Show result after 5 seconds
        }

        if (showResult && countdown !== null) {
            countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(countdownInterval!)
                        // Defer state update using setTimeout
                        setTimeout(() => setShowToss(false), 0) // Defer state update
                        return null
                    }
                    return prev - 1
                })
            }, 1000)
        }

        // Cleanup both timeouts
        return () => {
            if (resultTimeout) clearTimeout(resultTimeout)
            if (countdownInterval) clearInterval(countdownInterval)
        }
    }, [showResult, countdown, setShowToss])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent>
                <div className="flex flex-col gap-4 justify-center items-center pt-4">
                    {!showResult ? (
                        <>
                            <Image
                                src="/images/coin-toss.gif"
                                alt="coin toss"
                                width={100}
                                height={100}
                            />
                            <div>Auto-generating toss...</div>
                        </>
                    ) : (
                        <>
                            <div className="text-lg font-semibold text-center">
                                {message}
                            </div>
                            {countdown !== null && (
                                <div className="text-lg font-semibold text-center text-gray-500">
                                    Match starts in {countdown}...
                                </div>
                            )}
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
