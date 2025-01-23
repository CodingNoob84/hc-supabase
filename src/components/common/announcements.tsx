'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const DURATION_ANNOUNCEMENTS = 10

export default function AnnouncementCard() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, DURATION_ANNOUNCEMENTS * 1000) // 10 seconds

        return () => clearTimeout(timer)
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur bg-black/50">
            <div
                className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg shadow-lg relative"
                role="alert"
                aria-live="polite"
            >
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-primary-foreground/80 hover:text-primary-foreground"
                    aria-label="Close announcement"
                >
                    <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-2">Hello Everyone!</h2>
                <p className="text-sm">
                    {` I'm Karthik, the creator of this app. I truly value your
                    input and would love to hear your suggestions and feedback
                    for improvements. Please feel free to share your thoughts in
                    the review section—your valuable feedback is always welcome
                    and greatly appreciated!`}
                </p>
                <p className="text-lg">Thank you for your support!</p>
            </div>
        </div>
    )
}
