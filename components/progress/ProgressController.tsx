'use client'

import { mimeToFileExtension } from '@/lib/file'
import { CheckCheck, ChevronDown, ShieldCheck, Upload } from 'lucide-react'
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
import {
    checkValidFormatsToConvertTo,
    iconHandler,
} from '../files/ConversionListItem'
import { lookup } from 'mime-types'

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
    step = CONVERT_STEPS.STEP_1,
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
    const validFormats = checkValidFormatsToConvertTo(
        conversion?.file,
        lookup(conversion?.file.name) || ''
    )

    return (
        <div className="grid xmd:grid-cols-3 xmd:grid-rows-1 grid-rows-3 xmd:w-auto  w-full xmd:gap-8 gap-8">
            {/* STEP 1, 2, 3  */}
            <ProgressStep
                stepNumber={1}
                isStepFinished={step !== CONVERT_STEPS.STEP_1}
            >
                <div className="flex items-center flex-col justify-center">
                    <span
                        className={`mb-2 xmd:hidden text-center text-lg items-center flex-row gap-4 flex justify-center font-light text-white transition-opacity`}
                    >
                        First, Select a file(s) to convert{' '}
                        <CheckCheck
                            className={
                                conversion?.file ? 'opacity-100' : 'opacity-0'
                            }
                        />
                    </span>
                    <CustomButton
                        label="Choose File(s)"
                        className={`text-white ${
                            step === CONVERT_STEPS.STEP_1
                                ? 'bg-primary animate-button-shadow'
                                : 'bg-neutral-100 text-black'
                        }`}
                        onClick={open}
                        icon={Upload}
                    />
                </div>
            </ProgressStep>

            <ProgressStep
                stepNumber={2}
                isStepFinished={
                    step !== CONVERT_STEPS.STEP_2 &&
                    step !== CONVERT_STEPS.STEP_1
                }
            >
                <span
                    className={`mb-2 xmd:hidden text-center text-lg items-center flex-row gap-4 flex justify-center font-light text-white transition-opacity`}
                >
                    Second, Select a format to convert to{' '}
                    <CheckCheck
                        className={
                            conversion?.to?.mime ? 'opacity-100' : 'opacity-0'
                        }
                    />
                </span>
                {conversions.length > 1 ? (
                    <button
                        className={`flex flex-row h-14 items-center justify-center gap-x-2 tracking-wide text-xl font-medium rounded-md hover:opacity-90 text-neutral-900 focus:outline-none w-full transition-all duration-250 ${
                            step === CONVERT_STEPS.STEP_2
                                ? 'bg-primary text-white animate-button-shadow'
                                : 'bg-neutral-100'
                        }`}
                        disabled={
                            conversion?.status !== UXConversionStatus.Pending
                        }
                    >
                        {`${conversions.filter((cnv) => cnv.to).length} / ${
                            conversions.length
                        } selected formats`}
                    </button>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className={`flex flex-row h-14 items-center uppercase justify-center gap-x-2 tracking-wide text-xl font-medium rounded-md hover:opacity-90 text-neutral-900 w-full transition-all duration-250 ${
                                    step === CONVERT_STEPS.STEP_2
                                        ? 'bg-primary text-white animate-button-shadow'
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
                                        convert To{' '}
                                        <ChevronDown className=" ml-2" />
                                    </span>
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Selector
                                formats={validFormats}
                                value={conversion?.to?.mime || ''}
                                setValue={onConvertTo}
                            />
                        </PopoverContent>
                    </Popover>
                )}
            </ProgressStep>

            <ProgressStep
                stepNumber={3}
                isStepFinished={
                    conversion?.status === UXConversionStatus.Completed
                }
            >
                <span
                    className={`mb-2 xmd:hidden text-center text-lg items-center flex-row gap-4 flex justify-center font-light text-white transition-opacity`}
                >
                    Finally, Start converting{' '}
                </span>
                <CustomButton
                    label="Convert"
                    className={
                        step === CONVERT_STEPS.STEP_3 &&
                        conversion?.status !== UXConversionStatus.Completed
                            ? 'bg-primary text-white animate-button-shadow'
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
