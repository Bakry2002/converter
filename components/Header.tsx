'use client'

import { useScroll } from 'framer-motion'
import Link from 'next/link'
import {
    FileArchive,
    FileAudio,
    FileImage,
    FileLineChart,
    FileText,
    FileVideo,
    LucideIcon,
} from 'lucide-react'
import { UrlObject } from 'url'
import NormalNavbar from './header/NormalNavbar'
import MobileNavbar from './header/MobileNavbar'
import Sidebar from './header/Sidebar'
import React, { useEffect, useState } from 'react'

interface LinkProps {
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
            {
                title: 'Archive Converter',
                description: 'Convert between archives formats',
                Icon: FileArchive,
                href: '/archive-converter',
            },
            {
                title: 'Presentation Converter',
                description: 'Convert between presentation formats',
                Icon: FileLineChart,
                href: '/presentation-converter',
            },
        ],
    },
    {
        title: 'OCR',
        description: 'Extract text from images',
        href: '/ocr',
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
]

export const Header: React.FC = () => {
    const [_, setBorder] = useState('border-transparent')
    const [selectedLink, setSelectedLink] = useState<number | null>(null)
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        const handleScroll = () => {
            setBorder(
                scrollY.get() > 20 && selectedLink === null
                    ? 'border-black/10'
                    : 'border-transparent'
            )
        }

        scrollY.onChange(handleScroll)
        return () => {
            scrollY.onChange(handleScroll)
        }
    }, [selectedLink, scrollY])

    return (
        // Big Wrapper -> Navbar + Sidebar
        <>
            {/* ======== Normal Nav ======== */}
            <NormalNavbar
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
        </>
    )
}

// This component renders the navbar links in the low navbar.
export const LowNavbarLink: React.FC<LinkProps & { Icon?: LucideIcon }> =
    React.memo(({ title, description, Icon, href }) => {
        return (
            <Link
                prefetch={false}
                href={href || '/'}
                className="flex flex-row bg-transparent border-none mb-6 cursor-pointer group hover:bg-neutral-50 w-full p-2 rounded "
            >
                {Icon && (
                    <Icon className="text-neutral-800 mr-[10px] w-6 h-6 transition-all duration-700 ease-in group-hover:text-primary" />
                )}
                <div className="flex flex-col items-start">
                    <p className="max-w-[240px] font-medium text-sm">{title}</p>
                    {description && (
                        <p className="max-w-[240px] text-neutral-500 text-sm">
                            {description}
                        </p>
                    )}
                </div>
            </Link>
        )
    })
LowNavbarLink.displayName = 'LowNavbarLink'
