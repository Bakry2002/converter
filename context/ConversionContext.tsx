//this context will hold all the information about the current conversions that are happening, it will hold the files that are being converted, the status of the conversion, the progress of the conversion, and the result of the conversion

import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import { DropzoneState, useDropzone as useCreateDropzone } from 'react-dropzone'
import { createContext } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { set } from 'zod'

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
    to?: { mime: string } | null
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(false) // Add a state for button disabled state

    const router = useRouter()

    // what this function do is that it takes the conversions and returns a new array with the conversions before the index and the conversions after the index, so it removes the conversion at the index
    const removeConversion = (index: number) => {
        setConversions((conversions) => [
            ...conversions.slice(0, index), // get the conversions before the index
            ...conversions.slice(index + 1), // get the conversions after the index
        ])
    }

    // // what this onDrop function do is that it takes the files and add them to the conversions with status PENDING
    // const onDrop = useCallback((files: File[]) => {
    //     setConversions((conversions) => [
    //         ...conversions,
    //         ...files.map((file) => ({
    //             file,
    //             status: UXConversionStatus.Pending,
    //         })),
    //     ])
    // }, [])
    const onDrop = useCallback(async (files: File[]) => {
        for (const file of files) {
            setConversions((conversions) => [
                ...conversions,
                {
                    file,
                    to: null, // null for now
                    status: UXConversionStatus.Pending,
                },
            ])
        }
    }, [])

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

    useEffect(() => {
        // Check if any conversion is not in "Pending" status
        const isAnyConversionNotPending = conversions.some(
            (conversion) => conversion.status !== UXConversionStatus.Pending
        )
        setIsButtonDisabled(isAnyConversionNotPending)
    }, [conversions]) // Watch for changes in the conversions array

    const dropzone = useCreateDropzone({ onDrop, noClick: true }) // this is the dropzone that will be used in the app

    const convert = async () => {
        for (let i = 0; i < conversions.length; i++) {
            const c = conversions[i] // get the conversion at the index i
            updateConversion(i, { status: UXConversionStatus.Uploading }) // update the conversion status to PROCESSING
            try {
                const formData = new FormData()
                formData.set('file', c.file) // file is the name of the field in the form
                formData.set('to', c.to?.mime || '') // to field
                console.log('file:', c.file)
                console.log('to:', c.to?.mime || '')
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

                // now, if more than one file is uploaded, we need to make this processing in sequence, so we need to wait for the first file to be processed before processing the next one
                // we are going to use do while loop to wait for the file to be processed, then we will update the conversion status to COMPLETED, and then we will process the next file
                let done = false
                do {
                    const { data } = await axios.get(`/api/status/${id}`) // get the status of the file
                    done = data.status === 'DONE' // if the status of the file is DONE, then we are done, otherwise we are still processing
                    updateConversion(i, {
                        status:
                            data.status === 'DONE'
                                ? UXConversionStatus.Completed
                                : UXConversionStatus.Processing,
                    }) // if the status of the file is DONE, then we are done, otherwise we are still processing
                    await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for 1 second to check the status again
                } while (!done) // if we are not done, then we will do the loop again, and if we are done, then we will exit the loop
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
