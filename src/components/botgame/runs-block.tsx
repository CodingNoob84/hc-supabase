'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

const RUNS = [1, 2, 3, 4, 6]

export const RunsBlock = ({
    handleSelection,
    disable,
}: {
    handleSelection: (numb: number) => void
    disable: boolean
}) => {
    //console.log('disbale', disable)
    const [number, setNumber] = useState<number>(5)

    const handleSelect = (numb: number) => {
        console.log(numb)
        setNumber(numb)
    }

    const handleSubmit = () => {
        handleSelection(number)
    }
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent>
                <div className="pt-4 flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center gap-2">
                        {RUNS.map((num) => (
                            <div
                                key={num}
                                onClick={() => handleSelect(num)}
                                className={`${
                                    number == num
                                        ? 'w-14 h-14 bg-gray-600'
                                        : 'w-12 h-12 bg-gray-400'
                                }  text-white rounded-full flex items-center justify-center cursor-pointer`}
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
    )
}
