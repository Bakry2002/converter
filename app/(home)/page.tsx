import { DropZone } from '@/components/DropZone'
import { Manager } from '@/components/files/Manager'
import Hero from './_components/Hero'

export default function Home() {
    return (
        <DropZone>
            <>
                <main>
                    <Hero />
                    <Manager />
                </main>
                <div className="h-[1000px]"></div>
            </>
        </DropZone>
    )
}
