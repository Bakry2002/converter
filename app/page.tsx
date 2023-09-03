import { DropZone } from '@/components/DropZone'

import { OpenButton } from '@/components/OpenButton'
import { Manager } from '@/components/files/Manager'

import Image from 'next/image'
import Link from 'next/link'

const Hero = () => (
    <section className="py-32 flex items-center flex-col gap-16">
        <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
            Convert any file to any{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-500">
                format
            </span>
            , keep the quality{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-500">
                untouched.
            </span>
            {/* Toggle between formats, keep the quality untouched. */}
        </h1>
        <OpenButton />
    </section>
)

const About = () => (
    <section className="container mx-auto flex flex-col gap-52">
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
            sapiente iste, modi magni ipsa dolorum fugit ducimus dolorem dolore
            repellendus cupiditate similique tempora eligendi sit debitis
            quaerat architecto illo recusandae?
        </p>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            dolores, dolorem accusantium inventore, quae officia sint qui
            facilis odio, corporis reprehenderit quasi pariatur quia eius
            possimus voluptatibus! Facere, illo voluptates?
        </p>
    </section>
)

export default function Home() {
    return (
        <DropZone>
            <>
                <header className="flex items-center mx-auto container py-2">
                    <Link
                        href="/"
                        className=" flex flex-row items-center gap-1"
                    >
                        <Image
                            src="/icon.png"
                            alt="Reconvert Logo"
                            width={64}
                            height={64}
                        />
                        <div className="text-xl">Reconvert</div>
                    </Link>
                </header>
                <main>
                    <Hero />
                    <Manager />

                    <About />
                </main>
            </>
        </DropZone>
    )
}
