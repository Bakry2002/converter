import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" className="flex flex-row items-center gap-1">
            <Image
                src="/icon.png"
                alt="Reconvert Logo"
                width={25}
                height={40}
            />
            <div className="md:text-2xl text-xl font-black text-transparent bg-hero-gradient-text bg-clip-text">
                Convert it
            </div>
        </Link>
    )
}
