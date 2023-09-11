//* ========== Note ==============
// we arw going to make it like an API but it will return XML
//* ========== End Note ===========

import { getBlogPosts } from '@/app/lib/blog'
import { Feed } from 'feed'
import { NextResponse } from 'next/server'

const feed = new Feed({
    title: 'The guidance Blog',
    description:
        'The guidance Blog is a blog about everything related convert it',
    id: 'https://convertit.me/',
    link: 'https://convertit.me/blog',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    favicon: 'https://www.convertit.me/icon.png',
    copyright: 'All rights reserved 2023, Abdullah M. Bakry',
    author: {
        name: 'Abdullah M. Bakry',
        email: 'abdaullah62@gmail.com',
    },
})

export async function GET() {
    const posts = await getBlogPosts()

    for (const post of posts) {
        const link = `https://convertit.me/blog/${post.href}`
        const image = `https://convertit.me${post.image}`
        feed.addItem({
            title: post.title,
            id: link,
            link: link,
            description: post.excerpt,
            content: post.excerpt,
            author: [
                {
                    name: post.author.name,
                    link: 'https://www.linkedin.com/in/abdullah-m-bakry-4b4937206/',
                },
            ],
            date: post.date,
            //image: image,
        })
    }

    return new NextResponse(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    })
}
