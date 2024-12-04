'use client'
import {
    handleScore,
    handleScoreTypes,
    MatchData,
    TeamInfo,
} from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
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

export const RunSelectionBlock = ({
    type,
    matchId,
    myuserId,
    battingId,
    totalballs,
}: RunSelectionTypes) => {
    const queryClient = useQueryClient()
    const supabase = getSupabaseBrowserClient()
    const data: MatchData | undefined = queryClient.getQueryData([
        'match',
        matchId,
    ])

    const user: TeamInfo | undefined = queryClient.getQueryData(['user'])
    console.log('data', data, user)
    const [loading, setLoading] = useState(false)
    const [userNumber, setUserNumber] = useState(5)
    const [botNumber, setBotNumber] = useState(5)
    const [battingNumber, setBattingNumber] = useState('')

    const handleScoreMutation = useMutation({
        mutationFn: (data: handleScoreTypes) => handleScore(data, supabase),
        onSuccess: (data) => {
            //querClient.invalidateQueries({ queryKey: ['match', matchId] })
            console.log('Score updated successfully:', data)
        },
        onError: (error) => {
            console.error('Error updating score:', error)
        },
    })

    const handleSelection = (numb: number) => {
        setLoading(true)
        setBattingNumber('')
        if (type == 'bot') {
            const usernumb = numb
            const botnumb = generateRandomBotNumber()
            handleScoreMutation.mutate({
                matchId: matchId,
                ball: parseInt(data?.current_ball ?? '0') + 1,
                battingNumber: battingId == myuserId ? usernumb : botnumb,
                bowlingNumber: battingId != myuserId ? usernumb : botnumb,
            })

            setTimeout(() => {
                if (usernumb == botnumb) {
                    setBattingNumber('W')
                } else {
                    const number = battingId == myuserId ? usernumb : botnumb
                    setBattingNumber(`${number}`)
                }
                setUserNumber(usernumb)
                setBotNumber(botnumb)
                setLoading(false)
                queryClient.invalidateQueries({ queryKey: ['match', matchId] })
            }, LoadingDelay * 1000)
        }
    }
    return (
        <>
            <CommentaryCard
                loading={loading}
                totalballs={totalballs}
                isWicket={userNumber == botNumber}
                battingNumber={battingNumber}
            />
            {data?.innings === 2 && data?.is_completed ? (
                // Render the ResultCard when the game is completed in the second innings
                <ResultCard />
            ) : data?.innings === 1 && data?.is_innings_over ? (
                // Render the InningsEndedCard when the first innings is over
                <InningsEndedCard />
            ) : (
                <>
                    {/* DisplayCard for ongoing game */}
                    <DisplayCard
                        loading={loading}
                        myNumber={userNumber}
                        oppNumber={botNumber}
                        battingNumber={battingNumber}
                    />
                    {/* RunsBlock for user interaction */}
                    <RunsBlock
                        handleSelection={handleSelection}
                        disable={handleScoreMutation.isPending || loading}
                    />
                </>
            )}
        </>
    )
}
