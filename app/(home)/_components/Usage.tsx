'use client'

import SectionHeading from './SectionHeading'

interface UsageProps {}

const Usage: React.FC<UsageProps> = ({}) => {
    const steps = [
        {
            step: 1,
            title: 'Step 1',
            description:
                'Click on the Choose file(s) button and select the file(s) you want to convert on your computer, cloud storage or insert the url.',
        },
        {
            step: 2,
            title: 'Step 2',
            description:
                'Choose the format you want to convert the file(s) to.',
            // Click the Convert button and wait a second while the conversion is in progress.
        },
        {
            step: 3,
            title: 'Step 3',
            description:
                'Now click the Download button to get the resulting JPG file on your computer.',
        },
    ]
    return (
        <section className="bg-neutral-50 p-10">
            <div className="mx-28 mt-10 flex flex-col justify-center gap-8">
                <SectionHeading title="How to use Our services" />

                {/* Box steps */}
                <div className="grid grid-cols-1 xl:grid-cols-3">
                    {/* Step item */}
                    {steps.map((step) => (
                        <div
                            key={step.step}
                            className="pl-[100px] xl:pl-[130px] pr-4 pb-6 xl:pb-0 relative min-h-[1px] mb-12 xl:m-0
                        before:absolute before:w-full xl:before:w-[1px] before:right-0 before:top-auto before:bottom-0 before:-mt-[38px] before:h-[1px] xl:before:h-full before:bg-[#85858580]
                        after:opacity-100 after:right-1/2 xl:after:right-[-33px] after:w-[18px] after:h-[18px] after:top-auto after:-bottom-[9px] xl:after:bottom-auto xl:after:top-1/2 xl:after:-translate-x-1/2 xl:after:-translate-y-1/2 after:mr-0 xl:after:mr-[15px] after:bg-white after:border-b-1 xl:after:border-b-0 xl:after:border-t-1 after:border-r-1 after:absolute after:rotate-45 after:-ml-[21px] after:transition-all after:duration-150 after:border-[#85858580]
                        last-of-type:before:hidden last-of-type:after:hidden
                    "
                        >
                            <div className="xl:flex xl:justify-center xl:items-baseline flex-col">
                                {/* Step number */}
                                <span className="shadow-step opacity-100 w-[70px] h-[70px] bg-white text-primary flex items-center justify-center rounded-full text-center text-4xl font-bold absolute left-0 xl:left-[42px]">
                                    {step.step}
                                </span>
                                <h3 className="mt-1 mb-5 text-2xl font-bold text-neutral-800">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="font-light text-lg">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Usage
