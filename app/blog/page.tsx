import { readdir } from 'fs/promises'
import { join } from 'path/posix'
import { Meta, Post, getBlogPosts } from '@/app/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

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
        <>
            <Header />
            <Title />
            <p>
                This blog is the official source for the updates from the
                official owners. <br /> Anything important, including release
                notes, updates, and convert information will be posted here
                first. You can also follow the <Link href="">@convertit</Link>{' '}
                account on Twitter, but you{' '}
                {/*  eslint-disable-next-line react/no-unescaped-entities */}
                won't miss anything essential if you only read this blog.
            </p>
            <main className="container max-auto space-y-5 px-4">
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
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
                <div className="h-24"></div>
            </main>
        </>
    )
}
