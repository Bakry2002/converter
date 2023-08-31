//* ========== Note ==============
// upload additional things
// add more files in
//* ========== End Note ===========

import { FileImageIcon, XIcon } from 'lucide-react'
import { Combobox } from './combobox'
import { Button } from './ui/button'
import { byteToSize } from '@/lib/file'
import { DownloadButton } from './DownloadButton'

export type FileConversion = {
    file?: File
    to?: string
    resultId?: string
}

type StagedFilesProps = {
    conversions: FileConversion[]
    setConversion: (conversions: FileConversion[]) => void // to update the conversions
    onConvert: (conversion: FileConversion) => void
}

export const FileManager = ({
    conversions,
    setConversion,
    onConvert,
}: StagedFilesProps) => {
    return (
        <div>
            <ul className="border rounded-md p-4">
                {conversions.map((conversion, key) => (
                    <li
                        key={key}
                        className="grid md:grid-cols-[40px_minmax(300px,_1fr)_100px_200px_50px] grid-cols-5 items-center gap-2 py-4"
                    >
                        <div className="">
                            <FileImageIcon className="w-8 h-8" />
                        </div>
                        <div className="md:col-span-1 col-span-3">
                            <span className="font-mono bg-neutral-200 rounded p-2">
                                {conversion.file?.name}
                            </span>
                        </div>
                        <span className="px-2 text-center">
                            {byteToSize(conversion.file?.size || 0)}
                        </span>
                        {!conversion.resultId && (
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
                                            [...conversions].filter(
                                                (_, i) => i !== key
                                            )
                                        )
                                    }}
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                            </>
                        )}

                        {conversion.resultId && (
                            <DownloadButton resultId={conversion.resultId} />
                        )}
                    </li>
                ))}
            </ul>
            <div className="flex justify-end py-2">
                <Button
                    variant="default"
                    onClick={() => onConvert(conversions[0])}
                >
                    Convert
                </Button>
            </div>
        </div>
    )
}
