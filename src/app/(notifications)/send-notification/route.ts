import admin from 'firebase-admin'
import { Message } from 'firebase-admin/messaging'
import { NextRequest, NextResponse } from 'next/server'

import serviceAccount from '../../../config/service_key.json'

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
    })
}

export async function POST(request: NextRequest) {
    const { token, title, message, link } = await request.json()

    const payload: Message = {
        token,
        notification: {
            title: title,
            body: message,
        },
        webpush: {
            fcmOptions: {
                link,
            },
            notification: {
                icon: 'https://lrwzktesdmdgdpyujxli.supabase.co/storage/v1/object/public/publicimages/favicon.png',
            },
        },
    }

    try {
        await admin.messaging().send(payload)

        return NextResponse.json({
            success: true,
            message: 'Notification sent!',
        })
    } catch (error) {
        return NextResponse.json({ success: false, error })
    }
}
