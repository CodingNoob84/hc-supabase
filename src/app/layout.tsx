import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { ReactQueryClientProvider } from '@/providers/react-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Hand Cricket',
    description:
        'A virtual hand cricket mind game of runs, targets, and reading opponents moves!',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReactQueryClientProvider>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </ReactQueryClientProvider>
            </body>
        </html>
    )
}
