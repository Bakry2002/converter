import createMDX from '@next/mdx'
import rehypeHighlight from 'rehype-highlight'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        mdxRs: true,
    },
    images: {
        domains: [
            'images.unsplash.com',
            'lh3.googleusercontent.com',
            'plus.unsplash.com',
        ],
    },
}

const withMDX = createMDX({
    options: {
        extension: /\.mdx?$/,
        remarkPlugins: [],
        rehypePlugins: [rehypeHighlight],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    },
})
export default withMDX(nextConfig)
