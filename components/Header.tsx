'use client'

import { cn } from '@/lib/utils'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Dialog } from './ui/dialog'
import { DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import { Logo } from './Logo'

const links = [
    {
        label: 'Blog',
        href: '/blog',
    },
]
export const Header = () => {
    const [border, setBorder] = useState('border-transparent')
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setBorder(latest > 20 ? 'border-black/10' : 'border-transparent')
    })

    return (
        <header
            className={cn(
                'transition sticky top-0 backdrop-blur-md z-50 border-b duration-300 flex items-center px-6 py-2',
                border
            )}
        >
            <nav className="flex items-center w-full">
                <Logo />
                <span className="flex-grow"></span>
                <Menu />
                <Mobile />
            </nav>
        </header>
    )
}

function Menu() {
    return (
        <div className="hidden md:block">
            <nav className="flex items-center gap-6">
                {links.map((link) => (
                    <Link
                        href={link.href}
                        key={link.label}
                        className="text-lg font-semibold text-neutral-800 hover:text-primary transition"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
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
