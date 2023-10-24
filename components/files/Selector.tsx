import { cn } from '@/lib/utils'
import TextField from '../TextField'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

import { mimeToFileExtension } from '@/lib/file'
import { MimeNode } from '@/converter/types'

import {
    Book,
    FileArchive,
    FileAudio,
    FileImage,
    FileLineChart,
    FileText,
    FileVideo,
    Frown,
    Search,
} from 'lucide-react'
import { mainNode as archiveMainNode } from '@/converter/converters/archive/nodes'
import { mainNode as presentationMainNode } from '@/converter/converters/presentation/nodes'
import { mainNode as ebookMainNode } from '@/converter/converters/ebook/nodes'
import Link from 'next/link'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

type SelectorProps = {
    value: string
    setValue: (node: MimeNode) => void
    formats: MimeNode[]
}

export const Selector = ({ value, setValue, formats }: SelectorProps) => {
    const [search, setSearch] = useState('')

    // Filter the formats based on the search term
    const filteredFormats = formats.filter((format) => {
        const searchLowerCase = search.toLowerCase()
        return mimeToFileExtension(format.mime)
            .toLowerCase()
            .includes(searchLowerCase)
    })

    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col items-center relative overflow-hidden">
                <span className="absolute left-0 top-0 pb-1">
                    <Search />
                </span>
                <TextField
                    placeholder="Search"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                    }
                    className="border-b pb-1 pl-16 text-lg"
                />

                {filteredFormats.length > 0 ? (
                    <div className="grid grid-cols-3 w-full gap-4 mt-4">
                        {filteredFormats.map((format) => {
                            return (
                                <li key={format.mime} className="list-none">
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-full">
                                                <Button
                                                    className={`bg-neutral-200 rounded-3xl w-full h-10 uppercase tracking-[0.5px] ${cn(
                                                        {
                                                            'bg-emerald-500 text-white':
                                                                value ===
                                                                format.mime,
                                                        }
                                                    )}`}
                                                    size="sm"
                                                    onPress={() => {
                                                        if (
                                                            value ===
                                                            format.mime
                                                        ) {
                                                            // Clear the mime value if it's already set
                                                            setValue({
                                                                mime: '',
                                                            })
                                                        } else {
                                                            // Set the mime value to the clicked format
                                                            setValue(format)
                                                        }
                                                    }}
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
                                                        {mimeToFileExtension(
                                                            format.mime
                                                        )}{' '}
                                                    </div>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {format?.mime.startsWith(
                                                    'image'
                                                ) ? (
                                                    <p>Image format</p>
                                                ) : format?.mime.startsWith(
                                                      'video'
                                                  ) ? (
                                                    <p>Video format</p>
                                                ) : format?.mime.startsWith(
                                                      'audio'
                                                  ) ? (
                                                    <p>Audio format</p>
                                                ) : archiveMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <p>Archive format</p>
                                                ) : presentationMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <p>Presentation format</p>
                                                ) : ebookMainNode.find(
                                                      (node) =>
                                                          node.mime ===
                                                          format?.mime
                                                  ) ? (
                                                    <p>Ebook format</p>
                                                ) : (
                                                    <p>Document format</p>
                                                )}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </li>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex items-center flex-col gap-1 p-4">
                        <div>
                            <Frown
                                color="#F11A7B"
                                strokeWidth={0.5}
                                className="w-48 h-48"
                            />
                        </div>
                        <div className="flex items-center justify-center flex-col gap-4">
                            <span className="font-medium text-3xl">
                                No format found!
                            </span>
                            <div className="flex items-center gap-1">
                                Check the
                                <Link
                                    href=""
                                    className="underline hover-text-blue-800"
                                >
                                    Upcoming formats
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
