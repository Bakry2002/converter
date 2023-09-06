import { readdir } from 'fs/promises'
import dynamic from 'next/dynamic'
import { join } from 'path'

type Props = {
    params: { slug: string }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function ({ params }: Props) {
    const Content = dynamic(() => import(`../../../blog/${params.slug}.mdx`))

    console.log('Content:', Content)

    return (
        <main>
            Blog slug page
            <Content />
        </main>
    )
}

export async function generateStaticParams() {
    const files = await readdir(join(process.cwd() + '/blog'))
    return files.map((file) => ({
        slug: file.replace(/\.mdx$/, ''), // remove .mdx extension
    }))
}

// generateStaticParams() is a function that returns an array of objects with the keys of the dynamic route. In this case, we have a dynamic route of [slug], so we need to return an array of objects with the key slug. The value of slug is the value that will be used in the dynamic route. In this case, we are returning an array of objects with the key slug and the value of the file name without the .mdx extension.
