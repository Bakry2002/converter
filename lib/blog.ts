import { readdir } from 'fs/promises'
import { join } from 'path'

export type Meta = {
    title: string
    date: string
    excerpt: string
    author: {
        name: string
        image: string
    }
    image: string
}

export type Post = Meta & {
    date: Date
    href: string
}
export const getBlogPosts = async () => {
    // get all the files in the blog directory
    const posts: Post[] = (await readdir(join(process.cwd() + '/blog')))
        .map((postFile) => {
            // extract the metadata from the MDX file
            const { meta }: { meta: Meta } = require(`../blog/${postFile}`)
            return {
                ...meta,
                date: new Date(meta.date),
                href: postFile.replace(/\.mdx$/, ''), // remove .mdx extension
            } as Post
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // sort by date descending
    return posts
}
