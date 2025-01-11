'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'

interface DisplayCardTypes {
    loading: boolean
    myNumber: number
    oppNumber: number
    battingNumber: string
}

const getBgColor = (isWicket: boolean, run: string) => {
    //console.log('bgcolor', isWicket, run)

    if (run == '4' || run == '6') {
        return 'bg-green-200'
    } else if (run == '') {
        return ''
    } else if (run == 'W') {
        return 'bg-red-200'
    } else {
        return 'bg-yellow-100'
    }
}

export const DisplayCard = ({
    loading,
    myNumber,
    oppNumber,
    battingNumber,
}: DisplayCardTypes) => {
    //console.log('display', myNumber)
    return (
        <Card
            className={`w-full max-w-md mx-auto ${getBgColor(
                myNumber == oppNumber,
                battingNumber
            )} `}
        >
            <CardContent>
                <div className="flex flex-row justify-evenly pt-4">
                    {loading ? (
                        <>
                            {/* Pass unique initialIndex to each LoadingCard */}
                            <LoadingCard initialIndex={0} />
                            <LoadingCard initialIndex={3} />
                        </>
                    ) : (
                        <>
                            <NumberCard number={oppNumber} />
                            <NumberCard number={myNumber} />
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export const NumberCard = ({ number }: { number: number }) => {
    return (
        <div className="rounded-xl border border-gray-400 shadow text-6xl font-extrabold bg-zinc-500 w-20 h-20 flex items-center justify-center">
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

        // Cleanup interval on component unmount
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="rounded-xl border border-gray-400 shadow text-6xl font-extrabold bg-zinc-500 w-20 h-20 flex items-center justify-center">
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
