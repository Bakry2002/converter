'use client'

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
        <section className="mx-28 mt-20">
            <div className="mb-20">
                <h1 className="text-3xl font-medium">
                    How to use our Services
                </h1>
            </div>

            {/* Box steps */}
            <div className="grid grid-cols-3">
                {/* Step item */}
                {steps.map((step) => (
                    <div
                        key={step.step}
                        className="pl-[140px] pr-[50px] relative min-h-[1px]
                        before:absolute before:w-[1px] before:right-[33px] before:top-1/2 before:-mt-[38px] before:h-[100px] before:bg-[#85858580]
                        after:opacity-100 after:right-0 after:w-[18px] after:h-[18px] after:top-1/2 after:-translate-x-1/2 after:mr-[15px] after:bg-white after:border-t-1 after:border-r-1 after:absolute after:rotate-45 after:-ml-[21px] after:transition-all after:duration-150 after:border-[#85858580]
                        last-of-type:before:hidden last-of-type:after:hidden
                    "
                    >
                        {/* Step number */}
                        <span className="shadow-step opacity-100 w-[70px] h-[70px] bg-white text-primary flex items-center justify-center rounded-full text-center text-4xl font-bold absolute left-[42px]">
                            {step.step}
                        </span>
                        <h3 className="mt-1 mb-5 text-2xl font-bold text-neutral-800">
                            {step.title}
                        </h3>
                        <p className="font-light text-lg">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Usage
