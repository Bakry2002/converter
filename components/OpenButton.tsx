'use client'

import { useDropzone } from '@/context/ConversionContext'
import { Button } from './ui/button'

interface OpenButtonProps {}

export const OpenButton: React.FC<OpenButtonProps> = ({}) => {
    const { open } = useDropzone()

    return (
        <Button variant="default" onClick={open}>
            Click to Upload
        </Button>
    )
}
