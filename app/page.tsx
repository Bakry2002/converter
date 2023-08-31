'use client'

import { DropZone } from '@/components/DropZone'
import { FileConversion, FileManager } from '@/components/FileManager'
import { Button } from '@/components/ui/button'
import { fileExtensionToMime } from '@/lib/file'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type HeroProps = {
    open: () => void
}
const Hero = ({ open }: HeroProps) => (
    <section className="py-16 flex flex-col items-center gap-16">
        <h1 className="text-4xl font-bold text-center [text-wrap:balance]">
            Convert to any format, keep the quality untouched.
            {/* Toggle between formats, keep the quality untouched. */}
        </h1>
        <Button variant="default" onClick={open}>
            Click to Upload
        </Button>
    </section>
)

export default function Home() {
    const [conversions, setConversions] = useState<FileConversion[]>([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setConversions(acceptedFiles.map((file) => ({ file }))) // set the file in the state
    }, [])

    const onSubmit = async () => {
        if (!conversions.length) return

        try {
            const data = new FormData()
            data.set('file', conversions[0].file as File) // file is the name of the field in the form
            data.set(
                'to',
                fileExtensionToMime(conversions[0].to as string) as string
            ) // to field

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            //handle error
            if (!res.ok) throw new Error(await res.text())

            // get the file id from the response
            const { id } = await res.json()
            // add the id to the conversion
            setConversions([{ ...conversions[0], resultId: id }])
        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <DropZone onDrop={onDrop}>
            {({ open }) => (
                <>
                    <header className="flex items-center mx-auto container py-2">
                        <Image
                            src="/icon.png"
                            alt="Reconvert Logo"
                            width={64}
                            height={64}
                        />
                        <div className="text-xl font-semibold ml-4">
                            Reconvert
                        </div>
                    </header>
                    <main className="container mx-auto">
                        <Hero open={open} />
                        {conversions.length > 0 && (
                            <FileManager
                                conversions={conversions}
                                setConversion={setConversions}
                                onConvert={() => onSubmit()}
                            />
                        )}
                    </main>
                </>
            )}
        </DropZone>
    )
}
