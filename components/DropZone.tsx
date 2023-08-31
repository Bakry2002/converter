import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

type Props = {
    onDrop?: <T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
    ) => void // onDrop is a function that takes an array of files and returns void
    children:
        | React.ReactNode
        | (({ open }: { open: () => void }) => React.ReactNode) // children can be a function that takes open as a parameter and returns a ReactNode
}
export const DropZone = ({ onDrop, children }: Props) => {
    const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
    })

    const className = [isDragActive && 'border border-blue-500']
        .filter(Boolean)
        .join(' ')

    return (
        <div {...getRootProps({ className })}>
            <input {...getInputProps()} />
            {
                typeof children === 'function' ? children({ open }) : children // if children is a function, call it with open as a parameter, otherwise return children
            }
        </div>
    )
}
