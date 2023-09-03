import { DropZone } from '@/components/DropZone'
import { FileConversion, FileManager } from '@/components/FileManager'
import { OpenButton } from '@/components/OpenButton'
import { Manager } from '@/components/files/Manager'
import { Button } from '@/components/ui/button'
import { useConversion } from '@/context/ConversionContext'
import { fileExtensionToMime } from '@/lib/file'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type HeroProps = {}
// const Hero = ({ open }: HeroProps) => (
//     <section className="py-16 flex flex-col items-center gap-16">
//         <h1 className="text-4xl font-bold text-center [text-wrap:balance]">
//             Convert to any format, keep the quality untouched.
//             {/* Toggle between formats, keep the quality untouched. */}
//         </h1>
//         <Button variant="default" onClick={open}>
//             Click to Upload
//         </Button>
//     </section>
// )

const Hero = ({}: HeroProps) => (
    <section className="py-32 flex items-center flex-col gap-16">
        <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
            Convert any file to any{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-500">
                format
            </span>
            , keep the quality{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-blue-500">
                untouched.
            </span>
            {/* Toggle between formats, keep the quality untouched. */}
        </h1>
        <OpenButton />
        {/* <Button variant="default">Click to Upload</Button> */}
    </section>
)

export const About = () => (
    <section className="container mx-auto flex flex-col gap-52">
        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
            sapiente iste, modi magni ipsa dolorum fugit ducimus dolorem dolore
            repellendus cupiditate similique tempora eligendi sit debitis
            quaerat architecto illo recusandae?
        </p>
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            dolores, dolorem accusantium inventore, quae officia sint qui
            facilis odio, corporis reprehenderit quasi pariatur quia eius
            possimus voluptatibus! Facere, illo voluptates?
        </p>
    </section>
)

export default function Home() {
    // const [conversions, setConversions] = useState<FileConversion[]>([])

    // const onDrop = useCallback((acceptedFiles: File[]) => {
    //     setConversions(acceptedFiles.map((file) => ({ file }))) // set the file in the state
    // }, [])

    // const onSubmit = async () => {
    //     if (!conversions.length) return

    //     try {
    //         const data = new FormData()
    //         data.set('file', conversions[0].file as File) // file is the name of the field in the form
    //         data.set(
    //             'to',
    //             fileExtensionToMime(conversions[0].to as string) as string
    //         ) // to field

    //         const res = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: data,
    //         })
    //         //handle error
    //         if (!res.ok) throw new Error(await res.text())

    //         // get the file id from the response
    //         const { id } = await res.json()
    //         // add the id to the conversion
    //         setConversions([{ ...conversions[0], resultId: id }])
    //     } catch (error: any) {
    //         console.error(error)
    //     }
    // }

    return (
        // <DropZone onDrop={onDrop}>
        //     {({ open }) => (
        //         <>
        //             <header className="flex items-center mx-auto container py-2">
        //                 <Image
        //                     src="/icon.png"
        //                     alt="Reconvert Logo"
        //                     width={64}
        //                     height={64}
        //                 />
        //                 <div className="text-xl">Reconvert</div>
        //             </header>
        //             <main className="container mx-auto">
        //                 <Hero open={open} />
        //                 {conversions.length > 0 && (
        //                     <FileManager
        //                         conversions={conversions}
        //                         setConversion={setConversions}
        //                         onConvert={() => onSubmit()}
        //                     />
        //                 )}
        //             </main>
        //         </>
        //     )}
        // </DropZone>
        <>
            {/* <HeroBackground/> */}
            <DropZone>
                <>
                    <header className="flex items-center mx-auto container py-2">
                        <Link
                            href="/"
                            className=" flex flex-row items-center gap-1"
                        >
                            <Image
                                src="/icon.png"
                                alt="Reconvert Logo"
                                width={64}
                                height={64}
                            />
                            <div className="text-xl">Reconvert</div>
                        </Link>
                    </header>
                    <main>
                        <Hero />
                        <Manager />

                        <About />
                    </main>
                </>
            </DropZone>
        </>
    )
}
