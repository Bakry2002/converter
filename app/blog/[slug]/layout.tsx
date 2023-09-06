import Image from 'next/image'
import Link from 'next/link'

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header className="flex items-center mx-auto container py-2">
                <Link href="/" className=" flex flex-row items-center gap-1">
                    <Image
                        src="/icon.png"
                        alt="Reconvert Logo"
                        width={64}
                        height={64}
                    />
                    <div className="text-xl">Reconvert</div>
                </Link>
            </header>
            <div className="container mx-auto py-2 mt-10">
                <Link
                    href="/blog"
                    className="font-semibold text-xl hover:underline"
                >
                    Blog
                </Link>
            </div>
            <main className="container max-auto mt-8">{children}</main>
        </>
    )
}
