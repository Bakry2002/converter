import { useRouter } from 'next/navigation'
import { Links, LowNavbarLink } from '../Header'
import { set } from 'zod'
import { LucideIcon } from 'lucide-react'

interface DropDownNavbarProps {
    isNavStyleActivated?: boolean
    lowNavbarRef: React.RefObject<HTMLDivElement>
    selectedLink: number
    setSelectedLink: React.Dispatch<React.SetStateAction<number | null>>
}

export const DropDownNavbar: React.FC<DropDownNavbarProps> = ({
    lowNavbarRef,
    selectedLink,
    setSelectedLink,
    isNavStyleActivated,
}) => {
    const router = useRouter()
    return (
        <div
            ref={lowNavbarRef}
            id="low-navbar"
            className={`${
                selectedLink !== null
                    ? 'h-auto fade-entering '
                    : 'hidden fade-exiting pointer-events-none'
            } w-full  bg-white ${
                selectedLink !== null ? 'opacity-100' : 'opacity-0'
            } z-20 `}
        >
            {/* Container */}
            <div className={`px-8 w-full ml-auto mr-auto block`}>
                <div className="grid grid-cols-4 w-full pt-[38px]">
                    {
                        // Render child links if the parent link is open
                        selectedLink !== null &&
                            Links[selectedLink].childLinks &&
                            Links[selectedLink] && (
                                <>
                                    <div className="pr-16 flex flex-col mt-4">
                                        <h2 className="m-0 text-[1.5rem] text-neutral-900 font-bold tracking-tight">
                                            {Links[selectedLink].title}
                                        </h2>
                                        <p className="font-light text-base">
                                            {Links[selectedLink].description}
                                        </p>
                                    </div>
                                    <div className="col-span-3 flex justify-center flex-col">
                                        <div className="grid grid-cols-3 gap-4">
                                            {Links[
                                                selectedLink
                                            ].childLinks?.map((link, index) => (
                                                <button
                                                    className="text-left flex flex-row bg-transparent border-none mb-6 cursor-pointer group hover:bg-neutral-50 w-full p-2 rounded "
                                                    key={index}
                                                    onClick={() => {
                                                        router.push(
                                                            link.href as any
                                                        )
                                                        setSelectedLink(null)
                                                    }}
                                                >
                                                    {link.Icon && (
                                                        <link.Icon className="text-neutral-800 mr-[10px] w-6 h-6 transition-all duration-700 ease-in group-hover:text-primary" />
                                                    )}
                                                    <div className="flex flex-col items-start">
                                                        <p className="max-w-[240px] font-medium text-sm">
                                                            {link.title}
                                                        </p>
                                                        {link.description && (
                                                            <p className="max-w-[240px] text-neutral-500 text-sm">
                                                                {
                                                                    link.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </button>
                                                // <LowNavbarLink
                                                //     key={index}
                                                //     title={link.title}
                                                //     description={
                                                //         link.description
                                                //     }
                                                //     Icon={link.Icon}
                                                //     href={link.href}
                                                // />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
