'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Logo } from '../Logo'
import { Links } from '../Header'
import Link from 'next/link'
import React from 'react'
type SidebarProps = {
    mobileMenuOpen: boolean
    setMobileMenuOpen: (mobileMenuOpen: boolean) => void
    selectedLink: number | null
    setSelectedLink: React.Dispatch<React.SetStateAction<number | null>>
}

const Sidebar: React.FC<SidebarProps> = React.memo(
    ({ mobileMenuOpen, selectedLink, setSelectedLink, setMobileMenuOpen }) => {
        return (
            <React.Fragment>
                <div
                    className={`${
                        mobileMenuOpen ? 'right-0' : '-right-full'
                    } xl:hidden xmd:w-1/2 w-full sm:shadow-basic fixed h-full bg-white z-[21] m-0 transition-all duration-300 ease-in-out`}
                >
                    <div className="-mb-10 sm:px-12 flex justify-between flex-row gap-0 pt-[22px] px-6 pb-[80px] h-[130px] w-full items-center ">
                        <div className="xmd:hidden block">
                            <Logo />
                        </div>
                        <button
                            className="bg-transparent mt-0 xs:px-8 sm:p-0  w-fit rounded border-none opacity-80"
                            onClick={() => {
                                setMobileMenuOpen(false)
                                setSelectedLink(null)
                            }}
                        >
                            <X size={30} />
                        </button>
                    </div>
                    {/* Links */}
                    <div
                        className={`${
                            selectedLink !== null ? 'pointer-events-none' : ''
                        } xs:px-12 2xl:px-6 flex flex-col justify-center`}
                    >
                        {Links.map((link, index: number) =>
                            link.childLinks ? (
                                <button
                                    onClick={() => setSelectedLink(index)}
                                    key={index}
                                    className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80"
                                >
                                    <div className="flex justify-between gap-0 flex-row">
                                        <h5 className="m-0 font-bold">
                                            {link.title}
                                        </h5>
                                        <ChevronRight
                                            size={30}
                                            className="transition-all duration-200 select-none w-[25px] h-[21px]"
                                        />
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    key={index}
                                    href={link.href as string}
                                    className="mt-4 text-xl tracking-normal sm:w-full 2xl:mt-2 rounded bg-white hover:bg-neutral-100 p-2 border-none opacity-80"
                                >
                                    <div className="flex justify-between gap-0 flex-row">
                                        <h5 className="m-0 font-bold">
                                            {link.title}
                                        </h5>
                                    </div>
                                </Link>
                            )
                        )}

                        <div className="h-auto text-center mt-10">
                            <button className="w-full mt-2 py-[9px] px-5 rounded border-none opacity-90 bg-neutral-100 hover:bg-primary transition-background  hover:opacity-100 hover:cursor-pointer">
                                Sign in
                            </button>
                        </div>
                    </div>

                    {/* Child sidebar */}

                    {selectedLink !== null &&
                        Links[selectedLink].childLinks && (
                            <div
                                className={`${
                                    selectedLink !== null
                                        ? 'right-0 transition-all duration-300'
                                        : '-right-full transition-all duration-300'
                                } transition-all duration-300 xmd:w-1/2 w-full flex-col z-[22] fixed top-[100px] h-[calc(100vh-100px)] bg-white flex xs:px-12 sm:p-0`}
                            >
                                {
                                    // Render child links if the parent link is open
                                    selectedLink !== null &&
                                        Links[selectedLink].childLinks &&
                                        Links[selectedLink] && (
                                            <>
                                                <div className="mb-[10px] min-h-[34px] sm:px-12 2xl:px-6 w-full flex flex-row justify-start">
                                                    <button
                                                        className="w-full m-0 mr-[5px] p-0 opacity-80 rounded border-none"
                                                        onClick={() => {
                                                            setSelectedLink(
                                                                null
                                                            )
                                                        }}
                                                    >
                                                        <div className="flex flex-row gap-0 items-center mb-3 hover:bg-neutral-100 rounded">
                                                            <ChevronLeft
                                                                size={40}
                                                            />
                                                            <h3 className="font-bold text-3xl">
                                                                {
                                                                    Links[
                                                                        selectedLink
                                                                    ].title
                                                                }
                                                            </h3>
                                                        </div>
                                                    </button>
                                                </div>

                                                <div className="w-full flex flex-col">
                                                    <p className="sm:px-12 2xl:px-6 font-light m-0 ml-4 mb-4 text-lg">
                                                        {
                                                            Links[selectedLink]
                                                                .description
                                                        }
                                                    </p>
                                                    <div className="block pt-[10px] pl-4 bg-white">
                                                        {Links[
                                                            selectedLink
                                                        ].childLinks?.map(
                                                            (link, index) => (
                                                                <Link
                                                                    href={
                                                                        link.href as string
                                                                    }
                                                                    key={index}
                                                                    className="sm:px-12 2xl:px-6 mb-6 cursor-pointer flex bg-transparent flex-row"
                                                                >
                                                                    <div className="flex flex-col items-start">
                                                                        <h5 className="max-w-[240px] text-xl hover:underline mb-1 transition-all duration-300 ease-in font-normal text-primary">
                                                                            {
                                                                                link.title
                                                                            }
                                                                        </h5>
                                                                        <p className="max-w-[340px] font-light">
                                                                            {
                                                                                link.description
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                }
                            </div>
                        )}
                </div>
            </React.Fragment>
        )
    }
)

export default Sidebar
Sidebar.displayName = 'Sidebar'
