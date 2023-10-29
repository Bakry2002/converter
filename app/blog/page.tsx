/* eslint-disable react/no-unescaped-entities */
import { readdir } from 'fs/promises'
import { join } from 'path/posix'
import { Meta, Post, getBlogPosts } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Title = dynamic(() => import('./Title'), {
    ssr: false,
})

const BlogCard = ({ post }: { post: Post }) => {
    return (
        <li>
            <Link
                href={`/blog/${post.href}`}
                className="bg-primary block rounded-2xl group p-5 space-y-5"
            >
                <div className="w-full h-[300px] relative overflow-hidden rounded-2xl">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        objectFit="cover"
                        className="w-full z-0 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                </div>
                <div className="text-neutral-900 group-hover:text-neutral-600">
                    {post.date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </div>
                <h3 className="my-4 text-3xl text-neutral-900 group-hover:text-neutral-600">
                    {post.title}
                </h3>
                <p className="text-neutral-800 group-hover:text-neutral-600">
                    {post.excerpt}
                </p>
            </Link>
        </li>
    )
}

const grid = () => {
    let i = 0
    const areas = ['']
    return function Grid({ children }: { children: ReactNode }) {
        return <div className="grid gap-8">{children}</div>
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
    const posts = await getBlogPosts()
    const [header, ...rest] = posts
    return (
        <main>
            <div className="main__decoration"></div>
            {/* Container */}
            <div className="lg:mx-28 px-6 md:px-12 lg:px-0  mt-32">
                {/* Page header */}
                <div className="flex items-start lg:flex-row flex-col justify-between lg:gap-12 gap-0">
                    {/* Main article (Blog Headline) */}
                    <article className="flex-1 flex-col flex items-start justify-between xmd:mb-0 mb-16">
                        <h1 className="2xl:text-8xl md:text-7xl text-5xl font-bold ">
                            Guidance management & tips, news blog.
                        </h1>
                        <p className="max-w-[500px] text-gray-700 mt-4">
                            This blog is the official source for the updates
                            from the official owners. You can also follow the{' '}
                            <Link href="" className="underline text-blue-900">
                                @convertit
                            </Link>{' '}
                            account on Twitter.
                        </p>
                        {/* Newsletter subscribe */}
                        <div className="text-sm relative z-10 2xl:w-3/5 w-full mt-4">
                            <div className="flex relative">
                                <form action="" className="w-full">
                                    <div className="flex flex-row  ">
                                        {/* input */}
                                        <div className="relative w-full z-20 max-w-full flex-1">
                                            {/* Visually hidden label */}
                                            <label
                                                htmlFor="email"
                                                className="[clip:rect(0,0,0,0)]  [clip-path:inset(50%)] absolute w-[1px] whitespace-nowrap h-[1px] overflow-hidden"
                                            >
                                                Email Address:
                                            </label>
                                            <input
                                                className="p-4 h-[50px] rounded w-full shadow-sm border-1"
                                                id="email"
                                                type="email"
                                                placeholder="Enter email"
                                            />
                                        </div>
                                        {/* button */}
                                        <button className="bg-primary p-4 to-white ml-2 rounded">
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Social media */}
                        <div className="mt-4 flex items-center justify-between">
                            <p>Follows us on: </p>
                            <ul className="list-none translate-x-1 flex pl-[10px] gap-2  self-center shrink-0">
                                <li className="w-8 flex items-center justify-center">
                                    <Link
                                        href=""
                                        className="min-w-[44px]  transition-all flex items-center justify-center "
                                    >
                                        <Twitter className="hover:fill-primary w-6 h-6" />
                                    </Link>
                                </li>
                                <li className="w-8 flex items-center justify-center">
                                    <Link
                                        href=""
                                        className="min-w-[44px] transition-all flex items-center justify-center "
                                    >
                                        <Facebook className="hover:fill-primary w-6 h-6" />
                                    </Link>
                                </li>
                                <li className="w-8 flex items-center justify-center">
                                    <Link
                                        href=""
                                        className="min-w-[44px] transition-all flex items-center justify-center "
                                    >
                                        <Instagram className="hover:fill-primary w-6 h-6" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </article>
                    <article className="xmd:basis-auto basis-full max-w-[780px]  w-full min-h-[515px] flex flex-col shadow-md">
                        HEllo
                    </article>
                </div>
                {/* <Title />
                <div className="container mx-auto mb-8">
                    <p>
                        This blog is the official source for the updates from
                        the official owners. <br /> Anything important,
                        including release notes, updates, and convert
                        information will be posted here first. You can also
                        follow the <Link href="">@convertit</Link> account on
                        Twitter, but you{' '}
                   
                        won't miss anything essential if you only read this
                        blog.
                    </p>
                </div>
                <section className="container max-auto space-y-5 px-4">
                    <ul className="grid gap-8 grid-cols-1">
                        {[header].map((post) => (
                            <BlogCard key={post.title} post={post} />
                        ))}
                    </ul>
                    <ul className="grid gap-8 grid-cols-3">
                        {rest.map((post) => (
                            <BlogCard key={post.title} post={post} />
                        ))}
                    </ul>
                </section> */}
            </div>
        </main>
    )
}
