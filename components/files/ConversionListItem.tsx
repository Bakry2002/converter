'use client'

import { byteToSize } from '@/lib/file'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Conversion } from '@/context/ConversionContext'
//? upcoming feature
// import { Conversion } from "./provider"
// import { Selector } from "./selector"

import png from '@/images/png.png'

type ConversionListItemProps = {
    conversion: Conversion
    onConvertTo: (format: string) => void
    onRemove: () => void
    error: any
}

const ConversionListItem: React.FC<ConversionListItemProps> = ({
    conversion,
    onConvertTo,
    onRemove,
}: ConversionListItemProps) => {
    const [open, setOpen] = useState(false)
    const { file, to } = conversion

    return (
        <li className="grid md:grid-cols-[48px_1fr_100px_50px] grid-cols-[48px_1fr_80px_100px_50px]">
            <div className="px-2">
                <Image src={png} width={32} height={32} alt="PNG" />
            </div>
            <div className="md:col-span-1 col-span-1 flex flex-col">
                <span className="">{file.name}</span>
                <span className="text-xs text-neutral-500">
                    {byteToSize(file.size || 0)}
                </span>
            </div>
            <div className="hidden md:flex justify-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className="px-2"
                            variant={
                                conversion.error ? 'destructive' : 'secondary'
                            }
                        >
                            {conversion.to || 'Convert To'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {/* <Selector
                            value={conversion.to || ''}
                            setValue={onConvertTo}
                        /> */}
                    </PopoverContent>
                </Popover>
            </div>
            <div className="md:hidden">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="px-2" variant="secondary">
                            {conversion.to || 'Format'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[calc(100%-2rem)]">
                        <div className="font-semibold text-lg">
                            Convert to which format?
                        </div>
                        {/* <Selector
                            value={conversion.to || ''}
                            setValue={(v) => {
                                onConvertTo(v)
                                setOpen(false)
                            }}
                        /> */}
                    </DialogContent>
                </Dialog>
            </div>
            {/* {!conversion.resultId && (
                <>
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
                    <Button
                        variant="outline"
                        onClick={() => {
                            // remove the conversion from the list
                            setConversion(
                                [...conversions].filter((_, i) => i !== key)
                            )
                        }}
                    >
                        <XIcon className="w-4 h-4" />
                    </Button>
                </>
            )} */}
            <div className="flex items-center justify-end">
                <Button variant="default" onClick={onRemove}>
                    <XIcon className="w-4 h-4" />
                </Button>
            </div>
            {/* <DownloadButton resultId={conversion.resultId} /> */}
        </li>
    )
}

export default ConversionListItem
