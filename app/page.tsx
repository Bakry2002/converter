import { DropZone } from '@/components/DropZone'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { OpenButton } from '@/components/OpenButton'
import { ProgressDemo } from '@/components/ProgressDemo'
import { Manager } from '@/components/files/Manager'

const Hero: any = () => (
    <section className="relative h-screen justify-end flex items-center flex-col gap-16 bg-hero-bg bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10 xl:pt-[calc(75px+150px)] pt-[calc(75px+100px)]">
            <h1 className="xl:text-5xl sm:text-[2.5rem] text-[2rem]  font-bold text-white text-center [text-wrap:balance]">
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
        </div>

        <div className="w-[calc(100%-50%)] mb-6 z-20 mx-auto">
            <div className="relative bg-neutral-200/20 flex rounded justify-center items-center border-3 border-dashed border-neutral-500 flex-col">
                {/* Content */}
                <div className="sm:px-0 px-2 flex justify-center flex-wrap -mx-[15px]">
                    <div className="relative border-none py-8 flex flex-col md:flex-row break-words bg-clip-border rounded-sm w-full min-w-0">
                        <ProgressDemo />
                        <div className="md:pl-5 px-6 flex items-center flex-col basis-[33.333333%] max-w-[33.333333%] w-full relative">
                            <h6 className="text-white text-center hidden ">
                                Select a file
                            </h6>
                            <div className="-ml-[5px] animate-pulse w-[44px] h-[44px] text-white mb-8 flex items-center justify-center rounded-full bg-green-700 text-3xl"></div>
                        </div>
                    </div>

                    <OpenButton label="Upload a file to convert" className="" />
                </div>
            </div>
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
