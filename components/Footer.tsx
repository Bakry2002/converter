import Image from 'next/image'
import Link from 'next/link'

const links = [
    {
        label: 'Blog',
        href: '/blog',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Contact Us',
        href: '/contact',
    },
]

const socials = [
    {
        label: 'Twitter',
        href: 'https://twitter.com/convertit_files',
    },
    {
        label: 'Facebook',
        href: '#',
    },
    {
        label: 'Instagram',
        href: '#',
    },
]
export const Footer = () => {
    return (
        <footer className="bg-secondary">
            <div className="container flex justify-between items-center mt-36">
                {/* LOGO */}
                <div>
                    <Link
                        href="/"
                        className=" flex flex-row items-center gap-1"
                    >
                        <Image
                            src="/icon.png"
                            alt="Reconvert Logo"
                            width={45}
                            height={50}
                        />
                        <div className="md:text-[2rem] text-3xl font-black text-transparent bg-hero-gradient-text bg-clip-text">
                            Convert it
                        </div>
                    </Link>
                </div>

                {/* Links */}
                <div>
                    <div className="text-xl font-bold mb-2 uppercase">
                        About
                    </div>
                    <ul>
                        {links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <div className="text-xl font-bold mb-2 uppercase">
                        Follow Us
                    </div>
                    <ul>
                        {socials.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
