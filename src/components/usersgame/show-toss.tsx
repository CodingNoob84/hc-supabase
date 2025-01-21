import { updateMatchStarted } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'

export const ShowTossCard = ({
    matchId,
    myId,
    tossWinner,
    tossChoice,
    setShowToss,
}: {
    matchId: string
    myId: string
    tossWinner: string
    tossChoice: string
    setShowToss: (value: boolean) => void
}) => {
    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()
    const [showResult, setShowResult] = useState(false)
    const [countdown, setCountdown] = useState<number>(5)

    const message =
        tossWinner === myId
            ? `You won the toss! You elected to ${tossChoice} first.`
            : `Opponent won the toss and elected to ${tossChoice} first.`

    const updateMatchStartedMutation = useMutation({
        mutationFn: (matchId: string) => updateMatchStarted(matchId, supabase),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['match', matchId] })
            console.log('Match started updated successfully:', data)
        },
        onError: (error) => {
            console.error('Failed to update match started status:', error)
        },
    })

    useEffect(() => {
        let resultTimeout: NodeJS.Timeout | null = null
        let countdownInterval: NodeJS.Timeout | null = null

        if (!showResult) {
            resultTimeout = setTimeout(() => {
                setShowResult(true)
            }, 5000) // Show toss result after 5 seconds
        }

        if (showResult && countdown > 0) {
            countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval!)
                        // Trigger match start and hide toss card
                        updateMatchStartedMutation.mutate(matchId)
                        setShowToss(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        // Cleanup on unmount
        return () => {
            if (resultTimeout) clearTimeout(resultTimeout)
            if (countdownInterval) clearInterval(countdownInterval)
        }
    }, [
        showResult,
        countdown,
        matchId,
        setShowToss,
        updateMatchStartedMutation,
    ])

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
                            {countdown > 0 && (
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
