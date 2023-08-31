//this context will hold all the information about the current conversions that are happening, it will hold the files that are being converted, the status of the conversion, the progress of the conversion, and the result of the conversion

import { ConversionStatus } from '@prisma/client'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from 'react'
import { DropzoneState, useDropzone as useCreateDropzone } from 'react-dropzone'
import { createContext } from 'react'
import { useRouter } from 'next/navigation'

export type Conversion = {
    id?: string
    file: File
    to?: string
    status: ConversionStatus
    upload?: number
    error?: any
}

export type ConversionContextProps = {
    dropzone: DropzoneState
    conversions: Conversion[]
    setConversions: Dispatch<SetStateAction<Conversion[]>> // to update the conversions, what is Dispatch<SetStateAction<Conversion[]>>? it is a function that takes a Conversion[] and returns a Conversion[]
    removeConversion: (index: number) => void
    updateConversion: (index: number, conversion: Partial<Conversion>) => void // what is Partial<Conversion>? it is a type that takes a Conversion and makes all the properties optional
    convert: () => Promise<void>
}

const ConversionContext = createContext<ConversionContextProps>(
    {} as unknown as ConversionContextProps
)

type props = {
    children: React.ReactNode
}

export const useConversion = () => useContext(ConversionContext) // this is a hook that returns the ConversionContext
export const useDropzone = () => useContext(ConversionContext).dropzone // this is a hook that returns the dropzone

export const ConversionProvider = ({ children }: props) => {
    const [conversions, setConversions] = useState<Conversion[]>([])
    const router = useRouter()

    // what this function do is that it takes the conversions and returns a new array with the conversions before the index and the conversions after the index, so it removes the conversion at the index
    const removeConversion = (index: number) => {
        setConversions((conversions) => [
            ...conversions.slice(0, index), // get the conversions before the index
            ...conversions.slice(index + 1), // get the conversions after the index
        ])
    }

    const updateConversion = (
        index: number,
        conversion: Partial<Conversion>
    ) => {
        setConversions((conversions) => [
            ...conversions.slice(0, index), // get the conversions before the index
            { ...conversions[index], ...conversion }, // update the conversion at the index
            ...conversions.slice(index + 1), // get the conversions after the index
        ])
    }

    // what this onDrop function do is that it takes the files and add them to the conversions with status PENDING
    const onDrop = useCallback((files: File[]) => {
        setConversions((conversions) => [
            ...conversions,
            ...files.map((file) => ({
                file,
                status: ConversionStatus.PENDING,
            })),
        ])
    }, [])

    const dropzone = useCreateDropzone({ onDrop, noClick: true })

    const convert = async () => {
        for (let i = 0; i < conversions.length; i++) {
            const c = conversions[i] // get the conversion at the index i
            updateConversion(i, { status: ConversionStatus.PROCESSING }) // update the conversion status to PROCESSING
            try {
                const formData = new FormData()
                formData.set('file', c.file) // file is the name of the field in the form
                formData.set('to', c.to || '') // to field

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                if (!res.ok) throw new Error('Field to upload') // handle error
                const data = await res.json() // get the file id from the response
            } catch (error: any) {
                console.error(error)
            }
        }
    }

    return (
        <ConversionContext.Provider
            value={{
                dropzone,
                conversions,
                setConversions,
                removeConversion,
                updateConversion,
                convert,
            }}
        >
            {children}
        </ConversionContext.Provider>
    )
}
