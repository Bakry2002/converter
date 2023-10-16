'use client'

import { mimeToFileExtension } from '@/lib/file'
import { ChevronDown, Upload } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
    Conversion,
    UXConversionStatus,
    useConversion,
} from '@/context/ConversionContext'
import useSWr from 'swr'
import { ConversionStatus } from '@prisma/client'
import { Selector } from '../files/Selector'
import { OpenButton } from '../OpenButton'
import z from 'zod'
import ProgressStep from './ProgressStep'

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
        <div className="grid grid-cols-3 gap-8">
            {/* STEP 1, 2, 3  */}
            <ProgressStep stepNumber={1}>
                <OpenButton
                    label="Choose file"
                    className="tracking-wide h-10 "
                    variant="default"
                />
            </ProgressStep>
            <ProgressStep stepNumber={2}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={
                                conversion?.status !==
                                UXConversionStatus.Pending
                            }
                            className="px-2 w-full flex gap-2 items-center flex-row uppercase"
                            variant={
                                conversion?.error ? 'destructive' : 'secondary'
                            }
                        >
                            {conversion?.to?.mime ? (
                                mimeToFileExtension(conversion.to.mime)
                            ) : (
                                <span className="capitalize">Convert To</span>
                            )}
                            {!conversion?.to?.mime && (
                                <ChevronDown className="w-4 h-4" />
                            )}
                        </Button>
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
                <Button
                    color="primary"
                    className="bg-neutral-900 text-white p-2 rounded-md w-full"
                    onClick={() => validate()}
                    disabled={
                        !conversions.some(
                            (conversion) =>
                                conversion.status !==
                                UXConversionStatus.Completed
                        ) || !conversion?.to?.mime
                    }
                >
                    Convert
                </Button>
            </ProgressStep>
        </div>
    )
}

export default ProgressController
