'use client'
import {
    handleScoreReturnTypes,
    handleScoreTypes,
    handleUserScore,
    MatchData,
} from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { CommentaryCard } from '../botgame/commentary'
import ResultCard from '../botgame/result-card'
import { UserDisplayCard } from './user-display-card'
import UserInningsEndedCard from './user-innings-ended'

export const generateRandomBotNumber = (): number => {
    const RUNS = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6]
    const randomIndex = Math.floor(Math.random() * RUNS.length)
    return RUNS[randomIndex]
}

export const UserRunSelectionBlock = ({
    myId,
    data,
}: {
    myId: string
    data: MatchData
}) => {
    const supabase = getSupabaseBrowserClient()

    console.log('ball', data.current_ball)
    const [commentaryResult, setCommentaryResult] = useState('')
    //const [loading, setLoading] = useState(false)
    const loading = false
    const handleScoreMutation = useMutation({
        mutationFn: (data: handleScoreTypes) => handleUserScore(data, supabase),
        onSuccess: (data: handleScoreReturnTypes | null) => {
            //queryClient.invalidateQueries({ queryKey: ['match', matchId] })
            console.log('Score updated successfully:', data)
        },
        onError: (error) => {
            console.error('Error updating score:', error)
        },
    })

    const handleSelection = (numb: number) => {
        console.log('number', data.match_id, myId, 1, numb)
        const postData = {
            matchId: data.match_id,
            userId: myId,
            ball: parseInt(data.current_ball + 1),
            Number: numb,
        }
        handleScoreMutation.mutate(postData)
    }
    return (
        <>
            <CommentaryCard
                innings={data?.innings}
                loading={loading}
                totalballs={data?.current_ball ?? ''}
                result={commentaryResult}
            />
            {data?.innings === 2 && data?.is_completed ? (
                <ResultCard />
            ) : data?.innings === 1 && data?.is_innings_over ? (
                <UserInningsEndedCard
                    setCommentaryResult={setCommentaryResult}
                />
            ) : (
                <>
                    <UserDisplayCard
                        myId={myId}
                        matchId={data.match_id}
                        loading={loading}
                        battingId={data.batting_id}
                        battingNumber={commentaryResult}
                        setCommentaryResult={setCommentaryResult}
                        handleSelection={handleSelection}
                    />
                </>
            )}
        </>
    )
}
