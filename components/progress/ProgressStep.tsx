'use client'

type ProgressStepProps = {
    stepNumber: number
    children: React.ReactNode
}

const ProgressStep: React.FC<ProgressStepProps> = ({
    stepNumber,
    children,
}) => {
    return (
        <div className="relative min-w-[240px] z-[3] flex items-center flex-col gap-12">
            {/* Step number */}
            <div className="w-[60px] h-[60px] mb-8 self-center bg-primary text-white rounded-full flex items-center justify-center text-[2rem]">
                {stepNumber}
            </div>
            {/* Step process */}
            <div className="w-full">{children}</div>
        </div>
    )
}

export default ProgressStep
