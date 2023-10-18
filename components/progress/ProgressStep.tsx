'use client'

import { Check } from 'lucide-react'

type ProgressStepProps = {
    stepNumber: number
    children: React.ReactNode
    isStepFinished: boolean
}

const ProgressStep: React.FC<ProgressStepProps> = ({
    stepNumber,
    children,
    isStepFinished,
}) => {
    return (
        <div className="relative min-w-[260px] z-[3] justify-center flex items-center flex-col gap-12">
            {/* Step number */}
            <div
                className={`hidden xmd:flex w-[65px] h-[65px] mb-8 self-center bg-primary ${
                    isStepFinished && 'border-3 border-neutral-200'
                } text-white rounded-full items-center justify-center text-[2rem]`}
            >
                {
                    // if the step is finished, show the check icon
                    isStepFinished ? <Check className="w-8 h-8" /> : stepNumber
                }
            </div>
            {/* Step process */}
            <div className="w-full">{children}</div>
        </div>
    )
}

export default ProgressStep
