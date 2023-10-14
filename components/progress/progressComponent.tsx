'use client'

type progressComponentProps = {}

const progressComponent: React.FC<progressComponentProps> = ({}) => {
    return (
        // progress container
        <div className="max-w-[950px] w-full h-full flex justify-center">
            {/* Progress box */}
            <div className="mx-auto p-8 bg-white/40 w-full">
                {/* progress bar */}
                <div className="absolute left-[calc(16%+(44px/2))] w-[calc(66%+(60px/2))] top-[50px] text-center mx-auto bg-slate-500 h-[10px] mb-[5rem] rounded">
                    {/* progress bar completion */}

                    <div></div>
                </div>
                {/* Convert steps  */}
            </div>
        </div>
    )
}

export default progressComponent
