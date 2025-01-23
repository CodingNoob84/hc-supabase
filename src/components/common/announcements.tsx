'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const DURATION_ANNOUNCEMENTS = 10 // Duration to display the announcement in seconds
const REAPPEAR_INTERVAL = 5 * 60 // Half an hour in milliseconds

export default function AnnouncementCard() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const lastShown = localStorage.getItem('announcement_last_shown')
        const now = Date.now()

        // Check if the announcement should be shown
        if (
            !lastShown ||
            now - parseInt(lastShown) >= REAPPEAR_INTERVAL * 1000
        ) {
            setIsVisible(true)
        }
    }, [])

    useEffect(() => {
        if (!isVisible) return

        // Set a timer to automatically hide the announcement
        const timer = setTimeout(() => {
            setIsVisible(false)
            localStorage.setItem(
                'announcement_last_shown',
                Date.now().toString()
            )
        }, DURATION_ANNOUNCEMENTS * 1000)

        return () => clearTimeout(timer)
    }, [isVisible])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur bg-black/50">
            <div
                className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-lg shadow-lg relative"
                role="alert"
                aria-live="polite"
            >
                <button
                    onClick={() => {
                        setIsVisible(false)
                        localStorage.setItem(
                            'announcement_last_shown',
                            Date.now().toString()
                        )
                    }}
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
