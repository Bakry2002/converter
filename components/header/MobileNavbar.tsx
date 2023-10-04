'use client'

import { Menu, X } from 'lucide-react'
import { Logo } from '../Logo'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'

type MobileNavbarProps = {
    mobileMenuOpen: boolean
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = React.memo(
    ({ mobileMenuOpen, setMobileMenuOpen }) => {
        const closeButtonRef = useRef<HTMLButtonElement>(null)

        const handleMenuButtonClick = useCallback(() => {
            setMobileMenuOpen(!mobileMenuOpen)
        }, [mobileMenuOpen, setMobileMenuOpen])

        useEffect(() => {
            const handleEscapeKey = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setMobileMenuOpen(false)
                }
            }

            if (mobileMenuOpen) {
                closeButtonRef.current?.focus()
                document.addEventListener('keydown', handleEscapeKey)
            } else {
                document.body.style.overflow = ''
                document.removeEventListener('keydown', handleEscapeKey)
            }

            //  in small screens, we want to prevent scrolling when the menu is open
            if (mobileMenuOpen) {
                if (window.innerWidth < 900) {
                    document.body.style.overflow = 'hidden'
                }
            }

            return () => {
                document.body.style.overflow = ''
                document.removeEventListener('keydown', handleEscapeKey)
            }
        }, [mobileMenuOpen, setMobileMenuOpen])

        const closeButton = useMemo(
            () => (
                <button
                    ref={closeButtonRef}
                    className="hidden bg-transparent mt-0 p-0 w-fit rounded border-none opacity-80"
                    aria-label="Close menu"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <X size={30} />
                </button>
            ),
            [setMobileMenuOpen]
        )

        return (
            <div className="flex xl:hidden sm:px-12 px-6 py-4 bg-white h-[68px] z-20 fixed w-full justify-between items-center">
                <div className="m-0">
                    <Logo />
                </div>
                {/* Close button + Menu button  */}
                <div>
                    {closeButton}
                    <button
                        className="ml-4"
                        aria-label="Open menu"
                        onClick={handleMenuButtonClick}
                    >
                        <Menu size={30} />
                    </button>
                </div>
            </div>
        )
    }
)

export default MobileNavbar
MobileNavbar.displayName = 'MobileNavbar'
