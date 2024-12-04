'use client'

import { generateToss } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'

const GeneratingTimer = 5
const MatchStartTimer = 5

export interface TossReturnTypes {
    toss_winner: string
    toss_choice: string
}

export const TossCard = ({
    matchId,
    myuserId,
}: {
    matchId: string
    myuserId: string
}) => {
    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()

    const [message, setMessage] = useState<string>('Auto-generating toss...')
    const [showResult, setShowResult] = useState<boolean>(false)
    const [countdown, setCountdown] = useState<number | null>(null)

    // Toss Mutation
    const tossMutation = useMutation({
        mutationFn: async () => generateToss(matchId, supabase),
        onSuccess: (data) => {
            if (data) {
                const resultMessage =
                    data.toss_winner === myuserId
                        ? `You won the toss! You elected to ${data.toss_choice} first.`
                        : `Opponent won the toss and elected to ${data.toss_choice} first.`
                setMessage(resultMessage)
            } else {
                setMessage('No toss data received, please try again later.')
            }

            setShowResult(true)

            // Start a 5-second countdown
            let timer = MatchStartTimer
            setCountdown(timer)
            const countdownInterval = setInterval(() => {
                timer -= 1
                setCountdown(timer)
                if (timer === 0) {
                    clearInterval(countdownInterval)
                    queryClient.invalidateQueries({
                        queryKey: ['match', matchId],
                    }) // Invalidate queries after countdown ends
                }
            }, 1000)
        },
        onError: () => {
            setMessage('Error generating toss, please try again later.')
            setShowResult(true)
        },
    })

    // Automatically trigger the toss mutation after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            tossMutation.mutate()
        }, GeneratingTimer * 1000)

        return () => clearTimeout(timer)
    }, [matchId])

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
                            <div>{message}</div>
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
