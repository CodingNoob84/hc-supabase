const Bots = [
    {
        id: '499f299f-6a99-4055-af41-a2ca83f5f3a4',
        codename: 'bot002',
        name: 'Chiti The Robot',
        level: 'hard',
    },
    {
        id: '98d31082-8dc6-4cfd-a51b-3eb3344e4a86',
        codename: 'bot003',
        name: 'Kaipulla',
        level: 'easy',
    },
    {
        id: 'b8ac5ce7-c9f5-44a7-8a37-16f7f4b39349',
        codename: 'bot004',
        name: 'Veerabagu',
        level: 'easy',
    },
    {
        id: 'c99ef0d6-fc89-4778-9a2a-88c253ed4af6',
        codename: 'bot005',
        name: 'Style Pandi',
        level: 'medium',
    },
    {
        id: 'd35d2c28-1598-427e-9eb4-202be618394b',
        codename: 'bot001',
        name: 'Xabara',
        level: 'medium',
    },
]

const getRandomNumber = (array: number[]): number => {
    if (array.length === 0) {
        console.warn('Array is empty')
        return 0 // Return 0 instead of undefined
    }

    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

const getBNHard = (number: number, isBatting: boolean): number => {
    if (isBatting) {
        if (number >= 4) {
            return number
        } else if (number) {
            return getRandomNumber([1, 2, 3, 3, 3, 3, 3])
        }
    } else {
        if (number === 6) {
            return getRandomNumber([3, 4, 4, 4])
        } else if (number === 4) {
            return getRandomNumber([2, 3, 6, 6, 6])
        } else if (number === 3) {
            return getRandomNumber([2, 4, 4, 4, 6, 6, 6])
        } else {
            return getRandomNumber([3, 4, 4, 4, 6, 6, 6])
        }
    }
    return 0 // Default return
}

const getBNMedium = (): number => {
    const numbers = [1, 2, 3, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6]
    return getRandomNumber(numbers)
}

const getBNEasy = (): number => {
    const numbers = [1, 2, 3, 4, 6]
    return getRandomNumber(numbers)
}

export const getBotNumber = (
    botId: string,
    userNumber: number,
    isBatting: boolean
): number => {
    // Find the bot by ID
    const bot = Bots.find((b) => b.id === botId)

    if (!bot) {
        console.warn('Bot not found!')
        return 0 // Default return if bot ID doesn't match
    }

    // Switch logic based on bot level
    switch (bot.level) {
        case 'hard':
            return getBNHard(userNumber, isBatting)
        case 'medium':
            return getBNMedium()
        case 'easy':
            return getBNEasy()
        default:
            console.warn('Unknown bot level!')
            return 0
    }
}
