'use client'

import { useEffect, useState } from 'react'
import { CustomButton } from '../CustomButton'
import ProgressController, { CONVERT_STEPS } from './ProgressController'
import { Conversion } from '@prisma/client'
import { UXConversionStatus, useConversion } from '@/context/ConversionContext'
import z from 'zod'

type progressComponentProps = {}

const ProgressComponent: React.FC<progressComponentProps> = ({}) => {
    const { conversions, updateConversion } = useConversion()
    const [step, setStep] = useState<CONVERT_STEPS>(CONVERT_STEPS.STEP_1)
    const [progressWidth, setProgressWidth] = useState('0%')

    useEffect(() => {
        const currentConversion = conversions[0]
        // if the there is a file in the conversion, progress to the next step
        if (currentConversion?.file) {
            setStep(CONVERT_STEPS.STEP_2)
            setProgressWidth('50%')
            console.log('STEP: ', step)
        }
        if (currentConversion?.status === UXConversionStatus.Completed) {
            setStep(CONVERT_STEPS.STEP_3)
            setProgressWidth('100%')
            console.log('STEP: ', step)
            // handle conversion completion like download, etc...
        }

        if (currentConversion?.status === UXConversionStatus.Pending) {
            // Scroll down by 30 pixels with smooth animation
            window.scrollTo({
                top: window.scrollY + 200,
                behavior: 'smooth',
            })
        }
    }, [conversions[0]?.status, step])
    return (
        // progress container
        <div className="max-w-[950px] mb-8 w-full h-auto flex justify-center">
            {/* Progress box */}
            <div className="mx-auto p-8 bg-white/40 w-full relative flex flex-col items-center justify-center">
                {/* progress bar container */}
                <div className="absolute left-[calc(16%+(44px/2))] w-[calc(56%+(66px/2))] text-center mx-auto h-[60px] mb-[5rem] rounded">
                    {/* progress bar */}
                    <div className="bg-slate-500 h-4 w-full flex overflow-hidden text-sm rounded">
                        {/* progress bar completion */}
                        <div
                            className="bg-primary rounded flex flex-col justify-center text-center text-white transition-all duration-700 ease-in whitespace-nowrap overflow-hidden progress-bar-stripes"
                            style={{ width: progressWidth }}
                        />
                    </div>
                </div>
                <ProgressController
                    conversion={conversions[0]}
                    onConvertTo={(to) => {
                        updateConversion(0, { to })
                    }}
                    progressWidth={progressWidth}
                    onUpdate={(c) => updateConversion(0, c)}
                    step={step}
                />
            </div>
        </div>
    )
}

export default ProgressComponent
