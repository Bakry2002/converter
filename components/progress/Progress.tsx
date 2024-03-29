'use client'

import { useEffect, useState } from 'react'
import ProgressController, { CONVERT_STEPS } from './ProgressController'
import {
    UXConversionStatus,
    useConversion,
    useDropzone,
} from '@/context/ConversionContext'

type progressComponentProps = {}

const ProgressComponent: React.FC<progressComponentProps> = ({}) => {
    const { conversions, updateConversion } = useConversion()
    const [step, setStep] = useState<CONVERT_STEPS>(CONVERT_STEPS.STEP_1)
    const [progressWidth, setProgressWidth] = useState('0%')
    const [hasScrolled, setHasScrolled] = useState(false)
    const [hasScrolledMobile, setHasScrolledMobile] = useState(false)
    const { open } = useDropzone()
    useEffect(() => {
        const currentConversion = conversions[0]
        // if the there is a file in the conversion, progress to the next step
        if (currentConversion?.file) {
            setStep(CONVERT_STEPS.STEP_2)
            setProgressWidth('50%')
        }
        if (
            conversions.length > 1 &&
            conversions.every((cnv) => cnv.to && cnv?.to?.mime)
        ) {
            setStep(CONVERT_STEPS.STEP_3)
            setProgressWidth('100%')
            // Handle conversion completion like download, etc...
        } else if (conversions.length === 1 && currentConversion?.to?.mime) {
            setStep(CONVERT_STEPS.STEP_3)
            setProgressWidth('100%')
            // Handle conversion completion like download, etc...
        }

        if (currentConversion?.file && !hasScrolled && window.scrollY < 220) {
            // Scroll down by 30 pixels with smooth animation
            window.scrollTo({
                top: window.scrollY + 220,
                behavior: 'smooth',
            })
            setHasScrolled(true)
        }
        // scroll more in mobile view
        if (
            window.innerWidth < 768 &&
            hasScrolledMobile &&
            window.scrollY < 480
        ) {
            window.scrollTo({
                top: window.scrollY + 480,
                behavior: 'smooth',
            })
            setHasScrolledMobile(true)
        }

        // when deleting a conversion, reset the progress bar
        if (conversions.length === 0) {
            setProgressWidth('0%')
            setStep(CONVERT_STEPS.STEP_1)
            setHasScrolled(false)
            setHasScrolledMobile(false)
        }
    }, [step, hasScrolled, hasScrolledMobile, conversions])
    return (
        // progress container
        <div className="max-w-[950px] mb-8 w-full h-auto flex flex-col justify-center">
            {/* Progress box */}
            <div className="mx-auto xmd:p-12 xmd:pb-6 pt-10 px-8 bg-white/20 w-full relative flex flex-col items-center justify-center">
                {/* progress bar container */}
                <div className="hidden xmd:block absolute left-[calc(16%+(44px/2))] w-[calc(56%+(66px/2))] text-center mx-auto h-[60px] mb-[5rem] rounded">
                    {/* progress bar */}
                    <div className="bg-neutral-300 h-4 w-full flex overflow-hidden text-sm rounded">
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
