import { cn } from '@/lib/utils'
import TextField from '../TextField'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

import { mimeToFileExtension } from '@/lib/file'
import { MimeNode } from '@/converter/types'
import { formats } from '@/converter/converters/formats'
import { nodes as imageNodes } from '@/converter/converters/image/nodes'
import { nodes as videoNodes } from '@/converter/converters/video/nodes'
import { nodes as audioNodes } from '@/converter/converters/audio/nodes'
import { nodes as ebookNodes } from '@/converter/converters/ebook/nodes'
import { nodes as documentNodes } from '@/converter/converters/docs/nodes'
import { useConversion } from '@/context/ConversionContext'
import { Search } from 'lucide-react'

type SelectorProps = {
    value: string
    setValue: (node: MimeNode) => void
}

const categoryNodes = [
    {
        category: 'Image',
        nodes: imageNodes,
    },
    {
        category: 'Video',
        nodes: videoNodes,
    },
    {
        category: 'Audio',
        nodes: audioNodes,
    },
    {
        category: 'Ebook',
        nodes: ebookNodes,
    },
    {
        category: 'Document',
        nodes: documentNodes,
    },
]

const categorizedNodes = {
    Image: imageNodes,
    Video: videoNodes,
    Audio: audioNodes,
    Ebook: ebookNodes,
    Document: documentNodes,
}

export const Selector = ({ value, setValue }: SelectorProps) => {
    const [search, setSearch] = useState('')
    const [hoveredCategory, setHoveredCategory] = useState<any>(
        categoryNodes[0]
    )
    const { conversions } = useConversion()
    function getValidFormats(selectedFileType: string | undefined) {
        const validFormats: string[] = []
        if (selectedFileType) {
            if (selectedFileType === conversions[0]?.to?.mime) {
                validFormats.push(/* Add valid format here */)
            }
        }
    }

    console.log('FORMATS: ', formats)
    const uniqueMimeValues = new Set<string>()

    // Collect unique MIME types
    categoryNodes.forEach((category) => {
        category.nodes.forEach((node: any) => {
            uniqueMimeValues.add(node.mime)
        })
    })

    // Convert Set back to an array
    const uniqueMimeTypes = Array.from(uniqueMimeValues)
    console.log('Unique: ', uniqueMimeTypes)

    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-row items-center relative">
                <span className="absolute pb-1">
                    <Search />
                </span>
                <TextField
                    placeholder={`Search`}
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    className="border-b pb-1 pl-8 text-lg"
                />
            </div>
            {/* <div>
                    {formats.map((format) => {
                        if (
                            !uniqueMimeValues.has(format.mime) &&
                            format.mime.includes(search)
                        ) {
                            uniqueMimeValues.add(format.mime)

                            return (
                                <li key={format.mime} className="list-none">
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
                </div> */}
            <div className="">
                <div className="flex flex-col gap-4 transition-all duration-200">
                    <div className="grid grid-cols-[0.5fr,1fr] gap-4 ">
                        <div className="col-span-1 overflow-y-auto">
                            <div className="flex flex-col gap-4">
                                {categoryNodes.map((category, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() =>
                                            setHoveredCategory(category)
                                        }
                                        className={`p-2  transition-all duration-200 ${
                                            hoveredCategory === category
                                                ? 'bg-gray-200'
                                                : 'bg-white'
                                        }`}
                                    >
                                        {category.category}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 overflow-y-auto">
                            {hoveredCategory && (
                                <div className="p-2">
                                    <ul className="list-none grid grid-cols-3 gap-2 transition-all duration-200">
                                        {hoveredCategory.nodes.map(
                                            (node: any, index: number) => (
                                                <li key={index}>
                                                    <Button
                                                        className={`rounded-3xl w-14 h-10 uppercase ${cn(
                                                            {
                                                                'bg-emerald-500':
                                                                    value ===
                                                                    node.mime,
                                                            }
                                                        )}`}
                                                        size="sm"
                                                        onPress={() =>
                                                            setValue(node)
                                                        }
                                                    >
                                                        {mimeToFileExtension(
                                                            node.mime
                                                        )}
                                                    </Button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
