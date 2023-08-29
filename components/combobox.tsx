'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const formats = [
    { value: 'png', label: 'png' },
    { value: 'jpg', label: 'jpg' },
    { value: 'gif', label: 'gif' },
    { value: 'bmp', label: 'bmp' },
    { value: 'webp', label: 'webp' },
    { value: 'tiff', label: 'tiff' },
    { value: 'heic', label: 'heic' },
    { value: 'heif', label: 'heif' },
    { value: 'ico', label: 'ico' },
]

type Props = {
    value: string
    setValue: (value: string) => void
}
export function Combobox({ value, setValue }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? formats.find((format) => format.value === value)
                              ?.label
                        : 'Select format...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search formats..." />
                    <CommandEmpty>No format found.</CommandEmpty>
                    <CommandGroup>
                        {formats.map((format) => (
                            <CommandItem
                                key={format.value}
                                onSelect={(currentValue) => {
                                    setValue(
                                        currentValue === value
                                            ? ''
                                            : currentValue
                                    )
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        value === format.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    )}
                                />
                                {format.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
