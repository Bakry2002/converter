'use client'

import { cn } from '@/lib/utils'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Dialog } from './ui/dialog'
import { Switch } from '@/components/ui/switch'
import { DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import {
    ChevronDown,
    FileAudio,
    FileImage,
    FileText,
    FileVideo,
    IconNode,
    Languages,
    LucideIcon,
    MenuIcon,
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

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setBorder(latest > 20 ? 'border-black/10' : 'border-transparent')
    })

    return (
        <header
            className={cn(
                'transition fixed w-full top-0 backdrop-blur-md z-10 border-b duration-300 flex flex-col items-center px-6 py-2',
                border
            )}
        >
            {/* High NAVBAR */}
            <div className=" py max-w-[1248px] sm:px-6 mx-auto p-4 w-full h-[68px] flex flex-row items-center justify-between">
                {/* Website Part */}
                <div className="flex flex-row items-center">
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
                                    selectedLink === index ? 'bg-[#f3f5f9]' : ''
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
                                    selectedLink === index ? 'bg-[#f3f5f9]' : ''
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
            <div className="h-auto w-full shadow-basic bg-white opacity-100 z-20 transition-opacity duration-300 ease-in-out">
                {/* Container */}
                <div className="xll:max-w-[1248px] px-6  w-full ml-auto mr-auto block">
                    <div className="grid grid-cols-3 w-full py-[38px]">
                        <div className="pr-16 flex justify-center flex-col">
                            <h2 className="m-0 mb-3 text-4xl text-neutral-900 font-bold tracking-tight">
                                Convert
                            </h2>
                            <p className="font-light">
                                Convert any file to any format, keep the quality
                                untouched.
                            </p>
                        </div>

                        <div className="flex justify-center flex-col">
                            {Links[0].childLinks?.map(
                                (link, index) =>
                                    // just the first two links
                                    index < 2 && (
                                        <LowNavbarLink
                                            key={index}
                                            title={link.title}
                                            description={link.description}
                                            Icon={link.Icon}
                                            href={link.href}
                                        />
                                    )
                            )}
                        </div>

                        <div className="flex flex-col justify-center">
                            {Links[0].childLinks?.map(
                                (link, index) =>
                                    // just the first two links
                                    index > 1 && (
                                        <LowNavbarLink
                                            key={index}
                                            title={link.title}
                                            description={link.description}
                                            Icon={link.Icon}
                                            href={link.href}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
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
                            {links.map((link) => (
                                <Link
                                    href={link.href}
                                    key={link.label}
                                    className="text-lg font-semibold text-neutral-800 hover:text-[#3b82f6] transition"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
