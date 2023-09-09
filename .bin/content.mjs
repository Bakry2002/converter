#!/usr/bin/env zx

import 'zx/globals'
import { OpenAI } from 'openai'
import { writeFile } from 'fs'
import slugify from 'slugify'
const { Client } = require('@notionhq/client')

const { NOTION_TOKEN, OPENAI_API_KEY } = $.env

const openai = new OpenAI({
    organization: 'org-cZp2Cz5Bosde9cJeduu0Bj6g',
    apiKey: process.env.OPENAI_API_KEY,
})

// Notion API client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

// Fetching the first record in the database
const database_id = '23854e45513e4a9eb69c697fe6d875ef'

const response = await notion.databases.query({
    database_id,
    page_size: 1,
    sorts: [
        {
            property: 'Order',
            direction: 'ascending',
        },
    ],
})

const firstPage = response.results[0]
if (!firstPage) {
    console.log('No blog post to write.')
    process.exit()
}
const title = firstPage.properties.Name.title[0].plain_text
const prompt = firstPage.properties.Prompt.rich_text?.[0]?.plain_text

const chatResponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role: 'system',
            content: `You are a professional copywriter. You write posts for an internet software company. You write cleanly and concisely. Never start a blog post with a title. ONLY RESPOND IN MARKDOWN with just the content.`,
        },
        {
            role: 'user',
            content: `Write a blog post about: ${title}. ${prompt ?? ''}`,
        },
    ],
    temperature: 0,
    max_tokens: 100,
})

const content = chatResponse.choices[0].message.content // gptResponse.data.choices[0].text
const slug = slugify(title, { lower: true, strict: true }) // slugify the title meaning remove spaces and special characters and add dashes
const date = new Date().toISOString().split('T')[0] // get the current date in the format YYYY-MM-DD

const meta = `export const meta = {
    title: '${title}',
    date: '${date}',
    excerpt: '',
    image: 'api/og?title=${title}&author=Abdullah Bakry',
    author: {
        name: 'Abdullah Bakry',
        image: '/me.png',
    },
}`

const data = `${meta}\n\n${content}` // combine the meta data and the content

await writeFile(path.join('blog', `${slug}.mdx`), data, 'utf8') // write the file to the blog folder

await cd('blog') // change directory to the blog folder
await $`git config user.name Abdullah M. Bakry"` // set the git user name
await $`git config user.email "abdaullah62@gmail.com" ` // set the git user email
await $`git checkout -b create-blog-post-${date}` // create a new branch with the current date
await $`git add ${slug}.mdx` // add the file to git
const commit = `Add blog post: ${title}` // create a commit message
await $`git commit -m ${commit}` // commit the file
await $`git push origin -u create-blog-post-${date}` // push the branch to github
await $`gh pr create --fill` // create a pull request
