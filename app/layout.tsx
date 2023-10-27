import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Quicksand } from 'next/font/google'
import { Source_Sans_3 } from 'next/font/google'
import { Roboto } from 'next/font/google'
import { Providers } from '@/app/providers/NextUIProvider'
import PingdomRUM from '@/PingdomRUM'
import SimpleAnalytic from '@/SimpleAnalytic'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// const quicksand = Quicksand({ subsets: ['latin'] })
// const roboto = Roboto({
//     subsets: ['latin'],
//     weight: ['100', '300', '400', '500', '700', '900'],
// })
const ss3 = Source_Sans_3({
    subsets: ['latin'],
})
export const metadata: Metadata = {
    title: 'Convert it  —  Convert between any formats',
    description: 'Convert between any formats, keep teh quality untouched',
}

// 0:32:00

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={ss3.className}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
            {process.env.NODE_ENV === 'production' && <SimpleAnalytic />}
        </html>
    )
}
