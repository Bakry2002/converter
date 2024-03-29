import { Meta } from '@/lib/blog'
import { readdir } from 'fs/promises'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { join } from 'path'
import { Suspense } from 'react'

type Props = {
    params: { slug: string }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function ({ params }: Props) {
    // get the MDX content
    const Content = dynamic(() => import(`../../../blog/${params.slug}.mdx`))

    // get the metadata from the MDX file
    const { meta }: { meta: Meta } = require(`../../../blog/${params.slug}.mdx`)

    return (
        <>
            <article className="prose lg:prose-xl mx-auto">
                <h1 className="text-center">{meta.title}</h1>
                <div className="text-center">
                    {new Date(meta.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </div>
                <div className="flex items-center justify-center">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Image
                            src={meta.author.image}
                            alt={meta.author.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    </Suspense>
                    <div className="ml-2 font-semibold text-neutral-800">
                        <div>{meta.author.name}</div>
                    </div>
                </div>
                <div>
                    <Image
                        src={meta.image}
                        alt={meta.title}
                        width={900}
                        height={550}
                        className="rounded-lg w-full h-full"
                    />
                </div>
                <Content />
            </article>
        </>
    )
}

export async function generateStaticParams() {
    const files = await readdir(join(process.cwd() + '/blog'))
    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ''), // remove .mdx extension
    }))
}

// generateStaticParams() is a function that returns an array of objects with the keys of the dynamic route. In this case, we have a dynamic route of [slug], so we need to return an array of objects with the key slug. The value of slug is the value that will be used in the dynamic route. In this case, we are returning an array of objects with the key slug and the value of the file name without the .mdx extension.
