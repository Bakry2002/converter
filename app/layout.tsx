import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers/NextUIProvider'
import PingdomRUM from '@/PingdomRUM'
import SimpleAnalytic from '@/SimpleAnalytic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Reconvert - File converter',
    description: 'Convert anything to anything.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
            {process.env.NODE_ENV === 'production' && <SimpleAnalytic />}
        </html>
    )
}
