'use client'

import { useDropzone } from '@/context/ConversionContext'
import { Button } from './ui/button'

type OpenButtonProps = {
    label: string
}

export const OpenButton: React.FC<OpenButtonProps> = ({ label }) => {
    const { open } = useDropzone()

    return (
        <Button variant="default" onClick={open}>
            {label}
        </Button>
    )
}
