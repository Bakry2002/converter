import { cn } from '@/lib/utils'
import TextField from '../TextField'
// import { Button } from '../ui/button'
import { Button } from '@nextui-org/react'
import { formats } from '@/converter/converters/formats'
import { useState } from 'react'
import { Format } from '@/lib/types'

type SelectorProps = {
    value: string
    setValue: (format: Format) => void
}

// 3:30:00

export const Selector = ({ value, setValue }: SelectorProps) => {
    const [search, setSearch] = useState('')
    return (
        <div>
            <TextField
                placeholder="Search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
            />
            <div className="py-2">
                <ul className="grid gap-2 grid-cols-3">
                    {formats
                        .filter(
                            (format) =>
                                format.ext.includes(search) ||
                                format.mime.includes(search)
                        )
                        .map((format) => (
                            <li key={format.mime}>
                                <Button
                                    className={`rounded-3xl w-14 h-10 ${cn({
                                        'bg-emerald-500': value === format.mime,
                                    })}`}
                                    size="sm"
                                    color="secondary"
                                    onPress={() => setValue(format)}
                                >
                                    {format.ext}
                                </Button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
