'use client'
import { Card, CardContent } from '@/components/ui/card'
import { cleanUpRunsData, MatchData } from '@/queries/matches'
import { getSupabaseBrowserClient } from '@/supabase/client'
import { useQueryClient } from '@tanstack/react-query'
import { Frown, ScaleIcon, Trophy } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '../ui/button'

export default function ResultCard() {
    const params = useParams()
    const supabase = getSupabaseBrowserClient()
    const queryClient = useQueryClient()
    const user: { id: string } | undefined = queryClient.getQueryData(['user'])
    const matchdata: MatchData | undefined = queryClient.getQueryData([
        'match',
        params.matchid,
    ])
    console.log('result', user, matchdata)

    const isDraw = matchdata?.isdraw

    const isWinner = matchdata?.winner == user?.id

    useEffect(() => {
        if (matchdata) {
            const cleanupData = async () => {
                try {
                    const result = await cleanUpRunsData(
                        matchdata.match_id,
                        matchdata.type,
                        supabase
                    )
                    console.log('Cleanup result:', result)
                } catch (error) {
                    console.error('Error during cleanup:', error)
                }
            }

            cleanupData() // Call the async function
        }
    }, [matchdata, supabase])

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-2">
            {isDraw ? (
                <Card className="w-full bg-gradient-to-br from-yellow-400 to-amber-600 text-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <ScaleIcon className="w-12 h-12" />
                            <span className="text-3xl font-bold">Draw</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            It&apos;s a tie!
                        </h2>
                        <p className="text-lg">
                            {/* {`${matchdata?.team1} and ${matchdata?.team2} drew`} */}{' '}
                            Draw
                        </p>
                        <div className="mt-4 text-sm opacity-80">
                            {`"In the game of life, when you draw, you win a
                            lesson."`}
                        </div>
                    </CardContent>
                </Card>
            ) : isWinner ? (
                <Card className="bg-gradient-to-br from-green-400 to-emerald-600 text-white ">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Trophy className="w-12 h-12" />
                            <span className="text-3xl font-bold">Victory!</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            Congratulations!
                        </h2>
                        <p className="text-lg">
                            You won {matchdata?.result_by}
                        </p>
                        <div className="mt-4 text-sm opacity-80">
                            {`"Success is not final, victory is not eternal. It's
                            the courage to continue that counts."`}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-gradient-to-br from-red-400 to-rose-600 text-white ">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Frown className="w-12 h-12" />
                            <span className="text-3xl font-bold">Defeat</span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                            Better luck next time!
                        </h2>
                        <p className="text-lg">
                            You lost {matchdata?.result_by}
                        </p>
                        <div className="mt-4 text-sm opacity-80">
                            {`"The greatest glory in living lies not in never
                            falling, but in rising every time we fall."`}
                        </div>
                    </CardContent>
                </Card>
            )}
            <Button asChild className="w-full">
                <Link href="/dashboard">back to Menu</Link>
            </Button>
        </div>
    )
}
