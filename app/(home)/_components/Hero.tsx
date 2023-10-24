'use client'

import Progress from '@/components/progress/Progress'
import Image from 'next/image'

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
    return (
        <section className=" relative min-h-screen">
            <Image
                src="/images/hero.jpg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Hero background"
                quality={100}
                priority
                className="z-[-1]"
            />
            <div className="flex items-center gap-12 flex-col justify-evenly top-0 left-0 w-full min-h-screen bg-black/30 xl:pt-[calc(75px+150px)] pt-[calc(75px+35px)]">
                <h1 className="xl:text-7xl sm:text-[3.5rem] text-[3.25rem] font-bold text-white text-center [text-wrap:balance]">
                    Convert any file to any{' '}
                    <span className="text-transparent bg-clip-text bg-hero-gradient-text">
                        format
                    </span>
                    , keep the quality{' '}
                    <span className="text-transparent bg-clip-text bg-hero-gradient-text">
                        untouched.
                    </span>
                </h1>

                <Progress />
            </div>
        </section>
    )
}

export default Hero
