/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        mdxRs: true,
    },
    images: {
        domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
