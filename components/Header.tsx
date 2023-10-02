'use client'

import { cn } from '@/lib/utils'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Dialog } from './ui/dialog'
import { Switch } from '@/components/ui/switch'
import { DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    FileAudio,
    FileImage,
    FileText,
    FileVideo,
    IconNode,
    Languages,
    LucideIcon,
    MenuIcon,
    X,
} from 'lucide-react'
import { Logo } from './Logo'
import { Label } from './ui/label'
import { Url } from 'next/dist/shared/lib/router/router'
import { UrlObject } from 'url'
import { number } from 'zod'

type LinkProps = {
    title: string
    href?: UrlObject | string
    description?: string
    childLinks?: (LinkProps & { Icon?: LucideIcon })[]
}

const Links: LinkProps[] = [
    {
        title: 'Convert',
        description:
            'Convert any file to any format, keep the quality untouched',
        childLinks: [
            {
                title: 'Image Converter',
                description: 'Convert between image formats',
                Icon: FileImage,
                href: '/image-converter',
            },
            {
                title: 'Document Converter',
                description: 'Convert between document formats',
                Icon: FileText,
                href: '/document-converter',
            },
            {
                title: 'Video Converter',
                description: 'Convert between video formats',
                Icon: FileVideo,
                href: '/video-converter',
            },
            {
                title: 'Audio Converter',
                description: 'Convert between audio formats',
                Icon: FileAudio,
                href: '/audio-converter',
            },
        ],
    },
    {
        title: 'Formats',
        href: '/formats',
    },
    {
        title: 'Pricing',
        href: '/pricing',
    },
    {
        title: 'Company',
        description: 'Learn more about us',
        childLinks: [
            {
                title: 'About',
                href: '/about',
            },
            {
                title: 'Contact Us',
                href: '/contact',
            },
            {
                title: 'Blog',
                href: '/blog',
            },
        ],
    },
    {
        title: 'Help',
    },
]
export const Header = () => {
    const [border, setBorder] = useState('border-transparent')
    const [selectedLink, setSelectedLink] = useState<number | null>(null)
    const lowNavbarRef = useRef<HTMLDivElement | null>(null) // Specify the type as HTMLDivElement or null

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setBorder(
            latest > 20 && selectedLink === null
                ? 'border-black/10'
                : 'border-transparent'
        )
    })

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
    }, [selectedLink])

    return (
        // Big Wrapper
        <div className="w-full">
            {/* Normal Nav */}
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

            {/* Mobile Nav */}
            <div className="flex xl:hidden sm:px-12 px-6 py-4 bg-white h-[68px] z-20 fixed w-full  justify-between items-center">
                <div className="m-0">
                    <Logo />
                </div>
                {/* Close button */}
                <div>
                    <button className="bg-transparent  mt-0 p-0 w-fit rounded border-none opacity-80">
                        <X size={30} />
                    </button>
                </div>
            </div>

            {/* Sidebar */}

            {/* TOP Header */}
            <div className="block xl:hidden xmd:w-1/2 w-full sm:shadow-basic fixed h-full bg-white z-[21] m-0 right-0 transition-all duration-300">
                <div className="-mb-10 sm:px-12 flex flex-row gap-0 pt-[22px] px-6 pb-[80px] h-[130px] w-full items-center ">
                    <button className="bg-transparent mt-0 p-0 w-fit rounded border-none opacity-80">
                        <X size={30} />
                    </button>
                </div>
                {/* Links */}
                <div className="sm:px-12 2xl:px-6 ">
                    <button className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80">
                        <div className="flex justify-between gap-0 flex-row">
                            <h5 className="m-0 font-bold">Convert</h5>
                            <ChevronRight
                                size={30}
                                className="transition-all duration-200 select-none w-[25px] h-[21px]"
                            />
                        </div>
                    </button>

                    <button className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80">
                        <div className="flex justify-between gap-0 flex-row">
                            <h5 className="m-0 font-bold">Formats</h5>
                            <ChevronRight
                                size={30}
                                className="transition-all duration-200 select-none w-[25px] h-[21px]"
                            />
                        </div>
                    </button>

                    <button className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80">
                        <div className="flex justify-between gap-0 flex-row">
                            <h5 className="m-0 font-bold">Company</h5>
                            <ChevronRight
                                size={30}
                                className="transition-all duration-200 select-none w-[25px] h-[21px]"
                            />
                        </div>
                    </button>

                    <button className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80">
                        <div className="flex justify-between gap-0 flex-row">
                            <h5 className="m-0 font-bold">Pricing</h5>
                            <ChevronRight
                                size={30}
                                className="transition-all duration-200 select-none w-[25px] h-[21px]"
                            />
                        </div>
                    </button>

                    <button className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80">
                        <div className="flex justify-between gap-0 flex-row">
                            <h5 className="m-0 font-bold">Help</h5>
                            <ChevronRight
                                size={30}
                                className="transition-all duration-200 select-none w-[25px] h-[21px]"
                            />
                        </div>
                    </button>

                    <div className="h-auto text-center mt-10">
                        <button className="w-full mt-2 py-[9px] px-5 rounded border-none opacity-90 bg-neutral-100 hover:bg-primary transition-background  hover:opacity-100 hover:cursor-pointer">
                            Sign in
                        </button>
                    </div>
                </div>

                {/* Child sidebar */}
                {/* ${closed ? '-right-full transition-all duration-300' : 'right-0'} */}
                <div className="hidden xmd:w-1/2 w-full flex-col right-0 z-[22] fixed top-[100px] h-[calc(100vh-100px)] bg-white flex">
                    <div className="mb-[10px] min-h-[34px] sm:px-12 2xl:px-6 w-full flex flex-row justify-start">
                        <button className="w-full m-0 mr-[5px] p-0 opacity-80 rounded border-none">
                            <div className="flex flex-row gap-0 items-center mb-3 hover:bg-neutral-100 rounded">
                                <ChevronLeft size={40} />
                                <h3 className="font-bold text-3xl">Convert</h3>
                            </div>
                        </button>
                    </div>

                    <div className="w-full flex flex-col">
                        <p className="sm:px-12 2xl:px-6 font-light m-0 ml-4 mb-4 text-lg">
                            Convert any format to any format, keep the quality
                        </p>
                        <div className="block pt-[10px] pl-4 bg-white">
                            <div className="sm:px-12 2xl:px-6 mb-6 cursor-pointer flex bg-transparent flex-row">
                                <div className="flex flex-col items-start">
                                    <h5 className="max-w-[240px] text-xl hover:underline mb-1 transition-all duration-300 ease-in font-normal text-primary">
                                        Image Converter
                                    </h5>
                                    <p className="max-w-[340px] font-light">
                                        Convert between image formats
                                    </p>
                                </div>
                            </div>

                            <div className="sm:px-12 2xl:px-6 mb-6 cursor-pointer flex bg-transparent flex-row">
                                <div className="flex flex-col items-start ">
                                    <h5 className="max-w-[240px] text-xl hover:underline mb-1 transition-all duration-300 ease-in font-normal text-primary">
                                        Document Converter
                                    </h5>
                                    <p className="max-w-[340px] font-light">
                                        Convert between documents formats
                                    </p>
                                </div>
                            </div>
                            <div className="sm:px-12 2xl:px-6 mb-6 cursor-pointer flex bg-transparent flex-row">
                                <div className="flex flex-col items-start ">
                                    <h5 className="max-w-[240px] text-xl hover:underline mb-1 transition-all duration-300 ease-in font-normal text-primary">
                                        Audio Converter
                                    </h5>
                                    <p className="max-w-[340px] font-light">
                                        Convert between audio formats
                                    </p>
                                </div>
                            </div>
                            <div className="sm:px-12 2xl:px-6 mb-6 cursor-pointer flex bg-transparent flex-row">
                                <div className="flex flex-col items-start ">
                                    <h5 className="max-w-[240px] text-xl hover:underline mb-1 transition-all duration-300 ease-in font-normal text-primary">
                                        Video Converter
                                    </h5>
                                    <p className="max-w-[340px] font-light">
                                        Convert between video formats
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LowNavbarLink({
    title,
    description,
    Icon,
    href,
}: LinkProps & { Icon?: LucideIcon }) {
    return (
        <Link
            href={href || '/'}
            className="flex flex-row bg-transparent border-none mb-6 cursor-pointer group hover:bg-neutral-50 w-[calc(100%-40px)] p-2 rounded "
        >
            {Icon && (
                <Icon className="text-neutral-800 mr-[10px] w-6 h-6 transition-all duration-700 ease-in group-hover:text-primary" />
            )}
            <div className="flex flex-col items-start">
                <p className="max-w-[240px] font-medium">{title}</p>
                <p className="max-w-[240px] text-neutral-500 text-sm">
                    {description}
                </p>
            </div>
        </Link>
    )
}

function Mobile() {
    return (
        <div className="block md:hidden">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <MenuIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div>
                        <nav className="flex items-center gap-6">
                            {Links.map((link) => (
                                <Link
                                    href={link.href || '/'}
                                    key={link.title}
                                    className="text-lg font-semibold text-neutral-800 hover:text-[#3b82f6] transition"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
