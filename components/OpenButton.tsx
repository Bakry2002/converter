'use client'

import { useDropzone } from '@/context/ConversionContext'
import { Button, ButtonProps } from './ui/button'
import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import { button } from '@nextui-org/react'

type OpenButtonProps = {
    label: string
    className?: string
    variant?: ButtonProps['variant']
}

export const OpenButton: React.FC<OpenButtonProps> = ({
    label,
    className,
    variant,
}) => {
    const { open } = useDropzone()

    return (
        <button
            type="button"
            onClick={open}
            className={cn(
                'flex flex-row items-center justify-center gap-x-2  rounded-md bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-none w-full',
                className
            )}
        >
            <Upload className="w-4 h-4 mr-2" />
            {label}
        </button>
        // <Button
        //     variant={variant}
        //     content="Click or drop files here to upload"
        //     onClick={open}
        //     className={cn('', className)}
        // >
        //     <Upload className="w-4 h-4 mr-2" />
        //     {label}
        // </Button>
    )
}
