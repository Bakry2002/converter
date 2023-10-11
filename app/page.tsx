import { DropZone } from '@/components/DropZone'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { OpenButton } from '@/components/OpenButton'
import { Manager } from '@/components/files/Manager'

const Hero: any = () => (
    <section className="relative h-screen justify-center flex items-center flex-col gap-16 bg-hero-bg bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10 xl:pt-[calc(75px+150px)] pt-[calc(75px+100px)]">
            <h1 className=" text-7xl font-bold text-white text-center [text-wrap:balance]">
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
            <OpenButton
                label="Upload a file to convert"
                className="relative left-1/2 -translate-x-1/2 mt-12"
            />
        </div>
    </section>
)

const About: any = () => (
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
                <div className="h-[1000px]"></div>
                <Footer />
            </>
        </DropZone>
    )
}
