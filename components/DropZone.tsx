'use client'

import { DropEvent, FileRejection } from 'react-dropzone'
import { useDropzone } from '@/context/ConversionContext'

type Props = {
    onDrop?: <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => void // onDrop is a function that takes an array of files and returns void
    children: React.ReactNode
    // | (({ open }: { open: () => void }) => React.ReactNode) // children can be a function that takes open as a parameter and returns a ReactNode
}
export const DropZone = ({ children }: Props) => {
    const { open, getRootProps, getInputProps, isDragActive } = useDropzone()

    // const className = [isDragActive && 'border border-blue-500']
    //     .filter(Boolean)
    //     .join(' ')

    return (
        <div {...getRootProps({})} className="outline-none">
            {isDragActive && <DragActive />}
            <input {...getInputProps()} />

            {children}
            {/* {
                typeof children === 'function' ? children({ open }) : children // if children is a function, call it with open as a parameter, otherwise return children
            } */}
        </div>
    )
}

function DragActive() {
    return (
        <div className="backdrop-blur-md bg-white/20 fixed z-50 inset-0 flex items-center justify-center">
            <h2 className="text-center font-light text-6xl">
                Drop Files Anywhere Here
            </h2>
        </div>
    )
}
