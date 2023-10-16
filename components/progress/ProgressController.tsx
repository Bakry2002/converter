'use client'

import { mimeToFileExtension } from '@/lib/file'
import { ChevronDown, ShieldCheck, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
    Conversion,
    UXConversionStatus,
    useConversion,
    useDropzone,
} from '@/context/ConversionContext'
import useSWr from 'swr'
import { ConversionStatus } from '@prisma/client'
import { Selector } from '../files/Selector'
import { CustomButton } from '../CustomButton'
import z from 'zod'
import ProgressStep from './ProgressStep'
import { DownloadButton } from '../DownloadButton'
import Link from 'next/link'

export enum CONVERT_STEPS {
    STEP_1 = 'Upload',
    STEP_2 = 'Choose',
    STEP_3 = 'Convert',
}

type ProgressControllerProps = {
    conversion: Conversion
    onConvertTo: (format: { mime: string }) => void
    onUpdate: (conversion: Partial<Conversion>) => void
    progressWidth: string
    step: CONVERT_STEPS
}

// the schema is a zod schema that takes an array of objects that have a property to that is an object that has a property mime that is a string and a property ext that is a string
const schema = z.array(
    z.object({
        to: z.object({
            mime: z.string(),
        }),
    })
)

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json()) // fetcher is a function that takes the arguments of the fetch function and returns a promise that resolves to the json of the response

const ProgressController: React.FC<ProgressControllerProps> = ({
    conversion,
    onConvertTo,
    onUpdate,
    progressWidth,
    step,
}) => {
    const { conversions, updateConversion, convert } = useConversion()
    const { open } = useDropzone()
    const { data } = useSWr(
        () =>
            conversion.id && conversion.status !== UXConversionStatus.Completed
                ? `/api/status/${conversion.id}`
                : null,
        fetcher,
        { refreshInterval: 1000 } // refreshInterval is a property that takes a number and refreshes the data every x milliseconds
    ) // useSWr is a hook that takes a function that returns a string and a function that takes the arguments of the fetch function and returns a promise that resolves to the json of the response and returns the data of the response
    // what is useful for is that it fetches the data and caches it, so if the data is already fetched it will return the cached data
    useEffect(() => {
        if (data?.status === ConversionStatus.DONE) {
            onUpdate({ status: UXConversionStatus.Completed })
        }
    }, [data?.status])

    const validate = () => {
        const result = schema.safeParse(conversions) // safeParse is a function that takes a schema and returns a result
        console.log('result', result)
        if (!result.success) {
            // if the result is not successful and there is  a error in one of the conversions
            // loop over the issues and log them
            for (const issue of result.error.issues) {
                updateConversion(issue.path[0] as number, {
                    error: issue.message,
                }) // update the conversion at the index e.path[0] with the error message
                console.log('Error:', issue)
            }
            return
        }
        // after the validation being successful, we can convert the files
        convert()
    }

    return (
        <div className="grid xmd:grid-cols-3 xmd:grid-rows-1 grid-rows-3 xmd:w-auto  w-full xmd:gap-8 gap-10">
            {/* STEP 1, 2, 3  */}
            <ProgressStep stepNumber={1}>
                <div className="flex items-center flex-col justify-center">
                    <p className="mb-4 xmd:hidden text-center text-lg font-light text-white">
                        First, Select a file(s) to convert
                    </p>
                    <CustomButton
                        label="Choose file"
                        className={` text-white ${
                            conversion?.file
                                ? 'bg-neutral-100 text-black'
                                : 'bg-primary'
                        }`}
                        onClick={open}
                        icon={Upload}
                    />
                    <Link
                        href=""
                        className="flex items-center xmd:order-1 order-2 mt-2 justify-center text-center underline text-white font-medium"
                    >
                        <ShieldCheck className="w-5 h-5 mr-2" />
                        How are my files protected?
                    </Link>
                </div>
            </ProgressStep>

            <ProgressStep stepNumber={2}>
                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className={`flex flex-row xmd:h-12 h-14 items-center uppercase justify-center gap-x-2 tracking-wide text-xl font-medium rounded-md hover:opacity-90 text-neutral-900 focus:bg-neutral-200 focus:outline-none w-full transition-all duration-250 ${
                                step === CONVERT_STEPS.STEP_2 &&
                                !conversion?.to?.mime
                                    ? 'bg-primary text-white'
                                    : 'bg-neutral-100'
                            }`}
                            disabled={
                                conversion?.status !==
                                UXConversionStatus.Pending
                            }
                        >
                            {conversion?.to?.mime ? (
                                mimeToFileExtension(conversion.to.mime)
                            ) : (
                                <span className="capitalize flex items-center justify-center">
                                    convert To <ChevronDown />
                                </span>
                            )}
                        </button>
                        {/* <CustomButton
                            label={
                                conversion?.to?.mime ? (
                                    conversion.to.mime
                                ) : (
                                    <span className="flex items-center justify-center">
                                        convert To <ChevronDown />
                                    </span>
                                )
                            }
                            disabled={
                                conversion?.status !==
                                UXConversionStatus.Pending
                            }
                            variant={conversion?.error ? 'danger' : ''}
                        /> */}
                    </PopoverTrigger>
                    <PopoverContent>
                        <Selector
                            value={conversion?.to?.mime || ''}
                            setValue={onConvertTo}
                        />
                    </PopoverContent>
                </Popover>
            </ProgressStep>

            <ProgressStep stepNumber={3}>
                <CustomButton
                    label="Convert"
                    className={
                        conversion?.to?.mime && step === CONVERT_STEPS.STEP_2
                            ? 'bg-primary text-white'
                            : 'bg-neutral-100'
                    }
                    onClick={() => validate()}
                    disabled={
                        !conversions.some(
                            (conversion) =>
                                conversion.status !==
                                UXConversionStatus.Completed
                        ) || !conversion?.to?.mime
                    }
                />
            </ProgressStep>
        </div>
    )
}

export default ProgressController
