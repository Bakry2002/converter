import { Links, LowNavbarLink } from '../Header'

interface DropDownNavbarProps {
    lowNavbarRef: React.RefObject<HTMLDivElement>
    selectedLink: number
}

export const DropDownNavbar: React.FC<DropDownNavbarProps> = ({
    lowNavbarRef,
    selectedLink,
}) => {
    return (
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
                                            {Links[selectedLink].title}
                                        </h2>
                                        <p className="font-light text-base">
                                            {Links[selectedLink].description}
                                        </p>
                                    </div>
                                    <div className="col-span-2 flex justify-center flex-col">
                                        <div className="grid grid-cols-2 gap-4">
                                            {Links[
                                                selectedLink
                                            ].childLinks?.map((link, index) => (
                                                <LowNavbarLink
                                                    key={index}
                                                    title={link.title}
                                                    description={
                                                        link.description
                                                    }
                                                    Icon={link.Icon}
                                                    href={link.href}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
