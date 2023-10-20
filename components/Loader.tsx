'use client'

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
    return (
        <div className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
    )
}

export default Loader
