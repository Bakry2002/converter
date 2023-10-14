'use client'

type progressComponentProps = {}

const ProgressComponent: React.FC<progressComponentProps> = ({}) => {
    return (
        // progress container
        <div className="max-w-[950px] w-full h-full flex justify-center">
            {/* Progress box */}
            <div className="mx-auto p-8 bg-white/40 w-full">
                {/* progress bar container */}
                <div className="absolute left-[calc(16%+(44px/2))] w-[calc(66%+(60px/2))] top-[50px] text-center mx-auto h-[44px] mb-[5rem] rounded">
                    {/* progress bar */}
                    <div className="bg-slate-500 h-[10px] w-full flex overflow-hidden text-sm rounded">
                        {/* progress bar completion */}
                        <div
                            className="bg-[#5cd510] flex flex-col justify-center text-center text-white transition-all duration-700 ease-in whitespace-nowrap overflow-hidden"
                            style={{ width: '50%' }}
                        />
                    </div>
                </div>
                {/* Convert steps  */}
            </div>
        </div>
    )
}

export default ProgressComponent
