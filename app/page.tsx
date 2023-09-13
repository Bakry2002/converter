import { DropZone } from '@/components/DropZone'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { OpenButton } from '@/components/OpenButton'
import { Manager } from '@/components/files/Manager'

import Image from 'next/image'
import Link from 'next/link'

const Hero = () => (
    <section className="py-32 flex items-center flex-col gap-16">
        <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
            Convert any file to any{' '}
            <span className="text-transparent bg-clip-text bg-hero-gradient-text">
                format
            </span>
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-500">
                format
            </span> */}
            , keep the quality{' '}
            <span className="text-transparent bg-clip-text bg-hero-gradient-text">
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
                <Header />
                <main>
                    <Hero />
                    <Manager />

                    <About />
                </main>
                <Footer />
            </>
        </DropZone>
    )
}
