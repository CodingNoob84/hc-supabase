import React from 'react'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { convertBallsToOvers } from './score-card'

export interface CommentaryCardTypes {
    loading: boolean
    totalballs: number
    isWicket: boolean
    battingNumber: string
}

const CommentaryCardComponent = ({
    totalballs,
    battingNumber,
}: CommentaryCardTypes) => {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-2">
                <div className="flex items-center">
                    <span className="text-sm font-semibold mx-5">
                        Over {convertBallsToOvers(totalballs)}:
                    </span>
                    <div className="text-sm text-muted-foreground">
                        {battingNumber === '' ? (
                            ''
                        ) : (
                            <>
                                <Badge className="inline-flex items-center justify-center w-12 text-center align-middle">
                                    {battingNumber}
                                </Badge>
                                <span className="ml-2">
                                    {getCommentary(battingNumber)}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Memoize the component to prevent unnecessary re-renders when totalballs doesn't change
export const CommentaryCard = React.memo(
    CommentaryCardComponent,
    (prevProps, nextProps) => {
        return prevProps.totalballs === nextProps.totalballs
    }
)

// Commentary JSON with types
type CommentaryJsonType = {
    [key in '0' | '1' | '2' | '3' | '4' | '6' | 'W']: string[]
} & {
    [key: string]: string[] // Allow any string key to index, but still enforce the known keys
}

export const CommentaryJson: CommentaryJsonType = {
    '0': [
        " That's a dot ball! The bowler keeps the pressure on.",
        ' No run there, straight to the fielder.',
        ' Defended solidly back to the bowler, no chance for a run.',
    ],
    '1': [
        ' Pushed into the gap, they take a quick single.',
        ' Soft hands, and they scamper through for one.',
        ' A nudge to the leg side, and the batsmen rotate the strike.',
    ],
    '2': [
        " Clipped into the gap, they'll come back for a comfortable two.",
        ' Great running between the wickets, two more added to the total.',
        ' Driven to the deep, and they complete a couple of runs.',
    ],
    '3': [
        " Timed beautifully, they'll get three as the ball slows near the boundary.",
        ' Excellent placement! The fielders chase it down, three runs taken.',
        ' Driven through the covers, and the batsmen pick up a well-run three.',
    ],
    '4': [
        " What a shot! That's four runs to the boundary.",
        ' Beautifully timed, races away to the fence for a boundary!',
        ' Crisp drive, and it beats the fielder to the boundary rope.',
    ],
    '6': [
        " That's out of here! A massive six over the ropes!",
        ' Cleared the boundary with ease, a magnificent six!',
        ' What a strike! That ball is sailing into the crowd for six!',
    ],
    W: [
        ' Gone! The bowler strikes, and the batsman has to walk back.',
        ' What a breakthrough! The stumps are rattled, and the batsman is out.',
        ' Caught! A superb catch by the fielder, and the batsman is dismissed.',
    ],
}

// getCommentary function to retrieve random commentary
export const getCommentary = (runType: string): string => {
    const commentaryOptions = CommentaryJson[runType]

    if (!commentaryOptions) {
        return 'Invalid run type' // Fallback message
    }

    // Select a random commentary from available options
    const randomIndex = Math.floor(Math.random() * commentaryOptions.length)
    return commentaryOptions[randomIndex]
}
