import { DropZone } from '@/components/DropZone'
import { Manager } from '@/components/files/Manager'
import Hero from './_components/Hero'
import Usage from './_components/Usage'
import Definition from './_components/Definition'

export default function Home() {
    return (
        <DropZone>
            <>
                <main>
                    <Hero />
                    <Manager />
                    <Definition />
                    <Usage />
                </main>
                <div className="h-[1000px]"></div>
            </>
        </DropZone>
    )
}
