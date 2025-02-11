import admin from 'firebase-admin'
import { Message } from 'firebase-admin/messaging'
import { NextRequest, NextResponse } from 'next/server'

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT in environment variables')
}

// Parse the JSON environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)

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
