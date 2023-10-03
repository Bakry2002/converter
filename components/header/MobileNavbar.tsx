'use client'

import { Menu, X } from 'lucide-react'
import { Logo } from '../Logo'

type MobileNavbarProps = {
    mobileMenuOpen: boolean
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
    mobileMenuOpen,
    setMobileMenuOpen,
}) => {
    return (
        <div className="flex xl:hidden sm:px-12 px-6 py-4 bg-white h-[68px] z-20 fixed w-full  justify-between items-center">
            <div className="m-0">
                <Logo />
            </div>
            {/* Close button + Menu button  */}
            <div>
                <button className="hidden bg-transparent  mt-0 p-0 w-fit rounded border-none opacity-80">
                    <X size={30} />
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <Menu size={30} />
                </button>
            </div>
        </div>
    )
}

export default MobileNavbar
