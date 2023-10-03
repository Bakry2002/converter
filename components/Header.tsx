'use client'

import { cn } from '@/lib/utils'

import { useMotionValueEvent, useScroll } from 'framer-motion'

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
    Menu,
    MenuIcon,
    X,
} from 'lucide-react'
import { Logo } from './Logo'
import { UrlObject } from 'url'
import NormalNavbar from './header/NormalNavbar'
import MobileNavbar from './header/MobileNavbar'
import Sidebar from './header/Sidebar'

type LinkProps = {
    title: string
    href?: UrlObject | string
    description?: string
    childLinks?: (LinkProps & { Icon?: LucideIcon })[]
    className?: string
}

export const Links: LinkProps[] = [
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
        href: '/help',
    },
]
export const Header = () => {
    const [border, setBorder] = useState('border-transparent')
    const [selectedLink, setSelectedLink] = useState<number | null>(null)
    const [mobileNavOpen, setMobileNavOpen] = useState(false)

    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setBorder(
            latest > 20 && selectedLink === null
                ? 'border-black/10'
                : 'border-transparent'
        )
    })

    return (
        // Big Wrapper -> Navbar + Sidebar
        <div className="w-full">
            {/* ======== Normal Nav ======== */}
            <NormalNavbar
                border={border}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
            />

            {/* ======== Mobile Nav ========  */}
            <MobileNavbar
                mobileMenuOpen={mobileNavOpen}
                setMobileMenuOpen={setMobileNavOpen}
            />

            {/* ======== Sidebar ========  */}
            <Sidebar
                mobileMenuOpen={mobileNavOpen}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
                setMobileMenuOpen={setMobileNavOpen}
            />
        </div>
    )
}

export function LowNavbarLink({
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
