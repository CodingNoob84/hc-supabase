'use client'

import useFcmToken from '@/lib/useFcmToken'
import { Bell, BellOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

function Notifications() {
    const {
        token,
        enableNotifications,
        disableNotifications,
        notificationPermissionStatus,
    } = useFcmToken()

    const [notificationsEnabled, setNotificationsEnabled] = useState(false)

    // Automatically set the toggle state if notifications are already enabled
    useEffect(() => {
        if (notificationPermissionStatus === 'granted' && token) {
            setNotificationsEnabled(true)
        } else {
            setNotificationsEnabled(false)
        }
    }, [notificationPermissionStatus, token])

    const handleToggle = async () => {
        if (notificationsEnabled) {
            await disableNotifications()
            setNotificationsEnabled(false)
        } else {
            await enableNotifications()
            setNotificationsEnabled(true)
        }
    }

    console.log('FCM Token:', token)
    console.log('Notification Status:', notificationPermissionStatus)

    return (
        <div className="w-full max-w-md mx-auto border rounded-md p-4">
            {/* Header */}
            <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                    <Label
                        htmlFor="notifications"
                        className="text-base font-medium"
                    >
                        Enable Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        {notificationPermissionStatus === 'granted'
                            ? "You'll receive important updates and alerts."
                            : 'Turn on notifications to stay informed.'}
                    </p>
                </div>
                <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={handleToggle}
                />
            </div>

            {/* Status Message */}
            <div className="mt-6 flex items-center space-x-2 rounded-lg bg-primary/10 p-4">
                {notificationsEnabled ? (
                    <Bell className="h-6 w-6 text-primary" />
                ) : (
                    <BellOff className="h-6 w-6 text-muted-foreground" />
                )}
                <p className="text-sm font-medium">
                    {notificationsEnabled
                        ? "Notifications are enabled. You're all set!"
                        : 'Notifications are currently disabled.'}
                </p>
            </div>
        </div>
    )
}

export default Notifications
