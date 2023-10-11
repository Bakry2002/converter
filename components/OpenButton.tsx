'use client'

import { useDropzone } from '@/context/ConversionContext'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

type OpenButtonProps = {
    label: string
    className?: string
}

export const OpenButton: React.FC<OpenButtonProps> = ({ label, className }) => {
    const { open } = useDropzone()

    return (
        <Button variant="default" onClick={open} className={cn('', className)}>
            {label}
        </Button>
    )
}
