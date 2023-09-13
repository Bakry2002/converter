'use client'

interface TitleProps {}

const Title: React.FC<TitleProps> = ({}) => {
    return (
        <h1 className="text-6xl text-center my-8 font-bold">
            The Guidance blog
        </h1>
    )
}

export default Title
