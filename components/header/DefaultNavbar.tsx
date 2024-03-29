'use client'

import Link from 'next/link'
import { Links } from '../Header'
import { Logo } from '../Logo'
import { cn } from '@/lib/utils'
import { ChevronDown, Languages } from 'lucide-react'
import { Separator } from '../ui/separator'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DropDownNavbar } from './DropDownNavbar'
import { useScroll } from 'framer-motion'
import ModeSwitch from '../ui/switch'
import { usePathname, useRouter } from 'next/navigation'
import { set } from 'zod'
import Home from '@/app/(home)/page'

type NormalNavbarProps = {
    selectedLink: number | null
    setSelectedLink: React.Dispatch<React.SetStateAction<number | null>>
}

const DefaultNavbar: React.FC<NormalNavbarProps> = ({
    selectedLink,
    setSelectedLink,
}) => {
    const lowNavbarRef = useRef<HTMLDivElement | null>(null) // Specify the type as HTMLDivElement or null
    // const [navStyle, setNavStyle] = useState(
    //     ' translate-y-12 rounded-[15px] px-8 sm:w-[calc(100%-6rem)] lg:w-[calc(100%-10rem)] xl:w-[calc(100%-12rem)] 2xl:w-[calc(100%-14rem)] animate-in duration-500'
    // )
    const router = useRouter()
    const pathname = usePathname()
    const { scrollY } = useScroll()

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setNavStyle(
    //             scrollY.get() > 150
    //                 ? 'translate-y-0 rounded-none w-full sm:px-[3rem] lg:px-[5rem] xl:px-[6rem] 2xl:px-[7rem] px-[2rem]'
    //                 : 'translate-y-12 px-8 rounded-[15px] sm:w-[calc(100%-6rem)] lg:w-[calc(100%-10rem)] xl:w-[calc(100%-12rem)] 2xl:w-[calc(100%-14rem)]'
    //         )
    //     }

    //     scrollY.onChange(handleScroll)
    //     // Clean up the listener when the component unmounts
    //     return () => {
    //         scrollY.onChange(handleScroll)
    //     }
    // }, [selectedLink, scrollY, pathname, setSelectedLink, router])

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

    const handleLinkClick = useCallback(
        (
            event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>,
            index: number
        ) => {
            event.preventDefault()

            if (selectedLink === index) {
                // If the clicked link is already open, close it
                setSelectedLink(null)
            } else {
                // If a different link is clicked, open it and close others
                setSelectedLink(index)
            }
        },
        [selectedLink, setSelectedLink]
    )
    return (
        <>
            {/* ======== Normal Nav ======== */}
            <div className="w-full flex items-center justify-center">
                <div
                    className={`hidden xl:flex transition fixed top-0 overflow-hidden bg-white translate-y-0 rounded-none w-full sm:px-[3rem] lg:px-[5rem] xl:px-[6rem] 2xl:px-[7rem] px-[2rem] z-10 border-b duration-100 ease-soft-spring flex-col items-center py-2`}
                >
                    {/* High NAVBAR */}
                    <div className="m-0 w-full h-[60px] flex flex-row items-center justify-between">
                        {/* Website Part */}
                        {/* LOGO */}
                        <div className="">
                            <Logo />
                        </div>
                        <div className="flex justify-between gap-12  items-center flex-row">
                            <div className="flex flex-row items- gap-4">
                                {/* Links */}

                                {Links.map((link, index: number) =>
                                    // Check if link has an href
                                    // If it does, render an anchor tag; otherwise, render a span
                                    link.href ? (
                                        <Link
                                            key={index}
                                            href={link.href || '/'}
                                            className={cn(
                                                'bg-transparent py-2 px-3 rounded font-light cursor-pointer  text-base',
                                                selectedLink === index
                                                    ? 'bg-[#f3f5f9]'
                                                    : ''
                                            )}
                                            prefetch={false}
                                            // onClick={(event) =>
                                            //     handleLinkClick(event, index)
                                            // }
                                        >
                                            {link.title}
                                            {link.childLinks && (
                                                <ChevronDown
                                                    className={cn(
                                                        'inline  transition-transform duration-300 ease-in-out rotate-0 select-none',
                                                        selectedLink ===
                                                            index &&
                                                            'rotate-180'
                                                    )}
                                                />
                                            )}
                                        </Link>
                                    ) : (
                                        <span
                                            key={index}
                                            onClick={(event) =>
                                                handleLinkClick(event, index)
                                            }
                                            className={cn(
                                                'bg-transparent py-2 px-3 rounded font-light cursor-pointer text-base',
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
                                                        selectedLink ===
                                                            index &&
                                                            'rotate-180'
                                                    )}
                                                />
                                            )}
                                        </span>
                                    )
                                )}
                            </div>

                            {/* User Part */}
                            <div className="flex flex-row items-center gap-5">
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
                                    {/* <Switch id="airplane-mode" /> */}
                                    <ModeSwitch />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Low NAVBAR */}
                    {selectedLink !== null &&
                        Links[selectedLink].childLinks && (
                            <DropDownNavbar
                                lowNavbarRef={lowNavbarRef}
                                selectedLink={selectedLink}
                                setSelectedLink={setSelectedLink}
                            />
                        )}
                </div>
            </div>
        </>
    )
}

export default DefaultNavbar
