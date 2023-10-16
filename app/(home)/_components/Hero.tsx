'use client'

import { OpenButton } from '@/components/OpenButton'
import ProgressComponent from '@/components/progress/ProgressComponent'

interface HeroProps {}

const Hero: React.FC<HeroProps> = ({}) => {
    return (
        <section className="relative min-h-screen bg-hero-bg bg-no-repeat bg-cover">
            <div className="flex items-center flex-col justify-between top-0 left-0 w-full min-h-screen bg-black/30 xl:pt-[calc(75px+150px)] pt-[calc(75px+100px)]">
                <h1 className="xl:text-7xl sm:text-[3.5rem] text-[3rem] font-bold text-white text-center [text-wrap:balance]">
                    Convert any file to any{' '}
                    <span className="text-transparent bg-clip-text bg-hero-gradient-text">
                        format
                    </span>
                    , keep the quality{' '}
                    <span className="text-transparent bg-clip-text bg-hero-gradient-text">
                        untouched.
                    </span>
                </h1>

                <ProgressComponent />
            </div>
        </section>
    )
}

export default Hero
