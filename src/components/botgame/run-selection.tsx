'use client'
import {
    handleBotScore,
    handleBotScoreTypes,
    handleScoreReturnTypes,
    MatchData,
} from '@/queries/matches'
import { botQuery } from '@/queries/queries'
import { BotInfo, UserInfo } from '@/queries/user-team'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Loader } from '../common/loader'
import { CommentaryCard } from './commentary'
import { DisplayCard } from './display-card'
import InningsEndedCard from './innings-ended'
import ResultCard from './result-card'
import { RunsBlock } from './runs-block'

const LoadingDelay = 3

export const generateRandomBotNumber = (): number => {
    const RUNS = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6]
    const randomIndex = Math.floor(Math.random() * RUNS.length)
    return RUNS[randomIndex]
}

interface RunSelectionTypes {
    type: string
    matchId: string
    myuserId: string
    battingId: string
    totalballs: number
}

export const RunSelectionBlock = ({ matchId }: RunSelectionTypes) => {
    const queryClient = useQueryClient()
    const supabase = getSupabaseBrowserClient()

    // Explicitly typing user and bot to ensure correct types
    const user = queryClient.getQueryData<UserInfo>(['user'])
    const { data: bot } = useQuery<BotInfo>({
        queryKey: botQuery.key,
        queryFn: () => botQuery.func({ supabase }),
    })
    const matchData = queryClient.getQueryData<MatchData>(['match', matchId])

    const [loading, setLoading] = useState(false)
    const [userNumber, setUserNumber] = useState(5)
    const [botNumber, setBotNumber] = useState(5)
    const [commentaryResult, setCommentaryResult] = useState('')

    const handleScoreMutation = useMutation({
        mutationFn: (data: handleBotScoreTypes) =>
            handleBotScore(data, supabase),
        onSuccess: (data: handleScoreReturnTypes | null) => {
            //queryClient.invalidateQueries({ queryKey: ['match', matchId] })
            console.log('Score updated successfully:', data)
            if (data) {
                if (data.result) {
                    setBotNumber(data.opp_number ?? 5)
                    setUserNumber(data.my_number ?? 5)

                    setTimeout(() => {
                        setLoading(false)
                        setCommentaryResult(data.result ?? '')
                        queryClient.invalidateQueries({
                            queryKey: ['match', matchId],
                        })
                    }, LoadingDelay * 1000)
                }
            }
        },
        onError: (error) => {
            console.error('Error updating score:', error)
        },
    })

    // If neither user nor bot is found, return loading state
    if (!user && !bot && !matchData) return <Loader />

    const handleSelection = (numb: number) => {
        setLoading(true)
        console.log('matchdata', matchData)
        console.log('my_number', numb)
        if (matchData?.type == 'bot') {
            const botnumb = generateRandomBotNumber()
            console.log('botnumber-mynumber', botnumb, numb)
            if (user?.id) {
                handleScoreMutation.mutate({
                    matchId: matchId,
                    ball: parseInt(matchData?.current_ball ?? '0') + 1,
                    userId: user?.id, // Use bot.id here after checking
                    myNumber: numb,
                    botNumber: botnumb,
                })
            }
        }
    }

    return (
        <>
            <CommentaryCard
                innings={matchData?.innings}
                loading={loading}
                totalballs={matchData?.current_ball ?? ''}
                result={commentaryResult}
            />
            {matchData?.innings === 2 && matchData?.is_completed ? (
                <ResultCard />
            ) : matchData?.innings === 1 && matchData?.is_innings_over ? (
                <InningsEndedCard />
            ) : (
                <>
                    <DisplayCard
                        loading={loading}
                        myNumber={userNumber}
                        oppNumber={botNumber}
                        battingNumber={commentaryResult}
                    />
                    <RunsBlock
                        handleSelection={handleSelection}
                        disable={handleScoreMutation.isPending || loading}
                    />
                </>
            )}
        </>
    )
}
