'use client'

type progressComponentProps = {}

const progressComponent: React.FC<progressComponentProps> = ({}) => {
    return (
        // progress container
        <div className="max-w-[950px] w-full h-full flex justify-center">
            {/* Progress box */}
            <div className="mx-auto p-8 bg-white/40 w-full">
                {/* progress bar */}
                <div className="absolute left-[calc()]"></div>
                {/* Convert steps  */}
            </div>
        </div>
    )
}

export default progressComponent
