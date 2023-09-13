import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="container mx-auto py-2 mt-10">
                <Link
                    href="/blog"
                    className="font-semibold text-xl hover:underline"
                >
                    Blog
                </Link>
            </div>
            <main className="container max-auto mt-8">{children}</main>
            <Footer />
        </>
    )
}
