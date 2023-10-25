'use client'

import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'

type SectionHeadingProps = {
    title: string
}

const montserrat = Montserrat({ subsets: ['latin'] })

const SectionHeading: React.FC<SectionHeadingProps> = ({ title }) => {
    return (
        <div
            className={cn(
                'p-4 pl-0 max-w-[500px] w-[90%] ',
                montserrat.className
            )}
        >
            <h1
                className="text-2xl font-bold relative text-center leading-10 pb-11 uppercase tracking-[2px] text-[#111]
                before:absolute before:bottom-5 before:w-full before:left-1/2 before:h-[1px] before:-ml-[50%] before:bg-[#777] before:z-[4]
                after:absolute after:w-10 after:h-10 after:left-1/2 after:-translate-x-1/2 after:-ml-5 after:bottom-0 after:bg-[url('icon.png')] after:bg-no-repeat after:bg-contain after:bg-center after:text-3xl after:leading-10 after:text-[#c50000] after:font-normal after:z-[5] after:block after:bg-neutral-50   
            "
            >
                {title}
            </h1>
        </div>
    )
}

export default SectionHeading
