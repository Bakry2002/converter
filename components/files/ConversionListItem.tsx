'use client'

import { byteToSize, mimeToFileExtension } from '@/lib/file'
import {
    ChevronDown,
    FileAudio,
    FileBox,
    FileImage,
    FileText,
    FileVideo,
    Trash2,
    icons,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
    Conversion,
    UXConversionStatus,
    useConversion,
} from '@/context/ConversionContext'
import useSWr from 'swr'
import { ConversionStatus } from '@prisma/client'
import { DownloadButton } from '../DownloadButton'
import Badge from '../Badge'
import { Selector } from './Selector'
import { extension, lookup } from 'mime-types'
import { nodes as imageNodes } from '@/converter/converters/image/nodes'
import { mainNode as mainImageNodes } from '@/converter/converters/image/nodes'
import { mainNode as mainAudioNodes } from '@/converter/converters/audio/nodes'
import { mainNode as mainVideoNodes } from '@/converter/converters/video/nodes'
import { mainNode as mainDocumentNodes } from '@/converter/converters/docs/nodes'
import { mainNode as mainEbookNodes } from '@/converter/converters/ebook/nodes'
import { mainNode as mainArchiveNodes } from '@/converter/converters/archive/nodes'
import { mainNode as mainPresentationNodes } from '@/converter/converters/presentation/nodes'
import { nodes as videoNodes } from '@/converter/converters/video/nodes'
import { nodes as audioNodes } from '@/converter/converters/audio/nodes'
import { nodes as documentsNodes } from '@/converter/converters/docs/nodes'
import { nodes as ebookNodes } from '@/converter/converters/ebook/nodes'
import { nodes as ocrNodes } from '@/converter/converters/OCR/nodes'
import { nodes as presentationNodes } from '@/converter/converters/presentation/nodes'
import { nodes as archiveNodes } from '@/converter/converters/archive/nodes'
import { formats } from '@/converter/converters/formats'
import { MimeNode } from '@/converter/types'

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json()) // fetcher is a function that takes the arguments of the fetch function and returns a promise that resolves to the json of the response

type ConversionListItemProps = {
    conversion: Conversion
    onConvertTo: (format: { mime: string }) => void
    onRemove: () => void
    onUpdate: (conversion: Partial<Conversion>) => void
}

export const checkValidFormatsToConvertTo = (
    file: File,
    mime: string
): MimeNode[] => {
    // Create an object to map format categories to their corresponding nodes
    const formatCategories: Record<string, MimeNode[]> = {
        Image: mainImageNodes,
        Video: mainVideoNodes,
        Ebook: mainEbookNodes,
        Audio: mainAudioNodes,
        Document: mainDocumentNodes,
        Presentation: mainPresentationNodes,
        Archive: mainArchiveNodes,
    }
    const validFormats: Record<string, MimeNode[]> = {
        Image: imageNodes,
        Video: videoNodes,
        Ebook: ebookNodes,
        Audio: audioNodes,
        Document: documentsNodes,
        Presentation: presentationNodes,
        Archive: archiveNodes,
    }

    // Find the matching category for the given MIME type
    const category = Object.keys(formatCategories).find((category) => {
        return formatCategories[category].some(
            (ext) => extension(ext.mime) === extension(mime)
        )
    })

    if (category) {
        // Get the category-specific nodes
        const nodes = validFormats[category]

        // Check if the MIME type is supported within the category
        const valid = nodes.find((node) => node.mime === lookup(file?.name))

        if (!valid) {
            //! FOR DEBUGGING PURPOSES
            // console.log(
            //     `It's not a ${category.toLowerCase()}, or the format is not supported`
            // )
            return []
        }

        //! FOR DEBUGGING PURPOSES
        // console.log(
        //     `IT'S A ${category.toUpperCase()}, with the MIME type of ${lookup(
        //         file.name
        //     )}`
        // )
        return [...nodes]
    }

    //! FOR DEBUGGING PURPOSES
    // console.log(`MIME type not recognized or supported: ${mime}`)
    return []
}

type ValidFormatsProps = {
    mime: string
}[]

