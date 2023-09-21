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
    return (
        <div>
            <TextField
                placeholder="Search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="border-b pb-1"
            />
            <div className="py-2">
                <ul className="grid gap-2 grid-cols-3 place-items-center">
                    {formats
                        .filter((format) =>
                            mimeToFileExtension(format.mime).includes(search)
                        )
                        .map((format) => (
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
                        ))}
                </ul>
            </div>
        </div>
    )
}
