'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Combobox } from './combobox'

type props = {
    children: React.ReactNode
    onDrop: (acceptedFiles: File[]) => void
}

export function PageDropzone({ children, onDrop }: props) {
    const {
        open,
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragReject,
        isDragAccept,
    } = useDropzone({ onDrop, noClick: true })

    const className = [isDragActive && 'border border-blue-500']
        .filter(Boolean)
        .join(' ')

    return (
        <div {...getRootProps({ className })}>
            <Button color="primary" onClick={open}>
                Click to Upload
            </Button>
        </div>
    )
}

export type FileConversion = {
    file?: File
    to?: string
    resultId?: string
}

type StagedFilesProps = {
    conversions: FileConversion[]
    setConversion: (conversions: FileConversion[]) => void // to update the conversions
    onConvert: (conversion: FileConversion) => void
}

export const StagedFiles = ({
    conversions,
    setConversion,
    onConvert,
}: StagedFilesProps) => {
    return (
        <ul className="border rounded-md p-4">
            {conversions.map((conversion, key) => (
                <li key={key} className="flex items-center gap-4 ">
                    <div>
                        {conversion.file?.name} - {conversion.file?.size} -{' '}
                        {conversion.file?.type}
                    </div>
                    <Combobox
                        value={conversion.to || ''}
                        setValue={(v) =>
                            setConversion(
                                [...conversions].map((c, i) =>
                                    i === key ? { ...c, to: v } : c
                                )
                            )
                        }
                    />
                    <span className="flex-grow" />
                    {conversion.resultId ? (
                        <a href={`/api/download/${conversion.resultId}`}>
                            Download
                        </a>
                    ) : (
                        <Button
                            variant="default"
                            onClick={() => onConvert(conversion)}
                        >
                            Convert
                        </Button>
                    )}
                </li>
            ))}
        </ul>
    )
}

// 1:15:00
