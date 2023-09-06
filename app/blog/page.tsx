import { readdir } from 'fs/promises'
import { join } from 'path/posix'
import { Meta } from '@/app/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/Header'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
    // get all the files in the blog directory
    const blogs = (await readdir(join(process.cwd() + '/blog')))
        .map((blog) => {
            // extract the metadata from the MDX file
            const { meta }: { meta: Meta } = require(`../../blog/${blog}`)
            return {
                ...meta,
                date: new Date(meta.date),
                href: blog.replace(/\.mdx$/, ''), // remove .mdx extension
            }
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // sort by date descending

    return (
        <>
            <Header />

            <main className="container max-auto">
                <h1 className="text-center text-2xl font-bold py-8">Blog</h1>
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.title} className="py-4">
                            <Link href={`/blog/${blog.href}`}>
                                <div className="space-y-2">
                                    <div className="text-4xl font-semibold">
                                        {blog.title}
                                    </div>
                                    <div className="text-sm text-neutral-600">
                                        <span className="font-semibold">
                                            {blog.author.name}
                                        </span>
                                        {' - '}
                                        {blog.date.toLocaleDateString(
                                            undefined,
                                            {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }
                                        )}
                                    </div>
                                    <div className="text-neutral-700">
                                        {blog.excerpt}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}
