'use client'

import { Logo } from '@/components/Logo'
import Link from 'next/link'
import SectionHeading from './SectionHeading'
import Image from 'next/image'

interface DefinitionProps {}

const Definition: React.FC<DefinitionProps> = ({}) => {
    return (
        <section className="bg-neutral-50 p-10">
            <div className="mx-28 flex flex-row items-center justify-center gap-8">
                <div className="flex-1">
                    <SectionHeading title="What is Convert it?" />
                    <p className="text-xl font-normal leading-8 max-w-[900px] [text-wrap:balance]">
                        Convert it is a versatile and user-friendly Software as
                        a Service (SaaS) designed to convert various file
                        formats with unparalleled ease and efficiency. This tool
                        empower you to convert any file to any format, while
                        keeping the quality untouched with a few clicks.
                    </p>
                </div>
                <div>
                    <Image
                        src="/images/definition.svg"
                        width={600}
                        height={600}
                        alt="Definition"
                        quality={100}
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default Definition
