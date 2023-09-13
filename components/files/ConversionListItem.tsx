'use client'

import { byteToSize } from '@/lib/file'
import { ChevronDown, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Conversion, UXConversionStatus } from '@/context/ConversionContext'
import useSWr from 'swr'
//? upcoming feature
// import { Selector } from "./selector"
import png from '@/images/png.png'
import { Combobox } from '../combobox'
import { ConversionStatus } from '@prisma/client'
import { DownloadButton } from '../DownloadButton'
import Badge from '../Badge'
import { Selector } from './Selector'
import { Format } from '@/lib/types'

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json()) // fetcher is a function that takes the arguments of the fetch function and returns a promise that resolves to the json of the response

type ConversionListItemProps = {
    conversion: Conversion
    onConvertTo: (format: Format) => void
    onRemove: () => void
    onUpdate: (conversion: Partial<Conversion>) => void
}

const ConversionListItem: React.FC<ConversionListItemProps> = ({
    conversion,
    onConvertTo,
    onRemove,
    onUpdate,
}: ConversionListItemProps) => {
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

    const [open, setOpen] = useState(false)
    const { file, to } = conversion
    //grid md:grid-cols-[48px_1fr_80px_120px_50px] grid-cols-[48px_1fr_80px_120px_50px] gap-4
    return (
        <li className="grid md:grid-cols-[48px_1fr_80px_120px_50px] md:grid-rows-1 grid-rows-2 md:gap-8 gap-2 last-of-type:border-none border-b border-b-neutral-200 md:pb-4 md:gap-y-0 gap-y-6">
            {/* File Icon */}
            <div className="px-2">
                <Image src={png} width={32} height={32} alt="PNG" />
            </div>

            {/* File Name */}
            <div className="flex flex-col md:col-span-1 col-span-3">
                <span className="">{file?.name}</span>
                <span className="text-xs text-neutral-500">
                    {byteToSize(file?.size || 0)}
                </span>
            </div>

            {/* File Status */}
            <div className="md:col-start-3 md:row-start-1 md:col-span-1 col-span-2 col-start-1 row-start-2">
                {conversion.status === UXConversionStatus.Pending && (
                    <div className="self-center">
                        <Badge className="text-gray-500">Pending</Badge>
                    </div>
                )}
                {conversion.status === UXConversionStatus.Uploading && (
                    <div className="self-center">
                        <Badge className="text-sky-500 border-sky-500">
                            Uploading: {(conversion.upload || 0) * 100}%
                        </Badge>
                    </div>
                )}
                {conversion.status === UXConversionStatus.Processing && (
                    <div className="self-center">
                        <Badge className="text-sky-500 border-sky-500">
                            Converting
                        </Badge>
                    </div>
                )}
                {conversion.status === UXConversionStatus.Error && (
                    <div className="self-center">
                        <Badge className="text-red-500 border-red-500">
                            Error
                        </Badge>
                    </div>
                )}
                {conversion.status === UXConversionStatus.Completed && (
                    <div className="self-center">
                        <Badge className="text-green-500 border-green-500">
                            Done
                        </Badge>
                    </div>
                )}
            </div>

            {/* Convert to Popover */}
            {conversion.status != UXConversionStatus.Completed && (
                <div className="md:col-start-4 col-start-4 md:col-span-1 col-span-2 md:row-start-1 row-start-2">
                    <div className="hidden md:flex justify-center">
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        disabled={
                                            conversion.status !==
                                            UXConversionStatus.Pending
                                        }
                                        className="px-2 w-full flex gap-2 items-center flex-row"
                                        variant={
                                            conversion.error
                                                ? 'destructive'
                                                : 'secondary'
                                        }
                                    >
                                        {conversion.to?.ext || 'Convert To'}
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Selector
                                        value={conversion.to?.mime || ''}
                                        setValue={onConvertTo}
                                    />
                                </PopoverContent>
                            </Popover>
                        </>
                    </div>

                    <div className="md:hidden">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="px-2 flex items-center gap-2 flex-row"
                                    variant="secondary"
                                >
                                    {conversion.to?.ext || 'Convert To'}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[calc(100%-2rem)]">
                                <div className="font-semibold text-lg">
                                    Convert To
                                </div>
                                <Selector
                                    value={conversion.to?.mime || ''}
                                    setValue={(v) => {
                                        onConvertTo(v)
                                        setOpen(false)
                                    }}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}

            {/* Cancel & Download Button */}
            <div className="flex justify-end col-start-5 md:row-start-1">
                {
                    // if the conversion status is pending or uploading or processing, then show the remove button
                    conversion.status !== UXConversionStatus.Completed ? (
                        <Button variant="default" onClick={onRemove}>
                            <XIcon className="w-4 h-4" />
                        </Button>
                    ) : (
                        <div className="flex justify-center col-span-2">
                            <DownloadButton id={conversion.id || ''} />
                        </div>
                    )
                }
            </div>
        </li>
    )
}

export default ConversionListItem
