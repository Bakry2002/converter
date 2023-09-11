import { MetadataRoute } from 'next'
import { getBlogPosts } from './lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getBlogPosts()
    return [
        {
            url: 'https://convertit.me',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://convertit.me/blog',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://acme.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        ...posts.map((post) => ({
            url: `https://convertit.me/blog/${post.href}`,
            lastModified: post.date,
        })),
    ]
}
