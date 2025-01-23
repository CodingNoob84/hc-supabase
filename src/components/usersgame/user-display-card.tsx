'use client'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

interface DisplayCardTypes {
    myId: string
    matchId: string
    loading: boolean
    battingId: string
    battingNumber: string
    setCommentaryResult: (result: string) => void
    handleSelection: (numb: number) => void
}

interface PayLoadType {
    ball: number
    battingnumber: number | null
    bowlingnumber: number | null
    result: string | null
    matchid: string
}

const RUNS = [1, 2, 3, 4, 6]

const getBgColor = (isWicket: boolean, run: string) => {
    if (run === '4' || run === '6') return 'bg-green-200'
    if (run === 'W') return 'bg-red-200'
    if (run === '') return ''
    return 'bg-yellow-100'
}

export const UserDisplayCard = ({
    myId,
    matchId,
    loading,
    battingId,
    battingNumber,
    setCommentaryResult,
    handleSelection,
}: DisplayCardTypes) => {
    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()

    const [userNumber, setUserNumber] = useState(5)
    const [oppNumber, setOppNumber] = useState(5)
    const [mePlayed, setMePlayed] = useState(false)
    const [oppPlayed, setOppPlayed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(5)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        const subscription = supabase
            .channel('user_request_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'usereachball',
                    filter: `matchid=eq.${matchId}`,
                },
                (payload) => {
                    if (payload.eventType === 'DELETE') {
                        queryClient.invalidateQueries({
                            queryKey: ['match', matchId],
                        })
                    }
                    const newData: PayLoadType = payload.new as PayLoadType
                    if (newData.matchid !== matchId) return // Ignore updates for other matches

                    // Update play status
                    if (myId === battingId) {
                        setMePlayed(!!newData.battingnumber)
                        setOppPlayed(!!newData.bowlingnumber)
                    } else {
                        setMePlayed(!!newData.bowlingnumber)
                        setOppPlayed(!!newData.battingnumber)
                    }

                    // Handle result update
                    if (newData.result) {
                        setCommentaryResult(newData.result)
                        queryClient.invalidateQueries({
                            queryKey: ['match', matchId],
                        })

                        // Update opponent's number
                        if (myId === battingId) {
                            setOppNumber(newData.bowlingnumber || 5)
                        } else {
                            setOppNumber(newData.battingnumber || 5)
                        }

                        // Reset numbers after 2 seconds
                        setTimeout(() => {
                            setUserNumber(5)
                            setOppNumber(5)
                            setMePlayed(false)
                            setOppPlayed(false)
                            setSelectedNumber(5)
                            setDisable(false)
                        }, 2000)
                    }
                }
            )
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, battingId, matchId, myId, setCommentaryResult, queryClient])

    const handleSelect = (numb: number) => setSelectedNumber(numb)

    const handleSubmit = () => {
        if (selectedNumber != 5) {
            setDisable(true)
            setUserNumber(selectedNumber)
            handleSelection(selectedNumber)
        }
    }

    return (
        <>
            {/* Main Card */}
            <Card
                className={`w-full max-w-md mx-auto ${getBgColor(
                    userNumber === oppNumber,
                    battingNumber
                )}`}
            >
                <CardContent>
                    <div className="flex flex-row justify-evenly pt-4">
                        {loading ? (
                            <>
                                <LoadingCard initialIndex={0} />
                                <LoadingCard initialIndex={3} />
                            </>
                        ) : (
                            <>
                                {/* Opponent Number */}
                                <div className="flex flex-col items-center">
                                    <NumberCard number={oppNumber} />
                                    <Badge>
                                        {oppPlayed ? 'Played' : 'Playing...'}
                                    </Badge>
                                </div>
                                {/* User Number */}
                                <div className="flex flex-col items-center">
                                    <NumberCard number={userNumber} />
                                    <Badge>
                                        {mePlayed ? 'Played' : 'Playing...'}
                                    </Badge>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Selection Card */}
            <Card className="w-full max-w-md mx-auto">
                <CardContent>
                    <div className="pt-4 flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center gap-2">
                            {RUNS.map((num) => (
                                <div
                                    key={num}
                                    onClick={() => handleSelect(num)}
                                    className={`${
                                        selectedNumber === num
                                            ? 'w-14 h-14 bg-gray-600'
                                            : 'w-12 h-12 bg-gray-400'
                                    } text-white rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleSubmit} disabled={disable}>
                            Hit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export const NumberCard = ({ number }: { number: number }) => {
    return (
        <div className="rounded-xl border text-4xl font-extrabold text-white border-gray-200 shadow bg-gradient-to-br from-zinc-700 to-zinc-900 w-20 h-20 flex items-center justify-center mb-2">
            {number === 5 ? '' : number}
        </div>
    )
}

const numbers: number[] = [0, 1, 2, 3, 4, 6]
export const LoadingCard = ({ initialIndex }: { initialIndex: number }) => {
    const [currentNumber, setCurrentNumber] = useState<number>(initialIndex)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNumber((prev) => (prev + 1) % numbers.length)
        }, 300) // Change number every 300ms

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="rounded-xl border text-4xl font-extrabold text-white border-gray-200 shadow bg-gradient-to-br from-zinc-700 to-zinc-900 w-20 h-20 flex items-center justify-center mb-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentNumber}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    {numbers[currentNumber]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
