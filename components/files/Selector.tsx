import { cn } from '@/lib/utils'
import TextField from '../TextField'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

import { mimeToFileExtension } from '@/lib/file'
import { MimeNode } from '@/converter/types'
import { formats } from '@/converter/converters/formats'

type SelectorProps = {
    value: string
    setValue: (node: MimeNode) => void
}

export const Selector = ({ value, setValue }: SelectorProps) => {
    const [search, setSearch] = useState('')
    const uniqueMimeValues = new Set() // Set is a collection of unique values of the format.mime
    return (
        <div>
            <TextField
                placeholder="Search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="border-b pb-1"
            />
            <div className="py-2">
                <ul className="grid gap-2 grid-cols-4 place-items-center">
                    {formats.map((format) => {
                        if (
                            !uniqueMimeValues.has(format.mime) &&
                            format.mime.includes(search)
                        ) {
                            uniqueMimeValues.add(format.mime)

                            return (
                                <li key={format.mime}>
                                    <Button
                                        className={`rounded-3xl w-14 h-10 uppercase ${cn(
                                            {
                                                'bg-emerald-500':
                                                    value === format.mime,
                                            }
                                        )}`}
                                        size="sm"
                                        onPress={() => setValue(format)}
                                    >
                                        {mimeToFileExtension(format.mime)}
                                    </Button>
                                </li>
                            )
                        }

                        return null // Skip rendering for duplicates or formats that don't match the search
                    })}
                </ul>
            </div>
        </div>
    )
}
