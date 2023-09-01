//this context will hold all the information about the current conversions that are happening, it will hold the files that are being converted, the status of the conversion, the progress of the conversion, and the result of the conversion

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
import axios from 'axios'
import { fileExtensionToMime } from '@/lib/file'

export enum UXConversionStatus {
    Pending,
    Uploading,
    Processing,
    Completed,
    Error,
}
export type Conversion = {
    id?: string
    file: File
    to?: string
    status: UXConversionStatus
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
                status: UXConversionStatus.Pending,
            })),
        ])
    }, [])

    const dropzone = useCreateDropzone({ onDrop, noClick: true })

    const convert = async () => {
        for (let i = 0; i < conversions.length; i++) {
            const c = conversions[i] // get the conversion at the index i
            updateConversion(i, { status: UXConversionStatus.Uploading }) // update the conversion status to PROCESSING
            try {
                const formData = new FormData()
                formData.set('file', c.file) // file is the name of the field in the form
                formData.set('to', fileExtensionToMime(c.to || '') as string) // to field

                // post the form to the api using axios postForm function to track the progress capture for the request
                const { data } = await axios.postForm('/api/upload', formData, {
                    onUploadProgress: ({ progress }) => {
                        updateConversion(i, { upload: progress })
                    }, // update the conversion upload progress
                })
                const { id } = data // get the file id from the response
                updateConversion(i, {
                    status: UXConversionStatus.Processing,
                    id,
                }) // update the conversion status to PROCESSING
                console.log('Data:', data)
            } catch (error: any) {
                updateConversion(i, {
                    status: UXConversionStatus.Error,
                    error: error,
                }) // update the conversion status to ERROR
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
