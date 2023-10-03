'use client'

import Link from 'next/link'
import { Links, LowNavbarLink } from '../Header'
import { Logo } from '../Logo'
import { cn } from '@/lib/utils'
import { ChevronDown, Languages } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import { useEffect, useRef } from 'react'

type NormalNavbarProps = {
    border?: string
    selectedLink: number | null
    setSelectedLink: React.Dispatch<React.SetStateAction<number | null>>
}

const NormalNavbar: React.FC<NormalNavbarProps> = ({
    border,
    selectedLink,
    setSelectedLink,
}) => {
    const lowNavbarRef = useRef<HTMLDivElement | null>(null) // Specify the type as HTMLDivElement or null

    // Handle clicks outside the low navbar to close it
    useEffect(() => {
        // Add a click event listener to the document
        const handleClickOutside = (event: any) => {
            if (
                lowNavbarRef.current &&
                !lowNavbarRef.current.contains(event.target) &&
                selectedLink !== null
            ) {
                // If a click occurred outside and there's a selected link open, close it
                setSelectedLink(null)
            }
        }

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside)

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [selectedLink, setSelectedLink])
    return (
        <>
            {/* ======== Normal Nav ======== */}
            <div
                className={`hidden xl:flex transition fixed w-full top-0 bg-white z-10 border-b duration-300  flex-col items-center py-2 ${border}`}
            >
                {/* High NAVBAR */}
                <div className="py max-w-[1248px] sm:px-6 mx-auto p-4 w-full h-[68px] flex flex-row items-center justify-between">
                    {/* Website Part */}
                    <div className="flex flex-row items- gap-4">
                        {/* LOGO */}
                        <Logo />
                        {/* Links */}

                        {Links.map((link, index: number) =>
                            // Check if link has an href
                            // If it does, render an anchor tag; otherwise, render a span
                            link.href ? (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        'first-of-type:ml-10 bg-transparent py-2 px-3 rounded font-light cursor-pointer text-lg',
                                        selectedLink === index
                                            ? 'bg-[#f3f5f9]'
                                            : ''
                                    )}
                                    onClick={() => {
                                        if (selectedLink === index) {
                                            // If the clicked link is already open, close it
                                            setSelectedLink(null)
                                        } else {
                                            // If a different link is clicked, open it and close others
                                            setSelectedLink(index)
                                        }
                                    }}
                                >
                                    {link.title}
                                    {link.childLinks && (
                                        <ChevronDown
                                            className={cn(
                                                'inline ml-2 transition-transform duration-300 ease-in-out rotate-0 select-none',
                                                selectedLink === index &&
                                                    'rotate-180'
                                            )}
                                        />
                                    )}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    onClick={() => {
                                        if (selectedLink === index) {
                                            // If the clicked link is already open, close it
                                            setSelectedLink(null)
                                        } else {
                                            // If a different link is clicked, open it and close others
                                            setSelectedLink(index)
                                        }
                                    }}
                                    className={cn(
                                        'first-of-type:ml-10 bg-transparent py-2 px-3 rounded font-light cursor-pointer text-lg',
                                        selectedLink === index
                                            ? 'bg-[#f3f5f9]'
                                            : ''
                                    )}
                                >
                                    {link.title}
                                    {link.childLinks && (
                                        <ChevronDown
                                            className={cn(
                                                'inline ml-2 transition-transform duration-300 ease-in-out rotate-0 select-none',
                                                selectedLink === index &&
                                                    'rotate-180'
                                            )}
                                        />
                                    )}
                                </span>
                            )
                        )}
                    </div>

                    {/* User Part */}
                    <div className="flex flex-row items-center gap-4">
                        <button className="bg-primary font-bold px-3 py-2 rounded w-fit opacity-90  cursor-pointer hover:opacity-100 text-white">
                            Sign in
                        </button>
                        <Separator
                            orientation="vertical"
                            className="w-[1px] h-[38px]"
                        />
                        <button className="">
                            <Languages
                                size={30}
                                className="hover:bg-neutral-100 rounded-full"
                            />
                        </button>
                        <Separator
                            orientation="vertical"
                            className="w-[1px] h-[38px]"
                        />
                        {/* // TODO: ADD the change mode   */}
                        <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                        </div>
                    </div>
                </div>

                {/* Low NAVBAR */}
                {selectedLink !== null && Links[selectedLink].childLinks && (
                    <div
                        ref={lowNavbarRef}
                        id="low-navbar"
                        className={`${
                            selectedLink !== null
                                ? 'h-auto fade-entering '
                                : 'hidden fade-exiting pointer-events-none'
                        } w-full shadow-basic bg-white ${
                            selectedLink !== null ? 'opacity-100' : 'opacity-0'
                        } z-20 `}
                    >
                        {/* Container */}
                        <div className="xl:max-w-[1248px] px-6  w-full ml-auto mr-auto block">
                            <div className="grid grid-cols-3 w-full py-[38px]">
                                {
                                    // Render child links if the parent link is open
                                    selectedLink !== null &&
                                        Links[selectedLink].childLinks &&
                                        Links[selectedLink] && (
                                            <>
                                                <div className="pr-16 flex flex-col">
                                                    <h2 className="m-0 text-[3.25rem] text-neutral-900 font-bold tracking-tight">
                                                        {
                                                            Links[selectedLink]
                                                                .title
                                                        }
                                                    </h2>
                                                    <p className="font-light text-base">
                                                        {
                                                            Links[selectedLink]
                                                                .description
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-span-2 flex justify-center flex-col">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {Links[
                                                            selectedLink
                                                        ].childLinks?.map(
                                                            (link, index) => (
                                                                <LowNavbarLink
                                                                    key={index}
                                                                    title={
                                                                        link.title
                                                                    }
                                                                    description={
                                                                        link.description
                                                                    }
                                                                    Icon={
                                                                        link.Icon
                                                                    }
                                                                    href={
                                                                        link.href
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default NormalNavbar
