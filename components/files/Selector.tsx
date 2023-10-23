import { cn } from '@/lib/utils'
import TextField from '../TextField'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

import { mimeToFileExtension } from '@/lib/file'
import { MimeNode } from '@/converter/types'
import { formats } from '@/converter/converters/formats'
import { nodes as imageNodes } from '@/converter/converters/image/nodes'
import { nodes as videoNodes } from '@/converter/converters/video/nodes'
import { nodes as audioNodes } from '@/converter/converters/audio/nodes'
import { nodes as ebookNodes } from '@/converter/converters/ebook/nodes'
import { nodes as documentNodes } from '@/converter/converters/docs/nodes'
import {
    Book,
    BookIcon,
    BookX,
    FileArchive,
    FileAudio,
    FileBox,
    FileImage,
    FileLineChart,
    FilePieChart,
    FileText,
    FileVideo,
    Frown,
    LucideIcon,
    Search,
} from 'lucide-react'
import { mainNode as archiveMainNode } from '@/converter/converters/archive/nodes'
import { mainNode as presentationMainNode } from '@/converter/converters/presentation/nodes'
import { mainNode as ebookMainNode } from '@/converter/converters/ebook/nodes'
import Link from 'next/link'

type SelectorProps = {
    value: string
    // icon: React.ReactNode
    setValue: (node: MimeNode) => void
    formats: MimeNode[]
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

export const Selector = ({
    value,
    setValue,
    formats,
}: // icon: Icon,
SelectorProps) => {
    const [search, setSearch] = useState('')
    const [hoveredCategory, setHoveredCategory] = useState<any>(
        categoryNodes[0]
    )

    const uniqueMimeValues = new Set<string>()

    // Collect unique MIME types
    categoryNodes.forEach((category) => {
        category.nodes.forEach((node: any) => {
            uniqueMimeValues.add(node.mime)
        })
    })

    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col items-center relative  overflow-hidden">
                <span className="absolute left-0 top-0 pb-1">
                    <Search />
                </span>
                <TextField
                    placeholder={`Search`}
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                    className="border-b pb-1 pl-16 text-lg"
                />

                {formats.length > 0 ? (
                    <div className="grid grid-cols-3 w-full gap-4 mt-4">
                        {formats.map((format) => {
                            return (
                                <li key={format.mime} className="list-none">
                                    <Button
                                        className={`bg-neutral-200 rounded-3xl w-full h-10 uppercase tracking-[0.5px] ${cn(
                                            {
                                                'bg-emerald-500 text-white':
                                                    value === format.mime,
                                            }
                                        )}`}
                                        size="sm"
                                        onPress={() => setValue(format)}
                                    >
                                        <div className="flex items-center justify-center gap-1 font-bold">
                                            <span>
                                                {format?.mime.startsWith(
                                                    'image'
                                                ) ? (
                                                    <FileImage className="text-primary/60" />
                                                ) : format?.mime.startsWith(
                                                      'video'
                                                  ) ? (
                                                    <FileVideo className="text-primary/60" />
                                                ) : format?.mime.startsWith(
                                                      'audio'
                                                  ) ? (
                                                    <FileAudio className="text-primary/60" />
                                                ) : archiveMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <FileArchive className="text-primary/60" />
                                                ) : presentationMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <FileLineChart className="text-primary/60" />
                                                ) : ebookMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <Book className="text-primary/60" />
                                                ) : (
                                                    <FileText className="text-primary/60" />
                                                )}
                                            </span>
                                            {mimeToFileExtension(format.mime)}{' '}
                                        </div>
                                    </Button>
                                </li>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex items-center flex-col gap-1 p-4 ">
                        <div>
                            <Frown
                                color="#F11A7B"
                                strokeWidth={0.5}
                                className="w-48 h-48"
                            />
                        </div>
                        <div className="flex items-center justify-center flex-col gap-4">
                            <span className="font-medium text-3xl">
                                No format found!.{' '}
                            </span>
                            <div className="flex items-center gap-1">
                                Check the
                                <Link
                                    href=""
                                    className="underline hover:text-blue-800"
                                >
                                    Upcoming formats
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* <div className="">
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
            </div> */}
        </div>
    )
}
