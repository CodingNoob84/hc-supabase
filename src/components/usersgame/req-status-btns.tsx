import { GameMode } from '@/queries/user-team'
import { Check, Clock, Info, Loader2, PlayCircle, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface GameModeInfo {
    title: string
    description: string
}

const gameModes: Record<GameMode, GameModeInfo> = {
    six_balls: {
        title: 'Six Ball Showdown',
        description:
            'A quick 6-ball match where you can lose up to 2 wickets. Test your skills in a single over!',
    },
    thirty_balls: {
        title: 'Thirty Ball Thrills',
        description:
            'A 30-ball match where you can lose up to 5 wickets. Strategic and fun-packed gameplay!',
    },
}

export const PlayRequestBtn = ({
    userId,
    handlePlayRequest,
}: {
    userId: string
    handlePlayRequest: (userId: string, mode: GameMode) => void
}) => {
    const [open, setOpen] = useState(false)
    const [gameMode, setGameMode] = useState<GameMode | null>(null)

    const handleGameModeSelect = (mode: GameMode) => {
        setGameMode(mode)
    }

    const handlePlayClick = () => {
        if (gameMode) {
            console.log(`Game Mode Selected: ${gameMode}`)
            handlePlayRequest(userId, gameMode)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className="w-full p-1">
            {open ? (
                <div className="w-full flex flex-col">
                    {/* Game mode selection buttons */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {(Object.keys(gameModes) as GameMode[]).map((mode) => (
                            <Button
                                key={mode}
                                variant={
                                    gameMode === mode ? 'default' : 'outline'
                                }
                                onClick={() => handleGameModeSelect(mode)}
                                className="w-full"
                            >
                                {gameModes[mode].title}
                            </Button>
                        ))}
                    </div>

                    {/* Selected game mode details */}
                    {gameMode && (
                        <div className="bg-muted p-4 rounded-lg mb-4">
                            <h3 className="font-semibold mb-2 flex items-center">
                                <Info className="w-4 h-4 mr-2" />
                                {gameModes[gameMode].title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {gameModes[gameMode].description}
                            </p>
                        </div>
                    )}

                    {/* Play button */}
                    <div className="flex flex-row gap-2">
                        <Button
                            className="w-full"
                            onClick={() => setOpen(false)}
                        >
                            Back
                        </Button>
                        <Button
                            className="w-full"
                            onClick={handlePlayClick}
                            disabled={!gameMode}
                        >
                            <PlayCircle className="w-5 h-5 mr-2" />
                            Send Play Request
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                    variant="default"
                    className="w-full py-2"
                    onClick={() => setOpen(true)}
                    aria-label="Ready to battle"
                >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Ready to Battle
                </Button>
            )}
        </div>
    )
}

export const Cancelbtn = ({
    userId,
    gamemode,
    handleCancel,
}: {
    userId: string
    gamemode: GameMode
    handleCancel: (userId: string, mode: GameMode) => void
}) => {
    console.log('gamemode', gamemode)
    return (
        <div className="w-full flex flex-col p-1">
            <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {gameModes[gamemode].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {gameModes[gamemode].description}
                </p>
            </div>
            <Button
                variant="ghost"
                className="flex-1 rounded-none py-2 border-l bg-yellow-100 hover:bg-yellow-200"
                onClick={() => handleCancel(userId, gamemode)}
                aria-label="Cancel play request"
            >
                <X className="w-5 h-5 mr-2 text-yellow-500" />
                Cancel Request
            </Button>
        </div>
    )
}

export const AcceptRejectbtn = ({
    userId,
    gamemode,
    handleAccept,
    handleReject,
}: {
    userId: string
    gamemode: GameMode
    handleAccept: (userId: string, mode: GameMode) => void
    handleReject: (userId: string, mode: GameMode) => void
}) => {
    console.log('gamemode', gamemode)
    return (
        <div className="w-full flex flex-col p-1">
            <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {gameModes[gamemode].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {gameModes[gamemode].description}
                </p>
            </div>
            <div className="flex-1 flex border-l">
                <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 bg-green-100 hover:bg-green-200"
                    onClick={() => handleAccept(userId, gamemode)}
                    aria-label="Accept play request"
                >
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    Accept
                </Button>
                <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 bg-red-100 hover:bg-red-200"
                    onClick={() => handleReject(userId, gamemode)}
                    aria-label="Reject play request"
                >
                    <X className="w-5 h-5 mr-2 text-red-500" />
                    Reject
                </Button>
            </div>
        </div>
    )
}

export const WaitingBtn = ({
    userId,
    gamemode,
    handleCancel,
}: {
    userId: string
    gamemode: GameMode
    handleCancel: (userId: string, mode: GameMode) => void
}) => {
    const [countdown, setCountdown] = useState(10) // Start countdown from 10 seconds

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)

            // Cleanup the timer when component unmounts or countdown reaches 0
            return () => clearInterval(timer)
        } else {
            setTimeout(() => {
                handleCancel(userId, gamemode)
                console.log(
                    'Countdown reached 0: No response, triggering cancel.'
                )
            }, 3000)
        }
    }, [countdown]) // Effect depends on `countdown`

    return (
        <div className="w-full flex flex-col p-1">
            <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {gameModes[gamemode].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {gameModes[gamemode].description}
                </p>
            </div>
            {countdown > 0 ? (
                <Button
                    variant="ghost"
                    className="flex-1 py-2 bg-blue-100 hover:bg-blue-200"
                    disabled
                >
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Waiting for response... {countdown}s
                </Button>
            ) : (
                <Button
                    variant="ghost"
                    className="flex-1 py-2 bg-red-400 hover:bg-red-500"
                    disabled
                >
                    Sorry, no response 😔
                </Button>
            )}
        </div>
    )
}

export const ToPlayBtn = ({
    userId,
    gamemode,
    handlePlay,
}: {
    userId: string
    gamemode: GameMode
    handlePlay: (userId: string, mode: GameMode) => void
}) => {
    const [countdown, setCountdown] = useState(10) // Start countdown from 10 seconds

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)

            // Cleanup the timer when component unmounts or countdown reaches 0
            return () => clearInterval(timer)
        } else {
        }
    }, [countdown]) // Effect depends on `countdown`
    return (
        <div className="w-full flex flex-col p-1">
            <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    {gameModes[gamemode].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {gameModes[gamemode].description}
                </p>
            </div>
            {countdown > 0 ? (
                <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 border-l bg-green-300 hover:bg-green-400"
                    onClick={() => handlePlay(userId, gamemode)}
                    aria-label="Play Game"
                >
                    <PlayCircle className="w-5 h-5 mr-2 text-green-600" />
                    Click to play... {countdown}s
                </Button>
            ) : (
                <Button
                    variant="ghost"
                    className="flex-1 rounded-none py-2 border-l bg-red-300 hover:bg-red-400"
                    disabled
                    aria-label="Play Game"
                >
                    Sorry, Response time expired 😔
                </Button>
            )}
        </div>
    )
}

export const PlayingBtn = () => {
    return (
        <Button
            variant="default"
            className="w-full max-w-md mx-auto py-2 cursor-not-allowed"
            disabled
        >
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Currently Playing
        </Button>
    )
}

export const ContinuePlayingBtn = ({
    userId,
    matchId,
    handleForfeit,
}: {
    userId: string
    matchId: string
    handleForfeit: (userId: string) => void
}) => {
    return (
        <div className="w-full flex justify-between gap-4">
            <Button
                variant="default"
                className="w-full cursor-not-allowed"
                asChild
            >
                <Link href={`/dashboard/usersgame/${matchId}`}>
                    Continue to Play
                </Link>
            </Button>
            <Button className="w-full" onClick={() => handleForfeit(userId)}>
                Forfeit
            </Button>
        </div>
    )
}