export const iconHandler = (validFormats: ValidFormatsProps) => {
    const icons: any = {
        image: <FileImage className="w-4 h-4" />,
        video: <FileVideo className="w-4 h-4" />,
        audio: <FileAudio className="w-4 h-4" />,
        ebook: <FileBox className="w-4 h-4" />,
        text: <FileText className="w-4 h-4" />,
        presentation: <FileImage className="w-4 h-4" />,
        archive: <FileImage className="w-4 h-4" />,
    }

    const result: JSX.Element[] = []

    validFormats.forEach((format) => {
        const mime = format?.mime

        // Check if the MIME type is recognized and has an associated icon
        if (icons[mime]) {
            result.push(icons[mime])
        } else {
            // If not recognized, use a default icon
            result.push(<FileImage className="w-4 h-4" />)
        }
    })

    return result
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
    const { file } = conversion
    const fileMime: any = lookup(conversion.file?.name)
    const { conversions } = useConversion()

    const validFormats = checkValidFormatsToConvertTo(
        file,
        lookup(file?.name) || ''
    )

    return (
        <>
            <li
                className={`grid md:grid-cols-[40px_1fr_80px_130px_48px] grid-cols-[40px_1fr_80px_130px_100px]  md:grid-rows-1 grid-rows-2 md:gap-8 gap-2 last-of-type:border-none border-b border-b-neutral-200 p-4 md:gap-y-0 gap-y-6`}
            >
                {/* File Icon */}
                <div className="flex items-center md:justify-center justify-normal">
                    {imageNodes.find((node) => node.mime === fileMime) ? (
                        <Image
                            src={
                                `/images/file_type_icons/${extension(
                                    fileMime
                                )}.png` || 'images/file_type_icons/default.png'
                            }
                            width={45}
                            height={45}
                            alt="Icon"
                        />
                    ) : (
                        <Image
                            src={'/images/file_type_icons/default.png'}
                            width={45}
                            height={45}
                            alt="Icon"
                        />
                    )}
                </div>

                {/* File Name */}
                <div className="flex flex-col md:col-span-1 col-span-2 md:-ml-6">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <>{file?.name}</>
                    </span>
                    <span className="text-xs text-neutral-500">
                        {byteToSize(file?.size || 0)}
                    </span>
                </div>

                {/* File Status */}
                <div className="md:col-start-3 md:row-start-1 md:col-span-1 col-span-2 col-start-1 col-end-5 row-start-2 flex items-center md:justify-center justify-normal w-full h-full">
                    {conversion.status === UXConversionStatus.Pending && (
                        <div className="self-center w-full">
                            <Badge className="text-gray-500">Pending</Badge>
                        </div>
                    )}
                    {conversion.status === UXConversionStatus.Uploading && (
                        <div className="self-center w-full">
                            <Badge className="text-sky-500 border-sky-500">
                                {((conversion.upload || 0) * 100).toFixed(0)}%
                            </Badge>
                        </div>
                    )}
                    {conversion.status === UXConversionStatus.Processing && (
                        <div className="self-center w-full">
                            <Badge className="text-sky-500 border-sky-500">
                                Converting
                            </Badge>
                        </div>
                    )}
                    {conversion.status === UXConversionStatus.Error && (
                        <div className="self-center w-full">
                            <Badge className="text-red-500 border-red-500">
                                Error
                            </Badge>
                        </div>
                    )}
                    {conversion.status === UXConversionStatus.Completed && (
                        <div className="self-center w-full">
                            <Badge className="text-green-500 border-green-500">
                                Done
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Convert to Popover */}
                {conversions.length > 1 &&
                    conversion.status != UXConversionStatus.Completed && (
                        <div className="md:col-start-4 col-start-4 md:col-span-1 col-span-2 md:row-start-1 row-start-1 justify-self-end md:justify-normal md:w-full">
                            <div className="hidden md:flex justify-center">
                                <>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={
                                                    conversion.status !==
                                                    UXConversionStatus.Pending
                                                }
                                                className={`px-2 w-full text-base flex gap-2 items-center flex-row uppercase ${
                                                    conversion?.to?.mime
                                                        ? 'text-neutral-100 bg-primary hover:bg-primary'
                                                        : 'text-neutral-900 '
                                                }`}
                                                variant={
                                                    conversion.error
                                                        ? 'destructive'
                                                        : 'secondary'
                                                }
                                            >
                                                {conversion.to?.mime ? (
                                                    mimeToFileExtension(
                                                        conversion.to.mime
                                                    )
                                                ) : (
                                                    <span className="capitalize">
                                                        Convert To
                                                    </span>
                                                )}
                                                {!conversion.to?.mime && (
                                                    <ChevronDown className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Selector
                                                formats={validFormats}
                                                value={
                                                    conversion.to?.mime || ''
                                                }
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
                                            className=""
                                            variant="secondary"
                                        >
                                            {conversion.to?.mime
                                                ? mimeToFileExtension(
                                                      conversion.to.mime
                                                  )
                                                : 'Convert To'}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[calc(100%-2rem)]">
                                        <div className="font-semibold text-lg">
                                            Convert To
                                        </div>
                                        <Selector
                                            formats={
                                                validFormats.length > 0
                                                    ? validFormats
                                                    : []
                                            }
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
                <div
                    className={`col-start-5 md:row-start-1 row-start-2 ${
                        conversion.status === UXConversionStatus.Completed
                            ? ''
                            : 'justify-self-end'
                    }`}
                >
                    {
                        // if the conversion status is pending or uploading or processing, then show the remove button
                        conversion.status !== UXConversionStatus.Completed ? (
                            <Button
                                variant="destructive"
                                onClick={onRemove}
                                className="w-10 h-10 px-0 rounded-full"
                            >
                                {/* <XIcon className="w-4 h-4" /> */}
                                <Trash2 className="w-6 h-6" />
                            </Button>
                        ) : (
                            <div className="flex justify-center col-span-2">
                                <DownloadButton id={conversion.id || ''} />
                            </div>
                        )
                    }
                </div>
            </li>
        </>
    )
}

export default ConversionListItem
